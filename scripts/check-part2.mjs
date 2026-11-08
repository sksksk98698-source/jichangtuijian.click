import fs from "node:fs";

const raw = fs.readFileSync("c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt", "utf-8");

// Look for lines that introduce brands
const speedtestFiles = fs.readdirSync("public/img/speedtests");

// Check the table on line 920:
const tableMatch = raw.match(/\| # \| 品牌 \| 注册链接 \| 优惠码 \| 独有卖点 \|[\s\S]*?(?=\n\n---|\n## 合规提醒)/);
const tableRows = [];
if (tableMatch) {
  const lines = tableMatch[0].split("\n").slice(2);
  for (const line of lines) {
    const parts = line.split("|").map(p => p.trim()).filter(Boolean);
    if (parts.length >= 5) {
      tableRows.push({
        num: parseInt(parts[0], 10),
        name: parts[1],
        aff: parts[2].replace(/`/g, ""),
        code: parts[3].replace(/`/g, ""),
        sellingPoint: parts[4]
      });
    }
  }
}
console.log("Found table rows:", tableRows.length);

// Part 2: brands starting after "这14家机场 位置都往后面排"
const part2Index = raw.indexOf("这14家机场 位置都往后面排");
const part2Text = raw.slice(part2Index);

// Find brand blocks in part 2
const p2BrandHeaders = [
  "WgetCloud",
  "白月光",
  "FlyingBird",
  "CyberGuard",
  "泡泡狗",
  "万城专线",
  "TAG",
  "翼游",
  "速鹰666",
  "跑路云",
  "Kuromis",
  "金钥匙",
  "红莓网络",
  "Blinkload"
];

// Let's find all "基础信息" occurrences in part2
const p2Sections = part2Text.split(/(?=\r?\n(?:[^\r\n]+)\r?\n基础信息)/g);
console.log("Part 2 potential sections:", p2Sections.length);
for (const sec of p2Sections) {
  const m = sec.trim().match(/^([^\r\n]+)\r?\n基础信息/);
  if (m) {
    console.log("P2 Brand Found:", m[1].replace(/^\d+[\.\s]*/, "").trim());
  }
}
