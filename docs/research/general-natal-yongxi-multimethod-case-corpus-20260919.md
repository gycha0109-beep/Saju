# R039 — Non-collapsing Yong/Xi multi-method case corpus

Date: 2026-09-19  
Issue: #976  
Status: VERIFIED_SEED_CORPUS / WINNER RESOLUTION FORBIDDEN

## Purpose

R039 does not assume that every multi-method reading is a contradiction.

Its purpose is to preserve direct-source cases where the same chart carries more than one method-specific requirement or role, so a future resolver cannot silently flatten them into one “best element”.

## Source surfaces

徐樂吾評註:

- 論用神  
  https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- 論用神配氣候得失  
  https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm

## C1 — 丁巳 壬子 辛巳 丁酉

Direct commentary:

```text
丁火雖通根，而日元洩氣重，須以酉金扶身為用
...
特冬令金水，不可缺火，非定以為用也
```

Preserved state:

```text
PRIMARY_USE            = 酉金扶身
CLIMATE_REQUIREMENT    = 火不可缺
RELATION               = COEXISTING_DIFFERENT_ROLES
SINGLE_WINNER          = FORBIDDEN
```

This directly rejects:

```text
climate-required element == automatically final 用神
```

## C2 — 甲申 丙子 庚辰 甲申

Direct commentary:

```text
身旺以傷官洩秀為用
特丙火調候，為配合所不可缺
```

Preserved state:

```text
PRIMARY_USE            = 傷官洩秀
CLIMATE_REQUIREMENT    = 丙火
RELATION               = COEXISTING_DIFFERENT_ROLES
SINGLE_WINNER          = FORBIDDEN
```

## C3 — 戊戌 甲子 己巳 戊辰

Direct 病藥 example:

```text
月令偏財當令，比劫爭財為病，取甲木官星制劫為用
...
須兼取巳中丙火。十一月氣寒，得火暖之，方得發榮，即調候之意也
```

Preserved state:

```text
BINGYAO_DISEASE        = 比劫爭財
BINGYAO_REMEDY_USE     = 甲木官星制劫
CLIMATE_REQUIREMENT    = 巳中丙火
RELATION               = COEXISTING_DIFFERENT_ROLES
SINGLE_WINNER          = FORBIDDEN
```

## Important negative result

The seed corpus currently contains **no directly verified TRUE_CONFLICT case**.

That is a valid research result.

Do not manufacture:

```text
TRUE_CONFLICT_UNRESOLVED
```

merely because R039's backlog title says "conflicting".

The direct evidence instead proves a more important boundary:

```text
different method-specific recommendations
!= contradiction
!= need for one global winner
```

## Allowed corpus relation states

```text
COEXISTING_DIFFERENT_ROLES
TRUE_CONFLICT_UNRESOLVED
METHOD_NOT_APPLICABLE
INDETERMINATE
```

Only direct evidence may assign a case to one of these states.

## Non-authority

No numeric priority, hidden score, generic method precedence, canonical Yong/Xi winner, Production fact, SKU, or Commerce behavior is created.
