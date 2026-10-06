import { describe, expect, it } from 'vitest';
import {
  FR313_CURRENT_GATE,
  reviewHairlineModelAdmissionFR313,
  assertFR313CurrentGate,
  type FR313ModelBehaviorAssessment,
  type FR313RepresentativeCoverageAssessment,
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
  subjectCoverage: 'single_subject',
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

function coverage(
  overrides: Partial<FR313RepresentativeCoverageAssessment> = {},
): FR313RepresentativeCoverageAssessment {
  return {
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
      'evidence:fr313:representative-ordinary-rgb:v1',
    ],
    humanReviewerDeterminedCoverageRepresentativeForOrdinaryRgbSelfies:
      true,
    ...overrides,
  };
}

function behavior(
  overrides: Partial<FR313ModelBehaviorAssessment> = {},
): FR313ModelBehaviorAssessment {
  return {
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
      'evidence:fr313:model-behavior:v1',
    ],
    ...overrides,
  };
}

function input(
  representativeCoverage:
    FR313RepresentativeCoverageAssessment,
  modelBehavior:
    FR313ModelBehaviorAssessment = behavior(),
) {
  return {
    schemaVersion:
      'fr313-hairline-model-admission-review-input-v1' as const,
    expandedValidation,
    modelId: 'microsoft/Florence-2-base' as const,
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
    representativeCoverage,
    modelBehavior,
  };
}

describe('FR313 visible hairline model admission review', () => {
  it('blocks admission when representative ordinary-RGB coverage is incomplete', () => {
    const result = reviewHairlineModelAdmissionFR313(
      input(
        coverage({
          multipleIndependentSubjectsAttested: false,
          multipleDeviceCameraContextsRepresented: false,
          humanReviewerDeterminedCoverageRepresentativeForOrdinaryRgbSelfies:
            false,
        }),
      ),
    );

    expect(result).toMatchObject({
      disposition:
        'blocked_representative_coverage_gap',
      representativeCoverageValidated: false,
      modelBehaviorValidated: true,
      fr305AdmissionReceiptIssued: false,
      fr305AdmissionReceipt: null,
      admittedHairlineRuntimeProviders: 0,
      neutralReferenceCapabilityReadyCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      traditionalBindingAdmittedCount: 0,
      productionActivated: false,
      commerceActivated: false,
      nextAction:
        'collect_representative_ordinary_rgb_coverage_without_demographic_inference',
    });

    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'MULTIPLE_INDEPENDENT_SUBJECTS_NOT_ATTESTED',
        'MULTIPLE_DEVICE_CAMERA_CONTEXTS_NOT_REPRESENTED',
        'REPRESENTATIVE_HUMAN_REVIEW_NOT_SATISFIED',
      ]),
    );
  });

  it('rejects the model candidate when visible-boundary behavior is not validated', () => {
    const result = reviewHairlineModelAdmissionFR313(
      input(
        coverage(),
        behavior({
          visibleHairSkinBoundaryValidated: false,
          hiddenHairlineCompletionObserved: true,
        }),
      ),
    );

    expect(result).toMatchObject({
      disposition: 'rejected_model_candidate',
      representativeCoverageValidated: true,
      modelBehaviorValidated: false,
      fr305AdmissionReceiptIssued: false,
      admittedHairlineRuntimeProviders: 0,
      neutralReferenceCapabilityReadyCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      nextAction: 'evaluate_fr306_fallback_candidate',
    });

    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'VISIBLE_HAIR_SKIN_BOUNDARY_NOT_VALIDATED',
        'HIDDEN_HAIRLINE_COMPLETION_OBSERVED',
      ]),
    );
  });

  it('rejects face-oval or face-mesh substitution as model behavior failure', () => {
    const result = reviewHairlineModelAdmissionFR313(
      input(
        coverage(),
        behavior({
          faceOvalSubstitutionObserved: true,
          faceMeshTopVertexSubstitutionObserved: true,
        }),
      ),
    );

    expect(result.disposition).toBe(
      'rejected_model_candidate',
    );
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'FACE_OVAL_SUBSTITUTION_OBSERVED',
        'FACE_MESH_TOP_VERTEX_SUBSTITUTION_OBSERVED',
      ]),
    );
  });

  it('issues the exact FR305 admission receipt only after coverage and behavior both validate', () => {
    const result = reviewHairlineModelAdmissionFR313(
      input(coverage(), behavior()),
    );

    expect(result).toMatchObject({
      disposition:
        'admitted_for_neutral_visible_hair_skin_boundary_runtime',
      failureReasons: [],
      representativeCoverageValidated: true,
      modelBehaviorValidated: true,
      fr305AdmissionReceiptIssued: true,
      admittedHairlineRuntimeProviders: 1,
      neutralReferenceCapabilityReadyCount: 7,
      remainingNeutralReferenceCapabilityCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      traditionalBindingAdmittedCount: 0,
      productionActivated: false,
      commerceActivated: false,
      nextAction:
        'materialize_first_real_visible_hairline_observation_then_review_common_frame_bridge',
    });

    expect(result.fr305AdmissionReceipt).toEqual({
      schemaVersion:
        'fr305-hairline-model-admission-receipt-v1',
      authorityState:
        'validated_visible_hair_skin_boundary_model_only',
      modelId: 'microsoft/Florence-2-base',
      exactRevision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      targetClass:
        'visible_hair_skin_boundary_segmentation',
      coordinateFrame:
        'canonical_image_normalized_2d',
      axisConvention:
        'x_right_y_down_unit_square',
      representativeOrdinaryRgbSelfiesValidated: true,
      visibleHairSkinBoundaryValidated: true,
      visibilityHandlingValidated: true,
      occlusionHandlingValidated: true,
      hiddenHairlineCompletionAllowed: false,
      faceOvalSubstitutionAllowed: false,
      faceMeshTopVertexSubstitutionAllowed: false,
      validationEvidenceRefs: [
        'evidence:fr313:representative-ordinary-rgb:v1',
        'evidence:fr313:model-behavior:v1',
      ],
      runtimeProviderAdmitted: true,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('does not convert 7-of-7 neutral reference capability into Three-Divisions span authority', () => {
    const result = reviewHairlineModelAdmissionFR313(
      input(coverage(), behavior()),
    );

    expect(
      result.neutralReferenceCapabilityReadyCount,
    ).toBe(7);
    expect(
      result.remainingNeutralReferenceCapabilityCount,
    ).toBe(0);
    expect(
      result.threeDivisionsSpanExecutionReady,
    ).toBe(false);
    expect(
      result.traditionalBindingAdmittedCount,
    ).toBe(0);
    expect(result.productMaterializedCount).toBe(18);
  });

  it('rejects exact model revision mismatch before review', () => {
    const base = input(coverage(), behavior());

    expect(() =>
      reviewHairlineModelAdmissionFR313({
        ...base,
        modelRevision: 'different-revision',
      } as never),
    ).toThrow(/exact model identity\/revision mismatch/);
  });

  it('keeps demographic inference and exposed identities outside the coverage contract', () => {
    expect(() =>
      reviewHairlineModelAdmissionFR313(
        input(
          coverage({
            demographicInferenceUsed: true,
          } as never),
        ),
      ),
    ).toThrow(
      /representative coverage privacy\/review boundary drift/,
    );

    expect(() =>
      reviewHairlineModelAdmissionFR313(
        input(
          coverage({
            subjectIdentitiesExposed: true,
          } as never),
        ),
      ),
    ).toThrow(
      /representative coverage privacy\/review boundary drift/,
    );
  });

  it('requires non-empty unique aggregate evidence refs', () => {
    expect(() =>
      reviewHairlineModelAdmissionFR313(
        input(
          coverage({
            aggregateEvidenceRefs: [],
          }),
        ),
      ),
    ).toThrow(/must be non-empty/);

    expect(() =>
      reviewHairlineModelAdmissionFR313(
        input(
          coverage({
            aggregateEvidenceRefs: [
              'same-ref',
              'same-ref',
            ],
          }),
        ),
      ),
    ).toThrow(/must contain unique refs/);
  });

  it('keeps the repository current gate unadmitted until real evidence exists', () => {
    expect(FR313_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      admissionReviewImplemented: true,
      admissionReviewExecuted: false,
      representativeCoverageValidated: false,
      fr305AdmissionReceiptIssued: false,
      admittedHairlineRuntimeProviders: 0,
      handoffReadyNeutralReferenceCapabilityCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR313CurrentGate()).not.toThrow();
  });
});
