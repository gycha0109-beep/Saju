import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV5,
  buildI26ChallengeContextAvailabilityV6,
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

function sparsePillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '묘'),
    hour: pillar('경', '유'),
  };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV6>, mechanism: string) {
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
  return {
    review,
    force,
    roots,
    relations,
    clashes,
    combinations,
    v5: buildI26ChallengeContextAvailabilityV5(review, force, roots, relations, clashes),
    report: buildI26ChallengeContextAvailabilityV6(
      review,
      force,
      roots,
      relations,
      clashes,
      combinations,
    ),
  };
}

describe('I26 v6 challenge context availability with I35 combination dependency evidence', () => {
  test('refines a routed target-stem combination gap into explicit transformation/context dependencies', () => {
    const { report } = buildAligned(stemCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.combinationDependencyEvidenceAlignedWithRelationEvidence).toBe(true);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.unresolvedCapabilities).not.toContain(
      'target-stem combination transformation/effect resolution',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-target stem-combination transformation-condition policy',
        'challenge-target stem-combination transformation target-element policy',
        'challenge-target stem-combination seasonal-command effect',
        'challenge-target stem-combination support/interference effect',
        'challenge-target stem-combination competing-relation precedence',
        'challenge-target stem post-combination state verdict',
      ]),
    );
    expect(output?.existingCapabilities.some((item) => item.startsWith('I35 aligned challenge-target combination dependency evidence:'))).toBe(true);
  });

  test('refines a routed root-candidate combination gap while preserving I33 clash refinements', () => {
    const { report } = buildAligned(sixCombinationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).not.toContain(
      'root-candidate combination transformation/effect resolution',
    );
    expect(output?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'challenge-root combination transformation-condition policy',
        'challenge-root combination transformation target-element policy',
        'challenge-root combination seasonal-command effect',
        'challenge-root combination support/interference effect',
        'challenge-root combination competing-relation precedence',
        'challenge-root combination post-relation root-state verdict',
        'challenge-root clash relative branch force verdict',
        'challenge-root clash winner verdict',
      ]),
    );
    expect(output?.existingCapabilities.some((item) => item.startsWith('I33 aligned challenge-root clash dependency evidence:'))).toBe(true);
    expect(output?.existingCapabilities.some((item) => item.startsWith('I35 aligned challenge-target combination dependency evidence:'))).toBe(true);
  });

  test('leaves mechanisms without routed combination gaps unchanged from v5', () => {
    const { v5, report } = buildAligned(sparsePillars());
    const v5Output = v5.mechanisms
      .find((item) => item.mechanism === 'OUTPUT_LEAKAGE')
      ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
    const v6Output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.combinationDependencyEvidenceAlignedWithRelationEvidence).toBe(true);
    expect(v6Output).toEqual(v5Output);
  });

  test('fails closed on cross-material I35 evidence and retains generic combination gaps', () => {
    const review = reviewAllMechanisms();
    const heavy = stemCombinationPillars();
    const sparse = sparsePillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(heavy);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(heavy);
    const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(heavy, roots);
    const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(heavy, roots, relations);
    const sparseRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparse);
    const sparseRelations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(sparse, sparseRoots);
    const sparseCombinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      sparse,
      sparseRoots,
      sparseRelations,
    );
    const report = buildI26ChallengeContextAvailabilityV6(
      review,
      force,
      roots,
      relations,
      clashes,
      sparseCombinations,
    );
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.combinationDependencyEvidenceAlignedWithRelationEvidence).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'target-stem combination transformation/effect resolution',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I35 challenge-target combination dependency evidence aligned to current I31/I29 identity',
    );
    expect(output?.existingCapabilities.some((item) => item.startsWith('I35 '))).toBe(false);
  });

  test('never promotes combination dependency evidence into force/effect resolution, classification, scoring, or nondeterministic identity', () => {
    const { review, force, roots, relations, clashes, combinations, report } = buildAligned(
      sixCombinationPillars(),
    );
    const repeated = buildI26ChallengeContextAvailabilityV6(
      review,
      force,
      roots,
      relations,
      clashes,
      combinations,
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
