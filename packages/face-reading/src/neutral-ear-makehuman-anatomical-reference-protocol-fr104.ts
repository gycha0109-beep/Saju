import {
  NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104,
} from './neutral-ear-anatomical-reference-asset-audit-fr104.js';

export const NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-anatomical-reference-render-protocol-v1' as const,
    authorityState:
      'deterministic_render_preflight_implemented_digest_pending_provider_preflight_not_executed' as const,

    auditRef:
      'NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104' as const,

    candidate: Object.freeze({
      candidateRef:
        'makehuman_default_cc0_head_reference' as const,
      selectedByAudit:
        NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104
          .decision.primaryPreflightCandidateRef,
      admittedByAudit: false as const,
    }),

    sourceBundle: Object.freeze({
      repository:
        'makehumancommunity/makehuman' as const,
      commit:
        'a8bc2d54ff0ac92e78ff71431b1023eda42bf482' as const,
      baseMesh: Object.freeze({
        path:
          'makehuman/data/3dobjs/base.obj' as const,
        blobSha:
          'd26635e9326e3cca30778fd7b9c00062b03cce09' as const,
      }),
      highPolyEyes: Object.freeze({
        objectPath:
          'makehuman/data/eyes/high-poly/high-poly.obj' as const,
        objectBlobSha:
          '01562a9caf4dca9ebb1fd5c24db083c17e724330' as const,
        proxyPath:
          'makehuman/data/eyes/high-poly/high-poly.mhclo' as const,
        proxyBlobSha:
          '22bc5f77f398c59088804f7f4c9bb0e39d38661d' as const,
      }),
      proxyRuntime: Object.freeze({
        path: 'makehuman/shared/proxy.py' as const,
        blobSha:
          'ac98a19632b0769b23ad3276380cc6132b2e0928' as const,
      }),
      defaultSkeleton: Object.freeze({
        path:
          'makehuman/data/rigs/default.mhskel' as const,
        blobSha:
          'b02cbecae00143856410d7561adf006d83bf9b3e' as const,
      }),
      orientationWitness: Object.freeze({
        path:
          'makehuman/data/povray/makehuman_hair.inc' as const,
        blobSha:
          'c017181d4d6d948833952fe6523e8798cc2c39c2' as const,
      }),
      licenseWitness: Object.freeze({
        path: 'LICENSE.md' as const,
        blobSha:
          '5d1a49d31ebdaa46b06c52eae2c005c678a63ffa' as const,
        assetLicense: 'CC0-1.0' as const,
      }),
    }),

    independentAnatomicalAnchors: Object.freeze({
      leftEyeJoint: 'eye.L' as const,
      rightEyeJoint: 'eye.R' as const,
      providerLabelDerived: false as const,
      leftRightVectorWitness:
        'vnormalize(MakeHuman_joint_r_eye-MakeHuman_joint_l_eye)' as const,
      forwardVectorWitness:
        'vnormalize((MakeHuman_joint_l_eye+MakeHuman_joint_r_eye)/2-MakeHuman_joint_head)' as const,
      upVectorWitness:
        'VPerp_To_Plane(MakeHuman_HeadFwVector, MakeHuman_HeadLRVector)' as const,
    }),

    deterministicRenderContract: Object.freeze({
      implementationState:
        'implemented_digest_observation_pending_pin' as const,
      outputFormat: 'PNG' as const,
      outputWidth: 1024 as const,
      outputHeight: 1024 as const,
      exifMetadataPresent: false as const,
      postRenderCropApplied: false as const,
      postRenderResizeApplied: false as const,
      postRenderRotationApplied: false as const,
      postRenderHorizontalMirrorApplied: false as const,
      yawDegrees: 0 as const,
      pitchDegrees: 0 as const,
      rollDegrees: 0 as const,
      projectionModel:
        'orthographic_preflight_candidate' as const,
      cameraBasis: Object.freeze({
        forwardFromIndependentMakeHumanAnchor:
          true as const,
        leftRightFromIndependentMakeHumanAnchor:
          true as const,
        upFromIndependentMakeHumanAnchor:
          true as const,
      }),
      framingRuleState:
        'eye_midpoint_center_square_span_three_makehuman_units' as const,
      lightingRuleState:
        'symmetric_camera_frontal_flat_lambert_ambient_0_35_diffuse_0_65' as const,
      materialRuleState:
        'fixed_symmetric_rgb_body_198_151_127_eye_220_220_220' as const,
      backgroundRuleState:
        'uniform_rgb_32_32_32' as const,
    }),

    groundTruthProjectionContract: Object.freeze({
      implementationState:
        'implemented_same_camera_projection_in_u1_2_runner' as const,
      anatomicalLeftEyeSource:
        'MakeHuman eye.L independent joint head' as const,
      anatomicalRightEyeSource:
        'MakeHuman eye.R independent joint head' as const,
      sameCameraMatrixAsRenderedFixtureRequired:
        true as const,
      providerLandmarksMayInfluenceGroundTruth:
        false as const,
      providerLabelsMayInfluenceGroundTruth:
        false as const,
      florencePromptSideMayInfluenceGroundTruth:
        false as const,
      imageSpaceXSignMayDefineAnatomicalSide:
        false as const,
    }),

    providerPreflight: Object.freeze({
      packageName:
        '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
      exactlyOneFaceRequired: true as const,
      expectedLandmarkCount: 478 as const,
      executed: false as const,
      renderedFixtureDigestPinned: false as const,
      exactlyOneFaceVerified: false as const,
      rawLandmarksPersisted: false as const,
      sourceRenderPersistedInRepository: false as const,
    }),

    executionBlockers: Object.freeze([
      'rendered_fixture_digest_not_pinned',
      'face_landmarker_exactly_one_face_preflight_not_executed',
    ] as const),

    decision: Object.freeze({
      protocolMayBeExecutedNow: true as const,
      fixtureMayBeCalledControlledAnatomicalReference:
        false as const,
      anatomicalMappingEvidenceMayBeAdmitted:
        false as const,
      nextGate:
        'execute the deterministic MakeHuman render preflight, pin the observed digest, then verify exactly one FaceLandmarker face before any anatomical-reference admission' as const,
    }),

    authority: Object.freeze({
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
