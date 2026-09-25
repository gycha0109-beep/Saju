import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const GENERAL_NATAL_SOURCE_INTEGRITY_ACQUISITION_AUDIT_VERSION =
  'myeonghwa-general-natal-source-integrity-acquisition-audit-v4' as const;

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
    rawPassageStoredInRepository: false as const,
  }),
  Object.freeze({
    surfaceId: 'SURFACE-YUANHAI-TIANYIGE-0005007-MING-CHONGZHEN',
    work: '新刊合併官板音義評註淵海子平五卷',
    locator: 'Tianyige-330000-1705-0005007 / 善2875 / 全五卷一冊',
    edition: '明崇禎刻本' as const,
    url:
      'https://commons.wikimedia.org/wiki/File:Tianyige-330000-1705-0005007_%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E8%A8%BB%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E4%BA%94%E5%8D%B7_%E5%AE%8B%E5%BE%90%E5%8D%87%E7%B7%A8_%E6%98%8E%E6%A5%8A%E6%B7%99%E5%A2%9E%E6%A0%A1_%E6%98%8E%E5%B4%87%E7%A6%8E%E5%88%BB%E6%9C%AC.pdf',
    surfaceType: 'DIRECT_SCAN' as const,
    pageCount: 153 as const,
    catalogFileSha1: '2ec904422ced60bf241286c6b822623048bb8883' as const,
    targetVolumeCoverage: 'ALL_FIVE_VOLUMES_IN_ONE_SCAN' as const,
    targetSectionDigitalPageRange: '113..116' as const,
    directTargetGlyphComparisonCompleted: true as const,
    frozenExactWitnessCountInTargetSection: 0 as const,
    governedEvidenceRef: 'R004/#921' as const,
    rawPassageStoredInRepository: false as const,
  }),
  Object.freeze({
    surfaceId: 'SURFACE-YUANHAI-ZJSLIB-FLDB-2458-1',
    work: '新刊合併官板音義評註淵海子平五卷',
    locator: 'ZJSLib-FLDB-2458-1 / 第一冊',
    edition: '清福建余氏刻本' as const,
    url:
      'https://commons.wikimedia.org/wiki/File:ZJSLib-FLDB-2458-1_%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E8%A8%BB%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E4%BA%94%E5%8D%B7_%E7%AC%AC%E4%B8%80%E5%86%8A.pdf',
    surfaceType: 'DIRECT_SCAN' as const,
    pageCount: 138 as const,
    targetVolumeCoverage: 'NOT_YET_MAPPED' as const,
    directTargetGlyphComparisonCompleted: false as const,
    rawPassageStoredInRepository: false as const,
  }),
  Object.freeze({
    surfaceId: 'SURFACE-YUANHAI-ZJSLIB-FLDB-2458-2',
    work: '新刊合併官板音義評註淵海子平五卷',
    locator: 'ZJSLib-FLDB-2458-2 / 第二冊',
    edition: '清福建余氏刻本' as const,
    url:
      'https://commons.wikimedia.org/wiki/File:ZJSLib-FLDB-2458-2_%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E8%A8%BB%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E4%BA%94%E5%8D%B7_%E7%AC%AC%E4%BA%8C%E5%86%8A.pdf',
    surfaceType: 'DIRECT_SCAN' as const,
    pageCount: 170 as const,
    targetVolumeCoverage: 'VOLUME_FOUR_TARGET_SECTION_LOCATED' as const,
    targetSectionDigitalPageRange: '87..91' as const,
    transitionDigitalPage: 92 as const,
    directTargetGlyphComparisonCompleted: true as const,
    frozenExactWitnessCountInTargetSection: 0 as const,
    governedEvidenceRef: 'R005/#925' as const,
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
  targetSectionDigitalPageRange: '16..19' as const,
  directScanGlyphComparisonCompletedForFrozenTargets: true as const,
  frozenExactWitnessCountInTargetSection: 0 as const,
  governedEvidenceRef: 'R004/#921' as const,
  ocrAbsenceTreatedAsProofOfScanAbsence: false as const,
  conclusion:
    'DIRECT_TARGET_SECTION_INSPECTED_FROZEN_EXACT_WITNESSES_ZERO_OF_FOUR' as const,
});

const GOVERNED_DIRECT_TARGET_INSPECTION_SUMMARY = Object.freeze({
  inspectedTargetSurfaceCount: 3 as const,
  inspectedSurfaceRefs: Object.freeze([
    'Tianyi p113..116 / R004 #921',
    'NLC 1634 p16..19 / R004 #921',
    'Zhuji p87..91 / R005 #925',
  ]),
  frozenExactWitnessCountPerInspectedSurface: Object.freeze([0, 0, 0] as const),
  everyInspectedTargetSurfaceIsZeroOfFour: true as const,
  sameFamilyCorrespondenceEstablished: true as const,
  exactFrozenWitnessSectionIdentityEstablished: false as const,
  implication:
    'CURRENT_FROZEN_WITNESS_SECTION_BINDING_REQUIRES_SEPARATE_REREGISTRATION_REVIEW' as const,
});

const EXTERNAL_ACQUISITION_BACKLOG = Object.freeze([
  Object.freeze({
    researchItem: 'R006' as const,
    issue: '#933' as const,
    surface: 'NDL 掃葉山房 microform reproduction' as const,
    status: 'BLOCKED_EXTERNAL_ACQUISITION' as const,
  }),
  Object.freeze({
    researchItem: 'R007' as const,
    issue: '#1254' as const,
    surface: 'Bukkyo 掃葉山房 copy reproduction' as const,
    status: 'BLOCKED_EXTERNAL_ACQUISITION' as const,
  }),
  Object.freeze({
    researchItem: 'R008' as const,
    issue: '#1255' as const,
    surface: 'Tokyo 敬文堂/余氏 lineage reproduction' as const,
    status: 'BLOCKED_EXTERNAL_ACQUISITION' as const,
  }),
] as const);

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
    governedDirectTargetInspectionSummary: GOVERNED_DIRECT_TARGET_INSPECTION_SUMMARY,
    externalAcquisitionBacklog: EXTERNAL_ACQUISITION_BACKLOG,
    additionalCatalogLeads: ADDITIONAL_CATALOG_LEADS,
    witnessRows: DIVERGENT_WITNESS_ACQUISITION,
    counts: Object.freeze({
      targetWitnessCount: DIVERGENT_WITNESS_ACQUISITION.length,
      acquiredDirectScanSurfaceCount: ACQUISITION_SURFACES.filter(
        (surface) => surface.surfaceType === 'DIRECT_SCAN',
      ).length,
      catalogLeadCount: ADDITIONAL_CATALOG_LEADS.length,
      newlyAcquiredAlternateDirectScanCount: 3 as const,
      acquiredAlternateScanPageCount: 461 as const,
      governedDirectTargetInspectionCount: 3 as const,
      governedDirectTargetSurfaceWithAnyFrozenExactWitnessCount: 0 as const,
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
    outcome: 'BLOCKED_BY_FIXED_WITNESS_REREGISTRATION' as const,
    witnessReregistrationReview: Object.freeze({
      requiredNow: true as const,
      candidateSurfaceMutationAuthorized: false as const,
      candidateIfNoExactSameSectionSurfaceCanBeLocated: true as const,
      reason:
        'Merged R004/R005 evidence already directly inspected Tianyi, NLC 1634, and Zhuji 四言獨步 surfaces and found 0/4 frozen exact witnesses on every bounded target surface. Remaining external reproductions are separately tracked by R006-R008, so R126 should not duplicate those acquisition blockers before a reviewed witness re-registration decision.' as const,
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
