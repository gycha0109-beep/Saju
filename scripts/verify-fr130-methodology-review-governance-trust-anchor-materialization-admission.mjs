import process from 'node:process';

await import('./verify-fr129-methodology-review-governance-trust-anchor-definition.mjs');

const {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-governance-trust-anchor-materialization-admission-fr130.js');
const { FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js'
);
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

const fr130 = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130(fr130);

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
  fr130.authorityState !== 'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation' ||
  fr130.predecessor.fr129AuthorityState !== 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor' ||
  fr130.predecessor.fr129NextFrontier !== 'governed_independent_methodology_review_governance_trust_anchor_materialization' ||
  fr130.predecessor.trustAnchorRegistryRef !== 'registry.face.methodology_review_governance_trust_anchors.fr129@0.1.0' ||
  fr130.predecessor.trustAnchorDefinitionCount !== 0 ||
  fr130.predecessor.governedTrustAnchorRef !== null ||
  fr130.persistedAuthority.researchMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
  fr130.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr130.persistedAuthority.witnessQualifiedSourceRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr130.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr130.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr130.persistedAuthority.fr124DecisionCount !== 0 ||
  fr130.persistedAuthority.fr126ActorDefinitionCount !== 0 ||
  fr130.persistedAuthority.fr126EvidencePolicyDefinitionCount !== 0 ||
  fr130.persistedAuthority.fr129TrustAnchorDefinitionCount !== 0 ||
  fr130.materializationRequirements.governedExternalDesignationRequired !== true ||
  fr130.materializationRequirements.governedExternalDesignationEvidenceRequired !== true ||
  fr130.materializationRequirements.governedExternalDesignationProvenanceRequired !== true ||
  fr130.materializationRequirements.externalDesignationMustBeIndependentFromTargetActorRegistry !== true ||
  fr130.materializationRequirements.externalDesignationMustBeIndependentFromTargetEvidencePolicyRegistry !== true ||
  fr130.materializationRequirements.designationMustBindExactTrustAnchorDefinition !== true ||
  fr130.materializationRequirements.structurallyValidCandidateMaySubstituteForExternalDesignation !== false ||
  fr130.materializationRequirements.nonEmptyDesignationEvidenceStringMaySubstituteForGovernedDesignation !== false ||
  fr130.materializationRequirements.sourceVerificationMaySubstituteForExternalDesignation !== false ||
  fr130.materializationRequirements.repositoryIdentityMaySubstituteForExternalDesignation !== false ||
  fr130.materializationRequirements.pullRequestMergeMaySubstituteForExternalDesignation !== false ||
  fr130.materializationRequirements.pieOperationalReadinessMaySubstituteForExternalDesignation !== false ||
  fr130.materializationRequirements.legacyReviewedScalarMaySubstituteForExternalDesignation !== false ||
  fr130.materializationRequirements.externalProviderSignatureValidityMaySubstituteForExternalDesignation !== false ||
  fr130.currentDesignation.governedExternalDesignationRef !== null ||
  fr130.currentDesignation.governedExternalDesignationAdmissionRef !== null ||
  fr130.currentDesignation.governedExternalDesignationEvidenceRefs.length !== 0 ||
  fr130.currentDesignation.governedExternalDesignationProvenanceRefs.length !== 0 ||
  fr130.currentDesignation.designatedTrustAnchorDefinitionRef !== null ||
  fr130.currentDesignation.materializedTrustAnchorRef !== null ||
  fr130.currentDesignation.configuredQuorum !== null ||
  fr130.currentDesignation.configuredReviewerCount !== null ||
  fr130.currentDesignation.configuredConsensusThreshold !== null ||
  fr130.admission.fr129TrustAnchorDefinitionContractReady !== true ||
  fr130.admission.governedExternalDesignationPresent !== false ||
  fr130.admission.governedExternalDesignationAdmitted !== false ||
  fr130.admission.exactTrustAnchorDefinitionBindingPresent !== false ||
  fr130.admission.trustAnchorRegistryAppendAuthorized !== false ||
  fr130.admission.trustAnchorMaterializationAuthorized !== false ||
  fr130.admission.actorProvenanceAcquisitionAuthorized !== false ||
  fr130.admission.evidencePolicyProvenanceAcquisitionAuthorized !== false ||
  fr130.admission.actorProvenanceAdmissionAuthorized !== false ||
  fr130.admission.evidencePolicyProvenanceAdmissionAuthorized !== false ||
  fr130.admission.actorRegistryAppendAuthorized !== false ||
  fr130.admission.evidencePolicyRegistryAppendAuthorized !== false ||
  fr130.admission.decisionMaterializationAuthorized !== false ||
  fr130.admission.reviewedPromotionAuthorized !== false ||
  fr130.execution.externalDesignationRecordsPersisted !== 0 ||
  fr130.execution.externalDesignationAdmissionsIssued !== 0 ||
  fr130.execution.governanceTrustAnchorDefinitionsPersisted !== 0 ||
  fr130.execution.governanceTrustAnchorsMaterialized !== 0 ||
  fr130.execution.actorProvenanceAdmissionsIssued !== 0 ||
  fr130.execution.evidencePolicyProvenanceAdmissionsIssued !== 0 ||
  fr130.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr130.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr130.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr130.execution.metricBindingsIssued !== 0 ||
  fr130.execution.calibrationProtocolsIssued !== 0 ||
  fr130.execution.thresholdsIssued !== 0 ||
  fr130.execution.criterionStatesIssued !== 0 ||
  fr130.execution.structuredClaimsIssued !== 0 ||
  fr130.execution.boundedNarrativesIssued !== 0 ||
  fr130.execution.traditionalSemanticAuthority !== false ||
  fr130.authorityBoundary.trustAnchorDefinitionContractMeansMaterializationAuthority !== false ||
  fr130.authorityBoundary.structurallyValidCandidateMeansGovernedExternalDesignation !== false ||
  fr130.authorityBoundary.designationEvidenceStringMeansGovernedExternalDesignation !== false ||
  fr130.authorityBoundary.sourceVerificationMeansExternalDesignationAuthority !== false ||
  fr130.authorityBoundary.repositoryIdentityMeansExternalDesignationAuthority !== false ||
  fr130.authorityBoundary.pullRequestMergeMeansExternalDesignationAuthority !== false ||
  fr130.authorityBoundary.pieOperationalReadinessMeansExternalDesignationAuthority !== false ||
  fr130.authorityBoundary.legacyReviewedScalarMeansExternalDesignationAuthority !== false ||
  fr130.authorityBoundary.externalProviderSignatureValidityMeansMethodologyReviewDesignationAuthority !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansActorProvenanceAdmission !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansEvidencePolicyProvenanceAdmission !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansReviewDecisionAuthority !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansReviewedPromotion !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansMetricBinding !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansThreshold !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansCriterionState !== false ||
  fr130.authorityBoundary.trustAnchorMaterializationMeansClaim !== false ||
  fr130.authorityBoundary.historicalArtifactMutated !== false ||
  fr130.nextFrontier !== 'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission' ||
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0 ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked'
) throw new Error('FR130 exact methodology review governance trust-anchor materialization admission drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR130_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_MATERIALIZATION_ADMISSION_PASS',
  authorityState: fr130.authorityState,
  governedExternalDesignationPresent: fr130.admission.governedExternalDesignationPresent,
  trustAnchorMaterializationAuthorized: fr130.admission.trustAnchorMaterializationAuthorized,
  governanceTrustAnchorsMaterialized: fr130.execution.governanceTrustAnchorsMaterialized,
  nextFrontier: fr130.nextFrontier,
})}\n`);
