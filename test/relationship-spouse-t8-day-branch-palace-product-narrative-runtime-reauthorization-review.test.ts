import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-product-narrative-runtime-reauthorization-review.js';

describe('SA-5R historical spouse product Narrative runtime reauthorization review', () => {
  test('preserves the exact historical bounded runtime authorization', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();

    expect(result.issue).toBe('#2003');
    expect(result.authorityScope).toBe(
      'project_governed_relationship_natal_spouse_position_only',
    );
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(result.decision).toBe(
      'AUTHORIZE_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AND_DELIVERY',
    );
    expect(result.checks).toEqual({
      upstreamRemediationExact: true,
      actualClaimExact: true,
      compliantModelRuntimeExact: true,
      compliantDeliveryExact: true,
      fallbackRuntimeExact: true,
      fallbackDeliveryExact: true,
      adversarialPathRemainsBlocked: true,
      exactCanonicalCopyPreserved: true,
      officialAndProductionBoundaryClosed: true,
    });
    expect(result.historicalRuntime.directFactRefs).toEqual(['pillars.day']);
    expect(result.historicalRuntime.compliantPath).toMatchObject({
      state: 'completed',
      modelCalls: 1,
      outcome: 'model_first_pass',
      validation: 'passed',
      delivery: 'delivered',
    });
    expect(result.historicalRuntime.fallbackPath).toMatchObject({
      state: 'completed_with_fallback',
      modelCalls: 1,
      outcome: 'deterministic_fallback',
      validation: 'fallback',
      delivery: 'delivered_with_fallback',
    });
    expect(result.historicalRuntime.consumerAuthority).toBe('legacy_narrative');
    expect(result.historicalRuntime.officialReadingMaterialized).toBe(false);
    expect(result.authorityBoundary.legacyNarrativeRuntimeAuthorityEstablished).toBe(true);
    expect(result.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(result.authorityBoundary.productionAuthorityAuthorized).toBe(false);
    expect(result.nextDisposition).toBe(
      'RUN_SA_5S_POSITION_ONLY_PREVIEW_ADMISSION_REVIEW',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });
});
