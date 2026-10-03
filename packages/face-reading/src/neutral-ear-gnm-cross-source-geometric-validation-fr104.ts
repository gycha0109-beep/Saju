import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-anatomical-witness-empirical-evidence-fr104.js';

export type NeutralEarGNMCrossSourceGeometricCaseIdFR104V1 =
  | 'R0' | 'R90' | 'R180' | 'R270'
  | 'M0' | 'M90' | 'M180' | 'M270';

export type NeutralEarGNMCrossSourceGeometricStateFR104V1 =
  | 'gnm_cross_source_geometric_mapping_supported'
  | 'gnm_cross_source_geometric_mapping_refuted'
  | 'gnm_cross_source_geometric_mapping_unresolved';

export interface NeutralEarGNMCrossSourceGeometricObservationFR104V1 {
  readonly id: NeutralEarGNMCrossSourceGeometricCaseIdFR104V1;
  readonly available: boolean;
  readonly reflectionParity:
    | 'orientation_preserving'
    | 'orientation_reversing';
  readonly directCost: number | null;
  readonly swappedCost: number | null;
}

export interface NeutralEarGNMCrossSourceGeometricAssessmentFR104V1 {
  readonly state: NeutralEarGNMCrossSourceGeometricStateFR104V1;
  readonly evaluatedCaseIds:
    readonly NeutralEarGNMCrossSourceGeometricCaseIdFR104V1[];
  readonly unavailableCaseIds:
    readonly NeutralEarGNMCrossSourceGeometricCaseIdFR104V1[];
  readonly failedCaseIds:
    readonly NeutralEarGNMCrossSourceGeometricCaseIdFR104V1[];
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
    `FR-104 U5B GNM cross-source geometric validation ${message}`,
  );
}

function finiteCost(value: number | null, label: string): number {
  if (
    value === null
    || !Number.isFinite(value)
    || value < 0
  ) {
    fail(`${label} must be finite and non-negative when available.`);
  }
  return value;
}

export function assessNeutralEarGNMCrossSourceGeometricValidationFR104(
  observations:
    readonly NeutralEarGNMCrossSourceGeometricObservationFR104V1[],
): NeutralEarGNMCrossSourceGeometricAssessmentFR104V1 {
  if (observations.length !== CASE_IDS.length) {
    fail('requires exactly eight preregistered cases.');
  }

  const byId = new Map<
    NeutralEarGNMCrossSourceGeometricCaseIdFR104V1,
    NeutralEarGNMCrossSourceGeometricObservationFR104V1
  >();

  for (const item of observations) {
    if (!CASE_IDS.includes(item.id)) fail('contains an unknown case.');
    if (byId.has(item.id)) fail(`contains duplicate case ${item.id}.`);
    const expectedParity = item.id.startsWith('R')
      ? 'orientation_preserving'
      : 'orientation_reversing';
    if (item.reflectionParity !== expectedParity) {
      fail(`${item.id} reflection parity drift.`);
    }
    byId.set(item.id, item);
  }

  const evaluatedCaseIds:
    NeutralEarGNMCrossSourceGeometricCaseIdFR104V1[] = [];
  const unavailableCaseIds:
    NeutralEarGNMCrossSourceGeometricCaseIdFR104V1[] = [];
  const failedCaseIds:
    NeutralEarGNMCrossSourceGeometricCaseIdFR104V1[] = [];

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

  let state: NeutralEarGNMCrossSourceGeometricStateFR104V1 =
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

const u5a =
  NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-geometric-validation-protocol-v1' as const,
    phase:
      'FR104_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_U5B_A' as const,
    studyKind:
      'prospective_preregistered_cross_source_family_geometric_mapping_validation' as const,
    authorityState:
      'preregistered_no_u5b_gnm_render_or_provider_result_observed_or_admitted' as const,

    predecessor: Object.freeze({
      u5aResultSha256: u5a.resultSha256,
      u5aState: u5a.state,
      gnmCrossSourceSemanticWitnessAudited:
        u5a.authority.gnmCrossSourceSemanticWitnessAudited,
      crossSourceFamilyGeometricValidationExecuted:
        u5a.interpretation.crossSourceFamilyGeometricValidationExecuted,
      candidateMergeSha: u5a.candidateMergeSha,
    }),

    sourceAsset: Object.freeze({
      repository: u5a.sourceAsset.repository,
      upstreamCommit: u5a.sourceAsset.upstreamCommit,
      sourcePath: u5a.sourceAsset.sourcePath,
      gitBlobSha: u5a.sourceAsset.gitBlobSha,
      byteLength: u5a.sourceAsset.byteLength,
      versionNormalized: u5a.sourceAsset.versionNormalized,
      variantNormalized: u5a.sourceAsset.variantNormalized,
      manifestPath:
        'packages/face-geometry/assets/full-head/gnm-head-v3.manifest.json' as const,
      manifestGitBlobSha:
        'a0dfa14b8e79f7474e38be8ddeb77e40b1b24c64' as const,
      requiredArrays: Object.freeze([
        'template_vertex_positions',
        'triangles',
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

    anatomicalGroundTruth: Object.freeze({
      sourceKind:
        'direct_gnm_source_named_template_eye_joints' as const,
      leftEye: Object.freeze({
        jointName:
          u5a.directSourceSemanticWitness.leftEye.jointName,
        jointIndex:
          u5a.directSourceSemanticWitness.leftEye.jointIndex,
        templateJointPosition:
          u5a.directSourceSemanticWitness.leftEye.templateJointPosition,
      }),
      rightEye: Object.freeze({
        jointName:
          u5a.directSourceSemanticWitness.rightEye.jointName,
        jointIndex:
          u5a.directSourceSemanticWitness.rightEye.jointIndex,
        templateJointPosition:
          u5a.directSourceSemanticWitness.rightEye.templateJointPosition,
      }),
      semanticAuthority:
        'exact_gnm_joint_names_only' as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
      gnmAxisOrderingDefinesAnatomicalSide: false as const,
      providerLabelsDefineAnatomicalSide: false as const,
      projectedByExactFixtureCamera: true as const,
    }),

    renderer: Object.freeze({
      implementation:
        'fr104_bounded_cpu_triangle_rasterizer_v1_gnm_template' as const,
      outputFormat: 'PNG' as const,
      pngColorType: 'rgb8' as const,
      width: 1024 as const,
      height: 1024 as const,
      geometry:
        'exact_template_vertex_positions_and_triangles' as const,
      cameraPolicyInheritedFrom: Object.freeze({
        path:
          'tools/face-geometry/gnm/build_gnm_region_ontology_scene.py' as const,
        gitBlobSha:
          '0050da03e9534cf31962d5fe2d9c851b3012fde5' as const,
        evidenceRole:
          'preexisting_provider_blind_gnm_front_camera_geometry_policy' as const,
      }),
      camera: Object.freeze({
        projectionModel: 'orthographic' as const,
        centerRule:
          'template_axis_aligned_bounds_midpoint' as const,
        frontLocationRule:
          'bounds_center_plus_0_0_max_0_65_span_z_times_2_8' as const,
        orthographicScaleRule:
          'max_span_y_times_1_24_span_x_times_1_34' as const,
        canonicalUpAxis: '+Y' as const,
        canonicalFrontCameraSide: '+Z' as const,
        cameraLooksTowardBoundsCenter: true as const,
        rollDegrees: 0 as const,
      }),
      rasterization: Object.freeze({
        triangleOrder:
          'exact_npz_triangles_array_order' as const,
        zBufferRequired: true as const,
        pixelSampleLocation:
          'pixel_center_x_plus_0_5_y_plus_0_5' as const,
        edgeInclusionTolerance: 1e-12 as const,
      }),
      appearance: Object.freeze({
        textureUsed: false as const,
        sourceImageUsed: false as const,
        material:
          'single_neutral_surface_material' as const,
        lighting:
          'symmetric_camera_frontal_flat_lambert_ambient_0_35_diffuse_0_65' as const,
        background:
          'constant_rgb_32_32_32' as const,
      }),
      postRenderCropApplied: false as const,
      postRenderResizeApplied: false as const,
      postRenderRotationApplied: false as const,
      postRenderHorizontalMirrorApplied: false as const,
      repeatedRenderByteEqualityRequired: true as const,
      renderedFixtureSha256: null as null,
      npzFetchAllowedInU5bA: false as const,
      renderMayExecuteInU5bA: false as const,
    }),

    providerRuntime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
      expectedLandmarkCount: 478 as const,
      providerEyeTopology:
        'FR24_EYE_TOPOLOGY_WITNESS_EDGES_unique_sorted_vertices_centroid_xy' as const,
      providerEyeLabels:
        Object.freeze([
          'FACE_LANDMARKS_LEFT_EYE',
          'FACE_LANDMARKS_RIGHT_EYE',
        ] as const),
      providerEyeLabelsCarryAnatomicalAuthority: false as const,
      providerExecutionAllowedInU5bA: false as const,
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
      mirrorFamilyPreservedDuringRotationNormalization: true as const,
      orientationPreservingRule:
        'directCost_strictly_less_than_swappedCost' as const,
      orientationReversingRule:
        'swappedCost_strictly_less_than_directCost' as const,
      directCost:
        'd(providerLeft,gnmAnatomicalLeft)+d(providerRight,gnmAnatomicalRight)' as const,
      swappedCost:
        'd(providerLeft,gnmAnatomicalRight)+d(providerRight,gnmAnatomicalLeft)' as const,
      numericAcceptanceThresholdAuthorized: false as const,
      everyAvailableCaseMustSatisfyItsReflectionParityRule: true as const,
      allEightCasesRequiredForSupportedState: true as const,
      aggregateOverrideAuthorized: false as const,
      ruleMayBeRetunedAfterObservation: false as const,
      cameraMayBeRetunedAfterRenderObservation: false as const,
      rendererMayBeRetunedAfterProviderObservation: false as const,
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

    scientificStates: Object.freeze([
      'gnm_cross_source_geometric_mapping_supported',
      'gnm_cross_source_geometric_mapping_refuted',
      'gnm_cross_source_geometric_mapping_unresolved',
    ] as const),

    interpretationBoundary: Object.freeze({
      sourceFamilyIndependentFromU4aMakeHuman: true as const,
      sourceFamilyIndependentFromU4bMakeHuman: true as const,
      sourceFamilyIndependentFromMediaPipe: true as const,
      directGNMSemanticWitnessAlreadyAudited: true as const,
      crossSourceFamilyGeometricValidationExecuted: false as const,
      providerPublishedSideNamesUsedAsAnatomicalAuthority: false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority: false as const,
      gnmAxisOrderingUsedAsAnatomicalAuthority: false as const,
      globalProviderAnatomicalSemanticsMayBeEstablished: false as const,
      runtimeSubjectPhotoLateralityMayBeAuthorized: false as const,
      traditionalMeaningMayBeInferred: false as const,
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
      gnmCrossSourceGeometricValidationExecuted: false as const,
      gnmCrossSourceGeometricMappingValidated: false as const,
      u5bFixtureDigestPinned: false as const,
      providerLabelMappedToAnatomicalSide: false as const,
      globalProviderAnatomicalSemanticsEstablished: false as const,
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    nextGate:
      'U5B_B_RENDER_ONLY_PIN_GNM_FIXTURE_AND_PROJECTED_GROUND_TRUTH_WITHOUT_PROVIDER_EXECUTION' as const,
  });
