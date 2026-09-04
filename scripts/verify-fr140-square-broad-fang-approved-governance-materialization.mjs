import fs from 'node:fs';

const sourcePath =
  'packages/face-reading/src/five-officers-square-broad-fang-approved-governance-materialization-fr140.ts';
const methodologyEvidencePath =
  'governance/face-reading/square-broad-fang-project-owner-methodology-approval-v1.md';
const annotationEvidencePath =
  'governance/face-reading/square-broad-fang-project-owner-annotation-governance-designation-v1.md';
const notePath =
  'research/face-reading/fr140-square-broad-fang-approved-governance-materialization.md';
const workflowPath =
  '.github/workflows/fr140-square-broad-fang-approved-governance-materialization-ci.yml';

const source = fs.readFileSync(sourcePath, 'utf8');
const methodologyEvidence = fs.readFileSync(methodologyEvidencePath, 'utf8');
const annotationEvidence = fs.readFileSync(annotationEvidencePath, 'utf8');
const note = fs.readFileSync(notePath, 'utf8');
const workflow = fs.readFileSync(workflowPath, 'utf8');

const requiredSourceFragments = [
  "'method.shenxiang.five_officers.intake_criteria@0.2.0'",
  "'method.shenxiang.five_officers.intake_criteria@0.3.0'",
  "'passage.shenxiang.five_officers.intake.nlc_1925'",
  "'actor.myeongha.project_owner@0.1.0'",
  "'role.face.intake.square_broad.fang.independent_human_reviewer@0.1.0'",
  "outcome: 'approved_for_reviewed_promotion'",
  'targetSpecificDecisionPresent: true',
  'reviewedPromotionAuthorized: true',
  'reviewedSuccessorPersisted: true',
  'governedDesignationAuthorityResolved: true',
  'projectOwnerMayActAsSemanticReviewerByThisDesignation: false',
  'concreteReviewerActorAssignmentSatisfied: false',
  'reviewerCount: null',
  'quorum: null',
  'consensusThreshold: null',
  'collectionAuthorizationPresent: false',
  'humanSemanticCollectionAuthorized: false',
  'empiricalSemanticEvidenceAcquisitionAuthorized: false',
  'traditionalSemanticAuthority: false',
];

for (const fragment of requiredSourceFragments) {
  if (!source.includes(fragment)) {
    throw new Error(`FR140 verifier: required source fragment missing: ${fragment}`);
  }
}

const forbiddenSourceFragments = [
  'projectOwnerMayActAsSemanticReviewerByThisDesignation: true',
  'concreteReviewerActorAssignmentSatisfied: true',
  'reviewerCount: 3',
  'configuredReviewerCount: 3',
  'quorum: 2',
  'consensusThreshold: 2 / 3',
  'collectionAuthorizationPresent: true',
  'humanSemanticCollectionAuthorized: true',
  'empiricalSemanticEvidenceAcquisitionAuthorized: true',
  'empiricalSemanticLabelsIssued: 1',
  'traditionalMetricBindingsIssued: 1',
  'thresholdsIssued: 1',
  'criterionStatesIssued: 1',
  'structuredClaimsIssued: 1',
  'boundedNarrativesIssued: 1',
  'traditionalSemanticAuthority: true',
];

for (const fragment of forbiddenSourceFragments) {
  if (source.includes(fragment)) {
    throw new Error(`FR140 verifier: forbidden authority shortcut present: ${fragment}`);
  }
}

const requiredMethodologyEvidenceFragments = [
  'Status: approved',
  'actor.myeongha.project_owner@0.1.0',
  'method.shenxiang.five_officers.intake_criteria@0.2.0',
  'method.shenxiang.five_officers.intake_criteria@0.3.0',
  'passage.shenxiang.five_officers.intake.nlc_1925',
  'outcome = approved_for_reviewed_promotion',
  'explicit instruction `승인`',
  'does **not** establish',
];

for (const fragment of requiredMethodologyEvidenceFragments) {
  if (!methodologyEvidence.includes(fragment)) {
    throw new Error(`FR140 verifier: methodology evidence boundary missing: ${fragment}`);
  }
}

const requiredAnnotationEvidenceFragments = [
  'Status: designated',
  'criterion_specific_research_semantic_annotation',
  'role.face.intake.square_broad.fang.independent_human_reviewer@0.1.0',
  'project owner does **not** become a semantic reviewer',
  'concrete reviewer actor refs = []',
  'reviewerCount = null',
  'quorum = null',
  'consensusThreshold = null',
  'does not itself authorize human semantic collection',
];

for (const fragment of requiredAnnotationEvidenceFragments) {
  if (!annotationEvidence.includes(fragment)) {
    throw new Error(`FR140 verifier: annotation governance boundary missing: ${fragment}`);
  }
}

const requiredNoteFragments = [
  'FR119 historical state is not mutated',
  'project owner to self-annotate',
  'humanSemanticCollectionAuthorized = false',
  'Production therefore remains on the FR137 `unsupported_method` path',
  'square_broad_fang_independent_human_reviewer_actor_assignment_and_collection_policy_without_invented_numeric_thresholds',
];

for (const fragment of requiredNoteFragments) {
  if (!note.includes(fragment)) {
    throw new Error(`FR140 verifier: research-note boundary missing: ${fragment}`);
  }
}

if (!workflow.includes('FR140 Square Broad Fang Approved Governance Materialization CI')) {
  throw new Error('FR140 verifier: dedicated workflow identity missing.');
}
