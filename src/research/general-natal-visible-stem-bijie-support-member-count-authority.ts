import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY,
  type VisibleStemBijieSupportConstituentUnionEvaluation,
} from './general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import { SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_AUTHORITY } from './saju-r24-visible-bijie-support-member-count-readiness-reaudit.js';

export const VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_VALUES = Object.freeze([0, 1, 2, 3] as const);
export type VisibleStemBijieSupportMemberCount =
  (typeof VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_VALUES)[number];

const definition = Object.freeze({
  primitiveId: 'VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT',
  version: '0.1.0-research',
  decision: 'AUTHORIZED_RESEARCH_ONLY',
  semanticScope: 'year_month_hour_visible_stem_support_members_only',
  valueDomain: VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_VALUES,
  slots: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.slots,
  upstreamR23Version: GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.version,
  upstreamR23DefinitionHash:
    GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY.definitionHash,
  upstreamR24DefinitionHash:
    SAJU_R24_VISIBLE_BIJIE_SUPPORT_MEMBER_COUNT_READINESS_REAUDIT_AUTHORITY.definitionHash,
  arithmetic: 'count R23 supportConstituentObserved === true over fixed slots',
  upstreamThreeWayParityRequired: true,
  visibleStemSupportMemberCountAuthorizedResearchOnly: true,
  tenGodMembershipRecalculated: false,
  daySelfIncluded: false,
  bijianCountAuthorized: false,
  gyeopjaeCountAuthorized: false,
  wholeChartBijieCountAuthorized: false,
  completeBijieCollectionAuthorized: false,
  branchTenGodScanAuthorized: false,
  hiddenStemTenGodScanAuthorized: false,
  supportWeightAuthorized: false,
  supportCompositionAuthorized: false,
  dangZhongSettlementAuthorized: false,
  zhuGuaSettlementAuthorized: false,
  qiangRuoClassificationAuthorized: false,
  wangShuaiClassificationAuthorized: false,
  gyeokgukDerivationAuthorized: false,
  numericStrengthAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);

export const GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY = Object.freeze({
  ...definition,
  definitionHash: deterministicContentHash(definition),
});

export type VisibleStemBijieSupportMemberCountEvaluation =
  | {
      readonly state: 'visible_stem_bijie_support_member_count_resolved';
      readonly visibleStemBijieSupportMemberCount: VisibleStemBijieSupportMemberCount;
      readonly upstreamThreeWayParityVerified: true;
      readonly authority: 'research_only';
    }
  | {
      readonly state: 'r23_support_union_unresolved' | 'r23_support_union_parity_unresolved';
      readonly visibleStemBijieSupportMemberCount: null;
      readonly upstreamThreeWayParityVerified: false;
      readonly authority: 'research_only';
    };

// Membership belongs exclusively to R23. This function accepts no Ten-God facts.
export function evaluateVisibleStemBijieSupportMemberCount(
  union: VisibleStemBijieSupportConstituentUnionEvaluation,
): VisibleStemBijieSupportMemberCountEvaluation {
  const unavailable = (
    state: 'r23_support_union_unresolved' | 'r23_support_union_parity_unresolved',
  ) =>
    Object.freeze({
      state,
      visibleStemBijieSupportMemberCount: null,
      upstreamThreeWayParityVerified: false as const,
      authority: 'research_only' as const,
    });
  if (union.state !== 'visible_stem_bijie_support_constituent_union_resolved') {
    return unavailable('r23_support_union_unresolved');
  }
  if (
    union.slots === null ||
    union.upstreamThreeWayParityVerified !== true ||
    union.authority !== 'research_only'
  ) {
    return unavailable('r23_support_union_parity_unresolved');
  }
  let count = 0;
  for (const slot of definition.slots) {
    const member = union.slots[slot];
    if (
      !member ||
      member.slot !== slot ||
      member.sourceFactRef !== `derivedFacts.tenGods.${slot}.stem` ||
      member.authority !== 'research_only' ||
      typeof member.supportConstituentObserved !== 'boolean'
    ) {
      return unavailable('r23_support_union_parity_unresolved');
    }
    if (member.supportConstituentObserved === true) count += 1;
  }
  if (union.visibleStemBijieSupportObserved !== count > 0) {
    return unavailable('r23_support_union_parity_unresolved');
  }
  return Object.freeze({
    state: 'visible_stem_bijie_support_member_count_resolved',
    visibleStemBijieSupportMemberCount: count as VisibleStemBijieSupportMemberCount,
    upstreamThreeWayParityVerified: true,
    authority: 'research_only',
  });
}
