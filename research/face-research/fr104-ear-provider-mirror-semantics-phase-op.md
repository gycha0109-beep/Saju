# FR104 Phase O/P — Independent fixture admission and provider mirror semantics review

Issue: #1810

## Independent public fixture result

The pinned scikit-image public fixture completed successfully under the exact FR104 FaceLandmarker runtime.

Fixture:

- source repository: `scikit-image/scikit-image`
- fixture: `astronaut.png`
- SHA-256: `88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5`
- decoded dimensions: 512 × 512
- digest verification: PASS

Observed scalar values:

```text
original provider-left eye centroid X   0.48118495009839535
original provider-right eye centroid X  0.39833978191018105
mirrored provider-left eye centroid X   0.5995679348707199
mirrored provider-right eye centroid X  0.5179052278399467

same-label reflection error              0.16450787521898746
cross-label reflection error             0.0030021052807569504
closer pattern                           cross_label_reflection_closer
```

The Phase N intake recomputes both reflection errors from the four centroid values and recomputes the closer-pattern label.

## Combined empirical evidence

Successfully detected fixtures now contributing scalar mirror evidence:

1. MediaPipe `portrait.jpg`
   - cross-label closer
2. MediaPipe `portrait_small.jpg`
   - cross-label closer
3. scikit-image `astronaut.png`
   - cross-label closer

Two additional MediaPipe public fixtures remained unavailable to the exact standalone FaceLandmarker runtime and are not used as semantic counterexamples.

The scikit-image fixture provides a successful public source outside the MediaPipe test-asset source repository.

## Bounded provider-mirror semantic statement

The accumulated evidence is sufficient to admit the following **bounded** statement:

> For `@mediapipe/tasks-vision` FaceLandmarker 0.10.35, under the exact tested IMAGE-mode runtime and explicit pixel-space horizontal reflection, every successfully detected tested fixture aligned provider-labeled eye topology more closely under cross-label correspondence than same-label correspondence.

This is a statement about observed **provider label behavior under an explicit image transform**.

It is not a universal assertion for every possible image, runtime version, transform pipeline, or capture source.

No numeric acceptance threshold is introduced.

## Critical separation from anatomy

The review does **not** infer:

```text
provider LEFT  = subject anatomical left
provider RIGHT = subject anatomical right
```

Cross-label behavior under horizontal reflection is insufficient to establish anatomical naming convention.

The following remain separate unresolved inputs:

- EXIF / decoded pixel orientation;
- whether a capture pipeline mirrored pixels before inference;
- front-camera preview versus encoded-frame mirror provenance;
- the provider's anatomical-side naming convention, if any;
- conversion from image-space side to subject anatomical side.

Therefore the result cannot yet assign anatomical ear laterality.

## Next gate

The next work should no longer collect arbitrary mirror fixtures.

Instead combine:

1. the admitted bounded provider-mirror behavior;
2. the existing governed capture-transform provenance receipt;
3. a separately sourced and audited anatomical-side convention;
4. image-space face geometry / pose;

to define a fail-closed anatomical laterality mapping contract.

If any required provenance is unknown, anatomical laterality remains unavailable.

## Authority

Still unauthorized:

- provider label → anatomical side;
- anatomical ear laterality;
- validated external-ear observation;
- traditional physiognomy binding;
- Production.

Watchtower-Track: face-observation-engine
