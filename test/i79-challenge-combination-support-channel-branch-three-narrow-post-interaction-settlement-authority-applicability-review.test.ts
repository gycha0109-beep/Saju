import { describe, expect, test } from 'vitest';
import type { ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport } from '../src/index.js';
import { buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview } from '../src/research/i79-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-authority-applicability-review.js';

const THREE_ID = 'branch_three_combination:year:branch:신|month:branch:자|day:branch:진';
const SIX_ID = 'branch_six_combination:year:branch:자|month:branch:축';

function item(
  relationKind: 'branch_three_combination' | 'branch_six_combination',
  aligned = true,
) {
  const branchThree = relationKind === 'branch_three_combination';
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    role: 'COMPETING_COMBINATION',
    relationId: branchThree ? THREE_ID : SIX_ID,
    relationKind,
    evidenceReadiness: aligned ? 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED' : 'PARTIAL_KIND_SUBSTRATE',
    structuralBureauFormationState: branchThree && aligned ? 'STRUCTURAL_BUREAU_FORMED' : branchThree ? 'not_available' : 'not_applicable',
    promotionReadiness: branchThree
      ? aligned
        ? 'BRANCH_THREE_STRUCTURAL_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED'
        : 'SUBSTRATE_INCOMPLETE_OUTCOME_PROMOTION_BLOCKED'
      : 'BRANCH_SIX_TRANSFORMATION_CONVENTION_BLOCKS_OUTCOME_PROMOTION',
    currentAuthoritySufficientForBindingOutcome: false,
    currentAuthoritySufficientForTransformationOutcome: false,
    currentAuthoritySufficientForGenericInteractionOutcome: false,
    narrowPostInteractionAuthorityAuditCandidate: branchThree && aligned,
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

function i78(
  items = [item('branch_three_combination'), item('branch_six_combination')],
): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport {
  return {
    reviewId: 'i78_i79_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_OUTCOME_PROMOTION_READINESS',
    decision: 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED',
    upstreamI77ReportId: 'i77',
    items,
    kindSpecificSubstrateAvailable: true,
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
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport;
}

describe('I79 branch-three narrow post-interaction settlement authority applicability', () => {
  test('requires exact I47 bureau identity and deterministic-state match for an aligned branch-three candidate', () => {
    const report = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(i78());
    const candidate = report.items.find((entry) => entry.relationId === THREE_ID);
    expect(report.status).toBe('RESOLVED_BRANCH_THREE_NARROW_AUTHORITY_APPLICABILITY');
    expect(candidate?.applicability).toBe('EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED');
    expect(candidate?.exactI47BureauIdentityMatchRequired).toBe(true);
    expect(candidate?.eligibleDeterministicState).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
  });

  test('marks non-branch-three relations as outside the narrow authority domain', () => {
    const report = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(i78());
    expect(report.items.find((entry) => entry.relationId === SIX_ID)?.applicability).toBe('NOT_APPLICABLE_NON_BRANCH_THREE');
  });

  test('does not audit incomplete branch-three substrate as if I47 applicability were established', () => {
    const report = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(
      i78([item('branch_three_combination', false)]),
    );
    expect(report.items[0]?.applicability).toBe('NOT_APPLICABLE_SUBSTRATE_INCOMPLETE');
    expect(report.items[0]?.currentAuthoritySufficientWithoutI47EvidenceMatch).toBe(false);
  });

  test('preserves I48 ambiguity and blocks all generic outcome promotions', () => {
    const report = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(i78());
    expect(report.i48ContextualAmbiguityMustBePreserved).toBe(true);
    expect(report.narrowBreakStateMayBePromotedToBindingOutcome).toBe(false);
    expect(report.narrowBreakStateMayBePromotedToGenericInteractionOutcome).toBe(false);
    expect(report.narrowBreakStateMayBePromotedToSupportSourceDestroyed).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('fails closed when I78 attempts direct outcome promotion', () => {
    const invalid = { ...i78(), directBindingOutcomeAuthorized: true } as unknown as ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport;
    const report = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(invalid);
    expect(report.status).toBe('I78_UNRESOLVED_OR_INVALID');
    expect(report.items).toEqual([]);
  });

  test('is deterministic and keeps production classification and scoring blocked', () => {
    const first = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(i78());
    const second = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(i78());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
  });
});
