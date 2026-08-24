import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeMechanism,
  ChallengeMechanismCompositionReport,
} from './i24-challenge-mechanism-composition.js';

export const I25_CHALLENGE_EFFECT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-effect-methodology-review-v1';

export type ChallengeEffectDependency =
  | 'DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT'
  | 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
  | 'ROOT_SUPPORT_CONTEXT'
  | 'PEER_SUPPORT_CONTEXT'
  | 'RESOURCE_SUPPORT_CONTEXT'
  | 'STRUCTURAL_TARGET_CONTEXT'
  | 'RELATION_INTERACTION_CONTEXT';

export type ChallengeEffectReviewState =
  | 'OUTPUT_EFFECT_REVIEW_REQUIRED'
  | 'WEALTH_EFFECT_REVIEW_REQUIRED'
  | 'OFFICER_EFFECT_REVIEW_REQUIRED';

export interface ChallengeEffectMethodologyReviewItem {
  mechanism: ChallengeMechanism;
  evidenceIds: readonly string[];
  state: ChallengeEffectReviewState;
  requiredContexts: readonly ChallengeEffectDependency[];
  effectiveState: 'not_determined';
  fixedWeakeningDirectionAuthorized: false;
  numericMagnitude: 'not_assigned';
}

export interface ChallengeEffectMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  upstreamCompositionReportId: string;
  items: readonly ChallengeEffectMethodologyReviewItem[];
  mixedMechanismPrecedence: 'not_authorized';
  relationSpecificEffectResolutionRequired: true;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I25_CHALLENGE_EFFECT_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'The commentary states that 食傷 leakage and 官殺 control/harm must be distinguished: either can help or harm depending on day-master force and the surrounding 財官/比劫 structure.',
  },
  {
    sourceId: 'SRC-I25-DITIANSUI-WEALTH-CONTEXT-WIKISOURCE',
    finding:
      'In the weak-day-master / repeated-wealth example, peer support and resource support have different consequences, showing that wealth pressure cannot be converted to a fixed weakening unit without surrounding support context.',
  },
  {
    sourceId: 'SRC-METHOD-YUANHAI-ZIPING-WIKISOURCE',
    finding:
      'The day-master relation taxonomy distinguishes 我生, 我克, and 克我 relations, supporting relation-specific effect review rather than a single challenge magnitude.',
  },
] as const);

const COMMON_CONTEXTS: readonly ChallengeEffectDependency[] = Object.freeze([
  'DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT',
  'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
  'ROOT_SUPPORT_CONTEXT',
  'RELATION_INTERACTION_CONTEXT',
]);

function reviewState(mechanism: ChallengeMechanism): ChallengeEffectReviewState {
  if (mechanism === 'OUTPUT_LEAKAGE') return 'OUTPUT_EFFECT_REVIEW_REQUIRED';
  if (mechanism === 'WEALTH_EXPENDITURE_CONTROL') return 'WEALTH_EFFECT_REVIEW_REQUIRED';
  return 'OFFICER_EFFECT_REVIEW_REQUIRED';
}

function requiredContexts(mechanism: ChallengeMechanism): readonly ChallengeEffectDependency[] {
  if (mechanism === 'OUTPUT_LEAKAGE') {
    return [
      ...COMMON_CONTEXTS,
      'STRUCTURAL_TARGET_CONTEXT',
    ];
  }
  if (mechanism === 'WEALTH_EXPENDITURE_CONTROL') {
    return [
      ...COMMON_CONTEXTS,
      'PEER_SUPPORT_CONTEXT',
      'RESOURCE_SUPPORT_CONTEXT',
    ];
  }
  return [
    ...COMMON_CONTEXTS,
    'RESOURCE_SUPPORT_CONTEXT',
    'STRUCTURAL_TARGET_CONTEXT',
  ];
}

export function buildI25ChallengeEffectMethodologyReview(
  composition: ChallengeMechanismCompositionReport,
): ChallengeEffectMethodologyReviewReport {
  const items = composition.mechanismGroups.map((group) => ({
    mechanism: group.mechanism,
    evidenceIds: [...group.evidenceIds],
    state: reviewState(group.mechanism),
    requiredContexts: requiredContexts(group.mechanism),
    effectiveState: 'not_determined' as const,
    fixedWeakeningDirectionAuthorized: false as const,
    numericMagnitude: 'not_assigned' as const,
  }));

  const material = {
    reviewVersion: I25_CHALLENGE_EFFECT_METHODOLOGY_REVIEW_VERSION,
    upstreamCompositionReportId: composition.reportId,
    items,
    mixedMechanismPrecedence: 'not_authorized' as const,
    relationSpecificEffectResolutionRequired: true as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I25_CHALLENGE_EFFECT_SOURCE_BASIS,
    notes: [
      'Each challenge mechanism is routed to its own context requirements instead of receiving a fixed negative direction.',
      'PRECLASSIFICATION_FORCE_CONTEXT must be derived independently of the final strength classifier to avoid circular reasoning.',
      'The required-context list is a methodology dependency contract, not an effect formula or precedence table.',
      'No output, wealth, or officer/control observation is assigned a numeric weight or final weakening magnitude.',
    ],
  };

  return {
    reviewId: `challenge_effect_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
