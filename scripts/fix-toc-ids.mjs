import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/knowledge.astro', 'utf8');

const newNav = `    <!-- Table of Contents / Executive Summary -->
    <div class="quick-nav-box">
      <div class="nav-box-header">
        <span class="nav-icon">🧭</span>
        <strong>专著级全景导航（点击直达对应章节与核心图表）</strong>
      </div>
      <div class="nav-links-grid">
        <a href="#section-1" class="toc-link"><span class="toc-num">01</span> 快速决策：2026 线路与协议核心结论</a>
        <a href="#section-2" class="toc-link"><span class="toc-num">02</span> 物理层架构：IEPL / IPLC / 中转 / 直连</a>
        <a href="#section-3" class="toc-link"><span class="toc-num">03</span> GFW 核心检测防御演进与微观对抗</a>
        <a href="#section-4" class="toc-link"><span class="toc-num">04</span> 协议演进史：从 SS 到 VLESS 与 Hy2</a>
        <a href="#section-5" class="toc-link"><span class="toc-num">05</span> 晚高峰雪崩排障：延迟、丢包与吞吐</a>
        <a href="#section-6" class="toc-link"><span class="toc-num">06</span> TCP 拥塞控制：BBR vs CUBIC 深度剖析</a>
        <a href="#section-7" class="toc-link"><span class="toc-num">07</span> AI 与流媒体解锁：机房 IP vs 原生住宅 IP</a>
        <a href="#section-8" class="toc-link"><span class="toc-num">08</span> 场景决策树：不同人群预算选型指南</a>
        <a href="#section-9" class="toc-link"><span class="toc-num">09</span> 深度 FAQ：边界问题与硬核技术解惑</a>
        <a href="#section-10" class="toc-link"><span class="toc-num">10</span> 运营商骨干网：电信 163 / CN2 / 联通 / 移动</a>
        <a href="#section-11" class="toc-link"><span class="toc-num">11</span> DNS 泄漏与 Fake-IP 终极防劫持</a>
        <a href="#section-12" class="toc-link"><span class="toc-num">12</span> 企业级多活容灾与电商防关联独立 IP</a>
        <a href="#section-13" class="toc-link"><span class="toc-num">13</span> 权威代表服务商参数与选型卡片</a>
        <a href="#section-14" class="toc-link"><span class="toc-num">14</span> 主题内链矩阵与后续实战部署</a>
      </div>
    </div>`;

// Replace nav box
content = content.replace(/<!-- Table of Contents \/ Executive Summary -->[\s\S]*?<!-- Section 1: Executive Answer -->/, newNav + '\n\n    <!-- Section 1: Executive Answer -->');

// Check sections 10, 11, 12, 13, 14
// In current code:
// Section 10 was telecom backbone, but check its id:
// Let's replace:
content = content.replace(/id="section-11" class="knowledge-section">\s*<div class="section-tag">Backbone Networks<\/div>/, 'id="section-10" class="knowledge-section">\n      <div class="section-tag">Backbone Networks</div>');
content = content.replace(/id="section-12" class="knowledge-section">\s*<div class="section-tag">DNS Security & Privacy<\/div>/, 'id="section-11" class="knowledge-section">\n      <div class="section-tag">DNS Security & Privacy</div>');
content = content.replace(/id="section-13" class="knowledge-section">\s*<div class="section-tag">Enterprise Disaster Recovery<\/div>/, 'id="section-12" class="knowledge-section">\n      <div class="section-tag">Enterprise Disaster Recovery</div>');
// Section 13 card:
content = content.replace(/<div class="sub-block mt-m" id="conversion-cards">/, '<div class="sub-block mt-m" id="section-13">');
// Section 14:
content = content.replace(/id="section-10" class="knowledge-section">\s*<div class="section-tag">Next Steps & Topic Cluster<\/div>/, 'id="section-14" class="knowledge-section">\n      <div class="section-tag">Next Steps & Topic Cluster</div>');

fs.writeFileSync('myscholar/src/pages/knowledge.astro', content, 'utf8');
console.log('Successfully aligned section IDs and TOC navigation!');
