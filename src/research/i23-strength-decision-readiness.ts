import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { SpecialPatternReviewRouterReport } from './i18e-special-pattern-review-router.js';
import type { PostRelationRootEffectReviewReport } from './i19-post-relation-root-effect-review.js';
import type { ClashRescueRouterReport } from './i20d-clash-rescue-router.js';
import type { SupportCompositionFrontierReport } from './i22-support-composition-frontier.js';

export const I23_STRENGTH_DECISION_READINESS_VERSION =
  'myeonghwa-strength-decision-readiness-v1';

export type StrengthDecisionReadinessStatus =
  | 'INPUT_INDETERMINATE'
  | 'SPECIAL_PATTERN_REVIEW_REQUIRED'
  | 'METHODOLOGY_BLOCKED';

export type StrengthDecisionBlocker =
  | 'INPUT_OR_SCENARIO_INDETERMINATE'
  | 'SPECIAL_PATTERN_REVIEW_UNRESOLVED'
  | 'POST_RELATION_ROOT_EFFECT_UNRESOLVED'
  | 'SUPPORT_FRONTIER_INCOMPARABLE'
  | 'RESOURCE_SUPPORT_EFFECT_UNRESOLVED'
  | 'EARTH_ROOT_CLASS_UNRESOLVED'
  | 'POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED'
  | 'RESCUE_EFFECT_UNRESOLVED'
  | 'SUPPORT_EFFECT_VERDICT_UNRESOLVED'
  | 'CHALLENGE_EFFECT_COMPOSITION_MISSING'
  | 'CLASSIFIER_POLICY_NOT_AUTHORIZED';

export interface StrengthDecisionReadinessInput {
  specialPattern: SpecialPatternReviewRouterReport;
  postRelationRoot: PostRelationRootEffectReviewReport;
  supportFrontier: SupportCompositionFrontierReport;
  clashRescue: ClashRescueRouterReport;
}

export interface StrengthDecisionReadinessReport {
  reportId: string;
  reportVersion: string;
  status: StrengthDecisionReadinessStatus;
  terminalDecision:
    | 'STOP_WITH_INDETERMINATE'
    | 'ROUTE_SPECIAL_PATTERN_REVIEW'
    | 'STOP_FOR_METHODOLOGY_REVIEW';
  upstreamReportIds: {
    specialPattern: string;
    postRelationRoot: string;
    supportFrontier: string;
    clashRescue: string;
  };
  blockers: readonly StrengthDecisionBlocker[];
  blockerEvidence: readonly {
    blocker: StrengthDecisionBlocker;
    reason: string;
  }[];
  ordinaryStrengthClassificationAuthorized: false;
  numericScoringAuthorized: false;
  strongWeakVerdict: 'not_emitted';
  notes: readonly string[];
}

const BLOCKER_ORDER: readonly StrengthDecisionBlocker[] = Object.freeze([
  'INPUT_OR_SCENARIO_INDETERMINATE',
  'SPECIAL_PATTERN_REVIEW_UNRESOLVED',
  'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
  'SUPPORT_FRONTIER_INCOMPARABLE',
  'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
  'EARTH_ROOT_CLASS_UNRESOLVED',
  'POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED',
  'RESCUE_EFFECT_UNRESOLVED',
  'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
  'CHALLENGE_EFFECT_COMPOSITION_MISSING',
  'CLASSIFIER_POLICY_NOT_AUTHORIZED',
]);

const SOURCE_BOUNDED_NOTES = Object.freeze([
  '滴天髓闡微 warns against rigidly classifying strength from seasonal command alone and requires examination of roots, support, control, and whole-chart context.',
  'The same commentary distinguishes peer support from resource support and gives context-dependent cases where either can help or harm; no universal additive support score is authorized.',
  '子平真詮評注 separates Fuyi, special-follow/transform, climate, disease-remedy, and flow methodologies rather than collapsing them into one automatic strength rule.',
]);

function inputIndeterminate(input: StrengthDecisionReadinessInput): boolean {
  return (
    input.specialPattern.status === 'INDETERMINATE_INPUT' ||
    input.specialPattern.status === 'INDETERMINATE_SCENARIO' ||
    input.postRelationRoot.terminalDecision === 'INPUT_INDETERMINATE' ||
    input.clashRescue.status === 'INPUT_INDETERMINATE'
  );
}

function addBlocker(
  map: Map<StrengthDecisionBlocker, string>,
  blocker: StrengthDecisionBlocker,
  reason: string,
): void {
  if (!map.has(blocker)) map.set(blocker, reason);
}

function collectBlockers(input: StrengthDecisionReadinessInput): Map<StrengthDecisionBlocker, string> {
  const blockers = new Map<StrengthDecisionBlocker, string>();

  if (inputIndeterminate(input)) {
    addBlocker(
      blockers,
      'INPUT_OR_SCENARIO_INDETERMINATE',
      'At least one upstream review requires a resolved/materialized input or scenario.',
    );
  }

  if (input.specialPattern.status === 'SPECIAL_PATTERN_REVIEW_REQUIRED') {
    addBlocker(
      blockers,
      'SPECIAL_PATTERN_REVIEW_UNRESOLVED',
      'A tracked follow/transform/three-combination signal requires separate special-pattern review before ordinary strength classification.',
    );
  }

  if (
    input.postRelationRoot.items.some(
      (item) => item.state !== 'NO_TRACKED_RELATION_CANDIDATE',
    )
  ) {
    addBlocker(
      blockers,
      'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
      'At least one tracked root is touched by a structural relation whose effective post-relation root state is unresolved.',
    );
  }

  if (input.supportFrontier.incomparableMaximalPairs.length > 0) {
    addBlocker(
      blockers,
      'SUPPORT_FRONTIER_INCOMPARABLE',
      'The maximal support frontier contains evidence classes without an authorized precedence relation.',
    );
  }

  const supportClasses = new Set(
    input.supportFrontier.observations.map((observation) => observation.evidenceClass),
  );

  if (
    supportClasses.has('visible_resource_support') ||
    supportClasses.has('resource_branch_support')
  ) {
    addBlocker(
      blockers,
      'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
      'Resource support is observed but its effect and precedence relative to root/peer support are not globally resolved.',
    );
  }

  if (supportClasses.has('earth_root_class_unresolved')) {
    addBlocker(
      blockers,
      'EARTH_ROOT_CLASS_UNRESOLVED',
      'Earth root class remains explicitly unresolved because competing root-stage conventions have not been collapsed.',
    );
  }

  if (supportClasses.has('post_relation_root_state')) {
    addBlocker(
      blockers,
      'POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED',
      'A post-relation root state is present but no precedence/effect policy has been authorized for that evidence class.',
    );
  }

  if (input.clashRescue.candidates.length > 0) {
    addBlocker(
      blockers,
      'RESCUE_EFFECT_UNRESOLVED',
      'A six-combination or three-combination rescue candidate touches a clash, but rescue strength/effect is not resolved.',
    );
  }

  addBlocker(
    blockers,
    'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
    'The research substrate can preserve and partially order support evidence, but it does not convert the frontier into a final support-effect magnitude or verdict.',
  );
  addBlocker(
    blockers,
    'CHALLENGE_EFFECT_COMPOSITION_MISSING',
    'Challenge-side output/wealth/officer evidence exists only as membership evidence; no source-backed non-numeric composition policy has been implemented yet.',
  );
  addBlocker(
    blockers,
    'CLASSIFIER_POLICY_NOT_AUTHORIZED',
    'No production or research classifier policy has been authorized to emit a final strong/weak category from the current evidence graph.',
  );

  return blockers;
}

function orderedBlockerEvidence(
  blockers: Map<StrengthDecisionBlocker, string>,
): readonly { blocker: StrengthDecisionBlocker; reason: string }[] {
  return BLOCKER_ORDER.flatMap((blocker) => {
    const reason = blockers.get(blocker);
    return reason === undefined ? [] : [{ blocker, reason }];
  });
}

export function buildI23StrengthDecisionReadiness(
  input: StrengthDecisionReadinessInput,
): StrengthDecisionReadinessReport {
  const blockerMap = collectBlockers(input);
  const blockerEvidence = orderedBlockerEvidence(blockerMap);
  const blockers = blockerEvidence.map((item) => item.blocker);

  const status: StrengthDecisionReadinessStatus = inputIndeterminate(input)
    ? 'INPUT_INDETERMINATE'
    : input.specialPattern.status === 'SPECIAL_PATTERN_REVIEW_REQUIRED'
      ? 'SPECIAL_PATTERN_REVIEW_REQUIRED'
      : 'METHODOLOGY_BLOCKED';

  const terminalDecision =
    status === 'INPUT_INDETERMINATE'
      ? ('STOP_WITH_INDETERMINATE' as const)
      : status === 'SPECIAL_PATTERN_REVIEW_REQUIRED'
        ? ('ROUTE_SPECIAL_PATTERN_REVIEW' as const)
        : ('STOP_FOR_METHODOLOGY_REVIEW' as const);

  const material = {
    reportVersion: I23_STRENGTH_DECISION_READINESS_VERSION,
    status,
    terminalDecision,
    upstreamReportIds: {
      specialPattern: input.specialPattern.reportId,
      postRelationRoot: input.postRelationRoot.reviewId,
      supportFrontier: input.supportFrontier.reportId,
      clashRescue: input.clashRescue.reportId,
    },
    blockers,
    blockerEvidence,
    ordinaryStrengthClassificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    strongWeakVerdict: 'not_emitted' as const,
    notes: [
      ...SOURCE_BOUNDED_NOTES,
      'This graph is a deterministic readiness/stop contract. It intentionally has no strong/weak output branch.',
      'NO_BASELINE_SPECIAL_SIGNAL is not treated as proof that ordinary classification is ready; all remaining methodology blockers still apply.',
    ],
  };

  return {
    reportId: `strength_decision_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
