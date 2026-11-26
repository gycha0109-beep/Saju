# General Natal — canonical 정인/편인 → 正印/偏印 lexical provenance bridge

Date: 2026-09-16  
Issue: #672  
Scope: `canonical_jeongin_pyeonin_to_zhengyin_pianyin_label_bridge`

## Decision

```text
AUTHORIZED_RESEARCH_ONLY
```

This artifact authorizes only a lexical/provenance bridge for two already-canonical Ten-God labels:

```text
정인 -> 正印
편인 -> 偏印
```

It does not recompute Ten-Gods and does not convert those labels into runtime 印綬 support.

## Exact calculation provenance

Current Saju `package.json` pins:

```text
manseryeok = 2.0.0
```

Current adapter metadata pins the same engine:

```text
ENGINE_NAME       = manseryeok
ENGINE_VERSION    = 2.0.0
ENGINE_REPOSITORY = https://github.com/yhj1024/manseryeok
```

The exact upstream tag consumed by Saju publishes this vocabulary in `src/constants.ts`:

```text
TEN_GOD_HANJA
편인 -> 偏印
정인 -> 正印
```

Pinned evidence URL:

```text
https://github.com/yhj1024/manseryeok/blob/v2.0.0/src/constants.ts
```

This is the direct authority for the lexical mapping. The mapping is not reconstructed from a general Ten-God formula.

## Canonical representability

The Saju adapter converts the upstream Ten-God chart into canonical `TenGodChartFact` values and stores it as resolved:

```text
derivedFacts.tenGods
```

The existing General Natal canonical-input binding review includes that path in `governedRawFactPaths`.

Therefore this bridge can operate on an already-canonical input without scanning a chart or recomputing Ten-Gods.

## Classical-source compatibility boundary

Upstream #655/#661 anchors the selected `子平真詮 / 子平真詮評註 — 三十五、論印綬` statement:

```text
印綬喜其生身，正偏同為美格，故財與印不分偏正，同為一格而論之。
```

That source-side authority proves only that the 正/偏 variants of 印 are treated together in the 印綬 discussion.

Fresh source review on 2026-09-16 did not find a literal `偏印` token in the reviewed selected passage. Accordingly:

```text
CLASSICAL_SOURCE_LITERAL_PIANYIN_TOKEN_CLAIM = UNAUTHORIZED
```

The bridge `편인 -> 偏印` is instead grounded in the exact pinned `manseryeok@2.0.0` Hanja vocabulary.

Separately:

```text
#662/#663: 甲 + 癸 -> 正印
#669/#670: 丙 + 乙 -> 正印
```

provide bounded selected-source compatibility evidence for `正印`. They do not authorize a general 正印 resolver and do not authorize `偏印` source semantics.

## Bounded lookup

Input type:

```ts
'정인' | '편인'
```

Output:

```text
정인 -> 正印
편인 -> 偏印
```

Any other Ten-God is outside this authority. The implementation uses an exhaustive fail-closed switch so an invalid runtime cast raises an error rather than receiving a fallback label.

## What this changes

Before this artifact, #655/#661 explicitly kept these mappings closed:

```text
canonical 정인 -> 正印
canonical 편인 -> 偏印
```

This artifact opens only the lexical/provenance layer:

```text
CANONICAL_JEONGIN_TO_ZHENGYIN_LABEL = AUTHORIZED_RESEARCH_ONLY
CANONICAL_PYEONIN_TO_PIANYIN_LABEL = AUTHORIZED_RESEARCH_ONLY
```

It does **not** retroactively expand #655/#661 or the exact-pair authorities into runtime interpretation semantics.

## Explicit non-authority

The following remain unauthorized:

```text
classical source literally defines 편인 = 偏印
canonical 정인/편인 -> runtime 印綬 constituent
any resolved 인성 Ten-God -> 印綬 support
whole-chart 인성 scan
whole-chart 인성 count
branch Ten-God scan
hidden-stem Ten-God scan
Ten-God recomputation
정인/편인 count -> 黨眾
absence of 정인/편인 -> 助寡
印綬 -> 強
label bridge -> ordinary strength
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
```

## Upstream authority pins

The implementation imports and hashes the exact version/hash of:

```text
#655/#661 Yin-Shou Zheng/Pian source-category authority
#662/#663 Jia-Gui Zheng-Yin exact-relation authority
#669/#670 Bing-Yi Zheng-Yin exact-relation authority
```

This ensures future drift in the upstream research chain changes this artifact's definition hash.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No production consumer, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.
