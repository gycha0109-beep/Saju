from __future__ import annotations

import argparse
import hashlib
import json
import sys
import urllib.request
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def load_manifest(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def parse_obj(text: str) -> tuple[list[tuple[float, float, float]], list[tuple[int, ...]]]:
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, ...]] = []

    for line in text.splitlines():
        if line.startswith("v "):
            parts = line.split()
            if len(parts) < 4:
                raise ValueError(f"Malformed vertex line: {line!r}")
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif line.startswith("f "):
            face: list[int] = []
            for token in line.split()[1:]:
                vertex_token = token.split("/", 1)[0]
                index = int(vertex_token)
                if index <= 0:
                    raise ValueError("Negative or zero OBJ vertex indices are not supported")
                face.append(index - 1)
            if len(face) < 3:
                raise ValueError(f"Malformed face line: {line!r}")
            faces.append(tuple(face))

    return vertices, faces


def assert_close(actual: tuple[float, float, float], expected: list[float], tolerance: float = 1e-6) -> None:
    if len(expected) != 3:
        raise ValueError("Expected coordinate must contain exactly three values")
    for actual_value, expected_value in zip(actual, expected, strict=True):
        if abs(actual_value - float(expected_value)) > tolerance:
            raise ValueError(f"Coordinate mismatch: actual={actual}, expected={expected}")


def verify(data: bytes, manifest: dict) -> dict:
    expected_size = int(manifest["providerByteLength"])
    if len(data) != expected_size:
        raise ValueError(f"Byte length mismatch: actual={len(data)}, expected={expected_size}")

    actual_blob_sha = git_blob_sha(data)
    expected_blob_sha = manifest["providerGitBlobSha"]
    if actual_blob_sha != expected_blob_sha:
        raise ValueError(f"Git blob SHA mismatch: actual={actual_blob_sha}, expected={expected_blob_sha}")

    text = data.decode("utf-8")
    vertices, faces = parse_obj(text)
    expected_vertex_count = int(manifest["canonicalTopology"]["vertexCount"])
    if len(vertices) != expected_vertex_count:
        raise ValueError(f"Vertex count mismatch: actual={len(vertices)}, expected={expected_vertex_count}")
    if not faces:
        raise ValueError("Canonical OBJ contains no faces")

    referenced = {index for face in faces for index in face}
    if min(referenced) < 0 or max(referenced) >= expected_vertex_count:
        raise ValueError(
            f"Face index out of range: min={min(referenced)}, max={max(referenced)}, vertex_count={expected_vertex_count}"
        )

    for seed in manifest["inspectionSeeds"]:
        index = int(seed["index"])
        if index < 0 or index >= expected_vertex_count:
            raise ValueError(f"Inspection seed index out of range: {index}")
        assert_close(vertices[index], seed["coordinateCm"])

    return {
        "byteLength": len(data),
        "gitBlobSha": actual_blob_sha,
        "vertexCount": len(vertices),
        "faceCount": len(faces),
        "minReferencedVertex": min(referenced),
        "maxReferencedVertex": max(referenced),
        "inspectionSeeds": [int(seed["index"]) for seed in manifest["inspectionSeeds"]],
    }


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "MyeongHa-MESH1/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def main() -> int:
    default_manifest = repo_root() / "packages/face-reading/assets/canonical-face/mediapipe-v0.10.35.manifest.json"
    default_output = repo_root() / ".cache/face-reading/mediapipe-v0.10.35/canonical_face_model.obj"

    parser = argparse.ArgumentParser(description="Fetch and verify the pinned MediaPipe canonical face OBJ.")
    parser.add_argument("--manifest", type=Path, default=default_manifest)
    parser.add_argument("--output", type=Path, default=default_output)
    args = parser.parse_args()

    manifest = load_manifest(args.manifest)
    data = fetch(manifest["providerRawUrl"])
    verification = verify(data, manifest)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_bytes(data)

    print(
        json.dumps(
            {
                "status": "verified",
                "output": str(args.output),
                **verification,
            },
            ensure_ascii=False,
            sort_keys=True,
        )
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"MESH1 canonical-face fetch failed: {exc}", file=sys.stderr)
        raise
