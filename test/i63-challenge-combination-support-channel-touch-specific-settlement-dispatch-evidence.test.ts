import { describe, expect, test } from 'vitest';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
} from '../src/index.js';

function pairEvidence(): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  return {
    reportId: 'i61_dispatch_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE',
    upstreamI54ReportId: 'i54_fixture',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        currentCombinationRelationId: 'current-combination',
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
            relationId: 'competing-clash',
            relationKind: 'branch_clash',
            isCurrentCombinationRelation: false,
            precedence: 'not_determined',
            settlementOutcome: 'not_determined',
          },
          {
            relationId: 'competing-six',
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
      {
        mechanism: 'OUTPUT_LEAKAGE',
        currentCombinationRelationId: 'current-combination',
        currentCombinationRelationKind: 'branch_three_combination',
        targetParticipantPillar: 'month',
        targetParticipantComponent: 'branch',
        targetParticipantValue: '해',
        supportChannelKind: 'SAME_ELEMENT_PEER_SUPPORT_CHANNEL',
        sourcePillar: 'year',
        sourceComponent: 'stem',
        sourceValue: '병',
        contestTopologyState: 'NO_TRACKED_RELATION_TOUCH',
        touchingRelations: [],
        touchCount: 0,
        relationIdKindPairEvidenceAvailable: true,
        multiTouchPairingResolvedWhereObserved: false,
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

describe('I63 touch-specific settlement dispatch evidence', () => {
  test('materializes each exact multi-touch pair into its own I62 dependency family', () => {
    const evidence = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pairEvidence(),
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview(),
    );
    const multi = evidence.items[0];

    expect(evidence.status).toBe('RESOLVED_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE');
    expect(evidence.touchSpecificSettlementDispatchEvidenceAvailable).toBe(true);
    expect(evidence.allRelationPairsDispatched).toBe(true);
    expect(multi?.dispatchedRelations).toHaveLength(2);
    expect(multi?.dispatchedRelations[0]).toEqual(
      expect.objectContaining({
        relationId: 'competing-clash',
        relationKind: 'branch_clash',
        dispatchClass: 'COMPETING_CLASH_SETTLEMENT_ROUTE',
        routedDependencies: [
          'CLASH_RELATIVE_FORCE_SETTLEMENT',
          'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
          'CLASH_INTERACTION_SETTLEMENT',
        ],
      }),
    );
    expect(multi?.dispatchedRelations[1]).toEqual(
      expect.objectContaining({
        relationId: 'competing-six',
        relationKind: 'branch_six_combination',
        dispatchClass: 'COMPETING_COMBINATION_SETTLEMENT_ROUTE',
        routedDependencies: ['COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'],
      }),
    );
  });

  test('preserves no-touch as an empty dispatch set without inferring activation or persistence', () => {
    const evidence = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pairEvidence(),
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview(),
    );
    const untouched = evidence.items[1];

    expect(untouched?.dispatchedRelations).toEqual([]);
    expect(untouched?.allRelationPairsDispatched).toBe(true);
    expect(untouched?.supportChannelActive).toBe('not_determined');
    expect(untouched?.supportChannelPersisted).toBe('not_determined');
  });

  test('keeps every dispatched pair unordered and unresolved', () => {
    const evidence = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pairEvidence(),
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview(),
    );
    const dispatched = evidence.items.flatMap((item) => item.dispatchedRelations);

    expect(
      dispatched.every(
        (route) =>
          route.precedenceWithinMultiTouch === 'not_determined' &&
          route.settlementOutcome === 'not_determined',
      ),
    ).toBe(true);
    expect(evidence.pairOrderSignificanceAuthorized).toBe(false);
    expect(evidence.multiTouchAggregationAuthorized).toBe(false);
    expect(evidence.crossRelationPrecedenceAuthorized).toBe(false);
    expect(evidence.settlementOutcomeVerdictAuthorized).toBe(false);
  });

  test('fails closed when the supplied I61 report violates its fail-closed contract', () => {
    const invalid = {
      ...pairEvidence(),
      touchSpecificSettlementDispatchAuthorized: true,
    } as unknown as ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport;
    const evidence = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      invalid,
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview(),
    );

    expect(evidence.status).toBe('I61_UNRESOLVED_OR_INVALID');
    expect(evidence.items).toEqual([]);
    expect(evidence.touchSpecificSettlementDispatchEvidenceAvailable).toBe(false);
  });

  test('fails closed when I62 is not the canonical authorized methodology', () => {
    const canonical =
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
    const stale = { ...canonical, reviewId: `${canonical.reviewId}_stale` };
    const evidence = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pairEvidence(),
      stale,
    );

    expect(evidence.status).toBe('I62_METHODOLOGY_NOT_AUTHORIZED');
    expect(evidence.items).toEqual([]);
  });

  test('is deterministic and keeps activation, persistence, outcomes, force, scoring, and classification closed', () => {
    const pair = pairEvidence();
    const methodology =
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
    const left = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pair,
      methodology,
    );
    const right = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
      pair,
      methodology,
    );

    expect(left.reportId).toBe(right.reportId);
    expect(left.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(left.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(left.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(left.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(left.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(left.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(left.classificationAuthorized).toBe(false);
    expect(left.numericScoringAuthorized).toBe(false);
    expect(left.items.every((item) => item.anySettlementOutcomeResolved === false)).toBe(true);
  });
});
