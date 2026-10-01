import { describe, expect, test } from 'vitest';
import type { ReviewAttestation } from '../src/contracts/interpretation.js';
import {
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import type { ReviewerTrustContext } from '../src/interpretation/reviewer-trust.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
  buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest,
  type RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission,
  type RelationshipSpouseT8DayBranchPalaceNarrativeMaterialityDecision,
} from '../src/research/relationship-spouse-t8-day-branch-palace-human-domain-materiality-request.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview,
  evaluateRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-sa5m-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

async function syntheticValidExternalSubmission(): Promise<RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission> {
  const request =
    await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();
  const reviewerId = 'SYNTHETIC-DOMAIN-REVIEWER-SA5M-READINESS-TEST';

  const reviewAttestations: readonly ReviewAttestation[] = request.subjects.map(
    (subject, index) => ({
      attestationId: `sa5m-readiness-synthetic-${subject.subjectType}-${index + 1}`,
      subjectType: subject.subjectType,
      subjectRef: subject.subjectRef,
      reviewLevel: 'domain',
      reviewerId,
      reviewedAt: '2026-10-01T10:35:00.000Z',
      decision: 'approved',
      notes: 'Synthetic validator fixture only; not actual human/domain review.',
    }),
  );

  const reviewerTrustContext: ReviewerTrustContext = {
    policyId: 'sa5m-readiness-synthetic-reviewer-trust-test',
    version: '1.0.0',
    grants: [
      {
        reviewerId,
        allowedReviewLevels: ['domain'],
        trustedAttestationContentHashes: reviewAttestations.map((attestation) =>
          deterministicContentHash(attestation),
        ),
        status: 'active',
      },
    ],
  };

  const materialityDecision: RelationshipSpouseT8DayBranchPalaceNarrativeMaterialityDecision =
    {
      decision:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
      reviewerId,
      decidedAt: '2026-10-01T10:36:00.000Z',
      requestId: request.requestId,
      claimType: request.claimType,
      semanticFamily: request.semanticFamily,
      semanticVersion: request.semanticVersion,
      semanticScope: request.semanticScope,
      allowedNarrativeProposition:
        request.materialityDecisionRequirements.allowedNarrativeProposition,
      prohibitedExtensions:
        request.materialityDecisionRequirements.prohibitedExtensions,
      notes: 'Synthetic validator fixture only; not actual materiality approval.',
    };

  return {
    request,
    reviewAttestations,
    reviewerTrustContext,
    materialityDecision,
  };
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5M readiness gate', () => {
  test('fails closed when no real external submission is supplied', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview();

    expect(result.readinessReviewId).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.externalSubmissionPresent).toBe(false);
    expect(result.sa5mMaterializationReviewMayBegin).toBe(false);
    expect(result.readinessState).toBe(
      'BLOCKED_PENDING_OR_INVALID_EXTERNAL_HUMAN_DOMAIN_SUBMISSION',
    );
    expect(result.blockers).toContain(
      'SA5M_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_REQUIRED',
    );
    expect(result.nextDisposition).toBe(
      'AWAIT_OR_REPAIR_REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION',
    );
  });

  test('reuses a fully passing SA-5L submission only to establish SA-5M review eligibility', async () => {
    const submission = await syntheticValidExternalSubmission();
    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview({
        submission,
      });

    expect(result.blockers).toEqual([]);
    expect(result.externalSubmissionPresent).toBe(true);
    expect(result.checks.exactSa5lSubmissionAccepted).toBe(true);
    expect(result.sa5mMaterializationReviewMayBegin).toBe(true);
    expect(result.readinessState).toBe(
      'ELIGIBLE_FOR_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW',
    );
    expect(result.nextDisposition).toBe(
      'DESIGN_AND_RUN_SEPARATE_SA_5M_AUTHORITY_MATERIALIZATION_REVIEW',
    );
    expect(result.authorityBoundary.externalHumanSubmissionValidated).toBe(
      true,
    );
    expect(result.authorityBoundary.sa5mAuthorityMaterializationAuthorized).toBe(
      false,
    );
  });

  test('rejects a supplied package when its trust no longer pins the exact attestations', async () => {
    const submission = await syntheticValidExternalSubmission();
    const invalidSubmission: RelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission =
      {
        ...submission,
        reviewerTrustContext: {
          ...submission.reviewerTrustContext,
          grants: submission.reviewerTrustContext.grants.map((grant) => ({
            ...grant,
            trustedAttestationContentHashes: ['0'.repeat(64)],
          })),
        },
      };

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview({
        submission: invalidSubmission,
      });

    expect(result.externalSubmissionPresent).toBe(true);
    expect(result.checks.exactSa5lSubmissionAccepted).toBe(false);
    expect(result.sa5mMaterializationReviewMayBegin).toBe(false);
    expect(result.blockers).toContain(
      'SA5M_SA5L_VALIDATED_SUBMISSION_REQUIRED',
    );
    expect(result.upstreamSubmissionBlockers.length).toBeGreaterThan(0);
  });

  test('never materializes authority even when the synthetic validation package passes', async () => {
    const submission = await syntheticValidExternalSubmission();
    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview({
        submission,
      });

    expect(result.authorityBoundary).toEqual({
      readinessReviewEstablished: true,
      externalHumanSubmissionValidated: true,
      humanDomainReviewMaterialized: false,
      reviewAttestationMaterializedIntoRegistry: false,
      reviewerTrustContextMaterializedIntoExecutionAuthority: false,
      reviewerTrustGrantMaterializedIntoExecutionAuthority: false,
      narrativeMaterialityDecisionMaterialized: false,
      reviewerStatusPromotionAuthorized: false,
      materialForNarrativeMutationAuthorized: false,
      claimNarrativeProfileCreationAuthorized: false,
      narrativeProfileAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      sa5mAuthorityMaterializationAuthorized: false,
      production: 'HOLD',
    });
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);
  });

  test('is deterministic for the same absent-input readiness state', async () => {
    const first =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview();
    const second =
      await buildRelationshipSpouseT8DayBranchPalaceSa5mReadinessReview();

    expect(first).toEqual(second);
    expect(first.readinessReviewId).toBe(second.readinessReviewId);
    expect(first.checks.exactCurrentHandoffBinding).toBe(true);
    expect(first.checks.existingAuthorityStillUnmutated).toBe(true);
    expect(first.checks.sa5lAuthorityStillUnmaterialized).toBe(true);
  });
});
