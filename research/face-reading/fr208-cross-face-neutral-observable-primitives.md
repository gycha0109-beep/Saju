# FR208 — Cross-face neutral observable primitive pack v1

Issue: #1019
Stacked on: FR207 / PR #1017

## Purpose

Implement small, reusable, provider-independent visible-geometry primitives across multiple face regions at once.

This is the first implementation step after FR206/FR207. It deliberately does not reopen region-by-region anatomy research.

## Implemented primitives

### Eye

`computeEyeOuterCornerTiltFR208`

- input: explicit visible inner/outer eye corners for both eyes;
- output: left, right, and bilateral mean tilt in degrees;
- sign convention: positive means the outer corner has greater canonical metric Y than the inner corner (+Y upward);
- no eye-shape category or traditional label is emitted.

### Eyebrow

`computeEyebrowVisibleCurveFR208`

- span / visible-face-width ratio;
- maximum visible arch amplitude / brow-span ratio;
- medial-to-lateral endpoint tilt in degrees;
- medial/lateral endpoints must be supplied explicitly;
- provider component order is not treated as anatomy.

### Mouth

`computeMouthCornerElevationFR208`

- left/right/mean visible corner elevation relative to an explicitly supplied visible mouth center;
- normalized by visible mouth width;
- no automatic interpretation as 角弓 or any other traditional criterion.

### Cheek / mid-face

`computeVisibleMidfaceWidthRatioFR208`

- visible mid-face horizontal width / supplied visible face width;
- intentionally named visible morphology;
- not zygion or skeletal bizygomatic breadth.

### Chin / lower face

`computeVisibleLowerFaceWidthRatioFR208`

- visible lower-face horizontal width / supplied visible face width;
- not a mandibular-bone width.

## Shared measurement boundary

Every output is continuous and carries:

- `classificationApplied=false`;
- `thresholdApplied=false`;
- `calibrationApplied=false`;
- `traditionalBindingApplied=false`;
- `anatomicalInterpretationAllowed=false`.

All calculations require `canonical_aligned_right_handed_metric_xy` and non-empty source observation references. This is the XY projection of the governed canonical-aligned right-handed metric geometry surface; +Y is treated as the upward metric direction.

## Fail-closed behavior

FR208 rejects:

- non-finite points;
- zero-width denominators;
- duplicate eyebrow curve points;
- region width exceeding the supplied visible face width;
- missing provenance refs.

It does not clamp, impute, invent epsilon denominators, or emit fallback categories.

## Migration parity boundary

`packages/face-reading/src/index.ts` remains byte-identical to the frozen migrated MyeongHa source. FR208 is added as a new module without modifying that frozen export surface.

## Not implemented here

- provider-specific mapping for new semantic endpoints;
- hairline / forehead segmentation;
- ear segmentation;
- eyelid crease / hooded-eye classifier;
- lip color classifier;
- traditional-criterion binding;
- thresholds / scores;
- Production or Commerce activation.

Those remain separate downstream steps. FR208 only supplies neutral visible measurements.
