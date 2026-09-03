import process from 'node:process';

await import('./verify-fr122-intake-mouth-semantic-execution-admission.mjs');

const {
  assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
  assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123,
} = await import('../.face-reading-dist/five-officers-intake-criterion-methodology-reviewed-successor-fr123.js');
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);
const { FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js'
);

const fr123 = assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123();
assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123(fr123);

const research = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
);
const reviewed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
);
const witnessQualified = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
);
const intake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');

if (
  fr123.authorityState !== 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision' ||
  fr123.predecessor.fr122AuthorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
  fr123.predecessor.executableCriterionId !== null ||
  fr123.predecessor.closestStaticCandidateCriterionId !== 'criterion.intake.square_broad' ||
  fr123.predecessor.researchMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
  fr123.predecessor.researchMethodologyReviewStatus !== 'research' ||
  fr123.predecessor.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
  fr123.persistedState.reviewedSuccessorRefCandidate !== 'method.shenxiang.five_officers.intake_criteria@0.3.0' ||
  fr123.persistedState.reviewedSuccessorDefinitionIssued !== false ||
  fr123.persistedState.reviewedSuccessorPersisted !== false ||
  fr123.persistedState.methodologyDefinitionsPersisted !== 0 ||
  fr123.promotionAssessment.sourceGate.prerequisiteSatisfied !== true ||
  fr123.promotionAssessment.currentMethodologyGate.currentReviewStatus !== 'research' ||
  fr123.promotionAssessment.currentMethodologyGate.open !== false ||
  fr123.promotionAssessment.governedReviewDecision.decisionArtifactConsumed !== false ||
  fr123.promotionAssessment.governedReviewDecision.reviewedPromotionAuthorized !== false ||
  fr123.promotionAssessment.structuralValidationBoundary.scanCheckedSourceAloneIsSufficientForReviewedPromotion !== false ||
  fr123.execution.methodologyReviewPromotionsIssued !== 0 ||
  fr123.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
  fr123.execution.metricBindingsIssued !== 0 ||
  fr123.execution.calibrationProtocolsIssued !== 0 ||
  fr123.execution.thresholdsIssued !== 0 ||
  fr123.execution.criterionStatesIssued !== 0 ||
  fr123.execution.structuredClaimsIssued !== 0 ||
  fr123.execution.boundedNarrativesIssued !== 0 ||
  fr123.execution.traditionalSemanticAuthority !== false ||
  !fr123.blockers.includes('intake_methodology_governed_review_decision_not_admitted') ||
  fr123.nextFrontier !== 'intake_methodology_review_promotion_criteria_and_decision_authority' ||
  research?.reviewStatus !== 'research' ||
  research?.sourceRefs.length !== 1 ||
  research.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  reviewed !== undefined ||
  witnessQualified?.verificationStatus !== 'scan_checked' ||
  witnessQualified?.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  intake.length !== 5 ||
  intake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925')
) throw new Error('FR123 exact methodology review-promotion admission authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR123_INTAKE_METHODOLOGY_REVIEW_PROMOTION_ADMISSION_PASS',
  authorityState: fr123.authorityState,
  sourceGateOpen: fr123.promotionAssessment.sourceGate.prerequisiteSatisfied,
  methodologyGateOpen: fr123.promotionAssessment.currentMethodologyGate.open,
  reviewedSuccessorPersisted: fr123.persistedState.reviewedSuccessorPersisted,
  methodologyReviewPromotionsIssued: fr123.execution.methodologyReviewPromotionsIssued,
  criterionStatesIssued: fr123.execution.criterionStatesIssued,
  nextFrontier: fr123.nextFrontier,
})}\n`);
