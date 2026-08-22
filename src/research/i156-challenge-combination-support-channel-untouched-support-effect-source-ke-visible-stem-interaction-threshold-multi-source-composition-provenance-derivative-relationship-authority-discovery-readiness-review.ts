import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport,
} from './i155-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-adjudication-readiness-review.js';

export const I156_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-derivative-relationship-authority-discovery-readiness-review-v1';

export const I156_DISCOVERY_REQUIREMENT_IDS = Object.freeze([
  'EXACT_EVIDENCE_AND_PROVENANCE_IDENTITY_BINDING',
  'SOURCE_CHRONOLOGY_CHECK',
  'ATTRIBUTION_AND_RETRANSMISSION_CHECK',
  'SAME_WORK_EDITION_WITNESS_NORMALIZATION_CHECK',
  'DIRECT_SOURCE_LINEAGE_EVIDENCE_CHECK',
  'TRI_STATE_RELATIONSHIP_FINDING_REQUIRED',
  'NEGATIVE_RELATIONSHIP_FINDING_REQUIRES_EXPLICIT_SEARCH_BASIS',
  'NO_SOURCE_COUNT_OR_PROVENANCE_TIER_WEIGHTING',
] as const);

export type I156DiscoveryRequirementId = (typeof I156_DISCOVERY_REQUIREMENT_IDS)[number];

export interface I156DerivativeRelationshipDiscoveryTargetRecord {
  evidenceId: string;
  provenanceIdentity: string;
  registeredDependencyLinks: readonly string[];
  discoveryState: 'TARGETED_DISCOVERY_NOT_EXECUTED';
  requiredDiscoveryRequirementIds: readonly I156DiscoveryRequirementId[];
  relationshipFindingState: 'NOT_RESEARCHED';
  independenceFindingState: 'NOT_AUTHORIZED';
  positiveRelationshipFindingWouldMeanDerivativeDependency: true;
  negativeRelationshipFindingRequiresExplicitEvidence: true;
  unresolvedRelationshipMustRemainUnresolved: true;
  absenceOfKnownDependencySufficientForNegativeFinding: false;
  sourceCountMayResolveRelationship: false;
  provenanceTierMayResolveRelationship: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'I155_PROVENANCE_DISCOVERY_READINESS_INVALID';
  decision:
    | 'SIX_PROVENANCE_INPUTS_READY_FOR_TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NO_INDEPENDENCE_FINDING_NO_PACKAGE_MUTATION'
    | 'TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NOT_READY';
  upstreamI155ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v2-input-package';
  inputPackageId: string | null;
  exactI155ReadinessAccepted: boolean;
  discoveryRequirementIds: readonly I156DiscoveryRequirementId[];
  discoveryRequirementCount: 8;
  discoveryTargetRecords: readonly I156DerivativeRelationshipDiscoveryTargetRecord[];
  discoveryTargetCount: 6 | 0;
  knownRegisteredDependencyLinkCount: number;
  targetsWithKnownRegisteredDependencyLinks: number;
  allTargetsBoundToExactEvidenceAndProvenanceIdentity: boolean;
  allTargetsRemainConclusionNeutralBeforeDiscovery: boolean;
  sourceChronologyCheckRequired: true;
  attributionAndRetransmissionCheckRequired: true;
  sameWorkEditionWitnessNormalizationRequired: true;
  directSourceLineageEvidenceCheckRequired: true;
  triStateRelationshipFindingRequired: true;
  allowedRelationshipFindingStates: readonly ['DERIVATIVE_DEPENDENCY_FOUND', 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS', 'UNRESOLVED_AFTER_TARGETED_DISCOVERY'];
  negativeRelationshipFindingRequiresExplicitSearchBasis: true;
  absenceOfKnownDependencyMayBecomeNegativeFinding: false;
  emptyRegisteredDependencyLinksMayBecomeIndependenceFinding: false;
  uniqueProvenanceIdentityMayBecomeIndependenceFinding: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  discoveryExecutedByThisGate: false;
  derivativeRelationshipFindingMadeByThisGate: false;
  provenanceIndependenceFindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  inputPackageMutatedByThisGate: false;
  newPackageVersionCreatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW';
  notes: readonly string[];
}

const ALLOWED_RELATIONSHIP_FINDING_STATES = Object.freeze([
  'DERIVATIVE_DEPENDENCY_FOUND',
  'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
  'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
] as const);

function exactI155Accepted(
  i155: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport,
): boolean {
  const exactI155Requirements =
    i155.provenanceAdjudicationRequirementIds.length === I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS.length &&
    i155.provenanceAdjudicationRequirementIds.every(
      (requirementId, index) => requirementId === I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS[index],
    );
  const evidenceIds = i155.provenanceInputReadinessRecords.map((record) => record.evidenceId);
  const computedDependencyLinkCount = i155.provenanceInputReadinessRecords.reduce(
    (sum, record) => sum + record.dependencyLinks.length,
    0,
  );
  const computedTargetsWithLinks = i155.provenanceInputReadinessRecords.filter(
    (record) => record.dependencyLinks.length > 0,
  ).length;

  return (
    i155.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW' &&
    i155.decision ===
      'PROVENANCE_INDEPENDENCE_ADJUDICATION_NOT_READY_EXPLICIT_DERIVATIVE_RELATIONSHIP_EVIDENCE_REQUIRED_TARGETED_DISCOVERY_MAY_PROCEED' &&
    i155.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i155.policyVersion === 'v1-definition' &&
    i155.adoptionVersion === 'v1-adoption' &&
    i155.adoptionId !== null &&
    i155.candidateSetVersion === 'v1-candidate-set' &&
    i155.candidateSetId !== null &&
    i155.inputPackageVersion === 'v2-input-package' &&
    i155.inputPackageId !== null &&
    i155.exactI154ProvenanceFailureAccepted &&
    i155.exactI151ProvenanceSubstrateAccepted &&
    i155.evaluationAndPackageIdentityMatch &&
    exactI155Requirements &&
    i155.provenanceAdjudicationRequirementCount === 7 &&
    i155.provenanceInputCount === 6 &&
    i155.unresolvedProvenanceInputCount === 6 &&
    i155.provenanceInputReadinessRecords.length === 6 &&
    new Set(evidenceIds).size === 6 &&
    i155.provenanceInputReadinessRecords.every(
      (record) =>
        record.evidenceId.length > 0 &&
        record.provenanceIdentity.length > 0 &&
        record.registeredState === 'UNRESOLVED' &&
        record.numericWeight === null &&
        record.evidenceBindingPresent &&
        record.structurallyReadyForTargetedDerivativeRelationshipResearch &&
        record.independenceEstablishedByCurrentPackage === false &&
        record.zeroDependencyLinksWouldEstablishIndependence === false,
    ) &&
    i155.registeredDependencyLinkCount === computedDependencyLinkCount &&
    i155.inputsWithRegisteredDependencyLinks === computedTargetsWithLinks &&
    i155.allProvenanceInputsBindRegisteredEvidence &&
    i155.allProvenanceInputsRemainUnresolved &&
    i155.allNumericWeightsRemainNull &&
    i155.explicitDerivativeRelationshipCheckRequired &&
    i155.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i155.sourceClassAloneSufficient === false &&
    i155.provenanceTierMayBecomeNumericWeight === false &&
    i155.sourceCountMayBecomeNumericWeight === false &&
    i155.defaultWhenIndependenceUnresolved === 'REJECT_INDEPENDENCE_CLAIM' &&
    i155.zeroRegisteredDependencyLinksDoesNotEstablishIndependence &&
    i155.uniqueSourceIdentityDoesNotEstablishIndependence &&
    i155.sameWorkAlternateWitnessDoesNotIncreaseIndependentAuthority &&
    i155.currentV2PackageContainsCompletedDerivativeRelationshipAdjudication === false &&
    i155.currentV2PackageContainsSufficientIndependenceFindingForAllSixInputs === false &&
    i155.provenanceIndependenceAdjudicationReadyFromCurrentPackageAlone === false &&
    i155.targetedDerivativeRelationshipAuthorityDiscoveryReady &&
    i155.targetedDiscoveryMustBindEachFindingToEvidenceIdAndProvenanceIdentity &&
    i155.targetedDiscoveryMustRecordPositiveNegativeOrUnresolvedRelationshipFinding &&
    i155.targetedDiscoveryMayNotUseSourceCountAsVote &&
    i155.targetedDiscoveryMayNotUseProvenanceTierAsWeight &&
    i155.targetedDiscoveryMayNotPromoteAbsenceOfKnownDependencyToIndependence &&
    i155.consumedI153AuthorizationReusable === false &&
    i155.newPackageVersionRequiredBeforeAnyLaterReevaluation &&
    i155.newEvaluationAuthorizationRequiredAfterAnyLaterPackageRegistration &&
    i155.inputPackageMutatedByThisGate === false &&
    i155.provenanceIndependenceAdjudicatedByThisGate === false &&
    i155.candidateSetReevaluationAuthorizedByThisGate === false &&
    i155.candidateSetReevaluationPerformedByThisGate === false &&
    i155.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i155.productionPolicyExecutionAuthorized === false &&
    i155.actualCompositionPerformedByThisGate === false &&
    i155.multiSourceCompositionAuthorized === false &&
    i155.authorityAcquiredByThisGate === false &&
    i155.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i155.thresholdRuleCreatedByThisGate === false &&
    i155.classificationAuthorized === false &&
    i155.numericScoringAuthorized === false &&
    i155.hiddenStemInteractionEligibilityGapRemains &&
    i155.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_derivative_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
  i155: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport {
  const accepted = exactI155Accepted(i155);
  const common = {
    reviewVersion:
      I156_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    upstreamI155ReviewId: i155.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v2-input-package' as const,
    discoveryRequirementIds: I156_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 8 as const,
    sourceChronologyCheckRequired: true as const,
    attributionAndRetransmissionCheckRequired: true as const,
    sameWorkEditionWitnessNormalizationRequired: true as const,
    directSourceLineageEvidenceCheckRequired: true as const,
    triStateRelationshipFindingRequired: true as const,
    allowedRelationshipFindingStates: ALLOWED_RELATIONSHIP_FINDING_STATES,
    negativeRelationshipFindingRequiresExplicitSearchBasis: true as const,
    absenceOfKnownDependencyMayBecomeNegativeFinding: false as const,
    emptyRegisteredDependencyLinksMayBecomeIndependenceFinding: false as const,
    uniqueProvenanceIdentityMayBecomeIndependenceFinding: false as const,
    sourceCountVotingAllowed: false as const,
    provenanceTierWeightingAllowed: false as const,
    discoveryExecutedByThisGate: false as const,
    derivativeRelationshipFindingMadeByThisGate: false as const,
    provenanceIndependenceFindingAuthorizedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    newPackageVersionCreatedByThisGate: false as const,
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

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I155_PROVENANCE_DISCOVERY_READINESS_INVALID',
      decision: 'TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NOT_READY',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI155ReadinessAccepted: false,
      discoveryTargetRecords: [],
      discoveryTargetCount: 0,
      knownRegisteredDependencyLinkCount: 0,
      targetsWithKnownRegisteredDependencyLinks: 0,
      allTargetsBoundToExactEvidenceAndProvenanceIdentity: false,
      allTargetsRemainConclusionNeutralBeforeDiscovery: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW',
      notes: ['I156 fails closed unless the exact I155 targeted-discovery readiness boundary remains intact.'],
    });
  }

  const targets = Object.freeze(
    i155.provenanceInputReadinessRecords.map((record) =>
      Object.freeze({
        evidenceId: record.evidenceId,
        provenanceIdentity: record.provenanceIdentity,
        registeredDependencyLinks: Object.freeze([...record.dependencyLinks]),
        discoveryState: 'TARGETED_DISCOVERY_NOT_EXECUTED' as const,
        requiredDiscoveryRequirementIds: I156_DISCOVERY_REQUIREMENT_IDS,
        relationshipFindingState: 'NOT_RESEARCHED' as const,
        independenceFindingState: 'NOT_AUTHORIZED' as const,
        positiveRelationshipFindingWouldMeanDerivativeDependency: true as const,
        negativeRelationshipFindingRequiresExplicitEvidence: true as const,
        unresolvedRelationshipMustRemainUnresolved: true as const,
        absenceOfKnownDependencySufficientForNegativeFinding: false as const,
        sourceCountMayResolveRelationship: false as const,
        provenanceTierMayResolveRelationship: false as const,
      }),
    ),
  );

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    decision:
      'SIX_PROVENANCE_INPUTS_READY_FOR_TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NO_INDEPENDENCE_FINDING_NO_PACKAGE_MUTATION',
    adoptionId: i155.adoptionId,
    candidateSetId: i155.candidateSetId,
    inputPackageId: i155.inputPackageId,
    exactI155ReadinessAccepted: true,
    discoveryTargetRecords: targets,
    discoveryTargetCount: 6,
    knownRegisteredDependencyLinkCount: i155.registeredDependencyLinkCount,
    targetsWithKnownRegisteredDependencyLinks: i155.inputsWithRegisteredDependencyLinks,
    allTargetsBoundToExactEvidenceAndProvenanceIdentity: true,
    allTargetsRemainConclusionNeutralBeforeDiscovery: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: [
      'I156 defines only a conclusion-neutral derivative-relationship discovery plan for the six registered provenance inputs.',
      'A negative derivative-relationship finding requires an explicit search basis; an empty dependency-link array is not negative evidence and never establishes independence by itself.',
      'Discovery findings must remain tri-state and auditable. Provenance independence adjudication requires a later separate governed gate.',
    ],
  });
}
