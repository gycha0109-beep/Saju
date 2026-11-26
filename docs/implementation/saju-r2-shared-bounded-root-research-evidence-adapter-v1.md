# SAJU-R2 Shared Bounded Root Research Evidence Adapter

Status: implementation  
Issue: #1965  
Track: `saju`  
Authority effect: **none**

## Purpose

R1 found that the repository already contains substantial bounded Root/Tonggen research but lacks a shared engine-consumable structural input.

R2 does not solve canonical 四柱有根, 無根, 強弱, 旺衰, 黨眾, 格局, or any numeric/non-numeric strength scale. It connects the already-governed bounded **positive** root-presence surface to the existing snapshot-bound ResearchEvidence runtime.

## Upstream surface

The adapter consumes exactly:

`evaluateBoundedSizhuFourYangLuRootPresenceEvidence(...)`

That merged evaluator already composes:

- 旺
- non-Earth 墓庫
- non-Earth 餘氣
- governed Yang 長生
- four governed non-Earth Yang 祿

Every observation remains `authority = research_only`.

Still unresolved:

- Yin 長生
- Yin 祿
- Earth 祿 attachment
- Earth 餘氣 completion
- global negative absence
- canonical 四柱有根 settlement

## Runtime contract

The adapter emits one deterministic envelope bound to:

```text
snapshotId
+
calculationHash
```

The payload contains:

- resolved pillar slots
- unresolved pillar slots
- the exact upstream evaluation
- explicit false authority flags

Partial pillar resolution is allowed because the upstream evaluator already permits it. Missing slots are listed explicitly and are never converted into negative evidence.

Unmaterialized scenario snapshots fail closed because a scenario can alter evidence-bearing facts.

## Non-authority invariants

```text
bounded positive root evidence != 四柱有根 settlement
no bounded evidence != 無根
observation count != strength
pillar position != weight
root evidence != 黨眾
root evidence != 強弱
root evidence != 旺衰
root evidence != 格局
ResearchEvidence envelope != Production authority
```

No external human/domain expert review gate is introduced.

## Why this is the first post-R1 integration

The main problem is no longer collecting another isolated root observation. The immediate need is to make already-governed evidence reusable by later shared structural synthesis without copying mapping tables or silently widening semantics.

The next step after this adapter is green is to define the first **consumer rule/input contract** that may consume this evidence while still prohibiting canonical root settlement and final strength classification.
