# General Natal — bounded 四柱 Yang 長生 root-presence evidence authority

- Issue: #731
- Date: 2026-09-17
- Decision: `AUTHORIZED_RESEARCH_ONLY`
- Scope: `governed_yang_changsheng_to_bounded_sizhu_root_presence_evidence`
- Fresh-main base: `5c2a68eff77620ac4b2bc0892d9847efb746940e`

## 1. Purpose

This artifact extends the bounded positive root-presence evidence surface merged in #728/#729 with exactly one additional already-governed source root class:

```text
Yang 長生 whose #551 heavyRootByChangshengClause == established
```

It does not modify the historical #729 artifact. It composes the existing #729 evaluator with the existing #551 Changsheng evaluator while preserving explicit `PillarSlot` provenance.

The result remains evidence only. It does not settle the complete source condition `四柱有根`.

## 2. Selected direct source

`子平真詮 / 子平真詮評註 — 論十幹得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Fresh review on 2026-09-17 confirms the relevant paragraph:

```text
十幹不論月令休囚，只要四柱有根，便能受財官食神而當傷官七煞。
長生祿旺，根之重者也；墓庫餘氣，根之輕者也。
...
陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣。
```

The authority boundary is therefore asymmetric:

```text
source 長生 heavy-root semantic = observed
source Yin 長生 exception       = observed
```

The new executable bridge may only consume the upstream #551 state already governed as a positive:

```text
Yang 長生 -> established
```

It must not reinterpret the source's Yin-Changsheng wording independently.

## 3. Upstream authority chain

### 3.1 #728 / PR #729

`general-natal-bounded-sizhu-root-presence-evidence-authority.ts`

Already governs provenance-preserving positive observations for:

```text
旺
墓庫
餘氣
```

with invariants:

```text
sizhuHasRootSettled = false
absenceMeansNoRoot = false
observationCountSemanticsAssigned = false
positionWeightAssigned = false
```

`長生` and `祿` were explicitly left unconsumed.

### 3.2 #549 / PR #551

`general-natal-changsheng-root-weight-binding-authority.ts`

Already governs:

```text
stage != 長生 -> not_applicable
Yang 長生     -> established
Yin 長生      -> excluded_by_yin_exception
```

The upstream file also records the source's Yin-長生 `明根` wording, but keeps a complete Minggen classifier unauthorized.

Therefore this artifact consumes only:

```text
heavyRootByChangshengClause == established
```

and no other Changsheng state.

## 4. Canonical representability

Canonical contracts already expose:

```text
StemFact.value
StemFact.yinYang
StemFact.element
PillarSlot = year | month | day | hour
EarthlyBranch
```

The evaluator input is bounded to:

```ts
Pick<StemFact, 'value' | 'yinYang' | 'element'>
Readonly<Partial<Record<PillarSlot, EarthlyBranch>>>
```

This preserves provenance at the point where each branch is evaluated.

The evaluator does not accept:

```text
precomputed Changsheng evaluation
precomputed Twelve-Growth stage
precomputed root observation without PillarSlot
```

Partial pillar maps are allowed because the evidence contract is positive-only. Missing slots never become negative evidence.

## 5. Authorized composition

For every supplied resolved pillar branch:

```text
canonical day master + pillar branch
    |
    +-> #729 evaluateBoundedSizhuRootPresenceEvidence
    |      -> preserve governed 旺 / 墓庫 / 餘氣 positives
    |
    +-> #551 evaluateChangshengHeavyRootClause
           -> only established
           -> add sourceRootKind = 長生
```

A newly added observation has:

```text
pillarSlot
branch
sourceRootKind = 長生
upstreamState  = established
authority      = research_only
```

The aggregate output remains one of:

```text
bounded_positive_root_presence_for_sizhu_context_observed
no_bounded_root_presence_evidence
```

In every state:

```text
sizhuHasRootSettled = false
absenceMeansNoRoot = false
observationCountSemanticsAssigned = false
positionWeightAssigned = false
```

## 6. Yin 長生 boundary

The selected source says both:

```text
陰長生不作此論
```

and:

```text
然亦為明根，比得一餘氣
```

The upstream #551 authority deliberately governs the first statement as an exclusion from the Changsheng heavy-root clause while leaving a complete `明根` classifier unauthorized.

Therefore:

```text
excluded_by_yin_exception -> no new observation
```

This does not mean:

```text
no root
light root
餘氣
negative evidence
```

If no other #729 positive is present, the result is only:

```text
no_bounded_root_presence_evidence
```

not `四柱無根`.

## 7. Explicit non-authority

This artifact does not authorize:

```text
Yin 長生 -> positive root evidence
Yin 長生 -> light root / no root / 餘氣
Yin 長生 明根 -> executable complete root classifier
any generic 十二長生 stage -> root evidence
祿 -> root-presence evidence
Earth/Yin Lu ambiguity resolution
root evidence -> canonical 四柱有根 settlement
no bounded evidence -> 四柱無根
missing pillar -> negative evidence
observation count -> strength
pillar position -> numeric/non-numeric weight
month 長生 -> automatic strongest-root settlement
root evidence -> 黨眾 / 助寡 counters
root evidence -> 強 / 不弱 / final 強弱 / 旺衰
Gyeokguk candidate / establishment
Production facts
SKU / Commerce
```

## 8. Tests

The test artifact proves:

1. selected-source 長生 heavy-root and Yin exception text are pinned;
2. existing #729 旺 / 墓庫 / 餘氣 observations survive composition;
3. canonical `甲 + 亥` produces provenance-preserving `長生 / established` evidence;
4. canonical `丙 + 寅` works with a partial pillar map;
5. canonical `乙 + 午` does not become positive evidence;
6. no governed positive remains `no_bounded_root_presence_evidence`, never `四柱無根`;
7. no precomputed Changsheng evaluation API is exposed;
8. #729 and #551 version/hash authority is pinned;
9. resolver, weighting, strength, Gyeokguk, Production, SKU, and Commerce remain fail-closed.

## 9. Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, Payment, Entitlement, Refund, or Commerce behavior is authorized by this research artifact.
