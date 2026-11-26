# FR104 Phase T — anatomical laterality mapping contract skeleton

Issue: #1810

## Why this is a skeleton

Phase R did not admit a direct subject-anatomical meaning for the exact FaceLandmarker LEFT/RIGHT labels. The pinned release sources are conflicting or perspective-ambiguous.

Therefore Phase T does not issue anatomical left/right.

It implements only the geometry and fail-closed preconditions that will be required if a valid anatomical semantic witness is later admitted.

## Rotation-independent provider lateral geometry

The candidate is not classified by image-center X.

Let:

```text
L = provider LEFT-eye centroid
R = provider RIGHT-eye centroid
O = (L + R) / 2
u = normalize(L - R)
C = candidate centroid
p = dot(C - O, u)
h = |L - R| / 2
```

Then:

```text
p >  h  -> provider_left_lateral
p < -h  -> provider_right_lateral
otherwise -> between_or_not_beyond_eye_envelope
```

No arbitrary numeric threshold is added.

If the two eye centroids coincide, the eye axis is degenerate and the result is unavailable.

## Mapping gate

The mapping request requires:

- exact reviewed `@mediapipe/tasks-vision@0.10.35` runtime;
- provider-labeled lateral geometry;
- resolved frame reflection parity;
- dual-consumer pixel-identity evidence;
- explicit declaration that Florence prompt side is not consumed as anatomical side;
- explicit declaration that image-space X sign is not consumed as anatomical side.

Even when every mechanical prerequisite passes, the current result remains:

```text
anatomicalSide = unknown
```

because the direct anatomical semantic witness is not admitted.

## Negative-first behavior

The skeleton preserves blockers for:

- runtime drift;
- unresolved reflection parity;
- pixel mismatch;
- candidate not beyond either provider eye;
- degenerate eye axis;
- missing anatomical semantic witness.

A mirrored frame does not trigger an anatomical swap because no anatomical baseline mapping exists yet.

## Authority

Anatomical laterality, validated external-ear observation, traditional binding, and Production remain unauthorized.

Watchtower-Track: face-observation-engine