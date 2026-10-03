import { beforeAll, describe, expect, test } from 'vitest';
import {
  PREVIEW_E2E_APPROVAL,
} from '../src/preview/preview-authority.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_PROHIBITED_PHRASES,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-narrative-profile-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-official-reading-admission-review.js';

const SETUP_TIMEOUT_MS = 180_000;

type Review = Awaited<
  ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview
  >
>;

function requireSuccessfulProbe(review: Review) {
  const probe = review.probe;
  if (!probe.ok) throw new Error(probe.error);
  return probe;
}

describe('SA-5V spouse position-only Official Reading admission eligibility review', () => {
  let review: Review;

  beforeAll(async () => {
    review =
      await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview();
  }, SETUP_TIMEOUT_MS);

  test('establishes eligibility without granting Official Reading authority', () => {
    expect(review.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION,
    );
    expect(review.issue).toBe('#2039');
    expect(review.capabilityKey).toBe('relationship:natal:spouse');
    expect(review.semanticScope).toBe('position_only');
    expect(review.blockers).toEqual([]);
    expect(review.officialReadingAdmissionEligible).toBe(true);
    expect(review.authorityReviewCompleted).toBe(true);
    expect(review.decision).toBe(
      'POSITION_ONLY_OFFICIAL_READING_ADMISSION_ELIGIBLE',
    );
    expect(review.nextDisposition).toBe(
      'RUN_SA_5W_POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTATION',
    );
    expect(review.reviewId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('projects the actual governed spouse claim into canonical semantics with only pillars.day', () => {
    expect(review.checks.upstreamPreviewDeliveryAuthorityExact).toBe(true);
    expect(review.checks.isolatedProbeCompleted).toBe(true);
    expect(review.checks.evidenceSelectionExact).toBe(true);
    expect(review.checks.canonicalFactBindingExact).toBe(true);
    expect(review.checks.canonicalSemanticRepresentationAvailable).toBe(true);
    expect(review.checks.mandatoryQualifierPreserved).toBe(true);

    const probe = requireSuccessfulProbe(review);

    const unit = probe.semantics.units.find(
      (candidate) => candidate.claimId === probe.claim.claimId,
    );
    expect(unit).toBeDefined();
    expect(unit?.role).toBe('primary');
    expect(unit?.factRefs).toEqual(['pillars.day']);
    expect(unit?.canonicalText).toEqual({
      headline:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_HEADLINE,
      summary:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
    });
    expect(unit?.semanticQualifiers?.[0]?.canonicalText?.summary).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
    );
  });

  test('preserves the exact meaning through isolated Official Reading rendering', () => {
    expect(review.checks.officialPlanRepresentable).toBe(true);
    expect(review.checks.officialRendererMeaningPreserved).toBe(true);

    const probe = requireSuccessfulProbe(review);

    expect(
      probe.plan.sections.some(
        (section) => section.semanticGroup === 'relationship',
      ),
    ).toBe(true);
    expect(
      probe.plan.sections.some(
        (section) => section.semanticGroup === 'limits',
      ),
    ).toBe(true);

    const encoded = JSON.stringify(probe.report.sections);
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
  });

  test('preserves the relationship axis and mandatory qualifier in reader grounding', () => {
    expect(review.checks.readerGroundingMeaningPreserved).toBe(true);

    const probe = requireSuccessfulProbe(review);

    expect(probe.reader.grounding.units).toHaveLength(1);
    expect(probe.reader.grounding.units[0]).toMatchObject({
      axis: 'relationship',
      canonicalMeaning: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_SUMMARY,
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_POSITION_ONLY_QUALIFIER,
      ].join('\n'),
    });
    expect(probe.reader.parity.semanticHash).toBe(
      probe.semantics.semanticHash,
    );
    expect(probe.reader.parity.officialReportHash).toBe(
      probe.report.reportHash,
    );
  });

  test('keeps the existing Official Reading five unchanged and spouse on legacy Narrative authority', () => {
    expect(review.checks.existingOfficialFiveUnchanged).toBe(true);
    expect(review.checks.noAuthorityPromotionOccurred).toBe(true);
    expect(review.checks.protectedBoundariesClosed).toBe(true);

    expect(PREVIEW_E2E_APPROVAL.officialReadingSections).toEqual([
      'general:natal',
      'career:natal',
      'wealth:natal',
      'relationship:natal:general',
      'business:natal',
    ]);
    expect(PREVIEW_E2E_APPROVAL.officialReadingSections).not.toContain(
      'relationship:natal:spouse',
    );
    expect(review.currentAuthority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(
      review.currentAuthority.supportedOfficialReadingSection,
    ).toBeUndefined();
  });

  test('keeps every broader authority boundary closed', () => {
    expect(review.authorityBoundary).toEqual({
      exactPositionOnlyCapability: true,
      isolatedCanonicalSemanticRepresentationEstablished: true,
      isolatedOfficialReadingPlanRepresentable: true,
      isolatedOfficialReadingRendererCompatible: true,
      isolatedReaderGroundingCompatible: true,
      officialReadingAdmissionEligible: true,
      officialReadingSurfaceMutationAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      previewDeliveryAuthorityPreserved: true,
      legacyNarrativePreviewLanePreserved: true,
      publicSemanticAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
  });
});
