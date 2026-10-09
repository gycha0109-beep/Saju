# Relationship / Spouse T8 — SA-5I Isolated Shadow Staging Execution Review

Issue: #1904  
Track: `saju-bridge`

## Purpose

SA-5I creates the exact source-adjudication execution authority for the
SA-5H-materialized Spouse T8 Day-Branch spouse-palace 2.0.0 staging surface and
then executes that surface only in isolated shadow staging.

The phase proves that lifecycle materialization did not change the semantic
behavior of the exact 2.0.0 research candidate.

## Exact lineage

```text
SA-5C research claim contract
  -> SA-5D Bridge re-entry
  -> SA-5E isolated research execution
  -> SA-5F staging eligibility
  -> SA-5G explicit governance decision
  -> SA-5H staging lifecycle materialization
  -> SA-5I isolated shadow staging execution
```

SA-5I binds to the exact SA-5H:

- `materializationId`
- `materializationRef`
- staging registry snapshot id
- staging pack ref
- inherited policy ref
- inherited candidate ref
- inherited governance decision ref

The SA-5H content hash is recomputed before the staging execution review is
accepted.

## Execution authority

SA-5I uses the shared source-adjudication promotion authority contract.

The execution authority contains:

- `authorityClass = source_adjudication`
- `lifecycleTarget = staging`
- capability `relationship:natal:spouse`
- exact SA-5G policy ref
- exact 2.0.0 candidate ref
- exact SA-5G decision ref
- exact SA-5H staging registry snapshot id
- exact SA-5H staging pack ref
- `sourceAdjudicationAuthorityEstablished = true`
- `productionAuthorityAuthorized = false`

The authority must pass the shared
`validateSourceAdjudicationExecutionAuthority` validator and the SA-5I
lineage-specific validator.

Callers cannot inject either `promotionAuthorityContext` or
`reviewerTrustContext`. The staging wrapper owns the exact authority.

## Shadow execution matrix

### Resolved Day Branch matrix

All 12 Earthly Branch values are exercised against the same canonical Day
Pillar structure:

```text
子 자
丑 축
寅 인
卯 묘
辰 진
巳 사
午 오
未 미
申 신
酉 유
戌 술
亥 해
```

For every branch:

- research execution emits exactly one claim
- staging execution emits exactly one claim
- research and staging semantic projections are identical
- staging execution is deterministic across repeated runs
- staging run records the exact source-adjudication authority
- staging run records the source-adjudication staging authorization policy
- research/staging run identities remain different because lifecycle packs are different
- the output value remains exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

The actual Earthly Branch value is not copied into the claim value. It remains
referenced through `factRefs = ["pillars.day"]`.

### Fail-close matrix

The following Day Pillar states must emit zero claims in both research and
staging:

- ambiguous
- unavailable
- pending
- missing

### Demographic-input isolation

The same canonical chart is run with:

- `male`
- `female`
- `unspecified`

for `sexForTraditionalCalculation`.

All three must produce the same 2.0.0 position-only semantic projection.

## Provenance and review boundary

The staging registry remains exactly bound to two sources:

1. Jung Sua 2025
2. Saju Atelier 2026

The phase preserves:

- `provenanceQuality = multi_source_supported`
- `reviewerStatus = unreviewed`
- zero `ReviewAttestation`
- no `ReviewerTrustGrant`
- `materialForNarrative = false`

The legacy 1.1.0 spouse-star staging lineage remains isolated and unchanged.

## Gate 14

A complete SA-5I review resolves:

```text
REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE = SATISFIED
```

Only when all of the following are true:

1. exact SA-5H materialization integrity
2. exact materialization identity
3. valid staging lifecycle state
4. staging registry integrity
5. staging execution authority validation
6. exact authority lineage
7. all 12 resolved branches pass
8. all fail-close cases pass
9. demographic input isolation passes
10. exact source and quality boundary is preserved
11. legacy 1.1 remains isolated
12. no consumer or production authority expands

## Authority boundary

A PASS establishes:

- source-adjudication staging execution authority
- isolated staging execution authorization
- completed shadow-staging parity evidence

A PASS does **not** establish:

- human domain review
- trusted review attestation
- reviewer trust
- provenance-quality promotion
- narrative consumer activation
- Preview authority
- Official Reading authority
- Production authority

Production remains `HOLD`.

## Next disposition

PASS:

```text
RUN_SA_5J_STAGING_CONSUMER_ADMISSION_REVIEW
```

FAIL:

```text
HOLD_AND_REPAIR_SA_5I_SHADOW_STAGING_EXECUTION
```

SA-5J must remain a separate consumer-admission decision. Shadow execution
evidence alone must not activate any user-facing reading path.
