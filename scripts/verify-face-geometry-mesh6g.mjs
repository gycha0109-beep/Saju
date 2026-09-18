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
import {
  MESH6G_NEXT_FRONTIER,
  assertIssuedMesh6GProspectiveCaptureSession,
  getMesh6GProspectiveCaptureSessionContract,
  runMesh6GProspectiveCaptureSession,
} from '../.face-reading-dist/mesh6g-prospective-operator-capture-session.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/' + RELEASE_COMMIT;
const DIGEST = 'sha256:' + '6'.repeat(64);
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

function gitBlobSha(bytes) {
  const prefix = Buffer.from('blob ' + bytes.length + '\0', 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(RAW_ROOT + '/' + witness.path, {
    headers: { 'user-agent': 'myeongha-mesh6g-verifier' },
  });
  if (!response.ok) throw new Error('MESH6G failed to fetch ' + witness.path + ': HTTP ' + response.status);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) throw new Error('MESH6G Git blob SHA mismatch: ' + witness.path);
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6G provider fixture contains non-finite XYZ.');
    landmarks.push({ x, y, z });
  }
  if (landmarks.length !== 478) throw new Error('MESH6G expected 478 provider landmarks; got ' + landmarks.length + '.');
  return landmarks;
}

function basicFactory(providerLandmarks) {
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

function instrumentedFactory(providerLandmarks, counters) {
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

function manifestInput({ sweepRef, sweepSequenceIndex, collection = 'verifier:mesh6g:collection' }) {
  return Object.freeze({
    prospectiveCollectionRef: collection,
    captureSeriesRef: 'verifier:mesh6g:series',
    sweepRef,
    captureConditionRef: 'verifier:mesh6g:condition:baseline',
    sweepSequenceIndex,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
}

async function* frames(prefix, startTimestampMs, count) {
  for (let index = 0; index < count; index += 1) {
    yield Object.freeze({
      image: Object.freeze({ fixture: true, index }),
      timestampMs: startTimestampMs + index * 16,
      frameWidth: 820,
      frameHeight: 1024,
      providerRunRef: prefix + ':frame:' + index,
    });
  }
}

async function* descendingFrames(prefix) {
  yield Object.freeze({
    image: Object.freeze({ fixture: true, index: 0 }),
    timestampMs: 100,
    frameWidth: 820,
    frameHeight: 1024,
    providerRunRef: prefix + ':frame:0',
  });
  yield Object.freeze({
    image: Object.freeze({ fixture: true, index: 1 }),
    timestampMs: 99,
    frameWidth: 820,
    frameHeight: 1024,
    providerRunRef: prefix + ':frame:1',
  });
}

async function* emptyFrames() {}

async function expectAsyncFailure(label, callback) {
  try {
    await callback();
  } catch {
    return;
  }
  throw new Error('MESH6G expected fail-closed rejection: ' + label);
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
      if (forbidden.has(key)) throw new Error('MESH6G output leaked prohibited capture/geometry field: ' + key);
      visit(child);
    }
  };
  visit(value);
}

const adapterPath = process.argv[2];
if (!adapterPath) throw new Error('Usage: node scripts/verify-face-geometry-mesh6g.mjs <weighted-adapter.json>');
const adapter = JSON.parse(readFileSync(adapterPath, 'utf8'));

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const parityFactory = basicFactory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'mesh6g:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, parityFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

const counters = { create: 0, detect: 0, close: 0 };
const result = await runMesh6GProspectiveCaptureSession({
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: Object.freeze([
    Object.freeze({
      manifest: manifestInput({ sweepRef: 'verifier:mesh6g:sweep:1', sweepSequenceIndex: 1 }),
      frames: frames('mesh6g:sweep:1', 1000, 2),
    }),
    Object.freeze({
      manifest: manifestInput({ sweepRef: 'verifier:mesh6g:sweep:2', sweepSequenceIndex: 2 }),
      frames: frames('mesh6g:sweep:2', 2000, 2),
    }),
  ]),
}, instrumentedFactory(providerLandmarks, counters));

assertIssuedMesh6GProspectiveCaptureSession(result);

if (counters.create !== 1 || counters.detect !== 4 || counters.close !== 1) {
  throw new Error('MESH6G must create one shared runtime, detect once per captured frame, and close once.');
}
if (
  result.execution.sweepCount !== 2
  || result.execution.capturedFrameCount !== 4
  || result.dataset.observedSweepCount !== 2
  || result.dataset.observedCaptureSeriesCount !== 1
  || result.dataset.observedCaptureConditionCount !== 1
  || result.execution.sharedMediaPipeRuntimeCreatedOnce !== true
  || result.execution.sharedMediaPipeRuntimeCloseInvokedExactlyOnce !== true
  || result.execution.perFrameBorrowedRuntimeCloseIsNoop !== true
  || result.execution.timestampsSortedByCoordinator !== false
  || result.execution.automaticFrameSelectionApplied !== false
  || result.execution.automaticPoseFilteringApplied !== false
  || result.execution.automaticCaptureQualityFilteringApplied !== false
) throw new Error('MESH6G session execution evidence drift.');

for (const summary of result.dataset.seriesConditionSummaries[0].evidenceSummaries) {
  if (
    summary.range !== 0
    || summary.repeatabilityPassFailIssued !== false
    || summary.captureSensitivityPassFailIssued !== false
    || summary.poseAcceptanceApplied !== false
    || summary.calibrationApplied !== false
    || summary.productionAdmissionApplied !== false
  ) throw new Error('MESH6G identical verifier sweeps must remain zero-range descriptive-only: ' + summary.evidenceField);
}

if (
  result.attestationBoundary.mesh6EFreshnessAttestationMeansIndependentProof !== false
  || result.attestationBoundary.sameParticipantSeriesAttestationMeansIdentityMatch !== false
  || result.attestationBoundary.coordinatorLinkageAttestationMeansIndependentPhysicalCaptureProof !== false
  || result.privacyBoundary.rawImageIncludedInSessionArtifact !== false
  || result.privacyBoundary.rawProviderResponseIncludedInSessionArtifact !== false
  || result.privacyBoundary.rawLandmarkSetIncludedInSessionArtifact !== false
  || result.privacyBoundary.derivedFullFaceMetricGeometryIncludedInSessionArtifact !== false
  || result.authorityBoundary.sessionMaterializationMeansEmpiricalRepeatabilityEstablished !== false
  || result.authorityBoundary.sessionMaterializationMeansCaptureQualityValidated !== false
  || result.authorityBoundary.sessionMaterializationMeansPoseAcceptanceValidated !== false
  || result.authorityBoundary.classificationIssued !== false
  || result.authorityBoundary.calibrationIssued !== false
  || result.authorityBoundary.thresholdsIssued !== false
  || result.authorityBoundary.confidenceScoreIssued !== false
  || result.authorityBoundary.populationNormDefined !== false
  || result.authorityBoundary.productionMorphologyAuthorized !== false
  || result.authorityBoundary.identityMatchingPerformed !== false
  || result.authorityBoundary.anatomicalMeasurementClaimed !== false
  || result.authorityBoundary.traditionalSemanticAuthority !== false
  || result.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
  || result.nextFrontier !== MESH6G_NEXT_FRONTIER
) throw new Error('MESH6G authority/privacy boundary drift.');

assertNoRawCaptureKeys(result);

const contract = getMesh6GProspectiveCaptureSessionContract();
if (
  contract.captureExecution.sharedMediaPipeRuntimePerSession !== true
  || contract.captureExecution.silentTimestampSortAllowed !== false
  || contract.captureExecution.automaticFrameSelectionAllowed !== false
  || contract.captureExecution.automaticPoseFilteringAllowed !== false
  || contract.captureExecution.automaticCaptureQualityFilteringAllowed !== false
  || contract.captureExecution.minimumFrameCountForProduction !== null
  || contract.captureExecution.minimumSweepCountForProduction !== null
  || contract.persistence.rawImageIncludedInOutput !== false
  || contract.authorityBoundary.calibrationIssued !== false
  || contract.authorityBoundary.thresholdsIssued !== false
  || contract.authorityBoundary.productionMorphologyAuthorized !== false
  || contract.nextFrontier !== MESH6G_NEXT_FRONTIER
) throw new Error('MESH6G contract drift.');

const descendingCounters = { create: 0, detect: 0, close: 0 };
await expectAsyncFailure('descending timestamp order', () => runMesh6GProspectiveCaptureSession({
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: [Object.freeze({
    manifest: manifestInput({ sweepRef: 'verifier:mesh6g:descending', sweepSequenceIndex: 3 }),
    frames: descendingFrames('mesh6g:descending'),
  })],
}, instrumentedFactory(providerLandmarks, descendingCounters)));
if (descendingCounters.create !== 1 || descendingCounters.detect !== 1 || descendingCounters.close !== 1) {
  throw new Error('MESH6G failure path must close the shared runtime exactly once without sorting timestamps.');
}

const emptyCounters = { create: 0, detect: 0, close: 0 };
await expectAsyncFailure('empty frame stream', () => runMesh6GProspectiveCaptureSession({
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: [Object.freeze({
    manifest: manifestInput({ sweepRef: 'verifier:mesh6g:empty', sweepSequenceIndex: 4 }),
    frames: emptyFrames(),
  })],
}, instrumentedFactory(providerLandmarks, emptyCounters)));
if (emptyCounters.create !== 1 || emptyCounters.detect !== 0 || emptyCounters.close !== 1) {
  throw new Error('MESH6G empty-sweep failure must close the shared runtime exactly once.');
}

const invalidManifestCounters = { create: 0, detect: 0, close: 0 };
await expectAsyncFailure('candidate-selection manifest', () => runMesh6GProspectiveCaptureSession({
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: [Object.freeze({
    manifest: Object.freeze({
      ...manifestInput({ sweepRef: 'verifier:mesh6g:candidate-selection', sweepSequenceIndex: 5 }),
      usedForCandidateSelection: true,
    }),
    frames: frames('mesh6g:candidate-selection', 3000, 1),
  })],
}, instrumentedFactory(providerLandmarks, invalidManifestCounters)));
if (invalidManifestCounters.create !== 1 || invalidManifestCounters.detect !== 0 || invalidManifestCounters.close !== 1) {
  throw new Error('MESH6G manifest-admission failure must close the shared runtime exactly once.');
}

await expectAsyncFailure('empty session sweep list', () => runMesh6GProspectiveCaptureSession({
  canonicalAssetDigest: DIGEST,
  geometryMetadataPbtxt: metadataFixture,
  parity: fr76,
  weightedRegionAdapter: adapter,
  sweeps: [],
}, instrumentedFactory(providerLandmarks, { create: 0, detect: 0, close: 0 })));

process.stdout.write(JSON.stringify({
  status: 'MESH6G_PROSPECTIVE_OPERATOR_CAPTURE_SESSION_PASS',
  session: result.execution,
  observedSweepCount: result.dataset.observedSweepCount,
  evidenceFieldCount: result.dataset.seriesConditionSummaries[0].evidenceSummaries.length,
  sharedRuntimeCreateOnceVerified: true,
  sharedRuntimeCloseOnceVerified: true,
  strictFrameOrderVerified: true,
  noRawCaptureOutputVerified: true,
  authorityBoundaryVerified: true,
}) + '\n');
