# Support Page Design

**Date:** 2026-05-30  
**Route:** `/support`

## Overview

A dedicated support page for IOTA Wallet users. Follows the same layout pattern as `/privacy` and `/terms`. Provides four self-service and contact options in a 2×2 card grid.

## Layout

- Top nav: "← Back to Home" button (same as PrivacyPolicy/TermsOfService)
- Header: `LifeBuoy` icon + "Need Help?" h1 + subtitle
- Body: 2×2 `glass-card` grid (reuses existing CSS class)
- Footer: same as HomePage

## Cards

| # | Icon (lucide) | Title | Description | Action |
|---|---------------|-------|-------------|--------|
| 1 | `BookOpen` | Search Documentation | Browse the official IOTA docs for guides, API references, and tutorials. | Link → `https://docs.iota.org` |
| 2 | `HelpCircle` | Read FAQ | Find answers to the most common questions about IOTA Wallet. | Link → `https://wiki.iota.org/get-started/faq/` |
| 3 | `MessageCircle` | Join Discord | Get real-time help from the IOTA community and support team. | Link → `#` (placeholder) |
| 4 | `Mail` | Contact via Email | Can't find what you need? Send us a message directly. | `mailto:iota.wallet@hotmail.com` |

All external links open in `_blank` with `rel="noopener noreferrer"`.

## Files Changed

- `src/Support.jsx` — new page component
- `src/App.jsx` — add `<Route path="/support">` + import; add Support link to footer

## Out of Scope

- No search functionality
- No ticket/form system
- No FAQ accordion on the page itself (links out to IOTA wiki)
