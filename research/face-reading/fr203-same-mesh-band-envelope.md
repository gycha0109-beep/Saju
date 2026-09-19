# FR203 — Frozen Band-Envelope on Exact Same-Mesh Render

Status: `executed_complete_negative_research_only`

Issue: #947  
PR: #949  
Base: FR202 / PR #927

## Question

Does the already-frozen FR200/FR201 midface band-envelope proxy become coherent when the provider input and independent reference come from the **exact same textured OBJ**?

FR203 does not tune a new band and does not search for a new fixed provider pair.

## Frozen proxy

Reused unchanged from FR200:

- official MediaPipe face-oval topology;
- official eye topology centers;
- roll normalization;
- band from the eye line through halfway to the lip center;
- left/right envelope = min/max X face-oval vertices inside that band.

FR201 canonical-aligned metric geometry is evaluated with the same eye/lip/oval definition.

## Execution

Exact experiment head: `5d1f582975737992e038c2186cde39f695544318`  
Dedicated run: `35416545059`  
Artifact: `10576446106`

Gates:

- face-reading typecheck: PASS
- face-reading build: PASS
- FR200 deterministic tests: 5/5 PASS
- FR201 deterministic tests: 3/3 PASS
- FR203 experiment: PASS
- artifact upload: PASS

Coverage:

- independent source-exact bilateral references: **18/18**
- MediaPipe exact same-mesh executions: **18/18**
- provider failures: **0**

## Same-raster direct width error

The independent source-exact zygion pair is projected through the exact selected render transform and roll-normalized by the same eye-line rotation before width comparison.

Relative error versus that independent projected width:

| Measure | Mean signed | Median signed | Mean absolute | Median absolute | Min | Max |
|---|---:|---:|---:|---:|---:|---:|
| fixed 234↔454 | +22.51% | +21.43% | 24.40% | 21.43% | -17.00% | +47.82% |
| frozen band envelope | +22.30% | +21.45% | 24.10% | 21.45% | -16.21% | +47.12% |
| full oval | +24.46% | +23.16% | 26.21% | 23.16% | -15.83% | +47.82% |

The frozen band envelope is only marginally different from the fixed pair and does not materially close the gap.

## Canonical-aligned metric scale-free correlation

Reference:

`source-exact zygion X width / source OBJ Y span`

Provider measures:

`provider width / canonical-aligned face-oval height`

| Measure | Pearson | Spearman |
|---|---:|---:|
| fixed 234↔454 | -0.1236 | -0.0857 |
| frozen band envelope | -0.1219 | -0.0526 |
| full oval | -0.1355 | -0.0526 |

Pose-removed metric geometry therefore does not rescue the frozen band-envelope proxy on this corpus.

## Envelope endpoint distribution

Screen-space frozen band envelope:

- `234/454`: 6/18
- `127/356`: 3/18
- `127/323`: 2/18
- `234/323`: 2/18
- all others: 1/18

Canonical-aligned metric band envelope:

- `234/454`: 10/18
- `127/454`: 3/18
- `93/454`: 2/18
- all others: 1/18

This explains why the frozen band behaves similarly to the fixed pair: on many samples its face-oval envelope collapses back onto `234/454` or a nearby oval endpoint combination.

## Decision

FR203 is a negative result.

The exact same-mesh experiment removes the earlier cross-representation objection, but the frozen MediaPipe face-oval band-envelope still does not track the independent source-exact zygion width closely enough to justify anatomical or production promotion.

This does **not** mean MediaPipe Face Geometry is unusable for face structure. It means this specific proxy — face-oval envelope between eye line and halfway-to-lip — is not validated as a zygion/bizygomatic substitute by the current evidence.

The next lane must use an independent 3D oracle and/or redefine the product measurement as an operational surface-structure feature rather than repeatedly tuning this same zygion target on the same corpus.

## Authority

```text
providerIndexAdmissionAuthorized=false
anatomicalZygionClaimAuthorized=false
numericAcceptanceThresholdAuthorized=false
calibrationAuthorized=false
classifierAuthorized=false
traditionalProjectionAuthorized=false
productionAuthorized=false
commerceAuthorized=false
```
