import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
  buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-product-narrative-runtime-authority-review.js';

const TEST_TIMEOUT_MS = 30_000;

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5P product narrative runtime authority review', () => {
  test('completes the review and HOLDs product narrative runtime authority', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(result.issue).toBe('#1992');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.semanticScope).toBe('position_only');
    expect(result.reviewBlockers).toEqual([]);
    expect(result.authorityReviewCompleted).toBe(true);
    expect(result.runtimeSemanticProfileEnforcementEstablished).toBe(false);
    expect(result.decision).toBe(
      'HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT',
    );
    expect(result.authorizationBlockers).toEqual([
      'MODEL_SUCCESS_PATH_DOES_NOT_ENFORCE_CLAIM_NARRATIVE_PROFILE',
      'MANDATORY_QUALIFIER_NOT_ENFORCED_ON_MODEL_SUCCESS',
      'PROHIBITED_PHRASES_NOT_ENFORCED_ON_MODEL_SUCCESS',
      'SEMANTICALLY_UNBOUNDED_MODEL_OUTPUT_CAN_REACH_CONSUMER_DELIVERY',
    ]);
    expect(result.nextDisposition).toBe(
      'RUN_SA_5Q_CLAIM_NARRATIVE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION',
    );
    expect(result.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  }, TEST_TIMEOUT_MS);

  test('proves deterministic fallback uses the bounded position-only profile', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(result.checks.upstreamConsumerIntegrationExact).toBe(true);
    expect(result.checks.actualClaimExact).toBe(true);
    expect(result.checks.fallbackUsesBoundedProfile).toBe(true);

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

    const encoded = JSON.stringify(result.fallbackExecution.narrative?.draft);
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    for (const phrase of RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES) {
      expect(encoded).not.toContain(phrase);
    }
  }, TEST_TIMEOUT_MS);

  test('proves a claim-grounded model-first-pass can bypass the profile semantic boundary', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(
      result.checks.successfulModelPathBypassesProfileSemanticBoundary,
    ).toBe(true);

    expect(result.profileBypassExecution.state).toBe('completed');
    expect(result.profileBypassExecution.modelCalls).toBe(1);
    expect(result.profileBypassExecution.narrative?.outcome).toBe(
      'model_first_pass',
    );
    expect(
      result.profileBypassExecution.narrative?.run.validation.firstPass,
    ).toBe('passed');
    expect(result.profileBypassExecution.narrative?.run.validation.final).toBe(
      'passed',
    );
    expect(result.profileBypassExecution.artifact).toBeDefined();

    const encoded = JSON.stringify(
      result.profileBypassExecution.narrative?.draft,
    );
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    );
    expect(encoded).not.toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES.some(
        (phrase) => encoded.includes(phrase),
      ),
    ).toBe(true);
  }, TEST_TIMEOUT_MS);

  test('proves the semantically unbounded model output would reach consumer delivery', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(result.checks.profileBypassWouldReachConsumerDelivery).toBe(true);
    expect(result.profileBypassDelivery.state).toBe('delivered');
    expect(result.profileBypassDelivery.messageCode).toBe('READING_DELIVERED');
    expect(result.profileBypassDelivery.requiredAction).toBe('none');
    expect(result.profileBypassDelivery.artifact?.readingId).toBe(
      result.profileBypassExecution.artifact?.readingId,
    );

    const encoded = JSON.stringify(result.profileBypassDelivery);
    expect(encoded).toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROFILE_BYPASS_TEXT,
    );
    expect(encoded).not.toContain(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
  }, TEST_TIMEOUT_MS);

  test('keeps Preview, Official, public semantic, and Production authority closed', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(result.checks.officialAuthorityStillClosed).toBe(true);
    expect(result.fallbackExecution.consumerReadingAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(result.profileBypassExecution.consumerReadingAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(
      result.fallbackExecution.consumerReadingAuthority
        ?.supportedOfficialReadingSection,
    ).toBeUndefined();
    expect(
      result.profileBypassExecution.consumerReadingAuthority
        ?.supportedOfficialReadingSection,
    ).toBeUndefined();

    expect(result.authorityBoundary).toEqual({
      narrativeConsumerIntegrationEstablished: true,
      positionOnlyProfileConsumerSelectable: true,
      deterministicFallbackProfileRenderingVerified: true,
      modelSuccessProfileSemanticEnforcementVerified: false,
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

  test('is deterministic for the exact same governed review inputs', async () => {
    const left =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();
    const right =
      await buildRelationshipSpouseT8DayBranchPalaceProductNarrativeRuntimeAuthorityReview();

    expect(right.reviewId).toBe(left.reviewId);
    expect(right.fallbackExecutionId).toBe(left.fallbackExecutionId);
    expect(right.fallbackDeliveryId).toBe(left.fallbackDeliveryId);
    expect(right.profileBypassExecutionId).toBe(left.profileBypassExecutionId);
    expect(right.profileBypassDeliveryId).toBe(left.profileBypassDeliveryId);
    expect(right.checks).toEqual(left.checks);
    expect(right.authorizationBlockers).toEqual(left.authorizationBlockers);
  }, TEST_TIMEOUT_MS);
});
