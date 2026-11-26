# General Natal Gyeokguk — Transparency Day-Slot / Exhaustiveness Admission Review

Date: 2026-09-13  
Issue: #502  
Status: research-only non-admission review  
Production authority: BLOCKED

## Purpose

Merged PR #446 established a narrow, source-governed transparency boundary for the selected `子平真詮 / 子平真詮評注` mixed-qi discussion:

```text
positive source-observed transparency slots = { year, month, hour }
```

That set is explicitly non-exhaustive. PR #446 intentionally left both of these questions open:

```text
DAY_TRANSPARENCY_SLOT_ADMISSIBILITY
TRANSPARENCY_SLOT_SET_EXHAUSTIVENESS
```

Issue #502 asks whether the currently governed source corpus can now close either question without inference.

## Inherited authority from #446

The existing source evidence remains valid and unchanged.

### Year / hour positive examples

`子平真詮評注 / 論雜氣如何取用` directly discusses two transparent stems and an example where they are distributed across year and hour positions.

This supports positive source-example use at:

```text
year
hour
```

It does not prove those positions are exclusive.

### Month positive example

The same selected discussion explicitly describes a stem in the month-stem position as transparent from the month branch.

This supports positive source-example use at:

```text
month
```

It does not prove that the month stem is mandatory or that the full slot set has been enumerated.

Therefore the inherited boundary remains:

```text
SOURCE_OBSERVED_POSITIVE_SLOTS = { year, month, hour }
SOURCE_OBSERVED_SLOT_SET_EXHAUSTIVE = false
```

## Direct classical text review

A broader formulation in the `子平真詮評注` commentary states, in substance, that transparency is a hidden branch stem appearing at the heavenly-stem layer. The exact governed locator is:

```text
section = 論雜氣如何取用
anchor  = 透干者以中所藏之神，透於干也
```

This strengthens the generic concept boundary but does not enumerate pillar slots.

It therefore cannot be losslessly transformed into either of these rules:

```text
all four pillar stems are admissible transparency slots
```

or:

```text
only year/month/hour are admissible transparency slots
```

The first would infer day-slot inclusion from generic `透於干` wording. The second would infer day-slot exclusion from absence in the selected examples.

Neither inference is admitted.

## Contemporary explanatory evidence

A contemporary explanatory page reviewed on 2026-09-13 gives a concrete operational description for month-command transparency:

```text
source = Clarify
page   = 月令透干取格：什么叫透出，怎么查，有什么用
section = 查透干，先做哪三个动作？
locator = 年、月或时干
provenance = practitioner_secondary
```

Its explanation treats the day stem as the reference and directs the transparency check to year/month/hour stems.

This is relevant corroborating/contrast evidence, but it is not promoted into the repository predicate because:

1. it is a contemporary practitioner-secondary explanation rather than the direct governed classical source;
2. the current repository rule requires an authority-preserving bridge, not a plausible convention;
3. promoting it would silently turn a source disagreement/underspecification into canonical semantics.

Therefore:

```text
SECONDARY_YEAR_MONTH_HOUR_ONLY_EXPLANATION = OBSERVED
SECONDARY_EVIDENCE_PROMOTED_TO_PREDICATE   = false
```

## Admission decision

```text
DIRECT_SOURCE_DAY_SLOT_AND_EXHAUSTIVENESS_NOT_ESTABLISHED_SECONDARY_EXPLANATION_NOT_PROMOTED
```

Exact result:

```text
DIRECT_SOURCE_DAY_SLOT_INCLUSION_OBSERVED   = false
DIRECT_SOURCE_DAY_SLOT_EXCLUSION_OBSERVED   = false
DIRECT_SOURCE_SLOT_SET_EXHAUSTIVENESS       = false
DAY_TRANSPARENCY_SLOT_ADMISSIBILITY         = UNRESOLVED
TRANSPARENCY_SLOT_SET_EXHAUSTIVENESS        = UNRESOLVED
FULL_TRANSPARENCY_PREDICATE                 = UNAUTHORIZED
TRANSPARENCY_SELECTION_PREDICATE            = UNAUTHORIZED
```

This is a non-admission result, not a negative semantic rule.

In particular:

```text
UNRESOLVED
!= day slot excluded
```

and:

```text
{year, month, hour} positively observed
!= exhaustive slot set
```

## Executable boundary

The permanent research report chains directly to the merged #446 definition hash rather than recreating or weakening its evidence.

It records three distinct evidence layers:

1. inherited source-direct positive examples at year/month/hour;
2. direct generic classical wording `透於干` without slot enumeration;
3. practitioner-secondary operational guidance that checks year/month/hour and treats day stem as reference.

Every layer keeps these flags false:

```text
daySlotInclusionAuthorized
 daySlotExclusionAuthorized
 exhaustiveSlotSetAuthorized
 fullTransparencyPredicateAuthorized
```

The secondary layer additionally cannot be semantic-promotion authority.

## Coarse Gyeokguk gaps

All five coarse gaps remain open:

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

No `GEJU_CANDIDATE` or `GEJU_ESTABLISHMENT_STATE` fact is emitted.

## Product / Commerce invariant

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
Commerce                           = HOLD
```

ProductHost, Character, LLM, API/browser, SKU, payment, entitlement, refund, or narrative layers may not fill this missing authority.

## Next honest frontier

This review closes the question of whether the **currently governed evidence is sufficient** to promote a complete transparency predicate: it is not.

The next productive General Natal work must therefore do one of the following:

1. acquire a stronger directly governed source that explicitly settles day-slot admissibility and proves the slot set exhaustive; or
2. leave transparency completeness unresolved and advance a different independently source-governed gap, such as generalized month-order hidden-stem selection or branch-meeting selection/effect semantics.

No candidate/establishment producer should assume a complete transparency predicate until that authority exists.