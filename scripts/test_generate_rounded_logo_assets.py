import tempfile
import unittest
from pathlib import Path

from generate_rounded_logo_assets import recolor_svg, verify_archive


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


if __name__ == "__main__":
    unittest.main()
