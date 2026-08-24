import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  buildI52ChallengeCombinationSupportChannelEvidence,
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

function pillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '축'),
  };
}

function upstream() {
  const material = pillars();
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(material);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(material, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(material, roots, relations);
  const transformationPolicy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(combinations, transformationPolicy);
  const applicability = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  const condition = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    material,
    combinations,
    references,
    applicability,
  );
  const methodology = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  return { condition, methodology };
}

describe('I52 challenge combination support channel evidence', () => {
  test('materializes identity-local directional support channels and excludes participant self-support', () => {
    const { condition, methodology } = upstream();
    const report = buildI52ChallengeCombinationSupportChannelEvidence(condition, methodology);

    expect(report.status).toBe('RESOLVED_SUPPORT_CHANNEL_EVIDENCE');
    expect(report.supportChannelEvidenceAvailable).toBe(true);
    expect(report.items.length).toBe(condition.items.length);
    for (const item of report.items) {
      const subjectComponent = item.subjectKind === 'VISIBLE_TARGET_STEM' ? 'stem' : 'branch';
      expect(
        item.subjectSupportChannels.some(
          (channel) =>
            channel.channelKind === 'SAME_ELEMENT_PEER_SUPPORT_CHANNEL' &&
            channel.sourcePillar === item.subjectPosition &&
            channel.sourceComponent === subjectComponent,
        ),
      ).toBe(false);
    }
  });

  test('keeps every participant channel bound to an authorized kind and a presence-only state', () => {
    const { condition, methodology } = upstream();
    const report = buildI52ChallengeCombinationSupportChannelEvidence(condition, methodology);

    for (const item of report.items) {
      for (const participant of item.participantSupport) {
        expect(participant.supportPresenceState).toBe(
          participant.supportChannels.length === 0
            ? 'NO_TRACKED_SUPPORT_CHANNEL'
            : 'SUPPORT_CHANNELS_OBSERVED',
        );
        expect(
          participant.supportChannels.every((channel) =>
            ['SAME_ELEMENT_PEER_SUPPORT_CHANNEL', 'RESOURCE_GENERATION_SUPPORT_CHANNEL'].includes(
              channel.channelKind,
            ),
          ),
        ).toBe(true);
      }
    }
  });

  test('does not aggregate channels or resolve activation, persistence, precedence or net effect', () => {
    const { condition, methodology } = upstream();
    const report = buildI52ChallengeCombinationSupportChannelEvidence(condition, methodology);

    expect(report.supportChannelAggregationAuthorized).toBe(false);
    expect(report.supportChannelPrecedenceResolved).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.netSupportInterferenceEffectAuthorized).toBe(false);
    expect(
      report.items.every(
        (item) =>
          item.supportChannelAggregation === 'not_performed' &&
          item.supportChannelPrecedence === 'not_determined' &&
          item.netSupportInterferenceEffect === 'not_resolved',
      ),
    ).toBe(true);
  });

  test('fails closed when the I51 no-aggregation contract is weakened', () => {
    const { condition, methodology } = upstream();
    const invalid = {
      ...methodology,
      reviewId: `${methodology.reviewId}_invalid`,
      supportChannelCountAggregationAuthorized: true,
    } as unknown as typeof methodology;
    const report = buildI52ChallengeCombinationSupportChannelEvidence(condition, invalid);

    expect(report.status).toBe('METHODOLOGY_NOT_AUTHORIZED');
    expect(report.items).toEqual([]);
  });

  test('is deterministic and preserves root-state, force, usefulness, scoring and classification guards', () => {
    const { condition, methodology } = upstream();
    const first = buildI52ChallengeCombinationSupportChannelEvidence(condition, methodology);
    const second = buildI52ChallengeCombinationSupportChannelEvidence(condition, methodology);

    expect(first.reportId).toBe(second.reportId);
    expect(first.postInteractionBureauStateEmissionAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
