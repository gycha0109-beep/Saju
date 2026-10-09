import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2D_AR_AST_AUTHORITATIVE_DUA_RIGHTS_CONTRACT_VERSION,
  FR300_R2D_AR_CURRENT_GATE,
  assertFR300R2DARAstAuthoritativeDuaRightsContract,
} from './ast-authoritative-dua-rights-fr300-r2d-ar.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2D_SR_AST_CONTROLLED_ACCESS_SUBMISSION_RECEIPT_CONTRACT_VERSION =
  'FR300-R2D-SR-AST-CONTROLLED-ACCESS-SUBMISSION-RECEIPT-v1' as const;

export const FR300_R2D_SR_SUBMISSION_RECEIPT = Object.freeze({
  schemaVersion:
    'fr300-r2d-sr-controlled-access-submission-receipt-v1' as const,
  providerRouteRef:
    'ast_face_official_controlled_access_contact' as const,
  providerFacingRequestSent: true as const,
  sentMailboxEvidenceObserved: true as const,
  signedDuaAttached: true as const,
  signedDuaDigest:
    'sha256:838d33c7a6e7b19f123299a02ee6fb027a4cb60aae34a9412c265134d8a175ff' as const,
  signedDuaByteLength: 133917 as const,
  signatoryIdentityBoundOutsidePublicRepository: true as const,
  signatoryPiiPersistedInPublicRepository: false as const,
  gmailMessageIdPersistedInPublicRepository: false as const,
  duaSigned: true as const,
  duaSubmitted: true as const,
  controlledAccessRequested: true as const,
  providerAcknowledged: false as const,
  controlledAccessApproved: false as const,
  participantArtifactDownloaded: false as const,
  participantArtifactInspected: false as const,
});

export const FR300_R2D_SR_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2d-sr-ast-controlled-access-submission-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'controlled_access_request_submitted_provider_response_pending' as const,
  authoritativeRightsCompatible: true as const,
  duaSigned: true as const,
  duaSubmitted: true as const,
  controlledAccessRequested: true as const,
  providerAcknowledged: false as const,
  controlledAccessApproved: false as const,
  rawParticipantArtifactUseAuthorized: false as const,
  participantArtifactDownloaded: false as const,
  participantArtifactInspected: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextAction:
    'await_provider_response_while_preparing_fail_closed_controlled_pilot_intake_tooling' as const,
  authority: Object.freeze({
    accessRequestActuallySubmitted: true as const,
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2D-SR ${message}`,
  );
}

export function assertFR300R2DSRAstControlledAccessSubmissionReceiptContract(): void {
  assertFR300R2DARAstAuthoritativeDuaRightsContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2D_AR_AST_AUTHORITATIVE_DUA_RIGHTS_CONTRACT_VERSION !==
      'FR300-R2D-AR-AST-AUTHORITATIVE-DUA-RIGHTS-v1' ||
    FR300_R2D_AR_CURRENT_GATE.disposition !==
      'authoritative_rights_compatible_signature_identity_required' ||
    !FR300_R2D_AR_CURRENT_GATE.controlledAccessScientificallyJustified ||
    !FR300_R2D_AR_CURRENT_GATE.accessRequestExecutionAuthorizedByUser
  ) {
    fail('R2D-AR predecessor drift.');
  }

  const receipt = FR300_R2D_SR_SUBMISSION_RECEIPT;
  if (
    !receipt.providerFacingRequestSent ||
    !receipt.sentMailboxEvidenceObserved ||
    !receipt.signedDuaAttached ||
    receipt.signedDuaDigest !==
      'sha256:838d33c7a6e7b19f123299a02ee6fb027a4cb60aae34a9412c265134d8a175ff' ||
    receipt.signedDuaByteLength !== 133917 ||
    !receipt.signatoryIdentityBoundOutsidePublicRepository ||
    receipt.signatoryPiiPersistedInPublicRepository ||
    receipt.gmailMessageIdPersistedInPublicRepository ||
    !receipt.duaSigned ||
    !receipt.duaSubmitted ||
    !receipt.controlledAccessRequested ||
    receipt.providerAcknowledged ||
    receipt.controlledAccessApproved ||
    receipt.participantArtifactDownloaded ||
    receipt.participantArtifactInspected
  ) {
    fail('submission receipt drift.');
  }

  const current = FR300_R2D_SR_CURRENT_GATE;
  if (
    current.disposition !==
      'controlled_access_request_submitted_provider_response_pending' ||
    !current.authoritativeRightsCompatible ||
    !current.duaSigned ||
    !current.duaSubmitted ||
    !current.controlledAccessRequested ||
    current.providerAcknowledged ||
    current.controlledAccessApproved ||
    current.rawParticipantArtifactUseAuthorized ||
    current.participantArtifactDownloaded ||
    current.participantArtifactInspected ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    !current.authority.accessRequestActuallySubmitted ||
    current.authority.providerApprovalIssued ||
    current.authority.realControlledArtifactIntakeAuthorized ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('submission gate widened provider, artifact, or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;

  if (
    materializedCount !== 18 ||
    current.productMaterialization !== '18/29'
  ) {
    fail('R2D-SR must preserve Product 18/29.');
  }
}

assertFR300R2DSRAstControlledAccessSubmissionReceiptContract();
