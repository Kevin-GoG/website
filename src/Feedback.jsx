import React, { useState } from 'react';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['Bug Report', 'Feature Request', 'General Feedback'];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  padding: '0.65rem 0.9rem',
  color: '#f8fafc',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const Feedback = ({ onBack }) => {
  const [form, setForm] = useState({ name: '', email: '', category: 'General Feedback', message: '' });
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <div className="gradient-bg"></div>

      <nav className="nav" style={{ marginBottom: '3rem' }}>
        <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
          <ArrowLeft size={20} /> Back to Home
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
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Feedback</h1>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Share your thoughts, report issues, or suggest improvements.
          </p>

          {status === 'success' ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>
                Thank you for your feedback!
              </p>
              <p style={{ color: 'var(--text-muted)' }}>We'll review it and get back to you if needed.</p>
            </div>
          ) : (
            <form className="glass-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Name <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Email <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Category
                </label>
                <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                  {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: '#1e293b', color: '#f8fafc' }}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#e5e7eb', fontSize: '0.9rem' }}>
                  Message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your feedback..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', opacity: status === 'submitting' ? 0.6 : 1 }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Feedback;
