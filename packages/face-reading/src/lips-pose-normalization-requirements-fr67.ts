import {
  FIVE_OFFICER_CRITERIA_V0,
  type FiveOfficerCriterionDefinition,
} from './five-officers-six-fus-research-v0.js';
import {
  MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import type { LipsContourNeutralSurfaceFR66V1 } from './lips-contour-neutral-surface-fr66.js';
import { FaceAuthorityValidationError } from './validation.js';

export type LipsPoseNormalizationBlockerFR67V1 =
  | 'fr26_transformation_matrix_output_disabled'
  | 'fr61_transformation_matrix_consumption_disabled'
  | 'no_reviewed_pose_normalization_transform'
  | 'no_reviewed_inverse_transform_semantics'
  | 'no_reviewed_2d_projection_rule'
  | 'outer_inner_lip_roles_not_authorized'
  | 'mouth_metric_definitions_not_reviewed'
  | 'mouth_static_thresholds_not_calibrated'
  | 'five_officers_source_not_scan_checked';

export interface LipsPoseNormalizationCriterionRequirementFR67V1 {
  readonly criterionId: 'criterion.intake.square_broad' | 'criterion.intake.lips_substantial';
  readonly sourceConcept: '方大' | '端厚';
  readonly modality: 'static_geometry';
  readonly staticV1Eligible: true;
  readonly candidateObservationNeed:
    | 'pose_normalized_mouth_aspect_or_width_metric_plus_calibration'
    | 'authorized_outer_inner_lip_geometry_plus_pose_normalized_thickness_metric_plus_calibration';
  readonly operationalizationIssued: false;
  readonly calibrationIssued: false;
  readonly criterionStateIssued: false;
}

export interface LipsPoseNormalizationRequirementsFR67V1 {
  readonly schemaVersion: 'fr67-lips-pose-normalization-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'blocked_no_authorized_pose_normalization_transform';
  readonly targetSurface: 'neutral.face.lips_contour_set';
  readonly source: {
    readonly schemaVersion: 'fr66-lips-contour-neutral-surface-v1';
    readonly artifactVersion: '0.1.0';
    readonly coordinateFrame: 'canonical_image_normalized_2d';
    readonly contourCount: 2;
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly poseNormalizationIssued: false;
  };
  readonly targetCoordinateFrame: 'pose_normalized_face_2d';
  readonly normalizationRequirements: {
    readonly singleFaceTransformAppliedConsistentlyAcrossContours: true;
    readonly preserveUnorderedContourIdentity: true;
    readonly providerComponentOrderSemanticUseAllowed: false;
    readonly outerInnerAssignmentRequiredForNormalization: false;
    readonly reviewedTransformDerivationRequired: true;
    readonly reviewedInverseTransformSemanticsRequired: true;
    readonly reviewed2DProjectionRuleRequired: true;
  };
  readonly providerRuntime: {
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly fr26OutputFacialTransformationMatrixes: false;
    readonly fr61TransformationMatrixConsumptionState: 'disabled_and_ignored';
    readonly transformationMatrixObserved: false;
    readonly inverseTransformAuthorized: false;
  };
  readonly criterionRequirements: readonly LipsPoseNormalizationCriterionRequirementFR67V1[];
  readonly normalizedGeometryIssued: false;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly blockers: readonly LipsPoseNormalizationBlockerFR67V1[];
  readonly prohibitedShortcuts: readonly [
    'fr26_disabled_matrix_to_pose_normalized_geometry',
    'canonical_image_contours_to_pose_normalized_geometry_without_reviewed_transform',
    'provider_transform_matrix_to_inverse_normalization_without_reviewed_semantics',
    'pose_normalization_requirement_to_mouth_metric',
    'lips_contour_set_to_square_broad_state',
    'unordered_contours_to_lips_substantial_state',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly providerDepthPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const REQUIRED_FR66_BLOCKERS = Object.freeze([
  'fr15_has_no_lips_contour_set_consumer_slot',
  'pose_normalized_lips_geometry_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed_for_this_surface',
  'mouth_operationalizations_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
] as const);

const REQUIRED_FR66_SHORTCUTS = Object.freeze([
  'canonical_image_geometry_to_pose_normalized_metric',
  'unordered_lips_contours_to_outer_inner_anatomy',
  'lips_contour_set_to_square_broad_classification',
  'lips_contour_set_to_lips_substantial_classification',
] as const);

const BLOCKERS = Object.freeze([
  'fr26_transformation_matrix_output_disabled',
  'fr61_transformation_matrix_consumption_disabled',
  'no_reviewed_pose_normalization_transform',
  'no_reviewed_inverse_transform_semantics',
  'no_reviewed_2d_projection_rule',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const satisfies readonly LipsPoseNormalizationBlockerFR67V1[]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-67 ${message}`);
}

function validateFR66Source(source: LipsContourNeutralSurfaceFR66V1): void {
  if (
    source.schemaVersion !== 'fr66-lips-contour-neutral-surface-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'neutral_lips_contour_set_bound_geometry_only' ||
    source.surfaceKey !== 'neutral.face.lips_contour_set' ||
    source.coordinateFrame !== 'canonical_image_normalized_2d'
  ) fail('requires the exact FR-66 lips contour neutral surface boundary.');
  if (
    source.contourCount !== 2 ||
    source.contours.length !== 2 ||
    source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    source.contours.some((contour) => contour.geometry.kind !== 'region' || contour.geometry.boundary.length !== 20) ||
    source.contours.some((contour) => contour.anatomicalRole !== null || contour.traditionalRole !== null)
  ) fail('requires the exact unordered two-contour FR-66 geometry state.');
  if (
    source.poseNormalizationIssued !== false ||
    source.neutralMetricDefinitionsIssued !== 0 ||
    source.neutralMetricValuesIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-66 geometry, metric, morphology, criterion, claim, or semantic authority.');
  if (Object.values(source.authorityBoundary).some((value) => value !== false)) {
    fail('requires the FR-66 authority boundary to remain fully fail-closed.');
  }
  if (REQUIRED_FR66_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('requires all FR-66 mouth/pose/metric blockers to remain intact.');
  }
  if (REQUIRED_FR66_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('requires FR-66 anti-shortcut restrictions to remain intact.');
  }
  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.providerDepthPersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('requires FR-66 non-persistence provenance to remain intact.');
}

function intakeCriterion(criterionId: LipsPoseNormalizationCriterionRequirementFR67V1['criterionId']): FiveOfficerCriterionDefinition {
  const criterion = FIVE_OFFICER_CRITERIA_V0.find((candidate) => candidate.criterionId === criterionId);
  if (criterion === undefined) fail(`cannot resolve Five Officers criterion: ${criterionId}`);
  if (
    criterion.officerKey !== 'intake' ||
    criterion.anatomicalTarget !== 'mouth' ||
    criterion.modality !== 'static_geometry' ||
    criterion.staticV1Eligible !== true
  ) fail(`Five Officers criterion authority drift: ${criterionId}`);
  return criterion;
}

function criterionRequirements(): readonly LipsPoseNormalizationCriterionRequirementFR67V1[] {
  const squareBroad = intakeCriterion('criterion.intake.square_broad');
  const substantial = intakeCriterion('criterion.intake.lips_substantial');
  if (squareBroad.sourceConcept !== '方大' || substantial.sourceConcept !== '端厚') {
    fail('Five Officers mouth source-concept authority drift.');
  }
  return Object.freeze([
    Object.freeze({
      criterionId: 'criterion.intake.square_broad' as const,
      sourceConcept: '方大' as const,
      modality: 'static_geometry' as const,
      staticV1Eligible: true as const,
      candidateObservationNeed: 'pose_normalized_mouth_aspect_or_width_metric_plus_calibration' as const,
      operationalizationIssued: false as const,
      calibrationIssued: false as const,
      criterionStateIssued: false as const,
    }),
    Object.freeze({
      criterionId: 'criterion.intake.lips_substantial' as const,
      sourceConcept: '端厚' as const,
      modality: 'static_geometry' as const,
      staticV1Eligible: true as const,
      candidateObservationNeed: 'authorized_outer_inner_lip_geometry_plus_pose_normalized_thickness_metric_plus_calibration' as const,
      operationalizationIssued: false as const,
      calibrationIssued: false as const,
      criterionStateIssued: false as const,
    }),
  ]);
}

export function assessLipsPoseNormalizationRequirementsFR67(
  source: LipsContourNeutralSurfaceFR66V1,
): LipsPoseNormalizationRequirementsFR67V1 {
  validateFR66Source(source);
  if (
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageName !== '@mediapipe/tasks-vision' ||
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageVersion !== '0.10.35' ||
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.outputFacialTransformationMatrixes !== false
  ) fail('FR-26 runtime matrix-output policy changed and requires a new review.');

  return Object.freeze({
    schemaVersion: 'fr67-lips-pose-normalization-requirements-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'blocked_no_authorized_pose_normalization_transform' as const,
    targetSurface: 'neutral.face.lips_contour_set' as const,
    source: Object.freeze({
      schemaVersion: source.schemaVersion,
      artifactVersion: source.artifactVersion,
      coordinateFrame: source.coordinateFrame,
      contourCount: source.contourCount,
      contourConsumptionState: source.contourConsumptionState,
      poseNormalizationIssued: source.poseNormalizationIssued,
    }),
    targetCoordinateFrame: 'pose_normalized_face_2d' as const,
    normalizationRequirements: Object.freeze({
      singleFaceTransformAppliedConsistentlyAcrossContours: true as const,
      preserveUnorderedContourIdentity: true as const,
      providerComponentOrderSemanticUseAllowed: false as const,
      outerInnerAssignmentRequiredForNormalization: false as const,
      reviewedTransformDerivationRequired: true as const,
      reviewedInverseTransformSemanticsRequired: true as const,
      reviewed2DProjectionRuleRequired: true as const,
    }),
    providerRuntime: Object.freeze({
      runtimePackageName: MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageName,
      runtimePackageVersion: MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageVersion,
      fr26OutputFacialTransformationMatrixes: false as const,
      fr61TransformationMatrixConsumptionState: 'disabled_and_ignored' as const,
      transformationMatrixObserved: false as const,
      inverseTransformAuthorized: false as const,
    }),
    criterionRequirements: criterionRequirements(),
    normalizedGeometryIssued: false as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    blockers: BLOCKERS,
    prohibitedShortcuts: Object.freeze([
      'fr26_disabled_matrix_to_pose_normalized_geometry',
      'canonical_image_contours_to_pose_normalized_geometry_without_reviewed_transform',
      'provider_transform_matrix_to_inverse_normalization_without_reviewed_semantics',
      'pose_normalization_requirement_to_mouth_metric',
      'lips_contour_set_to_square_broad_state',
      'unordered_contours_to_lips_substantial_state',
    ] as const),
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      rawSourcePersisted: source.provenance.rawSourcePersisted,
      rawProviderResponsePersisted: source.provenance.rawProviderResponsePersisted,
      providerDepthPersisted: source.provenance.providerDepthPersisted,
      biometricEmbeddingPersisted: source.provenance.biometricEmbeddingPersisted,
    }),
  });
}

export function assertLipsPoseNormalizationReadyFR67(
  source: LipsContourNeutralSurfaceFR66V1,
): never {
  assessLipsPoseNormalizationRequirementsFR67(source);
  throw new FaceAuthorityValidationError(
    'FR-67 does not authorize pose-normalized lips geometry until transform derivation, inverse semantics, and 2D projection are separately reviewed.',
  );
}
