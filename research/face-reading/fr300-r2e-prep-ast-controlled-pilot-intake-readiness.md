# FR300-R2E-PREP — AST Controlled Pilot Intake Readiness

Watchtower-Track: face-engine

## Decision

AST-Face controlled-access request submission is reconciled into repository authority without signatory PII, and the pilot intake validator is prepared using synthetic/non-human fixtures only.

Canonical state:

```text
controlled access request = submitted
provider response = pending

controlled intake tooling = ready
real participant artifact intake = false

real metric authority = M1
real pairing authority = P2

FR299 = 0
FR300-R2 = 0
Product = 18/29
```

## 1. R2D-SR submission reconciliation

Provider-facing evidence confirms:

- the signed authoritative DUA was sent through the official AST controlled-access route;
- the sent mailbox state was observed;
- the signed DUA PDF was attached;
- signed PDF byte length = 133,917;
- signed PDF SHA-256 =
  `838d33c7a6e7b19f123299a02ee6fb027a4cb60aae34a9412c265134d8a175ff`.

Signatory identity, email, signature image, and Gmail provider IDs remain outside the public repository.

Repository authority therefore advances:

```text
duaSigned = true
duaSubmitted = true
controlledAccessRequested = true
```

but does not advance:

```text
providerAcknowledged = false
controlledAccessApproved = false
rawParticipantArtifactUseAuthorized = false
```

Canonical predecessor disposition:

```text
controlled_access_request_submitted_provider_response_pending
```

## 2. Controlled storage/privacy boundary

Raw controlled artifacts may not enter:

- Git;
- Git LFS;
- GitHub issues;
- public cloud storage.

Third-party public cloud processing remains unauthorized.

Controlled raw artifacts require an isolated handling environment.

The public repository may retain only non-identifying aggregate benchmark outputs.

Subject-level derived scalars are not authorized for public persistence by the current DUA adjudication.

AST provider landmarks may not issue FR266 nasal-apex truth or FR297 bridge-root truth.

## 3. Integrity gate

Every future controlled artifact must be bound before inspection by:

- opaque artifact reference;
- expected SHA-256;
- observed SHA-256;
- byte length.

Digest mismatch produces:

```text
quarantine_integrity_failure
```

and no later authority evaluation may rescue that artifact.

## 4. OBJ structural validator

The PREP validator accepts synthetic/non-human OBJ geometry and validates:

- vertex syntax;
- finite coordinates;
- vertex count;
- face count;
- non-degenerate spatial span;
- bounding-box diagnostics.

A unit-sphere-like coordinate pattern may be detected as a diagnostic warning only.

It may never issue metric authority.

Therefore:

```text
coordinate magnitude
!=
coordinate unit authority
```

## 5. Metric authority evaluator

The evaluator preserves the AST authority ladder:

```text
M1_device_class_metric_capable

M2_exact_acquisition_export_metric_documented

M3_exact_ast_raw_artifact_scale_source_bound
```

M3 requires all of:

- a known coordinate unit;
- source-bound unit evidence;
- exact artifact/evidence binding;
- no unaccounted scale normalization.

Coordinate magnitude, apparent face size, generic scanner capability, FLAME defaults, or processed standardized meshes may not issue M3.

Only M3 sets:

```text
metricScaleVerifiedForFR299 = true
```

## 6. Pairing authority evaluator

The pairing ladder is:

```text
P0_same_subject_only
P1_same_session
P2_same_neutral_acquisition_condition
P3_exact_controlled_artifact_pair_binding
```

P3 requires:

- same subject binding;
- same session binding;
- neutral condition binding;
- exact artifact-pair manifest binding;
- exact capture binding.

Same subject/session or synchronized acquisition alone does not issue P3.

AST/provider facial landmarks are not used as pairing truth.

## 7. Registration route

FR299 accepts either:

- verified same-capture binding; or
- a later validated registration binding.

Therefore a pilot with:

```text
M3
+
P2
+
validated registration route available
```

may proceed to the external-registration stage without pretending P3 already exists.

That route does not issue FR299 correspondence by itself.

## 8. Real-artifact admission gate

Future real controlled artifact evaluation requires all of:

```text
providerAccessState = approved
DUA scope bound = true
artifact handling environment approved = true
```

Any real artifact presented before those conditions is rejected by the intake API.

Provider acknowledgement, verification pending, or clarification requested are not sufficient.

## 9. Synthetic fixture coverage

Synthetic/non-human fixtures cover:

1. valid tetrahedron OBJ + exact unit/pair evidence → M3/P3 route;
2. hash mismatch → integrity quarantine;
3. malformed/non-finite OBJ → structural failure;
4. unknown unit → M1;
5. documented unit without exact artifact binding → M2;
6. scale-normalizing preprocessing → cannot reach M3;
7. same neutral session without exact artifact pair → P2;
8. exact manifest/capture binding → P3;
9. P2 + registration alternative → external-registration route;
10. unresolved metric + pairing → HOLD rather than increasing sample size.

No real AST subject artifact is used by PREP fixtures.

## 10. Intake dispositions

The evaluator emits only bounded outcomes:

```text
ready_for_external_registration
metric_authority_unresolved
pairing_authority_unresolved
metric_and_pairing_unresolved
artifact_integrity_failure
artifact_structural_failure
```

A larger subject sample is not a remedy for missing source authority.

If one pilot does not establish unit authority or pairing authority, the next action is metadata/authority resolution, not downloading more participants.

## 11. Current authority boundary

While the provider response remains pending:

```text
controlledIntakeToolingReady = true
syntheticFixtureValidationOnly = true

realParticipantArtifactIntakePerformed = false
realParticipantArtifactInspected = false

real metric = M1
real pairing = P2

real FR299 metric scale verified = false
real FR299 correspondence verified = false

FR299 eligible candidates = 0
FR300-R2 eligible candidates = 0
Product = 18/29
paid spend = 0
```

## 12. Next action on approval

When provider approval is actually received:

1. create/confirm the isolated controlled-data workspace;
2. select the minimum supported pilot, starting with one subject/capture;
3. hash artifacts before inspection;
4. inspect raw OBJ structure;
5. bind unit/export-scale authority;
6. bind RGB↔3D capture authority;
7. issue M1/M2/M3 and P0/P1/P2/P3 receipts;
8. proceed to candidate-independent external registration only if the intake gates permit it.

No FR299 bundle is materialized by R2E-PREP.

Watchtower-Track: face-engine
