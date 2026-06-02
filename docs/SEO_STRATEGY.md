# IOTA Wallet Pro — SEO 上线后执行清单与策略指南

本指南详细记录了 IOTA Wallet Pro 官方网站目前的 SEO 优化现状，并为您列出了在项目部署上线后，为最大化提升搜索引擎排名和曝光度而需要立即执行的步骤清单。

---

## 📊 技术 SEO 现状（已完成的优化）

我们已经成功解决了单页 React 应用（SPA）在搜索引擎抓取上面临的核心技术限制。目前，以下 SEO 基础设施已在代码库中完整配置并打包生效：

| SEO 优化项 | 状态 | 作用说明 |
|-------------|--------|---------|
| **Vite 静态预渲染 (18 个路由)** | ✅ **已启用** | 在构建时，通过 Headless Chrome (Puppeteer) 为 3 种语言 × 6 个页面渲染出静态的 HTML 文件。即使是不运行 JavaScript 的低级爬虫也能瞬间读取完整的网页内容。 |
| **多语言路由架构 (zh / ko / en)** | ✅ **已启用** | 使用路径前缀（`/zh` 繁中、`/ko` 韩文、`/` 英文）物理分隔不同的语言页面，使 Google 和 Bing 能够针对不同的语言市场进行精确的索引。 |
| **页面级动态 Meta 标签** | ✅ **已启用** | 集成 `react-helmet-async`，为每一个路由页面和语言版本动态生成独立的 `<title>`、`<meta name="description">`、`<html lang="...">` 和唯一的 `<link rel="canonical">` 规范链接。 |
| **Schema.org 结构化数据** | ✅ **已启用** | 首页配置了增强版 `SoftwareApplication`（含 `softwareVersion`、`publisher`）和 `WebSite` 结构化数据，FAQ 页面配置了动态本地化的 `FAQPage` 结构化数据，用于在搜索结果中争取富媒体摘要（Rich Snippets）下拉抽屉的展示。 |
| **搜索引擎所有权验证文件** | ✅ **已启用** | `google19a23e9c486a5037.html` 和 `BingSiteAuth.xml` 已放入静态资源目录，部署后可立即进行搜索引擎所有权一键验证。 |
| **Robots 规则与 Sitemap 地图** | ✅ **已启用** | `robots.txt` 限制了对 API 接口的爬取，`sitemap.xml` 声明了全部 6 个英文路由（`/`、`/faq`、`/support`、`/feedback`、`/privacy`、`/terms`）。已移除不存在的 `/zh`、`/ko` 语言路由，避免 Google Search Console 爬取错误。 |
| **页面级 Twitter Card 标签** | ✅ **已启用** | Support、Feedback、Privacy、Terms 四个次级页面均已补全 `twitter:card`、`twitter:title`、`twitter:description`，确保 X/Twitter 分享时每个页面有独立预览。 |
| **图片 SEO 与 LCP 优化** | ✅ **已启用** | 所有 5 张产品截图已更新为描述性 alt 文案（含 "IOTA Wallet Pro"、功能名称等关键词）；hero 主图加入 `fetchpriority="high"` 提示浏览器优先加载，改善 LCP 指标。 |

---

## 🚀 上线后立即执行清单（Action Items）

在将最新代码部署到服务器或 Cloudflare Pages 后，请按照以下步骤执行，以正式开启站点的收录与排名优化：

### 第一步：在站长工具中验证域名所有权
利用我们已配置的验证文件，在谷歌和必应的站长后台进行绑定：
1. **Google Search Console (GSC)**:
   - 登录 [Google Search Console](https://search.google.com/search-console)。
   - 添加新属性，输入您的网址：`https://iotawallet.8787887.xyz/`。
   - 选择 **HTML 文件验证** 方法。由于 `google19a23e9c486a5037.html` 已经在打包产物的根目录下，Google 会瞬间通过验证。
2. **Bing Webmaster Tools**:
   - 登录 [Bing 站长工具](https://www.bing.com/webmasters)。
   - 添加您的网站网址，选择 **XML 文件验证** 方式。`BingSiteAuth.xml` 将会自动帮助您完成所有权认证。

### 第二步：提交 Sitemap 网站地图
向搜索引擎提交您的 Sitemap，加速全站 6 个路径的收录：
- 在 Google Search Console 中，点击左侧菜单的 **Sitemaps**。
- 若之前已提交过旧版 sitemap，先将其删除，再重新提交：`https://iotawallet.8787887.xyz/sitemap.xml`。
- 同样在 Bing Webmaster Tools 的 **Sitemaps** 栏目提交相同的网址。
- *当前 sitemap 为英文单语言版本，共 6 个 URL，不含已清理的 `/zh`、`/ko` 变体。*

### 第三步：优化 Chrome Web Store 详情页 (ASO)
由于您的产品是 Chrome 浏览器插件，应用商店本身的页面是一个极高权重的域名（High-authority Domain），必须利用它向官网导流：
- **关键字覆盖**：在插件的商店标题和详细描述中，确保包含与官网一致的关键字，如：`IOTA wallet`、`IOTA EVM wallet`、`IOTA L1 Move wallet`、`batch send crypto`、`cross-chain bridge`。
- **高权重外链**：在开发者控制台的 **官方网站 (Official Website)** 栏目中，务必填入官网链接 `https://iotawallet.8787887.xyz`。这将传递极强的链接权重（PageRank）给官网首页。

### 第四步：开展内容行销，抢占长尾搜索词 (Content SEO)
搜索引擎倾向于推荐有深度、且持续更新的专业网站：
1. **增设博客或教程板块 (`/blog` 或 `/tutorials`)**：
   - 围绕用户在网络上搜索的高频问题撰写简单的 markdown 教程。
   - *推荐选题建议：*
     - 《如何在 Move L1 和 EVM 之间跨链桥接 IOTA 代币》
     - 《如何使用 CSV 批量发送 IOTA 代币（一键群发指南）》
     - 《IOTA Wallet Pro 助记词导入与多账户安全管理指南》
2. **持续补充 FAQ 内容**：
   - 收集 Discord、Telegram 社区或 Reddit 中用户的真实提问，整理并添加至 `FAQ.jsx` 中。由于预渲染中配置了 `FAQPage` 结构化标记，这些新增的问答将有机会直接展示在 Google 搜索结果下方的下拉折叠框中，极大提高点击率。

### 第五步：建立外部反向链接 (Off-Page SEO)
获取外部加密行业网站的“信任票”，提升网站的整体信任度（Domain Authority）：
- **提交至生态目录**：将您的钱包项目提交至 **IOTA 官方生态目录**、**DefiLlama** 钱包集成列表以及其他的 Web3 导航目录。
- **行业收录**：在 Coingecko、CoinMarketCap 的钱包支持列表，以及 AlternativeTo 等软件推荐平台提交项目。
- **媒体宣发**：在 Medium、Substack 或 Gitbook 上发布产品更新和安全技术分享，并在文章中合理地留有返回官网（如 `/support` 或 `/faq`）的反向链接。

### 第六步：网页核心指标调优 (Core Web Vitals)
加载速度是 Google 的排名因素之一：
- 随时在 [Google PageSpeed Insights](https://pagespeed.web.dev/) 评估页面性能。
- 确保 `public/assets/` 下的截图（如 `bridge.png`, `batch.png` 等）使用了无损压缩或已转换为更高性能的 WebP 格式，并确保图片标有 `width` 与 `height` 以防止页面布局抖动（CLS）。
- 对关键外部字体资源实施预加载，减少字体加载阻碍渲染的时间。

---

## ⚡ 高级与进阶优化方法 (Advanced Optimizations)

除了基础的 Sitemap、Metadata 和预渲染，您还可以在项目迭代中实施以下高级优化手段，进一步提升搜索引擎表现和用户体验：

### 1. 资源提示优化 (Resource Hints)
在 `index.html` 中预连接到外部关键第三方域名，例如 Google Fonts 或外部 RPC 节点。这能让浏览器提前进行 DNS 解析、TCP 握手和 TLS 协商，加快资源的首次渲染速度（FCP）：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 2. 面包屑结构化数据 (BreadcrumbList Schema)
对于子页面（如隐私政策、常见问题等），建议使用 `BreadcrumbList` 结构化数据。这能让 Google 在搜索结果中将一长串难懂的网址替换为面包屑导航路径（例如：`首頁 > 常見問題`），从而大幅提升搜索点击率：
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://iotawallet.8787887.xyz/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "FAQ",
    "item": "https://iotawallet.8787887.xyz/faq"
  }]
}
```

### 3. Open Graph 本地化声明 (og:locale:alternate)
向社交媒体爬虫（Facebook, Twitter 等）明确指出网页的多语言版本，让其在不同地区的社交网络分享中呈现对应的语言版本：
```html
<!-- 英文首页 -->
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="zh_TW" />
<meta property="og:locale:alternate" content="ko_KR" />
```

### 4. 接入 IndexNow 协议 (秒级收录)
IndexNow 是一项支持 Bing、Yandex 的快速索引协议。它允许网站所有者在内容更新或发布时，主动通知搜索引擎进行抓取，避免等待爬虫周期性轮询：
- 您可以在必应站长管理后台中生成并下载 `IndexNow key`。
- 将 key 对应的 `.txt` 文件放置于 `public/` 目录下。
- 当有路由页面变更时，通过 API 直接向必应提交受影响的 URL 列表。

### 5. 自定义 404 友好路由 (防用户跳出)
高跳出率会负面影响搜索引擎对网站权重的评价。在 React 路由配置中，建议添加通配符 404 路由（指引到自定义 404 友好界面），提供清晰的“返回首页”或“常见问题”按钮，而不是让用户直接面对空白屏幕或浏览器默认的无响应页面。

### 6. 无障碍体验优化 (Accessibility)
谷歌的 Lighthouse 评分直接将无障碍性（Accessibility）作为评估维度。
- 为所有的 SVG 图标（如 `Lucide` 图标）、语言选择下拉框、主题切换下拉框提供清晰的 `aria-label` 属性。
- 确保所有非交互式的 UI 元素配色满足 WCAG AAA 对比度标准。
- 良好的无障碍体验不仅能极大提升蜘蛛爬虫可读性，也能直接反馈到 Google 排名的正向评分中。

