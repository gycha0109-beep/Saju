import { describe, expect, it } from 'vitest';
import { buildGeneralMonthlyResearchReturnHandoff } from '../src/research/general-monthly-research-return-handoff.js';

describe('General Monthly Research-return handoff', () => {
  it('operationalizes the upstream RETURN_TO_RESEARCH disposition without rejecting the candidate', () => {
    const handoff = buildGeneralMonthlyResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.issue).toBe('#1531');
    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
  });

  it('binds the exact current General Monthly segmented candidate surface', () => {
    const handoff = buildGeneralMonthlyResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.1.0-research');
    expect(handoff.candidateBinding.methodologyCount).toBe(1);
    expect(handoff.candidateBinding.segmentCount).toBe(2);
    expect(handoff.candidateBinding.activationRuleCount).toBe(20);
    expect(handoff.candidateBinding.tensionRuleCount).toBe(8);
    expect(handoff.candidateBinding.ruleCount).toBe(28);
    expect(handoff.candidateBinding.packRef.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoff.candidateBinding.methodologies).toHaveLength(1);
    expect(handoff.candidateBinding.rules).toHaveLength(28);
    expect(handoff.candidateBinding.candidateSurfaceHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('returns five bounded Research workstreams instead of treating current Monthly semantics as truth', () => {
    const handoff = buildGeneralMonthlyResearchReturnHandoff();

    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'MONTHLY_SEGMENT_STEM_TEN_GOD_SEMANTIC_AUTHORITY',
      'MONTHLY_SEGMENT_BRANCH_CLASH_SEMANTIC_AUTHORITY',
      'MONTHLY_SEGMENT_EMPHASIS_AUTHORITY',
      'MONTHLY_SCOPE_AND_QUALIFIER_CONTRACT',
      'PRODUCT_POLICY_TEMPORAL_SEGMENTATION_SEMANTIC_SEPARATION',
    ]);
    expect(
      handoff.workstreams.every(
        (workstream) => workstream.owner === 'traditional_saju_research',
      ),
    ).toBe(true);
    expect(handoff.workstreams.every((workstream) => workstream.currentReady === false)).toBe(
      true,
    );
    expect(handoff.reentryRequirements.researchMayChangeCurrentCandidateSemantics).toBe(true);
    expect(handoff.prohibitedExtensions).toContain(
      'NO_CURRENT_CANDIDATE_SEMANTICS_TREATED_AS_RESEARCH_TARGET_TRUTH',
    );
  });

  it('keeps segmentation precision separate from Monthly interpretation authority', () => {
    const handoff = buildGeneralMonthlyResearchReturnHandoff();

    expect(handoff.authorityBoundary.natalAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.annualAuthorityInheritedAutomatically).toBe(false);
    expect(handoff.authorityBoundary.temporalSegmentationIsInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.exactJeolBoundaryIsInterpretationAuthority).toBe(false);
    expect(handoff.authorityBoundary.internalProductPolicyIsTraditionalSemanticAuthority).toBe(
      false,
    );
    expect(handoff.expectedResearchDeliverables).toContain(
      'EXPLICIT_SEGMENTATION_FACT_VERSUS_INTERPRETATION_AUTHORITY_BOUNDARY',
    );
  });

  it('keeps governance, Engine, Official Reading, and Production fail closed', () => {
    const handoff = buildGeneralMonthlyResearchReturnHandoff();

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
    const left = buildGeneralMonthlyResearchReturnHandoff();
    const right = buildGeneralMonthlyResearchReturnHandoff();

    expect(left.candidateBinding.candidateSurfaceHash).toBe(
      right.candidateBinding.candidateSurfaceHash,
    );
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
