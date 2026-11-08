import fs from 'node:fs';
import path from 'node:path';

const airports = JSON.parse(fs.readFileSync('src/data/airports.json', 'utf-8'));
const airportBySlug = new Map(airports.map(a => [a.slug, a]));
const airportByName = new Map(airports.map(a => [a.name, a]));

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
      if (full.endsWith('.astro') || full.endsWith('.json')) {
        results.push(full);
      }
    }
  }
  return results;
}

const files = walk('src');
console.log('Inspecting', files.length, 'files...');

let totalChecked = 0;
let errors = [];

// Regex to capture link anchors that mention official registration
const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

for (const f of files) {
  if (f.includes('airports.json')) continue;
  const content = fs.readFileSync(f, 'utf-8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    const text = match[2];
    totalChecked++;
    
    // Check if this is an external registration / official link
    if (href.startsWith('http') && (text.includes('官网') || text.includes('注册') || text.includes('体验') || text.includes('测试') || text.includes('通道'))) {
      // Find context around this link (150 chars before)
      const start = Math.max(0, match.index - 200);
      const context = content.slice(start, match.index + match[0].length + 50);
      
      // Let's identify which airport is mentioned in context
      let detectedSlug = null;
      for (const [slug, a] of airportBySlug) {
        if (context.includes(a.name) || context.includes(slug)) {
          detectedSlug = slug;
          break;
        }
      }
      
      if (detectedSlug) {
        const correctLink = airportBySlug.get(detectedSlug).affLink;
        if (correctLink && href !== correctLink && !correctLink.includes(href) && !href.includes(correctLink)) {
          errors.push({
            file: f,
            airport: detectedSlug,
            expected: correctLink,
            actual: href,
            anchorText: text.trim().replace(/\s+/g, ' ')
          });
        }
      }
    }
  }
}

console.log('Total links checked:', totalChecked);
console.log('Mismatches found:', errors.length);
if (errors.length > 0) {
  console.log(JSON.stringify(errors, null, 2));
}
