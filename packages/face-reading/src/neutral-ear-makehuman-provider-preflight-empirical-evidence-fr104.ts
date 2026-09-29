import {
  admitNeutralEarMakeHumanProviderPreflightResultFR104,
} from './neutral-ear-makehuman-provider-preflight-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104,
} from './neutral-ear-makehuman-provider-preflight-fr104.js';

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-provider-preflight-result-v1' as const,
    fixture: Object.freeze({
      expectedSha256:
        'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb' as const,
      observedSha256:
        'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb' as const,
      digestVerified: true as const,
      width: 1024 as const,
      height: 1024 as const,
      repositoryPersistence: false as const,
      ephemeralMaterializationForProviderPreflight:
        true as const,
    }),
    runtime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      wasmRoot:
        NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104.runtime.wasmRoot,
      modelAssetRef:
        NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104.runtime.modelAssetRef,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
      runtimeAssetByteDigestVerified: false as const,
      modelAssetByteDigestVerified: false as const,
    }),
    privacy: Object.freeze({
      userImageConsumed: false as const,
      cameraAccessed: false as const,
      rawProviderLandmarksReturned: false as const,
      rawProviderLandmarksPersisted: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),
    execution: Object.freeze({
      providerPreflightExecuted: true as const,
      providerFaceDetectabilityObserved: true as const,
      empiricalResultAdmitted: false as const,
    }),
    authority: Object.freeze({
      providerFaceDetectabilityVerified: false as const,
      providerLabelMappedToAnatomicalSide: false as const,
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
    authorityState:
      'candidate_scalar_evidence_only_no_anatomical_mapping' as const,
    providerEligibility: Object.freeze({
      state:
        'exact_one_face_478_landmarks_observed' as const,
      faceCount: 1 as const,
      landmarkCount: 478 as const,
      exactlyOneFaceVerified: true as const,
      expectedLandmarkCount: 478 as const,
    }),
    providerEyeCentroids: Object.freeze({
      providerLeft: Object.freeze({
        x: 0.5904278568923473,
        y: 0.512873537838459,
      }),
      providerRight: Object.freeze({
        x: 0.4134050067514181,
        y: 0.5108402445912361,
      }),
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning' as const,
    }),
    independentAnatomicalGroundTruth: Object.freeze({
      coordinateFrame:
        'canonical_image_normalized_2d' as const,
      anatomicalLeftEye: Object.freeze({
        x: 0.5909577633614812,
        y: 0.5,
        sourceJoint: 'eye.L____head' as const,
      }),
      anatomicalRightEye: Object.freeze({
        x: 0.4090422366385188,
        y: 0.5,
        sourceJoint: 'eye.R____head' as const,
      }),
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
    }),
    comparison: Object.freeze({
      directCost: 0.02456967216060714,
      swappedCost: 0.35972525227214214,
      relation: 'direct_assignment_closer' as const,
      numericAcceptanceThresholdApplied: false as const,
    }),
  });

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104 =
  admitNeutralEarMakeHumanProviderPreflightResultFR104(
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104,
  );

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_DECISION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-provider-preflight-empirical-decision-v1' as const,
    evidenceRef:
      'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104' as const,
    observed: Object.freeze({
      exactlyOneFace478Landmarks: true as const,
      relation: 'direct_assignment_closer' as const,
      directCost: 0.02456967216060714,
      swappedCost: 0.35972525227214214,
    }),
    interpretation: Object.freeze({
      providerFaceDetectabilityVerifiedForExactPinnedFixture:
        true as const,
      exactFixtureDirectAssignmentRelationObserved:
        true as const,
      providerLabelMayBeCalledAnatomicalSide:
        false as const,
      resultMayEstablishGlobalProviderAnatomicalSemantics:
        false as const,
      anatomicalReferenceAdmitted:
        false as const,
    }),
    nextGate:
      'run_same_pinned_fixture_horizontal_mirror_and_0_90_180_270_rotation_diagnostics_before_any_anatomical_mapping_admission' as const,
    authority: Object.freeze({
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
