import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV8,
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
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

const STEM: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
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

const BRANCH: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
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
  return {
    stem: { value: stem, ...STEM[stem] },
    branch: { value: branch, ...BRANCH[branch] },
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

function contiguousThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function separatedThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('경', '술'),
  };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV8>, mechanism: string) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function buildAligned(pillars: StructuralPillarInput) {
  const review = reviewAllMechanisms();
  const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(pillars, roots, relations);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
    pillars,
    roots,
    relations,
  );
  const transformationPolicy =
    buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(
    combinations,
    transformationPolicy,
  );
  const conditionApplicability =
    buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    conditionApplicability,
  );
  const report = buildI26ChallengeContextAvailabilityV8(
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
    report,
  };
}

describe('I26 v8 challenge context availability with I39 condition evidence', () => {
  test('replaces the generic stem transformation-condition gap with a condition-composition policy while preserving effect dependencies', () => {
    const { report } = buildAligned(stemCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.conditionEvidenceAlignedWithCombinationChain).toBe(true);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-target stem-combination transformation-condition policy',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-target stem-combination condition-composition decision policy',
        'challenge-target stem-combination seasonal-command effect',
        'challenge-target stem-combination support/interference effect',
        'challenge-target stem-combination competing-relation precedence',
        'challenge-target stem-combination day-stem reference scope-transfer policy',
      ]),
    );
    expect(
      output?.existingCapabilities.some((item) => item.startsWith('I39 aligned combination condition evidence:')),
    ).toBe(true);
  });

  test('replaces generic three-combination condition/qualification gaps with explicit composition, adjacency, lead-out, and effective-bureau verdict policies', () => {
    const { report } = buildAligned(contiguousThreeCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root combination transformation-condition policy',
    );
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root three-combination effective-bureau qualification policy',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root three-combination condition-composition decision policy',
        'challenge-root three-combination adjacency/spacing effect policy',
        'challenge-root three-combination lead-out sufficiency/effect policy',
        'challenge-root three-combination effective-bureau verdict policy',
        'challenge-root three-combination bureau-reference-to-current-state adoption policy',
        'challenge-root combination seasonal-command effect',
        'challenge-root combination support/interference effect',
      ]),
    );
  });

  test('adds a dedicated clash-topology impact/settlement dependency when I39 records a clash touching the three-combination', () => {
    const { report } = buildAligned(separatedThreeCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root three-combination clash-topology impact/settlement policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root three-combination adjacency/spacing effect policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-root clash winner verdict',
    );
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
  });

  test('refines six-combination condition composition while preserving the unresolved transformation convention and target-element policy', () => {
    const { report } = buildAligned(sixCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root combination transformation-condition policy',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root six-combination condition-composition decision policy',
        'challenge-root six-combination transformed-element reference convention',
        'challenge-root six-combination transformation target-element policy',
        'challenge-root combination seasonal-command effect',
        'challenge-root combination support/interference effect',
      ]),
    );
  });

  test('fails closed on cross-material I39 evidence and keeps deterministic partial/no-effect/no-scoring guards', () => {
    const aligned = buildAligned(stemCombinationPillars());
    const other = buildAligned(sixCombinationPillars());
    const rejected = buildI26ChallengeContextAvailabilityV8(
      aligned.review,
      aligned.force,
      aligned.roots,
      aligned.relations,
      aligned.clashes,
      aligned.combinations,
      aligned.transformationPolicy,
      aligned.references,
      aligned.conditionApplicability,
      other.conditions,
    );
    const output = forceContext(rejected, 'OUTPUT_LEAKAGE');
    const repeated = buildI26ChallengeContextAvailabilityV8(
      aligned.review,
      aligned.force,
      aligned.roots,
      aligned.relations,
      aligned.clashes,
      aligned.combinations,
      aligned.transformationPolicy,
      aligned.references,
      aligned.conditionApplicability,
      aligned.conditions,
    );

    expect(rejected.conditionEvidenceAlignedWithCombinationChain).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination transformation-condition policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I39 combination condition evidence aligned to current I35/I37/I38 identity',
    );
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
    expect(aligned.report.reportId).toBe(repeated.reportId);
  });
});
