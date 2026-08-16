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
      name: 'IOTA Wallet Pro',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Chrome',
      softwareVersion: '1.0',
      description: translations[language.code].meta_desc,
      url: SITE_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: 'IOTA Wallet Pro',
        url: SITE_URL,
      },
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'IOTA Wallet Pro',
      url: SITE_URL,
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IOTA Wallet Pro',
      url: SITE_URL,
      logo: OG_IMAGE,
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
