import { describe, expect, it } from 'vitest';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import type { TenGod } from '../src/contracts/calculation.js';
import * as authorityModule from '../src/research/general-natal-canonical-yin-yinshou-category-member-authority.js';
import {
  admitResolvedCanonicalYinToYinshouCategory,
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY,
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DECISION,
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH,
} from '../src/research/general-natal-canonical-yin-yinshou-category-member-authority.js';

const resolvedOutsideScope: readonly TenGod[] = [
  '비견',
  '겁재',
  '식신',
  '상관',
  '편재',
  '정재',
  '편관',
  '정관',
];

describe('General Natal canonical Yin -> 印綬 category member authority', () => {
  it('admits resolved 정인 as the bounded 正印 / 印綬 source-category member', () => {
    expect(admitResolvedCanonicalYinToYinshouCategory(resolved('정인'))).toEqual({
      state: 'yinshou_source_category_member_observed',
      inputStatus: 'resolved',
      canonicalLabel: '정인',
      sourceLabel: '正印',
      sourceCategory: '印綬',
      membershipObserved: true,
      sourceText:
        '印綬喜其生身，正偏同為美格，故財與印不分偏正，同為一格而論之。',
      authority: 'research_only',
    });
  });

  it('admits resolved 편인 as the bounded 偏印 / 印綬 source-category member', () => {
    expect(admitResolvedCanonicalYinToYinshouCategory(resolved('편인'))).toEqual({
      state: 'yinshou_source_category_member_observed',
      inputStatus: 'resolved',
      canonicalLabel: '편인',
      sourceLabel: '偏印',
      sourceCategory: '印綬',
      membershipObserved: true,
      sourceText:
        '印綬喜其生身，正偏同為美格，故財與印不分偏正，同為一格而論之。',
      authority: 'research_only',
    });
  });

  it('keeps every other resolved Ten-God outside this bounded authority without a universal non-印綬 verdict', () => {
    for (const tenGod of resolvedOutsideScope) {
      const evaluation = admitResolvedCanonicalYinToYinshouCategory(resolved(tenGod));
      expect(evaluation).toEqual({
        state: 'resolved_outside_authorized_yin_label_scope',
        inputStatus: 'resolved',
        canonicalLabel: tenGod,
        sourceLabel: null,
        sourceCategory: null,
        membershipObserved: false,
        sourceText: null,
        authority: 'research_only',
      });
    }

    expect(
      GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY
        .resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized,
    ).toBe(false);
  });

  it('fails closed for ambiguous canonical Ten-God facts', () => {
    const evaluation = admitResolvedCanonicalYinToYinshouCategory(
      ambiguous<TenGod>(
        [
          { candidateId: 'candidate-jeongin', value: '정인', reasonRefs: ['scenario-a'] },
          { candidateId: 'candidate-pyeonin', value: '편인', reasonRefs: ['scenario-b'] },
        ],
        ['canonical-ten-god-ambiguous'],
      ),
    );

    expect(evaluation).toEqual({
      state: 'canonical_ten_god_ambiguous',
      inputStatus: 'ambiguous',
      canonicalLabel: null,
      sourceLabel: null,
      sourceCategory: null,
      membershipObserved: false,
      sourceText: null,
      authority: 'research_only',
    });
  });

  it('fails closed for unavailable canonical Ten-God facts', () => {
    expect(
      admitResolvedCanonicalYinToYinshouCategory(unavailable('ten-god-not-resolved')),
    ).toEqual({
      state: 'canonical_ten_god_unavailable',
      inputStatus: 'unavailable',
      canonicalLabel: null,
      sourceLabel: null,
      sourceCategory: null,
      membershipObserved: false,
      sourceText: null,
      authority: 'research_only',
    });
  });

  it('pins the upstream authorities and keeps the canonical Ten-God raw path governed', () => {
    const authority = GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY;

    expect(GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
    expect(authority.upstreamSourceCategoryVersion).toBe('0.1.0-research');
    expect(authority.upstreamSourceCategoryDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.upstreamCanonicalYinHanjaBridgeVersion).toBe('0.1.0-research');
    expect(authority.upstreamCanonicalYinHanjaBridgeDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.canonicalTenGodRawPathGoverned).toBe(true);
    expect(authority.singleFactInputOnly).toBe(true);
    expect(authority.resolvedJeonginToYinshouCategoryMemberAuthorizedResearchOnly).toBe(true);
    expect(authority.resolvedPyeoninToYinshouCategoryMemberAuthorizedResearchOnly).toBe(true);
    expect(authority.ambiguousUnavailableFailClosed).toBe(true);
  });

  it('does not authorize chart scanning, counting, 黨眾/助寡, strength, Gyeokguk, or Production', () => {
    const authority = GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY;

    expect(authority.pillarPositionSelectionAuthorized).toBe(false);
    expect(authority.wholeChartYinScanAuthorized).toBe(false);
    expect(authority.wholeChartYinCountAuthorized).toBe(false);
    expect(authority.branchTenGodScanAuthorized).toBe(false);
    expect(authority.hiddenStemTenGodScanAuthorized).toBe(false);
    expect(authority.canonicalTenGodRecomputationAuthorized).toBe(false);
    expect(authority.yinshouToDangZhongSupportConstituentAuthorized).toBe(false);
    expect(authority.yinshouCounterAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });

  it('exports only one evaluator function, preventing hidden chart scanners or counters', () => {
    const functionExports = Object.entries(authorityModule).filter(
      ([, value]) => typeof value === 'function',
    );

    expect(functionExports).toHaveLength(1);
    expect(functionExports[0]?.[0]).toBe('admitResolvedCanonicalYinToYinshouCategory');
  });
});
