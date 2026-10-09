import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104,
} from '/face/neutral-ear-makehuman-provider-rotation-empirical-evidence-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104,
} from '/face/neutral-ear-makehuman-provider-rotation-compensation-fr104.js';

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104;
const predecessor =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104;
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
      'FR24 eye topology witness unavailable: ' + symbol,
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
        'U3_2_INVALID_PROVIDER_POINT at vertex ' + vertex,
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
      providerEyeCentroids: null,
    });
  }

  return Object.freeze({
    state: 'exact_one_face_478_landmarks_observed',
    faceCount,
    landmarkCount,
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

  switch (transform.physicalClockwiseRotationDegrees) {
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
        'U3_2_NATIVE_RGBA_DRIFT unsupported physical rotation.',
      );
  }
}

function transformRgba(source, width, height, transform) {
  if (width !== height || source.length !== width * height * 4) {
    throw new Error('U3_2_NATIVE_RGBA_DRIFT source shape.');
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

function drawRgba(context, rgba, width, height) {
  const imageData = context.createImageData(width, height);
  imageData.data.set(rgba);
  context.putImageData(imageData, 0, 0);
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

function exactProviderPair(actual, expected) {
  if (actual === null || expected === null) {
    return actual === expected;
  }
  return (
    Object.is(
      actual.providerLeft.x,
      expected.providerLeft.x,
    )
    && Object.is(
      actual.providerLeft.y,
      expected.providerLeft.y,
    )
    && Object.is(
      actual.providerRight.x,
      expected.providerRight.x,
    )
    && Object.is(
      actual.providerRight.y,
      expected.providerRight.y,
    )
  );
}

function compareToBaseline(provider, baseline) {
  if (provider === null) return null;

  const sameLabelCost =
    distance(provider.providerLeft, baseline.providerLeft)
    + distance(
      provider.providerRight,
      baseline.providerRight,
    );
  const crossLabelCost =
    distance(provider.providerLeft, baseline.providerRight)
    + distance(
      provider.providerRight,
      baseline.providerLeft,
    );
  const providerMidpoint = midpoint(
    provider.providerLeft,
    provider.providerRight,
  );
  const baselineMidpoint = midpoint(
    baseline.providerLeft,
    baseline.providerRight,
  );
  const relation =
    sameLabelCost < crossLabelCost
      ? 'provider_same_label_closer'
      : crossLabelCost < sameLabelCost
        ? 'provider_cross_label_closer'
        : 'equal_or_unresolved';

  return Object.freeze({
    sameLabelCost,
    crossLabelCost,
    relation,
    unorderedPairCost:
      Math.min(sameLabelCost, crossLabelCost),
    pairMidpointError:
      distance(providerMidpoint, baselineMidpoint),
    interEyeDistanceAbsoluteDifference:
      Math.abs(
        distance(
          provider.providerLeft,
          provider.providerRight,
        )
        - distance(
          baseline.providerLeft,
          baseline.providerRight,
        ),
      ),
    numericAcceptanceThresholdApplied: false,
    exactBaselineProviderScalarsRecovered:
      exactProviderPair(provider, baseline),
  });
}

function requirePredecessorCase(id) {
  const item = predecessor.cases.find(
    (candidate) => candidate.id === id,
  );
  if (item === undefined) {
    throw new Error(
      'U3_2_NATIVE_RGBA_DRIFT predecessor missing ' + id,
    );
  }
  return item;
}

function assertNativeReplay(actual, expected, id) {
  if (
    actual.state !== expected.native.providerEligibilityState
    || actual.faceCount !== expected.native.faceCount
    || actual.landmarkCount !== expected.native.landmarkCount
    || !exactProviderPair(
      actual.providerEyeCentroids,
      expected.native.providerEyeCentroids,
    )
  ) {
    throw new Error(
      'U3_2_PROVIDER_OUTPUT_SHAPE_DRIFT native ' + id,
    );
  }
}

function providerDetect(landmarker, canvas, rotationDegrees) {
  if (rotationDegrees === undefined) {
    return summarizeProviderResult(
      landmarker.detect(canvas),
    );
  }
  return summarizeProviderResult(
    landmarker.detect(canvas, { rotationDegrees }),
  );
}

function assertProviderExact(
  left,
  right,
  errorCode,
) {
  if (
    left.state !== right.state
    || left.faceCount !== right.faceCount
    || left.landmarkCount !== right.landmarkCount
    || !exactProviderPair(
      left.providerEyeCentroids,
      right.providerEyeCentroids,
    )
  ) {
    throw new Error(errorCode);
  }
}

function classifyOverall(cases) {
  const compensatedAvailable = cases.filter(
    (item) =>
      item.compensated.providerEligibilityState
        === 'exact_one_face_478_landmarks_observed',
  );
  const allAvailable = compensatedAvailable.length === cases.length;
  const allSame = allAvailable && compensatedAvailable.every(
    (item) =>
      item.compensated.comparison?.relation
        === 'provider_same_label_closer',
  );
  const unavailableRecovered = cases.filter(
    (item) =>
      item.effect.availabilityRecovered === true,
  );
  const r180 = cases.find((item) => item.id === 'R180');
  const r180Resolved =
    r180?.effect.crossLabelResolved === true;
  const anyUnresolved = compensatedAvailable.some(
    (item) =>
      item.compensated.comparison?.relation
        === 'equal_or_unresolved',
  );
  const anyUsefulRecovery =
    unavailableRecovered.length > 0 || r180Resolved;

  let state =
    'provider_rotation_compensation_ineffective';
  if (allSame && r180Resolved) {
    state =
      'provider_rotation_compensation_effective_on_exact_fixture';
  } else if (anyUnresolved) {
    state =
      'provider_rotation_compensation_unresolved';
  } else if (anyUsefulRecovery) {
    state =
      'provider_rotation_compensation_partially_effective';
  }

  return Object.freeze({
    state,
    compensatedAvailableCaseIds: Object.freeze(
      compensatedAvailable.map((item) => item.id),
    ),
    availabilityRecoveredCaseIds: Object.freeze(
      unavailableRecovered.map((item) => item.id),
    ),
    sameLabelCompensatedCaseIds: Object.freeze(
      compensatedAvailable
        .filter(
          (item) =>
            item.compensated.comparison?.relation
              === 'provider_same_label_closer',
        )
        .map((item) => item.id),
    ),
    crossLabelCompensatedCaseIds: Object.freeze(
      compensatedAvailable
        .filter(
          (item) =>
            item.compensated.comparison?.relation
              === 'provider_cross_label_closer',
        )
        .map((item) => item.id),
    ),
    unresolvedCompensatedCaseIds: Object.freeze(
      compensatedAvailable
        .filter(
          (item) =>
            item.compensated.comparison?.relation
              === 'equal_or_unresolved',
        )
        .map((item) => item.id),
    ),
    r180CrossLabelResolved: r180Resolved,
    anatomicalInterpretationUsed: false,
    detectorStageFailureClaimed: false,
    anatomicalMappingReviewOutcome: 'hold',
  });
}

async function decodeCanonicalFixture() {
  const response = await globalThis.fetch(
    protocol.fixture.route,
    { cache: 'no-store' },
  );
  if (!response.ok) {
    throw new Error(
      'U3_2_NATIVE_RGBA_DRIFT fixture HTTP '
        + response.status,
    );
  }
  const bytes = await response.arrayBuffer();
  const pngSha256 = await sha256Hex(bytes);
  if (pngSha256 !== protocol.fixture.pngSha256) {
    throw new Error('U3_2_NATIVE_RGBA_DRIFT PNG SHA.');
  }

  const bitmap = await globalThis.createImageBitmap(
    new globalThis.Blob([bytes], { type: 'image/png' }),
    {
      imageOrientation: 'none',
      premultiplyAlpha: 'none',
      colorSpaceConversion: 'none',
    },
  );
  const canvas = globalThis.document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d', {
    alpha: true,
    willReadFrequently: true,
  });
  if (context === null) {
    bitmap.close();
    throw new Error('U3_2_NATIVE_RGBA_DRIFT decode context.');
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

  const rgbaSha256 = await sha256Hex(rgba);
  if (
    rgbaSha256 !== protocol.fixture.canonicalRgbaSha256
  ) {
    throw new Error(
      'U3_2_NATIVE_RGBA_DRIFT canonical RGBA SHA.',
    );
  }

  return Object.freeze({
    pngSha256,
    canonicalRgbaSha256: rgbaSha256,
    width: canvas.width,
    height: canvas.height,
    rgba,
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;

  try {
    setStatus('fixture 및 exact U3.1 native bytes 검증 중…');
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
      throw new Error('U3_2_PROVIDER_OUTPUT_SHAPE_DRIFT context.');
    }
    context.imageSmoothingEnabled = false;

    const nativeBuffers = new Map();
    const nativeResults = new Map();

    for (const item of protocol.cases) {
      const rgba = transformRgba(
        canonical.rgba,
        canonical.width,
        canonical.height,
        item,
      );
      const observedSha = await sha256Hex(rgba);
      if (observedSha !== item.nativeRgbaSha256) {
        throw new Error(
          'U3_2_NATIVE_RGBA_DRIFT '
            + item.id
            + ' expected='
            + item.nativeRgbaSha256
            + ' observed='
            + observedSha,
        );
      }
      drawRgba(
        context,
        rgba,
        canonical.width,
        canonical.height,
      );
      const native = providerDetect(
        landmarker,
        canvas,
        undefined,
      );
      assertNativeReplay(
        native,
        requirePredecessorCase(item.id),
        item.id,
      );
      nativeBuffers.set(item.id, rgba);
      nativeResults.set(item.id, native);
    }

    setStatus('U3.2A runtime probes 실행 중…');

    const zeroDegreeControls = {};
    for (const id of protocol.sideControls.zeroDegreesVsUndefined) {
      const rgba = nativeBuffers.get(id);
      if (rgba === undefined) {
        throw new Error(
          'U3_2_ZERO_ROTATION_SEMANTICS_DRIFT missing ' + id,
        );
      }
      drawRgba(
        context,
        rgba,
        canonical.width,
        canonical.height,
      );
      const undefinedResult = nativeResults.get(id);
      const zeroResult = providerDetect(
        landmarker,
        canvas,
        0,
      );
      assertProviderExact(
        undefinedResult,
        zeroResult,
        'U3_2_ZERO_ROTATION_SEMANTICS_DRIFT ' + id,
      );
      zeroDegreeControls[id] = Object.freeze({
        exactProviderResultEqual: true,
        result: zeroResult,
      });
    }

    const signedCaseId =
      protocol.sideControls.signedEquivalent.caseId;
    const signedRgba = nativeBuffers.get(signedCaseId);
    if (signedRgba === undefined) {
      throw new Error(
        'U3_2_SIGNED_ROTATION_EQUIVALENCE_DRIFT missing case.',
      );
    }
    drawRgba(
      context,
      signedRgba,
      canonical.width,
      canonical.height,
    );
    const signedPositive = providerDetect(
      landmarker,
      canvas,
      protocol.sideControls.signedEquivalent.positiveDegrees,
    );
    let signedNegative = null;
    let signedNegativeThrows = false;
    try {
      signedNegative = providerDetect(
        landmarker,
        canvas,
        protocol.sideControls.signedEquivalent.signedDegrees,
      );
    } catch {
      signedNegativeThrows = true;
    }
    const signedExactProviderResultEqual =
      !signedNegativeThrows
      && signedNegative !== null
      && signedPositive.state === signedNegative.state
      && signedPositive.faceCount === signedNegative.faceCount
      && signedPositive.landmarkCount === signedNegative.landmarkCount
      && exactProviderPair(
        signedPositive.providerEyeCentroids,
        signedNegative.providerEyeCentroids,
      );

    const invalidRgba = nativeBuffers.get(
      protocol.sideControls.invalidRotation.caseId,
    );
    if (invalidRgba === undefined) {
      throw new Error('U3_2_INVALID_ROTATION_ACCEPTED missing case.');
    }
    drawRgba(
      context,
      invalidRgba,
      canonical.width,
      canonical.height,
    );
    let invalidRotationThrows = false;
    let invalidRotationResultProduced = false;
    try {
      landmarker.detect(canvas, {
        rotationDegrees:
          protocol.sideControls.invalidRotation.degrees,
      });
      invalidRotationResultProduced = true;
    } catch {
      invalidRotationThrows = true;
    }
    if (
      !invalidRotationThrows
      || invalidRotationResultProduced
    ) {
      throw new Error('U3_2_INVALID_ROTATION_ACCEPTED');
    }

    const oppositeRgba = nativeBuffers.get(
      protocol.sideControls.oppositeDirection.caseId,
    );
    if (oppositeRgba === undefined) {
      throw new Error(
        'U3_2_ROTATION_DIRECTION_CONTRACT_UNRESOLVED missing case.',
      );
    }
    drawRgba(
      context,
      oppositeRgba,
      canonical.width,
      canonical.height,
    );
    const correctDirectionResult = providerDetect(
      landmarker,
      canvas,
      protocol.sideControls.oppositeDirection.correctDegrees,
    );
    const oppositeDirectionResult = providerDetect(
      landmarker,
      canvas,
      protocol.sideControls.oppositeDirection.oppositeDegrees,
    );

    setStatus('U3.2B 8-case provider compensation 실행 중…');
    const cases = [];

    for (const item of protocol.cases) {
      const rgba = nativeBuffers.get(item.id);
      const native = nativeResults.get(item.id);
      if (rgba === undefined || native === undefined) {
        throw new Error(
          'U3_2_NATIVE_RGBA_DRIFT missing case ' + item.id,
        );
      }

      drawRgba(
        context,
        rgba,
        canonical.width,
        canonical.height,
      );
      const compensated = providerDetect(
        landmarker,
        canvas,
        item.compensationDegrees,
      );

      const baseline =
        protocol.familyBaselines[item.family];
      const comparison = compareToBaseline(
        compensated.providerEyeCentroids,
        baseline,
      );
      const predecessorCase =
        requirePredecessorCase(item.id);
      const predecessorCross =
        predecessorCase.inverseRotationComparison?.relation
          === 'provider_cross_label_closer';
      const availabilityRecovered =
        predecessorCase.native.providerEligibilityState
          !== 'exact_one_face_478_landmarks_observed'
        && compensated.state
          === 'exact_one_face_478_landmarks_observed';
      const crossLabelResolved =
        predecessorCross
          ? comparison?.relation
              === 'provider_same_label_closer'
          : null;

      cases.push(Object.freeze({
        id: item.id,
        family: item.family,
        physicalClockwiseRotationDegrees:
          item.physicalClockwiseRotationDegrees,
        compensationDegrees: item.compensationDegrees,
        nativeRgbaSha256: item.nativeRgbaSha256,
        native: Object.freeze({
          providerEligibilityState: native.state,
          faceCount: native.faceCount,
          landmarkCount: native.landmarkCount,
          providerEyeCentroids:
            native.providerEyeCentroids,
        }),
        compensated: Object.freeze({
          providerEligibilityState: compensated.state,
          faceCount: compensated.faceCount,
          landmarkCount: compensated.landmarkCount,
          providerEyeCentroids:
            compensated.providerEyeCentroids,
          comparison,
        }),
        effect: Object.freeze({
          availabilityRecovered,
          crossLabelResolved,
          baselineExactScalarRecovered:
            comparison?.exactBaselineProviderScalarsRecovered
              ?? false,
        }),
      }));
    }

    const summary = classifyOverall(cases);
    const result = Object.freeze({
      schemaVersion:
        'fr104-provider-rotation-compensation-result-v1',
      authorityState:
        'bounded_provider_rotation_compensation_candidate_no_anatomical_mapping',
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
        imageProcessingOptionsRotationDegreesUsed: true,
      }),
      apiBehavioralProbes: Object.freeze({
        zeroDegreesVsUndefined: Object.freeze({
          R0: zeroDegreeControls.R0,
          M0: zeroDegreeControls.M0,
        }),
        signedEquivalent: Object.freeze({
          caseId: signedCaseId,
          positiveDegrees:
            protocol.sideControls.signedEquivalent.positiveDegrees,
          signedDegrees:
            protocol.sideControls.signedEquivalent.signedDegrees,
          signedDegreesThrows: signedNegativeThrows,
          exactProviderResultEqual:
            signedExactProviderResultEqual,
          positiveResult: signedPositive,
          signedResult: signedNegative,
          canonicalRepresentation:
            'positive_0_90_180_270_only',
        }),
        invalidRotation: Object.freeze({
          degrees:
            protocol.sideControls.invalidRotation.degrees,
          throws: invalidRotationThrows,
          resultProduced: invalidRotationResultProduced,
        }),
        oppositeDirection: Object.freeze({
          caseId:
            protocol.sideControls.oppositeDirection.caseId,
          correctDegrees:
            protocol.sideControls.oppositeDirection.correctDegrees,
          oppositeDegrees:
            protocol.sideControls.oppositeDirection.oppositeDegrees,
          correctResult: correctDirectionResult,
          oppositeResult: oppositeDirectionResult,
        }),
      }),
      cases: Object.freeze(cases),
      summary,
      interpretationBoundary:
        protocol.interpretationBoundary,
      privacy: protocol.privacy,
      execution: Object.freeze({
        exactInstalledArtifactAuditRequiredByCi: true,
        allEightNativeControlsReplayed: true,
        allEightCompensatedCasesExecuted: true,
        empiricalResultAdmitted: false,
      }),
      authority: Object.freeze({
        providerRotationCompensationSemanticsAudited: false,
        providerRotationCompensationEffectiveForExactFixture: false,
        canonicalProviderOrientationNormalizationAvailable: false,
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
        'fr104-provider-rotation-compensation-error-v1',
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
