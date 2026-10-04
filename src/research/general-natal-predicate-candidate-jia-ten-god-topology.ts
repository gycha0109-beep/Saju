import {
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  getTenGod,
} from 'manseryeok';
import { manseryeokAdapterMetadata } from '../calculation/manseryeok-adapter.js';
import {
  R172_AUTHORITY,
  R172_JIA_CONTRAST_CASES,
  R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION,
} from './general-natal-predicate-candidate-same-symbol-opposite-role-contrast.js';

export const R176_JIA_TEN_GOD_TOPOLOGY_VERSION = '0.1.0-research' as const;

export type R176RoleTopology =
  | 'JIA_DIRECTLY_CONTROLS_OFFICER'
  | 'JIA_CONTROLS_HURT_OFFICER';

const negativeCase = R172_JIA_CONTRAST_CASES.find(
  (item) => item.roleClass === 'FORMATION_OPPOSITION',
);
const protectiveCase = R172_JIA_CONTRAST_CASES.find(
  (item) => item.roleClass === 'OFFICER_PROTECTION',
);

if (negativeCase === undefined || protectiveCase === undefined) {
  throw new Error('R176 missing R172 contrast fixtures');
}

export const R176_UPSTREAM_TEN_GOD_SOURCE = Object.freeze({
  localAdapterEngineName: manseryeokAdapterMetadata.engineName,
  localAdapterEngineVersion: manseryeokAdapterMetadata.engineVersion,
  upstreamRepository: 'https://github.com/yhj1024/manseryeok',
  inspectedCommit: 'fba3253d7305b8b61189bd78318a7a27ed8c9b09',
  inspectedPath: 'src/features/ten-gods.ts',
  elementRelationPath: 'src/constants.ts',
  algorithmFunction: 'getTenGod',
  dayMasterRelativeCalculation: true,
  sameYinYangSelectsPeerOutputPartialClasses: true,
  differentYinYangSelectsRobWealthOfficerResourceProperClasses: true,
});

export const R176_JIA_RELATION_ROWS = Object.freeze([
  Object.freeze({
    rowId: 'R176-R01-REN-JIA-JI',
    upstreamCaseId: negativeCase.caseId,
    dayMaster: '임' as const,
    dayMasterHanja: '壬' as const,
    dayMasterElement: getHeavenlyStemElement('임'),
    dayMasterYinYang: getHeavenlyStemYinYang('임'),
    jiaStem: '갑' as const,
    jiaHanja: '甲' as const,
    jiaElement: getHeavenlyStemElement('갑'),
    jiaYinYang: getHeavenlyStemYinYang('갑'),
    jiaTenGod: getTenGod('임', '갑'),
    relatedLuckStem: '기' as const,
    relatedLuckStemHanja: '己' as const,
    relatedLuckTenGod: getTenGod('임', '기'),
    elementTopology: 'WATER_GENERATES_WOOD_AND_WOOD_CONTROLS_EARTH' as const,
    roleTopology: 'JIA_DIRECTLY_CONTROLS_OFFICER' as R176RoleTopology,
    sourceReportedRole: negativeCase.reportedRoleSurface,
    sourceRoleClass: negativeCase.roleClass,
    tenGodRelationObserved: true,
    fiveElementRelationObserved: true,
    roleTopologyConsistentWithSourceCommentary: true,
    causalSufficiencyEstablished: false,
    settlementEstablished: false,
    executableResolverAuthorized: false,
  }),
  Object.freeze({
    rowId: 'R176-R02-DING-JIA-WU-REN',
    upstreamCaseId: protectiveCase.caseId,
    dayMaster: '정' as const,
    dayMasterHanja: '丁' as const,
    dayMasterElement: getHeavenlyStemElement('정'),
    dayMasterYinYang: getHeavenlyStemYinYang('정'),
    jiaStem: '갑' as const,
    jiaHanja: '甲' as const,
    jiaElement: getHeavenlyStemElement('갑'),
    jiaYinYang: getHeavenlyStemYinYang('갑'),
    jiaTenGod: getTenGod('정', '갑'),
    harmfulLuckStem: '무' as const,
    harmfulLuckStemHanja: '戊' as const,
    harmfulLuckTenGod: getTenGod('정', '무'),
    protectedOfficerStem: '임' as const,
    protectedOfficerStemHanja: '壬' as const,
    protectedOfficerTenGod: getTenGod('정', '임'),
    elementTopology: 'WOOD_CONTROLS_EARTH_WHILE_WOOD_GENERATES_FIRE' as const,
    roleTopology: 'JIA_CONTROLS_HURT_OFFICER' as R176RoleTopology,
    sourceReportedRole: protectiveCase.reportedRoleSurface,
    sourceRoleClass: protectiveCase.roleClass,
    tenGodRelationObserved: true,
    fiveElementRelationObserved: true,
    roleTopologyConsistentWithSourceCommentary: true,
    causalSufficiencyEstablished: false,
    settlementEstablished: false,
    executableResolverAuthorized: false,
  }),
]);

export const R176_TOPOLOGY_AUDIT = Object.freeze({
  sameComparedStem: '甲' as const,
  comparedCaseCount: R176_JIA_RELATION_ROWS.length,
  observedJiaTenGods: Object.freeze(
    R176_JIA_RELATION_ROWS.map((item) => item.jiaTenGod),
  ),
  distinctJiaTenGodCount: new Set(
    R176_JIA_RELATION_ROWS.map((item) => item.jiaTenGod),
  ).size,
  sameSymbolDifferentDayMasterTenGodObserved: true,
  negativeCaseJiaTenGodIsFoodGod:
    R176_JIA_RELATION_ROWS[0]?.jiaTenGod === '식신',
  protectiveCaseJiaTenGodIsProperResource:
    R176_JIA_RELATION_ROWS[1]?.jiaTenGod === '정인',
  negativeCaseLuckOfficerIsProperOfficer:
    R176_JIA_RELATION_ROWS[0]?.relatedLuckTenGod === '정관',
  protectiveCaseHarmfulLuckIsHurtingOfficer:
    R176_JIA_RELATION_ROWS[1]?.harmfulLuckTenGod === '상관',
  protectiveCaseProtectedStemIsProperOfficer:
    R176_JIA_RELATION_ROWS[1]?.protectedOfficerTenGod === '정관',
  tenGodDifferenceConsistentWithOppositeRoleObservation: true,
  tenGodDifferenceEstablishesOutcomeSufficiency: false,
  relationTopologyEstablishesSettlement: false,
});

export const R176_RELATION_TOPOLOGY_BOUNDARY = Object.freeze({
  tenGodIdentityIsDayMasterRelative: true,
  sameHeavenlyStemDoesNotImplySameTenGodAcrossDayMasters: true,
  elementControlEdgeDoesNotEncodeStrength: true,
  elementControlEdgeDoesNotEncodeTransparency: true,
  elementControlEdgeDoesNotEncodeRooting: true,
  elementControlEdgeDoesNotEncodeCombinationOrClashResolution: true,
  topologyDoesNotEncodeLuckDurationOrTiming: true,
  topologyDoesNotEstablishFinalFormationOutcome: true,
});

export const R176_REQUIRED_FOLLOW_UP = Object.freeze([
  'STRENGTH_AND_ROOTING_REQUIREMENTS_FOR_JIA_ROLE',
  'TRANSPARENCY_REQUIREMENTS_FOR_JIA_ROLE',
  'COMBINATION_INTERFERENCE_ON_JIA_TARGET_EDGE',
  'LUCK_TRIGGER_ACTIVATION_SCOPE',
  'COUNTEREXAMPLES_WITH_SAME_TEN_GOD_BUT_DIFFERENT_OUTCOME',
] as const);

export const R176_REJECTED_SHORTCUTS = Object.freeze([
  'SAME_JIA_EQUALS_SAME_TEN_GOD',
  'FOOD_GOD_JIA_ALWAYS_HARMS_OFFICER',
  'PROPER_RESOURCE_JIA_ALWAYS_PROTECTS_OFFICER',
  'WOOD_CONTROLS_EARTH_EQUALS_AUTOMATIC_SETTLEMENT',
  'TEN_GOD_IDENTITY_EQUALS_CAUSAL_SUFFICIENCY',
  'TEN_GOD_DIFFERENCE_EQUALS_COMPLETE_EXPLANATION',
  'RELATION_TOPOLOGY_EQUALS_STRENGTH_MODEL',
  'RELATION_TOPOLOGY_EQUALS_EXECUTABLE_RESOLVER',
  'TOPOLOGY_AS_NUMERIC_WEIGHT',
  'TOPOLOGY_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R176_GOVERNANCE = Object.freeze({
  upstreamOppositeRoleObserved: R172_AUTHORITY.oppositeReportedRoleObserved,
  upstreamConfigurationDependenceObserved:
    R172_AUTHORITY.configurationDependenceObserved,
  upstreamStandaloneJiaPredicateStillClosed:
    !R172_AUTHORITY.standaloneJiaPredicateAuthorized,
  actualPinnedTenGodFunctionUsedForResearchRows: true,
  calculationFactDistinctFromResearchCausalInterpretation: true,
  topologyDistinctFromOutcomeSufficiency: true,
  topologyDistinctFromSettlement: true,
});

export const R176_SUMMARY = Object.freeze({
  caseCount: R176_JIA_RELATION_ROWS.length,
  distinctJiaTenGodCount: R176_TOPOLOGY_AUDIT.distinctJiaTenGodCount,
  roleTopologyCount: new Set(
    R176_JIA_RELATION_ROWS.map((item) => item.roleTopology),
  ).size,
  causalSufficiencyEstablishedCount: R176_JIA_RELATION_ROWS.filter(
    (item) => item.causalSufficiencyEstablished,
  ).length,
  settlementEstablishedCount: R176_JIA_RELATION_ROWS.filter(
    (item) => item.settlementEstablished,
  ).length,
  requiredFollowUpCount: R176_REQUIRED_FOLLOW_UP.length,
});

export const R176_UPSTREAM_BINDINGS = Object.freeze({
  r172: {
    version: R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION,
    configurationDependenceObserved:
      R172_AUTHORITY.configurationDependenceObserved,
    standaloneJiaPredicateAuthorized:
      R172_AUTHORITY.standaloneJiaPredicateAuthorized,
  },
  calculation: {
    engineName: manseryeokAdapterMetadata.engineName,
    engineVersion: manseryeokAdapterMetadata.engineVersion,
    adapterName: manseryeokAdapterMetadata.adapterName,
    adapterVersion: manseryeokAdapterMetadata.adapterVersion,
  },
});

export const R176_AUTHORITY = Object.freeze({
  status: 'RESEARCH_JIA_DAY_MASTER_RELATIVE_TEN_GOD_TOPOLOGY_COMPLETE' as const,
  researchOnly: true,
  sameJiaDifferentTenGodAcrossDayMastersEstablished: true,
  renJiaFoodGodRelationEstablished: true,
  dingJiaProperResourceRelationEstablished: true,
  negativeCaseDirectOfficerControlTopologyObserved: true,
  protectiveCaseHurtOfficerControlTopologyObserved: true,
  topologyConsistentWithSourceRoleContrast: true,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  causalSufficiencyEstablished: false,
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
