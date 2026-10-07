# ADR-0023 — Source-Directed 三刑 Pair Identity Detection

- Status: Accepted
- Date: 2026-10-07
- Product authority: none added
- Decision: GH-2369
- Extends: ADR-0022
- Research basis: R056 / GH-988; 三命通會 卷二 論三刑

## Context

The annual branch detector previously represented the 寅巳申 and 丑戌未 punishment families as unordered three-member groups and emitted `punishment_group` whenever two members were present.

The source does preserve all three unordered member pairs, so the membership surface itself is not the principal error. The loss is directional identity.

The source enumerates:

- 寅刑巳
- 巳刑申
- 申刑寅
- 丑刑戌
- 戌刑未
- 未刑丑

Therefore the canonical structural relation is a directed edge, not a symmetric group-pair relation.

## Decision

Replace the broad `punishment_group` relation identity with source-directed pair identities:

```text
寅 -> 巳
巳 -> 申
申 -> 寅

丑 -> 戌
戌 -> 未
未 -> 丑
```

The detector canonicalizes by branch semantics, not by array order or temporal layer order. If annual/dayun positions are reversed, `punisher` and `punished` remain determined by the source-defined branch edge.

Canonical internal relation form:

```text
punishment_directed_pair:
  punisher:<layer-key>:<branch>
  ->
  punished:<layer-key>:<branch>
```

## Authority boundary

R205 grants detection authority only.

It does **not** authorize:

- isolated directed-pair qualifier admission;
- punishment effect;
- harmful/favorable polarity;
- structure impact;
- conflict resolution;
- temporal precedence;
- numeric weight or severity;
- full-three-member amplification;
- public Reading exposure.

Any detected directed punishment pair therefore continues to produce `branch_relation_requires_settlement` under the bounded annual producer.

## Regression boundary

R201 六合, R202 六沖, R203 自刑, and R204 子卯刑 qualifier behavior remain unchanged.

A future R206 may separately decide whether exactly one isolated directed punishment pair can be admitted as qualifier-only context.
