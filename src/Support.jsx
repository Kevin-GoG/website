import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, HelpCircle, MessageSquare, ArrowLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  const { lang, t, getLocalizedLink } = useTranslation();

  const supportItems = [
    {
      icon: Mail,
      title: t('support_email_title'),
      description: t('support_email_desc'),
      label: t('support_email_label'),
      href: 'mailto:support@agentsblockchains.com',
      external: true,
    },
    {
      icon: CreditCard,
      title: t('nav_pricing'),
      description: t('pricing_subtitle'),
      label: t('nav_pricing'),
      href: getLocalizedLink('/pricing'),
      external: false,
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
    <div className="app-container subpage-container">
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('support_meta_title')}</title>
        <meta name="description" content={t('support_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://walletpro.agentsblockchains.com/support' : `https://walletpro.agentsblockchains.com/${lang}/support`} />
        <link rel="alternate" hreflang="x-default" href="https://walletpro.agentsblockchains.com/support" />
        <link rel="alternate" hreflang="en" href="https://walletpro.agentsblockchains.com/support" />
        <link rel="alternate" hreflang="zh-Hant" href="https://walletpro.agentsblockchains.com/zh/support" />
        <link rel="alternate" hreflang="ko" href="https://walletpro.agentsblockchains.com/ko/support" />
        <meta property="og:title" content={t('support_meta_title')} />
        <meta property="og:description" content={t('support_meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={lang === 'en' ? 'https://walletpro.agentsblockchains.com/support' : `https://walletpro.agentsblockchains.com/${lang}/support`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('support_meta_title')} />
        <meta name="twitter:description" content={t('support_meta_desc')} />
        <meta property="og:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://walletpro.agentsblockchains.com/" },
            { "@type": "ListItem", "position": 2, "name": "Support", "item": "https://walletpro.agentsblockchains.com/support" }
          ]
        })}</script>
      </Helmet>
      <div className="gradient-bg"></div>

      <nav className="nav">
        <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
          <ArrowLeft size={20} /> {t('nav_back')}
        </div>
        <div className="nav-links">
          <a href={getLocalizedLink('/pricing')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
            {t('nav_pricing')}
          </a>
          <a href={getLocalizedLink('/faq')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
            {t('nav_faq')}
          </a>
          <LanguageThemeSelector theme={theme} setTheme={setTheme} />
          <span className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', cursor: 'default', opacity: 0.9 }}>
            {t('nav_install')}
          </span>
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

          <div className="glass-card" style={{ marginTop: '2.5rem', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="feature-icon" style={{ marginBottom: 0 }}>
                <Mail size={24} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>{t('support_contact_direct')}</h4>
                <a href="mailto:support@agentsblockchains.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>
                  support@agentsblockchains.com
                </a>
              </div>
            </div>
            <a href="mailto:support@agentsblockchains.com" className="btn-outline" style={{ fontSize: '0.875rem' }}>
              support@agentsblockchains.com
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Support;
