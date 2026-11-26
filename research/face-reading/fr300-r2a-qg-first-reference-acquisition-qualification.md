# FR300-R2A-QG — First FR299 Reference Acquisition Qualification Gate

Watchtower-Track: face-engine

## Decision

The first real FR299 reference acquisition is **not yet authorized**.

Three candidates were re-qualified against the frozen FR300-R1Z-BM benchmark contract:

1. AST-Face controlled raw scan + synchronized RGB;
2. UL-DD restricted ZED 2 stereo release;
3. MINDS-Libras RGB-D / 1,347-point FaceModel.

No candidate closes every critical gate using currently source-bound public authority.

Canonical disposition:

```text
all_candidates_hold_before_acquisition_authorization
```

This stage performs no controlled-access request, restricted-access request, DUA signature/submission, external contact, participant-artifact download, participant-artifact inspection, or paid spend.

## 1. Frozen target

R1Z-BM already fixes the first product-relevant benchmark target as:

```text
nose.tip_bridge_relative_projection
```

The candidate remains:

```text
ordinary smartphone front-camera RGB
25–30 cm
RGB-only
unitless relative shape
```

The final truth must remain an FR299-grade independent reference.

## 2. Qualification gates

Every candidate is evaluated against the same nine gates:

```text
Q0 Source identity
Q1 Rights / participant-use authority
Q2 RGB availability
Q3 Independent 3D availability
Q4 Metric-scale authority
Q5 Exact RGB↔3D correspondence
Q6 Candidate-independent canonical registration feasibility
Q7 Provider-blind FR266/FR297 annotation feasibility
Q8 Acquisition authority
```

Critical gates are:

```text
Q1
Q2
Q3
Q4
Q5
Q8
```

A candidate cannot become acquisition-ready if any critical gate is anything other than `pass`.

There is no weighted score and no majority vote.

## 3. AST-Face controlled lane

### Source identity

Official source authority:

- paper DOI: `10.1038/s41597-026-07098-2`;
- OSF DOI: `10.17605/OSF.IO/XK4F6`;
- official processing repository: `zhaopu99/AST-face`.

The paper documents:

- 98 participants;
- raw high-resolution 3D facial scans;
- structured-light acquisition;
- synchronized multi-view RGB capture;
- a 52-participant subset with identifiable textured meshes and synchronized frontal/left/right RGB under controlled access;
- neutral 3D scan and synchronized multi-view RGB acquired in the baseline neutral condition.

The official repository states that controlled data include raw scans and synchronized RGB and that access requires the OSF-hosted DUA.

### Q1 Rights

Prior R1V inspected the GitHub-mirrored DUA and found bounded industrial/internal R&D permission.

However the official repository explicitly states:

```text
OSF-hosted DUA = authoritative
GitHub copy = convenience mirror
```

The authoritative OSF DUA has still not been byte-verified against the inspected mirror.

Therefore:

```text
Q1 = promising_unverified
```

This is not a rejection.

### Q2 RGB

The controlled 52-participant subset includes synchronized multi-view RGB.

Therefore:

```text
Q2 = pass
```

### Q3 Independent 3D

Controlled access includes original raw 3D facial scans before topology standardization.

Therefore:

```text
Q3 = pass
```

The public topology-standardized mesh is not substituted for this raw controlled source.

### Q4 Metric scale

This remains the primary technical blocker.

Current public sources establish:

```text
structured-light acquisition
high-precision scanner
raw OBJ availability under controlled access
```

but do not source-bind:

```text
exact scanner model
exact scanner calibration
exact scanner accuracy
raw OBJ physical coordinate unit
raw OBJ export-scale semantics
artifact-bound metric calibration receipt
```

The paper's mesh preprocessing section also states that processed meshes are normalized in scale.

The public repository's `01_icp.py` independently confirms that the processing pipeline normalizes point clouds to a unit sphere before ICP and denormalizes into target scale.

Therefore public processed-mesh behavior cannot be used to infer raw physical units.

Canonical state:

```text
Q4 = blocked
metricScaleVerified = false
```

### Q5 RGB↔3D correspondence

AST is structurally promising.

The paper documents:

- synchronized multimodal capture;
- neutral 3D scan + synchronized RGB;
- standardized rig positions/angles;
- unified file naming.

But the exact controlled-tier artifact mapping has not been inspected and no public source currently yields an auditable pair such as:

```text
raw neutral scan artifact X
↔
frontal RGB artifact Y
↔
exact subject/capture binding receipt
```

Therefore:

```text
Q5 = promising_unverified
```

### Q6 Canonical registration

A source-independent registration looks feasible, but no external validated FR299 registration receipt exists.

Therefore:

```text
Q6 = feasible_not_executed
```

### Q7 Provider-blind annotation

A raw facial surface should permit FR266 and FR297 annotation.

However AST's 84 landmarks may not be promoted to truth.

They may be used only for bounded navigation/debugging.

Therefore:

```text
Q7 = feasible_not_executed
```

### Q8 Acquisition

Actual controlled access requires:

1. OSF account;
2. authoritative DUA;
3. signature;
4. submission to the dataset contact;
5. identity verification;
6. read-only permission grant.

Those actions require separate authorization.

Therefore:

```text
Q8 = blocked
```

### AST disposition

```text
hold_public_authority_gap
```

AST remains the preferred public-authority frontier because it already combines raw 3D and synchronized RGB in one controlled acquisition system.

That preference does not authorize access.

## 4. UL-DD lane

### Source identity and rights

Official source authority:

- paper DOI: `10.1038/s41597-025-06540-1`;
- Zenodo DOI: `10.5281/zenodo.17978727`.

The current Zenodo Research Use License explicitly permits bona fide research including commercial R&D, subject to the agreement.

Therefore:

```text
Q1 = pass
```

### RGB/stereo source

The paper documents:

- ZED 2 3D camera;
- original combined recording approximately 1344×376 at 60 fps;
- public/released split left/right views;
- each released eye resized to 440×370;
- synchronized modalities;
- participant/session-based naming.

Therefore:

```text
Q2 = pass
```

### Independent 3D

A calibrated stereo pair could theoretically produce independent metric 3D without using the RGB candidate provider.

But that requires the exact capture calibration and exact released-pixel transform.

Therefore:

```text
Q3 = promising_unverified
```

### Metric scale

Stereolabs documents that stereo camera calibration contains:

- per-eye intrinsics;
- distortion;
- stereo extrinsics;
- sensor metadata.

The exact calibration is device-specific.

UL-DD public authority still does not bind:

```text
exact capture device serial
exact calibration file
exact intrinsics
exact extrinsics / baseline
rectification state
split transform
resize transform
crop transform
```

Therefore:

```text
Q4 = blocked
```

Generic ZED 2 calibration is explicitly prohibited as a substitute.

### Correspondence

The released left/right videos originate from one ZED recording and the dataset is time-aligned.

But the resized released pixels are not source-bound back to the exact capture calibration domain.

Therefore:

```text
Q5 = promising_unverified
```

### Registration and annotation

Without exact metric stereo reconstruction, FR299 canonical registration cannot be validated.

Provider-blind nose annotation remains conceptually feasible only after a valid reconstructed surface exists.

Therefore:

```text
Q6 = blocked
Q7 = feasible_not_executed
```

### Acquisition

Zenodo currently requires a registered account, institutional/university/corporate R&D email, statement of purpose, and explicit agreement to the data usage terms.

No request is performed in this stage.

Therefore:

```text
Q8 = blocked
```

### UL-DD disposition

```text
hold_exact_calibration_authority
```

## 5. MINDS-Libras lane

### Source identity

Official creator authority documents:

- RGB videos;
- depth videos;
- 25 body joints;
- 1,347 facial points.

The FaceModel schema describes 1,347 X/Y/Z values and ColorFaceModel / DepthFaceModel mappings.

### Rights

Existing R1S public-source review remains authoritative:

```text
dataset copyright license
= CC BY 4.0 bound

participant commercial product-development scope
= unresolved
```

The additional public review did not find an authoritative source that closes that participant/data-subject scope.

Therefore:

```text
Q1 = blocked
```

CC BY may not substitute participant consent.

### RGB and 3D

Creator documentation establishes RGB availability.

The 1,347-point FaceModel is technically promising as an independent source.

Therefore:

```text
Q2 = pass
Q3 = promising_unverified
```

### Metric scale

Creator documentation describes Kinect FaceModel in meter-space semantics.

But released subject bytes have not been inspected because rights remain fail-closed.

Therefore:

```text
Q4 = promising_unverified
```

A documented meter schema is not identical to verified released-byte meter survivability.

### Correspondence

ColorFaceModel and DepthFaceModel provide a strong documented mapping concept.

But exact released artifact binding remains uninspected.

Therefore:

```text
Q5 = promising_unverified
```

### Registration / annotation

External candidate-independent registration is feasible in principle but unexecuted.

Kinect `NoseTip` / `NoseTop` indices remain forbidden as FR266/FR297 truth.

Therefore:

```text
Q6 = feasible_not_executed
Q7 = feasible_not_executed
```

### Acquisition

Subject artifact inspection/download remains forbidden until participant commercial product-development scope is source-bound.

Therefore:

```text
Q8 = blocked
```

### MINDS disposition

```text
hold_external_rights_authority
```

## 6. Cross-candidate result

Current critical-gate summary:

| Candidate | Q1 rights | Q2 RGB | Q3 independent 3D | Q4 metric | Q5 pairing | Q8 acquisition |
|---|---|---|---|---|---|---|
| AST controlled | promising | pass | pass | blocked | promising | blocked |
| UL-DD | pass | pass | promising | blocked | promising | blocked |
| MINDS | blocked | pass | promising | promising | promising | blocked |

No row contains all critical gates as `pass`.

Therefore:

```text
acquisitionReadyCandidateCount = 0
```

## 7. Prohibited shortcuts

The qualification contract explicitly rejects:

### AST

```text
structured-light
→ metricScaleVerified
```

```text
public standardized mesh
→ controlled raw metric truth
```

```text
AST 84-point landmark
→ FR266 / FR297 truth
```

### UL-DD

```text
generic ZED 2 calibration
→ exact capture calibration
```

```text
device model name
→ metric scale authority
```

```text
Dlib IR facial landmarks
→ metric 3D truth
```

### MINDS

```text
CC BY 4.0
→ participant commercial consent
```

```text
public release
→ product-R&D permission
```

```text
Kinect NoseTip/NoseTop
→ FR266/FR297 truth
```

## 8. Operational boundary

This stage records:

```text
controlledAccessRequested = false
restrictedAccessRequested = false

duaSigned = false
duaSubmitted = false

externalContactAuthorized = false
externalContactPerformed = false

participantArtifactDownloaded = false
participantArtifactInspected = false

paidSpendAuthorized = false
```

No raw facial data enter Git.

## 9. Product boundary

No candidate is admitted as a real FR299 reference.

Therefore:

```text
FR299 eligible candidate count = 0
FR300-R2 eligible candidate count = 0
Product = 18/29
Production = inactive
Commerce = inactive
```

## 10. Next frontier

Without new external authorization, the strongest remaining public-authority frontier is AST controlled.

The next bounded task is:

```text
AST metric-scale and exact-pairing authority resolution
```

Specifically:

1. locate source-bound raw OBJ physical-unit/export-scale authority if public;
2. locate exact controlled-tier naming/manifest semantics if public;
3. verify authoritative OSF DUA exact-version identity if technically exposed without signing/submitting;
4. do not request access unless those checks make acquisition scientifically justified.

If public authority remains exhausted, AST stays HOLD and the project should not download controlled facial data merely to inspect whether the missing authority might exist inside.

Watchtower-Track: face-engine
