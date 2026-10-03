import { describe, expect, it } from 'vitest';

import {
  R164_AUTHORITY,
  R164_COUNTERFORCE_CHANNEL_GROUPS,
  R164_COUNTERFORCE_SOURCE_CASE_CHANNEL_GROUP_VERSION,
  R164_COUNTERFORCE_SOURCE_FIXTURE,
  R164_GOVERNANCE_GUARDS,
  R164_REJECTED_SHORTCUTS,
  R164_REMOVAL_VARIANTS,
  R164_REPLAY_GATES,
  R164_SUMMARY,
  R164_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-counterforce-source-case-channel-groups.js';

describe('R164 counterforce source-case channel groups', () => {
  it('binds the R076 counterforce source case without executable authority', () => {
    expect(R164_COUNTERFORCE_SOURCE_CASE_CHANNEL_GROUP_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R164_COUNTERFORCE_SOURCE_FIXTURE).toMatchObject({
      upstreamCaseId: 'NATAL-METAL-BLOCKS-WOOD-MEETING-CHANGE',
      provenanceKind: 'PARAPHRASED_SOURCE_CASE',
      renDayContextObserved: true,
      haiMonthContextObserved: true,
      jiOfficerTransparencyContextObserved: true,
      maoWeiLuckContextObserved: true,
      maoWeiMeetingDerivedByR164: false,
      counterforceChannelGroupsObserved: true,
      nonCompletionLanguageObserved: true,
      counterforcePrecedenceEstablished: false,
      changeSettlementEstablished: false,
      automaticBlockingAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('preserves two grouped textual alternatives without individual sufficiency', () => {
    expect(R164_COUNTERFORCE_CHANNEL_GROUPS).toEqual([
      expect.objectContaining({
        channelGroupId: 'VISIBLE_METAL_STEMS_GROUP',
        sourceSurface: '庚辛',
        memberSymbols: ['庚', '辛'],
        sourceGroupedAlternativeObserved: true,
        individualMemberSufficiencyEstablished: false,
        groupSufficiencyEstablished: false,
        precedenceEstablished: false,
      }),
      expect.objectContaining({
        channelGroupId: 'METAL_BRANCHES_GROUP',
        sourceSurface: '申酉',
        memberSymbols: ['申', '酉'],
        sourceGroupedAlternativeObserved: true,
        individualMemberSufficiencyEstablished: false,
        groupSufficiencyEstablished: false,
        precedenceEstablished: false,
      }),
    ]);
    expect(R164_SUMMARY).toMatchObject({
      channelGroupCount: 2,
      individualMemberCount: 4,
      individualMemberSufficiencyEstablishedCount: 0,
      groupSufficiencyEstablishedCount: 0,
      precedenceEstablishedGroupCount: 0,
    });
  });

  it('decomposes seven replay gates and fails closed on removal', () => {
    expect(R164_REPLAY_GATES).toHaveLength(7);
    expect(R164_REMOVAL_VARIANTS).toHaveLength(7);

    for (const variant of R164_REMOVAL_VARIANTS) {
      expect(variant.retainedGateIds).toHaveLength(6);
      expect(variant.sourceCaseReplayEligible).toBe(false);
      expect(variant.sourceObservationNegated).toBe(false);
      expect(variant.semanticOppositeEstablished).toBe(false);
      expect(variant.counterforcePrecedenceEstablished).toBe(false);
      expect(variant.changeSettlementEstablished).toBe(false);
      expect(variant.automaticBlockingAuthorized).toBe(false);
      expect(variant.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps all governance guards closed', () => {
    expect(R164_GOVERNANCE_GUARDS).toHaveLength(5);
    expect(R164_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    expect(R164_UPSTREAM_BINDINGS.r076).toMatchObject({
      provenanceKind: 'PARAPHRASED_SOURCE_CASE',
      counterforcePrecedenceGap: true,
      changeSettlementGap: true,
    });
    expect(R164_UPSTREAM_BINDINGS.r157).toMatchObject({
      configurationSpecificObserved: true,
      automaticCounterforceAuthorized: false,
    });
    expect(R164_UPSTREAM_BINDINGS.r159).toMatchObject({
      exactMinimalPredicateSetEstablished: false,
      boundedOutcomeSufficiencyEstablished: false,
      settlementSufficiencyEstablished: false,
    });
  });

  it('rejects one-symbol, precedence, meeting, and settlement shortcuts', () => {
    expect(R164_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'GENG_ALONE_ALWAYS_BLOCKS_CHANGE',
        'XIN_ALONE_ALWAYS_BLOCKS_CHANGE',
        'SHEN_ALONE_ALWAYS_BLOCKS_CHANGE',
        'YOU_ALONE_ALWAYS_BLOCKS_CHANGE',
        'MAO_WEI_PRESENCE_EQUALS_COMPLETE_MEETING',
        'COUNTERFORCE_PRESENCE_EQUALS_PRECEDENCE',
        'COUNTERFORCE_PRESENCE_EQUALS_CHANGE_SETTLEMENT',
        'RETURN_CLASH_LANGUAGE_EQUALS_UNIVERSAL_BLOCKING_RULE',
      ]),
    );
  });

  it('keeps R164 research-only and non-authoritative', () => {
    expect(R164_AUTHORITY).toMatchObject({
      researchOnly: true,
      counterforceSourceCaseBound: true,
      visibleMetalStemGroupObserved: true,
      metalBranchGroupObserved: true,
      groupedAlternativesDistinctFromIndividualSufficiencyObserved: true,
      maoWeiLuckContextDistinctFromMeetingMatcherObserved: true,
      counterforcePresenceDistinctFromPrecedenceObserved: true,
      counterforcePresenceDistinctFromSettlementObserved: true,
      nonCompletionLanguagePreserved: true,
      individualMemberSufficiencyEstablished: false,
      groupSufficiencyEstablished: false,
      meetingMatcherEstablished: false,
      counterforcePrecedenceEstablished: false,
      changeSettlementEstablished: false,
      automaticCounterforceAuthorized: false,
      fixedPolarityAuthorized: false,
      deterministicEventAuthorized: false,
      executableCounterforceResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
