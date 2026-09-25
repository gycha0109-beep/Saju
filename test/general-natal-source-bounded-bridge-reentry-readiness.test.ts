import { describe, expect, it } from 'vitest';
import {
  GENERAL_NATAL_BRIDGE_REENTRY_BASELINE,
  collectGeneralNatalBridgeReentryEvidence,
  evaluateGeneralNatalBridgeReentryReadiness,
} from '../src/research/general-natal-source-bounded-bridge-reentry-readiness.js';

function completedResearchEvidence() {
  const current = collectGeneralNatalBridgeReentryEvidence();
  const witnessCount = current.fixedWitness.witnessCount;
  return {
    ...current,
    fixedWitness: {
      ...current.fixedWitness,
      exactPhysicalPageOrFolioVerifiedCount: witnessCount,
      exactWitnessHashReproducedFromScanCount: witnessCount,
      exactTranscriptionIdentityEstablishedCount: witnessCount,
      fullScanQualificationEstablishedCount: witnessCount,
      scanDerivedDigestReproductionEstablishedCount: witnessCount,
      textualVariantDivergencePreserved: true,
    },
    peerTaxonomy: {
      exactPhysicalPageOrFolioVerified: true,
      exactWitnessHashReproducedFromScan: true,
      exactTranscriptionIdentityEstablished: true,
      fullSourceIntegrityQualificationEstablished: true,
    },
  };
}

describe('General Natal source-bounded Bridge re-entry readiness', () => {
  it('fails closed on the current repository evidence', () => {
    const result = evaluateGeneralNatalBridgeReentryReadiness(
      collectGeneralNatalBridgeReentryEvidence(),
    );

    expect(result.candidateBindingFresh).toBe(true);
    expect(result.sourceIntegrity.ready).toBe(false);
    expect(result.researchReturnRequired).toBe(true);
    expect(result.bridgeReentryReady).toBe(false);
    expect(result.nextDisposition).toBe('RETURN_TO_RESEARCH');
    expect(result.remainingResearchBlockers).toEqual([
      'FIXED_WITNESS_SOURCE_INTEGRITY_INCOMPLETE',
      'SAMYEONG_V7_PEER_SOURCE_INTEGRITY_INCOMPLETE',
    ]);
  });

  it('requires a fresh review surface when any content-addressed candidate subject drifts', () => {
    const current = collectGeneralNatalBridgeReentryEvidence();
    const drifted = {
      ...current,
      candidateSurface: {
        ...current.candidateSurface,
        rules: current.candidateSurface.rules.map((ref, index) =>
          index === 0 ? { ...ref, contentHash: '0'.repeat(64) } : ref,
        ),
      },
    };

    const result = evaluateGeneralNatalBridgeReentryReadiness(drifted);

    expect(result.candidateBindingFresh).toBe(false);
    expect(result.bridgeReentryReady).toBe(false);
    expect(result.nextDisposition).toBe('FRESH_REVIEW_SURFACE_REQUIRED');
  });

  it('does not re-enter Bridge when only one Research source-integrity stream is complete', () => {
    const completed = completedResearchEvidence();
    const partial = {
      ...completed,
      peerTaxonomy: {
        ...completed.peerTaxonomy,
        exactWitnessHashReproducedFromScan: false,
        fullSourceIntegrityQualificationEstablished: false,
      },
    };

    const result = evaluateGeneralNatalBridgeReentryReadiness(partial);

    expect(result.sourceIntegrity.fixedWitnessReady).toBe(true);
    expect(result.sourceIntegrity.peerTaxonomyReady).toBe(false);
    expect(result.nextDisposition).toBe('RETURN_TO_RESEARCH');
  });

  it('allows only Bridge re-review after all Research source-integrity work is complete', () => {
    const result = evaluateGeneralNatalBridgeReentryReadiness(completedResearchEvidence());

    expect(result.candidateBindingFresh).toBe(true);
    expect(result.sourceIntegrity.ready).toBe(true);
    expect(result.researchReturnRequired).toBe(false);
    expect(result.bridgeReentryReady).toBe(true);
    expect(result.nextDisposition).toBe('READY_FOR_BRIDGE_REREVIEW');
    expect(result.remainingResearchBlockers).toEqual([]);
    expect(result.authorityBoundary).toEqual(
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
  });

  it('locks the #1449 candidate review surface and stays deterministic', () => {
    const evidence = collectGeneralNatalBridgeReentryEvidence();
    const left = evaluateGeneralNatalBridgeReentryReadiness(evidence);
    const right = evaluateGeneralNatalBridgeReentryReadiness(evidence);

    expect(GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.reviewSubjectCount).toBe(11);
    expect(left.observedCandidateSurfaceHash).toBe(
      GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
    );
    expect(left.readinessHash).toBe(right.readinessHash);
    expect(left.readinessHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
