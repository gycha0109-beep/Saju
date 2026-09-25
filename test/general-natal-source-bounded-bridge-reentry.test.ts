import { describe, expect, it } from 'vitest';
import {
  assessGeneralNatalSourceBoundedBridgeReentry,
  buildCurrentGeneralNatalBridgeReentryState,
  buildCurrentGeneralNatalSourceBoundedBridgeReentryReadiness,
} from '../src/research/general-natal-source-bounded-bridge-reentry.js';
import { buildGeneralNatalSourceBoundedResearchReturnHandoff } from '../src/research/general-natal-source-bounded-research-return-handoff.js';

describe('General Natal source-bounded Research return and Bridge re-entry', () => {
  it('creates a content-addressed Research handoff bound to the exact current 11 review subjects', () => {
    const left = buildGeneralNatalSourceBoundedResearchReturnHandoff();
    const right = buildGeneralNatalSourceBoundedResearchReturnHandoff();

    expect(left.disposition).toBe('RETURN_TO_RESEARCH');
    expect(left.candidateRejected).toBe(false);
    expect(left.candidateBinding.reviewSubjectCount).toBe(11);
    expect(left.candidateBinding.subjects).toHaveLength(11);
    expect(left.handoffId).toBe(right.handoffId);
    expect(left.handoffId).toMatch(/^[a-f0-9]{64}$/);
    expect(left.researchWorkItems.some((item) => item.status === 'BLOCKED')).toBe(true);
    expect(left.authorityBoundary.researchMayAuthorizeProduction).toBe(false);
  });

  it('keeps the current candidate in RETURN_TO_RESEARCH while source integrity remains incomplete', () => {
    const readiness = buildCurrentGeneralNatalSourceBoundedBridgeReentryReadiness();

    expect(readiness.handoffIntegrityValid).toBe(true);
    expect(readiness.candidateBindingFresh).toBe(true);
    expect(readiness.sourceIntegrityReady).toBe(false);
    expect(readiness.researchReturnRequired).toBe(true);
    expect(readiness.bridgeReentryReady).toBe(false);
    expect(readiness.nextDisposition).toBe('RETURN_TO_RESEARCH');
    expect(readiness.remainingResearchBlockers).toContain(
      'FIXED_WITNESS_SOURCE_INTEGRITY_NOT_ESTABLISHED',
    );
    expect(readiness.remainingResearchBlockers).toContain(
      'SAMYEONG_V7_PEER_SOURCE_INTEGRITY_NOT_ESTABLISHED',
    );
  });

  it('fails closed when the current content-addressed review surface drifts from the handed-off baseline', () => {
    const handoff = buildGeneralNatalSourceBoundedResearchReturnHandoff();
    const current = buildCurrentGeneralNatalBridgeReentryState();
    const drifted = {
      ...current,
      candidateBinding: {
        ...current.candidateBinding,
        reviewSubjectManifestHash: '0'.repeat(64),
      },
    };

    const readiness = assessGeneralNatalSourceBoundedBridgeReentry(handoff, drifted);

    expect(readiness.handoffIntegrityValid).toBe(true);
    expect(readiness.candidateBindingFresh).toBe(false);
    expect(readiness.bridgeReentryReady).toBe(false);
    expect(readiness.nextDisposition).toBe('REFRESH_BRIDGE_SUBJECT_BINDING');
  });

  it('rejects a tampered handoff instead of trusting modified baseline bindings', () => {
    const handoff = buildGeneralNatalSourceBoundedResearchReturnHandoff();
    const tampered = {
      ...handoff,
      candidateBinding: {
        ...handoff.candidateBinding,
        reviewSubjectManifestHash: 'f'.repeat(64),
      },
    };

    const readiness = assessGeneralNatalSourceBoundedBridgeReentry(tampered);

    expect(readiness.handoffIntegrityValid).toBe(false);
    expect(readiness.candidateBindingFresh).toBe(false);
    expect(readiness.bridgeReentryReady).toBe(false);
    expect(readiness.nextDisposition).toBe('INVALID_RESEARCH_RETURN_HANDOFF');
  });

  it('allows only Bridge re-review after simulated source closure and keeps later authority gates closed', () => {
    const handoff = buildGeneralNatalSourceBoundedResearchReturnHandoff();
    const current = buildCurrentGeneralNatalBridgeReentryState();
    const sourceClosed = {
      ...current,
      sourceIntegrity: {
        ...current.sourceIntegrity,
        fixedWitnessSourceIntegrityEstablished: true,
        peerTaxonomySourceIntegrityEstablished: true,
        fixedWitnessFullScanQualificationCount: current.sourceIntegrity.fixedWitnessCount,
        fixedWitnessTextualVariantDivergenceCount: 0,
      },
    };

    const readiness = assessGeneralNatalSourceBoundedBridgeReentry(handoff, sourceClosed);

    expect(readiness.sourceIntegrityReady).toBe(true);
    expect(readiness.researchReturnRequired).toBe(false);
    expect(readiness.bridgeReentryReady).toBe(true);
    expect(readiness.nextDisposition).toBe('READY_FOR_BRIDGE_REVIEW');

    expect(readiness.authorityBoundary).toEqual({
      domainReviewAuthorityEstablished: false,
      trustedDomainAttestationEstablished: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      engineAuthorityPromotionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });
});
