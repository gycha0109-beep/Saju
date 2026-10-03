import { describe, expect, it } from 'vitest';
import {
  FR300_R2L_CURRENT_GATE,
  FR300_R2L_MINDS_LIBRAS,
  FR300_R2L_RECEIPTS,
  FR300_R2L_UL_DD,
  assertFR300R2LPublicArtifactCalibrationEvidenceContract,
} from './public-artifact-calibration-evidence-fr300-r2l.js';

describe('FR300-R2L public artifact / calibration evidence inspection', () => {
  it('keeps MINDS at M2/P2 while distinguishing SDK face-model geometry from raw depth surface truth', () => {
    expect(FR300_R2L_MINDS_LIBRAS).toMatchObject({
      candidateId: 'minds_libras',
      publicManifestObserved: false,
      publicSchemaObserved: true,
      exactFileChecksumObserved: false,
      rawSurfaceSemanticsSourceBound: false,
      exactCalibrationBundleObserved: false,
      exactReleaseTransformObserved: false,
      metricAuthorityAfterAudit:
        'M2_exact_acquisition_export_metric_documented',
      pairingAuthorityAfterAudit:
        'P2_same_acquisition_with_cross_modal_mapping_documented',
      geometryClass:
        'kinect_v2_hd_face_sdk_model_output_not_raw_depth_surface',
      accessRequestJustified: false,
      participantArtifactDownloadAuthorized: false,
      restrictedAccessRequestAuthorized: false,
      directFR299ReferenceEligible: false,
    });

    expect(
      FR300_R2L_MINDS_LIBRAS.sourceBoundFindings,
    ).toMatchObject({
      kinectV2RgbDDocumented: true,
      rgbAndDepthVideoDistributionDocumented: true,
      faceTxtSchemaDocumented: true,
      perFrameFaceModelXYZPointCount: 1347,
      faceModelReferenceFrame: 'sensor_geometric_center',
      faceModelCoordinateUnit: 'meter',
      colorFaceModelMapsFaceModelIntoRgbFrame: true,
      depthFaceModelMapsFaceModelIntoDepthFrame: true,
      fixedFrameCountPerSample: 150,
      publicDistributionMetadataObserved: true,
      publicExactFileManifestObserved: false,
      publicExactFileChecksumObserved: false,
      microsoftSdkFaceModelApiObserved: true,
      microsoftHdFaceFrameAssociatesFaceModelWithColorAndDepthFrameReferences:
        true,
      rawDepthSurfaceEquivalentToFaceModelSourceBound: false,
    });
  });

  it('keeps UL-DD at M1/P1 because public sources do not bind calibration or exact release transforms', () => {
    expect(FR300_R2L_UL_DD).toMatchObject({
      candidateId: 'ul_dd',
      publicManifestObserved: false,
      publicSchemaObserved: true,
      exactFileChecksumObserved: false,
      rawSurfaceSemanticsSourceBound: false,
      exactCalibrationBundleObserved: false,
      exactReleaseTransformObserved: false,
      metricAuthorityAfterAudit:
        'M1_device_class_metric_capable',
      pairingAuthorityAfterAudit:
        'P1_same_session_or_timeline',
      geometryClass:
        'zed2_release_without_source_bound_raw_metric_surface',
      accessRequestJustified: false,
      participantArtifactDownloadAuthorized: false,
      restrictedAccessRequestAuthorized: false,
      directFR299ReferenceEligible: false,
    });

    expect(
      FR300_R2L_UL_DD.sourceBoundFindings,
    ).toMatchObject({
      zed2DepthCameraDocumented: true,
      captureResolution: '1344x376',
      captureFps: 60,
      captureStoredAsMp4: true,
      publicReleaseSplitIntoLeftRightViews: true,
      releasedViewResize: '440x370',
      commonTimelineSynchronizationDocumented: true,
      datasetFolderAndFileNamingSchemaDocumented: true,
      codeAndTutorialsReportedInSameZenodoRecord: true,
      videoFeatureExtractionCodeIncludes2d3dFacialLandmarks:
        true,
      zenodoRecordPublicMetadataAccessible: true,
      zenodoParticipantFilesRestricted: true,
      publicExactFileManifestObserved: false,
      publicExactFileChecksumObserved: false,
      exactReleasedDepthEncodingSourceBound: false,
      exactZedIntrinsicsSourceBound: false,
      exactStereoExtrinsicsSourceBound: false,
      exactSplitCropResizeTransformParametersSourceBound:
        false,
      extracted3dLandmarksEquivalentToRawMetricSurfaceTruthSourceBound:
        false,
    });
  });

  it('does not justify restricted access when public evidence does not confirm the missing FR299 authority artifacts exist', () => {
    expect(FR300_R2L_RECEIPTS).toHaveLength(2);

    for (const receipt of FR300_R2L_RECEIPTS) {
      expect(receipt.accessRequestJustified).toBe(false);
      expect(receipt.participantArtifactDownloadAuthorized).toBe(
        false,
      );
      expect(receipt.restrictedAccessRequestAuthorized).toBe(false);
      expect(receipt.directFR299ReferenceEligible).toBe(false);
      expect(receipt.exactFileChecksumObserved).toBe(false);
      expect(receipt.rawSurfaceSemanticsSourceBound).toBe(false);
      expect(receipt.blockers.length).toBeGreaterThan(0);
    }
  });

  it('preserves zero real FR299 authority and Product 18/29', () => {
    expect(FR300_R2L_CURRENT_GATE).toMatchObject({
      disposition:
        'public_artifact_calibration_audit_complete_no_authority_promotion',
      mindsMetricAuthorityLevel:
        'M2_exact_acquisition_export_metric_documented',
      mindsPairingAuthorityLevel:
        'P2_same_acquisition_with_cross_modal_mapping_documented',
      ulDdMetricAuthorityLevel:
        'M1_device_class_metric_capable',
      ulDdPairingAuthorityLevel:
        'P1_same_session_or_timeline',
      mindsPublicManifestObserved: false,
      ulDdPublicManifestObserved: false,
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
      assertFR300R2LPublicArtifactCalibrationEvidenceContract(),
    ).not.toThrow();
  });
});
