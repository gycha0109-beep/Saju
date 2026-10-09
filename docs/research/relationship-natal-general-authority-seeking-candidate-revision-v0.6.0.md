# Relationship Natal General — Authority-Seeking Candidate Revision v0.6.0

Issue: #1855  
Upstream Research: #1807  
Watchtower-Track: saju-research

## Why this revision exists

The current executable Research candidate is still:

```text
0.5.0-research
11 Relationship rules
```

That surface is used by existing Preview/runtime research paths and is **not** silently mutated by this revision.

Research issue #1807 completed the source review and froze:

```text
RETAIN = 0
NARROW = 2
REMOVE = 9
```

Therefore the old 11-rule surface can no longer be treated as the next authority-seeking candidate.

## Revised authority-seeking surface

Version:

```text
0.6.0-research-authority-seeking
```

Authority-seeking rule count:

```text
0
```

No current rule is carried forward unchanged.

This does **not** mean that the current Preview/runtime candidate is deleted.

It means:

> none of the current eleven rules is eligible to seek Relationship semantic authority in its present form.

## Removed from the next authority-seeking surface

Nine current rules are removed:

```text
PEER-EQUAL-FOOTING
RESOURCE-UNDERSTAND-BEFORE-CLOSE
WEALTH-PRACTICAL-RECIPROCITY
OFFICER-RELIABLE-BOUNDARY
PEER-OFFICER-AUTONOMY-WITH-BOUNDARY
RESOURCE-OUTPUT-PROCESS-THEN-SPEAK
OUTPUT-WEALTH-WORDS-TO-ACTION
OFFICER-RESOURCE-CARE-THROUGH-PREPARATION
WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND
```

## Preserved Research leads

Two narrowed paths remain, but **outside** the authority-seeking rule surface.

### Output expression

```text
OUTPUT_EXPRESSION_AXIS_ONLY
```

Boundary:

- expression axis remains a Research lead;
- general Relationship connection outcome is not authorized;
- no replacement rule may be authored yet.

### Conditional Peer + Wealth resource competition

```text
CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT
```

Boundary:

- the lead requires explicit context predicates;
- simple Peer + Wealth family presence is insufficient;
- modern shared time/money/energy semantics are not authorized;
- no replacement rule may be authored yet.

## Bridge consequence

The #1798/#1806 Bridge review was bound to:

```text
candidate 0.5.0-research
11 exact rules
```

The revised authority-seeking surface is:

```text
candidate 0.6.0-research-authority-seeking
0 rules
2 non-admitted Research leads outside the rule surface
```

Therefore the reviewed surface hash is no longer reusable.

```text
surfaceChangedFromReviewedBaseline = true
freshBridgeReviewRequiredBeforeAnyAuthorityPromotion = true
```

A fresh Bridge review being required does **not** imply that it will pass, and does not grant Engine authority.

## Remaining Research closure

Only the exact disposition stream is complete.

```text
relationshipSpecificSourceSupportComplete = false
tenGodToRelationshipDomainMappingAuthorityComplete = false
scopeQualifiersCounterexamplesComplete = false
schoolDependenceBoundaryComplete = false
exactRuleRetainNarrowRemoveDecisionComplete = true
```

The two narrowed leads remain in Research until those gaps are materially closed or the leads are abandoned.

## Runtime boundary

This revision explicitly does not modify:

- `RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION = 0.5.0-research`;
- the current 11 executable Research rules;
- narrative profiles;
- Preview routing;
- Official Reading;
- Engine admission;
- Production.

The next governance action is a fresh Bridge review of this revised authority-seeking surface, while the two narrowed leads continue independently in Research.

```text
G2A ADMITTED = false
Production = HOLD
```
