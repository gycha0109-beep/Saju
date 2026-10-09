import { describe, expect, it } from 'vitest';
import { buildGeneralNatalFixedWitnessReregistrationReview } from '../src/research/general-natal-fixed-witness-reregistration-review.js';

describe('General Natal fixed-witness re-registration review', () => {
  it('preserves all four frozen witnesses because no governed replacement is eligible', () => {
    const review = buildGeneralNatalFixedWitnessReregistrationReview();

    expect(review.issue).toBe('#1551');
    expect(review.decision).toBe('PRESERVE_CURRENT_FROZEN_DEFINITION');
    expect(review.decisionBasis.eligibleReplacementWitnessCount).toBe(0);
    expect(review.decisionBasis.witnessDecisions).toHaveLength(4);
    expect(
      review.decisionBasis.witnessDecisions.every(
        (row) =>
          row.decision === 'PRESERVE_CURRENT_FROZEN_DEFINITION' &&
          row.replacementEligibleNow === false,
      ),
    ).toBe(true);
  });

  it('distinguishes section mismatch, glyph mismatch, and missing replacement evidence', () => {
    const review = buildGeneralNatalFixedWitnessReregistrationReview();
    const reasons = Object.fromEntries(
      review.decisionBasis.witnessDecisions.map((row) => [row.witnessId, row.reason]),
    );

    expect(reasons['W-YUANHAI-WEALTH-OFFICER']).toBe(
      'EXACT_STRING_EXISTS_ONLY_OUTSIDE_REQUIRED_SECTION',
    );
    expect(reasons['W-YUANHAI-OFFICER-RESOURCE']).toBe(
      'OBSERVED_SURFACE_HAS_GLYPH_AND_SECTION_MISMATCH',
    );
    expect(reasons['W-YUANHAI-PEER-WEALTH']).toBe(
      'NO_GOVERNED_EXACT_SAME_SECTION_REPLACEMENT_SURFACE',
    );
    expect(reasons['W-YUANHAI-WEALTH-RESOURCE']).toBe(
      'EXACT_STRING_EXISTS_ONLY_OUTSIDE_REQUIRED_SECTION',
    );
  });

  it('does not mutate the candidate or invalidate the current Bridge surface', () => {
    const review = buildGeneralNatalFixedWitnessReregistrationReview();

    expect(review.candidateState.witnessMutationAuthorized).toBe(false);
    expect(review.candidateState.candidateMutationPerformed).toBe(false);
    expect(review.candidateState.candidateSurfaceVersionBumpRequiredNow).toBe(false);
    expect(review.candidateState.existingBridgeReviewInvalidatedByThisDecision).toBe(false);
  });

  it('routes unresolved work back to the existing R006-R008 acquisition owners', () => {
    const review = buildGeneralNatalFixedWitnessReregistrationReview();

    expect(review.routing.bridgeReentryReady).toBe(false);
    expect(review.routing.bridgeDisposition).toBe('RETURN_TO_RESEARCH');
    expect(review.routing.nextOwner).toBe('EXTERNAL_ACQUISITION_BACKLOG_R006_R008');
    expect(review.routing.externalAcquisitionBacklog.map((row) => row.researchItem)).toEqual([
      'R006',
      'R007',
      'R008',
    ]);
    expect(review.routing.approvedReregistrationWouldRequireFreshBridgeSurface).toBe(true);
  });

  it('keeps every downstream authority closed and is deterministic', () => {
    const left = buildGeneralNatalFixedWitnessReregistrationReview();
    const right = buildGeneralNatalFixedWitnessReregistrationReview();

    expect(left.authorityBoundary.engineAuthorityPromotionAuthorized).toBe(false);
    expect(left.authorityBoundary.productionAdmissionAuthority).toBe(false);
    expect(left.authorityBoundary.production).toBe('HOLD');
    expect(left.reviewHash).toBe(right.reviewHash);
    expect(left.reviewHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
