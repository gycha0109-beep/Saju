import { createHash } from 'node:crypto';
import type {
  HeavenlyStem,
  PillarSlot,
  StemInteractionFunctionState,
  StemInteractionSettlementFact,
  TenGod,
} from '../contracts/calculation.js';
import {
  resolveStructureImpactFromFunctionState,
  type StructureImpact,
  type StructureRoleDisposition,
} from './stem-interaction-settlement.js';

export const STRUCTURAL_ROLE_IMPACT_POLICY = Object.freeze({
  policyId: 'myeongha/structural-role-impact-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2245',
  roleInferenceRule: 'DO_NOT_INFER_ROLE_FROM_TEN_GOD_IDENTITY',
  roleInputRule: 'REQUIRE_ONE_GOVERNED_ROLE_PER_SETTLEMENT_PARTICIPANT',
  criticalityOrder: ['core', 'supporting', 'secondary'] as const,
  degradationOrder: ['lost', 'impaired', 'constrained', 'preserved'] as const,
  exactTieRule: 'WEAKENS_STRUCTURE',
  numericWeightRule: 'NONE',
  extendsDecisionRef: 'GH-2236',
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

export const STRUCTURAL_ROLE_IMPACT_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(canonicalize(STRUCTURAL_ROLE_IMPACT_POLICY)))
  .digest('hex');

export type StructuralRoleCriticality = 'core' | 'supporting' | 'secondary';
export type SettlementParticipantRole = 'controller' | 'controlled';

export interface StructuralRoleAssignment {
  roleAssignmentId: string;
  structureId: string;
  authority: 'governed_upstream';
  pillar: PillarSlot;
  stem: HeavenlyStem;
  tenGod: TenGod;
  disposition: StructureRoleDisposition;
  criticality: StructuralRoleCriticality;
}

export interface StructuralParticipantImpact {
  participantRole: SettlementParticipantRole;
  roleAssignmentId: string;
  pillar: PillarSlot;
  stem: HeavenlyStem;
  tenGod: TenGod;
  disposition: StructureRoleDisposition;
  criticality: StructuralRoleCriticality;
  functionState: StemInteractionFunctionState;
  impact: StructureImpact;
}

export type StructuralImpactDecisionRule =
  | 'all_maintain'
  | 'single_direction'
  | 'criticality'
  | 'function_degradation'
  | 'conservative_tie_break';

export interface ResolvedStructuralRoleImpact {
  status: 'resolved';
  assessmentId: string;
  settlementId: string;
  structureId: string;
  participantImpacts: readonly [
    StructuralParticipantImpact,
    StructuralParticipantImpact,
  ];
  overallImpact: StructureImpact;
  decisionRule: StructuralImpactDecisionRule;
  decisiveRoleAssignmentIds: readonly string[];
}

export interface UnavailableStructuralRoleImpact {
  status: 'unavailable';
  settlementId: string;
  structureId: string;
  reasonCode:
    | 'missing_role_assignment'
    | 'duplicate_role_assignment';
  participantRoles: readonly SettlementParticipantRole[];
}

export type StructuralRoleImpactResolution =
  | ResolvedStructuralRoleImpact
  | UnavailableStructuralRoleImpact;

const CRITICALITY_ORDER: readonly StructuralRoleCriticality[] =
  STRUCTURAL_ROLE_IMPACT_POLICY.criticalityOrder;
const DEGRADATION_ORDER: readonly StemInteractionFunctionState[] =
  STRUCTURAL_ROLE_IMPACT_POLICY.degradationOrder;

function exactAssignmentMatches(
  assignment: StructuralRoleAssignment,
  structureId: string,
  participant: {
    pillar: PillarSlot;
    stem: HeavenlyStem;
    tenGod: TenGod;
  },
): boolean {
  return (
    assignment.structureId === structureId &&
    assignment.authority === 'governed_upstream' &&
    assignment.pillar === participant.pillar &&
    assignment.stem === participant.stem &&
    assignment.tenGod === participant.tenGod
  );
}

function participantImpact(
  participantRole: SettlementParticipantRole,
  participant: StemInteractionSettlementFact['participants'][SettlementParticipantRole],
  assignment: StructuralRoleAssignment,
): StructuralParticipantImpact {
  return {
    participantRole,
    roleAssignmentId: assignment.roleAssignmentId,
    pillar: participant.pillar,
    stem: participant.stem,
    tenGod: participant.tenGod,
    disposition: assignment.disposition,
    criticality: assignment.criticality,
    functionState: participant.functionState,
    impact: resolveStructureImpactFromFunctionState(
      participant.functionState,
      assignment.disposition,
    ),
  };
}

function firstPresentCriticality(
  impacts: readonly StructuralParticipantImpact[],
): StructuralRoleCriticality {
  const found = CRITICALITY_ORDER.find((criticality) =>
    impacts.some((item) => item.criticality === criticality),
  );
  if (found === undefined) throw new Error('directional impact criticality missing');
  return found;
}

function firstPresentDegradation(
  impacts: readonly StructuralParticipantImpact[],
): StemInteractionFunctionState {
  const found = DEGRADATION_ORDER.find((state) =>
    impacts.some((item) => item.functionState === state),
  );
  if (found === undefined) throw new Error('directional impact function state missing');
  return found;
}

function resolveOverallImpact(
  participantImpacts: readonly StructuralParticipantImpact[],
): {
  overallImpact: StructureImpact;
  decisionRule: StructuralImpactDecisionRule;
  decisiveRoleAssignmentIds: readonly string[];
} {
  const directional = participantImpacts.filter(
    (item) => item.impact !== 'maintains_structure',
  );

  if (directional.length === 0) {
    return {
      overallImpact: 'maintains_structure',
      decisionRule: 'all_maintain',
      decisiveRoleAssignmentIds: participantImpacts
        .map((item) => item.roleAssignmentId)
        .sort(),
    };
  }

  const criticality = firstPresentCriticality(directional);
  const byCriticality = directional.filter(
    (item) => item.criticality === criticality,
  );
  const degradation = firstPresentDegradation(byCriticality);
  const finalists = byCriticality.filter(
    (item) => item.functionState === degradation,
  );

  const hasWeakening = finalists.some(
    (item) => item.impact === 'weakens_structure',
  );
  const hasStrengthening = finalists.some(
    (item) => item.impact === 'strengthens_structure',
  );

  let overallImpact: StructureImpact;
  let decisionRule: StructuralImpactDecisionRule;

  if (hasWeakening && hasStrengthening) {
    overallImpact = 'weakens_structure';
    decisionRule = 'conservative_tie_break';
  } else {
    overallImpact = hasWeakening ? 'weakens_structure' : 'strengthens_structure';
    if (byCriticality.length < directional.length) {
      decisionRule = 'criticality';
    } else if (finalists.length < byCriticality.length) {
      decisionRule = 'function_degradation';
    } else {
      decisionRule = 'single_direction';
    }
  }

  return {
    overallImpact,
    decisionRule,
    decisiveRoleAssignmentIds: finalists
      .map((item) => item.roleAssignmentId)
      .sort(),
  };
}

export function resolveStructuralRoleImpact(
  settlement: StemInteractionSettlementFact,
  structureId: string,
  assignments: readonly StructuralRoleAssignment[],
): StructuralRoleImpactResolution {
  const roles: readonly SettlementParticipantRole[] = ['controller', 'controlled'];
  const matched: Partial<Record<SettlementParticipantRole, StructuralRoleAssignment>> = {};
  const missing: SettlementParticipantRole[] = [];
  const duplicate: SettlementParticipantRole[] = [];

  for (const role of roles) {
    const participant = settlement.participants[role];
    const candidates = assignments.filter((assignment) =>
      exactAssignmentMatches(assignment, structureId, participant),
    );

    if (candidates.length === 0) {
      missing.push(role);
      continue;
    }
    if (candidates.length > 1) {
      duplicate.push(role);
      continue;
    }
    const candidate = candidates[0];
    if (candidate === undefined) {
      missing.push(role);
      continue;
    }
    matched[role] = candidate;
  }

  if (duplicate.length > 0) {
    return {
      status: 'unavailable',
      settlementId: settlement.settlementId,
      structureId,
      reasonCode: 'duplicate_role_assignment',
      participantRoles: duplicate.sort(),
    };
  }

  if (missing.length > 0) {
    return {
      status: 'unavailable',
      settlementId: settlement.settlementId,
      structureId,
      reasonCode: 'missing_role_assignment',
      participantRoles: missing.sort(),
    };
  }

  const controllerAssignment = matched.controller;
  const controlledAssignment = matched.controlled;
  if (controllerAssignment === undefined || controlledAssignment === undefined) {
    throw new Error('validated role assignment map incomplete');
  }

  const participantImpacts = [
    participantImpact('controller', settlement.participants.controller, controllerAssignment),
    participantImpact('controlled', settlement.participants.controlled, controlledAssignment),
  ] as const;

  const decision = resolveOverallImpact(participantImpacts);
  const assessmentMaterial = {
    policyContentHash: STRUCTURAL_ROLE_IMPACT_POLICY_CONTENT_HASH,
    settlementId: settlement.settlementId,
    structureId,
    participantImpacts,
    overallImpact: decision.overallImpact,
    decisionRule: decision.decisionRule,
    decisiveRoleAssignmentIds: decision.decisiveRoleAssignmentIds,
  };
  const assessmentId = `structural_role_impact_${createHash('sha256')
    .update(JSON.stringify(canonicalize(assessmentMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    status: 'resolved',
    assessmentId,
    settlementId: settlement.settlementId,
    structureId,
    participantImpacts,
    overallImpact: decision.overallImpact,
    decisionRule: decision.decisionRule,
    decisiveRoleAssignmentIds: decision.decisiveRoleAssignmentIds,
  };
}
