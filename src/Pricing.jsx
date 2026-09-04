import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Check,
  Zap,
  Shield,
  Layers,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Lock,
  CreditCard,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

const PricingFAQItem = ({ question, answer, isOpen, onClick }) => (
  <div style={{ marginBottom: '0.75rem' }}>
    <button
      className={`faq-question ${isOpen ? 'faq-question--open' : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
      type="button"
    >
      <span style={{ fontWeight: 600 }}>{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="faq-chevron"
      >
        <ChevronDown size={18} />
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
  </div>
);

export default function Pricing({ theme, setTheme }) {
  const navigate = useNavigate();
  const { lang, t, getLocalizedLink } = useTranslation();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual' | 'lifetime'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Schema.org Structured Data
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pro Wallet for IOTA",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Chrome",
    "softwareVersion": "1.0",
    "description": t('pricing_meta_desc'),
    "url": "https://walletpro.agentsblockchains.com/pricing",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Tier",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free forever entry tier with 3 monthly bridges, 3 batch transfers, and full core wallet features."
      },
      {
        "@type": "Offer",
        "name": "Pro Monthly",
        "price": "5.99",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "description": "Pro monthly subscription with unlimited bridge, batch transfers, and side panel."
      },
      {
        "@type": "Offer",
        "name": "Pro Annual",
        "price": "45.99",
        "priceCurrency": "USD",
        "billingDuration": "P1Y",
        "description": "Pro annual subscription with ~36% discount and all unlimited Pro features."
      },
      {
        "@type": "Offer",
        "name": "Pro Lifetime",
        "price": "125.99",
        "priceCurrency": "USD",
        "billingDuration": "P1Y",
        "description": "Permanent one-time purchase with unrestricted access to all current and future Pro features."
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Pro Wallet for IOTA",
      "url": "https://walletpro.agentsblockchains.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://walletpro.agentsblockchains.com/" },
      { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://walletpro.agentsblockchains.com/pricing" }
    ]
  };

  const comparisonRows = [
    {
      category: t('pricing_cat_core'),
      items: [
        { name: t('pricing_matrix_accounts'), free: t('pricing_matrix_accounts_val'), pro: t('pricing_matrix_accounts_val'), highlight: false },
        { name: t('pricing_matrix_dapps'), free: t('pricing_matrix_dapps_val'), pro: t('pricing_matrix_dapps_val'), highlight: false },
        { name: t('pricing_matrix_security'), free: t('pricing_matrix_security_val'), pro: t('pricing_matrix_security_val'), highlight: false },
        { name: t('pricing_matrix_networks'), free: t('pricing_matrix_networks_val'), pro: t('pricing_matrix_networks_val'), highlight: false },
        { name: t('pricing_matrix_staking'), free: t('pricing_matrix_staking_val'), pro: t('pricing_matrix_staking_val'), highlight: false },
        { name: t('pricing_matrix_history'), free: t('pricing_matrix_history_val'), pro: t('pricing_matrix_history_val'), highlight: false },
      ]
    },
    {
      category: t('pricing_cat_power'),
      items: [
        { name: t('pricing_matrix_addr'), free: t('pricing_matrix_addr_free'), pro: t('pricing_matrix_addr_pro'), highlight: true },
        { name: t('pricing_matrix_bridge'), free: t('pricing_matrix_bridge_free'), pro: t('pricing_matrix_bridge_pro'), highlight: true },
        { name: t('pricing_matrix_batch'), free: t('pricing_matrix_batch_free'), pro: t('pricing_matrix_batch_pro'), highlight: true },
        { name: t('pricing_matrix_finder'), free: t('pricing_matrix_finder_val'), pro: t('pricing_matrix_finder_val'), highlight: false },
        { name: t('pricing_matrix_sidepanel'), free: t('pricing_matrix_sidepanel_val'), pro: t('pricing_matrix_sidepanel_val'), highlight: false },
        { name: t('pricing_matrix_swaps'), free: t('pricing_matrix_swaps_free'), pro: t('pricing_matrix_swaps_pro'), highlight: true },
      ]
    },
    {
      category: t('pricing_cat_support'),
      items: [
        { name: t('pricing_matrix_priority'), free: t('pricing_matrix_priority_free'), pro: t('pricing_matrix_priority_pro'), highlight: true },
      ]
    }
  ];

  const faqs = [
    { q: t('pricing_faq_q1'), a: t('pricing_faq_a1') },
    { q: t('pricing_faq_q2'), a: t('pricing_faq_a2') },
    { q: t('pricing_faq_q3'), a: t('pricing_faq_a3') },
    { q: t('pricing_faq_q4'), a: t('pricing_faq_a4') },
    { q: t('pricing_faq_q5'), a: t('pricing_faq_a5') },
  ];

  return (
    <div className="app-container subpage-container">
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('pricing_meta_title')}</title>
        <meta name="description" content={t('pricing_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://walletpro.agentsblockchains.com/pricing' : `https://walletpro.agentsblockchains.com/${lang}/pricing`} />
        <link rel="alternate" hreflang="x-default" href="https://walletpro.agentsblockchains.com/pricing" />
        <link rel="alternate" hreflang="en" href="https://walletpro.agentsblockchains.com/pricing" />
        <link rel="alternate" hreflang="zh-Hant" href="https://walletpro.agentsblockchains.com/zh/pricing" />
        <link rel="alternate" hreflang="ko" href="https://walletpro.agentsblockchains.com/ko/pricing" />
        <meta property="og:title" content={t('pricing_meta_title')} />
        <meta property="og:description" content={t('pricing_meta_desc')} />
        <meta property="og:url" content={lang === 'en' ? 'https://walletpro.agentsblockchains.com/pricing' : `https://walletpro.agentsblockchains.com/${lang}/pricing`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('pricing_meta_title')} />
        <meta name="twitter:description" content={t('pricing_meta_desc')} />
        <meta name="twitter:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(pricingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <div className="gradient-bg"></div>

      {/* Nav */}
      <nav className="nav">
        <div className="logo cursor-pointer flex items-center gap-2" onClick={() => navigate(getLocalizedLink('/'))}>
          <ArrowLeft size={20} /> {t('nav_back')}
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href={getLocalizedLink('/faq')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
            {t('nav_faq')}
          </a>
          <a href={getLocalizedLink('/support')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
            {t('nav_support')}
          </a>
          <LanguageThemeSelector theme={theme} setTheme={setTheme} />
          <span className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', cursor: 'default', opacity: 0.9 }}>
            {t('nav_install')}
          </span>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="showcase-tag" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            {t('pricing_badge')}
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            {t('pricing_title')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            {t('pricing_subtitle')}
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pricing-toggle-container">
            <button
              type="button"
              className={`pricing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              {t('pricing_billing_monthly')}
              <span className="pricing-cycle-hint">$5.99/mo</span>
            </button>
            <button
              type="button"
              className={`pricing-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              {t('pricing_billing_annual')}
              <span className="pricing-save-pill">{t('pricing_save_badge')}</span>
              <span className="pricing-cycle-hint">$45.99/yr</span>
            </button>
            <button
              type="button"
              className={`pricing-toggle-btn ${billingCycle === 'lifetime' ? 'active' : ''}`}
              onClick={() => setBillingCycle('lifetime')}
            >
              {t('pricing_billing_lifetime')}
              <span className="pricing-cycle-hint">$125.99</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {/* Free Tier Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card pricing-card"
          >
            <div className="pricing-card-header">
              <div className="pricing-tier-tag">{t('pricing_free_title')}</div>
              <div className="pricing-price-wrap">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">0</span>
                <span className="pricing-period">{t('pricing_forever')}</span>
              </div>
              <p className="pricing-tier-desc">{t('pricing_free_desc')}</p>
            </div>

            <div className="pricing-divider"></div>

            <ul className="pricing-features-list">
              <li>
                <Check size={18} className="text-success" />
                <span>{t('pricing_feature_unlimited_accounts')}</span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span>{t('pricing_feature_unlimited_dapps')}</span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span>{t('pricing_feature_full_history')}</span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span><strong>{t('pricing_feature_free_addr')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span><strong>{t('pricing_feature_free_bridge')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span><strong>{t('pricing_feature_free_batch')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span>{t('pricing_feature_balance_finder')}</span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span>{t('pricing_feature_side_panel')}</span>
              </li>
              <li>
                <Check size={18} className="text-success" />
                <span>{t('pricing_feature_free_swaps')}</span>
              </li>
            </ul>

            <div className="pricing-card-footer">
              <span
                className="btn-outline"
                style={{ width: '100%', textAlign: 'center', padding: '0.85rem', display: 'block', fontWeight: 600, cursor: 'default', opacity: 0.9 }}
              >
                {t('pricing_free_btn')}
              </span>
            </div>
          </motion.div>

          {/* Pro Tier Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card pricing-card pricing-card--featured"
          >
            {/* Top Featured Ribbon */}
            <div className="pricing-ribbon">
              {billingCycle === 'annual' ? (
                <>⭐ {t('pricing_popular_badge')} (Save 36%)</>
              ) : billingCycle === 'lifetime' ? (
                <>👑 {t('pricing_best_value')} (Pay Once, Own Forever)</>
              ) : (
                <>⚡ Flexible Monthly Plan</>
              )}
            </div>

            <div className="pricing-card-header">
              <div className="pricing-tier-tag pricing-tier-tag--pro">
                <Zap size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {billingCycle === 'monthly' && t('pricing_pro_monthly_title')}
                {billingCycle === 'annual' && t('pricing_pro_annual_title')}
                {billingCycle === 'lifetime' && t('pricing_pro_lifetime_title')}
              </div>

              <div className="pricing-price-wrap">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">
                  {billingCycle === 'monthly' && '5.99'}
                  {billingCycle === 'annual' && '45.99'}
                  {billingCycle === 'lifetime' && '125.99'}
                </span>
                <span className="pricing-period">
                  {billingCycle === 'monthly' && t('pricing_per_month')}
                  {billingCycle === 'annual' && t('pricing_per_year')}
                  {billingCycle === 'lifetime' && ` (${t('pricing_one_time')})`}
                </span>
              </div>

              {billingCycle === 'annual' && (
                <div className="pricing-sub-calculation">
                  Equivalent to <strong>$3.83/mo</strong> · Billed annually at $45.99/year
                </div>
              )}
              {billingCycle === 'lifetime' && (
                <div className="pricing-sub-calculation">
                  No subscriptions or recurring fees · Lifetime access
                </div>
              )}
              {billingCycle === 'monthly' && (
                <div className="pricing-sub-calculation">
                  Billed monthly · Cancel anytime without penalty
                </div>
              )}

              <p className="pricing-tier-desc">
                {billingCycle === 'monthly' && t('pricing_pro_monthly_desc')}
                {billingCycle === 'annual' && t('pricing_pro_annual_desc')}
                {billingCycle === 'lifetime' && t('pricing_pro_lifetime_desc')}
              </p>
            </div>

            <div className="pricing-divider"></div>

            <ul className="pricing-features-list">
              <li>
                <Check size={18} className="text-primary-check" />
                <span>{t('pricing_feature_unlimited_accounts')}</span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span>{t('pricing_feature_unlimited_dapps')}</span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span>{t('pricing_feature_full_history')}</span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span><strong>{t('pricing_feature_pro_addr')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span><strong>{t('pricing_feature_pro_bridge')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span><strong>{t('pricing_feature_pro_batch')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span>{t('pricing_feature_balance_finder')}</span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span>{t('pricing_feature_side_panel')}</span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span><strong>{t('pricing_feature_pro_swaps')}</strong></span>
              </li>
              <li>
                <Check size={18} className="text-primary-check" />
                <span><strong>{t('pricing_feature_priority_access')}</strong></span>
              </li>
            </ul>

            <div className="pricing-card-footer">
              <span
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center', padding: '0.85rem', display: 'block', fontWeight: 600, cursor: 'default', opacity: 0.95 }}
              >
                {t('pricing_pro_btn')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* All Tiers Quick Summary Strip */}
        <div className="pricing-summary-strip">
          <div className="pricing-strip-card">
            <h4>Free Tier</h4>
            <div className="strip-price">$0</div>
            <p>10 Contacts · 3 Bridges/mo · 3 Batches/mo</p>
          </div>
          <div className={`pricing-strip-card ${billingCycle === 'monthly' ? 'selected' : ''}`} onClick={() => setBillingCycle('monthly')}>
            <h4>Pro Monthly</h4>
            <div className="strip-price">$5.99 <span>/ mo</span></div>
            <p>Unlimited Quotas · Cancel anytime</p>
          </div>
          <div className={`pricing-strip-card ${billingCycle === 'annual' ? 'selected' : ''}`} onClick={() => setBillingCycle('annual')}>
            <span className="strip-badge">-36%</span>
            <h4>Pro Annual</h4>
            <div className="strip-price">$45.99 <span>/ yr</span></div>
            <p>~$3.83/mo · Most popular savings</p>
          </div>
          <div className={`pricing-strip-card ${billingCycle === 'lifetime' ? 'selected' : ''}`} onClick={() => setBillingCycle('lifetime')}>
            <span className="strip-badge">One-Time</span>
            <h4>Pro Lifetime</h4>
            <div className="strip-price">$125.99 <span>flat</span></div>
            <p>Permanent access · No recurring fees</p>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginTop: '5rem', marginBottom: '5rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>{t('pricing_matrix_title')}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{t('pricing_matrix_subtitle')}</p>
          </div>

          <div className="pricing-matrix-wrap glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <table className="pricing-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>{t('pricing_matrix_col_feature')}</th>
                  <th style={{ width: '30%', textAlign: 'center' }}>{t('pricing_matrix_col_free')}</th>
                  <th style={{ width: '30%', textAlign: 'center' }} className="col-highlight">
                    {t('pricing_matrix_col_pro')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    <tr className="matrix-group-row">
                      <td colSpan={3}>{group.category}</td>
                    </tr>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="matrix-item-row">
                        <td className="matrix-feature-name">
                          {item.name}
                        </td>
                        <td className="matrix-val matrix-val--free">
                          {item.free === 'Included' || item.free === 'Unlimited' ? (
                            <span className="matrix-check"><Check size={16} /> {item.free}</span>
                          ) : (
                            item.free
                          )}
                        </td>
                        <td className="matrix-val matrix-val--pro col-highlight">
                          {item.pro === 'Included' || item.pro === 'Unlimited' ? (
                            <span className="matrix-check matrix-check--primary"><Check size={16} /> {item.pro}</span>
                          ) : (
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.pro}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Guarantees & Transparency */}
        <div className="features-grid" style={{ marginBottom: '5rem' }}>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div className="feature-icon" style={{ margin: '0 auto 1.25rem' }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>100% Self-Custody</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Your private keys and seed phrase are encrypted with Argon2id + AES-256 on your machine and never touch any server.
            </p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div className="feature-icon" style={{ margin: '0 auto 1.25rem' }}>
              <CreditCard size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Transparent Pricing</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Exact flat prices publicly displayed in USD. No hidden setup charges, surprise renewals, or transaction surcharges.
            </p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div className="feature-icon" style={{ margin: '0 auto 1.25rem' }}>
              <RefreshCw size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cancel Anytime</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Subscriptions can be canceled at any moment with no lock-in. You retain access until the end of your billing cycle.
            </p>
          </div>
        </div>

        {/* Pricing FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>{t('pricing_faq_title')}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{t('pricing_faq_subtitle')}</p>
          </div>

          <div className="faq-list" style={{ maxWidth: '840px', margin: '0 auto' }}>
            {faqs.map((item, idx) => (
              <PricingFAQItem
                key={idx}
                question={item.q}
                answer={item.a}
                isOpen={openFaqIndex === idx}
                onClick={() => toggleFaq(idx)}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <section className="cta-section" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Get Started with Pro Wallet for IOTA Today
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto 2rem' }}>
            Install the extension in seconds. Enjoy free access immediately or upgrade to Pro for unlimited power features.
          </p>
          <span
            className="btn-primary"
            style={{ fontSize: '1.1rem', padding: '0.85rem 2rem', cursor: 'default', opacity: 0.95 }}
          >
            {t('hero_btn_install')}
          </span>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="logo cursor-pointer" style={{ marginBottom: '1rem' }} onClick={() => navigate(getLocalizedLink('/'))}>
            {t('nav_logo')}
          </div>
          <p>{t('footer_desc')}</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex gap-4">
            <a href={getLocalizedLink('/pricing')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              {t('footer_pricing')}
            </a>
            <a href={getLocalizedLink('/privacy')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              {t('footer_privacy')}
            </a>
            <a href={getLocalizedLink('/terms')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              {t('footer_terms')}
            </a>
            <a href={getLocalizedLink('/support')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              {t('footer_support')}
            </a>
            <a href={getLocalizedLink('/faq')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              {t('footer_faq')}
            </a>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            {t('footer_copy')}
          </div>
        </div>
      </footer>
    </div>
  );
}
