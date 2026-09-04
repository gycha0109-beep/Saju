import fs from 'node:fs';
import process from 'node:process';

await import('./verify-fr130-methodology-review-governance-trust-anchor-materialization-admission.mjs');

const {
  FACE_FR131_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR131_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
  FACE_FR131_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY,
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js');
const { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-methodology-review-decision-authority-fr124.js'
);
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);

const governanceSource = fs.readFileSync(
  'governance/face-reading/methodology-review-project-owner-governance-v1.md',
  'utf8',
);
if (
  !governanceSource.includes('The MyeongHa project owner is the final methodology-review authority') ||
  !governanceSource.includes('External experts are not required') ||
  !governanceSource.includes('required approval count is exactly one') ||
  !governanceSource.includes('does not itself approve any existing methodology or proposed successor')
) throw new Error('FR131 project-owner governance source drift.');

const fr131 = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(fr131);

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
  fr131.authorityState !== 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending' ||
  fr131.predecessor.fr130AuthorityState !== 'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation' ||
  fr131.predecessor.fr130NextFrontier !== 'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission' ||
  fr131.governanceDecision.decisionRef !== 'governance.face.methodology_review.project_owner_single_approver@0.1.0' ||
  fr131.governanceDecision.governanceSourceRef !== 'repo:governance/face-reading/methodology-review-project-owner-governance-v1.md' ||
  fr131.governanceDecision.authorityRoleRef !== 'role.myeongha.project_owner' ||
  fr131.governanceDecision.requiredApprovalCount !== 1 ||
  fr131.governanceDecision.configuredReviewerCount !== 1 ||
  fr131.governanceDecision.configuredQuorum !== null ||
  fr131.governanceDecision.configuredConsensusThreshold !== null ||
  fr131.governanceDecision.externalExpertRequired !== false ||
  fr131.governanceDecision.targetSpecificApprovalRequired !== true ||
  fr131.currentGovernance.governedTrustAnchorRef !== 'anchor.myeongha.project_owner_methodology_review@0.1.0' ||
  fr131.currentGovernance.governedAuthorityActorRef !== 'actor.myeongha.project_owner@0.1.0' ||
  fr131.currentGovernance.governedReviewEvidencePolicyRef !== 'policy.myeongha.project_owner_single_approver_methodology_review@0.1.0' ||
  fr131.currentGovernance.trustAnchorDefinitionCount !== 1 ||
  fr131.currentGovernance.trustAnchorMaterializedCount !== 1 ||
  fr131.currentGovernance.authorityActorDefinitionCount !== 1 ||
  fr131.currentGovernance.reviewEvidencePolicyDefinitionCount !== 1 ||
  fr131.currentGovernance.targetSpecificReviewDecisionCount !== 0 ||
  fr131.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr131.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr131.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr131.persistedAuthority.historicalFr124DecisionCount !== 0 ||
  fr131.admission.governedExternalDesignationPresent !== true ||
  fr131.admission.governedExternalDesignationAdmitted !== true ||
  fr131.admission.exactTrustAnchorDefinitionBindingPresent !== true ||
  fr131.admission.trustAnchorMaterializationAuthorized !== true ||
  fr131.admission.trustAnchorMaterialized !== true ||
  fr131.admission.actorProvenanceAdmissionAuthorized !== true ||
  fr131.admission.evidencePolicyProvenanceAdmissionAuthorized !== true ||
  fr131.admission.actorRegistryAppendAuthorized !== true ||
  fr131.admission.evidencePolicyRegistryAppendAuthorized !== true ||
  fr131.admission.futureTargetSpecificDecisionMaterializationAuthorized !== true ||
  fr131.admission.targetSpecificReviewDecisionPresent !== false ||
  fr131.admission.reviewedPromotionAuthorized !== false ||
  fr131.execution.governanceDecisionRecordsPersisted !== 1 ||
  fr131.execution.externalDesignationAdmissionsIssued !== 1 ||
  fr131.execution.governanceTrustAnchorsMaterialized !== 1 ||
  fr131.execution.authorityActorDefinitionsPersisted !== 1 ||
  fr131.execution.reviewEvidencePolicyDefinitionsPersisted !== 1 ||
  fr131.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr131.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr131.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr131.execution.metricBindingsIssued !== 0 ||
  fr131.execution.calibrationProtocolsIssued !== 0 ||
  fr131.execution.thresholdsIssued !== 0 ||
  fr131.execution.criterionStatesIssued !== 0 ||
  fr131.execution.structuredClaimsIssued !== 0 ||
  fr131.execution.boundedNarrativesIssued !== 0 ||
  fr131.execution.traditionalSemanticAuthority !== false ||
  fr131.authorityBoundary.projectOwnerGovernanceDecisionMeansTargetMethodologyApproved !== false ||
  fr131.authorityBoundary.singleApproverPolicyMeansAutomaticPromotion !== false ||
  fr131.authorityBoundary.futureDecisionAuthorizationMeansCurrentDecisionIssued !== false ||
  fr131.authorityBoundary.governanceMaterializationMeansMetricBinding !== false ||
  fr131.authorityBoundary.governanceMaterializationMeansThreshold !== false ||
  fr131.authorityBoundary.governanceMaterializationMeansCriterionState !== false ||
  fr131.authorityBoundary.governanceMaterializationMeansClaim !== false ||
  fr131.authorityBoundary.historicalArtifactMutated !== false ||
  fr131.nextFrontier !== 'project_owner_target_specific_intake_methodology_review_decision' ||
  FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY.decisions.length !== 1 ||
  FACE_FR131_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors.length !== 1 ||
  FACE_FR131_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 1 ||
  FACE_FR131_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 1 ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked'
) throw new Error('FR131 exact project-owner methodology review governance materialization drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR131_PROJECT_OWNER_METHODOLOGY_REVIEW_GOVERNANCE_MATERIALIZATION_PASS',
  authorityState: fr131.authorityState,
  governedAuthorityActorRef: fr131.currentGovernance.governedAuthorityActorRef,
  requiredApprovalCount: fr131.governanceDecision.requiredApprovalCount,
  targetSpecificReviewDecisionPresent: fr131.admission.targetSpecificReviewDecisionPresent,
  nextFrontier: fr131.nextFrontier,
})}\n`);
