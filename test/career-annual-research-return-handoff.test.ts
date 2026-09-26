import { describe, expect, it } from 'vitest';
import { buildCareerAnnualResearchReturnHandoff } from '../src/research/career-annual-research-return-handoff.js';

describe('Career Annual Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildCareerAnnualResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1540');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact current Career Annual + reused Natal candidate surface', () => {
    const handoff = buildCareerAnnualResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(2);
    expect(handoff.candidateBinding.annualRuleCount).toBe(14);
    expect(handoff.candidateBinding.reusedNatalRuleCount).toBe(20);
    expect(handoff.candidateBinding.registryRuleCount).toBe(34);
    expect(handoff.candidateBinding.ruleCount).toBe(34);
    expect(handoff.candidateBinding.packRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoff.candidateBinding.methodologies).toHaveLength(2);
    expect(handoff.candidateBinding.rules).toHaveLength(34);
    expect(handoff.candidateBinding.candidateSurfaceHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('preserves the bounded Natal Position authority as natal-only', () => {
    const handoff = buildCareerAnnualResearchReturnHandoff();

    expect(handoff.existingNatalAuthorityBoundary.boundedNatalAuthorityComponentObserved).toBe(true);
    expect(handoff.existingNatalAuthorityBoundary.exactTenGod).toBe('정관');
    expect(handoff.existingNatalAuthorityBoundary.condition).toBe('day_branch');
    expect(handoff.existingNatalAuthorityBoundary.temporalScope).toBe('natal');
    expect(handoff.existingNatalAuthorityBoundary.boundedNatalComponentAuthorizesCareerAnnual).toBe(false);
    expect(handoff.existingNatalAuthorityBoundary.reusedNatalResearchExecutionAuthorizesCareerAnnual).toBe(false);
    expect(handoff.authorityBoundary.boundedNatalPositionAuthorityGeneralizedToAnnual).toBe(false);
  });

  it('returns six bounded Research workstreams instead of treating candidate semantics as truth', () => {
    const handoff = buildCareerAnnualResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'CAREER_ANNUAL_STEM_TEN_GOD_SEMANTIC_AUTHORITY',
      'CAREER_ANNUAL_BRANCH_CLASH_WORK_ADJUSTMENT_AUTHORITY',
      'CAREER_ANNUAL_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY',
      'CAREER_ANNUAL_SCOPE_AND_QUALIFIER_CONTRACT',
      'CAREER_NATAL_AND_GENERAL_ANNUAL_REUSE_BOUNDARY',
      'PRODUCT_NARRATIVE_POLICY_SEMANTIC_SEPARATION',
    ]);
    expect(
      handoff.workstreams.every(
        (workstream) => workstream.owner === 'traditional_saju_research',
      ),
    ).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(true);
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
  });

  it('keeps authority inheritance and deterministic career-event inference closed', () => {
    const handoff = buildCareerAnnualResearchReturnHandoff();

    expect(handoff.authorityBoundary.careerNatalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.generalAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.careerAnnualAuthorityExtendsToCareerMonthlyAutomatically).toBe(false);
    expect(handoff.authorityBoundary.temporalFactsAreInterpretationAuthority).toBe(false);
    expect(handoff.prohibitedExtensions).toContain(
      'NO_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_PREDICTION',
    );
  });

  it('keeps governance, Engine, Official Reading, and Production fail closed', () => {
    const handoff = buildCareerAnnualResearchReturnHandoff();

    expect(handoff.deferredGovernance).toContain('REAL_DOMAIN_REVIEW_ATTESTATIONS');
    expect(handoff.deferredGovernance).toContain('INDEPENDENT_REVIEWER_TRUST_GRANTS');
    expect(handoff.deferredGovernance).toContain('ENGINE_AUTHORITY_ADMISSION');
    expect(handoff.authorityBoundary).toEqual(
      expect.objectContaining({
        domainReviewAuthorityEstablished: false,
        trustedDomainAttestationEstablished: false,
        provenanceQualityPromotionAuthorized: false,
        lifecyclePromotionAuthorized: false,
        engineAuthorityPromotionAuthorized: false,
        previewExpansionAuthorized: false,
        officialReadingAuthorityAuthorized: false,
        productionAdmissionAuthority: false,
        production: 'HOLD',
      }),
    );
    expect(handoff.reentryRequirements.sourceCompletionOnlyAuthorizesBridgeRereview).toBe(true);
    expect(handoff.reentryRequirements.highestPermittedFutureReentryState).toBe(
      'READY_FOR_BRIDGE_REREVIEW',
    );
  });

  it('is deterministic for the same governed repository state', () => {
    const left = buildCareerAnnualResearchReturnHandoff();
    const right = buildCareerAnnualResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
