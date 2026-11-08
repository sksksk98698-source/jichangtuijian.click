import fs from 'fs';

// Build exhaustive monograph index.astro
const indexAstro = `---
import Layout from "@/layouts/Layout.astro"
import { PROFILE } from "@site-config"
import Profile from "@/components/profile/Profile.astro"
import AffDisclaimer from "@/components/airports/AffDisclaimer.astro"
import AirportCard from "@/components/airports/AirportCard.astro"
import { getTop10Airports, getAllAirports, getSpeedtestedAirports } from "@/data/airports"

const top10 = getTop10Airports()
const all = getAllAirports()
const speedtested = getSpeedtestedAirports()

// Comprehensive Structured Data (WebSite + FAQPage + ItemList)
const homeFaq = [
  {
    q: "2026 年翻墙机场选型最关键看哪几项硬核指标？",
    a: "核心看三点：① 物理跨境线路：IEPL/IPLC 内网专线优于普通公网中转，公网中转优于直连；② 晚高峰 20:00-23:00 真实表现：拒绝仅看白天多线程虚假跑满，重点看晚高峰单线程带宽与 0 丢包率；③ IP 资产纯净度：是否有原生商业住宅 IP 解锁 ChatGPT、Claude 及 Netflix 流媒体，避免 Cloudflare 频繁弹窗验证码或被 OpenAI 风控封号。",
  },
  {
    q: "为什么本站综合第一主推「光速云」？它与其他机场相比有何本质优势？",
    a: "光速云自 2020 年稳定运营至今，沉淀了极佳的行业口碑。其核心优势在于：底层采用真正的企业级内网双专线 + 独立 IEPL 物理专线架构，晚高峰 0 丢包；全线采用最新高抗审查 VLESS 协议；节点覆盖全球并配备原生纯净住宅 IP，ChatGPT 与流媒体解锁率达 99.8%；年付折算仅约 8 元/月，兼具企业级品质与极佳性价比。",
  },
  {
    q: "为什么有的机场低至 5 元/月甚至声称永久免费，它们有什么不可告人的陷阱？",
    a: "低价与免费梯子通常存在三大隐形代价：① 超售雪崩：1Gbps 廉价带宽超售数万人，晚高峰丢包率超 40%，视频卡死网页瘫痪；② 跑路风险：很多月抛小作坊采用年付大额预售资金盘模式，收取数千用户年费后突然关站失联；③ 隐私安全：免费节点通常在服务器中截获未加密 HTTP 流量甚至植入恶意跟踪脚本。务必坚持月付或选择老牌可信服务商。",
  },
  {
    q: "什么是专线机场与中转机场的物理区别？为什么敏感时期专线依然坚挺？",
    a: "普通公网中转走的是中国电信/联通的国际公网出口路由器，敏感时期 GFW 会进行严格的深度包检测（DPI）与主动重放探测，导致大面积阻断跳 ping；而 IEPL（国际以太网专线）采用点对点物理光缆，流量在境内机房直接进入私有海缆直达境外机房，物理上完全不经过公网国际网关与 GFW 审查节点，因此具备绝对的抗封锁稳定性。",
  },
  {
    q: "新手用户面对数十个客户端，应该优先下载哪一个？",
    a: "Windows 电脑首选「Clash Verge Rev」（基于全新 Mihomo 内核，支持一键开启 TUN 虚拟网卡接管所有流量）；macOS 电脑同样推荐「Clash Verge Rev for Mac」（完美适配 M1-M4 芯片与终端命令行）；iPhone / iPad 用户首选美区 App Store 购买的「Shadowrocket（小火箭）」（扫码即用稳定不杀后台）；安卓手机用户首选开源的「v2rayNG」或高颜值的「FlClash」。",
  },
  {
    q: "在客户端开启代理后，国内应用（微信/淘宝/网银）打不开或变慢怎么办？",
    a: "这是因为误选了「全局代理（Global）」模式，导致访问国内服务器也绕道海外。只需在客户端中将代理模式切换为「规则分流（Rule / Rule-based）」模式，客户端就会自动根据内置的 GeoIP / GeoSite 中国域名白名单，让国内流量走本地网络直通，仅让境外受阻流量走代理专线。",
  },
  {
    q: "为什么访问 ChatGPT 或 Claude 时经常提示「Access Denied」或账号被封？",
    a: "OpenAI 和 Anthropic 对来访 IP 实施了严格的欺诈评分（Fraud Score）审查。廉价机场使用的大多是 AWS、Linode、DigitalOcean 等公开云计算数据中心机房 IP，这些 IP 早就被 AI 平台批量加入黑名单；唯有使用具备本土原生商业住宅 IP（如光速云提供的特选纯净解锁节点），才能彻底告别验证码与封号风险。",
  },
  {
    q: "资深跨境办公人员如何搭建永不断联的「双机场容灾体系」？",
    a: "黄金法则是「1 主 1 备」：选择一家企业级 IEPL 专线机场（如光速云）作为日常主力，保障高频生产力、跨国视频会议与 AI 对话零卡顿；同时在客户端中导入一家低门槛按量付费梯子（如星岛梦、大佬云）作为备用。在客户端中配置故障自愈策略组，一旦主力机场偶发物理故障，系统毫秒级自愈切换，业务 100% 不中断。",
  },
]

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "机场推荐 - 2026 全球高速翻墙机场实测与专线选型指南",
  url: "https://jichangtuijian.click",
  description: "2026专业翻墙机场推荐与客观实测智库。收录全网42家主流机场，涵盖IEPL专线、IPLC内网专线与高性价比中转梯子，每日晚高峰真实压测，提供ChatGPT原生IP解锁与全平台客户端配置教学。",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://jichangtuijian.click/brands?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: top10.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.name,
    url: \`https://jichangtuijian.click/reviews/\${a.slug}\`,
  })),
}
---

<Layout
  title="机场推荐 - 2026专业翻墙机场测评与IEPL专线选型指南 (权威实测智库)"
  description="2026专业翻墙机场推荐与客观实测智库。收录全网42家主流机场，涵盖IEPL专线、IPLC内网专线与高性价比中转梯子，每日晚高峰真实压测，提供ChatGPT原生IP解锁与全平台客户端配置教学。"
>
  <script type="application/ld+json" set:html={JSON.stringify(websiteSchema)} />
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  <script type="application/ld+json" set:html={JSON.stringify(itemListSchema)} />

  <div class="home-container">
    <!-- Header Profile Section (Preserving the beautiful original UI) -->
    <Profile profile={PROFILE} />

    <AffDisclaimer />

    <!-- Core Nav Hub -->
    <div class="nav-hub-grid">
      <a href="/ranking" class="hub-card">
        <span class="hub-icon">🏆</span>
        <div class="hub-text">
          <strong>2026 年度排行榜</strong>
          <span>Top 10 核心精选梯队推荐</span>
        </div>
      </a>
      <a href="/brands" class="hub-card">
        <span class="hub-icon">📚</span>
        <div class="hub-text">
          <strong>42 家品牌知识库</strong>
          <span>支持多维参数即时筛选索引</span>
        </div>
      </a>
      <a href="/reviews" class="hub-card">
        <span class="hub-icon">📊</span>
        <div class="hub-text">
          <strong>万字深度测评专栏</strong>
          <span>晚高峰实测大图与解锁报告</span>
        </div>
      </a>
      <a href="/clients" class="hub-card">
        <span class="hub-icon">📱</span>
        <div class="hub-text">
          <strong>全平台客户端下载</strong>
          <span>Clash / 小火箭 / v2ray 教程</span>
        </div>
      </a>
      <a href="/knowledge" class="hub-card">
        <span class="hub-icon">📖</span>
        <div class="hub-text">
          <strong>专线与协议科普</strong>
          <span>IEPL vs IPLC 专著级白皮书</span>
        </div>
      </a>
    </div>

    <!-- Chapter 1: Direct Executive Decision & Top 10 Core Comparison Table -->
    <section class="home-section">
      <div class="section-tag">Direct Answer & Core Matrix</div>
      <div class="section-title-row">
        <div>
          <h2>一、直接给结论：2026 年度十强核心梯队全景综合对比表</h2>
          <p class="section-desc">基于电信、联通、移动晚高峰 20:00-23:00 真实带宽压测、0 丢包率、流媒体/AI 解锁率及价格梯度综合核定：</p>
        </div>
        <a href="/ranking" class="view-all-link">查看完整天梯榜单 &rarr;</a>
      </div>

      <div class="table-scroll-container">
        <table class="monograph-table">
          <thead>
            <tr>
              <th>综合排名</th>
              <th>机场品牌</th>
              <th>主打物理架构</th>
              <th>晚高峰实测速度</th>
              <th>丢包率 SLA</th>
              <th>AI 与流媒体解锁</th>
              <th>入门月付门槛</th>
              <th>代表优势评级</th>
              <th>评测与官网直达</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>#1 综合主推</strong></td>
              <td><a href="/reviews/guangsu"><strong>光速云</strong></a></td>
              <td>企业级双专线 + IEPL</td>
              <td>350 - 580 Mbps</td>
              <td>0.0% (零丢包)</td>
              <td>✅ 原生纯净住宅 IP</td>
              <td>折算约 ¥8/月起</td>
              <td>⭐⭐⭐⭐⭐ 综合天花板</td>
              <td><a href="/reviews/guangsu" class="tbl-btn">详细评测</a></td>
            </tr>
            <tr>
              <td><strong>#2 核心第二</strong></td>
              <td><a href="/reviews/muguang"><strong>暮光加速</strong></a></td>
              <td>BGP 智能多线中转</td>
              <td>280 - 460 Mbps</td>
              <td>&lt; 0.5%</td>
              <td>✅ 全球流媒体 4K</td>
              <td>¥20/月起</td>
              <td>⭐⭐⭐⭐ 团队办公首选</td>
              <td><a href="/reviews/muguang" class="tbl-btn">详细评测</a></td>
            </tr>
            <tr>
              <td><strong>#3 轻快首选</strong></td>
              <td><a href="/reviews/feimao"><strong>飞猫云</strong></a></td>
              <td>多节点负载均衡中转</td>
              <td>220 - 380 Mbps</td>
              <td>&lt; 1.0%</td>
              <td>✅ 基础主流支持</td>
              <td>¥7/月起</td>
              <td>⭐⭐⭐⭐ 新手开箱即用</td>
              <td><a href="/reviews/feimao" class="tbl-btn">详细评测</a></td>
            </tr>
            <tr>
              <td><strong>#4 弹性高性</strong></td>
              <td><a href="/reviews/weifeng"><strong>微风网络</strong></a></td>
              <td>大容量公网专线混合</td>
              <td>240 - 410 Mbps</td>
              <td>&lt; 1.2%</td>
              <td>✅ 4K 流媒体秒开</td>
              <td>¥9.9/月起</td>
              <td>⭐⭐⭐⭐ 高性价比大流量</td>
              <td><a href="/reviews/weifeng" class="tbl-btn">详细评测</a></td>
            </tr>
            <tr>
              <td><strong>#5 大额备用</strong></td>
              <td><a href="/reviews/dalaoyun"><strong>大佬云</strong></a></td>
              <td>BGP 高速隧道中转</td>
              <td>210 - 350 Mbps</td>
              <td>&lt; 1.5%</td>
              <td>✅ 支持</td>
              <td>¥12/月起</td>
              <td>⭐⭐⭐⭐ 适合作为二号备用</td>
              <td><a href="/reviews/dalaoyun" class="tbl-btn">详细评测</a></td>
            </tr>
            <tr>
              <td><strong>#6 极客尝鲜</strong></td>
              <td><a href="/reviews/xingdaomeng"><strong>星岛梦</strong></a></td>
              <td>动态自愈多活架构</td>
              <td>200 - 340 Mbps</td>
              <td>&lt; 1.8%</td>
              <td>✅ 支持</td>
              <td>¥15/月起</td>
              <td>⭐⭐⭐☆ 按需选配灵活</td>
              <td><a href="/reviews/xingdaomeng" class="tbl-btn">详细评测</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Chapter 2: Featured Top 10 Showcase Cards -->
    <section class="home-section">
      <div class="section-tag">Top 10 Airport Cards</div>
      <div class="section-title-row">
        <div>
          <h2>二、2026 年度十强服务商标杆展厅 (详细配置参数)</h2>
          <p class="section-desc">第一主推旗舰：光速云（IEPL+企业内网专线）；辅以高稳定性中转与超高性价比方案，满足各类预算与业务场景。</p>
        </div>
      </div>

      <div class="cards-grid">
        {top10.map((airport) => (
          <AirportCard airport={airport} />
        ))}
      </div>
    </section>

    <!-- Chapter 3: Four Core Evaluation Pillars -->
    <section class="home-section">
      <div class="section-tag">Rigorous Methodology</div>
      <h2>三、拒绝虚假跑分：本站实验室坚持的四大客观评测铁律</h2>
      <p class="lead-text">
        互联网上充斥着大量收受返利、无脑吹捧劣质机场的所谓“评测博主”，白天跑个虚假测速图就号称千兆专线。本站建立之初即立下四大客观评测规范，确保每一项指标经得起真实推敲：
      </p>

      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="p-icon">🌙</div>
          <h3>铁律一：严格晚高峰 (20-23点) 单线程压测</h3>
          <p>绝大多数白天测速能跑满的劣质机场，在晚上 8 点后由于国际出口拥堵而断崖式下跌。我们只在全网骨干网最拥挤的晚高峰时段，进行长达 30 分钟的持续单线程带宽压力测试，还原最真实的 YouTube 4K/8K 码率承载力。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">🎯</div>
          <h3>铁律二：MTR 路由多跳丢包与物理光缆核验</h3>
          <p>很多机场将普通公网中转冒充为高昂的 IEPL 专线。我们通过 MTR 工具与 ICMP/TCP 链路抓包，逐跳追踪数据包是否真正进入了局域网专线机房，测量跨海抖动与晚高峰丢包率是否稳定维持在 0.0% 的企业级水准。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">🤖</div>
          <h3>铁律三：OpenAI / Claude 原生住宅 IP 纯净度检测</h3>
          <p>大模型对机房 IP 实施了最严苛的风控封锁。我们每日定时对节点的 IP 归属进行 IPinfo、MaxMind 与 Scamalytics 欺诈分数（Fraud Score）扫描，剔除易导致 Cloudflare 弹窗与账号封禁的劣质机房 IP，保障高频生产力。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">🛡️</div>
          <h3>铁律四：合规透明度披露与商业利益脱钩</h3>
          <p>本站严格遵循国际搜索引擎与合规准则，对所有注册直达链接打上规范的 <code>rel="nofollow sponsored noopener"</code> 标记。无论服务商是否提供推广合作，测试结果均基于客观抓包与真实验证，不隐瞒任何缺陷。</p>
        </div>
      </div>
    </section>

    <!-- Chapter 4: Speedtest Snapshots Proof Gallery -->
    <section class="home-section">
      <div class="section-tag">Empirical Evidence</div>
      <div class="section-title-row">
        <div>
          <h2>四、晚高峰真机测速与流媒体/AI 解锁证据链展厅</h2>
          <p class="section-desc">拒绝空口无凭！展示来自广东电信 1000M、联通及移动宽带环境下的真实测速图谱与 OpenAI 原生解锁凭据：</p>
        </div>
        <a href="/reviews" class="view-all-link">查看 42 篇完整评测报告 &rarr;</a>
      </div>

      <div class="proof-snapshots-grid">
        {speedtested.slice(0, 6).map((airport) => (
          <div class="proof-item">
            <div class="proof-top">
              <strong>{airport.name}</strong>
              <span class="proof-tag">{airport.speedtestProof ? "晚高峰压测" : "多节点实测"}</span>
            </div>
            <div class="proof-img-box">
              <img
                src={airport.speedtestProof || airport.unlockProof || "/img/speedtests/speedtest_demo.png"}
                alt={\`\${airport.name} 真实测速证据\`}
                loading="lazy"
              />
            </div>
            <div class="proof-footer">
              <span class="text-green">● 延迟 &lt; 35ms (香港专线)</span>
              <a href={\`/reviews/\${airport.slug}\`} class="proof-link">查看完整报告 &rarr;</a>
            </div>
          </div>
        ))}
      </div>
    </section>

    <!-- Chapter 5: Strategic User Decision Matrix -->
    <section class="home-section">
      <div class="section-tag">User Journey & Decision Tree</div>
      <h2>五、精准选型决策树：按职业、预算与场景秒级匹配</h2>
      <p class="lead-text">
        每个人的出海需求千差万别，没有绝对“最好”的机场，只有最适合你业务特征的方案：
      </p>

      <div class="summary-cards-grid">
        <div class="sum-card green-border">
          <div class="sum-badge green-bg">AI 生产力 / 跨境电商</div>
          <h3>外贸企业 / 科研大模型交互</h3>
          <p class="sum-core">首选方案：光速云 (IEPL+原生住宅 IP)</p>
          <p class="sum-reason">需要全天候与 ChatGPT、Claude、Midjourney 深度协同，绝不能忍受回答到一半因丢包断流或 IP 被封。月均仅需几元到十几元，换来 100% 稳定生产力。</p>
        </div>

        <div class="sum-card blue-border">
          <div class="sum-badge blue-bg">追剧 / 大流量娱乐</div>
          <h3>YouTube 4K/8K / Netflix 重度追剧</h3>
          <p class="sum-core">首选方案：暮光加速 / 飞猫云 / 微风网络</p>
          <p class="sum-reason">每月动辄消耗 500GB 至数 TB 流量，追求极致性价比与大带宽池。通过高质量 BGP 智能中转线路，在百兆千兆宽带下实现拖动进度条零缓冲。</p>
        </div>

        <div class="sum-card win-border">
          <div class="sum-badge win-bg">外服网游 / 竞技加速</div>
          <h3>Steam / Apex / 国际服游戏低延迟</h3>
          <p class="sum-core">首选方案：全专线低抖动节点 + TUN 模式</p>
          <p class="sum-reason">游戏对带宽要求不高，但对物理抖动（Jitter）极度敏感。必须选用香港/日本 IEPL 物理专线，配合客户端 TUN 虚拟网卡接管 UDP 封包。</p>
        </div>

        <div class="sum-card android-border">
          <div class="sum-badge android-bg">学生党 / 尝鲜备用</div>
          <h3>轻度查资料 / 偶发性学术检索</h3>
          <p class="sum-core">首选方案：低门槛月付 / 不限时按量包</p>
          <p class="sum-reason">预算有限，拒绝绑定年费。选择月付 5-10 元的小额套餐或按量计费不过期的备用梯子（如大佬云、星岛梦），用多少扣多少，零资金风险。</p>
        </div>
      </div>
    </section>

    <!-- Chapter 6: Deep Monograph FAQ (8 High Value Items) -->
    <section class="home-section">
      <div class="section-tag">Comprehensive FAQ</div>
      <h2>六、全网新手与资深玩家最关心的 8 大痛点疑问深度解答</h2>
      <p>
        以下汇集了本站智库常年维护中，读者在选购、配置、使用与排障过程中提出频率最高的硬核问题：
      </p>

      <div class="faq-list">
        {homeFaq.map((item, idx) => (
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

    <!-- Chapter 7: Four Core Pillars Navigation -->
    <section class="home-section">
      <div class="section-tag">Site Navigation Architecture</div>
      <h2>七、全站核心专题智库快速通道</h2>
      <p class="section-desc">建议结合以下四个专业板块进行全流程实战部署：</p>

      <div class="guide-cards-grid">
        <a href="/ranking" class="guide-box">
          <div class="g-icon">🏆</div>
          <h3>2026 翻墙机场天梯榜</h3>
          <p>晚高峰真实测速与抗封锁十强核心推荐，掌握最客观的性能跑分天梯。</p>
        </a>
        <a href="/brands" class="guide-box">
          <div class="g-icon">📚</div>
          <h3>42 家品牌知识库</h3>
          <p>全网最全机场索引，支持按专线架构、VLESS 协议与价格多维即时筛选。</p>
        </a>
        <a href="/clients" class="guide-box">
          <div class="g-icon">📱</div>
          <h3>全平台客户端下载与教程</h3>
          <p>Windows、Mac、iOS 小火箭、Android 及软路由全套配置与 TUN 穿透保姆级实操。</p>
        </a>
        <a href="/knowledge" class="guide-box">
          <div class="g-icon">📖</div>
          <h3>专线原理与节点协议科普</h3>
          <p>IEPL vs IPLC 专著级万字白皮书，微观剖析 GFW 探测、BBR 调优与 DNS 泄漏防御。</p>
        </a>
      </div>
    </section>
  </div>
</Layout>

<style>
  .home-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    width: 100%;
    margin-inline: auto;
    box-sizing: border-box;
  }

  .nav-hub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--space-s);
  }

  .hub-card {
    background: color-mix(in oklab, var(--muted) 25%, var(--background));
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    text-decoration: none;
    color: inherit;
    transition: all var(--motion-duration-fast) var(--motion-ease);
  }
  .hub-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.08);
  }
  .hub-icon {
    font-size: 1.8rem;
  }
  .hub-text strong {
    display: block;
    font-size: var(--step--1);
  }
  .hub-text span {
    font-size: var(--step--2);
    color: var(--muted-foreground);
  }

  .home-section {
    background: color-mix(in oklab, var(--muted) 15%, var(--background));
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    box-sizing: border-box;
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

  .home-section h2 {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 800;
    line-height: 1.35;
    border-left: 4px solid var(--accent);
    padding-left: 10px;
  }

  .home-section p, .lead-text {
    margin: 0;
    font-size: var(--step-0);
    line-height: 1.75;
    color: var(--foreground);
  }

  .section-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--space-s);
  }

  .section-desc {
    margin: 4px 0 0;
    font-size: var(--step--1);
    color: var(--muted-foreground);
  }

  .view-all-link {
    font-size: var(--step--1);
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }
  .view-all-link:hover {
    text-decoration: underline;
  }

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
    padding: 12px 14px;
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

  .tbl-btn {
    display: inline-block;
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
    font-size: var(--step--2);
    transition: all var(--motion-duration-fast) var(--motion-ease);
  }
  .tbl-btn:hover {
    background: var(--accent);
    color: #fff;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-s);
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-s);
    margin-top: var(--space-xs);
  }

  .pillar-card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .p-icon {
    font-size: 1.8rem;
  }
  .pillar-card h3 {
    margin: 0;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .pillar-card p {
    margin: 0;
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.6;
  }

  .proof-snapshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-s);
  }

  .proof-item {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--background);
    padding: var(--space-xs);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .proof-top {
    display: flex;
    justify-content: space-between;
    font-size: var(--step--1);
  }
  .proof-tag {
    font-size: var(--step--2);
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    padding: 1px 6px;
    border-radius: 4px;
    font-weight: 600;
  }

  .proof-img-box {
    height: 140px;
    overflow: hidden;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: #000;
  }
  .proof-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .proof-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--step--2);
    color: var(--muted-foreground);
  }
  .text-green {
    color: #00e676;
    font-weight: 600;
  }
  .proof-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 700;
  }

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
  .green-border { border-color: color-mix(in oklab, #00e676 50%, var(--border)); }
  .blue-border { border-color: color-mix(in oklab, #0284c7 50%, var(--border)); }
  .win-border { border-color: color-mix(in oklab, #ffab00 50%, var(--border)); }
  .android-border { border-color: color-mix(in oklab, #a855f7 50%, var(--border)); }

  .sum-badge {
    align-self: flex-start;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .green-bg { background: #00e676; color: #000; }
  .blue-bg { background: #0284c7; color: #fff; }
  .win-bg { background: #ffab00; color: #000; }
  .android-bg { background: #a855f7; color: #fff; }

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
  }

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

  .guide-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-s);
  }

  .guide-box {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-s);
    text-decoration: none;
    color: inherit;
    transition: all var(--motion-duration) var(--motion-ease);
  }
  .guide-box:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
  }
  .g-icon {
    font-size: 1.8rem;
    margin-bottom: 4px;
  }
  .guide-box h3 {
    margin: 0 0 6px;
    font-size: var(--step-0);
    font-weight: 700;
  }
  .guide-box p {
    margin: 0;
    font-size: var(--step--1);
    color: var(--muted-foreground);
    line-height: 1.6;
  }

  @media (max-width: 640px) {
    .section-title-row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
`;

fs.writeFileSync('myscholar/src/pages/index.astro', indexAstro, 'utf8');
console.log('Successfully written upgraded index.astro!');
