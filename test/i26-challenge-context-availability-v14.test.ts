import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV13,
  buildI26ChallengeContextAvailabilityV14,
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

function embeddedTight(): StructuralPillarInput {
  return {
    year: pillar('무', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('계', '술'),
  };
}

function embeddedNonTight(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '신'),
    hour: pillar('경', '술'),
  };
}

function outsideNonTight(): StructuralPillarInput {
  return {
    year: pillar('임', '자'),
    month: pillar('병', '인'),
    day: pillar('갑', '오'),
    hour: pillar('정', '술'),
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

function buildV13(pillars: StructuralPillarInput) {
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
  const report = buildI26ChallengeContextAvailabilityV13(
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
  return { report, settlement };
}

function forceContext(
  report: ReturnType<typeof buildI26ChallengeContextAvailabilityV14>,
  mechanism: ChallengeMechanism,
) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function contextualMechanism(
  settlement: ReturnType<typeof buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence>,
): ChallengeMechanism {
  const item = settlement.items.find((candidate) =>
    candidate.clashes.some(
      (clash) => clash.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
    ),
  );
  if (item === undefined) throw new Error('Expected a contextual I47 item.');
  return item.mechanism;
}

function directBreakMechanism(
  settlement: ReturnType<typeof buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence>,
): ChallengeMechanism {
  const item = settlement.items.find(
    (candidate) => candidate.postInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
  );
  if (item === undefined) throw new Error('Expected a direct-break I47 item.');
  return item.mechanism;
}

function outsideNonTightMechanism(
  settlement: ReturnType<typeof buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence>,
): ChallengeMechanism {
  const item = settlement.items.find((candidate) =>
    candidate.clashes.some(
      (clash) => clash.placementClass === 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT',
    ),
  );
  if (item === undefined) throw new Error('Expected an outside-non-tight I47 item.');
  return item.mechanism;
}

describe('I26 v14 challenge context availability with source-bounded contextual ambiguity', () => {
  test('closes the placement-only contextual settlement methodology gap while retaining bureau-state uncertainty', () => {
    const v13 = buildV13(embeddedNonTight());
    const policy = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
    const report = buildI26ChallengeContextAvailabilityV14(v13.report, policy);
    const mechanism = contextualMechanism(v13.settlement);
    const context = forceContext(report, mechanism);

    expect(report.contextualSettlementMethodologyClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination contextual intact-vs-damaged settlement policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.existingCapabilities).toContain(
      'I48 source-bounded contextual bureau-state ambiguity: placement alone cannot select INTACT or DAMAGED',
    );
  });

  test('does not reopen or weaken the already-resolved tight embedded direct-break route', () => {
    const v13 = buildV13(embeddedTight());
    const policy = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
    const report = buildI26ChallengeContextAvailabilityV14(v13.report, policy);
    const mechanism = directBreakMechanism(v13.settlement);
    const context = forceContext(report, mechanism);

    expect(report.contextualSettlementMethodologyClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination contextual intact-vs-damaged settlement policy',
    );
    expect(context?.existingCapabilities).not.toContain(
      'I48 source-bounded contextual bureau-state ambiguity: placement alone cannot select INTACT or DAMAGED',
    );
  });

  test('does not manufacture contextual ambiguity for an outside non-tight no-direct-settlement route', () => {
    const v13 = buildV13(outsideNonTight());
    const policy = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
    const report = buildI26ChallengeContextAvailabilityV14(v13.report, policy);
    const mechanism = outsideNonTightMechanism(v13.settlement);
    const context = forceContext(report, mechanism);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.existingCapabilities).not.toContain(
      'I48 source-bounded contextual bureau-state ambiguity: placement alone cannot select INTACT or DAMAGED',
    );
  });

  test('fails closed when the I48 methodology contract is weakened', () => {
    const v13 = buildV13(embeddedNonTight());
    const policy = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
    const invalid = {
      ...policy,
      reviewId: `${policy.reviewId}_invalid`,
      placementOnlyDamagedVerdictAuthorized: true,
    } as unknown as typeof policy;
    const report = buildI26ChallengeContextAvailabilityV14(v13.report, invalid);
    const mechanism = contextualMechanism(v13.settlement);
    const context = forceContext(report, mechanism);

    expect(report.contextualSettlementMethodologyClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination contextual intact-vs-damaged settlement policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'authorized I48 source-bounded contextual ambiguity methodology',
    );
  });

  test('keeps effective-force context partial with deterministic identity and all production guards closed', () => {
    const v13 = buildV13(embeddedNonTight());
    const policy = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
    const first = buildI26ChallengeContextAvailabilityV14(v13.report, policy);
    const second = buildI26ChallengeContextAvailabilityV14(v13.report, policy);

    expect(first.reportId).toBe(second.reportId);
    expect(first.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      first.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(first.methodologyReadyForEffectResolution).toBe(false);
    expect(first.challengeEffectVerdict).toBe('not_determined');
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
