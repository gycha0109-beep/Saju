import {
  FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
  FR26_MEDIAPIPE_WASM_ROOT,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104,
} from './neutral-ear-mirror-pair-empirical-evidence-fr104.js';

export const NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104 =
  Object.freeze({
    phase: 'FR104_CONTROLLED_PROVIDER_MULTI_FIXTURE_MIRROR' as const,
    authorityState:
      'multi_fixture_runtime_protocol_ready_empirical_result_not_yet_admitted' as const,

    predecessor: Object.freeze({
      firstEmpiricalCloserPattern:
        NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104
          .exactFixtureObservation.closerPattern,
      generalProviderMirrorSemanticsEstablished:
        NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104
          .interpretation.generalProviderMirrorSemanticsEstablished,
    }),

    upstreamRelease: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit:
        'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      externalFilesManifest: Object.freeze({
        path: 'third_party/external_files.bzl' as const,
        gitBlobSha:
          'f52887c2586679e00c9b0ac10291abc14334e45a' as const,
      }),
    }),

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

    fixtures: Object.freeze([
      Object.freeze({
        fixtureRef: 'portrait_baseline' as const,
        fileName: 'portrait.jpg' as const,
        assetUrl:
          'https://storage.googleapis.com/mediapipe-assets/portrait.jpg?generation=1674261630039907' as const,
        sha256:
          'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e' as const,
        evidenceRole:
          'face_landmarker_exact_test_baseline' as const,
        sourceWitness: Object.freeze({
          path:
            'mediapipe/tasks/cc/vision/face_landmarker/face_landmarker_test.cc' as const,
          gitBlobSha:
            '41b5ede6a42ffd6ad3bbfe368af106f26a556ebf' as const,
          statement:
            'portrait_named_as_pinned_face_landmarker_test_image' as const,
        }),
      }),
      Object.freeze({
        fixtureRef: 'portrait_small_candidate' as const,
        fileName: 'portrait_small.jpg' as const,
        assetUrl:
          'https://storage.googleapis.com/mediapipe-assets/portrait_small.jpg?generation=1682627845552867' as const,
        sha256:
          '873a1a5e4cc86c040101362c5dea6a71cf524563b0700640175e5c3763a4246a' as const,
        evidenceRole:
          'public_manifest_face_candidate_face_suitability_empirical' as const,
        sourceWitness: Object.freeze({
          path: 'third_party/external_files.bzl' as const,
          gitBlobSha:
            'f52887c2586679e00c9b0ac10291abc14334e45a' as const,
          statement:
            'asset_identity_and_digest_only_no_face_landmarker_suitability_claim' as const,
        }),
      }),
      Object.freeze({
        fixtureRef: 'male_full_height_hands_candidate' as const,
        fileName: 'male_full_height_hands.jpg' as const,
        assetUrl:
          'https://storage.googleapis.com/mediapipe-assets/male_full_height_hands.jpg?generation=1692651585540897' as const,
        sha256:
          '8a7fe5be8b90d6078b09913ca28f7e5d342f8d3cde856ab4e3327d2970b887f8' as const,
        evidenceRole:
          'public_holistic_face_positive_candidate' as const,
        sourceWitness: Object.freeze({
          path:
            'mediapipe/tasks/cc/vision/holistic_landmarker/holistic_landmarker_test.cc' as const,
          gitBlobSha:
            '2f44913067b3513065e6515ed10c602fd8052c35' as const,
          statement:
            'pinned_holistic_test_uses_asset_and_asserts_nonempty_face_landmarks' as const,
        }),
      }),
      Object.freeze({
        fixtureRef: 'pose_candidate' as const,
        fileName: 'pose.jpg' as const,
        assetUrl:
          'https://storage.googleapis.com/mediapipe-assets/pose.jpg?generation=1678737494661975' as const,
        sha256:
          'c8a830ed683c0276d713dd5aeda28f415f10cd6291972084a40d0d8b934ed62b' as const,
        evidenceRole:
          'public_human_pose_candidate_face_suitability_empirical' as const,
        sourceWitness: Object.freeze({
          path:
            'mediapipe/tasks/cc/vision/pose_landmarker/pose_landmarker_test.cc' as const,
          gitBlobSha:
            'e1ac74c7391f0c86c30bcf6221e353f5d11dfa91' as const,
          statement:
            'pinned_pose_test_uses_asset_no_face_landmarker_suitability_claim' as const,
        }),
      }),
    ] as const),

    transformation: Object.freeze({
      pairPerFixture: Object.freeze([
        'original',
        'horizontal_mirror',
      ] as const),
      resizeBetweenPairMembers: false as const,
      cropBetweenPairMembers: false as const,
      rotationBetweenPairMembers: false as const,
      taskImageProcessingRotationDegrees: 0 as const,
    }),

    boundedMeasurement: Object.freeze({
      topologySources: Object.freeze([
        'FACE_LANDMARKS_LEFT_EYE',
        'FACE_LANDMARKS_RIGHT_EYE',
      ] as const),
      exactlyOneFaceRequiredPerPairMember: true as const,
      rawLandmarksPersisted: false as const,
      rawLandmarksReturned: false as const,
      scalarOutputsPerSuccessfulFixture: Object.freeze([
        'original.leftEyeCentroidX',
        'original.rightEyeCentroidX',
        'mirrored.leftEyeCentroidX',
        'mirrored.rightEyeCentroidX',
        'sameLabelReflectionTotalAbsoluteError',
        'crossLabelReflectionTotalAbsoluteError',
        'closerPattern',
      ] as const),
      unavailableFixtureRetainedAsAvailabilityStateOnly: true as const,
      numericAcceptanceThresholdAuthorized: false as const,
    }),

    interpretationBoundary: Object.freeze({
      fixtureSuccessMayBeCalledFaceSuitabilityForThatFixtureOnly:
        true as const,
      fixtureFailureMayBeCalledProviderSemanticCounterexample:
        false as const,
      repeatedCloserPatternMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    localHarness: Object.freeze({
      pageRoute: '/fr104-mirror-multi/' as const,
      clientRoute: '/fr104-mirror-multi/operator.mjs' as const,
      automaticCaptureOrUserCameraAccess: false as const,
      userImageInputAccepted: false as const,
      fixtureDigestVerificationRequiredBeforeInference: true as const,
    }),

    nextGate:
      'execute_multi_fixture_harness_then_admit_each_scalar_result_under_fixture_specific_boundary' as const,
  });
