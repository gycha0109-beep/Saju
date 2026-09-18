import { describe, expect, it } from 'vitest';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from '../src/research/general-natal-conclusion-t8-scan-backed-source-qualification.js';

describe('General Natal conclusion T8 scan-backed source qualification', () => {
  it('records scan-backed corroboration without promoting provenance authority', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();

    expect(evidence.issue).toBe('#860');
    expect(evidence.counts.witnessCount).toBe(16);
    expect(evidence.counts.scanBackedEditionIdentityEstablishedCount).toBe(16);
    expect(evidence.counts.scanBackedPropositionCorroboratedCount).toBe(16);
    expect(evidence.counts.sameEditionScanOcrCorroboratedCount).toBe(6);
    expect(evidence.counts.crossEditionPropositionCorroboratedCount).toBe(10);
    expect(evidence.counts.exactDigitalScanPageVerifiedCount).toBe(12);
    expect(evidence.counts.boundedPropositionDirectlyObservedInScanCount).toBe(12);
    expect(evidence.counts.directScanImageComparisonCompletedCount).toBe(12);
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
    const directlyVerifiedIds = new Set([
      'W-YUANHAI-PEER-TAXONOMY',
      'W-YUANHAI-RESOURCE-TAXONOMY',
      'W-YUANHAI-OUTPUT-TAXONOMY',
      'W-YUANHAI-WEALTH-TAXONOMY',
      'W-YUANHAI-OFFICER-TAXONOMY',
      'W-YUANHAI-OUTPUT-WEALTH',
      'W-SAMYEONG-FOUR-RELATION-TAXONOMY',
      'W-SAMYEONG-OUTPUT-WEALTH',
      'W-SAMYEONG-WEALTH-OFFICER',
      'W-SAMYEONG-OFFICER-RESOURCE',
      'W-SAMYEONG-PEER-WEALTH',
      'W-SAMYEONG-WEALTH-RESOURCE',
    ]);
    const others = evidence.witnessRows.filter(
      (row) => !directlyVerifiedIds.has(row.witnessId),
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


  it('pins five Yuanhai taxonomy witnesses to the same directly inspected digital scan page', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
    const expected = new Map([
      ['W-YUANHAI-PEER-TAXONOMY', '比肩者爲刼財敗財'],
      ['W-YUANHAI-RESOURCE-TAXONOMY', '生我者爲正印偏印'],
      ['W-YUANHAI-OUTPUT-TAXONOMY', '我生者爲傷官食神'],
      ['W-YUANHAI-WEALTH-TAXONOMY', '我尅者爲偏財正財'],
      ['W-YUANHAI-OFFICER-TAXONOMY', '尅我者爲正官七殺'],
    ]);

    for (const [witnessId, boundedPropositionObserved] of expected) {
      const row = evidence.witnessRows.find((candidate) => candidate.witnessId === witnessId);
      expect(row).toBeDefined();
      expect(row?.exactDigitalScanPageVerified).toBe(true);
      expect(row?.boundedPropositionDirectlyObservedInScan).toBe(true);
      expect(row?.directScanImageComparisonCompleted).toBe(true);
      expect(row?.directInspection).toEqual({
        digitalScanPage: 8,
        sectionObserved: '論五行相生相尅訣',
        boundedPropositionObserved,
      });
      expect(row?.exactPhysicalPageOrFolioVerified).toBe(false);
      expect(row?.exactWitnessHashReproducedFromScan).toBe(false);
      expect(row?.exactTranscriptionIdentityEstablished).toBe(false);
      expect(row?.fullScanQualificationEstablished).toBe(false);
      expect(row?.productionProvenancePromotionAuthorized).toBe(false);
    }

    expect(
      evidence.witnessRows.filter((row) => row.exactDigitalScanPageVerified),
    ).toHaveLength(12);
    expect(
      evidence.witnessRows.filter((row) => !row.exactDigitalScanPageVerified),
    ).toHaveLength(4);
  });

  it('pins all six Samyeong witnesses to directly inspected 卷五 scan pages', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
    const expected = new Map([
      [
        'W-SAMYEONG-FOUR-RELATION-TAXONOMY',
        {
          digitalScanPage: 4,
          boundedPropositionObserved:
            '謂之日主屬我生我者壬癸水我生者丙丁火尅我者庚辛金我尅者戊己土',
        },
      ],
      [
        'W-SAMYEONG-OUTPUT-WEALTH',
        { digitalScanPage: 7, boundedPropositionObserved: '甲乙生丙丁為子丙丁生戊己為子' },
      ],
      [
        'W-SAMYEONG-WEALTH-OFFICER',
        { digitalScanPage: 7, boundedPropositionObserved: '丙丁生戊己為子戊己生庚辛為子' },
      ],
      [
        'W-SAMYEONG-OFFICER-RESOURCE',
        { digitalScanPage: 7, boundedPropositionObserved: '戊己生庚辛為子庚辛生壬癸為子' },
      ],
      [
        'W-SAMYEONG-PEER-WEALTH',
        { digitalScanPage: 7, boundedPropositionObserved: '財怕劫被劫則分' },
      ],
      [
        'W-SAMYEONG-WEALTH-RESOURCE',
        { digitalScanPage: 7, boundedPropositionObserved: '印怕財貪財則壞' },
      ],
    ]);

    for (const [witnessId, inspection] of expected) {
      const row = evidence.witnessRows.find((candidate) => candidate.witnessId === witnessId);
      expect(row).toBeDefined();
      expect(row?.scanVolume).toBe('CADAL06066041 / 卷五');
      expect(row?.scanSurfaceSection).toBe('論古人立印食官財名義');
      expect(row?.exactDigitalScanPageVerified).toBe(true);
      expect(row?.boundedPropositionDirectlyObservedInScan).toBe(true);
      expect(row?.directScanImageComparisonCompleted).toBe(true);
      expect(row?.directInspection).toEqual({
        digitalScanPage: inspection.digitalScanPage,
        sectionObserved: '論古人立印食官財名義',
        boundedPropositionObserved: inspection.boundedPropositionObserved,
      });
      expect(row?.exactPhysicalPageOrFolioVerified).toBe(false);
      expect(row?.exactWitnessHashReproducedFromScan).toBe(false);
      expect(row?.exactTranscriptionIdentityEstablished).toBe(false);
      expect(row?.fullScanQualificationEstablished).toBe(false);
      expect(row?.productionProvenancePromotionAuthorized).toBe(false);
    }
  });

  it('keeps the four current 四言獨步 Yuanhai witnesses unverified until an exact direct scan page is established', () => {
    const evidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
    const remainingIds = new Set([
      'W-YUANHAI-WEALTH-OFFICER',
      'W-YUANHAI-OFFICER-RESOURCE',
      'W-YUANHAI-PEER-WEALTH',
      'W-YUANHAI-WEALTH-RESOURCE',
    ]);
    const remaining = evidence.witnessRows.filter((row) => remainingIds.has(row.witnessId));

    expect(remaining).toHaveLength(4);
    expect(
      remaining.every(
        (row) =>
          row.originalSection === '四言獨步' &&
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
