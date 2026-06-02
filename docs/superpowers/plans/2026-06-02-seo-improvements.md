# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the remaining SEO gaps for iotawallet.8787887.xyz — structured data, per-page meta, image alt text, and sitemap accuracy.

**Architecture:** The site is a Vite + React SPA using `react-helmet-async` for dynamic `<head>` tags. Each page already has a `<Helmet>` block for title/canonical/OG. Remaining gaps are: (1) `SoftwareApplication` JSON-LD missing `downloadUrl`/`softwareVersion`; (2) `WebSite` + `Organization` schema not present anywhere; (3) `Support`, `Feedback`, `Terms`, `Privacy` pages missing per-page `<Helmet>` `twitter:card`; (4) image `alt` attributes are generic; (5) hero image missing `fetchpriority="high"` hint for LCP; (6) sitemap references `/zh` and `/ko` language routes that don't actually exist in `App.jsx` routes.

**Tech Stack:** React, react-helmet-async, Vite, Cloudflare Pages, `public/` static files

---

## File Map

| File | Change |
|---|---|
| `src/App.jsx` | Enhance `<Helmet>` JSON-LD; fix image alt; add `fetchpriority`; add `WebSite`+`Organization` schema |
| `src/Support.jsx` | Add `twitter:card` meta tags to existing `<Helmet>` |
| `src/Feedback.jsx` | Add `twitter:card` meta tags to existing `<Helmet>` |
| `src/PrivacyPolicy.jsx` | Add `twitter:card` meta tags to existing `<Helmet>` |
| `src/TermsOfService.jsx` | Add `twitter:card` meta tags to existing `<Helmet>` |
| `public/sitemap.xml` | Remove `/zh` and `/ko` language variants that don't exist in routing |

---

### Task 1: Enhance JSON-LD in HomePage + Add WebSite Schema

**Files:**
- Modify: `src/App.jsx` (Helmet block around line 263)

The current `SoftwareApplication` schema is missing `softwareVersion` and `downloadUrl`. We also need a `WebSite` schema for sitelinks search box eligibility.

- [ ] **Step 1: Open `src/App.jsx` and find the `<Helmet>` block in `HomePage`** (around line 249–277). The current JSON-LD looks like:

```jsx
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "IOTA Wallet Pro",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Chrome",
  "description": t('meta_desc'),
  "url": lang === 'en' ? 'https://iotawallet.8787887.xyz' : `https://iotawallet.8787887.xyz/${lang}`,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
})}</script>
```

- [ ] **Step 2: Replace that single `<script>` with two schemas** — one `SoftwareApplication` (enhanced) and one `WebSite`:

```jsx
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "IOTA Wallet Pro",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Chrome",
  "softwareVersion": "1.0",
  "description": t('meta_desc'),
  "url": "https://iotawallet.8787887.xyz",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "IOTA Wallet Pro",
    "url": "https://iotawallet.8787887.xyz"
  }
})}</script>
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "IOTA Wallet Pro",
  "url": "https://iotawallet.8787887.xyz"
})}</script>
```

- [ ] **Step 3: Verify no syntax errors**

```bash
cd h:/web3/gemini/website && npm run build 2>&1 | tail -20
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
cd h:/web3/gemini/website
git add src/App.jsx
git commit -m "seo: enhance SoftwareApplication JSON-LD and add WebSite schema"
```

---

### Task 2: Fix Image Alt Text + Add LCP fetchpriority

**Files:**
- Modify: `src/App.jsx` (image tags at lines 152, 329, 387, 400, 435)

Current alt values are generic (`"Batch Send UI"`, `"Bridge UI"`, `"Address Book"`, `"IOTA Wallet Concept"`). The hero image should also have `fetchpriority="high"` to improve LCP score.

- [ ] **Step 1: Update hero image** (around line 328–332):

Change:
```jsx
<img
  src="/assets/hero-concept.png"
  alt="IOTA Wallet Concept"
  className="hero-image"
/>
```

To:
```jsx
<img
  src="/assets/hero-concept.png"
  alt="IOTA Wallet Pro Chrome extension showing IOTA L1 and EVM account balance"
  className="hero-image"
  fetchpriority="high"
/>
```

- [ ] **Step 2: Update batch send image** (around line 152):

Change:
```jsx
<img src="/assets/batch.png" alt="Batch Send UI" className="feature-screenshot" />
```

To:
```jsx
<img src="/assets/batch.png" alt="IOTA Wallet Pro batch send interface — upload CSV to send IOTA to multiple addresses" className="feature-screenshot" />
```

- [ ] **Step 3: Update bridge image** (around line 387):

Change:
```jsx
<img src="/assets/bridge.png" alt="Bridge UI" className="feature-screenshot" />
```

To:
```jsx
<img src="/assets/bridge.png" alt="IOTA Wallet Pro L1 to EVM bridge — transfer IOTA between native chain and IOTA EVM" className="feature-screenshot" />
```

- [ ] **Step 4: Update addressbook1 image** (around line 400):

Change:
```jsx
<img src="/assets/addressbook1.png" alt="Address Book" className="feature-screenshot" />
```

To:
```jsx
<img src="/assets/addressbook1.png" alt="IOTA Wallet Pro address book with L1 and EVM contact filtering" className="feature-screenshot" />
```

- [ ] **Step 5: Update addressbook2 image** (around line 435):

Change:
```jsx
<img src="/assets/addressbook2.png" alt="Account Management" className="feature-screenshot" />
```

To:
```jsx
<img src="/assets/addressbook2.png" alt="IOTA Wallet Pro multi-account management — multiple mnemonic profiles with derived accounts" className="feature-screenshot" />
```

- [ ] **Step 6: Build to verify no errors**

```bash
cd h:/web3/gemini/website && npm run build 2>&1 | tail -10
```

- [ ] **Step 7: Commit**

```bash
cd h:/web3/gemini/website
git add src/App.jsx
git commit -m "seo: improve image alt text and add fetchpriority to hero image"
```

---

### Task 3: Add twitter:card to Support, Feedback, Privacy, Terms Pages

**Files:**
- Modify: `src/Support.jsx` (Helmet around line 85–93)
- Modify: `src/Feedback.jsx` (Helmet around line 59–67)
- Modify: `src/PrivacyPolicy.jsx` (Helmet around line 143–151)
- Modify: `src/TermsOfService.jsx` (Helmet around line 164–172)

Currently these pages have `og:title/description/url` but no `twitter:card` tags, so Twitter/X previews would use the global fallback from `index.html`.

- [ ] **Step 1: Update `src/Support.jsx`** — add 3 lines inside the existing `<Helmet>` block, after the `og:url` line:

```jsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={t('support_meta_title')} />
<meta name="twitter:description" content={t('support_meta_desc')} />
```

- [ ] **Step 2: Update `src/Feedback.jsx`** — add 3 lines inside the existing `<Helmet>` block, after the `og:url` line:

```jsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={t('feedback_meta_title')} />
<meta name="twitter:description" content={t('feedback_meta_desc')} />
```

- [ ] **Step 3: Update `src/PrivacyPolicy.jsx`** — add 3 lines inside the existing `<Helmet>` block, after the `og:url` line:

```jsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={t('privacy_meta_title')} />
<meta name="twitter:description" content={t('privacy_meta_desc')} />
```

- [ ] **Step 4: Update `src/TermsOfService.jsx`** — add 3 lines inside the existing `<Helmet>` block, after the `og:url` line:

```jsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={t('terms_meta_title')} />
<meta name="twitter:description" content={t('terms_meta_desc')} />
```

- [ ] **Step 5: Build to verify no errors**

```bash
cd h:/web3/gemini/website && npm run build 2>&1 | tail -10
```

- [ ] **Step 6: Commit**

```bash
cd h:/web3/gemini/website
git add src/Support.jsx src/Feedback.jsx src/PrivacyPolicy.jsx src/TermsOfService.jsx
git commit -m "seo: add twitter:card meta tags to all secondary pages"
```

---

### Task 4: Fix sitemap.xml — Remove Non-Existent Language Routes

**Files:**
- Modify: `public/sitemap.xml`

The sitemap currently lists `/zh`, `/ko`, `/zh/privacy`, `/ko/privacy`, etc. These routes don't exist in `App.jsx` routing — the app only has English routes (`/`, `/privacy`, `/terms`, `/support`, `/feedback`, `/faq`). Submitting non-existent URLs to Google Search Console causes crawl errors.

- [ ] **Step 1: Replace `public/sitemap.xml` with a clean English-only version:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://iotawallet.8787887.xyz/</loc>
    <lastmod>2026-06-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://iotawallet.8787887.xyz/faq</loc>
    <lastmod>2026-06-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://iotawallet.8787887.xyz/support</loc>
    <lastmod>2026-06-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://iotawallet.8787887.xyz/feedback</loc>
    <lastmod>2026-06-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://iotawallet.8787887.xyz/privacy</loc>
    <lastmod>2026-06-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://iotawallet.8787887.xyz/terms</loc>
    <lastmod>2026-06-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Verify the file is valid XML**

```bash
cd h:/web3/gemini/website && cat public/sitemap.xml | head -5
```

Expected: `<?xml version="1.0" encoding="UTF-8"?>` on line 1.

- [ ] **Step 3: Commit**

```bash
cd h:/web3/gemini/website
git add public/sitemap.xml
git commit -m "seo: remove non-existent zh/ko language routes from sitemap"
```

---

### Task 5: Push All Changes

- [ ] **Step 1: Push to remote**

```bash
cd h:/web3/gemini/website && git push origin master
```

Expected: all 4 commits pushed successfully.

- [ ] **Step 2: Re-submit sitemap in Google Search Console**

Manual step — go to Google Search Console → Sitemaps → remove old sitemap entry → submit `https://iotawallet.8787887.xyz/sitemap.xml` again. This triggers Google to re-crawl with the corrected URL list.

---

## What This Plan Does NOT Cover

- Multi-language (`/zh`, `/ko`) routes — if you want hreflang to work, you'd need to build actual localized routes in `App.jsx` first, then restore those sitemap entries.
- Chrome Web Store `downloadUrl` in JSON-LD — add once extension is published.
- FAQ page `FAQPage` JSON-LD — already implemented in `src/FAQ.jsx`.
- `og:image` for secondary pages — all share the global OG image from `index.html`, which is acceptable.
