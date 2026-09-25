import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_MONTHLY_ACTIVATION_RULES,
  RELATIONSHIP_MONTHLY_POLICY_SOURCE,
  RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
  RELATIONSHIP_MONTHLY_TENSION_RULES,
} from '../src/research/relationship-monthly-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_RULES,
} from '../src/research/relationship-natal-reading-candidate.js';
import { buildRelationshipMonthlyAuthorityBridgeReview } from '../src/research/relationship-monthly-authority-bridge-review.js';

describe('Relationship Monthly Authority Bridge review', () => {
  it('reviews the exact current Relationship Monthly and reused Relationship Natal general research surfaces', () => {
    const review = buildRelationshipMonthlyAuthorityBridgeReview();

    expect(RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(RELATIONSHIP_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(RELATIONSHIP_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(review.candidateState.segmentIds).toEqual(['before_jeol', 'after_jeol']);
    expect(review.candidateState.monthlyRuleCount).toBe(28);
    expect(RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION).toBe('0.5.0-research');
    expect(RELATIONSHIP_NATAL_READING_RULES).toHaveLength(11);
    expect(review.candidateState.declaredNatalGeneralRuleCount).toBe(11);
    expect(review.candidateState.reusedNatalGeneralRuleCount).toBe(11);
    expect(review.candidateState.packStatus).toBe('research');
    expect(review.candidateState.allMonthlyRulesResearchOnly).toBe(true);
    expect(review.candidateState.allMonthlyRulesHeuristic).toBe(true);
    expect(review.candidateState.allMonthlyRulesExperimental).toBe(true);
    expect(review.candidateState.allMonthlyRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalGeneralRulesUnreviewed).toBe(true);
  });

  it('does not mistake exact jeol segmentation, internal policy, or temporal facts for Relationship Monthly general authority', () => {
    const review = buildRelationshipMonthlyAuthorityBridgeReview();

    expect(RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(RELATIONSHIP_MONTHLY_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.exactJeolSegmentationCapabilityPresent).toBe(true);
    expect(review.authorityState.internalRelationshipMonthlyPolicyPresent).toBe(true);
    expect(review.authorityState.relationshipMonthlyGeneralSpecificSourceAuthorityEstablished).toBe(
      false,
    );
    expect(review.authorityState.relationshipMonthlyInterpretiveEmphasisAuthorityEstablished).toBe(
      false,
    );
    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.targetMonth',
      'temporal.jeolBoundary.at',
      'temporal.segmentsById.*.segmentId',
      'temporal.segmentsById.*.monthlyPillar',
      'temporal.segmentsById.*.monthlyStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.segmentsById.*.monthlyBranchRelations.*.relation',
    ]);
    expect(
      review.temporalFactBoundary.exactJeolBoundaryIsTemporalCapabilityNotRelationshipAuthority,
    ).toBe(true);
    expect(review.temporalFactBoundary.monthlyStemTenGodIsInputFactNotRelationshipThemeAuthority).toBe(
      true,
    );
    expect(
      review.temporalFactBoundary.monthlyBranchRelationIsInputFactNotRelationshipEventAuthority,
    ).toBe(true);
    expect(
      review.temporalFactBoundary.relationshipNatalGeneralResearchReuseIsMonthlyAuthority,
    ).toBe(false);
    expect(review.temporalFactBoundary.relationshipAnnualGeneralAuthorityIsMonthlyAuthority).toBe(
      false,
    );
  });

  it('returns the candidate to Research and keeps spouse, compatibility, prediction, governance, and production gates closed', () => {
    const review = buildRelationshipMonthlyAuthorityBridgeReview();

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
    const review = buildRelationshipMonthlyAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_RELATIONSHIP_NATAL_GENERAL_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_RELATIONSHIP_ANNUAL_GENERAL_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_MONTHLY_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
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
    const left = buildRelationshipMonthlyAuthorityBridgeReview();
    const right = buildRelationshipMonthlyAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
