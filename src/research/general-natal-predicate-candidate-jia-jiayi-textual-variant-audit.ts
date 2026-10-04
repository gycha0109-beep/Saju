import {
  R172_AUTHORITY,
  R172_JIA_CONTRAST_CASES,
  R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION,
} from './general-natal-predicate-candidate-same-symbol-opposite-role-contrast.js';

export const R173_JIA_JIAYI_TEXTUAL_VARIANT_AUDIT_VERSION =
  '0.1.0-research' as const;

export type R173VariantClass = 'JIA_ONLY' | 'JIA_YI';

export interface R173PublicTranscriptionWitness {
  witnessId: string;
  sourceLabel: string;
  url: string;
  sectionLocator: '論行運成格變格';
  variantClass: R173VariantClass;
  observedSurface: string;
  publicTranscription: true;
  physicalEditionIdentityBound: false;
  printedPageOrFolioBound: false;
  lineageIndependenceEstablished: false;
  canonicalReadingAuthorized: false;
}

export const R173_PUBLIC_TRANSCRIPTION_WITNESSES:
  readonly R173PublicTranscriptionWitness[] = Object.freeze([
    Object.freeze({
      witnessId: 'R173-W01-TIANYA-JIAYI',
      sourceLabel: '天涯書庫 子平真詮',
      url: 'https://www.tianyashuku.com/yijing/9643/814127.html',
      sectionLocator: '論行運成格變格' as const,
      variantClass: 'JIA_YI' as const,
      observedSurface: '如壬生午月，運透己官，而本命有甲乙之類是也',
      publicTranscription: true as const,
      physicalEditionIdentityBound: false as const,
      printedPageOrFolioBound: false as const,
      lineageIndependenceEstablished: false as const,
      canonicalReadingAuthorized: false as const,
    }),
    Object.freeze({
      witnessId: 'R173-W02-NCC-JIAYI',
      sourceLabel: '子平真詮評註 公開 전사',
      url: 'https://ncc.com.tw/fate/paleo/bg/bg_034.htm',
      sectionLocator: '論行運成格變格' as const,
      variantClass: 'JIA_YI' as const,
      observedSurface: '如壬生午月，運透己官，而本命有甲乙之類是也',
      publicTranscription: true as const,
      physicalEditionIdentityBound: false as const,
      printedPageOrFolioBound: false as const,
      lineageIndependenceEstablished: false as const,
      canonicalReadingAuthorized: false as const,
    }),
    Object.freeze({
      witnessId: 'R173-W03-ANHAPPY-PDF-JIAYI',
      sourceLabel: '子平真詮 沈孝瞻原著 공개 PDF 전사',
      url: 'https://www.anhappy.com/share/books/others/books/%E5%9B%BD%E5%AD%A6/%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%AF%A0-%E6%B2%88%E5%AD%9D%E7%9E%BB%E5%8E%9F%E8%91%97.pdf',
      sectionLocator: '論行運成格變格' as const,
      variantClass: 'JIA_YI' as const,
      observedSurface: '如壬生午月，運透己官，而本命有甲乙之類是也',
      publicTranscription: true as const,
      physicalEditionIdentityBound: false as const,
      printedPageOrFolioBound: false as const,
      lineageIndependenceEstablished: false as const,
      canonicalReadingAuthorized: false as const,
    }),
    Object.freeze({
      witnessId: 'R173-W04-DONGLI-JIA',
      sourceLabel: '東里書齋 秘本子平真詮卷二',
      url: 'https://donglishuzhai.net/chapter/3739.html',
      sectionLocator: '論行運成格變格' as const,
      variantClass: 'JIA_ONLY' as const,
      observedSurface: '如壬生午月，運透己官，而本命有甲之類是也',
      publicTranscription: true as const,
      physicalEditionIdentityBound: false as const,
      printedPageOrFolioBound: false as const,
      lineageIndependenceEstablished: false as const,
      canonicalReadingAuthorized: false as const,
    }),
  ]);

const r172FormationOppositionCase = R172_JIA_CONTRAST_CASES.find(
  (item) => item.roleClass === 'FORMATION_OPPOSITION',
);

if (r172FormationOppositionCase === undefined) {
  throw new Error('R173 missing R172 formation-opposition case');
}

export const R173_VARIANT_AUDIT = Object.freeze({
  comparedCaseId: r172FormationOppositionCase.caseId,
  comparedContextStable: Object.freeze({
    dayStem: r172FormationOppositionCase.dayStem,
    monthBranch: r172FormationOppositionCase.monthBranch,
    luckSurface: r172FormationOppositionCase.luckSurface,
    targetStructure: r172FormationOppositionCase.targetStructure,
  }),
  variantClassesObserved: Object.freeze(['JIA_ONLY', 'JIA_YI'] as const),
  jiaPresentAcrossAllObservedVariants:
    R173_PUBLIC_TRANSCRIPTION_WITNESSES.every((item) =>
      item.observedSurface.includes('甲'),
    ),
  yiPresentAcrossAllObservedVariants:
    R173_PUBLIC_TRANSCRIPTION_WITNESSES.every((item) =>
      item.observedSurface.includes('乙'),
    ),
  yiPresenceTextuallyStable: false,
  canonicalVariantEstablished: false,
  physicalEditionVariantMappingEstablished: false,
  variantLineageEstablished: false,
  majorityVoteCanonicalizationAuthorized: false,
  jiaOppositeRoleContrastStillSupported: true,
  yiOppositeRoleContrastSupported: false,
});

export const R173_VARIANT_SEMANTIC_BOUNDARY = Object.freeze({
  jiaNegativeContextPresenceRobustAcrossObservedVariants: true,
  yiNegativeContextPresenceRobustAcrossObservedVariants: false,
  jiaStandaloneHarmPredicateAuthorized: false,
  yiStandaloneHarmPredicateAuthorized: false,
  jiaYiGroupedPredicateAuthorized: false,
  jiaYiInterchangeabilityAuthorized: false,
  yiAbsenceInJiaOnlyWitnessEstablished: false,
  exactNegativeCasePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
});

export const R173_REQUIRED_FOLLOW_UP = Object.freeze([
  'PHYSICAL_EDITION_IDENTITY_FOR_JIA_ONLY_WITNESS',
  'PHYSICAL_EDITION_IDENTITY_FOR_JIAYI_WITNESSES',
  'PRINTED_PAGE_OR_FOLIO_FOR_EACH_VARIANT_CLASS',
  'VARIANT_LINEAGE_COLLATION',
  'YI_ROLE_IN_FORMATION_OPPOSITION_CONTEXT',
  'JIA_VERSUS_YI_FUNCTIONAL_DISTINCTION',
] as const);

export const R173_REJECTED_SHORTCUTS = Object.freeze([
  'MORE_TRANSCRIPTIONS_EQUAL_CANONICAL_READING',
  'JIA_YI_MAJORITY_EQUALS_ORIGINAL_TEXT',
  'JIA_ONLY_VARIANT_EQUALS_YI_ABSENCE',
  'JIA_YI_VARIANT_EQUALS_YI_INDEPENDENT_SUFFICIENCY',
  'JIA_YI_VARIANT_EQUALS_JIA_YI_INTERCHANGEABILITY',
  'PUBLIC_TRANSCRIPTION_VARIANT_EQUALS_EDITION_VARIANT',
  'VARIANT_COUNT_EQUALS_EVIDENCE_WEIGHT',
  'TEXTUAL_VARIANT_EQUALS_SEMANTIC_VARIANT',
  'R172_JIA_CONTRAST_EQUALS_YI_CONTRAST',
  'VARIANT_AUDIT_AS_EXECUTABLE_RESOLVER',
] as const);

export const R173_GOVERNANCE = Object.freeze({
  upstreamConfigurationDependenceObserved:
    R172_AUTHORITY.configurationDependenceObserved,
  upstreamStandaloneJiaPredicateStillClosed:
    !R172_AUTHORITY.standaloneJiaPredicateAuthorized,
  upstreamExactConfigurationTupleStillClosed:
    !R172_AUTHORITY.exactConfigurationTuplePredicateEstablished,
  r172NegativeCaseContainsJia:
    r172FormationOppositionCase.originalTextSurface.includes('甲'),
  r172ContrastDoesNotRequireYi:
    R173_PUBLIC_TRANSCRIPTION_WITNESSES.some(
      (item) => item.variantClass === 'JIA_ONLY',
    ),
  textualVariantDistinctFromSemanticPredicate: true,
});

export const R173_SUMMARY = Object.freeze({
  witnessCount: R173_PUBLIC_TRANSCRIPTION_WITNESSES.length,
  variantClassCount: new Set(
    R173_PUBLIC_TRANSCRIPTION_WITNESSES.map((item) => item.variantClass),
  ).size,
  jiaOnlyWitnessCount: R173_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
    (item) => item.variantClass === 'JIA_ONLY',
  ).length,
  jiaYiWitnessCount: R173_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
    (item) => item.variantClass === 'JIA_YI',
  ).length,
  canonicalReadingAuthorizedCount: R173_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
    (item) => item.canonicalReadingAuthorized,
  ).length,
  physicalEditionIdentityBoundCount:
    R173_PUBLIC_TRANSCRIPTION_WITNESSES.filter(
      (item) => item.physicalEditionIdentityBound,
    ).length,
  requiredFollowUpCount: R173_REQUIRED_FOLLOW_UP.length,
});

export const R173_UPSTREAM_BINDINGS = Object.freeze({
  r172: {
    version: R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION,
    formationOppositionCaseId: r172FormationOppositionCase.caseId,
    configurationDependenceObserved:
      R172_AUTHORITY.configurationDependenceObserved,
    standaloneJiaPredicateAuthorized:
      R172_AUTHORITY.standaloneJiaPredicateAuthorized,
  },
});

export const R173_AUTHORITY = Object.freeze({
  status: 'RESEARCH_JIA_JIAYI_TEXTUAL_VARIANT_AUDIT_COMPLETE' as const,
  researchOnly: true,
  jiaAndJiaYiVariantClassesObserved: true,
  jiaPresenceStableAcrossObservedVariants: true,
  yiPresenceStableAcrossObservedVariants: false,
  canonicalVariantEstablished: false,
  physicalEditionVariantMappingEstablished: false,
  variantLineageEstablished: false,
  majorityVoteCanonicalizationAuthorized: false,
  jiaOppositeRoleContrastPreserved: true,
  yiOppositeRoleContrastEstablished: false,
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
