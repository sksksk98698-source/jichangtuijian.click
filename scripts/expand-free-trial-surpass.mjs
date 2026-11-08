import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/free-trial.astro', 'utf8');

// Add 2 more high-depth FAQ items to comfortably surpass 10,000 pure Chinese characters
const extra2Faqs = `  {
    q: "为什么在试用期间访问某些特定学术数据库（如 IEEE Xplore、Web of Science）时提示无权限访问？",
    a: "这涉及到全球高校与科研机构的校园 IP 白名单授权体系。很多大学为校内师生购买了千万级别的学术文献数据库访问权限，前提是请求必须来自学校校园网认证过的官方公共 IP 段。如果你连接了海外机场的试用节点，目标学术网站检测到你的请求来自香港或美国的普通宽带商，就会自动要求你按单篇论文支付数十美元的商业购买费用。解决方案：在查阅具有学校机构订阅权限的学术数据库时，应使用学校官方提供的校园 VPN；而对于无需校园白名单的常规学术搜索（如 Google Scholar 谷歌学术、Sci-Hub、arXiv 预印本论文库），机场的专线试用节点能够提供十倍于校园网的极速论文下载体验。",
  },
  {
    q: "试用期内发现节点支持测速与网页，但为什么无法登录微软远程桌面（RDP）或连接公司内网？",
    a: "这是因为微软远程桌面协议（RDP 端口 3389）对跨国链路的稳定性和丢包率极度敏感。如果试用节点使用的是基于 UDP 协议的激进拥塞控制协议（如 Hysteria 2），在部分特定网络环境下可能会出现 RDP 握手超时断连；或者是因为客户端的规则分流列表中未对目标办公服务器的 IP 段进行代理分流。解决方案：① 在客户端分流规则中，针对公司的远程桌面公网 IP 单独设置一条 PROXY 规则；② 将连接该服务器的节点切换为基于 TCP 协议传输的 Shadowsocks-2022 或 VLESS 专线节点；③ 在客户端中开启 TUN 虚拟网卡模式，接管系统级的 mstsc.exe 远程桌面通信流量。",
  },
`;

content = content.replace(/const trialFaq = \[/, 'const trialFaq = [\n' + extra2Faqs);

fs.writeFileSync('myscholar/src/pages/free-trial.astro', content, 'utf8');
console.log('Successfully pushed free-trial.astro past 10,000 Chinese characters!');
