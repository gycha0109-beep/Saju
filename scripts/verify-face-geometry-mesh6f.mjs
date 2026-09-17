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
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import { buildMesh6ANeutralObservationFrame } from '../.face-reading-dist/mesh6a-neutral-observation-frame.js';
import { buildMesh6DMultiFramePoseSweepEvidence } from '../.face-reading-dist/mesh6d-multi-frame-pose-sweep-evidence.js';
import {
  MESH6E_PRIMARY_EVIDENCE_FIELDS,
  admitMesh6EProspectiveSweepManifest,
} from '../.face-reading-dist/mesh6e-prospective-real-capture-calibration-protocol.js';
import {
  MESH6F_NEXT_FRONTIER,
  assertIssuedMesh6FProspectiveSweepAcquisitionDataset,
  assertIssuedMesh6FProspectiveSweepAcquisitionRecord,
  getMesh6FProspectiveAcquisitionContract,
  materializeMesh6FProspectiveSweepAcquisitionDataset,
  recordMesh6FProspectiveSweepAcquisition,
} from '../.face-reading-dist/mesh6f-prospective-sweep-acquisition-runtime.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const DIGEST = `sha256:${'6'.repeat(64)}`;
const ALT_DIGEST = `sha256:${'7'.repeat(64)}`;
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
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-mesh6f-verifier' },
  });
  if (!response.ok) throw new Error(`MESH6F failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) throw new Error(`MESH6F Git blob SHA mismatch: ${witness.path}`);
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6F provider fixture contains non-finite XYZ.');
    landmarks.push({ x, y, z });
  }
  if (landmarks.length !== 478) throw new Error(`MESH6F expected 478 provider landmarks; got ${landmarks.length}.`);
  return landmarks;
}

function factory(providerLandmarks) {
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

async function issueFrame({ digest, providerRunRef, metadataFixture, providerLandmarks, fr76 }) {
  const fr77 = await runGovernedMetricGeometryFR77({
    schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
    providerRunRef,
    canonicalAssetDigest: digest,
    image: Object.freeze({ fixture: true }),
    frameWidth: 820,
    frameHeight: 1024,
    geometryMetadataPbtxt: metadataFixture,
  }, fr76, factory(providerLandmarks));
  return buildMesh6ANeutralObservationFrame(fr77);
}

function manifest({ sweepRef, sweepSequenceIndex, collection = 'verifier:mesh6f:collection' }) {
  return admitMesh6EProspectiveSweepManifest({
    prospectiveCollectionRef: collection,
    captureSeriesRef: 'verifier:mesh6f:series',
    sweepRef,
    captureConditionRef: 'verifier:mesh6f:condition:baseline',
    sweepSequenceIndex,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
}

function expectFailure(label, callback) {
  try {
    callback();
  } catch {
    return;
  }
  throw new Error(`MESH6F expected fail-closed rejection: ${label}`);
}

function readPath(root, path) {
  return path.split('.').reduce((value, key) => value?.[key], root);
}

const adapterPath = process.argv[2];
if (!adapterPath) throw new Error('Usage: node scripts/verify-face-geometry-mesh6f.mjs <weighted-adapter.json>');
const adapter = JSON.parse(readFileSync(adapterPath, 'utf8'));

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'mesh6f:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

const frame = await issueFrame({
  digest: DIGEST,
  providerRunRef: 'mesh6f:frame:base',
  metadataFixture,
  providerLandmarks,
  fr76,
});
const mesh6DInput = Object.freeze({
  frames: Object.freeze([
    Object.freeze({ frame, timestampMs: 1000 }),
    Object.freeze({ frame, timestampMs: 1016 }),
  ]),
  weightedRegionAdapter: adapter,
});
const expectedEvidence = buildMesh6DMultiFramePoseSweepEvidence(mesh6DInput);

const record1 = recordMesh6FProspectiveSweepAcquisition({
  manifest: manifest({ sweepRef: 'verifier:mesh6f:sweep:1', sweepSequenceIndex: 1 }),
  mesh6DInput,
  mesh6DInputCorrespondsToManifestSweepAttested: true,
});
const record2 = recordMesh6FProspectiveSweepAcquisition({
  manifest: manifest({ sweepRef: 'verifier:mesh6f:sweep:2', sweepSequenceIndex: 2 }),
  mesh6DInput,
  mesh6DInputCorrespondsToManifestSweepAttested: true,
});
assertIssuedMesh6FProspectiveSweepAcquisitionRecord(record1);
assertIssuedMesh6FProspectiveSweepAcquisitionRecord(record2);

if (record1.evidenceObservations.length !== MESH6E_PRIMARY_EVIDENCE_FIELDS.length) {
  throw new Error('MESH6F did not copy the exact preregistered evidence field count.');
}
for (let index = 0; index < MESH6E_PRIMARY_EVIDENCE_FIELDS.length; index += 1) {
  const field = MESH6E_PRIMARY_EVIDENCE_FIELDS[index];
  const observation = record1.evidenceObservations[index];
  const expected = readPath(expectedEvidence, field);
  if (observation?.evidenceField !== field || observation.value !== expected) {
    throw new Error(`MESH6F did not copy preregistered MESH6D evidence exactly: ${field}.`);
  }
}

if (
  record1.source.mesh6DConstructedInsideAcquisitionBoundary !== true
  || record1.source.externalPrebuiltMesh6DArtifactAccepted !== false
  || record1.linkageAttestation.attestationMeansIndependentCaptureRuntimeProof !== false
  || record1.authorityBoundary.observationRecordMeansEmpiricalRepeatabilityEstablished !== false
  || record1.authorityBoundary.observationRecordMeansCaptureQualityValidated !== false
  || record1.authorityBoundary.observationRecordMeansPoseAcceptanceValidated !== false
  || record1.authorityBoundary.identityMatchingPerformed !== false
  || record1.authorityBoundary.biometricTemplateIssued !== false
  || record1.authorityBoundary.thresholdIssued !== false
  || record1.authorityBoundary.productionMorphologyAuthorized !== false
  || record1.traditionalSemanticAuthority !== false
) throw new Error('MESH6F acquisition-record authority boundary drift.');

const dataset = materializeMesh6FProspectiveSweepAcquisitionDataset([record1, record2]);
assertIssuedMesh6FProspectiveSweepAcquisitionDataset(dataset);
if (
  dataset.observedSweepCount !== 2
  || dataset.observedCaptureSeriesCount !== 1
  || dataset.observedCaptureConditionCount !== 1
  || dataset.seriesConditionSummaries.length !== 1
  || dataset.seriesConditionSummaries[0].sweepCount !== 2
  || dataset.seriesConditionSummaries[0].evidenceSummaries.length !== 13
  || dataset.execution.empiricalRepeatabilityEstablished !== false
  || dataset.execution.captureQualityValidated !== false
  || dataset.execution.poseAcceptanceValidated !== false
  || dataset.execution.numericMorphologyRepeatabilityAcceptanceThreshold !== null
  || dataset.execution.numericCaptureQualityThreshold !== null
  || dataset.execution.numericPoseAcceptanceThreshold !== null
  || dataset.execution.confidenceThreshold !== null
  || dataset.execution.productionMorphologyAuthorized !== false
  || dataset.authorityBoundary.betweenSeriesIdentityInferenceAllowed !== false
  || dataset.authorityBoundary.sameDifferentParticipantClassificationAllowed !== false
  || dataset.authorityBoundary.thresholdsIssued !== false
  || dataset.authorityBoundary.productionAdmissionIssued !== false
  || dataset.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
  || dataset.traditionalSemanticAuthority !== false
  || dataset.nextFrontier !== MESH6F_NEXT_FRONTIER
) throw new Error('MESH6F acquisition-dataset authority boundary drift.');
for (const summary of dataset.seriesConditionSummaries[0].evidenceSummaries) {
  if (summary.range !== 0 || summary.repeatabilityPassFailIssued !== false || summary.calibrationApplied !== false) {
    throw new Error(`MESH6F identical verifier sweeps must remain zero-range descriptive-only: ${summary.evidenceField}.`);
  }
}

expectFailure('linkage attestation false', () => recordMesh6FProspectiveSweepAcquisition({
  manifest: manifest({ sweepRef: 'verifier:mesh6f:linkage-false', sweepSequenceIndex: 9 }),
  mesh6DInput,
  mesh6DInputCorrespondsToManifestSweepAttested: false,
}));

const issuedManifest = manifest({ sweepRef: 'verifier:mesh6f:forged-source', sweepSequenceIndex: 10 });
expectFailure('forged MESH6E manifest object', () => recordMesh6FProspectiveSweepAcquisition({
  manifest: { ...issuedManifest },
  mesh6DInput,
  mesh6DInputCorrespondsToManifestSweepAttested: true,
}));

expectFailure('duplicate sweepRef', () => materializeMesh6FProspectiveSweepAcquisitionDataset([record1, record1]));

const duplicateSequenceRecord = recordMesh6FProspectiveSweepAcquisition({
  manifest: manifest({ sweepRef: 'verifier:mesh6f:duplicate-sequence', sweepSequenceIndex: 1 }),
  mesh6DInput,
  mesh6DInputCorrespondsToManifestSweepAttested: true,
});
expectFailure('duplicate sweep sequence index', () =>
  materializeMesh6FProspectiveSweepAcquisitionDataset([record1, duplicateSequenceRecord]));

const differentCollectionRecord = recordMesh6FProspectiveSweepAcquisition({
  manifest: manifest({
    sweepRef: 'verifier:mesh6f:different-collection',
    sweepSequenceIndex: 3,
    collection: 'verifier:mesh6f:other-collection',
  }),
  mesh6DInput,
  mesh6DInputCorrespondsToManifestSweepAttested: true,
});
expectFailure('mixed prospective collection', () =>
  materializeMesh6FProspectiveSweepAcquisitionDataset([record1, differentCollectionRecord]));

const altFrame = await issueFrame({
  digest: ALT_DIGEST,
  providerRunRef: 'mesh6f:frame:alt-provenance',
  metadataFixture,
  providerLandmarks,
  fr76,
});
const altInput = Object.freeze({
  frames: Object.freeze([
    Object.freeze({ frame: altFrame, timestampMs: 2000 }),
    Object.freeze({ frame: altFrame, timestampMs: 2016 }),
  ]),
  weightedRegionAdapter: adapter,
});
const altRecord = recordMesh6FProspectiveSweepAcquisition({
  manifest: manifest({ sweepRef: 'verifier:mesh6f:alt-provenance', sweepSequenceIndex: 4 }),
  mesh6DInput: altInput,
  mesh6DInputCorrespondsToManifestSweepAttested: true,
});
expectFailure('mixed MESH6D provenance', () =>
  materializeMesh6FProspectiveSweepAcquisitionDataset([record1, altRecord]));

const contract = getMesh6FProspectiveAcquisitionContract();
if (
  contract.predecessor.externalPrebuiltMesh6DArtifactAccepted !== false
  || contract.predecessor.mesh6DConstructedInsideAcquisitionBoundary !== true
  || contract.acquisition.empiricalFreshCaptureRecordsBundledAtDefinitionTime !== 0
  || contract.acquisition.linkageAttestationMeansIndependentProof !== false
  || contract.descriptiveAnalysis.numericMorphologyRepeatabilityAcceptanceThreshold !== null
  || contract.descriptiveAnalysis.numericCaptureQualityThreshold !== null
  || contract.descriptiveAnalysis.numericPoseAcceptanceThreshold !== null
  || contract.descriptiveAnalysis.confidenceThreshold !== null
  || contract.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
  || contract.verificationBoundary.verifierFixtureMeansRepeatabilityEstablished !== false
  || contract.authorityBoundary.calibrationIssued !== false
  || contract.authorityBoundary.thresholdsIssued !== false
  || contract.authorityBoundary.productionMorphologyAuthorized !== false
  || contract.authorityBoundary.traditionalSemanticAuthority !== false
) throw new Error('MESH6F acquisition contract authority boundary drift.');

process.stdout.write(`${JSON.stringify({
  status: 'MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RUNTIME_PASS',
  evidenceFieldCount: record1.evidenceObservations.length,
  observedSweepCount: dataset.observedSweepCount,
  seriesConditionSummaryCount: dataset.seriesConditionSummaries.length,
  internalMesh6DConstruction: record1.source.mesh6DConstructedInsideAcquisitionBoundary,
  externalPrebuiltMesh6DArtifactAccepted: record1.source.externalPrebuiltMesh6DArtifactAccepted,
  duplicateSweepRefRejected: true,
  duplicateSequenceRejected: true,
  mixedCollectionRejected: true,
  mixedProvenanceRejected: true,
  forgedManifestRejected: true,
  verifierFixtureMeansEmpiricalFreshCaptureEvidence: dataset.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence,
  empiricalRepeatabilityEstablished: dataset.execution.empiricalRepeatabilityEstablished,
  productionMorphologyAuthorized: dataset.execution.productionMorphologyAuthorized,
  nextFrontier: dataset.nextFrontier,
})}\n`);
