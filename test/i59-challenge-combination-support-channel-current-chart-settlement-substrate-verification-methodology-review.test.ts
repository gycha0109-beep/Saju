import { describe, expect, test } from 'vitest';
import {
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview,
  type ChallengeCombinationSupportChannelContestSettlementDependency,
} from '../src/index.js';

function requirement(dependency: ChallengeCombinationSupportChannelContestSettlementDependency) {
  const report = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
  const found = report.requirements.find((item) => item.dependency === dependency);
  if (found === undefined) throw new Error(`Missing I59 requirement for ${dependency}`);
  return found;
}

describe('I59 current-chart settlement substrate verification methodology review', () => {
  test('authorizes exact-identity substrate verification while blocking all settlement and downstream verdicts', () => {
    const report = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(report.decision).toBe(
      'EXACT_IDENTITY_CHART_SUBSTRATE_VERIFICATION_ROUTING_AUTHORIZED_SETTLEMENT_OUTCOME_BLOCKED',
    );
    expect(report.exactIdentityChartSubstrateVerificationRoutingAuthorized).toBe(true);
    expect(report.methodologyApplicabilityAloneSufficientForChartVerification).toBe(false);
    expect(report.settlementOutcomeResolutionAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('requires exact I35 current-combination and competing-combination identity rather than arbitrary structural reuse', () => {
    const report = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const current = requirement('CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT');
    const competing = requirement('COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT');

    expect(current.route).toBe('EXACT_I35_CURRENT_COMBINATION_SUBSTRATE');
    expect(current.chartSpecificSubstrateVerificationAuthorized).toBe(true);
    expect(current.exactMatchDimensions).toContain('currentCombinationRelationId');
    expect(competing.route).toBe('EXACT_I35_COMPETING_COMBINATION_SUBSTRATE');
    expect(competing.chartSpecificSubstrateVerificationAuthorized).toBe(true);
    expect(report.i35ArbitraryCompetingRelationReuseAuthorized).toBe(false);
  });

  test('limits I33 clash reuse to an exact participant of the same mechanism and clash candidate', () => {
    const report = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const relative = requirement('CLASH_RELATIVE_FORCE_SETTLEMENT');
    const rescue = requirement('CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE');

    expect(relative.route).toBe('EXACT_I33_CLASH_SUBSTRATE');
    expect(relative.chartSpecificSubstrateVerificationAuthorized).toBe(true);
    expect(rescue.route).toBe('EXACT_I33_RESCUE_TOPOLOGY_SUBSTRATE');
    expect(rescue.chartSpecificSubstrateVerificationAuthorized).toBe(true);
    expect(report.i33ArbitrarySupportSourceReuseAuthorized).toBe(false);
  });

  test('keeps I47 exact bureau break context below generic support-source clash settlement', () => {
    const report = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const clash = requirement('CLASH_INTERACTION_SETTLEMENT');

    expect(clash.route).toBe('I33_GENERIC_CLASH_PLUS_I47_NARROW_BUREAU_CONTEXT');
    expect(clash.chartSpecificSubstrateVerificationAuthorized).toBe(true);
    expect(clash.genericSupportSourceSettlementSubstrateVerificationAuthorized).toBe(false);
    expect(clash.exactMatchDimensions).toContain(
      'I47 formationRelationId must equal currentCombinationRelationId',
    );
    expect(report.i47BureauStateToSupportSourceOutcomeAuthorized).toBe(false);
  });

  test('blocks multi-touch dispatch and competing-relation settlement where identity pairing or precedence is missing', () => {
    const report = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const multi = requirement('TOUCH_SPECIFIC_RELATION_SETTLEMENT');
    const competing = requirement('COMPETING_RELATION_SETTLEMENT');

    expect(multi.route).toBe('MULTI_TOUCH_PAIRING_BLOCKED');
    expect(multi.chartSpecificSubstrateVerificationAuthorized).toBe(false);
    expect(competing.route).toBe('COMPETING_RELATION_PRECEDENCE_BLOCKED');
    expect(competing.chartSpecificSubstrateVerificationAuthorized).toBe(false);
    expect(report.multiTouchPairReconstructionAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('is deterministic and keeps every requirement below settlement/activation/persistence resolution', () => {
    const first = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const second = buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.requirements).toHaveLength(7);
    expect(first.requirements.every((item) => item.settlementOutcomeResolutionAuthorized === false)).toBe(true);
    expect(first.requirements.every((item) => item.supportChannelActivationResolutionAuthorized === false)).toBe(true);
    expect(first.requirements.every((item) => item.supportChannelPersistenceResolutionAuthorized === false)).toBe(true);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
  });
});
