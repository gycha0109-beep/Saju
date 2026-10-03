import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-model-output-enforcement-remediation.js';

describe('SA-5Q historical spouse profile model-output enforcement remediation', () => {
  test('preserves the exact historical enforcement remediation', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

    expect(result.issue).toBe('#1999');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.modelOutputProfileEnforcementEstablished).toBe(true);
    expect(result.decision).toBe(
      'PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATED',
    );
    expect(result.checks).toEqual({
      upstreamHistoricalHoldPreserved: true,
      invalidFirstPassRejected: true,
      invalidRepairRejected: true,
      deterministicFallbackExact: true,
      unsafeArtifactBlocked: true,
      unsafeDeliveryBlocked: true,
      officialAuthorityStillClosed: true,
    });
    expect(result.historicalEnforcement).toEqual({
      recordedAtStage: 'SA-5Q',
      modelCalls: 2,
      firstPass: 'failed',
      repairAttempted: true,
      repair: 'failed',
      final: 'fallback',
      prohibitedModelCopyBlocked: true,
      exactPositionOnlyFallbackUsed: true,
      artifactSafe: true,
      deliverySafe: true,
    });
    expect(result.authorityBoundary.invalidModelOutputMayReachArtifact).toBe(false);
    expect(result.authorityBoundary.invalidModelOutputMayReachDelivery).toBe(false);
    expect(result.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(result.authorityBoundary.productionAuthorityAuthorized).toBe(false);
    expect(result.nextDisposition).toBe(
      'RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW',
    );
    expect(result.remediationId).toMatch(/^[a-f0-9]{64}$/u);
  });
});
