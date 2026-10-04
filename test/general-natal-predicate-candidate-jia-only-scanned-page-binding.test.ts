import { describe, expect, it } from 'vitest';

import {
  R174_AUTHORITY,
  R174_GOVERNANCE,
  R174_JIA_ONLY_PHYSICAL_SCAN_BINDING,
  R174_JIA_ONLY_SCANNED_PAGE_BINDING_VERSION,
  R174_PARTIAL_MAPPING_AUDIT,
  R174_REJECTED_SHORTCUTS,
  R174_REQUIRED_FOLLOW_UP,
  R174_SEMANTIC_BOUNDARY,
  R174_SUMMARY,
  R174_UPSTREAM_BINDINGS,
  R174_VARIANT_CLASS_MAPPING,
} from '../src/research/general-natal-predicate-candidate-jia-only-scanned-page-binding.js';

describe('R174 Jia-only scanned printed-page binding', () => {
  it('binds the Jia-only variant to the NLC scanned printed page', () => {
    expect(R174_JIA_ONLY_SCANNED_PAGE_BINDING_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R174_JIA_ONLY_PHYSICAL_SCAN_BINDING).toMatchObject({
      fileId: 'NLC416-11jh010455-35296',
      workTitle: '子平真詮',
      publisherLabel: '世界圖書館[發行者]',
      publicationDateLabel: '[19--?]',
      holdingInfo: 'MG/B992.3',
      sectionTitle: '論行運成格變格',
      printedPageLabel: '五十',
      printedPageNumber: 50,
      pdfZeroBasedIndex: 58,
      pdfOneBasedOrdinal: 59,
      observedVariantClass: 'JIA_ONLY',
      observedSurface: '壬生午月，運透己官，而本命有甲之類是也',
      catalogWitnessIdentityBound: true,
      scanVisualVerificationComplete: true,
      printedPageLocatorBound: true,
      exactPublicationYearEstablished: false,
      historicalCriticalEditionEstablished: false,
      canonicalReadingAuthorized: false,
      lineageIndependenceEstablished: false,
    });
  });

  it('keeps the Jia-Yi class physically unbound while preserving both public variants', () => {
    expect(R174_VARIANT_CLASS_MAPPING).toEqual([
      expect.objectContaining({
        variantClass: 'JIA_ONLY',
        publicTranscriptionObserved: true,
        physicalScanPageBound: true,
        physicalScanBindingId: 'R174-B01-NLC-JIA-ONLY-P50',
        canonicalReadingAuthorized: false,
        lineageResolved: false,
      }),
      expect.objectContaining({
        variantClass: 'JIA_YI',
        publicTranscriptionObserved: true,
        physicalScanPageBound: false,
        physicalScanBindingId: null,
        canonicalReadingAuthorized: false,
        lineageResolved: false,
      }),
    ]);
  });

  it('records a partial, asymmetric physical mapping without canonicalization', () => {
    expect(R174_PARTIAL_MAPPING_AUDIT).toEqual({
      variantClassCount: 2,
      physicalScanBoundVariantClassCount: 1,
      jiaOnlyPhysicalScanPageBound: true,
      jiaYiPhysicalScanPageBound: false,
      asymmetricPhysicalMappingObserved: true,
      partialPhysicalVariantMappingEstablished: true,
      completePhysicalVariantMappingEstablished: false,
      canonicalVariantEstablished: false,
      variantLineageEstablished: false,
      r173JiaPresenceStabilityPreserved: true,
      yiPresenceInstabilityPreserved: true,
    });
    expect(R174_SUMMARY).toEqual({
      variantClassCount: 2,
      physicalScanBoundVariantClassCount: 1,
      visuallyVerifiedPhysicalBindingCount: 1,
      canonicalReadingAuthorizedCount: 0,
      lineageResolvedVariantClassCount: 0,
      requiredFollowUpCount: 5,
    });
  });

  it('keeps scan evidence separate from textual archetype and semantic authority', () => {
    expect(R174_SEMANTIC_BOUNDARY).toEqual({
      scannedJiaOnlySurfaceDoesNotEstablishOriginalArchetype: true,
      scannedJiaOnlySurfaceDoesNotDisproveJiaYiVariant: true,
      scannedJiaOnlySurfaceDoesNotEstablishYiAbsenceGlobally: true,
      scannedJiaOnlySurfaceDoesNotEstablishJiaStandalonePredicate: true,
      physicalPageBindingDoesNotEstablishSemanticMinimality: true,
      physicalPageBindingDoesNotEstablishMatchingSufficiency: true,
      physicalPageBindingDoesNotEstablishOutcomeSufficiency: true,
    });
  });

  it('keeps Jia-Yi physical binding and lineage work explicit', () => {
    expect(R174_REQUIRED_FOLLOW_UP).toEqual([
      'PHYSICAL_SCAN_PAGE_BINDING_FOR_JIA_YI_VARIANT',
      'BIBLIOGRAPHIC_IDENTITY_FOR_JIA_YI_PRINTED_WITNESS',
      'JIA_ONLY_AND_JIA_YI_VARIANT_LINEAGE_COLLATION',
      'CANONICAL_READING_RESOLUTION_IF_EVIDENCE_SUPPORTS',
      'YI_ROLE_IN_FORMATION_OPPOSITION_CONTEXT',
    ]);
  });

  it('inherits R173 boundaries and R169 locator provenance', () => {
    expect(R174_GOVERNANCE).toEqual({
      upstreamVariantClassesObserved: true,
      upstreamCanonicalVariantStillClosed: true,
      upstreamPhysicalVariantMappingStillIncomplete: true,
      upstreamVariantLineageStillClosed: true,
      jiaOnlyScanBindingDistinctFromCanonicalization: true,
      physicalEvidenceDistinctFromSemanticAuthority: true,
    });
    expect(R174_UPSTREAM_BINDINGS.r173).toMatchObject({
      jiaPresenceStableAcrossObservedVariants: true,
      yiPresenceStableAcrossObservedVariants: false,
      canonicalVariantEstablished: false,
    });
    expect(R174_UPSTREAM_BINDINGS.r169).toMatchObject({
      fileId: 'NLC416-11jh010455-35296',
      candidatePrintedPage: 50,
      candidatePageVisualVerification: true,
    });
  });

  it('rejects canonicalization, absence, and semantic shortcuts', () => {
    expect(R174_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'ONE_SCANNED_JIA_ONLY_PAGE_EQUALS_CANONICAL_READING',
        'SCANNED_JIA_ONLY_EQUALS_JIA_YI_CORRUPTION',
        'SCANNED_JIA_ONLY_EQUALS_GLOBAL_YI_ABSENCE',
        'PHYSICAL_SCAN_BOUND_EQUALS_CRITICAL_EDITION',
        'PHYSICAL_PAGE_BINDING_EQUALS_SEMANTIC_PREDICATE',
        'UNBOUND_JIA_YI_PAGE_EQUALS_JIA_YI_FALSE',
        'PARTIAL_VARIANT_MAPPING_EQUALS_COMPLETE_LINEAGE',
      ]),
    );
  });

  it('keeps semantic, execution, claim, and production authority closed', () => {
    expect(R174_AUTHORITY).toMatchObject({
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
      executableResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
