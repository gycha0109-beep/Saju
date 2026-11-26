# General Natal — selected-source Lu/Linguan term binding authority

Date: 2026-09-14  
Issue: #559  
Status: research-only semantic binding  
Production authority: BLOCKED

## Question

Can the `子平真詮 / 子平真詮評註` source chain admit the narrow terminology bridge `祿 <-> 臨官` without combining a different source tradition into a complete stem-branch Lu matcher?

## Duplicate audit

Repository searches found no dedicated selected-source Lu/Linguan authority artifact.

Existing boundaries:

- #530/#531 records the source-native heavy-root phrase containing Lu but leaves term binding and complete mapping unresolved.
- #547/#548 governs an executable Twelve-Growth table selected from `命理探源`, while explicitly keeping the Lu bridge unauthorized.
- #553/#554 governs Yangren eligibility only and keeps complete Lu branch mapping unauthorized.
- #557/#558 governs four-element Muku/Yuqi light-root mapping and does not alter Lu authority.

## Selected direct source

Selected source identity:

`子平真詮 / 子平真詮評註`, reviewed directly at:

https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm

The selected source directly states the short terminology identity `祿臨官也`.

The same source also directly supplies bounded examples `甲祿於寅，乙祿於卯`.

These observations support only the selected-source terminology bridge and bounded examples.

## Source-internal boundary

The same commentary frames the relevant growth/root doctrine at the five-element level and rejects silently treating a separate Yin-stem Lu doctrine as independently settled. The page also preserves a ten-stem forward/reverse growth-stage chart surface.

This review therefore preserves, rather than normalizes, the tension between those two surfaces:

```text
DIRECT_SOURCE_FIVE_ELEMENT_NO_SEPARATE_YIN_LU_DOCTRINE = OBSERVED
DIRECT_SOURCE_TEN_STEM_REVERSE_TABLE_PRESENT = OBSERVED
SOURCE_INTERNAL_YIN_LU_INTERPRETATION = AMBIGUOUS
```

No complete ten-stem Lu map is created from that ambiguity.

## Cross-tradition isolation

The executable research-only stage table merged in #548 selected `命理探源` as its mapping authority. That is a different source identity.

The following composition remains forbidden:

```text
#548 foreign selected-source stem×branch stage cell
+ 子平真詮評註 Lu/Linguan terminology
-> complete selected-source Lu branch matcher
```

The new authority module does not import or call the #548 stage lookup.

```text
FOREIGN_STAGE_MAPPING_AS_LU_INPUT = FORBIDDEN_CROSS_TRADITION
GENERALIZED_LINGUAN_TO_LU_ACROSS_TRADITIONS = UNAUTHORIZED
```

## Canonical representability

Canonical stem and branch inputs already exist in the calculation contracts. Representability alone is not semantic authority.

Because a source-isolated exhaustive selected-source stem×branch Lu mapping is not governed here:

```text
CANONICAL_STEM_BRANCH_INPUTS = AVAILABLE
CANONICAL_REPRESENTABILITY_SUFFICIENT_FOR_MATCHER = false
SELECTED_SOURCE_COMPLETE_LU_BRANCH_MATCHER = UNAUTHORIZED
```

No stem/branch Lu lookup function is emitted.

## Final authority verdict

```text
DIRECT_SOURCE_LU_LINGUAN_TERM_EQUIVALENCE              = OBSERVED
DIRECT_SOURCE_BOUNDED_JIA_YI_LU_EXAMPLES               = OBSERVED
DIRECT_SOURCE_FIVE_ELEMENT_NO_SEPARATE_YIN_LU_DOCTRINE = OBSERVED
DIRECT_SOURCE_TEN_STEM_REVERSE_TABLE_PRESENT           = OBSERVED
SOURCE_INTERNAL_YIN_LU_INTERPRETATION                   = AMBIGUOUS
SELECTED_SOURCE_LU_LINGUAN_TERM_BINDING                 = AUTHORIZED_RESEARCH_ONLY
SELECTED_SOURCE_COMPLETE_LU_BRANCH_MATCHER               = UNAUTHORIZED
FOREIGN_STAGE_MAPPING_AS_LU_INPUT                        = FORBIDDEN_CROSS_TRADITION
GENERALIZED_LINGUAN_TO_LU_ACROSS_TRADITIONS             = UNAUTHORIZED
LU_HEAVY_ROOT_TERM_SEMANTIC                              = OBSERVED upstream in #530/#531
GENERALIZED_ROOT_WEIGHT_CLASSIFIER                       = UNAUTHORIZED
```

## Explicit non-authority

This primitive does not authorize:

```text
foreign stage cell -> selected-source Lu
bounded Jia/Yi examples -> all ten stems
Yin reverse-growth table -> heavy-root Lu
Linguan/Lu equivalence across all traditions
Lu -> numeric weight
Lu -> ordinary strong/weak
Lu -> GEJU candidate
Lu -> GEJU establishment
production fact emission
```

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
