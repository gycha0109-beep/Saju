import {
  R037_AUTHORITY,
  R037_TONGGUAN_VERSION,
} from './general-natal-tongguan-distinct-primitive.js';
import {
  R038_AUTHORITY,
  R038_BINGYAO_VERSION,
} from './general-natal-bingyao-framing.js';
import {
  R039_CORPUS_BOUNDARY,
  R039_YONGXI_CASE_CORPUS_VERSION,
} from './general-natal-yongxi-multimethod-case-corpus.js';
import {
  R040_AUTHORITY,
  R040_NONCOLLAPSING_EVIDENCE_VERSION,
} from './general-natal-noncollapsing-yongxi-evidence.js';
import {
  R137_AUTHORITY,
  R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION,
} from './general-natal-tiaohou-structure-conflict-preservation.js';

export const R138_TONGGUAN_BINGYAO_CONFLICT_VERSION = '0.1.0-research' as const;

export type R138MethodState =
  | 'RESEARCH_PLAUSIBLE'
  | 'UNRESOLVED'
  | 'NOT_APPLICABLE'
  | 'INDETERMINATE';

export type R138Relation =
  | 'TONGGUAN_PLAUSIBLE_BINGYAO_UNRESOLVED'
  | 'BINGYAO_PLAUSIBLE_TONGGUAN_UNRESOLVED'
  | 'COEXISTING_DISTINCT_RESOLUTION_FAMILIES'
  | 'POTENTIAL_RESOLUTION_CONFLICT_UNRESOLVED'
  | 'METHOD_NOT_APPLICABLE'
  | 'INDETERMINATE';

export type R138Provenance =
  | 'SOURCE_GOVERNED_FAMILY_SEED'
  | 'SOURCE_GOVERNED_BOUNDARY_REPLAY'
  | 'RESEARCH_SYNTHETIC_STRESS_PROBE';

export interface R138ConflictProbe {
  id: string;
  groupId: string;
  chartOrContext: string;
  tongguanState: R138MethodState;
  tongguanNeed: string | null;
  bingyaoState: R138MethodState;
  bingyaoNeed: string | null;
  relation: R138Relation;
  provenance: R138Provenance;
  sourceRefs: readonly string[];
  sourceRepresentation: string;
  unresolvedOperands: readonly string[];
  directFamilySeed: boolean;
  syntheticOpposition: boolean;
  sourceVerifiedCrossMethodTrueConflict: false;
  crossMethodWinnerAuthorized: false;
  numericPriorityAuthorized: false;
  finalYongShenAuthorized: false;
  executable: false;
}

const probe = (
  value: Omit<
    R138ConflictProbe,
    | 'sourceVerifiedCrossMethodTrueConflict'
    | 'crossMethodWinnerAuthorized'
    | 'numericPriorityAuthorized'
    | 'finalYongShenAuthorized'
    | 'executable'
  >,
): R138ConflictProbe =>
  Object.freeze({
    ...value,
    sourceVerifiedCrossMethodTrueConflict: false,
    crossMethodWinnerAuthorized: false,
    numericPriorityAuthorized: false,
    finalYongShenAuthorized: false,
    executable: false,
  });

export const R138_CONFLICT_PROBES: readonly R138ConflictProbe[] = Object.freeze([
  probe({
    id: 'R138-P01',
    groupId: 'G01-TONGGUAN-DIRECT-SEEDS',
    chartOrContext: '癸亥 庚申 甲寅 乙亥',
    tongguanState: 'RESEARCH_PLAUSIBLE',
    tongguanNeed: '金木相戰，取水通關',
    bingyaoState: 'UNRESOLVED',
    bingyaoNeed: null,
    relation: 'TONGGUAN_PLAUSIBLE_BINGYAO_UNRESOLVED',
    provenance: 'SOURCE_GOVERNED_FAMILY_SEED',
    sourceRefs: ['R037:兩神對峙-強弱均平-各不相下', 'XU_COMMENTARY:金木相戰取水通關'],
    sourceRepresentation: 'direct Tongguan example; no governed Bingyao baseline is inferred',
    unresolvedOperands: ['BINGYAO_BASELINE_REQUIREMENT_DIRECTION', 'BINGYAO_APPLICABILITY'],
    directFamilySeed: true,
    syntheticOpposition: false,
  }),
  probe({
    id: 'R138-P02',
    groupId: 'G01-TONGGUAN-DIRECT-SEEDS',
    chartOrContext: '丁酉 丙午 丁酉 己酉',
    tongguanState: 'RESEARCH_PLAUSIBLE',
    tongguanNeed: '火金相戰，取土通關',
    bingyaoState: 'UNRESOLVED',
    bingyaoNeed: null,
    relation: 'TONGGUAN_PLAUSIBLE_BINGYAO_UNRESOLVED',
    provenance: 'SOURCE_GOVERNED_FAMILY_SEED',
    sourceRefs: ['R037:兩神對峙-強弱均平-各不相下', 'XU_COMMENTARY:火金相戰取土通關'],
    sourceRepresentation: 'direct Tongguan example; no fixed disease/remedy identity is inferred',
    unresolvedOperands: ['BINGYAO_DISEASE_IDENTITY', 'BINGYAO_REMEDY_EFFECTIVENESS'],
    directFamilySeed: true,
    syntheticOpposition: false,
  }),
  ...([
    ['R138-P03', 'balanced WOOD/METAL opposition', 'mediating WATER'],
    ['R138-P04', 'balanced FIRE/METAL opposition', 'mediating EARTH'],
    ['R138-P05', 'balanced EARTH/WATER opposition', 'mediator unresolved'],
    ['R138-P06', 'two-force opposition with no side prevailing', 'governed mediator unresolved'],
  ] as const).map(([id, context, need]) =>
    probe({
      id,
      groupId: 'G02-TONGGUAN-PLAUSIBLE-BINGYAO-UNRESOLVED',
      chartOrContext: context,
      tongguanState: 'RESEARCH_PLAUSIBLE',
      tongguanNeed: need,
      bingyaoState: 'UNRESOLVED',
      bingyaoNeed: null,
      relation: 'TONGGUAN_PLAUSIBLE_BINGYAO_UNRESOLVED',
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R037:PRECONDITION_TOPOLOGY', 'R038:CROSS_METHOD_RECONCILIATION_GAP'],
      sourceRepresentation: 'Tongguan topology is supplied synthetically; Bingyao baseline remains unknown',
      unresolvedOperands: ['BINGYAO_BASELINE_REQUIREMENT_DIRECTION', 'BINGYAO_APPLICABILITY'],
      directFamilySeed: false,
      syntheticOpposition: false,
    }),
  ),
  probe({
    id: 'R138-P07',
    groupId: 'G03-BINGYAO-GOVERNED-SEEDS',
    chartOrContext: '戊戌 甲子 己巳 戊辰',
    tongguanState: 'UNRESOLVED',
    tongguanNeed: null,
    bingyaoState: 'RESEARCH_PLAUSIBLE',
    bingyaoNeed: '比劫爭財為病，甲木官星制劫為藥用',
    relation: 'BINGYAO_PLAUSIBLE_TONGGUAN_UNRESOLVED',
    provenance: 'SOURCE_GOVERNED_FAMILY_SEED',
    sourceRefs: ['R038:RELATIONAL_DISEASE_REMEDY', 'R039:C3'],
    sourceRepresentation: 'direct Bingyao case; Tongguan balance/opposition predicates are not inferred',
    unresolvedOperands: ['TWO_FORCE_OPPOSITION', 'RELATIVE_STRENGTH_BALANCE', 'NO_SIDE_PREVAILS'],
    directFamilySeed: true,
    syntheticOpposition: false,
  }),
  probe({
    id: 'R138-P08',
    groupId: 'G03-BINGYAO-GOVERNED-SEEDS',
    chartOrContext: 'governed support-desired Bingyao framing',
    tongguanState: 'UNRESOLVED',
    tongguanNeed: null,
    bingyaoState: 'RESEARCH_PLAUSIBLE',
    bingyaoNeed: '傷其扶者為病；除其病神為藥',
    relation: 'BINGYAO_PLAUSIBLE_TONGGUAN_UNRESOLVED',
    provenance: 'SOURCE_GOVERNED_BOUNDARY_REPLAY',
    sourceRefs: ['R038:support-desired-harm-to-support-is-disease'],
    sourceRepresentation: 'Bingyao relation is bounded; no Tongguan opposition state follows from it',
    unresolvedOperands: ['TONGGUAN_APPLICABILITY', 'MEDIATOR_OR_TRANSFORMATION_SELECTION'],
    directFamilySeed: true,
    syntheticOpposition: false,
  }),
  ...([
    ['R138-P09', 'support desired / support is harmed', 'remove governed harm-to-support'],
    ['R138-P10', 'suppression desired / suppression is removed', 'remove governed disease relation'],
    ['R138-P11', 'disease identity supplied / remedy effectiveness unresolved', 'candidate remedy relation'],
    ['R138-P12', 'baseline requirement supplied / disease relation supplied', 'remedy family unresolved'],
  ] as const).map(([id, context, need]) =>
    probe({
      id,
      groupId: 'G04-BINGYAO-PLAUSIBLE-TONGGUAN-UNRESOLVED',
      chartOrContext: context,
      tongguanState: 'UNRESOLVED',
      tongguanNeed: null,
      bingyaoState: 'RESEARCH_PLAUSIBLE',
      bingyaoNeed: need,
      relation: 'BINGYAO_PLAUSIBLE_TONGGUAN_UNRESOLVED',
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R038:RELATIONAL_FRAMING', 'R037:CROSS_METHOD_RECONCILIATION_GAP'],
      sourceRepresentation: 'Bingyao topology is supplied synthetically; Tongguan preconditions remain unknown',
      unresolvedOperands: ['TWO_FORCE_OPPOSITION', 'RELATIVE_STRENGTH_BALANCE', 'TONGGUAN_APPLICABILITY'],
      directFamilySeed: false,
      syntheticOpposition: false,
    }),
  ),
  ...([
    ['R138-P13', 'balanced opposition plus separate support-damage relation', 'mediator requirement', 'remove disease actor'],
    ['R138-P14', 'balanced opposition plus separate suppression-loss relation', 'harmonize two forces', 'restore suppression relation'],
    ['R138-P15', 'Tongguan mediator and Bingyao remedy occupy different roles', 'mediator unresolved', 'remedy relation unresolved'],
    ['R138-P16', 'both method families represented without identity collapse', 'harmonization need', 'disease-removal need'],
  ] as const).map(([id, context, tg, by]) =>
    probe({
      id,
      groupId: 'G05-COEXISTING-DISTINCT-FAMILIES',
      chartOrContext: context,
      tongguanState: 'RESEARCH_PLAUSIBLE',
      tongguanNeed: tg,
      bingyaoState: 'RESEARCH_PLAUSIBLE',
      bingyaoNeed: by,
      relation: 'COEXISTING_DISTINCT_RESOLUTION_FAMILIES',
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R037:DISTINCT_RESOLUTION_FAMILY', 'R038:RELATIONAL_DISEASE_REMEDY', 'R040:NONCOLLAPSING'],
      sourceRepresentation: 'both method families are represented only to test non-collapse',
      unresolvedOperands: ['CROSS_METHOD_RECONCILIATION'],
      directFamilySeed: false,
      syntheticOpposition: false,
    }),
  ),
  ...([
    ['R138-P17', 'Tongguan mediator would synthetically preserve an actor Bingyao wants removed', 'preserve mediator flow', 'remove disease actor'],
    ['R138-P18', 'Bingyao remedy would synthetically disturb balanced Tongguan opposition', 'preserve harmonization', 'apply remedy'],
    ['R138-P19', 'same element is synthetic mediator and synthetic disease', 'use as mediator', 'remove as disease'],
    ['R138-P20', 'same element is synthetic remedy and synthetic obstruction to mediation', 'avoid obstruction', 'use as remedy'],
  ] as const).map(([id, context, tg, by]) =>
    probe({
      id,
      groupId: 'G06-SYNTHETIC-RESOLUTION-CONFLICT',
      chartOrContext: context,
      tongguanState: 'RESEARCH_PLAUSIBLE',
      tongguanNeed: tg,
      bingyaoState: 'RESEARCH_PLAUSIBLE',
      bingyaoNeed: by,
      relation: 'POTENTIAL_RESOLUTION_CONFLICT_UNRESOLVED',
      provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
      sourceRefs: ['R037:CROSS_METHOD_RECONCILIATION_GAP', 'R038:CROSS_METHOD_RECONCILIATION_GAP', 'R137:NO_AUTO_TIEBREAK'],
      sourceRepresentation: 'synthetic opposition tests preservation only; it is not a source-verified conflict',
      unresolvedOperands: ['EXACT_CHART_EVIDENCE', 'METHOD_APPLICABILITY', 'CROSS_METHOD_PRECEDENCE'],
      directFamilySeed: false,
      syntheticOpposition: true,
    }),
  ),
  probe({
    id: 'R138-P21',
    groupId: 'G07-METHOD-NOT-APPLICABLE',
    chartOrContext: 'no two-force opposition; governed Bingyao relation retained',
    tongguanState: 'NOT_APPLICABLE',
    tongguanNeed: null,
    bingyaoState: 'RESEARCH_PLAUSIBLE',
    bingyaoNeed: 'governed disease/remedy relation',
    relation: 'METHOD_NOT_APPLICABLE',
    provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
    sourceRefs: ['R037:PRECONDITIONS', 'R038:RELATIONAL_FRAMING'],
    sourceRepresentation: 'absence of Tongguan precondition does not erase a separate Bingyao relation',
    unresolvedOperands: [],
    directFamilySeed: false,
    syntheticOpposition: false,
  }),
  probe({
    id: 'R138-P22',
    groupId: 'G07-METHOD-NOT-APPLICABLE',
    chartOrContext: 'balanced opposition; no governed support/suppression baseline',
    tongguanState: 'RESEARCH_PLAUSIBLE',
    tongguanNeed: 'harmonization',
    bingyaoState: 'NOT_APPLICABLE',
    bingyaoNeed: null,
    relation: 'METHOD_NOT_APPLICABLE',
    provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
    sourceRefs: ['R037:PRECONDITIONS', 'R038:BASELINE_DEPENDENCY'],
    sourceRepresentation: 'absence of Bingyao baseline does not erase a separate Tongguan topology',
    unresolvedOperands: [],
    directFamilySeed: false,
    syntheticOpposition: false,
  }),
  probe({
    id: 'R138-P23',
    groupId: 'G08-INDETERMINATE',
    chartOrContext: 'relative force balance unresolved and Bingyao baseline unresolved',
    tongguanState: 'INDETERMINATE',
    tongguanNeed: null,
    bingyaoState: 'INDETERMINATE',
    bingyaoNeed: null,
    relation: 'INDETERMINATE',
    provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
    sourceRefs: ['R037:EXECUTION_GAPS', 'R038:EXECUTION_GAPS'],
    sourceRepresentation: 'insufficient operands remain insufficient; no method is selected',
    unresolvedOperands: ['RELATIVE_STRENGTH_BALANCE', 'BASELINE_REQUIREMENT_DIRECTION'],
    directFamilySeed: false,
    syntheticOpposition: false,
  }),
  probe({
    id: 'R138-P24',
    groupId: 'G08-INDETERMINATE',
    chartOrContext: 'method applicability unresolved on both sides',
    tongguanState: 'INDETERMINATE',
    tongguanNeed: null,
    bingyaoState: 'INDETERMINATE',
    bingyaoNeed: null,
    relation: 'INDETERMINATE',
    provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
    sourceRefs: ['R037:TONGGUAN_APPLICABILITY_GAP', 'R038:BINGYAO_APPLICABILITY_GAP'],
    sourceRepresentation: 'dual uncertainty is preserved without winner inference',
    unresolvedOperands: ['TONGGUAN_APPLICABILITY', 'BINGYAO_APPLICABILITY', 'CROSS_METHOD_RECONCILIATION'],
    directFamilySeed: false,
    syntheticOpposition: false,
  }),
]);

export const R138_REJECTED_COLLAPSES = Object.freeze([
  'TONGGUAN_ALWAYS_OVERRIDES_BINGYAO',
  'BINGYAO_ALWAYS_OVERRIDES_TONGGUAN',
  'MIDDLE_ELEMENT_LOOKUP_AS_TONGGUAN',
  'FIXED_ELEMENT_DISEASE_OR_REMEDY_TABLE',
  'DIFFERENT_RESOLUTION_FAMILIES_EQUAL_TRUE_CONFLICT',
  'SYNTHETIC_CONTRADICTION_EQUALS_SOURCE_VERIFIED_CONFLICT',
  'ARRAY_ORDER_AS_WINNER',
  'NUMERIC_OR_WEIGHTED_METHOD_PRIORITY',
  'UNRESOLVED_CONFLICT_AUTO_TIEBREAK',
] as const);

export const R138_SUMMARY = Object.freeze({
  rowCount: R138_CONFLICT_PROBES.length,
  comparisonGroupCount: new Set(R138_CONFLICT_PROBES.map((item) => item.groupId)).size,
  directFamilySeedCount: R138_CONFLICT_PROBES.filter((item) => item.directFamilySeed).length,
  tongguanPlausibleBingyaoUnresolvedCount: R138_CONFLICT_PROBES.filter(
    (item) => item.relation === 'TONGGUAN_PLAUSIBLE_BINGYAO_UNRESOLVED',
  ).length,
  bingyaoPlausibleTongguanUnresolvedCount: R138_CONFLICT_PROBES.filter(
    (item) => item.relation === 'BINGYAO_PLAUSIBLE_TONGGUAN_UNRESOLVED',
  ).length,
  coexistenceCount: R138_CONFLICT_PROBES.filter(
    (item) => item.relation === 'COEXISTING_DISTINCT_RESOLUTION_FAMILIES',
  ).length,
  potentialConflictStressCount: R138_CONFLICT_PROBES.filter(
    (item) => item.relation === 'POTENTIAL_RESOLUTION_CONFLICT_UNRESOLVED',
  ).length,
  methodNotApplicableCount: R138_CONFLICT_PROBES.filter(
    (item) => item.relation === 'METHOD_NOT_APPLICABLE',
  ).length,
  indeterminateCount: R138_CONFLICT_PROBES.filter(
    (item) => item.relation === 'INDETERMINATE',
  ).length,
  syntheticOppositionCount: R138_CONFLICT_PROBES.filter((item) => item.syntheticOpposition).length,
  sourceVerifiedCrossMethodTrueConflictCount: R138_CONFLICT_PROBES.filter(
    (item) => item.sourceVerifiedCrossMethodTrueConflict,
  ).length,
  crossMethodWinnerAuthorizedCount: R138_CONFLICT_PROBES.filter(
    (item) => item.crossMethodWinnerAuthorized,
  ).length,
  numericPriorityAuthorizedCount: R138_CONFLICT_PROBES.filter(
    (item) => item.numericPriorityAuthorized,
  ).length,
  finalYongShenAuthorizedCount: R138_CONFLICT_PROBES.filter(
    (item) => item.finalYongShenAuthorized,
  ).length,
  executableCount: R138_CONFLICT_PROBES.filter((item) => item.executable).length,
});

export const R138_UPSTREAM_BINDINGS = Object.freeze({
  r037: {
    version: R037_TONGGUAN_VERSION,
    distinctResolutionFamilyVerified: R037_AUTHORITY.distinctResolutionFamilyVerified,
    executableTongguanResolverAuthorized: R037_AUTHORITY.executableTongguanResolverAuthorized,
    universalMediatorSelectionAuthorized: R037_AUTHORITY.universalMediatorSelectionAuthorized,
    productionAuthorityPromoted: R037_AUTHORITY.productionAuthorityPromoted,
  },
  r038: {
    version: R038_BINGYAO_VERSION,
    relationalDiseaseRemedyFramingVerified: R038_AUTHORITY.relationalDiseaseRemedyFramingVerified,
    executableBingYaoResolverAuthorized: R038_AUTHORITY.executableBingYaoResolverAuthorized,
    productionAuthorityPromoted: R038_AUTHORITY.productionAuthorityPromoted,
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
  r137: {
    version: R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION,
    sourceVerifiedTrueConflictAuthorized: R137_AUTHORITY.sourceVerifiedTrueConflictAuthorized,
    methodWinnerResolverAuthorized: R137_AUTHORITY.methodWinnerResolverAuthorized,
    automaticTieBreakAuthorized: R137_AUTHORITY.automaticTieBreakAuthorized,
    productionAuthorityPromoted: R137_AUTHORITY.productionAuthorityPromoted,
  },
});

export const R138_AUTHORITY = Object.freeze({
  status: 'RESEARCH_TONGGUAN_BINGYAO_CONFLICT_CORPUS_COMPLETE' as const,
  researchOnly: true,
  distinctResolutionFamiliesPreserved: true,
  coexistenceDistinctFromConflictObserved: true,
  syntheticConflictDistinctFromSourceVerifiedConflictObserved: true,
  sourceVerifiedCrossMethodTrueConflictAuthorized: false,
  genericTongguanMediatorResolverAuthorized: false,
  genericBingyaoDiseaseRemedyResolverAuthorized: false,
  crossMethodWinnerResolverAuthorized: false,
  automaticTieBreakAuthorized: false,
  numericMethodPriorityAuthorized: false,
  finalYongShenAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
