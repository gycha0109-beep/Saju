import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport } from './i107-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-candidate-discovery-evidence.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport } from './i112-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-binding-promotion-readiness-review.js';

export const I113_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-interaction-eligibility-methodology-review-v1';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW'
    | 'I107_OR_I112_UNRESOLVED_OR_INVALID';
  decision:
    | 'VISIBLE_STEM_POSITIONAL_METHODOLOGY_AVAILABLE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REMAINS'
    | 'SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_NOT_ESTABLISHED';
  upstreamI107EvidenceId: string;
  upstreamI112ReviewId: string;
  candidateSourceId: string | null;
  directionalBindingLayerResolved: boolean;
  i98KeDamageVocabularyStillBlocked: boolean;
  visibleStemSourceLocatorVerified: boolean;
  visibleStemSourceAnchor: string | null;
  visibleStemPositionalApplicabilityLanguageAvailable: boolean;
  visibleStemSourcePositionalVocabulary: readonly ['邻干', '隔干', '远干'] | readonly [];
  sourceContainsQualitativePositionalForceLanguage: boolean;
  repositoryPillarDistanceMappingResolved: false;
  sourcePositionVocabularyMayBeDirectlyMappedToNumericDistance: false;
  visibleStemInteractionEligibilityResolved: false;
  visibleStemPositionalApplicabilityAdapterContractReady: boolean;
  farStemNoForceMayBePromotedToNoInteraction: false;
  qualitativePositionForceMayBeConvertedToNumericWeight: false;
  qualitativePositionForceMayResolveGlobalRelativeForce: false;
  branchHiddenStemSourceLocatorVerified: boolean;
  branchHiddenStemFiveElementApplicabilityAuthorityAvailable: boolean;
  branchHiddenStemPositionalInteractionEligibilityAuthorityAvailable: false;
  visibleStemToHiddenStemEligibilityAuthorityAvailable: false;
  hiddenStemToVisibleStemEligibilityAuthorityAvailable: false;
  hiddenStemToHiddenStemEligibilityAuthorityAvailable: false;
  hiddenStemMembershipAloneMayEstablishInteractionEligibility: false;
  hiddenStemCurrentAuthorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  genericAllComponentInteractionEligibilityResolved: false;
  effectiveInteractionSetResolved: false;
  currentChartInteractionEligibilityMaterializationAuthorizedByThisGate: false;
  directionalBindingMayBePromotedToEffectiveInteraction: false;
  directionalBindingMayBePromotedToDamageOutcome: false;
  directionalBindingMayBePromotedToDamageMagnitude: false;
  currentChartPillarDistanceMayBeUsedBeforeAdapterContract: false;
  rawEarthlyBranchElementMayParticipate: false;
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
  i98ResearchMethodologyMaterializationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_ADAPTER_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_interaction_eligibility_methodology_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI112Accepted(
  i112: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport,
): boolean {
  return (
    i112.status === 'RESOLVED_SOURCE_KE_DIRECTIONAL_BINDING_PROMOTION_READINESS' &&
    i112.decision ===
      'KE_DIRECTIONAL_BINDING_LAYER_RESOLVED_I98_DAMAGE_VOCABULARY_PROMOTION_BLOCKED_BY_INTERACTION_ELIGIBILITY' &&
    i112.candidateSourceId !== null &&
    i112.currentChartComponentSubstrateResolved &&
    i112.directionalVocabularyBindingLayerResolved &&
    i112.zeroDirectionalBindingResultStillValidEvidenceLayerResult &&
    i112.zeroDirectionalBindingMayProveNoDamage === false &&
    i112.zeroDirectionalBindingMayProveNoEffectiveInteraction === false &&
    i112.exactFiveElementControlCycleAuthorityResolved &&
    i112.sourceLocalControlDirectionAuthorityResolved &&
    i112.sourceComponentIdentityBindingResolved &&
    i112.targetComponentIdentityBindingResolved &&
    i112.branchHiddenStemScopeBindingResolved &&
    i112.rawEarthlyBranchDirectControlBindingAuthorized === false &&
    i112.sourceKeDirectionalAuthorityAndBindingGapClosed &&
    i112.priorKeAuthorityBlockerResolved &&
    i112.i98SourceTerm === '克' &&
    i112.i98SemanticRole === 'DAMAGE' &&
    i112.directionalBindingAloneSatisfiesI98DamageVocabularyEvaluation === false &&
    i112.interactionEligibilityAuthorityEstablished === false &&
    i112.positionalInteractionApplicabilityAuthorityEstablished === false &&
    i112.effectiveInteractionSetResolved === false &&
    i112.i98KeDamageVocabularyEvaluationResolved === false &&
    i112.i98ExactDamageVocabularyEvaluationReady === false &&
    i112.i98AllSixVocabularyBindingsResolved === false &&
    i112.i98ResearchMethodologyMaterializationAuthorized === false &&
    i112.currentBlockingGap ===
      'SOURCE_KE_EFFECTIVE_INTERACTION_ELIGIBILITY_AND_POSITIONAL_APPLICABILITY_AUTHORITY_UNRESOLVED' &&
    i112.directionalBindingMayBePromotedToEffectiveInteraction === false &&
    i112.directionalBindingMayBePromotedToDamageOutcome === false &&
    i112.directionalBindingMayBePromotedToDamageMagnitude === false &&
    i112.directionalBindingMayBePromotedToSettlementOutcome === false &&
    i112.interactionEligibilityMayBeInferredFromElementPairAlone === false &&
    i112.interactionEligibilityMayBeInferredFromSameChartCoPresence === false &&
    i112.positionalApplicabilityMayBeInferredFromPillarDistanceAlone === false &&
    i112.hiddenStemMembershipMayBeTreatedAsActivatedInteraction === false &&
    i112.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i112.structuralRelationKindMutationAuthorized === false &&
    i112.relativeForceVerdictAuthorized === false &&
    i112.clashSettlementAuthorized === false &&
    i112.crossRelationPrecedenceAuthorized === false &&
    i112.classificationAuthorized === false &&
    i112.numericScoringAuthorized === false &&
    i112.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW'
  );
}

function exactI107Accepted(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  if (
    i107.status !== 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' ||
    i107.decision !==
      'ONE_EXISTING_SOURCE_CANDIDATE_REINSPECTED_UNDER_I106_ALL_FOUR_KE_TOPICS_LOCATED_REQUIREMENTS_NOT_EVALUATED' ||
    i107.candidateSourceId === null ||
    !i107.sourceBibliographyCrossVerified ||
    !i107.exactBookEditionIdentityResolved ||
    !i107.equivalentReproducibleLocatorResolved ||
    !i107.originalSourceTextInspectedViaTranscription ||
    !i107.sourceTextInspectedAtAllLocators ||
    !i107.exactLocatorResolvedForAllFourRequirements ||
    !i107.sameCandidateProvidesAllFourTopicLocators ||
    i107.requirementEvidenceCount !== 4 ||
    i107.requirementEvidence.length !== 4 ||
    i107.allFourRequirementsRemainNotEvaluated !== true ||
    i107.requirementEvaluationPerformedByThisGate !== false ||
    i107.candidateAcceptedForKeAuthority !== false ||
    i107.keAuthorityAcquiredByThisGate !== false ||
    i107.directionEvidencePromotedToDamageOutcome !== false ||
    i107.relativeForceVerdictAuthorized !== false ||
    i107.clashSettlementAuthorized !== false ||
    i107.classificationAuthorized !== false ||
    i107.numericScoringAuthorized !== false
  ) {
    return false;
  }

  const visible = i107.requirementEvidence.find(
    (item) => item.requirement === 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  );
  const hidden = i107.requirementEvidence.find(
    (item) => item.requirement === 'STEM_BRANCH_COMPONENT_APPLICABILITY',
  );

  return (
    visible !== undefined &&
    visible.sourceTextInspectedAtLocator &&
    visible.exactLocatorResolved &&
    visible.anchor.includes('两干相克') &&
    visible.anchor.includes('邻干力大') &&
    visible.anchor.includes('隔干次之') &&
    visible.anchor.includes('远干无力') &&
    hidden !== undefined &&
    hidden.sourceTextInspectedAtLocator &&
    hidden.exactLocatorResolved &&
    hidden.anchor.includes('地支藏干') &&
    hidden.anchor.includes('五行的生克关系')
  );
}

function commonMaterial(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
  i112: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport,
) {
  return {
    reviewVersion:
      I113_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW_VERSION,
    upstreamI107EvidenceId: i107.evidenceId,
    upstreamI112ReviewId: i112.reviewId,
    repositoryPillarDistanceMappingResolved: false as const,
    sourcePositionVocabularyMayBeDirectlyMappedToNumericDistance: false as const,
    visibleStemInteractionEligibilityResolved: false as const,
    farStemNoForceMayBePromotedToNoInteraction: false as const,
    qualitativePositionForceMayBeConvertedToNumericWeight: false as const,
    qualitativePositionForceMayResolveGlobalRelativeForce: false as const,
    branchHiddenStemPositionalInteractionEligibilityAuthorityAvailable: false as const,
    visibleStemToHiddenStemEligibilityAuthorityAvailable: false as const,
    hiddenStemToVisibleStemEligibilityAuthorityAvailable: false as const,
    hiddenStemToHiddenStemEligibilityAuthorityAvailable: false as const,
    hiddenStemMembershipAloneMayEstablishInteractionEligibility: false as const,
    genericAllComponentInteractionEligibilityResolved: false as const,
    effectiveInteractionSetResolved: false as const,
    currentChartInteractionEligibilityMaterializationAuthorizedByThisGate: false as const,
    directionalBindingMayBePromotedToEffectiveInteraction: false as const,
    directionalBindingMayBePromotedToDamageOutcome: false as const,
    directionalBindingMayBePromotedToDamageMagnitude: false as const,
    currentChartPillarDistanceMayBeUsedBeforeAdapterContract: false as const,
    rawEarthlyBranchElementMayParticipate: false as const,
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
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI113ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReview(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
  i112: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalBindingPromotionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport {
  const common = commonMaterial(i107, i112);

  if (!exactI107Accepted(i107) || !exactI112Accepted(i112) || i107.candidateSourceId !== i112.candidateSourceId) {
    return finalized({
      ...common,
      status: 'I107_OR_I112_UNRESOLVED_OR_INVALID',
      decision: 'SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_NOT_ESTABLISHED',
      candidateSourceId: null,
      directionalBindingLayerResolved: false,
      i98KeDamageVocabularyStillBlocked: true,
      visibleStemSourceLocatorVerified: false,
      visibleStemSourceAnchor: null,
      visibleStemPositionalApplicabilityLanguageAvailable: false,
      visibleStemSourcePositionalVocabulary: [],
      sourceContainsQualitativePositionalForceLanguage: false,
      visibleStemPositionalApplicabilityAdapterContractReady: false,
      branchHiddenStemSourceLocatorVerified: false,
      branchHiddenStemFiveElementApplicabilityAuthorityAvailable: false,
      hiddenStemCurrentAuthorityGap: 'UPSTREAM_INVALID',
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
      notes: [
        'I113 requires the exact I107 source locators and resolved I112 directional-binding frontier for the same normalized source identity.',
      ],
    });
  }

  const visible = i107.requirementEvidence.find(
    (item) => item.requirement === 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  );
  const hidden = i107.requirementEvidence.find(
    (item) => item.requirement === 'STEM_BRANCH_COMPONENT_APPLICABILITY',
  );
  if (visible === undefined || hidden === undefined) {
    throw new Error('I113 exact upstream validation lost required source locators');
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    decision:
      'VISIBLE_STEM_POSITIONAL_METHODOLOGY_AVAILABLE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REMAINS',
    candidateSourceId: i112.candidateSourceId,
    directionalBindingLayerResolved: true,
    i98KeDamageVocabularyStillBlocked: true,
    visibleStemSourceLocatorVerified: true,
    visibleStemSourceAnchor: visible.anchor,
    visibleStemPositionalApplicabilityLanguageAvailable: true,
    visibleStemSourcePositionalVocabulary: ['邻干', '隔干', '远干'],
    sourceContainsQualitativePositionalForceLanguage: true,
    visibleStemPositionalApplicabilityAdapterContractReady: true,
    branchHiddenStemSourceLocatorVerified: true,
    branchHiddenStemFiveElementApplicabilityAuthorityAvailable: true,
    hiddenStemCurrentAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_ADAPTER_CONTRACT',
    notes: [
      'The registered source explicitly gives visible-stem 克 positional language using neighboring, separated, and distant stems. This is enough to enter a research adapter-contract stage for visible-stem positional applicability, but not enough to materialize current-chart eligibility in I113.',
      'The source also states that earthly-branch hidden stems participate in five-element generating/overcoming relations, but the registered evidence does not establish a corresponding hidden-stem pair positional-eligibility rule.',
      'Therefore visible-stem/hidden-stem, hidden-stem/visible-stem, and hidden-stem/hidden-stem interaction eligibility remain authority gaps. Hidden-stem membership alone cannot activate a 克 interaction.',
      'The source qualitative phrases 邻干力大, 隔干次之, and 远干无力 remain source-language evidence. I113 does not map them to numeric pillar distances, numeric weights, global relative-force verdicts, or a no-interaction verdict.',
      'I98 DAMAGE evaluation remains blocked even for visible stems until a separate adapter contract maps source positional vocabulary into fail-closed repository applicability semantics and later evidence materializes that mapping.',
    ],
  });
}
