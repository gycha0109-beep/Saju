import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_SCOPE =
  'bijie_assistance_without_tonggen_weak_context_observation' as const;
export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_FLOATING_SOURCE_TEXT =
  '比劫如朋友，通根如家室，有比劫之助而不通根，則浮而不實。' as const;
export const GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT =
  '譬如四辛卯，金不通根，四丙申，火不通根，雖天元一氣，仍作弱論。' as const;

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_OBSERVATIONS = Object.freeze([
  Object.freeze({ id: 'bijie_friend_tonggen_household_analogy', sourceText: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_FLOATING_SOURCE_TEXT, observation: '比劫如朋友 / 通根如家室' as const, executablePredicateAuthorized: false as const }),
  Object.freeze({ id: 'bijie_assistance_without_tonggen_floating_context', sourceText: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_FLOATING_SOURCE_TEXT, observation: '有比劫之助而不通根 -> 浮而不實' as const, executablePredicateAuthorized: false as const }),
  Object.freeze({ id: 'four_xin_mao_weak_context', sourceText: GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT, observation: '四辛卯 -> 金不通根 / 仍作弱論' as const, executablePredicateAuthorized: false as const }),
  Object.freeze({ id: 'four_bing_shen_weak_context', sourceText: GENERAL_NATAL_FOUR_XIN_MAO_FOUR_BING_SHEN_WEAK_SOURCE_TEXT, observation: '四丙申 -> 火不通根 / 仍作弱論' as const, executablePredicateAuthorized: false as const }),
] as const);

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  tonggenEvaluationConsumed: false,
  tenGodFactsConsumed: false,
  stemFactsConsumed: false,
  branchFactsConsumed: false,
  hiddenStemFactsConsumed: false,
  status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
});

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'bounded_no_tonggen_evidence_to_not_tonggen',
  'bounded_no_tonggen_evidence_to_weak',
  'generic_no_tonggen_to_weak',
  'bijie_count_to_weak',
  'visible_bijian_count_to_weak',
  'four_xin_mao_to_executable_matcher',
  'four_bing_shen_to_executable_matcher',
  'not_tonggen_to_zhu_gua',
  'tonggen_presence_to_bu_ruo',
  'source_context_to_final_qiang_ruo',
  'source_context_to_final_wang_shuai',
  'source_context_to_numeric_strength',
  'source_context_to_nonnumeric_strength_scalar',
  'source_context_to_geju_candidate',
  'source_context_to_geju_establishment',
  'source_context_to_production_fact',
] as const);

const upstream = Object.freeze({
  boundedTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  boundedTonggenDefinitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  tonggenSupportVersion: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  tonggenSupportDefinitionHash: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
});

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DEFINITION_HASH = createHash('sha256')
  .update(JSON.stringify({
    version: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION,
    scope: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_SCOPE,
    decision: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DECISION,
    source: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_SOURCE,
    observations: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_OBSERVATIONS,
    representability: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_CANONICAL_REPRESENTABILITY,
    upstream,
    unauthorizedDerivations: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_UNAUTHORIZED_DERIVATIONS,
    productionFactEmissionAuthorized: false,
  }))
  .digest('hex');

export const GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION,
  definitionHash: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DEFINITION_HASH,
  decision: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DECISION,
  upstreamBoundedTonggenVersion: upstream.boundedTonggenVersion,
  upstreamBoundedTonggenDefinitionHash: upstream.boundedTonggenDefinitionHash,
  upstreamTonggenSupportConstituentVersion: upstream.tonggenSupportVersion,
  upstreamTonggenSupportConstituentDefinitionHash: upstream.tonggenSupportDefinitionHash,
  directSourceBijieWithoutTonggenFloatingContextObserved: true,
  directSourceFourXinMaoWeakExampleObserved: true,
  directSourceFourBingShenWeakExampleObserved: true,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  boundedTonggenEvaluationConsumed: false,
  canonicalNotTonggenResolverAuthorized: false,
  boundedNoEvidenceToNotTonggenAuthorized: false,
  absenceOfBoundedTonggenToWeakAuthorized: false,
  bijieCountToWeakAuthorized: false,
  exactFourXinMaoMatcherAuthorized: false,
  exactFourBingShenMatcherAuthorized: false,
  dangZhongCounterAuthorized: false,
  zhuGuaCounterAuthorized: false,
  tonggenToBuRuoAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary: 'Observation-only source registry. It does not turn no_bounded_tonggen_evidence into a global 不通根 verdict and does not authorize absence-of-Tonggen -> 弱/助寡, Tonggen -> 不弱, final 強弱/旺衰, strength scalar, Gyeokguk, or production facts.',
});
