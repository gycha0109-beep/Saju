import { describe, expect, test } from 'vitest';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import {
  admitResolvedCanonicalGyeopjaeToBijieCategory,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
} from '../src/research/general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent,
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from '../src/research/general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';

describe('SAJU-R11 canonical Gyeopjae -> Bijie support authority', () => {
  test('admits one resolved canonical 겁재 fact as 劫財 under 比劫', () => {
    const membership = admitResolvedCanonicalGyeopjaeToBijieCategory(
      resolved('겁재'),
    );

    expect(membership).toMatchObject({
      state: 'bijie_source_category_member_observed',
      inputStatus: 'resolved',
      canonicalLabel: '겁재',
      sourceLabel: '劫財',
      sourceCategory: '比劫',
      membershipObserved: true,
      authority: 'research_only',
    });

    const support =
      bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
        membership,
      );

    expect(support).toEqual({
      state: 'gyeopjae_bijie_support_constituent_observed',
      upstreamState: 'bijie_source_category_member_observed',
      canonicalConstituent: '겁재',
      sourceMemberLabel: '劫財',
      sourceSupportCategory: '比劫',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  test('keeps other resolved Ten-Gods outside this bounded authority', () => {
    const membership = admitResolvedCanonicalGyeopjaeToBijieCategory(
      resolved('비견'),
    );

    expect(membership).toMatchObject({
      state: 'resolved_outside_authorized_gyeopjae_label_scope',
      canonicalLabel: '비견',
      membershipObserved: false,
    });
    expect(
      bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
        membership,
      ),
    ).toMatchObject({
      state: 'no_gyeopjae_bijie_support_constituent_evidence',
      supportConstituentObserved: false,
    });
  });

  test('fails closed for ambiguous and unavailable canonical facts', () => {
    const ambiguousMembership =
      admitResolvedCanonicalGyeopjaeToBijieCategory(
        ambiguous(
          [
            {
              candidateId: 'gyeopjae',
              value: '겁재',
              reasonRefs: ['synthetic'],
            },
            {
              candidateId: 'bijian',
              value: '비견',
              reasonRefs: ['synthetic'],
            },
          ],
          ['synthetic'],
        ),
      );
    const unavailableMembership =
      admitResolvedCanonicalGyeopjaeToBijieCategory(
        unavailable('synthetic-unavailable'),
      );

    expect(ambiguousMembership.state).toBe('canonical_ten_god_ambiguous');
    expect(unavailableMembership.state).toBe(
      'canonical_ten_god_unavailable',
    );
    expect(
      bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
        ambiguousMembership,
      ).supportConstituentObserved,
    ).toBe(false);
    expect(
      bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
        unavailableMembership,
      ).supportConstituentObserved,
    ).toBe(false);
  });

  test('closes only the general single-fact Gyeopjae-to-Bijie support mapping', () => {
    expect(
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
    ).toMatchObject({
      singleFactInputOnly: true,
      resolvedGyeopjaeToBijieCategoryMemberAuthorizedResearchOnly: true,
      globalJiecaiBijieStringAliasAuthorized: false,
      pillarPositionSelectionAuthorized: false,
      wholeChartJiecaiScanAuthorized: false,
      wholeChartJiecaiCountAuthorized: false,
      bijianJiecaiAggregationAuthorized: false,
      completeBijieCollectionAuthorized: false,
      productionFactEmissionAuthorized: false,
    });

    expect(
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
    ).toMatchObject({
      canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly: true,
      wholeChartJiecaiScanAuthorized: false,
      wholeChartJiecaiCountAuthorized: false,
      bijianJiecaiAggregationAuthorized: false,
      completeBijieCollectionAuthorized: false,
      dangZhongBooleanResolverAuthorized: false,
      chartLevelQiangRuoClassifierAuthorized: false,
      chartLevelWangShuaiClassifierAuthorized: false,
      productionFactEmissionAuthorized: false,
    });
  });

  test('definition hashes are pinned', () => {
    expect(
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
    expect(
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
