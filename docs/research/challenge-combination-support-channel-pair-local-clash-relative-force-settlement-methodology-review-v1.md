# I67 — Pair-Local Clash Relative-Force Settlement Methodology Review

## Status

```text
STRICT CLOSED
```

## Canonical decision

```text
TRACKED_EVIDENCE_PARTIAL_ORDER_COMPARISON_AUTHORIZED_FINAL_RELATIVE_FORCE_VERDICT_BLOCKED
```

I67 authorizes a conservative, non-numeric partial-order comparison over the already materialized clash evidence dimensions. It does not authorize a relative-force verdict or clash winner.

## Seasonal dimension

The source-backed categorical order remains:

```text
旺 > 相 > 休 > 囚 > 死
```

This order may be used only as an ordinal evidence dimension.

```text
seasonal advantage != relative-force verdict
seasonal advantage != clash winner
```

No points, distances, percentages, or force magnitude may be derived from the phase order.

## Support dimension

I20c support categories remain qualitative and distinct:

```text
SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT
EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT
VISIBLE_RESOURCE_SUPPORT
ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT
RESOURCE_BRANCH_SUPPORT
```

`NO_TRACKED_SUPPORT_CONTEXT` is normalized to the empty support-signal set.

Support comparison is limited to category-set topology:

```text
EQUAL_TRACKED_SUPPORT_SIGNAL_SET
FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET
SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET
INCOMPARABLE_TRACKED_SUPPORT_SIGNAL_SETS
```

No supporting-position count or category weighting is authorized.

## Partial-order states

The combined tracked evidence may be classified only as:

```text
FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE
SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE
TRACKED_EVIDENCE_EQUIVALENT
TRACKED_EVIDENCE_INCOMPARABLE
```

A dominance candidate requires one participant to be no lower on the seasonal dimension and to have an equal-or-superset tracked support-signal set, with at least one strict dimension.

If seasonal and support dimensions conflict, or support sets are not nested, the state remains `TRACKED_EVIDENCE_INCOMPARABLE`.

## Critical boundary

```text
tracked evidence dominance candidate != relative-force verdict
tracked evidence equivalent            != relative-force tie verdict
tracked evidence incomparable          != permission to force a winner
```

Unresolved support effect, rescue, competing relations, and post-relation consequences remain outside this partial-order classification.

## Hard guards

```text
seasonalAdvantageAloneSufficientForRelativeForceVerdict = false
supportSignalCategoryWeightingAuthorized                = false
supportPositionCountComparisonAuthorized                 = false
supportMagnitudeInferenceAuthorized                      = false
supportEffectResolutionAuthorized                        = false
trackedEvidenceDominanceCandidateIsRelativeForceVerdict  = false
trackedEvidenceEquivalentIsRelativeForceTieVerdict       = false
trackedEvidenceIncomparableMayBeForcedToWinner           = false
clashWinnerVerdictAuthorized                             = false
relativeForceVerdictAuthorized                           = false
rescueEffectAuthorized                                   = false
clashSettlementAuthorized                                = false
crossRelationPrecedenceAuthorized                        = false
targetPostRelationRootState                              = not_determined
effectiveMechanismForceVerdict                           = not_determined
relationSpecificUsefulnessHarmfulness                    = not_determined
classificationAuthorized                                 = false
numericScoringAuthorized                                 = false
```

## Verification

```text
HEAD   c83334250608c3675996a6d583fad59944dc7a40
CI     #691 SUCCESS
FILES  124 passed
TESTS  672 passed
I67    6 / 6 PASS
lint   PASS
typecheck PASS
test   PASS
build  PASS
```

## Next gate

```text
I68 — Challenge Combination Support Channel Pair-Local Clash Relative-Force Comparative Evidence Adapter
```

I68 may materialize only the I67 partial-order state for an exact I65-verified dispatched clash by aligning canonical I20c support context and exact I33/I65 identity. It must keep `relativeForceVerdict=not_determined`, `clashWinner=not_determined`, and all settlement/activation/scoring/classification outcomes blocked.
