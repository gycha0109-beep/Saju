import { describe, expect, it } from 'vitest';
import {
  CAREER_MONTHLY_ACTIVATION_RULES,
  CAREER_MONTHLY_POLICY_SOURCE,
  CAREER_MONTHLY_READING_CANDIDATE_VERSION,
  CAREER_MONTHLY_READING_PACK,
  CAREER_MONTHLY_TENSION_RULES,
} from '../src/research/career-monthly-reading-candidate.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_RULES,
} from '../src/research/career-natal-reading-candidate.js';
import { buildCareerMonthlyAuthorityBridgeReview } from '../src/research/career-monthly-authority-bridge-review.js';

describe('Career Monthly Authority Bridge review', () => {
  it('reviews the exact current Career Monthly candidate and reused Career Natal research surface', () => {
    const review = buildCareerMonthlyAuthorityBridgeReview();

    expect(CAREER_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(CAREER_MONTHLY_READING_PACK.status).toBe('research');
    expect(CAREER_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(CAREER_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(review.candidateState.segmentCount).toBe(2);
    expect(review.candidateState.monthlyRuleCount).toBe(28);
    expect(CAREER_NATAL_READING_CANDIDATE_VERSION).toBe('0.5.0-research');
    expect(CAREER_NATAL_READING_RULES).toHaveLength(20);
    expect(review.candidateState.reusedNatalRuleCount).toBe(20);
    expect(review.candidateState.registryRuleCount).toBe(48);
    expect(review.candidateState.allMonthlyRulesResearchOnly).toBe(true);
    expect(review.candidateState.allMonthlyRulesHeuristic).toBe(true);
    expect(review.candidateState.allMonthlyRulesExperimental).toBe(true);
    expect(review.candidateState.allMonthlyRulesUnreviewed).toBe(true);
    expect(review.candidateState.allReusedNatalRulesResearchOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesSecondaryOnly).toBe(true);
    expect(review.candidateState.allReusedNatalRulesContested).toBe(true);
    expect(review.candidateState.allReusedNatalRulesUnreviewed).toBe(true);
  });

  it('keeps the narrowly admitted Natal Position component bounded to Natal scope', () => {
    const review = buildCareerMonthlyAuthorityBridgeReview();

    expect(review.natalGovernanceBoundary.boundedNatalAuthorityComponentObserved).toBe(true);
    expect(review.natalGovernanceBoundary.exactTenGod).toBe('정관');
    expect(review.natalGovernanceBoundary.condition).toBe('day_branch');
    expect(review.natalGovernanceBoundary.qualitativeModificationMode).toBe('DEEPENS_OR_EMPHASIZES');
    expect(review.natalGovernanceBoundary.temporalScope).toBe('natal');
    expect(review.natalGovernanceBoundary.generalizedToOtherPillars).toBe(false);
    expect(review.natalGovernanceBoundary.generalizedToOtherTenGodSemantics).toBe(false);
    expect(review.natalGovernanceBoundary.currentCareerNatalCandidateIsResearchOnly).toBe(true);
    expect(review.natalGovernanceBoundary.boundedNatalComponentAuthorizesCareerMonthly).toBe(false);
    expect(review.natalGovernanceBoundary.reusedNatalResearchExecutionAuthorizesCareerMonthly).toBe(false);
  });

  it('does not mistake internal policy or exact jeol segmentation for Career Monthly authority', () => {
    const review = buildCareerMonthlyAuthorityBridgeReview();

    expect(CAREER_MONTHLY_POLICY_SOURCE.sourceType).toBe('internal_research');
    expect(CAREER_MONTHLY_POLICY_SOURCE.provenanceTier).toBe('internal');
    expect(review.authorityState.internalCareerMonthlyPolicyPresent).toBe(true);
    expect(review.authorityState.exactJeolSegmentationCapabilityPresent).toBe(true);
    expect(review.authorityState.careerMonthlySpecificSourceAuthorityEstablished).toBe(false);
    expect(review.authorityState.careerMonthlyInterpretiveEmphasisAuthorityEstablished).toBe(false);
    expect(review.sourceResearchBlockers.every((blocker) => blocker.established === false)).toBe(true);
  });

  it('keeps Monthly segmentation facts, narrative, and Reading Profile coverage outside Career authority', () => {
    const review = buildCareerMonthlyAuthorityBridgeReview();

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
    expect(review.temporalFactBoundary.jeolBoundaryIsSegmentationFactNotCareerAuthority).toBe(true);
    expect(review.temporalFactBoundary.segmentMonthlyPillarIsInputFactNotCareerAuthority).toBe(true);
    expect(review.temporalFactBoundary.segmentMonthlyStemTenGodIsInputFactNotCareerThemeAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.segmentBranchRelationIsInputFactNotCareerEventAuthority).toBe(
      true,
    );
    expect(review.temporalFactBoundary.narrativeCopyIsSemanticAuthority).toBe(false);
    expect(review.temporalFactBoundary.readingProfileCoverageIsSemanticAuthority).toBe(false);
  });

  it('returns the bounded candidate to Research and keeps every promotion gate closed', () => {
    const review = buildCareerMonthlyAuthorityBridgeReview();

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
    const review = buildCareerMonthlyAuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_NATAL_TO_CAREER_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_GENERAL_MONTHLY_TO_CAREER_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CAREER_ANNUAL_TO_CAREER_MONTHLY_AUTHORITY_INHERITANCE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_BOUNDED_NATAL_POSITION_COMPONENT_GENERALIZATION_TO_MONTHLY_SCOPE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_EXACT_JEOL_SEGMENTATION_AS_CAREER_INTERPRETATION_AUTHORITY',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_PREDICTION',
    );
  });

  it('is deterministic for the same candidate and governed authority snapshot', () => {
    const left = buildCareerMonthlyAuthorityBridgeReview();
    const right = buildCareerMonthlyAuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
