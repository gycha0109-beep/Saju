import { describe, expect, test } from 'vitest';
import { buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview } from '../src/index.js';
import { buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview } from '../src/research/i64-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-methodology-review.js';

describe('I64 dispatched relation current-chart settlement substrate verification methodology', () => {
  test('reuses the canonical I59 review rather than defining a parallel substrate policy', () => {
    const i59 =
      buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const i64 =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(i64.canonicalI59ReviewId).toBe(i59.reviewId);
    expect(i64.i59ExactDomainRulesReusablePerDispatchedPair).toBe(true);
    expect(i64.authoritativeRelationIdKindPairRequiredFromI61).toBe(true);
    expect(i64.canonicalPairDispatchRequiredFromI63).toBe(true);
  });

  test('authorizes pair-local verification only for the five concrete I59 settlement dependencies', () => {
    const report =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(report.requirements.map((item) => item.dependency)).toEqual([
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
      'CLASH_INTERACTION_SETTLEMENT',
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(report.requirements.every((item) => item.pairLocalReuseAuthorized)).toBe(true);
    expect(
      report.requirements.every(
        (item) => item.currentChartSettlementSubstrateVerificationAuthorized,
      ),
    ).toBe(true);
  });

  test('preserves exact relation/source/mechanism/current-combination identity requirements per dispatched dependency', () => {
    const report =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(
      report.requirements.every(
        (item) =>
          item.exactDispatchedRelationIdMatchRequired &&
          item.exactDispatchedRelationKindMatchRequired &&
          item.exactSupportSourceIdentityMatchRequired &&
          item.mechanismMatchRequired &&
          item.currentCombinationIdentityPreservationRequired,
      ),
    ).toBe(true);
  });

  test('does not authorize generic TOUCH_SPECIFIC or COMPETING_RELATION verification', () => {
    const report =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(
      report.requirements.some((item) => item.dependency === ('TOUCH_SPECIFIC_RELATION_SETTLEMENT' as never)),
    ).toBe(false);
    expect(
      report.requirements.some((item) => item.dependency === ('COMPETING_RELATION_SETTLEMENT' as never)),
    ).toBe(false);
    expect(report.touchSpecificGenericDependencyVerificationAuthorized).toBe(false);
    expect(report.competingRelationPrecedenceSettlementVerificationAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
  });

  test('keeps I33/I35/I47 scope guards and all outcome/activation/force/scoring/classification guards closed', () => {
    const report =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(report.i33ArbitrarySupportSourceReuseAuthorized).toBe(false);
    expect(report.i35ArbitraryCompetingRelationReuseAuthorized).toBe(false);
    expect(report.i47BureauStateToSupportSourceOutcomeAuthorized).toBe(false);
    expect(report.methodologyApplicabilityAloneSufficientForVerification).toBe(false);
    expect(report.settlementOutcomeResolutionAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelNeutralizationVerdictAuthorized).toBe(false);
    expect(report.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.requirements.every((item) => item.settlementOutcomeResolutionAuthorized === false)).toBe(true);
  });

  test('is deterministic and preserves the original I59 exact route for every concrete dependency', () => {
    const left =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const right =
      buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();
    const i59 =
      buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.decision).toBe(
      'I59_EXACT_DOMAIN_RULES_REUSABLE_PER_I63_DISPATCHED_PAIR_OUTCOMES_BLOCKED',
    );
    for (const requirement of left.requirements) {
      const source = i59.requirements.find((item) => item.dependency === requirement.dependency);
      expect(source?.route).toBe(requirement.reusedI59Route);
      expect(source?.requiredAuthorityRefs).toEqual(requirement.requiredAuthorityRefs);
    }
  });
});
