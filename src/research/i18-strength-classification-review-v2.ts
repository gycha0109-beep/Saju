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

export const I18_STRENGTH_CLASSIFICATION_REVIEW_V2_VERSION =
  'myeonghwa-strength-classification-review-v2';

export type StrengthClassificationCapabilityId =
  | 'MONTH_BRANCH_RELATION_EVIDENCE'
  | 'HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE';

export interface StrengthClassificationCapabilityRef {
  capabilityId: StrengthClassificationCapabilityId;
  status: 'implemented_research_only';
  packId: string;
  packVersion: string;
  ruleCount: number;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
}

export type StrengthClassificationRemainingBlockerCode =
  | 'ROOT_EFFECT_QUALITY_MISSING'
  | 'RELATION_EFFECT_RESOLUTION_MISSING'
  | 'SPECIAL_PATTERN_ROUTING_MISSING'
  | 'SCENARIO_EVIDENCE_INCOMPLETE'
  | 'SCENARIO_EVIDENCE_FAILED';

export interface StrengthClassificationRemainingBlocker {
  code: StrengthClassificationRemainingBlockerCode;
  scope: 'methodology' | 'scenario';
  rationale: string;
  requiredBeforeClassification: string;
}

export interface StrengthClassificationReviewV2Report {
  reviewId: string;
  reviewVersion: string;
  matrixId: string;
  snapshotId: string;
  methodologyId: 'M-STRENGTH-FUYI';
  terminalDecision: 'CLASSIFIER_IMPLEMENTATION_BLOCKED';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  satisfiedCapabilities: readonly StrengthClassificationCapabilityRef[];
  remainingBlockers: readonly StrengthClassificationRemainingBlocker[];
}

function capabilityRefs(): readonly StrengthClassificationCapabilityRef[] {
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
  ];
}

const METHODOLOGY_BLOCKERS: readonly StrengthClassificationRemainingBlocker[] = Object.freeze([
  {
    code: 'ROOT_EFFECT_QUALITY_MISSING',
    scope: 'methodology',
    rationale:
      'Root membership is available, but the methodology still lacks a reviewed non-numeric model for differences in root quality/effect and unresolved root states.',
    requiredBeforeClassification:
      'Define and validate a source-backed root-effect taxonomy without converting root categories into arbitrary numeric weights.',
  },
  {
    code: 'RELATION_EFFECT_RESOLUTION_MISSING',
    scope: 'methodology',
    rationale:
      'Combination/clash candidates are structural facts, but their actual effect on a root or other strength evidence is not yet resolved within M-STRENGTH-FUYI.',
    requiredBeforeClassification:
      'Implement methodology-qualified relation-effect states that preserve unresolved cases and distinguish relation presence from transformation/damage.',
  },
  {
    code: 'SPECIAL_PATTERN_ROUTING_MISSING',
    scope: 'methodology',
    rationale:
      'Ordinary strong/weak classification must not absorb follow/transform or other special-pattern candidates as mere extreme scores.',
    requiredBeforeClassification:
      'Implement an independent research-only special-pattern eligibility/routing gate before ordinary classification can be considered.',
  },
]);

function scenarioBlockers(matrix: StrengthEvidenceMatrix): StrengthClassificationRemainingBlocker[] {
  return matrix.scenarios.flatMap((scenario) => {
    if (scenario.executionState === 'complete') return [];
    const code: StrengthClassificationRemainingBlockerCode =
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
          'Resolve scenario evidence execution before any classification attempt for this basis.',
      },
    ];
  });
}

export function buildI18StrengthClassificationReviewV2(
  matrix: StrengthEvidenceMatrix,
): StrengthClassificationReviewV2Report {
  const satisfiedCapabilities = capabilityRefs();
  const remainingBlockers = [...METHODOLOGY_BLOCKERS, ...scenarioBlockers(matrix)];
  const material = {
    reviewVersion: I18_STRENGTH_CLASSIFICATION_REVIEW_V2_VERSION,
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
    reviewId: `strength_review_v2_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
