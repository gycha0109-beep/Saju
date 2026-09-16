import { createHash } from 'node:crypto';
import type { EarthlyBranch, StemFact } from '../contracts/calculation.js';
import {
  evaluateMukuYuqiLightRoot,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from './general-natal-muku-yuqi-light-root-authority.js';
import {
  bindGovernedMukuYuqiRootToBoundedTonggen,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  type MukuYuqiBoundedTonggenEvaluation,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_AUTHORITY,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE_TEXT,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION,
} from './general-natal-month-branch-tonggen-priority-observation-authority.js';

export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SCOPE =
  'governed_canonical_month_branch_to_bounded_tonggen_priority_context_evidence' as const;
export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
} as const);

export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SOURCE_TEXT =
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE_TEXT;

export type MonthBranchBoundedTonggenPriorityContextState =
  | 'month_branch_bounded_tonggen_priority_context_observed'
  | 'no_month_branch_bounded_tonggen_priority_evidence'
  | 'unresolved_outside_governed_month_branch_tonggen_scope';

export interface MonthBranchBoundedTonggenPriorityContextEvaluation {
  readonly state: MonthBranchBoundedTonggenPriorityContextState;
  readonly element: StemFact['element'];
  readonly monthBranch: EarthlyBranch;
  readonly upstreamTonggenState: MukuYuqiBoundedTonggenEvaluation['state'];
  readonly sourceRootKind: MukuYuqiBoundedTonggenEvaluation['sourceRootKind'];
  readonly sourceContext: '通根之中';
  readonly sourcePriorityTarget: '月令之支';
  readonly sourcePriorityPhrase: '尤以月令之支為最重';
  readonly monthBranchTonggenObserved: boolean;
  readonly priorityContextObserved: boolean;
  readonly numericWeightAssigned: false;
  readonly nonNumericScalarAssigned: false;
  readonly chartComparisonPerformed: false;
  readonly dangZhongEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly wangShuaiEstablished: false;
  readonly authority: 'research_only';
}

function createEvaluation(
  state: MonthBranchBoundedTonggenPriorityContextState,
  element: StemFact['element'],
  monthBranch: EarthlyBranch,
  tonggen: MukuYuqiBoundedTonggenEvaluation,
  observed: boolean,
): MonthBranchBoundedTonggenPriorityContextEvaluation {
  return Object.freeze({
    state,
    element,
    monthBranch,
    upstreamTonggenState: tonggen.state,
    sourceRootKind: tonggen.sourceRootKind,
    sourceContext: '通根之中',
    sourcePriorityTarget: '月令之支',
    sourcePriorityPhrase: '尤以月令之支為最重',
    monthBranchTonggenObserved: observed,
    priorityContextObserved: observed,
    numericWeightAssigned: false,
    nonNumericScalarAssigned: false,
    chartComparisonPerformed: false,
    dangZhongEstablished: false,
    qiangRuoEstablished: false,
    wangShuaiEstablished: false,
    authority: 'research_only',
  });
}

/**
 * Evaluates only a canonical resolved day-master element against the canonical
 * resolved month branch. It intentionally does not accept an arbitrary
 * precomputed Tonggen evaluation because that object does not carry pillar-slot
 * provenance.
 */
export function evaluateCanonicalMonthBranchBoundedTonggenPriorityContext(
  dayMaster: Pick<StemFact, 'element'>,
  monthBranch: EarthlyBranch,
): MonthBranchBoundedTonggenPriorityContextEvaluation {
  const root = evaluateMukuYuqiLightRoot(dayMaster, monthBranch);
  const tonggen = bindGovernedMukuYuqiRootToBoundedTonggen(root);

  if (
    tonggen.state === 'bounded_tonggen_observed' &&
    tonggen.tonggenObserved === true &&
    (tonggen.sourceRootKind === '墓庫' || tonggen.sourceRootKind === '餘氣')
  ) {
    return createEvaluation(
      'month_branch_bounded_tonggen_priority_context_observed',
      dayMaster.element,
      monthBranch,
      tonggen,
      true,
    );
  }

  if (tonggen.state === 'unresolved_outside_governed_tonggen_scope') {
    return createEvaluation(
      'unresolved_outside_governed_month_branch_tonggen_scope',
      dayMaster.element,
      monthBranch,
      tonggen,
      false,
    );
  }

  return createEvaluation(
    'no_month_branch_bounded_tonggen_priority_evidence',
    dayMaster.element,
    monthBranch,
    tonggen,
    false,
  );
}

export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'arbitrary_precomputed_tonggen_to_month_provenance',
    'same_branch_value_elsewhere_to_month_provenance',
    'year_day_hour_branch_priority_matcher',
    'any_month_branch_to_root',
    'any_month_branch_root_to_tonggen',
    'generic_tonggen_to_month_priority',
    'month_branch_tonggen_to_global_strongest_root',
    'month_branch_position_to_numeric_multiplier',
    'month_branch_position_to_nonnumeric_strength_scalar',
    'month_branch_tonggen_to_dang_zhong',
    'month_branch_tonggen_to_qiang',
    'month_branch_tonggen_to_bu_ruo',
    'bounded_tonggen_to_sizhu_has_root',
    'month_branch_tonggen_to_final_qiang_ruo',
    'month_branch_tonggen_to_final_wang_shuai',
    'month_branch_tonggen_to_geju_candidate',
    'month_branch_tonggen_to_geju_establishment',
    'month_branch_tonggen_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  lightRootVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  lightRootDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  boundedTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  boundedTonggenDefinitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  monthBranchPriorityVersion: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION,
  monthBranchPriorityDefinitionHash: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH,
});

export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_VERSION,
        scope: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SCOPE,
        decision: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DECISION,
        source: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SOURCE,
        sourceText: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SOURCE_TEXT,
        upstream,
        upstreamObservationDecision: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_AUTHORITY.decision,
        canonicalInput: Object.freeze({
          dayMasterElement: true,
          monthBranch: true,
          arbitraryPrecomputedTonggenEvaluation: false,
        }),
        unauthorizedDerivations:
          GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_VERSION,
  definitionHash:
    GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DEFINITION_HASH,
  decision: GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DECISION,
  upstreamLightRootVersion: upstream.lightRootVersion,
  upstreamLightRootDefinitionHash: upstream.lightRootDefinitionHash,
  upstreamBoundedTonggenVersion: upstream.boundedTonggenVersion,
  upstreamBoundedTonggenDefinitionHash: upstream.boundedTonggenDefinitionHash,
  upstreamMonthBranchPriorityVersion: upstream.monthBranchPriorityVersion,
  upstreamMonthBranchPriorityDefinitionHash: upstream.monthBranchPriorityDefinitionHash,
  canonicalDayMasterElementAvailable: true,
  canonicalMonthBranchAvailable: true,
  arbitraryPrecomputedTonggenEvaluationAccepted: false,
  directSourceMonthBranchTonggenPriorityObserved: true,
  boundedMonthBranchTonggenPriorityContextAuthorizedResearchOnly: true,
  yearDayHourPriorityMatcherAuthorized: false,
  canonicalMonthBranchRootPriorityEvaluatorAuthorized: false,
  generalizedRootPositionRankingAuthorized: false,
  numericRootPositionWeightAuthorized: false,
  nonNumericRootPositionScalarAuthorized: false,
  canonicalTonggenResolverAuthorized: false,
  canonicalSizhuHasRootResolverAuthorized: false,
  monthBranchTonggenToDangZhongAuthorized: false,
  monthBranchTonggenToQiangAuthorized: false,
  monthBranchTonggenToBuRuoAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'This research-only bridge starts from the explicitly supplied canonical month-branch value, reuses the governed non-Earth 墓庫/餘氣 root matcher and bounded-Tonggen binder, and records only that a positive bounded Tonggen occurs in the selected source priority context 月令之支. It does not accept an arbitrary precomputed Tonggen evaluation as pillar provenance, compare roots across pillars, assign numeric or non-numeric weight, establish a generalized Tonggen or 四柱有根 resolver, settle 黨眾/強/不弱/final 強弱/旺衰, derive Gyeokguk, or emit Production facts.',
});
