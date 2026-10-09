import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import {
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '/face/face-eye-pair-research-bridge-fr24.js';
import {
  assessNeutralEarProspectiveIndependentGeometryFR104,
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104,
} from '/face/neutral-ear-prospective-independent-geometry-validation-fr104.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104,
} from '/face/neutral-ear-prospective-independent-geometry-fixture-evidence-fr104.js';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from '/face/neutral-ear-mirror-independent-fixture-protocol-fr104.js';
import {
  rotateNeutralEarProviderPointFR104,
} from '/face/neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

const protocol =
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104;
const fixtureEvidence =
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104;
const runtime =
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104.runtime;
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
      'U4B_C_PROVIDER_TOPOLOGY_UNAVAILABLE ' + symbol,
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
        'U4B_C_INVALID_PROVIDER_POINT vertex=' + vertex,
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
      state:'provider_cannot_detect_exactly_one_face',
      faceCount,
      landmarkCount:null,
      providerEyeCentroids:null,
    });
  }

  const landmarks = faces[0];
  const landmarkCount = Array.isArray(landmarks)
    ? landmarks.length
    : 0;
  if (landmarkCount !== PROVIDER_LANDMARK_COUNT) {
    return Object.freeze({
      state:'provider_landmark_count_mismatch',
      faceCount,
      landmarkCount,
      providerEyeCentroids:null,
    });
  }

  return Object.freeze({
    state:'exact_one_face_478_landmarks_observed',
    faceCount,
    landmarkCount,
    providerEyeCentroids:Object.freeze({
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
      return Object.freeze({x,y});
    case 90:
      return Object.freeze({
        x:height - 1 - y,
        y:x,
      });
    case 180:
      return Object.freeze({
        x:width - 1 - x,
        y:height - 1 - y,
      });
    case 270:
      return Object.freeze({
        x:y,
        y:width - 1 - x,
      });
    default:
      throw new Error('U4B_C_UNREGISTERED_PHYSICAL_ROTATION');
  }
}

function transformRgba(source, width, height, transform) {
  if (source.length !== width * height * 4) {
    throw new Error('U4B_C_FIXTURE_RGBA_SHAPE_DRIFT');
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
    rgba:output,
    width:outputWidth,
    height:outputHeight,
  });
}

function drawRgba(canvas, transformed) {
  canvas.width = transformed.width;
  canvas.height = transformed.height;
  const context = canvas.getContext('2d', {
    alpha:true,
    willReadFrequently:true,
  });
  if (context === null) {
    throw new Error('U4B_C_CANVAS_CONTEXT_UNAVAILABLE');
  }
  context.imageSmoothingEnabled = false;
  const imageData =
    context.createImageData(transformed.width, transformed.height);
  imageData.data.set(transformed.rgba);
  context.putImageData(imageData, 0, 0);
}

function providerDetect(landmarker, canvas, rotationDegrees) {
  return summarizeProviderResult(
    landmarker.detect(canvas, {rotationDegrees}),
  );
}

function rotateProviderPair(pair, clockwiseRotationDegrees) {
  if (pair === null) return null;
  return Object.freeze({
    providerLeft:rotateNeutralEarProviderPointFR104(
      pair.providerLeft,
      clockwiseRotationDegrees,
    ),
    providerRight:rotateNeutralEarProviderPointFR104(
      pair.providerRight,
      clockwiseRotationDegrees,
    ),
  });
}

function distance(left, right) {
  return Math.hypot(
    left.x - right.x,
    left.y - right.y,
  );
}

function familyCanonicalAnatomicalGroundTruth(horizontalMirror) {
  const left =
    fixtureEvidence.anatomicalGroundTruth
      .anatomicalLeftEye.normalizedImageCoordinate;
  const right =
    fixtureEvidence.anatomicalGroundTruth
      .anatomicalRightEye.normalizedImageCoordinate;

  if (!horizontalMirror) {
    return Object.freeze({
      anatomicalLeft:Object.freeze({x:left.x,y:left.y}),
      anatomicalRight:Object.freeze({x:right.x,y:right.y}),
    });
  }

  return Object.freeze({
    anatomicalLeft:Object.freeze({
      x:1 - left.x,
      y:left.y,
    }),
    anatomicalRight:Object.freeze({
      x:1 - right.x,
      y:right.y,
    }),
  });
}

function mappingComparison(providerPair, anatomical) {
  if (providerPair === null) {
    return Object.freeze({
      directCost:null,
      swappedCost:null,
      relation:'unavailable',
    });
  }

  const directCost =
    distance(
      providerPair.providerLeft,
      anatomical.anatomicalLeft,
    )
    + distance(
      providerPair.providerRight,
      anatomical.anatomicalRight,
    );
  const swappedCost =
    distance(
      providerPair.providerLeft,
      anatomical.anatomicalRight,
    )
    + distance(
      providerPair.providerRight,
      anatomical.anatomicalLeft,
    );

  const relation =
    directCost < swappedCost
      ? 'direct_assignment_closer'
      : swappedCost < directCost
        ? 'swapped_assignment_closer'
        : 'equal_or_unresolved';

  return Object.freeze({
    directCost,
    swappedCost,
    relation,
  });
}

async function decodePinnedFixture() {
  const response = await globalThis.fetch(
    '/fixture.png',
    {cache:'no-store'},
  );
  if (!response.ok) {
    throw new Error(
      'U4B_C_FIXTURE_FETCH_FAILED HTTP ' + response.status,
    );
  }

  const bytes = await response.arrayBuffer();
  const observedSha256 = await sha256Hex(bytes);
  if (
    observedSha256
    !== fixtureEvidence.renderedFixture.pngSha256
  ) {
    throw new Error(
      'U4B_C_FIXTURE_DIGEST_DRIFT expected='
        + fixtureEvidence.renderedFixture.pngSha256
        + ' observed='
        + observedSha256,
    );
  }

  const bitmap = await globalThis.createImageBitmap(
    new globalThis.Blob([bytes], {type:'image/png'}),
    {
      imageOrientation:'none',
      premultiplyAlpha:'none',
      colorSpaceConversion:'none',
    },
  );

  if (
    bitmap.width !== fixtureEvidence.renderedFixture.width
    || bitmap.height !== fixtureEvidence.renderedFixture.height
  ) {
    const observed =
      String(bitmap.width) + 'x' + String(bitmap.height);
    bitmap.close();
    throw new Error(
      'U4B_C_FIXTURE_DIMENSION_DRIFT observed=' + observed,
    );
  }

  const canvas = globalThis.document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d', {
    alpha:true,
    willReadFrequently:true,
  });
  if (context === null) {
    bitmap.close();
    throw new Error('U4B_C_FIXTURE_DECODE_CONTEXT_UNAVAILABLE');
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
    width:canvas.width,
    height:canvas.height,
    rgba,
  });
}

async function run() {
  elements.run.disabled = true;
  elements.result.textContent = '{}';
  let landmarker = null;

  try {
    setStatus('pin된 U4B fixture 검증 중…');
    const canonical = await decodePinnedFixture();

    const fileset = await FilesetResolver.forVisionTasks(
      runtime.wasmRoot,
    );
    landmarker = await FaceLandmarker.createFromOptions(
      fileset,
      {
        baseOptions:{
          modelAssetPath:runtime.modelAssetRef,
        },
        runningMode:protocol.providerRuntime.runningMode,
        numFaces:protocol.providerRuntime.numFaces,
        outputFaceBlendshapes:false,
        outputFacialTransformationMatrixes:false,
      },
    );

    const canvas =
      globalThis.document.createElement('canvas');
    const cases = [];

    setStatus('사전등록된 U4B 8-case matrix 최초 실행 중…');
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
      const canonicalProvider = rotateProviderPair(
        provider.providerEyeCentroids,
        item.compensationDegrees,
      );
      const anatomical =
        familyCanonicalAnatomicalGroundTruth(
          item.horizontalMirror,
        );
      const comparison =
        mappingComparison(canonicalProvider, anatomical);

      cases.push(Object.freeze({
        id:item.id,
        family:item.family,
        horizontalMirror:item.horizontalMirror,
        reflectionParity:item.reflectionParity,
        physicalClockwiseRotationDegrees:
          item.physicalClockwiseRotationDegrees,
        compensationDegrees:item.compensationDegrees,
        transformedRgbaSha256,
        provider:Object.freeze({
          eligibilityState:provider.state,
          faceCount:provider.faceCount,
          landmarkCount:provider.landmarkCount,
          providerEyeCentroids:
            provider.providerEyeCentroids,
          canonicalProviderEyeCentroids:
            canonicalProvider,
        }),
        canonicalAnatomicalGroundTruth:anatomical,
        directCost:comparison.directCost,
        swappedCost:comparison.swappedCost,
        relation:comparison.relation,
      }));
    }

    const assessment =
      assessNeutralEarProspectiveIndependentGeometryFR104(
        cases.map((item) => Object.freeze({
          id:item.id,
          available:
            item.provider.canonicalProviderEyeCentroids !== null,
          reflectionParity:item.reflectionParity,
          directCost:item.directCost,
          swappedCost:item.swappedCost,
        })),
      );

    const result = Object.freeze({
      schemaVersion:
        'fr104-prospective-independent-geometry-provider-result-v1',
      authorityState:
        'prospective_candidate_result_not_admitted',
      studyKind:protocol.studyKind,
      preregistration:Object.freeze({
        preregistrationMergeSha:
          fixtureEvidence.preregistrationMergeSha,
        fixturePinMergeRequiredBeforeExecution:true,
        frozenRule:protocol.frozenRule,
      }),
      fixture:Object.freeze({
        fixtureRef:protocol.prospectiveFixture.fixtureRef,
        expectedPngSha256:
          fixtureEvidence.renderedFixture.pngSha256,
        observedPngSha256:canonical.observedSha256,
        digestVerified:
          canonical.observedSha256
            === fixtureEvidence.renderedFixture.pngSha256,
        width:canonical.width,
        height:canonical.height,
        sourceImagePersisted:false,
        transformedRasterPersisted:false,
      }),
      runtime:Object.freeze({
        packageName:protocol.providerRuntime.packageName,
        packageVersion:protocol.providerRuntime.packageVersion,
        wasmRootInheritedFrom:
          'FR26_MEDIAPIPE_WASM_ROOT',
        modelAssetInheritedFrom:
          'FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL',
        runningMode:protocol.providerRuntime.runningMode,
        numFaces:protocol.providerRuntime.numFaces,
        expectedLandmarkCount:
          protocol.providerRuntime.expectedLandmarkCount,
        imageProcessingOptionsRotationDegreesUsed:true,
      }),
      cases:Object.freeze(cases),
      assessment,
      interpretationBoundary:Object.freeze({
        prospectiveGeometryFixtureIndependentFromU4a:
          protocol.interpretationBoundary
            .prospectiveGeometryFixtureIndependentFromU4a,
        sourceFamilyIndependentFromU4a:false,
        providerPublishedSideNamesUsedAsAnatomicalAuthority:
          false,
        imageSpaceXSignUsedAsAnatomicalAuthority:false,
        sourceSemanticConflictDeclaredResolved:false,
        globalProviderAnatomicalSemanticsMayBeEstablished:
          false,
        runtimeSubjectPhotoLateralityMayBeAuthorized:false,
        crossSourceFamilyValidationStillRequired:true,
      }),
      privacy:protocol.privacy,
      execution:Object.freeze({
        allEightCasesAttempted:true,
        providerExecuted:true,
        empiricalResultAdmitted:false,
        resultDigestPinned:false,
        ruleRetunedAfterObservation:false,
      }),
      authority:Object.freeze({
        u4bFixtureDigestPinned:true,
        prospectiveIndependentGeometryValidationExecuted:
          false,
        prospectiveIndependentGeometryMappingValidated:
          false,
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
        'fr104-prospective-independent-geometry-provider-error-v1',
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
