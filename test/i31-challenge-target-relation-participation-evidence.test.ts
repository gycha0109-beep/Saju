import { describe, expect, test } from 'vitest';
import {
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
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

const relationHeavyPillars = {
  year: pillar('병', '인'),
  month: pillar('무', '진'),
  day: pillar('갑', '술'),
  hour: pillar('신', '신'),
};

const sparseRelationPillars = {
  year: pillar('병', '인'),
  month: pillar('임', '자'),
  day: pillar('갑', '묘'),
  hour: pillar('경', '유'),
};

describe('I31 challenge target relation participation evidence router', () => {
  test('routes visible target-stem combination and root-candidate branch clash as separate channels', () => {
    const rootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(relationHeavyPillars);
    const report = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      relationHeavyPillars,
      rootEvidence,
    );
    const output = report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(report.status).toBe('RESOLVED_ROUTING_EVIDENCE');
    expect(output?.visibleTargetStemRelations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          targetStemPosition: 'year',
          targetStem: '병',
          relationKind: 'stem_five_combination',
          transformationEstablished: false,
        }),
      ]),
    );
    expect(output?.rootCandidateRelations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          branchPosition: 'year',
          branch: '인',
          reviewRequirements: expect.arrayContaining(['BRANCH_CLASH_EFFECT_REVIEW_REQUIRED']),
          postRelationRootState: 'not_determined',
        }),
      ]),
    );
    expect(output?.routingState).toBe('TRACKED_RELATION_REVIEW_REQUIRED');
  });

  test('keeps a root candidate with no tracked touching relation distinct from a preserved-root verdict', () => {
    const rootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparseRelationPillars);
    const report = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      sparseRelationPillars,
      rootEvidence,
    );
    const output = report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');
    const yearRoot = output?.rootCandidateRelations.find((item) => item.branchPosition === 'year');

    expect(yearRoot?.relationRoutingState).toBe('NO_TRACKED_RELATION_CANDIDATE');
    expect(yearRoot?.postRelationRootState).toBe('not_determined');
    expect(output?.targetPostRelationRootState).toBe('not_determined');
  });

  test('preserves hidden-only and earth target boundaries instead of manufacturing post-relation root states', () => {
    const hiddenOnlyPillars = {
      year: pillar('임', '인'),
      month: pillar('무', '진'),
      day: pillar('갑', '술'),
      hour: pillar('신', '신'),
    };
    const hiddenRootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(hiddenOnlyPillars);
    const hiddenReport = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      hiddenOnlyPillars,
      hiddenRootEvidence,
    );
    const output = hiddenReport.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    const earthRootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(relationHeavyPillars);
    const earthReport = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      relationHeavyPillars,
      earthRootEvidence,
    );
    const wealth = earthReport.mechanisms.find(
      (item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL',
    );

    expect(output?.routingState).toBe('NO_VISIBLE_TARGET_STEM_ANCHOR');
    expect(output?.rootCandidateRelations).toEqual([]);
    expect(output?.hiddenOnlyTargetPostRelationRootStateAuthorized).toBe(false);
    expect(wealth?.routingState).toBe('EARTH_ROOT_CONVENTION_UNRESOLVED');
    expect(wealth?.targetPostRelationRootState).toBe('not_determined');
  });

  test('rejects an I29 report derived from different pillar material', () => {
    const mismatchedRootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(
      sparseRelationPillars,
    );
    const report = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      relationHeavyPillars,
      mismatchedRootEvidence,
    );

    expect(report.status).toBe('ROOT_EVIDENCE_MISALIGNED');
    expect(report.mechanisms).toEqual([]);
    expect(report.relationCandidateIds).toEqual([]);
  });

  test('never upgrades tracked relations to post-relation state, effective force, usefulness, classification, or scoring', () => {
    const rootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(relationHeavyPillars);
    const report = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      relationHeavyPillars,
      rootEvidence,
    );
    const repeated = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      relationHeavyPillars,
      rootEvidence,
    );

    expect(report.untrackedRelationFamiliesExplicitlyUnresolved).toBe(true);
    expect(report.targetPostRelationRootStateVerdict).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
