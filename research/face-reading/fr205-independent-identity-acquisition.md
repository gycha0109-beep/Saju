# FR205 — Independent Identity Acquisition Gate

Status: `public_independent_identity_geometry_holdout_executed_complete`

Issue: #980

## Frozen candidate

FR205 does not choose a new measurement.

It carries forward exactly one candidate selected after FR204:

- measurement: roll-normalized MediaPipe full official face-oval X envelope;
- multiplicative factor: `0.8185802384926992`;
- factor refit: forbidden.

## Required evidence

The preferred validation requires identities unused in FR199–FR204 with both:

1. a 3D scan from which the independent facial-width reference can be derived without MediaPipe;
2. a corresponding frontal RGB image on which the frozen MediaPipe candidate can run.

## AST-Face candidate

Pinned repository:

- `zhaopu99/AST-face`
- commit `02132155adda9fba6853f0c154cc33b57b31fed9`

The repository exposes a public demo containing mesh, texture, and 84 XYZ landmarks, which is useful for pipeline-shape verification.

For the actual cohort, the public tier provides anonymized standardized meshes and landmarks, while raw scans and synchronized RGB/textures for the consenting subset require controlled access through an OSF account and signed DUA.

The public 84-point landmark convention must not be silently redefined as anthropometric zygion. The independent reference must remain separately justified.

## Research oracle boundary

### MICA

Pinned commit: `af22e7a5810d474bc28a1433db533723d6bd2b07`

MICA's repository license restricts the model/software to non-commercial scientific research and explicitly prohibits use in a commercial product/service without separate licensing. It also requires separately obtained FLAME material.

Therefore MICA is research-oracle-only in this track.

### 3DDFA_V2

Pinned commit: `1b6c67601abffc1e9f248b291708aef0e43b55ae`

The repository code is MIT, but the bundled modified BFM2009 asset is documented as academic-only and requires a commercial BFM license for commercial use.

Therefore the current bundled runtime is research-oracle-only.

## Gate

The executable receipt must verify the pinned source/access/license statements before FR205 claims that an independent validation path is runnable.

Until controlled paired RGB + scan access exists:

```text
independentIdentityValidationComplete=false
calibrationAuthorized=false
productionAuthorized=false
commerceAuthorized=false
```


## FR205A public AST-Face discovery

The original acquisition gate concluded that controlled raw-scan + synchronized RGB access was required. A later direct index of the public OSF archive found a larger executable public geometry surface than the repository demo alone exposed.

Pinned public archive inspection found:

- **98** distinct AST-Face identities;
- an `au0` standardized OBJ for **98/98** identities;
- an `au0` 84-point XYZ landmark file for **98/98** identities;
- the required AU0 mesh + landmark transfer is about **58.6 MiB compressed**, so the 1.47 GB archive does not need to be downloaded wholesale;
- HTTP range extraction is sufficient for deterministic execution.

This changes the public-geometry acquisition conclusion, but not the RGB conclusion: the public cohort does not provide the synchronized frontal RGB required for a real-photo paired scan validation.

## Coordinate-frame reconciliation

The public 84-point landmark coordinates and public standardized mesh coordinates are not in the same numeric frame.

The AST-Face pipeline itself provides the bridge:

- the NICP path selects 36 points from the 84-point convention;
- those points correspond to 36 BFM keypoints;
- `cut_bfm.txt` maps the BFM topology into the cropped standardized topology.

FR205A evaluated only the index convention required to materialize that documented correspondence: `as-is`, `+1`, and `-1`.

Selection used only 3D correspondence residuals on `ast001`–`ast003`; MediaPipe output, face width, and provider/reference error were not available to the selector.

The frozen `+1` convention produced the lowest mean normalized 36-point affine-fit RMSE:

- mean normalized RMSE: **2.36%**;
- maximum among the three probe identities: **2.51%**.

That mapping was frozen before the render pilot and full-cohort provider evaluation.

## Public geometry reference

FR205A does **not** relabel any AST-Face point as anthropometric zygion.

For each identity the reference is:

`AST-Face 84-point full X-span after frozen 36-correspondence affine frame alignment`

This is an operational **face-breadth** reference.

It is not an anatomical zygion reference, and it cannot validate the claim that MediaPipe 234/454 or any other provider index is zygion.

## Render pilot

A fixed 12-identity pilot (`ast001`–`ast012`) was declared before provider execution.

The public standardized mesh is rendered with deterministic geometry-normal shading. Render variants are tried in a fixed order, and the first variant yielding exactly one MediaPipe face is selected. Reference width and provider/reference error never participate in render selection.

Exact pilot head:

`714c8f70438e13b4e84b44a1afe12949a5e0549d`

Dedicated run:

- run: `35446831147`;
- job: `105907101678`;
- reference ready: **12/12**;
- MediaPipe success: **12/12**.

The frozen FR204 factor was not refit.

## First 98-identity execution

Exact experiment head:

`59125c0556f33a32686275ddf43ec62fa41066a7`

Dedicated run:

- run: `35446985080`;
- job: `105907503819`;
- workflow result: PASS;
- selected identities: **98**;
- reference ready: **96**;
- provider success: **96/96**;
- provider failures: **0**.

The two missing references were not geometry failures. `ast001` and `ast002` each hit a transient HTTP 500 during range extraction. A bounded retry policy was added without changing any measurement, reference, renderer, or evaluation definition.

Across the 96 executed identities:

| Measurement | Mean provider/reference ratio | Mean absolute relative error | Median absolute relative error | Pearson | Spearman |
| --- | ---: | ---: | ---: | ---: | ---: |
| raw full face-oval envelope | **0.9910** | **2.37%** | **2.21%** | **0.7822** | **0.7328** |
| FR204 factor × raw full oval | 0.8112 | 18.88% | 18.73% | 0.7822 | 0.7328 |

The multiplicative factor does not change ordering, so Pearson/Spearman are identical apart from floating-point noise.

### Interpretation boundary

The result does **not** show that the FR204 zygion-like calibration was wrong. It shows that the frozen `0.8185802384926992` factor does not transfer to a different reference construct: AST-Face 84-point full face breadth.

Conversely, the unscaled MediaPipe full face-oval envelope is close in magnitude to this independent operational face-breadth reference and preserves substantial cross-identity ordering on the processed 3D-geometry render cohort.

Because this operational face-breadth interpretation was evaluated after FR204 and is being assessed on the same FR205A cohort that revealed it, FR205A must not call it a prospectively independently validated production metric.

## Authority after FR205A

The evidence now supports a narrower statement:

`raw MediaPipe full face-oval width is a viable operational face-breadth candidate on independent AST-Face geometry under deterministic synthetic rendering`.

It does **not** support:

- anatomical zygion correspondence;
- transfer of the FR204 `0.8185802384926992` factor to generic face breadth;
- real-photo capture validity;
- production or commerce activation.

Therefore:

```text
independentIdentitySyntheticGeometryEvidenceComplete=true
independentRealPhotoValidationComplete=false
independentIdentityValidationComplete=false
anatomicalZygionClaimAuthorized=false
calibrationAuthorized=false
productionAuthorized=false
commerceAuthorized=false
```

The next product-relevant validation should freeze the raw full-oval face-breadth construct prospectively and test it on a separate real-photo or separately held-out paired geometry cohort. The FR205A cohort cannot be reused to claim independent validation of a candidate selected from its own observed result.


## Final 98/98 retry execution

A bounded retry was added only to the public archive HTTP range transport. It did not change cohort membership, frame alignment, reference definition, renderer selection, provider measurement, frozen FR204 factor, or evaluation metrics.

Exact experiment head:

`b639acb8728ca6be2be162647dd0305caebb6781`

Dedicated workflow:

- run: `35447505605`;
- job: `105908873958`;
- result: PASS;
- selected identities: **98**;
- independent face-breadth references ready: **98/98**;
- provider successes: **98/98**;
- provider failures: **0**;
- artifact id: `10585771111`;
- artifact digest: `sha256:9a6ee714cd27fc38c240b3cba489b6d7db787bfdeb5e2872e60a678fd44227ef`.

Frame-alignment normalized RMSE across all 98 identities:

- mean: **2.503%**;
- median: **2.472%**;
- minimum: **1.944%**;
- maximum: **4.758%**.

### Final full-cohort measurement result

| Measurement | Mean provider/reference ratio | Mean absolute relative error | Median absolute relative error | Maximum absolute relative error | Pearson | Spearman |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| raw full face-oval envelope | **0.9906** | **2.381%** | **2.210%** | **5.878%** | **0.7763** | **0.7267** |
| FR204 factor × raw full oval | 0.8109 | 18.910% | 18.729% | 22.953% | 0.7763 | 0.7267 |

### Pilot-excluded prospective slice

Because `ast001`–`ast012` were used for the renderer pilot, FR205A also reports the untouched identity slice `ast013`–`ast098` separately.

For those **86** identities, using the unchanged raw full-oval measurement:

- mean provider/reference ratio: **0.9906**;
- mean absolute relative error: **2.388%**;
- median absolute relative error: **2.019%**;
- maximum absolute relative error: **5.878%**;
- Pearson: **0.7697**;
- Spearman: **0.7159**.

The pilot-excluded slice therefore reproduces the full-cohort result. The favorable raw full-oval behavior is not explained by the 12 renderer-pilot identities.

## FR205 decision

FR205 closes the acquisition/geometry question with three distinct conclusions:

1. **Independent identity geometry is executable from public AST-Face material.** The earlier repository-demo-only assumption was too narrow; the public OSF archive contains a complete 98-identity AU0 geometry/landmark cohort.
2. **The FR204 multiplicative calibration is construct-specific.** It materially helped the earlier zygion-like reference but introduces an approximately 19% negative magnitude bias against the independent AST-Face full-face-breadth reference. It must not be reused as a generic face-breadth calibration.
3. **Raw full-oval width is a viable operational face-breadth candidate.** On all 98 independent identities it is near-unbiased in magnitude and preserves substantial ordering, including on the 86-identity pilot-excluded slice.

FR205 does not convert that third observation into production authority. The AST-Face provider input here is a deterministic synthetic render of processed 3D geometry, not synchronized real capture. In addition, the operational face-breadth interpretation is now an observed candidate and requires a prospectively frozen next-stage validation if it is to become an authoritative product feature.

Final authority:

```text
independentIdentitySyntheticGeometryEvidenceComplete=true
independentRealPhotoValidationComplete=false
independentIdentityValidationComplete=false
anatomicalZygionClaimAuthorized=false
numericAcceptanceThresholdAuthorized=false
calibrationAuthorized=false
classifierAuthorized=false
traditionalProjectionAuthorized=false
productionAuthorized=false
commerceAuthorized=false
```

Recommended next frontier: freeze `raw_full_face_oval_width` as an operational **face-breadth** feature, keep it semantically separate from anatomical zygion/cheekbone claims, and validate capture stability on prospectively held-out real images before any product authority change.
