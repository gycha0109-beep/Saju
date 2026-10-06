#!/usr/bin/env python3
"""
Local-only multi-signal visible-hairline candidate extractor.

This is engineering candidate evidence only. It does not issue FR305 admission,
a neutral runtime observation, traditional semantics, Three-Divisions spans,
Product/Production authority, or a biometric identity result.

Actual image mode lazily imports Pillow and NumPy. --self-check uses only the
Python standard library so normal CI never needs image/ML dependencies.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

SCHEMA_VERSION = "multisignal-visible-hairline-local-candidate-v1"
SAFE_RECEIPT_SCHEMA = "multisignal-visible-hairline-repo-safe-receipt-v1"
METHOD_ID = "adaptive_skin_edge_texture_continuity"
METHOD_VERSION = "0.2.0"

PREVIEW_STATES = (
    "visible_interface_candidate",
    "partially_visible_or_occluded",
    "no_visible_hairline_candidate",
    "unavailable",
)

# Engineering preview thresholds only. They do not confer authority.
PREVIEW_THRESHOLDS = {
    "visible_interface_min": 0.47,
    "visible_coverage_min": 0.28,
    "visible_continuity_min": 0.42,
    "partial_coverage_max": 0.26,
    "partial_continuity_max": 0.35,
    "no_hair_internal_above_skin_min": 0.40,
    "no_hair_internal_material_transition_max": 0.16,
    "no_hair_scalp_continuity_min": 0.50,
    "no_hair_outer_relative_path_max": -0.13,
    "no_hair_outer_interface_max": 0.48,
    "no_hair_outer_scalp_continuity_min": 0.55,
}

PRIVATE_KEYS = {
    "sourcePath",
    "sourceImageDigest",
    "sourceFileName",
    "boundaryPoints",
    "faceRoi",
    "rawSignals",
    "subjectId",
    "captureId",
    "overlayPath",
}


@dataclass(frozen=True)
class PreviewSignals:
    interface_evidence: float
    path_coverage: float
    path_continuity: float
    scalp_skin_continuity: float
    truncation_risk: float
    occlusion_risk: float
    above_skin_support: float
    material_transition: float
    relative_path_level: float
    face_basis_stable: bool


def _finite_unit(value: float, label: str) -> float:
    if not math.isfinite(value) or value < 0.0 or value > 1.0:
        raise ValueError(f"{label} must be finite in [0,1]")
    return value


def classify_preview(signals: PreviewSignals) -> str:
    """Conservative engineering preview only; human review remains required."""
    for name, value in (
        ("interface_evidence", signals.interface_evidence),
        ("path_coverage", signals.path_coverage),
        ("path_continuity", signals.path_continuity),
        ("scalp_skin_continuity", signals.scalp_skin_continuity),
        ("truncation_risk", signals.truncation_risk),
        ("occlusion_risk", signals.occlusion_risk),
        ("above_skin_support", signals.above_skin_support),
        ("material_transition", signals.material_transition),
    ):
        _finite_unit(value, name)

    if not math.isfinite(signals.relative_path_level):
        raise ValueError("relative_path_level must be finite")
    if not isinstance(signals.face_basis_stable, bool):
        raise ValueError("face_basis_stable must be boolean")

    if signals.truncation_risk >= 0.70:
        return "unavailable"

    no_hair_internal_surface = (
        signals.above_skin_support
        >= PREVIEW_THRESHOLDS["no_hair_internal_above_skin_min"]
        and signals.material_transition
        <= PREVIEW_THRESHOLDS["no_hair_internal_material_transition_max"]
        and signals.scalp_skin_continuity
        >= PREVIEW_THRESHOLDS["no_hair_scalp_continuity_min"]
    )
    no_hair_outer_silhouette = (
        signals.relative_path_level
        <= PREVIEW_THRESHOLDS["no_hair_outer_relative_path_max"]
        and signals.scalp_skin_continuity
        >= PREVIEW_THRESHOLDS["no_hair_outer_scalp_continuity_min"]
        and signals.interface_evidence
        < PREVIEW_THRESHOLDS["no_hair_outer_interface_max"]
    )
    if no_hair_internal_surface or no_hair_outer_silhouette:
        return "no_visible_hairline_candidate"

    if not signals.face_basis_stable:
        return "partially_visible_or_occluded"

    if (
        signals.interface_evidence >= PREVIEW_THRESHOLDS["visible_interface_min"]
        and signals.path_coverage >= PREVIEW_THRESHOLDS["visible_coverage_min"]
        and signals.path_continuity >= PREVIEW_THRESHOLDS["visible_continuity_min"]
        and signals.occlusion_risk < 0.50
    ):
        return "visible_interface_candidate"

    if (
        signals.path_coverage < PREVIEW_THRESHOLDS["partial_coverage_max"]
        or signals.path_continuity < PREVIEW_THRESHOLDS["partial_continuity_max"]
        or signals.occlusion_risk >= 0.45
    ):
        return "partially_visible_or_occluded"

    return "unavailable"

def _safe_output_path(path: str) -> Path:
    absolute = Path(path).expanduser().resolve()
    cwd = Path.cwd().resolve()
    try:
        rel = absolute.relative_to(cwd)
    except ValueError:
        return absolute

    rel_text = rel.as_posix()
    if not (
        rel_text == ".cache/face-reading"
        or rel_text.startswith(".cache/face-reading/")
    ):
        raise ValueError("repository-local output must stay under .cache/face-reading/")
    return absolute


def _private_input_path(path: str | Path) -> Path:
    absolute = Path(path).expanduser().resolve()
    cwd = Path.cwd().resolve()
    try:
        rel = absolute.relative_to(cwd)
    except ValueError:
        return absolute

    rel_text = rel.as_posix()
    if not (
        rel_text == ".cache/face-reading"
        or rel_text.startswith(".cache/face-reading/")
    ):
        raise ValueError(
            "repository-local private input must stay under .cache/face-reading/"
        )
    return absolute


def _assert_safe_receipt(value: Any, path: str = "receipt") -> None:
    if value is None:
        return
    if isinstance(value, list):
        for index, child in enumerate(value):
            _assert_safe_receipt(child, f"{path}[{index}]")
        return
    if isinstance(value, dict):
        for key, child in value.items():
            if key in PRIVATE_KEYS:
                raise ValueError(f"private key in safe receipt: {path}.{key}")
            _assert_safe_receipt(child, f"{path}.{key}")
        return
    if isinstance(value, float) and not math.isfinite(value):
        raise ValueError(f"non-finite number in safe receipt: {path}")
    if isinstance(value, str):
        if value.startswith("sha256:") and len(value) == 71:
            raise ValueError(f"digest in safe receipt: {path}")


def _box_mean(arr: Any, radius: int) -> Any:
    import numpy as np

    h, w = arr.shape
    padded = np.pad(arr, ((radius, radius), (radius, radius)), mode="reflect")
    integral = np.pad(padded, ((1, 0), (1, 0)), mode="constant")
    integral = integral.cumsum(axis=0).cumsum(axis=1)
    y0 = np.arange(h)
    y1 = y0 + 2 * radius + 1
    x0 = np.arange(w)
    x1 = x0 + 2 * radius + 1
    out = (
        integral[y1[:, None], x1[None, :]]
        - integral[y0[:, None], x1[None, :]]
        - integral[y1[:, None], x0[None, :]]
        + integral[y0[:, None], x0[None, :]]
    )
    return out / float((2 * radius + 1) ** 2)


def _robust_scale(values: Any, floor: float) -> tuple[float, float]:
    import numpy as np

    median = float(np.median(values))
    mad = float(np.median(np.abs(values - median))) * 1.4826
    return median, max(mad, floor)


def _normalize01(arr: Any, lo: float, hi: float) -> Any:
    import numpy as np

    if hi <= lo:
        return np.zeros_like(arr, dtype=np.float32)
    return np.clip((arr - lo) / (hi - lo), 0.0, 1.0)


def _candidate_path(score: Any, continuity_penalty: float = 0.14) -> tuple[Any, Any]:
    """Dynamic-programming horizontal path through an x-by-y score field."""
    import numpy as np

    h, w = score.shape
    dp = np.full((h, w), -1e18, dtype=np.float64)
    back = np.full((h, w), -1, dtype=np.int32)
    dp[:, 0] = score[:, 0]

    max_jump = max(2, int(round(h * 0.08)))
    for x in range(1, w):
        for y in range(h):
            y0 = max(0, y - max_jump)
            y1 = min(h, y + max_jump + 1)
            prev_ys = np.arange(y0, y1)
            candidates = dp[y0:y1, x - 1] - continuity_penalty * np.abs(prev_ys - y)
            idx = int(np.argmax(candidates))
            prev_y = int(prev_ys[idx])
            dp[y, x] = float(score[y, x]) + float(candidates[idx])
            back[y, x] = prev_y

    end_y = int(np.argmax(dp[:, -1]))
    path = np.zeros(w, dtype=np.int32)
    path[-1] = end_y
    for x in range(w - 1, 0, -1):
        path[x - 1] = back[path[x], x]

    path_scores = score[path, np.arange(w)]
    return path, path_scores


def _extract_record(image_path: Path, record: dict[str, Any], output_dir: Path) -> dict[str, Any]:
    try:
        import cv2
        import numpy as np
        from PIL import Image, ImageDraw
    except ImportError as error:
        raise RuntimeError(
            "actual image mode requires OpenCV, Pillow and NumPy; "
            "install them locally before running"
        ) from error

    image = Image.open(image_path).convert("RGB")
    rgb_u8 = np.asarray(image)
    rgb = rgb_u8.astype(np.float32)
    height, width, _ = rgb.shape
    gray = cv2.cvtColor(rgb_u8, cv2.COLOR_RGB2GRAY)

    roi = record.get("faceRoi")
    if roi is None:
        face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )
        min_side = max(45, min(width, height) // 10)
        faces = face_cascade.detectMultiScale(
            gray,
            1.08,
            5,
            minSize=(min_side, min_side),
        )
        if len(faces) > 0:
            image_cx = width / 2.0
            image_cy = height / 2.0
            ranked = []
            for fx, fy, fw, fh in faces:
                area = float(fw * fh)
                distance = (
                    ((fx + fw / 2.0 - image_cx) / max(1.0, width)) ** 2
                    + ((fy + fh / 2.0 - image_cy) / max(1.0, height)) ** 2
                )
                ranked.append(
                    (
                        area * (1.0 - 0.5 * distance),
                        (int(fx), int(fy), int(fw), int(fh)),
                    )
                )
            x, y, w, h = max(ranked, key=lambda item: item[0])[1]
            roi_source = "opencv_haar_face"
        else:
            x = int(round(width * 0.18))
            y = int(round(height * 0.12))
            w = int(round(width * 0.64))
            h = int(round(height * 0.62))
            roi_source = "central_portrait_heuristic"
    else:
        if (
            not isinstance(roi, list)
            or len(roi) != 4
            or any(not isinstance(v, int) for v in roi)
        ):
            raise ValueError("faceRoi must be [x,y,w,h] integers")
        x, y, w, h = roi
        roi_source = "operator_local_roi"

    x = max(0, min(width - 2, x))
    y = max(0, min(height - 2, y))
    w = max(2, min(width - x, w))
    h = max(2, min(height - y, h))

    eye_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_eye.xml"
    )
    eye_roi = gray[y : y + int(round(h * 0.65)), x : x + w]
    raw_eyes = eye_cascade.detectMultiScale(
        eye_roi,
        1.08,
        5,
        minSize=(max(12, w // 12), max(10, h // 16)),
    )
    eye_candidates = []
    for ex, ey, ew, eh in raw_eyes:
        if ey + eh / 2.0 < h * 0.58 and ew < w * 0.42:
            eye_candidates.append(
                (x + int(ex), y + int(ey), int(ew), int(eh))
            )

    eye_pair = []
    best_pair_score = None
    for index, first in enumerate(eye_candidates):
        for second in eye_candidates[index + 1 :]:
            ax, ay, aw, ah = first
            bx, by, bw, bh = second
            separation = abs((ax + aw / 2.0) - (bx + bw / 2.0))
            y_difference = abs((ay + ah / 2.0) - (by + bh / 2.0))
            if (
                separation < w * 0.18
                or separation > w * 0.78
                or y_difference > h * 0.18
            ):
                continue
            pair_score = separation - 2.0 * y_difference
            if best_pair_score is None or pair_score > best_pair_score:
                best_pair_score = pair_score
                eye_pair = [first, second]

    eye_top = min((eye[1] for eye in eye_pair), default=None)
    face_basis_stable = not (
        roi_source == "central_portrait_heuristic" and len(eye_pair) < 2
    )

    lab = cv2.cvtColor(rgb_u8, cv2.COLOR_RGB2LAB).astype(np.float32)
    lum, c1, c2 = cv2.split(lab)

    sample_patches = []
    for x_start, x_end in ((0.22, 0.43), (0.57, 0.78)):
        sx1 = max(0, x + int(round(w * x_start)))
        sx2 = min(width, x + int(round(w * x_end)))
        sy1 = max(0, y + int(round(h * 0.46)))
        sy2 = min(height, y + int(round(h * 0.64)))
        if sx2 > sx1 and sy2 > sy1:
            sample_patches.append(lab[sy1:sy2, sx1:sx2].reshape(-1, 3))

    if not sample_patches:
        sx1 = x + int(round(w * 0.32))
        sx2 = x + int(round(w * 0.68))
        sy1 = y + int(round(h * 0.45))
        sy2 = y + int(round(h * 0.65))
        sample_patches.append(lab[sy1:sy2, sx1:sx2].reshape(-1, 3))

    sample = np.concatenate(sample_patches, axis=0)
    ml, sl = _robust_scale(sample[:, 0], 10.0)
    mc1, sc1 = _robust_scale(sample[:, 1], 5.0)
    mc2, sc2 = _robust_scale(sample[:, 2], 5.0)

    rx1 = max(0, x + int(round(w * 0.08)))
    rx2 = min(width, x + int(round(w * 0.92)))
    ry1 = max(0, y - int(round(h * 0.18)))
    search_bottom = y + int(round(h * 0.40))
    if eye_top is not None:
        search_bottom = min(
            search_bottom,
            eye_top - int(round(h * 0.055)),
        )
    ry2 = min(height, max(ry1 + 18, search_bottom))
    if rx2 - rx1 < 8 or ry2 - ry1 < 8:
        raise ValueError("hairline search ROI too small")

    lum_roi = lum[ry1:ry2, rx1:rx2]
    c1_roi = c1[ry1:ry2, rx1:rx2]
    c2_roi = c2[ry1:ry2, rx1:rx2]

    z2 = (
        0.45 * ((lum_roi - ml) / sl) ** 2
        + ((c1_roi - mc1) / sc1) ** 2
        + ((c2_roi - mc2) / sc2) ** 2
    )
    skin_conf = np.exp(-0.5 * z2).astype(np.float32)

    # Vertical transition signals.
    grad_l = np.zeros_like(lum_roi, dtype=np.float32)
    grad_c = np.zeros_like(lum_roi, dtype=np.float32)
    grad_l[1:-1] = np.abs(lum_roi[2:] - lum_roi[:-2])
    grad_c[1:-1] = np.sqrt(
        (c1_roi[2:] - c1_roi[:-2]) ** 2
        + (c2_roi[2:] - c2_roi[:-2]) ** 2
    )

    # Local texture signal from luminance high-frequency residual.
    local_mean = _box_mean(lum_roi, 2)
    texture = np.abs(lum_roi - local_mean)
    texture_mean = _box_mean(texture, 2)

    skin_below = np.zeros_like(skin_conf)
    skin_above = np.zeros_like(skin_conf)
    texture_delta = np.zeros_like(texture_mean)
    shift = max(2, int(round(h * 0.025)))
    skin_below[:-shift] = skin_conf[shift:]
    skin_above[shift:] = skin_conf[:-shift]
    texture_delta[shift:-shift] = np.abs(
        texture_mean[2 * shift:] - texture_mean[:-2 * shift]
    )

    gl = _normalize01(grad_l, float(np.percentile(grad_l, 35)), float(np.percentile(grad_l, 95)))
    gc = _normalize01(grad_c, float(np.percentile(grad_c, 35)), float(np.percentile(grad_c, 95)))
    td = _normalize01(
        texture_delta,
        float(np.percentile(texture_delta, 35)),
        float(np.percentile(texture_delta, 95)),
    )
    transition = np.clip(skin_below - skin_above, 0.0, 1.0)

    # No hair-color category exists here. Weak color contrast may be compensated
    # by luminance edge or texture contrast.
    score = (
        0.31 * transition
        + 0.23 * gl
        + 0.15 * gc
        + 0.21 * td
        + 0.10 * skin_below
    )

    # Downweight side/background ambiguity without substituting a face-oval or
    # average-face hairline prior.
    x_axis = np.linspace(-1.0, 1.0, score.shape[1], dtype=np.float32)
    x_prior = (0.82 + 0.18 * np.exp(-((x_axis / 0.75) ** 4)))[None, :]
    score = score * x_prior

    # Avoid lower face. Search only above the central face sample / detected eyes.
    max_search_y = max(
        4,
        min(score.shape[0], y + int(round(h * 0.43)) - ry1),
    )
    score = score[:max_search_y, :]
    skin_conf = skin_conf[:max_search_y, :]
    skin_below = skin_below[:max_search_y, :]
    skin_above = skin_above[:max_search_y, :]
    texture_mean = texture_mean[:max_search_y, :]
    gl = gl[:max_search_y, :]
    gc = gc[:max_search_y, :]
    td = td[:max_search_y, :]
    path_y, path_scores = _candidate_path(
        score,
        continuity_penalty=0.095,
    )

    xs = np.arange(score.shape[1])
    global_x = xs + rx1
    global_y = path_y + ry1

    p_skin_below = skin_below[path_y, xs]
    p_skin_above = skin_above[path_y, xs]
    p_gl = gl[path_y, xs]
    p_gc = gc[path_y, xs]
    p_td = td[path_y, xs]

    color_contrast = float(np.mean(p_gc))
    luminance_contrast = float(np.mean(p_gl))
    texture_contrast = float(np.mean(p_td))
    edge_strength = float(np.mean(np.maximum(p_gl, p_gc)))
    skin_below_support = float(np.mean(p_skin_below))
    non_skin_above_support = float(np.mean(1.0 - p_skin_above))

    # Candidate-local material check. A visible interface should generally
    # transition from skin below to non-skin and/or different texture above.
    local_band = max(3, int(round(h * 0.035)))
    above_skin_values = []
    below_skin_values = []
    above_texture_values = []
    below_texture_values = []
    for column, path_row in enumerate(path_y.tolist()):
        above_start = max(0, path_row - local_band)
        above_end = max(0, path_row - 1)
        below_start = min(skin_conf.shape[0], path_row + 2)
        below_end = min(
            skin_conf.shape[0],
            path_row + local_band + 1,
        )
        if above_end > above_start and below_end > below_start:
            above_skin_values.append(
                float(
                    np.mean(
                        skin_conf[
                            above_start:above_end,
                            column,
                        ]
                    )
                )
            )
            below_skin_values.append(
                float(
                    np.mean(
                        skin_conf[
                            below_start:below_end,
                            column,
                        ]
                    )
                )
            )
            above_texture_values.append(
                float(
                    np.mean(
                        texture_mean[
                            above_start:above_end,
                            column,
                        ]
                    )
                )
            )
            below_texture_values.append(
                float(
                    np.mean(
                        texture_mean[
                            below_start:below_end,
                            column,
                        ]
                    )
                )
            )

    above_skin_support = (
        float(np.mean(above_skin_values))
        if above_skin_values
        else 0.0
    )
    below_skin_local_support = (
        float(np.mean(below_skin_values))
        if below_skin_values
        else 0.0
    )
    above_texture_mean = (
        float(np.mean(above_texture_values))
        if above_texture_values
        else 0.0
    )
    below_texture_mean = (
        float(np.mean(below_texture_values))
        if below_texture_values
        else 0.0
    )
    material_transition = float(
        np.clip(
            below_skin_local_support - above_skin_support,
            0.0,
            1.0,
        )
    )
    texture_ratio = float(
        above_texture_mean / max(1e-6, below_texture_mean)
    )

    dy = np.diff(global_y.astype(np.float32))
    dy_scale = max(1.0, float(h) * 0.025)
    path_continuity = float(
        math.exp(
            -float(np.median(np.abs(dy))) / dy_scale
        )
    )
    path_support = (
        (p_skin_below >= 0.22)
        & (np.maximum.reduce([p_gl, p_gc, p_td]) >= 0.28)
    )
    path_coverage = float(np.mean(path_support))

    interface_evidence = float(
        np.clip(
            0.16 * color_contrast
            + 0.23 * luminance_contrast
            + 0.22 * texture_contrast
            + 0.14 * edge_strength
            + 0.10 * skin_below_support
            + 0.07 * non_skin_above_support
            + 0.08 * material_transition,
            0.0,
            1.0,
        )
    )

    # No-visible-hairline evidence is an image-state check only. It is not a
    # medical, demographic, identity, or traditional-physiognomy inference.
    cx1 = max(0, int(round(score.shape[1] * 0.30)))
    cx2 = min(score.shape[1], int(round(score.shape[1] * 0.70)))
    scalp_y1 = max(0, y + int(round(h * 0.01)) - ry1)
    scalp_y2 = min(
        skin_conf.shape[0],
        y + int(round(h * 0.28)) - ry1,
    )
    if scalp_y2 <= scalp_y1 or cx2 <= cx1:
        scalp_skin_continuity = 0.0
    else:
        scalp_skin_continuity = float(
            np.mean(skin_conf[scalp_y1:scalp_y2, cx1:cx2])
        )

    frame_top_truncated = record.get("frameTopTruncated", False)
    if not isinstance(frame_top_truncated, bool):
        raise ValueError("frameTopTruncated must be boolean when supplied")
    truncation_risk = 1.0 if frame_top_truncated else 0.0

    central_path = global_y[
        int(len(global_y) * 0.25):
        int(len(global_y) * 0.75)
    ]
    central_level = (
        float(np.median(central_path))
        if len(central_path)
        else float(y)
    )
    relative_path_level = float(
        (central_level - y) / max(1.0, float(h))
    )
    low_path = np.clip(
        (relative_path_level - 0.20) / 0.18,
        0.0,
        1.0,
    )
    occlusion_risk = float(
        np.clip(
            0.48 * (1.0 - path_continuity)
            + 0.52 * low_path,
            0.0,
            1.0,
        )
    )

    preview_signals = PreviewSignals(
        interface_evidence=interface_evidence,
        path_coverage=path_coverage,
        path_continuity=path_continuity,
        scalp_skin_continuity=scalp_skin_continuity,
        truncation_risk=float(truncation_risk),
        occlusion_risk=occlusion_risk,
        above_skin_support=above_skin_support,
        material_transition=material_transition,
        relative_path_level=relative_path_level,
        face_basis_stable=face_basis_stable,
    )
    preview_state = classify_preview(preview_signals)

    record_dir = output_dir / str(record["recordId"])
    record_dir.mkdir(parents=True, exist_ok=True)

    digest = hashlib.sha256(image_path.read_bytes()).hexdigest()
    detailed = {
        "schemaVersion": SCHEMA_VERSION,
        "method": {
            "id": METHOD_ID,
            "version": METHOD_VERSION,
            "hairColorClassificationApplied": False,
            "demographicInferenceApplied": False,
            "hiddenHairlineCompletionApplied": False,
            "faceOvalSubstitutionApplied": False,
            "meshTopSubstitutionApplied": False,
        },
        "recordId": str(record["recordId"]),
        "experimentTag": str(record.get("experimentTag", "unspecified")),
        "sourcePath": str(image_path),
        "sourceImageDigest": f"sha256:{digest}",
        "faceRoi": [x, y, w, h],
        "faceRoiSource": roi_source,
        "boundaryPoints": [
            [int(px), int(py)] for px, py in zip(global_x.tolist(), global_y.tolist())
        ],
        "rawSignals": {
            "colorContrast": color_contrast,
            "luminanceContrast": luminance_contrast,
            "textureContrast": texture_contrast,
            "edgeStrength": edge_strength,
            "skinBelowSupport": skin_below_support,
            "nonSkinAboveSupport": non_skin_above_support,
            "interfaceEvidence": interface_evidence,
            "pathCoverage": path_coverage,
            "pathContinuity": path_continuity,
            "scalpSkinContinuity": scalp_skin_continuity,
            "aboveSkinSupport": above_skin_support,
            "belowSkinLocalSupport": below_skin_local_support,
            "materialTransition": material_transition,
            "textureRatio": texture_ratio,
            "relativePathLevel": relative_path_level,
            "faceBasisStable": face_basis_stable,
            "eyePairDetected": len(eye_pair) == 2,
            "truncationRisk": float(truncation_risk),
            "occlusionRisk": occlusion_risk,
        },
        "engineeringPreviewState": preview_state,
        "humanReviewRequired": True,
        "automaticAdmissionAuthorized": False,
        "neutralRuntimeHairlineObservationAuthorized": False,
    }
    (record_dir / "candidate.json").write_text(
        json.dumps(detailed, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    if record.get("qaOverlay", False):
        draw = ImageDraw.Draw(image)
        points = [
            (int(px), int(py))
            for px, py in zip(global_x.tolist(), global_y.tolist())
        ]
        if preview_state == "visible_interface_candidate" and len(points) >= 2:
            draw.line(
                points,
                fill=(255, 0, 0),
                width=max(2, width // 250),
            )
        elif (
            preview_state == "partially_visible_or_occluded"
            and len(points) >= 2
        ):
            draw.line(
                points,
                fill=(255, 165, 0),
                width=max(2, width // 250),
            )
        elif preview_state == "unavailable" and len(points) >= 2:
            draw.line(
                points,
                fill=(128, 128, 128),
                width=max(2, width // 250),
            )

        # For no-visible-hairline state, intentionally suppress the candidate
        # boundary so the QA image cannot be mistaken for an accepted line.
        draw.rectangle(
            [x, y, x + w, y + h],
            outline=(0, 255, 0),
            width=max(1, width // 350),
        )
        for eye_x, eye_y, eye_w, eye_h in eye_pair:
            draw.rectangle(
                [
                    eye_x,
                    eye_y,
                    eye_x + eye_w,
                    eye_y + eye_h,
                ],
                outline=(0, 160, 255),
                width=max(1, width // 500),
            )
        image.save(record_dir / "overlay.jpg", quality=92)

    return {
        "recordId": str(record["recordId"]),
        "experimentTag": str(record.get("experimentTag", "unspecified")),
        "engineeringPreviewState": preview_state,
        "signals": {
            "colorContrast": color_contrast,
            "luminanceContrast": luminance_contrast,
            "textureContrast": texture_contrast,
            "edgeStrength": edge_strength,
            "interfaceEvidence": interface_evidence,
            "pathCoverage": path_coverage,
            "pathContinuity": path_continuity,
            "scalpSkinContinuity": scalp_skin_continuity,
            "aboveSkinSupport": above_skin_support,
            "materialTransition": material_transition,
            "relativePathLevel": relative_path_level,
            "truncationRisk": float(truncation_risk),
            "occlusionRisk": occlusion_risk,
        },
        "humanReviewRequired": True,
        "automaticAdmissionAuthorized": False,
    }


def _iter_records(manifest: dict[str, Any]) -> Iterable[dict[str, Any]]:
    if manifest.get("schemaVersion") != "multisignal-visible-hairline-manifest-v1":
        raise ValueError("manifest schemaVersion mismatch")
    records = manifest.get("records")
    if not isinstance(records, list) or not records:
        raise ValueError("manifest records must be a non-empty array")
    seen: set[str] = set()
    for record in records:
        if not isinstance(record, dict):
            raise ValueError("manifest record must be an object")
        record_id = record.get("recordId")
        source_path = record.get("sourcePath")
        if not isinstance(record_id, str) or not record_id:
            raise ValueError("recordId must be a non-empty string")
        if record_id in seen:
            raise ValueError(f"duplicate recordId: {record_id}")
        seen.add(record_id)
        if not isinstance(source_path, str) or not source_path:
            raise ValueError(f"sourcePath required for {record_id}")
        if "demographicAttributes" in record:
            raise ValueError("demographicAttributes are not accepted")
        yield record


def _safe_receipt(results: list[dict[str, Any]]) -> dict[str, Any]:
    counts = {state: 0 for state in PREVIEW_STATES}
    for result in results:
        state = result["engineeringPreviewState"]
        counts[state] += 1

    signal_names = (
        "colorContrast",
        "luminanceContrast",
        "textureContrast",
        "edgeStrength",
        "interfaceEvidence",
        "pathCoverage",
        "pathContinuity",
        "scalpSkinContinuity",
        "aboveSkinSupport",
        "materialTransition",
        "relativePathLevel",
        "truncationRisk",
        "occlusionRisk",
    )
    means: dict[str, float] = {}
    for name in signal_names:
        values = [float(result["signals"][name]) for result in results]
        means[name] = sum(values) / len(values)

    receipt = {
        "schemaVersion": SAFE_RECEIPT_SCHEMA,
        "authorityState": "engineering_candidate_evidence_only",
        "methodId": METHOD_ID,
        "methodVersion": METHOD_VERSION,
        "captureCount": len(results),
        "previewStateCounts": counts,
        "meanSignalSummary": means,
        "hairColorClassificationApplied": False,
        "demographicAttributesCollectedOrInferred": False,
        "hiddenHairlineCompletionApplied": False,
        "sourceImagesPersistedToRepository": False,
        "rawBoundaryPersistedToRepository": False,
        "sourceDigestPersistedToRepository": False,
        "humanReviewRequired": True,
        "fr305AdmissionIssued": False,
        "neutralRuntimeHairlineObservationAuthorized": False,
        "traditionalBindingIssued": False,
        "threeDivisionsSpanExecutionReady": False,
        "productMaterialized": False,
        "productionActivated": False,
        "commerceActivated": False,
    }
    _assert_safe_receipt(receipt)
    return receipt


def run_actual(manifest_path: Path, output_path: Path) -> None:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    records = list(_iter_records(manifest))
    output_path.mkdir(parents=True, exist_ok=True)

    results: list[dict[str, Any]] = []
    for record in records:
        image_path = _private_input_path(record["sourcePath"])
        if not image_path.is_file():
            raise ValueError(f"source image not found for {record['recordId']}")
        results.append(_extract_record(image_path, record, output_path))

    private_summary = {
        "schemaVersion": "multisignal-visible-hairline-private-summary-v1",
        "captureCount": len(results),
        "results": results,
        "humanReviewRequired": True,
        "automaticAdmissionAuthorized": False,
    }
    (output_path / "private-summary.json").write_text(
        json.dumps(private_summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    receipt = _safe_receipt(results)
    (output_path / "repo-safe-receipt.json").write_text(
        json.dumps(receipt, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(
        json.dumps(
            {
                "schemaVersion": SAFE_RECEIPT_SCHEMA,
                "status": "candidate_execution_complete_human_review_required",
                "captureCount": len(results),
                "output": str(output_path),
                "sourceImagesPrinted": False,
                "rawBoundariesPrinted": False,
                "automaticAdmissionAuthorized": False,
            },
            ensure_ascii=False,
        )
    )


def self_check() -> None:
    visible = classify_preview(
        PreviewSignals(
            0.62,
            0.45,
            0.84,
            0.30,
            0.0,
            0.08,
            0.10,
            0.25,
            0.05,
            True,
        )
    )
    occluded = classify_preview(
        PreviewSignals(
            0.55,
            0.15,
            0.80,
            0.20,
            0.0,
            0.20,
            0.10,
            0.20,
            0.05,
            True,
        )
    )
    no_hair_internal = classify_preview(
        PreviewSignals(
            0.54,
            0.60,
            0.80,
            0.60,
            0.0,
            0.10,
            0.48,
            0.10,
            0.15,
            True,
        )
    )
    no_hair_outer = classify_preview(
        PreviewSignals(
            0.42,
            0.30,
            0.80,
            0.70,
            0.0,
            0.10,
            0.05,
            0.10,
            -0.18,
            True,
        )
    )
    unstable_basis = classify_preview(
        PreviewSignals(
            0.62,
            0.60,
            0.80,
            0.20,
            0.0,
            0.08,
            0.10,
            0.25,
            0.05,
            False,
        )
    )
    unavailable = classify_preview(
        PreviewSignals(
            0.70,
            0.90,
            0.90,
            0.12,
            0.95,
            0.02,
            0.10,
            0.30,
            0.02,
            True,
        )
    )
    if (
        visible != "visible_interface_candidate"
        or occluded != "partially_visible_or_occluded"
        or no_hair_internal != "no_visible_hairline_candidate"
        or no_hair_outer != "no_visible_hairline_candidate"
        or unstable_basis != "partially_visible_or_occluded"
        or unavailable != "unavailable"
    ):
        raise RuntimeError("preview-state synthetic self-check failed")

    receipt = _safe_receipt(
        [
            {
                "engineeringPreviewState": visible,
                "signals": {
                    "colorContrast": 0.5,
                    "luminanceContrast": 0.7,
                    "textureContrast": 0.8,
                    "edgeStrength": 0.7,
                    "interfaceEvidence": 0.62,
                    "pathCoverage": 0.45,
                    "pathContinuity": 0.84,
                    "scalpSkinContinuity": 0.30,
                    "aboveSkinSupport": 0.10,
                    "materialTransition": 0.25,
                    "relativePathLevel": 0.05,
                    "truncationRisk": 0.0,
                    "occlusionRisk": 0.08,
                },
            },
            {
                "engineeringPreviewState": no_hair_internal,
                "signals": {
                    "colorContrast": 0.1,
                    "luminanceContrast": 0.1,
                    "textureContrast": 0.1,
                    "edgeStrength": 0.1,
                    "interfaceEvidence": 0.54,
                    "pathCoverage": 0.60,
                    "pathContinuity": 0.80,
                    "scalpSkinContinuity": 0.60,
                    "aboveSkinSupport": 0.48,
                    "materialTransition": 0.10,
                    "relativePathLevel": 0.15,
                    "truncationRisk": 0.0,
                    "occlusionRisk": 0.10,
                },
            },
        ]
    )
    if receipt["captureCount"] != 2:
        raise RuntimeError("safe receipt capture count self-check failed")

    try:
        _assert_safe_receipt({"sourcePath": "/private/source.jpg"})
    except ValueError:
        pass
    else:
        raise RuntimeError("privacy guard failed to reject sourcePath")

    print(
        json.dumps(
            {
                "schemaVersion": "multisignal-visible-hairline-self-check-v2",
                "status": "self_check_pass",
                "previewStatesVerified": list(PREVIEW_STATES),
                "noHairInternalSurfaceCheck": True,
                "noHairOuterSilhouetteCheck": True,
                "unstableFaceBasisFailsClosed": True,
                "noVisibleHairlineOverlaySuppressesBoundary": True,
                "hairColorClassificationApplied": False,
                "demographicInferenceApplied": False,
                "hiddenHairlineCompletionApplied": False,
                "safeReceiptPrivacyGuard": True,
                "authorityPromoted": False,
            }
        )
    )

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest")
    parser.add_argument(
        "--output",
        default=".cache/face-reading/hairline-multisignal-candidate",
    )
    parser.add_argument("--self-check", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.self_check:
        self_check()
        return 0
    if not args.manifest:
        raise ValueError("--manifest is required unless --self-check is used")
    manifest_path = _private_input_path(args.manifest)
    if not manifest_path.is_file():
        raise ValueError("manifest file not found")
    output_path = _safe_output_path(args.output)
    run_actual(manifest_path, output_path)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(
            json.dumps(
                {
                    "schemaVersion": "multisignal-visible-hairline-error-v1",
                    "status": "error",
                    "error": str(error),
                    "privateInputEchoed": False,
                    "stackPrinted": False,
                    "authorityPromoted": False,
                }
            ),
            file=sys.stderr,
        )
        raise SystemExit(1)
