import {
  NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267,
  assertNasalApexCandidateStudyResultFR267,
  type NasalApexCandidateMethodFR267V1,
  type NasalApexCandidateStudyResultFR267V1,
} from './nasal-apex-geometry-candidate-study-fr267.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR268_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr268-nasal-apex-empirical-bundle.md' as const;
export const FR268_NEXT_FRONTIER =
  'acquire_real_fr266_fr267_observations_through_existing_capture_mechanics_then_review_descriptive_candidate_error_distributions' as const;

export interface FR268CandidateErrorScalar {
  readonly method: NasalApexCandidateMethodFR267V1;
  readonly euclidean3DErrorCm: number;
  readonly absoluteVerticalYErrorCm: number;
}

export interface FR268NasalApexEmpiricalObservation {
  readonly schemaVersion: 'fr268-nasal-apex-empirical-observation-v1';
  readonly subjectOrdinal: number;
  readonly sessionOrdinal: number;
  readonly observationOrdinal: number;
  readonly candidateErrors: readonly FR268CandidateErrorScalar[];
  readonly privacyBoundary: {
    readonly sourceSubjectIdRetained: false;
    readonly sourceCaptureIdRetained: false;
    readonly annotatorIdRetained: false;
    readonly candidateCoordinatesRetained: false;
    readonly annotationCoordinatesRetained: false;
    readonly rawMetricGeometryRetained: false;
    readonly providerIndicesRetained: false;
    readonly rawMediaRetained: false;
    readonly faceEmbeddingRetained: false;
    readonly identityTemplateRetained: false;
  };
  readonly authorityBoundary: {
    readonly descriptiveObservationOnly: true;
    readonly candidateWinnerIssued: false;
    readonly acceptanceThresholdIssued: false;
    readonly nasalApexAdmissionIssued: false;
    readonly traditionalZhuntouEquivalenceIssued: false;
    readonly threeDivisionsSpanIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR268CandidateDescriptiveSummary {
  readonly method: NasalApexCandidateMethodFR267V1;
  readonly observationCount: number;
  readonly subjectCount: number;
  readonly sessionCount: number;
  readonly meanEuclidean3DErrorCm: number;
  readonly medianEuclidean3DErrorCm: number;
  readonly minEuclidean3DErrorCm: number;
  readonly maxEuclidean3DErrorCm: number;
  readonly meanAbsoluteVerticalYErrorCm: number;
  readonly medianAbsoluteVerticalYErrorCm: number;
  readonly minAbsoluteVerticalYErrorCm: number;
  readonly maxAbsoluteVerticalYErrorCm: number;
  readonly evaluationState: 'descriptive_only_no_candidate_selection';
}

export interface FR268NasalApexEmpiricalBundle {
  readonly schemaVersion: 'fr268-nasal-apex-empirical-bundle-v1';
  readonly artifactVersion: '0.1.0';
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'privacy_minimized_candidate_error_observations_descriptive_only';
  readonly observations: readonly FR268NasalApexEmpiricalObservation[];
  readonly summaries: readonly FR268CandidateDescriptiveSummary[];
  readonly candidateWinner: null;
  readonly acceptanceThresholdCm: null;
  readonly minimumSubjectCount: null;
  readonly minimumSessionCountPerSubject: null;
  readonly evidenceSufficientForCandidateSelection: false;
  readonly existingCaptureLaneCompatibility: {
    readonly fr251Fr257FutureLiveMechanicsReusable: true;
    readonly historicalFR251FR255RetroactiveCandidateErrorRecoveryPossible: false;
    readonly reason:
      'historical_exports_do_not_persist_raw_metric_geometry_or_fr266_independent_annotations';
    readonly newCameraWorkflowRequiredByFR268: false;
  };
  readonly privacyBoundary: {
    readonly rawMediaPersisted: false;
    readonly rawLandmarksPersisted: false;
    readonly rawMetricGeometryPersisted: false;
    readonly annotationCoordinatesPersisted: false;
    readonly candidateCoordinatesPersisted: false;
    readonly sourceSubjectIdsPersisted: false;
    readonly sourceCaptureIdsPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly descriptiveAggregationOnly: true;
    readonly empiricalRepeatabilityEstablished: false;
    readonly candidateWinnerIssued: false;
    readonly numericAcceptanceThresholdIssued: false;
    readonly minimumEvidenceThresholdIssued: false;
    readonly nasalApexAdmissionIssued: false;
    readonly traditionalZhuntouEquivalenceIssued: false;
    readonly threeDivisionsSpanIssued: false;
    readonly calibrationIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR268_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR268_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-268 ${message}`);
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) fail(`${label} must be a positive integer.`);
  return value;
}

function finiteNonNegative(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0) fail(`${label} must be finite and non-negative.`);
  return value;
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[mid]!
    : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

const METHODS = NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267.candidateMethods;

export function minimizeNasalApexCandidateStudyResultFR268(
  result: NasalApexCandidateStudyResultFR267V1,
  subjectOrdinal: number,
  sessionOrdinal: number,
  observationOrdinal: number,
): FR268NasalApexEmpiricalObservation {
  assertNasalApexCandidateStudyResultFR267(result);
  positiveInteger(subjectOrdinal, 'subjectOrdinal');
  positiveInteger(sessionOrdinal, 'sessionOrdinal');
  positiveInteger(observationOrdinal, 'observationOrdinal');

  const byMethod = new Map(
    result.evaluations.map((entry) => [entry.method, entry] as const),
  );
  const candidateErrors = Object.freeze(
    METHODS.map((method): FR268CandidateErrorScalar => {
      const entry = byMethod.get(method);
      if (entry === undefined) fail(`missing FR267 evaluation for ${method}.`);
      return Object.freeze({
        method,
        euclidean3DErrorCm: finiteNonNegative(
          entry.euclidean3DErrorCm,
          `${method}.euclidean3DErrorCm`,
        ),
        absoluteVerticalYErrorCm: finiteNonNegative(
          entry.absoluteVerticalYErrorCm,
          `${method}.absoluteVerticalYErrorCm`,
        ),
      });
    }),
  );

  return Object.freeze({
    schemaVersion: 'fr268-nasal-apex-empirical-observation-v1' as const,
    subjectOrdinal,
    sessionOrdinal,
    observationOrdinal,
    candidateErrors,
    privacyBoundary: Object.freeze({
      sourceSubjectIdRetained: false as const,
      sourceCaptureIdRetained: false as const,
      annotatorIdRetained: false as const,
      candidateCoordinatesRetained: false as const,
      annotationCoordinatesRetained: false as const,
      rawMetricGeometryRetained: false as const,
      providerIndicesRetained: false as const,
      rawMediaRetained: false as const,
      faceEmbeddingRetained: false as const,
      identityTemplateRetained: false as const,
    }),
    authorityBoundary: Object.freeze({
      descriptiveObservationOnly: true as const,
      candidateWinnerIssued: false as const,
      acceptanceThresholdIssued: false as const,
      nasalApexAdmissionIssued: false as const,
      traditionalZhuntouEquivalenceIssued: false as const,
      threeDivisionsSpanIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

function summary(
  method: NasalApexCandidateMethodFR267V1,
  observations: readonly FR268NasalApexEmpiricalObservation[],
): FR268CandidateDescriptiveSummary {
  const rows = observations.map((observation) => {
    const entry = observation.candidateErrors.find((candidate) => candidate.method === method);
    if (entry === undefined) fail(`observation missing method ${method}.`);
    return { observation, entry };
  });
  const e3 = rows.map(({ entry }) => entry.euclidean3DErrorCm);
  const ey = rows.map(({ entry }) => entry.absoluteVerticalYErrorCm);
  return Object.freeze({
    method,
    observationCount: rows.length,
    subjectCount: new Set(rows.map(({ observation }) => observation.subjectOrdinal)).size,
    sessionCount: new Set(
      rows.map(({ observation }) => `${observation.subjectOrdinal}:${observation.sessionOrdinal}`),
    ).size,
    meanEuclidean3DErrorCm: mean(e3),
    medianEuclidean3DErrorCm: median(e3),
    minEuclidean3DErrorCm: Math.min(...e3),
    maxEuclidean3DErrorCm: Math.max(...e3),
    meanAbsoluteVerticalYErrorCm: mean(ey),
    medianAbsoluteVerticalYErrorCm: median(ey),
    minAbsoluteVerticalYErrorCm: Math.min(...ey),
    maxAbsoluteVerticalYErrorCm: Math.max(...ey),
    evaluationState: 'descriptive_only_no_candidate_selection' as const,
  });
}

export function buildNasalApexEmpiricalBundleFR268(
  observations: readonly FR268NasalApexEmpiricalObservation[],
): FR268NasalApexEmpiricalBundle {
  if (observations.length === 0) fail('at least one empirical observation is required.');

  const seen = new Set<string>();
  for (const observation of observations) {
    if (observation.schemaVersion !== 'fr268-nasal-apex-empirical-observation-v1') {
      fail('observation schema drift.');
    }
    positiveInteger(observation.subjectOrdinal, 'subjectOrdinal');
    positiveInteger(observation.sessionOrdinal, 'sessionOrdinal');
    positiveInteger(observation.observationOrdinal, 'observationOrdinal');
    const key = `${observation.subjectOrdinal}:${observation.sessionOrdinal}:${observation.observationOrdinal}`;
    if (seen.has(key)) fail('duplicate subject/session/observation ordinal.');
    seen.add(key);
    if (
      observation.candidateErrors.length !== METHODS.length ||
      observation.candidateErrors.some((entry, index) => entry.method !== METHODS[index])
    ) fail('candidate-error method inventory/order drift.');
    observation.candidateErrors.forEach((entry) => {
      finiteNonNegative(entry.euclidean3DErrorCm, 'euclidean3DErrorCm');
      finiteNonNegative(entry.absoluteVerticalYErrorCm, 'absoluteVerticalYErrorCm');
    });
    if (
      Object.values(observation.privacyBoundary).some((value) => value !== false) ||
      observation.authorityBoundary.descriptiveObservationOnly !== true ||
      Object.entries(observation.authorityBoundary)
        .filter(([keyName]) => keyName !== 'descriptiveObservationOnly')
        .some(([, value]) => value !== false)
    ) fail('observation privacy/authority boundary drift.');
  }

  const frozen = Object.freeze([...observations]);
  const bundle: FR268NasalApexEmpiricalBundle = Object.freeze({
    schemaVersion: 'fr268-nasal-apex-empirical-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    watchtowerTrack: 'face-research' as const,
    authorityState:
      'privacy_minimized_candidate_error_observations_descriptive_only' as const,
    observations: frozen,
    summaries: Object.freeze(METHODS.map((method) => summary(method, frozen))),
    candidateWinner: null,
    acceptanceThresholdCm: null,
    minimumSubjectCount: null,
    minimumSessionCountPerSubject: null,
    evidenceSufficientForCandidateSelection: false as const,
    existingCaptureLaneCompatibility: Object.freeze({
      fr251Fr257FutureLiveMechanicsReusable: true as const,
      historicalFR251FR255RetroactiveCandidateErrorRecoveryPossible: false as const,
      reason:
        'historical_exports_do_not_persist_raw_metric_geometry_or_fr266_independent_annotations' as const,
      newCameraWorkflowRequiredByFR268: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawMediaPersisted: false as const,
      rawLandmarksPersisted: false as const,
      rawMetricGeometryPersisted: false as const,
      annotationCoordinatesPersisted: false as const,
      candidateCoordinatesPersisted: false as const,
      sourceSubjectIdsPersisted: false as const,
      sourceCaptureIdsPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      descriptiveAggregationOnly: true as const,
      empiricalRepeatabilityEstablished: false as const,
      candidateWinnerIssued: false as const,
      numericAcceptanceThresholdIssued: false as const,
      minimumEvidenceThresholdIssued: false as const,
      nasalApexAdmissionIssued: false as const,
      traditionalZhuntouEquivalenceIssued: false as const,
      threeDivisionsSpanIssued: false as const,
      calibrationIssued: false as const,
      F1ClaimIssued: false as const,
      F6ClaimIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR268_RESEARCH_NOTE_REF,
    nextFrontier: FR268_NEXT_FRONTIER,
  });
  assertNasalApexEmpiricalBundleFR268(bundle);
  return bundle;
}

export function assertNasalApexEmpiricalBundleFR268(
  bundle: FR268NasalApexEmpiricalBundle,
): void {
  if (
    bundle.schemaVersion !== 'fr268-nasal-apex-empirical-bundle-v1' ||
    bundle.artifactVersion !== '0.1.0' ||
    bundle.watchtowerTrack !== 'face-research' ||
    bundle.authorityState !==
      'privacy_minimized_candidate_error_observations_descriptive_only' ||
    bundle.candidateWinner !== null ||
    bundle.acceptanceThresholdCm !== null ||
    bundle.minimumSubjectCount !== null ||
    bundle.minimumSessionCountPerSubject !== null ||
    bundle.evidenceSufficientForCandidateSelection !== false ||
    bundle.summaries.length !== METHODS.length
  ) fail('bundle identity/evidence boundary drift.');

  if (
    bundle.existingCaptureLaneCompatibility.fr251Fr257FutureLiveMechanicsReusable !== true ||
    bundle.existingCaptureLaneCompatibility
      .historicalFR251FR255RetroactiveCandidateErrorRecoveryPossible !== false ||
    bundle.existingCaptureLaneCompatibility.newCameraWorkflowRequiredByFR268 !== false
  ) fail('capture-lane compatibility drift.');

  if (Object.values(bundle.privacyBoundary).some((value) => value !== false)) {
    fail('bundle privacy boundary widened.');
  }
  if (
    bundle.authorityBoundary.descriptiveAggregationOnly !== true ||
    Object.entries(bundle.authorityBoundary)
      .filter(([keyName]) => keyName !== 'descriptiveAggregationOnly')
      .some(([, value]) => value !== false)
  ) fail('bundle authority widened.');

  if (
    bundle.researchNoteRef !== FR268_RESEARCH_NOTE_REF ||
    bundle.nextFrontier !== FR268_NEXT_FRONTIER
  ) fail('bundle continuation drift.');
}
