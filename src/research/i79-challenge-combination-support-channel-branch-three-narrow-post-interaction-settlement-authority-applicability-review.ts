import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
  I78CombinationOutcomePromotionReadinessItem,
} from './i78-challenge-combination-support-channel-relation-kind-specific-combination-interaction-outcome-promotion-readiness-review.js';

export const I79_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-authority-applicability-review-v1';

export type I79BranchThreeNarrowAuthorityApplicability =
  | 'NOT_APPLICABLE_NON_BRANCH_THREE'
  | 'NOT_APPLICABLE_SUBSTRATE_INCOMPLETE'
  | 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED';

export interface I79BranchThreeNarrowAuthorityApplicabilityItem {
  mechanism: string;
  role: I78CombinationOutcomePromotionReadinessItem['role'];
  relationId: string;
  relationKind: I78CombinationOutcomePromotionReadinessItem['relationKind'];
  evidenceReadiness: I78CombinationOutcomePromotionReadinessItem['evidenceReadiness'];
  structuralBureauFormationState: I78CombinationOutcomePromotionReadinessItem['structuralBureauFormationState'];
  narrowPostInteractionAuthorityAuditCandidate: boolean;
  applicability: I79BranchThreeNarrowAuthorityApplicability;
  exactI47BureauIdentityMatchRequired: boolean;
  exactI47DeterministicStateMatchRequired: boolean;
  eligibleDeterministicState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_applicable';
  currentAuthoritySufficientWithoutI47EvidenceMatch: false;
  bindingVerdict: 'not_determined';
  transformationVerdict: 'not_determined';
  interactionOutcome: 'not_determined';
  neutralizationVerdict: 'not_determined';
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

export interface ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_BRANCH_THREE_NARROW_AUTHORITY_APPLICABILITY'
    | 'I78_UNRESOLVED_OR_INVALID';
  decision: 'NARROW_I47_DIRECT_BREAK_REUSE_AUTHORIZED_EXACT_BUREAU_IDENTITY_ONLY_GENERIC_OUTCOME_BLOCKED';
  upstreamI78ReviewId: string;
  items: readonly I79BranchThreeNarrowAuthorityApplicabilityItem[];
  branchThreeAuditCandidatesObserved: boolean;
  exactI47BureauIdentityMatchRequired: true;
  exactI47DeterministicStateMatchRequired: true;
  eligibleI47PostInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
  i47TightEmbeddedBreakStateReuseAuthorized: true;
  i48ContextualAmbiguityMustBePreserved: true;
  i47NoDeterministicStateMayBePromotedToIntact: false;
  i47NoDeterministicStateMayBePromotedToDamaged: false;
  i48ContextualPlacementMayBePromotedToIntact: false;
  i48ContextualPlacementMayBePromotedToDamaged: false;
  narrowBreakStateMayBePromotedToBindingOutcome: false;
  narrowBreakStateMayBePromotedToTransformationOutcome: false;
  narrowBreakStateMayBePromotedToGenericInteractionOutcome: false;
  narrowBreakStateMayBePromotedToNeutralizationOutcome: false;
  narrowBreakStateMayBePromotedToSupportSourceDestroyed: false;
  currentAndCompetingRolesMayShareDownstreamOutcomeWithoutRoleSpecificAudit: false;
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
  recommendedNextGate: 'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE_ADAPTER';
  authorityBasis: readonly {
    authorityRef: 'I47' | 'I48';
    finding: string;
  }[];
  notes: readonly string[];
}

function finalized(
  material: Omit<
    ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport,
    'reviewId'
  >,
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_branch_three_narrow_authority_applicability_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i78Accepted(
  i78: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
): boolean {
  return (
    i78.status === 'RESOLVED_OUTCOME_PROMOTION_READINESS' &&
    i78.decision === 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED' &&
    i78.anyDirectOutcomePromotionReady === false &&
    i78.stemFiveDirectOutcomePromotionAuthorized === false &&
    i78.branchSixDirectOutcomePromotionAuthorized === false &&
    i78.branchThreeStructuralFormationMayBePreservedAsEvidence &&
    i78.branchThreeStructuralFormationMayBePromotedToBinding === false &&
    i78.branchThreeStructuralFormationMayBePromotedToPostInteractionEffectiveBureau === false &&
    i78.narrowBranchThreePostInteractionAuthorityAuditAuthorized &&
    i78.currentAndCompetingRolesMayShareOutcomeWithoutRoleSpecificAudit === false &&
    i78.genericCombinationSettlementResolverAuthorized === false &&
    i78.directBindingOutcomeAuthorized === false &&
    i78.transformationOutcomeAuthorized === false &&
    i78.neutralizationOutcomeAuthorized === false &&
    i78.noEffectOutcomeAuthorized === false &&
    i78.postCombinationSubjectIdentityPolicyResolved === false &&
    i78.pairOrderSignificanceAuthorized === false &&
    i78.multiTouchAggregationAuthorized === false &&
    i78.crossRelationPrecedenceAuthorized === false &&
    i78.supportChannelActivationVerdictAuthorized === false &&
    i78.supportChannelPersistenceVerdictAuthorized === false &&
    i78.supportChannelNetEffectVerdictAuthorized === false &&
    i78.targetPostRelationRootState === 'not_determined' &&
    i78.effectiveMechanismForceVerdict === 'not_determined' &&
    i78.classificationAuthorized === false &&
    i78.numericScoringAuthorized === false &&
    i78.recommendedNextGate ===
      'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW' &&
    i78.items.every(
      (item) =>
        item.currentAuthoritySufficientForBindingOutcome === false &&
        item.currentAuthoritySufficientForTransformationOutcome === false &&
        item.currentAuthoritySufficientForGenericInteractionOutcome === false &&
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

function applicability(
  item: I78CombinationOutcomePromotionReadinessItem,
): I79BranchThreeNarrowAuthorityApplicability {
  if (item.relationKind !== 'branch_three_combination') {
    return 'NOT_APPLICABLE_NON_BRANCH_THREE';
  }
  if (
    item.evidenceReadiness !== 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED' ||
    item.structuralBureauFormationState !== 'STRUCTURAL_BUREAU_FORMED' ||
    item.narrowPostInteractionAuthorityAuditCandidate === false
  ) {
    return 'NOT_APPLICABLE_SUBSTRATE_INCOMPLETE';
  }
  return 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED';
}

function itemReview(
  item: I78CombinationOutcomePromotionReadinessItem,
): I79BranchThreeNarrowAuthorityApplicabilityItem {
  const state = applicability(item);
  const candidate = state === 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED';
  return {
    mechanism: item.mechanism,
    role: item.role,
    relationId: item.relationId,
    relationKind: item.relationKind,
    evidenceReadiness: item.evidenceReadiness,
    structuralBureauFormationState: item.structuralBureauFormationState,
    narrowPostInteractionAuthorityAuditCandidate: item.narrowPostInteractionAuthorityAuditCandidate,
    applicability: state,
    exactI47BureauIdentityMatchRequired: candidate,
    exactI47DeterministicStateMatchRequired: candidate,
    eligibleDeterministicState: candidate ? 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' : 'not_applicable',
    currentAuthoritySufficientWithoutI47EvidenceMatch: false,
    bindingVerdict: 'not_determined',
    transformationVerdict: 'not_determined',
    interactionOutcome: 'not_determined',
    neutralizationVerdict: 'not_determined',
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

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I47' as const,
    finding:
      'I47 authorizes BROKEN_BY_TIGHT_EMBEDDED_CLASH only for the exact formed branch-three bureau identity when one source-bounded tight embedded clash satisfies the I46 placement contract.',
  },
  {
    authorityRef: 'I48' as const,
    finding:
      'I48 preserves contextual intact-or-damaged ambiguity outside the narrow I47 direct-break case and forbids deriving intactness or damage from placement alone.',
  },
]);

export function buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(
  i78: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport {
  if (!i78Accepted(i78)) {
    return finalized({
      reviewVersion:
        I79_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW_VERSION,
      status: 'I78_UNRESOLVED_OR_INVALID',
      decision:
        'NARROW_I47_DIRECT_BREAK_REUSE_AUTHORIZED_EXACT_BUREAU_IDENTITY_ONLY_GENERIC_OUTCOME_BLOCKED',
      upstreamI78ReviewId: i78.reviewId,
      items: [],
      branchThreeAuditCandidatesObserved: false,
      exactI47BureauIdentityMatchRequired: true,
      exactI47DeterministicStateMatchRequired: true,
      eligibleI47PostInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      i47TightEmbeddedBreakStateReuseAuthorized: true,
      i48ContextualAmbiguityMustBePreserved: true,
      i47NoDeterministicStateMayBePromotedToIntact: false,
      i47NoDeterministicStateMayBePromotedToDamaged: false,
      i48ContextualPlacementMayBePromotedToIntact: false,
      i48ContextualPlacementMayBePromotedToDamaged: false,
      narrowBreakStateMayBePromotedToBindingOutcome: false,
      narrowBreakStateMayBePromotedToTransformationOutcome: false,
      narrowBreakStateMayBePromotedToGenericInteractionOutcome: false,
      narrowBreakStateMayBePromotedToNeutralizationOutcome: false,
      narrowBreakStateMayBePromotedToSupportSourceDestroyed: false,
      currentAndCompetingRolesMayShareDownstreamOutcomeWithoutRoleSpecificAudit: false,
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
      recommendedNextGate: 'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE_ADAPTER',
      authorityBasis: AUTHORITY_BASIS,
      notes: [
        'Resolved fail-closed I78 outcome-promotion readiness is required before narrow branch-three authority applicability can be audited.',
      ],
    });
  }

  const items = i78.items.map(itemReview);
  return finalized({
    reviewVersion:
      I79_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_THREE_NARROW_AUTHORITY_APPLICABILITY',
    decision:
      'NARROW_I47_DIRECT_BREAK_REUSE_AUTHORIZED_EXACT_BUREAU_IDENTITY_ONLY_GENERIC_OUTCOME_BLOCKED',
    upstreamI78ReviewId: i78.reviewId,
    items,
    branchThreeAuditCandidatesObserved: items.some(
      (item) => item.applicability === 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED',
    ),
    exactI47BureauIdentityMatchRequired: true,
    exactI47DeterministicStateMatchRequired: true,
    eligibleI47PostInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
    i47TightEmbeddedBreakStateReuseAuthorized: true,
    i48ContextualAmbiguityMustBePreserved: true,
    i47NoDeterministicStateMayBePromotedToIntact: false,
    i47NoDeterministicStateMayBePromotedToDamaged: false,
    i48ContextualPlacementMayBePromotedToIntact: false,
    i48ContextualPlacementMayBePromotedToDamaged: false,
    narrowBreakStateMayBePromotedToBindingOutcome: false,
    narrowBreakStateMayBePromotedToTransformationOutcome: false,
    narrowBreakStateMayBePromotedToGenericInteractionOutcome: false,
    narrowBreakStateMayBePromotedToNeutralizationOutcome: false,
    narrowBreakStateMayBePromotedToSupportSourceDestroyed: false,
    currentAndCompetingRolesMayShareDownstreamOutcomeWithoutRoleSpecificAudit: false,
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
    recommendedNextGate: 'BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE_ADAPTER',
    authorityBasis: AUTHORITY_BASIS,
    notes: [
      'I79 reuses only the already-closed I47 narrow bureau-level state and creates no new branch-three settlement rule.',
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH may be reused only after an evidence adapter proves exact mechanism and branch-three bureau identity alignment to an I47 item that actually emitted that deterministic state.',
      'An I47 item with postInteractionBureauState=not_determined remains unresolved; absence of a deterministic break is not evidence of INTACT, DAMAGED, UNBOUND, or NO_EFFECT.',
      'I48 contextual ambiguity remains authoritative outside the narrow direct-break case and must not be collapsed into a guessed settlement result.',
      'Even an exact I47 direct-break match is only a bureau-level post-interaction state. It does not by itself establish binding, transformation, generic interaction outcome, neutralization, support-source destruction, activation/persistence, net effect, post-relation root state, or effective mechanism force.',
    ],
  });
}
