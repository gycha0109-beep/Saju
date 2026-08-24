import { describe, expect, test } from 'vitest';
import {
  I144_BINDING_EVALUATION_STEP_IDS,
  I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS,
  buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
} from '../src/index.js';

const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;
const expectedStates = [
  'PASS',
  'PASS',
  'PASS',
  'PASS',
  'FAIL_UNRESOLVED',
  'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
  'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
  'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
  'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
] as const;

function validI151(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport {
  const originalEvidenceRebindingRecords = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    candidateId: `candidate-${index + 1}`,
    sourceId: `source-${index + 1}`,
    witnessId: `witness-${index + 1}`,
    locator: `locator-${index + 1}`,
    observation: `observation-${index + 1}`,
    i118RequirementIds: [],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  }));
  const originalProvenanceIndependenceInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    provenanceIdentity: `provenance-${index + 1}`,
    independenceState: 'UNRESOLVED',
    dependencyLinks: index === 1 ? ['same-work-witness-a', 'same-work-witness-b'] : [],
    basis: `registered-provenance-input-${index + 1}`,
    numericWeight: null,
  }));

  const base = {
    recordId: 'i151_i155_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD',
    decision:
      'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    targetInputPackageVersion: 'v2-input-package',
    targetInputPackageId: 'input_package_v2_fixture',
    targetInputPackageState: 'REGISTERED_NOT_EVALUATED',
    targetPackageIdentityDeterministic: true,
    targetPackageIdentityDistinctFromSourceV1: true,
    targetPackageRegisteredByThisGate: true,
    sourceV1PackageMutatedByThisGate: false,
    originalEvidenceRebindingRecords,
    originalProvenanceIndependenceInputs,
    provenanceInputCount: 6,
    provenanceUnresolvedCount: 6,
    remainingUnresolvedInputsPreservedWithoutInference: true,
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport;
}

function validI154(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport {
  const evaluationStepRecords = I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => ({
    stepId,
    order: index + 1,
    mandatory: true,
    failClosed: true,
    state: expectedStates[index],
    reason: `fixture-${stepId}`,
  }));

  const base = {
    evaluationRecordId: 'i154_i155_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    decision:
      'REGISTERED_V2_CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_PROVENANCE_INDEPENDENCE_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'input_package_v2_fixture',
    exactI153AuthorizationAccepted: true,
    exactI151RegisteredV2PackageAccepted: true,
    authorizationAndPackageIdentityMatch: true,
    evaluationState: 'COMPLETED_FAIL_CLOSED',
    authorizationConsumedByThisEvaluationRecord: true,
    authorizationReusableAfterThisRecord: false,
    evaluationStepRecords,
    evaluationStepCount: 9,
    passedStepCount: 4,
    failedStepCount: 1,
    notEvaluatedStepCount: 4,
    firstUnsatisfiedStepId: 'PROVENANCE_INDEPENDENCE_CHECK',
    firstUnsatisfiedStepReason: 'REGISTERED_PROVENANCE_INDEPENDENCE_INPUTS_UNRESOLVED',
    provenanceIndependenceUnresolvedCountObserved: 6,
    provenanceIndependenceAdjudicatedByThisGate: false,
    noProvenanceIndependenceInferencePerformed: true,
    candidateSetAdmissibilityState: 'NOT_ESTABLISHED_FAIL_CLOSED',
    candidateSetAdmissibilityEstablishedByThisGate: false,
    inputPackageMutatedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport;
}

describe('I155 provenance independence adjudication readiness review', () => {
  test('accepts exact I154 provenance failure and exact registered I151 provenance substrate', () => {
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'PROVENANCE_INDEPENDENCE_ADJUDICATION_NOT_READY_EXPLICIT_DERIVATIVE_RELATIONSHIP_EVIDENCE_REQUIRED_TARGETED_DISCOVERY_MAY_PROCEED',
    );
    expect(report.exactI154ProvenanceFailureAccepted).toBe(true);
    expect(report.exactI151ProvenanceSubstrateAccepted).toBe(true);
    expect(report.evaluationAndPackageIdentityMatch).toBe(true);
  });

  test('freezes all seven I132 provenance adjudication requirements without numeric weighting', () => {
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151(),
    );

    expect(report.provenanceAdjudicationRequirementIds).toEqual(
      I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS,
    );
    expect(report.provenanceAdjudicationRequirementCount).toBe(7);
    expect(report.explicitDerivativeRelationshipCheckRequired).toBe(true);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.sourceClassAloneSufficient).toBe(false);
    expect(report.provenanceTierMayBecomeNumericWeight).toBe(false);
    expect(report.sourceCountMayBecomeNumericWeight).toBe(false);
    expect(report.defaultWhenIndependenceUnresolved).toBe('REJECT_INDEPENDENCE_CLAIM');
  });

  test('preserves six unresolved provenance inputs and treats known same-work witness links as audit dependencies only', () => {
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151(),
    );

    expect(report.provenanceInputCount).toBe(6);
    expect(report.unresolvedProvenanceInputCount).toBe(6);
    expect(report.uniqueProvenanceIdentityCount).toBe(6);
    expect(report.registeredDependencyLinkCount).toBe(2);
    expect(report.inputsWithRegisteredDependencyLinks).toBe(1);
    expect(report.sameWorkAlternateWitnessDoesNotIncreaseIndependentAuthority).toBe(true);
    expect(report.allProvenanceInputsRemainUnresolved).toBe(true);
    expect(report.allNumericWeightsRemainNull).toBe(true);
  });

  test('does not promote empty dependency-link arrays or unique source identities into independence findings', () => {
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151(),
    );

    expect(report.zeroRegisteredDependencyLinksDoesNotEstablishIndependence).toBe(true);
    expect(report.uniqueSourceIdentityDoesNotEstablishIndependence).toBe(true);
    expect(report.currentV2PackageContainsCompletedDerivativeRelationshipAdjudication).toBe(false);
    expect(report.currentV2PackageContainsSufficientIndependenceFindingForAllSixInputs).toBe(false);
    expect(report.provenanceIndependenceAdjudicationReadyFromCurrentPackageAlone).toBe(false);
    expect(report.provenanceInputReadinessRecords.every((record) => !record.independenceEstablishedByCurrentPackage)).toBe(true);
    expect(report.provenanceInputReadinessRecords.every((record) => !record.zeroDependencyLinksWouldEstablishIndependence)).toBe(true);
  });

  test('authorizes only targeted derivative-relationship discovery, not provenance adjudication itself', () => {
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151(),
    );

    expect(report.targetedDerivativeRelationshipAuthorityDiscoveryReady).toBe(true);
    expect(report.targetedDiscoveryMustBindEachFindingToEvidenceIdAndProvenanceIdentity).toBe(true);
    expect(report.targetedDiscoveryMustRecordPositiveNegativeOrUnresolvedRelationshipFinding).toBe(true);
    expect(report.targetedDiscoveryMayNotUseSourceCountAsVote).toBe(true);
    expect(report.targetedDiscoveryMayNotUseProvenanceTierAsWeight).toBe(true);
    expect(report.targetedDiscoveryMayNotPromoteAbsenceOfKnownDependencyToIndependence).toBe(true);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
  });

  test('fails closed if the upstream evaluation no longer stops at unresolved provenance', () => {
    const alteredSteps = I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => ({
      stepId,
      order: index + 1,
      mandatory: true,
      failClosed: true,
      state: index === 4 ? 'PASS' : expectedStates[index],
      reason: `altered-${stepId}`,
    }));
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154({ evaluationStepRecords: alteredSteps }),
      validI151(),
    );

    expect(report.status).toBe('I154_PROVENANCE_FAILURE_OR_I151_V2_PACKAGE_INVALID');
    expect(report.targetedDerivativeRelationshipAuthorityDiscoveryReady).toBe(false);
    expect(report.provenanceInputCount).toBe(0);
  });

  test('fails closed if the v2 package pretends provenance independence is already resolved', () => {
    const i151 = validI151();
    const alteredInputs = i151.originalProvenanceIndependenceInputs.map((input, index) =>
      index === 0 ? { ...input, independenceState: 'INDEPENDENT' } : input,
    );
    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151({ originalProvenanceIndependenceInputs: alteredInputs }),
    );

    expect(report.status).toBe('I154_PROVENANCE_FAILURE_OR_I151_V2_PACKAGE_INVALID');
    expect(report.exactI151ProvenanceSubstrateAccepted).toBe(false);
    expect(report.targetedDerivativeRelationshipAuthorityDiscoveryReady).toBe(false);
  });

  test('fails closed on package identity mismatch and preserves all production authority guards', () => {
    const mismatched = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154({ inputPackageId: 'different-v2-package' }),
      validI151(),
    );
    expect(mismatched.status).toBe('I154_PROVENANCE_FAILURE_OR_I151_V2_PACKAGE_INVALID');
    expect(mismatched.evaluationAndPackageIdentityMatch).toBe(false);

    const report = buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
      validI154(),
      validI151(),
    );
    expect(report.consumedI153AuthorizationReusable).toBe(false);
    expect(report.newPackageVersionRequiredBeforeAnyLaterReevaluation).toBe(true);
    expect(report.newEvaluationAuthorizationRequiredAfterAnyLaterPackageRegistration).toBe(true);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });
});
