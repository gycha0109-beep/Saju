import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8PassageWitnessEvidence } from './general-natal-conclusion-t8-passage-witness-evidence.js';

export const GENERAL_NATAL_CONCLUSION_T8_SCAN_BACKED_SOURCE_QUALIFICATION_VERSION =
  'myeonghwa-general-natal-conclusion-t8-scan-backed-source-qualification-v3' as const;

const SOURCE_AUTHORITIES = Object.freeze([
  {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    sourceId: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    title: '三命通會·卷五',
    edition: '欽定四庫全書本',
    holdingInstitution: 'Zhejiang University Library',
    digitization: 'CADAL 06066041',
    scanUrl:
      'https://commons.wikimedia.org/wiki/File:CADAL06066041_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%C2%B7%E5%8D%B7%E4%BA%94.djvu',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    editionIdentityEstablished: true,
    scanBackedSurfaceLocated: true,
    directScanImageComparisonCompleted: false,
  },
  {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    title: '刻京臺增補淵海子平大全',
    edition: '明萬曆刻本',
    holdingInstitution: 'National Library of China',
    digitization: 'NLC892-2642-210287/210288/210317/210318',
    scanUrl:
      'https://commons.wikimedia.org/wiki/Category:%E5%88%BB%E4%BA%AC%E8%87%BA%E5%A2%9E%E8%A3%9C%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%A4%A7%E5%85%A8',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/SDZJ0626/chapter/1lhnc3bvvh5bo',
    editionIdentityEstablished: true,
    scanBackedSurfaceLocated: true,
    directScanImageComparisonCompleted: false,
  },
] as const);

const WITNESS_SCAN_LOCATORS = Object.freeze({
  'W-YUANHAI-PEER-TAXONOMY': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210287 第1冊 / 卷之一',
    scanSurfaceSection: '論五行相生相尅訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qifvq0j2',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    directInspection: Object.freeze({
      digitalScanPage: 8,
      sectionObserved: '論五行相生相尅訣',
      boundedPropositionObserved: '比肩者爲刼財敗財',
    }),
  },
  'W-YUANHAI-RESOURCE-TAXONOMY': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210287 第1冊 / 卷之一',
    scanSurfaceSection: '論五行相生相尅訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qifvq0j2',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    directInspection: Object.freeze({
      digitalScanPage: 8,
      sectionObserved: '論五行相生相尅訣',
      boundedPropositionObserved: '生我者爲正印偏印',
    }),
  },
  'W-YUANHAI-OUTPUT-TAXONOMY': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210287 第1冊 / 卷之一',
    scanSurfaceSection: '論五行相生相尅訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qifvq0j2',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    directInspection: Object.freeze({
      digitalScanPage: 8,
      sectionObserved: '論五行相生相尅訣',
      boundedPropositionObserved: '我生者爲傷官食神',
    }),
  },
  'W-YUANHAI-WEALTH-TAXONOMY': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210287 第1冊 / 卷之一',
    scanSurfaceSection: '論五行相生相尅訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qifvq0j2',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    directInspection: Object.freeze({
      digitalScanPage: 8,
      sectionObserved: '論五行相生相尅訣',
      boundedPropositionObserved: '我尅者爲偏財正財',
    }),
  },
  'W-YUANHAI-OFFICER-TAXONOMY': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210287 第1冊 / 卷之一',
    scanSurfaceSection: '論五行相生相尅訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qifvq0j2',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    directInspection: Object.freeze({
      digitalScanPage: 8,
      sectionObserved: '論五行相生相尅訣',
      boundedPropositionObserved: '尅我者爲正官七殺',
    }),
  },
  'W-YUANHAI-OUTPUT-WEALTH': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210288 第2冊 / 卷之三',
    scanSurfaceSection: '論食神',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qpidcm57',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
    directInspection: Object.freeze({
      digitalScanPage: 8,
      sectionObserved: '論食神',
      boundedPropositionObserved: '食神者生我財神之謂也',
    }),
  },
  'W-YUANHAI-WEALTH-OFFICER': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210317 第3冊 / 卷之四',
    scanSurfaceSection: '雜論口訣 / 實法第一',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/SDZJ0626/chapter/1lctut4t92tri',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
  },
  'W-YUANHAI-OFFICER-RESOURCE': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210317 第3冊 / 卷之四',
    scanSurfaceSection: '實法第一',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/book/SDZJ0626/chapter/1lctut4t92tri',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
  },
  'W-YUANHAI-PEER-WEALTH': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210317 第3冊 / 卷之四',
    scanSurfaceSection: '雜論口訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/mid-page/7557108914061590554',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
  },
  'W-YUANHAI-WEALTH-RESOURCE': {
    authorityId: 'SCAN-YUANHAI-MING-WANLI-NLC',
    scanVolume: 'NLC892-2642-210317 第3冊 / 卷之四',
    scanSurfaceSection: '雜論口訣',
    corroboratingOcrUrl:
      'https://www.shidianguji.com/zh/mid-page/7557108914061590554',
    corroborationLevel: 'CROSS_EDITION_PROPOSITION_CORROBORATED',
  },
  'W-SAMYEONG-FOUR-RELATION-TAXONOMY': {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    scanVolume: 'CADAL06066041 / 卷五',
    scanSurfaceSection: '論古人立印食官財名義 / scan-backed OCR image unit 7',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    corroborationLevel: 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  },
  'W-SAMYEONG-OUTPUT-WEALTH': {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    scanVolume: 'CADAL06066041 / 卷五',
    scanSurfaceSection: '論古人立印食官財名義 / scan-backed OCR image unit 7',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    corroborationLevel: 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  },
  'W-SAMYEONG-WEALTH-OFFICER': {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    scanVolume: 'CADAL06066041 / 卷五',
    scanSurfaceSection: '論古人立印食官財名義 / scan-backed OCR image unit 7',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    corroborationLevel: 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  },
  'W-SAMYEONG-OFFICER-RESOURCE': {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    scanVolume: 'CADAL06066041 / 卷五',
    scanSurfaceSection: '論古人立印食官財名義 / scan-backed OCR image unit 7',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    corroborationLevel: 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  },
  'W-SAMYEONG-PEER-WEALTH': {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    scanVolume: 'CADAL06066041 / 卷五',
    scanSurfaceSection: '論古人立印食官財名義 / scan-backed OCR image unit 7',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    corroborationLevel: 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  },
  'W-SAMYEONG-WEALTH-RESOURCE': {
    authorityId: 'SCAN-SAMYEONG-SIKU-CADAL06066041',
    scanVolume: 'CADAL06066041 / 卷五',
    scanSurfaceSection: '論古人立印食官財名義 / scan-backed OCR image unit 7',
    corroboratingOcrUrl: 'https://ctext.org/wiki.pl?chapter=864968&if=en&remap=gb',
    corroborationLevel: 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  },
} as const);

export function buildGeneralNatalConclusionT8ScanBackedSourceQualification() {
  const passageEvidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();
  const authoritiesById = new Map(SOURCE_AUTHORITIES.map((row) => [row.authorityId, row]));

  const witnessRows = Object.freeze(
    passageEvidence.witnesses.map((witness) => {
      const locator = WITNESS_SCAN_LOCATORS[
        witness.witnessId as keyof typeof WITNESS_SCAN_LOCATORS
      ];
      if (locator === undefined) throw new Error(`Missing scan locator for ${witness.witnessId}`);
      const authority = authoritiesById.get(locator.authorityId);
      if (authority === undefined) throw new Error(`Missing scan authority ${locator.authorityId}`);
      if (authority.sourceId !== witness.sourceId) {
        throw new Error(`Scan authority source mismatch for ${witness.witnessId}`);
      }
      const directInspection =
        'directInspection' in locator ? locator.directInspection : undefined;

      return Object.freeze({
        witnessId: witness.witnessId,
        sourceId: witness.sourceId,
        originalPermanentRevisionUrl: witness.permanentRevisionUrl,
        originalSection: witness.section,
        originalPassageSha256: witness.passageSha256,
        proposition: witness.proposition,
        priorSourceQualification: witness.sourceQualification,
        scanAuthorityId: authority.authorityId,
        scanEdition: authority.edition,
        scanHoldingInstitution: authority.holdingInstitution,
        scanDigitization: authority.digitization,
        scanUrl: authority.scanUrl,
        scanVolume: locator.scanVolume,
        scanSurfaceSection: locator.scanSurfaceSection,
        corroboratingOcrUrl: locator.corroboratingOcrUrl,
        corroborationLevel: locator.corroborationLevel,
        ...(directInspection === undefined ? {} : { directInspection }),
        scanBackedEditionIdentityEstablished: true as const,
        scanBackedPropositionCorroborated: true as const,
        exactDigitalScanPageVerified: directInspection !== undefined,
        boundedPropositionDirectlyObservedInScan: directInspection !== undefined,
        exactPhysicalPageOrFolioVerified: false as const,
        directScanImageComparisonCompleted: directInspection !== undefined,
        exactWitnessHashReproducedFromScan: false as const,
        exactTranscriptionIdentityEstablished: false as const,
        fullScanQualificationEstablished: false as const,
        productionProvenancePromotionAuthorized: false as const,
      });
    }),
  );

  const sameEditionRows = witnessRows.filter(
    (row) => row.corroborationLevel === 'SAME_EDITION_SCAN_OCR_CORROBORATED',
  );
  const crossEditionRows = witnessRows.filter(
    (row) => row.corroborationLevel === 'CROSS_EDITION_PROPOSITION_CORROBORATED',
  );

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_SCAN_BACKED_SOURCE_QUALIFICATION_VERSION,
    issue: '#844' as const,
    auditBaseSha: 'd07e8d6a52ed87c732af919956e68cf4738e3e4f' as const,
    status:
      'SCAN_BACKED_EDITION_CORROBORATION_ESTABLISHED_PARTIAL_DIRECT_SCAN_VERIFICATION' as const,
    upstreamPassageEvidenceId: passageEvidence.evidenceId,
    sourceAuthorities: SOURCE_AUTHORITIES,
    witnessRows,
    counts: {
      witnessCount: witnessRows.length,
      scanBackedEditionIdentityEstablishedCount: witnessRows.filter(
        (row) => row.scanBackedEditionIdentityEstablished,
      ).length,
      scanBackedPropositionCorroboratedCount: witnessRows.filter(
        (row) => row.scanBackedPropositionCorroborated,
      ).length,
      sameEditionScanOcrCorroboratedCount: sameEditionRows.length,
      crossEditionPropositionCorroboratedCount: crossEditionRows.length,
      exactDigitalScanPageVerifiedCount: witnessRows.filter(
        (row) => row.exactDigitalScanPageVerified,
      ).length,
      boundedPropositionDirectlyObservedInScanCount: witnessRows.filter(
        (row) => row.boundedPropositionDirectlyObservedInScan,
      ).length,
      directScanImageComparisonCompletedCount: witnessRows.filter(
        (row) => row.directScanImageComparisonCompleted,
      ).length,
      exactPhysicalPageOrFolioVerifiedCount: witnessRows.filter(
        (row) => row.exactPhysicalPageOrFolioVerified,
      ).length,
      exactWitnessHashReproducedFromScanCount: witnessRows.filter(
        (row) => row.exactWitnessHashReproducedFromScan,
      ).length,
      fullScanQualificationEstablishedCount: witnessRows.filter(
        (row) => row.fullScanQualificationEstablished,
      ).length,
    },
    verdict: {
      scanBackedEditionCorroborationEstablished: witnessRows.length === passageEvidence.witnesses.length,
      allWitnessesHaveScanBackedPropositionCorroboration: witnessRows.every(
        (row) => row.scanBackedPropositionCorroborated,
      ),
      exactPhysicalPageOrFolioAuthorityEstablished: false as const,
      exactWitnessHashReproductionAuthorityEstablished: false as const,
      sourceIntegrityQualificationEstablished: false as const,
      productionEligibleProvenanceEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      productionState: 'HOLD' as const,
    },
    requiredNextEvidence: Object.freeze([
      'VERIFY_REMAINING_EXACT_DIGITAL_SCAN_PAGES_FOR_UNVERIFIED_WITNESSES',
      'DIRECTLY_COMPARE_REMAINING_SCAN_IMAGES_WITH_CORROBORATING_TRANSCRIPTIONS',
      'PRESERVE_DIGITAL_SCAN_PAGE_VS_PRINTED_PAGE_OR_FOLIO_BOUNDARY',
      'REPRODUCE_WITNESS_DIGEST_FROM_SCAN_VERIFIED_TRANSCRIPTION_SURFACE',
      'KEEP_YUANHAI_CROSS_EDITION_SUPPORT_DISTINCT_FROM_TRANSCRIPTION_IDENTITY',
      'DO_NOT_PROMOTE_PROVENANCE_QUALITY_FROM_OCR_CORROBORATION_ALONE',
    ] as const),
  };

  return Object.freeze({ evidenceId: deterministicContentHash(material), ...material });
}
