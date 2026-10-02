import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2D_SR_CURRENT_GATE,
  FR300_R2D_SR_SUBMISSION_RECEIPT,
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract,
} from './ast-controlled-access-submission-receipt-fr300-r2d-sr.js';
import {
  FR300_R2H_CONTROLLED_ARTIFACT_LIFECYCLE_CONTRACT_VERSION,
  FR300_R2H_CURRENT_GATE,
  assertFR300R2HControlledArtifactLifecycleContract,
} from './controlled-artifact-lifecycle-fr300-r2h.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2I_PROVIDER_RESPONSE_TRANSITION_CONTRACT_VERSION =
  'FR300-R2I-PROVIDER-RESPONSE-TRANSITION-v1' as const;

export type FR300R2IProviderResponseState =
  | 'pending'
  | 'verification_pending'
  | 'clarification_requested'
  | 'approved'
  | 'rejected';

export interface FR300R2IProviderResponseEvidenceInput {
  readonly schemaVersion:
    'fr300-r2i-provider-response-evidence-input-v1';
  readonly previousState: FR300R2IProviderResponseState;
  readonly responseObserved: boolean;
  readonly providerIdentityBound: boolean;
  readonly requestThreadBound: boolean;
  readonly submittedDuaBound: boolean;
  readonly authorityDecisionHumanReviewed: boolean;
  readonly automatedParserAuthorityBearing: boolean;
  readonly acknowledgmentOnly: boolean;
  readonly verificationRequested: boolean;
  readonly clarificationRequested: boolean;
  readonly explicitControlledAccessApproval: boolean;
  readonly explicitControlledAccessRejection: boolean;
  readonly supersedingProviderDecisionEvidenceBound: boolean;
  readonly rawProviderMessagePersistedInPublicRepository: boolean;
  readonly gmailMessageIdPersistedInPublicRepository: boolean;
  readonly applicantPiiPersistedInPublicRepository: boolean;
  readonly accessCredentialPersistedInPublicRepository: boolean;
  readonly privatePortalLocatorPersistedInPublicRepository: boolean;
}

export interface FR300R2IProviderResponseTransitionReceipt {
  readonly schemaVersion:
    'fr300-r2i-provider-response-transition-receipt-v1';
  readonly previousState: FR300R2IProviderResponseState;
  readonly nextState: FR300R2IProviderResponseState;
  readonly responseObserved: boolean;
  readonly providerAcknowledged: boolean;
  readonly providerIdentityBound: boolean;
  readonly requestThreadBound: boolean;
  readonly submittedDuaBound: boolean;
  readonly authorityDecisionHumanReviewed: boolean;
  readonly automatedParserAuthorityBearing: false;
  readonly explicitProviderDecision:
    | 'none'
    | 'approval'
    | 'rejection';
  readonly outstandingCondition:
    | 'none'
    | 'verification'
    | 'clarification';
  readonly sanitizedPublicReceipt: {
    readonly rawProviderMessagePersisted: false;
    readonly gmailMessageIdPersisted: false;
    readonly applicantPiiPersisted: false;
    readonly accessCredentialPersisted: false;
    readonly privatePortalLocatorPersisted: false;
  };
  readonly authority: {
    readonly providerApprovalIssued: boolean;
    readonly realControlledArtifactIntakeAuthorized: boolean;
    readonly rawParticipantArtifactUseAuthorized: boolean;
    readonly participantArtifactDownloaded: false;
    readonly participantArtifactInspected: false;
    readonly realFR299MetricScaleVerified: false;
    readonly realFR299CorrespondenceVerified: false;
    readonly realRegistrationAuthorityIssued: false;
    readonly realFR299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly next:
    | 'await_provider_response'
    | 'complete_provider_verification'
    | 'answer_provider_clarification'
    | 'enter_r2h_real_controlled_pilot_intake'
    | 'close_ast_controlled_route_and_continue_alternatives';
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2I ${message}`,
  );
}

function assertR2IPredecessors(): void {
  assertFR300R2HControlledArtifactLifecycleContract();
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2H_CONTROLLED_ARTIFACT_LIFECYCLE_CONTRACT_VERSION !==
      'FR300-R2H-CONTROLLED-ARTIFACT-LIFECYCLE-v1' ||
    FR300_R2H_CURRENT_GATE.disposition !==
      'controlled_artifact_lifecycle_tooling_ready_provider_response_pending' ||
    FR300_R2H_CURRENT_GATE.providerResponseState !== 'pending' ||
    FR300_R2H_CURRENT_GATE.realLifecycleExecutionAuthorized ||
    FR300_R2H_CURRENT_GATE.realParticipantArtifactDownloaded ||
    FR300_R2H_CURRENT_GATE.realParticipantArtifactInspected ||
    FR300_R2H_CURRENT_GATE.authority.providerApprovalIssued ||
    FR300_R2H_CURRENT_GATE.authority
      .realControlledArtifactIntakeAuthorized ||
    FR300_R2H_CURRENT_GATE.authority
      .rawParticipantArtifactUseAuthorized
  ) {
    fail('R2H predecessor provider-response boundary drift.');
  }

  if (
    !FR300_R2D_SR_SUBMISSION_RECEIPT.providerFacingRequestSent ||
    !FR300_R2D_SR_SUBMISSION_RECEIPT.signedDuaAttached ||
    !FR300_R2D_SR_SUBMISSION_RECEIPT.duaSubmitted ||
    !FR300_R2D_SR_SUBMISSION_RECEIPT.controlledAccessRequested ||
    FR300_R2D_SR_SUBMISSION_RECEIPT.providerAcknowledged ||
    FR300_R2D_SR_SUBMISSION_RECEIPT.controlledAccessApproved ||
    FR300_R2D_SR_CURRENT_GATE.disposition !==
      'controlled_access_request_submitted_provider_response_pending'
  ) {
    fail('R2D-SR request/submission predecessor drift.');
  }
}

function assertPublicReceiptPrivacy(
  input: FR300R2IProviderResponseEvidenceInput,
): void {
  if (
    input.rawProviderMessagePersistedInPublicRepository ||
    input.gmailMessageIdPersistedInPublicRepository ||
    input.applicantPiiPersistedInPublicRepository ||
    input.accessCredentialPersistedInPublicRepository ||
    input.privatePortalLocatorPersistedInPublicRepository
  ) {
    fail(
      'public provider-response receipts may not persist raw messages, Gmail identifiers, applicant PII, credentials, or private portal locators.',
    );
  }
}

function assertSignalConsistency(
  input: FR300R2IProviderResponseEvidenceInput,
): void {
  const signals = [
    input.acknowledgmentOnly,
    input.verificationRequested,
    input.clarificationRequested,
    input.explicitControlledAccessApproval,
    input.explicitControlledAccessRejection,
  ];

  if (!input.responseObserved && signals.some(Boolean)) {
    fail('response signals require responseObserved=true.');
  }

  if (
    input.acknowledgmentOnly &&
    signals.slice(1).some(Boolean)
  ) {
    fail('acknowledgmentOnly may not coexist with decision or condition signals.');
  }

  if (
    input.explicitControlledAccessApproval &&
    input.explicitControlledAccessRejection
  ) {
    fail('approval and rejection evidence are contradictory.');
  }

  if (
    input.explicitControlledAccessRejection &&
    (input.verificationRequested ||
      input.clarificationRequested)
  ) {
    fail('rejection may not coexist with outstanding-condition signals.');
  }
}

function classifyNextState(
  input: FR300R2IProviderResponseEvidenceInput,
): FR300R2IProviderResponseState {
  if (!input.responseObserved) {
    return input.previousState;
  }

  if (
    !input.providerIdentityBound ||
    !input.requestThreadBound ||
    !input.submittedDuaBound
  ) {
    fail(
      'observed provider response must be bound to provider identity, the existing request thread, and submitted DUA.',
    );
  }

  if (!input.authorityDecisionHumanReviewed) {
    fail('provider authority decisions require human-reviewed evidence.');
  }

  if (input.automatedParserAuthorityBearing) {
    fail('automated parser output may not issue provider authority.');
  }

  if (input.previousState === 'approved') {
    if (
      input.explicitControlledAccessRejection ||
      input.verificationRequested ||
      input.clarificationRequested
    ) {
      fail(
        'post-approval revocation or scope change requires a separate governed transition lane.',
      );
    }
    return 'approved';
  }

  if (
    input.previousState === 'rejected' &&
    !input.supersedingProviderDecisionEvidenceBound
  ) {
    if (input.explicitControlledAccessRejection) {
      return 'rejected';
    }
    fail(
      'a rejected route may change only with superseding provider decision evidence.',
    );
  }

  if (input.explicitControlledAccessRejection) {
    return 'rejected';
  }

  if (input.verificationRequested) {
    return 'verification_pending';
  }

  if (input.clarificationRequested) {
    return 'clarification_requested';
  }

  if (input.explicitControlledAccessApproval) {
    return 'approved';
  }

  return 'pending';
}

export function applyFR300R2IProviderResponseTransition(
  input: FR300R2IProviderResponseEvidenceInput,
): FR300R2IProviderResponseTransitionReceipt {
  assertR2IPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2i-provider-response-evidence-input-v1'
  ) {
    fail('provider response evidence schemaVersion drift.');
  }

  assertPublicReceiptPrivacy(input);
  assertSignalConsistency(input);

  if (
    !input.responseObserved &&
    (input.providerIdentityBound ||
      input.requestThreadBound ||
      input.submittedDuaBound ||
      input.authorityDecisionHumanReviewed ||
      input.supersedingProviderDecisionEvidenceBound)
  ) {
    fail(
      'no-response evidence may not claim provider, request, DUA, review, or superseding-decision binding.',
    );
  }

  const nextState = classifyNextState(input);
  const approved = nextState === 'approved';

  const explicitProviderDecision:
    FR300R2IProviderResponseTransitionReceipt['explicitProviderDecision'] =
    input.explicitControlledAccessApproval
      ? 'approval'
      : input.explicitControlledAccessRejection
        ? 'rejection'
        : 'none';

  const outstandingCondition:
    FR300R2IProviderResponseTransitionReceipt['outstandingCondition'] =
    input.verificationRequested
      ? 'verification'
      : input.clarificationRequested
        ? 'clarification'
        : 'none';

  const next: FR300R2IProviderResponseTransitionReceipt['next'] =
    nextState === 'verification_pending'
      ? 'complete_provider_verification'
      : nextState === 'clarification_requested'
        ? 'answer_provider_clarification'
        : nextState === 'approved'
          ? 'enter_r2h_real_controlled_pilot_intake'
          : nextState === 'rejected'
            ? 'close_ast_controlled_route_and_continue_alternatives'
            : 'await_provider_response';

  return Object.freeze({
    schemaVersion:
      'fr300-r2i-provider-response-transition-receipt-v1' as const,
    previousState: input.previousState,
    nextState,
    responseObserved: input.responseObserved,
    providerAcknowledged: input.responseObserved,
    providerIdentityBound: input.providerIdentityBound,
    requestThreadBound: input.requestThreadBound,
    submittedDuaBound: input.submittedDuaBound,
    authorityDecisionHumanReviewed:
      input.authorityDecisionHumanReviewed,
    automatedParserAuthorityBearing: false as const,
    explicitProviderDecision,
    outstandingCondition,
    sanitizedPublicReceipt: Object.freeze({
      rawProviderMessagePersisted: false as const,
      gmailMessageIdPersisted: false as const,
      applicantPiiPersisted: false as const,
      accessCredentialPersisted: false as const,
      privatePortalLocatorPersisted: false as const,
    }),
    authority: Object.freeze({
      providerApprovalIssued: approved,
      realControlledArtifactIntakeAuthorized: approved,
      rawParticipantArtifactUseAuthorized: approved,
      participantArtifactDownloaded: false as const,
      participantArtifactInspected: false as const,
      realFR299MetricScaleVerified: false as const,
      realFR299CorrespondenceVerified: false as const,
      realRegistrationAuthorityIssued: false as const,
      realFR299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    next,
  });
}

export const FR300_R2I_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2i-provider-response-transition-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'provider_response_transition_tooling_ready_response_pending' as const,
  providerResponseState: 'pending' as const,
  responseObserved: false as const,
  responseClassificationAutomated: false as const,
  authorityDecisionRequiresHumanReview: true as const,
  sanitizedPublicReceiptRequired: true as const,
  providerApprovalIssued: false as const,
  realControlledArtifactIntakeAuthorized: false as const,
  rawParticipantArtifactUseAuthorized: false as const,
  participantArtifactDownloaded: false as const,
  participantArtifactInspected: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextAction:
    'await_human_reviewed_provider_response_then_apply_fail_closed_transition' as const,
  authority: Object.freeze({
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    rawParticipantArtifactUseAuthorized: false as const,
    realFR299MetricScaleVerified: false as const,
    realFR299CorrespondenceVerified: false as const,
    realRegistrationAuthorityIssued: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

export function assertFR300R2IProviderResponseTransitionContract(): void {
  assertR2IPredecessors();

  const current = FR300_R2I_CURRENT_GATE;
  if (
    current.disposition !==
      'provider_response_transition_tooling_ready_response_pending' ||
    current.providerResponseState !== 'pending' ||
    current.responseObserved ||
    current.responseClassificationAutomated ||
    !current.authorityDecisionRequiresHumanReview ||
    !current.sanitizedPublicReceiptRequired ||
    current.providerApprovalIssued ||
    current.realControlledArtifactIntakeAuthorized ||
    current.rawParticipantArtifactUseAuthorized ||
    current.participantArtifactDownloaded ||
    current.participantArtifactInspected ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.providerApprovalIssued ||
    current.authority.realControlledArtifactIntakeAuthorized ||
    current.authority.rawParticipantArtifactUseAuthorized ||
    current.authority.realFR299MetricScaleVerified ||
    current.authority.realFR299CorrespondenceVerified ||
    current.authority.realRegistrationAuthorityIssued ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2I current gate widened provider, artifact, or product authority.');
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
    fail('R2I must preserve Product 18/29.');
  }
}

assertFR300R2IProviderResponseTransitionContract();
