# FR152 — Square Broad Fang Independent Multi-Session Evidence Acquisition Protocol

## Purpose

FR151 completed categorical review of the pre-registered FR150 perturbation responses without validating a capture-quality construct. The remaining empirical blocker is independent multi-session provenance.

FR152 freezes the prospective evidence-acquisition requirements for that blocker. It does **not** claim that qualifying session evidence has already been acquired or admitted.

The bounded path is:

`FR151 categorical perturbation review -> FR152 prospective independent-session protocol -> future witnessed capture sessions -> future admission/verification -> later candidate construct-validity decision`

## Why FR147 is insufficient

FR147 required at least two distinct study-local `captureSessionRef` values, but its own authority explicitly states that session assignment is `study_operator_declared_not_independently_verified` and that distinct session or event references do not prove independent sessions or events.

FR152 preserves that boundary. Historical FR146 A/B must not be retroactively relabeled as independent sessions.

The following are also insufficient on their own:

- distinct opaque session refs;
- distinct capture-event refs;
- byte-distinct source images;
- file metadata timestamps;
- separate upload times;
- separate chat attachments;
- perturbation variants derived from one source raster;
- operator self-attestation.

## Prospective-only requirement

A qualifying independent-session evidence set must contain at least two **new** capture events executed after the FR152 protocol freeze.

Each qualifying session must have:

1. a distinct session reference;
2. a distinct capture-event reference;
3. an external or operator-independent witness;
4. a witness artifact reference;
5. a witness authority reference;
6. a witness verification report;
7. byte verification of the witness artifact;
8. governed trust binding for the witness authority;
9. capture-to-witness binding;
10. a session-separation claim that a later admission boundary can actually verify.

This list is an acquisition requirement, not a statement that those requirements are already satisfied.

## Witness trust boundary

A caller-supplied witness ref is not a trusted witness. A caller-supplied public key is not a pinned trust root. Mathematical signature validity alone is not trusted witness identity.

FR152 intentionally leaves both of these unresolved:

- `productionWitnessVerificationAlgorithm: null`
- `pinnedWitnessTrustRootRef: null`

Therefore FR152 cannot admit independent session evidence by itself. A later verifier must define a governed trust binding and verify the witness evidence before any session-independence promotion.

## Privacy boundary

The multi-session provenance track must not require persistence of raw face media.

FR152 also does not require:

- source-image digests;
- exact capture timestamps in repository artifacts;
- geolocation;
- device identifiers;
- raw provider responses;
- pixel rasters or raw aggregate measurements.

A future implementation may use ephemeral source media while emitting only the minimum governed provenance evidence necessary for session admission.

## Authority boundary

FR152 may advance only:

- `acquisitionProtocolFrozen: true`
- `prospectiveIndependentSessionEvidenceRequired: true`

It must keep:

- `independentMultiSessionEvidenceAcquired: false`
- `independentMultiSessionEvidenceAdmitted: false`
- `multiSessionIndependenceVerified: false`
- `empiricalPerturbationValidationPerformed: false`
- `captureQualityMeasurementConstructValidated: false`
- `captureQualityThresholdsDefined: false`
- `captureQualityValidated: false`
- `repeatabilityInterpretationAllowed: false`
- `empiricalRepeatabilityEstablished: false`
- `repeatabilityClassificationIssued: false`
- `numericCaptureQualityThreshold: null`
- `numericRepeatabilityAcceptanceThreshold: null`

The candidate construct decision remains:

`blocked_pending_prospective_independent_session_evidence_and_trusted_witness_verification`

Traditional-semantic authority remains unresolved/null/false.

## No empirical substitution

Synthetic tests can prove that the protocol object and fail-closed boundaries behave deterministically. They cannot prove independent real capture sessions.

Likewise, the previously observed FR150/FR151 response consistency does not substitute for prospective multi-session provenance.

## Verification requirements

Deterministic verification must prove that FR152:

1. binds to the existing FR147 and FR151 fail-closed predecessor contracts;
2. requires at least two prospective qualifying sessions;
3. requires an external or operator-independent witness for every qualifying session;
4. requires witness artifact verification, authority trust binding, capture-to-witness binding, and session-separation verification;
5. explicitly rejects historical A/B relabeling and weak proxies such as opaque refs, bytes, upload separation, metadata, or self-attestation;
6. leaves the witness verification algorithm and pinned trust root unresolved;
7. does not claim any independent session evidence is acquired/admitted;
8. does not promote construct validity, capture quality, thresholds, repeatability, or traditional-semantic authority;
9. preserves raw-media and biometric privacy boundaries;
10. rejects forged FR152 issued objects.

## Next frontier

`square_broad_fang_prospective_independent_multi_session_capture_execution_and_external_witness_verification_before_candidate_construct_validation_decision`

That next frontier requires real prospective acquisition. Historical FR146 A/B are not eligible to satisfy it automatically.
