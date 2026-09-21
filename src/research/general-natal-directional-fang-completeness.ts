export const R054_DIRECTIONAL_FANG_COMPLETENESS_VERSION = '0.1.0-research' as const;

export interface R054DirectionalFamily {
  id: string;
  members: readonly [string, string, string];
  direction: '東' | '南' | '西' | '北';
  element: '木' | '火' | '金' | '水';
  sourceStratum: 'DITIANSHUI_CHANWEI_REN_TIEQIAO';
  completeFangIdentityVerified: true;
  automaticTransformationAuthorized: false;
}

export const R054_DIRECTIONAL_FAMILIES: readonly R054DirectionalFamily[] = Object.freeze([
  { id: 'EAST-WOOD', members: ['寅', '卯', '辰'], direction: '東', element: '木', sourceStratum: 'DITIANSHUI_CHANWEI_REN_TIEQIAO', completeFangIdentityVerified: true, automaticTransformationAuthorized: false },
  { id: 'SOUTH-FIRE', members: ['巳', '午', '未'], direction: '南', element: '火', sourceStratum: 'DITIANSHUI_CHANWEI_REN_TIEQIAO', completeFangIdentityVerified: true, automaticTransformationAuthorized: false },
  { id: 'WEST-METAL', members: ['申', '酉', '戌'], direction: '西', element: '金', sourceStratum: 'DITIANSHUI_CHANWEI_REN_TIEQIAO', completeFangIdentityVerified: true, automaticTransformationAuthorized: false },
  { id: 'NORTH-WATER', members: ['亥', '子', '丑'], direction: '北', element: '水', sourceStratum: 'DITIANSHUI_CHANWEI_REN_TIEQIAO', completeFangIdentityVerified: true, automaticTransformationAuthorized: false },
]);

export interface R054TwoMemberSubset {
  parentFamilyId: string;
  members: readonly [string, string];
  renTieqiaoCompleteFang: false;
  crossSchoolHalfMeetingStatus: 'UNRESOLVED';
  executable: false;
}

export const R054_TWO_MEMBER_SUBSETS: readonly R054TwoMemberSubset[] = Object.freeze(
  R054_DIRECTIONAL_FAMILIES.flatMap((family) => {
    const [a, b, c] = family.members;
    const subsets: R054TwoMemberSubset[] = [
      { parentFamilyId: family.id, members: [a, b], renTieqiaoCompleteFang: false, crossSchoolHalfMeetingStatus: 'UNRESOLVED', executable: false },
      { parentFamilyId: family.id, members: [b, c], renTieqiaoCompleteFang: false, crossSchoolHalfMeetingStatus: 'UNRESOLVED', executable: false },
      { parentFamilyId: family.id, members: [a, c], renTieqiaoCompleteFang: false, crossSchoolHalfMeetingStatus: 'UNRESOLVED', executable: false },
    ];
    return subsets;
  }),
);

export const R054_TERMINOLOGY_BOUNDARY = Object.freeze({
  selectedStratumTerm: '方' as const,
  modernConvenienceLabel: '三會' as const,
  zipingZhenquanSanhuiTokenAutoMappedToModernSanhui: false,
  crossStratumOntologyUnified: false,
});

export const R054_AUTHORITY = Object.freeze({
  status: 'VERIFIED_WITHIN_REN_TIEQIAO_STRATUM' as const,
  completeFamilyCount: 4,
  twoMemberSubsetCount: 12,
  twoMembersCountAsCompleteFang: false,
  universalHalfMeetingRuleAuthorized: false,
  automaticTransformationAuthorized: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
