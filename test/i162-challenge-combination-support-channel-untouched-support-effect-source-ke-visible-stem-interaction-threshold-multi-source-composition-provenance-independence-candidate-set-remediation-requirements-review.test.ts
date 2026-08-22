import { describe, expect, it } from 'vitest';
import {
  I161_PROVENANCE_REMEDIATION_REVIEW_REQUIREMENT_IDS,
  I162_REMEDIATION_REQUIREMENT_IDS,
  I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS,
  buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReviewReport,
} from '../src/index.js';

function validI161(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReviewReport {
  return {
    reviewId: 'i161_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_DISCOVERY_EXHAUSTION_POLICY_REASSESSMENT_REVIEW',
    decision:
      'TARGETED_ORIGIN_DISCOVERY_DID_NOT_RESOLVE_THREE_ORIGINS_NO_CORPUS_EXHAUSTION_NO_POLICY_RELAXATION_CURRENT_V2_PROVENANCE_REMAINS_BLOCKED_SEPARATE_CANDIDATE_SET_PROVENANCE_REMEDIATION_REQUIREMENTS_REVIEW_MAY_PROCEED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'v2_package_fixture',
    exactI160EvidenceAccepted: true,
    frozenDerivativeEvidenceCount: 3,
    unresolvedOriginEvidenceCount: 3,
    newDerivativeDependencyCount: 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    targetedOriginDiscoveryExecuted: true,
    targetedOriginDiscoveryResolvedAnyOrigin: false,
    boundedSearchBasesDocumented: true,
    corpusExhaustionProven: false,
    universalNoDerivativeDependencyProven: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    unresolvedDefaultRejectIndependenceClaimRemains: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    currentV2ProvenanceIndependenceSatisfied: false,
    provenanceIndependenceCheckMayPassFromCurrentEvidence: false,
    candidateSetAdmissibilityEstablishedFromCurrentEvidence: false,
    remediationReviewRequirementIds: I161_PROVENANCE_REMEDIATION_REVIEW_REQUIREMENT_IDS,
    remediationReviewRequirementCount: 8,
    candidateSetProvenanceRemediationRequirementsReviewMethodologicallyJustified: true,
    candidateSetProvenanceRemediationRequirementsReviewAuthorized: true,
    remediationRequirementsReviewAuthorizationIsCandidateSetMutation: false,
    remediationRequirementsReviewAuthorizationIsCandidateRemoval: false,
    remediationRequirementsReviewAuthorizationIsCandidateReplacement: false,
    remediationRequirementsReviewAuthorizationIsEvidenceRebinding: false,
    remediationRequirementsReviewAuthorizationIsPackageVersionCreation: false,
    remediationRequirementsReviewAuthorizationIsEvaluationAuthorization: false,
    remediationRequirementsReviewAuthorizationIsProvenanceAdjudication: false,
    priorDerivativeRowsMayBeGrandfatheredAsIndependent: false,
    priorUnresolvedRowsMayBeGrandfatheredAsIndependent: false,
    anyFutureCandidateSetChangeMustBeProspective: true,
    anyFutureCandidateSetChangeRequiresNewPackageVersion: true,
    anyFutureReevaluationRequiresNewSingleUseAuthorization: true,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    inputPackageMutatedByThisGate: false,
    newPackageVersionCreatedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_CANDIDATE_SET_REMEDIATION_REQUIREMENTS_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReviewReport;
}

describe('I162 provenance candidate-set remediation requirements review', () => {
  it('freezes remediation requirements while current v2 remains blocked and immutable', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_CANDIDATE_SET_REMEDIATION_REQUIREMENTS_REVIEW',
    );
    expect(report.decision).toBe(
      'PROVENANCE_REMEDIATION_REQUIREMENTS_AND_REVIEWABLE_STRATEGIES_FROZEN_CURRENT_V2_REMAINS_BLOCKED_NO_REMEDIATION_SELECTED_OR_EXECUTED',
    );
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2MayBeReevaluatedWithoutNewPackage).toBe(false);
  });

  it('freezes exactly five reviewable strategies without selecting or authorizing one', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.reviewableRemediationStrategyIds).toEqual(I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS);
    expect(report.reviewableRemediationStrategyCount).toBe(5);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.continuedOriginLineageResolutionReviewedAsPossible).toBe(true);
    expect(report.newProvenanceEvidenceAcquisitionReviewedAsPossible).toBe(true);
    expect(report.evidenceRebindingReviewedAsPossible).toBe(true);
    expect(report.candidateReplacementReviewedAsPossible).toBe(true);
    expect(report.candidateRemovalReviewedAsPossible).toBe(true);
  });

  it('freezes all fifteen remediation requirements in exact order', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.remediationRequirementCount).toBe(15);
    expect(report.remediationRequirementIds).toEqual(I162_REMEDIATION_REQUIREMENT_IDS);
    expect(report.requirementsFrozen).toBe(true);
    expect(report.allRequirementsMandatoryForApplicableRemediation).toBe(true);
  });

  it('requires coverage, ownership, scope, bridge, and contradiction re-demonstration where remediation changes evidence', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.candidateRemovalMayEraseRequirementCoverage).toBe(false);
    expect(report.candidateRemovalRequiresFullSixRequirementCoverageRedemonstration).toBe(true);
    expect(report.replacementMayInheritPriorRequirementSatisfactionAutomatically).toBe(false);
    expect(report.rebindingMayChangeSourceIdentitySilently).toBe(false);
    expect(report.changedEvidenceMustRebindExactRequirementOwnership).toBe(true);
    expect(report.changedEvidenceMustReassessScopeCompatibility).toBe(true);
    expect(report.affectedSemanticBridgesMustBeReevaluated).toBe(true);
    expect(report.affectedContradictionsMustBeReevaluated).toBe(true);
  });

  it('requires derivative evidence for new provenance but refuses to equate negative derivative findings with independence', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.newProvenanceMustCarryExplicitDerivativeRelationshipEvidence).toBe(true);
    expect(report.explicitNegativeDerivativeFindingAloneEstablishesIndependence).toBe(false);
    expect(report.sameWorkAlternateWitnessCreatesIndependentAuthority).toBe(false);
    expect(report.downstreamRetransmissionCreatesIndependentAuthority).toBe(false);
    expect(report.unresolvedOriginMayBePromotedBySearchExhaustion).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
  });

  it('requires prospective versioning and a new single-use full evaluation after any adopted remediation', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.adoptedRemediationMustBeProspective).toBe(true);
    expect(report.adoptedRemediationRequiresNewCandidateSetVersion).toBe(true);
    expect(report.adoptedRemediationRequiresNewInputPackageVersion).toBe(true);
    expect(report.futureReevaluationRequiresNewSingleUseAuthorization).toBe(true);
    expect(report.futureReevaluationRequiresFullNineStepSequence).toBe(true);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
  });

  it('authorizes only the next candidate-discovery readiness review and retains all hard guards', () => {
    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(validI161());

    expect(report.provenanceRemediationCandidateDiscoveryReadinessReviewMethodologicallyJustified).toBe(true);
    expect(report.provenanceRemediationCandidateDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(report.candidateDiscoveryReadinessAuthorizationIsCandidateDiscovery).toBe(false);
    expect(report.candidateDiscoveryReadinessAuthorizationIsRemediationSelection).toBe(false);
    expect(report.candidateDiscoveryReadinessAuthorizationIsCandidateSetMutation).toBe(false);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.newPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateRemovedByThisGate).toBe(false);
    expect(report.candidateReplacedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.newProvenanceEvidenceAcquiredByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I161 tries to relax the unresolved default', () => {
    const mutated = {
      ...validI161(),
      unresolvedDefaultRejectIndependenceClaimRemains: false,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReviewReport;

    const report = buildI162ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReview(mutated);

    expect(report.status).toBe('I161_POLICY_REASSESSMENT_INVALID');
    expect(report.decision).toBe('PROVENANCE_REMEDIATION_REQUIREMENTS_NOT_ESTABLISHED');
    expect(report.exactI161BoundaryAccepted).toBe(false);
    expect(report.requirementsFrozen).toBe(false);
    expect(report.provenanceRemediationCandidateDiscoveryReadinessReviewAuthorized).toBe(false);
  });
});
