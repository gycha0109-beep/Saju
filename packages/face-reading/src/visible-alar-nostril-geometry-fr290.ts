import type {
  NeutralFaceGeometryProvenance,
  NeutralFacePoint2D,
  NoseTipContourGeometryInput,
} from './nose-geometry.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR290_VISIBLE_ALAR_NOSTRIL_CONTRACT_VERSION =
  'FR290-VISIBLE-ALAR-NOSTRIL-GEOMETRY-v1' as const;

export const FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF =
  'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0' as const;
export const FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF =
  'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0' as const;
export const FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF =
  'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR290VisibleAlarNostrilGeometryInput {
  readonly schemaVersion:
    'fr290-visible-alar-nostril-geometry-input-v1';
  readonly authorityState:
    'governed_visible_nasal_boundary_observation_only';
  readonly provenance: NeutralFaceGeometryProvenance;
  readonly visibleAlarBoundaryPair: readonly [
    NeutralFacePoint2D,
    NeutralFacePoint2D,
  ];
  readonly unorderedVisibleNostrilContours: readonly [
    readonly NeutralFacePoint2D[],
    readonly NeutralFacePoint2D[],
  ];
  readonly sameCaptureAsFR287NoseVerified: true;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalLateralityAssigned: false;
  readonly traditionalBindingApplied: false;
}

export interface FR290NeutralNasalAxis {
  readonly metricRef:
    | typeof FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF
    | typeof FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF
    | typeof FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly anatomicalInterpretationAllowed: false;
  readonly anatomicalLateralityAssigned: false;
}

export type FR290VisibleAlarNostrilUnavailableReason =
  | 'visible_alar_horizontal_span_collapsed'
  | 'tip_contour_horizontal_span_collapsed'
  | 'nostril_contour_horizontal_span_collapsed'
  | 'nostril_contour_vertical_span_collapsed'
  | 'nostril_contour_area_collapsed';

export type FR290VisibleAlarNostrilGeometryResult =
  | Readonly<{
      schemaVersion:
        'fr290-visible-alar-nostril-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR290_VISIBLE_ALAR_NOSTRIL_CONTRACT_VERSION;
      authorityState:
        'visible_nasal_boundary_continuous_geometry_only';
      status: 'available';
      axes: readonly [
        FR290NeutralNasalAxis,
        FR290NeutralNasalAxis,
        FR290NeutralNasalAxis,
      ];
      nostrilContourPointCounts: readonly [number, number];
      source: FR290SourceReceipt;
      authorityBoundary: FR290AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr290-visible-alar-nostril-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR290_VISIBLE_ALAR_NOSTRIL_CONTRACT_VERSION;
      authorityState:
        'visible_nasal_boundary_continuous_geometry_only';
      status: 'unavailable';
      reason: FR290VisibleAlarNostrilUnavailableReason;
      fallbackInvented: false;
      source: FR290SourceReceipt;
      authorityBoundary: FR290AuthorityBoundary;
    }>;

export interface FR290SourceReceipt {
  readonly observationContractVersion: string;
  readonly extractorVersion: string;
  readonly modelVersion: string;
  readonly sameCaptureAsFR287NoseVerified: true;
  readonly sameObservationContractVerified: true;
  readonly sameExtractorVersionVerified: true;
  readonly sameModelVersionVerified: true;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly sourceLandmarkRefsExposed: false;
  readonly nostrilContourOrderSemantic: false;
}

export interface FR290AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly hiddenNostrilBoundaryInferred: false;
  readonly anatomicalLateralityIssued: false;
  readonly skeletalNasalWidthClaimIssued: false;
  readonly physicalAnthropometryIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

const AUTHORITY_BOUNDARY: FR290AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  hiddenNostrilBoundaryInferred: false as const,
  anatomicalLateralityIssued: false as const,
  skeletalNasalWidthClaimIssued: false as const,
  physicalAnthropometryIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-290 ${message}`);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(`${label} must be finite.`);
  return value;
}

function assertPoint(point: NeutralFacePoint2D, label: string): void {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    fail(`${label} must contain finite x/y coordinates.`);
  }
}

function pointKey(point: NeutralFacePoint2D): string {
  return `${point.x}:${point.y}`;
}

function horizontalSpan(points: readonly NeutralFacePoint2D[]): number {
  const xs = points.map((point) => point.x);
  return Math.max(...xs) - Math.min(...xs);
}

function verticalSpan(points: readonly NeutralFacePoint2D[]): number {
  const ys = points.map((point) => point.y);
  return Math.max(...ys) - Math.min(...ys);
}

function polygonArea(points: readonly NeutralFacePoint2D[]): number {
  let twiceArea = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    twiceArea += current.x * next.y - next.x * current.y;
  }
  return Math.abs(twiceArea) / 2;
}

function orientation(
  a: NeutralFacePoint2D,
  b: NeutralFacePoint2D,
  c: NeutralFacePoint2D,
): number {
  return (b.y - a.y) * (c.x - b.x) -
    (b.x - a.x) * (c.y - b.y);
}

function segmentsIntersect(
  a: NeutralFacePoint2D,
  b: NeutralFacePoint2D,
  c: NeutralFacePoint2D,
  d: NeutralFacePoint2D,
): boolean {
  const o1 = orientation(a, b, c);
  const o2 = orientation(a, b, d);
  const o3 = orientation(c, d, a);
  const o4 = orientation(c, d, b);
  return o1 * o2 < 0 && o3 * o4 < 0;
}

function assertSimpleContour(
  points: readonly NeutralFacePoint2D[],
  label: string,
): void {
  if (points.length < 4) {
    fail(`${label} requires at least four ordered visible points.`);
  }
  points.forEach((point, index) =>
    assertPoint(point, `${label}[${index}]`));

  if (new Set(points.map(pointKey)).size !== points.length) {
    fail(`${label} must not repeat vertices or duplicate closure.`);
  }

  for (let first = 0; first < points.length; first += 1) {
    const firstNext = (first + 1) % points.length;
    for (
      let second = first + 1;
      second < points.length;
      second += 1
    ) {
      const secondNext = (second + 1) % points.length;
      const adjacent =
        firstNext === second || secondNext === first;
      if (adjacent) continue;
      if (
        segmentsIntersect(
          points[first]!,
          points[firstNext]!,
          points[second]!,
          points[secondNext]!,
        )
      ) {
        fail(`${label} must be a simple non-self-intersecting contour.`);
      }
    }
  }
}

function assertProvenance(
  value: NeutralFaceGeometryProvenance,
  label: string,
): void {
  if (
    !value.observationContractVersion.trim() ||
    !value.extractorVersion.trim() ||
    !value.modelVersion.trim() ||
    value.coordinateFrame !== 'pose_normalized_face_2d' ||
    value.poseCompensated !== true ||
    value.sourceLandmarkRefs.length === 0 ||
    value.sourceLandmarkRefs.some((ref) => !ref.trim())
  ) {
    fail(`${label} provenance boundary drift.`);
  }
}

function sourceReceipt(
  input: FR290VisibleAlarNostrilGeometryInput,
  tip: NoseTipContourGeometryInput,
): FR290SourceReceipt {
  const source = input.provenance;
  const tipSource = tip.provenance;
  if (
    source.observationContractVersion !==
      tipSource.observationContractVersion ||
    source.extractorVersion !== tipSource.extractorVersion ||
    source.modelVersion !== tipSource.modelVersion
  ) {
    fail('alar/nostril and FR287 tip geometry must share observation, extractor, and model versions.');
  }

  return Object.freeze({
    observationContractVersion: source.observationContractVersion,
    extractorVersion: source.extractorVersion,
    modelVersion: source.modelVersion,
    sameCaptureAsFR287NoseVerified: true as const,
    sameObservationContractVerified: true as const,
    sameExtractorVersionVerified: true as const,
    sameModelVersionVerified: true as const,
    providerSpecificIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    sourceLandmarkRefsExposed: false as const,
    nostrilContourOrderSemantic: false as const,
  });
}

function axis(
  metricRef: FR290NeutralNasalAxis['metricRef'],
  value: number,
): FR290NeutralNasalAxis {
  return Object.freeze({
    metricRef,
    value: finite(value, metricRef),
    unit: 'ratio' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
    anatomicalLateralityAssigned: false as const,
  });
}

function unavailable(
  reason: FR290VisibleAlarNostrilUnavailableReason,
  source: FR290SourceReceipt,
): FR290VisibleAlarNostrilGeometryResult {
  return Object.freeze({
    schemaVersion:
      'fr290-visible-alar-nostril-geometry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR290_VISIBLE_ALAR_NOSTRIL_CONTRACT_VERSION,
    authorityState:
      'visible_nasal_boundary_continuous_geometry_only' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

export function computeVisibleAlarNostrilGeometryFR290(
  input: FR290VisibleAlarNostrilGeometryInput,
  tip: NoseTipContourGeometryInput,
): FR290VisibleAlarNostrilGeometryResult {
  if (
    input.schemaVersion !==
      'fr290-visible-alar-nostril-geometry-input-v1' ||
    input.authorityState !==
      'governed_visible_nasal_boundary_observation_only' ||
    input.sameCaptureAsFR287NoseVerified !== true ||
    input.providerSpecificIndicesExposed !== false ||
    input.rawLandmarksExposed !== false ||
    input.anatomicalLateralityAssigned !== false ||
    input.traditionalBindingApplied !== false
  ) {
    fail('input authority boundary drift.');
  }

  assertProvenance(input.provenance, 'alar/nostril');
  assertProvenance(tip.provenance, 'tip');

  const source = sourceReceipt(input, tip);

  input.visibleAlarBoundaryPair.forEach((point, index) =>
    assertPoint(point, `visibleAlarBoundaryPair[${index}]`));
  tip.contourPoints.forEach((point, index) =>
    assertPoint(point, `tip.contourPoints[${index}]`));

  if (tip.contourPoints.length < 6) {
    fail('FR287 tip contour requires at least six ordered points.');
  }

  const alarSpan = Math.abs(
    input.visibleAlarBoundaryPair[1].x -
      input.visibleAlarBoundaryPair[0].x,
  );
  if (!(alarSpan > EPSILON)) {
    return unavailable(
      'visible_alar_horizontal_span_collapsed',
      source,
    );
  }

  const tipWidth = horizontalSpan(tip.contourPoints);
  if (!(tipWidth > EPSILON)) {
    return unavailable(
      'tip_contour_horizontal_span_collapsed',
      source,
    );
  }

  const contourStats = input.unorderedVisibleNostrilContours.map(
    (points, index) => {
      assertSimpleContour(points, `nostrilContours[${index}]`);
      const width = horizontalSpan(points);
      const height = verticalSpan(points);
      const area = polygonArea(points);
      return Object.freeze({ width, height, area });
    },
  );

  if (contourStats.some((entry) => !(entry.width > EPSILON))) {
    return unavailable(
      'nostril_contour_horizontal_span_collapsed',
      source,
    );
  }
  if (contourStats.some((entry) => !(entry.height > EPSILON))) {
    return unavailable(
      'nostril_contour_vertical_span_collapsed',
      source,
    );
  }
  if (contourStats.some((entry) => !(entry.area > EPSILON))) {
    return unavailable(
      'nostril_contour_area_collapsed',
      source,
    );
  }

  const aspectRatios = contourStats.map(
    (entry) => entry.width / entry.height,
  );
  const meanAspectRatio =
    (aspectRatios[0]! + aspectRatios[1]!) / 2;
  const meanArea =
    (contourStats[0]!.area + contourStats[1]!.area) / 2;
  const areaAsymmetry =
    Math.abs(contourStats[0]!.area - contourStats[1]!.area) /
    meanArea;

  const result: FR290VisibleAlarNostrilGeometryResult =
    Object.freeze({
      schemaVersion:
        'fr290-visible-alar-nostril-geometry-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR290_VISIBLE_ALAR_NOSTRIL_CONTRACT_VERSION,
      authorityState:
        'visible_nasal_boundary_continuous_geometry_only' as const,
      status: 'available' as const,
      axes: Object.freeze([
        axis(
          FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF,
          alarSpan / tipWidth,
        ),
        axis(
          FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF,
          meanAspectRatio,
        ),
        axis(
          FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF,
          areaAsymmetry,
        ),
      ] as const),
      nostrilContourPointCounts: Object.freeze([
        input.unorderedVisibleNostrilContours[0].length,
        input.unorderedVisibleNostrilContours[1].length,
      ] as const),
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

  assertVisibleAlarNostrilGeometryFR290(result);
  return result;
}

export function assertVisibleAlarNostrilGeometryFR290(
  result: FR290VisibleAlarNostrilGeometryResult,
): void {
  if (
    result.schemaVersion !==
      'fr290-visible-alar-nostril-geometry-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR290_VISIBLE_ALAR_NOSTRIL_CONTRACT_VERSION ||
    result.authorityState !==
      'visible_nasal_boundary_continuous_geometry_only' ||
    result.source.sameCaptureAsFR287NoseVerified !== true ||
    result.source.sameObservationContractVerified !== true ||
    result.source.sameExtractorVersionVerified !== true ||
    result.source.sameModelVersionVerified !== true ||
    result.source.providerSpecificIndicesExposed !== false ||
    result.source.rawLandmarksExposed !== false ||
    result.source.sourceLandmarkRefsExposed !== false ||
    result.source.nostrilContourOrderSemantic !== false
  ) {
    fail('result identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible nasal morphology.');
  }

  if (result.status === 'available') {
    if (
      result.axes.length !== 3 ||
      result.axes[0]?.metricRef !==
        FR290_ALAR_WIDTH_TO_TIP_WIDTH_METRIC_REF ||
      result.axes[1]?.metricRef !==
        FR290_NOSTRIL_MEAN_ASPECT_RATIO_METRIC_REF ||
      result.axes[2]?.metricRef !==
        FR290_NOSTRIL_AREA_ASYMMETRY_METRIC_REF ||
      result.nostrilContourPointCounts.some((count) => count < 4)
    ) {
      fail('available geometry identity/cardinality drift.');
    }

    for (const candidate of result.axes) {
      if (
        candidate.unit !== 'ratio' ||
        candidate.coordinateFrame !==
          'pose_normalized_face_2d' ||
        !Number.isFinite(candidate.value) ||
        candidate.classificationApplied !== false ||
        candidate.thresholdApplied !== false ||
        candidate.calibrationApplied !== false ||
        candidate.traditionalBindingApplied !== false ||
        candidate.anatomicalInterpretationAllowed !== false ||
        candidate.anatomicalLateralityAssigned !== false
      ) {
        fail(`axis authority drift: ${candidate.metricRef}.`);
      }
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable geometry invented a fallback.');
  }
}
