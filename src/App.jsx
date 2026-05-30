import React, { useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Layers,
  Globe,
  Download,
  Users,
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

function BatchSendDemo() {
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
        setError(`Line ${i + 1}: expected "address,amount"`);
        return;
      }
      const address = parts[0].trim();
      const amount = parts[1].trim();
      if (!/^(0x[0-9a-fA-F]{64}|0x[0-9a-fA-F]{40})$/.test(address)) {
        setError(`Line ${i + 1}: invalid address format`);
        return;
      }
      if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        setError(`Line ${i + 1}: invalid amount`);
        return;
      }
      parsed.push({ address, amount });
    }
    setRows(parsed);
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setError('Please upload a .csv file');
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
            <div className="feature-icon" style={{ width: '3.5rem', height: '3.5rem', marginBottom: '1.5rem' }}>
              <Zap size={28} />
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Instant Batch Sending</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              Send IOTA to hundreds of addresses in a single atomic transaction block.
              Upload a CSV file — <strong style={{ color: '#f8fafc' }}>address, amount</strong> per line.
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
              <img src="/assets/batch.png" alt="Batch Send UI" className="feature-screenshot" />
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
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Drop CSV file here or click to upload</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Format: address,amount — one per line</p>
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
                Download Example CSV
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
                  <span>{rows.length} recipients parsed</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Total: <strong style={{ color: '#f8fafc' }}>{total.toFixed(4)} IOTA</strong>
                  </span>
                </div>
                <div className="csv-table-wrap">
                  <table className="csv-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Amount (IOTA)</th>
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
                  Install the extension to execute this batch in one transaction
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="gradient-bg"></div>

      <nav className="nav">
        <div className="logo cursor-pointer" onClick={() => navigate('/')}>IOTA WALLET PRO</div>
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

        <BatchSendDemo />

        {/* Feature Showcase */}
        <section id="showcase" className="section">
          <h2 className="section-title">Everything You Need</h2>

          {/* Bridge */}
          <div className="showcase-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">Cross-Chain</div>
              <h3 className="showcase-title">L1 ↔ EVM Bridge</h3>
              <p className="showcase-desc">Transfer IOTA between the native L1 chain and IOTA EVM without leaving the wallet. Bridge direction is automatically determined by your active account type — no manual switching needed.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/bridge.png" alt="Bridge UI" className="feature-screenshot" />
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
              <img src="/assets/addressbook1.png" alt="Address Book" className="feature-screenshot" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-text"
            >
              <div className="showcase-tag">Address Book</div>
              <h3 className="showcase-title">Contacts & Quick Fill</h3>
              <p className="showcase-desc">Save frequently used addresses to your contact book. When sending or bridging, the address picker automatically filters contacts by network type — showing only L1 or EVM addresses as appropriate.</p>
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
              <div className="showcase-tag">Multi-Profile</div>
              <h3 className="showcase-title">Multiple Accounts</h3>
              <p className="showcase-desc">Manage multiple independent mnemonic profiles, each with unlimited derived accounts. Import external private keys, lock individual accounts, and export keys — all protected by your password.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="showcase-img"
            >
              <img src="/assets/addressbook2.png" alt="Account Management" className="feature-screenshot" />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="logo cursor-pointer" style={{ marginBottom: '1rem' }} onClick={() => navigate('/')}>IOTA WALLET PRO</div>
          <p>The professional wallet for the IOTA ecosystem.</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex gap-4">
            <a href="/privacy"
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              Privacy Policy
            </a>
            <a href="/terms"
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              Terms of Service
            </a>
            <a href="/support"
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontSize: '0.9rem', fontStyle: 'italic', textDecoration: 'underline' }}
            >
              Support
            </a>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            &copy; 2026 IOTA Wallet Pro. Built with passion for the decentralized web.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} />} />
      <Route path="/terms" element={<TermsOfService onBack={() => navigate('/')} />} />
      <Route path="/support" element={<Support onBack={() => navigate('/')} />} />
      <Route path="/feedback" element={<Feedback onBack={() => navigate('/')} />} />
    </Routes>
  );
}

export default App;
