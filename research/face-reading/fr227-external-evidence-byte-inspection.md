# FR227 — External Evidence Byte Inspection

Status: implementation candidate  
Contract: `FR227-EXTERNAL-EVIDENCE-BYTE-INSPECTION-v1`

## Purpose

FR225 stores witness statements and FR226 binds those statements to exact study scopes. Until FR227, the runtime still trusts the witness record's `externalEvidenceDigest` as a declared string and does not inspect the referenced evidence bytes.

FR227 adds an explicit byte-level inspection boundary.

It proves only that supplied bytes exist and hash to the digest recorded in FR225.

## Input

FR227 requires active-runtime FR225 verified persisted witness evidence.

The caller supplies exactly one payload for each witness record:

- exact `externalEvidenceRef`;
- supported media type;
- actual `Uint8Array` evidence bytes.

## Byte-level checks

FR227:

- rejects missing payloads;
- rejects duplicate payload refs;
- rejects extra payload refs outside FR225;
- rejects empty payloads;
- applies a 16 MiB operational payload-size limit;
- recomputes SHA-256 from the actual bytes;
- requires exact equality with FR225 `externalEvidenceDigest`;
- emits a deterministic receipt for every witness record.

The 16 MiB limit is an implementation safety bound only. It is not an empirical sufficiency threshold and carries no research authority.

## Receipt semantics

A successful receipt may state:

- `externalEvidenceBytesPresent=true`;
- `externalEvidenceDigestMatched=true`.

It must also state:

- `externalEvidenceProvenanceAuthenticated=false`;
- `externalEvidenceSubstanceIndependentlyAdjudicated=false`;
- `witnessClaimCryptographicallyAuthenticated=false`;
- `underlyingFactIndependentlyEstablished=false`.

The runtime must not expose a generic `evidenceVerified=true` field because that would collapse byte integrity, provenance, semantic adjudication, and empirical truth into one misleading flag.

## What digest matching does not prove

A digest match does not establish:

- who created the evidence;
- when the underlying real-world event happened;
- whether the verifier is who they claim to be;
- whether the verifier is independent;
- whether the evidence has trustworthy provenance;
- whether the evidence content supports the witness claim;
- whether a reviewer was human;
- whether reviewers were independent;
- whether captures were fresh;
- whether capture-family members were the same participant;
- whether the metric is repeatable.

## Authority boundary

FR227 keeps false:

- evidence-byte presence means evidence authentic;
- digest match means provenance authenticated;
- digest match means evidence substance adjudicated;
- verifier identity independently verified;
- verifier independence independently verified;
- witness claim cryptographically authenticated;
- external evidence provenance authenticated;
- external evidence substance independently adjudicated;
- underlying fact independently established;
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

CI supplies synthetic byte payloads and proves only:

- actual-byte SHA-256 recomputation;
- declared-digest matching;
- missing/duplicate/extra payload rejection;
- empty/oversized payload rejection;
- active FR225 authority requirement;
- no-authority semantics.

Synthetic bytes are not empirical evidence.

## Next frontier

After FR227, the evidence chain can distinguish:

1. witness record integrity;
2. exact study-scope coverage;
3. evidence-byte presence and digest matching;
4. provenance/authentication;
5. substantive evidence adjudication;
6. independently established empirical fact.

FR227 closes only step 3.

A later stage may introduce a governed verifier-authentication or provenance-signature mechanism. Even then, authentication of a verifier or evidence source must not automatically imply that the witness claim is empirically true.
