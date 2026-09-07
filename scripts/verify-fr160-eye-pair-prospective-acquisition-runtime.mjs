import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158,
  computeRoleInvariantEyePairNeutralShapeMetricsFR158,
} from '../.face-reading-dist/role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';
import {
  admitEyePairProspectiveCaptureManifestFR159,
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
} from '../.face-reading-dist/eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  assertIssuedEyePairProspectiveAcquisitionDatasetFR160,
  assertIssuedEyePairProspectiveAcquisitionRecordFR160,
  getEyePairProspectiveAcquisitionContractFR160,
  materializeEyePairProspectiveAcquisitionDatasetFR160,
  recordEyePairProspectiveAcquisitionFR160,
} from '../.face-reading-dist/eye-pair-prospective-acquisition-runtime-fr160.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'8'.repeat(64)}`;
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
    headers: { 'user-agent': 'myeongha-fr160-prospective-acquisition-verifier' },
  });
  if (!response.ok) throw new Error(`FR160 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR160 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
  }
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const visibilityMatch = /\bvisibility:\s*([-+0-9.eE]+)/.exec(block)?.[1];
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error('FR160 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR160 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
  }
  return landmarks;
}

function factory(providerLandmarks) {
  return {
    async create() {
      return {
        detect() {
          return {
            faceLandmarks: [providerLandmarks],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          };
        },
        close() {},
      };
    },
  };
}

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr160:verification-fixture:surface',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
const fr77 = await runGovernedMetricGeometryFR77({
  schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
  providerRunRef: 'fr160:verification-fixture:metric',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
const fr158 = computeRoleInvariantEyePairNeutralShapeMetricsFR158(fr77);
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(fr158);

const manifest = admitEyePairProspectiveCaptureManifestFR159({
  prospectiveCollectionRef: 'verification-fixture-only:fr160',
  captureSeriesRef: 'verification-fixture-only:series-1',
  captureRef: 'verification-fixture-only:capture-1',
  captureConditionRef: 'verification-fixture-only:condition-baseline',
  captureSequenceIndex: 1,
  postPreregistrationFreshCaptureAttested: true,
  sameParticipantSeriesAttested: true,
  usedForCandidateSelection: false,
  developmentCaptureReuse: false,
  identityMatchingPerformed: false,
});
const record = recordEyePairProspectiveAcquisitionFR160({
  manifest,
  metricRuntime: fr158,
  metricRuntimeCorrespondsToManifestCaptureAttested: true,
});
assertIssuedEyePairProspectiveAcquisitionRecordFR160(record);
const dataset = materializeEyePairProspectiveAcquisitionDatasetFR160([record]);
assertIssuedEyePairProspectiveAcquisitionDatasetFR160(dataset);
const contract = getEyePairProspectiveAcquisitionContractFR160();

const runtimeValues = Object.fromEntries(fr158.metricValues.map((metric) => [metric.metricRef, metric.value]));
if (
  record.metricObservations[0].metricRef !== FR159_X_SPAN_METRIC_REF
  || record.metricObservations[0].value !== runtimeValues[FR159_X_SPAN_METRIC_REF]
  || record.metricObservations[1].metricRef !== FR159_PERIMETER_METRIC_REF
  || record.metricObservations[1].value !== runtimeValues[FR159_PERIMETER_METRIC_REF]
) throw new Error('FR160 did not copy the two preregistered FR159 metric values exactly from issued FR158 runtime.');

if (
  record.authorityState !== 'prospective_admitted_metric_observation_record_only_no_repeatability_adjudication'
  || record.prospectiveEligibilityState !== 'fr159_attestations_accepted_not_independently_verified'
  || record.source.fr158CoordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
  || record.source.fr159FreshnessAttestationMeansIndependentFreshnessProof !== false
  || record.source.fr159SameParticipantAttestationMeansIdentityProof !== false
  || record.linkageAttestation.metricRuntimeCorrespondsToManifestCaptureAttested !== true
  || record.linkageAttestation.attestationMeansIndependentCaptureRuntimeProof !== false
  || record.authorityBoundary.observationRecordMeansEmpiricalRepeatabilityEstablished !== false
  || record.authorityBoundary.identityMatchingPerformed !== false
  || record.authorityBoundary.biometricTemplateIssued !== false
  || record.authorityBoundary.thresholdIssued !== false
  || record.traditionalSemanticAuthority !== false
) throw new Error('FR160 acquisition-record authority boundary drift.');

if (
  dataset.observedCaptureCount !== 1
  || dataset.observedCaptureSeriesCount !== 1
  || dataset.observedCaptureConditionCount !== 1
  || dataset.seriesConditionSummaries.length !== 1
  || dataset.seriesConditionSummaries[0].repeatabilityPassFailIssued !== false
  || dataset.seriesConditionSummaries[0].captureSensitivityPassFailIssued !== false
  || dataset.seriesConditionSummaries[0].identityComparisonIssued !== false
  || dataset.execution.empiricalRepeatabilityEstablished !== false
  || dataset.execution.captureQualityValidated !== false
  || dataset.execution.captureQualityMeasurementConstructValidated !== false
  || dataset.execution.numericRepeatabilityAcceptanceThreshold !== null
  || dataset.execution.numericCaptureQualityThreshold !== null
  || dataset.authorityBoundary.datasetMaterializationMeansEmpiricalRepeatabilityEstablished !== false
  || dataset.authorityBoundary.betweenSeriesIdentityInferenceAllowed !== false
  || dataset.authorityBoundary.sameDifferentParticipantClassificationAllowed !== false
  || dataset.authorityBoundary.thresholdsIssued !== false
  || dataset.authorityBoundary.constructValidity !== 'unresolved'
  || dataset.authorityBoundary.traditionalBinding !== 'unresolved'
  || dataset.privacyBoundary.rawImageStored !== false
  || dataset.privacyBoundary.rawLandmarkSetStored !== false
  || dataset.privacyBoundary.faceEmbeddingStored !== false
  || dataset.privacyBoundary.identityTemplateStored !== false
  || dataset.traditionalSemanticAuthority !== false
) throw new Error('FR160 acquisition-dataset authority boundary drift.');

if (
  contract.acquisition.empiricalFreshCaptureRecordsBundledAtDefinitionTime !== 0
  || contract.acquisition.fr159FreshnessAttestationMeansIndependentlyVerifiedFreshCapture !== false
  || contract.acquisition.fr159SameParticipantAttestationMeansIndependentlyVerifiedIdentity !== false
  || contract.verificationBoundary.syntheticVerifierFixtureAllowedForMechanicsOnly !== true
  || contract.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
  || contract.verificationBoundary.verifierFixtureMeansRepeatabilityEstablished !== false
  || contract.descriptiveAnalysis.numericRepeatabilityAcceptanceThreshold !== null
  || contract.descriptiveAnalysis.numericCaptureQualityThreshold !== null
  || contract.authorityBoundary.traditionalSemanticAuthority !== false
) throw new Error('FR160 contract attempted to promote attestations or verifier mechanics into empirical authority.');

process.stdout.write(`${JSON.stringify({
  status: 'FR160_PROSPECTIVE_ACQUISITION_RUNTIME_PASS',
  releaseCommit: RELEASE_COMMIT,
  copiedPrimaryMetricRefs: record.metricObservations.map((metric) => metric.metricRef),
  prospectiveEligibilityState: record.prospectiveEligibilityState,
  freshnessAttestationMeansIndependentProof: record.source.fr159FreshnessAttestationMeansIndependentFreshnessProof,
  verifierFixtureMeansEmpiricalFreshCaptureEvidence: contract.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence,
  empiricalFreshCaptureRecordsBundledAtDefinitionTime: contract.acquisition.empiricalFreshCaptureRecordsBundledAtDefinitionTime,
  empiricalRepeatabilityEstablished: dataset.execution.empiricalRepeatabilityEstablished,
  captureQualityValidated: dataset.execution.captureQualityValidated,
  identityInferenceAllowed: dataset.authorityBoundary.betweenSeriesIdentityInferenceAllowed,
  numericRepeatabilityAcceptanceThreshold: dataset.execution.numericRepeatabilityAcceptanceThreshold,
  traditionalSemanticAuthority: dataset.traditionalSemanticAuthority,
  nextFrontier: dataset.nextFrontier,
})}\n`);