import { describe, expect, it } from 'vitest';
import {
  FR153_NEXT_FRONTIER,
  assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153,
  computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153,
  getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153,
  materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153,
  type SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1,
} from './five-officers-square-broad-fang-independent-session-witness-evidence-intake-fr153.js';
import {
  materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152,
} from './five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.js';

function makeRequest(): SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1 {
  const firstBytes = Uint8Array.from([1, 2, 3, 4]);
  const secondBytes = Uint8Array.from([9, 8, 7, 6]);
  return {
    schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-request-v1',
    fr152Protocol: materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152(),
    evidenceBundleRef: 'evidence-bundle:fr153:synthetic:001',
    sessions: [
      {
        sessionRef: 'session:fr153:synthetic:001',
        captureEventRef: 'capture-event:fr153:synthetic:001',
        captureRef: 'capture:fr153:synthetic:001',
        captureExecutionClaim:
          'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified',
        witnessArtifactRef: 'witness-artifact:fr153:synthetic:001',
        witnessAuthorityRef: 'witness-authority:fr153:synthetic:001',
        witnessClassClaim: 'external_or_operator_independent_claim_not_verified',
        witnessArtifactDeclaredDigest:
          computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(firstBytes),
        witnessArtifactBytes: firstBytes,
        sessionSeparationClaimRef: 'session-separation-claim:fr153:synthetic:001',
        captureToWitnessBindingClaimRef: 'capture-witness-binding:fr153:synthetic:001',
      },
      {
        sessionRef: 'session:fr153:synthetic:002',
        captureEventRef: 'capture-event:fr153:synthetic:002',
        captureRef: 'capture:fr153:synthetic:002',
        captureExecutionClaim:
          'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified',
        witnessArtifactRef: 'witness-artifact:fr153:synthetic:002',
        witnessAuthorityRef: 'witness-authority:fr153:synthetic:002',
        witnessClassClaim: 'external_or_operator_independent_claim_not_verified',
        witnessArtifactDeclaredDigest:
          computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(secondBytes),
        witnessArtifactBytes: secondBytes,
        sessionSeparationClaimRef: 'session-separation-claim:fr153:synthetic:002',
        captureToWitnessBindingClaimRef: 'capture-witness-binding:fr153:synthetic:002',
      },
    ],
  };
}

describe('FR153 square broad Fang independent-session witness evidence intake', () => {
  it('defines byte-exact candidate evidence intake without trust or admission authority', () => {
    const contract = getSquareBroadFangIndependentSessionWitnessEvidenceIntakeContractFR153();
    expect(contract.issuedFR152ProtocolRequired).toBe(true);
    expect(contract.minimumCandidateSessionCount).toBe(2);
    expect(contract.candidateWitnessArtifactBytesRequiredAtIntake).toBe(true);
    expect(contract.candidateWitnessDeclaredDigestExactMatchRequired).toBe(true);
    expect(contract.candidateWitnessBytesRetainedInOutput).toBe(false);
    expect(contract.historicalFR146OrFR147AutoAdmissionAllowed).toBe(false);
    expect(contract.retrospectiveSessionRelabelingAllowed).toBe(false);
    expect(contract.callerSuppliedWitnessAuthorityRefMeansTrustedWitness).toBe(false);
    expect(contract.witnessArtifactByteMatchMeansTrustedWitness).toBe(false);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.witnessTrustRootDefinedByThisArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisArtifact).toBe(false);
    expect(contract.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.thresholdDefinitionPerformedByThisArtifact).toBe(false);
    expect(contract.repeatabilityInterpretationPerformedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR153_NEXT_FRONTIER);
  });

  it('verifies synthetic witness artifact byte identities while retaining only bounded evidence coordinates', () => {
    const output = materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(makeRequest());
    assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(output);

    expect(output.candidateSessionCount).toBe(2);
    expect(output.distinctSessionRefCount).toBe(2);
    expect(output.distinctCaptureEventRefCount).toBe(2);
    expect(output.distinctCaptureRefCount).toBe(2);
    expect(output.distinctWitnessArtifactRefCount).toBe(2);
    expect(output.candidateEvidenceBundleDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(output.intakeBoundary.candidateWitnessEvidenceByteIdentityVerifiedForEveryEntry).toBe(true);
    expect(output.intakeBoundary.candidateEvidenceBundleMaterialized).toBe(true);
    expect(output.candidateSessions.every((entry) => entry.witnessArtifactBytesVerifiedAtIntake)).toBe(true);
    expect(output.candidateSessions.every((entry) => !('witnessArtifactBytes' in entry))).toBe(true);
  });

  it('does not convert byte matches or caller claims into witness trust or session independence', () => {
    const output = materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(makeRequest());

    expect(output.intakeBoundary.callerSuppliedWitnessAuthorityRefMeansTrustedWitness).toBe(false);
    expect(output.intakeBoundary.witnessArtifactByteDigestMatchMeansWitnessClaimTrue).toBe(false);
    expect(output.intakeBoundary.witnessArtifactByteDigestMatchMeansWitnessIdentityVerified).toBe(false);
    expect(output.intakeBoundary.captureExecutionClaimMeansCaptureExecutionIndependentlyVerified).toBe(false);
    expect(output.intakeBoundary.sessionSeparationClaimMeansSessionSeparationVerified).toBe(false);
    expect(output.intakeBoundary.captureToWitnessBindingClaimMeansBindingVerified).toBe(false);

    for (const entry of output.candidateSessions) {
      expect(entry.captureExecutionIndependentlyVerified).toBe(false);
      expect(entry.witnessClassVerified).toBe(false);
      expect(entry.witnessAuthorityTrustBound).toBe(false);
      expect(entry.witnessArtifactSemanticContentVerified).toBe(false);
      expect(entry.sessionSeparationVerified).toBe(false);
      expect(entry.captureToWitnessBindingVerified).toBe(false);
      expect(entry.independentSessionEvidenceAdmitted).toBe(false);
    }

    expect(output.witnessTrustBoundary.productionWitnessVerificationAlgorithm).toBeNull();
    expect(output.witnessTrustBoundary.pinnedWitnessTrustRootRef).toBeNull();
    expect(output.witnessTrustBoundary.witnessTrustRootDefinedByThisArtifact).toBe(false);
    expect(output.witnessTrustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);
  });

  it('keeps empirical, construct, threshold, repeatability, privacy, and semantic authority fail-closed', () => {
    const output = materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(makeRequest());

    expect(output.authorityBoundary.candidateWitnessEvidenceIntakePerformed).toBe(true);
    expect(output.authorityBoundary.independentMultiSessionEvidenceAcquired).toBe(false);
    expect(output.authorityBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(output.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(output.authorityBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(output.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(output.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(output.authorityBoundary.captureQualityValidated).toBe(false);
    expect(output.authorityBoundary.candidateConstructAdvanceDecision).toBe(
      'blocked_pending_prospective_capture_execution_and_governed_witness_trust_verification',
    );
    expect(output.authorityBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(output.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(output.authorityBoundary.repeatabilityClassificationIssued).toBe(false);
    expect(output.authorityBoundary.numericCaptureQualityThreshold).toBeNull();
    expect(output.authorityBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();

    expect(output.privacyBoundary.rawImageAcceptedByThisArtifact).toBe(false);
    expect(output.privacyBoundary.rawImagePersisted).toBe(false);
    expect(output.privacyBoundary.rawProviderResponsePersisted).toBe(false);
    expect(output.privacyBoundary.rawPixelRasterPersisted).toBe(false);
    expect(output.privacyBoundary.rawAggregatePersisted).toBe(false);
    expect(output.privacyBoundary.sourceDigestAcceptedByThisArtifact).toBe(false);
    expect(output.privacyBoundary.sourceDigestPersisted).toBe(false);
    expect(output.privacyBoundary.sourceDigestReturned).toBe(false);
    expect(output.privacyBoundary.witnessArtifactBytesPersistedInOutput).toBe(false);
    expect(output.privacyBoundary.witnessArtifactDigestPersisted).toBe(true);
    expect(output.privacyBoundary.embeddingPersisted).toBe(false);
    expect(output.privacyBoundary.identityTemplatePersisted).toBe(false);
    expect(output.privacyBoundary.exactCaptureTimestampPersisted).toBe(false);
    expect(output.privacyBoundary.geolocationPersisted).toBe(false);
    expect(output.privacyBoundary.deviceIdentifierPersisted).toBe(false);

    expect(output.semanticAuthority.constructValidity).toBe('unresolved');
    expect(output.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(output.semanticAuthority.criterionState).toBeNull();
    expect(output.semanticAuthority.structuredClaim).toBeNull();
    expect(output.semanticAuthority.boundedNarrative).toBeNull();
    expect(output.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects a witness artifact whose declared digest does not match the supplied bytes', () => {
    const request = makeRequest();
    const tampered = {
      ...request,
      sessions: [
        {
          ...request.sessions[0],
          witnessArtifactDeclaredDigest: `sha256:${'0'.repeat(64)}`,
        },
        request.sessions[1],
      ],
    } as SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1;

    expect(() => materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(tampered)).toThrow(
      /byte digest mismatch/i,
    );
  });

  it('rejects duplicate session, capture-event, capture, or witness-artifact coordinates', () => {
    const request = makeRequest();
    const duplicate = {
      ...request,
      sessions: [
        request.sessions[0],
        {
          ...request.sessions[1],
          sessionRef: request.sessions[0]!.sessionRef,
        },
      ],
    } as SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1;

    expect(() => materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(duplicate)).toThrow(
      /duplicates sessionRef/i,
    );
  });

  it('rejects copied FR152 protocol objects and undeclared request fields', () => {
    const request = makeRequest();
    expect(() => materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153({
      ...request,
      fr152Protocol: { ...request.fr152Protocol },
    })).toThrow(/not issued by the active FR-152 boundary/i);

    const widened = {
      ...makeRequest(),
      trustedWitness: true,
    } as unknown as SquareBroadFangIndependentSessionWitnessEvidenceIntakeRequestFR153V1;
    expect(() => materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(widened)).toThrow(
      /exactly the declared fields/i,
    );
  });

  it('rejects a copied FR153 output object at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153(makeRequest());
    expect(() => assertIssuedSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153({ ...issued })).toThrow(
      /not issued by the active FR-153 boundary/i,
    );
  });
});
