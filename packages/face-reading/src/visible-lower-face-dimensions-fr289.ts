import {
  assertCanonicalVisibleLowerFaceContourFR216,
  computeCanonicalVisibleLowerFaceContourFR216,
  type FR216VisibleLowerFaceContourResult,
  type FR216XYPoint,
} from './canonical-visible-lower-face-contour-fr216.js';
import {
  assertVisibleLowerFaceWidthFR213,
  computeVisibleLowerFaceWidthFR213,
  type FR213VisibleLowerFaceWidthResult,
} from './visible-lower-face-width-fr213.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR289_VISIBLE_LOWER_FACE_DIMENSIONS_CONTRACT_VERSION =
  'FR289-VISIBLE-LOWER-FACE-DIMENSIONS-v1' as const;

export const FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF =
  'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0' as const;
export const FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF =
  'neutral.lower_face.visible_height_to_width_ratio@0.1.0' as const;
export const FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF =
  'neutral.lower_face.inferior_center_deviation_to_width_ratio@0.1.0' as const;

const EPSILON = 1e-12;

export type FR289VisibleLowerFaceDimensionsUnavailableReason =
  | 'source_visible_lower_face_width_unavailable'
  | 'source_visible_lower_face_contour_unavailable'
  | 'visible_lower_face_horizontal_span_collapsed'
  | 'visible_lower_face_vertical_span_collapsed';

export interface FR289ContinuousAxis {
  readonly metricRef:
    | typeof FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF
    | typeof FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF
    | typeof FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly anatomicalInterpretationAllowed: false;
}

export type FR289DimensionDerivation =
  | Readonly<{
      status: 'available';
      axes: readonly [
        FR289ContinuousAxis,
        FR289ContinuousAxis,
        FR289ContinuousAxis,
      ];
      visibleContourPointCount: number;
      inferiorVisiblePointCount: number;
    }>
  | Readonly<{
      status: 'unavailable';
      reason:
        | 'visible_lower_face_horizontal_span_collapsed'
        | 'visible_lower_face_vertical_span_collapsed';
      fallbackInvented: false;
    }>;

export interface FR289SourceReceipt {
  readonly fr213SchemaVersion: 'fr213-visible-lower-face-width-v1';
  readonly fr216SchemaVersion: 'fr216-visible-lower-face-contour-v1';
  readonly fr77ProviderRunRef: string;
  readonly fr77CanonicalAssetDigest: string;
  readonly sameProviderRunVerified: true;
  readonly sameCanonicalAssetDigestVerified: true;
  readonly providerIndicesExposedInOutput: false;
  readonly rawLandmarksExposedInOutput: false;
}

export interface FR289AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly anatomicalChinBoundaryIssued: false;
  readonly mentonOrGnathionClaimIssued: false;
  readonly gonionClaimIssued: false;
  readonly mandibularBoneBoundaryIssued: false;
  readonly anatomicalLateralityInterpretationIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR289VisibleLowerFaceDimensionsResult =
  | Readonly<{
      schemaVersion: 'fr289-visible-lower-face-dimensions-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR289_VISIBLE_LOWER_FACE_DIMENSIONS_CONTRACT_VERSION;
      authorityState:
        'canonical_visible_soft_tissue_lower_face_continuous_axes_only';
      status: 'available';
      axes: readonly [
        FR289ContinuousAxis,
        FR289ContinuousAxis,
        FR289ContinuousAxis,
      ];
      visibleContourPointCount: number;
      inferiorVisiblePointCount: number;
      source: FR289SourceReceipt;
      authorityBoundary: FR289AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion: 'fr289-visible-lower-face-dimensions-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR289_VISIBLE_LOWER_FACE_DIMENSIONS_CONTRACT_VERSION;
      authorityState:
        'canonical_visible_soft_tissue_lower_face_continuous_axes_only';
      status: 'unavailable';
      reason: FR289VisibleLowerFaceDimensionsUnavailableReason;
      sourceReason?: string;
      fallbackInvented: false;
      source: FR289SourceReceipt;
      authorityBoundary: FR289AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR289AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  anatomicalChinBoundaryIssued: false as const,
  mentonOrGnathionClaimIssued: false as const,
  gonionClaimIssued: false as const,
  mandibularBoneBoundaryIssued: false as const,
  anatomicalLateralityInterpretationIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-289 ${message}`);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(`${label} must be finite.`);
  return value;
}

function axis(
  metricRef: FR289ContinuousAxis['metricRef'],
  value: number,
): FR289ContinuousAxis {
  return Object.freeze({
    metricRef,
    value: finite(value, metricRef),
    unit: 'ratio' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  });
}

function assertPoints(points: readonly FR216XYPoint[]): void {
  if (points.length < 3) {
    fail('visible lower-face contour requires at least three points.');
  }
  points.forEach((point, index) => {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      fail(`visible lower-face contour point ${index} must contain finite x/y.`);
    }
  });
}

export function deriveVisibleLowerFaceDimensionAxesFR289(input: {
  readonly points: readonly FR216XYPoint[];
  readonly visibleWidthToFaceWidthRatio: number;
}): FR289DimensionDerivation {
  assertPoints(input.points);
  const widthToFace = finite(
    input.visibleWidthToFaceWidthRatio,
    'visibleWidthToFaceWidthRatio',
  );
  if (!(widthToFace > 0 && widthToFace <= 1)) {
    fail('visibleWidthToFaceWidthRatio must be in (0,1].');
  }

  const xs = input.points.map((point) => point.x);
  const ys = input.points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX;
  const height = maxY - minY;

  if (!(width > EPSILON)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'visible_lower_face_horizontal_span_collapsed' as const,
      fallbackInvented: false as const,
    });
  }
  if (!(height > EPSILON)) {
    return Object.freeze({
      status: 'unavailable' as const,
      reason: 'visible_lower_face_vertical_span_collapsed' as const,
      fallbackInvented: false as const,
    });
  }

  // FR216 uses canonical right-handed metric XY (Y grows upward), so the
  // smallest Y coordinate is the most inferior visible contour level.
  const inferiorPoints = input.points.filter(
    (point) => Math.abs(point.y - minY) <= EPSILON,
  );
  if (inferiorPoints.length === 0) {
    fail('inferior visible contour set must not be empty.');
  }

  const inferiorCenterX =
    inferiorPoints.reduce((sum, point) => sum + point.x, 0) /
    inferiorPoints.length;
  const envelopeCenterX = (minX + maxX) / 2;
  const heightToWidth = height / width;
  const centerDeviation =
    Math.abs(inferiorCenterX - envelopeCenterX) / width;

  const axes = Object.freeze([
    axis(FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF, widthToFace),
    axis(FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF, heightToWidth),
    axis(FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF, centerDeviation),
  ] as const);

  return Object.freeze({
    status: 'available' as const,
    axes,
    visibleContourPointCount: input.points.length,
    inferiorVisiblePointCount: inferiorPoints.length,
  });
}

function sourceReceipt(
  width: FR213VisibleLowerFaceWidthResult,
  contour: FR216VisibleLowerFaceContourResult,
): FR289SourceReceipt {
  if (
    width.source.fr77ProviderRunRef !== contour.source.fr77ProviderRunRef ||
    width.source.fr77CanonicalAssetDigest !==
      contour.source.fr77CanonicalAssetDigest
  ) {
    fail('FR213 and FR216 must share provider run and canonical asset.');
  }

  return Object.freeze({
    fr213SchemaVersion: width.schemaVersion,
    fr216SchemaVersion: contour.schemaVersion,
    fr77ProviderRunRef: width.source.fr77ProviderRunRef,
    fr77CanonicalAssetDigest: width.source.fr77CanonicalAssetDigest,
    sameProviderRunVerified: true as const,
    sameCanonicalAssetDigestVerified: true as const,
    providerIndicesExposedInOutput: false as const,
    rawLandmarksExposedInOutput: false as const,
  });
}

function unavailable(
  reason: FR289VisibleLowerFaceDimensionsUnavailableReason,
  source: FR289SourceReceipt,
  sourceReason?: string,
): FR289VisibleLowerFaceDimensionsResult {
  const base = {
    schemaVersion: 'fr289-visible-lower-face-dimensions-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR289_VISIBLE_LOWER_FACE_DIMENSIONS_CONTRACT_VERSION,
    authorityState:
      'canonical_visible_soft_tissue_lower_face_continuous_axes_only' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  };
  return sourceReason === undefined
    ? Object.freeze(base)
    : Object.freeze({ ...base, sourceReason });
}

export function materializeVisibleLowerFaceDimensionsFR289(
  width: FR213VisibleLowerFaceWidthResult,
  contour: FR216VisibleLowerFaceContourResult,
): FR289VisibleLowerFaceDimensionsResult {
  assertVisibleLowerFaceWidthFR213(width);
  assertCanonicalVisibleLowerFaceContourFR216(contour);
  const source = sourceReceipt(width, contour);

  if (width.status === 'unavailable') {
    return unavailable(
      'source_visible_lower_face_width_unavailable',
      source,
      width.reason,
    );
  }
  if (contour.status === 'unavailable') {
    return unavailable(
      'source_visible_lower_face_contour_unavailable',
      source,
      contour.reason,
    );
  }
  if (
    width.metric.metricRef !== FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF ||
    width.metric.unit !== 'ratio'
  ) {
    fail('FR213 width metric boundary drift.');
  }

  const derivation = deriveVisibleLowerFaceDimensionAxesFR289({
    points: contour.points,
    visibleWidthToFaceWidthRatio: width.metric.value,
  });

  if (derivation.status === 'unavailable') {
    return unavailable(derivation.reason, source);
  }

  const result: FR289VisibleLowerFaceDimensionsResult = Object.freeze({
    schemaVersion: 'fr289-visible-lower-face-dimensions-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR289_VISIBLE_LOWER_FACE_DIMENSIONS_CONTRACT_VERSION,
    authorityState:
      'canonical_visible_soft_tissue_lower_face_continuous_axes_only' as const,
    status: 'available' as const,
    axes: derivation.axes,
    visibleContourPointCount: derivation.visibleContourPointCount,
    inferiorVisiblePointCount: derivation.inferiorVisiblePointCount,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertVisibleLowerFaceDimensionsFR289(result);
  return result;
}

export function computeVisibleLowerFaceDimensionsFR289(
  fullFace: GovernedMetricGeometryCandidateFR77V1,
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR289VisibleLowerFaceDimensionsResult {
  const width = computeVisibleLowerFaceWidthFR213(fullFace, lips);
  const contour = computeCanonicalVisibleLowerFaceContourFR216(
    fullFace,
    lips,
  );
  return materializeVisibleLowerFaceDimensionsFR289(width, contour);
}

export function assertVisibleLowerFaceDimensionsFR289(
  result: FR289VisibleLowerFaceDimensionsResult,
): void {
  if (
    result.schemaVersion !==
      'fr289-visible-lower-face-dimensions-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR289_VISIBLE_LOWER_FACE_DIMENSIONS_CONTRACT_VERSION ||
    result.authorityState !==
      'canonical_visible_soft_tissue_lower_face_continuous_axes_only' ||
    result.source.fr213SchemaVersion !==
      'fr213-visible-lower-face-width-v1' ||
    result.source.fr216SchemaVersion !==
      'fr216-visible-lower-face-contour-v1' ||
    result.source.sameProviderRunVerified !== true ||
    result.source.sameCanonicalAssetDigestVerified !== true ||
    result.source.providerIndicesExposedInOutput !== false ||
    result.source.rawLandmarksExposedInOutput !== false
  ) {
    fail('result identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible lower-face morphology.');
  }

  if (result.status === 'available') {
    if (
      result.axes.length !== 3 ||
      result.axes[0]?.metricRef !==
        FR289_LOWER_FACE_WIDTH_RATIO_METRIC_REF ||
      result.axes[1]?.metricRef !==
        FR289_LOWER_FACE_HEIGHT_WIDTH_METRIC_REF ||
      result.axes[2]?.metricRef !==
        FR289_LOWER_FACE_CENTER_DEVIATION_METRIC_REF ||
      result.visibleContourPointCount < 3 ||
      result.inferiorVisiblePointCount < 1
    ) {
      fail('available axis identity/cardinality drift.');
    }
    for (const candidate of result.axes) {
      if (
        candidate.unit !== 'ratio' ||
        !Number.isFinite(candidate.value) ||
        candidate.classificationApplied !== false ||
        candidate.thresholdApplied !== false ||
        candidate.calibrationApplied !== false ||
        candidate.traditionalBindingApplied !== false ||
        candidate.anatomicalInterpretationAllowed !== false
      ) {
        fail(`axis authority drift: ${candidate.metricRef}.`);
      }
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable result invented a fallback.');
  }
}
