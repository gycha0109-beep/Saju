# General Natal Gyeokguk root-weight classification primitive authority review

Date: 2026-09-13  
Issue: #530  
Status: research-only / canonical-execution hold  
Production authority: BLOCKED

## Question

Can the remaining establishment primitive `root_weight_classification` be promoted into a generalized executable classifier from the selected source body and current canonical facts?

## Upstream boundary

Merged #521/#522 established governed raw inputs including pillar identities, `derivedFacts.dayMaster`, hidden-stem membership, Ten-God facts, and structural relations. It explicitly kept source-semantic primitives separate from factual substrate.

This review chains to the #521 canonical-input binding object by version and definition hash, and separately freezes `HIDDEN_STEM_MEMBERSHIP_VERSION` plus `HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH`.

The hidden-stem dataset remains membership-only. Its array order is storage order and is not authority for root weight, main/secondary/residual rank, or month-command duration.

## Direct source findings

The reviewed `子平真詮 / 子平真詮評注` surface in the section commonly titled `論十干得時不旺失時不弱` states:

```text
長生祿旺，根之重者也；墓庫餘氣，根之輕者也
```

It also gives bounded comparisons:

```text
得一比肩，不如得支中一墓庫，如甲逢未、丙逢戌之類
得二比肩，不如得一餘氣，如乙逢辰、丁逢未之類
得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類
```

and an explicit exception:

```text
陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣
```

The selected body therefore directly supports these semantic observations:

```text
HEAVY_ROOT_CLASS_SEMANTIC = OBSERVED
LIGHT_ROOT_CLASS_SEMANTIC = OBSERVED
RELATIVE_ROOT_COMPARISON_EXAMPLES = OBSERVED
YIN_GROWTH_EXCEPTION = OBSERVED
```

External body verification used during this review included the Chinese Text Project `子平真詮評注` surface and independent public transcriptions reproducing the same passage. Those web surfaces verify the reviewed text; they do not independently authorize repository execution.

## Why this is not yet a generalized classifier

Canonical facts currently expose the day master and branch identities, and hidden-stem membership is governed. They do not expose an independently governed complete mapping from arbitrary stem/branch pairs to the source-native classes named by the passage.

A generalized implementation would still have to decide at least:

```text
complete_stem_branch_root_class_mapping
changsheng_lu_wang_ren_term_binding
yin_stem_growth_exception_generalization
muku_yuqi_complete_stem_branch_mapping
relative_comparison_to_non_numeric_weighting_rule
```

Those decisions cannot be supplied by hidden-stem storage order. They also cannot be imported silently from a conventional Twelve-Growth table because the current repository has not governed such a table for this semantic purpose.

The explicit `陰長生不作此論` clause is especially important: a naive Yin/Yang-symmetric stage lookup would erase a distinction directly preserved by the reviewed source.

## Decision

```text
ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE = PARTIALLY_AUTHORIZED
CANONICAL_DAY_MASTER_INPUT = AVAILABLE
CANONICAL_BRANCH_INPUT = AVAILABLE
HIDDEN_STEM_MEMBERSHIP = AVAILABLE_MEMBERSHIP_ONLY
DIRECT_SOURCE_HEAVY_ROOT_CLASS = OBSERVED
DIRECT_SOURCE_LIGHT_ROOT_CLASS = OBSERVED
DIRECT_SOURCE_RELATIVE_ROOT_EXAMPLES = OBSERVED
DIRECT_SOURCE_YIN_GROWTH_EXCEPTION = OBSERVED
COMPLETE_STEM_BRANCH_ROOT_CLASS_MAPPING = UNAVAILABLE
BOUNDED_SOURCE_EXAMPLE_MATCHER = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

This is stronger than an undifferentiated `UNRESOLVED`: the source-native heavy/light distinction and relative examples are now governed research observations. The missing authority is the canonical executable mapping layer.

## Explicit non-authority

This review forbids:

```text
hidden-stem array position -> root weight
hidden-stem membership -> complete root stage
ungoverned Twelve-Growth table -> canonical classifier
Yin/Yang symmetry -> source rule
bounded examples -> all-stem extrapolation
comparative wording -> numeric score
root weight -> ordinary strength equivalence
```

`ordinary_strength_classification` remains a separate unresolved primitive.

## Product boundary

```text
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
NEXT_PRODUCTION_SKU = NONE
Commerce = HOLD
```

No production runtime, ProductHost, Character, Narrative, LLM, API/browser, SKU, payment, entitlement, refund, or Commerce authority is added.

## Next honest frontier

The next useful work is one of:

1. independently govern a complete source-compatible stem/branch root-class mapping, including the Yin-growth exception; or
2. move to another unresolved establishment primitive whose source semantics and canonical inputs can be bounded without inventing that mapping.

Until such authority exists, no generalized `root_weight_classification` producer is permitted.
