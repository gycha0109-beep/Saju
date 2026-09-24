import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
  type PoseNormalizedLipsPointFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION =
  'FR291-VISIBLE-PHILTRUM-GEOMETRY-v1' as const;

export const FR291_VISIBLE_GROOVE_AXIS_METRIC_REF =
  'neutral.mouth.visible_central_groove.axis_length_to_mouth_width_ratio@0.1.0' as const;

export const FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF =
  'neutral.mouth.visible_central_groove.corridor_width_to_mouth_width_ratio@0.1.0' as const;

const EPSILON = 1e-12;

export interface FR291VisiblePhiltrumGeometryInput {
  readonly schemaVersion:
    'fr291-visible-philtrum-geometry-input-v1';
  readonly authorityState:
    'governed_visible_central_groove_geometry_only';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly coordinateUnit: 'centimeter';
  readonly visibleCentralGrooveAxisEndpoints: readonly [
    PoseNormalizedLipsPointFR79V1,
    PoseNormalizedLipsPointFR79V1,
  ];
  readonly visibleCorridorWidthPair: readonly [
    PoseNormalizedLipsPointFR79V1,
    PoseNormalizedLipsPointFR79V1,
  ];
  readonly visibilityAdmitted: true;
  readonly sameCaptureAsFR79LipsVerified: true;
  readonly sourceCanonicalAssetDigest: string;
  readonly sourceObservationRefs: readonly string[];
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalLandmarkNamesAssigned: false;
  readonly hiddenBoundaryInferred: false;
  readonly traditionalBindingApplied: false;
}

export interface FR291VisibleMouthWidthReference {
  readonly schemaVersion:
    'fr291-visible-mouth-width-reference-v1';
  readonly authorityState:
    'fr79_visible_lips_horizontal_envelope_reference_only';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly coordinateUnit: 'centimeter';
  readonly mouthMinX: number;
  readonly mouthMaxX: number;
  readonly mouthHorizontalSpan: number;
  readonly sourceFR79SchemaVersion:
    'fr79-pose-normalized-lips-geometry-v1';
  readonly sourceCanonicalAssetDigest: string;
  readonly providerRunRefExposed: false;
  readonly canonicalAssetDigestExposed: false;
  readonly providerVertexIndicesExposed: false;
  readonly anatomicalRoleAssigned: false;
}

export interface FR291NeutralVisibleGrooveAxis {
  readonly metricRef:
    | typeof FR291_VISIBLE_GROOVE_AXIS_METRIC_REF
    | typeof FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly scaleInvariant: true;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly physicalAnthropometryAllowed: false;
  readonly anatomicalInterpretationAllowed: false;
}

export type FR291VisiblePhiltrumUnavailableReason =
  | 'visible_mouth_horizontal_span_collapsed'
  | 'visible_central_groove_axis_collapsed'
  | 'visible_corridor_width_collapsed';

export interface FR291SourceReceipt {
  readonly sameCaptureAsFR79LipsVerified: true;
  readonly canonicalAssetDigestMatched: true;
  readonly coordinateFrameMatched: true;
  readonly coordinateUnitMatched: true;
  readonly sourceObservationRefsRetainedInternally: true;
  readonly sourceObservationRefsExposed: false;
  readonly providerSpecificIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly anatomicalLandmarkNamesAssigned: false;
}

export interface FR291AuthorityBoundary {
  readonly observableMorphologyOnly: true;
  readonly anatomicalPhiltrumGroundTruthClaimed: false;
  readonly namedAnatomicalLandmarkIssued: false;
  readonly hiddenBoundaryInferred: false;
  readonly physicalAnthropometryIssued: false;
  readonly millimeterClaimIssued: false;
  readonly classifierIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly traditionalBindingIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR291VisiblePhiltrumGeometryResult =
  | Readonly<{
      schemaVersion:
        'fr291-visible-philtrum-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION;
      authorityState:
        'visible_central_groove_continuous_geometry_only';
      status: 'available';
      axes: readonly [
        FR291NeutralVisibleGrooveAxis,
        FR291NeutralVisibleGrooveAxis,
      ];
      source: FR291SourceReceipt;
      authorityBoundary: FR291AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr291-visible-philtrum-geometry-v1';
      artifactVersion: '0.1.0';
      contractVersion:
        typeof FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION;
      authorityState:
        'visible_central_groove_continuous_geometry_only';
      status: 'unavailable';
      reason: FR291VisiblePhiltrumUnavailableReason;
      fallbackInvented: false;
      source: FR291SourceReceipt;
      authorityBoundary: FR291AuthorityBoundary;
    }>;

const AUTHORITY_BOUNDARY: FR291AuthorityBoundary = Object.freeze({
  observableMorphologyOnly: true as const,
  anatomicalPhiltrumGroundTruthClaimed: false as const,
  namedAnatomicalLandmarkIssued: false as const,
  hiddenBoundaryInferred: false as const,
  physicalAnthropometryIssued: false as const,
  millimeterClaimIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-291 ${message}`);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function assertPoint(
  point: PoseNormalizedLipsPointFR79V1,
  label: string,
): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y)
  ) {
    fail(`${label} must contain finite x/y coordinates.`);
  }
}

function distance(
  a: PoseNormalizedLipsPointFR79V1,
  b: PoseNormalizedLipsPointFR79V1,
): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
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

export function deriveVisibleMouthWidthReferenceFR291(
  lips: PoseNormalizedLipsGeometryFR79V1,
): FR291VisibleMouthWidthReference {
  assertIssuedPoseNormalizedLipsGeometryFR79(lips);

  if (
    lips.coordinateFrame !== 'pose_normalized_face_2d' ||
    lips.coordinateUnit !== 'centimeter' ||
    lips.poseCompensated !== true ||
    lips.contours.length !== 2 ||
    lips.contourConsumptionState !==
      'unordered_set_no_outer_inner_role'
  ) {
    fail('FR79 lips geometry boundary drift.');
  }

  const points = lips.contours.flatMap(
    (contour) => contour.geometry.boundary,
  );
  if (points.length === 0) {
    fail('FR79 lips geometry contains no visible points.');
  }
  points.forEach((point, index) =>
    assertPoint(point, `FR79 lips point ${index}`));

  const xs = points.map((point) => point.x);
  const mouthMinX = Math.min(...xs);
  const mouthMaxX = Math.max(...xs);
  const mouthHorizontalSpan = mouthMaxX - mouthMinX;

  const reference: FR291VisibleMouthWidthReference =
    Object.freeze({
      schemaVersion:
        'fr291-visible-mouth-width-reference-v1' as const,
      authorityState:
        'fr79_visible_lips_horizontal_envelope_reference_only' as const,
      coordinateFrame:
        'pose_normalized_face_2d' as const,
      coordinateUnit: 'centimeter' as const,
      mouthMinX: finite(mouthMinX, 'mouthMinX'),
      mouthMaxX: finite(mouthMaxX, 'mouthMaxX'),
      mouthHorizontalSpan:
        finite(mouthHorizontalSpan, 'mouthHorizontalSpan'),
      sourceFR79SchemaVersion:
        'fr79-pose-normalized-lips-geometry-v1' as const,
      sourceCanonicalAssetDigest:
        lips.provenance.canonicalAssetDigest,
      providerRunRefExposed: false as const,
      canonicalAssetDigestExposed: false as const,
      providerVertexIndicesExposed: false as const,
      anatomicalRoleAssigned: false as const,
    });

  assertVisibleMouthWidthReferenceFR291(reference);
  return reference;
}

export function assertVisibleMouthWidthReferenceFR291(
  reference: FR291VisibleMouthWidthReference,
): void {
  if (
    reference.schemaVersion !==
      'fr291-visible-mouth-width-reference-v1' ||
    reference.authorityState !==
      'fr79_visible_lips_horizontal_envelope_reference_only' ||
    reference.coordinateFrame !==
      'pose_normalized_face_2d' ||
    reference.coordinateUnit !== 'centimeter' ||
    reference.sourceFR79SchemaVersion !==
      'fr79-pose-normalized-lips-geometry-v1' ||
    !reference.sourceCanonicalAssetDigest.trim() ||
    reference.providerRunRefExposed !== false ||
    reference.canonicalAssetDigestExposed !== false ||
    reference.providerVertexIndicesExposed !== false ||
    reference.anatomicalRoleAssigned !== false
  ) {
    fail('visible mouth width reference boundary drift.');
  }

  finite(reference.mouthMinX, 'mouthMinX');
  finite(reference.mouthMaxX, 'mouthMaxX');
  finite(
    reference.mouthHorizontalSpan,
    'mouthHorizontalSpan',
  );

  if (
    reference.mouthMaxX < reference.mouthMinX ||
    Math.abs(
      reference.mouthMaxX -
        reference.mouthMinX -
        reference.mouthHorizontalSpan,
    ) > EPSILON
  ) {
    fail('visible mouth width reference span drift.');
  }
}

function sourceReceipt(
  input: FR291VisiblePhiltrumGeometryInput,
  reference: FR291VisibleMouthWidthReference,
): FR291SourceReceipt {
  if (
    input.coordinateFrame !== reference.coordinateFrame ||
    input.coordinateUnit !== reference.coordinateUnit
  ) {
    fail('philtrum geometry and FR79 mouth reference coordinate system must match.');
  }

  if (
    input.sourceCanonicalAssetDigest !==
      reference.sourceCanonicalAssetDigest
  ) {
    fail('philtrum geometry and FR79 mouth reference must share canonical asset digest.');
  }

  return Object.freeze({
    sameCaptureAsFR79LipsVerified: true as const,
    canonicalAssetDigestMatched: true as const,
    coordinateFrameMatched: true as const,
    coordinateUnitMatched: true as const,
    sourceObservationRefsRetainedInternally: true as const,
    sourceObservationRefsExposed: false as const,
    providerSpecificIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    anatomicalLandmarkNamesAssigned: false as const,
  });
}

function axis(
  metricRef: FR291NeutralVisibleGrooveAxis['metricRef'],
  value: number,
): FR291NeutralVisibleGrooveAxis {
  return Object.freeze({
    metricRef,
    value: finite(value, metricRef),
    unit: 'ratio' as const,
    coordinateFrame:
      'pose_normalized_face_2d' as const,
    scaleInvariant: true as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    physicalAnthropometryAllowed: false as const,
    anatomicalInterpretationAllowed: false as const,
  });
}

function unavailable(
  reason: FR291VisiblePhiltrumUnavailableReason,
  source: FR291SourceReceipt,
): FR291VisiblePhiltrumGeometryResult {
  return Object.freeze({
    schemaVersion:
      'fr291-visible-philtrum-geometry-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION,
    authorityState:
      'visible_central_groove_continuous_geometry_only' as const,
    status: 'unavailable' as const,
    reason,
    fallbackInvented: false as const,
    source,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
}

function insideHorizontalEnvelope(
  point: PoseNormalizedLipsPointFR79V1,
  reference: FR291VisibleMouthWidthReference,
): boolean {
  return (
    point.x >= reference.mouthMinX &&
    point.x <= reference.mouthMaxX
  );
}

export function computeVisiblePhiltrumGeometryFR291(
  input: FR291VisiblePhiltrumGeometryInput,
  reference: FR291VisibleMouthWidthReference,
): FR291VisiblePhiltrumGeometryResult {
  if (
    input.schemaVersion !==
      'fr291-visible-philtrum-geometry-input-v1' ||
    input.authorityState !==
      'governed_visible_central_groove_geometry_only' ||
    input.coordinateFrame !==
      'pose_normalized_face_2d' ||
    input.coordinateUnit !== 'centimeter' ||
    input.visibilityAdmitted !== true ||
    input.sameCaptureAsFR79LipsVerified !== true ||
    !input.sourceCanonicalAssetDigest.trim() ||
    input.providerSpecificIndicesExposed !== false ||
    input.rawLandmarksExposed !== false ||
    input.anatomicalLandmarkNamesAssigned !== false ||
    input.hiddenBoundaryInferred !== false ||
    input.traditionalBindingApplied !== false
  ) {
    fail('input authority boundary drift.');
  }

  assertRefs(input.sourceObservationRefs);
  assertVisibleMouthWidthReferenceFR291(reference);

  input.visibleCentralGrooveAxisEndpoints.forEach(
    (point, index) =>
      assertPoint(
        point,
        `visibleCentralGrooveAxisEndpoints[${index}]`,
      ),
  );
  input.visibleCorridorWidthPair.forEach(
    (point, index) =>
      assertPoint(
        point,
        `visibleCorridorWidthPair[${index}]`,
      ),
  );

  const source = sourceReceipt(input, reference);

  if (!(reference.mouthHorizontalSpan > EPSILON)) {
    return unavailable(
      'visible_mouth_horizontal_span_collapsed',
      source,
    );
  }

  const axisLength = distance(
    input.visibleCentralGrooveAxisEndpoints[0],
    input.visibleCentralGrooveAxisEndpoints[1],
  );
  if (!(axisLength > EPSILON)) {
    return unavailable(
      'visible_central_groove_axis_collapsed',
      source,
    );
  }

  const corridorWidth = distance(
    input.visibleCorridorWidthPair[0],
    input.visibleCorridorWidthPair[1],
  );
  if (!(corridorWidth > EPSILON)) {
    return unavailable(
      'visible_corridor_width_collapsed',
      source,
    );
  }

  const allPoints = [
    ...input.visibleCentralGrooveAxisEndpoints,
    ...input.visibleCorridorWidthPair,
  ];
  if (
    allPoints.some(
      (point) =>
        !insideHorizontalEnvelope(point, reference),
    )
  ) {
    fail('visible central-groove geometry must lie within the FR79 visible mouth horizontal envelope.');
  }

  const result: FR291VisiblePhiltrumGeometryResult =
    Object.freeze({
      schemaVersion:
        'fr291-visible-philtrum-geometry-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION,
      authorityState:
        'visible_central_groove_continuous_geometry_only' as const,
      status: 'available' as const,
      axes: Object.freeze([
        axis(
          FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
          axisLength / reference.mouthHorizontalSpan,
        ),
        axis(
          FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
          corridorWidth /
            reference.mouthHorizontalSpan,
        ),
      ] as const),
      source,
      authorityBoundary: AUTHORITY_BOUNDARY,
    });

  assertVisiblePhiltrumGeometryFR291(result);
  return result;
}

export function assertVisiblePhiltrumGeometryFR291(
  result: FR291VisiblePhiltrumGeometryResult,
): void {
  if (
    result.schemaVersion !==
      'fr291-visible-philtrum-geometry-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !==
      FR291_VISIBLE_PHILTRUM_CONTRACT_VERSION ||
    result.authorityState !==
      'visible_central_groove_continuous_geometry_only' ||
    result.source.sameCaptureAsFR79LipsVerified !== true ||
    result.source.canonicalAssetDigestMatched !== true ||
    result.source.coordinateFrameMatched !== true ||
    result.source.coordinateUnitMatched !== true ||
    result.source
      .sourceObservationRefsRetainedInternally !== true ||
    result.source.sourceObservationRefsExposed !== false ||
    result.source.providerSpecificIndicesExposed !== false ||
    result.source.rawLandmarksExposed !== false ||
    result.source.anatomicalLandmarkNamesAssigned !== false
  ) {
    fail('result identity/source boundary drift.');
  }

  if (
    result.authorityBoundary.observableMorphologyOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(
        ([key]) => key !== 'observableMorphologyOnly',
      )
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond visible central-groove morphology.');
  }

  if (result.status === 'available') {
    if (
      result.axes.length !== 2 ||
      result.axes[0]?.metricRef !==
        FR291_VISIBLE_GROOVE_AXIS_METRIC_REF ||
      result.axes[1]?.metricRef !==
        FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF
    ) {
      fail('available visible central-groove axis identity drift.');
    }

    for (const candidate of result.axes) {
      if (
        candidate.unit !== 'ratio' ||
        candidate.coordinateFrame !==
          'pose_normalized_face_2d' ||
        candidate.scaleInvariant !== true ||
        !Number.isFinite(candidate.value) ||
        candidate.classificationApplied !== false ||
        candidate.thresholdApplied !== false ||
        candidate.calibrationApplied !== false ||
        candidate.traditionalBindingApplied !== false ||
        candidate.physicalAnthropometryAllowed !== false ||
        candidate.anatomicalInterpretationAllowed !== false
      ) {
        fail(
          `visible central-groove axis authority drift: ${candidate.metricRef}.`,
        );
      }
    }
  } else if (result.fallbackInvented !== false) {
    fail('unavailable visible central-groove geometry invented fallback.');
  }
}
