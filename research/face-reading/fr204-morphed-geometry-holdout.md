# FR204 — Frozen Width Calibration on Morphed Geometry Holdout

Status: `geometry_holdout_positive_population_validation_missing`

Issue: #957  
PR: #958  
Stack base: FR203 / PR #955

## Question

FR203 found a stable-looking multiplicative provider/reference bias on the exact same-mesh discovery corpus, but did not authorize calibration.

FR204 freezes those discovery factors before holdout execution and asks:

> Do the fixed factors reduce width error on facial geometries that were never used in FR199–FR203?

This is a **geometry holdout**, not an independent-identity or population validation.

## Frozen discovery calibration

Source:
- FR203 experiment head: `7b55729bc056aaa4088cff40c5b710c2beb7e4cf`
- FR203 run: `35440232456`

Frozen before FR204 provider execution:

| Proxy | Frozen multiplicative factor |
|---|---:|
| fixed 234↔454 | 0.8316119344124847 |
| full face oval | 0.8185802384926992 |
| midface band envelope | 0.8330842257364008 |

No factor was re-fit from FR204 holdout error.

## Predeclared holdout

Pinned morphed archives:
- male-23
- male-27
- female-26
- female-28

Pinned variants per archive:
- Narrow-10
- Narrow-15
- Narrow-75
- Narrow-125

Candidate geometry count: **16**

The archive probe was executed before provider-error inspection and confirmed OBJ + MTL + JPEG assets for these variants.

Archive SHA-256:
- male-23: `8a28bd0758dd6a2c18e028d8ad0b89ab2cf8333f3b69e71d0e976a41e09d4fb2`
- male-27: `28f83afd5c524fcdc9a9ea7cbeacb8b059634f4d43e2959b9679da3d0d3bea74`
- female-26: `266514356128b25821f4bc7dcb0ee3f9afea7dce1bf17e8c83371960cf640d89`
- female-28: `71e4fc15291ddd412f15dc0d50a0dd56f22f91d5fe3826108fd62e721216c883`

## Exact execution

Exact experiment head:

`254b1fd8daf6f5fc42916a889245150d4d172cfe`

Dedicated workflow:
- run: `35440770462`
- job: `105891034615`
- result: PASS
- typecheck: PASS
- face build: PASS
- syntax check: PASS
- provider execution: complete for every source-exact-ready holdout mesh
- artifact upload: PASS
- artifact id: `10583831545`
- artifact digest: `sha256:f8cc4ab476a6bf3d73b6f684a50771c78c0b3a7a5a8239920c0d2d6f189dad07`

## Coverage

Predeclared candidates: **16**

Source-exact bilateral reference ready: **11**

Source-exact fail-closed: **5**
- `male-27-Narrow-15`: one coordinate
- `female-28-Narrow-10`: zero coordinates
- `female-28-Narrow-15`: zero coordinates
- `female-28-Narrow-75`: zero coordinates
- `female-28-Narrow-125`: zero coordinates

The failures are the preserved published first-band control-flow behavior. They are not silently repaired or substituted in the primary FR204 result.

Provider execution:
- success: **11/11 reference-ready**
- provider failures: **0**

Therefore:
- holdout coverage = `source_exact_reference_partial`
- provider execution = `complete_for_reference_ready_subset`

## Holdout results

### Fixed 234↔454

Raw:
- mean provider/reference ratio: **1.18295**
- mean absolute relative error: **18.29%**
- median absolute relative error: **17.80%**
- raw error range: **9.78% – 28.63%**

After frozen FR203 factor:
- mean absolute relative error: **4.29%**
- median absolute relative error: **4.53%**
- calibrated error range: **0.25% – 8.71%**

### Full face oval

Raw:
- mean provider/reference ratio: **1.19975**
- mean absolute relative error: **19.98%**
- median absolute relative error: **19.57%**
- raw error range: **15.23% – 29.00%**

After frozen FR203 factor:
- mean absolute relative error: **3.58%**
- median absolute relative error: **3.45%**
- calibrated error range: **0.80% – 5.68%**

### Midface band envelope

Raw:
- mean provider/reference ratio: **1.17464**
- mean absolute relative error: **17.46%**
- median absolute relative error: **17.80%**
- raw error range: **9.78% – 28.90%**

After frozen FR203 factor:
- mean absolute relative error: **4.93%**
- median absolute relative error: **6.60%**
- calibrated error range: **0.53% – 8.55%**

## Interpretation

FR204 is positive evidence for a **stable multiplicative width bias under controlled geometry perturbation**.

The factor was frozen on FR203 and materially reduced error on previously unused morphed geometries.

Among the three predeclared proxies, full face-oval width produced the lowest calibrated error on the source-exact-ready geometry holdout:

- mean absolute error: **3.58%**
- maximum absolute error: **5.68%**

This does **not** establish population validity because:
1. the holdout is derived from four previously seen base identities;
2. only 11/16 candidate meshes satisfy the strict source-exact reference;
3. the morph generator and renderer remain synthetic;
4. no independent identity distribution has been tested.

Therefore FR204 may advance the full-oval calibrated width to an **independent-identity-validation candidate**, but not to production authority.

It also does not make any provider vertex a zygion landmark. The candidate is an operational scalar, not an anatomical landmark claim.

## Next frontier

Obtain or construct a commercially compatible **never-seen identity** mesh set and freeze the FR203 full-oval factor `0.8185802384926992` unchanged.

The next validation must:
- use identities not present in FR199–FR204;
- derive its reference independently from provider output;
- keep render nuisance selection provider-error-blind;
- report raw and calibrated error;
- not refit the factor;
- distinguish synthetic-identity validation from real-human population validation.

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
