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

const siteUpdateTimestamps = new Set();

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
    assert(html.includes('/get-started/#desktop-download') && html.includes("v0.1.6"),
      `${page} lacks the current cross-platform download entry`);
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? "";
    assert(footer.includes('class="footer-menu"') && footer.includes('class="footer-resource-links"'),
      `${page} lacks grouped footer navigation`);
    assert(footer.includes('class="footer-download"') && footer.includes("Windows / Mac / Linux"),
      `${page} lacks the distinct footer download action`);
    assert((footer.match(/<a\b/g) || []).length === 15, `${page} lacks the existing footer destinations plus website email`);
    const credit = footer.match(/<p class="footer-credit">[\s\S]*?<\/p>/)?.[0] ?? "";
    assert(credit.includes("Sufeng Guo") && credit.includes('href="mailto:sufeng_guo@smail.nju.edu.cn"'),
      `${page} lacks the website creator and selected contact email`);
    assert(credit.includes(page.startsWith("zh/") ? "网站制作：" : "Website by")
      && credit.includes(page.startsWith("zh/") ? "网站相关问题请联系" : "For website issues, contact"),
      `${page} lacks the localized website-only support description`);
    assert(footer.indexOf('class="footer-credit"') > footer.indexOf('class="footer-updated"'),
      `${page} must place website credits beneath the update timestamp`);
    const update = footer.match(/<p class="footer-updated">[\s\S]*?<\/p>/)?.[0] ?? "";
    const timestamp = update.match(/<time datetime="([^"]+)">([^<]+)<\/time>/);
    assert(timestamp && Number.isFinite(Date.parse(timestamp[1])), `${page} lacks a valid website update time`);
    const locale = page.startsWith("zh/") ? "zh-CN" : "en-GB";
    const expectedDate = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Shanghai",
      hourCycle: "h23",
    }).format(new Date(timestamp[1]));
    assert(timestamp[2] === `${expectedDate} (UTC+8)`, `${page} has an incorrect localized update time`);
    assert(update.includes(locale === "zh-CN" ? "网站最近更新" : "Website last updated"),
      `${page} lacks the localized website update label`);
    siteUpdateTimestamps.add(timestamp[1]);
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

assert(siteUpdateTimestamps.size === 1, "all pages must share one static website build timestamp");

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
  assert(html.includes("Not a live counter") || html.includes("非实时计数"),
    `${page} must not present snapshot counts as live portal statistics`);
  assert(html.includes('datetime="2026-09-11T09:38:06Z"'), `${page} lacks the progress capture time`);
  for (const value of ["41", "617 / 757", "0", "4"]) {
    assert(new RegExp(`<dd\\b[^>]*>${value}</dd>`).test(html), `${page} lacks snapshot value ${value}`);
  }
  assert(html.includes("not certified original breakthroughs") || html.includes("不能宣传为已认证原创突破"),
    `${page} must distinguish pending novelty from original results`);
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
  assert((html.match(/class="project-detail-card project-detail-card--runtime"/g) || []).length === 3,
    `${page} must include Argus, Argus-Pi and CrystalPilot`);
  assert(html.includes('id="argus-pi"') && html.includes("github.com/Argus-AiTeam/Argus-Pi"),
    `${page} lacks the new source-preview project`);
  assert(html.includes("not a tenth Argus backend") || html.includes("不是第十个 Argus 后端"),
    `${page} must preserve the Pi backend identity`);
  assert(html.includes("no separately published package or binary release") || html.includes("没有独立发布的软件包或二进制安装包"),
    `${page} misrepresents the Argus-Pi source preview`);
  assert(html.includes('id="crystalpilot"') && html.includes("crystalpilot-downloads.argusbot.cn"),
    `${page} lacks the optional CrystalPilot distribution`);
  assert(html.includes("Proprietary: TopoSpace") || html.includes("专有许可：TopoSpace"),
    `${page} must preserve the CrystalPilot license boundary`);
  const crystal = html.match(/<article\b[^>]*id="crystalpilot"[^>]*>[\s\S]*?<\/article>/)?.[0] ?? "";
  assert(crystal.includes("Desktop v0.1.6 includes its host integration") || crystal.includes("桌面 v0.1.6 已包含宿主集成"),
    `${page} must identify the released CrystalPilot host integration`);
  assert(crystal.includes("separate installation") || crystal.includes("仍需单独安装"),
    `${page} must retain the optional plugin installation boundary`);
  assert(crystal.includes("/blob/v0.1.6/docs/workbench-plugins.md#crystalpilot-licensing"),
    `${page} lacks release-pinned plugin licensing`);
  assert(crystal.includes("no workbench plugin is enabled by default") || crystal.includes("默认不启用任何工作台插件"),
    `${page} must not imply CrystalPilot is bundled and enabled`);
}

for (const page of ["get-started/index.html", "zh/get-started/index.html", "projects/runtime/index.html", "zh/projects/runtime/index.html"]) {
  const html = read(page);
  const sourceNotes = page.includes("get-started")
    ? html.match(/<aside\b[^>]*data-source-preview[^>]*>[\s\S]*?<\/aside>/)?.[0] ?? ""
    : html.match(/<article\b[^>]*id="argus"[^>]*>[\s\S]*?<\/article>/)?.[0] ?? "";
  const releasedNotes = page.includes("get-started")
    ? html.match(/<aside\b[^>]*data-desktop-features[^>]*>[\s\S]*?<\/aside>/)?.[0] ?? ""
    : sourceNotes;
  assert(sourceNotes.includes("https://github.com/lbx154/Argus/compare/v0.1.6...b18a5f8fa8"),
    `${page} lacks the reviewed source snapshot`);
  assert(sourceNotes.includes("/blob/b18a5f8fa8/docs/hosted-research-trial.md"),
    `${page} lacks the pinned hosted research documentation`);
  assert(sourceNotes.includes("hosted research trials") || sourceNotes.includes("托管研究试用"),
    `${page} lacks the post-release hosted research update`);
  assert(sourceNotes.includes("independent operator deployment") || sourceNotes.includes("运营方独立部署"),
    `${page} must not advertise hosted research as a default desktop service`);
  assert(sourceNotes.includes("purpose-specific authorization") || sourceNotes.includes("用途授权"),
    `${page} lacks the data authorization boundary`);
  assert(sourceNotes.includes("private reasoning") || sourceNotes.includes("私有推理"),
    `${page} lacks the public-episode exclusion boundary`);
  assert(sourceNotes.includes("not included in") || sourceNotes.includes("不在"),
    `${page} must keep post-release source work separate from the published installer`);
  assert(releasedNotes.includes("v0.1.6"), `${page} lacks the released feature baseline`);
  for (const term of [".xlsx", "python -", "python -m unittest", "pip", "venv"]) {
    assert(releasedNotes.includes(term), `${page} lacks released runtime detail: ${term}`);
  }
  assert(releasedNotes.includes("not a general-purpose Python installation") || releasedNotes.includes("不是完整的通用 Python 环境"),
    `${page} must preserve the bundled runtime scope`);
  if (page.includes("get-started")) {
    assert(!sourceNotes.includes(".xlsx") && !sourceNotes.includes("python -m unittest") && !sourceNotes.includes("CrystalPilot"),
      `${page} still labels released features as source-only`);
  }
}

for (const page of ["get-started/index.html", "zh/get-started/index.html"]) {
  const html = read(page);
  for (const [id, filename, size, checksum] of [
    ["windows", "Argus-0.1.6-setup.exe", "32.1 MiB", "27c5cb90cfc532fa1d59db7c7ecebe6af373e4fc571b0935d7137fa8f0b7818e"],
    ["macos-aarch64", "Argus-0.1.6-macos-aarch64.dmg", "47.0 MiB", "33328f610cb1432179777e5496c189046de5f49c5f48ae8ac01164bf0561b6f0"],
    ["macos-x86_64", "Argus-0.1.6-macos-x86_64.dmg", "46.9 MiB", "2f4fb1d05e743bc7e14cd8436b574d0ea407daac9abc975efd8296c6762a741e"],
    ["linux-appimage", "Argus-0.1.6-linux-x86_64.AppImage", "132.4 MiB", "021fbc0f559b70b613e793e3c193f9a6766a57ab8f9115cca55e6e1375147286"],
    ["linux-deb", "Argus-0.1.6-linux-x86_64.deb", "64.6 MiB", "a1d366050b38a7c218a99d9c6343386bc858147340d3dc7bf0d7bf52d1e76db0"],
  ]) {
    assert(html.includes(`data-desktop-installer="${id}"`), `${page} lacks the ${id} download control`);
    assert(html.includes(`releases/download/v0.1.6/${filename}`), `${page} lacks the current ${id} URL`);
    assert(html.includes(size) && html.includes(checksum), `${page} has stale ${id} integrity metadata`);
  }
  assert((html.match(/data-desktop-installer=/g) || []).length === 5, `${page} must offer exactly five installer choices`);
  assert(html.includes("Argus-0.1.6-setup.exe.sig") && html.includes("Argus-0.1.6-linux-x86_64.AppImage.sig"),
    `${page} lacks the Windows or Linux updater signature`);
  assert(!html.includes(".dmg.sig") && !html.includes(".deb.sig"), `${page} offers an unpublished installer signature`);
  assert(html.includes("releases/tag/v0.1.6") && html.includes("/v0.1.6/SHA256SUMS"), `${page} lacks current release notes/checksums`);
  assert(html.includes("Ubuntu 22.04") && (html.includes("graphical desktop session") || html.includes("图形桌面会话")),
    `${page} lacks the Linux desktop requirements`);
  assert(html.includes("GPT-5.5") && html.includes("high"), `${page} lacks the current trial model setting`);
  assert(html.includes("These later changes are not included in v0.1.6 installers") || html.includes("这些后续改动不在 v0.1.6 安装包中"),
    `${page} must mark source-preview-only features`);
  assert(html.includes("Change Key") || html.includes("更换 Key"), `${page} lacks the new trial-account control`);
  assert(html.includes("preserving projects and chat history") || html.includes("保留项目和聊天记录"),
    `${page} lacks the non-destructive Key-change explanation`);
  assert(html.includes("active role") || html.includes("当前活动角色"),
    `${page} must explain the current backend/model/reasoning display`);
  assert(html.includes("does not mean the research objective is complete") || html.includes("执行结束不等于研究目标已完成"),
    `${page} must preserve the execution-versus-completion boundary`);
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
  assert(html.includes("argus_skill-0.1.6-py3-none-any.whl") && html.includes("argus_skill-0.1.6.tar.gz"),
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
  assert(html.includes('/get-started/#desktop-download') && html.includes("releases/tag/v0.1.6"),
    `${page} lacks the current cross-platform chooser and release notes`);
  assert(html.includes("Argus-Pi") && html.includes("CrystalPilot") && html.includes("/projects/mathematics/#research-progress"),
    `${page} lacks the new project and research-progress entry points`);
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
  assert(!/Argus-0\.1\.[1-5]-setup\.exe|Windows 0\.1\.[1-5]|releases\/download\/v0\.1\.[1-5]\//.test(html),
    `${page} still advertises the superseded desktop release`);
  assert(!html.includes("This release has no Linux desktop installer") && !html.includes("此 Release 不提供 Linux 桌面安装包"),
    `${page} still denies the published Linux desktop builds`);
  assert(!html.includes("Every platform needs one authenticated Agent CLI") && !html.includes("所有平台都需要一个已登录的 Agent CLI"),
    `${page} incorrectly applies own-account requirements to invitation trial mode`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target) assert(fs.existsSync(target), `${page} has broken link: ${match[1]}`);
  }
}

console.log(`bilingual check passed: ${pairs.length * 2} pages`);
