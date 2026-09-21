# FR232 — Authority-Chain-Bound Witness Signatures

Status: implementation candidate  
Contract: `FR232-AUTHORITY-CHAIN-BOUND-WITNESS-SIGNATURE-v1`

## Purpose

FR230 forces FR228 witness signatures to use verifier keys admitted by active FR229.

FR231 separately requires every FR229 registrar key to carry a canonical Ed25519 attestation from a caller-pinned external authority key.

FR232 closes the composition gap between those two active artifacts:

```text
FR228 witness signature
→ FR229 verifier enrollment
→ FR231 registrar authority attestation
```

must be represented as one exact technical chain.

This is a chain-of-custody constraint. It is not an independent real-world identity or trust determination.

## Exact input boundary

FR232 consumes only:

- an active FR230 enrollment-bound witness-signature verification;
- an active FR231 external-authority registrar registry.

Both active-runtime assertions are mandatory before any provenance is composed.

## Shared FR229 provenance

FR230 records:

```text
sourceVerifierKeyRegistryRef
sourceVerifierKeyRegistryDigest
```

FR231 records:

```text
sourceFR229RegistryRef
sourceFR229RegistryDigest
```

FR232 requires both pairs to be byte-for-byte equal.

A valid FR230 artifact from one FR229 registry cannot be combined with a valid FR231 artifact from another registry.

## Registrar mapping boundary

For every registrar used by the FR230 witness path, FR232 requires the corresponding FR231 receipt to match:

```text
registrarRef
+
registrarKeyRef
+
registrarPublicKeyDigest
```

The FR232 path also requires exact registrar coverage between the active FR230 witness path and the active FR231 authority registry.

Missing, extra, duplicate, inconsistent, or drifted registrar mappings are rejected.

## Bound provenance

Each FR232 receipt binds the witness-side provenance:

- witnessRef;
- verifierRef;
- verifier keyRef and public-key digest;
- witness signatureRef;
- witness envelope digest;
- verifier enrollment certificateRef;
- registrarRef, registrarKeyRef, registrar public-key digest;

to the FR231 authority-side provenance:

- authorityRef;
- authorityKeyRef;
- authority public-key digest;
- registrar authority certificateRef;
- registrar authority attestation-envelope digest.

This makes the technical dependency explicit and deterministic.

## What FR232 may state

A successful FR232 verification may state:

- the FR230 artifact was issued by the active FR230 runtime;
- the FR231 registry was issued by the active FR231 runtime;
- both artifacts bind to the exact same FR229 registry ref and digest;
- the registrar mapping in the witness path exactly matches the FR231 authority-attested mapping;
- the witness signature was previously cryptographically verified by FR230 against the exact FR229-enrolled verifier key;
- the registrar authority signature was previously cryptographically verified by FR231 against the caller-pinned authority key;
- the resulting technical chain provenance is deterministically committed by FR232.

These are technical statements only.

## What FR232 may not state

FR232 does not establish:

- authority real-world identity;
- authority independence;
- registrar real-world identity;
- registrar independence;
- verifier real-world identity;
- verifier independence;
- real-world signing-key ownership;
- independently authenticated public-key provenance beyond the caller-pinned authority;
- current validity;
- revocation status;
- witness-claim truth;
- external-evidence provenance;
- external-evidence substantive sufficiency;
- reviewer human status;
- reviewer independence;
- capture freshness;
- same-participant identity;
- capture quality;
- empirical repeatability;
- repeat-capture stability;
- empirical sufficiency;
- calibration;
- transition zones;
- thresholds;
- classifiers;
- traditional face-reading bindings;
- production activation;
- commerce activation.

A longer cryptographic chain does not convert opaque references or caller-pinned keys into independently verified real-world identities.

## Runtime authority guard

FR232 accepts only active-runtime FR230 and FR231 artifacts.

Persisted or reconstructed clones are rejected by their source runtime guards.

FR232 results also have their own active-runtime guard; persisted or reconstructed FR232 clones are not accepted as active FR232 authority.

## Deterministic provenance

The FR232 verification digest commits to:

- FR232 contract version;
- study gate ref and digest;
- source FR230 verification ref and digest;
- source FR231 registry ref and digest;
- shared FR229 registry ref and digest;
- sorted FR232 receipts.

## CI meaning

FR232 CI uses ephemeral synthetic Ed25519 verifier, registrar, and authority keys.

It verifies only mechanics:

- active FR230 prerequisite;
- active FR231 prerequisite;
- exact shared FR229 provenance;
- exact registrar mapping composition;
- witness/enrollment/authority certificate provenance binding;
- cross-registry rejection;
- active-runtime clone rejection.

Synthetic CI does not verify any human, organization, capture, morphology, empirical, traditional-interpretation, production, or commerce fact.

## Next frontier

FR232 makes the technical witness → verifier enrollment → registrar authority-attestation chain mandatory.

The remaining trust root is still caller supplied:

```text
caller-pinned external authority key
!=
independently authenticated real-world trust anchor
```

A later stage may define a trust-anchor evidence/admission boundary for authority keys.

That stage must not infer authority identity, organizational independence, current validity, revocation status, claim truth, empirical sufficiency, calibration, or production authority merely from another certificate layer.
