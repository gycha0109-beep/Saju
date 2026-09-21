# FR231 — External Authority Registrar Attestations

Status: implementation candidate  
Contract: `FR231-EXTERNAL-AUTHORITY-REGISTRAR-ATTESTATION-v1`

## Purpose

FR229 admits verifier keys under registrar signatures, but each registrar key is still caller-pinned.

FR230 removes the independent verifier-key substitution path by forcing FR228 witness-signature verification to use the exact verifier keys admitted by FR229.

The remaining upstream trust gap is therefore:

```text
caller-pinned registrar key
!=
registrar key cryptographically attested by a distinct external authority
```

FR231 adds only that technical authority-attestation layer.

It does **not** claim that the external authority is a real-world organization, that the authority is independent, or that the registrar identity is independently verified.

## Exact input boundary

FR231 consumes:

- an active FR229 verifier-key registry;
- caller-pinned external authority public keys;
- one signed registrar-key attestation for every distinct registrar mapping used by FR229.

For each distinct registrar, the attestation must exactly match:

```text
registrarRef
+
registrarKeyRef
+
FR229 registrarPublicKeyDigest
```

The authority statement additionally binds:

```text
authorityRef
+
authorityKeyRef
+
certificateRef
+
attestedAt
+
validFrom
+
validUntil
```

The authority signature is Ed25519 over the canonical FR231 envelope.

## Exact coverage

FR231 derives the registrar set from the active FR229 registry.

The submitted attestations must cover that set exactly:

- no missing registrar;
- no extra registrar;
- no duplicate registrar attestation;
- no registrar keyRef drift;
- no registrar public-key digest drift;
- no duplicate certificateRef.

This prevents a caller from presenting a valid authority signature for a different registrar key and treating it as coverage for the FR229 chain.

## Pinned authority semantics

FR231 verifies every authority signature against an explicitly supplied caller-pinned authority key.

The authority public-key digest is recomputed from canonical DER bytes and recorded in the FR231 receipt.

This proves only:

```text
the exact caller-pinned authority key
signed
the exact canonical registrar-key attestation
```

It does not prove:

```text
who controls that authority key in the real world
whether that authority is independent
whether its policy is trustworthy
whether the registrar is the claimed person or organization
```

Therefore FR231 intentionally keeps independent identity and provenance authority false.

## Validity-window semantics

FR231 requires `attestedAt` to fall within the attestation's declared `validFrom` / `validUntil` window.

It does **not** compare that window to current wall-clock time.

Therefore:

- attestation timestamp within declared window: mechanically checked;
- current validity: not independently checked;
- revocation: not checked.

## What FR231 may state

A successful FR231 registry may state:

- the source FR229 registry is active in the current runtime;
- every distinct FR229 registrar mapping is covered exactly once;
- registrarRef, registrarKeyRef, and registrar public-key digest match FR229;
- the external authority signature is cryptographically valid;
- the authority public-key digest was recomputed from the caller-pinned key;
- authorityRef and registrarRef are distinct opaque references;
- attestedAt falls inside the declared validity window.

These are cryptographic and structural statements only.

## What FR231 may not state

FR231 does not establish:

- authority real-world identity;
- authority independence;
- registrar real-world identity;
- registrar independence;
- verifier real-world identity;
- verifier independence;
- real-world signing-key ownership;
- public-key provenance independently authenticated beyond the caller-pinned authority;
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

A longer certificate chain is still not independent real-world identity evidence unless an actual independently authenticated trust anchor exists.

## Runtime authority guard

FR231 registries are accepted as active authority only when issued by the current FR231 runtime.

Persisted or reconstructed clones are rejected.

The source FR229 registry must likewise be active in the current FR229 runtime.

## Deterministic provenance

The FR231 registry digest commits to:

- FR231 contract version;
- source FR229 registryRef;
- source FR229 registryDigest;
- sorted FR231 receipts.

Each receipt commits to:

- exact FR229 registrar mapping;
- authority mapping;
- authority public-key digest;
- certificateRef;
- canonical attestation-envelope digest.

## CI meaning

FR231 CI uses ephemeral synthetic Ed25519 keys.

It verifies only mechanics:

- active FR229 prerequisite;
- exact registrar coverage;
- registrar keyRef/digest drift rejection;
- authority Ed25519 signature verification;
- missing/extra mapping rejection;
- authority/registrar opaque-reference separation;
- active-runtime clone rejection.

Synthetic CI does not verify any human, organization, capture, morphology, empirical, or traditional-interpretation fact.

## Next frontier

FR231 creates an external-authority attestation registry, but FR230 does not yet require it.

The next useful stage is therefore to bind the FR230 witness-signature verification path to an active FR231 registry so that:

```text
FR228 witness signature
→ FR229 verifier enrollment
→ FR231 registrar authority attestation
```

is enforced as one technical chain.

That later stage must still keep authority identity, registrar identity, independence, claim truth, empirical sufficiency, calibration, production, and commerce authority false unless separately established by real external evidence.
