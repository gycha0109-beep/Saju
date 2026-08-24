import { describe, expect, test } from 'vitest';
import type { StructuralPillarInput } from '../src/calculation/structural-relations.js';
import {
  buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview,
  type ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport,
  type ClashSupportContextReport,
} from '../src/index.js';
import { buildI72ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidence } from '../src/research/i72-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-evidence.js';

const EVALUATED_CLASH_ID = 'branch_clash:day:branch:인|hour:branch:신';

function pillars(): StructuralPillarInput {
  return {
    year: { stem: { value: '갑' }, branch: { value: '자' } },
    month: { stem: { value: '기' }, branch: { value: '사' } },
    day: { stem: { value: '을' }, branch: { value: '인' } },
    hour: { stem: { value: '경' }, branch: { value: '신' } },
  } as unknown as StructuralPillarInput;
}

function i20c(): ClashSupportContextReport {
  return {
    reportId: 'i20c_i72_fixture',
    reportVersion: 'fixture',
    status: 'RESOLVED_SUPPORT_CONTEXT',
    seasonalAdvantageReportId: 'i20b_fixture',
    candidates: [
      {
        relationId: EVALUATED_CLASH_ID,
        participants: [
          {
            position: 'hour',
            branch: '신',
            signals: ['EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT'],
            samePillarVisibleSameElementSupport: false,
            externalVisibleSameElementSupportPositions: ['year'],
            visibleResourceSupportPositions: [],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchSupportPositions: [],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            position: 'day',
            branch: '인',
            signals: ['RESOURCE_BRANCH_SUPPORT'],
            samePillarVisibleSameElementSupport: false,
            externalVisibleSameElementSupportPositions: [],
            visibleResourceSupportPositions: [],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchSupportPositions: ['hour'],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
        ],
        supportAsymmetryVerdict: 'not_determined',
        rescueEffect: 'not_resolved',
        clashWinner: 'not_determined',
        rootEffectVerdict: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    supportEffectAuthorized: false,
    relativeForceVerdictAuthorized: false,
    rootEffectResolutionAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: [],
    notes: [],
  };
}

function i68(i20cReportId = 'i20c_i72_fixture'): ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport {
  return {
    reportId: 'i68_i72_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_TRACKED_EVIDENCE_PARTIAL_ORDER',
    upstreamI65ReportId: 'i65_fixture',
    upstreamI33ReportId: 'i33_fixture',
    upstreamI20cReportId: i20cReportId,
    upstreamI67ReviewId: 'i67_fixture',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        relationId: EVALUATED_CLASH_ID,
        sourcePillar: 'hour',
        sourceBranch: '신',
        participants: [
          {
            role: 'TARGET_ROOT_CANDIDATE',
            position: 'hour',
            branch: '신',
            seasonalPhase: '旺',
            trackedSupportSignals: ['EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT'],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            role: 'CLASH_COUNTERPART',
            position: 'day',
            branch: '인',
            seasonalPhase: '休',
            trackedSupportSignals: ['RESOURCE_BRANCH_SUPPORT'],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
        ],
        seasonalComparison: 'FIRST_SEASONAL_PHASE_ADVANTAGE',
        supportSignalSetRelation: 'INCOMPARABLE_TRACKED_SUPPORT_SIGNAL_SETS',
        trackedEvidencePartialOrderState: 'TRACKED_EVIDENCE_INCOMPARABLE',
        relativeForceVerdict: 'not_determined',
        clashWinnerVerdict: 'not_determined',
        supportEffectVerdict: 'not_resolved',
        rescueEffectVerdict: 'not_resolved',
        clashSettlementVerdict: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    trackedEvidencePartialOrderEvidenceAvailable: true,
    trackedEvidencePartialOrderClassificationAuthorized: true,
    trackedEvidenceDominanceCandidateIsRelativeForceVerdict: false,
    trackedEvidenceEquivalentIsRelativeForceTieVerdict: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    supportEffectResolutionAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function build(
  support = i20c(),
  comparative = i68(support.reportId),
) {
  return buildI72ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidence(
    pillars(),
    comparative,
    support,
    buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview(),
  );
}

describe('I72 pair-local clash participant support-source contest topology evidence', () => {
  test('materializes exact source values and relation id-kind pairs from resolved pillars', () => {
    const report = build();
    expect(report.status).toBe('RESOLVED_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE');
    expect(report.supportSourceIdentityEvidenceAvailable).toBe(true);
    expect(report.authoritativeRelationIdKindPairEvidenceAvailable).toBe(true);
    const sources = report.items[0]?.participantSupportSources ?? [];
    const yearStem = sources.find((source) => source.sourcePillar === 'year' && source.sourceComponent === 'stem');
    expect(yearStem?.sourceValue).toBe('갑');
    expect(yearStem?.supportSignals).toEqual(['EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT']);
    expect(yearStem?.contestTopologyState).toBe('COMBINATION_TOUCH');
    expect(yearStem?.touchingRelations[0]?.relationKind).toBe('stem_five_combination');
  });

  test('distinguishes evaluated-clash participation without converting it to destruction', () => {
    const report = build();
    const sources = report.items[0]?.participantSupportSources ?? [];
    const hourBranch = sources.find((source) => source.sourcePillar === 'hour' && source.sourceComponent === 'branch');
    expect(hourBranch?.sourceValue).toBe('신');
    expect(hourBranch?.contestTopologyState).toBe('MULTIPLE_TRACKED_RELATION_TOUCHES');
    expect(hourBranch?.touchingRelations.some((touch) => touch.isEvaluatedClashRelation)).toBe(true);
    expect(hourBranch?.sourceDestroyed).toBe('not_determined');
    expect(hourBranch?.sourcePersisted).toBe('not_determined');
  });

  test('fails closed when I20c signal list and source-position metadata diverge', () => {
    const support = i20c();
    const badSupport = {
      ...support,
      candidates: [
        {
          ...support.candidates[0]!,
          participants: [
            {
              ...support.candidates[0]!.participants[0],
              externalVisibleSameElementSupportPositions: [] as const,
            },
            support.candidates[0]!.participants[1],
          ] as const,
        },
      ],
    };
    const report = build(badSupport, i68(badSupport.reportId));
    expect(report.status).toBe('SUPPORT_SIGNAL_METADATA_MISMATCH');
    expect(report.items).toEqual([]);
  });

  test('fails closed when the evaluated clash is not present in independent structural recomputation', () => {
    const badPillars = {
      ...pillars(),
      hour: { stem: { value: '경' }, branch: { value: '유' } },
    } as unknown as StructuralPillarInput;
    const support = i20c();
    const report = buildI72ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidence(
      badPillars,
      i68(support.reportId),
      support,
      buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview(),
    );
    expect(report.status).toBe('EVALUATED_CLASH_IDENTITY_MISMATCH');
  });

  test('keeps topology distinct from effective support and all downstream verdicts', () => {
    const report = build();
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = build();
    const second = build();
    expect(first.reportId).toBe(second.reportId);
    expect(first.items).toEqual(second.items);
  });
});
