import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
} from './general-natal-changsheng-root-weight-binding-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
} from './general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';

export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_SCOPE =
  'yin_changsheng_minggen_source_strata_conflict_review' as const;
export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DECISION =
  'UNRESOLVED' as const;

export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_SOURCE =
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十幹得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-09-17',
    sourceType: 'classical_transcription_with_commentary',
  });

export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA = Object.freeze([
  Object.freeze({
    id: 'classical_yin_changsheng_minggen_statement',
    stratum: 'classical_root_clause' as const,
    observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣。',
    semanticDisposition: 'asserts_minggen_while_excluding_heavy_changsheng_treatment' as const,
  }),
  Object.freeze({
    id: 'commentary_yin_changsheng_root_objection',
    stratum: 'commentary' as const,
    observation:
      '至於陰長生，既雲不作此論，又雲亦為有根，可比一餘氣云云，實未明生旺墓絕之理，不免矛盾。木至午，火至酉，皆為死地，豈得為根？',
    semanticDisposition: 'explicitly_objects_to_the_preceding_root_claim' as const,
  }),
] as const);

export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'classical_minggen_statement_to_executable_positive_root_presence',
    'commentary_root_objection_to_executable_no_root',
    'yin_changsheng_to_light_root',
    'yin_changsheng_to_heavy_root',
    'yin_changsheng_minggen_to_complete_root_classifier',
    'yin_changsheng_yuqi_comparison_to_yuqi_equivalence',
    'yin_changsheng_to_bounded_sizhu_positive_root_presence',
    'source_stratum_precedence_by_chronology',
    'source_stratum_precedence_by_authorship',
    'source_stratum_precedence_by_editorial_preference',
    'root_evidence_to_sizhu_has_root_settlement',
    'no_bounded_evidence_to_sizhu_no_root',
    'root_observation_count_to_strength',
    'pillar_position_to_numeric_root_weight',
    'pillar_position_to_nonnumeric_root_weight',
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
  changshengVersion: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
  changshengDefinitionHash: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  boundedSizhuVersion: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
  boundedSizhuDefinitionHash:
    GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
});

export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
        scope: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_SCOPE,
        decision: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DECISION,
        source: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_SOURCE,
        sourceStrata: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA,
        upstream,
        upstreamYinChangshengMinggenSemanticObserved:
          GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
            .yinChangshengMinggenSemanticObserved,
        upstreamYinChangshengMinggenClassifierAuthorized:
          GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
            .yinChangshengMinggenClassifierAuthorized,
        upstreamYinChangshengYuqiEquivalenceAuthorized:
          GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
            .yinChangshengYuqiEquivalenceAuthorized,
        upstreamCanonicalSizhuHasRootResolverAuthorized:
          GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_AUTHORITY
            .canonicalSizhuHasRootResolverAuthorized,
        sourceStrataConflictObserved: true,
        sourceStrataPrecedenceRuleAvailable: false,
        yinChangshengPositiveRootPresenceAuthorized: false,
        yinChangshengNoRootAuthorized: false,
        yinChangshengToBoundedSizhuRootPresenceAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
    definitionHash: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
    decision: GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DECISION,
    upstreamChangshengVersion: upstream.changshengVersion,
    upstreamChangshengDefinitionHash: upstream.changshengDefinitionHash,
    upstreamBoundedSizhuVersion: upstream.boundedSizhuVersion,
    upstreamBoundedSizhuDefinitionHash: upstream.boundedSizhuDefinitionHash,
    classicalYinChangshengMinggenStatementObserved: true,
    classicalYinChangshengYuqiComparisonObserved: true,
    commentaryYinChangshengRootObjectionObserved: true,
    sourceStrataConflictObserved: true,
    sourceStrataPrecedenceRuleAvailable: false,
    sourceStrataResolutionState: 'UNRESOLVED' as const,
    upstreamYinChangshengHeavyRootExclusionAuthorizedResearchOnly:
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
        .yinChangshengHeavyRootExclusionAuthorizedResearchOnly,
    upstreamYinChangshengMinggenSemanticObserved:
      GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
        .yinChangshengMinggenSemanticObserved,
    yinChangshengMinggenClassifierAuthorized: false,
    yinChangshengYuqiEquivalenceAuthorized: false,
    yinChangshengPositiveRootPresenceAuthorized: false,
    yinChangshengNoRootAuthorized: false,
    yinChangshengToBoundedSizhuRootPresenceAuthorized: false,
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
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'Research-only source-strata conflict review. The classical/root-clause stratum says Yin 長生 is excluded from the heavy 長生 treatment yet is still 明根 and comparable to one 餘氣; the immediately following commentary explicitly disputes that root claim as contradictory. No governed source-strata precedence rule exists, so neither positive-root nor no-root execution is authorized. The existing #551 heavy-root exclusion remains valid, while 明根 classification, 餘氣 equivalence, bounded 四柱 positive-root promotion, 四柱有根 settlement, weighting, strength, Gyeokguk, Production, SKU, and Commerce remain fail-closed.',
  });
