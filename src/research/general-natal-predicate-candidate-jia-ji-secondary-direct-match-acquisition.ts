import {
  R183_AUTHORITY,
  R183_R179_REQUIREMENT_REASSESSMENT,
} from './general-natal-predicate-candidate-jia-ji-ke-he-near-match-topology-audit.js';

export const R184_JIA_JI_SECONDARY_DIRECT_MATCH_ACQUISITION_VERSION =
  '0.1.0-research' as const;

export type R184SecondaryAuthorityClass =
  | 'MODERN_SECONDARY_DIRECT_RULE'
  | 'MODERN_SECONDARY_DIRECT_CASE'
  | 'MODERN_SCHOOL_COMPETING_FRAME';

export const R184_SECONDARY_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'R184-C01-HANXIANGTANG-JIA-JI-HE-ER-BU-HUA',
    authorityClass: 'MODERN_SECONDARY_DIRECT_RULE' as const,
    sourceLabel: '详述天干地支的作用关系',
    sourceUrl:
      'https://www.hanxiangtang.com/xcx/discuz.php?mod=view&tid=3823',
    publicationSurface: 'web article',
    exactPair: Object.freeze(['甲', '己'] as const),
    conditionSurfaceObserved: true,
    conditionSummary:
      'When Jia and Ji both have root/support, the article treats Jia-Ji as combining without transformation and then discusses generation/control.',
    exactControlInsideCombinationObserved: true,
    mutualRestraintOrBindingLanguageObserved: true,
    bothSidesReducedLanguageObserved: true,
    exactNonDayMasterCaseObserved: false,
    primaryOrCanonicalWitnessBound: false,
    originalAuthorOrFirstPublicationBound: false,
    lineageIndependenceEstablished: false,
    normativeAuthorityAcquired: false,
  }),
  Object.freeze({
    candidateId: 'R184-C02-READ01-NON-DAY-MASTER-JIA-JI-CASE',
    authorityClass: 'MODERN_SECONDARY_DIRECT_CASE' as const,
    sourceLabel: '命理基础——合、刑、冲、克的相互制约',
    sourceUrl: 'https://read01.com/zh-sg/Rmo3Ea.html',
    publicationSurface: 'web article/republication',
    exactPair: Object.freeze(['甲', '己'] as const),
    dayStem: '庚' as const,
    bothJiaAndJiNonDayMaster: true,
    exactCombinationObserved: true,
    controllerRoleAssignedToJia: true,
    controlledRoleAssignedToJi: true,
    differentiatedFunctionalLossClaimObserved: true,
    exactSamePairCoexistenceTopologyObserved: true,
    primaryOrCanonicalWitnessBound: false,
    originalAuthorOrFirstPublicationBound: false,
    lineageIndependenceEstablished: false,
    normativeAuthorityAcquired: false,
  }),
  Object.freeze({
    candidateId: 'R184-C03-READ01-HE-ZHONG-YOU-KE-CASE',
    authorityClass: 'MODERN_SECONDARY_DIRECT_CASE' as const,
    sourceLabel: '命理基础——合、刑、冲、克的相互制约',
    sourceUrl: 'https://read01.com/zh-sg/Rmo3Ea.html',
    publicationSurface: 'web article/republication',
    exactPair: Object.freeze(['甲', '己'] as const),
    dayStem: '己' as const,
    bothJiaAndJiNonDayMaster: false,
    exactCombinationObserved: true,
    exactControlInsideCombinationObserved: true,
    reducedControlStrengthClaimObserved: true,
    exactSamePairCoexistenceTopologyObserved: true,
    primaryOrCanonicalWitnessBound: false,
    originalAuthorOrFirstPublicationBound: false,
    lineageIndependenceEstablished: false,
    normativeAuthorityAcquired: false,
  }),
  Object.freeze({
    candidateId: 'R184-C04-HEYIX-MINGLI-GUOSANGUAN-FRAME',
    authorityClass: 'MODERN_SCHOOL_COMPETING_FRAME' as const,
    sourceLabel: '四柱八字学详论十天干和三十二地支功能作用',
    sourceUrl: 'https://m.heyix.com/y_Article/3030.html',
    publicationSurface: 'web article citing 命理过三关',
    exactPair: Object.freeze(['甲', '己'] as const),
    multipleJiaJiRelationModesObserved: true,
    controlModeObserved: true,
    mutualBindingModeObserved: true,
    transformationModeObserved: true,
    singleDeterministicSettlementRejectedBySourceFrame: true,
    namedModernSchoolReferenceObserved: true,
    citedBookPrimaryTextAcquired: false,
    primaryOrCanonicalWitnessBound: false,
    lineageIndependenceEstablished: false,
    normativeAuthorityAcquired: false,
  }),
]);

export const R184_DIRECT_MATCH_AUDIT = Object.freeze({
  candidateCount: R184_SECONDARY_CANDIDATES.length,
  exactPairCandidateCount: R184_SECONDARY_CANDIDATES.filter(
    (item) => item.exactPair[0] === '甲' && item.exactPair[1] === '己',
  ).length,
  exactSamePairCoexistenceCandidateCount:
    R184_SECONDARY_CANDIDATES.filter(
      (item) =>
        'exactSamePairCoexistenceTopologyObserved' in item &&
        item.exactSamePairCoexistenceTopologyObserved === true,
    ).length,
  exactNonDayMasterDirectCaseCandidateCount:
    R184_SECONDARY_CANDIDATES.filter(
      (item) =>
        'bothJiaAndJiNonDayMaster' in item &&
        item.bothJiaAndJiNonDayMaster === true &&
        'exactSamePairCoexistenceTopologyObserved' in item &&
        item.exactSamePairCoexistenceTopologyObserved === true,
    ).length,
  modernRuleCandidateCount: R184_SECONDARY_CANDIDATES.filter(
    (item) => item.authorityClass === 'MODERN_SECONDARY_DIRECT_RULE',
  ).length,
  modernCaseCandidateCount: R184_SECONDARY_CANDIDATES.filter(
    (item) => item.authorityClass === 'MODERN_SECONDARY_DIRECT_CASE',
  ).length,
  competingModernFrameCount: R184_SECONDARY_CANDIDATES.filter(
    (item) => item.authorityClass === 'MODERN_SCHOOL_COMPETING_FRAME',
  ).length,
  primaryOrCanonicalWitnessBoundCount:
    R184_SECONDARY_CANDIDATES.filter(
      (item) => item.primaryOrCanonicalWitnessBound,
    ).length,
  lineageIndependentCandidateCount:
    R184_SECONDARY_CANDIDATES.filter(
      (item) => item.lineageIndependenceEstablished,
    ).length,
  normativeAuthorityAcquiredCount:
    R184_SECONDARY_CANDIDATES.filter(
      (item) => item.normativeAuthorityAcquired,
    ).length,
});

export const R184_PROVENANCE_BOUNDARY = Object.freeze({
  directTopologyCandidateNowExists: true,
  exactNonDayMasterDirectCaseCandidateNowExists: true,
  modernSecondaryMayGuidePrimarySourceSearch: true,
  modernSecondaryMaySatisfyNormativeAuthorityByItself: false,
  repeatedWebTextMayBeAssumedIndependent: false,
  originalAuthorOrFirstPublicationEstablished: false,
  primaryPrintedWitnessEstablished: false,
  canonicalTraditionalLineageEstablished: false,
  competingModernOutcomeFramesObserved: true,
});

export const R184_R179_REQUIREMENT_REASSESSMENT = Object.freeze({
  requirementId: R183_R179_REQUIREMENT_REASSESSMENT.requirementId,
  r183ExactPairTraditionalDualRelationDeclarationsObserved:
    R183_AUTHORITY.exactPairTraditionalDualRelationSubstrateObserved,
  r183ExactPairSameConfigurationSettlementObserved:
    R183_AUTHORITY.exactPairSameConfigurationCoexistenceNarrationObserved,
  r184SecondaryExactSamePairCoexistenceCandidateObserved: true,
  r184SecondaryExactNonDayMasterDirectCaseObserved: true,
  primaryOrCanonicalDirectMatchAuthorityObserved: false,
  currentlySatisfiedByNormativeAuthority: false,
  remainingGap:
    'Trace the direct-match secondary rule/case to an attributable primary, printed, or otherwise governed source lineage and resolve competing modern outcome frames before semantic admission.',
});

export const R184_SEMANTIC_BOUNDARY = Object.freeze({
  secondaryControlInsideCombinationMayBeCandidate: true,
  secondaryReducedControlStrengthMayBeCandidate: true,
  secondaryDifferentiatedFunctionalLossMayBeCandidate: true,
  secondaryMutualBindingMayBeCandidate: true,
  anyCandidateIsEstablishedJiaJiOutcome: false,
  reducedControlStrengthMayBeNumericWeight: false,
  differentiatedFunctionalLossMayBeProductionClaim: false,
  mutualBindingMayBeGenericJiaJiVerdict: false,
  directMatchTopologyDoesNotCloseAuthorityGap: true,
});

export const R184_REQUIRED_FOLLOW_UP = Object.freeze([
  'TRACE_DIRECT_MATCH_SECONDARY_TEXT_TO_EARLIEST_ATTRIBUTABLE_SOURCE',
  'ACQUIRE_PRINTED_OR_PRIMARY_WITNESS_FOR_DIRECT_MATCH_RULE_IF_AVAILABLE',
  'COLLATE_DUPLICATE_WEB_TEXTS_FOR_DERIVATIVE_LINEAGE',
  'COMPARE_DIRECT_RULE_WITH_COMPETING_MODERN_JIA_JI_FRAME',
  'AUDIT_CONTEXT_REQUIREMENTS_BEFORE_ANY_OUTCOME_ADMISSION',
] as const);

export const R184_REJECTED_SHORTCUTS = Object.freeze([
  'DIRECT_MATCH_WEB_CASE_EQUALS_NORMATIVE_AUTHORITY',
  'EXACT_NON_DAY_MASTER_SECONDARY_CASE_EQUALS_R172_SETTLEMENT',
  'HE_ZHONG_YOU_KE_EQUALS_UNIVERSAL_JIA_JI_RULE',
  'KE_LI_JIAO_XIAO_EQUALS_NUMERIC_WEIGHT',
  'FUNCTIONAL_LOSS_CLAIM_EQUALS_ENGINE_ROLE_REASSIGNMENT',
  'DUPLICATE_WEB_TEXT_EQUALS_INDEPENDENT_CORROBORATION',
  'MODERN_SCHOOL_RULE_EQUALS_CLASSICAL_CANON',
] as const);

export const R184_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_JIA_JI_SECONDARY_DIRECT_MATCH_CANDIDATES_ACQUIRED' as const,
  researchOnly: true,
  exactPairSecondaryDirectMatchCandidateObserved: true,
  exactNonDayMasterSecondaryDirectCaseObserved: true,
  exactPairTraditionalDualRelationSubstratePreserved:
    R183_AUTHORITY.exactPairTraditionalDualRelationSubstrateObserved,
  primaryOrCanonicalDirectMatchAuthorityObserved: false,
  originalSourceLineageResolved: false,
  competingModernOutcomeFramesObserved: true,
  pairLocalNormativeAuthorityAcquired: false,
  pairLocalInteractionOutcomeEstablished: false,
  coexistenceSettlementEstablished: false,
  exactContextSettlementEstablished: false,
  genericControlOverCombinationPrecedenceEstablished: false,
  genericCombinationOverControlPrecedenceEstablished: false,
  crossRelationPrecedenceAuthorized: false,
  competingRelationSettlementResolved: false,
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
