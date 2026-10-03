import { describe, expect, it } from 'vitest';
import {
  FR300_R2K_CANDIDATES,
  FR300_R2K_CURRENT_GATE,
  FR300_R2K_MINDS_LIBRAS,
  FR300_R2K_UL_DD,
  assertFR300R2KAlternativeAuthorityFrontierContract,
} from './alternative-authority-frontier-fr300-r2k.js';

describe('FR300-R2K alternative authority frontier', () => {
  it('keeps MINDS-Libras at M2/P2 without promoting FaceModel to raw FR299 truth', () => {
    expect(FR300_R2K_MINDS_LIBRAS).toMatchObject({
      candidateId: 'minds_libras',
      rightsState:
        'open_license_distribution_but_biometric_product_consent_unresolved',
      commercialRAndDPermittedByDatasetTerms: true,
      participantConsentForBiometricProductValidationSourceBound:
        false,
      metricAuthorityLevel:
        'M2_exact_acquisition_export_metric_documented',
      pairingAuthorityLevel:
        'P2_same_acquisition_with_cross_modal_mapping_documented',
      exactArtifactDigestBound: false,
      exactArtifactMetricScaleBound: false,
      exactArtifactPairBindingBound: false,
      rawMetricFaceSurfaceReferenceSourceBound: false,
      registrationWitnessUseful: true,
      directFR299ReferenceEligible: false,
      restrictedArtifactAcquisitionAuthorizedByThisStage:
        false,
      externalAccessRequestAuthorizedByThisStage: false,
    });

    expect(
      FR300_R2K_MINDS_LIBRAS.sourceBoundFacts,
    ).toMatchObject({
      institutionProjectDocumentsKinectV2RgbD: true,
      rgbFramesDocumented: true,
      depthFramesDocumented: true,
      perFrameFaceModelXYZPointCount: 1347,
      faceModelReferenceFrame: 'sensor_geometric_center',
      faceModelCoordinateUnitDocumented: 'meter',
      colorFaceModelProjectsSameFaceModelIntoRgbFrame: true,
      depthFaceModelProjectsSameFaceModelIntoDepthFrame: true,
      perFrameTimeFieldDocumented: true,
      publicDistributionMetadataReportsCCBY4: true,
      rawDepthSurfaceArtifactBoundToFaceModelVertices: false,
      exactDownloadedArtifactDigestInspected: false,
    });
  });

  it('keeps UL-DD at M1/P1 until exact calibration and release-transform evidence is bound', () => {
    expect(FR300_R2K_UL_DD).toMatchObject({
      candidateId: 'ul_dd',
      rightsState:
        'restricted_research_license_commercial_r_and_d_permitted_product_release_unresolved',
      commercialRAndDPermittedByDatasetTerms: true,
      participantConsentForBiometricProductValidationSourceBound:
        false,
      metricAuthorityLevel:
        'M1_device_class_metric_capable',
      pairingAuthorityLevel:
        'P1_same_session_or_timeline',
      exactArtifactDigestBound: false,
      exactArtifactMetricScaleBound: false,
      exactArtifactPairBindingBound: false,
      rawMetricFaceSurfaceReferenceSourceBound: false,
      registrationWitnessUseful: true,
      directFR299ReferenceEligible: false,
      restrictedArtifactAcquisitionAuthorizedByThisStage:
        false,
      externalAccessRequestAuthorizedByThisStage: false,
    });

    expect(
      FR300_R2K_UL_DD.sourceBoundFacts,
    ).toMatchObject({
      zed2DepthCameraDocumented: true,
      zed2CaptureResolutionDocumented: '1344x376',
      zed2CaptureFpsDocumented: 60,
      releaseStoredAsMp4: true,
      releaseSplitIntoLeftAndRightViews: true,
      releasedViewResizeDocumented: '440x370',
      commonTimelineSynchronizationDocumented: true,
      exactReleasedDepthValuesSourceBound: false,
      exactReleasedCameraIntrinsicsSourceBound: false,
      exactReleasedStereoExtrinsicsSourceBound: false,
      exactSplitCropResizeTransformParametersSourceBound:
        false,
      restrictedAccessRequired: true,
      institutionalOrCorporateRAndDEmailRequired: true,
      commercialRAndDExplicitlyPermitted: true,
      datasetRedistributionProhibited: true,
      advertisingUseProhibited: true,
    });
  });

  it('treats both candidates as evidence frontiers rather than direct FR299 replacements', () => {
    expect(FR300_R2K_CANDIDATES).toHaveLength(2);

    for (const candidate of FR300_R2K_CANDIDATES) {
      expect(candidate.directFR299ReferenceEligible).toBe(
        false,
      );
      expect(candidate.exactArtifactDigestBound).toBe(false);
      expect(candidate.exactArtifactMetricScaleBound).toBe(
        false,
      );
      expect(candidate.exactArtifactPairBindingBound).toBe(
        false,
      );
      expect(
        candidate.restrictedArtifactAcquisitionAuthorizedByThisStage,
      ).toBe(false);
      expect(
        candidate.externalAccessRequestAuthorizedByThisStage,
      ).toBe(false);
      expect(candidate.blockers.length).toBeGreaterThan(0);
    }
  });

  it('freezes the current gate at zero real FR299 candidates and Product 18/29', () => {
    expect(FR300_R2K_CURRENT_GATE).toMatchObject({
      disposition:
        'alternative_authority_frontier_resolved_no_direct_fr299_replacement',
      providerResponseState: 'pending',
      mindsMetricAuthorityLevel:
        'M2_exact_acquisition_export_metric_documented',
      mindsPairingAuthorityLevel:
        'P2_same_acquisition_with_cross_modal_mapping_documented',
      ulDdMetricAuthorityLevel:
        'M1_device_class_metric_capable',
      ulDdPairingAuthorityLevel:
        'P1_same_session_or_timeline',
      mindsDirectFR299ReferenceEligible: false,
      ulDdDirectFR299ReferenceEligible: false,
      publicEvidenceResearchOnly: true,
      participantArtifactDownloaded: false,
      restrictedAccessRequested: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
      authority: {
        realFR299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });

    expect(() =>
      assertFR300R2KAlternativeAuthorityFrontierContract(),
    ).not.toThrow();
  });
});
