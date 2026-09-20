import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '../.face-reading-dist/face-eye-pair-research-bridge-fr24.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import { computeEyeNeutralAxisBundleFR210 } from '../.face-reading-dist/eye-neutral-axis-bundle-fr210.js';
import { admitEyePairProspectiveCaptureManifestFR159 } from '../.face-reading-dist/eye-pair-prospective-repeatability-protocol-fr159.js';
import { orderClosedCycleProviderVerticesFR16 } from '../.face-reading-dist/provider-adapter-evidence-fr16.js';
import {
  FR218_HUMAN_EVIDENCE_GATE,
  admitEyeCornerOrientationCandidateFR218,
  assertSelectionHoldoutCoverageFR218,
  assessHumanEvidenceReadinessFR218,
  issueCaptureAdmissionFromFR159FR218,
  projectBlindedReviewItemsFR218,
  selectMetricSpaceCoverageCandidatesFR218,
  summarizeOrdinalAnnotationsFR218,
} from '../.face-reading-dist/observable-morphology-validation-fr218.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'9'.repeat(64)}`;
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
const DELTAS = Object.freeze([-0.03, -0.018, -0.006, 0.006, 0.018, 0.03, -0.024, 0.024]);

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-fr218-runtime-verifier' },
  });
  if (!response.ok) throw new Error(`FR218 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR218 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR218 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR218 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
  }
  return landmarks;
}

function runtimeFactory(providerLandmarks) {
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

function outerCornerIndices(providerLandmarks) {
  const meshXs = providerLandmarks.slice(0, 468).map((point) => point.x);
  const meshMidX = (Math.min(...meshXs) + Math.max(...meshXs)) / 2;
  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]));

  return cycles.map((vertices) => {
    const ordered = vertices.map((index) => ({ index, point: providerLandmarks[index] }));
    const centroidX = ordered.reduce((sum, entry) => sum + entry.point.x, 0) / ordered.length;
    const target = centroidX < meshMidX
      ? Math.min(...ordered.map((entry) => entry.point.x))
      : Math.max(...ordered.map((entry) => entry.point.x));
    const extrema = ordered.filter((entry) => Math.abs(entry.point.x - target) <= 1e-12);
    if (extrema.length !== 1) throw new Error('FR218 verifier requires unique role-invariant eye outer-corner extrema.');
    return extrema[0].index;
  });
}

function perturbOuterCorners(providerLandmarks, delta) {
  const indices = outerCornerIndices(providerLandmarks);
  return providerLandmarks.map((point, index) => {
    if (!indices.includes(index)) return { ...point };
    const y = point.y + delta;
    if (!(y >= 0 && y <= 1)) throw new Error('FR218 mechanics perturbation escaped normalized provider Y range.');
    return { ...point, y };
  });
}

async function buildParity(inputFixture, metadataFixture, baseProviderLandmarks) {
  const factory = runtimeFactory(baseProviderLandmarks);
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr218:runtime-verifier:base',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ fixture: true }),
  }, factory);
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
}

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const baseProviderLandmarks = parseProviderLandmarks(inputFixture);
const parity = await buildParity(inputFixture, metadataFixture, baseProviderLandmarks);

const candidates = [];
for (let index = 0; index < DELTAS.length; index += 1) {
  const delta = DELTAS[index];
  const providerLandmarks = perturbOuterCorners(baseProviderLandmarks, delta);
  const geometry = await runGovernedMetricGeometryFR77({
    schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
    providerRunRef: `fr218:runtime-verifier:variant:${index + 1}`,
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ fixture: true, index }),
    frameWidth: 820,
    frameHeight: 1024,
    geometryMetadataPbtxt: metadataFixture,
  }, parity, runtimeFactory(providerLandmarks));

  const bundle = computeEyeNeutralAxisBundleFR210(geometry);
  const manifest = admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: 'fr218:runtime-verifier:mechanics-only',
    captureSeriesRef: `fr218:runtime-verifier:series:${index + 1}`,
    captureRef: `fr218:runtime-verifier:capture:${index + 1}`,
    captureConditionRef: 'fr218:runtime-verifier:controlled-perturbation',
    captureSequenceIndex: 1,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
  const captureAdmission = issueCaptureAdmissionFromFR159FR218(manifest);
  const partition = index < 6 ? 'selection' : 'holdout';
  const admitted = admitEyeCornerOrientationCandidateFR218(bundle, {
    sampleRef: `sample:fr218:runtime:${index + 1}`,
    participantKey: `participant:fr218:runtime:${index + 1}`,
    captureFamilyKey: `capture-family:fr218:runtime:${index + 1}`,
    partition,
    reviewItemRef: `review-item:fr218:runtime:${index + 1}`,
    reviewArtifactRef: `review-artifact:fr218:runtime:${index + 1}`,
    captureAdmission,
    confounderTags: ['controlled_outer_corner_y_perturbation_mechanics_only'],
  });
  if (admitted.status !== 'available') {
    throw new Error(`FR218 runtime candidate ${index + 1} unexpectedly unavailable: ${admitted.reason}`);
  }
  candidates.push(admitted.candidate);
}

assertSelectionHoldoutCoverageFR218(candidates);

const selectionValues = candidates
  .filter((candidate) => candidate.partition === 'selection')
  .map((candidate) => candidate.metricValue);
if (new Set(selectionValues).size < 3) {
  throw new Error(`FR218 verifier failed to produce at least three distinct selection metric values: ${selectionValues.join(',')}`);
}

const selection = selectMetricSpaceCoverageCandidatesFR218(candidates, {
  partition: 'selection',
  binCount: 3,
  targetPerBin: 1,
});
const reviewItems = projectBlindedReviewItemsFR218(selection, candidates);
if (
  reviewItems.length !== 3
  || reviewItems.some((item) =>
    item.metricValuesExposed !== false
    || item.candidateMetricIdentityExposed !== false
    || item.providerIdentityExposed !== false
    || item.extractorIdentityExposed !== false
    || item.coverageBinExposed !== false
    || item.candidateThresholdExposed !== false
    || item.traditionalMeaningExposed !== false
    || item.fortuneOutputExposed !== false
    || item.peerLabelsExposed !== false)
) throw new Error('FR218 blinded review projection leaked hidden research information.');

const syntheticAnnotations = reviewItems.flatMap((item) => [
  { reviewItemRef: item.reviewItemRef, reviewerKey: 'verifier:reviewer:1', label: 'slightly_downturned' },
  { reviewItemRef: item.reviewItemRef, reviewerKey: 'verifier:reviewer:2', label: 'approximately_horizontal' },
  { reviewItemRef: item.reviewItemRef, reviewerKey: 'verifier:reviewer:3', label: 'not_assessable' },
]);
const summaries = summarizeOrdinalAnnotationsFR218(reviewItems, syntheticAnnotations);
if (
  summaries.length !== reviewItems.length
  || summaries.some((summary) =>
    summary.reviewerDisagreementPreserved !== true
    || summary.consensusCollapsed !== false
    || summary.thresholdIssued !== false
    || summary.transitionZoneIssued !== false)
) throw new Error('FR218 annotation summary collapsed disagreement or widened authority.');

const readiness = assessHumanEvidenceReadinessFR218({
  repeatCaptureEvidenceRefs: [],
  blindedHumanAnnotationEvidenceRefs: [],
  syntheticFixtureRefs: ['fixture:fr218:runtime-verifier:controlled-perturbation'],
});
if (
  readiness.state !== FR218_HUMAN_EVIDENCE_GATE
  || readiness.syntheticEvidenceMaySatisfyHumanGate !== false
  || readiness.thresholdSelectionAuthorized !== false
  || readiness.classifierAuthorized !== false
  || readiness.transitionZoneAuthorized !== false
  || readiness.traditionalBindingAuthorized !== false
) throw new Error('FR218 runtime verifier incorrectly promoted mechanics fixtures into empirical authority.');

process.stdout.write(`${JSON.stringify({
  status: 'FR218_OBSERVABLE_MORPHOLOGY_RUNTIME_MECHANICS_PASS',
  releaseCommit: RELEASE_COMMIT,
  controlledPerturbationMechanicsOnly: true,
  empiricalHumanEvidenceClaimed: false,
  candidateCount: candidates.length,
  selectionMetricValues: selectionValues,
  selectedReviewItemCount: reviewItems.length,
  reviewerProviderBlind: true,
  reviewerMetricBlind: true,
  disagreementPreserved: true,
  humanEvidenceState: readiness.state,
  thresholdSelectionAuthorized: readiness.thresholdSelectionAuthorized,
  classifierAuthorized: readiness.classifierAuthorized,
  traditionalBindingAuthorized: readiness.traditionalBindingAuthorized,
})}\n`);
