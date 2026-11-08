import fs from "node:fs";
import path from "node:path";

const txtPath = "C:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt";
const raw = fs.readFileSync(txtPath, "utf-8");

// Split by ## number. Name
const sections = raw.split(/\n(?=##\s*\d+\.\s*)/g);
console.log("Total sections:", sections.length);

const brands = [];

for (const sec of sections) {
  const titleMatch = sec.match(/##\s*(\d+)\.\s*([^\r\n]+)/);
  if (!titleMatch) continue;

  const rank = parseInt(titleMatch[1], 10);
  const fullName = titleMatch[2].trim();
  // Name might be "光速云" or "暮光加速（muguang）"
  const nameMatch = fullName.match(/^([^（(]+)/);
  const name = nameMatch ? nameMatch[1].trim() : fullName;
  const aliasMatch = fullName.match(/[（(]([^）)]+)[）)]/);
  const alias = aliasMatch ? aliasMatch[1].trim() : "";

  // Extract affiliate registration link
  const linkMatch = sec.match(/\*\*注册链接\*\*[:：]?\s*[`"']?(https?:\/\/[^\s`"']+)`?/);
  const affLink = linkMatch ? linkMatch[1] : "";

  // Extract basic info
  const baseDataMatch = sec.match(/\*\*基础数据\*\*[:：]?\s*([^\r\n]+)/);
  const baseData = baseDataMatch ? baseDataMatch[1] : "";

  // Extract starting price / pricing info
  const priceMatch = baseData.match(/最低入门价格约([^\s,，|]+)/) || sec.match(/(\d+)元\/[月年]/);
  const startingPrice = priceMatch ? priceMatch[0] : "";

  // Extract discount code
  const promoMatch = sec.match(/优惠码\s*[`"']?([A-Za-z0-9_-]+)[`"']?/);
  const promoCode = promoMatch ? promoMatch[1] : "";

  // Extract lines & protocol features
  const lines = [];
  if (/IEPL/i.test(sec)) lines.push("IEPL专线");
  if (/IPLC/i.test(sec)) lines.push("IPLC专线");
  if (/BGP/i.test(sec)) lines.push("BGP中转");
  if (/公网|中转/i.test(sec) && !lines.includes("BGP中转")) lines.push("公网中转");
  if (/直连/i.test(sec)) lines.push("优质直连");

  const protocols = [];
  if (/Shadowsocks|SS\b/i.test(sec)) protocols.push("Shadowsocks");
  if (/VLESS/i.test(sec)) protocols.push("VLESS");
  if (/VMess/i.test(sec)) protocols.push("VMess");
  if (/Trojan/i.test(sec)) protocols.push("Trojan");
  if (/Hysteria/i.test(sec)) protocols.push("Hysteria2");

  // Streaming unlock
  const unlock = [];
  if (/ChatGPT/i.test(sec)) unlock.push("ChatGPT");
  if (/Claude/i.test(sec)) unlock.push("Claude");
  if (/Netflix/i.test(sec)) unlock.push("Netflix");
  if (/Disney\+/i.test(sec)) unlock.push("Disney+");
  if (/YouTube/i.test(sec)) unlock.push("YouTube Premium");
  if (/TikTok/i.test(sec)) unlock.push("TikTok");

  // Check if speedtest image exists
  const speedtestFiles = fs.readdirSync("public/img/speedtests");
  const matchingImg = speedtestFiles.find(f => f.includes(name) || (alias && f.includes(alias)));

  brands.push({
    rank,
    id: `airport-${rank}`,
    slug: alias ? alias.toLowerCase().replace(/[^a-z0-9_-]/g, "") : `brand-${rank}`,
    name,
    fullName,
    alias,
    affLink,
    baseData,
    startingPrice,
    promoCode,
    lines: lines.length > 0 ? lines : ["优质专线中转"],
    protocols: protocols.length > 0 ? protocols : ["Shadowsocks", "VLESS"],
    unlock: unlock.length > 0 ? unlock : ["Netflix", "Disney+", "YouTube 4K"],
    hasSpeedtest: !!matchingImg,
    speedtestImg: matchingImg ? `/img/speedtests/${matchingImg}` : null,
    isTop10: rank <= 10,
    isFeatured: rank === 1, // 光速云
    rawSection: sec.trim()
  });
}

console.log(`Parsed ${brands.length} brands successfully.`);
fs.writeFileSync("src/data/airports.json", JSON.stringify(brands, null, 2), "utf-8");
console.log("Saved to src/data/airports.json");
