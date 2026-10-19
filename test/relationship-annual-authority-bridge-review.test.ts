import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_ANNUAL_ACTIVATION_RULES,
  RELATIONSHIP_ANNUAL_POLICY_SOURCE,
  RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_ANNUAL_TENSION_RULES,
} from '../src/research/relationship-annual-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_RULES,
} from '../src/research/relationship-natal-reading-candidate.js';
import { buildRelationshipAnnualAuthorityBridgeReview } from '../src/research/relationship-annual-authority-bridge-review.js';

describe('Relationship Annual Authority Bridge review', () => {
  it('reviews the exact current Relationship Annual and reused Relationship Natal general research surfaces', () => {
    const review = buildRelationshipAnnualAuthorityBridgeReview();

    expect(RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(RELATIONSHIP_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(RELATIONSHIP_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(review.candidateState.annualRuleCount).toBe(14);
    expect(RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION).toBe('0.5.0-research');
    expect(RELATIONSHIP_NATAL_READING_RULES).toHaveLength(11);
    expect(review.candidateState.declaredNatalGeneralRuleCount).toBe(11);
    expect(review.candidateState.reusedNatalGeneralRuleCount).toBe(11);
    expect(review.candidateState.packStatus).toBe('research');
    expect(review.candidateState.allAnnualRulesResearchOnly).toBe(true);
    expect(review.candidateState.allAnnualRulesHeuristic).toBe(true);
    expect(review.candidateState.allAnnualRulesExperimental).toBe(true);
    expect(review.candidateState.allAnnualRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesUnreviewed).toBe(true);
  });

  it('does not mistake internal policy or temporal facts for Relationship Annual general authority', () => {
    const review = buildRelationshipAnnualAuthorityBridgeReview();

    expect(RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(RELATIONSHIP_ANNUAL_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalRelationshipAnnualPolicyPresent).toBe(true);
    expect(review.authorityState.relationshipAnnualGeneralSpecificSourceAuthorityEstablished).toBe(
      false,
    );
    expect(review.authorityState.relationshipAnnualInterpretiveEmphasisAuthorityEstablished).toBe(
      false,
    );
    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.annualPillar',
      'temporal.annualStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.annualBranchRelations',
    ]);
    expect(review.temporalFactBoundary.annualPillarIsInputFactNotRelationshipAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualStemTenGodIsInputFactNotRelationshipThemeAuthority).toBe(
      true,
    );
    expect(
      review.temporalFactBoundary.annualBranchRelationIsInputFactNotRelationshipEventAuthority,
    ).toBe(true);
    expect(
      review.temporalFactBoundary.relationshipNatalGeneralResearchReuseIsAnnualAuthority,
    ).toBe(false);
  });

  it('returns the candidate to Research and keeps spouse, compatibility, prediction, governance, and production gates closed', () => {
    const review = buildRelationshipAnnualAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
    expect(review.authorityState.spouseSpecificAuthorityEstablished).toBe(false);
    expect(review.authorityState.compatibilityAuthorityEstablished).toBe(false);
    expect(review.authorityState.deterministicRelationshipEventPredictionAuthorized).toBe(false);
    expect(review.authorityState.domainReviewAuthorityEstablished).toBe(false);
    expect(review.authorityState.trustedDomainAttestationEstablished).toBe(false);
    expect(review.authorityState.provenanceQualityPromotionAuthorized).toBe(false);
    expect(review.authorityState.lifecyclePromotionAuthorized).toBe(false);
    expect(review.authorityState.engineAuthorityPromotionAuthorized).toBe(false);
    expect(review.authorityState.previewExpansionAuthorized).toBe(false);
    expect(review.authorityState.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityState.productionAdmissionAuthority).toBe(false);
    expect(review.authorityState.production).toBe('HOLD');
  });

  it('forbids temporal/domain inheritance and deterministic relationship extensions', () => {
    const review = buildRelationshipAnnualAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_RELATIONSHIP_NATAL_GENERAL_TO_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_RELATIONSHIP_ANNUAL_GENERAL_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_EXPANSION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_RELATIONSHIP_GENERAL_TO_SPOUSE_SPECIFIC_AUTHORITY_EXPANSION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_RELATIONSHIP_GENERAL_TO_COMPATIBILITY_AUTHORITY_EXPANSION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_SPECIFIC_PERSON_APPEARANCE_CONTACT_DATING_MARRIAGE_BREAKUP_DIVORCE_RECONCILIATION_PREGNANCY_FIDELITY_OR_GUARANTEED_RELATIONSHIP_TIMING_PREDICTION',
    );
    expect(review.prohibitedExtensions).toContain('NO_PARTNER_ATTRIBUTE_OR_INTENTION_INFERENCE');
  });

  it('is deterministic for the same candidate and evidence surface', () => {
    const left = buildRelationshipAnnualAuthorityBridgeReview();
    const right = buildRelationshipAnnualAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
