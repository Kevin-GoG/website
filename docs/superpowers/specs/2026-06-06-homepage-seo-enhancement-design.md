# Homepage SEO Enhancement Design

**Date:** 2026-06-06  
**Scope:** IOTA Wallet Pro website homepage + shared head/structured-data SEO refinement

## Goal

在不大幅改变现有首页结构的前提下，完成一轮“高价值、低风险”的 SEO 增强：

1. 在首页新增 **1 个 About IOTA Wallet Pro 内容区块**，提升品牌词与长尾关键词覆盖。
2. 对首页及共享 SEO 元信息做一轮精修，确保 title / description / canonical / structured data 的表达一致、清晰、无重复。
3. 保持现有视觉风格与路由结构不变，不引入博客、多语言重构、或大范围内容改版。

---

## Non-Goals

本次设计**不包含**以下内容：

- 不新增第二个首页区块
- 不新增博客、教程系统或 CMS
- 不扩展 `/zh`、`/ko` 多语言路由
- 不重构现有页面布局体系
- 不新增新的页面路由
- 不接入第三方 SEO 服务

---

## Current State Summary

当前项目已经完成了一轮基础 SEO 建设：

- 各主要页面已使用 `react-helmet-async` 注入页面级 title / description / canonical / og / twitter 标签
- 首页已有 `SoftwareApplication` 与 `WebSite` 结构化数据
- FAQ 页面已有 `FAQPage` 结构化数据
- `robots.txt` 与 `sitemap.xml` 已存在
- 已修复 prerender 与 Helmet 重复 title 问题
- 首页已有较强的产品展示内容（Hero / Features / Showcase / Batch demo）

当前仍然存在的“可继续优化点”主要是：

1. 首页缺少一个**明确解释产品是什么**的文字区块，搜索引擎只能从 Hero/Feature 卡片中零散理解产品。
2. 首页结构化数据还可以继续增强，加入 `Organization`，让站点品牌主体更明确。
3. 首页关键词覆盖偏功能展示，缺少一段更适合被索引的自然语言产品说明。

---

## Chosen Approach

采用 **“一个高价值内容区块 + 小范围技术 SEO 精修”** 的方案：

- 内容层面：新增一个 **About IOTA Wallet Pro** 区块
- 技术层面：补充 `Organization` schema，并检查首页 head 中各标签的一致性

选择这个方案的原因：

- 相比只做 head 微调，它能更明显提升首页可索引内容密度
- 相比新增 FAQ 区块，它与现有 FAQ 页面内容重复更少
- 相比增加多个区块或重做 landing page，它风险更低、改动更小

---

## User-Facing Design

### 1. 首页新增区块

在首页新增一个内容区块，建议位置：

**Hero → Features → About IOTA Wallet Pro → BatchSendDemo → Showcase**

放在 Features 与 BatchSendDemo 之间的原因：

- Hero 与 Features 已经解释“卖点”，此时插入 About 区块最自然
- 在用户进入更深的功能展示前，先用一段清晰文本定义产品，有利于搜索引擎理解页面主题
- 不会破坏现有 Batch demo 与 Showcase 的展示节奏

### 2. 区块内容结构

该区块保持简洁，包含：

- 一个 `h2` 标题：`About IOTA Wallet Pro`
- 两段正文

正文目标：

- 明确说明它是 **IOTA Chrome extension wallet**
- 说明支持 **IOTA L1** 与 **IOTA EVM**
- 说明它是 **self-custodial**
- 点出 **local encryption**、**batch sending**、**bridge**、**multi-account management** 等能力

### 3. 内容风格要求

文案风格应遵循：

- 不堆关键词
- 不使用空泛营销语
- 不做无法验证的安全承诺
- 语言简洁、专业、可索引

建议正文方向（实现时可微调措辞，但核心含义必须保留）：

> IOTA Wallet Pro is a self-custodial Chrome extension wallet built for the IOTA ecosystem. It helps users manage both IOTA L1 and IOTA EVM accounts from one interface, with local key encryption and no hosted wallet account system.

> The wallet is designed for users who need more than basic transfers. It supports cross-chain bridge flows, batch sending, address book management, and multiple accounts, making it suitable for both everyday usage and advanced IOTA workflows.

---

## Technical SEO Design

### 1. Homepage Helmet consistency review

实现时需要检查首页 `Helmet` 中是否满足以下要求：

- 只有一套页面级 title / description / canonical / og / twitter 标签
- title、description 与新增 About 区块内容语义一致
- canonical 继续指向首页 canonical URL
- 不引入与现有配置重复冲突的新标签

本次不要求重写现有 meta 文案，除非检查后发现明显不一致或表达失衡。默认策略是：**优先复用现有 metadata，只在确有必要时做轻微文案修正。**

### 2. Structured data enhancement

首页在现有 `SoftwareApplication` 与 `WebSite` 基础上，再增加一个 `Organization` schema。

目的：

- 让搜索引擎更明确地识别站点主体
- 与 `SoftwareApplication.publisher` 语义形成补充

`Organization` 设计应包含：

- `@context`
- `@type: Organization`
- `name: IOTA Wallet Pro`
- `url: https://iotawallet.8787887.xyz`

如果当前代码库中没有稳定、明确、官方的社交链接或商店链接，则**本次不加 `sameAs`**，避免写入未来可能变化的信息。

### 3. No new page-level SEO surface area

本次不对 Support / Feedback / FAQ / Privacy / Terms 新增新的 schema 类型，也不修改 sitemap/robots。因为这些内容在现阶段已经足够，继续改它们的收益低于首页内容增强。

---

## File-Level Design

### `src/App.jsx`

预计是本次唯一需要修改的核心文件。

需要完成两类变更：

1. **新增 About 区块 UI**
   - 插入到首页主内容流中
   - 复用现有页面视觉风格（section、glass-card、已有颜色变量、标题样式）
   - 不额外抽新组件，除非实现过程中发现重复过高；默认保持简单

2. **增强首页结构化数据**
   - 在现有 `Helmet` 中补充 `Organization` JSON-LD script
   - 不打破已有 `SoftwareApplication` 和 `WebSite` 配置

### `docs/SEO_STRATEGY.md`

如果实现完成后项目 SEO 状态发生了实质变化，应更新文档中的“已完成优化”部分：

- 记录首页新增 About 内容区块
- 记录首页新增 `Organization` schema

这属于实现后的文档同步，不属于设计本身的主目标，但建议一并完成。

---

## Visual / UX Constraints

新增区块必须遵守现有设计系统：

- 保持暗色风格
- 复用现有 section 间距与 max-width
- 不引入新的视觉主题
- 不抢 Hero 主区块的视觉权重

推荐样式方向：

- 标题使用现有 `section-title` 或与其接近的层级
- 正文宽度控制在舒适阅读范围
- 可以放在一个低干扰的 `glass-card` 容器内，也可以使用普通 section 布局；实现时以与现有页面风格最一致为准

---

## Accessibility and Semantics

新增区块需要满足：

- 使用语义化 `section`
- 使用单独 `h2`
- 段落使用标准 `<p>` 标签
- 不通过纯样式文本模拟标题

这样既有利于可访问性，也有利于搜索引擎理解页面层级。

---

## Testing / Verification Strategy

实现后需要验证：

1. `npm run build` 成功
2. 首页运行后只有一套 title / meta 标签，不再引入重复 head 元素
3. 首页新增 About 区块正确显示
4. 页面没有明显布局破坏
5. 首页结构化数据脚本存在且无明显重复
6. 如更新了 `SEO_STRATEGY.md`，确认文档内容与代码现状一致

如果能在浏览器中验证，建议额外确认：

- About 区块在首屏以下但不至于过深
- 文案在桌面端与移动端都保持良好可读性

---

## Risks and Mitigations

### 风险 1：新增文案区块过于营销化
**缓解方式：** 使用事实型产品说明，不使用夸张陈述。

### 风险 2：结构化数据重复或与现有 schema 语义冲突
**缓解方式：** 只新增最小 `Organization` schema，不复制已有 `SoftwareApplication` 字段。

### 风险 3：首页变得过长或信息密度失衡
**缓解方式：** 只新增一个区块，控制在 2 段正文内。

---

## Implementation Boundary

该设计应足够聚焦，可直接进入单一 implementation plan，不需要再拆分为多个独立子项目。

---

## Spec Self-Review

检查结果：

- **Placeholder scan:** 无 TBD / TODO / 模糊占位
- **Internal consistency:** 设计目标、文件范围、验证策略一致
- **Scope check:** 范围集中在首页与少量 SEO 配置，适合单次实现
- **Ambiguity check:** 已明确只新增 1 个区块、默认只改 `src/App.jsx`，并说明 `SEO_STRATEGY.md` 为实现后可选同步文档
