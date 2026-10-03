import {
  R169_AUTHORITY,
  R169_CATALOG_PAGE_PROVENANCE_VERSION,
  R169_INDEPENDENT_EDITION_CANDIDATE,
} from './general-natal-predicate-candidate-catalog-page-provenance.js';

export const R170_WITNESS_LINEAGE_VERSION = '0.1.0-research' as const;

export type R170CustodyInstitution =
  | 'NATIONAL_LIBRARY_OF_CHINA'
  | 'NATIONAL_TAIWAN_LIBRARY';

export type R170LineageClass =
  | 'BIBLIOGRAPHIC_MATCH_CANDIDATE'
  | 'SEPARATE_CATALOG_RECORD_CANDIDATE';

export interface R170CustodialScanRecord {
  recordId: string;
  fileId: string;
  institution: R170CustodyInstitution;
  workTitle: string;
  volumeLabel: string | null;
  editorLabel: string;
  publisherLabel: string;
  publicationDateLabel: string;
  sourceUrl: string;
  catalogRecordBound: true;
  separateCustodialScanObserved: true;
  targetCandidateSurfaceVisuallyVerified: false;
  targetPrintedPageLocated: false;
  samePhysicalCopyAsAnyOtherRecordEstablished: false;
  sameEditionAsAnyOtherRecordEstablished: false;
  independentTextualWitnessEstablished: false;
  mayCountAsIndependentCorroboration: false;
}

export const R170_CUSTODIAL_SCAN_RECORDS: readonly R170CustodialScanRecord[] =
  Object.freeze([
    Object.freeze({
      recordId: 'R170-S01-NLC-1926-V2',
      fileId: 'NLC416-13jh002326-46443',
      institution: 'NATIONAL_LIBRARY_OF_CHINA' as const,
      workTitle: '淵海子平 子平真詮',
      volumeLabel: '第2卷',
      editorLabel: '秦慎安校勘',
      publisherLabel: '文明書局[發行者]',
      publicationDateLabel: '民國十五年[1926]',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:NLC416-13jh002326-46443_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_%E7%AC%AC2%E5%8D%B7.pdf',
      catalogRecordBound: true as const,
      separateCustodialScanObserved: true as const,
      targetCandidateSurfaceVisuallyVerified: false as const,
      targetPrintedPageLocated: false as const,
      samePhysicalCopyAsAnyOtherRecordEstablished: false as const,
      sameEditionAsAnyOtherRecordEstablished: false as const,
      independentTextualWitnessEstablished: false as const,
      mayCountAsIndependentCorroboration: false as const,
    }),
    Object.freeze({
      recordId: 'R170-S02-NTL-1926-V2',
      fileId: 'NTL-9900014380',
      institution: 'NATIONAL_TAIWAN_LIBRARY' as const,
      workTitle: '淵海子平子平真詮 v.2',
      volumeLabel: 'v.2',
      editorLabel: '秦慎安 校勘',
      publisherLabel: '文明',
      publicationDateLabel: '1926',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:NTL-9900014380_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_v.2.pdf',
      catalogRecordBound: true as const,
      separateCustodialScanObserved: true as const,
      targetCandidateSurfaceVisuallyVerified: false as const,
      targetPrintedPageLocated: false as const,
      samePhysicalCopyAsAnyOtherRecordEstablished: false as const,
      sameEditionAsAnyOtherRecordEstablished: false as const,
      independentTextualWitnessEstablished: false as const,
      mayCountAsIndependentCorroboration: false as const,
    }),
    Object.freeze({
      recordId: 'R170-S03-NLC-192X-COMBINED',
      fileId: 'NLC416-15jh007754-99036',
      institution: 'NATIONAL_LIBRARY_OF_CHINA' as const,
      workTitle: '淵海子平 子平真詮',
      volumeLabel: null,
      editorLabel: '〔宋〕徐升編',
      publisherLabel: '文明書局[印行者]',
      publicationDateLabel: '[192-?]',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:NLC416-15jh007754-99036_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
      catalogRecordBound: true as const,
      separateCustodialScanObserved: true as const,
      targetCandidateSurfaceVisuallyVerified: false as const,
      targetPrintedPageLocated: false as const,
      samePhysicalCopyAsAnyOtherRecordEstablished: false as const,
      sameEditionAsAnyOtherRecordEstablished: false as const,
      independentTextualWitnessEstablished: false as const,
      mayCountAsIndependentCorroboration: false as const,
    }),
  ]);

export interface R170LineageGroup {
  groupId: string;
  lineageClass: R170LineageClass;
  recordIds: readonly string[];
  sharedPublisherFamilyObserved: true;
  metadataOverlapObserved: boolean;
  separateCustodyObserved: boolean;
  samePhysicalCopyEstablished: false;
  sameEditionEstablished: false;
  textualVariantComparisonComplete: false;
  targetSurfaceComparisonComplete: false;
  independentTextualWitnessCount: 0;
}

export const R170_LINEAGE_GROUPS: readonly R170LineageGroup[] = Object.freeze([
  Object.freeze({
    groupId: 'R170-G01-WENMING-1926-QIN-SHENAN-V2',
    lineageClass: 'BIBLIOGRAPHIC_MATCH_CANDIDATE' as const,
    recordIds: Object.freeze([
      'R170-S01-NLC-1926-V2',
      'R170-S02-NTL-1926-V2',
    ]),
    sharedPublisherFamilyObserved: true as const,
    metadataOverlapObserved: true,
    separateCustodyObserved: true,
    samePhysicalCopyEstablished: false as const,
    sameEditionEstablished: false as const,
    textualVariantComparisonComplete: false as const,
    targetSurfaceComparisonComplete: false as const,
    independentTextualWitnessCount: 0 as const,
  }),
  Object.freeze({
    groupId: 'R170-G02-WENMING-192X-COMBINED',
    lineageClass: 'SEPARATE_CATALOG_RECORD_CANDIDATE' as const,
    recordIds: Object.freeze(['R170-S03-NLC-192X-COMBINED']),
    sharedPublisherFamilyObserved: true as const,
    metadataOverlapObserved: false,
    separateCustodyObserved: false,
    samePhysicalCopyEstablished: false as const,
    sameEditionEstablished: false as const,
    textualVariantComparisonComplete: false as const,
    targetSurfaceComparisonComplete: false as const,
    independentTextualWitnessCount: 0 as const,
  }),
]);

export const R170_WITNESS_COUNTING_POLICY = Object.freeze({
  separateFileIdDoesNotImplyIndependentWitness: true,
  separateInstitutionDoesNotImplyIndependentWitness: true,
  matchingPublisherAndYearDoesNotEstablishSameEdition: true,
  matchingEditorPublisherYearDoesNotEstablishSamePhysicalCopy: true,
  separateCatalogRecordDoesNotEstablishTextualIndependence: true,
  targetSurfaceComparisonRequiredBeforeCorroborationCount: true,
  textualVariantComparisonRequiredBeforeEditionIndependence: true,
  witnessCountMayNotBecomeSemanticWeight: true,
});

export const R170_R169_BINDING_AUDIT = Object.freeze({
  upstreamCandidateId: R169_INDEPENDENT_EDITION_CANDIDATE.candidateId,
  upstreamFileId: R169_INDEPENDENT_EDITION_CANDIDATE.nlcFileId,
  upstreamSurfaceVerified:
    R169_INDEPENDENT_EDITION_CANDIDATE.targetCandidateSurfaceVisuallyVerified,
  upstreamIndependentHistoricalWitnessBound:
    R169_INDEPENDENT_EDITION_CANDIDATE.independentHistoricalWitnessBound,
  r170MatchingRecordPresent: R170_CUSTODIAL_SCAN_RECORDS.some(
    (item) => item.fileId === R169_INDEPENDENT_EDITION_CANDIDATE.nlcFileId,
  ),
  noIndependentWitnessPromotionObserved:
    R170_CUSTODIAL_SCAN_RECORDS.every(
      (item) => !item.independentTextualWitnessEstablished,
    ) && !R169_AUTHORITY.independentHistoricalWitnessBound,
});

export const R170_REMAINING_GAPS = Object.freeze([
  'TARGET_SURFACE_VISUAL_VERIFICATION_ON_NLC_1926_V2',
  'TARGET_SURFACE_VISUAL_VERIFICATION_ON_NTL_1926_V2',
  'TARGET_SURFACE_VISUAL_VERIFICATION_ON_NLC_192X_COMBINED',
  'PRINTED_PAGE_LOCATION_ON_EACH_COMPARISON_SCAN',
  'TEXTUAL_VARIANT_COLLATION',
  'BIBLIOGRAPHIC_EDITION_IDENTITY_RESOLUTION',
  'INDEPENDENT_TEXTUAL_WITNESS_ADMISSION',
] as const);

export const R170_REJECTED_SHORTCUTS = Object.freeze([
  'DIFFERENT_FILE_ID_EQUALS_INDEPENDENT_WITNESS',
  'DIFFERENT_INSTITUTION_EQUALS_INDEPENDENT_WITNESS',
  'MATCHING_METADATA_EQUALS_SAME_PHYSICAL_COPY',
  'MATCHING_METADATA_EQUALS_SAME_EDITION',
  'SEPARATE_CATALOG_RECORD_EQUALS_INDEPENDENT_TEXT',
  'TWO_SCANS_EQUALS_TWO_CORROBORATIONS',
  'CATALOG_METADATA_EQUALS_TARGET_SURFACE_VERIFICATION',
  'WITNESS_COUNT_EQUALS_EVIDENCE_WEIGHT',
  'WITNESS_COUNT_EQUALS_SEMANTIC_CONFIDENCE_SCORE',
  'LINEAGE_GROUP_EQUALS_EXECUTABLE_RULE',
] as const);

export const R170_SUMMARY = Object.freeze({
  custodialScanRecordCount: R170_CUSTODIAL_SCAN_RECORDS.length,
  lineageGroupCount: R170_LINEAGE_GROUPS.length,
  separateInstitutionRecordCount: new Set(
    R170_CUSTODIAL_SCAN_RECORDS.map((item) => item.institution),
  ).size,
  targetSurfaceVerifiedRecordCount: R170_CUSTODIAL_SCAN_RECORDS.filter(
    (item) => item.targetCandidateSurfaceVisuallyVerified,
  ).length,
  independentTextualWitnessCount: R170_CUSTODIAL_SCAN_RECORDS.filter(
    (item) => item.independentTextualWitnessEstablished,
  ).length,
  remainingGapCount: R170_REMAINING_GAPS.length,
});

export const R170_UPSTREAM_BINDINGS = Object.freeze({
  r169: {
    version: R169_CATALOG_PAGE_PROVENANCE_VERSION,
    independentEditionCandidateRecorded:
      R169_AUTHORITY.independentEditionCandidateRecorded,
    independentEditionCandidateSurfaceVerified:
      R169_AUTHORITY.independentEditionCandidateSurfaceVerified,
    independentHistoricalWitnessBound:
      R169_AUTHORITY.independentHistoricalWitnessBound,
  },
});

export const R170_AUTHORITY = Object.freeze({
  status: 'RESEARCH_WITNESS_LINEAGE_DEDUPLICATION_COMPLETE' as const,
  researchOnly: true,
  custodialScanLineageRecorded: true,
  crossInstitutionScanObserved: true,
  bibliographicMatchCandidateEstablished: true,
  samePhysicalCopyEstablished: false,
  sameEditionEstablished: false,
  textualVariantComparisonComplete: false,
  targetSurfaceComparisonComplete: false,
  independentTextualWitnessEstablished: false,
  witnessCountAsSemanticWeightAuthorized: false,
  predicateContractStudyReady: false,
  semanticPredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
