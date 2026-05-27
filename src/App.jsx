import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Layers,
  Globe,
  ArrowRight,
  Download,
  CheckCircle,
  Users
} from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

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

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => navigate('home')} />;
  }
  if (currentPage === 'terms') {
    return <TermsOfService onBack={() => navigate('home')} />;
  }

  return (
    <div className="app-container">
      <div className="gradient-bg"></div>
      
      <nav className="nav">
        <div className="logo cursor-pointer" onClick={() => navigate('home')}>IOTA WALLET</div>
        <div className="nav-links">
          <a href="#features" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Features</a>
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
              The Professional <span className="text-gradient">IOTA Wallet</span>
            </h1>
            <p className="hero-subtitle">
              A Chrome extension wallet supporting both IOTA L1 (Move) and IOTA EVM. Self-custodial, dApp-ready, and built for power users.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn-primary">
                Install Extension <Download size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
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
              alt="IOTA Wallet Concept"
              className="hero-image"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="section">
          <h2 className="section-title">Built for Performance</h2>
          <div className="features-grid">
            <FeatureCard
              icon={Shield}
              title="Bank-Grade Encryption"
              description="Argon2id key derivation + AES-256-GCM encryption. Your private keys never leave your device — not even to us."
              delay={0.1}
            />
            <FeatureCard
              icon={Zap}
              title="Dual-Chain Native"
              description="Seamlessly manage IOTA L1 (Move / Ed25519) and IOTA EVM (chainId 8822) accounts from a single wallet. Switch networks in one click."
              delay={0.2}
            />
            <FeatureCard
              icon={Layers}
              title="L1 ↔ EVM Bridge"
              description="Built-in cross-chain bridge. Deposit IOTA from L1 to EVM or withdraw back to L1 without leaving the wallet."
              delay={0.3}
            />
          </div>
        </section>

        {/* More Features */}
        <section className="section">
          <div className="cta-section">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="section-title"
              style={{ marginBottom: '1.5rem' }}
            >
              Everything You Need
            </motion.h2>
            <p className="hero-subtitle" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
              Full-featured and production-ready. From staking to dApp integration, IOTA Wallet Pro covers it all.
            </p>

            <div className="features-grid" style={{ textAlign: 'left' }}>
              <div className="glass-card">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="text-blue-400" />
                  <h4 className="font-bold">Native Staking</h4>
                </div>
                <p className="text-sm text-gray-400">Delegate to validators, track APY and rewards, and unstake — all from the wallet with live epoch data.</p>
              </div>
              <div className="glass-card">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-purple-400" />
                  <h4 className="font-bold">Full dApp Support</h4>
                </div>
                <p className="text-sm text-gray-400">Implements IOTA Wallet Standard and EIP-1193 (MetaMask-compatible). Connect to any IOTA dApp and sign transactions with full approval UI.</p>
              </div>
              <div className="glass-card">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-green-400" />
                  <h4 className="font-bold">Multi-Profile Accounts</h4>
                </div>
                <p className="text-sm text-gray-400">Manage multiple independent mnemonics and derived accounts. Import private keys, rename, lock, and export — all password-protected.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="logo cursor-pointer" style={{ marginBottom: '1rem' }} onClick={() => setCurrentPage('home')}>IOTA WALLET</div>
          <p>The professional wallet for the IOTA ecosystem.</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex gap-4">
            <a href="javascript:void(0)"
              onClick={() => navigate('privacy')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              Privacy Policy
            </a>
            <a href="javascript:void(0)"
              onClick={() => navigate('terms')}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              Terms of Service
            </a>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            &copy; 2026 IOTA Wallet Extension. Built with passion for the decentralized web.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
