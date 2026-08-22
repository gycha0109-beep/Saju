import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  buildI52ChallengeCombinationSupportChannelEvidence,
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  buildI54ChallengeCombinationSupportChannelContestTopologyEvidence,
  buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview,
  buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
  type ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  type ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
  type StructuralPillarInput,
} from '../src/index.js';

const STEM: Readonly<Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
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

const BRANCH: Readonly<Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
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
  return { stem: { value: stem, ...STEM[stem] }, branch: { value: branch, ...BRANCH[branch] } };
}

function clashFixture(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function competingCombinationFixture(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '진'),
    hour: pillar('경', '유'),
  };
}

function multipleTouchFixture(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '사'),
    hour: pillar('경', '신'),
  };
}

function topology(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
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
  const applicability =
    buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    applicability,
  );
  const supportMethodology =
    buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  const support = buildI52ChallengeCombinationSupportChannelEvidence(
    conditions,
    supportMethodology,
  );
  const contestMethodology =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
    pillars,
    conditions,
    support,
    contestMethodology,
  );
}

function report(pillars: StructuralPillarInput) {
  return buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence(
    topology(pillars),
    buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview(),
  );
}

describe('I56 challenge combination support-channel settlement dependency evidence', () => {
  test('materializes no direct contest dependency for NO_TRACKED_RELATION_TOUCH without activation/persistence verdicts', () => {
    const result = report(clashFixture());
    const item = result.items.find(
      (candidate) =>
        candidate.contestTopologyState === 'NO_TRACKED_RELATION_TOUCH' &&
        candidate.sourcePillar === 'day' &&
        candidate.sourceComponent === 'stem',
    );

    expect(result.status).toBe('RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE');
    expect(item).toEqual(
      expect.objectContaining({
        directContestSettlementRequired: false,
        requiredSettlementDependencies: [],
        settlementDependenciesResolved: false,
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
      }),
    );
  });

  test('routes CURRENT_COMBINATION_PARTICIPATION to current-combination binding/interaction settlement only', () => {
    const result = report(clashFixture());
    const item = result.items.find(
      (candidate) => candidate.contestTopologyState === 'CURRENT_COMBINATION_PARTICIPATION',
    );

    expect(item?.requiredSettlementDependencies).toEqual([
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(item?.supportChannelNeutralized).toBe('not_determined');
  });

  test('routes COMPETING_CLASH_TOUCH to relative-force, rescue-aware, and clash interaction settlement without destruction', () => {
    const result = report(clashFixture());
    const item = result.items.find(
      (candidate) => candidate.contestTopologyState === 'COMPETING_CLASH_TOUCH',
    );

    expect(item?.requiredSettlementDependencies).toEqual([
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
      'CLASH_INTERACTION_SETTLEMENT',
    ]);
    expect(item?.supportChannelDestroyed).toBe('not_determined');
  });

  test('routes COMPETING_COMBINATION_TOUCH to competing-combination binding/interaction settlement without neutralization', () => {
    const result = report(competingCombinationFixture());
    const item = result.items.find(
      (candidate) => candidate.contestTopologyState === 'COMPETING_COMBINATION_TOUCH',
    );

    expect(item?.requiredSettlementDependencies).toEqual([
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(item?.supportChannelNeutralized).toBe('not_determined');
  });

  test('keeps multi-touch routing generic where I54 has no authoritative relation-id to kind pair mapping', () => {
    const result = report(multipleTouchFixture());
    const item = result.items.find(
      (candidate) => candidate.contestTopologyState === 'MULTIPLE_TRACKED_RELATION_TOUCHES',
    );

    expect(item?.touchCount).toBeGreaterThan(1);
    expect(item?.requiredSettlementDependencies).toEqual([
      'TOUCH_SPECIFIC_RELATION_SETTLEMENT',
      'COMPETING_RELATION_SETTLEMENT',
    ]);
    expect(item?.settlementDependenciesResolved).toBe(false);
  });

  test('fails closed when I54 topology metadata is internally inconsistent', () => {
    const valid = topology(clashFixture());
    const tampered = {
      ...valid,
      reportId: `${valid.reportId}_tampered`,
      items: valid.items.map((item, index) =>
        index === 0 ? { ...item, touchCount: item.touchCount + 1 } : item,
      ),
    } as ChallengeCombinationSupportChannelContestTopologyEvidenceReport;

    const result = buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence(
      tampered,
      buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview(),
    );

    expect(result.status).toBe('I54_TOPOLOGY_METADATA_MISMATCH');
    expect(result.items).toEqual([]);
  });

  test('fails closed when I55 methodology does not match the canonical routing-only contract', () => {
    const valid = topology(clashFixture());
    const canonical =
      buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
    const tampered = {
      ...canonical,
      reviewId: `${canonical.reviewId}_tampered`,
    } as ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport;

    const result = buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence(
      valid,
      tampered,
    );

    expect(result.status).toBe('I55_METHODOLOGY_NOT_AUTHORIZED');
    expect(result.items).toEqual([]);
  });

  test('preserves deterministic evidence identity and all outcome/force/scoring/classification guards', () => {
    const first = report(clashFixture());
    const second = report(clashFixture());

    expect(first.reportId).toBe(second.reportId);
    expect(first.settlementDependencyEvidenceAvailable).toBe(true);
    expect(first.contestOutcomeVerdictAuthorized).toBe(false);
    expect(first.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(first.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(first.supportChannelNeutralizationVerdictAuthorized).toBe(false);
    expect(first.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(first.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
