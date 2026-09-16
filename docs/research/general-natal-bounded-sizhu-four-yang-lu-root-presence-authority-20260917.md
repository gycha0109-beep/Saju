# General Natal — Bounded 四柱 Four-Yang 祿 Root-Presence Authority

Date: 2026-09-17  
Issue: #738  
Decision: `AUTHORIZED_RESEARCH_ONLY`

## 1. Scope

This artifact governs exactly one narrow composition:

```text
governed_four_yang_lu_to_bounded_sizhu_root_presence_evidence
```

It extends the already-governed #734 bounded positive four-pillar root-presence surface with only #590 four non-Earth Yang-stem 祿 positives.

It does not create a general 祿 classifier and does not settle canonical `四柱有根`.

## 2. Direct selected-source observations

Selected source:

```text
子平真詮 / 子平真詮評註
論十幹得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh review on 2026-09-17 preserves the relevant text:

```text
十幹不論月令休囚，只要四柱有根，便能受財官食神而當傷官七煞。
長生祿旺，根之重者也；墓庫餘氣，根之輕者也。
...
得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類。
```

The source directly places `祿` inside the heavy-root sentence and inside the bounded `長生祿刃` operand.

This artifact consumes that semantic only through already-governed executable upstream authority. It does not infer a new raw stem/branch Lu table.

## 3. Exact upstream authority

### 3.1 #734 — bounded 四柱 evidence through Yang 長生

Executable upstream:

```text
src/research/general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.ts
```

The upstream surface already preserves:

```text
旺
墓庫
餘氣
Yang 長生 established
```

with explicit `PillarSlot` provenance.

The following remain false there and remain false here:

```text
sizhuHasRootSettled = false
absenceMeansNoRoot = false
observationCountSemanticsAssigned = false
positionWeightAssigned = false
```

This artifact pins the exact upstream version and definition hash at runtime.

### 3.2 #590 — four non-Earth Yang 祿 heavy-root matcher

Executable upstream:

```text
src/research/general-natal-four-yang-lu-heavy-root-authority.ts
```

The only admitted positive state is:

```text
甲 + 寅 -> lu_heavy_root_established
丙 + 巳 -> lu_heavy_root_established
庚 + 申 -> lu_heavy_root_established
壬 + 亥 -> lu_heavy_root_established
```

Governed Yang mismatches return:

```text
no_governed_lu_match
```

All Yin stems and both Earth stems return:

```text
outside_governed_yang_non_earth_scope
```

That state is a scope boundary only. It is not evidence of:

```text
no Lu
no root
四柱無根
```

#590 also preserves:

```text
sourceInternalYinLuInterpretation = AMBIGUOUS
yinStemLuMatcherAuthorized = false
earthStemLuMatcherAuthorized = false
```

This artifact pins #590 exact version and definition hash at runtime.

## 4. Why #604 is not the matcher upstream

#604 proves an already-established #590 祿 positive can be consumed as the `祿` constituent of a separate bounded relative-comparison operand.

That is not the semantic surface governed here.

This artifact therefore calls #590 directly for each supplied canonical pillar branch and does not consume #604 as a substitute matcher.

No peer count or chart-level comparison is executed.

## 5. Canonical representability

Canonical contracts provide:

```text
StemFact.value
StemFact.yinYang
StemFact.element
PillarSlot = year | month | day | hour
EarthlyBranch
```

Input remains:

```ts
Pick<StemFact, 'value' | 'yinYang' | 'element'>
Readonly<Partial<Record<PillarSlot, EarthlyBranch>>>
```

The evaluator:

1. evaluates #734 first and preserves all upstream observations;
2. iterates canonical pillar slots in the existing bounded root-presence order;
3. calls #590 `evaluateFourYangLuHeavyRoot(dayMaster, branch)` for each supplied branch;
4. adds a new observation only when `heavyRootState === 'lu_heavy_root_established'`;
5. preserves the originating `pillarSlot` and `branch`;
6. accepts no arbitrary precomputed Lu evaluation object.

Missing pillar slots remain omitted and non-negative.

## 6. Newly authorized observation

The newly admitted observation shape is bounded to:

```text
pillarSlot
branch
sourceRootKind = 祿
upstreamState  = lu_heavy_root_established
authority      = research_only
```

The evaluator may therefore produce existing #734 observations together with governed 祿 observations.

Aggregate state remains only:

```text
bounded_positive_root_presence_for_sizhu_context_observed
```

or:

```text
no_bounded_root_presence_evidence
```

Neither state settles canonical `四柱有根` or `四柱無根`.

## 7. Authorized verdict

```text
DIRECT_SOURCE_LU_AS_HEAVY_ROOT                         = OBSERVED
DIRECT_SOURCE_LU_IN_CHANGSHENG_LU_REN_OPERAND          = OBSERVED
CANONICAL_DAY_MASTER_VALUE                             = AVAILABLE
CANONICAL_DAY_MASTER_YINYANG                           = AVAILABLE
CANONICAL_DAY_MASTER_ELEMENT                           = AVAILABLE
CANONICAL_PILLAR_SLOT_PROVENANCE                       = AVAILABLE
UPSTREAM_734_BOUNDED_EVIDENCE                          = AUTHORIZED_RESEARCH_ONLY
UPSTREAM_590_FOUR_YANG_LU_MATCHER                      = AUTHORIZED_RESEARCH_ONLY
FOUR_YANG_LU_TO_BOUNDED_ROOT_PRESENCE_EVIDENCE         = AUTHORIZED_RESEARCH_ONLY
```

## 8. Required fail-closed boundary

```text
YIN_STEM_LU_MATCHER                                    = UNAUTHORIZED
EARTH_STEM_LU_MATCHER                                  = UNAUTHORIZED
YIN_LU_AMBIGUITY_RESOLUTION                            = UNAUTHORIZED
EARTH_LU_ATTACHMENT_SELECTION                          = UNAUTHORIZED
GENERIC_TWELVE_GROWTH_STAGE_TO_LU                      = UNAUTHORIZED
HIDDEN_STEM_ORDER_TO_LU                                = UNAUTHORIZED
ARBITRARY_PRECOMPUTED_LU_TO_PILLAR_PROVENANCE          = UNAUTHORIZED
CANONICAL_SIZHU_HAS_ROOT_RESOLVER                      = UNAUTHORIZED
ROOT_EVIDENCE_TO_SIZHU_HAS_ROOT_SETTLEMENT             = UNAUTHORIZED
NO_BOUNDED_EVIDENCE_TO_SIZHU_NO_ROOT                   = UNAUTHORIZED
ROOT_EVIDENCE_COUNT_TO_STRENGTH                        = UNAUTHORIZED
ROOT_POSITION_TO_WEIGHT                                = UNAUTHORIZED
THREE_PEER_COMPARISON_EXECUTION                        = UNAUTHORIZED
TRANSITIVE_OR_GLOBAL_ROOT_RANKING                      = UNAUTHORIZED
FINAL_QIANG_RUO                                        = UNAUTHORIZED
FINAL_WANG_SHUAI                                       = UNAUTHORIZED
GEJU_CANDIDATE                                         = UNAUTHORIZED
GEJU_ESTABLISHMENT                                     = UNAUTHORIZED
PRODUCTION_FACT_EMISSION                               = UNAUTHORIZED
SKU                                                    = UNAUTHORIZED
COMMERCE                                               = UNAUTHORIZED
```

## 9. Explicit non-authority

Do not infer or implement:

```text
Yin stem outside governed Lu scope -> no Lu
Yin stem outside governed Lu scope -> no root
Earth stem outside governed Lu scope -> no Lu
Earth stem outside governed Lu scope -> no root
same-element Yin stem inherits governed Yang Lu branch
source-internal Yin-Lu ambiguity resolution
Earth Lu attachment selection
#548 Twelve-Growth cells -> selected-source Lu
hidden-stem ordering -> Lu/root class
祿 evidence -> canonical 四柱有根=true
zero bounded evidence -> 四柱無根
missing pillar -> negative root evidence
祿 observation count -> strength
pillar position -> numeric or nonnumeric root weight
month 祿 -> automatic strongest root
祿 -> 黨眾 / 助寡 / 強 / 不弱
祿 -> final 強弱 / 旺衰
three-peer comparison execution
transitive/global root ranking
Gyeokguk candidate or establishment
Production fact / SKU / Commerce
```

## 10. Test contract

Tests must prove:

- selected-source 祿 observations remain pinned;
- all #734 upstream observations remain preserved;
- each of `甲-寅`, `丙-巳`, `庚-申`, `壬-亥` can add a provenance-preserving `祿 / lu_heavy_root_established` observation;
- governed Yang mismatch adds no 祿 positive;
- Yin and Earth outside-scope cases add no 祿 positive and remain non-negative;
- partial pillar maps are accepted;
- arbitrary precomputed Lu evaluations are not accepted by the public evaluator API;
- #734 and #590 exact version/hash authority is pinned;
- count and position semantics remain false;
- `sizhuHasRootSettled` remains false;
- resolver, comparison execution, ranking, strength, Gyeokguk, Production, SKU, and Commerce remain fail-closed.

## 11. Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```
