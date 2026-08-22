import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV7,
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
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

function threeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function sparsePillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '묘'),
    hour: pillar('경', '유'),
  };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV7>, mechanism: string) {
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
  const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, policy);
  const report = buildI26ChallengeContextAvailabilityV7(
    review,
    force,
    roots,
    relations,
    clashes,
    combinations,
    policy,
    references,
  );
  return { review, force, roots, relations, clashes, combinations, policy, references, report };
}

describe('I26 v7 challenge context availability with I37 transformation-reference metadata', () => {
  test('refines a stem target-element policy into explicit day-stem scope-transfer and challenge-adoption dependencies', () => {
    const { report } = buildAligned(stemCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.transformationReferenceAlignedWithCombinationEvidence).toBe(true);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-target stem-combination transformation target-element policy',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-target stem-combination day-stem reference scope-transfer policy',
        'challenge-target stem-combination challenge-specific transformation target-element adoption policy',
        'challenge-target stem-combination transformation-condition policy',
        'challenge-target stem-combination seasonal-command effect',
      ]),
    );
    expect(
      output?.existingCapabilities.some((item) =>
        item.startsWith('I37 aligned transformation-reference metadata:'),
      ),
    ).toBe(true);
  });

  test('refines a complete three-combination reference into bureau-adoption and effective-bureau qualification dependencies', () => {
    const { report } = buildAligned(threeCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root combination transformation target-element policy',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root three-combination bureau-reference-to-current-state adoption policy',
        'challenge-root three-combination effective-bureau qualification policy',
        'challenge-root combination transformation-condition policy',
        'challenge-root combination post-relation root-state verdict',
      ]),
    );
  });

  test('keeps six-combination target mapping unresolved as a dedicated convention dependency', () => {
    const { report } = buildAligned(sixCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'challenge-root combination transformation target-element policy',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root six-combination transformed-element reference convention',
        'challenge-root six-combination transformation target-element policy',
        'challenge-root combination transformation-condition policy',
      ]),
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root clash relative branch force verdict',
        'challenge-root clash winner verdict',
      ]),
    );
  });

  test('fails closed on a cross-material I37 report and preserves the v6 generic target-element policy', () => {
    const review = reviewAllMechanisms();
    const pillars = stemCombinationPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
    const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
    const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(pillars, roots, relations);
    const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      pillars,
      roots,
      relations,
    );
    const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();

    const sparse = sparsePillars();
    const sparseRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparse);
    const sparseRelations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      sparse,
      sparseRoots,
    );
    const sparseCombinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      sparse,
      sparseRoots,
      sparseRelations,
    );
    const sparseReferences = buildI37ChallengeTargetCombinationTransformationReference(
      sparseCombinations,
      policy,
    );

    const report = buildI26ChallengeContextAvailabilityV7(
      review,
      force,
      roots,
      relations,
      clashes,
      combinations,
      policy,
      sparseReferences,
    );
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.transformationReferenceAlignedWithCombinationEvidence).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination transformation target-element policy',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I37 transformation-reference metadata aligned to current I35/I36 identity',
    );
    expect(output?.existingCapabilities.some((item) => item.startsWith('I37 '))).toBe(false);
  });

  test('never promotes reference metadata into transformation, force/effect resolution, classification, scoring, or nondeterministic identity', () => {
    const { review, force, roots, relations, clashes, combinations, policy, references, report } =
      buildAligned(sixCombinationPillars());
    const repeated = buildI26ChallengeContextAvailabilityV7(
      review,
      force,
      roots,
      relations,
      clashes,
      combinations,
      policy,
      references,
    );

    expect(report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(
      report.mechanisms.every((item) =>
        item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'),
      ),
    ).toBe(true);
    expect(report.allRequiredContextsHaveSubstrate).toBe(true);
    expect(report.methodologyReadyForEffectResolution).toBe(false);
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
