# FR171 — Eye-Pair Prospective C2PA Witness Credential Admission Readiness

## Status

FR171 freezes the participant-media admission contract that follows FR170 trust-root provisioning. It is intentionally a **readiness artifact only**. No participant Content Credential has been supplied or admitted by this artifact, and Issue #492 remains open until a genuine new prospective capture is verified.

## Authoritative predecessor

FR171 requires an actively issued FR170 artifact from the current runtime. The predecessor must retain the exact external governance path already admitted by FR170:

```text
repository = c2pa-org/conformance-public
commit = 6273cdcb4f273c7556e74f93825a7a3df87869fb
trust-list blob = f22c13252df991f43bca58634d966dcf1b29c089
conforming-products blob = 256d9881337be86e4639606dd5aa2bf2a4189d03
```

FR170 must already have established external governance verification, trust-root provisioning, and the governed witness trust root while leaving participant-media witness/session authority false.

## Real evidence required next

Authority cannot advance from synthetic fixtures or repository-generated credentials. The next authority-producing execution requires one genuinely new prospective original JPEG carrying an intact C2PA Content Credential generated through one of the pinned conforming Proofmode profiles:

```text
Proofmode for Android
recordId = 019876c6-8379-73d1-9f3b-c6c5a880f6d9
minimum version = 3.0.0

Proofmode for iOS
recordId = 019dfe5f-40cc-7cfb-8082-96ba7548bfbd
minimum version = 3.0.0
```

The following are explicitly insufficient:

- ordinary camera output without the governed Content Credential;
- screenshot of a credential viewer;
- recompressed or transformed export whose original binding is no longer verifiable;
- caller/project-generated manifest or signing key;
- synthetic fixture;
- any Session 1-3 artifact from FR163-FR165.

## Verification contract frozen by FR171

A future runtime admission implementation must fail closed unless it verifies all of the following against the FR170 provisioned path:

1. a bounded media resource policy has been issued before runtime media ingestion;
2. the submitted asset is the required JPEG container and actually carries an embedded Content Credential;
3. the C2PA manifest/claim is semantically parseable by the governed verifier;
4. exact asset/content binding and integrity validation succeeds;
5. the signer certificate chain validates against the pinned C2PA Trust List under the applicable validity/revocation policy;
6. generator identity/profile is compatible with the pinned Proofmode Android/iOS conforming-product record and minimum-version policy;
7. the witness credential is bound to the exact prospective capture, not merely presented alongside it;
8. the admitted evidence is session-specific and cannot retroactively promote FR163-FR165;
9. same-person continuity remains caller/user attestation only and is never inferred biometrically.

FR171 deliberately does **not** issue a concrete media byte limit. The production admission runtime must establish that resource boundary before accepting participant media; choosing such a limit without the runtime ingress context would be an invented operational threshold.

## Authority state

FR171 preserves the following trust-root gains from FR170:

```text
actualExternalGovernanceVerificationPerformed = true
actualTrustRootProvisioned = true
governedWitnessTrustRootEstablished = true
```

It keeps all participant-media/session gates false:

```text
actualWitnessCredentialAdmitted = false
captureToWitnessBindingVerifiedForParticipantMedia = false
signerKeyTrustEstablishedForParticipantMedia = false
witnessAuthorityTrustBoundForParticipantMedia = false
externalWitnessAuthorityEstablishedForParticipantMedia = false
semanticTrustEvidenceVerificationPerformedForParticipantMedia = false
independentSessionEvidenceAdmitted = false
```

It also keeps all higher authority false:

```text
multiSessionIndependenceVerified = false
empiricalRepeatabilityEstablished = false
captureQualityValidated = false
inferentialStatisticIssued = false
repeatabilityPassFailIssued = false
captureSensitivityPassFailIssued = false
calibrationIssued = false
thresholdsIssued = false
identityMatchingPerformed = false
biometricTemplateIssued = false
traditionalSemanticAuthority = false
```

## Privacy boundary

This readiness artifact accepts no participant image, no raw Content Credential, no source-image digest, no landmarks, no derived geometry, no exact capture timestamp, no geolocation, no device identifier, no face embedding, and no identity template.

The later real admission implementation may process the original media and credential only under an explicit evidence-binding/privacy policy. Any retained digest must be justified solely as a non-biometric exact-evidence coordinate and must never be repurposed as an identity identifier.

## CI meaning

The dedicated FR171 CI may use the immutable public C2PA governance snapshot to reconstruct the actively issued FR170 predecessor and test FR171 readiness issuance. It must not use synthetic participant media to exercise a witness-admission success path. A green FR171 readiness CI therefore means the admission contract is fail-closed and correctly chained to FR170; it does **not** mean a participant credential has been admitted.

## Next frontier

```text
supply_genuine_new_prospective_original_proofmode_jpeg_with_intact_content_credential_then_verify_manifest_signer_chain_content_binding_and_session_admission
```

Issue #492 remains open until that real-evidence path succeeds.
