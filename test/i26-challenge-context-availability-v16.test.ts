import { describe, expect, test } from 'vitest';
import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
} from '../src/contracts/calculation.js';
import type { StructuralPillarInput } from '../src/calculation/structural-relations.js';
import {
  buildI24ChallengeMechanismComposition,
  type ChallengeMechanism,
} from '../src/research/i24-challenge-mechanism-composition.js';
import { buildI25ChallengeEffectMethodologyReview } from '../src/research/i25-challenge-effect-methodology-review.js';
import { buildI26ChallengeContextAvailabilityV13 } from '../src/research/i26-challenge-context-availability-v13.js';
import { buildI26ChallengeContextAvailabilityV14 } from '../src/research/i26-challenge-context-availability-v14.js';
import { buildI26ChallengeContextAvailabilityV15 } from '../src/research/i26-challenge-context-availability-v15.js';
import { buildI26ChallengeContextAvailabilityV16 } from '../src/research/i26-challenge-context-availability-v16.js';
import { buildResolvedI27ChallengeMechanismForceEvidence } from '../src/research/i27-challenge-mechanism-force-evidence.js';
import { buildResolvedI29ChallengeTargetIntrinsicRootEvidence } from '../src/research/i29-challenge-target-intrinsic-root-evidence.js';
import { buildResolvedI31ChallengeTargetRelationParticipationEvidence } from '../src/research/i31-challenge-target-relation-participation-evidence.js';
import { buildResolvedI33ChallengeTargetClashDependencyEvidence } from '../src/research/i33-challenge-target-clash-dependency-evidence.js';
import { buildResolvedI35ChallengeTargetCombinationDependencyEvidence } from '../src/research/i35-challenge-target-combination-dependency-evidence.js';
import { buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview } from '../src/research/i36-challenge-target-combination-transformation-policy-methodology-review.js';
import { buildI37ChallengeTargetCombinationTransformationReference } from '../src/research/i37-challenge-target-combination-transformation-reference.js';
import { buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview } from '../src/research/i38-challenge-target-combination-condition-applicability-methodology-review.js';
import { buildResolvedI39ChallengeTargetCombinationConditionEvidence } from '../src/research/i39-challenge-target-combination-condition-evidence.js';
import { buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview } from '../src/research/i40-challenge-combination-condition-composition-precedence-methodology-review.js';
import { buildI41ChallengeCombinationConditionDependencyGraph } from '../src/research/i41-challenge-combination-condition-dependency-graph.js';
import { buildI42ChallengeTargetStemTransformationScopeMethodologyReview } from '../src/research/i42-challenge-target-stem-transformation-scope-methodology-review.js';
import { buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview } from '../src/research/i43-challenge-root-six-combination-transformation-convention-scope-methodology-review.js';
import { buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview } from '../src/research/i44-challenge-root-three-combination-effective-bureau-qualification-methodology-review.js';
import { buildI45ChallengeRootThreeCombinationBureauFormationEvidence } from '../src/research/i45-challenge-root-three-combination-bureau-formation-evidence.js';
import { buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview } from '../src/research/i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import { buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence } from '../src/research/i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import { buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview } from '../src/research/i48-challenge-root-three-combination-contextual-damage-settlement-methodology-review.js';
import { buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview } from '../src/research/i49-challenge-combination-seasonal-command-effect-methodology-review.js';
import { buildI50ChallengeCombinationSeasonalDispositionEvidence } from '../src/research/i50-challenge-combination-seasonal-disposition-evidence.js';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview } from '../src/research/i51-challenge-combination-support-interference-effect-methodology-review.js';
import { buildI52ChallengeCombinationSupportChannelEvidence } from '../src/research/i52-challenge-combination-support-channel-evidence.js';

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
