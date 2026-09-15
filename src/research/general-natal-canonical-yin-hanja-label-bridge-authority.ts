import { createHash } from 'node:crypto';
import type { TenGod } from '../contracts/calculation.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
} from './general-natal-yinshou-zheng-pian-source-category-authority.js';
import {
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
} from './general-natal-jia-gui-zhengyin-exact-relation-authority.js';
import {
  GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
} from './general-natal-bing-yi-zhengyin-exact-relation-authority.js';

export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_SCOPE =
  'canonical_jeongin_pyeonin_to_zhengyin_pianyin_label_bridge' as const;
export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export type CanonicalYinTenGod = Extract<TenGod, '정인' | '편인'>;
export type CanonicalYinHanjaLabel = '正印' | '偏印';

export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE = Object.freeze({
  packageName: 'manseryeok' as const,
  packageVersion: '2.0.0' as const,
  packageManifestPath: 'package.json' as const,
  adapterPath: 'src/calculation/manseryeok-adapter.ts' as const,
  adapterEngineName: 'manseryeok' as const,
  adapterEngineVersion: '2.0.0' as const,
  adapterEngineRepository: 'https://github.com/yhj1024/manseryeok' as const,
  upstreamTag: 'v2.0.0' as const,
  upstreamConstantsPath: 'src/constants.ts' as const,
  upstreamConstantsUrl:
    'https://github.com/yhj1024/manseryeok/blob/v2.0.0/src/constants.ts' as const,
  upstreamMappingEvidence: Object.freeze({
    편인: '偏印' as const,
    정인: '正印' as const,
  }),
});

export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_MAP = Object.freeze({
  정인: '正印',
  편인: '偏印',
} as const satisfies Readonly<Record<CanonicalYinTenGod, CanonicalYinHanjaLabel>>);

function assertNever(value: never): never {
  throw new RangeError(`Unsupported canonical Yin Ten-God label: ${String(value)}`);
}

export function canonicalYinTenGodToHanjaLabel(
  tenGod: CanonicalYinTenGod,
): CanonicalYinHanjaLabel {
  switch (tenGod) {
    case '정인':
      return GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_MAP.정인;
    case '편인':
      return GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_MAP.편인;
    default:
      return assertNever(tenGod);
  }
}

const canonicalTenGodRawPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'derivedFacts.tenGods',
  );

export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'classical_source_literal_pyeonin_token_claim',
    'canonical_yin_to_yinshou_runtime_constituent',
    'any_resolved_yin_ten_god_to_yinshou_runtime_support',
    'whole_chart_yin_scan',
    'whole_chart_yin_count',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'canonical_ten_god_recomputation',
    'yin_count_to_dang_zhong',
    'yin_absence_to_zhu_gua',
    'yinshou_to_final_qiang',
    'label_bridge_to_ordinary_strength',
    'label_bridge_to_numeric_strength',
    'label_bridge_to_nonnumeric_strength_scalar',
    'label_bridge_to_geju_candidate',
    'label_bridge_to_geju_establishment',
    'label_bridge_to_production_fact',
  ] as const);

export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_VERSION,
      scope: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_SCOPE,
      decision: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DECISION,
      provenance: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE,
      labelMap: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_MAP,
      canonicalTenGodRawPathGoverned,
      upstreamYinshouSourceCategoryVersion:
        GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
      upstreamYinshouSourceCategoryDefinitionHash:
        GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
      upstreamJiaGuiZhengyinVersion:
        GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
      upstreamJiaGuiZhengyinDefinitionHash:
        GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
      upstreamBingYiZhengyinVersion:
        GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
      upstreamBingYiZhengyinDefinitionHash:
        GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
      tenGodRecomputationAuthorized: false,
      yinshouRuntimeResolverAuthorized: false,
      unauthorizedDerivations:
        GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_VERSION,
  definitionHash: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
  decision: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DECISION,
  provenance: GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE,
  upstreamYinshouSourceCategoryVersion:
    GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
  upstreamYinshouSourceCategoryDefinitionHash:
    GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  upstreamJiaGuiZhengyinVersion:
    GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
  upstreamJiaGuiZhengyinDefinitionHash:
    GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  upstreamBingYiZhengyinVersion:
    GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
  upstreamBingYiZhengyinDefinitionHash:
    GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  canonicalTenGodRawPathGoverned,
  canonicalJeonginToZhengyinLabelAuthorizedResearchOnly: true,
  canonicalPyeoninToPianyinLabelAuthorizedResearchOnly: true,
  lexicalProvenanceBridgeOnly: true,
  classicalSourceLiteralPyeoninTokenClaimAuthorized: false,
  canonicalTenGodFactsConsumedByLookup: false,
  canonicalTenGodRecomputationAuthorized: false,
  wholeChartYinScanAuthorized: false,
  wholeChartYinCountAuthorized: false,
  branchTenGodScanAuthorized: false,
  hiddenStemTenGodScanAuthorized: false,
  yinshouRuntimeResolverAuthorized: false,
  canonicalYinToYinshouRuntimeConstituentAuthorized: false,
  yinshouToDangZhongSupportConstituentAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
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
  unauthorizedDerivations:
    GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The current Saju package pins manseryeok@2.0.0, whose tagged TEN_GOD_HANJA vocabulary explicitly maps canonical 정인 to 正印 and 편인 to 偏印. The current adapter records the same engine version and passes upstream Ten-God values into canonical derivedFacts.tenGods, whose raw path is already governed for research binding. This authority therefore permits only a bounded lexical/provenance lookup for the two already-canonical labels. The selected classical source independently groups the 正/偏 variants of 印 under the 印綬 discussion and separate bounded artifacts attest two 正印 examples, but this bridge does not claim a literal 偏印 token from that source, recompute Ten-Gods, scan chart facts, resolve canonical labels into runtime 印綬 support, establish 黨眾/助寡 or final 旺衰/強弱, derive Gyeokguk, or emit production facts.',
});
