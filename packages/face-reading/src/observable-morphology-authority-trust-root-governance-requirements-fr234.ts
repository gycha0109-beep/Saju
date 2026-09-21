import { createHash } from 'node:crypto';
import {
  assertAuthorityTrustRootCandidateIntakeFR233,
  type FR233AuthorityTrustRootCandidateIntake,
} from './observable-morphology-authority-trust-root-candidate-intake-fr233.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR234_CONTRACT_VERSION =
  'FR234-AUTHORITY-TRUST-ROOT-GOVERNANCE-ADMISSION-REQUIREMENTS-v1' as const;

const ISSUED = new WeakSet<object>();

export interface FR234CandidateAdmissionRequirement {
  readonly authorityRef: string;
  readonly authorityKeyRef: string;
  readonly authorityPublicKeyDigest: string;
  readonly trustRootCandidateRef: string;
  readonly trustRootArtifactRef: string;
  readonly trustRootArtifactDigest: string;
  readonly authorityIdentityEvidenceRef: string;
  readonly externalKeyPinningEvidenceRef: string;
  readonly trustRootPolicyRef: string;
  readonly validityPolicyRef: string;
  readonly revocationStatusPolicyRef: string;
  readonly semanticVerifierRef: string;
  readonly exactFR233CandidateBindingRequired: true;
  readonly independentlyGovernedVerifierRequired: true;
  readonly authorityIdentityVerificationRequired: true;
  readonly semanticTrustRootParsingRequired: true;
  readonly supportedTrustRootKeyFormatVerificationRequired: true;
  readonly externallyGovernedAuthorityKeyPinningRequired: true;
  readonly trustRootPolicyVerificationRequired: true;
  readonly validityPolicyVerificationRequired: true;
  readonly revocationStatusVerificationRequired: true;
  readonly exactAuthorityScopeVerificationRequired: true;
  readonly allChecksRequiredBeforeProvisioning: true;
}

export interface FR234AuthorityTrustRootGovernanceAdmissionRequirements {
  readonly schemaVersion: 'fr234-authority-trust-root-governance-admission-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR234_CONTRACT_VERSION;
  readonly authorityState:
    'external_governance_trust_root_admission_requirements_frozen_no_external_governance_verification_or_trust_root_provisioning_performed';
  readonly sourceFR233IntakeRef: string;
  readonly sourceFR233IntakeDigest: string;
  readonly authorityCount: number;
  readonly candidateRequirements: readonly FR234CandidateAdmissionRequirement[];
  readonly requirementsDigest: string;
  readonly requirementsRef: string;
  readonly requirementsBoundary: {
    readonly activeFR233IntakeRequired: true;
    readonly exactFR233IntakeRefDigestBindingRequired: true;
    readonly exactCandidateCoverageRequired: true;
    readonly independentlyProvisionedExternalGovernanceVerifierRequired: true;
    readonly externalGovernanceAuthorityIdentityVerificationRequired: true;
    readonly semanticTrustRootParsingAndVerificationRequired: true;
    readonly supportedTrustRootKeyFormatPolicyRequired: true;
    readonly externallyGovernedAuthorityKeyPinningRequired: true;
    readonly trustRootValidityPolicyVerificationRequired: true;
    readonly trustRootRevocationStatusVerificationRequired: true;
    readonly exactAuthorityScopeVerificationRequired: true;
    readonly exactCandidateArtifactDigestBindingRequired: true;
    readonly allAdmissionChecksMustSucceedBeforeProvisioning: true;
  };
  readonly insufficiencyBoundary: {
    readonly fr233CandidateIntakeAloneSufficient: false;
    readonly candidateByteIdentityAloneSufficient: false;
    readonly callerSuppliedAuthorityRefSufficient: false;
    readonly callerSuppliedIdentityEvidenceRefSufficient: false;
    readonly callerSuppliedKeyPinningEvidenceRefSufficient: false;
    readonly callerSuppliedPolicyRefsSufficient: false;
    readonly callerSuppliedSemanticVerifierRefSufficient: false;
    readonly callerPinnedAuthorityKeySufficient: false;
    readonly mathematicalSignatureValidityAloneSufficient: false;
    readonly selfSignedOrProjectGeneratedRootSufficient: false;
    readonly syntheticRootOrCredentialSufficient: false;
  };
  readonly availabilityBoundary: {
    readonly independentlyGovernedVerifierProvisionedByThisArtifact: false;
    readonly authoritativeExternalRootAnchorProvisionedByThisArtifact: false;
    readonly actualExternalGovernanceVerificationPerformed: false;
    readonly admissionExecutionSucceeded: false;
    readonly externalTrustRootProvisioned: false;
    readonly requirementsMayBeFrozenWithoutExternalProvisioning: true;
    readonly admissionCanSucceedWithoutExternalProvisioning: false;
  };
  readonly authorityBoundary: {
    readonly requirementsFrozen: true;
    readonly authorityIdentityIndependentlyVerified: false;
    readonly authorityIndependenceIndependentlyVerified: false;
    readonly authorityKeyPinnedByExternalGovernance: false;
    readonly trustRootFormatSemanticallyParsed: false;
    readonly trustRootArtifactSemanticContentVerified: false;
    readonly signingKeyOwnershipIndependentlyVerified: false;
    readonly publicKeyProvenanceIndependentlyAuthenticated: false;
    readonly currentValidityIndependentlyChecked: false;
    readonly revocationStatusIndependentlyChecked: false;
    readonly externalTrustRootProvisioned: false;
    readonly witnessClaimIndependentlyEstablished: false;
    readonly externalEvidenceProvenanceAuthenticated: false;
    readonly externalEvidenceSubstanceIndependentlyAdjudicated: false;
    readonly reviewerHumanStatusIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly calibrationAuthorized: false;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-234 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('requirements material cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('requirements material cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('requirements material must be JSON-compatible.');
}

function sha256Text(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

export function issueAuthorityTrustRootGovernanceAdmissionRequirementsFR234(
  intake: FR233AuthorityTrustRootCandidateIntake,
): FR234AuthorityTrustRootGovernanceAdmissionRequirements {
  assertAuthorityTrustRootCandidateIntakeFR233(intake);

  const candidateRequirements = intake.receipts.map((receipt) => Object.freeze({
    authorityRef: receipt.authorityRef,
    authorityKeyRef: receipt.authorityKeyRef,
    authorityPublicKeyDigest: receipt.authorityPublicKeyDigest,
    trustRootCandidateRef: receipt.trustRootCandidateRef,
    trustRootArtifactRef: receipt.trustRootArtifactRef,
    trustRootArtifactDigest: receipt.trustRootArtifactDigest,
    authorityIdentityEvidenceRef: receipt.authorityIdentityEvidenceRef,
    externalKeyPinningEvidenceRef: receipt.externalKeyPinningEvidenceRef,
    trustRootPolicyRef: receipt.trustRootPolicyRef,
    validityPolicyRef: receipt.validityPolicyRef,
    revocationStatusPolicyRef: receipt.revocationStatusPolicyRef,
    semanticVerifierRef: receipt.semanticVerifierRef,
    exactFR233CandidateBindingRequired: true as const,
    independentlyGovernedVerifierRequired: true as const,
    authorityIdentityVerificationRequired: true as const,
    semanticTrustRootParsingRequired: true as const,
    supportedTrustRootKeyFormatVerificationRequired: true as const,
    externallyGovernedAuthorityKeyPinningRequired: true as const,
    trustRootPolicyVerificationRequired: true as const,
    validityPolicyVerificationRequired: true as const,
    revocationStatusVerificationRequired: true as const,
    exactAuthorityScopeVerificationRequired: true as const,
    allChecksRequiredBeforeProvisioning: true as const,
  })).sort((left, right) => left.authorityRef.localeCompare(right.authorityRef));

  if (candidateRequirements.length !== intake.authorityCount) {
    fail('FR233 authority count and candidate coverage drift.');
  }

  const requirementsDigest = sha256Text(canonicalJson({
    contractVersion: FR234_CONTRACT_VERSION,
    sourceFR233IntakeRef: intake.intakeRef,
    sourceFR233IntakeDigest: intake.intakeDigest,
    candidateRequirements,
  }));

  const result: FR234AuthorityTrustRootGovernanceAdmissionRequirements = Object.freeze({
    schemaVersion: 'fr234-authority-trust-root-governance-admission-requirements-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR234_CONTRACT_VERSION,
    authorityState:
      'external_governance_trust_root_admission_requirements_frozen_no_external_governance_verification_or_trust_root_provisioning_performed' as const,
    sourceFR233IntakeRef: intake.intakeRef,
    sourceFR233IntakeDigest: intake.intakeDigest,
    authorityCount: intake.authorityCount,
    candidateRequirements: Object.freeze(candidateRequirements),
    requirementsDigest,
    requirementsRef:
      `evidence.fr234.authority_trust_root_governance_requirements:${requirementsDigest.slice('sha256:'.length)}`,
    requirementsBoundary: Object.freeze({
      activeFR233IntakeRequired: true as const,
      exactFR233IntakeRefDigestBindingRequired: true as const,
      exactCandidateCoverageRequired: true as const,
      independentlyProvisionedExternalGovernanceVerifierRequired: true as const,
      externalGovernanceAuthorityIdentityVerificationRequired: true as const,
      semanticTrustRootParsingAndVerificationRequired: true as const,
      supportedTrustRootKeyFormatPolicyRequired: true as const,
      externallyGovernedAuthorityKeyPinningRequired: true as const,
      trustRootValidityPolicyVerificationRequired: true as const,
      trustRootRevocationStatusVerificationRequired: true as const,
      exactAuthorityScopeVerificationRequired: true as const,
      exactCandidateArtifactDigestBindingRequired: true as const,
      allAdmissionChecksMustSucceedBeforeProvisioning: true as const,
    }),
    insufficiencyBoundary: Object.freeze({
      fr233CandidateIntakeAloneSufficient: false as const,
      candidateByteIdentityAloneSufficient: false as const,
      callerSuppliedAuthorityRefSufficient: false as const,
      callerSuppliedIdentityEvidenceRefSufficient: false as const,
      callerSuppliedKeyPinningEvidenceRefSufficient: false as const,
      callerSuppliedPolicyRefsSufficient: false as const,
      callerSuppliedSemanticVerifierRefSufficient: false as const,
      callerPinnedAuthorityKeySufficient: false as const,
      mathematicalSignatureValidityAloneSufficient: false as const,
      selfSignedOrProjectGeneratedRootSufficient: false as const,
      syntheticRootOrCredentialSufficient: false as const,
    }),
    availabilityBoundary: Object.freeze({
      independentlyGovernedVerifierProvisionedByThisArtifact: false as const,
      authoritativeExternalRootAnchorProvisionedByThisArtifact: false as const,
      actualExternalGovernanceVerificationPerformed: false as const,
      admissionExecutionSucceeded: false as const,
      externalTrustRootProvisioned: false as const,
      requirementsMayBeFrozenWithoutExternalProvisioning: true as const,
      admissionCanSucceedWithoutExternalProvisioning: false as const,
    }),
    authorityBoundary: Object.freeze({
      requirementsFrozen: true as const,
      authorityIdentityIndependentlyVerified: false as const,
      authorityIndependenceIndependentlyVerified: false as const,
      authorityKeyPinnedByExternalGovernance: false as const,
      trustRootFormatSemanticallyParsed: false as const,
      trustRootArtifactSemanticContentVerified: false as const,
      signingKeyOwnershipIndependentlyVerified: false as const,
      publicKeyProvenanceIndependentlyAuthenticated: false as const,
      currentValidityIndependentlyChecked: false as const,
      revocationStatusIndependentlyChecked: false as const,
      externalTrustRootProvisioned: false as const,
      witnessClaimIndependentlyEstablished: false as const,
      externalEvidenceProvenanceAuthenticated: false as const,
      externalEvidenceSubstanceIndependentlyAdjudicated: false as const,
      reviewerHumanStatusIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      calibrationAuthorized: false as const,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });

  ISSUED.add(result);
  return result;
}

export function assertAuthorityTrustRootGovernanceAdmissionRequirementsFR234(
  requirements: FR234AuthorityTrustRootGovernanceAdmissionRequirements,
): void {
  if (!ISSUED.has(requirements)) {
    fail('governance admission requirements were not issued by active FR234 runtime.');
  }
  if (
    requirements.schemaVersion !== 'fr234-authority-trust-root-governance-admission-requirements-v1'
    || requirements.contractVersion !== FR234_CONTRACT_VERSION
    || requirements.authorityCount !== requirements.candidateRequirements.length
    || Object.values(requirements.requirementsBoundary).some((value) => value !== true)
    || Object.values(requirements.insufficiencyBoundary).some((value) => value !== false)
    || requirements.availabilityBoundary.independentlyGovernedVerifierProvisionedByThisArtifact !== false
    || requirements.availabilityBoundary.authoritativeExternalRootAnchorProvisionedByThisArtifact !== false
    || requirements.availabilityBoundary.actualExternalGovernanceVerificationPerformed !== false
    || requirements.availabilityBoundary.admissionExecutionSucceeded !== false
    || requirements.availabilityBoundary.externalTrustRootProvisioned !== false
    || requirements.availabilityBoundary.requirementsMayBeFrozenWithoutExternalProvisioning !== true
    || requirements.availabilityBoundary.admissionCanSucceedWithoutExternalProvisioning !== false
    || requirements.authorityBoundary.requirementsFrozen !== true
    || Object.entries(requirements.authorityBoundary)
      .some(([key, value]) => key !== 'requirementsFrozen' && value !== false)
  ) {
    fail('FR234 governance admission requirements authority boundary drift.');
  }
}
