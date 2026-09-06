# FR157 — Square/Broad Fang external trust-root material intake

## Status

**Candidate external trust-root material byte intake only.**

FR157 is downstream of the frozen FR156 external witness trust-root provisioning protocol. It introduces a bounded intake boundary for one candidate trust-root artifact and verifies only the exact byte identity supplied at intake. It does not establish an external governance authority, a governed trust root, a trusted witness, or an independent capture session.

## What FR157 may establish

FR157 may state only that:

- an active process-local FR156 protocol object was supplied;
- one bounded candidate trust-root material record was supplied;
- the candidate trust-root artifact bytes matched the caller-declared canonical SHA-256 artifact identity;
- the issued output retained bounded references and digests while omitting the artifact bytes;
- a deterministic digest over the bounded candidate coordinates was materialized.

The candidate coordinate digest is an inventory identifier for this bounded record. It is not a source-face-image digest and it is not a trust decision.

## What FR157 explicitly does not establish

FR157 does **not** establish any of the following:

- external governance authority identity;
- trust-root authority identity verification;
- semantic verification of the trust-root artifact;
- externally governed trust-root key pinning;
- trust-root validity or revocation status;
- signer-chain policy validity;
- governance of a semantic trust-evidence verifier;
- production witness verification algorithm;
- pinned witness trust-root reference;
- trust-evidence issuer identity or trust;
- signer-to-witness-authority binding;
- signer-key trust;
- witness-authority trust;
- external witness identity;
- prospective capture execution;
- independent session separation;
- independent-session evidence admission;
- capture-quality construct validity or thresholds;
- empirical repeatability;
- traditional-semantic authority.

A caller-supplied authority reference, authority-evidence reference, policy reference, semantic-verifier reference, or key-pinning-evidence reference remains an opaque coordinate until a later governed boundary verifies its semantics and authority.

## Why byte identity is not trust

Matching bytes to a declared digest answers only a mechanical question: *are these the bytes the caller declared?* It does not answer who governs those bytes, whether the claimed issuer is authentic, whether the artifact has the claimed semantic structure, whether a key is externally pinned, or whether any policy is authoritative.

Therefore all of the following remain invalid trust shortcuts:

- caller-provided authority or root references;
- caller-provided policy references;
- byte-digest equality by itself;
- self-signed or synthetic credentials;
- mathematically valid signatures without a governed trust root;
- FR154 mechanical signature success;
- FR155 candidate witness trust evidence;
- historical FR146/FR147 capture material;
- retrospective relabeling of historical captures as prospective independent sessions.

## Synthetic tests are not external authority

The FR157 tests use synthetic trust-root artifact bytes and synthetic opaque references solely to exercise deterministic fail-closed behavior. Passing those tests proves only that the software enforces its declared intake mechanics. Synthetic fixtures do not provision a trust root, verify an external authority, or satisfy FR152 prospective-session requirements.

## Privacy boundary

FR157 accepts no raw face image, source-image digest, raw provider response, face geometry, embeddings, identity templates, exact capture timestamp, geolocation, or device identifier.

Candidate trust-root artifact bytes are accepted transiently for byte-identity verification and are not retained in the issued output. The trust-root artifact digest may be retained because it identifies external trust material rather than a private source face image.

## Authority state after successful intake

A successful FR157 intake still leaves:

```yaml
externalTrustRootMaterializationPerformed: false
externalTrustRootProvisioned: false
governedWitnessTrustRootEstablished: false
trustRootAuthorityIdentityVerified: false
trustRootArtifactSemanticContentVerified: false
trustRootKeyPinnedByExternalGovernance: false
semanticTrustEvidenceVerificationPerformed: false
productionWitnessVerificationAlgorithm: null
pinnedWitnessTrustRootRef: null
signerKeyTrustEstablished: false
witnessAuthorityTrustBound: false
externalWitnessIdentityVerified: false
independentMultiSessionEvidenceAcquired: false
independentMultiSessionEvidenceAdmitted: false
multiSessionIndependenceVerified: false
captureQualityMeasurementConstructValidated: false
captureQualityThresholdsDefined: false
captureQualityValidated: false
repeatabilityInterpretationAllowed: false
empiricalRepeatabilityEstablished: false
numericCaptureQualityThreshold: null
numericRepeatabilityAcceptanceThreshold: null
constructValidity: unresolved
traditionalBinding: unresolved
traditionalSemanticAuthority: false
```

## Next frontier

The next frontier is external governance authority identity verification, semantic trust-root verification, and externally governed key pinning, while separately executing genuinely new source-backed prospective sessions under FR152. No independent-session admission is permitted before both trust governance and prospective-session evidence are actually satisfied.
