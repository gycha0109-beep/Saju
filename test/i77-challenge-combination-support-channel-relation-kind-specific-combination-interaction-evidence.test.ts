import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  ChallengeTargetCombinationConditionEvidenceReport,
} from '../src/index.js';
import { buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview } from '../src/research/i76-challenge-combination-support-channel-relation-kind-specific-combination-binding-interaction-settlement-methodology-review.js';
import { buildI77ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidence } from '../src/research/i77-challenge-combination-support-channel-relation-kind-specific-combination-interaction-evidence.js';

const STEM_ID = 'stem_five_combination:year:stem:갑|month:stem:기';
const SIX_ID = 'branch_six_combination:year:branch:자|month:branch:축';
const THREE_ID = 'branch_three_combination:year:branch:신|month:branch:자|day:branch:진';

function dependency(
  name:
    | 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    | 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
  verified = true,
) {
  return {
    dependency: name,
    route: 'EXACT_I35_CURRENT_COMBINATION_SUBSTRATE',
    verificationStatus: verified ? 'VERIFIED_CURRENT_CHART_SUBSTRATE' : 'CURRENT_CHART_SUBSTRATE_UNVERIFIED',
    currentChartSettlementSubstrateVerified: verified,
    verifiedAuthorityRefs: verified ? ['I35'] : [],
    rescueTopologyCandidateCount: 'not_applicable',
    narrowBureauContextStatus: 'not_applicable',
    narrowBureauState: 'not_applicable',
    settlementOutcomeResolved: false,
  };
}

function i65(): ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport {
  return {
    reportId: 'i65_i77_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE',
    upstreamI61ReportId: 'i61',
    upstreamI62ReviewId: 'i62',
    upstreamI63ReportId: 'i63',
    upstreamI64ReviewId: 'i64',
    i33ReportId: 'i33',
    i35ReportId: 'i35_i77_fixture',
    i47ReportId: 'i47',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        currentCombinationRelationId: STEM_ID,
        currentCombinationRelationKind: 'stem_five_combination',
        targetParticipantPillar: 'year',
        targetParticipantComponent: 'stem',
        targetParticipantValue: '갑',
        supportChannelKind: 'SAME_ELEMENT_VISIBLE_STEM_SUPPORT',
        sourcePillar: 'year',
        sourceComponent: 'branch',
        sourceValue: '자',
        contestTopologyState: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
        touchCount: 3,
        dispatchedRelationVerification: [
          {
            relationId: STEM_ID,
            relationKind: 'stem_five_combination',
            isCurrentCombinationRelation: true,
            dispatchClass: 'CURRENT_COMBINATION_SETTLEMENT_ROUTE',
            dependencyVerification: [dependency('CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT')],
            allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate: true,
            precedenceWithinMultiTouch: 'not_determined',
            settlementOutcome: 'not_determined',
          },
          {
            relationId: SIX_ID,
            relationKind: 'branch_six_combination',
            isCurrentCombinationRelation: false,
            dispatchClass: 'COMPETING_COMBINATION_SETTLEMENT_ROUTE',
            dependencyVerification: [dependency('COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT')],
            allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate: true,
            precedenceWithinMultiTouch: 'not_determined',
            settlementOutcome: 'not_determined',
          },
          {
            relationId: THREE_ID,
            relationKind: 'branch_three_combination',
            isCurrentCombinationRelation: false,
            dispatchClass: 'COMPETING_COMBINATION_SETTLEMENT_ROUTE',
            dependencyVerification: [dependency('COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT')],
            allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate: true,
            precedenceWithinMultiTouch: 'not_determined',
            settlementOutcome: 'not_determined',
          },
        ],
        allDispatchedRelationSettlementSubstratesVerified: true,
        anySettlementOutcomeResolved: false,
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
        supportChannelNeutralized: 'not_determined',
        supportChannelDestroyed: 'not_determined',
        supportChannelNetEffect: 'not_resolved',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable: true,
    anyDispatchedRelationCurrentChartSettlementSubstrateVerified: true,
    allDispatchedRelationCurrentChartSettlementSubstratesVerified: true,
    anyRoutedSettlementOutcomeResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    contestOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport;
}

function conditionItem(
  relationId: string,
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination',
) {
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    targetElement: '수',
    subjectKind: relationKind === 'stem_five_combination' ? 'VISIBLE_TARGET_STEM' : 'TARGET_ROOT_CANDIDATE',
    subjectPosition: 'year',
    subjectValue: '자',
    relationId,
    relationKind,
    seasonalCondition: {
      monthBranch: '축',
      commandElement: '토',
      targetElementSeasonalPhase: '死',
      conditionEffect: 'not_resolved',
    },
    supportInterference: {
      participantContexts: [
        {
          pillar: 'year',
          component: 'branch',
          value: '자',
          element: '수',
          seasonalPhase: '死',
          visibleSameElementStemPositions: [],
          visibleResourceStemPositions: [],
          sameElementBranchPositions: ['year'],
          resourceBranchPositions: [],
          supportInterferenceEffect: 'not_resolved',
          numericWeight: 'not_assigned',
        },
      ],
      completeEffectModelAvailable: false,
      supportInterferenceEffect: 'not_resolved',
    },
    competingRelationTopology: [],
    sixCombinationConventionState:
      relationKind === 'branch_six_combination'
        ? 'UNIFORM_TRANSFORMATION_CONVENTION_UNRESOLVED_SCOPE_MISMATCH'
        : 'NOT_APPLICABLE',
    conditionEvidenceState: 'CANDIDATE_SUBSTRATE_ONLY',
    transformationConditionVerdict: 'not_determined',
    trueTransformationVerdict: 'not_determined',
    bindingState: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function i39(): ChallengeTargetCombinationConditionEvidenceReport {
  return {
    reportId: 'i39_i77_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_CONDITION_EVIDENCE',
    upstreamI35ReportId: 'i35_i77_fixture',
    upstreamI37ReportId: 'i37',
    upstreamI38ReviewId: 'i38',
    items: [conditionItem(STEM_ID, 'stem_five_combination'), conditionItem(SIX_ID, 'branch_six_combination'), conditionItem(THREE_ID, 'branch_three_combination')],
    challengeSpecificConditionEvidenceAvailable: true,
    transformationConditionVerdict: 'not_determined',
    challengeTransformationStateEmissionAuthorized: false,
    combinationBindingStateEmissionAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as ChallengeTargetCombinationConditionEvidenceReport;
}

function i45(conditionReport = i39()): ChallengeRootThreeCombinationBureauFormationEvidenceReport {
  return {
    reportId: 'i45_i77_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_STRUCTURAL_BUREAU_FORMATION',
    upstreamI39ReportId: conditionReport.reportId,
    upstreamI44ReviewId: 'i44',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        relationId: THREE_ID,
        subjectPosition: 'year',
        subjectValue: '자',
        participantPositions: ['year', 'month', 'day'],
        traditionalBureauElement: '수',
        formationState: 'STRUCTURAL_BUREAU_FORMED',
        formationBasis: 'FULL_THREE_BRANCH_MEMBERSHIP',
        fullMembershipObserved: true,
        adjacencyState: 'CONTIGUOUS_THREE_SLOTS',
        adjacencyRequiredForFormation: false,
        leadOutState: 'NO_VISIBLE_REFERENCE_ELEMENT_STEM',
        visibleLeadOutStemPositions: [],
        visibleLeadOutRequiredForFormation: false,
        clashTopology: [],
        clashCanBreakOrDamageBureau: true,
        clashBreakDamageSettlement: 'not_determined',
        postInteractionBureauState: 'not_determined',
        postInteractionEffectiveBureauVerdict: 'not_determined',
        seasonalCommandEffectOnChallengeForce: 'not_resolved',
        supportInterferenceEffectOnChallengeForce: 'not_resolved',
        competingRelationInteractionSettlement: 'not_determined',
        postCombinationSubjectIdentity: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    allThreeCombinationItemsHaveFormationEvidence: true,
    structuralBureauFormationStateEmissionAuthorized: true,
    postInteractionBureauStateEmissionAuthorized: false,
    postInteractionEffectiveBureauVerdictAuthorized: false,
    adjacencyRequiredForFullThreeFormation: false,
    visibleLeadOutRequiredForFullThreeFormation: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as ChallengeRootThreeCombinationBureauFormationEvidenceReport;
}

function build(e65 = i65(), e39 = i39(), e45 = i45(e39)) {
  return buildI77ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidence(
    e65,
    e39,
    e45,
    buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview(),
  );
}

describe('I77 relation-kind-specific combination interaction evidence', () => {
  test('materializes distinct current/competing roles and all three kind-readiness paths', () => {
    const report = build();
    expect(report.status).toBe('RESOLVED_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE');
    expect(report.items).toHaveLength(3);
    expect(report.items.find((item) => item.relationId === STEM_ID)?.role).toBe('CURRENT_COMBINATION');
    expect(report.items.find((item) => item.relationId === SIX_ID)?.role).toBe('COMPETING_COMBINATION');
    expect(report.items.find((item) => item.relationId === STEM_ID)?.kindReadiness).toBe('STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED');
    expect(report.items.find((item) => item.relationId === SIX_ID)?.kindReadiness).toBe('STRUCTURAL_PAIR_INTERACTION_ONLY_TRANSFORMATION_CONVENTION_BLOCKED');
    expect(report.items.find((item) => item.relationId === THREE_ID)?.kindReadiness).toBe('STRUCTURAL_BUREAU_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED');
  });

  test('preserves branch-three bureau formation only as pre-settlement evidence', () => {
    const report = build();
    const item = report.items.find((candidate) => candidate.relationId === THREE_ID);
    expect(item?.structuralBureauFormationState).toBe('STRUCTURAL_BUREAU_FORMED');
    expect(item?.structuralBureauFormationIsBindingVerdict).toBe(false);
    expect(item?.bindingVerdict).toBe('not_determined');
    expect(item?.interactionOutcome).toBe('not_determined');
  });

  test('reports partial kind substrate instead of inventing an outcome when condition evidence is absent', () => {
    const condition = i39();
    condition.items = condition.items.filter((item) => item.relationId !== SIX_ID) as typeof condition.items;
    const report = build(i65(), condition, i45(condition));
    const item = report.items.find((candidate) => candidate.relationId === SIX_ID);
    expect(item?.conditionEvidenceAligned).toBe(false);
    expect(item?.evidenceReadiness).toBe('PARTIAL_KIND_SUBSTRATE');
    expect(item?.bindingVerdict).toBe('not_determined');
  });

  test('fails closed when I39 is not aligned to the exact I35 authority consumed by I65', () => {
    const condition = { ...i39(), upstreamI35ReportId: 'different_i35' };
    const report = build(i65(), condition, i45(condition));
    expect(report.status).toBe('I39_UNRESOLVED_OR_MISALIGNED');
    expect(report.items).toEqual([]);
  });

  test('keeps binding, transformation, neutralization, precedence, activation, scoring, and classification blocked', () => {
    const report = build();
    expect(report.directBindingOutcomeAuthorized).toBe(false);
    expect(report.genericCombinationSettlementResolverAuthorized).toBe(false);
    expect(report.transformationOutcomeAuthorized).toBe(false);
    expect(report.neutralizationOutcomeAuthorized).toBe(false);
    expect(report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = build();
    const second = build();
    expect(first.reportId).toBe(second.reportId);
    expect(first.items).toEqual(second.items);
  });
});
