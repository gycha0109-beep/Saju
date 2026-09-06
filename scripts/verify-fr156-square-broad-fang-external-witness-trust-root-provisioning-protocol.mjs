import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-external-witness-trust-root-provisioning-protocol-fr156.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-external-witness-trust-root-provisioning-protocol-fr156.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr156-square-broad-fang-external-witness-trust-root-provisioning-protocol.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR156 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR156 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['getSquareBroadFangWitnessTrustEvidenceIntakeContractFR155', 'FR155 predecessor contract'],
  ['protocolFrozenBeforeTrustedRootAdmission: true', 'prospective protocol freeze'],
  ['externalGovernanceAuthorityRequired: true', 'external governance requirement'],
  ['trustRootArtifactBytesRequiredAtAdmission: true', 'root artifact bytes requirement'],
  ['trustRootArtifactDeclaredDigestExactMatchRequired: true', 'root byte identity requirement'],
  ['trustRootAuthorityIdentityVerificationRequired: true', 'authority identity verification'],
  ['trustRootArtifactSemanticContentVerificationRequired: true', 'semantic root verification'],
  ['trustRootKeyPinningByExternalGovernanceRequired: true', 'external key pinning'],
  ['trustRootValidityPolicyRefRequired: true', 'validity policy'],
  ['trustRootRevocationStatusPolicyRefRequired: true', 'revocation status policy'],
  ['signerChainVerificationPolicyRequired: true', 'signer chain policy'],
  ['semanticTrustEvidenceVerifierRequired: true', 'semantic verifier requirement'],
  ['callerSuppliedTrustRootRefMeansGovernedTrustRoot: false', 'caller root ref insufficient'],
  ['callerSuppliedPublicKeyMeansPinnedTrustRoot: false', 'caller key insufficient'],
  ['trustRootArtifactByteDigestMatchMeansAuthorityIdentityVerified: false', 'byte identity not authority identity'],
  ['trustRootArtifactByteDigestMatchMeansSemanticContentVerified: false', 'byte identity not semantics'],
  ['mathematicalSignatureValidityMeansTrustedRootOrWitness: false', 'signature math not trust'],
  ['selfSignedCredentialMeansExternalTrustRoot: false', 'self-signed insufficient'],
  ['syntheticCredentialMeansExternalTrustRoot: false', 'synthetic credential insufficient'],
  ['claimedIssuerRefMeansIssuerIdentityVerified: false', 'claimed issuer insufficient'],
  ['opaquePolicyRefMeansPolicyVerified: false', 'opaque policy ref insufficient'],
  ['fr154MechanicalSignatureMeansTrustedWitness: false', 'FR154 mechanical signature insufficient'],
  ['fr155CandidateTrustEvidenceMeansSignerTrustEstablished: false', 'FR155 candidate evidence insufficient'],
  ['fr155CandidateBundleMeansGovernedTrustRootExists: false', 'FR155 bundle insufficient'],
  ['historicalFR146OrFR147EvidenceEligibleForTrustRootSubstitution: false', 'historical substitution forbidden'],
  ['productionWitnessVerificationAlgorithm: null', 'production verifier unresolved'],
  ['pinnedWitnessTrustRootRef: null', 'trust root unresolved'],
  ['externalTrustRootProvisioned: false', 'external root not provisioned'],
  ['governedWitnessTrustRootEstablished: false', 'governed root unresolved'],
  ['trustRootAuthorityIdentityVerified: false', 'root authority identity unresolved'],
  ['trustRootArtifactSemanticContentVerified: false', 'root semantics unresolved'],
  ['trustRootKeyPinnedByExternalGovernance: false', 'external key pin unresolved'],
  ['semanticTrustEvidenceVerificationPerformed: false', 'semantic trust verification not performed'],
  ['trustEvidenceIssuerIdentityVerified: false', 'issuer identity unresolved'],
  ['trustEvidenceIssuerTrusted: false', 'issuer trust unresolved'],
  ['signerToWitnessAuthorityBindingVerified: false', 'signer witness binding unresolved'],
  ['signerKeyTrustEstablished: false', 'signer trust unresolved'],
  ['witnessAuthorityTrustBound: false', 'witness authority trust unresolved'],
  ['externalWitnessIdentityVerified: false', 'witness identity unresolved'],
  ['independentSessionEvidenceCanBeAdmittedByThisArtifact: false', 'FR156 non-admission'],
  ['externalTrustRootProvisioningProtocolFrozen: true', 'protocol freeze authority'],
  ['externalTrustRootMaterializationPerformed: false', 'root materialization not performed'],
  ['independentMultiSessionEvidenceAcquired: false', 'session evidence not acquired'],
  ['independentMultiSessionEvidenceAdmitted: false', 'session admission closed'],
  ['multiSessionIndependenceVerified: false', 'session independence unresolved'],
  ['captureQualityMeasurementConstructValidated: false', 'construct closed'],
  ['captureQualityThresholdsDefined: false', 'threshold closed'],
  ['captureQualityValidated: false', 'quality closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality threshold null'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold null'],
  ['rawImageAcceptedByThisArtifact: false', 'raw image closed'],
  ['sourceDigestAcceptedByThisArtifact: false', 'source digest closed'],
  ['trustRootArtifactBytesAcceptedByThisProtocolArtifact: false', 'root bytes not accepted by protocol freeze'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_external_governed_trust_root_materialization_and_semantic_verifier_execution_plus_real_prospective_session_acquisition_before_independent_session_admission', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['freezes external-governance trust-root requirements without provisioning a root', 'contract test'],
  ['requires external authority identity, semantic verification, key pinning, policy, and signer-chain evidence', 'requirements test'],
  ['enumerates caller, byte, signature, self-signed, synthetic, and historical insufficiency rules', 'insufficiency test'],
  ['keeps trust, empirical, construct, repeatability, privacy, and semantic authority closed', 'authority test'],
  ['rejects copied protocol objects at the issued-object boundary', 'issued boundary test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['externally governed witness trust root', 'scope'],
  ['A self-generated root cannot become “external” merely because it is encoded in a certificate-like structure.', 'self-generated root caution'],
  ['Historical FR146 A/B are not prospective independent sessions', 'historical non-promotion'],
  ['Synthetic tests cannot prove that an external governance authority exists', 'synthetic boundary'],
  ['genuinely new source-backed prospective capture sessions acquired under the frozen FR152 protocol', 'prospective capture blocker'],
  ['Actual trust establishment requires authoritative material external to this project.', 'external authority blocker'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['externalTrustRootProvisioned: true', 'root provisioning promotion'],
  ['governedWitnessTrustRootEstablished: true', 'root trust promotion'],
  ['trustRootAuthorityIdentityVerified: true', 'root authority identity promotion'],
  ['trustRootArtifactSemanticContentVerified: true', 'root semantic promotion'],
  ['trustRootKeyPinnedByExternalGovernance: true', 'key pin promotion'],
  ['semanticTrustEvidenceVerificationPerformed: true', 'semantic verification promotion'],
  ['trustEvidenceIssuerIdentityVerified: true', 'issuer identity promotion'],
  ['trustEvidenceIssuerTrusted: true', 'issuer trust promotion'],
  ['signerToWitnessAuthorityBindingVerified: true', 'signer binding promotion'],
  ['signerKeyTrustEstablished: true', 'signer trust promotion'],
  ['witnessAuthorityTrustBound: true', 'witness trust promotion'],
  ['externalWitnessIdentityVerified: true', 'witness identity promotion'],
  ['independentMultiSessionEvidenceAcquired: true', 'session evidence promotion'],
  ['independentMultiSessionEvidenceAdmitted: true', 'session admission promotion'],
  ['multiSessionIndependenceVerified: true', 'session independence promotion'],
  ['captureQualityMeasurementConstructValidated: true', 'construct promotion'],
  ['captureQualityThresholdsDefined: true', 'threshold promotion'],
  ['captureQualityValidated: true', 'quality promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['sourceDigestPersisted: true', 'source digest persistence'],
  ['sourceDigestReturned: true', 'source digest return'],
  ['trustRootArtifactBytesPersisted: true', 'root artifact byte persistence'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity template persistence'],
]) forbidFragment(runtime, fragment, label);

for (const fragment of [
  'capture:fr146:real:001:A',
  'capture:fr146:real:001:B',
  'study-subject:fr146:real:001',
  'data:image/jpeg;base64,',
  'data:image/png;base64,',
]) {
  forbidFragment(test, fragment, 'private/real fixture material');
  forbidFragment(note, fragment, 'private/real fixture material');
}

stdout.write('FR156_EXTERNAL_WITNESS_TRUST_ROOT_PROVISIONING_PROTOCOL: PASS\n');