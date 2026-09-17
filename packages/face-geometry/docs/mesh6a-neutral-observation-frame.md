# MESH6A — Neutral Observation Frame and Capture-Quality Gate

MESH6A does not introduce another pose-normalization implementation. The reviewed FR77 runtime already emits 468 MediaPipe points in `canonical_aligned_right_handed_metric_3d` after the release-exact screen-to-metric and inverse-pose path. MESH6A consumes only an actively issued FR77 candidate and preserves its landmark array and pose-transform evidence by reference.

## Boundary

```text
MediaPipe observation
  -> FR77 governed metric geometry
  -> MESH6A neutral observation frame
     -> threshold-free diagnostics
     -> research-only weighted-region attachment
     -> morphology evaluation remains blocked
```

MESH6A computes only threshold-free diagnostics from the already aligned metric geometry:

- exact 468-point shape and finite XYZ verification;
- positive frame dimensions;
- XYZ bounds and spans in centimeters;
- metric centroid;
- RMS radius around the centroid;
- finite determinant of the linear 3x3 part of the preserved FR77 pose transform.

These values are diagnostics for calibration and QA. They are not capture-quality scores, frontal-pose thresholds, expression-neutrality decisions, occlusion decisions, anatomical measurements, beauty scores, or physiognomy interpretations.

## Existing authority reused

FR77 remains the authority for the governed metric geometry candidate. MESH6A explicitly records that FR77 pose normalization was **not reimplemented** and that canonical inverse-pose semantics are inherited from the issued FR77 object.

FR-DATA-05 remains raw pixel evidence only. Its intensity and neighbor-difference observations are not promoted into capture-quality authority here.

FR-DATA-12 remains an evaluation-readiness contract. Its blocked evaluation semantics are not promoted into runtime morphology authority here.

## Eligibility

MESH6A allows the MESH5.1 weighted region adapter to be attached for research inspection because the topology is the same 468-point MediaPipe surface. It does not authorize morphology metric evaluation.

The runtime remains fail-closed until later work establishes and validates:

- capture-quality thresholds;
- expression-neutrality validity;
- occlusion validity;
- repeated-capture stability;
- neutral morphology metric definitions and calibration.

No production morphology threshold is introduced in MESH6A.

## Persistence and claims

The observation-frame contract keeps the existing non-persistence boundary: raw source, raw provider response/depth, derived metric geometry, and biometric embeddings are not persisted by this layer.

MESH6A does not claim subject-specific 3D reconstruction, anatomical diagnosis, traditional semantic authority, morphology states, criterion states, or user-facing claims.
