import fs from "node:fs";

const content = fs.readFileSync("scripts/update-knowledge.mjs", "utf-8");
// Extract the template literal string between knowledgeContent = `...`;
const match = content.match(/knowledgeContent = `([\s\S]*?)`;\s*fs\.writeFileSync/);
if (match) {
  fs.writeFileSync("src/pages/knowledge.astro", match[1], "utf-8");
  console.log("Successfully extracted and wrote to src/pages/knowledge.astro");
} else {
  console.log("Could not find template string match");
}
