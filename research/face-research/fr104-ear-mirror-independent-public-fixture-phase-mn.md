# FR104 Phase M/N — Independent public fixture protocol and fail-closed intake

Issue: #1810

## Motivation

Phase L admitted two successful MediaPipe-public fixtures, both with `cross_label_reflection_closer`, while two broader human-image fixtures were unavailable to the standalone FaceLandmarker.

The successful evidence is still not sufficiently diverse to issue a general provider mirror-semantics statement.

The next fixture is therefore sourced outside the MediaPipe test-asset lineage.

## Pinned fixture

Source repository:

- `scikit-image/scikit-image`
- commit: `533b7694d2004ae84e49e2cfd0bcfc5f8e562f22`

Fixture:

- `astronaut.png`
- SHA-256: `88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5`
- expected decoded dimensions: 512 × 512

Pinned scikit-image witnesses:

- registry blob `017d268bc4b9f07cc9bb82318e9f0bee961871cd`
  - supplies the fixture SHA and pinned data reference
- metadata blob `84164c6fde6ece45def699e2d60d5369b18e0a51`
  - describes the sample image and states no known copyright restrictions / public-domain release

This establishes a public fixture source repository distinct from the MediaPipe public test-asset source.

No runtime decision depends on determining or comparing the depicted person's identity.

## Runtime

The experiment preserves the exact FR104 provider runtime:

- `@mediapipe/tasks-vision@0.10.35`
- existing FR26 WASM root
- existing FR26 FaceLandmarker model reference
- IMAGE mode
- one face required

## Pair

Only:

```text
original
horizontal_mirror
```

No resize, crop, or rotation is introduced between pair members.

## Output

Successful execution emits only:

- original provider-left eye centroid X
- original provider-right eye centroid X
- mirrored provider-left eye centroid X
- mirrored provider-right eye centroid X
- same-label reflection error
- cross-label reflection error
- closer pattern

Raw landmarks are not returned or persisted.

If either pair member does not produce exactly one valid 478-point provider face, the result is `unavailable_pair`.

## Local execution surface

The existing FR104 multi-fixture page is extended non-destructively:

- route: `/fr104-mirror-multi/`
- control: `run-independent`
- the original four-fixture button and schema remain unchanged
- the independent fixture produces a separate result schema

## Phase N intake

The intake rechecks:

- exact runtime references
- exact fixture source refs
- expected and observed SHA
- 512 × 512 dimensions
- transform contract
- privacy flags
- authority flags
- scalar reflection errors by recomputation
- closer pattern by recomputation

An unavailable result remains availability evidence only.

## Authority boundary

Even a successful independent-source fixture does not automatically establish anatomical side.

A successful result can instead be combined with Phase L in a later, separate provider-mirror semantic review.

Still unauthorized:

- provider label → anatomical side
- anatomical ear laterality
- validated external-ear observation
- traditional binding
- Production

Watchtower-Track: face-observation-engine
