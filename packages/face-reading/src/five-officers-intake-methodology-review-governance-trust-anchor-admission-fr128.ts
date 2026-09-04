import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import {
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
} from './five-officers-intake-methodology-review-actor-evidence-policy-materialization-admission-fr127.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import {
  CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59,
  validateCentralChinExternalProvenanceVerificationAuthorityFR59,
} from './central-chin-external-provenance-verification-fr59.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const FR59_AUTHORITY_REF = 'authority.face.central_chin_external_provenance_verification.fr59@0.1.0' as const;

export interface FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1 {
  readonly schemaVersion: 'fr128-five-officers-intake-methodology-review-governance-trust-anchor-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor';
  readonly predecessor: {
    readonly fr127AuthorityState: 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance';
    readonly fr127NextFrontier: 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission';
    readonly actorDefinitionCount: 0;
    readonly evidencePolicyDefinitionCount: 0;
    readonly fr124DecisionCount: 0;
  };
  readonly persistedAuthority: {
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly proposedReviewedSuccessorPresent: false;
  };
  readonly rootGovernanceRequirements: {
    readonly independentGovernanceTrustAnchorRequired: true;
    readonly trustAnchorMustPreexistActorProvenanceAdmission: true;
    readonly trustAnchorMustPreexistEvidencePolicyProvenanceAdmission: true;
    readonly actorMaySelfAuthorizeOwnProvenance: false;
    readonly evidencePolicyMaySelfAdmitOwnProvenance: false;
    readonly targetActorRegistryMayBeSoleRootOfActorLegitimacy: false;
    readonly targetEvidencePolicyRegistryMayBeSoleRootOfPolicyLegitimacy: false;
    readonly sourceVerificationCheckerMaySubstituteForTrustAnchor: false;
    readonly gitHubIdentityMaySubstituteForTrustAnchor: false;
    readonly pullRequestMergeMaySubstituteForTrustAnchor: false;
    readonly pieOperationalReadinessMaySubstituteForTrustAnchor: false;
    readonly legacyReviewedScalarMaySubstituteForTrustAnchor: false;
    readonly fr59ExternalProviderProvenanceMaySubstituteForMethodologyReviewTrustAnchor: false;
  };
  readonly currentRootGovernance: {
    readonly independentGovernanceTrustAnchorRef: null;
    readonly independentAuthorityActorRef: null;
    readonly actorProvenanceCandidateRef: null;
    readonly actorProvenanceAdmissionRef: null;
    readonly evidencePolicyProvenanceCandidateRef: null;
    readonly evidencePolicyProvenanceAdmissionRef: null;
    readonly fr59ExternalProvenanceAuthorityRef: typeof FR59_AUTHORITY_REF;
    readonly fr59PinnedExternalTrustRootDefined: false;
    readonly fr59ExternalGovernanceIdentityVerified: false;
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly admission: {
    readonly fr127MaterializationGateReady: true;
    readonly sourcePrerequisiteSatisfied: true;
    readonly independentGovernanceTrustAnchorPresent: false;
    readonly actorProvenanceAcquisitionAuthorized: false;
    readonly evidencePolicyProvenanceAcquisitionAuthorized: false;
    readonly actorProvenanceAdmissionAuthorized: false;
    readonly evidencePolicyProvenanceAdmissionAuthorized: false;
    readonly actorProvenanceAdmitted: false;
    readonly evidencePolicyProvenanceAdmitted: false;
    readonly actorRegistryAppendAuthorized: false;
    readonly evidencePolicyRegistryAppendAuthorized: false;
    readonly decisionMaterializationAuthorized: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
    readonly governanceTrustAnchorsPersisted: 0;
    readonly governanceTrustAnchorAdmissionsIssued: 0;
    readonly actorProvenanceCandidatesPersisted: 0;
    readonly actorProvenanceAdmissionsIssued: 0;
    readonly evidencePolicyProvenanceCandidatesPersisted: 0;
    readonly evidencePolicyProvenanceAdmissionsIssued: 0;
    readonly authorityActorDefinitionsPersisted: 0;
    readonly reviewEvidencePolicyDefinitionsPersisted: 0;
    readonly methodologyReviewDecisionRecordsIssued: 0;
    readonly methodologyReviewAuthorizationsIssued: 0;
    readonly methodologyReviewPromotionsIssued: 0;
    readonly reviewedMethodologyDefinitionsIssued: 0;
    readonly metricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly blockers: readonly [
    'no_independent_methodology_review_governance_trust_anchor',
    'no_authorized_actor_provenance_acquisition',
    'no_authorized_evidence_policy_provenance_acquisition',
    'no_governed_actor_provenance_admission',
    'no_governed_evidence_policy_provenance_admission',
  ];
  readonly authorityBoundary: {
    readonly actorMayBootstrapOwnReviewAuthority: false;
    readonly evidencePolicyMayBootstrapOwnAdmissionAuthority: false;
    readonly circularRegistryLegitimacyMeansIndependentGovernance: false;
    readonly sourceVerificationCheckerMeansMethodologyReviewTrustAnchor: false;
    readonly repositoryIdentityMeansMethodologyReviewTrustAnchor: false;
    readonly pullRequestMergeMeansMethodologyReviewTrustAnchor: false;
    readonly pieOperationalReadinessMeansMethodologyReviewTrustAnchor: false;
    readonly legacyReviewedScalarMeansMethodologyReviewTrustAnchor: false;
    readonly fr59ExternalProviderProvenanceTrustMeansMethodologyReviewGovernanceRoot: false;
    readonly directSourceVerificationEvidenceMeansMethodologyReviewGovernanceRoot: false;
    readonly structuralContractMeansPositiveGovernanceAuthority: false;
    readonly futureTrustAnchorMeansReviewDecisionAuthority: false;
    readonly futureTrustAnchorMeansMetricBinding: false;
    readonly futureTrustAnchorMeansThreshold: false;
    readonly futureTrustAnchorMeansCriterionState: false;
    readonly futureTrustAnchorMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'independent_methodology_review_governance_trust_anchor_acquisition';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-128 ${message}`);
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validatePersistedAuthority(): void {
  if (FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0) {
    fail('FR-128 requires the FR-126 actor registry to remain empty before independent root governance exists.');
  }
  if (FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0) {
    fail('FR-128 requires the FR-126 evidence-policy registry to remain empty before independent root governance exists.');
  }
  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) {
    fail('FR-128 requires the FR-124 decision registry to remain empty.');
  }

  const registry = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY;
  const method = registry.methodologies.find((candidate) => methodologyRef(candidate) === TARGET_METHOD_REF);
  const proposed = registry.methodologies.find((candidate) => methodologyRef(candidate) === PROPOSED_REVIEWED_REF);
  const source = registry.passages.find((candidate) => candidate.passageId === WITNESS_QUALIFIED_PASSAGE_REF);
  if (
    method === undefined ||
    method.reviewStatus !== 'research' ||
    method.sourceRefs.length !== 1 ||
    method.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF ||
    proposed !== undefined ||
    source === undefined ||
    source.verificationStatus !== 'scan_checked'
  ) fail('persisted intake methodology authority drift.');
}

function validateExternalProvenanceBoundary(): void {
  const fr59 = validateCentralChinExternalProvenanceVerificationAuthorityFR59();
  const ref = `${fr59.authorityRef}@${fr59.authorityVersion}`;
  if (
    ref !== FR59_AUTHORITY_REF ||
    fr59.authorityState !== 'external_provenance_byte_and_signature_verification_contract_defined_no_pinned_external_trust_root' ||
    fr59.protocol.externalGovernanceIdentityVerifiedByThisSlice !== false ||
    fr59.protocol.signerKeyTrustEstablishedByThisSlice !== false ||
    fr59.protocol.pinnedExternalTrustRootDefinedByThisSlice !== false ||
    fr59.authorityBoundary.mathematicalSignatureValidityMeansGovernanceIdentityVerified !== false ||
    fr59.authorityBoundary.suppliedPublicKeyMeansPinnedTrustRoot !== false
  ) fail('FR-59 external provenance boundary drift.');
}

export function assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128(): FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1 {
  if (CACHED !== null) return CACHED;

  const fr127 = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127(fr127);
  if (
    fr127.authorityState !== 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance' ||
    fr127.predecessor.actorDefinitionCount !== 0 ||
    fr127.predecessor.evidencePolicyDefinitionCount !== 0 ||
    fr127.persistedAuthority.fr124DecisionCount !== 0 ||
    fr127.admission.governedActorProvenancePresent !== false ||
    fr127.admission.governedActorProvenanceAdmitted !== false ||
    fr127.admission.governedEvidencePolicyProvenancePresent !== false ||
    fr127.admission.governedEvidencePolicyProvenanceAdmitted !== false ||
    fr127.admission.actorRegistryAppendAuthorized !== false ||
    fr127.admission.evidencePolicyRegistryAppendAuthorized !== false ||
    fr127.admission.decisionMaterializationAuthorized !== false ||
    fr127.nextFrontier !== 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission'
  ) fail('FR-127 predecessor authority drift.');

  validatePersistedAuthority();
  validateExternalProvenanceBoundary();

  const result: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1 = Object.freeze({
    schemaVersion: 'fr128-five-officers-intake-methodology-review-governance-trust-anchor-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor' as const,
    predecessor: Object.freeze({
      fr127AuthorityState: fr127.authorityState,
      fr127NextFrontier: fr127.nextFrontier,
      actorDefinitionCount: 0 as const,
      evidencePolicyDefinitionCount: 0 as const,
      fr124DecisionCount: 0 as const,
    }),
    persistedAuthority: Object.freeze({
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      proposedReviewedSuccessorPresent: false as const,
    }),
    rootGovernanceRequirements: Object.freeze({
      independentGovernanceTrustAnchorRequired: true as const,
      trustAnchorMustPreexistActorProvenanceAdmission: true as const,
      trustAnchorMustPreexistEvidencePolicyProvenanceAdmission: true as const,
      actorMaySelfAuthorizeOwnProvenance: false as const,
      evidencePolicyMaySelfAdmitOwnProvenance: false as const,
      targetActorRegistryMayBeSoleRootOfActorLegitimacy: false as const,
      targetEvidencePolicyRegistryMayBeSoleRootOfPolicyLegitimacy: false as const,
      sourceVerificationCheckerMaySubstituteForTrustAnchor: false as const,
      gitHubIdentityMaySubstituteForTrustAnchor: false as const,
      pullRequestMergeMaySubstituteForTrustAnchor: false as const,
      pieOperationalReadinessMaySubstituteForTrustAnchor: false as const,
      legacyReviewedScalarMaySubstituteForTrustAnchor: false as const,
      fr59ExternalProviderProvenanceMaySubstituteForMethodologyReviewTrustAnchor: false as const,
    }),
    currentRootGovernance: Object.freeze({
      independentGovernanceTrustAnchorRef: null,
      independentAuthorityActorRef: null,
      actorProvenanceCandidateRef: null,
      actorProvenanceAdmissionRef: null,
      evidencePolicyProvenanceCandidateRef: null,
      evidencePolicyProvenanceAdmissionRef: null,
      fr59ExternalProvenanceAuthorityRef: FR59_AUTHORITY_REF,
      fr59PinnedExternalTrustRootDefined: CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.protocol.pinnedExternalTrustRootDefinedByThisSlice,
      fr59ExternalGovernanceIdentityVerified: CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.protocol.externalGovernanceIdentityVerifiedByThisSlice,
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    admission: Object.freeze({
      fr127MaterializationGateReady: true as const,
      sourcePrerequisiteSatisfied: true as const,
      independentGovernanceTrustAnchorPresent: false as const,
      actorProvenanceAcquisitionAuthorized: false as const,
      evidencePolicyProvenanceAcquisitionAuthorized: false as const,
      actorProvenanceAdmissionAuthorized: false as const,
      evidencePolicyProvenanceAdmissionAuthorized: false as const,
      actorProvenanceAdmitted: false as const,
      evidencePolicyProvenanceAdmitted: false as const,
      actorRegistryAppendAuthorized: false as const,
      evidencePolicyRegistryAppendAuthorized: false as const,
      decisionMaterializationAuthorized: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
      governanceTrustAnchorsPersisted: 0 as const,
      governanceTrustAnchorAdmissionsIssued: 0 as const,
      actorProvenanceCandidatesPersisted: 0 as const,
      actorProvenanceAdmissionsIssued: 0 as const,
      evidencePolicyProvenanceCandidatesPersisted: 0 as const,
      evidencePolicyProvenanceAdmissionsIssued: 0 as const,
      authorityActorDefinitionsPersisted: 0 as const,
      reviewEvidencePolicyDefinitionsPersisted: 0 as const,
      methodologyReviewDecisionRecordsIssued: 0 as const,
      methodologyReviewAuthorizationsIssued: 0 as const,
      methodologyReviewPromotionsIssued: 0 as const,
      reviewedMethodologyDefinitionsIssued: 0 as const,
      metricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    blockers: Object.freeze([
      'no_independent_methodology_review_governance_trust_anchor',
      'no_authorized_actor_provenance_acquisition',
      'no_authorized_evidence_policy_provenance_acquisition',
      'no_governed_actor_provenance_admission',
      'no_governed_evidence_policy_provenance_admission',
    ] as const),
    authorityBoundary: Object.freeze({
      actorMayBootstrapOwnReviewAuthority: false as const,
      evidencePolicyMayBootstrapOwnAdmissionAuthority: false as const,
      circularRegistryLegitimacyMeansIndependentGovernance: false as const,
      sourceVerificationCheckerMeansMethodologyReviewTrustAnchor: false as const,
      repositoryIdentityMeansMethodologyReviewTrustAnchor: false as const,
      pullRequestMergeMeansMethodologyReviewTrustAnchor: false as const,
      pieOperationalReadinessMeansMethodologyReviewTrustAnchor: false as const,
      legacyReviewedScalarMeansMethodologyReviewTrustAnchor: false as const,
      fr59ExternalProviderProvenanceTrustMeansMethodologyReviewGovernanceRoot: false as const,
      directSourceVerificationEvidenceMeansMethodologyReviewGovernanceRoot: false as const,
      structuralContractMeansPositiveGovernanceAuthority: false as const,
      futureTrustAnchorMeansReviewDecisionAuthority: false as const,
      futureTrustAnchorMeansMetricBinding: false as const,
      futureTrustAnchorMeansThreshold: false as const,
      futureTrustAnchorMeansCriterionState: false as const,
      futureTrustAnchorMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'independent_methodology_review_governance_trust_anchor_acquisition' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128(
  value: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128V1,
): void {
  if (!ISSUED.has(value)) fail('governance trust-anchor admission artifact was not issued by FR-128.');
  if (
    value.authorityState !== 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor' ||
    value.currentRootGovernance.independentGovernanceTrustAnchorRef !== null ||
    value.currentRootGovernance.independentAuthorityActorRef !== null ||
    value.admission.independentGovernanceTrustAnchorPresent !== false ||
    value.admission.actorProvenanceAdmissionAuthorized !== false ||
    value.admission.evidencePolicyProvenanceAdmissionAuthorized !== false ||
    value.admission.actorRegistryAppendAuthorized !== false ||
    value.admission.evidencePolicyRegistryAppendAuthorized !== false ||
    value.admission.decisionMaterializationAuthorized !== false ||
    value.execution.governanceTrustAnchorsPersisted !== 0 ||
    value.execution.actorProvenanceAdmissionsIssued !== 0 ||
    value.execution.evidencePolicyProvenanceAdmissionsIssued !== 0 ||
    value.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'independent_methodology_review_governance_trust_anchor_acquisition'
  ) fail('issued governance trust-anchor admission artifact drift.');
}
