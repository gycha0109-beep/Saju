import {
  R076_AUTHORITY,
  R076_CASES,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R157_AUTHORITY,
  R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
  R157_TRIGGER_ROWS,
} from './general-natal-temporal-trigger-matching-provenance-boundary-corpus.js';
import {
  R159_AUTHORITY,
  R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
  R159_TRIGGER_SUFFICIENCY_ROWS,
} from './general-natal-temporal-trigger-sufficiency-fail-closed-audit.js';
import {
  R162_AUTHORITY,
  R162_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_VERSION,
} from './general-natal-dayun-meeting-clash-structural-change-class-replay-boundary.js';
import {
  R163_AUTHORITY,
  R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION,
} from './general-natal-break-rescue-paired-source-case-delta.js';

export const R164_COUNTERFORCE_SOURCE_CASE_CHANNEL_GROUP_VERSION =
  '0.1.0-research' as const;

export type R164CounterforceChannelGroupId =
  | 'VISIBLE_METAL_STEMS_GROUP'
  | 'METAL_BRANCHES_GROUP';

export type R164ReplayGateId =
  | 'R076_COUNTERFORCE_CASE_BOUND'
  | 'REN_DAY_CONTEXT_PRESERVED'
  | 'HAI_MONTH_CONTEXT_PRESERVED'
  | 'JI_OFFICER_TRANSPARENCY_CONTEXT_PRESERVED'
  | 'MAO_WEI_LUCK_CONTEXT_PRESERVED'
  | 'COUNTERFORCE_CHANNEL_GROUPS_PRESERVED'
  | 'NON_COMPLETION_LANGUAGE_PRESERVED';

export interface R164CounterforceChannelGroup {
  channelGroupId: R164CounterforceChannelGroupId;
  sourceSurface: '庚辛' | '申酉';
  memberSymbols: readonly string[];
  sourceGroupedAlternativeObserved: true;
  individualMemberSufficiencyEstablished: false;
  groupSufficiencyEstablished: false;
  precedenceEstablished: false;
  changeSettlementEstablished: false;
  automaticBlockingAuthorized: false;
  productionAuthorityPromoted: false;
}

export const R164_COUNTERFORCE_CHANNEL_GROUPS: readonly R164CounterforceChannelGroup[] =
  Object.freeze([
    Object.freeze({
      channelGroupId: 'VISIBLE_METAL_STEMS_GROUP' as const,
      sourceSurface: '庚辛' as const,
      memberSymbols: Object.freeze(['庚', '辛']),
      sourceGroupedAlternativeObserved: true as const,
      individualMemberSufficiencyEstablished: false as const,
      groupSufficiencyEstablished: false as const,
      precedenceEstablished: false as const,
      changeSettlementEstablished: false as const,
      automaticBlockingAuthorized: false as const,
      productionAuthorityPromoted: false as const,
    }),
    Object.freeze({
      channelGroupId: 'METAL_BRANCHES_GROUP' as const,
      sourceSurface: '申酉' as const,
      memberSymbols: Object.freeze(['申', '酉']),
      sourceGroupedAlternativeObserved: true as const,
      individualMemberSufficiencyEstablished: false as const,
      groupSufficiencyEstablished: false as const,
      precedenceEstablished: false as const,
      changeSettlementEstablished: false as const,
      automaticBlockingAuthorized: false as const,
      productionAuthorityPromoted: false as const,
    }),
  ]);

const r076Counterforce = R076_CASES.find(
  (item) => item.mechanism === 'COUNTERFORCE_BLOCKS_CHANGE',
);
const r157Counterforce = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'COUNTERFORCE_TRIGGER',
);
const r159Counterforce = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'COUNTERFORCE_TRIGGER',
);

if (
  r076Counterforce === undefined ||
  r157Counterforce === undefined ||
  r159Counterforce === undefined
) {
  throw new Error('R164 missing counterforce upstream fixture');
}

export const R164_COUNTERFORCE_SOURCE_FIXTURE = Object.freeze({
  fixtureId: 'R164-R076-NATAL-METAL-BLOCKS-WOOD-MEETING-CHANGE',
  upstreamCaseId: r076Counterforce.id,
  sourceRepresentation: r076Counterforce.sourceRepresentation,
  provenanceKind: r076Counterforce.provenanceKind,
  renDayContextObserved: true as const,
  haiMonthContextObserved: true as const,
  jiOfficerTransparencyContextObserved: true as const,
  maoWeiLuckContextObserved: true as const,
  maoWeiMeetingDerivedByR164: false as const,
  counterforceChannelGroupsObserved: true as const,
  nonCompletionLanguageObserved: true as const,
  counterforcePrecedenceEstablished: false as const,
  changeSettlementEstablished: false as const,
  automaticBlockingAuthorized: false as const,
  fixedPolarityAuthorized: false as const,
  deterministicEventAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export interface R164ReplayGate {
  gateId: R164ReplayGateId;
  meaning: string;
  sourceRefs: readonly string[];
  requiredForSourceCaseReplay: true;
  removalBlocksSourceCaseReplay: true;
  semanticNecessityEstablished: false;
  interactionMatchingEstablished: false;
  counterforcePrecedenceEstablished: false;
  changeSettlementEstablished: false;
  automaticBlockingAuthorized: false;
  productionAuthorityPromoted: false;
}

const gate = (
  value: Omit<
    R164ReplayGate,
    | 'requiredForSourceCaseReplay'
    | 'removalBlocksSourceCaseReplay'
    | 'semanticNecessityEstablished'
    | 'interactionMatchingEstablished'
    | 'counterforcePrecedenceEstablished'
    | 'changeSettlementEstablished'
    | 'automaticBlockingAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R164ReplayGate =>
  Object.freeze({
    ...value,
    requiredForSourceCaseReplay: true,
    removalBlocksSourceCaseReplay: true,
    semanticNecessityEstablished: false,
    interactionMatchingEstablished: false,
    counterforcePrecedenceEstablished: false,
    changeSettlementEstablished: false,
    automaticBlockingAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R164_REPLAY_GATES: readonly R164ReplayGate[] = Object.freeze([
  gate({
    gateId: 'R076_COUNTERFORCE_CASE_BOUND',
    meaning:
      'The replay remains tied to the configuration-specific R076 paraphrased counterforce source case.',
    sourceRefs: ['R076:COUNTERFORCE_BLOCKS_CHANGE'],
  }),
  gate({
    gateId: 'REN_DAY_CONTEXT_PRESERVED',
    meaning: 'The retained source case preserves the 壬-day context.',
    sourceRefs: ['R076:COUNTERFORCE_BLOCKS_CHANGE'],
  }),
  gate({
    gateId: 'HAI_MONTH_CONTEXT_PRESERVED',
    meaning: 'The retained source case preserves the 亥-month context.',
    sourceRefs: ['R076:COUNTERFORCE_BLOCKS_CHANGE'],
  }),
  gate({
    gateId: 'JI_OFFICER_TRANSPARENCY_CONTEXT_PRESERVED',
    meaning:
      'The retained source case preserves 透己用官 without generalizing it into a production selector.',
    sourceRefs: ['R076:COUNTERFORCE_BLOCKS_CHANGE'],
  }),
  gate({
    gateId: 'MAO_WEI_LUCK_CONTEXT_PRESERVED',
    meaning:
      'The retained source case preserves 運逢卯未; R164 does not derive a complete meeting configuration from those symbols.',
    sourceRefs: [
      'R076:COUNTERFORCE_BLOCKS_CHANGE',
      'R162:RELATION_MODE_ASSERTED_AS_MEETING_OR_CLASH',
    ],
  }),
  gate({
    gateId: 'COUNTERFORCE_CHANNEL_GROUPS_PRESERVED',
    meaning:
      '庚辛 and 申酉 are preserved as two grouped textual alternatives and are not split into four independent sufficient symbols.',
    sourceRefs: ['R076:COUNTERFORCE_BLOCKS_CHANGE'],
  }),
  gate({
    gateId: 'NON_COMPLETION_LANGUAGE_PRESERVED',
    meaning:
      '可回沖而不成會局變格 is retained as source-case outcome language without converting it into universal precedence or settled blocking.',
    sourceRefs: [
      'R076:COUNTERFORCE_BLOCKS_CHANGE',
      'R157:COUNTERFORCE_TRIGGER',
    ],
  }),
]);

export interface R164RemovalVariant {
  variantId: string;
  removedGateId: R164ReplayGateId;
  retainedGateIds: readonly R164ReplayGateId[];
  sourceCaseReplayEligible: false;
  sourceObservationNegated: false;
  semanticOppositeEstablished: false;
  counterforcePrecedenceEstablished: false;
  changeSettlementEstablished: false;
  automaticBlockingAuthorized: false;
  productionAuthorityPromoted: false;
}

export const R164_REMOVAL_VARIANTS: readonly R164RemovalVariant[] =
  Object.freeze(
    R164_REPLAY_GATES.map((removed, index) =>
      Object.freeze({
        variantId: 'R164-RM-' + String(index + 1).padStart(2, '0'),
        removedGateId: removed.gateId,
        retainedGateIds: Object.freeze(
          R164_REPLAY_GATES.filter(
            (item) => item.gateId !== removed.gateId,
          ).map((item) => item.gateId),
        ),
        sourceCaseReplayEligible: false as const,
        sourceObservationNegated: false as const,
        semanticOppositeEstablished: false as const,
        counterforcePrecedenceEstablished: false as const,
        changeSettlementEstablished: false as const,
        automaticBlockingAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export interface R164GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R076' | 'R157' | 'R159' | 'R162' | 'R163';
  boundary: string;
  satisfied: boolean;
  counterforcePrecedenceAuthorized: false;
  executableSettlementAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R164GovernanceGuard,
    | 'counterforcePrecedenceAuthorized'
    | 'executableSettlementAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R164GovernanceGuard =>
  Object.freeze({
    ...value,
    counterforcePrecedenceAuthorized: false,
    executableSettlementAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R164_GOVERNANCE_GUARDS: readonly R164GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R164-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Counterforce precedence and change settlement remain explicit execution gaps; no global break/recovery resolver is authorized.',
      satisfied:
        R076_EXECUTION_GAPS.includes('COUNTERFORCE_PRECEDENCE') &&
        R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT') &&
        R076_EXECUTION_GAPS.includes('TEMPORAL_DURATION') &&
        R076_EXECUTION_GAPS.includes('POLARITY_SETTLEMENT') &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R164-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Counterforce remains a configuration-specific trigger class without executable predicate, automatic counterforce, polarity, or event authority.',
      satisfied:
        r157Counterforce.configurationSpecificObserved &&
        R157_AUTHORITY.counterforceTriggerClassObserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.automaticCounterforceAuthorized &&
        !R157_AUTHORITY.fixedPolarityAuthorized &&
        !R157_AUTHORITY.deterministicEventAuthorized,
    }),
    guard({
      guardId: 'R164-GUARD-R159',
      upstreamAsset: 'R159',
      boundary:
        'The counterforce row has no minimal predicate set, matching sufficiency, settlement sufficiency, or bounded outcome sufficiency.',
      satisfied:
        !r159Counterforce.exactMinimalPredicateSetEstablished &&
        !r159Counterforce.matchingSufficiencyEstablished &&
        !r159Counterforce.settlementSufficiencyEstablished &&
        !r159Counterforce.boundedOutcomeSufficiencyEstablished &&
        !R159_AUTHORITY.automaticCounterforceOutcomeAuthorized,
    }),
    guard({
      guardId: 'R164-GUARD-R162',
      upstreamAsset: 'R162',
      boundary:
        'Relation assertion remains distinct from interaction matching and replayed structural-change language remains distinct from settled mutation.',
      satisfied:
        R162_AUTHORITY.relationAssertionDistinctFromInteractionMatchingObserved &&
        R162_AUTHORITY.classReplayDistinctFromSettledMutationObserved &&
        !R162_AUTHORITY.changeSufficiencyEstablished &&
        !R162_AUTHORITY.settledStructuralMutationAuthorized,
    }),
    guard({
      guardId: 'R164-GUARD-R163',
      upstreamAsset: 'R163',
      boundary:
        'Case-level textual decomposition remains distinct from semantic minimality and final settlement.',
      satisfied:
        R163_AUTHORITY.pairedTextualDeltaDistinctFromSemanticMinimalityObserved &&
        !R163_AUTHORITY.semanticMinimalityEstablished &&
        !R163_AUTHORITY.changeSettlementEstablished,
    }),
  ]);

export const R164_REJECTED_SHORTCUTS = Object.freeze([
  'GENG_ALONE_ALWAYS_BLOCKS_CHANGE',
  'XIN_ALONE_ALWAYS_BLOCKS_CHANGE',
  'SHEN_ALONE_ALWAYS_BLOCKS_CHANGE',
  'YOU_ALONE_ALWAYS_BLOCKS_CHANGE',
  'GENG_XIN_GROUP_IS_UNIVERSALLY_SUFFICIENT',
  'SHEN_YOU_GROUP_IS_UNIVERSALLY_SUFFICIENT',
  'MAO_WEI_PRESENCE_EQUALS_COMPLETE_MEETING',
  'COUNTERFORCE_PRESENCE_EQUALS_PRECEDENCE',
  'COUNTERFORCE_PRESENCE_EQUALS_CHANGE_SETTLEMENT',
  'RETURN_CLASH_LANGUAGE_EQUALS_UNIVERSAL_BLOCKING_RULE',
  'NON_COMPLETION_LANGUAGE_EQUALS_FIXED_FAVORABLE_POLARITY',
  'COUNTERFORCE_CASE_EQUALS_DETERMINISTIC_EVENT',
  'COUNTERFORCE_CHANNEL_COUNT_AS_NUMERIC_WEIGHT',
  'COUNTERFORCE_CASE_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R164_SUMMARY = Object.freeze({
  channelGroupCount: R164_COUNTERFORCE_CHANNEL_GROUPS.length,
  individualMemberCount: R164_COUNTERFORCE_CHANNEL_GROUPS.reduce(
    (sum, item) => sum + item.memberSymbols.length,
    0,
  ),
  individualMemberSufficiencyEstablishedCount:
    R164_COUNTERFORCE_CHANNEL_GROUPS.filter(
      (item) => item.individualMemberSufficiencyEstablished,
    ).length,
  groupSufficiencyEstablishedCount: R164_COUNTERFORCE_CHANNEL_GROUPS.filter(
    (item) => item.groupSufficiencyEstablished,
  ).length,
  precedenceEstablishedGroupCount: R164_COUNTERFORCE_CHANNEL_GROUPS.filter(
    (item) => item.precedenceEstablished,
  ).length,
  replayGateCount: R164_REPLAY_GATES.length,
  removalVariantCount: R164_REMOVAL_VARIANTS.length,
  governanceGuardCount: R164_GOVERNANCE_GUARDS.length,
});

export const R164_UPSTREAM_BINDINGS = Object.freeze({
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    upstreamCaseId: r076Counterforce.id,
    provenanceKind: r076Counterforce.provenanceKind,
    counterforcePrecedenceGap:
      R076_EXECUTION_GAPS.includes('COUNTERFORCE_PRECEDENCE'),
    changeSettlementGap:
      R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT'),
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    configurationSpecificObserved:
      r157Counterforce.configurationSpecificObserved,
    automaticCounterforceAuthorized:
      R157_AUTHORITY.automaticCounterforceAuthorized,
  },
  r159: {
    version: R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
    exactMinimalPredicateSetEstablished:
      r159Counterforce.exactMinimalPredicateSetEstablished,
    boundedOutcomeSufficiencyEstablished:
      r159Counterforce.boundedOutcomeSufficiencyEstablished,
    settlementSufficiencyEstablished:
      r159Counterforce.settlementSufficiencyEstablished,
  },
  r162: {
    version:
      R162_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_VERSION,
    relationAssertionDistinctFromInteractionMatchingObserved:
      R162_AUTHORITY.relationAssertionDistinctFromInteractionMatchingObserved,
  },
  r163: {
    version: R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION,
    pairedTextualDeltaDistinctFromSemanticMinimalityObserved:
      R163_AUTHORITY.pairedTextualDeltaDistinctFromSemanticMinimalityObserved,
  },
});

export const R164_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_COUNTERFORCE_SOURCE_CASE_CHANNEL_GROUP_REPLAY_COMPLETE' as const,
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
