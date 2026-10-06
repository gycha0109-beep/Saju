import { describe, expect, it } from 'vitest';
import {
  FR318_CURRENT_GATE,
  materializeRealLocalHairlineMetricReferenceFR318,
  assertFR318CurrentGate,
  type FR318PrivateLocalMetricExecution,
} from './hairline-real-local-metric-receipt-fr318.js';
import type {
  FR316RegistrationInput,
} from './hairline-same-capture-registration-fr316.js';
import {
  materializeVisibleHairlineObservationFR314,
  type FR314LocalObservationInput,
} from './visible-hairline-local-observation-materialization-fr314.js';
import {
  reviewHairlineModelAdmissionFR313,
  type FR313AdmissionReviewReceipt,
} from './visible-hairline-model-admission-review-fr313.js';
import type {
  FR312ExpandedValidationReceipt,
} from './visible-hairline-expanded-validation-fr312.js';

const RGB_DIGEST =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const METRIC_DIGEST =
  'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

const expandedValidation: FR312ExpandedValidationReceipt = {
  schemaVersion:
    'fr312-expanded-hairline-validation-receipt-v1',
  contractVersion:
    'FR312-EXPANDED-HAIRLINE-VALIDATION-v1.1',
  authorityState:
    'expanded_engineering_validation_only',
  candidateId:
    'candidate.hairline.florence2_base.referring_segmentation.fr306',
  runtimeContractVersion:
    'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
  modelId: 'microsoft/Florence-2-base',
  modelRevision:
    '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
  disposition:
    'eligible_for_model_admission_review',
  failureReasons: [],
  hardRejectTriggered: false,
  repeatRequired: false,
  modelAdmissionReviewEligible: true,
  captureCount: 12,
  distinctSessionCount: 3,
  eachCaseHasAtLeastTwoIndependentCaptures: true,
  subjectCoverage: 'multiple_subjects',
  representativeOrdinaryRgbReady: false,
  representativeCoverageReviewRequired: true,
  exactModelRevisionBound: true,
  deidentifiedBoundarySatisfied: true,
  nextAction:
    'design_fr313_model_admission_review_with_representative_coverage_gap',
  authorityBoundary: {
    fr305AdmissionReceiptIssued: false,
    validatedHairlineRuntimeProviderAdmitted: false,
    neutralRuntimeHairlineObservationAuthorized: false,
    traditionalHairlineBindingIssued: false,
    threeDivisionsSpanExecutionReady: false,
    productColumnMaterialized: false,
    productionActivated: false,
    commerceActivated: false,
  },
};

function admittedReview(): FR313AdmissionReviewReceipt {
  return reviewHairlineModelAdmissionFR313({
    schemaVersion:
      'fr313-hairline-model-admission-review-input-v1',
    expandedValidation,
    modelId: 'microsoft/Florence-2-base',
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
    representativeCoverage: {
      schemaVersion:
        'fr313-representative-ordinary-rgb-coverage-assessment-v1',
      humanReviewCompleted: true,
      protocolFrozenBeforeFinalEvaluation: true,
      ordinaryRgbSelfieCaptureOnly: true,
      multipleIndependentSubjectsAttested: true,
      multipleIndependentSessionsAttested: true,
      multipleDeviceCameraContextsRepresented: true,
      naturalHairVariationRepresented: true,
      naturalBackgroundVariationRepresented: true,
      naturalIlluminationVariationRepresented: true,
      unobstructedVisibilityRepresented: true,
      occludedVisibilityRepresented: true,
      syntheticOnlyEvidenceUsed: false,
      derivedImageOnlyEvidenceUsed: false,
      demographicAttributesCollected: false,
      demographicInferenceUsed: false,
      subjectIdentitiesExposed: false,
      publicRawOrReconstructiveEvidenceExposed: false,
      aggregateEvidenceRefs: [
        'fixture:fr318:representative-coverage',
      ],
      humanReviewerDeterminedCoverageRepresentativeForOrdinaryRgbSelfies:
        true,
    },
    modelBehavior: {
      schemaVersion:
        'fr313-hairline-model-behavior-assessment-v1',
      humanReviewCompleted: true,
      visibleHairSkinBoundaryValidated: true,
      visibilityHandlingValidated: true,
      occlusionHandlingValidated: true,
      hiddenHairlineCompletionObserved: false,
      faceOvalSubstitutionObserved: false,
      faceMeshTopVertexSubstitutionObserved: false,
      publicRawOrReconstructiveEvidenceExposed: false,
      aggregateEvidenceRefs: [
        'fixture:fr318:model-behavior',
      ],
    },
  });
}

function localObservation(): FR314LocalObservationInput {
  return {
    schemaVersion:
      'fr314-local-visible-hairline-observation-input-v1',
    modelId: 'microsoft/Florence-2-base',
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
    boundaryPolyline: [
      { x: 0.2, y: 0.24 },
      { x: 0.5, y: 0.18 },
      { x: 0.8, y: 0.25 },
    ],
    visibilityState:
      'visible_boundary_segment_admitted',
    occlusionHandlingApplied: true,
    hiddenSegmentsCompleted: false,
    sourceImageDigest: RGB_DIGEST,
    sourceObservationRefs: [
      'local:fr318:hairline-observation',
    ],
    providerFaceOvalUsedAsHairline: false,
    providerFaceMeshTopVerticesUsedAsHairline: false,
    traditionalBindingApplied: false,
    sourceImagePersistedToGit: false,
    boundaryPolylinePersistedToGit: false,
    sourceImageDigestExposedPublicly: false,
    sourceObservationRefsExposedPublicly: false,
    derivedSubjectScalarPersistedPublicly: false,
  };
}

function availableHairlineMaterialization() {
  const result =
    materializeVisibleHairlineObservationFR314({
      schemaVersion:
        'fr314-local-hairline-materialization-input-v1',
      admissionReview: admittedReview(),
      localObservation: localObservation(),
    });

  if (result.status !== 'available') {
    throw new Error(
      'expected available FR314 fixture materialization',
    );
  }

  return result;
}

function realRegistrationInput(
  overrides: Partial<FR316RegistrationInput> = {},
): FR316RegistrationInput {
  const base: FR316RegistrationInput = {
    schemaVersion:
      'fr316-same-capture-hairline-registration-input-v1',
    artifactClass: 'real_local_capture',
    method: 'exact_calibrated_surface_registration',
    hairlineMaterialization:
      availableHairlineMaterialization(),
    evidence: {
      schemaVersion:
        'fr316-private-registration-evidence-v1',
      rgbCaptureRef: 'local/rgb/fr318-capture-1',
      rgbCaptureDigest: RGB_DIGEST,
      metricSupportArtifactRef:
        'local/metric/fr318-support-1',
      metricSupportArtifactDigest: METRIC_DIGEST,
      metricSupportSourceImageDigest: RGB_DIGEST,
      exactSameCaptureBound: true,
      exactSameSessionBound: true,
      exactArtifactPairBindingBound: true,
      exactHairlineObservationProvenanceBound: true,
      metricScaleAuthority: {
        schemaVersion:
          'fr316-metric-scale-authority-v1',
        authorityLevel: 'M3',
        exactMetricSupportArtifactBound: true,
        coordinateFrame:
          'canonical_aligned_right_handed_metric_3d',
        coordinateUnit: 'centimeter',
        scaleEvidenceRef:
          'local:fr318:metric-scale:m3',
        canonicalInversePoseAlignmentBound: true,
        unknownScaleFittingUsed: false,
      },
      calibratedSurface: {
        schemaVersion:
          'fr316-calibrated-surface-registration-evidence-v1',
        exactCameraIntrinsicsBound: true,
        exactRgbToMetricExtrinsicsBound: true,
        exactReleasedImageTransformChainBound: true,
        exactImageDimensionsBound: true,
        normalizedCoordinateConventionBound: true,
        metricSupportSurfaceBound: true,
        visibleHairlineBoundaryToMetricSurfaceCorrespondenceVerified:
          true,
        registrationExecutionObserved: true,
        registrationOutputFinite: true,
      },
      independentRegistration: null,
      providerLandmarksUsedAsRegistrationTruth: false,
      unrelatedAstRegistrationReceiptUsedAsAuthority: false,
      faceBoxScaleUsed: false,
      faceOvalScaleUsed: false,
      averageFaceSizeUsed: false,
      providerNormalizedLandmarksRelabeledAsMetric:
        false,
      twoDimensionalHomographyClaimedAsMetricDepthTruth:
        false,
      sourceImagePersistedPublicly: false,
      hairlineBoundaryPersistedPublicly: false,
      rawCorrespondencesPersistedPublicly: false,
      cameraParametersPersistedPublicly: false,
      rawMetricSupportPersistedPublicly: false,
      sourceImageDigestPersistedPublicly: false,
      transformedSubjectCoordinatePersistedPublicly:
        false,
    },
  };

  return {
    ...base,
    ...overrides,
  };
}

function realIndependentRegistrationInput(): FR316RegistrationInput {
  const calibrated = realRegistrationInput();

  return {
    ...calibrated,
    method: 'independent_correspondence_registration',
    evidence: {
      ...calibrated.evidence,
      calibratedSurface: null,
      independentRegistration: {
        schemaVersion:
          'fr316-independent-registration-evidence-v1',
        sourceIndependentCorrespondences: true,
        exactMetricScaleBoundBeforeRegistration: true,
        fitCorrespondenceCount: 3,
        heldOutCorrespondenceCount: 2,
        fitHeldOutIdentityDisjoint: true,
        heldOutValidationExecuted: true,
        acceptanceCriteriaPreregistered: true,
        acceptanceCriteriaSatisfied: true,
        registrationOutputFinite: true,
        evaluatedCorrespondenceEnvelopeIncludesVisibleHairlineSupportRegion:
          true,
        extrapolationBeyondValidatedEnvelopeUsed: false,
      },
    },
  };
}

function localMetricExecution(
  overrides: Partial<FR318PrivateLocalMetricExecution> = {},
): FR318PrivateLocalMetricExecution {
  return {
    schemaVersion:
      'fr318-private-local-metric-execution-v1',
    method: 'exact_calibrated_surface_registration',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    coordinateUnit: 'centimeter',
    axisConvention: 'x_right_y_up',
    transformedBoundaryPolyline: [
      { xCm: -2, yCm: 3 },
      { xCm: 0, yCm: 4 },
      { xCm: 2, yCm: 3 },
    ],
    sourceBoundaryPointCount: 3,
    sourceBoundaryPointOrderBound: true,
    executionObserved: true,
    executionOutputFinite: true,
    noExtrapolationBeyondValidatedHairlineSupportRegion:
      true,
    hiddenCompletedPointsIntroduced: false,
    providerFaceOvalUsedAsHairline: false,
    providerFaceMeshTopVerticesUsedAsHairline: false,
    transformedBoundaryPersistedPublicly: false,
    sourceImageDigestPersistedPublicly: false,
    rawRegistrationParametersPersistedPublicly: false,
    rawCorrespondencesPersistedPublicly: false,
    subjectMetricVerticalCoordinatePersistedPublicly:
      false,
    ...overrides,
  };
}

describe('FR318 real-local hairline metric materialization receipt', () => {
  it('fails closed when real FR316 evidence is not execution-eligible', () => {
    const registration = realRegistrationInput({
      evidence: {
        ...realRegistrationInput().evidence,
        calibratedSurface: {
          ...realRegistrationInput().evidence
            .calibratedSurface!,
          visibleHairlineBoundaryToMetricSurfaceCorrespondenceVerified:
            false,
        },
      },
    });

    const result =
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: registration,
        localMetricExecution: null,
      });

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'fr316_real_local_registration_not_eligible',
      predecessorDisposition:
        'hairline_support_region_unverified',
      fallbackInvented: false,
      repoSafeReceipt: {
        realLocalFR316EligibilityRevalidated: false,
        exactSameCaptureBindingRevalidated: true,
        metricScaleAuthorityRevalidated: true,
        localMetricMappingExecuted: false,
        metricNeutralReferenceAvailable: false,
        hairlineMetricReferenceReadyForSevenReferenceAssembly:
          false,
      },
    });
  });

  it('keeps an eligible real FR316 registration unavailable until local metric execution exists', () => {
    const result =
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: null,
      });

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'real_local_metric_mapping_execution_unavailable',
      predecessorDisposition:
        'eligible_for_local_hairline_metric_mapping_execution',
      fallbackInvented: false,
      repoSafeReceipt: {
        realLocalFR316EligibilityRevalidated: true,
        exactSameCaptureBindingRevalidated: true,
        metricScaleAuthorityRevalidated: true,
        localMetricMappingExecuted: false,
        metricNeutralReferenceAvailable: false,
        hairlineMetricReferenceReadyForSevenReferenceAssembly:
          false,
      },
    });
  });

  it('materializes a runtime-only canonical metric XY hairline reference from the transformed visible boundary', () => {
    const result =
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution(),
      });

    expect(result.status).toBe('available');
    if (result.status !== 'available') {
      throw new Error('expected available FR318 result');
    }

    expect(
      result.runtimeOnlyMetricVerticalReference,
    ).toEqual({
      schemaVersion:
        'fr318-runtime-only-hairline-metric-reference-v1',
      observationRef:
        'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate.canonical_metric_xy@0.1.0',
      sourceObservationRef:
        'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate@0.1.0',
      value: 3.5,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      axisConvention: 'x_right_y_up',
      selectionRule:
        'arc_length_weighted_y_centroid_of_transformed_visible_boundary_polyline',
      registrationMethod:
        'exact_calibrated_surface_registration',
      exactCaptureLocalOnly: true,
      sourceBoundaryCardinalityPreserved: true,
      sourceBoundaryPointOrderPreserved: true,
      noExtrapolationBeyondValidatedHairlineSupportRegion:
        true,
      globallyReusableImageToMetricTransformIssued:
        false,
      failClosedWhenUnavailable: true,
    });

    expect(result.repoSafeReceipt).toEqual({
      schemaVersion:
        'fr318-repo-safe-hairline-metric-receipt-v1',
      contractVersion:
        'FR318-REAL-LOCAL-HAIRLINE-METRIC-RECEIPT-v1',
      realLocalFR316EligibilityRevalidated: true,
      exactSameCaptureBindingRevalidated: true,
      metricScaleAuthorityRevalidated: true,
      localMetricMappingExecuted: true,
      metricNeutralReferenceAvailable: true,
      sourceBoundaryCardinalityPreserved: true,
      sourceBoundaryPointOrderPreserved: true,
      hairlineSupportRegionStayedWithinValidatedEnvelope:
        true,
      transformedBoundaryPubliclyPersisted: false,
      sourceImageDigestPubliclyPersisted: false,
      rawRegistrationParametersPubliclyPersisted: false,
      rawCorrespondencesPubliclyPersisted: false,
      subjectMetricVerticalCoordinatePubliclyPersisted:
        false,
      globallyReusableImageToMetricTransformIssued:
        false,
      hairlineMetricReferenceReadyForSevenReferenceAssembly:
        true,
      threeDivisionsSpanExecutionReady: false,
    });

    expect(result.authorityBoundary).toEqual({
      neutralObservationOnly: true,
      anatomicalHairlineGroundTruthIssued: false,
      traditionalHairlineBindingIssued: false,
      globallyReusableImageToMetricTransformIssued: false,
      arbitraryImageToMetricRelabelingIssued: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      classifierIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(result.nextAction).toBe(
      'fr319_assemble_exact_capture_seven_reference_common_frame_bundle',
    );
  });

  it('materializes through the independent correspondence registration path', () => {
    const result =
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realIndependentRegistrationInput(),
        localMetricExecution: localMetricExecution({
          method:
            'independent_correspondence_registration',
        }),
      });

    expect(result.status).toBe('available');
    if (result.status !== 'available') {
      throw new Error('expected available FR318 independent result');
    }

    expect(
      result.runtimeOnlyMetricVerticalReference.registrationMethod,
    ).toBe('independent_correspondence_registration');
    expect(
      result.runtimeOnlyMetricVerticalReference.value,
    ).toBe(3.5);
    expect(result.repoSafeReceipt).toMatchObject({
      realLocalFR316EligibilityRevalidated: true,
      localMetricMappingExecuted: true,
      metricNeutralReferenceAvailable: true,
      sourceBoundaryCardinalityPreserved: true,
      sourceBoundaryPointOrderPreserved: true,
      hairlineSupportRegionStayedWithinValidatedEnvelope:
        true,
      hairlineMetricReferenceReadyForSevenReferenceAssembly:
        true,
    });
  });

  it('rejects missing source-to-transformed point-order binding', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          sourceBoundaryPointOrderBound: false,
        } as never),
      }),
    ).toThrow(/private local metric execution boundary drift/);
  });

  it('rejects non-finite transformed metric coordinates', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          transformedBoundaryPolyline: [
            { xCm: -2, yCm: 3 },
            { xCm: Number.NaN, yCm: 4 },
            { xCm: 2, yCm: 3 },
          ],
        }),
      }),
    ).toThrow(/must be finite/);
  });

  it('rejects execution outside the validated hairline support envelope', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          noExtrapolationBeyondValidatedHairlineSupportRegion:
            false,
        } as never),
      }),
    ).toThrow(/private local metric execution boundary drift/);
  });

  it('rejects synthetic FR316 inputs from the real-local executor', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput({
          artifactClass: 'synthetic_fixture',
        }),
        localMetricExecution: localMetricExecution(),
      }),
    ).toThrow(
      /synthetic fixtures cannot enter the FR318 real-local executor/,
    );
  });

  it('rejects method drift between FR316 and the local metric execution', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          method:
            'independent_correspondence_registration',
        }),
      }),
    ).toThrow(
      /execution method differs from the revalidated FR316 method/,
    );
  });

  it('rejects source/transformed boundary cardinality mismatch', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          sourceBoundaryPointCount: 2,
        }),
      }),
    ).toThrow(
      /source\/transformed boundary cardinality mismatch/,
    );
  });

  it('rejects degenerate metric boundary segments', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          transformedBoundaryPolyline: [
            { xCm: -1, yCm: 3 },
            { xCm: -1, yCm: 3 },
            { xCm: 1, yCm: 4 },
          ],
        }),
      }),
    ).toThrow(/degenerate segment/);
  });

  it('rejects public persistence of private transformed evidence', () => {
    expect(() =>
      materializeRealLocalHairlineMetricReferenceFR318({
        schemaVersion:
          'fr318-real-local-hairline-metric-materialization-input-v1',
        registrationInput: realRegistrationInput(),
        localMetricExecution: localMetricExecution({
          transformedBoundaryPersistedPublicly: true,
        } as never),
      }),
    ).toThrow(/persistence boundary drift/);
  });

  it('keeps the repository current gate at six of seven without real evidence', () => {
    expect(FR318_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      realLocalMetricReceiptContractImplemented: true,
      realFR316EligibleEvidenceAvailable: false,
      realFR318HairlineMetricReferenceMaterialized: false,
      repositoryActualNeutralReferenceCapabilityCount: 6,
      repositoryRemainingNeutralReferenceCapabilityCount: 1,
      hairlineMetricReferenceReadyForSevenReferenceAssembly:
        false,
      commonFrameBundleAssembled: false,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR318CurrentGate()).not.toThrow();
  });
});
