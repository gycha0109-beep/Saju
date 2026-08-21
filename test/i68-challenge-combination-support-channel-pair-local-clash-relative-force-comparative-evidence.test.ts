import { describe, expect, test } from 'vitest';
import {
  buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview,
  type ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  type ChallengeTargetClashDependencyEvidenceReport,
  type ClashSupportContextReport,
} from '../src/index.js';
import { buildI68ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidence } from '../src/research/i68-challenge-combination-support-channel-pair-local-clash-relative-force-comparative-evidence.js';

function i33(
  firstPhase: '旺' | '相' | '休' | '囚' | '死' = '旺',
  secondPhase: '旺' | '相' | '休' | '囚' | '死' = '休',
): ChallengeTargetClashDependencyEvidenceReport {
  return {
    reportId: `i33_i68_${firstPhase}_${secondPhase}`,
    evidenceVersion: 'fixture',
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    candidates: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        targetElement: '수',
        targetRootCandidatePosition: 'hour',
        targetRootCandidateBranch: '신',
        targetRootCandidateClass: 'target_birth_lu_wang_root_candidate',
        clashRelationId: 'clash-a',
        participants: [
          {
            role: 'TARGET_ROOT_CANDIDATE',
            position: 'hour',
            branch: '신',
            branchElement: '금',
            seasonalPhase: firstPhase,
            visibleSameElementStemPositions: [],
            visibleResourceStemPositions: [],
            sameElementBranchPositions: ['hour'],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchPositions: [],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            role: 'CLASH_COUNTERPART',
            position: 'day',
            branch: '인',
            branchElement: '목',
            seasonalPhase: secondPhase,
            visibleSameElementStemPositions: [],
            visibleResourceStemPositions: [],
            sameElementBranchPositions: ['day'],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchPositions: [],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
        ],
        seasonalAdvantageCandidate:
          firstPhase === secondPhase
            ? 'TIED_SEASONAL_PHASE'
            : firstPhase === '旺'
              ? 'TARGET_ROOT_CANDIDATE'
              : 'CLASH_COUNTERPART',
        rescueTopologyCandidates: [],
        earthTargetRootEffectResolutionAuthorized: false,
        relativeBranchForceVerdict: 'not_determined',
        supportEffectVerdict: 'not_resolved',
        clashWinnerVerdict: 'not_determined',
        rescueEffectVerdict: 'not_resolved',
        clashSettlementVerdict: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    lowerLevelI20ReportContractReused: false,
    lowerLevelI20bReportContractReused: false,
    lowerLevelI20cReportContractReused: false,
    lowerLevelI20dReportContractReused: false,
    hiddenOnlyTargetClashRootEffectAuthorized: false,
    earthTargetRootEffectResolutionAuthorized: false,
    relativeBranchForceVerdict: 'not_determined',
    clashWinnerVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as ChallengeTargetClashDependencyEvidenceReport;
}

function i65(i33ReportId: string): ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport {
  return {
    reportId: 'i65_i68_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE',
    upstreamI61ReportId: 'i61_fixture',
    upstreamI62ReviewId: 'i62_fixture',
    upstreamI63ReportId: 'i63_fixture',
    upstreamI64ReviewId: 'i64_fixture',
    i33ReportId,
    i35ReportId: 'i35_fixture',
    i47ReportId: 'i47_fixture',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        currentCombinationRelationId: 'current-three',
        currentCombinationRelationKind: 'branch_three_combination',
        targetParticipantPillar: 'month',
        targetParticipantComponent: 'branch',
        targetParticipantValue: '해',
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        sourcePillar: 'hour',
        sourceComponent: 'branch',
        sourceValue: '신',
        contestTopologyState: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
        touchCount: 2,
        dispatchedRelationVerification: [
          {
            relationId: 'clash-a',
            relationKind: 'branch_clash',
            isCurrentCombinationRelation: false,
            dispatchClass: 'COMPETING_CLASH_DISPATCH',
            dependencyVerification: [
              {
                dependency: 'CLASH_RELATIVE_FORCE_SETTLEMENT',
                route: 'EXACT_I33_CLASH_SUBSTRATE',
                verificationStatus: 'VERIFIED_EXACT_AUTHORITY_DOMAIN',
                currentChartSettlementSubstrateVerified: true,
                verifiedAuthorityRefs: ['I33', 'I49', 'I50'],
                rescueTopologyCandidateCount: 'not_applicable',
                narrowBureauContextStatus: 'NOT_APPLICABLE',
                narrowBureauState: 'not_applicable',
                settlementOutcomeResolved: false,
              },
            ],
            allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate: true,
            precedenceWithinMultiTouch: 'not_determined',
            settlementOutcome: 'not_determined',
          },
        ],
        allDispatchedRelationSettlementSubstratesVerified: true,
        anySettlementOutcomeResolved: false,
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
        supportChannelNeutralized: 'not_determined',
        supportChannelDestroyed: 'not_determined',
        supportChannelNetEffect: 'not_resolved',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable: true,
    anyDispatchedRelationCurrentChartSettlementSubstrateVerified: true,
    allDispatchedRelationCurrentChartSettlementSubstratesVerified: true,
    anyRoutedSettlementOutcomeResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    contestOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function i20c(
  firstSignals: ClashSupportContextReport['candidates'][number]['participants'][number]['signals'],
  secondSignals: ClashSupportContextReport['candidates'][number]['participants'][number]['signals'],
): ClashSupportContextReport {
  return {
    reportId: `i20c_${firstSignals.join('_')}_${secondSignals.join('_')}`,
    reportVersion: 'fixture',
    status: 'RESOLVED_SUPPORT_CONTEXT',
    seasonalAdvantageReportId: 'i20b_fixture',
    candidates: [
      {
        relationId: 'clash-a',
        participants: [
          {
            position: 'hour',
            branch: '신',
            signals: firstSignals,
            samePillarVisibleSameElementSupport: false,
            externalVisibleSameElementSupportPositions: [],
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
            signals: secondSignals,
            samePillarVisibleSameElementSupport: false,
            externalVisibleSameElementSupportPositions: [],
            visibleResourceSupportPositions: [],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchSupportPositions: [],
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

function build(
  clash = i33(),
  support = i20c(
    ['VISIBLE_RESOURCE_SUPPORT', 'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT'],
    ['VISIBLE_RESOURCE_SUPPORT'],
  ),
) {
  return buildI68ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidence(
    i65(clash.reportId),
    clash,
    support,
    buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview(),
  );
}

describe('I68 pair-local clash relative-force comparative evidence', () => {
  test('materializes first tracked-evidence dominance when seasonal order and support-set inclusion align', () => {
    const report = build();
    const item = report.items[0];

    expect(report.status).toBe('RESOLVED_TRACKED_EVIDENCE_PARTIAL_ORDER');
    expect(report.trackedEvidencePartialOrderEvidenceAvailable).toBe(true);
    expect(item?.seasonalComparison).toBe('FIRST_SEASONAL_PHASE_ADVANTAGE');
    expect(item?.supportSignalSetRelation).toBe(
      'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET',
    );
    expect(item?.trackedEvidencePartialOrderState).toBe(
      'FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE',
    );
  });

  test('preserves incomparable when seasonal advantage and support-set inclusion point in opposite directions', () => {
    const report = build(
      i33('旺', '休'),
      i20c(['VISIBLE_RESOURCE_SUPPORT'], [
        'VISIBLE_RESOURCE_SUPPORT',
        'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT',
      ]),
    );

    expect(report.items[0]?.supportSignalSetRelation).toBe(
      'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET',
    );
    expect(report.items[0]?.trackedEvidencePartialOrderState).toBe(
      'TRACKED_EVIDENCE_INCOMPARABLE',
    );
  });

  test('normalizes NO_TRACKED_SUPPORT_CONTEXT to an empty set and can emit tracked-evidence equivalence', () => {
    const report = build(
      i33('休', '休'),
      i20c(['NO_TRACKED_SUPPORT_CONTEXT'], ['NO_TRACKED_SUPPORT_CONTEXT']),
    );
    const item = report.items[0];

    expect(item?.participants[0].trackedSupportSignals).toEqual([]);
    expect(item?.participants[1].trackedSupportSignals).toEqual([]);
    expect(item?.supportSignalSetRelation).toBe('EQUAL_TRACKED_SUPPORT_SIGNAL_SET');
    expect(item?.trackedEvidencePartialOrderState).toBe('TRACKED_EVIDENCE_EQUIVALENT');
  });

  test('fails closed when I20c participant identity does not match exact I33 clash participants', () => {
    const clash = i33();
    const support = i20c(['VISIBLE_RESOURCE_SUPPORT'], ['VISIBLE_RESOURCE_SUPPORT']);
    const mismatched = {
      ...support,
      candidates: [
        {
          ...support.candidates[0]!,
          participants: [
            { ...support.candidates[0]!.participants[0], branch: '유' as const },
            support.candidates[0]!.participants[1],
          ] as const,
        },
      ],
    };
    const report = build(clash, mismatched);

    expect(report.status).toBe('I20C_UNRESOLVED_OR_MISALIGNED');
    expect(report.items).toEqual([]);
  });

  test('keeps dominance/equivalence topology distinct from final force, winner, rescue, and settlement outcomes', () => {
    const report = build();
    const item = report.items[0];

    expect(report.trackedEvidenceDominanceCandidateIsRelativeForceVerdict).toBe(false);
    expect(report.trackedEvidenceEquivalentIsRelativeForceTieVerdict).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.supportEffectResolutionAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(item?.relativeForceVerdict).toBe('not_determined');
    expect(item?.clashWinnerVerdict).toBe('not_determined');
    expect(item?.rescueEffectVerdict).toBe('not_resolved');
    expect(item?.clashSettlementVerdict).toBe('not_determined');
  });

  test('is deterministic and keeps precedence, force, scoring, and classification guards closed', () => {
    const first = build();
    const second = build();

    expect(first.reportId).toBe(second.reportId);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.items[0]?.numericScore).toBe('not_assigned');
  });
});
