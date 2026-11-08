import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/clients.astro', 'utf8');

// Add 3 rich deep chapters before FAQ to easily surpass 10,000 pure Chinese characters:
// 1. Chapter on Routing Rules & GeoIP / GeoSite engineering deep dive
// 2. Chapter on Multi-platform Performance Tuning & Battery / Memory footprint
// 3. Chapter on Terminal / IDE / Developer specific environment proxy mastery (Docker, WSL2, Git, Python, Node, Cursor)

const deepChapters = `
    <!-- Chapter 10: Routing Rules & Rule-sets Engineering -->
    <section id="section-rules" class="clients-section">
      <div class="section-tag">Routing Rules Deep Dive</div>
      <h2>十、分流规则集与 GeoIP / GeoSite 路由机制全景解析</h2>
      <p class="lead-text">
        许多初学者常常把客户端仅仅当成一个“开关”，却忽视了客户端最核心的技术灵魂——<strong>智能分流路由引擎</strong>。如果规则配置不当，轻则导致国内 App 访问延迟激增数十倍，重则导致关键外贸业务与本地网银风控锁卡。
      </p>

      <div class="deep-guide-block">
        <h3>10.1 规则分流的三大黄金定律</h3>
        <p>现代客户端（如 Clash Verge Rev、v2rayN、Shadowrocket）普遍遵循从上到下的顺序匹配原则（First-Match-Win）。一条数据包进入客户端后，会依次经过以下判断逻辑：</p>
        <ul>
          <li><strong>第一定律：局域网与私有地址强制直连（DIRECT）</strong>——包含 <code>127.0.0.1</code>、<code>192.168.0.0/16</code>、<code>10.0.0.0/8</code> 以及本地局域网广播地址，必须无条件绕过代理，确保你访问家里 NAS、局域网打印机与路由器后台畅通无阻。</li>
          <li><strong>第二定律：中国大陆境内域名与 IP 资产强制直连（GeoSite:CN & GeoIP:CN）</strong>——通过本地预加载的中国域名白名单（包括阿里、腾讯、百度、字节跳动、各大商业银行与政府政务网站）以及中国三大运营商自治系统号（ASN）IP 库，只要目标属于境内网络，全部直接走本地运营商出口，享受原生百兆千兆带宽。</li>
          <li><strong>第三定律：境外敏感服务精准策略组调度（PROXY / REJECT）</strong>——对于 Google、YouTube、GitHub、OpenAI、Netflix、Telegram 等特定服务，自动派发给指定国家或专线策略组；对于已知恶意广告、遥测追踪与挖矿木马域名，直接执行 <code>REJECT</code> 本地阻断，既净化网络环境又大幅节省机场流量。</li>
        </ul>

        <h3 class="mt-m">10.2 传统 GeoIP.dat 与现代 Rule-Set 规则集的技术代差</h3>
        <p>在旧版客户端时代，分流严重依赖打包下载的单体 <code>geoip.dat</code> 和 <code>geosite.dat</code> 二进制文件。随着国际大厂 CDN 节点遍布全球与 Anycast 广播技术的广泛应用，传统静态 IP 库经常出现误判。</p>
        <p>以 Mihomo 内核为代表的现代客户端全面升级为<strong>基于 Behavior（行为）与在线订阅的 Rule-Set（规则集）</strong>。例如使用 Loyalsoldier 或 ACL4SSR 的云端规则集，客户端每天在后台静默拉取增量更新，精准识别最新上线的 AI 平台与海外流媒体 CDN IP 段，避免因本地规则陈旧而导致无法解锁的情况发生。</p>
      </div>
    </section>

    <!-- Chapter 11: Developer Environments Mastery (Git, Docker, WSL2, IDE) -->
    <section id="section-dev" class="clients-section">
      <div class="section-tag">Developer & Production Mastery</div>
      <h2>十一、软件工程师与科研人员：全开发环境代理无缝穿透方案</h2>
      <p class="lead-text">
        对于从事人工智能训练、全栈开发及学术论文写作的专业技术人员，操作系统的桌面浏览器往往只是极小一部分需求。真正耗费大量等待时间的，是命令行拉取海外依赖、Docker 容器构建、WSL2 子系统通信以及 HuggingFace 大模型权重下载。
      </p>

      <div class="summary-cards-grid">
        <div class="sum-card win-border">
          <div class="sum-badge win-bg">Git 极速穿透</div>
          <h3>Git 命令行全局代理</h3>
          <p class="sum-core">解决 GitHub clone 只有几 KB 或中途断连</p>
          <pre><code># 针对 GitHub 域名单独设置代理（最推荐）
git config --global http.https://github.com.proxy http://127.0.0.1:7897
git config --global https.https://github.com.proxy http://127.0.0.1:7897

# 恢复默认（取消代理）
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy</code></pre>
        </div>

        <div class="sum-card mac-border">
          <div class="sum-badge mac-bg">Docker 镜像加速</div>
          <h3>Docker Daemon 构建穿透</h3>
          <p class="sum-core">彻底解决 Dockerfile 从 gcr.io / ghcr.io 拉取镜像超时</p>
          <pre><code># 编辑 /etc/docker/daemon.json
{
  "proxies": {
    "http-proxy": "http://127.0.0.1:7897",
    "https-proxy": "http://127.0.0.1:7897",
    "no-proxy": "localhost,127.0.0.1,local.internal"
  }
}
# 重启生效: sudo systemctl restart docker</code></pre>
        </div>

        <div class="sum-card android-border">
          <div class="sum-badge android-bg">WSL2 子系统</div>
          <h3>Windows WSL2 穿透宿主机代理</h3>
          <p class="sum-core">在 Ubuntu / Debian 子系统中秒级共享 Windows 专线连接</p>
          <pre><code># 在 WSL2 的 ~/.bashrc 中加入：
host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
export http_proxy="http://$host_ip:7897"
export https_proxy="http://$host_ip:7897"
export all_proxy="socks5://$host_ip:7897"
# 并在 Windows 客户端设置中开启「允许局域网连接（Allow LAN）」</code></pre>
        </div>

        <div class="sum-card ios-border">
          <div class="sum-badge ios-bg">Python / Node 生态</div>
          <h3>pip 与 npm 依赖下载提速</h3>
          <p class="sum-core">解决 PyTorch、TensorFlow 及海外 npm 包下载缓慢</p>
          <pre><code># pip 命令行临时走代理
pip install torch --proxy http://127.0.0.1:7897

# npm 代理配置
npm config set proxy http://127.0.0.1:7897
npm config set https-proxy http://127.0.0.1:7897</code></pre>
        </div>
      </div>
    </section>

    <!-- Chapter 12: Performance & Memory Footprint Tuning -->
    <section id="section-perf" class="clients-section">
      <div class="section-tag">Performance & Battery Optimization</div>
      <h2>十二、性能调优：低功耗省电、防内存泄漏与极端弱网抗卡顿指南</h2>
      <p class="lead-text">
        很多人习惯将客户端常驻电脑或手机后台，但不同客户端在持续运行 24 小时后的资源开销差异极大。以下为针对性调优策略：
      </p>

      <div class="deep-guide-block">
        <h3>12.1 警惕日志等级（Log Level）对磁盘与内存的隐形吞噬</h3>
        <p>几乎所有基于 Golang 编写的内核在默认 Debug 调试模式下，会对每一次网络连接握手、DNS 查询甚至每一个丢弃的数据包记录详细日志。长时间运行会导致日志文件迅速膨胀到数百兆甚至数千兆，频繁的磁盘 I/O 写入还会严重拖慢笔记本固态硬盘性能并显著增加电池耗电。</p>
        <p><strong>优化建议：</strong> 在客户端设置中，将「日志等级（Log Level）」由 <code>Debug / Info</code> 严格修改为 <code>Warning</code> 或 <code>Silent (静默)</code>。这样内核仅在发生无法恢复的致命异常时才写入日志，日常零额外 I/O 损耗，使笔记本续航直接增加 15% 到 25%！</p>

        <h3 class="mt-m">12.2 节点并发测速策略的合理设置</h3>
        <p>许多初学者喜欢频繁点击「全部测速」按钮。在导入包含 100+ 个节点的订阅时，客户端会瞬间向全球 100 多个服务器同时发起 TCP 握手与并发测速。这不仅会在瞬间占满你的本地家庭上行带宽，导致短时间内正在进行的游戏或视频连麦剧烈掉帧，还容易触发部分严格机场后台的“高频并发扫描防御机制”而导致订阅临时被锁 15 分钟。</p>
        <p><strong>优化建议：</strong> 避免盲目频繁点击全节点并发测速；建议只对当前常用国家（如香港、日本、新加坡）的特定策略组按需单组测速。在日常使用中，让客户端内置的自适应算法根据实际访问的 RTT（往返时延）自动优选即可。</p>
      </div>
    </section>
`;

// Insert the deep chapters right before FAQ section
content = content.replace(/<!-- Chapter 10: Deep FAQ -->/, deepChapters + '\n\n    <!-- Chapter 13: Deep FAQ -->');

// Also update TOC navigation links in clients.astro
const newClientsNav = `    <!-- Table of Contents / Navigation Anchor Bar -->
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
        <a href="#section-rules" class="toc-link"><span class="toc-num">10</span> 分流规则集与 GeoIP/GeoSite 路由机制</a>
        <a href="#section-dev" class="toc-link"><span class="toc-num">11</span> 开发者环境：Git/Docker/WSL2/IDE 穿透</a>
        <a href="#section-perf" class="toc-link"><span class="toc-num">12</span> 性能调优：低功耗省电与防内存泄漏</a>
        <a href="#section-faq" class="toc-link"><span class="toc-num">13</span> 深度常见问题与排障锦囊 (8大痛点解答)</a>
        <a href="#section-cluster" class="toc-link"><span class="toc-num">14</span> 站内延伸阅读与核心枢纽连接</a>
      </div>
    </div>`;

content = content.replace(/<!-- Table of Contents \/ Navigation Anchor Bar -->[\s\S]*?<!-- Chapter 1: 3-Minute Universal Workflow -->/, newClientsNav + '\n\n    <!-- Chapter 1: 3-Minute Universal Workflow -->');

fs.writeFileSync('myscholar/src/pages/clients.astro', content, 'utf8');
console.log('Successfully expanded clients.astro with developer & routing chapters!');
