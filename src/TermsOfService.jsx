import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

const CONTENT = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: 8/16/2026",
    intro: "Please read these Terms of Service carefully before using the Pro Wallet for IOTA website (https://walletpro.agentsblockchains.com) and the Pro Wallet for IOTA browser extension (collectively, the “Service”). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.",
    sections: [
      {
        heading: "1. Introduction & Acceptance",
        paras: [
          "The Service is operated by the Pro Wallet for IOTA Team (the “Operator”). These Terms are a legally binding agreement between you (“you” or “User”) and the Operator governing your access to and use of the website and the browser extension.",
          "By using the Service, you represent and warrant that: (a) you are at least 18 years of age (or the age of majority in your jurisdiction); (b) you have read, understood, and agree to these Terms and the Privacy Policy; and (c) if you act on behalf of an organization, you have the authority to bind that organization. Your continued use of the Service after any changes to these Terms constitutes acceptance of the updated Terms."
        ]
      },
      {
        heading: "2. Service Description",
        paras: [
          "Pro Wallet for IOTA is a self-custodial browser extension wallet for interacting with IOTA L1 (Move) and IOTA EVM networks, decentralized applications (dApps), and related blockchain functionality. The Service provides local wallet management tools, cross-chain bridge flows, batch sending, address book management, and optional cloud account features (registration, subscription management, and billing). The Service does not create a hosted account for your assets, custody your funds, or act as a financial intermediary.",
          "The Service, including any paid subscription features, is a digital, intangible product. Access to paid features is granted immediately upon successful payment. The Service does not use third-party artificial intelligence (AI) models to generate content. Blockchain transactions may require network fees, gas, storage deposits, or validator fees determined by the relevant network or third-party service; the Operator does not control these fees.",
          "The extension may allow you to connect to third-party decentralized applications, websites, RPC endpoints, validators, and external services that are not controlled by the Operator. You are responsible for reviewing and trusting any third party before connecting, signing messages, approving permissions, or submitting transactions."
        ]
      },
      {
        heading: "3. Account Registration, Eligibility & Your Responsibilities",
        paras: [
          "Basic wallet functionality does not require registration. Optional paid features require a cloud account. If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. For security inquiries, contact support@agentsblockchains.com. Business accounts must be created by someone authorized to bind the entity.",
          "Because the Service is self-custodial, you are solely responsible for safeguarding your recovery phrase, private keys, passwords, devices, and browser profile, and for any transactions you approve. The Operator cannot recover lost recovery phrases, reverse blockchain transactions, freeze assets, or restore access to wallets you control locally."
        ],
        list: [
          "Keep your recovery phrase and private keys secret and offline whenever possible.",
          "Review transaction details, connected sites, token approvals, addresses, network names, and fees before confirming any action.",
          "Use trusted devices and keep your browser, operating system, and extension updated."
        ]
      },
      {
        heading: "4. Subscription Plans",
        paras: [
          "The Operator offers optional paid subscription tiers for cloud account features (such as side-panel mode and advanced account management). Plan details, pricing, and billing cycle are displayed at checkout and within the extension's account settings. Subscription fees are billed in advance on a recurring basis according to the plan you select."
        ]
      },
      {
        heading: "5. Recurring Billing Authorization",
        paras: [
          "By selecting a recurring subscription, you authorize the Operator, through its payment processor Waffo Pancake, to automatically charge your payment method at the start of each billing cycle until you cancel. You may change or cancel your subscription at any time through the in-product account settings or by contacting support@agentsblockchains.com. Cancellation takes effect at the end of the current billing period."
        ]
      },
      {
        heading: "6. Cancellation",
        paras: [
          "You can cancel your subscription at any time using the in-product cancellation flow in the extension's account settings, or by contacting support@agentsblockchains.com. Email-only cancellation requests may take up to 2 business days to process. Upon cancellation, you retain access to paid features until the end of the current billing period."
        ]
      },
      {
        heading: "7. Refunds & Money-Back Guarantee",
        paras: [
          "First-time subscribers may request a full refund within 7 days of the initial subscription purchase by contacting support@agentsblockchains.com. Refunds for duplicate charges or service outages will be issued where applicable. Except as required by law, recurring renewals are non-refundable once a billing period has begun. Your statutory consumer rights remain unaffected."
        ]
      },
      {
        heading: "8. Billing Disputes",
        paras: [
          "If you believe a charge is incorrect, please contact support@agentsblockchains.com before disputing the charge with your bank or card issuer. We commit to responding to billing inquiries within 2 business days and making a good-faith effort to resolve disputes within 5 business days."
        ]
      },
      {
        heading: "9. Intellectual Property & AI",
        paras: [
          "You own the data and signed transactions you generate using the Service. You grant the Operator a limited license to process your inputs solely as necessary to provide the Service. The Operator does not use your inputs or outputs to train any machine learning or AI model. The Service does not incorporate third-party AI models. The website, extension interface, branding, and design are protected by applicable intellectual property laws; you may not copy, modify, or distribute project branding in a misleading way without permission. Open-source components remain governed by their respective licenses."
        ]
      },
      {
        heading: "10. Acceptable Use",
        paras: [
          "You agree not to misuse the Service. Prohibited conduct includes:"
        ],
        list: [
          "Using the Service for any unlawful, defamatory, harassing, or fraudulent activity, including sanctions evasion or money laundering.",
          "Creating or distributing deepfakes that impersonate real individuals.",
          "Submitting content that sexualizes minors or otherwise exploits minors.",
          "Distributing malware, ransomware, phishing tools, or other cyberattack tools.",
          "Infringing the intellectual property or privacy rights of others.",
          "Circumventing, disabling, or interfering with the Service's security features, rate limits, or access controls.",
          "Reselling or sharing access to the Service without the Operator's approval.",
          "Violating card network rules or engaging in unauthorized payment activity.",
          "Using the Service's inputs or outputs to train competing AI or machine learning models.",
          "Systematically scraping, harvesting, or extracting data from the Service.",
          "Misrepresenting any machine-generated output as the work of a human professional.",
          "Attempting to disrupt, overload, reverse engineer, or compromise the website, extension, or supporting infrastructure."
        ]
      },
      {
        heading: "11. Data, Privacy & Security",
        paras: [
          "Your use of the Service is also governed by our Privacy Policy, available at https://walletpro.agentsblockchains.com/privacy, which is incorporated here by reference. Payment card data is processed exclusively by our payment processor, Waffo Pancake (PCI-DSS certified); the Operator does not store, process, or transmit full card numbers on its own servers.",
          "Self-custodial wallet secrets (recovery phrases, private keys) are encrypted locally on your device and never transmitted to the Operator. Optional cloud account data (email, hashed password, subscription tier, and payment order history) is retained for 90 days after subscription cancellation and then deleted, except where retention is required by law."
        ]
      },
      {
        heading: "12. Disclaimers & Limitation of Liability",
        paras: [
          "The Service is provided on an “as is” and “as available” basis, without warranties of any kind, whether express, implied, statutory, or otherwise. No guarantee is made that the Service will be secure, uninterrupted, error-free, accurate, or compatible with every system.",
          "Blockchain networks and digital assets involve significant risks, including: irreversible or failed transactions; incorrect addresses and network congestion; software bugs and smart contract vulnerabilities; malicious websites and phishing; asset volatility and liquidity risks; validator, staking, and bridge risks; and protocol upgrades, forks, outages, or RPC endpoint availability. You acknowledge these risks.",
          "To the maximum extent permitted by law, the Operator and its contributors will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of assets, private keys, recovery phrases, profits, data, goodwill, or business opportunities. The Operator's aggregate liability for any claim arising from the Service is limited to the total amount you paid to the Operator in the preceding 12 months."
        ]
      },
      {
        heading: "13. Term & Termination",
        paras: [
          "You may stop using the Service at any time. The Operator may suspend or terminate your access if you materially breach these Terms, engage in suspected fraud, or where required by law. If the Operator terminates your access for reasons other than your breach, you will receive a pro-rated refund of any prepaid subscription fees.",
          "To request account deletion, contact support@agentsblockchains.com. Local wallet data remains under your control and may be removed by uninstalling the extension or clearing its local storage."
        ]
      },
      {
        heading: "14. Governing Law & Dispute Resolution",
        paras: [
          "These Terms are governed by the laws of the United States, without regard to conflict-of-laws principles. Before initiating formal proceedings, you agree to first contact the Operator at support@agentsblockchains.com and attempt to resolve the dispute informally.",
          "Any dispute not resolved informally may, at the parties' election, be resolved through binding arbitration in the United States. You may also bring claims in your local small-claims court if permitted."
        ]
      },
      {
        heading: "15. General Provisions",
        paras: [
          "The Operator may update these Terms from time to time. Material changes will be notified by email (to the address associated with your account) at least 14 days before the effective date; the latest version will always be published on this page. Continued use after the effective date constitutes acceptance.",
          "If any provision of these Terms is found unenforceable, the remaining provisions remain in full force. These Terms constitute the entire agreement between you and the Operator regarding the Service."
        ]
      },
      {
        heading: "16. Contact Information",
        paras: [
          "For questions about these Terms, contact the Operator using the channels below. All email channels are monitored and route to support@agentsblockchains.com."
        ],
        list: [
          "General Support: support@agentsblockchains.com / https://walletpro.agentsblockchains.com/support",
          "Billing: support@agentsblockchains.com",
          "Refunds: support@agentsblockchains.com",
          "Cancel Subscription: in-product account settings, or support@agentsblockchains.com",
          "Legal & Privacy: support@agentsblockchains.com",
          "Security: support@agentsblockchains.com"
        ]
      }
    ],
    ack: "By using the Pro Wallet for IOTA website or extension, you acknowledge that you have read, understood, and agreed to these Terms of Service."
  },
  zh: {
    title: "服務條款",
    lastUpdated: "上次更新日期：2026年8月16日",
    intro: "在使用 Pro Wallet for IOTA 網站（https://walletpro.agentsblockchains.com）及 Pro Wallet for IOTA 瀏覽器擴充功能（合稱「服務」）之前，請仔細閱讀本服務條款。存取或使用本服務，即表示您同意受本條款及我們的《隱私政策》約束。若您不同意本條款，則不得存取或使用本服務。",
    sections: [
      {
        heading: "1. 簡介與接受",
        paras: [
          "本服務由 Pro Wallet for IOTA 團隊（以下簡稱「營運方」）營運。本條款是您（「您」或「用戶」）與營運方之間具有法律約束力的協議，規範您存取與使用本網站及瀏覽器擴充功能。",
          "使用本服務，即表示您聲明並保證：(a) 您已年滿 18 歲（或達到您所在司法管轄區的法定成年年齡）；(b) 您已閱讀、理解並同意本條款及《隱私政策》；(c) 若您代表某機構行事，您擁有約束該機構的授權。在本條款變更後您繼續使用本服務，即構成對更新後條款的接受。"
        ]
      },
      {
        heading: "2. 服務說明",
        paras: [
          "Pro Wallet for IOTA 是一款用於與 IOTA L1（Move）及 IOTA EVM 網路、去中心化應用程式（dApp）及相關區塊鏈功能互動的自託管瀏覽器擴充功能錢包。本服務提供本機錢包管理工具、跨鏈橋接流程、批量發送、地址簿管理以及可選的雲端帳戶功能（註冊、訂閱管理與帳單）。本服務不為您的資產建立託管帳戶、不代管您的資金，亦不作為金融中介機構。",
          "本服務（包括任何付費訂閱功能）為數位、無形的產品。付費功能的存取權將於付款成功後立即授予。本服務不使用第三方人工智慧（AI）模型生成內容。區塊鏈交易可能需要由相關網路或第三方服務決定的網路費、燃料費（Gas）、儲存押金或驗證者費用；營運方不控制這些費用。",
          "本擴充功能可能允許您連接到不受營運方控制的第三方去中心化應用程式、網站、RPC 節點、驗證者及外部服務。在連接、簽署訊息、核准權限或提交交易之前，您有責任評估並信任任何第三方。"
        ]
      },
      {
        heading: "3. 帳戶註冊、資格與您的責任",
        paras: [
          "基本錢包功能無需註冊。可選的付費功能需要雲端帳戶。若您建立帳戶，您有責任保管帳戶憑證的機密性，並對您帳戶下的所有活動負責。如有安全方面的詢問，請聯絡 support@agentsblockchains.com。企業帳戶必須由獲授權約束該實體的人員建立。",
          "由於本服務為自託管，您須全權負責保管您的助記詞、私鑰、密碼、裝置及瀏覽器設定檔，並對您核准的任何交易負責。營運方無法恢復遺失的助記詞、無法撤銷區塊鏈交易、無法凍結資產，亦無法恢復對您在本機控制之錢包的存取權。"
        ],
        list: [
          "務必將您的助記詞和私鑰保密，並儘可能保持離線儲存。",
          "在確認任何操作之前，仔細檢查交易詳情、連接的網站、代幣授權、地址、網路名稱和燃料費用。",
          "使用受信任的裝置，並保持瀏覽器、操作系統和擴充功能的更新。"
        ]
      },
      {
        heading: "4. 訂閱方案",
        paras: [
          "營運方為雲端帳戶功能（例如側邊面板模式與進階帳戶管理）提供可選的付費訂閱層級。方案詳情、價格與計費週期將顯示於結帳頁面及擴充功能的帳戶設定中。訂閱費用依您選擇的方案，以預付方式按週期定期計費。"
        ]
      },
      {
        heading: "5. 定期扣款授權",
        paras: [
          "選擇定期訂閱，即表示您授權營運方透過其支付處理商 Waffo Pancake，在每個計費週期開始時自動向您的付款方式扣款，直至您取消為止。您可隨時透過應用程式內的帳戶設定或聯絡 support@agentsblockchains.com 變更或取消訂閱。取消將於當前計費週期結束時生效。"
        ]
      },
      {
        heading: "6. 取消",
        paras: [
          "您可隨時使用擴充功能帳戶設定中的應用程式內取消流程取消訂閱，或聯絡 support@agentsblockchains.com。僅以電子郵件提出的取消請求可能需要最多 2 個工作天處理。取消後，您可繼續使用付費功能至當前計費週期結束。"
        ]
      },
      {
        heading: "7. 退款與退費保證",
        paras: [
          "首次訂閱者可於初始訂閱購買後 7 天內聯絡 support@agentsblockchains.com 申請全額退款。重複扣款或服務中斷的情況將視情況辦理退款。除法律另有規定外，一旦計費週期已開始，定期續訂即不予退款。您的法定消費者權益不受影響。"
        ]
      },
      {
        heading: "8. 帳單爭議",
        paras: [
          "若您認為某筆扣款有誤，請先聯絡 support@agentsblockchains.com，再向您的銀行或發卡機構提出爭議。我們承諾於 2 個工作天內回覆帳單詢問，並盡最大努力於 5 個工作天內解決爭議。"
        ]
      },
      {
        heading: "9. 智慧財產權與 AI",
        paras: [
          "您擁有使用本服務所產生的數據及已簽署交易。您授予營運方有限授權，僅為提供本服務所需而處理您的輸入內容。營運方不會使用您的輸入或輸出內容訓練任何機器學習或 AI 模型。本服務不整合第三方 AI 模型。本網站、擴充功能介面、品牌及設計受適用智慧財產權法保護；未經許可，您不得以誤導方式複製、修改或分發專案品牌。開源組件仍受其各自許可證約束。"
        ]
      },
      {
        heading: "10. 合理使用",
        paras: [
          "您同意不濫用本服務。禁止的行為包括："
        ],
        list: [
          "將本服務用於任何非法、誹謗、騷擾或欺詐活動，包括逃避制裁或洗錢。",
          "建立或分發冒充真實人物的深度偽造（Deepfake）內容。",
          "提交性化未成年人或以其他方式剝削未成年人的內容。",
          "散佈惡意軟體、勒索軟體、釣魚工具或其他網路攻擊工具。",
          "侵犯他人的智慧財產權或隱私權。",
          "規避、停用或干擾本服務的安全功能、速率限制或存取控制。",
          "未經營運方同意而轉售或共享本服務的存取權。",
          "違反卡片網路規則或從事未經授權的支付活動。",
          "使用本服務的輸入或輸出內容訓練競爭的 AI 或機器學習模型。",
          "系統性地抓取、蒐集或擷取本服務的數據。",
          "將任何機器生成的輸出內容謊稱為人類專業人士的工作成果。",
          "試圖干擾、超載、逆向工程或損害本網站、擴充功能或支援基礎設施。"
        ]
      },
      {
        heading: "11. 數據、隱私與安全",
        paras: [
          "您對本服務的使用亦受我們《隱私政策》規範，該政策位於 https://walletpro.agentsblockchains.com/privacy，並以此引用納入本條款。支付卡數據由我們的支付處理商 Waffo Pancake（通過 PCI-DSS 認證）專門處理；營運方不會在其自有伺服器上儲存、處理或傳輸完整的卡號。",
          "自託管錢包機密（助記詞、私鑰）在您的裝置上加密且絕不會傳輸給營運方。可選的雲端帳戶數據（電子郵件、雜湊密碼、訂閱層級及付款訂單歷史）於訂閱取消後保留 90 天，隨後刪除，但法律要求保留者除外。"
        ]
      },
      {
        heading: "12. 免責聲明與責任限制",
        paras: [
          "本服務以「現狀」及「可使用」基礎提供，不提供任何明示、暗示、法定或其他形式的保證。不保證本服務安全、不中斷、無錯誤、準確或與所有系統相容。",
          "區塊鏈網路與數位資產涉及重大風險，包括：不可逆或失敗的交易；錯誤地址與網路壅塞；軟體錯誤與智能合約漏洞；惡意網站與釣魚；資產波動性與流動性風險；驗證者、質押與跨鏈橋風險；以及協定升級、硬分叉、停機或 RPC 節點可用性。您確認上述風險。",
          "在法律允許的最大範圍內，營運方及其貢獻者不對任何間接、偶然、後續性、特別、示範性或懲罰性損害負責，亦不對因您使用或無法使用本服務而導致的資產、私鑰、助記詞、利潤、數據、信譽或商業機會的損失負責。營運方對因本服務引起的任何索賠的累計責任，以您在前 12 個月內向營運方支付的總金額為限。"
        ]
      },
      {
        heading: "13. 期限與終止",
        paras: [
          "您可隨時停止使用本服務。若您重大違反本條款、涉嫌欺詐或法律要求，營運方可暫停或終止您的存取權。若營運方因非您違約的原因終止您的存取權，您將獲得任何預付訂閱費用的按比例退款。",
          "如需申請帳戶刪除，請聯絡 support@agentsblockchains.com。本機錢包數據仍受您控制，可透過卸載擴充功能或清除其本機儲存來移除。"
        ]
      },
      {
        heading: "14. 準據法與爭議解決",
        paras: [
          "本條款受美國法律管轄，不考慮法律衝突原則。在提起正式程序之前，您同意先聯絡營運方 support@agentsblockchains.com 並嘗試以非正式方式解決爭議。",
          "任何未能以非正式方式解決的爭議，經雙方同意後，可透過在美國進行具約束力的仲裁解決。如獲允許，您亦可向當地小額索償法院提起申索。"
        ]
      },
      {
        heading: "15. 一般條款",
        paras: [
          "營運方可能會不時更新本條款。重大變更將於生效日期前至少 14 天以電子郵件（發送至您帳戶關聯的地址）通知；最新版本將始終公布於本頁面。於生效日期後繼續使用即構成接受。",
          "若本條款的任何條文被認定為不可執行，其餘條文仍具完整效力。本條款構成您與營運方之間關於本服務的完整協議。"
        ]
      },
      {
        heading: "16. 聯絡資訊",
        paras: [
          "有關本條款的問題，請使用以下管道聯絡營運方。所有電子郵件管道均受監控並導向 support@agentsblockchains.com。"
        ],
        list: [
          "一般支援：support@agentsblockchains.com / https://walletpro.agentsblockchains.com/support",
          "帳單：support@agentsblockchains.com",
          "退款：support@agentsblockchains.com",
          "取消訂閱：應用程式內帳戶設定，或 support@agentsblockchains.com",
          "法務與隱私：support@agentsblockchains.com",
          "安全：support@agentsblockchains.com"
        ]
      }
    ],
    ack: "使用 Pro Wallet for IOTA 網站或擴充功能，即表示您確認已閱讀、理解並同意本服務條款的全部內容。"
  },
  ko: {
    title: "이용 약관",
    lastUpdated: "최종 수정일: 2026년 8월 16일",
    intro: "Pro Wallet for IOTA 웹사이트(https://walletpro.agentsblockchains.com) 및 Pro Wallet for IOTA 브라우저 확장 프로그램(통칭하여 “서비스”)을 사용하기 전에 본 이용 약관을 주의 깊게 읽어 주십시오. 서비스에 접근하거나 이용함으로써 귀하는 본 약관 및 개인정보 처리방침에 구속되는 것에 동의합니다. 본 약관에 동의하지 않는 경우 서비스에 접근하거나 이용할 수 없습니다.",
    sections: [
      {
        heading: "1. 소개 및 동의",
        paras: [
          "본 서비스는 Pro Wallet for IOTA 팀(이하 “운영자”)이 운영합니다. 본 약관은 귀하(“귀하” 또는 “사용자”)와 운영자 간에 웹사이트 및 브라우저 확장 프로그램에 대한 귀하의 접근 및 이용을 규율하는 법적 구속력 있는 합의입니다.",
          "서비스를 이용함으로써 귀하는 다음을 진술하고 보증합니다: (a) 18세 이상(또는 귀하의 관할 지역의 성년 연령)입니다. (b) 본 약관 및 개인정보 처리방침을 읽고 이해했으며 이에 동의합니다. (c) 조직을 대신하여 행동하는 경우 해당 조직을 구속할 권한이 있습니다. 본 약관 변경 후에도 서비스를 계속 이용하는 것은 변경된 약관에 동의하는 것을 의미합니다."
        ]
      },
      {
        heading: "2. 서비스 설명",
        paras: [
          "Pro Wallet for IOTA는 IOTA L1(Move) 및 IOTA EVM 네트워크, 탈중앙화 애플리케이션(dApp) 및 관련 블록체인 기능과 상호 작용하기 위한 셀프 커스터디 브라우저 확장 프로그램 지갑입니다. 본 서비스는 로컬 지갑 관리 도구, 크로스체인 브리지 흐름, 배치 송금, 주소록 관리 및 선택적 클라우드 계정 기능(등록, 구독 관리, 결제)을 제공합니다. 본 서비스는 귀하의 자산을 위한 수탁 계정을 생성하거나 자산을 보관하거나 금융 중개업자 역할을 하지 않습니다.",
          "결제 구독 기능을 포함한 본 서비스는 디지털, 무형의 제품입니다. 유료 기능에 대한 접근은 결제 완료 즉시 부여됩니다. 본 서비스는 콘텐츠 생성에 타사 인공지능(AI) 모델을 사용하지 않습니다. 블록체인 트랜잭션에는 관련 네트워크 또는 타사 서비스가 결정하는 네트워크 수수료, 가스비, 스토리지 보증금 또는 검증자 수수료가 필요할 수 있으며, 운영자는 이러한 수수료를 통제하지 않습니다.",
          "확장 프로그램은 운영자가 통제하지 않는 타사 탈중앙화 애플리케이션, 웹사이트, RPC 노드, 검증자 및 외부 서비스에 연결할 수 있도록 지원할 수 있습니다. 연결, 메시지 서명, 권한 승인 또는 트랜잭션 제출 전에 해당 타사를 검토하고 신뢰할 책임은 귀하에게 있습니다."
        ]
      },
      {
        heading: "3. 계정 등록, 자격 및 귀하의 책임",
        paras: [
          "기본 지갑 기능에는 등록이 필요하지 않습니다. 선택적 유료 기능에는 클라우드 계정이 필요합니다. 계정을 생성하는 경우 계정 자격 증명의 기밀을 유지하고 계정 하의 모든 활동에 대해 책임을 집니다. 보안 문의는 support@agentsblockchains.com로 연락해 주십시오. 기업 계정은 해당 엔터티를 구속할 권한이 있는 사람이 생성해야 합니다.",
          "본 서비스는 셀프 커스터디 방식이므로 복구 문구, 개인키, 비밀번호, 기기 및 브라우저 프로필을 안전하게 보관하고 승인한 모든 트랜잭션에 대해 전적으로 책임을 집니다. 운영자는 분실된 복구 문구를 복구하거나 블록체인 트랜잭션을 취소하거나 자산을 동결하거나 귀하가 로컬로 제어하는 지갑에 대한 접근을 복원할 수 없습니다."
        ],
        list: [
          "복구 문구와 개인키를 기밀로 유지하고 가능한 한 오프라인으로 보관하십시오.",
          "어떤 작업을 승인하기 전에 트랜잭션 세부 정보, 연결된 사이트, 토큰 승인, 주소, 네트워크 이름 및 수수료를 검토하십시오.",
          "신뢰할 수 있는 기기를 사용하고 브라우저, 운영 체제 및 확장 프로그램을 최신 상태로 유지하십시오."
        ]
      },
      {
        heading: "4. 구독 플랜",
        paras: [
          "운영자는 클라우드 계정 기능(예: 사이드 패널 모드 및 고급 계정 관리)을 위한 선택적 유료 구독 등급을 제공합니다. 플랜 세부 정보, 가격 및 결제 주기는 체크아웃 시 및 확장 프로그램의 계정 설정에 표시됩니다. 구독료는 선택한 플랜에 따라 사전에 정기적으로 청구됩니다."
        ]
      },
      {
        heading: "5. 정기 결제 승인",
        paras: [
          "정기 구독을 선택함으로써 귀하는 운영자가 결제 처리사 Waffo Pancake를 통해 귀하가 취소할 때까지 각 결제 주기 시작 시 귀하의 결제 수단에 자동으로 청구할 수 있도록 승인합니다. 귀하는 앱 내 계정 설정을 통해 또는 support@agentsblockchains.com로 연락하여 언제든지 구독을 변경하거나 취소할 수 있습니다. 취소는 현재 결제 주기 종료 시 적용됩니다."
        ]
      },
      {
        heading: "6. 취소",
        paras: [
          "귀하는 확장 프로그램 계정 설정의 앱 내 취소 흐름을 사용하거나 support@agentsblockchains.com로 연락하여 언제든지 구독을 취소할 수 있습니다. 이메일로만 접수된 취소 요청은 처리에 최대 2영업일이 소요될 수 있습니다. 취소 후에는 현재 결제 주기가 끝날 때까지 유료 기능에 대한 접근이 유지됩니다."
        ]
      },
      {
        heading: "7. 환불 및 환불 보장",
        paras: [
          "최초 구독자는 최초 구독 구매 후 7일 이내에 support@agentsblockchains.com로 연락하여 전액 환불을 요청할 수 있습니다. 중복 청구 또는 서비스 중단에 대한 환불은 해당되는 경우 처리됩니다. 법률에서 요구하는 경우를 제외하고, 결제 주기가 시작된 후의 정기 갱신은 환불되지 않습니다. 귀하의 법정 소비자 권리는 영향을 받지 않습니다."
        ]
      },
      {
        heading: "8. 결제 분쟁",
        paras: [
          "청구가 잘못되었다고 판단되면 은행이나 카드 발급사에 이의를 제기하기 전에 support@agentsblockchains.com로 연락해 주십시오. 당사는 결제 문의에 2영업일 이내에 응답하고 5영업일 이내에 분쟁을 해결하기 위해 성실하게 노력할 것을 약속합니다."
        ]
      },
      {
        heading: "9. 지적재산권 및 AI",
        paras: [
          "귀하는 서비스를 사용하여 생성한 데이터 및 서명된 트랜잭션을 소유합니다. 귀하는 서비스 제공에 필요한 범위에서만 귀하의 입력을 처리할 수 있는 제한적 라이선스를 운영자에게 부여합니다. 운영자는 귀하의 입력 또는 출력을 사용하여 어떠한 기계 학습 또는 AI 모델도 훈련하지 않습니다. 본 서비스는 타사 AI 모델을 통합하지 않습니다. 웹사이트, 확장 프로그램 인터페이스, 브랜드 및 디자인은 적용 가능한 지적재산권법의 보호를 받습니다. 허가 없이 프로젝트 브랜드를 오도하는 방식으로 복사, 수정 또는 배포할 수 없습니다. 오픈소스 구성 요소는 해당 라이선스가 적용됩니다."
        ]
      },
      {
        heading: "10. 허용되는 이용",
        paras: [
          "귀하는 서비스를 오용하지 않을 것에 동의합니다. 금지된 행위는 다음과 같습니다."
        ],
        list: [
          "제재 회피 또는 자금 세탁을 포함한 불법, 명예훼손, 괴롭힘 또는 사기 활동에 서비스를 사용하는 행위.",
          "실존 인물을 사칭하는 딥페이크를 생성하거나 배포하는 행위.",
          "미성년자를 성적 대상화하거나 기타 미성년자를 착취하는 콘텐츠를 제출하는 행위.",
          "멀웨어, 랜섬웨어, 피싱 도구 또는 기타 사이버 공격 도구를 배포하는 행위.",
          "타인의 지적재산권 또는 개인정보 권리를 침해하는 행위.",
          "서비스의 보안 기능, 속도 제한 또는 접근 통제를 우회, 비활성화 또는 간섭하는 행위.",
          "운영자의 승인 없이 서비스에 대한 접근을 재판매하거나 공유하는 행위.",
          "카드 네트워크 규정을 위반하거나 미승인 결제 활동에 가담하는 행위.",
          "서비스의 입력 또는 출력을 사용하여 경쟁 AI 또는 기계 학습 모델을 훈련하는 행위.",
          "서비스의 데이터를 체계적으로 스크래핑, 수집 또는 추출하는 행위.",
          "기계 생성 출력을 인간 전문가의 작업으로 허위 표시하는 행위.",
          "웹사이트, 확장 프로그램 또는 지원 인프라를 방해, 과부하, 역설계 또는 침해하려는 행위."
        ]
      },
      {
        heading: "11. 데이터, 개인정보 및 보안",
        paras: [
          "서비스 이용은 https://walletpro.agentsblockchains.com/privacy에서 확인할 수 있는 개인정보 처리방침의 적용을 받으며, 이는 본 약관에 참조로 편입됩니다. 결제 카드 데이터는 결제 처리사인 Waffo Pancake(PCI-DSS 인증)가 전적으로 처리하며, 운영자는 자체 서버에 전체 카드 번호를 저장, 처리 또는 전송하지 않습니다.",
          "셀프 커스터디 지갑 기밀(복구 문구, 개인키)은 귀하의 기기에서 암호화되며 운영자에게 전송되지 않습니다. 선택적 클라우드 계정 데이터(이메일, 해시된 비밀번호, 구독 등급 및 결제 주문 내역)는 구독 취소 후 90일간 보관된 후 삭제되며, 법령으로 보존이 요구되는 경우는 예외로 합니다."
        ]
      },
      {
        heading: "12. 면책 및 책임 제한",
        paras: [
          "본 서비스는 어떠한 보증 없이 ‘있는 그대로’ 및 ‘이용 가능한 상태로’ 제공됩니다. 서비스가 안전하고, 중단 없으며, 오류가 없고, 정확하거나 모든 시스템과 호환된다는 보증을 하지 않습니다.",
          "블록체인 네트워크와 디지털 자산은 취소 불가능하거나 실패한 트랜잭션, 잘못된 주소 및 네트워크 정체, 소프트웨어 버그 및 스마트 계약 취약점, 악성 웹사이트 및 피싱, 자산 변동성 및 유동성 위험, 검증자·스테이킹·브리지 위험, 프로토콜 업그레이드·포크·가동 중단 또는 RPC 노드 가용성을 포함한 상당한 위험을 수반합니다. 귀하는 이러한 위험을 인정합니다.",
          "법이 허용하는 최대 범위 내에서 운영자 및 기여자는 간접, 부수적, 결과적, 특별, 징벌적 손해, 또는 자산, 개인키, 복구 문구, 이익, 데이터, 신용, 비즈니스 기회의 손실에 대해 책임을 지지 않습니다. 서비스에서 발생한 모든 청구에 대한 운영자의 총 책임은 귀하가 직전 12개월 동안 운영자에게 지불한 총액을 한도로 합니다."
        ]
      },
      {
        heading: "13. 이용 기간 및 종료",
        paras: [
          "귀하는 언제든지 서비스 이용을 중단할 수 있습니다. 귀하가 본 약관을 중대하게 위반하거나 사기가 의심되거나 법령에서 요구하는 경우 운영자는 귀하의 접근을 일시 중단하거나 종료할 수 있습니다. 운영자가 귀하의 위반이 아닌 이유로 접근을 종료하는 경우 사전 결제된 구독료에 대해 비례 환불을 받게 됩니다.",
          "계정 삭제를 요청하려면 support@agentsblockchains.com로 연락하십시오. 로컬 지갑 데이터는 귀하의 제어 하에 있으며 확장 프로그램을 제거하거나 브라우저 스토리지를 삭제하여 직접 파기할 수 있습니다."
        ]
      },
      {
        heading: "14. 준거법 및 분쟁 해결",
        paras: [
          "본 약관은 법률 충돌 원칙을 고려하지 않고 미국 법률에 의해 규율됩니다. 공식 절차를 시작하기 전에 귀하는 먼저 support@agentsblockchains.com로 운영자에게 연락하여 비공식적으로 분쟁을 해결하려고 시도하는 것에 동의합니다.",
          "비공식적으로 해결되지 않은 모든 분쟁은 당사자의 선택에 따라 미국에서 구속력 있는 중재를 통해 해결될 수 있습니다. 허용되는 경우 귀하는 관할 소액청구법원에 청구를 제기할 수도 있습니다."
        ]
      },
      {
        heading: "15. 일반 조항",
        paras: [
          "운영자는 본 약관을 수시로 업데이트할 수 있습니다. 중대한 변경은 시행일 최소 14일 전에 이메일(귀하의 계정에 연결된 주소로)로 통지되며, 최신 버전은 항상 본 페이지에 게시됩니다. 시행일 이후의 계속 사용은 동의를 의미합니다.",
          "본 약관의 어떤 조항이 집행 불가능한 것으로 판명되더라도 나머지 조항은 완전한 효력을 유지합니다. 본 약관은 서비스와 관련하여 귀하와 운영자 간의 전체 합의를 구성합니다."
        ]
      },
      {
        heading: "16. 연락처",
        paras: [
          "본 약관에 관한 문의는 아래 채널을 통해 운영자에게 연락해 주십시오. 모든 이메일 채널은 모니터링되며 support@agentsblockchains.com로 연결됩니다."
        ],
        list: [
          "일반 지원: support@agentsblockchains.com / https://walletpro.agentsblockchains.com/support",
          "결제: support@agentsblockchains.com",
          "환불: support@agentsblockchains.com",
          "구독 취소: 앱 내 계정 설정 또는 support@agentsblockchains.com",
          "법무 및 개인정보: support@agentsblockchains.com",
          "보안: support@agentsblockchains.com"
        ]
      }
    ],
    ack: "Pro Wallet for IOTA 웹사이트 또는 확장 프로그램을 사용하는 것은 본 이용 약관을 읽고 이해했으며 이에 동의함을 인정하는 것입니다."
  }
};

const TermsOfService = ({ onBack, theme, setTheme }) => {
  const { lang, t } = useTranslation();
  const content = CONTENT[lang] || CONTENT['en'];

  return (
    <div className="app-container subpage-container">
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('terms_meta_title')}</title>
        <meta name="description" content={t('terms_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://walletpro.agentsblockchains.com/terms' : `https://walletpro.agentsblockchains.com/${lang}/terms`} />
        <link rel="alternate" hreflang="x-default" href="https://walletpro.agentsblockchains.com/terms" />
        <link rel="alternate" hreflang="en" href="https://walletpro.agentsblockchains.com/terms" />
        <link rel="alternate" hreflang="zh-Hant" href="https://walletpro.agentsblockchains.com/zh/terms" />
        <link rel="alternate" hreflang="ko" href="https://walletpro.agentsblockchains.com/ko/terms" />
        <meta property="og:title" content={t('terms_meta_title')} />
        <meta property="og:description" content={t('terms_meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={lang === 'en' ? 'https://walletpro.agentsblockchains.com/terms' : `https://walletpro.agentsblockchains.com/${lang}/terms`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('terms_meta_title')} />
        <meta name="twitter:description" content={t('terms_meta_desc')} />
        <meta property="og:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://walletpro.agentsblockchains.com/" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://walletpro.agentsblockchains.com/terms" }
          ]
        })}</script>
      </Helmet>
      <div className="gradient-bg"></div>

      <nav className="nav">
        <div className="logo cursor-pointer flex items-center gap-2" onClick={onBack}>
          <ArrowLeft size={20} /> {t('nav_back')}
        </div>
        <div className="nav-links">
          <LanguageThemeSelector theme={theme} setTheme={setTheme} />
          <span className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', cursor: 'default', opacity: 0.9 }}>
            {t('nav_install')}
          </span>
        </div>
      </nav>

      <main style={{ maxWidth: '860px', margin: '0 auto', color: 'var(--text-main)', lineHeight: '1.7' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-icon">
              <FileText size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>{content.title}</h1>
          </div>

          <div className="glass-card" style={{ padding: '3rem', textAlign: 'left' }}>
            <p className="mb-6">
              <strong>{content.lastUpdated}</strong>
            </p>

            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.intro}
            </p>

            {content.sections.map((section, idx) => (
              <section key={idx} style={{ marginBottom: '2rem' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{section.heading}</h2>
                {section.paras?.map((para, i) => (
                  <p key={i} className="mb-4" style={{ color: 'var(--text-muted)' }}>{para}</p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: 'var(--text-muted)' }}>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <hr className="border-gray-700 my-8" style={{ borderColor: 'var(--glass-border)' }} />

            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {content.ack}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;
