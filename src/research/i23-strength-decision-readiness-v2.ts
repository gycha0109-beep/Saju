import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeMechanismCompositionReport } from './i24-challenge-mechanism-composition.js';
import {
  buildI23StrengthDecisionReadiness,
  type StrengthDecisionBlocker,
  type StrengthDecisionReadinessInput,
  type StrengthDecisionReadinessStatus,
} from './i23-strength-decision-readiness.js';

export const I23_STRENGTH_DECISION_READINESS_V2_VERSION =
  'myeonghwa-strength-decision-readiness-v2';

export type StrengthDecisionBlockerV2 =
  | Exclude<StrengthDecisionBlocker, 'CHALLENGE_EFFECT_COMPOSITION_MISSING'>
  | 'CHALLENGE_EFFECT_VERDICT_UNRESOLVED'
  | 'CHALLENGE_MECHANISM_PRECEDENCE_UNRESOLVED';

export interface StrengthDecisionReadinessV2Input extends StrengthDecisionReadinessInput {
  challengeComposition: ChallengeMechanismCompositionReport;
}

export interface StrengthDecisionReadinessV2Report {
  reportId: string;
  reportVersion: string;
  status: StrengthDecisionReadinessStatus;
  terminalDecision:
    | 'STOP_WITH_INDETERMINATE'
    | 'ROUTE_SPECIAL_PATTERN_REVIEW'
    | 'STOP_FOR_METHODOLOGY_REVIEW';
  upstreamReadinessReportId: string;
  upstreamReportIds: {
    specialPattern: string;
    postRelationRoot: string;
    supportFrontier: string;
    clashRescue: string;
    challengeComposition: string;
  };
  blockers: readonly StrengthDecisionBlockerV2[];
  challengeCompositionState: {
    mechanismCompositionPresent: true;
    mixedMechanismsPresent: boolean;
    crossMechanismPrecedenceAuthorized: false;
    challengeEffectVerdict: 'not_determined';
  };
  ordinaryStrengthClassificationAuthorized: false;
  numericScoringAuthorized: false;
  strongWeakVerdict: 'not_emitted';
  notes: readonly string[];
}

const V2_BLOCKER_ORDER: readonly StrengthDecisionBlockerV2[] = Object.freeze([
  'INPUT_OR_SCENARIO_INDETERMINATE',
  'SPECIAL_PATTERN_REVIEW_UNRESOLVED',
  'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
  'SUPPORT_FRONTIER_INCOMPARABLE',
  'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
  'EARTH_ROOT_CLASS_UNRESOLVED',
  'POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED',
  'RESCUE_EFFECT_UNRESOLVED',
  'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
  'CHALLENGE_EFFECT_VERDICT_UNRESOLVED',
  'CHALLENGE_MECHANISM_PRECEDENCE_UNRESOLVED',
  'CLASSIFIER_POLICY_NOT_AUTHORIZED',
]);

function orderedUniqueBlockers(
  blockers: readonly StrengthDecisionBlockerV2[],
): readonly StrengthDecisionBlockerV2[] {
  const present = new Set(blockers);
  return V2_BLOCKER_ORDER.filter((blocker) => present.has(blocker));
}

export function buildI23StrengthDecisionReadinessV2(
  input: StrengthDecisionReadinessV2Input,
): StrengthDecisionReadinessV2Report {
  const upstream = buildI23StrengthDecisionReadiness(input);
  const carried = upstream.blockers.filter(
    (blocker): blocker is Exclude<StrengthDecisionBlocker, 'CHALLENGE_EFFECT_COMPOSITION_MISSING'> =>
      blocker !== 'CHALLENGE_EFFECT_COMPOSITION_MISSING',
  );

  const blockers: StrengthDecisionBlockerV2[] = [
    ...carried,
    'CHALLENGE_EFFECT_VERDICT_UNRESOLVED',
  ];

  if (input.challengeComposition.mixedMechanismsPresent) {
    blockers.push('CHALLENGE_MECHANISM_PRECEDENCE_UNRESOLVED');
  }

  const orderedBlockers = orderedUniqueBlockers(blockers);
  const material = {
    reportVersion: I23_STRENGTH_DECISION_READINESS_V2_VERSION,
    status: upstream.status,
    terminalDecision: upstream.terminalDecision,
    upstreamReadinessReportId: upstream.reportId,
    upstreamReportIds: {
      ...upstream.upstreamReportIds,
      challengeComposition: input.challengeComposition.reportId,
    },
    blockers: orderedBlockers,
    challengeCompositionState: {
      mechanismCompositionPresent: true as const,
      mixedMechanismsPresent: input.challengeComposition.mixedMechanismsPresent,
      crossMechanismPrecedenceAuthorized: false as const,
      challengeEffectVerdict: 'not_determined' as const,
    },
    ordinaryStrengthClassificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    strongWeakVerdict: 'not_emitted' as const,
    notes: [
      'I24 removes the missing-mechanism-composition blocker by preserving output, wealth, and officer/control as distinct challenge mechanisms.',
      'Mechanism composition does not resolve relation-specific challenge effect, magnitude, or usefulness in context.',
      'When multiple challenge mechanisms coexist, no cross-mechanism precedence is inferred.',
      'This v2 readiness graph still has no strong/weak output path and no numeric score.',
    ],
  };

  return {
    reportId: `strength_decision_readiness_v2_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
