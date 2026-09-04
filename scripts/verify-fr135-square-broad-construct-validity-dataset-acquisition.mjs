import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const source = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-construct-validity-dataset-acquisition-fr135.ts'), 'utf8');
const normal = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-construct-validity-dataset-acquisition-fr135.test.ts'), 'utf8');
const hardening = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-construct-validity-dataset-acquisition-fr135-hardening.test.ts'), 'utf8');
const note = readFileSync(resolve(root,
  'research/face-reading/fr135-square-broad-construct-validity-dataset-acquisition.md'), 'utf8');
const workflow = readFileSync(resolve(root,
  '.github/workflows/fr135-square-broad-construct-validity-dataset-acquisition-ci.yml'), 'utf8');
const predecessor = readFileSync(resolve(root,
  'packages/face-reading/src/five-officers-square-broad-neutral-shape-metric-runtime-fr134.ts'), 'utf8');

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) throw new Error(`FR135 verification failed: missing ${label}: ${needle}`);
}

requireText(predecessor,
  "nextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition' as const",
  'exact FR134 frontier');
requireText(source,
  'assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134(runtime);',
  'issued-FR134 runtime gate');
requireText(source,
  "'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0'",
  'axis-alignment metric ref');
requireText(source,
  "'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0'",
  'turning-angle metric ref');
requireText(source,
  "candidateFeatureCoverage: 'partial_fr134_shape_metrics_only' as const",
  'partial feature coverage boundary');
requireText(source,
  'annotationAuthorityRef: null',
  'absent annotation authority');
requireText(source,
  'annotationProtocolRef: null',
  'absent annotation protocol');
requireText(source,
  'reviewerCount: null',
  'unassigned reviewer count');
requireText(source,
  'quorum: null',
  'unassigned quorum');
requireText(source,
  'consensusThreshold: null',
  'unassigned consensus threshold');
requireText(source,
  'numericAcceptanceThresholds: null',
  'unassigned numeric acceptance threshold');
requireText(source,
  'projectOwnerGovernanceAutoQualifies: false as const',
  'project-owner governance non-shortcut');
requireText(source,
  'rawImageStoredByThisArtifact: false as const',
  'raw image exclusion');
requireText(source,
  'faceEmbeddingStoredByThisArtifact: false as const',
  'face embedding exclusion');
requireText(source,
  'traditionalMetricBindingsIssued: 0 as const',
  'zero traditional binding issuance');
requireText(source,
  'thresholdsIssued: 0 as const',
  'zero threshold issuance');
requireText(source,
  'criterionStatesIssued: 0 as const',
  'zero criterion state issuance');
requireText(source,
  'traditionalSemanticAuthority: false as const',
  'zero semantic authority');
requireText(source,
  "activeConstructScope: 'fang_shape_candidate_features_only' as const",
  'shape-candidate-only scope');
requireText(source,
  "nextFrontier: FR135_NEXT_FRONTIER",
  'FR135 next frontier');

requireText(normal,
  'numericAcceptanceThresholds).toBeNull()',
  'normal threshold-negative test');
requireText(hardening,
  'projectOwnerGovernanceAutoQualifies).toBe(false)',
  'project-owner hardening');
requireText(hardening,
  'rawImageStoredByThisArtifact).toBe(false)',
  'privacy hardening');
requireText(note,
  'does not fabricate empirical captures',
  'research no-fabrication statement');
requireText(note,
  'There is no LLM judgment path.',
  'research LLM boundary');
requireText(workflow,
  'FR135 Square Broad Construct Validity Dataset Acquisition CI',
  'dedicated workflow name');
requireText(workflow,
  'five-officers-square-broad-construct-validity-dataset-acquisition-fr135-hardening.test.ts',
  'hardening workflow coverage');

console.log('FR135 square-broad construct-validity dataset acquisition verification: PASS');
