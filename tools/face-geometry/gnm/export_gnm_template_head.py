from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np

REQUIRED_ARRAYS = (
    "template_vertex_positions",
    "triangles",
    "vertex_groups",
    "vertex_group_names",
)
REQUIRED_PROVIDER_GROUPS = ("ears", "left", "right")
DERIVED_EAR_REGIONS = {
    "left_ear": ("ears", "left"),
    "right_ear": ("ears", "right"),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export the pinned neutral GNM Head template and provider-derived ear masks.")
    parser.add_argument("--npz", type=Path, required=True)
    parser.add_argument("--obj-out", type=Path, required=True)
    parser.add_argument("--regions-out", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path, required=True)
    return parser.parse_args()


def normalized_name(value: object) -> str:
    if isinstance(value, bytes):
        return value.decode("utf-8")
    if isinstance(value, np.bytes_):
        return bytes(value).decode("utf-8")
    return str(value)


def write_obj(path: Path, vertices: np.ndarray, triangles: np.ndarray) -> None:
    lines: list[str] = ["# Google GNM Head v3 neutral template; generated from pinned upstream NPZ"]
    lines.extend(f"v {float(x):.9f} {float(y):.9f} {float(z):.9f}" for x, y, z in vertices)
    lines.extend(
        f"f {int(a) + 1} {int(b) + 1} {int(c) + 1}"
        for a, b, c in triangles
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    args = parse_args()
    with np.load(args.npz, allow_pickle=False) as model:
        missing = [key for key in REQUIRED_ARRAYS if key not in model.files]
        if missing:
            raise ValueError(f"GNM required arrays missing: {missing}")

        vertices = np.asarray(model["template_vertex_positions"], dtype=np.float32)
        triangles = np.asarray(model["triangles"], dtype=np.int64)
        vertex_groups = np.asarray(model["vertex_groups"], dtype=np.float32)
        names = [normalized_name(value) for value in model["vertex_group_names"]]
        version = normalized_name(model["version"].item()) if "version" in model.files else "unknown"
        variant = normalized_name(model["variant"].item()) if "variant" in model.files else "unknown"

    if vertices.ndim != 2 or vertices.shape[1] != 3:
        raise ValueError(f"Unexpected template vertex shape: {vertices.shape}")
    if triangles.ndim != 2 or triangles.shape[1] != 3:
        raise ValueError(f"Unexpected triangle shape: {triangles.shape}")
    if vertex_groups.ndim != 2 or vertex_groups.shape[1] != vertices.shape[0]:
        raise ValueError(f"Unexpected vertex group shape: {vertex_groups.shape}")
    if vertex_groups.shape[0] != len(names):
        raise ValueError("GNM vertex group name count does not match group matrix")

    name_to_index = {name: index for index, name in enumerate(names)}
    missing_groups = [name for name in REQUIRED_PROVIDER_GROUPS if name not in name_to_index]
    if missing_groups:
        raise ValueError(f"GNM required provider groups missing: {missing_groups}; groups={names}")

    provider_masks = {
        name: vertex_groups[name_to_index[name]] > 0.5
        for name in REQUIRED_PROVIDER_GROUPS
    }
    ear_union = provider_masks["ears"]
    left_mask = np.logical_and(ear_union, provider_masks["left"])
    right_mask = np.logical_and(ear_union, provider_masks["right"])
    overlap = np.logical_and(left_mask, right_mask)
    covered = np.logical_or(left_mask, right_mask)

    if np.any(overlap):
        raise ValueError(f"Derived left/right ear masks overlap at {int(np.count_nonzero(overlap))} vertices")
    if int(np.count_nonzero(covered)) != int(np.count_nonzero(ear_union)):
        missing_count = int(np.count_nonzero(np.logical_and(ear_union, np.logical_not(covered))))
        raise ValueError(f"Derived left/right masks do not cover provider ears group; missing={missing_count}")

    derived_masks = {"left_ear": left_mask, "right_ear": right_mask}
    regions = []
    for region_id, source_groups in DERIVED_EAR_REGIONS.items():
        indices = np.flatnonzero(derived_masks[region_id]).astype(int).tolist()
        if not indices:
            raise ValueError(f"GNM derived ear region compiled empty: {region_id}")
        regions.append({
            "id": region_id,
            "derivedFromProviderGroups": list(source_groups),
            "threshold": 0.5,
            "vertexCount": len(indices),
            "indices": indices,
        })

    write_obj(args.obj_out, vertices, triangles)

    region_payload = {
        "schemaVersion": "face-geometry-gnm-provider-regions-v1",
        "assetId": "google-gnm-head-v3.0-fe31d4e",
        "status": "provider_surface_ready",
        "vertexCount": int(vertices.shape[0]),
        "triangleCount": int(triangles.shape[0]),
        "providerEarVertexCount": int(np.count_nonzero(ear_union)),
        "regions": regions,
        "providerSemantics": True,
        "derivation": "ears intersect left/right provider masks",
        "productInterpretationIncluded": False,
    }
    args.regions_out.parent.mkdir(parents=True, exist_ok=True)
    args.regions_out.write_text(json.dumps(region_payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    metadata = {
        "schemaVersion": "face-geometry-gnm-export-v1",
        "assetId": region_payload["assetId"],
        "gnmVersion": version,
        "gnmVariant": variant,
        "vertexCount": int(vertices.shape[0]),
        "triangleCount": int(triangles.shape[0]),
        "vertexGroupCount": len(names),
        "vertexGroupNames": names,
        "providerEarVertexCount": region_payload["providerEarVertexCount"],
        "leftEarVertexCount": regions[0]["vertexCount"],
        "rightEarVertexCount": regions[1]["vertexCount"],
        "coordinateUnit": "meter",
        "runtimeGNMDependency": False,
    }
    args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
    args.metadata_out.write_text(json.dumps(metadata, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
