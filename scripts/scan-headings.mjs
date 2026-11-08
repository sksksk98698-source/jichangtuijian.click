import fs from "node:fs";

const content = fs.readFileSync("c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt", "utf-8");
const lines = content.split(/\r?\n/);
const headers = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith("#") || /^\d+[\.、]/.test(line) || /主推##/.test(line)) {
    headers.push({ lineNum: i + 1, text: line });
  }
}
console.log("Found headings:", headers.length);
headers.forEach(h => console.log(`${h.lineNum}: ${h.text}`));
