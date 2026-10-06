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
  'myeongha-reading-stem-interaction-settlement-v2' as const;

export interface ReadingStemInteractionSettlementV2 {
  schemaVersion: typeof READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION;
  settlementId: string;
  pair: readonly [HeavenlyStem, HeavenlyStem];
  transformationApplied: false;
  activeRelations: readonly ['stem_five_combination', 'element_control'];
  participants: StemInteractionSettlementFact['participants'];
}

export interface ReadingStemInteractionStructureImpactV2 {
  settlementId: string;
  affectedStem: HeavenlyStem;
  affectedTenGod: StemInteractionSettlementFact['participants']['controlled']['tenGod'];
  roleDisposition: StructureRoleDisposition;
  structureImpact: StructureImpact;
}

export function projectStemInteractionSettlementForReading(
  settlement: StemInteractionSettlementFact,
): ReadingStemInteractionSettlementV2 {
  return {
    schemaVersion: READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
    settlementId: settlement.settlementId,
    pair: settlement.pair,
    transformationApplied: settlement.transformationApplied,
    activeRelations: settlement.activeRelations,
    participants: {
      controller: { ...settlement.participants.controller },
      controlled: { ...settlement.participants.controlled },
    },
  };
}

export function projectStemInteractionStructureImpactForReading(
  settlement: StemInteractionSettlementFact,
  roleDisposition: StructureRoleDisposition,
): ReadingStemInteractionStructureImpactV2 {
  return {
    settlementId: settlement.settlementId,
    affectedStem: settlement.participants.controlled.stem,
    affectedTenGod: settlement.participants.controlled.tenGod,
    roleDisposition,
    structureImpact: resolveStructureImpactFromFunctionState(
      settlement.participants.controlled.functionState,
      roleDisposition,
    ),
  };
}
