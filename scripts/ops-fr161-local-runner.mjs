import {
  FaceLandmarker,
  FilesetResolver,
} from './tasks-vision/vision_bundle.mjs';
import {
  DEFAULT_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_DEPENDENCIES_FR161,
  runEyePairProspectiveEphemeralRealCaptureSeriesFR161,
} from './face-dist/eye-pair-prospective-ephemeral-real-capture-series-fr161.js';

function fail(message) {
  throw new Error(`FR161 local runner: ${message}`);
}

async function fetchRequired(url, mode = 'text') {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) fail(`failed to fetch ${url}: HTTP ${response.status}`);
  if (mode === 'json') return response.json();
  if (mode === 'blob') return response.blob();
  return response.text();
}

const wasmRoot = new URL('./tasks-vision/wasm', import.meta.url).href.replace(/\/$/u, '');
const modelAssetPath = new URL('./face_landmarker.task', import.meta.url).href;

const localRuntimeFactory = Object.freeze({
  async create() {
    const fileset = await FilesetResolver.forVisionTasks(wasmRoot);
    const landmarker = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath },
      runningMode: 'IMAGE',
      numFaces: 1,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
    });
    return Object.freeze({
      detect(image) {
        return landmarker.detect(image);
      },
      close() {
        landmarker.close();
      },
    });
  },
});

async function main() {
  const [capture1, capture2, geometryMetadataPbtxt, parity, exportManifest] = await Promise.all([
    fetchRequired('./capture-1.jpg', 'blob'),
    fetchRequired('./capture-2.jpg', 'blob'),
    fetchRequired('./geometry_metadata.pbtxt', 'text'),
    fetchRequired('./fr76-parity.json', 'json'),
    fetchRequired('./export-manifest.json', 'json'),
  ]);

  const dependencies = Object.freeze({
    ...DEFAULT_EYE_PAIR_PROSPECTIVE_EPHEMERAL_REAL_CAPTURE_DEPENDENCIES_FR161,
    runtimeFactory: localRuntimeFactory,
  });

  const result = await runEyePairProspectiveEphemeralRealCaptureSeriesFR161({
    schemaVersion: 'fr161-eye-pair-prospective-ephemeral-real-capture-series-request-v1',
    acquisitionRunRef: 'prospective:20260908:local-run-01',
    prospectiveCollectionRef: 'prospective:20260908:eye-pair-collection-01',
    captureSeriesRef: 'prospective:20260908:series-b',
    captureConditionRef: 'baseline-neutral-same-session',
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    captures: [
      {
        captureRef: 'prospective:20260908:series-b:capture-01',
        providerRunRef: 'prospective:20260908:series-b:provider-01',
        captureSequenceIndex: 1,
        imageBlob: capture1,
      },
      {
        captureRef: 'prospective:20260908:series-b:capture-02',
        providerRunRef: 'prospective:20260908:series-b:provider-02',
        captureSequenceIndex: 2,
        imageBlob: capture2,
      },
    ],
    geometryMetadataPbtxt,
    parity,
  }, dependencies);

  const safe = Object.freeze({
    status: 'FR161_LOCAL_PROSPECTIVE_REAL_CAPTURE_PASS',
    sourceMergedSha: exportManifest.sourceMergedSha,
    mediaPipeTasksVisionVersion: exportManifest.mediaPipeTasksVisionVersion,
    modelSha256: exportManifest.modelSha256,
    prospectiveCollectionRef: result.prospectiveCollectionRef,
    captureSeriesRef: result.captureSeriesRef,
    captureConditionRef: result.captureConditionRef,
    captureCount: result.captureCount,
    captures: result.captures.map((capture) => ({
      captureRef: capture.captureRef,
      captureSequenceIndex: capture.captureSequenceIndex,
      frame: capture.frame,
      metricObservations: capture.fr160Record.metricObservations,
      prospectiveEligibilityState: capture.fr160Record.prospectiveEligibilityState,
    })),
    seriesConditionSummaries: result.dataset.seriesConditionSummaries,
    authorityBoundary: result.authorityBoundary,
    traditionalSemanticAuthority: result.traditionalSemanticAuthority,
    privacyBoundary: result.privacyBoundary,
  });

  document.body.textContent = JSON.stringify(safe, null, 2);
  document.documentElement.dataset.fr161Status = 'complete';
  globalThis.__FR161_RESULT__ = safe;
}

main().catch((error) => {
  const payload = {
    status: 'FR161_LOCAL_PROSPECTIVE_REAL_CAPTURE_FAIL',
    error: String(error?.stack ?? error),
  };
  document.body.textContent = JSON.stringify(payload, null, 2);
  document.documentElement.dataset.fr161Status = 'failed';
  globalThis.__FR161_RESULT__ = payload;
});
