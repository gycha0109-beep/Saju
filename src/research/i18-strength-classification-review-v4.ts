import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { StrengthEvidenceMatrix } from './i14-strength-evidence-matrix.js';
import {
  I18A_MONTH_BRANCH_STRENGTH_PACK,
  I18A_MONTH_BRANCH_STRENGTH_RULES,
} from './i18a-month-branch-strength-evidence.js';
import {
  I18B_HIDDEN_CHALLENGE_PACK,
  I18B_HIDDEN_CHALLENGE_RULES,
} from './i18b-hidden-challenge-strength-evidence.js';
import { I18C_ROOT_CLASS_PACK, I18C_ROOT_CLASS_RULES } from './i18c-root-class-evidence.js';
import { I18D_ROOT_RELATION_REVIEW_VERSION } from './i18d-root-relation-review.js';
import { I18E_SPECIAL_PATTERN_ROUTER_VERSION } from './i18e-special-pattern-review-router.js';

export const I18_STRENGTH_CLASSIFICATION_REVIEW_V4_VERSION =
  'myeonghwa-strength-classification-review-v4';

export type StrengthClassificationV4CapabilityId =
  | 'MONTH_BRANCH_RELATION_EVIDENCE'
  | 'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE'
  | 'INTRINSIC_ROOT_CLASS_EVIDENCE'
  | 'ROOT_RELATION_REVIEW_ROUTING'
  | 'SPECIAL_PATTERN_REVIEW_ROUTING';

export interface StrengthClassificationV4CapabilityRef {
  capabilityId: StrengthClassificationV4CapabilityId;
  status: 'implemented_research_only';
  authorityRef: string;
  authorityVersion: string;
  ruleCount?: number;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
}

export type StrengthClassificationV4BlockerCode =
  | 'EARTH_ROOT_CLASS_UNRESOLVED'
  | 'RELATION_EFFECT_RESOLUTION_MISSING'
  | 'SCENARIO_EVIDENCE_INCOMPLETE'
  | 'SCENARIO_EVIDENCE_FAILED';

export interface StrengthClassificationV4Blocker {
  code: StrengthClassificationV4BlockerCode;
  scope: 'methodology' | 'scenario';
  rationale: string;
  requiredBeforeClassification: string;
}

export interface StrengthClassificationReviewV4Report {
  reviewId: string;
  reviewVersion: string;
  matrixId: string;
  snapshotId: string;
  methodologyId: 'M-STRENGTH-FUYI';
  terminalDecision: 'CLASSIFIER_IMPLEMENTATION_BLOCKED';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  satisfiedCapabilities: readonly StrengthClassificationV4CapabilityRef[];
  remainingBlockers: readonly StrengthClassificationV4Blocker[];
}

function capabilities(): readonly StrengthClassificationV4CapabilityRef[] {
  return [
    {
      capabilityId: 'MONTH_BRANCH_RELATION_EVIDENCE',
      status: 'implemented_research_only',
      authorityRef: I18A_MONTH_BRANCH_STRENGTH_PACK.packId,
      authorityVersion: I18A_MONTH_BRANCH_STRENGTH_PACK.version,
      ruleCount: I18A_MONTH_BRANCH_STRENGTH_RULES.length,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    {
      capabilityId: 'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE',
      status: 'implemented_research_only',
      authorityRef: I18B_HIDDEN_CHALLENGE_PACK.packId,
      authorityVersion: I18B_HIDDEN_CHALLENGE_PACK.version,
      ruleCount: I18B_HIDDEN_CHALLENGE_RULES.length,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    {
      capabilityId: 'INTRINSIC_ROOT_CLASS_EVIDENCE',
      status: 'implemented_research_only',
      authorityRef: I18C_ROOT_CLASS_PACK.packId,
      authorityVersion: I18C_ROOT_CLASS_PACK.version,
      ruleCount: I18C_ROOT_CLASS_RULES.length,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    {
      capabilityId: 'ROOT_RELATION_REVIEW_ROUTING',
      status: 'implemented_research_only',
      authorityRef: 'I18D_ROOT_RELATION_REVIEW',
      authorityVersion: I18D_ROOT_RELATION_REVIEW_VERSION,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    {
      capabilityId: 'SPECIAL_PATTERN_REVIEW_ROUTING',
      status: 'implemented_research_only',
      authorityRef: 'I18E_SPECIAL_PATTERN_REVIEW_ROUTER',
      authorityVersion: I18E_SPECIAL_PATTERN_ROUTER_VERSION,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
  ];
}

const METHODOLOGY_BLOCKERS: readonly StrengthClassificationV4Blocker[] = Object.freeze([
  {
    code: 'EARTH_ROOT_CLASS_UNRESOLVED',
    scope: 'methodology',
    rationale:
      'I18C intentionally leaves earth root class unresolved because source traditions differ on earth birth-stage treatment. The classifier must not silently pick one convention.',
    requiredBeforeClassification:
      'Choose and version an earth-root convention for M-STRENGTH-FUYI, or define a fail-closed policy that keeps affected earth cases indeterminate.',
  },
  {
    code: 'RELATION_EFFECT_RESOLUTION_MISSING',
    scope: 'methodology',
    rationale:
      'I18D now routes clashes and branch combinations that touch a rooted position, but it intentionally does not decide whether the root is damaged, preserved, strengthened, or transformed.',
    requiredBeforeClassification:
      'Define and verify source-backed post-relation root-effect states and precedence conditions. Structural relation presence alone must remain insufficient.',
  },
]);

function scenarioBlockers(matrix: StrengthEvidenceMatrix): StrengthClassificationV4Blocker[] {
  return matrix.scenarios.flatMap((scenario) => {
    if (scenario.executionState === 'complete') return [];
    const code: StrengthClassificationV4BlockerCode =
      scenario.executionState === 'failed'
        ? 'SCENARIO_EVIDENCE_FAILED'
        : 'SCENARIO_EVIDENCE_INCOMPLETE';
    return [
      {
        code,
        scope: 'scenario' as const,
        rationale:
          code === 'SCENARIO_EVIDENCE_FAILED'
            ? `Strength evidence execution failed for ${scenario.scenarioRef ?? 'canonical'} basis.`
            : `Strength evidence execution is not complete for ${scenario.scenarioRef ?? 'canonical'} basis.`,
        requiredBeforeClassification:
          'Resolve scenario evidence execution before classification for this basis.',
      },
    ];
  });
}

export function buildI18StrengthClassificationReviewV4(
  matrix: StrengthEvidenceMatrix,
): StrengthClassificationReviewV4Report {
  const satisfiedCapabilities = capabilities();
  const remainingBlockers = [...METHODOLOGY_BLOCKERS, ...scenarioBlockers(matrix)];
  const material = {
    reviewVersion: I18_STRENGTH_CLASSIFICATION_REVIEW_V4_VERSION,
    matrixId: matrix.matrixId,
    snapshotId: matrix.snapshotId,
    methodologyId: 'M-STRENGTH-FUYI' as const,
    terminalDecision: 'CLASSIFIER_IMPLEMENTATION_BLOCKED' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    satisfiedCapabilities,
    remainingBlockers,
  };

  return {
    reviewId: `strength_review_v4_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
