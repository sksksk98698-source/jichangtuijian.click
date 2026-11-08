import fs from 'node:fs';

const airports = JSON.parse(fs.readFileSync('src/data/airports.json', 'utf-8'));
const map = new Map();
for (const a of airports) {
  map.set(a.slug, a.affLink);
}

const feimaoLink = map.get('feimao');
const xingdaomengLink = map.get('xingdaomeng');
const guangsuLink = map.get('guangsu');

console.log('feimaoLink:', feimaoLink);
console.log('xingdaomengLink:', xingdaomengLink);

const files = [
  'src/pages/free-nodes.astro',
  'src/pages/faq.astro',
  'src/pages/scam-warning.astro'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  // In the cards:
  // Card 2 is feimao: /reviews/feimao followed by button
  // Card 3 is xingdaomeng: /reviews/xingdaomeng followed by button
  
  // Let's replace specifically in feimao block
  content = content.replace(
    /(<a href="\/reviews\/feimao" class="rec-btn secondary">[\s\S]*?<\/a>\s*<a href=")([^"]+)(" target="_blank" rel="nofollow sponsored noopener" class="rec-btn primary">前往官网注册<\/a>)/g,
    `$1${feimaoLink}$3`
  );
  
  // And in xingdaomeng block
  content = content.replace(
    /(<a href="\/reviews\/xingdaomeng" class="rec-btn secondary">[\s\S]*?<\/a>\s*<a href=")([^"]+)(" target="_blank" rel="nofollow sponsored noopener" class="rec-btn primary">前往官网注册<\/a>)/g,
    `$1${xingdaomengLink}$3`
  );

  fs.writeFileSync(f, content, 'utf-8');
  console.log(`Updated ${f}`);
}
