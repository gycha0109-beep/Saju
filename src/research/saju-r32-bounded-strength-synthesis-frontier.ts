import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY } from './general-natal-bounded-sizhu-root-presence-completeness-authority-review.js';
import { GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY } from './general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  collectGovernedBiyinSupportInventory,
  GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY,
} from './governed-biyin-support-inventory-authority.js';
import {
  I23_STRENGTH_DECISION_READINESS_VERSION,
  type StrengthDecisionBlocker,
  type StrengthDecisionReadinessReport,
} from './i23-strength-decision-readiness.js';

export const SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_VERSION =
  '0.1.0-research' as const;

export type SajuR32BoundedStrengthSynthesisFrontierStatus =
  | 'INPUT_FRONTIER_UNAVAILABLE'
  | 'SPECIAL_PATTERN_ROUTE_REQUIRED'
  | 'BOUNDED_SYNTHESIS_FRONTIER_READY_METHODOLOGY_BLOCKED';

type R31SupportInventoryResult = ReturnType<typeof collectGovernedBiyinSupportInventory>;

const SUPPORT_BLOCKERS = Object.freeze([
  'SUPPORT_FRONTIER_INCOMPARABLE',
  'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
  'EARTH_ROOT_CLASS_UNRESOLVED',
  'POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED',
  'RESCUE_EFFECT_UNRESOLVED',
  'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
] satisfies readonly StrengthDecisionBlocker[]);

const CHALLENGE_BLOCKERS = Object.freeze([
  'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
  'RESCUE_EFFECT_UNRESOLVED',
  'CHALLENGE_EFFECT_COMPOSITION_MISSING',
] satisfies readonly StrengthDecisionBlocker[]);

const CLASSIFIER_BLOCKERS = Object.freeze([
  'CLASSIFIER_POLICY_NOT_AUTHORIZED',
] satisfies readonly StrengthDecisionBlocker[]);

const definition = Object.freeze({
  primitiveId: 'BOUNDED_STRENGTH_SYNTHESIS_FRONTIER',
  version: SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_VERSION,
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope:
    'deterministic_frontier_between_governed_strength_inputs_and_remaining_methodology',
  decisionRef: 'GH-2351',
  preservedRootConflictPolicy:
    'PRESERVE_YIN_CHANGSHENG_SOURCE_STRATA_CONFLICT_UNRESOLVED',
  sourceStrataPrecedenceAuthorized: false,
  rootConflictMayBeReopenedAsUserPreferenceGate: false,
  r31DefinitionHash: GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY.definitionHash,
  i23Version: I23_STRENGTH_DECISION_READINESS_VERSION,
  rootCompletenessDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY.definitionHash,
  yinChangshengConflictDefinitionHash:
    GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY.definitionHash,
  boundedInputFrontierAuthorized: true,
  blockerFamilyProjectionAuthorized: true,
  independentMethodologyLanePlanningAuthorized: true,
  chartLocalRootApplicabilityRoutingAuthorizedByThisFrontier: false,
  supportEffectResolutionAuthorizedByThisFrontier: false,
  challengeEffectResolutionAuthorizedByThisFrontier: false,
  dangZhongZhuGuaSettlementAuthorized: false,
  qiangRuoClassificationAuthorized: false,
  wangShuaiClassificationAuthorized: false,
  numericStrengthAuthorized: false,
  supportChallengeSubtractionAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

function selectedBlockers(
  blockers: readonly StrengthDecisionBlocker[],
  candidates: readonly StrengthDecisionBlocker[],
): readonly StrengthDecisionBlocker[] {
  return candidates.filter((candidate) => blockers.includes(candidate));
}

function rootBlockers(): readonly string[] {
  const root =
    GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY;
  const blockers: string[] = [];

  if (root.yinChangshengRootStatusCompleteness === 'UNRESOLVED_SOURCE_CONFLICT') {
    blockers.push('YIN_CHANGSHENG_SOURCE_CONFLICT_PRESERVED');
  }
  if (root.yinLuCompleteness === 'AMBIGUOUS') {
    blockers.push('YIN_LU_AMBIGUOUS');
  }
  if (root.earthLuAttachmentCompleteness === 'UNRESOLVED') {
    blockers.push('EARTH_LU_ATTACHMENT_UNRESOLVED');
  }
  if (root.earthYuqiCompleteness === 'UNRESOLVED') {
    blockers.push('EARTH_YUQI_UNRESOLVED');
  }
  if (root.negativeRootAbsenceSemantics === 'MISSING') {
    blockers.push('NEGATIVE_ROOT_ABSENCE_SEMANTICS_MISSING');
  }

  return Object.freeze(blockers);
}

export interface SajuR32BoundedStrengthSynthesisFrontierInput {
  supportInventory: R31SupportInventoryResult;
  strengthReadiness: StrengthDecisionReadinessReport;
}

export function buildSajuR32BoundedStrengthSynthesisFrontier(
  input: SajuR32BoundedStrengthSynthesisFrontierInput,
) {
  const supportInventoryResolved = input.supportInventory.status === 'resolved';
  const inputIndeterminate =
    !supportInventoryResolved ||
    input.strengthReadiness.status === 'INPUT_INDETERMINATE';
  const specialPatternRouteRequired =
    !inputIndeterminate &&
    input.strengthReadiness.status === 'SPECIAL_PATTERN_REVIEW_REQUIRED';

  const status: SajuR32BoundedStrengthSynthesisFrontierStatus = inputIndeterminate
    ? 'INPUT_FRONTIER_UNAVAILABLE'
    : specialPatternRouteRequired
      ? 'SPECIAL_PATTERN_ROUTE_REQUIRED'
      : 'BOUNDED_SYNTHESIS_FRONTIER_READY_METHODOLOGY_BLOCKED';

  const supportBlockers = selectedBlockers(
    input.strengthReadiness.blockers,
    SUPPORT_BLOCKERS,
  );
  const challengeBlockers = selectedBlockers(
    input.strengthReadiness.blockers,
    CHALLENGE_BLOCKERS,
  );
  const classifierBlockers = selectedBlockers(
    input.strengthReadiness.blockers,
    CLASSIFIER_BLOCKERS,
  );
  const unresolvedRootBlockers = rootBlockers();

  const ordinarySynthesisInputReady =
    status === 'BOUNDED_SYNTHESIS_FRONTIER_READY_METHODOLOGY_BLOCKED';

  const nextEligiblePrimitives = ordinarySynthesisInputReady
    ? Object.freeze([
        'CHART_LOCAL_ROOT_APPLICABILITY_ROUTER',
        'BOUNDED_SUPPORT_EFFECT_SYNTHESIS',
        'BOUNDED_CHALLENGE_EFFECT_SYNTHESIS',
      ] as const)
    : specialPatternRouteRequired
      ? Object.freeze(['SPECIAL_PATTERN_REVIEW'] as const)
      : Object.freeze([] as const);

  const recommendedNextPrimitive = ordinarySynthesisInputReady
    ? ('CHART_LOCAL_ROOT_APPLICABILITY_ROUTER' as const)
    : specialPatternRouteRequired
      ? ('SPECIAL_PATTERN_REVIEW' as const)
      : null;

  const material = {
    version: SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_VERSION,
    status,
    terminalDecision: inputIndeterminate
      ? ('STOP_WITH_INPUT_FRONTIER_UNAVAILABLE' as const)
      : specialPatternRouteRequired
        ? ('ROUTE_SPECIAL_PATTERN_REVIEW' as const)
        : ('CONTINUE_INDEPENDENT_METHODOLOGY_SYNTHESIS' as const),
    upstream: {
      r31SupportInventoryDefinitionHash:
        GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY.definitionHash,
      supportInventoryStatus: input.supportInventory.status,
      supportInventoryReasonCode:
        input.supportInventory.status === 'unavailable'
          ? input.supportInventory.reasonCode
          : null,
      i23ReportId: input.strengthReadiness.reportId,
      i23ReportVersion: input.strengthReadiness.reportVersion,
      i23Status: input.strengthReadiness.status,
      i23Blockers: input.strengthReadiness.blockers,
      rootCompletenessDefinitionHash:
        GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY
          .definitionHash,
      yinChangshengConflictDefinitionHash:
        GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
          .definitionHash,
    },
    blockerFamilies: {
      root: {
        state: 'PARTIAL_WITH_PRESERVED_CONFLICT' as const,
        blockers: unresolvedRootBlockers,
        globalCompletenessDecision:
          GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY
            .decision,
        sourceConflictDecision:
          GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
            .decision,
        independentMethodologyMayProceed: true as const,
        sourceConflictReopeningRequired: false as const,
      },
      support: {
        state:
          supportBlockers.length > 0
            ? ('METHODOLOGY_REQUIRED' as const)
            : ('NO_CURRENT_I23_SUPPORT_BLOCKER' as const),
        blockers: supportBlockers,
      },
      challenge: {
        state:
          challengeBlockers.length > 0
            ? ('METHODOLOGY_REQUIRED' as const)
            : ('NO_CURRENT_I23_CHALLENGE_BLOCKER' as const),
        blockers: challengeBlockers,
      },
      classifier: {
        state: 'NOT_AUTHORIZED' as const,
        blockers: classifierBlockers,
        waitsForEffectMethodology: true as const,
      },
    },
    ordinarySynthesisInputReady,
    globalRootCompletenessBlocksAllIndependentResearch: false as const,
    nextEligiblePrimitives,
    recommendedNextPrimitive,
    constraints: SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_AUTHORITY,
  };

  return Object.freeze({
    frontierId:
      'saju_r32_strength_frontier_' +
      deterministicContentHash(material).slice(0, 24),
    ...material,
  });
}
