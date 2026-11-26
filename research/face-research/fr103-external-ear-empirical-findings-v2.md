# FR103 — External-ear empirical candidate validation findings v2

## Status

This document **supersedes**
`research/face-research/fr103-external-ear-empirical-findings-v1.md`.

The v1 decision to make generic `external ear` the primary prompt was not retained after the bounded re-run.

Issue: #1707

No source photo, QA overlay, raw user-image polygon coordinates, or image digest is admitted to repository history.

## Runtime pin

- model: `microsoft/Florence-2-base`
- revision: `5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac`
- task: `<REFERRING_EXPRESSION_SEGMENTATION>`
- compatible Transformers surface observed by the operator: `4.49.0`

## Corrected empirical findings

### Side-specific prompts on a clearly visible ear

Observed behavior:

- `left external ear` and `right external ear` both localized the same clearly visible external-ear region with substantially cleaner ear-boundary tracing than the later generic-prompt run;
- the prompts did not demonstrate trustworthy anatomical left/right semantics;
- both prompt labels therefore remain localization probes only.

Disposition:

- restore the dual side-prompt pair as the primary empirical strategy;
- do not use prompt wording as anatomical laterality;
- record pairwise overlap / centroid evidence without automatically accepting consensus.

### Generic prompt on a clearly visible ear

Observed behavior:

- `external ear` returned a non-degenerate candidate;
- the candidate included the visible ear but leaked substantially into adjacent cheek / neck / lateral-face pixels;
- the generic prompt therefore degraded localization specificity relative to the prior side-prompt pair on the same bounded operator set.

Disposition:

- generic `external ear` is **not** the primary FR103 prompt;
- retain it only as a diagnostic comparison mode.

### Frontal / no-visible-ear negative control under generic prompt

Observed behavior:

- `external ear` returned a non-degenerate polygon despite the requested external ear not being visibly available;
- the returned region occupied unrelated central-face pixels;
- exact zero-area / zero-width / zero-height rejection therefore does not solve hallucination by itself.

Disposition:

- preserve exact-degeneracy rejection;
- require a future governed face-geometry / pose plausibility gate before any candidate may be treated as a visible external-ear observation.

### Rectangular full occlusion

Observed behavior:

- the fully occluded rectangular-mask case collapsed to an exact degenerate polygon;
- the FR103 exact-degeneracy gate correctly converted that output to `unavailable`.

Disposition:

- retain exact structural rejection for:
  - zero bbox width;
  - zero bbox height;
  - zero polygon area.

### Partial synthetic occlusion

Observed behavior:

- ear-region localization remained possible;
- contour tracing could stop or degrade at the occluder;
- hidden contour reconstruction was not demonstrated.

Disposition:

- candidate localization under partial occlusion remains empirical evidence only;
- do not infer hidden ear shape.

## Corrected FR103 implementation decision

The local runner now:

1. runs `left external ear` and `right external ear` by default;
2. marks both prompt-side labels non-authoritative for anatomical laterality;
3. applies the exact-degeneracy gate independently to each prompt;
4. writes a local pair summary when the dual-prompt mode is used;
5. records bbox overlap / IoU, centroid distance, and area-ratio evidence when exactly one non-degenerate candidate exists for each prompt;
6. does not define an automatic consensus threshold;
7. keeps generic `external ear` as diagnostic-only;
8. leaves face-geometry plausibility and anatomical laterality unimplemented;
9. keeps all user-image artifacts local.

## Pairwise evidence boundary

Pairwise similarity is evidence that two Florence probes localized similar image regions.

It is **not** authority to conclude:

- the region is actually an ear;
- the region is visibly usable;
- either prompt's left/right label is anatomically correct;
- a numeric overlap threshold is valid.

## Next gate

The next required implementation step is a governed face-geometry / pose plausibility gate that can distinguish:

- plausible lateral external-ear candidates;
- central-face hallucinations;
- crop / truncation failure;
- one-ear-visible vs two-ear-visible cases;
- laterality after mirror/orientation normalization.

The GNM-derived FR100 ear reference remains a neutral reference target only. It does not itself provide subject-photo ear observation or runtime laterality authority.

## Authority boundary

FR103 still does not authorize:

- validated neutral runtime ear observation;
- automatic dual-prompt consensus;
- anatomical laterality;
- reconstruction of occluded ear shape;
- numeric acceptance threshold;
- traditional binding;
- `採聽官`;
- `命門`;
- `貼肉` / `敦厚`;
- `色明`;
- `官成`;
- Production.

Watchtower-Track: face-observation-engine
