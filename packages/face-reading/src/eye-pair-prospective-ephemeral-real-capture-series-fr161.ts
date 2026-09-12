import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  runGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
  type MediaPipeMetricGeometryRuntimeRequestFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  computeRoleInvariantEyePairNeutralShapeMetricsFR158,
  type RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1,
} from './role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';
import {
  admitEyePairProspectiveCaptureManifestFR159,
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
  type EyePairProspectiveCaptureManifestFR159V1,
} from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  assertIssuedEyePairProspectiveAcquisitionDatasetFR160,
  materializeEyePairProspectiveAcquisitionDatasetFR160,
  recordEyePairProspectiveAcquisitionFR160,
  type EyePairProspectiveAcquisitionDatasetFR160V1,
  type EyePairProspectiveAcquisitionRecordFR160V1,
} from './eye-pair-prospective-acquisition-runtime-fr160.js';
import {
  DEFAULT_EPHEMERAL_IMAGE_DECODER_FR145,
  type EphemeralImageDecoderFR145V1,
} from './five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR161_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_RECORD_ID =
  'research.face_reading.neutral.eye_pair.prospective_ephemeral_real_capture_series.fr161' as const;
export const FR161_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr161-eye-pair-prospective-ephemeral-real-capture-series.md' as const;
export const FR161_NEXT_FRONTIER =
  'execute_distinct_fresh_post_preregistration_capture_series_then_describe_observed_within_series_variation_without_repeatability_threshold_identity_or_semantic_promotion' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUEST_KEYS = new Set([
  'schemaVersion',
  'acquisitionRunRef',
  'prospectiveCollectionRef',
  'captureSeriesRef',
  'captureConditionRef',
  'postPreregistrationFreshCaptureAttested',
  'sameParticipantSeriesAttested',
  'captures',
  'geometryMetadataPbtxt',
  'parity',
]);
const CAPTURE_KEYS = new Set(['captureRef', 'providerRunRef', 'captureSequenceIndex', 'imageBlob']);
const RESULT_ISSUED = new WeakSet<object>();

export interface EyePairProspectiveEphemeralCaptureInputFR161V1 {
  readonly captureRef: string;
  readonly providerRunRef: string;
  readonly captureSequenceIndex: number;
  readonly imageBlob: Blob;
}

export interface EyePairProspectiveEphemeralRealCaptureSeriesRequestFR161V1 {
  readonly schemaVersion: 'fr161-eye-pair-prospective-ephemeral-real-capture-series-request-v1';
  readonly acquisitionRunRef: string;
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureConditionRef: string;
  readonly postPreregistrationFreshCaptureAttested: boolean;
  readonly sameParticipantSeriesAttested: boolean;
  readonly captures: readonly EyePairProspectiveEphemeralCaptureInputFR161V1[];
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
}

export interface EyePairProspectiveEphemeralCaptureResultFR161V1 {
  readonly captureRef: string;
  readonly providerRunRef: string;
  readonly captureSequenceIndex: number;
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly providerLandmarkCount: 478;
  readonly governedMetricLandmarkCount: 468;
  readonly fr159Manifest: EyePairProspectiveCaptureManifestFR159V1;
  readonly fr160Record: EyePairProspectiveAcquisitionRecordFR160V1;
}

export interface EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1 {
  readonly schemaVersion: 'fr161-eye-pair-prospective-ephemeral-real-capture-series-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR161_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_RECORD_ID;
  readonly authorityState: 'ephemeral_prospective_real_capture_series_descriptive_only';
  readonly acquisitionRunRef: string;
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureConditionRef: string;
  readonly captureCount: number;
  readonly captures: readonly EyePairProspectiveEphemeralCaptureResultFR161V1[];
  readonly dataset: EyePairProspectiveAcquisitionDatasetFR160V1;
  readonly intakeBoundary: {
    readonly minimumDistinctSourceByteCapturesRequired: 2;
    readonly exactDuplicateSourceBytesRejectedBeforeProviderExecution: true;
    readonly sourceDigestPersistedOrReturned: false;
    readonly byteDistinctnessMeansIndependentCaptureEvent: false;
    readonly freshnessAttestationMeansIndependentFreshnessProof: false;
    readonly sameParticipantAttestationMeansIdentityProof: false;
  };
  readonly metricBoundary: {
    readonly preregisteredMetricRefs: readonly [typeof FR159_X_SPAN_METRIC_REF, typeof FR159_PERIMETER_METRIC_REF];
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly repeatabilityPassFailIssued: false;
    readonly captureSensitivityPassFailIssued: false;
    readonly numericRepeatabilityAcceptanceThreshold: null;
    readonly numericCaptureQualityThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly sourceDigestPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityValidated: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly identityMatchingPerformed: false;
    readonly sameDifferentParticipantClassificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdIssued: false;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR161_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR161_NEXT_FRONTIER;
}

export interface EyePairProspectiveEphemeralRealCaptureDependenciesFR161V1 {
  readonly decoder: EphemeralImageDecoderFR145V1;
  readonly runtimeFactory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
  readonly runMetricGeometry: (
    request: MediaPipeMetricGeometryRuntimeRequestFR77V1,
    parity: MediaPipeScreenToMetricReimplementationParityFR76V1,
    factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  ) => Promise<GovernedMetricGeometryCandidateFR77V1>;
  readonly computeFR158: (
    geometry: GovernedMetricGeometryCandidateFR77V1,
  ) => RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1;
  readonly admitFR159: typeof admitEyePairProspectiveCaptureManifestFR159;
  readonly recordFR160: typeof recordEyePairProspectiveAcquisitionFR160;
  readonly materializeFR160: typeof materializeEyePairProspectiveAcquisitionDatasetFR160;
}

export const DEFAULT_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_DEPENDENCIES_FR161:
EyePairProspectiveEphemeralRealCaptureDependenciesFR161V1 = Object.freeze({
  decoder: DEFAULT_EPHEMERAL_IMAGE_DECODER_FR145,
  runtimeFactory: DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  runMetricGeometry: runGovernedMetricGeometryFR77,
  computeFR158: computeRoleInvariantEyePairNeutralShapeMetricsFR158,
  admitFR159: admitEyePairProspectiveCaptureManifestFR159,
  recordFR160: recordEyePairProspectiveAcquisitionFR160,
  materializeFR160: materializeEyePairProspectiveAcquisitionDatasetFR160,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-161 ${message}`);
}

export function assertIssuedEyePairProspectiveEphemeralRealCaptureSeriesFR161(
  result: EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1,
): void {
  if (!RESULT_ISSUED.has(result)) {
    fail('real-capture series result was not issued by the active FR-161 runtime.');
  }
  assertIssuedEyePairProspectiveAcquisitionDatasetFR160(result.dataset);
  if (
    result.schemaVersion !== 'fr161-eye-pair-prospective-ephemeral-real-capture-series-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR161_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_RECORD_ID
    || result.authorityState !== 'ephemeral_prospective_real_capture_series_descriptive_only'
    || !Number.isSafeInteger(result.captureCount)
    || result.captureCount < 2
    || result.captures.length !== result.captureCount
    || result.intakeBoundary.minimumDistinctSourceByteCapturesRequired !== 2
    || result.intakeBoundary.exactDuplicateSourceBytesRejectedBeforeProviderExecution !== true
    || result.intakeBoundary.sourceDigestPersistedOrReturned !== false
    || result.intakeBoundary.byteDistinctnessMeansIndependentCaptureEvent !== false
    || result.intakeBoundary.freshnessAttestationMeansIndependentFreshnessProof !== false
    || result.intakeBoundary.sameParticipantAttestationMeansIdentityProof !== false
    || result.metricBoundary.preregisteredMetricRefs[0] !== FR159_X_SPAN_METRIC_REF
    || result.metricBoundary.preregisteredMetricRefs[1] !== FR159_PERIMETER_METRIC_REF
    || result.metricBoundary.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || result.metricBoundary.repeatabilityPassFailIssued !== false
    || result.metricBoundary.captureSensitivityPassFailIssued !== false
    || result.metricBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || result.metricBoundary.numericCaptureQualityThreshold !== null
    || result.privacyBoundary.rawImagePersisted !== false
    || result.privacyBoundary.rawProviderResponsePersisted !== false
    || result.privacyBoundary.rawLandmarkSetPersisted !== false
    || result.privacyBoundary.derivedFullFaceMetricGeometryPersisted !== false
    || result.privacyBoundary.sourceDigestPersisted !== false
    || result.privacyBoundary.faceEmbeddingPersisted !== false
    || result.privacyBoundary.identityTemplatePersisted !== false
    || result.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || result.authorityBoundary.captureQualityValidated !== false
    || result.authorityBoundary.captureQualityMeasurementConstructValidated !== false
    || result.authorityBoundary.identityMatchingPerformed !== false
    || result.authorityBoundary.sameDifferentParticipantClassificationIssued !== false
    || result.authorityBoundary.calibrationIssued !== false
    || result.authorityBoundary.thresholdIssued !== false
    || result.authorityBoundary.constructValidity !== 'unresolved'
    || result.authorityBoundary.traditionalBinding !== 'unresolved'
    || result.traditionalSemanticAuthority !== false
    || result.researchNoteRef !== FR161_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR161_NEXT_FRONTIER
  ) fail('issued real-capture series authority boundary drift.');
}

function opaqueRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded protocol-local opaque reference without whitespace.`);
  }
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
  ) fail('each imageBlob must be a non-empty in-memory Blob-like image source.');
}

function validateRequest(request: EyePairProspectiveEphemeralRealCaptureSeriesRequestFR161V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  const unexpected = Object.keys(request).find((key) => !REQUEST_KEYS.has(key));
  if (unexpected !== undefined) fail(`request contains unauthorized field: ${unexpected}.`);
  if (request.schemaVersion !== 'fr161-eye-pair-prospective-ephemeral-real-capture-series-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  opaqueRef(request.acquisitionRunRef, 'acquisitionRunRef');
  opaqueRef(request.prospectiveCollectionRef, 'prospectiveCollectionRef');
  opaqueRef(request.captureSeriesRef, 'captureSeriesRef');
  opaqueRef(request.captureConditionRef, 'captureConditionRef');
  if (request.postPreregistrationFreshCaptureAttested !== true) {
    fail('prospective execution requires explicit post-preregistration fresh-capture attestation.');
  }
  if (request.sameParticipantSeriesAttested !== true) {
    fail('prospective repeated-capture execution requires same-participant series attestation.');
  }
  if (!Array.isArray(request.captures) || request.captures.length < 2) {
    fail('prospective repeated-capture execution requires at least two capture inputs.');
  }
  if (typeof request.geometryMetadataPbtxt !== 'string' || request.geometryMetadataPbtxt.length === 0) {
    fail('geometryMetadataPbtxt must be a non-empty release-exact metadata string.');
  }
  validateMediaPipeScreenToMetricReimplementationParityFR76(request.parity);

  const captureRefs = new Set<string>();
  const providerRunRefs = new Set<string>();
  const sequenceIndices = new Set<number>();
  for (const capture of request.captures) {
    if (typeof capture !== 'object' || capture === null) fail('each capture input must be an object.');
    const unexpectedCaptureKey = Object.keys(capture).find((key) => !CAPTURE_KEYS.has(key));
    if (unexpectedCaptureKey !== undefined) fail(`capture input contains unauthorized field: ${unexpectedCaptureKey}.`);
    const captureRef = opaqueRef(capture.captureRef, 'captureRef');
    const providerRunRef = opaqueRef(capture.providerRunRef, 'providerRunRef');
    if (!Number.isSafeInteger(capture.captureSequenceIndex) || capture.captureSequenceIndex < 1) {
      fail('captureSequenceIndex must be a positive safe integer.');
    }
    validateBlob(capture.imageBlob);
    if (captureRefs.has(captureRef)) fail(`duplicate captureRef ${captureRef}.`);
    if (providerRunRefs.has(providerRunRef)) fail(`duplicate providerRunRef ${providerRunRef}.`);
    if (sequenceIndices.has(capture.captureSequenceIndex)) {
      fail(`duplicate captureSequenceIndex ${capture.captureSequenceIndex} within the series.`);
    }
    captureRefs.add(captureRef);
    providerRunRefs.add(providerRunRef);
    sequenceIndices.add(capture.captureSequenceIndex);
  }
}

async function sha256(blob: Blob): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) fail('Web Crypto SubtleCrypto is required for ephemeral duplicate-source detection.');
  const digest = await subtle.digest('SHA-256', await blob.arrayBuffer());
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
}

async function assertDistinctSourceBytes(
  captures: readonly EyePairProspectiveEphemeralCaptureInputFR161V1[],
): Promise<readonly string[]> {
  const digests = await Promise.all(captures.map((capture) => sha256(capture.imageBlob)));
  const seen = new Set<string>();
  for (const digest of digests) {
    if (seen.has(digest)) {
      fail('exact duplicate source-image bytes are not an independent repeated capture and are rejected before provider execution.');
    }
    seen.add(digest);
  }
  return digests;
}

export function getEyePairProspectiveEphemeralRealCaptureContractFR161() {
  return Object.freeze({
    schemaVersion: 'fr161-eye-pair-prospective-ephemeral-real-capture-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR161_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_RECORD_ID,
    predecessor: Object.freeze({
      requiredFr160SchemaVersion: 'fr160-eye-pair-prospective-acquisition-record-v1' as const,
      requiredFr159ManifestSchemaVersion: 'fr159-eye-pair-prospective-capture-manifest-v1' as const,
      requiredFr158RuntimeSchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1' as const,
      requiredFr77CoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      activeProviderPackage: '@mediapipe/tasks-vision' as const,
      activeProviderVersion: '0.10.35' as const,
    }),
    intake: Object.freeze({
      mode: 'browser_local_ephemeral_image_blob_series' as const,
      minimumDistinctSourceByteCapturesRequired: 2 as const,
      exactDuplicateSourceBytesRejectedBeforeProviderExecution: true as const,
      sourceDigestUsedEphemerallyForDuplicateCheck: true as const,
      sourceDigestPersistedOrReturned: false as const,
      byteDistinctnessMeansIndependentCaptureEvent: false as const,
      postPreregistrationFreshCaptureAttestationRequired: true as const,
      freshnessAttestationMeansIndependentFreshnessProof: false as const,
      sameParticipantSeriesAttestationRequired: true as const,
      sameParticipantAttestationMeansIdentityProof: false as const,
    }),
    execution: Object.freeze({
      governedPath: 'FR26_to_FR77_to_FR158_to_FR159_to_FR160' as const,
      preregisteredMetricRefs: Object.freeze([FR159_X_SPAN_METRIC_REF, FR159_PERIMETER_METRIC_REF] as const),
      primaryMetricCount: 2 as const,
      descriptiveSeriesConditionDatasetMaterialized: true as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      sourceDigestPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      realCaptureExecutionMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveRangeMeansRepeatabilityPass: false as const,
      descriptiveRangeMeansCaptureQualityValidated: false as const,
      byteDistinctnessMeansCaptureIndependenceProven: false as const,
      sameParticipantSeriesGroupingMeansIdentityMatching: false as const,
      identityMatchingPerformed: false as const,
      sameDifferentParticipantClassificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR161_RESEARCH_NOTE_REF,
    nextFrontier: FR161_NEXT_FRONTIER,
  });
}

export async function runEyePairProspectiveEphemeralRealCaptureSeriesFR161(
  request: EyePairProspectiveEphemeralRealCaptureSeriesRequestFR161V1,
  dependencies: EyePairProspectiveEphemeralRealCaptureDependenciesFR161V1 =
    DEFAULT_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_DEPENDENCIES_FR161,
): Promise<EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1> {
  validateRequest(request);

  // These digests exist only long enough to reject an exact byte-for-byte duplicate.
  // They are deliberately absent from every returned FR161/FR160 artifact.
  const sourceDigests = await assertDistinctSourceBytes(request.captures);
  const results: EyePairProspectiveEphemeralCaptureResultFR161V1[] = [];

  for (let index = 0; index < request.captures.length; index += 1) {
    const capture = request.captures[index]!;
    const decoded = await dependencies.decoder.decode(capture.imageBlob);
    try {
      if (!Number.isInteger(decoded.width) || decoded.width <= 0 || !Number.isInteger(decoded.height) || decoded.height <= 0) {
        fail('decoder returned invalid natural dimensions.');
      }
      if (decoded.image === null || decoded.image === undefined) fail('decoder returned no in-memory image source.');
      if (typeof decoded.release !== 'function') fail('decoder must expose release() for deterministic cleanup.');

      const geometry = await dependencies.runMetricGeometry({
        schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
        providerRunRef: capture.providerRunRef,
        canonicalAssetDigest: `sha256:${sourceDigests[index]!}`,
        image: decoded.image,
        frameWidth: decoded.width,
        frameHeight: decoded.height,
        geometryMetadataPbtxt: request.geometryMetadataPbtxt,
      }, request.parity, dependencies.runtimeFactory);

      if (
        geometry.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
        || geometry.provider.providerLandmarkCount !== 478
        || geometry.metricLandmarks.length !== 468
        || geometry.persistencePolicy.rawSourcePersisted !== false
        || geometry.persistencePolicy.rawProviderResponsePersisted !== false
        || geometry.persistencePolicy.derivedMetricGeometryPersisted !== false
      ) fail('governed FR-77 metric-geometry boundary drift during real-capture execution.');

      const metricRuntime = dependencies.computeFR158(geometry);
      const manifest = dependencies.admitFR159({
        prospectiveCollectionRef: request.prospectiveCollectionRef,
        captureSeriesRef: request.captureSeriesRef,
        captureRef: capture.captureRef,
        captureConditionRef: request.captureConditionRef,
        captureSequenceIndex: capture.captureSequenceIndex,
        postPreregistrationFreshCaptureAttested: true,
        sameParticipantSeriesAttested: true,
        usedForCandidateSelection: false,
        developmentCaptureReuse: false,
        identityMatchingPerformed: false,
      });
      const record = dependencies.recordFR160({
        manifest,
        metricRuntime,
        metricRuntimeCorrespondsToManifestCaptureAttested: true,
      });

      results.push(Object.freeze({
        captureRef: capture.captureRef,
        providerRunRef: capture.providerRunRef,
        captureSequenceIndex: capture.captureSequenceIndex,
        frame: Object.freeze({ width: decoded.width, height: decoded.height }),
        providerLandmarkCount: 478 as const,
        governedMetricLandmarkCount: 468 as const,
        fr159Manifest: manifest,
        fr160Record: record,
      }));
    } finally {
      decoded.release();
    }
  }

  const dataset = dependencies.materializeFR160(results.map((result) => result.fr160Record));
  if (
    dataset.observedCaptureCount !== request.captures.length
    || dataset.prospectiveCollectionRef !== request.prospectiveCollectionRef
    || dataset.execution.empiricalRepeatabilityEstablished !== false
    || dataset.execution.captureQualityValidated !== false
    || dataset.execution.numericRepeatabilityAcceptanceThreshold !== null
    || dataset.execution.numericCaptureQualityThreshold !== null
    || dataset.authorityBoundary.sameDifferentParticipantClassificationAllowed !== false
    || dataset.authorityBoundary.thresholdsIssued !== false
    || dataset.traditionalSemanticAuthority !== false
  ) fail('FR-160 descriptive dataset authority boundary drift during FR-161 execution.');

  const result: EyePairProspectiveEphemeralRealCaptureSeriesResultFR161V1 = Object.freeze({
    schemaVersion: 'fr161-eye-pair-prospective-ephemeral-real-capture-series-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR161_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_RECORD_ID,
    authorityState: 'ephemeral_prospective_real_capture_series_descriptive_only' as const,
    acquisitionRunRef: request.acquisitionRunRef,
    prospectiveCollectionRef: request.prospectiveCollectionRef,
    captureSeriesRef: request.captureSeriesRef,
    captureConditionRef: request.captureConditionRef,
    captureCount: results.length,
    captures: Object.freeze(results),
    dataset,
    intakeBoundary: Object.freeze({
      minimumDistinctSourceByteCapturesRequired: 2 as const,
      exactDuplicateSourceBytesRejectedBeforeProviderExecution: true as const,
      sourceDigestPersistedOrReturned: false as const,
      byteDistinctnessMeansIndependentCaptureEvent: false as const,
      freshnessAttestationMeansIndependentFreshnessProof: false as const,
      sameParticipantAttestationMeansIdentityProof: false as const,
    }),
    metricBoundary: Object.freeze({
      preregisteredMetricRefs: Object.freeze([FR159_X_SPAN_METRIC_REF, FR159_PERIMETER_METRIC_REF] as const),
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      sourceDigestPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      identityMatchingPerformed: false as const,
      sameDifferentParticipantClassificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR161_RESEARCH_NOTE_REF,
    nextFrontier: FR161_NEXT_FRONTIER,
  });
  RESULT_ISSUED.add(result);
  return result;
}
