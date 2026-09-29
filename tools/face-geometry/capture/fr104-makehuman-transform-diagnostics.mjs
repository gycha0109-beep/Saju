import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  expectedNeutralEarMakeHumanRelationFR104,
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104,
  transformNeutralEarMakeHumanPointFR104,
} from '/face/neutral-ear-makehuman-transform-diagnostics-fr104.js';

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104;
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

function distance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function classifyPairRelation(
  providerLeft,
  providerRight,
  anatomicalLeft,
  anatomicalRight,
) {
  const directCost =
    distance(providerLeft, anatomicalLeft)
    + distance(providerRight, anatomicalRight);
  const swappedCost =
    distance(providerLeft, anatomicalRight)
    + distance(providerRight, anatomicalLeft);

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

function transformedCoordinate(
  sourceX,
  sourceY,
  width,
  height,
  transform,
) {
  let x = sourceX;
  let y = sourceY;
  if (transform.horizontalMirror) {
    x = width - 1 - x;
  }

  switch (transform.clockwiseRotationDegrees) {
    case 0:
      return Object.freeze({ x, y });
    case 90:
      return Object.freeze({
        x: height - 1 - y,
        y: x,
      });
    case 180:
      return Object.freeze({
        x: width - 1 - x,
        y: height - 1 - y,
      });
    case 270:
      return Object.freeze({
        x: y,
        y: width - 1 - x,
      });
    default:
      throw new Error(
        'Unsupported FR104 U3 rotation: '
          + transform.clockwiseRotationDegrees,
      );
  }
}

function transformRgba(source, width, height, transform) {
  if (width !== height) {
    throw new Error(
      'FR104 U3 currently requires a square canonical raster.',
    );
  }
  if (source.length !== width * height * 4) {
    throw new Error('FR104 U3 canonical RGBA length mismatch.');
  }

  const target = new globalThis.Uint8ClampedArray(source.length);
  for (let sy = 0; sy < height; sy += 1) {
    for (let sx = 0; sx < width; sx += 1) {
      const destination = transformedCoordinate(
        sx,
        sy,
        width,
        height,
        transform,
      );
      const sourceOffset = (sy * width + sx) * 4;
      const targetOffset =
        (destination.y * width + destination.x) * 4;
      target[targetOffset] = source[sourceOffset];
      target[targetOffset + 1] = source[sourceOffset + 1];
      target[targetOffset + 2] = source[sourceOffset + 2];
      target[targetOffset + 3] = source[sourceOffset + 3];
    }
  }
  return target;
}

function transformedGroundTruth(transform) {
  const source = protocol.independentAnatomicalGroundTruth;
  return Object.freeze({
    anatomicalLeftEye:
      transformNeutralEarMakeHumanPointFR104(
        source.anatomicalLeftEye,
        transform,
      ),
    anatomicalRightEye:
      transformNeutralEarMakeHumanPointFR104(
        source.anatomicalRightEye,
        transform,
      ),
    anatomicalIdentityPreserved: true,
  });
}

function summarizeProviderCase(
  providerResult,
  transformCase,
  transformedRgbaSha256,
  groundTruth,
) {
  const faces = Array.isArray(providerResult?.faceLandmarks)
    ? providerResult.faceLandmarks
    : [];
  const faceCount = faces.length;

  const common = {
    id: transformCase.id,
    horizontalMirror: transformCase.horizontalMirror,
    clockwiseRotationDegrees:
      transformCase.clockwiseRotationDegrees,
    transformOrder: transformCase.transformOrder,
    reflectionParity: transformCase.reflectionParity,
    expectedRelationHypothesis:
      transformCase.expectedRelationHypothesis,
    transformedRgbaSha256,
    transformedAnatomicalGroundTruth: groundTruth,
  };

  if (faceCount !== 1) {
    return Object.freeze({
      ...common,
      providerEligibility: Object.freeze({
        state: 'provider_cannot_detect_face',
        faceCount,
        landmarkCount: null,
        exactlyOneFaceVerified: false,
      }),
      providerEyeCentroids: null,
      comparison: null,
      matchesExpectedRelationHypothesis: null,
    });
  }

  const landmarks = faces[0];
  const landmarkCount = Array.isArray(landmarks)
    ? landmarks.length
    : 0;
  if (landmarkCount !== PROVIDER_LANDMARK_COUNT) {
    return Object.freeze({
      ...common,
      providerEligibility: Object.freeze({
        state: 'unavailable',
        faceCount,
        landmarkCount,
        exactlyOneFaceVerified: true,
      }),
      providerEyeCentroids: null,
      comparison: null,
      matchesExpectedRelationHypothesis: null,
    });
  }

  const providerLeft =
    centroidXY(landmarks, LEFT_EYE_VERTICES);
  const providerRight =
    centroidXY(landmarks, RIGHT_EYE_VERTICES);
  const comparison = classifyPairRelation(
    providerLeft,
    providerRight,
    groundTruth.anatomicalLeftEye,
    groundTruth.anatomicalRightEye,
  );

  return Object.freeze({
    ...common,
    providerEligibility: Object.freeze({
      state: 'exact_one_face_478_landmarks_observed',
      faceCount,
      landmarkCount,
      exactlyOneFaceVerified: true,
    }),
    providerEyeCentroids: Object.freeze({
      providerLeft,
      providerRight,
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning',
    }),
    comparison,
    matchesExpectedRelationHypothesis:
      comparison.relation
        === transformCase.expectedRelationHypothesis,
  });
}

function assertR0Baseline(caseResult) {
  const baseline = protocol.baselineControl;
  if (caseResult.id !== baseline.caseId) {
    throw new Error('U3_BASELINE_DRIFT: R0 case unavailable.');
  }
  if (
    caseResult.providerEligibility.state
      !== 'exact_one_face_478_landmarks_observed'
    || caseResult.providerEyeCentroids === null
    || caseResult.comparison === null
  ) {
    throw new Error(
      'U3_BASELINE_DRIFT: R0 provider eligibility changed.',
    );
  }

  const checks = [
    [
      caseResult.providerEyeCentroids.providerLeft.x,
      baseline.providerLeft.x,
      'providerLeft.x',
    ],
    [
      caseResult.providerEyeCentroids.providerLeft.y,
      baseline.providerLeft.y,
      'providerLeft.y',
    ],
    [
      caseResult.providerEyeCentroids.providerRight.x,
      baseline.providerRight.x,
      'providerRight.x',
    ],
    [
      caseResult.providerEyeCentroids.providerRight.y,
      baseline.providerRight.y,
      'providerRight.y',
    ],
    [
      caseResult.comparison.directCost,
      baseline.directCost,
      'directCost',
    ],
    [
      caseResult.comparison.swappedCost,
      baseline.swappedCost,
      'swappedCost',
    ],
    [
      caseResult.comparison.relation,
      baseline.relation,
      'relation',
    ],
  ];

  for (const [observed, expected, label] of checks) {
    if (!Object.is(observed, expected)) {
      throw new Error(
        'U3_BASELINE_DRIFT: '
          + label
          + ' expected='
          + expected
          + ' observed='
          + observed,
      );
    }
  }
}

function diagnosticSummary(cases) {
  const unavailableCaseIds = cases
    .filter(
      (item) =>
        item.providerEligibility.state
          !== 'exact_one_face_478_landmarks_observed',
    )
    .map((item) => item.id);
  const unresolvedCaseIds = cases
    .filter(
      (item) =>
        item.comparison?.relation === 'equal_or_unresolved',
    )
    .map((item) => item.id);
  const hypothesisMismatchCaseIds = cases
    .filter(
      (item) =>
        item.matchesExpectedRelationHypothesis === false,
    )
    .map((item) => item.id);

  let state =
    'transform_consistent_with_parity_conditioned_hypothesis';
  if (unavailableCaseIds.length > 0) {
    state = 'incomplete_provider_coverage';
  } else if (unresolvedCaseIds.length > 0) {
    state = 'equal_or_unresolved';
  } else if (hypothesisMismatchCaseIds.length > 0) {
    state = 'transform_inconsistent';
  }

  return Object.freeze({
    state,
    unavailableCaseIds: Object.freeze(unavailableCaseIds),
    unresolvedCaseIds: Object.freeze(unresolvedCaseIds),
    hypothesisMismatchCaseIds:
      Object.freeze(hypothesisMismatchCaseIds),
    scientificOutcomeMayFailHypothesisWithoutHarnessFailure: true,
  });
}

async function decodeCanonicalFixture() {
  const response = await globalThis.fetch(
    protocol.canonicalFixture.route,
    { cache: 'no-store' },
  );
  if (!response.ok) {
    throw new Error(
      'MakeHuman fixture HTTP ' + response.status,
    );
  }

  const bytes = await response.arrayBuffer();
  const observedSha256 = await sha256Hex(bytes);
  if (observedSha256 !== protocol.canonicalFixture.pngSha256) {
    throw new Error(
      'MakeHuman fixture SHA-256 mismatch: expected='
        + protocol.canonicalFixture.pngSha256
        + ' observed='
        + observedSha256,
    );
  }

  const bitmap = await globalThis.createImageBitmap(
    new globalThis.Blob([bytes], { type: 'image/png' }),
    {
      imageOrientation: 'none',
      premultiplyAlpha: 'none',
      colorSpaceConversion: 'none',
    },
  );
  if (
    bitmap.width !== protocol.canonicalFixture.width
    || bitmap.height !== protocol.canonicalFixture.height
  ) {
    bitmap.close();
    throw new Error(
      'MakeHuman fixture dimensions mismatch: expected='
        + protocol.canonicalFixture.width
        + 'x'
        + protocol.canonicalFixture.height
        + ' observed='
        + bitmap.width
        + 'x'
        + bitmap.height,
    );
  }

  const canvas = globalThis.document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d', {
    alpha: true,
    willReadFrequently: true,
  });
  if (context === null) {
    bitmap.close();
    throw new Error('FR104 U3 canonical 2D context unavailable.');
  }
  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0);
  const imageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  bitmap.close();

  return Object.freeze({
    pngSha256: observedSha256,
    width: canvas.width,
    height: canvas.height,
    rgba: imageData.data,
    rgbaSha256: await sha256Hex(imageData.data),
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;

  try {
    setStatus('U1.2 canonical raster decode 및 SHA 검증 중…');
    const canonical = await decodeCanonicalFixture();

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

    const canvas = globalThis.document.createElement('canvas');
    canvas.width = canonical.width;
    canvas.height = canonical.height;
    const context = canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: true,
    });
    if (context === null) {
      throw new Error('FR104 U3 transform 2D context unavailable.');
    }
    context.imageSmoothingEnabled = false;

    const cases = [];
    for (const transformCase of protocol.cases) {
      setStatus(
        'U3 ' + transformCase.id + ' pixel transform + inference 중…',
      );
      const rgba = transformRgba(
        canonical.rgba,
        canonical.width,
        canonical.height,
        transformCase,
      );
      const transformedRgbaSha256 = await sha256Hex(rgba);
      const imageData = context.createImageData(
        canonical.width,
        canonical.height,
      );
      imageData.data.set(rgba);
      context.putImageData(imageData, 0, 0);

      const groundTruth = transformedGroundTruth(transformCase);
      const result = summarizeProviderCase(
        landmarker.detect(canvas),
        transformCase,
        transformedRgbaSha256,
        groundTruth,
      );
      if (transformCase.id === 'R0') {
        assertR0Baseline(result);
      }
      cases.push(result);
    }

    const summary = diagnosticSummary(cases);
    const result = Object.freeze({
      schemaVersion:
        'fr104-makehuman-transform-diagnostic-result-v1',
      authorityState:
        'bounded_transform_scalar_evidence_candidate_no_anatomical_mapping',
      canonicalFixture: Object.freeze({
        pngSha256: canonical.pngSha256,
        canonicalRgbaSha256: canonical.rgbaSha256,
        width: canonical.width,
        height: canonical.height,
        repositoryPersistence: false,
      }),
      runtime: Object.freeze({
        packageName: protocol.runtime.packageName,
        packageVersion: protocol.runtime.packageVersion,
        wasmRoot: protocol.runtime.wasmRoot,
        modelAssetRef: protocol.runtime.modelAssetRef,
        runningMode: protocol.runtime.runningMode,
        numFaces: protocol.runtime.numFaces,
      }),
      transformContract: Object.freeze({
        order: protocol.transformOrder,
        interpolationApplied: false,
        resizeApplied: false,
        cropApplied: false,
        exifTransformApplied: false,
        cssTransformApplied: false,
        taskImageProcessingRotationDegrees: 0,
      }),
      baselineControl: Object.freeze({
        caseId: 'R0',
        exactU2ScalarReproduced: true,
      }),
      cases: Object.freeze(cases),
      diagnosticSummary: summary,
      privacy: protocol.privacy,
      execution: Object.freeze({
        allEightCasesExecuted: true,
        empiricalResultAdmitted: false,
      }),
      authority: Object.freeze({
        exactMakeHumanFixtureTransformDiagnosticsExecuted: false,
        parityConditionedAssignmentPatternObserved: false,
        providerLabelMappedToAnatomicalSide: false,
        globalProviderAnatomicalSemanticsEstablished: false,
        anatomicalReferenceAdmitted: false,
        anatomicalLateralityAuthorized: false,
        validatedExternalEarObservationAuthorized: false,
        traditionalBindingAuthorized: false,
        productionAuthorization: false,
      }),
    });

    elements.result.textContent =
      JSON.stringify(result, null, 2);
    setStatus(
      '완료 · ' + summary.state,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion:
        'fr104-makehuman-transform-diagnostic-error-v1',
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
    elements.run.disabled = false;
  }
}

elements.run.addEventListener('click', () => {
  void run();
});

const params =
  new globalThis.URLSearchParams(globalThis.location.search);
if (params.get('autorun') === '1') {
  void run();
}
