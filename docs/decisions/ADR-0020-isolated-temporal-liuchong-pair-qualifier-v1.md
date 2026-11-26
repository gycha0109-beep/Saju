# ADR-0020 — One Isolated Temporal 六沖 Pair as Qualifier-Only Context

- Status: Accepted
- Date: 2026-10-07
- Scope: admit exactly one isolated temporal 六沖 pair identity without granting effective clash, polarity, conflict-resolution, weighting, or function-state authority
- Extends: ADR-0019
- Research basis: R055 / GH-987 and R059 / GH-992
- Product decision: GH-2334

## Context

R201 admitted exactly one isolated 六合 as internal qualifier context while preserving the distinction between relation presence and semantic effect.

R055 makes the same separation necessary for 六沖, but with an even stricter boundary: the structural pair identity is not equivalent to an effective clash. Position, competing relations, role context, branch category, multiplicity, and reactivation can change whether the nominal pair has operative effect.

R059 further rejects a universal precedence order among 合 / 會 / 沖 / 刑.

## Decision

R202 admits only the narrowest observable surface:

1. temporal branch-relation detection returns exactly one relation;
2. that relation is `clash`, representing a 六沖 pair identity;
3. no 六合, complete 三合, punishment, self-punishment, or second 六沖 is present;
4. the year contains exactly one active Dayun segment.

The relation is materialized only as internal qualifier context:

- `qualifierOnly = true`
- `pairIdentityObserved = true`
- `effectiveClashAuthorized = false`
- `conflictResolutionAuthorized = false`
- `favorableOrHarmfulInferenceAuthorized = false`
- `functionStateOverrideAuthorized = false`
- `temporalPrecedenceAuthorized = false`
- `numericWeightAssigned = false`

## Settlement behavior

The isolated 六沖 pair qualifier does not alter the existing stem overlay.

It cannot:

- mark the clash as effective;
- weaken or strengthen either branch;
- create or remove a stem CONTROL / SUPPORT influence;
- change participant function state or `pairControlEffective`;
- resolve a 六合 / 三合 / 刑 relation;
- infer favorable or harmful polarity;
- establish annual-over-Dayun or Dayun-over-annual precedence;
- add any numeric strength or distance score.

The annual producer may continue only when the existing governed annual/Dayun stem overlay independently produces a real function-state change.

## Competing-relation boundary

Any additional branch relation remains fail-closed, including:

- 六沖 + 六合;
- 六沖 + complete 三合;
- 六沖 + 刑 / 자형;
- two or more simultaneous 六沖 relations.

R202 does not create a first-match-wins or total-order resolver.

## Identity

The isolated 六沖 pair qualifier is included in annual producer identity material so the same input remains deterministic and content-addressed.

It is not inserted into R192 structural-role assessments or R196 bundle semantic assessment material because it has no structural-impact authority.

## Public boundary

Official Reading exposes only the independently settled annual structure transition.

六沖 relation IDs, pair-observation flags, effective-clash flags, polarity flags, qualifier metadata, and producer identity remain internal and are not added to ReadingArtifact or ProductReadingResponse.
