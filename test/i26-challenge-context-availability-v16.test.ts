import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV13,
  buildI26ChallengeContextAvailabilityV14,
  buildI26ChallengeContextAvailabilityV15,
  buildI26ChallengeContextAvailabilityV16,
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
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
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
  return { v15, v16, conditions, supportPolicy, support };
}

function forceContext(
  report: ReturnType<typeof buildI26ChallengeContextAvailabilityV16>,
  mechanism: ChallengeMechanism,
) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function supportMechanism(
  aligned: ReturnType<typeof buildAligned>,
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination',
): ChallengeMechanism {
  const item = aligned.support.items.find((candidate) => candidate.relationKind === relationKind);
  if (item === undefined) throw new Error(`Expected support evidence for ${relationKind}.`);
  return item.mechanism;
}

describe('I26 v16 challenge context availability with directional support-channel topology', () => {
  test('narrows the stem support/interference gap to activation/persistence settlement', () => {
    const aligned = buildAligned(stemCombinationPillars());
    const mechanism = supportMechanism(aligned, 'stem_five_combination');
    const context = forceContext(aligned.v16, mechanism);

    expect(aligned.v16.supportChannelTopologyClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-target stem-combination support/interference effect',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support-channel activation/persistence and competing-interaction settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination binding/interaction effect policy',
    );
    expect(context?.existingCapabilities.some((item) => item.startsWith('I52 directional support-channel topology:'))).toBe(true);
  });

  test('narrows the root support/interference gap while keeping six-combination binding and generic relation settlement', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const mechanism = supportMechanism(aligned, 'branch_six_combination');
    const context = forceContext(aligned.v16, mechanism);

    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support/interference effect',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence and competing-interaction settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root six-combination binding/interaction effect policy',
    );
    expect(
      context?.unresolvedCapabilities.some((item) => item.includes('competing-relation interaction/settlement')),
    ).toBe(true);
  });

  test('preserves three-combination post-interaction bureau-state uncertainty after support topology becomes available', () => {
    const aligned = buildAligned(threeCombinationPillars());
    const mechanism = supportMechanism(aligned, 'branch_three_combination');
    const context = forceContext(aligned.v16, mechanism);

    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support/interference effect',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence and competing-interaction settlement',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.existingCapabilities.some((item) => item.includes('activation/persistence/net effect unresolved'))).toBe(true);
  });

  test('fails closed when support evidence comes from a different I39 identity', () => {
    const current = buildAligned(threeCombinationPillars());
    const stale = buildAligned(stemCombinationPillars());
    const mechanism = supportMechanism(current, 'branch_three_combination');
    const report = buildI26ChallengeContextAvailabilityV16(
      current.v15,
      current.conditions,
      current.supportPolicy,
      stale.support,
    );
    const context = forceContext(report, mechanism);

    expect(report.supportChannelTopologyClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support/interference effect',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I52 support-channel evidence aligned to current I39/I51/v15 identity',
    );
  });

  test('keeps deterministic PARTIAL_SUBSTRATE and all force/scoring/classification guards closed', () => {
    const first = buildAligned(threeCombinationPillars());
    const second = buildAligned(threeCombinationPillars());

    expect(first.v16.reportId).toBe(second.v16.reportId);
    expect(first.v16.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      first.v16.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(first.v16.methodologyReadyForEffectResolution).toBe(false);
    expect(first.v16.challengeEffectVerdict).toBe('not_determined');
    expect(first.v16.relativeForceVerdictAuthorized).toBe(false);
    expect(first.v16.classificationAuthorized).toBe(false);
    expect(first.v16.numericScoringAuthorized).toBe(false);
  });
});
