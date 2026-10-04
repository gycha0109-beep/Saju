#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import math
import platform
import sys
from pathlib import Path
from typing import Any, Iterable

MODEL_ID = "microsoft/Florence-2-base"
MODEL_REVISION = "5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac"
TASK = "<REFERRING_EXPRESSION_SEGMENTATION>"
SCHEMA_VERSION = "fr307-visible-hairline-empirical-runner-v1"
DEFAULT_OUTPUT_DIR = Path(".cache/face-reading/hairline-fr307")
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}
PROMPTS = (
    ("visible_hair", "visible hair", False),
    ("forehead_skin", "forehead skin", False),
    ("visible_hairline_diagnostic", "visible hairline", True),
)
CAPTURE_CASES = {
    "clear_unobstructed_central_hairline",
    "m_shaped_or_widows_peak_visible_contour",
    "side_recession_or_asymmetric_visible_hairline",
    "partial_bangs_occlusion",
    "heavy_bangs_hairline_substantially_hidden",
    "cropped_upper_forehead",
    "headwear_occlusion_if_available",
    "dark_hair_dark_background",
    "light_hair_or_low_local_contrast",
    "ordinary_indoor_illumination_variation",
}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def json_safe(value: Any) -> Any:
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, dict):
        return {str(key): json_safe(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [json_safe(item) for item in value]
    if hasattr(value, "tolist"):
        return json_safe(value.tolist())
    return str(value)


def _is_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _polygon_candidates(value: Any) -> Iterable[list[list[float]]]:
    if not isinstance(value, (list, tuple)):
        return

    if len(value) >= 6 and len(value) % 2 == 0 and all(_is_number(item) for item in value):
        yield [
            [float(value[index]), float(value[index + 1])]
            for index in range(0, len(value), 2)
        ]
        return

    if (
        len(value) >= 3
        and all(
            isinstance(item, (list, tuple))
            and len(item) == 2
            and all(_is_number(coord) for coord in item)
            for item in value
        )
    ):
        yield [[float(item[0]), float(item[1])] for item in value]
        return

    for item in value:
        yield from _polygon_candidates(item)


def polygon_geometry(points: list[list[float]], width: int, height: int) -> dict[str, Any]:
    xs = [point[0] for point in points]
    ys = [point[1] for point in points]
    min_x = min(xs)
    max_x = max(xs)
    min_y = min(ys)
    max_y = max(ys)
    bbox_width = max_x - min_x
    bbox_height = max_y - min_y

    double_signed_area = 0.0
    for index, (x1, y1) in enumerate(points):
        x2, y2 = points[(index + 1) % len(points)]
        double_signed_area += (x1 * y2) - (x2 * y1)
    signed_area = double_signed_area / 2.0
    area = abs(signed_area)

    centroid_x = sum(xs) / len(xs)
    centroid_y = sum(ys) / len(ys)
    image_area = float(width * height)

    exact_degenerate_reasons: list[str] = []
    if bbox_width == 0.0:
        exact_degenerate_reasons.append("zero_bbox_width")
    if bbox_height == 0.0:
        exact_degenerate_reasons.append("zero_bbox_height")
    if area == 0.0:
        exact_degenerate_reasons.append("zero_polygon_area")

    return {
        "bbox": {
            "minX": min_x,
            "minY": min_y,
            "maxX": max_x,
            "maxY": max_y,
            "width": bbox_width,
            "height": bbox_height,
            "normalized": {
                "minX": min_x / width if width else 0.0,
                "minY": min_y / height if height else 0.0,
                "maxX": max_x / width if width else 0.0,
                "maxY": max_y / height if height else 0.0,
                "width": bbox_width / width if width else 0.0,
                "height": bbox_height / height if height else 0.0,
            },
        },
        "centroid": {
            "x": centroid_x,
            "y": centroid_y,
            "normalizedX": centroid_x / width if width else 0.0,
            "normalizedY": centroid_y / height if height else 0.0,
        },
        "signedArea": signed_area,
        "area": area,
        "areaRatio": area / image_area if image_area else 0.0,
        "exactDegenerate": bool(exact_degenerate_reasons),
        "exactDegenerateReasons": exact_degenerate_reasons,
    }


def normalize_polygons(parsed: Any, width: int, height: int) -> list[dict[str, Any]]:
    safe = json_safe(parsed)
    payload = safe.get(TASK, safe) if isinstance(safe, dict) else safe
    polygons_raw = payload.get("polygons", []) if isinstance(payload, dict) else []

    normalized: list[dict[str, Any]] = []
    for points in _polygon_candidates(polygons_raw):
        if len(points) < 3:
            continue
        inside = all(
            0.0 <= x <= float(width) and 0.0 <= y <= float(height)
            for x, y in points
        )
        geometry = polygon_geometry(points, width, height)
        normalized.append(
            {
                "points": points,
                "pointCount": len(points),
                "insideImageBounds": inside,
                "geometry": geometry,
            }
        )
    return normalized


def classify_polygons(
    polygons: list[dict[str, Any]],
) -> tuple[str, list[dict[str, Any]], list[dict[str, Any]], list[str]]:
    accepted = [
        polygon
        for polygon in polygons
        if polygon["insideImageBounds"]
        and not polygon["geometry"]["exactDegenerate"]
    ]
    rejected = [polygon for polygon in polygons if polygon not in accepted]

    rejection_reasons = sorted(
        {
            reason
            for polygon in rejected
            for reason in (
                polygon["geometry"]["exactDegenerateReasons"]
                + ([] if polygon["insideImageBounds"] else ["outside_image_bounds"])
            )
        }
    )

    if accepted:
        return "candidate_polygon", accepted, rejected, rejection_reasons
    return "unavailable", [], rejected, rejection_reasons


def bbox_distance(a: dict[str, Any], b: dict[str, Any]) -> dict[str, float]:
    a_bbox = a["geometry"]["bbox"]
    b_bbox = b["geometry"]["bbox"]

    horizontal_gap = max(
        0.0,
        max(a_bbox["minX"], b_bbox["minX"])
        - min(a_bbox["maxX"], b_bbox["maxX"]),
    )
    vertical_gap = max(
        0.0,
        max(a_bbox["minY"], b_bbox["minY"])
        - min(a_bbox["maxY"], b_bbox["maxY"]),
    )
    return {
        "horizontalGapPixels": horizontal_gap,
        "verticalGapPixels": vertical_gap,
        "euclideanGapPixels": math.hypot(horizontal_gap, vertical_gap),
    }


def best_pair_summary(
    hair_candidates: list[dict[str, Any]],
    forehead_candidates: list[dict[str, Any]],
    image_width: int,
    image_height: int,
) -> dict[str, Any] | None:
    if not hair_candidates or not forehead_candidates:
        return None

    best: tuple[float, dict[str, Any], dict[str, Any], dict[str, float]] | None = None
    for hair in hair_candidates:
        for forehead in forehead_candidates:
            metrics = bbox_distance(hair, forehead)
            gap = metrics["euclideanGapPixels"]
            if best is None or gap < best[0]:
                best = (gap, hair, forehead, metrics)

    assert best is not None
    _, hair, forehead, metrics = best
    diagonal = math.hypot(float(image_width), float(image_height))
    return {
        "selectionRule": "minimum_bbox_gap_for_descriptive_pairing_only",
        "hairPolygonAreaRatio": hair["geometry"]["areaRatio"],
        "foreheadPolygonAreaRatio": forehead["geometry"]["areaRatio"],
        "hairCentroidNormalized": {
            "x": hair["geometry"]["centroid"]["normalizedX"],
            "y": hair["geometry"]["centroid"]["normalizedY"],
        },
        "foreheadCentroidNormalized": {
            "x": forehead["geometry"]["centroid"]["normalizedX"],
            "y": forehead["geometry"]["centroid"]["normalizedY"],
        },
        **metrics,
        "euclideanGapNormalizedByImageDiagonal": (
            metrics["euclideanGapPixels"] / diagonal if diagonal > 0.0 else 0.0
        ),
        "automaticHairlineBoundaryAcceptanceAuthorized": False,
        "numericAcceptanceThresholdApplied": False,
    }


def build_prompt_record(
    *,
    image_path: Path,
    width: int,
    height: int,
    capture_case: str,
    mirrored: bool,
    record_name: str,
    prompt_text: str,
    diagnostic_only: bool,
    generated_text: str,
    parsed: Any,
    runtime: dict[str, Any],
) -> dict[str, Any]:
    polygons = normalize_polygons(parsed, width, height)
    status, accepted, rejected, reasons = classify_polygons(polygons)
    return {
        "schemaVersion": SCHEMA_VERSION,
        "authorityState": "candidate_evidence_only_manual_review_required",
        "model": {
            "id": MODEL_ID,
            "revision": MODEL_REVISION,
            "task": TASK,
        },
        "sourceImage": {
            "sha256": sha256_file(image_path),
            "width": width,
            "height": height,
            "originalFileName": image_path.name,
            "repositoryCommitAuthorized": False,
        },
        "capture": {
            "case": capture_case,
            "frontCameraMirrored": mirrored,
        },
        "request": {
            "recordName": record_name,
            "prompt": prompt_text,
            "diagnosticOnly": diagnostic_only,
            "semanticAuthorityIssued": False,
        },
        "result": {
            "status": status,
            "candidatePolygons": accepted,
            "rejectedPolygons": rejected,
            "rejectionReasons": reasons,
            "generatedText": generated_text,
            "rawParsedOutput": json_safe(parsed),
            "validatedVisibleHairlineObservation": False,
        },
        "runtime": runtime,
        "authority": {
            "hairPolygonMayBeCalledHairline": False,
            "foreheadPolygonMayBeCalledHairline": False,
            "directHairlinePromptMayBeCalledAuthoritativeBoundary": False,
            "hiddenHairlineCompletionAuthorized": False,
            "faceOvalSubstitutionAuthorized": False,
            "faceMeshTopVertexSubstitutionAuthorized": False,
            "fr305AdmissionReceiptAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }


def build_case_summary(
    *,
    image_path: Path,
    width: int,
    height: int,
    capture_case: str,
    mirrored: bool,
    records: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    hair = records["visible_hair"]["result"]["candidatePolygons"]
    forehead = records["forehead_skin"]["result"]["candidatePolygons"]
    diagnostic = records["visible_hairline_diagnostic"]["result"]["candidatePolygons"]

    if not hair and not forehead and not diagnostic:
        state = "unavailable"
    elif not hair or not forehead:
        state = "partial_candidate_evidence_manual_review_required"
    else:
        state = "paired_region_candidate_evidence_manual_review_required"

    return {
        "schemaVersion": SCHEMA_VERSION,
        "authorityState": "candidate_evidence_only_manual_review_required",
        "sourceImage": {
            "sha256": sha256_file(image_path),
            "width": width,
            "height": height,
            "originalFileName": image_path.name,
            "repositoryCommitAuthorized": False,
        },
        "capture": {
            "case": capture_case,
            "frontCameraMirrored": mirrored,
        },
        "result": {
            "state": state,
            "visibleHairCandidateCount": len(hair),
            "foreheadSkinCandidateCount": len(forehead),
            "diagnosticHairlineCandidateCount": len(diagnostic),
            "bestHairForeheadPair": best_pair_summary(
                hair,
                forehead,
                width,
                height,
            ),
            "validatedVisibleHairlineObservation": False,
            "automaticBoundaryAcceptanceAuthorized": False,
        },
        "authority": {
            "pairAgreementMayBeCalledHairlineValidity": False,
            "directPromptMayBeCalledHairlineValidity": False,
            "hiddenCompletionAuthorized": False,
            "fr305AdmissionReceiptAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }


def resolve_images(input_path: Path) -> list[Path]:
    if input_path.is_file():
        if input_path.suffix.lower() not in IMAGE_SUFFIXES:
            raise ValueError(f"Unsupported image suffix: {input_path.suffix}")
        return [input_path]
    if input_path.is_dir():
        images = sorted(
            path
            for path in input_path.iterdir()
            if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
        )
        if not images:
            raise ValueError(f"No supported images found in {input_path}")
        return images
    raise ValueError(f"Input path does not exist: {input_path}")


def load_runtime(device_arg: str):
    try:
        import torch
        from PIL import Image, ImageDraw
        from transformers import AutoModelForCausalLM, AutoProcessor
    except ImportError as error:
        raise RuntimeError(
            "FR307 runtime dependencies are missing. "
            "Install tools/face-reading/ear/requirements-fr102.txt first."
        ) from error

    if device_arg == "auto":
        if torch.cuda.is_available():
            device = "cuda:0"
        elif getattr(torch.backends, "mps", None) is not None and torch.backends.mps.is_available():
            device = "mps"
        else:
            device = "cpu"
    else:
        device = device_arg

    dtype = torch.float16 if device.startswith("cuda") else torch.float32
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        revision=MODEL_REVISION,
        torch_dtype=dtype,
        trust_remote_code=True,
    ).to(device)
    processor = AutoProcessor.from_pretrained(
        MODEL_ID,
        revision=MODEL_REVISION,
        trust_remote_code=True,
    )

    runtime = {
        "python": platform.python_version(),
        "torch": getattr(torch, "__version__", "unknown"),
        "transformers": __import__("transformers").__version__,
        "pillow": getattr(__import__("PIL"), "__version__", "unknown"),
        "device": device,
        "dtype": str(dtype),
    }
    return torch, Image, ImageDraw, processor, model, device, dtype, runtime


def run_prompt(*, image, prompt_text: str, torch, processor, model, device: str, dtype):
    prompt = TASK + prompt_text
    inputs = processor(text=prompt, images=image, return_tensors="pt").to(device, dtype)
    with torch.inference_mode():
        generated_ids = model.generate(
            input_ids=inputs["input_ids"],
            pixel_values=inputs["pixel_values"],
            max_new_tokens=512,
            do_sample=False,
            num_beams=3,
        )
    generated_text = processor.batch_decode(
        generated_ids,
        skip_special_tokens=False,
    )[0]
    parsed = processor.post_process_generation(
        generated_text,
        task=TASK,
        image_size=(image.width, image.height),
    )
    return generated_text, parsed


def write_overlay(image, image_draw, record: dict[str, Any], output_path: Path) -> None:
    overlay = image.copy()
    draw = image_draw.Draw(overlay)
    for polygon in record["result"]["candidatePolygons"]:
        points = [(point[0], point[1]) for point in polygon["points"]]
        if len(points) >= 3:
            draw.line(points + [points[0]], width=3)
    overlay.save(output_path)


def run(args: argparse.Namespace) -> int:
    if args.capture_case not in CAPTURE_CASES:
        raise ValueError(
            f"Unsupported capture case: {args.capture_case}. "
            f"Allowed={sorted(CAPTURE_CASES)}"
        )

    (
        torch,
        image_cls,
        image_draw,
        processor,
        model,
        device,
        dtype,
        runtime,
    ) = load_runtime(args.device)

    images = resolve_images(Path(args.input))
    output_root = Path(args.output_dir)
    output_root.mkdir(parents=True, exist_ok=True)

    cases: list[dict[str, Any]] = []
    for image_path in images:
        digest = sha256_file(image_path)
        case_dir = output_root / digest[:16]
        case_dir.mkdir(parents=True, exist_ok=True)
        image = image_cls.open(image_path).convert("RGB")

        records: dict[str, dict[str, Any]] = {}
        record_index: list[dict[str, Any]] = []
        for record_name, prompt_text, diagnostic_only in PROMPTS:
            generated_text, parsed = run_prompt(
                image=image,
                prompt_text=prompt_text,
                torch=torch,
                processor=processor,
                model=model,
                device=device,
                dtype=dtype,
            )
            record = build_prompt_record(
                image_path=image_path,
                width=image.width,
                height=image.height,
                capture_case=args.capture_case,
                mirrored=args.front_camera_mirrored,
                record_name=record_name,
                prompt_text=prompt_text,
                diagnostic_only=diagnostic_only,
                generated_text=generated_text,
                parsed=parsed,
                runtime=runtime,
            )
            records[record_name] = record
            record_path = case_dir / f"{record_name}.json"
            record_path.write_text(
                json.dumps(record, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            overlay_path = None
            if args.qa_overlay and record["result"]["candidatePolygons"]:
                overlay_path = case_dir / f"{record_name}-overlay.png"
                write_overlay(image, image_draw, record, overlay_path)

            record_index.append(
                {
                    "name": record_name,
                    "record": str(record_path),
                    "overlay": str(overlay_path) if overlay_path else None,
                    "status": record["result"]["status"],
                    "candidateCount": len(record["result"]["candidatePolygons"]),
                }
            )

        summary = build_case_summary(
            image_path=image_path,
            width=image.width,
            height=image.height,
            capture_case=args.capture_case,
            mirrored=args.front_camera_mirrored,
            records=records,
        )
        summary_path = case_dir / "case-summary.json"
        summary_path.write_text(
            json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        cases.append(
            {
                "sourceImageSha256": digest,
                "sourceImageName": image_path.name,
                "captureCase": args.capture_case,
                "records": record_index,
                "caseSummary": str(summary_path),
                "caseSummaryState": summary["result"]["state"],
            }
        )

    index = {
        "schemaVersion": SCHEMA_VERSION,
        "model": {"id": MODEL_ID, "revision": MODEL_REVISION},
        "cases": cases,
        "privacy": {
            "sourceImagesCommitted": False,
            "outputsDefaultToGitIgnoredCache": True,
            "githubActionsEmpiricalImageUploadAuthorized": False,
        },
        "authority": {
            "candidateEvidenceOnly": True,
            "runtimeHairlineObservationAuthorized": False,
            "fr305AdmissionReceiptAuthorized": False,
            "hiddenHairlineCompletionAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }
    index_path = output_root / "index.json"
    index_path.write_text(
        json.dumps(index, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(index_path)
    return 0


def self_test() -> int:
    fixture = {
        TASK: {
            "polygons": [
                [10, 10, 40, 10, 40, 30, 10, 30],
                [[50, 40], [90, 40], [90, 70], [50, 70]],
            ]
        }
    }
    polygons = normalize_polygons(fixture, 100, 100)
    assert len(polygons) == 2
    status, accepted, rejected, reasons = classify_polygons(polygons)
    assert status == "candidate_polygon"
    assert len(accepted) == 2
    assert rejected == []
    assert reasons == []

    outside = normalize_polygons(
        {TASK: {"polygons": [[-1, 0, 10, 0, 10, 10, 0, 10]]}},
        100,
        100,
    )
    status, accepted, rejected, reasons = classify_polygons(outside)
    assert status == "unavailable"
    assert accepted == []
    assert len(rejected) == 1
    assert "outside_image_bounds" in reasons

    degenerate = normalize_polygons(
        {TASK: {"polygons": [[10, 20, 20, 20, 30, 20, 40, 20]]}},
        100,
        100,
    )
    status, accepted, rejected, reasons = classify_polygons(degenerate)
    assert status == "unavailable"
    assert accepted == []
    assert "zero_bbox_height" in reasons
    assert "zero_polygon_area" in reasons

    hair = normalize_polygons(
        {TASK: {"polygons": [[10, 10, 50, 10, 50, 30, 10, 30]]}},
        100,
        100,
    )
    forehead = normalize_polygons(
        {TASK: {"polygons": [[15, 31, 55, 31, 55, 60, 15, 60]]}},
        100,
        100,
    )
    pair = best_pair_summary(hair, forehead, 100, 100)
    assert pair is not None
    assert pair["euclideanGapPixels"] == 1.0
    assert pair["automaticHairlineBoundaryAcceptanceAuthorized"] is False
    assert pair["numericAcceptanceThresholdApplied"] is False

    assert len(CAPTURE_CASES) == 10
    assert MODEL_REVISION == "5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac"
    print("FR307 Florence-2 visible-hairline runner self-test: PASS")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Local/offline FR307 Florence-2 visible-hairline empirical runner."
    )
    parser.add_argument("--input", help="Image file or directory.")
    parser.add_argument("--capture-case", choices=sorted(CAPTURE_CASES))
    parser.add_argument("--front-camera-mirrored", action="store_true")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    parser.add_argument("--qa-overlay", action="store_true")
    parser.add_argument("--device", default="auto")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if not args.self_test:
        if not args.input:
            parser.error("--input is required unless --self-test is used")
        if not args.capture_case:
            parser.error("--capture-case is required unless --self-test is used")
    return args


if __name__ == "__main__":
    cli_args = parse_args()
    try:
        raise SystemExit(self_test() if cli_args.self_test else run(cli_args))
    except Exception as error:
        print(f"FR307 runner failed: {error}", file=sys.stderr)
        raise
