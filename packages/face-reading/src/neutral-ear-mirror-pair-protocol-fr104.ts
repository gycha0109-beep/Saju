import {
  FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
  FR26_MEDIAPIPE_WASM_ROOT,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104,
} from './neutral-ear-laterality-source-audit-fr104.js';

export const NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104 = Object.freeze({
  phase: 'FR104_CONTROLLED_PROVIDER_MIRROR_PAIR' as const,
  authorityState:
    'controlled_runtime_protocol_ready_empirical_result_not_yet_admitted' as const,

  predecessor:
    NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104.phase,

  runtime: Object.freeze({
    packageName: '@mediapipe/tasks-vision' as const,
    packageVersion: '0.10.35' as const,
    wasmRoot: FR26_MEDIAPIPE_WASM_ROOT,
    modelAssetRef: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
    runningMode: 'IMAGE' as const,
    numFaces: 1 as const,
    runtimeAssetByteDigestVerified: false as const,
    modelAssetByteDigestVerified: false as const,
  }),

  fixture: Object.freeze({
    sourceClass:
      'mediapipe_public_test_asset_non_user_fixture' as const,
    fileName: 'portrait.jpg' as const,
    assetUrl:
      'https://storage.googleapis.com/mediapipe-assets/portrait.jpg?generation=1674261630039907' as const,
    sha256:
      'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e' as const,
    sourceWitness: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit:
        'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      path: 'third_party/external_files.bzl' as const,
      gitBlobSha:
        'f52887c2586679e00c9b0ac10291abc14334e45a' as const,
    }),
    faceLandmarkerTestWitness: Object.freeze({
      path:
        'mediapipe/tasks/cc/vision/face_landmarker/face_landmarker_test.cc' as const,
      gitBlobSha:
        '41b5ede6a42ffd6ad3bbfe368af106f26a556ebf' as const,
      portraitImageUsedByPinnedTest: true as const,
    }),
    rawFixtureCommittedToSaju: false as const,
    rawFixturePersistedByHarness: false as const,
  }),

  transformation: Object.freeze({
    originalPixelsUsedUnmodifiedAfterDecode: true as const,
    mirrorTransform:
      'canvas_horizontal_reflection_x_prime_equals_width_minus_x' as const,
    resizeBetweenPairMembers: false as const,
    cropBetweenPairMembers: false as const,
    rotationBetweenPairMembers: false as const,
  }),

  boundedMeasurement: Object.freeze({
    topologySources: Object.freeze([
      'FACE_LANDMARKS_LEFT_EYE',
      'FACE_LANDMARKS_RIGHT_EYE',
    ] as const),
    rawLandmarksPersisted: false as const,
    rawLandmarksReturned: false as const,
    scalarOutputs: Object.freeze([
      'original.leftEyeCentroidX',
      'original.rightEyeCentroidX',
      'mirrored.leftEyeCentroidX',
      'mirrored.rightEyeCentroidX',
      'sameLabelReflectionTotalAbsoluteError',
      'crossLabelReflectionTotalAbsoluteError',
    ] as const),
    descriptiveCloserPatternAllowed: true as const,
    numericAcceptanceThresholdAuthorized: false as const,
  }),

  interpretationBoundary: Object.freeze({
    providerLabelMayBeCalledAnatomicalSide: false as const,
    sameLabelReflectionCloserMayBeCalledAnatomicalInvariance: false as const,
    crossLabelReflectionCloserMayBeCalledLabelSwapSemantics: false as const,
    singleFixtureMayEstablishGeneralMirrorBehavior: false as const,
    anatomicalLateralityAuthorized: false as const,
    validatedExternalEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  }),

  localHarness: Object.freeze({
    pageRoute: '/fr104-mirror/' as const,
    clientRoute: '/fr104-mirror/operator.mjs' as const,
    automaticCaptureOrUserCameraAccess: false as const,
    userImageInputAccepted: false as const,
    fixtureDigestVerificationRequiredBeforeInference: true as const,
  }),

  nextGate:
    'execute_controlled_mirror_pair_then_record_scalar_only_empirical_relation' as const,
});
