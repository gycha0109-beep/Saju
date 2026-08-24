import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailabilityV3,
  buildI26ChallengeContextAvailabilityV4,
  buildResolvedI27ChallengeMechanismForceEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
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

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV4>, mechanism: string) {
  return report.mechanisms
    .find((item) => item.mechanism === mechanism)
    ?.requiredContexts.find((context) => context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT');
}

function buildAligned(pillars: StructuralPillarInput) {
  const review = reviewAllMechanisms();
  const force = buildResolvedI27ChallengeMechanismForceEvidence(pillars);
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  return {
    review,
    force,
    roots,
    relations,
    report: buildI26ChallengeContextAvailabilityV4(review, force, roots, relations),
  };
}

describe('I26 v4 challenge context availability with I31 relation participation evidence', () => {
  test('integrates aligned I31 relation routing while preserving partial force context', () => {
    const { report } = buildAligned(relationHeavyPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(report.relationEvidenceAlignedWithRootEvidence).toBe(true);
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(output?.existingCapabilities).toContain(
      'I31 challenge-target relation participation routing state: TRACKED_RELATION_REVIEW_REQUIRED',
    );
    expect(output?.unresolvedCapabilities).not.toContain('target-element post-relation force state');
    expect(output?.unresolvedCapabilities).toContain('target post-relation root-state verdict');
    expect(output?.unresolvedCapabilities).toContain('effective mechanism force verdict');
    expect(output?.unresolvedCapabilities).toContain('relation-specific usefulness/harmfulness');
  });

  test('refines tracked output relations into stem-combination and root-clash effect gaps without resolving either', () => {
    const { report } = buildAligned(relationHeavyPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.unresolvedCapabilities).toContain(
      'target-stem combination transformation/effect resolution',
    );
    expect(output?.unresolvedCapabilities).toContain('root-candidate clash effect resolution');
    expect(output?.unresolvedCapabilities).toContain('target post-relation root-state verdict');
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
  });

  test('keeps no tracked relation candidate as an unresolved post-relation state rather than preservation', () => {
    const { report } = buildAligned(sparseRelationPillars());
    const output = forceContext(report, 'OUTPUT_LEAKAGE');

    expect(output?.existingCapabilities).toContain(
      'I31 challenge-target relation participation routing state: NO_TRACKED_RELATION_CANDIDATE',
    );
    expect(output?.unresolvedCapabilities).toContain(
      'target post-relation root-state verdict; no tracked relation does not establish preservation',
    );
    expect(output?.availability).toBe('PARTIAL_SUBSTRATE');
  });

  test('fails closed against relation evidence aligned to different root material and preserves non-force v3 contexts', () => {
    const review = reviewAllMechanisms();
    const heavy = relationHeavyPillars();
    const sparse = sparseRelationPillars();
    const force = buildResolvedI27ChallengeMechanismForceEvidence(heavy);
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(heavy);
    const sparseRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparse);
    const sparseRelations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      sparse,
      sparseRoots,
    );
    const v3 = buildI26ChallengeContextAvailabilityV3(review, force, roots);
    const v4 = buildI26ChallengeContextAvailabilityV4(review, force, roots, sparseRelations);
    const output = forceContext(v4, 'OUTPUT_LEAKAGE');

    expect(v4.relationEvidenceAlignedWithRootEvidence).toBe(false);
    expect(output?.existingCapabilities.some((capability) => capability.startsWith('I31 '))).toBe(false);
    expect(output?.unresolvedCapabilities).toContain(
      'resolved I31 mechanism relation-participation evidence aligned to current I29 root evidence',
    );

    for (const v3Mechanism of v3.mechanisms) {
      const v4Mechanism = v4.mechanisms.find((item) => item.mechanism === v3Mechanism.mechanism);
      expect(
        v4Mechanism?.requiredContexts.filter(
          (context) => context.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        ),
      ).toEqual(
        v3Mechanism.requiredContexts.filter(
          (context) => context.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        ),
      );
    }
  });

  test('never upgrades relation availability into effect resolution, classification, scoring, or nondeterministic identity', () => {
    const { review, force, roots, relations, report } = buildAligned(relationHeavyPillars());
    const repeated = buildI26ChallengeContextAvailabilityV4(review, force, roots, relations);

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
