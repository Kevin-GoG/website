import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, HelpCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

const SupportCard = ({ icon: Icon, title, description, label, href, external, delay }) => {
  const cardStyle = { textDecoration: 'none', display: 'block', cursor: 'pointer' };
  const inner = (
    <>
      <div className="feature-icon"><Icon size={24} /></div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description" style={{ marginBottom: '1.5rem' }}>{description}</p>
      <span className="btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>{label}</span>
    </>
  );

  if (external) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('mailto') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="glass-card"
        style={cardStyle}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card"
      style={cardStyle}
    >
      <Link to={href} style={cardStyle}>
        {inner}
      </Link>
    </motion.div>
  );
};

const Support = ({ onBack, theme, setTheme }) => {
  const navigate = useNavigate();
  const { lang, t, getLocalizedLink } = useTranslation();

  const supportItems = [
    {
      icon: BookOpen,
      title: t('support_doc_title'),
      description: t('support_doc_desc'),
      label: t('support_doc_label'),
      href: 'https://docs.iota.org',
      external: true,
    },
    {
      icon: HelpCircle,
      title: t('support_faq_title'),
      description: t('support_faq_desc'),
      label: t('support_faq_label'),
      href: getLocalizedLink('/faq'),
      external: false,
    },
    {
      icon: MessageSquare,
      title: t('support_feedback_title'),
      description: t('support_feedback_desc'),
      label: t('support_feedback_label'),
      href: getLocalizedLink('/feedback'),
      external: false,
    },
  ];

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('support_meta_title')}</title>
        <meta name="description" content={t('support_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://info.web3wallet.qzz.io/support' : `https://info.web3wallet.qzz.io/${lang}/support`} />
        <link rel="alternate" hreflang="x-default" href="https://info.web3wallet.qzz.io/support" />
        <link rel="alternate" hreflang="en" href="https://info.web3wallet.qzz.io/support" />
        <link rel="alternate" hreflang="zh-Hant" href="https://info.web3wallet.qzz.io/zh/support" />
        <link rel="alternate" hreflang="ko" href="https://info.web3wallet.qzz.io/ko/support" />
        <meta property="og:title" content={t('support_meta_title')} />
        <meta property="og:description" content={t('support_meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={lang === 'en' ? 'https://info.web3wallet.qzz.io/support' : `https://info.web3wallet.qzz.io/${lang}/support`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('support_meta_title')} />
        <meta name="twitter:description" content={t('support_meta_desc')} />
        <meta property="og:image" content="https://info.web3wallet.qzz.io/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://info.web3wallet.qzz.io/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://info.web3wallet.qzz.io/" },
            { "@type": "ListItem", "position": 2, "name": "Support", "item": "https://info.web3wallet.qzz.io/support" }
          ]
        })}</script>
      </Helmet>
      <div className="gradient-bg"></div>

      <nav className="nav" style={{ marginBottom: '3rem' }}>
        <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
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
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>{t('support_title')}</h1>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
            {t('support_subtitle')}
          </p>

          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {supportItems.map((item, i) => (
              <SupportCard key={item.title} {...item} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Support;
