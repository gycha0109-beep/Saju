import type {
  ResolvedTemporalStructureTransition,
  TemporalStructureAggregationRule,
  TemporalStructureScope,
  TemporalStructureState,
  TemporalStructureTransitionKind,
} from '../calculation/temporal-structure-transition.js';
import type { StructureImpact } from '../calculation/stem-interaction-settlement.js';

export const READING_TEMPORAL_STRUCTURE_TRANSITION_SCHEMA_VERSION =
  'myeongha-reading-temporal-structure-transition-v1' as const;

export interface ReadingTemporalStructureTransitionV1 {
  schemaVersion: typeof READING_TEMPORAL_STRUCTURE_TRANSITION_SCHEMA_VERSION;
  transitionId: string;
  structureId: string;
  period: {
    scope: TemporalStructureScope;
    periodKey: string;
    sequence: number;
  };
  previousState: TemporalStructureState;
  periodImpact: StructureImpact;
  aggregationRule: TemporalStructureAggregationRule;
  transitionKind: TemporalStructureTransitionKind;
  nextState: TemporalStructureState;
}

export function projectTemporalStructureTransitionForReading(
  transition: ResolvedTemporalStructureTransition,
): ReadingTemporalStructureTransitionV1 {
  return {
    schemaVersion: READING_TEMPORAL_STRUCTURE_TRANSITION_SCHEMA_VERSION,
    transitionId: transition.transitionId,
    structureId: transition.structureId,
    period: { ...transition.period },
    previousState: transition.previousState,
    periodImpact: transition.periodImpact,
    aggregationRule: transition.aggregationRule,
    transitionKind: transition.transitionKind,
    nextState: transition.nextState,
  };
}
