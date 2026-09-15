import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
} from './general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_SCOPE =
  'jiecai_bijie_same_context_terminology_observation' as const;
export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干合而不合',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_SOURCE_TEXT =
  '月令偏財生官，劫財重重，喜得甲己相合，官星之情，專向日主，制住比劫，使不能爭財，所謂用官制劫護財也。' as const;

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'jiecai_heavy_then_bijie_control_same_context',
    sourceText: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_SOURCE_TEXT,
    sourceContextLeadTerm: '劫財重重' as const,
    sourceContextLaterTerm: '比劫' as const,
    sameSentence: true as const,
    sameExample: true as const,
    contextualTerminologyRelationObserved: true as const,
    globalAliasAuthorized: false as const,
    subsetOntologyAuthorized: false as const,
    executableMappingAuthorized: false as const,
  }),
] as const);

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  tenGodFactsConsumed: false,
  stemFactsConsumed: false,
  branchFactsConsumed: false,
  hiddenStemFactsConsumed: false,
  status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
});

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'jiecai_equals_bijie_global_alias',
  'jiecai_subset_of_bijie_global_ontology',
  'canonical_gyeopjae_to_source_bijie_mapping',
  'canonical_gyeopjae_to_dang_zhong_support_constituent',
  'bijian_plus_jiecai_count',
  'jiecai_count_to_dang_zhong',
  'jiecai_absence_to_zhu_gua',
  'jiecai_to_qiang',
  'source_context_observation_to_ordinary_strength',
  'source_context_observation_to_numeric_strength',
  'source_context_observation_to_nonnumeric_strength_scalar',
  'source_context_observation_to_geju_candidate',
  'source_context_observation_to_geju_establishment',
  'source_context_observation_to_production_fact',
] as const);

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
      scope: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_SCOPE,
      decision: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DECISION,
      source: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_SOURCE,
      observations: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS,
      representability: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_CANONICAL_REPRESENTABILITY,
      upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
      upstreamJiaYiJiecaiDefinitionHash:
        GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
      upstreamDangZhongContextVersion:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
      upstreamDangZhongContextDefinitionHash:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
      unauthorizedDerivations: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
  definitionHash: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH,
  decision: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DECISION,
  upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
  upstreamJiaYiJiecaiDefinitionHash:
    GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  upstreamDangZhongContextVersion:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  upstreamDangZhongContextDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  sourceObservationCount: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_OBSERVATIONS.length,
  directSourceJiecaiHeavyContextObserved: true,
  directSourceLaterBijieReferenceObserved: true,
  sameContextJiecaiBijieTerminologyRelationAuthorizedObservationOnly: true,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  tenGodFactsConsumed: false,
  stemFactsConsumed: false,
  branchFactsConsumed: false,
  hiddenStemFactsConsumed: false,
  globalJiecaiBijieAliasAuthorized: false,
  jiecaiSubsetOfBijieOntologyAuthorized: false,
  canonicalGyeopjaeToBijieMappingAuthorized: false,
  jiecaiToDangZhongSupportConstituentAuthorized: false,
  jiecaiCounterAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source uses 劫財重重 and later 制住比劫 in the same sentence and the same concrete example. This artifact preserves only that contextual terminology relationship as an immutable observation. It does not establish a global 劫財/比劫 alias, subset ontology, canonical 겁재 mapping, support-constituent matcher, counter, 黨眾/助寡 resolver, final 旺衰/強弱 classifier, strength scalar, Gyeokguk derivation, or production fact.',
});
