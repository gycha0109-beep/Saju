import {
  generateKeyPairSync,
  sign as signMessage,
} from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  FR154_NEXT_FRONTIER,
  assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154,
  buildSquareBroadFangWitnessSignaturePayloadBytesFR154,
  computeSquareBroadFangWitnessSignerPublicKeySpkiDigestFR154,
  computeSquareBroadFangWitnessSignaturePayloadDigestFR154,
  getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154,
  materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154,
  type SquareBroadFangWitnessSignatureMechanicalVerificationRequestFR154V1,
} from './five-officers-square-broad-fang-witness-signature-mechanical-verification-fr154.js';
import {
  computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153,
  materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153,
} from './five-officers-square-broad-fang-independent-session-witness-evidence-intake-fr153.js';
import {
  materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152,
} from './five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.js';

function makeIntake() {
  const firstWitnessBytes = Uint8Array.from([1, 4, 9, 16]);
  const secondWitnessBytes = Uint8Array.from([2, 3, 5, 7]);
  return materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153({
    schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-request-v1',
    fr152Protocol: materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152(),
    evidenceBundleRef: 'evidence-bundle:fr154:synthetic:001',
    sessions: [
      {
        sessionRef: 'session:fr154:synthetic:001',
        captureEventRef: 'capture-event:fr154:synthetic:001',
        captureRef: 'capture:fr154:synthetic:001',
        captureExecutionClaim:
          'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified',
        witnessArtifactRef: 'witness-artifact:fr154:synthetic:001',
        witnessAuthorityRef: 'witness-authority:fr154:synthetic:001',
        witnessClassClaim: 'external_or_operator_independent_claim_not_verified',
        witnessArtifactDeclaredDigest:
          computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(firstWitnessBytes),
        witnessArtifactBytes: firstWitnessBytes,
        sessionSeparationClaimRef: 'session-separation-claim:fr154:synthetic:001',
        captureToWitnessBindingClaimRef: 'capture-witness-binding:fr154:synthetic:001',
      },
      {
        sessionRef: 'session:fr154:synthetic:002',
        captureEventRef: 'capture-event:fr154:synthetic:002',
        captureRef: 'capture:fr154:synthetic:002',
        captureExecutionClaim:
          'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified',
        witnessArtifactRef: 'witness-artifact:fr154:synthetic:002',
        witnessAuthorityRef: 'witness-authority:fr154:synthetic:002',
        witnessClassClaim: 'external_or_operator_independent_claim_not_verified',
        witnessArtifactDeclaredDigest:
          computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(secondWitnessBytes),
        witnessArtifactBytes: secondWitnessBytes,
        sessionSeparationClaimRef: 'session-separation-claim:fr154:synthetic:002',
        captureToWitnessBindingClaimRef: 'capture-witness-binding:fr154:synthetic:002',
      },
    ],
  });
}

function makeRequest(): SquareBroadFangWitnessSignatureMechanicalVerificationRequestFR154V1 {
  const intake = makeIntake();
  const sessionVerifications = intake.candidateSessions.map((session, index) => {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519');
    const signerPublicKeyPem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
    const payload = buildSquareBroadFangWitnessSignaturePayloadBytesFR154(intake, session.sessionRef);
    return {
      sessionRef: session.sessionRef,
      signerKeyRef: `signer-key:fr154:synthetic:${index + 1}`,
      signerPublicKeyPem,
      declaredSignerPublicKeySpkiDigest:
        computeSquareBroadFangWitnessSignerPublicKeySpkiDigestFR154(signerPublicKeyPem),
      detachedSignatureBytes: new Uint8Array(signMessage(null, payload, privateKey)),
    };
  });
  return {
    schemaVersion: 'fr154-square-broad-fang-witness-signature-mechanical-verification-request-v1',
    fr153EvidenceIntake: intake,
    sessionVerifications,
  };
}

describe('FR154 square broad Fang witness signature mechanical verification', () => {
  it('defines a research Ed25519 mechanical verifier without witness trust or admission authority', () => {
    const contract = getSquareBroadFangWitnessSignatureMechanicalVerificationContractFR154();
    expect(contract.issuedFR153EvidenceIntakeRequired).toBe(true);
    expect(contract.exactCandidateSessionCoverageRequired).toBe(true);
    expect(contract.researchSignatureVerificationPrimitive).toBe('ed25519_node_crypto_v1');
    expect(contract.signerPublicKeySpkiDigestSelfConsistencyRequired).toBe(true);
    expect(contract.detachedSignatureMathematicalVerificationRequired).toBe(true);
    expect(contract.callerSuppliedPublicKeyMeansPinnedTrustRoot).toBe(false);
    expect(contract.mathematicalSignatureValidityMeansTrustedWitnessIdentity).toBe(false);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.witnessTrustRootDefinedByThisArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisArtifact).toBe(false);
    expect(contract.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.thresholdDefinitionPerformedByThisArtifact).toBe(false);
    expect(contract.repeatabilityInterpretationPerformedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR154_NEXT_FRONTIER);
  });

  it('builds deterministic bounded payloads and mathematically verifies synthetic signatures', () => {
    const request = makeRequest();
    const firstSessionRef = request.fr153EvidenceIntake.candidateSessions[0]!.sessionRef;
    expect(computeSquareBroadFangWitnessSignaturePayloadDigestFR154(
      request.fr153EvidenceIntake,
      firstSessionRef,
    )).toMatch(/^sha256:[0-9a-f]{64}$/u);

    const output = materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(request);
    assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154(output);
    expect(output.verifiedSessionCount).toBe(2);
    expect(output.verificationEntries).toHaveLength(2);
    expect(output.verificationEntries.every((entry) => entry.signerPublicKeySpkiDigestSelfConsistencyVerified)).toBe(true);
    expect(output.verificationEntries.every((entry) => entry.cryptographicSignatureMathematicallyVerified)).toBe(true);
    expect(output.mechanicalVerificationBoundary.allCandidateSessionsCryptographicallyVerified).toBe(true);
    expect(output.verificationEntries.every((entry) => !('signerPublicKeyPem' in entry))).toBe(true);
    expect(output.verificationEntries.every((entry) => !('detachedSignatureBytes' in entry))).toBe(true);
  });

  it('keeps mathematical signature validity distinct from witness identity, trust, claim truth, and session independence', () => {
    const output = materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(makeRequest());
    const boundary = output.mechanicalVerificationBoundary;
    expect(boundary.callerSuppliedSignerKeyRefMeansTrustedSigner).toBe(false);
    expect(boundary.callerSuppliedPublicKeyMeansPinnedTrustRoot).toBe(false);
    expect(boundary.mathematicalSignatureValidityMeansTrustedWitnessIdentity).toBe(false);
    expect(boundary.mathematicalSignatureValidityMeansWitnessClaimTrue).toBe(false);
    expect(boundary.mathematicalSignatureValidityMeansCaptureExecutionVerified).toBe(false);
    expect(boundary.mathematicalSignatureValidityMeansSessionSeparationVerified).toBe(false);
    expect(boundary.mathematicalSignatureValidityMeansCaptureToWitnessBindingVerified).toBe(false);
    expect(boundary.mathematicalSignatureValidityMeansIndependentSessionEvidenceAdmitted).toBe(false);

    for (const entry of output.verificationEntries) {
      expect(entry.signerKeyTrustEstablished).toBe(false);
      expect(entry.externalWitnessIdentityVerified).toBe(false);
      expect(entry.witnessClassVerified).toBe(false);
      expect(entry.witnessArtifactSemanticContentVerified).toBe(false);
      expect(entry.captureExecutionIndependentlyVerified).toBe(false);
      expect(entry.sessionSeparationVerified).toBe(false);
      expect(entry.captureToWitnessBindingVerified).toBe(false);
      expect(entry.independentSessionEvidenceAdmitted).toBe(false);
    }
  });

  it('preserves empirical, construct, threshold, repeatability, privacy, and semantic authority gates', () => {
    const output = materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(makeRequest());
    expect(output.witnessTrustBoundary.signerKeyTrustEstablished).toBe(false);
    expect(output.witnessTrustBoundary.witnessAuthorityTrustBound).toBe(false);
    expect(output.witnessTrustBoundary.externalWitnessIdentityVerified).toBe(false);
    expect(output.witnessTrustBoundary.witnessClassVerified).toBe(false);
    expect(output.witnessTrustBoundary.witnessArtifactSemanticContentVerified).toBe(false);
    expect(output.witnessTrustBoundary.productionWitnessVerificationAlgorithm).toBeNull();
    expect(output.witnessTrustBoundary.pinnedWitnessTrustRootRef).toBeNull();
    expect(output.witnessTrustBoundary.witnessTrustRootDefinedByThisArtifact).toBe(false);
    expect(output.witnessTrustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);

    expect(output.authorityBoundary.mechanicalWitnessSignatureVerificationPerformed).toBe(true);
    expect(output.authorityBoundary.independentMultiSessionEvidenceAcquired).toBe(false);
    expect(output.authorityBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(output.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(output.authorityBoundary.empiricalPerturbationValidationPerformed).toBe(false);
    expect(output.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(output.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(output.authorityBoundary.captureQualityValidated).toBe(false);
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
    expect(output.privacyBoundary.signerPublicKeyPemPersisted).toBe(false);
    expect(output.privacyBoundary.detachedSignatureBytesPersisted).toBe(false);
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

  it('rejects a mismatched declared SPKI digest', () => {
    const request = makeRequest();
    const first = request.sessionVerifications[0]!;
    const tampered: SquareBroadFangWitnessSignatureMechanicalVerificationRequestFR154V1 = {
      ...request,
      sessionVerifications: [
        { ...first, declaredSignerPublicKeySpkiDigest: `sha256:${'0'.repeat(64)}` },
        request.sessionVerifications[1]!,
      ],
    };
    expect(() => materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(tampered)).toThrow(
      /SPKI digest mismatch/i,
    );
  });

  it('rejects a detached signature that does not verify over the canonical payload', () => {
    const request = makeRequest();
    const first = request.sessionVerifications[0]!;
    const corruptedSignature = new Uint8Array(first.detachedSignatureBytes);
    corruptedSignature[0] = (corruptedSignature[0]! ^ 0xff) & 0xff;
    const tampered: SquareBroadFangWitnessSignatureMechanicalVerificationRequestFR154V1 = {
      ...request,
      sessionVerifications: [
        { ...first, detachedSignatureBytes: corruptedSignature },
        request.sessionVerifications[1]!,
      ],
    };
    expect(() => materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(tampered)).toThrow(
      /signature does not verify/i,
    );
  });

  it('rejects incomplete coverage, duplicate session coordinates, copied predecessors, and copied outputs', () => {
    const request = makeRequest();
    expect(() => materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154({
      ...request,
      sessionVerifications: [request.sessionVerifications[0]!],
    })).toThrow(/cover every FR-153 candidate session exactly once/i);

    expect(() => materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154({
      ...request,
      sessionVerifications: [
        request.sessionVerifications[0]!,
        { ...request.sessionVerifications[1]!, sessionRef: request.sessionVerifications[0]!.sessionRef },
      ],
    })).toThrow(/duplicates sessionRef/i);

    expect(() => materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154({
      ...request,
      fr153EvidenceIntake: { ...request.fr153EvidenceIntake },
    })).toThrow(/not issued by the active FR-153 boundary/i);

    const issued = materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154(makeRequest());
    expect(() => assertIssuedSquareBroadFangWitnessSignatureMechanicalVerificationFR154({ ...issued })).toThrow(
      /not issued by the active FR-154 boundary/i,
    );
  });
});
