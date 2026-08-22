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

export const I18_STRENGTH_CLASSIFICATION_REVIEW_V3_VERSION =
  'myeonghwa-strength-classification-review-v3';

export type StrengthClassificationV3CapabilityId =
  | 'MONTH_BRANCH_RELATION_EVIDENCE'
  | 'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE'
  | 'INTRINSIC_ROOT_CLASS_EVIDENCE';

export interface StrengthClassificationV3CapabilityRef {
  capabilityId: StrengthClassificationV3CapabilityId;
  status: 'implemented_research_only';
  packId: string;
  packVersion: string;
  ruleCount: number;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
}

export type StrengthClassificationV3BlockerCode =
  | 'EARTH_ROOT_CLASS_UNRESOLVED'
  | 'RELATION_EFFECT_RESOLUTION_MISSING'
  | 'SPECIAL_PATTERN_ROUTING_MISSING'
  | 'SCENARIO_EVIDENCE_INCOMPLETE'
  | 'SCENARIO_EVIDENCE_FAILED';

export interface StrengthClassificationV3Blocker {
  code: StrengthClassificationV3BlockerCode;
  scope: 'methodology' | 'scenario';
  rationale: string;
  requiredBeforeClassification: string;
}

export interface StrengthClassificationReviewV3Report {
  reviewId: string;
  reviewVersion: string;
  matrixId: string;
  snapshotId: string;
  methodologyId: 'M-STRENGTH-FUYI';
  terminalDecision: 'CLASSIFIER_IMPLEMENTATION_BLOCKED';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  satisfiedCapabilities: readonly StrengthClassificationV3CapabilityRef[];
  remainingBlockers: readonly StrengthClassificationV3Blocker[];
}

function capabilities(): readonly StrengthClassificationV3CapabilityRef[] {
  return [
    {
      capabilityId: 'MONTH_BRANCH_RELATION_EVIDENCE',
      status: 'implemented_research_only',
      packId: I18A_MONTH_BRANCH_STRENGTH_PACK.packId,
      packVersion: I18A_MONTH_BRANCH_STRENGTH_PACK.version,
      ruleCount: I18A_MONTH_BRANCH_STRENGTH_RULES.length,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    {
      capabilityId: 'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE',
      status: 'implemented_research_only',
      packId: I18B_HIDDEN_CHALLENGE_PACK.packId,
      packVersion: I18B_HIDDEN_CHALLENGE_PACK.version,
      ruleCount: I18B_HIDDEN_CHALLENGE_RULES.length,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
    {
      capabilityId: 'INTRINSIC_ROOT_CLASS_EVIDENCE',
      status: 'implemented_research_only',
      packId: I18C_ROOT_CLASS_PACK.packId,
      packVersion: I18C_ROOT_CLASS_PACK.version,
      ruleCount: I18C_ROOT_CLASS_RULES.length,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
    },
  ];
}

const METHODOLOGY_BLOCKERS: readonly StrengthClassificationV3Blocker[] = Object.freeze([
  {
    code: 'EARTH_ROOT_CLASS_UNRESOLVED',
    scope: 'methodology',
    rationale:
      'I18C intentionally leaves earth root class unresolved because source traditions differ on earth birth-stage treatment. The classifier must not silently pick one convention.',
    requiredBeforeClassification:
      'Choose and version an earth root convention for M-STRENGTH-FUYI or preserve earth scenarios as indeterminate under a documented policy.',
  },
  {
    code: 'RELATION_EFFECT_RESOLUTION_MISSING',
    scope: 'methodology',
    rationale:
      'I18C describes intrinsic root class before relation effects. Clash/combination candidates can alter or fail to alter a root depending on conditions that are not yet resolved.',
    requiredBeforeClassification:
      'Implement source-backed relation-effect routing/resolution that distinguishes structural relation presence from actual root damage, preservation, or transformation.',
  },
  {
    code: 'SPECIAL_PATTERN_ROUTING_MISSING',
    scope: 'methodology',
    rationale:
      'Follow/transform and other special-pattern candidates must be routed independently rather than represented as extreme ordinary strength values.',
    requiredBeforeClassification:
      'Implement a research-only special-pattern eligibility gate before ordinary strength classification.',
  },
]);

function scenarioBlockers(matrix: StrengthEvidenceMatrix): StrengthClassificationV3Blocker[] {
  return matrix.scenarios.flatMap((scenario) => {
    if (scenario.executionState === 'complete') return [];
    const code: StrengthClassificationV3BlockerCode =
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

export function buildI18StrengthClassificationReviewV3(
  matrix: StrengthEvidenceMatrix,
): StrengthClassificationReviewV3Report {
  const satisfiedCapabilities = capabilities();
  const remainingBlockers = [...METHODOLOGY_BLOCKERS, ...scenarioBlockers(matrix)];
  const material = {
    reviewVersion: I18_STRENGTH_CLASSIFICATION_REVIEW_V3_VERSION,
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
    reviewId: `strength_review_v3_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
