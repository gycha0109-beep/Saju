import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV12,
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview,
  buildI41ChallengeCombinationConditionDependencyGraph,
  buildI42ChallengeTargetStemTransformationScopeMethodologyReview,
  buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview,
  buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview,
  buildI45ChallengeRootThreeCombinationBureauFormationEvidence,
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
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

function threeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
  };
}

function clashThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('무', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('계', '술'),
  };
}

function stemCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
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

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV12>, mechanism: string) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
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
  };
}

function buildAligned(pillars: StructuralPillarInput) {
  const input = buildInputs(pillars);
  const report = buildI26ChallengeContextAvailabilityV12(
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
  );
  return { ...input, report };
}

describe('I26 v12 challenge context availability with I45 structural bureau formation', () => {
  test('moves full-three structural bureau formation from unresolved policy to existing capability', () => {
    const { report } = buildAligned(threeCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.threeCombinationBureauFormationClosureAccepted).toBe(true);
    expect(
      output?.existingCapabilities.some((item) => item.startsWith('I45 structural three-combination bureau formation:')),
    ).toBe(true);
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination dependency-graph composition evaluation policy',
    );
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination effective-bureau dependency-graph evaluation policy',
    );
  });

  test('removes adjacency and lead-out as full-three formation blockers while retaining post-interaction policy', () => {
    const { report } = buildAligned(threeCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination adjacency/spacing effect policy',
    );
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination lead-out sufficiency/effect policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root combination competing-relation interaction/settlement policy',
    );
    expect(output?.unresolvedCapabilities).toContain('challenge-root combination seasonal-command effect');
    expect(output?.unresolvedCapabilities).toContain('challenge-root combination support/interference effect');
  });

  test('redirects observed clash topology to break/damage settlement without deciding bureau survival', () => {
    const { report } = buildAligned(clashThreeCombinationPillars());
    const wealth = forceContext(report, 'WEALTH_EXPENDITURE_CONTROL');

    expect(report.threeCombinationBureauFormationClosureAccepted).toBe(true);
    expect(wealth?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination clash-topology impact/settlement policy',
    );
    expect(wealth?.unresolvedCapabilities).toContain(
      'challenge-root three-combination clash break/damage settlement policy',
    );
    expect(wealth?.unresolvedCapabilities).toContain(
      'challenge-root three-combination post-interaction bureau-state policy',
    );
  });

  test('fails closed when I45 is not aligned to the exact I39 identity', () => {
    const input = buildInputs(threeCombinationPillars());
    const invalidFormation = {
      ...input.threeFormation,
      reportId: `${input.threeFormation.reportId}_invalid`,
      upstreamI39ReportId: `${input.conditions.reportId}_stale`,
    } as typeof input.threeFormation;
    const report = buildI26ChallengeContextAvailabilityV12(
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
      invalidFormation,
    );
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.threeCombinationBureauFormationClosureAccepted).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root three-combination effective-bureau dependency-graph evaluation policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I45 structural bureau-formation evidence aligned to current I39/I44 identity',
    );
  });

  test('keeps stem paths unchanged and preserves deterministic no-effect/no-scoring guards', () => {
    const stem = buildAligned(stemCombinationPillars());
    const repeated = buildAligned(threeCombinationPillars());
    const aligned = buildAligned(threeCombinationPillars());
    const stemOutput = forceContext(stem.report, 'OUTPUT_LEAKAGE');

    expect(stemOutput?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination binding/interaction effect policy',
    );
    expect(aligned.report.reportId).toBe(repeated.report.reportId);
    expect(aligned.report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      aligned.report.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(aligned.report.methodologyReadyForEffectResolution).toBe(false);
    expect(aligned.report.challengeEffectVerdict).toBe('not_determined');
    expect(aligned.report.relativeForceVerdictAuthorized).toBe(false);
    expect(aligned.report.classificationAuthorized).toBe(false);
    expect(aligned.report.numericScoringAuthorized).toBe(false);
  });
});
