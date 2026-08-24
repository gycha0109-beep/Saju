import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  StrengthEvidenceMatrix,
  StrengthEvidenceScenarioMatrix,
} from './i14-strength-evidence-matrix.js';
import { INTERPRETATION_METHODOLOGY_SOURCES } from './interpretation-methodology-catalog.js';

export const I18_STRENGTH_CLASSIFICATION_REVIEW_VERSION =
  'myeonghwa-strength-classification-review-v1';

export type StrengthClassificationReviewBlockerCode =
  | 'MONTH_ORDER_CHALLENGE_SEMANTICS_MISSING'
  | 'HIDDEN_CHALLENGE_EVIDENCE_MISSING'
  | 'ROOT_EFFECT_QUALITY_MISSING'
  | 'RELATION_EFFECT_RESOLUTION_MISSING'
  | 'SPECIAL_PATTERN_ROUTING_MISSING'
  | 'SCENARIO_EVIDENCE_INCOMPLETE'
  | 'SCENARIO_EVIDENCE_FAILED';

export interface StrengthClassificationReviewBlocker {
  code: StrengthClassificationReviewBlockerCode;
  scope: 'methodology' | 'scenario';
  rationale: string;
  requiredBeforeClassification: string;
}

export interface StrengthClassificationScenarioReview {
  basis: 'canonical' | 'scenario';
  scenarioRef?: string;
  executionState: StrengthEvidenceScenarioMatrix['executionState'];
  blockerCodes: readonly StrengthClassificationReviewBlockerCode[];
}

export interface StrengthClassificationReviewReport {
  reviewId: string;
  reviewVersion: string;
  matrixId: string;
  snapshotId: string;
  methodologyId: 'M-STRENGTH-FUYI';
  terminalDecision: 'CLASSIFIER_IMPLEMENTATION_BLOCKED';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  methodologySourceIds: readonly string[];
  blockers: readonly StrengthClassificationReviewBlocker[];
  scenarios: readonly StrengthClassificationScenarioReview[];
  requiredNextCapabilities: readonly string[];
}

const METHODOLOGY_BLOCKERS: readonly StrengthClassificationReviewBlocker[] = Object.freeze([
  {
    code: 'MONTH_ORDER_CHALLENGE_SEMANTICS_MISSING',
    scope: 'methodology',
    rationale:
      'The current seasonal layer records positive same-element or generating-element support signals, but absence of support is not an explicit model of leakage, expenditure, control, or competing seasonal force.',
    requiredBeforeClassification:
      'Define source-backed month-order evidence semantics for supporting, neutral/indeterminate, and challenging cases without reducing month command to a single final classifier.',
  },
  {
    code: 'HIDDEN_CHALLENGE_EVIDENCE_MISSING',
    scope: 'methodology',
    rationale:
      'Current hidden-stem evidence records peer-root and resource-support membership but does not symmetrically represent hidden output, wealth, and officer/control evidence.',
    requiredBeforeClassification:
      'Add methodology-qualified hidden-stem challenging evidence so branch evidence is not structurally biased toward support.',
  },
  {
    code: 'ROOT_EFFECT_QUALITY_MISSING',
    scope: 'methodology',
    rationale:
      'Hidden-stem membership currently records that a root exists, but does not model differences among stronger and weaker root states or whether a root remains effective under the selected methodology.',
    requiredBeforeClassification:
      'Define a non-numeric, source-backed root-effect taxonomy and preserve uncertainty where root effectiveness cannot be resolved.',
  },
  {
    code: 'RELATION_EFFECT_RESOLUTION_MISSING',
    scope: 'methodology',
    rationale:
      'Structural combination/clash candidates are detected separately, but their effect on a root or supporting/challenging relation is not yet resolved for strength methodology.',
    requiredBeforeClassification:
      'Add methodology-qualified relation-effect claims that distinguish relation presence from successful transformation, damage, rescue, or no effective change.',
  },
  {
    code: 'SPECIAL_PATTERN_ROUTING_MISSING',
    scope: 'methodology',
    rationale:
      'Ordinary strong/weak balancing cannot safely classify charts that may satisfy narrowly defined follow/transform or other special-pattern conditions.',
    requiredBeforeClassification:
      'Implement an independent research-only special-pattern eligibility gate that can route a scenario away from ordinary strength classification before any final label is emitted.',
  },
]);

export const I18_STRENGTH_CLASSIFICATION_REVIEW_BASIS = Object.freeze([
  {
    sourceId: INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei.sourceId,
    finding:
      'Month command is important but cannot alone determine final strength; roots and the other pillars can reverse a naive seasonal conclusion, and roots are not treated as equivalent in effect.',
  },
  {
    sourceId: INTERPRETATION_METHODOLOGY_SOURCES.yuanhaiZiping.sourceId,
    finding:
      'Day-master-centered analysis explicitly inspects strength/weakness, branch structure, element distribution, month command, and the rest of the chart rather than one isolated factor.',
  },
] as const);

function scenarioReview(
  scenario: StrengthEvidenceScenarioMatrix,
): StrengthClassificationScenarioReview {
  const blockerCodes: StrengthClassificationReviewBlockerCode[] = [];
  if (scenario.executionState === 'failed') {
    blockerCodes.push('SCENARIO_EVIDENCE_FAILED');
  } else if (scenario.executionState !== 'complete') {
    blockerCodes.push('SCENARIO_EVIDENCE_INCOMPLETE');
  }

  return {
    basis: scenario.basis,
    ...(scenario.scenarioRef === undefined ? {} : { scenarioRef: scenario.scenarioRef }),
    executionState: scenario.executionState,
    blockerCodes,
  };
}

function scenarioBlockers(
  scenarios: readonly StrengthClassificationScenarioReview[],
): StrengthClassificationReviewBlocker[] {
  return scenarios.flatMap((scenario) =>
    scenario.blockerCodes.map((code) => ({
      code,
      scope: 'scenario' as const,
      rationale:
        code === 'SCENARIO_EVIDENCE_FAILED'
          ? `Evidence execution failed for ${scenario.scenarioRef ?? 'canonical'} basis.`
          : `Evidence execution is not complete for ${scenario.scenarioRef ?? 'canonical'} basis.`,
      requiredBeforeClassification:
        'Resolve the scenario evidence execution state before any classification attempt for this basis.',
    })),
  );
}

export function buildI18StrengthClassificationReview(
  matrix: StrengthEvidenceMatrix,
): StrengthClassificationReviewReport {
  const scenarios = matrix.scenarios.map(scenarioReview);
  const blockers = [...METHODOLOGY_BLOCKERS, ...scenarioBlockers(scenarios)];
  const requiredNextCapabilities = METHODOLOGY_BLOCKERS.map(
    (blocker) => blocker.requiredBeforeClassification,
  );
  const material = {
    reviewVersion: I18_STRENGTH_CLASSIFICATION_REVIEW_VERSION,
    matrixId: matrix.matrixId,
    snapshotId: matrix.snapshotId,
    methodologyId: 'M-STRENGTH-FUYI' as const,
    terminalDecision: 'CLASSIFIER_IMPLEMENTATION_BLOCKED' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    methodologySourceIds: I18_STRENGTH_CLASSIFICATION_REVIEW_BASIS.map(
      (basis) => basis.sourceId,
    ),
    blockers,
    scenarios,
    requiredNextCapabilities,
  };

  return {
    reviewId: `strength_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
