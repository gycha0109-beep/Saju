import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport,
  I77RelationKindSpecificCombinationInteractionEvidenceItem,
} from './i77-challenge-combination-support-channel-relation-kind-specific-combination-interaction-evidence.js';

export const I78_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_OUTCOME_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-relation-kind-specific-combination-interaction-outcome-promotion-readiness-review-v1';

export type I78CombinationOutcomePromotionReadiness =
  | 'SUBSTRATE_INCOMPLETE_OUTCOME_PROMOTION_BLOCKED'
  | 'STEM_FIVE_SCOPE_TRANSFER_BLOCKS_OUTCOME_PROMOTION'
  | 'BRANCH_SIX_TRANSFORMATION_CONVENTION_BLOCKS_OUTCOME_PROMOTION'
  | 'BRANCH_THREE_STRUCTURAL_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED';

export interface I78CombinationOutcomePromotionReadinessItem {
  mechanism: string;
  role: I77RelationKindSpecificCombinationInteractionEvidenceItem['role'];
  relationId: string;
  relationKind: I77RelationKindSpecificCombinationInteractionEvidenceItem['relationKind'];
  evidenceReadiness: I77RelationKindSpecificCombinationInteractionEvidenceItem['evidenceReadiness'];
  structuralBureauFormationState: I77RelationKindSpecificCombinationInteractionEvidenceItem['structuralBureauFormationState'];
  promotionReadiness: I78CombinationOutcomePromotionReadiness;
  currentAuthoritySufficientForBindingOutcome: false;
  currentAuthoritySufficientForTransformationOutcome: false;
  currentAuthoritySufficientForGenericInteractionOutcome: false;
  narrowPostInteractionAuthorityAuditCandidate: boolean;
  bindingVerdict: 'not_determined';
  transformationVerdict: 'not_determined';
  interactionOutcome: 'not_determined';
  neutralizationVerdict: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  precedenceWithinMultiTouch: 'not_determined';
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_OUTCOME_PROMOTION_READINESS'
    | 'I77_UNRESOLVED_OR_INVALID';
  decision: 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED';
  upstreamI77ReportId: string;
  items: readonly I78CombinationOutcomePromotionReadinessItem[];
  kindSpecificSubstrateAvailable: boolean;
  anyDirectOutcomePromotionReady: false;
  stemFiveDirectOutcomePromotionAuthorized: false;
  branchSixDirectOutcomePromotionAuthorized: false;
  branchThreeStructuralFormationMayBePreservedAsEvidence: true;
  branchThreeStructuralFormationMayBePromotedToBinding: false;
  branchThreeStructuralFormationMayBePromotedToPostInteractionEffectiveBureau: false;
  narrowBranchThreePostInteractionAuthorityAuditAuthorized: true;
  currentAndCompetingRolesMayShareOutcomeWithoutRoleSpecificAudit: false;
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
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate: 'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_combination_outcome_promotion_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i77Accepted(
  i77: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport,
): boolean {
  return (
    i77.status === 'RESOLVED_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE' &&
    i77.relationKindSpecificCombinationInteractionEvidenceAvailable &&
    i77.directBindingOutcomeAuthorized === false &&
    i77.genericCombinationSettlementResolverAuthorized === false &&
    i77.transformationOutcomeAuthorized === false &&
    i77.neutralizationOutcomeAuthorized === false &&
    i77.postCombinationSubjectIdentityPolicyResolved === false &&
    i77.pairOrderSignificanceAuthorized === false &&
    i77.multiTouchAggregationAuthorized === false &&
    i77.crossRelationPrecedenceAuthorized === false &&
    i77.supportChannelActivationVerdictAuthorized === false &&
    i77.supportChannelPersistenceVerdictAuthorized === false &&
    i77.supportChannelNetEffectVerdictAuthorized === false &&
    i77.targetPostRelationRootState === 'not_determined' &&
    i77.effectiveMechanismForceVerdict === 'not_determined' &&
    i77.classificationAuthorized === false &&
    i77.numericScoringAuthorized === false &&
    i77.items.every(
      (item) =>
        item.structuralBureauFormationIsBindingVerdict === false &&
        item.bindingVerdict === 'not_determined' &&
        item.transformationVerdict === 'not_determined' &&
        item.interactionOutcome === 'not_determined' &&
        item.neutralizationVerdict === 'not_determined' &&
        item.postCombinationSubjectIdentity === 'not_determined' &&
        item.precedenceWithinMultiTouch === 'not_determined' &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.targetPostRelationRootState === 'not_determined' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.numericScore === 'not_assigned',
    )
  );
}

function promotionReadiness(
  item: I77RelationKindSpecificCombinationInteractionEvidenceItem,
): I78CombinationOutcomePromotionReadiness {
  if (item.evidenceReadiness !== 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED') {
    return 'SUBSTRATE_INCOMPLETE_OUTCOME_PROMOTION_BLOCKED';
  }
  if (item.relationKind === 'stem_five_combination') {
    return 'STEM_FIVE_SCOPE_TRANSFER_BLOCKS_OUTCOME_PROMOTION';
  }
  if (item.relationKind === 'branch_six_combination') {
    return 'BRANCH_SIX_TRANSFORMATION_CONVENTION_BLOCKS_OUTCOME_PROMOTION';
  }
  return 'BRANCH_THREE_STRUCTURAL_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED';
}

function readinessItem(
  item: I77RelationKindSpecificCombinationInteractionEvidenceItem,
): I78CombinationOutcomePromotionReadinessItem {
  const state = promotionReadiness(item);
  return {
    mechanism: item.mechanism,
    role: item.role,
    relationId: item.relationId,
    relationKind: item.relationKind,
    evidenceReadiness: item.evidenceReadiness,
    structuralBureauFormationState: item.structuralBureauFormationState,
    promotionReadiness: state,
    currentAuthoritySufficientForBindingOutcome: false,
    currentAuthoritySufficientForTransformationOutcome: false,
    currentAuthoritySufficientForGenericInteractionOutcome: false,
    narrowPostInteractionAuthorityAuditCandidate:
      item.relationKind === 'branch_three_combination' &&
      item.evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED' &&
      item.structuralBureauFormationState === 'STRUCTURAL_BUREAU_FORMED',
    bindingVerdict: 'not_determined',
    transformationVerdict: 'not_determined',
    interactionOutcome: 'not_determined',
    neutralizationVerdict: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    precedenceWithinMultiTouch: 'not_determined',
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(
  i77: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport,
): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport {
  if (!i77Accepted(i77)) {
    return finalized({
      reviewVersion:
        I78_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_OUTCOME_PROMOTION_READINESS_REVIEW_VERSION,
      status: 'I77_UNRESOLVED_OR_INVALID',
      decision: 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED',
      upstreamI77ReportId: i77.reportId,
      items: [],
      kindSpecificSubstrateAvailable: false,
      anyDirectOutcomePromotionReady: false,
      stemFiveDirectOutcomePromotionAuthorized: false,
      branchSixDirectOutcomePromotionAuthorized: false,
      branchThreeStructuralFormationMayBePreservedAsEvidence: true,
      branchThreeStructuralFormationMayBePromotedToBinding: false,
      branchThreeStructuralFormationMayBePromotedToPostInteractionEffectiveBureau: false,
      narrowBranchThreePostInteractionAuthorityAuditAuthorized: true,
      currentAndCompetingRolesMayShareOutcomeWithoutRoleSpecificAudit: false,
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
      supportChannelNetEffectVerdictAuthorized: false,
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      recommendedNextGate: 'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW',
      notes: [
        'Resolved fail-closed I77 relation-kind evidence is required before outcome-promotion readiness can be reviewed.',
      ],
    });
  }

  const items = i77.items.map(readinessItem);
  return finalized({
    reviewVersion:
      I78_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_OUTCOME_PROMOTION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_OUTCOME_PROMOTION_READINESS',
    decision: 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED',
    upstreamI77ReportId: i77.reportId,
    items,
    kindSpecificSubstrateAvailable: items.some(
      (item) => item.evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED',
    ),
    anyDirectOutcomePromotionReady: false,
    stemFiveDirectOutcomePromotionAuthorized: false,
    branchSixDirectOutcomePromotionAuthorized: false,
    branchThreeStructuralFormationMayBePreservedAsEvidence: true,
    branchThreeStructuralFormationMayBePromotedToBinding: false,
    branchThreeStructuralFormationMayBePromotedToPostInteractionEffectiveBureau: false,
    narrowBranchThreePostInteractionAuthorityAuditAuthorized: true,
    currentAndCompetingRolesMayShareOutcomeWithoutRoleSpecificAudit: false,
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
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW',
    notes: [
      'I78 confirms that I77 pair-local kind substrate is evidence readiness only and is not sufficient authority for direct binding, transformation, or generic interaction outcome promotion.',
      'Stem-five remains blocked by day-master result-scope transfer limits. Branch-six remains blocked by unresolved transformation convention and may not be converted into UNBOUND or NO_EFFECT.',
      'Branch-three STRUCTURAL_BUREAU_FORMED may be preserved as positive structural evidence, but it remains distinct from binding and post-interaction effective-bureau outcomes.',
      'The only authorized next progression is a narrow audit of already-existing branch-three post-interaction settlement authority; that audit itself must not generalize a narrow state into a generic combination outcome.',
    ],
  });
}
