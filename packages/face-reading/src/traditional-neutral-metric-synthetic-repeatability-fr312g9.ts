import {
  FR312G_RELIABILITY_FAMILIES,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';
import {
  assertExactAxisEvidenceFeasibilityFR312G8,
} from './traditional-neutral-metric-source-feasibility-fr312g8.js';

export const FR312G9_HARNESS_ID = 'fr312g9.synthetic_only_repeatability_harness' as const;
export type SyntheticSessionFR312G9 = 'A' | 'B';
export type SyntheticCaptureFR312G9 = '1' | '2';

/**
 * Deliberately accepts ONLY synthetic scalar fixtures. This is not an
 * empirical runtime, dataset reader, face-image adapter, or study admission.
 */
export interface SyntheticMetricObservationFR312G9 {
  readonly syntheticFixtureOnly: true;
  readonly participantRef: string;
  readonly session: SyntheticSessionFR312G9;
  readonly capture: SyntheticCaptureFR312G9;
  readonly metricRef: string;
  readonly partition: 'development';
  readonly freshCapture: true;
  readonly captureAdmitted: true;
  readonly availability: 'available' | 'unavailable';
  readonly ratioValue: number | null;
  readonly unavailableReason: string | null;
}

export interface SyntheticAxisParticipantSummaryFR312G9 {
  readonly participantRef: string;
  readonly withinSessionAbsolutePairDifference: Readonly<{
    A: number | null;
    B: number | null;
  }>;
  readonly betweenSessionAbsoluteSessionMeanDifference: number | null;
  readonly withinParticipantRange: number | null;
}

export interface SyntheticAxisSummaryFR312G9 {
  readonly comparatorKey: string;
  readonly metricRef: string;
  readonly captureCount: number;
  readonly availableCount: number;
  readonly unavailableCount: number;
  readonly missingnessRate: number;
  readonly unavailableReasonCount: Readonly<Record<string, number>>;
  readonly participantSummaries: readonly SyntheticAxisParticipantSummaryFR312G9[];
  readonly syntheticIllustrationOnly: true;
  readonly empiricalEvidenceAdmitted: false;
}

export interface SyntheticRepeatabilityReportFR312G9 {
  readonly harnessId: typeof FR312G9_HARNESS_ID;
  readonly participantCountIsHypothetical: true;
  readonly syntheticParticipantCount: number;
  readonly axisSummaries: readonly SyntheticAxisSummaryFR312G9[];
  readonly actualParticipantCollectionAuthorized: false;
  readonly numericParticipantCountApproved: false;
  readonly reliabilityAcceptanceDetermined: false;
  readonly fr312hEntryAuthorized: false;
  readonly traditionalMeaningValidationAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

const OBSERVATION_KEYS = Object.freeze([
  'syntheticFixtureOnly', 'participantRef', 'session', 'capture', 'metricRef',
  'partition', 'freshCapture', 'captureAdmitted', 'availability', 'ratioValue',
  'unavailableReason',
] as const);

const SYNTHETIC_REF_PATTERN = /^synth-[a-z0-9-]{1,24}$/;
const REASON_PATTERN = /^[a-z][a-z0-9_]{0,63}$/;
const SESSIONS = ['A', 'B'] as const;
const CAPTURES = ['1', '2'] as const;
const AXES = FR312G_RELIABILITY_FAMILIES.flatMap((family) => family.metricAxes);
const AXIS_BY_REF = new Map(AXES.map((axis) => [axis.metricRef, axis] as const));

function meanTwo(a: number, b: number): number {
  return (a + b) / 2;
}

function validateObservation(obs: SyntheticMetricObservationFR312G9): void {
  if (obs === null || typeof obs !== 'object' || Array.isArray(obs)) {
    throw new Error('fr312g9_invalid_observation_shape');
  }
  const keys = Object.keys(obs);
  if (
    keys.length !== OBSERVATION_KEYS.length
    || keys.some((key) => !(OBSERVATION_KEYS as readonly string[]).includes(key))
  ) throw new Error('fr312g9_unknown_or_missing_field');
  if (
    obs.syntheticFixtureOnly !== true
    || typeof obs.participantRef !== 'string'
    || !SYNTHETIC_REF_PATTERN.test(obs.participantRef)
    || obs.partition !== 'development'
    || obs.freshCapture !== true
    || obs.captureAdmitted !== true
    || !SESSIONS.includes(obs.session)
    || !CAPTURES.includes(obs.capture)
  ) throw new Error('fr312g9_non_synthetic_or_unadmitted_capture');
  const axis = AXIS_BY_REF.get(obs.metricRef);
  if (!axis) throw new Error('fr312g9_unknown_metric_axis');
  if (obs.availability === 'available') {
    if (
      typeof obs.ratioValue !== 'number'
      || !Number.isFinite(obs.ratioValue)
      || (!axis.signedValueAllowed && obs.ratioValue < 0)
      || obs.unavailableReason !== null
    ) throw new Error('fr312g9_invalid_available_ratio');
  } else if (obs.availability === 'unavailable') {
    if (
      obs.ratioValue !== null
      || typeof obs.unavailableReason !== 'string'
      || !REASON_PATTERN.test(obs.unavailableReason)
    ) throw new Error('fr312g9_invalid_unavailable_record');
  } else {
    throw new Error('fr312g9_unknown_availability');
  }
}

export function evaluateSyntheticRepeatabilityFR312G9(
  observations: readonly SyntheticMetricObservationFR312G9[],
): SyntheticRepeatabilityReportFR312G9 {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertExactAxisEvidenceFeasibilityFR312G8();
  if (
    FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount !== null
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued
  ) throw new Error('fr312g9_numeric_authority_changed');
  if (!Array.isArray(observations) || observations.length === 0) {
    throw new Error('fr312g9_empty_or_invalid_fixture');
  }
  const observationMap = new Map<string, SyntheticMetricObservationFR312G9>();
  const participants = new Set<string>();
  for (const obs of observations) {
    validateObservation(obs);
    participants.add(obs.participantRef);
    const key = [obs.participantRef, obs.metricRef, obs.session, obs.capture].join('|');
    if (observationMap.has(key)) throw new Error('fr312g9_duplicate_capture_slot');
    observationMap.set(key, obs);
  }
  // Every participant has all eight axes and all four accepted capture slots.
  // A metric may be unavailable in a slot, but that slot must be explicit.
  if (observationMap.size !== participants.size * AXES.length * 4) {
    throw new Error('fr312g9_missing_capture_slot_or_axis');
  }
  const participantRefs = [...participants].sort();
  const axisSummaries: SyntheticAxisSummaryFR312G9[] = AXES.map((axis) => {
    const rows: SyntheticMetricObservationFR312G9[] = [];
    const participantSummaries: SyntheticAxisParticipantSummaryFR312G9[] = [];
    for (const participantRef of participantRefs) {
      const slots = SESSIONS.map((session) =>
        CAPTURES.map((capture) => {
          const row = observationMap.get([participantRef, axis.metricRef, session, capture].join('|'));
          if (!row) throw new Error('fr312g9_missing_capture_slot_or_axis');
          rows.push(row);
          return row.ratioValue;
        }));
      const [a, b] = slots;
      const pairA = a![0] !== null && a![1] !== null ? Math.abs(a![0]! - a![1]!) : null;
      const pairB = b![0] !== null && b![1] !== null ? Math.abs(b![0]! - b![1]!) : null;
      const between = pairA !== null && pairB !== null
        ? Math.abs(meanTwo(a![0]!, a![1]!) - meanTwo(b![0]!, b![1]!))
        : null;
      const available = [...a!, ...b!].filter((v): v is number => v !== null);
      participantSummaries.push(Object.freeze({
        participantRef,
        withinSessionAbsolutePairDifference: Object.freeze({ A: pairA, B: pairB }),
        betweenSessionAbsoluteSessionMeanDifference: between,
        withinParticipantRange: available.length >= 2
          ? Math.max(...available) - Math.min(...available)
          : null,
      }));
    }
    const unavailable = rows.filter((row) => row.availability === 'unavailable');
    const reasons: Record<string, number> = Object.create(null) as Record<string, number>;
    for (const row of unavailable) {
      const reason = row.unavailableReason!;
      reasons[reason] = (reasons[reason] ?? 0) + 1;
    }
    return Object.freeze({
      comparatorKey: axis.comparatorKey,
      metricRef: axis.metricRef,
      captureCount: rows.length,
      availableCount: rows.length - unavailable.length,
      unavailableCount: unavailable.length,
      missingnessRate: unavailable.length / rows.length,
      unavailableReasonCount: Object.freeze(reasons),
      participantSummaries: Object.freeze(participantSummaries),
      syntheticIllustrationOnly: true as const,
      empiricalEvidenceAdmitted: false as const,
    });
  });
  return Object.freeze({
    harnessId: FR312G9_HARNESS_ID,
    participantCountIsHypothetical: true as const,
    syntheticParticipantCount: participants.size,
    axisSummaries: Object.freeze(axisSummaries),
    actualParticipantCollectionAuthorized: false as const,
    numericParticipantCountApproved: false as const,
    reliabilityAcceptanceDetermined: false as const,
    fr312hEntryAuthorized: false as const,
    traditionalMeaningValidationAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}
