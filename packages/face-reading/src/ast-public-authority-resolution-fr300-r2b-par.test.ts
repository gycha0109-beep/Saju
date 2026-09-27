import { describe, expect, it } from 'vitest';
import {
  FR300_R2B_PAR_ACCESS_READINESS,
  FR300_R2B_PAR_CURRENT_GATE,
  FR300_R2B_PAR_DUA_AUTHORITY,
  FR300_R2B_PAR_METRIC_SCALE_AUTHORITY,
  FR300_R2B_PAR_MINIMUM_PILOT_INTAKE_CONTRACT,
  FR300_R2B_PAR_PAIRING_AUTHORITY,
  FR300_R2B_PAR_PUBLIC_SEARCH_RECEIPT,
  assertFR300R2BPARAstPublicAuthorityResolutionContract,
} from './ast-public-authority-resolution-fr300-r2b-par.js';

describe('FR300-R2B-PAR AST public authority resolution', () => {
  it('exhausts public DUA identity without promoting the GitHub mirror to authoritative equivalence', () => {
    expect(FR300_R2B_PAR_DUA_AUTHORITY).toMatchObject({
      githubMirrorPreviouslyInspected: true,
      osfHostedDuaDeclaredAuthoritative: true,
      authoritativeBytesInspectedByThisStage: false,
      byteIdentityVerified: false,
      semanticEquivalenceVerified: false,
      authoritativeRightsGateResolved: false,
      state: 'public_evidence_exhausted',
    });
  });

  it('freezes metric authority at M1 and rejects processed-pipeline or upstream defaults as raw-unit proof', () => {
    expect(FR300_R2B_PAR_METRIC_SCALE_AUTHORITY).toMatchObject({
      structuredLightAcquisitionDocumented: true,
      highPrecision3DFaceScannerDocumented: true,
      exactScannerMakeModelSourceBound: false,
      exactScannerCalibrationSourceBound: false,
      rawObjPhysicalUnit: 'unknown_not_source_bound',
      rawObjExportScaleSemantics: 'unknown_not_source_bound',
      astStep01NormalizesSourceToUnitSphere: true,
      astStep01NormalizesTargetToUnitSphere: true,
      astStep01DenormalizesOutputIntoTargetScale: true,
      publicProcessedMeshMayProveRawMetricScale: false,
      upstreamFlameDefaultScanUnitMayProveAstRawUnit: false,
      metricAuthorityLevel: 'M1_device_class_metric_capable',
      m2Established: false,
      m3Established: false,
      fr299MetricScaleVerified: false,
    });
  });

  it('freezes pairing at P2 despite synchronized neutral capture and unified file naming', () => {
    expect(FR300_R2B_PAR_PAIRING_AUTHORITY).toMatchObject({
      neutralBaseline3DScanDocumented: true,
      neutralBaselineSynchronizedMultiViewRgbDocumented: true,
      threeRgbViewsSimultaneous: true,
      scannerAndRgbRigsStandardizedPositionsAndAngles: true,
      paperClaimsSpatialAlignmentAcrossModalities: true,
      unifiedFileNamingDocumented: true,
      controlledArtifactNamesPubliclyExposed: false,
      controlledManifestPubliclyExposed: false,
      scannerToRgbExtrinsicsPubliclySourceBound: false,
      exactPerFileCaptureBindingPubliclySourceBound: false,
      temporalSynchronizationMaySubstituteSpatialCorrespondence: false,
      sameSubjectMaySubstituteExactCaptureBinding: false,
      pairingAuthorityLevel: 'P2_same_neutral_acquisition_condition',
      p3Established: false,
      fr299CorrespondenceVerified: false,
    });
  });

  it('separates scientific promise from justification and operational authorization', () => {
    expect(FR300_R2B_PAR_ACCESS_READINESS).toEqual({
      scientificallyPromising: true,
      controlledIntakeMayResolveRemainingTechnicalAuthority: true,
      controlledAccessScientificallyJustifiedNow: false,
      controlledAccessOperationallyAuthorized: false,
      reasonNotScientificallyJustifiedNow:
        'authoritative_dua_terms_remain_unverified_and_fr299_metric_m3_pairing_p3_are_not_publicly_closed',
      conditionForScientificJustification: [
        'authoritative_osf_dua_terms_reviewed_for_intended_internal_product_r_and_d_validation',
        'remaining_metric_or_pairing_gap_is_reasonably_resolvable_from_controlled_metadata_or_minimum_pilot_artifacts',
      ],
    });
  });

  it('predefines a minimum pilot intake without allowing raw facial artifacts into Git', () => {
    expect(FR300_R2B_PAR_MINIMUM_PILOT_INTAKE_CONTRACT).toMatchObject({
      requiredArtifacts: expect.arrayContaining([
        'neutral_raw_3d_obj',
        'corresponding_frontal_rgb',
        'subject_capture_manifest_or_equivalent_pairing_metadata',
        'scanner_export_unit_or_metric_scale_metadata',
      ]),
      rawArtifactsMayEnterGit: false,
      rawArtifactsMayEnterGitLfs: false,
      providerLandmarksMayIssueFR266Truth: false,
      providerLandmarksMayIssueFR297Truth: false,
    });
  });

  it('records current public search as exhausted for the three unresolved authority questions', () => {
    expect(FR300_R2B_PAR_PUBLIC_SEARCH_RECEIPT).toMatchObject({
      publicScannerModelSourceFound: false,
      publicScannerCalibrationSourceFound: false,
      publicRawObjUnitSourceFound: false,
      publicRawObjExportScaleSourceFound: false,
      publicControlledArtifactManifestFound: false,
      publicScannerRgbExtrinsicsFound: false,
      publicExactPerFileRgbRawScanPairingReceiptFound: false,
      publicSearchExhaustedForCurrentThreeQuestions: true,
    });
  });

  it('preserves FR299=0, FR300-R2=0, Product 18/29 and performs no access action', () => {
    expect(FR300_R2B_PAR_CURRENT_GATE).toMatchObject({
      disposition:
        'public_authority_exhausted_controlled_intake_may_resolve',
      controlledAccessScientificallyJustifiedNow: false,
      controlledAccessOperationallyAuthorized: false,
      osfAccountCreatedByThisStage: false,
      controlledAccessRequested: false,
      duaSigned: false,
      duaSubmitted: false,
      externalContactAuthorized: false,
      externalContactPerformed: false,
      controlledParticipantArtifactDownloaded: false,
      controlledParticipantArtifactInspected: false,
      rawFaceArtifactCommittedToGit: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2BPARAstPublicAuthorityResolutionContract(),
    ).not.toThrow();
  });
});
