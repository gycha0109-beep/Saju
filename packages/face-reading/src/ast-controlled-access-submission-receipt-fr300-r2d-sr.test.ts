import { describe, expect, it } from 'vitest';
import {
  FR300_R2D_SR_CURRENT_GATE,
  FR300_R2D_SR_SUBMISSION_RECEIPT,
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract,
} from './ast-controlled-access-submission-receipt-fr300-r2d-sr.js';

describe('FR300-R2D-SR AST controlled access submission receipt', () => {
  it('records real submission without persisting signatory PII or provider mailbox identifiers', () => {
    expect(FR300_R2D_SR_SUBMISSION_RECEIPT).toMatchObject({
      providerRouteRef:
        'ast_face_official_controlled_access_contact',
      providerFacingRequestSent: true,
      sentMailboxEvidenceObserved: true,
      signedDuaAttached: true,
      signedDuaDigest:
        'sha256:838d33c7a6e7b19f123299a02ee6fb027a4cb60aae34a9412c265134d8a175ff',
      signedDuaByteLength: 133917,
      signatoryIdentityBoundOutsidePublicRepository: true,
      signatoryPiiPersistedInPublicRepository: false,
      gmailMessageIdPersistedInPublicRepository: false,
    });
  });

  it('advances signature/submission/request but not provider approval or artifact authority', () => {
    expect(FR300_R2D_SR_CURRENT_GATE).toMatchObject({
      disposition:
        'controlled_access_request_submitted_provider_response_pending',
      authoritativeRightsCompatible: true,
      duaSigned: true,
      duaSubmitted: true,
      controlledAccessRequested: true,
      providerAcknowledged: false,
      controlledAccessApproved: false,
      rawParticipantArtifactUseAuthorized: false,
      participantArtifactDownloaded: false,
      participantArtifactInspected: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });
  });

  it('preserves fail-closed authority', () => {
    expect(FR300_R2D_SR_CURRENT_GATE.authority).toEqual({
      accessRequestActuallySubmitted: true,
      providerApprovalIssued: false,
      realControlledArtifactIntakeAuthorized: false,
      realFR299ReferenceMaterialized: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() =>
      assertFR300R2DSRAstControlledAccessSubmissionReceiptContract(),
    ).not.toThrow();
  });
});
