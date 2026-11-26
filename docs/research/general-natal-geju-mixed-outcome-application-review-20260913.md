# General Natal Gyeokguk mixed-outcome application review — 2026-09-13

## Scope

This review follows the merged outcome-representation boundary from #517.

It asks one narrow question: can the directly listed application examples be admitted without promoting them into a complete executable rule system?

## Source boundary

The governed source section directly lists examples associated with the mixed-outcome intervention layer. It also states that broader changes are numerous and context-sensitive, so the examples are not treated as an exhaustive rule table.

The implementation therefore stores only a review-local source-list index. Index positions are not canonical source numbering and do not define runtime matching semantics.

## Decision

```text
SOURCE_LISTED_APPLICATION_CATALOG = AUTHORIZED_RESEARCH_ONLY
SOURCE_LIST_EXHAUSTIVE = false
REVIEW_LOCAL_INDEX_CANONICAL = false
GENERALIZED_APPLICATION_RULE = UNAUTHORIZED
CANONICAL_MATCHER = UNAUTHORIZED
OVERLAP_RESOLUTION = UNAUTHORIZED
INTERVENTION_RESOLUTION = UNAUTHORIZED
TERMINAL_STATE = UNAUTHORIZED
```

The source-list index must not be interpreted as proof that unlisted situations are excluded, or that one listed example has deterministic precedence over another.

## Runtime and product boundary

```text
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING = OPEN
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
NEXT_PRODUCTION_SKU = NONE
Commerce = HOLD
```

## Remaining frontier

The remaining work is canonical input binding, overlap handling, intervention-effect resolution, transition triggering, and terminal-state precedence. None is implemented by this review.
