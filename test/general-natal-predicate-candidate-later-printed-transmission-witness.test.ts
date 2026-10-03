import { describe, expect, it } from 'vitest';

import {
  R171_AUTHORITY,
  R171_EDITORIAL_TRANSMISSION_NOTE,
  R171_LATER_PRINTED_TRANSMISSION_WITNESS_VERSION,
  R171_MINGLI_TANYUAN_WITNESS,
  R171_REJECTED_SHORTCUTS,
  R171_REMAINING_GAPS,
  R171_SUMMARY,
  R171_TRANSMISSION_CLASSIFICATION,
  R171_TRANSMITTED_SURFACES,
  R171_UPSTREAM_BINDINGS,
  R171_WITNESS_ADMISSION_GUARD,
} from '../src/research/general-natal-predicate-candidate-later-printed-transmission-witness.js';

describe('R171 later printed transmission witness', () => {
  it('binds the 1937 Mingli Tanyuan catalog witness as a later transmission only', () => {
    expect(R171_LATER_PRINTED_TRANSMISSION_WITNESS_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R171_MINGLI_TANYUAN_WITNESS).toMatchObject({
      fileId: 'NLC416-07jh011647-5318',
      workTitle: '命理探源',
      attributedAuthor: '袁樹珊著',
      publisherLabel: '星相研究社[發行]',
      publicationDateLabel: '民國26[1937]',
      sectionLocator: '卷下 / 評斷 / 論行運成格變格',
      laterPrintedTransmission: true,
      originalShenManuscriptWitness: false,
      criticalEditionEstablished: false,
      ocrSearchExtractionObserved: true,
      targetPageVisualVerificationComplete: false,
      independentTextualWitnessEstablished: false,
      mayCountAsIndependentCorroboration: false,
    });
  });

  it('records Jia and Geng/Xin reproduction without inventing Shen/You in the Shen text layer', () => {
    expect(R171_TRANSMITTED_SURFACES).toEqual([
      expect.objectContaining({
        sourceSurface: '命有甲',
        observedInTransmission: true,
        observedContextSurface: '運逢戊而命有甲',
        minimalityEstablished: false,
        sufficiencyEstablished: false,
      }),
      expect.objectContaining({
        sourceSurface: '庚辛',
        observedInTransmission: true,
        observedContextSurface: '命有庚辛之類是也',
        minimalityEstablished: false,
        sufficiencyEstablished: false,
      }),
      expect.objectContaining({
        sourceSurface: '申酉',
        observedInTransmission: false,
        observedContextSurface: null,
      }),
    ]);
    expect(R171_SUMMARY).toMatchObject({
      transmissionWitnessCount: 1,
      reproducedCandidateCount: 2,
      shenTextLayerShenYouCount: 0,
      directJiaqingCopyWitnessCount: 0,
      independentCorroborationCount: 0,
      remainingGapCount: 8,
    });
  });

  it('preserves the editorial report about textual gaps as a report rather than a bound manuscript', () => {
    expect(R171_EDITORIAL_TRANSMISSION_NOTE).toMatchObject({
      laterEditorReportsEarlierTextualGap: true,
      laterEditorReportsJiaqingCopyConsulted: true,
      jiaqingCopyDirectlyBoundInCurrentAssets: false,
      jiaqingCopyRepositoryOrShelfmarkBound: false,
      jiaqingCopyPageOrFolioBound: false,
      reportedCopyMayCountAsIndependentWitness: false,
      reportDistinctFromDirectWitness: true,
    });
    expect(R171_EDITORIAL_TRANSMISSION_NOTE.noteSurfaceFragments).toEqual([
      '原刊',
      '闕文',
      '嘉慶年間抄本',
    ]);
  });

  it('classifies the record as a later printed transmission with unresolved lineage independence', () => {
    expect(R171_TRANSMISSION_CLASSIFICATION).toEqual({
      class: 'LATER_PRINTED_TRANSMISSION_WITH_EDITORIAL_PROVENANCE_NOTE',
      sameSectionTransmissionObserved: true,
      jiaSurfaceReproduced: true,
      gengXinSurfaceReproduced: true,
      shenYouSurfaceReproducedInShenTextLayer: false,
      textualVariantComparisonComplete: false,
      lineageIndependenceEstablished: false,
      independentCorroborationCountIncrement: 0,
    });
  });

  it('inherits witness counting guards from R170', () => {
    expect(R171_WITNESS_ADMISSION_GUARD).toEqual({
      separateLaterPublicationDoesNotImplyIndependentTextualWitness: true,
      editorialReportDoesNotBindReportedManuscript: true,
      ocrExtractionDoesNotEqualPageVisualVerification: true,
      reproducedSurfaceDoesNotEstablishSemanticMinimality: true,
      reproducedSurfaceDoesNotEstablishSemanticSufficiency: true,
      witnessMultiplicityDoesNotCreateSemanticWeight: true,
    });
    expect(R171_UPSTREAM_BINDINGS.r170).toMatchObject({
      independentTextualWitnessEstablished: false,
      witnessCountAsSemanticWeightAuthorized: false,
    });
  });

  it('keeps the unresolved transmission and semantic frontier explicit', () => {
    expect(R171_REMAINING_GAPS).toEqual([
      'MINGLI_TANYUAN_TARGET_PAGE_VISUAL_VERIFICATION',
      'MINGLI_TANYUAN_PRINTED_PAGE_OR_FOLIO_BINDING',
      'MINGLI_TANYUAN_TEXTUAL_VARIANT_COLLATION_WITH_R169_WITNESS',
      'JIAQING_COPY_DIRECT_WITNESS_BINDING',
      'JIAQING_COPY_REPOSITORY_OR_SHELFMARK_BINDING',
      'LINEAGE_INDEPENDENCE_RESOLUTION',
      'MINIMALITY_SUFFICIENCY_EVIDENCE',
      'SHENYOU_SHEN_TEXT_LAYER_WITNESS_IF_ANY',
    ]);
  });

  it('rejects transmission, OCR, and semantic-authority shortcuts', () => {
    expect(R171_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'LATER_REPRINT_EQUALS_INDEPENDENT_ORIGINAL_WITNESS',
        'EDITORIAL_REPORT_EQUALS_REPORTED_MANUSCRIPT_BINDING',
        'JIAQING_COPY_MENTION_EQUALS_JIAQING_COPY_ACCESS',
        'OCR_EXTRACTION_EQUALS_VISUAL_PAGE_VERIFICATION',
        'REPRODUCED_JIA_EQUALS_RESCUE_MINIMALITY',
        'REPRODUCED_GENGXIN_EQUALS_COUNTERFORCE_SUFFICIENCY',
        'TRANSMISSION_COUNT_EQUALS_EVIDENCE_WEIGHT',
      ]),
    );
  });

  it('keeps all semantic and execution authority closed', () => {
    expect(R171_AUTHORITY).toMatchObject({
      researchOnly: true,
      laterPrintedTransmissionBound: true,
      jiaSurfaceReproduced: true,
      gengXinSurfaceReproduced: true,
      shenYouShenTextSurfaceReproduced: false,
      editorialTransmissionNoteBound: true,
      jiaqingCopyDirectWitnessBound: false,
      targetPageVisualVerificationComplete: false,
      textualVariantComparisonComplete: false,
      lineageIndependenceEstablished: false,
      independentTextualWitnessEstablished: false,
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
