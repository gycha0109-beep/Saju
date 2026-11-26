# FR291 — Visible philtrum neutral axes

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR291 freezes and materializes the FR282 product column:

```text
mouth.philtrum_length_width
```

as product-neutral observable morphology.

FR282 previously left this column at `partial_gap` because a neutral measurable axis had not been frozen.

## What FR291 does

FR291 accepts explicit visible semantic geometry for a central upper-mouth groove corridor:

- an unordered pair of visible central-groove axis endpoints;
- an unordered pair describing the visible corridor width;
- an upstream visibility admission;
- a same-capture canonical-asset attestation;
- pose-normalized face 2D coordinates.

It derives the visible mouth horizontal envelope from an issued FR79 lips geometry object and uses that width only as a scale-normalization reference.

## What FR291 does not do

FR291 does **not** create a raw-RGB philtrum detector or segmentation model.

The upstream observer that emits the explicit visible central-groove geometry remains a separate concern.

FR291 also does not:

- map MediaPipe/provider indices to philtrum anatomy;
- issue subnasale, labiale superius, crista philtri, or other named anatomical landmarks;
- infer hidden groove or ridge boundaries;
- claim physical anthropometry;
- claim millimeter-scale anatomy;
- issue traditional physiognomy semantics;
- issue thresholds, classifications, or calibration.

The canonical extractor is therefore materialized over governed semantic geometry, not over unreviewed raw-image heuristics.

## Neutral metric definitions

FR291 issues exactly two scale-invariant continuous axes:

```text
neutral.mouth.visible_central_groove.axis_length_to_mouth_width_ratio@0.1.0
neutral.mouth.visible_central_groove.corridor_width_to_mouth_width_ratio@0.1.0
```

Definitions:

1. Euclidean distance between the unordered visible central-groove axis endpoints divided by the FR79 visible lips horizontal envelope width.
2. Euclidean distance between the unordered visible corridor-width pair divided by the same FR79 visible lips horizontal envelope width.

Because both input pairs are unordered, swapping either pair cannot change the issued values.

## Same-capture boundary

The semantic geometry input carries the source canonical asset digest internally.

FR291 requires it to match the canonical asset digest on the FR79 lips geometry used to derive the mouth-width reference.

The canonical payload does not expose:

- canonical asset digest;
- provider run reference;
- source observation references;
- provider landmark indices;
- raw landmarks.

## Fail-closed behavior

FR291 returns unavailable rather than inventing a fallback when:

- the FR79 visible mouth horizontal span collapses;
- the visible central-groove axis collapses;
- the visible corridor-width pair collapses.

It rejects malformed authority input, cross-capture asset joins, non-finite coordinates, empty source references, and semantic geometry outside the FR79 visible-mouth horizontal envelope.

## Canonical payload effect

FR291 preserves the closed FR282 schema:

```text
FR282 feature keys                 = 29
represented payload keys           = 29
structurally missing keys          = 0
canonical extractors materialized  = 16
extractor / authority gaps         = 13
```

Only:

```text
mouth.philtrum_length_width
```

moves from the explicit `philtrum_extractor_not_materialized` gap to a materialized canonical extractor.

## Remaining gap classes

After FR291, the remaining 13 columns are not equivalent easy geometry closures.

They include:

- forehead segmentation / hairline image-model work;
- eyebrow product boundary-role authority and eyebrow appearance modeling;
- eyelid visible-category image modeling;
- RGB relative-3D nose projection validation;
- governed visible upper/lower lip fullness-role authority;
- controlled visible lip color modeling;
- ear visibility admission and visible-ear image modeling;
- currently unavailable ear thickness/attachment/canal authority;
- RGB relative-3D cheek prominence validation;
- RGB relative-3D lower-face/chin projection validation.

Those blockers must not be bypassed by relabeling existing landmarks or geometry.

Watchtower-Track: face-engine
