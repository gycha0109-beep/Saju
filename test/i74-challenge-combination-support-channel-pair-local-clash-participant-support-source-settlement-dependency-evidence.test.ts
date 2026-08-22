import { describe, expect, test } from 'vitest';
import {
  buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview,
  type ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport,
} from '../src/index.js';
import { buildI74ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidence } from '../src/research/i74-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-evidence.js';

const EVALUATED_CLASH_ID = 'branch_clash:day:branch:인|hour:branch:신';

function i72(): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport {
  return {
    reportId: 'i72_i74_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE',
    upstreamI68ReportId: 'i68_fixture',
    upstreamI20cReportId: 'i20c_fixture',
    upstreamI71ReviewId: 'i71_fixture',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        evaluatedClashRelationId: EVALUATED_CLASH_ID,
        evaluatedSupportChannelSourcePillar: 'hour',
        evaluatedSupportChannelSourceBranch: '신',
        participantSupportSources: [
          {
            participantRole: 'CLASH_COUNTERPART',
            participantPosition: 'day',
            participantBranch: '인',
            sourcePillar: 'hour',
            sourceComponent: 'branch',
            sourceValue: '신',
            supportSignals: ['RESOURCE_BRANCH_SUPPORT'],
            contestTopologyState: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
            touchingRelations: [
              {
                relationId: EVALUATED_CLASH_ID,
                relationKind: 'branch_clash',
                isEvaluatedClashRelation: true,
                precedence: 'not_determined',
                settlementOutcome: 'not_determined',
              },
              {
                relationId: 'branch_three_combination:month:branch:사|year:branch:유|hour:branch:축',
                relationKind: 'branch_three_combination',
                isEvaluatedClashRelation: false,
                precedence: 'not_determined',
                settlementOutcome: 'not_determined',
              },
            ],
            touchCount: 2,
            relationIdKindPairEvidenceAvailable: true,
            sourceActive: 'not_determined',
            sourcePersisted: 'not_determined',
            sourceNeutralized: 'not_determined',
            sourceDestroyed: 'not_determined',
            effectiveSupportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            participantRole: 'TARGET_ROOT_CANDIDATE',
            participantPosition: 'hour',
            participantBranch: '신',
            sourcePillar: 'year',
            sourceComponent: 'stem',
            sourceValue: '갑',
            supportSignals: ['EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT'],
            contestTopologyState: 'NO_TRACKED_RELATION_TOUCH',
            touchingRelations: [],
            touchCount: 0,
            relationIdKindPairEvidenceAvailable: true,
            sourceActive: 'not_determined',
            sourcePersisted: 'not_determined',
            sourceNeutralized: 'not_determined',
            sourceDestroyed: 'not_determined',
            effectiveSupportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            participantRole: 'TARGET_ROOT_CANDIDATE',
            participantPosition: 'hour',
            participantBranch: '신',
            sourcePillar: 'month',
            sourceComponent: 'branch',
            sourceValue: '사',
            supportSignals: ['RESOURCE_BRANCH_SUPPORT'],
            contestTopologyState: 'OTHER_CLASH_TOUCH',
            touchingRelations: [
              {
                relationId: 'branch_clash:year:branch:해|month:branch:사',
                relationKind: 'branch_clash',
                isEvaluatedClashRelation: false,
                precedence: 'not_determined',
                settlementOutcome: 'not_determined',
              },
            ],
            touchCount: 1,
            relationIdKindPairEvidenceAvailable: true,
            sourceActive: 'not_determined',
            sourcePersisted: 'not_determined',
            sourceNeutralized: 'not_determined',
            sourceDestroyed: 'not_determined',
            effectiveSupportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
        ],
        sourceContestTopologyEvidenceAvailable: true,
        anyMultiTouchSupportSource: true,
        sourceActivationVerdictAuthorized: false,
        sourcePersistenceVerdictAuthorized: false,
        sourceEffectiveSupportVerdictAuthorized: false,
        relativeForceVerdict: 'not_determined',
        clashWinnerVerdict: 'not_determined',
        rescueEffectVerdict: 'not_resolved',
        clashSettlementVerdict: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    supportSourceIdentityEvidenceAvailable: true,
    supportSourceContestTopologyEvidenceAvailable: true,
    authoritativeRelationIdKindPairEvidenceAvailable: true,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
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

function build(report = i72()) {
  return buildI74ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidence(
    report,
    buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview(),
  );
}

describe('I74 support-source settlement dependency evidence', () => {
  test('preserves same evaluated-clash circularity inside multi-touch aggregate topology', () => {
    const report = build();
    expect(report.status).toBe('RESOLVED_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE');
    const source = report.items[0]?.participantSupportSources[0];
    expect(source?.dependencyClass).toBe('MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY');
    expect(source?.sameEvaluatedClashCircularity).toBe(true);
    expect(source?.crossRelationPrecedenceMayBeRequired).toBe(true);
    expect(source?.touchDependencies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          relationId: EVALUATED_CLASH_ID,
          dependencyClass: 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY',
          sameEvaluatedClashCircularity: true,
        }),
        expect.objectContaining({
          dependencyClass: 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY',
          sameEvaluatedClashCircularity: false,
        }),
      ]),
    );
  });

  test('keeps no-touch as no tracked settlement dependency without resolving effective support', () => {
    const report = build();
    const source = report.items[0]?.participantSupportSources[1];
    expect(source?.dependencyClass).toBe(
      'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED',
    );
    expect(source?.touchDependencies).toEqual([]);
    expect(source?.sourceActive).toBe('not_determined');
    expect(source?.sourcePersisted).toBe('not_determined');
    expect(source?.effectiveSupportEffect).toBe('not_resolved');
  });

  test('classifies an independent clash touch without borrowing a settlement outcome', () => {
    const report = build();
    const source = report.items[0]?.participantSupportSources[2];
    expect(source?.dependencyClass).toBe('OTHER_CLASH_SETTLEMENT_DEPENDENCY');
    expect(source?.independentRelationSettlementRequired).toBe(true);
    expect(source?.touchDependencies[0]?.dependencyClass).toBe('OTHER_CLASH_SETTLEMENT_DEPENDENCY');
    expect(source?.touchDependencies[0]?.settlementOutcome).toBe('not_determined');
  });

  test('fails closed when aggregate topology and exact touch metadata diverge', () => {
    const report = i72();
    const source = report.items[0]!.participantSupportSources[0]!;
    const bad = {
      ...report,
      items: [
        {
          ...report.items[0]!,
          participantSupportSources: [
            { ...source, contestTopologyState: 'COMBINATION_TOUCH' as const },
            ...report.items[0]!.participantSupportSources.slice(1),
          ],
        },
      ],
    };
    const result = build(bad);
    expect(result.status).toBe('TOPOLOGY_TOUCH_METADATA_MISMATCH');
    expect(result.items).toEqual([]);
  });

  test('keeps all effect, settlement, precedence, scoring, and classification verdicts blocked', () => {
    const report = build();
    expect(report.iterativeFixedPointResolutionAuthorized).toBe(false);
    expect(report.numericConvergenceResolutionAuthorized).toBe(false);
    expect(report.preInteractionSupportStateSubstitutionAuthorized).toBe(false);
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
