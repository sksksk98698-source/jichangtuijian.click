import fs from 'node:fs';

console.log('=== ROBOTS.TXT OUTPUT ===');
console.log(fs.readFileSync('dist/robots.txt', 'utf-8'));

console.log('=== SITEMAP LOCS COUNT ===');
const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf-8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log('Total URLs:', locs.length);

console.log('=== CHECK HOMEPAGE HEAD ===');
const indexHtml = fs.readFileSync('dist/index.html', 'utf-8');
const headSnippet = indexHtml.match(/<head>([\s\S]*?)<\/head>/i)[1];
const title = headSnippet.match(/<title>(.*?)<\/title>/i)?.[1];
const desc = headSnippet.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)?.[1];
const canonical = headSnippet.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i)?.[1];
const robotsMeta = headSnippet.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i)?.[1];
console.log('Title:', title);
console.log('Description:', desc);
console.log('Canonical:', canonical);
console.log('Robots Meta:', robotsMeta);
