import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS,
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review.js';

describe('SA-5P historical spouse product Narrative runtime authority review', () => {
  test('preserves the exact historical HOLD and bypass finding', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(result.issue).toBe('#1992');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.semanticScope).toBe('position_only');
    expect(result.reviewBlockers).toEqual([]);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(result.runtimeSemanticProfileEnforcementEstablished).toBe(false);
    expect(result.downstreamRemediationObserved).toBe(true);
    expect(result.decision).toBe(
      'HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT',
    );
    expect(result.authorizationBlockers).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SA5P_RECORDED_AUTHORIZATION_BLOCKERS,
    );
    expect(result.checks).toEqual({
      upstreamConsumerIntegrationExact: true,
      actualClaimExact: true,
      fallbackUsesBoundedProfile: true,
      recordedProfileBypassNowFailsClosed: true,
      recordedProfileBypassNoLongerReachesUnsafeDelivery: true,
      officialAuthorityStillClosed: true,
    });
    expect(result.historicalRuntime.exactClaimFactRefs).toEqual(['pillars.day']);
    expect(result.historicalRuntime.deterministicFallback).toMatchObject({
      state: 'completed_with_fallback',
      modelCalls: 1,
      outcome: 'deterministic_fallback',
      qualifierPreserved: true,
    });
    expect(result.historicalRuntime.profileBypassProbe).toMatchObject({
      modelCalls: 2,
      firstPass: 'failed',
      repairAttempted: true,
      final: 'fallback',
      unsafeTextBlocked: true,
      groundedFallbackDelivered: true,
    });
    expect(result.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(result.authorityBoundary.productionAuthorityAuthorized).toBe(false);
    expect(result.nextDisposition).toBe(
      'RUN_SA_5Q_CLAIM_NARRATIVE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });
});
