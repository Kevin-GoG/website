import React from 'react';
import { BookOpen, HelpCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SUPPORT_ITEMS = [
  {
    icon: BookOpen,
    title: 'Search Documentation',
    description: 'Browse the official IOTA docs for guides, API references, and tutorials.',
    label: 'View Docs',
    href: 'https://docs.iota.org',
    external: true,
  },
  {
    icon: HelpCircle,
    title: 'Read FAQ',
    description: 'Find answers to the most common questions about IOTA Wallet.',
    label: 'Read FAQ',
    href: 'https://docs.iota.org/about-iota/FAQ',
    external: true,
  },
  {
    icon: MessageSquare,
    title: 'Feedback',
    description: 'Share your thoughts, report issues, or suggest improvements.',
    label: 'Give Feedback',
    href: '/feedback',
    external: false,
  },
];

const cardStyle = { textDecoration: 'none', display: 'block', cursor: 'pointer' };

const SupportCard = ({ icon: Icon, title, description, label, href, external, delay }) => {
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

const Support = ({ onBack }) => (
  <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
    <div className="gradient-bg"></div>

    <nav className="nav" style={{ marginBottom: '3rem' }}>
      <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
        <ArrowLeft size={20} /> Back to Home
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
            <Mail size={32} />
          </div>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Need Help?</h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Choose the best way to get support for IOTA Wallet.
        </p>

        <div className="features-grid">
          {SUPPORT_ITEMS.map((item, i) => (
            <SupportCard key={item.title} {...item} delay={i * 0.1} />
          ))}
        </div>
      </motion.div>
    </main>
  </div>
);

export default Support;
