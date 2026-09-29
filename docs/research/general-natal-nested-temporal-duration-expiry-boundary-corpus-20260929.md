# R156 — Nested Temporal Scope Duration / Expiry Boundary Corpus

> Date: 2026-09-29  
> Status: RESEARCH COMPLETE CANDIDATE  
> Scope: temporal duration, expiry, return-to-baseline, nested-scope timing boundaries  
> Track: saju-research

## 1. Research question

R155 established Monthly as a lower temporal layer while preserving Natal, Dayun, Annual, Monthly, and cross-layer interaction context.

The next unresolved frontier is duration.

R073 contains a source-bounded temporary-operative observation:

    運中透清或會合可僅限相關五年，過此則依然如故

The governed representation already preserves this as a temporary operative state with explicit return-to-baseline semantics.

R156 asks:

> How far can that duration/expiry observation be generalized across Dayun, Monthly, break/rescue, and nested temporal scopes?

The answer encoded here is intentionally narrow:

> It cannot be generalized beyond its source-bounded scope with the current evidence.

## 2. Six boundary rows

R156 contains six rows:

1. NATAL_BASELINE_IDENTITY
2. SOURCE_BOUNDED_DAYUN_TEMPORARY_WINDOW
3. GENERIC_DAYUN_ACTIVATION_DURATION_UNRESOLVED
4. BREAK_RESCUE_DURATION_UNRESOLVED
5. MONTHLY_CALENDAR_BOUNDARY_UNRESOLVED
6. NESTED_SCOPE_EXPIRY_NON_PRECEDENCE

Only one row carries an observed exact five-year window.

Only one row carries explicit return-to-baseline evidence.

## 3. Source-bounded five-year observation

The retained R073 temporary-operative state supports:

- a temporary operative state;
- a source-bounded relevant five-year window;
- later return to the prior baseline state.

R151 already replays this as:

    explicitReturnToBaselineObserved = true

R156 preserves that observation exactly.

It does not convert it into:

    ALL_DAYUN_EFFECTS_LAST_FIVE_YEARS
    ALL_TEMPORAL_ACTIVATION_LASTS_FIVE_YEARS
    ALL_BREAK_RESCUE_EFFECTS_LAST_FIVE_YEARS
    MONTHLY_EFFECTS_INHERIT_DAYUN_DURATION

## 4. Generic Dayun activation duration remains unresolved

R073 separately lists:

    ACTIVATION_DURATION

as an execution gap.

Therefore the source-bounded temporary-operative five-year observation cannot be copied automatically to:

- ACTIVATED_BY_TRANSPARENCY
- ACTIVATED_BY_NATAL_LUCK_MEETING
- any generic Dayun activation

R156 preserves:

    genericActivationDurationGapPreserved = true

## 5. Break / rescue duration remains unresolved

R076 lists:

    TEMPORAL_DURATION

as an execution gap.

Its configuration-specific break, rescue, and counterforce cases do not establish a universal duration.

R156 therefore rejects:

    BREAK_RESCUE_INHERITS_R073_DURATION

and keeps:

    executableTimingResolverAuthorized = false

## 6. Monthly calendar boundary remains unresolved

R075 lists:

    MONTH_BOUNDARY_CALENDAR_POLICY

as an execution gap.

R155 deliberately kept:

    monthBoundaryCalendarPolicyAuthorized = false

Therefore Monthly being a lower temporal layer does not tell the engine exactly when a month starts or ends under an executable calendar policy.

R156 does not invent:

- Gregorian month boundaries;
- solar-term month boundaries;
- lunar month boundaries;
- inclusive/exclusive transition rules;
- timezone transition policy.

Those require separate governed evidence and policy work.

## 7. Return-to-baseline boundary

Return-to-baseline means only that a source-bounded temporary operative state ceases to remain operative under that source representation.

It does not authorize:

- deterministic event reversal;
- polarity reversal;
- automatic repair of every prior semantic effect;
- permanent natal mutation;
- automatic restoration of a previous pattern verdict.

Therefore:

    returnToBaselineDistinctFromEventReversalObserved = true
    returnToBaselineDistinctFromPolarityReversalObserved = true

## 8. Nested temporal scopes do not create precedence

A shorter scope can expire before a longer scope.

That temporal fact does not create semantic dominance.

R156 rejects:

    SHORTER_SCOPE_ALWAYS_OVERRIDES_LONGER_SCOPE
    TEMPORAL_SCOPE_LENGTH_DEFINES_SEMANTIC_PRECEDENCE

Expiry order is timing structure, not a semantic winner rule.

## 9. Rejected shortcuts

R156 explicitly rejects:

- R073 five-year window applies to all Dayun activation
- R073 five-year window applies to all temporal mechanisms
- all Dayun effects expire after five years
- break/rescue inherits R073 duration
- Monthly layer identity defines calendar boundary
- temporal scope length defines semantic precedence
- shorter scope always overrides longer scope
- expiry automatically ends event
- expiry automatically restores all effects
- return to baseline equals event reversal
- return to baseline equals polarity reversal
- expiry mutates natal baseline
- duration as numeric severity weight
- duration as InterpretationClaim authority

## 10. What R156 establishes

R156 establishes only that:

- one source-bounded five-year temporary window is observed;
- one explicit return-to-baseline observation is preserved;
- generic Dayun activation duration remains unresolved;
- R076 break/rescue duration remains unresolved;
- Monthly calendar boundary policy remains unresolved;
- nested-scope expiry is distinct from semantic precedence;
- return-to-baseline is distinct from event and polarity reversal.

## 11. What R156 does not establish

R156 does not authorize:

- a universal Dayun duration rule;
- duration inheritance across temporal mechanisms;
- month-boundary calendar policy;
- duration-based semantic precedence;
- automatic event start/end;
- automatic effect restoration;
- polarity reversal at expiry;
- numeric duration weights;
- executable timing resolution;
- InterpretationClaim emission;
- production authority.

## 12. Authority boundary

The resulting authority remains:

    researchOnly = true

    universalFiveYearDurationAuthorized = false
    universalDurationInheritanceAuthorized = false
    temporalScopeLengthPrecedenceAuthorized = false
    shorterScopeOverridesLongerScopeAuthorized = false
    expiryAutomaticallyEndsEventAuthorized = false
    expiryAutomaticallyRestoresAllEffectsAuthorized = false
    expiryChangesPolarityAuthorized = false
    permanentNatalMutationAuthorized = false
    monthBoundaryCalendarPolicyAuthorized = false
    numericDurationWeightAuthorized = false
    executableTimingResolverAuthorized = false
    interpretationClaimEmissionAuthorized = false
    productionAuthorityPromoted = false

## 13. Remaining frontier

R156 closes only the duration/expiry representation boundary.

Still unresolved:

- exact trigger matching;
- exact calendar transition policy;
- exact duration for generic activation;
- cross-scope interaction settlement at expiry boundaries;
- event bridge;
- polarity settlement.

These remain later research work.
