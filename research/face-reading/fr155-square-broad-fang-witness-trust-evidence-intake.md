# FR155 — Square-Broad Fang Witness Trust-Evidence Intake

## Status

FR155 defines a **candidate witness trust-evidence intake** boundary downstream of FR154 mechanical signature verification.

It may establish only that:

1. the input is an actually issued FR154 verification artifact from the active process-local boundary;
2. each FR154 verified session is covered exactly once by a candidate trust-evidence record;
3. the supplied signer key reference, signer public-key SPKI digest, and witness authority reference exactly match the FR154 verification coordinates for that session;
4. the transient trust-evidence artifact bytes match the caller-declared canonical SHA-256 artifact identity; and
5. a bounded candidate trust-evidence bundle digest can be materialized without retaining the trust-evidence artifact bytes.

FR155 does **not** establish a trusted witness, a trusted issuer, a governed trust root, a verified signer-to-witness binding, independent capture sessions, capture-quality validity, repeatability, or traditional semantic authority.

## Predecessor boundary

FR154 introduced research-only Ed25519 mechanical verification. Mathematical signature validity remained explicitly separate from witness identity and trust.

FR155 preserves that distinction. A mathematically valid FR154 signature is a prerequisite coordinate, not a trust credential.

The production witness verification algorithm remains unresolved and the pinned witness trust-root reference remains null.

## Candidate evidence accepted at intake

For each FR154 verification entry, FR155 accepts one candidate trust-evidence record containing:

- the FR154 session reference;
- the exact FR154 signer key reference;
- the exact FR154 signer public-key SPKI digest;
- the exact FR154 witness authority reference;
- an opaque trust-evidence artifact reference;
- an opaque claimed trust-evidence issuer reference;
- the fixed class claim `signer_key_to_witness_authority_binding_evidence_claim_not_semantically_verified`;
- a caller-declared canonical SHA-256 identity for the trust-evidence artifact;
- transient non-empty trust-evidence artifact bytes; and
- an opaque signer-to-witness-authority binding claim reference.

The trust-evidence artifact bytes are consumed only for byte-identity verification and are not retained in the issued FR155 output.

## Exact coverage and fail-closed rules

The intake fails closed unless all FR154 verified sessions are covered exactly once.

Duplicate session references and duplicate trust-evidence artifact references are rejected. Unknown sessions and signer/witness coordinates that do not exactly match the FR154 verification ledger are rejected. A trust-evidence artifact whose bytes do not match its declared digest is rejected.

Copied FR154 objects are rejected at the active issued-object boundary. Copied FR155 outputs are not accepted as active issued FR155 artifacts.

## Trust boundary

The following statements remain false after a successful FR155 intake:

- a caller-supplied trust-evidence issuer reference means the issuer identity was verified;
- a trust-evidence byte digest match means the semantic content was verified;
- a trust-evidence byte digest match means the signer key is trusted;
- an exact FR154 signer-coordinate match means the signer key is trusted;
- a signer-to-witness binding claim reference means that binding was verified;
- the trust-evidence issuer is trusted;
- signer-to-witness-authority binding is verified;
- signer-key trust is established;
- witness-authority trust is bound;
- external witness identity is verified;
- a governed witness trust root has been established; or
- independent-session evidence may be admitted by FR155.

Byte identity is not semantic authentication. Coordinate consistency is not trust. A claim reference is not a verified claim.

## Historical evidence non-promotion

FR155 does not retroactively promote historical captures into independent sessions.

Historical FR146/FR147 material remains outside prospective independent-session admission. Distinct references, distinct bytes, separate uploads, or earlier operator-declared session labels remain insufficient to establish independent capture sessions.

## Privacy boundary

FR155 does not accept raw face images or source-image digests.

It does not persist or return:

- raw face media;
- raw pixel rasters;
- raw provider responses;
- raw aggregate geometry;
- source-image digests;
- signer public-key PEM;
- detached signature bytes;
- trust-evidence artifact bytes;
- embeddings;
- identity templates;
- exact capture timestamps;
- geolocation; or
- device identifiers.

The bounded trust-evidence artifact digest may be retained because it identifies the trust-evidence artifact bytes supplied to FR155, not the source face image. This does not authorize publication of any source-image digest.

## Authority state after FR155

```yaml
candidateWitnessTrustEvidenceIntakePerformed: true

trustEvidenceIssuerIdentityVerified: false
trustEvidenceIssuerTrusted: false
trustEvidenceSemanticContentVerified: false
signerToWitnessAuthorityBindingVerified: false
signerKeyTrustEstablished: false
witnessAuthorityTrustBound: false
externalWitnessIdentityVerified: false
governedWitnessTrustRootEstablished: false

productionWitnessVerificationAlgorithm: null
pinnedWitnessTrustRootRef: null

independentMultiSessionEvidenceAcquired: false
independentMultiSessionEvidenceAdmitted: false
multiSessionIndependenceVerified: false

captureQualityMeasurementConstructValidated: false
captureQualityThresholdsDefined: false
captureQualityValidated: false

repeatabilityInterpretationAllowed: false
empiricalRepeatabilityEstablished: false
repeatabilityClassificationIssued: false
numericCaptureQualityThreshold: null
numericRepeatabilityAcceptanceThreshold: null

constructValidity: unresolved
traditionalBinding: unresolved
criterionState: null
structuredClaim: null
boundedNarrative: null
traditionalSemanticAuthority: false
```

## Synthetic verification scope

Public tests use synthetic witness bytes, synthetic trust-evidence bytes, and ephemeral synthetic Ed25519 keys.

Synthetic tests can demonstrate deterministic byte-identity checks, exact coordinate binding, duplicate rejection, issued-object enforcement, and fail-closed authority behavior. They cannot establish a real external issuer, a real witness authority, a real trust root, a semantically valid credential, a genuinely independent capture session, construct validity, or repeatability.

## Next frontier

The next frontier is:

`square_broad_fang_external_witness_trust_root_provisioning_and_semantic_trust_evidence_verification_plus_prospective_capture_execution_before_independent_session_admission`

Advancing beyond candidate trust-evidence intake requires external governed trust-root material and semantic verification rules that are independent of caller-supplied claims. In parallel, genuinely new source-backed prospective captures executed under the frozen FR152 acquisition protocol are still required before independent-session admission can be considered.

No construct-validity, threshold, repeatability, quality classification, or traditional-semantic authority change is authorized by FR155.