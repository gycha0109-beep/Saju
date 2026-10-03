import {
  FR300_R2I_CURRENT_GATE,
  assertFR300R2IProviderResponseTransitionContract,
} from './ast-provider-response-transition-fr300-r2i.js';
import {
  FR300_R2L_CURRENT_GATE,
  FR300_R2L_MINDS_LIBRAS,
  FR300_R2L_UL_DD,
  assertFR300R2LPublicArtifactCalibrationEvidenceContract,
} from './public-artifact-calibration-evidence-fr300-r2l.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2M_EXTERNAL_EVIDENCE_TRIGGER_ROUTER_CONTRACT_VERSION =
  'FR300-R2M-EXTERNAL-EVIDENCE-TRIGGER-ROUTER-v1' as const;

export type FR300R2MExternalEvidenceRoute =
  | 'await_external_evidence'
  | 'route_to_r2i_provider_response_review'
  | 'reopen_minds_exact_artifact_authority_review'
  | 'reopen_ul_dd_calibration_authority_review'
  | 'multiple_new_triggers_require_separate_adjudication';

export interface FR300R2MExternalEvidenceTriggerInput {
  readonly schemaVersion:
    'fr300-r2m-external-evidence-trigger-input-v1';
  readonly providerResponseObserved: boolean;
  readonly mindsExactArtifactIdentityEvidenceObserved: boolean;
  readonly mindsExactMetricScaleBindingEvidenceObserved: boolean;
  readonly mindsExactArtifactPairBindingEvidenceObserved: boolean;
  readonly ulDdExactArtifactIdentityEvidenceObserved: boolean;
  readonly ulDdExactCalibrationBundleEvidenceObserved: boolean;
  readonly ulDdExactReleaseTransformEvidenceObserved: boolean;
  readonly participantArtifactDownloaded: boolean;
  readonly restrictedAccessRequested: boolean;
  readonly rawProviderResponsePersistedInPublicRepository: boolean;
  readonly providerMessageIdentifierPersistedInPublicRepository: boolean;
}

export interface FR300R2MExternalEvidenceTriggerReceipt {
  readonly schemaVersion:
    'fr300-r2m-external-evidence-trigger-receipt-v1';
  readonly route: FR300R2MExternalEvidenceRoute;
  readonly triggers: {
    readonly providerResponse: boolean;
    readonly mindsExactArtifactReview: boolean;
    readonly ulDdCalibrationReview: boolean;
  };
  readonly authority: {
    readonly providerApprovalIssued: false;
    readonly realControlledArtifactIntakeAuthorized: false;
    readonly participantArtifactDownloadAuthorized: false;
    readonly restrictedAccessRequestAuthorized: false;
    readonly mindsAuthorityPromoted: false;
    readonly ulDdAuthorityPromoted: false;
    readonly realFR299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextAction:
    | 'wait_for_new_external_evidence'
    | 'apply_r2i_human_reviewed_provider_response_transition'
    | 'adjudicate_new_minds_exact_artifact_evidence'
    | 'adjudicate_new_ul_dd_calibration_evidence'
    | 'split_and_adjudicate_each_new_trigger_independently';
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2M ${message}`,
  );
}

function assertR2MPredecessors(): void {
  assertFR300R2IProviderResponseTransitionContract();
  assertFR300R2LPublicArtifactCalibrationEvidenceContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2I_CURRENT_GATE.providerResponseState !== 'pending' ||
    FR300_R2I_CURRENT_GATE.responseObserved ||
    FR300_R2I_CURRENT_GATE.providerApprovalIssued ||
    FR300_R2I_CURRENT_GATE.realControlledArtifactIntakeAuthorized ||
    FR300_R2I_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R2I_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0
  ) {
    fail('R2I predecessor provider-response boundary drift.');
  }

  if (
    FR300_R2L_CURRENT_GATE.disposition !==
      'public_artifact_calibration_audit_complete_no_authority_promotion' ||
    FR300_R2L_MINDS_LIBRAS.metricAuthorityAfterAudit !==
      'M2_exact_acquisition_export_metric_documented' ||
    FR300_R2L_MINDS_LIBRAS.pairingAuthorityAfterAudit !==
      'P2_same_acquisition_with_cross_modal_mapping_documented' ||
    FR300_R2L_UL_DD.metricAuthorityAfterAudit !==
      'M1_device_class_metric_capable' ||
    FR300_R2L_UL_DD.pairingAuthorityAfterAudit !==
      'P1_same_session_or_timeline' ||
    FR300_R2L_MINDS_LIBRAS.directFR299ReferenceEligible ||
    FR300_R2L_UL_DD.directFR299ReferenceEligible ||
    FR300_R2L_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R2L_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0
  ) {
    fail('R2L predecessor alternative-authority boundary drift.');
  }
}

function assertForbiddenActions(
  input: FR300R2MExternalEvidenceTriggerInput,
): void {
  if (
    input.participantArtifactDownloaded ||
    input.restrictedAccessRequested
  ) {
    fail(
      'R2M is routing-only and may not acquire participant artifacts or issue restricted-access requests.',
    );
  }

  if (
    input.rawProviderResponsePersistedInPublicRepository ||
    input.providerMessageIdentifierPersistedInPublicRepository
  ) {
    fail(
      'R2M may not persist raw provider responses or provider-message identifiers in the public repository.',
    );
  }
}

export function routeFR300R2MExternalEvidenceTrigger(
  input: FR300R2MExternalEvidenceTriggerInput,
): FR300R2MExternalEvidenceTriggerReceipt {
  assertR2MPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2m-external-evidence-trigger-input-v1'
  ) {
    fail('external evidence trigger schemaVersion drift.');
  }

  assertForbiddenActions(input);

  const providerResponse = input.providerResponseObserved;
  const mindsExactArtifactReview =
    input.mindsExactArtifactIdentityEvidenceObserved &&
    (
      input.mindsExactMetricScaleBindingEvidenceObserved ||
      input.mindsExactArtifactPairBindingEvidenceObserved
    );
  const ulDdCalibrationReview =
    input.ulDdExactArtifactIdentityEvidenceObserved &&
    (
      input.ulDdExactCalibrationBundleEvidenceObserved ||
      input.ulDdExactReleaseTransformEvidenceObserved
    );

  const activeTriggers = [
    providerResponse,
    mindsExactArtifactReview,
    ulDdCalibrationReview,
  ].filter(Boolean).length;

  let route: FR300R2MExternalEvidenceRoute;
  let nextAction:
    FR300R2MExternalEvidenceTriggerReceipt['nextAction'];

  if (activeTriggers > 1) {
    route =
      'multiple_new_triggers_require_separate_adjudication';
    nextAction =
      'split_and_adjudicate_each_new_trigger_independently';
  } else if (providerResponse) {
    route = 'route_to_r2i_provider_response_review';
    nextAction =
      'apply_r2i_human_reviewed_provider_response_transition';
  } else if (mindsExactArtifactReview) {
    route =
      'reopen_minds_exact_artifact_authority_review';
    nextAction =
      'adjudicate_new_minds_exact_artifact_evidence';
  } else if (ulDdCalibrationReview) {
    route =
      'reopen_ul_dd_calibration_authority_review';
    nextAction =
      'adjudicate_new_ul_dd_calibration_evidence';
  } else {
    route = 'await_external_evidence';
    nextAction = 'wait_for_new_external_evidence';
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2m-external-evidence-trigger-receipt-v1' as const,
    route,
    triggers: Object.freeze({
      providerResponse,
      mindsExactArtifactReview,
      ulDdCalibrationReview,
    }),
    authority: Object.freeze({
      providerApprovalIssued: false as const,
      realControlledArtifactIntakeAuthorized: false as const,
      participantArtifactDownloadAuthorized: false as const,
      restrictedAccessRequestAuthorized: false as const,
      mindsAuthorityPromoted: false as const,
      ulDdAuthorityPromoted: false as const,
      realFR299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextAction,
  });
}

export function assertFR300R2MExternalEvidenceTriggerRouterContract(): void {
  assertR2MPredecessors();

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail('R2M must preserve Product 18/29.');
  }

  if (
    FR300_R2M_CURRENT_GATE.providerResponseObserved ||
    FR300_R2M_CURRENT_GATE.mindsExactEvidenceTriggerObserved ||
    FR300_R2M_CURRENT_GATE.ulDdExactEvidenceTriggerObserved ||
    FR300_R2M_CURRENT_GATE.participantArtifactDownloaded ||
    FR300_R2M_CURRENT_GATE.restrictedAccessRequested ||
    FR300_R2M_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R2M_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R2M_CURRENT_GATE.authority.providerApprovalIssued ||
    FR300_R2M_CURRENT_GATE.authority
      .realControlledArtifactIntakeAuthorized ||
    FR300_R2M_CURRENT_GATE.authority
      .realFR299ReferenceMaterialized ||
    FR300_R2M_CURRENT_GATE.authority.fr300R2Authorized ||
    FR300_R2M_CURRENT_GATE.authority.productColumnMaterialized ||
    FR300_R2M_CURRENT_GATE.authority.productionActivated ||
    FR300_R2M_CURRENT_GATE.authority.commerceActivated
  ) {
    fail('R2M current gate widened authority without a new external trigger.');
  }
}

export const FR300_R2M_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2m-external-evidence-trigger-router-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'external_evidence_router_ready_no_new_trigger_observed' as const,
  providerResponseState: 'pending' as const,
  providerResponseObserved: false as const,
  mindsMetricAuthorityLevel:
    FR300_R2L_MINDS_LIBRAS.metricAuthorityAfterAudit,
  mindsPairingAuthorityLevel:
    FR300_R2L_MINDS_LIBRAS.pairingAuthorityAfterAudit,
  ulDdMetricAuthorityLevel:
    FR300_R2L_UL_DD.metricAuthorityAfterAudit,
  ulDdPairingAuthorityLevel:
    FR300_R2L_UL_DD.pairingAuthorityAfterAudit,
  mindsExactEvidenceTriggerObserved: false as const,
  ulDdExactEvidenceTriggerObserved: false as const,
  participantArtifactDownloaded: false as const,
  restrictedAccessRequested: false as const,
  paidSpendAuthorized: false as const,
  currentRoute: 'await_external_evidence' as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextAction:
    'await_provider_response_or_source_bound_exact_artifact_calibration_evidence' as const,
  authority: Object.freeze({
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

assertFR300R2MExternalEvidenceTriggerRouterContract();
