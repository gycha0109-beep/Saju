import { describe, expect, it } from 'vitest';
import { buildGeneralAnnualSourceQualifiedEvidence } from '../src/research/general-annual-source-qualified-evidence.js';

describe('SA-7D-A General Annual source-qualified evidence', () => {
  it('binds a reproducible primary scan object and exact printed-page locator without overstating visual verification', () => {
    const evidence = buildGeneralAnnualSourceQualifiedEvidence();
    const primary = evidence.sources.find((source) => source.sourceId === 'SRC-SMT-NLC-1926-V2-TAISUI');

    expect(primary).toBeDefined();
    expect(primary).toMatchObject({
      kind: 'primary_scan',
      mediaSha1: '0585bf97a47dedbcadf78e657a896bfdd20c0550',
      mediaPages: 455,
      locator: '卷二，印刷頁四二（42），「論太歲」首段',
      verification: {
        directObjectMetadataVerified: true,
        directPageBoundTextVerified: true,
        manualTargetPageImageVerificationComplete: false,
      },
    });
  });

  it('supports only annual-stem to Day-Master Ten-God identity, not the current modern theme copy', () => {
    const evidence = buildGeneralAnnualSourceQualifiedEvidence();

    expect(evidence.propositions.annualStemDayMasterTenGodIdentity.support).toBe(
      'PRIMARY_SUPPORTED',
    );
    expect(evidence.propositions.annualStemDayMasterTenGodIdentity.meaningStrength).toBe(
      'identity_only',
    );
    expect(evidence.propositions.currentModernAnnualThemeSemantics.support).toBe(
      'INSUFFICIENT',
    );
    expect(evidence.currentCandidateDisposition.themeDispositions).toHaveLength(10);
    expect(
      evidence.currentCandidateDisposition.themeDispositions.every(
        (item) => item.disposition === 'REPLACE',
      ),
    ).toBe(true);
  });

  it('separates resolved Six-Clash relation fact from annual tension and event semantics', () => {
    const evidence = buildGeneralAnnualSourceQualifiedEvidence();

    expect(evidence.propositions.annualToNatalSixClashRelationFact.support).toBe(
      'MULTI_SOURCE_SUPPORTED',
    );
    expect(evidence.propositions.genericAnnualClashTensionNarrative.support).toBe(
      'CROSS_REFERENCE_ONLY',
    );
    expect(evidence.currentCandidateDisposition.clashDispositions).toHaveLength(4);
    expect(
      evidence.currentCandidateDisposition.clashDispositions.every(
        (item) => item.disposition === 'REPLACE',
      ),
    ).toBe(true);
    expect(
      evidence.propositions.annualToNatalSixClashRelationFact.nonImplications,
    ).toEqual(
      expect.arrayContaining([
        'NO_ACCIDENT_PREDICTION',
        'NO_ILLNESS_PREDICTION',
        'NO_SEPARATION_PREDICTION',
        'NO_FINANCIAL_LOSS_PREDICTION',
      ]),
    );
  });

  it('keeps Natal, Annual, and Monthly authority scopes separate and keeps product authority closed', () => {
    const evidence = buildGeneralAnnualSourceQualifiedEvidence();

    expect(evidence.annualScopeContract).toEqual(
      expect.objectContaining({
        natalAuthorityInheritedAutomatically: false,
        monthlyAuthorityAuthorized: false,
        annualScopeMayBeExtendedToMonthlyAutomatically: false,
        temporalFactIsInterpretationAuthority: false,
        productPolicyIsTraditionalSemanticAuthority: false,
      }),
    );
    expect(evidence.prohibitedExtensions).toEqual(
      expect.arrayContaining([
        'NO_NATAL_TO_ANNUAL_WHOLESALE_INHERITANCE',
        'NO_ANNUAL_TO_MONTHLY_EXPANSION',
        'NO_ENGINE_PREVIEW_OFFICIAL_OR_PRODUCTION_PROMOTION',
      ]),
    );
  });

  it('does not declare Research complete until the exact target scan page is manually image-verified', () => {
    const evidence = buildGeneralAnnualSourceQualifiedEvidence();

    expect(evidence.completion).toEqual(
      expect.objectContaining({
        researchEvidenceArtifactEstablished: true,
        semanticDispositionEstablished: true,
        primaryScanObjectBound: true,
        primaryScanChecksumBound: true,
        primaryScanPrintedPageBound: true,
        manualTargetPageImageVerificationComplete: false,
        researchEvidenceComplete: false,
        bridgeReentryReady: false,
        authorityCeiling: 'READY_FOR_BRIDGE_REREVIEW',
      }),
    );
  });

  it('is deterministic for the same governed research material', () => {
    const left = buildGeneralAnnualSourceQualifiedEvidence();
    const right = buildGeneralAnnualSourceQualifiedEvidence();

    expect(left.evidenceHash).toBe(right.evidenceHash);
    expect(left.evidenceHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
