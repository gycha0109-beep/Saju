import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualAtomicSourceAcquisition } from './general-annual-atomic-semantic-source-acquisition.js';

export const GENERAL_ANNUAL_MING_SCAN_PAGE_VERIFICATION_VERSION =
  'myeonghwa-general-annual-ming-scan-page-verification-v1' as const;

export const GENERAL_ANNUAL_MAPPED_MING_VOLUME_TWO_SCANS = Object.freeze([
  Object.freeze({
    candidateId: 'NLC892_SANMING_TONGHUI_BOOK3_VOLUME_TWO_UPPER',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      author: '萬民英',
      holder: 'National Library of China',
      fileTitle: 'NLC892-411999029701-67186 三命通會 第3冊.pdf',
      sourceClass: 'ming_wanli_print_scan',
      edition: '刻本',
      publicationPeriod: '明萬曆[1573-1620]',
      workVolumeDescription: '卷之二上',
      pageCount: 38,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67186_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC3%E5%86%8A.pdf',
    }),
    verification: Object.freeze({
      scanObjectLocated: true,
      workVolumeIdentityEstablished: true,
      exactLunTaisuiPageBound: false,
      sectionHeadingVisuallyVerified: false,
      annualStemExamplesVisuallyVerified: false,
      exactPageContentHashBound: false,
    }),
    disposition: 'VISUAL_PAGE_BINDING_REQUIRED' as const,
  }),
  Object.freeze({
    candidateId: 'NLC892_SANMING_TONGHUI_BOOK4_VOLUME_TWO_LOWER',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      author: '萬民英',
      holder: 'National Library of China',
      fileTitle: 'NLC892-411999029701-67187 三命通會 第4冊.pdf',
      sourceClass: 'ming_wanli_print_scan',
      edition: '刻本',
      publicationPeriod: '明萬曆[1573-1620]',
      workVolumeDescription: '卷之二下',
      pageCount: 55,
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67187_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC4%E5%86%8A.pdf',
    }),
    verification: Object.freeze({
      scanObjectLocated: true,
      workVolumeIdentityEstablished: true,
      exactLunTaisuiPageBound: false,
      sectionHeadingVisuallyVerified: false,
      annualStemExamplesVisuallyVerified: false,
      exactPageContentHashBound: false,
    }),
    disposition: 'VISUAL_PAGE_BINDING_REQUIRED' as const,
  }),
] as const);

export const GENERAL_ANNUAL_LUN_TAISUI_TEXTUAL_LOCATORS = Object.freeze([
  Object.freeze({
    locatorId: 'WIKISOURCE_SANMING_TONGHUI_VOLUME2_LUN_TAISUI',
    sourceClass: 'modern_public_transcription',
    locator:
      'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
    sectionHeadingPresent: true,
    annualStemExamplesPresent: true,
    scanPageWitness: false,
  }),
  Object.freeze({
    locatorId: 'NLC_1926_SANMING_TONGHUI_DIRECT_PDF_TEXT_INDEX',
    sourceClass: 'historical_scan_search_index',
    locator:
      'https://upload.wikimedia.org/wikipedia/commons/2/23/NLC416-13jh000156-94145_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf',
    sectionHeadingPresent: true,
    annualStemExamplesPresent: true,
    scanPageWitness: false,
  }),
] as const);

export function buildGeneralAnnualMingScanPageVerification() {
  const upstream = buildGeneralAnnualAtomicSourceAcquisition();

  const material = Object.freeze({
    version: GENERAL_ANNUAL_MING_SCAN_PAGE_VERIFICATION_VERSION,
    issue: '#2395' as const,
    upstream: Object.freeze({
      version: upstream.version,
      acquisitionId: upstream.acquisitionId,
      atomicStemRelationSourceQualified:
        upstream.observations.atomicStemRelationSourceQualified,
      bridgeReentryReady: upstream.observations.bridgeReentryReady,
    }),
    mappedMingVolumeTwoScans: GENERAL_ANNUAL_MAPPED_MING_VOLUME_TWO_SCANS,
    textualLocators: GENERAL_ANNUAL_LUN_TAISUI_TEXTUAL_LOCATORS,
    verificationRequirements: Object.freeze([
      'OPEN_ACTUAL_MING_SCAN_SURFACE',
      'BIND_EXACT_SCAN_OBJECT',
      'BIND_EXACT_PAGE_INDEX',
      'VISUALLY_VERIFY_LUN_TAISUI_SECTION_HEADING',
      'VISUALLY_VERIFY_GENG_YEAR_JIA_DAY_PIAN_GUAN_EXAMPLE',
      'VISUALLY_VERIFY_JIA_DAY_WU_YEAR_PIAN_CAI_EXAMPLE',
      'BIND_STABLE_PAGE_OR_FILE_CHECKSUM_WHEN_AVAILABLE',
      'CONFIRM_COMPLETE_ATOMIC_PROPOSITION_WITHIN_SINGLE_WITNESS',
    ] as const),
    observations: Object.freeze({
      mingVolumeTwoScanRouteLocated: true as const,
      explicitUpperLowerVolumeMappingEstablished: true as const,
      textualLocatorCorroborationAvailable: true as const,
      exactLunTaisuiScanPageBound: false as const,
      relevantPassageVisuallyVerified: false as const,
      singleWitnessAtomicPropositionComplete: false as const,
      atomicStemRelationSourceQualified: false as const,
      bridgeReentryReady: false as const,
    }),
    nextDisposition:
      'VISUALLY_BIND_LUN_TAISUI_IN_MAPPED_MING_VOLUME_TWO_SCAN' as const,
    authorityBoundary: Object.freeze({
      transcriptionMaySubstituteForScanWitness: false as const,
      searchIndexMaySubstituteForScanWitness: false as const,
      inferredPageNumberMayBeRecordedAsVerified: false as const,
      engineAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      annualDetailedAuthorized: false as const,
      monthlyAuthorityAuthorized: false as const,
      publicGeneralAvailabilityAuthorized: false as const,
      persistenceAuthorized: false as const,
      commerceAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    verificationId: deterministicContentHash(material),
    ...material,
  });
}
