# FR104 Phase L — Multi-fixture empirical mirror evidence admission

Issue: #1810

## Executed result

The Phase J public multi-fixture harness was executed locally.

All four public fixture digests matched their pinned MediaPipe v0.10.35 manifest values.

### Successful fixtures

`portrait.jpg`

- 820 × 1024
- same-label reflection error: `0.2042770180851221`
- cross-label reflection error: `0.001415284350514412`
- closer pattern: `cross_label_reflection_closer`

`portrait_small.jpg`

- 205 × 256
- same-label reflection error: `0.20350541360676289`
- cross-label reflection error: `0.008334586396813393`
- closer pattern: `cross_label_reflection_closer`

Phase K recomputation reproduced both error pairs exactly.

### Unavailable fixtures

`male_full_height_hands.jpg`

- digest verified
- original face count: 0
- mirrored face count: 0
- state: `unavailable_pair`

`pose.jpg`

- digest verified
- original face count: 0
- mirrored face count: 0
- state: `unavailable_pair`

These two cases are availability evidence only. They are not mirror-semantics counterexamples.

## Aggregate

```text
fixture count                  4
successful fixtures            2
unavailable fixtures           2
same-label closer              0
cross-label closer             2
equal                          0
```

Every successful fixture in this run reproduced the cross-label-closer relation.

## Critical evidence limit

The two successes do not yet establish independent face diversity.

The project has not established that `portrait_small.jpg` is independent from `portrait.jpg` in source lineage or depicted face.

Its smaller dimensions alone do not authorize a lineage claim in either direction.

Accordingly the current evidence supports:

- reproducibility of the cross-label reflection relation across two successful pinned fixtures;
- persistence of the relation under the observed smaller-image condition.

It does not yet support a general provider-mirror semantic statement.

## Decision

Do not authorize anatomical laterality.

Do not yet authorize a general FaceLandmarker mirror-semantics statement.

The next evidence target is at least one additional, independently pinned, non-user public face fixture that succeeds under the exact standalone FaceLandmarker runtime and is not dependent on the current portrait baseline for its face evidence.

After that evidence is admitted, perform a separate provider-mirror semantic review.

Anatomical provider-label meaning remains a separate review even if mirror semantics becomes sufficiently supported.

## Privacy and authority

No user image, camera frame, source image, raw landmark set, embedding, or reusable biometric template is persisted.

Still false:

- provider label → anatomical side;
- anatomical ear laterality;
- validated neutral ear observation;
- traditional binding;
- Production.

Watchtower-Track: face-observation-engine
