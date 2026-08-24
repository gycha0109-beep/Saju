# I97 — Untouched Support Effect Single-Candidate Authority Promotion Readiness Review

## Status

**STRICT CLOSED**

## Verified implementation authority

- Code/test/export HEAD: `24d3208d238a30e5c9356a7468737adf93cef23a`
- CI: **#820 SUCCESS**
- Test Files: **155 passed**
- Tests: **886 passed**
- I97: **8/8 passed**
- lint: PASS
- typecheck: PASS
- build: PASS

## Decision

```text
I84_FULL_COVERAGE_CAN_ENTER_RESEARCH_METHODOLOGY_DEFINITION_REVIEW_DIRECT_RULE_AND_EXECUTABLE_PROMOTION_BLOCKED
```

I97 verifies that the I96 six-of-six coverage result is exact, same-candidate, and guard-preserving before allowing entry into the existing governed promotion lifecycle.

## Exact upstream requirement

I97 requires all six I96 coverage items to be present in canonical order and each to preserve:

```text
coverageState = SUPPORTED_BY_REGISTERED_EVIDENCE
countsAsSatisfiedForI84 = true
evidenceComesFromSameRegisteredCandidate = true
priorCandidateCoverageBorrowed = false
absenceOfTrackedContestAloneMaySubstitute = false
supportDirectionAloneMaySubstitute = false
genericNoTouchMayBePromotedToActive = false
genericNoTouchMayBePromotedToPersisted = false
genericNoTouchMayBePromotedToEffectiveSupport = false
numericCalibrationMaySubstitute = false
```

The aggregate I96 state must also remain:

```text
candidateMeetsFrozenI84AcceptanceContract = true
authorityCoverageGapSatisfied = true
authorityGapClosed = false
persistenceSemanticsClass = CONDITIONAL_NOT_DEFAULT
```

## Authorized lifecycle entry

```text
promotionLifecycleEntryReady = true
authorizedEntryStage = RESEARCH_METHODOLOGY_DEFINITION_CONTRACT
recommendedMethodologyFamily = stem_branch_interaction
methodologyStatusCeilingByThisGate = research
```

This Gate authorizes only preparation of a research methodology-definition contract.

It does **not** create, register, review, activate, stage, or produce an executable methodology or rule.

## Required methodology boundary

The next methodology contract must:

```text
methodologySourceLinkMustReferenceCandidate = true
methodologyMustPreserveConditionalNotDefaultPersistence = true
methodologyMustDefineRepositoryStateMapping = true
```

And must never translate:

```text
NO_TRACKED_RELATION_TOUCH -> ACTIVE
NO_TRACKED_RELATION_TOUCH -> PERSISTED
NO_TRACKED_RELATION_TOUCH -> effective support
```

The source-supported persistence semantics remain conditional, not default.

## Existing promotion governance preserved

The repository's existing governance separates:

```text
SourceReference
-> MethodologyDefinition / RuleDefinition content
-> ReviewAttestation
-> trusted promoted pack authorization
```

Review attestations bind methodology/rule content rather than a SourceReference directly.

Therefore:

```text
source coverage != methodology approval
source coverage != rule approval
source coverage != executable authority
```

Later staging requires content-bound internal review/trust. Production requires content-bound domain review/trust and existing production rule-quality requirements.

A single practitioner-secondary source is not sufficient by itself for the current production `multi_source_supported` quality requirement.

## Promotion guards

```text
directSourceToRulePromotionAuthorized = false
ruleDefinitionCreationAuthorized = false
rulePromotionAuthorized = false
researchRegistryMutationAuthorizedByThisGate = false
stagingPromotionAuthorized = false
productionPromotionAuthorized = false
sourceReferenceDirectReviewAttestationSupported = false
methodologyAndRuleContentAttestationRequiredForPromotion = true
internalReviewRequiredBeforeStaging = true
domainReviewRequiredBeforeProduction = true
trustPinnedAttestationRequiredForPromotedPack = true
singleSourceProductionQualitySufficient = false
productionMultiSourceSupportRequiredByExistingPolicy = true
```

## Hard guards preserved

```text
PRODUCTION_STRENGTH_CLASSIFIER      = NOT IMPLEMENTED
PRODUCTION_STRENGTH_CLASSIFICATION  = NOT AUTHORIZED
NUMERIC_STRENGTH_SCORING            = NOT AUTHORIZED
PRODUCTION_INTERPRETATION_CONTENT   = NOT AUTHORIZED
PRODUCTION_SAJU_PRODUCT             = NOT AUTHORIZED

candidateAcceptedForUntouchedSupportAuthority = false
candidatePromotedToMethodologyOrRuleAuthority = false
sourceReferenceApprovedForMethodologyOrRuleUse = false
methodologyOrRulePromotionAuthorized = false
executableAuthorityAuthorized = false
untouchedSupportEffectRuleImplementationAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
effectiveSupportToRelativeForceAuthorized = false
relativeForceVerdictAuthorized = false
clashWinnerVerdictAuthorized = false
rescueEffectAuthorized = false
clashSettlementAuthorized = false
crossRelationPrecedenceAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Next gate

```text
I98 — Untouched Support Effect Conditional Persistence Methodology Definition Contract
```

I98 may freeze the shape, assumptions, source linkage, input evidence requirements, semantic states, and repository-state mapping required for a future research `MethodologyDefinition`. It must not create a RuleDefinition, mutate a registry snapshot, create a review attestation, authorize runtime ACTIVE/PERSISTED/effective-support verdicts, or authorize staging/production use.
