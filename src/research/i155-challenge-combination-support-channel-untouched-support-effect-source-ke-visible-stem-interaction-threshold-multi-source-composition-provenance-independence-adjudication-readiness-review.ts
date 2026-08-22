import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { I144_BINDING_EVALUATION_STEP_IDS } from './i144-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport } from './i151-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudicated-v2-input-package-materialization-record.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport } from './i154-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-authorized-registered-v2-input-package-fail-closed-candidate-set-evaluation-record.js';

export const I155_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-adjudication-readiness-review-v1';

export const I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS = Object.freeze([
  'INDEPENDENT_NORMATIVE_PROVENANCE_REQUIRED',
  'DERIVATIVE_RETRANSMISSION_NOT_INDEPENDENT_AUTHORITY',
  'SOURCE_CLASS_ALONE_INSUFFICIENT',
  'EXPLICIT_DERIVATIVE_RELATIONSHIP_CHECK_REQUIRED',
  'PROVENANCE_TIER_NOT_NUMERIC_WEIGHT',
  'SOURCE_COUNT_NOT_NUMERIC_WEIGHT',
  'UNRESOLVED_DEFAULT_REJECT_INDEPENDENCE_CLAIM',
] as const);

export type I155ProvenanceAdjudicationRequirementId =
  (typeof I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS)[number];

export interface I155ProvenanceInputReadinessRecord {
  evidenceId: string;
  provenanceIdentity: string;
  dependencyLinks: readonly string[];
  registeredState: 'UNRESOLVED';
  numericWeight: null;
  evidenceBindingPresent: true;
  structurallyReadyForTargetedDerivativeRelationshipResearch: true;
  independenceEstablishedByCurrentPackage: false;
  zeroDependencyLinksWouldEstablishIndependence: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW'
    | 'I154_PROVENANCE_FAILURE_OR_I151_V2_PACKAGE_INVALID';
  decision:
    | 'PROVENANCE_INDEPENDENCE_ADJUDICATION_NOT_READY_EXPLICIT_DERIVATIVE_RELATIONSHIP_EVIDENCE_REQUIRED_TARGETED_DISCOVERY_MAY_PROCEED'
    | 'PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_NOT_ESTABLISHED';
  upstreamI154EvaluationRecordId: string;
  upstreamI151RecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v2-input-package';
  inputPackageId: string | null;
  exactI154ProvenanceFailureAccepted: boolean;
  exactI151ProvenanceSubstrateAccepted: boolean;
  evaluationAndPackageIdentityMatch: boolean;
  provenanceAdjudicationRequirementIds: readonly I155ProvenanceAdjudicationRequirementId[];
  provenanceAdjudicationRequirementCount: 7;
  provenanceInputReadinessRecords: readonly I155ProvenanceInputReadinessRecord[];
  provenanceInputCount: 6 | 0;
  unresolvedProvenanceInputCount: 6 | 0;
  uniqueProvenanceIdentityCount: number;
  registeredDependencyLinkCount: number;
  inputsWithRegisteredDependencyLinks: number;
  allProvenanceInputsBindRegisteredEvidence: boolean;
  allProvenanceInputsRemainUnresolved: boolean;
  allNumericWeightsRemainNull: boolean;
  explicitDerivativeRelationshipCheckRequired: true;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  sourceClassAloneSufficient: false;
  provenanceTierMayBecomeNumericWeight: false;
  sourceCountMayBecomeNumericWeight: false;
  defaultWhenIndependenceUnresolved: 'REJECT_INDEPENDENCE_CLAIM';
  zeroRegisteredDependencyLinksDoesNotEstablishIndependence: true;
  uniqueSourceIdentityDoesNotEstablishIndependence: true;
  sameWorkAlternateWitnessDoesNotIncreaseIndependentAuthority: true;
  currentV2PackageContainsCompletedDerivativeRelationshipAdjudication: false;
  currentV2PackageContainsSufficientIndependenceFindingForAllSixInputs: false;
  provenanceIndependenceAdjudicationReadyFromCurrentPackageAlone: false;
  targetedDerivativeRelationshipAuthorityDiscoveryReady: boolean;
  targetedDiscoveryMustBindEachFindingToEvidenceIdAndProvenanceIdentity: true;
  targetedDiscoveryMustRecordPositiveNegativeOrUnresolvedRelationshipFinding: true;
  targetedDiscoveryMayNotUseSourceCountAsVote: true;
  targetedDiscoveryMayNotUseProvenanceTierAsWeight: true;
  targetedDiscoveryMayNotPromoteAbsenceOfKnownDependencyToIndependence: true;
  consumedI153AuthorizationReusable: false;
  newPackageVersionRequiredBeforeAnyLaterReevaluation: true;
  newEvaluationAuthorizationRequiredAfterAnyLaterPackageRegistration: true;
  inputPackageMutatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD';
  notes: readonly string[];
}

function exactI154Accepted(
  i154: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport,
): boolean {
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

  return (
    i154.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD' &&
    i154.decision ===
      'REGISTERED_V2_CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_PROVENANCE_INDEPENDENCE_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED' &&
    i154.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i154.policyVersion === 'v1-definition' &&
    i154.adoptionVersion === 'v1-adoption' &&
    i154.adoptionId !== null &&
    i154.candidateSetVersion === 'v1-candidate-set' &&
    i154.candidateSetId !== null &&
    i154.inputPackageVersion === 'v2-input-package' &&
    i154.inputPackageId !== null &&
    i154.exactI153AuthorizationAccepted &&
    i154.exactI151RegisteredV2PackageAccepted &&
    i154.authorizationAndPackageIdentityMatch &&
    i154.evaluationState === 'COMPLETED_FAIL_CLOSED' &&
    i154.authorizationConsumedByThisEvaluationRecord &&
    i154.authorizationReusableAfterThisRecord === false &&
    i154.evaluationStepRecords.length === 9 &&
    i154.evaluationStepRecords.every(
      (step, index) =>
        step.stepId === I144_BINDING_EVALUATION_STEP_IDS[index] &&
        step.order === index + 1 &&
        step.mandatory &&
        step.failClosed &&
        step.state === expectedStates[index],
    ) &&
    i154.passedStepCount === 4 &&
    i154.failedStepCount === 1 &&
    i154.notEvaluatedStepCount === 4 &&
    i154.firstUnsatisfiedStepId === 'PROVENANCE_INDEPENDENCE_CHECK' &&
    i154.firstUnsatisfiedStepReason === 'REGISTERED_PROVENANCE_INDEPENDENCE_INPUTS_UNRESOLVED' &&
    i154.provenanceIndependenceUnresolvedCountObserved === 6 &&
    i154.provenanceIndependenceAdjudicatedByThisGate === false &&
    i154.noProvenanceIndependenceInferencePerformed &&
    i154.candidateSetAdmissibilityState === 'NOT_ESTABLISHED_FAIL_CLOSED' &&
    i154.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i154.inputPackageMutatedByThisGate === false &&
    i154.productionPolicyExecutionAuthorized === false &&
    i154.actualCompositionPerformedByThisGate === false &&
    i154.multiSourceCompositionAuthorized === false &&
    i154.authorityAcquiredByThisGate === false &&
    i154.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i154.thresholdRuleCreatedByThisGate === false &&
    i154.classificationAuthorized === false &&
    i154.numericScoringAuthorized === false &&
    i154.hiddenStemInteractionEligibilityGapRemains &&
    i154.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW'
  );
}

function exactI151ProvenanceSubstrateAccepted(
  i151: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
): boolean {
  const evidenceIds = new Set(i151.originalEvidenceRebindingRecords.map((record) => record.evidenceId));
  const provenanceEvidenceIds = new Set(i151.originalProvenanceIndependenceInputs.map((input) => input.evidenceId));

  return (
    i151.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD' &&
    i151.decision ===
      'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION' &&
    i151.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i151.policyVersion === 'v1-definition' &&
    i151.adoptionVersion === 'v1-adoption' &&
    i151.adoptionId !== null &&
    i151.candidateSetVersion === 'v1-candidate-set' &&
    i151.candidateSetId !== null &&
    i151.targetInputPackageVersion === 'v2-input-package' &&
    i151.targetInputPackageId !== null &&
    i151.targetInputPackageState === 'REGISTERED_NOT_EVALUATED' &&
    i151.targetPackageIdentityDeterministic &&
    i151.targetPackageIdentityDistinctFromSourceV1 &&
    i151.targetPackageRegisteredByThisGate &&
    i151.sourceV1PackageMutatedByThisGate === false &&
    i151.originalEvidenceRebindingRecords.length === 6 &&
    evidenceIds.size === 6 &&
    i151.originalProvenanceIndependenceInputs.length === 6 &&
    provenanceEvidenceIds.size === 6 &&
    [...provenanceEvidenceIds].every((evidenceId) => evidenceIds.has(evidenceId)) &&
    i151.originalProvenanceIndependenceInputs.every(
      (input) =>
        input.provenanceIdentity.length > 0 &&
        input.independenceState === 'UNRESOLVED' &&
        input.numericWeight === null,
    ) &&
    i151.provenanceInputCount === 6 &&
    i151.provenanceUnresolvedCount === 6 &&
    i151.remainingUnresolvedInputsPreservedWithoutInference
  );
}

function identitiesMatch(
  i154: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport,
  i151: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
): boolean {
  return (
    i154.policyId === i151.policyId &&
    i154.policyVersion === i151.policyVersion &&
    i154.adoptionId === i151.adoptionId &&
    i154.candidateSetId === i151.candidateSetId &&
    i154.inputPackageId === i151.targetInputPackageId
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI155ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReview(
  i154: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport,
  i151: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport {
  const evaluationAccepted = exactI154Accepted(i154);
  const packageAccepted = exactI151ProvenanceSubstrateAccepted(i151);
  const matched = evaluationAccepted && packageAccepted && identitiesMatch(i154, i151);

  const common = {
    reviewVersion:
      I155_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW_VERSION,
    upstreamI154EvaluationRecordId: i154.evaluationRecordId,
    upstreamI151RecordId: i151.recordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v2-input-package' as const,
    provenanceAdjudicationRequirementIds: I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS,
    provenanceAdjudicationRequirementCount: 7 as const,
    explicitDerivativeRelationshipCheckRequired: true as const,
    derivativeRetransmissionCountsAsIndependentAuthority: false as const,
    sourceClassAloneSufficient: false as const,
    provenanceTierMayBecomeNumericWeight: false as const,
    sourceCountMayBecomeNumericWeight: false as const,
    defaultWhenIndependenceUnresolved: 'REJECT_INDEPENDENCE_CLAIM' as const,
    zeroRegisteredDependencyLinksDoesNotEstablishIndependence: true as const,
    uniqueSourceIdentityDoesNotEstablishIndependence: true as const,
    sameWorkAlternateWitnessDoesNotIncreaseIndependentAuthority: true as const,
    currentV2PackageContainsCompletedDerivativeRelationshipAdjudication: false as const,
    currentV2PackageContainsSufficientIndependenceFindingForAllSixInputs: false as const,
    provenanceIndependenceAdjudicationReadyFromCurrentPackageAlone: false as const,
    targetedDiscoveryMustBindEachFindingToEvidenceIdAndProvenanceIdentity: true as const,
    targetedDiscoveryMustRecordPositiveNegativeOrUnresolvedRelationshipFinding: true as const,
    targetedDiscoveryMayNotUseSourceCountAsVote: true as const,
    targetedDiscoveryMayNotUseProvenanceTierAsWeight: true as const,
    targetedDiscoveryMayNotPromoteAbsenceOfKnownDependencyToIndependence: true as const,
    consumedI153AuthorizationReusable: false as const,
    newPackageVersionRequiredBeforeAnyLaterReevaluation: true as const,
    newEvaluationAuthorizationRequiredAfterAnyLaterPackageRegistration: true as const,
    inputPackageMutatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    candidateSetReevaluationAuthorizedByThisGate: false as const,
    candidateSetReevaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    actualCompositionPerformedByThisGate: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!matched) {
    return finalized({
      ...common,
      status: 'I154_PROVENANCE_FAILURE_OR_I151_V2_PACKAGE_INVALID',
      decision: 'PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_NOT_ESTABLISHED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI154ProvenanceFailureAccepted: evaluationAccepted,
      exactI151ProvenanceSubstrateAccepted: packageAccepted,
      evaluationAndPackageIdentityMatch: false,
      provenanceInputReadinessRecords: [],
      provenanceInputCount: 0,
      unresolvedProvenanceInputCount: 0,
      uniqueProvenanceIdentityCount: 0,
      registeredDependencyLinkCount: 0,
      inputsWithRegisteredDependencyLinks: 0,
      allProvenanceInputsBindRegisteredEvidence: false,
      allProvenanceInputsRemainUnresolved: false,
      allNumericWeightsRemainNull: false,
      targetedDerivativeRelationshipAuthorityDiscoveryReady: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
      notes: ['I155 fails closed unless the exact I154 provenance failure and exact registered I151 provenance substrate are identity-consistent.'],
    });
  }

  const evidenceIds = new Set(i151.originalEvidenceRebindingRecords.map((record) => record.evidenceId));
  const records = Object.freeze(
    i151.originalProvenanceIndependenceInputs.map((input) =>
      Object.freeze({
        evidenceId: input.evidenceId,
        provenanceIdentity: input.provenanceIdentity,
        dependencyLinks: Object.freeze([...input.dependencyLinks]),
        registeredState: 'UNRESOLVED' as const,
        numericWeight: null,
        evidenceBindingPresent: true as const,
        structurallyReadyForTargetedDerivativeRelationshipResearch: true as const,
        independenceEstablishedByCurrentPackage: false as const,
        zeroDependencyLinksWouldEstablishIndependence: false as const,
      }),
    ),
  );
  const uniqueProvenanceIdentityCount = new Set(records.map((record) => record.provenanceIdentity)).size;
  const registeredDependencyLinkCount = records.reduce(
    (sum, record) => sum + record.dependencyLinks.length,
    0,
  );
  const inputsWithRegisteredDependencyLinks = records.filter(
    (record) => record.dependencyLinks.length > 0,
  ).length;
  const allBindEvidence = records.every((record) => evidenceIds.has(record.evidenceId));

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW',
    decision:
      'PROVENANCE_INDEPENDENCE_ADJUDICATION_NOT_READY_EXPLICIT_DERIVATIVE_RELATIONSHIP_EVIDENCE_REQUIRED_TARGETED_DISCOVERY_MAY_PROCEED',
    adoptionId: i151.adoptionId,
    candidateSetId: i151.candidateSetId,
    inputPackageId: i151.targetInputPackageId,
    exactI154ProvenanceFailureAccepted: true,
    exactI151ProvenanceSubstrateAccepted: true,
    evaluationAndPackageIdentityMatch: true,
    provenanceInputReadinessRecords: records,
    provenanceInputCount: 6,
    unresolvedProvenanceInputCount: 6,
    uniqueProvenanceIdentityCount,
    registeredDependencyLinkCount,
    inputsWithRegisteredDependencyLinks,
    allProvenanceInputsBindRegisteredEvidence: allBindEvidence,
    allProvenanceInputsRemainUnresolved: true,
    allNumericWeightsRemainNull: true,
    targetedDerivativeRelationshipAuthorityDiscoveryReady: allBindEvidence,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: [
      'I155 does not equate unique provenance identities or empty dependency-link arrays with normative independence.',
      'I132 requires an explicit derivative-relationship check; the registered v2 package contains unresolved provenance inputs, not completed relationship findings.',
      'Known same-work alternate witnesses may remain dependency links for audit but cannot increase independent-authority count.',
      'A targeted derivative-relationship authority discovery gate may now define the evidence acquisition needed for later provenance adjudication.',
    ],
  });
}
