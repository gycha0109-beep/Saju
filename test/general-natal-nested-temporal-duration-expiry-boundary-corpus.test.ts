import { describe, expect, it } from 'vitest';

import {
  R156_AUTHORITY,
  R156_DURATION_EXPIRY_ROWS,
  R156_GOVERNANCE_GUARDS,
  R156_NESTED_TEMPORAL_DURATION_EXPIRY_VERSION,
  R156_REJECTED_DURATION_SHORTCUTS,
  R156_SUMMARY,
  R156_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-nested-temporal-duration-expiry-boundary-corpus.js';

describe('R156 nested temporal duration/expiry boundary corpus', () => {
  it('pins six duration and expiry boundary rows', () => {
    expect(R156_NESTED_TEMPORAL_DURATION_EXPIRY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R156_DURATION_EXPIRY_ROWS).toHaveLength(6);
    expect(R156_SUMMARY).toEqual({
      rowCount: 6,
      sourceBoundedDurationObservedCount: 1,
      exactFiveYearWindowObservedCount: 1,
      explicitReturnToBaselineObservedCount: 1,
      durationUnresolvedCount: 3,
      calendarBoundaryUnresolvedCount: 2,
      universalDurationRuleAuthorizedCount: 0,
      expiryCreatesSemanticWinnerAuthorizedCount: 0,
      expiryAutomaticallyEndsEventAuthorizedCount: 0,
      expiryAutomaticallyRestoresAllEffectsAuthorizedCount: 0,
      permanentNatalMutationAuthorizedCount: 0,
      numericDurationWeightAuthorizedCount: 0,
      executableTimingResolverAuthorizedCount: 0,
      interpretationClaimEmissionAuthorizedCount: 0,
      productionAuthorityPromotedCount: 0,
      governanceGuardCount: 5,
    });
  });

  it('keeps the R073 five-year observation source-bounded', () => {
    const bounded = R156_DURATION_EXPIRY_ROWS.find(
      (item) =>
        item.boundaryKind === 'SOURCE_BOUNDED_DAYUN_TEMPORARY_WINDOW',
    );

    expect(bounded).toMatchObject({
      evidenceState: 'SOURCE_BOUNDED_DURATION_AND_RETURN',
      sourceBoundedDurationObserved: true,
      exactFiveYearWindowObserved: true,
      explicitReturnToBaselineObserved: true,
      durationUnresolved: false,
      universalDurationRuleAuthorized: false,
      durationInheritanceAcrossScopesAuthorized: false,
      executableTimingResolverAuthorized: false,
    });
  });

  it('does not copy the five-year window into generic Dayun activation', () => {
    const generic = R156_DURATION_EXPIRY_ROWS.find(
      (item) =>
        item.boundaryKind ===
        'GENERIC_DAYUN_ACTIVATION_DURATION_UNRESOLVED',
    );

    expect(generic).toMatchObject({
      evidenceState: 'DURATION_UNRESOLVED',
      sourceBoundedDurationObserved: false,
      exactFiveYearWindowObserved: false,
      explicitReturnToBaselineObserved: false,
      durationUnresolved: true,
      universalDurationRuleAuthorized: false,
    });
  });

  it('preserves unresolved R076 duration and monthly calendar boundaries', () => {
    const breakRescue = R156_DURATION_EXPIRY_ROWS.find(
      (item) => item.boundaryKind === 'BREAK_RESCUE_DURATION_UNRESOLVED',
    );
    const monthly = R156_DURATION_EXPIRY_ROWS.find(
      (item) =>
        item.boundaryKind === 'MONTHLY_CALENDAR_BOUNDARY_UNRESOLVED',
    );

    expect(breakRescue).toMatchObject({
      durationUnresolved: true,
      exactFiveYearWindowObserved: false,
      expiryAutomaticallyRestoresAllEffectsAuthorized: false,
      executableTimingResolverAuthorized: false,
    });

    expect(monthly).toMatchObject({
      calendarBoundaryUnresolved: true,
      exactFiveYearWindowObserved: false,
      executableTimingResolverAuthorized: false,
    });
  });

  it('keeps expiry separate from precedence, event endings, polarity, and mutation', () => {
    for (const item of R156_DURATION_EXPIRY_ROWS) {
      expect(item.baselineIdentityPreserved).toBe(true);
      expect(item.universalDurationRuleAuthorized).toBe(false);
      expect(item.durationInheritanceAcrossScopesAuthorized).toBe(false);
      expect(item.expiryCreatesSemanticWinnerAuthorized).toBe(false);
      expect(item.expiryAutomaticallyEndsEventAuthorized).toBe(false);
      expect(item.expiryAutomaticallyRestoresAllEffectsAuthorized).toBe(false);
      expect(item.expiryChangesPolarityAuthorized).toBe(false);
      expect(item.permanentNatalMutationAuthorized).toBe(false);
      expect(item.numericDurationWeightAuthorized).toBe(false);
      expect(item.executableTimingResolverAuthorized).toBe(false);
      expect(item.interpretationClaimEmissionAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps all upstream governance guards satisfied', () => {
    expect(R156_GOVERNANCE_GUARDS).toHaveLength(5);
    expect(R156_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    for (const guard of R156_GOVERNANCE_GUARDS) {
      expect(guard.universalDurationRuleAuthorized).toBe(false);
      expect(guard.executableTimingResolverAuthorized).toBe(false);
      expect(guard.productionAuthorityPromoted).toBe(false);
    }
  });

  it('binds upstream duration and calendar gaps explicitly', () => {
    expect(R156_UPSTREAM_BINDINGS.r073).toMatchObject({
      activationDurationGap: true,
      activationImpliesPermanentNatalChange: false,
      activationImpliesConcreteEvent: false,
      executableTimingResolverAuthorized: false,
    });

    expect(R156_UPSTREAM_BINDINGS.r075).toMatchObject({
      monthBoundaryCalendarPolicyGap: true,
    });

    expect(R156_UPSTREAM_BINDINGS.r076).toMatchObject({
      temporalDurationGap: true,
      globalBreakRecoveryToggleAuthorized: false,
      permanentNatalMutationAuthorized: false,
      executableBreakRecoveryResolverAuthorized: false,
    });

    expect(R156_UPSTREAM_BINDINGS.r151).toMatchObject({
      explicitReturnToBaselineObserved: true,
      generalTemporalTransitionResolverAuthorized: false,
      permanentNatalMutationAuthorized: false,
      deterministicTemporalEventAuthorized: false,
    });

    expect(R156_UPSTREAM_BINDINGS.r155).toMatchObject({
      monthlyLowerTemporalLayerObserved: true,
      temporalOrderInvariantBoundaryPreserved: true,
      monthBoundaryCalendarPolicyAuthorized: false,
      deterministicMonthlyEventAuthorized: false,
      executableMonthlyCompositionResolverAuthorized: false,
    });
  });

  it('rejects duration and expiry shortcuts explicitly', () => {
    expect(R156_REJECTED_DURATION_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'R073_FIVE_YEAR_WINDOW_APPLIES_TO_ALL_DAYUN_ACTIVATION',
        'ALL_DAYUN_EFFECTS_EXPIRE_AFTER_FIVE_YEARS',
        'BREAK_RESCUE_INHERITS_R073_DURATION',
        'MONTHLY_LAYER_IDENTITY_DEFINES_CALENDAR_BOUNDARY',
        'TEMPORAL_SCOPE_LENGTH_DEFINES_SEMANTIC_PRECEDENCE',
        'SHORTER_SCOPE_ALWAYS_OVERRIDES_LONGER_SCOPE',
        'EXPIRY_AUTOMATICALLY_ENDS_EVENT',
        'EXPIRY_AUTOMATICALLY_RESTORES_ALL_EFFECTS',
        'RETURN_TO_BASELINE_EQUALS_EVENT_REVERSAL',
        'RETURN_TO_BASELINE_EQUALS_POLARITY_REVERSAL',
        'DURATION_AS_NUMERIC_SEVERITY_WEIGHT',
      ]),
    );
  });

  it('keeps R156 research-only and non-authoritative', () => {
    expect(R156_AUTHORITY).toMatchObject({
      researchOnly: true,
      sourceBoundedFiveYearTemporaryWindowObserved: true,
      sourceBoundedExplicitReturnToBaselineObserved: true,
      genericActivationDurationGapPreserved: true,
      breakRescueDurationGapPreserved: true,
      monthlyCalendarBoundaryGapPreserved: true,
      nestedScopeExpiryDistinctFromSemanticPrecedenceObserved: true,
      returnToBaselineDistinctFromEventReversalObserved: true,
      returnToBaselineDistinctFromPolarityReversalObserved: true,
      universalFiveYearDurationAuthorized: false,
      universalDurationInheritanceAuthorized: false,
      temporalScopeLengthPrecedenceAuthorized: false,
      shorterScopeOverridesLongerScopeAuthorized: false,
      expiryAutomaticallyEndsEventAuthorized: false,
      expiryAutomaticallyRestoresAllEffectsAuthorized: false,
      expiryChangesPolarityAuthorized: false,
      permanentNatalMutationAuthorized: false,
      monthBoundaryCalendarPolicyAuthorized: false,
      numericDurationWeightAuthorized: false,
      executableTimingResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
