# ADR-0019 — One Isolated Temporal 六合 as Qualifier-Only Binding Context

- Status: Accepted
- Date: 2026-10-07
- Scope: admit exactly one isolated temporal 六合 observation without granting transformation, conflict-resolution, weighting, or function-state authority
- Extends: ADR-0018
- Research basis: R052 / GH-983 and R059 / GH-992
- Product decision: GH-2317

## Context

R198 failed closed on every temporal branch relation. R200 narrowed the separate temporal root-support gate, but branch relations remained entirely blocked.

Existing R052 research separates:

- 六合 pair identity;
- binding / combination;
- conflict-resolution effect;
- transformation support;
- transformed element;
- downstream interpretation.

The research conclusion is explicit that 六合 presence does not itself establish 化.

Existing R059 research also shows that 合 / 沖 / 刑 interactions do not admit a universal precedence ordering. A relation that resolves one conflict can expose or reactivate another, and position/nature remain material.

## Decision

R201 admits only the narrowest non-conflicting surface:

1. temporal branch-relation detection returns exactly one relation;
2. that relation is `six_combination`;
3. no clash, complete 三合, punishment, self-punishment, or second 六合 is present.

That one relation is materialized only as internal qualifier context:

- `qualifierOnly = true`
- `bindingObserved = true`
- `transformationApplied = false`
- `conflictResolutionAuthorized = false`
- `functionStateOverrideAuthorized = false`
- `temporalPrecedenceAuthorized = false`
- `numericWeightAssigned = false`

## Settlement behavior

The isolated 六合 qualifier does not alter the R198/R200 stem overlay.

It cannot:

- create or remove a stem CONTROL / SUPPORT influence;
- change CONTROL-over-SUPPORT;
- restore or impair a participant;
- change `pairControlEffective`;
- cancel a clash;
- transform either branch;
- select a transformed element;
- create a structure impact;
- establish annual-over-Dayun or Dayun-over-annual precedence;
- add any numeric or non-numeric strength scalar.

The annual producer may continue only because the existing governed stem overlay independently produces a real function-state change.

## Competing-relation boundary

Any competing or additional branch relation remains fail-closed.

Examples include:

- 六合 + 六沖;
- 六合 + complete 三合;
- 六合 + 刑 / 자형;
- two or more simultaneous 六合 relations.

R201 does not create a first-match-wins or total-order resolver.

## Identity

The isolated 六合 qualifier is included in the internal annual producer identity material.

It is not inserted into R192 structural-role assessments or R196 bundle semantic assessment material because it has no structural-impact authority.

## Public boundary

The qualifier remains internal orchestration context.

Official Reading exposes only the already-settled annual structure transition. 六合 relation IDs, binding flags, qualifier metadata, and producer identity are not added to ReadingArtifact or ProductReadingResponse.
