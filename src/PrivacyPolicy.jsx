import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = ({ onBack }) => {
  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <div className="gradient-bg"></div>

      <nav className="nav" style={{ marginBottom: '3rem' }}>
        <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
          <ArrowLeft size={20} /> Back to Home
        </div>
      </nav>

      <main style={{ maxWidth: '860px', margin: '0 auto', color: '#e5e7eb', lineHeight: '1.7' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Privacy Policy</h1>
          </div>

          <div className="glass-card" style={{ padding: '3rem', textAlign: 'left' }}>
            <p className="mb-6">
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <p className="mb-8 text-gray-300">
              This Privacy Policy explains how IOTA Wallet Pro processes information when you use the website and the browser extension.
              The extension is designed to operate as a self-custodial wallet, which means your keys and recovery phrases remain under your control.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">1. Scope and Controller</h2>
            <p className="mb-8 text-gray-300">
              This policy applies to the IOTA Wallet Pro website and browser extension. For the extension, the project operator acts as the controller for any information that is processed through the website or extension-related support flows.
              The extension itself is built to minimize data handling and does not rely on a backend account system.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">2. General Information on Data Processing</h2>
            <p className="mb-6 text-gray-300">
              As a general principle, we process personal data only to the extent necessary to provide the website, the extension, and related support information.
              Where possible, the extension processes information locally on your device.
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li><strong>No wallet account creation:</strong> the extension does not require a user account or registration.</li>
              <li><strong>No sale of personal data:</strong> we do not sell personal data.</li>
              <li><strong>No analytics tracking in the extension:</strong> the extension is designed to avoid analytics collection.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">3. Legal Basis for Processing</h2>
            <p className="mb-6 text-gray-300">
              Where personal data is processed, it is based on one or more of the following grounds:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li><strong>Consent:</strong> when you voluntarily submit information through contact or support channels.</li>
              <li><strong>Contract / pre-contractual steps:</strong> when processing is required to provide the website or support a request you initiated.</li>
              <li><strong>Legitimate interests:</strong> for security, abuse prevention, and maintaining the website and extension.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">4. Data We Process</h2>
            <p className="mb-6 text-gray-300">
              Depending on how you interact with the website or extension, we may process the following limited information:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li><strong>Local wallet data:</strong> encrypted wallet state, preferences, and network settings stored locally on your device.</li>
              <li><strong>Blockchain data:</strong> public network information such as balances, transactions, and validator data retrieved from IOTA RPC endpoints.</li>
              <li><strong>Support information:</strong> information you choose to send when contacting the project maintainer.</li>
              <li><strong>Technical website data:</strong> limited operational data needed to deliver the website, such as standard server logs when the website is hosted.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">5. Storage and Retention</h2>
            <p className="mb-8 text-gray-300">
              Wallet secrets are encrypted and stored locally on your device. They are retained until you remove them or reset the extension.
              If support or website data is collected, it is retained only for as long as needed to respond to your request, satisfy legal obligations, or maintain the service.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">6. Network Communication</h2>
            <p className="mb-8 text-gray-300">
              To function as a blockchain wallet, the extension may communicate with public IOTA network endpoints to read public chain state and submit signed transactions.
              These requests do not expose your private keys. The extension only sends the data required to complete the network action you initiate.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">7. Permissions Usage</h2>
            <p className="mb-6 text-gray-300">
              The extension uses only the permissions needed for wallet functionality:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li><code>storage</code> and <code>unlimitedStorage</code>: store encrypted wallet state, settings, and cached blockchain data locally.</li>
              <li><code>activeTab</code>: inject the wallet provider into the site you explicitly choose to interact with.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">8. Your Rights</h2>
            <p className="mb-6 text-gray-300">
              Depending on your location, you may have rights to request access, correction, deletion, restriction, portability, or objection with respect to personal data we process.
              You may also withdraw consent where processing is based on consent.
            </p>
            <p className="mb-8 text-gray-300">
              Because the extension is self-custodial, you can usually delete local wallet data by removing the extension or clearing its local storage.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">9. Security</h2>
            <p className="mb-8 text-gray-300">
              We use local encryption, isolated storage, and restricted permissions to reduce the risk of unauthorized access.
              However, no method of storage or transmission is completely secure, and you are responsible for safeguarding your recovery phrase and device access.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">10. Changes to This Policy</h2>
            <p className="mb-8 text-gray-300">
              We may update this policy from time to time to reflect changes in the website, the extension, or applicable legal requirements.
              The latest version will always be published on this page.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">11. Contact</h2>
            <p className="mb-8 text-gray-300">
              For privacy questions or requests related to the website or extension, please contact the project maintainer through the project support channel or repository.
            </p>

            <hr className="border-gray-700 my-8" />

            <p className="text-sm text-gray-400">
              By using the IOTA Wallet Pro website or extension, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

