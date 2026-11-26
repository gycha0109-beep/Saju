# FR168 — Eye-Pair External Trust-Root Candidate Material Intake

## Status

**Candidate external trust-root material byte intake only.**

FR168 is downstream of the frozen FR167 eye-pair external-session provenance trust requirements. It creates an eye-pair-scoped bounded intake boundary for candidate trust-root material, but it does not provision an actual trust root, verify an external governance authority, admit a witness credential, or authorize independent-session evidence.

No participant capture, participant image, or participant-derived numeric measurement is required for this step.

## FR157 precedent and non-inheritance

FR157 is used as a design precedent for one narrow mechanic: transiently accept bounded candidate trust-root bytes, verify exact byte identity against a declared canonical SHA-256 digest, and retain only bounded coordinates/digests in the issued artifact.

FR157 remains square-broad-fang criterion-specific authority. FR168 does not inherit its criterion authority, trust roots, witness admission, or source-specific semantics. FR167 explicitly forbids cross-criterion trust-root reuse without an eye-pair admission path.

## What FR168 may establish

A successfully issued FR168 artifact may state only that:

- an active process-local FR167 requirements artifact was supplied;
- one bounded eye-pair candidate trust-root material record was supplied;
- the candidate trust-root bytes matched the caller-declared canonical SHA-256 artifact identity;
- the issued output retained bounded candidate coordinates and digests while omitting the candidate artifact bytes;
- an exact deterministic digest over the bounded candidate coordinates was materialized.

The candidate material digest is an inventory identity for the candidate record. It is not a participant source-image digest and it is not a trust decision.

## Candidate coordinates are not verified authority

FR168 requires candidate coordinates for:

- external governance authority identity evidence;
- trust-root policy;
- validity policy;
- revocation-status policy;
- signer-chain policy;
- semantic trust-evidence verifier;
- external key-pinning evidence;
- eye-pair criterion scope evidence;
- witness-authority scope evidence;
- prospective validity binding evidence;
- capture-to-witness binding policy.

All such values remain bounded opaque references at FR168. Their presence does not verify their meaning.

Therefore FR168 leaves all of the following false:

```yaml
candidateTrustRootFormatSemanticallyParsed: false
candidateKeyFormatSupportEstablished: false
candidateScopeCompatibilityVerified: false
trustRootAuthorityIdentityVerified: false
trustRootArtifactSemanticContentVerified: false
trustRootKeyPinnedByExternalGovernance: false
eyePairCriterionScopeVerified: false
witnessAuthorityScopeVerified: false
prospectiveValidityBindingVerified: false
captureToWitnessBindingVerified: false
actualTrustRootProvisioned: false
externalWitnessAuthorityEstablished: false
actualWitnessCredentialAdmitted: false
independentSessionEvidenceAdmitted: false
```

A caller-supplied reference, a matching byte digest, a self-signed/synthetic credential, or a mathematically valid signature remains insufficient to establish an independently governed witness trust path.

## Why byte identity is not trust

The exact digest check proves one mechanical proposition: the bytes presented to the FR168 intake are the bytes identified by the caller-declared digest.

It does not prove:

- who governs those bytes;
- whether their format is supported by the future production verifier;
- whether their semantic content represents the claimed authority;
- whether an external governance process pinned the relevant key/root;
- whether the candidate is authorized for the eye-pair criterion;
- whether the witness is authorized for the relied-upon statement;
- whether the candidate was valid prospectively at capture time;
- whether any future capture was actually bound to a witnessed event.

Those are later governance/verification boundaries.

## Prospective-only boundary

Existing FR163/FR164/FR165 Sessions 1–3 remain descriptive caller-grouped recurrence observations. FR168 does not retrospectively promote them.

```yaml
existingFR163ToFR165SessionsRetrospectivelyPromotable: false
newParticipantCaptureRequiredForCandidateMaterialIntake: false
authorityPromotableCaptureAllowedAfterCandidateIntakeAlone: false
candidateIntakeMayBeCompletedWithoutParticipantMaterial: true
```

Authority-promotable participant collection remains paused after FR168 candidate intake alone.

## Synthetic fixtures

FR168 tests use synthetic trust-root bytes and synthetic opaque references solely to verify deterministic fail-closed mechanics. These fixtures do not provision an external production trust root, verify any real authority, authorize a witness, or admit an independent session.

## Privacy boundary

FR168 accepts no raw participant image, participant-derived numeric metric input, source-image digest, raw provider response, landmark set, full derived geometry, face embedding, identity template, exact capture timestamp, geolocation, or device identifier.

Candidate trust-root artifact bytes are accepted transiently for exact byte-identity verification and are omitted from the issued output. The trust-root artifact digest may be retained because it identifies external trust material, not a participant face image.

## Authority state after successful intake

```yaml
candidateExternalTrustRootMaterialIntakePerformed: true
actualTrustRootProvisioned: false
actualWitnessCredentialAdmitted: false
externalWitnessAuthorityEstablished: false
independentSessionEvidenceAdmitted: false
multiSessionIndependenceVerified: false
empiricalRepeatabilityEstablished: false
captureQualityValidated: false
inferentialStatisticIssued: false
repeatabilityPassFailIssued: false
captureSensitivityPassFailIssued: false
calibrationIssued: false
thresholdsIssued: false
identityMatchingPerformed: false
biometricTemplateIssued: false
constructValidity: unresolved
traditionalBinding: unresolved
traditionalSemanticAuthority: false
```

## Next frontier

`verify_eye_pair_external_governance_authority_semantic_trust_root_scope_and_key_pinning_before_authority_promotable_session_collection`

The next authority step must verify the real external governance authority identity, semantic trust-root material, externally governed key pinning, eye-pair scope, witness-authority scope, prospective validity binding, and capture-to-witness verification path. FR168 candidate intake alone is not permission to collect or admit authority-promotable sessions.
