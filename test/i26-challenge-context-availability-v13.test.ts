import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV13,
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

function buildInputs(pillars: StructuralPillarInput) {
  const review = reviewAllMechanisms();
  const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(pillars, roots, relations);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const conditionApplicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    conditionApplicability,
  );
  const conditionComposition = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
  const dependencyGraph = buildI41ChallengeCombinationConditionDependencyGraph(conditions, conditionComposition);
  const stemScope = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();
  const sixScope = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();
  const threePolicy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
  const threeFormation = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(conditions, threePolicy);
  const clashSettlementPolicy = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
  const clashSettlementEvidence = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
    pillars,
    threeFormation,
    clashSettlementPolicy,
  );
  return {
    review,
    force,
    roots,
    relations,
    clashes,
    combinations,
    transformationPolicy,
    references,
    conditionApplicability,
    conditions,
    conditionComposition,
    dependencyGraph,
    stemScope,
    sixScope,
    threePolicy,
    threeFormation,
    clashSettlementPolicy,
    clashSettlementEvidence,
  };
}

function buildAligned(pillars: StructuralPillarInput) {
  const input = buildInputs(pillars);
  const report = buildI26ChallengeContextAvailabilityV13(
    input.review,
    input.force,
    input.roots,
    input.relations,
    input.clashes,
    input.combinations,
    input.transformationPolicy,
    input.references,
    input.conditionApplicability,
    input.conditions,
    input.conditionComposition,
    input.dependencyGraph,
    input.stemScope,
    input.sixScope,
    input.threePolicy,
    input.threeFormation,
    input.clashSettlementPolicy,
    input.clashSettlementEvidence,
  );
  return { ...input, report };
}

function forceContext(
  report: ReturnType<typeof buildI26ChallengeContextAvailabilityV13>,
  mechanism: ChallengeMechanism,
) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function mechanismForDirectBreak(
  evidence: ReturnType<typeof buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence>,
): ChallengeMechanism {
  const item = evidence.items.find(
    (candidate) => candidate.postInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
  );
  if (item === undefined) throw new Error('Expected one direct-break I47 item in fixture.');
  return item.mechanism;
}

function mechanismForContextual(
  evidence: ReturnType<typeof buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence>,
): ChallengeMechanism {
  const item = evidence.items.find((candidate) =>
    candidate.clashes.some(
      (clash) => clash.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
    ),
  );
  if (item === undefined) throw new Error('Expected one contextual I47 item in fixture.');
  return item.mechanism;
}

function mechanismForOutsideNonTight(
  evidence: ReturnType<typeof buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence>,
): ChallengeMechanism {
  const item = evidence.items.find((candidate) =>
    candidate.clashes.some(
      (clash) => clash.placementClass === 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT',
    ),
  );
  if (item === undefined) throw new Error('Expected one outside-non-tight I47 item in fixture.');
  return item.mechanism;
}

describe('I26 v13 challenge context availability with I47 clash placement settlement', () => {
  test('closes the generic clash and bureau-state gaps for a mechanism whose routed bureau is directly broken', () => {
    const { report, clashSettlementEvidence } = buildAligned(embeddedTight());
    const mechanism = mechanismForDirectBreak(clashSettlementEvidence);
    const context = forceContext(report, mechanism);

    expect(report.clashPlacementSettlementClosureAccepted).toBe(true);
    expect(
      context?.existingCapabilities.some((item) =>
        item.startsWith('I47 three-combination clash placement settlement:'),
      ),
    ).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination clash break/damage settlement policy',
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination contextual intact-vs-damaged settlement policy',
    );
  });

  test('refines an embedded non-tight clash to contextual intact-vs-damaged settlement', () => {
    const { report, clashSettlementEvidence } = buildAligned(embeddedNonTight());
    const mechanism = mechanismForContextual(clashSettlementEvidence);
    const context = forceContext(report, mechanism);

    expect(report.clashPlacementSettlementClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination clash break/damage settlement policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination contextual intact-vs-damaged settlement policy',
    );
  });

  test('removes the generic clash-settlement gap but retains the broad bureau-state question for outside non-tight clash', () => {
    const { report, clashSettlementEvidence } = buildAligned(outsideNonTight());
    const mechanism = mechanismForOutsideNonTight(clashSettlementEvidence);
    const context = forceContext(report, mechanism);

    expect(report.clashPlacementSettlementClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination clash break/damage settlement policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination contextual intact-vs-damaged settlement policy',
    );
  });

  test('fails closed on stale I47 evidence and retains the v12 settlement gaps', () => {
    const input = buildInputs(embeddedTight());
    const stale = {
      ...input.clashSettlementEvidence,
      reportId: `${input.clashSettlementEvidence.reportId}_stale`,
      upstreamI45ReportId: `${input.threeFormation.reportId}_stale`,
    } as typeof input.clashSettlementEvidence;
    const report = buildI26ChallengeContextAvailabilityV13(
      input.review,
      input.force,
      input.roots,
      input.relations,
      input.clashes,
      input.combinations,
      input.transformationPolicy,
      input.references,
      input.conditionApplicability,
      input.conditions,
      input.conditionComposition,
      input.dependencyGraph,
      input.stemScope,
      input.sixScope,
      input.threePolicy,
      input.threeFormation,
      input.clashSettlementPolicy,
      stale,
    );
    const mechanism = input.threeFormation.items[0]?.mechanism;
    if (mechanism === undefined) throw new Error('Expected one three-combination formation item.');
    const context = forceContext(report, mechanism);

    expect(report.clashPlacementSettlementClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination clash break/damage settlement policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I47 clash placement settlement evidence aligned to current I45/I46 identity',
    );
  });

  test('keeps effective-force context partial and all scoring/classification guards closed', () => {
    const first = buildAligned(embeddedTight());
    const second = buildAligned(embeddedTight());

    expect(first.report.reportId).toBe(second.report.reportId);
    expect(first.report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      first.report.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(first.report.methodologyReadyForEffectResolution).toBe(false);
    expect(first.report.challengeEffectVerdict).toBe('not_determined');
    expect(first.report.relativeForceVerdictAuthorized).toBe(false);
    expect(first.report.classificationAuthorized).toBe(false);
    expect(first.report.numericScoringAuthorized).toBe(false);
  });
});
