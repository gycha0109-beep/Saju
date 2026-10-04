import {
  NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104,
} from './neutral-ear-geometry-plausibility-readiness-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

const EPSILON = Number.EPSILON;

export interface NeutralEarNormalizedPointFR104V1 {
  readonly x: number;
  readonly y: number;
}

export interface NeutralEarCandidateShapeInputFR104V1 {
  readonly schemaVersion: 'fr104-neutral-ear-candidate-shape-input-v1';
  readonly candidateRef: string;
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly points: readonly NeutralEarNormalizedPointFR104V1[];
  readonly exactStructuralDegeneracyAlreadyRejected: true;
}

export interface NeutralEarCandidateShapeEvidenceFR104V1 {
  readonly schemaVersion: 'fr104-neutral-ear-candidate-shape-evidence-v1';
  readonly authorityState: 'descriptive_shape_evidence_only_no_acceptance';
  readonly candidateRef: string;
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly pointCount: number;
  readonly bbox: {
    readonly minX: number;
    readonly minY: number;
    readonly maxX: number;
    readonly maxY: number;
    readonly width: number;
    readonly height: number;
    readonly area: number;
  };
  readonly centroid: {
    readonly x: number;
    readonly y: number;
  };
  readonly polygonArea: number;
  readonly perimeter: number;
  readonly shapeEvidence: {
    readonly bboxShortToLongRatio: number;
    readonly polygonAreaToBBoxAreaRatio: number;
    readonly fourPiAreaToPerimeterSquared: number;
  };
  readonly classification: null;
  readonly automaticAcceptanceThresholdApplied: false;
  readonly numericAcceptanceThresholdAuthorized: false;
  readonly anatomicalLateralityAssigned: false;
  readonly validatedExternalEarObservation: false;
}

export interface NeutralEarFaceEnvelopeInputFR104V1 {
  readonly schemaVersion: 'fr104-neutral-ear-face-envelope-input-v1';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly sourceAuthority:
    'governed_same_frame_face_geometry_adapter_required';
  readonly sameFrameBinding:
    | 'caller_attested_ephemeral_not_independently_verified'
    | 'exact_runtime_byte_origin_independently_verified';
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}

export interface NeutralEarFaceRelativeEvidenceFR104V1 {
  readonly schemaVersion: 'fr104-neutral-ear-face-relative-evidence-v1';
  readonly authorityState:
    'descriptive_face_relative_evidence_only_no_plausibility_classification';
  readonly candidateRef: string;
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly faceEnvelopeSourceAuthority:
    'governed_same_frame_face_geometry_adapter_required';
  readonly sameFrameBinding:
    | 'caller_attested_ephemeral_not_independently_verified'
    | 'exact_runtime_byte_origin_independently_verified';
  readonly candidateCentroidOffsetFromFaceCenterXInFaceWidths: number;
  readonly candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths: number;
  readonly candidateCentroidOffsetFromFaceCenterYInFaceHeights: number;
  readonly candidateBBoxWidthToFaceWidth: number;
  readonly candidateBBoxHeightToFaceHeight: number;
  readonly candidatePolygonAreaToFaceBoxArea: number;
  readonly imageSpaceHorizontalSign:
    | 'negative'
    | 'zero'
    | 'positive';
  readonly imageSpaceHorizontalSignMayBeCalledAnatomicalLaterality: false;
  readonly plausibilityClassification: null;
  readonly lateralZoneThresholdApplied: false;
  readonly anatomicalLateralityAssigned: false;
  readonly validatedExternalEarObservation: false;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-104 ${message}`);
}

function finiteUnit(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    fail(`${label} must be finite within [0,1].`);
  }
  return value;
}

function validateCandidate(
  input: NeutralEarCandidateShapeInputFR104V1,
): readonly NeutralEarNormalizedPointFR104V1[] {
  if (
    input.schemaVersion !== 'fr104-neutral-ear-candidate-shape-input-v1'
    || input.coordinateFrame !== 'canonical_image_normalized_2d'
    || input.exactStructuralDegeneracyAlreadyRejected !== true
  ) {
    fail('candidate input must preserve the FR104 normalized-image and exact-degeneracy boundary.');
  }
  if (typeof input.candidateRef !== 'string' || input.candidateRef.trim().length === 0) {
    fail('candidateRef must be non-empty.');
  }
  if (!Array.isArray(input.points) || input.points.length < 3) {
    fail('candidate polygon requires at least three points.');
  }
  return Object.freeze(input.points.map((point, index) => {
    if (typeof point !== 'object' || point === null) {
      fail(`points[${index}] must be an object.`);
    }
    return Object.freeze({
      x: finiteUnit(point.x, `points[${index}].x`),
      y: finiteUnit(point.y, `points[${index}].y`),
    });
  }));
}

function polygonArea(points: readonly NeutralEarNormalizedPointFR104V1[]): number {
  let doubled = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    doubled += (current.x * next.y) - (next.x * current.y);
  }
  return Math.abs(doubled) / 2;
}

function polygonPerimeter(points: readonly NeutralEarNormalizedPointFR104V1[]): number {
  let total = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    total += Math.hypot(next.x - current.x, next.y - current.y);
  }
  return total;
}

export function deriveNeutralEarCandidateShapeEvidenceFR104(
  input: NeutralEarCandidateShapeInputFR104V1,
): NeutralEarCandidateShapeEvidenceFR104V1 {
  if (
    NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104.authority
      .automaticShapeRejectionThresholdAuthorized !== false
  ) {
    fail('Phase A must keep automatic shape thresholds unauthorized.');
  }

  const points = validateCandidate(input);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = maxX - minX;
  const height = maxY - minY;
  const bboxArea = width * height;
  const area = polygonArea(points);
  const perimeter = polygonPerimeter(points);

  if (!(width > 0) || !(height > 0) || !(bboxArea > 0) || !(area > 0) || !(perimeter > 0)) {
    fail('shape evidence requires a candidate that already passed exact structural degeneracy rejection.');
  }

  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  const centroidX = xs.reduce((sum, value) => sum + value, 0) / xs.length;
  const centroidY = ys.reduce((sum, value) => sum + value, 0) / ys.length;

  return Object.freeze({
    schemaVersion: 'fr104-neutral-ear-candidate-shape-evidence-v1' as const,
    authorityState: 'descriptive_shape_evidence_only_no_acceptance' as const,
    candidateRef: input.candidateRef,
    coordinateFrame: input.coordinateFrame,
    pointCount: points.length,
    bbox: Object.freeze({
      minX,
      minY,
      maxX,
      maxY,
      width,
      height,
      area: bboxArea,
    }),
    centroid: Object.freeze({ x: centroidX, y: centroidY }),
    polygonArea: area,
    perimeter,
    shapeEvidence: Object.freeze({
      bboxShortToLongRatio: shortSide / longSide,
      polygonAreaToBBoxAreaRatio: area / bboxArea,
      fourPiAreaToPerimeterSquared: (4 * Math.PI * area) / (perimeter * perimeter),
    }),
    classification: null,
    automaticAcceptanceThresholdApplied: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
    anatomicalLateralityAssigned: false as const,
    validatedExternalEarObservation: false as const,
  });
}

function validateFaceEnvelope(
  envelope: NeutralEarFaceEnvelopeInputFR104V1,
): Readonly<{
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}> {
  if (
    envelope.schemaVersion !== 'fr104-neutral-ear-face-envelope-input-v1'
    || envelope.coordinateFrame !== 'canonical_image_normalized_2d'
    || envelope.sourceAuthority !== 'governed_same_frame_face_geometry_adapter_required'
    || (
      envelope.sameFrameBinding
        !== 'caller_attested_ephemeral_not_independently_verified'
      && envelope.sameFrameBinding
        !== 'exact_runtime_byte_origin_independently_verified'
    )
  ) {
    fail('face envelope must preserve the FR104 governed same-frame adapter boundary.');
  }
  const minX = finiteUnit(envelope.minX, 'faceEnvelope.minX');
  const minY = finiteUnit(envelope.minY, 'faceEnvelope.minY');
  const maxX = finiteUnit(envelope.maxX, 'faceEnvelope.maxX');
  const maxY = finiteUnit(envelope.maxY, 'faceEnvelope.maxY');
  const width = maxX - minX;
  const height = maxY - minY;
  if (!(width > EPSILON) || !(height > EPSILON)) {
    fail('face envelope must have positive width and height.');
  }
  return Object.freeze({ minX, minY, maxX, maxY, width, height });
}

export function deriveNeutralEarFaceRelativeEvidenceFR104(
  candidate: NeutralEarCandidateShapeEvidenceFR104V1,
  envelopeInput: NeutralEarFaceEnvelopeInputFR104V1,
): NeutralEarFaceRelativeEvidenceFR104V1 {
  if (
    candidate.schemaVersion !== 'fr104-neutral-ear-candidate-shape-evidence-v1'
    || candidate.authorityState !== 'descriptive_shape_evidence_only_no_acceptance'
    || candidate.coordinateFrame !== 'canonical_image_normalized_2d'
    || candidate.classification !== null
    || candidate.automaticAcceptanceThresholdApplied !== false
    || candidate.anatomicalLateralityAssigned !== false
    || candidate.validatedExternalEarObservation !== false
  ) {
    fail('face-relative evidence requires an unclassified FR104 shape-evidence candidate.');
  }
  const envelope = validateFaceEnvelope(envelopeInput);
  const faceCenterX = (envelope.minX + envelope.maxX) / 2;
  const faceCenterY = (envelope.minY + envelope.maxY) / 2;
  const signedX =
    (candidate.centroid.x - faceCenterX) / envelope.width;
  const signedY =
    (candidate.centroid.y - faceCenterY) / envelope.height;
  const sign =
    signedX < 0 ? 'negative' :
    signedX > 0 ? 'positive' :
    'zero';

  return Object.freeze({
    schemaVersion: 'fr104-neutral-ear-face-relative-evidence-v1' as const,
    authorityState:
      'descriptive_face_relative_evidence_only_no_plausibility_classification' as const,
    candidateRef: candidate.candidateRef,
    coordinateFrame: candidate.coordinateFrame,
    faceEnvelopeSourceAuthority: envelopeInput.sourceAuthority,
    sameFrameBinding: envelopeInput.sameFrameBinding,
    candidateCentroidOffsetFromFaceCenterXInFaceWidths: signedX,
    candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths: Math.abs(signedX),
    candidateCentroidOffsetFromFaceCenterYInFaceHeights: signedY,
    candidateBBoxWidthToFaceWidth: candidate.bbox.width / envelope.width,
    candidateBBoxHeightToFaceHeight: candidate.bbox.height / envelope.height,
    candidatePolygonAreaToFaceBoxArea:
      candidate.polygonArea / (envelope.width * envelope.height),
    imageSpaceHorizontalSign: sign,
    imageSpaceHorizontalSignMayBeCalledAnatomicalLaterality: false as const,
    plausibilityClassification: null,
    lateralZoneThresholdApplied: false as const,
    anatomicalLateralityAssigned: false as const,
    validatedExternalEarObservation: false as const,
  });
}
