import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/clients.astro', 'utf8');

// Replace { "proxies": { ... } } with escaped or non-curly text in astro
const oldDocker = `<pre><code># 编辑 /etc/docker/daemon.json
{
  "proxies": {
    "http-proxy": "http://127.0.0.1:7897",
    "https-proxy": "http://127.0.0.1:7897",
    "no-proxy": "localhost,127.0.0.1,local.internal"
  }
}
# 重启生效: sudo systemctl restart docker</code></pre>`;

const newDocker = `<pre><code>{\`# 编辑 /etc/docker/daemon.json
{
  "proxies": {
    "http-proxy": "http://127.0.0.1:7897",
    "https-proxy": "http://127.0.0.1:7897",
    "no-proxy": "localhost,127.0.0.1,local.internal"
  }
}
# 重启生效: sudo systemctl restart docker\`}</code></pre>`;

content = content.replace(oldDocker, newDocker);

// Also check YAML parsers block for raw curlies
const oldParsers = `<pre><code># 常用预处理器代码示例 (放入 profiles 预处理脚本中)
module.exports.parse = async (raw, { yaml }) => {
  const config = yaml.parse(raw);
  
  // 1. 自动注入专属 AI 策略组
  config['proxy-groups'].unshift({
    name: '🤖 AI 人工智能',
    type: 'select',
    proxies: ['DIRECT', '🇭🇰 香港 IEPL 专线', '🇯🇵 日本 0 丢包专线', '🇺🇸 美国原生住宅']
  });
  
  // 2. 顶部插入 AI 域名分流规则
  config.rules.unshift(
    'DOMAIN-SUFFIX,openai.com,🤖 AI 人工智能',
    'DOMAIN-SUFFIX,anthropic.com,🤖 AI 人工智能',
    'DOMAIN-SUFFIX,claude.ai,🤖 AI 人工智能',
    'DOMAIN-SUFFIX,cursor.com,🤖 AI 人工智能'
  );
  
  return yaml.stringify(config);
};</code></pre>`;

const newParsers = `<pre><code>{\`# 常用预处理器代码示例 (放入 profiles 预处理脚本中)
module.exports.parse = async (raw, { yaml }) => {
  const config = yaml.parse(raw);
  
  // 1. 自动注入专属 AI 策略组
  config['proxy-groups'].unshift({
    name: '🤖 AI 人工智能',
    type: 'select',
    proxies: ['DIRECT', '🇭🇰 香港 IEPL 专线', '🇯🇵 日本 0 丢包专线', '🇺🇸 美国原生住宅']
  });
  
  // 2. 顶部插入 AI 域名分流规则
  config.rules.unshift(
    'DOMAIN-SUFFIX,openai.com,🤖 AI 人工智能',
    'DOMAIN-SUFFIX,anthropic.com,🤖 AI 人工智能',
    'DOMAIN-SUFFIX,claude.ai,🤖 AI 人工智能',
    'DOMAIN-SUFFIX,cursor.com,🤖 AI 人工智能'
  );
  
  return yaml.stringify(config);
};完整脚本无语法报错\`}</code></pre>`;

content = content.replace(oldParsers, newParsers);

fs.writeFileSync('myscholar/src/pages/clients.astro', content, 'utf8');
console.log('Successfully escaped Astro JSX curly braces in clients.astro!');
