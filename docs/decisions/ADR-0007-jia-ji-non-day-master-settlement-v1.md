# ADR-0007 — MyeongHa V1 Non-Day-Master 甲己 Settlement Policy

- Status: Accepted
- Date: 2026-10-05
- Scope: exact non-day-master 甲己 stem interaction settlement / product convention

## Context

R172–R188 established that a single 甲 cannot be assigned a universal beneficial or harmful role,
that 甲 and 己 can simultaneously occupy a stem-five-combination surface and a 木剋土 control topology,
and that modern transmitted literature contains a recurring "combine without transformation, then still discuss generation/control" rule family.

The research record intentionally kept pair-local settlement authority closed because provenance,
page binding, school lineage, and competing-relation authority were not sufficient to claim one
universal classical rule.

That research boundary is correct for scholarship but insufficient for a reading product.
MyeongHa must produce the same semantic result from the same governed input and must not ask the LLM
to choose between competing settlement interpretations.

## Decision

MyeongHa V1 adopts the following exact product convention for 甲己 only when both relation participants
are non-day-master stems and the day master is neither 甲 nor 己.

1. Preserve the structural 甲己 combination relation.
2. Do not apply transformation unless a separate canonical transformation authority explicitly establishes it.
3. When transformation is not applied, preserve the original identities: 甲 remains 木 and 己 remains 土.
4. Preserve the day-master-relative Ten-God identities of both participants.
5. Treat combination as constraining the free action of both participants.
6. Preserve the original element-control relation 甲木 → 己土.
7. Resolve the local function states deterministically:
   - 甲 = constrained
   - 己 = impaired
8. Do not infer the chart-level favorable/unfavorable result from this pair-local fact alone.
   The affected role's separately governed structural disposition determines whether impairment weakens,
   strengthens, or maintains the structure.

The governed product identity is:

```text
policyId      = myeongha/jia-ji-non-day-master-settlement-v1
policyVersion = 1.0.0
decisionRef   = GH-2219
```

## Product authority versus research authority

This decision is a **MyeongHa V1 product convention**.

It does not assert:

- universal classical consensus;
- that every school must rank 合 and 剋 this way;
- that the 2001/2004 source candidates are canonical first publications;
- that unresolved provenance has become resolved.

Research evidence remains available for audit and future revision.
The runtime settlement result, however, is deterministic under this product policy.

## User-facing boundary

Default reading semantics receive only the settled semantic result:

- pair identity;
- whether transformation was applied;
- active relation classes;
- participant Ten-God identities;
- participant functional states;
- chart-level structure impact once a governed role disposition is supplied.

The default reading projection must not expose research HOLD state, source-conflict state,
provenance uncertainty, source URLs, policy-internal debate, or unresolved research vocabulary.

Those materials remain internal audit context and are available only through separate explainability/research surfaces.

## LLM boundary

The LLM does not:

- select whether 合 or 剋 wins;
- decide whether transformation occurred;
- change participant functional states;
- infer a different chart-level structural impact from the same governed role disposition.

It may only verbalize the already-settled semantic output.

## Determinism

For a fixed canonical snapshot, policy version, and governed role disposition:

```text
same input -> same settlement -> same structure impact
```

Policy revision requires a versioned successor. New evidence does not silently mutate v1.

## Non-decisions

This ADR does not authorize:

- a day-master 甲 or 己 case;
- all five heavenly-stem combinations;
- hidden-stem settlement;
- numeric relation weights;
- automatic "lost" function state;
- chart-level favorable/unfavorable classification without a governed structural-role disposition;
- LLM conflict resolution.

## Consequence

R189 moves exact non-day-master 甲己 from a research-only unresolved competing-relation surface
to a deterministic MyeongHa V1 product settlement policy while preserving the research record intact.
