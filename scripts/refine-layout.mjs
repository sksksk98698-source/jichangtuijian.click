import fs from 'fs';

let content = fs.readFileSync('myscholar/src/pages/knowledge.astro', 'utf8');

// Match sections and re-tag their IDs sequentially:
// 1. Executive Answer: section-1
// 2. Physical Layer: section-2
// 3. GFW DPI: section-3
// 4. Protocols: section-4
// 5. Evening Peak: section-5
// 6. TCP Congestion: section-6
// 7. AI & Streaming IP: section-7
// 8. Decision Tree: section-8
// 9. FAQ: section-9
// 10. ISP Backbone: section-10
// 11. DNS Leak: section-11
// 12. Enterprise Disaster Recovery: section-12
// 13. Conversion Cards: section-13
// 14. Internal Cluster: section-14

content = content.replace(/<!-- Section 11: ISP Routing Characteristics -->\s*<section id="[^"]*" class="knowledge-section">/, '<!-- Section 10: ISP Routing Characteristics -->\n    <section id="section-10" class="knowledge-section">');

content = content.replace(/<!-- Section 12: DNS Leaks & Fake-IP -->\s*<section id="[^"]*" class="knowledge-section">/, '<!-- Section 11: DNS Leaks & Fake-IP -->\n    <section id="section-11" class="knowledge-section">');

content = content.replace(/<!-- Section 13: Enterprise High Availability & Disaster Recovery -->\s*<section id="[^"]*" class="knowledge-section">/, '<!-- Section 12: Enterprise High Availability & Disaster Recovery -->\n    <section id="section-12" class="knowledge-section">');

// For Section 13 (Conversion banner & cards)
content = content.replace(/<!-- Section 12: Conversion Cards & Verified Providers -->/, '<!-- Section 13: Verified Providers & Cards -->\n    <div id="section-13"></div>');

// TOC styling enhancements:
const tocStyle = `
  .quick-nav-box {
    background: color-mix(in oklab, var(--muted) 25%, var(--background));
    border: 1px solid color-mix(in oklab, var(--accent) 30%, var(--border));
    border-radius: var(--radius-xl);
    padding: var(--space-s) var(--space-m);
    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
  }

  .nav-box-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--step-0);
    margin-bottom: var(--space-s);
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }
  .nav-icon {
    font-size: 1.3rem;
  }

  .nav-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 10px;
  }

  .toc-link {
    font-size: var(--step--1);
    color: var(--foreground);
    text-decoration: none;
    padding: 8px 12px;
    border-radius: var(--radius-md);
    background: var(--background);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all var(--motion-duration-fast) var(--motion-ease);
  }
  .toc-num {
    font-size: 0.72rem;
    font-weight: 800;
    padding: 2px 6px;
    background: color-mix(in oklab, var(--accent) 15%, transparent);
    color: var(--accent);
    border-radius: 4px;
    line-height: 1;
    letter-spacing: 0.05em;
  }
  .toc-link:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
  }
`;

content = content.replace(/\.quick-nav-box\s*\{[\s\S]*?\.toc-link:hover\s*\{[\s\S]*?\}/, tocStyle.trim());

// Improve table and callout typography styles
const tableAndCalloutStyle = `
  /* Enhanced Typography & Table Layout */
  .table-scroll-container, .decision-matrix-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    margin-block: var(--space-s);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }

  .monograph-table {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    font-size: var(--step--1);
    background: var(--background);
  }

  .monograph-table th, .monograph-table td {
    padding: 12px 16px;
    border: 1px solid var(--border);
    text-align: left;
    vertical-align: middle;
  }

  .monograph-table th {
    background: color-mix(in oklab, var(--muted) 50%, var(--background));
    font-weight: 700;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }

  .monograph-table td code {
    background: color-mix(in oklab, var(--muted) 40%, var(--background));
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
  }

  .highlight-row {
    background: color-mix(in oklab, var(--accent) 10%, var(--background));
    font-weight: 600;
  }
  .danger-row {
    background: color-mix(in oklab, #ff5f56 10%, var(--background));
  }

  .knowledge-section {
    background: color-mix(in oklab, var(--muted) 15%, var(--background));
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    scroll-margin-top: 84px;
    transition: border-color var(--motion-duration-fast) var(--motion-ease);
  }

  .knowledge-section:target {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--accent) 30%, transparent);
  }
`;

content = content.replace(/\.table-scroll-container, \.decision-matrix-table-wrapper\s*\{[\s\S]*?\.monograph-table a\s*\{[\s\S]*?\}/, tableAndCalloutStyle.trim());

fs.writeFileSync('myscholar/src/pages/knowledge.astro', content, 'utf8');
console.log('Knowledge page layout and section styling updated!');
