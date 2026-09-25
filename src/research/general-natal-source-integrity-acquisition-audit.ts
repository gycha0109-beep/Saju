import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const GENERAL_NATAL_SOURCE_INTEGRITY_ACQUISITION_AUDIT_VERSION =
  'myeonghwa-general-natal-source-integrity-acquisition-audit-v2' as const;

const ACQUISITION_SURFACES = Object.freeze([
  Object.freeze({
    surfaceId: 'SURFACE-YUANHAI-NTL-9900014380-V2',
    work: '評註淵海子平',
    locator: 'NTL-9900014380 / v.2',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/NTL-9900014380_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_v.2.pdf',
    surfaceType: 'DIRECT_SCAN' as const,
    rawPassageStoredInRepository: false as const,
  }),
  Object.freeze({
    surfaceId: 'SURFACE-YUANHAI-NLC-892411999032112149610-V4',
    work: '新刊合併官板音義評注淵海子平',
    locator: 'NGJ892411999032112149610 / 卷四',
    url:
      'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqbsmkg60o4b',
    surfaceType: 'SCAN_BACKED_TRANSCRIPTION' as const,
    rawPassageStoredInRepository: false as const,
  }),
  Object.freeze({
    surfaceId: 'SURFACE-YUANHAI-NLC-149659-1634-V4-SCAN',
    work: '新刊合併官板音義評注淵海子平',
    locator: 'NLC892-411999032112-149659 / 第4冊 / 卷四',
    edition: '余氏善成堂明崇禎七年刊本' as const,
    url:
      'https://commons.wikimedia.org/wiki/File:NLC892-411999032112-149659_%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E6%B3%A8%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E7%AC%AC4%E5%86%8A.pdf',
    surfaceType: 'DIRECT_SCAN' as const,
    pageCount: 29 as const,
    fileSha1: '583df5b7242162f37c73c17204a7384531ff0c89' as const,
    rawPassageStoredInRepository: false as const,
  }),
] as const);

const SAME_EDITION_SCAN_BACKED_TRANSCRIPTION_CHECK = Object.freeze({
  scanSurfaceId: 'SURFACE-YUANHAI-NLC-149659-1634-V4-SCAN',
  transcriptionSurfaceId: 'SURFACE-YUANHAI-NLC-892411999032112149610-V4',
  sameWorkAndVolumeEstablished: true as const,
  sectionLocated: '四言獨步' as const,
  sectionLocatedOnTranscriptionSurface: true as const,
  frozenExactWitnessSequenceLocatedOnTranscriptionSurface: false as const,
  exactTargetFindings: Object.freeze([
    Object.freeze({
      witnessId: 'W-YUANHAI-WEALTH-OFFICER',
      frozenTextDigest:
        'ccad6618c1f77bf3dd189f42916ef95f890501e54ca8acfbd76766c5e00074c0',
      exactStringLocatedInSameVolumeOutsideFrozenSection: true as const,
      exactStringLocatedInFrozenSection: false as const,
    }),
    Object.freeze({
      witnessId: 'W-YUANHAI-OFFICER-RESOURCE',
      frozenTextDigest:
        'b8daef48b60867bf0cd12c1bed3a9f5fce8a73735c010168cbe54a8c4baf2246',
      exactStringLocatedInSameVolumeOutsideFrozenSection: false as const,
      exactStringLocatedInFrozenSection: false as const,
      observedVariantDigest:
        '124cf958fc5397e71d51919d0255e870fb194501e246993e2ddb14e8880ef415',
      observedVariantUsesShaInsteadOfSha: true as const,
    }),
    Object.freeze({
      witnessId: 'W-YUANHAI-PEER-WEALTH',
      frozenTextDigest:
        'ee280b46fec7067eaf0c75a6be77282ecb184f43db1242e3e0731295ac8249ac',
      exactStringLocatedInSameVolumeOutsideFrozenSection: false as const,
      exactStringLocatedInFrozenSection: false as const,
    }),
    Object.freeze({
      witnessId: 'W-YUANHAI-WEALTH-RESOURCE',
      frozenTextDigest:
        'c9e92db9c44831a6b812cfba27e8a73dc6db5700a6a4cad50a41a3775dd88e61',
      exactStringLocatedInSameVolumeOutsideFrozenSection: false as const,
      exactStringLocatedInFrozenSection: false as const,
    }),
  ]),
  directScanGlyphComparisonCompletedForFrozenTargets: false as const,
  ocrAbsenceTreatedAsProofOfScanAbsence: false as const,
  conclusion:
    'SAME_EDITION_SCAN_ACQUIRED_TRANSCRIPTION_DIVERGENT_DIRECT_TARGET_GLYPH_CHECK_STILL_REQUIRED' as const,
});

const ADDITIONAL_CATALOG_LEADS = Object.freeze([
  Object.freeze({
    leadId: 'LEAD-YUANHAI-FUWEN-SHANGHAI-LITHOGRAPH',
    work: '淵海子平（新刊合併官板音義評註淵海子平）',
    edition: '清光緒間上海富文書局石印本',
    directDigitalScanAcquired: false as const,
  }),
  Object.freeze({
    leadId: 'LEAD-YUANHAI-JUJINTANG-1771',
    work: '音義評注淵海子平五卷',
    edition: '清乾隆三十六年（1771）聚錦堂刻本',
    directDigitalScanAcquired: false as const,
  }),
  Object.freeze({
    leadId: 'LEAD-YUANHAI-SAOYESHANFANG',
    work: '新刋合併官板音義評註淵海子平五卷',
    edition: '掃葉山房後印本',
    directDigitalScanAcquired: false as const,
  }),
] as const);

const DIVERGENT_WITNESS_ACQUISITION = Object.freeze([
  Object.freeze({
    witnessId: 'W-YUANHAI-WEALTH-OFFICER',
    expectedPassageSha256:
      'ccad6618c1f77bf3dd189f42916ef95f890501e54ca8acfbd76766c5e00074c0',
    sourceSurfaceId: 'SURFACE-YUANHAI-NTL-9900014380-V2',
    observedSection: '挈要捷馳玄妙訣',
    observedPrintedPage: '二四',
    observedBoundedSubstringSha256:
      'ccad6618c1f77bf3dd189f42916ef95f890501e54ca8acfbd76766c5e00074c0',
    exactBoundedSubstringDigestMatch: true as const,
    requiredWitnessSection: '四言獨步',
    exactSectionIdentityEstablished: false as const,
    directScanGlyphComparisonCompleted: true as const,
    acquisitionStatus: 'EXACT_STRING_SCAN_LOCATED_SECTION_MISMATCH' as const,
    fixedWitnessExactIdentityEstablished: false as const,
  }),
  Object.freeze({
    witnessId: 'W-YUANHAI-OFFICER-RESOURCE',
    expectedPassageSha256:
      'b8daef48b60867bf0cd12c1bed3a9f5fce8a73735c010168cbe54a8c4baf2246',
    sourceSurfaceId: 'SURFACE-YUANHAI-NLC-892411999032112149610-V4',
    observedSection: '淵源集說',
    observedPrintedPage: null,
    observedBoundedSubstringSha256:
      '43c308736db89d26e3c5ec14b779aeaa2d43f32eb20709b97f96b5d41ca445ae',
    exactBoundedSubstringDigestMatch: false as const,
    requiredWitnessSection: '四言獨步',
    exactSectionIdentityEstablished: false as const,
    directScanGlyphComparisonCompleted: false as const,
    acquisitionStatus: 'GLYPH_AND_SECTION_MISMATCH' as const,
    fixedWitnessExactIdentityEstablished: false as const,
  }),
  Object.freeze({
    witnessId: 'W-YUANHAI-PEER-WEALTH',
    expectedPassageSha256:
      'ee280b46fec7067eaf0c75a6be77282ecb184f43db1242e3e0731295ac8249ac',
    sourceSurfaceId: null,
    observedSection: null,
    observedPrintedPage: null,
    observedBoundedSubstringSha256: null,
    exactBoundedSubstringDigestMatch: false as const,
    requiredWitnessSection: '四言獨步',
    exactSectionIdentityEstablished: false as const,
    directScanGlyphComparisonCompleted: false as const,
    acquisitionStatus: 'NO_ALTERNATE_EXACT_SCAN_SURFACE_LOCATED' as const,
    fixedWitnessExactIdentityEstablished: false as const,
  }),
  Object.freeze({
    witnessId: 'W-YUANHAI-WEALTH-RESOURCE',
    expectedPassageSha256:
      'c9e92db9c44831a6b812cfba27e8a73dc6db5700a6a4cad50a41a3775dd88e61',
    sourceSurfaceId: 'SURFACE-YUANHAI-NTL-9900014380-V2',
    observedSection: '格局生死引用',
    observedPrintedPage: '三八',
    observedBoundedSubstringSha256:
      'c9e92db9c44831a6b812cfba27e8a73dc6db5700a6a4cad50a41a3775dd88e61',
    exactBoundedSubstringDigestMatch: true as const,
    requiredWitnessSection: '四言獨步',
    exactSectionIdentityEstablished: false as const,
    directScanGlyphComparisonCompleted: true as const,
    acquisitionStatus: 'EXACT_STRING_SCAN_LOCATED_SECTION_MISMATCH' as const,
    fixedWitnessExactIdentityEstablished: false as const,
  }),
] as const);

export function buildGeneralNatalSourceIntegrityAcquisitionAudit() {
  const material = Object.freeze({
    version: GENERAL_NATAL_SOURCE_INTEGRITY_ACQUISITION_AUDIT_VERSION,
    issue: '#1518' as const,
    upstreamBridgeIssue: '#1482' as const,
    searchBoundary: Object.freeze({
      targetWitnessCount: 4,
      frozenWitnessDefinitionsMutated: false as const,
      normalizationApplied: false as const,
      propositionEquivalenceAcceptedAsExactIdentity: false as const,
      ocrAbsenceAcceptedAsDirectScanAbsence: false as const,
      rawPassageStoredInRepository: false as const,
    }),
    surfaces: ACQUISITION_SURFACES,
    sameEditionScanBackedTranscriptionCheck: SAME_EDITION_SCAN_BACKED_TRANSCRIPTION_CHECK,
    additionalCatalogLeads: ADDITIONAL_CATALOG_LEADS,
    witnessRows: DIVERGENT_WITNESS_ACQUISITION,
    counts: Object.freeze({
      targetWitnessCount: DIVERGENT_WITNESS_ACQUISITION.length,
      acquiredDirectScanSurfaceCount: ACQUISITION_SURFACES.filter(
        (surface) => surface.surfaceType === 'DIRECT_SCAN',
      ).length,
      catalogLeadCount: ADDITIONAL_CATALOG_LEADS.length,
      exactStringScanLocatedCount: DIVERGENT_WITNESS_ACQUISITION.filter(
        (row) => row.exactBoundedSubstringDigestMatch,
      ).length,
      exactSameSectionIdentityEstablishedCount: DIVERGENT_WITNESS_ACQUISITION.filter(
        (row) => row.fixedWitnessExactIdentityEstablished,
      ).length,
      unresolvedExternalSurfaceCount: DIVERGENT_WITNESS_ACQUISITION.filter(
        (row) => !row.fixedWitnessExactIdentityEstablished,
      ).length,
    }),
    outcome: 'BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION' as const,
    witnessReregistrationReview: Object.freeze({
      requiredNow: false as const,
      candidateIfNoExactSameSectionSurfaceCanBeLocated: true as const,
      reason:
        'A same-work 1634 volume-four scan is now acquired, but its scan-backed transcription is textually divergent and the four frozen target glyphs have not yet been directly established on that scan. Additional cataloged editions remain acquisition leads.' as const,
    }),
    authorityBoundary: Object.freeze({
      domainReviewAuthorityEstablished: false as const,
      trustedDomainAttestationEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    ...material,
    auditHash: deterministicContentHash(material),
  });
}
