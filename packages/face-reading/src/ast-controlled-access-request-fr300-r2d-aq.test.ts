import { describe, expect, it } from 'vitest';
import {
  FR300_R2D_AQ_CURRENT_GATE,
  FR300_R2D_AQ_EXTERNAL_EXECUTION_CONTEXT,
  FR300_R2D_AQ_REQUEST_PACKET,
  FR300_R2D_AQ_USER_AUTHORIZATION,
  assessFR300R2DAQExecution,
  assertFR300R2DAQAstControlledAccessRequestContract,
} from './ast-controlled-access-request-fr300-r2d-aq.js';

const DIGEST =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

describe('FR300-R2D-AQ AST controlled access request', () => {
  it('binds explicit user authorization without fabricating an authenticated OSF session', () => {
    expect(FR300_R2D_AQ_USER_AUTHORIZATION).toMatchObject({
      explicitUserAuthorizationGranted: true,
      authenticatedOsfDuaRetrievalAuthorized: true,
      authoritativeDuaReviewAuthorized: true,
      rightsAdjudicationAuthorized: true,
      controlledAccessRequestExecutionAuthorizedIfCompatible: true,
      boundedRightsClarificationAuthorizedIfAmbiguous: true,
      rawParticipantArtifactDownloadAuthorizedByR2D: false,
      paidSpendAuthorized: false,
    });

    expect(FR300_R2D_AQ_EXTERNAL_EXECUTION_CONTEXT).toMatchObject({
      authenticatedOsfSessionAvailable: false,
      browserSessionConnectorAvailable: false,
      signerIdentityBound: false,
      authoritativeDuaRetrieved: false,
      authoritativeDuaReviewed: false,
      rightsCompatibility: 'not_reviewed',
      duaSigned: false,
      requestSubmitted: false,
      providerAccessState: 'not_requested',
    });
  });

  it('stays at DUA retrieval required while no authenticated OSF session is available', () => {
    const result = assessFR300R2DAQExecution({
      schemaVersion: 'fr300-r2d-aq-execution-input-v1',
      authenticatedOsfSessionAvailable: false,
      authoritativeDua: {
        retrieved: false,
        reviewed: false,
        sha256: null,
        rightsCompatibility: 'not_reviewed',
      },
      signer: {
        identityBound: false,
        signatureAuthorized: false,
        duaSigned: false,
      },
      request: {
        submissionAuthorized: false,
        submitted: false,
        submittedAtUtc: null,
        providerAcknowledged: false,
        providerAccessState: 'not_requested',
      },
      clarification: {
        authorized: false,
        sent: false,
      },
      rawParticipantArtifactDownloaded: false,
    });

    expect(result.state).toBe('dua_retrieval_required');
    expect(result.blockers).toContain(
      'authenticated_osf_browser_session_required',
    );
  });

  it('requires authoritative DUA review before rights compatibility can be issued', () => {
    expect(() =>
      assessFR300R2DAQExecution({
        schemaVersion: 'fr300-r2d-aq-execution-input-v1',
        authenticatedOsfSessionAvailable: true,
        authoritativeDua: {
          retrieved: true,
          reviewed: false,
          sha256: DIGEST,
          rightsCompatibility: 'compatible',
        },
        signer: {
          identityBound: false,
          signatureAuthorized: false,
          duaSigned: false,
        },
        request: {
          submissionAuthorized: false,
          submitted: false,
          submittedAtUtc: null,
          providerAcknowledged: false,
          providerAccessState: 'not_requested',
        },
        clarification: {
          authorized: false,
          sent: false,
        },
        rawParticipantArtifactDownloaded: false,
      }),
    ).toThrow(/rights compatibility cannot be issued/);
  });

  it('routes ambiguous authoritative rights to clarification and forbids request submission', () => {
    const result = assessFR300R2DAQExecution({
      schemaVersion: 'fr300-r2d-aq-execution-input-v1',
      authenticatedOsfSessionAvailable: true,
      authoritativeDua: {
        retrieved: true,
        reviewed: true,
        sha256: DIGEST,
        rightsCompatibility: 'ambiguous',
      },
      signer: {
        identityBound: true,
        signatureAuthorized: true,
        duaSigned: false,
      },
      request: {
        submissionAuthorized: true,
        submitted: false,
        submittedAtUtc: null,
        providerAcknowledged: false,
        providerAccessState: 'not_requested',
      },
      clarification: {
        authorized: true,
        sent: false,
      },
      rawParticipantArtifactDownloaded: false,
    });

    expect(result.state).toBe('rights_clarification_required');
    expect(result.blockers).toContain('rights_clarification_required');
  });

  it('rejects DUA signing unless signer identity, authorization, reviewed DUA and compatible rights all exist', () => {
    expect(() =>
      assessFR300R2DAQExecution({
        schemaVersion: 'fr300-r2d-aq-execution-input-v1',
        authenticatedOsfSessionAvailable: true,
        authoritativeDua: {
          retrieved: true,
          reviewed: true,
          sha256: DIGEST,
          rightsCompatibility: 'compatible',
        },
        signer: {
          identityBound: false,
          signatureAuthorized: true,
          duaSigned: true,
        },
        request: {
          submissionAuthorized: true,
          submitted: false,
          submittedAtUtc: null,
          providerAcknowledged: false,
          providerAccessState: 'not_requested',
        },
        clarification: {
          authorized: false,
          sent: false,
        },
        rawParticipantArtifactDownloaded: false,
      }),
    ).toThrow(/DUA signature requires bound signer/);
  });

  it('allows ready-to-submit only after compatible rights are reviewed, while keeping FR299 authority false', () => {
    const result = assessFR300R2DAQExecution({
      schemaVersion: 'fr300-r2d-aq-execution-input-v1',
      authenticatedOsfSessionAvailable: true,
      authoritativeDua: {
        retrieved: true,
        reviewed: true,
        sha256: DIGEST,
        rightsCompatibility: 'compatible',
      },
      signer: {
        identityBound: true,
        signatureAuthorized: true,
        duaSigned: true,
      },
      request: {
        submissionAuthorized: true,
        submitted: false,
        submittedAtUtc: null,
        providerAcknowledged: false,
        providerAccessState: 'not_requested',
      },
      clarification: {
        authorized: false,
        sent: false,
      },
      rawParticipantArtifactDownloaded: false,
    });

    expect(result.state).toBe('rights_compatible_ready_to_submit');
    expect(result.authority.fr299ReferenceMaterialized).toBe(false);
    expect(result.authority.fr300R2Authorized).toBe(false);
  });

  it('permits submitted state only after signed DUA and request authorization', () => {
    const result = assessFR300R2DAQExecution({
      schemaVersion: 'fr300-r2d-aq-execution-input-v1',
      authenticatedOsfSessionAvailable: true,
      authoritativeDua: {
        retrieved: true,
        reviewed: true,
        sha256: DIGEST,
        rightsCompatibility: 'compatible',
      },
      signer: {
        identityBound: true,
        signatureAuthorized: true,
        duaSigned: true,
      },
      request: {
        submissionAuthorized: true,
        submitted: true,
        submittedAtUtc: '2026-09-27T03:30:00Z',
        providerAcknowledged: false,
        providerAccessState: 'pending',
      },
      clarification: {
        authorized: false,
        sent: false,
      },
      rawParticipantArtifactDownloaded: false,
    });

    expect(result.state).toBe('submitted');
    expect(result.authority.requestSubmitted).toBe(true);
    expect(result.authority.rawParticipantArtifactUseAuthorized).toBe(false);
  });

  it('never allows R2D to download participant artifacts or promote FR299 from access approval alone', () => {
    expect(FR300_R2D_AQ_REQUEST_PACKET).toMatchObject({
      rawParticipantArtifactDownloadInThisStage: false,
      compatibleRightsRequiredBeforeSubmission: true,
      signerIdentityBindingRequiredBeforeSignature: true,
      requestMayBeSubmittedIfRightsAmbiguous: false,
      requestMayBeSubmittedIfRightsIncompatible: false,
    });

    expect(FR300_R2D_AQ_CURRENT_GATE).toMatchObject({
      disposition:
        'user_authorized_external_execution_blocked_authenticated_osf_session_required',
      explicitUserAuthorizationGranted: true,
      authenticatedOsfSessionAvailable: false,
      requestSubmitted: false,
      rawParticipantArtifactDownloaded: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2DAQAstControlledAccessRequestContract(),
    ).not.toThrow();
  });
});
