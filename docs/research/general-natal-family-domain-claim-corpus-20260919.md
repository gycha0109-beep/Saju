# R070 — family / parents / children domain claim corpus

Date: 2026-09-19  
Issue: #1008  
Status: MULTI-LAYER FAMILY CLAIM CORPUS VERIFIED / UNIVERSAL LOOKUP TABLE REJECTED

## Direct source

三命通會 — 卷七 / 論六親, 父母引例章, 兄弟引例章, 子息引例章  
https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%B8%83

## Coexisting source layers

### 1. Pillar-domain layer
- `月為父母兄弟門戶`
- `時為子息`
- another male-chart passage: `年為父，胎為母，月為兄弟，時為子孫`

These are domain surfaces, not complete deterministic family resolvers.

### 2. Relation / Ten-God layer
- `父以偏財論，母以印綬論`
- `兄弟者即劫財比肩`
- `子嗣者即官星也`

These are role relations used in specific source sections.

### 3. Sex-scoped relation layer
The 六親 discussion explicitly differentiates male/female derivations. In the female-chart section, `我生者為子` is used. This prevents a single sex-neutral child-star formula from being inferred from one sentence.

### 4. Configuration/outcome layer
Family outcomes are further conditioned by 旺衰, 生旺死絕, 刑沖破害, 官煞混雜, 財印, and other configuration details.

Therefore:
- FAMILY_DOMAIN != FAMILY_STAR_RELATION
- FAMILY_STAR_RELATION != FAMILY_MEMBER_EXISTS
- FAMILY_STAR_PRESENCE != FIXED_OUTCOME

## Rejected shortcuts

- FATHER_ALWAYS_EQUALS_PIANCAI
- MOTHER_ALWAYS_EQUALS_ZHENGYIN_ONLY
- CHILD_ALWAYS_EQUALS_GUANSHA
- MONTH_PILLAR_ALONE_DETERMINES_PARENTS
- HOUR_PILLAR_ALONE_DETERMINES_CHILDREN
- FAMILY_STAR_ABSENCE_IMPLIES_RELATIVE_ABSENCE
- FAMILY_STAR_PRESENCE_IMPLIES_FIXED_RELATIVE_OUTCOME
- HISTORICAL_FAMILY_ROLE_AUTO_EQUALS_MODERN_FAMILY_PREDICTION

## Execution gaps

- FAMILY_METHOD_SELECTION
- SEX_SCOPE_SELECTION
- PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION
- HIDDEN_VS_VISIBLE_STAR_HANDLING
- CONFIGURATION_OUTCOME_SETTLEMENT
- HISTORICAL_TO_MODERN_FAMILY_TRANSLATION

No executable family classifier and no Production / SKU / Commerce authority.