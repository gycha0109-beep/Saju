import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-provider-preflight-empirical-evidence-fr104.js';

export type NeutralEarMakeHumanTransformCaseIdFR104V1 =
  | 'R0'
  | 'R90'
  | 'R180'
  | 'R270'
  | 'M0'
  | 'M90'
  | 'M180'
  | 'M270';

export type NeutralEarMakeHumanTransformRotationFR104V1 =
  | 0
  | 90
  | 180
  | 270;

export type NeutralEarMakeHumanAssignmentRelationFR104V1 =
  | 'direct_assignment_closer'
  | 'swapped_assignment_closer'
  | 'equal_or_unresolved';

export type NeutralEarMakeHumanTransformDiagnosticStateFR104V1 =
  | 'transform_consistent_with_parity_conditioned_hypothesis'
  | 'transform_inconsistent'
  | 'incomplete_provider_coverage'
  | 'equal_or_unresolved';

export type NeutralEarMakeHumanNormalizedPointFR104V1 =
  Readonly<{
    x: number;
    y: number;
  }>;

export type NeutralEarMakeHumanTransformCaseFR104V1 =
  Readonly<{
    id: NeutralEarMakeHumanTransformCaseIdFR104V1;
    horizontalMirror: boolean;
    clockwiseRotationDegrees:
      NeutralEarMakeHumanTransformRotationFR104V1;
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation';
    reflectionParity:
      | 'orientation_preserving'
      | 'orientation_reversing';
    expectedRelationHypothesis:
      | 'direct_assignment_closer'
      | 'swapped_assignment_closer';
  }>;

const baseline =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104;
const admitted =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104;

const cases = Object.freeze([
  Object.freeze({
    id: 'R0',
    horizontalMirror: false,
    clockwiseRotationDegrees: 0,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_preserving',
    expectedRelationHypothesis: 'direct_assignment_closer',
  }),
  Object.freeze({
    id: 'R90',
    horizontalMirror: false,
    clockwiseRotationDegrees: 90,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_preserving',
    expectedRelationHypothesis: 'direct_assignment_closer',
  }),
  Object.freeze({
    id: 'R180',
    horizontalMirror: false,
    clockwiseRotationDegrees: 180,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_preserving',
    expectedRelationHypothesis: 'direct_assignment_closer',
  }),
  Object.freeze({
    id: 'R270',
    horizontalMirror: false,
    clockwiseRotationDegrees: 270,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_preserving',
    expectedRelationHypothesis: 'direct_assignment_closer',
  }),
  Object.freeze({
    id: 'M0',
    horizontalMirror: true,
    clockwiseRotationDegrees: 0,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_reversing',
    expectedRelationHypothesis: 'swapped_assignment_closer',
  }),
  Object.freeze({
    id: 'M90',
    horizontalMirror: true,
    clockwiseRotationDegrees: 90,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_reversing',
    expectedRelationHypothesis: 'swapped_assignment_closer',
  }),
  Object.freeze({
    id: 'M180',
    horizontalMirror: true,
    clockwiseRotationDegrees: 180,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_reversing',
    expectedRelationHypothesis: 'swapped_assignment_closer',
  }),
  Object.freeze({
    id: 'M270',
    horizontalMirror: true,
    clockwiseRotationDegrees: 270,
    transformOrder:
      'horizontal_mirror_then_clockwise_rotation',
    reflectionParity: 'orientation_reversing',
    expectedRelationHypothesis: 'swapped_assignment_closer',
  }),
] as const satisfies readonly NeutralEarMakeHumanTransformCaseFR104V1[]);

function unit(value: number, label: string): number {
  if (
    !Number.isFinite(value)
    || value < 0
    || value > 1
  ) {
    throw new RangeError(
      `FR104 U3 ${label} must be finite within [0,1].`,
    );
  }
  return value;
}

export function transformNeutralEarMakeHumanPointFR104(
  point: NeutralEarMakeHumanNormalizedPointFR104V1,
  transform: Readonly<{
    horizontalMirror: boolean;
    clockwiseRotationDegrees:
      NeutralEarMakeHumanTransformRotationFR104V1;
  }>,
): NeutralEarMakeHumanNormalizedPointFR104V1 {
  let x = unit(point.x, 'point.x');
  let y = unit(point.y, 'point.y');

  if (transform.horizontalMirror) {
    x = 1 - x;
  }

  switch (transform.clockwiseRotationDegrees) {
    case 0:
      break;
    case 90: {
      const previousX = x;
      x = 1 - y;
      y = previousX;
      break;
    }
    case 180:
      x = 1 - x;
      y = 1 - y;
      break;
    case 270: {
      const previousX = x;
      x = y;
      y = 1 - previousX;
      break;
    }
    default: {
      const exhaustive: never =
        transform.clockwiseRotationDegrees;
      throw new RangeError(
        `FR104 U3 unsupported rotation: ${exhaustive}`,
      );
    }
  }

  return Object.freeze({ x, y });
}

export function expectedNeutralEarMakeHumanRelationFR104(
  reflectionParity:
    | 'orientation_preserving'
    | 'orientation_reversing',
): Exclude<
  NeutralEarMakeHumanAssignmentRelationFR104V1,
  'equal_or_unresolved'
> {
  return reflectionParity === 'orientation_preserving'
    ? 'direct_assignment_closer'
    : 'swapped_assignment_closer';
}

export const NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-transform-diagnostics-protocol-v1' as const,
    phase:
      'FR104_MAKEHUMAN_CONTROLLED_TRANSFORM_DIAGNOSTICS_U3' as const,
    authorityState:
      'empirical_transform_result_admitted_incomplete_coverage_with_r180_mismatch_no_anatomical_mapping' as const,

    predecessorEvidence:
      'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104' as const,

    canonicalFixture: Object.freeze({
      route:
        '/fr104-makehuman-transform-diagnostics/fixture.png' as const,
      pngSha256: admitted.fixture.sha256,
      width: admitted.fixture.width,
      height: admitted.fixture.height,
      repositoryPersistence: false as const,
      decodePolicy:
        'decode_once_to_canonical_rgba_then_exact_pixel_permutation' as const,
      interpolationAllowed: false as const,
      resizeAllowed: false as const,
      cropAllowed: false as const,
      exifTransformAllowed: false as const,
      cssTransformAllowed: false as const,
      taskImageProcessingRotationDegrees: 0 as const,
    }),

    independentAnatomicalGroundTruth: Object.freeze({
      anatomicalLeftEye:
        admitted.independentAnatomicalGroundTruth.anatomicalLeftEye,
      anatomicalRightEye:
        admitted.independentAnatomicalGroundTruth.anatomicalRightEye,
      transformIdentityPreserved: true as const,
      screenSideMayRedefineAnatomicalIdentity: false as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
    }),

    runtime: Object.freeze({
      packageName: baseline.runtime.packageName,
      packageVersion: baseline.runtime.packageVersion,
      wasmRoot: baseline.runtime.wasmRoot,
      modelAssetRef: baseline.runtime.modelAssetRef,
      runningMode: baseline.runtime.runningMode,
      numFaces: baseline.runtime.numFaces,
      outputFaceBlendshapes: false as const,
      outputFacialTransformationMatrixes: false as const,
    }),

    baselineControl: Object.freeze({
      caseId: 'R0' as const,
      providerLeft:
        admitted.providerEyeCentroids.providerLeft,
      providerRight:
        admitted.providerEyeCentroids.providerRight,
      directCost: admitted.comparison.directCost,
      swappedCost: admitted.comparison.swappedCost,
      relation: admitted.comparison.relation,
      exactScalarMatchRequired: true as const,
    }),

    transformOrder:
      'horizontal_mirror_then_clockwise_rotation' as const,
    cases,

    hypothesis: Object.freeze({
      preRegisteredBeforeU3ProviderExecution: true as const,
      orientationPreservingExpectedRelation:
        'direct_assignment_closer' as const,
      orientationReversingExpectedRelation:
        'swapped_assignment_closer' as const,
      rotationChangesReflectionParity: false as const,
      hypothesisFailureIsHarnessFailure: false as const,
      providerUnavailabilityIsHarnessFailure: false as const,
      numericAcceptanceThresholdAuthorized: false as const,
    }),

    resultStates: Object.freeze([
      'transform_consistent_with_parity_conditioned_hypothesis',
      'transform_inconsistent',
      'incomplete_provider_coverage',
      'equal_or_unresolved',
    ] as const),

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
      exactMakeHumanFixtureTransformDiagnosticsExecuted:
        true as const,
      parityConditionedAssignmentPatternObserved:
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

    empiricalEvidenceRef:
      'NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_EVIDENCE_FR104' as const,

    admittedDiagnosticOutcome: Object.freeze({
      state: 'incomplete_provider_coverage' as const,
      unavailableCaseIds: Object.freeze([
        'R270',
        'M180',
        'M270',
      ] as const),
      hypothesisMismatchCaseIds: Object.freeze([
        'R180',
      ] as const),
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),

    nextGate:
      'investigate_same_fixture_provider_rotation_dependence_before_any_anatomical_mapping_admission' as const,
  });
