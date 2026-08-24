import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport } from './i107-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-candidate-discovery-evidence.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport } from './i116-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-positional-applicability-promotion-readiness-review.js';

export const I117_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-effective-interaction-eligibility-methodology-review-v1';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW'
    | 'I107_OR_I116_UNRESOLVED_OR_INVALID';
  decision:
    | 'VISIBLE_STEM_POSITIONAL_FORCE_SEMANTICS_AVAILABLE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_NOT_AUTHORIZED'
    | 'VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_REVIEW_NOT_ESTABLISHED';
  upstreamI107EvidenceId: string;
  upstreamI116ReviewId: string;
  candidateSourceId: string | null;
  sourceTerm: '克';
  sourceVisibleStemLocatorVerified: boolean;
  sourceVisibleStemAnchor: string | null;
  sourceExplicitlyDescribesVisibleStemKeRelation: boolean;
  sourceExplicitlyDistinguishesPositionalQualitativeForce: boolean;
  sourcePositionVocabulary: readonly ['邻干', '隔干', '远干'] | readonly [];
  sourceQualitativeForceVocabulary: readonly ['力大', '次之', '无力'] | readonly [];
  visibleStemPositionalSubstrateComplete: boolean;
  sourceEstablishesQualitativePositionalForceOrdering: boolean;
  sourceEstablishesBinaryInteractionThreshold: false;
  sourceExplicitlyDefinesWuLiAsNoInteraction: false;
  sourceExplicitlyDefinesWuLiAsZeroEffect: false;
  sourceExplicitlyDefinesLiDaAsActiveThreshold: false;
  sourceExplicitlyDefinesCiZhiAsActiveThreshold: false;
  sourceProvidesNumericThreshold: false;
  sourceProvidesBooleanEligibilityRule: false;
  binaryEligibilityMayBeInferredFromQualitativeOrdering: false;
  farStemNoForceMayBePromotedToNoInteraction: false;
  farStemNoForceMayBePromotedToZeroDamage: false;
  adjacentOrSeparatedForceLanguageMayBePromotedToEffectiveInteraction: false;
  qualitativeOrderingMayBeConvertedToNumericWeight: false;
  slotDistanceMayBeUsedAsNumericInteractionThreshold: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  visibleStemInteractionThresholdAuthorityGapConfirmed: boolean;
  visibleStemInteractionThresholdAuthorityGap:
    | 'SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED'
    | 'UPSTREAM_INVALID';
  additionalAuthorityRequiredForBinaryEligibilityThreshold: boolean;
  existingSourceMayStillSupportNonBinaryPositionalEvidence: boolean;
  positionalEvidenceMayRemainResearchEvidenceWithoutBinaryEligibility: boolean;
  damageEvaluationMayProceedWithoutBinaryEligibilityResolution: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  visibleStemThresholdReviewMayResolveHiddenStemEligibility: false;
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  effectiveInteractionSetResolved: false;
  damageOutcomeAuthorized: false;
  damageMagnitudeAuthorized: false;
  settlementOutcomeAuthorized: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  structuralRelationKindMutationAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW';
  notes: readonly string[];
}

const SOURCE_VISIBLE_STEM_ANCHOR = '两干相克；邻干力大，隔干次之，远干无力';

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_effective_interaction_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI107Accepted(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  const visible = i107.requirementEvidence.find(
    (item) => item.requirement === 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  );
  return (
    i107.status === 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' &&
    i107.decision ===
      'ONE_EXISTING_SOURCE_CANDIDATE_REINSPECTED_UNDER_I106_ALL_FOUR_KE_TOPICS_LOCATED_REQUIREMENTS_NOT_EVALUATED' &&
    i107.candidateSourceId !== null &&
    i107.candidateSourceReference !== null &&
    i107.candidateSourceReference.sourceId === i107.candidateSourceId &&
    i107.sourceBibliographyCrossVerified &&
    i107.exactBookEditionIdentityResolved &&
    i107.equivalentReproducibleLocatorResolved &&
    i107.originalSourceTextInspectedViaTranscription &&
    i107.sourceTextInspectedAtAllLocators &&
    i107.exactLocatorResolvedForAllFourRequirements &&
    i107.oneCandidateOnly &&
    i107.sameCandidateProvidesAllFourTopicLocators &&
    i107.requirementEvidenceCount === 4 &&
    i107.requirementEvidence.length === 4 &&
    i107.allFourRequirementTopicsRepresentedForLaterEvaluation &&
    visible !== undefined &&
    visible.sourceTextInspectedAtLocator &&
    visible.exactLocatorResolved &&
    visible.topicRepresentedForLaterEvaluation &&
    visible.anchor === '两干相克；邻干力大，隔干次之，远干无力' &&
    visible.countsAsRequirementSatisfied === false &&
    i107.priorI95CoverageBorrowed === false &&
    i107.i95CandidateAutoAcceptanceUsed === false &&
    i107.generalKnowledgeControlCycleUsedAsAuthority === false &&
    i107.fiveElementFactsImplicitlyUsedAsControlCycleAuthority === false &&
    i107.searchSnippetUsedAsAuthorityEvidence === false &&
    i107.modelGeneratedSynthesisUsedAsAuthorityEvidence === false &&
    i107.crossCandidateCompositionPerformed === false &&
    i107.crossCandidateCompositionAuthorized === false &&
    i107.directionEvidencePromotedToDamageOutcome === false &&
    i107.methodologyDefinitionCreatedByThisGate === false &&
    i107.ruleDefinitionCreatedByThisGate === false &&
    i107.registrySnapshotMutatedByThisGate === false &&
    i107.relativeForceVerdictAuthorized === false &&
    i107.clashSettlementAuthorized === false &&
    i107.crossRelationPrecedenceAuthorized === false &&
    i107.classificationAuthorized === false &&
    i107.numericScoringAuthorized === false &&
    i107.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE'
  );
}

function exactI116Accepted(
  i116: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport,
): boolean {
  return (
    i116.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS' &&
    i116.decision ===
      'VISIBLE_STEM_POSITIONAL_SUBSTRATE_COMPLETE_EFFECTIVE_INTERACTION_REQUIRES_SEPARATE_METHODOLOGY_REVIEW' &&
    i116.candidateSourceId !== null &&
    i116.visibleStemDirectionalBindingLayerResolved &&
    i116.visibleStemPositionalAdapterContractResolved &&
    i116.visibleStemCurrentChartPositionalEvidenceResolved &&
    i116.visibleStemPositionalSubstrateComplete &&
    i116.positionalEvidenceMayEnterEffectiveInteractionMethodologyReview &&
    i116.authorizedNextReviewScope ===
      'VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW' &&
    i116.visibleStemEffectiveInteractionEligibilityResolved === false &&
    i116.visibleStemEffectiveInteractionEligibilityMayBeInferredDirectlyFromPositionalEvidence === false &&
    i116.farStemNoForceMayBePromotedToNoInteraction === false &&
    i116.qualitativeForceMayBeConvertedToNumericWeight === false &&
    i116.slotDistanceMayBeConvertedToNumericForceWeight === false &&
    i116.positionalEvidenceMayResolveDamageOutcome === false &&
    i116.positionalEvidenceMayResolveDamageMagnitude === false &&
    i116.positionalEvidenceMayResolveSettlementOutcome === false &&
    i116.positionalEvidenceMayResolveRelativeForce === false &&
    i116.hiddenStemInteractionEligibilityGapRemains &&
    i116.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i116.visibleStemReviewMayBorrowHiddenStemAuthority === false &&
    i116.hiddenStemEvidenceMayBorrowVisibleStemPositionRule === false &&
    i116.effectiveInteractionSetResolved === false &&
    i116.i98KeDamageVocabularyEvaluationResolved === false &&
    i116.i98ResearchMethodologyMaterializationAuthorized === false &&
    i116.methodologyDefinitionCreatedByThisGate === false &&
    i116.ruleDefinitionCreatedByThisGate === false &&
    i116.registrySnapshotMutatedByThisGate === false &&
    i116.reviewAttestationCreatedByThisGate === false &&
    i116.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i116.structuralRelationKindMutationAuthorized === false &&
    i116.relativeForceVerdictAuthorized === false &&
    i116.clashSettlementAuthorized === false &&
    i116.crossRelationPrecedenceAuthorized === false &&
    i116.classificationAuthorized === false &&
    i116.numericScoringAuthorized === false &&
    i116.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW'
  );
}

function common(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
  i116: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport,
) {
  return {
    reviewVersion:
      I117_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION,
    upstreamI107EvidenceId: i107.evidenceId,
    upstreamI116ReviewId: i116.reviewId,
    sourceTerm: '克' as const,
    sourceEstablishesBinaryInteractionThreshold: false as const,
    sourceExplicitlyDefinesWuLiAsNoInteraction: false as const,
    sourceExplicitlyDefinesWuLiAsZeroEffect: false as const,
    sourceExplicitlyDefinesLiDaAsActiveThreshold: false as const,
    sourceExplicitlyDefinesCiZhiAsActiveThreshold: false as const,
    sourceProvidesNumericThreshold: false as const,
    sourceProvidesBooleanEligibilityRule: false as const,
    binaryEligibilityMayBeInferredFromQualitativeOrdering: false as const,
    farStemNoForceMayBePromotedToNoInteraction: false as const,
    farStemNoForceMayBePromotedToZeroDamage: false as const,
    adjacentOrSeparatedForceLanguageMayBePromotedToEffectiveInteraction: false as const,
    qualitativeOrderingMayBeConvertedToNumericWeight: false as const,
    slotDistanceMayBeUsedAsNumericInteractionThreshold: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    damageEvaluationMayProceedWithoutBinaryEligibilityResolution: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    visibleStemThresholdReviewMayResolveHiddenStemEligibility: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    effectiveInteractionSetResolved: false as const,
    damageOutcomeAuthorized: false as const,
    damageMagnitudeAuthorized: false as const,
    settlementOutcomeAuthorized: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    structuralRelationKindMutationAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI117ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReview(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
  i116: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemPositionalApplicabilityPromotionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport {
  const base = common(i107, i116);
  if (!exactI107Accepted(i107) || !exactI116Accepted(i116) || i107.candidateSourceId !== i116.candidateSourceId) {
    return finalized({
      ...base,
      status: 'I107_OR_I116_UNRESOLVED_OR_INVALID',
      decision: 'VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_REVIEW_NOT_ESTABLISHED',
      candidateSourceId: null,
      sourceVisibleStemLocatorVerified: false,
      sourceVisibleStemAnchor: null,
      sourceExplicitlyDescribesVisibleStemKeRelation: false,
      sourceExplicitlyDistinguishesPositionalQualitativeForce: false,
      sourcePositionVocabulary: [],
      sourceQualitativeForceVocabulary: [],
      visibleStemPositionalSubstrateComplete: false,
      sourceEstablishesQualitativePositionalForceOrdering: false,
      visibleStemInteractionThresholdAuthorityGapConfirmed: false,
      visibleStemInteractionThresholdAuthorityGap: 'UPSTREAM_INVALID',
      additionalAuthorityRequiredForBinaryEligibilityThreshold: false,
      existingSourceMayStillSupportNonBinaryPositionalEvidence: false,
      positionalEvidenceMayRemainResearchEvidenceWithoutBinaryEligibility: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
      notes: [
        'I117 requires exact I107 source evidence and exact I116 positional-substrate promotion readiness for the same source identity.',
      ],
    });
  }

  return finalized({
    ...base,
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    decision:
      'VISIBLE_STEM_POSITIONAL_FORCE_SEMANTICS_AVAILABLE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_NOT_AUTHORIZED',
    candidateSourceId: i107.candidateSourceId,
    sourceVisibleStemLocatorVerified: true,
    sourceVisibleStemAnchor: SOURCE_VISIBLE_STEM_ANCHOR,
    sourceExplicitlyDescribesVisibleStemKeRelation: true,
    sourceExplicitlyDistinguishesPositionalQualitativeForce: true,
    sourcePositionVocabulary: ['邻干', '隔干', '远干'],
    sourceQualitativeForceVocabulary: ['力大', '次之', '无力'],
    visibleStemPositionalSubstrateComplete: true,
    sourceEstablishesQualitativePositionalForceOrdering: true,
    visibleStemInteractionThresholdAuthorityGapConfirmed: true,
    visibleStemInteractionThresholdAuthorityGap:
      'SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED',
    additionalAuthorityRequiredForBinaryEligibilityThreshold: true,
    existingSourceMayStillSupportNonBinaryPositionalEvidence: true,
    positionalEvidenceMayRemainResearchEvidenceWithoutBinaryEligibility: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    notes: [
      'The source explicitly distinguishes visible-stem 克 by positional qualitative force, but does not define a boolean effective-interaction threshold.',
      '无力 is retained as qualitative source vocabulary and is not equivalent to no interaction, zero effect, or a settlement outcome.',
      '力大 and 次之 likewise do not establish an authorized active/inactive threshold or numeric interaction magnitude.',
      'I115 positional evidence remains valid research evidence even though binary effective-interaction eligibility is unresolved.',
      'A separate authority requirement is needed before any binary eligibility convention can be admitted.',
    ],
  });
}
