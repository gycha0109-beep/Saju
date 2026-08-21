import { describe, expect, test } from 'vitest';
import { buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview } from '../src/research/i66-challenge-combination-support-channel-dispatched-relation-settlement-outcome-resolution-readiness-review.js';

describe('I66 dispatched relation settlement outcome resolution readiness review', () => {
  test('keeps all five concrete settlement outcome domains separate', () => {
    const report =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();

    expect(report.domains.map((item) => item.dependency)).toEqual([
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
      'CLASH_INTERACTION_SETTLEMENT',
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(report.pairLocalOutcomeDomainsSeparable).toBe(true);
    expect(report.genericOutcomeResolverAuthorized).toBe(false);
    expect(report.oneUniversalSettlementRuleAuthorized).toBe(false);
  });

  test('identifies clash relative-force as substrate-ready but still methodology-blocked', () => {
    const report =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();
    const domain = report.domains.find(
      (item) => item.dependency === 'CLASH_RELATIVE_FORCE_SETTLEMENT',
    );

    expect(domain?.readiness).toBe('PAIR_LOCAL_SUBSTRATE_READY_OUTCOME_METHODOLOGY_REQUIRED');
    expect(domain?.existingAuthorityRefs).toContain('I33');
    expect(domain?.directOutcomeAdapterAuthorized).toBe(false);
    expect(report.clashRelativeForceMayBeDerivedFromSeasonalAdvantageAlone).toBe(false);
  });

  test('keeps rescue downstream of effective relation outcome rather than converting topology to rescue effect', () => {
    const report =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();
    const domain = report.domains.find(
      (item) => item.dependency === 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
    );

    expect(domain?.readiness).toBe('DEPENDENT_ON_OTHER_UNRESOLVED_OUTCOME_DOMAINS');
    expect(domain?.existingAuthorityRefs).toContain('I20d');
    expect(report.rescueTopologyMayBeConvertedToRescueEffect).toBe(false);
  });

  test('preserves I46 as a narrow deterministic bureau subcase rather than a generic clash outcome', () => {
    const report =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();
    const domain = report.domains.find(
      (item) => item.dependency === 'CLASH_INTERACTION_SETTLEMENT',
    );

    expect(domain?.readiness).toBe(
      'NARROW_DETERMINISTIC_SUBCASE_EXISTS_GENERIC_OUTCOME_METHODOLOGY_REQUIRED',
    );
    expect(domain?.existingAuthorityRefs).toContain('I46');
    expect(report.narrowI46BureauBreakMayBeConvertedToGenericSupportSourceDestruction).toBe(false);
  });

  test('requires relation-kind audit before combination binding outcomes and leaves precedence downstream', () => {
    const report =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();
    const combinationDomains = report.domains.filter((item) =>
      item.dependency.includes('COMBINATION_BINDING_INTERACTION_SETTLEMENT'),
    );

    expect(combinationDomains).toHaveLength(2);
    expect(
      combinationDomains.every(
        (item) =>
          item.readiness === 'PAIR_LOCAL_SUBSTRATE_READY_OUTCOME_METHODOLOGY_REQUIRED' &&
          item.familySpecificMethodologyRequired &&
          item.directOutcomeAdapterAuthorized === false,
      ),
    ).toBe(true);
    expect(report.currentCombinationAndCompetingCombinationOutcomePolicyMayBeSharedWithoutKindAudit).toBe(
      false,
    );
    expect(report.multiplePairLocalOutcomesMayBeAggregatedWithoutPrecedencePolicy).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('is deterministic and keeps all downstream activation, force, scoring, and classification guards closed', () => {
    const first =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();
    const second =
      buildI66ChallengeCombinationSupportChannelDispatchedRelationSettlementOutcomeResolutionReadinessReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.decision).toBe(
      'PAIR_LOCAL_OUTCOME_DOMAINS_SEPARABLE_GENERIC_OUTCOME_RESOLVER_NOT_AUTHORIZED',
    );
    expect(first.domains.every((item) => item.settlementOutcome === 'not_determined')).toBe(true);
    expect(first.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(first.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(first.supportChannelNeutralizationVerdictAuthorized).toBe(false);
    expect(first.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(first.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedMethodologySequence[0]).toContain('I67');
  });
});
