import {
  admitNeutralEarControlledMultiFixtureMirrorResultFR104,
} from './neutral-ear-mirror-multifixture-result-intake-fr104.js';

export const NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_SOURCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-multifixture-mirror-result-v1' as const,
    authorityState:
      'multi_public_fixture_scalar_evidence_only_no_general_semantics' as const,
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
      wasmRoot:
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm' as const,
      modelAssetRef:
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task' as const,
      runtimeAssetByteDigestVerified: false as const,
      modelAssetByteDigestVerified: false as const,
    }),
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
    fixtureResults: Object.freeze([
      Object.freeze({
        fixtureRef: 'portrait_baseline' as const,
        fileName: 'portrait.jpg' as const,
        evidenceRole:
          'face_landmarker_exact_test_baseline' as const,
        expectedSha256:
          'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e' as const,
        observedSha256:
          'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e' as const,
        digestVerified: true as const,
        width: 820 as const,
        height: 1024 as const,
        rawFixturePersisted: false as const,
        pair: Object.freeze({
          status: 'paired_scalar_evidence' as const,
          original: Object.freeze({
            leftEyeCentroidX: 0.5461522229015827,
            rightEyeCentroidX: 0.44472135603427887,
          }),
          mirrored: Object.freeze({
            leftEyeCentroidX: 0.5557297803461552,
            rightEyeCentroidX: 0.4528836291283369,
          }),
          sameLabelReflectionTotalAbsoluteError:
            0.2042770180851221,
          crossLabelReflectionTotalAbsoluteError:
            0.001415284350514412,
          closerPattern:
            'cross_label_reflection_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
      }),
      Object.freeze({
        fixtureRef: 'portrait_small_candidate' as const,
        fileName: 'portrait_small.jpg' as const,
        evidenceRole:
          'public_manifest_face_candidate_face_suitability_empirical' as const,
        expectedSha256:
          '873a1a5e4cc86c040101362c5dea6a71cf524563b0700640175e5c3763a4246a' as const,
        observedSha256:
          '873a1a5e4cc86c040101362c5dea6a71cf524563b0700640175e5c3763a4246a' as const,
        digestVerified: true as const,
        width: 205 as const,
        height: 256 as const,
        rawFixturePersisted: false as const,
        pair: Object.freeze({
          status: 'paired_scalar_evidence' as const,
          original: Object.freeze({
            leftEyeCentroidX: 0.5445252694189548,
            rightEyeCentroidX: 0.4427716601639986,
          }),
          mirrored: Object.freeze({
            leftEyeCentroidX: 0.5530601441860199,
            rightEyeCentroidX: 0.45130833983421326,
          }),
          sameLabelReflectionTotalAbsoluteError:
            0.20350541360676289,
          crossLabelReflectionTotalAbsoluteError:
            0.008334586396813393,
          closerPattern:
            'cross_label_reflection_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
      }),
      Object.freeze({
        fixtureRef:
          'male_full_height_hands_candidate' as const,
        fileName: 'male_full_height_hands.jpg' as const,
        evidenceRole:
          'public_holistic_face_positive_candidate' as const,
        expectedSha256:
          '8a7fe5be8b90d6078b09913ca28f7e5d342f8d3cde856ab4e3327d2970b887f8' as const,
        observedSha256:
          '8a7fe5be8b90d6078b09913ca28f7e5d342f8d3cde856ab4e3327d2970b887f8' as const,
        digestVerified: true as const,
        width: 638 as const,
        height: 1000 as const,
        rawFixturePersisted: false as const,
        pair: Object.freeze({
          status: 'unavailable_pair' as const,
          originalStatus:
            'unavailable_exactly_one_face_required' as const,
          mirroredStatus:
            'unavailable_exactly_one_face_required' as const,
          originalFaceCount: 0 as const,
          mirroredFaceCount: 0 as const,
        }),
      }),
      Object.freeze({
        fixtureRef: 'pose_candidate' as const,
        fileName: 'pose.jpg' as const,
        evidenceRole:
          'public_human_pose_candidate_face_suitability_empirical' as const,
        expectedSha256:
          'c8a830ed683c0276d713dd5aeda28f415f10cd6291972084a40d0d8b934ed62b' as const,
        observedSha256:
          'c8a830ed683c0276d713dd5aeda28f415f10cd6291972084a40d0d8b934ed62b' as const,
        digestVerified: true as const,
        width: 1000 as const,
        height: 667 as const,
        rawFixturePersisted: false as const,
        pair: Object.freeze({
          status: 'unavailable_pair' as const,
          originalStatus:
            'unavailable_exactly_one_face_required' as const,
          mirroredStatus:
            'unavailable_exactly_one_face_required' as const,
          originalFaceCount: 0 as const,
          mirroredFaceCount: 0 as const,
        }),
      }),
    ] as const),
    aggregate: Object.freeze({
      fixtureCount: 4 as const,
      successfulFixtureCount: 2 as const,
      unavailableFixtureCount: 2 as const,
      closerPatternCounts: Object.freeze({
        same_label_reflection_closer: 0 as const,
        cross_label_reflection_closer: 2 as const,
        equal: 0 as const,
      }),
      aggregateMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      anatomicalLateralityAuthorized: false as const,
    }),
    privacy: Object.freeze({
      userImageConsumed: false as const,
      cameraAccessed: false as const,
      sourceImagesPersisted: false as const,
      rawLandmarksReturned: false as const,
      rawLandmarksPersisted: false as const,
      embeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),
    authority: Object.freeze({
      repeatedPatternMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

export const NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104 =
  admitNeutralEarControlledMultiFixtureMirrorResultFR104(
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_SOURCE_FR104,
  );

export const NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_DECISION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-multifixture-empirical-decision-v1' as const,
    evidenceRef:
      'NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104' as const,
    observed: Object.freeze({
      fixtureCount:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .aggregate.fixtureCount,
      successfulFixtureCount:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .aggregate.successfulFixtureCount,
      unavailableFixtureCount:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .aggregate.unavailableFixtureCount,
      successfulCloserPatternCounts:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .aggregate.closerPatternCounts,
      allSuccessfulFixturesCrossLabelCloser: true as const,
      bothUnavailableFixturesHadZeroFacesOnBothPairMembers:
        true as const,
    }),
    evidenceLimit: Object.freeze({
      independentIdentityDiversityEstablished: false as const,
      portraitSmallIndependenceFromPortraitEstablished:
        false as const,
      unavailableFixturesMayBeUsedAsMirrorSemanticCounterexamples:
        false as const,
      generalProviderMirrorSemanticsEstablished:
        false as const,
    }),
    nextEvidence: Object.freeze([
      'obtain additional non-user public face fixtures that independently succeed under the exact FaceLandmarker runtime',
      'pin each additional fixture provenance and digest before execution',
      'prefer genuinely distinct face identity or appearance evidence rather than relying on a size variant whose independence from the portrait baseline is not established',
      'only after repeated successful independent fixtures perform a separate semantic review of provider-label mirror behavior',
      'anatomical-side mapping remains a separate review even if provider mirror behavior becomes well supported',
    ] as const),
    authority: Object.freeze({
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
