import process from 'node:process';

await import('./verify-fr124-intake-methodology-review-decision-authority.mjs');

const {
  assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-decision-materialization-admission-fr125.js');
const { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-methodology-review-decision-authority-fr124.js'
);
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);

const fr125 = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125(fr125);

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
  fr125.authorityState !== 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy' ||
  fr125.predecessor.fr124AuthorityState !== 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record' ||
  fr125.predecessor.decisionRegistryRef !== 'registry.face.methodology_review_decisions.fr124@0.1.0' ||
  fr125.predecessor.decisionCount !== 0 ||
  fr125.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr125.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr125.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr125.materializationRequirements.governedAuthorityActorRegistryRequired !== true ||
  fr125.materializationRequirements.governedReviewEvidencePolicyRequired !== true ||
  fr125.materializationRequirements.evidenceRefsMustResolveUnderPolicy !== true ||
  fr125.materializationRequirements.actorMayBeInferredFromSourceChecker !== false ||
  fr125.materializationRequirements.actorMayBeInferredFromGitHubAuthor !== false ||
  fr125.materializationRequirements.actorMayBeInferredFromPullRequestMerger !== false ||
  fr125.currentGovernance.governedAuthorityActorRegistryRef !== null ||
  fr125.currentGovernance.governedAuthorityActorRef !== null ||
  fr125.currentGovernance.governedReviewEvidencePolicyRef !== null ||
  fr125.currentGovernance.admittedReviewEvidenceRefs.length !== 0 ||
  fr125.currentGovernance.configuredQuorum !== null ||
  fr125.currentGovernance.configuredReviewerCount !== null ||
  fr125.currentGovernance.configuredConsensusThreshold !== null ||
  fr125.admission.fr124DecisionContractReady !== true ||
  fr125.admission.sourcePrerequisiteSatisfied !== true ||
  fr125.admission.authorityActorGovernanceReady !== false ||
  fr125.admission.reviewEvidenceGovernanceReady !== false ||
  fr125.admission.decisionMaterializationAuthorized !== false ||
  fr125.admission.decisionRecordIssued !== false ||
  fr125.admission.reviewedPromotionAuthorized !== false ||
  fr125.admission.reviewedSuccessorIssued !== false ||
  fr125.admission.reviewedSuccessorPersisted !== false ||
  fr125.execution.authorityActorsIssued !== 0 ||
  fr125.execution.reviewEvidencePoliciesIssued !== 0 ||
  fr125.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr125.execution.methodologyReviewAuthorizationsIssued !== 0 ||
  fr125.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr125.execution.thresholdsIssued !== 0 ||
  fr125.execution.criterionStatesIssued !== 0 ||
  fr125.execution.structuredClaimsIssued !== 0 ||
  fr125.execution.boundedNarrativesIssued !== 0 ||
  fr125.execution.traditionalSemanticAuthority !== false ||
  fr125.authorityBoundary.decisionSchemaMeansDecisionAuthority !== false ||
  fr125.authorityBoundary.nonEmptyAuthorityActorStringMeansGovernedActor !== false ||
  fr125.authorityBoundary.nonEmptyEvidenceRefStringMeansAdmittedReviewEvidence !== false ||
  fr125.authorityBoundary.pieOperationalReviewMeansMethodologySemanticReview !== false ||
  fr125.nextFrontier !== 'methodology_review_authority_actor_and_evidence_policy_definition' ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked'
) throw new Error('FR125 exact methodology review decision materialization admission drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR125_INTAKE_METHODOLOGY_REVIEW_DECISION_MATERIALIZATION_ADMISSION_PASS',
  authorityState: fr125.authorityState,
  actorGovernanceReady: fr125.admission.authorityActorGovernanceReady,
  evidenceGovernanceReady: fr125.admission.reviewEvidenceGovernanceReady,
  decisionMaterializationAuthorized: fr125.admission.decisionMaterializationAuthorized,
  decisionRecordsIssued: fr125.execution.methodologyReviewDecisionRecordsIssued,
  reviewedSuccessorPersisted: fr125.admission.reviewedSuccessorPersisted,
  nextFrontier: fr125.nextFrontier,
})}\n`);
