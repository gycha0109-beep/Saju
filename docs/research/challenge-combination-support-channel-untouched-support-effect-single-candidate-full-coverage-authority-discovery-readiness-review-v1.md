# I94 — Untouched Support Effect Single-Candidate Full-Coverage Authority Discovery Readiness Review

## Status

STRICT CLOSED

## Decision

`SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION`

## Discovery mode

```text
SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY
```

Under the current frozen I84/I93 boundary, discovery must target one independently registered authority candidate capable of being evaluated against all six I84 requirements from one coherent source authority scope.

## Mandatory admission contract

```text
oneCandidateOnly = true
candidateMustUseI87RegistrationContract = true
oneNormalizedSourceReferencePerCandidateRequired = true
originalSourceInspectionRequired = true
exactSourceIdentityRequired = true
exactLocatorRequired = true
stableRevisionOrEquivalentReproducibleLocatorRequired = true
sourceLanguageAndTranslationStatusRequired = true
scopeApplicabilityExceptionProvenanceRequired = true
coherentSingleSourceAuthorityScopeRequired = true
everyI84RequirementNeedsIndependentExactEvidenceWithinSameCandidate = true
allSixRequirementCoverageMustBeEvaluatedAfterRegistration = true
```

All six frozen I84 requirements remain mandatory. Discovery relevance is not coverage satisfaction, and coverage cannot be pre-approved during discovery.

## Forbidden shortcuts

```text
partialCoverageFallbackAuthorized = false
crossCandidateCompositionAuthorized = false
implicitCrossSourceSynthesisAuthorized = false
multiplePartialCandidatesMaySubstituteForOneFullCandidate = false
searchSnippetMayCountAsAuthorityEvidence = false
modelGeneratedSynthesisMayCountAsAuthorityEvidence = false
secondarySummaryMaySubstituteForOriginalSourceInspection = false
numericCalibrationMayCountAsNormativeAuthority = false
noCandidateFoundMayBeConvertedToDefaultRule = false
```

If no candidate satisfies the admission contract, the discovery result must remain fail-closed. Absence of a qualifying source cannot be converted into a default support-effect rule.

## Hard guards

```text
actualExternalDiscoveryPerformedByThisGate = false
candidateRegisteredByThisGate = false
candidateCoverageEvaluatedByThisGate = false
candidateCoveragePreApprovalAuthorized = false
candidateSetCompositionPolicyResolved = false
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

Exact code/test/export HEAD:

`f1c3110892304b95137170efb1968b93064d6b20`

CI #806:

```text
lint      PASS
typecheck PASS
test      PASS — 152 files / 862 tests
I94       PASS — 8/8
build     PASS
```

## Next gate

`I95 — Untouched Support Effect Single-Candidate Full-Coverage Authority Discovery Evidence`

I95 may perform external discovery under the exact I94 admission contract. It must register at most one qualifying candidate as research-only evidence. If no candidate with verified exact source/locator and plausible all-six coverage is found, I95 must emit a fail-closed no-verified-candidate result rather than downgrade the requirements or synthesize authority from prior partial candidates.
