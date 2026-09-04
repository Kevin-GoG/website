import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations, faqTranslations } from '../src/translations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

const SITE_URL = 'https://walletpro.agentsblockchains.com';
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

const languages = [
  { code: 'en', prefix: '', htmlLang: 'en', hreflang: 'en' },
  { code: 'zh', prefix: '/zh', htmlLang: 'zh-Hant', hreflang: 'zh-Hant' },
  { code: 'ko', prefix: '/ko', htmlLang: 'ko', hreflang: 'ko' },
];

const pages = [
  { slug: '', titleKey: 'meta_title', descKey: 'meta_desc', breadcrumb: null },
  { slug: '/pricing', titleKey: 'pricing_meta_title', descKey: 'pricing_meta_desc', breadcrumb: 'Pricing' },
  { slug: '/faq', titleKey: 'faq_meta_title', descKey: 'faq_meta_desc', breadcrumb: 'FAQ', faq: true },
  { slug: '/support', titleKey: 'support_meta_title', descKey: 'support_meta_desc', breadcrumb: 'Support' },
  { slug: '/feedback', titleKey: 'feedback_meta_title', descKey: 'feedback_meta_desc', breadcrumb: 'Feedback' },
  { slug: '/privacy', titleKey: 'privacy_meta_title', descKey: 'privacy_meta_desc', breadcrumb: 'Privacy Policy' },
  { slug: '/terms', titleKey: 'terms_meta_title', descKey: 'terms_meta_desc', breadcrumb: 'Terms of Service' },
];

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const routePath = (language, slug) => `${language.prefix}${slug}` || '/';
const urlFor = (language, slug) => `${SITE_URL}${routePath(language, slug) === '/' ? '/' : routePath(language, slug)}`;
const englishUrlFor = (slug) => `${SITE_URL}${slug || '/'}`;

const outputFileFor = (route) => route === '/'
  ? join(distDir, 'index.html')
  : join(distDir, route.slice(1), 'index.html');

const hasPageSeo = (html) => (
  /<title>[^<]+<\/title>/.test(html)
  && /<meta name="description"/.test(html)
  && /<link rel="canonical"/.test(html)
);

function pageSchemas(language, page) {
  const schemas = [];

  if (!page.slug) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Pro Wallet for IOTA',
      applicationCategory: 'FinanceApplication',
      applicationSubCategory: 'Cryptocurrency Wallet',
      operatingSystem: 'Chrome, Brave, Edge, Chromium',
      softwareVersion: '1.0.0',
      description: translations[language.code].meta_desc,
      url: SITE_URL,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '128',
        bestRating: '5',
        worstRating: '1',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Free Tier',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Pro Monthly',
          price: '5.99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Pro Annual',
          price: '45.99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Pro Lifetime',
          price: '125.99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      ],
      featureList: [
        'Dual-Layer Architecture: IOTA Layer 1 (Move VM) & IOTA EVM (Layer 2)',
        'High-Throughput Batch Send & Bulk Token Disbursement with CSV Import',
        'Anti-Mistransfer Address Book with Protocol-Level Zero-Typo Validation',
        'Native Cross-Layer Asset Bridge (IOTA L1 ↔ IOTA EVM) with Real-Time Gas Visibility',
        'Native Validator Staking & Auto-Compounding Yields on L1 Move',
        'Persistent Chrome Side Panel Mode for Seamless Web3 Multitasking',
        'Standard EIP-1193, EIP-6963 & IOTA Wallet Standard dApp Connectivity',
        'Memory-Hard Client-Side Encryption (Argon2id 64MB + AES-256-GCM)',
        'Automatic 30-Second Clipboard Sanitizer for Sensitive Data',
        'Balance Finder Multi-Derivation Account Scanner',
        '100% Self-Custodial & Non-Custodial Architecture',
        '18 Curated Native Languages Support',
      ],
      publisher: {
        '@type': 'Organization',
        name: 'Pro Wallet for IOTA',
        url: SITE_URL,
        email: 'support@agentsblockchains.com',
      },
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pro Wallet for IOTA',
      url: SITE_URL,
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pro Wallet for IOTA',
      url: SITE_URL,
      logo: OG_IMAGE,
      email: 'support@agentsblockchains.com',
    });
  }

  if (page.faq) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqTranslations[language.code].flatMap((category) =>
        category.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      ),
    });
  }

  if (page.breadcrumb) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: englishUrlFor(page.slug) },
      ],
    });
  }

  return schemas;
}

function seoHead(language, page) {
  const t = translations[language.code];
  const title = t[page.titleKey];
  const description = t[page.descKey];
  const canonical = urlFor(language, page.slug);

  const alternates = languages.map((alternateLanguage) => {
    const href = urlFor(alternateLanguage, page.slug);
    return `    <link rel="alternate" hreflang="${alternateLanguage.hreflang}" href="${href}" />`;
  }).join('\n');

  const schemas = pageSchemas(language, page)
    .map((schema) => `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n');

  return `    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${englishUrlFor(page.slug)}" />
${alternates}
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
${schemas}`;
}

function injectSeo(template, language, page) {
  let html = template.replace(/<html lang="[^"]*"/, `<html lang="${language.htmlLang}"`);
  html = html.replace(/\n\s*<\/head>/, `\n${seoHead(language, page)}\n  </head>`);
  return html;
}

const template = readFileSync(join(distDir, 'index.html'), 'utf8');
let generated = 0;
let skipped = 0;

for (const language of languages) {
  for (const page of pages) {
    const route = routePath(language, page.slug);
    const outputFile = outputFileFor(route);
    let current = null;

    try {
      current = readFileSync(outputFile, 'utf8');
    } catch {
      // Route file does not exist in non-prerendered CI builds.
    }

    if (current && hasPageSeo(current)) {
      skipped += 1;
      continue;
    }

    mkdirSync(dirname(outputFile), { recursive: true });
    writeFileSync(outputFile, injectSeo(template, language, page), 'utf8');
    generated += 1;
  }
}

console.log(`SEO pages generated: ${generated}; prerendered pages skipped: ${skipped}`);
