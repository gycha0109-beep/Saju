import {
  assertIssuedMesh6ANeutralObservationFrame,
  type Mesh6AObservationFrameV1,
  type Mesh6APoint3D,
} from './mesh6a-neutral-observation-frame.js';
import { FaceAuthorityValidationError } from './validation.js';

const LANDMARK_COUNT = 468;
const REQUIRED_REGION_IDS = Object.freeze([
  'zygomatic_negative_x',
  'zygomatic_positive_x',
  'temple_negative_x',
  'temple_positive_x',
  'cheek_negative_x',
  'cheek_positive_x',
] as const);

export interface Mesh6BWeightedVertex {
  readonly mediapipeIndex: number;
  readonly weight: number;
  readonly role: string;
}

export interface Mesh6BWeightedRegion {
  readonly adapterRegionId: string;
  readonly status: 'weighted_projected_authoring_candidate';
  readonly weightedVertices: readonly Mesh6BWeightedVertex[];
}

export interface Mesh6BWeightedRegionAdapterV2 {
  readonly schemaVersion: 'face-geometry-mediapipe468-weighted-region-adapter-v2';
  readonly targetVertexCount: 468;
  readonly assignment: {
    readonly hardPartition: false;
    readonly overlapAllowed: true;
    readonly semanticSideAssignmentEncoded: false;
  };
  readonly regions: readonly Mesh6BWeightedRegion[];
  readonly policy: {
    readonly productNeutral: true;
    readonly productionMetricAuthorized: false;
    readonly anatomicalDiagnosticClaim: false;
  };
}

export interface Mesh6BZygomaticKernelV1 {
  readonly scaleRmsCm: number;
  readonly regionEvidence: Readonly<Record<string, { readonly vertexCount: number; readonly weightSum: number }>>;
  readonly lateral: {
    readonly zygomaticSpanRatio: number;
    readonly zygomaticTemporalFlareRatio: number;
    readonly zygomaticCheekLateralReliefRatio: number;
    readonly bilateralZygomaticAsymmetryRatio: number;
  };
  readonly depth2p5D: {
    readonly zygomaticRelativeDepthRatio: number;
    readonly coordinateAxis: 'canonical_z';
    readonly authority: 'research_diagnostic_only';
    readonly limitation: 'provider_estimated_single_view_relative_depth_not_anatomical';
  };
}

export interface Mesh6BZygomaticRawMorphologyV1 extends Mesh6BZygomaticKernelV1 {
  readonly schemaVersion: 'mesh6b-zygomatic-raw-morphology-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'research_raw_morphology_only';
  readonly source: {
    readonly observationFrameSchema: 'mesh6a-neutral-observation-frame-v1';
    readonly regionAdapterSchema: 'face-geometry-mediapipe468-weighted-region-adapter-v2';
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly unit: 'centimeter';
  };
  readonly eligibility: {
    readonly researchComputationAllowed: true;
    readonly productRuntimeMorphologyAllowed: false;
    readonly productionMetricAllowed: false;
    readonly scoreOrClassificationIssued: false;
  };
  readonly limitations: readonly [
    'capture_quality_not_calibrated',
    'weighted_region_adapter_is_authoring_candidate',
    'provider_estimated_single_view_relative_depth',
    'population_norm_not_defined',
    'production_threshold_not_defined',
  ];
  readonly authorityBoundary: {
    readonly poseNormalizationReimplemented: false;
    readonly anatomicalZygionClaimed: false;
    readonly subjectSpecific3DReconstructionClaimed: false;
    readonly beautyInterpretationIssued: false;
    readonly traditionalPhysiognomyInterpretationIssued: false;
    readonly compositeCheekboneScoreIssued: false;
    readonly claimsIssued: 0;
  };
}

type RequiredRegionId = (typeof REQUIRED_REGION_IDS)[number];
type Axis = 'x' | 'z';
type WeightedSample = { readonly value: number; readonly weight: number };

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`MESH6B ${message}`);
}

function assertFinitePoints(points: readonly Mesh6APoint3D[]): void {
  if (points.length !== LANDMARK_COUNT) fail(`requires exactly ${LANDMARK_COUNT} points.`);
  for (let index = 0; index < points.length; index += 1) {
    const item = points[index];
    if (item === undefined || !Number.isFinite(item.x) || !Number.isFinite(item.y) || !Number.isFinite(item.z)) {
      fail(`point ${index} must contain finite XYZ.`);
    }
  }
}

function validateAdapter(adapter: Mesh6BWeightedRegionAdapterV2): Map<RequiredRegionId, Mesh6BWeightedRegion> {
  if (
    adapter.schemaVersion !== 'face-geometry-mediapipe468-weighted-region-adapter-v2' ||
    adapter.targetVertexCount !== LANDMARK_COUNT ||
    adapter.assignment.hardPartition !== false ||
    adapter.assignment.overlapAllowed !== true ||
    adapter.assignment.semanticSideAssignmentEncoded !== false ||
    adapter.policy.productNeutral !== true ||
    adapter.policy.productionMetricAuthorized !== false ||
    adapter.policy.anatomicalDiagnosticClaim !== false
  ) fail('requires the fail-closed MESH5.1 weighted adapter contract.');

  const byId = new Map(adapter.regions.map((region) => [region.adapterRegionId, region]));
  const required = new Map<RequiredRegionId, Mesh6BWeightedRegion>();
  for (const regionId of REQUIRED_REGION_IDS) {
    const region = byId.get(regionId);
    if (region === undefined || region.status !== 'weighted_projected_authoring_candidate') {
      fail(`required weighted region missing: ${regionId}`);
    }
    if (region.weightedVertices.length === 0) fail(`required weighted region is empty: ${regionId}`);
    const seen = new Set<number>();
    for (const vertex of region.weightedVertices) {
      if (!Number.isInteger(vertex.mediapipeIndex) || vertex.mediapipeIndex < 0 || vertex.mediapipeIndex >= LANDMARK_COUNT) {
        fail(`invalid MediaPipe index in ${regionId}.`);
      }
      if (seen.has(vertex.mediapipeIndex)) fail(`duplicate MediaPipe index in ${regionId}.`);
      seen.add(vertex.mediapipeIndex);
      if (!Number.isFinite(vertex.weight) || vertex.weight <= 0 || vertex.weight > 1) {
        fail(`invalid membership weight in ${regionId}.`);
      }
    }
    required.set(regionId, region);
  }
  return required;
}

function weightedQuantile(samples: readonly WeightedSample[], quantile: number): number {
  if (!(quantile >= 0 && quantile <= 1) || samples.length === 0) fail('weighted quantile input is invalid.');
  const sorted = [...samples].sort((a, b) => a.value - b.value);
  const totalWeight = sorted.reduce((sum, sample) => sum + sample.weight, 0);
  if (!Number.isFinite(totalWeight) || totalWeight <= 0) fail('weighted quantile requires positive finite total weight.');
  const target = quantile * totalWeight;
  let cumulative = 0;
  for (const sample of sorted) {
    cumulative += sample.weight;
    if (cumulative >= target) return sample.value;
  }
  return sorted[sorted.length - 1]!.value;
}

function samplesFor(
  points: readonly Mesh6APoint3D[],
  region: Mesh6BWeightedRegion,
  axis: Axis,
): WeightedSample[] {
  return region.weightedVertices.map((vertex) => ({
    value: points[vertex.mediapipeIndex]![axis],
    weight: vertex.weight,
  }));
}

function weightedMedian(points: readonly Mesh6APoint3D[], region: Mesh6BWeightedRegion, axis: Axis): number {
  return weightedQuantile(samplesFor(points, region, axis), 0.5);
}

function rmsScale(points: readonly Mesh6APoint3D[]): { readonly scale: number; readonly centroidX: number } {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  for (const item of points) {
    sumX += item.x;
    sumY += item.y;
    sumZ += item.z;
  }
  const cx = sumX / LANDMARK_COUNT;
  const cy = sumY / LANDMARK_COUNT;
  const cz = sumZ / LANDMARK_COUNT;
  let squaredRadiusSum = 0;
  for (const item of points) {
    const dx = item.x - cx;
    const dy = item.y - cy;
    const dz = item.z - cz;
    squaredRadiusSum += dx * dx + dy * dy + dz * dz;
  }
  const scale = Math.sqrt(squaredRadiusSum / LANDMARK_COUNT);
  if (!Number.isFinite(scale) || scale <= 0) fail('requires non-degenerate 468-point geometry.');
  return Object.freeze({ scale, centroidX: cx });
}

export function computeMesh6BZygomaticResearchKernel(
  points: readonly Mesh6APoint3D[],
  adapter: Mesh6BWeightedRegionAdapterV2,
): Mesh6BZygomaticKernelV1 {
  assertFinitePoints(points);
  const regions = validateAdapter(adapter);
  const negativeZygomatic = regions.get('zygomatic_negative_x')!;
  const positiveZygomatic = regions.get('zygomatic_positive_x')!;
  const negativeTemple = regions.get('temple_negative_x')!;
  const positiveTemple = regions.get('temple_positive_x')!;
  const negativeCheek = regions.get('cheek_negative_x')!;
  const positiveCheek = regions.get('cheek_positive_x')!;
  const { scale, centroidX } = rmsScale(points);

  const zygomaticNegativeX = weightedMedian(points, negativeZygomatic, 'x');
  const zygomaticPositiveX = weightedMedian(points, positiveZygomatic, 'x');
  const templeNegativeX = weightedMedian(points, negativeTemple, 'x');
  const templePositiveX = weightedMedian(points, positiveTemple, 'x');
  const cheekNegativeX = weightedMedian(points, negativeCheek, 'x');
  const cheekPositiveX = weightedMedian(points, positiveCheek, 'x');

  const zygomaticSpan = Math.abs(zygomaticPositiveX - zygomaticNegativeX);
  const templeSpan = Math.abs(templePositiveX - templeNegativeX);
  const cheekSpan = Math.abs(cheekPositiveX - cheekNegativeX);

  const zygomaticDepth = (
    weightedMedian(points, negativeZygomatic, 'z') + weightedMedian(points, positiveZygomatic, 'z')
  ) * 0.5;
  const cheekDepth = (
    weightedMedian(points, negativeCheek, 'z') + weightedMedian(points, positiveCheek, 'z')
  ) * 0.5;
  const templeDepth = (
    weightedMedian(points, negativeTemple, 'z') + weightedMedian(points, positiveTemple, 'z')
  ) * 0.5;
  const referenceDepth = (cheekDepth + templeDepth) * 0.5;

  const negativeRadius = Math.abs(zygomaticNegativeX - centroidX);
  const positiveRadius = Math.abs(zygomaticPositiveX - centroidX);

  const regionEvidence = Object.fromEntries(
    [...regions.entries()].map(([regionId, region]) => [
      regionId,
      Object.freeze({
        vertexCount: region.weightedVertices.length,
        weightSum: region.weightedVertices.reduce((sum, vertex) => sum + vertex.weight, 0),
      }),
    ]),
  );

  return Object.freeze({
    scaleRmsCm: scale,
    regionEvidence: Object.freeze(regionEvidence),
    lateral: Object.freeze({
      zygomaticSpanRatio: zygomaticSpan / scale,
      zygomaticTemporalFlareRatio: (zygomaticSpan - templeSpan) / scale,
      zygomaticCheekLateralReliefRatio: (zygomaticSpan - cheekSpan) / scale,
      bilateralZygomaticAsymmetryRatio: Math.abs(negativeRadius - positiveRadius) / scale,
    }),
    depth2p5D: Object.freeze({
      zygomaticRelativeDepthRatio: (zygomaticDepth - referenceDepth) / scale,
      coordinateAxis: 'canonical_z' as const,
      authority: 'research_diagnostic_only' as const,
      limitation: 'provider_estimated_single_view_relative_depth_not_anatomical' as const,
    }),
  });
}

export function buildMesh6BZygomaticRawMorphology(
  frame: Mesh6AObservationFrameV1,
  adapter: Mesh6BWeightedRegionAdapterV2,
): Mesh6BZygomaticRawMorphologyV1 {
  assertIssuedMesh6ANeutralObservationFrame(frame);
  if (
    frame.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    frame.unit !== 'centimeter' ||
    frame.captureQuality.captureQualityPassFailIssued !== false ||
    frame.metricEligibility.weightedRegionAttachmentAllowedForResearchInspection !== true ||
    frame.metricEligibility.morphologyMetricEvaluationAllowed !== false ||
    frame.metricEligibility.productionMorphologyMetricAllowed !== false
  ) fail('requires the exact fail-closed MESH6A research-inspection boundary.');

  const kernel = computeMesh6BZygomaticResearchKernel(frame.metricLandmarks, adapter);
  return Object.freeze({
    schemaVersion: 'mesh6b-zygomatic-raw-morphology-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'research_raw_morphology_only' as const,
    source: Object.freeze({
      observationFrameSchema: frame.schemaVersion,
      regionAdapterSchema: adapter.schemaVersion,
      coordinateFrame: frame.coordinateFrame,
      unit: frame.unit,
    }),
    ...kernel,
    eligibility: Object.freeze({
      researchComputationAllowed: true as const,
      productRuntimeMorphologyAllowed: false as const,
      productionMetricAllowed: false as const,
      scoreOrClassificationIssued: false as const,
    }),
    limitations: Object.freeze([
      'capture_quality_not_calibrated',
      'weighted_region_adapter_is_authoring_candidate',
      'provider_estimated_single_view_relative_depth',
      'population_norm_not_defined',
      'production_threshold_not_defined',
    ] as const),
    authorityBoundary: Object.freeze({
      poseNormalizationReimplemented: false as const,
      anatomicalZygionClaimed: false as const,
      subjectSpecific3DReconstructionClaimed: false as const,
      beautyInterpretationIssued: false as const,
      traditionalPhysiognomyInterpretationIssued: false as const,
      compositeCheekboneScoreIssued: false as const,
      claimsIssued: 0 as const,
    }),
  });
}
