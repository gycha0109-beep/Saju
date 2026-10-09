import {
  R169_NLC_SCAN_WITNESS,
  R169_PRINTED_PAGE_LOCATORS,
} from './general-natal-predicate-candidate-catalog-page-provenance.js';
import {
  R173_AUTHORITY,
  R173_JIA_JIAYI_TEXTUAL_VARIANT_AUDIT_VERSION,
  R173_PUBLIC_TRANSCRIPTION_WITNESSES,
  R173_VARIANT_AUDIT,
} from './general-natal-predicate-candidate-jia-jiayi-textual-variant-audit.js';

export const R174_JIA_ONLY_SCANNED_PAGE_BINDING_VERSION =
  '0.1.0-research' as const;

const candidatePage = R169_PRINTED_PAGE_LOCATORS.find(
  (item) => item.locatorId === 'R169-L02-CANDIDATE-PAGE',
);

if (candidatePage === undefined) {
  throw new Error('R174 missing R169 candidate printed-page locator');
}

export const R174_JIA_ONLY_PHYSICAL_SCAN_BINDING = Object.freeze({
  bindingId: 'R174-B01-NLC-JIA-ONLY-P50',
  upstreamWitnessId: R169_NLC_SCAN_WITNESS.witnessId,
  fileId: R169_NLC_SCAN_WITNESS.nlcFileId,
  workTitle: R169_NLC_SCAN_WITNESS.workTitle,
  publisherLabel: R169_NLC_SCAN_WITNESS.publisherLabel,
  publicationDateLabel: R169_NLC_SCAN_WITNESS.publicationDateLabel,
  holdingInfo: R169_NLC_SCAN_WITNESS.holdingInfo,
  sourceInstitution: R169_NLC_SCAN_WITNESS.sourceInstitution,
  sectionTitle: candidatePage.sectionTitle,
  printedPageLabel: candidatePage.printedPageLabel,
  printedPageNumber: candidatePage.printedPageNumber,
  pdfZeroBasedIndex: candidatePage.pdfZeroBasedIndex,
  pdfOneBasedOrdinal: candidatePage.pdfOneBasedOrdinal,
  observedVariantClass: 'JIA_ONLY' as const,
  observedSurface: '壬生午月，運透己官，而本命有甲之類是也',
  catalogWitnessIdentityBound: true,
  scanVisualVerificationComplete: true,
  printedPageLocatorBound: true,
  exactPublicationYearEstablished: false,
  historicalCriticalEditionEstablished: false,
  canonicalReadingAuthorized: false,
  lineageIndependenceEstablished: false,
});

export const R174_VARIANT_CLASS_MAPPING = Object.freeze([
  Object.freeze({
    variantClass: 'JIA_ONLY' as const,
    publicTranscriptionObserved:
      R173_PUBLIC_TRANSCRIPTION_WITNESSES.some(
        (item) => item.variantClass === 'JIA_ONLY',
      ),
    physicalScanPageBound: true,
    physicalScanBindingId: R174_JIA_ONLY_PHYSICAL_SCAN_BINDING.bindingId,
    canonicalReadingAuthorized: false,
    lineageResolved: false,
  }),
  Object.freeze({
    variantClass: 'JIA_YI' as const,
    publicTranscriptionObserved:
      R173_PUBLIC_TRANSCRIPTION_WITNESSES.some(
        (item) => item.variantClass === 'JIA_YI',
      ),
    physicalScanPageBound: false,
    physicalScanBindingId: null,
    canonicalReadingAuthorized: false,
    lineageResolved: false,
  }),
]);

export const R174_PARTIAL_MAPPING_AUDIT = Object.freeze({
  variantClassCount: R174_VARIANT_CLASS_MAPPING.length,
  physicalScanBoundVariantClassCount: R174_VARIANT_CLASS_MAPPING.filter(
    (item) => item.physicalScanPageBound,
  ).length,
  jiaOnlyPhysicalScanPageBound:
    R174_VARIANT_CLASS_MAPPING.find(
      (item) => item.variantClass === 'JIA_ONLY',
    )?.physicalScanPageBound === true,
  jiaYiPhysicalScanPageBound: Boolean(
    R174_VARIANT_CLASS_MAPPING.find(
      (item) => item.variantClass === 'JIA_YI',
    )?.physicalScanPageBound,
  ),
  asymmetricPhysicalMappingObserved: true,
  partialPhysicalVariantMappingEstablished: true,
  completePhysicalVariantMappingEstablished: false,
  canonicalVariantEstablished: false,
  variantLineageEstablished: false,
  r173JiaPresenceStabilityPreserved:
    R173_VARIANT_AUDIT.jiaPresentAcrossAllObservedVariants,
  yiPresenceInstabilityPreserved:
    !R173_VARIANT_AUDIT.yiPresenceTextuallyStable,
});

export const R174_SEMANTIC_BOUNDARY = Object.freeze({
  scannedJiaOnlySurfaceDoesNotEstablishOriginalArchetype: true,
  scannedJiaOnlySurfaceDoesNotDisproveJiaYiVariant: true,
  scannedJiaOnlySurfaceDoesNotEstablishYiAbsenceGlobally: true,
  scannedJiaOnlySurfaceDoesNotEstablishJiaStandalonePredicate: true,
  physicalPageBindingDoesNotEstablishSemanticMinimality: true,
  physicalPageBindingDoesNotEstablishMatchingSufficiency: true,
  physicalPageBindingDoesNotEstablishOutcomeSufficiency: true,
});

export const R174_REQUIRED_FOLLOW_UP = Object.freeze([
  'PHYSICAL_SCAN_PAGE_BINDING_FOR_JIA_YI_VARIANT',
  'BIBLIOGRAPHIC_IDENTITY_FOR_JIA_YI_PRINTED_WITNESS',
  'JIA_ONLY_AND_JIA_YI_VARIANT_LINEAGE_COLLATION',
  'CANONICAL_READING_RESOLUTION_IF_EVIDENCE_SUPPORTS',
  'YI_ROLE_IN_FORMATION_OPPOSITION_CONTEXT',
] as const);

export const R174_REJECTED_SHORTCUTS = Object.freeze([
  'ONE_SCANNED_JIA_ONLY_PAGE_EQUALS_CANONICAL_READING',
  'SCANNED_JIA_ONLY_EQUALS_JIA_YI_CORRUPTION',
  'SCANNED_JIA_ONLY_EQUALS_GLOBAL_YI_ABSENCE',
  'PHYSICAL_SCAN_BOUND_EQUALS_CRITICAL_EDITION',
  'PHYSICAL_PAGE_BINDING_EQUALS_TEXTUAL_ARCHETYPE',
  'PHYSICAL_PAGE_BINDING_EQUALS_SEMANTIC_PREDICATE',
  'JIA_ONLY_PAGE_EQUALS_JIA_STANDALONE_SUFFICIENCY',
  'UNBOUND_JIA_YI_PAGE_EQUALS_JIA_YI_FALSE',
  'PARTIAL_VARIANT_MAPPING_EQUALS_COMPLETE_LINEAGE',
  'VARIANT_MAPPING_AS_EXECUTABLE_RULE',
] as const);

export const R174_GOVERNANCE = Object.freeze({
  upstreamVariantClassesObserved:
    R173_AUTHORITY.jiaAndJiaYiVariantClassesObserved,
  upstreamCanonicalVariantStillClosed:
    !R173_AUTHORITY.canonicalVariantEstablished,
  upstreamPhysicalVariantMappingStillIncomplete:
    !R173_AUTHORITY.physicalEditionVariantMappingEstablished,
  upstreamVariantLineageStillClosed:
    !R173_AUTHORITY.variantLineageEstablished,
  jiaOnlyScanBindingDistinctFromCanonicalization: true,
  physicalEvidenceDistinctFromSemanticAuthority: true,
});

export const R174_SUMMARY = Object.freeze({
  variantClassCount: R174_VARIANT_CLASS_MAPPING.length,
  physicalScanBoundVariantClassCount:
    R174_PARTIAL_MAPPING_AUDIT.physicalScanBoundVariantClassCount,
  visuallyVerifiedPhysicalBindingCount: 1,
  canonicalReadingAuthorizedCount: R174_VARIANT_CLASS_MAPPING.filter(
    (item) => item.canonicalReadingAuthorized,
  ).length,
  lineageResolvedVariantClassCount: R174_VARIANT_CLASS_MAPPING.filter(
    (item) => item.lineageResolved,
  ).length,
  requiredFollowUpCount: R174_REQUIRED_FOLLOW_UP.length,
});

export const R174_UPSTREAM_BINDINGS = Object.freeze({
  r173: {
    version: R173_JIA_JIAYI_TEXTUAL_VARIANT_AUDIT_VERSION,
    jiaPresenceStableAcrossObservedVariants:
      R173_AUTHORITY.jiaPresenceStableAcrossObservedVariants,
    yiPresenceStableAcrossObservedVariants:
      R173_AUTHORITY.yiPresenceStableAcrossObservedVariants,
    canonicalVariantEstablished: R173_AUTHORITY.canonicalVariantEstablished,
  },
  r169: {
    witnessId: R169_NLC_SCAN_WITNESS.witnessId,
    fileId: R169_NLC_SCAN_WITNESS.nlcFileId,
    candidatePrintedPage: candidatePage.printedPageNumber,
    candidatePageVisualVerification: candidatePage.scanVisualVerification,
  },
});

export const R174_AUTHORITY = Object.freeze({
  status: 'RESEARCH_JIA_ONLY_SCANNED_PRINTED_PAGE_BINDING_PARTIAL_COMPLETE' as const,
  researchOnly: true,
  jiaOnlyPhysicalScanPageBound: true,
  jiaYiPhysicalScanPageBound: false,
  partialPhysicalVariantMappingEstablished: true,
  completePhysicalVariantMappingEstablished: false,
  canonicalVariantEstablished: false,
  variantLineageEstablished: false,
  historicalCriticalEditionEstablished: false,
  jiaPresenceStableAcrossObservedVariants: true,
  yiPresenceStableAcrossObservedVariants: false,
  standaloneJiaPredicateAuthorized: false,
  standaloneYiPredicateAuthorized: false,
  groupedJiaYiPredicateAuthorized: false,
  exactConfigurationTuplePredicateEstablished: false,
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
