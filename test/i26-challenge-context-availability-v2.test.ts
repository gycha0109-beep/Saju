import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailability,
  buildI26ChallengeContextAvailabilityV2,
  buildResolvedI27ChallengeMechanismForceEvidence,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
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

function resolvedForceEvidence() {
  return buildResolvedI27ChallengeMechanismForceEvidence({
    year: pillar('임', '자'),
    month: pillar('병', '인'),
    day: pillar('갑', '진'),
    hour: pillar('경', '유'),
  });
}

describe('I26 v2 challenge context evidence availability matrix', () => {
  test('upgrades mechanism-effective force from missing to partial when I27 evidence is resolved', () => {
    const report = buildI26ChallengeContextAvailabilityV2(
      reviewAllMechanisms(),
      resolvedForceEvidence(),
    );

    expect(report.forceEvidenceStatus).toBe('RESOLVED_EVIDENCE');
    expect(report.mechanisms).toHaveLength(3);
    for (const mechanism of report.mechanisms) {
      expect(mechanism.missingDependencies).toEqual([]);
      expect(mechanism.partialDependencies).toContain('MECHANISM_EFFECTIVE_FORCE_CONTEXT');
      expect(mechanism.effectReady).toBe(false);
    }
    expect(report.allRequiredContextsHaveSubstrate).toBe(true);
  });

  test('records structural-force evidence while preserving unresolved target-force requirements', () => {
    const report = buildI26ChallengeContextAvailabilityV2(
      reviewAllMechanisms(),
      resolvedForceEvidence(),
    );
    const forceContext = report.mechanisms[0]?.requiredContexts.find(
      (context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
    );

    expect(forceContext?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(forceContext?.existingCapabilities).toEqual(
      expect.arrayContaining([
        'I27 mechanism target-element seasonal phase',
        'I27 visible target-element stem positions',
        'I27 target-element branch-main-element positions',
        'I27 target-element hidden-membership positions',
      ]),
    );
    expect(forceContext?.unresolvedCapabilities).toEqual(
      expect.arrayContaining([
        'target-element intrinsic root quality',
        'target-element post-relation force state',
        'effective mechanism force verdict',
        'relation-specific usefulness/harmfulness',
      ]),
    );
  });

  test('preserves every non-force dependency from the I26 v1 availability matrix', () => {
    const review = reviewAllMechanisms();
    const v1 = buildI26ChallengeContextAvailability(review);
    const v2 = buildI26ChallengeContextAvailabilityV2(review, resolvedForceEvidence());

    for (const v1Mechanism of v1.mechanisms) {
      const v2Mechanism = v2.mechanisms.find(
        (mechanism) => mechanism.mechanism === v1Mechanism.mechanism,
      );
      expect(
        v2Mechanism?.requiredContexts.filter(
          (context) => context.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        ),
      ).toEqual(
        v1Mechanism.requiredContexts.filter(
          (context) => context.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        ),
      );
    }
  });

  test('fails closed when I27 cannot resolve all four pillars', () => {
    const unresolvedForceEvidence = buildResolvedI27ChallengeMechanismForceEvidence({
      month: pillar('병', '인'),
      day: pillar('갑', '진'),
    });
    const report = buildI26ChallengeContextAvailabilityV2(
      reviewAllMechanisms(),
      unresolvedForceEvidence,
    );

    expect(report.forceEvidenceStatus).toBe('PILLARS_UNRESOLVED');
    for (const mechanism of report.mechanisms) {
      expect(mechanism.missingDependencies).toContain('MECHANISM_EFFECTIVE_FORCE_CONTEXT');
    }
    expect(report.allRequiredContextsHaveSubstrate).toBe(false);
  });

  test('never converts substrate availability into effect, scoring, or classification authority', () => {
    const review = reviewAllMechanisms();
    const forceEvidence = resolvedForceEvidence();
    const report = buildI26ChallengeContextAvailabilityV2(review, forceEvidence);

    expect(report.reportId).toBe(
      buildI26ChallengeContextAvailabilityV2(review, forceEvidence).reportId,
    );
    expect(report.methodologyReadyForEffectResolution).toBe(false);
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });
});
