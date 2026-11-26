# ADR-0021 — One Isolated Temporal 自刑 as Qualifier-Only Context

- Status: Accepted
- Date: 2026-10-07
- Scope: admit exactly one isolated temporal self-punishment relation identity without granting punishment effect, polarity, weighting, conflict-resolution, or function-state authority
- Extends: ADR-0020
- Research basis: R056 / GH-988
- Product decision: GH-2345

## Context

R202 admits isolated 六合 and 六沖 relation identities only as internal qualifiers. Remaining temporal punishment relations still fail closed.

R056 preserves the self-punishment category for 辰 / 午 / 酉 / 亥 and records repeated same-branch forms such as 辰見辰, 午見午, 酉見酉, and 亥見亥. The same research boundary explicitly rejects automatic harmful interpretation: relation identity is not punishment effect.

## Decision

R203 admits only the narrowest source-supported surface:

1. temporal branch-relation detection returns exactly one relation;
2. that relation is `self_punishment`;
3. no 六合, 六沖, complete 三合, punishment pair/group, or second 自刑 is present;
4. the target year contains exactly one active Dayun segment.

The relation is materialized only as internal qualifier context:

- `qualifierOnly = true`
- `relationIdentityObserved = true`
- `repeatedSameBranchObserved = true`
- `punishmentEffectAuthorized = false`
- `favorableOrHarmfulInferenceAuthorized = false`
- `conflictResolutionAuthorized = false`
- `functionStateOverrideAuthorized = false`
- `temporalPrecedenceAuthorized = false`
- `numericWeightAssigned = false`

## Settlement behavior

The isolated 自刑 qualifier does not alter the existing annual/Dayun stem overlay.

It cannot:

- infer 凶 or 吉;
- establish an effective punishment consequence;
- create or remove stem CONTROL / SUPPORT;
- alter participant function state or `pairControlEffective`;
- resolve or suppress another branch relation;
- establish temporal precedence;
- add severity, repetition, distance, or numeric scores.

The producer may continue only when the existing governed stem overlay independently creates a real function-state change.

## Competing-relation boundary

Any additional branch relation remains fail-closed, including:

- 自刑 + 六合;
- 自刑 + 六沖;
- 自刑 + complete 三合;
- 自刑 + punishment pair/group;
- multiple simultaneous 自刑 relations.

## Unsupported punishment boundary

R203 does not admit 子卯 punishment-pair semantics or the 寅巳申 / 丑戌未 punishment-group families. Those remain fail-closed pending separate settlement.

## Identity

The qualifier is included in internal annual producer identity material, but not in R192 role assessments or R196 bundle semantic assessment material.

## Public boundary

Official Reading exposes only the independently settled annual structure transition. 自刑 relation IDs and qualifier/effect metadata remain internal.
