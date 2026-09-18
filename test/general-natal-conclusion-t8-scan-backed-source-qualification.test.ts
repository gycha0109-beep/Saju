import { describe, expect, it } from 'vitest';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from '../src/research/general-natal-conclusion-t8-scan-backed-source-qualification.js';

describe('General Natal conclusion T8 scan-backed source qualification', () => {
  it('records scan-backed corroboration without promoting provenance authority', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();

    expect(evidence.issue).toBe('#839');
    expect(evidence.counts.witnessCount).toBe(16);
    expect(evidence.counts.scanBackedEditionIdentityEstablishedCount).toBe(16);
    expect(evidence.counts.scanBackedPropositionCorroboratedCount).toBe(16);
    expect(evidence.counts.sameEditionScanOcrCorroboratedCount).toBe(6);
    expect(evidence.counts.crossEditionPropositionCorroboratedCount).toBe(10);
    expect(evidence.counts.exactDigitalScanPageVerifiedCount).toBe(1);
    expect(evidence.counts.boundedPropositionDirectlyObservedInScanCount).toBe(1);
    expect(evidence.counts.directScanImageComparisonCompletedCount).toBe(1);
    expect(evidence.counts.exactPhysicalPageOrFolioVerifiedCount).toBe(0);
    expect(evidence.counts.exactWitnessHashReproducedFromScanCount).toBe(0);
    expect(evidence.counts.fullScanQualificationEstablishedCount).toBe(0);
    expect(evidence.verdict.scanBackedEditionCorroborationEstablished).toBe(true);
    expect(evidence.verdict.allWitnessesHaveScanBackedPropositionCorroboration).toBe(true);
    expect(evidence.verdict.exactPhysicalPageOrFolioAuthorityEstablished).toBe(false);
    expect(evidence.verdict.exactWitnessHashReproductionAuthorityEstablished).toBe(false);
    expect(evidence.verdict.sourceIntegrityQualificationEstablished).toBe(false);
    expect(evidence.verdict.productionEligibleProvenanceEstablished).toBe(false);
    expect(evidence.verdict.provenanceQualityPromotionAuthorized).toBe(false);
    expect(evidence.verdict.productionAdmissionAuthority).toBe(false);
    expect(evidence.verdict.productionState).toBe('HOLD');
    expect(evidence.witnessRows.every((row) => !row.exactTranscriptionIdentityEstablished)).toBe(true);
  });

  it('pins the Yuanhai output-to-wealth digital scan page without claiming physical folio or transcription identity', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
    const target = evidence.witnessRows.find(
      (row) => row.witnessId === 'W-YUANHAI-OUTPUT-WEALTH',
    );
    const others = evidence.witnessRows.filter(
      (row) => row.witnessId !== 'W-YUANHAI-OUTPUT-WEALTH',
    );

    expect(target).toBeDefined();
    expect(target?.exactDigitalScanPageVerified).toBe(true);
    expect(target?.boundedPropositionDirectlyObservedInScan).toBe(true);
    expect(target?.directScanImageComparisonCompleted).toBe(true);
    expect(target?.directInspection).toEqual({
      digitalScanPage: 8,
      sectionObserved: '論食神',
      boundedPropositionObserved: '食神者生我財神之謂也',
    });
    expect(target?.exactPhysicalPageOrFolioVerified).toBe(false);
    expect(target?.exactWitnessHashReproducedFromScan).toBe(false);
    expect(target?.exactTranscriptionIdentityEstablished).toBe(false);
    expect(target?.fullScanQualificationEstablished).toBe(false);
    expect(target?.productionProvenancePromotionAuthorized).toBe(false);
    expect(
      others.every(
        (row) =>
          !row.exactDigitalScanPageVerified &&
          !row.boundedPropositionDirectlyObservedInScan &&
          !row.directScanImageComparisonCompleted,
      ),
    ).toBe(true);
  });

  it('keeps same-edition OCR corroboration separate from cross-edition Yuanhai corroboration', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
    const samyeong = evidence.witnessRows.filter(
      (row) => row.corroborationLevel === 'SAME_EDITION_SCAN_OCR_CORROBORATED',
    );
    const yuanhai = evidence.witnessRows.filter(
      (row) => row.corroborationLevel === 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    );

    expect(samyeong).toHaveLength(6);
    expect(yuanhai).toHaveLength(10);
    expect(samyeong.every((row) => row.scanAuthorityId === 'SCAN-SAMYEONG-SIKU-CADAL06066041')).toBe(true);
    expect(yuanhai.every((row) => row.scanAuthorityId === 'SCAN-YUANHAI-MING-WANLI-NLC')).toBe(true);
    expect(evidence.witnessRows.every((row) => !row.fullScanQualificationEstablished)).toBe(true);
    expect(evidence.witnessRows.every((row) => !row.productionProvenancePromotionAuthorized)).toBe(true);
  });
});
