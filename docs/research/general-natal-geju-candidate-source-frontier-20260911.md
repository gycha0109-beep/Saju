# General Natal — Gyeokguk Candidate Source Frontier

Date: 2026-09-11  
Scope: research-only authority acquisition for the upstream General Natal source-condition resolver.

## 1. Why this frontier exists

PR #339 created a strict T3 source-condition producer, PR #341 proved that the canonical resolver is not yet authorized, and PR #348 added a source-scoped branch-break substrate without promoting it into `無衝破` authority.

The next shared blocker for `偏財格`, `印綬` applicable pattern context, and qualified `食神格` is the Gyeokguk candidate/establishment path.

The existing methodology catalog already declares:

```text
M-GEJU-MONTH-ORDER@0.1.0-research

GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
GEJU_TRANSFORMATION_STATE
GEJU_FUNCTIONAL_USE
```

but this namespace is not an executable producer.

## 2. Direct source boundary now recorded

This frontier records four source surfaces from the current `子平真詮評注` cross-reference used by the methodology catalog.

### A. Month order is the primary organizer, not the sole verdict

Locator:

```text
論用神成敗救應
用神專尋月令，以四柱配之，必有成敗
```

The source boundary supports month order as a primary structural organizer while requiring the rest of the four pillars for success/failure.

It does not authorize:

```text
month branch identity -> established Gyeokguk
```

### B. Multiple month-order contents can change selection

Locator:

```text
論用神變化
月令所藏不一，而用神遂有變化
```

This is materially important because the current canonical hidden-stem array explicitly carries membership only. Array order must not be interpreted as main/secondary/residual qi, command duration, or candidate priority.

### C. Visible-stem transparency and branch meeting are selection axes

Locator:

```text
論雜氣如何取用
透幹會取其清者用之
```

The same source section gives concrete mixed-qi examples in which exposed stems and branch meetings alter what is taken.

This closes the narrower question:

```text
Are 透干 / 會支 relevant source-observed selection axes? YES
```

It does not close:

```text
What generalized canonical predicate defines 清?
How are competing exposures ranked?
When exactly does a branch meeting transform/select the month-order use?
How are conflicting selection channels settled?
```

### D. A source can permit plural/coexisting selections

Locator:

```text
論雜氣如何取用
一透則一用，兼透則兼用，透而又會，則透與會並用
```

Therefore a future Gyeokguk candidate contract must not silently assume that every chart has one pre-resolution winner.

## 3. Candidate and establishment remain separate

The source surfaces distinguish selection from later 成敗 judgment. Repository architecture already models this distinction in the methodology namespace, but no governed producer implements it.

The required topology is therefore:

```text
month-order structural context
→ source-governed candidate selection
→ zero / one / multiple candidate representation
→ transformation / conflict / precedence settlement
→ establishment success/failure predicate
→ source-condition fact
→ T3 source-condition claim
→ bounded reviewed T8 proposition
```

The following shortcut remains forbidden:

```text
month branch or hidden-stem membership
→ GEJU_CANDIDATE
→ GEJU_ESTABLISHMENT_STATE=true
```

## 4. Executable research report

Added:

```text
src/research/general-natal-geju-candidate-source-frontier.ts
```

The report explicitly returns:

```text
status = source_boundary_observed_predicates_not_authorized
monthOrderPrimaryOrganizerSourceBoundary = true
transparencyAndBranchMeetingSelectionAxesObserved = true
candidateEstablishmentSeparationObserved = true
candidateDerivationAuthorized = false
establishmentPredicateAuthorized = false
candidateFactsEmitted = false
establishmentFactsEmitted = false
```

A fully resolved canonical chart is still insufficient to emit a Gyeokguk verdict.

## 5. Predicate gaps after this acquisition

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

These refine the existing umbrella blockers:

```text
GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING
```

The umbrella blockers remain open until an actual governed resolver can emit the relevant facts.

## 6. Canonical substrate boundary

The report observes:

```text
pillars.month
derivedFacts.hiddenStems.month
derivedFacts.tenGods
derivedFacts.structuralRelations
```

Even if every item is resolved:

```text
resolved canonical substrate
!= Gyeokguk candidate authority
!= Gyeokguk establishment authority
```

Specific guards:

- hidden-stem storage order is not ranking authority;
- generic Ten-God identity is not candidate selection authority;
- structural relation membership is not source-specific 會支 selection/transformation effect authority;
- no candidate is promoted directly to an established pattern.

## 7. General Natal / Product impact

No production authority changes in this frontier.

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
RESEARCH_SOURCE_CONDITION_CLAIM_PRODUCER = EXISTS
RESOLVER_READINESS_FRONTIER = EXISTS
GEJU_CANDIDATE_SOURCE_BOUNDARY = EXISTS
GEJU_CANDIDATE_DERIVATION_AUTHORITY = MISSING
GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY = MISSING
SOURCE_CONDITION_FACTS_FROM_REAL_CHART = UNAVAILABLE
GEJU_PRODUCER_AUTHORITY_READY = false

General Natal saleable = NO
P0-CM-03 = OPEN
Production Payment = HOLD
Decision = NO_BUILD
```

No ProductHost, LLM, API presentation, Character, SKU, price, PSP, payment, entitlement, or refund layer may fill these missing predicates.

## 8. Next honest frontier

The next implementation question is no longer the vague `how do we derive a Gyeokguk?`.

It is the narrower ordered set:

```text
1. Define governed month-order hidden-content selection inputs without using storage order as rank.
2. Define visible-stem 透干 matching/selection semantics.
3. Define branch-meeting selection/transformation effect semantics.
4. Define a zero/one/multiple candidate representation and precedence/conflict policy.
5. Only then define Gyeokguk establishment success/failure predicates.
```

Until those are governed, the existing General Natal source-condition resolver must remain fail-closed.
