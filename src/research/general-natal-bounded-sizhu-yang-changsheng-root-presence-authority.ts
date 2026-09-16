import { createHash } from 'node:crypto';
import type { EarthlyBranch, PillarSlot, StemFact } from '../contracts/calculation.js';
import {
  evaluateBoundedSizhuRootPresenceEvidence,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION,
  type BoundedSizhuRootPresenceObservation,
  type ResolvedPillarBranchEvidenceInput,
} from './general-natal-bounded-sizhu-root-presence-evidence-authority.js';
import {
  evaluateChangshengHeavyRootClause,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
} from './general-natal-changsheng-root-weight-binding-authority.js';

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SCOPE =
  'governed_yang_changsheng_to_bounded_sizhu_root_presence_evidence' as const;
export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE =
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十幹得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-09-17',
    sourceType: 'classical_transcription_with_commentary',
  });

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'changsheng_heavy_root_semantic',
      observation: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也。',
      authority: 'direct_selected_source_semantic' as const,
    }),
    Object.freeze({
      id: 'yin_changsheng_exception',
      observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣。',
      authority: 'direct_selected_source_exception' as const,
    }),
  ] as const);

export type BoundedSizhuYangChangshengRootPresenceState =
  | 'bounded_positive_root_presence_for_sizhu_context_observed'
  | 'no_bounded_root_presence_evidence';

export interface BoundedSizhuYangChangshengObservation {
  readonly pillarSlot: PillarSlot;
  readonly branch: EarthlyBranch;
  readonly sourceRootKind: '長生';
  readonly upstreamState: 'established';
  readonly authority: 'research_only';
}

export type BoundedSizhuRootPresenceWithYangChangshengObservation =
  | BoundedSizhuRootPresenceObservation
  | BoundedSizhuYangChangshengObservation;

export interface BoundedSizhuYangChangshengRootPresenceEvaluation {
  readonly state: BoundedSizhuYangChangshengRootPresenceState;
  readonly dayMasterValue: StemFact['value'];
  readonly dayMasterYinYang: StemFact['yinYang'];
  readonly element: StemFact['element'];
  readonly observations: readonly BoundedSizhuRootPresenceWithYangChangshengObservation[];
  readonly rootPresenceObserved: boolean;
  readonly yangChangshengEvidenceObserved: boolean;
  readonly sizhuHasRootSettled: false;
  readonly absenceMeansNoRoot: false;
  readonly observationCountSemanticsAssigned: false;
  readonly positionWeightAssigned: false;
  readonly authority: 'research_only';
}

export function evaluateBoundedSizhuYangChangshengRootPresenceEvidence(
  dayMaster: Pick<StemFact, 'value' | 'yinYang' | 'element'>,
  resolvedPillarBranches: ResolvedPillarBranchEvidenceInput,
): BoundedSizhuYangChangshengRootPresenceEvaluation {
  const baseEvaluation = evaluateBoundedSizhuRootPresenceEvidence(
    dayMaster,
    resolvedPillarBranches,
  );
  const observations: BoundedSizhuRootPresenceWithYangChangshengObservation[] = [];
  let yangChangshengEvidenceObserved = false;

  for (const pillarSlot of GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_PILLAR_ORDER) {
    for (const baseObservation of baseEvaluation.observations) {
      if (baseObservation.pillarSlot === pillarSlot) {
        observations.push(baseObservation);
      }
    }

    const branch = resolvedPillarBranches[pillarSlot];
    if (branch === undefined) {
      continue;
    }

    const changsheng = evaluateChangshengHeavyRootClause(dayMaster, branch);
    if (changsheng.heavyRootByChangshengClause === 'established') {
      observations.push(
        Object.freeze({
          pillarSlot,
          branch,
          sourceRootKind: '長生' as const,
          upstreamState: changsheng.heavyRootByChangshengClause,
          authority: 'research_only' as const,
        }),
      );
      yangChangshengEvidenceObserved = true;
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
    yangChangshengEvidenceObserved,
    sizhuHasRootSettled: false,
    absenceMeansNoRoot: false,
    observationCountSemanticsAssigned: false,
    positionWeightAssigned: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalDayMasterValueAvailable: true,
    canonicalDayMasterYinYangAvailable: true,
    canonicalDayMasterElementAvailable: true,
    canonicalPillarSlotAvailable: true,
    canonicalResolvedPillarBranchAvailable: true,
    partialResolvedPillarInputAllowed: true,
    arbitraryPrecomputedChangshengEvaluationAccepted: false,
    baseBoundedRootPresenceEvaluationReused: true,
    genericTwelveGrowthStageInputAccepted: false,
    luEvaluationConsumed: false,
    status: 'REPRESENTABLE_AS_BOUNDED_POSITIVE_EVIDENCE_ONLY' as const,
  });

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'yin_changsheng_exclusion_to_positive_root_presence',
    'yin_changsheng_to_light_root',
    'yin_changsheng_to_no_root',
    'yin_changsheng_to_yuqi',
    'yin_changsheng_minggen_to_executable_root_classifier',
    'generic_twelve_growth_stage_to_root_presence',
    'lu_to_sizhu_root_presence_in_this_scope',
    'root_evidence_to_sizhu_has_root_settlement',
    'no_bounded_evidence_to_sizhu_no_root',
    'missing_pillar_to_negative_root_evidence',
    'arbitrary_precomputed_changsheng_to_pillar_provenance',
    'root_observation_count_to_strength',
    'pillar_position_to_numeric_root_weight',
    'pillar_position_to_nonnumeric_root_weight',
    'month_changsheng_to_automatic_strongest_root',
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
  boundedRootPresenceVersion: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_VERSION,
  boundedRootPresenceDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_DEFINITION_HASH,
  changshengVersion: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
  changshengDefinitionHash: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
});

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION,
        scope: GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SCOPE,
        decision: GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DECISION,
        source: GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE,
        sourceObservations:
          GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
        representability:
          GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_CANONICAL_REPRESENTABILITY,
        upstream,
        upstreamBaseDecision: GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_AUTHORITY.decision,
        upstreamYangChangshengAuthorized:
          GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
            .yangChangshengHeavyRootPredicateAuthorizedResearchOnly,
        upstreamYinChangshengMinggenClassifierAuthorized:
          GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
            .yinChangshengMinggenClassifierAuthorized,
        sizhuHasRootSettled: false,
        absenceMeansNoRoot: false,
        observationCountSemanticsAssigned: false,
        positionWeightAssigned: false,
        unauthorizedDerivations:
          GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_VERSION,
    definitionHash:
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DEFINITION_HASH,
    decision: GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_DECISION,
    upstreamBoundedRootPresenceVersion: upstream.boundedRootPresenceVersion,
    upstreamBoundedRootPresenceDefinitionHash: upstream.boundedRootPresenceDefinitionHash,
    upstreamChangshengVersion: upstream.changshengVersion,
    upstreamChangshengDefinitionHash: upstream.changshengDefinitionHash,
    directSourceChangshengHeavyRootSemanticObserved: true,
    directSourceYinChangshengExceptionObserved: true,
    inheritedWangMukuYuqiEvidenceReused: true,
    governedYangChangshengToBoundedRootPresenceEvidenceAuthorizedResearchOnly: true,
    canonicalPillarSlotProvenanceRequired: true,
    partialResolvedPillarInputAllowed: true,
    arbitraryPrecomputedChangshengEvaluationAccepted: false,
    yinChangshengToPositiveRootPresenceAuthorized: false,
    yinChangshengMinggenClassifierAuthorized: false,
    yinChangshengToYuqiAuthorized: false,
    genericTwelveGrowthStageToRootPresenceAuthorized: false,
    luToSizhuRootPresenceAuthorizedInThisScope: false,
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
    unauthorizedDerivations:
      GENERAL_NATAL_BOUNDED_SIZHU_YANG_CHANGSHENG_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'Research-only positive-evidence composition. It preserves the already-governed #729 旺/墓庫/餘氣 pillar-provenance evidence and adds only #551 Yang 長生 evaluations whose upstream heavyRootByChangshengClause is established. Yin 長生 excluded_by_yin_exception is not promoted to positive evidence, and the observed 明根 wording remains non-executable because the upstream Minggen classifier is unauthorized. No generic Twelve-Growth-to-root rule, 祿 bridge, 四柱有根 settlement, negative no-root inference, count/position weighting, 黨眾/助寡, 強/不弱, final 強弱/旺衰, Gyeokguk, Production, SKU, or Commerce authority is created.',
  });
