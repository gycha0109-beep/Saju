import {
  R039_CORPUS_BOUNDARY,
  R039_YONGXI_CASE_CORPUS_VERSION,
} from './general-natal-yongxi-multimethod-case-corpus.js';
import {
  R040_AUTHORITY,
  R040_NONCOLLAPSING_EVIDENCE_VERSION,
  type R040EvidenceRole,
  type R040MethodologyFamily,
} from './general-natal-noncollapsing-yongxi-evidence.js';
import {
  R134_AUTHORITY,
  R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
} from './general-natal-special-pattern-exit-adversarial-corpus.js';
import {
  R135_AUTHORITY,
  R135_ORDINARY_SPECIAL_NONMONOTONICITY_VERSION,
} from './general-natal-ordinary-special-pattern-transition-nonmonotonicity.js';
import {
  R137_AUTHORITY,
  R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION,
} from './general-natal-tiaohou-structure-conflict-preservation.js';
import {
  R138_AUTHORITY,
  R138_TONGGUAN_BINGYAO_CONFLICT_VERSION,
} from './general-natal-tongguan-bingyao-conflict-corpus.js';

export const R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION = '0.1.0-research' as const;

export type R139CompositionState =
  | 'SAME_METHOD_EVIDENCE_COEXISTENCE'
  | 'COEXISTENCE_ADMISSIBLE'
  | 'CONDITIONAL_COMPOSITION'
  | 'PARALLEL_PRESERVATION_ONLY'
  | 'COMPOSITION_UNRESOLVED'
  | 'NON_COMPOSITION_BOUNDARY'
  | 'METHOD_NOT_APPLICABLE'
  | 'INDETERMINATE';

export type R139ProbeProvenance =
  | 'SOURCE_GOVERNED_REPLAY'
  | 'GOVERNED_BOUNDARY_SYNTHESIS'
  | 'RESEARCH_SYNTHETIC_STRESS_PROBE';

export interface R139CompositionCell {
  pairKey: string;
  leftMethod: R040MethodologyFamily;
  rightMethod: R040MethodologyFamily;
  selfPair: boolean;
  evidenceCoexistenceRepresentable: true;
  allowedCompositionStates: readonly R139CompositionState[];
  semanticCompositionRequiresContext: boolean;
  globalCompositionAuthorized: false;
  executableResolutionAuthorized: false;
  sourceRefs: readonly string[];
  unresolvedOperands: readonly string[];
}

export interface R139DirectionalProjection {
  leftMethod: R040MethodologyFamily;
  rightMethod: R040MethodologyFamily;
  pairKey: string;
  evidenceCoexistenceRepresentable: true;
  semanticCompositionRequiresContext: boolean;
  globalCompositionAuthorized: false;
  executableResolutionAuthorized: false;
}

export interface R139CompositionProbe {
  id: string;
  pairKey: string;
  context: string;
  leftMethod: R040MethodologyFamily;
  rightMethod: R040MethodologyFamily;
  leftRole: R040EvidenceRole;
  rightRole: R040EvidenceRole;
  leftValue: string;
  rightValue: string;
  compositionState: R139CompositionState;
  provenance: R139ProbeProvenance;
  sourceRefs: readonly string[];
  unresolvedOperands: readonly string[];
  sourceGovernedCoexistenceReplay: boolean;
  sameElementDifferentRole: boolean;
  samePairDifferentContext: true;
  syntheticStress: boolean;
  methodWinnerAuthorized: false;
  numericPriorityAuthorized: false;
  finalYongShenAuthorized: false;
  roleCollapseAuthorized: false;
  automaticSpecialTransitionAuthorized: false;
  executable: false;
}

interface R139PairSeed {
  leftMethod: R040MethodologyFamily;
  rightMethod: R040MethodologyFamily;
  leftRole: R040EvidenceRole;
  rightRole: R040EvidenceRole;
  baselineContext: string;
  stressContext: string;
  baselineLeftValue: string;
  baselineRightValue: string;
  stressLeftValue: string;
  stressRightValue: string;
  baselineState: R139CompositionState;
  stressState: R139CompositionState;
  sourceRefs: readonly string[];
  unresolvedOperands: readonly string[];
  r039ReplayBaseline: boolean;
  sameElementDifferentRoleStress: boolean;
}

export const R139_METHODS: readonly R040MethodologyFamily[] = Object.freeze([
  'GEJU',
  'STRENGTH_FUIYI',
  'CLIMATE_TIAOHOU',
  'FLOW_TONGGUAN',
  'BINGYAO',
  'SPECIAL_FOLLOW',
]);

export const r139CanonicalPairKey = (
  left: R040MethodologyFamily,
  right: R040MethodologyFamily,
): string => [left, right].sort().join('::');

const PAIR_SEEDS: readonly R139PairSeed[] = Object.freeze([
  {
    leftMethod: 'GEJU',
    rightMethod: 'GEJU',
    leftRole: 'PRIMARY_USE',
    rightRole: 'PRIMARY_USE',
    baselineContext: 'same Geju family / two bounded structural evidence items',
    stressContext: 'same Geju family / evidence items disagree on unresolved structural operands',
    baselineLeftValue: '格局 evidence A',
    baselineRightValue: '格局 evidence B',
    stressLeftValue: '格局 candidate A',
    stressRightValue: '格局 candidate B',
    baselineState: 'SAME_METHOD_EVIDENCE_COEXISTENCE',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R040:GEJU', 'R131:CANDIDATE_NOT_ESTABLISHMENT'],
    unresolvedOperands: ['GEJU_ESTABLISHMENT_CONTEXT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'STRENGTH_FUIYI',
    rightMethod: 'STRENGTH_FUIYI',
    leftRole: 'PRIMARY_USE',
    rightRole: 'PRIMARY_USE',
    baselineContext: 'same Fuyi family / two bounded support-suppression evidence items',
    stressContext: 'same Fuyi family / strength operands remain unresolved',
    baselineLeftValue: '扶身 evidence A',
    baselineRightValue: '扶抑 evidence B',
    stressLeftValue: '扶身 candidate',
    stressRightValue: '制衡 candidate',
    baselineState: 'SAME_METHOD_EVIDENCE_COEXISTENCE',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R040:STRENGTH_FUIYI', 'R034:STRENGTH_REQUIREMENT'],
    unresolvedOperands: ['STRENGTH_REQUIREMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'CLIMATE_TIAOHOU',
    rightMethod: 'CLIMATE_TIAOHOU',
    leftRole: 'CLIMATE_REQUIREMENT',
    rightRole: 'CLIMATE_REQUIREMENT',
    baselineContext: 'same Tiaohou family / compatible seasonal evidence',
    stressContext: 'same Tiaohou family / seasonal classification unresolved',
    baselineLeftValue: 'seasonal requirement A',
    baselineRightValue: 'seasonal requirement B',
    stressLeftValue: 'climate requirement A',
    stressRightValue: 'climate requirement B',
    baselineState: 'SAME_METHOD_EVIDENCE_COEXISTENCE',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R034:CLIMATE_MUST_BE_COEVALUATED', 'R040:CLIMATE_TIAOHOU'],
    unresolvedOperands: ['CLIMATE_STATE_CLASSIFICATION'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'FLOW_TONGGUAN',
    rightMethod: 'FLOW_TONGGUAN',
    leftRole: 'TONGGUAN_REQUIREMENT',
    rightRole: 'TONGGUAN_REQUIREMENT',
    baselineContext: 'same Tongguan family / bounded mediation evidence',
    stressContext: 'same Tongguan family / mediator selection unresolved',
    baselineLeftValue: '調和 requirement A',
    baselineRightValue: '通關 requirement B',
    stressLeftValue: 'mediator candidate A',
    stressRightValue: 'mediator candidate B',
    baselineState: 'SAME_METHOD_EVIDENCE_COEXISTENCE',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R037:DISTINCT_RESOLUTION_FAMILY', 'R040:FLOW_TONGGUAN'],
    unresolvedOperands: ['MEDIATOR_OR_TRANSFORMATION_SELECTION'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'BINGYAO',
    rightMethod: 'BINGYAO',
    leftRole: 'BINGYAO_DISEASE',
    rightRole: 'BINGYAO_REMEDY_USE',
    baselineContext: 'same Bingyao family / disease and remedy roles retained separately',
    stressContext: 'same Bingyao family / disease identity or remedy effect unresolved',
    baselineLeftValue: '病 relation',
    baselineRightValue: '藥 relation',
    stressLeftValue: 'disease candidate',
    stressRightValue: 'remedy candidate',
    baselineState: 'SAME_METHOD_EVIDENCE_COEXISTENCE',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R038:RELATIONAL_DISEASE_REMEDY', 'R040:BINGYAO'],
    unresolvedOperands: ['DISEASE_IDENTITY_SELECTION', 'REMEDY_EFFECTIVENESS'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'SPECIAL_FOLLOW',
    rightMethod: 'SPECIAL_FOLLOW',
    leftRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    rightRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    baselineContext: 'same special-pattern family / bounded prerequisite evidence',
    stressContext: 'same special-pattern family / prerequisite remains unresolved',
    baselineLeftValue: 'special prerequisite A',
    baselineRightValue: 'special prerequisite B',
    stressLeftValue: 'special candidate evidence A',
    stressRightValue: 'special candidate evidence B',
    baselineState: 'SAME_METHOD_EVIDENCE_COEXISTENCE',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R134:SPECIAL_EXIT_BOUNDARY', 'R135:NON_MONOTONICITY'],
    unresolvedOperands: ['SPECIAL_PATTERN_ESTABLISHMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'GEJU',
    rightMethod: 'STRENGTH_FUIYI',
    leftRole: 'PRIMARY_USE',
    rightRole: 'PRIMARY_USE',
    baselineContext: 'structural pattern evidence and strength requirement both bounded',
    stressContext: 'same pair / structure points one way while strength support remains separate',
    baselineLeftValue: '格局用',
    baselineRightValue: '扶身',
    stressLeftValue: '洩秀',
    stressRightValue: '扶身',
    baselineState: 'CONDITIONAL_COMPOSITION',
    stressState: 'PARALLEL_PRESERVATION_ONLY',
    sourceRefs: ['R040:GEJU', 'R040:STRENGTH_FUIYI', 'R133:NO_GLOBAL_PRECEDENCE'],
    unresolvedOperands: ['CROSS_METHOD_RECONCILIATION'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'GEJU',
    rightMethod: 'CLIMATE_TIAOHOU',
    leftRole: 'PRIMARY_USE',
    rightRole: 'CLIMATE_REQUIREMENT',
    baselineContext: '甲申 丙子 庚辰 甲申 / 傷官洩秀 plus 丙火調候',
    stressContext: 'same FIRE appears as structural-use evidence and climate requirement',
    baselineLeftValue: '傷官洩秀',
    baselineRightValue: '丙火',
    stressLeftValue: '火',
    stressRightValue: '火',
    baselineState: 'COEXISTENCE_ADMISSIBLE',
    stressState: 'CONDITIONAL_COMPOSITION',
    sourceRefs: ['R039:C2', 'R137:GEJU_TIAOHOU'],
    unresolvedOperands: ['ROLE_EQUIVALENCE'],
    r039ReplayBaseline: true,
    sameElementDifferentRoleStress: true,
  },
  {
    leftMethod: 'GEJU',
    rightMethod: 'FLOW_TONGGUAN',
    leftRole: 'PRIMARY_USE',
    rightRole: 'TONGGUAN_REQUIREMENT',
    baselineContext: 'Geju requirement and Tongguan mediation need are both represented',
    stressContext: 'same pair / mediation could alter structural relation and needs context',
    baselineLeftValue: '格局用',
    baselineRightValue: '通關',
    stressLeftValue: 'structural use',
    stressRightValue: 'mediating transformation',
    baselineState: 'PARALLEL_PRESERVATION_ONLY',
    stressState: 'CONDITIONAL_COMPOSITION',
    sourceRefs: ['R037:CROSS_METHOD_RECONCILIATION_GAP', 'R040:GEJU'],
    unresolvedOperands: ['TONGGUAN_APPLICABILITY', 'GEJU_ESTABLISHMENT_CONTEXT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'GEJU',
    rightMethod: 'BINGYAO',
    leftRole: 'PRIMARY_USE',
    rightRole: 'BINGYAO_REMEDY_USE',
    baselineContext: 'structural primary-use evidence and Bingyao remedy relation coexist',
    stressContext: 'same pair / remedy relation is preserved without collapsing into structural use',
    baselineLeftValue: '格局用',
    baselineRightValue: '病藥之藥',
    stressLeftValue: 'primary use',
    stressRightValue: 'remedy use',
    baselineState: 'CONDITIONAL_COMPOSITION',
    stressState: 'PARALLEL_PRESERVATION_ONLY',
    sourceRefs: ['R038:RELATIONAL_DISEASE_REMEDY', 'R040:NONCOLLAPSING'],
    unresolvedOperands: ['CROSS_METHOD_RECONCILIATION'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'GEJU',
    rightMethod: 'SPECIAL_FOLLOW',
    leftRole: 'PRIMARY_USE',
    rightRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    baselineContext: 'ordinary Geju path remains available while special path is only research-plausible',
    stressContext: 'ordinary Geju path is damaged without proving its absence',
    baselineLeftValue: 'ordinary structural path',
    baselineRightValue: 'special prerequisite',
    stressLeftValue: 'broken ordinary path',
    stressRightValue: 'special prerequisite',
    baselineState: 'NON_COMPOSITION_BOUNDARY',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R134:ORDINARY_PATH_EXCLUSION', 'R135:BROKEN_ORDINARY_DISTINCT_FROM_ABSENT'],
    unresolvedOperands: ['ORDINARY_PATH_AVAILABILITY', 'SPECIAL_PATTERN_ESTABLISHMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'STRENGTH_FUIYI',
    rightMethod: 'CLIMATE_TIAOHOU',
    leftRole: 'PRIMARY_USE',
    rightRole: 'CLIMATE_REQUIREMENT',
    baselineContext: '丁巳 壬子 辛巳 丁酉 / 酉金扶身 plus 火不可缺',
    stressContext: 'same FIRE appears as support-related evidence and climate requirement',
    baselineLeftValue: '酉金扶身',
    baselineRightValue: '火不可缺',
    stressLeftValue: '火',
    stressRightValue: '火',
    baselineState: 'COEXISTENCE_ADMISSIBLE',
    stressState: 'CONDITIONAL_COMPOSITION',
    sourceRefs: ['R039:C1', 'R137:STRENGTH_TIAOHOU'],
    unresolvedOperands: ['ROLE_EQUIVALENCE'],
    r039ReplayBaseline: true,
    sameElementDifferentRoleStress: true,
  },
  {
    leftMethod: 'STRENGTH_FUIYI',
    rightMethod: 'FLOW_TONGGUAN',
    leftRole: 'PRIMARY_USE',
    rightRole: 'TONGGUAN_REQUIREMENT',
    baselineContext: 'strength requirement and Tongguan mediation need coexist',
    stressContext: 'same pair / stronger support does not automatically select a mediator',
    baselineLeftValue: '扶身',
    baselineRightValue: '通關',
    stressLeftValue: '扶抑 requirement',
    stressRightValue: 'mediator requirement',
    baselineState: 'PARALLEL_PRESERVATION_ONLY',
    stressState: 'PARALLEL_PRESERVATION_ONLY',
    sourceRefs: ['R037:PRECONDITION_TOPOLOGY', 'R040:STRENGTH_FUIYI'],
    unresolvedOperands: ['RELATIVE_STRENGTH_BALANCE', 'MEDIATOR_OR_TRANSFORMATION_SELECTION'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'STRENGTH_FUIYI',
    rightMethod: 'BINGYAO',
    leftRole: 'PRIMARY_USE',
    rightRole: 'BINGYAO_REMEDY_USE',
    baselineContext: 'strength baseline and Bingyao remedy relation can be co-evaluated',
    stressContext: 'same pair / remedy remains a distinct semantic role',
    baselineLeftValue: '扶抑 requirement',
    baselineRightValue: '病藥之藥',
    stressLeftValue: 'support requirement',
    stressRightValue: 'remedy use',
    baselineState: 'CONDITIONAL_COMPOSITION',
    stressState: 'PARALLEL_PRESERVATION_ONLY',
    sourceRefs: ['R038:BASELINE_REQUIREMENT_DIRECTION', 'R040:STRENGTH_FUIYI'],
    unresolvedOperands: ['BINGYAO_APPLICABILITY'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'STRENGTH_FUIYI',
    rightMethod: 'SPECIAL_FOLLOW',
    leftRole: 'PRIMARY_USE',
    rightRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    baselineContext: 'ordinary support-control path remains available while special path is only research-plausible',
    stressContext: 'support-control path is broken without proving no ordinary path',
    baselineLeftValue: 'ordinary 扶抑 path',
    baselineRightValue: 'special prerequisite',
    stressLeftValue: 'broken 扶抑 path',
    stressRightValue: 'special prerequisite',
    baselineState: 'NON_COMPOSITION_BOUNDARY',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R134:SUPPORT_CONTROL_BOUNDARY', 'R135:ORDINARY_FAILURE_NOT_SPECIAL_PROGRESS'],
    unresolvedOperands: ['ORDINARY_SUPPORT_CONTROL_AVAILABILITY', 'SPECIAL_PATTERN_ESTABLISHMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'CLIMATE_TIAOHOU',
    rightMethod: 'FLOW_TONGGUAN',
    leftRole: 'CLIMATE_REQUIREMENT',
    rightRole: 'TONGGUAN_REQUIREMENT',
    baselineContext: 'climate requirement and Tongguan mediation need are both present',
    stressContext: 'same pair / climate urgency does not override Tongguan preconditions',
    baselineLeftValue: '調候 requirement',
    baselineRightValue: '通關 requirement',
    stressLeftValue: 'urgent climate element',
    stressRightValue: 'mediator requirement',
    baselineState: 'CONDITIONAL_COMPOSITION',
    stressState: 'PARALLEL_PRESERVATION_ONLY',
    sourceRefs: ['R034:NO_GLOBAL_PRIORITY', 'R037:CROSS_METHOD_RECONCILIATION_GAP'],
    unresolvedOperands: ['CLIMATE_STATE_CLASSIFICATION', 'TONGGUAN_APPLICABILITY'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'CLIMATE_TIAOHOU',
    rightMethod: 'BINGYAO',
    leftRole: 'CLIMATE_REQUIREMENT',
    rightRole: 'BINGYAO_REMEDY_USE',
    baselineContext: '戊戌 甲子 己巳 戊辰 / 巳中丙火 plus 甲木官星制劫',
    stressContext: 'same FIRE appears as climate requirement and a distinct Bingyao role',
    baselineLeftValue: '巳中丙火',
    baselineRightValue: '甲木官星制劫',
    stressLeftValue: '火',
    stressRightValue: '火',
    baselineState: 'COEXISTENCE_ADMISSIBLE',
    stressState: 'CONDITIONAL_COMPOSITION',
    sourceRefs: ['R039:C3', 'R137:BINGYAO_TIAOHOU'],
    unresolvedOperands: ['ROLE_EQUIVALENCE'],
    r039ReplayBaseline: true,
    sameElementDifferentRoleStress: true,
  },
  {
    leftMethod: 'CLIMATE_TIAOHOU',
    rightMethod: 'SPECIAL_FOLLOW',
    leftRole: 'CLIMATE_REQUIREMENT',
    rightRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    baselineContext: 'climate need coexists with unresolved special-pattern prerequisites',
    stressContext: 'climate urgency cannot establish or accelerate a special-pattern transition',
    baselineLeftValue: '調候 requirement',
    baselineRightValue: 'special prerequisite',
    stressLeftValue: 'urgent climate element',
    stressRightValue: 'special transition candidate',
    baselineState: 'NON_COMPOSITION_BOUNDARY',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R034:CLIMATE_REQUIRED_ELEMENT_NOT_AUTOMATIC_YONGSHEN', 'R135:NO_SPECIAL_RESOLVER'],
    unresolvedOperands: ['SPECIAL_PATTERN_ESTABLISHMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'FLOW_TONGGUAN',
    rightMethod: 'BINGYAO',
    leftRole: 'TONGGUAN_REQUIREMENT',
    rightRole: 'BINGYAO_REMEDY_USE',
    baselineContext: 'R138 distinct Tongguan and Bingyao resolution families',
    stressContext: 'same WATER is synthetic mediator and synthetic Bingyao remedy',
    baselineLeftValue: '通關 mediation',
    baselineRightValue: '病藥 remedy',
    stressLeftValue: '水',
    stressRightValue: '水',
    baselineState: 'PARALLEL_PRESERVATION_ONLY',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R138:COEXISTING_DISTINCT_RESOLUTION_FAMILIES', 'R138:POTENTIAL_RESOLUTION_CONFLICT_UNRESOLVED'],
    unresolvedOperands: ['CROSS_METHOD_RECONCILIATION'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: true,
  },
  {
    leftMethod: 'FLOW_TONGGUAN',
    rightMethod: 'SPECIAL_FOLLOW',
    leftRole: 'TONGGUAN_REQUIREMENT',
    rightRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    baselineContext: 'Tongguan applicability does not establish a special-pattern path',
    stressContext: 'synthetic mediation success does not imply special-pattern transition',
    baselineLeftValue: '通關 requirement',
    baselineRightValue: 'special prerequisite',
    stressLeftValue: 'mediator candidate',
    stressRightValue: 'special transition candidate',
    baselineState: 'NON_COMPOSITION_BOUNDARY',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R037:CROSS_METHOD_RECONCILIATION_GAP', 'R135:NO_SPECIAL_RESOLVER'],
    unresolvedOperands: ['TONGGUAN_APPLICABILITY', 'SPECIAL_PATTERN_ESTABLISHMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
  {
    leftMethod: 'BINGYAO',
    rightMethod: 'SPECIAL_FOLLOW',
    leftRole: 'BINGYAO_REMEDY_USE',
    rightRole: 'SPECIAL_TRANSITION_REQUIREMENT',
    baselineContext: 'Bingyao remedy relation does not establish a special-pattern path',
    stressContext: 'ordinary-path disease or remedy evidence cannot become proof of special transition',
    baselineLeftValue: '病藥 remedy',
    baselineRightValue: 'special prerequisite',
    stressLeftValue: 'disease/remedy relation',
    stressRightValue: 'special transition candidate',
    baselineState: 'NON_COMPOSITION_BOUNDARY',
    stressState: 'COMPOSITION_UNRESOLVED',
    sourceRefs: ['R038:RELATIONAL_DISEASE_REMEDY', 'R135:ORDINARY_FAILURE_NOT_SPECIAL_PROGRESS'],
    unresolvedOperands: ['BINGYAO_APPLICABILITY', 'SPECIAL_PATTERN_ESTABLISHMENT'],
    r039ReplayBaseline: false,
    sameElementDifferentRoleStress: false,
  },
]);

const uniqueStates = (
  baseline: R139CompositionState,
  stress: R139CompositionState,
): readonly R139CompositionState[] =>
  baseline === stress ? Object.freeze([baseline]) : Object.freeze([baseline, stress]);

export const R139_COMPOSITION_CELLS: readonly R139CompositionCell[] = Object.freeze(
  PAIR_SEEDS.map((seed) =>
    Object.freeze({
      pairKey: r139CanonicalPairKey(seed.leftMethod, seed.rightMethod),
      leftMethod: seed.leftMethod,
      rightMethod: seed.rightMethod,
      selfPair: seed.leftMethod === seed.rightMethod,
      evidenceCoexistenceRepresentable: true as const,
      allowedCompositionStates: uniqueStates(seed.baselineState, seed.stressState),
      semanticCompositionRequiresContext: seed.leftMethod !== seed.rightMethod,
      globalCompositionAuthorized: false as const,
      executableResolutionAuthorized: false as const,
      sourceRefs: seed.sourceRefs,
      unresolvedOperands: seed.unresolvedOperands,
    }),
  ),
);

const cellByPairKey = (pairKey: string): R139CompositionCell => {
  const cell = R139_COMPOSITION_CELLS.find((item) => item.pairKey === pairKey);
  if (!cell) {
    throw new Error('R139 missing composition cell for canonical pair');
  }
  return cell;
};

export const R139_DIRECTIONAL_PROJECTION: readonly R139DirectionalProjection[] =
  Object.freeze(
    R139_METHODS.flatMap((leftMethod) =>
      R139_METHODS.map((rightMethod) => {
        const cell = cellByPairKey(r139CanonicalPairKey(leftMethod, rightMethod));
        return Object.freeze({
          leftMethod,
          rightMethod,
          pairKey: cell.pairKey,
          evidenceCoexistenceRepresentable: cell.evidenceCoexistenceRepresentable,
          semanticCompositionRequiresContext: cell.semanticCompositionRequiresContext,
          globalCompositionAuthorized: false as const,
          executableResolutionAuthorized: false as const,
        });
      }),
    ),
  );

const probe = (
  value: Omit<
    R139CompositionProbe,
    | 'samePairDifferentContext'
    | 'methodWinnerAuthorized'
    | 'numericPriorityAuthorized'
    | 'finalYongShenAuthorized'
    | 'roleCollapseAuthorized'
    | 'automaticSpecialTransitionAuthorized'
    | 'executable'
  >,
): R139CompositionProbe =>
  Object.freeze({
    ...value,
    samePairDifferentContext: true,
    methodWinnerAuthorized: false,
    numericPriorityAuthorized: false,
    finalYongShenAuthorized: false,
    roleCollapseAuthorized: false,
    automaticSpecialTransitionAuthorized: false,
    executable: false,
  });

export const R139_COMPOSITION_PROBES: readonly R139CompositionProbe[] = Object.freeze(
  PAIR_SEEDS.flatMap((seed, index) => {
    const key = String(index + 1).padStart(2, '0');
    const pairKey = r139CanonicalPairKey(seed.leftMethod, seed.rightMethod);
    return [
      probe({
        id: 'R139-P' + key + 'A',
        pairKey,
        context: seed.baselineContext,
        leftMethod: seed.leftMethod,
        rightMethod: seed.rightMethod,
        leftRole: seed.leftRole,
        rightRole: seed.rightRole,
        leftValue: seed.baselineLeftValue,
        rightValue: seed.baselineRightValue,
        compositionState: seed.baselineState,
        provenance: seed.r039ReplayBaseline
          ? 'SOURCE_GOVERNED_REPLAY'
          : 'GOVERNED_BOUNDARY_SYNTHESIS',
        sourceRefs: seed.sourceRefs,
        unresolvedOperands: seed.unresolvedOperands,
        sourceGovernedCoexistenceReplay: seed.r039ReplayBaseline,
        sameElementDifferentRole: false,
        syntheticStress: false,
      }),
      probe({
        id: 'R139-P' + key + 'B',
        pairKey,
        context: seed.stressContext,
        leftMethod: seed.leftMethod,
        rightMethod: seed.rightMethod,
        leftRole: seed.leftRole,
        rightRole: seed.rightRole,
        leftValue: seed.stressLeftValue,
        rightValue: seed.stressRightValue,
        compositionState: seed.stressState,
        provenance: 'RESEARCH_SYNTHETIC_STRESS_PROBE',
        sourceRefs: seed.sourceRefs,
        unresolvedOperands: seed.unresolvedOperands,
        sourceGovernedCoexistenceReplay: false,
        sameElementDifferentRole: seed.sameElementDifferentRoleStress,
        syntheticStress: true,
      }),
    ];
  }),
);

export const R139_REJECTED_COLLAPSES = Object.freeze([
  'METHOD_COUNT_AS_WINNER',
  'SOURCE_COUNT_AS_WINNER',
  'SAME_ELEMENT_AS_SAME_ROLE',
  'SAME_ELEMENT_AS_COMPOSITION_PROOF',
  'ARRAY_ORDER_AS_PRECEDENCE',
  'METHODOLOGY_ENUM_ORDER_AS_PRIORITY',
  'MAJORITY_VOTE_METHOD_SELECTION',
  'NUMERIC_METHOD_SCORE',
  'WEIGHTED_METHOD_SCORE',
  'GLOBAL_METHOD_PRECEDENCE',
  'AUTO_FINAL_YONGSHEN',
  'AUTO_ROLE_COLLAPSE',
  'AUTO_SPECIAL_PATTERN_TRANSITION',
  'AUTO_CONFLICT_TIEBREAK',
] as const);

const stateCount = (state: R139CompositionState): number =>
  R139_COMPOSITION_PROBES.filter((item) => item.compositionState === state).length;

export const R139_SUMMARY = Object.freeze({
  methodologyFamilyCount: R139_METHODS.length,
  canonicalPairCount: R139_COMPOSITION_CELLS.length,
  selfPairCount: R139_COMPOSITION_CELLS.filter((item) => item.selfPair).length,
  crossPairCount: R139_COMPOSITION_CELLS.filter((item) => !item.selfPair).length,
  directionalProjectionCount: R139_DIRECTIONAL_PROJECTION.length,
  probeCount: R139_COMPOSITION_PROBES.length,
  r039SeedReplayCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.sourceGovernedCoexistenceReplay,
  ).length,
  sameElementDifferentRoleCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.sameElementDifferentRole,
  ).length,
  samePairDifferentContextRowCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.samePairDifferentContext,
  ).length,
  samePairDifferentContextGroupCount: new Set(
    R139_COMPOSITION_PROBES.filter((item) => item.samePairDifferentContext).map(
      (item) => item.pairKey,
    ),
  ).size,
  sameMethodEvidenceCoexistenceCount: stateCount('SAME_METHOD_EVIDENCE_COEXISTENCE'),
  coexistenceAdmissibleCount: stateCount('COEXISTENCE_ADMISSIBLE'),
  conditionalCompositionCount: stateCount('CONDITIONAL_COMPOSITION'),
  parallelPreservationOnlyCount: stateCount('PARALLEL_PRESERVATION_ONLY'),
  compositionUnresolvedCount: stateCount('COMPOSITION_UNRESOLVED'),
  nonCompositionBoundaryCount: stateCount('NON_COMPOSITION_BOUNDARY'),
  methodWinnerAuthorizedCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.methodWinnerAuthorized,
  ).length,
  numericPriorityAuthorizedCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.numericPriorityAuthorized,
  ).length,
  finalYongShenAuthorizedCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.finalYongShenAuthorized,
  ).length,
  roleCollapseAuthorizedCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.roleCollapseAuthorized,
  ).length,
  automaticSpecialTransitionAuthorizedCount: R139_COMPOSITION_PROBES.filter(
    (item) => item.automaticSpecialTransitionAuthorized,
  ).length,
  executableCount: R139_COMPOSITION_PROBES.filter((item) => item.executable).length,
});

export const R139_UPSTREAM_BINDINGS = Object.freeze({
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
  r134: {
    version: R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
    specialPatternResolverAuthorized: R134_AUTHORITY.specialPatternResolverAuthorized,
    candidateIdentityAuthorized: R134_AUTHORITY.candidateIdentityAuthorized,
    establishmentPredicateAuthorized: R134_AUTHORITY.establishmentPredicateAuthorized,
  },
  r135: {
    version: R135_ORDINARY_SPECIAL_NONMONOTONICITY_VERSION,
    ordinarySpecialNonMonotonicityObserved:
      R135_AUTHORITY.ordinarySpecialNonMonotonicityObserved,
    transitionResolverAuthorized: R135_AUTHORITY.transitionResolverAuthorized,
    specialPatternResolverAuthorized: R135_AUTHORITY.specialPatternResolverAuthorized,
  },
  r137: {
    version: R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION,
    sourceVerifiedTrueConflictAuthorized: R137_AUTHORITY.sourceVerifiedTrueConflictAuthorized,
    methodWinnerResolverAuthorized: R137_AUTHORITY.methodWinnerResolverAuthorized,
    automaticTieBreakAuthorized: R137_AUTHORITY.automaticTieBreakAuthorized,
  },
  r138: {
    version: R138_TONGGUAN_BINGYAO_CONFLICT_VERSION,
    distinctResolutionFamiliesPreserved: R138_AUTHORITY.distinctResolutionFamiliesPreserved,
    sourceVerifiedCrossMethodTrueConflictAuthorized:
      R138_AUTHORITY.sourceVerifiedCrossMethodTrueConflictAuthorized,
    crossMethodWinnerResolverAuthorized:
      R138_AUTHORITY.crossMethodWinnerResolverAuthorized,
    automaticTieBreakAuthorized: R138_AUTHORITY.automaticTieBreakAuthorized,
  },
});

export const R139_AUTHORITY = Object.freeze({
  status: 'RESEARCH_METHODOLOGY_COMPOSITION_ADMISSIBILITY_MATRIX_COMPLETE' as const,
  researchOnly: true,
  canonicalPairNormalizationObserved: true,
  evidenceCoexistenceDistinctFromSemanticCompositionObserved: true,
  semanticCompositionDistinctFromExecutableResolutionObserved: true,
  contextDependentCompositionObserved: true,
  sameElementDifferentRolePreserved: true,
  globalCompositionAuthorized: false,
  methodWinnerResolverAuthorized: false,
  automaticTieBreakAuthorized: false,
  numericMethodPriorityAuthorized: false,
  majorityVoteMethodSelectionAuthorized: false,
  sourceCountWinnerAuthorized: false,
  finalYongShenAuthorized: false,
  roleCollapseAuthorized: false,
  automaticSpecialTransitionAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
