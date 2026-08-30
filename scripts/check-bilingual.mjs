import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const pairs = [
  ["index.html", "zh.html"],
  ["contact.html", "zh/contact.html"],
  ["how.html", "zh/how.html"],
  ["projects.html", "zh/projects.html"],
  ["projects/runtime.html", "zh/projects/runtime.html"],
  ["projects/hardware.html", "zh/projects/hardware.html"],
  ["projects/model.html", "zh/projects/model.html"],
  ["projects/research.html", "zh/projects/research.html"],
  ["results.html", "zh/results.html"],
  ["research.html", "zh/research.html"],
  ["get-started.html", "zh/get-started.html"],
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
  let visibleEnglish = english
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/中/g, "");
  if (englishPath === "contact.html") {
    visibleEnglish = visibleEnglish.replace(
      /<article class="team-member-card">[\s\S]*?<\/article>/g,
      "",
    );
  }
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
  assert(
    html.includes(">10<") && (html.includes("Selected papers") || html.includes("精选研究论文")),
    `${page} has a stale research-paper metric`,
  );
  const heroAt = html.indexOf('class="page-hero"');
  const denseAt = html.indexOf('id="dense-intelligence"');
  const metricsAt = html.indexOf('class="metric-strip"');
  const overviewAt = html.indexOf('class="section overview-film"');
  const signalAt = html.indexOf('class="signal-rail"');
  const evolutionAt = html.indexOf('id="evolution"');
  const multiAgentAt = html.indexOf('id="multi-agent"');
  const processAt = html.indexOf('id="process-data"');
  assert(
    [heroAt, denseAt, metricsAt, overviewAt, signalAt, evolutionAt, multiAgentAt, processAt].every((index) => index >= 0),
    `${page} lacks a restored homepage section`,
  );
  assert(
    heroAt < denseAt &&
      denseAt < metricsAt &&
      metricsAt < overviewAt &&
      overviewAt < signalAt &&
      signalAt < evolutionAt &&
      evolutionAt < multiAgentAt &&
      multiAgentAt < processAt,
    `${page} homepage section order was not restored`,
  );
  assert(html.includes('/assets/demos/argus-overview-90s.mp4'), `${page} lacks the 90-second overview video`);
  assert(html.includes('/assets/demos/argus-overview-90s-poster.webp'), `${page} lacks the overview poster`);
  assert(html.includes("Argus: A General-Purpose Agentic Reasoning Runtime") || html.includes("面向长程任务的通用 Agentic Reasoning Runtime"), `${page} lacks the prominent technical report`);
  assert(html.includes("https://arxiv.org/pdf/2608.05144"), `${page} lacks the direct technical-report PDF`);
  assert(html.includes('class="resource-gateway__grid"'), `${page} lacks the primary resource gateway`);
  assert(html.includes("https://github.com/Argus-AiTeam"), `${page} lacks the prominent team repository link`);
  assert(html.includes("https://github.com/microsoft/ArgusAgent"), `${page} lacks the prominent official repository link`);
  assert(!html.includes("Commercialization requires") && !html.includes("商业化前提"), `${page} still contains the removed commercialization-premise sentence`);
}

assert(fs.existsSync(path.join(dist, "assets/demos/argus-overview-90s.mp4")), "missing overview MP4");
assert(fs.existsSync(path.join(dist, "assets/demos/argus-overview-90s-poster.webp")), "missing overview poster");

const sitemap = read("sitemap.xml");
assert((sitemap.match(/<url>/g) || []).length === 26, "sitemap.xml must list all 26 public pages");
assert(sitemap.includes("https://argusbot.cn/zh/start.html"), "sitemap.xml lacks the Chinese Get Started page");
assert(!sitemap.includes("release.html"), "sitemap.xml still lists a release page");

for (const page of pairs.flat()) {
  const html = read(page);
  assert(!html.includes("/release.html"), `${page} still links to a release page`);
  assert(!/\bnpm\b|npmjs|@argusevolve\/argus/i.test(html), `${page} still exposes npm content`);
  assert(html.includes("https://arxiv.org/abs/2608.05144"), `${page} lacks the Argus paper link`);
  assert(html.includes("https://www.youtube.com/watch?v=i8Qy9HCboQE"), `${page} lacks the YouTube demo link`);
  assert(html.includes("https://github.com/lbx154/Argus"), `${page} lacks the Argus code link`);
}

for (const page of ["projects.html", "zh/projects.html"]) {
  const html = read(page);
  assert(html.includes("Argus AI Team"), `${page} lacks the team identity`);
  for (const domain of ["runtime", "hardware", "model", "research"]) {
    assert(html.includes(`/projects/${domain}.html`), `${page} lacks the ${domain} domain entry`);
  }
  assert((html.match(/class="project-domain-card /g) || []).length === 4, `${page} must show four domain cards`);
}

for (const domain of ["runtime", "hardware", "model", "research"]) {
  for (const page of [`projects/${domain}.html`, `zh/projects/${domain}.html`]) {
    const html = read(page);
    assert(html.includes("project-domain-hero"), `${page} lacks the domain hero`);
    assert(html.includes("project-domain-capability-grid"), `${page} lacks domain capabilities`);
    assert(html.includes("project-card"), `${page} lacks project cards`);
    assert(html.includes("/projects.html"), `${page} lacks a route back to all projects`);
  }
}

for (const page of ["get-started.html", "zh/get-started.html"]) {
  const html = read(page);
  assert(html.includes("docs/agent-install.md"), `${page} lacks the agent installation contract`);
  assert(html.includes("argus doctor --deep --advisor auto"), `${page} lacks active diagnosis`);
  assert(html.includes("GitHub Copilot CLI"), `${page} lacks the Copilot backend`);
  assert(html.includes("microsoft/ArgusAgent"), `${page} lacks the official distribution link`);
}

for (const page of ["contact.html", "zh/contact.html"]) {
  const html = read(page);
  assert((html.match(/class="team-member-card"/g) || []).length === 8, `${page} must show all eight team members`);
  for (const login of ["aHappend", "Chenxxxxxx06", "lbx154", "nssmd", "racoonykc", "Silentmoonlight", "waltstephen", "zhxianlucky"]) {
    assert(html.includes(`github.com/${login}`), `${page} lacks ${login}`);
  }
  assert(html.includes("mailto:sufeng_guo@smail.nju.edu.cn"), `${page} lacks aHappend's public email`);
  assert(html.includes("mailto:hapouterwall@gmail.com"), `${page} lacks aHappend's public README email`);
  assert(html.includes("mailto:sufeng_guo@qq.com"), `${page} lacks aHappend's public README email`);
  assert(html.includes("mailto:chenxxxxxx@mail.nwpu.edu.cn"), `${page} lacks Chenxxxxxx06's public email`);
  assert(html.includes("mailto:3653448612@qq.com"), `${page} lacks Chenxxxxxx06's public README email`);
  assert(html.includes("mailto:lbxhaixing154@sjtu.edu.cn"), `${page} lacks lbx154's public email`);
  assert(html.includes("mailto:2581235653@sjtu.edu.cn"), `${page} lacks nssmd's public README email`);
  assert(html.includes("mailto:fanyj28@mail2.sysu.edu.cn"), `${page} lacks waltstephen's public README email`);
  assert(!html.includes("team-member-card__bio"), `${page} still exposes member bios`);
  assert(!html.includes("team-member-card__stats"), `${page} still exposes profile statistics`);
  assert(html.includes("/assets/argus-wechat-group-2.jpg"), `${page} lacks the WeChat community QR code`);
}

assert(fs.existsSync(path.join(dist, "assets/argus-wechat-group-2.jpg")), "missing WeChat community QR code");

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
const englishHow = read("how.html");
const chineseHow = read("zh/how.html");
assert(englishHow.includes("/assets/nanochat-b200-trajectory.en.svg"), "English How page lacks English nanochat chart");
assert(chineseHow.includes("/assets/nanochat-b200-trajectory.svg"), "Chinese How page lacks Chinese nanochat chart");
const englishTrajectory = fs.readFileSync(path.resolve("public/assets/nanochat-b200-trajectory.en.svg"), "utf8");
const chineseTrajectory = fs.readFileSync(path.resolve("public/assets/nanochat-b200-trajectory.svg"), "utf8");
assert(!/[\u3400-\u9fff]/.test(englishTrajectory), "English nanochat chart contains Chinese labels");
assert(
  englishTrajectory.includes("human SOTA 0.9646") && chineseTrajectory.includes("human SOTA 0.9646"),
  "Bilingual nanochat charts disagree on the human SOTA reference",
);
const rightLegendLabels = [...englishTrajectory.matchAll(/<text x="678"[^>]*>([^<]+)<\/text>/g)]
  .map((match) => match[1]);
assert(rightLegendLabels.length === 5, "English nanochat chart legend count changed");
assert(
  rightLegendLabels.every((label) => [...label].length <= 24),
  `English nanochat chart legend may clip: ${rightLegendLabels.join(" | ")}`,
);

for (const page of fs.readdirSync(dist, { recursive: true })) {
  if (typeof page !== "string" || !page.endsWith(".html")) continue;
  const html = read(page);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target) assert(fs.existsSync(target), `${page} has broken link: ${match[1]}`);
  }
}

console.log(`bilingual check passed: ${pairs.length * 2} pages`);
