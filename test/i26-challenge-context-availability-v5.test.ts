import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV4,
  buildI26ChallengeContextAvailabilityV5,
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
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

function relationHeavyPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
  };
}

function sparseRelationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '묘'),
    hour: pillar('경', '유'),
  };
}

function rescuePillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV5>, mechanism: string) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function buildAligned(pillars: StructuralPillarInput) {
  const review = reviewAllMechanisms();
  const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const clashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(
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
    v4: buildI26ChallengeContextAvailabilityV4(review, force, roots, relations),
    report: buildI26ChallengeContextAvailabilityV5(
      review,
      force,
      roots,
      relations,
      clashes,
    ),
  };
}

describe('I26 v5 challenge context availability with I33 clash dependency evidence', () => {
  test('refines the generic root-clash gap into aligned seasonal/support/winner/root-state dependencies', () => {
    const { report } = buildAligned(relationHeavyPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.clashDependencyEvidenceAlignedWithRelationEvidence).toBe(true);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.existingCapabilities.some((item) => item.startsWith('I33 aligned challenge-root clash dependency evidence:'))).toBe(true);
    expect(output?.unresolvedCapabilities).not.toContain('root-candidate clash effect resolution');
    expect(output?.unresolvedCapabilities).toContain('challenge-root clash relative branch force verdict');
    expect(output?.unresolvedCapabilities).toContain('challenge-root clash support effect');
    expect(output?.unresolvedCapabilities).toContain('challenge-root clash winner verdict');
    expect(output?.unresolvedCapabilities).toContain('challenge-root clash target post-relation root-state verdict');
    expect(output?.unresolvedCapabilities).toContain('effective mechanism force verdict');
  });

  test('adds rescue-strength/effect and settlement gaps only when aligned rescue topology actually exists', () => {
    const { report } = buildAligned(rescuePillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).toContain('challenge-root clash rescue strength/effect');
    expect(output?.unresolvedCapabilities).toContain('challenge-root clash settlement');
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
  });

  test('leaves a mechanism with no routed root-clash gap unchanged from v4', () => {
    const { v4, report } = buildAligned(sparseRelationPillars());
    const v4Output = v4.mechanisms
      .find((item) => item.mechanism === 'OUTPUT_LEAKAGE')
      ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
    const v5Output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.clashDependencyEvidenceAlignedWithRelationEvidence).toBe(true);
    expect(v5Output).toEqual(v4Output);
  });

  test('fails closed when I33 evidence comes from different pillar/root/relation identity', () => {
    const review = reviewAllMechanisms();
    const heavy = relationHeavyPillars();
    const sparse = sparseRelationPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(heavy);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(heavy);
    const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(heavy, roots);
    const sparseRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparse);
    const sparseRelations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(sparse, sparseRoots);
    const sparseClashes = buildResolvedI33ChallengeTargetClashDependencyEvidence(
      sparse,
      sparseRoots,
      sparseRelations,
    );
    const report = buildI26ChallengeContextAvailabilityV5(
      review,
      force,
      roots,
      relations,
      sparseClashes,
    );
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.clashDependencyEvidenceAlignedWithRelationEvidence).toBe(false);
    expect(output?.unresolvedCapabilities).toContain('root-candidate clash effect resolution');
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I33 challenge-root clash dependency evidence aligned to current I31/I29 identity',
    );
    expect(output?.existingCapabilities.some((item) => item.startsWith('I33 '))).toBe(false);
  });

  test('never upgrades clash dependency availability into effect resolution, scoring, classification, or nondeterministic identity', () => {
    const { review, force, roots, relations, clashes, report } = buildAligned(relationHeavyPillars());
    const repeated = buildI26ChallengeContextAvailabilityV5(
      review,
      force,
      roots,
      relations,
      clashes,
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
