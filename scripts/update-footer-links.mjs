import fs from 'node:fs';

let content = fs.readFileSync('src/site.config.ts', 'utf-8');

const targetLinks = `  footerLinks: [
    { href: "https://jichangtuijian.click/ranking", label: "年度榜单" },
    { href: "https://jichangtuijian.click/brands", label: "品牌库" },
    { href: "https://jichangtuijian.click/free-trial", label: "免费试用" },
    { href: "https://jichangtuijian.click/scam-warning", label: "跑路预警" },
    { href: "https://jichangtuijian.click/free-nodes", label: "免费节点" },
    { href: "https://jichangtuijian.click/faq", label: "高频问答" },
    { href: "https://jichangtuijian.click/clients", label: "客户端下载" },
    { href: "https://jichangtuijian.click/knowledge", label: "专线科普" },
    { href: "https://jichangtuijian.click/privacy", label: "隐私政策" },
    { href: "https://jichangtuijian.click/terms", label: "服务条款与免责声明" },
  ],`;

const regex = /footerLinks:\s*\[[\s\S]*?\],/;
content = content.replace(regex, targetLinks);
fs.writeFileSync('src/site.config.ts', content, 'utf-8');
console.log('Added /privacy and /terms to footerLinks in site.config.ts');
