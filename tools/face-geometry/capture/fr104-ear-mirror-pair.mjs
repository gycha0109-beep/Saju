import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104,
} from '/face/neutral-ear-mirror-pair-protocol-fr104.js';

const FIXTURE_URL =
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.assetUrl;
const FIXTURE_SHA256 =
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.sha256;
const FR26_MEDIAPIPE_WASM_ROOT =
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.wasmRoot;
const FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL =
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.modelAssetRef;
const PROVIDER_LANDMARK_COUNT = 478;

const elements = Object.freeze({
  run: document.querySelector('#run'),
  status: document.querySelector('#status'),
  result: document.querySelector('#result'),
});

function setStatus(message) {
  elements.status.textContent = message;
}

function toHex(bytes) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(bytes) {
  return toHex(
    new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)),
  );
}

function eyeVertices(symbol) {
  const edges = FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error('FR24 eye topology witness is unavailable: ' + symbol);
  }
  return Object.freeze(
    Array.from(
      new Set(edges.flatMap((edge) => [edge.start, edge.end])),
    ).sort((left, right) => left - right),
  );
}

const LEFT_EYE_VERTICES = eyeVertices('FACE_LANDMARKS_LEFT_EYE');
const RIGHT_EYE_VERTICES = eyeVertices('FACE_LANDMARKS_RIGHT_EYE');

function centroidX(landmarks, vertices) {
  let total = 0;
  for (const vertex of vertices) {
    const point = landmarks[vertex];
    if (
      point === undefined
      || !Number.isFinite(point.x)
      || point.x < 0
      || point.x > 1
    ) {
      throw new Error('FaceLandmarker returned invalid normalized X geometry.');
    }
    total += point.x;
  }
  return total / vertices.length;
}

function summarizeProviderResult(result) {
  if (
    !result
    || !Array.isArray(result.faceLandmarks)
    || result.faceLandmarks.length !== 1
  ) {
    throw new Error('FR104 mirror pair requires exactly one detected face.');
  }
  const landmarks = result.faceLandmarks[0];
  if (!Array.isArray(landmarks) || landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(
      'FR104 mirror pair requires exactly '
        + PROVIDER_LANDMARK_COUNT
        + ' provider landmarks.',
    );
  }

  return Object.freeze({
    leftEyeCentroidX: centroidX(landmarks, LEFT_EYE_VERTICES),
    rightEyeCentroidX: centroidX(landmarks, RIGHT_EYE_VERTICES),
  });
}

function makeCanvas(bitmap, mirrored) {
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d', {
    alpha: false,
    willReadFrequently: false,
  });
  if (context === null) {
    throw new Error('2D canvas context unavailable.');
  }
  if (mirrored) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(bitmap, 0, 0);
  return canvas;
}

function buildBoundedResult(original, mirrored, fixture) {
  const sameLabelReflectionTotalAbsoluteError =
    Math.abs((1 - original.leftEyeCentroidX) - mirrored.leftEyeCentroidX)
    + Math.abs((1 - original.rightEyeCentroidX) - mirrored.rightEyeCentroidX);
  const crossLabelReflectionTotalAbsoluteError =
    Math.abs((1 - original.leftEyeCentroidX) - mirrored.rightEyeCentroidX)
    + Math.abs((1 - original.rightEyeCentroidX) - mirrored.leftEyeCentroidX);

  let closerPattern = 'equal';
  if (
    sameLabelReflectionTotalAbsoluteError
      < crossLabelReflectionTotalAbsoluteError
  ) {
    closerPattern = 'same_label_reflection_closer';
  } else if (
    crossLabelReflectionTotalAbsoluteError
      < sameLabelReflectionTotalAbsoluteError
  ) {
    closerPattern = 'cross_label_reflection_closer';
  }

  return Object.freeze({
    schemaVersion: 'fr104-controlled-provider-mirror-pair-result-v1',
    authorityState:
      'single_public_fixture_scalar_evidence_only_no_anatomical_mapping',
    fixture: Object.freeze({
      sourceClass: 'mediapipe_public_test_asset_non_user_fixture',
      fileName: 'portrait.jpg',
      expectedSha256: FIXTURE_SHA256,
      observedSha256: fixture.observedSha256,
      digestVerified: true,
      width: fixture.width,
      height: fixture.height,
      rawFixturePersisted: false,
    }),
    runtime: Object.freeze({
      packageName: '@mediapipe/tasks-vision',
      packageVersion: '0.10.35',
      wasmRoot: FR26_MEDIAPIPE_WASM_ROOT,
      modelAssetRef: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
      runtimeAssetByteDigestVerified: false,
      modelAssetByteDigestVerified: false,
    }),
    transformation: Object.freeze({
      pair: ['original', 'horizontal_mirror'],
      resizeApplied: false,
      cropApplied: false,
      rotationApplied: false,
    }),
    scalarEvidence: Object.freeze({
      original,
      mirrored,
      sameLabelReflectionTotalAbsoluteError,
      crossLabelReflectionTotalAbsoluteError,
      closerPattern,
      numericAcceptanceThresholdApplied: false,
    }),
    privacy: Object.freeze({
      userImageConsumed: false,
      cameraAccessed: false,
      sourceImagePersisted: false,
      rawLandmarksReturned: false,
      rawLandmarksPersisted: false,
      embeddingProduced: false,
      identityTemplateProduced: false,
    }),
    authority: Object.freeze({
      closerPatternMayBeCalledGeneralProviderMirrorSemantics: false,
      providerLabelMayBeCalledAnatomicalSide: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    }),
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;
  let bitmap = null;

  try {
    setStatus('공개 fixture 다운로드·SHA-256 검증 중…');
    const response = await fetch(FIXTURE_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('portrait fixture HTTP ' + response.status);
    }
    const bytes = await response.arrayBuffer();
    const observedSha256 = await sha256Hex(bytes);
    if (observedSha256 !== FIXTURE_SHA256) {
      throw new Error(
        'portrait fixture SHA-256 mismatch: expected='
          + FIXTURE_SHA256
          + ' observed='
          + observedSha256,
      );
    }

    bitmap = await createImageBitmap(
      new Blob([bytes], { type: 'image/jpeg' }),
    );
    if (!(bitmap.width > 0) || !(bitmap.height > 0)) {
      throw new Error('decoded portrait fixture dimensions are invalid.');
    }

    setStatus('MediaPipe v0.10.35 runtime 준비 중…');
    const fileset = await FilesetResolver.forVisionTasks(
      FR26_MEDIAPIPE_WASM_ROOT,
    );
    landmarker = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
      },
      runningMode: 'IMAGE',
      numFaces: 1,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
    });

    setStatus('원본 / 수평 반전 추론 중…');
    const originalCanvas = makeCanvas(bitmap, false);
    const mirroredCanvas = makeCanvas(bitmap, true);
    const original = summarizeProviderResult(
      landmarker.detect(originalCanvas),
    );
    const mirrored = summarizeProviderResult(
      landmarker.detect(mirroredCanvas),
    );

    const bounded = buildBoundedResult(
      original,
      mirrored,
      Object.freeze({
        observedSha256,
        width: bitmap.width,
        height: bitmap.height,
      }),
    );
    elements.result.textContent = JSON.stringify(bounded, null, 2);
    setStatus('완료 · scalar-only 결과를 확인하십시오.');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion: 'fr104-controlled-provider-mirror-pair-error-v1',
      authorityState: 'fail_closed',
      error: message,
      rawLandmarksPersisted: false,
      userImageConsumed: false,
    }, null, 2);
    setStatus('실행 실패 · fail-closed');
  } finally {
    if (landmarker !== null) {
      landmarker.close();
    }
    if (bitmap !== null) {
      bitmap.close();
    }
    elements.run.disabled = false;
  }
}

elements.run.addEventListener('click', () => {
  void run();
});
