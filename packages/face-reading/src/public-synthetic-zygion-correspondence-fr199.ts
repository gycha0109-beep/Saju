import type { ProviderNormalizedLandmarkFrameFR61V1 } from './production-neutral-observation-provider-fr61.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface Point3DFR199V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface ObjVertexParseFR199V1 {
  readonly schemaVersion: 'fr199-obj-vertex-parse-v1';
  readonly vertexCount: number;
  readonly vertices: readonly Point3DFR199V1[];
}

export type ZygionReferenceExecutionModeFR199V1 =
  | 'SOURCE_EXACT'
  | 'INTENDED_LOOP_REPAIR';

export interface ZygionReferenceDerivationFR199V1 {
  readonly schemaVersion: 'fr199-zygion-reference-derivation-v1';
  readonly executionMode: ZygionReferenceExecutionModeFR199V1;
  readonly executionStatus:
    | 'SOURCE_EXACT_COMPLETE'
    | 'SOURCE_EXACT_INCOMPLETE'
    | 'INTENDED_LOOP_REPAIR_COMPLETE'
    | 'INTENDED_LOOP_REPAIR_INCOMPLETE';
  readonly pronasale: Point3DFR199V1;
  readonly zygionCoordinates: readonly [Point3DFR199V1, Point3DFR199V1] | null;
  readonly attemptedMaxWidths: readonly number[];
}

export interface ZygionReferenceReceiptFR199V1 {
  readonly schemaVersion: 'fr199-zygion-reference-receipt-v1';
  readonly authorityState: 'independent_public_synthetic_reference_only';
  readonly sampleId: string;
  readonly objSource: string;
  readonly objDigest: string;
  readonly referenceMethod:
    | 'topsakal_2023_public_notebook_source_exact_v1'
    | 'topsakal_2023_public_notebook_intended_loop_repair_v1';
  readonly referenceMethodVersion: '1';
  readonly referenceExecutionMode: ZygionReferenceExecutionModeFR199V1;
  readonly referenceExecutionStatus: ZygionReferenceDerivationFR199V1['executionStatus'];
  readonly zygionCoordinates: readonly [Point3DFR199V1, Point3DFR199V1] | null;
  readonly providerEvidenceVisibleDuringReferenceDerivation: false;
  readonly providerIndexAdmissionAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionActivationAuthorized: false;
  readonly commerceActivationAuthorized: false;
}

export interface ProviderCandidatePointFR199V1 {
  readonly providerIndex: 234 | 454;
  readonly x: number;
  readonly y: number;
}

export interface ProviderCandidatePairFR199V1 {
  readonly schemaVersion: 'fr199-provider-candidate-pair-v1';
  readonly authorityState: 'provider_index_candidate_only';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly runtimePackageName: '@mediapipe/tasks-vision';
  readonly runtimePackageVersion: '0.10.35';
  readonly candidatePairSemantics: 'unordered_no_anatomical_laterality';
  readonly candidates: readonly [ProviderCandidatePointFR199V1, ProviderCandidatePointFR199V1];
  readonly provider234IsZygion: false;
  readonly provider454IsZygion: false;
  readonly providerIndexAdmissionAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionActivationAuthorized: false;
  readonly commerceActivationAuthorized: false;
}

export interface DescriptiveCorrespondenceFR199V1 {
  readonly schemaVersion: 'fr199-descriptive-correspondence-v1';
  readonly authorityState: 'descriptive_cross_frame_observation_only';
  readonly referenceFrame: 'public_obj_3d_model_coordinates';
  readonly providerFrame: 'canonical_image_normalized_2d';
  readonly bridge:
    | 'horizontal_order_only_assuming_public_model_x_axis_maps_to_frontal_image_horizontal_axis';
  readonly rawCrossFrameEuclideanDistanceComputed: false;
  readonly projectionCalibrationEstablished: false;
  readonly referenceHorizontalOrder: readonly [number, number];
  readonly providerHorizontalOrder: readonly [number, number];
  readonly providerCandidateIndicesInHorizontalOrder: readonly [234 | 454, 234 | 454];
  readonly correspondenceAdmissionAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionActivationAuthorized: false;
  readonly commerceActivationAuthorized: false;
}

const SOURCE_MAX_HEIGHT = 10;
const SOURCE_MAX_DEPTH = 100;
const SOURCE_STD = 5;
const SOURCE_CURRENT_MIN_WIDTH = 55 - SOURCE_STD / 2;
const SOURCE_INITIAL_MAX_WIDTH = 55 + SOURCE_STD / 2;
const SOURCE_MAX_WIDTH = 55 + 3 * SOURCE_STD;

const REFERENCE_RECEIPT_KEYS = new Set([
  'sampleId',
  'objSource',
  'objDigest',
  'referenceMethod',
  'referenceMethodVersion',
  'referenceExecutionMode',
  'referenceExecutionStatus',
  'zygionCoordinates',
]);

function finitePoint3(value: Point3DFR199V1, path: string): void {
  if (
    typeof value !== 'object' ||
    value === null ||
    !Number.isFinite(value.x) ||
    !Number.isFinite(value.y) ||
    !Number.isFinite(value.z)
  ) {
    throw new FaceAuthorityValidationError(`${path} must contain finite x/y/z coordinates.`);
  }
}

function freezePoint3(value: Point3DFR199V1): Point3DFR199V1 {
  finitePoint3(value, 'FR-199 point');
  return Object.freeze({ x: value.x, y: value.y, z: value.z });
}

export function parseObjVerticesFR199(source: string): ObjVertexParseFR199V1 {
  if (typeof source !== 'string' || source.length === 0) {
    throw new FaceAuthorityValidationError('FR-199 OBJ source must be non-empty text.');
  }

  const vertices: Point3DFR199V1[] = [];
  for (const line of source.split(/\r?\n/u)) {
    if (!line.startsWith('v ')) {
      continue;
    }
    const fields = line.trim().split(/\s+/u);
    if (fields.length < 4) {
      throw new FaceAuthorityValidationError('FR-199 OBJ vertex row must contain x/y/z.');
    }
    const point = {
      x: Number(fields[1]),
      y: Number(fields[2]),
      z: Number(fields[3]),
    };
    finitePoint3(point, 'FR-199 OBJ vertex');
    vertices.push(Object.freeze(point));
  }

  if (vertices.length === 0) {
    throw new FaceAuthorityValidationError('FR-199 OBJ source contains no finite vertex rows.');
  }

  return Object.freeze({
    schemaVersion: 'fr199-obj-vertex-parse-v1' as const,
    vertexCount: vertices.length,
    vertices: Object.freeze(vertices),
  });
}

export function findPronasaleTopsakalFR199(
  vertices: readonly Point3DFR199V1[],
): Point3DFR199V1 {
  if (vertices.length === 0) {
    throw new FaceAuthorityValidationError('FR-199 pronasale derivation requires vertices.');
  }
  vertices.forEach((vertex, index) => finitePoint3(vertex, `FR-199 vertices[${index}]`));

  const byY = [...vertices].sort((a, b) => a.y - b.y);
  const minY = byY[0]!.y;
  const maxY = byY[byY.length - 1]!.y;
  const byX = [...vertices].sort((a, b) => a.x - b.x);
  const minX = byX[0]!.x;
  const maxX = byX[byX.length - 1]!.x;
  const maxDifference = 40;

  const section = byX
    .filter(
      (vertex) =>
        vertex.x > (maxX + minX) / 2 - maxDifference &&
        vertex.x < (maxX + minX) / 2 + maxDifference &&
        vertex.y > (maxY + minY) / 3 - maxDifference &&
        vertex.y < (maxY + minY) / 3 + maxDifference,
    )
    .sort((a, b) => a.z - b.z);

  const pronasale = section[section.length - 1];
  if (pronasale === undefined) {
    throw new FaceAuthorityValidationError('FR-199 Topsakal pronasale section is empty.');
  }
  return freezePoint3(pronasale);
}

function selectZygionBandFR199(
  vertices: readonly Point3DFR199V1[],
  pronasale: Point3DFR199V1,
  currentMaxWidth: number,
): {
  readonly left: Point3DFR199V1 | null;
  readonly right: Point3DFR199V1 | null;
} {
  const leftSection = vertices
    .filter(
      (vertex) =>
        vertex.x > pronasale.x + SOURCE_CURRENT_MIN_WIDTH &&
        vertex.x < pronasale.x + currentMaxWidth &&
        vertex.y > pronasale.y &&
        vertex.y < pronasale.y + SOURCE_MAX_HEIGHT &&
        vertex.z < pronasale.z &&
        vertex.z > pronasale.z - SOURCE_MAX_DEPTH,
    )
    .sort((a, b) => a.x + a.y - (b.x + b.y));

  const rightSection = vertices
    .filter(
      (vertex) =>
        vertex.x < pronasale.x - SOURCE_CURRENT_MIN_WIDTH &&
        vertex.x > pronasale.x - currentMaxWidth &&
        vertex.y > pronasale.y &&
        vertex.y < pronasale.y + SOURCE_MAX_HEIGHT &&
        vertex.z < pronasale.z &&
        vertex.z > pronasale.z - SOURCE_MAX_DEPTH,
    )
    .sort((a, b) => a.x - a.y - (b.x - b.y));

  return Object.freeze({
    left:
      leftSection.length === 0
        ? null
        : freezePoint3(leftSection[leftSection.length - 1]!),
    right: rightSection.length === 0 ? null : freezePoint3(rightSection[0]!),
  });
}

export function deriveZygionReferenceSourceExactFR199(
  vertices: readonly Point3DFR199V1[],
): ZygionReferenceDerivationFR199V1 {
  const pronasale = findPronasaleTopsakalFR199(vertices);
  let currentMaxWidth = SOURCE_INITIAL_MAX_WIDTH;
  const attemptedMaxWidths: number[] = [];
  const zygion: Point3DFR199V1[] = [];

  while (currentMaxWidth < SOURCE_MAX_WIDTH) {
    attemptedMaxWidths.push(currentMaxWidth);
    const band = selectZygionBandFR199(vertices, pronasale, currentMaxWidth);
    if (band.left !== null) {
      zygion.push(band.left);
    }
    if (band.right !== null) {
      zygion.push(band.right);
    }

    // SOURCE_EXACT deliberately preserves the published notebook's
    // `if 'zygion' in locals(): return zygion` behavior. Because zygion is
    // initialized before the loop, the first width band always returns.
    const coordinates =
      zygion.length === 2
        ? (Object.freeze([zygion[0]!, zygion[1]!]) as readonly [
            Point3DFR199V1,
            Point3DFR199V1,
          ])
        : null;
    return Object.freeze({
      schemaVersion: 'fr199-zygion-reference-derivation-v1' as const,
      executionMode: 'SOURCE_EXACT' as const,
      executionStatus:
        coordinates === null
          ? ('SOURCE_EXACT_INCOMPLETE' as const)
          : ('SOURCE_EXACT_COMPLETE' as const),
      pronasale,
      zygionCoordinates: coordinates,
      attemptedMaxWidths: Object.freeze(attemptedMaxWidths),
    });
  }

  return Object.freeze({
    schemaVersion: 'fr199-zygion-reference-derivation-v1' as const,
    executionMode: 'SOURCE_EXACT' as const,
    executionStatus: 'SOURCE_EXACT_INCOMPLETE' as const,
    pronasale,
    zygionCoordinates: null,
    attemptedMaxWidths: Object.freeze(attemptedMaxWidths),
  });
}

export function deriveZygionReferenceIntendedLoopRepairFR199(
  vertices: readonly Point3DFR199V1[],
): ZygionReferenceDerivationFR199V1 {
  const pronasale = findPronasaleTopsakalFR199(vertices);
  let currentMaxWidth = SOURCE_INITIAL_MAX_WIDTH;
  const attemptedMaxWidths: number[] = [];

  while (currentMaxWidth < SOURCE_MAX_WIDTH) {
    attemptedMaxWidths.push(currentMaxWidth);
    const band = selectZygionBandFR199(vertices, pronasale, currentMaxWidth);
    if (band.left !== null && band.right !== null) {
      return Object.freeze({
        schemaVersion: 'fr199-zygion-reference-derivation-v1' as const,
        executionMode: 'INTENDED_LOOP_REPAIR' as const,
        executionStatus: 'INTENDED_LOOP_REPAIR_COMPLETE' as const,
        pronasale,
        zygionCoordinates: Object.freeze([band.left, band.right]) as readonly [
          Point3DFR199V1,
          Point3DFR199V1,
        ],
        attemptedMaxWidths: Object.freeze(attemptedMaxWidths),
      });
    }
    currentMaxWidth += SOURCE_STD / 2;
  }

  return Object.freeze({
    schemaVersion: 'fr199-zygion-reference-derivation-v1' as const,
    executionMode: 'INTENDED_LOOP_REPAIR' as const,
    executionStatus: 'INTENDED_LOOP_REPAIR_INCOMPLETE' as const,
    pronasale,
    zygionCoordinates: null,
    attemptedMaxWidths: Object.freeze(attemptedMaxWidths),
  });
}

export function freezeZygionReferenceReceiptFR199(
  input: Omit<
    ZygionReferenceReceiptFR199V1,
    | 'schemaVersion'
    | 'authorityState'
    | 'providerEvidenceVisibleDuringReferenceDerivation'
    | 'providerIndexAdmissionAuthorized'
    | 'thresholdAuthorized'
    | 'calibrationAuthorized'
    | 'classifierAuthorized'
    | 'traditionalProjectionAuthorized'
    | 'productionActivationAuthorized'
    | 'commerceActivationAuthorized'
  >,
): ZygionReferenceReceiptFR199V1 {
  const unexpected = Object.keys(input).find((key) => !REFERENCE_RECEIPT_KEYS.has(key));
  if (unexpected !== undefined) {
    throw new FaceAuthorityValidationError(
      `FR-199 reference receipt contains unauthorized field: ${unexpected}`,
    );
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/u.test(input.sampleId)) {
    throw new FaceAuthorityValidationError('FR-199 sampleId must be a bounded public sample id.');
  }
  if (!/^https:\/\//u.test(input.objSource)) {
    throw new FaceAuthorityValidationError('FR-199 objSource must be an HTTPS public source.');
  }
  if (!/^(?:sha256:[0-9a-f]{64}|git-sha1:[0-9a-f]{40})$/u.test(input.objDigest)) {
    throw new FaceAuthorityValidationError(
      'FR-199 objDigest must be sha256:<64 hex> or git-sha1:<40 hex>.',
    );
  }
  if (input.referenceMethodVersion !== '1') {
    throw new FaceAuthorityValidationError('FR-199 referenceMethodVersion must remain 1.');
  }
  if (
    (input.referenceExecutionMode === 'SOURCE_EXACT' &&
      input.referenceMethod !== 'topsakal_2023_public_notebook_source_exact_v1') ||
    (input.referenceExecutionMode === 'INTENDED_LOOP_REPAIR' &&
      input.referenceMethod !==
        'topsakal_2023_public_notebook_intended_loop_repair_v1')
  ) {
    throw new FaceAuthorityValidationError(
      'FR-199 reference method must match its explicit execution mode.',
    );
  }
  if (input.zygionCoordinates !== null) {
    finitePoint3(input.zygionCoordinates[0], 'FR-199 zygionCoordinates[0]');
    finitePoint3(input.zygionCoordinates[1], 'FR-199 zygionCoordinates[1]');
  }

  return Object.freeze({
    schemaVersion: 'fr199-zygion-reference-receipt-v1' as const,
    authorityState: 'independent_public_synthetic_reference_only' as const,
    ...input,
    zygionCoordinates:
      input.zygionCoordinates === null
        ? null
        : (Object.freeze([
            freezePoint3(input.zygionCoordinates[0]),
            freezePoint3(input.zygionCoordinates[1]),
          ]) as readonly [Point3DFR199V1, Point3DFR199V1]),
    providerEvidenceVisibleDuringReferenceDerivation: false as const,
    providerIndexAdmissionAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  });
}

export function extractProviderCandidatePairFR199(
  frame: ProviderNormalizedLandmarkFrameFR61V1,
): ProviderCandidatePairFR199V1 {
  if (
    frame.runtimePackageName !== '@mediapipe/tasks-vision' ||
    frame.runtimePackageVersion !== '0.10.35' ||
    frame.coordinateFrame !== 'canonical_image_normalized_2d'
  ) {
    throw new FaceAuthorityValidationError(
      'FR-199 provider frame must remain pinned to MediaPipe 0.10.35 normalized 2D.',
    );
  }
  const p234 = frame.providerOrderedPoints[234];
  const p454 = frame.providerOrderedPoints[454];
  if (p234 === undefined || p454 === undefined) {
    throw new FaceAuthorityValidationError(
      'FR-199 provider frame must contain indices 234 and 454.',
    );
  }

  return Object.freeze({
    schemaVersion: 'fr199-provider-candidate-pair-v1' as const,
    authorityState: 'provider_index_candidate_only' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    runtimePackageName: '@mediapipe/tasks-vision' as const,
    runtimePackageVersion: '0.10.35' as const,
    candidatePairSemantics: 'unordered_no_anatomical_laterality' as const,
    candidates: Object.freeze([
      Object.freeze({ providerIndex: 234 as const, x: p234.x, y: p234.y }),
      Object.freeze({ providerIndex: 454 as const, x: p454.x, y: p454.y }),
    ]) as readonly [ProviderCandidatePointFR199V1, ProviderCandidatePointFR199V1],
    provider234IsZygion: false as const,
    provider454IsZygion: false as const,
    providerIndexAdmissionAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  });
}

export function describeCrossFrameCorrespondenceFR199(
  reference: ZygionReferenceReceiptFR199V1,
  provider: ProviderCandidatePairFR199V1,
): DescriptiveCorrespondenceFR199V1 {
  if (reference.zygionCoordinates === null) {
    throw new FaceAuthorityValidationError(
      'FR-199 descriptive correspondence requires a complete frozen reference.',
    );
  }
  const referenceHorizontalOrder = [...reference.zygionCoordinates]
    .map((point) => point.x)
    .sort((a, b) => a - b) as [number, number];
  const providerHorizontal = [...provider.candidates].sort((a, b) => a.x - b.x);

  return Object.freeze({
    schemaVersion: 'fr199-descriptive-correspondence-v1' as const,
    authorityState: 'descriptive_cross_frame_observation_only' as const,
    referenceFrame: 'public_obj_3d_model_coordinates' as const,
    providerFrame: 'canonical_image_normalized_2d' as const,
    bridge:
      'horizontal_order_only_assuming_public_model_x_axis_maps_to_frontal_image_horizontal_axis' as const,
    rawCrossFrameEuclideanDistanceComputed: false as const,
    projectionCalibrationEstablished: false as const,
    referenceHorizontalOrder: Object.freeze(referenceHorizontalOrder) as readonly [
      number,
      number,
    ],
    providerHorizontalOrder: Object.freeze([
      providerHorizontal[0]!.x,
      providerHorizontal[1]!.x,
    ]) as readonly [number, number],
    providerCandidateIndicesInHorizontalOrder: Object.freeze([
      providerHorizontal[0]!.providerIndex,
      providerHorizontal[1]!.providerIndex,
    ]) as readonly [234 | 454, 234 | 454],
    correspondenceAdmissionAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  });
}
