import process from 'node:process';

await import('./verify-fr121-intake-criterion-definition-witness-qualified-source-rebind-implementation.mjs');

const {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} = await import('../.face-reading-dist/five-officers-intake-mouth-semantic-execution-admission-fr122.js');
const { FIVE_OFFICER_CRITERIA_V0 } = await import('../.face-reading-dist/five-officers-six-fus-research-v0.js');
const { FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED } = await import('../.face-reading-dist/five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js');
const { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } = await import('../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js');
const { FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE } = await import('../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js');

const fr122 = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(fr122);

const historicalIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
const currentIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
const historicalNonIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey !== 'intake');
const currentNonIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey !== 'intake');
const witnessQualifiedPassage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
);
const successorMethodology = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
  (methodology) => `${methodology.methodologyId}@${methodology.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
);
const verification = FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE.pageVerifications.find(
  (record) => record.verificationId === 'verification.shenxiang_nlc_1925.intake.witness_qualified',
);
const lineage = FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE.verificationRelations?.find(
  (relation) => relation.relationId === 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified',
);
const squareBroad = fr122.criterionReadiness.find((entry) => entry.criterionId === 'criterion.intake.square_broad');
const lipsSubstantial = fr122.criterionReadiness.find((entry) => entry.criterionId === 'criterion.intake.lips_substantial');

if (
  fr122.authorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
  fr122.definitionSetId !== 'criteria.shenxiang.five_officers.fr121_witness_qualified' ||
  fr122.provenance.witnessQualifiedPassageVerificationStatus !== 'scan_checked' ||
  fr122.provenance.successorMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.2.0' ||
  fr122.provenance.successorMethodologyReviewStatus !== 'research' ||
  fr122.provenance.semanticIdentityEquivalenceAsserted !== false ||
  fr122.executableCriterionId !== null ||
  fr122.closestStaticCandidateCriterionId !== 'criterion.intake.square_broad' ||
  fr122.execution.observationAdaptersIssued !== 0 ||
  fr122.execution.deterministicCriterionEvaluatorsIssued !== 0 ||
  fr122.execution.criterionStatesIssued !== 0 ||
  fr122.execution.structuredClaimsIssued !== 0 ||
  fr122.execution.boundedNarrativesIssued !== 0 ||
  fr122.execution.traditionalSemanticAuthority !== false ||
  squareBroad?.machineObservationPath.metricRefs.length !== 2 ||
  squareBroad.machineCriterionStateAuthorized !== false ||
  !squareBroad.blockers.includes('square_broad_metric_to_source_concept_mapping_not_authorized') ||
  lipsSubstantial?.machineObservationPath.metricRefs.length !== 1 ||
  lipsSubstantial.machineCriterionStateAuthorized !== false ||
  !lipsSubstantial.blockers.includes('lips_substantial_construct_validity_evidence_absent') ||
  historicalIntake.length !== 5 ||
  currentIntake.length !== 5 ||
  historicalIntake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake') ||
  currentIntake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925') ||
  historicalNonIntake.length !== currentNonIntake.length ||
  historicalNonIntake.some((criterion, index) => criterion !== currentNonIntake[index]) ||
  witnessQualifiedPassage?.verificationStatus !== 'scan_checked' ||
  witnessQualifiedPassage?.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  successorMethodology?.reviewStatus !== 'research' ||
  successorMethodology?.sourceRefs.length !== 1 ||
  successorMethodology.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  verification?.state !== 'scan_checked' ||
  lineage?.kind !== 'non_independent_identity_reissue' ||
  lineage.independentVerificationDelta !== 0 ||
  fr122.nextFrontier !== 'square_broad_metric_to_source_operationalization_and_calibration_authority'
) throw new Error('FR122 exact mouth semantic execution admission authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR122_INTAKE_MOUTH_SEMANTIC_EXECUTION_ADMISSION_PASS',
  authorityState: fr122.authorityState,
  definitionSetId: fr122.definitionSetId,
  executableCriterionId: fr122.executableCriterionId,
  closestStaticCandidateCriterionId: fr122.closestStaticCandidateCriterionId,
  squareBroadNeutralMetricPaths: squareBroad.machineObservationPath.metricRefs.length,
  lipsSubstantialNeutralMetricPaths: lipsSubstantial.machineObservationPath.metricRefs.length,
  criterionStatesIssued: fr122.execution.criterionStatesIssued,
  structuredClaimsIssued: fr122.execution.structuredClaimsIssued,
  nextFrontier: fr122.nextFrontier,
})}\n`);
