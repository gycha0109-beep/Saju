# General Natal — Xi / Yong / Ji-Shen semantic-axis scope observation authority

Date: 2026-09-17  
Issue: #716  
Scope: `xi_yong_ji_shen_semantic_axis_scope_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact records exactly one selected-source scope statement and nothing more.

It does not select a 用神 methodology, resolve any chart fact as 喜神 / 用神 / 忌神, or create a chart-level 旺衰 / 強弱 classifier.

## Fresh implementation base

Implementation branch creation used exact fresh `main`:

```text
0c568cb8ed13a0eeb50a51cc9f6a2e58ee657235
```

That main already contains #714/#715, the bounded canonical month-branch Tonggen priority-context bridge.

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十干得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh direct review on 2026-09-17 confirms that, after the passage's Wood 得時/失時 and 黨眾/助寡 examples, it states:

```text
不特日主如此，喜用忌神皆同此論。
```

This artifact preserves only the bounded source-side semantics:

```text
sourceSubjectBaseline = 日主
sourceExtendedTargets = 喜 / 用 / 忌神
sourceScopePhrase      = 不特日主如此，喜用忌神皆同此論
scopeExtensionObserved = true
```

The source wording is preserved without turning any of these labels into canonical chart roles.

## Upstream authority

#623/#624 already governs the selected-source 旺衰 / 強弱 semantic-axis distinction as observation-only authority:

```text
得時 -> 旺
失時 -> 衰
黨眾 -> 強
助寡 -> 弱
旺而弱 is possible
衰而強 is possible
```

It also already preserves the exact contextual anchor:

```text
八字雖以月令為重，而旺相休囚，年月日時，亦有損益之權
```

Therefore this artifact does not duplicate that contextuality. It pins #624's version/hash and adds only the newly isolated source-side scope statement.

## Canonical-input representability

No chart-level canonical input is consumed.

```text
CANONICAL_INPUT_REQUIRED          = false
CHART_FACTS_CONSUMED              = false
CANONICAL_XI_SHEN_RESOLVER        = UNAUTHORIZED
CANONICAL_YONG_SHEN_RESOLVER      = UNAUTHORIZED
CANONICAL_JI_SHEN_RESOLVER        = UNAUTHORIZED
CANONICAL_REPRESENTABILITY        = NOT_REQUIRED_FOR_OBSERVATION_ONLY
```

The repository's governed General Natal calculation contract does not provide authority in this artifact for identifying 喜神, 用神, or 忌神. Fact availability elsewhere, present or future, would still not by itself supply the missing semantic methodology authority.

There is no exported function accepting a chart snapshot, day master, month command, Ten-God fact, root evaluation, Tonggen evaluation, 四柱有根 observation, or any role candidate.

## Explicit non-authority

The following remain unauthorized:

```text
any canonical 喜神 identity
any canonical 用神 identity
any canonical 忌神 identity
month command -> 用神
Ten God -> 喜神 / 忌神
root -> 喜神 / 用神 / 忌神
Tonggen -> 喜神 / 用神 / 忌神
四柱有根 -> 喜神 / 用神 / 忌神
#624 semantic-axis observation -> chart role assignment
喜用忌神 source scope -> final 旺衰
喜用忌神 source scope -> final 強弱
喜用忌神 source scope -> numeric strength
喜用忌神 source scope -> non-numeric strength scalar
selection among competing 用神 methodologies
cross-source stitching of competing 用神 methodologies
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production facts
SKU / Commerce
```

## Why observation-only is required

The selected sentence expands the source's stated discussion scope beyond the day master. It does not define how `喜`, `用`, or `忌神` are identified, which historical or modern 用神 method should be adopted, how conflicting methods should be reconciled, or how the source-side labels map to current canonical facts.

Promoting this sentence into a resolver would therefore require semantic authority not supplied by the sentence or by #624.

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
