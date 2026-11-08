import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('scripts/audit_output.json', 'utf-8'));

console.log('=== ROBOTS.TXT ===');
console.log(raw.robots);

console.log('\n=== SITEMAP SUMMARY ===');
console.log('Total URLs in sitemap:', raw.sitemapUrls.length);
console.log('Sample URLs (first 5):', raw.sitemapUrls.slice(0, 5));

// Check Canonical mismatches
console.log('\n=== CANONICAL CHECK ===');
let canonicalMissing = 0;
let canonicalNonDomain = 0;
for (const p of raw.pages) {
  if (!p.canonical) {
    console.log(`[NO CANONICAL] ${p.file}`);
    canonicalMissing++;
  } else if (!p.canonical.startsWith('https://jichangtuijian.click')) {
    console.log(`[WEIRD CANONICAL] ${p.file} => ${p.canonical}`);
    canonicalNonDomain++;
  }
}
console.log(`Canonical summary: ${canonicalMissing} missing, ${canonicalNonDomain} abnormal.`);

// Check Violating Outbound Links (no nofollow)
console.log('\n=== OUTBOUND LINKS NOFOLLOW AUDIT ===');
let totalViolations = 0;
for (const p of raw.pages) {
  if (p.violatingOutboundLinks && p.violatingOutboundLinks.length > 0) {
    console.log(`[VIOLATION in ${p.file}]:`);
    for (const v of p.violatingOutboundLinks) {
      console.log(`  - href: ${v.href} | anchor: "${v.anchorText}"`);
      totalViolations++;
    }
  }
}
console.log(`Total violating links across all pages: ${totalViolations}`);

// Check Word Count & Thin Content
console.log('\n=== CONTENT THIN CONTENT AUDIT ===');
const thinContentPages = raw.pages.filter(p => p.cjkChars < 1000 && !p.file.includes('404') && !p.file.includes('tag') && !p.file.includes('palette'));
console.log(`Thin content (<1000 Chinese chars) count: ${thinContentPages.length}`);
for (const p of thinContentPages) {
  console.log(`  - ${p.file} (${p.cjkChars} chars)`);
}

// Check Pillar Pages Word Count
console.log('\n=== PILLAR PAGES METRICS ===');
const pillars = ['index.html', 'free-trial/index.html', 'faq/index.html', 'free-nodes/index.html', 'scam-warning/index.html', 'clients/index.html', 'knowledge/index.html'];
for (const pil of pillars) {
  const p = raw.pages.find(x => x.file === pil);
  if (p) {
    console.log(`${pil}: ${p.cjkChars} chars | Schemas: ${p.schemas.join(', ')} | Table: ${p.hasTable} | Details: ${p.hasDetails} | Canonical: ${p.canonical}`);
  }
}

// Check Review Pages
console.log('\n=== REVIEW SLUG PAGES AUDIT ===');
const reviewPages = raw.pages.filter(p => p.file.startsWith('reviews/'));
console.log(`Total review pages: ${reviewPages.length}`);
const reviewCharCounts = reviewPages.map(p => p.cjkChars);
console.log(`Review pages char range: min=${Math.min(...reviewCharCounts)}, max=${Math.max(...reviewCharCounts)}, avg=${Math.round(reviewCharCounts.reduce((a,b)=>a+b,0)/reviewPages.length)}`);
