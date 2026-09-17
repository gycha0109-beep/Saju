import type { Mesh6APoint3D } from './mesh6a-neutral-observation-frame.js';
import {
  computeMesh6BZygomaticResearchKernel,
  type Mesh6BWeightedRegionAdapterV2,
  type Mesh6BZygomaticKernelV1,
} from './mesh6b-zygomatic-raw-morphology.js';
import { FaceAuthorityValidationError } from './validation.js';

const METRIC_KEYS = Object.freeze([
  'zygomaticSpanRatio',
  'zygomaticTemporalFlareRatio',
  'zygomaticCheekLateralReliefRatio',
  'bilateralZygomaticAsymmetryRatio',
  'zygomaticRelativeDepthRatio',
] as const);
const ZYGOMATIC_REGION_IDS = new Set(['zygomatic_negative_x', 'zygomatic_positive_x']);

type MetricKey = (typeof METRIC_KEYS)[number];
export type Mesh6CPerturbationScope = 'all_vertices_xyz' | 'zygomatic_vertices_xyz';

export interface Mesh6CRobustStatisticV1 {
  readonly median: number;
  readonly mad: number;
  readonly p10: number;
  readonly p90: number;
  readonly robustSpanP10P90: number;
  readonly min: number;
  readonly max: number;
}

export interface Mesh6CRepeatabilitySummaryV1 {
  readonly schemaVersion: 'mesh6c-repeatability-summary-v1';
  readonly authorityState: 'threshold_free_repeatability_evidence_only';
  readonly sampleCount: number;
  readonly observables: Readonly<Record<MetricKey, Mesh6CRobustStatisticV1>>;
  readonly authorityBoundary: {
    readonly acceptableDriftThresholdDefined: false;
    readonly captureQualityPassFailIssued: false;
    readonly confidenceScoreIssued: false;
    readonly populationNormDefined: false;
    readonly productionMorphologyAuthorized: false;
    readonly claimsIssued: 0;
  };
}

export interface Mesh6CPerturbationStudyConfigV1 {
  readonly seed: number;
  readonly replicates: number;
  readonly amplitudeRatiosOfBaselineRms: readonly number[];
  readonly scope: Mesh6CPerturbationScope;
}

export interface Mesh6CPerturbationLevelV1 {
  readonly amplitudeRatioOfBaselineRms: number;
  readonly absoluteSyntheticAmplitudeCm: number;
  readonly summary: Mesh6CRepeatabilitySummaryV1;
  readonly medianDeltaFromBaseline: Readonly<Record<MetricKey, number>>;
  readonly maxAbsoluteDeltaFromBaseline: Readonly<Record<MetricKey, number>>;
}

export interface Mesh6CPerturbationStudyV1 {
  readonly schemaVersion: 'mesh6c-zygomatic-perturbation-study-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'research_sensitivity_evidence_only';
  readonly baseline: Mesh6BZygomaticKernelV1;
  readonly config: Mesh6CPerturbationStudyConfigV1;
  readonly perturbedVertexCount: number;
  readonly levels: readonly Mesh6CPerturbationLevelV1[];
  readonly authorityBoundary: {
    readonly perturbationAmplitudesAreProductionThresholds: false;
    readonly acceptableJitterThresholdDefined: false;
    readonly captureQualityPassFailIssued: false;
    readonly confidenceScoreIssued: false;
    readonly productionMorphologyAuthorized: false;
    readonly anatomicalMeasurementClaimed: false;
    readonly beautyInterpretationIssued: false;
    readonly traditionalPhysiognomyInterpretationIssued: false;
    readonly claimsIssued: 0;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`MESH6C ${message}`);
}

function sorted(values: readonly number[]): number[] {
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    fail('statistics require non-empty finite values.');
  }
  return [...values].sort((a, b) => a - b);
}

function quantile(values: readonly number[], q: number): number {
  if (!(q >= 0 && q <= 1)) fail('quantile must be within [0, 1].');
  const ordered = sorted(values);
  if (ordered.length === 1) return ordered[0]!;
  const position = (ordered.length - 1) * q;
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);
  const lower = ordered[lowerIndex]!;
  const upper = ordered[upperIndex]!;
  if (lowerIndex === upperIndex) return lower;
  const fraction = position - lowerIndex;
  return lower + (upper - lower) * fraction;
}

function statistic(values: readonly number[]): Mesh6CRobustStatisticV1 {
  const ordered = sorted(values);
  const median = quantile(ordered, 0.5);
  const absoluteDeviations = ordered.map((value) => Math.abs(value - median));
  const p10 = quantile(ordered, 0.1);
  const p90 = quantile(ordered, 0.9);
  return Object.freeze({
    median,
    mad: quantile(absoluteDeviations, 0.5),
    p10,
    p90,
    robustSpanP10P90: p90 - p10,
    min: ordered[0]!,
    max: ordered[ordered.length - 1]!,
  });
}

function metricValue(kernel: Mesh6BZygomaticKernelV1, key: MetricKey): number {
  switch (key) {
    case 'zygomaticSpanRatio':
    case 'zygomaticTemporalFlareRatio':
    case 'zygomaticCheekLateralReliefRatio':
    case 'bilateralZygomaticAsymmetryRatio':
      return kernel.lateral[key];
    case 'zygomaticRelativeDepthRatio':
      return kernel.depth2p5D.zygomaticRelativeDepthRatio;
  }
}

export function summarizeMesh6CZygomaticRepeatability(
  samples: readonly Mesh6BZygomaticKernelV1[],
): Mesh6CRepeatabilitySummaryV1 {
  if (samples.length === 0) fail('repeatability summary requires at least one sample.');
  const observables = Object.fromEntries(
    METRIC_KEYS.map((key) => [key, statistic(samples.map((sample) => metricValue(sample, key)))]),
  ) as Record<MetricKey, Mesh6CRobustStatisticV1>;
  return Object.freeze({
    schemaVersion: 'mesh6c-repeatability-summary-v1' as const,
    authorityState: 'threshold_free_repeatability_evidence_only' as const,
    sampleCount: samples.length,
    observables: Object.freeze(observables),
    authorityBoundary: Object.freeze({
      acceptableDriftThresholdDefined: false as const,
      captureQualityPassFailIssued: false as const,
      confidenceScoreIssued: false as const,
      populationNormDefined: false as const,
      productionMorphologyAuthorized: false as const,
      claimsIssued: 0 as const,
    }),
  });
}

function mix32(input: number): number {
  let value = input >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15;
  value = Math.imul(value, 0x846ca68b);
  value ^= value >>> 16;
  return value >>> 0;
}

function unitNoise(seed: number, replicate: number, vertexIndex: number, axisIndex: number): number {
  const mixed = mix32(
    (seed >>> 0)
      ^ Math.imul((replicate + 1) >>> 0, 0x9e3779b1)
      ^ Math.imul((vertexIndex + 1) >>> 0, 0x85ebca6b)
      ^ Math.imul((axisIndex + 1) >>> 0, 0xc2b2ae35),
  );
  return (mixed / 0xffffffff) * 2 - 1;
}

function selectedVertexIndices(
  adapter: Mesh6BWeightedRegionAdapterV2,
  scope: Mesh6CPerturbationScope,
): ReadonlySet<number> {
  if (scope === 'all_vertices_xyz') return new Set(Array.from({ length: 468 }, (_, index) => index));
  if (scope !== 'zygomatic_vertices_xyz') fail(`unsupported perturbation scope: ${String(scope)}`);
  const selected = new Set<number>();
  for (const region of adapter.regions) {
    if (!ZYGOMATIC_REGION_IDS.has(region.adapterRegionId)) continue;
    for (const vertex of region.weightedVertices) selected.add(vertex.mediapipeIndex);
  }
  if (selected.size === 0) fail('zygomatic perturbation scope resolved to zero vertices.');
  return selected;
}

function perturbPoints(
  points: readonly Mesh6APoint3D[],
  selected: ReadonlySet<number>,
  amplitudeCm: number,
  seed: number,
  replicate: number,
): Mesh6APoint3D[] {
  return points.map((point, vertexIndex) => {
    if (!selected.has(vertexIndex) || amplitudeCm === 0) return { ...point };
    return {
      x: point.x + unitNoise(seed, replicate, vertexIndex, 0) * amplitudeCm,
      y: point.y + unitNoise(seed, replicate, vertexIndex, 1) * amplitudeCm,
      z: point.z + unitNoise(seed, replicate, vertexIndex, 2) * amplitudeCm,
    };
  });
}

function validateStudyConfig(config: Mesh6CPerturbationStudyConfigV1): void {
  if (!Number.isInteger(config.seed)) fail('perturbation seed must be an integer.');
  if (!Number.isInteger(config.replicates) || config.replicates < 1 || config.replicates > 512) {
    fail('perturbation replicates must be an integer within [1, 512].');
  }
  if (config.amplitudeRatiosOfBaselineRms.length === 0) fail('at least one perturbation amplitude is required.');
  for (const amplitude of config.amplitudeRatiosOfBaselineRms) {
    if (!Number.isFinite(amplitude) || amplitude < 0) fail('perturbation amplitudes must be finite and non-negative.');
  }
  if (new Set(config.amplitudeRatiosOfBaselineRms).size !== config.amplitudeRatiosOfBaselineRms.length) {
    fail('perturbation amplitudes must be unique.');
  }
}

export function runMesh6CZygomaticPerturbationStudy(
  points: readonly Mesh6APoint3D[],
  adapter: Mesh6BWeightedRegionAdapterV2,
  config: Mesh6CPerturbationStudyConfigV1,
): Mesh6CPerturbationStudyV1 {
  validateStudyConfig(config);
  const baseline = computeMesh6BZygomaticResearchKernel(points, adapter);
  const selected = selectedVertexIndices(adapter, config.scope);
  const levels = [...config.amplitudeRatiosOfBaselineRms]
    .sort((a, b) => a - b)
    .map((amplitudeRatio) => {
      const amplitudeCm = baseline.scaleRmsCm * amplitudeRatio;
      const kernels = Array.from({ length: config.replicates }, (_, replicate) =>
        computeMesh6BZygomaticResearchKernel(
          perturbPoints(points, selected, amplitudeCm, config.seed, replicate),
          adapter,
        ),
      );
      const summary = summarizeMesh6CZygomaticRepeatability(kernels);
      const medianDeltaFromBaseline = Object.fromEntries(
        METRIC_KEYS.map((key) => [key, summary.observables[key].median - metricValue(baseline, key)]),
      ) as Record<MetricKey, number>;
      const maxAbsoluteDeltaFromBaseline = Object.fromEntries(
        METRIC_KEYS.map((key) => [
          key,
          Math.max(...kernels.map((kernel) => Math.abs(metricValue(kernel, key) - metricValue(baseline, key)))),
        ]),
      ) as Record<MetricKey, number>;
      return Object.freeze({
        amplitudeRatioOfBaselineRms: amplitudeRatio,
        absoluteSyntheticAmplitudeCm: amplitudeCm,
        summary,
        medianDeltaFromBaseline: Object.freeze(medianDeltaFromBaseline),
        maxAbsoluteDeltaFromBaseline: Object.freeze(maxAbsoluteDeltaFromBaseline),
      });
    });

  return Object.freeze({
    schemaVersion: 'mesh6c-zygomatic-perturbation-study-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'research_sensitivity_evidence_only' as const,
    baseline,
    config: Object.freeze({
      seed: config.seed,
      replicates: config.replicates,
      amplitudeRatiosOfBaselineRms: Object.freeze([...config.amplitudeRatiosOfBaselineRms]),
      scope: config.scope,
    }),
    perturbedVertexCount: selected.size,
    levels: Object.freeze(levels),
    authorityBoundary: Object.freeze({
      perturbationAmplitudesAreProductionThresholds: false as const,
      acceptableJitterThresholdDefined: false as const,
      captureQualityPassFailIssued: false as const,
      confidenceScoreIssued: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
      beautyInterpretationIssued: false as const,
      traditionalPhysiognomyInterpretationIssued: false as const,
      claimsIssued: 0 as const,
    }),
  });
}
