import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-controlled-anatomical-side-mapping-empirical-evidence-fr104.js';

export type NeutralEarProspectiveIndependentGeometryCaseIdFR104V1 =
  | 'R0' | 'R90' | 'R180' | 'R270'
  | 'M0' | 'M90' | 'M180' | 'M270';

export type NeutralEarProspectiveIndependentGeometryStateFR104V1 =
  | 'prospective_independent_geometry_mapping_supported'
  | 'prospective_independent_geometry_mapping_refuted'
  | 'prospective_independent_geometry_mapping_unresolved';

export interface NeutralEarProspectiveIndependentGeometryObservationFR104V1 {
  readonly id: NeutralEarProspectiveIndependentGeometryCaseIdFR104V1;
  readonly available: boolean;
  readonly reflectionParity:
    | 'orientation_preserving'
    | 'orientation_reversing';
  readonly directCost: number | null;
  readonly swappedCost: number | null;
}

export interface NeutralEarProspectiveIndependentGeometryAssessmentFR104V1 {
  readonly state:
    NeutralEarProspectiveIndependentGeometryStateFR104V1;
  readonly evaluatedCaseIds:
    readonly NeutralEarProspectiveIndependentGeometryCaseIdFR104V1[];
  readonly unavailableCaseIds:
    readonly NeutralEarProspectiveIndependentGeometryCaseIdFR104V1[];
  readonly failedCaseIds:
    readonly NeutralEarProspectiveIndependentGeometryCaseIdFR104V1[];
  readonly orientationPreservingDirectForEveryAvailableCase: boolean;
  readonly orientationReversingSwappedForEveryAvailableCase: boolean;
  readonly allEightCasesAvailable: boolean;
  readonly numericAcceptanceThresholdApplied: false;
  readonly providerPublishedSideNamesUsedAsAnatomicalAuthority: false;
  readonly imageSpaceXSignUsedAsAnatomicalAuthority: false;
}

const CASE_IDS = Object.freeze([
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U4B prospective independent geometry ${message}`,
  );
}

function finiteCost(
  value: number | null,
  label: string,
): number {
  if (
    value === null
    || !Number.isFinite(value)
    || value < 0
  ) {
    fail(`${label} must be finite and non-negative when available.`);
  }
  return value;
}

export function assessNeutralEarProspectiveIndependentGeometryFR104(
  observations:
    readonly NeutralEarProspectiveIndependentGeometryObservationFR104V1[],
): NeutralEarProspectiveIndependentGeometryAssessmentFR104V1 {
  if (observations.length !== CASE_IDS.length) {
    fail('requires exactly eight cases.');
  }

  const byId = new Map<
    NeutralEarProspectiveIndependentGeometryCaseIdFR104V1,
    NeutralEarProspectiveIndependentGeometryObservationFR104V1
  >();

  for (const item of observations) {
    if (!CASE_IDS.includes(item.id)) {
      fail('contains an unknown case.');
    }
    if (byId.has(item.id)) {
      fail(`contains duplicate case ${item.id}.`);
    }
    const expectedParity =
      item.id.startsWith('R')
        ? 'orientation_preserving'
        : 'orientation_reversing';
    if (item.reflectionParity !== expectedParity) {
      fail(`${item.id} reflection parity drift.`);
    }
    byId.set(item.id, item);
  }

  const evaluatedCaseIds:
    NeutralEarProspectiveIndependentGeometryCaseIdFR104V1[] = [];
  const unavailableCaseIds:
    NeutralEarProspectiveIndependentGeometryCaseIdFR104V1[] = [];
  const failedCaseIds:
    NeutralEarProspectiveIndependentGeometryCaseIdFR104V1[] = [];

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

  let state:
    NeutralEarProspectiveIndependentGeometryStateFR104V1 =
      'prospective_independent_geometry_mapping_unresolved';

  if (failedCaseIds.length > 0) {
    state =
      'prospective_independent_geometry_mapping_refuted';
  } else if (
    unavailableCaseIds.length === 0
    && evaluatedCaseIds.length === CASE_IDS.length
  ) {
    state =
      'prospective_independent_geometry_mapping_supported';
  }

  return Object.freeze({
    state,
    evaluatedCaseIds: Object.freeze([...evaluatedCaseIds]),
    unavailableCaseIds: Object.freeze([...unavailableCaseIds]),
    failedCaseIds: Object.freeze([...failedCaseIds]),
    orientationPreservingDirectForEveryAvailableCase:
      preservingPass,
    orientationReversingSwappedForEveryAvailableCase:
      reversingPass,
    allEightCasesAvailable:
      unavailableCaseIds.length === 0,
    numericAcceptanceThresholdApplied: false,
    providerPublishedSideNamesUsedAsAnatomicalAuthority:
      false,
    imageSpaceXSignUsedAsAnatomicalAuthority: false,
  });
}

const u4a =
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-prospective-independent-geometry-validation-protocol-v1' as const,
    phase:
      'FR104_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_U4B_A' as const,
    studyKind:
      'prospective_preregistered_independent_geometry_fixture_validation_same_anatomical_source_family' as const,
    authorityState:
      'preregistered_no_u4b_fixture_render_or_provider_result_observed_or_admitted' as const,

    predecessor: Object.freeze({
      u4aDerivedResultSha256:
        u4a.u4aDerivedResultSha256,
      u4aState: u4a.summary.state,
      controlledAnatomicalMappingAudited:
        u4a.interpretation.controlledAnatomicalMappingAudited,
      reflectionParityConditionalMappingSupportedOnExactFixture:
        u4a.interpretation
          .reflectionParityConditionalMappingSupportedOnExactFixture,
      u4aAdmissionMergeSha:
        'f2ada1d90ef5fac4c61b7f359a85cd52d601184c' as const,
    }),

    prospectiveFixture: Object.freeze({
      fixtureRef:
        'makehuman_head_scale_horiz_incr_weight_1_u4b' as const,
      sourceRepository:
        'makehumancommunity/makehuman' as const,
      sourceCommit:
        'a8bc2d54ff0ac92e78ff71431b1023eda42bf482' as const,
      baseMesh: Object.freeze({
        path:
          'makehuman/data/3dobjs/base.obj' as const,
        blobSha:
          'd26635e9326e3cca30778fd7b9c00062b03cce09' as const,
      }),
      morphTarget: Object.freeze({
        path:
          'makehuman/data/targets/head/head-scale-horiz-incr.target' as const,
        blobSha:
          '9a32e90f7bd4d0a90092052d89137a365e272a67' as const,
        weight: 1 as const,
        demographicMacroTargetUsed: false as const,
        asymmetricTargetUsed: false as const,
      }),
      targetRuntimeWitness: Object.freeze({
        path: 'makehuman/core/algos3d.py' as const,
        blobSha:
          'eaaf4e9c3d9c67d374a3fe8761812929f2c0f81e' as const,
        textFormat:
          'vertex_index_delta_x_delta_y_delta_z' as const,
        applicationSemantics:
          'coord_at_target_vertex_plus_equals_target_vector_times_morph_factor' as const,
      }),
      anatomicalGroundTruth: Object.freeze({
        leftEyeJoint:
          'eye.L____head' as const,
        rightEyeJoint:
          'eye.R____head' as const,
        headJoint:
          'head____head' as const,
        recomputedAfterTargetApplication:
          true as const,
        providerLandmarkDerived: false as const,
        providerLabelDerived: false as const,
      }),
      independence: Object.freeze({
        geometryUsedInU4a: false as const,
        sameSourceFamilyAsU4a: true as const,
        independentSourceFamily: false as const,
        selectedAfterU4aAdmission: true as const,
        u4aNumericCaseCostsUsedToTuneTargetOrWeight:
          false as const,
        targetOrWeightMayBeRetunedAfterU4bObservation:
          false as const,
      }),
      renderedFixtureSha256:
        null as null,
      renderMayExecuteInU4bA:
        false as const,
      providerMayExecuteInU4bA:
        false as const,
    }),

    renderer: Object.freeze({
      implementation:
        'fr104_bounded_cpu_triangle_rasterizer_v1_with_exact_makehuman_text_target_application' as const,
      outputFormat: 'PNG' as const,
      width: 1024 as const,
      height: 1024 as const,
      cameraCenterRule:
        'morphed_makehuman_eye_midpoint' as const,
      projectionModel: 'orthographic' as const,
      spanRule:
        '3_times_morphed_eye_midpoint_to_head_distance' as const,
      lightingRule:
        'symmetric_camera_frontal_flat_lambert_ambient_0_35_diffuse_0_65' as const,
      postRenderCropApplied: false as const,
      postRenderResizeApplied: false as const,
      postRenderRotationApplied: false as const,
      postRenderHorizontalMirrorApplied: false as const,
    }),

    providerRuntime: Object.freeze({
      packageName:
        '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
      expectedLandmarkCount: 478 as const,
      providerExecutionAllowedInU4bA: false as const,
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
      orientationPreservingRule:
        'directCost_strictly_less_than_swappedCost' as const,
      orientationReversingRule:
        'swappedCost_strictly_less_than_directCost' as const,
      numericAcceptanceThresholdAuthorized:
        false as const,
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

    interpretationBoundary: Object.freeze({
      prospectiveGeometryFixtureIndependentFromU4a:
        true as const,
      sourceFamilyIndependentFromU4a:
        false as const,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        false as const,
      sourceSemanticConflictDeclaredResolved:
        false as const,
      globalProviderAnatomicalSemanticsMayBeEstablished:
        false as const,
      runtimeSubjectPhotoLateralityMayBeAuthorized:
        false as const,
      crossSourceFamilyValidationStillRequired:
        true as const,
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
      u4bFixtureDigestPinned: false as const,
      prospectiveIndependentGeometryValidationExecuted:
        false as const,
      prospectiveIndependentGeometryMappingValidated:
        false as const,
      providerLabelMappedToAnatomicalSide: false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    nextGate:
      'U4B_B_RENDER_ONLY_PIN_MORPHED_FIXTURE_DIGEST_WITHOUT_PROVIDER_EXECUTION' as const,
  });
