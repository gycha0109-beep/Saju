import { createHash } from 'node:crypto';
import type { TenGod } from '../contracts/calculation.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
} from './general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_AUTHORITY,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
} from './general-natal-jiecai-bijie-context-terminology-observation-authority.js';

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_SCOPE =
  'canonical_gyeopjae_to_jiecai_label_provenance_bridge' as const;
export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export type CanonicalGyeopjaeTenGod = Extract<TenGod, '겁재'>;
export type CanonicalGyeopjaeHanjaLabel = '劫財';

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_PROVENANCE = Object.freeze({
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
    겁재: '劫財' as const,
  }),
});

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_MAP = Object.freeze({
  겁재: '劫財',
} as const satisfies Readonly<Record<CanonicalGyeopjaeTenGod, CanonicalGyeopjaeHanjaLabel>>);

function assertNever(value: never): never {
  throw new RangeError(`Unsupported canonical Gyeopjae Ten-God label: ${String(value)}`);
}

export function canonicalGyeopjaeTenGodToHanjaLabel(
  tenGod: CanonicalGyeopjaeTenGod,
): CanonicalGyeopjaeHanjaLabel {
  switch (tenGod) {
    case '겁재':
      return GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_MAP.겁재;
    default:
      return assertNever(tenGod);
  }
}

const canonicalTenGodRawPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'derivedFacts.tenGods',
  );

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'classical_source_general_jiecai_resolver',
    'global_jiecai_bijie_alias',
    'jiecai_subset_of_bijie_ontology',
    'canonical_gyeopjae_to_bijie_support_constituent',
    'canonical_gyeopjae_to_dang_zhong',
    'whole_chart_jiecai_scan',
    'whole_chart_jiecai_count',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'canonical_ten_god_recomputation',
    'bijian_plus_jiecai_aggregation',
    'jiecai_absence_to_zhu_gua',
    'jiecai_to_qiang_or_bu_ruo',
    'jiecai_to_final_qiang_ruo',
    'jiecai_to_final_wang_shuai',
    'jiecai_to_numeric_strength',
    'jiecai_to_nonnumeric_strength_scalar',
    'jiecai_to_geju_candidate',
    'jiecai_to_geju_establishment',
    'jiecai_to_production_fact',
  ] as const);

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION,
        scope: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_SCOPE,
        decision: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DECISION,
        provenance: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_PROVENANCE,
        labelMap: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_MAP,
        canonicalTenGodRawPathGoverned,
        upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
        upstreamJiaYiJiecaiDefinitionHash:
          GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
        upstreamJiecaiBijieContextVersion:
          GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
        upstreamJiecaiBijieContextDefinitionHash:
          GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH,
        upstreamContextGlobalAliasAuthorized:
          GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_AUTHORITY
            .globalJiecaiBijieAliasAuthorized,
        lexicalProvenanceBridgeOnly: true,
        classicalSourceGeneralJiecaiResolverAuthorized: false,
        globalJiecaiBijieAliasAuthorized: false,
        canonicalGyeopjaeToBijieSupportAuthorized: false,
        wholeChartJiecaiScanAuthorized: false,
        jiecaiCountAuthorized: false,
        productionFactEmissionAuthorized: false,
        productionInvariant: Object.freeze({
          gejuCandidate: 'NOT_EMITTED' as const,
          gejuEstablishmentState: 'NOT_EMITTED' as const,
          generalNatalProductionAuthority: 'BLOCKED' as const,
          p0Cm03: 'OPEN' as const,
          nextProductionSku: 'NONE' as const,
          commerce: 'HOLD' as const,
        }),
        unauthorizedDerivations:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION,
  definitionHash: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
  decision: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DECISION,
  provenance: GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_PROVENANCE,
  upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
  upstreamJiaYiJiecaiDefinitionHash:
    GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  upstreamJiecaiBijieContextVersion:
    GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
  upstreamJiecaiBijieContextDefinitionHash:
    GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH,
  canonicalTenGodRawPathGoverned,
  canonicalGyeopjaeToJiecaiLabelAuthorizedResearchOnly: true,
  lexicalProvenanceBridgeOnly: true,
  exactPinnedUpstreamVocabulary: true,
  canonicalTenGodFactsConsumedByLookup: false,
  canonicalTenGodRecomputationAuthorized: false,
  classicalSourceGeneralJiecaiResolverAuthorized: false,
  generalizedJiecaiResolverAuthorized: false,
  globalJiecaiBijieAliasAuthorized: false,
  jiecaiSubsetOfBijieOntologyAuthorized: false,
  canonicalGyeopjaeToBijieSupportAuthorized: false,
  wholeChartJiecaiScanAuthorized: false,
  wholeChartJiecaiCountAuthorized: false,
  branchTenGodScanAuthorized: false,
  hiddenStemTenGodScanAuthorized: false,
  bijianPlusJiecaiAggregationAuthorized: false,
  jiecaiCounterAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  supportToQiangOrBuRuoAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  gejuCandidate: 'NOT_EMITTED' as const,
  gejuEstablishmentState: 'NOT_EMITTED' as const,
  generalNatalProductionAuthority: 'BLOCKED' as const,
  p0Cm03: 'OPEN' as const,
  nextProductionSku: 'NONE' as const,
  commerce: 'HOLD' as const,
  unauthorizedDerivations:
    GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The current Saju package and calculation adapter both pin manseryeok@2.0.0, whose exact tagged TEN_GOD_HANJA vocabulary explicitly maps the already-canonical label 겁재 to 劫財. This authority therefore permits only the lexical/provenance lookup 겁재 -> 劫財. Existing selected-source artifacts remain narrower semantic authorities: 甲逢乙為劫財 is an exact-pair observation and the same-context 劫財重重 / 比劫 wording is observation-only with no global alias. This bridge does not generalize 劫財 semantics, map canonical 겁재 into 比劫 or 黨眾 support, scan/count a chart, aggregate 比肩+劫財, establish 黨眾/助寡 or 強弱/旺衰, derive Gyeokguk, or emit production facts.',
});
