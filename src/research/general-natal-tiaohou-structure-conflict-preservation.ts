import {
  R034_AUTHORITY,
  R034_PRIORITY_MODEL,
  R034_TIAOHOU_PRIORITY_VERSION,
} from './general-natal-tiaohou-priority-conditions.js';
import {
  R039_CORPUS_BOUNDARY,
  R039_YONGXI_CASE_CORPUS_VERSION,
} from './general-natal-yongxi-multimethod-case-corpus.js';
import {
  R040_AUTHORITY,
  R040_NONCOLLAPSING_EVIDENCE_VERSION,
} from './general-natal-noncollapsing-yongxi-evidence.js';
import {
  R136_AUTHORITY,
  R136_YONG_XI_JI_TEMPORAL_CORPUS_VERSION,
} from './general-natal-yong-xi-ji-role-reassignment-temporal-corpus.js';

export const R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION = '0.1.0-research' as const;

export type R137Relation =
  | 'COEXISTING_DIFFERENT_ROLES'
  | 'POTENTIAL_CONFLICT_STRESS_UNRESOLVED'
  | 'CLIMATE_URGENT_WITHOUT_OVERRIDE'
  | 'METHOD_NOT_APPLICABLE'
  | 'INDETERMINATE';

export type R137Provenance =
  | 'SOURCE_GOVERNED_DIRECT'
  | 'SOURCE_GOVERNED_BOUNDARY_REPLAY'
  | 'RESEARCH_SYNTHETIC_STRESS_PROBE';

export interface R137ConflictProbe {
  id: string;
  groupId: string;
  chartOrContext: string;
  tiaohouNeed: string | null;
  structuralNeed: string | null;
  structuralMethod: 'GEJU' | 'STRENGTH_FUIYI' | 'BINGYAO' | 'GENERIC_STRUCTURE' | 'UNRESOLVED';
  relation: R137Relation;
  provenance: R137Provenance;
  sourceRefs: readonly string[];
  sourceRepresentation: string;
  unresolvedOperands: readonly string[];
  r039SeedReplay: boolean;
  sameClimateDifferentStructure: boolean;
  sameStructureDifferentClimate: boolean;
  sourceVerifiedTrueConflict: false;
  syntheticContradiction: boolean;
  methodWinnerAuthorized: false;
  numericPriorityAuthorized: false;
  finalYongShenAuthorized: false;
  executable: false;
}

const probe = (
  value: Omit<
    R137ConflictProbe,
    | 'sourceVerifiedTrueConflict'
    | 'methodWinnerAuthorized'
    | 'numericPriorityAuthorized'
    | 'finalYongShenAuthorized'
    | 'executable'
  >,
): R137ConflictProbe =>
  Object.freeze({
    ...value,
    sourceVerifiedTrueConflict: false,
    methodWinnerAuthorized: false,
    numericPriorityAuthorized: false,
    finalYongShenAuthorized: false,
    executable: false,
  });

export const R137_CONFLICT_PROBES: readonly R137ConflictProbe[] = Object.freeze([
  probe({
    id: 'R137-P01',
    groupId: 'G01-R039-C1',
    chartOrContext: '丁巳 壬子 辛巳 丁酉',
    tiaohouNeed: '火不可缺',
    structuralNeed: '酉金扶身',
    structuralMethod: 'STRENGTH_FUIYI',
    relation: 'COEXISTING_DIFFERENT_ROLES',
    provenance: 'SOURCE_GOVERNED_DIRECT',
    sourceRefs: ['R034:winter-metal-water-fire-required-not-necessarily-yongshen', 'R039:C1'],
    sourceRepresentation: '冬令金水不可缺火，但須以酉金扶身為用',
    unresolvedOperands: [],
    r039SeedReplay: true,
    sameClimateDifferentStructure: false,
    sameStructureDifferentClimate: false,
    syntheticContradiction: false,
  }),
  probe({
    id: 'R137-P02',
    groupId: 'G02-R039-C2',
    chartOrContext: '甲申 丙子 庚辰 甲申',
    tiaohouNeed: '丙火不可缺',
    structuralNeed: '傷官洩秀',
    structuralMethod: 'GEJU',
    relation: 'COEXISTING_DIFFERENT_ROLES',
    provenance: 'SOURCE_GOVERNED_DIRECT',
    sourceRefs: ['R039:C2'],
    sourceRepresentation: '身旺以傷官洩秀為用，丙火調候為配合所不可缺',
    unresolvedOperands: [],
    r039SeedReplay: true,
    sameClimateDifferentStructure: false,
    sameStructureDifferentClimate: false,
    syntheticContradiction: false,
  }),
  probe({
    id: 'R137-P03',
    groupId: 'G03-R039-C3',
    chartOrContext: '戊戌 甲子 己巳 戊辰',
    tiaohouNeed: '巳中丙火',
    structuralNeed: '甲木官星制劫',
    structuralMethod: 'BINGYAO',
    relation: 'COEXISTING_DIFFERENT_ROLES',
    provenance: 'SOURCE_GOVERNED_DIRECT',
    sourceRefs: ['R039:C3'],
    sourceRepresentation: '比劫爭財為病，甲木制劫為用，兼取丙火調候',
    unresolvedOperands: [],
    r039SeedReplay: true,
    sameClimateDifferentStructure: false,
    sameStructureDifferentClimate: false,
    syntheticContradiction: false,
  }),
  ...([
    ['R137-P04', '冬金水', '火調候', '扶身', 'STRENGTH_FUIYI'],
    ['R137-P05', '冬金水', '火調候', '洩秀', 'GEJU'],
    ['R137-P06', '寒濕財格', '火調候', '制劫護財', 'BINGYAO'],
  ] as const).map(([id, context, climate, structure, method]) =>
    probe({
      id,
      groupId: 'G04-COEXISTENCE-REPLAY',
      chartOrContext: context,
      tiaohouNeed: climate,
      structuralNeed: structure,
      structuralMethod: method,
      relation: 'COEXISTING_DIFFERENT_ROLES',
      provenance: 'SOURCE_GOVERNED_BOUNDARY_REPLAY',
      sourceRefs: ['R034:CLIMATE_REQUIRED_ELEMENT_NOT_AUTOMATIC_YONGSHEN', 'R039:SEED_CORPUS'],
      sourceRepresentation: 'method-specific needs may coexist without a single winner',
      unresolvedOperands: [],
      r039SeedReplay: false,
      sameClimateDifferentStructure: false,
      sameStructureDifferentClimate: false,
      syntheticContradiction: false,
    }),
  ),
  ...([
    ['R137-P07', '金水傷官冬令', '火', '傷官洩秀', 'GEJU'],
    ['R137-P08', '身弱冬金', '火', '扶身', 'STRENGTH_FUIYI'],
    ['R137-P09', '寒濕財格', '火', '制劫護財', 'BINGYAO'],
    ['R137-P10', '冬木印格', '火', '月令結構仍須另判', 'GENERIC_STRUCTURE'],
  ] as const).map(([id, context, climate, structure, method]) =>
    probe({
      id,
      groupId: 'G05-CLIMATE-URGENT-NO-GLOBAL-OVERRIDE',
      chartOrContext: context,
      tiaohouNeed: climate,
      structuralNeed: structure,
      structuralMethod: method,
      relation: 'CLIMATE_URGENT_WITHOUT_OVERRIDE',
      provenance: 'SOURCE_GOVERNED_BOUNDARY_REPLAY',
      sourceRefs: ['R034:climate-must-be-considered-beyond-fuyi', 'R034:PRIORITY_MODEL'],
      sourceRepresentation: '調候可急，但不授權全局固定優先序',
      unresolvedOperands: ['GLOBAL_METHOD_PRECEDENCE'],
      r039SeedReplay: false,
      sameClimateDifferentStructure: false,
      sameStructureDifferentClimate: false,
      syntheticContradiction: false,
    }),
  ),
  ...([
    ['R137-P11', '扶身', 'STRENGTH_FUIYI', 'COEXISTING_DIFFERENT_ROLES'],
    ['R137-P12', '傷官洩秀', 'GEJU', 'COEXISTING_DIFFERENT_ROLES'],
    ['R137-P13', '制劫護財', 'BINGYAO', 'CLIMATE_URGENT_WITHOUT_OVERRIDE'],
    ['R137-P14', null, 'UNRESOLVED', 'METHOD_NOT_APPLICABLE'],
  ] as const).map(([id, structure, method, relation]) =>
    probe({
      id,
      groupId: 'G06-SAME-CLIMATE-DIFFERENT-STRUCTURE',
      chartOrContext: 'same winter-fire climate requirement / varied structural context',
      tiaohouNeed: '火',
      structuralNeed: structure,
      structuralMethod: method,
      relation,
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R034:SEASONAL_CONTEXT', 'R039:MULTI_METHOD_BOUNDARY'],
      sourceRepresentation: 'same climate requirement does not determine one structural output',
      unresolvedOperands: relation === 'METHOD_NOT_APPLICABLE' ? ['STRUCTURAL_METHOD_APPLICABILITY'] : [],
      r039SeedReplay: false,
      sameClimateDifferentStructure: true,
      sameStructureDifferentClimate: false,
      syntheticContradiction: false,
    }),
  ),
  ...([
    ['R137-P15', '冬令', '火', 'COEXISTING_DIFFERENT_ROLES'],
    ['R137-P16', '夏令', '水', 'CLIMATE_URGENT_WITHOUT_OVERRIDE'],
    ['R137-P17', '春令', null, 'METHOD_NOT_APPLICABLE'],
    ['R137-P18', '季節狀態未決', null, 'INDETERMINATE'],
  ] as const).map(([id, season, climate, relation]) =>
    probe({
      id,
      groupId: 'G07-SAME-STRUCTURE-DIFFERENT-CLIMATE',
      chartOrContext: `${season} / same structural support requirement`,
      tiaohouNeed: climate,
      structuralNeed: '扶身',
      structuralMethod: 'STRENGTH_FUIYI',
      relation,
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R034:SEASONAL_NON_EQUIVALENCE'],
      sourceRepresentation: 'same structural need does not erase seasonal climate variance',
      unresolvedOperands:
        relation === 'INDETERMINATE'
          ? ['CLIMATE_STATE_CLASSIFICATION']
          : relation === 'METHOD_NOT_APPLICABLE'
            ? ['TIAOHOU_APPLICABILITY']
            : [],
      r039SeedReplay: false,
      sameClimateDifferentStructure: false,
      sameStructureDifferentClimate: true,
      syntheticContradiction: false,
    }),
  ),
  ...([
    ['R137-P19', 'climate requires FIRE / structure stress says FIRE would damage structural use', '火', '避火'],
    ['R137-P20', 'climate requires WATER / structure stress says WATER would damage structural use', '水', '避水'],
    ['R137-P21', 'climate requires WOOD / structure stress says WOOD would damage structural use', '木', '避木'],
    ['R137-P22', 'climate requires METAL / structure stress says METAL would damage structural use', '金', '避金'],
    ['R137-P23', 'climate requires EARTH / structure stress says EARTH would damage structural use', '土', '避土'],
    ['R137-P24', 'climate urgency and structural taboo both unresolved', 'UNRESOLVED_CLIMATE', 'UNRESOLVED_STRUCTURE'],
  ] as const).map(([id, context, climate, structure]) =>
    probe({
      id,
      groupId: 'G08-SYNTHETIC-CONTRADICTION-STRESS',
      chartOrContext: context,
      tiaohouNeed: climate,
      structuralNeed: structure,
      structuralMethod: 'GENERIC_STRUCTURE',
      relation: 'POTENTIAL_CONFLICT_STRESS_UNRESOLVED',
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R034:NO_GLOBAL_PRIORITY', 'R040:UNRESOLVED_CONFLICT_AUTO_TIEBREAK_FORBIDDEN'],
      sourceRepresentation: 'synthetic contradiction used only to test conflict preservation',
      unresolvedOperands: ['EXACT_CHART_EVIDENCE', 'METHOD_APPLICABILITY', 'METHOD_PRECEDENCE'],
      r039SeedReplay: false,
      sameClimateDifferentStructure: false,
      sameStructureDifferentClimate: false,
      syntheticContradiction: true,
    }),
  ),
]);

export const R137_REJECTED_COLLAPSES = Object.freeze([
  'TIAOHOU_ALWAYS_OVERRIDES_STRUCTURE',
  'STRUCTURE_ALWAYS_OVERRIDES_TIAOHOU',
  'CLIMATE_REQUIREMENT_EQUALS_FINAL_YONGSHEN',
  'DIFFERENT_METHOD_OUTPUTS_EQUAL_TRUE_CONFLICT',
  'SYNTHETIC_CONTRADICTION_EQUALS_SOURCE_VERIFIED_CONFLICT',
  'ARRAY_ORDER_AS_PRECEDENCE',
  'NUMERIC_OR_WEIGHTED_METHOD_PRIORITY',
  'UNRESOLVED_CONFLICT_AUTO_TIEBREAK',
] as const);

export const R137_SUMMARY = Object.freeze({
  rowCount: R137_CONFLICT_PROBES.length,
  comparisonGroupCount: new Set(R137_CONFLICT_PROBES.map((item) => item.groupId)).size,
  r039SeedReplayCount: R137_CONFLICT_PROBES.filter((item) => item.r039SeedReplay).length,
  coexistenceCount: R137_CONFLICT_PROBES.filter(
    (item) => item.relation === 'COEXISTING_DIFFERENT_ROLES',
  ).length,
  potentialConflictStressCount: R137_CONFLICT_PROBES.filter(
    (item) => item.relation === 'POTENTIAL_CONFLICT_STRESS_UNRESOLVED',
  ).length,
  climateUrgentWithoutOverrideCount: R137_CONFLICT_PROBES.filter(
    (item) => item.relation === 'CLIMATE_URGENT_WITHOUT_OVERRIDE',
  ).length,
  methodNotApplicableCount: R137_CONFLICT_PROBES.filter(
    (item) => item.relation === 'METHOD_NOT_APPLICABLE',
  ).length,
  indeterminateCount: R137_CONFLICT_PROBES.filter(
    (item) => item.relation === 'INDETERMINATE',
  ).length,
  sameClimateDifferentStructureCount: R137_CONFLICT_PROBES.filter(
    (item) => item.sameClimateDifferentStructure,
  ).length,
  sameStructureDifferentClimateCount: R137_CONFLICT_PROBES.filter(
    (item) => item.sameStructureDifferentClimate,
  ).length,
  sourceVerifiedTrueConflictCount: R137_CONFLICT_PROBES.filter(
    (item) => item.sourceVerifiedTrueConflict,
  ).length,
  syntheticContradictionCount: R137_CONFLICT_PROBES.filter(
    (item) => item.syntheticContradiction,
  ).length,
  methodWinnerAuthorizedCount: R137_CONFLICT_PROBES.filter(
    (item) => item.methodWinnerAuthorized,
  ).length,
  numericPriorityAuthorizedCount: R137_CONFLICT_PROBES.filter(
    (item) => item.numericPriorityAuthorized,
  ).length,
  finalYongShenAuthorizedCount: R137_CONFLICT_PROBES.filter(
    (item) => item.finalYongShenAuthorized,
  ).length,
  executableCount: R137_CONFLICT_PROBES.filter((item) => item.executable).length,
});

export const R137_UPSTREAM_BINDINGS = Object.freeze({
  r034: {
    version: R034_TIAOHOU_PRIORITY_VERSION,
    climateRequiredElementAlwaysFinalYongshen:
      R034_PRIORITY_MODEL.climateRequiredElementAlwaysFinalYongshen,
    climateOverridesStrengthInAllCharts: R034_PRIORITY_MODEL.climateOverridesStrengthInAllCharts,
    singleGlobalPriorityOrderAuthorized: R034_PRIORITY_MODEL.singleGlobalPriorityOrderAuthorized,
    executableTiaohouResolverAuthorized: R034_AUTHORITY.executableTiaohouResolverAuthorized,
    globalPriorityResolverAuthorized: R034_AUTHORITY.globalPriorityResolverAuthorized,
  },
  r039: {
    version: R039_YONGXI_CASE_CORPUS_VERSION,
    trueConflictCaseVerified: R039_CORPUS_BOUNDARY.trueConflictCaseVerified,
    forceSingleWinnerAuthorized: R039_CORPUS_BOUNDARY.forceSingleWinnerAuthorized,
    numericPriorityAuthorized: R039_CORPUS_BOUNDARY.numericPriorityAuthorized,
  },
  r040: {
    version: R040_NONCOLLAPSING_EVIDENCE_VERSION,
    finalYongShenFieldAuthorized: R040_AUTHORITY.finalYongShenFieldAuthorized,
    methodWinnerResolverAuthorized: R040_AUTHORITY.methodWinnerResolverAuthorized,
    chartRoleAssignmentAuthorized: R040_AUTHORITY.chartRoleAssignmentAuthorized,
  },
  r136: {
    version: R136_YONG_XI_JI_TEMPORAL_CORPUS_VERSION,
    genericYongShenResolverAuthorized: R136_AUTHORITY.genericYongShenResolverAuthorized,
    temporalRoleReassignmentResolverAuthorized: R136_AUTHORITY.temporalRoleReassignmentResolverAuthorized,
    productionAuthorityPromoted: R136_AUTHORITY.productionAuthorityPromoted,
  },
});

export const R137_AUTHORITY = Object.freeze({
  status: 'RESEARCH_TIAOHOU_STRUCTURE_CONFLICT_PRESERVATION_COMPLETE' as const,
  researchOnly: true,
  coexistenceDistinctFromConflictObserved: true,
  syntheticConflictDistinctFromSourceVerifiedConflictObserved: true,
  climateUrgencyDistinctFromGlobalOverrideObserved: true,
  sourceVerifiedTrueConflictAuthorized: false,
  tiaohouAlwaysOverridesStructureAuthorized: false,
  structureAlwaysOverridesTiaohouAuthorized: false,
  methodWinnerResolverAuthorized: false,
  automaticTieBreakAuthorized: false,
  numericMethodPriorityAuthorized: false,
  finalYongShenAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
