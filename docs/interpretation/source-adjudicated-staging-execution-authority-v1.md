# Source-Adjudicated Staging Execution Authority v1

Issue: #1805

Watchtower-Track: saju-bridge

## Purpose

The interpretation planner previously had one promoted-pack authority path:

```text
staging / production
→ ReviewerTrustContext
→ trust-pinned ReviewAttestation
```

Source-adjudication introduces a second, explicitly separate staging-only path:

```text
staging
→ exact source-adjudication execution authority
```

This path does not claim that human review occurred.

## Compatibility

The existing API remains unchanged:

```ts
buildInterpretationExecutionPlan(registry, reviewerTrustContext?)
```

It preserves the existing trusted-review behavior and errors.

The new entrypoint is:

```ts
buildInterpretationExecutionPlanWithAuthority(registry, authorityContext?)
```

with two authority modes:

```text
trusted_review
source_adjudication
```

## Source-adjudication authority binding

A source-adjudication execution authority is content-addressed and binds:

- authority class = `source_adjudication`;
- lifecycle target = `staging`;
- capability key;
- exact policy ref;
- exact candidate ref;
- exact governance decision ref;
- exact registry snapshot ID;
- exact staging pack content ref;
- `sourceAdjudicationAuthorityEstablished = true`;
- `productionAuthorityAuthorized = false`.

The execution authority ref hash is recomputed from this material at planning time.

Registry, pack, or authority hash drift fails closed.

## Staging-only boundary

Source-adjudication v1 is never a Production authority.

```text
source_adjudication + staging
→ eligible for execution validation

source_adjudication + production
→ SOURCE_ADJUDICATION_NOT_AUTHORIZED_FOR_PRODUCTION
```

It also cannot be applied to a research pack.

## Quality separation

The trusted-review path continues to require its existing staging quality metadata and trust-pinned review attestations.

The source-adjudication path does not rewrite factual rule-quality metadata.

It may therefore execute an exact staging registry while preserving:

```text
reviewerStatus = unreviewed
provenanceQuality = unknown
```

provided that the exact staging registry is bound by source-adjudication authority.

However, it still requires:

- methodology lifecycle status = `reviewed` or `active`;
- rule lifecycle status = `reviewed` or `active`;
- staging-grade test coverage;
- non-empty methodology source bindings;
- non-empty rule source bindings;
- registry content integrity.

Thus:

```text
RuleQualityMetadata
!= Promotion execution authority
```

and:

```text
source adjudication
!= provenance promotion
!= human review
```

## Deterministic identity

Source-adjudicated plans record:

```text
sourceAdjudicationAuthorityRef
```

inside plan identity.

Source-adjudicated interpretation runs also record this exact ref and use:

```text
myeonghwa-interpretation-authorization-v5-source-adjudication-staging
```

for their authorization policy version.

The authority ref participates in deterministic run hashing.

Research and existing trusted-review runs omit this field, preserving their prior execution identity material.

## Out of scope

This contract does not:

- create a staging registry;
- mutate any methodology/rule/pack lifecycle;
- approve a specific Saju capability;
- create ReviewAttestation or ReviewerTrustGrant;
- change reviewerStatus;
- change provenanceQuality;
- activate Preview;
- activate Official Reading;
- authorize Production.

The next capability-specific step is to materialize an exact staging registry and bind a source-adjudication execution authority to that registry snapshot.
