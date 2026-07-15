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
  assert(english.includes('gradientUnits="userSpaceOnUse"'), `${englishPath} logo gradient restarts per path`);
  assert(chinese.includes('gradientUnits="userSpaceOnUse"'), `${chinesePath} logo gradient restarts per path`);
  assert(english.includes('x1="180" y1="0" x2="1280" y2="0"'), `${englishPath} horizontal logo gradient misses the visible artwork`);
  assert(chinese.includes('x1="180" y1="0" x2="1280" y2="0"'), `${chinesePath} horizontal logo gradient misses the visible artwork`);
  assert(english.includes('class="footer-brand"') && english.includes('aria-label="Argus home"'), `${englishPath} footer logo is unnamed`);
  assert(chinese.includes('class="footer-brand"') && chinese.includes('aria-label="Argus 首页"'), `${chinesePath} footer logo is unnamed`);
}

for (const page of ["index.html", "zh.html"]) {
  const html = read(page);
  assert(html.includes('data-argus-logo="horizontal"'), `${page} lacks the rounded horizontal logo`);
  assert(html.includes("data-brand-universe"), `${page} lacks the kinetic BrandUniverse opening`);
  assert(html.includes('id="intro"'), `${page} lacks the BrandUniverse enter target`);
  assert(!html.includes("data-home-chapter"), `${page} still renders numbered homepage chapters`);
  const heroAt = html.indexOf('class="page-hero"');
  const denseAt = html.indexOf('id="dense-intelligence"');
  const metricsAt = html.indexOf('class="metric-strip"');
  const signalAt = html.indexOf('class="signal-rail"');
  const evolutionAt = html.indexOf('id="evolution"');
  const multiAgentAt = html.indexOf('id="multi-agent"');
  const processAt = html.indexOf('id="process-data"');
  assert(
    [heroAt, denseAt, metricsAt, signalAt, evolutionAt, multiAgentAt, processAt].every((index) => index >= 0),
    `${page} lacks a restored homepage section`,
  );
  assert(
    heroAt < denseAt &&
      denseAt < metricsAt &&
      metricsAt < signalAt &&
      signalAt < evolutionAt &&
      evolutionAt < multiAgentAt &&
      multiAgentAt < processAt,
    `${page} homepage section order was not restored`,
  );
}

for (const page of ["start.html", "zh/start.html"]) {
  const html = read(page);
  const pickerIndex = html.indexOf("data-run-picker");
  const frameIndex = html.indexOf("demo-frame");
  assert(pickerIndex !== -1, `${page} lacks the external run picker (data-run-picker)`);
  assert(frameIndex !== -1, `${page} lacks the CLI demo frame`);
  assert(pickerIndex < frameIndex, `${page} renders the run picker inside or after the CLI frame`);
  const cardCount = (html.match(/data-video-src=/g) || []).length;
  assert(cardCount === 4, `${page} must expose four run cards, found ${cardCount}`);
  assert(html.includes("data-run-category"), `${page} run cards lack a category badge`);
  assert(html.includes("data-run-duration"), `${page} run cards lack duration metadata`);
  assert(html.includes("data-now-playing"), `${page} lacks the now-playing badge`);
  assert(!html.includes("cli-demo-tabs"), `${page} still nests text tabs inside the CLI frame`);
}

const pickerSource = fs.readFileSync(
  path.resolve("src/components/ResearchVideoDemo.astro"),
  "utf8",
);
const desktopMatch = pickerSource.match(/matchMedia\("\(min-width:\s*(\d+)px\)"/);
assert(desktopMatch, "run picker script lacks a desktop media gate");
const desktopBreakpoint = Number(desktopMatch[1]);
assert(desktopBreakpoint === 821, `run picker desktop gate should be 821px, found ${desktopBreakpoint}`);
assert(
  pickerSource.includes("scrollIntoView({") && pickerSource.includes("desktop.matches"),
  "run picker selection must still gate player scrolling on the desktop media query",
);

const css = fs.readFileSync(path.resolve("src/styles/global.css"), "utf8");
assert(css.includes("scroll-snap-type: x mandatory"), "run rail lacks mandatory horizontal snap");
assert(css.includes("min(82vw"), "mobile run cards are not ~82vw wide");
assert(
  css.includes("linear-gradient(90deg, var(--blue), var(--gold))"),
  "selected run card lacks the blue-to-gold border token",
);
assert(css.includes("grid-template-columns: repeat(4, 1fr)"), "desktop run rail lacks the four-column layout");
assert(css.includes("@media (max-width: 820px)"), "run picker CSS lacks the 820px mobile breakpoint");
const mobileBreakpoint = 820;
assert(
  desktopBreakpoint === mobileBreakpoint + 1,
  `run picker breakpoints should be adjacent; found desktop ${desktopBreakpoint}px and mobile ${mobileBreakpoint}px`,
);
assert(
  840 >= desktopBreakpoint && 840 > mobileBreakpoint,
  "840px should resolve to the desktop four-column layout and desktop scroll gate",
);
assert(css.includes("scroll-padding-inline: 18px"), "mobile nav lacks scroll padding");
assert(css.includes("scroll-snap-type: x proximity"), "mobile nav lacks scroll snapping");
assert(css.includes("--signal-segment-width: max(33.333vw, 480px)"), "signal rail segment width changed");
assert(css.includes("--signal-gap: clamp(24px, 4vw, 48px)"), "signal rail lacks explicit spacing");
assert(fs.existsSync(path.join(dist, "favicon.ico")), "missing root favicon.ico for search crawlers");
const home = read("index.html");
assert(home.includes('href="/favicon.ico"'), "root favicon.ico link tag missing from HTML");
assert(
  home.indexOf('href="/favicon.ico"') < home.indexOf('href="/assets/argus-mark-rounded-small.svg"'),
  "root favicon.ico is not the primary icon declaration",
);
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
