# General Natal Gyeokguk — Governed Selection Signal Observation

Date: 2026-09-12  
Status: research-only observation contract  
Production authority: BLOCKED

## Purpose

This frontier follows:

- PR #446 — partial positive `透干` source evidence;
- PR #447 — source-aligned full-three `會支` evidence;
- PR #451 — source authority that one, plural, and transparency-plus-meeting surfaces may coexist.

The selected mixed-qi source states:

```text
一透則一用，兼透則兼用，透而又會，則透與會並用
```

The architecture now has enough governed evidence to represent the **cardinality of currently observed source signals** without pretending that those signals are already canonical Gyeokguk candidates.

This frontier therefore introduces only:

```text
zero / one / multiple governed source signal observations
```

It does not introduce:

```text
GEJU_CANDIDATE
candidate identity
candidate rank
candidate precedence
candidate strength
final selection effect
establishment true/false
```

## Signal inputs

Signals are derived only from already governed upstream reports.

### Transparency signal

An upstream PR #446 hidden-stem evidence item may produce one signal only when:

```text
positiveTransparencyExistenceOnObservedSlotsEstablished = true
```

The signal records:

```text
stem
source-observed exact-match positions
upstream report id
```

If the same hidden stem is visibly matched at more than one governed source position, those positions remain attached to **one observation signal**.

Example:

```text
癸 visible at year + hour
-> one transparency signal
   positions = [hour, year]  // normalized only for serialization
```

This does not create two ranked candidates.

### Branch-meeting signal

An upstream PR #447 evidence item may produce one signal when the exact source-aligned full-three structural meeting has already been observed.

The signal records:

```text
relationId
source example id
month branch
observed participant positions
observed participant branches
upstream report id
```

The signal still carries:

```text
selectionEffectEstablished = false
candidateIdentityEstablished = false
candidateEmitted = false
```

A structural meeting signal therefore does not claim transformation or post-interaction effectiveness.

## Cardinality contract

The report may classify only the observed governed-signal count:

```text
resolved_zero_governed_source_signals
resolved_one_governed_source_signal
resolved_multiple_governed_source_signals
```

The plurality is source-compatible because PR #451 bound:

```text
兼透則兼用
透而又會，則透與會並用
```

However:

```text
multiple governed source signals
!= multiple canonical GEJU_CANDIDATE values
```

and:

```text
one governed source signal
!= one established Gyeokguk
```

## Zero-signal boundary

A zero-signal result is intentionally weak.

```text
signalSetExhaustiveAuthorized = false
zeroSignalMeansNoCandidateAuthorized = false
```

Therefore:

```text
resolved_zero_governed_source_signals
```

means only:

```text
no currently governed positive source signal was observed by this research surface
```

It must never be rewritten as:

```text
there is no possible Gyeokguk candidate
```

The full transparency slot set remains unresolved and later selection/effect semantics remain missing.

## Deterministic ordering without semantic ordering

The emitted signal array is normalized by deterministic signal id for stable hashing and testing.

This is not semantic order.

```text
signalArrayOrderSemanticAuthorized = false
signalRankingAuthorized = false
signalPrecedenceAuthorized = false
signalStrengthAuthorized = false
singleWinnerRequirementAuthorized = false
```

No downstream layer may treat the first signal as stronger, primary, preferred, or canonical.

## Fail-closed substrate rule

The signal inventory is emitted only when both upstream evidence surfaces are sufficiently resolved for the selected mixed-qi scope.

If either upstream surface reports:

```text
canonical_substrate_unavailable
```

then this report also returns:

```text
canonical_substrate_unavailable
signals = []
```

It does not return a partial list from the still-available axis because doing so could make an incomplete signal inventory look complete.

Outside the selected mixed-qi scope:

```text
outside_selected_mixed_qi_scope
signals = []
```

## Authority gained

Narrow research-layer authority:

```text
GOVERNED_SOURCE_SIGNAL_OBSERVATION = AUTHORIZED
ZERO_ONE_MULTIPLE_SIGNAL_CARDINALITY_OBSERVATION = AUTHORIZED
SOURCE_SIGNAL_COEXISTENCE = AUTHORIZED
```

This is an observation/data-shape authority only.

It establishes that currently governed transparency and meeting evidence can be represented without destructive single-winner collapse.

## Authority not gained

The following remain unauthorized:

```text
signal-set exhaustiveness
zero-signal -> no-candidate inference
full transparency predicate
transparency selection effect
branch-meeting selection effect
post-interaction effective bureau
general 清 / 濁
general 有情 / 無情
candidate identity
candidate semantic type
candidate ranking
candidate precedence
candidate strength
candidate deduplication policy
multiple canonical candidate representation
GEJU_CANDIDATE producer
establishment success/failure predicate
GEJU_ESTABLISHMENT_STATE=true/false
General Natal production authority
Commerce
```

In particular:

```text
selection signal observation
!= GEJU_CANDIDATE
```

## Five coarse gaps remain OPEN

This frontier does not close any coarse authority gap:

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

The fourth gap is only narrowed at the substrate level:

```text
plural source evidence can now be represented safely
```

but the missing production contract still includes:

```text
candidate identity
candidate semantics
candidate deduplication
candidate precedence/ranking
```

Therefore it remains OPEN.

## Product / Commerce invariant

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
Commerce = HOLD
```

ProductHost, Character, LLM, API/browser, SKU, payment, entitlement, and refund layers must not promote selection signals into candidates or established patterns.

## Next frontier

After this observation layer is verified, the next honest research question is whether the selected source and canonical substrate can define a **candidate identity contract** without inventing ranking or establishment semantics.

That review must answer separately:

```text
what makes two source signals the same or different candidate?
can transparency and meeting refer to one semantic use or multiple uses?
when, if ever, may exact signal identities be deduplicated semantically?
how are coexisting uses represented without forced precedence?
```

If those questions cannot be answered from governed source authority, then:

```text
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
```

must remain OPEN and no `GEJU_CANDIDATE` producer may be created.
