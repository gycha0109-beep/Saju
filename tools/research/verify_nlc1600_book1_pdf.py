#!/usr/bin/env python3
"""Verify NLC Wanli 1600 book-one PDF bytes before optional folio preview.

This checks a Commons-published file fingerprint, not printed glyphs, dates,
woodblocks, or historical claims. Requires Python stdlib, and optionally
PyMuPDF for page-image extraction after identity verification.

Usage:
  python tools/research/verify_nlc1600_book1_pdf.py --input original.pdf --output evidence.json
  python tools/research/verify_nlc1600_book1_pdf.py --input original.pdf --output evidence.json \
    --preview-pages 1,2,3 --preview-dir previews
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

SOURCE = {
    "id": "NLC892-2642-210287",
    "expected_bytes": 14_387_365,
    "expected_sha1": "4092ec5b420ebd84eee3959d2ac00a73580e6b4e",
    "catalog_page_count": 48,
    "published_checksum_tier": "C_platform_metadata",
}


def fingerprint(path: Path) -> dict:
    sha1, sha256, length = hashlib.sha1(), hashlib.sha256(), 0
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            sha1.update(chunk)
            sha256.update(chunk)
            length += len(chunk)
    return {"bytes": length, "sha1": sha1.hexdigest(), "sha256": sha256.hexdigest()}


def verify(path: Path, expected: dict = SOURCE) -> dict:
    observed = fingerprint(path)
    accepted = (observed["bytes"] == expected["expected_bytes"]
                and observed["sha1"] == expected["expected_sha1"])
    return {
        "source_id": expected["id"],
        "platform_checksum_tier": expected["published_checksum_tier"],
        "expected_bytes": expected["expected_bytes"],
        "expected_sha1": expected["expected_sha1"],
        "observed": observed,
        "identity_verified": accepted,
        "status": "identity_verified_only" if accepted else "rejected_source_mismatch",
        "original_printed_li_qin_zengbu_glyph_verified": False,
        "verified_original_wei_mu_variant": None,
        "material_evidence_grade_promoted": False,
    }


def parse_pages(spec: str) -> list[int]:
    if not spec:
        return []
    parts = spec.split(",")
    if len(parts) > 8 or any(not p.isascii() or not p.isdecimal() for p in parts):
        raise ValueError("--preview-pages must contain 1 to 8 comma-separated 1-based page numbers")
    pages = [int(p) for p in parts]
    if any(p < 1 for p in pages) or len(set(pages)) != len(pages):
        raise ValueError("Page numbers must be positive and unique")
    return pages


def render_verified_pages(path: Path, pages: list[int], destination: Path) -> list[dict]:
    if not pages:
        return []
    try:
        import fitz  # optional PyMuPDF; never imported before checksum validation
    except ImportError as exc:
        raise RuntimeError("PyMuPDF is required only for optional page previews") from exc
    output = []
    with fitz.open(path) as pdf:
        if len(pdf) != SOURCE["catalog_page_count"]:
            raise ValueError("PDF page count differs from source catalog: refusing previews")
        if any(page > len(pdf) for page in pages):
            raise ValueError("Requested page exceeds PDF page count")
        destination.mkdir(parents=True, exist_ok=True)
        for number in pages:
            filename = f"{SOURCE['id']}_pdf-page-{number:03d}.png"
            pdf[number - 1].get_pixmap(matrix=fitz.Matrix(1.75, 1.75), alpha=False).save(destination / filename)
            output.append({"pdf_page_one_based": number, "preview_file": str(destination / filename)})
    return output


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--preview-pages", default="")
    parser.add_argument("--preview-dir", type=Path)
    args = parser.parse_args(argv)
    try:
        if not args.input.is_file():
            raise FileNotFoundError(args.input)
        if args.input.resolve() == args.output.resolve():
            raise ValueError("Output may not overwrite the source PDF")
        pages = parse_pages(args.preview_pages)
        if pages and args.preview_dir is None:
            raise ValueError("--preview-dir is required with --preview-pages")
        result = verify(args.input)
        if not result["identity_verified"]:
            print(json.dumps(result, ensure_ascii=False, sort_keys=True), file=sys.stderr)
            return 2  # no output artifact or previews on source mismatch
        result["page_previews"] = render_verified_pages(args.input, pages, args.preview_dir) if pages else []
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        print(f"Identity verified only (not glyph evidence): {args.output}")
        return 0
    except (OSError, RuntimeError, ValueError) as exc:
        print(f"verification refused: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
