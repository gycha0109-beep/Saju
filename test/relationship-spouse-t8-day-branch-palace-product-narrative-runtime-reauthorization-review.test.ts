import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-product-narrative-runtime-reauthorization-review.js';

const TEST_TIMEOUT_MS = 60_000;

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5R product narrative runtime reauthorization review', () => {
  test('authorizes only the exact project-governed position-only product narrative runtime and delivery', async () => {
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
    expect(result.nextDisposition).toBe(
      'RUN_SA_5S_POSITION_ONLY_PREVIEW_ADMISSION_REVIEW',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  }, TEST_TIMEOUT_MS);

  test('accepts an exact profile-compliant model-first-pass and delivers the resulting grounded artifact', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();

    expect(result.checks.compliantModelRuntimeExact).toBe(true);
    expect(result.checks.compliantDeliveryExact).toBe(true);

    expect(result.compliantExecution.state).toBe('completed');
    expect(result.compliantExecution.modelCalls).toBe(1);
    expect(result.compliantExecution.narrative?.outcome).toBe(
      'model_first_pass',
    );
    expect(
      result.compliantExecution.narrative?.run.validation.firstPass,
    ).toBe('passed');
    expect(
      result.compliantExecution.narrative?.run.validation.repairAttempted,
    ).toBe(false);
    expect(result.compliantExecution.narrative?.run.validation.final).toBe(
      'passed',
    );
    expect(
      result.compliantExecution.narrative?.run.validation.violations,
    ).toEqual([]);
    expect(result.compliantExecution.artifact?.status).toBe(
      'ready_with_ambiguity',
    );
    expect(
      result.compliantExecution.preparation.composition?.evidence?.bundle
        .canonicalFacts.some((fact) => fact.ref === 'pillars.day'),
    ).toBe(true);

    expect(result.compliantDelivery.state).toBe('delivered');
    expect(result.compliantDelivery.messageCode).toBe('READING_DELIVERED');
    expect(result.compliantDelivery.requiredAction).toBe('none');

    const draft = JSON.stringify(result.compliantExecution.narrative?.draft);
    const artifact = JSON.stringify(result.compliantExecution.artifact);
    const delivery = JSON.stringify(result.compliantDelivery);

    for (const encoded of [draft, artifact, delivery]) {
      expect(encoded).toContain(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      );
      expect(encoded).toContain(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
      );
      expect(encoded).toContain(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
      );
      for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
        expect(encoded).not.toContain(phrase);
      }
    }
  }, TEST_TIMEOUT_MS);

  test('preserves the provider-failure deterministic fallback path and delivery', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();

    expect(result.checks.fallbackRuntimeExact).toBe(true);
    expect(result.checks.fallbackDeliveryExact).toBe(true);

    expect(result.fallbackExecution.state).toBe('completed_with_fallback');
    expect(result.fallbackExecution.modelCalls).toBe(1);
    expect(result.fallbackExecution.narrative?.outcome).toBe(
      'deterministic_fallback',
    );
    expect(result.fallbackExecution.narrative?.run.validation.final).toBe(
      'fallback',
    );
    expect(result.fallbackExecution.artifact?.status).toBe(
      'narrative_fallback',
    );
    expect(result.fallbackDelivery.state).toBe('delivered_with_fallback');
    expect(result.fallbackDelivery.messageCode).toBe(
      'READING_DELIVERED_WITH_GROUNDED_FALLBACK',
    );
  }, TEST_TIMEOUT_MS);

  test('requires SA-5Q adversarial rejection to remain intact before reauthorization', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();

    expect(result.checks.upstreamRemediationExact).toBe(true);
    expect(result.checks.adversarialPathRemainsBlocked).toBe(true);
    expect(result.checks.actualClaimExact).toBe(true);
    expect(result.checks.exactCanonicalCopyPreserved).toBe(true);
  }, TEST_TIMEOUT_MS);

  test('keeps spouse natal outside Official Reading and keeps public/Production authority closed', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();

    expect(result.checks.officialAndProductionBoundaryClosed).toBe(true);
    expect(result.compliantExecution.consumerReadingAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(
      result.compliantExecution.consumerReadingAuthority
        ?.supportedOfficialReadingSection,
    ).toBeUndefined();

    expect(result.authorityBoundary).toEqual({
      exactPositionOnlyCapability: true,
      modelOutputProfileEnforcementEstablished: true,
      legacyNarrativeRuntimeAuthorityEstablished: true,
      productNarrativeRuntimeIntegrationAuthorized: true,
      narrativeGenerationAuthorized: true,
      artifactAssemblyAuthorized: true,
      deliveryAuthorityAuthorized: true,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
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
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();
    const right =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeReauthorizationReview();

    expect(right.reviewId).toBe(left.reviewId);
    expect(right.compliantExecutionId).toBe(left.compliantExecutionId);
    expect(right.compliantDeliveryId).toBe(left.compliantDeliveryId);
    expect(right.fallbackExecutionId).toBe(left.fallbackExecutionId);
    expect(right.fallbackDeliveryId).toBe(left.fallbackDeliveryId);
    expect(right.checks).toEqual(left.checks);
    expect(right.authorityBoundary).toEqual(left.authorityBoundary);
  }, TEST_TIMEOUT_MS);
});
