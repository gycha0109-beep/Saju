import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const source = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.ts'), 'utf8');
const normal = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.test.ts'), 'utf8');
const hardening = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136-hardening.test.ts'), 'utf8');
const note = readFileSync(resolve(root,
  'research/face-reading/fr136-square-broad-independent-semantic-annotation-authority-reuse-review.md'), 'utf8');
const workflow = readFileSync(resolve(root,
  '.github/workflows/fr136-square-broad-independent-semantic-annotation-authority-reuse-review-ci.yml'), 'utf8');
const predecessor = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-construct-validity-dataset-acquisition-fr135.ts'), 'utf8');

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) throw new Error(`FR136 verification failed: missing ${label}: ${needle}`);
}

requireText(predecessor,
  "'square_broad_independent_semantic_annotation_authority_and_protocol_materialization_then_empirical_collection'",
  'exact FR135 frontier');
requireText(source,
  'getSquareBroadConstructValidityAcquisitionContractFR135()',
  'FR135 predecessor consumption');
requireText(source,
  'INDEPENDENT_FACE_GROUND_TRUTH_AUTHORITY_FRDATA07',
  'FR-DATA-07 precedent review');
requireText(source,
  'INDEPENDENT_FACE_ANNOTATION_PACKET_AUTHORITY_FRDATA07C',
  'FR-DATA-07C precedent review');
requireText(source,
  'INDEPENDENT_FACE_ADJUDICATION_AUTHORITY_FRDATA10',
  'FR-DATA-10 precedent review');
requireText(source,
  'HUMAN_FACE_CONSTRUCT_REFERENCE_ADMISSION_AUTHORITY_FRDATA14',
  'FR-DATA-14 precedent review');
requireText(source,
  'EXTERNAL_HUMAN_REFERENCE_REVIEW_ATTESTATION_AUTHORITY_FRDATA15',
  'FR-DATA-15 precedent review');
requireText(source,
  "fr100.targetConstruct.criterionId !== 'criterion.intake.lips_substantial'",
  'FR100 criterion specificity');
requireText(source,
  'labeling.reviewerPlan.reviewersPerItem !== 3',
  'FR101 observed reviewer design');
requireText(source,
  'parametersTransferAuthorized: false as const',
  'FR101 parameter non-transfer');
requireText(source,
  'reusableIndependentSemanticAnnotationAuthorityFound: false as const',
  'no reusable semantic authority decision');
requireText(source,
  'reusableCriterionSpecificAnnotationProtocolFound: false as const',
  'no reusable criterion protocol decision');
requireText(source,
  'reusableLabelSchemaFound: false as const',
  'no reusable label schema decision');
requireText(source,
  'annotationAuthorityRef: null',
  'annotation authority remains null');
requireText(source,
  'annotationProtocolRef: null',
  'annotation protocol remains null');
requireText(source,
  'reviewerCount: null',
  'reviewer count remains null');
requireText(source,
  'quorum: null',
  'quorum remains null');
requireText(source,
  'consensusThreshold: null',
  'consensus threshold remains null');
requireText(source,
  'humanSemanticCollectionAuthorized: false as const',
  'semantic collection remains closed');
requireText(source,
  'traditionalMetricBindingsIssued: 0 as const',
  'zero traditional bindings');
requireText(source,
  'thresholdsIssued: 0 as const',
  'zero thresholds');
requireText(source,
  'criterionStatesIssued: 0 as const',
  'zero criterion states');
requireText(source,
  'traditionalSemanticAuthority: false as const',
  'zero traditional semantic authority');
requireText(source,
  "'square_broad_criterion_specific_independent_annotation_authority_and_protocol_definition_review_without_empirical_collection'",
  'FR136 next frontier');

requireText(normal,
  'reusableIndependentSemanticAnnotationAuthorityFound).toBe(false)',
  'normal no-authority test');
requireText(normal,
  'reviewerCount).toBeNull()',
  'normal reviewer-count negative test');
requireText(hardening,
  'faceCountHumanLabelAuthorityMeansSquareBroadSemanticAuthority).toBe(false)',
  'face-count authority hardening');
requireText(hardening,
  'projectOwnerGovernanceMeansAnnotationAuthority).toBe(false)',
  'project-owner governance hardening');
requireText(note,
  'No existing repository authority or protocol may be reused as semantic annotation authority',
  'research decision statement');
requireText(note,
  'It does **not** transfer them to `方大`.',
  'research non-transfer statement');
requireText(workflow,
  'FR136 Square Broad Semantic Annotation Authority Reuse Review CI',
  'dedicated workflow name');
requireText(workflow,
  'five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136-hardening.test.ts',
  'hardening workflow coverage');

process.stdout.write('FR136 square-broad semantic annotation authority reuse review verification: PASS\n');
