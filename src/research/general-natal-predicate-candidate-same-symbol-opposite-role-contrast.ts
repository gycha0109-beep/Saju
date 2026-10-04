import {
  R165_AUTHORITY,
  R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION,
  R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES,
} from './general-natal-configuration-specific-predicate-evidence-tier-matrix.js';
import {
  R168_AUTHORITY,
  R168_SOURCE_LAYER_WITNESS_BINDING_VERSION,
} from './general-natal-predicate-candidate-source-layer-witness-binding.js';

export const R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION =
  '0.1.0-research' as const;

export type R172JiaRoleClass =
  | 'FORMATION_OPPOSITION'
  | 'OFFICER_PROTECTION';

export interface R172JiaContrastCase {
  caseId: string;
  roleClass: R172JiaRoleClass;
  dayStem: '壬' | '丁';
  monthBranch: '午' | '辰';
  luckSurface: string;
  targetStructure: string;
  originalTextSurface: string;
  commentarySurface: string;
  jiaExplicitInOriginalSurface: boolean;
  jiaExplicitInCommentarySurface: true;
  reportedRoleSurface: string;
  sourceConfigurationPreserved: true;
  standaloneJiaPredicateAuthorized: false;
  exactConfigurationPredicateEstablished: false;
  matchingSufficiencyEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const jiaCandidate = R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.find(
  (item) => item.sourceSurface === '命有甲',
);

if (jiaCandidate === undefined) {
  throw new Error('R172 missing R165 Jia candidate');
}

const contrastCase = (
  value: Pick<
    R172JiaContrastCase,
    | 'caseId'
    | 'roleClass'
    | 'dayStem'
    | 'monthBranch'
    | 'luckSurface'
    | 'targetStructure'
    | 'originalTextSurface'
    | 'commentarySurface'
    | 'jiaExplicitInOriginalSurface'
    | 'reportedRoleSurface'
  >,
): R172JiaContrastCase =>
  Object.freeze({
    ...value,
    jiaExplicitInCommentarySurface: true,
    sourceConfigurationPreserved: true,
    standaloneJiaPredicateAuthorized: false,
    exactConfigurationPredicateEstablished: false,
    matchingSufficiencyEstablished: false,
    outcomeSufficiencyEstablished: false,
    settlementEstablished: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R172_JIA_CONTRAST_CASES: readonly R172JiaContrastCase[] =
  Object.freeze([
    contrastCase({
      caseId: 'R172-C01-REN-WU-LUCK-JI-JIA-OPPOSES-OFFICER',
      roleClass: 'FORMATION_OPPOSITION',
      dayStem: '壬',
      monthBranch: '午',
      luckSurface: '運透己官',
      targetStructure: '財格行運透官 / 成格而不喜',
      originalTextSurface: '壬生午月，運透己官，而本命有甲乙之類是也',
      commentarySurface: '原局透甲，則官星被回剋而無用',
      jiaExplicitInOriginalSurface: true,
      reportedRoleSurface: '甲回剋運中所透官星',
    }),
    contrastCase({
      caseId: 'R172-C02-DING-CHEN-LUCK-WU-JIA-PROTECTS-OFFICER',
      roleClass: 'OFFICER_PROTECTION',
      dayStem: '丁',
      monthBranch: '辰',
      luckSurface: '透壬用官 / 逢戊',
      targetStructure: '官格遇傷官運 / 變格而不忌',
      originalTextSurface: '丁生辰月，透壬用官，逢戊而命有甲',
      commentarySurface: '丁生辰月，壬甲並透，月印護官，不畏傷官之運',
      jiaExplicitInOriginalSurface: true,
      reportedRoleSurface: '甲印護官',
    }),
  ]);

export const R172_SAME_SYMBOL_ROLE_CONTRAST = Object.freeze({
  candidateSurface: jiaCandidate.sourceSurface,
  comparedSymbol: '甲' as const,
  comparedCaseCount: R172_JIA_CONTRAST_CASES.length,
  distinctRoleClassCount: new Set(
    R172_JIA_CONTRAST_CASES.map((item) => item.roleClass),
  ).size,
  sameRoleAcrossComparedContexts: false,
  configurationDependenceObserved: true,
  unconditionalJiaRescuePredicateContradicted: true,
  unconditionalJiaHarmPredicateContradicted: true,
  standalonePresencePredicateSufficient: false,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  boundedOutcomeSufficiencyEstablished: false,
});

export const R172_CONFIGURATION_DIMENSIONS = Object.freeze([
  'DAY_STEM',
  'MONTH_BRANCH',
  'NATAL_TRANSPARENT_STEMS',
  'TARGET_STRUCTURE',
  'LUCK_TRIGGER_SURFACE',
  'ROLE_RELATION_TO_TARGET',
] as const);

export const R172_REJECTED_SHORTCUTS = Object.freeze([
  'JIA_PRESENT_ALWAYS_RESCUES',
  'JIA_PRESENT_ALWAYS_HARMS',
  'MING_YOU_JIA_EQUALS_GLOBAL_RESCUE_PREDICATE',
  'OPPOSITE_ROLE_CONTRAST_EQUALS_EXACT_CONTEXT_PREDICATE',
  'COMMENTARY_ROLE_DESCRIPTION_EQUALS_MATCHING_SUFFICIENCY',
  'COMMENTARY_ROLE_DESCRIPTION_EQUALS_OUTCOME_SUFFICIENCY',
  'ONE_CONTRAST_PAIR_EQUALS_COMPLETE_CONFIGURATION_SPACE',
  'CONFIGURATION_DIMENSION_LIST_EQUALS_MINIMAL_PREDICATE_SET',
  'ROLE_CLASS_AS_NUMERIC_WEIGHT',
  'ROLE_CONTRAST_AS_EXECUTABLE_RESOLVER',
  'ROLE_CONTRAST_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R172_GOVERNANCE = Object.freeze({
  upstreamJiaCandidateBound:
    jiaCandidate.followUpPredicateResearchCandidate &&
    jiaCandidate.evidenceClass === 'SOURCE_EXPLICIT_FEATURE_CANDIDATE',
  upstreamSemanticPredicateStillClosed:
    !R165_AUTHORITY.semanticPredicateEstablished,
  originalTextLayerJiaWitnessAlreadyBound:
    R168_AUTHORITY.originalTextLayerJiaWitnessBound,
  sourceLayerDistinctionPreserved:
    R168_AUTHORITY.sourceLayerDistinctionEstablished,
  commentaryDistinctFromProductionAuthority: true,
  configurationContrastDistinctFromMinimality: true,
  configurationContrastDistinctFromSufficiency: true,
});

export const R172_SUMMARY = Object.freeze({
  caseCount: R172_JIA_CONTRAST_CASES.length,
  roleClassCount: new Set(
    R172_JIA_CONTRAST_CASES.map((item) => item.roleClass),
  ).size,
  configurationDimensionCount: R172_CONFIGURATION_DIMENSIONS.length,
  standaloneJiaPredicateAuthorizedCount: R172_JIA_CONTRAST_CASES.filter(
    (item) => item.standaloneJiaPredicateAuthorized,
  ).length,
  semanticPredicateEstablishedCount: R172_JIA_CONTRAST_CASES.filter(
    (item) => item.exactConfigurationPredicateEstablished,
  ).length,
});

export const R172_UPSTREAM_BINDINGS = Object.freeze({
  r165: {
    version: R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION,
    jiaCandidateId: jiaCandidate.surfaceId,
    semanticPredicateEstablished: R165_AUTHORITY.semanticPredicateEstablished,
  },
  r168: {
    version: R168_SOURCE_LAYER_WITNESS_BINDING_VERSION,
    originalTextLayerJiaWitnessBound:
      R168_AUTHORITY.originalTextLayerJiaWitnessBound,
    sourceLayerDistinctionEstablished:
      R168_AUTHORITY.sourceLayerDistinctionEstablished,
  },
});

export const R172_AUTHORITY = Object.freeze({
  status: 'RESEARCH_SAME_SYMBOL_OPPOSITE_ROLE_CONFIGURATION_CONTRAST_COMPLETE' as const,
  researchOnly: true,
  sameJiaSymbolComparedAcrossTwoConfigurations: true,
  oppositeReportedRoleObserved: true,
  configurationDependenceObserved: true,
  unconditionalJiaRescuePredicateContradicted: true,
  unconditionalJiaHarmPredicateContradicted: true,
  standaloneJiaPredicateAuthorized: false,
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
