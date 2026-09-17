import { describe, expect, it } from 'vitest';
import {
  canonicalGyeopjaeTenGodToHanjaLabel,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DECISION,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_SCOPE,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_MAP,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_PROVENANCE,
} from '../src/research/general-natal-canonical-gyeopjae-hanja-label-bridge-authority.js';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
} from '../src/research/general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH,
  GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
} from '../src/research/general-natal-jiecai-bijie-context-terminology-observation-authority.js';

describe('General Natal canonical 겁재 -> 劫財 lexical provenance bridge', () => {
  it('binds only the already-canonical 겁재 label to the exact pinned Hanja vocabulary', () => {
    expect(canonicalGyeopjaeTenGodToHanjaLabel('겁재')).toBe('劫財');
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_MAP).toEqual({
      겁재: '劫財',
    });
  });

  it('pins the exact manseryeok@2.0.0 provenance used by Saju', () => {
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_PROVENANCE).toMatchObject({
      packageName: 'manseryeok',
      packageVersion: '2.0.0',
      adapterEngineName: 'manseryeok',
      adapterEngineVersion: '2.0.0',
      upstreamTag: 'v2.0.0',
      upstreamConstantsPath: 'src/constants.ts',
      upstreamMappingEvidence: {
        겁재: '劫財',
      },
    });
  });

  it('pins the exact existing Jiecai source-boundary authorities', () => {
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY).toMatchObject({
      upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
      upstreamJiaYiJiecaiDefinitionHash:
        GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
      upstreamJiecaiBijieContextVersion:
        GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_VERSION,
      upstreamJiecaiBijieContextDefinitionHash:
        GENERAL_NATAL_JIECAI_BIJIE_CONTEXT_TERMINOLOGY_DEFINITION_HASH,
    });
  });

  it('fails closed for an invalid runtime cast instead of inventing another mapping', () => {
    expect(() =>
      canonicalGyeopjaeTenGodToHanjaLabel('비견' as unknown as '겁재'),
    ).toThrow(RangeError);
  });

  it('authorizes only the lexical bridge and keeps semantic expansion fail-closed', () => {
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_SCOPE).toBe(
      'canonical_gyeopjae_to_jiecai_label_provenance_bridge',
    );
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );

    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY).toMatchObject({
      canonicalTenGodRawPathGoverned: true,
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
    });
  });

  it('keeps the production invariant exact', () => {
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_AUTHORITY).toMatchObject({
      gejuCandidate: 'NOT_EMITTED',
      gejuEstablishmentState: 'NOT_EMITTED',
      generalNatalProductionAuthority: 'BLOCKED',
      p0Cm03: 'OPEN',
      nextProductionSku: 'NONE',
      commerce: 'HOLD',
    });
  });

  it('enumerates the prohibited semantic promotions explicitly', () => {
    expect(GENERAL_NATAL_CANONICAL_GYEOPJAE_HANJA_LABEL_BRIDGE_UNAUTHORIZED_DERIVATIONS).toEqual(
      expect.arrayContaining([
        'classical_source_general_jiecai_resolver',
        'global_jiecai_bijie_alias',
        'canonical_gyeopjae_to_bijie_support_constituent',
        'whole_chart_jiecai_scan',
        'whole_chart_jiecai_count',
        'bijian_plus_jiecai_aggregation',
        'jiecai_to_final_qiang_ruo',
        'jiecai_to_final_wang_shuai',
        'jiecai_to_production_fact',
      ]),
    );
  });
});
