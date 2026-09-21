# FR230 — Enrollment-Bound Witness Signatures

Status: implementation candidate  
Contract: `FR230-ENROLLMENT-BOUND-WITNESS-SIGNATURE-v1`

## Purpose

FR228 verifies canonical witness/evidence envelopes with Ed25519 signatures, but its API accepts a caller-supplied verifier-key array.

FR229 adds a technical verifier-key enrollment ceremony under a distinct registrar and binds each admitted verifier key to a caller-pinned registrar key.

FR230 closes the remaining verifier-key substitution gap in the witness-signature path:

> FR228 verification is re-run only with verifier keys that exactly match an active FR229 registry.

FR230 does not add empirical authority. It strengthens technical chain-of-custody.

## Exact binding

FR230 consumes:

- active FR225 persisted witness evidence;
- active FR227 external-evidence byte inspection;
- an active FR229 verifier-key registry;
- verifier public-key material;
- FR228 detached witness signatures.

The caller does **not** provide an independent FR228 pinned-key array.

FR230 derives that array internally after exact FR229 matching.

For every verifier key, FR230 requires:

```text
verifierRef
+
keyRef
+
SHA-256(public-key DER)
```

to match the corresponding active FR229 enrollment receipt.

Missing, extra, duplicate, or drifted key material is rejected.

## Why key material is supplied separately

FR229 receipts intentionally preserve the verifier public-key digest rather than copying public-key bytes into the receipt.

FR230 therefore accepts public-key material only as transport material and recomputes its digest.

The bytes become usable for FR228 only when:

```text
supplied key bytes
→ canonical base64 decode
→ SHA-256
→ exact FR229 receipt digest
→ exact verifierRef/keyRef
```

all match.

This does not make the caller a key authority.

## FR228 re-verification

After key admission:

1. FR230 constructs the FR228 pinned-key set internally.
2. FR228 re-verifies every witness signature against that derived key set.
3. FR230 checks every FR228 receipt against the corresponding FR229 receipt.
4. FR230 binds the resulting receipt to the FR229 registrar/certificate provenance.

Therefore the FR230 path has no independent caller-controlled FR228 pinned-key bypass.

## What FR230 may state

A successful FR230 receipt may state:

- the witness signature is cryptographically valid;
- the signature was verified against the exact verifier key admitted by active FR229;
- verifierRef and keyRef match the FR229 enrollment;
- verifier public-key digest matches the FR229 enrollment;
- FR229 previously demonstrated possession of that verifier private key during enrollment;
- that enrollment was bound to a caller-pinned registrar key.

These are technical cryptographic statements only.

## What FR230 may not state

FR230 does not establish:

- registrar real-world identity;
- registrar independence;
- verifier real-world identity;
- real-world ownership of the signing key;
- independently authenticated public-key provenance beyond the caller-pinned registrar;
- current key validity;
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
- empirical sufficiency.

A cryptographic enrollment chain is not an independent identity-verification chain.

## Integrity boundary

FR230 requires:

- active-runtime FR229 registry;
- full key-material coverage of that registry;
- exact verifierRef matching;
- exact keyRef matching;
- exact public-key digest matching;
- no missing key material;
- no extra key material;
- no duplicate verifier key material;
- no duplicate keyRef;
- internally derived FR228 pinned keys;
- no independent FR228 pinned-key input;
- active FR228 verification result;
- witness signatures reverified against enrolled keys.

## Authority boundary

The following remain false:

- enrollment binding means registrar identity verified;
- enrollment binding means registrar independent;
- enrollment binding means verifier identity verified;
- enrollment binding means real-world key ownership verified;
- enrollment binding means claim true;
- registrar identity independently verified;
- registrar independence independently verified;
- verifier identity independently verified;
- verifier independence independently verified;
- signing-key ownership independently verified;
- public-key provenance independently authenticated;
- current validity independently checked;
- revocation status independently checked;
- witness claim independently established;
- external-evidence provenance authenticated;
- external-evidence substance independently adjudicated;
- reviewer human status independently verified;
- reviewer independence independently verified;
- capture freshness independently verified;
- same-participant identity independently verified;
- capture quality validated;
- empirical repeatability established;
- repeat-capture stability established;
- empirical sufficiency established;
- calibration authorized;
- transition zone issued;
- threshold issued;
- classifier issued;
- traditional binding issued;
- production activated;
- commerce activated.

## CI meaning

FR230 CI uses ephemeral synthetic verifier and registrar key pairs.

It verifies only mechanics:

- FR229 active-registry admission;
- exact verifierRef/keyRef/public-key digest binding;
- key-material drift rejection;
- missing/extra key-material rejection;
- FR228 signature re-verification using internally derived keys;
- active-runtime guard behavior.

Synthetic CI does not verify any human, organization, capture, or empirical fact.

## Next frontier

FR230 closes verifier-key substitution between FR229 and FR228.

The remaining key-trust gap is now upstream:

```text
caller-pinned registrar key
!=
independently authenticated registrar identity/key authority
```

A later stage may define an external registrar trust-anchor / authority-chain evidence boundary.

That later stage must still separate:

```text
technical certificate-chain integrity
```

from:

```text
real-world identity
organizational independence
claim truth
empirical sufficiency
```

and must not create calibration or production authority without actual external evidence.
