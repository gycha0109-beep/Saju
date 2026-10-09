import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104,
} from '/face/neutral-ear-mirror-multifixture-protocol-fr104.js';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from '/face/neutral-ear-mirror-independent-fixture-protocol-fr104.js';

const protocol = NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104;
const independentProtocol =
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104;
const PROVIDER_LANDMARK_COUNT = 478;

const elements = Object.freeze({
  run: globalThis.document.querySelector('#run'),
  status: globalThis.document.querySelector('#status'),
  result: globalThis.document.querySelector('#result'),
  runIndependent:
    globalThis.document.querySelector('#run-independent'),
  statusIndependent:
    globalThis.document.querySelector('#status-independent'),
  resultIndependent:
    globalThis.document.querySelector('#result-independent'),
});

function setStatus(message) {
  elements.status.textContent = message;
}

function setIndependentStatus(message) {
  elements.statusIndependent.textContent = message;
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
      throw new Error(
        'FaceLandmarker returned invalid normalized X geometry.',
      );
    }
    total += point.x;
  }
  return total / vertices.length;
}

function summarizeProviderResult(result) {
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
    leftEyeCentroidX: centroidX(landmarks, LEFT_EYE_VERTICES),
    rightEyeCentroidX: centroidX(
      landmarks,
      RIGHT_EYE_VERTICES,
    ),
  });
}

function makeCanvas(bitmap, mirrored) {
  const canvas = globalThis.document.createElement('canvas');
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

function pairedScalarEvidence(original, mirrored) {
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

async function runFixture(landmarker, fixture) {
  let bitmap = null;
  try {
    const response = await globalThis.fetch(fixture.assetUrl, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return Object.freeze({
        fixtureRef: fixture.fixtureRef,
        status: 'unavailable_fixture_fetch_failed',
        httpStatus: response.status,
      });
    }

    const bytes = await response.arrayBuffer();
    const observedSha256 = await sha256Hex(bytes);
    if (observedSha256 !== fixture.sha256) {
      return Object.freeze({
        fixtureRef: fixture.fixtureRef,
        status: 'unavailable_fixture_digest_mismatch',
        expectedSha256: fixture.sha256,
        observedSha256,
      });
    }

    bitmap = await globalThis.createImageBitmap(
      new globalThis.Blob([bytes], { type: 'image/jpeg' }),
    );
    if (!(bitmap.width > 0) || !(bitmap.height > 0)) {
      return Object.freeze({
        fixtureRef: fixture.fixtureRef,
        status: 'unavailable_invalid_decoded_dimensions',
      });
    }

    const original = summarizeProviderResult(
      landmarker.detect(makeCanvas(bitmap, false)),
    );
    const mirrored = summarizeProviderResult(
      landmarker.detect(makeCanvas(bitmap, true)),
    );
    const pair = pairedScalarEvidence(original, mirrored);

    return Object.freeze({
      fixtureRef: fixture.fixtureRef,
      fileName: fixture.fileName,
      evidenceRole: fixture.evidenceRole,
      expectedSha256: fixture.sha256,
      observedSha256,
      digestVerified: true,
      width: bitmap.width,
      height: bitmap.height,
      rawFixturePersisted: false,
      pair,
    });
  } catch (error) {
    return Object.freeze({
      fixtureRef: fixture.fixtureRef,
      status: 'unavailable_runtime_error_fail_closed',
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    if (bitmap !== null) bitmap.close();
  }
}

function aggregate(results) {
  const successful = results.filter(
    (result) => result.pair?.status === 'paired_scalar_evidence',
  );
  const counts = {
    same_label_reflection_closer: 0,
    cross_label_reflection_closer: 0,
    equal: 0,
  };
  for (const result of successful) {
    counts[result.pair.closerPattern] += 1;
  }

  return Object.freeze({
    fixtureCount: results.length,
    successfulFixtureCount: successful.length,
    unavailableFixtureCount: results.length - successful.length,
    closerPatternCounts: Object.freeze(counts),
    aggregateMayBeCalledGeneralProviderMirrorSemantics: false,
    anatomicalLateralityAuthorized: false,
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;

  try {
    setStatus('MediaPipe v0.10.35 runtime 준비 중…');
    const fileset = await FilesetResolver.forVisionTasks(
      protocol.runtime.wasmRoot,
    );
    landmarker = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: protocol.runtime.modelAssetRef,
      },
      runningMode: 'IMAGE',
      numFaces: 1,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
    });

    const results = [];
    for (let index = 0; index < protocol.fixtures.length; index += 1) {
      const fixture = protocol.fixtures[index];
      setStatus(
        String(index + 1)
          + '/'
          + String(protocol.fixtures.length)
          + ' · '
          + fixture.fileName
          + ' 검증·추론 중…',
      );
      results.push(await runFixture(landmarker, fixture));
    }

    const bounded = Object.freeze({
      schemaVersion:
        'fr104-controlled-provider-multifixture-mirror-result-v1',
      authorityState:
        'multi_public_fixture_scalar_evidence_only_no_general_semantics',
      upstreamRelease: protocol.upstreamRelease,
      runtime: Object.freeze({
        packageName: protocol.runtime.packageName,
        packageVersion: protocol.runtime.packageVersion,
        wasmRoot: protocol.runtime.wasmRoot,
        modelAssetRef: protocol.runtime.modelAssetRef,
        runtimeAssetByteDigestVerified: false,
        modelAssetByteDigestVerified: false,
      }),
      transformation: Object.freeze({
        pairPerFixture: ['original', 'horizontal_mirror'],
        resizeBetweenPairMembers: false,
        cropBetweenPairMembers: false,
        rotationBetweenPairMembers: false,
        taskImageProcessingRotationDegrees: 0,
      }),
      fixtureResults: Object.freeze(results),
      aggregate: aggregate(results),
      privacy: Object.freeze({
        userImageConsumed: false,
        cameraAccessed: false,
        sourceImagesPersisted: false,
        rawLandmarksReturned: false,
        rawLandmarksPersisted: false,
        embeddingProduced: false,
        identityTemplateProduced: false,
      }),
      authority: Object.freeze({
        repeatedPatternMayBeCalledGeneralProviderMirrorSemantics:
          false,
        providerLabelMayBeCalledAnatomicalSide: false,
        anatomicalLateralityAuthorized: false,
        validatedExternalEarObservationAuthorized: false,
        traditionalBindingAuthorized: false,
        productionAuthorization: false,
      }),
    });

    elements.result.textContent = JSON.stringify(bounded, null, 2);
    setStatus('완료 · scalar-only multi-fixture 결과를 확인하십시오.');
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion:
        'fr104-controlled-provider-multifixture-mirror-error-v1',
      authorityState: 'fail_closed',
      error: message,
      rawLandmarksPersisted: false,
      userImageConsumed: false,
    }, null, 2);
    setStatus('실행 실패 · fail-closed');
  } finally {
    if (landmarker !== null) landmarker.close();
    elements.run.disabled = false;
  }
}

async function runIndependent() {
  elements.runIndependent.disabled = true;
  elements.resultIndependent.textContent = '{}';
  let landmarker = null;
  let bitmap = null;

  try {
    setIndependentStatus('독립 공개 fixture 다운로드·검증 중…');
    const response = await globalThis.fetch(
      independentProtocol.fixture.assetUrl,
      { cache: 'no-store' },
    );
    if (!response.ok) {
      throw new Error(
        'independent fixture fetch failed: HTTP '
          + response.status,
      );
    }

    const bytes = await response.arrayBuffer();
    const observedSha256 = await sha256Hex(bytes);
    if (
      observedSha256
        !== independentProtocol.fixture.sha256
    ) {
      throw new Error(
        'independent fixture SHA-256 mismatch; controlled run aborted.',
      );
    }

    bitmap = await globalThis.createImageBitmap(
      new globalThis.Blob([bytes], { type: 'image/png' }),
    );
    if (
      bitmap.width
        !== independentProtocol.fixture.expectedWidth
      || bitmap.height
        !== independentProtocol.fixture.expectedHeight
    ) {
      throw new Error(
        'independent fixture dimensions do not match the pinned protocol.',
      );
    }

    setIndependentStatus('MediaPipe v0.10.35 runtime 준비 중…');
    const fileset = await FilesetResolver.forVisionTasks(
      independentProtocol.runtime.wasmRoot,
    );
    landmarker = await FaceLandmarker.createFromOptions(
      fileset,
      {
        baseOptions: {
          modelAssetPath:
            independentProtocol.runtime.modelAssetRef,
        },
        runningMode: 'IMAGE',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      },
    );

    setIndependentStatus('원본/수평반전 추론 중…');
    const original = summarizeProviderResult(
      landmarker.detect(makeCanvas(bitmap, false)),
    );
    const mirrored = summarizeProviderResult(
      landmarker.detect(makeCanvas(bitmap, true)),
    );
    const pair = pairedScalarEvidence(
      original,
      mirrored,
    );

    const result = Object.freeze({
      schemaVersion:
        'fr104-controlled-provider-independent-fixture-mirror-result-v1',
      authorityState:
        'single_independent_public_fixture_scalar_evidence_only_no_general_semantics',
      runtime: Object.freeze({
        packageName:
          independentProtocol.runtime.packageName,
        packageVersion:
          independentProtocol.runtime.packageVersion,
        wasmRoot:
          independentProtocol.runtime.wasmRoot,
        modelAssetRef:
          independentProtocol.runtime.modelAssetRef,
        runtimeAssetByteDigestVerified: false,
        modelAssetByteDigestVerified: false,
      }),
      fixture: Object.freeze({
        fixtureRef:
          independentProtocol.fixture.fixtureRef,
        sourceRepository:
          independentProtocol.fixture.sourceRepository,
        sourceCommit:
          independentProtocol.fixture.sourceCommit,
        registryBlobSha:
          independentProtocol.fixture.registryBlobSha,
        metadataBlobSha:
          independentProtocol.fixture.metadataBlobSha,
        fileName:
          independentProtocol.fixture.fileName,
        expectedSha256:
          independentProtocol.fixture.sha256,
        observedSha256,
        digestVerified: true,
        width: bitmap.width,
        height: bitmap.height,
        rawFixturePersisted: false,
        sourceRepositoryDistinctFromMediaPipeFixtureSource:
          independentProtocol.fixture
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
        validatedExternalEarObservationAuthorized:
          false,
        traditionalBindingAuthorized: false,
        productionAuthorization: false,
      }),
    });

    elements.resultIndependent.textContent =
      JSON.stringify(result, null, 2);
    setIndependentStatus(
      '완료 · scalar-only 독립 fixture 결과를 확인하십시오.',
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    elements.resultIndependent.textContent =
      JSON.stringify({
        schemaVersion:
          'fr104-controlled-provider-independent-fixture-mirror-error-v1',
        authorityState: 'fail_closed',
        error: message,
        rawLandmarksPersisted: false,
        userImageConsumed: false,
      }, null, 2);
    setIndependentStatus('실행 실패 · fail-closed');
  } finally {
    if (landmarker !== null) landmarker.close();
    if (bitmap !== null) bitmap.close();
    elements.runIndependent.disabled = false;
  }
}

elements.run.addEventListener('click', () => {
  void run();
});

elements.runIndependent.addEventListener('click', () => {
  void runIndependent();
});
