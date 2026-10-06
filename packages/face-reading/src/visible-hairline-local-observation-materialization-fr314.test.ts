import { describe, expect, it } from 'vitest';
import {
  FR314_CURRENT_GATE,
  materializeVisibleHairlineObservationFR314,
  assertFR314CurrentGate,
  type FR314LocalObservationInput,
} from './visible-hairline-local-observation-materialization-fr314.js';
import {
  reviewHairlineModelAdmissionFR313,
  type FR313AdmissionReviewReceipt,
} from './visible-hairline-model-admission-review-fr313.js';
import type {
  FR312ExpandedValidationReceipt,
} from './visible-hairline-expanded-validation-fr312.js';

const expandedValidation: FR312ExpandedValidationReceipt = {
  schemaVersion:
    'fr312-expanded-hairline-validation-receipt-v1',
  contractVersion:
    'FR312-EXPANDED-HAIRLINE-VALIDATION-v1.1',
  authorityState:
    'expanded_engineering_validation_only',
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
  candidateId:
    'candidate.hairline.florence2_base.referring_segmentation.fr306',
  runtimeProviderId: 'microsoft/Florence-2-base',
  exactRevision:
    '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
  runnerContractVersion:
    'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
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
        'fixture:fr314:representative-coverage',
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
        'fixture:fr314:model-behavior',
      ],
    },
  });
}

function localObservation(
  overrides: Partial<FR314LocalObservationInput> = {},
): FR314LocalObservationInput {
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
    sourceImageDigest:
      'local-private-fixture-digest',
    sourceObservationRefs: [
      'local-private-observation-ref',
    ],
    providerFaceOvalUsedAsHairline: false,
    providerFaceMeshTopVerticesUsedAsHairline: false,
    traditionalBindingApplied: false,
    sourceImagePersistedToGit: false,
    boundaryPolylinePersistedToGit: false,
    sourceImageDigestExposedPublicly: false,
    sourceObservationRefsExposedPublicly: false,
    derivedSubjectScalarPersistedPublicly: false,
    ...overrides,
  };
}

describe('FR314 local visible-hairline observation materialization', () => {
  it('fails closed as unavailable when FR313 admission does not exist', () => {
    const result =
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: null,
        localObservation: null,
      });

    expect(result).toEqual({
      schemaVersion:
        'fr314-local-hairline-materialization-result-v1',
      status: 'unavailable',
      reason:
        'fr313_model_admission_not_available',
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
    });
  });

  it('keeps admission without an observation unavailable and invents no fallback', () => {
    const result =
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: null,
      });

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'visible_hairline_observation_unavailable',
      fallbackInvented: false,
      repoSafeReceipt: {
        exactModelRevisionMatched: true,
        visibleObservationMaterialized: false,
        neutralReferenceAvailable: false,
        crossAnchorSpanReady: false,
        commonCoordinateFrameBridgeIssued: false,
      },
    });
  });

  it('materializes the exact FR305 observation and neutral reference only in runtime-local scope', () => {
    const result =
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation(),
      });

    expect(result.status).toBe('available');
    if (result.status !== 'available') {
      throw new Error('expected available');
    }

    expect(result.runtimeOnlyObservation).toMatchObject({
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
      visibilityState:
        'visible_boundary_segment_admitted',
      occlusionHandlingApplied: true,
      hiddenSegmentsCompleted: false,
      providerFaceOvalUsedAsHairline: false,
      providerFaceMeshTopVerticesUsedAsHairline: false,
      traditionalBindingApplied: false,
    });

    expect(
      result.runtimeOnlyVerticalReference,
    ).toMatchObject({
      status: 'available',
      observationRef:
        'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate@0.1.0',
      unit: 'normalized_ratio',
      coordinateFrame:
        'canonical_image_normalized_2d',
      failClosedWhenUnavailable: true,
      crossAnchorSpanReady: false,
      crossAnchorSpanBlocker:
        'common_coordinate_frame_bridge_not_issued',
    });

    expect(
      result.runtimeOnlyVerticalReference.value,
    ).toBeGreaterThanOrEqual(0);
    expect(
      result.runtimeOnlyVerticalReference.value,
    ).toBeLessThanOrEqual(1);

    expect(result.repoSafeReceipt).toEqual({
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
    });

    expect(result.authorityBoundary).toEqual({
      anatomicalHairlineGroundTruthIssued: false,
      traditionalHairlineBindingIssued: false,
      threeDivisionsSpanExecutionReady: false,
      commonCoordinateFrameBridgeIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects hidden completion or prohibited substitutions', () => {
    expect(() =>
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation({
          hiddenSegmentsCompleted: true,
        } as never),
      }),
    ).toThrow(/local observation authority\/model boundary drift/);

    expect(() =>
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation({
          providerFaceOvalUsedAsHairline: true,
        } as never),
      }),
    ).toThrow(/local observation authority\/model boundary drift/);
  });

  it('rejects degenerate or out-of-range boundary geometry through FR305', () => {
    expect(() =>
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation({
          boundaryPolyline: [
            { x: 0.4, y: 0.2 },
            { x: 0.4, y: 0.2 },
          ],
        }),
      }),
    ).toThrow(/degenerate segment/);

    expect(() =>
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation({
          boundaryPolyline: [
            { x: -0.1, y: 0.2 },
            { x: 0.4, y: 0.3 },
          ],
        }),
      }),
    ).toThrow(/within \[0,1\]/);
  });

  it('rejects exact model/revision drift', () => {
    expect(() =>
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation({
          modelRevision: 'different-revision',
        } as never),
      }),
    ).toThrow(/local observation authority\/model boundary drift/);
  });

  it('keeps private observation material outside public persistence', () => {
    expect(() =>
      materializeVisibleHairlineObservationFR314({
        schemaVersion:
          'fr314-local-hairline-materialization-input-v1',
        admissionReview: admittedReview(),
        localObservation: localObservation({
          sourceImageDigestExposedPublicly: true,
        } as never),
      }),
    ).toThrow(/persistence\/privacy boundary drift/);
  });

  it('keeps the repository current gate unmaterialized until real admission and observation exist', () => {
    expect(FR314_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      observationMaterializerImplemented: true,
      fr313AdmissionAvailable: false,
      realVisibleHairlineObservationMaterialized: false,
      neutralVisibleHairlineReferenceMaterialized: false,
      handoffReadyNeutralReferenceCapabilityCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      commonCoordinateFrameBridgeIssued: false,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR314CurrentGate()).not.toThrow();
  });
});
