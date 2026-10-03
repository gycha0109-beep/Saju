#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import math
import platform
import re
import sys
from pathlib import Path
from typing import Any, Iterable

MODEL_ID = "microsoft/Florence-2-base"
MODEL_REVISION = "5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac"
TASK = "<REFERRING_EXPRESSION_SEGMENTATION>"
SCHEMA_VERSION = "fr103-neutral-ear-dual-prompt-consensus-v2"
DEFAULT_OUTPUT_DIR = Path(".cache/face-reading/ear-fr103")
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}
GENERIC_PROMPT_TARGET = "external ear"


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
    area_ratio = area / image_area if image_area else 0.0

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
        "areaRatio": area_ratio,
        "uniqueXCount": len(set(xs)),
        "uniqueYCount": len(set(ys)),
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
        normalized.append(
            {
                "points": points,
                "pointCount": len(points),
                "insideImageBounds": inside,
                "geometry": polygon_geometry(points, width, height),
            }
        )
    return normalized


def classify_polygons(
    polygons: list[dict[str, Any]],
) -> tuple[str, list[dict[str, Any]], list[dict[str, Any]], list[str]]:
    accepted = [
        polygon
        for polygon in polygons
        if not polygon["geometry"]["exactDegenerate"]
    ]
    rejected = [
        polygon
        for polygon in polygons
        if polygon["geometry"]["exactDegenerate"]
    ]

    rejection_reasons = sorted(
        {
            reason
            for polygon in rejected
            for reason in polygon["geometry"]["exactDegenerateReasons"]
        }
    )

    if accepted:
        return "candidate_polygon", accepted, rejected, rejection_reasons
    return "unavailable", [], rejected, rejection_reasons


def bbox_pair_metrics(
    left_polygon: dict[str, Any],
    right_polygon: dict[str, Any],
    image_width: int,
    image_height: int,
) -> dict[str, Any]:
    left_bbox = left_polygon["geometry"]["bbox"]
    right_bbox = right_polygon["geometry"]["bbox"]

    intersection_width = max(
        0.0,
        min(left_bbox["maxX"], right_bbox["maxX"])
        - max(left_bbox["minX"], right_bbox["minX"]),
    )
    intersection_height = max(
        0.0,
        min(left_bbox["maxY"], right_bbox["maxY"])
        - max(left_bbox["minY"], right_bbox["minY"]),
    )
    intersection_area = intersection_width * intersection_height
    left_bbox_area = left_bbox["width"] * left_bbox["height"]
    right_bbox_area = right_bbox["width"] * right_bbox["height"]
    union_area = left_bbox_area + right_bbox_area - intersection_area
    bbox_iou = intersection_area / union_area if union_area > 0.0 else 0.0

    left_centroid = left_polygon["geometry"]["centroid"]
    right_centroid = right_polygon["geometry"]["centroid"]
    centroid_distance_pixels = math.hypot(
        left_centroid["x"] - right_centroid["x"],
        left_centroid["y"] - right_centroid["y"],
    )
    image_diagonal = math.hypot(float(image_width), float(image_height))
    normalized_centroid_distance = (
        centroid_distance_pixels / image_diagonal if image_diagonal > 0.0 else 0.0
    )

    return {
        "bboxIntersectionArea": intersection_area,
        "bboxUnionArea": union_area,
        "bboxIoU": bbox_iou,
        "centroidDistancePixels": centroid_distance_pixels,
        "centroidDistanceNormalizedByImageDiagonal": normalized_centroid_distance,
        "leftPolygonAreaRatio": left_polygon["geometry"]["areaRatio"],
        "rightPolygonAreaRatio": right_polygon["geometry"]["areaRatio"],
        "automaticAcceptanceThresholdApplied": False,
    }


def build_record(
    *,
    image_path: Path,
    image_width: int,
    image_height: int,
    capture_case: str,
    mirrored: bool,
    prompt_mode: str,
    requested_side: str | None,
    prompt: str,
    generated_text: str,
    parsed: Any,
    runtime: dict[str, Any],
) -> dict[str, Any]:
    polygons = normalize_polygons(parsed, image_width, image_height)
    status, accepted, rejected, rejection_reasons = classify_polygons(polygons)
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
            "width": image_width,
            "height": image_height,
            "originalFileName": image_path.name,
            "repositoryCommitAuthorized": False,
        },
        "capture": {
            "case": capture_case,
            "frontCameraMirrored": mirrored,
        },
        "request": {
            "promptMode": prompt_mode,
            "requestedSide": requested_side,
            "prompt": prompt,
            "sideLabelAuthoritative": False,
        },
        "result": {
            "status": status,
            "candidatePolygons": accepted,
            "rejectedPolygons": rejected,
            "candidateValidation": {
                "exactDegeneracyGateApplied": True,
                "rejectedDegenerateCount": len(rejected),
                "rejectionReasons": rejection_reasons,
                "plausibilityMetricsRecorded": True,
                "plausibilityThresholdApplied": False,
                "sideSemanticsAuthoritative": False,
            },
            "generatedText": generated_text,
            "rawParsedOutput": json_safe(parsed),
            "validatedExternalEarObservation": False,
        },
        "runtime": runtime,
        "authority": {
            "neutralRuntimeEarObservationAuthorized": False,
            "traditionalBindingAuthorized": False,
            "appearanceInferenceAuthorized": False,
            "depthOrFullnessInferenceAuthorized": False,
            "numericAcceptanceThresholdAuthorized": False,
            "productionAuthorization": False,
        },
    }


def build_dual_prompt_summary(
    *,
    image_path: Path,
    image_width: int,
    image_height: int,
    capture_case: str,
    mirrored: bool,
    left_record: dict[str, Any],
    right_record: dict[str, Any],
) -> dict[str, Any]:
    left_candidates = left_record["result"]["candidatePolygons"]
    right_candidates = right_record["result"]["candidatePolygons"]

    if not left_candidates and not right_candidates:
        state = "unavailable"
        pair_metrics = None
    elif len(left_candidates) == 1 and len(right_candidates) == 1:
        state = "paired_candidate_evidence_manual_review_required"
        pair_metrics = bbox_pair_metrics(
            left_candidates[0],
            right_candidates[0],
            image_width,
            image_height,
        )
    elif len(left_candidates) == 1 or len(right_candidates) == 1:
        state = "single_prompt_candidate_manual_review_required"
        pair_metrics = None
    else:
        state = "ambiguous_candidate_count_manual_review_required"
        pair_metrics = None

    return {
        "schemaVersion": SCHEMA_VERSION,
        "authorityState": "candidate_evidence_only_manual_review_required",
        "sourceImage": {
            "sha256": sha256_file(image_path),
            "width": image_width,
            "height": image_height,
            "originalFileName": image_path.name,
            "repositoryCommitAuthorized": False,
        },
        "capture": {
            "case": capture_case,
            "frontCameraMirrored": mirrored,
        },
        "promptPair": {
            "leftPrompt": f"{TASK}left external ear",
            "rightPrompt": f"{TASK}right external ear",
            "sideLabelsAuthoritative": False,
            "anatomicalLateralityAssigned": False,
        },
        "result": {
            "state": state,
            "leftStatus": left_record["result"]["status"],
            "rightStatus": right_record["result"]["status"],
            "leftCandidateCount": len(left_candidates),
            "rightCandidateCount": len(right_candidates),
            "pairMetrics": pair_metrics,
            "automaticConsensusAcceptanceAuthorized": False,
            "faceGeometryPlausibilityGateImplemented": False,
            "faceGeometryPlausibilityDisposition": "not_implemented",
            "validatedExternalEarObservation": False,
        },
        "authority": {
            "promptPairMayBeCalledAnatomicalLaterality": False,
            "pairMetricsMayBeCalledValidatedEarConsensus": False,
            "neutralRuntimeEarObservationAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }



LIVE_HOST_REQUEST_SCHEMA = "fr104-florence-rgba-host-request-v1"
LIVE_HOST_RESPONSE_SCHEMA = "fr104-neutral-ear-florence-host-invocation-result-v1"
LIVE_HOST_AUTHORITY_STATE = "provider_candidate_summary_only_no_ear_acceptance"
LIVE_HOST_RUN_REF = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$")


def validate_live_host_request_header(header: Any) -> dict[str, Any]:
    if not isinstance(header, dict):
        raise ValueError("live host request header must be a JSON object")
    expected_keys = {
        "schemaVersion",
        "providerRunRef",
        "width",
        "height",
        "byteLength",
        "pixelFormat",
    }
    if set(header.keys()) != expected_keys:
        raise ValueError("live host request header fields must match the exact v1 contract")
    if header["schemaVersion"] != LIVE_HOST_REQUEST_SCHEMA:
        raise ValueError("unsupported live host request schemaVersion")
    if header["pixelFormat"] != "rgba8":
        raise ValueError("live host request pixelFormat must be rgba8")
    provider_run_ref = header["providerRunRef"]
    if not isinstance(provider_run_ref, str) or not LIVE_HOST_RUN_REF.fullmatch(provider_run_ref):
        raise ValueError("providerRunRef must be a bounded opaque reference")
    width = header["width"]
    height = header["height"]
    byte_length = header["byteLength"]
    if (
        not isinstance(width, int)
        or isinstance(width, bool)
        or width <= 0
        or not isinstance(height, int)
        or isinstance(height, bool)
        or height <= 0
        or not isinstance(byte_length, int)
        or isinstance(byte_length, bool)
        or byte_length <= 0
    ):
        raise ValueError("width, height, and byteLength must be positive integers")
    expected_length = width * height * 4
    if byte_length != expected_length:
        raise ValueError("byteLength must equal width * height * 4 for rgba8")
    return {
        "schemaVersion": LIVE_HOST_REQUEST_SCHEMA,
        "providerRunRef": provider_run_ref,
        "width": width,
        "height": height,
        "byteLength": byte_length,
        "pixelFormat": "rgba8",
    }


def live_host_prompt_status(candidate_count: int) -> str:
    if candidate_count == 0:
        return "unavailable"
    if candidate_count == 1:
        return "candidate_polygon"
    return "ambiguous"


def build_live_host_response(
    *,
    provider_run_ref: str,
    left_candidate_count: int,
    right_candidate_count: int,
) -> dict[str, Any]:
    if left_candidate_count < 0 or right_candidate_count < 0:
        raise ValueError("candidate counts cannot be negative")
    return {
        "schemaVersion": LIVE_HOST_RESPONSE_SCHEMA,
        "authorityState": LIVE_HOST_AUTHORITY_STATE,
        "providerRunRef": provider_run_ref,
        "leftPromptStatus": live_host_prompt_status(left_candidate_count),
        "rightPromptStatus": live_host_prompt_status(right_candidate_count),
        "leftCandidateCount": left_candidate_count,
        "rightCandidateCount": right_candidate_count,
        "promptSideConsumedAsAnatomicalSide": False,
        "rawProviderResponsePersisted": False,
        "rawPolygonBundleReturned": False,
        "validatedExternalEarObservationAuthorized": False,
        "anatomicalLateralityAuthorized": False,
    }


def read_exact_stdin_bytes(length: int) -> bytes:
    remaining = length
    chunks: list[bytes] = []
    while remaining > 0:
        chunk = sys.stdin.buffer.read(remaining)
        if not chunk:
            raise ValueError("stdin ended before the declared RGBA byteLength")
        chunks.append(chunk)
        remaining -= len(chunk)
    trailing = sys.stdin.buffer.read(1)
    if trailing:
        raise ValueError("stdin contains trailing bytes after the exact RGBA payload")
    return b"".join(chunks)


def run_live_host_once(device_arg: str) -> int:
    header_line = sys.stdin.buffer.readline()
    if not header_line:
        raise ValueError("live host request header line is required")
    try:
        header = validate_live_host_request_header(
            json.loads(header_line.decode("utf-8"))
        )
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise ValueError("live host request header must be one UTF-8 JSON line") from error

    rgba = read_exact_stdin_bytes(header["byteLength"])
    (
        torch,
        image_cls,
        _image_draw,
        processor,
        model,
        device,
        dtype,
        _versions,
    ) = load_runtime(device_arg)

    image = image_cls.frombytes(
        "RGBA",
        (header["width"], header["height"]),
        rgba,
    ).convert("RGB")

    counts: dict[str, int] = {}
    for side in ("left", "right"):
        _generated_text, parsed, _prompt = run_prompt(
            image=image,
            prompt_mode="dual_side",
            side=side,
            torch=torch,
            processor=processor,
            model=model,
            device=device,
            dtype=dtype,
        )
        polygons = normalize_polygons(
            parsed,
            header["width"],
            header["height"],
        )
        _status, accepted, _rejected, _reasons = classify_polygons(polygons)
        counts[side] = len(accepted)

    response = build_live_host_response(
        provider_run_ref=header["providerRunRef"],
        left_candidate_count=counts["left"],
        right_candidate_count=counts["right"],
    )
    sys.stdout.write(json.dumps(response, ensure_ascii=False, separators=(",", ":")) + "\n")
    sys.stdout.flush()
    return 0


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
            "FR103 runtime dependencies are missing. "
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

    versions = {
        "python": platform.python_version(),
        "torch": getattr(torch, "__version__", "unknown"),
        "transformers": __import__("transformers").__version__,
        "pillow": getattr(__import__("PIL"), "__version__", "unknown"),
        "device": device,
        "dtype": str(dtype),
    }
    return torch, Image, ImageDraw, processor, model, device, dtype, versions


def run_prompt(
    *,
    image,
    prompt_mode: str,
    side: str | None,
    torch,
    processor,
    model,
    device: str,
    dtype,
) -> tuple[str, Any, str]:
    if prompt_mode == "generic_diagnostic":
        text_input = GENERIC_PROMPT_TARGET
    else:
        if side not in {"left", "right"}:
            raise ValueError("Side prompt requires left or right.")
        text_input = f"{side} external ear"

    prompt = TASK + text_input
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
    return generated_text, parsed, prompt


def write_overlay(image, image_draw, record: dict[str, Any], output_path: Path) -> None:
    overlay = image.copy()
    draw = image_draw.Draw(overlay)
    for polygon in record["result"]["candidatePolygons"]:
        points = [(point[0], point[1]) for point in polygon["points"]]
        if len(points) >= 3:
            draw.line(points + [points[0]], width=3)
    overlay.save(output_path)


def run(args: argparse.Namespace) -> int:
    (
        torch,
        image_cls,
        image_draw,
        processor,
        model,
        device,
        dtype,
        versions,
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

        if args.prompt_mode == "dual-side":
            requests: list[tuple[str, str | None, str]] = [
                ("dual_side", "left", "left"),
                ("dual_side", "right", "right"),
            ]
        elif args.prompt_mode == "generic-diagnostic":
            requests = [("generic_diagnostic", None, "generic")]
        else:
            sides = ["left", "right"] if args.side == "both" else [args.side]
            requests = [
                ("single_side_diagnostic", side, str(side))
                for side in sides
            ]

        records_by_name: dict[str, dict[str, Any]] = {}
        record_index: list[dict[str, Any]] = []

        for prompt_mode, requested_side, record_name in requests:
            generated_text, parsed, prompt = run_prompt(
                image=image,
                prompt_mode=prompt_mode,
                side=requested_side,
                torch=torch,
                processor=processor,
                model=model,
                device=device,
                dtype=dtype,
            )
            record = build_record(
                image_path=image_path,
                image_width=image.width,
                image_height=image.height,
                capture_case=args.capture_case,
                mirrored=args.front_camera_mirrored,
                prompt_mode=prompt_mode,
                requested_side=requested_side,
                prompt=prompt,
                generated_text=generated_text,
                parsed=parsed,
                runtime=versions,
            )
            records_by_name[record_name] = record
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
                    "promptMode": prompt_mode,
                    "requestedSide": requested_side,
                    "record": str(record_path),
                    "overlay": str(overlay_path) if overlay_path else None,
                    "status": record["result"]["status"],
                    "rejectedDegenerateCount": record["result"]["candidateValidation"][
                        "rejectedDegenerateCount"
                    ],
                }
            )

        pair_summary_path = None
        pair_summary_state = None
        if args.prompt_mode == "dual-side":
            pair_summary = build_dual_prompt_summary(
                image_path=image_path,
                image_width=image.width,
                image_height=image.height,
                capture_case=args.capture_case,
                mirrored=args.front_camera_mirrored,
                left_record=records_by_name["left"],
                right_record=records_by_name["right"],
            )
            pair_summary_path = case_dir / "pair-summary.json"
            pair_summary_path.write_text(
                json.dumps(pair_summary, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            pair_summary_state = pair_summary["result"]["state"]

        cases.append(
            {
                "sourceImageSha256": digest,
                "sourceImageName": image_path.name,
                "captureCase": args.capture_case,
                "promptMode": args.prompt_mode,
                "records": record_index,
                "pairSummary": str(pair_summary_path) if pair_summary_path else None,
                "pairSummaryState": pair_summary_state,
            }
        )

    bundle_index = {
        "schemaVersion": SCHEMA_VERSION,
        "model": {"id": MODEL_ID, "revision": MODEL_REVISION},
        "cases": cases,
        "privacy": {
            "sourceImagesCommitted": False,
            "outputsDefaultToGitIgnoredCache": True,
        },
        "authority": {
            "dualSidePromptPairPrimary": True,
            "genericExternalEarPromptPrimary": False,
            "genericPromptDiagnosticOnly": True,
            "sideSemanticsAuthoritative": False,
            "automaticConsensusAcceptanceAuthorized": False,
            "faceGeometryPlausibilityGateImplemented": False,
            "lateralityAssignmentImplemented": False,
            "exactDegeneratePolygonRejectEnabled": True,
            "numericPlausibilityThresholdAuthorized": False,
            "empiricalCandidateOnly": True,
            "runtimeObservationAuthorized": False,
            "productionAuthorization": False,
        },
    }
    index_path = output_root / "index.json"
    index_path.write_text(
        json.dumps(bundle_index, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(index_path)
    return 0


def self_test() -> int:
    fixture = {
        TASK: {
            "polygons": [
                [10, 20, 30, 20, 30, 50, 10, 50],
                [[60, 20], [80, 20], [80, 50], [60, 50]],
            ]
        }
    }
    polygons = normalize_polygons(fixture, 100, 100)
    assert len(polygons) == 2
    assert polygons[0]["pointCount"] == 4
    assert polygons[0]["insideImageBounds"] is True
    assert polygons[0]["geometry"]["area"] == 600.0
    assert polygons[0]["geometry"]["exactDegenerate"] is False

    status, accepted, rejected, reasons = classify_polygons(polygons)
    assert status == "candidate_polygon"
    assert len(accepted) == 2
    assert rejected == []
    assert reasons == []

    degenerate_fixture = {
        TASK: {
            "polygons": [
                [10, 20, 20, 20, 30, 20, 40, 20],
            ]
        }
    }
    degenerate = normalize_polygons(degenerate_fixture, 100, 100)
    assert len(degenerate) == 1
    assert degenerate[0]["geometry"]["bbox"]["height"] == 0.0
    assert degenerate[0]["geometry"]["area"] == 0.0
    assert degenerate[0]["geometry"]["exactDegenerate"] is True

    status, accepted, rejected, reasons = classify_polygons(degenerate)
    assert status == "unavailable"
    assert accepted == []
    assert len(rejected) == 1
    assert "zero_bbox_height" in reasons
    assert "zero_polygon_area" in reasons

    left = normalize_polygons(
        {TASK: {"polygons": [[10, 10, 30, 10, 30, 30, 10, 30]]}},
        100,
        100,
    )[0]
    right = normalize_polygons(
        {TASK: {"polygons": [[12, 11, 32, 11, 32, 31, 12, 31]]}},
        100,
        100,
    )[0]
    pair = bbox_pair_metrics(left, right, 100, 100)
    assert pair["bboxIntersectionArea"] > 0.0
    assert 0.0 < pair["bboxIoU"] <= 1.0
    assert pair["automaticAcceptanceThresholdApplied"] is False

    left_record = {"result": {"status": "candidate_polygon", "candidatePolygons": [left]}}
    right_record = {"result": {"status": "candidate_polygon", "candidatePolygons": [right]}}
    summary = build_dual_prompt_summary(
        image_path=Path(__file__),
        image_width=100,
        image_height=100,
        capture_case="self_test",
        mirrored=False,
        left_record=left_record,
        right_record=right_record,
    )
    assert summary["result"]["state"] == "paired_candidate_evidence_manual_review_required"
    assert summary["result"]["pairMetrics"]["bboxIoU"] > 0.0
    assert summary["result"]["automaticConsensusAcceptanceAuthorized"] is False
    assert summary["result"]["faceGeometryPlausibilityGateImplemented"] is False

    live_header = validate_live_host_request_header(
        {
            "schemaVersion": LIVE_HOST_REQUEST_SCHEMA,
            "providerRunRef": "fr104:self-test:001",
            "width": 2,
            "height": 1,
            "byteLength": 8,
            "pixelFormat": "rgba8",
        }
    )
    assert live_header["byteLength"] == 8
    live_response = build_live_host_response(
        provider_run_ref="fr104:self-test:001",
        left_candidate_count=1,
        right_candidate_count=2,
    )
    assert live_response["leftPromptStatus"] == "candidate_polygon"
    assert live_response["rightPromptStatus"] == "ambiguous"
    assert live_response["rawPolygonBundleReturned"] is False
    assert live_response["anatomicalLateralityAuthorized"] is False

    print("FR103 Florence-2 dual-prompt ear validation self-test: PASS")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Local/offline FR103 Florence-2 dual-prompt external-ear validator."
    )
    parser.add_argument("--input", help="Image file or directory.")
    parser.add_argument(
        "--capture-case",
        help="Pinned empirical capture-case label from FR101/FR103.",
    )
    parser.add_argument(
        "--prompt-mode",
        choices=["dual-side", "generic-diagnostic", "single-side-diagnostic"],
        default="dual-side",
        help=(
            "Use non-authoritative left/right prompt pair by default. "
            "Generic and single-side modes are diagnostic only."
        ),
    )
    parser.add_argument(
        "--side",
        choices=["left", "right", "both"],
        default="both",
        help="Used only with --prompt-mode single-side-diagnostic.",
    )
    parser.add_argument(
        "--front-camera-mirrored",
        action="store_true",
        help="Record that the supplied pixels are mirrored front-camera output. The image is not flipped.",
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
    )
    parser.add_argument("--qa-overlay", action="store_true")
    parser.add_argument("--device", default="auto")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument(
        "--stdio-rgba-host-once",
        action="store_true",
        help=(
            "Read one exact v1 JSON header line plus raw RGBA8 bytes from stdin, "
            "run the dual-side Florence candidate path entirely in memory, and "
            "write one bounded JSON result to stdout."
        ),
    )
    args = parser.parse_args()

    if not args.self_test and not args.stdio_rgba_host_once:
        if not args.input:
            parser.error("--input is required unless --self-test is used")
        if not args.capture_case:
            parser.error("--capture-case is required unless --self-test is used")
    return args


if __name__ == "__main__":
    cli_args = parse_args()
    try:
        if cli_args.self_test:
            raise SystemExit(self_test())
        if cli_args.stdio_rgba_host_once:
            raise SystemExit(run_live_host_once(cli_args.device))
        raise SystemExit(run(cli_args))
    except Exception as error:
        print(f"FR103 runner failed: {error}", file=sys.stderr)
        raise
