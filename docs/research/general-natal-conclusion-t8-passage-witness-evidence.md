# General Natal Conclusion T8 — Passage-Pinned Provenance Witness

Issue: #772  
Audit base: `8b757241c6ba3b49defad182309e0ca8834a3895`

## Purpose

This artifact advances the first current General Natal provenance dependency without promoting any rule or lifecycle state.

It records immutable passage witnesses for the subset of current conclusion rules whose underlying classical taxonomy or structural relation can be located directly in the currently registered sources.

A permanent web revision is evidence identity, not sufficient Production authority.

## Permanent registered-source revisions

```text
淵海子平
oldid = 2593607
integrity = IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED

三命通會（四庫全書本）卷05
oldid = 2082207
integrity = QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION
```

The artifact stores no raw passage text. Each witness records the registered source id, permanent revision URL, section locator, SHA-256 passage digest, bounded paraphrased proposition, and source-integrity qualification.

Neither fixed revision changes the existing `provenanceTier = cross_reference`, and neither revision alone authorizes `primary_supported` or `multi_source_supported`.

## Passage-pinned rule subset

Ten of the fifteen exact current rules receive at least one bounded passage witness.

### T5 family taxonomy — 5 rules

```text
FAMILY-PEER-PRESENT
FAMILY-RESOURCE-PRESENT
FAMILY-OUTPUT-PRESENT
FAMILY-WEALTH-PRESENT
FAMILY-OFFICER-PRESENT
```

The four resource/output/wealth/officer families are bound to both currently registered source surfaces.

The peer family is intentionally different:

```text
peer passage witness = 淵海子平 only
peer multi-source witness = false
```

`三命通會（四庫全書本）卷05 / 論古人立印食官財名義` directly defines the four relations `生我 / 我生 / 克我 / 我克` and their 印、食、官、財 meanings, but it does not directly establish the normalized same-kind `比肩 + 劫財` peer grouping. It must not be counted as a second peer-family witness merely to make the source count symmetrical.

A separate fresh cross-check found direct peer terminology in `三命通會（四庫全書本）卷07` (`oldid=2082208`, 兄弟引例章), but that volume is not one of the current conclusion candidate's registered source refs. This artifact therefore does not silently promote it into the candidate or use it to claim two-source peer support.

### T8 structural relations — 5 rules

```text
OUTPUT-TO-WEALTH
WEALTH-TO-OFFICER
OFFICER-TO-RESOURCE
PEER-WEALTH-TENSION
WEALTH-RESOURCE-TENSION
```

Both currently registered source surfaces contain bounded direct or example-based structural support for these five relations.

The current consumer outputs remain broader than those structural propositions. Classical generation/control language does not by itself authorize modern statements about ideas becoming deliverables, results becoming responsibility, preparation versus execution speed, or comparable consumer projections.

Therefore every passage-pinned rule still has:

```text
exactCurrentConsumerOutputProductionSupported = false
```

## Exact rules still without passage witness

```text
PEER-OFFICER-TENSION
CORE-FIVE-FAMILY-CYCLE
WORK-OUTPUT-WEALTH-OFFICER
MONEY-WEALTH-PEER-RESOURCE
RELATIONSHIP-PEER-OFFICER
```

Relevant component categories exist, but no currently registered passage establishes these exact whole-chart or modern domain outputs.

## Deterministic result

```text
exactCandidateRuleCount = 15
passageWitnessCount = 16
passagePinnedRuleCount = 10
singleSourcePassagePinnedRuleCount = 1
multiSourcePassagePinnedRuleCount = 9
unsupportedExactRuleCount = 5
exactCurrentRuleProductionSupportedCount = 0

immutablePassageWitnessSubsetEstablished = true
peerFamilyPassageWitnessEstablished = true
peerFamilyMultiSourceWitnessEstablished = false
sourceIntegrityQualificationStillRequired = true
modernConsumerSemanticBridgeStillRequired = true
provenanceQualityPromotionAuthorized = false
productionProvenanceAuthorityEstablished = false
```

This narrows the earlier uncertainty: immutable passage witnesses now exist for a bounded ten-rule subset, but passage identity is not equivalent to source qualification or exact consumer-semantic support.

## Required next evidence

1. qualify pinned transcriptions against a reliable edition or scan rather than treating web immutability as authority;
2. keep the peer-family rule single-source unless a separately registered current-candidate source directly supports the same-kind peer grouping;
3. for the five structural T8 rules, narrow consumer wording to the bound proposition or obtain an explicit reviewed semantic bridge;
4. for the five unsupported exact rules, obtain separate evidence or keep them research-only;
5. only after exact support exists may `provenanceQuality` be reconsidered and new content hashes generated.

## Guardrails

No raw classical passage storage, unregistered-source promotion, source-tier mutation, provenance-quality mutation, reviewer/trust/attestation creation, lifecycle promotion, Production activation, Gyeokguk/強弱/旺衰 implementation, ProductHost/Narrative/LLM behavior change, or Commerce activation occurs here.

Production remains `HOLD`.
