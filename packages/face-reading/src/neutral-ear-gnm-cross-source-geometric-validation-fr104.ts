import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-anatomical-witness-empirical-evidence-fr104.js';

export type NeutralEarGnmCrossSourceGeometryCaseIdFR104V1 =
  | 'R0' | 'R90' | 'R180' | 'R270'
  | 'M0' | 'M90' | 'M180' | 'M270';

export type NeutralEarGnmCrossSourceGeometryStateFR104V1 =
  | 'gnm_cross_source_geometric_mapping_supported'
  | 'gnm_cross_source_geometric_mapping_refuted'
  | 'gnm_cross_source_geometric_mapping_unresolved';

export interface NeutralEarGnmCrossSourceGeometryObservationFR104V1 {
  readonly id: NeutralEarGnmCrossSourceGeometryCaseIdFR104V1;
  readonly available: boolean;
  readonly reflectionParity:
    | 'orientation_preserving'
    | 'orientation_reversing';
  readonly directCost: number | null;
  readonly swappedCost: number | null;
}

export interface NeutralEarGnmCrossSourceGeometryAssessmentFR104V1 {
  readonly state: NeutralEarGnmCrossSourceGeometryStateFR104V1;
  readonly evaluatedCaseIds:
    readonly NeutralEarGnmCrossSourceGeometryCaseIdFR104V1[];
  readonly unavailableCaseIds:
    readonly NeutralEarGnmCrossSourceGeometryCaseIdFR104V1[];
  readonly failedCaseIds:
    readonly NeutralEarGnmCrossSourceGeometryCaseIdFR104V1[];
  readonly orientationPreservingDirectForEveryAvailableCase: boolean;
  readonly orientationReversingSwappedForEveryAvailableCase: boolean;
  readonly allEightCasesAvailable: boolean;
  readonly numericAcceptanceThresholdApplied: false;
  readonly aggregateOverrideApplied: false;
  readonly providerPublishedSideNamesUsedAsAnatomicalAuthority: false;
  readonly imageSpaceXSignUsedAsAnatomicalAuthority: false;
  readonly gnmAxisOrderingUsedAsAnatomicalAuthority: false;
}

const CASE_IDS = Object.freeze([
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U5B GNM cross-source geometry ${message}`,
  );
}

function finiteCost(value: number | null, label: string): number {
  if (value === null || !Number.isFinite(value) || value < 0) {
    fail(`${label} must be finite and non-negative when available.`);
  }
  return value;
}

export function assessNeutralEarGnmCrossSourceGeometryFR104(
  observations:
    readonly NeutralEarGnmCrossSourceGeometryObservationFR104V1[],
): NeutralEarGnmCrossSourceGeometryAssessmentFR104V1 {
  if (observations.length !== CASE_IDS.length) {
    fail('requires exactly eight cases.');
  }

  const byId = new Map<
    NeutralEarGnmCrossSourceGeometryCaseIdFR104V1,
    NeutralEarGnmCrossSourceGeometryObservationFR104V1
  >();

  for (const item of observations) {
    if (!CASE_IDS.includes(item.id)) {
      fail('contains an unknown case.');
    }
    if (byId.has(item.id)) {
      fail(`contains duplicate case ${item.id}.`);
    }
    const expectedParity = item.id.startsWith('R')
      ? 'orientation_preserving'
      : 'orientation_reversing';
    if (item.reflectionParity !== expectedParity) {
      fail(`${item.id} reflection parity drift.`);
    }
    byId.set(item.id, item);
  }

  const evaluatedCaseIds:
    NeutralEarGnmCrossSourceGeometryCaseIdFR104V1[] = [];
  const unavailableCaseIds:
    NeutralEarGnmCrossSourceGeometryCaseIdFR104V1[] = [];
  const failedCaseIds:
    NeutralEarGnmCrossSourceGeometryCaseIdFR104V1[] = [];
  let preservingPass = true;
  let reversingPass = true;

  for (const id of CASE_IDS) {
    const item = byId.get(id);
    if (item === undefined) fail(`is missing case ${id}.`);

    if (!item.available) {
      if (item.directCost !== null || item.swappedCost !== null) {
        fail(`${id} unavailable case must not carry costs.`);
      }
      unavailableCaseIds.push(id);
      continue;
    }

    const direct = finiteCost(item.directCost, `${id}.directCost`);
    const swapped = finiteCost(item.swappedCost, `${id}.swappedCost`);
    evaluatedCaseIds.push(id);

    const preserving =
      item.reflectionParity === 'orientation_preserving';
    const passes = preserving
      ? direct < swapped
      : swapped < direct;

    if (!passes) failedCaseIds.push(id);
    if (preserving && !passes) preservingPass = false;
    if (!preserving && !passes) reversingPass = false;
  }

  let state: NeutralEarGnmCrossSourceGeometryStateFR104V1 =
    'gnm_cross_source_geometric_mapping_unresolved';
  if (failedCaseIds.length > 0) {
    state = 'gnm_cross_source_geometric_mapping_refuted';
  } else if (
    unavailableCaseIds.length === 0
    && evaluatedCaseIds.length === CASE_IDS.length
  ) {
    state = 'gnm_cross_source_geometric_mapping_supported';
  }

  return Object.freeze({
    state,
    evaluatedCaseIds: Object.freeze([...evaluatedCaseIds]),
    unavailableCaseIds: Object.freeze([...unavailableCaseIds]),
    failedCaseIds: Object.freeze([...failedCaseIds]),
    orientationPreservingDirectForEveryAvailableCase: preservingPass,
    orientationReversingSwappedForEveryAvailableCase: reversingPass,
    allEightCasesAvailable: unavailableCaseIds.length === 0,
    numericAcceptanceThresholdApplied: false,
    aggregateOverrideApplied: false,
    providerPublishedSideNamesUsedAsAnatomicalAuthority: false,
    imageSpaceXSignUsedAsAnatomicalAuthority: false,
    gnmAxisOrderingUsedAsAnatomicalAuthority: false,
  });
}

const predecessor =
  NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-geometric-validation-protocol-v1' as const,
    phase:
      'FR104_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_U5B_A' as const,
    studyKind:
      'prospective_preregistered_cross_source_family_geometric_validation' as const,
    authorityState:
      'preregistered_no_u5b_render_or_provider_result_observed_or_admitted' as const,

    predecessor: Object.freeze({
      u5aResultSha256: predecessor.resultSha256,
      u5aState: predecessor.state,
      gnmCrossSourceSemanticWitnessAudited:
        predecessor.authority.gnmCrossSourceSemanticWitnessAudited,
      u5aAdmissionMergeSha:
        '1abdec05f7c0204d25503b4400fdd487a187d548' as const,
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
      expectedVariantNormalized: 'head' as const,
      sourceFamily: 'google_gnm_head' as const,
      sourceFamilyDistinctFromMakeHuman: true as const,
      sourceFamilyDistinctFromMediaPipe: true as const,
      requiredGeometryArrays: Object.freeze([
        'template_vertex_positions',
        'triangles',
      ] as const),
      requiredSemanticArrays: Object.freeze([
        'joint_names',
        'template_joint_positions',
      ] as const),
      coordinateConvention: Object.freeze({
        handedness: 'right-handed' as const,
        upAxis: '+Y' as const,
        forwardAxis: '+Z' as const,
        unit: 'meter' as const,
      }),
    }),

    semanticGroundTruth: Object.freeze({
      anatomicalLeftEye: Object.freeze({
        sourceJointName: 'left_eye' as const,
        sourceJointIndex: 2 as const,
        sourcePoint: predecessor.directSourceSemanticWitness.leftEye
          .templateJointPosition,
      }),
      anatomicalRightEye: Object.freeze({
        sourceJointName: 'right_eye' as const,
        sourceJointIndex: 3 as const,
        sourcePoint: predecessor.directSourceSemanticWitness.rightEye
          .templateJointPosition,
      }),
      semanticAuthority:
        'direct_gnm_source_joint_names_only' as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
      gnmAxisOrderingDefinesAnatomicalSide: false as const,
    }),

    prospectiveFixture: Object.freeze({
      renderedFixtureSha256: null as null,
      renderMayExecuteInU5bA: false as const,
      providerMayExecuteInU5bA: false as const,
      targetRenderMayBeObservedInU5bA: false as const,
      providerResultMayBeObservedInU5bA: false as const,
      fixtureGeometry:
        'exact_pinned_gnm_template_vertex_positions_and_triangles' as const,
      sourceFamilyIndependentFromU4aAndU4bMakeHuman:
        true as const,
      sourceFamilyIndependentFromMediaPipe:
        true as const,
      ruleOrCameraMayBeRetunedAfterU5bObservation:
        false as const,
    }),

    renderer: Object.freeze({
      implementation:
        'fr104_bounded_cpu_triangle_rasterizer_v2_gnm_template' as const,
      dependencySurface: 'node_builtin_plus_pinned_npz_decode_stage' as const,
      outputFormat: 'PNG' as const,
      pngColorType: 'rgb8' as const,
      width: 1024 as const,
      height: 1024 as const,
      geometrySource:
        'template_vertex_positions_plus_triangles' as const,
      materialRgb: Object.freeze([198, 151, 127] as const),
      backgroundRgb: Object.freeze([32, 32, 32] as const),
      lightingRule:
        'symmetric_camera_frontal_flat_lambert_ambient_0_35_diffuse_0_65' as const,
      camera: Object.freeze({
        projectionModel: 'orthographic' as const,
        centerRule:
          'full_gnm_template_xyz_bounds_midpoint' as const,
        viewDirection:
          'camera_on_positive_z_looking_toward_bounds_center' as const,
        screenRightAxis: '+X' as const,
        screenUpAxis: '+Y' as const,
        framingWitnessPath:
          'tools/face-geometry/gnm/build_gnm_head_scene.py' as const,
        spanRule:
          'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)' as const,
        framingRuleReusedFromExistingGnmHeadScene:
          true as const,
      }),
      postRenderCropApplied: false as const,
      postRenderResizeApplied: false as const,
      postRenderRotationApplied: false as const,
      postRenderHorizontalMirrorApplied: false as const,
      exifTransformApplied: false as const,
    }),

    projectedGroundTruth: Object.freeze({
      exactSameCameraAsRenderedFixtureRequired: true as const,
      directVsMatrixProjectionParityRequired: true as const,
      projectedAnchorsMustBeFiniteAndInsideNormalizedFrame:
        true as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
      gnmAxisOrderingDefinesAnatomicalSide: false as const,
    }),

    providerRuntime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
      expectedLandmarkCount: 478 as const,
      providerExecutionAllowedInU5bA: false as const,
      providerEyeExtraction: Object.freeze({
        topologyWitness:
          'FR24_EYE_TOPOLOGY_WITNESS_EDGES' as const,
        providerLeftSymbol:
          'FACE_LANDMARKS_LEFT_EYE' as const,
        providerRightSymbol:
          'FACE_LANDMARKS_RIGHT_EYE' as const,
        centroidRule:
          'mean_xy_of_unique_vertices_from_existing_edge_set' as const,
        newLandmarkSelectionAuthorized: false as const,
        providerSymbolNamesAreAnatomicalAuthority:
          false as const,
      }),
    }),

    transformOrder:
      'horizontal_mirror_then_clockwise_physical_rotation' as const,

    frozenRule: Object.freeze({
      providerInferenceCompensation:
        'rotationDegrees_equals_inverse_physical_rotation' as const,
      returnedProviderCoordinateNormalization:
        'explicit_inverse_physical_rotation' as const,
      anatomicalGroundTruthCoordinateNormalization:
        'explicit_inverse_physical_rotation' as const,
      mirrorSemanticIdentityRule:
        'mirror_changes_screen_coordinate_but_does_not_swap_anatomical_identity' as const,
      orientationPreservingRule:
        'directCost_strictly_less_than_swappedCost' as const,
      orientationReversingRule:
        'swappedCost_strictly_less_than_directCost' as const,
      numericAcceptanceThresholdAuthorized: false as const,
      everyAvailableCaseMustSatisfyItsReflectionParityRule:
        true as const,
      aggregateOverrideAuthorized: false as const,
      ruleMayBeRetunedAfterProspectiveObservation:
        false as const,
    }),

    cases: Object.freeze([
      Object.freeze({
        id:'R0', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:0,
        compensationDegrees:0,
        reflectionParity:'orientation_preserving',
      }),
      Object.freeze({
        id:'R90', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:90,
        compensationDegrees:270,
        reflectionParity:'orientation_preserving',
      }),
      Object.freeze({
        id:'R180', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:180,
        compensationDegrees:180,
        reflectionParity:'orientation_preserving',
      }),
      Object.freeze({
        id:'R270', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:270,
        compensationDegrees:90,
        reflectionParity:'orientation_preserving',
      }),
      Object.freeze({
        id:'M0', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:0,
        compensationDegrees:0,
        reflectionParity:'orientation_reversing',
      }),
      Object.freeze({
        id:'M90', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:90,
        compensationDegrees:270,
        reflectionParity:'orientation_reversing',
      }),
      Object.freeze({
        id:'M180', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:180,
        compensationDegrees:180,
        reflectionParity:'orientation_reversing',
      }),
      Object.freeze({
        id:'M270', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:270,
        compensationDegrees:90,
        reflectionParity:'orientation_reversing',
      }),
    ] as const),

    failClosedConditions: Object.freeze([
      'source_asset_provenance_or_digest_drift',
      'variant_not_head',
      'malformed_or_nonfinite_geometry',
      'triangle_index_out_of_range',
      'u5a_semantic_eye_anchor_drift',
      'degenerate_full_template_bounds',
      'projected_anchor_outside_normalized_frame',
      'repeat_render_byte_mismatch',
      'pinned_render_sha_mismatch',
      'provider_face_count_not_exactly_one',
      'provider_landmark_count_not_478',
      'invalid_normalized_provider_point',
      'unknown_registered_transform',
      'missing_or_duplicate_case',
      'reflection_parity_drift',
      'unavailable_case_carries_costs',
      'post_observation_rule_or_camera_retune',
    ] as const),

    scientificStates: Object.freeze([
      'gnm_cross_source_geometric_mapping_supported',
      'gnm_cross_source_geometric_mapping_refuted',
      'gnm_cross_source_geometric_mapping_unresolved',
    ] as const),

    interpretationBoundary: Object.freeze({
      crossSourceFamilySemanticWitnessAdmitted:
        true as const,
      crossSourceFamilyGeometricValidationExecuted:
        false as const,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        false as const,
      gnmAxisOrderingUsedAsAnatomicalAuthority:
        false as const,
      globalProviderAnatomicalSemanticsMayBeEstablished:
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
      gnmCrossSourceSemanticWitnessAudited: true as const,
      gnmCrossSourceGeometricValidationExecuted:
        false as const,
      gnmCrossSourceGeometricMappingValidated:
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
      'U5B_B_RENDER_ONLY_PIN_GNM_CROSS_SOURCE_FIXTURE_DIGEST_WITHOUT_PROVIDER_EXECUTION' as const,
  });
