import { describe, expect, it } from 'vitest';
import {
  FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
  assertFaceReadingProviderZygionValidationProtocolFR197,
  assertIssuedFaceReadingProviderZygionValidationProtocolFR197,
  issueFaceReadingProviderZygionValidationProtocolFR197,
  type FaceReadingProviderZygionValidationProtocolFR197,
} from './face-reading-provider-zygion-validation-protocol-fr197.js';

function cloneProtocol(): FaceReadingProviderZygionValidationProtocolFR197 {
  return structuredClone(
    FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
  ) as FaceReadingProviderZygionValidationProtocolFR197;
}

describe('FR197 independent provider-to-neutral zygion validation protocol', () => {
  it('consumes the exact FR196 authority state', () => {
    const protocol = assertFaceReadingProviderZygionValidationProtocolFR197(
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
    );
    expect(protocol.upstreamFR196.contractVersion).toBe(
      'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1',
    );
    expect(protocol.upstreamFR196.authorityState).toBe(
      'external_authority_exhausted_candidate_supported_direct_validation_required',
    );
  });

  it('keeps 234/454 unordered and unadmitted', () => {
    const candidate =
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.providerCandidate;
    expect(candidate.providerIndices).toEqual([234, 454]);
    expect(candidate.pairOrderHasSemanticMeaning).toBe(false);
    expect(candidate.admittedProviderIndices).toEqual([]);
    expect(candidate.providerIndexAdmissionAuthorized).toBe(false);
    expect(candidate.providerSideAssignmentAuthorized).toBe(false);
  });

  it('requires neutral ground truth to be independent of provider output', () => {
    const policy =
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.neutralReferencePolicy;
    expect(policy.allowedEvidenceKinds).toEqual([
      'source_governed_direct_semantic_mapping',
      'independently_labelled_neutral_zygion_coordinates',
    ]);
    expect(policy.neutralReferenceMustBeIndependentOfProviderCandidate).toBe(true);
    expect(policy.labelerMaySeeProviderCandidateAssignment).toBe(false);
    expect(policy.providerOutputMaySeedNeutralLabels).toBe(false);
    expect(policy.providerOutputMayAdjustNeutralLabels).toBe(false);
    expect(policy.providerOutputMayFilterNeutralLabels).toBe(false);
    expect(policy.providerDerivedPseudoGroundTruthAllowed).toBe(false);
  });

  it('rejects circular provider-derived pseudo-ground-truth', () => {
    const drift = cloneProtocol() as unknown as {
      neutralReferencePolicy: {
        labelerMaySeeProviderCandidateAssignment: boolean;
        providerOutputMaySeedNeutralLabels: boolean;
        providerDerivedPseudoGroundTruthAllowed: boolean;
      };
    };
    drift.neutralReferencePolicy.labelerMaySeeProviderCandidateAssignment = true;
    drift.neutralReferencePolicy.providerOutputMaySeedNeutralLabels = true;
    drift.neutralReferencePolicy.providerDerivedPseudoGroundTruthAllowed = true;
    expect(() =>
      assertFaceReadingProviderZygionValidationProtocolFR197(
        drift as unknown as FaceReadingProviderZygionValidationProtocolFR197,
      ),
    ).toThrow('fr197_reference_independence_violation');
  });

  it('rejects candidate selection, value filtering, and retrospective relabelling', () => {
    const drift = cloneProtocol() as unknown as {
      selectionPolicy: {
        providerCandidateSelectionAllowed: boolean;
        valueBasedSampleRejectionAllowed: boolean;
        retrospectiveRelabellingToImproveCorrespondenceAllowed: boolean;
      };
    };
    drift.selectionPolicy.providerCandidateSelectionAllowed = true;
    drift.selectionPolicy.valueBasedSampleRejectionAllowed = true;
    drift.selectionPolicy.retrospectiveRelabellingToImproveCorrespondenceAllowed = true;
    expect(() =>
      assertFaceReadingProviderZygionValidationProtocolFR197(
        drift as unknown as FaceReadingProviderZygionValidationProtocolFR197,
      ),
    ).toThrow('fr197_selection_bias_path_enabled');
  });

  it('does not turn linkage into identity proof', () => {
    const linkage =
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.sampleLinkagePolicy;
    expect(linkage.neutralReferenceAndProviderObservationMustReferToSameSample).toBe(true);
    expect(linkage.sampleLinkageMeansIdentityProof).toBe(false);
    expect(linkage.identityMatchingRequired).toBe(false);
    expect(linkage.biometricEmbeddingRequired).toBe(false);
    expect(linkage.identityTemplateRequired).toBe(false);
  });

  it('issues no sample-size mandate, threshold, confidence, or calibration', () => {
    const analysis =
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.analysisPolicy;
    expect(analysis.minimumSampleCount).toBeNull();
    expect(analysis.numericAcceptanceThreshold).toBeNull();
    expect(analysis.confidenceThreshold).toBeNull();
    expect(analysis.calibrationCoefficient).toBeNull();
    expect(analysis.providerToNeutralCorrespondenceEstablished).toBe(false);
    expect(analysis.classifierAuthorized).toBe(false);
  });

  it('rejects threshold or correspondence promotion', () => {
    const drift = cloneProtocol() as unknown as {
      analysisPolicy: {
        providerToNeutralCorrespondenceEstablished: boolean;
        minimumSampleCount: number | null;
        numericAcceptanceThreshold: number | null;
        classifierAuthorized: boolean;
      };
    };
    drift.analysisPolicy.providerToNeutralCorrespondenceEstablished = true;
    drift.analysisPolicy.minimumSampleCount = 5;
    drift.analysisPolicy.numericAcceptanceThreshold = 0.01;
    drift.analysisPolicy.classifierAuthorized = true;
    expect(() =>
      assertFaceReadingProviderZygionValidationProtocolFR197(
        drift as unknown as FaceReadingProviderZygionValidationProtocolFR197,
      ),
    ).toThrow('fr197_analysis_threshold_or_authority_promotion');
  });

  it('does not make the product operator a validation worker', () => {
    expect(
      Object.values(
        FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.operatorBurdenPolicy,
      ).every((flag) => flag === false),
    ).toBe(true);

    const drift = cloneProtocol() as unknown as {
      operatorBurdenPolicy: {
        userRepeatedCaptureCampaignRequired: boolean;
      };
    };
    drift.operatorBurdenPolicy.userRepeatedCaptureCampaignRequired = true;
    expect(() =>
      assertFaceReadingProviderZygionValidationProtocolFR197(
        drift as unknown as FaceReadingProviderZygionValidationProtocolFR197,
      ),
    ).toThrow('fr197_user_or_collection_burden_widening');
  });

  it('keeps every authority-widening path fail-closed', () => {
    expect(
      Object.values(
        FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.authorityBoundary,
      ).every((flag) => flag === false),
    ).toBe(true);
  });

  it('requires issued artifacts for issued-authority validation', () => {
    const issued = issueFaceReadingProviderZygionValidationProtocolFR197();
    expect(assertIssuedFaceReadingProviderZygionValidationProtocolFR197(issued)).toBe(
      issued,
    );
    expect(() =>
      assertIssuedFaceReadingProviderZygionValidationProtocolFR197(
        FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
      ),
    ).toThrow('fr197_unissued_provider_zygion_validation_protocol');
  });

  it('moves only to independent reference evidence acquisition without user burden', () => {
    expect(
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.readiness.nextRequiredGate,
    ).toBe('source_governed_or_independent_reference_correspondence_evidence');
    expect(
      FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197.nextFrontier,
    ).toBe(
      'acquire_source_governed_or_independent_reference_correspondence_evidence_under_fr197_without_user_validation_burden',
    );
  });
});
