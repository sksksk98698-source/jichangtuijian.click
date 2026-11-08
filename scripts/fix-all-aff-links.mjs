import fs from 'node:fs';

const airports = JSON.parse(fs.readFileSync('src/data/airports.json', 'utf-8'));
const airportMap = new Map();
for (const a of airports) {
  airportMap.set(a.slug, a);
}

// 1. Fix src/data/trials.json
const trials = JSON.parse(fs.readFileSync('src/data/trials.json', 'utf-8'));
for (const t of trials) {
  const match = airportMap.get(t.slug);
  if (match) {
    t.officialUrl = match.affLink;
    t.affUrl = match.affLink;
  }
}
fs.writeFileSync('src/data/trials.json', JSON.stringify(trials, null, 2), 'utf-8');
console.log('Fixed src/data/trials.json with real affiliate links');

// 2. Fix pages that have gsy001.com
const targetPages = [
  'src/pages/faq.astro',
  'src/pages/free-nodes.astro',
  'src/pages/scam-warning.astro'
];

const guangsuRealLink = airportMap.get('guangsu').affLink;

for (const p of targetPages) {
  let content = fs.readFileSync(p, 'utf-8');
  if (content.includes('https://gsy001.com/#/register?code=AMK')) {
    content = content.replaceAll('https://gsy001.com/#/register?code=AMK', guangsuRealLink);
    fs.writeFileSync(p, content, 'utf-8');
    console.log(`Fixed ${p} replacing gsy001 with real link: ${guangsuRealLink}`);
  }
}
