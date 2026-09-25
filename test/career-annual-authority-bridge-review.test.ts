import { describe, expect, it } from 'vitest';
import {
  CAREER_ANNUAL_ACTIVATION_RULES,
  CAREER_ANNUAL_POLICY_SOURCE,
  CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  CAREER_ANNUAL_READING_PACK,
  CAREER_ANNUAL_TENSION_RULES,
} from '../src/research/career-annual-reading-candidate.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_RULES,
} from '../src/research/career-natal-reading-candidate.js';
import { buildCareerAnnualAuthorityBridgeReview } from '../src/research/career-annual-authority-bridge-review.js';

describe('Career Annual Authority Bridge review', () => {
  it('reviews the exact current Career Annual candidate and its reused Career Natal research surface', () => {
    const review = buildCareerAnnualAuthorityBridgeReview();

    expect(CAREER_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(CAREER_ANNUAL_READING_PACK.status).toBe('research');
    expect(CAREER_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(CAREER_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(review.candidateState.annualRuleCount).toBe(14);
    expect(CAREER_NATAL_READING_CANDIDATE_VERSION).toBe('0.5.0-research');
    expect(CAREER_NATAL_READING_RULES).toHaveLength(20);
    expect(review.candidateState.reusedNatalRuleCount).toBe(20);
    expect(review.candidateState.registryRuleCount).toBe(34);
    expect(review.candidateState.allAnnualRulesResearchOnly).toBe(true);
    expect(review.candidateState.allAnnualRulesHeuristic).toBe(true);
    expect(review.candidateState.allAnnualRulesExperimental).toBe(true);
    expect(review.candidateState.allAnnualRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalRulesUnreviewed).toBe(true);
  });

  it('keeps the narrowly admitted Natal Position component bounded to Natal scope', () => {
    const review = buildCareerAnnualAuthorityBridgeReview();

    expect(review.natalGovernanceBoundary.boundedNatalAuthorityComponentObserved).toBe(true);
    expect(review.natalGovernanceBoundary.exactTenGod).toBe('정관');
    expect(review.natalGovernanceBoundary.condition).toBe('day_branch');
    expect(review.natalGovernanceBoundary.qualitativeModificationMode).toBe('DEEPENS_OR_EMPHASIZES');
    expect(review.natalGovernanceBoundary.temporalScope).toBe('natal');
    expect(review.natalGovernanceBoundary.generalizedToOtherPillars).toBe(false);
    expect(review.natalGovernanceBoundary.generalizedToOtherTenGodSemantics).toBe(false);
    expect(review.natalGovernanceBoundary.currentCareerNatalCandidateIsResearchOnly).toBe(true);
    expect(review.natalGovernanceBoundary.boundedNatalComponentAuthorizesCareerAnnual).toBe(false);
    expect(review.natalGovernanceBoundary.reusedNatalResearchExecutionAuthorizesCareerAnnual).toBe(false);
  });

  it('does not mistake the internal Career Annual policy for domain semantic authority', () => {
    const review = buildCareerAnnualAuthorityBridgeReview();

    expect(CAREER_ANNUAL_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(CAREER_ANNUAL_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalCareerAnnualPolicyPresent).toBe(true);
    expect(review.authorityState.careerAnnualSpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.careerAnnualInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
  });

  it('keeps Annual facts, narrative, and Reading Profile coverage outside Career Annual authority', () => {
    const review = buildCareerAnnualAuthorityBridgeReview();

    expect(review.temporalFactBoundary.requiredFactTypes).toEqual([
      'temporal.targetYear',
      'temporal.annualPillar',
      'temporal.annualStemTenGod',
    ]);
    expect(review.temporalFactBoundary.optionalFactTypes).toEqual([
      'temporal.annualBranchRelations',
    ]);
    expect(review.temporalFactBoundary.annualPillarIsInputFactNotCareerAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualStemTenGodIsInputFactNotCareerThemeAuthority).toBe(true);
    expect(review.temporalFactBoundary.annualBranchRelationIsInputFactNotCareerEventAuthority).toBe(true);
    expect(review.temporalFactBoundary.narrativeCopyIsSemanticAuthority).toBe(false);
    expect(review.temporalFactBoundary.readingProfileCoverageIsSemanticAuthority).toBe(false);
  });

  it('returns the bounded candidate to Research and keeps every promotion gate closed', () => {
    const review = buildCareerAnnualAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.candidateMayRemainResearchOnly).toBe(true);
    expect(review.decision.reReviewRequiredAfterResearch).toBe(true);
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

  it('forbids temporal/domain inheritance and deterministic career-event shortcuts', () => {
    const review = buildCareerAnnualAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_NATAL_TO_CAREER_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_ANNUAL_TO_CAREER_ANNUAL_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_ANNUAL_TO_CAREER_MONTHLY_AUTHORITY_EXPANSION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BOUNDED_NATAL_POSITION_COMPONENT_GENERALIZATION_TO_ANNUAL_SCOPE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_PREDICTION',
    );
  });

  it('is deterministic for the same candidate and governed authority snapshot', () => {
    const left = buildCareerAnnualAuthorityBridgeReview();
    const right = buildCareerAnnualAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
