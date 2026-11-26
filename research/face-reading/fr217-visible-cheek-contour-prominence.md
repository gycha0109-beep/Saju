# FR217 — Visible cheek/mid-face contour prominence

Issue: #1065  
Stacked on: FR216 / PR #1064

## Decision

FR207 leaves `cheek_contour_prominence` as the remaining cheek/mid-face observable primitive after visible breadth.

FR217 operationalizes only the **2D visible side-contour component** of that idea. It does not reconstruct hidden zygomatic anatomy or 3D cheekbone projection.

## Reused geometry

FR217 consumes:

- issued FR77 canonical-aligned metric geometry;
- FR24 two closed eye cycles;
- same-run issued FR79 unordered lips geometry;
- the pinned FR211 FACE_OVAL selector.

The eye/lips references define the same eye-line to halfway-toward-mouth mid-face band family used by FR211.

## Metric

The FACE_OVAL selector is split at the pinned chin vertex into two top-to-chin side paths.

For each path:

1. retain the contiguous selector run inside the mid-face band;
2. require at least three points;
3. form a chord from the first to last retained point;
4. compute the maximum perpendicular deviation of interior contour points from that chord;
5. divide by full visible face width.

The two side values are consumed as an unordered pair. FR217 emits their sorted pair and mean.

Metric:

`neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0`

## Interpretation boundary

The metric is a visible frontal 2D contour-curvature/prominence candidate only.

It is not:

- zygion;
- bizygomatic breadth;
- 3D zygomatic projection;
- skeletal cheekbone prominence;
- anatomical side identity;
- a traditional 六府 or other physiognomy state.

## Fail closed

Unavailable is returned for collapsed eye/mouth references, collapsed face width, fewer than three band points on either side, disconnected selector runs, or collapsed side chords.

No interpolation, smoothing, calibration, threshold, or anatomy fallback is introduced.

## Authority

No classifier, traditional binding, Production activation, or Commerce activation is issued.
