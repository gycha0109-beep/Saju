import {
  FR237_PRIMARY_METRIC,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { portableSha256RefFR248 } from './observable-morphology-browser-portable-crypto-fr248.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR255_CONTRACT_VERSION =
  'FR255-LONGITUDINAL-REPEATABILITY-OBSERVATION-BUNDLE-v1' as const;

export const FR255_NEXT_FRONTIER =
  'collect_additional_separately_executed_fr251_observation_blocks_then_review_descriptive_within_and_between_session_variation_before_any_threshold_or_calibration_proposal' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUIRED_SLOTS = ['1:1', '1:2', '2:1', '2:2'] as const;

type SessionOrdinal = 1 | 2;
type CaptureOrdinal = 1 | 2;

export type FR255DeviceClass = 'phone' | 'desktop' | 'tablet' | 'other' | 'unknown';
export type FR255CameraFacing = 'front' | 'rear' | 'external' | 'unknown';
export type FR255Orientation = 'portrait' | 'landscape' | 'unknown';
export type FR255LightingCondition =
  | 'indoor_typical'
  | 'indoor_bright'
  | 'indoor_dim'
  | 'outdoor'
  | 'mixed'
  | 'unknown';
export type FR255PresenceObservation = 'present' | 'absent' | 'unknown';

export interface FR255CaptureConditionObservation {
  readonly schemaVersion: 'fr255-capture-condition-observation-v1';
  readonly deviceClass: FR255DeviceClass;
  readonly cameraFacing: FR255CameraFacing;
  readonly orientation: FR255Orientation;
  readonly lightingCondition: FR255LightingCondition;
  readonly glassesPresent: FR255PresenceObservation;
  readonly hairOccludingEyeRegion: FR255PresenceObservation;
  readonly neutralExpressionOperatorAttested: boolean;
  readonly frontalPoseOperatorAttested: boolean;
  readonly operatorObservationOnly: true;
  readonly independentlyVerified: false;
  readonly qualityThresholdApplied: false;
}

export interface FR255SourceSlotObservation {
  readonly sessionOrdinal: SessionOrdinal;
  readonly captureOrdinal: CaptureOrdinal;
  readonly resultStatus: 'accepted_for_dry_run_mechanics_only' | 'rejected';
  readonly qualityAssessment: {
    readonly singleFace: boolean;
    readonly frontalPose: boolean;
    readonly sharpness: boolean;
    readonly bilateralEyeRegionVisibility: boolean;
    readonly bilateralEyeLandmarkCoverage: boolean;
    readonly majorEyeRegionOcclusionAbsent: boolean;
  };
  readonly rejectionReasons: readonly string[];
  readonly primaryMetric: null | {
    readonly metricRef: typeof FR237_PRIMARY_METRIC;
    readonly unit: 'degree';
    readonly value: number;
  };
  readonly metricExtractorInvoked: boolean;
  readonly workingBufferZeroizedAfterProcessing: true;
  readonly rawBytesPersisted: false;
  readonly rawImageDigestPersisted: false;
  readonly reviewImagePersisted: false;
  readonly faceEmbeddingPersisted: false;
  readonly identityTemplatePersisted: false;
}

export interface FR255SessionDescriptiveSummary {
  readonly sessionOrdinal: SessionOrdinal;
  readonly acceptedMetricCount: number;
  readonly acceptedValuesDegrees: readonly number[];
  readonly meanDegrees: number | null;
  readonly absoluteDifferenceDegrees: number | null;
  readonly rangeDegrees: number | null;
  readonly evaluationState: 'descriptive_only_no_repeatability_pass_fail';
}

export interface FR255LongitudinalObservation {
  readonly schemaVersion: 'fr255-longitudinal-observation-v1';
  readonly observationOrdinal: number;
  readonly sourceExecutionRef: string;
  readonly sourceGeneratedAt: string;
  readonly importedAt: string;
  readonly elapsedSincePreviousObservationMs: number | null;
  readonly participantContinuity: {
    readonly baselineParticipantOperatorAttested: boolean;
    readonly sameParticipantAsPreviousOperatorAttested: boolean | null;
    readonly independentlyVerified: false;
    readonly identityMatchingPerformed: false;
  };
  readonly executionSeparation: {
    readonly separateFR251ExecutionOperatorAttested: true;
    readonly elapsedTimeRecordedWithoutMinimumThreshold: true;
    readonly temporalSeparationIndependentlyVerified: false;
  };
  readonly captureConditions: FR255CaptureConditionObservation;
  readonly sourceMechanics: {
    readonly requiredSlotCount: 4;
    readonly recordedSlotCount: 4;
    readonly acceptedCaptureCount: number;
    readonly rejectedCaptureCount: number;
    readonly mechanicsReviewState:
      | 'four_slot_operator_attested_mechanics_complete'
      | 'four_slot_operator_attested_mechanics_complete_with_rejections';
    readonly fourRequiredSlotsObserved: true;
  };
  readonly slots: readonly FR255SourceSlotObservation[];
  readonly sessionSummaries: readonly FR255SessionDescriptiveSummary[];
  readonly observationSummary: {
    readonly acceptedMetricCount: number;
    readonly acceptedMetricMeanDegrees: number | null;
    readonly firstSessionMeanDegrees: number | null;
    readonly secondSessionMeanDegrees: number | null;
    readonly signedDifferenceSecondMinusFirstSessionMeanDegrees: number | null;
    readonly absoluteDifferenceBetweenSessionMeansDegrees: number | null;
    readonly evaluationState: 'descriptive_only_no_repeatability_pass_fail';
  };
  readonly previousObservationDigest: string | null;
  readonly observationDigest: string;
}

export interface FR255LongitudinalRepeatabilityBundle {
  readonly schemaVersion: 'fr255-longitudinal-repeatability-observation-bundle-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR255_CONTRACT_VERSION;
  readonly authorityState:
    'longitudinal_repeatability_observations_descriptive_only_no_threshold_or_calibration';
  readonly studyRef: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly metricRef: typeof FR237_PRIMARY_METRIC;
  readonly observations: readonly FR255LongitudinalObservation[];
  readonly descriptiveSummary: {
    readonly observationBlockCount: number;
    readonly sourceSessionCount: number;
    readonly acceptedCaptureMetricCount: number;
    readonly sessionMeanCount: number;
    readonly sessionMeansDegrees: readonly number[];
    readonly meanOfSessionMeansDegrees: number | null;
    readonly medianOfSessionMeansDegrees: number | null;
    readonly minimumSessionMeanDegrees: number | null;
    readonly maximumSessionMeanDegrees: number | null;
    readonly rangeOfSessionMeansDegrees: number | null;
    readonly populationStandardDeviationOfSessionMeansDegrees: number | null;
    readonly medianAbsoluteDeviationOfSessionMeansDegrees: number | null;
    readonly withinSessionAbsoluteDifferencesDegrees: readonly number[];
    readonly observationBlockMeansDegrees: readonly number[];
    readonly firstToLatestObservationMeanSignedDifferenceDegrees: number | null;
    readonly firstToLatestObservationMeanAbsoluteDifferenceDegrees: number | null;
    readonly evaluationState: 'descriptive_only_no_repeatability_pass_fail';
  };
  readonly chainHeadDigest: string;
  readonly privacyBoundary: {
    readonly sourceParticipantRefRetained: false;
    readonly sourceOperatorRefRetained: false;
    readonly rawMediaPersisted: false;
    readonly rawImageDigestPersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly participantIdentityIndependentlyVerified: false;
    readonly temporalSeparationIndependentlyVerified: false;
    readonly captureQualityConstructValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityPassFailIssued: false;
    readonly numericRepeatabilityThresholdIssued: false;
    readonly numericCaptureQualityThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly confidenceGradeIssued: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR255_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-255 ' + message);
}

function object(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(label + ' must be an object.');
  }
  return value as Record<string, unknown>;
}

function array(value: unknown, label: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(label + ' must be an array.');
  return value;
}

function exactIso(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0) fail(label + ' must be a non-empty string.');
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail(label + ' must be an exact ISO-8601 UTC timestamp.');
  }
  return value;
}

function finite(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function boolean(value: unknown, label: string): boolean {
  if (typeof value !== 'boolean') fail(label + ' must be boolean.');
  return value;
}

function mean(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  const ordered = [...values].sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 === 1
    ? ordered[middle]!
    : (ordered[middle - 1]! + ordered[middle]!) / 2;
}

function populationStandardDeviation(values: readonly number[]): number | null {
  const average = mean(values);
  if (average === null) return null;
  const variance =
    values.reduce((sum, value) => sum + ((value - average) ** 2), 0) / values.length;
  return Math.sqrt(variance);
}

function medianAbsoluteDeviation(values: readonly number[]): number | null {
  const center = median(values);
  if (center === null) return null;
  return median(values.map((value) => Math.abs(value - center)));
}

function nullOrFinite(value: number | null): number | null {
  return value === null ? null : finite(value, 'derived descriptive statistic');
}

function validateCaptureConditions(
  input: FR255CaptureConditionObservation,
): FR255CaptureConditionObservation {
  const devices = new Set<FR255DeviceClass>(['phone', 'desktop', 'tablet', 'other', 'unknown']);
  const cameras = new Set<FR255CameraFacing>(['front', 'rear', 'external', 'unknown']);
  const orientations = new Set<FR255Orientation>(['portrait', 'landscape', 'unknown']);
  const lighting = new Set<FR255LightingCondition>([
    'indoor_typical', 'indoor_bright', 'indoor_dim', 'outdoor', 'mixed', 'unknown',
  ]);
  const presence = new Set<FR255PresenceObservation>(['present', 'absent', 'unknown']);
  if (
    input.schemaVersion !== 'fr255-capture-condition-observation-v1'
    || !devices.has(input.deviceClass)
    || !cameras.has(input.cameraFacing)
    || !orientations.has(input.orientation)
    || !lighting.has(input.lightingCondition)
    || !presence.has(input.glassesPresent)
    || !presence.has(input.hairOccludingEyeRegion)
    || typeof input.neutralExpressionOperatorAttested !== 'boolean'
    || typeof input.frontalPoseOperatorAttested !== 'boolean'
    || input.operatorObservationOnly !== true
    || input.independentlyVerified !== false
    || input.qualityThresholdApplied !== false
  ) {
    fail('capture condition observation drift.');
  }
  return Object.freeze({ ...input });
}

function sourceSlot(recordValue: unknown): FR255SourceSlotObservation {
  const record = object(recordValue, 'FR251 record');
  const sessionOrdinal = record.sessionOrdinal;
  const captureOrdinal = record.captureOrdinal;
  if (sessionOrdinal !== 1 && sessionOrdinal !== 2) fail('FR251 sessionOrdinal drift.');
  if (captureOrdinal !== 1 && captureOrdinal !== 2) fail('FR251 captureOrdinal drift.');
  const resultStatus = record.resultStatus;
  if (
    resultStatus !== 'accepted_for_dry_run_mechanics_only'
    && resultStatus !== 'rejected'
  ) {
    fail('FR251 resultStatus drift.');
  }

  const quality = object(record.qualityAssessment, 'FR251 qualityAssessment');
  const qualityAssessment = Object.freeze({
    singleFace: boolean(quality.singleFace, 'singleFace'),
    frontalPose: boolean(quality.frontalPose, 'frontalPose'),
    sharpness: boolean(quality.sharpness, 'sharpness'),
    bilateralEyeRegionVisibility: boolean(
      quality.bilateralEyeRegionVisibility,
      'bilateralEyeRegionVisibility',
    ),
    bilateralEyeLandmarkCoverage: boolean(
      quality.bilateralEyeLandmarkCoverage,
      'bilateralEyeLandmarkCoverage',
    ),
    majorEyeRegionOcclusionAbsent: boolean(
      quality.majorEyeRegionOcclusionAbsent,
      'majorEyeRegionOcclusionAbsent',
    ),
  });

  const rejectionReasons = array(record.rejectionReasons, 'FR251 rejectionReasons');
  if (!rejectionReasons.every((reason) => typeof reason === 'string')) {
    fail('FR251 rejectionReasons must contain strings only.');
  }

  let primaryMetric: FR255SourceSlotObservation['primaryMetric'] = null;
  if (record.primaryMetric !== null) {
    const metric = object(record.primaryMetric, 'FR251 primaryMetric');
    if (
      metric.metricRef !== FR237_PRIMARY_METRIC
      || metric.unit !== 'degree'
    ) {
      fail('FR251 primaryMetric must remain the frozen FR237 endpoint in degrees.');
    }
    primaryMetric = Object.freeze({
      metricRef: FR237_PRIMARY_METRIC,
      unit: 'degree' as const,
      value: finite(metric.value, 'FR251 primaryMetric.value'),
    });
  }

  const metricExtractorInvoked = boolean(
    record.metricExtractorInvoked,
    'FR251 metricExtractorInvoked',
  );
  if (resultStatus === 'accepted_for_dry_run_mechanics_only') {
    if (primaryMetric === null || metricExtractorInvoked !== true || rejectionReasons.length !== 0) {
      fail('accepted FR251 record must carry exactly one primary metric and no rejection reasons.');
    }
  } else if (primaryMetric !== null || metricExtractorInvoked !== false) {
    fail('rejected FR251 record must not carry a primary metric or invoke its extractor.');
  }

  for (const [key, expected] of [
    ['workingBufferZeroizedAfterProcessing', true],
    ['rawBytesPersisted', false],
    ['rawImageDigestPersisted', false],
    ['reviewImagePersisted', false],
    ['faceEmbeddingPersisted', false],
    ['identityTemplatePersisted', false],
    ['operatorAttestedRealParticipantExecution', true],
    ['independentRealParticipantExecutionVerification', false],
    ['empiricalEvidenceEligible', false],
    ['confirmatoryEvidenceEligible', false],
  ] as const) {
    if (record[key] !== expected) fail('FR251 record boundary drift at ' + key + '.');
  }

  return Object.freeze({
    sessionOrdinal,
    captureOrdinal,
    resultStatus,
    qualityAssessment,
    rejectionReasons: Object.freeze([...rejectionReasons]) as readonly string[],
    primaryMetric,
    metricExtractorInvoked,
    workingBufferZeroizedAfterProcessing: true as const,
    rawBytesPersisted: false as const,
    rawImageDigestPersisted: false as const,
    reviewImagePersisted: false as const,
    faceEmbeddingPersisted: false as const,
    identityTemplatePersisted: false as const,
  });
}

function parseFR251Source(sourceValue: unknown): {
  readonly generatedAt: string;
  readonly slots: readonly FR255SourceSlotObservation[];
  readonly acceptedCaptureCount: number;
  readonly rejectedCaptureCount: number;
  readonly mechanicsReviewState:
    | 'four_slot_operator_attested_mechanics_complete'
    | 'four_slot_operator_attested_mechanics_complete_with_rejections';
  readonly sourceExecutionRef: string;
} {
  const source = object(sourceValue, 'FR251 sanitized export');
  if (source.schemaVersion !== 'fr251-localhost-dry-run-sanitized-export-v1') {
    fail('source must be an FR251 sanitized export.');
  }
  const generatedAt = exactIso(source.generatedAt, 'FR251 generatedAt');
  const records = array(source.records, 'FR251 records').map(sourceSlot);

  if (records.length !== 4) fail('FR251 source must contain exactly four records.');
  const slots = [...records].sort(
    (left, right) =>
      left.sessionOrdinal - right.sessionOrdinal
      || left.captureOrdinal - right.captureOrdinal,
  );
  const observedSlots = slots.map(
    (slot) => String(slot.sessionOrdinal) + ':' + String(slot.captureOrdinal),
  );
  if (JSON.stringify(observedSlots) !== JSON.stringify(REQUIRED_SLOTS)) {
    fail('FR251 source must contain each required 1:1, 1:2, 2:1, 2:2 slot exactly once.');
  }

  const review = object(source.review, 'FR251 review');
  if (
    review.schemaVersion !== 'fr243-dry-run-mechanics-review-v1'
    || review.requiredSlotCount !== 4
    || review.recordedSlotCount !== 4
    || review.actualRealParticipantDryRunOperatorAttested !== true
    || review.actualRealParticipantDryRunIndependentlyVerified !== false
    || review.empiricalEvidenceEligible !== false
    || review.confirmatoryEvidenceEligible !== false
    || review.empiricalRepeatabilityEstablished !== false
    || review.interpretationValidityEstablished !== false
    || review.traditionalBindingIssued !== false
    || review.productionActivated !== false
    || review.commerceActivated !== false
  ) {
    fail('FR251 review authority/mechanics boundary drift.');
  }
  const acceptedCaptureCount = slots.filter(
    (slot) => slot.resultStatus === 'accepted_for_dry_run_mechanics_only',
  ).length;
  const rejectedCaptureCount = 4 - acceptedCaptureCount;
  if (
    review.acceptedCaptureCount !== acceptedCaptureCount
    || review.rejectedCaptureCount !== rejectedCaptureCount
  ) {
    fail('FR251 review counts do not match its records.');
  }
  const mechanicsReviewState = review.mechanicsReviewState;
  if (
    mechanicsReviewState !== 'four_slot_operator_attested_mechanics_complete'
    && mechanicsReviewState !== 'four_slot_operator_attested_mechanics_complete_with_rejections'
  ) {
    fail('FR251 mechanicsReviewState drift.');
  }

  const boundary = object(source.authorityBoundary, 'FR251 authorityBoundary');
  for (const [key, expected] of [
    ['rawMediaPersisted', false],
    ['rawImageDigestPersisted', false],
    ['faceEmbeddingPersisted', false],
    ['identityTemplatePersisted', false],
    ['temporalSeparationIndependentlyVerified', false],
    ['participantIdentityIndependentlyVerified', false],
    ['captureQualityConstructValidated', false],
    ['empiricalRepeatabilityEstablished', false],
    ['interpretationValidityEstablished', false],
    ['traditionalBindingIssued', false],
    ['productionActivated', false],
    ['commerceActivated', false],
  ] as const) {
    if (boundary[key] !== expected) fail('FR251 export authority boundary drift at ' + key + '.');
  }

  const sourceExecutionRef = portableSha256RefFR248(JSON.stringify({
    schemaVersion: source.schemaVersion,
    generatedAt,
    slots,
    review: {
      requiredSlotCount: 4,
      recordedSlotCount: 4,
      acceptedCaptureCount,
      rejectedCaptureCount,
      mechanicsReviewState,
    },
  }));

  return Object.freeze({
    generatedAt,
    slots: Object.freeze(slots),
    acceptedCaptureCount,
    rejectedCaptureCount,
    mechanicsReviewState,
    sourceExecutionRef,
  });
}

function sessionSummary(
  sessionOrdinal: SessionOrdinal,
  slots: readonly FR255SourceSlotObservation[],
): FR255SessionDescriptiveSummary {
  const values = slots
    .filter(
      (slot) =>
        slot.sessionOrdinal === sessionOrdinal
        && slot.resultStatus === 'accepted_for_dry_run_mechanics_only'
        && slot.primaryMetric !== null,
    )
    .map((slot) => slot.primaryMetric!.value);
  const average = mean(values);
  const difference = values.length === 2
    ? Math.abs(values[1]! - values[0]!)
    : null;
  const range = values.length === 0
    ? null
    : Math.max(...values) - Math.min(...values);
  return Object.freeze({
    sessionOrdinal,
    acceptedMetricCount: values.length,
    acceptedValuesDegrees: Object.freeze(values),
    meanDegrees: average,
    absoluteDifferenceDegrees: difference,
    rangeDegrees: range,
    evaluationState: 'descriptive_only_no_repeatability_pass_fail' as const,
  });
}

function observationSummary(
  slots: readonly FR255SourceSlotObservation[],
  sessions: readonly FR255SessionDescriptiveSummary[],
): FR255LongitudinalObservation['observationSummary'] {
  const acceptedValues = slots
    .filter((slot) => slot.primaryMetric !== null)
    .map((slot) => slot.primaryMetric!.value);
  const first = sessions.find((session) => session.sessionOrdinal === 1)?.meanDegrees ?? null;
  const second = sessions.find((session) => session.sessionOrdinal === 2)?.meanDegrees ?? null;
  const signed = first === null || second === null ? null : second - first;
  return Object.freeze({
    acceptedMetricCount: acceptedValues.length,
    acceptedMetricMeanDegrees: mean(acceptedValues),
    firstSessionMeanDegrees: first,
    secondSessionMeanDegrees: second,
    signedDifferenceSecondMinusFirstSessionMeanDegrees: signed,
    absoluteDifferenceBetweenSessionMeansDegrees: signed === null ? null : Math.abs(signed),
    evaluationState: 'descriptive_only_no_repeatability_pass_fail' as const,
  });
}

function observationDigestPayload(
  observation: Omit<FR255LongitudinalObservation, 'observationDigest'>,
): string {
  return JSON.stringify(observation);
}

function buildDescriptiveSummary(
  observations: readonly FR255LongitudinalObservation[],
): FR255LongitudinalRepeatabilityBundle['descriptiveSummary'] {
  const sessionMeans = observations.flatMap(
    (observation) =>
      observation.sessionSummaries
        .map((session) => session.meanDegrees)
        .filter((value): value is number => value !== null),
  );
  const withinSessionDifferences = observations.flatMap(
    (observation) =>
      observation.sessionSummaries
        .map((session) => session.absoluteDifferenceDegrees)
        .filter((value): value is number => value !== null),
  );
  const observationBlockMeans = observations
    .map((observation) => observation.observationSummary.acceptedMetricMeanDegrees)
    .filter((value): value is number => value !== null);
  const firstToLatest =
    observationBlockMeans.length < 2
      ? null
      : observationBlockMeans[observationBlockMeans.length - 1]! - observationBlockMeans[0]!;
  const minimum = sessionMeans.length === 0 ? null : Math.min(...sessionMeans);
  const maximum = sessionMeans.length === 0 ? null : Math.max(...sessionMeans);

  return Object.freeze({
    observationBlockCount: observations.length,
    sourceSessionCount: observations.length * 2,
    acceptedCaptureMetricCount: observations.reduce(
      (sum, observation) => sum + observation.observationSummary.acceptedMetricCount,
      0,
    ),
    sessionMeanCount: sessionMeans.length,
    sessionMeansDegrees: Object.freeze(sessionMeans),
    meanOfSessionMeansDegrees: mean(sessionMeans),
    medianOfSessionMeansDegrees: median(sessionMeans),
    minimumSessionMeanDegrees: minimum,
    maximumSessionMeanDegrees: maximum,
    rangeOfSessionMeansDegrees:
      minimum === null || maximum === null ? null : maximum - minimum,
    populationStandardDeviationOfSessionMeansDegrees:
      populationStandardDeviation(sessionMeans),
    medianAbsoluteDeviationOfSessionMeansDegrees:
      medianAbsoluteDeviation(sessionMeans),
    withinSessionAbsoluteDifferencesDegrees: Object.freeze(withinSessionDifferences),
    observationBlockMeansDegrees: Object.freeze(observationBlockMeans),
    firstToLatestObservationMeanSignedDifferenceDegrees: firstToLatest,
    firstToLatestObservationMeanAbsoluteDifferenceDegrees:
      firstToLatest === null ? null : Math.abs(firstToLatest),
    evaluationState: 'descriptive_only_no_repeatability_pass_fail' as const,
  });
}

function authorityBoundary(): FR255LongitudinalRepeatabilityBundle['authorityBoundary'] {
  return Object.freeze({
    participantIdentityIndependentlyVerified: false as const,
    temporalSeparationIndependentlyVerified: false as const,
    captureQualityConstructValidated: false as const,
    empiricalRepeatabilityEstablished: false as const,
    repeatabilityPassFailIssued: false as const,
    numericRepeatabilityThresholdIssued: false as const,
    numericCaptureQualityThresholdIssued: false as const,
    calibrationIssued: false as const,
    confidenceGradeIssued: false as const,
    interpretationValidityEstablished: false as const,
    traditionalBindingIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });
}

function privacyBoundary(): FR255LongitudinalRepeatabilityBundle['privacyBoundary'] {
  return Object.freeze({
    sourceParticipantRefRetained: false as const,
    sourceOperatorRefRetained: false as const,
    rawMediaPersisted: false as const,
    rawImageDigestPersisted: false as const,
    rawLandmarkSetPersisted: false as const,
    derivedFullFaceMetricGeometryPersisted: false as const,
    faceEmbeddingPersisted: false as const,
    identityTemplatePersisted: false as const,
  });
}

function buildObservation(input: {
  readonly ordinal: number;
  readonly source: ReturnType<typeof parseFR251Source>;
  readonly importedAt: string;
  readonly previous: FR255LongitudinalObservation | null;
  readonly baselineParticipantOperatorAttested: boolean;
  readonly sameParticipantAsPreviousOperatorAttested: boolean | null;
  readonly separateFR251ExecutionOperatorAttested: boolean;
  readonly captureConditions: FR255CaptureConditionObservation;
}): FR255LongitudinalObservation {
  const previousGeneratedAt =
    input.previous === null ? null : Date.parse(input.previous.sourceGeneratedAt);
  const currentGeneratedAt = Date.parse(input.source.generatedAt);
  if (previousGeneratedAt !== null && currentGeneratedAt <= previousGeneratedAt) {
    fail('new FR251 execution generatedAt must be later than the current chain head.');
  }
  if (input.ordinal === 1) {
    if (
      input.baselineParticipantOperatorAttested !== true
      || input.sameParticipantAsPreviousOperatorAttested !== null
    ) {
      fail('first observation requires only the baseline participant attestation.');
    }
  } else if (
    input.baselineParticipantOperatorAttested !== true
    || input.sameParticipantAsPreviousOperatorAttested !== true
  ) {
    fail('later observations require explicit same-participant continuity attestation.');
  }

  const sessions = Object.freeze([
    sessionSummary(1, input.source.slots),
    sessionSummary(2, input.source.slots),
  ]);
  const base = Object.freeze({
    schemaVersion: 'fr255-longitudinal-observation-v1' as const,
    observationOrdinal: input.ordinal,
    sourceExecutionRef: input.source.sourceExecutionRef,
    sourceGeneratedAt: input.source.generatedAt,
    importedAt: input.importedAt,
    elapsedSincePreviousObservationMs:
      previousGeneratedAt === null ? null : currentGeneratedAt - previousGeneratedAt,
    participantContinuity: Object.freeze({
      baselineParticipantOperatorAttested: true as const,
      sameParticipantAsPreviousOperatorAttested:
        input.sameParticipantAsPreviousOperatorAttested,
      independentlyVerified: false as const,
      identityMatchingPerformed: false as const,
    }),
    executionSeparation: Object.freeze({
      separateFR251ExecutionOperatorAttested:
        input.separateFR251ExecutionOperatorAttested === true
          ? true as const
          : fail('separate FR251 execution operator attestation is required.'),
      elapsedTimeRecordedWithoutMinimumThreshold: true as const,
      temporalSeparationIndependentlyVerified: false as const,
    }),
    captureConditions: validateCaptureConditions(input.captureConditions),
    sourceMechanics: Object.freeze({
      requiredSlotCount: 4 as const,
      recordedSlotCount: 4 as const,
      acceptedCaptureCount: input.source.acceptedCaptureCount,
      rejectedCaptureCount: input.source.rejectedCaptureCount,
      mechanicsReviewState: input.source.mechanicsReviewState,
      fourRequiredSlotsObserved: true as const,
    }),
    slots: input.source.slots,
    sessionSummaries: sessions,
    observationSummary: observationSummary(input.source.slots, sessions),
    previousObservationDigest:
      input.previous === null ? null : input.previous.observationDigest,
  });
  const digest = portableSha256RefFR248(observationDigestPayload(base));
  return Object.freeze({
    ...base,
    observationDigest: digest,
  });
}

function buildBundle(input: {
  readonly studyRef: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly observations: readonly FR255LongitudinalObservation[];
}): FR255LongitudinalRepeatabilityBundle {
  if (!SAFE_REF.test(input.studyRef)) fail('studyRef must be a bounded opaque reference.');
  if (input.observations.length === 0) fail('bundle must contain at least one observation.');
  return Object.freeze({
    schemaVersion: 'fr255-longitudinal-repeatability-observation-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR255_CONTRACT_VERSION,
    authorityState:
      'longitudinal_repeatability_observations_descriptive_only_no_threshold_or_calibration' as const,
    studyRef: input.studyRef,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    metricRef: FR237_PRIMARY_METRIC,
    observations: Object.freeze([...input.observations]),
    descriptiveSummary: buildDescriptiveSummary(input.observations),
    chainHeadDigest: input.observations[input.observations.length - 1]!.observationDigest,
    privacyBoundary: privacyBoundary(),
    authorityBoundary: authorityBoundary(),
    nextFrontier: FR255_NEXT_FRONTIER,
  });
}

export function createLongitudinalRepeatabilityBundleFR255(input: {
  readonly studyRef: string;
  readonly importedAt: string;
  readonly sourceFR251: unknown;
  readonly baselineParticipantOperatorAttested: true;
  readonly separateFR251ExecutionOperatorAttested: true;
  readonly captureConditions: FR255CaptureConditionObservation;
}): FR255LongitudinalRepeatabilityBundle {
  const importedAt = exactIso(input.importedAt, 'importedAt');
  const source = parseFR251Source(input.sourceFR251);
  const observation = buildObservation({
    ordinal: 1,
    source,
    importedAt,
    previous: null,
    baselineParticipantOperatorAttested:
      input.baselineParticipantOperatorAttested,
    sameParticipantAsPreviousOperatorAttested: null,
    separateFR251ExecutionOperatorAttested:
      input.separateFR251ExecutionOperatorAttested,
    captureConditions: input.captureConditions,
  });
  return buildBundle({
    studyRef: input.studyRef,
    createdAt: importedAt,
    updatedAt: importedAt,
    observations: [observation],
  });
}

export function appendLongitudinalRepeatabilityObservationFR255(input: {
  readonly bundle: unknown;
  readonly importedAt: string;
  readonly sourceFR251: unknown;
  readonly baselineParticipantOperatorAttested: true;
  readonly sameParticipantAsPreviousOperatorAttested: true;
  readonly separateFR251ExecutionOperatorAttested: true;
  readonly captureConditions: FR255CaptureConditionObservation;
}): FR255LongitudinalRepeatabilityBundle {
  const bundle = assertLongitudinalRepeatabilityBundleFR255(input.bundle);
  const importedAt = exactIso(input.importedAt, 'importedAt');
  if (Date.parse(importedAt) < Date.parse(bundle.updatedAt)) {
    fail('append importedAt cannot predate bundle.updatedAt.');
  }
  const source = parseFR251Source(input.sourceFR251);
  if (
    bundle.observations.some(
      (observation) => observation.sourceExecutionRef === source.sourceExecutionRef,
    )
  ) {
    fail('the same FR251 execution cannot be appended twice.');
  }
  const previous = bundle.observations[bundle.observations.length - 1]!;
  const next = buildObservation({
    ordinal: bundle.observations.length + 1,
    source,
    importedAt,
    previous,
    baselineParticipantOperatorAttested:
      input.baselineParticipantOperatorAttested,
    sameParticipantAsPreviousOperatorAttested:
      input.sameParticipantAsPreviousOperatorAttested,
    separateFR251ExecutionOperatorAttested:
      input.separateFR251ExecutionOperatorAttested,
    captureConditions: input.captureConditions,
  });
  return buildBundle({
    studyRef: bundle.studyRef,
    createdAt: bundle.createdAt,
    updatedAt: importedAt,
    observations: [...bundle.observations, next],
  });
}

export function assertLongitudinalRepeatabilityBundleFR255(
  value: unknown,
): FR255LongitudinalRepeatabilityBundle {
  const bundle = object(value, 'FR255 bundle');
  if (
    bundle.schemaVersion !== 'fr255-longitudinal-repeatability-observation-bundle-v1'
    || bundle.artifactVersion !== '0.1.0'
    || bundle.contractVersion !== FR255_CONTRACT_VERSION
    || bundle.authorityState
      !== 'longitudinal_repeatability_observations_descriptive_only_no_threshold_or_calibration'
    || bundle.metricRef !== FR237_PRIMARY_METRIC
    || bundle.nextFrontier !== FR255_NEXT_FRONTIER
    || typeof bundle.studyRef !== 'string'
    || !SAFE_REF.test(bundle.studyRef)
  ) {
    fail('bundle contract drift.');
  }
  const createdAt = exactIso(bundle.createdAt, 'bundle.createdAt');
  const updatedAt = exactIso(bundle.updatedAt, 'bundle.updatedAt');
  if (Date.parse(updatedAt) < Date.parse(createdAt)) {
    fail('bundle.updatedAt cannot predate createdAt.');
  }

  const rawObservations = array(bundle.observations, 'bundle.observations');
  if (rawObservations.length === 0) fail('bundle must contain observations.');
  const observations: FR255LongitudinalObservation[] = [];
  let previous: FR255LongitudinalObservation | null = null;
  for (let index = 0; index < rawObservations.length; index += 1) {
    const candidate = object(rawObservations[index], 'bundle observation');
    if (
      candidate.schemaVersion !== 'fr255-longitudinal-observation-v1'
      || candidate.observationOrdinal !== index + 1
      || typeof candidate.sourceExecutionRef !== 'string'
      || !candidate.sourceExecutionRef.startsWith('sha256:')
      || typeof candidate.observationDigest !== 'string'
      || !candidate.observationDigest.startsWith('sha256:')
    ) {
      fail('bundle observation contract drift.');
    }
    const sourceGeneratedAt = exactIso(
      candidate.sourceGeneratedAt,
      'observation.sourceGeneratedAt',
    );
    const importedAt = exactIso(candidate.importedAt, 'observation.importedAt');
    const participantContinuity = object(
      candidate.participantContinuity,
      'participantContinuity',
    );
    const executionSeparation = object(
      candidate.executionSeparation,
      'executionSeparation',
    );
    if (
      participantContinuity.baselineParticipantOperatorAttested !== true
      || participantContinuity.independentlyVerified !== false
      || participantContinuity.identityMatchingPerformed !== false
      || executionSeparation.separateFR251ExecutionOperatorAttested !== true
      || executionSeparation.elapsedTimeRecordedWithoutMinimumThreshold !== true
      || executionSeparation.temporalSeparationIndependentlyVerified !== false
    ) {
      fail('observation participant/separation authority drift.');
    }
    if (
      index === 0
      ? participantContinuity.sameParticipantAsPreviousOperatorAttested !== null
      : participantContinuity.sameParticipantAsPreviousOperatorAttested !== true
    ) {
      fail('observation same-participant continuity chain drift.');
    }
    const elapsed = candidate.elapsedSincePreviousObservationMs;
    if (
      index === 0
        ? elapsed !== null
        : typeof elapsed !== 'number' || !Number.isFinite(elapsed) || elapsed <= 0
    ) {
      fail('observation elapsed-time chain drift.');
    }
    if (previous !== null) {
      const expectedElapsed: number =
        Date.parse(sourceGeneratedAt) - Date.parse(previous.sourceGeneratedAt);
      if (
        expectedElapsed <= 0
        || elapsed !== expectedElapsed
        || candidate.previousObservationDigest !== previous.observationDigest
      ) {
        fail('observation append-only timing/digest chain drift.');
      }
    } else if (candidate.previousObservationDigest !== null) {
      fail('first observation previousObservationDigest must be null.');
    }

    const captureConditions = validateCaptureConditions(
      candidate.captureConditions as FR255CaptureConditionObservation,
    );
    const sourceMechanics = object(candidate.sourceMechanics, 'sourceMechanics');
    if (
      sourceMechanics.requiredSlotCount !== 4
      || sourceMechanics.recordedSlotCount !== 4
      || sourceMechanics.fourRequiredSlotsObserved !== true
      || typeof sourceMechanics.acceptedCaptureCount !== 'number'
      || typeof sourceMechanics.rejectedCaptureCount !== 'number'
      || sourceMechanics.acceptedCaptureCount + sourceMechanics.rejectedCaptureCount !== 4
    ) {
      fail('sourceMechanics drift.');
    }
    const slots = array(candidate.slots, 'observation.slots') as unknown as readonly FR255SourceSlotObservation[];
    const sessionSummaries = array(
      candidate.sessionSummaries,
      'observation.sessionSummaries',
    ) as unknown as readonly FR255SessionDescriptiveSummary[];
    if (slots.length !== 4 || sessionSummaries.length !== 2) {
      fail('observation slot/session summary shape drift.');
    }

    const rebuiltWithoutDigest: Omit<FR255LongitudinalObservation, 'observationDigest'> = {
      schemaVersion: 'fr255-longitudinal-observation-v1' as const,
      observationOrdinal: index + 1,
      sourceExecutionRef: candidate.sourceExecutionRef as string,
      sourceGeneratedAt,
      importedAt,
      elapsedSincePreviousObservationMs: elapsed as number | null,
      participantContinuity: candidate.participantContinuity as FR255LongitudinalObservation['participantContinuity'],
      executionSeparation: candidate.executionSeparation as FR255LongitudinalObservation['executionSeparation'],
      captureConditions,
      sourceMechanics: candidate.sourceMechanics as FR255LongitudinalObservation['sourceMechanics'],
      slots,
      sessionSummaries,
      observationSummary: candidate.observationSummary as FR255LongitudinalObservation['observationSummary'],
      previousObservationDigest:
        candidate.previousObservationDigest as string | null,
    };
    const expectedDigest = portableSha256RefFR248(
      observationDigestPayload(rebuiltWithoutDigest),
    );
    if (candidate.observationDigest !== expectedDigest) {
      fail('observation digest chain verification failed.');
    }
    const accepted = slots.filter(
      (slot) => slot.resultStatus === 'accepted_for_dry_run_mechanics_only',
    ).length;
    if (
      sourceMechanics.acceptedCaptureCount !== accepted
      || sourceMechanics.rejectedCaptureCount !== 4 - accepted
    ) {
      fail('sourceMechanics counts do not match stored slots.');
    }
    const expectedSessions = Object.freeze([
      sessionSummary(1, slots),
      sessionSummary(2, slots),
    ]);
    if (JSON.stringify(sessionSummaries) !== JSON.stringify(expectedSessions)) {
      fail('stored session summaries do not match stored slots.');
    }
    const expectedObservationSummary = observationSummary(slots, expectedSessions);
    if (
      JSON.stringify(candidate.observationSummary)
      !== JSON.stringify(expectedObservationSummary)
    ) {
      fail('stored observation summary does not match stored slots.');
    }

    const observation: FR255LongitudinalObservation = Object.freeze({
      ...rebuiltWithoutDigest,
      observationDigest: expectedDigest,
    });
    observations.push(observation);
    previous = observation;
  }

  const expectedSummary = buildDescriptiveSummary(observations);
  if (JSON.stringify(bundle.descriptiveSummary) !== JSON.stringify(expectedSummary)) {
    fail('bundle descriptive summary does not match its observation chain.');
  }
  if (bundle.chainHeadDigest !== observations[observations.length - 1]!.observationDigest) {
    fail('bundle chainHeadDigest drift.');
  }
  const expectedPrivacy = privacyBoundary();
  const expectedAuthority = authorityBoundary();
  if (
    JSON.stringify(bundle.privacyBoundary) !== JSON.stringify(expectedPrivacy)
    || JSON.stringify(bundle.authorityBoundary) !== JSON.stringify(expectedAuthority)
  ) {
    fail('bundle privacy/authority boundary drift.');
  }

  return Object.freeze({
    schemaVersion: 'fr255-longitudinal-repeatability-observation-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR255_CONTRACT_VERSION,
    authorityState:
      'longitudinal_repeatability_observations_descriptive_only_no_threshold_or_calibration' as const,
    studyRef: bundle.studyRef,
    createdAt,
    updatedAt,
    metricRef: FR237_PRIMARY_METRIC,
    observations: Object.freeze(observations),
    descriptiveSummary: expectedSummary,
    chainHeadDigest: observations[observations.length - 1]!.observationDigest,
    privacyBoundary: expectedPrivacy,
    authorityBoundary: expectedAuthority,
    nextFrontier: FR255_NEXT_FRONTIER,
  });
}
