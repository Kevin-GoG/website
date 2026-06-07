import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

const CONTENT = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: 5/31/2026",
    intro: "This Privacy Policy explains how IOTA Wallet Pro processes information when you use the website and the browser extension. The extension is designed to operate as a self-custodial wallet, which means your keys and recovery phrases remain under your control.",
    h1: "1. Scope and Controller",
    p1: "This policy applies to the IOTA Wallet Pro website and browser extension. For the extension, the project operator acts as the controller for any information that is processed through the website or extension-related support flows. The extension itself is built to minimize data handling and does not rely on a backend account system.",
    h2: "2. General Information on Data Processing",
    p2: "As a general principle, we process personal data only to the extent necessary to provide the website, the extension, and related support information. Where possible, the extension processes information locally on your device.",
    li2_1: "No wallet account creation: the extension does not require a user account or registration.",
    li2_2: "No sale of personal data: we do not sell personal data.",
    li2_3: "No analytics tracking in the extension: the extension is designed to avoid analytics collection.",
    h3: "3. Legal Basis for Processing",
    p3: "Where personal data is processed, it is based on one or more of the following grounds:",
    li3_1: "Consent: when you voluntarily submit information through contact or support channels.",
    li3_2: "Contract / pre-contractual steps: when processing is required to provide the website or support a request you initiated.",
    li3_3: "Legitimate interests: for security, abuse prevention, and maintaining the website and extension.",
    h4: "4. Data We Process",
    p4: "Depending on how you interact with the website or extension, we may process the following limited information:",
    li4_1: "Local wallet data: encrypted wallet state, preferences, and network settings stored locally on your device.",
    li4_2: "Blockchain data: public network information such as balances, transactions, and validator data retrieved from IOTA RPC endpoints.",
    li4_3: "Support information: information you choose to send when contacting the project maintainer.",
    li4_4: "Technical website data: limited operational data needed to deliver the website, such as standard server logs when the website is hosted.",
    h5: "5. Storage and Retention",
    p5: "Wallet secrets are encrypted and stored locally on your device. They are retained until you remove them or reset the extension. If support or website data is collected, it is retained only for as long as needed to respond to your request, satisfy legal obligations, or maintain the service.",
    h6: "6. Network Communication",
    p6: "To function as a blockchain wallet, the extension may communicate with public IOTA network endpoints to read public chain state and submit signed transactions. These requests do not expose your private keys. The extension only sends the data required to complete the network action you initiate.",
    h7: "7. Permissions Usage",
    p7: "The extension uses only the permissions needed for wallet functionality:",
    li7_1: "storage and unlimitedStorage: store encrypted wallet state, settings, and cached blockchain data locally.",
    li7_2: "activeTab: inject the wallet provider into the site you explicitly choose to interact with.",
    li7_3: "alarms: schedule automatic clipboard clearing 30 seconds after copying sensitive data such as private keys or recovery phrases.",
    li7_4: "clipboardWrite: clear clipboard contents after the 30-second security timeout to prevent sensitive data from persisting in the system clipboard.",
    h8: "8. Your Rights",
    p8: "Depending on your location, you may have rights to request access, correction, deletion, restriction, portability, or objection with respect to personal data we process. You may also withdraw consent where processing is based on consent. Because the extension is self-custodial, you can usually delete local wallet data by removing the extension or clearing its local storage.",
    h9: "9. Security",
    p9: "We use local encryption, isolated storage, and restricted permissions to reduce the risk of unauthorized access. However, no method of storage or transmission is completely secure, and you are responsible for safeguarding your recovery phrase and device access.",
    h10: "10. Changes to This Policy",
    p10: "We may update this policy from time to time to reflect changes in the website, the extension, or applicable legal requirements. The latest version will always be published on this page.",
    h11: "11. Contact",
    p11: "For privacy questions or requests related to the website or extension, please contact the project maintainer through the project support channel or repository.",
    ack: "By using the IOTA Wallet Pro website or extension, you acknowledge that you have read and understood this Privacy Policy."
  },
  zh: {
    title: "隱私政策",
    lastUpdated: "上次更新日期：2026年5月31日",
    intro: "本隱私政策說明了當您使用 IOTA Wallet Pro 網站及瀏覽器擴充功能時，我們如何處理相關資訊。本擴充功能旨在作為自託管錢包運作，這意味著您的金鑰和助記詞將完全保留在您的控制之下。",
    h1: "1. 適用範圍與控制者",
    p1: "本政策適用於 IOTA Wallet Pro 網站和瀏覽器擴充功能。對於擴充功能而言，專案營運方作為因網站或擴充功能相關支援流程而處理任何資訊的控制者。擴充功能本身旨在最大限度地減少數據處理，並不依賴於後端帳戶系統。",
    h2: "2. 數據處理的一般資訊",
    p2: "作為一項一般原則，我們僅在提供網站、擴充功能和相關支援資訊所必需的範圍內處理個人數據。在可能的情況下，擴充功能會在您的本機裝置上處理資訊。",
    li2_1: "無需創建錢包帳戶：擴充功能不需要用戶帳戶或註冊。",
    li2_2: "不販售個人數據：我們不會出售任何個人數據。",
    li2_3: "擴充功能中無分析追蹤：本擴充功能旨在避免收集任何分析數據。",
    h3: "3. 數據處理的法律基礎",
    p3: "在處理個人數據時，是基於以下一項或多項依據：",
    li3_1: "同意：當您自願透過聯絡或支援管道提交資訊時。",
    li3_2: "合約/締約前步驟：當為提供網站或支援您發起的請求而需要進行數據處理時。",
    li3_3: "合法利益：用於維護安全性、防止濫用以及維護網站和擴充功能。",
    h4: "4. 我們處理的數據",
    p4: "根據您與網站或擴充功能的互動方式，我們可能會處理以下有限的資訊：",
    li4_1: "本機錢包數據：本機加密儲存的錢包狀態、偏好設定和網路設置。",
    li4_2: "區塊鏈數據：從 IOTA RPC 節點獲取的公開網路資訊，如餘額、交易和驗證者數據。",
    li4_3: "支援服務資訊：當您聯絡專案維護者時，您選擇發送的資訊。",
    li4_4: "網站技術數據：傳遞網站所需的有限營運數據，例如託管網站時的標準伺服器日誌。",
    h5: "5. 數據儲存與保留",
    p5: "錢包機密在您的裝置上加密並儲存於本機。它們將被保留，直到您主動移除它們或重設擴充功能。如果收集了支援或網站數據，則僅在回應您的請求、履行法律義務或維護服務所需的期限內保留。",
    h6: "6. 網路通訊",
    p6: "為了發揮區塊鏈錢包的功能，擴充功能可能會與公開的 IOTA 網路節點進行通信，以讀取公開的鏈上狀態並提交已簽名的交易。這些請求不會洩露您的私鑰。擴充功能僅發送完成您所發起的網路操作所需的數據。",
    h7: "7. 權限使用說明",
    p7: "本擴充功能僅使用錢包功能所需的必要權限：",
    li7_1: "storage 和 unlimitedStorage：在本機儲存加密的錢包狀態、設置和快取的區塊鏈數據。",
    li7_2: "activeTab：將錢包提供者介面注入到您明確選擇互動的網站中。",
    li7_3: "alarms：在複製私鑰或助記詞等敏感數據後 30 秒，排程自動清除剪貼簿。",
    li7_4: "clipboardWrite：在 30 秒安全超時後清除剪貼簿內容，防止敏感數據遺留在系統剪貼簿中。",
    h8: "8. 您的權利",
    p8: "根據您所在的地區，您可能擁有與我們處理的個人數據相關的存取、更正、刪除、限制、可攜性或反對的權利。在基於同意進行處理的情況下，您也可以隨時撤回同意。由於本擴充功能是自託管的，您通常可以透過移除擴充功能或清除其本機儲存來刪除本機錢包數據。",
    h9: "9. 數據安全性",
    p9: "我們使用本機加密、隔離儲存和受限權限來降低未經授權存取的風險。然而，沒有任何儲存或傳輸方法是絕對安全的，您有責任妥善保管您的助記詞和裝置存取權。",
    h10: "10. 本政策的修訂",
    p10: "我們可能會不時更新本政策，以反映網站、擴充功能或適用法律要求的變化。最新版本將始終在此頁面上發布。",
    h11: "11. 聯絡方式",
    p11: "對於與網站或擴充功能相關的隱私問題或請求，請透過專案支援管道或代碼庫聯絡專案維護者。",
    ack: "使用 IOTA Wallet Pro 網站或擴充功能，即表示您確認已閱讀並理解本隱私政策的全部內容。"
  },
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 수정일: 2026년 5월 31일",
    intro: "본 개인정보 처리방침은 귀하가 IOTA Wallet Pro 웹사이트 및 브라우저 확장 프로그램을 사용할 때 당사가 정보를 처리하는 방법을 설명합니다. 본 확장 프로그램은 셀프 커스터디(비수탁형) 지갑으로 작동하도록 설계되었으므로 개인키와 복구 문구는 귀하의 제어 하에 로컬에만 유지됩니다.",
    h1: "1. 범위 및 책임자",
    p1: "본 방침은 IOTA Wallet Pro 웹사이트 및 브라우저 확장 프로그램에 적용됩니다. 확장 프로그램의 경우, 웹사이트 또는 확장 프로그램 관련 고객 지원 흐름을 통해 처리되는 모든 정보에 대하여 프로젝트 운영자가 개인정보 책임자 역할을 합니다. 확장 프로그램 자체는 데이터 처리를 최소화하도록 설계되었으며 별도의 백엔드 계정 시스템에 의존하지 않습니다.",
    h2: "2. 데이터 처리에 관한 일반 정보",
    p2: "일반적으로 당사는 웹사이트, 확장 프로그램 및 관련 지원 정보를 제공하는 데 필요한 범위 내에서만 개인정보를 처리합니다. 가능한 한 확장 프로그램은 귀하의 디바이스에서 로컬로 정보를 처리합니다.",
    li2_1: "지갑 계정 생성 없음: 확장 프로그램은 사용자 계정 생성이나 회원가입을 요구하지 않습니다.",
    li2_2: "개인정보 판매 없음: 당사는 어떠한 개인정보도 판매하지 않습니다.",
    li2_3: "확장 프로그램 내 분석 추적 없음: 확장 프로그램은 분석 목적의 데이터 수집을 방지하도록 설계되었습니다.",
    h3: "3. 데이터 처리의 법적 근거",
    p3: "개인정보가 처리되는 경우, 다음 중 하나 이상의 근거에 기초합니다.",
    li3_1: "동의: 귀하가 연락 또는 지원 채널을 통해 자발적으로 정보를 제출하는 경우.",
    li3_2: "계약 / 계약 전 단계: 웹사이트를 제공하거나 귀하가 시작한 지원 요청을 처리하기 위해 데이터 처리가 필요한 경우.",
    li3_3: "정당한 이익: 보안 유지, 남용 방지, 웹사이트 및 확장 프로그램 관리를 위해 필요한 경우.",
    h4: "4. 처리하는 데이터",
    p4: "귀하가 웹사이트 또는 확장 프로그램과 상호 작용하는 방식에 따라 당사는 다음과 같은 제한된 정보를 처리할 수 있습니다.",
    li4_1: "로컬 지갑 데이터: 귀하의 기기에 로컬로 저장되는 암호화된 지갑 상태, 기본 설정 및 네트워크 설정.",
    li4_2: "블록체인 데이터: IOTA RPC 엔드포인트에서 검색한 잔액, 트랜잭션, 검증자 데이터 등 공개 네트워크 정보.",
    li4_3: "고객 지원 정보: 프로젝트 유지 관리자에게 연락할 때 귀하가 자발적으로 전송하는 정보.",
    li4_4: "기술적 웹사이트 데이터: 웹사이트 호스팅 시 서버 로그 등 웹사이트 전송에 필요한 제한된 운영 데이터.",
    h5: "5. 저장 및 보관 기간",
    p5: "지갑 기밀은 귀하의 기기에 암호화되어 로컬 저장됩니다. 확장 프로그램을 삭제하거나 로컬 스토리지를 초기화할 때까지 보관됩니다. 지원 서비스 또는 웹사이트 데이터가 수집되는 경우, 귀하의 요청에 응답하고 법적 의무를 준수하며 서비스를 유지하는 데 필요한 기간 동안만 보관됩니다.",
    h6: "6. 네트워크 통신",
    p6: "블록체인 지갑으로 작동하기 위해 확장 프로그램은 공개 IOTA 네트워크 엔드포인트와 통신하여 공개 체인 상태를 조회하고 서명된 트랜잭션을 제출할 수 있습니다. 이러한 요청은 사용자의 개인키를 노출하지 않으며 귀하가 시작한 트랜잭션을 완료하는 데 필요한 정보만 전송합니다.",
    h7: "7. 사용 권한 설명",
    p7: "확장 프로그램은 지갑 작동에 필요한 최소한의 브라우저 권한만 사용합니다.",
    li7_1: "storage 및 unlimitedStorage: 암호화된 지갑 상태, 설정 및 캐시된 블록체인 데이터를 로컬에 저장합니다.",
    li7_2: "activeTab: 귀하가 지갑 연결을 명시적으로 선택한 사이트에 지갑 프로바이더 객체를 주입합니다.",
    li7_3: "alarms: 개인키나 복구 문구 같은 민감한 데이터 복사 후 30초 후에 클립보드를 자동 지우도록 예약합니다.",
    li7_4: "clipboardWrite: 민감 정보의 유출을 방지하기 위해 30초 보안 타임아웃 이후 클립보드 내용을 영구 삭제합니다.",
    h8: "8. 사용자의 권리",
    p8: "귀하의 거주 지역에 따라 당사가 처리하는 개인정보와 관련하여 접근, 정정, 삭제, 제한, 이동 또는 반대할 권리가 있을 수 있습니다. 동의에 기반하여 처리가 수행되는 경우 언제든지 동의를 철회할 수도 있습니다. 본 확장 프로그램은 셀프 커스터디 지갑이므로 대개 확장 프로그램을 제거하거나 브라우저 스토리지를 삭제하여 로컬 지갑 데이터를 직접 파기할 수 있습니다.",
    h9: "9. 보안 관리",
    p9: "당사는 승인되지 않은 접근 위험을 줄이기 위해 로컬 암호화, 격리된 스토리지 및 제한된 권한만 사용합니다. 그러나 절대적으로 안전한 저장 또는 전송 방법은 없으므로 복구 문구 및 기기 보안 관리에 대한 책임은 전적으로 사용자에게 있습니다.",
    h10: "10. 방침의 변경",
    p10: "당사는 웹사이트, 확장 프로그램 또는 관련 법률 요건의 변경 사항을 반영하기 위해 본 방침을 때때로 업데이트할 수 있습니다. 최신 버전은 항상 본 페이지에 게시됩니다.",
    h11: "11. 연락처",
    p11: "웹사이트 또는 확장 프로그램과 관련된 개인정보 문의 및 요청 사항은 공식 지원 채널이나 리포지토리를 통해 프로젝트 유지 관리자에게 연락해 주시기 바랍니다.",
    ack: "IOTA Wallet Pro 웹사이트 또는 확장 프로그램을 사용하는 것은 본 개인정보 처리방침을 읽고 충분히 이해했음을 의미합니다."
  }
};

const PrivacyPolicy = ({ onBack, theme, setTheme }) => {
  const { lang, t } = useTranslation();
  const content = CONTENT[lang] || CONTENT['en'];

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '2rem 5%' }}>
      <Helmet>
        <html lang={lang === 'zh' ? 'zh-Hant' : lang === 'ko' ? 'ko' : 'en'} />
        <title>{t('privacy_meta_title')}</title>
        <meta name="description" content={t('privacy_meta_desc')} />
        <link rel="canonical" href={lang === 'en' ? 'https://iotawallet.8787887.xyz/privacy' : `https://iotawallet.8787887.xyz/${lang}/privacy`} />
        <link rel="alternate" hreflang="x-default" href="https://iotawallet.8787887.xyz/privacy" />
        <link rel="alternate" hreflang="en" href="https://iotawallet.8787887.xyz/privacy" />
        <link rel="alternate" hreflang="zh-Hant" href="https://iotawallet.8787887.xyz/zh/privacy" />
        <link rel="alternate" hreflang="ko" href="https://iotawallet.8787887.xyz/ko/privacy" />
        <meta property="og:title" content={t('privacy_meta_title')} />
        <meta property="og:description" content={t('privacy_meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={lang === 'en' ? 'https://iotawallet.8787887.xyz/privacy' : `https://iotawallet.8787887.xyz/${lang}/privacy`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('privacy_meta_title')} />
        <meta name="twitter:description" content={t('privacy_meta_desc')} />
        <meta property="og:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://iotawallet.8787887.xyz/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://iotawallet.8787887.xyz/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://iotawallet.8787887.xyz/privacy" }
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
              <Shield size={32} />
            </div>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>{content.title}</h1>
          </div>

          <div className="glass-card" style={{ padding: '3rem', textAlign: 'left' }}>
            <p className="mb-6">
              <strong>{content.lastUpdated}</strong>
            </p>

            <p className="mb-8 text-gray-300" style={{ color: 'var(--text-muted)' }}>
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
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {content.p3}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li>{content.li3_1}</li>
              <li>{content.li3_2}</li>
              <li>{content.li3_3}</li>
            </ul>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h4}</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {content.p4}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li>{content.li4_1}</li>
              <li>{content.li4_2}</li>
              <li>{content.li4_3}</li>
              <li>{content.li4_4}</li>
            </ul>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h5}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p5}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h6}</h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.p6}
            </p>

            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{content.h7}</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {content.p7}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li><code>storage</code>, <code>unlimitedStorage</code>: {content.li7_1}</li>
              <li><code>activeTab</code>: {content.li7_2}</li>
              <li><code>alarms</code>: {content.li7_3}</li>
              <li><code>clipboardWrite</code>: {content.li7_4}</li>
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

export default PrivacyPolicy;
