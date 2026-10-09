import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  classifyNeutralEarProviderLabelRelationFR104,
  inverseNeutralEarProviderRotationDegreesFR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104,
  rotateNeutralEarProviderPointFR104,
} from '/face/neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104;
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

function summarizeProviderResult(result) {
  const faces = Array.isArray(result?.faceLandmarks)
    ? result.faceLandmarks
    : [];
  const faceCount = faces.length;

  if (faceCount !== 1) {
    return Object.freeze({
      state: 'provider_cannot_detect_face',
      faceCount,
      landmarkCount: null,
      exactlyOneFaceVerified: false,
      providerEyeCentroids: null,
    });
  }

  const landmarks = faces[0];
  const landmarkCount = Array.isArray(landmarks)
    ? landmarks.length
    : 0;
  if (landmarkCount !== PROVIDER_LANDMARK_COUNT) {
    return Object.freeze({
      state: 'unavailable',
      faceCount,
      landmarkCount,
      exactlyOneFaceVerified: true,
      providerEyeCentroids: null,
    });
  }

  return Object.freeze({
    state: 'exact_one_face_478_landmarks_observed',
    faceCount,
    landmarkCount,
    exactlyOneFaceVerified: true,
    providerEyeCentroids: Object.freeze({
      providerLeft:
        centroidXY(landmarks, LEFT_EYE_VERTICES),
      providerRight:
        centroidXY(landmarks, RIGHT_EYE_VERTICES),
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning',
    }),
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
        'Unsupported FR104 U3.1 rotation: '
          + transform.clockwiseRotationDegrees,
      );
  }
}

function permuteRgba(source, width, height, transform) {
  if (width !== height) {
    throw new Error(
      'FR104 U3.1 requires square canonical raster.',
    );
  }
  if (source.length !== width * height * 4) {
    throw new Error(
      'FR104 U3.1 canonical RGBA length mismatch.',
    );
  }
  const target =
    new globalThis.Uint8ClampedArray(source.length);

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

function distance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function midpoint(left, right) {
  return Object.freeze({
    x: (left.x + right.x) / 2,
    y: (left.y + right.y) / 2,
  });
}

function interEyeDistance(left, right) {
  return distance(left, right);
}

function providerComparison(nativeProvider, transformCase) {
  const baseline = protocol.familyBaselines[transformCase.family];
  if (nativeProvider.providerEyeCentroids === null) {
    return null;
  }

  const inverseRotation =
    inverseNeutralEarProviderRotationDegreesFR104(
      transformCase.clockwiseRotationDegrees,
    );
  const mappedLeft =
    rotateNeutralEarProviderPointFR104(
      nativeProvider.providerEyeCentroids.providerLeft,
      inverseRotation,
    );
  const mappedRight =
    rotateNeutralEarProviderPointFR104(
      nativeProvider.providerEyeCentroids.providerRight,
      inverseRotation,
    );

  const sameLabelCost =
    distance(mappedLeft, baseline.providerLeft)
    + distance(mappedRight, baseline.providerRight);
  const crossLabelCost =
    distance(mappedLeft, baseline.providerRight)
    + distance(mappedRight, baseline.providerLeft);
  const mappedMidpoint = midpoint(mappedLeft, mappedRight);
  const baselineMidpoint = midpoint(
    baseline.providerLeft,
    baseline.providerRight,
  );

  return Object.freeze({
    inverseRotationDegrees: inverseRotation,
    inverseMappedProviderEyeCentroids: Object.freeze({
      providerLeft: mappedLeft,
      providerRight: mappedRight,
    }),
    sameLabelCost,
    crossLabelCost,
    relation:
      classifyNeutralEarProviderLabelRelationFR104(
        sameLabelCost,
        crossLabelCost,
      ),
    unorderedPairCost:
      Math.min(sameLabelCost, crossLabelCost),
    pairMidpointError:
      distance(mappedMidpoint, baselineMidpoint),
    interEyeDistanceAbsoluteDifference:
      Math.abs(
        interEyeDistance(mappedLeft, mappedRight)
        - interEyeDistance(
          baseline.providerLeft,
          baseline.providerRight,
        ),
      ),
    numericAcceptanceThresholdApplied: false,
  });
}

function exactProviderBaseline(
  providerResult,
  baseline,
  label,
) {
  if (
    providerResult.state
      !== 'exact_one_face_478_landmarks_observed'
    || providerResult.providerEyeCentroids === null
  ) {
    throw new Error(
      'U3_1_'
        + label
        + '_PROVIDER_BASELINE_DRIFT: provider unavailable.',
    );
  }

  const checks = [
    [
      providerResult.providerEyeCentroids.providerLeft.x,
      baseline.providerLeft.x,
      'providerLeft.x',
    ],
    [
      providerResult.providerEyeCentroids.providerLeft.y,
      baseline.providerLeft.y,
      'providerLeft.y',
    ],
    [
      providerResult.providerEyeCentroids.providerRight.x,
      baseline.providerRight.x,
      'providerRight.x',
    ],
    [
      providerResult.providerEyeCentroids.providerRight.y,
      baseline.providerRight.y,
      'providerRight.y',
    ],
  ];
  for (const [observed, expected, field] of checks) {
    if (!Object.is(observed, expected)) {
      throw new Error(
        'U3_1_'
          + label
          + '_PROVIDER_BASELINE_DRIFT: '
          + field
          + ' expected='
          + expected
          + ' observed='
          + observed,
      );
    }
  }
}

function drawRgba(context, rgba, width, height) {
  const imageData = context.createImageData(width, height);
  imageData.data.set(rgba);
  context.putImageData(imageData, 0, 0);
}

async function decodeCanonicalFixture() {
  const response = await globalThis.fetch(
    protocol.fixture.route,
    { cache: 'no-store' },
  );
  if (!response.ok) {
    throw new Error(
      'U3_1_CANONICAL_FIXTURE_DRIFT: HTTP '
        + response.status,
    );
  }

  const bytes = await response.arrayBuffer();
  const observedPngSha256 = await sha256Hex(bytes);
  if (observedPngSha256 !== protocol.fixture.pngSha256) {
    throw new Error(
      'U3_1_CANONICAL_FIXTURE_DRIFT: expected='
        + protocol.fixture.pngSha256
        + ' observed='
        + observedPngSha256,
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
    bitmap.width !== protocol.fixture.width
    || bitmap.height !== protocol.fixture.height
  ) {
    bitmap.close();
    throw new Error('U3_1_CANONICAL_FIXTURE_DRIFT: dimensions.');
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
    throw new Error('FR104 U3.1 decode context unavailable.');
  }
  context.imageSmoothingEnabled = false;
  context.drawImage(bitmap, 0, 0);
  const rgba = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  ).data;
  bitmap.close();

  const canonicalRgbaSha256 = await sha256Hex(rgba);
  if (
    canonicalRgbaSha256
      !== protocol.fixture.canonicalRgbaSha256
  ) {
    throw new Error(
      'U3_1_CANONICAL_FIXTURE_DRIFT: canonical RGBA SHA.',
    );
  }

  return Object.freeze({
    pngSha256: observedPngSha256,
    canonicalRgbaSha256,
    width: canvas.width,
    height: canvas.height,
    rgba,
  });
}

function summarizeScientificState(cases) {
  let crossLabelObserved = false;
  let availabilityRecovered = false;
  let unresolvedObserved = false;

  for (const item of cases) {
    if (
      item.inverseRotationComparison?.relation
        === 'provider_cross_label_closer'
    ) {
      crossLabelObserved = true;
    }
    if (
      item.native.providerEligibilityState
        !== 'exact_one_face_478_landmarks_observed'
      && item.rotationCanonicalizedControl
        .exactFamilyBaselineProviderScalarsRecovered === true
    ) {
      availabilityRecovered = true;
    }
    if (
      item.inverseRotationComparison?.relation
        === 'equal_or_unresolved'
    ) {
      unresolvedObserved = true;
    }
  }

  let state = 'no_rotation_dependence_observed';
  if (crossLabelObserved || availabilityRecovered) {
    state = 'exact_fixture_rotation_dependence_observed';
  } else if (unresolvedObserved) {
    state = 'unresolved';
  }

  return Object.freeze({
    state,
    providerRotationEquivarianceRefutedForExactFixture:
      state === 'exact_fixture_rotation_dependence_observed',
    crossLabelCaseIds: Object.freeze(
      cases
        .filter(
          (item) =>
            item.inverseRotationComparison?.relation
              === 'provider_cross_label_closer',
        )
        .map((item) => item.id),
    ),
    nativeUnavailableControlRecoveredCaseIds: Object.freeze(
      cases
        .filter(
          (item) =>
            item.native.providerEligibilityState
              !== 'exact_one_face_478_landmarks_observed'
            && item.rotationCanonicalizedControl
              .exactFamilyBaselineProviderScalarsRecovered === true,
        )
        .map((item) => item.id),
    ),
    anatomicalInterpretationUsed: false,
    detectorStageFailureClaimed: false,
    anatomicalMappingReviewOutcome: 'hold',
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;

  try {
    setStatus('canonical fixture 및 RGBA SHA 검증 중…');
    const canonical = await decodeCanonicalFixture();

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
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
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
      throw new Error(
        'FR104 U3.1 inference context unavailable.',
      );
    }
    context.imageSmoothingEnabled = false;

    const cases = [];

    for (const transformCase of protocol.cases) {
      setStatus(
        'U3.1 ' + transformCase.id + ' native/control 실행 중…',
      );

      const nativeRgba = permuteRgba(
        canonical.rgba,
        canonical.width,
        canonical.height,
        transformCase,
      );
      const nativeRgbaSha256 = await sha256Hex(nativeRgba);
      if (
        nativeRgbaSha256
          !== transformCase.predecessorNativeRgbaSha256
      ) {
        throw new Error(
          'U3_1_TRANSFORM_INVERSE_MISMATCH: '
            + transformCase.id
            + ' native SHA drift.',
        );
      }

      drawRgba(
        context,
        nativeRgba,
        canonical.width,
        canonical.height,
      );
      const nativeProvider =
        summarizeProviderResult(landmarker.detect(canvas));
      const inverseComparison =
        providerComparison(nativeProvider, transformCase);

      const inverseRotation =
        inverseNeutralEarProviderRotationDegreesFR104(
          transformCase.clockwiseRotationDegrees,
        );
      const controlRgba = permuteRgba(
        nativeRgba,
        canonical.width,
        canonical.height,
        {
          horizontalMirror: false,
          clockwiseRotationDegrees: inverseRotation,
        },
      );
      const controlRgbaSha256 =
        await sha256Hex(controlRgba);
      const baseline =
        protocol.familyBaselines[transformCase.family];

      if (controlRgbaSha256 !== baseline.rgbaSha256) {
        throw new Error(
          'U3_1_FAMILY_CONTROL_RGBA_MISMATCH: '
            + transformCase.id
            + ' expected='
            + baseline.rgbaSha256
            + ' observed='
            + controlRgbaSha256,
        );
      }

      drawRgba(
        context,
        controlRgba,
        canonical.width,
        canonical.height,
      );
      const controlProvider =
        summarizeProviderResult(landmarker.detect(canvas));
      exactProviderBaseline(
        controlProvider,
        baseline,
        transformCase.family === 'non_mirrored'
          ? 'R0'
          : 'M0',
      );

      cases.push(Object.freeze({
        id: transformCase.id,
        family: transformCase.family,
        clockwiseRotationDegrees:
          transformCase.clockwiseRotationDegrees,
        native: Object.freeze({
          rgbaSha256: nativeRgbaSha256,
          providerEligibilityState: nativeProvider.state,
          faceCount: nativeProvider.faceCount,
          landmarkCount: nativeProvider.landmarkCount,
          providerEyeCentroids:
            nativeProvider.providerEyeCentroids,
        }),
        inverseRotationComparison: inverseComparison,
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: inverseRotation,
          rgbaSha256: controlRgbaSha256,
          exactFamilyBaselineBytesRecovered: true,
          providerEligibilityState: controlProvider.state,
          providerEyeCentroids:
            controlProvider.providerEyeCentroids,
          exactFamilyBaselineProviderScalarsRecovered: true,
        }),
      }));
    }

    const summary = summarizeScientificState(cases);

    const result = Object.freeze({
      schemaVersion:
        'fr104-provider-rotation-dependence-result-v1',
      authorityState:
        'bounded_provider_rotation_dependence_candidate_no_anatomical_mapping',
      fixture: Object.freeze({
        pngSha256: canonical.pngSha256,
        canonicalRgbaSha256:
          canonical.canonicalRgbaSha256,
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
        providerSideRotationHintUsed: false,
      }),
      interpretationBoundary:
        protocol.interpretationBoundary,
      cases: Object.freeze(cases),
      summary,
      privacy: protocol.privacy,
      execution: Object.freeze({
        allEightNativeCasesExecuted: true,
        allEightRotationCanonicalizedControlsExecuted: true,
        empiricalResultAdmitted: false,
      }),
      authority: Object.freeze({
        providerRotationDependenceInvestigated: false,
        providerRotationEquivarianceRefutedForExactFixture: false,
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
    setStatus('완료 · ' + summary.state);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion:
        'fr104-provider-rotation-dependence-error-v1',
      authorityState: 'fail_closed',
      error: message,
      anatomicalGroundTruthUsed: false,
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
