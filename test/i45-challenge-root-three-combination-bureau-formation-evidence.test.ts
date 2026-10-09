import { describe, expect, test } from 'vitest';
import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
} from '../src/contracts/calculation.js';
import type { StructuralPillarInput } from '../src/calculation/structural-relations.js';
import { buildResolvedI29ChallengeTargetIntrinsicRootEvidence } from '../src/research/i29-challenge-target-intrinsic-root-evidence.js';
import { buildResolvedI31ChallengeTargetRelationParticipationEvidence } from '../src/research/i31-challenge-target-relation-participation-evidence.js';
import { buildResolvedI35ChallengeTargetCombinationDependencyEvidence } from '../src/research/i35-challenge-target-combination-dependency-evidence.js';
import { buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview } from '../src/research/i36-challenge-target-combination-transformation-policy-methodology-review.js';
import { buildI37ChallengeTargetCombinationTransformationReference } from '../src/research/i37-challenge-target-combination-transformation-reference.js';
import { buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview } from '../src/research/i38-challenge-target-combination-condition-applicability-methodology-review.js';
import { buildResolvedI39ChallengeTargetCombinationConditionEvidence } from '../src/research/i39-challenge-target-combination-condition-evidence.js';
import { buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview } from '../src/research/i44-challenge-root-three-combination-effective-bureau-qualification-methodology-review.js';
import { buildI45ChallengeRootThreeCombinationBureauFormationEvidence } from '../src/research/i45-challenge-root-three-combination-bureau-formation-evidence.js';

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

function contiguousThreePillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
  };
}

function separatedNoLeadOutThreePillars(): StructuralPillarInput {
  return {
    year: pillar('무', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('계', '술'),
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

function conditionEvidence(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const applicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  return buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    applicability,
  );
}

describe('I45 challenge root three-combination structural bureau formation evidence', () => {
  test('emits structural bureau formation and traditional bureau identity for complete three-branch membership', () => {
    const evidence = conditionEvidence(contiguousThreePillars());
    const policy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
    const report = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, policy);
    const output = report.items.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(report.status).toBe('RESOLVED_STRUCTURAL_BUREAU_FORMATION');
    expect(output?.formationState).toBe('STRUCTURAL_BUREAU_FORMED');
    expect(output?.formationBasis).toBe('FULL_THREE_BRANCH_MEMBERSHIP');
    expect(output?.traditionalBureauElement).toBe('화');
    expect(output?.fullMembershipObserved).toBe(true);
    expect(output?.adjacencyRequiredForFormation).toBe(false);
    expect(output?.visibleLeadOutRequiredForFormation).toBe(false);
  });

  test('forms a full-three bureau even when participant positions are separated and no bureau-element stem is visibly led out', () => {
    const evidence = conditionEvidence(separatedNoLeadOutThreePillars());
    const policy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
    const report = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, policy);
    const output = report.items.find((item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL');

    expect(output?.formationState).toBe('STRUCTURAL_BUREAU_FORMED');
    expect(output?.adjacencyState).toBe('SEPARATED_WITH_GAP');
    expect(output?.leadOutState).toBe('NO_VISIBLE_REFERENCE_ELEMENT_STEM');
    expect(output?.visibleLeadOutStemPositions).toEqual([]);
    expect(output?.traditionalBureauElement).toBe('화');
  });

  test('retains observed clash topology without deciding breakage, damage or post-interaction bureau state', () => {
    const evidence = conditionEvidence(separatedNoLeadOutThreePillars());
    const policy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
    const report = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, policy);
    const output = report.items.find((item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL');

    expect(output?.clashTopology.length).toBeGreaterThan(0);
    expect(output?.clashCanBreakOrDamageBureau).toBe(true);
    expect(output?.clashBreakDamageSettlement).toBe('not_determined');
    expect(output?.postInteractionBureauState).toBe('not_determined');
    expect(output?.postInteractionEffectiveBureauVerdict).toBe('not_determined');
  });

  test('does not manufacture bureau-formation evidence for non-three-combination relations', () => {
    const evidence = conditionEvidence(stemOnlyPillars());
    const policy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
    const report = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, policy);

    expect(report.status).toBe('RESOLVED_STRUCTURAL_BUREAU_FORMATION');
    expect(report.items).toEqual([]);
    expect(report.allThreeCombinationItemsHaveFormationEvidence).toBe(true);
  });

  test('fails closed on an unauthorized I44 contract and preserves all post-interaction/effective-force guards', () => {
    const evidence = conditionEvidence(contiguousThreePillars());
    const policy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
    const invalid = {
      ...policy,
      reviewId: `${policy.reviewId}_invalid`,
      postInteractionEffectiveBureauVerdictAuthorized: true,
    } as unknown as typeof policy;
    const rejected = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, invalid);
    const first = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, policy);
    const second = buildI45ChallengeRootThreeCombinationBureauFormationEvidence(evidence, policy);

    expect(rejected.status).toBe('METHODOLOGY_NOT_AUTHORIZED');
    expect(rejected.items).toEqual([]);
    expect(first.reportId).toBe(second.reportId);
    expect(first.postInteractionBureauStateEmissionAuthorized).toBe(false);
    expect(first.postInteractionEffectiveBureauVerdictAuthorized).toBe(false);
    expect(first.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
