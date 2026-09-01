import {
  orderClosedCycleProviderVerticesFR16,
  projectClosedCycleRegionTestVectorFR16,
  type ProviderConnectionEdgeV1,
} from './provider-adapter-evidence-fr16.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37,
  MEDIAPIPE_PUBLISHED_TOPOLOGY_SURFACE_GAP_AUTHORITY_FR37,
  validateMediaPipePublishedTopologySurfaceGapAuthorityFR37,
} from './mediapipe-published-topology-surface-gap-fr37.js';
import {
  projectFR61RunToGovernedNeutralGeometryFR62,
} from './governed-neutral-geometry-fr62.js';
import type { NeutralObservationGeometryV1, NormalizedPoint2DV1 } from './neutral-observation-schema-fr15.js';
import {
  runProductionNeutralObservationProviderFR61,
  type ProductionNeutralObservationProviderRequestFR61V1,
  type ProductionNeutralObservationProviderRunFR61V1,
  type ProviderNormalizedLandmarkFrameFR61V1,
} from './production-neutral-observation-provider-fr61.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface MediaPipeLipsReleaseWitnessFR65V1 {
  readonly repository: 'google-ai-edge/mediapipe';
  readonly releaseTag: 'v0.10.35';
  readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
  readonly sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts';
  readonly sourceSymbol: 'FACE_LANDMARKS_LIPS';
  readonly sourceLabel: 'Landmarks for lips';
  readonly runtimePackageName: '@mediapipe/tasks-vision';
  readonly runtimePackageVersion: '0.10.35';
  readonly releaseExactForInstalledPackage: true;
  readonly edgeCount: 40;
  readonly connectedComponentCount: 2;
  readonly closedCycleComponentCount: 2;
  readonly componentRoleLabelsPublished: false;
}

export interface GovernedLipsTopologyRegionCandidateFR65V1 {
  readonly candidateRef: string;
  readonly providerTopologySymbol: 'FACE_LANDMARKS_LIPS';
  readonly providerGraphComponentOrdinal: number;
  readonly geometry: Extract<NeutralObservationGeometryV1, { readonly kind: 'region' }>;
  readonly componentRoleAuthority: 'provider_graph_component_only_no_outer_inner_anatomy';
  readonly consumerSlotAssignment: null;
}

export interface GovernedLipsTopologyAdmissionFR65V1 {
  readonly schemaVersion: 'fr65-mediapipe-lips-topology-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'release_exact_provider_lips_topology_candidate_only';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly sourceWitness: MediaPipeLipsReleaseWitnessFR65V1;
  readonly regions: readonly GovernedLipsTopologyRegionCandidateFR65V1[];
  readonly componentCount: 2;
  readonly componentConsumptionState: 'unordered_provider_labeled_lips_components_only';
  readonly outerInnerComponentAssignment: null;
  readonly mouthConsumerSlotAssignment: null;
  readonly mouthConsumerSlotExistsInFR15: false;
  readonly intakeOfficerCriterionStatesIssued: 0;
  readonly morphologyProduced: false;
  readonly productionNeutralObservationIssued: false;
  readonly traditionalSemanticAuthority: false;
  readonly upstream: {
    readonly fr61SchemaVersion: 'fr61-production-neutral-observation-provider-run-v1';
    readonly fr62SchemaVersion: 'fr62-governed-neutral-geometry-candidate-v1';
    readonly fr62EyeGeometryCandidateCount: 2;
    readonly fr62ConsumerSlotAssignmentsIssued: 0;
  };
  readonly prohibitedShortcuts: readonly [
    'provider_lips_label_to_traditional_mouth_criterion',
    'provider_component_order_to_outer_inner_anatomy',
    'two_closed_cycles_to_lip_thickness_operationalization',
    'lips_bounding_geometry_to_square_broad_classification',
    'provider_vertex_index_to_traditional_anchor',
  ];
  readonly blockers: readonly [
    'fr15_has_no_mouth_consumer_slot',
    'outer_inner_component_roles_not_published',
    'mouth_morphology_operationalizations_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'capture_sensitive_mouth_criteria_not_consumable',
  ];
  readonly provenance: {
    readonly providerKey: 'visually_facelab';
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly runtimePackageVersion: '0.10.35';
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly providerDepthPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const SOURCE_EDGE_TUPLES = Object.freeze([
  [61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405],
  [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37],
  [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291],
  [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402],
  [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82],
  [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308],
] as const);

export const FR65_MEDIAPIPE_LIPS_RELEASE_EDGES: readonly ProviderConnectionEdgeV1[] = Object.freeze(
  SOURCE_EDGE_TUPLES.map(([start, end]) => Object.freeze({ start, end })),
);

export const MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65: MediaPipeLipsReleaseWitnessFR65V1 = Object.freeze({
  repository: 'google-ai-edge/mediapipe' as const,
  releaseTag: 'v0.10.35' as const,
  releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
  sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' as const,
  sourceSymbol: 'FACE_LANDMARKS_LIPS' as const,
  sourceLabel: 'Landmarks for lips' as const,
  runtimePackageName: '@mediapipe/tasks-vision' as const,
  runtimePackageVersion: '0.10.35' as const,
  releaseExactForInstalledPackage: true as const,
  edgeCount: 40 as const,
  connectedComponentCount: 2 as const,
  closedCycleComponentCount: 2 as const,
  componentRoleLabelsPublished: false as const,
});

const POINT_KEYS = new Set(['x', 'y']);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-65 ${message}`);
}

function exactPoint(point: NormalizedPoint2DV1, path: string): NormalizedPoint2DV1 {
  if (typeof point !== 'object' || point === null) fail(`${path} must be a normalized 2D point.`);
  const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
  if (unexpected !== undefined) fail(`${path} contains unauthorized field: ${unexpected}`);
  if (!Number.isFinite(point.x) || point.x < 0 || point.x > 1) fail(`${path}.x must be finite within [0,1].`);
  if (!Number.isFinite(point.y) || point.y < 0 || point.y > 1) fail(`${path}.y must be finite within [0,1].`);
  return point;
}

function connectedComponents(edges: readonly ProviderConnectionEdgeV1[]): readonly (readonly ProviderConnectionEdgeV1[])[] {
  const adjacency = new Map<number, Set<number>>();
  for (const edge of edges) {
    if (!Number.isInteger(edge.start) || edge.start < 0 || !Number.isInteger(edge.end) || edge.end < 0 || edge.start === edge.end) {
      fail('release witness edges must use distinct non-negative integer provider vertices.');
    }
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
    const component: number[] = [];
    remaining.delete(seed);
    while (stack.length > 0) {
      const vertex = stack.pop()!;
      component.push(vertex);
      for (const neighbor of adjacency.get(vertex) ?? []) {
        if (remaining.delete(neighbor)) stack.push(neighbor);
      }
    }
    component.sort((left, right) => left - right);
    vertexComponents.push(component);
  }
  vertexComponents.sort((left, right) => left[0]! - right[0]!);

  return Object.freeze(vertexComponents.map((vertices) => {
    const set = new Set(vertices);
    return Object.freeze(edges.filter((edge) => set.has(edge.start) && set.has(edge.end)));
  }));
}

function validateReleaseWitnessFR65(): readonly (readonly ProviderConnectionEdgeV1[])[] {
  validateMediaPipePublishedTopologySurfaceGapAuthorityFR37();
  const witness = MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65;
  if (
    witness.releaseTag !== 'v0.10.35' ||
    witness.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    witness.sourceSymbol !== 'FACE_LANDMARKS_LIPS' ||
    witness.runtimePackageVersion !== '0.10.35' ||
    witness.releaseExactForInstalledPackage !== true ||
    witness.componentRoleLabelsPublished !== false
  ) fail('release-exact lips witness identity/authority drift.');
  if (
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageName !== witness.runtimePackageName ||
    MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageVersion !== witness.runtimePackageVersion ||
    MEDIAPIPE_PUBLISHED_TOPOLOGY_SURFACE_GAP_AUTHORITY_FR37.packageVersion !== witness.runtimePackageVersion ||
    !MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37.includes('FACE_LANDMARKS_LIPS')
  ) fail('runtime/package/named-topology pin drift.');
  if (FR65_MEDIAPIPE_LIPS_RELEASE_EDGES.length !== witness.edgeCount) fail('release lips edge-count drift.');

  const edgeKeys = FR65_MEDIAPIPE_LIPS_RELEASE_EDGES.map((edge) => `${edge.start}:${edge.end}`);
  if (new Set(edgeKeys).size !== edgeKeys.length) fail('release lips witness contains duplicate directed edges.');

  const components = connectedComponents(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES);
  if (components.length !== witness.connectedComponentCount) fail('release lips connected-component count drift.');
  for (const component of components) {
    if (component.length !== 20) fail('each FR-65 provider lips component must contain exactly 20 source edges.');
    const vertices = orderClosedCycleProviderVerticesFR16(component);
    if (vertices.length !== 20) fail('each FR-65 provider lips component must be a 20-vertex closed cycle.');
  }
  return components;
}

function validateSourceRunFR65(run: ProductionNeutralObservationProviderRunFR61V1): void {
  if (
    run.schemaVersion !== 'fr61-production-neutral-observation-provider-run-v1' ||
    run.authorityState !== 'provider_observation_candidate_only' ||
    run.productionNeutralObservationIssued !== false ||
    run.anatomicalLateralityResolved !== false ||
    run.traditionalSemanticAuthority !== false
  ) fail('requires the exact fail-closed FR-61 provider candidate boundary.');
  const frame = run.frame;
  if (
    frame.schemaVersion !== 'fr61-provider-normalized-landmark-frame-v1' ||
    frame.authorityState !== 'provider_observation_candidate_only' ||
    frame.coordinateFrame !== 'canonical_image_normalized_2d' ||
    frame.providerKey !== 'visually_facelab' ||
    frame.runtimePackageName !== '@mediapipe/tasks-vision' ||
    frame.runtimePackageVersion !== '0.10.35' ||
    frame.faceCount !== 1 ||
    frame.providerOrderingAuthority !== 'internal_provider_order_only_not_fr15_output'
  ) fail('FR-61 frame identity/runtime pin drift.');
  if (
    frame.rawSourcePersisted !== false ||
    frame.rawProviderResponsePersisted !== false ||
    frame.providerDepthPersisted !== false ||
    frame.biometricEmbeddingPersisted !== false ||
    frame.productionNeutralObservationIssued !== false ||
    frame.anatomicalLateralityResolved !== false ||
    frame.traditionalSemanticAuthority !== false
  ) fail('FR-61 frame non-persistence/non-semantic boundary widened.');
}

function pointsForComponent(
  frame: ProviderNormalizedLandmarkFrameFR61V1,
  component: readonly ProviderConnectionEdgeV1[],
): Readonly<Record<number, NormalizedPoint2DV1>> {
  const vertices = orderClosedCycleProviderVerticesFR16(component);
  const points: Record<number, NormalizedPoint2DV1> = {};
  for (const vertex of vertices) {
    const point = frame.providerOrderedPoints[vertex];
    if (point === undefined) fail(`source frame is missing required internal provider vertex ${vertex}.`);
    points[vertex] = exactPoint(point, `fr65.internalProviderTopology.${vertex}`);
  }
  return Object.freeze(points);
}

export function projectFR61RunToLipsTopologyAdmissionFR65(
  run: ProductionNeutralObservationProviderRunFR61V1,
): GovernedLipsTopologyAdmissionFR65V1 {
  validateSourceRunFR65(run);
  const components = validateReleaseWitnessFR65();
  const upstreamFR62 = projectFR61RunToGovernedNeutralGeometryFR62(run);
  if (
    upstreamFR62.schemaVersion !== 'fr62-governed-neutral-geometry-candidate-v1' ||
    upstreamFR62.geometryCandidates.length !== 2 ||
    upstreamFR62.fr15ConsumerSlotAssignmentsIssued !== 0 ||
    upstreamFR62.morphologyProduced !== false
  ) fail('upstream FR-62 eye geometry boundary drift.');

  const regions = Object.freeze(components.map((component, index) => Object.freeze({
    candidateRef: `fr65:lips-provider-component:${index + 1}`,
    providerTopologySymbol: 'FACE_LANDMARKS_LIPS' as const,
    providerGraphComponentOrdinal: index + 1,
    geometry: Object.freeze({
      kind: 'region' as const,
      boundary: Object.freeze(projectClosedCycleRegionTestVectorFR16({
        edges: component,
        pointsByProviderVertex: pointsForComponent(run.frame, component),
      }).map((point) => Object.freeze({ x: point.x, y: point.y }))),
    }),
    componentRoleAuthority: 'provider_graph_component_only_no_outer_inner_anatomy' as const,
    consumerSlotAssignment: null,
  })));

  return Object.freeze({
    schemaVersion: 'fr65-mediapipe-lips-topology-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_provider_lips_topology_candidate_only' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    sourceWitness: MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65,
    regions,
    componentCount: 2 as const,
    componentConsumptionState: 'unordered_provider_labeled_lips_components_only' as const,
    outerInnerComponentAssignment: null,
    mouthConsumerSlotAssignment: null,
    mouthConsumerSlotExistsInFR15: false as const,
    intakeOfficerCriterionStatesIssued: 0 as const,
    morphologyProduced: false as const,
    productionNeutralObservationIssued: false as const,
    traditionalSemanticAuthority: false as const,
    upstream: Object.freeze({
      fr61SchemaVersion: run.schemaVersion,
      fr62SchemaVersion: upstreamFR62.schemaVersion,
      fr62EyeGeometryCandidateCount: 2 as const,
      fr62ConsumerSlotAssignmentsIssued: 0 as const,
    }),
    prohibitedShortcuts: Object.freeze([
      'provider_lips_label_to_traditional_mouth_criterion',
      'provider_component_order_to_outer_inner_anatomy',
      'two_closed_cycles_to_lip_thickness_operationalization',
      'lips_bounding_geometry_to_square_broad_classification',
      'provider_vertex_index_to_traditional_anchor',
    ] as const),
    blockers: Object.freeze([
      'fr15_has_no_mouth_consumer_slot',
      'outer_inner_component_roles_not_published',
      'mouth_morphology_operationalizations_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'capture_sensitive_mouth_criteria_not_consumable',
    ] as const),
    provenance: Object.freeze({
      providerKey: run.frame.providerKey,
      providerRunRef: run.frame.providerRunRef,
      canonicalAssetDigest: run.frame.canonicalAssetDigest,
      runtimePackageVersion: run.frame.runtimePackageVersion,
      rawSourcePersisted: run.frame.rawSourcePersisted,
      rawProviderResponsePersisted: run.frame.rawProviderResponsePersisted,
      providerDepthPersisted: run.frame.providerDepthPersisted,
      biometricEmbeddingPersisted: run.frame.biometricEmbeddingPersisted,
    }),
  });
}

export async function runPhotoToLipsTopologyAdmissionFR65(
  request: ProductionNeutralObservationProviderRequestFR61V1,
  factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): Promise<GovernedLipsTopologyAdmissionFR65V1> {
  const run = factory === undefined
    ? await runProductionNeutralObservationProviderFR61(request)
    : await runProductionNeutralObservationProviderFR61(request, factory);
  return projectFR61RunToLipsTopologyAdmissionFR65(run);
}
