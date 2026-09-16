# General Natal — Bounded 四柱 Root-Presence Evidence Authority

Date: 2026-09-17  
Status: research-only  
Issue: #728

## 1. Scope

This artifact governs exactly one bounded evidence primitive:

```text
bounded_positive_root_presence_for_sizhu_has_root_context_evidence
```

It does not implement a canonical `四柱有根` resolver.

The distinction is intentional:

```text
positive governed root observation in an explicit pillar
!=
complete 四柱有根 settlement
```

Likewise:

```text
no bounded observation
!=
四柱無根
```

## 2. Selected direct source

Selected source:

```text
子平真詮 / 子平真詮評註 — 論十幹得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh review on 2026-09-17 confirms the source places the following statements in the same immediate passage:

```text
十幹不論月令休囚，只要四柱有根，便能受財官食神而當傷官七煞。
長生祿旺，根之重者也；墓庫餘氣，根之輕者也。
```

The source therefore directly describes `旺`, `墓庫`, and `餘氣` as root classes in the `四柱有根` discussion.

This bridge consumes only root classes for which the repository already has bounded executable authority:

```text
旺
墓庫
餘氣
```

`長生` and `祿` remain unconsumed by this artifact. Their omission is not negative evidence.

## 3. Upstream authority

### 3.1 旺 heavy-root completion

`general-natal-earth-wang-heavy-root-completion-authority.ts` already governs the research-only positive state:

```text
wang_heavy_root_established
```

for the selected-source five-element branch-location mappings, including the Earth completion at `辰/戌/丑/未`.

This bridge imports and calls the upstream evaluator. It does not duplicate the mapping table.

### 3.2 墓庫 / 餘氣 light-root matcher

`general-natal-muku-yuqi-light-root-authority.ts` already governs:

```text
muku_light_root_established
yuqi_light_root_established
```

for the four non-Earth elements.

Earth light-root remains unresolved. This bridge does not invent an Earth 墓庫/餘氣 mapping.

### 3.3 四柱有根 capacity observation

`general-natal-sizhu-has-root-capacity-observation-authority.ts` records the direct source `四柱有根` capacity context only.

That authority explicitly rejects shortcuts such as:

```text
heavy root -> 四柱有根
light root -> 四柱有根
bounded Tonggen -> 四柱有根
```

This artifact preserves that boundary by emitting bounded positive root-presence evidence while keeping:

```text
sizhuHasRootSettled = false
```

for every result.

## 4. Canonical representability

The canonical calculation contract exposes:

```text
StemFact.element
PillarSlot = year | month | day | hour
PillarFact.branch.value -> EarthlyBranch
```

The evaluator therefore accepts:

```ts
Pick<StemFact, 'element'>
Readonly<Partial<Record<PillarSlot, EarthlyBranch>>>
```

The second argument must be built from resolved canonical pillar branches while preserving each slot.

The API intentionally does not accept arbitrary precomputed root evaluations because those values do not by themselves prove which canonical pillar produced the observation.

## 5. Partial resolved pillar input

Partial pillar input is permitted because the primitive is positive-only.

Example:

```text
month branch resolved and yields 墓庫 positive
hour unresolved
```

may still produce:

```text
bounded_positive_root_presence_for_sizhu_context_observed
```

The unresolved hour contributes nothing.

This must never be reversed into:

```text
missing hour -> no root
```

or:

```text
no bounded match among supplied pillars -> 四柱無根
```

## 6. Governed evaluation

For each supplied pillar slot, in canonical order:

```text
year -> month -> day -> hour
```

run the existing governed matchers:

```text
evaluateCompleteWangHeavyRoot
evaluateMukuYuqiLightRoot
```

Positive observations may contain only:

```text
pillarSlot
branch
sourceRootKind = 旺 | 墓庫 | 餘氣
upstreamState
```

The observation array is provenance data only.

Its length has no authorized count, threshold, or strength semantics.

## 7. Positive state

At least one governed positive produces:

```text
state = bounded_positive_root_presence_for_sizhu_context_observed
rootPresenceObserved = true
sizhuHasRootSettled = false
absenceMeansNoRoot = false
observationCountSemanticsAssigned = false
positionWeightAssigned = false
```

This means only:

> At least one already-governed bounded root class was positively observed at an explicitly supplied canonical pillar slot.

It does not mean:

```text
canonical 四柱有根 = true
```

## 8. No-evidence state

If none of the consumed bounded matchers produces a positive:

```text
state = no_bounded_root_presence_evidence
rootPresenceObserved = false
sizhuHasRootSettled = false
absenceMeansNoRoot = false
```

Reasons can include, among others:

```text
actual no-match within consumed classes
unresolved/missing pillar slots
unconsumed 長生 or 祿 evidence
Earth light-root boundary
other root semantics not governed by this primitive
```

Therefore the state is non-negative and cannot be converted into `四柱無根`.

## 9. Explicit non-authority

This artifact does not authorize:

```text
旺/墓庫/餘氣 evidence == 四柱有根
bounded evidence -> 四柱有根 settlement
no bounded evidence -> 四柱無根
missing pillar -> negative root evidence
arbitrary precomputed root evaluation -> pillar provenance
bounded Tonggen -> 四柱有根
hidden-stem membership -> 四柱有根
十二長生 stage -> 四柱有根
長生 / 祿 completion by analogy
root observation count -> strength
pillar position -> numeric/non-numeric root weight
month position -> automatic strongest-root settlement
root evidence -> 黨眾 / 助寡
root evidence -> 強 / 不弱
root evidence -> final 強弱 / 旺衰
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production fact emission
SKU / Commerce activation
```

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

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed by this research-only artifact.
