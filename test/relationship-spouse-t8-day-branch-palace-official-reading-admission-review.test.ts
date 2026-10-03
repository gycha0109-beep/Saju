import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_OFFICIAL_READING_ADMISSION_REVIEW_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-official-reading-admission-review.js';

describe('SA-5V historical spouse Official Reading admission eligibility review', () => {
  test('preserves the exact eligibility decision without mutating current authority', async () => {
    const review =
      await buildRelationshipSpouseT8DayBranchPalaceOfficialReadingAdmissionReview();

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

    expect(review.historicalProbe.factRefs).toEqual(['pillars.day']);
    expect(review.historicalProbe.officialSemanticGroups).toEqual([
      'relationship',
      'limits',
    ]);
    expect(review.historicalProbe.readerAxis).toBe('relationship');
    expect(review.historicalProbe.officialReadingSectionsBeforeImplementation).toEqual([
      'general:natal',
      'career:natal',
      'wealth:natal',
      'relationship:natal:general',
      'business:natal',
    ]);
    expect(review.historicalProbe.spouseConsumerAuthorityBeforeImplementation).toBe(
      'legacy_narrative',
    );

    expect(review.authorityBoundary.officialReadingAdmissionEligible).toBe(true);
    expect(review.authorityBoundary.officialReadingSurfaceMutationAuthorized).toBe(false);
    expect(review.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityBoundary.productionAuthorityAuthorized).toBe(false);
  });
});
