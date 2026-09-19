# FR200 — MediaPipe Face Geometry Midface Envelope

## Decision

FR200 executed the proposed operational midface band/envelope proxy on the same public same-ID corpus used by FR199.

Result: **the proxy is not promoted**. On this corpus, neither the fixed 234↔454 span nor the band envelope nor the full face-oval width tracked the frozen independent source-exact 3D zygion-width ratio with useful correlation.

The production, commerce, calibration, classifier, traditional-projection, anatomical-zigyon, provider-index, and numeric-threshold gates remain closed.

## Frozen experiment

Provider:
- @mediapipe/tasks-vision 0.10.35
- official FACE_LANDMARKS_FACE_OVAL / eye / lip topology witness
- facial transformation matrices enabled
- packed MatrixData decoded as column-major
- in-plane roll removed from eye-center axis
- band: eye line through halfway to lip center
- envelope: minimum/maximum X among face-oval vertices inside the band

Normalization:
- independent reference = source-exact zygion width / OBJ Y span
- provider measures = provider width / roll-normalized face-oval Y span

This removes image crop/scale as a direct confound. Facial transformation matrix yaw is used only for the predeclared descriptive |yaw| <= 10° subset, not to back-fit a correction.

## Execution

Exact implementation head that produced the completed experiment:

`91cb42cda80d9d305f718ee1e0796bf7a2600375`

Dedicated workflow:
- run: `35411642818`
- job: `105812300947`
- typecheck: PASS
- face build: PASS
- deterministic tests: 5/5 PASS
- real MediaPipe provider experiment: PASS
- experiment artifact upload: PASS

Corpus:
- total frozen samples: 20
- source-exact independent reference ready: 18
- source-exact fail-closed: male-32, female-27
- provider success: 18/18
- provider failures: 0

## Results

All 18 source-exact-ready samples:

| Provider measure | Pearson r | Spearman rho |
|---|---:|---:|
| fixed 234↔454 / oval height | 0.027334 | 0.110423 |
| midface band envelope / oval height | -0.033370 | -0.031992 |
| full face-oval width / oval height | 0.085321 | 0.029928 |

Predeclared low-yaw subset (|yaw| <= 10°, n=17):

| Provider measure | Pearson r | Spearman rho |
|---|---:|---:|
| fixed 234↔454 / oval height | 0.004673 | 0.066176 |
| midface band envelope / oval height | -0.048520 | -0.044118 |
| full face-oval width / oval height | 0.074473 | 0.009804 |

Observed envelope endpoint pairs:
- 234/454: 7/18
- 234/356: 5/18
- 127/356: 4/18
- 127/454: 2/18

These endpoint frequencies are descriptive only and do not authorize any provider-index pair.

## Interpretation

The original FR199 negative correlation was not sufficient evidence by itself because the provider and independent reference had different scale normalizations. FR200 removed that direct crop/scale confound. After doing so, all tested 2D face-oval width proxies still showed correlations close to zero.

Therefore:
1. the fixed 234/454 convention remains unsupported as anatomical zygion;
2. the simple 2D band/envelope replacement is also unsupported on this corpus;
3. the discrepancy is not explained merely by image crop/scale or modest head yaw;
4. the next useful experiment must introduce an **independent dense 3D reconstruction oracle**, rather than tune another MediaPipe 2D index/band on these same samples.

## Next validation lane

Priority:
1. 3DDFA_V2 dense 3D reconstruction as the first independent oracle candidate;
2. MICA only as a separately governed non-commercial research comparator because its license prohibits commercial-product/service use.

The next lane must not tune a MediaPipe band against the same 18 samples and then call the fitted result validated. Candidate discovery and validation must remain separated.

## Authority state

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
