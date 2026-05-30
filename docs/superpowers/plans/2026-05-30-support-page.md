# Support Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/support` page with 4 help cards (Docs, FAQ, Discord, Email) matching the existing site style.

**Architecture:** New `src/Support.jsx` component following the same pattern as `src/PrivacyPolicy.jsx`. Register route in `src/App.jsx` and add a footer link. No backend, no state — pure static page.

**Tech Stack:** React, React Router v6, Framer Motion, Lucide React, existing CSS classes (`glass-card`, `feature-icon`, `btn-primary`, `btn-outline`)

---

### Task 1: Create `src/Support.jsx`

**Files:**
- Create: `src/Support.jsx`

- [ ] **Step 1: Create the file with all 4 cards**

```jsx
import React from 'react';
import { BookOpen, HelpCircle, MessageCircle, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const SUPPORT_ITEMS = [
  {
    icon: BookOpen,
    title: 'Search Documentation',
    description: 'Browse the official IOTA docs for guides, API references, and tutorials.',
    label: 'View Docs',
    href: 'https://docs.iota.org',
  },
  {
    icon: HelpCircle,
    title: 'Read FAQ',
    description: 'Find answers to the most common questions about IOTA Wallet.',
    label: 'Read FAQ',
    href: 'https://wiki.iota.org/get-started/faq/',
  },
  {
    icon: MessageCircle,
    title: 'Join Discord',
    description: 'Get real-time help from the IOTA community and support team.',
    label: 'Join Discord',
    href: '#',
  },
  {
    icon: Mail,
    title: 'Contact via Email',
    description: "Can't find what you need? Send us a message directly.",
    label: 'iota.wallet@hotmail.com',
    href: 'mailto:iota.wallet@hotmail.com',
  },
];

const SupportCard = ({ icon: Icon, title, description, label, href, delay }) => (
  <motion.a
    href={href}
    target={href.startsWith('mailto') || href === '#' ? '_self' : '_blank'}
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card"
    style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
  >
    <div className="feature-icon">
      <Icon size={24} />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description" style={{ marginBottom: '1.5rem' }}>{description}</p>
    <span className="btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>
      {label}
    </span>
  </motion.a>
);

const Support = ({ onBack }) => (
  <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
    <div className="gradient-bg"></div>

    <nav className="nav" style={{ marginBottom: '3rem' }}>
      <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
        <ArrowLeft size={20} /> Back to Home
      </div>
    </nav>

    <main style={{ maxWidth: '860px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="feature-icon">
            <Mail size={32} />
          </div>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Need Help?</h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Choose the best way to get support for IOTA Wallet.
        </p>

        <div className="features-grid">
          {SUPPORT_ITEMS.map((item, i) => (
            <SupportCard key={item.title} {...item} delay={i * 0.1} />
          ))}
        </div>
      </motion.div>
    </main>
  </div>
);

export default Support;
```

- [ ] **Step 2: Verify the file was created**

```bash
ls src/Support.jsx
```
Expected: file exists, no error.

---

### Task 2: Register route and add footer link in `src/App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add import at top of file (after existing imports)**

In `src/App.jsx`, after the line `import TermsOfService from './TermsOfService';`, add:

```jsx
import Support from './Support';
```

- [ ] **Step 2: Add route inside `<Routes>` in the `App` function**

Find the existing routes block:
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} />} />
  <Route path="/terms" element={<TermsOfService onBack={() => navigate('/')} />} />
</Routes>
```

Replace with:
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} />} />
  <Route path="/terms" element={<TermsOfService onBack={() => navigate('/')} />} />
  <Route path="/support" element={<Support onBack={() => navigate('/')} />} />
</Routes>
```

- [ ] **Step 3: Add Support link to footer**

Find the footer links block in `HomePage`:
```jsx
<div className="flex gap-4">
  <a href="/privacy"
    className="text-gray-400 hover:text-white transition-colors"
    style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
  >
    Privacy Policy
  </a>
  <a href="/terms"
    className="text-gray-400 hover:text-white transition-colors"
    style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
  >
    Terms of Service
  </a>
</div>
```

Replace with:
```jsx
<div className="flex gap-4">
  <a href="/privacy"
    className="text-gray-400 hover:text-white transition-colors"
    style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
  >
    Privacy Policy
  </a>
  <a href="/terms"
    className="text-gray-400 hover:text-white transition-colors"
    style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
  >
    Terms of Service
  </a>
  <a href="/support"
    className="text-gray-400 hover:text-white transition-colors"
    style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
  >
    Support
  </a>
</div>
```

- [ ] **Step 4: Start dev server and verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173/support` — expect to see "Need Help?" heading and 4 cards.
Open `http://localhost:5173/` — expect footer to show "Support" link.
Click "← Back to Home" on support page — expect navigation back to `/`.

- [ ] **Step 5: Commit**

```bash
git add src/Support.jsx src/App.jsx
git commit -m "feat: add /support page with docs, faq, discord, email cards"
```
