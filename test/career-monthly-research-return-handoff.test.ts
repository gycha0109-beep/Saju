import { describe, expect, it } from 'vitest';
import { buildCareerMonthlyResearchReturnHandoff } from '../src/research/career-monthly-research-return-handoff.js';

describe('Career Monthly Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildCareerMonthlyResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1546');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact Career Monthly segmented + reused Natal candidate surface', () => {
    const handoff = buildCareerMonthlyResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(2);
    expect(handoff.candidateBinding.segmentCount).toBe(2);
    expect(handoff.candidateBinding.monthlyActivationRuleCount).toBe(20);
    expect(handoff.candidateBinding.monthlyTensionRuleCount).toBe(8);
    expect(handoff.candidateBinding.monthlyRuleCount).toBe(28);
    expect(handoff.candidateBinding.reusedNatalRuleCount).toBe(20);
    expect(handoff.candidateBinding.registryRuleCount).toBe(48);
    expect(handoff.candidateBinding.ruleCount).toBe(48);
    expect(handoff.candidateBinding.packRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoff.candidateBinding.methodologies).toHaveLength(2);
    expect(handoff.candidateBinding.rules).toHaveLength(48);
    expect(handoff.candidateBinding.candidateSurfaceHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('preserves the bounded Natal Position authority as natal-only', () => {
    const handoff = buildCareerMonthlyResearchReturnHandoff();

    expect(handoff.existingNatalAuthorityBoundary.boundedNatalAuthorityComponentObserved).toBe(true);
    expect(handoff.existingNatalAuthorityBoundary.exactTenGod).toBe('정관');
    expect(handoff.existingNatalAuthorityBoundary.condition).toBe('day_branch');
    expect(handoff.existingNatalAuthorityBoundary.temporalScope).toBe('natal');
    expect(handoff.existingNatalAuthorityBoundary.boundedNatalComponentAuthorizesCareerMonthly).toBe(false);
    expect(handoff.existingNatalAuthorityBoundary.reusedNatalResearchExecutionAuthorizesCareerMonthly).toBe(false);
    expect(handoff.authorityBoundary.boundedNatalPositionAuthorityGeneralizedToMonthly).toBe(false);
  });

  it('returns six bounded Research workstreams instead of treating candidate semantics as truth', () => {
    const handoff = buildCareerMonthlyResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'CAREER_MONTHLY_SEGMENT_STEM_TEN_GOD_SEMANTIC_AUTHORITY',
      'CAREER_MONTHLY_SEGMENT_BRANCH_CLASH_WORK_ADJUSTMENT_AUTHORITY',
      'CAREER_MONTHLY_SEGMENT_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY',
      'CAREER_MONTHLY_SCOPE_AND_QUALIFIER_CONTRACT',
      'CAREER_NATAL_GENERAL_MONTHLY_AND_CAREER_ANNUAL_REUSE_BOUNDARY',
      'PRODUCT_NARRATIVE_POLICY_TEMPORAL_SEGMENTATION_SEMANTIC_SEPARATION',
    ]);
    expect(
      handoff.workstreams.every(
        (workstream) => workstream.owner === 'traditional_saju_research',
      ),
    ).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(true);
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
  });

  it('keeps temporal segmentation separate from Career Monthly interpretation authority', () => {
    const handoff = buildCareerMonthlyResearchReturnHandoff();

    expect(handoff.authorityBoundary.careerNatalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.generalMonthlyAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.careerAnnualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.temporalSegmentationIsCareerInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.exactJeolBoundaryIsCareerInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.productOrNarrativePolicyIsTraditionalSemanticAuthority).toBe(false);
    expect(handoff.expectedResearchDeliverables).toContain(
      'EXPLICIT_SEGMENTATION_FACT_VERSUS_CAREER_INTERPRETATION_AUTHORITY_BOUNDARY',
    );
  });

  it('keeps deterministic career-event inference, governance, and Production closed', () => {
    const handoff = buildCareerMonthlyResearchReturnHandoff();

    expect(handoff.prohibitedExtensions).toContain(
      'NO_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_PREDICTION',
    );
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
    const left = buildCareerMonthlyResearchReturnHandoff();
    const right = buildCareerMonthlyResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
