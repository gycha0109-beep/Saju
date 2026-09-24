import { describe, expect, it } from 'vitest';
import {
  R122_AUTHORITY,
  R122_COMPARISON_GROUPS,
  R122_COUNTEREXAMPLE_CASES,
  R122_REJECTED_SHORTCUTS,
  R122_SEASON_ROOT_COUNTEREXAMPLE_VERSION,
  R122_SUMMARY,
} from '../src/research/general-natal-season-root-interaction-counterexamples.js';

describe('R122 season-by-root interaction counterexample corpus', () => {
  it('publishes a bounded corpus large enough for the R122 acceptance gate', () => {
    expect(R122_SEASON_ROOT_COUNTEREXAMPLE_VERSION).toBe('0.1.0-research');
    expect(R122_COUNTEREXAMPLE_CASES).toHaveLength(18);
    expect(R122_SUMMARY.caseCount).toBe(18);
    expect(R122_SUMMARY.comparisonGroupCount).toBeGreaterThanOrEqual(4);
    expect(R122_SUMMARY.familyCount).toBeGreaterThanOrEqual(5);
    expect(new Set(R122_COUNTEREXAMPLE_CASES.map((item) => item.caseId)).size).toBe(
      R122_COUNTEREXAMPLE_CASES.length,
    );
  });

  it('binds every case to evidence and separates source statement from interpretation and inference', () => {
    for (const item of R122_COUNTEREXAMPLE_CASES) {
      expect(item.upstreamEvidenceRefs.length).toBeGreaterThan(0);
      expect(item.sourceScope.length).toBeGreaterThan(0);
      expect(item.sourceStatement.length).toBeGreaterThan(0);
      expect(item.interpretiveReading.length).toBeGreaterThan(0);
      expect(item.researchInference.length).toBeGreaterThan(0);
      expect(item.naiveRuleTested.length).toBeGreaterThan(0);
      expect(item.prohibitedExtensions.length).toBeGreaterThan(0);
    }
  });

  it('preserves the spring/autumn season anti-determinism pair', () => {
    const spring = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C01-SPRING-WOOD-HEAVY-METAL',
    );
    const autumn = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C02-AUTUMN-WOOD-DEEP-ROOT',
    );

    expect(spring).toMatchObject({
      family: 'SEASON_ANTI_DETERMINISM',
      comparisonGroupId: 'SEASON-WOOD-ANTI-DETERMINISM',
      seasonContext: '春木 / 得時',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
    });
    expect(autumn).toMatchObject({
      family: 'SEASON_ANTI_DETERMINISM',
      comparisonGroupId: 'SEASON-WOOD-ANTI-DETERMINISM',
      seasonContext: '秋木 / 失時',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
    });
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'DE_SHI_EQUALS_AUTOMATIC_QIANG_OR_WANG',
    );
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'SHI_SHI_EQUALS_AUTOMATIC_RUO',
    );
  });

  it('preserves repeated visible support without root as an exact four-pillar counterexample family', () => {
    const ids = ['R122-C03-FOUR-XIN-MAO', 'R122-C04-FOUR-BING-SHEN'];

    for (const caseId of ids) {
      const item = R122_COUNTEREXAMPLE_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(item).toMatchObject({
        family: 'VISIBLE_SUPPORT_WITHOUT_ROOT',
        comparisonGroupId: 'REPEATED-STEMS-WITHOUT-ROOT',
        verdict: 'COUNTEREXAMPLE_CONFIRMED',
        isolation: 'EXACT_FOUR_PILLAR',
      });
    }

    expect(R122_REJECTED_SHORTCUTS).toContain(
      'VISIBLE_SAME_ELEMENT_COUNT_EQUALS_STRENGTH',
    );
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'VISIBLE_SUPPORT_CAN_ALWAYS_REPLACE_ROOT',
    );
  });

  it('keeps month priority bounded to its source scope instead of universalizing it', () => {
    const exclusive = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C05-MONTH-CONTEXT-NOT-EXCLUSIVE',
    );
    const scopedPriority = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C06-MONTH-ROOT-PRIORITY-SCOPED',
    );

    expect(exclusive?.verdict).toBe('COUNTEREXAMPLE_CONFIRMED');
    expect(scopedPriority?.verdict).toBe('CONTEXT_DEPENDENT');
    expect(scopedPriority?.unresolvedFactors).toContain(
      'no exhaustive cross-context root ordering is stated',
    );
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'MONTH_IMPORTANCE_EQUALS_EXCLUSIVE_AUTHORITY',
    );
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'MONTH_ROOT_PRIORITY_EQUALS_UNIVERSAL_OVERRIDE',
    );
  });

  it('keeps Tougan and Tonggen non-equivalent without inventing a global negative resolver', () => {
    const tonggenOnly = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C07-YI-YIN-TONGGEN-ONLY',
    );
    const both = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C08-JIA-YIN-BOTH',
    );
    const exactExclusion = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C09-YI-XU-EXACT-EXCLUSION',
    );

    expect(tonggenOnly?.verdict).toBe('COUNTEREXAMPLE_CONFIRMED');
    expect(both?.verdict).toBe('COUNTEREXAMPLE_CONFIRMED');
    expect(exactExclusion).toMatchObject({
      family: 'ROOT_NEGATIVE_BOUNDARY',
      verdict: 'INSUFFICIENT_ISOLATION',
    });
    expect(R122_REJECTED_SHORTCUTS).toContain('TOUGAN_EQUALS_TONGGEN');
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'ONE_EXACT_NEGATIVE_PAIR_EQUALS_GLOBAL_NOT_TONGGEN',
    );
  });

  it('preserves Muku and Changsheng Yin/Yang source divergence', () => {
    const yiMuku = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C11-YI-WEI-MUKU-TENSION',
    );
    const yinChangsheng = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C14-YIN-CHANGSHENG-DIVERGENT',
    );

    expect(yiMuku).toMatchObject({
      family: 'MUKU_YIN_YANG_DIVERGENCE',
      verdict: 'SOURCE_DIVERGENT',
      isolation: 'SOURCE_STRATUM_COMPARISON',
    });
    expect(yinChangsheng).toMatchObject({
      family: 'CHANGSHENG_SOURCE_STRATUM_DIVERGENCE',
      verdict: 'SOURCE_DIVERGENT',
      isolation: 'SOURCE_STRATUM_COMPARISON',
    });
  });

  it('keeps Yuqi temporal variability qualitative and non-numeric', () => {
    const item = R122_COUNTEREXAMPLE_CASES.find(
      (candidate) => candidate.caseId === 'R122-C12-YUQI-TEMPORAL-VARIABILITY',
    );
    expect(item).toMatchObject({
      family: 'YUQI_TEMPORAL_VARIABILITY',
      verdict: 'CONTEXT_DEPENDENT',
    });
    expect(item?.prohibitedExtensions).toContain(
      'YUQI_TEMPORAL_VARIABILITY_EQUALS_NUMERIC_WEIGHT',
    );
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'YUQI_IS_STATIC_ACROSS_TEMPORAL_CONTEXT',
    );
  });

  it('rejects support counting and numeric root weights', () => {
    const heavyLight = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C15-HEAVY-LIGHT-NOT-NUMERIC',
    );
    const support = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C16-SUPPORT-AGGREGATION-INCOMPLETE',
    );

    expect(heavyLight?.verdict).toBe('INCONCLUSIVE');
    expect(support?.verdict).toBe('INSUFFICIENT_ISOLATION');
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'HEAVY_LIGHT_LANGUAGE_EQUALS_NUMERIC_WEIGHT',
    );
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'SUPPORT_CONSTITUENT_COUNT_EQUALS_QIANG',
    );
  });

  it('keeps textual overlap from becoming independent source voting', () => {
    const overlap = R122_COUNTEREXAMPLE_CASES.find(
      (item) =>
        item.caseId === 'R122-C17-XU-REN-SHARED-EXAMPLES-NOT-INDEPENDENT',
    );
    const variant = R122_COUNTEREXAMPLE_CASES.find(
      (item) => item.caseId === 'R122-C18-XU-REN-MATERIAL-VARIANT',
    );

    expect(overlap).toMatchObject({
      family: 'TEXTUAL_DEPENDENCY_RISK',
      verdict: 'SOURCE_DIVERGENT',
    });
    expect(variant).toMatchObject({
      family: 'TEXTUAL_DEPENDENCY_RISK',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
    });
    expect(R122_REJECTED_SHORTCUTS).toContain(
      'SHARED_COMMENTARY_WORDING_EQUALS_INDEPENDENT_VOTES',
    );
  });

  it('provides at least four explicit paired comparison groups', () => {
    expect(R122_COMPARISON_GROUPS.length).toBeGreaterThanOrEqual(4);

    for (const groupId of R122_COMPARISON_GROUPS) {
      const members = R122_COUNTEREXAMPLE_CASES.filter(
        (item) => item.comparisonGroupId === groupId,
      );
      expect(members.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps the corpus research-only and blocks final strength promotion', () => {
    expect(R122_AUTHORITY).toEqual({
      status: 'RESEARCH_COUNTEREXAMPLE_CORPUS_CANDIDATE',
      researchOnly: true,
      sourceStatementInterpretiveReadingResearchInferenceSeparated: true,
      seasonAloneSufficientForFinalStrength: false,
      rootAloneSufficientForFinalStrength: false,
      visibleSupportCountSufficientForFinalStrength: false,
      monthBranchExclusiveStrengthAuthority: false,
      universalRootWeightModelAuthorized: false,
      numericStrengthScoreAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      finalWangShuaiClassifierAuthorized: false,
      methodologyMajorityVoteAuthorized: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
