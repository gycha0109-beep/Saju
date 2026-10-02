from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import numpy as np

EXPECTED_BYTE_LENGTH = 53_305_389
EXPECTED_GIT_BLOB_SHA = "ae49903ad7d50ce1d64e464a0407441f2781873c"
EXPECTED_VARIANT = "head"
LEFT_EYE_NAME = "left_eye"
RIGHT_EYE_NAME = "right_eye"
EXPECTED_LEFT_INDEX = 2
EXPECTED_RIGHT_INDEX = 3
EXPECTED_LEFT_POINT = np.asarray(
    [0.030839037150144577, 0.30316492915153503, 0.09888789802789688],
    dtype=np.float64,
)
EXPECTED_RIGHT_POINT = np.asarray(
    [-0.030866222456097603, 0.3031134307384491, 0.09897840023040771],
    dtype=np.float64,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Prepare exact pinned GNM geometry and semantic anchors for "
            "FR104 U5B-B render-only validation."
        )
    )
    parser.add_argument("--npz", type=Path, required=True)
    parser.add_argument("--obj-out", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path, required=True)
    return parser.parse_args()


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def normalized_scalar(value: object) -> str:
    array = np.asarray(value)
    if array.size != 1:
        raise ValueError(f"Expected scalar model attribute, got {array.shape}")
    item = array.reshape(()).item()
    if isinstance(item, bytes):
        return item.decode("utf-8")
    if isinstance(item, np.bytes_):
        return bytes(item).decode("utf-8")
    return str(item)


def normalized_names(values: object) -> list[str]:
    array = np.asarray(values)
    if array.ndim != 1:
        raise ValueError(f"Expected one-dimensional name array, got {array.shape}")
    result: list[str] = []
    for value in array.tolist():
        if isinstance(value, bytes):
            result.append(value.decode("utf-8"))
        elif isinstance(value, np.bytes_):
            result.append(bytes(value).decode("utf-8"))
        else:
            result.append(str(value))
    return result


def main() -> int:
    args = parse_args()
    data = args.npz.read_bytes()
    observed_blob = git_blob_sha(data)
    if len(data) != EXPECTED_BYTE_LENGTH or observed_blob != EXPECTED_GIT_BLOB_SHA:
        raise ValueError(
            "Pinned GNM asset drift: "
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
            raise ValueError(f"GNM U5B required arrays missing: {missing}")

        version = normalized_scalar(model["version"])
        variant = normalized_scalar(model["variant"])
        vertices = np.asarray(
            model["template_vertex_positions"],
            dtype=np.float64,
        )
        triangles = np.asarray(model["triangles"], dtype=np.int64)
        joint_names = normalized_names(model["joint_names"])
        joint_positions = np.asarray(
            model["template_joint_positions"],
            dtype=np.float64,
        )

    if variant != EXPECTED_VARIANT:
        raise ValueError(f"GNM variant drift: {variant}")
    if vertices.ndim != 2 or vertices.shape[1] != 3:
        raise ValueError(f"Unexpected vertex shape: {vertices.shape}")
    if not bool(np.all(np.isfinite(vertices))):
        raise ValueError("GNM geometry contains non-finite vertices")
    if triangles.ndim != 2 or triangles.shape[1] != 3:
        raise ValueError(f"Unexpected triangle shape: {triangles.shape}")
    if triangles.size == 0:
        raise ValueError("GNM geometry contains no triangles")
    if int(np.min(triangles)) < 0 or int(np.max(triangles)) >= vertices.shape[0]:
        raise ValueError("GNM triangle index out of range")
    if joint_positions.ndim != 2 or joint_positions.shape[1] != 3:
        raise ValueError(
            f"Unexpected template_joint_positions shape: {joint_positions.shape}"
        )
    if joint_positions.shape[0] != len(joint_names):
        raise ValueError("joint_names count does not match joint positions")

    left_indices = [
        index for index, name in enumerate(joint_names)
        if name == LEFT_EYE_NAME
    ]
    right_indices = [
        index for index, name in enumerate(joint_names)
        if name == RIGHT_EYE_NAME
    ]
    if left_indices != [EXPECTED_LEFT_INDEX]:
        raise ValueError(f"left_eye index drift: {left_indices}")
    if right_indices != [EXPECTED_RIGHT_INDEX]:
        raise ValueError(f"right_eye index drift: {right_indices}")

    left = joint_positions[EXPECTED_LEFT_INDEX]
    right = joint_positions[EXPECTED_RIGHT_INDEX]
    if not np.array_equal(left, EXPECTED_LEFT_POINT):
        raise ValueError(f"left_eye position drift: {left.tolist()}")
    if not np.array_equal(right, EXPECTED_RIGHT_POINT):
        raise ValueError(f"right_eye position drift: {right.tolist()}")

    minimum = np.min(vertices, axis=0)
    maximum = np.max(vertices, axis=0)
    center = (minimum + maximum) * 0.5
    span = maximum - minimum
    if not bool(np.all(np.isfinite(minimum))) or not bool(np.all(np.isfinite(maximum))):
        raise ValueError("GNM bounds are non-finite")
    if not float(span[0]) > 0 or not float(span[1]) > 0:
        raise ValueError(f"GNM projected bounds are degenerate: {span.tolist()}")

    args.obj_out.parent.mkdir(parents=True, exist_ok=True)
    with args.obj_out.open("w", encoding="utf-8", newline="\n") as handle:
        handle.write("# FR104 U5B exact pinned GNM template geometry\n")
        for x, y, z in vertices:
            handle.write(f"v {repr(float(x))} {repr(float(y))} {repr(float(z))}\n")
        for a, b, c in triangles:
            handle.write(f"f {int(a)+1} {int(b)+1} {int(c)+1}\n")

    metadata = {
        "schemaVersion": "fr104-u5b-gnm-geometry-preparation-v1",
        "source": {
            "repository": "google/GNM",
            "upstreamCommit":
                "fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690",
            "sourcePath":
                "gnm/shape/data/versions/v3_0/gnm_head.npz",
            "gitBlobSha": EXPECTED_GIT_BLOB_SHA,
            "byteLength": EXPECTED_BYTE_LENGTH,
            "versionNormalized": version,
            "variantNormalized": variant,
        },
        "geometry": {
            "vertexCount": int(vertices.shape[0]),
            "triangleCount": int(triangles.shape[0]),
            "bounds": {
                "min": [float(value) for value in minimum],
                "max": [float(value) for value in maximum],
                "center": [float(value) for value in center],
                "span": [float(value) for value in span],
            },
            "coordinateConvention": {
                "handedness": "right-handed",
                "upAxis": "+Y",
                "forwardAxis": "+Z",
                "unit": "meter",
            },
        },
        "semanticGroundTruth": {
            "leftEye": {
                "jointName": LEFT_EYE_NAME,
                "jointIndex": EXPECTED_LEFT_INDEX,
                "sourcePoint": [float(value) for value in left],
            },
            "rightEye": {
                "jointName": RIGHT_EYE_NAME,
                "jointIndex": EXPECTED_RIGHT_INDEX,
                "sourcePoint": [float(value) for value in right],
            },
            "semanticAuthority": "direct_gnm_source_joint_names_only",
            "imageSpaceXSignDefinesAnatomicalSide": False,
            "gnmAxisOrderingDefinesAnatomicalSide": False,
            "providerLabelDerived": False,
            "providerLandmarkDerived": False,
        },
        "execution": {
            "providerExecuted": False,
            "providerResultObserved": False,
        },
    }
    args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
    args.metadata_out.write_text(
        json.dumps(metadata, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
