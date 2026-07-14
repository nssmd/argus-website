# 12-Hour Autonomous Run Film Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a 100–110 second bilingual, speed-ramped proof of a 12-hour Argus autonomous run and add it only to the Get Started page with six seekable chapters and a full-source link.

**Architecture:** A reproducible Python timeline builder generates an FFmpeg filter graph and ASS overlay track from declarative segment data. The checked-in WebM, MP4, poster, and source recording are rendered by that script. A single Astro component owns playback, chapter seeking, reduced-motion, and visibility behavior; the English and Chinese Get Started routes share that component through the existing locale routing.

**Tech Stack:** Python 3.13, FFmpeg, ASS subtitles, Astro 5, TypeScript, CSS, Playwright, PyAV for isolated verification

## Global Constraints

- Final short-film duration must remain between 100 and 110 seconds.
- Source facts are fixed: 18:43.2, 960×624, 10 fps, H.264, no audio.
- Never describe the 18:43 source as an uncut 12-hour recording.
- English is the primary burned-in caption; Chinese is shorter secondary text.
- Reviewer rejection, autonomous recovery, and final submission remain readable at 1.5–4×.
- No voice-over, music dependency, or additional browser animation runtime.
- Place the component only on Get Started, after the 26-second WebUI walkthrough and before the final CTA.
- The homepage must not request the short film, source film, or poster.
- With reduced motion, do not autoplay, auto-seek, or animate chapter state.
- Keep the existing CLI and 26-second WebUI demonstrations unchanged.

---

### Task 1: Declarative Edit Timeline

**Files:**
- Create: `scripts/autonomous_run_film.py`
- Create: `scripts/test_autonomous_run_film.py`

**Interfaces:**
- Produces: `SEGMENTS`, `CHAPTERS`, `CAPTIONS`, `output_duration()`, `validate_timeline()`, `write_ass(path)`, and `build_filter_graph()`.
- Consumes: no project runtime dependency; standard-library Python only.

- [ ] **Step 1: Write the failing timeline tests**

Create `scripts/test_autonomous_run_film.py`:

```python
import unittest

from autonomous_run_film import CHAPTERS, SEGMENTS, output_duration, validate_timeline


class TimelineTest(unittest.TestCase):
    def test_edit_is_105_seconds_and_source_is_contiguous(self):
        self.assertEqual(output_duration(), 105)
        self.assertEqual(SEGMENTS[0].source_start, 0)
        self.assertEqual(SEGMENTS[-1].source_end, 1123.2)
        for current, following in zip(SEGMENTS, SEGMENTS[1:]):
            self.assertEqual(current.source_end, following.source_start)
        validate_timeline()

    def test_six_chapters_cover_the_edit(self):
        self.assertEqual(
            [chapter.slug for chapter in CHAPTERS],
            ["grounding", "planning", "execution", "rejection", "recovery", "submission"],
        )
        self.assertEqual(CHAPTERS[0].output_start, 0)
        self.assertEqual(CHAPTERS[-1].output_start, 96)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test and verify the import fails**

Run:

```bash
cd /home/argustest/argus-website
PYTHONPATH=scripts python -m unittest scripts/test_autonomous_run_film.py -v
```

Expected: FAIL because `autonomous_run_film` does not exist.

- [ ] **Step 3: Implement the declarative timeline**

Create `scripts/autonomous_run_film.py` with these exact public structures:

```python
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Segment:
    source_start: float
    source_end: float
    output_duration: float
    zoom: float = 1.0


@dataclass(frozen=True)
class Chapter:
    slug: str
    output_start: float
    label_en: str
    label_zh: str


@dataclass(frozen=True)
class Caption:
    start: float
    end: float
    primary: str
    secondary: str


SEGMENTS = (
    Segment(0, 35, 7),
    Segment(35, 225, 12),
    Segment(225, 265, 12, 1.16),
    Segment(265, 420, 12),
    Segment(420, 455, 12, 1.18),
    Segment(455, 555, 11),
    Segment(555, 600, 12, 1.2),
    Segment(600, 790, 10, 1.06),
    Segment(790, 1060, 8),
    Segment(1060, 1123.2, 9, 1.12),
)

CHAPTERS = (
    Chapter("grounding", 0, "Grounding", "资料落地"),
    Chapter("planning", 14, "Planning", "规划"),
    Chapter("execution", 31, "Execution", "执行"),
    Chapter("rejection", 43, "Rejection", "打回"),
    Chapter("recovery", 78, "Recovery", "修正"),
    Chapter("submission", 96, "Submission", "提交"),
)

CAPTIONS = (
    Caption(0, 7, "12 HOURS. NO HUMAN INPUT.", "12 小时，无人工接管"),
    Caption(7, 14, "The mission enters Argus Life.", "任务进入 Argus Life"),
    Caption(14, 25, "Planner turns the objective into executable work.", "Planner 将目标拆成可执行工作"),
    Caption(31, 43, "Engineer gathers evidence and builds artifacts.", "Engineer 收集证据并构建产物"),
    Caption(43, 55, "Reviewer rejects insufficient evidence.", "Reviewer 打回不足的证据"),
    Caption(55, 66, "No human prompt. The system revises and continues.", "无人接管，系统自行修正并继续"),
    Caption(78, 88, "The run recovers and advances.", "系统修正后继续推进"),
    Caption(96, 105, "The run reaches submission review.", "运行进入最终提交审查"),
)


def output_duration() -> float:
    return sum(segment.output_duration for segment in SEGMENTS)


def validate_timeline() -> None:
    assert 100 <= output_duration() <= 110
    assert SEGMENTS[0].source_start == 0
    assert SEGMENTS[-1].source_end == 1123.2
    assert all(a.source_end == b.source_start for a, b in zip(SEGMENTS, SEGMENTS[1:]))
    assert all(a.output_start < b.output_start for a, b in zip(CHAPTERS, CHAPTERS[1:]))
    assert all(0 <= caption.start < caption.end <= output_duration() for caption in CAPTIONS)
```

- [ ] **Step 4: Add ASS generation and filter graph generation**

In the same file, implement:

```python
def _ass_time(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int(seconds % 3600 // 60)
    remainder = seconds % 60
    return f"{hours}:{minutes:02d}:{remainder:05.2f}"


def write_ass(path: Path) -> None:
    header = """[Script Info]
ScriptType: v4.00+
PlayResX: 960
PlayResY: 624
WrapStyle: 2

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Caption,Noto Sans CJK SC,28,&H00FFFFFF,&H00D9E8FF,&H00101A32,&H90060B18,0,0,0,0,100,100,0,0,3,1,0,2,48,48,44,1
Style: Secondary,Noto Sans CJK SC,18,&H00D9E8FF,&H00FFFFFF,&H00101A32,&H00000000,0,0,0,0,100,100,0,0,1,1,0,2,48,48,20,1
Style: Header,DejaVu Sans Mono,16,&H00FFFFFF,&H00FFFFFF,&H00101A32,&H70060B18,1,0,0,0,100,100,1,0,3,1,0,7,24,24,18,1
Style: Clock,DejaVu Sans Mono,16,&H006FC9ED,&H00FFFFFF,&H00101A32,&H70060B18,1,0,0,0,100,100,1,0,3,1,0,9,24,24,18,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
    events = []
    duration = output_duration()
    events.append(f"Dialogue: 0,0:00:00.00,{_ass_time(duration)},Header,,0,0,0,,REAL RUN · 12H CONTINUOUS")
    for second in range(int(duration)):
        elapsed = round(12 * second / duration, 1)
        events.append(
            f"Dialogue: 0,{_ass_time(second)},{_ass_time(second + 1)},Clock,,0,0,0,,ELAPSED {elapsed:04.1f}H / 12H"
        )
    for caption in CAPTIONS:
        events.append(
            f"Dialogue: 0,{_ass_time(caption.start)},{_ass_time(caption.end)},Caption,,0,0,0,,"
            f"{caption.primary}\\N{{\\fs18\\c&HFFE8D9&}}{caption.secondary}"
        )
    path.write_text(header + "\n".join(events) + "\n", encoding="utf-8")


def build_filter_graph(ass_path: Path) -> str:
    chains = []
    labels = []
    for index, segment in enumerate(SEGMENTS):
        factor = segment.output_duration / (segment.source_end - segment.source_start)
        chain = (
            f"[0:v]trim=start={segment.source_start}:end={segment.source_end},"
            f"setpts=(PTS-STARTPTS)*{factor:.10f}"
        )
        if segment.zoom != 1:
            width = round(960 * segment.zoom)
            height = round(624 * segment.zoom)
            chain += f",scale={width}:{height},crop=960:624"
        chain += f",fps=30,format=yuv420p[v{index}]"
        chains.append(chain)
        labels.append(f"[v{index}]")
    escaped = str(ass_path).replace("\\", "\\\\").replace(":", "\\:")
    chains.append(f"{''.join(labels)}concat=n={len(labels)}:v=1:a=0,subtitles='{escaped}'[outv]")
    return ";".join(chains)
```

- [ ] **Step 5: Run timeline tests**

Run:

```bash
PYTHONPATH=scripts python -m unittest scripts/test_autonomous_run_film.py -v
```

Expected: 2 tests PASS.

- [ ] **Step 6: Commit the timeline builder**

```bash
git add scripts/autonomous_run_film.py scripts/test_autonomous_run_film.py
git commit -m "feat: define autonomous run film timeline"
```

---

### Task 2: Render and Verify Media Assets

**Files:**
- Modify: `scripts/autonomous_run_film.py`
- Create: `public/assets/demos/argus-12h-in-105s.webm`
- Create: `public/assets/demos/argus-12h-in-105s.mp4`
- Create: `public/assets/demos/argus-12h-in-105s-poster.webp`
- Create: `public/assets/demos/argus-12h-source-18m43s.mp4`

**Interfaces:**
- Consumes: timeline structures and filter graph from Task 1.
- Produces: four checked-in public assets with stable names.

- [ ] **Step 1: Add a command-line renderer**

Append to `scripts/autonomous_run_film.py`:

```python
import argparse
import shutil
import subprocess
import tempfile


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def render(source: Path, output_dir: Path, ffmpeg: str) -> None:
    validate_timeline()
    output_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="argus-film-") as temp:
        ass = Path(temp) / "overlay.ass"
        graph = Path(temp) / "filter.txt"
        intermediate = Path(temp) / "edited.mp4"
        write_ass(ass)
        graph.write_text(build_filter_graph(ass), encoding="utf-8")
        run([
            ffmpeg, "-y", "-i", str(source), "-filter_complex_script", str(graph),
            "-map", "[outv]", "-an", "-c:v", "libx264", "-preset", "slow",
            "-crf", "20", "-movflags", "+faststart", str(intermediate),
        ])
        run([
            ffmpeg, "-y", "-i", str(intermediate), "-an", "-c:v", "libx264",
            "-profile:v", "high", "-preset", "slow", "-crf", "22",
            "-movflags", "+faststart", str(output_dir / "argus-12h-in-105s.mp4"),
        ])
        run([
            ffmpeg, "-y", "-i", str(intermediate), "-an", "-c:v", "libvpx-vp9",
            "-b:v", "0", "-crf", "31", "-row-mt", "1",
            str(output_dir / "argus-12h-in-105s.webm"),
        ])
        run([
            ffmpeg, "-y", "-ss", "4", "-i", str(intermediate), "-frames:v", "1",
            "-c:v", "libwebp", "-quality", "86",
            str(output_dir / "argus-12h-in-105s-poster.webp"),
        ])
    shutil.copy2(source, output_dir / "argus-12h-source-18m43s.mp4")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--ffmpeg", required=True)
    args = parser.parse_args()
    render(args.source, args.output_dir, args.ffmpeg)
```

- [ ] **Step 2: Install an isolated FFmpeg binary**

Run:

```bash
python -m pip install --quiet --target /tmp/argus-video-tools imageio-ffmpeg av
FFMPEG="$(PYTHONPATH=/tmp/argus-video-tools python -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')"
"$FFMPEG" -version | head -1
```

Expected: an FFmpeg version line. Do not modify project dependency manifests.

- [ ] **Step 3: Render the four assets**

Run:

```bash
PYTHONPATH=scripts python scripts/autonomous_run_film.py \
  --source /home/argustest/argustest2/demo/c5b9959bef6a9b928e3bc1b8f1a60996_raw.mp4 \
  --output-dir public/assets/demos \
  --ffmpeg "$FFMPEG"
```

Expected: WebM, MP4, WebP, and source MP4 exist with nonzero sizes.

- [ ] **Step 4: Verify media facts with isolated PyAV**

Run:

```bash
PYTHONPATH=/tmp/argus-video-tools python - <<'PY'
from pathlib import Path
import av

root = Path("public/assets/demos")
for name in ("argus-12h-in-105s.webm", "argus-12h-in-105s.mp4"):
    container = av.open(str(root / name))
    duration = container.duration / av.time_base
    stream = container.streams.video[0]
    assert 100 <= duration <= 110, (name, duration)
    assert (stream.width, stream.height) == (960, 624)
    assert not container.streams.audio
    print(name, duration, stream.codec_context.name)
assert (root / "argus-12h-in-105s-poster.webp").stat().st_size > 10_000
assert (root / "argus-12h-source-18m43s.mp4").stat().st_size == 18_027_351
PY
```

Expected: both encodings satisfy duration, dimensions, and no-audio checks.

- [ ] **Step 5: Review milestone frames**

Extract frames at 5, 25, 49, 72, 84, and 101 seconds and inspect them as one contact sheet. Confirm captions do not hide role/status rows and the zoom retains the full decision text.

- [ ] **Step 6: Commit media assets**

```bash
git add scripts/autonomous_run_film.py public/assets/demos/argus-12h-*
git commit -m "feat: render 12-hour autonomous run film"
```

---

### Task 3: Seekable Film Component

**Files:**
- Create: `src/components/AutonomousRunFilm.astro`
- Modify: `src/styles/global.css`
- Modify: `scripts/check-bilingual.mjs`

**Interfaces:**
- Consumes: media assets from Task 2.
- Produces: `AutonomousRunFilm` with props `{ locale: "en" | "zh"; showFullRun?: boolean }`.

- [ ] **Step 1: Add failing built-output assertions**

In `scripts/check-bilingual.mjs`, after existing route checks, add:

```js
const englishStart = await readFile(join(dist, "start.html"), "utf8");
const chineseStart = await readFile(join(dist, "zh/start.html"), "utf8");
const englishHome = await readFile(join(dist, "index.html"), "utf8");
const chineseHome = await readFile(join(dist, "zh.html"), "utf8");

for (const html of [englishStart, chineseStart]) {
  assert.match(html, /data-autonomous-run-film/);
  assert.equal((html.match(/data-run-chapter/g) ?? []).length, 6);
  assert.match(html, /argus-12h-in-105s\.webm/);
  assert.match(html, /argus-12h-in-105s\.mp4/);
}
for (const html of [englishHome, chineseHome]) {
  assert.doesNotMatch(html, /argus-12h-in-105s/);
  assert.doesNotMatch(html, /data-autonomous-run-film/);
}
```

- [ ] **Step 2: Run the build and confirm the component assertion fails**

Run:

```bash
npm run build
```

Expected: FAIL because Get Started does not contain `data-autonomous-run-film`.

- [ ] **Step 3: Create the component markup and localized copy**

Create `src/components/AutonomousRunFilm.astro` with:

```astro
---
type Props = { locale: "en" | "zh"; showFullRun?: boolean };
const { locale, showFullRun = false } = Astro.props;
const zh = locale === "zh";
const chapters = [
  [0, "Grounding", "资料落地"],
  [14, "Planning", "规划"],
  [31, "Execution", "执行"],
  [43, "Rejection", "打回"],
  [78, "Recovery", "修正"],
  [96, "Submission", "提交"],
] as const;
---

<section class="autonomous-film" data-autonomous-run-film>
  <div class="section-head wide">
    <p class="eyebrow">{zh ? "12 小时自主运行" : "12-hour autonomous run"}</p>
    <h2>{zh ? "压缩的是时间，不是连续性。" : "12 hours of autonomous research, compressed—not interrupted."}</h2>
    <p>{zh
      ? "这段 105 秒短片来自一份 18:43 的源录屏，记录 Argus 在无人接管下持续研究、被打回、自行修正并推进到提交审查。"
      : "This 105-second film comes from an 18:43 source recording of Argus researching, being rejected, revising itself, and reaching submission review without human takeover."}</p>
  </div>
  <div class="autonomous-film__frame">
    <video
      data-run-video
      controls
      muted
      playsinline
      preload="metadata"
      poster="/assets/demos/argus-12h-in-105s-poster.webp"
      aria-label={zh ? "Argus 12 小时自主运行剪辑" : "Argus 12-hour autonomous run edit"}
    >
      <source src="/assets/demos/argus-12h-in-105s.webm" type="video/webm" />
      <source src="/assets/demos/argus-12h-in-105s.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="autonomous-film__chapters" aria-label={zh ? "视频章节" : "Video chapters"}>
    {chapters.map(([time, en, cn], index) => (
      <button type="button" data-run-chapter data-time={time} aria-current={index === 0 ? "true" : undefined}>
        <span>{en}</span><small>{cn}</small>
      </button>
    ))}
  </div>
  <p class="autonomous-film__note">
    {zh ? "源录屏代表完整的 12 小时连续运行。" : "The source recording represents the complete 12-hour continuous run."}
    {showFullRun && <a href="/assets/demos/argus-12h-source-18m43s.mp4">{zh ? "观看完整 18:43 源录屏 →" : "Watch the full 18:43 source recording →"}</a>}
  </p>
</section>
```

- [ ] **Step 4: Implement playback and chapter behavior**

Add a component script that:

- Creates one controller per `[data-autonomous-run-film]`.
- Detects `prefers-reduced-motion`.
- Marks `manual = true` on native `play`, `pause`, `seeking`, or control interaction unless a local `programmatic` guard is set.
- Uses `IntersectionObserver` at threshold `0.35` to play/pause only while `manual` is false and reduced motion is false.
- On chapter click, sets `manual = true`, seeks to `Number(button.dataset.time)`, and calls `video.play()`.
- On `timeupdate`, applies `aria-current="true"` to the last chapter whose time is at or before `video.currentTime`.
- Removes observers/listeners on `pagehide`.

- [ ] **Step 5: Add responsive visual styles**

In `src/styles/global.css`, add:

- `.autonomous-film` spacing consistent with `.demo-shell`.
- A spectral 1 px frame and 18 px radius around the video.
- `video { display:block; width:100%; aspect-ratio:960/624; background:#07101c; }`.
- Six equal columns on desktop.
- Horizontally scrollable fixed-width chapter pills below 680 px.
- Active chapter uses blue/gold edge color, not color alone: include border and inset indicator.
- Focus-visible ring.
- No captions or chapter controls overlay the terminal.

- [ ] **Step 6: Verify the checker remains failing only for page integration**

Run:

```bash
npm run build
```

Expected: component compiles, but checker still fails because `start.astro` does not render it.

- [ ] **Step 7: Commit the reusable component**

```bash
git add src/components/AutonomousRunFilm.astro src/styles/global.css scripts/check-bilingual.mjs
git commit -m "feat: add seekable autonomous run film"
```

---

### Task 4: Get Started Integration

**Files:**
- Modify: `src/pages/start.astro`

**Interfaces:**
- Consumes: `AutonomousRunFilm` from Task 3.
- Produces: one instance on English and Chinese Get Started routes, no homepage instance.

- [ ] **Step 1: Import and render the component**

Add:

```astro
import AutonomousRunFilm from "../components/AutonomousRunFilm.astro";
```

After the closing WebUI demonstration section and before the final CTA section, render:

```astro
<section class="section autonomous-run-section">
  <div class="shell demo-shell">
    <AutonomousRunFilm locale={locale} showFullRun />
  </div>
</section>
```

- [ ] **Step 2: Run the bilingual build**

Run:

```bash
npm run build
```

Expected: Astro check, static build, and bilingual checker PASS for all 12 pages.

- [ ] **Step 3: Verify the homepage does not reference media**

Run:

```bash
! rg -n "argus-12h|AutonomousRunFilm" src/pages/index.astro dist/index.html dist/zh.html
```

Expected: exit 0 with no matches.

- [ ] **Step 4: Commit Get Started integration**

```bash
git add src/pages/start.astro
git commit -m "feat: add autonomous run proof to Get Started"
```

---

### Task 5: Browser, Delivery, and Deployment Verification

**Files:**
- Modify only files that fail a requirement in Tasks 1–4.

**Interfaces:**
- Consumes: final site and media assets.
- Produces: deployed bilingual Get Started film with verified range requests.

- [ ] **Step 1: Start production preview**

Run:

```bash
npm run preview -- --host 127.0.0.1 --port 4323
```

- [ ] **Step 2: Verify desktop, mobile, and reduced motion in Playwright**

At 390×844, 768×1024, and 1440×900:

- Open `/start.html` and `/zh/start.html`.
- Assert six chapter buttons.
- Click Rejection and assert `video.currentTime` is within one second of 43.
- Assert no horizontal overflow.
- Confirm active chapter changes at 78 seconds.
- Confirm standard video controls remain visible.
- Confirm reduced-motion pages do not autoplay.
- Open `/` and `/zh.html`; assert no request URL contains `argus-12h`.

- [ ] **Step 3: Verify full-source lazy loading**

Capture network requests on Get Started before selecting the full source link. Assert no request path contains `argus-12h-source-18m43s.mp4`. Confirm the short-film request uses WebM or MP4 and supports seeking.

- [ ] **Step 4: Verify origin byte ranges**

After deployment, run:

```bash
curl -fsSI -H 'Range: bytes=0-1023' https://argusbot.cn/assets/demos/argus-12h-in-105s.webm
curl -fsSI -H 'Range: bytes=0-1023' https://argusbot.cn/assets/demos/argus-12h-source-18m43s.mp4
```

Expected: `206 Partial Content` with `Accept-Ranges: bytes` or equivalent range behavior.

- [ ] **Step 5: Deploy atomically**

Build a versioned static release directory, copy `dist/`, update `argus-website-http.service` to that directory, reload systemd, and restart only the 8792 origin service. Do not restart the Cloudflare tunnel.

- [ ] **Step 6: Verify public hashes and behavior**

Compare SHA256 for local origin and `https://argusbot.cn` on:

- `/start.html`
- `/zh/start.html`
- `/assets/demos/argus-12h-in-105s.webm`
- `/assets/demos/argus-12h-source-18m43s.mp4`

Re-run the Playwright checks against the public hostname.

- [ ] **Step 7: Remove temporary tooling**

```bash
rm -rf /tmp/argus-video-tools /tmp/video-tools /tmp/argus12h-* /tmp/argus-12h-*
```

Do not delete the original source under `/home/argustest/argustest2/demo/`.
