/**
 * GDP Project Tracker — Google Apps Script Web App
 * 
 * Deploy as Web App:
 *   1. Open the Google Sheet → Extensions → Apps Script
 *   2. Paste this entire file
 *   3. Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone with the link
 *   4. Copy the web app URL → paste into GDP Project Tracker dashboard settings
 *
 * Sheet structure (tab names must match exactly):
 *   - Jobs: Job # | Client | Project | Owner | Status | Start Date | Due Date | Health | Billable Amount | Notes
 *   - Time Log: Date | Client | Project | Person | Hours | Billable | Description | Job #
 *   - Invoices: Invoice # | Client | Issue Date | Due Date | Hours | Rate | Amount | Status | Paid Date | Description
 *   - Clients: Client | Primary Contact | Email | Phone | Rate | Payment Terms | Status | Tags | Last Activity | Outstanding
 *   - Dashboard: (settings tab, row format: Key | Value)
 *       Row: "Next Job Number" | 7804
 */

const SHARED_SYNC_TOKEN = 'CHANGE_ME_TO_A_RANDOM_STRING';

// ─── doPost: Main write endpoint ─────────────────────────────────────────
function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const body = JSON.parse(raw);
    const actions = body.actions || [];
    const incomingToken = body.token || body.syncToken || '';

    if (!incomingToken || incomingToken !== SHARED_SYNC_TOKEN) {
      return jsonResp({ ok: false, error: 'Unauthorized: invalid sync token' }, 403);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let applied = 0;
    let errors = [];

    actions.forEach(a => {
      try {
        const p = a.payload || {};
        switch (a.type) {
          case 'new_job':
            applied += handleNewJob(ss, p);
            break;
          case 'log_time':
            applied += handleLogTime(ss, p);
            break;
          case 'bill_it':
            applied += handleBillIt(ss, p);
            break;
          case 'add_client':
            applied += handleAddClient(ss, p);
            break;
          case 'set_client_status':
            applied += handleSetClientStatus(ss, p);
            break;
          case 'update_job':
            applied += handleUpdateJob(ss, p);
            break;
          case 'update_job_status':
            applied += handleUpdateJobStatus(ss, p);
            break;
          default:
            errors.push(`Unknown action type: ${a.type}`);
        }
      } catch (err) {
        errors.push(`${a.type}: ${err.message}`);
      }
    });

    return jsonResp({ ok: true, applied, errors: errors.length ? errors : undefined });
  } catch (err) {
    return jsonResp({ ok: false, error: String(err.message || err) }, 500);
  }
}

// ─── doGet: Health check ──────────────────────────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'GDP Project Tracker', version: '2.0' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── Action handlers ──────────────────────────────────────────────────────

function handleNewJob(ss, p) {
  const sh = ensureSheet(ss, 'Jobs');
  const jobNumber = p.jobNumber || getNextJobNumber(ss);
  sh.appendRow([
    jobNumber,
    p.client || '',
    p.project || '',
    p.owner || 'Jon',
    p.status || 'Lead',
    p.startDate || new Date().toISOString().slice(0, 10),
    p.dueDate || '',
    'On Track',
    p.billableAmount || '',
    p.notes || ''
  ]);
  incrementJobNumber(ss);
  return 1;
}

function handleLogTime(ss, p) {
  const sh = ensureSheet(ss, 'Time Log');
  sh.appendRow([
    p.date || new Date().toISOString().slice(0, 10),
    p.client || '',
    p.project || '',
    p.person || 'Jon',
    p.hours || 0,
    p.billable || 'Yes',
    p.description || '',
    p.jobNumber || ''
  ]);
  // Update client last activity
  updateClientActivity(ss, p.client);
  return 1;
}

function handleBillIt(ss, p) {
  const sh = ensureSheet(ss, 'Invoices');
  const rate = p.rate || 100;
  const hours = Number(p.hours || 0);
  const amount = p.amount || (hours * rate);
  sh.appendRow([
    p.invoiceNumber || generateInvoiceNumber(ss),
    p.client || '',
    p.issueDate || new Date().toISOString().slice(0, 10),
    p.dueDate || '',
    hours,
    rate,
    amount,
    'Draft',
    '',
    p.description || p.project || ''
  ]);
  // Update client outstanding
  updateClientOutstanding(ss, p.client, amount);
  return 1;
}

function handleAddClient(ss, p) {
  const sh = ensureSheet(ss, 'Clients');
  // Duplicate check
  const data = sh.getRange(2, 1, Math.max(0, sh.getLastRow() - 1), 1).getValues();
  const nameNorm = String(p.client || '').trim().toLowerCase();
  for (const row of data) {
    if (String(row[0]).trim().toLowerCase() === nameNorm) {
      return 0; // Duplicate, skip
    }
  }
  sh.appendRow([
    p.client || '',
    p.contact || '',
    p.email || '',
    p.phone || '',
    p.rate || 100,
    p.paymentTerms || 'Net 15',
    p.status || 'Active',
    p.tags || '',
    new Date().toISOString().slice(0, 10),
    0
  ]);
  return 1;
}

function handleSetClientStatus(ss, p) {
  const sh = ensureSheet(ss, 'Clients');
  const data = sh.getRange(2, 1, Math.max(0, sh.getLastRow() - 1), 7).getValues();
  const nameNorm = String(p.client || '').trim().toLowerCase();
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim().toLowerCase() === nameNorm) {
      sh.getRange(i + 2, 7).setValue(p.status || 'Active');
      sh.getRange(i + 2, 9).setValue(new Date().toISOString().slice(0, 10)); // Last Activity
      return 1;
    }
  }
  return 0;
}

function handleUpdateJob(ss, p) {
  const sh = ensureSheet(ss, 'Jobs');
  const data = sh.getRange(2, 1, Math.max(0, sh.getLastRow() - 1), 10).getValues();
  const jobNorm = String(p.jobNumber || '').trim();
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim() === jobNorm) {
      const updates = p.updates || {};
      const colMap = {
        client: 2, project: 3, owner: 4, status: 5,
        startDate: 6, dueDate: 7, health: 8, billableAmount: 9, notes: 10
      };
      for (const [key, col] of Object.entries(colMap)) {
        if (updates[key] !== undefined) {
          sh.getRange(i + 2, col).setValue(updates[key]);
        }
      }
      return 1;
    }
  }
  return 0;
}

function handleUpdateJobStatus(ss, p) {
  return handleUpdateJob(ss, {
    jobNumber: p.jobNumber,
    updates: { status: p.status, health: p.health || '' }
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function ensureSheet(ss, name) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    // Add headers based on sheet type
    const headers = {
      'Jobs': ['Job #', 'Client', 'Project', 'Owner', 'Status', 'Start Date', 'Due Date', 'Health', 'Billable Amount', 'Notes'],
      'Time Log': ['Date', 'Client', 'Project', 'Person', 'Hours', 'Billable', 'Description', 'Job #'],
      'Invoices': ['Invoice #', 'Client', 'Issue Date', 'Due Date', 'Hours', 'Rate', 'Amount', 'Status', 'Paid Date', 'Description'],
      'Clients': ['Client', 'Primary Contact', 'Email', 'Phone', 'Rate', 'Payment Terms', 'Status', 'Tags', 'Last Activity', 'Outstanding'],
      'Dashboard': ['Key', 'Value']
    };
    if (headers[name]) {
      sh.getRange(1, 1, 1, headers[name].length).setValues([headers[name]]);
      sh.getRange(1, 1, 1, headers[name].length).setFontWeight('bold');
    }
  }
  return sh;
}

function getNextJobNumber(ss) {
  let sh = ss.getSheetByName('Dashboard');
  if (!sh) return 7804;
  const data = sh.getDataRange().getValues();
  for (const row of data) {
    if (String(row[0]).trim().toLowerCase() === 'next job number') {
      return Number(row[1]) || 7804;
    }
  }
  // Fallback: find max job number in Jobs sheet
  const jobs = ss.getSheetByName('Jobs');
  if (jobs) {
    const jobData = jobs.getRange(2, 1, Math.max(0, jobs.getLastRow() - 1), 1).getValues();
    let max = 7803;
    for (const row of jobData) {
      const n = Number(row[0]);
      if (n > max) max = n;
    }
    return max + 1;
  }
  return 7804;
}

function incrementJobNumber(ss) {
  let sh = ensureSheet(ss, 'Dashboard');
  const data = sh.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim().toLowerCase() === 'next job number') {
      const current = Number(data[i][1]) || 7804;
      sh.getRange(i + 1, 2).setValue(current + 1);
      return;
    }
  }
  // Not found, add it
  sh.appendRow(['Next Job Number', 7805]);
}

function generateInvoiceNumber(ss) {
  const sh = ensureSheet(ss, 'Invoices');
  const rowCount = Math.max(0, sh.getLastRow() - 1);
  const prefix = 'INV';
  const today = new Date();
  const dateStr = today.getFullYear().toString().slice(-2) + 
    String(today.getMonth() + 1).padStart(2, '0');
  return `${prefix}-${dateStr}-${String(rowCount + 1).padStart(3, '0')}`;
}

function updateClientActivity(ss, clientName) {
  if (!clientName) return;
  const sh = ensureSheet(ss, 'Clients');
  const data = sh.getRange(2, 1, Math.max(0, sh.getLastRow() - 1), 9).getValues();
  const nameNorm = String(clientName).trim().toLowerCase();
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim().toLowerCase() === nameNorm) {
      sh.getRange(i + 2, 9).setValue(new Date().toISOString().slice(0, 10));
      return;
    }
  }
}

function updateClientOutstanding(ss, clientName, amount) {
  if (!clientName) return;
  const sh = ensureSheet(ss, 'Clients');
  const data = sh.getRange(2, 1, Math.max(0, sh.getLastRow() - 1), 10).getValues();
  const nameNorm = String(clientName).trim().toLowerCase();
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim().toLowerCase() === nameNorm) {
      const current = Number(data[i][9]) || 0;
      sh.getRange(i + 2, 10).setValue(current + Number(amount));
      return;
    }
  }
}

function jsonResp(data, code) {
  const resp = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  if (code && code >= 400) {
    // Apps Script doesn't support setting status codes directly in ContentService,
    // but we include it in the response body for client-side handling
  }
  return resp;
}