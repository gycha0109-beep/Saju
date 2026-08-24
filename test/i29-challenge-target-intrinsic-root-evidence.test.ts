import { describe, expect, test } from 'vitest';
import {
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
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

describe('I29 challenge target intrinsic root evidence adapter', () => {
  test('emits challenge-specific non-earth root candidates only when the target stem is visibly anchored', () => {
    const report = buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
      year: pillar('병', '인'),
      month: pillar('무', '진'),
      day: pillar('갑', '술'),
      hour: pillar('경', '유'),
    });
    const output = report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');
    const officer = report.mechanisms.find(
      (item) => item.mechanism === 'OFFICER_CONTROL_PRESSURE',
    );

    expect(report.status).toBe('RESOLVED_EVIDENCE');
    expect(output?.targetElement).toBe('화');
    expect(output?.anchorState).toBe('VISIBLE_TARGET_STEM_ANCHORED');
    expect(output?.evidenceState).toBe('NON_EARTH_ROOT_CANDIDATE_EVIDENCE');
    expect(output?.rootCandidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          branchPosition: 'year',
          branch: '인',
          candidateClass: 'target_birth_lu_wang_root_candidate',
        }),
        expect.objectContaining({
          branchPosition: 'day',
          branch: '술',
          candidateClass: 'target_storage_residual_root_candidate',
        }),
      ]),
    );
    expect(officer?.rootCandidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          branchPosition: 'hour',
          branch: '유',
          candidateClass: 'target_birth_lu_wang_root_candidate',
        }),
      ]),
    );
  });

  test('keeps hidden-only target presence as structural evidence and emits no root candidate without a visible anchor', () => {
    const report = buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
      year: pillar('임', '인'),
      month: pillar('무', '진'),
      day: pillar('갑', '술'),
      hour: pillar('경', '유'),
    });
    const output = report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(output?.targetElement).toBe('화');
    expect(output?.visibleTargetStemPositions).toEqual([]);
    expect(output?.anchorState).toBe('NO_VISIBLE_TARGET_STEM_ANCHOR');
    expect(output?.evidenceState).toBe('NO_VISIBLE_TARGET_STEM_ANCHOR');
    expect(output?.rootCandidates).toEqual([]);
    expect(output?.hiddenOnlyTargetMembershipPromotedToRootQuality).toBe(false);
  });

  test('preserves earth target root class as unresolved even when an earth target stem is visible', () => {
    const report = buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
      year: pillar('병', '인'),
      month: pillar('무', '진'),
      day: pillar('갑', '술'),
      hour: pillar('경', '유'),
    });
    const wealth = report.mechanisms.find(
      (item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL',
    );

    expect(wealth?.targetElement).toBe('토');
    expect(wealth?.anchorState).toBe('VISIBLE_TARGET_STEM_ANCHORED');
    expect(wealth?.evidenceState).toBe('EARTH_ROOT_CLASS_UNRESOLVED');
    expect(wealth?.rootCandidates.length).toBeGreaterThan(0);
    expect(wealth?.rootCandidates.every((item) => item.candidateClass === 'target_earth_root_class_unresolved')).toBe(true);
    expect(report.earthRootConventionResolved).toBe(false);
  });

  test('distinguishes a visible target stem with no source-bounded root candidate from hidden-only absence of anchor', () => {
    const report = buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
      year: pillar('병', '자'),
      month: pillar('임', '해'),
      day: pillar('갑', '신'),
      hour: pillar('경', '유'),
    });
    const output = report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(output?.anchorState).toBe('VISIBLE_TARGET_STEM_ANCHORED');
    expect(output?.evidenceState).toBe('VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE');
    expect(output?.rootCandidates).toEqual([]);
    expect(output?.intrinsicRootQualityVerdict).toBe('not_determined');
  });

  test('fails closed on unresolved pillars and never authorizes downstream force, usefulness, classification, or scoring', () => {
    const unresolved = buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
      month: pillar('무', '진'),
      day: pillar('갑', '술'),
    });
    const resolved = buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
      year: pillar('병', '인'),
      month: pillar('무', '진'),
      day: pillar('갑', '술'),
      hour: pillar('경', '유'),
    });

    expect(unresolved.status).toBe('PILLARS_UNRESOLVED');
    expect(unresolved.mechanisms).toEqual([]);
    expect(resolved.directI18CClaimReuse).toBe(false);
    expect(resolved.targetIntrinsicRootQualityVerdict).toBe('not_determined');
    expect(resolved.targetPostRelationForceState).toBe('not_determined');
    expect(resolved.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(resolved.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(resolved.classificationAuthorized).toBe(false);
    expect(resolved.numericScoringAuthorized).toBe(false);
    expect(resolved.reportId).toBe(
      buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
        year: pillar('병', '인'),
        month: pillar('무', '진'),
        day: pillar('갑', '술'),
        hour: pillar('경', '유'),
      }).reportId,
    );
  });
});
