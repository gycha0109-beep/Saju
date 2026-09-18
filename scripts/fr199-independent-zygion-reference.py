#!/usr/bin/env python3
import argparse
import json
import math
from pathlib import Path

METHOD_VERSION = "fr199-paper-pseudocode-reconstruction-v1"

def finite3(v):
    return isinstance(v, (list, tuple)) and len(v) == 3 and all(math.isfinite(float(x)) for x in v)

def load_obj_vertices(path):
    vertices = []
    with open(path, "r", encoding="utf-8", errors="strict") as fh:
        for line in fh:
            if not line.startswith("v "):
                continue
            parts = line.split()
            if len(parts) < 4:
                continue
            xyz = tuple(float(parts[i]) for i in (1, 2, 3))
            if not all(math.isfinite(x) for x in xyz):
                raise ValueError("non_finite_obj_vertex")
            vertices.append(xyz)
    if not vertices:
        raise ValueError("obj_has_no_vertices")
    return vertices

def load_features(path):
    with open(path, "r", encoding="utf-8") as fh:
        raw = json.load(fh)
    features = raw.get("features")
    if not isinstance(features, list):
        raise ValueError("metadata_features_missing")
    by_abbr = {}
    for item in features:
        if not isinstance(item, dict):
            continue
        abbr = item.get("abbrv")
        if not isinstance(abbr, str):
            continue
        xyz = (item.get("xVal"), item.get("yVal"), item.get("zVal"))
        if all(isinstance(x, (int, float)) and math.isfinite(float(x)) for x in xyz):
            by_abbr[abbr] = tuple(float(x) for x in xyz)
    return raw, by_abbr

def require(features, key):
    value = features.get(key)
    if not finite3(value):
        raise ValueError(f"required_landmark_missing:{key}")
    return tuple(float(x) for x in value)

def derive_reference(vertices, metadata, features, sample_id):
    # This is intentionally NOT byte/behavior-exact notebook execution.
    # It is a separately versioned reconstruction of the paper pseudocode:
    #   pronasale anchor -> zygomatic search region -> Q1/Q4 x/y ranking.
    # The reference process has no provider indices or provider output input.
    prn = require(features, "prn")
    mf_l = require(features, "mf_l")
    mf_r = require(features, "mf_r")
    al_l = require(features, "al_l")
    al_r = require(features, "al_r")
    t_l = require(features, "t_l")
    t_r = require(features, "t_r")

    # Dataset orientation witness: left is positive-x and right is negative-x
    # for the public synthetic corpus. Refuse to guess if that witness flips.
    if not (t_l[0] > prn[0] and t_r[0] < prn[0]):
        raise ValueError("unexpected_public_dataset_laterality_orientation")

    y_anchor = (mf_l[1] + mf_r[1]) / 2.0
    z_anchor = (mf_l[2] + mf_r[2]) / 2.0
    lateral_floor = max(abs(al_l[0] - prn[0]), abs(al_r[0] - prn[0])) + 18.0
    z_floor = z_anchor - 38.0
    z_ceiling = prn[2] + 18.0

    bands = (6.0, 10.0, 14.0, 18.0, 24.0, 32.0)
    selected = None
    audit = []
    for band in bands:
        left = [
            v for v in vertices
            if v[0] > prn[0] + lateral_floor
            and abs(v[1] - y_anchor) <= band
            and z_floor <= v[2] <= z_ceiling
        ]
        right = [
            v for v in vertices
            if v[0] < prn[0] - lateral_floor
            and abs(v[1] - y_anchor) <= band
            and z_floor <= v[2] <= z_ceiling
        ]
        audit.append({"bandMm": band, "leftCandidates": len(left), "rightCandidates": len(right)})
        if left and right:
            # Paper pseudocode uses quadrant-1 (x+y) and quadrant-4 (x-y)
            # ranking. We keep that geometry logic but version this as a
            # reconstruction because the public notebook has a known loop
            # control-flow quirk and is not silently repaired here.
            left_vertex = max(left, key=lambda v: (v[0] + v[1], v[0], -abs(v[1] - y_anchor)))
            right_vertex = min(right, key=lambda v: (v[0] - v[1], v[0], abs(v[1] - y_anchor)))
            selected = (band, left_vertex, right_vertex)
            break

    if selected is None:
        raise ValueError("bilateral_zygion_reference_not_found")

    band, left_vertex, right_vertex = selected
    if not (left_vertex[0] > prn[0] and right_vertex[0] < prn[0]):
        raise ValueError("bilateral_reference_orientation_invalid")

    return {
        "schemaVersion": "fr199-independent-zygion-reference-v1",
        "sampleId": sample_id,
        "authorityState": "independent_reference_candidate_only",
        "method": {
            "version": METHOD_VERSION,
            "sourceExact": False,
            "paperPseudocodeReconstruction": True,
            "providerCandidateVisible": False,
            "mediaPipeOutputConsumed": False,
            "publishedNotebookSilentlyRepaired": False,
        },
        "anchors": {
            "pronasale": list(prn),
            "midfaceYAnchorMm": y_anchor,
            "midfaceZAnchorMm": z_anchor,
            "lateralFloorMm": lateral_floor,
            "zFloorMm": z_floor,
            "zCeilingMm": z_ceiling,
        },
        "reference": {
            "left": list(left_vertex),
            "right": list(right_vertex),
            "selectedBandMm": band,
            "bizygomaticWidth3dMm": math.dist(left_vertex, right_vertex),
        },
        "searchAudit": audit,
        "sourceMetadata": {
            "threeDModel": metadata.get("threeDModel"),
            "gender": metadata.get("gender"),
            "age": metadata.get("age"),
        },
        "authorityBoundary": {
            "provider234IsZygion": False,
            "provider454IsZygion": False,
            "providerIndexAdmissionAuthorized": False,
            "thresholdAuthorized": False,
            "calibrationAuthorized": False,
            "productionActivationAuthorized": False,
            "commerceActivationAuthorized": False,
        },
    }

def self_test():
    features = {
        "prn": (0.0, 0.0, 100.0),
        "mf_l": (10.0, 20.0, 80.0),
        "mf_r": (-10.0, 20.0, 80.0),
        "al_l": (15.0, -5.0, 90.0),
        "al_r": (-15.0, -5.0, 90.0),
        "t_l": (75.0, 0.0, 0.0),
        "t_r": (-75.0, 0.0, 0.0),
    }
    vertices = [
        (40.0, 18.0, 75.0),
        (55.0, 20.0, 72.0),
        (52.0, 24.0, 74.0),
        (-40.0, 18.0, 75.0),
        (-56.0, 20.0, 72.0),
        (-52.0, 24.0, 74.0),
        (80.0, 20.0, 0.0),
        (-80.0, 20.0, 0.0),
    ]
    out = derive_reference(vertices, {"threeDModel": "self-test"}, features, "self-test")
    assert out["reference"]["left"][0] > 0
    assert out["reference"]["right"][0] < 0
    assert out["method"]["providerCandidateVisible"] is False
    assert out["authorityBoundary"]["providerIndexAdmissionAuthorized"] is False
    print(json.dumps({"ok": True, "method": METHOD_VERSION}, separators=(",", ":")))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--obj")
    ap.add_argument("--metadata")
    ap.add_argument("--sample-id")
    ap.add_argument("--output")
    ap.add_argument("--self-test", action="store_true")
    args = ap.parse_args()

    if args.self_test:
        self_test()
        return
    for name in ("obj", "metadata", "sample_id", "output"):
        if getattr(args, name) in (None, ""):
            raise SystemExit(f"missing --{name.replace('_','-')}")

    vertices = load_obj_vertices(args.obj)
    metadata, features = load_features(args.metadata)
    result = derive_reference(vertices, metadata, features, args.sample_id)
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.output).write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({
        "sampleId": args.sample_id,
        "method": METHOD_VERSION,
        "left": result["reference"]["left"],
        "right": result["reference"]["right"],
        "widthMm": result["reference"]["bizygomaticWidth3dMm"],
        "selectedBandMm": result["reference"]["selectedBandMm"],
    }, separators=(",", ":")))

if __name__ == "__main__":
    main()
