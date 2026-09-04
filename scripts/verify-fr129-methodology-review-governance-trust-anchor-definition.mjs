import process from 'node:process';

await import('./verify-fr128-methodology-review-governance-trust-anchor-admission.mjs');

const {
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js');
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

const fr129 = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129(fr129);

const structuralCandidate = Object.freeze({
  registryId: 'registry.face.methodology_review_governance_trust_anchors.candidate',
  version: '0.1.0',
  anchors: Object.freeze([
    Object.freeze({
      anchorId: 'anchor.candidate.external_designation',
      version: '0.1.0',
      authorityScope: 'methodology_review_governance_root',
      provenanceRefs: Object.freeze(['provenance.external.candidate']),
      designationEvidenceRefs: Object.freeze(['evidence.external.designation.candidate']),
      limitations: Object.freeze(['candidate-only structural validation does not establish governed authority']),
      independentFromTargetActorRegistry: true,
      independentFromTargetEvidencePolicyRegistry: true,
      selfDesignationAuthorized: false,
      sourceVerificationAuthorityInherited: false,
      repositoryIdentityAuthorityInherited: false,
      pullRequestMergeAuthorityInherited: false,
      pieOperationalAuthorityInherited: false,
      legacyReviewedScalarAuthorityInherited: false,
      externalProviderProvenanceAuthorityInherited: false,
      methodologyReviewDecisionAuthorityGranted: false,
    }),
  ]),
});
validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(structuralCandidate);

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
  fr129.authorityState !== 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor' ||
  fr129.predecessor.fr128AuthorityState !== 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor' ||
  fr129.predecessor.fr128NextFrontier !== 'independent_methodology_review_governance_trust_anchor_acquisition' ||
  fr129.predecessor.independentGovernanceTrustAnchorPresent !== false ||
  fr129.persistedAuthority.researchMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
  fr129.persistedAuthority.researchMethodologyReviewStatus !== 'research' ||
  fr129.persistedAuthority.witnessQualifiedSourceRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr129.persistedAuthority.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr129.persistedAuthority.proposedReviewedSuccessorPresent !== false ||
  fr129.persistedAuthority.fr124DecisionCount !== 0 ||
  fr129.persistedAuthority.fr126ActorDefinitionCount !== 0 ||
  fr129.persistedAuthority.fr126EvidencePolicyDefinitionCount !== 0 ||
  fr129.contract.trustAnchorRegistryRef !== 'registry.face.methodology_review_governance_trust_anchors.fr129@0.1.0' ||
  fr129.contract.authorityScope !== 'methodology_review_governance_root' ||
  fr129.contract.provenanceRefsRequired !== true ||
  fr129.contract.externalDesignationEvidenceRefsRequired !== true ||
  fr129.contract.independenceFromTargetActorRegistryRequired !== true ||
  fr129.contract.independenceFromTargetEvidencePolicyRegistryRequired !== true ||
  fr129.contract.selfDesignationAuthorized !== false ||
  fr129.contract.structurallyValidDefinitionAutoAdmitted !== false ||
  fr129.contract.configuredQuorum !== null ||
  fr129.contract.configuredReviewerCount !== null ||
  fr129.contract.configuredConsensusThreshold !== null ||
  fr129.currentGovernance.trustAnchorDefinitionCount !== 0 ||
  fr129.currentGovernance.governedTrustAnchorRef !== null ||
  fr129.currentGovernance.admittedActorProvenanceRef !== null ||
  fr129.currentGovernance.admittedEvidencePolicyProvenanceRef !== null ||
  fr129.admission.trustAnchorDefinitionContractReady !== true ||
  fr129.admission.governedTrustAnchorDefinitionPresent !== false ||
  fr129.admission.trustAnchorMaterializationAuthorized !== false ||
  fr129.admission.actorProvenanceAcquisitionAuthorized !== false ||
  fr129.admission.evidencePolicyProvenanceAcquisitionAuthorized !== false ||
  fr129.admission.actorProvenanceAdmissionAuthorized !== false ||
  fr129.admission.evidencePolicyProvenanceAdmissionAuthorized !== false ||
  fr129.admission.actorRegistryAppendAuthorized !== false ||
  fr129.admission.evidencePolicyRegistryAppendAuthorized !== false ||
  fr129.admission.decisionMaterializationAuthorized !== false ||
  fr129.admission.reviewedPromotionAuthorized !== false ||
  fr129.admission.reviewedSuccessorIssued !== false ||
  fr129.admission.reviewedSuccessorPersisted !== false ||
  fr129.execution.governanceTrustAnchorDefinitionsPersisted !== 0 ||
  fr129.execution.governanceTrustAnchorsMaterialized !== 0 ||
  fr129.execution.actorProvenanceAdmissionsIssued !== 0 ||
  fr129.execution.evidencePolicyProvenanceAdmissionsIssued !== 0 ||
  fr129.execution.authorityActorDefinitionsPersisted !== 0 ||
  fr129.execution.reviewEvidencePolicyDefinitionsPersisted !== 0 ||
  fr129.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr129.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr129.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr129.execution.metricBindingsIssued !== 0 ||
  fr129.execution.calibrationProtocolsIssued !== 0 ||
  fr129.execution.thresholdsIssued !== 0 ||
  fr129.execution.criterionStatesIssued !== 0 ||
  fr129.execution.structuredClaimsIssued !== 0 ||
  fr129.execution.boundedNarrativesIssued !== 0 ||
  fr129.execution.traditionalSemanticAuthority !== false ||
  fr129.authorityBoundary.structurallyValidTrustAnchorDefinitionMeansGovernedTrustAnchor !== false ||
  fr129.authorityBoundary.nonEmptyDesignationEvidenceStringMeansExternalDesignationAuthority !== false ||
  fr129.authorityBoundary.selfDesignationMeansIndependentTrustAnchor !== false ||
  fr129.authorityBoundary.repositoryIdentityMeansTrustAnchorDesignation !== false ||
  fr129.authorityBoundary.sourceVerificationMeansTrustAnchorDesignation !== false ||
  fr129.authorityBoundary.pullRequestMergeMeansTrustAnchorDesignation !== false ||
  fr129.authorityBoundary.pieOperationalReadinessMeansTrustAnchorDesignation !== false ||
  fr129.authorityBoundary.legacyReviewedScalarMeansTrustAnchorDesignation !== false ||
  fr129.authorityBoundary.externalProviderProvenanceMeansTrustAnchorDesignation !== false ||
  fr129.authorityBoundary.trustAnchorMaterializationMeansReviewDecisionAuthority !== false ||
  fr129.authorityBoundary.trustAnchorMaterializationMeansMetricBinding !== false ||
  fr129.authorityBoundary.trustAnchorMaterializationMeansThreshold !== false ||
  fr129.authorityBoundary.trustAnchorMaterializationMeansCriterionState !== false ||
  fr129.authorityBoundary.trustAnchorMaterializationMeansClaim !== false ||
  fr129.authorityBoundary.historicalArtifactMutated !== false ||
  fr129.nextFrontier !== 'governed_independent_methodology_review_governance_trust_anchor_materialization' ||
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0 ||
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0 ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked'
) throw new Error('FR129 exact methodology review governance trust-anchor definition drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_DEFINITION_PASS',
  authorityState: fr129.authorityState,
  trustAnchorDefinitionCount: fr129.currentGovernance.trustAnchorDefinitionCount,
  trustAnchorMaterializationAuthorized: fr129.admission.trustAnchorMaterializationAuthorized,
  actorProvenanceAdmissionAuthorized: fr129.admission.actorProvenanceAdmissionAuthorized,
  evidencePolicyProvenanceAdmissionAuthorized: fr129.admission.evidencePolicyProvenanceAdmissionAuthorized,
  nextFrontier: fr129.nextFrontier,
})}\n`);
