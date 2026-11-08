import fs from 'fs';

const file = 'myscholar/src/pages/knowledge.astro';
let content = fs.readFileSync(file, 'utf8');

const target1 = `.knowledge-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    max-width: 960px;
    margin: 0 auto;
  }`;

const replace1 = `.knowledge-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    width: 100%;
    margin-inline: auto;
    box-sizing: border-box;
  }`;

const target2 = `.page-intro {
    text-align: center;
    max-width: 820px;
    margin: 0 auto;
  }`;

const replace2 = `.page-intro {
    text-align: center;
    width: 100%;
    margin-inline: auto;
  }`;

if (content.includes(target1)) {
  content = content.replace(target1, replace1);
} else {
  content = content.replace(/\.knowledge-page\s*\{[\s\S]*?max-width:\s*960px;\s*margin:\s*0 auto;\s*\}/, replace1);
}

if (content.includes(target2)) {
  content = content.replace(target2, replace2);
} else {
  content = content.replace(/\.page-intro\s*\{[\s\S]*?max-width:\s*820px;\s*margin:\s*0 auto;\s*\}/, replace2);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully aligned .knowledge-page and .page-intro to 100% full width and perfect centering!');
