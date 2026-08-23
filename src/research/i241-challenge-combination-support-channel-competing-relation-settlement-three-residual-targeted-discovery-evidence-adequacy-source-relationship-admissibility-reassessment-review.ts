import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  type I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport,
} from './i240-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-evidence.js';
import { I238_RESIDUAL_REQUIREMENT_IDS } from './i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';

export const I241_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review-v1';

export const I241_REMAINING_ADMISSIBILITY_GAP_IDS = Object.freeze([
  'YUDING_SUIJINLU_CANONICAL_TEXT_IDENTITY_BINDING_GAP',
  'YUDING_SUIJINLU_CANONICAL_EXACT_PASSAGE_BINDING_GAP',
  'YUDING_SUIJINLU_WITNESS_DERIVATIVE_RELATIONSHIP_GAP',
  'YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_ADMISSIBILITY_GAP',
] as const);
export type I241RemainingAdmissibilityGapId = (typeof I241_REMAINING_ADMISSIBILITY_GAP_IDS)[number];

export interface I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW'
    | 'I240_TARGETED_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I240_EVIDENCE_ADEQUATE_FOR_THREE_RESIDUAL_DIRECT_COVERAGE_FOUR_SOURCE_ADMISSIBILITY_GAPS_REMAIN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_TARGETED_ACQUISITION_JUSTIFIED_NO_AUTHORITY_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_NOT_EXECUTED';
  upstreamI240EvidenceId: string;
  exactI240BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  i240EvidenceAdequateForResidualDirectCoverage: boolean;
  residualRequirementIds: readonly string[];
  residualDirectCoverageRequirementCount: 3 | 0;
  residualDirectCoverageGapCountAfterI240: 0;
  allThreeResidualClassesHaveDirectCandidateLocalWitness: boolean;
  yudingAllThreeResidualDirectCandidateCount: 2 | 0;
  separateZipingZhenquanRoleDirectWitnessPreserved: boolean;
  sameTextYudingWitnessesPreservedAsNonIndependentPendingAdjudication: boolean;
  sinaRepostMetadataAcceptedAsObservedOnly: boolean;
  embedded2011AttributionAcceptedAsCanonicalProof: false;
  canonicalIdentityEstablishedByI240: false;
  canonicalExactPassageBindingEstablishedByI240: false;
  derivativeRelationshipEstablishedByI240: false;
  normativeRuleBearingAdmissibilityEstablishedByI240: false;
  remainingAdmissibilityGapIds: readonly I241RemainingAdmissibilityGapId[];
  remainingAdmissibilityGapCount: 4 | 0;
  targetedCanonicalAndProvenanceAcquisitionMethodologicallyJustified: boolean;
  equivalentGeneralRuleDiscoveryRepeatJustified: false;
  alreadyDirectResidualRuleRediscoveryRequired: false;
  sourceRelationshipAndAdmissibilityAcquisitionAuthorized: boolean;
  acquisitionExecutedByThisGate: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI240Accepted(
  i240: I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport,
): boolean {
  return (
    i240.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE' &&
    i240.decision === 'FIVE_TARGETED_PATHS_EXECUTED_TWO_SAME_TEXT_YUDING_SUIJINLU_WITNESSES_DIRECTLY_COVER_ALL_THREE_RESIDUALS_ONE_ZIPING_ZHENQUAN_DIRECT_ROLE_MAPPING_WITNESS_OBSERVED_THREE_RESIDUAL_DIRECT_COVERAGE_CLASSES_MATERIALLY_IMPROVED_SOURCE_RELATIONSHIP_AND_ADMISSIBILITY_NOT_ADJUDICATED_NO_UNION_NO_PROMOTION' &&
    i240.exactI239BoundaryAccepted &&
    i240.discoveryExecuted &&
    i240.executedDiscoveryPathCount === 5 &&
    i240.candidateRecordCount === 3 &&
    i240.directlyOpenedHtmlCandidateCount === 3 &&
    i240.leadOnlyCandidateCount === 0 &&
    i240.allThreeResidualDirectCandidateCount === 2 &&
    i240.materiallyNewDirectResidualCoverageRequirementCount === 3 &&
    i240.materiallyNewDirectResidualCoverageRequirementIds.length === I238_RESIDUAL_REQUIREMENT_IDS.length &&
    i240.materiallyNewDirectResidualCoverageRequirementIds.every((id, index) => id === I238_RESIDUAL_REQUIREMENT_IDS[index]) &&
    i240.currentVsCompetingRoleScopeDirectCoverageObserved &&
    i240.precedenceVsRelationOutcomeSeparationDirectCoverageObserved &&
    i240.tieConflictOrUnresolvedFailClosedDispositionDirectCoverageObserved &&
    i240.yudingSuijinluRoleSelectionRuleObserved &&
    i240.yudingSuijinluPrecedenceVsOutcomeRuleObserved &&
    i240.yudingSuijinluExplicitConflictDispositionObserved &&
    i240.zipingZhenquanOriginalRoleSelectionRuleObserved &&
    i240.sameTextYudingWitnessCount === 2 &&
    i240.sameTextWitnessesMayCountAsIndependentAuthorities === false &&
    i240.sina2012RepostDateDirectlyObserved &&
    i240.sinaEmbeddedOriginal2011TimestampObserved &&
    i240.sinaEmbeddedOriginalAuthorAttributionObserved &&
    i240.embeddedUpstreamAttributionVerifiedByThisGate === false &&
    i240.sourceRelationshipAdjudicatedByThisGate === false &&
    i240.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i240.candidateSetUnionCoveragePerformed === false &&
    i240.crossSourceCompletionPerformed === false &&
    i240.existingI235FiveDirectRequirementClassesReopened === false &&
    i240.existingPartialCoverageAutoUpgradedWithoutNewPassage === false &&
    i240.searchSnippetUsedAsDirectEvidence === false &&
    i240.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i240.authorityGapClosed === false &&
    i240.authorityPromotedByThisGate === false &&
    i240.competingRelationSettlementResolved === false &&
    i240.hiddenStemI232HoldPreserved &&
    i240.hiddenStemTrackReopenedByThisGate === false &&
    i240.quWei2001HoldPreserved &&
    i240.li1998SameTargetPathSuspendedNotRetired &&
    i240.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i240.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i240.currentV2PackageAndCandidateSetRemainImmutable &&
    i240.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i240.evidenceRebindingAuthorizedByThisGate === false &&
    i240.provenanceIndependenceAdjudicatedByThisGate === false &&
    i240.derivativeRelationshipAdjudicatedByThisGate === false &&
    i240.actualCompositionPerformedByThisGate === false &&
    i240.multiSourceCompositionAuthorized === false &&
    i240.thresholdRuleCreatedByThisGate === false &&
    i240.damageEvaluationAuthorized === false &&
    i240.classificationAuthorized === false &&
    i240.numericScoringAuthorized === false &&
    i240.productionPolicyExecutionAuthorized === false &&
    i240.negativeFindingCreatedByThisGate === false &&
    i240.discoveryExhaustionClaimed === false &&
    i240.corpusExhaustionClaimed === false &&
    i240.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport, 'reviewId'>,
): I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport {
  return {
    reviewId: `i241_competing_relation_source_admissibility_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(
  i240: I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport,
): I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport {
  const accepted = exactI240Accepted(i240);
  return finalized({
    reviewVersion: I241_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW_VERSION,
    status: accepted ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW' : 'I240_TARGETED_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted ? 'I240_EVIDENCE_ADEQUATE_FOR_THREE_RESIDUAL_DIRECT_COVERAGE_FOUR_SOURCE_ADMISSIBILITY_GAPS_REMAIN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_TARGETED_ACQUISITION_JUSTIFIED_NO_AUTHORITY_PROMOTION' : 'COMPETING_RELATION_SETTLEMENT_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_NOT_EXECUTED',
    upstreamI240EvidenceId: i240.evidenceId,
    exactI240BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    i240EvidenceAdequateForResidualDirectCoverage: accepted,
    residualRequirementIds: accepted ? I238_RESIDUAL_REQUIREMENT_IDS : Object.freeze([]),
    residualDirectCoverageRequirementCount: accepted ? 3 : 0,
    residualDirectCoverageGapCountAfterI240: 0,
    allThreeResidualClassesHaveDirectCandidateLocalWitness: accepted,
    yudingAllThreeResidualDirectCandidateCount: accepted ? 2 : 0,
    separateZipingZhenquanRoleDirectWitnessPreserved: accepted,
    sameTextYudingWitnessesPreservedAsNonIndependentPendingAdjudication: accepted,
    sinaRepostMetadataAcceptedAsObservedOnly: accepted,
    embedded2011AttributionAcceptedAsCanonicalProof: false,
    canonicalIdentityEstablishedByI240: false,
    canonicalExactPassageBindingEstablishedByI240: false,
    derivativeRelationshipEstablishedByI240: false,
    normativeRuleBearingAdmissibilityEstablishedByI240: false,
    remainingAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    remainingAdmissibilityGapCount: accepted ? 4 : 0,
    targetedCanonicalAndProvenanceAcquisitionMethodologicallyJustified: accepted,
    equivalentGeneralRuleDiscoveryRepeatJustified: false,
    alreadyDirectResidualRuleRediscoveryRequired: false,
    sourceRelationshipAndAdmissibilityAcquisitionAuthorized: accepted,
    acquisitionExecutedByThisGate: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    recommendedNextGate: accepted ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW' : 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I240 is adequate to retire the three residual direct-coverage deficits as coverage deficits only; authority remains unresolved.',
          'The two all-three-residual 御定子平/口授碎金炉 witnesses remain the same text family pending exact derivative/provenance adjudication and cannot be counted as independent authorities.',
          'The 2012 repost metadata and embedded 2011 timestamp/尚慈居士 attribution are observations, not canonical identity or original-source proof.',
          'Further progress must target canonical text identity, exact canonical passage binding, witness derivative relationship, and normative rule-bearing admissibility rather than repeat general rule discovery.',
        ])
      : Object.freeze(['I241 fails closed unless the exact I240 targeted-discovery evidence boundary is preserved.']),
  });
}
