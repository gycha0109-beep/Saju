# FR234 — Authority Trust-Root Governance Admission Requirements

Status: implementation candidate  
Contract: `FR234-AUTHORITY-TRUST-ROOT-GOVERNANCE-ADMISSION-REQUIREMENTS-v1`

## Purpose

FR233 inventories bounded candidate trust-root bytes for every authority key used by the active FR232 chain. It deliberately does not promote those candidates to external trust.

FR234 freezes the checks that a later admission executor must satisfy before any FR233 candidate can be promoted to an externally governed trust root.

FR234 is a requirements artifact. It does not execute external verification.

## Predecessor

FR234 accepts only an active-runtime FR233 candidate intake and binds to its exact:

- intake ref;
- intake digest;
- candidate coverage;
- authorityRef;
- authorityKeyRef;
- authority public-key digest;
- trust-root candidate ref;
- artifact ref and digest;
- governance-evidence and policy coordinates.

Persisted or reconstructed FR233 clones are rejected.

## Mandatory admission checks

Every FR233 candidate requires:

1. an independently provisioned external-governance verifier/source;
2. external-governance authority identity verification;
3. semantic trust-root parsing and verification;
4. supported trust-root key-format verification;
5. externally governed authority-key pinning;
6. trust-root policy verification;
7. validity-policy verification;
8. revocation/status verification;
9. exact authority scope verification;
10. exact FR233 candidate artifact-digest binding.

All checks must succeed before a later stage may set `externalTrustRootProvisioned=true`.

## Insufficient evidence

None of the following is sufficient by itself:

- FR233 candidate intake;
- candidate byte-identity verification;
- caller-supplied authority refs;
- caller-supplied identity evidence refs;
- caller-supplied key-pinning refs;
- caller-supplied policy refs;
- caller-supplied semantic-verifier refs;
- caller-pinned authority keys;
- mathematical signature validity;
- self-signed or project-generated roots;
- synthetic roots or credentials.

## Authority boundary

FR234 freezes requirements only.

It does not establish:

- authority real-world identity or independence;
- externally governed authority-key pinning;
- trust-root semantic validity;
- real-world signing-key ownership;
- independently authenticated public-key provenance;
- current validity;
- revocation status;
- an external trust root;
- witness-claim truth;
- evidence provenance or substantive sufficiency;
- reviewer/capture facts;
- empirical repeatability or sufficiency;
- calibration, transition zones, thresholds, or classifiers;
- traditional face-reading binding;
- production or commerce authority.

## CI meaning

FR234 CI uses a fully synthetic FR225→FR233 fixture and verifies only that the requirements artifact:

- requires active FR233 runtime provenance;
- binds exact FR233 candidate coordinates;
- freezes all mandatory governance checks;
- keeps every trust promotion flag false;
- rejects reconstructed FR233/FR234 artifacts.

Synthetic CI does not execute external governance verification.

## Next frontier

The next stage may define an **external governance admission execution contract** that consumes active FR234 requirements plus genuinely external verification results.

That execution stage must fail closed unless every FR234 requirement is independently evidenced and verified. Synthetic fixtures must never be sufficient to set `externalTrustRootProvisioned=true`.
