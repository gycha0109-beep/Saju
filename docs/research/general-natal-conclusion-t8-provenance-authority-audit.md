# General Natal Conclusion T8 — Production Provenance Authority Audit

Issue: #772  
Audit base: `61544574bae80a06a0b08e9bced950d860388973`

## Purpose

This audit freezes the next provenance frontier after #730/#770:

```text
GENERAL_NATAL_CONCLUSION_T8_PROVENANCE_AUTHORITY
```

It does not mutate source tiers, provenance quality, review status, lifecycle state, or Production behavior.

## Registered source surface

The exact conclusion candidate currently consumes two registered classical transcription sources:

```text
SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE
SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS
```

Both are registered as:

```text
provenanceTier = cross_reference
```

That tier is permitted by the current Production execution-plan contract. The present blocker is not source-tier registration.

The registered source targets do contain relevant classical structure. The 三命通會 locator `論古人立印食官財名義` contains the 生我 / 我生 / 克我 / 我克 framing, 生克制化, 官/印 linkage, 財/劫 conflict, and 財/印 conflict. The registered 淵海子平 target contains sections for 傷官, 食神, 財, 官, 印, and 劫財 and includes context-sensitive relations equivalent to 傷官/食神 with 財, 財生官, 官印相生, 財破印, and 劫財奪財.

The audit deliberately records short anchor labels only. It does not copy source text into runtime authority.

## Why two source refs are still insufficient

Every exact audited rule currently has two source references, but `multi_source_supported` is a semantic authority claim, not a source-count shortcut.

Current repository source objects bind broad title/locator/URL metadata. They do not bind:

```text
immutable passage witness
repository-pinned passage checksum
passage -> exact rule content hash mapping
required source qualifiers -> exact consumer wording mapping
```

Therefore:

```text
2 source refs != exact Production provenance authority
```

No `secondary_only -> multi_source_supported` mutation is authorized by this audit.

## Rule-by-rule support matrix

### T5 family-presence rules

| Rule | What the sources support | Exact-output blocker |
| --- | --- | --- |
| `FAMILY-PEER-PRESENT` | 比肩/劫財 peer-side taxonomy | normalized family grouping and exact emitted object are not passage-pinned |
| `FAMILY-RESOURCE-PRESENT` | 正印/偏印 resource-side taxonomy | normalized family grouping and exact emitted object are not passage-pinned |
| `FAMILY-OUTPUT-PRESENT` | 食神/傷官 output-side taxonomy | normalized family grouping and exact emitted object are not passage-pinned |
| `FAMILY-WEALTH-PRESENT` | 正財/偏財 wealth-side taxonomy | normalized family grouping and exact emitted object are not passage-pinned |
| `FAMILY-OFFICER-PRESENT` | 正官/偏官(七殺) officer-side taxonomy | normalized family grouping and exact emitted object are not passage-pinned |

Classification:

```text
TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING
```

### T8 structural-relation rules

| Rule | Classical structural support | Exact consumer projection |
| --- | --- | --- |
| `OUTPUT-TO-WEALTH` | strong | unbound |
| `WEALTH-TO-OFFICER` | strong | unbound |
| `OFFICER-TO-RESOURCE` | strong | unbound |
| `PEER-WEALTH-TENSION` | strong | unbound |
| `WEALTH-RESOURCE-TENSION` | strong | unbound |
| `PEER-OFFICER-TENSION` | partial / indirect | unbound |

The structural relations are real evidence. They do not directly establish the current modern summaries about ideas, execution, results, responsibility, costs, preparation, autonomy, or external rules for the exact content-addressed output.

### T8 synthesis / domain-projection rules

| Rule | Verdict |
| --- | --- |
| `CORE-FIVE-FAMILY-CYCLE` | source relations exist, but the exact five-family whole-chart synthesis is not established |
| `WORK-OUTPUT-WEALTH-OFFICER` | exact modern work-role projection is not established |
| `MONEY-WEALTH-PEER-RESOURCE` | exact modern money/allocation projection is not established |
| `RELATIONSHIP-PEER-OFFICER` | exact modern interpersonal-boundary projection is not established |

These rules must not inherit Production provenance merely because their input families participate in classical relations.

## Deterministic verdict

The permanent audit resolves the current repository state as:

```text
exactRuleCount = 15
structuralEvidencePresentCount = 15
passageLevelImmutableWitnessBoundCount = 0
exactOutputSemanticsProductionBoundCount = 0
productionEligibleExactRuleCount = 0

productionSourceTierRegistrationGap = false
classicalStructuralEvidenceAbsent = false
exactPassageToContentHashBindingMissing = true
exactConsumerSemanticBridgeMissing = true
blanketMultiSourcePromotionAuthorized = false
productionProvenanceAuthorityEstablished = false

Production provenance authority = HOLD
```

`structuralEvidencePresentCount = 15` means every rule is built from categories or relations that have some relevant classical basis. It does not mean every exact consumer output is source-authorized.

## Required next evidence

Before any Production provenance promotion:

1. bind an immutable or repository-pinned passage witness for each asserted relation;
2. map each exact content-addressed rule output to the passage proposition it actually preserves;
3. narrow or rewrite consumer wording that exceeds the bound proposition;
4. only then assign `primary_supported` or `multi_source_supported` to the newly supported exact rule content and regenerate downstream content hashes.

A mutable web transcription or a broad section locator may be used for research discovery, but it is not by itself an exact rule-content authority record.

## Guardrails

This audit performs none of the following:

```text
provenance quality mutation
source-tier mutation
reviewer/trust/attestation creation
pack/methodology/rule lifecycle promotion
Production activation
Gyeokguk or 強弱/旺衰 implementation
ProductHost / Narrative / LLM behavior changes
SKU / Payment / Entitlement / Refund / Commerce changes
```

The downstream domain-review and trust-pinned attestation frontier remains unopened until actual provenance authority exists.
