# FR316 — Exact same-capture hairline image-to-metric registration contract

Status: registration evidence contract implemented; no real hairline metric mapping authority issued

Watchtower-Track: face-observation-engine

## Purpose

FR316 governs the final coordinate-frame blocker identified by FR315.

The source is the admitted FR305 visible-hairline observation:

- frame: `canonical_image_normalized_2d`
- unit: `normalized_ratio`

The target is the common frame selected by FR264/FR315:

- frame: `canonical_aligned_right_handed_metric_xy`
- unit: `centimeter`

FR316 does not itself compute or issue a subject-level metric hairline coordinate.

It only determines whether the exact same-capture registration evidence is strong enough to proceed to a later local mapping execution review.

## Predecessor

FR316 requires an available FR314 materialization result.

That guarantees:

- an actually admitted FR305 model path;
- an explicit visible-boundary observation;
- no hidden completion;
- no face-oval/top-mesh substitution;
- an exact source-image digest retained locally.

If FR314 is unavailable, FR316 remains unavailable for execution review.

## Exact same-capture binding

The registration evidence must bind:

- the exact RGB capture;
- the FR314 source-image digest;
- the exact metric-support artifact;
- the metric-support artifact to the same source-image digest;
- the exact same capture;
- the exact same session;
- an exact artifact-pair binding;
- the exact hairline-observation provenance.

Same subject, same session or temporal synchronization alone are not substitutes for exact artifact binding.

## Metric scale authority

The metric-support artifact must carry M3-equivalent scale authority:

- exact artifact bound to the scale evidence;
- canonical metric 3D or canonical metric XY frame;
- centimeter unit;
- canonical inverse-pose alignment bound;
- no unknown-scale fitting.

A metric-capable device or plausible geometry is not enough.

## Registration path A — exact calibrated surface registration

This path requires:

- exact camera intrinsics;
- exact RGB-to-metric extrinsics;
- exact released-image transform chain;
- exact image dimensions;
- normalized coordinate convention;
- metric-support surface binding;
- observed finite registration execution;
- explicit verification that the visible hairline boundary corresponds to the metric-support surface.

The final requirement is important: a calibrated face registration that does not actually support the visible hairline region does not authorize extrapolation into that region.

## Registration path B — independent correspondence registration

This path requires:

- source-independent correspondences;
- metric scale fixed before registration;
- fit and held-out correspondence sets;
- disjoint fit/held-out identities;
- held-out validation;
- preregistered acceptance criteria;
- passing acceptance criteria;
- finite registration output;
- the evaluated correspondence envelope to include the visible hairline support region;
- no extrapolation beyond the validated envelope.

FR316 intentionally does not prescribe one numeric threshold because the threshold must be preregistered for the actual registration method and evidence regime.

## Forbidden shortcuts

FR316 rejects:

- unrelated AST registration receipts used as authority;
- provider landmarks used as registration truth;
- face-box scale;
- face-oval scale;
- average-face-size scale;
- provider normalized landmarks relabeled as metric;
- unknown-scale fitting;
- a 2D homography promoted to metric depth truth;
- same-subject/same-session evidence without exact artifact binding;
- synthetic-only success promoted into real runtime authority.

## Privacy

The following stay local/private and must not be persisted publicly:

- source image;
- visible hairline boundary coordinates;
- source-image digest;
- raw correspondences;
- camera intrinsics/extrinsics;
- raw metric-support geometry;
- transformed subject-level hairline coordinate.

The repository-safe FR316 assessment exposes only boolean readiness state and the selected method.

## Dispositions

FR316 can return:

1. predecessor not ready;
2. same-capture binding incomplete;
3. metric-scale authority incomplete;
4. registration evidence incomplete;
5. hairline support region unverified;
6. eligible for local hairline metric mapping execution.

The last state is only permission to enter FR317 execution review.

It does not issue:

- a metric hairline coordinate;
- the image-to-metric bridge;
- common-frame completion;
- Three-Divisions spans;
- traditional bindings;
- Product materialization;
- Production or Commerce.

## Current repository state

No real FR313/FR314 hairline evidence exists yet.

Therefore:

- real same-capture registration evidence: false;
- hairline image-to-metric bridge: not issued;
- actual neutral-reference capability: 6 / 7;
- metric-frame-ready capability: 6 / 7;
- common frame complete: false;
- Three-Divisions span execution: false;
- Product: 18 / 29;
- traditional bindings: 0;
- Production / Commerce: false.

## Next

FR317 should exercise both FR316 registration paths with synthetic same-capture fixtures.

Synthetic success may validate the contract and execution code path, but it must not issue real hairline metric authority.
