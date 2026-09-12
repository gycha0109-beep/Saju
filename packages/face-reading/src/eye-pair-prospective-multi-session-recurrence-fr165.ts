import {
  assertIssuedEyePairProspectiveEphemeralRealCaptureSeriesFR161,
  type EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1,
} from './eye-pair-prospective-ephemeral-real-capture-series-fr161.js';
import {
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
  type EyePairProspectiveDescriptiveMetricSummaryFR159V1,
  type EyePairProspectivePrimaryMetricRefFR159V1,
} from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  assertIssuedEyePairProspectiveRecurrenceFR164,
  type EyePairProspectiveRecurrenceExecutionResultFR164V1,
  type EyePairProspectiveSessionMetricSummaryFR164V1,
} from './eye-pair-prospective-recurrence-execution-fr164.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR165_EYE_PAIR_PROSPECTIVE_MULTI_SESSION_RECURRENCE_RECORD_ID =
  'research.face_reading.neutral.eye_pair.prospective_multi_session_recurrence.fr165' as const;
export const FR165_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr165-eye-pair-prospective-multi-session-recurrence.md' as const;
export const FR165_NEXT_FRONTIER =
  'execute_fr165_when_additional_post_fr163_governed_sessions_are_available_then_continue_descriptive_series_without_independence_repeatability_threshold_quality_or_semantic_promotion' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUEST_KEYS = new Set([
  'schemaVersion',
  'extensionRunRef',
  'postFR163SessionCapturesAttested',
  'sameParticipantAcrossSessionsAttested',
  'sameCaptureSetupAttested',
  'sessionSeparationIndependentProof',
  'baseRecurrence',
  'additionalSessions',
]);
const SESSION_KEYS = new Set(['sessionRef', 'result']);
const ISSUED = new WeakSet<object>();

export interface EyePairProspectiveAdditionalSessionInputFR165V1 {
  readonly sessionRef: string;
  readonly result: EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1;
}

export interface EyePairProspectiveMultiSessionRecurrenceRequestFR165V1 {
  readonly schemaVersion: 'fr165-eye-pair-prospective-multi-session-recurrence-request-v1';
  readonly extensionRunRef: string;
  readonly postFR163SessionCapturesAttested: boolean;
  readonly sameParticipantAcrossSessionsAttested: boolean;
  readonly sameCaptureSetupAttested: boolean;
  readonly sessionSeparationIndependentProof: false;
  readonly baseRecurrence: EyePairProspectiveRecurrenceExecutionResultFR164V1;
  readonly additionalSessions: readonly EyePairProspectiveAdditionalSessionInputFR165V1[];
}

export interface EyePairProspectiveSessionMetricSummaryFR165V1 {
  readonly sessionRef: string;
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly rangeOverMean: number | null;
}

export interface EyePairProspectiveSeriesMeanStatisticsFR165V1 {
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly rangeOverMean: number | null;
}

export interface EyePairProspectiveAdjacentMeanComparisonFR165V1 {
  readonly fromSessionRef: string;
  readonly toSessionRef: string;
  readonly absoluteMeanDifference: number;
  readonly relativeMeanShiftFromPreviousSession: number | null;
  readonly evaluationState: 'descriptive_adjacent_session_shift_only';
}

export interface EyePairProspectiveMultiSessionMetricComparisonFR165V1 {
  readonly metricRef: EyePairProspectivePrimaryMetricRefFR159V1;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly sessions: readonly EyePairProspectiveSessionMetricSummaryFR165V1[];
  readonly sessionMeanStatistics: EyePairProspectiveSeriesMeanStatisticsFR165V1;
  readonly adjacentMeanComparisons: readonly EyePairProspectiveAdjacentMeanComparisonFR165V1[];
  readonly evaluationState: 'descriptive_multi_session_recurrence_only';
  readonly inferentialStatisticIssued: false;
  readonly correlationOrRedundancyConclusionIssued: false;
  readonly repeatabilityPassFailIssued: false;
  readonly captureSensitivityPassFailIssued: false;
  readonly thresholdDerivedFromObservedSamples: false;
  readonly productQualityGateDerivedFromObservedSamples: false;
}

export interface EyePairProspectiveMultiSessionRecurrenceResultFR165V1 {
  readonly schemaVersion: 'fr165-eye-pair-prospective-multi-session-recurrence-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR165_EYE_PAIR_PROSPECTIVE_MULTI_SESSION_RECURRENCE_RECORD_ID;
  readonly authorityState: 'prospective_multi_session_recurrence_descriptive_only';
  readonly extensionRunRef: string;
  readonly sessionRefs: readonly string[];
  readonly sessionCount: number;
  readonly primaryMetricCount: 2;
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly metricComparisons: readonly [
    EyePairProspectiveMultiSessionMetricComparisonFR165V1,
    EyePairProspectiveMultiSessionMetricComparisonFR165V1,
  ];
  readonly executionBoundary: {
    readonly baseIssuedFR164SessionCount: 2;
    readonly additionalIssuedFR161SessionCount: number;
    readonly governedSessionSummaryCount: number;
    readonly minimumSessionCount: 3;
    readonly postFR163SessionCapturesAttested: true;
    readonly sameParticipantAcrossSessionsAttested: true;
    readonly sameCaptureSetupAttested: true;
    readonly sameCaptureSetupAttestationMeansSamePhysicalLocation: false;
    readonly distinctSessionRefsRequired: true;
    readonly distinctSessionRefsMeanIndependentSessions: false;
    readonly sessionSeparationIndependentProof: false;
    readonly recurrenceDescriptiveOnly: true;
  };
  readonly authorityBoundary: {
    readonly prospectiveRecurrenceExtensionPerformed: true;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly sameParticipantAttestationMeansIdentityProof: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly inferentialStatisticIssued: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityValidated: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly correlationOrRedundancyConclusionIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly traditionalSemanticAuthority: false;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly participantDerivedNumericMetricValuesPersistedByThisRuntime: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR165_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR165_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-165 ${message}`);
}

function opaqueRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded protocol-local opaque reference without whitespace.`);
  }
  return value;
}

function validateMetricSummary(
  summary: EyePairProspectiveDescriptiveMetricSummaryFR159V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
  captureCount: number,
): void {
  if (
    summary.metricRef !== metricRef
    || summary.unit !== 'ratio'
    || summary.count !== captureCount
    || !Number.isSafeInteger(summary.count)
    || summary.count < 2
    || !Number.isFinite(summary.min)
    || !Number.isFinite(summary.max)
    || !Number.isFinite(summary.mean)
    || !Number.isFinite(summary.range)
    || summary.min <= 0
    || summary.max < summary.min
    || summary.mean <= 0
    || summary.range < 0
    || Math.abs(summary.range - (summary.max - summary.min)) > 1e-12
    || summary.evaluationState !== 'descriptive_only_no_repeatability_adjudication'
    || summary.classificationApplied !== false
    || summary.calibrationApplied !== false
    || summary.acceptanceThresholdApplied !== false
    || summary.captureQualityThresholdApplied !== false
    || summary.traditionalBindingApplied !== false
  ) fail(`issued FR-161 additional session ${metricRef} summary boundary drift.`);
}

function validateAdditionalSession(session: EyePairProspectiveAdditionalSessionInputFR165V1): void {
  if (typeof session !== 'object' || session === null) fail('each additional session must be an object.');
  const unexpectedKey = Object.keys(session).find((key) => !SESSION_KEYS.has(key));
  if (unexpectedKey !== undefined) fail(`additional session contains unauthorized field: ${unexpectedKey}.`);
  opaqueRef(session.sessionRef, 'sessionRef');
  assertIssuedEyePairProspectiveEphemeralRealCaptureSeriesFR161(session.result);

  const result = session.result;
  if (
    result.schemaVersion !== 'fr161-eye-pair-prospective-ephemeral-real-capture-series-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.authorityState !== 'ephemeral_prospective_real_capture_series_descriptive_only'
    || !Number.isSafeInteger(result.captureCount)
    || result.captureCount < 2
    || result.captures.length !== result.captureCount
    || result.captures.some((capture) => capture.providerLandmarkCount !== 478 || capture.governedMetricLandmarkCount !== 468)
    || result.intakeBoundary.minimumDistinctSourceByteCapturesRequired !== 2
    || result.intakeBoundary.exactDuplicateSourceBytesRejectedBeforeProviderExecution !== true
    || result.intakeBoundary.byteDistinctnessMeansIndependentCaptureEvent !== false
    || result.intakeBoundary.freshnessAttestationMeansIndependentFreshnessProof !== false
    || result.intakeBoundary.sameParticipantAttestationMeansIdentityProof !== false
    || result.metricBoundary.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || result.metricBoundary.preregisteredMetricRefs[0] !== FR159_X_SPAN_METRIC_REF
    || result.metricBoundary.preregisteredMetricRefs[1] !== FR159_PERIMETER_METRIC_REF
    || result.metricBoundary.repeatabilityPassFailIssued !== false
    || result.metricBoundary.captureSensitivityPassFailIssued !== false
    || result.metricBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || result.metricBoundary.numericCaptureQualityThreshold !== null
    || result.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.captureQualityValidated !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.sameDifferentParticipantClassificationIssued !== false
    || result.authorityBoundary.calibrationIssued !== false
    || result.authorityBoundary.thresholdIssued !== false
    || result.traditionalSemanticAuthority !== false
    || result.privacyBoundary.rawImagePersisted !== false
    || result.privacyBoundary.rawProviderResponsePersisted !== false
    || result.privacyBoundary.rawLandmarkSetPersisted !== false
    || result.privacyBoundary.derivedFullFaceMetricGeometryPersisted !== false
    || result.privacyBoundary.sourceDigestPersisted !== false
    || result.privacyBoundary.faceEmbeddingPersisted !== false
    || result.privacyBoundary.identityTemplatePersisted !== false
  ) fail('requires the exact issued FR-161 descriptive real-capture boundary.');

  if (result.dataset.seriesConditionSummaries.length !== 1) {
    fail('each additional FR-161 session must materialize exactly one series-condition summary.');
  }
  const summary = result.dataset.seriesConditionSummaries[0]!;
  if (
    summary.prospectiveCollectionRef !== result.prospectiveCollectionRef
    || summary.captureSeriesRef !== result.captureSeriesRef
    || summary.captureConditionRef !== result.captureConditionRef
    || summary.captureCount !== result.captureCount
    || summary.evaluationState !== 'descriptive_series_condition_summary_only'
    || summary.repeatabilityPassFailIssued !== false
    || summary.captureSensitivityPassFailIssued !== false
    || summary.identityComparisonIssued !== false
  ) fail('FR-160 summary does not match the issued additional FR-161 session wrapper.');
  validateMetricSummary(summary.metrics[0], FR159_X_SPAN_METRIC_REF, result.captureCount);
  validateMetricSummary(summary.metrics[1], FR159_PERIMETER_METRIC_REF, result.captureCount);
}

function metricSummary(
  session: EyePairProspectiveAdditionalSessionInputFR165V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveDescriptiveMetricSummaryFR159V1 {
  const metrics = session.result.dataset.seriesConditionSummaries[0]!.metrics;
  const summary = metrics.find((candidate) => candidate.metricRef === metricRef);
  if (summary === undefined) fail(`issued additional session lacks preregistered metric ${metricRef}.`);
  return summary;
}

export function computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165(
  means: readonly number[],
): EyePairProspectiveSeriesMeanStatisticsFR165V1 {
  if (means.length < 3 || means.some((value) => !Number.isFinite(value) || value <= 0)) {
    fail('multi-session descriptive means require at least three finite positive ratios.');
  }
  const min = Math.min(...means);
  const max = Math.max(...means);
  const mean = means.reduce((sum, value) => sum + value, 0) / means.length;
  const range = max - min;
  return Object.freeze({
    count: means.length,
    min,
    max,
    mean,
    range,
    rangeOverMean: mean === 0 ? null : range / mean,
  });
}

function baseSessionProjection(
  summary: EyePairProspectiveSessionMetricSummaryFR164V1,
): EyePairProspectiveSessionMetricSummaryFR165V1 {
  if (
    !Number.isSafeInteger(summary.count)
    || summary.count < 2
    || !Number.isFinite(summary.min)
    || !Number.isFinite(summary.max)
    || !Number.isFinite(summary.mean)
    || !Number.isFinite(summary.range)
    || summary.min <= 0
    || summary.max < summary.min
    || summary.mean <= 0
    || summary.range < 0
    || Math.abs(summary.range - (summary.max - summary.min)) > 1e-12
  ) fail('issued FR-164 base session projection drift.');
  return Object.freeze({
    sessionRef: opaqueRef(summary.sessionRef, 'base sessionRef'),
    count: summary.count,
    min: summary.min,
    max: summary.max,
    mean: summary.mean,
    range: summary.range,
    rangeOverMean: summary.rangeOverMean,
  });
}

function additionalSessionProjection(
  session: EyePairProspectiveAdditionalSessionInputFR165V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveSessionMetricSummaryFR165V1 {
  const summary = metricSummary(session, metricRef);
  return Object.freeze({
    sessionRef: session.sessionRef,
    count: summary.count,
    min: summary.min,
    max: summary.max,
    mean: summary.mean,
    range: summary.range,
    rangeOverMean: summary.mean === 0 ? null : summary.range / summary.mean,
  });
}

function adjacentMeanComparisons(
  sessions: readonly EyePairProspectiveSessionMetricSummaryFR165V1[],
): readonly EyePairProspectiveAdjacentMeanComparisonFR165V1[] {
  return Object.freeze(sessions.slice(1).map((current, index) => {
    const previous = sessions[index]!;
    return Object.freeze({
      fromSessionRef: previous.sessionRef,
      toSessionRef: current.sessionRef,
      absoluteMeanDifference: Math.abs(current.mean - previous.mean),
      relativeMeanShiftFromPreviousSession: previous.mean === 0 ? null : (current.mean - previous.mean) / previous.mean,
      evaluationState: 'descriptive_adjacent_session_shift_only' as const,
    });
  }));
}

function compareMetric(
  baseRecurrence: EyePairProspectiveRecurrenceExecutionResultFR164V1,
  additionalSessions: readonly EyePairProspectiveAdditionalSessionInputFR165V1[],
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveMultiSessionMetricComparisonFR165V1 {
  const baseComparison = baseRecurrence.metricComparisons.find((candidate) => candidate.metricRef === metricRef);
  if (baseComparison === undefined || baseComparison.sessions.length !== 2) {
    fail(`issued FR-164 base recurrence lacks metric ${metricRef}.`);
  }
  const sessions = Object.freeze([
    baseSessionProjection(baseComparison.sessions[0]),
    baseSessionProjection(baseComparison.sessions[1]),
    ...additionalSessions.map((session) => additionalSessionProjection(session, metricRef)),
  ]);
  return Object.freeze({
    metricRef,
    unit: 'ratio' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    sessions,
    sessionMeanStatistics: computeEyePairCrossSessionSeriesDescriptiveStatisticsFR165(sessions.map((session) => session.mean)),
    adjacentMeanComparisons: adjacentMeanComparisons(sessions),
    evaluationState: 'descriptive_multi_session_recurrence_only' as const,
    inferentialStatisticIssued: false as const,
    correlationOrRedundancyConclusionIssued: false as const,
    repeatabilityPassFailIssued: false as const,
    captureSensitivityPassFailIssued: false as const,
    thresholdDerivedFromObservedSamples: false as const,
    productQualityGateDerivedFromObservedSamples: false as const,
  });
}

function validateRequest(request: EyePairProspectiveMultiSessionRecurrenceRequestFR165V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  const unexpected = Object.keys(request).find((key) => !REQUEST_KEYS.has(key));
  if (unexpected !== undefined) fail(`request contains unauthorized field: ${unexpected}.`);
  if (request.schemaVersion !== 'fr165-eye-pair-prospective-multi-session-recurrence-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  opaqueRef(request.extensionRunRef, 'extensionRunRef');
  if (request.postFR163SessionCapturesAttested !== true) {
    fail('multi-session recurrence extension requires explicit post-FR163 capture attestation.');
  }
  if (request.sameParticipantAcrossSessionsAttested !== true) {
    fail('multi-session recurrence extension requires caller same-participant grouping attestation.');
  }
  if (request.sameCaptureSetupAttested !== true) {
    fail('multi-session recurrence extension requires FR163 same-capture-setup attestation.');
  }
  if (request.sessionSeparationIndependentProof !== false) {
    fail('FR-165 cannot accept or issue independent-session proof under the FR-163 boundary.');
  }
  assertIssuedEyePairProspectiveRecurrenceFR164(request.baseRecurrence);
  if (!Array.isArray(request.additionalSessions) || request.additionalSessions.length < 1) {
    fail('FR-165 v1 requires at least one additional governed FR-161 session beyond the issued FR-164 base.');
  }
  request.additionalSessions.forEach(validateAdditionalSession);

  const refs = [
    ...request.baseRecurrence.sessionRefs,
    ...request.additionalSessions.map((session) => session.sessionRef),
  ];
  if (new Set(refs).size !== refs.length) {
    fail('multi-session recurrence extension requires distinct protocol-local sessionRef values.');
  }
}

export function executeEyePairProspectiveMultiSessionRecurrenceFR165(
  request: EyePairProspectiveMultiSessionRecurrenceRequestFR165V1,
): EyePairProspectiveMultiSessionRecurrenceResultFR165V1 {
  validateRequest(request);
  const sessionRefs = Object.freeze([
    ...request.baseRecurrence.sessionRefs,
    ...request.additionalSessions.map((session) => session.sessionRef),
  ]);
  const sessionCount = sessionRefs.length;
  const result: EyePairProspectiveMultiSessionRecurrenceResultFR165V1 = Object.freeze({
    schemaVersion: 'fr165-eye-pair-prospective-multi-session-recurrence-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR165_EYE_PAIR_PROSPECTIVE_MULTI_SESSION_RECURRENCE_RECORD_ID,
    authorityState: 'prospective_multi_session_recurrence_descriptive_only' as const,
    extensionRunRef: request.extensionRunRef,
    sessionRefs,
    sessionCount,
    primaryMetricCount: 2 as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    metricComparisons: Object.freeze([
      compareMetric(request.baseRecurrence, request.additionalSessions, FR159_X_SPAN_METRIC_REF),
      compareMetric(request.baseRecurrence, request.additionalSessions, FR159_PERIMETER_METRIC_REF),
    ] as const),
    executionBoundary: Object.freeze({
      baseIssuedFR164SessionCount: 2 as const,
      additionalIssuedFR161SessionCount: request.additionalSessions.length,
      governedSessionSummaryCount: sessionCount,
      minimumSessionCount: 3 as const,
      postFR163SessionCapturesAttested: true as const,
      sameParticipantAcrossSessionsAttested: true as const,
      sameCaptureSetupAttested: true as const,
      sameCaptureSetupAttestationMeansSamePhysicalLocation: false as const,
      distinctSessionRefsRequired: true as const,
      distinctSessionRefsMeanIndependentSessions: false as const,
      sessionSeparationIndependentProof: false as const,
      recurrenceDescriptiveOnly: true as const,
    }),
    authorityBoundary: Object.freeze({
      prospectiveRecurrenceExtensionPerformed: true as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      sameParticipantAttestationMeansIdentityProof: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      inferentialStatisticIssued: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      correlationOrRedundancyConclusionIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      participantDerivedNumericMetricValuesPersistedByThisRuntime: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR165_RESEARCH_NOTE_REF,
    nextFrontier: FR165_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairProspectiveMultiSessionRecurrenceFR165(
  result: EyePairProspectiveMultiSessionRecurrenceResultFR165V1,
): void {
  if (!ISSUED.has(result)) fail('multi-session recurrence result was not issued by the active FR-165 boundary.');
  if (
    result.schemaVersion !== 'fr165-eye-pair-prospective-multi-session-recurrence-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR165_EYE_PAIR_PROSPECTIVE_MULTI_SESSION_RECURRENCE_RECORD_ID
    || result.authorityState !== 'prospective_multi_session_recurrence_descriptive_only'
    || !Number.isSafeInteger(result.sessionCount)
    || result.sessionCount < 3
    || result.sessionRefs.length !== result.sessionCount
    || new Set(result.sessionRefs).size !== result.sessionRefs.length
    || result.primaryMetricCount !== 2
    || result.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || result.metricComparisons.length !== 2
    || result.metricComparisons[0]?.metricRef !== FR159_X_SPAN_METRIC_REF
    || result.metricComparisons[1]?.metricRef !== FR159_PERIMETER_METRIC_REF
    || result.metricComparisons.some((comparison) => comparison.sessions.length !== result.sessionCount)
    || result.metricComparisons.some((comparison) => comparison.adjacentMeanComparisons.length !== result.sessionCount - 1)
    || result.metricComparisons.some((comparison) => comparison.inferentialStatisticIssued !== false || comparison.repeatabilityPassFailIssued !== false || comparison.captureSensitivityPassFailIssued !== false || comparison.thresholdDerivedFromObservedSamples !== false)
    || result.executionBoundary.sessionSeparationIndependentProof !== false
    || result.executionBoundary.distinctSessionRefsMeanIndependentSessions !== false
    || result.executionBoundary.governedSessionSummaryCount !== result.sessionCount
    || result.authorityBoundary.independentMultiSessionEvidenceAdmitted !== false
    || result.authorityBoundary.multiSessionIndependenceVerified !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.inferentialStatisticIssued !== false
    || result.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.captureQualityValidated !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.traditionalSemanticAuthority !== false
    || result.privacyBoundary.rawImagePersisted !== false
    || result.privacyBoundary.rawLandmarkSetPersisted !== false
    || result.privacyBoundary.participantDerivedNumericMetricValuesPersistedByThisRuntime !== false
    || result.privacyBoundary.faceEmbeddingPersisted !== false
    || result.privacyBoundary.identityTemplatePersisted !== false
    || result.nextFrontier !== FR165_NEXT_FRONTIER
  ) fail('issued multi-session recurrence-result authority boundary drift.');
}
