import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from './useTranslation';
import { faqTranslations } from './translations';
import { LanguageThemeSelector } from './App';

const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <button
      className={`faq-question ${isOpen ? 'faq-question--open' : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span>{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="faq-chevron"
      >
        <ChevronDown size={20} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="faq-answer-wrapper"
        >
          <div className="faq-answer">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const { lang, t, getLocalizedLink } = useTranslation();
  const [openId, setOpenId] = useState(null);

  const faqData = faqTranslations[lang] || faqTranslations['en'];

  // Dynamically generate the localized schema markup for FAQ page
  const allFaqItems = faqData.reduce((acc, category) => [...acc, ...category.items], []);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('faq_meta_title')}</title>
        <meta name="description" content={t('faq_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://iotawallet.8787887.xyz/faq' : `https://iotawallet.8787887.xyz/${lang}/faq`} />
        <link rel="alternate" hreflang="x-default" href="https://iotawallet.8787887.xyz/faq" />
        <link rel="alternate" hreflang="en" href="https://iotawallet.8787887.xyz/faq" />
        <link rel="alternate" hreflang="zh-Hant" href="https://iotawallet.8787887.xyz/zh/faq" />
        <link rel="alternate" hreflang="ko" href="https://iotawallet.8787887.xyz/ko/faq" />
        <meta property="og:title" content={t('faq_meta_title')} />
        <meta property="og:description" content={t('faq_meta_desc')} />
        <meta property="og:url" content={lang === 'en' ? 'https://iotawallet.8787887.xyz/faq' : `https://iotawallet.8787887.xyz/${lang}/faq`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('faq_meta_title')} />
        <meta name="twitter:description" content={t('faq_meta_desc')} />
        <meta name="twitter:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://iotawallet.8787887.xyz/" },
            { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://iotawallet.8787887.xyz/faq" }
          ]
        })}</script>
      </Helmet>
      <div className="gradient-bg"></div>

      <nav className="nav" style={{ marginBottom: '3rem' }}>
        <div className="logo cursor-pointer flex items-center gap-2" onClick={() => navigate(getLocalizedLink('/'))}>
          <ArrowLeft size={20} /> {t('nav_back')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LanguageThemeSelector theme={theme} setTheme={setTheme} />
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
              <HelpCircle size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>
              {t('faq_page_title')}
            </h1>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}
            dangerouslySetInnerHTML={{ __html: t('faq_intro').replace('{link}', `<a href="${getLocalizedLink('/support')}" style="color: var(--primary); text-decoration: underline">${t('faq_intro_link')}</a>`) }}>
          </p>

          {faqData.map((cat, catIdx) => (
            <div key={cat.category} className="faq-category">
              <h2 className="faq-category-title">{cat.category}</h2>
              <div className="faq-list">
                {cat.items.map((item, itemIdx) => {
                  const uniqueId = `${catIdx}-${itemIdx}`;
                  return (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openId === uniqueId}
                      onClick={() => setOpenId(openId === uniqueId ? null : uniqueId)}
                      index={itemIdx}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="footer" style={{ maxWidth: '860px', margin: '4rem auto 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {t('footer_copy')}
        </p>
      </footer>
    </div>
  );
};

export default FAQ;
