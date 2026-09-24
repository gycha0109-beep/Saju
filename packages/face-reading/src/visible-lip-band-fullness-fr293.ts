import {
  assertVisibleMouthWidthReferenceFR291,
  type FR291VisibleFacePoint2D,
  type FR291VisibleMouthWidthReference,
} from './visible-philtrum-geometry-fr291.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR293_VISIBLE_LIP_BAND_CONTRACT_VERSION =
  'FR293-VISIBLE-LIP-BAND-FULLNESS-v1' as const;

export const FR293_UPPER_VERTICAL_SPAN_METRIC_REF =
  'neutral.mouth.visible_upper_lip_band.vertical_span_to_mouth_width_ratio@0.1.0' as const;
export const FR293_LOWER_VERTICAL_SPAN_METRIC_REF =
  'neutral.mouth.visible_lower_lip_band.vertical_span_to_mouth_width_ratio@0.1.0' as const;
export const FR293_COMBINED_AREA_METRIC_REF =
  'neutral.mouth.visible_lip_bands.combined_area_to_mouth_width_squared_ratio@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR293VisibleLipBandGeometryInput {
  readonly schemaVersion:
    'fr293-visible-lip-band-geometry-input-v1';
  readonly authorityState:
    'governed_explicit_visible_upper_lower_lip_band_geometry_only';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly coordinateUnit: 'centimeter';
  readonly upperVisibleLipBandBoundary:
    readonly FR291VisibleFacePoint2D[];
  readonly lowerVisibleLipBandBoundary:
    readonly FR291VisibleFacePoint2D[];
  readonly visibleUpperLowerRoleAssignmentExplicit: true;
  readonly visibilityAdmitted: true;
  readonly sameCaptureAsFR79LipsVerified: true;
  readonly sourceCanonicalAssetDigest: string;
  readonly sourceObservationRefs: readonly string[];
  readonly providerContourIdentityUsed: false;
  readonly providerComponentOrderUsed: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalOuterInnerRolesAssigned: false;
  readonly hiddenBoundaryInferred: false;
  readonly traditionalBindingApplied: false;
}

export interface FR293NeutralVisibleLipBandAxis {
  readonly metricRef:
    | typeof FR293_UPPER_VERTICAL_SPAN_METRIC_REF
    | typeof FR293_LOWER_VERTICAL_SPAN_METRIC_REF
    | typeof FR293_COMBINED_AREA_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly scaleInvariant: true;
  readonly classificationApplied: false;
  readonly fullnessCategoryIssued: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly physicalThicknessInterpretationAllowed: false;
  readonly anatomicalInterpretationAllowed: false;
}

export type FR293VisibleLipBandUnavailableReason =
  | 'visible_mouth_horizontal_span_collapsed'
  | 'upper_visible_lip_band_vertical_span_collapsed'
  | 'lower_visible_lip_band_vertical_span_collapsed'
  | 'upper_visible_lip_band_area_collapsed'
  | 'lower_visible_lip_band_area_collapsed';

export interface FR293LipBandSourceReceipt {
  readonly sameCaptureAsFR79LipsVerified: true;
  readonly canonicalAssetDigestMatched: true;
  readonly coordinateFrameMatched: true;
  readonly coordinateUnitMatched: true;
  readonly explicitVisibleUpperLowerRolesConsumed: true;
  readonly providerLipContoursConsumed: false;
  readonly providerComponentOrderConsumed: false;
  readonly sourceObservationRefsRetainedInternally: true;
  readonly sourceObservationRefsExposed: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalOuterInnerRolesAssigned: false;
}

export interface FR293LipBandAuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly providerContourSeparationInterpretedAsThickness: false;
  readonly providerOuterInnerRolesPromoted: false;
  readonly anatomicalLipThicknessIssued: false;
  readonly physicalAnthropometryIssued: false;
  readonly hiddenBoundaryInferred: false;
  readonly rawRgbSegmentationAuthorityClaimed: false;
  readonly fullnessCategoryIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalDuanHouBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR293VisibleLipBandGeometryResult =
  | Readonly<{
      schemaVersion:
        'fr293-visible-lip-band-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR293_VISIBLE_LIP_BAND_CONTRACT_VERSION;
      authorityState:
        'visible_upper_lower_lip_band_continuous_geometry_only';
      status: 'available';
      axes: readonly [
        FR293NeutralVisibleLipBandAxis,
        FR293NeutralVisibleLipBandAxis,
        FR293NeutralVisibleLipBandAxis,
      ];
      upperBoundaryPointCount: number;
      lowerBoundaryPointCount: number;
      source: FR293LipBandSourceReceipt;
      authorityBoundary: FR293LipBandAuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr293-visible-lip-band-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR293_VISIBLE_LIP_BAND_CONTRACT_VERSION;
      authorityState:
        'visible_upper_lower_lip_band_continuous_geometry_only';
      status: 'unavailable';
      reason: FR293VisibleLipBandUnavailableReason;
      fallbackInvented: false;
      source: FR293LipBandSourceReceipt;
      authorityBoundary: FR293LipBandAuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR293LipBandAuthorityBoundary =
  Object.freeze({
    observableMorphologyOnly: true as const,
    providerContourSeparationInterpretedAsThickness:
      false as const,
    providerOuterInnerRolesPromoted: false as const,
    anatomicalLipThicknessIssued: false as const,
    physicalAnthropometryIssued: false as const,
    hiddenBoundaryInferred: false as const,
    rawRgbSegmentationAuthorityClaimed: false as const,
    fullnessCategoryIssued: false as const,
    classifierIssued: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    traditionalDuanHouBindingIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-293 ${message}`,
  );
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function assertPoint(
  point: FR291VisibleFacePoint2D,
  label: string,
): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y)
  ) {
    fail(`${label} must contain finite x/y coordinates.`);
  }
}

function pointKey(point: FR291VisibleFacePoint2D): string {
  return `${point.x}:${point.y}`;
}

function verticalSpan(
  points: readonly FR291VisibleFacePoint2D[],
): number {
  const ys = points.map((point) => point.y);
  return Math.max(...ys) - Math.min(...ys);
}

function polygonArea(
  points: readonly FR291VisibleFacePoint2D[],
): number {
  let twiceArea = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    twiceArea +=
      current.x * next.y - next.x * current.y;
  }
  return Math.abs(twiceArea) / 2;
}

function cross(
  a: FR291VisibleFacePoint2D,
  b: FR291VisibleFacePoint2D,
  c: FR291VisibleFacePoint2D,
): number {
  return (
    (b.x - a.x) * (c.y - a.y) -
    (b.y - a.y) * (c.x - a.x)
  );
}

function onSegment(
  a: FR291VisibleFacePoint2D,
  b: FR291VisibleFacePoint2D,
  p: FR291VisibleFacePoint2D,
): boolean {
  return (
    Math.abs(cross(a, b, p)) <= EPSILON &&
    p.x >= Math.min(a.x, b.x) - EPSILON &&
    p.x <= Math.max(a.x, b.x) + EPSILON &&
    p.y >= Math.min(a.y, b.y) - EPSILON &&
    p.y <= Math.max(a.y, b.y) + EPSILON
  );
}

function segmentsIntersectOrTouch(
  a: FR291VisibleFacePoint2D,
  b: FR291VisibleFacePoint2D,
  c: FR291VisibleFacePoint2D,
  d: FR291VisibleFacePoint2D,
): boolean {
  const abC = cross(a, b, c);
  const abD = cross(a, b, d);
  const cdA = cross(c, d, a);
  const cdB = cross(c, d, b);

  if (
    ((abC > EPSILON && abD < -EPSILON) ||
      (abC < -EPSILON && abD > EPSILON)) &&
    ((cdA > EPSILON && cdB < -EPSILON) ||
      (cdA < -EPSILON && cdB > EPSILON))
  ) {
    return true;
  }

  return (
    onSegment(a, b, c) ||
    onSegment(a, b, d) ||
    onSegment(c, d, a) ||
    onSegment(c, d, b)
  );
}

function assertSimplePolygon(
  points: readonly FR291VisibleFacePoint2D[],
  label: string,
): void {
  if (points.length < 3) {
    fail(`${label} requires at least three ordered points.`);
  }

  points.forEach((point, index) =>
    assertPoint(point, `${label}[${index}]`));

  if (new Set(points.map(pointKey)).size !== points.length) {
    fail(
      `${label} must not repeat vertices or duplicate closure.`,
    );
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
        firstNext === second ||
        secondNext === first ||
        (first === 0 && secondNext === 0);
      if (adjacent) continue;

      if (
        segmentsIntersectOrTouch(
          points[first]!,
          points[firstNext]!,
          points[second]!,
          points[secondNext]!,
        )
      ) {
        fail(
          `${label} must be a simple non-self-intersecting polygon.`,
        );
      }
    }
  }
}

function assertRefs(refs: readonly string[]): void {
  if (refs.length === 0) {
    fail('sourceObservationRefs must be non-empty.');
  }
  const normalized = refs.map((ref) => ref.trim());
  if (normalized.some((ref) => ref.length === 0)) {
    fail('sourceObservationRefs must not contain empty refs.');
  }
  if (new Set(normalized).size !== normalized.length) {
    fail('sourceObservationRefs must be unique.');
  }
}

function sourceReceipt(
  input: FR293VisibleLipBandGeometryInput,
  reference: FR291VisibleMouthWidthReference,
): FR293LipBandSourceReceipt {
  if (
    input.coordinateFrame !== reference.coordinateFrame ||
    input.coordinateUnit !== reference.coordinateUnit
  ) {
    fail(
      'visible lip-band geometry and mouth-width reference coordinate system must match.',
    );
  }

  if (
    input.sourceCanonicalAssetDigest !==
      reference.sourceCanonicalAssetDigest
  ) {
    fail(
      'visible lip-band geometry and FR79 mouth reference must share canonical asset digest.',
    );
  }

  return Object.freeze({
    sameCaptureAsFR79LipsVerified: true as const,
    canonicalAssetDigestMatched: true as const,
    coordinateFrameMatched: true as const,
    coordinateUnitMatched: true as const,
    explicitVisibleUpperLowerRolesConsumed: true as const,
    providerLipContoursConsumed: false as const,
    providerComponentOrderConsumed: false as const,
    sourceObservationRefsRetainedInternally: true as const,
    sourceObservationRefsExposed: false as const,
    providerSpecificIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    anatomicalOuterInnerRolesAssigned: false as const,
  });
}

function axis(
  metricRef: FR293NeutralVisibleLipBandAxis['metricRef'],
  value: number,
): FR293NeutralVisibleLipBandAxis {
  return Object.freeze({
    metricRef,
    value: finite(value, metricRef),
    unit: 'ratio' as const,
    coordinateFrame: 'pose_normalized_face_2d' as const,
    scaleInvariant: true as const,
    classificationApplied: false as const,
    fullnessCategoryIssued: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    physicalThicknessInterpretationAllowed: false as const,
    anatomicalInterpretationAllowed: false as const,
  });
}

function unavailable(
  reason: FR293VisibleLipBandUnavailableReason,
  source: FR293LipBandSourceReceipt,
): FR293VisibleLipBandGeometryResult {
  return Object.freeze({
    schemaVersion:
      'fr293-visible-lip-band-geometry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR293_VISIBLE_LIP_BAND_CONTRACT_VERSION,
    authorityState:
      'visible_upper_lower_lip_band_continuous_geometry_only' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

function assertWithinMouthEnvelope(
  points: readonly FR291VisibleFacePoint2D[],
  reference: FR291VisibleMouthWidthReference,
  label: string,
): void {
  for (const point of points) {
    if (
      point.x < reference.mouthMinX - EPSILON ||
      point.x > reference.mouthMaxX + EPSILON
    ) {
      fail(
        `${label} must lie within the FR79 visible mouth horizontal envelope.`,
      );
    }
  }
}

export function computeVisibleLipBandFullnessFR293(
  input: FR293VisibleLipBandGeometryInput,
  reference: FR291VisibleMouthWidthReference,
): FR293VisibleLipBandGeometryResult {
  if (
    input.schemaVersion !==
      'fr293-visible-lip-band-geometry-input-v1' ||
    input.authorityState !==
      'governed_explicit_visible_upper_lower_lip_band_geometry_only' ||
    input.coordinateFrame !== 'pose_normalized_face_2d' ||
    input.coordinateUnit !== 'centimeter' ||
    input.visibleUpperLowerRoleAssignmentExplicit !== true ||
    input.visibilityAdmitted !== true ||
    input.sameCaptureAsFR79LipsVerified !== true ||
    !input.sourceCanonicalAssetDigest.trim() ||
    input.providerContourIdentityUsed !== false ||
    input.providerComponentOrderUsed !== false ||
    input.providerSpecificIndicesExposed !== false ||
    input.rawLandmarksExposed !== false ||
    input.anatomicalOuterInnerRolesAssigned !== false ||
    input.hiddenBoundaryInferred !== false ||
    input.traditionalBindingApplied !== false
  ) {
    fail('input authority boundary drift.');
  }

  assertRefs(input.sourceObservationRefs);
  assertVisibleMouthWidthReferenceFR291(reference);
  assertSimplePolygon(
    input.upperVisibleLipBandBoundary,
    'upperVisibleLipBandBoundary',
  );
  assertSimplePolygon(
    input.lowerVisibleLipBandBoundary,
    'lowerVisibleLipBandBoundary',
  );

  const source = sourceReceipt(input, reference);

  if (!(reference.mouthHorizontalSpan > EPSILON)) {
    return unavailable(
      'visible_mouth_horizontal_span_collapsed',
      source,
    );
  }

  assertWithinMouthEnvelope(
    input.upperVisibleLipBandBoundary,
    reference,
    'upperVisibleLipBandBoundary',
  );
  assertWithinMouthEnvelope(
    input.lowerVisibleLipBandBoundary,
    reference,
    'lowerVisibleLipBandBoundary',
  );

  const upperSpan = verticalSpan(
    input.upperVisibleLipBandBoundary,
  );
  if (!(upperSpan > EPSILON)) {
    return unavailable(
      'upper_visible_lip_band_vertical_span_collapsed',
      source,
    );
  }

  const lowerSpan = verticalSpan(
    input.lowerVisibleLipBandBoundary,
  );
  if (!(lowerSpan > EPSILON)) {
    return unavailable(
      'lower_visible_lip_band_vertical_span_collapsed',
      source,
    );
  }

  const upperArea = polygonArea(
    input.upperVisibleLipBandBoundary,
  );
  if (!(upperArea > EPSILON)) {
    return unavailable(
      'upper_visible_lip_band_area_collapsed',
      source,
    );
  }

  const lowerArea = polygonArea(
    input.lowerVisibleLipBandBoundary,
  );
  if (!(lowerArea > EPSILON)) {
    return unavailable(
      'lower_visible_lip_band_area_collapsed',
      source,
    );
  }

  const width = reference.mouthHorizontalSpan;
  const result: FR293VisibleLipBandGeometryResult =
    Object.freeze({
      schemaVersion:
        'fr293-visible-lip-band-geometry-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR293_VISIBLE_LIP_BAND_CONTRACT_VERSION,
      authorityState:
        'visible_upper_lower_lip_band_continuous_geometry_only' as const,
      status: 'available' as const,
      axes: Object.freeze([
        axis(
          FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
          upperSpan / width,
        ),
        axis(
          FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
          lowerSpan / width,
        ),
        axis(
          FR293_COMBINED_AREA_METRIC_REF,
          (upperArea + lowerArea) / (width * width),
        ),
      ] as const),
      upperBoundaryPointCount:
        input.upperVisibleLipBandBoundary.length,
      lowerBoundaryPointCount:
        input.lowerVisibleLipBandBoundary.length,
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

  assertVisibleLipBandFullnessFR293(result);
  return result;
}

export function assertVisibleLipBandFullnessFR293(
  result: FR293VisibleLipBandGeometryResult,
): void {
  if (
    result.schemaVersion !==
      'fr293-visible-lip-band-geometry-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR293_VISIBLE_LIP_BAND_CONTRACT_VERSION ||
    result.authorityState !==
      'visible_upper_lower_lip_band_continuous_geometry_only' ||
    result.source.sameCaptureAsFR79LipsVerified !== true ||
    result.source.canonicalAssetDigestMatched !== true ||
    result.source.coordinateFrameMatched !== true ||
    result.source.coordinateUnitMatched !== true ||
    result.source.explicitVisibleUpperLowerRolesConsumed !== true ||
    result.source.providerLipContoursConsumed !== false ||
    result.source.providerComponentOrderConsumed !== false ||
    result.source.sourceObservationRefsExposed !== false ||
    result.source.providerSpecificIndicesExposed !== false ||
    result.source.rawLandmarksExposed !== false ||
    result.source.anatomicalOuterInnerRolesAssigned !== false
  ) {
    fail('result identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'observableMorphologyOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible lip-band morphology.');
  }

  if (result.status === 'available') {
    if (
      result.axes.length !== 3 ||
      result.upperBoundaryPointCount < 3 ||
      result.lowerBoundaryPointCount < 3 ||
      result.axes[0]?.metricRef !==
        FR293_UPPER_VERTICAL_SPAN_METRIC_REF ||
      result.axes[1]?.metricRef !==
        FR293_LOWER_VERTICAL_SPAN_METRIC_REF ||
      result.axes[2]?.metricRef !==
        FR293_COMBINED_AREA_METRIC_REF
    ) {
      fail('available visible lip-band axis identity drift.');
    }

    for (const candidate of result.axes) {
      if (
        candidate.unit !== 'ratio' ||
        candidate.coordinateFrame !==
          'pose_normalized_face_2d' ||
        candidate.scaleInvariant !== true ||
        !Number.isFinite(candidate.value) ||
        candidate.classificationApplied !== false ||
        candidate.fullnessCategoryIssued !== false ||
        candidate.thresholdApplied !== false ||
        candidate.calibrationApplied !== false ||
        candidate.traditionalBindingApplied !== false ||
        candidate.physicalThicknessInterpretationAllowed !== false ||
        candidate.anatomicalInterpretationAllowed !== false
      ) {
        fail(
          `visible lip-band axis authority drift: ${candidate.metricRef}.`,
        );
      }
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable visible lip-band geometry invented fallback.');
  }
}
