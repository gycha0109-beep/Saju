import { createHash } from 'node:crypto';
import type {
  FiveElement,
  HeavenlyStem,
  PillarSlot,
  StemInteractionExternalInfluence,
  StemInteractionFunctionState,
  StemInteractionInfluenceSummary,
  StemInteractionSettlementFact,
  StructuralRelationCandidate,
  TenGod,
  TenGodChartFact,
} from '../contracts/calculation.js';

export const JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY = Object.freeze({
  policyId: 'myeongha/jia-ji-non-day-master-settlement-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2219',
  scope: 'EXACT_NON_DAY_MASTER_JIA_JI',
  transformationRule: 'DO_NOT_APPLY_UNLESS_CANONICALLY_ESTABLISHED',
  identityRule: 'PRESERVE_ORIGINAL_STEM_AND_TEN_GOD_WHEN_NOT_TRANSFORMED',
  combinationRule: 'CONSTRAIN_BOTH_PARTICIPANTS',
  controlRule: 'PRESERVE_JIA_CONTROLS_JI',
  resultRule: 'JIA_CONSTRAINED_JI_IMPAIRED',
} as const);

export const STEM_FIVE_COMBINATION_SETTLEMENT_POLICY = Object.freeze({
  policyId: 'myeongha/stem-five-combination-settlement-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2230',
  scope: 'ALL_FIVE_NON_DAY_MASTER_STEM_COMBINATIONS',
  transformationRule: 'DO_NOT_APPLY_UNLESS_CANONICALLY_ESTABLISHED',
  identityRule: 'PRESERVE_ORIGINAL_STEM_ELEMENT_AND_TEN_GOD_WHEN_NOT_TRANSFORMED',
  combinationRule: 'CONSTRAIN_BOTH_PARTICIPANTS',
  controlRule: 'PRESERVE_ORIGINAL_FIVE_ELEMENT_CONTROL_DIRECTION',
  resultRule: 'CONTROLLER_CONSTRAINED_CONTROLLED_IMPAIRED',
  extendsDecisionRef: 'GH-2219',
} as const);

export const STEM_THIRD_PARTY_INTERFERENCE_POLICY = Object.freeze({
  policyId: 'myeongha/stem-third-party-interference-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2236',
  scope: 'VISIBLE_NON_DAY_MASTER_DIRECT_ONE_HOP',
  sourceRule: 'EXCLUDE_DAY_STEM_AND_PAIR_PARTICIPANTS',
  relationRule: 'INCOMING_ELEMENT_CONTROL_OR_GENERATION_ONLY',
  sameTargetConflictRule: 'CONTROL_OVER_SUPPORT',
  recursionRule: 'NO_RECURSIVE_SOURCE_STATE_PROPAGATION',
  controllerRule: 'INCOMING_CONTROL_IMPAIRS_OTHERWISE_REMAINS_CONSTRAINED',
  pairControlRule: 'CONTROLLER_IMPAIRED_DISABLING_PAIR_CONTROL',
  controlledRule:
    'DIRECT_CONTROL_IMPAIRS_ELSE_SUPPORT_OR_DISABLED_PAIR_CONTROL_CONSTRAINS_ELSE_IMPAIRS',
  numericWeightRule: 'NONE',
  extendsDecisionRef: 'GH-2230',
} as const);

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

export const JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(canonicalize(JIA_JI_NON_DAY_MASTER_SETTLEMENT_POLICY)))
  .digest('hex');

export const STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(canonicalize(STEM_FIVE_COMBINATION_SETTLEMENT_POLICY)))
  .digest('hex');

export const STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(canonicalize(STEM_THIRD_PARTY_INTERFERENCE_POLICY)))
  .digest('hex');

export type StructureRoleDisposition =
  | 'supports_structure'
  | 'harms_structure'
  | 'neutral';

export type StructureImpact =
  | 'weakens_structure'
  | 'strengthens_structure'
  | 'maintains_structure';

export interface VisibleStemInteractionSubject {
  pillar: PillarSlot;
  stem: HeavenlyStem;
  element: FiveElement;
}

const STEM_ELEMENT = Object.freeze({
  갑: '목',
  을: '목',
  병: '화',
  정: '화',
  무: '토',
  기: '토',
  경: '금',
  신: '금',
  임: '수',
  계: '수',
} as const satisfies Readonly<Record<HeavenlyStem, FiveElement>>);

const ELEMENT_CONTROLS = Object.freeze({
  목: '토',
  화: '금',
  토: '수',
  금: '목',
  수: '화',
} as const satisfies Readonly<Record<FiveElement, FiveElement>>);

const ELEMENT_GENERATES = Object.freeze({
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
} as const satisfies Readonly<Record<FiveElement, FiveElement>>);

export interface StemFiveCombinationControlDefinition {
  pair: readonly [HeavenlyStem, HeavenlyStem];
  controller: HeavenlyStem;
  controlled: HeavenlyStem;
}

export const STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS = Object.freeze([
  Object.freeze({ pair: ['갑', '기'] as const, controller: '갑' as const, controlled: '기' as const }),
  Object.freeze({ pair: ['을', '경'] as const, controller: '경' as const, controlled: '을' as const }),
  Object.freeze({ pair: ['병', '신'] as const, controller: '병' as const, controlled: '신' as const }),
  Object.freeze({ pair: ['정', '임'] as const, controller: '임' as const, controlled: '정' as const }),
  Object.freeze({ pair: ['무', '계'] as const, controller: '무' as const, controlled: '계' as const }),
] satisfies readonly StemFiveCombinationControlDefinition[]);

function resolvedStemTenGod(
  tenGods: TenGodChartFact,
  pillar: PillarSlot,
): TenGod | undefined {
  const state = tenGods[pillar].stem;
  if (state === undefined || state.status !== 'resolved' || state.value === '일간') {
    return undefined;
  }
  return state.value;
}

function matchingDefinition(
  left: HeavenlyStem,
  right: HeavenlyStem,
): StemFiveCombinationControlDefinition | undefined {
  return STEM_FIVE_COMBINATION_CONTROL_DEFINITIONS.find(({ pair }) =>
    (pair[0] === left && pair[1] === right) ||
    (pair[0] === right && pair[1] === left),
  );
}

function exactNonDayMasterParticipants(
  relation: StructuralRelationCandidate,
  dayMaster: HeavenlyStem,
):
  | {
      definition: StemFiveCombinationControlDefinition;
      controller: { pillar: PillarSlot; stem: HeavenlyStem };
      controlled: { pillar: PillarSlot; stem: HeavenlyStem };
    }
  | undefined {
  if (
    relation.kind !== 'stem_five_combination' ||
    relation.participants.length !== 2 ||
    relation.semantics.transformationEstablished !== false
  ) {
    return undefined;
  }

  const stems = relation.participants.filter(
    (participant) => participant.component === 'stem',
  );
  if (stems.length !== 2) return undefined;

  const left = stems[0];
  const right = stems[1];
  if (left === undefined || right === undefined) return undefined;
  if (left.pillar === 'day' || right.pillar === 'day') return undefined;

  const leftStem = left.value as HeavenlyStem;
  const rightStem = right.value as HeavenlyStem;
  const definition = matchingDefinition(leftStem, rightStem);
  if (definition === undefined) return undefined;
  if (definition.pair.includes(dayMaster)) return undefined;

  const controller = stems.find(
    (participant) => participant.value === definition.controller,
  );
  const controlled = stems.find(
    (participant) => participant.value === definition.controlled,
  );
  if (controller === undefined || controlled === undefined) return undefined;

  return {
    definition,
    controller: {
      pillar: controller.pillar,
      stem: definition.controller,
    },
    controlled: {
      pillar: controlled.pillar,
      stem: definition.controlled,
    },
  };
}

function summarizeInfluences(
  influences: readonly StemInteractionExternalInfluence[],
): StemInteractionInfluenceSummary {
  const hasControl = influences.some((item) => item.kind === 'control');
  const hasSupport = influences.some((item) => item.kind === 'support');
  if (hasControl && hasSupport) return 'mixed';
  if (hasControl) return 'control_only';
  if (hasSupport) return 'support_only';
  return 'none';
}

function directInfluenceKind(
  source: FiveElement,
  target: FiveElement,
): StemInteractionExternalInfluence['kind'] | undefined {
  if (ELEMENT_CONTROLS[source] === target) return 'control';
  if (ELEMENT_GENERATES[source] === target) return 'support';
  return undefined;
}

function externalInfluencesForMatch(
  match: {
    controller: { pillar: PillarSlot; stem: HeavenlyStem };
    controlled: { pillar: PillarSlot; stem: HeavenlyStem };
  },
  visibleStems: readonly VisibleStemInteractionSubject[],
): readonly StemInteractionExternalInfluence[] {
  const controllerElement = STEM_ELEMENT[match.controller.stem];
  const controlledElement = STEM_ELEMENT[match.controlled.stem];
  const result: StemInteractionExternalInfluence[] = [];

  for (const source of visibleStems) {
    if (source.pillar === 'day') continue;
    if (
      source.pillar === match.controller.pillar ||
      source.pillar === match.controlled.pillar
    ) {
      continue;
    }

    const controllerKind = directInfluenceKind(source.element, controllerElement);
    if (controllerKind !== undefined) {
      result.push({
        influenceId:
          `${controllerKind}:${source.pillar}:${source.stem}->controller:${match.controller.pillar}:${match.controller.stem}`,
        sourcePillar: source.pillar,
        sourceStem: source.stem,
        sourceElement: source.element,
        targetRole: 'controller',
        targetPillar: match.controller.pillar,
        targetStem: match.controller.stem,
        kind: controllerKind,
      });
    }

    const controlledKind = directInfluenceKind(source.element, controlledElement);
    if (controlledKind !== undefined) {
      result.push({
        influenceId:
          `${controlledKind}:${source.pillar}:${source.stem}->controlled:${match.controlled.pillar}:${match.controlled.stem}`,
        sourcePillar: source.pillar,
        sourceStem: source.stem,
        sourceElement: source.element,
        targetRole: 'controlled',
        targetPillar: match.controlled.pillar,
        targetStem: match.controlled.stem,
        kind: controlledKind,
      });
    }
  }

  return result.sort((left, right) => left.influenceId.localeCompare(right.influenceId));
}

export function deriveAdoptedStemInteractionSettlements(
  relations: readonly StructuralRelationCandidate[],
  tenGods: TenGodChartFact,
  dayMaster: HeavenlyStem,
  visibleStems: readonly VisibleStemInteractionSubject[] = [],
): readonly StemInteractionSettlementFact[] {
  const settlements: StemInteractionSettlementFact[] = [];

  for (const relation of relations) {
    const match = exactNonDayMasterParticipants(relation, dayMaster);
    if (match === undefined) continue;

    const controllerTenGod = resolvedStemTenGod(tenGods, match.controller.pillar);
    const controlledTenGod = resolvedStemTenGod(tenGods, match.controlled.pillar);
    if (controllerTenGod === undefined || controlledTenGod === undefined) continue;

    const externalInfluences = externalInfluencesForMatch(match, visibleStems);
    const controllerInfluences = externalInfluences.filter(
      (item) => item.targetRole === 'controller',
    );
    const controlledInfluences = externalInfluences.filter(
      (item) => item.targetRole === 'controlled',
    );

    const controllerSummary = summarizeInfluences(controllerInfluences);
    const controlledSummary = summarizeInfluences(controlledInfluences);

    const controllerHasControl = controllerInfluences.some(
      (item) => item.kind === 'control',
    );
    const controlledHasControl = controlledInfluences.some(
      (item) => item.kind === 'control',
    );
    const controlledHasSupport = controlledInfluences.some(
      (item) => item.kind === 'support',
    );

    const controllerFinalState: 'constrained' | 'impaired' =
      controllerHasControl ? 'impaired' : 'constrained';
    const pairControlEffective = controllerFinalState === 'constrained';
    const controlledFinalState: 'constrained' | 'impaired' =
      controlledHasControl
        ? 'impaired'
        : controlledHasSupport || !pairControlEffective
          ? 'constrained'
          : 'impaired';

    settlements.push({
      settlementId: `stem_five_combination_settlement:${relation.relationId}`,
      relationId: relation.relationId,
      kind: 'stem_five_combination',
      scope: 'non_day_master_stem_five_combination',
      pair: match.definition.pair,
      transformationApplied: false,
      activeRelations: ['stem_five_combination', 'element_control'],
      pairControlEffective,
      externalInfluences,
      participants: {
        controller: {
          pillar: match.controller.pillar,
          stem: match.controller.stem,
          tenGod: controllerTenGod,
          element: STEM_ELEMENT[match.controller.stem],
          identityPreserved: true,
          baseFunctionState: 'constrained',
          incomingInfluenceSummary: controllerSummary,
          incomingInfluences: controllerInfluences,
          functionState: controllerFinalState,
        },
        controlled: {
          pillar: match.controlled.pillar,
          stem: match.controlled.stem,
          tenGod: controlledTenGod,
          element: STEM_ELEMENT[match.controlled.stem],
          identityPreserved: true,
          baseFunctionState: 'impaired',
          incomingInfluenceSummary: controlledSummary,
          incomingInfluences: controlledInfluences,
          functionState: controlledFinalState,
        },
      },
    });
  }

  return settlements.sort((left, right) =>
    left.settlementId.localeCompare(right.settlementId),
  );
}

export function resolveStructureImpactFromFunctionState(
  functionState: StemInteractionFunctionState,
  disposition: StructureRoleDisposition,
): StructureImpact {
  if (functionState === 'preserved' || disposition === 'neutral') {
    return 'maintains_structure';
  }
  return disposition === 'supports_structure'
    ? 'weakens_structure'
    : 'strengthens_structure';
}
