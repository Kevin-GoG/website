import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Layers,
  Download,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import Support from './Support';
import Feedback from './Feedback';
import FAQ from './FAQ';
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

const EXAMPLE_CSV = `0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b,10.5
0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c,25.0
0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d,5.75`;

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
              <img src="/assets/batch.png" alt="IOTA Wallet Pro batch send interface — upload CSV to send IOTA to multiple addresses" className="feature-screenshot" />
            </motion.div>

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

            {/* Example download */}
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <button
                className="btn-outline"
                onClick={() => {
                  const blob = new Blob([EXAMPLE_CSV], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'example-batch.csv'; a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <FileText size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                {t('batch_btn_example')}
              </button>
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

function HomePage({ theme, setTheme }) {
  const navigate = useNavigate();
  const { lang, t, getLocalizedLink } = useTranslation();

  return (
    <div className="app-container">
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('meta_title')}</title>
        <meta name="description" content={t('meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://iotawallet.8787887.xyz/' : `https://iotawallet.8787887.xyz/${lang}`} />
        <link rel="alternate" hreflang="x-default" href="https://iotawallet.8787887.xyz/" />
        <link rel="alternate" hreflang="en" href="https://iotawallet.8787887.xyz/" />
        <link rel="alternate" hreflang="zh-Hant" href="https://iotawallet.8787887.xyz/zh" />
        <link rel="alternate" hreflang="ko" href="https://iotawallet.8787887.xyz/ko" />
        <meta property="og:title" content={t('meta_title')} />
        <meta property="og:description" content={t('meta_desc')} />
        <meta property="og:url" content={lang === 'en' ? 'https://iotawallet.8787887.xyz/' : `https://iotawallet.8787887.xyz/${lang}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta_title')} />
        <meta name="twitter:description" content={t('meta_desc')} />
        <meta name="twitter:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
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
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "IOTA Wallet Pro",
          "url": "https://iotawallet.8787887.xyz"
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
          <a href={getLocalizedLink('/faq')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {t('nav_faq')}
          </a>
          <a href={getLocalizedLink('/support')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text-main)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {t('nav_support')}
          </a>
          <LanguageThemeSelector theme={theme} setTheme={setTheme} />
          <a href="#" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
            {t('nav_install')}
          </a>
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
              <a href="#" className="btn-primary">
                {t('hero_btn_install')} <Download size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-image-container"
          >
            <img
              src="/assets/hero-concept.png"
              alt="IOTA Wallet Pro Chrome extension showing IOTA L1 and EVM account balance"
              className="hero-image"
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
              <img src="/assets/bridge.png" alt="IOTA Wallet Pro L1 to EVM bridge — transfer IOTA between native chain and IOTA EVM" className="feature-screenshot" />
            </motion.div>
          </div>

          {/* Address Book */}
          <div className="showcase-row reverse">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/addressbook1.png" alt="IOTA Wallet Pro address book with L1 and EVM contact filtering" className="feature-screenshot" />
            </motion.div>
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
          </div>

          {/* Address Book 2 */}
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
              <img src="/assets/addressbook2.png" alt="IOTA Wallet Pro multi-account management — multiple mnemonic profiles with derived accounts" className="feature-screenshot" />
            </motion.div>
          </div>
        </section>
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
      <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/terms" element={<TermsOfService onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/support" element={<Support onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/feedback" element={<Feedback onBack={() => navigate('/')} theme={theme} setTheme={setTheme} />} />
      <Route path="/faq" element={<FAQ theme={theme} setTheme={setTheme} />} />

      {/* Traditional Chinese Routes */}
      <Route path="/zh" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/privacy" element={<PrivacyPolicy onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/terms" element={<TermsOfService onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/support" element={<Support onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/feedback" element={<Feedback onBack={() => navigate('/zh')} theme={theme} setTheme={setTheme} />} />
      <Route path="/zh/faq" element={<FAQ theme={theme} setTheme={setTheme} />} />

      {/* Korean Routes */}
      <Route path="/ko" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/privacy" element={<PrivacyPolicy onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/terms" element={<TermsOfService onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/support" element={<Support onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/feedback" element={<Feedback onBack={() => navigate('/ko')} theme={theme} setTheme={setTheme} />} />
      <Route path="/ko/faq" element={<FAQ theme={theme} setTheme={setTheme} />} />
    </Routes>
  );
}

export default App;
