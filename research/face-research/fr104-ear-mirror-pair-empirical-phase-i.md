# FR104 Phase I — First controlled mirror-pair empirical evidence admission

Issue: #1810

## Executed evidence

The Phase F browser harness was executed locally against its exact pinned public fixture.

Fixture:

- MediaPipe public test asset: `portrait.jpg`
- observed dimensions: 820 × 1024
- expected SHA-256:
  `a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e`
- observed SHA-256:
  `a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e`
- digest verification: PASS
- user image consumed: false
- camera accessed: false
- raw fixture persisted: false
- raw landmarks returned/persisted: false

Runtime:

- `@mediapipe/tasks-vision@0.10.35`
- existing FR26 WASM/model references
- runtime/model byte digests remain independently unverified

## Scalar result

Original:

```text
leftEyeCentroidX  = 0.5461522229015827
rightEyeCentroidX = 0.44472135603427887
```

Explicit horizontal mirror:

```text
leftEyeCentroidX  = 0.5557297803461552
rightEyeCentroidX = 0.4528836291283369
```

Recomputed reflection errors:

```text
same-label  = 0.2042770180851221
cross-label = 0.001415284350514412
```

Therefore, on this exact fixture:

```text
cross-label reflection relation is numerically closer
```

The Phase H intake recomputes the two errors from the four centroid values and recomputes the closer-pattern label before admitting the result.

## What this supports

For this exact pinned public fixture and exact runtime, the provider-labeled eye topology centroids after explicit horizontal reflection align much more closely under the **cross-label** correspondence than under the same-label correspondence.

This is a bounded empirical observation.

## What this does not support

One fixture is insufficient to establish:

- universal FaceLandmarker horizontal-mirror semantics;
- that provider `LEFT` / `RIGHT` labels are anatomical subject side;
- anatomical ear laterality;
- any numeric acceptance threshold;
- validated external-ear observation;
- traditional binding;
- Production.

No such authority is issued.

## Decision

Do **not** admit anatomical laterality from this result.

The next evidence gate is a controlled multi-fixture repetition using additional non-user public face fixtures whose provenance and digests can be independently pinned.

The repetition should preserve the exact same runtime, explicit horizontal reflection, scalar reduction, and no-raw-landmark boundary.

Fixture diversity should cover, where exact public witnesses permit:

- a different face identity / appearance;
- a different crop or framing;
- a modest pose difference.

No user photo is required for this next gate.

Watchtower-Track: face-observation-engine
