import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-provider-rotation-empirical-evidence-fr104.js';
import {
  inverseNeutralEarProviderRotationDegreesFR104,
} from './neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

const predecessor =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104;

function requireCase(
  index: number,
  expectedId:
    | 'R0' | 'R90' | 'R180' | 'R270'
    | 'M0' | 'M90' | 'M180' | 'M270',
) {
  const item = predecessor.cases[index];
  if (item === undefined || item.id !== expectedId) {
    throw new Error(
      `FR104 U3.2 predecessor case ${expectedId} unavailable.`,
    );
  }
  return item;
}

const r0 = requireCase(0, 'R0');
const r90 = requireCase(1, 'R90');
const r180 = requireCase(2, 'R180');
const r270 = requireCase(3, 'R270');
const m0 = requireCase(4, 'M0');
const m90 = requireCase(5, 'M90');
const m180 = requireCase(6, 'M180');
const m270 = requireCase(7, 'M270');

if (
  r0.native.providerEyeCentroids === null
  || m0.native.providerEyeCentroids === null
) {
  throw new Error(
    'FR104 U3.2 requires exact R0 and M0 provider baselines.',
  );
}

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-provider-rotation-compensation-protocol-v1' as const,
    phase:
      'FR104_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_U3_2B' as const,
    authorityState:
      'partial_availability_recovery_admitted_coordinate_canonicalization_not_established' as const,

    apiAuditRef:
      'NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104' as const,
    predecessorEvidence:
      'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104' as const,

    fixture: Object.freeze({
      route:
        '/fr104-makehuman-provider-rotation-compensation/fixture.png' as const,
      pngSha256: predecessor.fixture.pngSha256,
      canonicalRgbaSha256:
        predecessor.fixture.canonicalRgbaSha256,
      width: predecessor.fixture.width,
      height: predecessor.fixture.height,
      repositoryPersistence: false as const,
    }),

    runtime: Object.freeze({
      ...predecessor.runtime,
      imageProcessingOptionsRotationDegreesUsed:
        true as const,
    }),

    familyBaselines: Object.freeze({
      non_mirrored: Object.freeze({
        caseId: 'R0' as const,
        providerLeft:
          r0.native.providerEyeCentroids.providerLeft,
        providerRight:
          r0.native.providerEyeCentroids.providerRight,
      }),
      mirrored: Object.freeze({
        caseId: 'M0' as const,
        providerLeft:
          m0.native.providerEyeCentroids.providerLeft,
        providerRight:
          m0.native.providerEyeCentroids.providerRight,
      }),
    }),

    cases: Object.freeze([
      Object.freeze({
        id:'R0', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:0,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(0),
        nativeRgbaSha256:r0.native.rgbaSha256,
      }),
      Object.freeze({
        id:'R90', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:90,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(90),
        nativeRgbaSha256:r90.native.rgbaSha256,
      }),
      Object.freeze({
        id:'R180', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:180,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(180),
        nativeRgbaSha256:r180.native.rgbaSha256,
      }),
      Object.freeze({
        id:'R270', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:270,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(270),
        nativeRgbaSha256:r270.native.rgbaSha256,
      }),
      Object.freeze({
        id:'M0', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:0,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(0),
        nativeRgbaSha256:m0.native.rgbaSha256,
      }),
      Object.freeze({
        id:'M90', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:90,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(90),
        nativeRgbaSha256:m90.native.rgbaSha256,
      }),
      Object.freeze({
        id:'M180', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:180,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(180),
        nativeRgbaSha256:m180.native.rgbaSha256,
      }),
      Object.freeze({
        id:'M270', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:270,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(270),
        nativeRgbaSha256:m270.native.rgbaSha256,
      }),
    ] as const),

    preRegisteredHypothesis: Object.freeze({
      availabilityRecoveredForNativeUnavailableCases:
        true as const,
      compensatedAvailableCasesBecomeSameLabelCloser:
        true as const,
      r180CrossLabelResolved: true as const,
      zeroDegreeControlsExact: true as const,
      hypothesisFailureIsHarnessFailure: false as const,
    }),

    sideControls: Object.freeze({
      zeroDegreesVsUndefined: Object.freeze([
        'R0',
        'M0',
      ] as const),
      signedEquivalent: Object.freeze({
        caseId: 'R90' as const,
        positiveDegrees: 270 as const,
        signedDegrees: -90 as const,
      }),
      invalidRotation: Object.freeze({
        caseId: 'R0' as const,
        degrees: 45 as const,
      }),
      oppositeDirection: Object.freeze({
        caseId: 'R90' as const,
        correctDegrees: 270 as const,
        oppositeDegrees: 90 as const,
      }),
    }),

    comparison: Object.freeze({
      compensatedCoordinatesComparedDirectlyToFamilyBaseline:
        true as const,
      additionalCoordinateRotationAppliedAfterProviderCompensation:
        false as const,
      sameLabelCost:
        'd(comp_left,baseline_left)+d(comp_right,baseline_right)' as const,
      crossLabelCost:
        'd(comp_left,baseline_right)+d(comp_right,baseline_left)' as const,
      numericAcceptanceThresholdAuthorized: false as const,
      exactBaselineScalarRecoveryTrackedSeparately:
        true as const,
    }),

    scientificStates: Object.freeze([
      'provider_rotation_compensation_effective_on_exact_fixture',
      'provider_rotation_compensation_partially_effective',
      'provider_rotation_compensation_ineffective',
      'provider_rotation_compensation_introduces_new_instability',
      'provider_rotation_compensation_unresolved',
    ] as const),

    interpretationBoundary: Object.freeze({
      anatomicalGroundTruthUsed: false as const,
      anatomicalSideSemanticsUsed: false as const,
      detectorStageFailureMayBeClaimed: false as const,
      exactFixtureRuntimeOnly: true as const,
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
      providerRotationCompensationSemanticsAudited:
        true as const,
      providerRotationCompensationEffectiveForExactFixture:
        false as const,
      canonicalProviderOrientationNormalizationAvailable:
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
      'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104' as const,

    admittedOutcome: Object.freeze({
      state:
        'provider_rotation_compensation_partially_effective' as const,
      availabilityRecoveredCaseIds: Object.freeze([
        'R270',
        'M180',
        'M270',
      ] as const),
      sameLabelCompensatedCaseIds: Object.freeze([
        'R0',
        'R90',
        'M0',
      ] as const),
      crossLabelCompensatedCaseIds: Object.freeze([
        'R180',
        'R270',
        'M90',
        'M180',
        'M270',
      ] as const),
      providerAvailabilityRecoveryObserved: true as const,
      providerCoordinateCanonicalizationEstablished:
        false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),

    nextGate:
      'audit_compensated_output_coordinate_frame_semantics_before_any_anatomical_mapping_review' as const,
  });
