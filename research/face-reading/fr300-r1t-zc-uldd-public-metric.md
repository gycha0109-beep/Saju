# FR300-R1T-ZC — UL-DD public stereo metric qualification

Watchtower-Track: face-engine

## Decision

UL-DD remains a zero-cost-on-request candidate, but its publicly described left/right MP4 release is **not source-bound metric 3D authority for FR299**.

Current disposition:

```text
hold_zero_cost_technical_public_release_not_fr299_metric_authority
```

This is a hold, not a terminal rejection. A later exact capture-device calibration + exact release transform + artifact inspection could change the result.

## Public facts bound

The peer-reviewed data descriptor states that the face-facing 3D camera was a ZED 2. The recorded representation was approximately 40 GB per subject at 1344×376 and 60 fps in MP4. For public access the recording was split into separate left/right views and each view was resized to 440×370.

The same article states that participants were informed that collected data and video recordings would be released; only post-collection explicitly consented video releases were published; the protocol and release were approved under UL Lafayette IRB-22-038-IRI.

The Zenodo record's Research Use License permits bona fide research, including commercial R&D, subject to its agreement.

These facts resolve the existing basic rights/capture questions, but they do **not** resolve metric stereo calibration.

## Why "captured by ZED 2" is insufficient

Stereolabs documents that each stereo camera has a dedicated calibration file. That calibration carries per-eye intrinsics and the stereo transform; the baseline/translation is metric. Stereolabs also distinguishes raw and rectified calibration.

The current public UL-DD sources do not bind the release to:

```text
exact camera serial
exact factory calibration file
exact left/right intrinsics
exact stereo extrinsics / baseline
exact rectification state
exact split / resize / crop transform
```

Therefore a generic ZED 2 model specification cannot be substituted for the exact capture-device authority.

## Public resize is a geometric transform

The source capture is described as 1344×376 and the released eyes as 440×370 after splitting/resizing.

Even when the underlying stereo pair originated from one calibrated device, pixel coordinates after split/resize must be related back to the calibration domain by an exact transform. The public article does not source-bind that transform strongly enough for FR299.

No claim is made here that MP4 compression alone makes stereo reconstruction impossible. The blocker is narrower: the released pixels are not currently bound to the exact metric calibration and transform needed for an auditable reference.

## Extracted facial landmarks do not solve this

The published 68 facial landmarks are 136 x/y columns extracted from the IR video with Dlib. They are 2D observations, not ZED-derived metric 3D facial ground truth.

They cannot replace the FR299 independent 3D nose reference.

## Operational boundary

This track did not:

```text
request restricted dataset access
download participant video
contact the authors
spend money
promote UL-DD to FR299
promote FR300-R2
change Product 18/29
```

## Reopen conditions

UL-DD may be reconsidered only if all materially required authority becomes available:

1. exact capture-device calibration is source-bound;
2. exact public/released split-resize-crop-rectification transform is source-bound;
3. same-frame left/right correspondence is verified;
4. authorized artifact inspection confirms geometry was not transformed in a way that defeats the metric reference.

Until then:

```text
UL-DD = HOLD
FR299 eligible = 0
FR300-R2 eligible = 0
Product = 18/29
```

## Next frontier

Without new authorization, move to the remaining zero-cost path:

```text
AST-Face public-path qualification
OR
existing-hardware metric-reference feasibility
```

MINDS remains on the separate participant/data-use hold established by FR300-R1S-Q.
