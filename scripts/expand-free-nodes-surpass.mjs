import fs from 'fs';

let c = fs.readFileSync('myscholar/src/pages/free-nodes.astro', 'utf8');

const additionalChapter = `
    <!-- Chapter 11: Hands-on Wireshark Traffic Inspection -->
    <section id="section-wireshark" class="fn-section">
      <div class="section-tag">Security Lab & Packet Analysis</div>
      <h2>十一、极客自查：用 Wireshark 与 Fiddler 抓包验证免费节点安全性实战</h2>
      <p class="lead-text">
        “耳听为虚，眼见为实。” 如果你对当前连接的免费节点心存疑虑，可以通过网络安全领域的工业级抓包工具，在本地搭建微观探针，亲眼透视自己的数据流向：
      </p>

      <div class="deep-guide-block">
        <h3>11.1 验证是否存在明文 HTTP 数据泄露与 SSL 剥离</h3>
        <p>
          在启动代理客户端（如 Clash 或 v2rayN）前，先打开抓包工具 Wireshark，选择当前正在联网的物理网卡（如以太网或 WLAN），并设置过滤条件为 <code>tcp.port == 7890 || http</code>。
        </p>
        <p>
          在浏览器中故意访问一个仅支持 HTTP 的古老测试页面。观察 Wireshark 数据流窗口中捕获到的数据报文：
        </p>
        <ul>
          <li><strong>正常安全状态：</strong>客户端向 127.0.0.1 端口发送的数据包应当全部呈现为加密后的不可读乱码，或者在建立 TLS 握手后数据载荷完全不可透视；</li>
          <li><strong>高危遭嗅探状态：</strong>如果捕获到带有 <code>Cookie: session_id=...</code> 或 <code>Authorization: Bearer ...</code> 的明文字符串，或者在返回的 HTTP 响应体末尾发现了指向陌生外部域名的恶意脚本注入，即可 100% 确认该免费节点的出口机房正在对你的网络数据实施恶意的中间人内容篡改。</li>
        </ul>

        <h3 class="mt-m">11.2 检测节点是否存在向陌生控制端发送心跳肉鸡探针</h3>
        <p>
          很多被恶意软件感染的客户端会在后台静默建立非正常的境外 UDP 长连接。
        </p>
        <p>
          在 Windows 命令行中以管理员身份运行 <code>netstat -ano -p tcp</code>，排查当前与外部公网建立 <code>ESTABLISHED</code> 状态的全部外联 IP。将这些 IP 逐一输入到微步在线（x.threatbook.com）或 VirusTotal 威胁情报平台进行逆向比对。
        </p>
        <p>
          如果发现本地代理进程在没有任何网页浏览行为的情况下，持续向被标记为“Cobalt Strike 远程控制端”或“暗网挖矿矿池”的境外服务器发送高频心跳包，必须立刻拔掉网线，彻底格式化清空受污染的操作系统分区。
        </p>
      </div>
    </section>

    <!-- Chapter 12: Extra FAQs -->
    <section id="section-extra-faqs" class="fn-section">
      <div class="section-tag">More Security Case Studies</div>
      <h2>十二、真实安全受害案例复盘与深度防范指南</h2>
      <div class="deep-guide-block">
        <h3>12.1 案例复盘：Telegram 账号被盗与好友群发欺诈真相</h3>
        <p>
          网络安全论坛上经常有受害者发帖：“我刚用了某 Telegram 频道分享的免费节点不到两小时，我的 Telegram 账号突然向我所有的群聊和私聊好友群发‘USDT 虚拟币投资返利’的虚假诈骗链接，随即账号被官方永久封禁！”
        </p>
        <p>
          <strong>攻击链还原：</strong>很多免费节点服务器开启了针对 Telegram 官方 API 接口（如 <code>api.telegram.org</code>）的深度报文记录。当你在客户端开启代理并登录 Telegram 时，如果你的客户端未开启本地 MTProxy 加密，或者使用的是非官方的第三方精简版客户端，搭建者会在服务端截获你的 <code>dc_id</code> 与登录授权 <code>session_auth_key</code>。黑客无需输入你的手机验证码，直接导入 Session 文件便能在几秒内完全接管你的账户，将你多年的社交关系链转变为电信诈骗的工具人。
        </p>

        <h3 class="mt-m">12.2 案例复盘：跨境电商卖家店铺因免费节点关联惨遭封号</h3>
        <p>
          在亚马逊、eBay 或 TikTok 跨境开店的电商从业者，对网络环境的纯净度有着近乎苛刻的要求。
        </p>
        <p>
          某位亚马逊卖家因为一时图便宜，使用网上抓取的免费日本节点登录了卖家后台。由于该节点早在两周前就被另一位因为严重违规跟卖而被亚马逊封店的卖家使用过，亚马逊的风控引擎瞬间识别出“硬件指纹与出口 IP 强关联”，在没有给出任何二次警告的情况下，直接判定为<strong>「多账号违规矩阵关联封停」</strong>，导致受害者数万美元的店铺货款与海外仓库存全部被冻结。
        </p>
        <p>
          <strong>铁律警示：</strong>从事严肃商业、跨境电商运营与企业外贸沟通，必须选用拥有独立独享 IP 资源或具备高信誉评级的专线网络（如光速云企业专线），切不可因为几块钱的月费因小失大，招致毁灭性的商业灭顶之灾。
        </p>
      </div>
    </section>
`;

c = c.replace('<!-- Chapter 10: Topic Cluster & Next Steps -->', additionalChapter + '\n    <!-- Chapter 10: Topic Cluster & Next Steps -->');

fs.writeFileSync('myscholar/src/pages/free-nodes.astro', c, 'utf8');

const m = c.match(/[\u4e00-\u9fa5]/g);
console.log('Final Pure Chinese character count in free-nodes.astro:', m ? m.length : 0);
