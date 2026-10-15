"""Isolated stdlib unit tests; run with python -m unittest this_file.py."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("nlc_verify", Path(__file__).with_name("verify_nlc1600_book1_pdf.py"))
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class TestVerifiedSource(unittest.TestCase):
    def test_match_with_synthetic_source_fingerprint(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td) / "fixture.pdf"
            p.write_bytes(b"synthetic file, not a historic scan")
            f = mod.fingerprint(p)
            source = {"id": "synthetic", "expected_bytes": f["bytes"],
                      "expected_sha1": f["sha1"], "published_checksum_tier": "test_only"}
            result = mod.verify(p, source)
            self.assertTrue(result["identity_verified"])
            self.assertEqual(result["status"], "identity_verified_only")
            self.assertFalse(result["original_printed_li_qin_zengbu_glyph_verified"])
            self.assertFalse(result["material_evidence_grade_promoted"])

    def test_wrong_size_or_hash_fails_and_no_manifest_written(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td) / "wrong.pdf"
            output = Path(td) / "evidence.json"
            p.write_bytes(b"bad source")
            self.assertFalse(mod.verify(p)["identity_verified"])
            self.assertEqual(mod.main(["--input", str(p), "--output", str(output)]), 2)
            self.assertFalse(output.exists())

    def test_page_input_never_guesses_a_target_leaf(self):
        self.assertEqual(mod.parse_pages(""), [])
        self.assertEqual(mod.parse_pages("1,2,48"), [1, 2, 48])
        for bad in ("0", "1,1", "1-48", "1,,2", "1,2,3,4,5,6,7,8,9"):
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                mod.parse_pages(bad)


if __name__ == "__main__":
    unittest.main()
