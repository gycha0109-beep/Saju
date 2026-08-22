import { describe, expect, test } from 'vitest';
import {
  buildI20BClashSeasonalAdvantage,
  buildI20CClashSupportContext,
  buildResolvedRelativeForceEvidence,
  reviewResolvedRootRelationEffects,
  type BranchFact,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
} from '../src/index.js';

const STEM_ELEMENT: Readonly<Record<HeavenlyStem, FiveElement>> = {
  갑: '목', 을: '목', 병: '화', 정: '화', 무: '토', 기: '토', 경: '금', 신: '금', 임: '수', 계: '수',
};
const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊', 기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸',
};
const STEM_YINYANG: Readonly<Record<HeavenlyStem, '양' | '음'>> = {
  갑: '양', 을: '음', 병: '양', 정: '음', 무: '양', 기: '음', 경: '양', 신: '음', 임: '양', 계: '음',
};
const BRANCH_ELEMENT: Readonly<Record<EarthlyBranch, FiveElement>> = {
  자: '수', 축: '토', 인: '목', 묘: '목', 진: '토', 사: '화',
  오: '화', 미: '토', 신: '금', 유: '금', 술: '토', 해: '수',
};
const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};
const BRANCH_YINYANG: Readonly<Record<EarthlyBranch, '양' | '음'>> = {
  자: '양', 축: '음', 인: '양', 묘: '음', 진: '양', 사: '음',
  오: '양', 미: '음', 신: '양', 유: '음', 술: '양', 해: '음',
};

function branch(value: EarthlyBranch): BranchFact {
  return {
    value,
    hanja: BRANCH_HANJA[value],
    element: BRANCH_ELEMENT[value],
    yinYang: BRANCH_YINYANG[value],
  };
}

function pillar(stem: HeavenlyStem, branchValue: EarthlyBranch): PillarFact {
  return {
    stem: {
      value: stem,
      hanja: STEM_HANJA[stem],
      element: STEM_ELEMENT[stem],
      yinYang: STEM_YINYANG[stem],
    },
    branch: branch(branchValue),
  };
}

function supportReport(pillars: {
  year: PillarFact;
  month: PillarFact;
  day: PillarFact;
  hour: PillarFact;
}) {
  const evidence = buildResolvedRelativeForceEvidence(pillars);
  const rootReview = reviewResolvedRootRelationEffects('목', pillars);
  return buildI20CClashSupportContext(buildI20BClashSeasonalAdvantage(evidence, rootReview));
}

describe('I20C clash support context evidence', () => {
  test('keeps same-element and resource support as separate positional signals', () => {
    const report = supportReport({
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('계', '해'),
      hour: pillar('갑', '묘'),
    });
    const candidate = report.candidates.find((item) =>
      item.participants.some((participant) => participant.branch === '자'),
    );
    const water = candidate?.participants.find((participant) => participant.branch === '자');
    const fire = candidate?.participants.find((participant) => participant.branch === '오');

    expect(report.status).toBe('RESOLVED_SUPPORT_CONTEXT');
    expect(water?.samePillarVisibleSameElementSupport).toBe(true);
    expect(water?.externalVisibleSameElementSupportPositions).toEqual(['day']);
    expect(water?.additionalSameElementBranchSupportPositions).toEqual(['day']);
    expect(water?.visibleResourceSupportPositions).toEqual([]);
    expect(water?.resourceBranchSupportPositions).toEqual([]);
    expect(water?.signals).toContain('EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT');
    expect(water?.signals).toContain('ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT');

    expect(fire?.samePillarVisibleSameElementSupport).toBe(true);
    expect(fire?.visibleResourceSupportPositions).toEqual(['hour']);
    expect(fire?.resourceBranchSupportPositions).toEqual(['hour']);
    expect(fire?.signals).toContain('VISIBLE_RESOURCE_SUPPORT');
    expect(fire?.signals).toContain('RESOURCE_BRANCH_SUPPORT');

    expect(candidate?.supportAsymmetryVerdict).toBe('not_determined');
    expect(candidate?.clashWinner).toBe('not_determined');
    expect(candidate?.rootEffectVerdict).toBe('not_determined');
    expect(candidate?.numericScore).toBe('not_assigned');
    expect(report.supportEffectAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
  });

  test('does not count the participant branch itself as additional branch support', () => {
    const report = supportReport({
      year: pillar('무', '자'),
      month: pillar('기', '오'),
      day: pillar('무', '진'),
      hour: pillar('기', '축'),
    });
    const candidate = report.candidates.find((item) =>
      item.participants.some((participant) => participant.branch === '자'),
    );

    for (const participant of candidate?.participants ?? []) {
      expect(participant.additionalSameElementBranchSupportPositions).not.toContain(participant.position);
    }
  });

  test('emits an explicit no-support-context state without inferring weakness', () => {
    const report = supportReport({
      year: pillar('무', '자'),
      month: pillar('기', '오'),
      day: pillar('무', '진'),
      hour: pillar('기', '축'),
    });
    const candidate = report.candidates.find((item) =>
      item.participants.some((participant) => participant.branch === '자'),
    );
    const water = candidate?.participants.find((participant) => participant.branch === '자');

    expect(water?.signals).toEqual(['NO_TRACKED_SUPPORT_CONTEXT']);
    expect(water?.supportEffect).toBe('not_resolved');
    expect(water?.relativeForceVerdict).toBe('not_determined');
    expect(water?.numericWeight).toBe('not_assigned');
  });

  test('unresolved seasonal input remains fail-closed', () => {
    const pillars = {
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('계', '해'),
      hour: pillar('갑', '묘'),
    };
    const evidence = buildResolvedRelativeForceEvidence(pillars);
    const rootReview = reviewResolvedRootRelationEffects('목', pillars);
    const seasonal = buildI20BClashSeasonalAdvantage(evidence, rootReview);
    const report = buildI20CClashSupportContext({ ...seasonal, status: 'INPUT_INDETERMINATE' });

    expect(report.status).toBe('INPUT_INDETERMINATE');
    expect(report.candidates).toEqual([]);
    expect(report.supportEffectAuthorized).toBe(false);
  });

  test('report identity is deterministic', () => {
    const pillars = {
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('계', '해'),
      hour: pillar('갑', '묘'),
    };
    const evidence = buildResolvedRelativeForceEvidence(pillars);
    const rootReview = reviewResolvedRootRelationEffects('목', pillars);
    const seasonal = buildI20BClashSeasonalAdvantage(evidence, rootReview);

    expect(buildI20CClashSupportContext(seasonal).reportId).toBe(
      buildI20CClashSupportContext(seasonal).reportId,
    );
  });
});
