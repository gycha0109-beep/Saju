import { describe, expect, it } from 'vitest';
import {
  assertIssuedSquareBroadFangNeutralAcquisitionDatasetFR144,
  assertIssuedSquareBroadFangNeutralCaptureRecordFR144,
  getSquareBroadFangRealCaptureAcquisitionContractFR144,
  materializeSquareBroadFangNeutralAcquisitionDatasetFR144,
  type SquareBroadFangNeutralAcquisitionDatasetFR144V1,
  type SquareBroadFangNeutralCaptureRecordFR144V1,
} from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';

describe('FR144 square-broad 方 real-capture neutral acquisition hardening', () => {
  it('rejects forged capture records and datasets outside active issuers', () => {
    const forgedCapture = {
      schemaVersion: 'fr144-square-broad-fang-neutral-capture-record-v1',
      traditionalSemanticAuthority: false,
    } as unknown as SquareBroadFangNeutralCaptureRecordFR144V1;
    const forgedDataset = {
      schemaVersion: 'fr144-square-broad-fang-neutral-acquisition-dataset-v1',
      traditionalSemanticAuthority: false,
    } as unknown as SquareBroadFangNeutralAcquisitionDatasetFR144V1;

    expect(() => assertIssuedSquareBroadFangNeutralCaptureRecordFR144(forgedCapture)).toThrow(/FR-144/u);
    expect(() => assertIssuedSquareBroadFangNeutralAcquisitionDatasetFR144(forgedDataset)).toThrow(/FR-144/u);
    expect(() => materializeSquareBroadFangNeutralAcquisitionDatasetFR144([forgedCapture])).toThrow(/FR-144/u);
  });

  it('keeps raw/source/provider image material and biometric identity artifacts out of this extension', () => {
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.privacyBoundary.rawImageStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.sourceImageContentStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.rawProviderResponseStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.faceEmbeddingStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.identityTemplateStoredByThisArtifact).toBe(false);
    expect(contract.privacyBoundary.researchSubjectRefMustBeStudyLocalOpaqueReference).toBe(true);
    expect(contract.privacyBoundary.researchSubjectRefClaimedAnonymous).toBe(false);
  });

  it('does not treat FR143 synthetic evidence as real capture evidence', () => {
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.predecessor.syntheticRepeatabilityEstablishedForAlgorithmOnly).toBe(true);
    expect(contract.predecessor.syntheticRepeatabilityMeansEmpiricalCaptureRepeatability).toBe(false);
    expect(contract.authorityBoundary.syntheticVerificationMeansRealCaptureEvidence).toBe(false);
    expect(contract.authorityBoundary.neutralAcquisitionMeansEmpiricalRepeatabilityEstablished).toBe(false);
  });

  it('does not require or issue semantic annotations merely to acquire neutral metrics', () => {
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.semanticBoundary.semanticAnnotationRequiredToAcquireNeutralMetrics).toBe(false);
    expect(contract.semanticBoundary.annotationAuthorityRequiredForThisNeutralExtension).toBe(false);
    expect(contract.semanticBoundary.neutralAcquisitionMayLaterBeJoinedToSeparatelyGovernedAnnotations).toBe(true);
    expect(contract.execution.humanSemanticLabelsIssued).toBe(0);
    expect(contract.execution.traditionalMetricBindingsIssued).toBe(0);
  });

  it('does not smuggle repeatability acceptance policy into descriptive acquisition', () => {
    const contract = getSquareBroadFangRealCaptureAcquisitionContractFR144();
    expect(contract.acquisition.numericRepeatabilityAcceptanceThresholds).toBeNull();
    expect(contract.authorityBoundary.descriptiveStatisticsMeanCalibration).toBe(false);
    expect(contract.authorityBoundary.descriptiveStatisticsMeanThreshold).toBe(false);
    expect(contract.execution.calibrationProtocolsIssued).toBe(0);
    expect(contract.execution.thresholdsIssued).toBe(0);
  });
});
