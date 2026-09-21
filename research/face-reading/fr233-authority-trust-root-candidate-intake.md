# FR233 — Authority Trust-Root Candidate Material Intake

Status: implementation candidate  
Contract: `FR233-AUTHORITY-TRUST-ROOT-CANDIDATE-INTAKE-v1`

## Purpose

FR232 makes the following technical chain mandatory:

```text
FR228 witness signature
→ FR229 verifier enrollment
→ FR231 registrar authority attestation
→ FR232 composed authority chain
```

The remaining root is still a caller-pinned FR231 authority key.

FR233 does not pretend that another synthetic certificate can solve that trust problem. Instead, it creates the bounded candidate-material intake needed before a later external-governance admission stage can evaluate a real trust-root source.

## Exact predecessor boundary

FR233 accepts only an object issued by the active FR232 runtime.

A persisted or reconstructed FR232 clone is rejected before candidate material is considered.

For every distinct authority used by the FR232 witness path, FR233 derives the exact mapping:

```text
authorityRef
+
authorityKeyRef
+
authorityPublicKeyDigest
```

## Exact candidate coverage

FR233 requires exactly one candidate trust-root material record per distinct FR232 authority mapping.

Each candidate must repeat the exact FR232 authority coordinates and provide:

- a unique trust-root candidate ref;
- a unique trust-root artifact ref;
- a declared canonical SHA-256 artifact digest;
- bounded trust-root artifact bytes supplied transiently at intake;
- an authority-identity evidence ref;
- an external key-pinning evidence ref;
- a trust-root policy ref;
- a validity-policy ref;
- a revocation-status-policy ref;
- a semantic-verifier ref.

Missing, extra, duplicate, or drifted authority coverage fails closed.

## Byte-identity boundary

Candidate artifact bytes must be between 1 byte and 1 MiB.

FR233 recomputes SHA-256 over the supplied bytes and requires exact equality with the declared canonical digest.

The issued artifact retains only the digest and bounded coordinates. Raw candidate bytes are omitted.

This establishes only:

```text
bytes presented at intake
==
bytes identified by the retained candidate digest
```

It does not establish that those bytes are a valid trust root.

## Why FR233 does not provision external trust

FR168/FR169 already established the relevant precedent in the eye-pair track: candidate byte identity and opaque governance references are inventory mechanics, not external authority.

Accordingly, FR233 leaves all of the following false:

- trust-root format semantically parsed;
- trust-root semantic content verified;
- authority real-world identity verified;
- authority independence verified;
- authority key pinned by external governance;
- real-world signing-key ownership verified;
- public-key provenance independently authenticated;
- current validity independently checked;
- revocation status independently checked;
- external trust root provisioned;
- witness claim independently established.

A digest match, caller-supplied evidence ref, policy ref, verifier ref, or synthetic fixture cannot promote any of those facts.

## Bound provenance

The FR233 intake digest commits to:

- FR233 contract version;
- source FR232 verification ref and digest;
- sorted candidate receipts.

Each receipt commits the exact FR232 authority key mapping to the candidate artifact digest and governance-evidence coordinates.

## Runtime authority guard

FR233 results are active-runtime artifacts.

Persisted or reconstructed clones cannot be asserted as active FR233 authority.

## CI meaning

Dedicated FR233 CI uses synthetic witness, verifier, registrar, authority, and candidate trust-root material.

It proves only mechanics:

- active FR232 prerequisite;
- exact authority coverage;
- exact authorityRef/keyRef/public-key-digest binding;
- bounded candidate bytes;
- exact candidate byte digest;
- raw candidate-byte omission;
- missing/extra/drift rejection;
- runtime-clone rejection.

Synthetic CI does not establish external governance, real-world identity, key ownership, current validity, revocation, claim truth, capture facts, empirical sufficiency, calibration, traditional interpretation, production, or commerce authority.

## Next frontier

FR233 creates candidate material inventory only.

The next useful stage is an **external governance trust-root admission requirements boundary** for these exact FR233 candidates. It should freeze the checks that a later real external source must satisfy, including:

- independently governed verifier/source;
- authority identity evidence verification;
- semantic trust-root parsing;
- supported key-format verification;
- external key-pinning verification;
- validity-policy verification;
- revocation/status verification;
- exact authority scope;
- exact binding to the FR233 candidate digest.

Until such checks are executed against genuinely external authoritative material, `externalTrustRootProvisioned` must remain false.
