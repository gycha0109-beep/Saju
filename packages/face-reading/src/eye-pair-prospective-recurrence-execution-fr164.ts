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
  FR163_NEXT_FRONTIER,
  getEyePairProspectiveRecurrenceProtocolFR163,
} from './eye-pair-prospective-recurrence-protocol-fr163.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR164_EYE_PAIR_PROSPECTIVE_RECURRENCE_EXECUTION_RECORD_ID =
  'research.face_reading.neutral.eye_pair.prospective_recurrence_execution.fr164' as const;
export const FR164_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr164-eye-pair-prospective-recurrence-execution.md' as const;
export const FR164_NEXT_FRONTIER =
  'collect_additional_post_fr163_governed_sessions_then_extend_descriptive_recurrence_without_independence_repeatability_threshold_quality_or_semantic_promotion' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUEST_KEYS = new Set([
  'schemaVersion',
  'recurrenceRunRef',
  'postFR163SessionCapturesAttested',
  'sameParticipantAcrossSessionsAttested',
  'sameCaptureSetupAttested',
  'sessionSeparationIndependentProof',
  'sessions',
]);
const SESSION_KEYS = new Set(['sessionRef', 'result']);
const ISSUED = new WeakSet<object>();

export interface EyePairProspectiveRecurrenceSessionInputFR164V1 {
  readonly sessionRef: string;
  readonly result: EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1;
}

export interface EyePairProspectiveRecurrenceExecutionRequestFR164V1 {
  readonly schemaVersion: 'fr164-eye-pair-prospective-recurrence-execution-request-v1';
  readonly recurrenceRunRef: string;
  readonly postFR163SessionCapturesAttested: boolean;
  readonly sameParticipantAcrossSessionsAttested: boolean;
  readonly sameCaptureSetupAttested: boolean;
  readonly sessionSeparationIndependentProof: false;
  readonly sessions: readonly [
    EyePairProspectiveRecurrenceSessionInputFR164V1,
    EyePairProspectiveRecurrenceSessionInputFR164V1,
  ];
}

export interface EyePairProspectiveSessionMetricSummaryFR164V1 {
  readonly sessionRef: string;
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly rangeOverMean: number | null;
}

export interface EyePairProspectiveCrossSessionDescriptiveStatisticsFR164V1 {
  readonly count: 2;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly rangeOverMean: number | null;
  readonly absoluteMeanDifference: number;
  readonly relativeMeanShiftFromFirstSession: number | null;
}

export interface EyePairProspectiveCrossSessionMetricComparisonFR164V1 {
  readonly metricRef: EyePairProspectivePrimaryMetricRefFR159V1;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly sessions: readonly [
    EyePairProspectiveSessionMetricSummaryFR164V1,
    EyePairProspectiveSessionMetricSummaryFR164V1,
  ];
  readonly sessionMeanStatistics: EyePairProspectiveCrossSessionDescriptiveStatisticsFR164V1;
  readonly evaluationState: 'descriptive_cross_session_recurrence_only';
  readonly correlationOrRedundancyConclusionIssued: false;
  readonly repeatabilityPassFailIssued: false;
  readonly captureSensitivityPassFailIssued: false;
  readonly thresholdDerivedFromObservedSamples: false;
  readonly productQualityGateDerivedFromObservedSamples: false;
}

export interface EyePairProspectiveRecurrenceExecutionResultFR164V1 {
  readonly schemaVersion: 'fr164-eye-pair-prospective-recurrence-execution-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR164_EYE_PAIR_PROSPECTIVE_RECURRENCE_EXECUTION_RECORD_ID;
  readonly authorityState: 'prospective_cross_session_recurrence_descriptive_only';
  readonly recurrenceRunRef: string;
  readonly sessionRefs: readonly [string, string];
  readonly sessionCount: 2;
  readonly primaryMetricCount: 2;
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly metricComparisons: readonly [
    EyePairProspectiveCrossSessionMetricComparisonFR164V1,
    EyePairProspectiveCrossSessionMetricComparisonFR164V1,
  ];
  readonly executionBoundary: {
    readonly governedFR161SessionCount: 2;
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
    readonly prospectiveRecurrenceExecutionPerformed: true;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly sameParticipantAttestationMeansIdentityProof: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
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
  readonly researchNoteRef: typeof FR164_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR164_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-164 ${message}`);
}

function opaqueRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded protocol-local opaque reference without whitespace.`);
  }
  return value;
}

function validateFR163Predecessor(): void {
  const protocol = getEyePairProspectiveRecurrenceProtocolFR163();
  if (
    protocol.nextFrontier !== FR163_NEXT_FRONTIER
    || protocol.prospectiveDesign.protocolFrozenBeforeFutureSessionCapture !== true
    || protocol.prospectiveDesign.historicalAThroughGCapturesEligibleForProspectiveRecurrenceEvidence !== false
    || protocol.prospectiveDesign.minimumProspectiveSessionRefsForRecurrenceDescription !== 2
    || protocol.prospectiveDesign.eachSessionRequiresGovernedFR161Series !== true
    || protocol.prospectiveDesign.eachSessionMinimumDistinctSourceByteCaptures !== 2
    || protocol.prospectiveDesign.eachSessionRequiresFR162CaptureCoaching !== true
    || protocol.prospectiveDesign.sameCaptureSetupAttestationRequired !== true
    || protocol.prospectiveDesign.postProtocolFreshCaptureAttestationRequired !== true
    || protocol.prospectiveDesign.distinctSessionRefRequired !== true
    || protocol.prospectiveDesign.distinctSessionRefMeansIndependentSession !== false
    || protocol.prospectiveDesign.recurrenceMayBeDescribedWithoutIndependenceClaim !== true
    || protocol.prospectiveDesign.recurrencePassFailIssued !== false
    || protocol.independenceBoundary.independentSessionAdmissionImplementedForEyePair !== false
    || protocol.independenceBoundary.independentSessionClaimAllowed !== false
    || protocol.descriptiveComparisonBoundary.repeatabilityPassFailAuthorized !== false
    || protocol.descriptiveComparisonBoundary.captureSensitivityPassFailAuthorized !== false
    || protocol.descriptiveComparisonBoundary.numericThresholdMayBeDerivedFromObservedSamples !== false
    || protocol.descriptiveComparisonBoundary.productQualityGateMayBeDerivedFromObservedSamples !== false
    || protocol.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || protocol.authorityBoundary.captureQualityValidated !== false
    || protocol.authorityBoundary.thresholdsIssued !== false
    || protocol.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('requires the exact frozen FR-163 descriptive recurrence authority boundary.');
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
  ) fail(`issued FR-161 session ${metricRef} summary boundary drift.`);
}

function validateSession(session: EyePairProspectiveRecurrenceSessionInputFR164V1): void {
  if (typeof session !== 'object' || session === null) fail('each recurrence session must be an object.');
  const unexpectedKey = Object.keys(session).find((key) => !SESSION_KEYS.has(key));
  if (unexpectedKey !== undefined) fail(`session contains unauthorized field: ${unexpectedKey}.`);
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
    fail('each FR-161 session must materialize exactly one series-condition summary.');
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
  ) fail('FR-160 series-condition summary does not match its issued FR-161 session wrapper.');
  validateMetricSummary(summary.metrics[0], FR159_X_SPAN_METRIC_REF, result.captureCount);
  validateMetricSummary(summary.metrics[1], FR159_PERIMETER_METRIC_REF, result.captureCount);
}

function metricSummary(
  session: EyePairProspectiveRecurrenceSessionInputFR164V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveDescriptiveMetricSummaryFR159V1 {
  const metrics = session.result.dataset.seriesConditionSummaries[0]!.metrics;
  const summary = metrics.find((candidate) => candidate.metricRef === metricRef);
  if (summary === undefined) fail(`issued session lacks preregistered metric ${metricRef}.`);
  return summary;
}

export function computeEyePairCrossSessionDescriptiveStatisticsFR164(
  means: readonly [number, number],
): EyePairProspectiveCrossSessionDescriptiveStatisticsFR164V1 {
  const [first, second] = means;
  if (!Number.isFinite(first) || !Number.isFinite(second) || first <= 0 || second <= 0) {
    fail('cross-session descriptive means must be finite positive ratios.');
  }
  const min = Math.min(first, second);
  const max = Math.max(first, second);
  const mean = (first + second) / 2;
  const range = max - min;
  return Object.freeze({
    count: 2 as const,
    min,
    max,
    mean,
    range,
    rangeOverMean: mean === 0 ? null : range / mean,
    absoluteMeanDifference: Math.abs(second - first),
    relativeMeanShiftFromFirstSession: first === 0 ? null : (second - first) / first,
  });
}

function sessionMetricProjection(
  session: EyePairProspectiveRecurrenceSessionInputFR164V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveSessionMetricSummaryFR164V1 {
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

function compareMetric(
  firstSession: EyePairProspectiveRecurrenceSessionInputFR164V1,
  secondSession: EyePairProspectiveRecurrenceSessionInputFR164V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveCrossSessionMetricComparisonFR164V1 {
  const first = sessionMetricProjection(firstSession, metricRef);
  const second = sessionMetricProjection(secondSession, metricRef);
  return Object.freeze({
    metricRef,
    unit: 'ratio' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    sessions: Object.freeze([first, second] as const),
    sessionMeanStatistics: computeEyePairCrossSessionDescriptiveStatisticsFR164([first.mean, second.mean]),
    evaluationState: 'descriptive_cross_session_recurrence_only' as const,
    correlationOrRedundancyConclusionIssued: false as const,
    repeatabilityPassFailIssued: false as const,
    captureSensitivityPassFailIssued: false as const,
    thresholdDerivedFromObservedSamples: false as const,
    productQualityGateDerivedFromObservedSamples: false as const,
  });
}

function validateRequest(request: EyePairProspectiveRecurrenceExecutionRequestFR164V1): void {
  validateFR163Predecessor();
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  const unexpected = Object.keys(request).find((key) => !REQUEST_KEYS.has(key));
  if (unexpected !== undefined) fail(`request contains unauthorized field: ${unexpected}.`);
  if (request.schemaVersion !== 'fr164-eye-pair-prospective-recurrence-execution-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  opaqueRef(request.recurrenceRunRef, 'recurrenceRunRef');
  if (request.postFR163SessionCapturesAttested !== true) {
    fail('cross-session recurrence execution requires explicit post-FR163 capture attestation.');
  }
  if (request.sameParticipantAcrossSessionsAttested !== true) {
    fail('cross-session recurrence execution requires caller same-participant grouping attestation.');
  }
  if (request.sameCaptureSetupAttested !== true) {
    fail('cross-session recurrence execution requires FR163 same-capture-setup attestation.');
  }
  if (request.sessionSeparationIndependentProof !== false) {
    fail('FR-164 cannot accept or issue independent-session proof under the FR-163 boundary.');
  }
  if (!Array.isArray(request.sessions) || request.sessions.length !== 2) {
    fail('FR-164 v1 requires exactly two governed prospective session inputs.');
  }
  request.sessions.forEach(validateSession);
  if (request.sessions[0].sessionRef === request.sessions[1].sessionRef) {
    fail('cross-session recurrence requires distinct protocol-local sessionRef values.');
  }
}

export function executeEyePairProspectiveRecurrenceFR164(
  request: EyePairProspectiveRecurrenceExecutionRequestFR164V1,
): EyePairProspectiveRecurrenceExecutionResultFR164V1 {
  validateRequest(request);
  const [firstSession, secondSession] = request.sessions;
  const result: EyePairProspectiveRecurrenceExecutionResultFR164V1 = Object.freeze({
    schemaVersion: 'fr164-eye-pair-prospective-recurrence-execution-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR164_EYE_PAIR_PROSPECTIVE_RECURRENCE_EXECUTION_RECORD_ID,
    authorityState: 'prospective_cross_session_recurrence_descriptive_only' as const,
    recurrenceRunRef: request.recurrenceRunRef,
    sessionRefs: Object.freeze([firstSession.sessionRef, secondSession.sessionRef] as const),
    sessionCount: 2 as const,
    primaryMetricCount: 2 as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    metricComparisons: Object.freeze([
      compareMetric(firstSession, secondSession, FR159_X_SPAN_METRIC_REF),
      compareMetric(firstSession, secondSession, FR159_PERIMETER_METRIC_REF),
    ] as const),
    executionBoundary: Object.freeze({
      governedFR161SessionCount: 2 as const,
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
      prospectiveRecurrenceExecutionPerformed: true as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      sameParticipantAttestationMeansIdentityProof: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
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
    researchNoteRef: FR164_RESEARCH_NOTE_REF,
    nextFrontier: FR164_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairProspectiveRecurrenceFR164(
  result: EyePairProspectiveRecurrenceExecutionResultFR164V1,
): void {
  if (!ISSUED.has(result)) fail('recurrence result was not issued by the active FR-164 boundary.');
  if (
    result.schemaVersion !== 'fr164-eye-pair-prospective-recurrence-execution-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.authorityState !== 'prospective_cross_session_recurrence_descriptive_only'
    || result.sessionCount !== 2
    || result.primaryMetricCount !== 2
    || result.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || result.metricComparisons.length !== 2
    || result.metricComparisons[0]?.metricRef !== FR159_X_SPAN_METRIC_REF
    || result.metricComparisons[1]?.metricRef !== FR159_PERIMETER_METRIC_REF
    || result.metricComparisons.some((comparison) => comparison.repeatabilityPassFailIssued !== false || comparison.captureSensitivityPassFailIssued !== false || comparison.thresholdDerivedFromObservedSamples !== false)
    || result.executionBoundary.sessionSeparationIndependentProof !== false
    || result.executionBoundary.distinctSessionRefsMeanIndependentSessions !== false
    || result.authorityBoundary.independentMultiSessionEvidenceAdmitted !== false
    || result.authorityBoundary.multiSessionIndependenceVerified !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.captureQualityValidated !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.traditionalSemanticAuthority !== false
    || result.privacyBoundary.rawImagePersisted !== false
    || result.privacyBoundary.rawLandmarkSetPersisted !== false
    || result.privacyBoundary.participantDerivedNumericMetricValuesPersistedByThisRuntime !== false
    || result.privacyBoundary.faceEmbeddingPersisted !== false
    || result.privacyBoundary.identityTemplatePersisted !== false
    || result.nextFrontier !== FR164_NEXT_FRONTIER
  ) fail('issued recurrence-result authority boundary drift.');
}
