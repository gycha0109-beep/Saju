import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104,
} from '/face/neutral-ear-makehuman-provider-preflight-fr104.js';

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104;
const PROVIDER_LANDMARK_COUNT =
  protocol.providerEligibility.expectedLandmarkCount;

const elements = Object.freeze({
  run: globalThis.document.querySelector('#run'),
  status: globalThis.document.querySelector('#status'),
  result: globalThis.document.querySelector('#result'),
});

function setStatus(message) {
  elements.status.textContent = message;
}

function toHex(bytes) {
  return Array.from(
    bytes,
    (value) => value.toString(16).padStart(2, '0'),
  ).join('');
}

async function sha256Hex(bytes) {
  return toHex(
    new Uint8Array(
      await globalThis.crypto.subtle.digest('SHA-256', bytes),
    ),
  );
}

function eyeVertices(symbol) {
  const edges = FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error(
      'FR24 eye topology witness is unavailable: ' + symbol,
    );
  }
  return Object.freeze(
    Array.from(
      new Set(edges.flatMap((edge) => [edge.start, edge.end])),
    ).sort((left, right) => left - right),
  );
}

const LEFT_EYE_VERTICES =
  eyeVertices('FACE_LANDMARKS_LEFT_EYE');
const RIGHT_EYE_VERTICES =
  eyeVertices('FACE_LANDMARKS_RIGHT_EYE');

function centroidXY(landmarks, vertices) {
  let x = 0;
  let y = 0;
  for (const vertex of vertices) {
    const point = landmarks[vertex];
    if (
      point === undefined
      || !Number.isFinite(point.x)
      || !Number.isFinite(point.y)
      || point.x < 0
      || point.x > 1
      || point.y < 0
      || point.y > 1
    ) {
      throw new Error(
        'FaceLandmarker returned invalid normalized eye geometry.',
      );
    }
    x += point.x;
    y += point.y;
  }
  return Object.freeze({
    x: x / vertices.length,
    y: y / vertices.length,
  });
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function classifyPairRelation(providerLeft, providerRight) {
  const anatomical =
    protocol.independentAnatomicalGroundTruth;
  const left = anatomical.anatomicalLeftEye;
  const right = anatomical.anatomicalRightEye;

  const directCost =
    distance(providerLeft, left)
    + distance(providerRight, right);
  const swappedCost =
    distance(providerLeft, right)
    + distance(providerRight, left);

  let relation = 'equal_or_unresolved';
  if (directCost < swappedCost) {
    relation = 'direct_assignment_closer';
  } else if (swappedCost < directCost) {
    relation = 'swapped_assignment_closer';
  }

  return Object.freeze({
    directCost,
    swappedCost,
    relation,
    numericAcceptanceThresholdApplied: false,
  });
}

function baseResult(fixture) {
  return {
    schemaVersion:
      'fr104-makehuman-provider-preflight-result-v1',
    fixture: Object.freeze({
      expectedSha256: protocol.fixture.expectedSha256,
      observedSha256: fixture.observedSha256,
      digestVerified: true,
      width: fixture.width,
      height: fixture.height,
      repositoryPersistence: false,
      ephemeralMaterializationForProviderPreflight: true,
    }),
    runtime: Object.freeze({
      packageName: protocol.runtime.packageName,
      packageVersion: protocol.runtime.packageVersion,
      wasmRoot: protocol.runtime.wasmRoot,
      modelAssetRef: protocol.runtime.modelAssetRef,
      runningMode: protocol.runtime.runningMode,
      numFaces: protocol.runtime.numFaces,
      runtimeAssetByteDigestVerified:
        protocol.runtime.runtimeAssetByteDigestVerified,
      modelAssetByteDigestVerified:
        protocol.runtime.modelAssetByteDigestVerified,
    }),
    privacy: Object.freeze({
      userImageConsumed: false,
      cameraAccessed: false,
      rawProviderLandmarksReturned: false,
      rawProviderLandmarksPersisted: false,
      biometricEmbeddingProduced: false,
      identityTemplateProduced: false,
    }),
    authority: Object.freeze({
      providerPreflightExecuted: false,
      providerFaceDetectabilityVerified: false,
      providerLabelMappedToAnatomicalSide: false,
      anatomicalReferenceAdmitted: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    }),
  };
}

function summarizeProviderResult(result, fixture) {
  const shared = baseResult(fixture);
  const faces = Array.isArray(result?.faceLandmarks)
    ? result.faceLandmarks
    : [];
  const faceCount = faces.length;

  if (faceCount !== 1) {
    return Object.freeze({
      ...shared,
      authorityState:
        'provider_preflight_unavailable_no_anatomical_mapping',
      providerEligibility: Object.freeze({
        state: 'provider_cannot_detect_face',
        faceCount,
        landmarkCount: null,
        exactlyOneFaceVerified: false,
        expectedLandmarkCount: PROVIDER_LANDMARK_COUNT,
      }),
      providerEyeCentroids: null,
      independentAnatomicalGroundTruth:
        protocol.independentAnatomicalGroundTruth,
      comparison: null,
    });
  }

  const landmarks = faces[0];
  const landmarkCount = Array.isArray(landmarks)
    ? landmarks.length
    : 0;
  if (landmarkCount !== PROVIDER_LANDMARK_COUNT) {
    return Object.freeze({
      ...shared,
      authorityState:
        'provider_preflight_unavailable_no_anatomical_mapping',
      providerEligibility: Object.freeze({
        state: 'unavailable',
        faceCount,
        landmarkCount,
        exactlyOneFaceVerified: true,
        expectedLandmarkCount: PROVIDER_LANDMARK_COUNT,
      }),
      providerEyeCentroids: null,
      independentAnatomicalGroundTruth:
        protocol.independentAnatomicalGroundTruth,
      comparison: null,
    });
  }

  const providerLeft =
    centroidXY(landmarks, LEFT_EYE_VERTICES);
  const providerRight =
    centroidXY(landmarks, RIGHT_EYE_VERTICES);

  return Object.freeze({
    ...shared,
    authorityState:
      'candidate_scalar_evidence_only_no_anatomical_mapping',
    providerEligibility: Object.freeze({
      state: 'exact_one_face_478_landmarks_observed',
      faceCount,
      landmarkCount,
      exactlyOneFaceVerified: true,
      expectedLandmarkCount: PROVIDER_LANDMARK_COUNT,
    }),
    providerEyeCentroids: Object.freeze({
      providerLeft,
      providerRight,
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning',
    }),
    independentAnatomicalGroundTruth:
      protocol.independentAnatomicalGroundTruth,
    comparison:
      classifyPairRelation(providerLeft, providerRight),
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;
  let bitmap = null;

  try {
    setStatus('U1.2 pinned MakeHuman fixture 검증 중…');
    const response = await globalThis.fetch(
      protocol.fixture.route,
      { cache: 'no-store' },
    );
    if (!response.ok) {
      throw new Error(
        'MakeHuman fixture HTTP ' + response.status,
      );
    }
    const bytes = await response.arrayBuffer();
    const observedSha256 = await sha256Hex(bytes);
    if (observedSha256 !== protocol.fixture.expectedSha256) {
      throw new Error(
        'MakeHuman fixture SHA-256 mismatch: expected='
          + protocol.fixture.expectedSha256
          + ' observed='
          + observedSha256,
      );
    }

    bitmap = await globalThis.createImageBitmap(
      new globalThis.Blob([bytes], { type: 'image/png' }),
    );
    if (
      bitmap.width !== protocol.fixture.width
      || bitmap.height !== protocol.fixture.height
    ) {
      throw new Error(
        'MakeHuman fixture dimensions mismatch: expected='
          + protocol.fixture.width
          + 'x'
          + protocol.fixture.height
          + ' observed='
          + bitmap.width
          + 'x'
          + bitmap.height,
      );
    }

    setStatus('MediaPipe v0.10.35 exact IMAGE runtime 준비 중…');
    const fileset = await FilesetResolver.forVisionTasks(
      protocol.runtime.wasmRoot,
    );
    landmarker = await FaceLandmarker.createFromOptions(
      fileset,
      {
        baseOptions: {
          modelAssetPath: protocol.runtime.modelAssetRef,
        },
        runningMode: protocol.runtime.runningMode,
        numFaces: protocol.runtime.numFaces,
        outputFaceBlendshapes:
          protocol.runtime.outputFaceBlendshapes,
        outputFacialTransformationMatrixes:
          protocol.runtime.outputFacialTransformationMatrixes,
      },
    );

    setStatus('pinned MakeHuman raster 추론 중…');
    const result = summarizeProviderResult(
      landmarker.detect(bitmap),
      Object.freeze({
        observedSha256,
        width: bitmap.width,
        height: bitmap.height,
      }),
    );

    elements.result.textContent =
      JSON.stringify(result, null, 2);
    setStatus('완료 · bounded scalar result');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion:
        'fr104-makehuman-provider-preflight-error-v1',
      authorityState: 'fail_closed',
      error: message,
      userImageConsumed: false,
      rawProviderLandmarksPersisted: false,
      anatomicalLateralityAuthorized: false,
      productionAuthorization: false,
    }, null, 2);
    setStatus('실행 실패 · fail-closed');
  } finally {
    if (landmarker !== null) landmarker.close();
    if (bitmap !== null) bitmap.close();
    elements.run.disabled = false;
  }
}

elements.run.addEventListener('click', () => {
  void run();
});

const params =
  new URLSearchParams(globalThis.location.search);
if (params.get('autorun') === '1') {
  void run();
}
