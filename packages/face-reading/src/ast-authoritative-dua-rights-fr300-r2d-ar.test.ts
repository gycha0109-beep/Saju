import { describe, expect, it } from 'vitest';
import {
  FR300_R2D_AR_AUTHORITATIVE_DUA_IDENTITY,
  FR300_R2D_AR_BOUNDED_USE_PROFILE,
  FR300_R2D_AR_COMPATIBILITY,
  FR300_R2D_AR_CURRENT_GATE,
  FR300_R2D_AR_RIGHTS_MATRIX,
  assertFR300R2DARAstAuthoritativeDuaRightsContract,
} from './ast-authoritative-dua-rights-fr300-r2d-ar.js';

describe('FR300-R2D-AR authoritative AST DUA rights', () => {
  it('binds the authenticated OSF authoritative PDF and proves byte identity with the GitHub mirror', () => {
    expect(FR300_R2D_AR_AUTHORITATIVE_DUA_IDENTITY).toEqual({
      source:
        'user_confirmed_authenticated_osf_authoritative_download',
      projectDoi: '10.17605/OSF.IO/XK4F6',
      fileName: 'Data Usage Agreement (DUA) .pdf',
      byteLength: 89465,
      sha256:
        'sha256:dc675a134ee2a65d46271ec8851c9511a5787e7d531fc276ed8c8513f75335ab',
      gitBlobSha1:
        '5ab05af1b97cf6f1728e6c4a363414e804a650d7',
      officialGithubMirrorBlobSha1:
        '5ab05af1b97cf6f1728e6c4a363414e804a650d7',
      byteIdenticalToOfficialGithubMirror: true,
      authoritativeDocumentReviewed: true,
      pageCount: 2,
    });
  });

  it('adjudicates industrial R&D as allowed while preserving identity-use prohibitions', () => {
    expect(FR300_R2D_AR_RIGHTS_MATRIX).toMatchObject({
      legitimateIndustrialResearchAndDevelopment:
        'explicitly_allowed',
      internalAnalysisAndEvaluation:
        'explicitly_allowed',
      commercialProductDevelopmentValidation:
        'conditionally_allowed',

      participantReIdentification:
        'explicitly_prohibited',
      biometricIdentification:
        'explicitly_prohibited',
      biometricVerification:
        'explicitly_prohibited',
      surveillance:
        'explicitly_prohibited',
      profiling:
        'explicitly_prohibited',
      participantTracking:
        'explicitly_prohibited',
      identityRecognitionSystemTrainingOrEvaluation:
        'explicitly_prohibited',

      controlledRawDataRedistribution:
        'explicitly_prohibited',
      identifiableDerivativeDistribution:
        'explicitly_prohibited',
      reconstructiveFaceTemplateDistribution:
        'explicitly_prohibited',

      nonIdentifyingAggregateStatisticsPublication:
        'explicitly_allowed',
      nonIdentifyingPlotsPublication:
        'explicitly_allowed',
      nonIdentifyingQualitativeResultsPublication:
        'explicitly_allowed',

      secureTechnicalAndAdministrativeControls: 'required',
      deletionWhenNoLongerNeeded: 'required',
      deletionOnProviderRequest: 'required',
      backupAndCopyDeletion: 'required',
      datasetCitation: 'required',
      breachNotification: 'required',
    });
  });

  it('does not invent permission for individual derived scalar publication or third-party cloud processing', () => {
    expect(FR300_R2D_AR_RIGHTS_MATRIX).toMatchObject({
      individualDerivedScalarExternalPublication:
        'not_addressed',
      individualDerivedScalarInternalRetention:
        'not_addressed',
      thirdPartyCloudProcessing:
        'not_addressed',
    });

    expect(FR300_R2D_AR_COMPATIBILITY).toMatchObject({
      individualDerivedScalarExternalPublicationAuthorized:
        false,
      individualDerivedScalarInternalRetentionExplicitlyAuthorized:
        false,
    });
  });

  it('narrows product R&D to bounded internal industrial analysis/evaluation', () => {
    expect(FR300_R2D_AR_BOUNDED_USE_PROFILE).toMatchObject({
      useClass:
        'internal_commercial_product_r_and_d_validation',
      permittedInterpretation:
        'bounded_internal_industrial_r_and_d_analysis_and_evaluation',
      ordinarySmartphoneRgbNeutralGeometryValidation: true,
      independent3DReferenceComparison: true,

      identityRecognition: false,
      biometricVerification: false,
      faceMatching: false,
      surveillance: false,
      tracking: false,
      demographicProfiling: false,
      lawEnforcementUse: false,

      rawRedistribution: false,
      rawProductRuntimeUse: false,
      rawGitPersistence: false,
      rawGitLfsPersistence: false,
      thirdPartyPublicCloudProcessing: false,

      publicRepositoryIndividualSubjectScalarPersistence:
        false,
      publicRepositoryAggregateNonIdentifyingMetricsOnly:
        true,

      secureStorageRequired: true,
      deleteRawWhenNoLongerNeeded: true,
      deleteRawOnProviderRequest: true,
      deleteBackupsAndCopies: true,
    });
  });

  it('issues compatible rights only for the bounded internal R&D profile', () => {
    expect(FR300_R2D_AR_COMPATIBILITY).toMatchObject({
      compatibility:
        'compatible_for_bounded_internal_industrial_r_and_d',
      commercialProductValidationBasis:
        'industrial_r_and_d_plus_internal_analysis_and_evaluation',
      unrestrictedCommercialUseAuthorized: false,
      rawArtifactCommercialRuntimeUseAuthorized: false,
      identitySystemUseAuthorized: false,
      aggregateNonIdentifyingOutputAuthorized: true,
      rightsClarificationRequiredBeforeControlledAccessRequest:
        false,
      signerIdentityRequiredBeforeSignature: true,
    });
  });

  it('advances only to signer binding and preserves FR299=0, FR300-R2=0, Product 18/29', () => {
    expect(FR300_R2D_AR_CURRENT_GATE).toMatchObject({
      disposition:
        'authoritative_rights_compatible_signature_identity_required',
      authoritativeDuaRetrieved: true,
      authoritativeDuaReviewed: true,
      authoritativeDuaByteIdentityVerified: true,
      rightsCompatibility:
        'compatible_for_bounded_internal_industrial_r_and_d',
      userAuthorizedAccessWorkflow: true,
      controlledAccessScientificallyJustified: true,
      accessRequestExecutionAuthorizedByUser: true,

      signerIdentityBound: false,
      duaSigned: false,
      duaSubmitted: false,
      controlledAccessRequested: false,
      providerAcknowledged: false,
      controlledAccessApproved: false,

      controlledParticipantArtifactDownloaded: false,
      controlledParticipantArtifactInspected: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(FR300_R2D_AR_CURRENT_GATE.authority).toEqual({
      authoritativeDuaCompatibilityIssued: true,
      accessRequestExecutionAuthorizedByUser: true,
      duaSignatureAuthorizedAfterSignerBinding: true,
      accessRequestActuallySubmitted: false,
      rawParticipantArtifactUseAuthorized: false,
      realFR299ReferenceMaterialized: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() =>
      assertFR300R2DARAstAuthoritativeDuaRightsContract(),
    ).not.toThrow();
  });
});
