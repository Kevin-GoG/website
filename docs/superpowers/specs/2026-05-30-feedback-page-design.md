# Feedback Page Design

**Date:** 2026-05-30  
**Route:** `/feedback`

## Overview

A feedback form page for IOTA Wallet users. Collects name, email, category, and message. Submitted data is stored in Cloudflare D1 via a Pages Function API endpoint. Follows the same visual style as existing pages (`/support`, `/privacy`, `/terms`).

## Architecture

```
Browser → /feedback (React) → POST /api/feedback → Pages Function → D1
```

## Frontend: `src/Feedback.jsx`

- Layout: same pattern as `src/Support.jsx` — nav with "← Back to Home", page header, `glass-card` form
- Fields:
  - `name` — text input, optional
  - `email` — email input, optional
  - `category` — `<select>`, required, options: Bug Report / Feature Request / General Feedback
  - `message` — `<textarea>`, required
- Submit behavior:
  - Button disabled while submitting
  - On success: show inline success message, do not navigate away
  - On failure: show inline error message
- No client-side validation beyond `message` required (HTML5 `required` attribute)

## Backend: `functions/api/feedback.js`

- Handles `POST` only; other methods return 405
- Reads JSON body: `{ name, email, category, message }`
- Validates `message` is non-empty; returns HTTP 400 if missing
- Inserts row into D1 `feedback` table
- Returns `{ success: true }` on success
- Returns `{ success: false, error: "..." }` + HTTP 500 on DB error

## Database: D1

- Database name: `feedback_db`
- Table: `feedback`

```sql
CREATE TABLE feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  category TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Config: `wrangler.toml`

```toml
name = "my-project"

[[d1_databases]]
binding = "DB"
database_name = "feedback_db"
database_id = "REPLACE_WITH_ACTUAL_ID"
```

The `database_id` must be filled in after creating the D1 database in Cloudflare Dashboard.

## Routing

`src/App.jsx`: add `<Route path="/feedback" element={<Feedback onBack={() => navigate('/')} />} />` and import `Feedback`.

## Manual Steps (Outside Code)

Before deploying, user must:
1. Create D1 database named `feedback_db` in Cloudflare Dashboard
2. Run the `CREATE TABLE` SQL in the D1 console
3. Copy the database ID into `wrangler.toml`
4. Bind D1 in Pages project settings (Settings → Functions → D1 database bindings → add `DB`)

## Out of Scope

- No admin UI to view submissions
- No email notification on submission
- No rate limiting
- No CAPTCHA
