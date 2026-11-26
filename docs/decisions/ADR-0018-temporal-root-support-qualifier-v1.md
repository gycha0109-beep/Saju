# ADR-0018 — Temporal Root Support as Qualifier-Only Context

- Status: Accepted
- Date: 2026-10-07
- Scope: admit temporal stem root-support observations without granting them settlement or weighting authority
- Extends: ADR-0016 and ADR-0017

## Context

R198 originally failed closed whenever the annual stem or active Dayun stem had a same-element hidden stem in its
own branch.

That gate was intentionally conservative, but it blocked cases where the root observation was known while no
governed rule existed to convert the observation into a numeric strength, precedence, winner, or function-state
override.

Existing hidden-stem research preserves a strict distinction between:

- branch-to-hidden-stem membership and location observations;
- activation/strength/settlement conclusions.

The product can preserve that distinction without treating root presence as an executable semantic effect.

## Decision

R200 changes temporal root support from a blocking condition to a qualifier-only observation.

For both the annual layer and active Dayun layer, the producer materializes:

- layer;
- visible temporal stem;
- temporal branch;
- stem element;
- hidden stems belonging to that branch;
- same-element hidden stems;
- whether at least one same-element hidden stem is observed.

The observation contract explicitly records:

- qualifierOnly = true;
- numericWeightAssigned = false;
- functionStateOverrideAuthorized = false;
- temporalPrecedenceAuthorized = false.

## Settlement behavior

Root support does not modify R198 stem-overlay semantics.

It cannot:

- change CONTROL to SUPPORT or SUPPORT to CONTROL;
- create a new direct influence;
- override CONTROL-over-SUPPORT;
- restore an impaired participant;
- impair a participant;
- change pairControlEffective;
- create annual-over-Dayun or Dayun-over-annual precedence;
- add a numeric strength score.

A root-supported year may therefore proceed only when all other R198 eligibility conditions pass and the stem
overlay itself creates a real temporal function-state change.

## Identity

Root-support observations are included in the internal R198 producer identity material.

They are not inserted into R192 assessments or the R196 bundle semantic assessment material because R200 grants
no structural-impact authority to the qualifier itself.

## Branch relation boundary

R200 does not relax the branch interaction gate.

The producer still fails closed for observed temporal:

- branch clash;
- six-combination;
- complete three-combination with a temporal participant;
- punishment pair/group;
- supported self-punishment;
- multi-Dayun annual windows.

Those cases require a later governed branch-settlement policy.

## Public boundary

Root-support observations remain internal orchestration context. R199 Official Reading output continues to
expose only the settled annual structure transition. Hidden stems, root-support flags, qualifier metadata, and
producer identity are not added to the ReadingArtifact or ProductReadingResponse.
