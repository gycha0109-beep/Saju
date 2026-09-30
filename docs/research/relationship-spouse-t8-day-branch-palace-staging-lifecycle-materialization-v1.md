# Relationship / Spouse T8 — SA-5H Source-Adjudicated Staging Lifecycle Materialization

Issue: #1901  
Track: `saju-bridge`

## Purpose

SA-5H materializes the exact SA-5G-approved Spouse T8 Day-Branch spouse-palace
2.0.0 candidate into a separate staging lifecycle surface.

This phase creates staging lifecycle artifacts only. It does not create staging
execution authority and does not execute the staging registry.

## Exact lineage

```text
SA-5C 2.0.0 research claim contract
  -> SA-5D Bridge re-entry admission
  -> SA-5E isolated research execution
  -> SA-5F staging eligibility
  -> SA-5G explicit staging governance decision
  -> SA-5H staging lifecycle materialization
```

SA-5H binds to the exact SA-5G:

- `decisionId`
- `decisionRef`
- `candidateRef`
- `policyRef`
- upstream SA-5E `executionId`
- upstream SA-5E execution authority ref

The decision content hash is recomputed before the lifecycle mutation is
accepted. Any drift fails closed.

## Lifecycle representation

The repository lifecycle contract represents staging as:

- methodology status: `reviewed`
- rule status: `reviewed`
- pack status: `staging`

The word `reviewed` on methodology/rule lifecycle state does **not** mean
trusted human domain review. Review authority remains separate and is preserved
as:

- rule `quality.reviewerStatus = unreviewed`
- zero `ReviewAttestation`
- zero `ReviewerTrustGrant`
- no reviewer-status promotion

## Materialized artifacts

SA-5H creates a separate:

- staging methodology
- staging rule
- staging pack
- staging registry snapshot
- deterministic staging registry ref
- deterministic lifecycle materialization ref

The research candidate remains unchanged and independently addressable.

## Lifecycle-only mutation rule

The staging methodology is the research methodology with only `status`
changed from `research` to `reviewed`.

The staging rule is the research rule with only `status` changed from
`research` to `reviewed`.

The staging pack preserves every non-lifecycle field while changing only:

- `packId` to the dedicated source-adjudicated staging identity
- `name` to the staging surface name
- `status` from `research` to `staging`

The rule input, condition, output, tags, source refs, taxonomy, methodology ref,
and quality metadata are unchanged.

## Semantic and provenance preservation

The staging surface remains exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

It preserves:

- claim type `relationship.spouse.traditional_spouse_palace_position`
- semantic version `2.0.0`
- canonical input `pillars.day`
- fail-close requirement for resolved Day Pillar / branch value
- Jung Sua 2025 direct basis
- Saju Atelier 2026 independent direct cross-reference basis
- exactly two runtime sources
- `provenanceQuality = multi_source_supported`
- `reviewerStatus = unreviewed`
- `materialForNarrative = false`

No LEI, OpenFate, or historical Ziping corroboration is added to the runtime
source set.

## Registry integrity

Both the preserved research registry and the new staging registry must pass
`verifyResolvedRegistryContentIntegrity`.

The staging registry must contain:

- one methodology
- one rule
- two exact sources
- one claim type definition
- one claim value schema
- zero review attestations

The staging registry snapshot and pack ref must differ from the research
registry because the lifecycle surface is separately materialized.

## Authority boundary

A PASS establishes only:

- exact SA-5G governance binding
- staging lifecycle materialized
- staging registry materialized
- staging lifecycle mutation applied
- source-adjudication authority lineage preserved

A PASS does **not** establish:

- human domain review
- trusted review attestation
- reviewer trust grant
- staging execution authority
- staging execution authorization
- shadow execution
- narrative consumer activation
- Preview authority
- Official Reading authority
- Production authority

Production remains `HOLD`.

## Fail-close cases

No lifecycle materialization ref is emitted when any required check fails,
including:

1. SA-5G content-hash integrity
2. exact SA-5G decision identity
3. source-adjudication governance authority
4. exact SA-5E / research-registry lineage
5. methodology non-lifecycle parity
6. rule non-lifecycle parity
7. pack non-lifecycle parity
8. exact lifecycle transition
9. exact source manifest preservation
10. exact claim contract preservation
11. exact quality/reviewer authority preservation
12. exact position-only semantic preservation
13. research candidate preservation
14. staging registry content integrity
15. no-execution-authority boundary

## Next disposition

PASS:

```text
RUN_SA_5I_ISOLATED_SHADOW_STAGING_EXECUTION_REVIEW
```

FAIL:

```text
HOLD_AND_REPAIR_SA_5H_STAGING_LIFECYCLE_MATERIALIZATION
```

SA-5I must remain a separate execution-authority and shadow validation step.
