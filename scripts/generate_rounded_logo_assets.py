from __future__ import annotations

import argparse
import hashlib
import io
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ARCHIVE_ROOT = "argus-logo-final-02-rounded"


def verify_archive(archive: Path, sidecar: Path) -> None:
    expected = sidecar.read_text(encoding="utf-8").split()[0]
    actual = hashlib.sha256(archive.read_bytes()).hexdigest()
    if actual != expected:
        raise ValueError(f"logo archive checksum mismatch: {actual} != {expected}")


def recolor_svg(source: str, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(source.replace("#000000", "currentColor"), encoding="utf-8")


def extract_svg_sources(archive: Path, output_dir: Path) -> dict[str, Path]:
    mapping = {
        "logo-rounded-horizontal": "svg/argus-logo-horizontal.svg",
        "mark-rounded": "svg/argus-mark.svg",
        "mark-rounded-small": "svg/argus-mark-small.svg",
    }
    result = {}
    with zipfile.ZipFile(archive) as bundle:
        for key, relative in mapping.items():
            source = bundle.read(f"{ARCHIVE_ROOT}/{relative}").decode("utf-8")
            target = output_dir / f"argus-{key}.svg"
            recolor_svg(source, target)
            result[key] = target
    return result


def _read_png(bundle: zipfile.ZipFile, relative: str) -> Image.Image:
    return Image.open(io.BytesIO(bundle.read(f"{ARCHIVE_ROOT}/{relative}"))).convert("RGBA")


def _recolor(image: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    alpha = image.getchannel("A")
    result = Image.new("RGBA", image.size, (*color, 0))
    result.putalpha(alpha)
    return result


def _gradient_mark(image: Image.Image) -> Image.Image:
    width, height = image.size
    alpha = image.getchannel("A")
    start = (7, 95, 228)
    end = (217, 154, 22)
    gradient = Image.new("RGBA", image.size)
    pixels = gradient.load()
    for y in range(height):
        for x in range(width):
            amount = (x + y) / max(1, width + height - 2)
            color = tuple(round(a + (b - a) * amount) for a, b in zip(start, end))
            pixels[x, y] = (*color, alpha.getpixel((x, y)))
    return gradient


def _og_image(mark: Image.Image) -> Image.Image:
    canvas = Image.new("RGB", (1200, 630), "#071d3f")
    draw = ImageDraw.Draw(canvas)
    for radius, color in (
        (520, (7, 95, 228, 100)),
        (360, (92, 63, 192, 78)),
        (220, (217, 154, 22, 68)),
    ):
        glow = Image.new("RGBA", canvas.size)
        glow_draw = ImageDraw.Draw(glow)
        cx, cy = 600, 286
        glow_draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color)
        glow = glow.filter(ImageFilter.GaussianBlur(radius / 2.8))
        canvas.paste(glow, mask=glow)
    large_mark = _gradient_mark(mark.resize((300, 300), Image.Resampling.LANCZOS))
    canvas.paste(large_mark, (450, 100), large_mark)
    draw.text((600, 460), "ARGUS", anchor="mm", fill="#f6f9ff", font_size=72)
    draw.text(
        (600, 530),
        "SELF-EVOLVING RESEARCH RUNTIME",
        anchor="mm",
        fill="#d9b65f",
        font_size=24,
    )
    return canvas


def generate_assets(archive: Path, sidecar: Path, output_dir: Path) -> None:
    verify_archive(archive, sidecar)
    output_dir.mkdir(parents=True, exist_ok=True)
    extract_svg_sources(archive, output_dir)
    with zipfile.ZipFile(archive) as bundle:
        mark_256 = _read_png(bundle, "png/marks/argus-mark-256.png")
        gradient = _gradient_mark(mark_256)
        gradient.save(output_dir / "argus-mark-gold.png", optimize=True)

        favicon_layers = []
        for size in (16, 32, 48):
            layer = _read_png(bundle, f"png/marks/argus-mark-{size}.png")
            favicon_layers.append(_recolor(layer, (7, 62, 140)))
        favicon_layers[-1].save(
            output_dir / "argus-mark-rounded-favicon.ico",
            format="ICO",
            sizes=[(16, 16), (32, 32), (48, 48)],
            append_images=favicon_layers[:-1],
        )

        mark_1024 = _read_png(bundle, "png/marks/argus-mark-1024.png")
        _og_image(mark_1024).save(
            output_dir / "argus-og-blue-gold.png",
            optimize=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--sidecar", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    generate_assets(args.archive, args.sidecar, args.output_dir)


if __name__ == "__main__":
    main()
