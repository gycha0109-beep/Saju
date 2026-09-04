import process from 'node:process';

await import('./verify-fr127-methodology-review-actor-evidence-policy-materialization-admission.mjs');

const {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-governance-trust-anchor-admission-fr128.js');
const {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js');
const { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-methodology-review-decision-authority-fr124.js'
);
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);
const { CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59 } = await import(
  '../.face-reading-dist/central-chin-external-provenance-verification-fr59.js'
);

const fr128 = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128(fr128);

const target = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
);
const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
);
const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
);

if (
  fr128.authorityState !== 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor' ||
  fr128.predecessor.fr127AuthorityState !== 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance' ||
  fr128.predecessor.fr127NextFrontier !== 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission' ||
  fr128.predecessor.actorDefinitionCount !== 0 ||
  fr128.predecessor.evidencePolicyDefinitionCount !== 0 ||
  fr128.predecessor.fr124DecisionCount !== 0 ||
  fr128.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr128.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr128.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr128.rootGovernanceRequirements.independentGovernanceTrustAnchorRequired !== true ||
  fr128.rootGovernanceRequirements.trustAnchorMustPreexistActorProvenanceAdmission !== true ||
  fr128.rootGovernanceRequirements.trustAnchorMustPreexistEvidencePolicyProvenanceAdmission !== true ||
  fr128.rootGovernanceRequirements.actorMaySelfAuthorizeOwnProvenance !== false ||
  fr128.rootGovernanceRequirements.evidencePolicyMaySelfAdmitOwnProvenance !== false ||
  fr128.currentRootGovernance.independentGovernanceTrustAnchorRef !== null ||
  fr128.currentRootGovernance.independentAuthorityActorRef !== null ||
  fr128.currentRootGovernance.actorProvenanceCandidateRef !== null ||
  fr128.currentRootGovernance.actorProvenanceAdmissionRef !== null ||
  fr128.currentRootGovernance.evidencePolicyProvenanceCandidateRef !== null ||
  fr128.currentRootGovernance.evidencePolicyProvenanceAdmissionRef !== null ||
  fr128.currentRootGovernance.fr59ExternalProvenanceAuthorityRef !== 'authority.face.central_chin_external_provenance_verification.fr59@0.1.0' ||
  fr128.currentRootGovernance.fr59PinnedExternalTrustRootDefined !== false ||
  fr128.currentRootGovernance.fr59ExternalGovernanceIdentityVerified !== false ||
  fr128.currentRootGovernance.configuredQuorum !== null ||
  fr128.currentRootGovernance.configuredReviewerCount !== null ||
  fr128.currentRootGovernance.configuredConsensusThreshold !== null ||
  fr128.admission.independentGovernanceTrustAnchorPresent !== false ||
  fr128.admission.actorProvenanceAcquisitionAuthorized !== false ||
  fr128.admission.evidencePolicyProvenanceAcquisitionAuthorized !== false ||
  fr128.admission.actorProvenanceAdmissionAuthorized !== false ||
  fr128.admission.evidencePolicyProvenanceAdmissionAuthorized !== false ||
  fr128.admission.actorRegistryAppendAuthorized !== false ||
  fr128.admission.evidencePolicyRegistryAppendAuthorized !== false ||
  fr128.admission.decisionMaterializationAuthorized !== false ||
  fr128.admission.reviewedPromotionAuthorized !== false ||
  fr128.admission.reviewedSuccessorIssued !== false ||
  fr128.admission.reviewedSuccessorPersisted !== false ||
  fr128.execution.governanceTrustAnchorsPersisted !== 0 ||
  fr128.execution.governanceTrustAnchorAdmissionsIssued !== 0 ||
  fr128.execution.actorProvenanceAdmissionsIssued !== 0 ||
  fr128.execution.evidencePolicyProvenanceAdmissionsIssued !== 0 ||
  fr128.execution.authorityActorDefinitionsPersisted !== 0 ||
  fr128.execution.reviewEvidencePolicyDefinitionsPersisted !== 0 ||
  fr128.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr128.execution.methodologyReviewAuthorizationsIssued !== 0 ||
  fr128.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr128.execution.metricBindingsIssued !== 0 ||
  fr128.execution.thresholdsIssued !== 0 ||
  fr128.execution.criterionStatesIssued !== 0 ||
  fr128.execution.structuredClaimsIssued !== 0 ||
  fr128.execution.boundedNarrativesIssued !== 0 ||
  fr128.execution.traditionalSemanticAuthority !== false ||
  fr128.authorityBoundary.actorMayBootstrapOwnReviewAuthority !== false ||
  fr128.authorityBoundary.evidencePolicyMayBootstrapOwnAdmissionAuthority !== false ||
  fr128.authorityBoundary.fr59ExternalProviderProvenanceTrustMeansMethodologyReviewGovernanceRoot !== false ||
  fr128.authorityBoundary.directSourceVerificationEvidenceMeansMethodologyReviewGovernanceRoot !== false ||
  fr128.nextFrontier !== 'independent_methodology_review_governance_trust_anchor_acquisition' ||
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0 ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked' ||
  CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.protocol.pinnedExternalTrustRootDefinedByThisSlice !== false ||
  CENTRAL_CHIN_EXTERNAL_PROVENANCE_VERIFICATION_AUTHORITY_FR59.protocol.externalGovernanceIdentityVerifiedByThisSlice !== false
) throw new Error('FR128 exact methodology review governance trust-anchor admission drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR128_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_ADMISSION_PASS',
  authorityState: fr128.authorityState,
  independentTrustAnchorPresent: fr128.admission.independentGovernanceTrustAnchorPresent,
  actorProvenanceAdmissionAuthorized: fr128.admission.actorProvenanceAdmissionAuthorized,
  evidencePolicyProvenanceAdmissionAuthorized: fr128.admission.evidencePolicyProvenanceAdmissionAuthorized,
  decisionMaterializationAuthorized: fr128.admission.decisionMaterializationAuthorized,
  nextFrontier: fr128.nextFrontier,
})}\n`);
