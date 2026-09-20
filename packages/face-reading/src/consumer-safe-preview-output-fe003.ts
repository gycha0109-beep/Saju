import {
  assertPreviewObservableEngineSnapshotFE001,
  type FE001PreviewObservableEngineSnapshot,
} from './preview-observable-engine-fe001.js';
import {
  assertPreviewFaceEngineRunFE002,
  type FE002PreviewEngineRun,
} from './preview-face-engine-runtime-fe002.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE003_CONTRACT_VERSION =
  'FE003-CONSUMER-SAFE-PREVIEW-OUTPUT-v1' as const;

export type FE003RegionKey =
  | 'eye_pair'
  | 'cheek_mid_face'
  | 'mouth_lips'
  | 'chin_lower_face';

export interface FE003NeutralMetric {
  readonly regionKey: FE003RegionKey;
  readonly metricRef: string;
  readonly value: number;
  readonly unit: 'ratio' | 'degree' | 'radian';
}

export interface FE003RegionAvailability {
  readonly regionKey: FE003RegionKey;
  readonly state: 'available' | 'partial';
  readonly unavailableSurfaces: readonly string[];
}

export interface FE003ConsumerSafePreviewOutput {
  readonly schemaVersion: 'fe003-consumer-safe-preview-output-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE003_CONTRACT_VERSION;
  readonly engineState: 'preview_consumer_projection_only';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly metrics: readonly FE003NeutralMetric[];
  readonly regions: readonly FE003RegionAvailability[];
  readonly dataBoundary: {
    readonly rawLandmarksExposed: false;
    readonly contourPointsExposed: false;
    readonly providerVertexIndicesExposed: false;
    readonly biometricEmbeddingExposed: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly classificationIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly physiognomyClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const REGION_ORDER = Object.freeze([
  'eye_pair',
  'cheek_mid_face',
  'mouth_lips',
  'chin_lower_face',
] as const);

const DATA_BOUNDARY = Object.freeze({
  rawLandmarksExposed: false as const,
  contourPointsExposed: false as const,
  providerVertexIndicesExposed: false as const,
  biometricEmbeddingExposed: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  classificationIssued: false as const,
  scoreIssued: false as const,
  rankIssued: false as const,
  traditionalInterpretationIssued: false as const,
  physiognomyClaimIssued: false as const,
  fortuneClaimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-003 ${message}`);
}

function metric(
  regionKey: FE003RegionKey,
  metricRef: string,
  value: number,
  unit: FE003NeutralMetric['unit'],
): FE003NeutralMetric {
  if (metricRef.trim().length === 0 || !Number.isFinite(value)) {
    fail('consumer metric requires a non-empty ref and finite value.');
  }
  return Object.freeze({ regionKey, metricRef, value, unit });
}

function collectMetrics(
  snapshot: FE001PreviewObservableEngineSnapshot,
): readonly FE003NeutralMetric[] {
  const metrics: FE003NeutralMetric[] = [];
  const eye = snapshot.regions.eyePair;

  const eyeAxes = [
    eye.neutralAxes.axes.relativeHorizontalSpan,
    eye.neutralAxes.axes.geometricVerticalToHorizontalRatio,
    eye.neutralAxes.axes.centroidSeparation,
    eye.neutralAxes.axes.closedCycleTurningAngle,
  ];
  for (const axis of eyeAxes) {
    metrics.push(metric('eye_pair', axis.sourceMetricRef, axis.value, axis.unit));
  }
  if (!('status' in eye.neutralAxes.axes.outerCornerTilt)) {
    const axis = eye.neutralAxes.axes.outerCornerTilt;
    metrics.push(metric('eye_pair', axis.sourceMetricRef, axis.value, axis.unit));
  }

  metrics.push(
    metric(
      'eye_pair',
      eye.asymmetry.axes.horizontalSpanRelativeDifference.metricRef,
      eye.asymmetry.axes.horizontalSpanRelativeDifference.value,
      eye.asymmetry.axes.horizontalSpanRelativeDifference.unit,
    ),
    metric(
      'eye_pair',
      eye.asymmetry.axes.geometricYToXRatioAbsoluteDifference.metricRef,
      eye.asymmetry.axes.geometricYToXRatioAbsoluteDifference.value,
      eye.asymmetry.axes.geometricYToXRatioAbsoluteDifference.unit,
    ),
    metric(
      'eye_pair',
      eye.asymmetry.axes.meanTurningAngleAbsoluteDifference.metricRef,
      eye.asymmetry.axes.meanTurningAngleAbsoluteDifference.value,
      eye.asymmetry.axes.meanTurningAngleAbsoluteDifference.unit,
    ),
  );

  const midface = snapshot.regions.cheekMidFace;
  if (midface.visibleWidth.status === 'available') {
    metrics.push(metric(
      'cheek_mid_face',
      midface.visibleWidth.metric.metricRef,
      midface.visibleWidth.metric.value,
      midface.visibleWidth.metric.unit,
    ));
  }
  if (midface.visibleContourProminence.status === 'available') {
    metrics.push(metric(
      'cheek_mid_face',
      midface.visibleContourProminence.metric.metricRef,
      midface.visibleContourProminence.metric.value,
      midface.visibleContourProminence.metric.unit,
    ));
  }

  const mouth = snapshot.regions.mouthLips;
  if (mouth.visibleCornerOrientation.status === 'available') {
    metrics.push(metric(
      'mouth_lips',
      mouth.visibleCornerOrientation.metric.metricRef,
      mouth.visibleCornerOrientation.metric.value,
      mouth.visibleCornerOrientation.metric.unit,
    ));
  }
  metrics.push(metric(
    'mouth_lips',
    mouth.visibleOutlineAngularity.metric.metricRef,
    mouth.visibleOutlineAngularity.metric.value,
    mouth.visibleOutlineAngularity.metric.unit,
  ));

  const lower = snapshot.regions.chinLowerFace;
  if (lower.visibleWidth.status === 'available') {
    metrics.push(metric(
      'chin_lower_face',
      lower.visibleWidth.metric.metricRef,
      lower.visibleWidth.metric.value,
      lower.visibleWidth.metric.unit,
    ));
  }

  metrics.sort((left, right) => {
    const regionDelta = REGION_ORDER.indexOf(left.regionKey) - REGION_ORDER.indexOf(right.regionKey);
    return regionDelta !== 0 ? regionDelta : left.metricRef.localeCompare(right.metricRef);
  });
  return Object.freeze(metrics);
}

function collectRegionAvailability(
  snapshot: FE001PreviewObservableEngineSnapshot,
): readonly FE003RegionAvailability[] {
  return Object.freeze(REGION_ORDER.map((regionKey) => {
    const prefix = `${regionKey}.`;
    const unavailableSurfaces = Object.freeze(
      snapshot.availability.unavailableRefs
        .filter((ref) => ref.startsWith(prefix))
        .slice()
        .sort(),
    );
    return Object.freeze({
      regionKey,
      state: unavailableSurfaces.length === 0 ? 'available' as const : 'partial' as const,
      unavailableSurfaces,
    });
  }));
}

export function projectConsumerSafePreviewOutputFE003(
  run: FE002PreviewEngineRun,
): FE003ConsumerSafePreviewOutput {
  assertPreviewFaceEngineRunFE002(run);
  assertPreviewObservableEngineSnapshotFE001(run.snapshot);

  const result: FE003ConsumerSafePreviewOutput = Object.freeze({
    schemaVersion: 'fe003-consumer-safe-preview-output-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE003_CONTRACT_VERSION,
    engineState: 'preview_consumer_projection_only' as const,
    providerRunRef: run.providerRunRef,
    canonicalAssetDigest: run.canonicalAssetDigest,
    metrics: collectMetrics(run.snapshot),
    regions: collectRegionAvailability(run.snapshot),
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertConsumerSafePreviewOutputFE003(result);
  return result;
}

export function assertConsumerSafePreviewOutputFE003(
  output: FE003ConsumerSafePreviewOutput,
): void {
  if (
    output.schemaVersion !== 'fe003-consumer-safe-preview-output-v1' ||
    output.artifactVersion !== '0.1.0' ||
    output.contractVersion !== FE003_CONTRACT_VERSION ||
    output.engineState !== 'preview_consumer_projection_only' ||
    output.providerRunRef.trim().length === 0 ||
    !/^sha256:[0-9a-f]{64}$/u.test(output.canonicalAssetDigest)
  ) {
    fail('consumer output identity drift.');
  }

  const metricRefs = output.metrics.map((entry) => entry.metricRef);
  if (new Set(metricRefs).size !== metricRefs.length) {
    fail('consumer output contains duplicate metric refs.');
  }
  for (const entry of output.metrics) {
    if (
      !REGION_ORDER.includes(entry.regionKey) ||
      entry.metricRef.trim().length === 0 ||
      !Number.isFinite(entry.value) ||
      !['ratio', 'degree', 'radian'].includes(entry.unit)
    ) {
      fail('consumer output contains an invalid neutral metric.');
    }
  }

  if (
    output.regions.length !== REGION_ORDER.length ||
    output.regions.some((entry, index) => entry.regionKey !== REGION_ORDER[index]) ||
    output.regions.some((entry) => new Set(entry.unavailableSurfaces).size !== entry.unavailableSurfaces.length) ||
    output.regions.some((entry) =>
      entry.state !== (entry.unavailableSurfaces.length === 0 ? 'available' : 'partial'))
  ) {
    fail('consumer region availability drift.');
  }

  if (Object.values(output.dataBoundary).some((value) => value !== false)) {
    fail('consumer data boundary widened.');
  }

  if (
    output.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(output.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('consumer authority widened beyond neutral preview projection.');
  }
}
