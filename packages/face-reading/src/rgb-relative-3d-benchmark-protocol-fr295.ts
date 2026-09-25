import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR294_HARD_GAP_FRONTIER,
  assertFR294HardGapFrontier,
} from './rgb-selfie-hard-gap-frontier-fr294.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR295_RGB_RELATIVE_3D_BENCHMARK_CONTRACT_VERSION =
  'FR295-RGB-RELATIVE-3D-BENCHMARK-PROTOCOL-v1' as const;

export const FR295_RGB_RELATIVE_3D_TARGETS = Object.freeze([
  'forehead.relative_surface_curvature',
  'nose.tip_bridge_relative_projection',
  'cheek_midface.relative_3d_prominence',
  'chin_lower_face.relative_projection',
] as const);

export type FR295RgbRelative3DTarget =
  (typeof FR295_RGB_RELATIVE_3D_TARGETS)[number];

export interface FR295RgbCandidateEvidence {
  readonly featureKey: FR295RgbRelative3DTarget;
  readonly candidateRef: string;
  readonly candidateArtifactDigest: string;
  readonly sourceCameraClass:
    'ordinary_smartphone_rgb_front_camera';
  readonly sourceRgbOnly: true;
  readonly specialDepthHardwareConsumed: false;
  readonly metric3DInputConsumed: false;
  readonly physicalMillimeterOutputClaimed: false;
  readonly candidateOutputSemantics:
    'unitless_relative_shape_only';
  readonly traditionalSemanticBindingClaimed: false;
}

export type FR295IndependentReferenceSourceClass =
  | 'independent_calibrated_3d'
  | 'independent_validated_depth';

export interface FR295IndependentReferenceEvidence {
  readonly referenceRef: string;
  readonly referenceSourceClass:
    FR295IndependentReferenceSourceClass;
  readonly referenceAxisDefinitionRef: string;
  readonly referenceAxisDefinitionFrozen: true;
  readonly independentFromCandidateProvider: true;
  readonly candidateProviderOutputUsedAsReference: false;
  readonly candidateProviderIndicesUsedAsReference: false;
  readonly sameCaptureBindingEstablished: boolean;
  readonly validatedRegistrationBindingEstablished: boolean;
  readonly referenceFrozenBeforeCandidateScoring: true;
  readonly candidateOutputVisibleDuringReferenceConstruction: false;
  readonly traditionalLabelVisibleDuringReferenceConstruction: false;
  readonly referenceUsedForBenchmarkOnly: true;
  readonly productionRuntimeDependencyCreated: false;
}

export interface FR295BenchmarkAdmissionInput {
  readonly schemaVersion:
    'fr295-rgb-relative-3d-benchmark-admission-input-v1';
  readonly candidate: FR295RgbCandidateEvidence;
  readonly reference: FR295IndependentReferenceEvidence;
}

export type FR295BenchmarkBlocker =
  | 'candidate_ref_missing'
  | 'candidate_artifact_digest_invalid'
  | 'reference_ref_missing'
  | 'reference_axis_definition_ref_missing'
  | 'reference_not_independent'
  | 'candidate_provider_used_as_reference'
  | 'candidate_provider_indices_used_as_reference'
  | 'candidate_reference_binding_missing'
  | 'reference_not_frozen_before_scoring'
  | 'candidate_visible_during_reference_construction'
  | 'traditional_label_visible_during_reference_construction'
  | 'reference_not_benchmark_only'
  | 'production_runtime_dependency_created';

export interface FR295BenchmarkAdmissionResult {
  readonly schemaVersion:
    'fr295-rgb-relative-3d-benchmark-admission-result-v1';
  readonly featureKey: FR295RgbRelative3DTarget;
  readonly status:
    | 'admitted_for_descriptive_benchmark_only'
    | 'blocked';
  readonly blockers: readonly FR295BenchmarkBlocker[];
  readonly authorityBoundary: {
    readonly featureAxisDefinitionIssuedByFR295: false;
    readonly benchmarkWinnerIssued: false;
    readonly acceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly physicalMillimeterProductOutputIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-295 ${message}`,
  );
}

function nonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function exactSet(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  if (
    actual.length !== expected.length ||
    new Set(actual).size !== actual.length
  ) {
    return false;
  }
  const expectedSet = new Set<string>(expected);
  return actual.every((value) => expectedSet.has(value));
}

export function assertFR295RgbRelative3DBenchmarkProtocol(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR293ProductColumnMap();
  assertFR294HardGapFrontier();

  const fr294Targets = FR294_HARD_GAP_FRONTIER
    .filter(
      (candidate) =>
        candidate.lane === 'rgb_relative_3d_benchmark',
    )
    .map((candidate) => candidate.featureKey);

  if (
    !exactSet(
      FR295_RGB_RELATIVE_3D_TARGETS,
      fr294Targets,
    )
  ) {
    fail(
      'target set must equal the exact four FR294 RGB relative-3D gaps.',
    );
  }

  const authorityByKey = new Map(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((candidate) => [
        candidate.featureKey,
        candidate,
      ]),
  );

  for (const featureKey of FR295_RGB_RELATIVE_3D_TARGETS) {
    const authority = authorityByKey.get(featureKey);
    if (
      authority === undefined ||
      authority.observationClass !==
        'rgb_relative_3d_shape' ||
      authority.readiness !==
        'relative_3d_benchmark_required' ||
      authority.specialDepthHardwareRequired !== false ||
      authority.metric3DRequired !== false ||
      authority.traditionalBindingIssued !== false
    ) {
      fail(
        `FR282 authority drift for ${featureKey}.`,
      );
    }
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR295 must not promote an FR293 product column.');
  }
}

function validateCandidate(
  candidate: FR295RgbCandidateEvidence,
): FR295BenchmarkBlocker[] {
  const blockers: FR295BenchmarkBlocker[] = [];
  if (!nonEmpty(candidate.candidateRef)) {
    blockers.push('candidate_ref_missing');
  }
  if (!SHA256.test(candidate.candidateArtifactDigest)) {
    blockers.push('candidate_artifact_digest_invalid');
  }
  if (
    candidate.sourceCameraClass !==
      'ordinary_smartphone_rgb_front_camera' ||
    candidate.sourceRgbOnly !== true ||
    candidate.specialDepthHardwareConsumed !== false ||
    candidate.metric3DInputConsumed !== false ||
    candidate.physicalMillimeterOutputClaimed !== false ||
    candidate.candidateOutputSemantics !==
      'unitless_relative_shape_only' ||
    candidate.traditionalSemanticBindingClaimed !== false
  ) {
    fail('candidate lane authority widening detected.');
  }
  if (
    !FR295_RGB_RELATIVE_3D_TARGETS.includes(
      candidate.featureKey,
    )
  ) {
    fail('candidate feature key is outside the frozen target set.');
  }
  return blockers;
}

function validateReference(
  reference: FR295IndependentReferenceEvidence,
): FR295BenchmarkBlocker[] {
  const blockers: FR295BenchmarkBlocker[] = [];
  if (!nonEmpty(reference.referenceRef)) {
    blockers.push('reference_ref_missing');
  }
  if (!nonEmpty(reference.referenceAxisDefinitionRef)) {
    blockers.push('reference_axis_definition_ref_missing');
  }
  if (
    reference.referenceAxisDefinitionFrozen !== true
  ) {
    fail('reference axis definition must be frozen.');
  }
  if (reference.independentFromCandidateProvider !== true) {
    blockers.push('reference_not_independent');
  }
  if (reference.candidateProviderOutputUsedAsReference !== false) {
    blockers.push('candidate_provider_used_as_reference');
  }
  if (reference.candidateProviderIndicesUsedAsReference !== false) {
    blockers.push(
      'candidate_provider_indices_used_as_reference',
    );
  }
  if (
    reference.sameCaptureBindingEstablished !== true &&
    reference.validatedRegistrationBindingEstablished !== true
  ) {
    blockers.push('candidate_reference_binding_missing');
  }
  if (
    reference.referenceFrozenBeforeCandidateScoring !== true
  ) {
    blockers.push('reference_not_frozen_before_scoring');
  }
  if (
    reference.candidateOutputVisibleDuringReferenceConstruction !==
      false
  ) {
    blockers.push(
      'candidate_visible_during_reference_construction',
    );
  }
  if (
    reference.traditionalLabelVisibleDuringReferenceConstruction !==
      false
  ) {
    blockers.push(
      'traditional_label_visible_during_reference_construction',
    );
  }
  if (reference.referenceUsedForBenchmarkOnly !== true) {
    blockers.push('reference_not_benchmark_only');
  }
  if (
    reference.productionRuntimeDependencyCreated !== false
  ) {
    blockers.push('production_runtime_dependency_created');
  }
  return blockers;
}

export function assessFR295BenchmarkAdmission(
  input: FR295BenchmarkAdmissionInput,
): FR295BenchmarkAdmissionResult {
  assertFR295RgbRelative3DBenchmarkProtocol();

  if (
    input.schemaVersion !==
      'fr295-rgb-relative-3d-benchmark-admission-input-v1'
  ) {
    fail('admission input schemaVersion drift.');
  }
  if (
    typeof input.candidate !== 'object' ||
    input.candidate === null ||
    typeof input.reference !== 'object' ||
    input.reference === null
  ) {
    fail('candidate and reference evidence are required.');
  }

  const blockers = Object.freeze([
    ...validateCandidate(input.candidate),
    ...validateReference(input.reference),
  ]);

  return Object.freeze({
    schemaVersion:
      'fr295-rgb-relative-3d-benchmark-admission-result-v1' as const,
    featureKey: input.candidate.featureKey,
    status:
      blockers.length === 0
        ? 'admitted_for_descriptive_benchmark_only'
        : 'blocked',
    blockers,
    authorityBoundary: Object.freeze({
      featureAxisDefinitionIssuedByFR295: false as const,
      benchmarkWinnerIssued: false as const,
      acceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      physicalMillimeterProductOutputIssued: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

assertFR295RgbRelative3DBenchmarkProtocol();
