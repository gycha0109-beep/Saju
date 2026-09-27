import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2C_DAR_AST_AUTHORITATIVE_DUA_ACCESS_READINESS_CONTRACT_VERSION,
  FR300_R2C_DAR_CURRENT_GATE,
  FR300_R2C_DAR_REQUEST_PACKET,
  assertFR300R2CDARAstAuthoritativeDuaAccessReadinessContract,
} from './ast-authoritative-dua-access-readiness-fr300-r2c-dar.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2D_AQ_AST_CONTROLLED_ACCESS_REQUEST_CONTRACT_VERSION =
  'FR300-R2D-AQ-AST-CONTROLLED-ACCESS-REQUEST-v1' as const;

export type FR300R2DAQRightsCompatibility =
  | 'not_reviewed'
  | 'compatible'
  | 'ambiguous'
  | 'incompatible';

export type FR300R2DAQExecutionState =
  | 'dua_retrieval_required'
  | 'dua_under_review'
  | 'rights_compatible_ready_to_submit'
  | 'rights_clarification_required'
  | 'rights_incompatible_terminal_hold'
  | 'submitted'
  | 'verification_pending'
  | 'approved'
  | 'rejected'
  | 'clarification_requested';

export type FR300R2DAQProviderAccessState =
  | 'not_requested'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'clarification_requested';

export interface FR300R2DAQExecutionInput {
  readonly schemaVersion:
    'fr300-r2d-aq-execution-input-v1';

  readonly authenticatedOsfSessionAvailable: boolean;

  readonly authoritativeDua: {
    readonly retrieved: boolean;
    readonly reviewed: boolean;
    readonly sha256: string | null;
    readonly rightsCompatibility:
      FR300R2DAQRightsCompatibility;
  };

  readonly signer: {
    readonly identityBound: boolean;
    readonly signatureAuthorized: boolean;
    readonly duaSigned: boolean;
  };

  readonly request: {
    readonly submissionAuthorized: boolean;
    readonly submitted: boolean;
    readonly submittedAtUtc: string | null;
    readonly providerAcknowledged: boolean;
    readonly providerAccessState:
      FR300R2DAQProviderAccessState;
  };

  readonly clarification: {
    readonly authorized: boolean;
    readonly sent: boolean;
  };

  readonly rawParticipantArtifactDownloaded: false;
}

export interface FR300R2DAQExecutionAssessment {
  readonly schemaVersion:
    'fr300-r2d-aq-execution-assessment-v1';
  readonly state: FR300R2DAQExecutionState;
  readonly blockers: readonly string[];
  readonly authority: {
    readonly authenticatedRetrievalAuthorized: true;
    readonly authoritativeDuaReviewed:
      boolean;
    readonly rightsCompatibility:
      FR300R2DAQRightsCompatibility;
    readonly signatureAuthorized:
      boolean;
    readonly submissionAuthorized:
      boolean;
    readonly requestSubmitted:
      boolean;
    readonly accessApproved:
      boolean;
    readonly rawParticipantArtifactUseAuthorized:
      false;
    readonly fr299ReferenceMaterialized:
      false;
    readonly fr300R2Authorized:
      false;
  };
}

export const FR300_R2D_AQ_USER_AUTHORIZATION = Object.freeze({
  explicitUserAuthorizationGranted: true as const,
  authenticatedOsfDuaRetrievalAuthorized: true as const,
  authoritativeDuaReviewAuthorized: true as const,
  rightsAdjudicationAuthorized: true as const,
  controlledAccessRequestExecutionAuthorizedIfCompatible:
    true as const,
  boundedRightsClarificationAuthorizedIfAmbiguous:
    true as const,
  rawParticipantArtifactDownloadAuthorizedByR2D:
    false as const,
  paidSpendAuthorized: false as const,
});

export const FR300_R2D_AQ_EXTERNAL_EXECUTION_CONTEXT =
  Object.freeze({
    authenticatedOsfSessionAvailable: false as const,
    browserSessionConnectorAvailable: false as const,
    signerIdentityBound: false as const,
    authoritativeDuaRetrieved: false as const,
    authoritativeDuaReviewed: false as const,
    authoritativeDuaSha256: null,
    rightsCompatibility:
      'not_reviewed' as const satisfies FR300R2DAQRightsCompatibility,
    duaSigned: false as const,
    requestSubmitted: false as const,
    providerAcknowledged: false as const,
    providerAccessState:
      'not_requested' as const satisfies FR300R2DAQProviderAccessState,
    clarificationSent: false as const,
    rawParticipantArtifactDownloaded: false as const,
  });

export const FR300_R2D_AQ_REQUEST_PACKET = Object.freeze({
  ...FR300_R2C_DAR_REQUEST_PACKET,
  executionVersion:
    'fr300-r2d-aq-request-execution-v1' as const,
  userAuthorizationBound: true as const,
  authoritativeDuaDigestRequiredBeforeSignature: true as const,
  compatibleRightsRequiredBeforeSubmission: true as const,
  signerIdentityBindingRequiredBeforeSignature: true as const,
  requestMayBeSubmittedIfRightsAmbiguous: false as const,
  requestMayBeSubmittedIfRightsIncompatible: false as const,
  rawParticipantArtifactDownloadInThisStage: false as const,
});

export const FR300_R2D_AQ_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2d-aq-ast-controlled-access-request-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'user_authorized_external_execution_blocked_authenticated_osf_session_required' as const,
  currentExecutionState:
    'dua_retrieval_required' as const satisfies FR300R2DAQExecutionState,
  explicitUserAuthorizationGranted: true as const,
  authenticatedOsfSessionAvailable: false as const,
  authoritativeDuaRetrieved: false as const,
  authoritativeDuaReviewed: false as const,
  rightsCompatibility:
    'not_reviewed' as const satisfies FR300R2DAQRightsCompatibility,
  signerIdentityBound: false as const,
  duaSigned: false as const,
  requestSubmitted: false as const,
  providerAcknowledged: false as const,
  providerAccessState:
    'not_requested' as const satisfies FR300R2DAQProviderAccessState,
  rawParticipantArtifactDownloaded: false as const,
  externalExecutionBlocker:
    'authenticated_osf_browser_session_required' as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  paidSpendAuthorized: false as const,
  authority: Object.freeze({
    authoritativeDuaCompatibilityIssued: false as const,
    accessRequestExecutionAuthorizedByUser: true as const,
    accessRequestActuallySubmitted: false as const,
    controlledAccessApproved: false as const,
    rawParticipantArtifactUseAuthorized: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

const SHA256 = /^sha256:[0-9a-f]{64}$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2D-AQ ${message}`,
  );
}

export function assessFR300R2DAQExecution(
  input: FR300R2DAQExecutionInput,
): FR300R2DAQExecutionAssessment {
  assertFR300R2DAQAstControlledAccessRequestContract();

  if (
    input.schemaVersion !==
      'fr300-r2d-aq-execution-input-v1'
  ) {
    fail('execution input schemaVersion drift.');
  }

  if (input.rawParticipantArtifactDownloaded !== false) {
    fail('R2D may not download participant artifacts.');
  }

  if (
    input.authoritativeDua.reviewed &&
    !input.authoritativeDua.retrieved
  ) {
    fail('authoritative DUA cannot be reviewed before retrieval.');
  }

  if (
    input.authoritativeDua.retrieved &&
    !input.authenticatedOsfSessionAvailable
  ) {
    fail('authoritative DUA retrieval requires authenticated OSF session evidence.');
  }

  if (
    input.authoritativeDua.retrieved &&
    (input.authoritativeDua.sha256 === null ||
      !SHA256.test(input.authoritativeDua.sha256))
  ) {
    fail('retrieved authoritative DUA requires sha256 digest.');
  }

  if (
    input.authoritativeDua.rightsCompatibility !== 'not_reviewed' &&
    !input.authoritativeDua.reviewed
  ) {
    fail('rights compatibility cannot be issued before authoritative DUA review.');
  }

  if (
    input.signer.duaSigned &&
    (!input.signer.identityBound ||
      !input.signer.signatureAuthorized ||
      !input.authoritativeDua.reviewed ||
      input.authoritativeDua.rightsCompatibility !==
        'compatible')
  ) {
    fail('DUA signature requires bound signer, authorization, reviewed DUA, and compatible rights.');
  }

  if (
    input.request.submitted &&
    (!input.request.submissionAuthorized ||
      !input.signer.duaSigned ||
      input.authoritativeDua.rightsCompatibility !==
        'compatible')
  ) {
    fail('request submission requires compatible rights, signed DUA, and submission authorization.');
  }

  if (
    input.request.submitted &&
    input.request.submittedAtUtc === null
  ) {
    fail('submitted request requires submittedAtUtc.');
  }

  if (
    !input.request.submitted &&
    (input.request.submittedAtUtc !== null ||
      input.request.providerAcknowledged ||
      input.request.providerAccessState !==
        'not_requested')
  ) {
    fail('provider state cannot advance before request submission.');
  }

  if (
    input.request.providerAccessState === 'approved' &&
    !input.request.providerAcknowledged
  ) {
    fail('approved access requires provider acknowledgement.');
  }

  if (
    input.clarification.sent &&
    (!input.clarification.authorized ||
      input.authoritativeDua.rightsCompatibility !==
        'ambiguous')
  ) {
    fail('clarification may be sent only when authorized and rights are ambiguous.');
  }

  const blockers: string[] = [];

  let state: FR300R2DAQExecutionState;

  if (!input.authenticatedOsfSessionAvailable) {
    state = 'dua_retrieval_required';
    blockers.push(
      'authenticated_osf_browser_session_required',
    );
  } else if (!input.authoritativeDua.reviewed) {
    state = 'dua_under_review';
    if (!input.authoritativeDua.retrieved) {
      blockers.push('authoritative_osf_dua_retrieval_required');
    }
  } else if (
    input.authoritativeDua.rightsCompatibility === 'ambiguous'
  ) {
    state = input.clarification.sent
      ? 'clarification_requested'
      : 'rights_clarification_required';
    if (!input.clarification.sent) {
      blockers.push('rights_clarification_required');
    }
  } else if (
    input.authoritativeDua.rightsCompatibility === 'incompatible'
  ) {
    state = 'rights_incompatible_terminal_hold';
    blockers.push('authoritative_rights_incompatible');
  } else if (
    input.authoritativeDua.rightsCompatibility !== 'compatible'
  ) {
    state = 'dua_under_review';
    blockers.push('authoritative_rights_adjudication_required');
  } else if (!input.request.submitted) {
    state = 'rights_compatible_ready_to_submit';
    if (!input.signer.identityBound) {
      blockers.push('signer_identity_binding_required');
    }
    if (!input.signer.duaSigned) {
      blockers.push('authoritative_dua_signature_required');
    }
  } else {
    switch (input.request.providerAccessState) {
      case 'approved':
        state = 'approved';
        break;
      case 'rejected':
        state = 'rejected';
        break;
      case 'clarification_requested':
        state = 'clarification_requested';
        break;
      case 'pending':
      case 'not_requested':
      default:
        state = input.request.providerAcknowledged
          ? 'verification_pending'
          : 'submitted';
        break;
    }
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2d-aq-execution-assessment-v1' as const,
    state,
    blockers: Object.freeze(blockers),
    authority: Object.freeze({
      authenticatedRetrievalAuthorized: true as const,
      authoritativeDuaReviewed:
        input.authoritativeDua.reviewed,
      rightsCompatibility:
        input.authoritativeDua.rightsCompatibility,
      signatureAuthorized:
        input.signer.signatureAuthorized,
      submissionAuthorized:
        input.request.submissionAuthorized,
      requestSubmitted:
        input.request.submitted,
      accessApproved:
        input.request.providerAccessState === 'approved',
      rawParticipantArtifactUseAuthorized:
        false as const,
      fr299ReferenceMaterialized:
        false as const,
      fr300R2Authorized:
        false as const,
    }),
  });
}

export function assertFR300R2DAQAstControlledAccessRequestContract(): void {
  assertFR300R2CDARAstAuthoritativeDuaAccessReadinessContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2C_DAR_AST_AUTHORITATIVE_DUA_ACCESS_READINESS_CONTRACT_VERSION !==
      'FR300-R2C-DAR-AST-AUTHORITATIVE-DUA-ACCESS-READINESS-v1' ||
    FR300_R2C_DAR_CURRENT_GATE.disposition !==
      'authoritative_dua_unavailable_in_current_public_path_request_packet_prepared'
  ) {
    fail('R2C-DAR predecessor drift.');
  }

  const auth = FR300_R2D_AQ_USER_AUTHORIZATION;
  if (
    !auth.explicitUserAuthorizationGranted ||
    !auth.authenticatedOsfDuaRetrievalAuthorized ||
    !auth.authoritativeDuaReviewAuthorized ||
    !auth.rightsAdjudicationAuthorized ||
    !auth.controlledAccessRequestExecutionAuthorizedIfCompatible ||
    !auth.boundedRightsClarificationAuthorizedIfAmbiguous ||
    auth.rawParticipantArtifactDownloadAuthorizedByR2D ||
    auth.paidSpendAuthorized
  ) {
    fail('user authorization boundary drift.');
  }

  const external = FR300_R2D_AQ_EXTERNAL_EXECUTION_CONTEXT;
  if (
    external.authenticatedOsfSessionAvailable ||
    external.browserSessionConnectorAvailable ||
    external.signerIdentityBound ||
    external.authoritativeDuaRetrieved ||
    external.authoritativeDuaReviewed ||
    external.authoritativeDuaSha256 !== null ||
    external.rightsCompatibility !== 'not_reviewed' ||
    external.duaSigned ||
    external.requestSubmitted ||
    external.providerAcknowledged ||
    external.providerAccessState !== 'not_requested' ||
    external.clarificationSent ||
    external.rawParticipantArtifactDownloaded
  ) {
    fail('external execution evidence was fabricated.');
  }

  if (
    !FR300_R2D_AQ_REQUEST_PACKET.prepared ||
    !FR300_R2D_AQ_REQUEST_PACKET.userAuthorizationBound ||
    !FR300_R2D_AQ_REQUEST_PACKET
      .authoritativeDuaDigestRequiredBeforeSignature ||
    !FR300_R2D_AQ_REQUEST_PACKET
      .compatibleRightsRequiredBeforeSubmission ||
    !FR300_R2D_AQ_REQUEST_PACKET
      .signerIdentityBindingRequiredBeforeSignature ||
    FR300_R2D_AQ_REQUEST_PACKET
      .requestMayBeSubmittedIfRightsAmbiguous ||
    FR300_R2D_AQ_REQUEST_PACKET
      .requestMayBeSubmittedIfRightsIncompatible ||
    FR300_R2D_AQ_REQUEST_PACKET.rawParticipantArtifactDownloadInThisStage
  ) {
    fail('request packet execution boundary drift.');
  }

  const current = FR300_R2D_AQ_CURRENT_GATE;
  if (
    current.disposition !==
      'user_authorized_external_execution_blocked_authenticated_osf_session_required' ||
    current.currentExecutionState !==
      'dua_retrieval_required' ||
    !current.explicitUserAuthorizationGranted ||
    current.authenticatedOsfSessionAvailable ||
    current.authoritativeDuaRetrieved ||
    current.authoritativeDuaReviewed ||
    current.rightsCompatibility !== 'not_reviewed' ||
    current.signerIdentityBound ||
    current.duaSigned ||
    current.requestSubmitted ||
    current.providerAcknowledged ||
    current.providerAccessState !== 'not_requested' ||
    current.rawParticipantArtifactDownloaded ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.paidSpendAuthorized ||
    current.authority.authoritativeDuaCompatibilityIssued ||
    !current.authority.accessRequestExecutionAuthorizedByUser ||
    current.authority.accessRequestActuallySubmitted ||
    current.authority.controlledAccessApproved ||
    current.authority.rawParticipantArtifactUseAuthorized ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2D-AQ current gate authority drift.');
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
    fail('R2D-AQ must preserve Product 18/29.');
  }
}

assertFR300R2DAQAstControlledAccessRequestContract();
