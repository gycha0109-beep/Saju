export const NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-anatomical-witness-evidence-v1' as const,
    authorityState:
      'gnm_direct_left_right_joint_witness_supported_admitted' as const,

    preregistrationMergeSha:
      '2868ba01d36b89dbb739216fdbc9eb6f69842a25' as const,
    candidateMergeSha:
      'd2b615c3f027860d6cf8de65f502585d54e95fdc' as const,
    firstObservationWorkflowRunId:
      36951791966 as const,
    independentDuplicateObservationWorkflowRunId:
      36952101771 as const,

    resultSha256:
      '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21' as const,
    state:
      'gnm_direct_left_right_joint_witness_supported' as const,

    sourceAsset:Object.freeze({
      repository:'google/GNM' as const,
      upstreamCommit:
        'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690' as const,
      sourcePath:
        'gnm/shape/data/versions/v3_0/gnm_head.npz' as const,
      gitBlobSha:
        'ae49903ad7d50ce1d64e464a0407441f2781873c' as const,
      byteLength:53305389 as const,
      versionNormalized:'3.0' as const,
      variantNormalized:'head' as const,
    }),

    directSourceSemanticWitness:Object.freeze({
      leftEye:Object.freeze({
        jointName:'left_eye' as const,
        jointIndex:2 as const,
        templateJointPosition:Object.freeze([
          0.030839037150144577,
          0.30316492915153503,
          0.09888789802789688,
        ] as const),
      }),
      rightEye:Object.freeze({
        jointName:'right_eye' as const,
        jointIndex:3 as const,
        templateJointPosition:Object.freeze([
          -0.030866222456097603,
          0.3031134307384491,
          0.09897840023040771,
        ] as const),
      }),
      positionsFinite:true as const,
      positionsDistinct:true as const,
      requiredProviderGroups:Object.freeze([
        'ears','left','right',
      ] as const),
      requiredProviderGroupsPresent:true as const,
    }),

    diagnostics:Object.freeze({
      xOrdering:'left_greater_than_right' as const,
      xOrderingIsDiagnosticOnly:true as const,
      imageSpaceXSignUsedAsSemanticAuthority:false as const,
      gnmAxisOrderingUsedAsSemanticAuthority:false as const,
      mediaPipeProviderLabelsUsedAsSemanticAuthority:false as const,
    }),

    interpretation:Object.freeze({
      sourceFamilyDistinctFromMakeHuman:true as const,
      sourceFamilyDistinctFromMediaPipe:true as const,
      directSourceLeftRightNamingAudited:true as const,
      crossSourceFamilyGeometricValidationExecuted:false as const,
      runtimeSubjectPhotoLateralityAuthorized:false as const,
    }),

    authority:Object.freeze({
      gnmCrossSourceSemanticWitnessAudited:true as const,
      gnmCrossSourceGeometricValidationExecuted:false as const,
      providerLabelMappedToAnatomicalSide:false as const,
      globalProviderAnatomicalSemanticsEstablished:false as const,
      anatomicalReferenceAdmitted:false as const,
      anatomicalLateralityAuthorized:false as const,
      validatedExternalEarObservationAuthorized:false as const,
      traditionalBindingAuthorized:false as const,
      productionAuthorization:false as const,
    }),

    nextGate:
      'U5B_A_PREREGISTER_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION' as const,
  });
