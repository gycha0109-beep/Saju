# MESH6F — Prospective Sweep Acquisition Runtime

MESH6F is the acquisition/runtime layer after the MESH6E prospective protocol. It records preregistered MESH6D aggregate evidence for prospectively admitted sweep manifests and materializes descriptive datasets.

It still does **not** calibrate a threshold or authorize production morphology.

## Admission design

A code audit found that MESH6D does not expose an active-issued assertion for a previously materialized MESH6D object. MESH6F therefore does not accept an arbitrary external MESH6D evidence object.

Instead `recordMesh6FProspectiveSweepAcquisition()` requires:

```text
issued MESH6E manifest
MESH6D input = issued MESH6A frames + explicit MESH5.1 weighted adapter
explicit manifest/input linkage attestation
```

The acquisition function invokes `buildMesh6DMultiFramePoseSweepEvidence()` itself and immediately copies only the 13 MESH6E-preregistered aggregate evidence values.

This preserves the MESH6D numerical contract while eliminating a forged-prebuilt-MESH6D admission surface.

## Exact copied evidence

MESH6F copies exactly the frozen MESH6E field sequence:

```text
poseSweep.lateralOrientationRadians.span
poseSweep.verticalOrientationRadians.span
poseSweep.relativeRotationFromFirstFrameRadians.max

morphologyRepeatability.observables.zygomaticSpanRatio.mad
morphologyRepeatability.observables.zygomaticSpanRatio.robustSpanP10P90
morphologyRepeatability.observables.zygomaticTemporalFlareRatio.mad
morphologyRepeatability.observables.zygomaticTemporalFlareRatio.robustSpanP10P90
morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.mad
morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.robustSpanP10P90
morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.mad
morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.robustSpanP10P90
morphologyRepeatability.observables.zygomaticRelativeDepthRatio.mad
morphologyRepeatability.observables.zygomaticRelativeDepthRatio.robustSpanP10P90
```

Each copied observation explicitly states that no classification, calibration, threshold, production admission, identity matching, or traditional binding was applied.

## Provenance

Every record carries the MESH6D comparison provenance required for later descriptive aggregation:

```text
coordinate frame
unit
canonical asset digest
MediaPipe release commit
geometry metadata blob SHA
weighted adapter schema
weighted adapter source asset
weighted adapter target asset
adapter target vertex count
adapter region count
adapter membership-edge count
```

A materialized dataset rejects mixed geometry or adapter provenance. Observed variation is not compared across incompatible evidence-generation surfaces.

## Dataset materialization

`materializeMesh6FProspectiveSweepAcquisitionDataset()` requires active-issued MESH6F records and enforces:

- one `prospectiveCollectionRef` per dataset;
- one provenance identity per dataset;
- unique `sweepRef`;
- unique `sweepSequenceIndex` within each capture series.

Records are grouped by:

```text
captureSeriesRef + captureConditionRef
```

For each of the 13 preregistered fields the dataset emits only:

```text
count
min
max
mean
range
```

No descriptive range becomes an acceptance boundary.

## Attestation boundary

MESH6E freshness / same-participant attestations and the MESH6F manifest-input linkage attestation are eligibility statements supplied to the protocol. They do not independently prove:

- that capture bytes are fresh;
- participant identity;
- that the exact runtime input came from a particular physical capture event.

`captureSeriesRef` remains a protocol-local grouping reference, not an identity match.

## Verification boundary

The dedicated verifier uses release-exact repository fixtures and generated MESH5.1 adapter data to exercise the runtime mechanics. Those fixtures verify:

- exact 13-field copying;
- internal MESH6D construction;
- manifest linkage enforcement;
- active-issued MESH6E manifest enforcement;
- duplicate sweep rejection;
- duplicate sequence-index rejection;
- mixed collection rejection;
- mixed provenance rejection;
- descriptive aggregation;
- authority and privacy boundaries.

Verifier fixtures are not post-preregistration empirical participant captures and therefore cannot establish repeatability or capture-quality validity.

## Fail-closed authority boundary

MESH6F keeps all of the following unavailable:

```text
empirical repeatability established
capture-quality validated
pose acceptance validated
frontal / three-quarter / profile classification
confidence score
population norm
numeric morphology repeatability acceptance threshold
numeric capture-quality threshold
numeric pose acceptance threshold
calibration issuance
production morphology admission
between-series identity inference
same/different participant classification
biometric template
anatomical measurement claim
beauty interpretation
traditional physiognomy interpretation
```

`constructValidity` and `traditionalBinding` remain unresolved.

## Privacy boundary

The acquisition record/dataset does not store:

```text
raw image
raw video
raw provider response
raw landmark set
derived full-face metric geometry
face embedding
identity template
```

Only the preregistered aggregate values, protocol-local references, and generation provenance are retained by the contract.

## Next frontier

The implementation is capture-ready, but its repository verifier does not provide empirical fresh-capture evidence. The next empirical step is to supply actual post-preregistration repeated sweep captures, execute MESH6D inside MESH6F, and inspect the resulting descriptive within-series / condition variation.

Only after an inspectable real dataset exists may a later review consider whether a numeric calibration proposal is justified. No threshold is pre-authorized by MESH6F.
