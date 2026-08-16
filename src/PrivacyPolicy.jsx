import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from './useTranslation';
import { LanguageThemeSelector } from './App';

// Each section: heading + paras (plain paragraphs) and/or list, and optionally rows = [label, value] rendered as a simple table.
const CONTENT = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: 8/16/2026",
    intro: "This Privacy Policy explains how Liu Yun (an individual, the “Operator”, “we”, “us”) collects, uses, and protects information when you use the IOTA Wallet Pro website (https://walletpro.agentsblockchains.com) and the IOTA Wallet Pro browser extension (the “Service”). The extension is designed as a self-custodial wallet, which means your keys and recovery phrases remain under your control. Optional paid features require a cloud account; these are separate services and are not required for basic wallet functionality. This policy is for general reference only and does not constitute legal advice.",
    sections: [
      {
        heading: "1. Data Controller",
        paras: [
          "The data controller for the Service is Liu Yun, an individual operator, reachable at:",
          "Privacy contact: support@agentsblockchains.com. The Operator has not designated a separate Data Protection Officer; for any DPO matters, contact the privacy contact above."
        ]
      },
      {
        heading: "2. Personal Information We Collect",
        paras: [
          "We collect only the information described below. We do not set out to collect more than is needed to operate the Service.",
          "Full card numbers are not stored by us — card data is processed by our payment processor."
        ],
        rows: [
          ["Category", "What we collect & why"],
          ["Local wallet data", "Encrypted wallet state, preferences, and network settings stored locally on your device. Never transmitted to us."],
          ["Blockchain data", "Public network information (balances, transactions, validator data) retrieved from IOTA RPC endpoints."],
          ["Account information (paid features)", "Email address, hashed password, subscription tier, and payment order history. Stored in our backend."],
          ["Payment data", "Processed exclusively by our payment processor (Waffo Pancake). We never see or store full card numbers."],
          ["Support & feedback", "Information you voluntarily send via our feedback form or email (support@agentsblockchains.com)."],
          ["Technical website data", "Limited operational data such as standard server logs when the website is hosted."]
        ]
      },
      {
        heading: "3. How We Use Information",
        paras: [
          "We use information only for the purposes described below, on the legal basis indicated."
        ],
        rows: [
          ["Purpose", "Legal basis"],
          ["Provide service delivery", "Performance of a contract"],
          ["Processing payments", "Performance of a contract & legal obligation"],
          ["Provide customer support", "Performance of a contract / legitimate interests"],
          ["Send service and security notifications", "Performance of a contract / legitimate interests"],
          ["Security and abuse prevention", "Legitimate interests"],
          ["Analytics and service improvement", "Legitimate interests (no advertising tracking in the extension)"],
          ["Compliance with legal obligations", "Legal obligation"],
          ["Marketing communications (only if you opt in)", "Consent (you can opt out at any time)"]
        ]
      },
      {
        heading: "4. Sharing & Disclosure",
        paras: [
          "We do not sell your personal information.",
          "Payment processing: card payments are handled by our payment processor, Waffo Pancake (PCI-DSS certified). Card data is not stored on our servers.",
          "Legal requirements: we may disclose information where required by law, regulation, or legal process, or to protect the rights, safety, and security of users and others.",
          "Business transactions: in the event of a merger, acquisition, or other business transaction, user information may be transferred as part of that transaction."
        ]
      },
      {
        heading: "5. Data Security",
        paras: [
          "We use local encryption, isolated storage, restricted permissions, and HTTPS/TLS-encrypted transmission to protect data. Access to any cloud account data is controlled and limited to what is strictly needed.",
          "In the event of a data breach affecting personal information, we will notify affected individuals and the relevant supervisory authority within 72 hours of discovery, where required by law."
        ]
      },
      {
        heading: "6. Data Retention",
        paras: [
          "We retain information only as long as necessary for the purposes described in this policy. Specific retention periods:"
        ],
        rows: [
          ["Data type", "Retention period"],
          ["Local wallet data", "Until you delete it or uninstall the extension (it lives on your device)."],
          ["Cloud account data", "90 days after subscription cancellation, then deleted (or earlier on request)."],
          ["Payment records", "As required by applicable law (e.g., tax and accounting obligations) and per our processor's retention policy."],
          ["Support & feedback data", "Up to 12 months after your request is resolved, unless a longer period is required by law."],
          ["Server logs", "Up to 30 days, unless needed longer for security or legal purposes."]
        ],
        parasEnd: [
          "Deletion is carried out securely by erasing or anonymizing the relevant data."
        ]
      },
      {
        heading: "7. Your Data Rights",
        paras: [
          "Under applicable law (including the GDPR, where it applies to you), you have the right to:",
          "(1) be informed about how your data is processed; (2) access your data; (3) rectify inaccurate data; (4) request erasure; (5) restrict processing; (6) data portability; (7) object to processing; and (8) withdraw consent at any time. You also have the right to lodge a complaint with your local data protection authority.",
          "To exercise any of these rights, contact support@agentsblockchains.com. We will respond within 30 calendar days. Because the Service is self-custodial, you can usually delete local wallet data yourself by uninstalling the extension or clearing local storage."
        ]
      },
      {
        heading: "8. Children's Privacy",
        paras: [
          "The Service is intended for users aged 18 or older. We do not knowingly collect personal information from children under the age of 13 (or the minimum age set by your local law), and we do not knowingly allow children to use paid features. If we learn that we have collected data from a child below this age, we will delete it. If you believe a child has provided us information, please contact support@agentsblockchains.com."
        ]
      },
      {
        heading: "9. Cookies & Tracking",
        paras: [
          "The website may use strictly necessary cookies or local storage to maintain settings (such as theme, language, and session state). We do not use advertising or cross-site tracking cookies. No analytics or marketing cookies are used by the extension."
        ]
      },
      {
        heading: "10. Policy Changes",
        paras: [
          "We may update this Privacy Policy from time to time. We will provide at least 15 days' advance notice of material changes via email or a prominent notice on our website. The latest version will always be published on this page, and the “Last Updated” date at the top reflects the most recent change."
        ]
      },
      {
        heading: "11. Contact Us",
        paras: [
          "For any privacy questions or requests, contact us at:",
          "Privacy email: support@agentsblockchains.com",
          "Support email: support@agentsblockchains.com",
          "Operator: Liu Yun, an individual. Support is generally handled via email; we are not able to accept all communications by mail as an individual operator."
        ]
      }
    ],
    ack: "By using the IOTA Wallet Pro website or extension, you acknowledge that you have read and understood this Privacy Policy."
  },
  zh: {
    title: "隱私政策",
    lastUpdated: "上次更新日期：2026年8月16日",
    intro: "本隱私政策說明了個人經營者 Liu Yun（以下簡稱「營運方」、「我們」）在您使用 IOTA Wallet Pro 網站（https://walletpro.agentsblockchains.com）及 IOTA Wallet Pro 瀏覽器擴充功能（「服務」）時如何收集、使用及保護資訊。本擴充功能旨在作為自託管錢包運作，這意味著您的金鑰和助記詞將完全保留在您的控制之下。可選的付費功能需要雲端帳戶，這類功能屬於獨立服務，並非基本錢包功能的必要條件。本政策僅供一般參考，不構成法律意見。",
    sections: [
      {
        heading: "1. 資料控制者",
        paras: [
          "本服務的資料控制者為個人經營者 Liu Yun，可透過以下方式聯絡：",
          "隱私聯絡：support@agentsblockchains.com。營運方未另行指定資料保護官（DPO）；如有任何 DPO 相關事宜，請聯絡上述隱私聯絡管道。"
        ]
      },
      {
        heading: "2. 我們收集的個人資訊",
        paras: [
          "我們僅收集下述資訊，不會刻意收集超出營運服務所需範圍的資訊。",
          "我們不會儲存完整的卡號 — 卡片資料由我們的支付處理商處理。"
        ],
        rows: [
          ["類別", "我們收集的內容與原因"],
          ["本機錢包數據", "於您裝置上本機儲存的加密錢包狀態、偏好設定及網路設置，絕不會傳輸給我們。"],
          ["區塊鏈數據", "從 IOTA RPC 節點取得的公開網路資訊（餘額、交易、驗證者數據）。"],
          ["帳戶資訊（付費功能）", "電子郵件地址、雜湊密碼、訂閱層級與付款訂單歷史。儲存於我們的後端系統。"],
          ["付款數據", "僅由我們的支付處理商（Waffo Pancake）處理，我們絕不會看到或儲存完整的卡號。"],
          ["支援與反饋", "您自願透過我們的反饋表單或電子郵件（support@agentsblockchains.com）發送的資訊。"],
          ["網站技術數據", "網站託管時產生的有限營運數據，例如標準伺服器日誌。"]
        ]
      },
      {
        heading: "3. 我們如何使用資訊",
        paras: [
          "我們僅按下述目的並基於所述之法律依據使用資訊。"
        ],
        rows: [
          ["目的", "法律依據"],
          ["提供服務", "履行合約"],
          ["處理付款", "履行合約與法律義務"],
          ["提供客戶支援", "履行合約／合法利益"],
          ["發送服務與安全通知", "履行合約／合法利益"],
          ["安全與濫用防範", "合法利益"],
          ["分析與服務改善", "合法利益（擴充功能中無廣告追蹤）"],
          ["履行法律義務", "法律義務"],
          ["行銷通訊（僅在您選擇接收時）", "同意（您可隨時退出）"]
        ]
      },
      {
        heading: "4. 分享與揭露",
        paras: [
          "我們不會出售您的個人資訊。",
          "付款處理：卡片付款由我們的支付處理商 Waffo Pancake（通過 PCI-DSS 認證）處理，卡片數據不會儲存在我們的伺服器上。",
          "法律要求：在法律、法規或司法程序要求時，或為保護使用者及其他人的權利、安全時，我們可能揭露資訊。",
          "商業交易：若發生合併、收購或其他商業交易，使用者資訊可能作為該交易的一部分被轉讓。"
        ]
      },
      {
        heading: "5. 數據安全",
        paras: [
          "我們使用本機加密、隔離儲存、受限權限及 HTTPS/TLS 加密傳輸來保護數據，並對任何雲端帳戶資料的存取實施控管，僅限於嚴格必要之範圍。",
          "一旦發生影響個人資訊的數據洩漏，在法律要求下，我們將於發現後 72 小時內通知受影響的個人及相關監管機構。"
        ]
      },
      {
        heading: "6. 數據保留",
        paras: [
          "我們僅在本政策所述目的所需期間內保留資訊。具體保留期限如下："
        ],
        rows: [
          ["數據類型", "保留期限"],
          ["本機錢包數據", "保留至您刪除或卸載擴充功能（數據位於您的裝置上）。"],
          ["雲端帳戶數據", "訂閱取消後保留 90 天，之後刪除（或應要求提前刪除）。"],
          ["付款記錄", "依適用法律要求（例如稅務及會計義務）及我們處理商的保留政策保留。"],
          ["支援與反饋數據", "您的請求解決後最多保留 12 個月，除非法律要求更長期限。"],
          ["伺服器日誌", "最多保留 30 天，除非因安全或法律目的需要更久。"]
        ],
        parasEnd: [
          "刪除將透過安全清除或去識別化（匿名化）相關數據來執行。"
        ]
      },
      {
        heading: "7. 您的數據權利",
        paras: [
          "根據適用法律（包括適用於您的 GDPR），您有權：",
          "(1) 被告知您的數據如何被處理；(2) 存取您的數據；(3) 更正不準確的數據；(4) 要求刪除；(5) 限制處理；(6) 數據可攜性；(7) 反對處理；(8) 隨時撤回同意。您亦有權向當地資料保護機構提出申訴。",
          "如需行使上述任何權利，請聯絡 support@agentsblockchains.com。我們將於 30 個月曆日內回覆。由於本服務為自託管，您通常可以自行透過卸載擴充功能或清除本機儲存來刪除本機錢包數據。"
        ]
      },
      {
        heading: "8. 兒童隱私",
        paras: [
          "本服務僅供 18 歲以上使用者使用。我們不會在知情的情況下收集 13 歲以下（或您當地法律所定的最低年齡）兒童的個人資訊，亦不會在知情的情況下允許兒童使用付費功能。若我們得知已收集到此年齡以下兒童的數據，將予以刪除。如您認為有兒童向我們提供了資訊，請聯絡 support@agentsblockchains.com。"
        ]
      },
      {
        heading: "9. Cookie 與追蹤",
        paras: [
          "網站可能使用嚴格必要之 Cookie 或本機儲存以維持設定（如主題、語言及工作階段狀態）。我們不使用廣告或跨網站追蹤 Cookie。擴充功能不使用任何分析或行銷 Cookie。"
        ]
      },
      {
        heading: "10. 政策變更",
        paras: [
          "我們可能會不時更新本隱私政策。對於重大變更，我們將透過電子郵件或網站上的顯著通知，提前至少 15 天通知您。最新版本將始終公布於本頁面，頂部的「上次更新日期」反映最近一次變更。"
        ]
      },
      {
        heading: "11. 聯絡我們",
        paras: [
          "如有任何隱私問題或請求，請透過以下方式聯絡我們：",
          "隱私電子郵件：support@agentsblockchains.com",
          "支援電子郵件：support@agentsblockchains.com",
          "營運方：Liu Yun，個人經營者。支援一般透過電子郵件處理；作為個人經營者，我們可能無法接受所有郵寄通訊。"
        ]
      }
    ],
    ack: "使用 IOTA Wallet Pro 網站或擴充功能，即表示您確認已閱讀並理解本隱私政策的全部內容。"
  },
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 수정일: 2026년 8월 16일",
    intro: "본 개인정보 처리방침은 개인 운영자 Liu Yun(이하 “운영자”, “당사”, “저희”)가 귀하가 IOTA Wallet Pro 웹사이트(https://walletpro.agentsblockchains.com) 및 IOTA Wallet Pro 브라우저 확장 프로그램(“서비스”)을 사용할 때 정보를 어떻게 수집, 사용 및 보호하는지 설명합니다. 본 확장 프로그램은 셀프 커스터디(비수탁형) 지갑으로 설계되었으므로 개인키와 복구 문구는 귀하의 제어 하에 유지됩니다. 선택적 유료 기능에는 클라우드 계정이 필요하며 이는 별도의 서비스로 기본 지갑 기능에는 필요하지 않습니다. 본 방침은 일반적인 참조용일 뿐 법률 자문을 구성하지 않습니다.",
    sections: [
      {
        heading: "1. 개인정보 책임자",
        paras: [
          "서비스의 개인정보 책임자는 개인 운영자 Liu Yun이며 다음으로 연락할 수 있습니다:",
          "개인정보 연락처: support@agentsblockchains.com. 운영자는 별도의 개인정보 보호 책임자(DPO)를 지정하지 않았으며, DPO 관련 사항은 위 개인정보 연락처로 문의하십시오."
        ]
      },
      {
        heading: "2. 당사가 수집하는 개인정보",
        paras: [
          "당사는 아래에 설명된 정보만 수집하며, 서비스 운영에 필요한 범위를 초과하는 정보를 수집하지 않습니다.",
          "전체 카드 번호는 당사가 저장하지 않습니다 — 카드 데이터는 당사의 결제 처리사가 처리합니다."
        ],
        rows: [
          ["유형", "수집 내용 및 이유"],
          ["로컬 지갑 데이터", "기기에 로컬로 저장되는 암호화된 지갑 상태, 기본 설정 및 네트워크 설정. 당사에 전송되지 않습니다."],
          ["블록체인 데이터", "IOTA RPC 엔드포인트에서 검색된 공개 네트워크 정보(잔액, 거래, 검증자 데이터)."],
          ["계정 정보(유료 기능)", "이메일 주소, 해시된 비밀번호, 구독 등급 및 결제 주문 내역. 저희 백엔드에 저장됩니다."],
          ["결제 데이터", "결제 처리사(Waffo Pancake)만 처리하며, 당사는 전체 카드 번호를 볼 수 없거나 저장하지 않습니다."],
          ["고객 지원 및 피드백", "귀하가 지원 양식 또는 이메일(support@agentsblockchains.com)을 통해 자발적으로 보낸 정보."],
          ["기술적 웹사이트 데이터", "웹사이트 호스팅 시 발생하는 표준 서버 로그 등 제한된 운영 데이터."]
        ]
      },
      {
        heading: "3. 정보 사용 방법",
        paras: [
          "당사는 아래 설명된 목적과 법적 근거에 따라서만 정보를 사용합니다."
        ],
        rows: [
          ["목적", "법적 근거"],
          ["서비스 제공", "계약 이행"],
          ["결제 처리", "계약 이행 및 법적 의무"],
          ["고객 지원 제공", "계약 이행 / 정당한 이익"],
          ["서비스 및 보안 알림 발송", "계약 이행 / 정당한 이익"],
          ["보안 및 남용 방지", "정당한 이익"],
          ["분석 및 서비스 개선", "정당한 이익(확장 프로그램에는 광고 추적 없음)"],
          ["법적 의무 준수", "법적 의무"],
          ["마케팅 커뮤니케이션(수신 동의 시에만)", "동의(언제든지 거부 가능)"]
        ]
      },
      {
        heading: "4. 공유 및 공개",
        paras: [
          "당사는 귀하의 개인정보를 판매하지 않습니다.",
          "결제 처리: 카드 결제는 당사의 결제 처리사인 Waffo Pancake(PCI-DSS 인증)가 처리하며, 카드 데이터는 당사 서버에 저장되지 않습니다.",
          "법적 요구: 법률, 규정 또는 법적 절차에서 요구하거나 사용자 및 타인의 권리와 안전을 보호하기 위해 정보를 공개할 수 있습니다.",
          "사업 거래: 합병, 인수 또는 기타 사업 거래가 발생하는 경우 사용자 정보가 해당 거래의 일부로 이전될 수 있습니다."
        ]
      },
      {
        heading: "5. 데이터 보안",
        paras: [
          "당사는 로컬 암호화, 격리된 스토리지, 제한된 권한 및 HTTPS/TLS 암호화 전송으로 데이터를 보호하며, 클라우드 계정 데이터에 대한 접근은 엄격히 필요한 범위로만 통제합니다.",
          "개인정보에 영향을 미치는 데이터 침해가 발생한 경우 법에서 요구하는 대로 발견 후 72시간 이내에 영향을 받은 개인과 관련 감독 기관에 통지합니다."
        ]
      },
      {
        heading: "6. 데이터 보관",
        paras: [
          "당사는 본 방침에 설명된 목적에 필요한 기간 동안만 정보를 보관합니다. 구체적인 보관 기간은 다음과 같습니다:"
        ],
        rows: [
          ["데이터 유형", "보관 기간"],
          ["로컬 지갑 데이터", "귀하가 삭제하거나 확장 프로그램을 제거할 때까지(기기에 저장됨)."],
          ["클라우드 계정 데이터", "구독 취소 후 90일, 이후 삭제(요청 시 더 빨리 삭제)."],
          ["결제 기록", "적용 가능한 법률(예: 세금 및 회계 의무) 및 결제 처리사의 보관 정책에 따라 보관."],
          ["고객 지원 및 피드백 데이터", "요청 해결 후 최대 12개월, 법률이 더 긴 기간을 요구하는 경우 제외."],
          ["서버 로그", "보안 또는 법적 목적에 더 필요한 경우를 제외하고 최대 30일."]
        ],
        parasEnd: [
          "삭제는 관련 데이터를 안전하게 삭제하거나 익명화하여 수행됩니다."
        ]
      },
      {
        heading: "7. 귀하의 데이터 권리",
        paras: [
          "적용 가능한 법률(GDPR이 귀하에게 적용되는 경우 포함)에 따라 귀하는 다음 권리를 가집니다:",
          "(1) 데이터 처리 방식에 대한 고지를 받을 권리; (2) 데이터에 대한 접근; (3) 부정확한 데이터의 정정; (4) 삭제 요청; (5) 처리 제한; (6) 데이터 이동권; (7) 처리에 대한 반대; (8) 언제든지 동의 철회. 또한 관할 개인정보보호 기관에 불만을 제기할 권리가 있습니다.",
          "이러한 권리를 행사하려면 support@agentsblockchains.com으로 연락하십시오. 당사는 30일 이내에 응답합니다. 본 서비스는 셀프 커스터디 방식이므로 확장 프로그램을 제거하거나 브라우저 스토리지를 삭제하여 로컬 지갑 데이터를 직접 삭제할 수 있는 경우가 많습니다."
        ]
      },
      {
        heading: "8. 아동의 개인정보 보호",
        paras: [
          "본 서비스는 18세 이상의 사용자만 이용할 수 있습니다. 당사는 13세 미만(또는 현지 법률이 정한 최소 연령) 아동의 개인정보를 고의로 수집하지 않으며, 아동이 유료 기능을 사용하도록 고의로 허용하지 않습니다. 이 연령 미만 아동의 데이터를 수집한 사실을 알게 되면 이를 삭제합니다. 아동이 당사에 정보를 제공했다고 생각되면 support@agentsblockchains.com으로 연락해 주십시오."
        ]
      },
      {
        heading: "9. 쿠키 및 추적",
        paras: [
          "웹사이트는 설정(테마, 언어, 세션 상태)을 유지하기 위해 필수 쿠키 또는 로컬 스토리지를 사용할 수 있습니다. 당사는 광고 또는 교차 사이트 추적 쿠키를 사용하지 않습니다. 확장 프로그램은 분석 또는 마케팅 쿠키를 사용하지 않습니다."
        ]
      },
      {
        heading: "10. 방침 변경",
        paras: [
          "당사는 본 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 중대한 변경 사항에 대해서는 이메일 또는 웹사이트의 공지사항을 통해 최소 15일 전에 알려드립니다. 최신 버전은 항상 본 페이지에 게시되며, 상단의 '최종 수정일'이 가장 최근 변경을 반영합니다."
        ]
      },
      {
        heading: "11. 문의하기",
        paras: [
          "개인정보 관련 질문이나 요청이 있으시면 다음으로 연락해 주십시오:",
          "개인정보 이메일: support@agentsblockchains.com",
          "지원 이메일: support@agentsblockchains.com",
          "운영자: Liu Yun, 개인 운영자. 지원은 일반적으로 이메일로 처리되며, 개인 운영자로서 우편 접수는 불가능할 수 있습니다."
        ]
      }
    ],
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
        <link rel="canonical" href={lang === 'en' ? 'https://walletpro.agentsblockchains.com/privacy' : `https://walletpro.agentsblockchains.com/${lang}/privacy`} />
        <link rel="alternate" hreflang="x-default" href="https://walletpro.agentsblockchains.com/privacy" />
        <link rel="alternate" hreflang="en" href="https://walletpro.agentsblockchains.com/privacy" />
        <link rel="alternate" hreflang="zh-Hant" href="https://walletpro.agentsblockchains.com/zh/privacy" />
        <link rel="alternate" hreflang="ko" href="https://walletpro.agentsblockchains.com/ko/privacy" />
        <meta property="og:title" content={t('privacy_meta_title')} />
        <meta property="og:description" content={t('privacy_meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={lang === 'en' ? 'https://walletpro.agentsblockchains.com/privacy' : `https://walletpro.agentsblockchains.com/${lang}/privacy`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('privacy_meta_title')} />
        <meta name="twitter:description" content={t('privacy_meta_desc')} />
        <meta property="og:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://walletpro.agentsblockchains.com/assets/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://walletpro.agentsblockchains.com/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://walletpro.agentsblockchains.com/privacy" }
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

            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              {content.intro}
            </p>

            {content.sections.map((section, idx) => (
              <section key={idx} style={{ marginBottom: '2rem' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{section.heading}</h2>
                {section.paras?.map((para, i) => (
                  <p key={i} className="mb-4" style={{ color: 'var(--text-muted)' }}>{para}</p>
                ))}
                {section.rows && (
                  <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <tbody>
                        {section.rows.map((row, i) => (
                          <tr key={i}>
                            <td style={{
                              border: '1px solid var(--glass-border)',
                              padding: '0.5rem 0.75rem',
                              verticalAlign: 'top',
                              fontWeight: i === 0 ? 700 : 400,
                              color: 'var(--text-main)',
                              textAlign: 'left',
                              whiteSpace: 'nowrap'
                            }}>{row[0]}</td>
                            <td style={{
                              border: '1px solid var(--glass-border)',
                              padding: '0.5rem 0.75rem',
                              verticalAlign: 'top',
                              color: 'var(--text-muted)',
                              textAlign: 'left'
                            }}>{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.parasEnd?.map((para, i) => (
                  <p key={i} className="mb-4" style={{ color: 'var(--text-muted)' }}>{para}</p>
                ))}
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

export default PrivacyPolicy;