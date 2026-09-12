# FR172 — Eye-Pair C2PA Production Verifier Runtime Integration

## Status

`pinned_c2pa_production_verifier_runtime_integrated_participant_execution_blocked_on_ingress_policy_and_real_media`

FR172 is a verifier-runtime integration boundary downstream of the issued FR171 witness-credential admission readiness artifact. It is **not** a participant witness-credential admission and it does not close Issue #492.

## Why FR172 exists

FR170 provisioned the independently governed C2PA trust-root/conforming-product path. FR171 froze the requirements for a genuinely new prospective Proofmode Content-Credential-bearing JPEG, but deliberately left the production verifier implementation unresolved.

FR172 closes only that code/runtime readiness gap. It pins an official `c2patool` release and the already-governed C2PA trust material so future private participant-media verification does not depend on caller-supplied JSON or an arbitrary executable.

## Official verifier pin

The verifier runtime is pinned to the official `contentauth/c2pa-rs` release:

```text
repository      = contentauth/c2pa-rs
tag             = c2patool-v0.27.22
target commit   = 1a56d244ee77d7e58221eabebede4281d9e868a4
linux archive   = c2patool-v0.27.22-x86_64-unknown-linux-gnu.tar.gz
archive sha256  = 6f138ad53da1a62f1cd6ee71c60727efa27d13b811f4c0ea8c2a8528968b358b
```

The dedicated CI downloads that exact official release archive, verifies the SHA-256 before extraction, executes the extracted binary, and checks the reported runtime version.

## C2PA governance pins inherited from FR170

```text
repository = c2pa-org/conformance-public
commit     = 6273cdcb4f273c7556e74f93825a7a3df87869fb

trust-list/C2PA-TRUST-LIST.json
  Git blob = f22c13252df991f43bca58634d966dcf1b29c089

trust-list/C2PA-TRUST-LIST.pem
  Git blob = a0d20f58270177608bd96fad331c8ba9a04820ad

conforming-products/conforming-products-list.json
  Git blob = 256d9881337be86e4639606dd5aa2bf2a4189d03
```

Proofmode scope remains exactly the FR171 scope:

- Android record: `019876c6-8379-73d1-9f3b-c6c5a880f6d9`
- iOS record: `019dfe5f-40cc-7cfb-8082-96ba7548bfbd`
- minimum version: `3.0.0`
- organization: `Proofmode Reality Systems LLC`

## Production verification requirements prepared by FR172

Future participant-media execution must use the pinned runtime path and require all applicable checks, including:

- embedded C2PA manifest parsing;
- claim-signature validation;
- exact asset/content binding;
- signer-chain validation against the pinned C2PA trust anchors;
- validity/revocation policy evaluation;
- Proofmode conforming-product identity/profile validation;
- minimum Proofmode version policy;
- prospective capture/session binding.

For a future participant credential to be authority-promotable, FR172 freezes at minimum:

```text
validation_state = Trusted
signingCredential.trusted present
assertion.dataHash.match present
```

These are necessary, not independently sufficient, because the unresolved ingress/resource and prospective-session binding requirements must also succeed.

## Caller-supplied output is not authority

A caller may not paste or manufacture `c2patool` JSON and have it treated as participant authority. Likewise, an arbitrary executable path that merely claims to be `c2patool` is not sufficient.

The dedicated CI demonstrates the immutable release pin and parser/runtime mechanics. A later real participant verifier path must preserve that pinned-execution provenance rather than accepting unissued structural lookalikes.

## Public mechanics fixture

FR172 uses only the official public c2pa-rs fixture for live parser/runtime mechanics:

```text
repo = contentauth/c2pa-rs
ref  = c2patool-v0.27.22
path = sdk/tests/fixtures/C.jpg
Git blob = b6579b3281fbd448163f77fe46bf8d24f3e5a018
```

This fixture may demonstrate that the exact binary parses a real embedded manifest and produces structured validation results. It **cannot** establish participant witness authority. An untrusted signing status on the public test fixture is acceptable mechanics evidence and is explicitly not promoted.

## Resource-boundary finding

Repository review found that both FR145 and FR161 validate a participant image as a non-empty in-memory `Blob`, but neither establishes a production maximum byte size. FR171 already states that a concrete media byte limit must not be invented without production ingress context.

Therefore FR172 freezes:

```text
inheritedProductionMediaMaximumBytes = null
productionIngressByteLimitResolved = false
arbitraryByteLimitInventedByFR172 = false
participantAuthorityExecutionAllowedBeforeGovernedIngressPolicy = false
```

This is intentional fail-closed behavior, not an implementation omission.

## Authority boundary

Even after FR172 verifier integration is complete:

```text
actualWitnessCredentialAdmitted = false
captureToWitnessBindingVerifiedForParticipantMedia = false
signerKeyTrustEstablishedForParticipantMedia = false
witnessAuthorityTrustBoundForParticipantMedia = false
externalWitnessAuthorityEstablishedForParticipantMedia = false
semanticTrustEvidenceVerificationPerformedForParticipantMedia = false
independentSessionEvidenceAdmitted = false
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

FR172 commits no participant media and accepts no participant media into its integration artifact. Public repository evidence contains no raw participant image, raw participant manifest, participant image digest, landmarks, derived full-face geometry, face embedding/template, device identifier, geolocation, or exact capture timestamp.

Future real verification must occur privately/transiently. Any retained evidence coordinate must be justified as non-biometric evidence binding and must not become an identity identifier.

## Issue #492

Issue #492 remains open. FR172 readiness does not satisfy its closure condition because no genuine new prospective Proofmode participant credential has been supplied or admitted.

## Next frontier

```text
resolve_governed_participant_media_ingress_resource_policy_then_supply_genuine_new_prospective_original_proofmode_jpeg_and_execute_pinned_verifier
```
