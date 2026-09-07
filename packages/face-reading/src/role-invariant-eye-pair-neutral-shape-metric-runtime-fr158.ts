import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import type { MediaPipeMetricGeometryPointFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR158_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr158-role-invariant-eye-pair-neutral-shape-metric-runtime.md' as const;
export const FR158_NEXT_FRONTIER =
  'prospective_eye_pair_metric_3d_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion' as const;

const X_SPAN_KEY = 'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio' as const;
const PERIMETER_KEY = 'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio' as const;
const CENTROID_KEY = 'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio' as const;
const TURN_KEY = 'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle' as const;
const METRIC_VERSION = '0.1.0' as const;
const X_SPAN_REF = `${X_SPAN_KEY}@${METRIC_VERSION}` as const;
const PERIMETER_REF = `${PERIMETER_KEY}@${METRIC_VERSION}` as const;
const CENTROID_REF = `${CENTROID_KEY}@${METRIC_VERSION}` as const;
const TURN_REF = `${TURN_KEY}@${METRIC_VERSION}` as const;

export type RoleInvariantEyePairNeutralShapeMetricRefFR158V1 =
  | typeof X_SPAN_REF
  | typeof PERIMETER_REF
  | typeof CENTROID_REF
  | typeof TURN_REF;

export interface RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1 {
  readonly metricKey: typeof X_SPAN_KEY | typeof PERIMETER_KEY | typeof CENTROID_KEY | typeof TURN_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: RoleInvariantEyePairNeutralShapeMetricRefFR158V1;
  readonly sourceSurface: 'fr77_canonical_aligned_metric_3d_plus_fr24_eye_topology_witness';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'ratio' | 'radian';
  readonly formula: string;
  readonly componentAggregation: 'role_invariant_over_two_closed_cycles';
  readonly usesReviewed2DProjection: false;
  readonly providerTopologyLabelRequiredForSemanticRole: false;
  readonly anatomicalLateralityRequired: false;
  readonly physicalAnthropometricInterpretationAllowed: false;
  readonly identityMatchingInterpretationAllowed: false;
  readonly calibrationRef: null;
  readonly traditionalCriterionBindingRef: null;
}

export interface RoleInvariantEyePairNeutralShapeMetricValueFR158V1 {
  readonly metricRef: RoleInvariantEyePairNeutralShapeMetricRefFR158V1;
  readonly value: number;
  readonly unit: 'ratio' | 'radian';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly contributingClosedCycleCount: 2;
  readonly contributingElementCount: 2 | 32;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly thresholdApplied: false;
  readonly identityMatchingApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 {
  readonly schemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_invariant_eye_pair_metric_3d_candidates_research_only';
  readonly source: {
    readonly fr77SchemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly fr77ArtifactVersion: '0.1.0';
    readonly fr77AuthorityState: 'governed_metric_geometry_candidate_only';
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly coordinateUnit: 'centimeter';
    readonly providerLandmarkCount: 478;
    readonly geometryLandmarkCount: 468;
    readonly irisLandmarksExcluded: true;
    readonly exactGeometryMetadataBlobVerified: true;
    readonly eyeTopologyWitnessRegionCount: 2;
    readonly eyeTopologyWitnessPointCounts: readonly [16, 16];
    readonly eyeTopologyReleaseExactForInstalledPackage: false;
    readonly anatomicalLateralityResolved: false;
  };
  readonly geometryBoundary: {
    readonly fullMeshXSpanUsedAsScaleDenominator: true;
    readonly fullMeshXSpanUnit: 'centimeter';
    readonly twoEyeCyclesSelectedByPinnedFR24TopologyVertexSets: true;
    readonly providerTopologySymbolsUsedOnlyToSelectPinnedVertexSets: true;
    readonly providerTopologySymbolsUsedAsSemanticSideLabels: false;
    readonly reviewed2DProjectionUsed: false;
    readonly metricXYZDroppedTo2D: false;
    readonly poseNormalized2DClaimIssued: false;
  };
  readonly metricDefinitions: readonly [
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
    RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  ];
  readonly metricValues: readonly [
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
    RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
  ];
  readonly empiricalBoundary: {
    readonly candidateSelectionState: 'exploratory_feature_definition_not_validation';
    readonly currentDevelopmentCapturesCanEstablishValidation: false;
    readonly prospectiveFreshCaptureEvaluationRequired: true;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
    readonly constructValidity: 'unresolved';
  };
  readonly authorityBoundary: {
    readonly providerTopologyLabelsUsedAsAnatomicalLaterality: false;
    readonly anatomicalLateralityResolved: false;
    readonly productionNeutralObservationIssued: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalBinding: 'unresolved';
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersistedByThisRuntime: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly metricValuesPersistedByThisRuntime: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR158_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR158_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
const EYE_CYCLE_VERTEX_SETS: readonly (readonly number[])[] = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol])),
  ),
);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-158 ${message}`);
}

function validateSource(source: GovernedMetricGeometryCandidateFR77V1): void {
  assertIssuedGovernedMetricGeometryFR77(source);
  if (
    source.schemaVersion !== 'fr77-governed-metric-geometry-candidate-v1'
    || source.artifactVersion !== '0.1.0'
    || source.authorityState !== 'governed_metric_geometry_candidate_only'
    || source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || source.unit !== 'centimeter'
    || source.provider.runtimePackageName !== '@mediapipe/tasks-vision'
    || source.provider.runtimePackageVersion !== '0.10.35'
    || source.provider.providerLandmarkCount !== 478
    || source.provider.geometryLandmarkCount !== 468
    || source.provider.irisLandmarksExcluded !== true
    || source.provider.providerDepthConsumedForMetricGeometry !== true
    || source.provider.fr61ContractModified !== false
    || source.metricLandmarks.length !== 468
    || source.geometryProfile.exactGitBlobVerified !== true
    || source.geometryProfile.procrustesBasisCount !== 33
    || source.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true
    || source.authorityBoundary.productionNeutralObservationIssued !== false
    || source.authorityBoundary.reviewed2DProjectionRuleIssued !== false
    || source.authorityBoundary.neutralMetricDefinitionsIssued !== 0
    || source.authorityBoundary.neutralMetricValuesIssued !== 0
    || source.authorityBoundary.morphologyProduced !== false
    || source.authorityBoundary.criterionStatesIssued !== 0
    || source.authorityBoundary.claimsIssued !== 0
    || source.authorityBoundary.traditionalSemanticAuthority !== false
    || source.persistencePolicy.rawSourcePersisted !== false
    || source.persistencePolicy.rawProviderResponsePersisted !== false
    || source.persistencePolicy.rawProviderDepthPersisted !== false
    || source.persistencePolicy.derivedMetricGeometryPersisted !== false
    || source.persistencePolicy.biometricEmbeddingPersisted !== false
  ) fail('requires the exact issued FR-77 research metric-geometry authority boundary.');

  if (EYE_CYCLE_VERTEX_SETS.length !== 2 || EYE_CYCLE_VERTEX_SETS.some((cycle) => cycle.length !== 16)) {
    fail('FR-24 eye topology witness must remain exactly two 16-point closed cycles.');
  }
  for (const cycle of EYE_CYCLE_VERTEX_SETS) {
    if (cycle.some((vertex) => vertex < 0 || vertex >= source.metricLandmarks.length)) {
      fail('FR-24 eye topology witness references a vertex outside the FR-77 468-landmark geometry surface.');
    }
  }
}

function distance3(left: MediaPipeMetricGeometryPointFR76V1, right: MediaPipeMetricGeometryPointFR76V1): number {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

function centroid3(points: readonly MediaPipeMetricGeometryPointFR76V1[]): MediaPipeMetricGeometryPointFR76V1 {
  const sum = points.reduce((accumulator, point) => ({
    x: accumulator.x + point.x,
    y: accumulator.y + point.y,
    z: accumulator.z + point.z,
  }), { x: 0, y: 0, z: 0 });
  return Object.freeze({
    x: sum.x / points.length,
    y: sum.y / points.length,
    z: sum.z / points.length,
  });
}

function cycleStats(points: readonly MediaPipeMetricGeometryPointFR76V1[]): {
  xSpan: number;
  perimeter: number;
  meanTurningAngle: number;
  centroid: MediaPipeMetricGeometryPointFR76V1;
} {
  if (points.length !== 16) fail('eye metric cycle must contain exactly 16 metric 3D points.');
  const xs = points.map((point) => point.x);
  const xSpan = Math.max(...xs) - Math.min(...xs);
  if (!Number.isFinite(xSpan) || xSpan <= 0) fail('eye metric cycle X span must be finite and positive.');

  let perimeter = 0;
  let turnSum = 0;
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length]!;
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const inX = current.x - previous.x;
    const inY = current.y - previous.y;
    const inZ = current.z - previous.z;
    const outX = next.x - current.x;
    const outY = next.y - current.y;
    const outZ = next.z - current.z;
    const inLength = Math.hypot(inX, inY, inZ);
    const outLength = Math.hypot(outX, outY, outZ);
    if (!Number.isFinite(inLength) || inLength <= 0 || !Number.isFinite(outLength) || outLength <= 0) {
      fail(`eye metric 3D edge length must be finite and positive at vertex ${index}.`);
    }
    perimeter += outLength;
    const cosine = Math.max(-1, Math.min(1,
      ((inX * outX) + (inY * outY) + (inZ * outZ)) / (inLength * outLength),
    ));
    const angle = Math.acos(cosine);
    if (!Number.isFinite(angle)) fail(`eye metric 3D turning angle must be finite at vertex ${index}.`);
    turnSum += angle;
  }
  if (!Number.isFinite(perimeter) || perimeter <= 0) fail('eye metric cycle perimeter must be finite and positive.');
  return { xSpan, perimeter, meanTurningAngle: turnSum / points.length, centroid: centroid3(points) };
}

function definitions(): readonly [
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
  RoleInvariantEyePairNeutralShapeMetricDefinitionFR158V1,
] {
  const common = Object.freeze({
    metricVersion: METRIC_VERSION,
    sourceSurface: 'fr77_canonical_aligned_metric_3d_plus_fr24_eye_topology_witness' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    componentAggregation: 'role_invariant_over_two_closed_cycles' as const,
    usesReviewed2DProjection: false as const,
    providerTopologyLabelRequiredForSemanticRole: false as const,
    anatomicalLateralityRequired: false as const,
    physicalAnthropometricInterpretationAllowed: false as const,
    identityMatchingInterpretationAllowed: false as const,
    calibrationRef: null,
    traditionalCriterionBindingRef: null,
  });
  return Object.freeze([
    Object.freeze({
      ...common,
      metricKey: X_SPAN_KEY,
      metricRef: X_SPAN_REF,
      unit: 'ratio' as const,
      formula: 'mean(max_x(cycle)-min_x(cycle)) over two 16-point metric-3D eye cycles divided by full 468-landmark mesh X span' as const,
    }),
    Object.freeze({
      ...common,
      metricKey: PERIMETER_KEY,
      metricRef: PERIMETER_REF,
      unit: 'ratio' as const,
      formula: 'mean(sum(euclidean_3d_closed_cycle_edge_length)) over two 16-point eye cycles divided by full 468-landmark mesh X span' as const,
    }),
    Object.freeze({
      ...common,
      metricKey: CENTROID_KEY,
      metricRef: CENTROID_REF,
      unit: 'ratio' as const,
      formula: 'euclidean_3d_distance(centroid(cycle_1),centroid(cycle_2)) divided by full 468-landmark mesh X span' as const,
    }),
    Object.freeze({
      ...common,
      metricKey: TURN_KEY,
      metricRef: TURN_REF,
      unit: 'radian' as const,
      formula: 'mean(acos(clamp(dot(unit_incoming_3d,unit_outgoing_3d),-1,1))) over all 32 closed-cycle vertices' as const,
    }),
  ]);
}

export function getRoleInvariantEyePairNeutralShapeMetricDefinitionsFR158(): ReturnType<typeof definitions> {
  return definitions();
}

export function computeRoleInvariantEyePairNeutralShapeMetricsFR158(
  source: GovernedMetricGeometryCandidateFR77V1,
): RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 {
  validateSource(source);
  const cycles = EYE_CYCLE_VERTEX_SETS.map((vertices) =>
    Object.freeze(vertices.map((vertex) => source.metricLandmarks[vertex]!)),
  );
  const stats = cycles.map(cycleStats);
  const meshXs = source.metricLandmarks.map((point) => point.x);
  const fullMeshXSpan = Math.max(...meshXs) - Math.min(...meshXs);
  if (!Number.isFinite(fullMeshXSpan) || fullMeshXSpan <= 0) fail('full FR-77 mesh X span must be finite and positive.');

  const meanCycleXSpanRatio = ((stats[0]!.xSpan + stats[1]!.xSpan) / 2) / fullMeshXSpan;
  const meanCyclePerimeterRatio = ((stats[0]!.perimeter + stats[1]!.perimeter) / 2) / fullMeshXSpan;
  const centroidSeparationRatio = distance3(stats[0]!.centroid, stats[1]!.centroid) / fullMeshXSpan;
  const meanTurningAngle = (stats[0]!.meanTurningAngle + stats[1]!.meanTurningAngle) / 2;
  if (![meanCycleXSpanRatio, meanCyclePerimeterRatio, centroidSeparationRatio, meanTurningAngle].every(Number.isFinite)) {
    fail('computed eye-pair metric-3D candidate must be finite.');
  }
  const [xSpanDefinition, perimeterDefinition, centroidDefinition, turnDefinition] = definitions();

  const result: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 = Object.freeze({
    schemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_invariant_eye_pair_metric_3d_candidates_research_only' as const,
    source: Object.freeze({
      fr77SchemaVersion: source.schemaVersion,
      fr77ArtifactVersion: source.artifactVersion,
      fr77AuthorityState: source.authorityState,
      coordinateFrame: source.coordinateFrame,
      coordinateUnit: source.unit,
      providerLandmarkCount: 478 as const,
      geometryLandmarkCount: 468 as const,
      irisLandmarksExcluded: true as const,
      exactGeometryMetadataBlobVerified: source.geometryProfile.exactGitBlobVerified,
      eyeTopologyWitnessRegionCount: 2 as const,
      eyeTopologyWitnessPointCounts: Object.freeze([16, 16] as const),
      eyeTopologyReleaseExactForInstalledPackage: false as const,
      anatomicalLateralityResolved: false as const,
    }),
    geometryBoundary: Object.freeze({
      fullMeshXSpanUsedAsScaleDenominator: true as const,
      fullMeshXSpanUnit: 'centimeter' as const,
      twoEyeCyclesSelectedByPinnedFR24TopologyVertexSets: true as const,
      providerTopologySymbolsUsedOnlyToSelectPinnedVertexSets: true as const,
      providerTopologySymbolsUsedAsSemanticSideLabels: false as const,
      reviewed2DProjectionUsed: false as const,
      metricXYZDroppedTo2D: false as const,
      poseNormalized2DClaimIssued: false as const,
    }),
    metricDefinitions: Object.freeze([
      xSpanDefinition, perimeterDefinition, centroidDefinition, turnDefinition,
    ] as const),
    metricValues: Object.freeze([
      Object.freeze({
        metricRef: X_SPAN_REF,
        value: meanCycleXSpanRatio,
        unit: 'ratio' as const,
        coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 2 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: PERIMETER_REF,
        value: meanCyclePerimeterRatio,
        unit: 'ratio' as const,
        coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 32 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: CENTROID_REF,
        value: centroidSeparationRatio,
        unit: 'ratio' as const,
        coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 2 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: TURN_REF,
        value: meanTurningAngle,
        unit: 'radian' as const,
        coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 32 as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
    ] as const),
    empiricalBoundary: Object.freeze({
      candidateSelectionState: 'exploratory_feature_definition_not_validation' as const,
      currentDevelopmentCapturesCanEstablishValidation: false as const,
      prospectiveFreshCaptureEvaluationRequired: true as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
      constructValidity: 'unresolved' as const,
    }),
    authorityBoundary: Object.freeze({
      providerTopologyLabelsUsedAsAnatomicalLaterality: false as const,
      anatomicalLateralityResolved: false as const,
      productionNeutralObservationIssued: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalBinding: 'unresolved' as const,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersistedByThisRuntime: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      metricValuesPersistedByThisRuntime: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR158_RESEARCH_NOTE_REF,
    nextFrontier: FR158_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(
  result: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1,
): void {
  if (!ISSUED.has(result)) fail('metric runtime was not issued by the active FR-158 boundary.');
  if (
    result.schemaVersion !== 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1'
    || result.artifactVersion !== '0.1.0'
    || result.authorityState !== 'role_invariant_eye_pair_metric_3d_candidates_research_only'
    || result.source.geometryLandmarkCount !== 468
    || result.source.eyeTopologyWitnessRegionCount !== 2
    || result.source.eyeTopologyWitnessPointCounts[0] !== 16
    || result.source.eyeTopologyWitnessPointCounts[1] !== 16
    || result.source.eyeTopologyReleaseExactForInstalledPackage !== false
    || result.source.anatomicalLateralityResolved !== false
    || result.geometryBoundary.reviewed2DProjectionUsed !== false
    || result.geometryBoundary.metricXYZDroppedTo2D !== false
    || result.metricValues.length !== 4
    || result.metricValues.some((metric) => !Number.isFinite(metric.value) || metric.identityMatchingApplied !== false)
    || result.empiricalBoundary.candidateSelectionState !== 'exploratory_feature_definition_not_validation'
    || result.empiricalBoundary.currentDevelopmentCapturesCanEstablishValidation !== false
    || result.empiricalBoundary.prospectiveFreshCaptureEvaluationRequired !== true
    || result.empiricalBoundary.captureQualityValidated !== false
    || result.empiricalBoundary.empiricalRepeatabilityEstablished !== false
    || result.empiricalBoundary.captureQualityMeasurementConstructValidated !== false
    || result.empiricalBoundary.numericCaptureQualityThreshold !== null
    || result.empiricalBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || result.empiricalBoundary.constructValidity !== 'unresolved'
    || result.authorityBoundary.providerTopologyLabelsUsedAsAnatomicalLaterality !== false
    || result.authorityBoundary.anatomicalLateralityResolved !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.biometricTemplateIssued !== false
    || result.authorityBoundary.classificationIssued !== false
    || result.authorityBoundary.thresholdsIssued !== false
    || result.authorityBoundary.traditionalBinding !== 'unresolved'
    || result.traditionalSemanticAuthority !== false
  ) fail('issued metric runtime authority or empirical boundary drift.');
}
