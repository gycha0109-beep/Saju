# ADR-0024 — One Isolated Source-Directed 三刑 Pair as Qualifier-Only Context

- Status: Accepted
- Date: 2026-10-07
- Decision: GH-2377
- Extends: ADR-0023
- Research basis: R056 / GH-988, R059 / GH-992, R205 / GH-2369

## Context

R205 corrected the 寅巳申 / 丑戌未 detector to preserve the source-defined direction of six punishment edges:

- 寅 -> 巳
- 巳 -> 申
- 申 -> 寅
- 丑 -> 戌
- 戌 -> 未
- 未 -> 丑

Those identities remained fail-closed pending separate qualifier authority.

The source also preserves the effect boundary `凡見刑不可便以凶論`. Therefore a directed punishment identity does not itself authorize punishment effect or harmful polarity.

## Decision

R206 admits exactly one isolated source-directed punishment pair as internal qualifier context when:

1. the target year resolves to exactly one Dayun segment;
2. the complete temporal branch-relation set contains exactly one relation;
3. that relation is a source-directed punishment pair;
4. its parsed punisher/punished branches match one of the six R205 canonical edges.

The observation records:

- relation identity;
- source direction;
- punisher branch;
- punished branch.

It explicitly does not authorize:

- punishment effect;
- favorable/harmful polarity;
- conflict resolution;
- function-state override;
- temporal precedence;
- numeric weight;
- full-family amplification.

## Double gate

The qualifier resolver does not trust the `punishment_directed_pair` prefix alone.

It reparses the relation ID and requires an exact branch-direction match against the six governed R205 edges. Future detector expansion cannot silently widen R206 authority.

## Structural boundary

The qualifier itself is excluded from R192 role impact and R196 governed semantic assessments.

Only the existing annual/Dayun stem overlay may create function-state change. If no independent stem effect exists, the producer still returns `no_temporal_stem_effect`.

Any second branch relation causes `branch_relation_requires_settlement`.

## Public boundary

Official Reading may render the independently settled annual structure transition, but the directed punishment relation ID, punisher/punished branch metadata, qualifier flags, and effect-authority flags remain internal.
