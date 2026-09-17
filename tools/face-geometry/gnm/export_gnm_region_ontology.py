from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import numpy as np


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export the shared GNM provider-region ontology as deterministic vertex masks.")
    parser.add_argument("--npz", type=Path, required=True)
    parser.add_argument(
        "--catalog",
        type=Path,
        default=repo_root() / "packages/face-geometry/assets/regions/gnm-provider-region-ontology-v1.json",
    )
    parser.add_argument("--output", type=Path, required=True)
    return parser.parse_args()


def normalized_name(value: object) -> str:
    if isinstance(value, bytes):
        return value.decode("utf-8")
    if isinstance(value, np.bytes_):
        return bytes(value).decode("utf-8")
    return str(value)


def source_mask(source: dict[str, Any], provider_masks: dict[str, np.ndarray]) -> np.ndarray:
    kind = source["kind"]
    if kind == "provider_vertex_group":
        return provider_masks[source["providerGroup"]].copy()
    if kind == "intersection":
        groups = source["providerGroups"]
        mask = provider_masks[groups[0]].copy()
        for group in groups[1:]:
            mask = np.logical_and(mask, provider_masks[group])
        return mask
    raise ValueError(f"Unsupported region source kind: {kind}")


def main() -> int:
    args = parse_args()
    catalog: dict[str, Any] = json.loads(args.catalog.read_text(encoding="utf-8"))
    threshold = float(catalog["threshold"])

    with np.load(args.npz, allow_pickle=False) as model:
        vertices = np.asarray(model["template_vertex_positions"], dtype=np.float32)
        groups = np.asarray(model["vertex_groups"], dtype=np.float32)
        names = [normalized_name(value) for value in model["vertex_group_names"]]
        mirror_indices = np.asarray(model["mirror_indices"], dtype=np.int64) if "mirror_indices" in model.files else None

    if groups.ndim != 2 or groups.shape[1] != vertices.shape[0]:
        raise ValueError(f"Unexpected GNM vertex group shape: {groups.shape}")
    if groups.shape[0] != len(names):
        raise ValueError("GNM vertex group name count does not match group matrix")

    name_to_index = {name: index for index, name in enumerate(names)}
    required_provider_groups: set[str] = set()
    for region in catalog["regions"]:
        source = region["source"]
        if source["kind"] == "provider_vertex_group":
            required_provider_groups.add(source["providerGroup"])
        elif source["kind"] == "intersection":
            required_provider_groups.update(source["providerGroups"])
        else:
            raise ValueError(f"Unsupported source kind in catalog: {source['kind']}")

    missing = sorted(required_provider_groups - set(name_to_index))
    if missing:
        raise ValueError(f"GNM provider groups missing for shared ontology: {missing}")

    provider_masks = {
        name: groups[name_to_index[name]] > threshold
        for name in required_provider_groups
    }

    compiled: dict[str, np.ndarray] = {}
    regions_out = []
    region_ids = [region["id"] for region in catalog["regions"]]
    if len(region_ids) != len(set(region_ids)):
        raise ValueError("Shared ontology region ids must be unique")

    for region in catalog["regions"]:
        region_id = region["id"]
        mask = source_mask(region["source"], provider_masks)
        indices = np.flatnonzero(mask).astype(int).tolist()
        if not indices:
            raise ValueError(f"Shared ontology region compiled empty: {region_id}")
        compiled[region_id] = mask
        regions_out.append({
            "id": region_id,
            "label": region["label"],
            "renderPriority": int(region["renderPriority"]),
            "source": region["source"],
            "vertexCount": len(indices),
            "indices": indices,
        })

    ear_union = provider_masks["ears"]
    ear_covered = np.logical_or(compiled["left_ear"], compiled["right_ear"])
    ear_overlap = np.logical_and(compiled["left_ear"], compiled["right_ear"])
    if np.any(ear_overlap):
        raise ValueError("Derived shared left/right ear regions overlap")
    if not np.array_equal(ear_union, ear_covered):
        raise ValueError("Derived shared left/right ear regions must exactly cover provider ears")

    bilateral_stats = []
    for pair in catalog["bilateralPairs"]:
        left_id = pair["left"]
        right_id = pair["right"]
        if left_id not in compiled or right_id not in compiled:
            raise ValueError(f"Bilateral pair references unknown region: {pair}")
        left_indices = np.flatnonzero(compiled[left_id]).astype(int)
        right_indices = set(np.flatnonzero(compiled[right_id]).astype(int).tolist())
        mirror_ratio = None
        if mirror_indices is not None and len(left_indices):
            mirrored = {int(mirror_indices[index]) for index in left_indices}
            mirror_ratio = len(mirrored & right_indices) / len(mirrored)
        bilateral_stats.append({
            "left": left_id,
            "right": right_id,
            "leftVertexCount": int(len(left_indices)),
            "rightVertexCount": int(len(right_indices)),
            "providerMirrorOverlapRatio": mirror_ratio,
        })

    payload = {
        "schemaVersion": "face-geometry-gnm-compiled-region-ontology-v1",
        "assetId": catalog["assetId"],
        "status": catalog["status"],
        "vertexCount": int(vertices.shape[0]),
        "regionCount": len(regions_out),
        "providerGroupThreshold": threshold,
        "sourceCatalog": args.catalog.name,
        "regions": regions_out,
        "bilateralPairs": bilateral_stats,
        "policy": catalog["policy"],
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(json.dumps({
        "status": "pass",
        "assetId": payload["assetId"],
        "regionCount": payload["regionCount"],
        "vertexCount": payload["vertexCount"],
        "regionVertexCounts": {region["id"]: region["vertexCount"] for region in regions_out},
        "bilateralPairs": bilateral_stats,
    }, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
