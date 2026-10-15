#!/usr/bin/env python3
"""Reproduce bounded Ming 三命通會 卷八 scan alignment, not historical block identity.

Requirements: pip install pymupdf opencv-python-headless numpy
Usage: python compare_ming_sanming_juan8.py --nlc NLC.pdf --ncl NCL.pdf --output metrics.json\nThe script refuses inputs whose PDF SHA-256 differs from the recorded source bytes.
"""
import argparse
import hashlib
import json
from pathlib import Path

import cv2
import fitz
import numpy as np

EXPECTED_SHA256 = {
    "nlc": "009396f2dfd848194d7fa73c6e02ea51c010d3a9f0d5f3eb83be35d6b6a2e777",
    "ncl": "3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd",
}

def file_sha256(path):
    sha = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            sha.update(chunk)
    return sha.hexdigest()

CROPS = {
    "NLC": ((.031, .20, .427, .865), (.445, .195, .863, .865)),
    "NCL": ((.043, .157, .402, .918), (.428, .157, .805, .918)),
}

def render(doc, page):
    p = doc[page - 1].get_pixmap(matrix=fitz.Matrix(1.75, 1.75), alpha=False)
    return np.frombuffer(p.samples, np.uint8).reshape(p.height, p.width, 3)

def features(sift, im, rect):
    h, w = im.shape[:2]
    x0, y0, x1, y1 = rect
    sub = im[int(y0 * h):int(y1 * h), int(x0 * w):int(x1 * w)]
    gray = cv2.cvtColor(sub, cv2.COLOR_RGB2GRAY)
    gray = cv2.createCLAHE(clipLimit=2., tileGridSize=(10, 10)).apply(gray)
    return sift.detectAndCompute(gray, None)

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--nlc", type=Path, required=True)
    p.add_argument("--ncl", type=Path, required=True)
    p.add_argument("--output", type=Path, required=True)
    args = p.parse_args()
    # Reject unrelated derivative PDFs before any costly image rendering.
    verified = {"nlc": file_sha256(args.nlc), "ncl": file_sha256(args.ncl)}
    for source in ("nlc", "ncl"):
        if verified[source] != EXPECTED_SHA256[source]:
            p.error(
                f"{source.upper()} PDF SHA-256 mismatch: expected "
                f"{EXPECTED_SHA256[source]}, observed {verified[source]}"
            )
    cv2.setNumThreads(1)
    cv2.setRNGSeed(20261014)
    detector = cv2.SIFT_create(nfeatures=1200, contrastThreshold=.018, edgeThreshold=15)
    bf = cv2.BFMatcher(cv2.NORM_L2)
    cache = {}
    with fitz.open(args.nlc) as nlc, fitz.open(args.ncl) as ncl:
        if len(nlc) != 57 or len(ncl) != 1000:
            raise ValueError("Insufficient PDF pages")
        for name, book, pages in (("NLC", nlc, range(13, 17)), ("NCL", ncl, range(652, 658))):
            for page in pages:
                im = render(book, page)
                for side, bounds in enumerate(CROPS[name]):
                    cache[name, page, side] = features(detector, im, bounds)
        observations = []
        for x in range(13, 17):
            for y in (x + 639, x + 640, x + 641):
                for side in (0, 1):
                    k1, d1 = cache["NLC", x, side]
                    k2, d2 = cache["NCL", y, side]
                    good = [a for a, b in bf.knnMatch(d1, d2, k=2) if a.distance < .70 * b.distance]
                    inliers = 0
                    if len(good) >= 8:
                        src = np.float32([k1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
                        dst = np.float32([k2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
                        H, mask = cv2.findHomography(src, dst, cv2.RANSAC, 3.0, maxIters=10000, confidence=.995)
                        if H is not None:
                            inliers = int(mask.sum())
                    observations.append({
                        "nlc_pdf_page": x, "ncl_pdf_page": y,
                        "half": "left" if side == 0 else "right",
                        "candidate_matches": len(good), "homography_inliers": inliers,
                        "correct_pair": y == x + 640,
                    })
    matching = [r for r in observations if r["correct_pair"]]
    controls = [r for r in observations if not r["correct_pair"]]
    result = {
        "nlc_sha256": verified["nlc"],
        "ncl_sha256": verified["ncl"],
        "method": "PyMuPDF1.75x/CLAHE2.0/SIFT1200/BF-L2-Lowe0.70/RANSAC3px",
        "positive_half_pages": len(matching),
        "positive_candidates": sum(r["candidate_matches"] for r in matching),
        "positive_inliers": sum(r["homography_inliers"] for r in matching),
        "negative_half_pages": len(controls),
        "negative_max_inliers": max(r["homography_inliers"] for r in controls),
        "observations": observations,
        "same_historical_woodblocks_proven": False,
        "independent_historical_woodblocks_proven": False,
    }
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k:v for k,v in result.items() if k!="observations"}, indent=2))

if __name__ == "__main__":
    main()
