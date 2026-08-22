# I26 Challenge Context Availability Review v6

## Purpose

I26 v6 integrates aligned I35 combination dependency evidence into the I26 v5 graph while preserving the I33 clash refinements already present in v5.

The purpose is dependency precision, not effect resolution.

## Alignment contract

I35 evidence is consumed only when it is resolved and bound to the same I31/I29 identity used by the challenge context graph:

```text
combinationDependencyEvidence.status === RESOLVED_DEPENDENCY_EVIDENCE
relationEvidence.status === RESOLVED_ROUTING_EVIDENCE
relationEvidence.upstreamI29ReportId === rootEvidence.reportId
combinationDependencyEvidence.upstreamI29ReportId === rootEvidence.reportId
combinationDependencyEvidence.upstreamI31ReportId === relationEvidence.reportId
```

Cross-material I35 reports remain fail-closed and do not replace generic combination gaps.

## Stem-combination refinement

Before aligned I35 evidence, I26 v5 may preserve:

```text
target-stem combination transformation/effect resolution
```

When aligned stem-combination dependency evidence exists, v6 refines it to:

```text
challenge-target stem-combination transformation-condition policy
challenge-target stem-combination transformation target-element policy
challenge-target stem-combination seasonal-command effect
challenge-target stem-combination support/interference effect
challenge-target stem-combination competing-relation precedence
challenge-target stem post-combination state verdict
```

## Root-combination refinement

Before aligned I35 evidence, I26 v5 may preserve:

```text
root-candidate combination transformation/effect resolution
```

When aligned root-combination dependency evidence exists, v6 refines it to:

```text
challenge-root combination transformation-condition policy
challenge-root combination transformation target-element policy
challenge-root combination seasonal-command effect
challenge-root combination support/interference effect
challenge-root combination competing-relation precedence
challenge-root combination post-relation root-state verdict
```

## Clash/combination separation

I26 v6 builds on v5 rather than v4. Therefore I33 clash refinements remain intact.

For a root candidate simultaneously participating in a clash and a combination, both unresolved dependency families remain visible:

```text
challenge-root clash ...
challenge-root combination ...
```

They are not collapsed into one score, winner, precedence, or force verdict.

## Hard boundary

The central state remains:

```text
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
```

And globally:

```text
methodologyReadyForEffectResolution = false
challengeEffectVerdict               = not_determined
relativeForceVerdictAuthorized       = false
classificationAuthorized             = false
numericScoringAuthorized             = false
```

A structurally complete stem/six/three combination does not establish transformation, target disappearance/binding, effective bureau, root preservation/destruction, or effective mechanism force.

## Verification

```text
I26 v6 code HEAD: 67516b08e928662506a599def90c2b7b8b06647c
CI run:           #507
result:           SUCCESS

lint:             PASS
typecheck:        PASS
Vitest:           75 files / 403 tests PASS
build:            PASS
```

The dedicated v6 regression suite contains 5 passing tests covering:

- stem-combination generic-gap refinement,
- root-combination generic-gap refinement,
- simultaneous preservation of I33 clash dependency refinement,
- no-combination mechanisms remaining unchanged from v5,
- cross-material I35 fail-closed behavior,
- persistent partial substrate and authorization guards,
- deterministic report identity.

## Conclusion

```text
I35_COMBINATION_DEPENDENCY_INTEGRATION = COMPLETE
MECHANISM_EFFECTIVE_FORCE_CONTEXT       = PARTIAL_SUBSTRATE
TRANSFORMATION                          = NOT ESTABLISHED
COMBINATION_EFFECT                      = NOT DETERMINED
TARGET_POST_RELATION_ROOT_STATE         = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE               = NOT DETERMINED
CHALLENGE_EFFECT                        = NOT DETERMINED
STRENGTH_CLASSIFICATION                 = NOT AUTHORIZED
NUMERIC_SCORING                         = NOT AUTHORIZED
```

## Next gate

The next unresolved question is no longer whether combination context exists. It is what source-backed transformation mapping and transformation-condition policy, if any, can be safely expressed for challenge targets without importing the day-stem `化氣` contract wholesale.

```text
I36 — Challenge Target Combination Transformation Policy Methodology Review
```

I36 must remain methodology-only until source scope, transformation target-element mappings, seasonal requirements, competing-relation precedence, and the distinction between transformation and mere combination/binding are explicitly audited.
