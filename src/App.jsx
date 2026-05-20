import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Layers, 
  Globe, 
  ArrowRight, 
  Download, 
  CheckCircle,
  CreditCard,
  Target,
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
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'privacy' || hash === 'terms') return hash;
    return 'home';
  };
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page) => {
    window.location.hash = page === 'home' ? '' : page;
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
              Experience the <span className="text-gradient">Future</span> of IOTA
            </h1>
            <p className="hero-subtitle">
              Sleek, secure, and blazing fast. The next-generation browser extension wallet for the IOTA (Move) ecosystem.
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
              title="Military Grade Security"
              description="Self-custodial design with localized encryption. Your keys, your assets, your rules."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap}
              title="Instant Batch Sending"
              description="Revolutionary bulk transfer engine. Send to hundreds of addresses in a single atomic block."
              delay={0.2}
            />
            <FeatureCard 
              icon={Layers}
              title="Native Multi-Staking"
              description="Participate in governance and earn rewards directly. No middlemen, no extra steps."
              delay={0.3}
            />
          </div>
        </section>

        {/* Business Section (Monetization Highlights) */}
        <section className="section">
          <div className="cta-section">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="section-title"
              style={{ marginBottom: '1.5rem' }}
            >
              Enterprise & Scaling
            </motion.h2>
            <p className="hero-subtitle" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
              Designed with a sustainable monetization model to ensure long-term ecosystem support.
            </p>
            
            <div className="features-grid" style={{ textAlign: 'left' }}>
              <div className="glass-card">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="text-blue-400" />
                    <h4 className="font-bold">Fiat-To-Crypto</h4>
                  </div>
                  <p className="text-sm text-gray-400">Integrated gateways for seamless IOTA onboarding with global compliance.</p>
              </div>
              <div className="glass-card">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="text-purple-440" />
                    <h4 className="font-bold">Sponsored DApps</h4>
                  </div>
                  <p className="text-sm text-gray-400">Premium placement for high-quality ecosystem projects and tools.</p>
              </div>
              <div className="glass-card">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-green-400" />
                    <h4 className="font-bold">Validator Engine</h4>
                  </div>
                  <p className="text-sm text-gray-400">Curated node recommendations maximizing yield and network stability.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="logo cursor-pointer" style={{ marginBottom: '1rem' }} onClick={() => setCurrentPage('home')}>IOTA WALLET</div>
          <p>The standard for decentralized finance on IOTA.</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex gap-4">
            <a href="#privacy"
              onClick={(e) => { e.preventDefault(); navigate('privacy'); }}
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              Privacy Policy
            </a>
            <a href="#terms"
              onClick={(e) => { e.preventDefault(); navigate('terms'); }}
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
