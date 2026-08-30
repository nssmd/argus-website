from __future__ import annotations

import argparse
import hashlib
import io
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw


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


def _og_image(base: Image.Image, mark: Image.Image) -> Image.Image:
    canvas = base.convert("RGB").copy()
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((78, 62, 142, 126), fill="#ffffff")
    rounded_mark = _recolor(mark.resize((52, 52), Image.Resampling.LANCZOS), (0, 0, 0))
    canvas.paste(rounded_mark, (84, 68), rounded_mark)
    return canvas


def generate_assets(archive: Path, sidecar: Path, output_dir: Path) -> None:
    verify_archive(archive, sidecar)
    output_dir.mkdir(parents=True, exist_ok=True)
    extract_svg_sources(archive, output_dir)
    with zipfile.ZipFile(archive) as bundle:
        mark_256 = _read_png(bundle, "png/marks/argus-mark-256.png")
        monochrome = _recolor(mark_256, (0, 0, 0))
        monochrome.save(output_dir / "argus-mark-gold.png", optimize=True)

        favicon_layers = []
        for size in (16, 32, 48):
            layer = _read_png(bundle, f"png/marks/argus-mark-{size}.png")
            favicon_layers.append(_recolor(layer, (0, 0, 0)))
        favicon_path = output_dir / "argus-mark-rounded-favicon.ico"
        favicon_layers[-1].save(
            favicon_path,
            format="ICO",
            sizes=[(16, 16), (32, 32), (48, 48)],
            append_images=favicon_layers[:-1],
        )
        (output_dir.parent / "favicon.ico").write_bytes(favicon_path.read_bytes())

        mark_1024 = _read_png(bundle, "png/marks/argus-mark-1024.png")
        og_path = output_dir / "argus-og-blue-gold.png"
        _og_image(Image.open(og_path), mark_1024).save(og_path, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--sidecar", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    generate_assets(args.archive, args.sidecar, args.output_dir)


if __name__ == "__main__":
    main()
