import fs from 'fs';

const headerPath = 'myscholar/src/components/layout/Header.astro';
let headerContent = fs.readFileSync(headerPath, 'utf8');

// Update desktop-nav CSS to prevent line-wrapping and use clean font size
const oldNavCss = `  .desktop-nav {
    display: none;
    align-items: center;
    gap: var(--space-3xs);
    font-size: var(--step--1);

    @media (width >= 40rem) {
      display: flex;
    }
  }

  .nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding-inline: var(--space-2xs);
    color: var(--muted-foreground);
    text-decoration: none;
    text-transform: capitalize;
    transition: color var(--motion-duration-fast) var(--motion-ease);
  }`;

const newNavCss = `  .desktop-nav {
    display: none;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
    flex-wrap: nowrap;
    white-space: nowrap;

    @media (width >= 40rem) {
      display: flex;
    }
  }

  .nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 38px;
    padding-inline: 6px;
    white-space: nowrap;
    color: var(--muted-foreground);
    text-decoration: none;
    transition: color var(--motion-duration-fast) var(--motion-ease);
  }`;

if (headerContent.includes(oldNavCss)) {
  headerContent = headerContent.replace(oldNavCss, newNavCss);
} else {
  headerContent = headerContent.replace(/\.desktop-nav\s*\{[\s\S]*?\.nav-link:hover/, newNavCss + '\n\n  .nav-link:hover');
}

fs.writeFileSync(headerPath, headerContent, 'utf8');
console.log('Successfully optimized Header.astro nav-link single line layout!');

// Now fix index.astro proof image mapping
const indexPath = 'myscholar/src/pages/index.astro';
let indexContent = fs.readFileSync(indexPath, 'utf8');

const oldImg = `                <img
                  src={airport.speedtestProof || airport.unlockProof || "/img/speedtests/speedtest_demo.png"}
                  alt={\`\${airport.name} 真实测速证据\`}
                  loading="lazy"
                />`;

const newImg = `                <img
                  src={airport.speedtestImg || (airport.unlockImgs && airport.unlockImgs[0]) || "/img/speedtests/光速云-节点测速实测.png"}
                  alt={\`\${airport.name} 晚高峰真实测速证据链\`}
                  loading="lazy"
                />`;

indexContent = indexContent.replace(oldImg, newImg);
indexContent = indexContent.replace('airport.speedtestProof ?', 'airport.hasSpeedtest ?');

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Successfully fixed index.astro speedtest image rendering!');
