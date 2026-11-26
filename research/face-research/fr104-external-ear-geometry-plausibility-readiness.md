# FR104 — External-ear geometry plausibility readiness

Issue: #1810

## Purpose

FR104 begins after the corrected FR103 dual-prompt empirical closeout.

The current problem is no longer whether Florence-2 can emit a polygon. The problem is whether a non-degenerate polygon is geometrically supportable as a visible external-ear candidate.

No source photo, QA overlay, raw user-image polygon coordinates, or private image digest is admitted to repository history.

## FR103 closeout trigger

The bounded local evidence established the following de-identified behaviors:

- clearly visible external ear: both side prompts can localize the same visible ear;
- opposite orientation: the same visible-ear localization behavior reproduces after the visible side changes;
- frontal / no visible ear: both probes can strongly agree on the same wrong central-face region;
- rectangular full occlusion: exact-degenerate rejection can correctly produce `unavailable`;
- partial synthetic occlusion: both probes can strongly agree on a non-zero near-line candidate aligned with the occluder boundary rather than the remaining visible pinna.

Therefore:

```text
pair agreement != ear validity
non-degenerate polygon != plausible ear
prompt side != anatomical laterality
```

## Existing governed assets

### FR62

`governed-neutral-geometry-fr62.ts`

Reusable pattern:

- canonical-image-normalized 2D region candidates;
- fail-closed provider-label-only pair semantics;
- anatomical laterality unresolved.

Not reusable as:

- an ear detector;
- anatomical left/right authority.

### FR68

`mediapipe-face-geometry-transform-semantics-fr68.ts`

Reusable authority:

- reviewed MediaPipe face-geometry transform direction and release provenance.

Boundary:

- do not directly apply the 4x4 transform to arbitrary image-normalized 2D geometry.

### FR76 / FR77

`mediapipe-screen-to-metric-reimplementation-parity-fr76.ts`
`governed-metric-geometry-runtime-fr77.ts`

Reusable authority:

- release-exact screen-to-metric implementation;
- 468 canonical-aligned metric 3D landmarks;
- 16-element pose transform;
- coordinate frame `canonical_aligned_right_handed_metric_3d`.

Decision:

FR104 must reuse this path rather than create an independent pose-normalization system.

### FR257

`observable-morphology-capture-geometry-attribution-fr257.ts`

Reusable descriptive scalars:

- lateral orientation;
- vertical orientation;
- relative rotation;
- in-plane lateral-axis orientation;
- pose uniform scale;
- normalized screen face-box width / height / area.

Boundary:

- descriptive only;
- no pose threshold;
- no pose classification;
- no correction formula.

### FR100

`neutral-ear-reference-target-fr100.ts`

Reusable authority:

- GNM provider-derived bilateral neutral external-ear reference target.

Boundary:

- subject-specific registration is not implemented;
- subject-photo ear observation is not supplied by FR100;
- GNM reference surfaces must not be auto-registered to a user ear.

### FR103

`neutral-ear-candidate-validation-fr103.ts`

Reusable authority:

- dual side prompts as non-authoritative localization probes;
- exact structural degeneracy rejection;
- descriptive pair metrics.

Boundary:

- pair similarity is not validated ear consensus;
- prompt side is not anatomical laterality;
- no numeric acceptance threshold.

## Remaining gaps

FR104 still needs governed contracts for:

1. canonical pixel orientation / EXIF provenance;
2. front-camera mirror provenance;
3. candidate shape plausibility evidence;
4. candidate → face-relative coordinate mapping;
5. lateral candidate plausibility;
6. visibility / crop / occlusion qualification;
7. anatomical laterality assignment;
8. prospective calibration before any numeric cutoff.

## Required pipeline

```text
Florence candidate polygon
→ exact structural validity
→ shape plausibility evidence
→ canonical orientation provenance
→ mirror provenance
→ existing FR76 / FR77 / FR257 pose geometry
→ face-relative lateral plausibility
→ visibility / crop / occlusion qualification
→ anatomical laterality only when supportable
→ neutral external-ear observation candidate
```

## Phase-A decision

This phase freezes the reuse map and authority boundary only.

It does **not** yet implement:

- a shape rejection threshold;
- a lateral-zone cutoff;
- anatomical laterality;
- a validated neutral ear observation;
- traditional binding;
- Production.

## Next gate

Define a role-free candidate-shape and face-relative evidence contract without numeric acceptance thresholds.

Candidate metrics may be researched, but no value from the small FR103 operator bundle is permitted to become a Production cutoff.

Watchtower-Track: face-observation-engine
