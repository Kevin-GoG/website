import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

const CATEGORIES = ['Bug Report', 'Feature Request', 'General Feedback'];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.65rem 0.9rem',
  color: 'var(--text-main)',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const Feedback = ({ onBack, theme, setTheme }) => {
  const { lang, t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', category: 'General Feedback', message: '' });
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getCategoryLabel = (cat) => {
    if (cat === 'Bug Report') {
      return lang === 'zh' ? '報告錯誤' : lang === 'ko' ? '버그 보고' : 'Bug Report';
    }
    if (cat === 'Feature Request') {
      return lang === 'zh' ? '功能建議' : lang === 'ko' ? '기능 요청' : 'Feature Request';
    }
    return lang === 'zh' ? '一般反饋' : lang === 'ko' ? '일반 피드백' : 'General Feedback';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('feedback_meta_title')}</title>
        <meta name="description" content={t('feedback_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://iotawallet.8787887.xyz/feedback' : `https://iotawallet.8787887.xyz/${lang}/feedback`} />
        <link rel="alternate" hreflang="x-default" href="https://iotawallet.8787887.xyz/feedback" />
        <link rel="alternate" hreflang="en" href="https://iotawallet.8787887.xyz/feedback" />
        <link rel="alternate" hreflang="zh-Hant" href="https://iotawallet.8787887.xyz/zh/feedback" />
        <link rel="alternate" hreflang="ko" href="https://iotawallet.8787887.xyz/ko/feedback" />
        <meta property="og:title" content={t('feedback_meta_title')} />
        <meta property="og:description" content={t('feedback_meta_desc')} />
        <meta property="og:url" content={lang === 'en' ? 'https://iotawallet.8787887.xyz/feedback' : `https://iotawallet.8787887.xyz/${lang}/feedback`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('feedback_meta_title')} />
        <meta name="twitter:description" content={t('feedback_meta_desc')} />
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

      <main style={{ maxWidth: '640px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-icon">
              <MessageSquare size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>{t('feedback_title')}</h1>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            {t('feedback_desc')}
          </p>

          {status === 'success' ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>
                {t('feedback_success_title')}
              </p>
              <p style={{ color: 'var(--text-muted)' }}>{t('feedback_success_desc')}</p>
            </div>
          ) : (
            <form className="glass-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  {t('feedback_label_name')}
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('feedback_placeholder_name')}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  {t('feedback_label_email')}
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('feedback_placeholder_email')}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  {t('feedback_label_category')}
                </label>
                <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} style={{ background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
                      {getCategoryLabel(c)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  {t('feedback_label_message')} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t('feedback_placeholder_message')}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                  {t('feedback_error')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', opacity: status === 'submitting' ? 0.6 : 1 }}
              >
                {status === 'submitting' ? t('feedback_btn_sending') : t('feedback_btn_send')}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Feedback;
