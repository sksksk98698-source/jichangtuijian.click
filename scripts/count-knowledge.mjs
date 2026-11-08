import fs from "node:fs";

const html = fs.readFileSync("dist/knowledge/index.html", "utf-8");
// Extract main body content
const mainMatch = html.match(/<main[\s\S]*?<\/main>/) || [html];
const cleanText = mainMatch[0].replace(/<script[\s\S]*?<\/script>/gi, "")
                              .replace(/<style[\s\S]*?<\/style>/gi, "")
                              .replace(/<[^>]+>/g, " ")
                              .replace(/\s+/g, " ");

const chineseChars = cleanText.match(/[\u4e00-\u9fa5]/g) || [];
console.log("Clean body text length:", cleanText.length);
console.log("Pure Chinese character count (纯汉字字数):", chineseChars.length);
