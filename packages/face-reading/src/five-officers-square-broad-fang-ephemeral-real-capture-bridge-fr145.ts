import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  runGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
  type MediaPipeMetricGeometryRuntimeRequestFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  projectIssuedGovernedMetricGeometryToLipsSurfaceFR78,
  type GovernedMetricLipsSurfaceFR78V1,
} from './governed-metric-lips-surface-fr78.js';
import {
  projectMetricLipsSurfaceToPoseNormalized2DFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  computeSquareBroadNeutralShapeMetricsFR134,
  type SquareBroadNeutralShapeMetricRuntimeFR134V1,
} from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import type { SquareBroadConstructValidityCaptureIdentityFR135V1 } from './five-officers-square-broad-construct-validity-dataset-acquisition-fr135.js';
import {
  computeSquareBroadFangNeutralCandidateMetricsFR142,
  type SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  assertIssuedSquareBroadFangNeutralCaptureRecordFR144,
  recordSquareBroadFangNeutralCaptureFR144,
  type SquareBroadFangNeutralCaptureRecordFR144V1,
} from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';
import {
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR145_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr145-square-broad-fang-ephemeral-real-capture-bridge.md' as const;
export const FR145_NEXT_FRONTIER =
  'square_broad_fang_repeated_governed_real_capture_acquisition_without_semantic_labels' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUEST_KEYS = new Set([
  'schemaVersion',
  'acquisitionRunRef',
  'providerRunRef',
  'identity',
  'imageBlob',
  'geometryMetadataPbtxt',
  'parity',
]);

export interface EphemeralDecodedImageFR145V1 {
  readonly image: unknown;
  readonly width: number;
  readonly height: number;
  readonly release: () => void;
}

export interface EphemeralImageDecoderFR145V1 {
  readonly decode: (blob: Blob) => Promise<EphemeralDecodedImageFR145V1>;
}

export interface SquareBroadFangEphemeralRealCaptureRequestFR145V1 {
  readonly schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-request-v1';
  readonly acquisitionRunRef: string;
  readonly providerRunRef: string;
  readonly identity: SquareBroadConstructValidityCaptureIdentityFR135V1;
  readonly imageBlob: Blob;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
}

export interface SquareBroadFangEphemeralRealCaptureResultFR145V1 {
  readonly schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'ephemeral_real_capture_neutral_metrics_materialized_no_semantic_promotion';
  readonly acquisitionRunRef: string;
  readonly captureRef: string;
  readonly providerRunRef: string;
  readonly faceDetected: true;
  readonly providerLandmarkCount: 478;
  readonly governedMetricLandmarkCount: 468;
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly intake: {
    readonly mode: 'single_ephemeral_browser_image';
    readonly sourceBytesPersisted: false;
    readonly browserDecodedImagePersisted: false;
  };
  readonly quality: {
    readonly captureQualityValidated: false;
    readonly qualityAuthority: 'not_assessed_by_fr145';
  };
  readonly poseNormalization: {
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly poseCompensated: true;
    readonly depthOutputIssued: false;
  };
  readonly lipContours: {
    readonly contourCount: 2;
    readonly contourPointCounts: readonly [20, 20];
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
    readonly anatomicalRoleAssigned: false;
    readonly traditionalRoleAssigned: false;
  };
  readonly fr134: {
    readonly metricValues: SquareBroadNeutralShapeMetricRuntimeFR134V1['metricValues'];
  };
  readonly fr142: {
    readonly metricValues: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1['metricValues'];
  };
  readonly fr144: {
    readonly acquisitionValidation: 'PASS';
    readonly captureRecord: SquareBroadFangNeutralCaptureRecordFR144V1;
  };
  readonly persistencePolicy: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR145_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR145_NEXT_FRONTIER;
}

export interface SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 {
  readonly decoder: EphemeralImageDecoderFR145V1;
  readonly runtimeFactory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
  readonly runMetricGeometry: (
    request: MediaPipeMetricGeometryRuntimeRequestFR77V1,
    parity: MediaPipeScreenToMetricReimplementationParityFR76V1,
    factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  ) => Promise<GovernedMetricGeometryCandidateFR77V1>;
  readonly projectLips: (source: GovernedMetricGeometryCandidateFR77V1) => GovernedMetricLipsSurfaceFR78V1;
  readonly projectPoseNormalized: (source: GovernedMetricLipsSurfaceFR78V1) => PoseNormalizedLipsGeometryFR79V1;
  readonly computeFR134: (source: PoseNormalizedLipsGeometryFR79V1) => SquareBroadNeutralShapeMetricRuntimeFR134V1;
  readonly computeFR142: (source: PoseNormalizedLipsGeometryFR79V1) => SquareBroadFangNeutralCandidateMetricRuntimeFR142V1;
  readonly recordFR144: (
    runtime: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
    identity: SquareBroadConstructValidityCaptureIdentityFR135V1,
  ) => SquareBroadFangNeutralCaptureRecordFR144V1;
  readonly assertFR144Record: (record: SquareBroadFangNeutralCaptureRecordFR144V1) => void;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-145 ${message}`);
}

function opaqueRef(value: string, label: string): string {
  if (!SAFE_REF.test(value)) fail(`${label} must be a bounded opaque reference without whitespace.`);
  return value;
}

function validateBlob(value: Blob): void {
  if (
    typeof value !== 'object'
    || value === null
    || typeof value.size !== 'number'
    || !Number.isFinite(value.size)
    || value.size <= 0
    || typeof value.arrayBuffer !== 'function'
  ) fail('imageBlob must be a non-empty in-memory Blob-like image source.');
}

function validateRequest(request: SquareBroadFangEphemeralRealCaptureRequestFR145V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  const unexpected = Object.keys(request).find((key) => !REQUEST_KEYS.has(key));
  if (unexpected !== undefined) fail(`request contains unauthorized field: ${unexpected}.`);
  if (request.schemaVersion !== 'fr145-square-broad-fang-ephemeral-real-capture-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  opaqueRef(request.acquisitionRunRef, 'acquisitionRunRef');
  opaqueRef(request.providerRunRef, 'providerRunRef');
  if (typeof request.identity !== 'object' || request.identity === null) fail('identity must be present.');
  const identityKeys = new Set(['researchSubjectRef', 'captureSeriesRef', 'captureRef']);
  const unexpectedIdentity = Object.keys(request.identity).find((key) => !identityKeys.has(key));
  if (unexpectedIdentity !== undefined) fail(`identity contains unauthorized field: ${unexpectedIdentity}.`);
  opaqueRef(request.identity.researchSubjectRef, 'researchSubjectRef');
  opaqueRef(request.identity.captureSeriesRef, 'captureSeriesRef');
  opaqueRef(request.identity.captureRef, 'captureRef');
  validateBlob(request.imageBlob);
  if (typeof request.geometryMetadataPbtxt !== 'string' || request.geometryMetadataPbtxt.length === 0) {
    fail('geometryMetadataPbtxt must be a non-empty release-exact metadata string.');
  }
  validateMediaPipeScreenToMetricReimplementationParityFR76(request.parity);
}

async function sha256(blob: Blob): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) fail('Web Crypto SubtleCrypto is required for ephemeral image digesting.');
  const bytes = await blob.arrayBuffer();
  const digest = await subtle.digest('SHA-256', bytes);
  const hex = Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
  return `sha256:${hex}`;
}

export const DEFAULT_EPHEMERAL_IMAGE_DECODER_FR145: EphemeralImageDecoderFR145V1 = Object.freeze({
  async decode(blob: Blob): Promise<EphemeralDecodedImageFR145V1> {
    validateBlob(blob);
    if (typeof URL?.createObjectURL !== 'function' || typeof URL?.revokeObjectURL !== 'function') {
      fail('browser object-URL lifecycle is unavailable.');
    }
    if (typeof Image !== 'function') fail('HTMLImageElement constructor is unavailable.');

    const objectUrl = URL.createObjectURL(blob);
    let released = false;
    const release = (): void => {
      if (released) return;
      URL.revokeObjectURL(objectUrl);
      released = true;
    };

    try {
      const image = new Image();
      image.src = objectUrl;
      await image.decode();
      if (!Number.isInteger(image.naturalWidth) || image.naturalWidth <= 0) fail('decoded image width must be positive.');
      if (!Number.isInteger(image.naturalHeight) || image.naturalHeight <= 0) fail('decoded image height must be positive.');
      return Object.freeze({
        image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        release,
      });
    } catch (error) {
      release();
      throw error;
    }
  },
});

export const DEFAULT_SQUARE_BROAD_FANG_EPHEMERAL_REAL_CAPTURE_DEPENDENCIES_FR145:
SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 = Object.freeze({
  decoder: DEFAULT_EPHEMERAL_IMAGE_DECODER_FR145,
  runtimeFactory: DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  runMetricGeometry: runGovernedMetricGeometryFR77,
  projectLips: projectIssuedGovernedMetricGeometryToLipsSurfaceFR78,
  projectPoseNormalized: projectMetricLipsSurfaceToPoseNormalized2DFR79,
  computeFR134: computeSquareBroadNeutralShapeMetricsFR134,
  computeFR142: computeSquareBroadFangNeutralCandidateMetricsFR142,
  recordFR144: recordSquareBroadFangNeutralCaptureFR144,
  assertFR144Record: assertIssuedSquareBroadFangNeutralCaptureRecordFR144,
});

export async function runSquareBroadFangEphemeralRealCaptureFR145(
  request: SquareBroadFangEphemeralRealCaptureRequestFR145V1,
  dependencies: SquareBroadFangEphemeralRealCaptureDependenciesFR145V1 =
    DEFAULT_SQUARE_BROAD_FANG_EPHEMERAL_REAL_CAPTURE_DEPENDENCIES_FR145,
): Promise<SquareBroadFangEphemeralRealCaptureResultFR145V1> {
  validateRequest(request);
  const canonicalAssetDigest = await sha256(request.imageBlob);
  const decoded = await dependencies.decoder.decode(request.imageBlob);

  try {
    if (!Number.isInteger(decoded.width) || decoded.width <= 0 || !Number.isInteger(decoded.height) || decoded.height <= 0) {
      fail('decoder returned invalid natural dimensions.');
    }
    if (decoded.image === null || decoded.image === undefined) fail('decoder returned no in-memory image source.');
    if (typeof decoded.release !== 'function') fail('decoder must expose release() for deterministic cleanup.');

    const geometry = await dependencies.runMetricGeometry({
      schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
      providerRunRef: request.providerRunRef,
      canonicalAssetDigest,
      image: decoded.image,
      frameWidth: decoded.width,
      frameHeight: decoded.height,
      geometryMetadataPbtxt: request.geometryMetadataPbtxt,
    }, request.parity, dependencies.runtimeFactory);

    const lips = dependencies.projectLips(geometry);
    const poseNormalized = dependencies.projectPoseNormalized(lips);
    const fr134 = dependencies.computeFR134(poseNormalized);
    const fr142 = dependencies.computeFR142(poseNormalized);
    const captureRecord = dependencies.recordFR144(fr142, request.identity);
    dependencies.assertFR144Record(captureRecord);

    if (
      geometry.provider.providerLandmarkCount !== 478
      || geometry.metricLandmarks.length !== 468
      || poseNormalized.coordinateFrame !== 'pose_normalized_face_2d'
      || poseNormalized.poseCompensated !== true
      || poseNormalized.depthOutputIssued !== false
      || poseNormalized.contourCount !== 2
      || poseNormalized.contours.length !== 2
      || poseNormalized.contourPointCounts[0] !== 20
      || poseNormalized.contourPointCounts[1] !== 20
      || poseNormalized.contourConsumptionState !== 'unordered_set_no_outer_inner_role'
      || poseNormalized.contours.some((contour) => contour.anatomicalRole !== null || contour.traditionalRole !== null)
    ) fail('governed geometry or role-invariant pose-normalized lips boundary drift.');

    if (
      captureRecord.privacyBoundary.rawImageStored !== false
      || captureRecord.privacyBoundary.sourceImageContentStored !== false
      || captureRecord.privacyBoundary.rawProviderResponseStored !== false
      || captureRecord.privacyBoundary.faceEmbeddingStored !== false
      || captureRecord.privacyBoundary.identityTemplateStored !== false
      || captureRecord.semanticBoundary.humanSemanticLabel !== null
      || captureRecord.semanticBoundary.traditionalClassLabel !== null
      || captureRecord.traditionalSemanticAuthority !== false
    ) fail('FR-144 privacy or semantic boundary widened during real-capture bridging.');

    return Object.freeze({
      schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-result-v1' as const,
      artifactVersion: '0.1.0' as const,
      authorityState: 'ephemeral_real_capture_neutral_metrics_materialized_no_semantic_promotion' as const,
      acquisitionRunRef: request.acquisitionRunRef,
      captureRef: request.identity.captureRef,
      providerRunRef: request.providerRunRef,
      faceDetected: true as const,
      providerLandmarkCount: 478 as const,
      governedMetricLandmarkCount: 468 as const,
      frame: Object.freeze({ width: decoded.width, height: decoded.height }),
      intake: Object.freeze({
        mode: 'single_ephemeral_browser_image' as const,
        sourceBytesPersisted: false as const,
        browserDecodedImagePersisted: false as const,
      }),
      quality: Object.freeze({
        captureQualityValidated: false as const,
        qualityAuthority: 'not_assessed_by_fr145' as const,
      }),
      poseNormalization: Object.freeze({
        coordinateFrame: 'pose_normalized_face_2d' as const,
        poseCompensated: true as const,
        depthOutputIssued: false as const,
      }),
      lipContours: Object.freeze({
        contourCount: 2 as const,
        contourPointCounts: Object.freeze([20, 20] as const),
        contourConsumptionState: 'unordered_set_no_outer_inner_role' as const,
        anatomicalRoleAssigned: false as const,
        traditionalRoleAssigned: false as const,
      }),
      fr134: Object.freeze({ metricValues: fr134.metricValues }),
      fr142: Object.freeze({ metricValues: fr142.metricValues }),
      fr144: Object.freeze({
        acquisitionValidation: 'PASS' as const,
        captureRecord,
      }),
      persistencePolicy: Object.freeze({
        rawImagePersisted: false as const,
        rawProviderResponsePersisted: false as const,
        embeddingPersisted: false as const,
        identityTemplatePersisted: false as const,
        derivedFullFaceMetricGeometryPersisted: false as const,
        derivedPoseNormalizedLipsGeometryPersisted: false as const,
      }),
      semanticAuthority: Object.freeze({
        constructValidity: 'unresolved' as const,
        traditionalBinding: 'unresolved' as const,
        criterionState: null,
        structuredClaim: null,
        boundedNarrative: null,
      }),
      traditionalSemanticAuthority: false as const,
      researchNoteRef: FR145_RESEARCH_NOTE_REF,
      nextFrontier: FR145_NEXT_FRONTIER,
    });
  } finally {
    decoded.release();
  }
}
