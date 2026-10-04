import { describe, expect, it } from 'vitest';
import {
  FR316_CURRENT_GATE,
  assessSameCaptureHairlineRegistrationFR316,
  assertFR316Contract,
  type FR316PrivateRegistrationEvidence,
  type FR316RegistrationInput,
} from './hairline-same-capture-registration-fr316.js';
import type {
  FR314MaterializationResult,
} from './visible-hairline-local-observation-materialization-fr314.js';

const RGB_DIGEST =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const METRIC_DIGEST =
  'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

function availableMaterialization(
  sourceImageDigest = RGB_DIGEST,
): FR314MaterializationResult {
  return {
    schemaVersion:
      'fr314-local-hairline-materialization-result-v1',
    status: 'available',
    authorityState:
      'local_ephemeral_neutral_visible_hairline_observation_only',
    runtimeOnlyObservation: {
      schemaVersion:
        'fr305-visible-hairline-observation-v1',
      authorityState:
        'validated_model_visible_boundary_observation_only',
      modelId: 'microsoft/Florence-2-base',
      exactRevision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      coordinateFrame:
        'canonical_image_normalized_2d',
      axisConvention:
        'x_right_y_down_unit_square',
      boundaryPolyline: [
        { x: 0.2, y: 0.3 },
        { x: 0.5, y: 0.25 },
        { x: 0.8, y: 0.31 },
      ],
      visibilityState:
        'visible_boundary_segment_admitted',
      occlusionHandlingApplied: true,
      hiddenSegmentsCompleted: false,
      sourceImageDigest,
      sourceObservationRefs: ['local:hairline:fixture'],
      providerFaceOvalUsedAsHairline: false,
      providerFaceMeshTopVerticesUsedAsHairline: false,
      traditionalBindingApplied: false,
    },
    runtimeOnlyVerticalReference: {
      schemaVersion:
        'fr305-visible-hairline-vertical-reference-v1',
      artifactVersion: '0.1.0',
      contractVersion:
        'FR305-VISIBLE-HAIRLINE-VERTICAL-REFERENCE-v1',
      authorityState:
        'neutral_visible_hairline_vertical_reference_only',
      status: 'available',
      observationRef:
        'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate@0.1.0',
      value: 0.27,
      unit: 'normalized_ratio',
      coordinateFrame:
        'canonical_image_normalized_2d',
      selectionRule:
        'arc_length_weighted_vertical_coordinate_over_visible_boundary_segments',
      visibilitySemantics:
        'visible_hair_skin_boundary_segments_only_no_hidden_completion',
      failClosedWhenUnavailable: true,
      crossAnchorSpanReady: false,
      crossAnchorSpanBlocker:
        'common_coordinate_frame_bridge_not_issued',
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review_but_cross_anchor_span_blocked',
      source: {
        admissionReceiptVerified: true,
        exactModelIdentityAndRevisionMatched: true,
        visibleBoundaryObservationConsumed: true,
        sourceObservationRefsRetainedInternally: true,
        sourceObservationRefsExposed: false,
        sourceImageDigestExposed: false,
        rawBoundaryPolylineExposed: false,
        providerSpecificIndicesExposed: false,
        traditionalSemanticsExposed: false,
      },
      authorityBoundary: {
        neutralObservationOnly: true,
        anatomicalHairlineGroundTruthIssued: false,
        traditionalHairlineEquivalenceIssued: false,
        traditionalBindingIssued: false,
        commonFrameBridgeIssued: false,
        crossFrameSubtractionAllowed: false,
        threeDivisionsBoundaryIssued: false,
        threeDivisionsSpanIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        classifierIssued: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    },
    repoSafeReceipt: {
      schemaVersion:
        'fr314-repo-safe-hairline-materialization-receipt-v1',
      contractVersion:
        'FR314-LOCAL-HAIRLINE-OBSERVATION-MATERIALIZATION-v1',
      exactModelRevisionMatched: true,
      visibleObservationMaterialized: true,
      neutralReferenceAvailable: true,
      hiddenCompletionAbsent: true,
      prohibitedSubstitutionAbsent: true,
      sourceImagePubliclyPersisted: false,
      boundaryPolylinePubliclyPersisted: false,
      sourceImageDigestPubliclyPersisted: false,
      sourceObservationRefsPubliclyPersisted: false,
      derivedSubjectScalarPubliclyPersisted: false,
      crossAnchorSpanReady: false,
      commonCoordinateFrameBridgeIssued: false,
    },
    authorityBoundary: {
      anatomicalHairlineGroundTruthIssued: false,
      traditionalHairlineBindingIssued: false,
      threeDivisionsSpanExecutionReady: false,
      commonCoordinateFrameBridgeIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
  } as FR314MaterializationResult;
}

function unavailableMaterialization(): FR314MaterializationResult {
  return {
    schemaVersion:
      'fr314-local-hairline-materialization-result-v1',
    status: 'unavailable',
    reason: 'fr313_model_admission_not_available',
    fallbackInvented: false,
    repoSafeReceipt: {
      schemaVersion:
        'fr314-repo-safe-hairline-materialization-receipt-v1',
      contractVersion:
        'FR314-LOCAL-HAIRLINE-OBSERVATION-MATERIALIZATION-v1',
      exactModelRevisionMatched: false,
      visibleObservationMaterialized: false,
      neutralReferenceAvailable: false,
      hiddenCompletionAbsent: true,
      prohibitedSubstitutionAbsent: true,
      sourceImagePubliclyPersisted: false,
      boundaryPolylinePubliclyPersisted: false,
      sourceImageDigestPubliclyPersisted: false,
      sourceObservationRefsPubliclyPersisted: false,
      derivedSubjectScalarPubliclyPersisted: false,
      crossAnchorSpanReady: false,
      commonCoordinateFrameBridgeIssued: false,
    },
  };
}

function baseEvidence(
  overrides: Partial<FR316PrivateRegistrationEvidence> = {},
): FR316PrivateRegistrationEvidence {
  return {
    schemaVersion:
      'fr316-private-registration-evidence-v1',
    rgbCaptureRef: 'local/rgb/capture-1',
    rgbCaptureDigest: RGB_DIGEST,
    metricSupportArtifactRef:
      'local/metric/support-1',
    metricSupportArtifactDigest: METRIC_DIGEST,
    metricSupportSourceImageDigest: RGB_DIGEST,
    exactSameCaptureBound: true,
    exactSameSessionBound: true,
    exactArtifactPairBindingBound: true,
    exactHairlineObservationProvenanceBound: true,
    metricScaleAuthority: {
      schemaVersion: 'fr316-metric-scale-authority-v1',
      authorityLevel: 'M3',
      exactMetricSupportArtifactBound: true,
      coordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      coordinateUnit: 'centimeter',
      scaleEvidenceRef: 'local:metric-scale:m3',
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
    providerNormalizedLandmarksRelabeledAsMetric: false,
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
    ...overrides,
  };
}

function calibratedInput(
  evidence = baseEvidence(),
  materialization = availableMaterialization(),
): FR316RegistrationInput {
  return {
    schemaVersion:
      'fr316-same-capture-hairline-registration-input-v1',
    artifactClass: 'synthetic_fixture',
    method: 'exact_calibrated_surface_registration',
    hairlineMaterialization: materialization,
    evidence,
  };
}

function independentEvidence(
  overrides: Partial<FR316PrivateRegistrationEvidence> = {},
): FR316PrivateRegistrationEvidence {
  return baseEvidence({
    calibratedSurface: null,
    independentRegistration: {
      schemaVersion:
        'fr316-independent-registration-evidence-v1',
      sourceIndependentCorrespondences: true,
      exactMetricScaleBoundBeforeRegistration: true,
      fitCorrespondenceCount: 8,
      heldOutCorrespondenceCount: 4,
      fitHeldOutIdentityDisjoint: true,
      heldOutValidationExecuted: true,
      acceptanceCriteriaPreregistered: true,
      acceptanceCriteriaSatisfied: true,
      registrationOutputFinite: true,
      evaluatedCorrespondenceEnvelopeIncludesVisibleHairlineSupportRegion:
        true,
      extrapolationBeyondValidatedEnvelopeUsed: false,
    },
    ...overrides,
  });
}

describe('FR316 same-capture hairline registration contract', () => {
  it('blocks before a real/admitted FR314 predecessor is available', () => {
    const result =
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(
          baseEvidence(),
          unavailableMaterialization(),
        ),
      );

    expect(result).toMatchObject({
      predecessorReady: false,
      disposition: 'predecessor_not_ready',
      eligibleForLocalHairlineMetricMappingExecution:
        false,
      nextAction:
        'materialize_real_fr313_fr314_predecessor',
    });
  });

  it('requires exact same-capture digest binding', () => {
    const evidence = baseEvidence({
      metricSupportSourceImageDigest:
        'sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    });

    const result =
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(evidence),
      );

    expect(result).toMatchObject({
      predecessorReady: true,
      exactSameCaptureBindingComplete: false,
      disposition:
        'same_capture_binding_incomplete',
      nextAction: 'bind_exact_same_capture_artifacts',
    });
  });

  it('requires M3-equivalent exact-artifact metric scale authority', () => {
    const evidence = baseEvidence({
      metricScaleAuthority: {
        ...baseEvidence().metricScaleAuthority,
        exactMetricSupportArtifactBound: false,
      },
    });

    const result =
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(evidence),
      );

    expect(result).toMatchObject({
      exactSameCaptureBindingComplete: true,
      metricScaleAuthorityComplete: false,
      disposition:
        'metric_scale_authority_incomplete',
      nextAction:
        'establish_exact_metric_scale_authority',
    });
  });

  it('requires complete calibrated projection evidence', () => {
    const evidence = baseEvidence({
      calibratedSurface: {
        ...baseEvidence().calibratedSurface!,
        exactRgbToMetricExtrinsicsBound: false,
      },
    });

    const result =
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(evidence),
      );

    expect(result).toMatchObject({
      metricScaleAuthorityComplete: true,
      selectedRegistrationEvidenceComplete: false,
      disposition:
        'registration_evidence_incomplete',
      nextAction:
        'complete_selected_registration_evidence',
    });
  });

  it('requires the visible hairline region itself to be supported by metric geometry', () => {
    const evidence = baseEvidence({
      calibratedSurface: {
        ...baseEvidence().calibratedSurface!,
        visibleHairlineBoundaryToMetricSurfaceCorrespondenceVerified:
          false,
      },
    });

    const result =
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(evidence),
      );

    expect(result).toMatchObject({
      selectedRegistrationEvidenceComplete: true,
      hairlineSupportRegionVerified: false,
      disposition:
        'hairline_support_region_unverified',
      nextAction:
        'verify_visible_hairline_metric_support_region',
    });
  });

  it('admits only execution review after a complete calibrated same-capture evidence bundle', () => {
    const result =
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(),
      );

    expect(result).toMatchObject({
      predecessorReady: true,
      exactSameCaptureBindingComplete: true,
      metricScaleAuthorityComplete: true,
      selectedRegistrationEvidenceComplete: true,
      hairlineSupportRegionVerified: true,
      privateEvidenceRemainedLocal: true,
      disposition:
        'eligible_for_local_hairline_metric_mapping_execution',
      eligibleForLocalHairlineMetricMappingExecution:
        true,
      nextAction:
        'fr317_local_metric_mapping_execution_review',
    });

    expect(result.authorityBoundary).toEqual({
      hairlineMetricCoordinateIssued: false,
      imageToMetricBridgeIssued: false,
      commonFrameComplete: false,
      mixedFrameSpanAuthorized: false,
      threeDivisionsSpanExecutionReady: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('supports an independently validated registration path only with held-out evidence and hairline-region coverage', () => {
    const result =
      assessSameCaptureHairlineRegistrationFR316({
        ...calibratedInput(),
        method:
          'independent_correspondence_registration',
        evidence: independentEvidence(),
      });

    expect(result).toMatchObject({
      method:
        'independent_correspondence_registration',
      selectedRegistrationEvidenceComplete: true,
      hairlineSupportRegionVerified: true,
      disposition:
        'eligible_for_local_hairline_metric_mapping_execution',
    });
  });

  it('blocks independent registration when held-out acceptance fails', () => {
    const evidence = independentEvidence({
      independentRegistration: {
        ...independentEvidence()
          .independentRegistration!,
        acceptanceCriteriaSatisfied: false,
      },
    });

    const result =
      assessSameCaptureHairlineRegistrationFR316({
        ...calibratedInput(),
        method:
          'independent_correspondence_registration',
        evidence,
      });

    expect(result.disposition).toBe(
      'registration_evidence_incomplete',
    );
  });

  it('rejects unrelated AST authority and scale shortcuts', () => {
    expect(() =>
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(
          baseEvidence({
            unrelatedAstRegistrationReceiptUsedAsAuthority:
              true,
          } as never),
        ),
      ),
    ).toThrow(/forbidden registration shortcut/);

    expect(() =>
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(
          baseEvidence({
            faceBoxScaleUsed: true,
          } as never),
        ),
      ),
    ).toThrow(/forbidden registration shortcut/);
  });

  it('rejects unknown-scale fitting and public persistence of private evidence', () => {
    expect(() =>
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(
          baseEvidence({
            metricScaleAuthority: {
              ...baseEvidence().metricScaleAuthority,
              unknownScaleFittingUsed: true,
            },
          } as never),
        ),
      ),
    ).toThrow(/metric scale authority shape drift/);

    expect(() =>
      assessSameCaptureHairlineRegistrationFR316(
        calibratedInput(
          baseEvidence({
            sourceImageDigestPersistedPublicly: true,
          } as never),
        ),
      ),
    ).toThrow(/persistence boundary drift/);
  });

  it('keeps the repository current gate at six of seven and issues no bridge', () => {
    expect(FR316_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      registrationContractImplemented: true,
      realSameCaptureRegistrationEvidenceAvailable:
        false,
      hairlineImageToMetricBridgeIssued: false,
      commonFrameComplete: false,
      actualNeutralReferenceCapabilityCount: 6,
      actualRemainingNeutralReferenceCapabilityCount: 1,
      metricFrameReadyReferenceCapabilityCount: 6,
      remainingMetricFrameBridgeCapabilityCount: 1,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR316Contract()).not.toThrow();
  });
});
