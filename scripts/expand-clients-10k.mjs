import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/clients.astro', 'utf8');

// Add 4 more real-world high-value FAQ entries to reach 10,000+ pure Chinese characters
const extraFaqs = `  {
    q: "为什么在客户端更新订阅时提示「Network Error」或「Invalid Config Format」？",
    a: "这通常由两种情况导致：一是机场下发的配置文件编码格式或者特殊字符（如部分机场节点名包含生僻 emoji 或未转义反斜杠）破坏了标准 YAML 的缩进解析结构。解决办法是在客户端设置中切换核心为支持宽容解析的 Mihomo 核心，或勾选「订阅转换服务」将原链接转为纯净标准配置；二是由于本地 DNS 污染导致无法解析机场订阅域名的真实 IP，尝试在手机使用 4G/5G 热点更新一次，或者在路由器中将主 DNS 修改为公共无污染 DNS 223.5.5.5 后重试即可成功拉取。",
  },
  {
    q: "开启代理后，部分国产游戏（如英雄联盟国服、原神国服）提示连接服务器失败怎么办？",
    a: "国产大型网络游戏通常拥有独立的防外挂通信协议与严格的境内服务器握手校验。如果客户端开启了「TUN 虚拟网卡模式」，游戏流量被强行打包送入代理隧道，容易因非白名单 IP 触发游戏反作弊安全保护。解决方案：在客户端设置中，将该游戏的执行文件路径（如 LeagueClient.exe 或 YuanShen.exe）加入「TUN 排除进程名单（Process Exclusion List）」，或者在分流规则中加入针对游戏服务器域名的 DIRECT 强制直连规则，让游戏封包直接走本地宽带直通。",
  },
  {
    q: "什么是客户端的混合端口（Mixed Port）？如何利用它给局域网其他电脑做代理转发？",
    a: "混合端口是指客户端在本地监听的一个特殊网络端口（Clash 默认为 7897，旧版为 7890），它能够智能自适应识别客户端传入的是 HTTP 报文还是 SOCKS5 握手，无需用户在不同协议之间手动切换端口号。如果你在设置中开启了「允许局域网连接（Allow LAN）」，同局域网内的其他设备（如另一台笔记本、虚拟机或电视盒子）只需在其系统的网络代理设置中，将代理 IP 填为你这台电脑的局域网 IP（如 192.168.1.50），端口填 7897，即可无需安装任何客户端直接共享这台电脑的极速专线节点！",
  },
  {
    q: "如何防止机场服务商通过订阅链接记录我的真实客户端类型与 IP 访问偏好？",
    a: "当你向机场服务器拉取节点配置时，客户端会在 HTTP 请求头中携带标准的 User-Agent（用户代理标识，如 ClashforWindows/0.20.39 或 Shadowrocket/2.2.55）。如果你极为看重个人网络痕迹隐私，可以在高级客户端中自定义请求头（User-Agent Override），伪装成普通的 Chrome 浏览器或 curl 命令行发起拉取。此外，通过配置每 24 小时或 48 小时定时增量拉取，避免毫秒级频繁访问，可以有效消除网络行为指纹特征，确保个人数字身份的绝对安全。",
  },
`;

// Insert into clientFaq array
content = content.replace(/const clientFaq = \[/, 'const clientFaq = [\n' + extraFaqs);

// Also add a chapter on Protocol Compatibility Matrix (Xray vs sing-box vs Mihomo)
const protocolCompatibilityChapter = `
    <!-- Chapter 15: Core Engines Comparison (Mihomo vs Xray vs sing-box) -->
    <section id="section-core" class="clients-section">
      <div class="section-tag">Core Engine Comparison</div>
      <h2>十五、三大代理核心引擎深度横评：Mihomo vs Xray vs sing-box</h2>
      <p class="lead-text">
        几乎所有图形客户端的本质，都是给底层的开源核心包上一层易于操作的 UI 界面。真正决定连接稳定性、CPU 算力消耗与抗封锁上限的，是客户端所搭载的内核引擎。
      </p>

      <div class="table-scroll-container">
        <table class="monograph-table">
          <thead>
            <tr>
              <th>核心引擎名称</th>
              <th>主导设计哲学</th>
              <th>协议支持亮点</th>
              <th>内存开销与性能表现</th>
              <th>适用目标人群</th>
            </tr>
          </thead>
          <tbody>
            <tr class="highlight-row">
              <td><strong>Mihomo (Clash Meta)</strong></td>
              <td>规则分流的绝对霸主，专为复杂策略组而生</td>
              <td>原生支持 SS-2022、VLESS、Trojan、Hysteria2、TUIC</td>
              <td>中等偏低，Go 语言优化极佳，长期运行零内存泄漏</td>
              <td>绝大多数桌面用户、软路由玩家与日常出海办公群体</td>
            </tr>
            <tr>
              <td><strong>Xray-core</strong></td>
              <td>深度包检测对抗先驱，前沿伪装黑科技试验场</td>
              <td>首创 VLESS Reality、XTLS Vision，抗封锁能力行业顶级</td>
              <td>极低，单线程性能优异，针对 Linux 服务器与安卓极致轻量</td>
              <td>追求极致隐蔽抗封锁的极客、自建节点玩家与移动端</td>
            </tr>
            <tr>
              <td><strong>sing-box</strong></td>
              <td>新生代全能通用通用通用核心，标准化跨平台架构</td>
              <td>全协议覆盖，原生跨平台 API 接口设计极其现代化</td>
              <td>极低，启动飞快，资源占用控制在三大核心中最极致</td>
              <td>嵌入式开发、移动端 App 深度集成与多平台统一配置</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="deep-guide-block mt-m">
        <p><strong>工程选型总结：</strong> 如果你习惯了直观的多层策略组分流（如按国家自动优选、按应用指定节点），基于 <strong>Mihomo 内核</strong>的客户端（如 Clash Verge Rev、FlClash）是 2026 年毫无争议的综合体验第一梯队；如果你在某些特定高审查网络环境下需要用到最前沿的 XTLS 偷取证书特性，搭配 <strong>Xray 内核</strong>的 v2rayN 是最可靠的保底工具。</p>
      </div>
    </section>
`;

content = content.replace(/<!-- Chapter 15: Deep FAQ -->/, protocolCompatibilityChapter + '\n\n    <!-- Chapter 16: Deep FAQ -->');

// Update FAQ Schema in ASTRO head
content = content.replace(/headline: "2026 翻墙机场代理客户端全平台下载与配置教程 \(Windows\/Mac\/iOS\/Android\/软路由专著级全景指南\)",/, 'headline: "2026 翻墙机场代理客户端全平台下载与配置教程 (Windows/Mac/iOS/Android/软路由专著级万字白皮书)",');

fs.writeFileSync('myscholar/src/pages/clients.astro', content, 'utf8');
console.log('Successfully added extra FAQs and Core Engine Comparison chapter!');
