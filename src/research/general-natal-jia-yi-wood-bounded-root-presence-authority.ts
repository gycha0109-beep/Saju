import { createHash } from 'node:crypto';
import type { EarthlyBranch, PillarSlot, StemFact } from '../contracts/calculation.js';
import {
  evaluateBoundedSizhuFourYangLuRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  type BoundedSizhuRootPresenceWithFourYangLuObservation,
} from './general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER,
  type ResolvedPillarBranchEvidenceInput,
} from './general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
} from './general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
} from './general-natal-root-term-binding-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION,
} from './general-natal-bounded-sizhu-root-presence-completeness-authority-review.js';

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SCOPE =
  'selected_source_jia_yi_wood_explicit_bounded_root_presence_set' as const;
export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論陰陽生死',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'root_classes_context',
      observation: '天干通根，不僅祿旺為美，長生、餘氣、墓庫皆其根也。',
      authority: 'direct_selected_source_root_context' as const,
    }),
    Object.freeze({
      id: 'jia_yi_wood_explicit_root_set',
      observation: '如甲乙木見寅卯，固為身旺，而見亥辰未，亦為有根也。',
      authority: 'direct_selected_source_stem_group_branch_set' as const,
    }),
  ] as const);

export type JiaYiWoodExplicitRootBranch = '인' | '묘' | '해' | '진' | '미';
export type JiaYiWoodSourceDisposition =
  | 'source_describes_shen_wang'
  | 'source_describes_you_gen';

export const GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION = Object.freeze({
  인: 'source_describes_shen_wang',
  묘: 'source_describes_shen_wang',
  해: 'source_describes_you_gen',
  진: 'source_describes_you_gen',
  미: 'source_describes_you_gen',
} as const satisfies Readonly<Record<JiaYiWoodExplicitRootBranch, JiaYiWoodSourceDisposition>>);

export interface JiaYiWoodBoundedRootPresenceObservation {
  readonly pillarSlot: PillarSlot;
  readonly branch: JiaYiWoodExplicitRootBranch;
  readonly sourceRootKind: 'selected_source_explicit_wood_root_presence';
  readonly sourceStemScope: '甲乙木';
  readonly sourceDisposition: JiaYiWoodSourceDisposition;
  readonly authority: 'research_only';
}

export type BoundedSizhuRootPresenceWithJiaYiWoodObservation =
  | BoundedSizhuRootPresenceWithFourYangLuObservation
  | JiaYiWoodBoundedRootPresenceObservation;

export type JiaYiWoodBoundedRootPresenceState =
  | 'bounded_positive_root_presence_for_sizhu_context_observed'
  | 'no_bounded_root_presence_evidence';

export interface JiaYiWoodBoundedRootPresenceEvaluation {
  readonly state: JiaYiWoodBoundedRootPresenceState;
  readonly dayMasterValue: StemFact['value'];
  readonly dayMasterYinYang: StemFact['yinYang'];
  readonly element: StemFact['element'];
  readonly observations: readonly BoundedSizhuRootPresenceWithJiaYiWoodObservation[];
  readonly rootPresenceObserved: boolean;
  readonly upstreamBoundedEvidenceObserved: boolean;
  readonly jiaYiWoodEvidenceObserved: boolean;
  readonly yiYinPositiveObservedWithoutLuClassAssignment: boolean;
  readonly yiHaiPositiveObservedWithoutChangshengClassAssignment: boolean;
  readonly sizhuHasRootSettled: false;
  readonly absenceMeansNoRoot: false;
  readonly observationCountSemanticsAssigned: false;
  readonly positionWeightAssigned: false;
  readonly authority: 'research_only';
}

function isJiaYiWoodStem(value: StemFact['value']): value is '갑' | '을' {
  return value === '갑' || value === '을';
}

function isJiaYiWoodExplicitRootBranch(
  branch: EarthlyBranch,
): branch is JiaYiWoodExplicitRootBranch {
  return Object.prototype.hasOwnProperty.call(
    GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION,
    branch,
  );
}

export function evaluateJiaYiWoodBoundedRootPresenceEvidence(
  dayMaster: Pick<StemFact, 'value' | 'yinYang' | 'element'>,
  resolvedPillarBranches: ResolvedPillarBranchEvidenceInput,
): JiaYiWoodBoundedRootPresenceEvaluation {
  const upstreamEvaluation = evaluateBoundedSizhuFourYangLuRootPresenceEvidence(
    dayMaster,
    resolvedPillarBranches,
  );

  const observations: BoundedSizhuRootPresenceWithJiaYiWoodObservation[] = [];
  let jiaYiWoodEvidenceObserved = false;
  let yiYinPositiveObservedWithoutLuClassAssignment = false;
  let yiHaiPositiveObservedWithoutChangshengClassAssignment = false;

  for (const pillarSlot of GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER) {
    for (const upstreamObservation of upstreamEvaluation.observations) {
      if (upstreamObservation.pillarSlot === pillarSlot) {
        observations.push(upstreamObservation);
      }
    }

    const branch = resolvedPillarBranches[pillarSlot];
    if (
      branch === undefined ||
      !isJiaYiWoodStem(dayMaster.value) ||
      !isJiaYiWoodExplicitRootBranch(branch)
    ) {
      continue;
    }

    const sourceDisposition =
      GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION[branch];

    observations.push(
      Object.freeze({
        pillarSlot,
        branch,
        sourceRootKind: 'selected_source_explicit_wood_root_presence' as const,
        sourceStemScope: '甲乙木' as const,
        sourceDisposition,
        authority: 'research_only' as const,
      }),
    );

    jiaYiWoodEvidenceObserved = true;
    if (dayMaster.value === '을' && branch === '인') {
      yiYinPositiveObservedWithoutLuClassAssignment = true;
    }
    if (dayMaster.value === '을' && branch === '해') {
      yiHaiPositiveObservedWithoutChangshengClassAssignment = true;
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
    upstreamBoundedEvidenceObserved: upstreamEvaluation.rootPresenceObserved,
    jiaYiWoodEvidenceObserved,
    yiYinPositiveObservedWithoutLuClassAssignment,
    yiHaiPositiveObservedWithoutChangshengClassAssignment,
    sizhuHasRootSettled: false,
    absenceMeansNoRoot: false,
    observationCountSemanticsAssigned: false,
    positionWeightAssigned: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalDayMasterValueAvailable: true,
    canonicalPillarSlotAvailable: true,
    canonicalResolvedPillarBranchAvailable: true,
    partialResolvedPillarInputAllowed: true,
    upstreamBoundedPositiveSurfaceReused: true,
    arbitraryPrecomputedRootEvaluationAccepted: false,
    hiddenStemOrderConsumed: false,
    foreignTwelveGrowthMappingConsumed: false,
    localLuClassifierConsumed: false,
    localChangshengClassifierConsumed: false,
    status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY' as const,
  });

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'yi_yin_to_yi_lu',
    'yi_hai_to_yi_changsheng',
    'same_element_yin_stem_inherits_governed_yang_lu_class',
    'same_element_yin_stem_inherits_governed_yang_changsheng_class',
    'wood_shen_wang_source_phrase_to_final_chart_wang',
    'wood_you_gen_source_phrase_to_canonical_sizhu_has_root_true',
    'single_positive_pillar_to_complete_sizhu_has_root_settlement',
    'zero_wood_set_observations_to_sizhu_no_root',
    'missing_pillar_to_negative_root_evidence',
    'wood_set_to_other_elements_by_analogy',
    'wood_set_to_complete_ten_stem_twelve_branch_root_classifier',
    'wood_set_to_complete_lu_classifier',
    'wood_set_to_complete_changsheng_classifier',
    'root_observation_count_to_strength',
    'pillar_position_to_numeric_root_weight',
    'pillar_position_to_nonnumeric_root_weight',
    'root_presence_to_dang_zhong',
    'root_presence_to_qiang',
    'root_presence_to_bu_ruo',
    'root_presence_to_final_qiang_ruo',
    'root_presence_to_final_wang_shuai',
    'root_presence_to_geju_candidate',
    'root_presence_to_geju_establishment',
    'root_presence_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  boundedSizhuVersion: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  boundedSizhuDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  yinChangshengConflictVersion:
    GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
  yinChangshengConflictDefinitionHash:
    GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
  luLinguanVersion: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
  luLinguanDefinitionHash: GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  completenessReviewVersion:
    GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION,
  completenessReviewDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DEFINITION_HASH,
});

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_VERSION,
        scope: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SCOPE,
        decision: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DECISION,
        source: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE,
        sourceObservations:
          GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
        branchDisposition:
          GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION,
        representability:
          GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
        upstream,
        upstreamCanonicalSizhuHasRootResolverAuthorized:
          GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY
            .canonicalSizhuHasRootResolverAuthorized,
        upstreamYinChangshengResolutionState:
          GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
            .sourceStrataResolutionState,
        upstreamYinLuInterpretation:
          GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
        upstreamSurfaceCompleteForCanonicalSettlement:
          GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_AUTHORITY
            .boundedRootPresenceSurfaceCompleteForCanonicalSettlement,
        yiYinLuClassAssigned: false,
        yiHaiChangshengClassAssigned: false,
        sizhuHasRootSettled: false,
        absenceMeansNoRoot: false,
        observationCountSemanticsAssigned: false,
        positionWeightAssigned: false,
        unauthorizedDerivations:
          GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_VERSION,
  definitionHash: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DEFINITION_HASH,
  decision: GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DECISION,
  upstreamBoundedSizhuVersion: upstream.boundedSizhuVersion,
  upstreamBoundedSizhuDefinitionHash: upstream.boundedSizhuDefinitionHash,
  upstreamYinChangshengConflictVersion: upstream.yinChangshengConflictVersion,
  upstreamYinChangshengConflictDefinitionHash:
    upstream.yinChangshengConflictDefinitionHash,
  upstreamLuLinguanVersion: upstream.luLinguanVersion,
  upstreamLuLinguanDefinitionHash: upstream.luLinguanDefinitionHash,
  upstreamCompletenessReviewVersion: upstream.completenessReviewVersion,
  upstreamCompletenessReviewDefinitionHash: upstream.completenessReviewDefinitionHash,
  directSourceRootClassesContextObserved: true,
  directSourceJiaYiWoodRootSetObserved: true,
  directSourceJiaYiYinMaoShenWangObserved: true,
  directSourceJiaYiHaiChenWeiYouGenObserved: true,
  explicitJiaYiWoodRootPresenceSetAuthorizedResearchOnly: true,
  jiaYiWoodSetToBoundedSizhuPositiveEvidenceAuthorizedResearchOnly: true,
  upstreamBoundedPositiveSurfaceReused: true,
  partialResolvedPillarInputAllowed: true,
  arbitraryPrecomputedRootEvaluationAccepted: false,
  yiYinPositiveRootPresenceAuthorizedWithoutLuClassAssignment: true,
  yiHaiPositiveRootPresenceAuthorizedWithoutChangshengClassAssignment: true,
  yiYinLuClassAssigned: false,
  yiHaiChangshengClassAssigned: false,
  sourceInternalYinLuInterpretation:
    GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation,
  yinLuAmbiguityResolved: false,
  yinChangshengSourceStrataResolutionState:
    GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY
      .sourceStrataResolutionState,
  yinChangshengSourceStrataResolved: false,
  foreignTwelveGrowthMappingConsumed: false,
  hiddenStemOrderConsumed: false,
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
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  nextProductionSku: 'NONE' as const,
  commerce: 'HOLD' as const,
  unauthorizedDerivations:
    GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Research-only source-native positive root-presence composition. The selected source directly groups 甲乙木 and states that seeing 寅卯 is 身旺 while seeing 亥辰未 is also 有根. This artifact records those exact Wood-stem/branch positives with PillarSlot provenance and reuses the existing bounded Sizhu positive surface. It intentionally does not classify 乙寅 as 乙祿 or 乙亥 as 乙長生, does not resolve Yin-Lu ambiguity or the Yin-Changsheng source-strata conflict, and does not settle canonical 四柱有根, negative absence, weighting, strength, Gyeokguk, Production, SKU, or Commerce.',
});