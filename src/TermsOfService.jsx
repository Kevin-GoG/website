import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

const CONTENT = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: 5/31/2026",
    intro: "These Terms of Service govern your access to and use of the IOTA Wallet Pro website and browser extension. By using the website or extension, you agree to these terms. If you do not agree, do not use the website or extension.",
    h1: "1. The Service",
    p1: "IOTA Wallet Pro is a self-custodial browser extension wallet for interacting with IOTA networks, decentralized applications, and related blockchain functionality. The extension provides local wallet management tools and does not create a hosted account, custody your assets, or act as a financial intermediary.",
    h2: "2. Self-Custody and Your Responsibilities",
    p2: "You are solely responsible for safeguarding your recovery phrase, private keys, passwords, devices, browser profile, and any transactions you approve. The project operator cannot recover lost recovery phrases, reverse blockchain transactions, freeze assets, or restore access to wallets that you control locally.",
    li2_1: "Keep your recovery phrase and private keys secret and offline whenever possible.",
    li2_2: "Review transaction details, connected sites, token approvals, addresses, network names, and fees before confirming any action.",
    li2_3: "Use trusted devices and keep your browser, operating system, and extension updated.",
    h3: "3. Eligibility and Compliance",
    p3: "You may use the website and extension only if you are legally permitted to do so in your jurisdiction. You are responsible for complying with all applicable laws, regulations, tax obligations, sanctions restrictions, and reporting requirements that apply to your use of digital assets and blockchain networks.",
    h4: "4. No Financial, Investment, or Legal Advice",
    p4: "The website and extension are provided for technical wallet access and blockchain interaction only. Nothing in the website, extension, interface, documentation, token information, validator information, or related materials is financial, investment, legal, tax, or professional advice. You should make your own decisions and consult qualified professionals where appropriate.",
    h5: "5. Blockchain Network Risks",
    p5: "Blockchain networks and digital assets involve significant risks. By using the extension, you acknowledge that these risks may include:",
    li5_1: "irreversible transactions, failed transactions, incorrect addresses, network congestion, and changing fees;",
    li5_2: "software bugs, smart contract vulnerabilities, malicious websites, phishing attempts, and compromised devices;",
    li5_3: "asset volatility, liquidity risks, validator or staking risks, bridge risks, and third-party service failures;",
    li5_4: "changes to IOTA networks, protocol upgrades, forks, outages, or RPC endpoint availability.",
    h6: "6. Third-Party Services and DApps",
    p6: "The extension may allow you to connect to third-party decentralized applications, websites, RPC endpoints, validators, token services, or other external services. These services are not controlled by IOTA Wallet Pro. You are responsible for reviewing and trusting any third party before connecting, signing messages, approving permissions, or submitting transactions.",
    h7: "7. Acceptable Use",
    p7: "You agree not to misuse the website or extension. Prohibited conduct includes:",
    li7_1: "using the service for unlawful activity, fraud, sanctions evasion, money laundering, or abusive conduct;",
    li7_2: "attempting to disrupt, overload, reverse engineer, compromise, or interfere with the website, extension, or supporting infrastructure;",
    li7_3: "misrepresenting your identity, rights, affiliation, or authority when using the service;",
    li7_4: "using the service in a way that infringes the rights of others or violates applicable law.",
    h8: "8. Fees, Gas, and Transactions",
    p8: "Blockchain transactions may require network fees, gas, storage deposits, validator fees, or other costs determined by the relevant network or third-party service. IOTA Wallet Pro does not control these fees and is not responsible for transaction costs, failed transactions, delayed confirmations, or losses caused by incorrect transaction parameters.",
    h9: "9. Intellectual Property",
    p9: "The website, extension interface, branding, design elements, and related materials are protected by applicable intellectual property laws unless otherwise stated. You may not copy, modify, distribute, or use project branding in a misleading way without permission. Open-source components, if any, remain governed by their respective licenses.",
    h10: "10. Availability and Changes",
    p10: "The website and extension are provided on an evolving basis. Features may be changed, suspended, removed, or updated at any time. Access may depend on browser compatibility, network availability, third-party services, and local device conditions.",
    h11: "11. Disclaimer of Warranties",
    p11: "The website and extension are provided on an “as is” and “as available” basis, without warranties of any kind, whether express, implied, statutory, or otherwise. No guarantee is made that the service will be secure, uninterrupted, error-free, accurate, compatible with every system, or free from harmful components.",
    h12: "12. Limitation of Liability",
    p12: "To the maximum extent permitted by law, the project operator and contributors will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of assets, private keys, recovery phrases, profits, data, goodwill, business opportunities, or access resulting from your use of, or inability to use, the website or extension.",
    h13: "13. Indemnification",
    p13: "You agree to defend, indemnify, and hold harmless the project operator and contributors from claims, damages, liabilities, losses, costs, and expenses arising from your use of the website or extension, your violation of these terms, your violation of applicable law, or your interaction with third-party services.",
    h14: "14. Termination",
    p14: "You may stop using the website or extension at any time. We may suspend or discontinue access to website features or support channels where necessary to protect users, comply with law, prevent abuse, or maintain the service. Local wallet data remains under your control and may be removed by uninstalling the extension or clearing its local storage.",
    h15: "15. Changes to These Terms",
    p15: "These terms may be updated from time to time to reflect changes in the website, extension, applicable law, or project operations. The latest version will be published on this page. Continued use after an update means you accept the updated terms.",
    h16: "16. Contact",
    p16: "For questions about these terms, please contact the project maintainer through the project support channel or repository.",
    ack: "By using the IOTA Wallet Pro website or extension, you acknowledge that you have read, understood, and agreed to these Terms of Service."
  },
  zh: {
    title: "服務條款",
    lastUpdated: "上次更新日期：2026年5月31日",
    intro: "本服務條款適用於您存取與使用 IOTA Wallet Pro 網站及瀏覽器擴充功能。使用網站或擴充功能，即表示您同意本條款。若您不同意，請勿使用網站或擴充功能。",
    h1: "1. 關於服務",
    p1: "IOTA Wallet Pro 是一款用於與 IOTA 網路、去中心化應用程式 (dApp) 以及相關區塊鏈功能進行互動的自託管瀏覽器擴充功能錢包。本擴充功能提供本機錢包管理工具，並不提供託管帳戶、不代管您的資產，亦不作為金融中介機構。",
    h2: "2. 自我託管與您的責任",
    p2: "您全權負責保管您的助記詞、私鑰、密碼、裝置、瀏覽器設定檔以及您核准的任何交易。專案營運方無法恢復遺失的助記詞、無法撤銷區塊鏈交易、無法凍結資產，亦無法恢復對您在本機控制之錢包的存取權。",
    li2_1: "務必將您的助記詞和私鑰保密，並儘可能保持離線儲存。",
    li2_2: "在確認任何操作之前，仔細檢查交易詳情、連接的網站、代幣授權、地址、網路名稱和燃料費用。",
    li2_3: "使用受信任的裝置，並保持瀏覽器、操作系統和擴充功能的更新。",
    h3: "3. 資格與合規性",
    p3: "您僅能在您的司法管轄區法律允許的情況下使用網站和擴充功能。您有責任遵守與使用數位資產和區塊鏈網路相關的所有適用法律、法規、稅務義務、制裁限制和申報要求。",
    h4: "4. 不構成金融、投資或法律建議",
    p4: "網站和擴充功能僅提供技術性錢包存取和區塊鏈互動。網站、擴充功能、介面、文檔、代幣資訊、驗證者資訊或相關材料中的任何內容均不構成金融、投資、法律、稅務或專業建議。您應該做出自己的決定，並在適當情況下諮詢合格的專業人士。",
    h5: "5. 區塊鏈網路風險",
    p5: "區塊鏈網路和數位資產涉及重大風險。使用本擴充功能，即表示您確認這些風險可能包括：",
    li5_1: "不可逆的交易、交易失敗、錯誤的地址、網路壅塞和不斷變化的費用；",
    li5_2: "軟體錯誤、智能合約漏洞、惡意網站、網絡釣魚嘗試和受感染的裝置；",
    li5_3: "資產波動性、流動性風險、驗證者或質押風險、跨鏈橋風險以及第三方服務故障；",
    li5_4: "IOTA 網路的變更、協定升級、硬分叉、停機或 RPC 節點的可用性。",
    h6: "6. 第三方服務與 DApps",
    p6: "本擴充功能可能允許您連接到第三方去中心化應用程式、網站、RPC 節點、驗證者、代幣服務或其他外部服務。這些服務不受 IOTA Wallet Pro 控制。在連接、簽署訊息、核准權限或提交交易之前，您有責任評估並信任任何第三方。",
    h7: "7. 合理使用規範",
    p7: "您同意不濫用網站或擴充功能。禁止的行為包括：",
    li7_1: "將服務用於非法活動、欺詐、逃避制裁、洗錢或虐待行為；",
    li7_2: "試圖干擾、超載、逆向工程、損害或干擾網站、擴充功能或支援的基礎設施；",
    li7_3: "在使用服務時歪曲您的身份、權利、關聯或授權；",
    li7_4: "以侵犯他人權利或違反適用法律的方式使用服務。",
    h8: "8. 費用、燃料費與交易",
    p8: "區塊鏈交易可能需要網路費、燃料費（Gas）、儲存押金、驗證者費或由相關網路或第三方服務確定的其他成本。IOTA Wallet Pro 不控制這些費用，也不對交易成本、交易失敗、延遲確認或由於錯誤的交易參數造成的損失負責。",
    h9: "9. 智慧財產權",
    p9: "除非另有說明，否則網站、擴充功能介面、品牌、設計元素和相關材料均受適用智慧財產權法保護。未經許可，您不得以誤導性方式複製、修改、分發或使用專案品牌。如果有開源組件，它們仍受其各自許可證的約束。",
    h10: "10. 可用性與變更",
    p10: "網站和擴充功能是在不斷演變的基礎上提供的。功能可能隨時更改、暫停、移除或更新。存取可能取決於瀏覽器相容性、網路可用性、第三方服務和本機裝置狀況。",
    h11: "11. 免責聲明",
    p11: "網站和擴充功能是按「現狀」和「可使用」的基礎提供的，不提供任何明示、暗示、法定或其他形式的保證。不保證服務安全、無中斷、無錯誤、準確、與每個系統相容或不含任何有害組件。",
    h12: "12. 責任限制",
    p12: "在法律允許的最大範圍內，專案營運方和貢獻者將不對任何間接、偶然、特別、後續性、懲罰性損害負責，也不對因您使用或無法使用網站或擴充功能而導致的資產、私鑰、助記詞、利潤、數據、信譽、商業機會的損失負責。",
    h13: "13. 賠償",
    p13: "您同意為專案營運方和貢獻者提供辯護、予以賠償並使其免受因您使用網站或擴充功能、您違反本條款、您違反適用法律或您與第三方服務互動而引起的索賠、損害、責任、損失、成本和費用。",
    h14: "14. 終止",
    p14: "您可以隨時停止使用網站或擴充功能。我們可能會在必要時暫停或終止對網站功能或支援管道的存取，以保護用戶、遵守法律、防止濫用或維護服務。本機錢包數據仍受您控制，可以透過卸載擴充功能或清除其本機儲存來移除。",
    h15: "15. 本條款的修訂",
    p15: "本條款可能會不時更新，以反映網站、擴充功能、適用法律或專案營運的變化。最新版本將公布在此頁面上。更新後繼續使用即表示您接受更新後的條款。",
    h16: "16. 聯絡我們",
    p16: "對於本條款的問題，請透過專案支援管道或代碼庫聯絡專案維護者。",
    ack: "使用 IOTA Wallet Pro 網站或擴充功能，即表示您確認已閱讀、理解並同意本服務條款的全部內容。"
  },
  ko: {
    title: "이용 약관",
    lastUpdated: "최종 수정일: 2026년 5월 31일",
    intro: "본 이용 약관은 귀하가 IOTA Wallet Pro 웹사이트 및 브라우저 확장 프로그램에 액세스하고 사용하는 것을 규율합니다. 웹사이트 또는 확장 프로그램을 사용함으로써 귀하는 본 약관에 동의하게 됩니다. 동의하지 않는 경우 웹사이트 또는 확장 프로그램을 사용하지 마십시오.",
    h1: "1. 서비스 안내",
    p1: "IOTA Wallet Pro는 IOTA 네트워크, 탈중앙화 애플리케이션(dApp) 및 관련 블록체인 기능과의 상호 작용을 위한 셀프 커스터디 브라우저 확장 프로그램 지갑입니다. 본 확장 프로그램은 로컬 지갑 관리 도구를 제공하며 별도의 수탁 계정을 생성하거나 자산을 보관하거나 금융 중개업자 역할을 하지 않습니다.",
    h2: "2. 셀프 커스터디 지갑과 사용자의 책임",
    p2: "귀하의 복구 문구, 개인키, 패스워드, 기기, 브라우저 프로필 및 귀하가 승인한 모든 트랜잭션을 안전하게 보관하는 책임은 전적으로 귀하에게 있습니다. 프로젝트 운영자는 분실된 복구 문구를 복구하거나 블록체인 트랜잭션을 취소하거나 자산을 동결하거나 로컬로 제어하는 지갑에 대한 액세스를 복원할 수 없습니다.",
    li2_1: "복구 문구와 개인키를 기밀로 유지하고 가능한 한 오프라인으로 보관하세요.",
    li2_2: "어떤 작업을 승인하기 전에 트랜잭션 세부 정보, 연결된 사이트, 토큰 승인, 주소, 네트워크 이름 및 수수료를 자세히 검토하세요.",
    li2_3: "신뢰할 수 있는 장치를 사용하고 브라우저, 운영 체제 및 확장 프로그램을 항상 최신 상태로 업데이트하세요.",
    h3: "3. 적격성 및 법률 준수",
    p3: "귀하는 귀하의 관할 지역에서 법적으로 허용되는 경우에만 웹사이트와 확장 프로그램을 사용할 수 있습니다. 귀하는 귀하의 디지털 자산 및 블록체인 네트워크 사용에 적용되는 모든 법률, 규정, 세금 의무, 제재 제한 및 보고 요구 사항을 준수할 책임이 있습니다.",
    h4: "4. 금융, 투자 또는 법률 자문 아님",
    p4: "웹사이트와 확장 프로그램은 기술적 지갑 액세스 및 블록체인 상호 작용을 위해서만 제공됩니다. 웹사이트, 확장 프로그램, 인터페이스, 문서, 토큰 정보, 검증자 정보 또는 관련 자료의 어떤 내용도 금융, 투자, 법률, 세무 또는 기타 전문적인 조언을 구성하지 않습니다. 귀하는 스스로 결정을 내려야 하며 필요한 경우 자격을 갖춘 전문가의 조언을 구해야 합니다.",
    h5: "5. 블록체인 네트워크 위험",
    p5: "블록체인 네트워크와 디지털 자산은 상당한 위험을 수반합니다. 확장 프로그램을 사용함으로써 귀하는 다음과 같은 위험이 발생할 수 있음을 인정합니다.",
    li5_1: "취소 불가능한 트랜잭션, 실패한 트랜잭션, 잘못된 주소 입력, 네트워크 정체 및 가스 수수료 변동;",
    li5_2: "소프트웨어 버그, 스마트 계약 취약점, 악성 웹사이트, 피싱 시도 및 보안이 침해된 장치;",
    li5_3: "자산 변동성, 유동성 위험, 검증자 또는 스테이킹 위험, 브리지 위험 및 제3자 서비스 실패;",
    li5_4: "IOTA 네트워크의 변경, 프로토콜 업그레이드, 포크, 가동 중단 또는 RPC 노드 가용성 변경.",
    h6: "6. 제3자 서비스 및 DApps",
    p6: "확장 프로그램은 제3자 탈중앙화 애플리케이션, 웹사이트, RPC 노드, 검증자, 토큰 서비스 또는 기타 외부 서비스에 대한 연결을 지원할 수 있습니다. 이러한 서비스는 IOTA Wallet Pro에 의해 제어되지 않습니다. 연결하거나 메시지에 서명하거나 권한을 승인하거나 트랜잭션을 제출하기 전에 해당 제3자를 검토하고 신뢰하는 책임은 귀하에게 있습니다.",
    h7: "7. 허용되는 사용 범위",
    p7: "귀하는 웹사이트 또는 확장 프로그램을 오용하지 않는 것에 동의합니다. 금지된 행위는 다음과 같습니다.",
    li7_1: "불법 활동, 사기, 제재 회피, 자금 세탁 또는 남용 행위를 위해 서비스를 사용하는 행위;",
    li7_2: "웹사이트, 확장 프로그램 또는 지원 인프라를 방해, 과부하, 역설계, 침해 또는 손상시키려는 행위;",
    li7_3: "서비스를 사용할 때 본인의 신원, 권한, 제휴 관계 등을 허위로 표시하는 행위;",
    li7_4: "타인의 권리를 침해하거나 적용 가능한 법률을 위반하는 방식으로 서비스를 사용하는 행위.",
    h8: "8. 수수료, 가스비 및 트랜잭션",
    p8: "블록체인 트랜잭션은 관련 네트워크 또는 제3자 서비스에 의해 결정되는 네트워크 수수료, 가스비, 스토리지 보증금, 검증자 수수료 또는 기타 비용을 요구할 수 있습니다. IOTA Wallet Pro는 이러한 수수료를 제어하지 않으며 트랜잭션 비용, 실패한 트랜잭션, 지연된 확인 또는 잘못된 트랜잭션 파라미터로 인한 손실에 대해 책임을 지지 않습니다.",
    h9: "9. 지적 재산권",
    p9: "웹사이트, 확장 프로그램 인터페이스, 브랜드, 디자인 요소 및 관련 자료는 별도의 설명이 없는 한 적용 가능한 지적재산권법의 보호를 받습니다. 허가 없이 프로젝트 브랜드를 오도하는 방식으로 복사, 수정, 배포 또는 사용할 수 없습니다. 오픈 소스 구성 요소가 있는 경우 해당 라이선스가 적용됩니다.",
    h10: "10. 가용성 및 서비스 변경",
    p10: "웹사이트와 확장 프로그램은 지속적으로 진화하는 기반 위에 제공됩니다. 기능은 언제든지 변경, 일시 중단, 제거 또는 업데이트될 수 있습니다. 액세스는 브라우저 호환성, 네트워크 가용성, 제3자 서비스 및 로컬 장치 상태에 따라 달라질 수 있습니다.",
    h11: "11. 보증의 면제",
    p11: "웹사이트와 확장 프로그램은 보증 없이 '있는 그대로' 및 '이용 가능한 상태로' 제공됩니다. 서비스가 안전하고 중단이 없으며 오류가 없고 정확하며 모든 시스템과 호환되거나 유해 구성 요소가 없다는 보증을 하지 않습니다.",
    h12: "12. 책임의 제한",
    p12: "법이 허용하는 최대 범위 내에서 프로젝트 운영자 및 기여자는 간접적, 부수적, 결과적, 특별, 징벌적 손해에 대해 책임을 지지 않으며, 서비스 사용 또는 사용 불능으로 인한 자산, 개인키, 복구 문구, 이익, 데이터, 신용, 비즈니스 기회의 손실에 대해서도 책임을 지지 않습니다.",
    h13: "13. 면책 및 배상",
    p13: "귀하는 본 서비스의 사용, 본 약관 위반, 법률 위반 또는 제3자 서비스와의 상호 작용으로 인해 발생하는 모든 청구, 손해, 책임, 손실, 비용 및 경비로부터 프로젝트 운영자와 기여자를 면책하고 방어하며 해를 입히지 않는 것에 동의합니다.",
    h14: "14. 이용의 종료",
    p14: "귀하는 언제든지 웹사이트 또는 확장 프로그램의 사용을 중단할 수 있습니다. 당사는 사용자를 보호하고 법률을 준수하며 남용을 방지하거나 서비스를 유지하기 위해 필요한 경우 웹사이트 기능 또는 지원 채널에 대한 액세스를 일시 중지하거나 중단할 수 있습니다. 로컬 지갑 데이터는 귀하의 제어 하에 있으며 확장 프로그램을 제거하거나 브라우저 스토리지를 삭제하여 직접 파기할 수 있습니다.",
    h15: "15. 이용 약관의 변경",
    p15: "본 약관은 웹사이트, 확장 프로그램, 관련 법률 또는 프로젝트 운영의 변경 사항을 반영하기 위해 때때로 업데이트될 수 있습니다. 최신 버전은 본 페이지에 게시됩니다. 업데이트 후에도 계속 사용하는 것은 변경된 약관을 수락하는 것을 의미합니다.",
    h16: "16. 연락처",
    p16: "본 약관에 관한 문의 사항은 공식 지원 채널이나 리포지토리를 통해 프로젝트 유지 관리자에게 연락해 주시기 바랍니다.",
    ack: "IOTA Wallet Pro 웹사이트 또는 확장 프로그램을 사용하는 것은 본 이용 약관을 읽고 이해하였으며 이에 동의함을 인정하는 것입니다."
  }
};

const TermsOfService = ({ onBack, theme, setTheme }) => {
  const { lang, t } = useTranslation();
  const content = CONTENT[lang] || CONTENT['en'];

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('terms_meta_title')}</title>
        <meta name="description" content={t('terms_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://iotawallet.8787887.xyz/terms' : `https://iotawallet.8787887.xyz/${lang}/terms`} />
        <link rel="alternate" hreflang="x-default" href="https://iotawallet.8787887.xyz/terms" />
        <link rel="alternate" hreflang="en" href="https://iotawallet.8787887.xyz/terms" />
        <link rel="alternate" hreflang="zh-Hant" href="https://iotawallet.8787887.xyz/zh/terms" />
        <link rel="alternate" hreflang="ko" href="https://iotawallet.8787887.xyz/ko/terms" />
        <meta property="og:title" content={t('terms_meta_title')} />
        <meta property="og:description" content={t('terms_meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={lang === 'en' ? 'https://iotawallet.8787887.xyz/terms' : `https://iotawallet.8787887.xyz/${lang}/terms`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('terms_meta_title')} />
        <meta name="twitter:description" content={t('terms_meta_desc')} />
        <meta property="og:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://iotawallet.8787887.xyz/" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://iotawallet.8787887.xyz/terms" }
          ]
        })}</script>
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

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h1}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p1}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h2}</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {content.p2}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li>{content.li2_1}</li>
              <li>{content.li2_2}</li>
              <li>{content.li2_3}</li>
            </ul>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h3}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p3}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h4}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p4}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h5}</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {content.p5}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li>{content.li5_1}</li>
              <li>{content.li5_2}</li>
              <li>{content.li5_3}</li>
              <li>{content.li5_4}</li>
            </ul>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h6}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p6}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h7}</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {content.p7}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li>{content.li7_1}</li>
              <li>{content.li7_2}</li>
              <li>{content.li7_3}</li>
              <li>{content.li7_4}</li>
            </ul>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h8}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p8}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h9}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p9}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h10}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p10}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h11}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p11}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h12}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p12}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h13}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p13}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h14}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p14}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h15}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p15}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h16}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p16}
            </p>

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
