import { describe, expect, it } from 'vitest';
import {
  I162_REMEDIATION_REQUIREMENT_IDS,
  I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS,
  I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
  buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport,
} from '../src/index.js';

function validI162(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport {
  return {
    reviewId: 'i162_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_CANDIDATE_SET_REMEDIATION_REQUIREMENTS_REVIEW',
    decision:
      'PROVENANCE_REMEDIATION_REQUIREMENTS_AND_REVIEWABLE_STRATEGIES_FROZEN_CURRENT_V2_REMAINS_BLOCKED_NO_REMEDIATION_SELECTED_OR_EXECUTED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentCandidateSetId: 'candidate_set_fixture',
    currentInputPackageVersion: 'v2-input-package',
    currentInputPackageId: 'v2_package_fixture',
    exactI161BoundaryAccepted: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2MayBeReevaluatedWithoutNewPackage: false,
    frozenDerivativeEvidenceCount: 3,
    unresolvedOriginEvidenceCount: 3,
    reviewableRemediationStrategyIds: I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS,
    reviewableRemediationStrategyCount: 5,
    remediationRequirementIds: I162_REMEDIATION_REQUIREMENT_IDS,
    remediationRequirementCount: 15,
    requirementsFrozen: true,
    allRequirementsMandatoryForApplicableRemediation: true,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateRemovalRequiresFullSixRequirementCoverageRedemonstration: true,
    changedEvidenceMustRebindExactRequirementOwnership: true,
    changedEvidenceMustReassessScopeCompatibility: true,
    affectedSemanticBridgesMustBeReevaluated: true,
    affectedContradictionsMustBeReevaluated: true,
    newProvenanceMustCarryExplicitDerivativeRelationshipEvidence: true,
    explicitNegativeDerivativeFindingAloneEstablishesIndependence: false,
    sameWorkAlternateWitnessCreatesIndependentAuthority: false,
    downstreamRetransmissionCreatesIndependentAuthority: false,
    unresolvedOriginMayBePromotedBySearchExhaustion: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    adoptedRemediationMustBeProspective: true,
    adoptedRemediationRequiresNewCandidateSetVersion: true,
    adoptedRemediationRequiresNewInputPackageVersion: true,
    futureReevaluationRequiresNewSingleUseAuthorization: true,
    futureReevaluationRequiresFullNineStepSequence: true,
    provenanceRemediationCandidateDiscoveryReadinessReviewMethodologicallyJustified: true,
    provenanceRemediationCandidateDiscoveryReadinessReviewAuthorized: true,
    candidateDiscoveryReadinessAuthorizationIsCandidateDiscovery: false,
    candidateDiscoveryReadinessAuthorizationIsRemediationSelection: false,
    candidateDiscoveryReadinessAuthorizationIsCandidateSetMutation: false,
    inputPackageMutatedByThisGate: false,
    newPackageVersionCreatedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    newProvenanceEvidenceAcquiredByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport;
}

describe('I163 provenance remediation candidate discovery readiness', () => {
  it('authorizes five conclusion-neutral discovery tracks without discovering, selecting, or executing remediation', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'FIVE_REMEDIATION_DISCOVERY_TRACKS_READY_UNDER_FIFTEEN_FROZEN_REQUIREMENTS_NO_CANDIDATE_DISCOVERED_SELECTED_OR_EXECUTED',
    );
    expect(report.discoveryTrackCount).toBe(5);
    expect(report.allTracksConclusionNeutral).toBe(true);
    expect(report.remediationCandidateDiscoveryAuthorizedByThisGate).toBe(true);
    expect(report.remediationCandidateDiscoveryExecutedByThisGate).toBe(false);
    expect(report.remediationCandidateDiscoveredByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
  });

  it('preserves the exact five I162 strategy classes and all fifteen remediation requirements', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.reviewableStrategyIds).toEqual(I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS);
    expect(report.reviewableStrategyCount).toBe(5);
    expect(report.frozenI162RequirementIds).toEqual(I162_REMEDIATION_REQUIREMENT_IDS);
    expect(report.frozenI162RequirementCount).toBe(15);
  });

  it('freezes the exact nine discovery-output requirements in order', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.discoveryOutputRequirementIds).toEqual(I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS);
    expect(report.discoveryOutputRequirementCount).toBe(9);
  });

  it('binds every track to all frozen requirements and keeps every track authorized-not-executed', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.discoveryTracks).toHaveLength(5);
    for (const track of report.discoveryTracks) {
      expect(track.discoveryState).toBe('AUTHORIZED_NOT_EXECUTED');
      expect(track.mustSatisfyI162RequirementIds).toEqual(I162_REMEDIATION_REQUIREMENT_IDS);
      expect(track.outputRequirementIds).toEqual(I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS);
      expect(track.discoveryMaySelectStrategy).toBe(false);
      expect(track.discoveryMayMutateCandidateSet).toBe(false);
      expect(track.discoveryMayEstablishIndependence).toBe(false);
      expect(track.discoveryMayEstablishAdmissibility).toBe(false);
    }
  });

  it('retains strategy-specific boundaries against duplicate witnesses, silent replacement inheritance, and coverage-erasing removal', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.continuedLineageTrackLimitedToUnresolvedOrigins).toBe(true);
    expect(report.newProvenanceTrackRequiresIndependentAuthorityCandidateNotDuplicateWitness).toBe(true);
    expect(report.rebindingTrackRejectsSameWorkWitnessAsNewAuthority).toBe(true);
    expect(report.replacementTrackRequiresRequirementOwnershipAndScopeRedemonstration).toBe(true);
    expect(report.removalTrackRequiresFullSixRequirementCoverageRedemonstration).toBe(true);
  });

  it('allows explicit negative derivative evidence as an output but never equates it with independence', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.explicitNegativeDerivativeFindingMayBeDiscoveryOutput).toBe(true);
    expect(report.explicitNegativeDerivativeFindingAloneMayEstablishIndependence).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
  });

  it('retains current-v2 immutability and all package, evaluation, production, threshold, classification, numeric, and hidden-stem guards', () => {
    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(validI162());

    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.newPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateRemovedByThisGate).toBe(false);
    expect(report.candidateReplacedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.newProvenanceEvidenceAcquiredByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I162 mutates the frozen strategy set or weakens a provenance guard', () => {
    const mutated = {
      ...validI162(),
      explicitNegativeDerivativeFindingAloneEstablishesIndependence: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport;

    const report = buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(mutated);

    expect(report.status).toBe('I162_REMEDIATION_REQUIREMENTS_INVALID');
    expect(report.decision).toBe('REMEDIATION_CANDIDATE_DISCOVERY_NOT_READY');
    expect(report.exactI162BoundaryAccepted).toBe(false);
    expect(report.discoveryTrackCount).toBe(0);
    expect(report.remediationCandidateDiscoveryAuthorizedByThisGate).toBe(false);
  });
});
