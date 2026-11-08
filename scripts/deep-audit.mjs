import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (full.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const distDir = 'dist';
const htmlFiles = walk(distDir);
console.log(`Found ${htmlFiles.length} HTML files in ${distDir}`);

// 1. Robots.txt
const robotsTxtPath = path.join(distDir, 'robots.txt');
let robotsTxt = fs.existsSync(robotsTxtPath) ? fs.readFileSync(robotsTxtPath, 'utf-8') : null;

// 2. Sitemap
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
let sitemapIndex = fs.existsSync(sitemapIndexPath) ? fs.readFileSync(sitemapIndexPath, 'utf-8') : null;
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
let sitemap0 = fs.existsSync(sitemap0Path) ? fs.readFileSync(sitemap0Path, 'utf-8') : null;

// Audit data
const results = {
  robots: robotsTxt,
  sitemapIndexExists: !!sitemapIndex,
  sitemapUrls: [],
  pages: []
};

if (sitemap0) {
  const matches = [...sitemap0.matchAll(/<loc>(.*?)<\/loc>/g)];
  results.sitemapUrls = matches.map(m => m[1]);
}

for (const f of htmlFiles) {
  const relPath = path.relative(distDir, f).replace(/\\/g, '/');
  const content = fs.readFileSync(f, 'utf-8');
  
  // Canonical
  const canonicalMatch = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                         content.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;

  // Title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Description
  const descMatch = content.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    content.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : null;

  // Schema scripts
  const schemaMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  const schemas = [];
  for (const sm of schemaMatches) {
    try {
      schemas.push(JSON.parse(sm[1]));
    } catch(e) {
      schemas.push({ error: 'INVALID_JSON', raw: sm[1].slice(0, 50) });
    }
  }

  // Pure Chinese count
  // strip tags and scripts/styles
  let textOnly = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ');
  const cjkChars = (textOnly.match(/[\u4e00-\u9fa5]/g) || []).length;

  // Links & nofollow audit
  const linkMatches = [...content.matchAll(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/a>/gi)];
  const outboundLinks = [];
  const internalLinks = [];
  for (const lm of linkMatches) {
    const fullAttrs = lm[1] + ' ' + lm[3];
    const href = lm[2];
    const anchorText = lm[4].replace(/<[^>]+>/g, '').trim();
    if (href.startsWith('http://') || href.startsWith('https://')) {
      const isExternal = !href.includes('jichangtuijian.click') && !href.includes('localhost');
      if (isExternal) {
        const hasNofollow = /rel=["'][^"']*nofollow[^"']*["']/i.test(fullAttrs);
        const hasSponsored = /rel=["'][^"']*sponsored[^"']*["']/i.test(fullAttrs);
        const hasNoopener = /rel=["'][^"']*noopener[^"']*["']/i.test(fullAttrs);
        outboundLinks.push({
          href,
          anchorText: anchorText.slice(0, 30),
          hasNofollow,
          hasSponsored,
          hasNoopener
        });
      }
    } else {
      internalLinks.push(href);
    }
  }

  // Answer-First / Tables / FAQ presence
  const hasTable = /<table[\s\S]*?<\/table>/i.test(content);
  const hasDetails = /<details[\s\S]*?<\/details>/i.test(content);
  const hasAnswerFirst = /lead-text|answer-first|direct-answer|quick-answer|core-conclusion|conclusion-box/i.test(content);

  // Check for template fingerprints, GA, Baidu
  const hasGA = /gtag|UA-\d+|G-[A-Z0-9]+/i.test(content);
  const hasBaidu = /hm\.baidu\.com/i.test(content);
  const hasPlaceholder = /TODO|Lorem ipsum|占位符|xxx|待补充/i.test(content);

  results.pages.push({
    file: relPath,
    title,
    description,
    canonical,
    cjkChars,
    schemasCount: schemas.length,
    schemas: schemas.map(s => s['@type'] || (Array.isArray(s) ? 'Array' : typeof s)),
    outboundLinksCount: outboundLinks.length,
    violatingOutboundLinks: outboundLinks.filter(l => !l.hasNofollow),
    hasTable,
    hasDetails,
    hasAnswerFirst,
    hasGA,
    hasBaidu,
    hasPlaceholder,
    internalLinksCount: internalLinks.length,
    internalLinksSample: internalLinks.slice(0, 10)
  });
}

fs.writeFileSync('scripts/audit_output.json', JSON.stringify(results, null, 2), 'utf-8');
console.log('Saved audit_output.json with', results.pages.length, 'pages evaluated.');
