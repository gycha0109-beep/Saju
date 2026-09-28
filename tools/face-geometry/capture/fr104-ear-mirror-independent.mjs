import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from '/face/neutral-ear-mirror-independent-fixture-protocol-fr104.js';

const protocol =
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104;
const PROVIDER_LANDMARK_COUNT = 478;

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
      throw new Error(
        'FaceLandmarker returned invalid normalized X geometry.',
      );
    }
    total += point.x;
  }
  return total / vertices.length;
}

function summarize(result) {
  const faceCount = Array.isArray(result?.faceLandmarks)
    ? result.faceLandmarks.length
    : 0;

  if (faceCount !== 1) {
    return Object.freeze({
      status: 'unavailable_exactly_one_face_required',
      faceCount,
    });
  }

  const landmarks = result.faceLandmarks[0];
  if (
    !Array.isArray(landmarks)
    || landmarks.length !== PROVIDER_LANDMARK_COUNT
  ) {
    return Object.freeze({
      status: 'unavailable_provider_landmark_count_mismatch',
      faceCount,
    });
  }

  return Object.freeze({
    status: 'candidate_scalar_evidence',
    faceCount: 1,
    leftEyeCentroidX:
      centroidX(landmarks, LEFT_EYE_VERTICES),
    rightEyeCentroidX:
      centroidX(landmarks, RIGHT_EYE_VERTICES),
  });
}

function makeCanvas(bitmap, mirrored) {
  const canvas =
    globalThis.document.createElement('canvas');
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

function pairEvidence(original, mirrored) {
  if (
    original.status !== 'candidate_scalar_evidence'
    || mirrored.status !== 'candidate_scalar_evidence'
  ) {
    return Object.freeze({
      status: 'unavailable_pair',
      originalStatus: original.status,
      mirroredStatus: mirrored.status,
      originalFaceCount: original.faceCount,
      mirroredFaceCount: mirrored.faceCount,
    });
  }

  const sameLabelReflectionTotalAbsoluteError =
    Math.abs(
      (1 - original.leftEyeCentroidX)
        - mirrored.leftEyeCentroidX,
    )
    + Math.abs(
      (1 - original.rightEyeCentroidX)
        - mirrored.rightEyeCentroidX,
    );
  const crossLabelReflectionTotalAbsoluteError =
    Math.abs(
      (1 - original.leftEyeCentroidX)
        - mirrored.rightEyeCentroidX,
    )
    + Math.abs(
      (1 - original.rightEyeCentroidX)
        - mirrored.leftEyeCentroidX,
    );

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
    status: 'paired_scalar_evidence',
    original: Object.freeze({
      leftEyeCentroidX: original.leftEyeCentroidX,
      rightEyeCentroidX: original.rightEyeCentroidX,
    }),
    mirrored: Object.freeze({
      leftEyeCentroidX: mirrored.leftEyeCentroidX,
      rightEyeCentroidX: mirrored.rightEyeCentroidX,
    }),
    sameLabelReflectionTotalAbsoluteError,
    crossLabelReflectionTotalAbsoluteError,
    closerPattern,
    numericAcceptanceThresholdApplied: false,
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;
  let bitmap = null;

  try {
    setStatus('공개 fixture 다운로드·검증 중…');
    const response =
      await globalThis.fetch(protocol.fixture.assetUrl, {
        cache: 'no-store',
      });
    if (!response.ok) {
      throw new Error(
        'fixture fetch failed: HTTP ' + response.status,
      );
    }

    const bytes = await response.arrayBuffer();
    const observedSha256 = await sha256Hex(bytes);
    if (observedSha256 !== protocol.fixture.sha256) {
      throw new Error(
        'fixture SHA-256 mismatch; controlled run aborted.',
      );
    }

    bitmap = await globalThis.createImageBitmap(
      new globalThis.Blob([bytes], { type: 'image/png' }),
    );
    if (
      bitmap.width !== protocol.fixture.expectedWidth
      || bitmap.height !== protocol.fixture.expectedHeight
    ) {
      throw new Error(
        'decoded fixture dimensions do not match pinned protocol.',
      );
    }

    setStatus('MediaPipe v0.10.35 runtime 준비 중…');
    const fileset = await FilesetResolver.forVisionTasks(
      protocol.runtime.wasmRoot,
    );
    landmarker =
      await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: protocol.runtime.modelAssetRef,
        },
        runningMode: 'IMAGE',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      });

    setStatus('원본/수평반전 추론 중…');
    const original = summarize(
      landmarker.detect(makeCanvas(bitmap, false)),
    );
    const mirrored = summarize(
      landmarker.detect(makeCanvas(bitmap, true)),
    );
    const pair = pairEvidence(original, mirrored);

    const result = Object.freeze({
      schemaVersion:
        'fr104-controlled-provider-independent-fixture-mirror-result-v1',
      authorityState:
        'single_independent_public_fixture_scalar_evidence_only_no_general_semantics',
      runtime: Object.freeze({
        packageName: protocol.runtime.packageName,
        packageVersion: protocol.runtime.packageVersion,
        wasmRoot: protocol.runtime.wasmRoot,
        modelAssetRef: protocol.runtime.modelAssetRef,
        runtimeAssetByteDigestVerified: false,
        modelAssetByteDigestVerified: false,
      }),
      fixture: Object.freeze({
        fixtureRef: protocol.fixture.fixtureRef,
        sourceRepository: protocol.fixture.sourceRepository,
        sourceCommit: protocol.fixture.sourceCommit,
        registryBlobSha: protocol.fixture.registryBlobSha,
        metadataBlobSha: protocol.fixture.metadataBlobSha,
        fileName: protocol.fixture.fileName,
        expectedSha256: protocol.fixture.sha256,
        observedSha256,
        digestVerified: true,
        width: bitmap.width,
        height: bitmap.height,
        rawFixturePersisted: false,
        sourceRepositoryDistinctFromMediaPipeFixtureSource:
          protocol.fixture
            .sourceRepositoryDistinctFromMediaPipeFixtureSource,
      }),
      transformation: Object.freeze({
        pair: ['original', 'horizontal_mirror'],
        resizeApplied: false,
        cropApplied: false,
        rotationApplied: false,
        taskImageProcessingRotationDegrees: 0,
      }),
      pair,
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
        resultMayBeCalledGeneralProviderMirrorSemantics:
          false,
        providerLabelMayBeCalledAnatomicalSide: false,
        anatomicalLateralityAuthorized: false,
        validatedExternalEarObservationAuthorized: false,
        traditionalBindingAuthorized: false,
        productionAuthorization: false,
      }),
    });

    elements.result.textContent =
      JSON.stringify(result, null, 2);
    setStatus('완료 · scalar-only JSON을 복사하십시오.');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion:
        'fr104-controlled-provider-independent-fixture-mirror-error-v1',
      authorityState: 'fail_closed',
      error: message,
      userImageConsumed: false,
      rawLandmarksPersisted: false,
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
