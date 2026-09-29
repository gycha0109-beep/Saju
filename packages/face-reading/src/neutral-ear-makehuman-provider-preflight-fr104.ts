import {
  FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
  FR26_MEDIAPIPE_WASM_ROOT,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104,
} from './neutral-ear-makehuman-anatomical-reference-protocol-fr104.js';

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104 = Object.freeze({
  phase: 'FR104_MAKEHUMAN_PROVIDER_PREFLIGHT_U2' as const,
  authorityState:
    'protocol_ready_empirical_result_not_yet_admitted' as const,

  predecessor:
    NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104.schemaVersion,

  fixture: Object.freeze({
    route: '/fr104-makehuman-preflight/fixture.png' as const,
    expectedSha256:
      'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb' as const,
    width: 1024 as const,
    height: 1024 as const,
    source:
      'FR104_U1_2_PINNED_DETERMINISTIC_MAKEHUMAN_RENDER' as const,
    repositoryPersistence: false as const,
    ephemeralMaterializationForProviderPreflight:
      true as const,
  }),

  independentAnatomicalGroundTruth: Object.freeze({
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    anatomicalLeftEye: Object.freeze({
      x: 0.5909577633614812 as const,
      y: 0.5 as const,
      sourceJoint: 'eye.L____head' as const,
    }),
    anatomicalRightEye: Object.freeze({
      x: 0.4090422366385188 as const,
      y: 0.5 as const,
      sourceJoint: 'eye.R____head' as const,
    }),
    providerLandmarkDerived: false as const,
    providerLabelDerived: false as const,
    imageSpaceXSignDefinesAnatomicalSide: false as const,
  }),

  runtime: Object.freeze({
    packageName: '@mediapipe/tasks-vision' as const,
    packageVersion: '0.10.35' as const,
    wasmRoot: FR26_MEDIAPIPE_WASM_ROOT,
    modelAssetRef: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
    runningMode: 'IMAGE' as const,
    numFaces: 1 as const,
    outputFaceBlendshapes: false as const,
    outputFacialTransformationMatrixes: false as const,
    runtimeAssetByteDigestVerified: false as const,
    modelAssetByteDigestVerified: false as const,
  }),

  providerEligibility: Object.freeze({
    exactlyOneFaceRequired: true as const,
    expectedLandmarkCount: 478 as const,
    noFaceState: 'provider_cannot_detect_face' as const,
    unexpectedLandmarkShapeState: 'unavailable' as const,
  }),

  boundedComparison: Object.freeze({
    providerTopologyInputs: Object.freeze([
      'FACE_LANDMARKS_LEFT_EYE',
      'FACE_LANDMARKS_RIGHT_EYE',
    ] as const),
    providerEyeCentroidDimensions: Object.freeze(['x', 'y'] as const),
    directCost:
      'distance(provider_left,anatomical_left)+distance(provider_right,anatomical_right)' as const,
    swappedCost:
      'distance(provider_left,anatomical_right)+distance(provider_right,anatomical_left)' as const,
    relationStates: Object.freeze([
      'direct_assignment_closer',
      'swapped_assignment_closer',
      'equal_or_unresolved',
    ] as const),
    numericAcceptanceThresholdAuthorized: false as const,
    relationMayEstablishGlobalProviderAnatomicalSemantics:
      false as const,
  }),

  localHarness: Object.freeze({
    pageRoute: '/fr104-makehuman-preflight/' as const,
    clientRoute:
      '/fr104-makehuman-preflight/operator.mjs' as const,
    automaticUserCameraAccess: false as const,
    userImageInputAccepted: false as const,
    fixtureDigestVerificationRequiredBeforeInference:
      true as const,
    ciHeadlessBrowserExecutionRequired: true as const,
  }),

  privacy: Object.freeze({
    userImageConsumed: false as const,
    cameraAccessed: false as const,
    rawProviderLandmarksReturned: false as const,
    rawProviderLandmarksPersisted: false as const,
    biometricEmbeddingProduced: false as const,
    identityTemplateProduced: false as const,
  }),

  authority: Object.freeze({
    providerPreflightExecuted: false as const,
    providerFaceDetectabilityVerified: false as const,
    providerLabelMappedToAnatomicalSide: false as const,
    anatomicalReferenceAdmitted: false as const,
    anatomicalLateralityAuthorized: false as const,
    validatedExternalEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  }),

  nextGate:
    'execute_exact_facelandmarker_on_pinned_makehuman_raster_then_admit_only_bounded_scalar_result' as const,
});
