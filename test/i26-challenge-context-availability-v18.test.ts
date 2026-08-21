import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV13,
  buildI26ChallengeContextAvailabilityV14,
  buildI26ChallengeContextAvailabilityV15,
  buildI26ChallengeContextAvailabilityV16,
  buildI26ChallengeContextAvailabilityV17,
  buildI26ChallengeContextAvailabilityV18,
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview,
  buildI41ChallengeCombinationConditionDependencyGraph,
  buildI42ChallengeTargetStemTransformationScopeMethodologyReview,
  buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview,
  buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview,
  buildI45ChallengeRootThreeCombinationBureauFormationEvidence,
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
  buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence,
  buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview,
  buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview,
  buildI50ChallengeCombinationSeasonalDispositionEvidence,
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  buildI52ChallengeCombinationSupportChannelEvidence,
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  buildI54ChallengeCombinationSupportChannelContestTopologyEvidence,
  buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview,
  buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence,
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  type ChallengeMechanism,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
  type StructuralPillarInput,
} from '../src/index.js';

const STEM: Readonly<Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH: Readonly<Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return { stem: { value: stem, ...STEM[stem] }, branch: { value: branch, ...BRANCH[branch] } };
}

function stemCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
  };
}

function sixCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function multipleTouchPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '사'),
    hour: pillar('경', '신'),
  };
}

function reviewAllMechanisms() {
  return buildI25ChallengeEffectMethodologyReview(
    buildI24ChallengeMechanismComposition([
      { evidenceId: 'output', relation: 'output' },
      { evidenceId: 'wealth', relation: 'wealth' },
      { evidenceId: 'officer', relation: 'officer' },
    ]),
  );
}

function buildAligned(pillars: StructuralPillarInput) {
  const review = reviewAllMechanisms();
  const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(pillars, roots, relations);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const applicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    applicability,
  );
  const composition = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
  const graph = buildI41ChallengeCombinationConditionDependencyGraph(conditions, composition);
  const stemScope = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();
  const sixScope = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();
  const bureauPolicy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
  const formation = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(conditions, bureauPolicy);
  const clashPolicy = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
  const settlement = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
    pillars,
    formation,
    clashPolicy,
  );
  const v13 = buildI26ChallengeContextAvailabilityV13(
    review,
    force,
    roots,
    relations,
    clashes,
    combinations,
    transformationPolicy,
    references,
    applicability,
    conditions,
    composition,
    graph,
    stemScope,
    sixScope,
    bureauPolicy,
    formation,
    clashPolicy,
    settlement,
  );
  const contextualPolicy = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
  const v14 = buildI26ChallengeContextAvailabilityV14(v13, contextualPolicy);
  const seasonalPolicy = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
  const seasonal = buildI50ChallengeCombinationSeasonalDispositionEvidence(
    conditions,
    formation,
    seasonalPolicy,
  );
  const v15 = buildI26ChallengeContextAvailabilityV15(
    v14,
    v13,
    conditions,
    formation,
    settlement,
    seasonalPolicy,
    seasonal,
  );
  const supportPolicy = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  const support = buildI52ChallengeCombinationSupportChannelEvidence(conditions, supportPolicy);
  const v16 = buildI26ChallengeContextAvailabilityV16(v15, conditions, supportPolicy, support);
  const contestPolicy = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  const contest = buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
    pillars,
    conditions,
    support,
    contestPolicy,
  );
  const v17 = buildI26ChallengeContextAvailabilityV17(
    pillars,
    v16,
    conditions,
    support,
    contestPolicy,
    contest,
  );
  const settlementPolicy = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
  const settlementEvidence = buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence(
    contest,
    settlementPolicy,
  );
  const v18 = buildI26ChallengeContextAvailabilityV18(
    v17,
    contest,
    settlementPolicy,
    settlementEvidence,
  );
  return { v17, v18, contest, settlementPolicy, settlementEvidence };
}

function forceContext(
  report: ReturnType<typeof buildI26ChallengeContextAvailabilityV18>,
  mechanism: ChallengeMechanism,
) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function mechanismForKind(
  aligned: ReturnType<typeof buildAligned>,
  relationKind: 'stem_five_combination' | 'branch_six_combination',
): ChallengeMechanism {
  const item = aligned.settlementEvidence.items.find(
    (candidate) => candidate.currentCombinationRelationKind === relationKind,
  );
  if (item === undefined) throw new Error(`Expected I56 evidence for ${relationKind}.`);
  return item.mechanism;
}

function familyItems(
  aligned: ReturnType<typeof buildAligned>,
  mechanism: ChallengeMechanism,
  family: 'stem' | 'root',
) {
  return aligned.settlementEvidence.items.filter(
    (item) =>
      item.mechanism === mechanism &&
      (family === 'stem'
        ? item.currentCombinationRelationKind === 'stem_five_combination'
        : item.currentCombinationRelationKind === 'branch_six_combination' ||
          item.currentCombinationRelationKind === 'branch_three_combination'),
  );
}

describe('I26 v18 challenge context availability with settlement dependency evidence', () => {
  test('refines the stem contest-settlement gap into I56 routed dependencies while preserving activation/persistence', () => {
    const aligned = buildAligned(stemCombinationPillars());
    const mechanism = mechanismForKind(aligned, 'stem_five_combination');
    const context = forceContext(aligned.v18, mechanism);
    const items = familyItems(aligned, mechanism, 'stem');
    const expectedDependencies = [...new Set(items.flatMap((item) => item.requiredSettlementDependencies))];

    expect(aligned.v18.settlementDependencyClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-target stem-combination support-channel contest outcome/persistence settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support-channel activation/persistence',
    );
    for (const dependency of expectedDependencies) {
      expect(context?.unresolvedCapabilities).toContain(
        `challenge-target stem-combination support-channel routed settlement dependency unresolved: ${dependency}`,
      );
    }
    expect(
      context?.existingCapabilities.some((item) =>
        item.startsWith('I56 stem support-channel settlement dependency routing:'),
      ),
    ).toBe(true);
  });

  test('refines the root contest-settlement gap into every I56 routed dependency without resolving the underlying relation domains', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const mechanism = mechanismForKind(aligned, 'branch_six_combination');
    const context = forceContext(aligned.v18, mechanism);
    const items = familyItems(aligned, mechanism, 'root');
    const expectedDependencies = [...new Set(items.flatMap((item) => item.requiredSettlementDependencies))];

    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support-channel contest outcome/persistence settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence',
    );
    for (const dependency of expectedDependencies) {
      expect(context?.unresolvedCapabilities).toContain(
        `challenge-root combination support-channel routed settlement dependency unresolved: ${dependency}`,
      );
    }
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root six-combination binding/interaction effect policy',
    );
    expect(
      context?.unresolvedCapabilities.some((item) => item.includes('competing-relation interaction/settlement')),
    ).toBe(true);
  });

  test('preserves multi-touch touch-specific and competing-relation settlement without inventing precedence', () => {
    const aligned = buildAligned(multipleTouchPillars());
    const multi = aligned.settlementEvidence.items.find(
      (item) => item.contestTopologyState === 'MULTIPLE_TRACKED_RELATION_TOUCHES',
    );
    if (multi === undefined) throw new Error('Expected multi-touch I56 evidence.');
    const context = forceContext(aligned.v18, multi.mechanism);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel routed settlement dependency unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel routed settlement dependency unresolved: COMPETING_RELATION_SETTLEMENT',
    );
    expect(aligned.settlementPolicy.multipleTrackedRelationTouchesAuthorizeFixedPrecedence).toBe(false);
    expect(multi.settlementDependenciesResolved).toBe(false);
  });

  test('fails closed on stale I56 evidence and retains the v17 broad contest-settlement blocker', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const mechanism = mechanismForKind(aligned, 'branch_six_combination');
    const stale = {
      ...aligned.settlementEvidence,
      reportId: `${aligned.settlementEvidence.reportId}_stale`,
    } as ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport;
    const report = buildI26ChallengeContextAvailabilityV18(
      aligned.v17,
      aligned.contest,
      aligned.settlementPolicy,
      stale,
    );
    const context = forceContext(report, mechanism);

    expect(report.settlementDependencyClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel contest outcome/persistence settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I56 settlement-dependency evidence aligned to exact I54/I55/I26-v17 identity',
    );
  });

  test('keeps PARTIAL_SUBSTRATE, effect readiness, settlement outcomes, force, scoring and classification guards closed', () => {
    const first = buildAligned(sixCombinationPillars());
    const second = buildAligned(sixCombinationPillars());

    expect(first.v18.reportId).toBe(second.v18.reportId);
    expect(first.v18.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      first.v18.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(first.settlementEvidence.items.every((item) => item.settlementDependenciesResolved === false)).toBe(true);
    expect(first.settlementEvidence.contestOutcomeVerdictAuthorized).toBe(false);
    expect(first.settlementEvidence.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(first.settlementEvidence.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(first.settlementEvidence.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(first.v18.methodologyReadyForEffectResolution).toBe(false);
    expect(first.v18.challengeEffectVerdict).toBe('not_determined');
    expect(first.v18.relativeForceVerdictAuthorized).toBe(false);
    expect(first.v18.classificationAuthorized).toBe(false);
    expect(first.v18.numericScoringAuthorized).toBe(false);
  });
});
