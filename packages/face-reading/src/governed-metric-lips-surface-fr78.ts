import {
  orderClosedCycleProviderVerticesFR16,
  type ProviderConnectionEdgeV1,
} from './provider-adapter-evidence-fr16.js';
import {
  FR65_MEDIAPIPE_LIPS_RELEASE_EDGES,
  MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65,
} from './mediapipe-lips-topology-admission-fr65.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface GovernedMetricLipsPointFR78V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface GovernedMetricLipsSurfaceMemberFR78V1 {
  readonly contourRef: string;
  readonly geometry: {
    readonly kind: 'metric_region_3d';
    readonly boundary: readonly GovernedMetricLipsPointFR78V1[];
  };
  readonly sourceProviderTopologySymbol: 'FACE_LANDMARKS_LIPS';
  readonly sourceComponentAuthority: 'unordered_provider_graph_component_only';
  readonly anatomicalRole: null;
  readonly traditionalRole: null;
}

export interface GovernedMetricLipsSurfaceReadinessFR78V1 {
  readonly schemaVersion: 'fr78-governed-metric-lips-surface-readiness-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'release_exact_metric_lips_projection_ready';
  readonly sourceWitness: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly releaseTag: 'v0.10.35';
    readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts';
    readonly sourceSymbol: 'FACE_LANDMARKS_LIPS';
    readonly edgeCount: 40;
    readonly connectedComponentCount: 2;
    readonly closedCycleComponentCount: 2;
    readonly componentRoleLabelsPublished: false;
  };
  readonly sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly sourceUnit: 'centimeter';
  readonly geometryLandmarkCount: 468;
  readonly contourCount: 2;
  readonly contourPointCounts: readonly [20, 20];
  readonly metricLipsGeometryProjectionAuthorized: true;
  readonly providerVertexIndexOutputAllowed: false;
  readonly outerInnerAnatomicalAssignmentAllowed: false;
  readonly providerComponentOrderSemanticUseAllowed: false;
  readonly poseNormalized2DProjectionAuthorized: false;
  readonly neutralMetricIssuanceAllowed: false;
  readonly traditionalOperationalizationAllowed: false;
}

export interface GovernedMetricLipsSurfaceFR78V1 {
  readonly schemaVersion: 'fr78-governed-metric-lips-surface-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'governed_metric_lips_surface_candidate_only';
  readonly extensionMode: 'separate_contract_extension';
  readonly baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1';
  readonly baseFR15ContractMutated: false;
  readonly surfaceKey: 'neutral.face.lips_contour_set';
  readonly neutralConceptKey: 'lips_contour_set';
  readonly observationClass: 'source_neutral_metric_geometry_extension';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly contours: readonly GovernedMetricLipsSurfaceMemberFR78V1[];
  readonly contourCount: 2;
  readonly contourPointCounts: readonly [20, 20];
  readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
  readonly metricLipsGeometryIssued: true;
  readonly canonicalAlignedMetric3DSurfaceIssued: true;
  readonly fr15ConsumerSlotIssued: false;
  readonly poseNormalizedLipsGeometryIssued: false;
  readonly reviewed2DProjectionRuleIssued: false;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly source: {
    readonly fr77SchemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly fr77ArtifactVersion: '0.1.0';
    readonly providerRepository: 'google-ai-edge/mediapipe';
    readonly providerReleaseTag: 'v0.10.35';
    readonly providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly providerTopologySymbol: 'FACE_LANDMARKS_LIPS';
    readonly providerRuntimePackageVersion: '0.10.35';
    readonly geometryMetadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f';
  };
  readonly authorityBoundary: {
    readonly governedResearchMetricLipsGeometryOutputAuthorized: true;
    readonly productionNeutralObservationIssued: false;
    readonly mutateFR15BaseContractAllowed: false;
    readonly fr15ConsumerSlotIssuanceAllowed: false;
    readonly outerInnerAnatomicalAssignmentAllowed: false;
    readonly providerComponentOrderSemanticUseAllowed: false;
    readonly providerVertexIndexOutputAllowed: false;
    readonly poseNormalized2DIssuanceAllowed: false;
    readonly neutralMetricIssuanceAllowed: false;
    readonly traditionalOperationalizationAllowed: false;
    readonly morphologyClassificationAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
    readonly claimIssuanceAllowed: false;
  };
  readonly blockers: readonly [
    'reviewed_2d_projection_rule_not_admitted',
    'pose_normalized_lips_geometry_not_issued',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'metric_lips_3d_to_pose_normalized_2d_without_reviewed_projection',
    'unordered_metric_lips_contours_to_outer_inner_anatomy',
    'metric_lips_surface_to_mouth_width_height_aspect_or_thickness',
    'metric_lips_surface_to_square_broad_classification',
    'metric_lips_surface_to_lips_substantial_classification',
    'provider_component_order_to_semantic_role',
    'provider_vertex_index_to_neutral_surface_output',
    'fr76_parity_tolerance_to_product_calibration_threshold',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly rawGeometryMetadataPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly derivedMetricLipsSurfacePersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const SURFACE_ISSUED = new WeakSet<object>();
const POINT_KEYS = new Set(['x', 'y', 'z']);

const REQUIRED_FR77_BLOCKERS = Object.freeze([
  'metric_lips_geometry_not_issued',
  'reviewed_2d_projection_rule_not_admitted',
  'pose_normalized_lips_geometry_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const REQUIRED_FR77_SHORTCUTS = Object.freeze([
  'full_face_metric_geometry_to_lips_semantic_role',
  'metric_xyz_to_pose_normalized_2d_without_reviewed_projection',
  'metric_geometry_to_morphology',
  'metric_geometry_to_mouth_criterion_state',
  'provider_component_order_to_outer_inner_lip_role',
  'provider_parity_tolerance_to_product_calibration_threshold',
] as const);

const BLOCKERS = Object.freeze([
  'reviewed_2d_projection_rule_not_admitted',
  'pose_normalized_lips_geometry_not_issued',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'metric_lips_3d_to_pose_normalized_2d_without_reviewed_projection',
  'unordered_metric_lips_contours_to_outer_inner_anatomy',
  'metric_lips_surface_to_mouth_width_height_aspect_or_thickness',
  'metric_lips_surface_to_square_broad_classification',
  'metric_lips_surface_to_lips_substantial_classification',
  'provider_component_order_to_semantic_role',
  'provider_vertex_index_to_neutral_surface_output',
  'fr76_parity_tolerance_to_product_calibration_threshold',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-78 ${message}`);
}

function connectedComponents(
  edges: readonly ProviderConnectionEdgeV1[],
): readonly (readonly ProviderConnectionEdgeV1[])[] {
  const adjacency = new Map<number, Set<number>>();
  for (const edge of edges) {
    if (
      !Number.isInteger(edge.start) ||
      edge.start < 0 ||
      edge.start >= 468 ||
      !Number.isInteger(edge.end) ||
      edge.end < 0 ||
      edge.end >= 468 ||
      edge.start === edge.end
    ) fail('release lips edges must use distinct provider vertices inside the first 468 geometry landmarks.');
    const left = adjacency.get(edge.start) ?? new Set<number>();
    left.add(edge.end);
    adjacency.set(edge.start, left);
    const right = adjacency.get(edge.end) ?? new Set<number>();
    right.add(edge.start);
    adjacency.set(edge.end, right);
  }

  const remaining = new Set(adjacency.keys());
  const vertexComponents: number[][] = [];
  while (remaining.size > 0) {
    const seed = Math.min(...remaining);
    const stack = [seed];
    const vertices: number[] = [];
    remaining.delete(seed);
    while (stack.length > 0) {
      const vertex = stack.pop()!;
      vertices.push(vertex);
      for (const neighbor of adjacency.get(vertex) ?? []) {
        if (remaining.delete(neighbor)) stack.push(neighbor);
      }
    }
    vertices.sort((left, right) => left - right);
    vertexComponents.push(vertices);
  }
  vertexComponents.sort((left, right) => left[0]! - right[0]!);

  return Object.freeze(vertexComponents.map((vertices) => {
    const set = new Set(vertices);
    return Object.freeze(edges.filter((edge) => set.has(edge.start) && set.has(edge.end)));
  }));
}

function validateReleaseTopology(): readonly (readonly ProviderConnectionEdgeV1[])[] {
  const witness = MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65;
  if (
    witness.repository !== 'google-ai-edge/mediapipe' ||
    witness.releaseTag !== 'v0.10.35' ||
    witness.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    witness.sourcePath !== 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' ||
    witness.sourceSymbol !== 'FACE_LANDMARKS_LIPS' ||
    witness.runtimePackageName !== '@mediapipe/tasks-vision' ||
    witness.runtimePackageVersion !== '0.10.35' ||
    witness.releaseExactForInstalledPackage !== true ||
    witness.edgeCount !== 40 ||
    witness.connectedComponentCount !== 2 ||
    witness.closedCycleComponentCount !== 2 ||
    witness.componentRoleLabelsPublished !== false
  ) fail('FR-65 release-exact lips topology witness drift.');
  if (FR65_MEDIAPIPE_LIPS_RELEASE_EDGES.length !== 40) fail('release lips edge-count drift.');

  const edgeKeys = FR65_MEDIAPIPE_LIPS_RELEASE_EDGES.map((edge) => `${edge.start}:${edge.end}`);
  if (new Set(edgeKeys).size !== edgeKeys.length) fail('release lips topology contains duplicate directed edges.');

  const components = connectedComponents(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES);
  if (components.length !== 2) fail('release lips topology must remain exactly two connected components.');
  const allVertices = new Set<number>();
  for (const component of components) {
    if (component.length !== 20) fail('each release lips component must remain a 20-edge closed cycle.');
    const vertices = orderClosedCycleProviderVerticesFR16(component);
    if (vertices.length !== 20) fail('each release lips component must remain a 20-vertex closed cycle.');
    for (const vertex of vertices) {
      if (allVertices.has(vertex)) fail('release lips components must not share provider vertices.');
      allVertices.add(vertex);
    }
  }
  if (allVertices.size !== 40) fail('release lips topology must remain exactly 40 unique geometry vertices.');
  return components;
}

export function assessGovernedMetricLipsSurfaceReadinessFR78(): GovernedMetricLipsSurfaceReadinessFR78V1 {
  const components = validateReleaseTopology();
  const pointCounts = components.map((component) => orderClosedCycleProviderVerticesFR16(component).length);
  if (pointCounts[0] !== 20 || pointCounts[1] !== 20) fail('release lips component point-count drift.');
  return Object.freeze({
    schemaVersion: 'fr78-governed-metric-lips-surface-readiness-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_metric_lips_projection_ready' as const,
    sourceWitness: Object.freeze({
      repository: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.repository,
      releaseTag: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.releaseTag,
      releaseCommit: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.releaseCommit,
      sourcePath: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.sourcePath,
      sourceSymbol: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.sourceSymbol,
      edgeCount: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.edgeCount,
      connectedComponentCount: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.connectedComponentCount,
      closedCycleComponentCount: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.closedCycleComponentCount,
      componentRoleLabelsPublished: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.componentRoleLabelsPublished,
    }),
    sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    sourceUnit: 'centimeter' as const,
    geometryLandmarkCount: 468 as const,
    contourCount: 2 as const,
    contourPointCounts: Object.freeze([20, 20] as const),
    metricLipsGeometryProjectionAuthorized: true as const,
    providerVertexIndexOutputAllowed: false as const,
    outerInnerAnatomicalAssignmentAllowed: false as const,
    providerComponentOrderSemanticUseAllowed: false as const,
    poseNormalized2DProjectionAuthorized: false as const,
    neutralMetricIssuanceAllowed: false as const,
    traditionalOperationalizationAllowed: false as const,
  });
}

function cloneMetricPoint(point: GovernedMetricLipsPointFR78V1, path: string): GovernedMetricLipsPointFR78V1 {
  if (typeof point !== 'object' || point === null) fail(`${path} must be a metric XYZ point.`);
  const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
  if (unexpected !== undefined) fail(`${path} contains unauthorized point field: ${unexpected}.`);
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
    fail(`${path} must contain finite metric XYZ coordinates.`);
  }
  return Object.freeze({ x: point.x, y: point.y, z: point.z });
}

function validateFR77Source(source: GovernedMetricGeometryCandidateFR77V1): void {
  assertIssuedGovernedMetricGeometryFR77(source);
  if (
    source.schemaVersion !== 'fr77-governed-metric-geometry-candidate-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'governed_metric_geometry_candidate_only' ||
    source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    source.unit !== 'centimeter'
  ) fail('requires the exact issued FR-77 governed metric geometry boundary.');
  if (
    source.provider.runtimePackageName !== '@mediapipe/tasks-vision' ||
    source.provider.runtimePackageVersion !== '0.10.35' ||
    source.provider.providerLandmarkCount !== 478 ||
    source.provider.geometryLandmarkCount !== 468 ||
    source.provider.irisLandmarksExcluded !== true ||
    source.provider.providerDepthConsumedForMetricGeometry !== true ||
    source.provider.fr61ContractModified !== false
  ) fail('FR-77 provider geometry/runtime identity drift.');
  if (
    source.metricLandmarks.length !== 468 ||
    source.geometryProfile.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    source.geometryProfile.metadataBlobSha !== '252a7b05b24c5c43c5b94179393639f7c9a2fe8f' ||
    source.geometryProfile.exactGitBlobVerified !== true ||
    source.geometryProfile.procrustesBasisCount !== 33
  ) fail('FR-77 metric-landmark/profile authority drift.');
  source.metricLandmarks.forEach((point, index) => cloneMetricPoint(point, `fr77.metricLandmarks[${index}]`));
  if (
    source.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
    source.authorityBoundary.productionNeutralObservationIssued !== false ||
    source.authorityBoundary.metricLipsGeometryIssued !== false ||
    source.authorityBoundary.poseNormalizedLipsGeometryIssued !== false ||
    source.authorityBoundary.reviewed2DProjectionRuleIssued !== false ||
    source.authorityBoundary.neutralMetricDefinitionsIssued !== 0 ||
    source.authorityBoundary.neutralMetricValuesIssued !== 0 ||
    source.authorityBoundary.morphologyProduced !== false ||
    source.authorityBoundary.criterionStatesIssued !== 0 ||
    source.authorityBoundary.claimsIssued !== 0 ||
    source.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('cannot consume widened FR-77 lips, projection, metric, morphology, criterion, claim, or semantic authority.');
  if (REQUIRED_FR77_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    fail('requires all FR-77 lips/projection/methodology blockers before metric lips projection.');
  }
  if (REQUIRED_FR77_SHORTCUTS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    fail('requires all FR-77 anti-shortcut restrictions before metric lips projection.');
  }
  if (
    source.persistencePolicy.rawSourcePersisted !== false ||
    source.persistencePolicy.rawProviderResponsePersisted !== false ||
    source.persistencePolicy.rawProviderDepthPersisted !== false ||
    source.persistencePolicy.rawGeometryMetadataPersisted !== false ||
    source.persistencePolicy.derivedMetricGeometryPersisted !== false ||
    source.persistencePolicy.biometricEmbeddingPersisted !== false
  ) fail('requires FR-77 non-persistence policy to remain intact.');
}

export function projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(
  source: GovernedMetricGeometryCandidateFR77V1,
): GovernedMetricLipsSurfaceFR78V1 {
  validateFR77Source(source);
  assessGovernedMetricLipsSurfaceReadinessFR78();
  const components = validateReleaseTopology();
  const contours = Object.freeze(components.map((component, index) => {
    const vertices = orderClosedCycleProviderVerticesFR16(component);
    const boundary = Object.freeze(vertices.map((vertex, pointIndex) => {
      const point = source.metricLandmarks[vertex];
      if (point === undefined) fail(`FR-77 metric surface is missing internal provider vertex ${vertex}.`);
      return cloneMetricPoint(point, `fr78.contours[${index}].boundary[${pointIndex}]`);
    }));
    return Object.freeze({
      contourRef: `fr78:lips-metric-contour:${index + 1}`,
      geometry: Object.freeze({ kind: 'metric_region_3d' as const, boundary }),
      sourceProviderTopologySymbol: 'FACE_LANDMARKS_LIPS' as const,
      sourceComponentAuthority: 'unordered_provider_graph_component_only' as const,
      anatomicalRole: null,
      traditionalRole: null,
    });
  }));

  const surface: GovernedMetricLipsSurfaceFR78V1 = Object.freeze({
    schemaVersion: 'fr78-governed-metric-lips-surface-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'governed_metric_lips_surface_candidate_only' as const,
    extensionMode: 'separate_contract_extension' as const,
    baseNeutralObservationContractRef: 'myeongha-neutral-observation-v1' as const,
    baseFR15ContractMutated: false as const,
    surfaceKey: 'neutral.face.lips_contour_set' as const,
    neutralConceptKey: 'lips_contour_set' as const,
    observationClass: 'source_neutral_metric_geometry_extension' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    unit: 'centimeter' as const,
    contours,
    contourCount: 2 as const,
    contourPointCounts: Object.freeze([20, 20] as const),
    contourConsumptionState: 'unordered_set_no_outer_inner_role' as const,
    metricLipsGeometryIssued: true as const,
    canonicalAlignedMetric3DSurfaceIssued: true as const,
    fr15ConsumerSlotIssued: false as const,
    poseNormalizedLipsGeometryIssued: false as const,
    reviewed2DProjectionRuleIssued: false as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    source: Object.freeze({
      fr77SchemaVersion: source.schemaVersion,
      fr77ArtifactVersion: source.artifactVersion,
      providerRepository: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.repository,
      providerReleaseTag: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.releaseTag,
      providerReleaseCommit: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.releaseCommit,
      providerTopologySymbol: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65.sourceSymbol,
      providerRuntimePackageVersion: source.provider.runtimePackageVersion,
      geometryMetadataBlobSha: source.geometryProfile.metadataBlobSha,
    }),
    authorityBoundary: Object.freeze({
      governedResearchMetricLipsGeometryOutputAuthorized: true as const,
      productionNeutralObservationIssued: false as const,
      mutateFR15BaseContractAllowed: false as const,
      fr15ConsumerSlotIssuanceAllowed: false as const,
      outerInnerAnatomicalAssignmentAllowed: false as const,
      providerComponentOrderSemanticUseAllowed: false as const,
      providerVertexIndexOutputAllowed: false as const,
      poseNormalized2DIssuanceAllowed: false as const,
      neutralMetricIssuanceAllowed: false as const,
      traditionalOperationalizationAllowed: false as const,
      morphologyClassificationAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
      claimIssuanceAllowed: false as const,
    }),
    blockers: BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    provenance: Object.freeze({
      providerRunRef: source.provider.providerRunRef,
      canonicalAssetDigest: source.provider.canonicalAssetDigest,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      rawGeometryMetadataPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      derivedMetricLipsSurfacePersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  SURFACE_ISSUED.add(surface);
  return surface;
}

export function assertIssuedGovernedMetricLipsSurfaceFR78(
  surface: GovernedMetricLipsSurfaceFR78V1,
): void {
  if (!SURFACE_ISSUED.has(surface)) fail('metric lips surface was not issued by the active FR-78 projection boundary.');
  if (
    surface.schemaVersion !== 'fr78-governed-metric-lips-surface-v1' ||
    surface.authorityState !== 'governed_metric_lips_surface_candidate_only' ||
    surface.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    surface.unit !== 'centimeter' ||
    surface.contours.length !== 2 ||
    surface.metricLipsGeometryIssued !== true ||
    surface.poseNormalizedLipsGeometryIssued !== false ||
    surface.neutralMetricDefinitionsIssued !== 0 ||
    surface.neutralMetricValuesIssued !== 0 ||
    surface.morphologyProduced !== false ||
    surface.criterionStatesIssued !== 0 ||
    surface.claimsIssued !== 0 ||
    surface.traditionalSemanticAuthority !== false
  ) fail('issued metric lips surface authority or identity drift.');
}
