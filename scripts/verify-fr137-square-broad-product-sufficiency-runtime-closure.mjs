import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const source = readFileSync(
  resolve(
    root,
    'packages/face-reading/src/five-officers-square-broad-product-sufficiency-runtime-closure-fr137.ts',
  ),
  'utf8',
);
const normal = readFileSync(
  resolve(
    root,
    'packages/face-reading/src/five-officers-square-broad-product-sufficiency-runtime-closure-fr137.test.ts',
  ),
  'utf8',
);
const hardening = readFileSync(
  resolve(
    root,
    'packages/face-reading/src/five-officers-square-broad-product-sufficiency-runtime-closure-fr137-hardening.test.ts',
  ),
  'utf8',
);
const note = readFileSync(
  resolve(root, 'research/face-reading/fr137-square-broad-product-sufficiency-runtime-closure.md'),
  'utf8',
);
const workflow = readFileSync(
  resolve(root, '.github/workflows/fr137-square-broad-product-sufficiency-runtime-closure-ci.yml'),
  'utf8',
);
const contracts = readFileSync(resolve(root, 'packages/face-reading/src/contracts.ts'), 'utf8');
const fr122 = readFileSync(
  resolve(root, 'packages/face-reading/src/five-officers-intake-mouth-semantic-execution-admission-fr122.ts'),
  'utf8',
);
const fr136 = readFileSync(
  resolve(
    root,
    'packages/face-reading/src/five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.ts',
  ),
  'utf8',
);
const researchRuntime = readFileSync(
  resolve(root, 'packages/face-reading/src/research-diagnosis-runtime.ts'),
  'utf8',
);

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) throw new Error(`FR137 verification failed: missing ${label}: ${needle}`);
}

requireText(
  contracts,
  "export type FaceDiagnosisResolution = 'resolved' | 'resolved_mixed' | 'unsupported_method';",
  'existing product diagnosis vocabulary',
);
requireText(
  fr122,
  "authorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state'",
  'FR122 blocked machine semantic boundary',
);
requireText(fr122, 'readonly machineCriterionStateAuthorized: false;', 'FR122 zero criterion-state authority');
requireText(
  fr136,
  "authorityState: 'square_broad_semantic_annotation_authority_reuse_review_completed_no_reusable_criterion_specific_authority_or_protocol'",
  'FR136 no reusable semantic annotation authority',
);
requireText(fr136, 'readonly annotationAuthorityRef: null;', 'FR136 null annotation authority');
requireText(fr136, 'readonly consensusThreshold: null;', 'FR136 null consensus threshold');
requireText(researchRuntime, "readonly status: 'research_only';", 'research-only diagnosis runtime boundary');

requireText(
  source,
  "const DIAGNOSIS_RESOLUTION: FaceDiagnosisResolution = 'unsupported_method';",
  'existing unsupported_method reuse',
);
requireText(
  source,
  "const PRODUCT_UNAVAILABLE_SECTION = 'five_officers.intake.static_support' as const;",
  'existing section-key convention',
);
requireText(
  source,
  'export function assessSquareBroadProductSufficiencyRuntimeClosureFR137():',
  'zero-argument product sufficiency assessment',
);
requireText(source, 'neutralMetricValuesConsumed: 0 as const', 'zero neutral metric value consumption');
requireText(source, 'researchAssertionStatesConsumed: 0 as const', 'zero research assertion consumption');
requireText(source, 'criterionState: null', 'no criterion state emission');
requireText(source, 'structuredClaim: null', 'no structured claim emission');
requireText(source, 'boundedNarrative: null', 'no bounded narrative emission');
requireText(source, 'productSemanticReading: null', 'no semantic reading issuance');
requireText(source, 'characterGrounding: null', 'no character grounding issuance');
requireText(
  source,
  'researchOnlyDiagnosisRuntimeMayBePromotedByThisGate: false as const',
  'research runtime non-promotion',
);
requireText(source, 'llmMayFillMissingCriterionState: false as const', 'LLM criterion-state prohibition');
requireText(source, 'llmMayFillMissingClaim: false as const', 'LLM claim prohibition');
requireText(source, 'llmMayFillMissingNarrative: false as const', 'LLM narrative prohibition');
requireText(
  source,
  'requireSquareBroadProductSemanticEmissionAuthorizationFR137',
  'explicit fail-closed semantic emission guard',
);
requireText(
  source,
  "'square_broad_empirical_semantic_authority_materialization_before_any_product_semantic_emission'",
  'FR137 empirical next frontier',
);

requireText(normal, "diagnosisResolution).toBe('unsupported_method')", 'normal unsupported-method test');
requireText(normal, 'productSemanticReading: null', 'normal zero semantic reading test');
requireText(hardening, 'assessSquareBroadProductSufficiencyRuntimeClosureFR137.length', 'zero-input hardening');
requireText(hardening, 'researchOnlyDiagnosisRuntimeMayBePromotedByThisGate).toBe(false)', 'research non-promotion hardening');
requireText(note, 'This is a runtime closure, not a new traditional interpretation', 'research decision statement');
requireText(note, 'No LLM may fill the missing criterion state, claim, or narrative.', 'research LLM boundary statement');
requireText(workflow, 'FR137 Square Broad Product Sufficiency Runtime Closure CI', 'dedicated workflow name');
requireText(
  workflow,
  'five-officers-square-broad-product-sufficiency-runtime-closure-fr137-hardening.test.ts',
  'hardening workflow coverage',
);

process.stdout.write('FR137 square-broad product sufficiency runtime closure verification: PASS\n');
