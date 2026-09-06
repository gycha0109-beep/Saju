import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtime = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-independent-session-witness-evidence-intake-fr153.ts',
  'utf8',
);
const test = readFileSync(
  'packages/face-reading/src/five-officers-square-broad-fang-independent-session-witness-evidence-intake-fr153.test.ts',
  'utf8',
);
const note = readFileSync(
  'research/face-reading/fr153-square-broad-fang-independent-session-witness-evidence-intake.md',
  'utf8',
);

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR153 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR153 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['assertIssuedSquareBroadFangIndependentMultiSessionEvidenceAcquisitionProtocolFR152', 'issued FR152 predecessor'],
  ['getSquareBroadFangIndependentMultiSessionEvidenceAcquisitionContractFR152', 'FR152 contract predecessor'],
  ['minimumCandidateSessionCount: 2', 'two-session minimum'],
  ['candidateWitnessArtifactBytesRequiredAtIntake: true', 'witness bytes required'],
  ['candidateWitnessArtifactDeclaredDigestExactMatchRequired: true', 'witness digest match required'],
  ['candidateWitnessEvidenceByteIdentityVerifiedForEveryEntry: true', 'byte identity verification'],
  ['candidateEvidenceBundleMaterialized: true', 'candidate bundle materialization'],
  ['historicalFR146OrFR147AutoAdmissionAllowed: false', 'historical auto admission forbidden'],
  ['retrospectiveSessionRelabelingAllowed: false', 'retrospective relabeling forbidden'],
  ['callerSuppliedWitnessAuthorityRefMeansTrustedWitness: false', 'caller witness ref insufficient'],
  ['witnessArtifactByteDigestMatchMeansWitnessClaimTrue: false', 'byte match not claim truth'],
  ['witnessArtifactByteDigestMatchMeansWitnessIdentityVerified: false', 'byte match not identity'],
  ['captureExecutionClaimMeansCaptureExecutionIndependentlyVerified: false', 'capture claim unverified'],
  ['sessionSeparationClaimMeansSessionSeparationVerified: false', 'session separation claim unverified'],
  ['captureToWitnessBindingClaimMeansBindingVerified: false', 'capture witness binding unverified'],
  ['witnessAuthorityTrustBound: false', 'witness trust unresolved'],
  ['witnessClassVerified: false', 'witness class unresolved'],
  ['witnessArtifactSemanticContentVerified: false', 'witness semantics unresolved'],
  ['productionWitnessVerificationAlgorithm: null', 'production witness algorithm unresolved'],
  ['pinnedWitnessTrustRootRef: null', 'witness trust root unresolved'],
  ['independentSessionEvidenceCanBeAdmittedByThisArtifact: false', 'FR153 non-admission'],
  ['candidateWitnessEvidenceIntakePerformed: true', 'intake performed authority'],
  ['independentMultiSessionEvidenceAcquired: false', 'independent evidence not acquired'],
  ['independentMultiSessionEvidenceAdmitted: false', 'independent evidence not admitted'],
  ['multiSessionIndependenceVerified: false', 'multi-session independence unresolved'],
  ['empiricalPerturbationValidationPerformed: false', 'perturbation validation closed'],
  ['captureQualityMeasurementConstructValidated: false', 'construct validation closed'],
  ['captureQualityThresholdsDefined: false', 'quality threshold closed'],
  ['captureQualityValidated: false', 'quality authority closed'],
  ['repeatabilityInterpretationAllowed: false', 'repeatability interpretation closed'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability unresolved'],
  ['numericCaptureQualityThreshold: null', 'quality numeric threshold closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability numeric threshold closed'],
  ['rawImageAcceptedByThisArtifact: false', 'raw image input forbidden'],
  ['sourceDigestAcceptedByThisArtifact: false', 'source digest input forbidden'],
  ['witnessArtifactBytesPersistedInOutput: false', 'witness bytes not retained'],
  ['witnessArtifactDigestPersisted: true', 'witness evidence digest retained'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['traditionalSemanticAuthority: false', 'traditional authority closed'],
  ['square_broad_fang_prospective_source_backed_multi_session_capture_execution_with_candidate_witness_evidence_then_governed_witness_trust_verification_before_independent_session_admission', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['defines byte-exact candidate evidence intake without trust or admission authority', 'contract test'],
  ['verifies synthetic witness artifact byte identities while retaining only bounded evidence coordinates', 'byte verification test'],
  ['does not convert byte matches or caller claims into witness trust or session independence', 'trust boundary test'],
  ['keeps empirical, construct, threshold, repeatability, privacy, and semantic authority fail-closed', 'authority test'],
  ['rejects a witness artifact whose declared digest does not match the supplied bytes', 'digest mismatch test'],
  ['rejects duplicate session, capture-event, capture, or witness-artifact coordinates', 'uniqueness test'],
  ['rejects copied FR152 protocol objects and undeclared request fields', 'issued predecessor and exact keys test'],
  ['rejects a copied FR153 output object at the issued-object boundary', 'issued output test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['candidate witness-evidence intake contract only', 'scope boundary'],
  ['This byte check establishes only that the bytes supplied to FR153 match the caller-declared byte identity.', 'byte identity caution'],
  ['FR153 does not accept a source-image digest.', 'source digest privacy boundary'],
  ['This remains a claim.', 'capture claim caution'],
  ['historical FR146/FR147 captures are not automatically admitted as independent sessions', 'historical boundary'],
  ['A caller-supplied `witnessAuthorityRef` is not a trust root.', 'trust root caution'],
  ['Witness artifact bytes are required transiently at intake for byte-identity verification but are not retained in the output.', 'witness bytes retention boundary'],
  ['The next empirical frontier is still external to repository-only synthetic tests', 'external evidence blocker'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['independentMultiSessionEvidenceAcquired: true', 'independent evidence acquisition promotion'],
  ['independentMultiSessionEvidenceAdmitted: true', 'independent evidence admission promotion'],
  ['multiSessionIndependenceVerified: true', 'multi-session independence promotion'],
  ['empiricalPerturbationValidationPerformed: true', 'perturbation validation promotion'],
  ['captureQualityMeasurementConstructValidated: true', 'construct promotion'],
  ['captureQualityThresholdsDefined: true', 'threshold promotion'],
  ['captureQualityValidated: true', 'quality promotion'],
  ['repeatabilityInterpretationAllowed: true', 'repeatability interpretation promotion'],
  ['empiricalRepeatabilityEstablished: true', 'repeatability promotion'],
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'provider persistence'],
  ['rawPixelRasterPersisted: true', 'raw raster persistence'],
  ['rawAggregatePersisted: true', 'raw aggregate persistence'],
  ['sourceDigestPersisted: true', 'source digest persistence'],
  ['sourceDigestReturned: true', 'source digest return'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity-template persistence'],
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

stdout.write('FR153_INDEPENDENT_SESSION_WITNESS_EVIDENCE_INTAKE: PASS\n');
