#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import platform
import sys
from pathlib import Path
from typing import Any, Iterable

MODEL_ID = "microsoft/Florence-2-base"
MODEL_REVISION = "5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac"
TASK = "<REFERRING_EXPRESSION_SEGMENTATION>"
SCHEMA_VERSION = "fr102-neutral-ear-empirical-bundle-v1"
DEFAULT_OUTPUT_DIR = Path(".cache/face-reading/ear-fr102")
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


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
            }
        )
    return normalized


def build_record(
    *,
    image_path: Path,
    image_width: int,
    image_height: int,
    capture_case: str,
    mirrored: bool,
    requested_side: str,
    prompt: str,
    generated_text: str,
    parsed: Any,
    runtime: dict[str, Any],
) -> dict[str, Any]:
    polygons = normalize_polygons(parsed, image_width, image_height)
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
            "requestedSide": requested_side,
            "prompt": prompt,
        },
        "result": {
            "status": "candidate_polygon" if polygons else "unavailable",
            "polygons": polygons,
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
            "FR102 runtime dependencies are missing. "
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
    side: str,
    torch,
    processor,
    model,
    device: str,
    dtype,
) -> tuple[str, Any, str]:
    text_input = f"{side} external ear"
    prompt = TASK + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt").to(device, dtype)
    with torch.inference_mode():
        generated_ids = model.generate(
            input_ids=inputs["input_ids"],
            pixel_values=inputs["pixel_values"],
            max_new_tokens=1024,
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
    for polygon in record["result"]["polygons"]:
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
    sides = ["left", "right"] if args.side == "both" else [args.side]
    output_root = Path(args.output_dir)
    output_root.mkdir(parents=True, exist_ok=True)

    index: list[dict[str, Any]] = []
    for image_path in images:
        digest = sha256_file(image_path)
        case_dir = output_root / digest[:16]
        case_dir.mkdir(parents=True, exist_ok=True)

        image = image_cls.open(image_path).convert("RGB")
        for side in sides:
            generated_text, parsed, prompt = run_prompt(
                image=image,
                side=side,
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
                requested_side=side,
                prompt=prompt,
                generated_text=generated_text,
                parsed=parsed,
                runtime=versions,
            )
            record_path = case_dir / f"{side}.json"
            record_path.write_text(
                json.dumps(record, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

            overlay_path = None
            if args.qa_overlay and record["result"]["polygons"]:
                overlay_path = case_dir / f"{side}-overlay.png"
                write_overlay(image, image_draw, record, overlay_path)

            index.append(
                {
                    "sourceImageSha256": digest,
                    "sourceImageName": image_path.name,
                    "captureCase": args.capture_case,
                    "requestedSide": side,
                    "record": str(record_path),
                    "overlay": str(overlay_path) if overlay_path else None,
                    "status": record["result"]["status"],
                }
            )

    bundle_index = {
        "schemaVersion": SCHEMA_VERSION,
        "model": {"id": MODEL_ID, "revision": MODEL_REVISION},
        "records": index,
        "privacy": {
            "sourceImagesCommitted": False,
            "outputsDefaultToGitIgnoredCache": True,
        },
        "authority": {
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
    assert normalize_polygons({TASK: {"polygons": []}}, 100, 100) == []

    nested = {TASK: {"polygons": [[[1, 1, 5, 1, 5, 5, 1, 5]]]}}
    nested_polygons = normalize_polygons(nested, 10, 10)
    assert len(nested_polygons) == 1
    assert nested_polygons[0]["points"][0] == [1.0, 1.0]

    print("FR102 Florence-2 ear empirical runner self-test: PASS")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Local/offline FR102 Florence-2 external-ear empirical runner."
    )
    parser.add_argument("--input", help="Image file or directory.")
    parser.add_argument(
        "--capture-case",
        help="Pinned empirical capture-case label from FR101.",
    )
    parser.add_argument(
        "--side",
        choices=["left", "right", "both"],
        default="both",
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
        print(f"FR102 runner failed: {error}", file=sys.stderr)
        raise
