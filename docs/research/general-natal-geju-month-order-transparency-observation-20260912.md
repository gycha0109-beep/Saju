# General Natal Gyeokguk — Month-Order Hidden-Stem / Visible-Stem Observation Boundary

Date: 2026-09-12  
Status: research-only canonical substrate observation  
Production authority: BLOCKED

## Purpose

This frontier follows the source-boundary work merged in PR #436. It materializes only two canonical observations that are already supported by the calculation substrate:

1. enumerate the resolved hidden-stem membership of the month branch from `derivedFacts.hiddenStems.month`;
2. for each enumerated stem, record the four-pillar positions whose visible heavenly stem is an exact value match.

It does **not** derive a Gyeokguk candidate and does **not** judge whether a pattern is established.

## Canonical substrate reused

- `src/calculation/hidden-stems.ts`
  - authoritative scope is branch-to-hidden-stem membership only;
  - hidden-stem array order is storage order only;
  - array order must not be interpreted as main/secondary/residual qi, strength, or month-command duration.
- `CanonicalSajuSnapshot.pillars.{year,month,day,hour}.stem`
  - supplies the visible heavenly-stem values used for exact-match position observation.
- `src/calculation/branch-clash-qualifier-observation-facts.ts`
  - existing repository precedent for recording `visibleExactStemPositions` while leaving visibility effect, plurality effect, and numeric weight unestablished.

No hidden-stem table or new traditional ranking table is duplicated in this research module.

## Source boundary inherited from PR #436

The existing `子平真詮評注` source frontier records:

- 月令 is a primary organizing context;
- multiple 月令 contents can change selection;
- 透干 and 會支 are selection axes in the selected mixed-qi discussion;
- plural/coexisting selections are possible;
- candidate selection and 成格/敗格 judgment are separate semantic stages.

This PR does not broaden those source claims. In particular, exact canonical stem equality is recorded only as an observation surface. It is **not** promoted into a generalized source-semantic 透干 selection predicate.

## Executable observation contract

For a report to resolve, all of the following must be resolved:

- `pillars.month`;
- `derivedFacts.hiddenStems.month`;
- all four pillar stems (`year`, `month`, `day`, `hour`).

If any prerequisite is unresolved, the report fails closed and emits no partial hidden-stem visibility observations.

For each month hidden stem, the report records:

- `stem`;
- `visibleExactStemPositions`;
- whether at least one exact visible occurrence was observed;
- `rankAssigned = false`;
- `selectionEffectEstablished = false`;
- `candidateEmitted = false`.

Zero, one, and multiple visible exact positions are preserved without winner, strength, precedence, or candidate-multiplicity semantics.

## Authority gained in this frontier

The following substrate operations are now executable and testable:

- month-order hidden-stem **membership enumeration** from the canonical snapshot;
- visible heavenly-stem **exact occurrence position observation** for each enumerated month hidden stem.

These are substrate observations, not a Gyeokguk selection verdict.

## Authority explicitly not gained

The following remain unauthorized:

- interpreting hidden-stem storage order as 本氣/中氣/餘氣, strength, priority, or command duration;
- deciding that an exact visible-stem match is by itself a complete source-semantic 透干 selection verdict;
- deciding which visible positions count or do not count under a future generalized 透干 selection rule;
- deciding `清`, conflict resolution, precedence, transformation, damage, or rescue semantics;
- applying 會支 as a Gyeokguk selection effect;
- constructing or ranking `GEJU_CANDIDATE` values;
- defining zero/one/multiple candidate representation authority;
- emitting `GEJU_ESTABLISHMENT_STATE=true/false`;
- granting General Natal production authority;
- granting ProductHost, Character, LLM, SKU, price, PSP, payment, entitlement, refund, or Commerce authority.

Therefore all five coarse predicate-authority gaps from PR #436 remain open:

1. `MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING`
2. `VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING`
3. `BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING`
4. `MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING`
5. `GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING`

## Fail-closed rule

`GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED` remains unchanged.

This frontier must not be used by product, narrative, LLM, API presentation, or Commerce layers to manufacture candidate or establishment semantics that are still missing from the authority chain.

## Next frontier

The next evidence-bearing step is to determine whether the selected source corpus supports a **generalized 透干 selection predicate** beyond raw exact-stem occurrence observation, including positional scope and conflict/plurality semantics. If that cannot be sourced without overreach, the gap remains open and the system stays fail-closed.
