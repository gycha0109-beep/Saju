#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import struct
import sys
from typing import Any, BinaryIO

from run_florence2_ear_empirical import (
    MODEL_ID,
    MODEL_REVISION,
    TASK,
    classify_polygons,
    load_runtime,
    normalize_polygons,
    run_prompt,
)

SCHEMA_VERSION = "fr104-florence-live-worker-v1"
REQUEST_SCHEMA_VERSION = "fr104-florence-live-worker-request-v1"
RESPONSE_SCHEMA_VERSION = "fr104-florence-live-worker-response-v1"
MAX_RGBA_BYTES = 32 * 1024 * 1024
MAX_HEADER_BYTES = 16 * 1024


def fail(message: str) -> None:
    raise ValueError(f"FR104 Florence live worker {message}")


def read_exact(stream: BinaryIO, length: int) -> bytes:
    chunks: list[bytes] = []
    remaining = length
    while remaining:
        chunk = stream.read(remaining)
        if not chunk:
            raise EOFError("unexpected EOF while reading framed payload")
        chunks.append(chunk)
        remaining -= len(chunk)
    return b"".join(chunks)


def read_frame(stream: BinaryIO) -> tuple[dict[str, Any], bytes] | None:
    prefix = stream.read(4)
    if prefix == b"":
        return None
    if len(prefix) != 4:
        fail("request header-length prefix is truncated")
    header_length = struct.unpack(">I", prefix)[0]
    if header_length <= 0 or header_length > MAX_HEADER_BYTES:
        fail("request header length is outside the governed bound")
    header_bytes = read_exact(stream, header_length)
    try:
        header = json.loads(header_bytes.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        fail(f"request header is not valid UTF-8 JSON: {error}")
    if not isinstance(header, dict):
        fail("request header must be a JSON object")
    body_length = header.get("byteLength")
    if (
        not isinstance(body_length, int)
        or isinstance(body_length, bool)
        or body_length <= 0
        or body_length > MAX_RGBA_BYTES
    ):
        fail("byteLength must be a positive integer within the 32 MiB bound")
    return header, read_exact(stream, body_length)


def write_response(stream: BinaryIO, payload: dict[str, Any]) -> None:
    data = (
        json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        .encode("utf-8")
    )
    stream.write(struct.pack(">I", len(data)))
    stream.write(data)
    stream.flush()


def validate_request(
    header: dict[str, Any],
    rgba_bytes: bytes,
) -> tuple[str, int, int]:
    if header.get("schemaVersion") != REQUEST_SCHEMA_VERSION:
        fail("request schemaVersion mismatch")
    provider_run_ref = header.get("providerRunRef")
    if (
        not isinstance(provider_run_ref, str)
        or not provider_run_ref
        or len(provider_run_ref) > 256
        or any(character.isspace() for character in provider_run_ref)
    ):
        fail("providerRunRef must be a bounded non-whitespace string")
    width = header.get("width")
    height = header.get("height")
    if (
        not isinstance(width, int)
        or isinstance(width, bool)
        or width <= 0
        or not isinstance(height, int)
        or isinstance(height, bool)
        or height <= 0
    ):
        fail("width and height must be positive integers")
    expected = width * height * 4
    if expected != len(rgba_bytes) or expected != header.get("byteLength"):
        fail("RGBA byte length must equal width * height * 4 exactly")
    if header.get("pixelFormat") != "rgba8":
        fail("pixelFormat must be rgba8")
    return provider_run_ref, width, height


def sanitize_candidates(
    parsed: Any,
    width: int,
    height: int,
) -> dict[str, Any]:
    polygons = normalize_polygons(parsed, width, height)
    status, accepted, rejected, rejection_reasons = classify_polygons(polygons)
    candidates = []
    for index, polygon in enumerate(accepted):
        points = [
            {
                "x": point[0] / width,
                "y": point[1] / height,
            }
            for point in polygon["points"]
        ]
        candidates.append(
            {
                "candidateOrdinal": index + 1,
                "coordinateFrame": "canonical_image_normalized_2d",
                "points": points,
                "exactStructuralDegeneracyAlreadyRejected": True,
            }
        )
    return {
        "status": status,
        "candidateCount": len(candidates),
        "candidates": candidates,
        "rejectedDegenerateCount": len(rejected),
        "rejectionReasons": rejection_reasons,
        "exactDegeneracyGateApplied": True,
        "numericAcceptanceThresholdApplied": False,
    }


class FlorenceEngine:
    def __init__(self, device: str) -> None:
        (
            self.torch,
            self.image_cls,
            _image_draw,
            self.processor,
            self.model,
            self.device,
            self.dtype,
            _versions,
        ) = load_runtime(device)

    def infer(
        self,
        rgba_bytes: bytes,
        width: int,
        height: int,
    ) -> tuple[Any, Any]:
        image = self.image_cls.frombytes(
            "RGBA",
            (width, height),
            rgba_bytes,
        ).convert("RGB")
        try:
            _left_text, left_parsed, _left_prompt = run_prompt(
                image=image,
                prompt_mode="dual_side",
                side="left",
                torch=self.torch,
                processor=self.processor,
                model=self.model,
                device=self.device,
                dtype=self.dtype,
            )
            _right_text, right_parsed, _right_prompt = run_prompt(
                image=image,
                prompt_mode="dual_side",
                side="right",
                torch=self.torch,
                processor=self.processor,
                model=self.model,
                device=self.device,
                dtype=self.dtype,
            )
            return left_parsed, right_parsed
        finally:
            image.close()


def process_request(
    engine: FlorenceEngine,
    header: dict[str, Any],
    rgba_bytes: bytes,
) -> dict[str, Any]:
    provider_run_ref, width, height = validate_request(
        header,
        rgba_bytes,
    )
    left_parsed, right_parsed = engine.infer(
        rgba_bytes,
        width,
        height,
    )
    return {
        "schemaVersion": RESPONSE_SCHEMA_VERSION,
        "authorityState":
            "ephemeral_provider_candidates_only_no_ear_acceptance",
        "providerRunRef": provider_run_ref,
        "frame": {
            "width": width,
            "height": height,
            "pixelFormat": "rgba8",
        },
        "model": {
            "id": MODEL_ID,
            "revision": MODEL_REVISION,
            "task": TASK,
        },
        "prompts": {
            "left": sanitize_candidates(
                left_parsed,
                width,
                height,
            ),
            "right": sanitize_candidates(
                right_parsed,
                width,
                height,
            ),
            "sideLabelsAuthoritative": False,
            "anatomicalLateralityAssigned": False,
        },
        "privacy": {
            "rawRgbaPersisted": False,
            "rawProviderResponseReturned": False,
            "generatedTextReturned": False,
            "sourceImageDigestComputed": False,
            "candidateGeometryReturnedEphemeral": True,
        },
        "authority": {
            "validatedExternalEarObservationAuthorized": False,
            "anatomicalLateralityAuthorized": False,
            "traditionalBindingAuthorized": False,
            "productionAuthorization": False,
        },
    }


def serve(device: str) -> int:
    engine = FlorenceEngine(device)
    input_stream = sys.stdin.buffer
    output_stream = sys.stdout.buffer
    while True:
        try:
            framed = read_frame(input_stream)
            if framed is None:
                return 0
            header, rgba_bytes = framed
            response = process_request(engine, header, rgba_bytes)
        except Exception as error:
            response = {
                "schemaVersion": RESPONSE_SCHEMA_VERSION,
                "authorityState": "transport_error_no_provider_authority",
                "error": {
                    "type": type(error).__name__,
                    "message": str(error),
                },
                "authority": {
                    "validatedExternalEarObservationAuthorized": False,
                    "anatomicalLateralityAuthorized": False,
                    "traditionalBindingAuthorized": False,
                    "productionAuthorization": False,
                },
            }
        write_response(output_stream, response)


class FakeEngine:
    def infer(
        self,
        rgba_bytes: bytes,
        width: int,
        height: int,
    ) -> tuple[Any, Any]:
        del rgba_bytes
        return (
            {
                TASK: {
                    "polygons": [
                        [0, 0, width / 2, 0, width / 2, height, 0, height],
                    ]
                }
            },
            {
                TASK: {
                    "polygons": [
                        [
                            width / 2,
                            0,
                            width,
                            0,
                            width,
                            height,
                            width / 2,
                            height,
                        ],
                    ]
                }
            },
        )


def self_test() -> int:
    header = {
        "schemaVersion": REQUEST_SCHEMA_VERSION,
        "providerRunRef": "fr104:self-test:001",
        "width": 2,
        "height": 1,
        "pixelFormat": "rgba8",
        "byteLength": 8,
    }
    rgba = bytes([1, 2, 3, 255, 4, 5, 6, 255])
    response = process_request(FakeEngine(), header, rgba)
    assert response["providerRunRef"] == "fr104:self-test:001"
    assert response["prompts"]["left"]["candidateCount"] == 1
    assert response["prompts"]["right"]["candidateCount"] == 1
    assert response["prompts"]["sideLabelsAuthoritative"] is False
    assert response["authority"]["anatomicalLateralityAuthorized"] is False
    assert response["privacy"]["rawRgbaPersisted"] is False

    import io

    header_bytes = json.dumps(header).encode("utf-8")
    framed = (
        struct.pack(">I", len(header_bytes))
        + header_bytes
        + rgba
    )
    parsed = read_frame(io.BytesIO(framed))
    assert parsed is not None
    parsed_header, parsed_rgba = parsed
    assert parsed_header == header
    assert parsed_rgba == rgba

    output = io.BytesIO()
    write_response(output, response)
    output.seek(0)
    response_length = struct.unpack(">I", output.read(4))[0]
    decoded = json.loads(output.read(response_length).decode("utf-8"))
    assert decoded["schemaVersion"] == RESPONSE_SCHEMA_VERSION

    try:
        validate_request(
            {**header, "byteLength": 7},
            rgba,
        )
    except ValueError:
        pass
    else:
        raise AssertionError("invalid RGBA byte length was not rejected")

    print("FR104 Florence live worker protocol self-test: PASS")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Persistent FR104 Florence-2 worker for governed ephemeral "
            "RGBA transport."
        )
    )
    parser.add_argument("--device", default="auto")
    parser.add_argument("--self-test", action="store_true")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    raise SystemExit(self_test() if args.self_test else serve(args.device))
