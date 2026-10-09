import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION,
  FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS,
  FR300_R1V_ZC_AST_DUA_PREFLIGHT,
  FR300_R1V_ZC_AST_FR299_GAP,
  FR300_R1V_ZC_CURRENT_GATE,
  assertFR300R1VZCASTControlledPreflightContract,
} from './ast-face-controlled-preflight-fr300-r1v-zc.js';

describe('FR300-R1V-ZC AST-Face controlled raw metric preflight', () => {
  it('source-binds the controlled raw and synchronized RGB scope without inventing raw metric units', () => {
    expect(FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS).toMatchObject({
      controlledRawFormat: 'OBJ',
      rawScansAreOriginalPreTopologyStandardizationGeometry: true,
      structuredLightCaptureDocumented: true,
      synchronizedRgbConsentingParticipantCount: 52,
      synchronizedRgbCaptureDocumented: true,
      exactScannerModel: 'not_source_bound',
      exactScannerCalibration: 'not_source_bound',
      exactScannerAccuracy: 'not_source_bound',
      rawObjPhysicalCoordinateUnit: 'not_source_bound',
      rawObjExportScaleSemantics: 'not_source_bound',
      exactScannerToRgbExtrinsics: 'not_source_bound',
      exactPerCapture3dRgbRegistrationReceipt: 'not_source_bound',
    });
  });

  it('records the inspected DUA mirror as bounded industrial R&D permission, not broad runtime authority', () => {
    expect(FR300_R1V_ZC_AST_DUA_PREFLIGHT).toMatchObject({
      githubMirrorBlobSha:
        '5ab05af1b97cf6f1728e6c4a363414e804a650d7',
      githubMirrorInspected: true,
      osfHostedDuaDeclaredAuthoritativeByOfficialRepository: true,
      osfAuthoritativeDuaByteVerifiedAgainstMirror: false,
      industrialResearchAndDevelopment:
        'permitted_for_internal_analysis_and_evaluation_on_inspected_mirror',
      broadProductionRuntimeReuse:
        'not_established_by_internal_analysis_and_evaluation_permission',
      biometricIdentificationPermitted: false,
      identityRecognitionTrainingOrEvaluationPermitted: false,
      controlledFileRedistributionPermitted: false,
      identifiableDerivativeRedistributionPermitted: false,
      nonIdentifyingAggregateOutputsPermitted: true,
    });
  });

  it('does not treat structured-light provenance or synchronized RGB as an FR299 metric/correspondence receipt', () => {
    expect(FR300_R1V_ZC_AST_FR299_GAP).toMatchObject({
      metricScaleVerified: false,
      synchronizedRgbExistsForConsentingSubset: true,
      sameCaptureBindingEstablishedForFR299: false,
      validatedRegistrationBindingEstablishedForFR299: false,
      correspondenceVerifiedForFR299: false,
      providerLandmarksMayIssueFR266Truth: false,
      providerLandmarksMayIssueFR297Truth: false,
      publicStandardizedMeshMaySubstituteControlledRawMetricGeometry: false,
      genericStructuredLightCaptureMaySubstituteExactMetricUnitAuthority:
        false,
    });
  });

  it('holds the controlled path without terminally rejecting it', () => {
    expect(FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION).toMatchObject({
      disposition: 'hold_external_authority',
      controlledPathTerminalReject: false,
      metricGate:
        'hold_exact_raw_physical_unit_calibration_accuracy_and_export_scale_not_source_bound',
      rgbGate:
        'hold_exact_fr299_correspondence_receipt_not_source_bound',
      nextFrontierWithoutNewExternalAuthorization:
        'fr300_r1w_zc_existing_hardware_metric_reference_feasibility',
    });
  });

  it('does not request access, sign or send a DUA, contact authors, download subjects, spend, or promote', () => {
    expect(FR300_R1V_ZC_CURRENT_GATE).toMatchObject({
      controlledDataAccessRequested: false,
      controlledDataAccessAuthorizedByThisTrack: false,
      duaSigned: false,
      duaSent: false,
      externalContactPerformed: false,
      controlledSubjectArtifactDownloaded: false,
      controlledSubjectArtifactInspected: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });
    expect(FR300_R1V_ZC_CURRENT_GATE.authority).toMatchObject({
      astControlledRawMetricReferenceAuthorized: false,
      fr299SourceMetricScaleVerified: false,
      fr299RgbCorrespondenceVerified: false,
      realFR299BundleAuthorized: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('preserves Product 18/29 and the complete authority contract', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() =>
      assertFR300R1VZCASTControlledPreflightContract(),
    ).not.toThrow();
  });
});
