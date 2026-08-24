import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV13,
  buildI26ChallengeContextAvailabilityV14,
  buildI26ChallengeContextAvailabilityV15,
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
  return { v13, v14, v15, conditions, formation, settlement, seasonalPolicy, seasonal };
}

function forceContext(
  report: ReturnType<typeof buildI26ChallengeContextAvailabilityV15>,
  mechanism: ChallengeMechanism,
) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function seasonalMechanism(
  aligned: ReturnType<typeof buildAligned>,
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination',
): ChallengeMechanism {
  const item = aligned.seasonal.items.find((candidate) => candidate.relationKind === relationKind);
  if (item === undefined) throw new Error(`Expected seasonal evidence for ${relationKind}.`);
  return item.mechanism;
}

describe('I26 v15 challenge context availability with categorical seasonal disposition evidence', () => {
  test('closes the stem-combination seasonal-command gap while preserving binding and support blockers', () => {
    const aligned = buildAligned(stemCombinationPillars());
    const mechanism = seasonalMechanism(aligned, 'stem_five_combination');
    const context = forceContext(aligned.v15, mechanism);

    expect(aligned.v15.seasonalDispositionClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-target stem-combination seasonal-command effect',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination binding/interaction effect policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support/interference effect',
    );
    expect(context?.existingCapabilities.some((item) => item.startsWith('I50 categorical seasonal disposition:'))).toBe(true);
  });

  test('closes the root-combination seasonal-command gap for six-combination without reopening transformed-result scope', () => {
    const aligned = buildAligned(sixCombinationPillars());
    const mechanism = seasonalMechanism(aligned, 'branch_six_combination');
    const context = forceContext(aligned.v15, mechanism);

    expect(context?.unresolvedCapabilities).not.toContain('challenge-root combination seasonal-command effect');
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root six-combination binding/interaction effect policy',
    );
    expect(context?.unresolvedCapabilities).toContain('challenge-root combination support/interference effect');
    expect(aligned.seasonal.items.every((item) => item.transformedResultSeasonalDisposition === 'not_emitted')).toBe(true);
  });

  test('adds formed-three-bureau seasonal context but retains post-interaction bureau-state uncertainty', () => {
    const aligned = buildAligned(threeCombinationPillars());
    const mechanism = seasonalMechanism(aligned, 'branch_three_combination');
    const context = forceContext(aligned.v15, mechanism);
    const seasonalItem = aligned.seasonal.items.find(
      (item) => item.mechanism === mechanism && item.relationKind === 'branch_three_combination',
    );

    expect(context?.unresolvedCapabilities).not.toContain('challenge-root combination seasonal-command effect');
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(seasonalItem?.formedThreeCombinationBureau?.formationState).toBe('STRUCTURAL_BUREAU_FORMED');
    expect(seasonalItem?.formedThreeCombinationBureau?.postInteractionBureauState).toBe('not_determined');
    expect(context?.existingCapabilities.some((item) => item.includes('formed-bureau disposition'))).toBe(true);
  });

  test('fails closed on seasonal evidence from a different identity chain', () => {
    const current = buildAligned(threeCombinationPillars());
    const stale = buildAligned(stemCombinationPillars());
    const mechanism = seasonalMechanism(current, 'branch_three_combination');
    const report = buildI26ChallengeContextAvailabilityV15(
      current.v14,
      current.v13,
      current.conditions,
      current.formation,
      current.settlement,
      current.seasonalPolicy,
      stale.seasonal,
    );
    const context = forceContext(report, mechanism);

    expect(report.seasonalDispositionClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain('challenge-root combination seasonal-command effect');
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I50 seasonal-disposition evidence aligned to current I39/I45/I47/v14 identity',
    );
  });

  test('keeps deterministic partial effective-force context and all production guards closed', () => {
    const first = buildAligned(threeCombinationPillars());
    const second = buildAligned(threeCombinationPillars());

    expect(first.v15.reportId).toBe(second.v15.reportId);
    expect(first.v15.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      first.v15.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(first.v15.methodologyReadyForEffectResolution).toBe(false);
    expect(first.v15.challengeEffectVerdict).toBe('not_determined');
    expect(first.v15.relativeForceVerdictAuthorized).toBe(false);
    expect(first.v15.classificationAuthorized).toBe(false);
    expect(first.v15.numericScoringAuthorized).toBe(false);
  });
});
