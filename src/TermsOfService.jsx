import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = ({ onBack }) => {
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
              <FileText size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Terms of Service</h1>
          </div>

          <div className="glass-card" style={{ padding: '3rem', textAlign: 'left' }}>
            <p className="mb-6">
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <p className="mb-8 text-gray-300">
              These Terms of Service govern your access to and use of the IOTA Wallet Pro website and browser extension.
              By using the website or extension, you agree to these terms. If you do not agree, do not use the website or extension.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">1. The Service</h2>
            <p className="mb-8 text-gray-300">
              IOTA Wallet Pro is a self-custodial browser extension wallet for interacting with IOTA networks, decentralized applications, and related blockchain functionality.
              The extension provides local wallet management tools and does not create a hosted account, custody your assets, or act as a financial intermediary.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">2. Self-Custody and Your Responsibilities</h2>
            <p className="mb-6 text-gray-300">
              You are solely responsible for safeguarding your recovery phrase, private keys, passwords, devices, browser profile, and any transactions you approve.
              The project operator cannot recover lost recovery phrases, reverse blockchain transactions, freeze assets, or restore access to wallets that you control locally.
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li>Keep your recovery phrase and private keys secret and offline whenever possible.</li>
              <li>Review transaction details, connected sites, token approvals, addresses, network names, and fees before confirming any action.</li>
              <li>Use trusted devices and keep your browser, operating system, and extension updated.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">3. Eligibility and Compliance</h2>
            <p className="mb-8 text-gray-300">
              You may use the website and extension only if you are legally permitted to do so in your jurisdiction.
              You are responsible for complying with all applicable laws, regulations, tax obligations, sanctions restrictions, and reporting requirements that apply to your use of digital assets and blockchain networks.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">4. No Financial, Investment, or Legal Advice</h2>
            <p className="mb-8 text-gray-300">
              The website and extension are provided for technical wallet access and blockchain interaction only.
              Nothing in the website, extension, interface, documentation, token information, validator information, or related materials is financial, investment, legal, tax, or professional advice.
              You should make your own decisions and consult qualified professionals where appropriate.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">5. Blockchain Network Risks</h2>
            <p className="mb-6 text-gray-300">
              Blockchain networks and digital assets involve significant risks. By using the extension, you acknowledge that these risks may include:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li>irreversible transactions, failed transactions, incorrect addresses, network congestion, and changing fees;</li>
              <li>software bugs, smart contract vulnerabilities, malicious websites, phishing attempts, and compromised devices;</li>
              <li>asset volatility, liquidity risks, validator or staking risks, bridge risks, and third-party service failures;</li>
              <li>changes to IOTA networks, protocol upgrades, forks, outages, or RPC endpoint availability.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">6. Third-Party Services and DApps</h2>
            <p className="mb-8 text-gray-300">
              The extension may allow you to connect to third-party decentralized applications, websites, RPC endpoints, validators, token services, or other external services.
              These services are not controlled by IOTA Wallet Pro. You are responsible for reviewing and trusting any third party before connecting, signing messages, approving permissions, or submitting transactions.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">7. Acceptable Use</h2>
            <p className="mb-6 text-gray-300">
              You agree not to misuse the website or extension. Prohibited conduct includes:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              <li>using the service for unlawful activity, fraud, sanctions evasion, money laundering, or abusive conduct;</li>
              <li>attempting to disrupt, overload, reverse engineer, compromise, or interfere with the website, extension, or supporting infrastructure;</li>
              <li>misrepresenting your identity, rights, affiliation, or authority when using the service;</li>
              <li>using the service in a way that infringes the rights of others or violates applicable law.</li>
            </ul>

            <h2 className="text-xl font-bold mb-4 text-white">8. Fees, Gas, and Transactions</h2>
            <p className="mb-8 text-gray-300">
              Blockchain transactions may require network fees, gas, storage deposits, validator fees, or other costs determined by the relevant network or third-party service.
              IOTA Wallet Pro does not control these fees and is not responsible for transaction costs, failed transactions, delayed confirmations, or losses caused by incorrect transaction parameters.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">9. Intellectual Property</h2>
            <p className="mb-8 text-gray-300">
              The website, extension interface, branding, design elements, and related materials are protected by applicable intellectual property laws unless otherwise stated.
              You may not copy, modify, distribute, or use project branding in a misleading way without permission. Open-source components, if any, remain governed by their respective licenses.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">10. Availability and Changes</h2>
            <p className="mb-8 text-gray-300">
              The website and extension are provided on an evolving basis. Features may be changed, suspended, removed, or updated at any time.
              Access may depend on browser compatibility, network availability, third-party services, and local device conditions.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">11. Disclaimer of Warranties</h2>
            <p className="mb-8 text-gray-300">
              The website and extension are provided on an “as is” and “as available” basis, without warranties of any kind, whether express, implied, statutory, or otherwise.
              No guarantee is made that the service will be secure, uninterrupted, error-free, accurate, compatible with every system, or free from harmful components.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">12. Limitation of Liability</h2>
            <p className="mb-8 text-gray-300">
              To the maximum extent permitted by law, the project operator and contributors will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages,
              or for loss of assets, private keys, recovery phrases, profits, data, goodwill, business opportunities, or access resulting from your use of, or inability to use, the website or extension.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">13. Indemnification</h2>
            <p className="mb-8 text-gray-300">
              You agree to defend, indemnify, and hold harmless the project operator and contributors from claims, damages, liabilities, losses, costs, and expenses arising from your use of the website or extension,
              your violation of these terms, your violation of applicable law, or your interaction with third-party services.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">14. Termination</h2>
            <p className="mb-8 text-gray-300">
              You may stop using the website or extension at any time. We may suspend or discontinue access to website features or support channels where necessary to protect users, comply with law, prevent abuse, or maintain the service.
              Local wallet data remains under your control and may be removed by uninstalling the extension or clearing its local storage.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">15. Changes to These Terms</h2>
            <p className="mb-8 text-gray-300">
              These terms may be updated from time to time to reflect changes in the website, extension, applicable law, or project operations.
              The latest version will be published on this page. Continued use after an update means you accept the updated terms.
            </p>

            <h2 className="text-xl font-bold mb-4 text-white">16. Contact</h2>
            <p className="mb-8 text-gray-300">
              For questions about these terms, please contact the project maintainer through the project support channel or repository.
            </p>

            <hr className="border-gray-700 my-8" />

            <p className="text-sm text-gray-400">
              By using the IOTA Wallet Pro website or extension, you acknowledge that you have read, understood, and agreed to these Terms of Service.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;
