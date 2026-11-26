# FR103 — External-ear empirical candidate validation findings v1

## Scope

Issue: #1707

This note versions only de-identified conclusions from the first bounded real-capture / synthetic-occlusion operator pass through the pinned Florence-2 external-ear research runner.

No source photo, QA overlay, raw user-image polygon coordinates, or image digest is admitted to repository history.

## Runtime pin observed in the operator pass

- model: `microsoft/Florence-2-base`
- revision: `5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac`
- task: `<REFERRING_EXPRESSION_SEGMENTATION>`
- compatible Transformers surface used by the operator: `4.49.0`

The local runtime additionally required `einops` and `timm`; FR103 therefore pins those dependencies in the local-only requirements file.

## De-identified empirical findings

### Clear visible ear

Observed behavior:

- a clearly visible external ear produced a polygon that visually followed the external pinna boundary well enough to retain Florence-2 as a localization candidate;
- the same visible ear was returned for both `left external ear` and `right external ear` prompts;
- side-specific prompt wording therefore did not demonstrate reliable anatomical-side discrimination.

Disposition:

- retain Florence-2 for **side-neutral external-ear candidate localization**;
- do not grant model-side left/right semantics authority;
- defer anatomical side assignment to a later face-geometry / pose stage.

### Opposite-side clear visible ear

Observed behavior:

- the mirrored clear-ear case reproduced the same pattern;
- visible-ear localization remained useful;
- side-specific prompt separation again failed to produce a distinct opposite-side result.

Disposition:

- the side-neutral prompt policy is supported by repeated operator evidence rather than a single example.

### Synthetic partial occlusion

Observed behavior:

- candidate localization remained attached to the ear region under synthetic line occlusion;
- contour tracing stopped or degraded around the occluded portion rather than reliably reconstructing a complete external-ear contour.

Disposition:

- partial-occlusion localization remains feasible;
- contour completion across occlusion is **not** authorized;
- hidden ear shape must not be inferred from the returned candidate.

### Ear-shaped full occluder

Observed behavior:

- when the occluder approximately preserved an ear-like silhouette, Florence-2 still returned an ear-region candidate.

Disposition:

- this case is confounded by the shape of the synthetic occluder;
- it is retained only as an occluder-shape confound and not as evidence of true full-occlusion robustness.

### Rectangular full occlusion

Observed behavior:

- with the ear and surrounding area covered by a large non-ear-shaped rectangular mask, Florence-2 returned a structurally degenerate polygon;
- the returned polygon collapsed to a zero-height / zero-area line rather than a usable closed ear region;
- both diagnostic left/right prompts collapsed to the same degenerate result.

Disposition:

- exact structural degeneracy can be rejected without inventing a learned or numeric accuracy threshold;
- FR103 admits fail-closed rejection for:
  - zero bounding-box width;
  - zero bounding-box height;
  - zero polygon area;
- if no non-degenerate candidate remains, the effective result is `unavailable`.

### Frontal / no visible ear negative control

Observed behavior:

- when the external ears were effectively not visible, Florence-2 still produced a non-degenerate polygon over unrelated central facial regions.

Disposition:

- exact degeneracy rejection alone is insufficient;
- a later plausibility gate must consider candidate location relative to governed face geometry / pose;
- FR103 may record bbox, centroid, polygon area, and image-relative geometry, but does **not** authorize a numeric plausibility threshold or automatic ear-likeness classifier.

## FR103 implementation decision

The local runner is changed so that:

1. primary prompt = `external ear`;
2. side-specific prompts are diagnostic only;
3. polygon geometry metadata is recorded;
4. exact structural degeneracy is rejected fail-closed;
5. rejected-only outputs become `unavailable`;
6. no numeric plausibility threshold is introduced;
7. no user-image empirical artifacts are committed.

## Authority boundary

FR103 does not authorize:

- validated neutral runtime ear observation;
- anatomical side assignment from Florence-2 prompt semantics;
- reconstruction of occluded ear shape;
- numeric acceptance threshold;
- automatic plausibility classification;
- traditional binding;
- `採聽官`;
- `命門`;
- `貼肉` / `敦厚`;
- `色明`;
- `官成`;
- Production.

## Next gate

Re-run the bounded capture set through the **generic `external ear` prompt** and verify:

- clear visible ears remain non-degenerate candidates;
- rectangular full occlusion becomes `unavailable`;
- frontal/no-visible-ear hallucination remains observable as a non-degenerate but geometrically implausible candidate for the future governed plausibility gate.

Watchtower-Track: face-observation-engine
