# GDP Project Tracker — Resurrection Setup (2026-09-04)

Google-side setup for Jon (~15 min). Bot-side wiring happens after these values come back.

## Steps
1. Create a new Google Sheet: https://sheets.new — name it "GDP Tracker"
2. Import each CSV in this folder (File → Import → Upload → "Insert new sheets"), rename tabs exactly: **Jobs, Time Log, Invoices, Clients, Dashboard** (delete default Sheet1)
3. Share → General access: **Anyone with the link (Viewer)**
4. File → Share → **Publish to web** → Entire document → CSV
5. Extensions → **Apps Script** → paste full contents of ../apps-script.gs (replace everything)
6. Change the SHARED_SYNC_TOKEN line to: `const SHARED_SYNC_TOKEN = '***';`
7. Deploy → New deployment → type: **Web app** → Execute as: **Me** → Who has access: **Anyone with the link** → Deploy → copy URL (ends in /exec)
8. Send the bot (Telegram) the **Sheet URL** and the **web app URL**. Token already known to the bot.

## Bot-side (after Jon sends values)
- Patch index.html constants: SHEET_ID, GIDS, DEFAULT_SYNC_ENDPOINT, DEFAULT_SYNC_TOKEN
- Push GitHub (Pages auto-deploy) + lftp to graysondp.com/production/ (chmod 644)
- Verify live read + write-through POST, then build Telegram command layer (new project / update / log / bill / add client / status)

## Sync token (generated 2026-09-04)
520913c40f2e1447904f486c66826e72debe2dc4eeef46e0
