import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const pairs = [
  ["index.html", "zh/index.html"],
  ["contact/index.html", "zh/contact/index.html"],
  ["how/index.html", "zh/how/index.html"],
  ["projects/index.html", "zh/projects/index.html"],
  ["projects/runtime/index.html", "zh/projects/runtime/index.html"],
  ["projects/hardware/index.html", "zh/projects/hardware/index.html"],
  ["projects/model/index.html", "zh/projects/model/index.html"],
  ["projects/mathematics/index.html", "zh/projects/mathematics/index.html"],
  ["results/index.html", "zh/results/index.html"],
  ["research/index.html", "zh/research/index.html"],
  ["get-started/index.html", "zh/get-started/index.html"],
  ["start/index.html", "zh/start/index.html"],
  ["use-cases/index.html", "zh/use-cases/index.html"],
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
  assert((english.match(/data-language-switch/g) || []).length >= 2, `${englishPath} lacks in-place language switching`);
  assert((chinese.match(/data-language-switch/g) || []).length >= 2, `${chinesePath} lacks in-place language switching`);
  assert(english.includes("argus-language-switch"), `${englishPath} lacks language scroll restoration`);
  assert(chinese.includes("argus-language-switch"), `${chinesePath} lacks language scroll restoration`);
  assert(english.includes("location.replace"), `${englishPath} adds language changes to browser history`);
  assert(chinese.includes("location.replace"), `${chinesePath} adds language changes to browser history`);
  assert(english.includes("data-theme-toggle"), `${englishPath} lacks theme toggle`);
  assert(chinese.includes("data-theme-toggle"), `${chinesePath} lacks theme toggle`);
  assert(english.includes("argus-site-theme"), `${englishPath} lacks theme persistence`);
  let visibleEnglish = english
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/中/g, "");
  if (englishPath === "contact/index.html") {
    visibleEnglish = visibleEnglish.replace(
      /<article class="team-member-card">[\s\S]*?<\/article>/g,
      "",
    );
  }
  assert(!/[\u3400-\u9fff]/.test(visibleEnglish), `${englishPath} leaks Chinese visible copy`);
  assert(/[\u3400-\u9fff]/.test(chinese), `${chinesePath} lacks Chinese copy`);
  assert(!english.includes("argus-mark-gold.png"), `${englishPath} still uses the legacy mark`);
  assert(!chinese.includes("argus-mark-gold.png"), `${chinesePath} still uses the legacy mark`);
  assert(english.includes('data-logo-tone="adaptive"'), `${englishPath} lacks adaptive logos`);
  assert(chinese.includes('data-logo-tone="adaptive"'), `${chinesePath} lacks adaptive logos`);
  assert(english.includes('class="footer-brand"') && english.includes('aria-label="Argus home"'), `${englishPath} footer logo is unnamed`);
  assert(chinese.includes('class="footer-brand"') && chinese.includes('aria-label="Argus 首页"'), `${chinesePath} footer logo is unnamed`);
  const pixelScenes = [];
  for (const [page, html] of [[englishPath, english], [chinesePath, chinese]]) {
    assert(html.includes("document.startViewTransition"), `${page} lacks the shared theme reveal`);
    assert(html.includes('/get-started/#desktop-download') && html.includes("v0.1.3"),
      `${page} lacks the current cross-platform download entry`);
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? "";
    assert(footer.includes('class="footer-menu"') && footer.includes('class="footer-resource-links"'),
      `${page} lacks grouped footer navigation`);
    assert(footer.includes('class="footer-download"') && footer.includes("Windows / Mac"),
      `${page} lacks the distinct footer download action`);
    assert((footer.match(/<a\b/g) || []).length === 14, `${page} lost an existing footer destination`);
    for (const heading of ["footer-explore-heading", "footer-resources-heading"]) {
      assert(footer.includes(`aria-labelledby="${heading}"`) && footer.includes(`id="${heading}"`),
        `${page} lacks an accessible footer group heading`);
    }
    assert(!/[📄🎬💻]/u.test(footer), `${page} still mixes emoji styles into footer navigation`);
    const scenes = Array.from(html.matchAll(/<img\b[^>]*src="(\/art\/pixel\/[^"]+)"/g), ([, src]) => src);
    assert(scenes.length > 0, `${page} lacks its pixel illustration`);
    assert((html.match(/data-inline-scene="/g) || []).length >= 2, `${page} lacks middle and lower pixel illustrations`);
    for (const src of scenes) {
      assert(fs.existsSync(path.join(dist, src.slice(1))), `${page} references missing artwork: ${src}`);
    }
    if (englishPath !== "index.html") {
      assert(html.includes("data-page-scene="), `${page} lacks its illustrated page header`);
    }
    pixelScenes.push(scenes.join("\n"));
  }
  assert(pixelScenes[0] === pixelScenes[1], `${englishPath} and ${chinesePath} show different artwork`);
}

for (const page of ["index.html", "zh/index.html"]) {
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
assert(sitemap.includes("https://argusbot.cn/zh/start/"), "sitemap.xml lacks the Chinese Get Started page");
assert(!sitemap.includes("release.html"), "sitemap.xml still lists a release page");
assert(!sitemap.includes(".html</loc>"), "sitemap.xml still publishes .html page URLs");

for (const page of pairs.flat()) {
  const html = read(page);
  assert(!html.includes("/release.html"), `${page} still links to a release page`);
  assert(!/href="\/(?!chipbench-dashboard\.html|process-dashboard\.html|razavi-dashboard\.html)[^"]*\.html(?:[#?"][^>]*)/.test(html), `${page} still contains a public .html route`);
  assert(!/\bnpm\b|npmjs|@argusevolve\/argus/i.test(html), `${page} still exposes npm content`);
  assert(html.includes("https://arxiv.org/abs/2608.05144"), `${page} lacks the Argus paper link`);
  assert(html.includes("https://www.youtube.com/watch?v=i8Qy9HCboQE"), `${page} lacks the YouTube demo link`);
  assert(html.includes("https://github.com/lbx154/Argus"), `${page} lacks the Argus code link`);
}

for (const page of ["projects/index.html", "zh/projects/index.html"]) {
  const html = read(page);
  assert(html.includes("Argus AI Team"), `${page} lacks the team identity`);
  for (const domain of ["runtime", "hardware", "model", "mathematics"]) {
    assert(html.includes(`/projects/${domain}/`), `${page} lacks the ${domain} domain entry`);
  }
  assert((html.match(/class="project-domain-card /g) || []).length === 4, `${page} must show four domain cards`);
  assert(!html.includes("reuse an Agent CLI you already have") && !html.includes("选择已有 Agent CLI 作为后端"),
    `${page} must not require an existing CLI for invitation trial users`);
}

for (const page of ["start/index.html", "zh/start/index.html"]) {
  const html = read(page);
  assert(html.includes("not the latest installation flow") || html.includes("不代表最新版安装流程"),
    `${page} must distinguish historical recordings from current onboarding`);
  assert(html.includes("Source CLI") || html.includes("源码 CLI"),
    `${page} must scope launch commands to source installations`);
}

for (const page of ["how/index.html", "zh/how/index.html"]) {
  const html = read(page);
  const stages = [...html.matchAll(/<strong>(idea|experiment|paper|review)<\/strong>/g)].map((match) => match[1]);
  assert(stages.join(",") === "idea,experiment,paper,review", `${page} must show the current four canonical research stages`);
  assert(!html.includes("<strong>submission</strong>"), `${page} still presents legacy stage aliases as current stages`);
  assert(html.includes("self-review permitted low-risk work") || html.includes("获准的低风险工作可以自审"),
    `${page} lacks the selective independent-review boundary`);
}

for (const page of ["contact/index.html", "zh/contact/index.html"]) {
  const html = read(page);
  assert(html.includes("https://github.com/lbx154/Argus/issues") &&
    html.includes("https://github.com/microsoft/ArgusAgent/issues"),
    `${page} must distinguish desktop/preview support from official-source support`);
}

for (const domain of ["runtime", "hardware", "model", "mathematics"]) {
  for (const page of [`projects/${domain}/index.html`, `zh/projects/${domain}/index.html`]) {
    const html = read(page);
    assert(html.includes("project-domain-hero"), `${page} lacks the domain hero`);
    assert(!html.includes("project-domain-capability-grid"), `${page} still includes domain capabilities`);
    assert(html.includes("project-detail-card"), `${page} lacks detailed project profiles`);
    assert(html.includes("project-detail-card__problem"), `${page} lacks project problem statements`);
    assert(html.includes("project-detail-card__evidence"), `${page} lacks project evidence`);
    assert(html.includes("project-detail-card__github"), `${page} lacks prominent GitHub actions`);
    assert(html.includes("/projects/"), `${page} lacks a route back to all projects`);
  }
}

for (const page of ["projects/mathematics/index.html", "zh/projects/mathematics/index.html"]) {
  const html = read(page);
  assert(html.includes("Argus Mathematics"), `${page} lacks the Argus Mathematics project`);
  assert(html.includes("github.com/Argus-AiTeam/argus-mathematics"), `${page} lacks the mathematics result repository`);
  assert(html.includes("https://open.argusbot.cn/"), `${page} lacks the live mathematics portal`);
  assert(html.includes("Seventeen mathematical result packages") || html.includes("十七个数学成果包"), `${page} lacks the current mathematics result count`);
  assert(html.includes("81 public artifacts") || html.includes("81 个公开产物"), `${page} lacks the current evidence count`);
  assert((html.match(/class="project-detail-card project-detail-card--mathematics"/g) || []).length === 2, `${page} must show both mathematics projects`);
  assert(html.includes("published repository snapshot") || html.includes("公开仓库快照"),
    `${page} must not present snapshot counts as live portal statistics`);
}

for (const page of ["projects/hardware/index.html", "zh/projects/hardware/index.html"]) {
  const html = read(page);
  assert(html.includes("PUBLICATION_BOUNDARY.md") && html.includes("Alpha-2/3"),
    `${page} must identify the preserved ACE-2 baseline and current project boundary`);
  assert(html.includes("later hardware Stage 2") || html.includes("后续硬件 Stage 2"),
    `${page} lacks the cancelled hardware follow-on boundary`);
}

for (const page of ["projects/runtime/index.html", "zh/projects/runtime/index.html"]) {
  const html = read(page);
  assert(html.includes("Open official source repository") || html.includes("打开官方源码仓库"),
    `${page} must distinguish the official source repository from desktop releases`);
  assert(!html.includes("Open official release") && !html.includes("打开官方发行仓库"),
    `${page} mislabels source as a packaged release`);
}

for (const page of ["get-started/index.html", "zh/get-started/index.html"]) {
  const html = read(page);
  for (const [id, filename, size, checksum] of [
    ["windows", "Argus-0.1.3-setup.exe", "32.2 MiB", "9f50fa4cafba88207786bfc3c68ef5559d741ca0467c285f724c45ec1f0ffbfd"],
    ["macos-aarch64", "Argus-0.1.3-macos-aarch64.dmg", "52.6 MiB", "44ceebdd5d72da01b735f63ee2ca988f6dd917719c647f45ac83c583c719ef47"],
    ["macos-x86_64", "Argus-0.1.3-macos-x86_64.dmg", "52.5 MiB", "2fda9c99b0731606a60d5cfeaceb80693aa7829b8dbcb75e031715a81e3c3bf2"],
  ]) {
    assert(html.includes(`data-desktop-installer="${id}"`), `${page} lacks the ${id} download control`);
    assert(html.includes(`releases/download/v0.1.3/${filename}`), `${page} lacks the current ${id} URL`);
    assert(html.includes(size) && html.includes(checksum), `${page} has stale ${id} integrity metadata`);
  }
  assert((html.match(/data-desktop-installer=/g) || []).length === 3, `${page} must offer exactly three desktop builds`);
  assert(html.includes("Argus-0.1.3-setup.exe.sig"), `${page} lacks the Windows updater signature`);
  assert(!html.includes(".dmg.sig"), `${page} incorrectly offers a signature for a DMG instead of an update archive`);
  assert(html.includes("releases/tag/v0.1.3") && html.includes("/v0.1.3/SHA256SUMS"), `${page} lacks current release notes/checksums`);
  assert(html.includes("macOS 13+") && html.includes("Apple Silicon") && html.includes("Intel"), `${page} lacks Mac compatibility guidance`);
  assert(html.includes("Microsoft Edge WebView2 Runtime"), `${page} lacks the desktop prerequisite`);
  assert(html.includes("not a Windows Authenticode") || html.includes("不等于 Windows Authenticode"),
    `${page} must distinguish updater signatures from Windows certificate signing`);
  assert(html.includes("尚未经过 Apple Developer ID 公证") || html.includes("not Apple Developer ID notarized"),
    `${page} lacks the Mac internal-build trust warning`);
  assert(html.includes("stop any running Argus tasks") || html.includes("先停止正在进行的 Argus 任务"),
    `${page} lacks the safe-upgrade reminder`);
  assert(html.includes('id="desktop-first-run"') && html.includes('id="source-first-run"'),
    `${page} must separate desktop and source onboarding`);
  assert(html.includes('data-desktop-mode="trial"') && html.includes('data-desktop-mode="own-account"'),
    `${page} must offer both invitation trial and own-account modes`);
  assert(html.includes("1,000,000") && (html.includes("私下发放") || html.includes("distributed privately")),
    `${page} lacks the invitation-only trial and lifetime allowance boundary`);
  assert(html.includes("argus_skill-0.1.3-py3-none-any.whl") && html.includes("argus_skill-0.1.3.tar.gz"),
    `${page} lacks the versioned Python release assets`);
  assert(html.includes("docs/agent-install.md"), `${page} lacks the agent installation contract`);
  assert(html.includes("https://github.com/microsoft/ArgusAgent/blob/main/docs/agent-install.md"),
    `${page} must default source installation to the official channel`);
  assert(html.includes("保持已有安装的渠道") || /Keep an existing installation(?:'|&#39;)s channel/.test(html),
    `${page} must preserve an existing installation channel in the copyable prompt`);
  assert(html.includes("argus doctor --deep --advisor auto"), `${page} lacks active diagnosis`);
  assert(html.includes("GitHub Copilot CLI"), `${page} lacks the Copilot backend`);
  for (const [name, id] of [
    ["OpenAI Codex CLI", "codex"],
    ["Claude Code", "claude"],
    ["Cursor CLI", "cursor"],
    ["Pi", "pi"],
    ["OpenCode", "opencode"],
    ["xAI Grok Build", "grok"],
    ["Qoder CLI", "qoder"],
    ["DeepSeek Harness", "dsh"],
  ]) {
    assert(html.includes(name), `${page} lacks the ${name} backend`);
    assert(html.includes(`<code>${id}</code>`), `${page} lacks the ${id} backend identifier`);
  }
  assert((html.match(/class="backend-card(?: |")/g) || []).length === 9, `${page} must show nine backend cards`);
  assert(html.includes("docs/backend-providers.md"), `${page} lacks the backend provider guide`);
  assert(
    html.includes("内部 Key 试用会自动下载 Copilot") ||
      html.includes("Internal-Key trial mode downloads Copilot automatically"),
    `${page} must distinguish trial-managed Copilot from own-account backends`,
  );
  assert(html.includes("microsoft/ArgusAgent"), `${page} lacks the official distribution link`);
}

for (const page of ["index.html", "zh/index.html"]) {
  const html = read(page);
  assert(html.includes('/get-started/#desktop-download') && html.includes("releases/tag/v0.1.3"),
    `${page} lacks the current Windows/Mac chooser and release notes`);
}

for (const page of ["contact/index.html", "zh/contact/index.html"]) {
  const html = read(page);
  assert((html.match(/class="team-member-card"/g) || []).length === 5, `${page} must show five members with public email`);
  for (const login of ["aHappend", "Chenxxxxxx06", "lbx154", "nssmd", "waltstephen"]) {
    assert(html.includes(`github.com/${login}`), `${page} lacks ${login}`);
  }
  for (const login of ["racoonykc", "Silentmoonlight", "zhxianlucky"]) {
    assert(!html.includes(`github.com/${login}`), `${page} still lists removed contact ${login}`);
  }
  assert(!html.includes("team-member-card__no-email"), `${page} still displays a member without public email`);
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

for (const page of ["start/index.html", "zh/start/index.html"]) {
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
for (const name of ["theme-pixel-reveal", "theme-pixel-content"]) {
  const frames = css.match(new RegExp(
    `@keyframes ${name}\\s*\\{\\s*from\\s*\\{([^}]*)\\}\\s*to\\s*\\{([^}]*)\\}\\s*\\}`,
  ));
  assert(frames, `${name} keyframes are missing`);
  assert(
    frames.slice(1).every((frame) => /^transform:\s*translateX\([^;]+\);$/.test(frame.trim())),
    `${name} must animate only translation, not repaint a changing pixel clip`,
  );
}
const revealTiming = css.match(/animation:\s*theme-pixel-reveal\s+([^;]+);/);
const contentTiming = css.match(/animation:\s*theme-pixel-content\s+([^,]+),/);
assert(revealTiming && contentTiming && revealTiming[1] === contentTiming[1],
  "theme mask and content need identical timing to keep the page stationary");
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
  "dark-compatible favicon.ico is not the primary icon declaration",
);
const smallFavicon = fs.readFileSync(path.resolve("public/assets/argus-mark-rounded-small.svg"), "utf8");
assert(
  smallFavicon.includes('fill="#000000"'),
  "small SVG favicon is not monochrome",
);
const darkFavicon = fs.readFileSync(path.resolve("public/assets/argus-mark-rounded-dark-favicon.svg"), "utf8");
assert(
  home.includes('href="/assets/argus-mark-rounded-dark-favicon.svg" media="(prefers-color-scheme: dark)"'),
  "dark SVG favicon link missing",
);
for (const color of ["#d7d9dc", "#ffffff", "#202326", "#080a0b"]) {
  assert(darkFavicon.includes(`fill="${color}"`), `dark SVG favicon lacks ${color}`);
}
const englishHow = read("how/index.html");
const chineseHow = read("zh/how/index.html");
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
  assert(!/Argus-0\.1\.[12]-setup\.exe|Windows 0\.1\.[12]/.test(html),
    `${page} still advertises the superseded desktop release`);
  assert(!html.includes("Every platform needs one authenticated Agent CLI") && !html.includes("所有平台都需要一个已登录的 Agent CLI"),
    `${page} incorrectly applies own-account requirements to invitation trial mode`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target) assert(fs.existsSync(target), `${page} has broken link: ${match[1]}`);
  }
}

console.log(`bilingual check passed: ${pairs.length * 2} pages`);
