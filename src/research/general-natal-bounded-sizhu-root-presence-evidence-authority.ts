import { createHash } from 'node:crypto';
import type { EarthlyBranch, PillarSlot, StemFact } from '../contracts/calculation.js';
import {
  evaluateCompleteWangHeavyRoot,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
} from './general-natal-earth-wang-heavy-root-completion-authority.js';
import {
  evaluateMukuYuqiLightRoot,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from './general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE_TEXT,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
} from './general-natal-sizhu-has-root-capacity-observation-authority.js';

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SCOPE =
  'bounded_positive_root_presence_for_sizhu_has_root_context_evidence' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十幹得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE_ROOT_CLASS_TEXT =
  '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。' as const;

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CONSUMED_ROOT_CLASSES = Object.freeze([
  '旺',
  '墓庫',
  '餘氣',
] as const);

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNCONSUMED_ROOT_CLASSES = Object.freeze([
  '長生',
  '祿',
] as const);

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER = Object.freeze([
  'year',
  'month',
  'day',
  'hour',
] as const satisfies readonly PillarSlot[]);

export type BoundedSizhuRootPresenceState =
  | 'bounded_positive_root_presence_for_sizhu_context_observed'
  | 'no_bounded_root_presence_evidence';

export type BoundedSizhuSourceRootKind = '旺' | '墓庫' | '餘氣';
export type BoundedSizhuUpstreamRootState =
  | 'wang_heavy_root_established'
  | 'muku_light_root_established'
  | 'yuqi_light_root_established';

export type ResolvedPillarBranchEvidenceInput = Readonly<
  Partial<Record<PillarSlot, EarthlyBranch>>
>;

export interface BoundedSizhuRootPresenceObservation {
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly sourceRootKind: BoundedSizhuSourceRootKind;
  readonly upstreamState: BoundedSizhuUpstreamRootState;
  readonly authority: 'research_only';
}

export interface BoundedSizhuRootPresenceEvaluation {
  readonly state: BoundedSizhuRootPresenceState;
  readonly element: StemFact['element'];
  readonly observations: readonly BoundedSizhuRootPresenceObservation[];
  readonly rootPresenceObserved: boolean;
  readonly sizhuHasRootSettled: false;
  readonly absenceMeansNoRoot: false;
  readonly observationCountSemanticsAssigned: false;
  readonly positionWeightAssigned: false;
  readonly authority: 'research_only';
}

export function evaluateBoundedSizhuRootPresenceEvidence(
  dayMaster: Pick<StemFact, 'element'>,
  resolvedPillarBranches: ResolvedPillarBranchEvidenceInput,
): BoundedSizhuRootPresenceEvaluation {
  const observations: BoundedSizhuRootPresenceObservation[] = [];

  for (const pillarSlot of GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER) {
    const branch = resolvedPillarBranches[pillarSlot];
    if (branch === undefined) {
      continue;
    }

    const wang = evaluateCompleteWangHeavyRoot(dayMaster, branch);
    if (wang.heavyRootState === 'wang_heavy_root_established') {
      observations.push(
        Object.freeze({
          pillarSlot,
          branch,
          sourceRootKind: '旺' as const,
          upstreamState: wang.heavyRootState,
          authority: 'research_only' as const,
        }),
      );
      continue;
    }

    const lightRoot = evaluateMukuYuqiLightRoot(dayMaster, branch);
    if (lightRoot.lightRootState === 'muku_light_root_established') {
      observations.push(
        Object.freeze({
          pillarSlot,
          branch,
          sourceRootKind: '墓庫' as const,
          upstreamState: lightRoot.lightRootState,
          authority: 'research_only' as const,
        }),
      );
      continue;
    }

    if (lightRoot.lightRootState === 'yuqi_light_root_established') {
      observations.push(
        Object.freeze({
          pillarSlot,
          branch,
          sourceRootKind: '餘氣' as const,
          upstreamState: lightRoot.lightRootState,
          authority: 'research_only' as const,
        }),
      );
    }
  }

  const frozenObservations = Object.freeze(observations);
  const rootPresenceObserved = frozenObservations.length > 0;

  return Object.freeze({
    state: rootPresenceObserved
      ? 'bounded_positive_root_presence_for_sizhu_context_observed'
      : 'no_bounded_root_presence_evidence',
    element: dayMaster.element,
    observations: frozenObservations,
    rootPresenceObserved,
    sizhuHasRootSettled: false,
    absenceMeansNoRoot: false,
    observationCountSemanticsAssigned: false,
    positionWeightAssigned: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalDayMasterElementAvailable: true,
    canonicalPillarSlotAvailable: true,
    canonicalResolvedPillarBranchAvailable: true,
    partialResolvedPillarInputAllowed: true,
    arbitraryPrecomputedRootEvaluationAccepted: false,
    boundedTonggenEvaluationConsumed: false,
    hiddenStemFactsConsumed: false,
    twelveGrowthFactsConsumed: false,
    status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY' as const,
  });

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'root_evidence_to_sizhu_has_root_settlement',
    'no_bounded_evidence_to_sizhu_no_root',
    'missing_pillar_to_negative_root_evidence',
    'arbitrary_precomputed_root_to_pillar_provenance',
    'bounded_tonggen_to_sizhu_has_root',
    'hidden_stem_membership_to_sizhu_has_root',
    'twelve_growth_stage_to_sizhu_has_root',
    'changsheng_lu_completion_by_analogy',
    'root_observation_count_to_strength',
    'pillar_position_to_numeric_root_weight',
    'pillar_position_to_nonnumeric_root_weight',
    'month_position_to_automatic_strongest_root',
    'root_evidence_to_dang_zhong',
    'root_evidence_to_zhu_gua',
    'root_evidence_to_qiang',
    'root_evidence_to_bu_ruo',
    'root_evidence_to_final_qiang_ruo',
    'root_evidence_to_final_wang_shuai',
    'root_evidence_to_geju_candidate',
    'root_evidence_to_geju_establishment',
    'root_evidence_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  wangVersion: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
  wangDefinitionHash: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  lightRootVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  lightRootDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  sizhuCapacityVersion: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
  sizhuCapacityDefinitionHash: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
});

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION,
      scope: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SCOPE,
      decision: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DECISION,
      source: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE,
      sizhuContextSourceText: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE_TEXT,
      rootClassSourceText: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_SOURCE_ROOT_CLASS_TEXT,
      consumedRootClasses: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CONSUMED_ROOT_CLASSES,
      unconsumedRootClasses: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNCONSUMED_ROOT_CLASSES,
      pillarOrder: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER,
      representability: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
      upstream,
      sizhuHasRootSettled: false,
      absenceMeansNoRoot: false,
      observationCountSemanticsAssigned: false,
      positionWeightAssigned: false,
      unauthorizedDerivations: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION,
  definitionHash: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  decision: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DECISION,
  upstreamWangVersion: upstream.wangVersion,
  upstreamWangDefinitionHash: upstream.wangDefinitionHash,
  upstreamLightRootVersion: upstream.lightRootVersion,
  upstreamLightRootDefinitionHash: upstream.lightRootDefinitionHash,
  upstreamSizhuCapacityVersion: upstream.sizhuCapacityVersion,
  upstreamSizhuCapacityDefinitionHash: upstream.sizhuCapacityDefinitionHash,
  directSourceSizhuHasRootContextObserved: true,
  directSourceWangMukuYuqiAsRootClassesObserved: true,
  boundedPositiveRootPresenceEvidenceAuthorizedResearchOnly: true,
  canonicalPillarSlotProvenanceRequired: true,
  partialResolvedPillarInputAllowed: true,
  arbitraryPrecomputedRootEvaluationAccepted: false,
  changshengLuConsumed: false,
  canonicalSizhuHasRootResolverAuthorized: false,
  rootEvidenceToSizhuHasRootSettlementAuthorized: false,
  noBoundedEvidenceToSizhuNoRootAuthorized: false,
  boundedTonggenToSizhuHasRootAuthorized: false,
  hiddenStemToSizhuHasRootAuthorized: false,
  twelveGrowthStageToSizhuHasRootAuthorized: false,
  rootObservationCountSemanticsAuthorized: false,
  rootPositionWeightingAuthorized: false,
  dangZhongCounterAuthorized: false,
  zhuGuaCounterAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Research-only positive evidence bridge. It reuses only already-governed 旺 and non-Earth 墓庫/餘氣 positive root matchers while preserving explicit pillar-slot provenance. A positive observation is evidence that a governed root class was observed at a supplied canonical pillar branch; it is not equivalent to and does not settle the complete source condition 四柱有根. Absence of bounded evidence, missing pillar slots, unconsumed 長生/祿, Earth light-root boundaries, Tonggen, hidden stems, and Twelve-Growth facts remain non-negative and unresolved. No count/position weight, 黨眾/助寡, 強/不弱, final 強弱/旺衰, Gyeokguk, Production, SKU, or Commerce authority is created.',
});
