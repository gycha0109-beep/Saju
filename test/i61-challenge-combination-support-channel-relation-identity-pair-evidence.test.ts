import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  buildI52ChallengeCombinationSupportChannelEvidence,
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  buildI54ChallengeCombinationSupportChannelContestTopologyEvidence,
  buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
  type ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
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

function clashFixture(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
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

function topology(material: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(material);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(material, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
    material,
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
  const condition = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    material,
    combinations,
    references,
    applicability,
  );
  const supportMethodology =
    buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  const support = buildI52ChallengeCombinationSupportChannelEvidence(
    condition,
    supportMethodology,
  );
  const contestMethodology =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
    material,
    condition,
    support,
    contestMethodology,
  );
}

describe('I61 challenge combination support channel relation identity pair evidence', () => {
  test('independently emits authoritative relation-id/kind pairs for a multi-touch support source', () => {
    const material = multipleTouchFixture();
    const result = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      topology(material),
    );
    const multi = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'month' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '해' &&
        item.sourcePillar === 'hour' &&
        item.sourceComponent === 'branch' &&
        item.sourceValue === '신',
    );

    expect(result.status).toBe('RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE');
    expect(result.relationIdKindPairEvidenceAvailable).toBe(true);
    expect(result.multiTouchRelationIdKindPairEvidenceAvailable).toBe(true);
    expect(multi?.contestTopologyState).toBe('MULTIPLE_TRACKED_RELATION_TOUCHES');
    expect(multi?.touchCount).toBe(2);
    expect(multi?.multiTouchPairingResolvedWhereObserved).toBe(true);
    expect(multi?.touchingRelations.map((touch) => touch.relationKind)).toEqual(
      expect.arrayContaining(['branch_clash', 'branch_six_combination']),
    );
    expect(multi?.touchingRelations.every((touch) => touch.relationId.length > 0)).toBe(true);
  });

  test('preserves exact single-touch identity without promoting it to a settlement result', () => {
    const material = clashFixture();
    const result = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      topology(material),
    );
    const clash = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'month' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '해' &&
        item.sourcePillar === 'hour' &&
        item.sourceComponent === 'branch' &&
        item.sourceValue === '신',
    );

    expect(clash?.touchingRelations).toHaveLength(1);
    expect(clash?.touchingRelations[0]).toEqual(
      expect.objectContaining({
        relationKind: 'branch_clash',
        precedence: 'not_determined',
        settlementOutcome: 'not_determined',
      }),
    );
    expect(clash?.supportChannelDestroyed).toBe('not_determined');
  });

  test('preserves no-touch as an empty pair set without inferring ACTIVE or PERSISTED', () => {
    const material = clashFixture();
    const result = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      topology(material),
    );
    const untouched = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'year' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '인' &&
        item.sourcePillar === 'day' &&
        item.sourceComponent === 'stem' &&
        item.sourceValue === '갑',
    );

    expect(untouched?.contestTopologyState).toBe('NO_TRACKED_RELATION_TOUCH');
    expect(untouched?.touchingRelations).toEqual([]);
    expect(untouched?.supportChannelActive).toBe('not_determined');
    expect(untouched?.supportChannelPersisted).toBe('not_determined');
  });

  test('fails closed when I54 separate touch metadata is tampered instead of guessing pairs', () => {
    const material = multipleTouchFixture();
    const base = topology(material);
    const targetIndex = base.items.findIndex(
      (item) => item.contestTopologyState === 'MULTIPLE_TRACKED_RELATION_TOUCHES',
    );
    expect(targetIndex).toBeGreaterThanOrEqual(0);
    const items = [...base.items];
    const target = items[targetIndex];
    if (target === undefined) throw new Error('multi-touch fixture item required');
    items[targetIndex] = {
      ...target,
      touchingRelationIds: target.touchingRelationIds.slice(0, 1),
    };
    const tampered = { ...base, items } as ChallengeCombinationSupportChannelContestTopologyEvidenceReport;

    const result = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      tampered,
    );

    expect(result.status).toBe('I54_TOUCH_METADATA_MISMATCH');
    expect(result.items).toEqual([]);
    expect(result.pairReconstructionFromSeparateI54ArraysUsed).toBe(false);
  });

  test('fails closed when support-source pillar/component/value identity no longer matches pillars', () => {
    const material = clashFixture();
    const base = topology(material);
    const items = [...base.items];
    const first = items[0];
    if (first === undefined) throw new Error('I54 fixture item required');
    items[0] = { ...first, sourceValue: `${first.sourceValue}_tampered` };
    const tampered = { ...base, items } as ChallengeCombinationSupportChannelContestTopologyEvidenceReport;

    const result = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      tampered,
    );

    expect(result.status).toBe('SUPPORT_SOURCE_IDENTITY_MISMATCH');
    expect(result.relationIdKindPairEvidenceAvailable).toBe(false);
  });

  test('is deterministic and keeps precedence, outcomes, activation, scoring, and classification closed', () => {
    const material = multipleTouchFixture();
    const i54 = topology(material);
    const left = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      i54,
    );
    const right = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
      material,
      i54,
    );

    expect(left.reportId).toBe(right.reportId);
    expect(left.pairReconstructionFromSeparateI54ArraysUsed).toBe(false);
    expect(left.touchSpecificSettlementDispatchAuthorized).toBe(false);
    expect(left.crossRelationPrecedenceAuthorized).toBe(false);
    expect(left.contestOutcomeVerdictAuthorized).toBe(false);
    expect(left.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(left.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(left.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(left.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(left.classificationAuthorized).toBe(false);
    expect(left.numericScoringAuthorized).toBe(false);
    expect(
      left.items.flatMap((item) => item.touchingRelations).every(
        (touch) => touch.precedence === 'not_determined' && touch.settlementOutcome === 'not_determined',
      ),
    ).toBe(true);
  });
});
