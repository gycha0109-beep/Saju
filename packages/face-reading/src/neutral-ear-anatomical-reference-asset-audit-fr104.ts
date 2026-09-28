export type NeutralEarAnatomicalReferenceCandidateStateFR104V1 =
  | 'admissible_independent_anatomical_reference'
  | 'usable_for_diagnostic_only'
  | 'source_axis_ambiguous'
  | 'license_not_admissible'
  | 'provider_cannot_detect_face'
  | 'unavailable';

export interface NeutralEarAnatomicalReferenceCandidateFR104V1 {
  readonly candidateRef: string;
  readonly sourceFamily:
    | 'makehuman'
    | 'khronos_gltf_sample_assets'
    | 'mediapipe_provider_family';
  readonly state:
    NeutralEarAnatomicalReferenceCandidateStateFR104V1;
  readonly source: {
    readonly repository: string;
    readonly commit: string;
    readonly primaryPath: string;
    readonly primaryBlobSha: string;
  };
  readonly license: {
    readonly expression: string;
    readonly directWitnessPath: string;
    readonly directWitnessBlobSha: string;
    readonly projectPolicyAdmissible: boolean;
  };
  readonly anatomicalGroundTruth: {
    readonly independentFromMediaPipeProvider: boolean;
    readonly explicitLeftRightNamedAnchors: boolean;
    readonly explicitEyeCentersOrEyeJoints: boolean;
    readonly leftRightAxisDefinitionDirectlyWitnessed: boolean;
    readonly providerLabelDerived: false;
  };
  readonly providerPreflight: {
    readonly exactlyOneFaceVerified: boolean;
    readonly exactRuntime:
      '@mediapipe/tasks-vision@0.10.35';
  };
  readonly admissionBlockers: readonly string[];
}

export const NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-anatomical-reference-asset-audit-v1' as const,
    authorityState:
      'no_anatomical_reference_admitted_primary_preflight_candidate_selected' as const,

    candidates: Object.freeze([
      Object.freeze({
        candidateRef:
          'makehuman_default_cc0_head_reference' as const,
        sourceFamily: 'makehuman' as const,
        state: 'usable_for_diagnostic_only' as const,
        source: Object.freeze({
          repository:
            'makehumancommunity/makehuman' as const,
          commit:
            'a8bc2d54ff0ac92e78ff71431b1023eda42bf482' as const,
          primaryPath:
            'makehuman/data/3dobjs/base.obj' as const,
          primaryBlobSha:
            'd26635e9326e3cca30778fd7b9c00062b03cce09' as const,
        }),
        license: Object.freeze({
          expression: 'CC0-1.0 bundled assets' as const,
          directWitnessPath: 'LICENSE.md' as const,
          directWitnessBlobSha:
            '5d1a49d31ebdaa46b06c52eae2c005c678a63ffa' as const,
          projectPolicyAdmissible: true as const,
        }),
        anatomicalGroundTruth: Object.freeze({
          independentFromMediaPipeProvider: true as const,
          explicitLeftRightNamedAnchors: true as const,
          explicitEyeCentersOrEyeJoints: true as const,
          leftRightAxisDefinitionDirectlyWitnessed:
            true as const,
          providerLabelDerived: false as const,
        }),
        anatomicalWitnesses: Object.freeze({
          defaultSkeleton: Object.freeze({
            path:
              'makehuman/data/rigs/default.mhskel' as const,
            blobSha:
              'b02cbecae00143856410d7561adf006d83bf9b3e' as const,
            leftEyeBone: 'eye.L' as const,
            rightEyeBone: 'eye.R' as const,
          }),
          headAxisDefinition: Object.freeze({
            path:
              'makehuman/data/povray/makehuman_hair.inc' as const,
            blobSha:
              'c017181d4d6d948833952fe6523e8798cc2c39c2' as const,
            leftEyeJointSymbol:
              'MakeHuman_joint_l_eye' as const,
            rightEyeJointSymbol:
              'MakeHuman_joint_r_eye' as const,
            leftRightVectorExpression:
              'vnormalize(MakeHuman_joint_r_eye-MakeHuman_joint_l_eye)' as const,
          }),
          highPolyEyeAsset: Object.freeze({
            objectPath:
              'makehuman/data/eyes/high-poly/high-poly.obj' as const,
            objectBlobSha:
              '01562a9caf4dca9ebb1fd5c24db083c17e724330' as const,
            proxyPath:
              'makehuman/data/eyes/high-poly/high-poly.mhclo' as const,
            proxyBlobSha:
              '22bc5f77f398c59088804f7f4c9bb0e39d38661d' as const,
          }),
        }),
        providerPreflight: Object.freeze({
          exactlyOneFaceVerified: false as const,
          exactRuntime:
            '@mediapipe/tasks-vision@0.10.35' as const,
        }),
        admissionBlockers: Object.freeze([
          'deterministic_render_pipeline_not_yet_executed',
          'provider_exactly_one_face_detectability_not_yet_verified',
          'rendered_fixture_digest_not_yet_pinned',
        ] as const),
      }),
      Object.freeze({
        candidateRef:
          'khronos_cesium_man' as const,
        sourceFamily:
          'khronos_gltf_sample_assets' as const,
        state: 'source_axis_ambiguous' as const,
        source: Object.freeze({
          repository:
            'KhronosGroup/glTF-Sample-Assets' as const,
          commit:
            'f36bfdabd1031c3cf6689a50570b8cdf3678b49c' as const,
          primaryPath:
            'Models/CesiumMan/glTF/CesiumMan.gltf' as const,
          primaryBlobSha:
            'f474e54a73329809726566a139861ac65884b830' as const,
        }),
        license: Object.freeze({
          expression:
            'CC-BY-4.0 with separate Cesium legal-mark terms' as const,
          directWitnessPath:
            'Models/CesiumMan/metadata.json' as const,
          directWitnessBlobSha:
            'ee8fbeabbe5bd24573b1f584553bdc548b0a42e9' as const,
          projectPolicyAdmissible: true as const,
        }),
        anatomicalGroundTruth: Object.freeze({
          independentFromMediaPipeProvider: true as const,
          explicitLeftRightNamedAnchors: true as const,
          explicitEyeCentersOrEyeJoints: false as const,
          leftRightAxisDefinitionDirectlyWitnessed:
            false as const,
          providerLabelDerived: false as const,
        }),
        providerPreflight: Object.freeze({
          exactlyOneFaceVerified: false as const,
          exactRuntime:
            '@mediapipe/tasks-vision@0.10.35' as const,
        }),
        admissionBlockers: Object.freeze([
          'left_right_body_joint_names_exist_but_no_governed_eye_center_anchor_is_pinned',
          'head_left_right_axis_definition_not_directly_witnessed',
          'provider_exactly_one_face_detectability_not_yet_verified',
        ] as const),
      }),
      Object.freeze({
        candidateRef:
          'mediapipe_canonical_face_model' as const,
        sourceFamily:
          'mediapipe_provider_family' as const,
        state: 'usable_for_diagnostic_only' as const,
        source: Object.freeze({
          repository:
            'google-ai-edge/mediapipe' as const,
          commit:
            'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
          primaryPath:
            'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj' as const,
          primaryBlobSha:
            '0e666d1c4e75949d1639c2bcf347a38da4834164' as const,
        }),
        license: Object.freeze({
          expression: 'Apache-2.0' as const,
          directWitnessPath:
            'mediapipe/tasks/cc/vision/face_geometry/data/BUILD' as const,
          directWitnessBlobSha:
            'a7085f3dbecdf04ec3042855e20dfe52b417ab48' as const,
          projectPolicyAdmissible: true as const,
        }),
        anatomicalGroundTruth: Object.freeze({
          independentFromMediaPipeProvider: false as const,
          explicitLeftRightNamedAnchors: false as const,
          explicitEyeCentersOrEyeJoints: false as const,
          leftRightAxisDefinitionDirectlyWitnessed:
            false as const,
          providerLabelDerived: false as const,
        }),
        providerPreflight: Object.freeze({
          exactlyOneFaceVerified: false as const,
          exactRuntime:
            '@mediapipe/tasks-vision@0.10.35' as const,
        }),
        admissionBlockers: Object.freeze([
          'provider_family_reference_is_not_independent_anatomical_ground_truth',
          'phase_r_exact_release_side_semantics_remain_conflicting_or_ambiguous',
        ] as const),
      }),
      Object.freeze({
        candidateRef:
          'khronos_brainstem_poser_asset' as const,
        sourceFamily:
          'khronos_gltf_sample_assets' as const,
        state: 'license_not_admissible' as const,
        source: Object.freeze({
          repository:
            'KhronosGroup/glTF-Sample-Assets' as const,
          commit:
            'f36bfdabd1031c3cf6689a50570b8cdf3678b49c' as const,
          primaryPath:
            'Models/BrainStem/metadata.json' as const,
          primaryBlobSha:
            '3d4bf3926a85a76028efe6ceae6a59270327209c' as const,
        }),
        license: Object.freeze({
          expression: 'LicenseRef-Poser-EULA' as const,
          directWitnessPath:
            'LICENSES/LicenseRef-Poser-EULA.txt' as const,
          directWitnessBlobSha:
            '149fd397b8496a7fc67b1e3ddacae59d804e3896' as const,
          projectPolicyAdmissible: false as const,
        }),
        anatomicalGroundTruth: Object.freeze({
          independentFromMediaPipeProvider: true as const,
          explicitLeftRightNamedAnchors: false as const,
          explicitEyeCentersOrEyeJoints: false as const,
          leftRightAxisDefinitionDirectlyWitnessed:
            false as const,
          providerLabelDerived: false as const,
        }),
        providerPreflight: Object.freeze({
          exactlyOneFaceVerified: false as const,
          exactRuntime:
            '@mediapipe/tasks-vision@0.10.35' as const,
        }),
        admissionBlockers: Object.freeze([
          'project_policy_rejects_restricted_poser_eula_asset_as_canonical_anatomical_reference',
        ] as const),
      }),
    ]),

    decision: Object.freeze({
      admittedCandidateCount: 0 as const,
      primaryPreflightCandidateRef:
        'makehuman_default_cc0_head_reference' as const,
      primaryCandidateReason:
        'independent CC0 asset family with explicit left/right eye joints and a direct left-right head vector definition' as const,
      primaryCandidateMayBeCalledAdmitted:
        false as const,
      requiredBeforeAdmission: Object.freeze([
        'execute_deterministic_makehuman_render_protocol',
        'pin_rendered_fixture_digest',
        'verify_exactly_one_face_under_face_landmarker_0_10_35',
        'verify_anatomical_eye_projection_is_derived_only_from_makehuman_source_anchors',
      ] as const),
      anatomicalMappingMayProceed:
        false as const,
      nextGate:
        'execute U1 deterministic MakeHuman render preflight; admit only after exact fixture digest and one-face provider detectability are verified' as const,
    }),

    authority: Object.freeze({
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  } satisfies {
    readonly schemaVersion:
      'fr104-neutral-ear-anatomical-reference-asset-audit-v1';
    readonly authorityState:
      'no_anatomical_reference_admitted_primary_preflight_candidate_selected';
    readonly candidates:
      readonly NeutralEarAnatomicalReferenceCandidateFR104V1[];
    readonly decision: object;
    readonly authority: object;
  });
