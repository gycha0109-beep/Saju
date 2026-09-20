# FR225 — Persisted External Witness Evidence

Status: implementation candidate  
Contract: `FR225-PERSISTED-EXTERNAL-WITNESS-EVIDENCE-v1`

## Purpose

FR224 identifies the remaining empirical blockers but has no durable format for evidence supplied by an external verifier or witness.

FR225 adds that intake boundary.

It records and re-verifies the integrity of external witness statements. It does **not** treat the presence of those statements as proof that the underlying fact is true.

## Supported witness claims

FR225 currently accepts four claim classes:

- reviewer cohort human-status observed;
- reviewer cohort independence observed;
- capture freshness observed;
- capture-family same-participant observed.

These are operational claim categories only.

## Required witness fields

Every record contains:

- opaque witness ref;
- opaque verifier ref;
- FR224 study-gate ref and digest;
- claim type;
- opaque scope ref;
- verification method;
- observation timestamp;
- external evidence ref;
- external evidence SHA-256 digest;
- explicit claim attestation;
- deterministic record digest.

## Persistence integrity

On reopen, FR225 recomputes:

- every record digest;
- record and verifier counts;
- per-claim counts;
- aggregate evidence digest;
- aggregate evidence ref.

It rejects:

- duplicate witness refs;
- duplicate verifier/claim/scope tuples;
- record tampering;
- aggregate count tampering;
- mixed or mismatched FR224 study-gate binding.

## What the runtime does not inspect

FR225 does not open or interpret the external evidence referenced by a witness record.

Therefore:

- `externalEvidenceDigest` proves only that the operator supplied a digest string with the required format;
- `verifierRef` is an opaque identifier, not verified identity;
- `claimAttested=true` is a recorded witness claim, not independent fact proof;
- no cryptographic witness signature is verified in FR225.

## Authority boundary

The following remain false:

- verifier identity independently verified;
- verifier independence independently verified;
- external evidence inspected by runtime;
- witness claim cryptographically authenticated;
- witness record presence means underlying fact established;
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

CI uses synthetic witness records only to prove:

- deterministic materialization;
- persistence round-trip;
- tamper rejection;
- duplicate rejection;
- FR224 gate binding;
- authority-boundary preservation.

Synthetic witness records are not empirical evidence.

## Next frontier

A later stage may join FR225 witness evidence back to the exact FR224/FR220/FR221 study scopes and check witness coverage.

That later join still must not convert a stored witness assertion into independently established fact unless a separately governed verifier-authentication and evidence-inspection mechanism supports that upgrade.
