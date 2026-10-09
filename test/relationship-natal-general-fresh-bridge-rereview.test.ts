import { describe, expect, it } from 'vitest';
import {
  buildRelationshipNatalGeneralFreshBridgeRereview,
} from '../src/research/relationship-natal-general-fresh-bridge-rereview.js';

describe('Relationship Natal general fresh Bridge re-review', () => {
  it('reviews the exact 0.6.0 zero-rule authority-seeking surface', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.reviewedCandidateVersion).toBe(
      '0.6.0-research-authority-seeking',
    );
    expect(review.checks.exactRevisionVersion).toBe(true);
    expect(review.checks.exactAuthoritySeekingSurface).toBe(true);
    expect(review.surface.revisedAuthoritySeekingRuleCount).toBe(0);
  });

  it('keeps the two NARROW paths outside semantic admission', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.checks.exactResearchLeadIsolation).toBe(true);
    expect(review.surface.nonAdmittedResearchLeadCount).toBe(2);
    expect(review.surface.semanticAdmissionCandidatePresent).toBe(false);
    expect(review.decision.semanticAdmissionCandidatePresent).toBe(false);
    expect(review.decision.bridgeSemanticAdmissionAuthorized).toBe(false);
  });

  it('invalidates reuse of the old 11-rule reviewed surface', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.surface.priorReviewedCandidateVersion).toBe('0.5.0-research');
    expect(review.surface.priorReviewedRuleCount).toBe(11);
    expect(review.checks.oldReviewedSurfaceInvalidated).toBe(true);
    expect(review.surface.oldReviewedSurfaceReusable).toBe(false);
    expect(
      review.surface.currentPreviewRuntimeSurfaceIsAuthoritySeekingSurface,
    ).toBe(false);
  });

  it('preserves the current Preview/runtime surface without granting it authority', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.checks.currentPreviewRuntimeSurfacePreserved).toBe(true);
    expect(review.decision.previewMutationAuthorized).toBe(false);
    expect(review.decision.officialReadingExpansionAuthorized).toBe(false);
  });

  it('completes fresh review but returns to Research because no semantic candidate exists', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.decision.freshBridgeRereviewCompleted).toBe(true);
    expect(review.decision.bridgeDecision).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.semanticAdmissionCandidatePresent).toBe(false);
    expect(review.decision.bridgeSemanticAdmissionAuthorized).toBe(false);
    expect(review.decision.nextOwner).toBe('traditional_saju_research');
  });

  it('keeps the four future-rule Research blockers explicit', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.futureRuleResearchBlockers).toEqual([
      'RELATIONSHIP_SPECIFIC_SOURCE_SUPPORT_INCOMPLETE',
      'TEN_GOD_TO_RELATIONSHIP_DOMAIN_MAPPING_AUTHORITY_INCOMPLETE',
      'RELATIONSHIP_SCOPE_QUALIFIERS_COUNTEREXAMPLES_INCOMPLETE',
      'RELATIONSHIP_SCHOOL_DEPENDENCE_BOUNDARY_INCOMPLETE',
    ]);
  });

  it('grants no downstream authority', () => {
    const review = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(review.decision.engineAuthorityPromotionAuthorized).toBe(false);
    expect(review.decision.boundedEngineDevelopmentAdmissionAuthorized).toBe(
      false,
    );
    expect(review.decision.g2aAdmitted).toBe(false);
    expect(review.decision.lifecyclePromotionAuthorized).toBe(false);
    expect(review.decision.productionAdmissionAuthorized).toBe(false);
    expect(review.decision.production).toBe('HOLD');
  });

  it('is deterministic', () => {
    const left = buildRelationshipNatalGeneralFreshBridgeRereview();
    const right = buildRelationshipNatalGeneralFreshBridgeRereview();

    expect(left).toEqual(right);
    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
