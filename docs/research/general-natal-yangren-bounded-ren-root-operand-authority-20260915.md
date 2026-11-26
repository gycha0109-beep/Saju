# General Natal — Month-Command Yangren to Bounded Ren-Root Operand Authority

Date: 2026-09-15

Issue: #594

## Scope

This research-only artifact governs exactly one semantic bridge:

```text
month_command_yangren_to_bounded_ren_root_comparison_operand_binding
```

It admits an already-governed month-command Yangren result as the `刃` constituent of the existing bounded comparison observation. It does not create a generic heavy-root class, compare chart-level peer counts, rank roots, assign weight, derive Gyeokguk, or emit production facts.

## Upstream authority chain

### #566 / #568 — bounded comparison observation

The selected source directly states:

```text
得三比肩，不如得一長生祿刃
```

#566/#568 preserves that statement as an observation-only proposition:

```text
three_peers_less_than_one_applicable_changsheng_lu_ren_root
```

whose right operand is:

```text
applicable_changsheng_lu_ren_root
```

That artifact explicitly keeps chart-level comparison evaluation, transitive closure, global ranking, numeric weighting, and generalized root-weight classification unauthorized.

### #571 / #572 — month-command Yangren matcher

The selected source separately governs exactly these month-command Yangren matches:

```text
甲 / 갑 + 卯 / 묘 month
丙 / 병 + 午 / 오 month
戊 / 무 + 午 / 오 month
庚 / 경 + 酉 / 유 month
壬 / 임 + 子 / 자 month
```

The same authority excludes Yin stems and does not authorize the same branch in year/day/hour pillars as month-command Yangren.

## Direct selected-source bridge

Selected source family:

```text
子平真詮 / 子平真詮評註
```

Reviewed sections:

- `論十干得時不旺失時不弱`
- `論陽刃 / 論建祿月劫`

URLs:

- https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
- https://www.ncc.com.tw/fate/paleo/bg/bg_035.htm

The comparison passage supplies the bounded operand term:

```text
得三比肩，不如得一長生祿刃
```

The Yangren passage directly calls the governed month-command instance `刃`:

```text
甲木生卯月為刃
```

and immediately constrains the same branch outside month-command scope:

```text
若非卯月而乾透乙，或年日時支為卯，則應名之為劫而不名為刃
```

This is sufficient for one narrow bridge only: an already-established month-command Yangren evaluation may satisfy the `刃` constituent of #566's bounded observation operand.

## Bounded executable adapter

The adapter accepts only the upstream `YangrenMonthCommandEvaluation`.

It does not accept raw stem, raw branch, pillar slot, peer count, hidden stems, Twelve-Growth stage, or chart snapshot inputs.

```text
yangren_month_command_established
  -> applicable_bounded_ren_root_operand

no_governed_yangren_month_match
  -> not_applicable_bounded_ren_root_operand

excluded_by_selected_source_scope
  -> outside_selected_source_yangren_scope
```

For the positive state, the emitted operand kind is exactly:

```text
applicable_changsheng_lu_ren_root
```

This is operand admission, not execution of the proposition.

## Why this is not Yangren -> heavy root

The selected-source heavy-root semantic separately states:

```text
長生祿旺，根之重者也
```

That sentence names `長生 / 祿 / 旺`, not `刃`.

The bounded comparison sentence later uses:

```text
長生祿刃
```

as one side of a comparative proposition. This artifact does not collapse those two sentences into an equivalence and therefore does not infer:

```text
刃 == 旺
刃 == generic heavy-root class
Yangren == generic heavy-root class
```

## Why arbitrary pillars remain excluded

#571's source boundary is explicit: the same branch outside the governing month is named `劫`, not `刃`.

The new adapter therefore consumes only the already-governed month-command evaluation. It exports no stem/branch matcher and no pillar-slot API.

Thus the bridge cannot classify:

```text
year branch

day branch

hour branch
```

as a bounded `刃` operand merely because the branch equals a Yangren month branch.

## Cross-tradition prohibition

The separate #547/#548 Twelve-Growth mapping selected from `命理探源` is not consumed.

This artifact does not infer:

```text
帝旺 -> 刃
#548 stage cell -> Yangren
刃 -> 旺
```

Therefore:

```text
twelveGrowthStageMappingConsumed = false
diwangToYangrenEquivalenceAuthorized = false
renAsWangEquivalenceAuthorized = false
```

## Comparison boundary

#566 remains observation-only.

This artifact does not consume a peer-stem count and cannot emit:

```text
three peers < one Yangren
```

as a chart-level result.

It only states that a positive #571 evaluation is eligible for the `刃` constituent of the already-recorded bounded source proposition.

The following remain unauthorized:

```text
chart-level root comparison evaluator
peer-count evaluator
transitive closure
global root ranking
numeric root weight
linear weight scale
ordinary strong/weak classification
generalized root-weight classifier
GEJU candidate
GEJU establishment
production fact
```

## Authority verdict

```text
DIRECT_SOURCE_THREE_PEERS_LESS_THAN_CHANGSHENG_LU_REN = OBSERVED
DIRECT_SOURCE_MONTH_COMMAND_YANGREN_AS_REN_TERM = OBSERVED
DIRECT_SOURCE_NON_MONTH_SAME_BRANCH_NOT_REN = OBSERVED
UPSTREAM_BOUNDED_REN_OPERAND = AVAILABLE_OBSERVATION_ONLY
UPSTREAM_MONTH_COMMAND_YANGREN_MATCHER = AVAILABLE_RESEARCH_ONLY
MONTH_COMMAND_YANGREN_TO_BOUNDED_REN_OPERAND = AUTHORIZED_RESEARCH_ONLY
ARBITRARY_PILLAR_REN_OPERAND_ADMISSION = UNAUTHORIZED
YANGREN_TO_HEAVY_ROOT_EQUIVALENCE = UNAUTHORIZED
REN_TO_WANG_EQUIVALENCE = UNAUTHORIZED
DIWANG_TO_YANGREN_EQUIVALENCE = UNAUTHORIZED
CHART_LEVEL_ROOT_COMPARISON_EVALUATOR = UNAUTHORIZED
TRANSITIVE_CLOSURE = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT = UNAUTHORIZED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

## Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM prompt, API/browser product exposure, SKU, Payment, Entitlement, Refund, or Commerce behavior changes under this authority artifact.
