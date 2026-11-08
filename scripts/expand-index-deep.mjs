import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/index.astro', 'utf8');

// Rich chapters to add to homepage:
// 1. Chapter on Cross-Border Physical Infrastructure & Line Topology (IEPL, IPLC, BGP Transit)
// 2. Chapter on Anti-Censorship & Encryption Protocols (VLESS Reality, Shadowsocks-2022, Hysteria 2)
// 3. Chapter on Peak Hour Congestion Control & BBR Tuning
// 4. Chapter on Native IP vs Datacenter IP for AI & Streaming
// 5. Chapter on Disaster Recovery & Multi-Airport Setup Guide
// 6. 10 More in-depth FAQ questions

const extraIndexSections = `
    <!-- Chapter 8: Physical Network Infrastructure Guide -->
    <section class="home-section">
      <div class="section-tag">Network Architecture Guide</div>
      <h2>八、跨境物理网络底座解密：IEPL / IPLC / 公网中转 / 直连全景深度科普</h2>
      <p class="lead-text">
        经常有新手困惑：“为什么有的机场只要 5 元一个月，而高端专线机场却要 30 元甚至 60 元？” 根本的核心差异，就在于<strong>数据跨越国境的那一段物理线路介质与传输成本</strong>。
      </p>

      <div class="deep-guide-block">
        <h3>8.1 四大主流传输架构核心技术对比</h3>
        <p>理解这四种物理线路的本质差异，能让你在选购梯子时一眼看穿商家的宣传泡沫：</p>
        <ul>
          <li><strong>IEPL（国际以太网私有专线 - International Ethernet Private Line）：</strong> 租用电信运营商的点对点海底光缆物理电路。用户数据在境内入口机房（如深圳、上海）汇聚后，直接通过专属物理内网传输至境外机房（如香港、东京）。<strong>整个跨海传输过程物理上 100% 绕开国际公网与 GFW 审查节点，晚高峰丢包率恒定 0.0%，是外贸办公与 AI 生产力的终极答案。</strong></li>
          <li><strong>IPLC（国际私有租用线路 - International Private Leased Circuit）：</strong> 纯二层点对点硬切片电路，与 IEPL 类似但技术实现更为传统。延迟极低、无抖动、抗干扰能力顶尖，但单 Gbps 的月租成本高昂（通常数万元至十余万元），一般仅见于顶级机场的核心 VIP 节点池。</li>
          <li><strong>BGP 优质公网隧道中转（Transit Tunneling）：</strong> 商家在国内租赁具备多线 BGP（电信/联通/移动）的优质 IDC 机房作为入口，先在境内对数据包进行强力加密与混淆封装，再通过公网国际出口路由器发往境外服务器。<strong>性价比极高，白天速率极佳；但晚高峰遇到骨干网拥堵时，仍可能出现轻微跳 ping 或 1%-3% 的丢包。</strong></li>
          <li><strong>普通公网直连（Direct VPS）：</strong> 没有国内中转入口，你的手机或电脑直接向海外服务器发起连接。在平时可能勉强能用，但一旦进入晚高峰 20:00-23:00，电信 163 骨干网出口拥塞严重，丢包率往往飙升至 30%-50%，且境外 IP 极易被 GFW 定向拉黑阻断。</li>
        </ul>

        <h3 class="mt-m">8.2 晚高峰单线程带宽才是检验机场实力的唯一金标准</h3>
        <p>很多测速工具默认采用 16 个甚至 32 个并发多线程来测速，哪怕某条线路丢包率高达 10%，其他线程也可以交替拉满带宽，制造出“几百兆跑满”的虚假繁荣。</p>
        <p>但在真实使用场景中——例如观看 <strong>YouTube 4K/8K 视频</strong>、<strong>ChatGPT 实时流式对话（Streaming Tokens）</strong> 或 <strong>Zoom 跨国会议</strong>，底层几乎全都是<strong>单线程持久 TCP/UDP 传输</strong>。一旦线路发生丢包，TCP 拥塞窗口瞬间腰斩断崖式下滑，视频直接陷入无限死循环缓冲。因此，本站评测始终以<strong>晚高峰单线程持续吞吐能力与 0 丢包率</strong>作为天梯榜单的第一权重标准！</p>
      </div>
    </section>

    <!-- Chapter 9: AI Platform Fraud Score & Clean IP Guide -->
    <section class="home-section">
      <div class="section-tag">AI & Streaming Security</div>
      <h2>九、大模型时代的 IP 欺诈度（Fraud Score）与原生住宅出海防风控指南</h2>
      <p class="lead-text">
        2026 年的科学上网，早已从单纯的“能否翻过去”，演变为“海外目标平台是否信任你的 IP 资产”。以 OpenAI、Anthropic 及 Netflix 为代表的国际巨头，部署了全球最严苛的实时风控系统。
      </p>

      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="p-icon">❌</div>
          <h3>机房数据中心 IP 的死穴</h3>
          <p>廉价机场采购的大多是 AWS、GCP、Linode、DigitalOcean 等公开云服务商的机房 IP（ASN 标注为 Hosting / Data Center）。OpenAI 与 Cloudflare 对此类 IP 段直接拉黑，导致频繁弹出五秒盾验证码、拒绝访问甚至直接封禁付费账号。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">✅</div>
          <h3>原生商业住宅 IP 的特权</h3>
          <p>高端机场（如本站第一主推的 <a href="/reviews/guangsu">光速云</a>）在落地端大量配置香港 HKT/HKBN、台湾中华电信、日本 NTT 等本地真实宽带运营商的原生 IP。在 IPinfo 数据库中被识别为家庭住宅或商业宽带，欺诈评分近乎为零，实现 ChatGPT 免降级无感直达。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">🎬</div>
          <h3>Netflix / Disney+ 4K 解锁玄机</h3>
          <p>海外流媒体平台为了版权保护，严格实行跨区地理限制。若落地 IP 缺乏原生流媒体解锁资质，登录 Netflix 后只能观看自制剧（Netflix Originals），无法收看非自制热门美剧。优质机场通过专属 DNS 解锁集群实现 4K HDR 杜比视界完整剧集秒开。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">🔒</div>
          <h3>静态防关联对跨境电商的意义</h3>
          <p>对于亚马逊（Amazon）、eBay、Shopee 卖家以及 PayPal、Stripe 跨境结算团队，频繁跳动海外 IP 是导致店铺关联封禁的罪魁祸首。必须选用支持固定出口节点、配备多重容灾自愈的企业级专线方案。</p>
        </div>
      </div>
    </section>

    <!-- Chapter 10: Dual Airport Failover Architecture -->
    <section class="home-section">
      <div class="section-tag">Disaster Recovery Engineering</div>
      <h2>十、企业级高可用：资深从业者永不断联的“1主1备”容灾配置全景实操</h2>
      <p class="lead-text">
        在互联网跨境通信领域，任何单一服务商都无法保证 365 天 100.00% 的不可抗力免灾（例如海底地震导致中美海缆中断、国内骨干网路由大修）。搭建一套低成本、高韧性的容灾体系，是资深用户的标准动作：
      </p>

      <div class="deep-guide-block">
        <h3>10.1 黄金法则：“企业 IEPL 主力 + 不限时按量备用”</h3>
        <p>很多新手要么只买一家机场，遇到故障干着急；要么同时买两家昂贵的年付包月套餐，造成大量流量闲置浪费。最聪明的高性价比方案是：</p>
        <ul>
          <li><strong>主力选择（承载 95% 流量）：</strong> 订阅一家如 <a href="/reviews/guangsu">光速云</a> 的旗舰 IEPL 专线机场，按年付折算仅约 8 元/月，享受日常办公、AI 交互与 4K 追剧的极致低延迟零丢包体验。</li>
          <li><strong>备用选择（承载 5% 兜底）：</strong> 订阅一家小额按量付费或永久不限时的低门槛梯子（如 <a href="/reviews/xingdaomeng">星岛梦</a>、<a href="/reviews/dalaoyun">大佬云</a>），充值 10-20 元买断数十 GB 流量，永不过期。把它导入客户端作为备选策略组，平时不扣费，极端敏感时期随时秒级自愈。</li>
        </ul>

        <h3 class="mt-m">10.2 在客户端中配置自动故障转移（Fallback 策略组）</h3>
        <p>在 Clash Verge Rev 中，你可以将两家机场的订阅同时勾选启用，并在规则中设置一个 <code>fallback</code> 自动健康探测策略组。探测间隔设置为 10 秒，一旦主力专线节点在持续 2 次探测中无响应，客户端底层会在 50 毫秒内无感切换至备用机场节点，保障你的 Zoom 跨国会议与重要外贸洽谈绝不断联！</p>
      </div>
    </section>

    <!-- Chapter 11: Protocol Evolution and Congestion Control -->
    <section class="home-section">
      <div class="section-tag">Protocol & Congestion Engineering</div>
      <h2>十一、节点协议演进与 TCP 拥塞控制调优（BBRv3 vs CUBIC）</h2>
      <p class="lead-text">
        数据包在广域网中穿行时，加密协议决定了其“隐蔽性”，而传输层的拥塞控制算法决定了其“极限航速”。
      </p>

      <div class="table-scroll-container">
        <table class="monograph-table">
          <thead>
            <tr>
              <th>主流传输协议</th>
              <th>加密机制与握手开销</th>
              <th>抗 GFW 深度探测能力</th>
              <th>高丢包弱网吞吐表现</th>
              <th>最佳适用网络场景</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>VLESS Reality</strong></td>
              <td>基于真实大厂 TLS 证书偷取，零特征</td>
              <td>⭐⭐⭐⭐⭐ 行业巅峰</td>
              <td>⭐⭐⭐⭐ 依底层 TCP 算法而定</td>
              <td>公网直连与抗封锁防封首选</td>
            </tr>
            <tr>
              <td><strong>Shadowsocks-2022</strong></td>
              <td>对称轻量加密，CPU 开销极低</td>
              <td>⭐⭐⭐ 需要隧道中转掩护</td>
              <td>⭐⭐⭐⭐⭐ 内网跑满线速</td>
              <td>IEPL / IPLC 物理专线内部首选</td>
            </tr>
            <tr>
              <td><strong>Hysteria 2 (Hy2)</strong></td>
              <td>基于标准 QUIC / UDP 暴力拥塞控制</td>
              <td>⭐⭐⭐⭐ 伪装标准 HTTP/3 流量</td>
              <td>⭐⭐⭐⭐⭐ 弱网丢包暴力起飞</td>
              <td>恶劣弱网环境、晚高峰高丢包突破</td>
            </tr>
            <tr>
              <td><strong>Trojan-Go</strong></td>
              <td>标准 HTTPS 443 端口伪装真实网站</td>
              <td>⭐⭐⭐⭐ 伪装合规网站</td>
              <td>⭐⭐⭐⭐ 标准 TLS 1.3 表现</td>
              <td>公司内网、高校校园网端口限制突破</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="deep-guide-block mt-m">
        <h3>BBR 拥塞控制算法：为什么它是现代科学上网的救世主？</h3>
        <p>传统的 CUBIC 算法将“丢包”视作网络拥塞的唯一信号，一旦在跨国链路遇到 5% 的偶发丢包，CUBIC 会将发送窗口暴力缩减 50%，导致网速瞬间瘫痪；而由 Google 研发的 <strong>BBR（Bottleneck Bandwidth and RTT）算法</strong>，通过实时探测链路的最大物理带宽和最小往返时间，不再盲目受偶发丢包干扰。高端机场的服务器节点全面开启 BBRv2 / BBRv3，使得海外数据流即使在晚高峰轻微丢包的环境下，依然能维持高达 80% 以上的高速吞吐！</p>
      </div>
    </section>
`;

// Insert the extra sections before Chapter 6 (FAQ)
content = content.replace(/<!-- Chapter 6: Deep Monograph FAQ/, extraIndexSections + '\n\n    <!-- Chapter 12: Deep Monograph FAQ');

// Add 4 more high-impact FAQ items to homeFaq
const extraHomeFaqs = `  {
    q: "为什么在敏感时期（如每年重大会议期间），很多廉价梯子会集体失联？",
    a: "在特殊敏感时期，国家防火墙（GFW）会全面收紧对国际出口路由器的深度包检测（DPI）策略，并加大针对境外 IP 端口的主动重放探测（Active Probing）。廉价机场由于使用的是公网中转或公网直连，其境外落地 IP 在数小时内就会被批量阻断或限速；而企业级 IEPL 专线采用的是物理内网点对点海缆，数据在境内机房直接进入私有专线隧道，物理上根本不经过公网国际出口路由器和 GFW 审查节点，因此在敏感时期依然能够稳定坚挺。",
  },
  {
    q: "自建海外 VPS 节点（如购买搬瓦工、RackNerd）与购买专业机场相比，哪个更划算？",
    a: "在 2026 年的对抗环境下，自建单台 VPS 的性价比与综合体验已远不及专业专线机场。个人购买一台优质线路的海外 VPS（如搬瓦工 CN2 GIA）年付成本通常在 100 美元（约合 700+ 元人民币）以上，且一旦 IP 被墙还需额外花费数美元付费更换；更重要的是自建节点只能走公网直连，晚高峰无法与国内多线 BGP 入口 + IEPL 物理专线相抗衡。专业机场通过规模化采购均摊专线高昂成本，用户每月仅需十几元即可畅享全球数十个原生住宅节点的抗封锁多活容灾。",
  },
  {
    q: "什么是机场节点的倍率？使用 0.2x 节点和 5x 节点有什么玄机？",
    a: "倍率是指用户消耗网络流量时，系统扣除账户额度的乘数比例。例如使用 1x 倍率节点下载 1GB 视频扣除 1GB 流量；使用 0.2x 倍率节点仅扣除 200MB 账户流量（通常为冷门地区或大容量公网中转节点，非常适合低成本下载超大文件或挂机刷流量）；而 3x-5x 高倍率节点通常为独享高成本 IPLC 极速专线或特定流媒体纯净原生 IP 节点。选购和使用节点时切记留意倍率，避免高倍率节点迅速耗尽每月流量。",
  },
  {
    q: "如何辨别一家机场是真的 IEPL 专线，还是拿廉价公网中转冒充的？",
    a: "有三个核心硬核鉴别方法：① 晚高峰（21:00）看丢包率：真专线在电信联通移动晚高峰测试中，丢包率始终维持在 0.0% 零丢包；若丢包率超过 3%-5% 且跳 ping 剧烈，必是超售或公网冒充；② 看中间路由跳数：真专线在境内入口汇聚后，数据包通过私有内网直达香港/日本落地机房，中间路由跳数极少且无公网 IP 节点跳转；③ 看特殊敏感期的稳定性表现：公网中转在敏感期容易大面积红屏超时，真专线则能做到全年 99.9% 以上的高可用可用率。",
  },
`;

content = content.replace(/const homeFaq = \[/, 'const homeFaq = [\n' + extraHomeFaqs);

fs.writeFileSync('myscholar/src/pages/index.astro', content, 'utf8');
console.log('Successfully expanded index.astro with deep chapters and FAQs!');
