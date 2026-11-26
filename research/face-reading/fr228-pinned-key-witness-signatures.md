# FR228 — Pinned-Key Witness Signatures

Status: implementation candidate  
Contract: `FR228-PINNED-KEY-WITNESS-SIGNATURE-v1`

## Purpose

FR227 proves that actual external evidence bytes match the digest declared by FR225. It still does not cryptographically bind a witness statement and the inspected evidence digest to a signing key.

FR228 adds that cryptographic binding with detached Ed25519 signatures.

This stage proves signature validity against a caller-pinned public key. It does not prove the real-world identity or independence of the person controlling that key.

## Inputs

FR228 requires active-runtime:

- FR225 verified persisted witness evidence;
- FR227 external-evidence byte inspection.

The caller supplies:

- one pinned Ed25519 public key per `verifierRef`;
- one detached signature per `witnessRef`.

## Canonical signature envelope

For each witness, FR228 signs/verifies a deterministic envelope containing:

- FR228 contract version;
- FR224 study-gate ref + digest;
- FR225 witness-evidence ref + digest;
- FR227 inspection ref + digest;
- witness ref;
- verifier ref;
- claim type;
- scope ref;
- verification method;
- observed timestamp;
- FR225 witness-record digest;
- external evidence ref;
- declared external-evidence digest;
- inspected media type;
- inspected byte length;
- FR227 recomputed evidence digest.

This prevents a valid signature for one witness/evidence pair from being silently reused for another envelope.

## Pinned-key semantics

A successful verification may state:

- `signatureValid=true`;
- `signedEnvelopeBoundToPinnedKey=true`;
- `signingKeyPossessionDemonstrated=true`.

It must also state:

- `signingKeyOwnershipIndependentlyVerified=false`;
- `publicKeyProvenanceAuthenticated=false`;
- `verifierIdentityIndependentlyVerified=false`;
- `verifierIndependenceIndependentlyVerified=false`;
- `witnessClaimIndependentlyEstablished=false`.

The caller-supplied key is a technical trust anchor only.

## Rejections

FR228 rejects:

- missing signatures;
- extra signatures for unknown witnesses;
- duplicate signatures for one witness;
- duplicate signature refs;
- duplicate verifier-key mappings;
- duplicate key refs;
- verifier refs without a pinned key;
- malformed base64;
- malformed public keys;
- non-Ed25519 public keys;
- non-64-byte Ed25519 signatures;
- invalid signatures;
- FR225/FR227 source-binding drift.

## What a valid signature does not prove

A valid detached signature does not establish:

- that the pinned key belongs to the claimed human verifier;
- that the verifier is independent;
- how the public key was obtained;
- that the external evidence has authentic provenance;
- that the evidence substance supports the claim;
- that the witness claim is true;
- reviewer human status;
- reviewer independence;
- capture freshness;
- same-participant identity;
- capture quality;
- metric repeatability;
- empirical sufficiency.

## Authority boundary

FR228 keeps false:

- valid signature means verifier identity verified;
- valid signature means verifier independent;
- valid signature means key ownership verified;
- valid signature means claim true;
- valid signature means evidence provenance authentic;
- verifier identity independently verified;
- verifier independence independently verified;
- signing-key ownership independently verified;
- public-key provenance authenticated;
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

CI generates ephemeral Ed25519 key pairs and synthetic witness/evidence payloads only to prove:

- canonical envelope construction;
- Ed25519 verification mechanics;
- wrong-key rejection;
- missing/extra signature rejection;
- pinned-key mapping rejection;
- active FR227 authority requirement;
- no-authority semantics.

Ephemeral CI keys are not real verifier identities.

## Next frontier

FR228 closes cryptographic binding to a caller-pinned key, but not key provenance.

A later stage may introduce a governed trust-anchor admission process that records how a verifier key was enrolled and independently witnessed. Such enrollment must still remain separate from substantive adjudication of whether the witness claim is empirically true.
