import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I162_REMEDIATION_REQUIREMENT_IDS,
  I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport,
  type I162RemediationRequirementId,
  type I162ReviewableRemediationStrategyId,
} from './i162-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-candidate-set-remediation-requirements-review.js';

export const I163_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-discovery-readiness-review-v1';

export const I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS = Object.freeze([
  'EXACT_STRATEGY_AND_TARGET_BINDING',
  'STABLE_SOURCE_IDENTITY_AND_REPRODUCIBLE_WITNESS',
  'EXACT_I118_REQUIREMENT_OWNERSHIP_OR_COVERAGE_EFFECT',
  'VISIBLE_STEM_SCOPE_COMPATIBILITY_EVIDENCE',
  'EXPLICIT_DERIVATIVE_RELATIONSHIP_EVIDENCE',
  'SEMANTIC_BRIDGE_IMPACT_RECORD',
  'CONTRADICTION_IMPACT_RECORD',
  'PROSPECTIVE_DELTA_AND_VERSIONING_IMPACT_RECORD',
  'NO_INDEPENDENCE_OR_ADMISSIBILITY_INFERENCE_AT_DISCOVERY_STAGE',
] as const);

export type I163DiscoveryOutputRequirementId =
  (typeof I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS)[number];

export interface I163RemediationDiscoveryTrack {
  strategyId: I162ReviewableRemediationStrategyId;
  discoveryState: 'AUTHORIZED_NOT_EXECUTED';
  targetScope: string;
  mustSatisfyI162RequirementIds: readonly I162RemediationRequirementId[];
  outputRequirementIds: readonly I163DiscoveryOutputRequirementId[];
  discoveryMaySelectStrategy: false;
  discoveryMayMutateCandidateSet: false;
  discoveryMayEstablishIndependence: false;
  discoveryMayEstablishAdmissibility: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW'
    | 'I162_REMEDIATION_REQUIREMENTS_INVALID';
  decision:
    | 'FIVE_REMEDIATION_DISCOVERY_TRACKS_READY_UNDER_FIFTEEN_FROZEN_REQUIREMENTS_NO_CANDIDATE_DISCOVERED_SELECTED_OR_EXECUTED'
    | 'REMEDIATION_CANDIDATE_DISCOVERY_NOT_READY';
  upstreamI162ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  currentCandidateSetVersion: 'v1-candidate-set';
  currentCandidateSetId: string | null;
  currentInputPackageVersion: 'v2-input-package';
  currentInputPackageId: string | null;
  exactI162BoundaryAccepted: boolean;
  currentV2ProvenanceDisposition:
    | 'BLOCKED_UNDER_CURRENT_EVIDENCE'
    | 'NOT_ASSESSED';
  frozenI162RequirementIds: readonly I162RemediationRequirementId[];
  frozenI162RequirementCount: 15;
  reviewableStrategyIds: readonly I162ReviewableRemediationStrategyId[];
  reviewableStrategyCount: 5;
  discoveryOutputRequirementIds: readonly I163DiscoveryOutputRequirementId[];
  discoveryOutputRequirementCount: 9;
  discoveryTracks: readonly I163RemediationDiscoveryTrack[];
  discoveryTrackCount: 5 | 0;
  allTracksConclusionNeutral: boolean;
  continuedLineageTrackLimitedToUnresolvedOrigins: boolean;
  newProvenanceTrackRequiresIndependentAuthorityCandidateNotDuplicateWitness: boolean;
  rebindingTrackRejectsSameWorkWitnessAsNewAuthority: boolean;
  replacementTrackRequiresRequirementOwnershipAndScopeRedemonstration: boolean;
  removalTrackRequiresFullSixRequirementCoverageRedemonstration: boolean;
  explicitNegativeDerivativeFindingMayBeDiscoveryOutput: boolean;
  explicitNegativeDerivativeFindingAloneMayEstablishIndependence: false;
  remediationCandidateDiscoveryAuthorizedByThisGate: boolean;
  remediationCandidateDiscoveryExecutedByThisGate: false;
  remediationCandidateDiscoveredByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  inputPackageMutatedByThisGate: false;
  newPackageVersionCreatedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  evidenceReboundByThisGate: false;
  newProvenanceEvidenceAcquiredByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_CANDIDATE_SET_REMEDIATION_REQUIREMENTS_REVIEW';
  notes: readonly string[];
}

function exactI162Accepted(
  i162: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport,
): boolean {
  const exactStrategies =
    i162.reviewableRemediationStrategyIds.length === I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS.length &&
    i162.reviewableRemediationStrategyIds.every(
      (strategyId, index) => strategyId === I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS[index],
    );
  const exactRequirements =
    i162.remediationRequirementIds.length === I162_REMEDIATION_REQUIREMENT_IDS.length &&
    i162.remediationRequirementIds.every(
      (requirementId, index) => requirementId === I162_REMEDIATION_REQUIREMENT_IDS[index],
    );

  return (
    i162.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_CANDIDATE_SET_REMEDIATION_REQUIREMENTS_REVIEW' &&
    i162.decision ===
      'PROVENANCE_REMEDIATION_REQUIREMENTS_AND_REVIEWABLE_STRATEGIES_FROZEN_CURRENT_V2_REMAINS_BLOCKED_NO_REMEDIATION_SELECTED_OR_EXECUTED' &&
    i162.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i162.policyVersion === 'v1-definition' &&
    i162.adoptionVersion === 'v1-adoption' &&
    i162.adoptionId !== null &&
    i162.currentCandidateSetVersion === 'v1-candidate-set' &&
    i162.currentCandidateSetId !== null &&
    i162.currentInputPackageVersion === 'v2-input-package' &&
    i162.currentInputPackageId !== null &&
    i162.exactI161BoundaryAccepted &&
    i162.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i162.currentV2PackageAndCandidateSetRemainImmutable &&
    i162.currentV2MayBeReevaluatedWithoutNewPackage === false &&
    i162.frozenDerivativeEvidenceCount === 3 &&
    i162.unresolvedOriginEvidenceCount === 3 &&
    exactStrategies &&
    i162.reviewableRemediationStrategyCount === 5 &&
    exactRequirements &&
    i162.remediationRequirementCount === 15 &&
    i162.requirementsFrozen &&
    i162.allRequirementsMandatoryForApplicableRemediation &&
    i162.remediationStrategySelectedByThisGate === false &&
    i162.remediationExecutionAuthorizedByThisGate === false &&
    i162.candidateRemovalRequiresFullSixRequirementCoverageRedemonstration &&
    i162.changedEvidenceMustRebindExactRequirementOwnership &&
    i162.changedEvidenceMustReassessScopeCompatibility &&
    i162.affectedSemanticBridgesMustBeReevaluated &&
    i162.affectedContradictionsMustBeReevaluated &&
    i162.newProvenanceMustCarryExplicitDerivativeRelationshipEvidence &&
    i162.explicitNegativeDerivativeFindingAloneEstablishesIndependence === false &&
    i162.sameWorkAlternateWitnessCreatesIndependentAuthority === false &&
    i162.downstreamRetransmissionCreatesIndependentAuthority === false &&
    i162.unresolvedOriginMayBePromotedBySearchExhaustion === false &&
    i162.sourceCountVotingAllowed === false &&
    i162.provenanceTierWeightingAllowed === false &&
    i162.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i162.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i162.adoptedRemediationMustBeProspective &&
    i162.adoptedRemediationRequiresNewCandidateSetVersion &&
    i162.adoptedRemediationRequiresNewInputPackageVersion &&
    i162.futureReevaluationRequiresNewSingleUseAuthorization &&
    i162.futureReevaluationRequiresFullNineStepSequence &&
    i162.provenanceRemediationCandidateDiscoveryReadinessReviewMethodologicallyJustified &&
    i162.provenanceRemediationCandidateDiscoveryReadinessReviewAuthorized &&
    i162.candidateDiscoveryReadinessAuthorizationIsCandidateDiscovery === false &&
    i162.candidateDiscoveryReadinessAuthorizationIsRemediationSelection === false &&
    i162.candidateDiscoveryReadinessAuthorizationIsCandidateSetMutation === false &&
    i162.inputPackageMutatedByThisGate === false &&
    i162.newPackageVersionCreatedByThisGate === false &&
    i162.candidateSetMutatedByThisGate === false &&
    i162.candidateRemovedByThisGate === false &&
    i162.candidateReplacedByThisGate === false &&
    i162.evidenceReboundByThisGate === false &&
    i162.newProvenanceEvidenceAcquiredByThisGate === false &&
    i162.provenanceIndependenceAdjudicatedByThisGate === false &&
    i162.candidateSetReevaluationAuthorizedByThisGate === false &&
    i162.candidateSetReevaluationPerformedByThisGate === false &&
    i162.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i162.productionPolicyExecutionAuthorized === false &&
    i162.actualCompositionPerformedByThisGate === false &&
    i162.multiSourceCompositionAuthorized === false &&
    i162.authorityAcquiredByThisGate === false &&
    i162.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i162.thresholdRuleCreatedByThisGate === false &&
    i162.classificationAuthorized === false &&
    i162.numericScoringAuthorized === false &&
    i162.hiddenStemInteractionEligibilityGapRemains &&
    i162.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW'
  );
}

function tracks(): readonly I163RemediationDiscoveryTrack[] {
  const targetScopes: Record<I162ReviewableRemediationStrategyId, string> = {
    CONTINUED_ORIGIN_LINEAGE_RESOLUTION:
      'Only the three unresolved Wei/Wu/Mingdeng normative-origin rows; previously frozen derivative findings are not reopened.',
    NEW_PROVENANCE_EVIDENCE_ACQUISITION:
      'New visible-stem 克 normative evidence capable of explicit requirement ownership with stable identity, scope support, and derivative-relationship evidence.',
    EVIDENCE_REBINDING_TO_BETTER_PROVEN_WITNESS_OR_SOURCE:
      'A genuinely better-proven source or witness binding; same-work duplicate witnesses cannot be represented as new independent authority.',
    CANDIDATE_REPLACEMENT:
      'Prospective replacement candidates that re-demonstrate affected requirement ownership, scope, provenance, bridges, and contradictions.',
    CANDIDATE_REMOVAL_WITH_FULL_COVERAGE_REDEMONSTRATION:
      'Removal proposals only when a prospective surviving/replacement set can re-demonstrate all six I118 requirements without silent borrowing.',
  };

  return I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS.map((strategyId) => ({
    strategyId,
    discoveryState: 'AUTHORIZED_NOT_EXECUTED' as const,
    targetScope: targetScopes[strategyId],
    mustSatisfyI162RequirementIds: I162_REMEDIATION_REQUIREMENT_IDS,
    outputRequirementIds: I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
    discoveryMaySelectStrategy: false as const,
    discoveryMayMutateCandidateSet: false as const,
    discoveryMayEstablishIndependence: false as const,
    discoveryMayEstablishAdmissibility: false as const,
  }));
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_remediation_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI163ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReview(
  i162: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceCandidateSetRemediationRequirementsReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport {
  const accepted = exactI162Accepted(i162);
  const common = {
    reviewVersion:
      I163_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
    upstreamI162ReviewId: i162.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    currentCandidateSetVersion: 'v1-candidate-set' as const,
    currentInputPackageVersion: 'v2-input-package' as const,
    frozenI162RequirementIds: I162_REMEDIATION_REQUIREMENT_IDS,
    frozenI162RequirementCount: 15 as const,
    reviewableStrategyIds: I162_REVIEWABLE_REMEDIATION_STRATEGY_IDS,
    reviewableStrategyCount: 5 as const,
    discoveryOutputRequirementIds: I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
    discoveryOutputRequirementCount: 9 as const,
    explicitNegativeDerivativeFindingAloneMayEstablishIndependence: false as const,
    remediationCandidateDiscoveryExecutedByThisGate: false as const,
    remediationCandidateDiscoveredByThisGate: false as const,
    remediationStrategySelectedByThisGate: false as const,
    remediationExecutionAuthorizedByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    newPackageVersionCreatedByThisGate: false as const,
    candidateSetMutatedByThisGate: false as const,
    candidateRemovedByThisGate: false as const,
    candidateReplacedByThisGate: false as const,
    evidenceReboundByThisGate: false as const,
    newProvenanceEvidenceAcquiredByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    candidateSetReevaluationAuthorizedByThisGate: false as const,
    candidateSetReevaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false as const,
    I132PolicyRelaxationAuthorizedByThisGate: false as const,
    sourceCountVotingAllowed: false as const,
    provenanceTierWeightingAllowed: false as const,
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

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I162_REMEDIATION_REQUIREMENTS_INVALID',
      decision: 'REMEDIATION_CANDIDATE_DISCOVERY_NOT_READY',
      adoptionId: null,
      currentCandidateSetId: null,
      currentInputPackageId: null,
      exactI162BoundaryAccepted: false,
      currentV2ProvenanceDisposition: 'NOT_ASSESSED',
      discoveryTracks: [],
      discoveryTrackCount: 0,
      allTracksConclusionNeutral: false,
      continuedLineageTrackLimitedToUnresolvedOrigins: false,
      newProvenanceTrackRequiresIndependentAuthorityCandidateNotDuplicateWitness: false,
      rebindingTrackRejectsSameWorkWitnessAsNewAuthority: false,
      replacementTrackRequiresRequirementOwnershipAndScopeRedemonstration: false,
      removalTrackRequiresFullSixRequirementCoverageRedemonstration: false,
      explicitNegativeDerivativeFindingMayBeDiscoveryOutput: false,
      remediationCandidateDiscoveryAuthorizedByThisGate: false,
      currentV2PackageAndCandidateSetRemainImmutable: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_CANDIDATE_SET_REMEDIATION_REQUIREMENTS_REVIEW',
      notes: ['I163 fails closed unless the exact I162 remediation-requirements boundary remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    decision:
      'FIVE_REMEDIATION_DISCOVERY_TRACKS_READY_UNDER_FIFTEEN_FROZEN_REQUIREMENTS_NO_CANDIDATE_DISCOVERED_SELECTED_OR_EXECUTED',
    adoptionId: i162.adoptionId,
    currentCandidateSetId: i162.currentCandidateSetId,
    currentInputPackageId: i162.currentInputPackageId,
    exactI162BoundaryAccepted: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    discoveryTracks: tracks(),
    discoveryTrackCount: 5,
    allTracksConclusionNeutral: true,
    continuedLineageTrackLimitedToUnresolvedOrigins: true,
    newProvenanceTrackRequiresIndependentAuthorityCandidateNotDuplicateWitness: true,
    rebindingTrackRejectsSameWorkWitnessAsNewAuthority: true,
    replacementTrackRequiresRequirementOwnershipAndScopeRedemonstration: true,
    removalTrackRequiresFullSixRequirementCoverageRedemonstration: true,
    explicitNegativeDerivativeFindingMayBeDiscoveryOutput: true,
    remediationCandidateDiscoveryAuthorizedByThisGate: true,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: [
      'I163 authorizes bounded conclusion-neutral discovery across five remediation strategy classes; it does not select or execute any strategy.',
      'Every discovery result must bind exact targets, reproducible source identity, requirement/coverage effects, visible-stem scope, derivative evidence, bridge/contradiction impact, and prospective versioning impact.',
      'A same-work witness or downstream retransmission cannot be presented as a new independent authority candidate.',
      'A negative derivative finding may be recorded as discovery evidence but cannot by itself establish independent normative provenance.',
      'Current v2 remains immutable and blocked throughout remediation-candidate discovery.',
    ],
  });
}
