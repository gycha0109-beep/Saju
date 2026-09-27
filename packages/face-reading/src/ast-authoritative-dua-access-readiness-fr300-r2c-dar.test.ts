import { describe, expect, it } from 'vitest';
import {
  FR300_R2C_DAR_ACCESS_READINESS,
  FR300_R2C_DAR_AUTHORITATIVE_RIGHTS,
  FR300_R2C_DAR_CLARIFICATION_PACKET,
  FR300_R2C_DAR_CURRENT_GATE,
  FR300_R2C_DAR_PUBLIC_ATTEMPT,
  FR300_R2C_DAR_RAW_ARTIFACT_LIFECYCLE,
  FR300_R2C_DAR_REQUEST_PACKET,
  assertFR300R2CDARAstAuthoritativeDuaAccessReadinessContract,
} from './ast-authoritative-dua-access-readiness-fr300-r2c-dar.js';

describe('FR300-R2C-DAR AST authoritative DUA access readiness', () => {
  it('does not substitute the GitHub mirror for the authoritative OSF DUA', () => {
    expect(FR300_R2C_DAR_PUBLIC_ATTEMPT).toMatchObject({
      officialRepositoryDeclaresOsfDuaAuthoritative: true,
      currentNonAuthenticatedOsfPageRetrievalSucceeded: false,
      authoritativeDuaBytesRetrieved: false,
      authoritativeDuaTextReviewed: false,
      githubMirrorMaySubstituteAuthoritativeDua: false,
      documentState:
        'unavailable_in_current_non_authenticated_public_path',
    });
  });

  it('keeps authoritative commercial product R&D rights unadjudicated until the authoritative DUA is reviewed', () => {
    expect(FR300_R2C_DAR_AUTHORITATIVE_RIGHTS).toMatchObject({
      authoritativeDocumentReviewed: false,
      internalResearchUse: 'not_adjudicable',
      industrialResearchAndDevelopment: 'not_adjudicable',
      commercialProductValidation: 'not_adjudicable',
      derivedMetricRetention: 'not_adjudicable',
      nonIdentifyingAggregatePublication: 'not_adjudicable',
      compatibility:
        'not_adjudicable_without_authoritative_document',
    });
  });

  it('prepares a minimal non-identity access packet without sending it', () => {
    expect(FR300_R2C_DAR_REQUEST_PACKET).toMatchObject({
      prepared: true,
      intendedUse: {
        internalCommercialProductRnDValidation: true,
        identityRecognition: false,
        biometricVerification: false,
        surveillance: false,
        tracking: false,
        demographicProfiling: false,
      },
      requestedScope: {
        pilotOnly: true,
        neutralRaw3D: true,
        frontalRgb: true,
        subjectCaptureManifestOrEquivalent: true,
        metricScaleMetadata: true,
      },
      securityCommitments: {
        noRedistribution: true,
        isolatedStorage: true,
        noGitRawArtifacts: true,
        noGitLfsRawArtifacts: true,
        deletionPerAuthoritativeDua: true,
      },
      sent: false,
    });
  });

  it('prepares but does not authorize or send rights clarification questions', () => {
    expect(FR300_R2C_DAR_CLARIFICATION_PACKET).toMatchObject({
      prepared: true,
      authorizedToSend: false,
      sent: false,
    });
    expect(FR300_R2C_DAR_CLARIFICATION_PACKET.questions).toHaveLength(3);
  });

  it('keeps scientific promise separate from rights compatibility and operational authorization', () => {
    expect(FR300_R2C_DAR_ACCESS_READINESS).toMatchObject({
      technicallyPromising: true,
      controlledIntakeMayResolveRemainingTechnicalAuthority: true,
      authoritativeRightsCompatible: false,
      authoritativeRightsCompatibilityState:
        'not_adjudicable_without_authoritative_document',
      controlledAccessScientificallyJustified: false,
      controlledAccessOperationallyAuthorized: false,
    });
  });

  it('keeps raw controlled facial artifacts outside Git and public cloud', () => {
    expect(FR300_R2C_DAR_RAW_ARTIFACT_LIFECYCLE).toMatchObject({
      intakePerformed: false,
      persistedToGit: false,
      persistedToGitLfs: false,
      persistedToPublicCloud: false,
      deletionPolicy: 'defer_to_authoritative_dua_once_reviewed',
    });
  });

  it('preserves FR299=0, FR300-R2=0, Product 18/29 and performs no access action', () => {
    expect(FR300_R2C_DAR_CURRENT_GATE).toMatchObject({
      disposition:
        'authoritative_dua_unavailable_in_current_public_path_request_packet_prepared',
      requestPacketPrepared: true,
      clarificationPacketPrepared: true,
      controlledAccessScientificallyJustified: false,
      controlledAccessOperationallyAuthorized: false,
      osfAccountCreatedByThisStage: false,
      duaSigned: false,
      duaSubmitted: false,
      controlledAccessRequested: false,
      clarificationAuthorized: false,
      clarificationSent: false,
      externalContactPerformed: false,
      controlledParticipantArtifactDownloaded: false,
      controlledParticipantArtifactInspected: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2CDARAstAuthoritativeDuaAccessReadinessContract(),
    ).not.toThrow();
  });
});
