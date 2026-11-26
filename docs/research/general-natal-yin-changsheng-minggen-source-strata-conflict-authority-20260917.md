# General Natal — Yin Changsheng Minggen Source-Strata Conflict Authority Review

Date: 2026-09-17  
Issue: #740  
Scope: `yin_changsheng_minggen_source_strata_conflict_review`

## Decision

```text
UNRESOLVED
```

This review does **not** create an executable Yin 長生 root classifier. It records that the selected `子平真詮 / 子平真詮評註` source package contains two directly conflicting strata on whether Yin 長生 should count as root evidence.

## Fresh base

```text
3b139d03c544e2433b1b969eaab4dd78df6cde5b
```

That main SHA contains merged PR #739 / issue #738, whose bounded 四柱 positive root-presence surface currently consumes only:

```text
旺
墓庫
餘氣
Yang 長生 established
甲-寅 / 丙-巳 / 庚-申 / 壬-亥 governed Yang 祿 positives
```

and still keeps:

```text
sizhuHasRootSettled = false
absenceMeansNoRoot = false
observationCountSemanticsAssigned = false
positionWeightAssigned = false
```

## Selected source

`子平真詮 / 子平真詮評註 — 論十幹得時不旺失時不弱`

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

Fresh review on 2026-09-17 confirms that the page is not semantically flat. It contains the classical/root-clause text followed immediately by commentary that disputes part of that clause.

## Source stratum A — classical/root clause

The relevant statement is:

```text
陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣。
```

Bounded observations only:

1. Yin 長生 is excluded from the preceding `長生祿旺，根之重者也` treatment.
2. The same sentence nevertheless calls Yin 長生 `明根`.
3. The same sentence says it is comparable to one `餘氣`.

The third observation is a comparison phrase, not an equality operator. It does not authorize `明根 == 餘氣` or a light-root class.

## Source stratum B — commentary

The immediately following commentary says:

```text
至於陰長生，既雲不作此論，又雲亦為有根，可比一餘氣云云，實未明生旺墓絕之理，不免矛盾。
木至午，火至酉，皆為死地，豈得為根？
```

This is not merely additional detail. It directly objects to the root assertion in the preceding stratum and labels the treatment contradictory.

Therefore the selected combined transcription/commentary package itself contains a source-strata conflict:

```text
classical/root clause -> Yin 長生 is 明根
commentary           -> disputes that it is root at all
```

## Existing upstream authority

### #549 / PR #551 — Changsheng root binding

Upstream research-only matcher remains executable only for:

```text
stage != 長生 -> not_applicable
Yang 長生     -> established
Yin 長生      -> excluded_by_yin_exception
```

Its existing boundary is preserved exactly:

```text
yinChangshengMinggenSemanticObserved = true
yinChangshengMinggenClassifierAuthorized = false
yinChangshengYuqiEquivalenceAuthorized = false
```

The current review does not alter #551.

### #738 / PR #739 — bounded 四柱 positive root presence

The aggregate positive-evidence authority is also preserved unchanged. It does not currently consume Yin 長生 as positive evidence and it does not settle canonical `四柱有根`.

## Why positive-root promotion remains blocked

Canonical data is not the blocker. The repository can already represent:

```text
StemFact.value
StemFact.yinYang
PillarSlot
EarthlyBranch
Twelve-Growth stage through governed upstream authority
```

The blocker is semantic authority. No governed rule currently states that, when a classical/root-clause stratum and its attached commentary disagree, one layer automatically overrides the other for executable semantics.

Without such a precedence rule, either of these implementations would silently choose a side:

```text
Yin 長生 -> positive root evidence
Yin 長生 -> no root
```

Both remain unauthorized.

## Authority verdict

```text
CLASSICAL_YIN_CHANGSHENG_MINGGEN_STATEMENT       = OBSERVED
CLASSICAL_YIN_CHANGSHENG_YUQI_COMPARISON         = OBSERVED
COMMENTARY_YIN_CHANGSHENG_ROOT_OBJECTION          = OBSERVED
SOURCE_STRATA_CONFLICT                            = OBSERVED
SOURCE_STRATA_PRECEDENCE_RULE                     = MISSING
SOURCE_STRATA_RESOLUTION                          = UNRESOLVED

YIN_CHANGSHENG_MINGGEN_CLASSIFIER                 = UNAUTHORIZED
YIN_CHANGSHENG_TO_YUQI_EQUIVALENCE                = UNAUTHORIZED
YIN_CHANGSHENG_TO_POSITIVE_ROOT_PRESENCE          = UNAUTHORIZED
YIN_CHANGSHENG_TO_NO_ROOT                         = UNAUTHORIZED
YIN_CHANGSHENG_TO_BOUNDED_SIZHU_ROOT_PRESENCE     = UNAUTHORIZED
CANONICAL_SIZHU_HAS_ROOT_RESOLVER                 = UNAUTHORIZED
ROOT_EVIDENCE_TO_SIZHU_HAS_ROOT_SETTLEMENT        = UNAUTHORIZED
NO_BOUNDED_EVIDENCE_TO_SIZHU_NO_ROOT              = UNAUTHORIZED
ROOT_EVIDENCE_COUNT_TO_STRENGTH                    = UNAUTHORIZED
ROOT_POSITION_TO_WEIGHT                            = UNAUTHORIZED
FINAL_QIANG_RUO                                    = UNAUTHORIZED
FINAL_WANG_SHUAI                                   = UNAUTHORIZED
PRODUCTION_FACT_EMISSION                           = UNAUTHORIZED
```

## Explicit non-authority

This review must not be used to infer:

```text
classical 明根 text -> executable root positive
commentary objection -> executable no-root
比得一餘氣 -> 餘氣 equivalence
Yin 長生 -> light root
Yin 長生 -> heavy root
Yin 長生 -> 四柱 positive observation
one source stratum wins because it is older/newer
one source stratum wins because of author/editor identity
one source stratum wins because it appears first/last on the page
bounded root evidence -> 四柱有根 settlement
absence of bounded evidence -> 四柱無根
count / position weighting
黨眾 / 助寡
強 / 不弱 / final 強弱 / 旺衰
Gyeokguk candidate / establishment
Production fact / SKU / Commerce
```

## Implementation shape

This artifact is deliberately **non-executable**:

```text
no exported classifier function
no chart evaluator
no PillarSlot loop
no new root observation
```

It exports only immutable source observations, upstream version/hash pins, an `UNRESOLVED` decision, fail-closed authority flags, and a definition hash.

## Next valid frontier

A future change may revisit Yin 長生 positive-root promotion only after one of the following becomes governed:

1. an explicit source-strata precedence policy for classical text vs attached commentary; or
2. an independently selected direct source that resolves the Yin 長生 root-status question without importing an ungoverned convention.

Until then the correct state is unresolved, not positive and not negative.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```
