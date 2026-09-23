import type { CanonicalMetricPoint3DFR265 } from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
import {
  deriveNeutralNasalApexVerticalReferenceFR266,
  type ProviderIndependentNasalApexAnnotationFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR267_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr267-nasal-apex-geometry-candidate-study.md' as const;
export const FR267_NEXT_FRONTIER =
  'collect_multi_subject_multi_session_fr266_annotations_and_fr267_candidate_errors_before_any_nasal_apex_candidate_selection' as const;

export type NasalApexCandidateMethodFR267V1 =
  | 'full_face_max_z'
  | 'full_face_min_z'
  | 'central_band_0_10_max_z'
  | 'central_band_0_10_min_z'
  | 'central_band_0_20_max_z'
  | 'central_band_0_20_min_z';

export interface GovernedNeutralMetricGeometryStudyInputFR267V1 {
  readonly schemaVersion: 'fr267-governed-neutral-metric-geometry-study-input-v1';
  readonly subjectId: string;
  readonly captureId: string;
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly sourceAuthorityRef: string;
  readonly providerIndicesExposed: false;
  readonly points: readonly CanonicalMetricPoint3DFR265[];
}

export interface NasalApexGeometryCandidateFR267V1 {
  readonly schemaVersion: 'fr267-nasal-apex-geometry-candidate-v1';
  readonly candidateId: string;
  readonly method: NasalApexCandidateMethodFR267V1;
  readonly point: CanonicalMetricPoint3DFR265;
  readonly candidateState: 'geometry_only_hypothesis_not_nasal_apex_admission';
  readonly sourcePointCount: number;
  readonly providerIndexExposed: false;
  readonly anatomicalNasalApexIdentityIssued: false;
  readonly traditionalZhuntouEquivalenceIssued: false;
}

export interface NasalApexCandidateEvaluationFR267V1 {
  readonly schemaVersion: 'fr267-nasal-apex-candidate-evaluation-v1';
  readonly subjectId: string;
  readonly captureId: string;
  readonly annotationRef:
    'fr266_provider_independent_frozen_nasal_apex_annotation';
  readonly candidateId: string;
  readonly method: NasalApexCandidateMethodFR267V1;
  readonly euclidean3DErrorCm: number;
  readonly absoluteVerticalYErrorCm: number;
  readonly signedXErrorCm: number;
  readonly signedYErrorCm: number;
  readonly signedZErrorCm: number;
  readonly selectedAsWinner: false;
  readonly acceptedAsNasalApex: false;
  readonly traditionalZhuntouEquivalenceIssued: false;
}

export interface NasalApexCandidateStudyResultFR267V1 {
  readonly schemaVersion: 'fr267-nasal-apex-candidate-study-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'geometry_only_candidate_generation_and_independent_annotation_error_measurement';
  readonly subjectId: string;
  readonly captureId: string;
  readonly candidates: readonly NasalApexGeometryCandidateFR267V1[];
  readonly evaluations: readonly NasalApexCandidateEvaluationFR267V1[];
  readonly candidateWinner: null;
  readonly acceptanceThresholdCm: null;
  readonly evidenceSufficientForCandidateSelection: false;
  readonly authorityBoundary: {
    readonly researchCandidateComparisonOnly: true;
    readonly canonicalZSignInterpretedAsAnatomicalAnterior: false;
    readonly providerIndexIssued: false;
    readonly providerIndexSemanticBindingIssued: false;
    readonly anatomicalNasalApexIdentityIssued: false;
    readonly traditionalZhuntouEquivalenceIssued: false;
    readonly threeDivisionsSpanIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR267_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR267_NEXT_FRONTIER;
}

export interface NasalApexCandidateStudyAuthorityFR267V1 {
  readonly schemaVersion: 'fr267-nasal-apex-candidate-study-authority-v1';
  readonly artifactVersion: '0.1.0';
  readonly baselineMainSha: 'ca9ec356e3291f52f7c3e3f3ff93845e81473915';
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'candidate_family_registered_no_winner_or_acceptance_threshold';
  readonly candidateMethods: readonly [
    'full_face_max_z',
    'full_face_min_z',
    'central_band_0_10_max_z',
    'central_band_0_10_min_z',
    'central_band_0_20_max_z',
    'central_band_0_20_min_z',
  ];
  readonly geometryOnlyBandFractions: readonly [0.1, 0.2];
  readonly evaluationMetrics: readonly [
    'euclidean_3d_error_cm',
    'absolute_vertical_y_error_cm',
  ];
  readonly winnerSelectionRule: null;
  readonly acceptanceThresholdCm: null;
  readonly minimumSubjectCount: null;
  readonly minimumSessionCountPerSubject: null;
  readonly authorityBoundary: {
    readonly candidateGenerationOnly: true;
    readonly bandFractionMeansAnatomicalNoseRegion: false;
    readonly zExtremumMeansAnatomicalNasalApex: false;
    readonly providerIndexIssued: false;
    readonly traditionalZhuntouEquivalenceIssued: false;
    readonly productionCandidateSelectionAuthorized: false;
  };
  readonly researchNoteRef: typeof FR267_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR267_NEXT_FRONTIER;
}

const METHODS = Object.freeze([
  'full_face_max_z',
  'full_face_min_z',
  'central_band_0_10_max_z',
  'central_band_0_10_min_z',
  'central_band_0_20_max_z',
  'central_band_0_20_min_z',
] as const);

export const NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267:
NasalApexCandidateStudyAuthorityFR267V1 = Object.freeze({
  schemaVersion: 'fr267-nasal-apex-candidate-study-authority-v1' as const,
  artifactVersion: '0.1.0' as const,
  baselineMainSha: 'ca9ec356e3291f52f7c3e3f3ff93845e81473915' as const,
  watchtowerTrack: 'face-research' as const,
  authorityState:
    'candidate_family_registered_no_winner_or_acceptance_threshold' as const,
  candidateMethods: METHODS,
  geometryOnlyBandFractions: Object.freeze([0.1, 0.2] as const),
  evaluationMetrics: Object.freeze([
    'euclidean_3d_error_cm',
    'absolute_vertical_y_error_cm',
  ] as const),
  winnerSelectionRule: null,
  acceptanceThresholdCm: null,
  minimumSubjectCount: null,
  minimumSessionCountPerSubject: null,
  authorityBoundary: Object.freeze({
    candidateGenerationOnly: true as const,
    bandFractionMeansAnatomicalNoseRegion: false as const,
    zExtremumMeansAnatomicalNasalApex: false as const,
    providerIndexIssued: false as const,
    traditionalZhuntouEquivalenceIssued: false as const,
    productionCandidateSelectionAuthorized: false as const,
  }),
  researchNoteRef: FR267_RESEARCH_NOTE_REF,
  nextFrontier: FR267_NEXT_FRONTIER,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-267 ${message}`);
}

function finitePoint(point: CanonicalMetricPoint3DFR265, label: string): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    !Number.isFinite(point.z)
  ) fail(`${label} must contain finite x/y/z.`);
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) fail(`${label} must be non-empty.`);
  return trimmed;
}

function pointKey(point: CanonicalMetricPoint3DFR265): string {
  return `${point.x}:${point.y}:${point.z}`;
}

function compareTieBreak(
  left: CanonicalMetricPoint3DFR265,
  right: CanonicalMetricPoint3DFR265,
  centerX: number,
): number {
  const centerDelta = Math.abs(left.x - centerX) - Math.abs(right.x - centerX);
  if (centerDelta !== 0) return centerDelta;
  if (left.y !== right.y) return right.y - left.y;
  if (left.x !== right.x) return left.x - right.x;
  return left.z - right.z;
}

function extremum(
  points: readonly CanonicalMetricPoint3DFR265[],
  direction: 'max_z' | 'min_z',
  centerX: number,
): CanonicalMetricPoint3DFR265 {
  if (points.length === 0) fail('candidate subset must not be empty.');
  const sorted = [...points].sort((left, right) => {
    const zOrder =
      direction === 'max_z' ? right.z - left.z : left.z - right.z;
    return zOrder !== 0 ? zOrder : compareTieBreak(left, right, centerX);
  });
  return Object.freeze({ ...sorted[0]! });
}

function bandPoints(
  points: readonly CanonicalMetricPoint3DFR265[],
  centerX: number,
  fullWidth: number,
  fraction: 0.1 | 0.2,
): readonly CanonicalMetricPoint3DFR265[] {
  const halfBand = fullWidth * fraction / 2;
  const selected = points.filter(
    (point) => Math.abs(point.x - centerX) <= halfBand,
  );
  if (selected.length === 0) {
    fail(`central band ${fraction} produced no geometry points.`);
  }
  return selected;
}

function candidate(
  method: NasalApexCandidateMethodFR267V1,
  point: CanonicalMetricPoint3DFR265,
  sourcePointCount: number,
): NasalApexGeometryCandidateFR267V1 {
  return Object.freeze({
    schemaVersion: 'fr267-nasal-apex-geometry-candidate-v1' as const,
    candidateId: `candidate.neutral.nasal_apex.${method}@0.1.0`,
    method,
    point: Object.freeze({ ...point }),
    candidateState:
      'geometry_only_hypothesis_not_nasal_apex_admission' as const,
    sourcePointCount,
    providerIndexExposed: false as const,
    anatomicalNasalApexIdentityIssued: false as const,
    traditionalZhuntouEquivalenceIssued: false as const,
  });
}

export function assertNasalApexCandidateStudyAuthorityFR267(
  authority: NasalApexCandidateStudyAuthorityFR267V1,
): void {
  if (
    authority.schemaVersion !==
      'fr267-nasal-apex-candidate-study-authority-v1' ||
    authority.artifactVersion !== '0.1.0' ||
    authority.baselineMainSha !==
      'ca9ec356e3291f52f7c3e3f3ff93845e81473915' ||
    authority.watchtowerTrack !== 'face-research' ||
    authority.authorityState !==
      'candidate_family_registered_no_winner_or_acceptance_threshold' ||
    authority.candidateMethods.length !== METHODS.length ||
    authority.candidateMethods.some(
      (method, index) => method !== METHODS[index],
    ) ||
    authority.winnerSelectionRule !== null ||
    authority.acceptanceThresholdCm !== null ||
    authority.minimumSubjectCount !== null ||
    authority.minimumSessionCountPerSubject !== null
  ) fail('candidate-study authority identity/registration drift.');

  if (
    authority.authorityBoundary.candidateGenerationOnly !== true ||
    Object.entries(authority.authorityBoundary)
      .filter(([key]) => key !== 'candidateGenerationOnly')
      .some(([, value]) => value !== false)
  ) fail('candidate-study authority widened.');

  if (
    authority.researchNoteRef !== FR267_RESEARCH_NOTE_REF ||
    authority.nextFrontier !== FR267_NEXT_FRONTIER
  ) fail('candidate-study continuation drift.');
}

export function generateNasalApexGeometryCandidatesFR267(
  input: GovernedNeutralMetricGeometryStudyInputFR267V1,
): readonly NasalApexGeometryCandidateFR267V1[] {
  assertNasalApexCandidateStudyAuthorityFR267(
    NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267,
  );

  if (
    input.schemaVersion !==
      'fr267-governed-neutral-metric-geometry-study-input-v1' ||
    input.coordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    input.unit !== 'centimeter' ||
    input.providerIndicesExposed !== false
  ) fail('study geometry input boundary drift.');

  nonEmpty(input.subjectId, 'subjectId');
  nonEmpty(input.captureId, 'captureId');
  nonEmpty(input.sourceAuthorityRef, 'sourceAuthorityRef');

  if (input.points.length < 5) {
    fail('study geometry requires at least five points.');
  }
  input.points.forEach((point, index) => finitePoint(point, `points[${index}]`));
  if (new Set(input.points.map(pointKey)).size !== input.points.length) {
    fail('study geometry points must be unique.');
  }

  const xs = input.points.map((point) => point.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const fullWidth = maxX - minX;
  if (!(fullWidth > 0)) fail('study geometry X span must be positive.');
  const centerX = (minX + maxX) / 2;

  const band10 = bandPoints(input.points, centerX, fullWidth, 0.1);
  const band20 = bandPoints(input.points, centerX, fullWidth, 0.2);

  return Object.freeze([
    candidate(
      'full_face_max_z',
      extremum(input.points, 'max_z', centerX),
      input.points.length,
    ),
    candidate(
      'full_face_min_z',
      extremum(input.points, 'min_z', centerX),
      input.points.length,
    ),
    candidate(
      'central_band_0_10_max_z',
      extremum(band10, 'max_z', centerX),
      input.points.length,
    ),
    candidate(
      'central_band_0_10_min_z',
      extremum(band10, 'min_z', centerX),
      input.points.length,
    ),
    candidate(
      'central_band_0_20_max_z',
      extremum(band20, 'max_z', centerX),
      input.points.length,
    ),
    candidate(
      'central_band_0_20_min_z',
      extremum(band20, 'min_z', centerX),
      input.points.length,
    ),
  ]);
}

function squared(value: number): number {
  return value * value;
}

export function evaluateNasalApexGeometryCandidatesFR267(
  geometry: GovernedNeutralMetricGeometryStudyInputFR267V1,
  annotation: ProviderIndependentNasalApexAnnotationFR266V1,
): NasalApexCandidateStudyResultFR267V1 {
  const candidates = generateNasalApexGeometryCandidatesFR267(geometry);
  deriveNeutralNasalApexVerticalReferenceFR266(annotation);

  const subjectId = nonEmpty(geometry.subjectId, 'geometry.subjectId');
  const captureId = nonEmpty(geometry.captureId, 'geometry.captureId');
  if (
    annotation.subjectId.trim() !== subjectId ||
    annotation.captureId.trim() !== captureId
  ) fail('geometry and independent annotation must refer to the same subject/capture.');

  const evaluations = Object.freeze(
    candidates.map((entry): NasalApexCandidateEvaluationFR267V1 => {
      const dx = entry.point.x - annotation.point.x;
      const dy = entry.point.y - annotation.point.y;
      const dz = entry.point.z - annotation.point.z;
      return Object.freeze({
        schemaVersion: 'fr267-nasal-apex-candidate-evaluation-v1' as const,
        subjectId,
        captureId,
        annotationRef:
          'fr266_provider_independent_frozen_nasal_apex_annotation' as const,
        candidateId: entry.candidateId,
        method: entry.method,
        euclidean3DErrorCm: Math.sqrt(squared(dx) + squared(dy) + squared(dz)),
        absoluteVerticalYErrorCm: Math.abs(dy),
        signedXErrorCm: dx,
        signedYErrorCm: dy,
        signedZErrorCm: dz,
        selectedAsWinner: false as const,
        acceptedAsNasalApex: false as const,
        traditionalZhuntouEquivalenceIssued: false as const,
      });
    }),
  );

  const result: NasalApexCandidateStudyResultFR267V1 = Object.freeze({
    schemaVersion: 'fr267-nasal-apex-candidate-study-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    watchtowerTrack: 'face-research' as const,
    authorityState:
      'geometry_only_candidate_generation_and_independent_annotation_error_measurement' as const,
    subjectId,
    captureId,
    candidates,
    evaluations,
    candidateWinner: null,
    acceptanceThresholdCm: null,
    evidenceSufficientForCandidateSelection: false as const,
    authorityBoundary: Object.freeze({
      researchCandidateComparisonOnly: true as const,
      canonicalZSignInterpretedAsAnatomicalAnterior: false as const,
      providerIndexIssued: false as const,
      providerIndexSemanticBindingIssued: false as const,
      anatomicalNasalApexIdentityIssued: false as const,
      traditionalZhuntouEquivalenceIssued: false as const,
      threeDivisionsSpanIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      F1ClaimIssued: false as const,
      F6ClaimIssued: false as const,
      fortuneClaimIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR267_RESEARCH_NOTE_REF,
    nextFrontier: FR267_NEXT_FRONTIER,
  });

  assertNasalApexCandidateStudyResultFR267(result);
  return result;
}

export function assertNasalApexCandidateStudyResultFR267(
  result: NasalApexCandidateStudyResultFR267V1,
): void {
  if (
    result.schemaVersion !== 'fr267-nasal-apex-candidate-study-result-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.watchtowerTrack !== 'face-research' ||
    result.authorityState !==
      'geometry_only_candidate_generation_and_independent_annotation_error_measurement' ||
    result.candidates.length !== METHODS.length ||
    result.evaluations.length !== METHODS.length ||
    result.candidateWinner !== null ||
    result.acceptanceThresholdCm !== null ||
    result.evidenceSufficientForCandidateSelection !== false
  ) fail('candidate-study result identity/evidence drift.');

  if (
    result.candidates.some(
      (entry) =>
        entry.providerIndexExposed !== false ||
        entry.anatomicalNasalApexIdentityIssued !== false ||
        entry.traditionalZhuntouEquivalenceIssued !== false,
    ) ||
    result.evaluations.some(
      (entry) =>
        entry.selectedAsWinner !== false ||
        entry.acceptedAsNasalApex !== false ||
        entry.traditionalZhuntouEquivalenceIssued !== false ||
        !Number.isFinite(entry.euclidean3DErrorCm) ||
        !Number.isFinite(entry.absoluteVerticalYErrorCm),
    )
  ) fail('candidate/evaluation authority drift.');

  if (
    result.authorityBoundary.researchCandidateComparisonOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'researchCandidateComparisonOnly')
      .some(([, value]) => value !== false)
  ) fail('candidate-study result authority widened.');

  if (
    result.researchNoteRef !== FR267_RESEARCH_NOTE_REF ||
    result.nextFrontier !== FR267_NEXT_FRONTIER
  ) fail('candidate-study result continuation drift.');
}
