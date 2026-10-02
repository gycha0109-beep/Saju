import { describe, expect, it } from 'vitest';
import {
  FR300_R2I_CURRENT_GATE,
  applyFR300R2IProviderResponseTransition,
  assertFR300R2IProviderResponseTransitionContract,
  type FR300R2IProviderResponseEvidenceInput,
} from './ast-provider-response-transition-fr300-r2i.js';

function evidence(
  overrides: Partial<FR300R2IProviderResponseEvidenceInput> = {},
): FR300R2IProviderResponseEvidenceInput {
  return {
    schemaVersion:
      'fr300-r2i-provider-response-evidence-input-v1',
    previousState: 'pending',
    responseObserved: true,
    providerIdentityBound: true,
    requestThreadBound: true,
    submittedDuaBound: true,
    authorityDecisionHumanReviewed: true,
    automatedParserAuthorityBearing: false,
    acknowledgmentOnly: false,
    verificationRequested: false,
    clarificationRequested: false,
    explicitControlledAccessApproval: false,
    explicitControlledAccessRejection: false,
    supersedingProviderDecisionEvidenceBound: false,
    rawProviderMessagePersistedInPublicRepository: false,
    gmailMessageIdPersistedInPublicRepository: false,
    applicantPiiPersistedInPublicRepository: false,
    accessCredentialPersistedInPublicRepository: false,
    privatePortalLocatorPersistedInPublicRepository: false,
    ...overrides,
  };
}

describe('FR300-R2I provider response transition', () => {
  it('keeps the current repository gate pending until real response evidence is observed', () => {
    expect(FR300_R2I_CURRENT_GATE).toMatchObject({
      disposition:
        'provider_response_transition_tooling_ready_response_pending',
      providerResponseState: 'pending',
      responseObserved: false,
      responseClassificationAutomated: false,
      authorityDecisionRequiresHumanReview: true,
      sanitizedPublicReceiptRequired: true,
      providerApprovalIssued: false,
      realControlledArtifactIntakeAuthorized: false,
      rawParticipantArtifactUseAuthorized: false,
      participantArtifactDownloaded: false,
      participantArtifactInspected: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2IProviderResponseTransitionContract(),
    ).not.toThrow();
  });

  it('keeps no-response evidence pending without fabricating provider binding', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({
          responseObserved: false,
          providerIdentityBound: false,
          requestThreadBound: false,
          submittedDuaBound: false,
          authorityDecisionHumanReviewed: false,
        }),
      );

    expect(receipt).toMatchObject({
      previousState: 'pending',
      nextState: 'pending',
      responseObserved: false,
      providerAcknowledged: false,
      explicitProviderDecision: 'none',
      outstandingCondition: 'none',
      next: 'await_provider_response',
      authority: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
        rawParticipantArtifactUseAuthorized: false,
      },
    });
  });

  it('classifies an acknowledgment-only response as pending', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({ acknowledgmentOnly: true }),
      );

    expect(receipt.nextState).toBe('pending');
    expect(receipt.providerAcknowledged).toBe(true);
    expect(receipt.authority.providerApprovalIssued).toBe(
      false,
    );
  });

  it('classifies identity or access verification requests as verification_pending', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({ verificationRequested: true }),
      );

    expect(receipt).toMatchObject({
      nextState: 'verification_pending',
      outstandingCondition: 'verification',
      next: 'complete_provider_verification',
      authority: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
      },
    });
  });

  it('keeps a conditional approval in verification_pending while verification remains outstanding', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({
          verificationRequested: true,
          explicitControlledAccessApproval: true,
        }),
      );

    expect(receipt.explicitProviderDecision).toBe(
      'approval',
    );
    expect(receipt.nextState).toBe(
      'verification_pending',
    );
    expect(receipt.authority.providerApprovalIssued).toBe(
      false,
    );
  });

  it('classifies provider clarification requests without widening intake authority', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({ clarificationRequested: true }),
      );

    expect(receipt).toMatchObject({
      nextState: 'clarification_requested',
      outstandingCondition: 'clarification',
      next: 'answer_provider_clarification',
      authority: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
      },
    });
  });

  it('treats ambiguous positive language without explicit approval as pending', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence(),
      );

    expect(receipt.nextState).toBe('pending');
    expect(receipt.explicitProviderDecision).toBe(
      'none',
    );
    expect(receipt.authority.providerApprovalIssued).toBe(
      false,
    );
  });

  it('unlocks only the real controlled pilot intake entry point for explicit bound approval', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({
          explicitControlledAccessApproval: true,
        }),
      );

    expect(receipt).toMatchObject({
      previousState: 'pending',
      nextState: 'approved',
      explicitProviderDecision: 'approval',
      outstandingCondition: 'none',
      next: 'enter_r2h_real_controlled_pilot_intake',
      authority: {
        providerApprovalIssued: true,
        realControlledArtifactIntakeAuthorized: true,
        rawParticipantArtifactUseAuthorized: true,
        participantArtifactDownloaded: false,
        participantArtifactInspected: false,
        realFR299MetricScaleVerified: false,
        realFR299CorrespondenceVerified: false,
        realRegistrationAuthorityIssued: false,
        realFR299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });

    expect(receipt.sanitizedPublicReceipt).toEqual({
      rawProviderMessagePersisted: false,
      gmailMessageIdPersisted: false,
      applicantPiiPersisted: false,
      accessCredentialPersisted: false,
      privatePortalLocatorPersisted: false,
    });
  });

  it('classifies explicit rejection as terminal rejection authority', () => {
    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({
          explicitControlledAccessRejection: true,
        }),
      );

    expect(receipt).toMatchObject({
      nextState: 'rejected',
      explicitProviderDecision: 'rejection',
      next: 'close_ast_controlled_route_and_continue_alternatives',
      authority: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
        rawParticipantArtifactUseAuthorized: false,
      },
    });
  });

  it.each([
    ['providerIdentityBound', false],
    ['requestThreadBound', false],
    ['submittedDuaBound', false],
  ] as const)(
    'rejects observed response without required binding %s',
    (key, value) => {
      expect(() =>
        applyFR300R2IProviderResponseTransition(
          evidence({
            [key]: value,
            explicitControlledAccessApproval: true,
          }),
        ),
      ).toThrow(/must be bound to provider identity/);
    },
  );

  it('rejects authority decisions that were not human-reviewed', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          authorityDecisionHumanReviewed: false,
          explicitControlledAccessApproval: true,
        }),
      ),
    ).toThrow(/require human-reviewed evidence/);
  });

  it('rejects an authority-bearing automated parser', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          automatedParserAuthorityBearing: true,
          explicitControlledAccessApproval: true,
        }),
      ),
    ).toThrow(/automated parser output may not issue/);
  });

  it('rejects contradictory approval and rejection evidence', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          explicitControlledAccessApproval: true,
          explicitControlledAccessRejection: true,
        }),
      ),
    ).toThrow(/contradictory/);
  });

  it('rejects public persistence of provider-private evidence', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          rawProviderMessagePersistedInPublicRepository:
            true,
        }),
      ),
    ).toThrow(/may not persist raw messages/);
  });

  it('requires superseding provider decision evidence before reopening a rejected route', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          previousState: 'rejected',
          explicitControlledAccessApproval: true,
        }),
      ),
    ).toThrow(/superseding provider decision evidence/);

    const receipt =
      applyFR300R2IProviderResponseTransition(
        evidence({
          previousState: 'rejected',
          explicitControlledAccessApproval: true,
          supersedingProviderDecisionEvidenceBound: true,
        }),
      );

    expect(receipt.nextState).toBe('approved');
    expect(receipt.authority.providerApprovalIssued).toBe(
      true,
    );
  });

  it('routes post-approval revocation or scope changes to a separate governed lane', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          previousState: 'approved',
          explicitControlledAccessRejection: true,
        }),
      ),
    ).toThrow(/separate governed transition lane/);
  });

  it('rejects fabricated bindings when no response exists', () => {
    expect(() =>
      applyFR300R2IProviderResponseTransition(
        evidence({
          responseObserved: false,
          providerIdentityBound: true,
          requestThreadBound: false,
          submittedDuaBound: false,
          authorityDecisionHumanReviewed: false,
        }),
      ),
    ).toThrow(/no-response evidence may not claim/);
  });
});
