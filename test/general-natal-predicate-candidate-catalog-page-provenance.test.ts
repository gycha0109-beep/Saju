import { describe, expect, it } from 'vitest';

import {
  R169_AUTHORITY,
  R169_CANDIDATE_PROVENANCE_PROGRESS,
  R169_CATALOG_PAGE_PROVENANCE_VERSION,
  R169_INDEPENDENT_EDITION_CANDIDATE,
  R169_NLC_SCAN_SURFACE_AUDIT,
  R169_NLC_SCAN_WITNESS,
  R169_PRINTED_PAGE_LOCATORS,
  R169_REJECTED_SHORTCUTS,
  R169_REMAINING_GAPS,
  R169_SUMMARY,
  R169_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-catalog-page-provenance.js';

describe('R169 candidate catalog and printed-page provenance', () => {
  it('binds the NLC scan catalog identity without inventing an exact publication year', () => {
    expect(R169_CATALOG_PAGE_PROVENANCE_VERSION).toBe('0.1.0-research');
    expect(R169_NLC_SCAN_WITNESS).toMatchObject({
      nlcFileId: 'NLC416-11jh010455-35296',
      workTitle: '子平真詮',
      attributedEditor: '沈孝瞻編輯',
      publisherLabel: '世界圖書館[發行者]',
      publicationDateLabel: '[19--?]',
      holdingInfo: 'MG/B992.3',
      catalogIdentityBound: true,
      witnessIdentityBound: true,
      publisherBound: true,
      holdingIdentifierBound: true,
      exactPublicationYearEstablished: false,
      historicalCriticalEditionEstablished: false,
    });
  });

  it('separates printed page labels from PDF ordinals', () => {
    expect(R169_PRINTED_PAGE_LOCATORS).toEqual([
      expect.objectContaining({
        printedPageLabel: '四十九',
        printedPageNumber: 49,
        pdfZeroBasedIndex: 57,
        pdfOneBasedOrdinal: 58,
        scanVisualVerification: true,
      }),
      expect.objectContaining({
        printedPageLabel: '五十',
        printedPageNumber: 50,
        pdfZeroBasedIndex: 58,
        pdfOneBasedOrdinal: 59,
        scanVisualVerification: true,
        candidateSurfaces: ['命有甲', '庚辛'],
      }),
    ]);
  });

  it('advances Jia and Geng/Xin provenance while keeping Shen/You on commentary-only evidence', () => {
    const jia = R169_CANDIDATE_PROVENANCE_PROGRESS.find(
      (item) => item.sourceSurface === '命有甲',
    );
    const gengXin = R169_CANDIDATE_PROVENANCE_PROGRESS.find(
      (item) => item.sourceSurface === '庚辛',
    );
    const shenYou = R169_CANDIDATE_PROVENANCE_PROGRESS.find(
      (item) => item.sourceSurface === '申酉',
    );

    for (const item of [jia, gengXin]) {
      expect(item).toMatchObject({
        sourceLayer: 'SHEN_TEXT_NLC_SCAN',
        sourceWitnessIdentityBound: true,
        printedPageLocatorBound: true,
        sectionLocatorBound: true,
        directTextLayerWitnessBound: true,
        predicateContractStudyAdmission: 'BLOCKED',
      });
    }

    expect(shenYou).toMatchObject({
      sourceLayer: 'XU_COMMENTARY_PUBLIC_TRANSCRIPTION',
      sourceWitnessIdentityBound: false,
      printedPageLocatorBound: false,
      predicateContractStudyAdmission: 'BLOCKED',
    });
  });

  it('keeps scan location evidence distinct from semantic authority', () => {
    expect(R169_NLC_SCAN_SURFACE_AUDIT).toEqual({
      sectionStartPrintedPage: 49,
      candidatePrintedPage: 50,
      jiaSurfaceObservedOnCandidatePage: true,
      gengXinSurfaceObservedOnCandidatePage: true,
      shenYouSurfaceObservedOnCandidatePage: false,
      shenYouStillCommentaryLayerOnly: true,
      breakCaseJiaOmissionStillNotAbsence: true,
      scanLocatorDistinctFromSemanticSufficiency: true,
    });

    for (const item of R169_CANDIDATE_PROVENANCE_PROGRESS) {
      expect(item.historicalCriticalEditionBound).toBe(false);
      expect(item.independentHistoricalWitnessBound).toBe(false);
      expect(item.minimalitySufficiencyEvidenceBound).toBe(false);
      expect(item.semanticPredicateEstablished).toBe(false);
      expect(item.matchingSufficiencyEstablished).toBe(false);
      expect(item.executableResolverAuthorized).toBe(false);
      expect(item.productionAuthorityPromoted).toBe(false);
    }
  });

  it('records the 1926 Wenming edition only as an unverified independent-edition candidate', () => {
    expect(R169_INDEPENDENT_EDITION_CANDIDATE).toMatchObject({
      nlcFileId: 'NLC416-13jh002326-46443',
      volumeLabel: '第2卷',
      editorLabel: '秦慎安校勘',
      publisherLabel: '文明書局[發行者]',
      publicationDateLabel: '民國十五年[1926]',
      holdingInfo: 'MG/B992.3/33',
      chapterListedInCatalogDescription: true,
      targetCandidateSurfaceVisuallyVerified: false,
      targetPrintedPageLocated: false,
      independentHistoricalWitnessBound: false,
      mayBeUsedAsCorroborationBeforeSurfaceVerification: false,
    });
  });

  it('keeps the unresolved provenance and semantic frontier explicit', () => {
    expect(R169_REMAINING_GAPS).toEqual([
      'CRITICAL_EDITION_STATUS',
      'EXACT_PUBLICATION_YEAR_FOR_R169_W01',
      'INDEPENDENT_HISTORICAL_WITNESS_SURFACE_VERIFICATION',
      'R169_EDITION_CANDIDATE_1926_TARGET_PAGE_LOCATION',
      'MINIMALITY_SUFFICIENCY_EVIDENCE',
      'SHENYOU_SHEN_TEXT_LAYER_WITNESS_IF_ANY',
    ]);
    expect(R169_SUMMARY).toMatchObject({
      candidateCount: 3,
      nlcScanIdentityBoundCandidateCount: 2,
      printedPageLocatorBoundCandidateCount: 2,
      independentHistoricalWitnessBoundCount: 0,
      admittedCandidateCount: 0,
      remainingGapCount: 6,
    });
  });

  it('rejects catalog, locator, and edition-candidate authority shortcuts', () => {
    expect(R169_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'NLC_FILE_ID_EQUALS_CRITICAL_EDITION',
        'KNOWN_PUBLISHER_WITH_UNKNOWN_YEAR_EQUALS_EXACT_EDITION_DATE',
        'PRINTED_PAGE_LOCATOR_EQUALS_SEMANTIC_PREDICATE',
        'PDF_PAGE_ORDINAL_EQUALS_PRINTED_PAGE_NUMBER',
        'CATALOG_LISTED_CHAPTER_EQUALS_TARGET_SURFACE_VERIFIED',
        '1926_EDITION_METADATA_EQUALS_INDEPENDENT_WITNESS',
        'XU_COMMENTARY_SHENYOU_EQUALS_SHEN_TEXT_SHENYOU',
      ]),
    );
  });

  it('keeps R169 research-only and all downstream authority closed', () => {
    expect(R169_UPSTREAM_BINDINGS.r168).toMatchObject({
      candidateCount: 3,
      sourceLayerDistinctionEstablished: true,
      shenYouOriginalTextSurfaceObserved: false,
      predicateContractStudyReady: false,
    });
    expect(R169_AUTHORITY).toMatchObject({
      researchOnly: true,
      nlcCatalogWitnessIdentityBound: true,
      nlcHoldingIdentifierBound: true,
      exactPublicationYearEstablished: false,
      sectionStartPrintedPageBound: true,
      candidatePrintedPageBound: true,
      jiaPrintedPageWitnessBound: true,
      gengXinPrintedPageWitnessBound: true,
      shenYouPrintedPageWitnessBound: false,
      historicalCriticalEditionBound: false,
      independentHistoricalWitnessBound: false,
      independentEditionCandidateRecorded: true,
      independentEditionCandidateSurfaceVerified: false,
      predicateContractStudyReady: false,
      semanticPredicateEstablished: false,
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
