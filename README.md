# GDP Project Tracker

Project and job tracking dashboard for Grayson Design Partners (Jon + Joy).

## Architecture

- **Data layer:** Google Sheet (4 tabs: Jobs, Time Log, Invoices, Clients)
- **Write layer:** Google Apps Script web app (POST endpoint for Telegram-driven updates)
- **Dashboard:** Static HTML/CSS/JS on GitHub Pages, reads from Sheet via published CSV
- **Input:** Telegram group chat (Jon, Joy, OpenClaw bot) — natural language commands parsed and written to Sheet

## Setup

### 1. Google Sheet
Create a new Google Sheet with tabs:
- **Jobs:** Job # | Client | Project | Owner | Status | Start Date | Due Date | Health | Billable Amount | Notes
- **Time Log:** Date | Client | Project | Person | Hours | Billable | Description | Job #
- **Invoices:** Invoice # | Client | Issue Date | Due Date | Hours | Rate | Amount | Status | Paid Date | Description
- **Clients:** Client | Primary Contact | Email | Phone | Rate | Payment Terms | Status | Tags | Last Activity | Outstanding
- **Dashboard:** Key | Value (row: "Next Job Number" | 7804)

Publish the Sheet: File → Share → Publish to web → Entire Document → CSV

### 2. Apps Script
1. Open Sheet → Extensions → Apps Script
2. Paste contents of `apps-script.gs`
3. Change `SHARED_SYNC_TOKEN` to a random string
4. Deploy → New deployment → Web app → Execute as: Me, Access: Anyone with the link
5. Copy the web app URL

### 3. Dashboard Config
Open `index.html` and update the constants at the top of the `<script>`:
- `SHEET_ID` — from your Google Sheet URL
- `GIDS` — GID for each tab (find in Sheet URL when viewing each tab)
- `DEFAULT_SYNC_ENDPOINT` — Apps Script web app URL
- `DEFAULT_SYNC_TOKEN` — the sync token you set

### 4. Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:jgray4567/gdp-project-tracker.git
git push -u origin main
```
Then enable GitHub Pages in repo settings → Source: main branch / root.

### 5. Telegram Integration
Create a group chat with Jon, Joy, and the OpenClaw bot. The bot parses natural language commands and POSTs to the Apps Script endpoint.

## Commands (Telegram)

- `new project [client] [description]` — creates a job
- `update [job#] [status]` — Lead → In Progress → Review → Complete → Billed
- `log [job#] [hours] [note]` — time entry
- `bill [job#]` — mark for invoicing
- `add client [name]` — new client
- `status` — summary of all active work

## File Structure

```
gdp-project-tracker/
├── index.html          # Full dashboard (HTML + CSS + JS)
├── apps-script.gs      # Google Apps Script for Sheet write-through
└── README.md           # This file
```

## Status

- [x] Dashboard HTML/CSS/JS
- [x] Apps Script write-through
- [ ] Google Sheet created
- [ ] Apps Script deployed
- [ ] Dashboard deployed to GitHub Pages
- [ ] Telegram group created
- [ ] Telegram command parsing wired up
- [ ] End-to-end test