# I90 — Untouched Support Effect Missing-Requirement Targeted Authority Discovery Readiness

## Status

```text
STRICT CLOSED
```

## Decision

```text
TARGETED_DISCOVERY_LANES_AUTHORIZED_NO_CROSS_CANDIDATE_SYNTHESIS_OR_PROMOTION
```

I90 converts every unsatisfied I84 requirement from I89 into an independent external-discovery lane. It does not perform discovery itself and does not change the I84 acceptance threshold.

## Discovery lanes

I89 left all six requirements unsatisfied for acceptance purposes:

```text
fully satisfied = 0
partial scoped support = 3
not supported = 3
```

I90 therefore freezes six lanes:

### Missing normative authority

```text
EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE
STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION
UNTOUCHED_PERSISTENCE_STATE_SEMANTICS
```

### Scoped coverage completion

```text
SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS
SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT
INDEPENDENT_PROVENANCE_BASIS
```

Each lane requires:

```text
I87 registration contract
original-source inspection
exact locator
independent per-requirement evaluation
```

A single future source may support several lanes only when independently inspectable exact evidence supports each requirement.

## Forbidden shortcuts

```text
search snippet != authority evidence
model synthesis != authority evidence
numeric calibration != authority evidence
source prestige != requirement satisfaction
topical relevance != requirement satisfaction
partial scoped support != full I84 satisfaction
cross-candidate synthesis != authorized gap closure
```

Different candidate sources may not be silently combined into one universal untouched-source rule. Candidate-set composition policy remains unresolved.

## Preserved guards

```text
actualExternalDiscoveryPerformedByThisGate = false
i84AcceptanceThresholdChanged = false
partialCoveragePromotedToSatisfied = false
candidateSetCompositionPolicyResolved = false
crossCandidateSynthesisAuthorized = false
methodologyOrRulePromotionAuthorized = false
executableAuthorityAuthorized = false
untouchedSupportEffectRuleImplementationAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
crossRelationPrecedenceAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Verification

Code/test/export exact HEAD:

```text
b6705f21703d92f1df27dbaaf13fb56938da900f
```

GitHub Actions:

```text
CI #790 SUCCESS
148 test files passed
830 tests passed
I90 8/8 passed
lint PASS
typecheck PASS
test PASS
build PASS
```

I89 closeout was independently verified at:

```text
cda98beb3f43f7938bf8f76bb9858bbb4107e3a1
CI #787 SUCCESS
```

## Next gate

```text
I91 — Untouched Support Effect Targeted Authority Candidate Discovery Evidence
```

I91 may execute the frozen discovery lanes. It must record exact verified candidates and unresolved lanes separately. A lane with no sufficiently verified source remains unresolved rather than being filled by inference, synthesized paraphrase, or bibliographic guesswork.
