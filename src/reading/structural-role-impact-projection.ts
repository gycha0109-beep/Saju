import type {
  ResolvedStructuralRoleImpact,
  StructuralImpactDecisionRule,
  StructuralRoleCriticality,
} from '../calculation/structural-role-impact.js';
import type {
  StructureImpact,
  StructureRoleDisposition,
} from '../calculation/stem-interaction-settlement.js';
import type {
  HeavenlyStem,
  PillarSlot,
  StemInteractionFunctionState,
  TenGod,
} from '../contracts/calculation.js';

export const READING_STRUCTURAL_ROLE_IMPACT_SCHEMA_VERSION =
  'myeongha-reading-structural-role-impact-v1' as const;

export interface ReadingStructuralParticipantImpactV1 {
  participantRole: 'controller' | 'controlled';
  pillar: PillarSlot;
  stem: HeavenlyStem;
  tenGod: TenGod;
  disposition: StructureRoleDisposition;
  criticality: StructuralRoleCriticality;
  functionState: StemInteractionFunctionState;
  impact: StructureImpact;
}

export interface ReadingStructuralRoleImpactV1 {
  schemaVersion: typeof READING_STRUCTURAL_ROLE_IMPACT_SCHEMA_VERSION;
  assessmentId: string;
  settlementId: string;
  structureId: string;
  participantImpacts: readonly ReadingStructuralParticipantImpactV1[];
  overallImpact: StructureImpact;
  decisionRule: StructuralImpactDecisionRule;
}

export function projectStructuralRoleImpactForReading(
  assessment: ResolvedStructuralRoleImpact,
): ReadingStructuralRoleImpactV1 {
  return {
    schemaVersion: READING_STRUCTURAL_ROLE_IMPACT_SCHEMA_VERSION,
    assessmentId: assessment.assessmentId,
    settlementId: assessment.settlementId,
    structureId: assessment.structureId,
    participantImpacts: assessment.participantImpacts.map((item) => ({
      participantRole: item.participantRole,
      pillar: item.pillar,
      stem: item.stem,
      tenGod: item.tenGod,
      disposition: item.disposition,
      criticality: item.criticality,
      functionState: item.functionState,
      impact: item.impact,
    })),
    overallImpact: assessment.overallImpact,
    decisionRule: assessment.decisionRule,
  };
}
