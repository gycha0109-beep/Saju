import {
  admitNeutralEarIndependentPublicFixtureMirrorResultFR104,
} from './neutral-ear-mirror-independent-fixture-result-intake-fr104.js';

export const NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_SOURCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-independent-fixture-mirror-result-v1' as const,
    authorityState:
      'single_independent_public_fixture_scalar_evidence_only_no_general_semantics' as const,
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
    fixture: Object.freeze({
      fixtureRef:
        'skimage_astronaut_public_domain' as const,
      sourceRepository:
        'scikit-image/scikit-image' as const,
      sourceCommit:
        '533b7694d2004ae84e49e2cfd0bcfc5f8e562f22' as const,
      registryBlobSha:
        '017d268bc4b9f07cc9bb82318e9f0bee961871cd' as const,
      metadataBlobSha:
        '84164c6fde6ece45def699e2d60d5369b18e0a51' as const,
      fileName: 'astronaut.png' as const,
      expectedSha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5' as const,
      observedSha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5' as const,
      digestVerified: true as const,
      width: 512 as const,
      height: 512 as const,
      rawFixturePersisted: false as const,
      sourceRepositoryDistinctFromMediaPipeFixtureSource:
        true as const,
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
    pair: Object.freeze({
      status: 'paired_scalar_evidence' as const,
      original: Object.freeze({
        leftEyeCentroidX: 0.48118495009839535,
        rightEyeCentroidX: 0.39833978191018105,
      }),
      mirrored: Object.freeze({
        leftEyeCentroidX: 0.5995679348707199,
        rightEyeCentroidX: 0.5179052278399467,
      }),
      sameLabelReflectionTotalAbsoluteError:
        0.16450787521898746,
      crossLabelReflectionTotalAbsoluteError:
        0.0030021052807569504,
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
      resultMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

export const NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104 =
  admitNeutralEarIndependentPublicFixtureMirrorResultFR104(
    NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_SOURCE_FR104,
  );

export const NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_DECISION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-independent-public-fixture-empirical-decision-v1' as const,
    evidenceRef:
      'NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104' as const,
    observed: Object.freeze({
      fixtureRef:
        NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .fixture.fixtureRef,
      closerPattern:
        NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .scalarEvidence?.closerPattern,
      sameLabelReflectionTotalAbsoluteError:
        NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .scalarEvidence?.sameLabelReflectionTotalAbsoluteError,
      crossLabelReflectionTotalAbsoluteError:
        NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104
          .scalarEvidence?.crossLabelReflectionTotalAbsoluteError,
      sourceRepositoryDistinctFromMediaPipeFixtureSource:
        true as const,
    }),
    interpretation: Object.freeze({
      independentSourceFixtureReproducesCrossLabelReflection:
        true as const,
      resultAloneMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide:
        false as const,
    }),
    authority: Object.freeze({
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
