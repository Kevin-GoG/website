# Feedback Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/feedback` page with a form (name, email, category, message) that submits to a Cloudflare Pages Function and stores data in D1.

**Architecture:** New `src/Feedback.jsx` React page + `functions/api/feedback.js` Pages Function. Frontend POSTs JSON to `/api/feedback`; the function validates and writes to D1. Route registered in `src/App.jsx`. D1 database and `wrangler.toml` binding must be set up manually in Cloudflare Dashboard before deploying.

**Tech Stack:** React, React Router v6, Framer Motion, Lucide React, Cloudflare Pages Functions, Cloudflare D1

---

### Task 1: Create `functions/api/feedback.js`

**Files:**
- Create: `functions/api/feedback.js`

- [ ] **Step 1: Create the Pages Function**

```js
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { name, email, category, message } = body;

    if (!message || !message.trim()) {
      return Response.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    await context.env.DB.prepare(
      `INSERT INTO feedback (name, email, category, message) VALUES (?, ?, ?, ?)`
    )
      .bind(name || null, email || null, category || null, message.trim())
      .run();

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  return onRequestPost(context);
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls functions/api/feedback.js
```
Expected: file exists, no error.

- [ ] **Step 3: Commit**

```bash
git add functions/api/feedback.js
git commit -m "feat: add /api/feedback Pages Function"
```

---

### Task 2: Create `wrangler.toml`

**Files:**
- Create: `wrangler.toml`

- [ ] **Step 1: Check if wrangler.toml already exists**

```bash
ls wrangler.toml 2>/dev/null && echo "exists" || echo "missing"
```

- [ ] **Step 2: Create wrangler.toml (if missing)**

```toml
name = "iota-wallet-website"

[[d1_databases]]
binding = "DB"
database_name = "feedback_db"
database_id = "REPLACE_WITH_ACTUAL_ID"
```

If the file already exists, add only the `[[d1_databases]]` block to it.

- [ ] **Step 3: Commit**

```bash
git add wrangler.toml
git commit -m "chore: add wrangler.toml with D1 binding"
```

---

### Task 3: Create `src/Feedback.jsx`

**Files:**
- Create: `src/Feedback.jsx`

- [ ] **Step 1: Create the component**

```jsx
import React, { useState } from 'react';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['Bug Report', 'Feature Request', 'General Feedback'];

const Feedback = ({ onBack }) => {
  const [form, setForm] = useState({ name: '', email: '', category: 'General Feedback', message: '' });
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <div className="gradient-bg"></div>

      <nav className="nav" style={{ marginBottom: '3rem' }}>
        <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
          <ArrowLeft size={20} /> Back to Home
        </div>
      </nav>

      <main style={{ maxWidth: '640px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-icon">
              <MessageSquare size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Feedback</h1>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Share your thoughts, report issues, or suggest improvements.
          </p>

          {status === 'success' ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>
                Thank you for your feedback!
              </p>
              <p style={{ color: 'var(--text-muted)' }}>We'll review it and get back to you if needed.</p>
            </div>
          ) : (
            <form className="glass-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Name <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Email <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Category
                </label>
                <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your feedback..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', opacity: status === 'submitting' ? 0.6 : 1 }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.65rem 0.9rem',
  color: '#f8fafc',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

export default Feedback;
```

- [ ] **Step 2: Verify file exists**

```bash
ls src/Feedback.jsx
```
Expected: file exists.

- [ ] **Step 3: Commit**

```bash
git add src/Feedback.jsx
git commit -m "feat: add /feedback page component"
```

---

### Task 4: Register route in `src/App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add import after existing page imports (line ~19)**

Find:
```jsx
import Support from './Support';
```

Replace with:
```jsx
import Support from './Support';
import Feedback from './Feedback';
```

- [ ] **Step 2: Add route inside `<Routes>` in the `App` function**

Find:
```jsx
      <Route path="/support" element={<Support onBack={() => navigate('/')} />} />
    </Routes>
```

Replace with:
```jsx
      <Route path="/support" element={<Support onBack={() => navigate('/')} />} />
      <Route path="/feedback" element={<Feedback onBack={() => navigate('/')} />} />
    </Routes>
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: register /feedback route in App"
```

---

### Task 5: Manual Cloudflare setup (pre-deploy checklist)

This task is performed in the Cloudflare Dashboard — no code changes.

- [ ] **Step 1: Create D1 database**

In Cloudflare Dashboard:
- Workers & Pages → Storage & Databases → D1 SQL Database → Create Database
- Name: `feedback_db`
- Copy the generated `database_id`

- [ ] **Step 2: Create the table**

In the D1 console (query editor):
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

- [ ] **Step 3: Update `wrangler.toml` with real database_id**

Open `wrangler.toml` and replace `REPLACE_WITH_ACTUAL_ID` with the copied ID:
```toml
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

- [ ] **Step 4: Bind D1 in Pages project settings**

In Cloudflare Dashboard:
- Workers & Pages → your Pages project → Settings → Functions → D1 database bindings
- Add binding: Variable name = `DB`, D1 database = `feedback_db`
- Save

- [ ] **Step 5: Commit wrangler.toml with real ID**

```bash
git add wrangler.toml
git commit -m "chore: set D1 database_id in wrangler.toml"
```

---

### Task 6: Push and verify

- [ ] **Step 1: Push to remote**

```bash
git push origin master
```

- [ ] **Step 2: Verify deployment**

After Cloudflare Pages deploys (usually 1-2 minutes):
- Open `https://<your-domain>/feedback`
- Fill in the form and submit
- Expected: success message shown
- In Cloudflare Dashboard → D1 → `feedback_db` → query `SELECT * FROM feedback` — expect one row
