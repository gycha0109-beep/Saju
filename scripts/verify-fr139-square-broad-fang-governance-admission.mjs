import fs from 'node:fs';

const sourcePath =
  'packages/face-reading/src/five-officers-square-broad-fang-governance-admission-fr139.ts';
const notePath = 'research/face-reading/fr139-square-broad-fang-governance-admission.md';
const governancePath = 'governance/face-reading/square-broad-fang-governance-decision-request-v1.md';
const workflowPath = '.github/workflows/fr139-square-broad-fang-governance-admission-ci.yml';

const source = fs.readFileSync(sourcePath, 'utf8');
const note = fs.readFileSync(notePath, 'utf8');
const governance = fs.readFileSync(governancePath, 'utf8');
const workflow = fs.readFileSync(workflowPath, 'utf8');

const requiredSourceFragments = [
  "from './five-officers-square-broad-fang-semantic-annotation-protocol-fr138.js'",
  "'method.shenxiang.five_officers.intake_criteria@0.2.0'",
  "'method.shenxiang.five_officers.intake_criteria@0.3.0'",
  "'passage.shenxiang.five_officers.intake.nlc_1925'",
  "'actor.myeongha.project_owner@0.1.0'",
  "'criterion_specific_research_semantic_annotation'",
  'targetSpecificDecisionPresent: false',
  'reviewedPromotionAuthorized: false',
  'governedDesignationAuthorityResolved: false',
  'annotationAuthorityRef: null',
  'reviewerCount: null',
  'quorum: null',
  'consensusThreshold: null',
  'humanSemanticCollectionAuthorized: false',
  'empiricalSemanticEvidenceAcquisitionAuthorized: false',
  'continueInstructionMeansProjectOwnerApproval: false',
  'repositoryMergeMeansProjectOwnerApproval: false',
  'methodologyReviewGovernanceMeansAnnotationAuthority: false',
];

for (const fragment of requiredSourceFragments) {
  if (!source.includes(fragment)) {
    throw new Error(`FR139 verifier: required source fragment missing: ${fragment}`);
  }
}

const forbiddenSourceFragments = [
  'targetSpecificDecisionPresent: true',
  'reviewedPromotionAuthorized: true',
  'governedDesignationAuthorityResolved: true',
  'humanSemanticCollectionAuthorized: true',
  'empiricalSemanticEvidenceAcquisitionAuthorized: true',
  'traditionalSemanticAuthority: true',
  'reviewerCount: 3',
  'consensusThreshold: 2 / 3',
  'methodologyReviewDecisionRecordsIssued: 1',
  'annotationAuthoritiesIssued: 1',
  'empiricalSemanticLabelsIssued: 1',
];

for (const fragment of forbiddenSourceFragments) {
  if (source.includes(fragment)) {
    throw new Error(`FR139 verifier: forbidden authority shortcut present: ${fragment}`);
  }
}

const requiredGovernanceFragments = [
  'This file is **not** approval evidence',
  'method.shenxiang.five_officers.intake_criteria@0.2.0',
  'method.shenxiang.five_officers.intake_criteria@0.3.0',
  'passage.shenxiang.five_officers.intake.nlc_1925',
  'A generic instruction such as `continue`',
  'FR139 does **not** choose an annotation authority',
  'reviewerCount = null',
  'human semantic collection authorized = false',
];

for (const fragment of requiredGovernanceFragments) {
  if (!governance.includes(fragment)) {
    throw new Error(`FR139 verifier: required governance-request boundary missing: ${fragment}`);
  }
}

const requiredNoteFragments = [
  'A `continue` instruction is operational execution permission only.',
  'Structural validity is deliberately insufficient for issuance.',
  'A structurally valid designation candidate is not an admitted authority.',
  'reviewerCount = null',
  'humanSemanticCollectionAuthorized = false',
  'Production remains on the FR137 `unsupported_method` path.',
];

for (const fragment of requiredNoteFragments) {
  if (!note.includes(fragment)) {
    throw new Error(`FR139 verifier: required research-note boundary missing: ${fragment}`);
  }
}

if (!workflow.includes('FR139 Square Broad Fang Governance Admission CI')) {
  throw new Error('FR139 verifier: dedicated workflow identity missing.');
}
