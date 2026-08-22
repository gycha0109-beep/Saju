import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview,
  buildI45ChallengeRootThreeCombinationBureauFormationEvidence,
  buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview,
  buildI50ChallengeCombinationSeasonalDispositionEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
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

function threeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
  };
}

function stemOnlyPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
  };
}

function upstream(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const applicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const condition = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    applicability,
  );
  const bureauPolicy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
  const bureau = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(condition, bureauPolicy);
  return { condition, bureau };
}

describe('I50 challenge combination seasonal disposition evidence', () => {
  test('materializes target seasonal phase into a source-bounded categorical disposition', () => {
    const { condition, bureau } = upstream(threeCombinationPillars());
    const methodology = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
    const report = buildI50ChallengeCombinationSeasonalDispositionEvidence(condition, bureau, methodology);
    const output = report.items.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(report.status).toBe('RESOLVED_SEASONAL_DISPOSITION_EVIDENCE');
    expect(report.seasonalCommandConditionEffectResolvedCategorically).toBe(true);
    expect(output?.commandElement).toBe('화');
    expect(output?.targetElement).toBe('화');
    expect(output?.targetSeasonalPhase).toBe('旺');
    expect(output?.targetSeasonalDisposition).toBe('COMMAND_ELEMENT_FLOURISHING');
    expect(output?.seasonalCommandConditionEffect).toBe('RESOLVED_CATEGORICAL_DISPOSITION');
  });

  test('keeps participant seasonal dispositions identity-local and unaggregated', () => {
    const { condition, bureau } = upstream(threeCombinationPillars());
    const methodology = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
    const report = buildI50ChallengeCombinationSeasonalDispositionEvidence(condition, bureau, methodology);
    const output = report.items.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(output?.participantSeasonalDispositions.length).toBeGreaterThan(0);
    expect(output?.participantSeasonalDispositions.every((item) => item.numericWeight === 'not_assigned')).toBe(true);
    expect(output?.participantSeasonalDispositionAggregation).toBe('not_performed');
    expect(report.participantSeasonalDispositionAggregationAuthorized).toBe(false);
  });

  test('derives formed three-combination bureau seasonal disposition without deciding bureau survival or force', () => {
    const { condition, bureau } = upstream(threeCombinationPillars());
    const methodology = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
    const report = buildI50ChallengeCombinationSeasonalDispositionEvidence(condition, bureau, methodology);
    const output = report.items.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(output?.formedThreeCombinationBureau?.formationState).toBe('STRUCTURAL_BUREAU_FORMED');
    expect(output?.formedThreeCombinationBureau?.bureauElement).toBe('화');
    expect(output?.formedThreeCombinationBureau?.seasonalPhase).toBe('旺');
    expect(output?.formedThreeCombinationBureau?.seasonalDisposition).toBe('COMMAND_ELEMENT_FLOURISHING');
    expect(output?.formedThreeCombinationBureau?.postInteractionBureauState).toBe('not_determined');
    expect(output?.formedThreeCombinationBureau?.effectiveBureauForce).toBe('not_determined');
  });

  test('does not emit transformed-result seasonal disposition for non-three-combination routes', () => {
    const { condition, bureau } = upstream(stemOnlyPillars());
    const methodology = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
    const report = buildI50ChallengeCombinationSeasonalDispositionEvidence(condition, bureau, methodology);

    expect(report.status).toBe('RESOLVED_SEASONAL_DISPOSITION_EVIDENCE');
    expect(report.items.some((item) => item.formedThreeCombinationBureau !== undefined)).toBe(false);
    expect(report.items.every((item) => item.transformedResultSeasonalDisposition === 'not_emitted')).toBe(true);
    expect(report.transformedResultSeasonalDispositionEmissionAuthorized).toBe(false);
  });

  test('fails closed on stale bureau evidence and preserves force/scoring/classification guards', () => {
    const current = upstream(threeCombinationPillars());
    const stale = upstream(stemOnlyPillars());
    const methodology = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
    const rejected = buildI50ChallengeCombinationSeasonalDispositionEvidence(
      current.condition,
      stale.bureau,
      methodology,
    );
    const first = buildI50ChallengeCombinationSeasonalDispositionEvidence(
      current.condition,
      current.bureau,
      methodology,
    );
    const second = buildI50ChallengeCombinationSeasonalDispositionEvidence(
      current.condition,
      current.bureau,
      methodology,
    );

    expect(rejected.status).toBe('BUREAU_EVIDENCE_MISALIGNED');
    expect(rejected.items).toEqual([]);
    expect(first.reportId).toBe(second.reportId);
    expect(first.postInteractionBureauStateEmissionAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
