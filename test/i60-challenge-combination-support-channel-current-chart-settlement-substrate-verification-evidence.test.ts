import { describe, expect, test } from 'vitest';
import {
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview,
  buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence,
  type ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  type ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  type ChallengeTargetClashDependencyEvidenceReport,
  type ChallengeTargetCombinationDependencyEvidenceReport,
} from '../src/index.js';

function i58(
  dependency:
    | 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    | 'CLASH_RELATIVE_FORCE_SETTLEMENT'
    | 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE'
    | 'CLASH_INTERACTION_SETTLEMENT'
    | 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    | 'TOUCH_SPECIFIC_RELATION_SETTLEMENT'
    | 'COMPETING_RELATION_SETTLEMENT',
  options: {
    currentKind?: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination';
    topology?: 'CURRENT_COMBINATION_PARTICIPATION' | 'COMPETING_CLASH_TOUCH' | 'COMPETING_COMBINATION_TOUCH' | 'MULTIPLE_TRACKED_RELATION_TOUCHES';
    touchIds?: readonly string[];
    touchKinds?: readonly ('branch_clash' | 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination')[];
    sourceComponent?: 'stem' | 'branch';
    sourceValue?: string;
  } = {},
): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport {
  const touchIds = options.touchIds ?? ['clash-1'];
  const touchKinds = options.touchKinds ?? ['branch_clash'];
  return {
    reportId: `i58-${dependency}`,
    evidenceVersion: 'fixture',
    status: 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE',
    upstreamI56ReportId: 'i56-fixture',
    upstreamI57ReviewId: 'i57-fixture',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        currentCombinationRelationId: 'current-combination',
        currentCombinationRelationKind: options.currentKind ?? 'branch_six_combination',
        targetParticipantPillar: 'day',
        targetParticipantComponent: 'branch',
        targetParticipantValue: '술',
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        sourcePillar: 'month',
        sourceComponent: options.sourceComponent ?? 'branch',
        sourceValue: options.sourceValue ?? '해',
        contestTopologyState: options.topology ?? 'COMPETING_CLASH_TOUCH',
        touchingRelationIds: touchIds,
        touchingRelationKinds: touchKinds,
        touchCount: touchIds.length,
        directContestSettlementRequired: true,
        requiredSettlementDependencies: [dependency],
        dependencyApplicability: [
          {
            dependency,
            applicabilityStatus:
              dependency === 'TOUCH_SPECIFIC_RELATION_SETTLEMENT'
                ? 'MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT'
                : dependency === 'COMPETING_RELATION_SETTLEMENT'
                  ? 'COMPETING_RELATION_PRECEDENCE_UNRESOLVED'
                  : dependency === 'CLASH_INTERACTION_SETTLEMENT'
                    ? 'NARROW_BUREAU_STATE_AUTHORITY_NOT_GENERIC_SUPPORT_CHANNEL_SETTLEMENT'
                    : 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED',
            authorityRefs: [],
            reusableSubstrateAvailable:
              dependency !== 'TOUCH_SPECIFIC_RELATION_SETTLEMENT',
            currentChartSettlementSubstrateVerified: false,
            settlementOutcomeResolved: false,
          },
        ],
        allRequiredSettlementDependenciesHaveApplicabilityEvidence: true,
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
    authorityApplicabilityEvidenceAvailable: true,
    currentChartRelationSpecificSettlementEvidenceVerified: false,
    anyRoutedSettlementOutcomeResolved: false,
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

function i33(exact = true): ChallengeTargetClashDependencyEvidenceReport {
  return {
    reportId: exact ? 'i33-exact' : 'i33-mismatch',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    upstreamI29ReportId: 'i29',
    upstreamI31ReportId: 'i31',
    monthBranch: '해',
    commandElement: '수',
    candidates: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        targetElement: '화',
        targetRootCandidatePosition: 'day',
        targetRootCandidateBranch: '술',
        targetRootCandidateClass: 'RESIDUAL_QI_ROOT',
        clashRelationId: exact ? 'clash-1' : 'other-clash',
        participants: [
          {
            role: 'TARGET_ROOT_CANDIDATE',
            position: 'day',
            branch: '술',
            branchElement: '토',
            seasonalPhase: '囚',
            visibleSameElementStemPositions: [],
            visibleResourceStemPositions: [],
            sameElementBranchPositions: ['day'],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchPositions: [],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            role: 'CLASH_COUNTERPART',
            position: 'month',
            branch: '해',
            branchElement: '수',
            seasonalPhase: '旺',
            visibleSameElementStemPositions: [],
            visibleResourceStemPositions: [],
            sameElementBranchPositions: ['month'],
            additionalSameElementBranchSupportPositions: [],
            resourceBranchPositions: [],
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
        ],
        seasonalAdvantageCandidate: 'CLASH_COUNTERPART',
        rescueTopologyCandidates: [
          {
            rescueRelationId: 'rescue-1',
            rescueKind: 'SIX_COMBINATION_RESCUE_CANDIDATE',
            sharedClashParticipantPositions: ['month'],
            rescueStrength: 'not_evaluated',
            rescueEffect: 'not_resolved',
            clashSettlement: 'not_determined',
          },
        ],
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
  };
}

function i35(
  relationId = 'current-combination',
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination' = 'branch_six_combination',
): ChallengeTargetCombinationDependencyEvidenceReport {
  return {
    reportId: `i35-${relationId}`,
    evidenceVersion: 'fixture',
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    upstreamI29ReportId: 'i29',
    upstreamI31ReportId: 'i31',
    monthBranch: '해',
    commandElement: '수',
    candidates: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        targetElement: '화',
        subjectKind: 'TARGET_ROOT_CANDIDATE',
        subjectPosition: 'day',
        subjectValue: '술',
        rootCandidateClass: 'RESIDUAL_QI_ROOT',
        relationId,
        relationKind,
        relationArity: relationKind === 'branch_three_combination' ? 3 : 2,
        relationSourceIds: [],
        participants: [
          {
            pillar: 'month',
            component: 'branch',
            value: '해',
            element: '수',
            seasonalPhase: '旺',
            visibleSameElementStemPositions: [],
            visibleResourceStemPositions: [],
            sameElementBranchPositions: ['month'],
            resourceBranchPositions: [],
            supportInterferenceEffect: 'not_resolved',
            numericWeight: 'not_assigned',
          },
          {
            pillar: 'day',
            component: 'branch',
            value: '술',
            element: '토',
            seasonalPhase: '囚',
            visibleSameElementStemPositions: [],
            visibleResourceStemPositions: [],
            sameElementBranchPositions: ['day'],
            resourceBranchPositions: [],
            supportInterferenceEffect: 'not_resolved',
            numericWeight: 'not_assigned',
          },
        ],
        monthBranch: '해',
        commandElement: '수',
        targetElementSeasonalPhase: '休',
        structuralMembershipComplete: true,
        transformationEstablished: false,
        transformationTargetElement: 'not_emitted',
        completeSupportInterferenceModelAvailable: false,
        competingRelationTopology: [],
        combinationTransformationConditions: 'not_resolved',
        combinationEffectVerdict: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    transformationTargetElementEmissionAuthorized: false,
    completeSupportInterferenceModelAvailable: false,
    hiddenOnlyTargetCombinationRootEffectAuthorized: false,
    earthTargetCombinationRootEffectAuthorized: false,
    combinationEffectVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function i47(exact = true): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return {
    reportId: exact ? 'i47-exact' : 'i47-mismatch',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE',
    upstreamI45ReportId: 'i45',
    upstreamI46ReviewId: 'i46',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        formationRelationId: exact ? 'current-combination' : 'other-combination',
        bureauParticipantPositions: ['year', 'day', 'hour'],
        bureauSpanStart: 'year',
        bureauSpanEnd: 'hour',
        formationState: 'STRUCTURAL_BUREAU_FORMED',
        clashes: [
          {
            clashRelationId: exact ? 'clash-1' : 'other-clash',
            clashedBureauParticipantPosition: 'day',
            clashCounterpartPosition: 'month',
            bureauSpanStart: 'year',
            bureauSpanEnd: 'hour',
            counterpartEmbeddedWithinBureauSpan: true,
            counterpartTightToClashedParticipant: true,
            placementClass: 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
            settlement: 'DIRECT_BUREAU_BREAK_AUTHORIZED',
            deterministicBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
            damageMagnitude: 'not_assigned',
            numericWeight: 'not_assigned',
          },
        ],
        trackedClashCount: 1,
        directBreakCount: 1,
        postInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
        postInteractionBureauStateBasis: 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH',
        genericIntactOrDamagedVerdict: 'not_determined',
        seasonalOverrideResolved: false,
        supportOverrideResolved: false,
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    placementClassificationAvailable: true,
    tightEmbeddedBreakStateEmissionAuthorized: true,
    genericPostInteractionBureauStateEmissionAuthorized: false,
    damagedBureauMagnitudeClassificationAuthorized: false,
    multipleClashAggregationAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

const methodology =
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();

describe('I60 current-chart settlement substrate verification evidence', () => {
  test('verifies exact I33 clash and rescue substrate without resolving relative force, rescue effect, or settlement outcome', () => {
    for (const dependency of [
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
    ] as const) {
      const result = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
        i58(dependency),
        methodology,
        i33(true),
        i35(),
        i47(false),
      );
      const verification = result.items[0]?.dependencyVerification[0];

      expect(result.status).toBe('RESOLVED_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE');
      expect(verification?.currentChartSettlementSubstrateVerified).toBe(true);
      expect(verification?.settlementOutcomeResolved).toBe(false);
      expect(result.anyRoutedSettlementOutcomeResolved).toBe(false);
      expect(result.supportChannelActivationVerdictAuthorized).toBe(false);
      expect(result.supportChannelPersistenceVerdictAuthorized).toBe(false);
    }
  });

  test('rejects I33 reuse when the exact clash identity does not match the support source route', () => {
    const result = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('CLASH_RELATIVE_FORCE_SETTLEMENT'),
      methodology,
      i33(false),
      i35(),
      i47(false),
    );
    const verification = result.items[0]?.dependencyVerification[0];

    expect(verification?.verificationStatus).toBe('UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH');
    expect(verification?.currentChartSettlementSubstrateVerified).toBe(false);
  });

  test('verifies current and competing I35 combination substrate only on exact relation/source identity', () => {
    const current = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT', {
        topology: 'CURRENT_COMBINATION_PARTICIPATION',
        touchIds: ['current-combination'],
        touchKinds: ['branch_six_combination'],
      }),
      methodology,
      i33(false),
      i35('current-combination'),
      i47(false),
    );
    const competing = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT', {
        topology: 'COMPETING_COMBINATION_TOUCH',
        touchIds: ['competing-combination'],
        touchKinds: ['branch_six_combination'],
      }),
      methodology,
      i33(false),
      i35('competing-combination'),
      i47(false),
    );

    expect(current.items[0]?.dependencyVerification[0]?.currentChartSettlementSubstrateVerified).toBe(true);
    expect(competing.items[0]?.dependencyVerification[0]?.currentChartSettlementSubstrateVerified).toBe(true);
    expect(competing.items[0]?.dependencyVerification[0]?.verifiedAuthorityRefs).toEqual(['I35']);
  });

  test('preserves exact I47 bureau break as narrow context while refusing support-source destruction', () => {
    const result = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('CLASH_INTERACTION_SETTLEMENT', { currentKind: 'branch_three_combination' }),
      methodology,
      i33(true),
      i35('current-combination', 'branch_three_combination'),
      i47(true),
    );
    const verification = result.items[0]?.dependencyVerification[0];

    expect(verification?.currentChartSettlementSubstrateVerified).toBe(true);
    expect(verification?.narrowBureauContextStatus).toBe('VERIFIED_BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(verification?.narrowBureauState).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(verification?.settlementOutcomeResolved).toBe(false);
    expect(result.items[0]?.supportChannelDestroyed).toBe('not_determined');
    expect(result.supportChannelDestructionVerdictAuthorized).toBe(false);
  });

  test('keeps multi-touch pairing and competing-relation precedence fail-closed', () => {
    const multi = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('TOUCH_SPECIFIC_RELATION_SETTLEMENT', {
        topology: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
        touchIds: ['clash-1', 'competing-combination'],
        touchKinds: ['branch_clash', 'branch_six_combination'],
      }),
      methodology,
      i33(true),
      i35('competing-combination'),
      i47(false),
    );
    const precedence = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('COMPETING_RELATION_SETTLEMENT', {
        topology: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
        touchIds: ['clash-1', 'competing-combination'],
        touchKinds: ['branch_clash', 'branch_six_combination'],
      }),
      methodology,
      i33(true),
      i35('competing-combination'),
      i47(false),
    );

    expect(multi.items[0]?.dependencyVerification[0]?.verificationStatus).toBe('BLOCKED_MULTI_TOUCH_PAIRING');
    expect(precedence.items[0]?.dependencyVerification[0]?.verificationStatus).toBe('BLOCKED_COMPETING_RELATION_PRECEDENCE');
    expect(multi.items[0]?.dependencyVerification[0]?.currentChartSettlementSubstrateVerified).toBe(false);
    expect(precedence.items[0]?.dependencyVerification[0]?.currentChartSettlementSubstrateVerified).toBe(false);
  });

  test('fails closed on non-canonical I59 and leaves force/scoring/classification guards closed', () => {
    const modified = { ...methodology, reviewId: `${methodology.reviewId}_other` };
    const result = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('CLASH_RELATIVE_FORCE_SETTLEMENT'),
      modified,
      i33(true),
      i35(),
      i47(false),
    );

    expect(result.status).toBe('I59_METHODOLOGY_NOT_AUTHORIZED');
    expect(result.currentChartSettlementSubstrateVerificationEvidenceAvailable).toBe(false);
    expect(result.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(result.classificationAuthorized).toBe(false);
    expect(result.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and keeps verified substrate strictly below all settlement/effect verdicts', () => {
    const first = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('CLASH_RELATIVE_FORCE_SETTLEMENT'),
      methodology,
      i33(true),
      i35(),
      i47(false),
    );
    const second = buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      i58('CLASH_RELATIVE_FORCE_SETTLEMENT'),
      methodology,
      i33(true),
      i35(),
      i47(false),
    );

    expect(first.reportId).toBe(second.reportId);
    expect(first.anyCurrentChartSettlementSubstrateVerified).toBe(true);
    expect(first.anyRoutedSettlementOutcomeResolved).toBe(false);
    expect(first.items[0]?.supportChannelActive).toBe('not_determined');
    expect(first.items[0]?.supportChannelPersisted).toBe('not_determined');
    expect(first.items[0]?.supportChannelNetEffect).toBe('not_resolved');
  });
});
