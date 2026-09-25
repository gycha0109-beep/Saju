import { describe, expect, it } from 'vitest';
import { buildGeneralAnnualResearchReturnHandoff } from '../src/research/general-annual-research-return-handoff.js';

describe('General Annual Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildGeneralAnnualResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1512');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact current General Annual candidate surface', () => {
    const handoff = buildGeneralAnnualResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(1);
    expect(handoff.candidateBinding.ruleCount).toBe(14);
    expect(handoff.candidateBinding.packRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoff.candidateBinding.methodologies).toHaveLength(1);
    expect(handoff.candidateBinding.rules).toHaveLength(14);
    expect(handoff.candidateBinding.candidateSurfaceHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('returns four bounded research workstreams instead of treating current candidate semantics as truth', () => {
    const handoff = buildGeneralAnnualResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'ANNUAL_STEM_TEN_GOD_SEMANTIC_AUTHORITY',
      'ANNUAL_BRANCH_CLASH_SEMANTIC_AUTHORITY',
      'ANNUAL_SCOPE_AND_QUALIFIER_CONTRACT',
      'PRODUCT_POLICY_SEMANTIC_SEPARATION',
    ]);
    expect(handoff.workstreams.every((workstream) => workstream.owner === 'traditional_saju_research')).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(true);
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
    expect(handoff.prohibitedExtensions).toContain(
      'NO_CURRENT_CANDIDATE_SEMANTICS_TREATED_AS_RESEARCH_TARGET_TRUTH',
    );
  });

  it('keeps temporal and product-policy surfaces separate from Annual semantic authority', () => {
    const handoff = buildGeneralAnnualResearchReturnHandoff();

    expect(handoff.authorityBoundary.natalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.annualAuthorityExtendsToMonthlyAutomatically).toBe(false);
    expect(handoff.authorityBoundary.temporalFactsAreInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.internalProductPolicyIsTraditionalSemanticAuthority).toBe(false);
    expect(handoff.expectedResearchDeliverables).toContain(
      'EXPLICIT_NATAL_REUSE_BOUNDARY_AND_MONTHLY_NON_AUTHORIZATION',
    );
  });

  it('keeps governance, Engine, Official Reading, and Production fail closed', () => {
    const handoff = buildGeneralAnnualResearchReturnHandoff();

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
    const left = buildGeneralAnnualResearchReturnHandoff();
    const right = buildGeneralAnnualResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
