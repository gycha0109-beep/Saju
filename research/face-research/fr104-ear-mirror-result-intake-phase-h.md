# FR104 Phase H — Controlled mirror-pair scalar result intake

Issue: #1810

## Purpose

Phase F supplies a browser harness that emits one bounded scalar-only result for:

```text
pinned MediaPipe portrait fixture
→ original FaceLandmarker inference
→ explicit horizontal mirror
→ mirrored FaceLandmarker inference
→ left/right eye centroid-X scalar reduction
```

Phase H defines how that JSON may enter the research record without trusting copied summary fields or widening authority.

## Intake integrity

The parser requires the exact Phase F result schema and rechecks:

- pinned fixture class, filename, expected SHA-256, and observed SHA-256;
- digest verification flag;
- pinned MediaPipe package version and runtime/model refs;
- exact original/horizontal-mirror transformation;
- no resize, crop, or rotation difference;
- centroid-X values within normalized range;
- same-label and cross-label reflection errors by recomputation;
- the `closerPattern` label by recomputation;
- all privacy flags;
- all no-authority flags.

A copied or edited error/closer-pattern field therefore fails closed.

## Admitted output

Only bounded scalar evidence is retained:

- original left/right eye centroid X;
- mirrored left/right eye centroid X;
- recomputed same-label reflection error;
- recomputed cross-label reflection error;
- recomputed closer pattern;
- exact fixture digest and dimensions;
- bounded runtime identity.

No raw landmarks or image bytes enter the evidence object.

## Interpretation boundary

A valid result establishes only:

> On this exact pinned public fixture, under this exact runtime and explicit horizontal reflection, one scalar correspondence relation was observed.

It does not establish:

- universal FaceLandmarker mirror behavior;
- anatomical meaning of provider left/right labels;
- subject anatomical laterality;
- ear laterality;
- any threshold;
- validated external-ear observation;
- traditional binding;
- Production.

Both `same_label_reflection_closer` and `cross_label_reflection_closer` are admissible descriptive outcomes.

## Next action

Execute the Phase F local browser harness, copy only the resulting JSON, and pass it through this intake.

The resulting scalar evidence can then be reviewed for whether additional non-user controlled fixtures are required before proposing any provider-mirror semantics.

Watchtower-Track: face-observation-engine
