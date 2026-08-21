import { describe, expect, test } from 'vitest';
import type { ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport } from '../src/index.js';
import { buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview } from '../src/research/i81-challenge-combination-support-channel-branch-three-narrow-post-interaction-bureau-state-routed-combination-settlement-outcome-promotion-readiness-review.js';

const CURRENT_ID = 'branch_three_combination:year:branch:신|month:branch:자|day:branch:진';
const COMPETING_ID = 'branch_three_combination:month:branch:해|day:branch:묘|hour:branch:미';

function evidenceItem(
  role: 'CURRENT_COMBINATION' | 'COMPETING_COMBINATION',
  evidenceState:
    | 'I47_EXACT_BUREAU_MATCH_NOT_FOUND'
    | 'I47_EXACT_BUREAU_MATCH_AMBIGUOUS'
    | 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK'
    | 'NARROW_DIRECT_BREAK_STATE_VERIFIED',
) {
  const verified = evidenceState === 'NARROW_DIRECT_BREAK_STATE_VERIFIED';
  const exact =
    evidenceState === 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK' || verified;
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    role,
    relationId: role === 'CURRENT_COMBINATION' ? CURRENT_ID : COMPETING_ID,
    relationKind: 'branch_three_combination',
    applicability: 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED',
    evidenceState,
    i47ExactMatchCount:
      evidenceState === 'I47_EXACT_BUREAU_MATCH_NOT_FOUND'
        ? 0
        : evidenceState === 'I47_EXACT_BUREAU_MATCH_AMBIGUOUS'
          ? 2
          : 1,
    i47ExactBureauIdentityMatched: exact,
    i47DeterministicBreakStateMatched: verified,
    narrowPostInteractionBureauState: verified
      ? 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
      : 'not_determined',
    narrowPostInteractionBureauStateBasis: verified
      ? 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
      : 'NO_DETERMINISTIC_STATE_FROM_I46',
    contextualAmbiguityPreserved: !verified,
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

function i80(
  items = [
    evidenceItem('CURRENT_COMBINATION', 'NARROW_DIRECT_BREAK_STATE_VERIFIED'),
    evidenceItem('COMPETING_COMBINATION', 'NARROW_DIRECT_BREAK_STATE_VERIFIED'),
  ],
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport {
  return {
    reportId: 'i80_i81_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE',
    upstreamI78ReviewId: 'i78',
    upstreamI79ReviewId: 'i79',
    i47ReportId: 'i47',
    items,
    narrowPostInteractionSettlementEvidenceAvailable: true,
    anyNarrowDirectBreakStateVerified: items.some(
      (item) => item.evidenceState === 'NARROW_DIRECT_BREAK_STATE_VERIFIED',
    ),
    allEligibleBranchThreeCandidatesHaveUniqueI47Match: items.every(
      (item) => item.i47ExactMatchCount === 1,
    ),
    i48ContextualAmbiguityPreserved: true,
    narrowBreakStateIsBureauLevelOnly: true,
    narrowBreakStateMayBePromotedToBindingOutcome: false,
    narrowBreakStateMayBePromotedToTransformationOutcome: false,
    narrowBreakStateMayBePromotedToGenericInteractionOutcome: false,
    narrowBreakStateMayBePromotedToNeutralizationOutcome: false,
    narrowBreakStateMayBePromotedToSupportSourceDestroyed: false,
    absenceOfNarrowBreakMeansIntactAuthorized: false,
    absenceOfNarrowBreakMeansDamagedAuthorized: false,
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
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport;
}

describe('I81 narrow bureau-state routed combination settlement outcome promotion readiness', () => {
  test('keeps a verified narrow bureau break distinct from routed binding/interaction settlement outcome', () => {
    const report = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(i80());
    expect(report.status).toBe('RESOLVED_NARROW_BUREAU_STATE_OUTCOME_PROMOTION_READINESS');
    expect(report.anyNarrowBureauStateVerified).toBe(true);
    expect(report.anyRoutedCombinationSettlementOutcomePromotionReady).toBe(false);
    expect(report.items[0]?.promotionReadiness).toBe(
      'NARROW_BUREAU_STATE_VERIFIED_BINDING_INTERACTION_OUTCOME_STILL_BLOCKED',
    );
    expect(report.items[0]?.routedCombinationSettlementOutcomeResolved).toBe(false);
  });

  test('preserves current and competing combination outcome domains separately', () => {
    const report = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(i80());
    expect(report.items.find((item) => item.role === 'CURRENT_COMBINATION')?.routedCombinationSettlementDependency).toBe(
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
    expect(report.items.find((item) => item.role === 'COMPETING_COMBINATION')?.routedCombinationSettlementDependency).toBe(
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
    expect(report.currentAndCompetingRolesRemainDistinctOutcomeDomains).toBe(true);
  });

  test('keeps exact-match alignment failures unresolved', () => {
    const report = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(
      i80([evidenceItem('CURRENT_COMBINATION', 'I47_EXACT_BUREAU_MATCH_NOT_FOUND')]),
    );
    expect(report.items[0]?.promotionReadiness).toBe('EVIDENCE_ALIGNMENT_UNRESOLVED');
    expect(report.items[0]?.bindingVerdict).toBe('not_determined');
  });

  test('keeps a unique I47 match without deterministic break contextually unresolved', () => {
    const report = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(
      i80([evidenceItem('COMPETING_COMBINATION', 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK')]),
    );
    expect(report.items[0]?.promotionReadiness).toBe('CONTEXTUAL_BUREAU_STATE_UNRESOLVED');
    expect(report.items[0]?.interactionOutcome).toBe('not_determined');
    expect(report.items[0]?.noEffectVerdict).toBe('not_determined');
  });

  test('fails closed when I80 attempts to promote the narrow break to binding', () => {
    const invalid = {
      ...i80(),
      narrowBreakStateMayBePromotedToBindingOutcome: true,
    } as unknown as ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport;
    const report = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(invalid);
    expect(report.status).toBe('I80_UNRESOLVED_OR_INVALID');
    expect(report.items).toEqual([]);
  });

  test('is deterministic and keeps force, scoring, classification, precedence, and support effects blocked', () => {
    const first = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(i80());
    const second = buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(i80());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
