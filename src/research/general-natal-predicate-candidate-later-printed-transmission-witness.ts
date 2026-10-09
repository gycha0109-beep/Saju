import {
  R170_AUTHORITY,
  R170_WITNESS_COUNTING_POLICY,
  R170_WITNESS_LINEAGE_VERSION,
} from './general-natal-predicate-candidate-witness-lineage-deduplication.js';

export const R171_LATER_PRINTED_TRANSMISSION_WITNESS_VERSION =
  '0.1.0-research' as const;

export const R171_MINGLI_TANYUAN_WITNESS = Object.freeze({
  witnessId: 'R171-W01-MINGLI-TANYUAN-1937',
  fileId: 'NLC416-07jh011647-5318',
  workTitle: '命理探源',
  attributedAuthor: '袁樹珊著',
  publisherLabel: '星相研究社[發行]',
  publicationDateLabel: '民國26[1937]',
  sourceInstitution: 'National Library of China',
  sectionLocator: '卷下 / 評斷 / 論行運成格變格',
  sourceUrl:
    'https://commons.wikimedia.org/wiki/File:NLC416-07jh011647-5318_%E5%91%BD%E7%90%86%E6%8E%A2%E6%BA%90.pdf',
  laterPrintedTransmission: true,
  originalShenManuscriptWitness: false,
  criticalEditionEstablished: false,
  ocrSearchExtractionObserved: true,
  targetPageVisualVerificationComplete: false,
  independentTextualWitnessEstablished: false,
  mayCountAsIndependentCorroboration: false,
});

export const R171_TRANSMITTED_SURFACES = Object.freeze([
  Object.freeze({
    surfaceId: 'R171-S01-JIA',
    sourceSurface: '命有甲' as const,
    observedInTransmission: true,
    observedContextSurface: '運逢戊而命有甲',
    originalTextLayerAttributionPreserved: true,
    minimalityEstablished: false,
    sufficiencyEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'R171-S02-GENGXIN',
    sourceSurface: '庚辛' as const,
    observedInTransmission: true,
    observedContextSurface: '命有庚辛之類是也',
    originalTextLayerAttributionPreserved: true,
    minimalityEstablished: false,
    sufficiencyEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'R171-S03-SHENYOU',
    sourceSurface: '申酉' as const,
    observedInTransmission: false,
    observedContextSurface: null,
    originalTextLayerAttributionPreserved: true,
    minimalityEstablished: false,
    sufficiencyEstablished: false,
  }),
]);

export const R171_EDITORIAL_TRANSMISSION_NOTE = Object.freeze({
  noteId: 'R171-N01-TRANSMISSION-GAP-NOTE',
  noteSurfaceFragments: Object.freeze([
    '原刊',
    '闕文',
    '嘉慶年間抄本',
  ] as const),
  laterEditorReportsEarlierTextualGap: true,
  laterEditorReportsJiaqingCopyConsulted: true,
  jiaqingCopyDirectlyBoundInCurrentAssets: false,
  jiaqingCopyRepositoryOrShelfmarkBound: false,
  jiaqingCopyPageOrFolioBound: false,
  reportedCopyMayCountAsIndependentWitness: false,
  reportDistinctFromDirectWitness: true,
});

export const R171_TRANSMISSION_CLASSIFICATION = Object.freeze({
  class: 'LATER_PRINTED_TRANSMISSION_WITH_EDITORIAL_PROVENANCE_NOTE' as const,
  sameSectionTransmissionObserved: true,
  jiaSurfaceReproduced: true,
  gengXinSurfaceReproduced: true,
  shenYouSurfaceReproducedInShenTextLayer: false,
  textualVariantComparisonComplete: false,
  lineageIndependenceEstablished: false,
  independentCorroborationCountIncrement: 0,
});

export const R171_WITNESS_ADMISSION_GUARD = Object.freeze({
  separateLaterPublicationDoesNotImplyIndependentTextualWitness: true,
  editorialReportDoesNotBindReportedManuscript: true,
  ocrExtractionDoesNotEqualPageVisualVerification: true,
  reproducedSurfaceDoesNotEstablishSemanticMinimality: true,
  reproducedSurfaceDoesNotEstablishSemanticSufficiency: true,
  witnessMultiplicityDoesNotCreateSemanticWeight:
    R170_WITNESS_COUNTING_POLICY.witnessCountMayNotBecomeSemanticWeight,
});

export const R171_REMAINING_GAPS = Object.freeze([
  'MINGLI_TANYUAN_TARGET_PAGE_VISUAL_VERIFICATION',
  'MINGLI_TANYUAN_PRINTED_PAGE_OR_FOLIO_BINDING',
  'MINGLI_TANYUAN_TEXTUAL_VARIANT_COLLATION_WITH_R169_WITNESS',
  'JIAQING_COPY_DIRECT_WITNESS_BINDING',
  'JIAQING_COPY_REPOSITORY_OR_SHELFMARK_BINDING',
  'LINEAGE_INDEPENDENCE_RESOLUTION',
  'MINIMALITY_SUFFICIENCY_EVIDENCE',
  'SHENYOU_SHEN_TEXT_LAYER_WITNESS_IF_ANY',
] as const);

export const R171_REJECTED_SHORTCUTS = Object.freeze([
  'LATER_REPRINT_EQUALS_INDEPENDENT_ORIGINAL_WITNESS',
  'EDITORIAL_REPORT_EQUALS_REPORTED_MANUSCRIPT_BINDING',
  'JIAQING_COPY_MENTION_EQUALS_JIAQING_COPY_ACCESS',
  'OCR_EXTRACTION_EQUALS_VISUAL_PAGE_VERIFICATION',
  'REPRODUCED_JIA_EQUALS_RESCUE_MINIMALITY',
  'REPRODUCED_JIA_EQUALS_RESCUE_SUFFICIENCY',
  'REPRODUCED_GENGXIN_EQUALS_COUNTERFORCE_SUFFICIENCY',
  'SHENYOU_ABSENCE_IN_TRANSMISSION_EQUALS_GLOBAL_ABSENCE',
  'TRANSMISSION_COUNT_EQUALS_EVIDENCE_WEIGHT',
  'TRANSMISSION_WITNESS_EQUALS_EXECUTABLE_RULE',
] as const);

export const R171_SUMMARY = Object.freeze({
  transmissionWitnessCount: 1,
  reproducedCandidateCount: R171_TRANSMITTED_SURFACES.filter(
    (item) => item.observedInTransmission,
  ).length,
  shenTextLayerShenYouCount: R171_TRANSMITTED_SURFACES.filter(
    (item) => item.sourceSurface === '申酉' && item.observedInTransmission,
  ).length,
  directJiaqingCopyWitnessCount: 0,
  independentCorroborationCount:
    R171_TRANSMISSION_CLASSIFICATION.independentCorroborationCountIncrement,
  remainingGapCount: R171_REMAINING_GAPS.length,
});

export const R171_UPSTREAM_BINDINGS = Object.freeze({
  r170: {
    version: R170_WITNESS_LINEAGE_VERSION,
    independentTextualWitnessEstablished:
      R170_AUTHORITY.independentTextualWitnessEstablished,
    witnessCountAsSemanticWeightAuthorized:
      R170_AUTHORITY.witnessCountAsSemanticWeightAuthorized,
  },
});

export const R171_AUTHORITY = Object.freeze({
  status: 'RESEARCH_LATER_PRINTED_TRANSMISSION_WITNESS_BOUND' as const,
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
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
