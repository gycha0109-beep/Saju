import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
} from '../src/research/relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-model-output-enforcement-remediation.js';

const TEST_TIMEOUT_MS = 45_000;

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5Q profile model-output enforcement remediation', () => {
  test('establishes generic profile model-output enforcement without widening authority', async () => {
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
    expect(result.nextDisposition).toBe(
      'RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW',
    );
    expect(result.remediationId).toMatch(/^[a-f0-9]{64}$/u);
  }, TEST_TIMEOUT_MS);

  test('rejects the recorded spouse-personality first pass and the repeated repair attempt', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

    expect(result.checks.invalidFirstPassRejected).toBe(true);
    expect(result.checks.invalidRepairRejected).toBe(true);
    expect(result.execution.modelCalls).toBe(2);
    expect(result.execution.narrative?.run.validation.firstPass).toBe(
      'failed',
    );
    expect(result.execution.narrative?.run.validation.repairAttempted).toBe(
      true,
    );
    expect(result.execution.narrative?.run.validation.violations).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          'PROFILE:PROFILE_SECTION_TITLE_MISMATCH',
        ),
        expect.stringContaining(
          'PROFILE:PROFILE_ASSERTION_TEXT_MISMATCH',
        ),
        expect.stringContaining(
          'PROFILE:PROFILE_MANDATORY_QUALIFIER_MISSING',
        ),
        expect.stringContaining(
          'PROFILE:PROFILE_PROHIBITED_PHRASE_PRESENT',
        ),
        expect.stringContaining(
          'REPAIR:PROFILE:PROFILE_ASSERTION_TEXT_MISMATCH',
        ),
      ]),
    );
  }, TEST_TIMEOUT_MS);

  test('falls back to the exact bounded position-only profile after both invalid model attempts', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

    expect(result.checks.deterministicFallbackExact).toBe(true);
    expect(result.execution.state).toBe('completed_with_fallback');
    expect(result.execution.narrative?.outcome).toBe(
      'deterministic_fallback',
    );
    expect(result.execution.narrative?.run.validation.final).toBe('fallback');
    expect(result.execution.artifact?.status).toBe('narrative_fallback');

    const encoded = JSON.stringify(result.execution.narrative?.draft);
    expect(encoded).not.toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
  }, TEST_TIMEOUT_MS);

  test('prevents the rejected model copy from reaching artifact or consumer delivery', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

    expect(result.checks.unsafeArtifactBlocked).toBe(true);
    expect(result.checks.unsafeDeliveryBlocked).toBe(true);

    const artifact = JSON.stringify(result.execution.artifact);
    const delivery = JSON.stringify(result.delivery);
    expect(artifact).not.toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    );
    expect(delivery).not.toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    );
    expect(artifact).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    expect(delivery).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    expect(result.delivery.state).toBe('delivered_with_fallback');
  }, TEST_TIMEOUT_MS);

  test('preserves the SA-5P historical HOLD and keeps broader consumer authority closed', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

    expect(result.checks.upstreamHistoricalHoldPreserved).toBe(true);
    expect(result.checks.officialAuthorityStillClosed).toBe(true);
    expect(result.authorityBoundary).toEqual({
      narrativeConsumerIntegrationEstablished: true,
      positionOnlyProfileConsumerSelectable: true,
      deterministicFallbackProfileRenderingVerified: true,
      modelOutputProfileEnforcementEstablished: true,
      invalidModelOutputMayReachArtifact: false,
      invalidModelOutputMayReachDelivery: false,
      productNarrativeRuntimeIntegrationAuthorized: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
  }, TEST_TIMEOUT_MS);

  test('is deterministic for identical governed inputs', async () => {
    const left =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();
    const right =
      await buildRelationshipSpouseT8DayBranchPalaceProfileModelOutputEnforcementRemediation();

    expect(right.remediationId).toBe(left.remediationId);
    expect(right.executionId).toBe(left.executionId);
    expect(right.deliveryId).toBe(left.deliveryId);
    expect(right.checks).toEqual(left.checks);
    expect(right.authorityBoundary).toEqual(left.authorityBoundary);
  }, TEST_TIMEOUT_MS);
});
