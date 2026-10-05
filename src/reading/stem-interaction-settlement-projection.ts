import type {
  StemInteractionSettlementFact,
  StructureImpact,
} from '../contracts/calculation.js';
import type {
  StructureRoleDisposition,
} from '../calculation/stem-interaction-settlement.js';
import {
  resolveStructureImpactFromFunctionState,
} from '../calculation/stem-interaction-settlement.js';

export const READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION =
  'myeongha-reading-stem-interaction-settlement-v1' as const;

export interface ReadingStemInteractionSettlementV1 {
  schemaVersion: typeof READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION;
  settlementId: string;
  pair: readonly ['갑', '기'];
  transformationApplied: false;
  activeRelations: readonly ['stem_five_combination', 'jia_controls_ji'];
  participants: {
    jia: {
      pillar: StemInteractionSettlementFact['participants']['jia']['pillar'];
      stem: '갑';
      tenGod: StemInteractionSettlementFact['participants']['jia']['tenGod'];
      element: '목';
      identityPreserved: true;
      functionState: 'constrained';
    };
    ji: {
      pillar: StemInteractionSettlementFact['participants']['ji']['pillar'];
      stem: '기';
      tenGod: StemInteractionSettlementFact['participants']['ji']['tenGod'];
      element: '토';
      identityPreserved: true;
      functionState: 'impaired';
    };
  };
}

export interface ReadingStemInteractionStructureImpactV1 {
  settlementId: string;
  affectedStem: '기';
  affectedTenGod: StemInteractionSettlementFact['participants']['ji']['tenGod'];
  roleDisposition: StructureRoleDisposition;
  structureImpact: StructureImpact;
}

export function projectStemInteractionSettlementForReading(
  settlement: StemInteractionSettlementFact,
): ReadingStemInteractionSettlementV1 {
  return {
    schemaVersion: READING_STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
    settlementId: settlement.settlementId,
    pair: settlement.pair,
    transformationApplied: settlement.transformationApplied,
    activeRelations: settlement.activeRelations,
    participants: {
      jia: { ...settlement.participants.jia },
      ji: { ...settlement.participants.ji },
    },
  };
}

export function projectStemInteractionStructureImpactForReading(
  settlement: StemInteractionSettlementFact,
  roleDisposition: StructureRoleDisposition,
): ReadingStemInteractionStructureImpactV1 {
  return {
    settlementId: settlement.settlementId,
    affectedStem: '기',
    affectedTenGod: settlement.participants.ji.tenGod,
    roleDisposition,
    structureImpact: resolveStructureImpactFromFunctionState(
      settlement.participants.ji.functionState,
      roleDisposition,
    ),
  };
}
