import {
  generateKeyPairSync,
  sign as signMessage,
} from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  FR155_NEXT_FRONTIER,
  assertIssuedSquareBroadFangWitnessTrustEvidenceIntakeFR155,
  computeSquareBroadFangWitnessTrustEvidenceArtifactDigestFR155,
  getSquareBroadFangWitnessTrustEvidenceIntakeContractFR155,
  materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155,
  type SquareBroadFangWitnessTrustEvidenceIntakeRequestFR155V1,
} from './five-officers-square-broad-fang-witness-trust-evidence-intake-fr155.js';
import {
  buildSquareBroadFangWitnessSignaturePayloadBytesFR154,
  computeSquareBroadFangWitnessSignerPublicKeySpkiDigestFR154,
  materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154,
} from './five-officers-square-broad-fang-witness-signature-mechanical-verification-fr154.js';
import {
  computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153,
  materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153,
} from './five-officers-square-broad-fang-independent-session-witness-evidence-intake-fr153.js';
import {
  materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152,
} from './five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.js';

function makeFR154Verification() {
  const firstWitnessBytes = Uint8Array.from([3, 1, 4, 1, 5]);
  const secondWitnessBytes = Uint8Array.from([2, 7, 1, 8, 2]);
  const intake = materializeSquareBroadFangIndependentSessionWitnessEvidenceIntakeFR153({
    schemaVersion: 'fr153-square-broad-fang-independent-session-witness-evidence-intake-request-v1',
    fr152Protocol: materializeSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152(),
    evidenceBundleRef: 'evidence-bundle:fr155:synthetic:001',
    sessions: [
      {
        sessionRef: 'session:fr155:synthetic:001',
        captureEventRef: 'capture-event:fr155:synthetic:001',
        captureRef: 'capture:fr155:synthetic:001',
        captureExecutionClaim:
          'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified',
        witnessArtifactRef: 'witness-artifact:fr155:synthetic:001',
        witnessAuthorityRef: 'witness-authority:fr155:synthetic:001',
        witnessClassClaim: 'external_or_operator_independent_claim_not_verified',
        witnessArtifactDeclaredDigest:
          computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(firstWitnessBytes),
        witnessArtifactBytes: firstWitnessBytes,
        sessionSeparationClaimRef: 'session-separation-claim:fr155:synthetic:001',
        captureToWitnessBindingClaimRef: 'capture-witness-binding:fr155:synthetic:001',
      },
      {
        sessionRef: 'session:fr155:synthetic:002',
        captureEventRef: 'capture-event:fr155:synthetic:002',
        captureRef: 'capture:fr155:synthetic:002',
        captureExecutionClaim:
          'prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified',
        witnessArtifactRef: 'witness-artifact:fr155:synthetic:002',
        witnessAuthorityRef: 'witness-authority:fr155:synthetic:002',
        witnessClassClaim: 'external_or_operator_independent_claim_not_verified',
        witnessArtifactDeclaredDigest:
          computeSquareBroadFangIndependentSessionWitnessArtifactDigestFR153(secondWitnessBytes),
        witnessArtifactBytes: secondWitnessBytes,
        sessionSeparationClaimRef: 'session-separation-claim:fr155:synthetic:002',
        captureToWitnessBindingClaimRef: 'capture-witness-binding:fr155:synthetic:002',
      },
    ],
  });

  const sessionVerifications = intake.candidateSessions.map((session, index) => {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519');
    const signerPublicKeyPem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
    const payload = buildSquareBroadFangWitnessSignaturePayloadBytesFR154(intake, session.sessionRef);
    return {
      sessionRef: session.sessionRef,
      signerKeyRef: `signer-key:fr155:synthetic:${index + 1}`,
      signerPublicKeyPem,
      declaredSignerPublicKeySpkiDigest:
        computeSquareBroadFangWitnessSignerPublicKeySpkiDigestFR154(signerPublicKeyPem),
      detachedSignatureBytes: new Uint8Array(signMessage(null, payload, privateKey)),
    };
  });

  return materializeSquareBroadFangWitnessSignatureMechanicalVerificationFR154({
    schemaVersion: 'fr154-square-broad-fang-witness-signature-mechanical-verification-request-v1',
    fr153EvidenceIntake: intake,
    sessionVerifications,
  });
}

function makeRequest(): SquareBroadFangWitnessTrustEvidenceIntakeRequestFR155V1 {
  const verification = makeFR154Verification();
  const trustEvidenceRecords = verification.verificationEntries.map((entry, index) => {
    const bytes = Uint8Array.from([11 + index, 23 + index, 37 + index, 41 + index]);
    return {
      sessionRef: entry.sessionRef,
      signerKeyRef: entry.signerKeyRef,
      signerPublicKeySpkiDigest: entry.signerPublicKeySpkiDigest,
      witnessAuthorityRef: entry.witnessAuthorityRef,
      trustEvidenceArtifactRef: `trust-evidence-artifact:fr155:synthetic:${index + 1}`,
      trustEvidenceIssuerRef: `trust-evidence-issuer:fr155:synthetic:${index + 1}`,
      trustEvidenceClassClaim:
        'signer_key_to_witness_authority_binding_evidence_claim_not_semantically_verified' as const,
      declaredTrustEvidenceArtifactDigest:
        computeSquareBroadFangWitnessTrustEvidenceArtifactDigestFR155(bytes),
      trustEvidenceArtifactBytes: bytes,
      signerToWitnessAuthorityBindingClaimRef:
        `signer-witness-binding-claim:fr155:synthetic:${index + 1}`,
    };
  });
  return {
    schemaVersion: 'fr155-square-broad-fang-witness-trust-evidence-intake-request-v1',
    fr154Verification: verification,
    trustEvidenceRecords,
  };
}

describe('FR155 square broad Fang witness trust evidence intake', () => {
  it('defines candidate trust-evidence intake without trust-root or independent-session admission authority', () => {
    const contract = getSquareBroadFangWitnessTrustEvidenceIntakeContractFR155();
    expect(contract.issuedFR154VerificationRequired).toBe(true);
    expect(contract.exactFR154VerificationCoverageRequired).toBe(true);
    expect(contract.exactSignerCoordinateMatchRequired).toBe(true);
    expect(contract.trustEvidenceArtifactBytesRequiredAtIntake).toBe(true);
    expect(contract.trustEvidenceArtifactDeclaredDigestExactMatchRequired).toBe(true);
    expect(contract.trustEvidenceArtifactBytesRetainedInOutput).toBe(false);
    expect(contract.callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer).toBe(false);
    expect(contract.trustEvidenceByteMatchMeansSemanticContentVerified).toBe(false);
    expect(contract.productionWitnessVerificationAlgorithm).toBeNull();
    expect(contract.pinnedWitnessTrustRootRef).toBeNull();
    expect(contract.governedWitnessTrustRootEstablishedByThisArtifact).toBe(false);
    expect(contract.signerKeyTrustEstablishedByThisArtifact).toBe(false);
    expect(contract.witnessAuthorityTrustBoundByThisArtifact).toBe(false);
    expect(contract.independentSessionEvidenceAdmittedByThisArtifact).toBe(false);
    expect(contract.constructValidationPerformedByThisArtifact).toBe(false);
    expect(contract.thresholdDefinitionPerformedByThisArtifact).toBe(false);
    expect(contract.repeatabilityInterpretationPerformedByThisArtifact).toBe(false);
    expect(contract.nextFrontier).toBe(FR155_NEXT_FRONTIER);
  });

  it('verifies candidate trust-evidence byte identities and binds them to exact FR154 signer coordinates', () => {
    const output = materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155(makeRequest());
    assertIssuedSquareBroadFangWitnessTrustEvidenceIntakeFR155(output);
    expect(output.trustEvidenceRecordCount).toBe(2);
    expect(output.distinctTrustEvidenceArtifactRefCount).toBe(2);
    expect(output.candidateTrustEvidenceBundleDigest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(output.trustEvidenceRecords.every((record) => record.trustEvidenceArtifactBytesVerifiedAtIntake)).toBe(true);
    expect(output.trustEvidenceRecords.every((record) => record.fr154SignerCoordinatesExactMatchVerified)).toBe(true);
    expect(output.trustEvidenceRecords.every((record) => !('trustEvidenceArtifactBytes' in record))).toBe(true);
    expect(output.intakeBoundary.trustEvidenceByteIdentityVerifiedForEveryEntry).toBe(true);
    expect(output.intakeBoundary.candidateTrustEvidenceBundleMaterialized).toBe(true);
  });

  it('keeps candidate trust evidence distinct from issuer identity, signer trust, witness trust, and semantic verification', () => {
    const output = materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155(makeRequest());
    expect(output.intakeBoundary.callerSuppliedTrustEvidenceIssuerRefMeansTrustedIssuer).toBe(false);
    expect(output.intakeBoundary.trustEvidenceByteDigestMatchMeansSemanticContentVerified).toBe(false);
    expect(output.intakeBoundary.trustEvidenceByteDigestMatchMeansSignerTrustEstablished).toBe(false);
    expect(output.intakeBoundary.exactFR154SignerCoordinateMatchMeansSignerTrustEstablished).toBe(false);
    expect(output.intakeBoundary.bindingClaimRefMeansBindingVerified).toBe(false);

    expect(output.trustBoundary.trustEvidenceIssuerIdentityVerified).toBe(false);
    expect(output.trustBoundary.trustEvidenceIssuerTrusted).toBe(false);
    expect(output.trustBoundary.trustEvidenceSemanticContentVerified).toBe(false);
    expect(output.trustBoundary.signerToWitnessAuthorityBindingVerified).toBe(false);
    expect(output.trustBoundary.signerKeyTrustEstablished).toBe(false);
    expect(output.trustBoundary.witnessAuthorityTrustBound).toBe(false);
    expect(output.trustBoundary.externalWitnessIdentityVerified).toBe(false);
    expect(output.trustBoundary.productionWitnessVerificationAlgorithm).toBeNull();
    expect(output.trustBoundary.pinnedWitnessTrustRootRef).toBeNull();
    expect(output.trustBoundary.governedWitnessTrustRootEstablished).toBe(false);
    expect(output.trustBoundary.independentSessionEvidenceCanBeAdmittedByThisArtifact).toBe(false);
  });

  it('preserves empirical, construct, threshold, repeatability, privacy, and semantic authority gates', () => {
    const output = materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155(makeRequest());
    expect(output.authorityBoundary.candidateWitnessTrustEvidenceIntakePerformed).toBe(true);
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
    expect(output.privacyBoundary.trustEvidenceArtifactBytesPersistedInOutput).toBe(false);
    expect(output.privacyBoundary.trustEvidenceArtifactDigestPersisted).toBe(true);
    expect(output.privacyBoundary.signerPublicKeyPemPersisted).toBe(false);
    expect(output.privacyBoundary.detachedSignatureBytesPersisted).toBe(false);
    expect(output.privacyBoundary.embeddingPersisted).toBe(false);
    expect(output.privacyBoundary.identityTemplatePersisted).toBe(false);

    expect(output.semanticAuthority.constructValidity).toBe('unresolved');
    expect(output.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(output.semanticAuthority.criterionState).toBeNull();
    expect(output.semanticAuthority.structuredClaim).toBeNull();
    expect(output.semanticAuthority.boundedNarrative).toBeNull();
    expect(output.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects trust-evidence byte digest mismatches and signer/witness coordinate mismatches', () => {
    const request = makeRequest();
    const first = request.trustEvidenceRecords[0]!;
    expect(() => materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155({
      ...request,
      trustEvidenceRecords: [
        { ...first, declaredTrustEvidenceArtifactDigest: `sha256:${'0'.repeat(64)}` },
        request.trustEvidenceRecords[1]!,
      ],
    })).toThrow(/artifact byte digest mismatch/i);

    expect(() => materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155({
      ...request,
      trustEvidenceRecords: [
        { ...first, signerKeyRef: 'signer-key:fr155:tampered' },
        request.trustEvidenceRecords[1]!,
      ],
    })).toThrow(/exactly match FR-154/i);
  });

  it('rejects incomplete coverage, duplicate evidence refs, copied predecessors, and copied outputs', () => {
    const request = makeRequest();
    expect(() => materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155({
      ...request,
      trustEvidenceRecords: [request.trustEvidenceRecords[0]!],
    })).toThrow(/cover every FR-154 verification entry exactly once/i);

    expect(() => materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155({
      ...request,
      trustEvidenceRecords: [
        request.trustEvidenceRecords[0]!,
        {
          ...request.trustEvidenceRecords[1]!,
          trustEvidenceArtifactRef: request.trustEvidenceRecords[0]!.trustEvidenceArtifactRef,
        },
      ],
    })).toThrow(/duplicates trustEvidenceArtifactRef/i);

    expect(() => materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155({
      ...request,
      fr154Verification: { ...request.fr154Verification },
    })).toThrow(/not issued by the active FR-154 boundary/i);

    const issued = materializeSquareBroadFangWitnessTrustEvidenceIntakeFR155(makeRequest());
    expect(() => assertIssuedSquareBroadFangWitnessTrustEvidenceIntakeFR155({ ...issued })).toThrow(
      /not issued by the active FR-155 boundary/i,
    );
  });
});