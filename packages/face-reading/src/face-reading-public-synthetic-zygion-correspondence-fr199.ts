import type { ProviderNormalizedLandmarkFrameFR61V1 } from './production-neutral-observation-provider-fr61.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR199_ZYGION_SOURCE_REPOSITORY =
  'research-digitized-rhinoplasty/3D-Facial-Landmark-Detection' as const;
export const FR199_ZYGION_SOURCE_COMMIT =
  'a31c73078616a492b6deed43b3620e04fe6e148d' as const;
export const FR199_MALE_DATASET_REPOSITORY =
  'research-digitized-rhinoplasty/3D-face-morph-dataset-male' as const;
export const FR199_MALE_DATASET_COMMIT =
  'c3417d0f71b3c37444f77085f0715bf0700333b6' as const;
export const FR199_FEMALE_DATASET_REPOSITORY =
  'research-digitized-rhinoplasty/3D-face-morph-dataset-female' as const;
export const FR199_FEMALE_DATASET_COMMIT =
  '804bbf72a0e377c1175a6a38fd1f833242b775b3' as const;
export const FR199_PROVIDER_INDICES = Object.freeze([234, 454] as const);

export const FR199_PUBLIC_CORPUS = Object.freeze([
  'male-23','male-27','male-32','male-33','male-34','male-35','male-36','male-39','male-45','male-47',
  'female-26','female-27','female-28','female-29','female-30','female-31','female-33','female-34','female-40','female-59',
] as const);

export interface Point3DFR199V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface IndependentZygionReferenceReceiptFR199V1 {
  readonly schemaVersion: 'fr199-independent-zygion-reference-v1';
  readonly authorityState: 'independent_reference_descriptive_only';
  readonly sampleId: string;
  readonly sourceAlgorithm: {
    readonly repository: typeof FR199_ZYGION_SOURCE_REPOSITORY;
    readonly commit: typeof FR199_ZYGION_SOURCE_COMMIT;
    readonly implementationMode: 'source_exact_first_width_band';
    readonly sourceExactControlFlowQuirkPreserved: true;
  };
  readonly sourceAsset: {
    readonly repository: typeof FR199_MALE_DATASET_REPOSITORY | typeof FR199_FEMALE_DATASET_REPOSITORY;
    readonly commit: typeof FR199_MALE_DATASET_COMMIT | typeof FR199_FEMALE_DATASET_COMMIT;
    readonly objPath: string;
    readonly objDigest: string;
  };
  readonly pronasale: Point3DFR199V1;
  readonly bilateralReference: readonly [Point3DFR199V1, Point3DFR199V1];
  readonly providerCandidateVisibleDuringDerivation: false;
  readonly frozenBeforeProviderExecution: true;
  readonly providerIndexAdmissionAuthorized: false;
}

export interface DescriptiveZygionCorrespondenceReceiptFR199V1 {
  readonly schemaVersion: 'fr199-descriptive-zygion-correspondence-v1';
  readonly authorityState: 'descriptive_correspondence_only';
  readonly sampleId: string;
  readonly reference: IndependentZygionReferenceReceiptFR199V1;
  readonly provider: {
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly candidateIndices: typeof FR199_PROVIDER_INDICES;
    readonly unorderedCandidatePair: readonly [
      Readonly<{ index: 234; x: number; y: number }>,
      Readonly<{ index: 454; x: number; y: number }>,
    ];
    readonly anatomicalSideAssignment: null;
  };
  readonly coordinateFrameCorrespondenceResolved: false;
  readonly numericDistanceAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly bizygomaticMetricAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionAuthorized: false;
  readonly commerceAuthorized: false;
  readonly providerIndexAdmissionAuthorized: false;
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAMPLE_ID = /^(?:male|female)-\d{2}$/u;

function finitePoint(point: Point3DFR199V1, path: string): void {
  if (![point.x, point.y, point.z].every(Number.isFinite)) {
    throw new FaceAuthorityValidationError(`${path} must contain finite XYZ coordinates.`);
  }
}

export function parseObjVerticesFR199(objText: string): readonly Point3DFR199V1[] {
  if (typeof objText !== 'string' || objText.length === 0) {
    throw new FaceAuthorityValidationError('FR199 OBJ source must be a non-empty string.');
  }
  const vertices: Point3DFR199V1[] = [];
  for (const line of objText.split(/\r?\n/u)) {
    if (!line.startsWith('v ')) continue;
    const parts = line.trim().split(/\s+/u);
    if (parts.length < 4) {
      throw new FaceAuthorityValidationError('FR199 OBJ vertex row is incomplete.');
    }
    const point = Object.freeze({ x: Number(parts[1]), y: Number(parts[2]), z: Number(parts[3]) });
    finitePoint(point, 'FR199 OBJ vertex');
    vertices.push(point);
  }
  if (vertices.length === 0) {
    throw new FaceAuthorityValidationError('FR199 OBJ contains no geometric vertices.');
  }
  return Object.freeze(vertices);
}

export function derivePronasaleSourceExactFR199(
  vertices: readonly Point3DFR199V1[],
): Point3DFR199V1 {
  if (vertices.length === 0) {
    throw new FaceAuthorityValidationError('FR199 pronasale derivation requires vertices.');
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const vertex of vertices) {
    finitePoint(vertex, 'FR199 pronasale vertex');
    minX = Math.min(minX, vertex.x);
    maxX = Math.max(maxX, vertex.x);
    minY = Math.min(minY, vertex.y);
    maxY = Math.max(maxY, vertex.y);
  }
  const maxDifference = 40;
  const section = vertices.filter((vertex) =>
    vertex.x > ((maxX + minX) / 2) - maxDifference &&
    vertex.x < ((maxX + minX) / 2) + maxDifference &&
    vertex.y > ((maxY + minY) / 3) - maxDifference &&
    vertex.y < ((maxY + minY) / 3) + maxDifference
  );
  if (section.length === 0) {
    throw new FaceAuthorityValidationError('FR199 source-exact pronasale section is empty.');
  }
  return Object.freeze([...section].sort((a, b) => a.z - b.z).at(-1)!);
}

export function deriveZygionSourceExactFR199(
  vertices: readonly Point3DFR199V1[],
): Readonly<{ pronasale: Point3DFR199V1; bilateral: readonly [Point3DFR199V1, Point3DFR199V1] }> {
  const pronasale = derivePronasaleSourceExactFR199(vertices);

  // Exact notebook constants and first-iteration behavior. The upstream implementation
  // initializes zygion before checking "'zygion' in locals()", therefore it returns
  // after this first width band. FR199 intentionally preserves that behavior.
  const maxHeight = 10;
  const maxDepth = 100;
  const std = 5;
  const currentMinWidth = 55 - (std / 2);
  const currentMaxWidth = 55 + (std / 2);

  const left = vertices
    .filter((vertex) =>
      vertex.x > pronasale.x + currentMinWidth &&
      vertex.x < pronasale.x + currentMaxWidth &&
      vertex.y > pronasale.y &&
      vertex.y < pronasale.y + maxHeight &&
      vertex.z < pronasale.z &&
      vertex.z > pronasale.z - maxDepth
    )
    .sort((a, b) => (a.x + a.y) - (b.x + b.y));

  const right = vertices
    .filter((vertex) =>
      vertex.x < pronasale.x - currentMinWidth &&
      vertex.x > pronasale.x - currentMaxWidth &&
      vertex.y > pronasale.y &&
      vertex.y < pronasale.y + maxHeight &&
      vertex.z < pronasale.z &&
      vertex.z > pronasale.z - maxDepth
    )
    .sort((a, b) => (a.x - a.y) - (b.x - b.y));

  const sourceExactReturn: Point3DFR199V1[] = [];
  if (left.length > 0) sourceExactReturn.push(left.at(-1)!);
  if (right.length > 0) sourceExactReturn.push(right[0]!);

  if (sourceExactReturn.length !== 2) {
    throw new FaceAuthorityValidationError(
      `FR199 source-exact zygion returned ${sourceExactReturn.length} coordinate(s); exactly two are required. The published first-band control flow is preserved and fails closed.`,
    );
  }

  return Object.freeze({
    pronasale,
    bilateral: Object.freeze([
      Object.freeze(sourceExactReturn[0]!),
      Object.freeze(sourceExactReturn[1]!),
    ] as const),
  });
}

export function deriveAndFreezeIndependentZygionReferenceFR199(input: {
  readonly sampleId: string;
  readonly objText: string;
  readonly objDigest: string;
}): IndependentZygionReferenceReceiptFR199V1 {
  if (!SAMPLE_ID.test(input.sampleId) || !FR199_PUBLIC_CORPUS.includes(input.sampleId as (typeof FR199_PUBLIC_CORPUS)[number])) {
    throw new FaceAuthorityValidationError('FR199 sampleId must belong to the pinned 20-sample public corpus.');
  }
  if (!SHA256.test(input.objDigest)) {
    throw new FaceAuthorityValidationError('FR199 objDigest must be sha256:<64 lowercase hex>.');
  }
  const isMale = input.sampleId.startsWith('male-');
  const sourceAsset = Object.freeze({
    repository: isMale ? FR199_MALE_DATASET_REPOSITORY : FR199_FEMALE_DATASET_REPOSITORY,
    commit: isMale ? FR199_MALE_DATASET_COMMIT : FR199_FEMALE_DATASET_COMMIT,
    objPath: `3D-models/${input.sampleId}.obj`,
    objDigest: input.objDigest,
  });
  const derived = deriveZygionSourceExactFR199(parseObjVerticesFR199(input.objText));
  return Object.freeze({
    schemaVersion: 'fr199-independent-zygion-reference-v1' as const,
    authorityState: 'independent_reference_descriptive_only' as const,
    sampleId: input.sampleId,
    sourceAlgorithm: Object.freeze({
      repository: FR199_ZYGION_SOURCE_REPOSITORY,
      commit: FR199_ZYGION_SOURCE_COMMIT,
      implementationMode: 'source_exact_first_width_band' as const,
      sourceExactControlFlowQuirkPreserved: true as const,
    }),
    sourceAsset,
    pronasale: derived.pronasale,
    bilateralReference: derived.bilateral,
    providerCandidateVisibleDuringDerivation: false as const,
    frozenBeforeProviderExecution: true as const,
    providerIndexAdmissionAuthorized: false as const,
  });
}

export function issueDescriptiveZygionCorrespondenceFR199(
  reference: IndependentZygionReferenceReceiptFR199V1,
  providerFrame: ProviderNormalizedLandmarkFrameFR61V1,
): DescriptiveZygionCorrespondenceReceiptFR199V1 {
  if (!Object.isFrozen(reference) || !Object.isFrozen(reference.bilateralReference)) {
    throw new FaceAuthorityValidationError('FR199 reference must be frozen before provider execution.');
  }
  if (providerFrame.runtimePackageName !== '@mediapipe/tasks-vision' || providerFrame.runtimePackageVersion !== '0.10.35') {
    throw new FaceAuthorityValidationError('FR199 provider stage requires exact @mediapipe/tasks-vision 0.10.35.');
  }
  if (providerFrame.providerOrderedPoints.length <= 454) {
    throw new FaceAuthorityValidationError('FR199 provider frame does not contain indices 234 and 454.');
  }
  const p234 = providerFrame.providerOrderedPoints[234]!;
  const p454 = providerFrame.providerOrderedPoints[454]!;
  if (![p234.x,p234.y,p454.x,p454.y].every(Number.isFinite)) {
    throw new FaceAuthorityValidationError('FR199 provider candidate coordinates must be finite.');
  }
  return Object.freeze({
    schemaVersion: 'fr199-descriptive-zygion-correspondence-v1' as const,
    authorityState: 'descriptive_correspondence_only' as const,
    sampleId: reference.sampleId,
    reference,
    provider: Object.freeze({
      runtimePackageName: '@mediapipe/tasks-vision' as const,
      runtimePackageVersion: '0.10.35' as const,
      providerRunRef: providerFrame.providerRunRef,
      canonicalAssetDigest: providerFrame.canonicalAssetDigest,
      candidateIndices: FR199_PROVIDER_INDICES,
      unorderedCandidatePair: Object.freeze([
        Object.freeze({ index: 234 as const, x: p234.x, y: p234.y }),
        Object.freeze({ index: 454 as const, x: p454.x, y: p454.y }),
      ] as const),
      anatomicalSideAssignment: null,
    }),
    coordinateFrameCorrespondenceResolved: false as const,
    numericDistanceAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    bizygomaticMetricAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionAuthorized: false as const,
    commerceAuthorized: false as const,
    providerIndexAdmissionAuthorized: false as const,
  });
}
