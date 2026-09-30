# Relationship / Spouse T8 — SA-5I Isolated Shadow Staging Execution Review

Issue: #1904  
Track: `saju-bridge`

## Purpose

SA-5I creates the exact source-adjudication staging execution authority for the
SA-5H-materialized Spouse T8 Day-Branch spouse-palace 2.0.0 staging surface and
records isolated research-vs-staging parity evidence.

This phase does not admit any consumer.

## Exact lineage

```text
SA-5C 2.0.0 research claim contract
  -> SA-5D Bridge re-entry admission
  -> SA-5E isolated research execution
  -> SA-5F staging eligibility
  -> SA-5G explicit staging governance decision
  -> SA-5H staging lifecycle materialization
  -> SA-5I isolated shadow staging execution
```

The SA-5I execution authority binds exactly to:

- SA-5H `materializationId`
- SA-5H `materializationRef`
- SA-5H staging registry snapshot
- SA-5H staging pack
- SA-5G `policyRef`
- SA-5G `candidateRef`
- SA-5G `decisionRef`

The shared `validateSourceAdjudicationExecutionAuthority` validator remains the
base authority validator. SA-5I adds exact upstream lineage checks on top.

## Execution scope

The runtime wrapper may execute only:

```text
RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
```

with the internally-owned exact source-adjudication authority.

Callers may not inject:

- `promotionAuthorityContext`
- `reviewerTrustContext`

The resulting interpretation run must record:

```text
authorizationPolicyVersion =
  myeonghwa-interpretation-authorization-v5-source-adjudication-staging

sourceAdjudicationAuthorityRef =
  exact SA-5I execution authority ref
```

## Semantic surface

The staging output remains exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

Claim type:

```text
relationship.spouse.traditional_spouse_palace_position
```

No partner identity, sex, personality, marriage outcome, timing, fertility,
compatibility, second-chart, annual, monthly, or general-relationship semantics
are introduced.

## Shadow parity evidence

SA-5I deterministically checks research-vs-staging parity across all 12 resolved
Day Branches:

```text
자 축 인 묘 진 사 오 미 신 유 술 해
```

Every resolved branch must:

- produce exactly one research claim
- produce exactly one staging claim
- preserve identical semantic projection
- preserve the position-only claim
- record exact source-adjudication authorization

The branch value itself is not emitted as a new narrative semantic.

## Fail-close evidence

The following Day Pillar states must remain zero-claim and semantically identical
between isolated research and staging:

- ambiguous
- unavailable
- missing

No fallback spouse semantic is manufactured.

## Traditional-sex invariance

For the same resolved chart position:

- male
- female
- unspecified

must produce the same position-only semantic.

Traditional-sex input does not select or alter this 2.0.0 claim.

## Provenance and review authority

The staging surface preserves exactly two runtime sources:

1. Jung Sua 2025
2. Saju Atelier 2026

It preserves:

```text
provenanceQuality = multi_source_supported
reviewerStatus = unreviewed
ReviewAttestation count = 0
```

SA-5I does not create or imply trusted human domain review.

## Legacy isolation

The pre-existing spouse-star source-adjudicated staging lineage remains:

```text
version = 1.1.0
claim family = role_neutral_spouse_star_marker
```

The new 2.0.0 Day-Branch spouse-palace staging execution does not mutate,
supersede, or execute that legacy semantic.

## PASS boundary

A PASS establishes only:

- exact staging execution authority is valid
- the exact SA-5H staging registry is executable in isolated shadow staging
- all 12 resolved Day Branches preserve research/staging semantic parity
- ambiguous/unavailable/missing Day Pillar states fail closed
- traditional-sex input does not change the position-only semantic
- exact source-adjudication policy and authority identity are recorded
- a separate consumer-admission review may be considered

A PASS does **not** establish:

- human domain review
- ReviewAttestation
- ReviewerTrustGrant
- reviewer-status promotion
- provenance-quality promotion
- narrative consumer activation
- Preview authority
- Official Reading authority
- Production authority

Production remains:

```text
HOLD
```

## Next disposition

PASS:

```text
READY_FOR_SEPARATE_CONSUMER_ADMISSION_REVIEW
```

FAIL:

```text
HOLD_AND_REPAIR_SA_5I_SHADOW_STAGING_EXECUTION
```

Any consumer admission must be a separate reviewed authority step.
