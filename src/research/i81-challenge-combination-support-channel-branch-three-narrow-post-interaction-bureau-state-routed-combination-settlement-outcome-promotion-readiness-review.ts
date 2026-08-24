import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
  I80BranchThreeNarrowSettlementEvidenceItem,
} from './i80-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-evidence.js';

export const I81_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_BUREAU_STATE_ROUTED_COMBINATION_SETTLEMENT_OUTCOME_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-branch-three-narrow-post-interaction-bureau-state-routed-combination-settlement-outcome-promotion-readiness-review-v1';

export type I81NarrowBureauStateOutcomePromotionReadiness =
  | 'NOT_APPLICABLE'
  | 'EVIDENCE_ALIGNMENT_UNRESOLVED'
  | 'CONTEXTUAL_BUREAU_STATE_UNRESOLVED'
  | 'NARROW_BUREAU_STATE_VERIFIED_BINDING_INTERACTION_OUTCOME_STILL_BLOCKED';

export type I81RoutedCombinationSettlementDependency =
  | 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
  | 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
  | 'not_applicable';

export interface I81NarrowBureauStateOutcomePromotionReadinessItem {
  mechanism: string;
  role: I80BranchThreeNarrowSettlementEvidenceItem['role'];
  relationId: string;
  relationKind: I80BranchThreeNarrowSettlementEvidenceItem['relationKind'];
  i80EvidenceState: I80BranchThreeNarrowSettlementEvidenceItem['evidenceState'];
  narrowPostInteractionBureauState: I80BranchThreeNarrowSettlementEvidenceItem['narrowPostInteractionBureauState'];
  routedCombinationSettlementDependency: I81RoutedCombinationSettlementDependency;
  promotionReadiness: I81NarrowBureauStateOutcomePromotionReadiness;
  narrowBureauStateVerified: boolean;
  routedCombinationSettlementOutcomeResolved: false;
  bindingVerdict: 'not_determined';
  transformationVerdict: 'not_determined';
  interactionOutcome: 'not_determined';
  neutralizationVerdict: 'not_determined';
  noEffectVerdict: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  precedenceWithinMultiTouch: 'not_determined';
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status: 'RESOLVED_NARROW_BUREAU_STATE_OUTCOME_PROMOTION_READINESS' | 'I80_UNRESOLVED_OR_INVALID';
  decision: 'NARROW_BUREAU_POST_INTERACTION_STATE_MAY_BE_VERIFIED_ROUTED_COMBINATION_BINDING_INTERACTION_OUTCOME_PROMOTION_BLOCKED';
  upstreamI80ReportId: string;
  items: readonly I81NarrowBureauStateOutcomePromotionReadinessItem[];
  anyNarrowBureauStateVerified: boolean;
  anyRoutedCombinationSettlementOutcomePromotionReady: false;
  currentCombinationBindingInteractionOutcomePromotionAuthorized: false;
  competingCombinationBindingInteractionOutcomePromotionAuthorized: false;
  narrowBureauStateMayResolveBindingVerdict: false;
  narrowBureauStateMayResolveTransformationVerdict: false;
  narrowBureauStateMayResolveGenericInteractionOutcome: false;
  narrowBureauStateMayResolveNeutralizationVerdict: false;
  narrowBureauStateMayResolveNoEffectVerdict: false;
  narrowBureauStateMayResolveSupportSourceDestroyed: false;
  currentAndCompetingRolesRemainDistinctOutcomeDomains: true;
  genericCombinationSettlementResolverAuthorized: false;
  directBindingOutcomeAuthorized: false;
  transformationOutcomeAuthorized: false;
  neutralizationOutcomeAuthorized: false;
  noEffectOutcomeAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  pairOrderSignificanceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate: 'CHALLENGE_CONTEXT_AVAILABILITY_V24_NARROW_BRANCH_THREE_SETTLEMENT_REFINEMENT';
  notes: readonly string[];
}

function finalized(
  material: Omit<
    ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport,
    'reviewId'
  >,
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_branch_three_narrow_outcome_promotion_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i80Accepted(
  i80: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
): boolean {
  return (
    i80.status === 'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE' &&
    i80.narrowPostInteractionSettlementEvidenceAvailable &&
    i80.i48ContextualAmbiguityPreserved &&
    i80.narrowBreakStateIsBureauLevelOnly &&
    i80.narrowBreakStateMayBePromotedToBindingOutcome === false &&
    i80.narrowBreakStateMayBePromotedToTransformationOutcome === false &&
    i80.narrowBreakStateMayBePromotedToGenericInteractionOutcome === false &&
    i80.narrowBreakStateMayBePromotedToNeutralizationOutcome === false &&
    i80.narrowBreakStateMayBePromotedToSupportSourceDestroyed === false &&
    i80.absenceOfNarrowBreakMeansIntactAuthorized === false &&
    i80.absenceOfNarrowBreakMeansDamagedAuthorized === false &&
    i80.genericCombinationSettlementResolverAuthorized === false &&
    i80.directBindingOutcomeAuthorized === false &&
    i80.transformationOutcomeAuthorized === false &&
    i80.neutralizationOutcomeAuthorized === false &&
    i80.noEffectOutcomeAuthorized === false &&
    i80.postCombinationSubjectIdentityPolicyResolved === false &&
    i80.pairOrderSignificanceAuthorized === false &&
    i80.multiTouchAggregationAuthorized === false &&
    i80.crossRelationPrecedenceAuthorized === false &&
    i80.supportChannelActivationVerdictAuthorized === false &&
    i80.supportChannelPersistenceVerdictAuthorized === false &&
    i80.supportChannelDestructionVerdictAuthorized === false &&
    i80.supportChannelNetEffectVerdictAuthorized === false &&
    i80.targetPostRelationRootState === 'not_determined' &&
    i80.effectiveMechanismForceVerdict === 'not_determined' &&
    i80.classificationAuthorized === false &&
    i80.numericScoringAuthorized === false &&
    i80.items.every(
      (item) =>
        item.bindingVerdict === 'not_determined' &&
        item.transformationVerdict === 'not_determined' &&
        item.interactionOutcome === 'not_determined' &&
        item.neutralizationVerdict === 'not_determined' &&
        item.postCombinationSubjectIdentity === 'not_determined' &&
        item.precedenceWithinMultiTouch === 'not_determined' &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelDestroyed === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.targetPostRelationRootState === 'not_determined' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.numericScore === 'not_assigned',
    )
  );
}

function routedDependency(
  item: I80BranchThreeNarrowSettlementEvidenceItem,
): I81RoutedCombinationSettlementDependency {
  if (item.evidenceState === 'NOT_APPLICABLE') return 'not_applicable';
  return item.role === 'CURRENT_COMBINATION'
    ? 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    : 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT';
}

function promotionReadiness(
  item: I80BranchThreeNarrowSettlementEvidenceItem,
): I81NarrowBureauStateOutcomePromotionReadiness {
  if (item.evidenceState === 'NOT_APPLICABLE') return 'NOT_APPLICABLE';
  if (
    item.evidenceState === 'I47_EXACT_BUREAU_MATCH_NOT_FOUND' ||
    item.evidenceState === 'I47_EXACT_BUREAU_MATCH_AMBIGUOUS'
  ) {
    return 'EVIDENCE_ALIGNMENT_UNRESOLVED';
  }
  if (item.evidenceState === 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK') {
    return 'CONTEXTUAL_BUREAU_STATE_UNRESOLVED';
  }
  return 'NARROW_BUREAU_STATE_VERIFIED_BINDING_INTERACTION_OUTCOME_STILL_BLOCKED';
}

function reviewItem(
  item: I80BranchThreeNarrowSettlementEvidenceItem,
): I81NarrowBureauStateOutcomePromotionReadinessItem {
  const readiness = promotionReadiness(item);
  return {
    mechanism: item.mechanism,
    role: item.role,
    relationId: item.relationId,
    relationKind: item.relationKind,
    i80EvidenceState: item.evidenceState,
    narrowPostInteractionBureauState: item.narrowPostInteractionBureauState,
    routedCombinationSettlementDependency: routedDependency(item),
    promotionReadiness: readiness,
    narrowBureauStateVerified:
      readiness === 'NARROW_BUREAU_STATE_VERIFIED_BINDING_INTERACTION_OUTCOME_STILL_BLOCKED',
    routedCombinationSettlementOutcomeResolved: false,
    bindingVerdict: 'not_determined',
    transformationVerdict: 'not_determined',
    interactionOutcome: 'not_determined',
    neutralizationVerdict: 'not_determined',
    noEffectVerdict: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    precedenceWithinMultiTouch: 'not_determined',
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelDestroyed: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(
  i80: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport {
  if (!i80Accepted(i80)) {
    return finalized({
      reviewVersion:
        I81_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_BUREAU_STATE_ROUTED_COMBINATION_SETTLEMENT_OUTCOME_PROMOTION_READINESS_REVIEW_VERSION,
      status: 'I80_UNRESOLVED_OR_INVALID',
      decision:
        'NARROW_BUREAU_POST_INTERACTION_STATE_MAY_BE_VERIFIED_ROUTED_COMBINATION_BINDING_INTERACTION_OUTCOME_PROMOTION_BLOCKED',
      upstreamI80ReportId: i80.reportId,
      items: [],
      anyNarrowBureauStateVerified: false,
      anyRoutedCombinationSettlementOutcomePromotionReady: false,
      currentCombinationBindingInteractionOutcomePromotionAuthorized: false,
      competingCombinationBindingInteractionOutcomePromotionAuthorized: false,
      narrowBureauStateMayResolveBindingVerdict: false,
      narrowBureauStateMayResolveTransformationVerdict: false,
      narrowBureauStateMayResolveGenericInteractionOutcome: false,
      narrowBureauStateMayResolveNeutralizationVerdict: false,
      narrowBureauStateMayResolveNoEffectVerdict: false,
      narrowBureauStateMayResolveSupportSourceDestroyed: false,
      currentAndCompetingRolesRemainDistinctOutcomeDomains: true,
      genericCombinationSettlementResolverAuthorized: false,
      directBindingOutcomeAuthorized: false,
      transformationOutcomeAuthorized: false,
      neutralizationOutcomeAuthorized: false,
      noEffectOutcomeAuthorized: false,
      postCombinationSubjectIdentityPolicyResolved: false,
      pairOrderSignificanceAuthorized: false,
      multiTouchAggregationAuthorized: false,
      crossRelationPrecedenceAuthorized: false,
      supportChannelActivationVerdictAuthorized: false,
      supportChannelPersistenceVerdictAuthorized: false,
      supportChannelDestructionVerdictAuthorized: false,
      supportChannelNetEffectVerdictAuthorized: false,
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      recommendedNextGate: 'CHALLENGE_CONTEXT_AVAILABILITY_V24_NARROW_BRANCH_THREE_SETTLEMENT_REFINEMENT',
      notes: [
        'Resolved fail-closed I80 narrow branch-three settlement evidence is required before routed combination outcome-promotion readiness can be reviewed.',
      ],
    });
  }

  const items = i80.items.map(reviewItem);
  return finalized({
    reviewVersion:
      I81_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_BUREAU_STATE_ROUTED_COMBINATION_SETTLEMENT_OUTCOME_PROMOTION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_NARROW_BUREAU_STATE_OUTCOME_PROMOTION_READINESS',
    decision:
      'NARROW_BUREAU_POST_INTERACTION_STATE_MAY_BE_VERIFIED_ROUTED_COMBINATION_BINDING_INTERACTION_OUTCOME_PROMOTION_BLOCKED',
    upstreamI80ReportId: i80.reportId,
    items,
    anyNarrowBureauStateVerified: items.some((item) => item.narrowBureauStateVerified),
    anyRoutedCombinationSettlementOutcomePromotionReady: false,
    currentCombinationBindingInteractionOutcomePromotionAuthorized: false,
    competingCombinationBindingInteractionOutcomePromotionAuthorized: false,
    narrowBureauStateMayResolveBindingVerdict: false,
    narrowBureauStateMayResolveTransformationVerdict: false,
    narrowBureauStateMayResolveGenericInteractionOutcome: false,
    narrowBureauStateMayResolveNeutralizationVerdict: false,
    narrowBureauStateMayResolveNoEffectVerdict: false,
    narrowBureauStateMayResolveSupportSourceDestroyed: false,
    currentAndCompetingRolesRemainDistinctOutcomeDomains: true,
    genericCombinationSettlementResolverAuthorized: false,
    directBindingOutcomeAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
    noEffectOutcomeAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'CHALLENGE_CONTEXT_AVAILABILITY_V24_NARROW_BRANCH_THREE_SETTLEMENT_REFINEMENT',
    notes: [
      'I81 distinguishes an I80 verified bureau-level post-interaction state from the routed current- or competing-combination binding/interaction settlement outcome.',
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH is a narrow bureau state and does not answer whether the combination is BOUND, UNBOUND, TRANSFORMED, NO_EFFECT, neutralized, or otherwise resolved as a generic interaction outcome.',
      'Current and competing combination roles remain separate outcome domains; the same narrow bureau state cannot be used to bypass role-specific settlement authority.',
      'Missing, ambiguous, or contextually unresolved I47 alignment remains unresolved and cannot be inverted into an intact or damaged conclusion.',
      'No support-source destruction, activation/persistence, cross-relation precedence, post-relation root state, effective mechanism force, numeric score, or production classification is authorized.',
    ],
  });
}
