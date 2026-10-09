import { describe, expect, it } from 'vitest';
import {
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
} from '../src/research/general-natal-useful-reading-candidate.js';
import {
  buildRelationshipNatalGeneralAuthorityBridgeReview,
} from '../src/research/relationship-natal-general-authority-bridge-review.js';
import {
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from '../src/research/relationship-natal-reading-candidate.js';

describe('Relationship Natal general Engine authority Bridge review', () => {
  it('pins the exact current 0.5.0 research candidate and 11 T8 relationship/general rules', () => {
    const review = buildRelationshipNatalGeneralAuthorityBridgeReview();

    expect(review.candidateVersion).toBe('0.5.0-research');
    expect(review.relationshipRuleCount).toBe(11);
    expect(review.candidateChecks).toEqual({
      exactCandidateVersion: true,
      exactRelationshipRuleCount: true,
      allRelationshipRulesResearchOnly: true,
      allRelationshipRulesUnreviewed: true,
      allRelationshipRulesTaxonomyExact: true,
      methodologyResearchOnly: true,
    });
    expect(
      RELATIONSHIP_NATAL_READING_RULES.every(
        (rule) =>
          rule.taxonomy.tier === 'T8' &&
          rule.taxonomy.category === 'relationship' &&
          rule.taxonomy.subcategory === 'general',
      ),
    ).toBe(true);
  });

  it('proves the current Relationship methodology and rules bind only the two General Natal sources', () => {
    const review = buildRelationshipNatalGeneralAuthorityBridgeReview();
    const generalSourceIds = [
      GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
    ].sort();

    expect([...RELATIONSHIP_NATAL_READING_METHODOLOGY.sourceIds].sort()).toEqual(
      generalSourceIds,
    );
    expect(review.sourceAuthority.methodologyUsesOnlyGeneralNatalSources).toBe(
      true,
    );
    expect(
      review.sourceAuthority.everyRelationshipRuleUsesOnlyGeneralNatalSources,
    ).toBe(true);
    expect(
      review.sourceAuthority.relationshipSpecificSourceAuthorityEstablished,
    ).toBe(false);
    expect(
      review.sourceAuthority.relationshipDomainProjectionAuthorityEstablished,
    ).toBe(false);
    expect(review.sourceAuthority.sourceGroundedAiInternalReviewPassed).toBe(
      false,
    );
  });

  it('keeps Preview semantic admission and Reading Profile authorization consumer-scoped only', () => {
    const review = buildRelationshipNatalGeneralAuthorityBridgeReview();

    expect(review.consumerAuthority.previewBaselinePresent).toBe(true);
    expect(review.consumerAuthority.previewAdmissionId).toBe(
      'preview-baseline-relationship-natal-general-research-candidate-v1',
    );
    expect(
      review.consumerAuthority.previewAdmissionMayAffectProductionAuthority,
    ).toBe(false);
    expect(review.consumerAuthority.readingSelectionAuthorized).toBe(true);
    expect(
      review.consumerAuthority.previewAdmissionIsEngineSemanticAuthority,
    ).toBe(false);
    expect(
      review.consumerAuthority.readingProfileAuthorizationIsEngineSemanticAuthority,
    ).toBe(false);
    expect(
      review.consumerAuthority.officialReadingFidelityIsEngineSemanticAuthority,
    ).toBe(false);
  });

  it('returns the candidate to Research instead of fabricating Engine authority', () => {
    const review = buildRelationshipNatalGeneralAuthorityBridgeReview();

    expect(review.decision).toEqual({
      candidateRepresentable: true,
      candidateRejected: false,
      researchReturnRequired: true,
      bridgeDecision: 'RETURN_TO_RESEARCH',
      engineAuthorityPromotion: false,
      g2aAdmitted: false,
      previewExpansionAuthorized: false,
      officialReadingExpansionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
    expect(review.researchReturnWorkstreams).toHaveLength(6);
    expect(review.prohibitedShortcuts).toContain(
      'AI_REVIEW_MUST_NOT_APPROVE_UNSUPPORTED_DOMAIN_PROJECTION',
    );
  });

  it('is deterministic', () => {
    const left = buildRelationshipNatalGeneralAuthorityBridgeReview();
    const right = buildRelationshipNatalGeneralAuthorityBridgeReview();

    expect(left).toEqual(right);
    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
