import { describe, expect, test } from 'vitest';
import {
  I143_I118_REQUIREMENT_IDS,
  buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport,
} from '../src/index.js';

const candidateIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const;
const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function i143(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  const adoptionId = 'adoption_fixture';
  const candidateSetId = 'candidate_set_fixture';
  const inputPackageId = 'input_package_fixture';
  const witnessIdentityBindings = candidateIds.map((candidateId, index) => ({
    witnessId: `w${index + 1}`,
    sourceId: `s${index + 1}`,
    stableLocator: `https://example.test/w${index + 1}`,
    normalizedCandidateId: candidateId,
    identityResolutionBasis: 'fixture',
    reproducible: true,
  }));
  const evidenceRebindingRecords = candidateIds.map((candidateId, index) => ({
    evidenceId: evidenceIds[index],
    candidateId,
    sourceId: `s${index + 1}`,
    witnessId: `w${index + 1}`,
    locator: `fixture-${index + 1}`,
    observation: 'fixture observation',
    i118RequirementIds: I143_I118_REQUIREMENT_IDS,
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  }));
  const requirementOwnershipBindings = I143_I118_REQUIREMENT_IDS.map((requirementId) => ({
    i118RequirementId: requirementId,
    owningEvidenceIds: [evidenceIds[0]],
    ownershipBasis: 'fixture ownership only',
    satisfactionFindingMade: false,
  }));
  const scopeCompatibilityInputs = evidenceIds.map((evidenceId) => ({
    evidenceId,
    targetScope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    positionClass: 'VISIBLE_STEM_POSITION_CLASS',
    compatibilityState: 'UNRESOLVED',
    basis: 'fixture unresolved scope',
  }));
  const provenanceIndependenceInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    provenanceIdentity: `s${index + 1}`,
    independenceState: 'UNRESOLVED',
    dependencyLinks: [],
    basis: 'fixture unresolved provenance',
    numericWeight: null,
  }));
  const semanticBridgeInputs = ['b1', 'b2', 'b3'].map((bridgeId) => ({
    bridgeId,
    fromTerm: 'source',
    toTerm: 'target',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    bridgeState: 'UNRESOLVED',
    authorityEvidenceIds: [evidenceIds[0]],
    lexicalSimilarityIsNotAuthority: true,
  }));
  const contradictionInputs = ['x1', 'x2'].map((contradictionId) => ({
    contradictionId,
    evidenceIds: [evidenceIds[0], evidenceIds[1]],
    conflictDescription: 'fixture conflict',
    resolutionState: 'UNRESOLVED',
    precedenceBasis: null,
    numericVoteOrWeightUsed: false,
  }));

  const base = {
    recordId: 'i143_i146_fixture',
    recordVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
    decision:
      'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION',
    upstreamI142ReviewId: 'i142_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId,
    selectionContractVersion: 'v1-selection',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId,
    inputPackageVersion: 'v1-input-package',
    inputPackageId,
    inputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI142ReadinessAccepted: true,
    candidateManifest: {
      candidateSetId,
      candidateSetVersion: 'v1-candidate-set',
      adoptionId,
      candidateIds,
      candidateCount: 6,
      frozen: true,
    },
    witnessIdentityBindings,
    witnessIdentityBindingCount: 6,
    evidenceRebindingRecords,
    evidenceRebindingRecordCount: 6,
    requirementOwnershipBindings,
    requirementOwnershipBindingCount: 6,
    scopeCompatibilityInputs,
    provenanceIndependenceInputs,
    semanticBridgeInputs,
    contradictionInputs,
    allEightArtifactClassesMaterialized: true,
    allSixI118RequirementsHaveExplicitOwnershipBindings: true,
    everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator: true,
    allWitnessBindingsStableAndReproducible: true,
    semanticBridgeUnresolvedCount: 3,
    contradictionUnresolvedCount: 2,
    scopeCompatibilityUnresolvedCount: 6,
    provenanceIndependenceUnresolvedCount: 6,
    unresolvedStatesPreservedWithoutInference: true,
    priorI126CoverageGrandfathered: false,
    priorI128DiscoveryGrandfathered: false,
    priorEvidenceEnteredOnlyThroughExplicitRebinding: true,
    implicitRequirementBorrowingPerformed: false,
    exampleToGeneralRulePromotionPerformed: false,
    numericWeightingOrMajorityVotePerformed: false,
    inputPackageRegisteredByThisGate: true,
    evidenceRebindingPerformedByThisGate: true,
    requirementOwnershipBindingsMaterializedByThisGate: true,
    witnessIdentityBindingsMaterializedByThisGate: true,
    scopeCompatibilityInputsMaterializedByThisGate: true,
    provenanceIndependenceInputsMaterializedByThisGate: true,
    semanticBridgeInputsMaterializedByThisGate: true,
    contradictionInputsMaterializedByThisGate: true,
    requirementCoverageAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    policyExecutableByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport;
}

function i145(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport {
  const base = {
    authorizationId: 'i145_i146_fixture',
    authorizationVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    decision:
      'EXACT_REGISTERED_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED',
    upstreamI144ReviewId: 'i144_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v1-input-package',
    inputPackageId: 'input_package_fixture',
    exactI144ReadinessAccepted: true,
    authorizationState: 'AUTHORIZED_NOT_EXECUTED',
    authorizationScope: 'EXACT_REGISTERED_PACKAGE_SINGLE_RESEARCH_EVALUATION',
    authorizedEvaluationCount: 1,
    authorizationBoundToExactPolicyVersion: true,
    authorizationBoundToExactAdoptionId: true,
    authorizationBoundToExactCandidateSetId: true,
    authorizationBoundToExactInputPackageId: true,
    authorizationBoundToNineStepFailClosedAlgorithm: true,
    packageMutationBeforeEvaluationInvalidatesAuthorization: true,
    candidateSetMutationBeforeEvaluationInvalidatesAuthorization: true,
    policyVersionChangeBeforeEvaluationInvalidatesAuthorization: true,
    evaluationMustPreserveUnresolvedInputsAsUnresolved: true,
    evaluationMayNotInferMissingSemanticBridges: true,
    evaluationMayNotResolveContradictionsByVoteOrWeight: true,
    evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep: true,
    laterStepsAfterFirstFailureMustNotBePromotedToPass: true,
    researchEvaluationExecutionAuthorized: true,
    candidateSetEvaluationAuthorizedByThisGate: true,
    candidateSetEvaluationPerformedByThisGate: false,
    evaluationResultCreatedByThisGate: false,
    unresolvedInputAdjudicationPerformedByThisGate: false,
    inputPackageMutatedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    productionPolicyExecutableByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport;
}

describe('I146 authorized registered input package fail-closed candidate-set evaluation record', () => {
  test('executes the authorized evaluation and stops fail-closed at unresolved scope compatibility', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(i145(), i143());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    );
    expect(report.decision).toBe(
      'CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_SCOPE_COMPATIBILITY_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED',
    );
    expect(report.evaluationState).toBe('COMPLETED_FAIL_CLOSED');
    expect(report.firstUnsatisfiedStepId).toBe('SCOPE_COMPATIBILITY_CHECK');
    expect(report.firstUnsatisfiedStepReason).toBe('REGISTERED_SCOPE_COMPATIBILITY_INPUTS_UNRESOLVED');
  });

  test('records the exact 1-3 PASS, 4 FAIL_UNRESOLVED, 5-9 not-evaluated sequence', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(i145(), i143());
    expect(report.evaluationStepRecords.map((step) => step.state)).toEqual([
      'PASS',
      'PASS',
      'PASS',
      'FAIL_UNRESOLVED',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    ]);
    expect(report.passedStepCount).toBe(3);
    expect(report.failedStepCount).toBe(1);
    expect(report.notEvaluatedStepCount).toBe(5);
    expect(report.laterStepsAfterFirstFailureNotPromotedToPass).toBe(true);
  });

  test('observes all unresolved registered inputs without inferring or adjudicating them', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(i145(), i143());
    expect(report.scopeCompatibilityUnresolvedCountObserved).toBe(6);
    expect(report.provenanceIndependenceUnresolvedCountObserved).toBe(6);
    expect(report.semanticBridgeUnresolvedCountObserved).toBe(3);
    expect(report.contradictionUnresolvedCountObserved).toBe(2);
    expect(report.unresolvedInputsPreservedWithoutInference).toBe(true);
    expect(report.scopeCompatibilityAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.semanticBridgeAdjudicatedByThisGate).toBe(false);
    expect(report.contradictionAdjudicatedByThisGate).toBe(false);
  });

  test('consumes exactly the upstream research evaluation authorization without making it reusable', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(i145(), i143());
    expect(report.exactI145AuthorizationAccepted).toBe(true);
    expect(report.exactI143RegisteredPackageAccepted).toBe(true);
    expect(report.authorizationAndPackageIdentityMatch).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedUpstream).toBe(true);
    expect(report.authorizationConsumedByThisEvaluationRecord).toBe(true);
    expect(report.authorizationReusableAfterThisRecord).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(true);
    expect(report.evaluationResultCreatedByThisGate).toBe(true);
  });

  test('does not establish candidate admissibility, composition, threshold, production, classification, or numeric authority', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(i145(), i143());
    expect(report.candidateSetAdmissibilityState).toBe('NOT_ESTABLISHED_FAIL_CLOSED');
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('routes the first failure to scope-compatibility adjudication readiness only', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(i145(), i143());
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
    );
  });

  test('fails closed without performing evaluation when authorization and package identities differ', () => {
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(
      i145({ inputPackageId: 'different_package' }),
      i143(),
    );
    expect(report.status).toBe('I145_AUTHORIZATION_OR_I143_REGISTERED_PACKAGE_INVALID');
    expect(report.decision).toBe('AUTHORIZED_CANDIDATE_SET_EVALUATION_NOT_PERFORMED');
    expect(report.authorizationAndPackageIdentityMatch).toBe(false);
    expect(report.evaluationState).toBe('NOT_PERFORMED');
    expect(report.authorizationConsumedByThisEvaluationRecord).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.evaluationStepRecords.every((step) => step.state === 'NOT_EVALUATED_UNAUTHORIZED')).toBe(true);
  });

  test('fails closed before evaluation when registered evidence binding integrity is mutated', () => {
    const broken = i143();
    const mutatedEvidence = broken.evidenceRebindingRecords.map((record, index) =>
      index === 0 ? { ...record, locator: '' } : record,
    );
    const report = buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(
      i145(),
      i143({ evidenceRebindingRecords: mutatedEvidence }),
    );
    expect(report.status).toBe('I145_AUTHORIZATION_OR_I143_REGISTERED_PACKAGE_INVALID');
    expect(report.exactI143RegisteredPackageAccepted).toBe(false);
    expect(report.evaluationState).toBe('NOT_PERFORMED');
    expect(report.candidateSetAdmissibilityState).toBe('NOT_EVALUATED');
  });
});
