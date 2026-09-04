import { describe, expect, it } from 'vitest';
import {
  assertIssuedSquareBroadNeutralAcquisitionDatasetFR135,
  assertIssuedSquareBroadNeutralCaptureRecordFR135,
  getSquareBroadConstructValidityAcquisitionContractFR135,
  materializeSquareBroadNeutralAcquisitionDatasetFR135,
  recordSquareBroadNeutralConstructValidityCaptureFR135,
  type SquareBroadNeutralAcquisitionDatasetFR135V1,
  type SquareBroadNeutralCaptureRecordFR135V1,
} from './five-officers-square-broad-construct-validity-dataset-acquisition-fr135.js';
import type { SquareBroadNeutralShapeMetricRuntimeFR134V1 } from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';


describe('FR135 square-broad construct-validity dataset acquisition hardening', () => {
  it('rejects copied FR134-shaped objects instead of accepting neutral values by shape alone', () => {
    const forged = {
      schemaVersion: 'fr134-square-broad-neutral-shape-metric-runtime-v1',
      artifactVersion: '0.1.0',
      authorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending',
      nextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition',
    } as unknown as SquareBroadNeutralShapeMetricRuntimeFR134V1;
    expect(() => recordSquareBroadNeutralConstructValidityCaptureFR135(forged, {
      researchSubjectRef: 'study-subject:A',
      captureSeriesRef: 'capture-series:A',
      captureRef: 'capture:A1',
    })).toThrow(/FR-134|FR-135/u);
  });

  it('rejects forged FR135 capture records and datasets outside the active issuers', () => {
    const forgedCapture = {
      schemaVersion: 'fr135-square-broad-neutral-capture-record-v1',
      traditionalSemanticAuthority: false,
    } as unknown as SquareBroadNeutralCaptureRecordFR135V1;
    const forgedDataset = {
      schemaVersion: 'fr135-square-broad-neutral-acquisition-dataset-v1',
      traditionalSemanticAuthority: false,
    } as unknown as SquareBroadNeutralAcquisitionDatasetFR135V1;
    expect(() => assertIssuedSquareBroadNeutralCaptureRecordFR135(forgedCapture)).toThrow(/FR-135/u);
    expect(() => assertIssuedSquareBroadNeutralAcquisitionDatasetFR135(forgedDataset)).toThrow(/FR-135/u);
    expect(() => materializeSquareBroadNeutralAcquisitionDatasetFR135([forgedCapture])).toThrow(/FR-135/u);
  });

  it('does not let project-owner methodology governance auto-materialize semantic annotation authority', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.annotationGovernance.projectOwnerGovernanceAutoQualifies).toBe(false);
    expect(contract.annotationGovernance.annotationAuthorityRef).toBeNull();
    expect(contract.annotationGovernance.annotationProtocolRef).toBeNull();
    expect(contract.authorityBoundary.projectOwnerGovernanceMeansAnnotationAuthority).toBe(false);
    expect(contract.authorityBoundary.annotationRequirementsMeanAnnotationAuthority).toBe(false);
  });

  it('keeps raw images, source image content, face embeddings, and identity templates out of the acquisition artifact contract', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.privacyBoundary.rawImageStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.sourceImageContentStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.faceEmbeddingStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.identityTemplateStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.researchSubjectRefClaimedAnonymous).toBe(false);
  });

  it('preserves role-free geometry and prevents acquisition statistics from becoming calibration or threshold authority', () => {
    const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
    expect(contract.authorityBoundary.externalOutlineRoleAssignmentAllowed).toBe(false);
    expect(contract.authorityBoundary.componentOrderSemanticUseAllowed).toBe(false);
    expect(contract.authorityBoundary.descriptiveStatisticsMeanCalibration).toBe(false);
    expect(contract.authorityBoundary.descriptiveStatisticsMeanThreshold).toBe(false);
    expect(contract.acquisition.numericAcceptanceThresholds).toBeNull();
  });
});
