import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type { MediaPipeMetricGeometryPointFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import {
  assertIssuedEyePairGeometricYSpanAspectRatioFeasibilityFR177,
  FR177_CANDIDATE_METRIC_REFS,
  FR177_VERDICT,
  issueEyePairGeometricYSpanAspectRatioFeasibilityFR177,
} from './eye-pair-geometric-y-span-aspect-ratio-feasibility-fr177.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR178_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr178-eye-pair-geometric-y-span-runtime.md' as const;
export const FR178_NEXT_FRONTIER =
  'reassess_direct_source_eye_pair_morphology_representability_with_new_neutral_y_span_metrics_without_threshold_or_traditional_unit_binding' as const;

const Y_SPAN_KEY = 'neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio' as const;
const Y_TO_X_KEY = 'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio' as const;
const METRIC_VERSION = '0.1.0' as const;
const Y_SPAN_REF = `${Y_SPAN_KEY}@${METRIC_VERSION}` as const;
const Y_TO_X_REF = `${Y_TO_X_KEY}@${METRIC_VERSION}` as const;

export type EyePairGeometricYSpanMetricRefFR178V1 = typeof Y_SPAN_REF | typeof Y_TO_X_REF;

export interface EyePairGeometricYSpanMetricDefinitionFR178V1 {
  readonly metricKey: typeof Y_SPAN_KEY | typeof Y_TO_X_KEY;
  readonly metricVersion: typeof METRIC_VERSION;
  readonly metricRef: EyePairGeometricYSpanMetricRefFR178V1;
  readonly sourceSurface: 'fr77_canonical_aligned_metric_3d_plus_fr24_eye_topology_witness_plus_fr177_feasibility';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'ratio';
  readonly formula: string;
  readonly componentAggregation: 'role_invariant_over_two_closed_cycles';
  readonly geometricYSpanOnly: true;
  readonly physiologicalApertureInterpretationAllowed: false;
  readonly eyeHeightSemanticInterpretationAllowed: false;
  readonly providerTopologyLabelRequiredForSemanticRole: false;
  readonly anatomicalLateralityRequired: false;
  readonly individualEyeValueExposed: false;
  readonly physicalAnthropometricInterpretationAllowed: false;
  readonly calibrationRef: null;
  readonly traditionalCriterionBindingRef: null;
}

export interface EyePairGeometricYSpanMetricValueFR178V1 {
  readonly metricRef: EyePairGeometricYSpanMetricRefFR178V1;
  readonly value: number;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly contributingClosedCycleCount: 2;
  readonly contributingElementCount: 2;
  readonly individualEyeValuesExposed: false;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly thresholdApplied: false;
  readonly identityMatchingApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface EyePairGeometricYSpanRuntimeFR178V1 {
  readonly schemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_invariant_eye_pair_geometric_y_span_metrics_research_only';
  readonly source: {
    readonly fr77SchemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly fr77ArtifactVersion: '0.1.0';
    readonly fr77AuthorityState: 'governed_metric_geometry_candidate_only';
    readonly fr177SchemaVersion: 'fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility-v1';
    readonly fr177Verdict: typeof FR177_VERDICT;
    readonly providerPackage: '@mediapipe/tasks-vision';
    readonly providerVersion: '0.10.35';
    readonly providerLandmarkCount: 478;
    readonly geometryLandmarkCount: 468;
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly coordinateUnit: 'centimeter';
    readonly eyeTopologyWitnessRegionCount: 2;
    readonly eyeTopologyWitnessPointCounts: readonly [16, 16];
    readonly anatomicalLateralityResolved: false;
  };
  readonly geometryBoundary: {
    readonly yAxisBoundingSpanOnly: true;
    readonly fullMeshXSpanUsedAsScaleDenominator: true;
    readonly perCycleXSpanUsedAsAspectDenominator: true;
    readonly denominatorEpsilonUsed: false;
    readonly denominatorClampUsed: false;
    readonly denominatorImputationUsed: false;
    readonly denominatorFallbackUsed: false;
    readonly nonFiniteOperandFailsClosed: true;
    readonly nonPositiveFullMeshXSpanFailsClosed: true;
    readonly nonPositivePerCycleXSpanFailsClosed: true;
    readonly twoEyeCyclesSelectedByPinnedFR24TopologyVertexSets: true;
    readonly providerTopologySymbolsUsedOnlyToSelectPinnedVertexSets: true;
    readonly providerTopologySymbolsUsedAsSemanticSideLabels: false;
    readonly reviewed2DProjectionUsed: false;
    readonly metricXYZDroppedTo2D: false;
  };
  readonly metricDefinitions: readonly [
    EyePairGeometricYSpanMetricDefinitionFR178V1,
    EyePairGeometricYSpanMetricDefinitionFR178V1,
  ];
  readonly metricValues: readonly [
    EyePairGeometricYSpanMetricValueFR178V1,
    EyePairGeometricYSpanMetricValueFR178V1,
  ];
  readonly authorityBoundary: {
    readonly researchNeutralMetricDefinitionsIssued: 2;
    readonly researchNeutralMetricValuesIssued: 2;
    readonly productionNeutralObservationIssued: false;
    readonly upperLowerLidRolesIssued: false;
    readonly anatomicalLateralityResolved: false;
    readonly individualEyeAsymmetryIssued: false;
    readonly physiologicalApertureIssued: false;
    readonly eyeHeightSemanticLabelIssued: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly scoresIssued: false;
    readonly ranksIssued: false;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalUnitMappingIssued: false;
    readonly traditionalBinding: 'unresolved';
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersistedByThisRuntime: false;
    readonly metricValuesPersistedByThisRuntime: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR178_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR178_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
const EYE_CYCLE_VERTEX_SETS: readonly (readonly number[])[] = Object.freeze(
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    Object.freeze(orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol])),
  ),
);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-178 ${message}`);
}

function validateAuthority(source: GovernedMetricGeometryCandidateFR77V1): ReturnType<typeof issueEyePairGeometricYSpanAspectRatioFeasibilityFR177> {
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
    || source.metricLandmarks.length !== 468
    || source.geometryProfile.exactGitBlobVerified !== true
    || source.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true
    || source.authorityBoundary.productionNeutralObservationIssued !== false
    || source.authorityBoundary.morphologyProduced !== false
    || source.authorityBoundary.criterionStatesIssued !== 0
    || source.authorityBoundary.claimsIssued !== 0
    || source.authorityBoundary.traditionalSemanticAuthority !== false
    || source.persistencePolicy.rawSourcePersisted !== false
    || source.persistencePolicy.rawProviderResponsePersisted !== false
    || source.persistencePolicy.derivedMetricGeometryPersisted !== false
    || source.persistencePolicy.biometricEmbeddingPersisted !== false
  ) fail('requires the exact issued FR-77 research metric-geometry authority boundary.');

  const fr177 = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();
  assertIssuedEyePairGeometricYSpanAspectRatioFeasibilityFR177(fr177);
  if (
    fr177.verdict !== FR177_VERDICT
    || fr177.decisionBoundary.methodologyCandidateAuthorized !== true
    || fr177.decisionBoundary.runtimeMetricIssued !== false
    || fr177.decisionBoundary.newObservationPrimitiveIssued !== false
    || fr177.decisionBoundary.traditionalSemanticBindingAuthorized !== false
    || fr177.geometryReview.denominatorRuleInventsEpsilon !== false
    || fr177.geometryReview.nonFiniteOperandFailsClosed !== true
    || fr177.geometryReview.nonPositiveFullMeshXSpanFailsClosed !== true
    || fr177.geometryReview.nonPositivePerCycleXSpanFailsClosed !== true
    || FR177_CANDIDATE_METRIC_REFS.length !== 2
  ) fail('requires the exact issued FR-177 feasibility boundary.');

  if (EYE_CYCLE_VERTEX_SETS.length !== 2 || EYE_CYCLE_VERTEX_SETS.some((cycle) => cycle.length !== 16)) {
    fail('FR-24 eye topology witness must remain exactly two 16-point closed cycles.');
  }
  for (const cycle of EYE_CYCLE_VERTEX_SETS) {
    if (cycle.some((vertex) => vertex < 0 || vertex >= source.metricLandmarks.length)) {
      fail('FR-24 eye topology witness references a vertex outside the FR-77 468-landmark geometry surface.');
    }
  }
  return fr177;
}

function cycleSpans(points: readonly MediaPipeMetricGeometryPointFR76V1[]): { xSpan: number; ySpan: number } {
  if (points.length !== 16) fail('eye metric cycle must contain exactly 16 metric 3D points.');
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  if (![...xs, ...ys].every(Number.isFinite)) fail('eye metric cycle X/Y coordinates must all be finite.');
  const xSpan = Math.max(...xs) - Math.min(...xs);
  const ySpan = Math.max(...ys) - Math.min(...ys);
  if (!Number.isFinite(xSpan) || xSpan <= 0) fail('eye metric cycle X span must be finite and positive.');
  if (!Number.isFinite(ySpan) || ySpan < 0) fail('eye metric cycle Y span must be finite and non-negative.');
  return { xSpan, ySpan };
}

function definitions(): readonly [
  EyePairGeometricYSpanMetricDefinitionFR178V1,
  EyePairGeometricYSpanMetricDefinitionFR178V1,
] {
  const common = Object.freeze({
    metricVersion: METRIC_VERSION,
    sourceSurface: 'fr77_canonical_aligned_metric_3d_plus_fr24_eye_topology_witness_plus_fr177_feasibility' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    unit: 'ratio' as const,
    componentAggregation: 'role_invariant_over_two_closed_cycles' as const,
    geometricYSpanOnly: true as const,
    physiologicalApertureInterpretationAllowed: false as const,
    eyeHeightSemanticInterpretationAllowed: false as const,
    providerTopologyLabelRequiredForSemanticRole: false as const,
    anatomicalLateralityRequired: false as const,
    individualEyeValueExposed: false as const,
    physicalAnthropometricInterpretationAllowed: false as const,
    calibrationRef: null,
    traditionalCriterionBindingRef: null,
  });
  return Object.freeze([
    Object.freeze({
      ...common,
      metricKey: Y_SPAN_KEY,
      metricRef: Y_SPAN_REF,
      formula: 'mean(max_y(cycle)-min_y(cycle)) over two exact 16-point metric-3D eye cycles divided by full 468-landmark mesh X span' as const,
    }),
    Object.freeze({
      ...common,
      metricKey: Y_TO_X_KEY,
      metricRef: Y_TO_X_REF,
      formula: 'mean((max_y(cycle)-min_y(cycle))/(max_x(cycle)-min_x(cycle))) over the two exact 16-point metric-3D eye cycles' as const,
    }),
  ] as const);
}

export function getEyePairGeometricYSpanMetricDefinitionsFR178(): ReturnType<typeof definitions> {
  return definitions();
}

export function computeEyePairGeometricYSpanMetricsFR178(
  source: GovernedMetricGeometryCandidateFR77V1,
): EyePairGeometricYSpanRuntimeFR178V1 {
  const fr177 = validateAuthority(source);
  const cycles = EYE_CYCLE_VERTEX_SETS.map((vertices) =>
    Object.freeze(vertices.map((vertex) => source.metricLandmarks[vertex]!)),
  );
  const spans = cycles.map(cycleSpans);

  const meshXs = source.metricLandmarks.map((point) => point.x);
  if (!meshXs.every(Number.isFinite)) fail('full FR-77 mesh X coordinates must all be finite.');
  const fullMeshXSpan = Math.max(...meshXs) - Math.min(...meshXs);
  if (!Number.isFinite(fullMeshXSpan) || fullMeshXSpan <= 0) {
    fail('full FR-77 mesh X span must be finite and positive.');
  }

  const meanCycleYSpanToFullMeshXSpanRatio =
    ((spans[0]!.ySpan + spans[1]!.ySpan) / 2) / fullMeshXSpan;
  const meanCycleYToXSpanRatio =
    ((spans[0]!.ySpan / spans[0]!.xSpan) + (spans[1]!.ySpan / spans[1]!.xSpan)) / 2;
  if (![meanCycleYSpanToFullMeshXSpanRatio, meanCycleYToXSpanRatio].every(Number.isFinite)) {
    fail('computed Eye-Pair geometric Y-span metric must be finite.');
  }

  const [ySpanDefinition, yToXDefinition] = definitions();
  const result: EyePairGeometricYSpanRuntimeFR178V1 = Object.freeze({
    schemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_invariant_eye_pair_geometric_y_span_metrics_research_only' as const,
    source: Object.freeze({
      fr77SchemaVersion: source.schemaVersion,
      fr77ArtifactVersion: source.artifactVersion,
      fr77AuthorityState: source.authorityState,
      fr177SchemaVersion: fr177.schemaVersion,
      fr177Verdict: fr177.verdict,
      providerPackage: source.provider.runtimePackageName,
      providerVersion: source.provider.runtimePackageVersion,
      providerLandmarkCount: source.provider.providerLandmarkCount,
      geometryLandmarkCount: source.provider.geometryLandmarkCount,
      coordinateFrame: source.coordinateFrame,
      coordinateUnit: source.unit,
      eyeTopologyWitnessRegionCount: 2 as const,
      eyeTopologyWitnessPointCounts: Object.freeze([16, 16] as const),
      anatomicalLateralityResolved: false as const,
    }),
    geometryBoundary: Object.freeze({
      yAxisBoundingSpanOnly: true as const,
      fullMeshXSpanUsedAsScaleDenominator: true as const,
      perCycleXSpanUsedAsAspectDenominator: true as const,
      denominatorEpsilonUsed: false as const,
      denominatorClampUsed: false as const,
      denominatorImputationUsed: false as const,
      denominatorFallbackUsed: false as const,
      nonFiniteOperandFailsClosed: true as const,
      nonPositiveFullMeshXSpanFailsClosed: true as const,
      nonPositivePerCycleXSpanFailsClosed: true as const,
      twoEyeCyclesSelectedByPinnedFR24TopologyVertexSets: true as const,
      providerTopologySymbolsUsedOnlyToSelectPinnedVertexSets: true as const,
      providerTopologySymbolsUsedAsSemanticSideLabels: false as const,
      reviewed2DProjectionUsed: false as const,
      metricXYZDroppedTo2D: false as const,
    }),
    metricDefinitions: Object.freeze([ySpanDefinition, yToXDefinition] as const),
    metricValues: Object.freeze([
      Object.freeze({
        metricRef: Y_SPAN_REF,
        value: meanCycleYSpanToFullMeshXSpanRatio,
        unit: 'ratio' as const,
        coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 2 as const,
        individualEyeValuesExposed: false as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
      Object.freeze({
        metricRef: Y_TO_X_REF,
        value: meanCycleYToXSpanRatio,
        unit: 'ratio' as const,
        coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
        contributingClosedCycleCount: 2 as const,
        contributingElementCount: 2 as const,
        individualEyeValuesExposed: false as const,
        classificationApplied: false as const,
        calibrationApplied: false as const,
        thresholdApplied: false as const,
        identityMatchingApplied: false as const,
        traditionalBindingApplied: false as const,
      }),
    ] as const),
    authorityBoundary: Object.freeze({
      researchNeutralMetricDefinitionsIssued: 2 as const,
      researchNeutralMetricValuesIssued: 2 as const,
      productionNeutralObservationIssued: false as const,
      upperLowerLidRolesIssued: false as const,
      anatomicalLateralityResolved: false as const,
      individualEyeAsymmetryIssued: false as const,
      physiologicalApertureIssued: false as const,
      eyeHeightSemanticLabelIssued: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      scoresIssued: false as const,
      ranksIssued: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalUnitMappingIssued: false as const,
      traditionalBinding: 'unresolved' as const,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersistedByThisRuntime: false as const,
      metricValuesPersistedByThisRuntime: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR178_RESEARCH_NOTE_REF,
    nextFrontier: FR178_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairGeometricYSpanMetricsFR178(
  result: EyePairGeometricYSpanRuntimeFR178V1,
): void {
  if (!ISSUED.has(result)) fail('Eye-Pair geometric Y-span runtime was not issued by the active FR-178 boundary.');
  if (
    result.schemaVersion !== 'fr178-eye-pair-geometric-y-span-runtime-v1'
    || result.artifactVersion !== '0.1.0'
    || result.authorityState !== 'role_invariant_eye_pair_geometric_y_span_metrics_research_only'
    || result.metricDefinitions.length !== 2
    || result.metricValues.length !== 2
    || result.authorityBoundary.researchNeutralMetricDefinitionsIssued !== 2
    || result.authorityBoundary.researchNeutralMetricValuesIssued !== 2
    || result.authorityBoundary.productionNeutralObservationIssued !== false
    || result.authorityBoundary.individualEyeAsymmetryIssued !== false
    || result.authorityBoundary.physiologicalApertureIssued !== false
    || result.authorityBoundary.traditionalUnitMappingIssued !== false
    || result.authorityBoundary.traditionalBinding !== 'unresolved'
    || result.traditionalSemanticAuthority !== false
  ) fail('Eye-Pair geometric Y-span runtime authority boundary drifted.');
}
