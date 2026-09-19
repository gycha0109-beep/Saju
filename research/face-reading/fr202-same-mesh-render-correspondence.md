# FR202 — Exact Same-Mesh Render Correspondence

Status: `executed_complete_research_only`

Issue: #926  
PR: #927  
Stack base: FR201 / PR #924

## Question

Does the fixed MediaPipe provider pair `[234,454]` correspond to independently derived zygion points when the largest FR199 confound is removed?

FR202 removes the prior cross-representation bridge by using the **same exact textured OBJ** for both sides of the comparison:

1. source-exact independent zygion derivation from OBJ vertices,
2. deterministic raster rendering of that exact OBJ and its bound `map_Kd` JPEG,
3. exact projection of the frozen source zygion vertices through the same render transform,
4. MediaPipe Face Landmarker `0.10.35` on that rendered raster,
5. all-478 point correspondence ranking.

The provider result is never consumed by the independent reference derivation.

## Frozen inputs

- MediaPipe Tasks Vision: `0.10.35`
- package bundle digest: `sha256:55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe`
- Face Landmarker model digest: `sha256:64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff`
- FR199 public corpus: 20 samples
- source-exact bilateral independent reference available: 18 samples
- source-exact fail-closed samples inherited from FR199: `male-32`, `female-27`

## Render/detection rule

The raster is a 1024×1024 unlit textured render using source X/Y orthographic projection.

To prevent face-detector coverage from deciding the experiment, FR202 uses a fixed predeclared nuisance-variant sequence over:

- clip fill: `1.2, 1.0, 0.85, 1.5, 0.7, 1.8`
- horizontal orientation
- vertical orientation
- texture-Y orientation
- camera side
- neutral background level

The first variant yielding exactly one detected face is selected.

**Selection is detector-only.** Zygion distance, candidate index, provider rank, pair score, width error, threshold, classifier output, or traditional interpretation is never consulted when choosing a render variant.

## Complete execution

Successful complete run:

- run: `35416067169`
- experiment-equivalent head: `2e00a06536ca298a48b9f8623b35af03f93728a3`
- result: PASS
- independent bilateral references: **18/18 ready**
- MediaPipe provider executions: **18/18 success**
- provider failures: **0**
- 478 landmarks returned per successful sample
- experiment receipt uploaded

The later FR202 commits only clarify provenance / CI concurrency; they do not alter the correspondence algorithm or the frozen experimental inputs.

## Fixed [234,454] result

Across both independent reference points and both fixed provider candidates:

- observations: **72**
- mean rank: **250.2083**
- median rank: **255**
- min / max rank: **1 / 477**
- rank #1: **1 / 72**
- top 5: **4 / 72**
- top 10: **6 / 72**

Width comparison for `234↔454` against the independently projected source-exact width:

- mean relative error: **+18.26%**
- median relative error: **+19.31%**
- minimum: **-32.45%**
- maximum: **+41.77%**

This complete same-mesh experiment therefore does **not** support admitting `[234,454]` as the provider zygion pair.

## All-478 descriptive discovery

The best distinct unordered pair was not stable across samples.

Most frequent pair:

- `123/352`: **2 / 18**

Every other observed best pair occurred only **1 / 18**.

Therefore FR202 also does **not** support promoting a replacement provider pair from this corpus.

The all-478 result is descriptive candidate discovery only. Reusing this same corpus to choose and then validate a replacement pair would be in-sample back-fitting.

## Authority

FR202 does not authorize any production claim.

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

## Result

FR202 closes the narrow technical question that remained after the material-UV bridge problem:

> Even when the independent reference and the MediaPipe input come from the exact same textured 3D mesh and share the exact render transform, the fixed `[234,454]` pair is not supported as zygion correspondence on this public corpus.

The experiment also fails to identify a stable alternative fixed pair.

FR200 and FR201 already tested the simple regional/band-envelope width proxy on the original public 2D photos and found near-zero correlation against the frozen 3D reference, including after MediaPipe metric-3D reconstruction. Therefore the next step must **not** repeat that same cross-representation experiment. The remaining useful question is narrower: on the FR202 exact same-mesh render, can a provider width scalar (fixed span, face-oval envelope, or predeclared midface envelope) reproduce the exact projected source zygion width even though no stable provider landmark pair corresponds point-for-point?
