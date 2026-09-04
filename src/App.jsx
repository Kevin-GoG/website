import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Layers,
  TrendingUp,
  PanelRight,
  ArrowLeftRight,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import Support from './Support';
import Feedback from './Feedback';
import FAQ from './FAQ';
import Pricing from './Pricing';
import { useTranslation } from './useTranslation';
import { useTheme } from './useTheme';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="glass-card"
  >
    <div className="feature-icon">
      <Icon size={24} />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </motion.div>
);

export function LanguageThemeSelector({ theme, setTheme }) {
  const { lang, changeLanguage, t } = useTranslation();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
      {/* Language select */}
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="theme-select"
      >
        <option value="en">EN</option>
        <option value="zh">繁中</option>
        <option value="ko">KO</option>
      </select>

      {/* Theme select */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="theme-select"
      >
        <option value="dark">🌙 {t('theme_dark')}</option>
        <option value="light">☀️ {t('theme_light')}</option>
        <option value="system">💻 {t('theme_system')}</option>
      </select>
    </div>
  );
}

function BatchSendDemo() {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const parseCSV = (text) => {
    setError('');
    const lines = text.trim().split('\n').filter(l => l.trim());
    const parsed = [];
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length < 2) {
        setError(t('batch_err_format').replace('{line}', (i + 1).toString()));
        return;
      }
      const address = parts[0].trim();
      const amount = parts[1].trim();
      if (!/^(0x[0-9a-fA-F]{64}|0x[0-9a-fA-F]{40})$/.test(address)) {
        setError(t('batch_err_address').replace('{line}', (i + 1).toString()));
        return;
      }
      if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        setError(t('batch_err_amount').replace('{line}', (i + 1).toString()));
        return;
      }
      parsed.push({ address, amount });
    }
    setRows(parsed);
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setError(t('batch_err_csv'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => parseCSV(e.target.result);
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const total = rows.reduce((sum, r) => sum + parseFloat(r.amount), 0);

  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="batch-section">
          <div className="batch-header">
            <div className="feature-icon" style={{ width: '3.5rem', height: '3.5rem', margin: '0 auto 1.5rem' }}>
              <Zap size={28} />
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>{t('batch_title')}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              {t('batch_subtitle')}
            </p>
          </div>

          <div className="batch-demo">
            {/* Batch screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="batch-screenshot"
            >
              <img src="/assets/batch.webp" alt="Pro Wallet for IOTA high-throughput batch send interface — upload CSV to send IOTA to multiple addresses" className="feature-screenshot" width="360" height="600" loading="lazy" />
            </motion.div>

            {/* Example table (preview of the expected CSV format) */}
            <div className="csv-preview" style={{ marginBottom: '1rem' }}>
              <div className="csv-preview-header">
                <CheckCircle size={16} style={{ color: '#22c55e' }} />
                <span>{t('batch_btn_example')}</span>
              </div>
              <div className="csv-table-wrap">
                <table className="csv-table">
                  <thead>
                    <tr>
                      <th>{t('batch_tbl_hash')}</th>
                      <th>{t('batch_tbl_address')}</th>
                      <th>{t('batch_tbl_amount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>1</td>
                      <td className="csv-addr">0x1a2b3c4d5e…0f1a2b</td>
                      <td>10.5</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>2</td>
                      <td className="csv-addr">0x2b3c4d5e6f…0f1a2b3c</td>
                      <td>25.0</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--text-muted)' }}>3</td>
                      <td className="csv-addr">0x3c4d5e6f7a…0f1a2b3c4d</td>
                      <td>5.75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.75rem', textAlign: 'center' }}>
                {t('batch_dropzone_sub')}
              </p>
            </div>

            {/* Upload Area */}
            <div
              className={`csv-drop-zone ${dragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <Upload size={32} style={{ marginBottom: '0.75rem', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('batch_dropzone_main')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{t('batch_dropzone_sub')}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="csv-error">
                <AlertCircle size={16} />
                <span>{error}</span>
                <X size={16} style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => setError('')} />
              </div>
            )}

            {/* Preview Table */}
            {rows.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="csv-preview">
                <div className="csv-preview-header">
                  <CheckCircle size={16} style={{ color: '#22c55e' }} />
                  <span>{rows.length} {t('batch_parsed_recipients')}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {t('batch_total')} <strong style={{ color: 'var(--text-main)' }}>{total.toFixed(4)} IOTA</strong>
                  </span>
                </div>
                <div className="csv-table-wrap">
                  <table className="csv-table">
                    <thead>
                      <tr>
                        <th>{t('batch_tbl_hash')}</th>
                        <th>{t('batch_tbl_address')}</th>
                        <th>{t('batch_tbl_amount')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={i}>
                          <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                          <td className="csv-addr">{r.address.slice(0, 10)}…{r.address.slice(-8)}</td>
                          <td>{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
                  {t('batch_preview_tip')}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ComparisonSection() {
  const { t } = useTranslation();
  return (
    <section id="comparison" className="section" aria-labelledby="comparison-heading">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="pricing-badge">{t('comparison_badge')}</span>
          <h2 id="comparison-heading" className="section-title" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            {t('comparison_title')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
            {t('comparison_subtitle')}
          </p>
        </div>

        <div className="glass-card comparison-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="col-feature" style={{ width: '31%' }}>{t('comparison_col_feature')}</th>
                <th className="col-peer" style={{ width: '23%' }}>{t('comparison_col_evm')}</th>
                <th className="col-peer" style={{ width: '23%' }}>{t('comparison_col_legacy')}</th>
                <th className="col-highlight" style={{ width: '23%' }}>{t('comparison_col_pro')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-feature">{t('comparison_row_dual')}</td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_dual_evm')}</span></td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--warning">⚠️ {t('comparison_row_dual_legacy')}</span></td>
                <td className="col-highlight"><span className="comparison-badge-pill comparison-badge-pill--success">✅ {t('comparison_row_dual_pro')}</span></td>
              </tr>
              <tr>
                <td className="col-feature">{t('comparison_row_batch')}</td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_batch_evm')}</span></td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_batch_legacy')}</span></td>
                <td className="col-highlight"><span className="comparison-badge-pill comparison-badge-pill--success">✅ {t('comparison_row_batch_pro')}</span></td>
              </tr>
              <tr>
                <td className="col-feature">{t('comparison_row_addr')}</td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_addr_evm')}</span></td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--warning">⚠️ {t('comparison_row_addr_legacy')}</span></td>
                <td className="col-highlight"><span className="comparison-badge-pill comparison-badge-pill--success">✅ {t('comparison_row_addr_pro')}</span></td>
              </tr>
              <tr>
                <td className="col-feature">{t('comparison_row_bridge')}</td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_bridge_evm')}</span></td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--warning">⚠️ {t('comparison_row_bridge_legacy')}</span></td>
                <td className="col-highlight"><span className="comparison-badge-pill comparison-badge-pill--success">✅ {t('comparison_row_bridge_pro')}</span></td>
              </tr>
              <tr>
                <td className="col-feature">{t('comparison_row_sidepanel')}</td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_sidepanel_evm')}</span></td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--danger">❌ {t('comparison_row_sidepanel_legacy')}</span></td>
                <td className="col-highlight"><span className="comparison-badge-pill comparison-badge-pill--success">✅ {t('comparison_row_sidepanel_pro')}</span></td>
              </tr>
              <tr>
                <td className="col-feature">{t('comparison_row_security')}</td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--warning">⚠️ {t('comparison_row_security_evm')}</span></td>
                <td className="col-peer"><span className="comparison-badge-pill comparison-badge-pill--warning">⚠️ {t('comparison_row_security_legacy')}</span></td>
                <td className="col-highlight"><span className="comparison-badge-pill comparison-badge-pill--success">✅ {t('comparison_row_security_pro')}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}

function UseCasesSection() {
  const { t } = useTranslation();
  const cases = [
    { tag: t('usecase_1_tag'), title: t('usecase_1_title'), desc: t('usecase_1_desc'), icon: TrendingUp },
    { tag: t('usecase_2_tag'), title: t('usecase_2_title'), desc: t('usecase_2_desc'), icon: Zap },
    { tag: t('usecase_3_tag'), title: t('usecase_3_title'), desc: t('usecase_3_desc'), icon: Shield },
    { tag: t('usecase_4_tag'), title: t('usecase_4_title'), desc: t('usecase_4_desc'), icon: CheckCircle },
  ];

  return (
    <section id="use-cases" className="section" aria-labelledby="usecases-heading">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="pricing-badge">{t('usecases_badge')}</span>
          <h2 id="usecases-heading" className="section-title" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            {t('usecases_title')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            {t('usecases_subtitle')}
          </p>
        </div>

        <div className="usecases-grid">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card usecase-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="showcase-tag" style={{ margin: 0 }}>{c.tag}</span>
                  <div className="feature-icon" style={{ width: '2.5rem', height: '2.5rem', margin: 0 }}>
                    <Icon size={18} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  {c.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {c.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function StandardsSection() {
  const { t } = useTranslation();
  return (
    <section id="standards" className="section" aria-labelledby="standards-heading">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="pricing-badge">{t('standards_badge')}</span>
          <h2 id="standards-heading" className="section-title" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            {t('standards_title')}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            {t('standards_subtitle')}
          </p>
        </div>

        <div className="standards-grid">
          <div className="glass-card standard-item">
            <h4 className="standard-label">{t('standards_crypto')}</h4>
            <p className="standard-value">{t('standards_crypto_desc')}</p>
          </div>
          <div className="glass-card standard-item">
            <h4 className="standard-label">{t('standards_mnemonic')}</h4>
            <p className="standard-value">{t('standards_mnemonic_desc')}</p>
          </div>
          <div className="glass-card standard-item">
            <h4 className="standard-label">{t('standards_web3')}</h4>
            <p className="standard-value">{t('standards_web3_desc')}</p>
          </div>
          <div className="glass-card standard-item">
            <h4 className="standard-label">{t('standards_networks')}</h4>
            <p className="standard-value">{t('standards_networks_desc')}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HomePage({ theme, setTheme }) {
  const navigate = useNavigate();
  const { lang, t, getLocalizedLink } = useTranslation();

  return (
    <div className="app-container">
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('meta_title')}</title>
        <meta name="description" content={t('meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://walletpro.agentsblockchains.com/' : `https://walletpro.agentsblockchains.com/${lang}`} />
        <link rel="alternate" hreflang="x-default" href="https://walletpro.agentsblockchains.com/" />
        <link rel="alternate" hreflang="en" href="https://walletpro.agentsblockchains.com/" />
        <link rel="alternate" hreflang="zh-Hant" href="https://walletpro.agentsblockchains.com/zh" />
        <link rel="alternate" hreflang="ko" href="https://walletpro.agentsblockchains.com/ko" />
        <meta property="og:title" content={t('meta_title')} />
        <meta property="og:description" content={t('meta_desc')} />
        <meta property="og:url" content={lang === 'en' ? 'https://walletpro.agentsblockchains.com/' : `https://walletpro.agentsblockchains.com/${lang}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta_title')} />
        <meta name="twitter:description" content={t('meta_desc')} />
        <meta name="twitter:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Pro Wallet for IOTA",
          "applicationCategory": "FinanceApplication",
          "applicationSubCategory": "Cryptocurrency Wallet",
          "operatingSystem": "Chrome, Brave, Edge, Chromium",
          "softwareVersion": "1.0.0",
          "description": t('meta_desc'),
          "url": "https://walletpro.agentsblockchains.com",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "128",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Free Tier",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Pro Monthly",
              "price": "5.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Pro Annual",
              "price": "45.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Pro Lifetime",
              "price": "125.99",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          ],
          "featureList": [
            "Dual-Layer Architecture: IOTA Layer 1 (Move VM) & IOTA EVM (Layer 2)",
            "High-Throughput Batch Send & Bulk Token Disbursement with CSV Import",
            "Anti-Mistransfer Address Book with Protocol-Level Zero-Typo Validation",
            "Native Cross-Layer Asset Bridge (IOTA L1 ↔ IOTA EVM) with Real-Time Gas Visibility",
            "Native Validator Staking & Auto-Compounding Yields on L1 Move",
            "Persistent Chrome Side Panel Mode for Seamless Web3 Multitasking",
            "Standard EIP-1193, EIP-6963 & IOTA Wallet Standard dApp Connectivity",
            "Memory-Hard Client-Side Encryption (Argon2id 64MB + AES-256-GCM)",
            "Automatic 30-Second Clipboard Sanitizer for Sensitive Data",
            "Balance Finder Multi-Derivation Account Scanner",
            "100% Self-Custodial & Non-Custodial Architecture",
            "18 Curated Native Languages Support"
          ],
          "publisher": {
            "@type": "Organization",
            "name": "Pro Wallet for IOTA",
            "url": "https://walletpro.agentsblockchains.com",
            "email": "support@agentsblockchains.com"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Pro Wallet for IOTA",
          "url": "https://walletpro.agentsblockchains.com"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pro Wallet for IOTA",
          "url": "https://walletpro.agentsblockchains.com",
          "logo": "https://walletpro.agentsblockchains.com/assets/og-image.png",
          "email": "support@agentsblockchains.com"
        })}</script>
      </Helmet>
      <div className="gradient-bg"></div>

      <nav className="nav">
        <div className="logo cursor-pointer" onClick={() => navigate(getLocalizedLink('/'))}>
          {t('nav_logo')}
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {t('nav_features')}
          </a>
          <a href={getLocalizedLink('/pricing')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {t('nav_pricing')}
          </a>
          <a href={getLocalizedLink('/faq')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {t('nav_faq')}
          </a>
          <a href={getLocalizedLink('/support')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {t('nav_support')}
          </a>
          <LanguageThemeSelector theme={theme} setTheme={setTheme} />
          <span className="btn-primary" style={{ padding: '0.5rem 1.25rem', cursor: 'default', opacity: 0.9 }}>
            {t('nav_install')}
          </span>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              {t('hero_title')} <span className="text-gradient">{t('hero_title_gradient')}</span>
            </h1>
            <p className="hero-subtitle">
              {t('hero_subtitle')}
            </p>
            <div className="flex gap-4">
              <span className="btn-primary" style={{ cursor: 'default', opacity: 0.95 }}>
                {t('hero_btn_install')} <Download size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-image-container"
          >
            <img
              src="/assets/hero-concept.webp"
              alt="Pro Wallet for IOTA Chrome extension interface displaying IOTA L1 Move and EVM balances, native staking, and transactions"
              className="hero-image"
              width="640"
              height="720"
              fetchpriority="high"
            />
          </motion.div>
        </section>

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
              icon={Layers}
              title={t('feature_2_title')}
              description={t('feature_2_desc')}
              delay={0.15}
            />
            <FeatureCard
              icon={TrendingUp}
              title={t('feature_3_title')}
              description={t('feature_3_desc')}
              delay={0.2}
            />
            <FeatureCard
              icon={ArrowLeftRight}
              title={t('feature_4_title')}
              description={t('feature_4_desc')}
              delay={0.25}
            />
            <FeatureCard
              icon={Zap}
              title={t('feature_5_title')}
              description={t('feature_5_desc')}
              delay={0.3}
            />
            <FeatureCard
              icon={PanelRight}
              title={t('feature_6_title')}
              description={t('feature_6_desc')}
              delay={0.35}
            />
          </div>
        </section>

        <section className="section" aria-labelledby="about-iota-wallet-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ margin: '0 auto', textAlign: 'left' }}
          >
            <h2 id="about-iota-wallet-pro" className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              {t('about_title')}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1rem' }}>
              {t('about_p1')}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: 0 }}>
              {t('about_p2')}
            </p>
          </motion.div>
        </section>

        <BatchSendDemo />

        {/* Feature Showcase */}
        <section id="showcase" className="section">
          <h2 className="section-title">{t('showcase_title')}</h2>

          {/* Bridge */}
          <div className="showcase-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">{t('showcase_bridge_tag')}</div>
              <h3 className="showcase-title">{t('showcase_bridge_title')}</h3>
              <p className="showcase-desc">{t('showcase_bridge_desc')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/bridge.webp" alt="Pro Wallet for IOTA L1 to EVM bridge — transfer IOTA between native chain and IOTA EVM" className="feature-screenshot" width="360" height="600" loading="lazy" />
            </motion.div>
          </div>

          {/* Staking */}
          <div className="showcase-row reverse">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/staking.webp" alt="Pro Wallet for IOTA native validator staking on L1 Move with live APY rewards" className="feature-screenshot" width="375" height="640" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">{t('showcase_staking_tag')}</div>
              <h3 className="showcase-title">{t('showcase_staking_title')}</h3>
              <p className="showcase-desc">{t('showcase_staking_desc')}</p>
            </motion.div>
          </div>

          {/* Address Book */}
          <div className="showcase-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">{t('showcase_addr_tag')}</div>
              <h3 className="showcase-title">{t('showcase_addr_title')}</h3>
              <p className="showcase-desc">{t('showcase_addr_desc')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/addressbook1.webp" alt="Pro Wallet for IOTA anti-mistransfer address book with verified contacts" className="feature-screenshot" width="360" height="600" loading="lazy" />
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="showcase-row reverse">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/sidepanel.webp" alt="Pro Wallet for IOTA persistent Chrome side panel docked beside decentralized exchange" className="feature-screenshot" width="500" height="600" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">{t('showcase_sidepanel_tag')}</div>
              <h3 className="showcase-title">{t('showcase_sidepanel_title')}</h3>
              <p className="showcase-desc">{t('showcase_sidepanel_desc')}</p>
            </motion.div>
          </div>

          {/* Multi-Account */}
          <div className="showcase-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">{t('showcase_multi_tag')}</div>
              <h3 className="showcase-title">{t('showcase_multi_title')}</h3>
              <p className="showcase-desc">{t('showcase_multi_desc')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/addressbook2.webp" alt="Pro Wallet for IOTA multi-account management — multiple mnemonic profiles with derived accounts" className="feature-screenshot" width="519" height="885" loading="lazy" />
            </motion.div>
          </div>
        </section>

        <ComparisonSection />
        <UseCasesSection />
        <StandardsSection />
      </main>

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

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    document.dispatchEvent(new Event('app-rendered'));
  }, []);

  return (
    <Routes>
      {/* English Routes */}
      <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/pricing" element={<Pricing theme={theme} setTheme={setTheme} />} />
      <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/terms" element={<TermsOfService onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/support" element={<Support onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/feedback" element={<Feedback onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/faq" element={<FAQ theme={theme} setTheme={setTheme} />} />

      {/* Traditional Chinese Routes */}
      <Route path="/zh" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/pricing" element={<Pricing theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/privacy" element={<PrivacyPolicy onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/terms" element={<TermsOfService onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/support" element={<Support onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/feedback" element={<Feedback onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/faq" element={<FAQ theme={theme} setTheme={setTheme} />} />

      {/* Korean Routes */}
      <Route path="/ko" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/pricing" element={<Pricing theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/privacy" element={<PrivacyPolicy onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/terms" element={<TermsOfService onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/support" element={<Support onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/feedback" element={<Feedback onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/faq" element={<FAQ theme={theme} setTheme={setTheme} />} />
    </Routes>
  );
}

export default App;
