import { createHash } from 'node:crypto';
import type {
  FiveElement,
  HeavenlyStem,
  PillarSlot,
  StemInteractionFunctionState,
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

export type StructureRoleDisposition =
  | 'supports_structure'
  | 'harms_structure'
  | 'neutral';

export type StructureImpact =
  | 'weakens_structure'
  | 'strengthens_structure'
  | 'maintains_structure';

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

export function deriveAdoptedStemInteractionSettlements(
  relations: readonly StructuralRelationCandidate[],
  tenGods: TenGodChartFact,
  dayMaster: HeavenlyStem,
): readonly StemInteractionSettlementFact[] {
  const settlements: StemInteractionSettlementFact[] = [];

  for (const relation of relations) {
    const match = exactNonDayMasterParticipants(relation, dayMaster);
    if (match === undefined) continue;

    const controllerTenGod = resolvedStemTenGod(tenGods, match.controller.pillar);
    const controlledTenGod = resolvedStemTenGod(tenGods, match.controlled.pillar);
    if (controllerTenGod === undefined || controlledTenGod === undefined) continue;

    settlements.push({
      settlementId: `stem_five_combination_settlement:${relation.relationId}`,
      relationId: relation.relationId,
      kind: 'stem_five_combination',
      scope: 'non_day_master_stem_five_combination',
      pair: match.definition.pair,
      transformationApplied: false,
      activeRelations: ['stem_five_combination', 'element_control'],
      participants: {
        controller: {
          pillar: match.controller.pillar,
          stem: match.controller.stem,
          tenGod: controllerTenGod,
          element: STEM_ELEMENT[match.controller.stem],
          identityPreserved: true,
          functionState: 'constrained',
        },
        controlled: {
          pillar: match.controlled.pillar,
          stem: match.controlled.stem,
          tenGod: controlledTenGod,
          element: STEM_ELEMENT[match.controlled.stem],
          identityPreserved: true,
          functionState: 'impaired',
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
