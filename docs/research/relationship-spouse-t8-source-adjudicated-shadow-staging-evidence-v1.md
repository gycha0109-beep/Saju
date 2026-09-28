# Relationship / Spouse T8 Source-Adjudicated Shadow Staging Evidence v1

Issue: #1820

Watchtower-Track: saju-bridge

## Purpose

SA-3 records deterministic shadow evidence for the exact Relationship / Spouse T8 source-adjudicated staging lineage.

It answers one bounded question:

> Does source-adjudicated Staging 1.1.0 preserve the already-governed Spouse T8 meaning and failure boundary when compared with Engine READY and immutable Research 1.0.1?

This artifact does not create new Saju semantics and does not authorize Production.

## Three execution lanes

The evidence executes the same governed capability across three lanes:

```text
Engine READY
  canonical BirthInput
  → canonical calculation
  → Engine producer
  → claim graph
  → Spouse Reading Profile
  → governed evidence

Research baseline
  source-bound runtime 1.0.1

Source-adjudicated Staging
  staging runtime 1.1.0
  → exact source-adjudication execution authority
```

Cross-lane identity hashes are not required to match. Lifecycle and authorization identities are intentionally different.

Semantic projections must match.

## Canonical positive fixtures

Two existing Engine P2 canonical birth fixtures are reused:

```text
1992-10-24 05:30 Asia/Seoul
1992-10-25 05:30 Asia/Seoul
sexForTraditionalCalculation = unspecified
```

Together they must cover both resolved Day Master polarities.

The semantic oracle remains exact:

```text
Yang Day Master
→ INDIRECT_WEALTH
→ 편재
→ 偏財

Yin Day Master
→ INDIRECT_POWER
→ 편관
→ 偏官
```

For each case, Engine READY, Research 1.0.1, and Staging 1.1.0 must each emit exactly one claim and the normalized semantic hash must be identical.

## Fail-closed fixtures

Four derived-fact boundary fixtures are executed:

- ambiguous Day Master;
- unavailable Day Master;
- pending Day Master;
- missing Day Master.

Expected behavior:

```text
Engine governed composition
→ insufficient_evidence
→ zero spouse claims

Research 1.0.1
→ zero spouse claims

Staging 1.1.0
→ zero spouse claims
```

No T5 reconstruction, general-Relationship fallback, Compatibility fallback, or second-chart inference is permitted.

## Determinism

Determinism is checked within each lane, not by equating cross-lane execution identities.

Engine READY reruns must preserve:

- snapshot identity;
- calculation hash;
- interpretation run hash;
- claim IDs;
- governed evidence hash;
- E2E identity.

Research reruns must preserve:

- interpretation run hash;
- claim IDs;
- semantic hash.

Staging reruns must preserve:

- interpretation run hash;
- claim IDs;
- semantic hash;
- exact source-adjudication authority ref.

## Exact lineage

The evidence content-addresses:

- Engine P2 hardening completion evidence;
- Research runtime 1.0.1;
- Research registry snapshot and pack ref;
- Staging runtime 1.1.0;
- Staging registry snapshot and pack ref;
- source-adjudication policy ref;
- candidate ref;
- governance decision ref;
- staging execution authority ref.

A later runtime or authority mutation cannot silently reuse this evidence identity.

## Scope and authority guards

The staging lane may emit only:

```text
tier        = T8
category    = relationship
subcategory = spouse
claimType   = relationship.spouse.role_neutral_spouse_star_marker
```

The evidence also rechecks:

- Engine scope-isolation guards;
- Whisper remains the sole direct_basis for the exact selector rules;
- Lee Youngeun 2025 remains methodology/normative context, not selector direct_basis;
- reviewerStatus remains `unreviewed`;
- provenanceQuality remains `unknown`;
- the claim remains `materialForNarrative = false`.

The following are not created or inferred:

- human domain review;
- ReviewerTrustGrant;
- `domain_reviewed`;
- `primary_supported`;
- `multi_source_supported`.

## Gate 14

Gate:

```text
REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE
```

is satisfied only when all of the following pass:

1. exact lineage binding;
2. canonical Yang coverage and semantic parity;
3. canonical Yin coverage and semantic parity;
4. all four fail-close cases;
5. Engine determinism;
6. Research determinism;
7. Staging determinism;
8. scope isolation;
9. source-role preservation;
10. factual quality metadata preservation;
11. no narrative expansion;
12. Preview / Official Reading / Production remain closed.

A single failed check produces a blocker and keeps Gate 14 blocked.

## Historical-state preservation

SA-2B remains unchanged and correctly records the state immediately after staging materialization:

```text
gate14ShadowStagingEvidenceComplete = false
nextDisposition = RUN_SOURCE_ADJUDICATED_SHADOW_STAGING_EVIDENCE
```

SA-3 does not rewrite that historical artifact.

Instead, this separate evidence artifact records the later Gate 14 result.

## Post-SA-3 boundary

When this artifact passes:

```text
Gate 12 = resolved through source-adjudication governance
Gate 14 = SATISFIED

Preview = OFF
Official Reading = OFF
Production = HOLD
```

The next disposition is:

```text
REASSESS_PRODUCTION_PROVENANCE_SEPARATELY
```

That later SA-4 work must not treat SA-3 success as Production authority. The current direct selector basis remains a separate provenance question.
