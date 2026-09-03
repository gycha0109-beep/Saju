import process from 'node:process';

await import('./verify-fr123-intake-methodology-review-promotion-admission.mjs');

const {
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  validateMethodologyReviewDecisionRegistryFR124,
} = await import('../.face-reading-dist/five-officers-intake-methodology-review-decision-authority-fr124.js');
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);
const { FACE_RESEARCH_METHODOLOGIES_V0 } = await import('../.face-reading-dist/research-pack-v0.js');

validateMethodologyReviewDecisionRegistryFR124(
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY,
  FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
);

const fr124 = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(fr124);

const target = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
);
const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
);
const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
);
const legacyMayiReviewed = FACE_RESEARCH_METHODOLOGIES_V0.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.mayi.face_three_divisions@0.1.0',
);

if (
  fr124.authorityState !== 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record' ||
  fr124.predecessor.fr123AuthorityState !== 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision' ||
  fr124.predecessor.researchMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
  fr124.predecessor.researchMethodologyReviewStatus !== 'research' ||
  fr124.predecessor.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr124.contract.registryId !== 'registry.face.methodology_review_decisions.fr124' ||
  fr124.contract.decisionScope !== 'methodology_review_promotion' ||
  fr124.contract.exactSourceSnapshotRequired !== true ||
  fr124.contract.approvedDecisionRequiresScanCheckedSources !== true ||
  fr124.contract.configuredQuorum !== null ||
  fr124.contract.configuredReviewerCount !== null ||
  fr124.contract.configuredConsensusThreshold !== null ||
  fr124.currentRegistry.decisionCount !== 0 ||
  fr124.currentRegistry.approvedDecisionCount !== 0 ||
  fr124.currentRegistry.rejectedDecisionCount !== 0 ||
  fr124.currentRegistry.targetDecisionRef !== null ||
  fr124.currentRegistry.targetDecisionConsumed !== false ||
  fr124.admission.sourcePrerequisiteSatisfied !== true ||
  fr124.admission.governedDecisionRecordPresent !== false ||
  fr124.admission.governedApprovalPresent !== false ||
  fr124.admission.reviewedPromotionAuthorized !== false ||
  fr124.admission.reviewedSuccessorDefinitionIssued !== false ||
  fr124.admission.reviewedSuccessorPersisted !== false ||
  fr124.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
  fr124.execution.methodologyReviewAuthorizationsIssued !== 0 ||
  fr124.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr124.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr124.execution.metricBindingsIssued !== 0 ||
  fr124.execution.calibrationProtocolsIssued !== 0 ||
  fr124.execution.thresholdsIssued !== 0 ||
  fr124.execution.criterionStatesIssued !== 0 ||
  fr124.execution.structuredClaimsIssued !== 0 ||
  fr124.execution.boundedNarrativesIssued !== 0 ||
  fr124.execution.traditionalSemanticAuthority !== false ||
  fr124.authorityBoundary.legacyReviewedScalarMeansReusableDecisionProvenance !== false ||
  fr124.authorityBoundary.scanCheckedSourceMeansReviewApproval !== false ||
  fr124.authorityBoundary.structurallyValidDecisionRecordMeansIssuedDecision !== false ||
  fr124.authorityBoundary.sourceVerificationCheckerMeansMethodologyReviewAuthorityActor !== false ||
  fr124.nextFrontier !== 'governed_intake_methodology_review_decision_materialization' ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0 ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked' ||
  legacyMayiReviewed?.reviewStatus !== 'reviewed'
) throw new Error('FR124 exact methodology review decision authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR124_INTAKE_METHODOLOGY_REVIEW_DECISION_AUTHORITY_PASS',
  authorityState: fr124.authorityState,
  decisionContractEstablished: true,
  currentDecisionCount: fr124.currentRegistry.decisionCount,
  reviewedPromotionAuthorized: fr124.admission.reviewedPromotionAuthorized,
  reviewedSuccessorPersisted: fr124.admission.reviewedSuccessorPersisted,
  configuredQuorum: fr124.contract.configuredQuorum,
  criterionStatesIssued: fr124.execution.criterionStatesIssued,
  nextFrontier: fr124.nextFrontier,
})}\n`);
