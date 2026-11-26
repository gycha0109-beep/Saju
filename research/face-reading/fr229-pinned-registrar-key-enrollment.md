# FR229 — Pinned-Registrar Verifier Key Enrollment

Status: implementation candidate  
Contract: `FR229-PINNED-REGISTRAR-VERIFIER-KEY-ENROLLMENT-v1`

## Purpose

FR228 validates witness signatures against caller-pinned verifier keys, but it does not govern how the verifierRef → key mapping was enrolled.

FR229 adds a technical enrollment ceremony:

1. the verifier proves possession of the private key corresponding to the proposed Ed25519 public key;
2. a distinct registrar signs a canonical enrollment certificate;
3. the registrar signature is checked against a caller-pinned registrar public key.

This creates cryptographic provenance **to the pinned registrar key**. It does not establish the registrar's real-world identity or independence.

## Canonical possession challenge

The verifier signs a deterministic challenge containing:

- FR229 contract version;
- purpose tag;
- verifier ref;
- verifier key ref;
- verifier public-key digest;
- registrar ref;
- registrar key ref;
- certificate ref;
- enrollment timestamp;
- declared validity window.

A successful check means only that the party producing the enrollment had possession of the private key corresponding to the enrolled verifier public key at signing time.

## Canonical enrollment certificate

The registrar signs a deterministic certificate containing:

- the enrollment identifiers and timestamps;
- verifier public-key digest;
- verifier possession challenge digest;
- verifier possession signature digest.

This binds the registrar's signature to the exact verifier key and exact possession proof.

## Admission requirements

FR229 requires:

- Ed25519 verifier and registrar keys;
- one active enrollment per verifier ref;
- unique verifier key refs;
- unique certificate refs;
- one caller-pinned key per registrar ref;
- unique registrar key refs;
- verifierRef and registrarRef must differ;
- parseable validity timestamps;
- enrollment timestamp inside the declared validity interval;
- valid verifier possession signature;
- valid registrar certificate signature.

## What FR229 may state

A successful receipt may state:

- verifier key possession demonstrated;
- verifier possession signature valid;
- registrar signature valid;
- registrar ref distinct from verifier ref;
- enrollment bound to the caller-pinned registrar key;
- enrollment timestamp within the declared validity window.

## What FR229 may not state

FR229 does not establish:

- registrar real-world identity;
- registrar independence;
- verifier real-world identity;
- real-world ownership of the signing key;
- independent authentication of public-key provenance beyond the caller-pinned registrar;
- current key validity;
- revocation status;
- witness-claim truth;
- evidence provenance;
- substantive evidence adjudication;
- reviewer human status;
- reviewer independence;
- capture freshness;
- same-participant identity;
- capture quality;
- metric repeatability;
- empirical sufficiency.

A distinct registrar ref is a structural separation only. It is not proof of organizational or human independence.

## Validity and revocation boundary

FR229 checks only that `enrolledAt` falls within the declared `validFrom` → `validUntil` interval.

It intentionally does not consult the current time and does not operate a revocation service.

Therefore:

- `currentValidityIndependentlyChecked=false`;
- `revocationStatusIndependentlyChecked=false`.

A later stage must introduce governed status evidence before expired/revoked key semantics can be authoritative.

## Authority boundary

The following remain false:

- pinned registrar means registrar identity verified;
- registrar signature means registrar independent;
- possession proof means verifier identity verified;
- enrollment certificate means real-world key ownership verified;
- registrar identity independently verified;
- registrar independence independently verified;
- verifier identity independently verified;
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

CI generates ephemeral Ed25519 verifier and registrar key pairs.

It proves only:

- canonical challenge/certificate construction;
- verifier key-possession verification;
- registrar certificate-signature verification;
- identity-ref separation mechanics;
- duplicate enrollment/key/certificate rejection;
- validity-window mechanics;
- active-runtime authority guard.

Synthetic registrar keys are not trusted real-world registrars.

## Next frontier

FR229 creates a governed technical enrollment path, but FR228 still accepts arbitrary caller-pinned verifier keys directly.

The next useful step is to require an FR228 witness-signature verification to use the exact verifier keys admitted by an active FR229 registry, rejecting any pinned-key drift.

That binding can improve technical chain-of-custody but still must not upgrade registrar identity, verifier identity, witness-claim truth, or empirical sufficiency.
