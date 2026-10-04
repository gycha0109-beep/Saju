import { describe, expect, it } from 'vitest';

import {
  R175_ADMISSION_GUARDS,
  R175_AUTHORITY,
  R175_BIBLIOGRAPHIC_CANDIDATE_AUDIT,
  R175_DIGITAL_PAGE_RANGE_EVIDENCE,
  R175_JIAYI_PRINTED_WITNESS_ACQUISITION_VERSION,
  R175_JIAYI_WITNESS_CANDIDATES,
  R175_R174_GAP_REASSESSMENT,
  R175_REJECTED_SHORTCUTS,
  R175_REQUIRED_FOLLOW_UP,
  R175_SUMMARY,
  R175_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-jiayi-printed-witness-acquisition.js';

describe('R175 Jia-Yi printed-witness acquisition candidates', () => {
  it('binds three candidate classes without admitting a physical page witness', () => {
    expect(R175_JIAYI_PRINTED_WITNESS_ACQUISITION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R175_JIAYI_WITNESS_CANDIDATES).toHaveLength(3);
    expect(
      new Set(R175_JIAYI_WITNESS_CANDIDATES.map((item) => item.kind)),
    ).toEqual(
      new Set([
        'DIGITAL_PDF_INDEX_CANDIDATE',
        'BIBLIOGRAPHIC_EDITION_CANDIDATE',
        'FACSIMILE_PRODUCT_RECORD_CANDIDATE',
      ]),
    );
    for (const item of R175_JIAYI_WITNESS_CANDIDATES) {
      expect(item.targetPageVisualVerificationComplete).toBe(false);
      expect(item.physicalEditionIdentityBound).toBe(false);
      expect(item.targetPrintedPageBound).toBe(false);
      expect(item.canonicalReadingAuthorized).toBe(false);
      expect(item.mayCloseR174PhysicalGap).toBe(false);
    }
  });

  it('records the 159-page digital PDF index and the target chapter range', () => {
    expect(R175_DIGITAL_PAGE_RANGE_EVIDENCE).toEqual({
      candidateId: 'R175-C01-YIJINGYIXUE-159P-PDF',
      formatReported: 'PDF',
      totalPagesReported: 159,
      targetSection: '二十六 論行運成格變格',
      reportedPageRange: [91, 92],
      targetSummaryReportsJiaYiSurface: true,
      publicPreviewPageCount: 13,
      targetPageInsidePublicPreview: false,
      targetPageVisualVerificationComplete: false,
      pageRangeEvidenceDistinctFromPrintedPageBinding: true,
    });
  });

  it('keeps bibliographic and facsimile records as acquisition candidates only', () => {
    expect(R175_BIBLIOGRAPHIC_CANDIDATE_AUDIT).toEqual({
      candidateCount: 3,
      digitalPdfIndexCandidateCount: 1,
      bibliographicEditionCandidateCount: 1,
      facsimileProductRecordCandidateCount: 1,
      visuallyVerifiedCandidateCount: 0,
      physicalEditionIdentityBoundCount: 0,
      targetPrintedPageBoundCount: 0,
    });
    expect(R175_SUMMARY).toEqual({
      candidateCount: 3,
      targetPageRangeCandidateCount: 1,
      visuallyVerifiedCandidateCount: 0,
      physicalEditionIdentityBoundCount: 0,
      targetPrintedPageBoundCount: 0,
      requiredFollowUpCount: 5,
    });
  });

  it('preserves the R174 asymmetric physical mapping', () => {
    expect(R175_R174_GAP_REASSESSMENT).toEqual({
      upstreamJiaOnlyPhysicalScanPageBound: true,
      upstreamJiaYiPhysicalScanPageBound: false,
      upstreamAsymmetricMapping: true,
      jiaYiAcquisitionCandidatesNowBound: true,
      jiaYiTargetPageRangeCandidateBound: true,
      jiaYiPhysicalScanPageBound: false,
      completePhysicalVariantMappingEstablished: false,
      canonicalVariantEstablished: false,
      variantLineageEstablished: false,
    });
    expect(R175_UPSTREAM_BINDINGS.r174).toMatchObject({
      jiaOnlyPhysicalScanPageBound: true,
      jiaYiPhysicalScanPageBound: false,
      completePhysicalVariantMappingEstablished: false,
    });
  });

  it('requires direct page access before physical witness admission', () => {
    expect(R175_ADMISSION_GUARDS).toEqual({
      digitalPageIndexDoesNotEqualPageVisualVerification: true,
      chapterSummaryDoesNotEqualPrintedSurfaceWitness: true,
      bibliographicRecordDoesNotEqualTargetSurfaceBinding: true,
      productFacsimileLabelDoesNotEstablishTargetSurface: true,
      samePublisherFamilyDoesNotEstablishSameEdition: true,
      titleMatchDoesNotEstablishTextualIdentity: true,
      inaccessibleTargetPreviewMustRemainUnverified: true,
      candidateMultiplicityDoesNotCreateCanonicalReading: true,
    });
    expect(R175_REQUIRED_FOLLOW_UP).toEqual([
      'DIRECT_VISUAL_ACCESS_TO_JIAYI_TARGET_PAGE',
      'PHYSICAL_EDITION_IDENTITY_FOR_VISUALLY_VERIFIED_JIAYI_PAGE',
      'PRINTED_PAGE_OR_FOLIO_BINDING_FOR_JIAYI_VARIANT',
      'JIA_ONLY_AND_JIA_YI_LINEAGE_COLLATION',
      'CANONICAL_READING_RESOLUTION_IF_SUPPORTED',
    ]);
  });

  it('rejects metadata, page-range, and candidate-count shortcuts', () => {
    expect(R175_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'PDF_INDEX_EQUALS_PHYSICAL_WITNESS',
        'PAGE_RANGE_EQUALS_VISUAL_VERIFICATION',
        'CHAPTER_SUMMARY_EQUALS_PRINTED_PAGE',
        'GOOGLE_BOOKS_RECORD_EQUALS_TARGET_SURFACE_WITNESS',
        'FACSIMILE_PRODUCT_RECORD_EQUALS_TARGET_SURFACE_WITNESS',
        'UNAVAILABLE_PREVIEW_EQUALS_NEGATIVE_EVIDENCE',
        'JIA_YI_CANDIDATE_COUNT_EQUALS_CANONICAL_READING',
      ]),
    );
  });

  it('keeps semantic, execution, claim, and production authority closed', () => {
    expect(R175_AUTHORITY).toMatchObject({
      researchOnly: true,
      jiaYiAcquisitionCandidatesBound: true,
      jiaYiDigitalPageRangeCandidateBound: true,
      jiaYiTargetPageVisualVerificationComplete: false,
      jiaYiPhysicalEditionIdentityBound: false,
      jiaYiPhysicalScanPageBound: false,
      completePhysicalVariantMappingEstablished: false,
      canonicalVariantEstablished: false,
      variantLineageEstablished: false,
      historicalCriticalEditionEstablished: false,
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
