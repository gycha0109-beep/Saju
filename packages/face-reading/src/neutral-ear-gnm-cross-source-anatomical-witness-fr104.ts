import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-prospective-independent-geometry-empirical-evidence-fr104.js';

export type NeutralEarGnmCrossSourceWitnessStateFR104V1 =
  | 'gnm_direct_left_right_joint_witness_supported'
  | 'gnm_direct_left_right_joint_witness_refuted'
  | 'gnm_direct_left_right_joint_witness_unresolved';

export interface NeutralEarGnmCrossSourceWitnessObservationFR104V1 {
  readonly assetVerified: boolean;
  readonly variantNormalized: string | null;
  readonly jointNamesReadable: boolean;
  readonly leftEyeJointCount: number | null;
  readonly rightEyeJointCount: number | null;
  readonly templateJointPositionsReadable: boolean;
  readonly leftEyePositionFinite: boolean | null;
  readonly rightEyePositionFinite: boolean | null;
  readonly leftRightPositionsDistinct: boolean | null;
  readonly requiredProviderGroupsReadable: boolean;
  readonly requiredProviderGroupsPresent: boolean | null;
}

export interface NeutralEarGnmCrossSourceWitnessAssessmentFR104V1 {
  readonly state: NeutralEarGnmCrossSourceWitnessStateFR104V1;
  readonly directSourceLeftEyeJointWitnessPresent: boolean;
  readonly directSourceRightEyeJointWitnessPresent: boolean;
  readonly jointPositionsUsableAsControlledAnchors: boolean;
  readonly providerGroupsAvailableForReferenceContext: boolean;
  readonly imageSpaceXSignUsedAsSemanticAuthority: false;
  readonly mediaPipeProviderLabelsUsedAsSemanticAuthority: false;
  readonly gnmAxisOrderingUsedAsSemanticAuthority: false;
}

export function assessNeutralEarGnmCrossSourceWitnessFR104(
  input: NeutralEarGnmCrossSourceWitnessObservationFR104V1,
): NeutralEarGnmCrossSourceWitnessAssessmentFR104V1 {
  const explicitRefutation =
    input.assetVerified
    && input.jointNamesReadable
    && (
      input.variantNormalized !== 'head'
      || input.leftEyeJointCount !== 1
      || input.rightEyeJointCount !== 1
      || (
        input.templateJointPositionsReadable
        && (
          input.leftEyePositionFinite !== true
          || input.rightEyePositionFinite !== true
          || input.leftRightPositionsDistinct !== true
        )
      )
      || (
        input.requiredProviderGroupsReadable
        && input.requiredProviderGroupsPresent !== true
      )
    );

  const supported =
    input.assetVerified
    && input.variantNormalized === 'head'
    && input.jointNamesReadable
    && input.leftEyeJointCount === 1
    && input.rightEyeJointCount === 1
    && input.templateJointPositionsReadable
    && input.leftEyePositionFinite === true
    && input.rightEyePositionFinite === true
    && input.leftRightPositionsDistinct === true
    && input.requiredProviderGroupsReadable
    && input.requiredProviderGroupsPresent === true;

  const state: NeutralEarGnmCrossSourceWitnessStateFR104V1 =
    explicitRefutation
      ? 'gnm_direct_left_right_joint_witness_refuted'
      : supported
        ? 'gnm_direct_left_right_joint_witness_supported'
        : 'gnm_direct_left_right_joint_witness_unresolved';

  return Object.freeze({
    state,
    directSourceLeftEyeJointWitnessPresent:
      input.leftEyeJointCount === 1,
    directSourceRightEyeJointWitnessPresent:
      input.rightEyeJointCount === 1,
    jointPositionsUsableAsControlledAnchors:
      input.templateJointPositionsReadable
      && input.leftEyePositionFinite === true
      && input.rightEyePositionFinite === true
      && input.leftRightPositionsDistinct === true,
    providerGroupsAvailableForReferenceContext:
      input.requiredProviderGroupsReadable
      && input.requiredProviderGroupsPresent === true,
    imageSpaceXSignUsedAsSemanticAuthority: false,
    mediaPipeProviderLabelsUsedAsSemanticAuthority: false,
    gnmAxisOrderingUsedAsSemanticAuthority: false,
  });
}

const predecessor =
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-anatomical-witness-protocol-v1' as const,
    phase:
      'FR104_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_U5A_A' as const,
    studyKind:
      'cross_source_family_direct_source_semantic_witness_preregistration' as const,
    authorityState:
      'preregistered_source_witness_audit_not_executed' as const,

    predecessor: Object.freeze({
      u4bResultSha256: predecessor.resultSha256,
      u4bState: predecessor.state,
      prospectiveIndependentGeometryValidationExecuted:
        predecessor.authority
          .prospectiveIndependentGeometryValidationExecuted,
      prospectiveIndependentGeometryMappingValidated:
        predecessor.authority
          .prospectiveIndependentGeometryMappingValidated,
      u4bAdmissionMergeSha:
        '13cc0b15a166bfd98c76920cc82ea6146267a39a' as const,
    }),

    sourceAsset: Object.freeze({
      assetId: 'google-gnm-head-v3.0-fe31d4e' as const,
      repository: 'google/GNM' as const,
      upstreamCommit:
        'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690' as const,
      sourcePath:
        'gnm/shape/data/versions/v3_0/gnm_head.npz' as const,
      gitBlobSha:
        'ae49903ad7d50ce1d64e464a0407441f2781873c' as const,
      expectedByteLength: 53_305_389 as const,
      license: 'Apache-2.0' as const,
      sourceFamily: 'google_gnm_head' as const,
      sourceFamilyDistinctFromMakeHuman: true as const,
      sourceFamilyDistinctFromMediaPipe: true as const,
      alreadyPinnedByFr100: true as const,
    }),

    directSourceWitnesses: Object.freeze({
      dataSchema: Object.freeze({
        path: 'gnm/shape/gnm_data_schema.py' as const,
        gitBlobSha:
          '7e6caa3532a4b71ec8e41d02c67d4daf9ab8c38e' as const,
        establishes: Object.freeze([
          'joint_names_is_model_data_attribute',
          'template_joint_positions_is_model_data_attribute',
          'vertex_group_names_is_model_data_attribute',
        ] as const),
      }),
      numpyTests: Object.freeze({
        path: 'gnm/shape/gnm_numpy_test.py' as const,
        gitBlobSha:
          'a2a68e526bbe071c94bd4fdb240c837d36e13b85' as const,
        establishes: Object.freeze([
          'head_variant_directly_names_left_eye_joint',
          'head_variant_directly_names_right_eye_joint',
        ] as const),
        expectedHeadJointNames: Object.freeze([
          'left_eye',
          'right_eye',
        ] as const),
      }),
      dataLoader: Object.freeze({
        path: 'gnm/shape/gnm_data_loader.py' as const,
        gitBlobSha:
          'f00429a7afacccaa1ce123d66e98dcc21690e2db' as const,
        establishes: Object.freeze([
          'joint_names_are_standardized_source_attributes',
          'vertex_group_names_are_standardized_source_attributes',
        ] as const),
      }),
    }),

    frozenLiveAudit: Object.freeze({
      npzFetchAllowedInU5aA: false as const,
      npzFetchAllowedInU5aB: true as const,
      requiredKeys: Object.freeze([
        'version',
        'variant',
        'joint_names',
        'template_joint_positions',
        'vertex_group_names',
      ] as const),
      expectedVariantNormalized: 'head' as const,
      leftEyeJointName: 'left_eye' as const,
      rightEyeJointName: 'right_eye' as const,
      exactOccurrenceRequiredPerEyeJoint: 1 as const,
      requiredProviderGroups: Object.freeze([
        'ears',
        'left',
        'right',
      ] as const),
      jointPositionRequirements: Object.freeze({
        shapeLastDimension: 3 as const,
        finiteCoordinatesRequired: true as const,
        leftRightPositionsMustBeDistinct: true as const,
      }),
      imageSpaceXSignMayAssignSemanticSide: false as const,
      gnmAxisOrderingMayAssignSemanticSide: false as const,
      mediaPipeProviderLabelsMayAssignSemanticSide: false as const,
      gnmJointNamesMayServeAsDirectSourceSemanticWitness:
        true as const,
      ruleMayBeRetunedAfterLiveAudit: false as const,
    }),

    scientificStates: Object.freeze([
      'gnm_direct_left_right_joint_witness_supported',
      'gnm_direct_left_right_joint_witness_refuted',
      'gnm_direct_left_right_joint_witness_unresolved',
    ] as const),

    interpretationBoundary: Object.freeze({
      crossSourceFamilySemanticWitnessCandidate:
        true as const,
      crossSourceFamilyGeometricValidationExecuted:
        false as const,
      gnmDirectSourceJointNamingMayBeAudited:
        true as const,
      gnmJointNamingAlreadyAdmittedAsRuntimeMapping:
        false as const,
      providerLabelMappedToAnatomicalSide:
        false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      runtimeSubjectPhotoLateralityMayBeAuthorized:
        false as const,
      traditionalMeaningMayBeInferred:
        false as const,
    }),

    privacy: Object.freeze({
      userImageConsumed: false as const,
      cameraAccessed: false as const,
      rawProviderLandmarksReturned: false as const,
      rawProviderLandmarksPersisted: false as const,
      transformedRasterPersisted: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),

    authority: Object.freeze({
      gnmCrossSourceSemanticWitnessAudited:
        false as const,
      gnmCrossSourceGeometricValidationExecuted:
        false as const,
      providerLabelMappedToAnatomicalSide:
        false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      anatomicalReferenceAdmitted:
        false as const,
      anatomicalLateralityAuthorized:
        false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized:
        false as const,
      productionAuthorization: false as const,
    }),

    nextGate:
      'U5A_B_LIVE_PINNED_GNM_NPZ_SOURCE_SEMANTIC_WITNESS_AUDIT' as const,
  });
