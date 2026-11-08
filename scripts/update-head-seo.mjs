import fs from 'node:fs';

let head = fs.readFileSync('src/components/layout/Head.astro', 'utf-8');

// Replace using regex handling \r?\n
const regex = /\{!noindex\s*&&\s*<meta\s+name=["']robots["']\s+content=["']index,\s*follow["']\s*\/>\}/;

const replacement = `{!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

  <!-- 搜索引擎站长平台验证代码插槽 (Search Console Verification Slots) -->
  {/* 如需验证，直接在此处解除注释并填入您的代码即可直接静态编译输出 */}
  {/* <meta name="google-site-verification" content="填入Google验证码" /> */}
  {/* <meta name="msvalidate.01" content="填入Bing验证码" /> */}
  {/* <meta name="shenma-site-verification" content="填入神马验证码" /> */}
  {/* <meta name="baidu-site-verification" content="填入百度验证码" /> */}
  <slot name="verification" />`;

if (regex.test(head)) {
  head = head.replace(regex, replacement);
  fs.writeFileSync('src/components/layout/Head.astro', head, 'utf-8');
  console.log('Successfully updated Head.astro with crawler directives and verification slots');
} else {
  console.log('Regex did not match Head.astro');
}
