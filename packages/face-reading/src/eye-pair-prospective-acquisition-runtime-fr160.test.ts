import { describe, expect, it } from 'vitest';
import {
  FR160_NEXT_FRONTIER,
  getEyePairProspectiveAcquisitionContractFR160,
  materializeEyePairProspectiveAcquisitionDatasetFR160,
  recordEyePairProspectiveAcquisitionFR160,
  type EyePairProspectiveAcquisitionRecordFR160V1,
} from './eye-pair-prospective-acquisition-runtime-fr160.js';
import type { EyePairProspectiveCaptureManifestFR159V1 } from './eye-pair-prospective-repeatability-protocol-fr159.js';
import type { RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1 } from './role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';


describe('FR160 eye-pair prospective acquisition runtime', () => {
  it('consumes the exact FR159 collection frontier and keeps definition-time empirical records at zero', () => {
    const contract = getEyePairProspectiveAcquisitionContractFR160();
    expect(contract.predecessor.fr159NextFrontier).toBe(
      'collect_fresh_post_preregistration_eye_pair_repeat_capture_series_then_describe_repeatability_and_capture_condition_sensitivity_without_threshold_or_semantic_promotion',
    );
    expect(contract.predecessor.issuedFr159ManifestRequired).toBe(true);
    expect(contract.predecessor.issuedFr158RuntimeRequired).toBe(true);
    expect(contract.acquisition.empiricalFreshCaptureRecordsBundledAtDefinitionTime).toBe(0);
    expect(contract.nextFrontier).toBe(FR160_NEXT_FRONTIER);
  });

  it('keeps freshness and runtime linkage as attestations rather than independent proof', () => {
    const contract = getEyePairProspectiveAcquisitionContractFR160();
    expect(contract.acquisition.metricRuntimeToManifestCaptureLinkageAttestationRequired).toBe(true);
    expect(contract.acquisition.linkageAttestationMeansIndependentProof).toBe(false);
    expect(contract.acquisition.fr159FreshnessAttestationMeansIndependentlyVerifiedFreshCapture).toBe(false);
    expect(contract.acquisition.fr159SameParticipantAttestationMeansIndependentlyVerifiedIdentity).toBe(false);
    expect(contract.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence).toBe(false);
    expect(contract.verificationBoundary.verifierFixtureMeansRepeatabilityEstablished).toBe(false);
  });

  it('keeps descriptive acquisition separate from repeatability, capture-quality, identity, threshold, and semantics', () => {
    const contract = getEyePairProspectiveAcquisitionContractFR160();
    expect(contract.descriptiveAnalysis.repeatabilityPassFailIssued).toBe(false);
    expect(contract.descriptiveAnalysis.captureSensitivityPassFailIssued).toBe(false);
    expect(contract.descriptiveAnalysis.betweenSeriesIdentityInferenceAllowed).toBe(false);
    expect(contract.descriptiveAnalysis.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(contract.descriptiveAnalysis.numericCaptureQualityThreshold).toBeNull();
    expect(contract.authorityBoundary.acquisitionRecordMeansEmpiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.descriptiveDatasetMeansCaptureQualityValidated).toBe(false);
    expect(contract.authorityBoundary.sameParticipantSeriesGroupingMeansIdentityMatching).toBe(false);
    expect(contract.authorityBoundary.thresholdsIssued).toBe(false);
    expect(contract.authorityBoundary.constructValidity).toBe('unresolved');
    expect(contract.authorityBoundary.traditionalBinding).toBe('unresolved');
    expect(contract.authorityBoundary.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects forged FR159 manifests and forged FR158 runtimes instead of trusting object shape', () => {
    const forgedManifest = {
      schemaVersion: 'fr159-eye-pair-prospective-capture-manifest-v1',
      traditionalSemanticAuthority: false,
    } as unknown as EyePairProspectiveCaptureManifestFR159V1;
    const forgedRuntime = {
      schemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
      traditionalSemanticAuthority: false,
    } as unknown as RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1;
    expect(() => recordEyePairProspectiveAcquisitionFR160({
      manifest: forgedManifest,
      metricRuntime: forgedRuntime,
      metricRuntimeCorrespondsToManifestCaptureAttested: true,
    })).toThrow(/FR-159|FR-160/u);
  });

  it('rejects forged acquisition records during dataset materialization', () => {
    const forgedRecord = {
      schemaVersion: 'fr160-eye-pair-prospective-acquisition-record-v1',
      artifactVersion: '0.1.0',
      authorityState: 'prospective_admitted_metric_observation_record_only_no_repeatability_adjudication',
      prospectiveEligibilityState: 'fr159_attestations_accepted_not_independently_verified',
      traditionalSemanticAuthority: false,
    } as unknown as EyePairProspectiveAcquisitionRecordFR160V1;
    expect(() => materializeEyePairProspectiveAcquisitionDatasetFR160([forgedRecord])).toThrow(/FR-160/u);
  });

  it('does not store raw biometric surfaces or identity templates in the acquisition artifact contract', () => {
    const contract = getEyePairProspectiveAcquisitionContractFR160();
    expect(contract.privacyBoundary.rawImageStoredByArtifact).toBe(false);
    expect(contract.privacyBoundary.rawProviderResponseStoredByArtifact).toBe(false);
    expect(contract.privacyBoundary.rawLandmarkSetStoredByArtifact).toBe(false);
    expect(contract.privacyBoundary.derivedFullFaceMetricGeometryStoredByArtifact).toBe(false);
    expect(contract.privacyBoundary.faceEmbeddingStoredByArtifact).toBe(false);
    expect(contract.privacyBoundary.identityTemplateStoredByArtifact).toBe(false);
  });
});
