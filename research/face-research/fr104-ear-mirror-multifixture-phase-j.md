# FR104 Phase J — Controlled multi-fixture mirror repetition protocol

Issue: #1810

## Why Phase J exists

Phase I admitted one real controlled mirror result:

```text
portrait.jpg
same-label reflection error  = 0.2042770180851221
cross-label reflection error = 0.001415284350514412
closer pattern               = cross_label_reflection_closer
```

That is strong evidence for the exact fixture but is not enough to state a general FaceLandmarker mirror semantic.

Phase J therefore repeats the same bounded experiment across additional non-user public MediaPipe assets.

## Pinned candidate set

All assets are pinned through the exact MediaPipe v0.10.35 external-file manifest:

- release commit: `f8ef212d5c962c0e853db7e59d217056b187084b`
- manifest blob: `f52887c2586679e00c9b0ac10291abc14334e45a`

Fixtures:

1. `portrait.jpg`
   - baseline from Phase I;
   - exact FaceLandmarker test-image witness.

2. `portrait_small.jpg`
   - manifest-pinned public asset;
   - no FaceLandmarker suitability claim is made before execution.

3. `male_full_height_hands.jpg`
   - manifest-pinned public asset;
   - pinned HolisticLandmarker test uses the image and asserts non-empty face landmarks;
   - this does not prove the standalone FaceLandmarker will succeed.

4. `pose.jpg`
   - manifest-pinned public human pose test asset;
   - no FaceLandmarker suitability claim is made before execution.

## Fail-closed fixture screening

Each fixture is independently SHA-256 verified before inference.

For each original/mirror member, exactly one FaceLandmarker face is required.

If either member does not produce exactly one valid 478-point face result, that fixture becomes `unavailable_pair`.

Unavailable fixtures are not counterexamples to mirror semantics and are not coerced into scalar evidence.

## Scalar-only measurement

For successful fixtures the harness records only:

- provider-labeled left-eye centroid X;
- provider-labeled right-eye centroid X;
- mirrored equivalents;
- same-label reflection error;
- cross-label reflection error;
- closer pattern.

Raw landmarks are discarded immediately.

## Interpretation boundary

Even if every successful fixture produces the same closer pattern, Phase J does not automatically authorize a universal provider-semantics claim.

The result can support a stronger bounded reproducibility statement and can determine whether the project has enough evidence to propose a separately reviewed semantic mapping.

It still cannot establish anatomical side by itself.

## Local route

`/fr104-mirror-multi/`

The route:

- accepts no upload;
- opens no camera;
- stores no source image;
- stores no raw landmarks.

One button runs all four public fixtures sequentially and returns one scalar-only JSON document.

Watchtower-Track: face-observation-engine
