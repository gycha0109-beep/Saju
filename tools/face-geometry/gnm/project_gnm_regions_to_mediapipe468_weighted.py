from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any

import numpy as np


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build a weighted, overlapping GNM-to-MediaPipe468 region adapter for offline authoring."
    )
    parser.add_argument("--mediapipe-obj", type=Path, required=True)
    parser.add_argument("--gnm-npz", type=Path, required=True)
    parser.add_argument("--source-regions", type=Path, required=True)
    parser.add_argument(
        "--policy",
        type=Path,
        default=repo_root()
        / "packages/face-geometry/assets/bridge/gnm-to-mediapipe468-weighted-region-projection-v2.json",
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


def derive_distance_cutoff(nearest_distances: np.ndarray, assignment_policy: dict[str, Any]) -> dict[str, float]:
    median = float(np.median(nearest_distances))
    mad = float(np.median(np.abs(nearest_distances - median)))
    robust_sigma = 1.4826 * mad
    multiplier = float(assignment_policy["outlierMadMultiplier"])
    mad_cutoff = median + multiplier * robust_sigma
    floor_quantile = float(assignment_policy["outlierCutoffFloorQuantile"])
    quantile_floor = float(np.quantile(nearest_distances, floor_quantile))
    cutoff = max(mad_cutoff, quantile_floor)
    return {
        "median": median,
        "mad": mad,
        "robustSigma": robust_sigma,
        "madMultiplier": multiplier,
        "quantileFloor": floor_quantile,
        "quantileFloorDistanceM": quantile_floor,
        "authoringOutlierCutoffM": cutoff,
    }


def main() -> int:
    args = parse_args()
    policy: dict[str, Any] = json.loads(args.policy.read_text(encoding="utf-8"))
    source: dict[str, Any] = json.loads(args.source_regions.read_text(encoding="utf-8"))
    assignment_policy = policy["assignment"]

    if assignment_policy["hardPartition"] is not False:
        raise ValueError("MESH5.1 weighted adapter must not use a hard partition")
    if assignment_policy["overlapAllowed"] is not True:
        raise ValueError("MESH5.1 weighted adapter must preserve overlap")
    if assignment_policy["unassignedAllowed"] is not True:
        raise ValueError("MESH5.1 weighted adapter must permit unassigned vertices")

    mp_cm = parse_obj_vertices(args.mediapipe_obj)
    expected_mp_count = int(policy["target"]["topologyVertexCount"])
    if mp_cm.shape != (expected_mp_count, 3):
        raise ValueError(f"Unexpected MediaPipe canonical vertex shape: {mp_cm.shape}")
    mp_m = mp_cm * float(policy["registration"]["mediapipeUnitConversionToMeter"])

    with np.load(args.gnm_npz, allow_pickle=False) as model:
        gnm_vertices = np.asarray(model["template_vertex_positions"], dtype=np.float64)

    if source["assetId"] != policy["source"]["assetId"]:
        raise ValueError("GNM source ontology asset does not match weighted projection policy")

    source_regions = {region["id"]: region for region in source["regions"]}
    source_region_order = [region["id"] for region in source["regions"]]
    unsupported = set(policy["unsupportedOnMediaPipe468"])
    if unsupported != {"left_ear", "right_ear"}:
        raise ValueError(f"MESH5.1 must keep external ears unsupported on core MediaPipe 468: {unsupported}")

    supported_source_ids = [region_id for region_id in source_region_order if region_id not in unsupported]
    source_index_sets = {
        region_id: set(int(index) for index in source_regions[region_id]["indices"])
        for region_id in source_region_order
    }
    target_indices = sorted(set().union(*(source_index_sets[region_id] for region_id in supported_source_ids)))
    target_index_array = np.asarray(target_indices, dtype=np.int64)
    target_vertices = gnm_vertices[target_index_array]

    provider_memberships: dict[int, list[str]] = {index: [] for index in target_indices}
    for region_id in supported_source_ids:
        for index in source_index_sets[region_id]:
            if index in provider_memberships:
                provider_memberships[index].append(region_id)
    if any(not memberships for memberships in provider_memberships.values()):
        raise ValueError("GNM provider-region union contains a vertex without region membership")

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

    neighborhood_count = min(int(assignment_policy["neighborhoodVertexCount"]), len(target_indices))
    if neighborhood_count < 2:
        raise ValueError("Weighted projection requires at least two GNM neighborhood vertices")
    neighborhood_positions = np.argpartition(distance_sq, kth=neighborhood_count - 1, axis=1)[:, :neighborhood_count]

    adapter_id_by_source: dict[str, str] = {}
    axis_side_mapping: list[dict[str, Any]] = []
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
        axis_side_mapping.append(
            {
                "negativeXSourceRegionId": negative_source,
                "positiveXSourceRegionId": positive_source,
                "negativeXAdapterRegionId": adapter_id_by_source[negative_source],
                "positiveXAdapterRegionId": adapter_id_by_source[positive_source],
                "leftProviderCentroidX": left_mean_x,
                "rightProviderCentroidX": right_mean_x,
                "semanticSideAuthorized": False,
            }
        )
    for region_id in source_region_order:
        if region_id not in bilateral_source_ids:
            adapter_id_by_source[region_id] = region_id

    distance_gate = derive_distance_cutoff(nearest_distances, assignment_policy)
    cutoff = float(distance_gate["authoringOutlierCutoffM"])
    retain_min = float(assignment_policy["minimumRetainedMembershipWeight"])
    max_memberships = int(assignment_policy["maximumRetainedMemberships"])
    core_min = float(assignment_policy["corePrimaryWeightMin"])
    core_margin_min = float(assignment_policy["corePrimaryMarginMin"])
    border_min = float(assignment_policy["borderPrimaryWeightMin"])

    vertex_memberships: list[dict[str, Any]] = []
    class_counts: Counter[str] = Counter()
    region_weighted_vertices: dict[str, list[dict[str, Any]]] = {region_id: [] for region_id in supported_source_ids}

    for mp_index in range(expected_mp_count):
        positions = neighborhood_positions[mp_index]
        local_distances = np.sqrt(distance_sq[mp_index, positions])
        order = np.argsort(local_distances)
        positions = positions[order]
        local_distances = local_distances[order]
        local_gnm_indices = target_index_array[positions]

        sigma = max(float(np.median(local_distances)), 1e-9)
        radial_weights = np.exp(-0.5 * np.square(local_distances / sigma))
        scores: dict[str, float] = {region_id: 0.0 for region_id in supported_source_ids}
        for gnm_index, radial_weight in zip(local_gnm_indices.tolist(), radial_weights.tolist(), strict=True):
            memberships = provider_memberships[int(gnm_index)]
            share = float(radial_weight) / len(memberships)
            for region_id in memberships:
                scores[region_id] += share

        total = sum(scores.values())
        if total <= 0:
            raise ValueError(f"Weighted neighborhood produced no region evidence at MediaPipe vertex {mp_index}")
        normalized = sorted(
            ((region_id, score / total) for region_id, score in scores.items() if score > 0),
            key=lambda item: (-item[1], adapter_id_by_source[item[0]]),
        )
        primary_source_id, primary_weight = normalized[0]
        secondary_weight = normalized[1][1] if len(normalized) > 1 else 0.0
        margin = primary_weight - secondary_weight
        retained = [item for item in normalized if item[1] >= retain_min][:max_memberships]
        if not retained:
            retained = [normalized[0]]

        nearest_distance = float(nearest_distances[mp_index])
        outlier = nearest_distance > cutoff
        if outlier:
            vertex_class = "unassigned"
            accepted_memberships: list[dict[str, Any]] = []
        else:
            if primary_weight >= core_min and margin >= core_margin_min:
                vertex_class = "core"
            elif primary_weight >= border_min:
                vertex_class = "border"
            else:
                vertex_class = "ambiguous"
            accepted_memberships = [
                {
                    "adapterRegionId": adapter_id_by_source[region_id],
                    "sourceRegionId": region_id,
                    "weight": float(weight),
                }
                for region_id, weight in retained
            ]
            for region_id, weight in retained:
                role = "overlap"
                if region_id == primary_source_id:
                    role = vertex_class
                region_weighted_vertices[region_id].append(
                    {
                        "mediapipeIndex": mp_index,
                        "weight": float(weight),
                        "role": role,
                    }
                )

        class_counts[vertex_class] += 1
        diagnostic_memberships = [
            {
                "adapterRegionId": adapter_id_by_source[region_id],
                "sourceRegionId": region_id,
                "weight": float(weight),
            }
            for region_id, weight in retained
        ]
        vertex_memberships.append(
            {
                "mediapipeIndex": mp_index,
                "status": vertex_class,
                "nearestGNMVertexIndex": int(nearest_gnm_indices[mp_index]),
                "projectionDistanceM": nearest_distance,
                "primaryAdapterRegionId": None if outlier else adapter_id_by_source[primary_source_id],
                "primarySourceRegionId": None if outlier else primary_source_id,
                "primaryWeight": float(primary_weight),
                "secondaryWeight": float(secondary_weight),
                "primaryMargin": float(margin),
                "memberships": accepted_memberships,
                "diagnosticMemberships": diagnostic_memberships,
            }
        )

    output_regions: list[dict[str, Any]] = []
    for source_region in source["regions"]:
        source_region_id = source_region["id"]
        adapter_region_id = adapter_id_by_source[source_region_id]
        if source_region_id in unsupported:
            output_regions.append(
                {
                    "adapterRegionId": adapter_region_id,
                    "sourceRegionId": source_region_id,
                    "status": "unsupported_on_mediapipe468",
                    "reason": "core MediaPipe 468 canonical topology does not model the external ear pinna",
                    "vertexCount": 0,
                    "weightedVertices": [],
                }
            )
            continue
        weighted_vertices = sorted(
            region_weighted_vertices[source_region_id], key=lambda item: item["mediapipeIndex"]
        )
        core_count = sum(1 for item in weighted_vertices if item["role"] == "core")
        border_count = sum(1 for item in weighted_vertices if item["role"] == "border")
        ambiguous_count = sum(1 for item in weighted_vertices if item["role"] == "ambiguous")
        overlap_count = sum(1 for item in weighted_vertices if item["role"] == "overlap")
        output_regions.append(
            {
                "adapterRegionId": adapter_region_id,
                "sourceRegionId": source_region_id,
                "status": "weighted_projected_authoring_candidate",
                "vertexCount": len(weighted_vertices),
                "coreVertexCount": core_count,
                "borderVertexCount": border_count,
                "ambiguousVertexCount": ambiguous_count,
                "overlapVertexCount": overlap_count,
                "weightedVertices": weighted_vertices,
            }
        )

    supported_outputs = [region for region in output_regions if region["status"] == "weighted_projected_authoring_candidate"]
    empty_supported = [region["adapterRegionId"] for region in supported_outputs if region["vertexCount"] == 0]
    if empty_supported:
        raise ValueError(f"Supported GNM regions received no weighted MediaPipe membership: {empty_supported}")

    assigned_vertices = [item for item in vertex_memberships if item["status"] != "unassigned"]
    overlap_vertex_count = sum(1 for item in assigned_vertices if len(item["memberships"]) > 1)
    membership_edge_count = sum(len(item["memberships"]) for item in assigned_vertices)

    inspection_seeds = []
    for seed_index in (234, 454):
        item = vertex_memberships[seed_index]
        inspection_seeds.append(
            {
                "mediapipeIndex": seed_index,
                "status": item["status"],
                "primaryAdapterRegionId": item["primaryAdapterRegionId"],
                "primarySourceRegionId": item["primarySourceRegionId"],
                "primaryWeight": item["primaryWeight"],
                "projectionDistanceM": item["projectionDistanceM"],
                "memberships": item["memberships"],
            }
        )

    payload = {
        "schemaVersion": "face-geometry-mediapipe468-weighted-region-adapter-v2",
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
            "authoringDistanceGate": distance_gate,
            "productionDistanceThreshold": None,
            "subjectSpecificFitting": False,
        },
        "assignment": {
            "method": "local_distance_weighted_provider_membership_vote_v2",
            "hardPartition": False,
            "overlapAllowed": True,
            "unassignedAllowed": True,
            "neighborhoodVertexCount": neighborhood_count,
            "maximumRetainedMemberships": max_memberships,
            "minimumRetainedMembershipWeight": retain_min,
            "corePrimaryWeightMin": core_min,
            "corePrimaryMarginMin": core_margin_min,
            "borderPrimaryWeightMin": border_min,
            "semanticSideAssignmentEncoded": False,
            "canonicalAxisSideMapping": axis_side_mapping,
        },
        "coverage": {
            "classCounts": dict(sorted(class_counts.items())),
            "assignedVertexCount": len(assigned_vertices),
            "unassignedVertexCount": class_counts["unassigned"],
            "overlapVertexCount": overlap_vertex_count,
            "membershipEdgeCount": membership_edge_count,
        },
        "regions": output_regions,
        "vertexMemberships": vertex_memberships,
        "inspectionSeeds": inspection_seeds,
        "policy": policy["policy"],
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(
        json.dumps(
            {
                "status": "pass",
                "targetVertexCount": expected_mp_count,
                "supportedRegionCount": payload["supportedRegionCount"],
                "unsupportedRegionCount": payload["unsupportedRegionCount"],
                "projectionDistanceM": payload["registration"]["projectionDistanceM"],
                "authoringDistanceGate": distance_gate,
                "coverage": payload["coverage"],
                "regionVertexCounts": {
                    region["adapterRegionId"]: region["vertexCount"] for region in output_regions
                },
                "inspectionSeeds": inspection_seeds,
            },
            sort_keys=True,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
