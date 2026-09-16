import { createHash } from 'node:crypto';
import type { EarthlyBranch, HeavenlyStem } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from './general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SCOPE =
  'selected_source_exact_yi_xu_ding_chou_muku_yuqi_tonggen_exclusion' as const;
export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
} as const);

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SOURCE_TEXT =
  '若乙逢戌、丁逢丑，非其本庫餘氣，自不作通根論。' as const;

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY = Object.freeze([
  Object.freeze({
    canonicalStem: '을' as const,
    sourceStem: '乙' as const,
    canonicalBranch: '술' as const,
    sourceBranch: '戌' as const,
    sourceBoundary: '非其本庫餘氣' as const,
    sourceDisposition: '自不作通根論' as const,
  }),
  Object.freeze({
    canonicalStem: '정' as const,
    sourceStem: '丁' as const,
    canonicalBranch: '축' as const,
    sourceBranch: '丑' as const,
    sourceBoundary: '非其本庫餘氣' as const,
    sourceDisposition: '自不作通根論' as const,
  }),
] as const);

export interface ExactTonggenExclusionInput {
  readonly stem: HeavenlyStem;
  readonly branch: EarthlyBranch;
}

export type ExactTonggenExclusionState =
  | 'selected_source_tonggen_exclusion_observed'
  | 'outside_selected_source_pair_scope';

export interface ExactTonggenExclusionEvaluation {
  readonly state: ExactTonggenExclusionState;
  readonly stem: HeavenlyStem;
  readonly branch: EarthlyBranch;
  readonly sourceStem: '乙' | '丁' | null;
  readonly sourceBranch: '戌' | '丑' | null;
  readonly sourceBoundary: '非其本庫餘氣' | null;
  readonly sourceDisposition: '自不作通根論' | null;
  readonly selectedSourceTonggenExcluded: boolean;
  readonly globalNotTonggenEstablished: false;
  readonly rootlessnessEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

export function evaluateSelectedSourceExactTonggenExclusion(
  input: ExactTonggenExclusionInput,
): ExactTonggenExclusionEvaluation {
  const match = GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY.find(
    (candidate) =>
      candidate.canonicalStem === input.stem && candidate.canonicalBranch === input.branch,
  );

  if (match) {
    return Object.freeze({
      state: 'selected_source_tonggen_exclusion_observed',
      stem: input.stem,
      branch: input.branch,
      sourceStem: match.sourceStem,
      sourceBranch: match.sourceBranch,
      sourceBoundary: match.sourceBoundary,
      sourceDisposition: match.sourceDisposition,
      selectedSourceTonggenExcluded: true,
      globalNotTonggenEstablished: false,
      rootlessnessEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'outside_selected_source_pair_scope',
    stem: input.stem,
    branch: input.branch,
    sourceStem: null,
    sourceBranch: null,
    sourceBoundary: null,
    sourceDisposition: null,
    selectedSourceTonggenExcluded: false,
    globalNotTonggenEstablished: false,
    rootlessnessEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalExactStemAvailable: true,
  canonicalExactBranchAvailable: true,
  exactYiXuPairRepresentable: true,
  exactDingChouPairRepresentable: true,
  wholeChartScanRequired: false,
  mukuYuqiNonmatchPromotedToNotTonggen: false,
  boundedTonggenNoEvidencePromotedToNotTonggen: false,
  status: 'EXACT_PAIR_REPRESENTABLE' as const,
});

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'muku_yuqi_nonmatch_to_global_not_tonggen',
  'bounded_tonggen_no_evidence_to_global_not_tonggen',
  'element_level_wood_xu_to_not_tonggen',
  'element_level_fire_chou_to_not_tonggen',
  'exact_pair_exclusion_to_whole_chart_rootlessness',
  'exact_pair_exclusion_to_zhu_gua',
  'exact_pair_exclusion_to_weak',
  'exact_pair_exclusion_to_final_qiang_ruo',
  'exact_pair_exclusion_to_final_wang_shuai',
  'exact_pair_exclusion_to_numeric_strength',
  'exact_pair_exclusion_to_nonnumeric_strength_scalar',
  'exact_pair_exclusion_to_geju_candidate',
  'exact_pair_exclusion_to_geju_establishment',
  'exact_pair_exclusion_to_production_fact',
] as const);

const upstream = Object.freeze({
  mukuYuqiLightRootVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  mukuYuqiLightRootDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  boundedTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  boundedTonggenDefinitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
});

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_VERSION,
      scope: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SCOPE,
      decision: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DECISION,
      source: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SOURCE,
      sourceText: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_SOURCE_TEXT,
      registry: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_REGISTRY,
      representability: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_CANONICAL_REPRESENTABILITY,
      upstream,
      unauthorizedDerivations: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_VERSION,
  definitionHash: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DEFINITION_HASH,
  decision: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_DECISION,
  upstreamMukuYuqiLightRootVersion: upstream.mukuYuqiLightRootVersion,
  upstreamMukuYuqiLightRootDefinitionHash: upstream.mukuYuqiLightRootDefinitionHash,
  upstreamBoundedTonggenVersion: upstream.boundedTonggenVersion,
  upstreamBoundedTonggenDefinitionHash: upstream.boundedTonggenDefinitionHash,
  directSourceExactTonggenExclusionObserved: true,
  exactYiXuTonggenExclusionAuthorized: true,
  exactDingChouTonggenExclusionAuthorized: true,
  wholeChartScanAuthorized: false,
  mukuYuqiNonmatchToNotTonggenAuthorized: false,
  boundedTonggenNoEvidenceToNotTonggenAuthorized: false,
  generalNotTonggenResolverAuthorized: false,
  wholeChartRootlessnessResolverAuthorized: false,
  absenceToZhuGuaAuthorized: false,
  absenceToWeakAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Research-only exact-pair selected-source exclusion. Only canonical 을+술 and 정+축 preserve the commentary statement 非其本庫餘氣，自不作通根論. This does not convert generic #558 nonmatches or #692 no-evidence states into a global 不通根 verdict, does not establish rootlessness, 助寡, 弱, final 旺衰/強弱, or any production fact.',
});
