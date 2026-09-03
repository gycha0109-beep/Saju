import process from 'node:process';

await import('./verify-fr125-intake-methodology-review-decision-materialization-admission.mjs');

const {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  validateMethodologyReviewAuthorityActorRegistryFR126,
  validateMethodologyReviewEvidencePolicyRegistryFR126,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js');
const { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-methodology-review-decision-authority-fr124.js'
);
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);

validateMethodologyReviewAuthorityActorRegistryFR126(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY);
validateMethodologyReviewEvidencePolicyRegistryFR126(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY);

const fr126 = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126(fr126);

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
  fr126.authorityState !== 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions' ||
  fr126.predecessor.fr125AuthorityState !== 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy' ||
  fr126.predecessor.targetMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
  fr126.predecessor.proposedReviewedSuccessorRef !== 'method.shenxiang.five_officers.intake_criteria@0.3.0' ||
  fr126.predecessor.fr124DecisionCount !== 0 ||
  fr126.predecessor.decisionMaterializationAuthorized !== false ||
  fr126.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr126.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr126.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr126.contracts.authorityScope !== 'methodology_review_promotion' ||
  fr126.contracts.actorRegistryRef !== 'registry.face.methodology_review_authority_actors.fr126@0.1.0' ||
  fr126.contracts.evidencePolicyRegistryRef !== 'registry.face.methodology_review_evidence_policies.fr126@0.1.0' ||
  fr126.contracts.actorProvenanceRefsRequired !== true ||
  fr126.contracts.actorLimitationsRequired !== true ||
  fr126.contracts.evidencePolicyProvenanceRefsRequired !== true ||
  fr126.contracts.evidencePolicyLimitationsRequired !== true ||
  fr126.contracts.configuredQuorum !== null ||
  fr126.contracts.configuredReviewerCount !== null ||
  fr126.contracts.configuredConsensusThreshold !== null ||
  fr126.currentGovernance.actorDefinitionCount !== 0 ||
  fr126.currentGovernance.evidencePolicyDefinitionCount !== 0 ||
  fr126.currentGovernance.governedAuthorityActorRef !== null ||
  fr126.currentGovernance.governedReviewEvidencePolicyRef !== null ||
  fr126.currentGovernance.admittedReviewEvidenceRefs.length !== 0 ||
  fr126.admission.fr125MaterializationGateReady !== true ||
  fr126.admission.sourcePrerequisiteSatisfied !== true ||
  fr126.admission.actorDefinitionContractReady !== true ||
  fr126.admission.evidencePolicyDefinitionContractReady !== true ||
  fr126.admission.governedActorDefinitionPresent !== false ||
  fr126.admission.governedEvidencePolicyDefinitionPresent !== false ||
  fr126.admission.decisionMaterializationAuthorized !== false ||
  fr126.admission.decisionRecordIssued !== false ||
  fr126.admission.reviewedPromotionAuthorized !== false ||
  fr126.admission.reviewedSuccessorIssued !== false ||
  fr126.admission.reviewedSuccessorPersisted !== false ||
  fr126.execution.authorityActorDefinitionsPersisted !== 0 ||
  fr126.execution.reviewEvidencePolicyDefinitionsPersisted !== 0 ||
  fr126.execution.authorityActorsIssued !== 0 ||
  fr126.execution.reviewEvidencePoliciesIssued !== 0 ||
  fr126.execution.admittedReviewEvidenceItemsIssued !== 0 ||
  fr126.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr126.execution.methodologyReviewAuthorizationsIssued !== 0 ||
  fr126.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr126.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr126.execution.metricBindingsIssued !== 0 ||
  fr126.execution.calibrationProtocolsIssued !== 0 ||
  fr126.execution.thresholdsIssued !== 0 ||
  fr126.execution.criterionStatesIssued !== 0 ||
  fr126.execution.structuredClaimsIssued !== 0 ||
  fr126.execution.boundedNarrativesIssued !== 0 ||
  fr126.execution.traditionalSemanticAuthority !== false ||
  fr126.authorityBoundary.actorSchemaMeansActorAuthority !== false ||
  fr126.authorityBoundary.evidencePolicySchemaMeansAdmittedEvidenceAuthority !== false ||
  fr126.authorityBoundary.structurallyValidActorDefinitionMeansGovernedActor !== false ||
  fr126.authorityBoundary.structurallyValidEvidencePolicyMeansGovernedPolicy !== false ||
  fr126.authorityBoundary.nonEmptyProvenanceRefsMeanSemanticApproval !== false ||
  fr126.authorityBoundary.sourceVerificationCheckerMeansMethodologyReviewActor !== false ||
  fr126.authorityBoundary.gitHubIdentityMeansMethodologyReviewActor !== false ||
  fr126.authorityBoundary.pullRequestMergerMeansMethodologyReviewActor !== false ||
  fr126.authorityBoundary.pieOperationalPolicyMeansMethodologyEvidencePolicy !== false ||
  fr126.authorityBoundary.legacyReviewedScalarMeansActorOrPolicyPrecedent !== false ||
  fr126.authorityBoundary.actorOrPolicyDefinitionMeansDecisionAuthority !== false ||
  fr126.authorityBoundary.historicalArtifactMutated !== false ||
  fr126.nextFrontier !== 'governed_methodology_review_actor_and_evidence_policy_materialization' ||
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0 ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked'
) throw new Error('FR126 exact methodology review actor/evidence-policy definition chain drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR126_METHODOLOGY_REVIEW_ACTOR_EVIDENCE_POLICY_DEFINITION_PASS',
  authorityState: fr126.authorityState,
  actorDefinitions: fr126.currentGovernance.actorDefinitionCount,
  evidencePolicyDefinitions: fr126.currentGovernance.evidencePolicyDefinitionCount,
  decisionMaterializationAuthorized: fr126.admission.decisionMaterializationAuthorized,
  reviewedSuccessorPersisted: fr126.admission.reviewedSuccessorPersisted,
  nextFrontier: fr126.nextFrontier,
})}\n`);
