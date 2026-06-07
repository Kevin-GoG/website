# Technical SEO Completion Design

**Date:** 2026-06-07  
**Scope:** IOTA Wallet Pro website page-level head tags and structured data

## Goal

Complete the remaining low-risk technical SEO gaps without changing the site's UI, routing, or content strategy.

The current site already has page-level Helmet metadata, canonical URLs, hreflang alternates, homepage schema, FAQ schema, sitemap, robots.txt, and WebP product screenshots. This design focuses only on small technical consistency improvements that are unlikely to affect layout or user-facing behavior.

## Non-Goals

This round does not include:

- Adding blog/tutorial pages
- Adding more product copy or FAQ content
- Changing sitemap language strategy
- Re-adding `/zh` or `/ko` URLs to sitemap
- Changing routes or navigation
- Replacing `og-image.png` with WebP
- Adding broad, speculative schema types with unclear benefit

## Chosen Approach

Use the minimal technical completion approach:

1. Add `BreadcrumbList` structured data to the remaining secondary pages.
2. Add consistent Open Graph and Twitter image tags to secondary pages.
3. Keep the current sitemap structure unchanged.
4. Verify the project still builds.

This approach is preferred because it closes clear consistency gaps while avoiding larger SEO strategy changes that could reintroduce Google Search Console noise.

## Current State

Known current SEO state:

- Homepage has title, description, canonical, hreflang, Open Graph, Twitter, `SoftwareApplication`, `WebSite`, and `Organization` schema.
- FAQ has canonical, hreflang, FAQ schema, Twitter card, and BreadcrumbList schema.
- Support, Feedback, Privacy, and Terms have title, description, canonical, hreflang, and Twitter card metadata.
- Some secondary pages do not yet have `og:image` / `twitter:image` tags.
- Support, Feedback, Privacy, and Terms do not yet have BreadcrumbList schema.
- `public/sitemap.xml` currently lists 6 English canonical URLs and intentionally omits `/zh` and `/ko` variants.

## Page-Level Changes

### BreadcrumbList schema

Add a two-level `BreadcrumbList` JSON-LD script to these pages:

- `/support`: Home > Support
- `/feedback`: Home > Feedback
- `/privacy`: Home > Privacy Policy
- `/terms`: Home > Terms of Service

FAQ already has BreadcrumbList and should be checked but not duplicated.

Each BreadcrumbList should use the canonical English URL for the `item` fields, matching the site's current sitemap strategy.

### OG/Twitter image tags

Add these tags to secondary pages that do not already have them:

```jsx
<meta property="og:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
<meta name="twitter:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
```

The `og-image.png` file should remain PNG for social platform compatibility.

### Sitemap strategy

Do not change `public/sitemap.xml` in this round.

Reason: the project previously removed `/zh` and `/ko` variants from sitemap to avoid Search Console crawl noise. The current page-level hreflang tags already communicate the language relationships. Reintroducing multilingual sitemap entries is a broader indexing strategy decision and is outside this low-risk round.

## Files

Expected files to modify:

- `src/Support.jsx`
- `src/Feedback.jsx`
- `src/PrivacyPolicy.jsx`
- `src/TermsOfService.jsx`

Expected files to inspect but not necessarily modify:

- `src/FAQ.jsx`
- `src/App.jsx`
- `public/sitemap.xml`

## Verification

Implementation is complete only if:

1. `npm run build` succeeds.
2. The four target secondary pages include BreadcrumbList schema exactly once.
3. FAQ still has only one BreadcrumbList schema.
4. Secondary pages include `og:image` and `twitter:image` pointing to `https://iotawallet.8787887.xyz/assets/og-image.png`.
5. No UI markup outside `<Helmet>` is changed.
6. `public/sitemap.xml` remains unchanged.

## Risks and Mitigations

### Risk: Duplicate schema scripts

Mitigation: inspect FAQ before editing and add BreadcrumbList only to pages that lack it.

### Risk: Adding inconsistent URLs

Mitigation: use canonical English URLs in BreadcrumbList item fields, consistent with sitemap.

### Risk: Over-expanding schema

Mitigation: only add BreadcrumbList in this round. Do not add ContactPage, PrivacyPolicy, TermsOfService, or WebPage schema unless a later design explicitly approves it.

## Spec Self-Review

- **Placeholder scan:** No TBD/TODO placeholders remain.
- **Internal consistency:** Scope, file list, and verification criteria all match the chosen minimal technical SEO approach.
- **Scope check:** Focused enough for one implementation plan.
- **Ambiguity check:** Sitemap strategy, schema scope, and image tag target URL are explicit.
