import {
  deriveVisibleHairlineVerticalReferenceFR305,
  type FR305CanonicalImageNormalizedPoint2D,
  type FR305HairlineModelAdmissionReceipt,
  type FR305VisibleHairlineObservation,
  type FR305VisibleHairlineVerticalReference,
} from './visible-hairline-vertical-reference-fr305.js';
import {
  FR307_PRIMARY_MODEL,
} from './visible-hairline-empirical-runner-fr307.js';
import {
  FR313_CURRENT_GATE,
  FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION,
  type FR313AdmissionReviewReceipt,
} from './visible-hairline-model-admission-review-fr313.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR314_LOCAL_HAIRLINE_OBSERVATION_MATERIALIZATION_CONTRACT_VERSION =
  'FR314-LOCAL-HAIRLINE-OBSERVATION-MATERIALIZATION-v1' as const;

export interface FR314LocalObservationInput {
  readonly schemaVersion:
    'fr314-local-visible-hairline-observation-input-v1';
  readonly modelId: typeof FR307_PRIMARY_MODEL.id;
  readonly modelRevision:
    typeof FR307_PRIMARY_MODEL.revision;
  readonly boundaryPolyline:
    readonly FR305CanonicalImageNormalizedPoint2D[];
  readonly visibilityState:
    'visible_boundary_segment_admitted';
  readonly occlusionHandlingApplied: true;
  readonly hiddenSegmentsCompleted: false;
  readonly sourceImageDigest: string;
  readonly sourceObservationRefs:
    readonly string[];
  readonly providerFaceOvalUsedAsHairline: false;
  readonly providerFaceMeshTopVerticesUsedAsHairline: false;
  readonly traditionalBindingApplied: false;
  readonly sourceImagePersistedToGit: false;
  readonly boundaryPolylinePersistedToGit: false;
  readonly sourceImageDigestExposedPublicly: false;
  readonly sourceObservationRefsExposedPublicly: false;
  readonly derivedSubjectScalarPersistedPublicly: false;
}

export interface FR314MaterializationInput {
  readonly schemaVersion:
    'fr314-local-hairline-materialization-input-v1';
  readonly admissionReview:
    FR313AdmissionReviewReceipt | null;
  readonly localObservation:
    FR314LocalObservationInput | null;
}

export interface FR314RepoSafeReceipt {
  readonly schemaVersion:
    'fr314-repo-safe-hairline-materialization-receipt-v1';
  readonly contractVersion:
    typeof FR314_LOCAL_HAIRLINE_OBSERVATION_MATERIALIZATION_CONTRACT_VERSION;
  readonly exactModelRevisionMatched: boolean;
  readonly visibleObservationMaterialized: boolean;
  readonly neutralReferenceAvailable: boolean;
  readonly hiddenCompletionAbsent: boolean;
  readonly prohibitedSubstitutionAbsent: boolean;
  readonly sourceImagePubliclyPersisted: false;
  readonly boundaryPolylinePubliclyPersisted: false;
  readonly sourceImageDigestPubliclyPersisted: false;
  readonly sourceObservationRefsPubliclyPersisted: false;
  readonly derivedSubjectScalarPubliclyPersisted: false;
  readonly crossAnchorSpanReady: false;
  readonly commonCoordinateFrameBridgeIssued: false;
}

export type FR314MaterializationResult =
  | Readonly<{
      schemaVersion:
        'fr314-local-hairline-materialization-result-v1';
      status: 'unavailable';
      reason:
        | 'fr313_model_admission_not_available'
        | 'visible_hairline_observation_unavailable';
      fallbackInvented: false;
      repoSafeReceipt: FR314RepoSafeReceipt;
    }>
  | Readonly<{
      schemaVersion:
        'fr314-local-hairline-materialization-result-v1';
      status: 'available';
      authorityState:
        'local_ephemeral_neutral_visible_hairline_observation_only';
      runtimeOnlyObservation:
        FR305VisibleHairlineObservation;
      runtimeOnlyVerticalReference:
        Extract<
          FR305VisibleHairlineVerticalReference,
          { readonly status: 'available' }
        >;
      repoSafeReceipt: FR314RepoSafeReceipt;
      authorityBoundary: {
        readonly anatomicalHairlineGroundTruthIssued: false;
        readonly traditionalHairlineBindingIssued: false;
        readonly threeDivisionsSpanExecutionReady: false;
        readonly commonCoordinateFrameBridgeIssued: false;
        readonly productColumnMaterialized: false;
        readonly productionActivated: false;
        readonly commerceActivated: false;
      };
    }>;

export const FR314_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr314-local-hairline-observation-materialization-gate-v1' as const,
  contractVersion:
    FR314_LOCAL_HAIRLINE_OBSERVATION_MATERIALIZATION_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  observationMaterializerImplemented: true as const,
  fr313AdmissionAvailable: false as const,
  realVisibleHairlineObservationMaterialized: false as const,
  neutralVisibleHairlineReferenceMaterialized: false as const,
  handoffReadyNeutralReferenceCapabilityCount: 6 as const,
  remainingNeutralReferenceCapabilityCount: 1 as const,
  commonCoordinateFrameBridgeIssued: false as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'await_real_fr313_admission_then_run_local_fr314_materialization_before_fr315_common_frame_bridge_review' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-314 ${message}`,
  );
}

function nonEmpty(
  value: string,
  label: string,
): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    fail(`${label} must be non-empty.`);
  }
  return trimmed;
}

function assertUniqueRefs(
  refs: readonly string[],
  label: string,
): void {
  if (refs.length === 0) {
    fail(`${label} must be non-empty.`);
  }

  const normalized = refs.map((ref) =>
    nonEmpty(ref, label),
  );
  if (new Set(normalized).size !== normalized.length) {
    fail(`${label} must contain unique refs.`);
  }
}

function admittedFR305Receipt(
  review: FR313AdmissionReviewReceipt | null,
): FR305HairlineModelAdmissionReceipt | null {
  if (review == null) {
    return null;
  }

  if (
    review.schemaVersion !==
      'fr313-hairline-model-admission-review-receipt-v1' ||
    review.contractVersion !==
      FR313_HAIRLINE_MODEL_ADMISSION_REVIEW_CONTRACT_VERSION
  ) {
    fail('FR313 admission-review receipt identity drift.');
  }

  if (
    review.disposition !==
      'admitted_for_neutral_visible_hair_skin_boundary_runtime'
  ) {
    if (
      review.fr305AdmissionReceiptIssued !== false ||
      review.fr305AdmissionReceipt !== null ||
      review.admittedHairlineRuntimeProviders !== 0 ||
      review.neutralReferenceCapabilityReadyCount !== 6 ||
      review.remainingNeutralReferenceCapabilityCount !== 1
    ) {
      fail('non-admitted FR313 receipt widened hairline authority.');
    }
    return null;
  }

  if (
    review.representativeCoverageValidated !== true ||
    review.modelBehaviorValidated !== true ||
    review.fr305AdmissionReceiptIssued !== true ||
    review.fr305AdmissionReceipt == null ||
    review.admittedHairlineRuntimeProviders !== 1 ||
    review.neutralReferenceCapabilityReadyCount !== 7 ||
    review.remainingNeutralReferenceCapabilityCount !== 0 ||
    review.threeDivisionsSpanExecutionReady !== false ||
    review.productMaterializedCount !== 18 ||
    review.traditionalBindingAdmittedCount !== 0 ||
    review.productionActivated !== false ||
    review.commerceActivated !== false
  ) {
    fail('admitted FR313 receipt boundary drift.');
  }

  return review.fr305AdmissionReceipt;
}

function repoSafeReceipt(
  exactModelRevisionMatched: boolean,
  visibleObservationMaterialized: boolean,
  neutralReferenceAvailable: boolean,
  hiddenCompletionAbsent: boolean,
  prohibitedSubstitutionAbsent: boolean,
): FR314RepoSafeReceipt {
  return Object.freeze({
    schemaVersion:
      'fr314-repo-safe-hairline-materialization-receipt-v1' as const,
    contractVersion:
      FR314_LOCAL_HAIRLINE_OBSERVATION_MATERIALIZATION_CONTRACT_VERSION,
    exactModelRevisionMatched,
    visibleObservationMaterialized,
    neutralReferenceAvailable,
    hiddenCompletionAbsent,
    prohibitedSubstitutionAbsent,
    sourceImagePubliclyPersisted: false as const,
    boundaryPolylinePubliclyPersisted: false as const,
    sourceImageDigestPubliclyPersisted: false as const,
    sourceObservationRefsPubliclyPersisted: false as const,
    derivedSubjectScalarPubliclyPersisted: false as const,
    crossAnchorSpanReady: false as const,
    commonCoordinateFrameBridgeIssued: false as const,
  });
}

function assertLocalObservationPrivacy(
  observation: FR314LocalObservationInput,
): void {
  if (
    observation.sourceImagePersistedToGit !== false ||
    observation.boundaryPolylinePersistedToGit !== false ||
    observation.sourceImageDigestExposedPublicly !== false ||
    observation.sourceObservationRefsExposedPublicly !== false ||
    observation.derivedSubjectScalarPersistedPublicly !== false
  ) {
    fail('local observation persistence/privacy boundary drift.');
  }
}

export function materializeVisibleHairlineObservationFR314(
  input: FR314MaterializationInput,
): FR314MaterializationResult {
  if (
    input.schemaVersion !==
      'fr314-local-hairline-materialization-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }

  const admissionReceipt =
    admittedFR305Receipt(input.admissionReview);

  if (admissionReceipt == null) {
    return Object.freeze({
      schemaVersion:
        'fr314-local-hairline-materialization-result-v1' as const,
      status: 'unavailable' as const,
      reason:
        'fr313_model_admission_not_available' as const,
      fallbackInvented: false as const,
      repoSafeReceipt: repoSafeReceipt(
        false,
        false,
        false,
        true,
        true,
      ),
    });
  }

  if (
    admissionReceipt.modelId !==
      FR307_PRIMARY_MODEL.id ||
    admissionReceipt.exactRevision !==
      FR307_PRIMARY_MODEL.revision
  ) {
    fail('admitted model identity/revision differs from pinned FR307 candidate.');
  }

  if (input.localObservation == null) {
    return Object.freeze({
      schemaVersion:
        'fr314-local-hairline-materialization-result-v1' as const,
      status: 'unavailable' as const,
      reason:
        'visible_hairline_observation_unavailable' as const,
      fallbackInvented: false as const,
      repoSafeReceipt: repoSafeReceipt(
        true,
        false,
        false,
        true,
        true,
      ),
    });
  }

  const local = input.localObservation;
  assertLocalObservationPrivacy(local);

  if (
    local.schemaVersion !==
      'fr314-local-visible-hairline-observation-input-v1' ||
    local.modelId !== admissionReceipt.modelId ||
    local.modelRevision !== admissionReceipt.exactRevision ||
    local.visibilityState !==
      'visible_boundary_segment_admitted' ||
    local.occlusionHandlingApplied !== true ||
    local.hiddenSegmentsCompleted !== false ||
    local.providerFaceOvalUsedAsHairline !== false ||
    local.providerFaceMeshTopVerticesUsedAsHairline !== false ||
    local.traditionalBindingApplied !== false
  ) {
    fail('local observation authority/model boundary drift.');
  }

  nonEmpty(
    local.sourceImageDigest,
    'sourceImageDigest',
  );
  assertUniqueRefs(
    local.sourceObservationRefs,
    'sourceObservationRefs',
  );

  const observation:
    FR305VisibleHairlineObservation =
    Object.freeze({
      schemaVersion:
        'fr305-visible-hairline-observation-v1' as const,
      authorityState:
        'validated_model_visible_boundary_observation_only' as const,
      modelId: local.modelId,
      exactRevision: local.modelRevision,
      coordinateFrame:
        'canonical_image_normalized_2d' as const,
      axisConvention:
        'x_right_y_down_unit_square' as const,
      boundaryPolyline: Object.freeze(
        local.boundaryPolyline.map((point) =>
          Object.freeze({
            x: point.x,
            y: point.y,
          }),
        ),
      ),
      visibilityState:
        'visible_boundary_segment_admitted' as const,
      occlusionHandlingApplied: true as const,
      hiddenSegmentsCompleted: false as const,
      sourceImageDigest:
        local.sourceImageDigest.trim(),
      sourceObservationRefs: Object.freeze(
        local.sourceObservationRefs.map((ref) =>
          ref.trim(),
        ),
      ),
      providerFaceOvalUsedAsHairline:
        false as const,
      providerFaceMeshTopVerticesUsedAsHairline:
        false as const,
      traditionalBindingApplied: false as const,
    });

  const reference =
    deriveVisibleHairlineVerticalReferenceFR305(
      admissionReceipt,
      observation,
    );

  if (reference.status !== 'available') {
    fail('admitted local observation did not materialize an available FR305 reference.');
  }

  return Object.freeze({
    schemaVersion:
      'fr314-local-hairline-materialization-result-v1' as const,
    status: 'available' as const,
    authorityState:
      'local_ephemeral_neutral_visible_hairline_observation_only' as const,
    runtimeOnlyObservation: observation,
    runtimeOnlyVerticalReference: reference,
    repoSafeReceipt: repoSafeReceipt(
      true,
      true,
      true,
      true,
      true,
    ),
    authorityBoundary: Object.freeze({
      anatomicalHairlineGroundTruthIssued:
        false as const,
      traditionalHairlineBindingIssued:
        false as const,
      threeDivisionsSpanExecutionReady:
        false as const,
      commonCoordinateFrameBridgeIssued:
        false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function assertFR314CurrentGate(): void {
  const gate = FR314_CURRENT_GATE;
  if (
    FR313_CURRENT_GATE.fr305AdmissionReceiptIssued !== false ||
    FR313_CURRENT_GATE.admittedHairlineRuntimeProviders !== 0 ||
    gate.parentIssue !== 1521 ||
    gate.observationMaterializerImplemented !== true ||
    gate.fr313AdmissionAvailable !== false ||
    gate.realVisibleHairlineObservationMaterialized !== false ||
    gate.neutralVisibleHairlineReferenceMaterialized !== false ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 6 ||
    gate.remainingNeutralReferenceCapabilityCount !== 1 ||
    gate.commonCoordinateFrameBridgeIssued !== false ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR314CurrentGate();
