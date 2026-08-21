import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
  ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
} from '../src/index.js';
import { buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview } from '../src/research/i79-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-authority-applicability-review.js';
import { buildI80ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidence } from '../src/research/i80-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-evidence.js';

const THREE_ID = 'branch_three_combination:year:branch:신|month:branch:자|day:branch:진';

function i78(): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport {
  return {
    reviewId: 'i78_i80_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_OUTCOME_PROMOTION_READINESS',
    decision: 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED',
    upstreamI77ReportId: 'i77',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        role: 'COMPETING_COMBINATION',
        relationId: THREE_ID,
        relationKind: 'branch_three_combination',
        evidenceReadiness: 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED',
        structuralBureauFormationState: 'STRUCTURAL_BUREAU_FORMED',
        promotionReadiness: 'BRANCH_THREE_STRUCTURAL_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED',
        currentAuthoritySufficientForBindingOutcome: false,
        currentAuthoritySufficientForTransformationOutcome: false,
        currentAuthoritySufficientForGenericInteractionOutcome: false,
        narrowPostInteractionAuthorityAuditCandidate: true,
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
      },
    ],
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

function i47(
  states: readonly ('BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_determined')[] = [
    'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
  ],
  relationId = THREE_ID,
): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return {
    reportId: 'i47_i80_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE',
    upstreamI45ReportId: 'i45',
    upstreamI46ReviewId: 'i46',
    items: states.map((state) => ({
      mechanism: 'OUTPUT_LEAKAGE',
      formationRelationId: relationId,
      bureauParticipantPositions: ['year', 'month', 'day'],
      bureauSpanStart: 'year',
      bureauSpanEnd: 'day',
      formationState: 'STRUCTURAL_BUREAU_FORMED',
      clashes: [],
      trackedClashCount: state === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' ? 1 : 0,
      directBreakCount: state === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' ? 1 : 0,
      postInteractionBureauState: state,
      postInteractionBureauStateBasis:
        state === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
          ? 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
          : 'NO_DETERMINISTIC_STATE_FROM_I46',
      genericIntactOrDamagedVerdict: 'not_determined',
      seasonalOverrideResolved: false,
      supportOverrideResolved: false,
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      numericScore: 'not_assigned',
    })),
    placementClassificationAvailable: true,
    tightEmbeddedBreakStateEmissionAuthorized: true,
    genericPostInteractionBureauStateEmissionAuthorized: false,
    damagedBureauMagnitudeClassificationAuthorized: false,
    multipleClashAggregationAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as unknown as ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport;
}

function build(e47 = i47()) {
  const r78 = i78();
  const r79 = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(r78);
  return buildI80ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidence(
    r78,
    r79,
    e47,
  );
}

describe('I80 branch-three narrow post-interaction settlement evidence', () => {
  test('materializes BROKEN_BY_TIGHT_EMBEDDED_CLASH only from an exact deterministic I47 match', () => {
    const report = build();
    expect(report.status).toBe('RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE');
    expect(report.items[0]?.evidenceState).toBe('NARROW_DIRECT_BREAK_STATE_VERIFIED');
    expect(report.items[0]?.narrowPostInteractionBureauState).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(report.items[0]?.i47DeterministicBreakStateMatched).toBe(true);
  });

  test('preserves ambiguity when the exact I47 item has no deterministic break', () => {
    const report = build(i47(['not_determined']));
    expect(report.items[0]?.evidenceState).toBe('I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK');
    expect(report.items[0]?.narrowPostInteractionBureauState).toBe('not_determined');
    expect(report.items[0]?.contextualAmbiguityPreserved).toBe(true);
    expect(report.absenceOfNarrowBreakMeansIntactAuthorized).toBe(false);
  });

  test('reports a missing exact I47 bureau match rather than guessing', () => {
    const report = build(i47(['BROKEN_BY_TIGHT_EMBEDDED_CLASH'], 'branch_three_combination:different'));
    expect(report.items[0]?.evidenceState).toBe('I47_EXACT_BUREAU_MATCH_NOT_FOUND');
    expect(report.items[0]?.i47ExactMatchCount).toBe(0);
    expect(report.items[0]?.narrowPostInteractionBureauState).toBe('not_determined');
  });

  test('reports duplicate exact I47 matches as ambiguous and does not aggregate them', () => {
    const report = build(i47(['BROKEN_BY_TIGHT_EMBEDDED_CLASH', 'BROKEN_BY_TIGHT_EMBEDDED_CLASH']));
    expect(report.items[0]?.evidenceState).toBe('I47_EXACT_BUREAU_MATCH_AMBIGUOUS');
    expect(report.items[0]?.i47ExactMatchCount).toBe(2);
    expect(report.items[0]?.narrowPostInteractionBureauState).toBe('not_determined');
    expect(report.multiTouchAggregationAuthorized).toBe(false);
  });

  test('fails closed when the supplied I79 review is not canonical for the supplied I78 report', () => {
    const r78 = i78();
    const canonical = buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(r78);
    const mutated = { ...canonical, reviewId: 'mutated_i79' };
    const report = buildI80ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidence(
      r78,
      mutated,
      i47(),
    );
    expect(report.status).toBe('I79_METHODOLOGY_NOT_CANONICAL');
    expect(report.items).toEqual([]);
  });

  test('is deterministic and keeps downstream outcomes, scoring, and classification blocked', () => {
    const first = build();
    const second = build();
    expect(first.reportId).toBe(second.reportId);
    expect(first.directBindingOutcomeAuthorized).toBe(false);
    expect(first.narrowBreakStateMayBePromotedToSupportSourceDestroyed).toBe(false);
    expect(first.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
