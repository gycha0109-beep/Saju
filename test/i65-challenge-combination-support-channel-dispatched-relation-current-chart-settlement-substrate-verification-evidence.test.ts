import { describe, expect, test } from 'vitest';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  type ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  type ChallengeTargetClashDependencyEvidenceReport,
  type ChallengeTargetCombinationDependencyEvidenceReport,
} from '../src/index.js';
import { buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence } from '../src/research/i65-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-evidence.js';

function pairEvidence(): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  return {
    reportId: 'i61_i65_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE',
    upstreamI54ReportId: 'i54_fixture',
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
        touchingRelations: [
          {
            relationId: 'clash-a',
            relationKind: 'branch_clash',
            isCurrentCombinationRelation: false,
            precedence: 'not_determined',
            settlementOutcome: 'not_determined',
          },
          {
            relationId: 'six-b',
            relationKind: 'branch_six_combination',
            isCurrentCombinationRelation: false,
            precedence: 'not_determined',
            settlementOutcome: 'not_determined',
          },
        ],
        touchCount: 2,
        relationIdKindPairEvidenceAvailable: true,
        multiTouchPairingResolvedWhereObserved: true,
        touchSpecificSettlementDispatchAuthorized: false,
        crossRelationPrecedenceAuthorized: false,
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
    relationIdKindPairEvidenceAvailable: true,
    multiTouchRelationIdKindPairEvidenceAvailable: true,
    pairReconstructionFromSeparateI54ArraysUsed: false,
    touchSpecificSettlementDispatchAuthorized: false,
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

function i33(branch = '신'): ChallengeTargetClashDependencyEvidenceReport {
  return {
    reportId: `i33_${branch}`,
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    candidates: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        clashRelationId: 'clash-a',
        participants: [{ position: 'hour', branch }],
        rescueTopologyCandidates: [{ id: 'rescue-topology' }],
      },
    ],
  } as unknown as ChallengeTargetClashDependencyEvidenceReport;
}

function i35(relationId = 'six-b'): ChallengeTargetCombinationDependencyEvidenceReport {
  return {
    reportId: `i35_${relationId}`,
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    candidates: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        relationId,
        relationKind: 'branch_six_combination',
        participants: [{ pillar: 'hour', component: 'branch', value: '신' }],
      },
    ],
  } as unknown as ChallengeTargetCombinationDependencyEvidenceReport;
}

function i47(): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return {
    reportId: 'i47_fixture',
    status: 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        formationRelationId: 'current-three',
        postInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
        clashes: [
          {
            clashRelationId: 'clash-a',
            clashedBureauParticipantPosition: 'hour',
            clashCounterpartPosition: 'day',
          },
        ],
      },
    ],
  } as unknown as ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport;
}

function buildFixture(clashBranch = '신', combinationRelationId = 'six-b') {
  const pair = pairEvidence();
  const i62 =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  const i63 = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
    pair,
    i62,
  );
  const i64 =
    buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();
  return {
    pair,
    i62,
    i63,
    i64,
    clash: i33(clashBranch),
    combination: i35(combinationRelationId),
    bureau: i47(),
  };
}

function buildReport(fixture = buildFixture()) {
  return buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence(
    fixture.pair,
    fixture.i62,
    fixture.i63,
    fixture.i64,
    fixture.clash,
    fixture.combination,
    fixture.bureau,
  );
}

describe('I65 dispatched relation current-chart settlement substrate verification evidence', () => {
  test('verifies each dispatched clash and competing-combination dependency only against its exact authority domain', () => {
    const report = buildReport();
    const relations = report.items[0]?.dispatchedRelationVerification ?? [];
    const verifications = relations.flatMap((relation) => relation.dependencyVerification);

    expect(report.status).toBe(
      'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE',
    );
    expect(verifications).toHaveLength(4);
    expect(verifications.every((item) => item.currentChartSettlementSubstrateVerified)).toBe(true);
    expect(report.allDispatchedRelationCurrentChartSettlementSubstratesVerified).toBe(true);
    expect(
      relations.find((relation) => relation.relationId === 'six-b')
        ?.allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate,
    ).toBe(true);
  });

  test('preserves rescue topology as substrate and narrow I47 bureau state without resolving rescue or support destruction', () => {
    const report = buildReport();
    const clash = report.items[0]?.dispatchedRelationVerification.find(
      (relation) => relation.relationId === 'clash-a',
    );
    const rescue = clash?.dependencyVerification.find(
      (item) => item.dependency === 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
    );
    const interaction = clash?.dependencyVerification.find(
      (item) => item.dependency === 'CLASH_INTERACTION_SETTLEMENT',
    );

    expect(rescue?.rescueTopologyCandidateCount).toBe(1);
    expect(rescue?.settlementOutcomeResolved).toBe(false);
    expect(interaction?.verificationStatus).toBe(
      'VERIFIED_EXACT_AUTHORITY_DOMAIN_WITH_NARROW_BUREAU_CONTEXT',
    );
    expect(interaction?.narrowBureauState).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(report.items[0]?.supportChannelDestroyed).toBe('not_determined');
  });

  test('rejects arbitrary I33 support-source reuse while allowing an independently exact I35 dispatched combination', () => {
    const report = buildReport(buildFixture('유', 'six-b'));
    const clash = report.items[0]?.dispatchedRelationVerification.find(
      (relation) => relation.relationId === 'clash-a',
    );
    const combination = report.items[0]?.dispatchedRelationVerification.find(
      (relation) => relation.relationId === 'six-b',
    );

    expect(
      clash?.dependencyVerification.every(
        (item) => item.currentChartSettlementSubstrateVerified === false,
      ),
    ).toBe(true);
    expect(
      combination?.dependencyVerification.every(
        (item) => item.currentChartSettlementSubstrateVerified,
      ),
    ).toBe(true);
    expect(report.anyDispatchedRelationCurrentChartSettlementSubstrateVerified).toBe(true);
    expect(report.allDispatchedRelationCurrentChartSettlementSubstratesVerified).toBe(false);
  });

  test('rejects arbitrary I35 competing-combination reuse when the exact dispatched relation id is absent', () => {
    const report = buildReport(buildFixture('신', 'different-six'));
    const combination = report.items[0]?.dispatchedRelationVerification.find(
      (relation) => relation.relationId === 'six-b',
    );

    expect(combination?.dependencyVerification).toHaveLength(1);
    expect(combination?.dependencyVerification[0]?.currentChartSettlementSubstrateVerified).toBe(
      false,
    );
    expect(combination?.dependencyVerification[0]?.verificationStatus).toBe(
      'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH',
    );
  });

  test('fails closed when supplied I63 dispatch evidence is stale relative to the exact I61/I62 chain', () => {
    const fixture = buildFixture();
    const stale = { ...fixture.i63, reportId: `${fixture.i63.reportId}_stale` };
    const report =
      buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence(
        fixture.pair,
        fixture.i62,
        stale,
        fixture.i64,
        fixture.clash,
        fixture.combination,
        fixture.bureau,
      );

    expect(report.status).toBe('I63_UNRESOLVED_OR_INVALID');
    expect(report.items).toEqual([]);
    expect(
      report.dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable,
    ).toBe(false);
  });

  test('is deterministic and keeps precedence, settlement outcomes, activation, force, scoring, and classification guards closed', () => {
    const fixture = buildFixture();
    const first = buildReport(fixture);
    const second = buildReport(fixture);

    expect(first.reportId).toBe(second.reportId);
    expect(first.anyRoutedSettlementOutcomeResolved).toBe(false);
    expect(first.pairOrderSignificanceAuthorized).toBe(false);
    expect(first.multiTouchAggregationAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.contestOutcomeVerdictAuthorized).toBe(false);
    expect(first.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(first.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(first.supportChannelNeutralizationVerdictAuthorized).toBe(false);
    expect(first.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(first.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(
      first.items.flatMap((item) => item.dispatchedRelationVerification).every(
        (relation) =>
          relation.precedenceWithinMultiTouch === 'not_determined' &&
          relation.settlementOutcome === 'not_determined',
      ),
    ).toBe(true);
  });
});
