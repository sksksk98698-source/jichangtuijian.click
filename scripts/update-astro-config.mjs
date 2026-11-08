import fs from 'node:fs';

let config = fs.readFileSync('astro.config.ts', 'utf-8');
const regex = /sitemap\(\{[\s\S]*?\}\)/;
const replacement = `sitemap({
      filter: (page) => {
        const excluded = [
          '/blog',
          '/people',
          '/projects',
          '/publications',
          '/teaching',
          '/uses',
          '/palette',
          '/404'
        ];
        return !excluded.some((prefix) => page.includes(prefix));
      },
    })`;

config = config.replace(regex, replacement);
fs.writeFileSync('astro.config.ts', config, 'utf-8');
console.log('Successfully updated astro.config.ts');
