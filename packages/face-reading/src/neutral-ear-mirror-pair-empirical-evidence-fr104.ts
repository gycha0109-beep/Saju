import {
  admitNeutralEarControlledMirrorPairResultFR104,
} from './neutral-ear-mirror-pair-result-intake-fr104.js';

export const NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_SOURCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-mirror-pair-result-v1' as const,
    authorityState:
      'single_public_fixture_scalar_evidence_only_no_anatomical_mapping' as const,
    fixture: Object.freeze({
      sourceClass:
        'mediapipe_public_test_asset_non_user_fixture' as const,
      fileName: 'portrait.jpg' as const,
      expectedSha256:
        'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e' as const,
      observedSha256:
        'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e' as const,
      digestVerified: true as const,
      width: 820 as const,
      height: 1024 as const,
      rawFixturePersisted: false as const,
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
      pair: Object.freeze([
        'original',
        'horizontal_mirror',
      ] as const),
      resizeApplied: false as const,
      cropApplied: false as const,
      rotationApplied: false as const,
    }),
    scalarEvidence: Object.freeze({
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
    privacy: Object.freeze({
      userImageConsumed: false as const,
      cameraAccessed: false as const,
      sourceImagePersisted: false as const,
      rawLandmarksReturned: false as const,
      rawLandmarksPersisted: false as const,
      embeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),
    authority: Object.freeze({
      closerPatternMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

export const NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104 =
  admitNeutralEarControlledMirrorPairResultFR104(
    NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_SOURCE_FR104,
  );

export const NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-mirror-pair-empirical-decision-v1' as const,
    evidenceRef:
      'NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104' as const,
    exactFixtureObservation: Object.freeze({
      closerPattern:
        NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104
          .scalarEvidence.closerPattern,
      sameLabelReflectionTotalAbsoluteError:
        NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104
          .scalarEvidence.sameLabelReflectionTotalAbsoluteError,
      crossLabelReflectionTotalAbsoluteError:
        NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104
          .scalarEvidence.crossLabelReflectionTotalAbsoluteError,
      crossLabelErrorLowerThanSameLabelError: true as const,
    }),
    interpretation: Object.freeze({
      exactFixtureSupportsCrossLabelReflectionRelation:
        true as const,
      exactFixtureSupportsSameLabelReflectionRelation:
        false as const,
      generalProviderMirrorSemanticsEstablished:
        false as const,
      providerLabelsAdmittedAsAnatomicalSide:
        false as const,
      anatomicalLateralityMappingAdmitted:
        false as const,
    }),
    requiredNextEvidence: Object.freeze([
      'repeat exact-runtime horizontal-mirror scalar experiment across additional non-user public face fixtures with independently pinned provenance and digests',
      'review whether the observed reflection relation is stable across fixture pose, crop, and appearance variation before any provider-mirror semantic statement',
      'retain Phase G capture-transform provenance receipt as a separate prerequisite before anatomical-side mapping',
    ] as const),
    authority: Object.freeze({
      numericAcceptanceThresholdAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
