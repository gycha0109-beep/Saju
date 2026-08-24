import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV13,
  buildI26ChallengeContextAvailabilityV14,
  buildI26ChallengeContextAvailabilityV15,
  buildI26ChallengeContextAvailabilityV16,
  buildI26ChallengeContextAvailabilityV17,
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
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
  type ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
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

function threeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
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
  return { v16, v17, conditions, support, contestPolicy, contest };
}

function forceContext(
  report: ReturnType<typeof buildI26ChallengeContextAvailabilityV17>,
  mechanism: ChallengeMechanism,
) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function contestMechanism(
  aligned: ReturnType<typeof buildAligned>,
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination',
): ChallengeMechanism {
  const item = aligned.contest.items.find(
    (candidate) => candidate.currentCombinationRelationKind === relationKind,
  );
  if (item === undefined) throw new Error(`Expected I54 contest evidence for ${relationKind}.`);
  return item.mechanism;
}

describe('I26 v17 challenge context availability with support-channel contest topology', () => {
  test('separates the stem activation/persistence blocker from contest-outcome settlement after I54 topology is available', () => {
    const aligned = buildAligned(stemCombinationPillars());
    const mechanism = contestMechanism(aligned, 'stem_five_combination');
    const context = forceContext(aligned.v17, mechanism);

    expect(aligned.v17.contestTopologyClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-target stem-combination support-channel activation/persistence and competing-interaction settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support-channel activation/persistence',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support-channel contest outcome/persistence settlement',
    );
    expect(context?.existingCapabilities.some((item) => item.startsWith('I54 direct structural contest topology:'))).toBe(true);
  });

  test('separates the root blocker while preserving independent six-combination binding and generic competing-relation settlement', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const mechanism = contestMechanism(aligned, 'branch_six_combination');
    const context = forceContext(aligned.v17, mechanism);

    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support-channel activation/persistence and competing-interaction settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel contest outcome/persistence settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root six-combination binding/interaction effect policy',
    );
    expect(
      context?.unresolvedCapabilities.some((item) => item.includes('competing-relation interaction/settlement')),
    ).toBe(true);
  });

  test('keeps contextual three-combination bureau state unresolved after direct contest topology closure', () => {
    const aligned = buildAligned(threeCombinationPillars());
    const mechanism = contestMechanism(aligned, 'branch_three_combination');
    const context = forceContext(aligned.v17, mechanism);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel contest outcome/persistence settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.existingCapabilities.some((item) => item.includes('direct structural contest topology'))).toBe(true);
  });

  test('fails closed when I54 is stale against the exact I52/I39 chain carried by v16', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const mechanism = contestMechanism(aligned, 'branch_six_combination');
    const stale = {
      ...aligned.contest,
      reportId: `${aligned.contest.reportId}_stale`,
      upstreamI52ReportId: `${aligned.support.reportId}_other`,
    } as ChallengeCombinationSupportChannelContestTopologyEvidenceReport;
    const report = buildI26ChallengeContextAvailabilityV17(
      sixCombinationPillars(),
      aligned.v16,
      aligned.conditions,
      aligned.support,
      aligned.contestPolicy,
      stale,
    );
    const context = forceContext(report, mechanism);

    expect(report.contestTopologyClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence and competing-interaction settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I54 contest-topology evidence aligned to current pillars/I39/I52/I53/v16 identity',
    );
  });

  test('keeps PARTIAL_SUBSTRATE, effect readiness, activation/persistence, force, scoring and classification guards closed', () => {
    const first = buildAligned(sixCombinationPillars());
    const second = buildAligned(sixCombinationPillars());

    expect(first.v17.reportId).toBe(second.v17.reportId);
    expect(first.v17.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      first.v17.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(first.contest.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(first.contest.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(first.contest.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(first.v17.methodologyReadyForEffectResolution).toBe(false);
    expect(first.v17.challengeEffectVerdict).toBe('not_determined');
    expect(first.v17.relativeForceVerdictAuthorized).toBe(false);
    expect(first.v17.classificationAuthorized).toBe(false);
    expect(first.v17.numericScoringAuthorized).toBe(false);
  });
});
