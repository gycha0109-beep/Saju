# General Natal — Canonical Yin → 印綬 Source-Category Member Authority

Date: 2026-09-16
Issue: #678
Status: research-only authority

## 1. Decision

Authorize exactly one bounded admission primitive:

```text
resolved canonical 정인 -> 正印 -> 印綬 source-category member
resolved canonical 편인 -> 偏印 -> 印綬 source-category member
```

This is **not** a chart scanner, 印 counter, 黨眾 resolver, 強弱 classifier, Gyeokguk resolver, or Production authority.

Decision:

```text
AUTHORIZED_RESEARCH_ONLY
```

## 2. Direct source

Selected source:

```text
子平真詮 / 子平真詮評註
三十五、論印綬
https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm
```

Freshly reverified on 2026-09-16:

```text
印綬喜其生身，正偏同為美格，故財與印不分偏正，同為一格而論之。
```

The governed upstream source artifact is:

```text
src/research/general-natal-yinshou-zheng-pian-source-category-authority.ts
```

It establishes only the source-side observation that the 正/偏 variants of 印 are grouped under the `印綬` discussion/category. It does not by itself bind Korean canonical Ten-God labels to those variants.

## 3. Canonical vocabulary bridge

Merged Issue #672 / PR #677 added the separate pinned-vocabulary bridge:

```text
정인 -> 正印
편인 -> 偏印
```

Authority file:

```text
src/research/general-natal-canonical-yin-hanja-label-bridge-authority.ts
```

Its provenance is the exact dependency consumed by Saju:

```text
manseryeok@2.0.0
TEN_GOD_HANJA
정인 -> 正印
편인 -> 偏印
```

Merged SHA:

```text
f8859125578bb21aa15a99d6074e01c0e10a0638
```

That authority is lexical/provenance-only. This issue is the first artifact allowed to combine that lexical bridge with the independently governed `印綬` 正/偏 category observation.

## 4. Canonical input boundary

The calculation contract exposes:

```ts
FactState<TenGod>
```

with exactly these states:

```text
resolved
ambiguous
unavailable
```

The current General Natal canonical-input binding authority already governs:

```text
derivedFacts.tenGods
```

The evaluator in this artifact accepts **one already-supplied `FactState<TenGod>` only**.

It does not:

- choose a pillar slot;
- iterate a `TenGodChartFact`;
- inspect branch Ten-Gods;
- inspect hidden stems;
- recompute a Ten-God relationship.

## 5. Exact behavior

### 5.1 Resolved 정인

```text
input.status       = resolved
input.value        = 정인
state              = yinshou_source_category_member_observed
canonicalLabel     = 정인
sourceLabel        = 正印
sourceCategory     = 印綬
membershipObserved = true
```

### 5.2 Resolved 편인

```text
input.status       = resolved
input.value        = 편인
state              = yinshou_source_category_member_observed
canonicalLabel     = 편인
sourceLabel        = 偏印
sourceCategory     = 印綬
membershipObserved = true
```

### 5.3 Other resolved Ten-Gods

For the remaining canonical Ten-Gods:

```text
비견 겁재 식신 상관 편재 정재 편관 정관
```

the result is only:

```text
resolved_outside_authorized_yin_label_scope
```

This deliberately does **not** assert a universal source-semantic verdict such as:

```text
not 印綬
```

The authority simply has no admission rule for those labels.

### 5.4 Ambiguous

```text
canonical_ten_god_ambiguous
membershipObserved = false
```

No candidate inside an ambiguous `FactState` is promoted individually.

### 5.5 Unavailable

```text
canonical_ten_god_unavailable
membershipObserved = false
```

No fallback inference is permitted.

## 6. Why this is representable now

The previous blockers were separated deliberately:

1. `印綬` had a source-side 正/偏 category observation but no canonical-label bridge.
2. canonical `정인/편인` had no governed connection to `正印/偏印`.
3. #672/#677 closed the lexical/provenance gap from the exact pinned dependency.

The combination now supports one bounded semantic admission:

```text
already-resolved canonical label
-> governed Hanja label
-> source-stated 正/偏 印 category under 印綬
```

No additional chart-level inference is required.

## 7. Explicit non-authority

This artifact does not authorize:

```text
resolved non-정인/편인 -> universally not 印綬
whole-chart 정인/편인 scan
whole-chart 印 count
pillar-position selection
branch Ten-God scan
hidden-stem Ten-God scan
Ten-God recomputation
印綬 category member -> 黨眾 support constituent
one 印 -> 黨眾
multiple 印 -> 黨眾
absence of 印 -> 助寡
印綬 -> 強
ordinary 旺衰/強弱
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production fact emission
SKU or Commerce activation
```

Most importantly, this closes only **category membership**. The separate source statement:

```text
比劫印綬通根扶助為黨眾
```

still requires its own governed bridge before an admitted `印綬` member can become a 黨眾 support constituent.

## 8. Implementation surface

Exactly three research-only files are introduced:

```text
src/research/general-natal-canonical-yin-yinshou-category-member-authority.ts
test/general-natal-canonical-yin-yinshou-category-member-authority.test.ts
docs/research/general-natal-canonical-yin-yinshou-category-member-authority-20260916.md
```

The source module exports one evaluator function only:

```ts
admitResolvedCanonicalYinToYinshouCategory(fact: FactState<TenGod>)
```

No scan/count helper is exported.

## 9. Regression requirements

Tests prove:

- resolved `정인` is admitted as `正印 / 印綬`;
- resolved `편인` is admitted as `偏印 / 印綬`;
- every other resolved Ten-God remains outside the bounded authority;
- ambiguous fails closed;
- unavailable fails closed;
- upstream source-category and lexical-bridge version/hash are pinned;
- `derivedFacts.tenGods` remains governed;
- exactly one evaluator function is exported;
- chart scan/count, 黨眾/助寡, final 旺衰/強弱, scalar, Gyeokguk, Production, SKU, and Commerce remain unauthorized.

## 10. Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```
