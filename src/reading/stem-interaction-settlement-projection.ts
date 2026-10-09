import type {
  FiveElement,
  HeavenlyStem,
  PillarSlot,
  StemInteractionExternalInfluenceKind,
  StemInteractionSettlementFact,
} from '../contracts/calculation.js';
import type {
  StructureImpact,
  StructureRoleDisposition,
} from '../calculation/stem-interaction-settlement.js';
import {
  resolveStructureImpactFromFunctionState,
} from '../calculation/stem-interaction-settlement.js';

export const READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION =
  'myeongha-reading-stem-interaction-settlement-v3' as const;

export interface ReadingStemInteractionExternalInfluenceV1 {
  influenceId: string;
  actorPillar: PillarSlot;
  actorStem: HeavenlyStem;
  actorElement: FiveElement;
  targetRole: 'controller' | 'controlled';
  targetPillar: PillarSlot;
  targetStem: HeavenlyStem;
  kind: StemInteractionExternalInfluenceKind;
}

type ReadingControllerParticipant =
  Omit<
    StemInteractionSettlementFact['participants']['controller'],
    'incomingInfluences'
  > & {
    incomingInfluences: readonly ReadingStemInteractionExternalInfluenceV1[];
  };

type ReadingControlledParticipant =
  Omit<
    StemInteractionSettlementFact['participants']['controlled'],
    'incomingInfluences'
  > & {
    incomingInfluences: readonly ReadingStemInteractionExternalInfluenceV1[];
  };

export interface ReadingStemInteractionSettlementV3 {
  schemaVersion: typeof READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION;
  settlementId: string;
  pair: readonly [HeavenlyStem, HeavenlyStem];
  transformationApplied: false;
  activeRelations: readonly ['stem_five_combination', 'element_control'];
  pairControlEffective: boolean;
  externalInfluences: readonly ReadingStemInteractionExternalInfluenceV1[];
  participants: {
    controller: ReadingControllerParticipant;
    controlled: ReadingControlledParticipant;
  };
}

export interface ReadingStemInteractionStructureImpactV3 {
  settlementId: string;
  affectedStem: HeavenlyStem;
  affectedTenGod: StemInteractionSettlementFact['participants']['controlled']['tenGod'];
  roleDisposition: StructureRoleDisposition;
  functionState: StemInteractionSettlementFact['participants']['controlled']['functionState'];
  structureImpact: StructureImpact;
}

function projectInfluence(
  influence: StemInteractionSettlementFact['externalInfluences'][number],
): ReadingStemInteractionExternalInfluenceV1 {
  return {
    influenceId: influence.influenceId,
    actorPillar: influence.sourcePillar,
    actorStem: influence.sourceStem,
    actorElement: influence.sourceElement,
    targetRole: influence.targetRole,
    targetPillar: influence.targetPillar,
    targetStem: influence.targetStem,
    kind: influence.kind,
  };
}

export function projectStemInteractionSettlementForReading(
  settlement: StemInteractionSettlementFact,
): ReadingStemInteractionSettlementV3 {
  return {
    schemaVersion: READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
    settlementId: settlement.settlementId,
    pair: settlement.pair,
    transformationApplied: settlement.transformationApplied,
    activeRelations: settlement.activeRelations,
    pairControlEffective: settlement.pairControlEffective,
    externalInfluences: settlement.externalInfluences.map(projectInfluence),
    participants: {
      controller: {
        ...settlement.participants.controller,
        incomingInfluences:
          settlement.participants.controller.incomingInfluences.map(projectInfluence),
      },
      controlled: {
        ...settlement.participants.controlled,
        incomingInfluences:
          settlement.participants.controlled.incomingInfluences.map(projectInfluence),
      },
    },
  };
}

export function projectStemInteractionStructureImpactForReading(
  settlement: StemInteractionSettlementFact,
  roleDisposition: StructureRoleDisposition,
): ReadingStemInteractionStructureImpactV3 {
  return {
    settlementId: settlement.settlementId,
    affectedStem: settlement.participants.controlled.stem,
    affectedTenGod: settlement.participants.controlled.tenGod,
    roleDisposition,
    functionState: settlement.participants.controlled.functionState,
    structureImpact: resolveStructureImpactFromFunctionState(
      settlement.participants.controlled.functionState,
      roleDisposition,
    ),
  };
}
