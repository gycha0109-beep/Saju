import {
  R167_ACQUISITION_CONTRACTS,
  R167_AUTHORITY,
  R167_SOURCE_WITNESS_ACQUISITION_CONTRACT_VERSION,
} from './general-natal-predicate-candidate-source-witness-acquisition-contract.js';

export const R168_SOURCE_LAYER_WITNESS_BINDING_VERSION =
  '0.1.0-research' as const;

export type R168CandidateSurface = '命有甲' | '庚辛' | '申酉';

export type R168SourceLayer =
  | 'SHEN_TEXT_PUBLIC_TRANSCRIPTION'
  | 'XU_COMMENTARY_PUBLIC_TRANSCRIPTION';

export interface R168DigitalWitness {
  witnessId: string;
  workTitle: string;
  attributedAuthor: string;
  sourceLayer: R168SourceLayer;
  sectionLocator: string;
  url: string;
  observedSurface: R168CandidateSurface;
  observedExcerpt: string;
  publicDigitalTranscription: true;
  historicalCriticalEditionEstablished: false;
  editionIdentityEstablished: false;
  pageOrFolioLocatorEstablished: false;
  editorialIndependenceEstablished: false;
}

export const R168_DIGITAL_WITNESSES: readonly R168DigitalWitness[] =
  Object.freeze([
    Object.freeze({
      witnessId: 'R168-W01-DONGLI-ZIPING-26-JIA',
      workTitle: '子平真詮',
      attributedAuthor: '沈孝瞻',
      sourceLayer: 'SHEN_TEXT_PUBLIC_TRANSCRIPTION' as const,
      sectionLocator: '秘本子平真詮卷二 / 二十六、論行運成格變格',
      url: 'https://donglishuzhai.net/chapter/3739.html',
      observedSurface: '命有甲' as const,
      observedExcerpt: '逢戊而命有甲',
      publicDigitalTranscription: true as const,
      historicalCriticalEditionEstablished: false as const,
      editionIdentityEstablished: false as const,
      pageOrFolioLocatorEstablished: false as const,
      editorialIndependenceEstablished: false as const,
    }),
    Object.freeze({
      witnessId: 'R168-W02-TIANYA-ZIPING-26-JIA',
      workTitle: '子平真詮',
      attributedAuthor: '沈孝瞻',
      sourceLayer: 'SHEN_TEXT_PUBLIC_TRANSCRIPTION' as const,
      sectionLocator: '二十六、論行運成格變格',
      url: 'https://www.tianyashuku.com/yijing/9643/814127.html',
      observedSurface: '命有甲' as const,
      observedExcerpt: '逢戊而命有甲',
      publicDigitalTranscription: true as const,
      historicalCriticalEditionEstablished: false as const,
      editionIdentityEstablished: false as const,
      pageOrFolioLocatorEstablished: false as const,
      editorialIndependenceEstablished: false as const,
    }),
    Object.freeze({
      witnessId: 'R168-W03-DONGLI-ZIPING-26-GENGXIN',
      workTitle: '子平真詮',
      attributedAuthor: '沈孝瞻',
      sourceLayer: 'SHEN_TEXT_PUBLIC_TRANSCRIPTION' as const,
      sectionLocator: '秘本子平真詮卷二 / 二十六、論行運成格變格',
      url: 'https://donglishuzhai.net/chapter/3739.html',
      observedSurface: '庚辛' as const,
      observedExcerpt: '而命有庚辛之類是也',
      publicDigitalTranscription: true as const,
      historicalCriticalEditionEstablished: false as const,
      editionIdentityEstablished: false as const,
      pageOrFolioLocatorEstablished: false as const,
      editorialIndependenceEstablished: false as const,
    }),
    Object.freeze({
      witnessId: 'R168-W04-TIANYA-ZIPING-26-GENGXIN',
      workTitle: '子平真詮',
      attributedAuthor: '沈孝瞻',
      sourceLayer: 'SHEN_TEXT_PUBLIC_TRANSCRIPTION' as const,
      sectionLocator: '二十六、論行運成格變格',
      url: 'https://www.tianyashuku.com/yijing/9643/814127.html',
      observedSurface: '庚辛' as const,
      observedExcerpt: '而命有庚辛之類是也',
      publicDigitalTranscription: true as const,
      historicalCriticalEditionEstablished: false as const,
      editionIdentityEstablished: false as const,
      pageOrFolioLocatorEstablished: false as const,
      editorialIndependenceEstablished: false as const,
    }),
    Object.freeze({
      witnessId: 'R168-W05-NCC-XU-COMMENTARY-SHENYOU',
      workTitle: '子平真詮評注',
      attributedAuthor: '徐樂吾 評注',
      sourceLayer: 'XU_COMMENTARY_PUBLIC_TRANSCRIPTION' as const,
      sectionLocator: '論行運成格變格 / 徐註',
      url: 'https://ncc.com.tw/fate/paleo/bg/bg_034.htm',
      observedSurface: '申酉' as const,
      observedExcerpt: '庚辛，即申酉也',
      publicDigitalTranscription: true as const,
      historicalCriticalEditionEstablished: false as const,
      editionIdentityEstablished: false as const,
      pageOrFolioLocatorEstablished: false as const,
      editorialIndependenceEstablished: false as const,
    }),
    Object.freeze({
      witnessId: 'R168-W06-MASTERKUO-XU-COMMENTARY-SHENYOU',
      workTitle: '子平真詮評注',
      attributedAuthor: '徐樂吾 評注',
      sourceLayer: 'XU_COMMENTARY_PUBLIC_TRANSCRIPTION' as const,
      sectionLocator: '論行運成格變格 / 徐註',
      url: 'https://wx.masterkuo.com/thread-89-1-1.html',
      observedSurface: '申酉' as const,
      observedExcerpt: '庚辛，即申酉也',
      publicDigitalTranscription: true as const,
      historicalCriticalEditionEstablished: false as const,
      editionIdentityEstablished: false as const,
      pageOrFolioLocatorEstablished: false as const,
      editorialIndependenceEstablished: false as const,
    }),
  ]);

export interface R168CandidateBinding {
  bindingId: string;
  upstreamContractId: string;
  sourceSurface: R168CandidateSurface;
  witnessIds: readonly string[];
  sourceWorkIdentityBound: true;
  sectionLocatorBound: true;
  contextWindowBound: true;
  publicTranscriptionCrossCheckObserved: true;
  originalTextLayerDirectWitnessBound: boolean;
  commentaryLayerDirectWitnessBound: boolean;
  historicalCriticalEditionBound: false;
  editionIdentityBound: false;
  pageOrFolioLocatorBound: false;
  independentHistoricalWitnessBound: false;
  minimalitySufficiencyEvidenceBound: false;
  predicateContractStudyAdmission: 'BLOCKED';
  semanticPredicateEstablished: false;
  matchingSufficiencyEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const jiaContract = R167_ACQUISITION_CONTRACTS.find(
  (item) => item.sourceSurface === '命有甲',
);
const gengXinContract = R167_ACQUISITION_CONTRACTS.find(
  (item) => item.sourceSurface === '庚辛',
);
const shenYouContract = R167_ACQUISITION_CONTRACTS.find(
  (item) => item.sourceSurface === '申酉',
);

if (
  jiaContract === undefined ||
  gengXinContract === undefined ||
  shenYouContract === undefined
) {
  throw new Error('R168 missing R167 acquisition contract');
}

const candidateBinding = (
  value: Pick<
    R168CandidateBinding,
    | 'bindingId'
    | 'upstreamContractId'
    | 'sourceSurface'
    | 'witnessIds'
    | 'originalTextLayerDirectWitnessBound'
    | 'commentaryLayerDirectWitnessBound'
  >,
): R168CandidateBinding =>
  Object.freeze({
    ...value,
    sourceWorkIdentityBound: true,
    sectionLocatorBound: true,
    contextWindowBound: true,
    publicTranscriptionCrossCheckObserved: true,
    historicalCriticalEditionBound: false,
    editionIdentityBound: false,
    pageOrFolioLocatorBound: false,
    independentHistoricalWitnessBound: false,
    minimalitySufficiencyEvidenceBound: false,
    predicateContractStudyAdmission: 'BLOCKED',
    semanticPredicateEstablished: false,
    matchingSufficiencyEstablished: false,
    outcomeSufficiencyEstablished: false,
    settlementEstablished: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R168_CANDIDATE_BINDINGS: readonly R168CandidateBinding[] =
  Object.freeze([
    candidateBinding({
      bindingId: 'R168-B01-RESCUE-JIA-ORIGINAL-TEXT',
      upstreamContractId: jiaContract.contractId,
      sourceSurface: '命有甲',
      witnessIds: Object.freeze([
        'R168-W01-DONGLI-ZIPING-26-JIA',
        'R168-W02-TIANYA-ZIPING-26-JIA',
      ]),
      originalTextLayerDirectWitnessBound: true,
      commentaryLayerDirectWitnessBound: false,
    }),
    candidateBinding({
      bindingId: 'R168-B02-GENGXIN-ORIGINAL-TEXT',
      upstreamContractId: gengXinContract.contractId,
      sourceSurface: '庚辛',
      witnessIds: Object.freeze([
        'R168-W03-DONGLI-ZIPING-26-GENGXIN',
        'R168-W04-TIANYA-ZIPING-26-GENGXIN',
      ]),
      originalTextLayerDirectWitnessBound: true,
      commentaryLayerDirectWitnessBound: false,
    }),
    candidateBinding({
      bindingId: 'R168-B03-SHENYOU-XU-COMMENTARY',
      upstreamContractId: shenYouContract.contractId,
      sourceSurface: '申酉',
      witnessIds: Object.freeze([
        'R168-W05-NCC-XU-COMMENTARY-SHENYOU',
        'R168-W06-MASTERKUO-XU-COMMENTARY-SHENYOU',
      ]),
      originalTextLayerDirectWitnessBound: false,
      commentaryLayerDirectWitnessBound: true,
    }),
  ]);

export const R168_PAIRED_BREAK_JIA_AUDIT = Object.freeze({
  sourceWork: '子平真詮',
  sectionLocator: '二十六、論行運成格變格',
  breakCaseDirectTextObserved: true,
  rescueCaseDirectJiaPresenceObserved: true,
  breakCaseJiaMentionObserved: false,
  breakCaseJiaAbsenceEstablished: false,
  pairedTextualDifferenceEstablished: true,
  rescueMinimalityEstablished: false,
  rescueSufficiencyEstablished: false,
});

export const R168_GROUPED_SURFACE_AUDIT = Object.freeze({
  gengXinOriginalTextSurfaceObserved: true,
  gengXinGroupedPhraseObserved: true,
  shenYouOriginalTextSurfaceObserved: false,
  shenYouXuCommentarySurfaceObserved: true,
  originalAndCommentaryLayersDistinct: true,
  groupedMemberIndividualSufficiencyEstablished: false,
  groupedAlternativeSufficiencyEstablished: false,
  counterforcePrecedenceEstablished: false,
  changeSettlementEstablished: false,
});

export const R168_REMAINING_ACQUISITION_GAPS = Object.freeze([
  'HISTORICAL_CRITICAL_EDITION_BINDING',
  'EDITION_IDENTITY_BINDING',
  'PAGE_OR_FOLIO_LOCATOR_BINDING',
  'INDEPENDENT_HISTORICAL_WITNESS_BINDING',
  'MINIMALITY_SUFFICIENCY_EVIDENCE_BINDING',
  'SHENYOU_ORIGINAL_TEXT_LAYER_WITNESS_IF_ANY',
] as const);

export const R168_REJECTED_SHORTCUTS = Object.freeze([
  'PUBLIC_TRANSCRIPTION_EQUALS_CRITICAL_EDITION',
  'TWO_WEB_TRANSCRIPTIONS_EQUAL_INDEPENDENT_HISTORICAL_WITNESSES',
  'SECTION_LOCATOR_EQUALS_PAGE_OR_FOLIO_LOCATOR',
  'ORIGINAL_TEXT_AND_XU_COMMENTARY_ARE_ONE_SOURCE_LAYER',
  'XU_COMMENTARY_SHENYOU_EQUALS_SHEN_ORIGINAL_SHENYOU',
  'BREAK_JIA_OMISSION_EQUALS_JIA_ABSENCE',
  'DIRECT_JIA_WITNESS_EQUALS_RESCUE_MINIMALITY',
  'DIRECT_GENGXIN_WITNESS_EQUALS_COUNTERFORCE_SUFFICIENCY',
  'SHENYOU_COMMENTARY_EQUALS_GROUP_MEMBER_SUFFICIENCY',
  'WITNESS_BINDING_EQUALS_EXECUTABLE_RULE',
  'WITNESS_BINDING_EQUALS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R168_SUMMARY = Object.freeze({
  candidateCount: R168_CANDIDATE_BINDINGS.length,
  digitalWitnessCount: R168_DIGITAL_WITNESSES.length,
  originalTextDirectWitnessCandidateCount: R168_CANDIDATE_BINDINGS.filter(
    (item) => item.originalTextLayerDirectWitnessBound,
  ).length,
  commentaryDirectWitnessCandidateCount: R168_CANDIDATE_BINDINGS.filter(
    (item) => item.commentaryLayerDirectWitnessBound,
  ).length,
  historicalCriticalEditionBoundCount: R168_CANDIDATE_BINDINGS.filter(
    (item) => item.historicalCriticalEditionBound,
  ).length,
  admittedCandidateCount: R168_CANDIDATE_BINDINGS.filter(
    (item) => item.predicateContractStudyAdmission !== 'BLOCKED',
  ).length,
  remainingGapCount: R168_REMAINING_ACQUISITION_GAPS.length,
});

export const R168_UPSTREAM_BINDINGS = Object.freeze({
  r167: {
    version: R167_SOURCE_WITNESS_ACQUISITION_CONTRACT_VERSION,
    contractCount: R167_ACQUISITION_CONTRACTS.length,
    actualWitnessAcquired: R167_AUTHORITY.actualWitnessAcquired,
    predicateContractStudyReady: R167_AUTHORITY.predicateContractStudyReady,
  },
});

export const R168_AUTHORITY = Object.freeze({
  status: 'RESEARCH_SOURCE_LAYER_WITNESS_BINDING_PARTIAL_COMPLETE' as const,
  researchOnly: true,
  publicDigitalTranscriptionWitnessesBound: true,
  originalTextLayerJiaWitnessBound: true,
  originalTextLayerGengXinWitnessBound: true,
  commentaryLayerShenYouWitnessBound: true,
  originalTextLayerShenYouWitnessBound: false,
  sourceLayerDistinctionEstablished: true,
  historicalCriticalEditionBound: false,
  editionIdentityBound: false,
  pageOrFolioLocatorBound: false,
  independentHistoricalWitnessBound: false,
  minimalitySufficiencyEvidenceBound: false,
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
