import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  assessNeutralEarProspectiveComposedNormalizationFR104,
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104,
} from '/face/neutral-ear-prospective-composed-orientation-validation-fr104.js';
import {
  rotateNeutralEarProviderPointFR104,
} from '/face/neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

const protocol =
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104;
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
      'U3_3_PROVIDER_TOPOLOGY_UNAVAILABLE ' + symbol,
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
        'U3_3_INVALID_PROVIDER_POINT vertex=' + vertex,
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
      state: 'provider_cannot_detect_exactly_one_face',
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
      state: 'provider_landmark_count_mismatch',
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
      throw new Error('U3_3_UNREGISTERED_PHYSICAL_ROTATION');
  }
}

function transformRgba(source, width, height, transform) {
  if (source.length !== width * height * 4) {
    throw new Error('U3_3_CANONICAL_RGBA_SHAPE_DRIFT');
  }

  const quarterTurn =
    transform.physicalClockwiseRotationDegrees === 90
    || transform.physicalClockwiseRotationDegrees === 270;
  const outputWidth = quarterTurn ? height : width;
  const outputHeight = quarterTurn ? width : height;
  const output = new Uint8ClampedArray(
    outputWidth * outputHeight * 4,
  );

  for (let sourceY = 0; sourceY < height; sourceY += 1) {
    for (let sourceX = 0; sourceX < width; sourceX += 1) {
      const target = transformedCoordinate(
        sourceX,
        sourceY,
        width,
        height,
        transform,
      );
      const sourceOffset = (sourceY * width + sourceX) * 4;
      const targetOffset =
        (target.y * outputWidth + target.x) * 4;
      output[targetOffset] = source[sourceOffset];
      output[targetOffset + 1] = source[sourceOffset + 1];
      output[targetOffset + 2] = source[sourceOffset + 2];
      output[targetOffset + 3] = source[sourceOffset + 3];
    }
  }

  return Object.freeze({
    rgba: output,
    width: outputWidth,
    height: outputHeight,
  });
}

function drawRgba(canvas, transformed) {
  canvas.width = transformed.width;
  canvas.height = transformed.height;
  const context = canvas.getContext('2d', {
    alpha: true,
    willReadFrequently: true,
  });
  if (context === null) {
    throw new Error('U3_3_CANVAS_CONTEXT_UNAVAILABLE');
  }
  context.imageSmoothingEnabled = false;
  const imageData =
    context.createImageData(transformed.width, transformed.height);
  imageData.data.set(transformed.rgba);
  context.putImageData(imageData, 0, 0);
}

function providerDetect(landmarker, canvas, rotationDegrees) {
  return summarizeProviderResult(
    landmarker.detect(canvas, { rotationDegrees }),
  );
}

function distance(left, right) {
  return Math.hypot(
    left.x - right.x,
    left.y - right.y,
  );
}

function midpoint(left, right) {
  return Object.freeze({
    x: (left.x + right.x) / 2,
    y: (left.y + right.y) / 2,
  });
}

function rotateProviderPair(pair, clockwiseRotationDegrees) {
  if (pair === null) return null;
  return Object.freeze({
    providerLeft: rotateNeutralEarProviderPointFR104(
      pair.providerLeft,
      clockwiseRotationDegrees,
    ),
    providerRight: rotateNeutralEarProviderPointFR104(
      pair.providerRight,
      clockwiseRotationDegrees,
    ),
  });
}

function comparePair(pair, baseline) {
  if (pair === null || baseline === null) return null;

  const sameLabelCost =
    distance(pair.providerLeft, baseline.providerLeft)
    + distance(pair.providerRight, baseline.providerRight);
  const crossLabelCost =
    distance(pair.providerLeft, baseline.providerRight)
    + distance(pair.providerRight, baseline.providerLeft);
  const pairMidpointError =
    distance(
      midpoint(pair.providerLeft, pair.providerRight),
      midpoint(baseline.providerLeft, baseline.providerRight),
    );
  const interEyeDistanceAbsoluteDifference =
    Math.abs(
      distance(pair.providerLeft, pair.providerRight)
      - distance(baseline.providerLeft, baseline.providerRight),
    );

  let providerLabelRelation = 'equal_or_unresolved';
  if (sameLabelCost < crossLabelCost) {
    providerLabelRelation = 'provider_same_label_closer';
  } else if (crossLabelCost < sameLabelCost) {
    providerLabelRelation = 'provider_cross_label_closer';
  }

  return Object.freeze({
    sameLabelCost,
    crossLabelCost,
    unorderedPairCost:
      Math.min(sameLabelCost, crossLabelCost),
    pairMidpointError,
    interEyeDistanceAbsoluteDifference,
    providerLabelRelation,
    providerLabelRelationUsedForDecision: false,
  });
}

async function decodeCanonicalFixture() {
  const response = await globalThis.fetch(
    protocol.fixture.assetUrl,
    { cache: 'no-store' },
  );
  if (!response.ok) {
    throw new Error(
      'U3_3_FIXTURE_FETCH_FAILED HTTP ' + response.status,
    );
  }

  const bytes = await response.arrayBuffer();
  const observedSha256 = await sha256Hex(bytes);
  if (observedSha256 !== protocol.fixture.sha256) {
    throw new Error(
      'U3_3_FIXTURE_DIGEST_DRIFT expected='
        + protocol.fixture.sha256
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
    bitmap.width !== protocol.fixture.expectedWidth
    || bitmap.height !== protocol.fixture.expectedHeight
  ) {
    const observed =
      String(bitmap.width) + 'x' + String(bitmap.height);
    bitmap.close();
    throw new Error(
      'U3_3_FIXTURE_DIMENSION_DRIFT observed=' + observed,
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
    throw new Error('U3_3_CANONICAL_DECODE_CONTEXT_UNAVAILABLE');
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

  return Object.freeze({
    observedSha256,
    width: canvas.width,
    height: canvas.height,
    rgba,
  });
}

function caseById(cases, id) {
  const item = cases.find(
    (candidate) =>
      candidate.id === id
      || candidate.item?.id === id,
  );
  if (item === undefined) {
    throw new Error('U3_3_CASE_MISSING ' + id);
  }
  return item;
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;

  try {
    setStatus('고정 fixture digest·dimensions 검증 중…');
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

    const canvas =
      globalThis.document.createElement('canvas');
    const working = [];

    setStatus('사전등록된 8-case matrix 실행 중…');
    for (const item of protocol.cases) {
      const transformed = transformRgba(
        canonical.rgba,
        canonical.width,
        canonical.height,
        item,
      );
      const transformedRgbaSha256 =
        await sha256Hex(transformed.rgba);
      drawRgba(canvas, transformed);
      const provider = providerDetect(
        landmarker,
        canvas,
        item.compensationDegrees,
      );
      working.push(Object.freeze({
        item,
        transformedRgbaSha256,
        provider,
      }));
    }

    const r0 = caseById(working, 'R0');
    const m0 = caseById(working, 'M0');
    const nonMirroredBaseline =
      r0.provider.providerEyeCentroids;
    const mirroredBaseline =
      m0.provider.providerEyeCentroids;

    const cases = working.map(({ item, transformedRgbaSha256, provider }) => {
      const rawPair = provider.providerEyeCentroids;
      const identityPair = rotateProviderPair(rawPair, 0);
      const composedPair = rotateProviderPair(
        rawPair,
        item.compensationDegrees,
      );
      const oppositePair = rotateProviderPair(
        rawPair,
        item.physicalClockwiseRotationDegrees,
      );
      const baseline = item.family === 'non_mirrored'
        ? nonMirroredBaseline
        : mirroredBaseline;

      return Object.freeze({
        id:item.id,
        family:item.family,
        horizontalMirror:item.horizontalMirror,
        physicalClockwiseRotationDegrees:
          item.physicalClockwiseRotationDegrees,
        compensationDegrees:item.compensationDegrees,
        transformedRgbaSha256,
        provider: Object.freeze({
          eligibilityState:provider.state,
          faceCount:provider.faceCount,
          landmarkCount:provider.landmarkCount,
          providerEyeCentroids:rawPair,
        }),
        comparisons: Object.freeze({
          identity:comparePair(identityPair, baseline),
          composed:comparePair(composedPair, baseline),
          opposite:comparePair(oppositePair, baseline),
        }),
      });
    });

    const rotatedCases = cases
      .filter((item) => item.id !== 'R0' && item.id !== 'M0')
      .map((item) => {
        const available =
          item.comparisons.identity !== null
          && item.comparisons.composed !== null
          && item.comparisons.opposite !== null;
        return Object.freeze({
          id:item.id,
          available,
          composedUnorderedPairCost:
            item.comparisons.composed?.unorderedPairCost ?? null,
          identityUnorderedPairCost:
            item.comparisons.identity?.unorderedPairCost ?? null,
          oppositeUnorderedPairCost:
            item.comparisons.opposite?.unorderedPairCost ?? null,
        });
      });

    const assessment =
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:
          nonMirroredBaseline !== null,
        mirroredBaselineAvailable:
          mirroredBaseline !== null,
        rotatedCases,
      });

    const r0Result = caseById(cases, 'R0');
    const m0Result = caseById(cases, 'M0');
    const result = Object.freeze({
      schemaVersion:
        'fr104-prospective-composed-orientation-normalization-result-v1',
      authorityState:
        'prospective_candidate_result_not_admitted',
      studyKind:protocol.studyKind,
      predecessor:Object.freeze({
        derivedResultSha256:
          protocol.predecessor.derivedResultSha256,
        selectedHypothesis:
          protocol.predecessor.selectedHypothesis,
      }),
      fixture:Object.freeze({
        fixtureRef:protocol.fixture.fixtureRef,
        sourceRepository:protocol.fixture.sourceRepository,
        sourceCommit:protocol.fixture.sourceCommit,
        expectedSha256:protocol.fixture.sha256,
        observedSha256:canonical.observedSha256,
        digestVerified:
          canonical.observedSha256 === protocol.fixture.sha256,
        width:canonical.width,
        height:canonical.height,
        sourceImagePersisted:false,
        transformedRasterPersisted:false,
      }),
      runtime:Object.freeze({
        packageName:protocol.runtime.packageName,
        packageVersion:protocol.runtime.packageVersion,
        runningMode:protocol.runtime.runningMode,
        numFaces:protocol.runtime.numFaces,
        imageProcessingOptionsRotationDegreesUsed:true,
      }),
      frozenComposedRule:protocol.frozenComposedRule,
      zeroDegreeControls:Object.freeze({
        R0:Object.freeze({
          available:
            r0Result.comparisons.composed !== null,
          composedUnorderedPairCost:
            r0Result.comparisons.composed?.unorderedPairCost ?? null,
        }),
        M0:Object.freeze({
          available:
            m0Result.comparisons.composed !== null,
          composedUnorderedPairCost:
            m0Result.comparisons.composed?.unorderedPairCost ?? null,
        }),
      }),
      cases:Object.freeze(cases),
      assessment,
      interpretationBoundary:Object.freeze({
        providerLabelsUsedForDecision:false,
        anatomicalGroundTruthUsed:false,
        anatomicalSideSemanticsUsed:false,
        priorMirrorResultUsedToRetuneRule:false,
        hypothesisFailureIsHarnessFailure:false,
      }),
      privacy:protocol.privacy,
      execution:Object.freeze({
        allEightCasesAttempted:true,
        empiricalResultAdmitted:false,
        resultDigestPinned:false,
        ruleRetunedAfterObservation:false,
      }),
      authority:Object.freeze({
        prospectiveComposedNormalizationValidated:false,
        providerCompensatedOutputFrameProspectivelyValidated:false,
        providerLabelMappedToAnatomicalSide:false,
        globalProviderAnatomicalSemanticsEstablished:false,
        anatomicalReferenceAdmitted:false,
        anatomicalLateralityAuthorized:false,
        validatedExternalEarObservationAuthorized:false,
        traditionalBindingAuthorized:false,
        productionAuthorization:false,
      }),
    });

    elements.result.textContent =
      JSON.stringify(result, null, 2);
    setStatus('완료 · ' + assessment.state);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    elements.result.textContent = JSON.stringify({
      schemaVersion:
        'fr104-prospective-composed-orientation-normalization-error-v1',
      authorityState:'fail_closed',
      error:message,
      userImageConsumed:false,
      cameraAccessed:false,
      rawProviderLandmarksPersisted:false,
      anatomicalLateralityAuthorized:false,
      productionAuthorization:false,
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
