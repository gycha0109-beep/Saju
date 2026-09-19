# FR203 — Exact Same-Mesh Width Proxy Validation

Status: `executed_complete_research_only`

Issue: #953  
PR: #955  
Stack base: FR202 / PR #927

## Question

FR202 showed that no fixed MediaPipe provider pair reliably corresponds point-for-point to the independently derived zygion points, even when both sides come from the exact same textured OBJ.

FR203 asks a narrower product question:

> Can a predeclared provider **width scalar** reproduce the exact projected source zygion width on the same mesh, without claiming that any provider landmark is itself zygion?

## Frozen provider measurements

All measurements use the exact FR202 same-mesh render and detector-only nuisance-variant selection.

Three provider widths were frozen before execution:

1. roll-normalized fixed `234↔454` X span;
2. roll-normalized full official face-oval X envelope;
3. roll-normalized midface band envelope from the eye line through halfway toward the lip center.

The exact reference is the screen-projected source-exact zygion width through the same renderer transform.

No provider/reference error, candidate rank, threshold, or classifier output is used to select a render.

## Execution

Exact experiment head:

`7b55729bc056aaa4088cff40c5b710c2beb7e4cf`

Dedicated workflow:

- run: `35440232456`
- job: `105889672814`
- result: PASS
- typecheck: PASS
- face build: PASS
- syntax check: PASS
- real same-mesh experiment: PASS
- artifact upload: PASS
- artifact id: `10583880859`
- artifact digest: `sha256:317fd5642297edc94c4ba23c7c818cc5cefd57be0090774c5689aeb303a01bfd`

Coverage:

- frozen public samples: 20
- source-exact bilateral references available: 18
- provider success: 18/18
- provider failures: 0

## Width proxy results

### Fixed 234↔454

Provider/reference ratio:

- mean: **1.20248**
- median: **1.20750**
- min / max: **0.74994 / 1.45851**
- standard deviation: **0.14097**
- coefficient of variation: **0.11723**

Absolute relative error:

- mean: **23.03%**
- median: **21.45%**
- min / max: **10.82% / 45.85%**

### Full face oval

Provider/reference ratio:

- mean: **1.22163**
- median: **1.22007**
- min / max: **0.76054 / 1.45851**
- standard deviation: **0.14139**
- coefficient of variation: **0.11574**

Absolute relative error:

- mean: **24.82%**
- median: **23.09%**
- min / max: **12.25% / 45.85%**

### Midface band envelope

Provider/reference ratio:

- mean: **1.20036**
- median: **1.20205**
- min / max: **0.75704 / 1.45162**
- standard deviation: **0.14008**
- coefficient of variation: **0.11670**

Absolute relative error:

- mean: **22.74%**
- median: **21.45%**
- min / max: **10.81% / 45.16%**

## Interpretation

The same-mesh experiment removes the major FR199 cross-representation uncertainty.

The result does **not** support treating any tested raw provider width as a direct zygion-width measurement:

- all three means overestimate the exact reference by roughly 20–22%;
- sample-level absolute error remains large;
- the best observed mean absolute error is still about 22.7%.

The band-envelope proxy is only marginally better than fixed 234↔454 on this discovery corpus. That difference is not sufficient to select it for production.

However, the provider/reference ratio has a coefficient of variation around 11.6–11.7% for all three measurements. This suggests a possible stable multiplicative bias worth testing on a **new, never-used holdout corpus**.

FR203 does not fit or authorize that calibration.

## Next frontier

Do not re-fit on these same 18 samples.

FR204 should freeze a calibration factor from the FR203 discovery corpus for each predeclared width proxy, then test those frozen factors on public same-mesh samples that were never used in FR199–FR203.

The holdout must be selected before seeing provider/reference errors for those samples.

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
