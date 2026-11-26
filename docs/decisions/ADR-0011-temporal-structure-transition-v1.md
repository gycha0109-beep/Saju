# ADR-0011 — MyeongHa V1 Temporal Structure Break and Recovery Policy

- Status: Accepted
- Date: 2026-10-06
- Scope: deterministic temporal overlay transitions from governed structure state plus R192 impact assessments
- Extends: ADR-0010

## Context

The research record preserves configuration-specific examples of structure break, rescue, completion, and change,
but explicitly does not authorize a universal classical break/recovery toggle or permanent natal mutation.

R189-R192 now provide a governed product path from local stem interaction to deterministic structural impact.
R193 needs a product-level temporal state machine without pretending that the research corpus itself published
this exact universal transition algorithm.

## Decision

MyeongHa V1 treats structure state as a temporal overlay with three states:

- intact
- weakened
- broken

The natal baseline is not mutated by a period transition.

### Same-period impact aggregation

One or more R192 assessments for the same structure are aggregated using the same qualitative ordering already
adopted in R192:

1. directional impact with highest criticality wins: core > supporting > secondary;
2. within that criticality, strongest function degradation wins:
   lost > impaired > constrained > preserved;
3. if surviving directions agree, use that direction;
4. if weakening and strengthening remain exactly tied, use weakening.

No numeric scores, counts, or input order are used.

### One-step temporal transition

MyeongHa V1 forbids jumping two structure states in one period.

From intact:

- strengthen -> intact / reinforced
- maintain -> intact / stable
- weaken -> weakened / degraded

From weakened:

- strengthen -> intact / restored
- maintain -> weakened / remains_weakened
- weaken -> broken / broken

From broken:

- strengthen -> weakened / recovering
- maintain -> broken / remains_broken
- weaken -> broken / remains_broken

A later period starts from the previous temporal output state. This creates deterministic break/recovery replay
while preserving natal identity separately.

## Authority boundary

This is a MyeongHa V1 product convention, not a claim that the classical research corpus authorizes a generic
break/recovery state machine.

R193 does not infer:

- structure identity;
- 格 establishment;
- 喜神 / 忌神;
- structural roles;
- temporal stem/branch trigger sufficiency;
- concrete events;
- favorable/unfavorable life outcomes.

Those must come from separately governed upstream layers.

## Fail-closed behavior

R193 refuses to transition when:

- no R192 assessment exists for the period;
- an assessment belongs to another structure;
- assessment identities are duplicated;
- a directional R192 assessment has no valid decisive participant material.

Replay also refuses duplicate chronological sequence numbers.

## User-facing boundary

The reading projection exposes only the settled temporal result:

- structure identity;
- period identity;
- previous state;
- aggregated structure impact;
- transition class;
- next state.

Research HOLDs, source disputes, provenance uncertainty, and product-policy internals remain outside default
consumer copy.
