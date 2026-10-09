from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np

EXPECTED_BYTE_LENGTH = 53_305_389
EXPECTED_GIT_BLOB_SHA = "ae49903ad7d50ce1d64e464a0407441f2781873c"
EXPECTED_VARIANT = "head"
LEFT_EYE_JOINT = "left_eye"
RIGHT_EYE_JOINT = "right_eye"
LEFT_EYE_INDEX = 2
RIGHT_EYE_INDEX = 3
EXPECTED_LEFT_EYE = (
    0.030839037150144577,
    0.30316492915153503,
    0.09888789802789688,
)
EXPECTED_RIGHT_EYE = (
    -0.030866222456097603,
    0.3031134307384491,
    0.09897840023040771,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Stage exact GNM geometry for FR104 U5B-B render-only execution."
    )
    parser.add_argument("--npz", type=Path, required=True)
    parser.add_argument("--vertices-out", type=Path, required=True)
    parser.add_argument("--triangles-out", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path, required=True)
    return parser.parse_args()


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def normalized_scalar(value: object) -> str:
    array = np.asarray(value)
    if array.size != 1:
        raise ValueError(f"expected scalar, got shape={array.shape}")
    item = array.reshape(()).item()
    if isinstance(item, bytes):
        return item.decode("utf-8")
    if isinstance(item, np.bytes_):
        return bytes(item).decode("utf-8")
    return str(item)


def normalized_names(values: object) -> list[str]:
    array = np.asarray(values)
    if array.ndim != 1:
        raise ValueError(f"expected one-dimensional names, got {array.shape}")
    result: list[str] = []
    for value in array.tolist():
        if isinstance(value, bytes):
            result.append(value.decode("utf-8"))
        elif isinstance(value, np.bytes_):
            result.append(bytes(value).decode("utf-8"))
        else:
            result.append(str(value))
    return result


def exact_point(actual: np.ndarray, expected: tuple[float, float, float]) -> bool:
    return actual.shape == (3,) and actual.tolist() == list(expected)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> int:
    args = parse_args()
    data = args.npz.read_bytes()
    observed_blob = git_blob_sha(data)
    if len(data) != EXPECTED_BYTE_LENGTH or observed_blob != EXPECTED_GIT_BLOB_SHA:
        raise ValueError(
            "pinned GNM asset drift "
            f"length={len(data)} blob={observed_blob}"
        )

    with np.load(args.npz, allow_pickle=False) as model:
        required = {
            "version",
            "variant",
            "template_vertex_positions",
            "triangles",
            "joint_names",
            "template_joint_positions",
        }
        missing = sorted(required - set(model.files))
        if missing:
            raise ValueError(f"required GNM arrays missing: {missing}")

        version = normalized_scalar(model["version"])
        variant = normalized_scalar(model["variant"])
        source_vertices = np.asarray(model["template_vertex_positions"])
        source_triangles = np.asarray(model["triangles"])
        joint_names = normalized_names(model["joint_names"])
        joint_positions = np.asarray(
            model["template_joint_positions"],
            dtype=np.float64,
        )

    if variant != EXPECTED_VARIANT:
        raise ValueError(f"GNM variant drift: {variant}")
    if source_vertices.ndim != 2 or source_vertices.shape[1] != 3:
        raise ValueError(f"unexpected vertex shape: {source_vertices.shape}")
    if source_triangles.ndim != 2 or source_triangles.shape[1] != 3:
        raise ValueError(f"unexpected triangle shape: {source_triangles.shape}")
    if source_triangles.dtype.kind not in ("i", "u"):
        raise ValueError(f"triangle dtype must be integer: {source_triangles.dtype}")
    if joint_positions.ndim != 2 or joint_positions.shape[1] != 3:
        raise ValueError(f"unexpected joint position shape: {joint_positions.shape}")
    if len(joint_names) != joint_positions.shape[0]:
        raise ValueError("joint name/position count mismatch")
    if not np.all(np.isfinite(source_vertices)):
        raise ValueError("non-finite template vertex")
    if not np.all(np.isfinite(joint_positions)):
        raise ValueError("non-finite joint position")
    if source_vertices.shape[0] == 0 or source_triangles.shape[0] == 0:
        raise ValueError("empty GNM geometry")

    triangle_min = int(np.min(source_triangles))
    triangle_max = int(np.max(source_triangles))
    if triangle_min < 0 or triangle_max >= source_vertices.shape[0]:
        raise ValueError(
            "triangle index out of range "
            f"min={triangle_min} max={triangle_max} vertices={source_vertices.shape[0]}"
        )
    if triangle_max > np.iinfo(np.int32).max:
        raise ValueError("triangle index exceeds int32 staging range")

    left_indices = [i for i, name in enumerate(joint_names) if name == LEFT_EYE_JOINT]
    right_indices = [i for i, name in enumerate(joint_names) if name == RIGHT_EYE_JOINT]
    if left_indices != [LEFT_EYE_INDEX] or right_indices != [RIGHT_EYE_INDEX]:
        raise ValueError(
            f"semantic joint index drift left={left_indices} right={right_indices}"
        )

    left = joint_positions[LEFT_EYE_INDEX]
    right = joint_positions[RIGHT_EYE_INDEX]
    if not exact_point(left, EXPECTED_LEFT_EYE):
        raise ValueError(f"left_eye anchor drift: {left.tolist()}")
    if not exact_point(right, EXPECTED_RIGHT_EYE):
        raise ValueError(f"right_eye anchor drift: {right.tolist()}")

    vertices = np.asarray(source_vertices, dtype="<f8", order="C")
    triangles = np.asarray(source_triangles, dtype="<i4", order="C")
    vertex_bytes = vertices.tobytes(order="C")
    triangle_bytes = triangles.tobytes(order="C")

    args.vertices_out.parent.mkdir(parents=True, exist_ok=True)
    args.triangles_out.parent.mkdir(parents=True, exist_ok=True)
    args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
    args.vertices_out.write_bytes(vertex_bytes)
    args.triangles_out.write_bytes(triangle_bytes)

    minimum = vertices.min(axis=0)
    maximum = vertices.max(axis=0)
    metadata = {
        "schemaVersion": "fr104-u5b-gnm-render-staging-v1",
        "authorityState": "ephemeral_geometry_staging_no_provider_execution",
        "asset": {
            "repository": "google/GNM",
            "upstreamCommit": "fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690",
            "sourcePath": "gnm/shape/data/versions/v3_0/gnm_head.npz",
            "gitBlobSha": EXPECTED_GIT_BLOB_SHA,
            "byteLength": EXPECTED_BYTE_LENGTH,
            "versionNormalized": version,
            "variantNormalized": variant,
        },
        "geometry": {
            "sourceVertexDtype": str(source_vertices.dtype),
            "sourceTriangleDtype": str(source_triangles.dtype),
            "stagedVertexDtype": "float64_le",
            "stagedTriangleDtype": "int32_le",
            "vertexCount": int(vertices.shape[0]),
            "triangleCount": int(triangles.shape[0]),
            "verticesSha256": sha256(vertex_bytes),
            "trianglesSha256": sha256(triangle_bytes),
            "boundsMin": [float(value) for value in minimum],
            "boundsMax": [float(value) for value in maximum],
        },
        "semanticGroundTruth": {
            "leftEye": {
                "jointName": LEFT_EYE_JOINT,
                "jointIndex": LEFT_EYE_INDEX,
                "sourcePoint": left.tolist(),
            },
            "rightEye": {
                "jointName": RIGHT_EYE_JOINT,
                "jointIndex": RIGHT_EYE_INDEX,
                "sourcePoint": right.tolist(),
            },
            "semanticAuthority": "direct_gnm_source_joint_names_only",
            "gnmAxisOrderingDefinesAnatomicalSide": False,
        },
        "execution": {
            "providerExecuted": False,
            "providerPackageImported": False,
            "userImageConsumed": False,
        },
    }
    serialized = json.dumps(metadata, sort_keys=True, separators=(",", ":"))
    args.metadata_out.write_text(serialized + "\n", encoding="utf-8")
    print("FR104_U5B_STAGE_METADATA " + serialized)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
