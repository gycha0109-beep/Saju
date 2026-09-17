# General Natal Conclusion T8 — Passage-Pinned Provenance Witness

Issue: #772  
Audit base: `a5cabffb6067fba26934e18d088229a6cc8f2ee2`

## Purpose

This artifact advances the first current General Natal provenance dependency without promoting any rule or lifecycle state.

It records immutable passage witnesses for the subset of current conclusion rules whose underlying classical taxonomy or structural relation can be located directly in the currently registered sources.

It intentionally does **not** treat a permanent Wikisource revision as sufficient Production authority.

## Permanent source revisions

Two fixed Wikisource revisions are pinned:

```text
淵海子平
oldid = 2593607

三命通會（四庫全書本）卷05
oldid = 2082207
```

The repository stores no raw passage text in this artifact. Each witness records:

```text
source id
permanent revision URL
section locator
SHA-256 of the verified short passage
bounded paraphrased proposition
source-integrity qualification
```

This gives deterministic evidence identity while preserving the existing `paraphrase_only` reuse boundary.

## Source-integrity distinction

The fixed `淵海子平` revision is immutable, but the Wikisource page itself marks the transcription incomplete and source-unverified. It is therefore classified:

```text
IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED
```

The fixed `三命通會（四庫全書本）卷05` revision is tied to the 四庫全書 edition transcription and is classified for this research artifact as:

```text
QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION
```

Neither label changes the existing repository `provenanceTier = cross_reference`, and neither revision alone authorizes `primary_supported` or `multi_source_supported`.

## Passage-pinned rule subset

Ten of the fifteen exact current rules receive bounded passage witnesses.

### T5 family taxonomy — 5 rules

```text
FAMILY-PEER-PRESENT
FAMILY-RESOURCE-PRESENT
FAMILY-OUTPUT-PRESENT
FAMILY-WEALTH-PRESENT
FAMILY-OFFICER-PRESENT
```

The witnesses establish the traditional Ten-God relation families around the day master. They do not establish numeric dominance or psychological facts.

### T8 structural relations — 5 rules

```text
OUTPUT-TO-WEALTH
WEALTH-TO-OFFICER
OFFICER-TO-RESOURCE
PEER-WEALTH-TENSION
WEALTH-RESOURCE-TENSION
```

Both pinned revisions contain direct or example-based support for these structural propositions.

The current consumer outputs remain broader than those propositions. For example, a classical generation relation does not by itself authorize a modern statement about ideas becoming deliverables, results becoming responsibility, or preparation versus execution speed.

Therefore all five remain:

```text
exactCurrentConsumerOutputProductionSupported = false
```

## Exact rules still without passage witness

The following five current exact outputs remain outside the passage-supported subset:

```text
PEER-OFFICER-TENSION
CORE-FIVE-FAMILY-CYCLE
WORK-OUTPUT-WEALTH-OFFICER
MONEY-WEALTH-PEER-RESOURCE
RELATIONSHIP-PEER-OFFICER
```

The present sources contain relevant component categories, but no verified passage establishes these exact whole-chart or modern domain projections.

They remain research-only unless separate evidence is obtained or their output scope is narrowed.

## Deterministic result

```text
exactCandidateRuleCount = 15
passageWitnessCount = 16
passagePinnedRuleCount = 10
unsupportedExactRuleCount = 5
exactCurrentRuleProductionSupportedCount = 0

immutablePassageWitnessSubsetEstablished = true
sourceIntegrityQualificationStillRequired = true
modernConsumerSemanticBridgeStillRequired = true
provenanceQualityPromotionAuthorized = false
productionProvenanceAuthorityEstablished = false
```

This resolves one earlier uncertainty:

```text
passage-level immutable witness absent for every rule
```

is no longer true for the bounded ten-rule subset.

But the larger Production proposition remains false because immutable location is not equivalent to adequate source qualification or exact consumer-semantic support.

## Required next evidence

1. qualify pinned transcriptions against a reliable edition or scan rather than treating web immutability as authority;
2. for the five structural T8 rules, narrow consumer wording to the bound proposition or obtain an explicit reviewed semantic bridge;
3. for the five unsupported exact rules, obtain independent evidence or keep them research-only;
4. only after exact support exists may `provenanceQuality` be reconsidered and new content hashes generated.

## Guardrails

This artifact performs none of the following:

```text
raw classical passage storage
source-tier mutation
provenance-quality mutation
reviewer/trust/attestation creation
pack/methodology/rule lifecycle promotion
Production activation
Gyeokguk / 強弱 / 旺衰 implementation
ProductHost / Narrative / LLM behavior change
SKU / Payment / Entitlement / Refund / Commerce change
```

Production remains HOLD.
