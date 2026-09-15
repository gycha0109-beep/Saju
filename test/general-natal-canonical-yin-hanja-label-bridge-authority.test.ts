import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_AUTHORITY,
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DECISION,
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_MAP,
  GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE,
  canonicalYinTenGodToHanjaLabel,
} from '../src/research/general-natal-canonical-yin-hanja-label-bridge-authority.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from '../src/research/general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
} from '../src/research/general-natal-yinshou-zheng-pian-source-category-authority.js';
import {
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
} from '../src/research/general-natal-jia-gui-zhengyin-exact-relation-authority.js';
import {
  GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
} from '../src/research/general-natal-bing-yi-zhengyin-exact-relation-authority.js';

const packageManifest = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as { dependencies?: Record<string, string> };
const adapterSource = readFileSync(
  new URL('../src/calculation/manseryeok-adapter.ts', import.meta.url),
  'utf8',
);

describe('canonical Yin Ten-God Hanja label bridge authority', () => {
  test('pins the exact calculation dependency and adapter provenance', () => {
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(packageManifest.dependencies?.manseryeok).toBe('2.0.0');
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE.packageVersion).toBe('2.0.0');
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE.upstreamTag).toBe('v2.0.0');
    expect(adapterSource).toContain("const ENGINE_NAME = 'manseryeok';");
    expect(adapterSource).toContain("const ENGINE_VERSION = '2.0.0';");
    expect(adapterSource).toContain(
      "const ENGINE_REPOSITORY = 'https://github.com/yhj1024/manseryeok';",
    );
  });

  test('maps only the bounded canonical Yin labels to the pinned Hanja vocabulary', () => {
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_MAP).toEqual({
      정인: '正印',
      편인: '偏印',
    });
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_PROVENANCE.upstreamMappingEvidence).toEqual({
      편인: '偏印',
      정인: '正印',
    });
    expect(canonicalYinTenGodToHanjaLabel('정인')).toBe('正印');
    expect(canonicalYinTenGodToHanjaLabel('편인')).toBe('偏印');
    expect(() => canonicalYinTenGodToHanjaLabel('비견' as never)).toThrow(RangeError);
  });

  test('pins governed canonical input and upstream research authorities', () => {
    const authority = GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_AUTHORITY;
    expect(
      GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths,
    ).toContain('derivedFacts.tenGods');
    expect(authority.canonicalTenGodRawPathGoverned).toBe(true);
    expect(authority.upstreamYinshouSourceCategoryVersion).toBe(
      GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
    );
    expect(authority.upstreamYinshouSourceCategoryDefinitionHash).toBe(
      GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
    );
    expect(authority.upstreamJiaGuiZhengyinVersion).toBe(
      GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
    );
    expect(authority.upstreamJiaGuiZhengyinDefinitionHash).toBe(
      GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
    );
    expect(authority.upstreamBingYiZhengyinVersion).toBe(
      GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
    );
    expect(authority.upstreamBingYiZhengyinDefinitionHash).toBe(
      GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
    );
  });

  test('keeps runtime interpretation, strength, Gyeokguk, and production escalation fail-closed', () => {
    const authority = GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_AUTHORITY;
    expect(authority.canonicalJeonginToZhengyinLabelAuthorizedResearchOnly).toBe(true);
    expect(authority.canonicalPyeoninToPianyinLabelAuthorizedResearchOnly).toBe(true);
    expect(authority.lexicalProvenanceBridgeOnly).toBe(true);
    expect(authority.classicalSourceLiteralPyeoninTokenClaimAuthorized).toBe(false);
    expect(authority.canonicalTenGodFactsConsumedByLookup).toBe(false);
    expect(authority.canonicalTenGodRecomputationAuthorized).toBe(false);
    expect(authority.wholeChartYinScanAuthorized).toBe(false);
    expect(authority.wholeChartYinCountAuthorized).toBe(false);
    expect(authority.branchTenGodScanAuthorized).toBe(false);
    expect(authority.hiddenStemTenGodScanAuthorized).toBe(false);
    expect(authority.yinshouRuntimeResolverAuthorized).toBe(false);
    expect(authority.canonicalYinToYinshouRuntimeConstituentAuthorized).toBe(false);
    expect(authority.yinshouToDangZhongSupportConstituentAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS).toContain(
      'canonical_yin_to_yinshou_runtime_constituent',
    );
    expect(GENERAL_NATAL_CANONICAL_YIN_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS).toContain(
      'classical_source_literal_pyeonin_token_claim',
    );
  });
});
