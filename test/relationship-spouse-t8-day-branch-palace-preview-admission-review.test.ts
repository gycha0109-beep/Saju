import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_ADMISSION_REVIEW_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-preview-admission-review.js';

describe('SA-5S position-only spouse Preview admission review', () => {
  test('records the current Preview/Official coupling and keeps spouse Preview fail-closed', async () => {
    const review =
      await buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview();

    expect(review.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_ADMISSION_REVIEW_VERSION,
    );
    expect(review.issue).toBe('#2010');
    expect(review.capabilityKey).toBe('relationship:natal:spouse');
    expect(review.claimType).toBe(
      'relationship.spouse.traditional_spouse_palace_position',
    );
    expect(review.semanticScope).toBe('position_only');

    expect(review.checks).toEqual({
      upstreamRuntimeAuthorizationExact: true,
      previewSupportCurrentlyExcludesSpouse: true,
      approvedPreviewSectionsResolveOfficial: true,
      spouseCurrentlyRemainsLegacyNarrative: true,
      spouseSemanticAdmissionAbsent: true,
      currentPreviewRegistryHasNoSpousePositionClaim: true,
      currentPreviewRequestFailsClosed: true,
      protectedPreviewApprovalBoundaryIntact: true,
    });
    expect(review.reviewErrors).toEqual([]);
    expect(review.reviewCompleted).toBe(true);

    expect(review.currentSpouseAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(
      review.currentSpouseAuthority.supportedOfficialReadingSection,
    ).toBeUndefined();

    expect(review.currentPreviewPreparation.state).toBe(
      'insufficient_evidence',
    );
    expect(
      review.currentPreviewPreparation.composition?.selection.coverageState,
    ).toBe('insufficient_evidence');
    expect(
      review.currentPreviewPreparation.composition?.selection.targetClaimIds,
    ).toEqual([]);
    expect(
      review.currentPreviewPreparation.composition?.selection.missingRequirements,
    ).toContain('RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED');
    expect(
      review.currentPreviewPreparation.executionEligibility.readingExecution,
    ).toBe('blocked');
  });

  test('holds Preview admission instead of silently promoting the SA-5R lane to Official Reading', async () => {
    const review =
      await buildRelationshipSpouseT8DayBranchPalacePreviewAdmissionReview();

    expect(review.blockingGaps).toEqual([
      'PREVIEW_HOST_REGISTRY_DOES_NOT_MATERIALIZE_SPOUSE_POSITION_CLAIM',
      'PREVIEW_SUPPORTED_SECTION_IMPLIES_OFFICIAL_READING_AUTHORITY',
      'SPOUSE_POSITION_ONLY_OFFICIAL_READING_AUTHORITY_NOT_AUTHORIZED',
      'SPOUSE_PREVIEW_SEMANTIC_ADMISSION_NOT_REGISTERED',
    ]);
    expect(review.decision).toBe(
      'HOLD_POSITION_ONLY_PREVIEW_ADMISSION_PENDING_LEGACY_NARRATIVE_PREVIEW_LANE',
    );
    expect(review.authorityBoundary).toEqual({
      exactPositionOnlyCapabilityAuthorizedUpstream: true,
      legacyNarrativeRuntimeAuthorityEstablished: true,
      deliveryAuthorityAuthorized: true,
      previewAdmissionAuthorized: false,
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
    expect(review.requiredRemediation).toEqual([
      'DECOUPLE_PREVIEW_ADMISSION_FROM_OFFICIAL_READING_AUTHORITY',
      'ROUTE_SPOUSE_PREVIEW_TO_EXACT_SA5R_LEGACY_NARRATIVE_RUNTIME',
      'MATERIALIZE_EXACT_SPOUSE_POSITION_CLAIM_IN_PREVIEW_HOST',
      'REGISTER_POSITION_ONLY_PREVIEW_SEMANTIC_ADMISSION_WITHOUT_OFFICIAL_PROMOTION',
      'PRESERVE_FAIL_CLOSED_OFFICIAL_PUBLIC_PERSISTENCE_GA_PRODUCTION_BOUNDARIES',
    ]);
    expect(review.nextDisposition).toBe(
      'RUN_SA_5T_POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATION',
    );
  });
});
