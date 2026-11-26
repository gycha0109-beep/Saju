# FR266 — Provider-Independent Nasal Apex Reference

Watchtower-Track: face-research

## Purpose

FR266 creates the first neutral vertical reference needed for the lower 麻衣 Three-Divisions slice without choosing a MediaPipe landmark index as truth.

The research pattern is the same one used elsewhere in MyeongHa:

1. define an independent source-backed reference;
2. freeze it before provider scoring;
3. later compare automated/provider candidates against that reference;
4. only then consider semantic admission.

## Research evidence

3D facial anthropometry repeatedly defines **pronasale** as the most protruded or most prominent midline point of the nasal tip/apex.

Reviewed references:

- PMCID: PMC5008732 — pronasale: most protruded point of the apex nasi.
- PMCID: PMC5051712 — pronasale: most prominent midline point on the nose tip.
- PMCID: PMC10172784 — pronasale: most protruded point of the nasal tip.
- PMCID: PMC10252224 — pronasale: most anteriorly protruded point of the apex nasi.

These sources support a provider-independent research annotation target.

They do **not** establish:

`pronasale == 準頭`

FR266 therefore calls the output a neutral **nasal apex** reference.

## Annotation protocol

The annotation must be expressed in:

`canonical_aligned_right_handed_metric_3d`

and must satisfy all of the following:

- provider output hidden;
- provider indices hidden;
- traditional labels hidden;
- annotation frozen before automated/provider scoring.

The annotation definition is:

`most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d`

## Projection

FR266 consumes the already merged FR265 coordinate-only projection authority.

The 3D annotation point is projected to:

`canonical_aligned_right_handed_metric_xy`

with FR265's rule:

`x2d=x3d; y2d=y3d`

The emitted reference is:

`neutral.face.nasal_apex.vertical_coordinate@0.1.0`

and its value is the projected canonical metric Y coordinate in centimeters.

## Boundaries

FR266 does not issue:

- automated nasal-apex extraction;
- MediaPipe nose-tip index;
- provider-index semantics;
- product-level pronasale identity;
- 準頭 equivalence;
- Three-Divisions span;
- threshold/calibration/classifier;
- F1/F6/fortune claim;
- Production or Commerce authority.

## Why this advances the lower vertical slice

FR260 already supplies a Dige-adjacent lower-face neutral candidate.

FR266 now supplies an independent, provider-blind nasal-apex vertical reference in the same canonical metric XY frame.

The next step is **not** to declare the lower span complete.

The next step is to generate automated neutral nasal-apex candidates and compare them against frozen FR266 annotations. Only a validated automated candidate may later enter a traditional 準頭 admission review.

## Next frontier

`evaluate_automated_neutral_nasal_apex_candidates_against_frozen_provider_independent_annotations_before_zhuntou_admission`
