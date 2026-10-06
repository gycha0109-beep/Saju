import type {
  HeavenlyStem,
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

export interface ReadingStemInteractionSettlementV3 {
  schemaVersion: typeof READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION;
  settlementId: string;
  pair: readonly [HeavenlyStem, HeavenlyStem];
  transformationApplied: false;
  activeRelations: readonly ['stem_five_combination', 'element_control'];
  pairControlEffective: boolean;
  externalInfluences: StemInteractionSettlementFact['externalInfluences'];
  participants: StemInteractionSettlementFact['participants'];
}

export interface ReadingStemInteractionStructureImpactV3 {
  settlementId: string;
  affectedStem: HeavenlyStem;
  affectedTenGod: StemInteractionSettlementFact['participants']['controlled']['tenGod'];
  roleDisposition: StructureRoleDisposition;
  functionState: StemInteractionSettlementFact['participants']['controlled']['functionState'];
  structureImpact: StructureImpact;
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
    externalInfluences: settlement.externalInfluences.map((item) => ({ ...item })),
    participants: {
      controller: {
        ...settlement.participants.controller,
        incomingInfluences: settlement.participants.controller.incomingInfluences.map(
          (item) => ({ ...item }),
        ),
      },
      controlled: {
        ...settlement.participants.controlled,
        incomingInfluences: settlement.participants.controlled.incomingInfluences.map(
          (item) => ({ ...item }),
        ),
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
