import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('scripts/audit_output.json', 'utf-8'));

console.log('=== CHECKING SITEMAP FOR UNWANTED PAGES ===');
const unwantedInSitemap = raw.sitemapUrls.filter(u => 
  u.includes('/blog') || 
  u.includes('/people') || 
  u.includes('/projects') || 
  u.includes('/publications') || 
  u.includes('/teaching') || 
  u.includes('/uses') ||
  u.includes('/palette')
);
console.log('Unwanted theme demo pages found in sitemap:', unwantedInSitemap.length);
console.log(unwantedInSitemap);

console.log('\n=== CHECKING REVIEW SLUGS DUPLICATE TITLES/DESCS ===');
const reviewPages = raw.pages.filter(p => p.file.startsWith('reviews/'));
const titles = new Map();
const descs = new Map();
let dupTitles = 0;
let dupDescs = 0;

for (const p of reviewPages) {
  if (titles.has(p.title)) {
    dupTitles++;
  } else {
    titles.set(p.title, p.file);
  }

  if (descs.has(p.description)) {
    dupDescs++;
  } else {
    descs.set(p.description, p.file);
  }
}
console.log(`Review pages count: ${reviewPages.length}, Duplicate titles: ${dupTitles}, Duplicate descriptions: ${dupDescs}`);

console.log('\n=== CHECKING 404 AND INTERNAL DEAD LINKS ===');
const allDistFiles = new Set(raw.pages.map(p => {
  let f = p.file;
  if (f.endsWith('index.html')) f = f.replace('/index.html', '').replace('index.html', '');
  return '/' + f;
}));

let brokenInternal = [];
for (const p of raw.pages) {
  for (const link of p.internalLinksSample) {
    if (link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('javascript:')) continue;
    let clean = link.split('?')[0].split('#')[0];
    if (clean.endsWith('/') && clean !== '/') clean = clean.slice(0, -1);
    // Check if clean exists
    if (!allDistFiles.has(clean) && !allDistFiles.has(clean + '/index.html')) {
      brokenInternal.push({ page: p.file, link });
    }
  }
}
console.log(`Broken internal links detected in sample: ${brokenInternal.length}`);
if (brokenInternal.length > 0) {
  console.log(brokenInternal.slice(0, 10));
}
