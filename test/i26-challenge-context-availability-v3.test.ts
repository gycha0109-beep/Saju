import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV2,
  buildI26ChallengeContextAvailabilityV3,
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
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

function anchoredPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('경', '유'),
  };
}

function hiddenOnlyOutputPillars(): StructuralPillarInput {
  return {
    year: pillar('임', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('경', '유'),
  };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV3>, mechanism: string) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

describe('I26 v3 challenge context availability with I29 root candidate evidence', () => {
  test('integrates aligned I29 non-earth root candidate evidence while preserving partial force context', () => {
    const review = reviewAllMechanisms();
    const pillars = anchoredPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
    const report = buildI26ChallengeContextAvailabilityV3(review, force, roots);
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.rootEvidenceAlignedWithForceEvidence).toBe(true);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.existingCapabilities).toContain(
      'I29 challenge-specific non-earth intrinsic root candidate evidence',
    );
    expect(output?.unresolvedCapabilities).toContain('target-element intrinsic root-quality verdict');
    expect(output?.unresolvedCapabilities).toContain('target-element post-relation force state');
    expect(output?.unresolvedCapabilities).toContain('effective mechanism force verdict');
    expect(output?.unresolvedCapabilities).toContain('relation-specific usefulness/harmfulness');
    expect(output?.unresolvedCapabilities).not.toContain('target-element intrinsic root quality');
  });

  test('records hidden-only target presence as a distinct unresolved intrinsic-force treatment instead of root quality', () => {
    const review = reviewAllMechanisms();
    const pillars = hiddenOnlyOutputPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
    const report = buildI26ChallengeContextAvailabilityV3(review, force, roots);
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.existingCapabilities).toContain(
      'I29 no-visible-target-stem anchor state; hidden-only target presence not promoted to root quality',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'non-visible target-element intrinsic force treatment',
    );
    expect(output?.unresolvedCapabilities).not.toContain('target-element intrinsic root-quality verdict');
  });

  test('keeps the earth target convention and intrinsic root-quality verdict unresolved', () => {
    const review = reviewAllMechanisms();
    const pillars = anchoredPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
    const report = buildI26ChallengeContextAvailabilityV3(review, force, roots);
    const wealth = forceContext(report, 'WEALTH_EXPENDITURE_CONTROL');

    expect(wealth?.existingCapabilities).toContain(
      'I29 earth target intrinsic root candidate evidence with class unresolved',
    );
    expect(wealth?.unresolvedCapabilities).toContain('earth target-element root-class convention');
    expect(wealth?.unresolvedCapabilities).toContain('target-element intrinsic root-quality verdict');
    expect(wealth?.availability).toBe('PARTIAL_SUBSTRATE');
  });

  test('fails closed against cross-report mixing and preserves non-force I26 v2 dependencies unchanged', () => {
    const review = reviewAllMechanisms();
    const pillars = anchoredPillars();
    const mismatchedPillars = hiddenOnlyOutputPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(mismatchedPillars);
    const v2 = buildI26ChallengeContextAvailabilityV2(review, force);
    const v3 = buildI26ChallengeContextAvailabilityV3(review, force, roots);
    const output = forceContext(v3, 'OUTPUT_LEAKAGE');

    expect(v3.rootEvidenceAlignedWithForceEvidence).toBe(false);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.existingCapabilities.some((capability) => capability.startsWith('I29 '))).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I29 mechanism-specific intrinsic root candidate evidence aligned to current I27 force evidence',
    );

    for (const v2Mechanism of v2.mechanisms) {
      const v3Mechanism = v3.mechanisms.find((item) => item.mechanism === v2Mechanism.mechanism);
      expect(
        v3Mechanism?.requiredContexts.filter(
          (context) => context.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        ),
      ).toEqual(
        v2Mechanism.requiredContexts.filter(
          (context) => context.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        ),
      );
    }
  });

  test('never upgrades candidate availability into effect resolution, classification, scoring, or nondeterministic identity', () => {
    const review = reviewAllMechanisms();
    const pillars = anchoredPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
    const report = buildI26ChallengeContextAvailabilityV3(review, force, roots);
    const repeated = buildI26ChallengeContextAvailabilityV3(review, force, roots);

    expect(report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(report.mechanisms.every((item) => item.partialDependencies.includes('MECHANISM_EFFECTIVE_FORCE_CONTEXT'))).toBe(true);
    expect(report.allRequiredContextsHaveSubstrate).toBe(true);
    expect(report.methodologyReadyForEffectResolution).toBe(false);
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
