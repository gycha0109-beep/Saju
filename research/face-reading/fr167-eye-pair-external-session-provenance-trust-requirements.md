# FR167 — Eye-Pair External Session Provenance Trust Requirements

## Purpose

FR166 stops the eye-pair track from treating additional ordinary FR165 sessions as authority-producing work. The real unresolved blocker is whether a future session can carry externally governed provenance strong enough to be considered for **independent-session admission**.

FR167 freezes the requirements for that path. It does **not** provision a trust root, admit a witness credential, or promote any existing participant session.

No participant image or participant-derived numeric measurement is required to perform this governance step.

## Prospective-only boundary

FR167 applies only to a future collection path established before the authority-promotable capture occurs.

Existing FR163/FR164/FR165 Sessions 1–3 remain exactly what their original contracts allowed: caller-grouped, descriptive recurrence observations without independent-session proof. FR167 does not retroactively promote them.

```yaml
prospectiveApplicationRequired: true
existingFR163ToFR165SessionsRetrospectivelyPromotable: false
newParticipantCaptureRequiredToFreezeTheseRequirements: false
authorityPromotableCaptureAllowedBeforeTrustPathProvisionedAndReviewed: false
```

Ordinary FR165 collection may still be extended for descriptive research, but such a session does not acquire independent-session authority merely because FR167 exists.

## Required external provenance properties

A future eye-pair session considered for independent-session admission must be backed by a separately governed provenance path with all of the following frozen requirements:

1. **External/operator-independent witness** — the provenance authority cannot collapse to the same caller/operator who is asserting the session.
2. **Governed witness provenance** — the witness artifact must have a defined authority chain rather than merely containing an opaque identifier.
3. **Deterministic verification** — the evidence must have a reproducible verification procedure.
4. **Capture-to-witness binding** — the witnessed statement must be bound to the capture event/material under review rather than to an unrelated token.
5. **Independent trust-root provisioning** — the trust root must not become trusted merely because the caller supplied it with the evidence.
6. **Governance pinning** — the accepted root/material and authority scope must be frozen by a governed repository/protocol decision.
7. **Exact trust-material binding** — verification must resolve against the governed material actually admitted by that authority path.
8. **Eye-pair criterion scope binding** — the authority must explicitly cover the eye-pair prospective session path.
9. **Witness authority scope binding** — the witness must be authorized for the type of statement being relied upon.
10. **Prospective validity binding** — a validity window or equivalent prospective mechanism must prevent a later artifact from retroactively manufacturing independence for an earlier session.

FR167 freezes these as requirements only. Their presence is not asserted yet.

## Evidence that remains insufficient on its own

The following may be useful technical facts, but none independently establishes the required external trust relationship:

```yaml
byteDistinctCaptureAloneSufficient: false
metadataTimestampAloneSufficient: false
uploadSeparationAloneSufficient: false
callerSelfAttestationAloneSufficient: false
opaqueSessionRefAloneSufficient: false
callerSuppliedPublicKeyAloneSufficient: false
callerSuppliedTrustRootRefAloneSufficient: false
digestEqualityAloneSufficient: false
mathematicalSignatureValidityAloneSufficient: false
selfSignedCredentialAloneSufficient: false
syntheticCredentialAloneSufficient: false
candidateTrustRootMaterialIntakeMeansTrustedAuthority: false
```

A mathematically valid signature can show that some key signed some bytes. It does not by itself establish that the key belongs to an externally governed witness, that the witness had the required authority, or that the trust root was independently admitted by project governance.

Likewise, a timestamp or separately uploaded image can be consistent with multiple capture events without proving operator-independent session separation.

## FR152 / FR156 / FR157 precedent boundary

FR166 identified the square-broad-fang FR152/FR156/FR157 chain as useful design precedent:

- **FR152** rejects opaque refs, byte distinction, metadata timestamps, upload separation, and operator self-attestation as sufficient independent-session proof.
- **FR156** requires an externally governed witness trust-root path and rejects caller-supplied roots/keys, digest equality, self-signed or synthetic credentials, and mathematical signature validity as substitutes for governed trust.
- **FR157** permits candidate external trust-root material intake without claiming that material has already established trusted witness identity, external authority, or independent sessions.

FR167 generalizes those *requirements concepts* for the eye-pair track, but it does not inherit square-broad-fang authority or silently reuse any criterion-specific trust root.

```yaml
squareBroadFangArtifactsAreDesignPrecedentOnly: true
squareBroadFangAuthorityInheritedByEyePair: false
crossCriterionTrustRootReuseWithoutExplicitEyePairAdmissionAllowed: false
```

## What FR167 does not establish

FR167 freezes a requirements contract and nothing stronger:

```yaml
requirementsFrozen: true
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

No threshold may be derived from Sessions 1–3, and no existing session may be relabeled as independent because these requirements were documented later.

## Privacy boundary

FR167 accepts no raw image and no participant-derived numeric metric input. It persists no participant image, provider response, landmark set, full derived geometry, participant numeric measurement, source digest, exact capture timestamp, geolocation, device identifier, face embedding, or identity template.

This means the authority review can proceed without asking the participant to take another photo.

## Authority state

`eye_pair_external_session_provenance_trust_requirements_frozen_only`

## Next frontier

`provision_and_review_eye_pair_external_witness_trust_root_before_collecting_authority_promotable_sessions`

The next work is to build and review an actual eye-pair-scoped trust-root provisioning/admission path. Participant capture intended for authority promotion should remain paused until that path is genuinely established prospectively.
