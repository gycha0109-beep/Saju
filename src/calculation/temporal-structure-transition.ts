import { createHash } from 'node:crypto';
import type {
  ResolvedStructuralRoleImpact,
  StructuralParticipantImpact,
  StructuralRoleCriticality,
} from './structural-role-impact.js';
import type { StructureImpact } from './stem-interaction-settlement.js';
import type { StemInteractionFunctionState } from '../contracts/calculation.js';

export const TEMPORAL_STRUCTURE_TRANSITION_POLICY = Object.freeze({
  policyId: 'myeongha/temporal-structure-transition-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2255',
  baselineRule: 'REQUIRE_GOVERNED_UPSTREAM_STRUCTURE_STATE',
  aggregationRule:
    'CRITICALITY_THEN_FUNCTION_DEGRADATION_THEN_CONSERVATIVE_WEAKENING_TIE_BREAK',
  criticalityOrder: ['core', 'supporting', 'secondary'] as const,
  degradationOrder: ['lost', 'impaired', 'constrained', 'preserved'] as const,
  transitionRule: 'ONE_STATE_STEP_PER_PERIOD',
  permanentNatalMutationRule: 'FORBIDDEN',
  numericWeightRule: 'NONE',
  extendsDecisionRef: 'GH-2245',
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

export const TEMPORAL_STRUCTURE_TRANSITION_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(canonicalize(TEMPORAL_STRUCTURE_TRANSITION_POLICY)))
  .digest('hex');

export type TemporalStructureState = 'intact' | 'weakened' | 'broken';
export type TemporalStructureScope = 'dayun' | 'annual' | 'monthly';

export interface GovernedTemporalStructureBaseline {
  baselineId: string;
  structureId: string;
  authority: 'governed_upstream';
  state: TemporalStructureState;
}

export interface TemporalStructurePeriod {
  scope: TemporalStructureScope;
  periodKey: string;
  sequence: number;
}

export type TemporalStructureTransitionKind =
  | 'reinforced'
  | 'stable'
  | 'degraded'
  | 'restored'
  | 'remains_weakened'
  | 'broken'
  | 'recovering'
  | 'remains_broken';

export type TemporalStructureAggregationRule =
  | 'all_maintain'
  | 'single_direction'
  | 'criticality'
  | 'function_degradation'
  | 'conservative_tie_break';

interface AssessmentSignal {
  assessmentId: string;
  impact: Exclude<StructureImpact, 'maintains_structure'>;
  criticality: StructuralRoleCriticality;
  functionState: StemInteractionFunctionState;
}

export interface ResolvedTemporalStructureTransition {
  status: 'resolved';
  transitionId: string;
  baselineId: string;
  structureId: string;
  period: TemporalStructurePeriod;
  previousState: TemporalStructureState;
  assessmentIds: readonly string[];
  periodImpact: StructureImpact;
  aggregationRule: TemporalStructureAggregationRule;
  decisiveAssessmentIds: readonly string[];
  transitionKind: TemporalStructureTransitionKind;
  nextState: TemporalStructureState;
}

export interface UnavailableTemporalStructureTransition {
  status: 'unavailable';
  baselineId: string;
  structureId: string;
  period: TemporalStructurePeriod;
  reasonCode:
    | 'no_structural_impact_assessment'
    | 'structure_id_mismatch'
    | 'duplicate_assessment_id'
    | 'invalid_decisive_participants';
  assessmentIds: readonly string[];
}

export type TemporalStructureTransitionResolution =
  | ResolvedTemporalStructureTransition
  | UnavailableTemporalStructureTransition;

export interface TemporalStructurePeriodAssessmentInput {
  period: TemporalStructurePeriod;
  assessments: readonly ResolvedStructuralRoleImpact[];
}

export interface ResolvedTemporalStructureReplay {
  status: 'resolved';
  replayId: string;
  baselineId: string;
  structureId: string;
  initialState: TemporalStructureState;
  transitions: readonly ResolvedTemporalStructureTransition[];
  finalState: TemporalStructureState;
}

export interface UnavailableTemporalStructureReplay {
  status: 'unavailable';
  baselineId: string;
  structureId: string;
  reasonCode: 'duplicate_period_sequence' | 'period_transition_unavailable';
  failedPeriodKey?: string;
}

export type TemporalStructureReplayResolution =
  | ResolvedTemporalStructureReplay
  | UnavailableTemporalStructureReplay;

const CRITICALITY_ORDER: readonly StructuralRoleCriticality[] =
  TEMPORAL_STRUCTURE_TRANSITION_POLICY.criticalityOrder;
const DEGRADATION_ORDER: readonly StemInteractionFunctionState[] =
  TEMPORAL_STRUCTURE_TRANSITION_POLICY.degradationOrder;

function decisiveParticipants(
  assessment: ResolvedStructuralRoleImpact,
): readonly StructuralParticipantImpact[] {
  const decisiveIds = new Set(assessment.decisiveRoleAssignmentIds);
  return assessment.participantImpacts.filter((item) =>
    decisiveIds.has(item.roleAssignmentId),
  );
}

function highestCriticality(
  impacts: readonly StructuralParticipantImpact[],
): StructuralRoleCriticality | undefined {
  return CRITICALITY_ORDER.find((criticality) =>
    impacts.some((item) => item.criticality === criticality),
  );
}

function highestDegradation(
  impacts: readonly StructuralParticipantImpact[],
): StemInteractionFunctionState | undefined {
  return DEGRADATION_ORDER.find((state) =>
    impacts.some((item) => item.functionState === state),
  );
}

function signalForAssessment(
  assessment: ResolvedStructuralRoleImpact,
): AssessmentSignal | undefined {
  if (assessment.overallImpact === 'maintains_structure') return undefined;

  const decisive = decisiveParticipants(assessment);
  const criticality = highestCriticality(decisive);
  if (criticality === undefined) return undefined;
  const sameCriticality = decisive.filter(
    (item) => item.criticality === criticality,
  );
  const functionState = highestDegradation(sameCriticality);
  if (functionState === undefined) return undefined;

  return {
    assessmentId: assessment.assessmentId,
    impact: assessment.overallImpact,
    criticality,
    functionState,
  };
}

function aggregatePeriodImpact(
  assessments: readonly ResolvedStructuralRoleImpact[],
):
  | {
      status: 'resolved';
      impact: StructureImpact;
      rule: TemporalStructureAggregationRule;
      decisiveAssessmentIds: readonly string[];
    }
  | {
      status: 'unavailable';
      reasonCode: 'invalid_decisive_participants';
    } {
  const directional: AssessmentSignal[] = [];

  for (const assessment of assessments) {
    if (assessment.overallImpact === 'maintains_structure') continue;
    const signal = signalForAssessment(assessment);
    if (signal === undefined) {
      return {
        status: 'unavailable',
        reasonCode: 'invalid_decisive_participants',
      };
    }
    directional.push(signal);
  }

  if (directional.length === 0) {
    return {
      status: 'resolved',
      impact: 'maintains_structure',
      rule: 'all_maintain',
      decisiveAssessmentIds: assessments
        .map((item) => item.assessmentId)
        .sort(),
    };
  }

  const criticality = CRITICALITY_ORDER.find((candidate) =>
    directional.some((item) => item.criticality === candidate),
  );
  if (criticality === undefined) {
    return {
      status: 'unavailable',
      reasonCode: 'invalid_decisive_participants',
    };
  }
  const byCriticality = directional.filter(
    (item) => item.criticality === criticality,
  );

  const degradation = DEGRADATION_ORDER.find((candidate) =>
    byCriticality.some((item) => item.functionState === candidate),
  );
  if (degradation === undefined) {
    return {
      status: 'unavailable',
      reasonCode: 'invalid_decisive_participants',
    };
  }
  const finalists = byCriticality.filter(
    (item) => item.functionState === degradation,
  );

  const hasWeakening = finalists.some(
    (item) => item.impact === 'weakens_structure',
  );
  const hasStrengthening = finalists.some(
    (item) => item.impact === 'strengthens_structure',
  );

  let impact: StructureImpact;
  let rule: TemporalStructureAggregationRule;

  if (hasWeakening && hasStrengthening) {
    impact = 'weakens_structure';
    rule = 'conservative_tie_break';
  } else {
    impact = hasWeakening ? 'weakens_structure' : 'strengthens_structure';
    if (byCriticality.length < directional.length) {
      rule = 'criticality';
    } else if (finalists.length < byCriticality.length) {
      rule = 'function_degradation';
    } else {
      rule = 'single_direction';
    }
  }

  return {
    status: 'resolved',
    impact,
    rule,
    decisiveAssessmentIds: finalists
      .map((item) => item.assessmentId)
      .sort(),
  };
}

function applyStateTransition(
  previousState: TemporalStructureState,
  impact: StructureImpact,
): {
  nextState: TemporalStructureState;
  transitionKind: TemporalStructureTransitionKind;
} {
  if (previousState === 'intact') {
    if (impact === 'strengthens_structure') {
      return { nextState: 'intact', transitionKind: 'reinforced' };
    }
    if (impact === 'weakens_structure') {
      return { nextState: 'weakened', transitionKind: 'degraded' };
    }
    return { nextState: 'intact', transitionKind: 'stable' };
  }

  if (previousState === 'weakened') {
    if (impact === 'strengthens_structure') {
      return { nextState: 'intact', transitionKind: 'restored' };
    }
    if (impact === 'weakens_structure') {
      return { nextState: 'broken', transitionKind: 'broken' };
    }
    return { nextState: 'weakened', transitionKind: 'remains_weakened' };
  }

  if (impact === 'strengthens_structure') {
    return { nextState: 'weakened', transitionKind: 'recovering' };
  }
  return { nextState: 'broken', transitionKind: 'remains_broken' };
}

export function resolveTemporalStructureTransition(
  baseline: GovernedTemporalStructureBaseline,
  period: TemporalStructurePeriod,
  assessments: readonly ResolvedStructuralRoleImpact[],
): TemporalStructureTransitionResolution {
  const assessmentIds = assessments
    .map((item) => item.assessmentId)
    .sort();

  if (assessments.length === 0) {
    return {
      status: 'unavailable',
      baselineId: baseline.baselineId,
      structureId: baseline.structureId,
      period,
      reasonCode: 'no_structural_impact_assessment',
      assessmentIds,
    };
  }

  if (assessments.some((item) => item.structureId !== baseline.structureId)) {
    return {
      status: 'unavailable',
      baselineId: baseline.baselineId,
      structureId: baseline.structureId,
      period,
      reasonCode: 'structure_id_mismatch',
      assessmentIds,
    };
  }

  if (new Set(assessmentIds).size !== assessmentIds.length) {
    return {
      status: 'unavailable',
      baselineId: baseline.baselineId,
      structureId: baseline.structureId,
      period,
      reasonCode: 'duplicate_assessment_id',
      assessmentIds,
    };
  }

  const aggregated = aggregatePeriodImpact(assessments);
  if (aggregated.status === 'unavailable') {
    return {
      status: 'unavailable',
      baselineId: baseline.baselineId,
      structureId: baseline.structureId,
      period,
      reasonCode: aggregated.reasonCode,
      assessmentIds,
    };
  }

  const stateTransition = applyStateTransition(
    baseline.state,
    aggregated.impact,
  );
  const transitionMaterial = {
    policyContentHash: TEMPORAL_STRUCTURE_TRANSITION_POLICY_CONTENT_HASH,
    baselineId: baseline.baselineId,
    structureId: baseline.structureId,
    period,
    previousState: baseline.state,
    assessmentIds,
    periodImpact: aggregated.impact,
    aggregationRule: aggregated.rule,
    decisiveAssessmentIds: aggregated.decisiveAssessmentIds,
    transitionKind: stateTransition.transitionKind,
    nextState: stateTransition.nextState,
  };
  const transitionId = `temporal_structure_transition_${createHash('sha256')
    .update(JSON.stringify(canonicalize(transitionMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    status: 'resolved',
    transitionId,
    baselineId: baseline.baselineId,
    structureId: baseline.structureId,
    period,
    previousState: baseline.state,
    assessmentIds,
    periodImpact: aggregated.impact,
    aggregationRule: aggregated.rule,
    decisiveAssessmentIds: aggregated.decisiveAssessmentIds,
    transitionKind: stateTransition.transitionKind,
    nextState: stateTransition.nextState,
  };
}

export function replayTemporalStructureTransitions(
  baseline: GovernedTemporalStructureBaseline,
  periods: readonly TemporalStructurePeriodAssessmentInput[],
): TemporalStructureReplayResolution {
  const sequences = periods.map((item) => item.period.sequence);
  if (new Set(sequences).size !== sequences.length) {
    return {
      status: 'unavailable',
      baselineId: baseline.baselineId,
      structureId: baseline.structureId,
      reasonCode: 'duplicate_period_sequence',
    };
  }

  const ordered = [...periods].sort((left, right) =>
    left.period.sequence === right.period.sequence
      ? left.period.periodKey.localeCompare(right.period.periodKey)
      : left.period.sequence - right.period.sequence,
  );

  const transitions: ResolvedTemporalStructureTransition[] = [];
  let currentState = baseline.state;

  for (const item of ordered) {
    const transition = resolveTemporalStructureTransition(
      {
        ...baseline,
        state: currentState,
      },
      item.period,
      item.assessments,
    );
    if (transition.status !== 'resolved') {
      return {
        status: 'unavailable',
        baselineId: baseline.baselineId,
        structureId: baseline.structureId,
        reasonCode: 'period_transition_unavailable',
        failedPeriodKey: item.period.periodKey,
      };
    }
    transitions.push(transition);
    currentState = transition.nextState;
  }

  const replayMaterial = {
    policyContentHash: TEMPORAL_STRUCTURE_TRANSITION_POLICY_CONTENT_HASH,
    baselineId: baseline.baselineId,
    structureId: baseline.structureId,
    initialState: baseline.state,
    transitionIds: transitions.map((item) => item.transitionId),
    finalState: currentState,
  };
  const replayId = `temporal_structure_replay_${createHash('sha256')
    .update(JSON.stringify(canonicalize(replayMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    status: 'resolved',
    replayId,
    baselineId: baseline.baselineId,
    structureId: baseline.structureId,
    initialState: baseline.state,
    transitions,
    finalState: currentState,
  };
}
