# General Natal — governed 旺 / Yang 長生 / four-Yang 祿 Tonggen → 黨眾 support-constituent authority

Date: 2026-09-17  
Issue: #757  
Status: research-only authority

## Decision

```text
DIRECT_SOURCE_TONGGEN_DANG_ZHONG_ASSOCIATION = OBSERVED
UPSTREAM_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN = AVAILABLE_RESEARCH_ONLY
EXISTING_MUKU_YUQI_TONGGEN_SUPPORT_PRECEDENT = AVAILABLE_RESEARCH_ONLY
WANG_CHANGSHENG_LU_TONGGEN_TO_SUPPORT_CONSTITUENT = AUTHORIZED_RESEARCH_ONLY
```

The admitted bridge is exactly:

```text
GovernedWangChangshengLuBoundedTonggenEvaluation
  state = bounded_tonggen_observed
  tonggenObserved = true
  sourceRootKind = 旺 | 長生 | 祿
  authority = research_only

→ tonggen_support_constituent_observed
  sourceConstituent = 通根
  sourceSupportPhrase = 通根扶助
  supportConstituentObserved = true
  dangZhongEstablished = false
  zhuGuaEstablished = false
  qiangRuoEstablished = false
```

The `#754/#755` bounded Tonggen intermediary is mandatory. This artifact does not admit root classes directly.

## Fresh-main restack

Issue #757 and the first branch were created when `main` was:

```text
8c39bbcccd039b4f97928e6a8b243fa5b75bf98f
```

Before the implementation commit, unrelated Face Reading PR #758 moved `main` to:

```text
09fe9d15d74d53014c605478bb46f2534a059b32
```

The original #757 branch had no commits and no PR. It was not used. The implementation was restacked on a replacement branch created directly from the newer exact `main`:

```text
research/757-wang-changsheng-lu-tonggen-support-constituent-r2
```

No stale-base commit is admitted.

## Selected source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

<https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm>

Fresh direct review on 2026-09-17 confirms the same source context already governed by #693/#697:

```text
比劫印綬通根扶助為黨眾
甲乙木生於申酉月，為失時則衰，若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也。
蓋比劫如朋友之相扶，通根如室家之可住；干多不如根重
```

These lines support treating an already-governed positive `通根` result as one bounded `通根扶助` support constituent. They do not establish a complete cardinality rule, threshold, aggregation rule, chart-level `黨眾`, or `不弱` predicate.

## Governed upstream only

### #754 / PR #755

This artifact consumes only:

```text
GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION
GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH
```

and the already-governed evaluation:

```text
GovernedWangChangshengLuBoundedTonggenEvaluation
```

Positive upstream states are limited to governed:

```text
旺
Yang 長生
four non-Earth Yang 祿
```

The upstream itself preserves Yin 長生, Yin 祿, Earth 祿, Earth 餘氣 completion, negative Tonggen, 四柱 settlement, counts, weighting, strength, Gyeokguk, and Production as unresolved or unauthorized.

### #693 / PR #697

The existing historical support bridge is pinned through:

```text
GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION
GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH
```

That artifact consumes only #692 `MukuYuqiBoundedTonggenEvaluation` with `sourceRootKind = 墓庫 | 餘氣`. It remains unchanged and separate. This new artifact does not broaden its input type or mutate its historical authority.

## Positive behavior

Only a complete #755 positive result:

```text
state = bounded_tonggen_observed
tonggenObserved = true
sourceRootKind = 旺 | 長生 | 祿
authority = research_only
globalNotTonggenEstablished = false
sizhuHasRootSettled = false
dangZhongEstablished = false
zhuGuaEstablished = false
qiangRuoEstablished = false
```

may produce:

```text
state = tonggen_support_constituent_observed
sourceRootKind = 旺 | 長生 | 祿
sourceConstituent = 通根
sourceSupportPhrase = 通根扶助
supportConstituentObserved = true
globalNotTonggenEstablished = false
sizhuHasRootSettled = false
dangZhongEstablished = false
zhuGuaEstablished = false
qiangRuoEstablished = false
authority = research_only
```

## Fail-closed states

```text
no_bounded_tonggen_evidence
→ no_bounded_tonggen_support_constituent_evidence
→ NOT 不通根
→ NOT 黨眾=false
→ NOT 助寡=true
→ NOT 弱
→ NOT no-other-support

unresolved_outside_governed_tonggen_scope
→ unresolved_outside_governed_tonggen_scope
→ no constituent evidence emitted
```

Yin 長生 and Yin 祿 therefore remain unresolved at this bridge. Earth 祿 remains unauthorized and Earth 餘氣 remains unresolved. No absence semantics are added.

## Mandatory intermediary boundary

The following direct shortcuts are forbidden:

```text
旺 root -> support constituent
長生 root -> support constituent
祿 root -> support constituent
any generic root -> support constituent
```

The only admitted route is:

```text
governed root evaluation
→ #754/#755 bounded Tonggen
→ #757 Tonggen support constituent
```

In particular, #751/#753 class-neutral Wood positives remain outside this adapter:

```text
乙 + 寅 positive root evidence
乙 + 亥 positive root evidence
```

must not become:

```text
乙祿
乙長生
通根
通根扶助 support constituent
```

through class invention.

## Explicit non-authority

The following remain unauthorized:

```text
direct 旺 / 長生 / 祿 root -> 黨眾 constituent
generic root -> support constituent
class-neutral 甲乙 Wood positive -> support constituent
乙寅 -> 乙祿 -> 通根 -> support
乙亥 -> 乙長生 -> 通根 -> support
Yin 長生 -> Tonggen support
Yin 祿 -> Tonggen support
Earth 祿 -> Tonggen support
Earth 餘氣 completion
no bounded evidence -> 不通根
no bounded evidence -> 助寡 / 弱 / no support
one Tonggen constituent -> 黨眾
multiple Tonggen constituents -> 黨眾
Tonggen count / threshold
Tonggen + 比肩 / 印綬 aggregation
Tonggen constituent -> 強
Tonggen constituent -> 不弱
Tonggen constituent -> final 強弱 / 旺衰
Tonggen constituent -> 四柱有根 settlement
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE derivation
GEJU_ESTABLISHMENT_STATE derivation
Production fact emission
SKU / Commerce activation
```

## Canonical representability

```text
UPSTREAM_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN = AVAILABLE_RESEARCH_ONLY
UPSTREAM_INPUT_TYPE_SUFFICIENT = true
RAW_CHART_FACTS_REQUIRED = false
RAW_STEM_BRANCH_REDISCOVERY_REQUIRED = false
HIDDEN_STEM_CONSUMPTION_REQUIRED = false
TWELVE_GROWTH_REEVALUATION_REQUIRED = false
LU_REDISCOVERY_REQUIRED = false
MUKU_YUQI_HISTORICAL_SUPPORT_PATH_MUTATION_REQUIRED = false
```

The adapter therefore needs no canonical chart scan and exports no raw root matcher.

## Tests

The test suite must prove:

1. governed `旺` Tonggen admits only `通根扶助` support-constituent evidence;
2. governed Yang `長生` Tonggen admits only the same bounded constituent;
3. all four governed Yang `祿` Tonggen positives admit only the same bounded constituent;
4. no-evidence stays non-negative;
5. Yin 長生 remains unresolved;
6. Yin 祿 remains unresolved;
7. exact #755 and #697 versions/hashes are pinned;
8. #697 墓庫/餘氣 support path remains separate;
9. exactly one executable adapter is exported;
10. no direct root-class shortcut exists;
11. no count/threshold/aggregation/黨眾/助寡/strength/四柱 settlement/Gyeokguk/Production escalation is authorized;
12. the Production invariant remains exact.

## Production invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

This artifact is research-only and does not modify ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior.
