# Relationship / Spouse T8 Source-Adjudicated Staging Runtime v1

Issue: #1817

Watchtower-Track: saju-bridge

## Purpose

Materialize the exact capability-specific staging runtime authorized by the existing Spouse T8 source-adjudication governance lineage.

This artifact is the SA-2B lifecycle/runtime mutation that follows the generic staging execution authority support from #1809.

## Immutable upstream

The existing source-bound runtime remains unchanged:

```text
relationship-spouse-t8 source-bound runtime
version = 1.0.1

methodology.status = research
rule.status = research
pack.status = research
```

SA-2B creates a separate variant:

```text
1.0.1 research runtime
        ↓ exact lineage
1.1.0 source-adjudicated staging runtime
```

No in-place mutation of the 1.0.1 research artifact is permitted.

## Lifecycle mutation

Only lifecycle state advances:

```text
Methodology
research → reviewed

Rule
research → reviewed

Pack
research → staging
```

The `reviewed` lifecycle label does not assert an independent human domain review.

Factual quality metadata remains unchanged:

```text
reviewerStatus = unreviewed
provenanceQuality = unknown
```

No `domain_reviewed`, `primary_supported`, or `multi_source_supported` value is invented.

## Semantic body

The staging variant preserves the exact source-bound semantic contract:

```text
input = derivedFacts.dayMaster

Yang
→ INDIRECT_WEALTH / 편재 / 偏財

Yin
→ INDIRECT_POWER / 편관 / 偏官
```

No additional marriage, timing, partner identity/sex/orientation, fertility, Annual, Monthly, Compatibility, second-chart, or general-Relationship semantics are added.

## Exact authority lineage

The staging artifact binds all of the following:

- source-bound research runtime 1.0.1 content identity;
- source-bound research registry snapshot;
- exact source-adjudication policy from #1800;
- exact Spouse T8 candidate from #1802;
- exact project-owner governance decision from #1804;
- exact staging registry snapshot;
- exact staging pack content ref;
- exact source-adjudication execution authority ref built through the #1809 API.

The capability-specific validator rechecks the policy, candidate, and decision refs in addition to the generic registry/pack/authority validation. Rehashed drifted materials therefore fail closed even when their internal authority hash is self-consistent.

## Runtime boundary

The dedicated wrapper is:

```ts
runRelationshipSpouseT8SourceAdjudicatedStagingRuntime(...)
```

The caller cannot inject a promotion authority or reviewer-trust authority. The wrapper constructs and validates the exact Spouse T8 source-adjudication execution authority internally.

Runtime scope:

```text
source_adjudicated_staging_shadow_only

shadowExecutionAuthorized = true

productConsumerActivated = false
narrativeActivated = false
previewActivated = false
officialReadingActivated = false

productionAdmissionAuthorized = false
Production = HOLD
```

## Verification

SA-2B tests lock:

1. research 1.0.1 immutability;
2. staging lifecycle state;
3. unchanged reviewer/provenance metadata;
4. exact policy/candidate/decision/registry/pack/authority binding;
5. fail-closed drift handling;
6. Research / Engine / Staging semantic parity for resolved Yang/Yin;
7. zero-claim fail-close for missing/ambiguous/unavailable/pending Day Master;
8. no general relationship, Annual, Monthly, Compatibility, or second-chart leakage;
9. caller authority injection rejection;
10. consumer/Preview/Official/Production closure.

## Gate state after SA-2B

Gate 12 remains resolved through the exact source-adjudication governance decision.

Gate 14 is not completed by merely materializing this runtime:

```text
REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE
= pending
```

Next disposition:

```text
RUN_SOURCE_ADJUDICATED_SHADOW_STAGING_EVIDENCE
```

That next step is SA-3 and must compare canonical fixtures across Engine READY, Research 1.0.1, and the staging variant. SA-3 PASS still does not authorize Production.
