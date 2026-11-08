import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(walk(full));
      }
    } else {
      if (full.endsWith('.json') || full.endsWith('.astro') || full.endsWith('.ts') || full.endsWith('.js') || full.endsWith('.md')) {
        results.push(full);
      }
    }
  }
  return results;
}

const files = walk('.');
const urlPattern = /https?:\/\/[^\s"'>\)]+/g;
const suspiciousUrls = [];

for (const f of files) {
  if (f.includes('scripts') || f.includes('dist')) continue;
  const content = fs.readFileSync(f, 'utf-8');
  let match;
  while ((match = urlPattern.exec(content)) !== null) {
    const url = match[0];
    try {
      const u = new URL(url);
      if (
        u.hostname.includes('gsy001') ||
        u.hostname.includes('example') ||
        u.hostname.startsWith('aff.') ||
        u.hostname === 'guangsu.cloud' ||
        u.hostname === 'feimaoyun.com' ||
        u.hostname === 'weifeng.net' ||
        u.hostname === 'dalaoyun.com' ||
        u.hostname === 'xingdaomeng.com' ||
        u.hostname === 'ermao.net'
      ) {
        suspiciousUrls.push({ file: f, url });
      }
    } catch(e) {}
  }
}

console.log('Suspicious URLs count:', suspiciousUrls.length);
console.log(JSON.stringify(suspiciousUrls, null, 2));
