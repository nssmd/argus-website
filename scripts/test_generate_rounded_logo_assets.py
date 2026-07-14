import tempfile
import unittest
from pathlib import Path

from PIL import Image

from generate_rounded_logo_assets import _og_image, recolor_svg, verify_archive


class RoundedLogoGeneratorTest(unittest.TestCase):
    def test_verified_archive_and_current_color_svg(self):
        archive = Path("/home/argustest/argustest2/argus-logo-final-02-rounded.zip")
        sidecar = Path(f"{archive}.sha256")
        verify_archive(archive, sidecar)
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp) / "mark.svg"
            recolor_svg(
                '<svg><path fill="#000000" d="M0 0h1v1z"/></svg>',
                output,
            )
            text = output.read_text()
            self.assertIn('fill="currentColor"', text)
            self.assertNotIn("#000000", text)

    def test_og_generation_changes_only_the_logo_tile(self):
        base = Image.new("RGB", (1200, 630), (237, 244, 255))
        mark = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
        mark.paste((0, 0, 0, 255), (128, 128, 896, 896))
        output = _og_image(base, mark)
        self.assertEqual(output.getpixel((0, 0)), base.getpixel((0, 0)))
        self.assertEqual(output.getpixel((600, 315)), base.getpixel((600, 315)))
        self.assertNotEqual(output.getpixel((100, 90)), base.getpixel((100, 90)))


if __name__ == "__main__":
    unittest.main()
