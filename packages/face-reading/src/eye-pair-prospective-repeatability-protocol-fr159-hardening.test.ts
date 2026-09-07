import { describe, expect, it } from 'vitest';
import {
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
  admitEyePairProspectiveCaptureManifestFR159,
  assertIssuedEyePairProspectiveCaptureManifestFR159,
  getEyePairProspectiveRepeatabilityProtocolFR159,
  type EyePairProspectiveCaptureManifestFR159V1,
} from './eye-pair-prospective-repeatability-protocol-fr159.js';


describe('FR159 eye-pair prospective repeatability protocol hardening', () => {
  it('rejects forged capture manifests outside the active issuer', () => {
    const forged = {
      schemaVersion: 'fr159-eye-pair-prospective-capture-manifest-v1',
      artifactVersion: '0.1.0',
      authorityState: 'prospective_capture_manifest_only_no_empirical_validation',
      traditionalSemanticAuthority: false,
    } as unknown as EyePairProspectiveCaptureManifestFR159V1;
    expect(() => assertIssuedEyePairProspectiveCaptureManifestFR159(forged)).toThrow(/FR-159/u);
  });

  it('freezes issued manifest values and does not store identity resolution material', () => {
    const manifest = admitEyePairProspectiveCaptureManifestFR159({
      prospectiveCollectionRef: 'collection:hardening',
      captureSeriesRef: 'series:hardening',
      captureRef: 'capture:hardening:1',
      captureConditionRef: 'condition:hardening',
      captureSequenceIndex: 1,
      postPreregistrationFreshCaptureAttested: true,
      sameParticipantSeriesAttested: true,
      usedForCandidateSelection: false,
      developmentCaptureReuse: false,
      identityMatchingPerformed: false,
    });
    expect(Object.isFrozen(manifest)).toBe(true);
    expect(Object.isFrozen(manifest.eligibilityAttestation)).toBe(true);
    expect(Object.isFrozen(manifest.identityBoundary)).toBe(true);
    expect(manifest.identityBoundary.externalIdentityResolutionAllowed).toBe(false);
    expect(manifest.identityBoundary.biometricTemplateIssued).toBe(false);
  });

  it('does not claim that freshness attestation is independent proof', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.authorityBoundary.freshnessAttestationMeansIndependentFreshnessProof).toBe(false);
    expect(protocol.authorityBoundary.protocolDefinitionMeansFreshCaptureEvidenceCollected).toBe(false);
    expect(protocol.execution.empiricalFreshCaptureRecordsBundledAtDefinitionTime).toBe(0);
  });

  it('keeps protocol-local series grouping separate from identity matching or biometric templates', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.privacyBoundary.captureSeriesRefMustBeProtocolLocalOpaqueReference).toBe(true);
    expect(protocol.privacyBoundary.captureSeriesRefClaimedAnonymous).toBe(false);
    expect(protocol.authorityBoundary.sameParticipantSeriesAttestationMeansIdentityMatching).toBe(false);
    expect(protocol.authorityBoundary.repeatCaptureGroupingMeansBiometricTemplate).toBe(false);
  });

  it('does not persist raw biometric surfaces or derive semantic authority in the protocol artifact', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.privacyBoundary.rawImageStoredByProtocolArtifact).toBe(false);
    expect(protocol.privacyBoundary.rawProviderResponseStoredByProtocolArtifact).toBe(false);
    expect(protocol.privacyBoundary.rawLandmarkSetStoredByProtocolArtifact).toBe(false);
    expect(protocol.privacyBoundary.derivedFullFaceMetricGeometryStoredByProtocolArtifact).toBe(false);
    expect(protocol.privacyBoundary.faceEmbeddingStoredByProtocolArtifact).toBe(false);
    expect(protocol.privacyBoundary.identityTemplateStoredByProtocolArtifact).toBe(false);
    expect(protocol.execution.traditionalSemanticAuthority).toBe(false);
  });

  it('locks the primary feature set without silently admitting the other FR158 exploratory metrics', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.preregistration.primaryMetricRefs).toEqual([
      FR159_X_SPAN_METRIC_REF,
      FR159_PERIMETER_METRIC_REF,
    ]);
    expect(protocol.preregistration.primaryMetricRefs).toHaveLength(2);
  });

  it('keeps capture-condition strata descriptive rather than treating them as a validated quality construct', () => {
    const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();
    expect(protocol.acquisition.captureConditionStratumRefRequired).toBe(true);
    expect(protocol.acquisition.conditionVocabulary).toBeNull();
    expect(protocol.acquisition.conditionThresholds).toBeNull();
    expect(protocol.descriptiveAnalysis.captureQualityScoreIssued).toBe(false);
    expect(protocol.authorityBoundary.captureConditionRefMeansValidatedCaptureQualityConstruct).toBe(false);
  });
});
