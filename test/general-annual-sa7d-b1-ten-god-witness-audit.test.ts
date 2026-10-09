import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildGeneralAnnualAtomicSourceAcquisition } from '../src/research/general-annual-atomic-semantic-source-acquisition.js';
import { buildGeneralAnnualSA7DResearchReturnEvidence } from '../src/research/general-annual-sa7d-return-evidence.js';
import {
  GENERAL_ANNUAL_SA7D_B1_WITNESS_AUDIT_VERSION,
  buildGeneralAnnualSA7DB1WitnessAudit,
} from '../src/research/general-annual-sa7d-b1-ten-god-witness-audit.js';

describe('SA-7D-B1 eight unresolved Ten-God direct-witness research audit', () => {
  const audit = buildGeneralAnnualSA7DB1WitnessAudit();

  test('consumes, rather than duplicates, the previously governed research evidence', () => {
    const previous = buildGeneralAnnualSA7DResearchReturnEvidence();
    const atomic = buildGeneralAnnualAtomicSourceAcquisition();

    expect(audit.version).toBe(GENERAL_ANNUAL_SA7D_B1_WITNESS_AUDIT_VERSION);
    expect(audit.upstreamEvidence.researchReturnEvidenceId).toBe(previous.evidenceId);
    expect(audit.upstreamEvidence.sourceAcquisitionId).toBe(atomic.acquisitionId);
    expect(audit.upstreamEvidence.candidateSurfaceHash)
      .toBe(previous.provenance.candidateSurfaceHash);
    expect(audit.upstreamEvidence.inheritedDirectlyVerifiedAnnualTenGodIdentities)
      .toEqual(['편재', '편관']);
  });

  test('keeps precisely the eight unresolved pairs individually identified', () => {
    expect(audit.decisions.map((item) => [
      item.semanticKey,
      item.tenGod,
      item.candidateDayStem,
      item.candidateComparedStem,
      item.comparedStemPolarityRelativeToDay,
    ])).toEqual([
      ['ANNUAL_PEER_SELF_DIRECTION', '비견', '甲', '甲', 'same'],
      ['ANNUAL_PEER_COMPETITION_COORDINATION', '겁재', '甲', '乙', 'opposite'],
      ['ANNUAL_OUTPUT_STEADY_PRODUCTION', '식신', '甲', '丙', 'same'],
      ['ANNUAL_OUTPUT_EXPRESSION_CHANGE', '상관', '甲', '丁', 'opposite'],
      ['ANNUAL_WEALTH_STRUCTURED_RESOURCES', '정재', '甲', '己', 'opposite'],
      ['ANNUAL_OFFICER_ROLE_RESPONSIBILITY', '정관', '甲', '辛', 'opposite'],
      ['ANNUAL_RESOURCE_ALTERNATIVE_LEARNING', '편인', '甲', '壬', 'same'],
      ['ANNUAL_RESOURCE_SUPPORT_LEARNING', '정인', '甲', '癸', 'opposite'],
    ]);
    expect(new Set(audit.decisions.map((item) => item.semanticKey)).size).toBe(8);
    expect(audit.decisions.find((item) => item.tenGod === '정관')?.transcriptionMatch)
      .toBe('EXPLICIT_NATAL_TEN_GOD_NAME_IN_TRANSCRIPTION');
    expect(audit.decisions.find((item) => item.tenGod === '정재')?.transcriptionMatch)
      .toBe('NATAL_SPOUSE_ANALOGY_ONLY');
  });

  test('does not misrepresent a transcription as a directly read historical PDF', () => {
    expect(audit.newSourceCandidate.workVolumeIdentityFromCatalog).toBe('卷之五上');
    expect(audit.newSourceCandidate.catalogPageCount).toBe(45);
    expect(audit.newSourceCandidate.actualOriginalPdfDownloadedAndHashedForThisAudit).toBe(false);
    expect(audit.newSourceCandidate.exactSectionPdfPageVerified).toBe(false);
    expect(audit.newSourceCandidate.exactSectionPdfPageOneBased).toBe(null);
    expect(audit.newSourceCandidate.sourcePassageVisuallyVerifiedInThisScan).toBe(false);
    expect(audit.newSourceCandidate.directHistoricalPrintIdentityGranted).toBe(false);

    for (const item of audit.decisions) {
      expect(item.exactAnnualStemPairSourceStatement).toBe(null);
      expect(item.primaryScanPageVerified).toBe(false);
      expect(item.annualSpecificDirectWitnessVerified).toBe(false);
      expect(item.contextualReferenceGrade).toBe('TRANSCRIPTION_LOCATOR_ONLY');
      expect(item.sourceSupportGrade).toBe('INSUFFICIENT');
      expect(item.semanticDisposition).toBe('REQUIRES_SEPARATE_DIRECT_SUPPORT');
      expect(item.transcriptionLocatorClause.length).toBeGreaterThan(0);
      expect(item.unresolvedEvidence).toHaveLength(5);
      expect(item.nonImplications).toContain(
        'NO_MONTHLY_BRIDGE_ENGINE_READER_OR_PRODUCTION_AUTHORITY',
      );
      expect(item.productionAuthorization).toBe(false);
    }
  });

  test('distinguishes historical research progress from annual authority and release', () => {
    expect(audit.verdict).toEqual({
      historicalVolume5CandidateLocated: true,
      exactPrimaryPagesVerifiedForEight: 0,
      directlyAnnualQualifiedAmongEight: 0,
      unresolvedAnnualIdentityCount: 8,
      existingPrimaryAnnualIdentitiesPreserved: 2,
      candidateCodeMutated: false,
      nativeToAnnualAuthorityInherited: false,
      monthlyAuthorityGranted: false,
      bridgeReentryReady: false,
      production: 'HOLD',
      nextGate: 'DIRECT_MING_VOLUME5_PAGE_VERIFICATION_AND_ANNUAL_SCOPE_REVIEW',
    });
  });

  test('uses deterministic content-addressed evidence and stable candidate input', () => {
    const again = buildGeneralAnnualSA7DB1WitnessAudit();
    const { auditId, ...material } = audit;

    expect(auditId).toBe(deterministicContentHash(material));
    expect(auditId).toBe(again.auditId);
    expect(auditId).toMatch(/^[a-f0-9]{64}$/);
  });
});
