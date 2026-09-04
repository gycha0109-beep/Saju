import process from 'node:process';

const {
  assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
} = await import('../.face-reading-dist/five-officers-intake-criterion-semantic-operationalization-research-fr132.js');
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js'
);
const { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } = await import(
  '../.face-reading-dist/five-officers-intake-methodology-review-decision-authority-fr124.js'
);

const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(value);

const target = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
);
const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
);
const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
);

const byConcept = new Map(value.criterionResearch.map((record) => [record.sourceConcept, record]));
const squareBroad = byConcept.get('方大');
const duanHou = byConcept.get('端厚');
const cornersArched = byConcept.get('角弓');
const openClose = byConcept.get('開大合小');
const redLip = byConcept.get('唇紅');

if (
  value.schemaVersion !== 'fr132-five-officers-intake-criterion-semantic-operationalization-research-v1' ||
  value.authorityState !== 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred' ||
  value.predecessor.fr131AuthorityState !== 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending' ||
  value.predecessor.targetSpecificDecisionCount !== 0 ||
  value.governedSource.passageRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  value.governedSource.text !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
  value.governedSource.verificationStatus !== 'scan_checked' ||
  value.governedSource.methodologyReviewStatus !== 'research' ||
  value.researchComparanda.length !== 3 ||
  value.researchComparanda.some((item) => item.authorityStatus !== 'research_only_unverified_for_project_authority') ||
  value.criterionResearch.length !== 5 ||
  squareBroad?.constructValidityStatus !== 'not_established' ||
  !squareBroad.missingOperationalConstructs.includes('governed_mouth_outline_rectilinearity_or_angularity_observation_for_fang') ||
  !squareBroad.missingOperationalConstructs.includes('anatomically_governed_relative_mouth_size_reference_for_da') ||
  duanHou?.constructValidityStatus !== 'not_established' ||
  !duanHou.missingOperationalConstructs.includes('source_grounded_definition_of_duan_component') ||
  cornersArched?.observability !== 'capture_sensitive_multifeature_geometry' ||
  !cornersArched.missingOperationalConstructs.includes('teeth_visibility_observation') ||
  openClose?.observability !== 'controlled_multi_state_dynamic_geometry' ||
  redLip?.observability !== 'appearance_requires_capture_calibration' ||
  value.semanticFindings.squareBroadMustNotCollapseToAspectRatio !== true ||
  value.semanticFindings.duanHouMustNotCollapseToThickness !== true ||
  value.semanticFindings.duanOperationalMeaningResolved !== false ||
  value.semanticFindings.cornersArchedMustNotCollapseToCornerCurvature !== true ||
  value.semanticFindings.openCloseRelationRequiresMultipleControlledStates !== true ||
  value.semanticFindings.lipRedRequiresColorCalibratedCaptureBeforeOperationalization !== true ||
  value.semanticFindings.compoundSegmentationAuthoritative !== false ||
  value.neutralMetricAssessment.fr80CanProveTraditionalFang !== false ||
  value.neutralMetricAssessment.fr82CanProveTraditionalDa !== false ||
  value.neutralMetricAssessment.fr82DenominatorHasAnatomicalFaceWidthRole !== false ||
  value.neutralMetricAssessment.fr97CanBeInterpretedAsLipThickness !== false ||
  value.neutralMetricAssessment.existingNeutralMetricsSufficientForAnyTraditionalCriterionState !== false ||
  value.promotionStatus.targetSpecificApprovalExplicitlyDeferred !== true ||
  value.promotionStatus.methodologyReviewDecisionRecordsIssued !== 0 ||
  value.promotionStatus.reviewedMethodologyDefinitionsIssued !== 0 ||
  value.execution.semanticResearchRecordsIssued !== 5 ||
  value.execution.traditionalMetricBindingsIssued !== 0 ||
  value.execution.calibrationProtocolsIssued !== 0 ||
  value.execution.thresholdsIssued !== 0 ||
  value.execution.criterionStatesIssued !== 0 ||
  value.execution.structuredClaimsIssued !== 0 ||
  value.execution.boundedNarrativesIssued !== 0 ||
  value.execution.traditionalSemanticAuthority !== false ||
  value.authorityBoundary.contextualComparandumMeansGovernedSourceAuthority !== false ||
  value.authorityBoundary.lexicalDecompositionMeansTraditionalMetricBinding !== false ||
  value.authorityBoundary.imageObservabilityMeansConstructValidity !== false ||
  value.authorityBoundary.semanticResearchMeansReviewedPromotion !== false ||
  value.authorityBoundary.historicalArtifactMutated !== false ||
  value.nextFrontier !== 'source_grounded_square_broad_construct_operationalization_and_calibration_design' ||
  target?.reviewStatus !== 'research' ||
  target?.sourceRefs.length !== 1 ||
  target.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  proposed !== undefined ||
  source?.verificationStatus !== 'scan_checked' ||
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0
) throw new Error('FR132 exact intake semantic operationalization research drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR132_INTAKE_CRITERION_SEMANTIC_OPERATIONALIZATION_RESEARCH_PASS',
  authorityState: value.authorityState,
  semanticResearchRecordsIssued: value.execution.semanticResearchRecordsIssued,
  reviewedPromotionDeferred: value.promotionStatus.targetSpecificApprovalExplicitlyDeferred,
  nextFrontier: value.nextFrontier,
})}\n`);
