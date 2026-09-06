import { describe, expect, it } from 'vitest';
import {
  FR152_NEXT_FRONTIER,
  assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152,
  getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152,
  materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152,
} from './five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.js';

describe('FR152 square broad Fang independent multi-session evidence acquisition protocol', () => {
  it('freezes a prospective two-session minimum without admitting historical session refs', () => {
    const contract = getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152();
    expect(contract.minimumQualifyingSessionCount).toBe(2);
    expect(contract.prospectiveOnly).toBe(true);
    expect(contract.historicalFR146OrFR147AutoAdmissionAllowed).toBe(false);
    expect(contract.retrospectiveSessionRelabelingAllowed).toBe(false);
    expect(contract.operatorDeclaredSessionRefsSufficient).toBe(false);
    expect(contract.independentWitnessRequired).toBe(true);
    expect(contract.witnessTrustBindingRequired).toBe(true);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.thresholdDefinitionPerformedByThisArtifact).toBe(false);
    expect(contract.repeatabilityInterpretationPerformedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR152_NEXT_FRONTIER);
  });

  it('requires external or operator-independent witness evidence and explicit capture binding', () => {
    const protocol = materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152();
    assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152(protocol);

    expect(protocol.prospectiveAcquisition.protocolFrozenBeforeQualifyingCaptureExecution).toBe(true);
    expect(protocol.prospectiveAcquisition.minimumQualifyingSessionCount).toBe(2);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresNewCaptureEvent).toBe(true);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresDistinctSessionRef).toBe(true);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresDistinctCaptureEventRef).toBe(true);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresExternalOrOperatorIndependentWitness).toBe(true);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresWitnessArtifactRef).toBe(true);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresWitnessAuthorityRef).toBe(true);
    expect(protocol.prospectiveAcquisition.eachQualifyingSessionRequiresWitnessVerificationReport).toBe(true);
    expect(protocol.prospectiveAcquisition.witnessArtifactByteVerificationRequired).toBe(true);
    expect(protocol.prospectiveAcquisition.witnessAuthorityTrustBindingRequired).toBe(true);
    expect(protocol.prospectiveAcquisition.captureToWitnessBindingRequired).toBe(true);
    expect(protocol.prospectiveAcquisition.sessionSeparationMustBeVerifiedByAdmissionBoundary).toBe(true);
    expect(protocol.evidenceRequirements).toHaveLength(6);
    expect(protocol.evidenceRequirements.every((entry) => entry.required)).toBe(true);
  });

  it('enumerates insufficient evidence so opaque refs, bytes, metadata, uploads, and self-attestation cannot promote independence', () => {
    const protocol = materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152();
    expect(protocol.insufficiencyRules.distinctStudyLocalSessionRefsMeanIndependentSessions).toBe(false);
    expect(protocol.insufficiencyRules.distinctCaptureEventRefsMeanIndependentCaptureEvents).toBe(false);
    expect(protocol.insufficiencyRules.byteDistinctnessMeansIndependentCaptureEvents).toBe(false);
    expect(protocol.insufficiencyRules.fileMetadataTimestampMeansTrustedCaptureTimestamp).toBe(false);
    expect(protocol.insufficiencyRules.uploadTimeMeansCaptureTime).toBe(false);
    expect(protocol.insufficiencyRules.separateChatAttachmentsMeanSeparateCaptureSessions).toBe(false);
    expect(protocol.insufficiencyRules.perturbationVariantsMeanIndependentCaptures).toBe(false);
    expect(protocol.insufficiencyRules.historicalFR146CapturesAutoEligibleForIndependentSessionAdmission).toBe(false);
    expect(protocol.insufficiencyRules.retrospectiveSessionRelabelingAllowed).toBe(false);

    for (const requirement of protocol.evidenceRequirements) {
      expect(requirement.satisfiedByHistoricalFR146OrFR147Evidence).toBe(false);
      expect(requirement.satisfiedByDistinctOpaqueRefsAlone).toBe(false);
      expect(requirement.satisfiedByByteDistinctnessAlone).toBe(false);
      expect(requirement.satisfiedByUploadOrAttachmentSeparationAlone).toBe(false);
      expect(requirement.satisfiedByOperatorSelfAttestationAlone).toBe(false);
    }
  });

  it('keeps witness trust unresolved until a governed verifier and pinned trust binding exist', () => {
    const protocol = materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152();
    expect(protocol.witnessTrustBoundary.acceptableWitnessClass).toBe('external_or_operator_independent');
    expect(protocol.witnessTrustBoundary.studyOperatorSelfAttestationAloneAccepted).toBe(false);
    expect(protocol.witnessTrustBoundary.suppliedWitnessRefMeansTrustedWitness).toBe(false);
    expect(protocol.witnessTrustBoundary.suppliedWitnessPublicKeyMeansPinnedTrustRoot).toBe(false);
    expect(protocol.witnessTrustBoundary.mathematicalSignatureValidityAloneMeansTrustedWitnessIdentity).toBe(false);
    expect(protocol.witnessTrustBoundary.productionWitnessVerificationAlgorithm).toBeNull();
    expect(protocol.witnessTrustBoundary.pinnedWitnessTrustRootRef).toBeNull();
    expect(protocol.witnessTrustBoundary.witnessTrustRootDefinedByThisArtifact).toBe(false);
    expect(protocol.witnessTrustBoundary.witnessArtifactSemanticContentVerifiedByThisArtifact).toBe(false);
    expect(protocol.witnessTrustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);
  });

  it('preserves privacy and all capture-quality, construct, repeatability, and semantic authority gates', () => {
    const protocol = materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152();
    expect(protocol.prospectiveAcquisition.sourceImageMayRemainEphemeral).toBe(true);
    expect(protocol.prospectiveAcquisition.sourceDigestRequired).toBe(false);
    expect(protocol.prospectiveAcquisition.rawImagePersistenceRequired).toBe(false);
    expect(protocol.prospectiveAcquisition.exactCaptureTimestampPersistenceRequired).toBe(false);
    expect(protocol.prospectiveAcquisition.geolocationPersistenceRequired).toBe(false);
    expect(protocol.prospectiveAcquisition.deviceIdentifierPersistenceRequired).toBe(false);

    expect(protocol.authorityBoundary.acquisitionProtocolFrozen).toBe(true);
    expect(protocol.authorityBoundary.prospectiveIndependentSessionEvidenceRequired).toBe(true);
    expect(protocol.authorityBoundary.independentMultiSessionEvidenceAcquired).toBe(false);
    expect(protocol.authorityBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(protocol.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(protocol.authorityBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(protocol.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(protocol.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(protocol.authorityBoundary.captureQualityValidated).toBe(false);
    expect(protocol.authorityBoundary.candidateConstructAdvanceDecision).toBe(
      'blocked_pending_prospective_independent_session_evidence_and_trusted_witness_verification',
    );
    expect(protocol.authorityBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(protocol.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.authorityBoundary.repeatabilityClassificationIssued).toBe(false);
    expect(protocol.authorityBoundary.numericCaptureQualityThreshold).toBeNull();
    expect(protocol.authorityBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();

    expect(protocol.privacyBoundary.rawImagePersisted).toBe(false);
    expect(protocol.privacyBoundary.rawProviderResponsePersisted).toBe(false);
    expect(protocol.privacyBoundary.rawPixelRasterPersisted).toBe(false);
    expect(protocol.privacyBoundary.rawAggregatePersisted).toBe(false);
    expect(protocol.privacyBoundary.sourceDigestPersisted).toBe(false);
    expect(protocol.privacyBoundary.sourceDigestReturned).toBe(false);
    expect(protocol.privacyBoundary.embeddingPersisted).toBe(false);
    expect(protocol.privacyBoundary.identityTemplatePersisted).toBe(false);
    expect(protocol.privacyBoundary.exactCaptureTimestampPersisted).toBe(false);
    expect(protocol.privacyBoundary.geolocationPersisted).toBe(false);
    expect(protocol.privacyBoundary.deviceIdentifierPersisted).toBe(false);

    expect(protocol.semanticAuthority.constructValidity).toBe('unresolved');
    expect(protocol.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(protocol.semanticAuthority.criterionState).toBeNull();
    expect(protocol.semanticAuthority.structuredClaim).toBeNull();
    expect(protocol.semanticAuthority.boundedNarrative).toBeNull();
    expect(protocol.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects a copied protocol object at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152();
    expect(() => assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152({ ...issued })).toThrow(
      /not issued by the active FR-152 boundary/i,
    );
  });
});
