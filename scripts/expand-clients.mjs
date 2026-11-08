import fs from 'fs';

// Build exhaustive monograph content for clients.astro
const clientsAstro = `---
import Layout from "@/layouts/Layout.astro"
import AffDisclaimer from "@/components/airports/AffDisclaimer.astro"

const winClients = [
  {
    name: "Clash Verge Rev",
    core: "Mihomo (Clash Meta) 内核",
    desc: "2026 年度 Windows 首选开源神器。原生支持 TUN 虚拟网卡接管、自适应 Fake-IP 模式与多策略组嵌套分流；彻底告别旧版 Clash for Windows 内存泄漏痛点。",
    github: "https://github.com/clash-verge-rev/clash-verge-rev/releases",
    tag: "Windows 推荐首选",
    features: "TUN 网卡模式 / 多订阅聚合 / 延迟预判 / 规则分流",
  },
  {
    name: "v2rayN",
    core: "Xray / sing-box 双核心",
    desc: "老牌全协议极客装机标配。原生深度支持 VLESS Reality、Trojan、Shadowsocks-2022、Hysteria 2 全系协议，适合节点精细化测试、路由分流自定义与专业开发者。",
    github: "https://github.com/2dust/v2rayN/releases",
    tag: "全协议极客首选",
    features: "VLESS Reality / Hysteria 2 / 真实 Ping 测速 / 路由精细控制",
  },
  {
    name: "FlClash",
    core: "Mihomo 内核",
    desc: "基于 Flutter 框架打造的新生代极简跨平台客户端。内存占用低、界面动画优雅、多端操作逻辑一致，适合厌倦复杂面板的日常办公与轻量用户。",
    github: "https://github.com/chen08209/FlClash/releases",
    tag: "极简轻量美观",
    features: "极简 UI / 极低资源开销 / 一键连接 / 开箱即用",
  },
  {
    name: "Hiddify",
    core: "sing-box 官方核心",
    desc: "支持一键跨平台的现代代理利器。内置全球分流规则与全协议解析引擎，自动测速筛选最优延迟节点，提供最符合现代视窗美学的 Material You 交互。",
    github: "https://github.com/hiddify/hiddify-next/releases",
    tag: "跨平台多端利器",
    features: "全协议支持 / 智能节点优选 / 跨平台通用 / 多语言",
  },
]

const androidClients = [
  {
    name: "v2rayNG",
    core: "Xray 核心",
    desc: "安卓生态普及率最高、稳定性最强的老牌工具。支持扫码极速导入、剪贴板一键拉取；在华为、小米、OPPO、vivo 等国产深度定制系统中后台保活能力极佳。",
    github: "https://github.com/2dust/v2rayNG/releases",
    tag: "安卓装机必备",
    features: "后台持久保活 / 扫码秒导 / 分应用代理 / 极低耗电",
  },
  {
    name: "FlClash for Android",
    core: "Mihomo 内核",
    desc: "安卓端颜值与交互俱佳的现代选择。拥有与桌面端一致的分流策略组抽屉与节点管理界面，滑动流畅，支持按 Wi-Fi 自动启停代理。",
    github: "https://github.com/chen08209/FlClash/releases",
    tag: "高颜值流畅",
    features: "流畅动画 / 策略组直观展开 / 现代 Material 质感",
  },
  {
    name: "Karing",
    core: "sing-box 内核",
    desc: "新手体验极佳的多平台订阅客户端。支持自动兼容解析 Clash、V2Ray、Sing-box 等绝大多数混杂订阅链接，内置广告拦截规则与防 DNS 劫持防护。",
    github: "https://github.com/KaringX/karing/releases",
    tag: "小白无脑神器",
    features: "混合订阅自动解析 / 零配置上手 / 内置防劫持",
  },
]

const iosClients = [
  {
    name: "Shadowrocket (小火箭)",
    price: "美区 App Store 售价约 $2.99 (一次买断终身使用)",
    desc: "iOS 平台绝对的装机无冕之王。操作直观零门槛，支持摄像头直接扫描二维码导入、支持一键测速与分组排序，完美支持家庭共享与场景模式触发。",
    store: "需要非国区（美区/港区/日区）Apple ID 登录 App Store 购买下载",
    tag: "iOS 绝对首选",
    features: "扫码秒导 / 自动化脚本 / 测速排序 / 场景自动化",
  },
  {
    name: "Stash",
    price: "美区 App Store 售价约 $3.99",
    desc: "iOS 端体验最纯正的 Clash 规则代理工具。完美复刻桌面端策略组图标，支持按应用域名分流（On-Demand 按需连接），与 Mac/Windows 规则无缝漫游。",
    store: "非国区 App Store 搜索 Stash",
    tag: "Clash 移动端终极版",
    features: "Clash 配置直接兼容 / 按需自动唤醒 / 策略组图标美化",
  },
  {
    name: "Quantumult X (圈 X)",
    price: "美区 App Store 售价约 $7.99",
    desc: "iOS 老牌极客进阶利器。拥有业界最强悍的 MitM 证书解密重写引擎、JavaScript 本地脚本运行环境与流媒体自动化测速模块，适合深度玩法。",
    store: "非国区 App Store 搜索 Quantumult X",
    tag: "硬核深度定制",
    features: "MitM 数据重写 / JS 自动化扩展 / 多策略分支矩阵",
  },
  {
    name: "Loon",
    price: "美区 App Store 售价约 $5.99",
    desc: "近年来口碑持续走高的轻量全功能代理神器。插件生态极其丰富，节点延迟监控精确，界面清新明了，兼顾了强大性能与简洁易用性。",
    store: "非国区 App Store 搜索 Loon",
    tag: "插件生态新宠",
    features: "一键插件中心 / 策略组智能优选 / 抓包调试工具",
  },
]

const macClients = [
  {
    name: "Clash Verge Rev (macOS 版)",
    core: "Mihomo 核心 (适配 Apple Silicon M 系列芯片与 Intel)",
    desc: "macOS 生态最佳免费开源代理客户端。原生适配 M1/M2/M3/M4 架构，支持增强型 TUN 虚拟网卡模式，一键解决终端命令行 Terminal、Git、Docker、Node.js 无法走代理的痛点。",
    github: "https://github.com/clash-verge-rev/clash-verge-rev/releases",
    tag: "Mac 最佳推荐",
    features: "M系列原生运行 / TUN 终端无缝穿透 / 状态栏轻量常驻",
  },
  {
    name: "Surge for Mac",
    price: "独立授权，开发者旗舰方案",
    desc: "Mac 平台网络开发与抓包调优的工业级天花板。极致的性能优化与内存控制，支持 DNS 本地缓存加速与企业级多网络接口智能路由分配。",
    store: "官方网站授权购买",
    tag: "工业级性能王者",
    features: "网络诊断仪表盘 / 本地 DNS 代理 / 零损耗传输",
  },
]

const routerClients = [
  {
    name: "OpenWrt / iStoreOS (PassWall / SSR-Plus)",
    core: "Xray / sing-box / SmartDNS 聚合",
    desc: "软路由与家用主路由硬件透明翻墙核心。让全家 Apple TV、PS5、Switch 游戏机、智能电视无感出海，内网所有设备无需安装任何额外客户端。",
    tag: "全屋透明网关",
    features: "全家设备无感翻墙 / SmartDNS 国内外双向加速 / 游戏主机低延迟",
  },
  {
    name: "OpenClash",
    core: "Mihomo 内核",
    desc: "基于 OpenWrt 的图形化 Clash 客户端。完整移植桌面端分流策略组与 Dashboard 流量监控大屏，支持路由器内部自动解析分流规则与动态更新。",
    tag: "软路由 Clash 首选",
    features: "大屏流量监控 / 规则集无缝订阅 / 局域网按 IP 独立分流",
  },
]

// FAQ Data for Schema and Page Content
const clientFaq = [
  {
    q: "为什么在客户端开启代理后，微信、淘宝、网易云等国内 App 打开异常缓慢甚至报错？",
    a: "这是因为你误将客户端代理模式切换为了「全局代理（Global）」模式。在全局模式下，你访问国内服务器（如微信北京/上海机房）的所有数据包都会先跨海跑到境外节点（如日本或美国），再绕回国内，导致延迟暴增并触发国内 App 的跨国风控。正确解决方案：在客户端设置中始终选择「规则分流（Rule / Rule-based）」模式，并勾选包含 ChinaDNS 或 GEOIP 国内直连规则，让境内流量直通，境外流量才走代理专线。",
  },
  {
    q: "什么是 TUN 虚拟网卡模式？在什么情况下必须勾选开启 TUN 模式？",
    a: "传统系统代理（System Proxy）仅通过修改 Windows 或 macOS 操作系统的 HTTP/HTTPS 端口代理环境变量生效，对只走纯 UDP 协议的应用（如 Telegram 语音通话、Discord 连麦、原神国际服、Steam/Apex 联机对战）以及终端命令行环境（如 Git clone、curl、Docker pull）完全无效。TUN 模式会在操作系统底层创建一张高优先级的虚拟网络适配器，强制接管系统所有的 TCP 和 UDP 数据包。当你需要加速命令行、联机外服游戏或语音通讯时，必须开启 TUN 模式。",
  },
  {
    q: "为什么在电脑或手机上测试节点全部显示 Timeout 超时，或者 Ping 值全部为负数？",
    a: "节点全线超时的核心原因通常有四个：① 订阅链接过期或流量耗尽：登录机场后台核对账户剩余流量及服务到期日；② 本地系统时间与网络授时误差超过 60 秒：VMess/VLESS 协议高度依赖时间戳加密校验，请在系统设置中点击「立即同步时间」；③ 订阅链接解析被本地电信/联通 DNS 污染：更换本地 DNS 为 223.5.5.5 或 119.29.29.29；④ 机场主入口临时遭遇骨干网检修：在客户端中点击「更新订阅」以拉取最新可用节点。",
  },
  {
    q: "苹果手机 iOS 用户没有美区 Apple ID，如何下载小火箭 Shadowrocket 或 Stash？",
    a: "由于中国大陆区 App Store 的监管政策，网络代理类应用未在中国区上架。iOS 用户通常有三种正规解决方案：① 自行注册一个免绑定外币信用卡的海外（美区/港区）Apple ID，并在正规电商平台或苹果官网购买对应面额的 Apple 礼品卡充值兑换后下载（最安全可靠，独享终身所有权）；② 购买或借用合规机构的带小火箭专属下载账号；③ 若订阅的机场提供专属自研客户端，可直接通过企业签名或 TestFlight 渠道免外区账号一键安装。",
  },
  {
    q: "机场自研专属一键客户端与开源通用客户端（Clash / v2rayN）相比，该如何取舍？",
    a: "机场自研客户端（如光速云专属自研多平台客户端）专为追求极致易用性、零门槛开箱即用的新手设计：登录账号后节点自动同步、智能规则已预置妥当，一键即可安全翻墙，不需关心配置格式与分流内核；而开源客户端（如 Clash Verge Rev、v2rayN）则适合有多机场订阅合并备份、喜欢自定义脚本规则、调优 BBR 拥塞算法的高阶玩家。对于绝大多数日常办公与娱乐用户，优先使用官方自研客户端更省心。",
  },
  {
    q: "如何彻底杜绝 DNS 泄漏？为什么 DNS 泄漏会导致上网行为被运营商识别？",
    a: "DNS 泄漏是指你的上网数据包虽然经过了代理节点加密隧道，但计算机解析域名的 DNS 请求仍然经由本地 ISP（中国电信/联通/移动）的未加密 53 端口发出。运营商通过审查 DNS 请求日志即可知晓你访问了哪些境外站点。彻底解决办法是在客户端中启用「Fake-IP（合成 Fake-IP 地址）」解析模式，或将远端 DNS 设置为 DoH（DNS over HTTPS）加密服务器（如 1.1.1.1 或 8.8.8.8），使所有域名解析完全在境外节点完成。",
  },
  {
    q: "同一个客户端可以同时导入两家不同的机场订阅吗？如何设置故障自动容灾？",
    a: "完全可以。在 Clash Verge Rev 或 v2rayN 中，你可以复制两家不同机场的订阅链接并依次导入。若要实现无缝故障切换，推荐在 Clash 配置中创建一个包含两家机场主力节点的「自动故障转移（Fallback）」或「负载均衡（Load Balance）」策略组，并设置 10 秒健康检查探测间隔。当主力机场（如光速云）偶发网络波动时，流量将在毫秒内自动切换至备用机场节点，实现业务 100% 不中断。",
  },
  {
    q: "为什么在公司局域网或校园网内，客户端无论选择哪个节点都无法连接？",
    a: "企业内网与高校校园网通常部署了企业级行为审计防火墙，封锁了常见的自定义高位代理端口（如 10000-65535）。应对方案：① 优先选择部署在 443 端口的 Trojan 或 VLESS Reality 伪装节点，因为 443 属于标准 HTTPS 端口，企业防火墙通常不会盲目阻断；② 如果系统代理模式受限，尝试开启 TUN 虚拟网卡模式绕过内网策略阻拦；③ 检查是否需要手动关闭内网已存在的全局代理或防病毒防火墙拦截。",
  },
]

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "2026 翻墙机场代理客户端全平台下载与配置教程 (Windows/Mac/iOS/Android/软路由专著级全景指南)",
  description: "2026年度翻墙机场客户端全平台选型与配置保姆级专著。详述Clash Verge Rev、v2rayN、Shadowrocket小火箭、v2rayNG下载配置、TUN模式接管、Fake-IP防DNS泄漏与全自动多活容灾。",
  author: {
    "@type": "Organization",
    name: "机场推荐测评实验室",
    url: "https://jichangtuijian.click",
  },
  publisher: {
    "@type": "Organization",
    name: "机场推荐",
    url: "https://jichangtuijian.click",
  },
  datePublished: "2026-08-10T00:00:00+08:00",
  dateModified: "2026-11-08T15:30:00+08:00",
  mainEntityOfPage: "https://jichangtuijian.click/clients",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: clientFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}
---

<Layout
  title="2026 翻墙代理客户端全平台下载与配置教程 - Windows/Mac/iOS/Android/软路由 (专著级指南) - 机场推荐"
  description="2026最新全平台翻墙机场客户端选型与配置专著指南。涵盖Windows、macOS、iOS小火箭、Android及OpenWrt软路由客户端GitHub下载直达、TUN虚拟网卡配置、DNS防泄漏与多订阅容灾实操。"
  breadcrumbs={[{ label: "客户端下载与配置", icon: "mingcute:download-line" }]}
>
  <script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />

  <div class="clients-page">
    <!-- Header Intro -->
    <header class="page-intro">
      <div class="badge-tag">💻 全平台网络接入工具库 · 专著级实操手册</div>
      <h1 class="page-title">2026 翻墙机场代理客户端全平台下载与配置教程</h1>
      <p class="page-desc">
        工欲善其事，必先利其器。无论你使用 Windows 工作站、MacBook、iPhone/iPad 还是 Android 旗舰手机与 OpenWrt 软路由，一款底层内核稳定、支持智能规则分流与 TUN 全局网卡接管的高性能客户端，是畅享全球互联网与跨境生产力的第一道基石。
      </p>
    </header>

    <AffDisclaimer />

    <!-- Executive Quick Decision Matrix -->
    <section class="clients-section">
      <div class="section-tag">Quick Start & Executive Summary</div>
      <h2>一、直接给结论：各系统 2026 年度首选客户端一览表</h2>
      <p class="lead-text">
        为了让不同操作系统的读者在最快时间内完成装机，本站评测智库综合<strong>内存占用稳定性</strong>、<strong>内核维护活跃度</strong>、<strong>智能规则分流准确率</strong>与<strong>新手交互友好度</strong>，整理出各大平台最佳推荐结论：
      </p>

      <div class="summary-cards-grid">
        <div class="sum-card win-border">
          <div class="sum-badge win-bg">Windows 首选</div>
          <h3>Clash Verge Rev</h3>
          <p class="sum-core">基于全新 Mihomo (Clash Meta) 内核</p>
          <p class="sum-reason">彻底淘汰旧版 CFW 内存泄漏缺陷，内置一键开启 TUN 虚拟网卡接管系统全部流量，界面美观现代。</p>
          <a href="#win-sec" class="sum-jump-btn">查看 Win 版教程 & 下载 &darr;</a>
        </div>

        <div class="sum-card mac-border">
          <div class="sum-badge mac-bg">macOS 首选</div>
          <h3>Clash Verge Rev (Mac)</h3>
          <p class="sum-core">原生支持 Apple Silicon M1/M2/M3/M4</p>
          <p class="sum-reason">完美穿透 Mac 终端命令行（Terminal / Git / Docker），常驻状态栏轻量省电，分流策略组直观。</p>
          <a href="#mac-sec" class="sum-jump-btn">查看 Mac 版教程 & 下载 &darr;</a>
        </div>

        <div class="sum-card ios-border">
          <div class="sum-badge ios-bg">iOS (iPhone/iPad) 首选</div>
          <h3>Shadowrocket (小火箭)</h3>
          <p class="sum-core">美区 App Store 约 $2.99 一次买断</p>
          <p class="sum-reason">十余年老牌口碑神作。扫码即导、延迟批量测速、规则精准分流，支持家庭共享与场景模式触发。</p>
          <a href="#ios-sec" class="sum-jump-btn">查看 iOS 购买与配置 &darr;</a>
        </div>

        <div class="sum-card android-border">
          <div class="sum-badge android-bg">Android 安卓首选</div>
          <h3>v2rayNG / FlClash</h3>
          <p class="sum-core">原生开源、极致省电与强后台保活</p>
          <p class="sum-reason">在小米、华为、OPPO 等国产定制系统下具备优秀的防杀后台能力，支持按 App 独立白名单分流。</p>
          <a href="#android-sec" class="sum-jump-btn">查看安卓教程 & 下载 &darr;</a>
        </div>
      </div>
    </section>

    <!-- Comprehensive Client Technical Comparison Table -->
    <section class="clients-section">
      <div class="section-tag">Engineering Benchmark</div>
      <h2>二、2026 主流代理客户端硬核技术特性全景对比表</h2>
      <p>
        选择客户端切忌随大流盲选。不同客户端在内核机制、内存占用、TUN 网卡模式支持以及特定协议适配上存在显著代差。以下为实验室整理的客观参数比对：
      </p>

      <div class="table-scroll-container">
        <table class="monograph-table">
          <thead>
            <tr>
              <th>客户端名称</th>
              <th>适配平台</th>
              <th>底层内核</th>
              <th>协议支持覆盖</th>
              <th>TUN 网卡接管</th>
              <th>Fake-IP 防泄漏</th>
              <th>开发活跃度</th>
              <th>上手难度</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Clash Verge Rev</strong></td>
              <td>Windows / Mac / Linux</td>
              <td>Mihomo (Meta)</td>
              <td>SS / VMess / VLESS / Trojan / Hy2</td>
              <td>✅ 原生一键注入</td>
              <td>✅ 完美原生集成</td>
              <td>⭐⭐⭐⭐⭐ 极高</td>
              <td>⭐⭐ 极易上手</td>
            </tr>
            <tr>
              <td><strong>v2rayN</strong></td>
              <td>Windows</td>
              <td>Xray / sing-box</td>
              <td>VLESS Reality / Hy2 / SS-2022 全系</td>
              <td>✅ 支持 (需额外配置)</td>
              <td>⚠️ 基础 Fake-IP</td>
              <td>⭐⭐⭐⭐ 高频迭代</td>
              <td>⭐⭐⭐⭐ 极客进阶</td>
            </tr>
            <tr>
              <td><strong>Shadowrocket</strong></td>
              <td>iOS / iPadOS</td>
              <td>自研高性能内核</td>
              <td>全协议覆盖 (含 Hy2 / TUIC)</td>
              <td>✅ 操作系统原生 VPN</td>
              <td>✅ 完善支持</td>
              <td>⭐⭐⭐⭐⭐ 持续维护</td>
              <td>⭐ 傻瓜扫码</td>
            </tr>
            <tr>
              <td><strong>Stash</strong></td>
              <td>iOS / iPadOS / tvOS</td>
              <td>Clash Meta 内核移植</td>
              <td>SS / VMess / VLESS / Trojan</td>
              <td>✅ 操作系统原生 VPN</td>
              <td>✅ 支持</td>
              <td>⭐⭐⭐⭐ 高频更新</td>
              <td>⭐⭐ 逻辑清晰</td>
            </tr>
            <tr>
              <td><strong>v2rayNG</strong></td>
              <td>Android</td>
              <td>Xray 官方内核</td>
              <td>全协议覆盖 (含 VLESS Reality)</td>
              <td>✅ VpnService 原生</td>
              <td>✅ 基础防污染</td>
              <td>⭐⭐⭐⭐ 稳健维护</td>
              <td>⭐ 扫码极速上手</td>
            </tr>
            <tr>
              <td><strong>FlClash</strong></td>
              <td>Win / Mac / Android</td>
              <td>Mihomo 核心</td>
              <td>SS / VLESS / Trojan / Hy2</td>
              <td>✅ 一键支持</td>
              <td>✅ 深度兼容</td>
              <td>⭐⭐⭐⭐ 快速崛起</td>
              <td>⭐ 极简美观</td>
            </tr>
            <tr>
              <td><strong>OpenClash</strong></td>
              <td>OpenWrt 路由器</td>
              <td>Mihomo Core</td>
              <td>主流全协议</td>
              <td>✅ 内核级全透明代理</td>
              <td>✅ 路由器级 Fake-IP</td>
              <td>⭐⭐⭐⭐ 官方活跃</td>
              <td>⭐⭐⭐⭐ 需网络常识</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Table of Contents / Navigation Anchor Bar -->
    <div class="quick-nav-box">
      <div class="nav-box-header">
        <span class="nav-icon">🧭</span>
        <strong>本教程章节导航（点击直达对应平台与实战教程）</strong>
      </div>
      <div class="nav-links-grid">
        <a href="#section-workflow" class="toc-link"><span class="toc-num">01</span> 3分钟通用订阅配置教学 (小白必读)</a>
        <a href="#win-sec" class="toc-link"><span class="toc-num">02</span> Windows 平台客户端大全与保姆级实操</a>
        <a href="#mac-sec" class="toc-link"><span class="toc-num">03</span> macOS 平台客户端大全与终端代理配置</a>
        <a href="#ios-sec" class="toc-link"><span class="toc-num">04</span> iOS 平台客户端（小火箭/Stash）指南</a>
        <a href="#android-sec" class="toc-link"><span class="toc-num">05</span> Android 安卓平台客户端与防杀后台优化</a>
        <a href="#router-sec" class="toc-link"><span class="toc-num">06</span> 软路由与家庭全透明网关配置指引</a>
        <a href="#section-tun" class="toc-link"><span class="toc-num">07</span> 核心进阶：TUN 模式与游戏/终端穿透</a>
        <a href="#section-fakeip" class="toc-link"><span class="toc-num">08</span> 防范 DNS 泄漏与 Fake-IP 最佳实践</a>
        <a href="#section-ha" class="toc-link"><span class="toc-num">09</span> 双机场订阅合并与高可用多活自愈策略</a>
        <a href="#section-faq" class="toc-link"><span class="toc-num">10</span> 深度常见问题与排障锦囊 (8大痛点解答)</a>
        <a href="#section-cluster" class="toc-link"><span class="toc-num">11</span> 站内延伸阅读与核心枢纽连接</a>
      </div>
    </div>

    <!-- Chapter 1: 3-Minute Universal Workflow -->
    <section id="section-workflow" class="clients-section">
      <div class="section-tag">Beginner Fast Track</div>
      <h2>三、3 分钟通用订阅配置教学（新手入门必读黄金路线）</h2>
      <p class="lead-text">
        无论你使用的是哪一款客户端，翻墙的核心链路始终遵循<strong>「注册机场获取订阅链接 &rarr; 导入客户端解析节点 &rarr; 选择分流模式与节点连接」</strong>的三步闭环原则。初学者只要掌握这一套基本逻辑，即可轻松驾驭全网所有客户端：
      </p>

      <div class="tutorial-steps-container">
        <div class="step-flow-box">
          <div class="step-badge">步骤 1</div>
          <div class="step-info">
            <h3>挑选优质机场并复制专属订阅链接</h3>
            <p>
              首先在本站 <a href="/ranking">2026 年度机场排行榜</a> 或 <a href="/brands">42家品牌知识库</a> 中挑选符合你预算与用途的服务商（如本站第一主推的 <a href="/reviews/guangsu">光速云</a>，具备高抗封锁的 IEPL 专线架构与企业级内网双专线）。
            </p>
            <p>
              进入机场管理后台，在「仪表盘 / 快捷导入」板块中找到<strong>「复制订阅链接」</strong>（或「一键导入 Clash / 小火箭」按钮），将长串订阅 URL 复制至设备剪贴板。<strong>严禁泄露订阅链接给公开网络，它包含你的专属鉴权 Token！</strong>
            </p>
          </div>
        </div>

        <div class="step-flow-box">
          <div class="step-badge">步骤 2</div>
          <div class="step-info">
            <h3>将订阅链接导入对应客户端并拉取节点列表</h3>
            <p>
              打开安装好的客户端（以 Windows 端 Clash Verge Rev 为例）：在左侧导航栏点击<strong>「订阅 / Profiles」</strong>，将刚才复制的订阅 URL 粘贴至顶部的输入框中，点击<strong>「导入 / Download」</strong>。
            </p>
            <p>
              客户端将自动发起 HTTPS 握手并下载最新的节点配置列表。成功导入后，在列表中选中该配置作为当前生效配置文件（变蓝或打勾高亮）。
            </p>
          </div>
        </div>

        <div class="step-flow-box">
          <div class="step-badge">步骤 3</div>
          <div class="step-info">
            <h3>选择分流策略组与节点，开启系统代理</h3>
            <p>
              进入客户端<strong>「代理 / Proxies」</strong>页面，顶部模式<strong>务必选择「规则 / Rule」模式</strong>（切勿误选全局模式）；在节点策略组中点击测速图标，挑选延迟低于 50ms 且带绿色圆点的低延迟节点（如香港、日本或新加坡专线）。
            </p>
            <p>
              最后在<strong>「设置 / Settings」</strong>中将<strong>「系统代理（System Proxy）」</strong>开关拨动至开启状态（变绿）。此时打开境外网页（如 Google、YouTube、GitHub），即可畅快秒开出海！
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 2: Windows Clients -->
    <section id="win-sec" class="clients-section">
      <div class="section-tag">Windows Platform</div>
      <div class="plat-header">
        <span class="plat-icon">🪟</span>
        <div>
          <h2>Windows 操作系统客户端推荐与深度操作指南</h2>
          <p>适用于 Windows 11 / Windows 10 (64 位与 ARM64 架构系统)</p>
        </div>
      </div>

      <div class="clients-grid">
        {winClients.map((client) => (
          <div class="client-card">
            <div class="client-top">
              <span class="client-name">{client.name}</span>
              <span class="client-tag">{client.tag}</span>
            </div>
            <div class="client-core">{client.core}</div>
            <p class="client-desc">{client.desc}</p>
            <div class="client-features"><strong>特性：</strong>{client.features}</div>
            <div class="client-btn-row">
              <a href={client.github} target="_blank" rel="noopener noreferrer nofollow" class="download-btn">
                前往 GitHub 官方 Releases 下载
              </a>
            </div>
          </div>
        ))}
      </div>

      <div class="deep-guide-block mt-m">
        <h3>Windows 平台深度优化要点：</h3>
        <ul>
          <li><strong>推荐版本选择：</strong> Windows 用户强烈建议下载 <code>Clash.Verge.Rev_x64-setup.exe</code> 安装版，安装时若弹出 Windows Defender 拦截，点击「更多信息 &rarr; 仍要运行」即可。</li>
          <li><strong>开机自启与静默托盘：</strong> 进入「设置 &rarr; 应用」，勾选「开机自启动（Launch at login）」与「静默启动（Silent start）」，这样每次开电脑即可自动接入跨境网络，无需重复手动打开。</li>
          <li><strong>终极 TUN 虚拟网卡开启：</strong> 进入「设置 &rarr; 内核与网络」，找到「服务模式（Service Mode）」并点击安装，安装完成后勾选开启「TUN 模式」，从此无论是在 CMD、PowerShell 中执行 <code>git clone</code>、下载 npm 依赖，还是玩 Steam 外服联机游戏，统统免配置直接走极速专线代理！</li>
        </ul>
      </div>
    </section>

    <!-- Chapter 3: macOS Clients -->
    <section id="mac-sec" class="clients-section">
      <div class="section-tag">macOS Platform</div>
      <div class="plat-header">
        <span class="plat-icon">🍎</span>
        <div>
          <h2>macOS 苹果电脑客户端推荐与开发环境穿透实操</h2>
          <p>完美适配 Apple Silicon M 系列芯片 (M1/M2/M3/M4) 与 Intel 架构</p>
        </div>
      </div>

      <div class="clients-grid">
        {macClients.map((client) => (
          <div class="client-card">
            <div class="client-top">
              <span class="client-name">{client.name}</span>
              <span class="client-tag">{client.tag}</span>
            </div>
            <div class="client-core">{client.core}</div>
            <p class="client-desc">{client.desc}</p>
            <div class="client-features"><strong>特性：</strong>{client.features}</div>
            <div class="client-btn-row">
              {client.github ? (
                <a href={client.github} target="_blank" rel="noopener noreferrer nofollow" class="download-btn">
                  前往 GitHub 官方 Releases 下载
                </a>
              ) : (
                <span class="client-notice">{client.store}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div class="deep-guide-block mt-m">
        <h3>Mac 终端命令行 Terminal 穿透保姆级秘籍：</h3>
        <p>很多程序员在 Mac 开启代理后，发现网页能打开，但终端执行 <code>git clone</code> 或 <code>brew update</code> 仍然卡死，根本原因在于 Mac 系统代理不会默认注入终端 Shell。解决方案有二：</p>
        <ol>
          <li><strong>方案一：一键开启 TUN 模式（推荐最省心）：</strong> 在 Clash Verge Rev for Mac 设置中安装授权 Helper，勾选「TUN 模式」，整个 macOS 网络层所有 TCP/UDP 流量自动全面接管，终端立刻畅通无阻。</li>
          <li><strong>方案二：在 <code>~/.zshrc</code> 中写入一键代理快捷指令：</strong>
            <pre><code># 写入 ~/.zshrc 配置文件
alias setproxy="export https_proxy=http://127.0.0.1:7897 http_proxy=http://127.0.0.1:7897 all_proxy=socks5://127.0.0.1:7897"
alias unsetproxy="unset https_proxy http_proxy all_proxy"</code></pre>
            每次在终端需要下载海外代码或依赖时，输入 <code>setproxy</code> 即可瞬间提速数十倍！
          </li>
        </ol>
      </div>
    </section>

    <!-- Chapter 4: iOS Clients -->
    <section id="ios-sec" class="clients-section">
      <div class="section-tag">iOS Platform</div>
      <div class="plat-header">
        <span class="plat-icon">📱</span>
        <div>
          <h2>iOS 苹果手机与 iPad 客户端选型与购买下载流程</h2>
          <p>适用于 iPhone / iPad (iOS 15 / 16 / 17 / 18 系统)</p>
        </div>
      </div>

      <div class="clients-grid">
        {iosClients.map((client) => (
          <div class="client-card">
            <div class="client-top">
              <span class="client-name">{client.name}</span>
              <span class="client-tag">{client.tag}</span>
            </div>
            <div class="client-core text-yellow">{client.price}</div>
            <p class="client-desc">{client.desc}</p>
            <div class="client-features"><strong>特性：</strong>{client.features}</div>
            <div class="client-btn-row">
              <span class="client-notice">{client.store}</span>
            </div>
          </div>
        ))}
      </div>

      <div class="deep-guide-block mt-m">
        <h3>小火箭 Shadowrocket 超全实战技巧与防坑要诀：</h3>
        <ul>
          <li><strong>非国区 Apple ID 登录原则：</strong> 严禁在手机「系统设置（iCloud）」中直接登录他人共享的海外 Apple ID，以免手机被远程锁定！<strong>唯一安全做法：</strong> 只在「App Store 应用商店」内部点击右上角头像，退出当前账号并登录海外 Apple ID 下载，下载完成后立即切回你自己的国区 ID，应用依然终身可正常更新使用。</li>
          <li><strong>全局路由模式切勿选错：</strong> 小火箭主界面底部的全局路由有「配置、代理、直连、场景」，日常使用<strong>必须保持在「配置（Config）」模式</strong>；如果选成了「代理」，就会导致境内微信等 App 卡顿变慢！</li>
          <li><strong>节点连通性测试注意细节：</strong> 点击小火箭内的「连通性测试」，测出的数值代表与海外节点的 TCP 握手响应延迟。建议日常优先勾选延迟在 50ms 左右的香港或日本 IEPL 专线节点。</li>
        </ul>
      </div>
    </section>

    <!-- Chapter 5: Android Clients -->
    <section id="android-sec" class="clients-section">
      <div class="section-tag">Android Platform</div>
      <div class="plat-header">
        <span class="plat-icon">🤖</span>
        <div>
          <h2>Android 安卓手机客户端与防杀后台配置要点</h2>
          <p>适用于小米 MIUI/澎湃OS、华为鸿蒙 HarmonyOS、OPPO ColorOS、vivo OriginOS 及原生安卓</p>
        </div>
      </div>

      <div class="clients-grid">
        {androidClients.map((client) => (
          <div class="client-card">
            <div class="client-top">
              <span class="client-name">{client.name}</span>
              <span class="client-tag">{client.tag}</span>
            </div>
            <div class="client-core">{client.core}</div>
            <p class="client-desc">{client.desc}</p>
            <div class="client-features"><strong>特性：</strong>{client.features}</div>
            <div class="client-btn-row">
              <a href={client.github} target="_blank" rel="noopener noreferrer nofollow" class="download-btn">
                前往 GitHub 官方 Releases 下载 APK
              </a>
            </div>
          </div>
        ))}
      </div>

      <div class="deep-guide-block mt-m">
        <h3>国产安卓手机避免翻墙频繁断开的“三锁”设置：</h3>
        <p>很多安卓用户抱怨“出门用一会儿梯子就自动断开”，这是因为国产深度定制系统为了省电会暴力杀死后台代理进程。请务必完成以下三项设置：</p>
        <ol>
          <li><strong>后台任务加锁：</strong> 在多任务后台卡片界面，长按或向下拉动 v2rayNG / FlClash 卡片，点击“锁定”小锁图标，防止一键清理时被误杀。</li>
          <li><strong>电池优化设为无限制：</strong> 进入手机系统「设置 &rarr; 应用管理 &rarr; 对应客户端 &rarr; 省电策略 / 电池优化」，由默认的「智能限制」修改为<strong>「无限制 / 允许后台高耗电」</strong>。</li>
          <li><strong>允许自启动与关联启动：</strong> 开启「允许应用自启动」与「允许其他应用唤醒」，确保锁屏期间后台网络隧道持续畅通不掉线。</li>
        </ol>
      </div>
    </section>

    <!-- Chapter 6: Soft Router Platform -->
    <section id="router-sec" class="clients-section">
      <div class="section-tag">Router & Gateway</div>
      <div class="plat-header">
        <span class="plat-icon">🌐</span>
        <div>
          <h2>OpenWrt 软路由与家庭全透明网关配置指引</h2>
          <p>让 Apple TV、PS5、Switch、Xbox 及全屋智能家居无感出海的终极架构</p>
        </div>
      </div>

      <div class="clients-grid">
        {routerClients.map((client) => (
          <div class="client-card">
            <div class="client-top">
              <span class="client-name">{client.name}</span>
              <span class="client-tag">{client.tag}</span>
            </div>
            <div class="client-core">{client.core}</div>
            <p class="client-desc">{client.desc}</p>
            <div class="client-features"><strong>特性：</strong>{client.features}</div>
            <div class="client-btn-row">
              <span class="client-notice">适用于 iStoreOS / OpenWrt 固件插件中心直接安装</span>
            </div>
          </div>
        ))}
      </div>

      <div class="deep-guide-block mt-m">
        <h3>旁路由（透明网关）网络拓扑实操方案：</h3>
        <p>如果你不想变动家里现有的主路由器，配置一台安装了 iStoreOS / OpenWrt 的小主机（如 N100 / J4125）作为<strong>旁路由</strong>是最高性价比的选择：</p>
        <ul>
          <li><strong>IP 与网关设置：</strong> 假设主路由 IP 为 <code>192.168.1.1</code>，将旁路由 LAN 口 IP 设置为 <code>192.168.1.2</code>，旁路由的网关和 DNS 均指向主路由 <code>192.168.1.1</code>。</li>
          <li><strong>特定设备无感翻墙：</strong> 只需在需要出海的设备（如电视机 Apple TV 或 PS5 游戏机）上，将网络连接的「网关」与「DNS」手动修改为旁路由 IP <code>192.168.1.2</code>，国内流量直通，境外 4K 流媒体与联机游戏自动走旁路由专线加速，完全不影响全家其他普通设备！</li>
        </ul>
      </div>
    </section>

    <!-- Chapter 7: Deep Dive on TUN Mode -->
    <section id="section-tun" class="clients-section">
      <div class="section-tag">Deep Engineering</div>
      <h2>七、核心技术原理深度剖析：TUN 虚拟网卡接管 vs 普通系统代理</h2>
      <p class="lead-text">
        对于很多初涉网络代理的用户而言，经常会困惑“为什么我开启了系统代理，网页可以翻墙，但是联机游戏或者 CMD 终端却仍然报错？” 这背后的核心差异就在于网络模型的层次。
      </p>

      <div class="table-scroll-container">
        <table class="monograph-table">
          <thead>
            <tr>
              <th>对比维度</th>
              <th>普通系统代理 (System Proxy)</th>
              <th>TUN 虚拟网卡模式 (TUN Mode)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>工作网络层级</strong></td>
              <td>应用层（Application Layer - 仅写入 OS 端口环境）</td>
              <td>网络层 / 数据链路层（Layer 3/2 核心虚拟适配器）</td>
            </tr>
            <tr>
              <td><strong>协议支持广度</strong></td>
              <td>仅支持遵循系统环境变量的标准 HTTP / HTTPS 流量</td>
              <td>接管所有底层数据包：TCP、UDP、ICMP (Ping) 全覆盖</td>
            </tr>
            <tr>
              <td><strong>终端穿透支持</strong></td>
              <td>❌ 对原生 Git、Docker、Python requests 等无效</td>
              <td>✅ 完美自动穿透，无需任何环境变量配置</td>
            </tr>
            <tr>
              <td><strong>外服联机游戏</strong></td>
              <td>❌ 无法加速只走 UDP 报文的网游与连麦软件</td>
              <td>✅ 原生全包加速，支持 Discord、Telegram、Steam</td>
            </tr>
            <tr>
              <td><strong>系统资源消耗</strong></td>
              <td>极低，近乎零额外 CPU 开销</td>
              <td>略高（因需要内核进行数据包拆包重封），现代化电脑无感</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="deep-guide-block mt-m">
        <p><strong>技术落地结论：</strong> 如果你的出海需求仅局限于日常网页浏览、看 YouTube 视频，普通系统代理完全足够；但如果你涉及<strong>跨国视频会议（Zoom/Teams）</strong>、<strong>外服竞技游戏联机</strong>、<strong>程序员海外依赖抓取</strong>或<strong>终端命令行操作</strong>，请毫不犹豫地在客户端中永久勾选开启「TUN 模式」。</p>
      </div>
    </section>

    <!-- Chapter 8: DNS Leak and Fake-IP -->
    <section id="section-fakeip" class="clients-section">
      <div class="section-tag">Privacy & DNS Security</div>
      <h2>八、杜绝隐秘链路追踪：DNS 泄漏原理与 Fake-IP 最佳防御设置</h2>
      <p class="lead-text">
        你或许以为连上翻墙节点后上网就神不知鬼不觉了，但实际上，许多劣质客户端由于错误的 DNS 路由机制，会将你访问的每一个敏感境外域名实时汇报给本地三大运营商的 DNS 服务器！
      </p>

      <div class="timeline-container">
        <div class="timeline-step">
          <div class="step-marker">危机还原</div>
          <div class="step-content">
            <h4>什么是 Redir-Host 模式与致命的 DNS 泄漏？</h4>
            <p>在旧版客户端采用的 <code>redir-host</code> 模式下，设备访问 <code>google.com</code> 时，客户端先在本地向电信/联通 DNS 发起查询以获取真实 IP。本地运营商不仅能完整记录你访问的全部域名，还会返回被污染的死 IP，导致节点握手失败。</p>
          </div>
        </div>
        <div class="timeline-step">
          <div class="step-marker">救赎方案</div>
          <div class="step-content">
            <h4>为什么 Fake-IP 模式是现代翻墙的革命性终极解？</h4>
            <p>Fake-IP 模式下，当系统请求域名解析时，客户端内部 DNS 立即拦截并秒级伪造一个虚拟局域网保留 IP（如 <code>198.18.0.23</code>）返回给本地程序，浏览器立刻带着 Fake-IP 发起 TCP 握手。客户端截获握手包后，将真实域名封装在加密代理隧道内直接发送给境外落地节点解析！<strong>本地运营商全程只能看到你和机场中转入口之间的加密数据流，域名信息 100% 物理隔离不泄漏！</strong></p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 9: Dual Airport High Availability Strategy -->
    <section id="section-ha" class="clients-section">
      <div class="section-tag">High Availability Architecture</div>
      <h2>九、双机场多活容灾配置：打造“永不断联”的跨境业务自愈矩阵</h2>
      <p class="lead-text">
        对于从事跨境电商运营、海外独立站维护、外贸洽谈及核心研发的专业团队而言，单点断网意味着严重的经济损失与客户信任危机。利用客户端的聚合能力搭建双机场容灾体系是资深工程师的标准动作：
      </p>

      <div class="summary-cards-grid">
        <div class="sum-card green-border">
          <div class="sum-badge green-bg">主力核心节点池 (95% 流量)</div>
          <h3>企业级 IEPL 物理专线机场</h3>
          <p class="sum-core">以本站综合第一主推的 <a href="/reviews/guangsu">光速云</a> 为主力</p>
          <p class="sum-reason">承担日常全部生产力输出：晚高峰 0 丢包、原生住宅 IP 保障 ChatGPT/Claude 对话永不触发风控降级、4K 视频秒开缓冲。</p>
        </div>

        <div class="sum-card blue-border">
          <div class="sum-badge blue-bg">灾备自愈节点池 (5% 兜底)</div>
          <h3>按量付费 / 不限时低门槛备用梯子</h3>
          <p class="sum-core">搭配 <a href="/reviews/xingdaomeng">星岛梦</a> 或 <a href="/reviews/dalaoyun">大佬云</a></p>
          <p class="sum-reason">不买大额包月套餐，只充值小额永久不过期流量。作为备用策略组安静躺在客户端内，一旦主力遇到极端海缆物理施工故障，客户端无缝自动接管。</p>
        </div>
      </div>
    </section>

    <!-- Chapter 10: Deep FAQ -->
    <section id="section-faq" class="clients-section">
      <div class="section-tag">Troubleshooting & FAQ</div>
      <h2>十、客户端高频疑难与排障锦囊（8 大常见痛点专著级解答）</h2>
      <p>
        以下整理了本站测评实验室近万次实测中，用户遇到最频繁的排障与边界疑问，先给明确结论，再提供实操步骤：
      </p>

      <div class="faq-list">
        {clientFaq.map((item, idx) => (
          <details class="faq-card" open={idx === 0}>
            <summary class="faq-q">
              <span>{item.q}</span>
              <span class="faq-arrow">&darr;</span>
            </summary>
            <div class="faq-a">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>

    <!-- Chapter 11: Topic Cluster & Next Steps -->
    <section id="section-cluster" class="clients-section">
      <div class="section-tag">Next Steps & Topic Cluster</div>
      <h2>十一、站内延伸阅读与核心枢纽连接</h2>
      <p>
        配置好优秀的客户端只是出海的第一步，要获得真正稳定、抗封锁、低延迟的网络体验，还需要配合高质量的专线节点资源。建议你继续研读以下站内核心专题：
      </p>

      <div class="internal-cluster-grid">
        <a href="/ranking" class="cluster-card">
          <span class="c-badge">年度权威榜单</span>
          <h4>🏆 2026 翻墙机场天梯排行榜</h4>
          <p>基于电信/联通/移动晚高峰真实压测，精选前十位主力服务商，避开劣质超售陷阱。</p>
        </a>
        <a href="/brands" class="cluster-card">
          <span class="c-badge">42家知识库</span>
          <h4>📚 42 家机场品牌多维知识库</h4>
          <p>支持按专线架构、VLESS/Hysteria2 协议、流媒体解锁及价格梯度即时筛选。</p>
        </a>
        <a href="/knowledge" class="cluster-card">
          <span class="c-badge">万字技术专著</span>
          <h4>📖 翻墙专线原理与节点协议权威科普</h4>
          <p>深度图解 IEPL 专线、BGP 中转区别，剖析 GFW 探测对抗与 BBR 拥塞控制原理。</p>
        </a>
        <a href="/reviews/guangsu" class="cluster-card">
          <span class="c-badge">第一主推旗舰</span>
          <h4>⚡ 光速云深度测评报告</h4>
          <p>实测晚高峰 0 丢包率、企业双专线架构与 ChatGPT/Netflix 原生 IP 解锁证据链。</p>
        </a>
      </div>
    </section>
  </div>
</Layout>

<style>
  .clients-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    width: 100%;
    margin-inline: auto;
    box-sizing: border-box;
  }

  .page-intro {
    text-align: center;
    width: 100%;
    margin-inline: auto;
  }

  .badge-tag {
    display: inline-block;
    padding: 4px 14px;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    border-radius: var(--radius-full);
    font-size: var(--step--1);
    font-weight: 600;
    margin-bottom: var(--space-xs);
  }

  .page-title {
    font-size: var(--step-2);
    font-weight: 800;
    margin: 0 0 10px;
    line-height: 1.25;
  }

  .page-desc {
    color: var(--muted-foreground);
    font-size: var(--step-0);
    line-height: 1.6;
    margin: 0;
  }

  .clients-section {
    background: color-mix(in oklab, var(--muted) 15%, var(--background));
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    scroll-margin-top: 84px;
    box-sizing: border-box;
  }

  .clients-section:target {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--accent) 30%, transparent);
  }

  .section-tag {
    align-self: flex-start;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 2px 8px;
    background: color-mix(in oklab, var(--accent) 20%, transparent);
    color: var(--accent);
    border-radius: 4px;
  }

  .clients-section h2 {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 800;
    line-height: 1.35;
    border-left: 4px solid var(--accent);
    padding-left: 10px;
  }

  .clients-section p, .lead-text {
    margin: 0;
    font-size: var(--step-0);
    line-height: 1.75;
    color: var(--foreground);
  }

  /* Summary cards */
  .summary-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-s);
    margin-top: var(--space-xs);
  }

  .sum-card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .win-border { border-color: color-mix(in oklab, #0284c7 40%, var(--border)); }
  .mac-border { border-color: color-mix(in oklab, #a855f7 40%, var(--border)); }
  .ios-border { border-color: color-mix(in oklab, #ff5f56 40%, var(--border)); }
  .android-border { border-color: color-mix(in oklab, #00e676 40%, var(--border)); }
  .green-border { border-color: color-mix(in oklab, #00e676 50%, var(--border)); }
  .blue-border { border-color: color-mix(in oklab, #0284c7 50%, var(--border)); }

  .sum-badge {
    align-self: flex-start;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .win-bg { background: #0284c7; color: #fff; }
  .mac-bg { background: #a855f7; color: #fff; }
  .ios-bg { background: #ff5f56; color: #fff; }
  .android-bg { background: #00e676; color: #000; }
  .green-bg { background: #00e676; color: #000; }
  .blue-bg { background: #0284c7; color: #fff; }

  .sum-card h3 {
    margin: 0;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .sum-core {
    font-size: var(--step--1);
    color: var(--accent);
    font-weight: 600;
    margin: 0;
  }
  .sum-reason {
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.6;
    margin: 0;
    flex-grow: 1;
  }
  .sum-jump-btn {
    align-self: flex-start;
    font-size: var(--step--1);
    font-weight: 700;
    color: var(--accent);
    text-decoration: none;
    margin-top: 4px;
  }
  .sum-jump-btn:hover {
    text-decoration: underline;
  }

  /* Table styling */
  .table-scroll-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    margin-block: var(--space-xs);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }

  .monograph-table {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    font-size: var(--step--1);
    background: var(--background);
  }

  .monograph-table th, .monograph-table td {
    padding: 12px 16px;
    border: 1px solid var(--border);
    text-align: left;
    vertical-align: middle;
  }

  .monograph-table th {
    background: color-mix(in oklab, var(--muted) 50%, var(--background));
    font-weight: 700;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }

  .highlight-row {
    background: color-mix(in oklab, var(--accent) 10%, var(--background));
    font-weight: 600;
  }

  /* TOC Quick Nav */
  .quick-nav-box {
    background: color-mix(in oklab, var(--muted) 25%, var(--background));
    border: 1px solid color-mix(in oklab, var(--accent) 30%, var(--border));
    border-radius: var(--radius-xl);
    padding: var(--space-s) var(--space-m);
    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
  }

  .nav-box-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--step-0);
    margin-bottom: var(--space-s);
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }
  .nav-icon {
    font-size: 1.3rem;
  }

  .nav-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 10px;
  }

  .toc-link {
    font-size: var(--step--1);
    color: var(--foreground);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: var(--radius-md);
    background: var(--background);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all var(--motion-duration-fast) var(--motion-ease);
  }
  .toc-num {
    font-size: 0.72rem;
    font-weight: 800;
    padding: 2px 6px;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    border-radius: 4px;
    line-height: 1;
    letter-spacing: 0.05em;
  }
  .toc-link:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
  }

  /* Tutorial steps */
  .tutorial-steps-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    margin-top: var(--space-xs);
  }

  .step-flow-box {
    display: flex;
    gap: var(--space-s);
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
  }

  .step-badge {
    flex-shrink: 0;
    padding: 6px 12px;
    height: fit-content;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    font-weight: 800;
    font-size: var(--step-0);
    border-radius: var(--radius-md);
  }

  .step-info h3 {
    margin: 0 0 6px;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .step-info p {
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.6;
    margin: 4px 0;
  }
  .step-info a {
    color: var(--accent);
    font-weight: 700;
  }

  /* Platform block */
  .plat-header {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  .plat-icon {
    font-size: 2.2rem;
  }
  .plat-header h2 {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 700;
    border-left: none;
    padding-left: 0;
  }
  .plat-header p {
    margin: 2px 0 0;
    font-size: var(--step--2);
    color: var(--muted-foreground);
  }

  .clients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-s);
  }

  .client-card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .client-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .client-name {
    font-size: var(--step-0);
    font-weight: 700;
  }

  .client-tag {
    font-size: 0.7rem;
    padding: 2px 8px;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    border-radius: var(--radius-full);
    font-weight: 600;
  }

  .client-core {
    font-size: var(--step--2);
    color: #0284c7;
    font-family: monospace;
    font-weight: 600;
  }
  .text-yellow {
    color: #ffab00;
  }

  .client-desc {
    margin: 0;
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.5;
    flex-grow: 1;
  }

  .client-features {
    font-size: var(--step--2);
    color: var(--foreground);
    background: color-mix(in oklab, var(--muted) 20%, var(--background));
    padding: 4px 8px;
    border-radius: var(--radius-sm);
  }

  .client-btn-row {
    margin-top: 4px;
  }

  .download-btn {
    display: block;
    text-align: center;
    background: color-mix(in oklab, var(--muted) 30%, var(--background));
    border: 1px solid var(--border);
    padding: 8px 12px;
    border-radius: var(--radius-md);
    color: var(--foreground);
    text-decoration: none;
    font-size: var(--step--1);
    font-weight: 600;
    transition: all var(--motion-duration-fast) var(--motion-ease);
  }
  .download-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: color-mix(in oklab, var(--accent) 10%, var(--background));
  }

  .client-notice {
    font-size: var(--step--2);
    color: var(--muted-foreground);
    background: var(--background);
    padding: 6px 10px;
    border-radius: var(--radius-sm);
    border: 1px dashed var(--border);
    display: block;
  }

  .deep-guide-block {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s) var(--space-m);
  }
  .deep-guide-block h3 {
    margin: 0 0 6px;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .deep-guide-block ul, .deep-guide-block ol {
    margin: 0;
    padding-left: 20px;
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.7;
  }
  .deep-guide-block li {
    margin-bottom: 6px;
  }
  .deep-guide-block code, pre code {
    background: color-mix(in oklab, var(--muted) 40%, var(--background));
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    color: var(--foreground);
  }
  pre {
    background: color-mix(in oklab, var(--muted) 30%, var(--background));
    padding: 10px;
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: 8px 0;
  }

  /* Timeline */
  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    margin-block: var(--space-xs);
  }

  .timeline-step {
    display: flex;
    gap: var(--space-s);
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
  }

  .step-marker {
    flex-shrink: 0;
    padding: 4px 10px;
    height: fit-content;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    font-weight: 800;
    font-size: var(--step--1);
    border-radius: var(--radius-md);
  }

  .step-content h4 {
    margin: 0 0 4px;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .step-content p {
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.6;
    margin: 2px 0;
  }

  /* FAQ */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-block: var(--space-xs);
  }

  .faq-card {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--background);
  }

  .faq-q {
    padding: 14px 16px;
    font-weight: 700;
    font-size: var(--step-0);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
  }

  .faq-a {
    padding: 0 16px 14px;
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.7;
    border-top: 1px solid color-mix(in oklab, var(--border) 40%, transparent);
  }
  .faq-a p {
    margin: 8px 0 0;
  }

  /* Internal links */
  .internal-cluster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-s);
    margin-block: var(--space-xs);
  }

  .cluster-card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
    text-decoration: none;
    color: inherit;
    transition: all var(--motion-duration-fast) var(--motion-ease);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .cluster-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
  .c-badge {
    align-self: flex-start;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 8px;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    border-radius: 4px;
  }
  .cluster-card h4 {
    margin: 0;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .cluster-card p {
    margin: 0;
    font-size: var(--step--2);
    color: var(--muted-foreground);
    line-height: 1.5;
  }

  .mt-m {
    margin-top: var(--space-m);
  }

  @media (max-width: 768px) {
    .step-flow-box, .timeline-step {
      flex-direction: column;
      gap: 6px;
    }
  }
</style>
`;

fs.writeFileSync('myscholar/src/pages/clients.astro', clientsAstro, 'utf8');
console.log('Successfully written comprehensive clients.astro!');
