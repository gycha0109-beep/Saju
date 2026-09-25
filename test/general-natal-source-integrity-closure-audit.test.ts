import { describe, expect, it } from 'vitest';
import { buildGeneralNatalSourceIntegrityClosureAudit } from '../src/research/general-natal-source-integrity-closure-audit.js';

describe('General Natal source-integrity closure audit', () => {
  it('routes the current fixed witness surface without fabricating closure', () => {
    const audit = buildGeneralNatalSourceIntegrityClosureAudit();

    expect(audit.candidateBindingFresh).toBe(true);
    expect(audit.fixedWitnessSummary.witnessCount).toBe(16);
    expect(audit.fixedWitnessSummary.directDigitalScanPageVerifiedCount).toBe(12);
    expect(audit.fixedWitnessSummary.textualVariantDivergenceCount).toBe(4);
    expect(audit.fixedWitnessSummary.fullSourceIntegrityEstablishedCount).toBe(0);
    expect(audit.fixedWitnessSummary.alternateExactWitnessSurfaceRequiredCount).toBe(4);
    expect(audit.researchDisposition).toBe('BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION');
  });

  it('binds the bounded acquisition result without converting section matches into identity', () => {
    const audit = buildGeneralNatalSourceIntegrityClosureAudit();

    expect(audit.acquisition.exactStringScanLocatedCount).toBe(2);
    expect(audit.acquisition.exactSameSectionIdentityEstablishedCount).toBe(0);
    expect(audit.acquisition.unresolvedExternalSurfaceCount).toBe(4);
    expect(audit.acquisition.witnessReregistrationReviewRequiredNow).toBe(false);
  });

  it('preserves the four Yuanhai fixed-witness textual divergences', () => {
    const audit = buildGeneralNatalSourceIntegrityClosureAudit();
    const divergent = audit.fixedWitnessRows.filter((row) => row.textualVariantDivergence);

    expect(divergent.map((row) => row.witnessId)).toEqual([
      'W-YUANHAI-WEALTH-OFFICER',
      'W-YUANHAI-OFFICER-RESOURCE',
      'W-YUANHAI-PEER-WEALTH',
      'W-YUANHAI-WEALTH-RESOURCE',
    ]);
    expect(
      divergent.every(
        (row) => row.closureClass === 'ALTERNATE_EXACT_WITNESS_SURFACE_REQUIRED',
      ),
    ).toBe(true);
  });

  it('keeps Samyeong v7 at direct-scan observed but source-integrity incomplete', () => {
    const audit = buildGeneralNatalSourceIntegrityClosureAudit();

    expect(audit.peerTaxonomy.digitalScanPage).toBe(174);
    expect(audit.peerTaxonomy.boundedPropositionDirectlyObservedInScan).toBe(true);
    expect(audit.peerTaxonomy.exactPhysicalPageOrFolioVerified).toBe(false);
    expect(audit.peerTaxonomy.exactWitnessHashReproducedFromScan).toBe(false);
    expect(audit.peerTaxonomy.exactTranscriptionIdentityEstablished).toBe(false);
    expect(audit.peerTaxonomy.fullSourceIntegrityEstablished).toBe(false);
  });

  it('remains fail-closed for Bridge and every downstream authority', () => {
    const audit = buildGeneralNatalSourceIntegrityClosureAudit();

    expect(audit.currentReentry.bridgeReentryReady).toBe(false);
    expect(audit.currentReentry.nextDisposition).toBe('RETURN_TO_RESEARCH');
    expect(audit.authorityBoundary).toEqual({
      domainReviewAuthorityEstablished: false,
      trustedDomainAttestationEstablished: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      engineAuthorityPromotionAuthorized: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });

  it('is deterministic', () => {
    const left = buildGeneralNatalSourceIntegrityClosureAudit();
    const right = buildGeneralNatalSourceIntegrityClosureAudit();

    expect(left.auditHash).toBe(right.auditHash);
    expect(left.auditHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
