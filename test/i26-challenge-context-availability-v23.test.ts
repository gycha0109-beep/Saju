import { describe, expect, test } from 'vitest';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview,
  buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  type ChallengeContextAvailabilityV22Report,
  type ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  type ChallengeTargetClashDependencyEvidenceReport,
  type ChallengeTargetCombinationDependencyEvidenceReport,
} from '../src/index.js';
import { buildI26ChallengeContextAvailabilityV23 } from '../src/research/i26-challenge-context-availability-v23.js';

const PREFIX = 'challenge-root combination support-channel';

function substrateGap(relationId: string, relationKind: string, dependency: string): string {
  return `${PREFIX} dispatched relation current-chart settlement substrate verification unresolved: ${relationId}|${relationKind}|${dependency}`;
}

function outcomeGap(relationId: string, relationKind: string, dependency: string): string {
  return `${PREFIX} dispatched relation settlement outcome unresolved after verified current-chart substrate: ${relationId}|${relationKind}|${dependency}`;
}

function pairEvidence(): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  return {
    reportId: 'i61_v23_fixture',
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
    reportId: `i33_v23_${branch}`,
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

function i35(): ChallengeTargetCombinationDependencyEvidenceReport {
  return {
    reportId: 'i35_v23',
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    candidates: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        relationId: 'six-b',
        relationKind: 'branch_six_combination',
        participants: [{ pillar: 'hour', component: 'branch', value: '신' }],
      },
    ],
  } as unknown as ChallengeTargetCombinationDependencyEvidenceReport;
}

function i47(): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return {
    reportId: 'i47_v23',
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

function v22(dispatchReportId: string): ChallengeContextAvailabilityV22Report {
  return {
    reportId: 'v22_fixture',
    reportVersion: 'fixture',
    upstreamAvailabilityV21ReportId: 'v21_fixture',
    touchSpecificSettlementDispatchEvidenceReportId: dispatchReportId,
    touchSpecificSettlementDispatchClosureAccepted: true,
    mechanisms: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        requiredContexts: [
          {
            dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
            availability: 'PARTIAL_SUBSTRATE',
            existingCapabilities: ['I63 root touch-specific settlement dispatch'],
            unresolvedCapabilities: [
              `${PREFIX} activation/persistence`,
              `${PREFIX} competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT`,
              substrateGap('clash-a', 'branch_clash', 'CLASH_RELATIVE_FORCE_SETTLEMENT'),
              substrateGap('clash-a', 'branch_clash', 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE'),
              substrateGap('clash-a', 'branch_clash', 'CLASH_INTERACTION_SETTLEMENT'),
              substrateGap(
                'six-b',
                'branch_six_combination',
                'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
              ),
            ],
            effectResolutionAuthorized: false,
          },
        ],
        missingDependencies: [],
        partialDependencies: ['MECHANISM_EFFECTIVE_FORCE_CONTEXT'],
        evidenceAvailableDependencies: [],
        effectReady: false,
      },
    ],
    allRequiredContextsHaveSubstrate: true,
    methodologyReadyForEffectResolution: false,
    challengeEffectVerdict: 'not_determined',
    relativeForceVerdictAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function buildFixture(clashBranch = '신') {
  const pair = pairEvidence();
  const dispatchMethodology =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  const dispatchEvidence =
    buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pair,
      dispatchMethodology,
    );
  const substrateMethodology =
    buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();
  const clash = i33(clashBranch);
  const combination = i35();
  const bureau = i47();
  const substrateEvidence =
    buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence(
      pair,
      dispatchMethodology,
      dispatchEvidence,
      substrateMethodology,
      clash,
      combination,
      bureau,
    );
  return {
    availability: v22(dispatchEvidence.reportId),
    pair,
    dispatchMethodology,
    dispatchEvidence,
    substrateMethodology,
    substrateEvidence,
    clash,
    combination,
    bureau,
  };
}

function buildReport(fixture = buildFixture()) {
  return buildI26ChallengeContextAvailabilityV23(
    fixture.availability,
    fixture.pair,
    fixture.dispatchMethodology,
    fixture.dispatchEvidence,
    fixture.substrateMethodology,
    fixture.substrateEvidence,
    fixture.clash,
    fixture.combination,
    fixture.bureau,
  );
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV23>) {
  return report.mechanisms[0]?.requiredContexts[0];
}

describe('I26 v23 challenge context availability with dispatched relation substrate evidence', () => {
  test('replaces every exact I65-verified pair-local substrate blocker with an explicit settlement-outcome-unresolved blocker', () => {
    const report = buildReport();
    const context = forceContext(report);

    expect(report.dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted).toBe(true);
    for (const [relationId, relationKind, dependency] of [
      ['clash-a', 'branch_clash', 'CLASH_RELATIVE_FORCE_SETTLEMENT'],
      ['clash-a', 'branch_clash', 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE'],
      ['clash-a', 'branch_clash', 'CLASH_INTERACTION_SETTLEMENT'],
      ['six-b', 'branch_six_combination', 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'],
    ] as const) {
      expect(context?.unresolvedCapabilities).not.toContain(
        substrateGap(relationId, relationKind, dependency),
      );
      expect(context?.unresolvedCapabilities).toContain(
        outcomeGap(relationId, relationKind, dependency),
      );
    }
  });

  test('does not promote pair-local dependencies whose exact I65 substrate verification failed', () => {
    const report = buildReport(buildFixture('유'));
    const context = forceContext(report);

    expect(context?.unresolvedCapabilities).toContain(
      substrateGap('clash-a', 'branch_clash', 'CLASH_RELATIVE_FORCE_SETTLEMENT'),
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      outcomeGap('clash-a', 'branch_clash', 'CLASH_RELATIVE_FORCE_SETTLEMENT'),
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      substrateGap(
        'six-b',
        'branch_six_combination',
        'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
      ),
    );
    expect(context?.unresolvedCapabilities).toContain(
      outcomeGap(
        'six-b',
        'branch_six_combination',
        'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
      ),
    );
  });

  test('keeps competing-relation precedence and support activation/persistence unresolved', () => {
    const report = buildReport();
    const context = forceContext(report);

    expect(context?.unresolvedCapabilities).toContain(
      `${PREFIX} competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT`,
    );
    expect(context?.unresolvedCapabilities).toContain(`${PREFIX} activation/persistence`);
    expect(
      context?.existingCapabilities.some(
        (capability) =>
          capability.includes('I65 root dispatched-relation current-chart settlement substrate:') &&
          capability.includes('4/4 concrete dependency substrate(s) verified') &&
          capability.includes('settlement outcomes/precedence unresolved'),
      ),
    ).toBe(true);
  });

  test('fails closed on stale I65 evidence and preserves substrate blockers plus an alignment gap', () => {
    const fixture = buildFixture();
    const stale = {
      ...fixture.substrateEvidence,
      reportId: `${fixture.substrateEvidence.reportId}_stale`,
    };
    const report = buildI26ChallengeContextAvailabilityV23(
      fixture.availability,
      fixture.pair,
      fixture.dispatchMethodology,
      fixture.dispatchEvidence,
      fixture.substrateMethodology,
      stale,
      fixture.clash,
      fixture.combination,
      fixture.bureau,
    );
    const context = forceContext(report);

    expect(report.dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      substrateGap('clash-a', 'branch_clash', 'CLASH_RELATIVE_FORCE_SETTLEMENT'),
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I65 dispatched-relation current-chart settlement substrate evidence aligned to exact I61/I62/I63/I64/I33/I35/I47/I26-v22 identity',
    );
  });

  test('is deterministic and keeps PARTIAL_SUBSTRATE, effect readiness, relative-force, scoring, and classification guards closed', () => {
    const fixture = buildFixture();
    const first = buildReport(fixture);
    const second = buildReport(fixture);
    const context = forceContext(first);

    expect(first.reportId).toBe(second.reportId);
    expect(context?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(first.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(first.methodologyReadyForEffectResolution).toBe(false);
    expect(first.challengeEffectVerdict).toBe('not_determined');
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
