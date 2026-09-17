from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any


def repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Compile MyeongHa canonical physical-region rules into concrete MediaPipe vertex-index sets.")
    parser.add_argument("--obj", type=Path, required=True)
    parser.add_argument(
        "--spec",
        type=Path,
        default=repo_root() / "packages/face-reading/assets/canonical-face/myeongha-physical-regions-v0.1.json",
    )
    parser.add_argument("--output", type=Path, required=True)
    return parser.parse_args()


def parse_vertices(path: Path) -> list[tuple[float, float, float]]:
    vertices: list[tuple[float, float, float]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
    return vertices


def matches_rule(coordinate: tuple[float, float, float], rule: dict[str, float]) -> bool:
    x, y, z = coordinate
    values = {
        "xMin": x,
        "xMax": x,
        "absXMin": abs(x),
        "absXMax": abs(x),
        "yMin": y,
        "yMax": y,
        "zMin": z,
        "zMax": z,
    }
    for key, threshold in rule.items():
        if key not in values:
            raise ValueError(f"Unknown region rule key: {key}")
        value = values[key]
        if key.endswith("Min") and value < float(threshold):
            return False
        if key.endswith("Max") and value > float(threshold):
            return False
    return True


def quantize(coordinate: tuple[float, float, float]) -> tuple[float, float, float]:
    return tuple(round(value, 6) for value in coordinate)


def validate_bilateral_mirror(
    vertices: list[tuple[float, float, float]],
    compiled: dict[str, list[int]],
    pair: dict[str, str],
) -> None:
    negative_id = pair["negativeX"]
    positive_id = pair["positiveX"]
    negative_indices = compiled[negative_id]
    positive_indices = compiled[positive_id]

    if len(negative_indices) != len(positive_indices):
        raise ValueError(
            f"Bilateral count mismatch for {negative_id}/{positive_id}: "
            f"{len(negative_indices)} != {len(positive_indices)}"
        )

    positive_coordinates = {quantize(vertices[index]) for index in positive_indices}
    missing_mirrors = []
    for index in negative_indices:
        x, y, z = vertices[index]
        expected = quantize((-x, y, z))
        if expected not in positive_coordinates:
            missing_mirrors.append({"index": index, "expectedMirror": expected})

    if missing_mirrors:
        raise ValueError(
            f"Missing mirrored canonical coordinates for {negative_id}/{positive_id}: "
            f"{missing_mirrors[:5]}"
        )


def main() -> int:
    args = parse_args()
    spec: dict[str, Any] = json.loads(args.spec.read_text(encoding="utf-8"))
    vertices = parse_vertices(args.obj)

    if len(vertices) != 468:
        raise ValueError(f"Expected the pinned 468-vertex canonical mesh, got {len(vertices)}")

    regions = spec["regions"]
    region_ids = [region["id"] for region in regions]
    if len(region_ids) != len(set(region_ids)):
        raise ValueError("Region ids must be unique")

    compiled: dict[str, list[int]] = {}
    for region in regions:
        region_id = region["id"]
        indices = [index for index, coordinate in enumerate(vertices) if matches_rule(coordinate, region["rule"])]
        if not indices:
            raise ValueError(f"Region compiled to an empty vertex set: {region_id}")
        compiled[region_id] = indices

    for pair in spec["bilateralPairs"]:
        validate_bilateral_mirror(vertices, compiled, pair)

    for expectation in spec["seedExpectations"]:
        index = int(expectation["index"])
        region_id = expectation["mustBelongTo"]
        if index not in compiled[region_id]:
            raise ValueError(f"Seed {index} must belong to {region_id}")

    membership_counter: Counter[int] = Counter()
    for indices in compiled.values():
        membership_counter.update(indices)

    covered_vertices = sorted(membership_counter)
    overlap_vertices = sorted(index for index, count in membership_counter.items() if count > 1)

    output = {
        "schemaVersion": "mesh2-compiled-region-mask-v1",
        "assetId": spec["assetId"],
        "status": spec["status"],
        "vertexCount": len(vertices),
        "regionCount": len(regions),
        "sourceSpec": args.spec.name,
        "regions": [
            {
                "id": region["id"],
                "label": region["label"],
                "renderPriority": int(region["renderPriority"]),
                "displayColorRgba": region["displayColorRgba"],
                "vertexCount": len(compiled[region["id"]]),
                "indices": compiled[region["id"]],
            }
            for region in regions
        ],
        "coverage": {
            "coveredVertexCount": len(covered_vertices),
            "uncoveredVertexCount": len(vertices) - len(covered_vertices),
            "overlapVertexCount": len(overlap_vertices),
            "maxMembershipPerVertex": max(membership_counter.values(), default=0),
        },
        "policy": spec["policy"],
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    summary = {
        "status": "pass",
        "regionCounts": {region_id: len(indices) for region_id, indices in compiled.items()},
        "coverage": output["coverage"],
        "output": str(args.output.resolve()),
    }
    print(json.dumps(summary, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
