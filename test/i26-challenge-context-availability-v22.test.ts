import { describe, expect, test } from 'vitest';
import { buildI26ChallengeContextAvailabilityV22 } from '../src/research/i26-challenge-context-availability-v22.js';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  type ChallengeContextAvailabilityV21Report,
} from '../src/index.js';

function pairEvidence(): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  return {
    reportId: 'i61_v22_fixture',
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

function v21(pairReportId: string): ChallengeContextAvailabilityV21Report {
  return {
    reportId: 'v21_fixture',
    reportVersion: 'fixture',
    upstreamAvailabilityV20ReportId: 'v20_fixture',
    relationIdentityPairEvidenceReportId: pairReportId,
    relationIdentityPairClosureAccepted: true,
    mechanisms: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        requiredContexts: [
          {
            dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
            availability: 'PARTIAL_SUBSTRATE',
            existingCapabilities: ['I61 exact relation pairs'],
            unresolvedCapabilities: [
              'challenge-root combination support-channel activation/persistence',
              'challenge-root combination support-channel touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT',
              'challenge-root combination support-channel competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT',
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

function buildFixture() {
  const pair = pairEvidence();
  const methodology =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  const dispatch = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
    pair,
    methodology,
  );
  return { pair, methodology, dispatch, availability: v21(pair.reportId) };
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV22>) {
  return report.mechanisms[0]?.requiredContexts[0];
}

describe('I26 v22 challenge context availability with touch-specific dispatch evidence', () => {
  test('replaces only the dispatch-methodology blocker with per-relation current-chart substrate verification blockers', () => {
    const built = buildFixture();
    const report = buildI26ChallengeContextAvailabilityV22(
      built.availability,
      built.pair,
      built.methodology,
      built.dispatch,
    );
    const context = forceContext(report);

    expect(report.touchSpecificSettlementDispatchClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support-channel touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel dispatched relation current-chart settlement substrate verification unresolved: clash-a|branch_clash|CLASH_RELATIVE_FORCE_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel dispatched relation current-chart settlement substrate verification unresolved: clash-a|branch_clash|CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel dispatched relation current-chart settlement substrate verification unresolved: clash-a|branch_clash|CLASH_INTERACTION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel dispatched relation current-chart settlement substrate verification unresolved: six-b|branch_six_combination|COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
  });

  test('keeps competing-relation precedence and support activation/persistence unresolved', () => {
    const built = buildFixture();
    const report = buildI26ChallengeContextAvailabilityV22(
      built.availability,
      built.pair,
      built.methodology,
      built.dispatch,
    );
    const context = forceContext(report);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence',
    );
  });

  test('records dispatch capability without claiming current-chart settlement substrate or outcomes are resolved', () => {
    const built = buildFixture();
    const report = buildI26ChallengeContextAvailabilityV22(
      built.availability,
      built.pair,
      built.methodology,
      built.dispatch,
    );
    const context = forceContext(report);

    expect(
      context?.existingCapabilities.some(
        (capability) =>
          capability.includes('I63 root touch-specific settlement dispatch:') &&
          capability.includes('current-chart substrate/outcomes/precedence unresolved'),
      ),
    ).toBe(true);
    expect(built.dispatch.settlementOutcomeVerdictAuthorized).toBe(false);
    expect(built.dispatch.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('fails closed on stale dispatch evidence and preserves the prior dispatch blocker plus alignment gap', () => {
    const built = buildFixture();
    const stale = { ...built.dispatch, reportId: `${built.dispatch.reportId}_stale` };
    const report = buildI26ChallengeContextAvailabilityV22(
      built.availability,
      built.pair,
      built.methodology,
      stale,
    );
    const context = forceContext(report);

    expect(report.touchSpecificSettlementDispatchClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I63 touch-specific settlement dispatch evidence aligned to exact I61/I62/I26-v21 identity',
    );
  });

  test('is deterministic and keeps PARTIAL_SUBSTRATE, effect readiness, scoring, and classification guards closed', () => {
    const built = buildFixture();
    const first = buildI26ChallengeContextAvailabilityV22(
      built.availability,
      built.pair,
      built.methodology,
      built.dispatch,
    );
    const second = buildI26ChallengeContextAvailabilityV22(
      built.availability,
      built.pair,
      built.methodology,
      built.dispatch,
    );
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
