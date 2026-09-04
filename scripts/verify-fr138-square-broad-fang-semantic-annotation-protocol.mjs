import fs from 'node:fs';

const sourcePath =
  'packages/face-reading/src/five-officers-square-broad-fang-semantic-annotation-protocol-fr138.ts';
const notePath = 'research/face-reading/fr138-square-broad-fang-semantic-annotation-protocol.md';
const workflowPath = '.github/workflows/fr138-square-broad-fang-semantic-annotation-protocol-ci.yml';

const source = fs.readFileSync(sourcePath, 'utf8');
const note = fs.readFileSync(notePath, 'utf8');
const workflow = fs.readFileSync(workflowPath, 'utf8');

const requiredSourceFragments = [
  "from './five-officers-square-broad-product-sufficiency-runtime-closure-fr137.js'",
  "from './five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.js'",
  "from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js'",
  "'criterion.intake.square_broad'",
  "'fang_shape_candidate_features_only'",
  "'research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0'",
  "'research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0'",
  "'supports_fang_shape_hypothesis'",
  "'does_not_support_fang_shape_hypothesis'",
  "'unable_to_conclude'",
  'humanSemanticCollectionAuthorized: false',
  'empiricalSemanticEvidenceAcquisitionAuthorized: false',
  'annotationAuthorityRef: null',
  'reviewerCount: null',
  'quorum: null',
  'consensusThreshold: null',
  'adjudicationRuleRef: null',
  'reviewerQualificationRef: null',
  'llmMayIssueHumanSemanticLabel: false',
];

for (const fragment of requiredSourceFragments) {
  if (!source.includes(fragment)) {
    throw new Error(`FR138 verifier: required source fragment missing: ${fragment}`);
  }
}

const forbiddenSourceFragments = [
  'humanSemanticCollectionAuthorized: true',
  'empiricalSemanticEvidenceAcquisitionAuthorized: true',
  'traditionalSemanticAuthority: true',
  'reviewerCount: 3',
  'configuredReviewerCount: 3',
  'consensusThreshold: 2 / 3',
  'minAgreementFraction: 2 / 3',
  'criterionStateIssued: 1',
  'structuredClaimsIssued: 1',
  'boundedNarrativesIssued: 1',
];

for (const fragment of forbiddenSourceFragments) {
  if (source.includes(fragment)) {
    throw new Error(`FR138 verifier: forbidden authority shortcut present: ${fragment}`);
  }
}

const requiredNoteFragments = [
  'Protocol design is not collection authority.',
  'annotationAuthorityRef = null',
  'reviewerCount = null',
  'consensusThreshold = null',
  'humanSemanticCollectionAuthorized = false',
  'Production remains governed by the FR137 fail-closed `unsupported_method` path.',
];

for (const fragment of requiredNoteFragments) {
  if (!note.includes(fragment)) {
    throw new Error(`FR138 verifier: required research-note boundary missing: ${fragment}`);
  }
}

if (!workflow.includes('FR138 Square Broad Fang Semantic Annotation Protocol CI')) {
  throw new Error('FR138 verifier: dedicated workflow identity missing.');
}
