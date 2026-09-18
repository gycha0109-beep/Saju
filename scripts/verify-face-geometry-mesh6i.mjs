import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { openMesh6HBrowserCamera } from '../.face-reading-dist/mesh6h-browser-camera-frame-source.js';
import {
  MESH6I_NEXT_FRONTIER,
  assertIssuedMesh6IManualBrowserCaptureResult,
  getMesh6IManualBrowserCaptureControllerContract,
  runMesh6IManualBrowserCaptureController,
} from '../.face-reading-dist/mesh6i-manual-browser-capture-controller.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/' + RELEASE_COMMIT;
const DIGEST = 'sha256:' + '8'.repeat(64);
const WITNESSES = Object.freeze({
  input: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
  }),
  metadata: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
  }),
});

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

async function expectAsyncFailure(label, callback) {
  try {
    await callback();
  } catch {
    return;
  }
  throw new Error('MESH6I expected fail-closed rejection: ' + label);
}

function gitBlobSha(bytes) {
  const prefix = Buffer.from('blob ' + bytes.length + '\0', 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(RAW_ROOT + '/' + witness.path, {
    headers: { 'user-agent': 'myeongha-mesh6i-verifier' },
  });
  if (!response.ok) throw new Error('MESH6I failed to fetch ' + witness.path + ': HTTP ' + response.status);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (gitBlobSha(bytes) !== witness.blobSha) throw new Error('MESH6I Git blob SHA mismatch: ' + witness.path);
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6I provider fixture contains non-finite XYZ.');
    landmarks.push({ x, y, z });
  }
  if (landmarks.length !== 478) throw new Error('MESH6I expected 478 provider landmarks; got ' + landmarks.length + '.');
  return landmarks;
}

function parityFactory(providerLandmarks) {
  return {
    async create() {
      return {
        detect() {
          return { faceLandmarks: [providerLandmarks], faceBlendshapes: [], facialTransformationMatrixes: [] };
        },
        close() {},
      };
    },
  };
}

function runtimeFactory(providerLandmarks, counters) {
  return {
    async create() {
      counters.create += 1;
      return {
        detect() {
          counters.detect += 1;
          return { faceLandmarks: [providerLandmarks], faceBlendshapes: [], facialTransformationMatrixes: [] };
        },
        close() {
          counters.close += 1;
        },
      };
    },
  };
}

function makeCameraFixture() {
  const counters = {
    getUserMedia: 0,
    trackStop: 0,
    bitmapCreate: 0,
    bitmapClose: [],
    play: 0,
    pause: 0,
  };
  const stream = {
    getTracks() {
      return [{
        stop() {
          counters.trackStop += 1;
        },
      }];
    },
  };
  const videoState = { srcObject: null };
  const video = {
    get srcObject() {
      return videoState.srcObject;
    },
    set srcObject(value) {
      videoState.srcObject = value;
    },
    videoWidth: 820,
    videoHeight: 1024,
    readyState: 2,
    async play() {
      counters.play += 1;
    },
    pause() {
      counters.pause += 1;
    },
  };
  const environment = {
    async getUserMedia() {
      counters.getUserMedia += 1;
      return stream;
    },
    async createImageBitmap() {
      const index = counters.bitmapCreate;
      counters.bitmapCreate += 1;
      counters.bitmapClose[index] = 0;
      return {
        close() {
          counters.bitmapClose[index] += 1;
        },
      };
    },
  };
  return { counters, video, environment };
}

function manifest({ sweepRef, sweepSequenceIndex, candidateSelection = false }) {
  return Object.freeze({
    prospectiveCollectionRef: 'verifier:mesh6i:collection',
    captureSeriesRef: 'verifier:mesh6i:series',
    sweepRef,
    captureConditionRef: 'verifier:mesh6i:condition:baseline',
    sweepSequenceIndex,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: candidateSelection,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
}

async function* triggers(prefix, start) {
  yield Object.freeze({ timestampMs: start, providerRunRef: prefix + ':frame:1' });
  yield Object.freeze({ timestampMs: start + 16, providerRunRef: prefix + ':frame:2' });
}

function assertNoRawCaptureKeys(value) {
  const forbidden = new Set([
    'image',
    'rawImage',
    'rawVideo',
    'faceLandmarks',
    'metricLandmarks',
    'poseTransformMatrixPackedColumnMajor',
    'rawProviderResponse',
  ]);
  const visit = (candidate) => {
    if (candidate === null || typeof candidate !== 'object') return;
    for (const [key, child] of Object.entries(candidate)) {
      if (forbidden.has(key)) throw new Error('MESH6I output leaked prohibited capture/geometry field: ' + key);
      visit(child);
    }
  };
  visit(value);
}

const adapterPath = process.argv[2];
if (!adapterPath) throw new Error('Usage: node scripts/verify-face-geometry-mesh6i.mjs <weighted-adapter.json>');
const adapter = JSON.parse(readFileSync(adapterPath, 'utf8'));

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'mesh6i:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, parityFactory(providerLandmarks));
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

const ownedCameraFixture = makeCameraFixture();
const ownedCamera = await openMesh6HBrowserCamera(
  { video: ownedCameraFixture.video },
  ownedCameraFixture.environment,
);
const runtimeCounters = { create: 0, detect: 0, close: 0 };
const result = await runMesh6IManualBrowserCaptureController({
  camera: ownedCamera,
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: Object.freeze([
    Object.freeze({
      manifest: manifest({ sweepRef: 'verifier:mesh6i:sweep:1', sweepSequenceIndex: 1 }),
      triggers: triggers('mesh6i:sweep:1', 1000),
    }),
    Object.freeze({
      manifest: manifest({ sweepRef: 'verifier:mesh6i:sweep:2', sweepSequenceIndex: 2 }),
      triggers: triggers('mesh6i:sweep:2', 2000),
    }),
  ]),
}, runtimeFactory(providerLandmarks, runtimeCounters));

assertIssuedMesh6IManualBrowserCaptureResult(result);
expect(result.session.execution.sweepCount === 2, 'MESH6I must map two manual sweep plans to two MESH6G sweeps.');
expect(result.session.execution.capturedFrameCount === 4, 'MESH6I must preserve all four explicit trigger frames end-to-end.');
expect(runtimeCounters.create === 1 && runtimeCounters.detect === 4 && runtimeCounters.close === 1,
  'MESH6I must preserve the one-shared-runtime MESH6G lifecycle.');
expect(ownedCameraFixture.counters.bitmapCreate === 4, 'MESH6I must create exactly one MESH6H bitmap per explicit trigger.');
expect(ownedCameraFixture.counters.bitmapClose.length === 4
  && ownedCameraFixture.counters.bitmapClose.every((count) => count === 1),
  'MESH6I must preserve MESH6H bitmap close lifecycle.');
expect(ownedCameraFixture.counters.trackStop === 1, 'MESH6I default ownership must close the camera once after success.');
expect(ownedCameraFixture.counters.pause === 1, 'MESH6I default ownership must delegate one camera pause to MESH6H.');
expect(result.execution.cameraOwnership === 'controller_closes_after_session', 'MESH6I default camera ownership drift.');
expect(result.execution.controllerCloseInvokedInFinally === true, 'MESH6I default ownership must report controller close.');
expect(result.session.dataset.observedSweepCount === 2, 'MESH6I must return the descriptive MESH6F dataset through MESH6G.');
expect(result.session.authorityBoundary.calibrationIssued === false, 'MESH6I must not widen MESH6G calibration authority.');
expect(result.authorityBoundary.calibrationIssued === false, 'MESH6I must not issue calibration.');
expect(result.authorityBoundary.thresholdsIssued === false, 'MESH6I must not issue thresholds.');
expect(result.authorityBoundary.productionMorphologyAuthorized === false, 'MESH6I must not authorize production morphology.');
expect(result.authorityBoundary.controllerExecutionMeansIndependentFreshnessProof === false,
  'MESH6I execution must not claim independent freshness proof.');
assertNoRawCaptureKeys(result);

const retainedFixture = makeCameraFixture();
const retainedCamera = await openMesh6HBrowserCamera({ video: retainedFixture.video }, retainedFixture.environment);
const retainedCounters = { create: 0, detect: 0, close: 0 };
const retainedResult = await runMesh6IManualBrowserCaptureController({
  camera: retainedCamera,
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: [Object.freeze({
    manifest: manifest({ sweepRef: 'verifier:mesh6i:retained', sweepSequenceIndex: 3 }),
    triggers: triggers('mesh6i:retained', 3000),
  })],
  cameraOwnership: 'caller_retains_camera',
}, runtimeFactory(providerLandmarks, retainedCounters));
assertIssuedMesh6IManualBrowserCaptureResult(retainedResult);
expect(retainedFixture.counters.trackStop === 0, 'MESH6I caller-retained mode must not close the camera.');
expect(retainedResult.execution.controllerCloseInvokedInFinally === false, 'MESH6I caller-retained mode close-report drift.');
retainedCamera.close();
expect(retainedFixture.counters.trackStop === 1, 'Caller must still be able to close retained MESH6H camera exactly once.');

const failingFixture = makeCameraFixture();
const failingCamera = await openMesh6HBrowserCamera({ video: failingFixture.video }, failingFixture.environment);
await expectAsyncFailure('MESH6E candidate-selection admission', () =>
  runMesh6IManualBrowserCaptureController({
    camera: failingCamera,
    canonicalAssetDigest: DIGEST,
    geometryMetadataPbtxt: metadataFixture,
    parity: fr76,
    weightedRegionAdapter: adapter,
    sweeps: [Object.freeze({
      manifest: manifest({
        sweepRef: 'verifier:mesh6i:invalid-manifest',
        sweepSequenceIndex: 4,
        candidateSelection: true,
      }),
      triggers: triggers('mesh6i:invalid-manifest', 4000),
    })],
  }, runtimeFactory(providerLandmarks, { create: 0, detect: 0, close: 0 })));
expect(failingFixture.counters.trackStop === 1, 'MESH6I controller-owned failure path must close camera exactly once.');

const forgedFixture = makeCameraFixture();
const issuedForForgery = await openMesh6HBrowserCamera({ video: forgedFixture.video }, forgedFixture.environment);
const forgedCamera = { ...issuedForForgery };
await expectAsyncFailure('forged MESH6H camera handle', () =>
  runMesh6IManualBrowserCaptureController({
    camera: forgedCamera,
    canonicalAssetDigest: DIGEST,
    geometryMetadataPbtxt: metadataFixture,
    parity: fr76,
    weightedRegionAdapter: adapter,
    sweeps: [Object.freeze({
      manifest: manifest({ sweepRef: 'verifier:mesh6i:forged', sweepSequenceIndex: 5 }),
      triggers: triggers('mesh6i:forged', 5000),
    })],
  }, runtimeFactory(providerLandmarks, { create: 0, detect: 0, close: 0 })));
issuedForForgery.close();

const contract = getMesh6IManualBrowserCaptureControllerContract();
expect(contract.execution.defaultCameraOwnership === 'controller_closes_after_session',
  'MESH6I contract default ownership drift.');
expect(contract.execution.automaticTriggerSynthesisAllowed === false, 'MESH6I must prohibit trigger synthesis.');
expect(contract.execution.triggerReorderingAllowed === false, 'MESH6I must prohibit trigger reordering.');
expect(contract.execution.automaticFrameSelectionAllowed === false, 'MESH6I must prohibit automatic frame selection.');
expect(contract.execution.automaticPoseFilteringAllowed === false, 'MESH6I must prohibit automatic pose filtering.');
expect(contract.execution.automaticCaptureQualityFilteringAllowed === false,
  'MESH6I must prohibit automatic capture-quality filtering.');
expect(contract.execution.minimumFrameCountForProduction === null, 'MESH6I must not invent production minimum frame count.');
expect(contract.execution.minimumSweepCountForProduction === null, 'MESH6I must not invent production minimum sweep count.');
expect(contract.authorityBoundary.independentFreshnessProofIssued === false, 'MESH6I must not issue freshness proof.');
expect(contract.authorityBoundary.identityProofIssued === false, 'MESH6I must not issue identity proof.');
expect(contract.authorityBoundary.calibrationIssued === false, 'MESH6I must not issue calibration.');
expect(contract.authorityBoundary.thresholdsIssued === false, 'MESH6I must not issue thresholds.');
expect(contract.authorityBoundary.productionMorphologyAuthorized === false, 'MESH6I must not authorize production morphology.');
expect(contract.nextFrontier === MESH6I_NEXT_FRONTIER, 'MESH6I next frontier drift.');

process.stdout.write(JSON.stringify({
  status: 'MESH6I_MANUAL_BROWSER_CAPTURE_CONTROLLER_PASS',
  sweepBindingVerified: true,
  manualTriggerEndToEndVerified: true,
  sharedRuntimeLifecycleVerified: true,
  bitmapLifecycleVerified: true,
  controllerOwnedCloseVerified: true,
  callerRetainedOwnershipVerified: true,
  failureCleanupVerified: true,
  forgedCameraRejected: true,
  noRawCaptureOutputVerified: true,
  authorityBoundaryVerified: true,
}) + '\n');
