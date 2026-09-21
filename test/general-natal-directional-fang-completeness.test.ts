import { describe, expect, it } from 'vitest';
import {
  R054_AUTHORITY,
  R054_DIRECTIONAL_FAMILIES,
  R054_DIRECTIONAL_FANG_COMPLETENESS_VERSION,
  R054_TERMINOLOGY_BOUNDARY,
  R054_TWO_MEMBER_SUBSETS,
} from '../src/research/general-natal-directional-fang-completeness.js';

describe('R054 directional Fang completeness', () => {
  it('preserves the four complete directional families in the selected stratum', () => {
    expect(R054_DIRECTIONAL_FANG_COMPLETENESS_VERSION).toBe('0.1.0-research');
    expect(R054_DIRECTIONAL_FAMILIES).toEqual([
      expect.objectContaining({ members: ['寅', '卯', '辰'], direction: '東', element: '木' }),
      expect.objectContaining({ members: ['巳', '午', '未'], direction: '南', element: '火' }),
      expect.objectContaining({ members: ['申', '酉', '戌'], direction: '西', element: '金' }),
      expect.objectContaining({ members: ['亥', '子', '丑'], direction: '北', element: '水' }),
    ]);
    expect(R054_DIRECTIONAL_FAMILIES.every(
      (x) => x.sourceStratum === 'DITIANSHUI_CHANWEI_REN_TIEQIAO' &&
        x.completeFangIdentityVerified === true &&
        x.automaticTransformationAuthorized === false,
    )).toBe(true);
  });

  it('records all two-member subsets as incomplete Fang for this source stratum', () => {
    expect(R054_TWO_MEMBER_SUBSETS).toHaveLength(12);
    expect(R054_TWO_MEMBER_SUBSETS.every(
      (x) => x.renTieqiaoCompleteFang === false &&
        x.crossSchoolHalfMeetingStatus === 'UNRESOLVED' &&
        x.executable === false,
    )).toBe(true);
  });

  it('does not collapse historical Sanhui terminology into the modern ontology', () => {
    expect(R054_TERMINOLOGY_BOUNDARY).toEqual({
      selectedStratumTerm: '方',
      modernConvenienceLabel: '三會',
      zipingZhenquanSanhuiTokenAutoMappedToModernSanhui: false,
      crossStratumOntologyUnified: false,
    });
  });

  it('keeps the result source-bounded and non-executable', () => {
    expect(R054_AUTHORITY).toEqual({
      status: 'VERIFIED_WITHIN_REN_TIEQIAO_STRATUM',
      completeFamilyCount: 4,
      twoMemberSubsetCount: 12,
      twoMembersCountAsCompleteFang: false,
      universalHalfMeetingRuleAuthorized: false,
      automaticTransformationAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
