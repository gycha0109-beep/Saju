#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path
from typing import Any

SCHEMA_VERSION = "fr306-adaptive-visible-skin-upper-boundary-v1"
CANDIDATE_ID = "candidate.hairline.adaptive_visible_skin_upper_boundary.fr306"
RUNTIME_ID = "myeongha/adaptive-visible-skin-upper-boundary"
RUNTIME_REVISION = "0.1.0-research"
RUNTIME_CONTRACT_VERSION = "FR306-ADAPTIVE-VISIBLE-SKIN-UPPER-BOUNDARY-RUNTIME-v1"
DEFAULT_OUTPUT = Path(".cache/face-reading/hairline-fr306-adaptive")
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def visibility_clearance_pass(
    *,
    eye_top_y: float,
    mean_eye_box_height: float,
    central_boundary_median_y: float,
) -> bool:
    if mean_eye_box_height <= 0:
        return False
    clearance = eye_top_y - central_boundary_median_y
    return clearance >= (mean_eye_box_height / 2.0)


def self_test() -> int:
    assert visibility_clearance_pass(
        eye_top_y=100.0,
        mean_eye_box_height=40.0,
        central_boundary_median_y=70.0,
    )
    assert not visibility_clearance_pass(
        eye_top_y=100.0,
        mean_eye_box_height=40.0,
        central_boundary_median_y=90.0,
    )
    assert not visibility_clearance_pass(
        eye_top_y=100.0,
        mean_eye_box_height=0.0,
        central_boundary_median_y=20.0,
    )
    print("adaptive visible-skin upper-boundary self-test: PASS")
    return 0


def load_cv_runtime():
    try:
        import cv2
        import numpy as np
        from PIL import Image, ImageDraw
    except ImportError as error:
        raise RuntimeError(
            "Adaptive hairline runtime dependencies are missing. "
            "Install opencv-python-headless, numpy, and Pillow locally."
        ) from error
    return cv2, np, Image, ImageDraw


def resolve_images(path: Path) -> list[Path]:
    if path.is_file():
        if path.suffix.lower() not in IMAGE_SUFFIXES:
            raise ValueError(f"unsupported image suffix: {path.suffix}")
        return [path]
    if path.is_dir():
        images = sorted(
            candidate
            for candidate in path.iterdir()
            if candidate.is_file()
            and candidate.suffix.lower() in IMAGE_SUFFIXES
        )
        if not images:
            raise ValueError(f"no supported image found: {path}")
        return images
    raise ValueError(f"input path does not exist: {path}")


def largest_face(cv2, gray, width: int, height: int):
    cascade_names = (
        "haarcascade_frontalface_default.xml",
        "haarcascade_frontalface_alt.xml",
        "haarcascade_frontalface_alt2.xml",
    )
    candidates: list[tuple[int, int, list[int]]] = []
    for ordinal, name in enumerate(cascade_names):
        cascade = cv2.CascadeClassifier(cv2.data.haarcascades + name)
        faces = cascade.detectMultiScale(
            gray,
            scaleFactor=1.05,
            minNeighbors=3,
            minSize=(max(20, width // 10), max(20, height // 10)),
        )
        for x, y, w, h in faces:
            candidates.append(
                (int(w * h), ordinal, [int(x), int(y), int(w), int(h)])
            )
    if not candidates:
        return None, "none"
    _, ordinal, face = max(candidates, key=lambda value: value[0])
    return face, ("haar_default", "haar_alt", "haar_alt2")[ordinal]


def select_eye_pair(cv2, gray, face):
    x, y, w, h = face
    roi = gray[y : y + int(0.72 * h), x : x + w]
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")
    eyes = cascade.detectMultiScale(
        roi,
        scaleFactor=1.08,
        minNeighbors=5,
        minSize=(max(10, w // 12), max(8, h // 16)),
    )
    candidates = []
    for ex, ey, ew, eh in eyes:
        cx = x + ex + (ew / 2.0)
        cy = y + ey + (eh / 2.0)
        if cy > y + (0.60 * h):
            continue
        candidates.append((float(cx), float(cy), int(ew), int(eh)))

    best = None
    for index, first in enumerate(candidates):
        for second in candidates[index + 1 :]:
            separation = abs(first[0] - second[0]) / w
            vertical_delta = abs(first[1] - second[1]) / h
            if separation < 0.20 or separation > 0.75 or vertical_delta > 0.16:
                continue
            score = (
                first[2] * first[3] + second[2] * second[3]
            ) * (1.0 - vertical_delta)
            if best is None or score > best[0]:
                best = (score, first, second)

    if best is None:
        return None, candidates
    first, second = best[1], best[2]
    return (
        (first, second) if first[0] < second[0] else (second, first),
        candidates,
    )


def clamp(value: int, low: int, high: int) -> int:
    return max(low, min(high, value))


def process_image(cv2, np, Image, ImageDraw, image_path: Path, capture_case: str, output: Path):
    bgr = cv2.imread(str(image_path))
    if bgr is None:
        raise ValueError(f"cannot decode image: {image_path}")
    height, width = bgr.shape[:2]
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

    face, face_source = largest_face(cv2, gray, width, height)
    if face is None:
        return {
            "schemaVersion": SCHEMA_VERSION,
            "candidateId": CANDIDATE_ID,
            "runtimeId": RUNTIME_ID,
            "runtimeRevision": RUNTIME_REVISION,
            "captureCase": capture_case,
            "status": "unavailable_face_roi",
            "hiddenCompletionApplied": False,
            "providerFaceGeometryUsedAsHairline": False,
        }

    x, y, w, h = face
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).astype(np.float32)

    sx1 = clamp(int(x + 0.25 * w), 0, width)
    sx2 = clamp(int(x + 0.75 * w), 0, width)
    sy1 = clamp(int(y + 0.38 * h), 0, height)
    sy2 = clamp(int(y + 0.68 * h), 0, height)
    sample = lab[sy1:sy2, sx1:sx2].reshape(-1, 3)
    median = np.median(sample, axis=0)
    mad = np.median(np.abs(sample - median), axis=0) * 1.4826
    scale = np.maximum(mad, np.array([14.0, 4.0, 4.0], np.float32))

    rx1 = clamp(int(x - 0.03 * w), 0, width)
    rx2 = clamp(int(x + 1.03 * w), 0, width)
    ry1 = clamp(int(y - 0.18 * h), 0, height)
    ry2 = clamp(int(y + 0.72 * h), 0, height)

    roi = lab[ry1:ry2, rx1:rx2]
    standardized = (roi - median) / scale
    score = np.sqrt((standardized * standardized).sum(2))
    skin = (score <= 3.0).astype(np.uint8) * 255
    skin = cv2.morphologyEx(
        skin, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)
    )
    skin = cv2.morphologyEx(
        skin, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8)
    )

    count, labels, stats, _ = cv2.connectedComponentsWithStats(skin, 8)
    seed_x1 = max(0, int(x + 0.30 * w) - rx1)
    seed_x2 = min(labels.shape[1], int(x + 0.70 * w) - rx1)
    seed_y1 = max(0, int(y + 0.40 * h) - ry1)
    seed_y2 = min(labels.shape[0], int(y + 0.68 * h) - ry1)

    component = None
    component_score = -1
    for label in range(1, count):
        overlap = int(
            (labels[seed_y1:seed_y2, seed_x1:seed_x2] == label).sum()
        )
        area = int(stats[label, cv2.CC_STAT_AREA])
        current = overlap * 20 + area
        if overlap > 0 and current > component_score:
            component = label
            component_score = current

    if component is None:
        status = "unavailable_skin_component"
        points = np.empty((0, 2), dtype=np.int32)
    else:
        mask = labels == component
        column_start = max(0, int(x + 0.08 * w) - rx1)
        column_end = min(mask.shape[1], int(x + 0.92 * w) - rx1)
        maximum_y = y + int(0.44 * h)
        raw_points = []
        for local_x in range(column_start, column_end):
            ys = np.flatnonzero(mask[:, local_x])
            if len(ys) == 0:
                continue
            global_y = ry1 + int(ys.min())
            global_x = rx1 + local_x
            if global_y <= maximum_y:
                raw_points.append([global_x, global_y])

        points = np.array(raw_points, dtype=np.int32)
        if len(points) == 0:
            status = "unavailable_upper_skin_boundary"
        else:
            raw_y = points[:, 1].copy()
            points[:, 1] = [
                int(
                    np.median(
                        raw_y[max(0, index - 4) : min(len(raw_y), index + 5)]
                    )
                )
                for index in range(len(raw_y))
            ]
            coverage = (
                points[-1, 0] - points[0, 0] + 1
            ) / (0.84 * w)
            top_fraction = float((points[:, 1] <= 2).mean())
            crop_touch = bool(
                y <= 0.03 * height and top_fraction > 0.15
            )
            pair, _ = select_eye_pair(cv2, gray, face)

            if crop_touch:
                status = "unavailable_crop_or_truncation"
            elif coverage < 0.28:
                status = "unavailable_insufficient_visible_boundary"
            elif pair is None:
                status = "unavailable_visibility_reference"
            else:
                eye_top = float(
                    np.mean(
                        [
                            eye[1] - (eye[3] / 2.0)
                            for eye in pair
                        ]
                    )
                )
                eye_height = float(
                    np.mean([eye[3] for eye in pair])
                )
                central = points[
                    (points[:, 0] >= x + 0.28 * w)
                    & (points[:, 0] <= x + 0.72 * w)
                ]
                if len(central) < 5:
                    status = "unavailable_visibility_reference"
                else:
                    central_y = float(np.median(central[:, 1]))
                    status = (
                        "candidate_visible_interface"
                        if visibility_clearance_pass(
                            eye_top_y=eye_top,
                            mean_eye_box_height=eye_height,
                            central_boundary_median_y=central_y,
                        )
                        else "unavailable_visibility_gate"
                    )

    digest = sha256_file(image_path)
    case_dir = output / digest[:16]
    case_dir.mkdir(parents=True, exist_ok=True)

    normalized_points = [
        {
            "x": float(px) / width,
            "y": float(py) / height,
        }
        for px, py in points.tolist()
    ] if status == "candidate_visible_interface" else []

    record: dict[str, Any] = {
        "schemaVersion": SCHEMA_VERSION,
        "candidateId": CANDIDATE_ID,
        "runtimeId": RUNTIME_ID,
        "runtimeRevision": RUNTIME_REVISION,
        "runtimeContractVersion": RUNTIME_CONTRACT_VERSION,
        "sourceImage": {
            "sha256": digest,
            "originalFileName": image_path.name,
            "width": width,
            "height": height,
            "repositoryCommitAuthorized": False,
        },
        "captureCase": capture_case,
        "status": status,
        "faceRoiDetector": face_source,
        "boundaryPolylineNormalized":
            normalized_points,
        "visibilitySemantics":
            "visible_segments_only_no_hidden_completion",
        "hiddenCompletionApplied": False,
        "providerFaceGeometryUsedAsHairline": False,
        "providerEyeGeometryUsedAsHairline": False,
        "fr305AdmissionReceiptAuthorized": False,
        "traditionalBindingAuthorized": False,
        "productionAuthorization": False,
    }
    (case_dir / "record.json").write_text(
        json.dumps(record, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    overlay = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(overlay)
    draw.rectangle([x, y, x + w, y + h], outline="green", width=2)
    if len(points) > 1:
        draw.line(
            [tuple(point) for point in points.tolist()],
            fill="red",
            width=3,
        )
    overlay.save(case_dir / "overlay.jpg", quality=92)

    return {
        "sourceImageSha256": digest,
        "sourceImageName": image_path.name,
        "captureCase": capture_case,
        "record": str(case_dir / "record.json"),
        "overlay": str(case_dir / "overlay.jpg"),
        "status": status,
    }


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input")
    parser.add_argument("--capture-case")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if not args.self_test:
        if not args.input:
            parser.error("--input is required")
        if not args.capture_case:
            parser.error("--capture-case is required")
    return args


def main() -> int:
    args = parse_args()
    if args.self_test:
        return self_test()

    cv2, np, Image, ImageDraw = load_cv_runtime()
    output = Path(args.output_dir)
    output.mkdir(parents=True, exist_ok=True)
    cases = [
        process_image(
            cv2,
            np,
            Image,
            ImageDraw,
            image,
            args.capture_case,
            output,
        )
        for image in resolve_images(Path(args.input))
    ]

    index = {
        "schemaVersion": SCHEMA_VERSION,
        "candidateId": CANDIDATE_ID,
        "runtimeId": RUNTIME_ID,
        "runtimeRevision": RUNTIME_REVISION,
        "runtimeContractVersion": RUNTIME_CONTRACT_VERSION,
        "cases": cases,
        "privacy": {
            "sourceImagesCommitted": False,
            "overlaysCommitted": False,
            "rawBoundaryCoordinatesCommitted": False,
            "githubActionsReceiveOperatorImages": False,
        },
        "authority": {
            "candidateEvidenceOnly": True,
            "fr305AdmissionReceiptAuthorized": False,
            "hiddenHairlineCompletionAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }
    index_path = output / "index.json"
    index_path.write_text(
        json.dumps(index, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(index_path)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"adaptive hairline runner failed: {error}", file=sys.stderr)
        raise
