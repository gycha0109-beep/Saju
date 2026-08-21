import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview,
  buildI45ChallengeRootThreeCombinationBureauFormationEvidence,
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
  buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence,
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

function embeddedTight(): StructuralPillarInput {
  return {
    year: pillar('무', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('계', '술'),
  };
}

function embeddedNonTight(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '신'),
    hour: pillar('경', '술'),
  };
}

function outsideTight(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('임', '진'),
  };
}

function outsideNonTight(): StructuralPillarInput {
  return {
    year: pillar('임', '자'),
    month: pillar('병', '인'),
    day: pillar('갑', '오'),
    hour: pillar('정', '술'),
  };
}

function noClash(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
  };
}

function formationEvidence(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const applicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const conditions = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    applicability,
  );
  const bureauPolicy = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
  return buildI45ChallengeRootThreeCombinationBureauFormationEvidence(conditions, bureauPolicy);
}

function firstClash(pillars: StructuralPillarInput) {
  const formation = formationEvidence(pillars);
  const policy = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
  const report = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
    pillars,
    formation,
    policy,
  );
  const item = report.items.find((candidate) => candidate.trackedClashCount > 0);
  return { report, item, clash: item?.clashes[0] };
}

describe('I47 challenge root three-combination clash placement settlement evidence', () => {
  test('emits BROKEN only for an embedded clash counterpart tight to the directly clashed bureau participant', () => {
    const { report, item, clash } = firstClash(embeddedTight());

    expect(report.status).toBe('RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE');
    expect(clash?.placementClass).toBe(
      'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    );
    expect(clash?.settlement).toBe('BREAK_AUTHORIZED');
    expect(clash?.deterministicBureauState).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(item?.postInteractionBureauState).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(item?.postInteractionBureauStateBasis).toBe(
      'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH',
    );
  });

  test('keeps embedded non-tight and outside tight clashes contextual without a deterministic damaged state', () => {
    const embedded = firstClash(embeddedNonTight());
    const outside = firstClash(outsideTight());

    expect(embedded.clash?.placementClass).toBe('EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT');
    expect(embedded.clash?.settlement).toBe('CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED');
    expect(embedded.item?.postInteractionBureauState).toBe('not_determined');
    expect(outside.clash?.placementClass).toBe(
      'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    );
    expect(outside.clash?.settlement).toBe('CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED');
    expect(outside.item?.postInteractionBureauState).toBe('not_determined');
  });

  test('emits no direct intactness settlement for outside non-tight placement or no tracked clash', () => {
    const outside = firstClash(outsideNonTight());
    const formation = formationEvidence(noClash());
    const policy = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const none = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
      noClash(),
      formation,
      policy,
    );

    expect(outside.clash?.placementClass).toBe('OUTSIDE_BUREAU_SPAN_NOT_TIGHT');
    expect(outside.clash?.settlement).toBe('NO_DIRECT_SETTLEMENT_FROM_THIS_RULE');
    expect(outside.item?.postInteractionBureauState).toBe('not_determined');
    expect(none.items.every((item) => item.trackedClashCount === 0)).toBe(true);
    expect(none.items.every((item) => item.postInteractionBureauState === 'not_determined')).toBe(true);
  });

  test('fails closed when I45 formation evidence is reused against different pillar material', () => {
    const staleFormation = formationEvidence(embeddedTight());
    const policy = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const report = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
      outsideTight(),
      staleFormation,
      policy,
    );

    expect(report.status).toBe('FORMATION_EVIDENCE_MISALIGNED');
    expect(report.items).toEqual([]);
    expect(report.placementClassificationAvailable).toBe(false);
  });

  test('preserves deterministic identity and all no-force/no-scoring guards', () => {
    const pillars = embeddedTight();
    const formation = formationEvidence(pillars);
    const policy = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const first = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
      pillars,
      formation,
      policy,
    );
    const second = buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
      pillars,
      formation,
      policy,
    );

    expect(first.reportId).toBe(second.reportId);
    expect(first.tightEmbeddedBreakStateEmissionAuthorized).toBe(true);
    expect(first.genericPostInteractionBureauStateEmissionAuthorized).toBe(false);
    expect(first.damagedBureauMagnitudeClassificationAuthorized).toBe(false);
    expect(first.multipleClashAggregationAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
