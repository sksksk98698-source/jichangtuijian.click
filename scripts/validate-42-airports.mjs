import fs from 'node:fs';

const airports = JSON.parse(fs.readFileSync('src/data/airports.json', 'utf-8'));
console.log('Total airports:', airports.length);

let emptyCount = 0;
let invalidCount = 0;

for (const a of airports) {
  if (!a.affLink) {
    console.log(`[EMPTY] ${a.name} (${a.slug}) has no affLink!`);
    emptyCount++;
  } else {
    try {
      const u = new URL(a.affLink);
      if (!u.protocol.startsWith('http')) {
        console.log(`[INVALID PROTO] ${a.name}: ${a.affLink}`);
        invalidCount++;
      }
    } catch(e) {
      console.log(`[PARSE ERR] ${a.name}: ${a.affLink}`);
      invalidCount++;
    }
  }
}

console.log(`Report: ${airports.length - emptyCount - invalidCount} valid, ${emptyCount} empty, ${invalidCount} invalid.`);
