import {
  assertHairlineModelAdmissionReceiptFR305,
  type FR305HairlineModelAdmissionReceipt,
} from './visible-hairline-vertical-reference-fr305.js';
import {
  FR307_PRIMARY_MODEL,
} from './visible-hairline-empirical-runner-fr307.js';
import {
  FR312_CURRENT_GATE,
  FR312_EXPANDED_HAIRLINE_VALIDATION_CONTRACT_VERSION,
  type FR312ExpandedValidationReceipt,
} from './visible-hairline-expanded-validation-fr312.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION =
  'FR313-HAIRLINE-MODEL-ADMISSION-REVIEW-v1' as const;

export interface FR313RepresentativeCoverageAssessment {
  readonly schemaVersion:
    'fr313-representative-ordinary-rgb-coverage-assessment-v1';
  readonly humanReviewCompleted: true;
  readonly protocolFrozenBeforeFinalEvaluation: boolean;
  readonly ordinaryRgbSelfieCaptureOnly: boolean;
  readonly multipleIndependentSubjectsAttested: boolean;
  readonly multipleIndependentSessionsAttested: boolean;
  readonly multipleDeviceCameraContextsRepresented: boolean;
  readonly naturalHairVariationRepresented: boolean;
  readonly naturalBackgroundVariationRepresented: boolean;
  readonly naturalIlluminationVariationRepresented: boolean;
  readonly unobstructedVisibilityRepresented: boolean;
  readonly occludedVisibilityRepresented: boolean;
  readonly syntheticOnlyEvidenceUsed: false;
  readonly derivedImageOnlyEvidenceUsed: false;
  readonly demographicAttributesCollected: false;
  readonly demographicInferenceUsed: false;
  readonly subjectIdentitiesExposed: false;
  readonly publicRawOrReconstructiveEvidenceExposed: false;
  readonly aggregateEvidenceRefs:
    readonly string[];
  readonly humanReviewerDeterminedCoverageRepresentativeForOrdinaryRgbSelfies:
    boolean;
}

export interface FR313ModelBehaviorAssessment {
  readonly schemaVersion:
    'fr313-hairline-model-behavior-assessment-v1';
  readonly humanReviewCompleted: true;
  readonly visibleHairSkinBoundaryValidated: boolean;
  readonly visibilityHandlingValidated: boolean;
  readonly occlusionHandlingValidated: boolean;
  readonly hiddenHairlineCompletionObserved: boolean;
  readonly faceOvalSubstitutionObserved: boolean;
  readonly faceMeshTopVertexSubstitutionObserved: boolean;
  readonly publicRawOrReconstructiveEvidenceExposed: false;
  readonly aggregateEvidenceRefs:
    readonly string[];
}

export interface FR313AdmissionReviewInput {
  readonly schemaVersion:
    'fr313-hairline-model-admission-review-input-v1';
  readonly expandedValidation:
    FR312ExpandedValidationReceipt;
  readonly modelId: typeof FR307_PRIMARY_MODEL.id;
  readonly modelRevision:
    typeof FR307_PRIMARY_MODEL.revision;
  readonly representativeCoverage:
    FR313RepresentativeCoverageAssessment;
  readonly modelBehavior:
    FR313ModelBehaviorAssessment;
}

export type FR313Disposition =
  | 'blocked_representative_coverage_gap'
  | 'rejected_model_candidate'
  | 'admitted_for_neutral_visible_hair_skin_boundary_runtime';

export type FR313FailureReason =
  | 'FR312_MODEL_ADMISSION_REVIEW_ELIGIBILITY_MISSING'
  | 'REPRESENTATIVE_PROTOCOL_NOT_FROZEN'
  | 'NON_ORDINARY_RGB_CAPTURE_INCLUDED'
  | 'MULTIPLE_INDEPENDENT_SUBJECTS_NOT_ATTESTED'
  | 'MULTIPLE_INDEPENDENT_SESSIONS_NOT_ATTESTED'
  | 'MULTIPLE_DEVICE_CAMERA_CONTEXTS_NOT_REPRESENTED'
  | 'HAIR_VARIATION_NOT_REPRESENTED'
  | 'BACKGROUND_VARIATION_NOT_REPRESENTED'
  | 'ILLUMINATION_VARIATION_NOT_REPRESENTED'
  | 'UNOBSTRUCTED_VISIBILITY_NOT_REPRESENTED'
  | 'OCCLUDED_VISIBILITY_NOT_REPRESENTED'
  | 'REPRESENTATIVE_HUMAN_REVIEW_NOT_SATISFIED'
  | 'VISIBLE_HAIR_SKIN_BOUNDARY_NOT_VALIDATED'
  | 'VISIBILITY_HANDLING_NOT_VALIDATED'
  | 'OCCLUSION_HANDLING_NOT_VALIDATED'
  | 'HIDDEN_HAIRLINE_COMPLETION_OBSERVED'
  | 'FACE_OVAL_SUBSTITUTION_OBSERVED'
  | 'FACE_MESH_TOP_VERTEX_SUBSTITUTION_OBSERVED';

export interface FR313AdmissionReviewReceipt {
  readonly schemaVersion:
    'fr313-hairline-model-admission-review-receipt-v1';
  readonly contractVersion:
    typeof FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION;
  readonly authorityState:
    'hairline_model_admission_review_only';
  readonly disposition: FR313Disposition;
  readonly failureReasons:
    readonly FR313FailureReason[];
  readonly representativeCoverageValidated: boolean;
  readonly modelBehaviorValidated: boolean;
  readonly fr305AdmissionReceiptIssued: boolean;
  readonly fr305AdmissionReceipt:
    | FR305HairlineModelAdmissionReceipt
    | null;
  readonly admittedHairlineRuntimeProviders:
    0 | 1;
  readonly neutralReferenceCapabilityReadyCount:
    6 | 7;
  readonly remainingNeutralReferenceCapabilityCount:
    1 | 0;
  readonly threeDivisionsSpanExecutionReady: false;
  readonly productMaterializedCount: 18;
  readonly traditionalBindingAdmittedCount: 0;
  readonly productionActivated: false;
  readonly commerceActivated: false;
  readonly nextAction:
    | 'collect_representative_ordinary_rgb_coverage_without_demographic_inference'
    | 'evaluate_fr306_fallback_candidate'
    | 'materialize_first_real_visible_hairline_observation_then_review_common_frame_bridge';
}

export const FR313_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr313-hairline-model-admission-review-gate-v1' as const,
  contractVersion:
    FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  admissionReviewImplemented: true as const,
  admissionReviewExecuted: false as const,
  representativeCoverageValidated: false as const,
  fr305AdmissionReceiptIssued: false as const,
  admittedHairlineRuntimeProviders: 0 as const,
  handoffReadyNeutralReferenceCapabilityCount: 6 as const,
  remainingNeutralReferenceCapabilityCount: 1 as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'await_real_fr312_eligible_receipt_and_separate_representative_coverage_evidence_before_fr313_execution' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-313 ${message}`,
  );
}

function assertRefs(
  refs: readonly string[],
  label: string,
): void {
  if (refs.length === 0) {
    fail(`${label} must be non-empty.`);
  }

  const normalized = refs.map((ref) => ref.trim());
  if (normalized.some((ref) => ref.length === 0)) {
    fail(`${label} must not contain empty refs.`);
  }
  if (new Set(normalized).size !== normalized.length) {
    fail(`${label} must contain unique refs.`);
  }
}

function assertExpandedValidationPrerequisite(
  receipt: FR312ExpandedValidationReceipt,
): void {
  if (
    receipt.schemaVersion !==
      'fr312-expanded-hairline-validation-receipt-v1' ||
    receipt.contractVersion !==
      FR312_EXPANDED_HAIRLINE_VALIDATION_CONTRACT_VERSION ||
    receipt.authorityState !==
      'expanded_engineering_validation_only' ||
    receipt.disposition !==
      'eligible_for_model_admission_review' ||
    receipt.hardRejectTriggered !== false ||
    receipt.repeatRequired !== false ||
    receipt.modelAdmissionReviewEligible !== true ||
    receipt.captureCount < 12 ||
    receipt.distinctSessionCount < 3 ||
    receipt.eachCaseHasAtLeastTwoIndependentCaptures !== true ||
    receipt.representativeOrdinaryRgbReady !== false ||
    receipt.representativeCoverageReviewRequired !== true ||
    receipt.exactModelRevisionBound !== true ||
    receipt.deidentifiedBoundarySatisfied !== true ||
    receipt.nextAction !==
      'design_fr313_model_admission_review_with_representative_coverage_gap' ||
    receipt.authorityBoundary.fr305AdmissionReceiptIssued !== false ||
    receipt.authorityBoundary
      .validatedHairlineRuntimeProviderAdmitted !== false ||
    receipt.authorityBoundary
      .neutralRuntimeHairlineObservationAuthorized !== false ||
    receipt.authorityBoundary
      .traditionalHairlineBindingIssued !== false ||
    receipt.authorityBoundary
      .threeDivisionsSpanExecutionReady !== false ||
    receipt.authorityBoundary.productColumnMaterialized !== false ||
    receipt.authorityBoundary.productionActivated !== false ||
    receipt.authorityBoundary.commerceActivated !== false
  ) {
    fail('FR312 model-admission-review prerequisite not satisfied.');
  }
}

function assertCoverageShape(
  coverage: FR313RepresentativeCoverageAssessment,
): void {
  if (
    coverage.schemaVersion !==
      'fr313-representative-ordinary-rgb-coverage-assessment-v1' ||
    coverage.humanReviewCompleted !== true ||
    coverage.syntheticOnlyEvidenceUsed !== false ||
    coverage.derivedImageOnlyEvidenceUsed !== false ||
    coverage.demographicAttributesCollected !== false ||
    coverage.demographicInferenceUsed !== false ||
    coverage.subjectIdentitiesExposed !== false ||
    coverage.publicRawOrReconstructiveEvidenceExposed !== false
  ) {
    fail('representative coverage privacy/review boundary drift.');
  }
  assertRefs(
    coverage.aggregateEvidenceRefs,
    'representativeCoverage.aggregateEvidenceRefs',
  );
}

function assertBehaviorShape(
  behavior: FR313ModelBehaviorAssessment,
): void {
  if (
    behavior.schemaVersion !==
      'fr313-hairline-model-behavior-assessment-v1' ||
    behavior.humanReviewCompleted !== true ||
    behavior.publicRawOrReconstructiveEvidenceExposed !== false
  ) {
    fail('model behavior review/privacy boundary drift.');
  }
  assertRefs(
    behavior.aggregateEvidenceRefs,
    'modelBehavior.aggregateEvidenceRefs',
  );
}

function uniqueRefs(
  ...groups: readonly (readonly string[])[]
): readonly string[] {
  return Object.freeze([
    ...new Set(
      groups.flatMap((group) =>
        group.map((ref) => ref.trim()),
      ),
    ),
  ]);
}

export function reviewHairlineModelAdmissionFR313(
  input: FR313AdmissionReviewInput,
): FR313AdmissionReviewReceipt {
  if (
    input.schemaVersion !==
      'fr313-hairline-model-admission-review-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }

  assertExpandedValidationPrerequisite(
    input.expandedValidation,
  );

  if (
    input.modelId !== FR307_PRIMARY_MODEL.id ||
    input.modelRevision !== FR307_PRIMARY_MODEL.revision
  ) {
    fail('exact model identity/revision mismatch.');
  }

  assertCoverageShape(input.representativeCoverage);
  assertBehaviorShape(input.modelBehavior);

  const coverage =
    input.representativeCoverage;
  const behavior = input.modelBehavior;
  const reasons: FR313FailureReason[] = [];

  if (!coverage.protocolFrozenBeforeFinalEvaluation) {
    reasons.push(
      'REPRESENTATIVE_PROTOCOL_NOT_FROZEN',
    );
  }
  if (!coverage.ordinaryRgbSelfieCaptureOnly) {
    reasons.push(
      'NON_ORDINARY_RGB_CAPTURE_INCLUDED',
    );
  }
  if (!coverage.multipleIndependentSubjectsAttested) {
    reasons.push(
      'MULTIPLE_INDEPENDENT_SUBJECTS_NOT_ATTESTED',
    );
  }
  if (!coverage.multipleIndependentSessionsAttested) {
    reasons.push(
      'MULTIPLE_INDEPENDENT_SESSIONS_NOT_ATTESTED',
    );
  }
  if (
    !coverage.multipleDeviceCameraContextsRepresented
  ) {
    reasons.push(
      'MULTIPLE_DEVICE_CAMERA_CONTEXTS_NOT_REPRESENTED',
    );
  }
  if (!coverage.naturalHairVariationRepresented) {
    reasons.push(
      'HAIR_VARIATION_NOT_REPRESENTED',
    );
  }
  if (!coverage.naturalBackgroundVariationRepresented) {
    reasons.push(
      'BACKGROUND_VARIATION_NOT_REPRESENTED',
    );
  }
  if (
    !coverage.naturalIlluminationVariationRepresented
  ) {
    reasons.push(
      'ILLUMINATION_VARIATION_NOT_REPRESENTED',
    );
  }
  if (!coverage.unobstructedVisibilityRepresented) {
    reasons.push(
      'UNOBSTRUCTED_VISIBILITY_NOT_REPRESENTED',
    );
  }
  if (!coverage.occludedVisibilityRepresented) {
    reasons.push(
      'OCCLUDED_VISIBILITY_NOT_REPRESENTED',
    );
  }
  if (
    !coverage
      .humanReviewerDeterminedCoverageRepresentativeForOrdinaryRgbSelfies
  ) {
    reasons.push(
      'REPRESENTATIVE_HUMAN_REVIEW_NOT_SATISFIED',
    );
  }

  const representativeCoverageValidated =
    reasons.length === 0;

  const behaviorFailureReasons:
    FR313FailureReason[] = [];

  if (!behavior.visibleHairSkinBoundaryValidated) {
    behaviorFailureReasons.push(
      'VISIBLE_HAIR_SKIN_BOUNDARY_NOT_VALIDATED',
    );
  }
  if (!behavior.visibilityHandlingValidated) {
    behaviorFailureReasons.push(
      'VISIBILITY_HANDLING_NOT_VALIDATED',
    );
  }
  if (!behavior.occlusionHandlingValidated) {
    behaviorFailureReasons.push(
      'OCCLUSION_HANDLING_NOT_VALIDATED',
    );
  }
  if (behavior.hiddenHairlineCompletionObserved) {
    behaviorFailureReasons.push(
      'HIDDEN_HAIRLINE_COMPLETION_OBSERVED',
    );
  }
  if (behavior.faceOvalSubstitutionObserved) {
    behaviorFailureReasons.push(
      'FACE_OVAL_SUBSTITUTION_OBSERVED',
    );
  }
  if (behavior.faceMeshTopVertexSubstitutionObserved) {
    behaviorFailureReasons.push(
      'FACE_MESH_TOP_VERTEX_SUBSTITUTION_OBSERVED',
    );
  }

  const modelBehaviorValidated =
    behaviorFailureReasons.length === 0;

  const combinedReasons = Object.freeze([
    ...new Set([
      ...reasons,
      ...behaviorFailureReasons,
    ]),
  ]);

  if (!modelBehaviorValidated) {
    return Object.freeze({
      schemaVersion:
        'fr313-hairline-model-admission-review-receipt-v1' as const,
      contractVersion:
        FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION,
      authorityState:
        'hairline_model_admission_review_only' as const,
      disposition:
        'rejected_model_candidate' as const,
      failureReasons: combinedReasons,
      representativeCoverageValidated,
      modelBehaviorValidated: false as const,
      fr305AdmissionReceiptIssued: false as const,
      fr305AdmissionReceipt: null,
      admittedHairlineRuntimeProviders: 0 as const,
      neutralReferenceCapabilityReadyCount: 6 as const,
      remainingNeutralReferenceCapabilityCount: 1 as const,
      threeDivisionsSpanExecutionReady: false as const,
      productMaterializedCount: 18 as const,
      traditionalBindingAdmittedCount: 0 as const,
      productionActivated: false as const,
      commerceActivated: false as const,
      nextAction:
        'evaluate_fr306_fallback_candidate' as const,
    });
  }

  if (!representativeCoverageValidated) {
    return Object.freeze({
      schemaVersion:
        'fr313-hairline-model-admission-review-receipt-v1' as const,
      contractVersion:
        FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION,
      authorityState:
        'hairline_model_admission_review_only' as const,
      disposition:
        'blocked_representative_coverage_gap' as const,
      failureReasons: combinedReasons,
      representativeCoverageValidated: false as const,
      modelBehaviorValidated: true as const,
      fr305AdmissionReceiptIssued: false as const,
      fr305AdmissionReceipt: null,
      admittedHairlineRuntimeProviders: 0 as const,
      neutralReferenceCapabilityReadyCount: 6 as const,
      remainingNeutralReferenceCapabilityCount: 1 as const,
      threeDivisionsSpanExecutionReady: false as const,
      productMaterializedCount: 18 as const,
      traditionalBindingAdmittedCount: 0 as const,
      productionActivated: false as const,
      commerceActivated: false as const,
      nextAction:
        'collect_representative_ordinary_rgb_coverage_without_demographic_inference' as const,
    });
  }

  const validationEvidenceRefs = uniqueRefs(
    coverage.aggregateEvidenceRefs,
    behavior.aggregateEvidenceRefs,
  );
  assertRefs(
    validationEvidenceRefs,
    'validationEvidenceRefs',
  );

  const admissionReceipt:
    FR305HairlineModelAdmissionReceipt =
    Object.freeze({
      schemaVersion:
        'fr305-hairline-model-admission-receipt-v1' as const,
      authorityState:
        'validated_visible_hair_skin_boundary_model_only' as const,
      modelId: input.modelId,
      exactRevision: input.modelRevision,
      targetClass:
        'visible_hair_skin_boundary_segmentation' as const,
      coordinateFrame:
        'canonical_image_normalized_2d' as const,
      axisConvention:
        'x_right_y_down_unit_square' as const,
      representativeOrdinaryRgbSelfiesValidated:
        true as const,
      visibleHairSkinBoundaryValidated: true as const,
      visibilityHandlingValidated: true as const,
      occlusionHandlingValidated: true as const,
      hiddenHairlineCompletionAllowed: false as const,
      faceOvalSubstitutionAllowed: false as const,
      faceMeshTopVertexSubstitutionAllowed: false as const,
      validationEvidenceRefs,
      runtimeProviderAdmitted: true as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    });

  assertHairlineModelAdmissionReceiptFR305(
    admissionReceipt,
  );

  return Object.freeze({
    schemaVersion:
      'fr313-hairline-model-admission-review-receipt-v1' as const,
    contractVersion:
      FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION,
    authorityState:
      'hairline_model_admission_review_only' as const,
    disposition:
      'admitted_for_neutral_visible_hair_skin_boundary_runtime' as const,
    failureReasons: Object.freeze([]),
    representativeCoverageValidated: true as const,
    modelBehaviorValidated: true as const,
    fr305AdmissionReceiptIssued: true as const,
    fr305AdmissionReceipt: admissionReceipt,
    admittedHairlineRuntimeProviders: 1 as const,
    neutralReferenceCapabilityReadyCount: 7 as const,
    remainingNeutralReferenceCapabilityCount: 0 as const,
    threeDivisionsSpanExecutionReady: false as const,
    productMaterializedCount: 18 as const,
    traditionalBindingAdmittedCount: 0 as const,
    productionActivated: false as const,
    commerceActivated: false as const,
    nextAction:
      'materialize_first_real_visible_hairline_observation_then_review_common_frame_bridge' as const,
  });
}

export function assertFR313CurrentGate(): void {
  const gate = FR313_CURRENT_GATE;
  if (
    FR312_CURRENT_GATE
      .expandedValidationExecuted !== false ||
    FR312_CURRENT_GATE
      .modelAdmissionReviewEligible !== false ||
    gate.parentIssue !== 1521 ||
    gate.admissionReviewImplemented !== true ||
    gate.admissionReviewExecuted !== false ||
    gate.representativeCoverageValidated !== false ||
    gate.fr305AdmissionReceiptIssued !== false ||
    gate.admittedHairlineRuntimeProviders !== 0 ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 6 ||
    gate.remainingNeutralReferenceCapabilityCount !== 1 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR313CurrentGate();
