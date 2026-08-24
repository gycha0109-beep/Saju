import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  buildI52ChallengeCombinationSupportChannelEvidence,
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  buildI54ChallengeCombinationSupportChannelContestTopologyEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
  type ChallengeCombinationSupportChannelEvidenceReport,
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

function upstream(material: StructuralPillarInput) {
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

  return { condition, support, contestMethodology };
}

function report(material: StructuralPillarInput) {
  const { condition, support, contestMethodology } = upstream(material);
  return buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
    material,
    condition,
    support,
    contestMethodology,
  );
}

describe('I54 challenge combination support channel contest topology evidence', () => {
  test('classifies a support source participating in the current combination without emitting activation', () => {
    const result = report(clashFixture());
    const current = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'year' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '인' &&
        item.sourcePillar === 'month' &&
        item.sourceComponent === 'branch' &&
        item.sourceValue === '해',
    );

    expect(result.status).toBe('RESOLVED_CONTEST_TOPOLOGY_EVIDENCE');
    expect(current).toEqual(
      expect.objectContaining({
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        contestTopologyState: 'CURRENT_COMBINATION_PARTICIPATION',
        touchCount: 1,
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
      }),
    );
  });

  test('classifies an external support branch touched by a tracked clash as COMPETING_CLASH_TOUCH', () => {
    const result = report(clashFixture());
    const clash = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'month' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '해' &&
        item.sourcePillar === 'hour' &&
        item.sourceComponent === 'branch' &&
        item.sourceValue === '신',
    );

    expect(clash).toEqual(
      expect.objectContaining({
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        contestTopologyState: 'COMPETING_CLASH_TOUCH',
        touchingRelationKinds: ['branch_clash'],
        touchCount: 1,
        supportChannelDestroyed: 'not_determined',
      }),
    );
  });

  test('classifies an external support source participating in a separate combination as COMPETING_COMBINATION_TOUCH', () => {
    const result = report(competingCombinationFixture());
    const combination = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'month' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '해' &&
        item.sourcePillar === 'hour' &&
        item.sourceComponent === 'branch' &&
        item.sourceValue === '유',
    );

    expect(combination).toEqual(
      expect.objectContaining({
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        contestTopologyState: 'COMPETING_COMBINATION_TOUCH',
        touchingRelationKinds: ['branch_six_combination'],
        touchCount: 1,
        supportChannelNeutralized: 'not_determined',
      }),
    );
  });

  test('classifies one exact source with clash and combination contacts as MULTIPLE_TRACKED_RELATION_TOUCHES', () => {
    const result = report(multipleTouchFixture());
    const multiple = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'month' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '해' &&
        item.sourcePillar === 'hour' &&
        item.sourceComponent === 'branch' &&
        item.sourceValue === '신',
    );

    expect(multiple?.contestTopologyState).toBe('MULTIPLE_TRACKED_RELATION_TOUCHES');
    expect(multiple?.touchCount).toBe(2);
    expect(multiple?.touchingRelationKinds).toEqual(
      expect.arrayContaining(['branch_clash', 'branch_six_combination']),
    );
    expect(multiple?.supportChannelNetEffect).toBe('not_resolved');
  });

  test('keeps NO_TRACKED_RELATION_TOUCH as topology only and never promotes it to ACTIVE or PERSISTED', () => {
    const result = report(clashFixture());
    const untouched = result.items.find(
      (item) =>
        item.targetParticipantPillar === 'year' &&
        item.targetParticipantComponent === 'branch' &&
        item.targetParticipantValue === '인' &&
        item.sourcePillar === 'day' &&
        item.sourceComponent === 'stem' &&
        item.sourceValue === '갑',
    );

    expect(untouched).toEqual(
      expect.objectContaining({
        supportChannelKind: 'SAME_ELEMENT_PEER_SUPPORT_CHANNEL',
        contestTopologyState: 'NO_TRACKED_RELATION_TOUCH',
        touchingRelationIds: [],
        touchingRelationKinds: [],
        touchCount: 0,
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
      }),
    );
    expect(result.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(result.supportChannelPersistenceVerdictAuthorized).toBe(false);
  });

  test('fails closed when I52 is stale against the exact I39 report chain', () => {
    const material = clashFixture();
    const { condition, support, contestMethodology } = upstream(material);
    const stale = {
      ...support,
      reportId: `${support.reportId}_stale`,
      upstreamI39ReportId: `${condition.reportId}_other`,
    } as ChallengeCombinationSupportChannelEvidenceReport;

    const result = buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
      material,
      condition,
      stale,
      contestMethodology,
    );

    expect(result.status).toBe('I52_UNRESOLVED_OR_MISALIGNED');
    expect(result.items).toEqual([]);
  });

  test('fails closed when an I52 source pillar/component identity is tampered', () => {
    const material = clashFixture();
    const { condition, support, contestMethodology } = upstream(material);
    const tamperedItems = support.items.map((item) => ({
      ...item,
      participantSupport: item.participantSupport.map((participant) => {
        if (
          participant.participantPillar !== 'month' ||
          participant.participantComponent !== 'branch' ||
          participant.participantValue !== '해'
        ) {
          return participant;
        }
        return {
          ...participant,
          supportChannels: participant.supportChannels.map((channel) =>
            channel.sourcePillar === 'hour' && channel.sourceComponent === 'branch'
              ? { ...channel, sourcePillar: 'day' as const }
              : channel,
          ),
        };
      }),
    }));
    const tampered = {
      ...support,
      reportId: `${support.reportId}_tampered`,
      items: tamperedItems,
    } as ChallengeCombinationSupportChannelEvidenceReport;

    const result = buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
      material,
      condition,
      tampered,
      contestMethodology,
    );

    expect(result.status).toBe('SUPPORT_SOURCE_IDENTITY_MISMATCH');
    expect(result.items).toEqual([]);
  });

  test('fails closed when the current pillars no longer contain the routed combination identity', () => {
    const material = clashFixture();
    const { condition, support, contestMethodology } = upstream(material);
    const drifted: StructuralPillarInput = {
      ...material,
      year: pillar('병', '묘'),
    };

    const result = buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
      drifted,
      condition,
      support,
      contestMethodology,
    );

    expect(result.status).toBe('CURRENT_COMBINATION_IDENTITY_MISMATCH');
    expect(result.contestTopologyEvidenceAvailable).toBe(false);
  });

  test('preserves force, usefulness, scoring, classification, and all activation/persistence guards', () => {
    const first = report(clashFixture());
    const second = report(clashFixture());

    expect(first.reportId).toBe(second.reportId);
    expect(first.contestTopologyEvidenceAvailable).toBe(true);
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
