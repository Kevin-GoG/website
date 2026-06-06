# Homepage SEO Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one SEO-focused About section to the homepage, add an `Organization` JSON-LD schema, and sync the SEO strategy doc so the site has stronger indexable product copy without changing the overall layout.

**Architecture:** The implementation stays inside the existing Vite + React SPA. The homepage UI and homepage JSON-LD both live in `src/App.jsx`, so the feature is implemented there with minimal surface area. Documentation sync happens separately in `docs/SEO_STRATEGY.md` after the code change is verified.

**Tech Stack:** React, react-helmet-async, Framer Motion, Vite, static markdown docs

---

## File Map

| File | Responsibility |
|---|---|
| `src/App.jsx` | Add the new About section to the homepage and append an `Organization` schema script in the existing `<Helmet>` block |
| `docs/SEO_STRATEGY.md` | Record the newly completed homepage SEO improvements after implementation is verified |

---

### Task 1: Add Homepage About Section

**Files:**
- Modify: `src/App.jsx`
- Verify: homepage layout in browser after build

This task adds one new homepage section between the existing Features section and `BatchSendDemo`. It keeps the current visual system, uses semantic HTML, and adds indexable product copy.

- [ ] **Step 1: Find the insertion point in `src/App.jsx`**

Read the `HomePage` markup and locate this existing sequence:

```jsx
        {/* Features Section */}
        <section id="features" className="section">
          <h2 className="section-title">{t('features_title')}</h2>
          <div className="features-grid">
            <FeatureCard
              icon={Shield}
              title={t('feature_1_title')}
              description={t('feature_1_desc')}
              delay={0.1}
            />
            <FeatureCard
              icon={Zap}
              title={t('feature_2_title')}
              description={t('feature_2_desc')}
              delay={0.2}
            />
            <FeatureCard
              icon={Layers}
              title={t('feature_3_title')}
              description={t('feature_3_desc')}
              delay={0.3}
            />
          </div>
        </section>

        <BatchSendDemo />
```

The new About section must be inserted **between** `</section>` and `<BatchSendDemo />`.

- [ ] **Step 2: Insert the new About section markup**

Insert this exact block:

```jsx
        <section className="section" aria-labelledby="about-iota-wallet-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          >
            <h2 id="about-iota-wallet-pro" className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              About IOTA Wallet Pro
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1rem' }}>
              IOTA Wallet Pro is a self-custodial Chrome extension wallet built for the IOTA ecosystem. It helps users manage both IOTA L1 and IOTA EVM accounts from one interface, with local key encryption and no hosted wallet account system.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: 0 }}>
              The wallet is designed for users who need more than basic transfers. It supports cross-chain bridge flows, batch sending, address book management, and multiple accounts, making it suitable for both everyday usage and advanced IOTA workflows.
            </p>
          </motion.div>
        </section>
```

This matches the approved spec: one section, one `h2`, two paragraphs, no extra cards, no new component extraction.

- [ ] **Step 3: Build to verify the code compiles**

Run:

```bash
cd h:/web3/gemini/website && npm run build
```

Expected: Vite build succeeds with no JSX or syntax errors.

- [ ] **Step 4: Run the app and visually verify placement**

Run:

```bash
cd h:/web3/gemini/website && npm run dev
```

Expected: local dev server starts successfully.

Then verify in the browser:
- the new section appears **below Features and above BatchSendDemo**
- the section uses the existing dark/glass visual language
- the title is an `h2`
- the two paragraphs are readable on desktop width
- no existing section spacing is broken

- [ ] **Step 5: Commit the homepage section change**

Run:

```bash
cd h:/web3/gemini/website
git add src/App.jsx
git commit -m "feat: add homepage about section for SEO"
```

---

### Task 2: Add Organization JSON-LD to Homepage Helmet

**Files:**
- Modify: `src/App.jsx`
- Verify: rendered homepage head tags in browser

This task adds a third JSON-LD script inside the existing homepage `<Helmet>` block. It must not alter the existing `SoftwareApplication` or `WebSite` scripts.

- [ ] **Step 1: Find the existing schema block in `src/App.jsx`**

Locate this current code inside `HomePage`:

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

- [ ] **Step 2: Append the `Organization` schema immediately after the existing `WebSite` schema**

Add this exact script after the `WebSite` script:

```jsx
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "IOTA Wallet Pro",
          "url": "https://iotawallet.8787887.xyz"
        })}</script>
```

Do **not** add `sameAs`. Do **not** duplicate extra fields. Keep it minimal as specified.

- [ ] **Step 3: Build again to verify no JSX or Helmet issues**

Run:

```bash
cd h:/web3/gemini/website && npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Verify rendered head output in browser**

Run the local site if it is not already running:

```bash
cd h:/web3/gemini/website && npm run dev
```

Open the homepage and verify:
- only one title is present
- the existing meta tags still appear once
- three JSON-LD scripts are present for homepage: `SoftwareApplication`, `WebSite`, `Organization`
- there are no obvious duplicate Helmet tags

- [ ] **Step 5: Commit the schema change**

Run:

```bash
cd h:/web3/gemini/website
git add src/App.jsx
git commit -m "seo: add Organization schema to homepage"
```

---

### Task 3: Sync SEO Strategy Documentation

**Files:**
- Modify: `docs/SEO_STRATEGY.md`

After the homepage code is implemented and verified, update the documentation so it reflects the current codebase state.

- [ ] **Step 1: Update the structured data row**

Find this current line in `docs/SEO_STRATEGY.md`:

```md
| **Schema.org 结构化数据** | ✅ **已启用** | 首页配置了增强版 `SoftwareApplication`（含 `softwareVersion`、`publisher`）和 `WebSite` 结构化数据，FAQ 页面配置了动态本地化的 `FAQPage` 结构化数据，用于在搜索结果中争取富媒体摘要（Rich Snippets）下拉抽屉的展示。 |
```

Replace it with:

```md
| **Schema.org 结构化数据** | ✅ **已启用** | 首页配置了增强版 `SoftwareApplication`（含 `softwareVersion`、`publisher`）、`WebSite` 与 `Organization` 结构化数据，FAQ 页面配置了动态本地化的 `FAQPage` 结构化数据，用于在搜索结果中争取富媒体摘要（Rich Snippets）下拉抽屉的展示。 |
```

- [ ] **Step 2: Add a new completed SEO row for homepage content enrichment**

Find this current table segment:

```md
| **页面级 Twitter Card 标签** | ✅ **已启用** | Support、Feedback、Privacy、Terms 四个次级页面均已补全 `twitter:card`、`twitter:title`、`twitter:description`，确保 X/Twitter 分享时每个页面有独立预览。 |
| **图片 SEO 与 LCP 优化** | ✅ **已启用** | 所有 5 张产品截图已更新为描述性 alt 文案（含 "IOTA Wallet Pro"、功能名称等关键词）；hero 主图加入 `fetchpriority="high"` 提示浏览器优先加载，改善 LCP 指标。 |
```

Insert this new row between them:

```md
| **首页产品说明内容区块** | ✅ **已启用** | 首页新增了 `About IOTA Wallet Pro` 内容区块，以自然语言解释产品定位、IOTA L1 / EVM 支持、自托管特性，以及 bridge / batch sending / multiple accounts 等能力，增强品牌词与长尾关键词覆盖。 |
```

- [ ] **Step 3: Verify the markdown reads cleanly**

Run:

```bash
cd h:/web3/gemini/website && sed -n '10,22p' docs/SEO_STRATEGY.md
```

Expected: the markdown table renders as valid rows with the new homepage content row included.

- [ ] **Step 4: Commit the documentation sync**

Run:

```bash
cd h:/web3/gemini/website
git add docs/SEO_STRATEGY.md
git commit -m "docs: update SEO strategy for homepage enhancement"
```

---

### Task 4: Final Verification and Push

**Files:**
- Verify: `src/App.jsx`
- Verify: `docs/SEO_STRATEGY.md`

This final task confirms the feature as a whole before publishing.

- [ ] **Step 1: Run a final production build**

Run:

```bash
cd h:/web3/gemini/website && npm run build
```

Expected: production build succeeds.

- [ ] **Step 2: Run the local site and inspect the homepage**

Run:

```bash
cd h:/web3/gemini/website && npm run dev
```

Verify all of the following in the browser:
- the homepage shows the new `About IOTA Wallet Pro` section
- the section is between Features and BatchSendDemo
- the section has one `h2` and two paragraphs
- no obvious spacing/layout regressions exist
- homepage still has only one title element in the rendered head
- homepage structured data includes `SoftwareApplication`, `WebSite`, and `Organization`

- [ ] **Step 3: Check git status before pushing**

Run:

```bash
cd h:/web3/gemini/website && git status
```

Expected: working tree is clean.

- [ ] **Step 4: Push the commits**

Run:

```bash
cd h:/web3/gemini/website && git push kevin master
```

Expected: all homepage SEO enhancement commits push successfully.

- [ ] **Step 5: Optional deployment follow-up**

After Cloudflare redeploys, verify the live homepage at `https://iotawallet.8787887.xyz/`:
- About section visible
- no duplicated `<title>`
- page still loads correctly

---

## Self-Review

### Spec coverage
- About section UI: covered in Task 1
- Keep visual system intact: covered in Task 1 verification
- Add `Organization` schema: covered in Task 2
- Avoid duplicate head tags: checked in Task 2 and Task 4
- Sync `SEO_STRATEGY.md`: covered in Task 3

### Placeholder scan
- No TBD/TODO placeholders remain
- Each code-changing step contains exact code or exact replacement targets
- Each verification step includes exact commands and expected outcomes

### Type consistency
- The new section stays inside `HomePage`
- The schema name is consistently `Organization`
- The homepage heading ID is consistently `about-iota-wallet-pro`
