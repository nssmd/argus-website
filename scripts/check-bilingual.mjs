import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const pairs = [
  ["index.html", "zh.html"],
  ["how.html", "zh/how.html"],
  ["results.html", "zh/results.html"],
  ["research.html", "zh/research.html"],
  ["start.html", "zh/start.html"],
  ["use-cases.html", "zh/use-cases.html"],
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relative) {
  const file = path.join(dist, relative);
  assert(fs.existsSync(file), `missing built page: ${relative}`);
  return fs.readFileSync(file, "utf8");
}

function localTarget(href) {
  const clean = href.split("#", 1)[0].split("?", 1)[0];
  if (!clean || /^(?:https?:|mailto:)/.test(clean)) return null;
  return path.join(dist, clean.replace(/^\//, ""));
}

for (const [englishPath, chinesePath] of pairs) {
  const english = read(englishPath);
  const chinese = read(chinesePath);
  assert(english.includes('<html lang="en">'), `${englishPath} is not English`);
  assert(chinese.includes('<html lang="zh-CN">'), `${chinesePath} is not Simplified Chinese`);
  assert(english.includes('hreflang="zh-Hans"'), `${englishPath} lacks zh-Hans alternate`);
  assert(chinese.includes('hreflang="en"'), `${chinesePath} lacks English alternate`);
  assert(english.includes("data-theme-toggle"), `${englishPath} lacks theme toggle`);
  assert(chinese.includes("data-theme-toggle"), `${chinesePath} lacks theme toggle`);
  assert(english.includes("argus-site-theme"), `${englishPath} lacks theme persistence`);
  const visibleEnglish = english
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/中/g, "");
  assert(!/[\u3400-\u9fff]/.test(visibleEnglish), `${englishPath} leaks Chinese visible copy`);
  assert(/[\u3400-\u9fff]/.test(chinese), `${chinesePath} lacks Chinese copy`);
  assert(!english.includes("argus-mark-gold.png"), `${englishPath} still uses the legacy mark`);
  assert(!chinese.includes("argus-mark-gold.png"), `${chinesePath} still uses the legacy mark`);
  assert(english.includes('class="footer-brand"') && english.includes('aria-label="Argus home"'), `${englishPath} footer logo is unnamed`);
  assert(chinese.includes('class="footer-brand"') && chinese.includes('aria-label="Argus 首页"'), `${chinesePath} footer logo is unnamed`);
}

for (const page of ["index.html", "zh.html"]) {
  const html = read(page);
  assert(html.includes('data-argus-logo="horizontal"'), `${page} lacks the rounded horizontal logo`);
  assert(html.includes('data-argus-logo="mark"'), `${page} lacks the rounded mark`);
}

const css = fs.readFileSync(path.resolve("src/styles/global.css"), "utf8");
assert(css.includes("scroll-padding-inline: 18px"), "mobile nav lacks scroll padding");
assert(css.includes("scroll-snap-type: x proximity"), "mobile nav lacks scroll snapping");
assert(css.includes("--signal-segment-width: max(33.333vw, 480px)"), "signal rail segment width changed");
assert(css.includes("--signal-gap: clamp(24px, 4vw, 48px)"), "signal rail lacks explicit spacing");
const smallFavicon = fs.readFileSync(path.resolve("public/assets/argus-mark-rounded-small.svg"), "utf8");
assert(smallFavicon.includes('fill="#073e8c"'), "small SVG favicon lacks explicit deep-blue fill");

for (const page of fs.readdirSync(dist, { recursive: true })) {
  if (typeof page !== "string" || !page.endsWith(".html")) continue;
  const html = read(page);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target) assert(fs.existsSync(target), `${page} has broken link: ${match[1]}`);
  }
}

console.log(`bilingual check passed: ${pairs.length * 2} pages`);
