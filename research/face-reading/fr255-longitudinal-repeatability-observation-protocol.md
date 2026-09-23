# FR255 — Longitudinal Repeatability Observation Protocol

Status: research-only descriptive observation  
Track: `face-research`

## 1. Purpose

FR255 begins only after the FR251 browser dry-run path has completed an actual operator-attested live-camera execution with the required `1:1`, `1:2`, `2:1`, `2:2` slots.

FR255 does **not** establish repeatability. It creates an append-only longitudinal record so separately executed FR251 sanitized exports can be compared descriptively over time.

The frozen metric remains:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

## 2. Research question

For the same operator-attested participant, how does the frozen primary metric vary:

1. between the two captures inside each FR251 session;
2. between the two sessions inside one FR251 execution;
3. between separately executed FR251 observation blocks over time?

FR255 records those variations without deciding whether they are acceptable.

## 3. Source admission

Each FR255 observation block must come from one complete
`fr251-localhost-dry-run-sanitized-export-v1` artifact.

The source must preserve:

- exactly four required slots: `1:1`, `1:2`, `2:1`, `2:2`;
- FR243 mechanics review with `requiredSlotCount=4` and `recordedSlotCount=4`;
- operator-attested actual participant execution;
- independent execution verification = false;
- empirical/confirmatory evidence eligibility = false;
- empirical repeatability established = false;
- interpretation/traditional/Production/Commerce authority = false;
- raw-media, raw-image-digest, embedding, and identity-template persistence = false.

Rejected FR251 slots may remain in the longitudinal record. They are retained descriptively, but only accepted slots with the frozen primary metric contribute numeric metric summaries.

## 4. Longitudinal append rule

FR255 bundles are append-only.

Each imported FR251 execution receives:

- `observationOrdinal`;
- source execution fingerprint derived only from the sanitized FR251 artifact;
- source `generatedAt`;
- import timestamp;
- elapsed milliseconds from the previous observation block;
- previous-observation digest;
- current observation digest.

A duplicate source execution is rejected.

A source whose `generatedAt` is not later than the current chain head is rejected.

FR255 does not modify or replace earlier observations.

## 5. Temporal separation

FR255 records:

`elapsedSincePreviousObservationMs`

for every observation after the first.

No minimum number of milliseconds, minutes, hours, or days is defined as sufficient separation.

Therefore:

- elapsed time is descriptive evidence only;
- `temporalSeparationIndependentlyVerified=false`;
- no time threshold is used to admit or reject repeatability evidence.

## 6. Participant continuity

FR255 performs no biometric identity comparison.

For the first observation, the operator attests that the FR251 execution belongs to the intended baseline participant.

For every later observation, the operator additionally attests that it belongs to the same participant as the existing FR255 bundle.

The bundle must retain:

- operator attestation;
- `independentlyVerified=false`;
- `identityMatchingPerformed=false`.

FR251 participant/operator references are not retained inside the FR255 longitudinal bundle.

## 7. Capture-condition observations

Each observation block may record bounded operator observations:

- device class;
- camera facing;
- portrait/landscape orientation;
- descriptive lighting condition;
- glasses presence;
- hair occluding the eye region;
- neutral-expression operator attestation;
- frontal-pose operator attestation.

These fields are covariate metadata only.

They are not:

- validated capture-quality constructs;
- automatic product gates;
- numeric quality scores;
- calibration inputs;
- biometric thresholds.

## 8. Descriptive statistics

FR255 may calculate only descriptive statistics from available accepted primary metrics.

### Per session

- accepted metric count;
- accepted values;
- arithmetic mean;
- absolute difference between the two accepted captures when both are present;
- range.

### Across session means

- count;
- arithmetic mean;
- median;
- minimum;
- maximum;
- range;
- population standard deviation;
- median absolute deviation.

### Across separately executed observation blocks

- observation-block mean values;
- signed difference from first to latest observation-block mean;
- absolute difference from first to latest observation-block mean.

Every numeric summary remains:

`descriptive_only_no_repeatability_pass_fail`

## 9. Prohibited outputs

FR255 must not issue:

- repeatability PASS/FAIL;
- acceptable-error tolerance;
- repeatability threshold;
- capture-quality threshold;
- confidence grade;
- calibration;
- population norm;
- interpretation validity;
- traditional face-reading binding;
- Production admission;
- Commerce admission.

No numeric threshold may be inferred from one participant or from the first FR251 execution.

## 10. Privacy boundary

The FR255 bundle may contain sanitized metric values and bounded condition metadata.

It must not retain:

- raw image;
- raw video;
- raw image digest;
- raw provider response;
- raw landmark set;
- derived full-face metric geometry;
- face embedding;
- identity template;
- FR251 participant reference;
- FR251 operator reference.

Observation-chain digests apply only to sanitized FR255 observation payloads and are not raw-image digests.

## 11. Browser workflow

The browser surface accepts:

1. an optional prior FR255 bundle;
2. one newly completed FR251 sanitized export;
3. explicit participant/separate-execution operator attestations;
4. bounded capture-condition metadata.

If no prior bundle is supplied, a new opaque FR255 study reference is generated locally.

If a prior bundle is supplied, the new observation is appended only after the existing digest chain validates.

The resulting bundle is downloaded locally as sanitized JSON. No server upload endpoint is introduced.

## 12. Evidence interpretation after FR255

A growing FR255 bundle may justify further analysis of observed variation.

It does not by itself justify a numeric acceptance threshold or calibration proposal.

Before any threshold proposal, later work must separately address at least:

- number and diversity of participants;
- number and timing of repeated sessions;
- sensitivity to capture conditions;
- construct validity of the frozen metric;
- separation of measurement variation from actual morphology variation.

## 13. Next frontier

Collect additional separately executed FR251 observation blocks, inspect descriptive within-session and between-session variation, and only then decide whether a calibration or threshold study is warranted.
