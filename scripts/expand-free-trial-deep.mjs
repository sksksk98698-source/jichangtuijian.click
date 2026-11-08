import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/free-trial.astro', 'utf8');

// Add 6 comprehensive chapters to expand free-trial.astro past 10,000 pure Chinese characters:
// 1. Chapter 8: In-depth ISP routing impact on trial nodes (Telecom 163 vs CN2, Unicom, Mobile)
// 2. Chapter 9: Step-by-step verification on Streaming (Netflix / Disney+ / YouTube)
// 3. Chapter 10: Financial and Payment security during trial (Alipay / WeChat single payment vs auto-debit cards)
// 4. Chapter 11: Multi-device & Concurrency limits testing (router, mobile, PC simultaneous load)
// 5. Chapter 12: Conversion decision matrix from Trial to Official plans
// 6. 6 more in-depth FAQ questions

const extraTrialChapters = `
    <!-- Chapter 8: ISP Routing Impact on Trial Nodes -->
    <section class="trial-section">
      <div class="section-tag">ISP Trial Diagnostics</div>
      <h2>八、三大运营商实测差异：为什么同一个试用节点在电信和移动表现天差地别？</h2>
      <p class="lead-text">
        许多读者在试用时经常遇到困惑：“朋友推荐说这个试用节点飞快，为什么我连上去却只有几兆网速甚至频繁丢包？” 根本原因在于你和朋友家里的<strong>本地宽带运营商国际出口路由存在巨大代差</strong>。
      </p>

      <div class="table-scroll-container">
        <table class="monograph-table">
          <thead>
            <tr>
              <th>你的家庭宽带类型</th>
              <th>骨干网出口现状</th>
              <th>试用节点选择黄金法则</th>
              <th>最推荐试用的线路类型</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>中国电信 (China Telecom)</strong></td>
              <td>163 普通骨干网晚高峰出口极度拥挤，晚 8 点后公网直连丢包率常超 30%</td>
              <td>电信用户试用时，必须验证商家是否具备<strong>就近多线 BGP 入口与真 IEPL 专线</strong>；严禁测试纯公网直连节点。</td>
              <td>IEPL 物理专线 (如光速云香港/日本专线)</td>
            </tr>
            <tr>
              <td><strong>中国联通 (China Unicom)</strong></td>
              <td>China169 (4837) 带宽较为充沛，对日本、美西方向骨干网互联优秀</td>
              <td>联通用户试用空间最大，可重点测试日本 NTT、软银 Softbank 以及美西 9929 节点。</td>
              <td>联通 9929 优质中转 / 日本直连混合</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>中国移动 (China Mobile)</strong></td>
              <td>CMI 骨干网进出香港方向带宽极其庞大，但跨大洋访问欧美转接延迟较高</td>
              <td>移动用户试用时，<strong>首选香港 CMI / 香港 IEPL 节点</strong>，通常能以极低延迟跑满千兆带宽。</td>
              <td>香港 CMI 高速中转 / 广东移动入口专线</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="deep-guide-block mt-m">
        <h3>跨运营商试用诊断秘籍：</h3>
        <p>如果你在家里使用电信宽带试用某个节点感觉卡顿，不妨用手机开启中国移动的 5G 热点让电脑连接再试一次。如果换用移动 5G 后网速瞬间起飞，说明该机场的节点并非服务器故障，而是其境内入口对电信 163 骨干网缺乏足够的优化汇聚。真正顶级的机场（如光速云）会在全国核心城市部署电信、联通、移动三网独立入口，实现任何宽带用户连接都秒级分流至最优物理路径。</p>
      </div>
    </section>

    <!-- Chapter 9: Streaming Unlocking Verification Guide -->
    <section class="trial-section">
      <div class="section-tag">Streaming & Copyright Unlocking</div>
      <h2>九、流媒体版权库实测秘籍：如何在 10 分钟内彻底验明 Netflix 与 Disney+ 4K 解锁真伪</h2>
      <p class="lead-text">
        很多机场在宣传单上赫然写着“全节点解锁流媒体”，但在试用期间，许多用户由于缺乏辨别经验，误以为能打开 Netflix 网站就代表解锁成功，直到正式交了年费想追经典美剧时才发现被坑。
      </p>

      <div class="deep-guide-block">
        <h3>9.1 揭秘 Netflix「自制剧假解锁」的瞒天过海</h3>
        <p>Netflix 对全球所有 IP 开放其自制剧集（Netflix Originals，例如《怪奇物语》《黑镜》）。哪怕你的节点使用的是被严格拉黑的机房机房 IP，只要 IP 属于海外，你依然能顺利登录并观看这些自制剧。但这种状态属于<strong>“半解锁（未完全解锁）”</strong>！</p>
        <p><strong>实操验证黄金步骤：</strong></p>
        <ol>
          <li>连接试用节点后，打开 Netflix 搜索《绝命毒师》（Breaking Bad）、《行尸走肉》（The Walking Dead）或当季热门非自制日剧；</li>
          <li>如果搜索结果能够正常显示并直接点击播放，说明该节点具备<strong>正规原生住宅 IP 或高质量 DNS 解锁能力（完全解锁）</strong>；</li>
          <li>如果搜索页面一片空白，或者提示“抱歉，未找到相关内容”，说明该试用节点已经被 Netflix 标记为机房代理 IP，属于虚假流媒体解锁！</li>
        </ol>

        <h3 class="mt-m">9.2 Disney+ 与 YouTube Premium 跨区结账验证</h3>
        <p>除了影视播放，许多用户需要利用海外节点开通低价区会员（如乌克兰、土耳其、阿根廷或菲律宾）：</p>
        <ul>
          <li><strong>Disney+ 报错代码排查：</strong> 如果在试用节点下打开 Disney+ 出现 <code>Error 73</code> 或 <code>Error 83</code>，说明其出口 IP 段被迪士尼风控全面封杀，无法进行账号注册或视频流加载；</li>
          <li><strong>YouTube 锁区与去广告验证：</strong> 播放视频时观察前置广告是否被自动免疫，右键视频调出 Stats for nerds，观察 <code>Current Res</code> 是否能秒级锁定在 <code>3840x2160@60</code> 超清 4K 画质。</li>
        </ul>
      </div>
    </section>

    <!-- Chapter 10: Financial & Payment Safety during Trial -->
    <section class="trial-section">
      <div class="section-tag">Payment & Identity Safety</div>
      <h2>十、试用期资金与支付安全底线：彻底告别自动续费扣款陷阱</h2>
      <p class="lead-text">
        在互联网上寻找试用资源时，保护好自己的银行卡与支付资产是绝对的第一原则。很多海外软件打着“7天免费试用”的旗号，实际要求预先绑定国际信用卡（Visa / MasterCard），并在试用期结束的瞬间悄悄扣除高达数百美元的年费。
      </p>

      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="p-icon">💳</div>
          <h3>坚决拒绝强制绑定信用卡的试用</h3>
          <p>正规国内出海机场绝不需要用户输入任何真实的信用卡卡号、CVV 安全码或有效期。凡是强制要求输入实体信用卡信息的所谓“免费试用机场”，99% 存在后续隐性自动扣款、甚至盗刷信用卡买数字货币的巨大黑产风险！</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">📱</div>
          <h3>支付宝 / 微信单次扫码支付的绝对安全</h3>
          <p>国内正规机场收银台（如光速云、微风网络等）采用支付宝或微信支付。在支付 1 元体验包或小额按量套餐时，每一笔交易都是<strong>单次独立授权支付</strong>。不存在任何系统级别的后台代扣协议，试用期结束后系统绝不可能在未授权的情况下扣掉你一分钱。</p>
        </div>

        <div class="pillar-card">
          <div class="p-icon">📧</div>
          <h3>邮箱隐私隔离实操技巧</h3>
          <p>在注册试用账号时，切忌使用自己日常用于绑定银行卡、微信或重要社交平台的核心邮箱。建议使用专门的出海测试邮箱（如单独注册一个 Outlook 别名或 ProtonMail 匿名邮箱），即便后续不再使用该机场，也能彻底免除任何商业推广邮件的骚扰。</p>
        </div>
      </div>
    </section>

    <!-- Chapter 11: Multi-Device and Concurrency Stress Testing -->
    <section class="trial-section">
      <div class="section-tag">Concurrency Stress Testing</div>
      <h2>十一、试用期多设备与并发承载压力测试：揭开后端集群真实实力</h2>
      <p class="lead-text">
        很多用户在试用时只拿一台手机连上去刷刷网页，觉得挺流畅就草率付款；结果买回家后，把家里的电脑、平板、甚至软路由全部连上时，网络立刻开始疯狂报错跳断。
      </p>

      <div class="deep-guide-block">
        <h3>11.1 并发设备限制与 IP 连接池弹性</h3>
        <p>在试用期内，你必须模拟你未来的真实业务并发场景：</p>
        <ul>
          <li><strong>双设备双向压测：</strong> 用电脑播放 YouTube 4K 视频的同时，用手机进行微信语音或外服游戏联机。观察两台设备是否出现互相抢占带宽、或者其中一台设备被强制踢下线的情况；</li>
          <li><strong>长连接保活稳定性：</strong> 在电脑后台挂载一个需要持久 TCP 连接的程序（如海外 SSH 终端、Git 代码拉取、或 Telegram 客户端），连续保持静置 2 小时。观察试用节点的 NAT 映射表是否会自动超时断开，检验商家后端负载均衡集群的心跳保活算法是否健全。</li>
        </ul>

        <h3 class="mt-m">11.2 节点更新机制与自动化解析</h3>
        <p>在试用期间，故意在客户端中手动点击「更新订阅（Update Subscription）」3 到 5 次。观察机场后台的订阅下发服务器是否能在 1 秒内迅速响应；如果拉取订阅频繁报错 <code>502 Bad Gateway</code> 或 <code>DNS Query Failed</code>，说明该商家的网站基础设施抗压能力孱弱，未来一旦遭遇网络攻击极易彻底失联。</p>
      </div>
    </section>

    <!-- Chapter 12: Decision Matrix from Trial to Official Purchase -->
    <section class="trial-section">
      <div class="section-tag">Conversion Strategic Roadmap</div>
      <h2>十二、试用转正决策全景树：如何从容挑选最适合你的正式套餐</h2>
      <p class="lead-text">
        通过上述严格的晚高峰单线程压测、流媒体 4K 验证、AI 欺诈分查询与多设备并发测试后，你已经掌握了最客观的真实数据。接下来如何从试用过渡到正式套餐？请遵循以下清晰决策分支：
      </p>

      <div class="summary-cards-grid">
        <div class="sum-card green-border">
          <div class="sum-badge green-bg">分支 1：追求极致生产力</div>
          <h3>外贸跨境办公 / AI 核心开发</h3>
          <p class="sum-core">转正建议：直接锁定「光速云」旗舰 IEPL 专线年付/半年付</p>
          <p class="sum-reason">如果你通过 1 元体验包验证了其晚高峰 0 丢包率与 ChatGPT 免风控实力，直接按年订阅折算下来每个月仅约 8 元，相当于每天两毛钱买断全天候稳定的生产力保障，性价比全网无出其右。</p>
        </div>

        <div class="sum-card blue-border">
          <div class="sum-badge blue-bg">分支 2：影音大流量追剧</div>
          <h3>YouTube / Netflix / 大文件下载</h3>
          <p class="sum-core">转正建议：选择「微风网络」或「飞猫云」大流量月付套餐</p>
          <p class="sum-reason">每月需求 300GB 以上的大流量追剧党，试用满意后先购买 1 个月常规套餐（¥10-20/月），确认跨月续费顺畅无坑后再做长期打算。</p>
        </div>

        <div class="sum-card android-border">
          <div class="sum-badge android-bg">分支 3：极低频与防失联备用</div>
          <h3>偶发性学术查阅 / 备用二号梯</h3>
          <p class="sum-core">转正建议：购买「星岛梦」5元按量不过期包</p>
          <p class="sum-reason">不买任何固定月租套餐！充值 5-10 元买断几十个 G 流量长期备用，放在客户端中安心躺平，只有在查资料或主力机场大修时才消耗，零持续资金损耗。</p>
        </div>
      </div>
    </section>
`;

// Insert the extra chapters right before the final FAQ
content = content.replace(/<!-- Chapter 8: Comprehensive Trial FAQ -->/, extraTrialChapters + '\n\n    <!-- Chapter 13: Comprehensive Trial FAQ -->');

// Add 4 more high-value FAQ questions to trialFaq
const extraTrialFaqs = `  {
    q: "为什么有的机场试用套餐里面只开放香港和日本节点，欧美节点全部变灰不可选？",
    a: "这是机场运营方的带宽成本控制策略。香港和日本节点属于亚太近端网络，延迟低且调度效率高；而欧美节点需要跨大洋海缆，或者属于高成本的特定原生住宅 IP 节点。部分商家为了防止白嫖党在试用期内恶意刷取大容量欧美跨洋带宽，会在试用分组中默认锁定欧美或特定流媒体节点。如果你的核心需求是使用美国原生 IP 访问特定金融或学术网站，建议选择像光速云这种开放完整全节点专线体验的 1 元高规格体验包进行测试。",
  },
  {
    q: "试用期内测速非常快，但为什么用下载工具（如 IDM、迅雷或 BitTorrent）下载文件却完全没有速度？",
    a: "这涉及到机场的使用守则（AUP）与协议限制。绝大多数正规商业机场在全节点规则中严格审计并禁止了 BitTorrent（BT 下载 / P2P 下载 / PT 做种）。因为 P2P 下载会在短时间内产生海量的瞬时高频 UDP 连接并侵犯海外数字版权，导致境外机房收到版权机构的 DMCA 警告信甚至直接扣押服务器。试用期间严禁使用 BT/迅雷挂机下载；如果需要下载大文件，建议通过普通的浏览器多线程下载（如 IDM 抓取 HTTPS 直链），此种流量受专线正常加速保护。",
  },
  {
    q: "在手机上测试试用节点很流畅，为什么导入电脑后却完全连不上？",
    a: "常见原因有三个：① 操作系统时间未同步：电脑主板电池老化或系统时间与北京时间误差超过 60 秒，导致加密协议握手失败，在 Windows 设置中点击「立即同步时间」即可恢复；② 本地杀毒软件或防火墙拦截：部分杀毒软件会拦截客户端在本地建立的虚拟代理端口，尝试将客户端添加为信任应用；③ 导入的订阅格式不兼容：手机端可能使用的是小火箭专有格式，而电脑 Clash 需要标准 YAML 格式，在机场后台重新复制专门的「Clash 订阅链接」重新导入即可解决。",
  },
  {
    q: "为什么说支持「按量付费」的机场是检验服务商技术底气的重要标志？",
    a: "因为按量付费模式下，商家无法通过“每月清空未用流量”来沉淀资金死水，用户的每一分钱都必须严格对应真实的带宽消耗。如果商家的线路质量差、经常卡顿断流，按量付费的用户立刻就会转投他处，商家根本无法留存资金。敢于长期开放低门槛按量付费（如星岛梦、大佬云）的服务商，通常对其底层的动态自愈架构与节点可用率具备极高的技术自信，极其适合作为用户的常驻避风港。",
  },
`;

content = content.replace(/const trialFaq = \[/, 'const trialFaq = [\n' + extraTrialFaqs);

fs.writeFileSync('myscholar/src/pages/free-trial.astro', content, 'utf8');
console.log('Successfully expanded free-trial.astro with extra deep chapters and FAQs!');
