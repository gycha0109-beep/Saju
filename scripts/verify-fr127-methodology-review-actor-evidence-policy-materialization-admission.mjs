import process from 'node:process';

await import('./verify-fr126-methodology-review-actor-evidence-policy-definition.mjs');

const {
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-actor-evidence-policy-materialization-admission-fr127.js');
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

const fr127 = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127(fr127);

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
  fr127.authorityState !== 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance' ||
  fr127.predecessor.fr126AuthorityState !== 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions' ||
  fr127.predecessor.actorRegistryRef !== 'registry.face.methodology_review_authority_actors.fr126@0.1.0' ||
  fr127.predecessor.evidencePolicyRegistryRef !== 'registry.face.methodology_review_evidence_policies.fr126@0.1.0' ||
  fr127.predecessor.actorDefinitionCount !== 0 ||
  fr127.predecessor.evidencePolicyDefinitionCount !== 0 ||
  fr127.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr127.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr127.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr127.persistedAuthority.fr124DecisionCount !== 0 ||
  fr127.materializationRequirements.governedActorProvenanceRequired !== true ||
  fr127.materializationRequirements.governedEvidencePolicyProvenanceRequired !== true ||
  fr127.materializationRequirements.actorProvenanceMustBeAdmittedBeforeRegistryAppend !== true ||
  fr127.materializationRequirements.evidencePolicyProvenanceMustBeAdmittedBeforeRegistryAppend !== true ||
  fr127.materializationRequirements.provenanceMustBeBoundToMethodologyReviewScope !== true ||
  fr127.materializationRequirements.sourceVerificationRecordMaySubstituteForActorProvenance !== false ||
  fr127.materializationRequirements.sourceCheckerIdentityMaySubstituteForActorProvenance !== false ||
  fr127.materializationRequirements.gitHubIdentityMaySubstituteForActorProvenance !== false ||
  fr127.materializationRequirements.pullRequestMergeMaySubstituteForActorProvenance !== false ||
  fr127.materializationRequirements.pieOperationalPolicyMaySubstituteForEvidencePolicyProvenance !== false ||
  fr127.materializationRequirements.legacyReviewedScalarMaySubstituteForActorOrPolicyProvenance !== false ||
  fr127.currentProvenance.governedActorProvenanceRef !== null ||
  fr127.currentProvenance.governedActorProvenanceAdmissionRef !== null ||
  fr127.currentProvenance.governedEvidencePolicyProvenanceRef !== null ||
  fr127.currentProvenance.governedEvidencePolicyProvenanceAdmissionRef !== null ||
  fr127.currentProvenance.governedAuthorityActorRef !== null ||
  fr127.currentProvenance.governedReviewEvidencePolicyRef !== null ||
  fr127.currentProvenance.admittedReviewEvidenceRefs.length !== 0 ||
  fr127.currentProvenance.configuredQuorum !== null ||
  fr127.currentProvenance.configuredReviewerCount !== null ||
  fr127.currentProvenance.configuredConsensusThreshold !== null ||
  fr127.admission.fr126ActorDefinitionContractReady !== true ||
  fr127.admission.fr126EvidencePolicyDefinitionContractReady !== true ||
  fr127.admission.sourcePrerequisiteSatisfied !== true ||
  fr127.admission.governedActorProvenancePresent !== false ||
  fr127.admission.governedActorProvenanceAdmitted !== false ||
  fr127.admission.governedEvidencePolicyProvenancePresent !== false ||
  fr127.admission.governedEvidencePolicyProvenanceAdmitted !== false ||
  fr127.admission.actorRegistryAppendAuthorized !== false ||
  fr127.admission.evidencePolicyRegistryAppendAuthorized !== false ||
  fr127.admission.actorDefinitionMaterialized !== false ||
  fr127.admission.evidencePolicyDefinitionMaterialized !== false ||
  fr127.admission.decisionMaterializationAuthorized !== false ||
  fr127.admission.decisionRecordIssued !== false ||
  fr127.admission.reviewedPromotionAuthorized !== false ||
  fr127.admission.reviewedSuccessorIssued !== false ||
  fr127.admission.reviewedSuccessorPersisted !== false ||
  fr127.execution.actorProvenanceRecordsPersisted !== 0 ||
  fr127.execution.actorProvenanceAdmissionsIssued !== 0 ||
  fr127.execution.evidencePolicyProvenanceRecordsPersisted !== 0 ||
  fr127.execution.evidencePolicyProvenanceAdmissionsIssued !== 0 ||
  fr127.execution.authorityActorDefinitionsPersisted !== 0 ||
  fr127.execution.reviewEvidencePolicyDefinitionsPersisted !== 0 ||
  fr127.execution.authorityActorsIssued !== 0 ||
  fr127.execution.reviewEvidencePoliciesIssued !== 0 ||
  fr127.execution.admittedReviewEvidenceItemsIssued !== 0 ||
  fr127.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr127.execution.methodologyReviewAuthorizationsIssued !== 0 ||
  fr127.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr127.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr127.execution.metricBindingsIssued !== 0 ||
  fr127.execution.calibrationProtocolsIssued !== 0 ||
  fr127.execution.thresholdsIssued !== 0 ||
  fr127.execution.criterionStatesIssued !== 0 ||
  fr127.execution.structuredClaimsIssued !== 0 ||
  fr127.execution.boundedNarrativesIssued !== 0 ||
  fr127.execution.traditionalSemanticAuthority !== false ||
  fr127.authorityBoundary.definitionContractMeansMaterializationAuthority !== false ||
  fr127.authorityBoundary.provenanceStringMeansGovernedProvenance !== false ||
  fr127.authorityBoundary.structurallyValidDefinitionMeansGovernedMaterialization !== false ||
  fr127.authorityBoundary.sourceVerificationMeansMethodologyReviewGovernance !== false ||
  fr127.authorityBoundary.sourceCheckerMeansMethodologyReviewActor !== false ||
  fr127.authorityBoundary.repositoryIdentityMeansMethodologyReviewActor !== false ||
  fr127.authorityBoundary.pullRequestMergeMeansMethodologyReviewAdjudication !== false ||
  fr127.authorityBoundary.pieOperationalReadinessMeansMethodologyEvidencePolicy !== false ||
  fr127.authorityBoundary.legacyReviewedScalarMeansMaterializationPrecedent !== false ||
  fr127.authorityBoundary.actorOrPolicyMaterializationMeansDecisionAuthority !== false ||
  fr127.authorityBoundary.historicalArtifactMutated !== false ||
  fr127.nextFrontier !== 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission' ||
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0 ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked'
) throw new Error('FR127 exact actor/evidence-policy materialization admission chain drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR127_METHODOLOGY_REVIEW_ACTOR_EVIDENCE_POLICY_MATERIALIZATION_ADMISSION_PASS',
  authorityState: fr127.authorityState,
  actorProvenancePresent: fr127.admission.governedActorProvenancePresent,
  evidencePolicyProvenancePresent: fr127.admission.governedEvidencePolicyProvenancePresent,
  actorRegistryAppendAuthorized: fr127.admission.actorRegistryAppendAuthorized,
  evidencePolicyRegistryAppendAuthorized: fr127.admission.evidencePolicyRegistryAppendAuthorized,
  decisionMaterializationAuthorized: fr127.admission.decisionMaterializationAuthorized,
  nextFrontier: fr127.nextFrontier,
})}\n`);
