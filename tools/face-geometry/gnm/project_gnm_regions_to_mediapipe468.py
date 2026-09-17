from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import numpy as np


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Project shared GNM provider regions onto MediaPipe 468 canonical topology.")
    parser.add_argument("--mediapipe-obj", type=Path, required=True)
    parser.add_argument("--gnm-npz", type=Path, required=True)
    parser.add_argument("--source-regions", type=Path, required=True)
    parser.add_argument(
        "--policy",
        type=Path,
        default=repo_root() / "packages/face-geometry/assets/bridge/gnm-to-mediapipe468-region-projection-v1.json",
    )
    parser.add_argument("--output", type=Path, required=True)
    return parser.parse_args()


def parse_obj_vertices(path: Path) -> np.ndarray:
    vertices: list[tuple[float, float, float]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
    if not vertices:
        raise ValueError(f"OBJ contains no vertices: {path}")
    return np.asarray(vertices, dtype=np.float64)


def robust_bounds(points: np.ndarray, low: float, high: float) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    lower = np.quantile(points, low, axis=0)
    upper = np.quantile(points, high, axis=0)
    span = upper - lower
    if np.any(span <= 0):
        raise ValueError(f"Degenerate robust bounds: lower={lower}, upper={upper}")
    center = (lower + upper) * 0.5
    return lower, upper, center, span


def stats(values: np.ndarray) -> dict[str, float]:
    if values.size == 0:
        return {"min": 0.0, "median": 0.0, "p95": 0.0, "max": 0.0}
    return {
        "min": float(np.min(values)),
        "median": float(np.median(values)),
        "p95": float(np.quantile(values, 0.95)),
        "max": float(np.max(values)),
    }


def strip_side(region_id: str) -> str:
    if region_id.startswith("left_"):
        return region_id[len("left_") :]
    if region_id.startswith("right_"):
        return region_id[len("right_") :]
    return region_id


def main() -> int:
    args = parse_args()
    policy: dict[str, Any] = json.loads(args.policy.read_text(encoding="utf-8"))
    source: dict[str, Any] = json.loads(args.source_regions.read_text(encoding="utf-8"))

    mp_cm = parse_obj_vertices(args.mediapipe_obj)
    expected_mp_count = int(policy["target"]["topologyVertexCount"])
    if mp_cm.shape != (expected_mp_count, 3):
        raise ValueError(f"Unexpected MediaPipe canonical vertex shape: {mp_cm.shape}")
    mp_m = mp_cm * float(policy["registration"]["mediapipeUnitConversionToMeter"])

    with np.load(args.gnm_npz, allow_pickle=False) as model:
        gnm_vertices = np.asarray(model["template_vertex_positions"], dtype=np.float64)

    if source["assetId"] != policy["source"]["assetId"]:
        raise ValueError("GNM source ontology asset does not match projection policy")

    source_regions = {region["id"]: region for region in source["regions"]}
    unsupported = set(policy["unsupportedOnMediaPipe468"])
    if unsupported != {"left_ear", "right_ear"}:
        raise ValueError(f"MESH5 policy must keep GNM ears unsupported on MediaPipe 468: {unsupported}")

    supported_source_ids = [region_id for region_id in source_regions if region_id not in unsupported]
    if not supported_source_ids:
        raise ValueError("No supported source regions available for projection")

    source_index_sets = {
        region_id: set(int(index) for index in source_regions[region_id]["indices"])
        for region_id in source_regions
    }
    target_indices = sorted(set().union(*(source_index_sets[region_id] for region_id in supported_source_ids)))
    target_index_array = np.asarray(target_indices, dtype=np.int64)
    target_vertices = gnm_vertices[target_index_array]

    low = float(policy["registration"]["sourceQuantileLow"])
    high = float(policy["registration"]["sourceQuantileHigh"])
    mp_low, mp_high, mp_center, mp_span = robust_bounds(mp_m, low, high)
    target_low, target_high, target_center, target_span = robust_bounds(target_vertices, low, high)
    axis_scale = target_span / mp_span
    if np.any(axis_scale <= 0):
        raise ValueError(f"Projection axis scales must remain positive: {axis_scale}")
    aligned_mp = (mp_m - mp_center) * axis_scale + target_center

    delta = aligned_mp[:, None, :] - target_vertices[None, :, :]
    distance_sq = np.einsum("ijk,ijk->ij", delta, delta)
    nearest_pool_positions = np.argmin(distance_sq, axis=1)
    nearest_gnm_indices = target_index_array[nearest_pool_positions]
    nearest_distances = np.sqrt(distance_sq[np.arange(expected_mp_count), nearest_pool_positions])

    source_priority = {region_id: int(source_regions[region_id]["renderPriority"]) for region_id in supported_source_ids}
    memberships: dict[int, list[str]] = {index: [] for index in target_indices}
    for region_id in supported_source_ids:
        for index in source_index_sets[region_id]:
            if index in memberships:
                memberships[index].append(region_id)

    adapter_id_by_source: dict[str, str] = {}
    axis_side_mapping = []
    bilateral_source_ids: set[str] = set()
    for pair in source["bilateralPairs"]:
        left_id = pair["left"]
        right_id = pair["right"]
        bilateral_source_ids.update((left_id, right_id))
        left_indices = np.asarray(sorted(source_index_sets[left_id]), dtype=np.int64)
        right_indices = np.asarray(sorted(source_index_sets[right_id]), dtype=np.int64)
        left_mean_x = float(np.mean(gnm_vertices[left_indices, 0]))
        right_mean_x = float(np.mean(gnm_vertices[right_indices, 0]))
        if abs(left_mean_x - right_mean_x) < 1e-8:
            raise ValueError(f"Cannot derive canonical X side for bilateral pair: {pair}")
        negative_source = left_id if left_mean_x < right_mean_x else right_id
        positive_source = right_id if negative_source == left_id else left_id
        base = strip_side(left_id)
        if strip_side(right_id) != base:
            raise ValueError(f"Bilateral pair base names differ: {pair}")
        adapter_id_by_source[negative_source] = f"{base}_negative_x"
        adapter_id_by_source[positive_source] = f"{base}_positive_x"
        axis_side_mapping.append({
            "negativeXSourceRegionId": negative_source,
            "positiveXSourceRegionId": positive_source,
            "negativeXAdapterRegionId": adapter_id_by_source[negative_source],
            "positiveXAdapterRegionId": adapter_id_by_source[positive_source],
            "leftProviderCentroidX": left_mean_x,
            "rightProviderCentroidX": right_mean_x,
            "semanticSideAuthorized": False,
        })

    for region_id in source_regions:
        if region_id not in bilateral_source_ids:
            adapter_id_by_source[region_id] = region_id

    assignments = []
    assigned_indices_by_source = {region_id: [] for region_id in supported_source_ids}
    distances_by_source = {region_id: [] for region_id in supported_source_ids}
    for mp_index, (gnm_index, distance) in enumerate(zip(nearest_gnm_indices.tolist(), nearest_distances.tolist(), strict=True)):
        candidates = memberships[int(gnm_index)]
        if not candidates:
            raise ValueError(f"Nearest GNM face-region vertex has no source membership: {gnm_index}")
        source_region_id = max(candidates, key=lambda region_id: (source_priority[region_id], region_id))
        adapter_region_id = adapter_id_by_source[source_region_id]
        assigned_indices_by_source[source_region_id].append(mp_index)
        distances_by_source[source_region_id].append(float(distance))
        assignments.append({
            "mediapipeIndex": mp_index,
            "nearestGNMVertexIndex": int(gnm_index),
            "projectionDistanceM": float(distance),
            "sourceRegionId": source_region_id,
            "adapterRegionId": adapter_region_id,
        })

    output_regions = []
    for source_region in source["regions"]:
        source_region_id = source_region["id"]
        adapter_region_id = adapter_id_by_source[source_region_id]
        if source_region_id in unsupported:
            output_regions.append({
                "adapterRegionId": adapter_region_id,
                "sourceRegionId": source_region_id,
                "status": "unsupported_on_mediapipe468",
                "reason": "core MediaPipe 468 canonical topology does not model the external ear pinna",
                "vertexCount": 0,
                "indices": [],
                "projectionDistanceM": None,
            })
            continue
        indices = assigned_indices_by_source[source_region_id]
        distances = np.asarray(distances_by_source[source_region_id], dtype=np.float64)
        output_regions.append({
            "adapterRegionId": adapter_region_id,
            "sourceRegionId": source_region_id,
            "status": "projected_authoring_candidate",
            "vertexCount": len(indices),
            "indices": indices,
            "projectionDistanceM": stats(distances),
        })

    supported_outputs = [region for region in output_regions if region["status"] == "projected_authoring_candidate"]
    empty_supported = [region["adapterRegionId"] for region in supported_outputs if region["vertexCount"] == 0]
    if empty_supported:
        raise ValueError(f"Supported GNM regions received no MediaPipe vertices: {empty_supported}")

    if set(index for region in supported_outputs for index in region["indices"]) != set(range(expected_mp_count)):
        raise ValueError("Projected supported regions must partition all MediaPipe 468 vertices")

    inspection_seeds = []
    for seed_index in (234, 454):
        assignment = assignments[seed_index]
        inspection_seeds.append({
            "mediapipeIndex": seed_index,
            "adapterRegionId": assignment["adapterRegionId"],
            "sourceRegionId": assignment["sourceRegionId"],
            "projectionDistanceM": assignment["projectionDistanceM"],
        })

    payload = {
        "schemaVersion": "face-geometry-mediapipe468-region-adapter-v1",
        "status": policy["status"],
        "sourceAssetId": source["assetId"],
        "targetAssetId": policy["target"]["assetId"],
        "targetVertexCount": expected_mp_count,
        "regionCount": len(output_regions),
        "supportedRegionCount": len(supported_outputs),
        "unsupportedRegionCount": len(output_regions) - len(supported_outputs),
        "registration": {
            "method": policy["registration"]["method"],
            "quantiles": [low, high],
            "preserveCanonicalAxisSigns": True,
            "mediapipeRobustBoundsM": {"low": mp_low.tolist(), "high": mp_high.tolist()},
            "gnmFaceRegionRobustBoundsM": {"low": target_low.tolist(), "high": target_high.tolist()},
            "axisScale": axis_scale.tolist(),
            "translationM": (target_center - mp_center * axis_scale).tolist(),
            "projectionDistanceM": stats(nearest_distances),
            "productionDistanceThreshold": None,
            "subjectSpecificFitting": False,
        },
        "assignment": {
            "method": policy["assignment"]["primaryRegionSelection"],
            "semanticSideAssignmentEncoded": False,
            "canonicalAxisSideMapping": axis_side_mapping,
        },
        "regions": output_regions,
        "vertexAssignments": assignments,
        "inspectionSeeds": inspection_seeds,
        "policy": policy["policy"],
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(json.dumps({
        "status": "pass",
        "targetVertexCount": expected_mp_count,
        "supportedRegionCount": payload["supportedRegionCount"],
        "unsupportedRegionCount": payload["unsupportedRegionCount"],
        "projectionDistanceM": payload["registration"]["projectionDistanceM"],
        "regionVertexCounts": {region["adapterRegionId"]: region["vertexCount"] for region in output_regions},
        "inspectionSeeds": inspection_seeds,
    }, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
