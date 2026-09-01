import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65,
  projectFR61RunToLipsTopologyAdmissionFR65,
  runPhotoToLipsTopologyAdmissionFR65,
  type GovernedLipsTopologyAdmissionFR65V1,
  type GovernedLipsTopologyRegionCandidateFR65V1,
} from './mediapipe-lips-topology-admission-fr65.js';
import type { NeutralObservationGeometryV1, NormalizedPoint2DV1 } from './neutral-observation-schema-fr15.js';
import type {
  ProductionNeutralObservationProviderRequestFR61V1,
  ProductionNeutralObservationProviderRunFR61V1,
} from './production-neutral-observation-provider-fr61.js';
import { FaceAuthorityValidationError } from './validation.js';

export type LipsContourNeutralSurfaceKeyFR66V1 = 'neutral.face.lips_contour_set';

export interface LipsContourNeutralSurfaceMemberFR66V1 {
  readonly contourRef: string;
  readonly geometry: Extract<NeutralObservationGeometryV1, { readonly kind: 'region' }>;
  readonly sourceProviderTopologySymbol: 'FACE_LANDMARKS_LIPS';
  readonly sourceComponentAuthority: 'unordered_provider_graph_component_only';
  readonly anatomicalRole: null;
  readonly traditionalRole: null;
}

export interface LipsContourNeutralSurfaceFR66V1 {
  readonly schemaVersion: 'fr66-lips-contour-neutral-surface-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'neutral_lips_contour_set_bound_geometry_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly surfaceKey: LipsContourNeutralSurfaceKeyFR66V1;
  readonly neutralConceptKey: 'lips_contour_set';
  readonly observationClass: 'source_neutral_geometry_extension';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly providerBindingState: 'release_exact_named_topology_set_bound';
  readonly contours: readonly LipsContourNeutralSurfaceMemberFR66V1[];
  readonly contourCount: 2;
  readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
  readonly fr15ConsumerSlotIssued: false;
  readonly poseNormalizationIssued: false;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly source: {
    readonly fr65SchemaVersion: 'fr65-mediapipe-lips-topology-admission-v1';
    readonly fr65ArtifactVersion: '0.1.0';
    readonly providerRepository: 'google-ai-edge/mediapipe';
    readonly providerReleaseTag: 'v0.10.35';
    readonly providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly providerTopologySymbol: 'FACE_LANDMARKS_LIPS';
    readonly runtimePackageVersion: '0.10.35';
  };
  readonly authorityBoundary: {
    readonly mutateFR15BaseContractAllowed: false;
    readonly fr15ConsumerSlotIssuanceAllowed: false;
    readonly outerInnerAnatomicalAssignmentAllowed: false;
    readonly providerComponentOrderSemanticUseAllowed: false;
    readonly providerVertexIndexOutputAllowed: false;
    readonly poseNormalizedMetricIssuanceAllowed: false;
    readonly neutralMetricIssuanceAllowed: false;
    readonly traditionalOperationalizationAllowed: false;
    readonly morphologyClassificationAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
    readonly claimIssuanceAllowed: false;
  };
  readonly prohibitedShortcuts: readonly [
    'canonical_image_geometry_to_pose_normalized_metric',
    'unordered_lips_contours_to_outer_inner_anatomy',
    'lips_contour_set_to_square_broad_classification',
    'lips_contour_set_to_lips_substantial_classification',
    'provider_component_order_to_semantic_role',
    'provider_vertex_index_to_neutral_surface_output',
  ];
  readonly blockers: readonly [
    'fr15_has_no_lips_contour_set_consumer_slot',
    'pose_normalized_lips_geometry_not_issued',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed_for_this_surface',
    'mouth_operationalizations_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
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

const POINT_KEYS = new Set(['x', 'y']);
const GEOMETRY_KEYS = new Set(['kind', 'boundary']);
const REQUIRED_FR65_BLOCKERS = Object.freeze([
  'fr15_has_no_mouth_consumer_slot',
  'outer_inner_component_roles_not_published',
  'mouth_morphology_operationalizations_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'capture_sensitive_mouth_criteria_not_consumable',
] as const);
const REQUIRED_FR65_SHORTCUTS = Object.freeze([
  'provider_lips_label_to_traditional_mouth_criterion',
  'provider_component_order_to_outer_inner_anatomy',
  'two_closed_cycles_to_lip_thickness_operationalization',
  'lips_bounding_geometry_to_square_broad_classification',
  'provider_vertex_index_to_traditional_anchor',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-66 ${message}`);
}

function clonePoint(point: NormalizedPoint2DV1, path: string): NormalizedPoint2DV1 {
  if (typeof point !== 'object' || point === null) fail(`${path} must be a normalized 2D point.`);
  const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
  if (unexpected !== undefined) fail(`${path} contains unauthorized point field: ${unexpected}`);
  if (!Number.isFinite(point.x) || point.x < 0 || point.x > 1) fail(`${path}.x must be finite within [0,1].`);
  if (!Number.isFinite(point.y) || point.y < 0 || point.y > 1) fail(`${path}.y must be finite within [0,1].`);
  return Object.freeze({ x: point.x, y: point.y });
}

function validateRegion(region: GovernedLipsTopologyRegionCandidateFR65V1, index: number): void {
  if (
    region.providerTopologySymbol !== 'FACE_LANDMARKS_LIPS' ||
    region.providerGraphComponentOrdinal !== index + 1 ||
    region.componentRoleAuthority !== 'provider_graph_component_only_no_outer_inner_anatomy' ||
    region.consumerSlotAssignment !== null
  ) {
    fail(`FR-65 contour candidate authority drift at index ${index}.`);
  }
  if (region.geometry.kind !== 'region') fail(`FR-65 contour ${index} must remain region geometry.`);
  const unexpectedGeometryKey = Object.keys(region.geometry).find((key) => !GEOMETRY_KEYS.has(key));
  if (unexpectedGeometryKey !== undefined) fail(`FR-65 contour ${index} contains unauthorized geometry field: ${unexpectedGeometryKey}`);
  if (region.geometry.boundary.length !== 20) fail(`FR-65 contour ${index} must remain a 20-point closed-cycle projection.`);
  region.geometry.boundary.forEach((point, pointIndex) => clonePoint(point, `fr65.regions[${index}].boundary[${pointIndex}]`));
}

function validateFR65Source(source: GovernedLipsTopologyAdmissionFR65V1): void {
  if (
    source.schemaVersion !== 'fr65-mediapipe-lips-topology-admission-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'release_exact_provider_lips_topology_candidate_only' ||
    source.coordinateFrame !== 'canonical_image_normalized_2d'
  ) fail('requires the exact FR-65 release-exact topology admission boundary.');
  if (
    source.sourceWitness.repository !== MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.repository ||
    source.sourceWitness.releaseTag !== MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.releaseTag ||
    source.sourceWitness.releaseCommit !== MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.releaseCommit ||
    source.sourceWitness.sourcePath !== MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.sourcePath ||
    source.sourceWitness.sourceSymbol !== 'FACE_LANDMARKS_LIPS' ||
    source.sourceWitness.runtimePackageVersion !== '0.10.35' ||
    source.sourceWitness.edgeCount !== 40 ||
    source.sourceWitness.connectedComponentCount !== 2 ||
    source.sourceWitness.closedCycleComponentCount !== 2 ||
    source.sourceWitness.componentRoleLabelsPublished !== false
  ) fail('FR-65 MediaPipe release witness drift.');
  if (
    source.regions.length !== 2 ||
    source.componentCount !== 2 ||
    source.componentConsumptionState !== 'unordered_provider_labeled_lips_components_only' ||
    source.outerInnerComponentAssignment !== null ||
    source.mouthConsumerSlotAssignment !== null ||
    source.mouthConsumerSlotExistsInFR15 !== false
  ) fail('FR-65 unordered two-contour or consumer-slot boundary drift.');
  source.regions.forEach(validateRegion);
  if (
    source.intakeOfficerCriterionStatesIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.productionNeutralObservationIssued !== false ||
    source.traditionalSemanticAuthority !== false
  ) fail('FR-65 semantic/morphology boundary widened.');
  if (REQUIRED_FR65_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('FR-65 blockers were removed or weakened.');
  }
  if (REQUIRED_FR65_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('FR-65 prohibited shortcuts were removed or weakened.');
  }
  if (
    source.provenance.runtimePackageVersion !== '0.10.35' ||
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.providerDepthPersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) fail('FR-65 runtime/non-persistence provenance widened.');
}

function projectContour(
  source: GovernedLipsTopologyRegionCandidateFR65V1,
  index: number,
): LipsContourNeutralSurfaceMemberFR66V1 {
  return Object.freeze({
    contourRef: `fr66:lips-contour:${index + 1}`,
    geometry: Object.freeze({
      kind: 'region' as const,
      boundary: Object.freeze(source.geometry.boundary.map((point, pointIndex) =>
        clonePoint(point, `fr66.contours[${index}].boundary[${pointIndex}]`))),
    }),
    sourceProviderTopologySymbol: 'FACE_LANDMARKS_LIPS' as const,
    sourceComponentAuthority: 'unordered_provider_graph_component_only' as const,
    anatomicalRole: null,
    traditionalRole: null,
  });
}

export function projectFR65ToLipsContourNeutralSurfaceFR66(
  source: GovernedLipsTopologyAdmissionFR65V1,
): LipsContourNeutralSurfaceFR66V1 {
  validateFR65Source(source);
  const contours = Object.freeze(source.regions.map(projectContour));

  return Object.freeze({
    schemaVersion: 'fr66-lips-contour-neutral-surface-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'neutral_lips_contour_set_bound_geometry_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    surfaceKey: 'neutral.face.lips_contour_set' as const,
    neutralConceptKey: 'lips_contour_set' as const,
    observationClass: 'source_neutral_geometry_extension' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    providerBindingState: 'release_exact_named_topology_set_bound' as const,
    contours,
    contourCount: 2 as const,
    contourConsumptionState: 'unordered_set_no_outer_inner_role' as const,
    fr15ConsumerSlotIssued: false as const,
    poseNormalizationIssued: false as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    source: Object.freeze({
      fr65SchemaVersion: source.schemaVersion,
      fr65ArtifactVersion: source.artifactVersion,
      providerRepository: source.sourceWitness.repository,
      providerReleaseTag: source.sourceWitness.releaseTag,
      providerReleaseCommit: source.sourceWitness.releaseCommit,
      providerTopologySymbol: source.sourceWitness.sourceSymbol,
      runtimePackageVersion: source.provenance.runtimePackageVersion,
    }),
    authorityBoundary: Object.freeze({
      mutateFR15BaseContractAllowed: false as const,
      fr15ConsumerSlotIssuanceAllowed: false as const,
      outerInnerAnatomicalAssignmentAllowed: false as const,
      providerComponentOrderSemanticUseAllowed: false as const,
      providerVertexIndexOutputAllowed: false as const,
      poseNormalizedMetricIssuanceAllowed: false as const,
      neutralMetricIssuanceAllowed: false as const,
      traditionalOperationalizationAllowed: false as const,
      morphologyClassificationAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
      claimIssuanceAllowed: false as const,
    }),
    prohibitedShortcuts: Object.freeze([
      'canonical_image_geometry_to_pose_normalized_metric',
      'unordered_lips_contours_to_outer_inner_anatomy',
      'lips_contour_set_to_square_broad_classification',
      'lips_contour_set_to_lips_substantial_classification',
      'provider_component_order_to_semantic_role',
      'provider_vertex_index_to_neutral_surface_output',
    ] as const),
    blockers: Object.freeze([
      'fr15_has_no_lips_contour_set_consumer_slot',
      'pose_normalized_lips_geometry_not_issued',
      'outer_inner_lip_roles_not_authorized',
      'mouth_metric_definitions_not_reviewed_for_this_surface',
      'mouth_operationalizations_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
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

export function projectFR61RunToLipsContourNeutralSurfaceFR66(
  source: ProductionNeutralObservationProviderRunFR61V1,
): LipsContourNeutralSurfaceFR66V1 {
  return projectFR65ToLipsContourNeutralSurfaceFR66(projectFR61RunToLipsTopologyAdmissionFR65(source));
}

export async function runPhotoToLipsContourNeutralSurfaceFR66(
  request: ProductionNeutralObservationProviderRequestFR61V1,
  factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): Promise<LipsContourNeutralSurfaceFR66V1> {
  const source = factory === undefined
    ? await runPhotoToLipsTopologyAdmissionFR65(request)
    : await runPhotoToLipsTopologyAdmissionFR65(request, factory);
  return projectFR65ToLipsContourNeutralSurfaceFR66(source);
}
