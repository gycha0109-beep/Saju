import {
  FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
  FR26_MEDIAPIPE_WASM_ROOT,
} from './mediapipe-face-landmarker-runtime-fr26.js';

export const NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104 =
  Object.freeze({
    phase:
      'FR104_CONTROLLED_PROVIDER_INDEPENDENT_PUBLIC_FIXTURE_MIRROR' as const,
    authorityState:
      'independent_public_fixture_protocol_ready_empirical_result_not_yet_admitted' as const,

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
      fixtureRef:
        'skimage_astronaut_public_domain' as const,
      sourceRepository:
        'scikit-image/scikit-image' as const,
      sourceCommit:
        '533b7694d2004ae84e49e2cfd0bcfc5f8e562f22' as const,
      registryPath:
        'src/_skimage2/data/_registry.py' as const,
      registryBlobSha:
        '017d268bc4b9f07cc9bb82318e9f0bee961871cd' as const,
      metadataPath:
        'src/_skimage2/data/_fetchers.py' as const,
      metadataBlobSha:
        '84164c6fde6ece45def699e2d60d5369b18e0a51' as const,
      fileName: 'astronaut.png' as const,
      assetUrl:
        'https://cdn.jsdelivr.net/gh/scikit-image/scikit-image@533b7694d2004ae84e49e2cfd0bcfc5f8e562f22/src/_skimage2/data/astronaut.png' as const,
      sha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5' as const,
      expectedWidth: 512 as const,
      expectedHeight: 512 as const,
      publicUseStatement:
        'scikit-image metadata states no known copyright restrictions and public-domain release' as const,
      sourceRepositoryDistinctFromMediaPipeFixtureSource:
        true as const,
      depictedPersonIdentityUsedForRuntimeDecision:
        false as const,
    }),

    transformation: Object.freeze({
      pair: Object.freeze([
        'original',
        'horizontal_mirror',
      ] as const),
      resizeApplied: false as const,
      cropApplied: false as const,
      rotationApplied: false as const,
      taskImageProcessingRotationDegrees: 0 as const,
    }),

    boundedMeasurement: Object.freeze({
      topologySources: Object.freeze([
        'FACE_LANDMARKS_LEFT_EYE',
        'FACE_LANDMARKS_RIGHT_EYE',
      ] as const),
      exactlyOneFaceRequiredPerPairMember: true as const,
      rawLandmarksReturned: false as const,
      rawLandmarksPersisted: false as const,
      sourceImagePersisted: false as const,
      numericAcceptanceThresholdAuthorized: false as const,
    }),

    localHarness: Object.freeze({
      pageRoute:
        '/fr104-mirror-independent/' as const,
      clientRoute:
        '/fr104-mirror-independent/operator.mjs' as const,
      userImageInputAccepted: false as const,
      cameraAccessAuthorized: false as const,
      fixtureDigestVerificationRequiredBeforeInference:
        true as const,
      fixtureDimensionsVerificationRequiredBeforeInference:
        true as const,
    }),

    authority: Object.freeze({
      successfulFixtureMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide:
        false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    nextGate:
      'execute_exact_independent_public_fixture_then_recompute_scalar_result_before_semantic_review' as const,
  });
