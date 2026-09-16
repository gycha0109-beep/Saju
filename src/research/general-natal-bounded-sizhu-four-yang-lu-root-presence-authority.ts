import { createHash } from 'node:crypto';
import type { EarthlyBranch, PillarSlot, StemFact } from '../contracts/calculation.js';
import {
  evaluateBoundedSizhuYangChangshengRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION,
  type BoundedSizhuRootPresenceWithYangChangshengObservation,
} from './general-natal-bounded-sizhu-yang-changsheng-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER,
  type ResolvedPillarBranchEvidenceInput,
} from './general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  evaluateFourYangLuHeavyRoot,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
} from './general-natal-four-yang-lu-heavy-root-authority.js';

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SCOPE =
  'governed_four_yang_lu_to_bounded_sizhu_root_presence_evidence' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十幹得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'lu_heavy_root_semantic',
      observation: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。',
      authority: 'direct_selected_source_semantic' as const,
    }),
    Object.freeze({
      id: 'lu_in_bounded_changsheng_lu_ren_operand',
      observation: '得三比肩，不如得一長生祿刃，如甲逢亥子寅卯之類。',
      authority: 'direct_selected_source_bounded_comparison' as const,
    }),
  ] as const);

export type BoundedSizhuFourYangLuRootPresenceState =
  | 'bounded_positive_root_presence_for_sizhu_context_observed'
  | 'no_bounded_root_presence_evidence';

export interface BoundedSizhuFourYangLuObservation {
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly sourceRootKind: '祿';
  readonly upstreamState: 'lu_heavy_root_established';
  readonly authority: 'research_only';
}

export type BoundedSizhuRootPresenceWithFourYangLuObservation =
  | BoundedSizhuRootPresenceWithYangChangshengObservation
  | BoundedSizhuFourYangLuObservation;

export interface BoundedSizhuFourYangLuRootPresenceEvaluation {
  readonly state: BoundedSizhuFourYangLuRootPresenceState;
  readonly dayMasterValue: StemFact['value'];
  readonly dayMasterYinYang: StemFact['yinYang'];
  readonly element: StemFact['element'];
  readonly observations: readonly BoundedSizhuRootPresenceWithFourYangLuObservation[];
  readonly rootPresenceObserved: boolean;
  readonly yangChangshengEvidenceObserved: boolean;
  readonly fourYangLuEvidenceObserved: boolean;
  readonly sizhuHasRootSettled: false;
  readonly absenceMeansNoRoot: false;
  readonly observationCountSemanticsAssigned: false;
  readonly positionWeightAssigned: false;
  readonly authority: 'research_only';
}

export function evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
  dayMaster: Pick<StemFact, 'value' | 'yinYang' | 'element'>,
  resolvedPillarBranches: ResolvedPillarBranchEvidenceInput,
): BoundedSizhuFourYangLuRootPresenceEvaluation {
  const upstreamEvaluation = evaluateBoundedSizhuYangChangshengRootPresenceEvidence(
    dayMaster,
    resolvedPillarBranches,
  );
  const observations: BoundedSizhuRootPresenceWithFourYangLuObservation[] = [];
  let fourYangLuEvidenceObserved = false;

  for (const pillarSlot of GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER) {
    for (const upstreamObservation of upstreamEvaluation.observations) {
      if (upstreamObservation.pillarSlot === pillarSlot) {
        observations.push(upstreamObservation);
      }
    }

    const branch = resolvedPillarBranches[pillarSlot];
    if (branch === undefined) {
      continue;
    }

    const lu = evaluateFourYangLuHeavyRoot(dayMaster, branch);
    if (lu.heavyRootState === 'lu_heavy_root_established') {
      observations.push(
        Object.freeze({
          pillarSlot,
          branch,
          sourceRootKind: '祿' as const,
          upstreamState: lu.heavyRootState,
          authority: 'research_only' as const,
        }),
      );
      fourYangLuEvidenceObserved = true;
    }
  }

  const frozenObservations = Object.freeze(observations);
  const rootPresenceObserved = frozenObservations.length > 0;

  return Object.freeze({
    state: rootPresenceObserved
      ? 'bounded_positive_root_presence_for_sizhu_context_observed'
      : 'no_bounded_root_presence_evidence',
    dayMasterValue: dayMaster.value,
    dayMasterYinYang: dayMaster.yinYang,
    element: dayMaster.element,
    observations: frozenObservations,
    rootPresenceObserved,
    yangChangshengEvidenceObserved: upstreamEvaluation.yangChangshengEvidenceObserved,
    fourYangLuEvidenceObserved,
    sizhuHasRootSettled: false,
    absenceMeansNoRoot: false,
    observationCountSemanticsAssigned: false,
    positionWeightAssigned: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalDayMasterValueAvailable: true,
    canonicalDayMasterYinYangAvailable: true,
    canonicalDayMasterElementAvailable: true,
    canonicalPillarSlotAvailable: true,
    canonicalResolvedPillarBranchAvailable: true,
    partialResolvedPillarInputAllowed: true,
    arbitraryPrecomputedLuEvaluationAccepted: false,
    upstreamYangChangshengAggregateReused: true,
    upstreamFourYangLuEvaluationConsumed: true,
    localLuRediscoveryAuthorized: false,
    yinLuAmbiguityResolved: false,
    earthLuAttachmentSelected: false,
    genericTwelveGrowthStageInputAccepted: false,
    status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY' as const,
  });

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'yin_stem_outside_governed_lu_scope_to_no_lu',
    'yin_stem_outside_governed_lu_scope_to_no_root',
    'earth_stem_outside_governed_lu_scope_to_no_lu',
    'earth_stem_outside_governed_lu_scope_to_no_root',
    'same_element_yin_stem_inherits_governed_yang_lu_branch',
    'earth_lu_attachment_selection',
    'source_internal_yin_lu_ambiguity_resolution',
    'generic_twelve_growth_stage_to_lu',
    'hidden_stem_order_to_lu_or_root_class',
    'arbitrary_precomputed_lu_to_pillar_provenance',
    'root_evidence_to_sizhu_has_root_settlement',
    'no_bounded_evidence_to_sizhu_no_root',
    'missing_pillar_to_negative_root_evidence',
    'root_observation_count_to_strength',
    'pillar_position_to_numeric_root_weight',
    'pillar_position_to_nonnumeric_root_weight',
    'month_lu_to_automatic_strongest_root',
    'root_evidence_to_dang_zhong',
    'root_evidence_to_zhu_gua',
    'root_evidence_to_qiang',
    'root_evidence_to_bu_ruo',
    'root_evidence_to_final_qiang_ruo',
    'root_evidence_to_final_wang_shuai',
    'lu_evidence_to_three_peer_comparison_execution',
    'lu_evidence_to_transitive_root_ranking',
    'lu_evidence_to_global_root_ranking',
    'root_evidence_to_geju_candidate',
    'root_evidence_to_geju_establishment',
    'root_evidence_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  boundedYangChangshengVersion:
    GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION,
  boundedYangChangshengDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
  fourYangLuVersion: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
  fourYangLuDefinitionHash: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
});

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
        scope: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SCOPE,
        decision: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DECISION,
        source: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE,
        sourceObservations:
          GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
        representability:
          GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
        upstream,
        upstreamAggregateDecision:
          GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_AUTHORITY.decision,
        upstreamFourYangLuAuthorized:
          GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY
            .fourNonEarthYangStemLuMatcherAuthorizedResearchOnly,
        upstreamSourceInternalYinLuInterpretation:
          GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.sourceInternalYinLuInterpretation,
        sizhuHasRootSettled: false,
        absenceMeansNoRoot: false,
        observationCountSemanticsAssigned: false,
        positionWeightAssigned: false,
        unauthorizedDerivations:
          GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  definitionHash: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  decision: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DECISION,
  upstreamBoundedYangChangshengVersion: upstream.boundedYangChangshengVersion,
  upstreamBoundedYangChangshengDefinitionHash: upstream.boundedYangChangshengDefinitionHash,
  upstreamFourYangLuVersion: upstream.fourYangLuVersion,
  upstreamFourYangLuDefinitionHash: upstream.fourYangLuDefinitionHash,
  directSourceLuHeavyRootSemanticObserved: true,
  directSourceLuInChangshengLuRenBoundedOperandObserved: true,
  inheritedWangMukuYuqiYangChangshengEvidenceReused: true,
  governedFourYangLuToBoundedRootPresenceEvidenceAuthorizedResearchOnly: true,
  canonicalPillarSlotProvenanceRequired: true,
  partialResolvedPillarInputAllowed: true,
  arbitraryPrecomputedLuEvaluationAccepted: false,
  localLuRediscoveryAuthorized: false,
  yinStemLuMatcherAuthorized: false,
  earthStemLuMatcherAuthorized: false,
  sourceInternalYinLuInterpretation:
    GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.sourceInternalYinLuInterpretation,
  sourceInternalYinLuAmbiguityPreserved: true,
  earthLuAttachmentSelectionAuthorized: false,
  genericTwelveGrowthStageToLuAuthorized: false,
  hiddenStemDataConsumed: false,
  canonicalSizhuHasRootResolverAuthorized: false,
  rootEvidenceToSizhuHasRootSettlementAuthorized: false,
  noBoundedEvidenceToSizhuNoRootAuthorized: false,
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
  threePeerComparisonExecutionAuthorized: false,
  transitiveClosureAuthorized: false,
  generalizedGlobalRootRankingAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Research-only positive-evidence composition. It reuses the merged #734 旺/墓庫/餘氣/governed-Yang-長生 PillarSlot evidence surface and adds only #590 evaluations whose heavyRootState is lu_heavy_root_established for the four governed non-Earth Yang stems 甲-寅, 丙-巳, 庚-申, and 壬-亥. Governed Yang mismatches add no 祿 positive; Yin stems and Earth stems remain outside governed Lu scope and are never converted to negative or no-root evidence. The selected-source Yin-Lu ambiguity and Earth-Lu attachment remain unresolved. No raw Lu rediscovery, generic Twelve-Growth-to-Lu rule, hidden-stem derivation, 四柱有根 settlement, negative no-root inference, count/position weighting, peer-comparison execution, strength, Gyeokguk, Production, SKU, or Commerce authority is created.',
});
