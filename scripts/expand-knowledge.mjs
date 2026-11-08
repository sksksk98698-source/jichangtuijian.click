import fs from "node:fs";

// Let's read the current knowledge.astro
let page = fs.readFileSync("src/pages/knowledge.astro", "utf-8");

const extraChapters = `
    <!-- Section 11: ISP Routing Characteristics -->
    <section id="section-11" class="knowledge-section">
      <div class="section-tag">ISP & Infrastructure Analysis</div>
      <h2>十一、国内三大运营商出口路由特性深度剖析 (电信 / 联通 / 移动)</h2>
      <p>
        同样连接一家机场的同一个节点，为什么中国电信用户感觉飞快，而中国移动用户却频繁断流？或者在某些地区联通表现极佳？根本原因在于中国三大基础电信运营商各自的国际出入口骨干网架构和路由策略存在巨大差异。
      </p>

      <div class="tech-deep-dive">
        <h3>11.1 中国电信：163 骨干网 vs CN2 GT vs CN2 GIA</h3>
        <p>
          中国电信拥有全球最庞大的宽带用户群体，其国际网络主要分为两大体系：
        </p>
        <ul>
          <li>
            <strong>163 骨干网 (AS4134)：</strong>
            电信最古老的普通民用骨干网，IP 通常以 202.97 开头。由于承载了全国绝大多数普通家庭宽带流量，在晚高峰（20:00 - 23:00）国际出口互联带宽极度拥挤，丢包率常常飙升至 20% - 40%。公网直连的 163 线路在晚高峰几乎无法维持 4K 播放。
          </li>
          <li>
            <strong>CN2 GT (Global Transit - AS4809 部分优化)：</strong>
            电信的半程优化网络。国内段依然走普通的 202.97 骨干网，只有在出境前的国际出口路由器才转入 AS4809。晚高峰表现好于普通 163，但依然受到国内骨干网拥堵波及。
          </li>
          <li>
            <strong>CN2 GIA (Global Internet Access - AS4809 全程顶级专线)：</strong>
            电信目前民用及商业级表现最强的公网精品线路。从省级骨干网入口即直奔 59.43 专用路由器，双向全程走 CN2 独立光缆直达海外落地，晚高峰延迟稳定、丢包极少。但其带宽成本极高（单 Mbps 成本是普通 163 的数十倍），因此纯 CN2 GIA 梯子价格往往居高不下。
          </li>
        </ul>

        <h3>11.2 中国联通：AS4837 (169网) vs AS9929 (联通A网)</h3>
        <p>
          中国联通在国际出入口带宽的“人均占有率”上历来优于中国电信：
        </p>
        <ul>
          <li>
            <strong>AS4837 (联通 169 骨干网)：</strong>
            联通的普通民用骨干网。得益于联通国际出口总带宽充沛且用户基数小于电信，AS4837 在晚高峰的拥堵程度显著轻于电信 163。这也是为什么很多平价中转机场（如 <a href="/reviews/feimao">飞猫云</a>、<a href="/reviews/weifeng">微风网络</a>）喜欢采用联通入口的原因，性价比极其突出。
          </li>
          <li>
            <strong>AS9929 (中国联通高端 A 网 / 原网通骨干)：</strong>
            被誉为“联通的 CN2 GIA”。这是原本由网通建设的优质高可靠网络，现主要服务于金融证券、跨国跨省政企专线。在晚高峰期间，AS9929 的延迟平稳度与丢包控制完全能与电信 CN2 GIA 媲美，且负载甚至更为轻盈。
          </li>
        </ul>

        <h3>11.3 中国移动：CMI 国际网络与新一代 CMIN2 精品网</h3>
        <p>
          中国移动早期缺乏自己的国际出口陆地光缆，国际流量往往需要先向电信或联通购买穿透流量。但近年来移动凭借雄厚资金自建了庞大的 CMI（China Mobile International）跨海网络：
        </p>
        <ul>
          <li>
            <strong>普通 CMI 出口：</strong>
            移动连接香港方向的延迟非常优秀（广东移动直连香港常可低至 10-15ms）。但移动最大的痛点在于<strong>跨网互联壁垒</strong>：移动宽带访问部署在电信或联通单线机房的入口时，容易遭遇跨网丢包；且在遇到欧美远端流量时，早期的 CMI 容易受拥塞限速。
          </li>
          <li>
            <strong>CMIN2 (中国移动对标 CN2 GIA 的新一代精品网)：</strong>
            移动针对政企与高端用户推出的对标专网，具备独立的 QoS 优先级保障，晚高峰抗抖动能力出众。
          </li>
        </ul>

        <div class="note-box">
          <strong>💡 运营商选型实战总结：</strong>
          如果你的家庭宽带是<strong>中国电信</strong>，请务必优先选择具备 <strong>BGP 多线接入或 IEPL 专线</strong> 的机场（如 <a href="/reviews/guangsu">光速云</a>），因为电信如果直连普通公网，晚高峰体验最差；如果是<strong>中国联通</strong>，在中转和专线上的适应性最强；如果是<strong>中国移动</strong>，请确保机场入口具备移动专用接入点或三网 BGP 动态路由，避免出现跨网握手超时。
        </div>
      </div>
    </section>

    <!-- Section 12: DNS Leaks & Fake-IP -->
    <section id="section-12" class="knowledge-section">
      <div class="section-tag">DNS Security & Traffic Rules</div>
      <h2>十二、DNS 泄露、EDNS 客户端子网 (ECS) 与透明代理防劫持全书</h2>
      <p>
        在跨境网络通信中，很多用户自认为开启了代理加密，却不知自己的网络活动依然处于“裸奔”状态。其中最隐蔽的泄密通道就是 <strong>DNS 域名系统解析过程</strong>。
      </p>

      <div class="tech-deep-dive">
        <h3>12.1 什么是 DNS 污染？GFW 是如何劫持你的域名查询的？</h3>
        <p>
          在标准的互联网访问中，当你在浏览器中输入一个网址（如 <code>google.com</code>）时，操作系统首先会向本地网络配置的 DNS 服务器（通常由你家里的路由器分配电信/联通默认 DNS）发送一条 UDP 53 端口的查询请求。
        </p>
        <p>
          防火墙在骨干网节点部署了旁路监听设备，一旦检测到 UDP 53 数据包中包含受限域名，防火墙会利用物理距离近的优势，<strong>抢在境外真实 DNS 服务器响应之前，伪造一个虚假的不可达 IP 响应包发送给你的电脑</strong>。由于 UDP 协议无状态，你的电脑采纳了先到达的虚假 IP，导致后续连接彻底失败。
        </p>

        <h3>12.2 什么是 DNS 泄漏？为什么它会彻底出卖你的访问隐私？</h3>
        <p>
          即使你的浏览器已经能够正常打开境外网页，但如果客户端配置不当，系统在发起域名解析时依然走本地运营商的明文 DNS 通道。
        </p>
        <p>
          中国电信、联通、移动的 DNS 服务器会完整记录你的查询日志：谁在什么时间查询了哪些网站。虽然运营商无法解密你传输的具体内容，但仅凭域名解析流水，即可完整绘制出你的上网行为画像。在访问安全敏感网站时，DNS 泄漏是极大的安全隐患。
        </p>

        <h3>12.3 为什么 EDNS Client Subnet (ECS) 是一把双刃剑？</h3>
        <p>
          EDNS Client Subnet（ECS，RFC 7871）是一项 DNS 扩展协议。它的设计初衷是为了让全球 CDN 能够根据客户端的真实地理位置调度最近的节点，因此 DNS 请求包中会附带客户端的前 24 位 IP 地址段。
        </p>
        <p>
          <strong>然而在代理场景下，ECS 会造成严重灾难：</strong>
          如果向境外权威 DNS 发送请求时携带了你国内的真实 IP 地址段，境外 CDN 会错误地将你调度到中国大陆境内的 CDN 节点，导致无法握手；或者直接向目标服务器暴露了你的中国用户身份。因此，优秀的代理客户端内核（如 Mihomo / Sing-box）在配置规则时都会明确禁用或剥离客户端 ECS 字段。
        </p>

        <h3>12.4 Fake-IP 模式 vs Redir-Host 模式：代理客户端的终极防污染方案</h3>
        <p>
          现代成熟的客户端（如 Clash Verge Rev、Stash）通过引入 <strong>Fake-IP 机制</strong> 从根源上解决了 DNS 污染与解析延迟：
        </p>
        <ul>
          <li>
            <strong>传统 Redir-Host 模式：</strong>
            本地先向远程代理服务器发起 DNS 解析，等待海外返回真实 IP 后，本地再建立连接。缺点是解析往返延迟高（多了一次 RTT），且本地依然可能受到系统 DNS 缓存干扰。
          </li>
          <li>
            <strong>先进的 Fake-IP 模式：</strong>
            当你的电脑向系统请求解析 <code>youtube.com</code> 时，客户端直接在本地虚拟网卡层瞬间拦截请求，并伪造一个保留地址段的假 IP（如 <code>198.18.0.25</code>）直接返回给操作系统。操作系统立刻发起对 <code>198.18.0.25</code> 的 TCP 握手，客户端截获该数据包，直接读取最初的域名标签，打包放入专线隧道送至境外落地机房，由境外机房在本地发起真正的域名解析。<strong>这不仅实现了 0 毫秒 DNS 本地响应，而且在物理链路上完全消除了本地 DNS 污染的可能！</strong>
          </li>
        </ul>
      </div>
    </section>

    <!-- Section 13: Enterprise High Availability & Failover -->
    <section id="section-13" class="knowledge-section">
      <div class="section-tag">Enterprise Architecture & Failover</div>
      <h2>十三、企业级科学上网与出海多活容灾策略 (Failover & Load Balance)</h2>
      <p>
        对于个人看视频娱乐，机场偶尔断线两分钟或许只是稍微等待；但对于跨境电商卖家（管理 Amazon、eBay、Shopee 店铺）、跨国视频会议、海外服务器运维人员而言，<strong>单点故障导致的断线可能带来不可逆的巨额经济损失</strong>。因此，理解企业级多活容灾至关重要。
      </p>

      <div class="tech-deep-dive">
        <h3>13.1 为什么不要所有业务共用单个机场？“1 主 1 备”黄金法则</h3>
        <p>
          任何技术服务商（即便技术再强大、实力再雄厚）都有可能遭遇不可抗力：如国际海缆被途经船只锚链钩断（历史上台湾海峡与吕宋海峡多次发生海缆地震断裂事故）、国内机房遭遇突发消防断电演练、上游运营商机房线路例行割接。
        </p>
        <p>
          因此，资深跨境架构师始终坚持<strong>“双线路、不同上游、不同接入点”的异构备份原则</strong>：
        </p>
        <ol class="step-ol">
          <li><strong>主力线路 (Primary)：</strong>选择运营时间长、具备物理专线双冗余的企业级服务商（首推 <a href="/reviews/guangsu">光速云</a>）。满足日常 99% 的重度生产力、超高清会议与大流量需求。</li>
          <li><strong>容灾线路 (Secondary / Failover)：</strong>选择一家不限时永久计费或极低门槛的备用梯子（如 <a href="/reviews/xingdaomeng">星岛梦</a> 的不限时包，或 <a href="/reviews/dalaoyun">大佬云</a> 的 5.6 元小额包）。平时不产生高额闲置续费支出，一旦主力机场发生光缆抢修，客户端在秒级内无缝倒换接管。</li>
        </ol>

        <h3>13.2 跨境电商与外贸卖家的“固定独立 IP”防关联红线</h3>
        <p>
          许多跨境电商卖家最常犯的致命错误就是直接使用普通机场的万人共享动态节点登录店铺后台。
        </p>
        <p>
          Amazon、PayPal、Stripe 拥有全球最严苛的账号风控反作弊系统。如果你的店铺在上午使用的是香港机房 IP A，下午自动漂移到了日本机房 IP B，且该 IP 在同一天内还被成百上千名其他用户登录过其他账号，风控系统会立刻判定该店铺存在“异地被盗”或“多店铺违规关联”，直接导致资金冻结封店。
        </p>
        <p>
          <strong>电商外贸合规出海方案：</strong>
          普通翻墙机场仅用于日常 Google 查资料、看市场趋势；而登录核心店铺后台、收付款网关时，必须使用<strong>固定独享原生住宅 IP</strong> 或选择如光速云提供的“按需私人定制独享专线（为每位用户分配专属独立带宽与原生静态 IP，多端同时在线无门槛）”。
        </p>

        <h3>13.3 客户端自动故障自愈（Health-Check 与 URL-Test）实操配置</h3>
        <p>
          在高级客户端（如 Clash Verge Rev、Stash）中，你可以通过编写策略组实现完全无人值守的节点自动倒换：
        </p>
        <div class="code-preview-box">
          <pre><code># 示例：Clash Verge Rev 自动健康探测与故障自愈策略组配置
proxy-groups:
  # 自动选择延迟最低的可用专线节点
  - name: ⚡ 自动专线容灾
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
      - 光速云-香港IEPL专线01
      - 光速云-香港IEPL专线02
      - 光速云-日本IEPL专线01
      - 备用机场-香港中转01

  # 当主力机场全部故障时触发备用节点
  - name: 🛡️ 极端故障降级组
    type: fallback
    url: http://www.gstatic.com/generate_204
    interval: 180
    proxies:
      - ⚡ 自动专线容灾
      - 备用应急节点-台湾</code></pre>
        </div>
        <p class="mt-xs">
          通过上述策略组，客户端每隔 5 分钟向 Google 探针发起一次极其轻微的 HTTP 204 健康度检查。只要当前节点网络丢包或超时，流量在 0.5 秒内自动滑移至备用可用节点，彻底告别人工手动选节点的烦恼。
        </p>
      </div>
    </section>
`;

// Insert extra chapters right before Section 10: Internal Links Matrix
page = page.replace('    <!-- Section 10: Internal Links Matrix -->', extraChapters + '\n    <!-- Section 14: Internal Links Matrix -->');

// Also update Section 10 to Section 14
page = page.replace('<h2>十、主题内链矩阵与后续实战操作指南</h2>', '<h2>十四、主题内链矩阵与后续实战操作指南</h2>');

// Update table of contents
const updatedToc = `        <a href="#section-1" class="toc-link">1. 快速决策：2026 线路与协议核心结论</a>
        <a href="#section-2" class="toc-link">2. 物理层架构：IEPL / IPLC / 中转 / 直连</a>
        <a href="#section-3" class="toc-link">3. GFW 核心检测防御机制演进与对抗</a>
        <a href="#section-4" class="toc-link">4. 协议演进史：从 SS 到 VLESS 与 Hy2</a>
        <a href="#section-5" class="toc-link">5. 晚高峰雪崩排障：延迟、丢包与吞吐</a>
        <a href="#section-6" class="toc-link">6. TCP 拥塞控制：BBR vs CUBIC 深度剖析</a>
        <a href="#section-7" class="toc-link">7. AI 与流媒体解锁：机房 IP vs 原生住宅 IP</a>
        <a href="#section-8" class="toc-link">8. 场景决策树：不同人群预算选型指南</a>
        <a href="#section-9" class="toc-link">9. 深度 FAQ：边界问题与硬核技术解惑</a>
        <a href="#section-11" class="toc-link">10. 运营商骨干网：电信 163 / CN2 / 联通 / 移动</a>
        <a href="#section-12" class="toc-link">11. DNS 泄漏与 Fake-IP 终极防劫持</a>
        <a href="#section-13" class="toc-link">12. 企业级多活容灾与电商防关联独立 IP</a>
        <a href="#section-14" class="toc-link">13. 主题内链矩阵与后续实操</a>`;

page = page.replace(/<div class="nav-links-grid">[\s\S]*?<\/div>/, '<div class="nav-links-grid">\n' + updatedToc + '\n      </div>');

// Write back
fs.writeFileSync("src/pages/knowledge.astro", page, "utf-8");
console.log("Successfully appended deep chapters to src/pages/knowledge.astro");
