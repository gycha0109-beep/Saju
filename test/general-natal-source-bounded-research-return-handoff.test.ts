import { describe, expect, it } from 'vitest';
import { buildGeneralNatalSourceBoundedResearchReturnHandoff } from '../src/research/general-natal-source-bounded-research-return-handoff.js';

describe('General Natal source-bounded Research-return handoff', () => {
  it('turns the Bridge RETURN_TO_RESEARCH disposition into four bounded Research workstreams', () => {
    const handoff = buildGeneralNatalSourceBoundedResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.disposition).toBe('RETURN_TO_RESEARCH');
    expect(handoff.upstreamBridgeReview.rejected).toBe(false);
    expect(handoff.researchReturnRequired).toBe(true);
    expect(handoff.workstreams.map((workstream) => workstream.code)).toEqual([
      'FIXED_WITNESS_SOURCE_INTEGRITY',
      'EXACT_TRANSCRIPTION_IDENTITY',
      'SCAN_VERIFIED_DIGEST_REPRODUCTION',
      'SAMYEONG_V7_PEER_SOURCE_INTEGRITY',
    ]);
    expect(handoff.workstreams.every((workstream) => workstream.owner === 'traditional_saju_research')).toBe(true);
  });

  it('keeps governance and admission outside the Research handoff', () => {
    const handoff = buildGeneralNatalSourceBoundedResearchReturnHandoff();

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
        officialReadingAuthorityAuthorized: false,
        productionAdmissionAuthority: false,
        production: 'HOLD',
      }),
    );
  });

  it('is deterministic for the same governed repository state', () => {
    const left = buildGeneralNatalSourceBoundedResearchReturnHandoff();
    const right = buildGeneralNatalSourceBoundedResearchReturnHandoff();

    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
    expect(left.candidateBinding.reviewSubjectCount).toBe(11);
  });
});
