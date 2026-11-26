# R155 — Monthly Lower-Layer Temporal Composition Boundary Corpus

> Date: 2026-09-29  
> Status: RESEARCH COMPLETE CANDIDATE  
> Scope: Monthly lower-layer composition after Natal–Dayun–Annual governance  
> Track: saju-research

## 1. Research question

R075 already establishes that monthly interpretation is not a standalone oracle.

Its required context layers are:

1. NATAL_CONTEXT
2. DAYUN_CONTEXT
3. ANNUAL_CONTEXT
4. MONTHLY_STEM_BRANCH
5. CROSS_LAYER_INTERACTIONS

R153 and R154 subsequently strengthened the governed representation of Natal–Dayun–Annual composition and prevented input/evaluation order from becoming semantic precedence.

R155 therefore asks:

> How can Monthly re-enter as the next lower temporal layer without creating new authority?

The answer encoded here is conservative:

> Preserve all five R075 context layers, propagate existing unresolved methodology and precedence boundaries, and add no event, weighting, calendar, or production authority.

## 2. Why R155 is needed now

Before R153/R154, the R075 execution gaps included:

- DAYUN_CONTEXT_INPUT
- ANNUAL_CONTEXT_INPUT
- MONTHLY_STEM_BRANCH_INTERACTION
- CROSS_LAYER_PRECEDENCE
- EVENT_BRIDGE
- MONTH_BOUNDARY_CALENDAR_POLICY

R153 now provides a governed representation of annual composition with natal and Dayun context.

R154 now provides an order-invariance boundary:

    input order != semantic precedence
    evaluation order != causal order
    first match != winner
    last applied != winner
    relation count != severity

R155 replays R075 against those stronger upstream boundaries.

It does not claim that all R075 execution gaps are solved.

## 3. Corpus shape

R155 contains two groups.

### 3.1 Required context layer replay

Five rows mirror the exact R075 required context layers.

| Layer | R155 role |
|---|---|
| NATAL_CONTEXT | UPPER_CONTEXT |
| DAYUN_CONTEXT | UPPER_CONTEXT |
| ANNUAL_CONTEXT | UPPER_CONTEXT |
| MONTHLY_STEM_BRANCH | LOWER_TEMPORAL_LAYER |
| CROSS_LAYER_INTERACTIONS | CROSS_LAYER_RELATION_CONTEXT |

Only MONTHLY_STEM_BRANCH is marked as the lower temporal layer.

That observation comes from the existing R075 boundary.

It does not imply that the most recent or lowest layer wins.

### 3.2 Composition constraints

Six constraints are added:

- NATAL_CONTEXT_RETAINED
- DAYUN_CONTEXT_RETAINED
- ANNUAL_CONTEXT_RETAINED
- MONTHLY_STEM_BRANCH_RETAINED
- CROSS_LAYER_INTERACTIONS_RETAINED
- CROSS_LAYER_PRECEDENCE_UNRESOLVED

These are representation constraints, not an executable resolver.

## 4. Dayun methodology remains unresolved

R152 established methodology-formulation variance for Dayun stem/branch handling.

R155 therefore carries that ambiguity into monthly composition.

Monthly context cannot silently choose:

- a source family;
- a first or last matching Dayun formulation;
- a numeric Dayun method priority;
- a five-year stem/branch assignment;
- a canonical Dayun method.

The following remain false:

    methodWinnerResolverAuthorized = false
    numericMethodPriorityAuthorized = false
    automaticCanonicalMethodSelectionAuthorized = false
    executableDayunWeightingResolverAuthorized = false

## 5. Annual context remains context, not winner

R153 established that annual state composes with natal and Dayun context.

R155 does not reinterpret that as:

    Month < Annual < Dayun < Natal

or:

    Natal < Dayun < Annual < Month

There is no automatic hierarchy of semantic dominance.

The layer stack is a required context structure, not a precedence ladder.

## 6. Order remains non-semantic

R154 established that temporal-layer input order and evaluation order do not create semantic precedence.

R155 preserves the same boundary after adding Monthly.

Therefore none of these are authorized:

- monthly array order as precedence;
- first monthly relation wins;
- last monthly relation wins;
- sequential mutation as authority;
- monthly evaluation order as causal order;
- most recent temporal layer automatically wins.

## 7. Event boundary

R075 already rejects:

- month pillar alone implies event;
- one month relation guarantees event;
- monthly good/bad score without upstream context.

R155 keeps those boundaries closed.

Cross-layer interaction presence may be represented as context.

It does not emit:

- a deterministic event;
- an event date;
- a severity score;
- a favorable/harmful scalar;
- an InterpretationClaim.

## 8. Calendar boundary

R075 retains MONTH_BOUNDARY_CALENDAR_POLICY as an execution gap.

R155 does not invent or select a calendar policy.

Therefore:

    monthBoundaryCalendarPolicyAuthorized = false

This is important because temporal composition semantics must not silently depend on an ungoverned month-boundary convention.

## 9. Rejected shortcuts

R155 explicitly rejects:

- MONTHLY_STANDALONE_ORACLE
- MONTH_PILLAR_ALONE_IMPLIES_EVENT
- MONTH_OVERRIDES_NATAL
- MONTH_OVERRIDES_DAYUN
- MONTH_OVERRIDES_ANNUAL
- MOST_RECENT_TEMPORAL_LAYER_ALWAYS_WINS
- MONTHLY_RELATION_COUNT_AS_SEVERITY
- MONTHLY_ARRAY_ORDER_AS_PRECEDENCE
- MONTHLY_EVALUATION_ORDER_AS_CAUSAL_ORDER
- FIRST_MONTHLY_RELATION_WINS
- LAST_MONTHLY_RELATION_WINS
- MONTHLY_LAYER_NUMERIC_WEIGHT
- AUTO_SELECT_DAYUN_METHOD_DURING_MONTHLY_COMPOSITION
- MONTHLY_GOOD_BAD_SCORE_WITHOUT_UPSTREAM_CONTEXT
- MONTHLY_PERMANENT_NATAL_MUTATION
- MONTH_BOUNDARY_CALENDAR_POLICY_INVENTED
- MONTHLY_RELATION_AS_DETERMINISTIC_EVENT
- MONTHLY_COMPOSITION_AS_INTERPRETATION_CLAIM_AUTHORITY

## 10. What R155 establishes

R155 establishes only that:

- Monthly is preserved as a lower temporal layer;
- all five R075 context layers remain required;
- Natal, Dayun, and Annual remain explicit upper context;
- cross-layer interaction context remains explicit;
- unresolved Dayun methodology propagates into monthly composition;
- R154 order-invariance remains applicable;
- monthly composition does not itself create semantic precedence.

## 11. What R155 does not establish

R155 does not authorize:

- a monthly event resolver;
- a month-over-year precedence rule;
- a month-over-Dayun precedence rule;
- a month-over-natal precedence rule;
- numeric layer weights;
- severity from relation count;
- a month-boundary calendar policy;
- Dayun method selection;
- deterministic favorable/harmful polarity;
- InterpretationClaim emission;
- engine admission;
- preview promotion;
- production authority.

## 12. Authority boundary

The resulting authority remains:

    researchOnly = true

    standaloneMonthlyOracleAuthorized = false
    monthOverridesNatalAuthorized = false
    monthOverridesDayunAuthorized = false
    monthOverridesAnnualAuthorized = false
    mostRecentTemporalLayerWinsAuthorized = false
    fixedCrossLayerPrecedenceAuthorized = false
    numericMonthlyLayerWeightAuthorized = false
    relationCountAsSeverityAuthorized = false
    monthlyPermanentNatalMutationAuthorized = false
    deterministicMonthlyEventAuthorized = false
    monthBoundaryCalendarPolicyAuthorized = false
    executableMonthlyCompositionResolverAuthorized = false
    interpretationClaimEmissionAuthorized = false
    productionAuthorityPromoted = false

## 13. Remaining frontier

R155 closes only the monthly lower-layer composition representation boundary.

Still unresolved:

- exact monthly stem/branch interaction semantics;
- monthly cross-layer conflict settlement;
- month-boundary calendar policy;
- duration and expiry semantics across nested temporal scopes;
- event bridge;
- polarity settlement.

These remain research problems for later R-number work.
