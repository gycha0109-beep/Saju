# R057 — 六害 meaning / evidentiary-weight boundary

Date: 2026-09-19  
Issue: #990  
Status: STRUCTURAL PAIRS VERIFIED / EFFECT WEIGHTING BLOCKED

## Direct source

三命通會 — 卷二 / 論六害  
https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C

Additional relative-weight wording:
三命通會（四庫全書本）卷十一

## Six structural pairs

The source directly names:

```text
子 未
丑 午
寅 巳
卯 辰
申 亥
酉 戌
```

This verifies structural pair identity only.

## Effect is not uniform

The same source gives materially different modifiers:

- 丑午: harm is stronger when the stated 真鬼 condition is also present;
- 寅巳: the text explicitly requires adding/subtracting 災福 by context;
- 卯辰: again intensifies under an additional 真鬼 condition;
- 申亥: becomes heavier when 納音相剋;
- 酉戌: the stated relation is directionally asymmetric in the example;
- later treatment differs by 生旺 / 死絕;
- interpretation also differs by 貴格 / 賤格;
- 羊刃 / 劫煞 / 官府 can intensify the result.

Therefore:

```text
LIUHAI_PAIR_PRESENT != FIXED_EFFECT
LIUHAI_PAIR_PRESENT != FIXED_SEVERITY
LIUHAI_PAIR_PRESENT != AUTOMATIC_HARMFUL_POLARITY
```

## Directionality boundary

Most modern tables display 六害 as unordered pairs.

However the direct 三命通會 wording is not semantically uniform in both directions. The clearest bounded example is 酉戌, where the text treats 酉見戌 and 戌見酉 differently.

R057 therefore records:

```text
structuralPairIdentity = symmetric inventory
contextualEffectDirectionality = source-specific / unresolved generally
```

No universal directional resolver is created.

## Evidentiary weight

卷十一 contains a bounded comparative statement in a specific 運 / 神煞 discussion:

```text
四煞輕 五鬼重 六害輕 七傷重
```

This is not a universal numeric scale for natal structural relations.

It does **not** authorize:

- 六害 = numeric severity N;
- 六害 always weaker than 刑 / 沖 / 破;
- one shared static weight for all six pairs;
- using source order as conflict precedence.

## Execution gaps

```text
LIUHAI_CONTEXT_EFFECT
LIUHAI_DIRECTIONAL_EFFECT
TRUE_GHOST_MODIFIER
NAYIN_CONFLICT_MODIFIER
SHENGWANG_SIJUE_CONTEXT
GEJU_CONTEXT
COFACTOR_INTENSIFICATION
TIME_LAYER_CONTEXT
CROSS_RELATION_PRECEDENCE
```

No executable effect resolver and no Production / SKU / Commerce authority.
