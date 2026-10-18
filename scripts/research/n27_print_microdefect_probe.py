#!/usr/bin/env python3
"""N27 public-print SIFT spatial holdout and visual inspection aid.

Research only. Nothing in this script certifies a shared carved woodblock,
independent textual descent, glyph-chip identity, or historical rule counting.
Usage:
  python scripts/research/n27_print_microdefect_probe.py \\
    --nlc n27_nlc_p43_full.png --taiwan page376-high.png --output-dir out/
Requires: numpy, opencv-python. No network access and no institutional contact.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import cv2
import numpy as np

NLC_SHA = "7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005"
TW_SHA = "163ea1e3eebcd719b397672e99ff2112f3c47927f2452d2f1e87d63f06abe7cf"
NLC_RECT = (426, 155, 806, 689)
TW_RECT = (1083, 356, 2015, 1665)


def sha256_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def clipped_gray(path: Path, rectangle: tuple[int, ...]) -> np.ndarray:
    im = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)
    if im is None:
        raise ValueError(f"Cannot read input raster: {path}")
    x0, y0, x1, y1 = rectangle
    if not (0 <= x0 < x1 <= im.shape[1] and 0 <= y0 < y1 <= im.shape[0]):
        raise ValueError(f"Print ROI outside input raster: {path}")
    return im[y0:y1, x0:x1]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--nlc", type=Path, required=True)
    parser.add_argument("--taiwan", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    observed = {"nlc": sha256_file(args.nlc), "taiwan": sha256_file(args.taiwan)}
    if observed != {"nlc": NLC_SHA, "taiwan": TW_SHA}:
        raise ValueError("Original rendered raster hashes differ; do not reuse v10 audit numbers")
    a = clipped_gray(args.nlc, NLC_RECT)
    b = clipped_gray(args.taiwan, TW_RECT)
    detector = cv2.SIFT_create(nfeatures=8500, contrastThreshold=0.012, edgeThreshold=15)
    ka, da = detector.detectAndCompute(a, None)
    kb, db = detector.detectAndCompute(b, None)
    if da is None or db is None:
        raise ValueError("Not enough features to compare")
    matches = cv2.BFMatcher(cv2.NORM_L2).knnMatch(da, db, k=2)
    good = [pair[0] for pair in matches if len(pair) == 2 and pair[0].distance < 0.74 * pair[1].distance]
    if len(good) < 4:
        raise ValueError("Insufficient matched features")
    s = np.float32([ka[m.queryIdx].pt for m in good])
    t = np.float32([kb[m.trainIdx].pt for m in good])
    cv2.setRNGSeed(4242)
    H, m = cv2.findHomography(s.reshape(-1, 1, 2), t.reshape(-1, 1, 2), cv2.RANSAC, 3.5)
    if H is None or m is None:
        raise ValueError("Homography unfit")
    valid = m.ravel().astype(bool)
    ycounts = [int((valid & (s[:, 1] >= a.shape[0] * q / 4) &
                     (s[:, 1] < a.shape[0] * (q + 1) / 4)).sum()) for q in range(4)]
    xcounts = [int((valid & (s[:, 0] >= a.shape[1] * q / 4) &
                     (s[:, 0] < a.shape[1] * (q + 1) / 4)).sum()) for q in range(4)]
    holds = []
    for label, training in (
        ("UPPER_TO_LOWER", s[:, 1] < a.shape[0] / 2),
        ("LOWER_TO_UPPER", s[:, 1] >= a.shape[0] / 2),
        ("LEFT_TO_RIGHT", s[:, 0] < a.shape[1] / 2),
        ("RIGHT_TO_LEFT", s[:, 0] >= a.shape[1] / 2),
    ):
        cv2.setRNGSeed(4242)
        local_h, mask = cv2.findHomography(
            s[training].reshape(-1, 1, 2), t[training].reshape(-1, 1, 2),
            cv2.RANSAC, 3.5
        )
        if local_h is None or mask is None:
            raise ValueError(f"Split could not fit: {label}")
        heldout = ~training
        predicted = cv2.perspectiveTransform(
            s[heldout].reshape(-1, 1, 2), local_h
        ).reshape(-1, 2)
        error = np.linalg.norm(predicted - t[heldout], axis=1)
        holds.append({
            "split": label,
            "trainMatches": int(training.sum()),
            "trainInliers": int(mask.sum()),
            "heldoutMatches": int(heldout.sum()),
            "heldoutWithin3Point5Pixels": int((error < 3.5).sum()),
        })
    nlcaligned = cv2.warpPerspective(a, H, (b.shape[1], b.shape[0]),
                                     flags=cv2.INTER_LINEAR, borderValue=255)
    for row in range(3):
        for col in range(3):
            x0, x1 = b.shape[1] * col // 3, b.shape[1] * (col + 1) // 3
            y0, y1 = b.shape[0] * row // 3, b.shape[0] * (row + 1) // 3
            left = nlcaligned[y0:y1, x0:x1]
            right = b[y0:y1, x0:x1]
            diff = cv2.absdiff(cv2.GaussianBlur(left, (3, 3), 0),
                               cv2.GaussianBlur(right, (3, 3), 0))
            cv2.imwrite(str(args.output_dir / f"inspection_r{row+1}c{col+1}.png"),
                        np.hstack((left, right, diff)))
    audit = {
        "inputsSha256": observed,
        "globalSiftRatioAccepted": len(good),
        "globalInliers": int(valid.sum()),
        "yInliersQuartiles": ycounts,
        "xInliersQuartiles": xcounts,
        "heldoutSplitResults": holds,
        "certifiedSharedUniqueCarvedGlyphChip": False,
        "samePhysicalWoodblock": "UNADJUDICATED",
        "noNewTextualWitnesses": True,
        "researchOnlyNoHistoricalCountingRule": True,
    }
    (args.output_dir / "n27_v10_microdefect_probe.json").write_text(
        json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(audit, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
