# FR204 — Frozen Calibration Holdout Protocol

Status: `inventory_passed_holdout_execution_pending`

Issue: #971  
PR: #972  
Stack base: FR203 / PR #955

## Question

FR203 showed that all three predeclared MediaPipe width scalars have a substantial raw multiplicative bias against the exact same-mesh projected zygion width, while their provider/reference ratios vary less than the raw absolute error.

FR204 asks:

> Does a calibration factor frozen only from FR203 remain useful on geometry that was not used to estimate that factor?

FR204 does **not** ask whether a MediaPipe landmark is anatomically zygion.

## Frozen calibration factors

The factors are the reciprocal of the exact FR203 discovery-corpus mean provider/reference ratio.

| Proxy | FR203 mean provider/reference ratio | Frozen FR204 factor |
| --- | ---: | ---: |
| fixed 234↔454 X span | 1.202483945479303 | 0.8316119344124847 |
| full face-oval envelope | 1.221627340822886 | 0.8185802384926992 |
| midface band envelope | 1.2003588222019865 | 0.8330842257364008 |

These values are immutable for FR204. No holdout result may alter them.

## Original-corpus exhaustion

The pinned source repositories contain exactly the same 20 original OBJ identities already frozen in `FR199_PUBLIC_CORPUS`:

- 10 male;
- 10 female.

Therefore there is no unused original identity inside the pinned FR199 source repositories.

A train/test split invented after FR203 would not be an independent holdout because the measurement definitions and discovery result have already seen the corpus. FR204 must not describe such a split as independent validation.

## Executable holdout path

The same pinned repositories also contain `morphed-3D/<sample>.zip` archives.

Inventory gate completed successfully on run `35442940101`.

Observed before any provider/error evaluation:
- male sentinel archive: 96 OBJ / 96 MTL entries;
- female sentinel archive: 96 OBJ / 96 MTL entries;
- inspected morph OBJs contain texture coordinates and faces;
- inspected morph MTLs bind the base identity JPEG (for example `map_Kd male-23.jpg` / `map_Kd female-26.jpg`).

Therefore the unseen-geometry intervention path is executable.

Before any FR204 provider/error observation:

1. inspect representative pinned archives;
2. verify that the archives contain usable morphed OBJ geometry;
3. verify that selected geometry retains renderable topology/UV information or can use the pinned base texture without changing the provider measurement definition;
4. freeze selection using source metadata only;
5. derive the independent 3D reference before provider execution;
6. run the unchanged FR202 detector-only renderer and FR203 width definitions;
7. apply only the three frozen factors above.

If this path is viable, its authority label is:

`unseen_geometry_intervention_holdout`

It is **not**:

`independent_identity_holdout`

because the morphed meshes originate from identities already present in FR199–FR203.

## Deterministic selection rule

If the archive inventory gate passes, FR204 selects at most one morphed OBJ per source identity.

For each archive:

1. enumerate valid `.obj` entries;
2. exclude an entry only if it is byte-identical to the pinned original OBJ;
3. compute SHA-256 over the UTF-8 selector string
   `FR204|repository|commit|archivePath|entryPath`;
4. select the lexicographically smallest digest;
5. freeze archive digest, entry path, entry digest, base texture digest, and reference receipt before MediaPipe execution.

No landmark rank, zygion distance, provider width, calibrated error, face-detection score, or classifier output may influence holdout selection.

A selected sample that cannot produce an independent bilateral reference or a single-face provider result fails closed and remains in the denominator as a holdout failure receipt; it is not replaced after outcome observation.

## Measurements

For each frozen holdout mesh:

`calibratedWidth = providerWidth × frozenFactor`

For each of the three predeclared proxies FR204 records:

- calibrated/reference ratio;
- signed relative error;
- absolute relative error.

FR204 also records ordering behavior across the holdout cohort, but does not fit a threshold or classifier.

## External identity holdout

Independent-identity validation remains required before production authority.

Public-source review before FR204 execution found:

- the Florence 2D/3D dataset requires a data request;
- MICA unified registrations are academic/non-commercial and require obtaining the constituent datasets separately;
- the public FaceVerse GitHub repository exposes one in-repository sample, which is insufficient for a holdout cohort.

Those sources may be used later under their applicable access/licence terms, but FR204 does not silently substitute them or claim commercial training authority.

## Fail-closed authority

```text
providerIndexAdmissionAuthorized=false
anatomicalZygionClaimAuthorized=false
numericAcceptanceThresholdAuthorized=false
calibrationAuthorized=false
classifierAuthorized=false
traditionalProjectionAuthorized=false
productionAuthorized=false
commerceAuthorized=false
independentIdentityValidationComplete=false
```

A successful intervention holdout can justify continuing the calibration hypothesis. It cannot by itself set any authority flag above to true.
