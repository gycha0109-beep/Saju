import { describe, expect, test } from 'vitest';
import type { ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport } from '../src/index.js';
import { buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview } from '../src/research/i78-challenge-combination-support-channel-relation-kind-specific-combination-interaction-outcome-promotion-readiness-review.js';

function item(
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination',
  evidenceReadiness: 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED' | 'PARTIAL_KIND_SUBSTRATE' =
    'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED',
) {
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    role: relationKind === 'stem_five_combination' ? 'CURRENT_COMBINATION' : 'COMPETING_COMBINATION',
    relationId: `${relationKind}:fixture`,
    relationKind,
    supportSourcePillar: 'year',
    supportSourceComponent: 'branch',
    supportSourceValue: '자',
    kindReadiness:
      relationKind === 'stem_five_combination'
        ? 'STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED'
        : relationKind === 'branch_six_combination'
          ? 'STRUCTURAL_PAIR_INTERACTION_ONLY_TRANSFORMATION_CONVENTION_BLOCKED'
          : 'STRUCTURAL_BUREAU_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED',
    pairLocalSettlementSubstrateVerified: evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED',
    conditionEvidenceAligned: evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED',
    conditionEvidenceMatchCount: evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED' ? 1 : 0,
    structuralBureauFormationState:
      relationKind === 'branch_three_combination'
        ? evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED'
          ? 'STRUCTURAL_BUREAU_FORMED'
          : 'not_available'
        : 'not_applicable',
    structuralBureauFormationIsBindingVerdict: false,
    evidenceReadiness,
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

function i77(): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport {
  return {
    reportId: 'i77_i78_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE',
    upstreamI65ReportId: 'i65',
    upstreamI39ReportId: 'i39',
    upstreamI45ReportId: 'i45',
    upstreamI76ReviewId: 'i76',
    items: [
      item('stem_five_combination'),
      item('branch_six_combination'),
      item('branch_three_combination'),
    ],
    relationKindSpecificCombinationInteractionEvidenceAvailable: true,
    allCombinationPairsHaveAlignedKindSpecificSubstrate: true,
    anyStructuralBureauFormationEvidenceObserved: true,
    directBindingOutcomeAuthorized: false,
    genericCombinationSettlementResolverAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
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
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport;
}

describe('I78 relation-kind-specific combination outcome promotion readiness', () => {
  test('blocks direct outcome promotion for all three relation kinds', () => {
    const report = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(i77());
    expect(report.status).toBe('RESOLVED_OUTCOME_PROMOTION_READINESS');
    expect(report.decision).toBe(
      'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED',
    );
    expect(report.anyDirectOutcomePromotionReady).toBe(false);
    expect(report.items.map((candidate) => candidate.promotionReadiness)).toEqual(
      expect.arrayContaining([
        'STEM_FIVE_SCOPE_TRANSFER_BLOCKS_OUTCOME_PROMOTION',
        'BRANCH_SIX_TRANSFORMATION_CONVENTION_BLOCKS_OUTCOME_PROMOTION',
        'BRANCH_THREE_STRUCTURAL_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED',
      ]),
    );
  });

  test('preserves branch-three formation only as a narrow audit candidate', () => {
    const report = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(i77());
    const three = report.items.find((candidate) => candidate.relationKind === 'branch_three_combination');
    expect(three?.structuralBureauFormationState).toBe('STRUCTURAL_BUREAU_FORMED');
    expect(three?.narrowPostInteractionAuthorityAuditCandidate).toBe(true);
    expect(three?.currentAuthoritySufficientForBindingOutcome).toBe(false);
    expect(report.branchThreeStructuralFormationMayBePromotedToBinding).toBe(false);
    expect(report.branchThreeStructuralFormationMayBePromotedToPostInteractionEffectiveBureau).toBe(false);
  });

  test('keeps partial substrate explicitly blocked rather than inferring no effect', () => {
    const evidence = i77();
    evidence.items = [item('branch_six_combination', 'PARTIAL_KIND_SUBSTRATE')] as typeof evidence.items;
    const report = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(evidence);
    expect(report.items[0]?.promotionReadiness).toBe('SUBSTRATE_INCOMPLETE_OUTCOME_PROMOTION_BLOCKED');
    expect(report.noEffectOutcomeAuthorized).toBe(false);
    expect(report.items[0]?.interactionOutcome).toBe('not_determined');
  });

  test('fails closed if I77 exposes a forbidden binding outcome', () => {
    const evidence = i77();
    const bad = {
      ...evidence,
      items: [{ ...evidence.items[0]!, bindingVerdict: 'BOUND' }],
    } as unknown as ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport;
    const report = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(bad);
    expect(report.status).toBe('I77_UNRESOLVED_OR_INVALID');
    expect(report.items).toEqual([]);
  });

  test('keeps all downstream settlement, precedence, support, force, scoring and classification guards closed', () => {
    const report = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(i77());
    expect(report.genericCombinationSettlementResolverAuthorized).toBe(false);
    expect(report.directBindingOutcomeAuthorized).toBe(false);
    expect(report.transformationOutcomeAuthorized).toBe(false);
    expect(report.neutralizationOutcomeAuthorized).toBe(false);
    expect(report.noEffectOutcomeAuthorized).toBe(false);
    expect(report.currentAndCompetingRolesMayShareOutcomeWithoutRoleSpecificAudit).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(i77());
    const second = buildI78ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReview(i77());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.items).toEqual(second.items);
  });
});
