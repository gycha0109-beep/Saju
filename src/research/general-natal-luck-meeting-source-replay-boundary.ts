import {
  R060_AUTHORITY,
  R060_HIDDEN_STEM_INTERACTION_VERSION,
  R060_MECHANISMS,
} from './general-natal-hidden-stem-interaction-boundary.js';
import {
  R073_AUTHORITY,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R146_ACTIVATION_PROVENANCE_CASES,
  R146_AUTHORITY,
  R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
} from './general-natal-hidden-stem-activation-provenance-interaction-event-corpus.js';
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
  R160_AUTHORITY,
  R160_YIN_TRANSPARENCY_SOURCE_REPLAY_PREDICATE_VERSION,
} from './general-natal-yin-transparency-source-replay-predicate-decomposition.js';

export const R161_NATAL_LUCK_MEETING_SOURCE_REPLAY_VERSION =
  '0.1.0-research' as const;

export type R161ReplayPredicateId =
  | 'DIRECT_NATAL_LUCK_MEETING_SOURCE_PHRASE_BOUND'
  | 'NATAL_BRANCH_PARTICIPANT_ASSERTED'
  | 'LUCK_BRANCH_PARTICIPANT_ASSERTED'
  | 'MEETING_CONFIGURATION_ASSERTED_AS_SOURCE_FIXTURE'
  | 'SOURCE_BOUNDED_QING_OBSERVATION_BOUND';

export type R161ReplayRemovalOutcome =
  | 'DIRECT_SOURCE_PHRASE_NOT_BOUND'
  | 'NATAL_PARTICIPANT_NOT_ASSERTED'
  | 'LUCK_PARTICIPANT_NOT_ASSERTED'
  | 'MEETING_ASSERTION_NOT_PRESENT'
  | 'SOURCE_CONSEQUENCE_NOT_BOUND';

export interface R161ReplayPredicate {
  predicateId: R161ReplayPredicateId;
  meaning: string;
  sourceRefs: readonly string[];
  requiredForExactSourceReplay: true;
  removalBlocksExactSourceReplay: true;
  removalOutcome: R161ReplayRemovalOutcome;
  branchMeetingMatcherEstablished: false;
  semanticNecessityEstablished: false;
  activationSufficiencyEstablished: false;
  perMemberActivationAuthorized: false;
  runtimeActivationFactAuthorized: false;
  productionAuthorityPromoted: false;
}

const predicate = (
  value: Omit<
    R161ReplayPredicate,
    | 'requiredForExactSourceReplay'
    | 'removalBlocksExactSourceReplay'
    | 'branchMeetingMatcherEstablished'
    | 'semanticNecessityEstablished'
    | 'activationSufficiencyEstablished'
    | 'perMemberActivationAuthorized'
    | 'runtimeActivationFactAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R161ReplayPredicate =>
  Object.freeze({
    ...value,
    requiredForExactSourceReplay: true,
    removalBlocksExactSourceReplay: true,
    branchMeetingMatcherEstablished: false,
    semanticNecessityEstablished: false,
    activationSufficiencyEstablished: false,
    perMemberActivationAuthorized: false,
    runtimeActivationFactAuthorized: false,
    productionAuthorityPromoted: false,
  });

const r060Meeting = R060_MECHANISMS.find(
  (item) => item.mechanism === 'BRANCH_MEETING_CONFIGURATION',
);
const r073Meeting = R073_STATE_MODEL.find(
  (item) => item.state === 'ACTIVATED_BY_NATAL_LUCK_MEETING',
);
const r146Meeting = R146_ACTIVATION_PROVENANCE_CASES.find(
  (item) =>
    item.family === 'R073_TEMPORAL_STATE_REPLAY' &&
    item.upstreamKey === 'ACTIVATED_BY_NATAL_LUCK_MEETING',
);
const r157Meeting = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'NATAL_LUCK_MEETING_ACTIVATION',
);
const r159Meeting = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'NATAL_LUCK_MEETING_ACTIVATION',
);

if (
  r060Meeting === undefined ||
  r073Meeting === undefined ||
  r146Meeting === undefined ||
  r157Meeting === undefined ||
  r159Meeting === undefined
) {
  throw new Error('R161 missing natal-luck meeting upstream fixture');
}

export const R161_NATAL_LUCK_MEETING_SOURCE_FIXTURE = Object.freeze({
  fixtureId: 'R161-NATAL-LUCK-MEETING-SOURCE-REPLAY',
  sourceRepresentation: r073Meeting.sourceRepresentation,
  provenanceKind: r073Meeting.provenanceKind,
  natalBranchParticipantAsserted: true as const,
  luckBranchParticipantAsserted: true as const,
  meetingConfigurationAsserted: true as const,
  meetingConfigurationDerivedByR161: false as const,
  boundedSourceObservation: '命與運二支會局_亦作清論' as const,
  perMemberActivationAuthorized: false as const,
  runtimeActivationFactAuthorized: false as const,
  meetingMatcherAuthorized: false as const,
  eventAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export const R161_REPLAY_PREDICATES: readonly R161ReplayPredicate[] =
  Object.freeze([
    predicate({
      predicateId: 'DIRECT_NATAL_LUCK_MEETING_SOURCE_PHRASE_BOUND',
      meaning:
        'The replay remains tied to the direct source phrase 命與運二支會局，亦作清論 rather than a reconstructed generalized meeting rule.',
      sourceRefs: ['R073:ACTIVATED_BY_NATAL_LUCK_MEETING'],
      removalOutcome: 'DIRECT_SOURCE_PHRASE_NOT_BOUND',
    }),
    predicate({
      predicateId: 'NATAL_BRANCH_PARTICIPANT_ASSERTED',
      meaning:
        'A natal-side branch participant is represented in the source fixture; R161 does not derive which branch qualifies.',
      sourceRefs: [
        'R073:ACTIVATED_BY_NATAL_LUCK_MEETING',
        'R157:NATAL_LUCK_MEETING_ACTIVATION',
      ],
      removalOutcome: 'NATAL_PARTICIPANT_NOT_ASSERTED',
    }),
    predicate({
      predicateId: 'LUCK_BRANCH_PARTICIPANT_ASSERTED',
      meaning:
        'A luck-side branch participant is represented in the source fixture; R161 does not derive which luck branch qualifies.',
      sourceRefs: [
        'R073:ACTIVATED_BY_NATAL_LUCK_MEETING',
        'R157:NATAL_LUCK_MEETING_ACTIVATION',
      ],
      removalOutcome: 'LUCK_PARTICIPANT_NOT_ASSERTED',
    }),
    predicate({
      predicateId: 'MEETING_CONFIGURATION_ASSERTED_AS_SOURCE_FIXTURE',
      meaning:
        'The fixture asserts the source-side 會局 condition only as an observed input state; R161 does not implement a branch-meeting matcher.',
      sourceRefs: [
        'R060:BRANCH_MEETING_CONFIGURATION',
        'R146:ACTIVATED_BY_NATAL_LUCK_MEETING',
      ],
      removalOutcome: 'MEETING_ASSERTION_NOT_PRESENT',
    }),
    predicate({
      predicateId: 'SOURCE_BOUNDED_QING_OBSERVATION_BOUND',
      meaning:
        'The source-bounded consequence 亦作清論 is preserved as text-level observation and is not expanded into runtime activation, polarity, event, or role settlement.',
      sourceRefs: ['R073:ACTIVATED_BY_NATAL_LUCK_MEETING'],
      removalOutcome: 'SOURCE_CONSEQUENCE_NOT_BOUND',
    }),
  ]);

export interface R161RemovalVariant {
  variantId: string;
  removedPredicateId: R161ReplayPredicateId;
  retainedPredicateIds: readonly R161ReplayPredicateId[];
  removalOutcome: R161ReplayRemovalOutcome;
  exactSourceReplayEligible: false;
  sourceObservationNegated: false;
  semanticOppositeEstablished: false;
  branchMeetingMatcherEstablished: false;
  activationSufficiencyEstablished: false;
  runtimeActivationFactAuthorized: false;
  productionAuthorityPromoted: false;
}

export const R161_REMOVAL_VARIANTS: readonly R161RemovalVariant[] =
  Object.freeze(
    R161_REPLAY_PREDICATES.map((removed, index) =>
      Object.freeze({
        variantId: 'R161-RM-' + String(index + 1).padStart(2, '0'),
        removedPredicateId: removed.predicateId,
        retainedPredicateIds: Object.freeze(
          R161_REPLAY_PREDICATES.filter(
            (item) => item.predicateId !== removed.predicateId,
          ).map((item) => item.predicateId),
        ),
        removalOutcome: removed.removalOutcome,
        exactSourceReplayEligible: false as const,
        sourceObservationNegated: false as const,
        semanticOppositeEstablished: false as const,
        branchMeetingMatcherEstablished: false as const,
        activationSufficiencyEstablished: false as const,
        runtimeActivationFactAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export const R161_EXACT_SOURCE_REPLAY_CONTRACT = Object.freeze({
  contractId: 'NATAL_LUCK_MEETING_ACTIVATION_LANGUAGE_SOURCE_REPLAY',
  requiredPredicateIds: Object.freeze(
    R161_REPLAY_PREDICATES.map((item) => item.predicateId),
  ),
  exactSourceReplayEligible: true as const,
  sourceBoundedInteractionObserved:
    r146Meeting.sourceBoundedInteractionObserved &&
    r157Meeting.triggerSignalObserved,
  sourceActivationLanguageObserved:
    r146Meeting.sourceActivationLanguageObserved &&
    r157Meeting.triggerSignalObserved,
  branchMeetingMatcherEstablished: false as const,
  meetingSufficiencyEstablished: false as const,
  semanticNecessityEstablished: false as const,
  temporalActivationSufficiencyEstablished: false as const,
  perMemberActivationAuthorized: false as const,
  runtimeActivationFactAuthorized: false as const,
  activationPersistenceVerdictAuthorized: false as const,
  effectiveForceAuthorized: false as const,
  fixedPolarityAuthorized: false as const,
  deterministicEventAuthorized: false as const,
  interpretationClaimEmissionAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export interface R161GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R060' | 'R073' | 'R146' | 'R157' | 'R159' | 'R160';
  boundary: string;
  satisfied: boolean;
  branchMeetingMatcherAuthorized: false;
  executableActivationResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R161GovernanceGuard,
    | 'branchMeetingMatcherAuthorized'
    | 'executableActivationResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R161GovernanceGuard =>
  Object.freeze({
    ...value,
    branchMeetingMatcherAuthorized: false,
    executableActivationResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R161_GOVERNANCE_GUARDS: readonly R161GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R161-GUARD-R060',
      upstreamAsset: 'R060',
      boundary:
        'Branch meeting remains a distinct configuration mechanism and does not activate each hidden stem independently.',
      satisfied:
        R060_AUTHORITY.meetingDistinctFromTouGan &&
        !R060_AUTHORITY.genericInteractionActivationAuthorized &&
        !R060_AUTHORITY.executableResolverAuthorized,
    }),
    guard({
      guardId: 'R161-GUARD-R073',
      upstreamAsset: 'R073',
      boundary:
        'Natal-luck meeting remains source-bounded activation language without permanent mutation, concrete event, or executable timing authority.',
      satisfied:
        !R073_AUTHORITY.activationImpliesPermanentNatalChange &&
        !R073_AUTHORITY.activationImpliesConcreteEvent &&
        !R073_AUTHORITY.executableTimingResolverAuthorized,
    }),
    guard({
      guardId: 'R161-GUARD-R146',
      upstreamAsset: 'R146',
      boundary:
        'Source-bounded meeting interaction remains distinct from runtime activation, per-member activation, persistence, and force.',
      satisfied:
        r146Meeting.sourceBoundedInteractionObserved &&
        r146Meeting.sourceActivationLanguageObserved &&
        !R146_AUTHORITY.runtimeActivationFactAuthorized &&
        !R146_AUTHORITY.perMemberActivationResolverAuthorized &&
        !R146_AUTHORITY.activationPersistenceVerdictAuthorized &&
        !R146_AUTHORITY.effectiveForceAuthorized,
    }),
    guard({
      guardId: 'R161-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Natal-luck meeting remains an observed trigger class without an authorized trigger predicate or executable resolver.',
      satisfied:
        R157_AUTHORITY.natalLuckMeetingActivationClassObserved &&
        R157_AUTHORITY.matchingGapsPreserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.executableTriggerResolverAuthorized,
    }),
    guard({
      guardId: 'R161-GUARD-R159',
      upstreamAsset: 'R159',
      boundary:
        'Source replay does not close the temporal trigger sufficiency gap.',
      satisfied:
        R159_AUTHORITY.temporalTriggerSufficiencyGapPreserved &&
        !R159_AUTHORITY.exactTemporalTriggerMinimalPredicateSetEstablished &&
        !R159_AUTHORITY.boundedTemporalTriggerOutcomeSufficiencyEstablished &&
        !r159Meeting.exactMinimalPredicateSetEstablished &&
        !r159Meeting.boundedOutcomeSufficiencyEstablished,
    }),
    guard({
      guardId: 'R161-GUARD-R160',
      upstreamAsset: 'R160',
      boundary:
        'R160 source replay remains distinct from semantic necessity and activation sufficiency; R161 preserves the same methodological boundary.',
      satisfied:
        R160_AUTHORITY.exactYinSourceReplayPredicateSetEstablished &&
        R160_AUTHORITY.sourceReplayDistinctFromSemanticNecessityObserved &&
        R160_AUTHORITY.sourceReplayDistinctFromActivationSufficiencyObserved &&
        !R160_AUTHORITY.exactTemporalActivationSufficiencyEstablished,
    }),
  ]);

export const R161_REJECTED_SHORTCUTS = Object.freeze([
  'NATAL_BRANCH_PLUS_LUCK_BRANCH_EQUALS_MEETING',
  'MEETING_ASSERTION_EQUALS_MEETING_MATCHER',
  'SOURCE_REPLAY_GATES_EQUAL_SEMANTIC_NECESSITY',
  'MEETING_SOURCE_REPLAY_EQUALS_TEMPORAL_ACTIVATION_SUFFICIENCY',
  'MEETING_ACTIVATES_EACH_HIDDEN_STEM',
  'MEETING_EQUALS_TOU_GAN',
  'QING_LANGUAGE_EQUALS_FIXED_FAVORABLE_POLARITY',
  'QING_LANGUAGE_EQUALS_DETERMINISTIC_EVENT',
  'MEETING_ASSERTION_EQUALS_PERMANENT_NATAL_MUTATION',
  'MEETING_ASSERTION_EQUALS_FIXED_EFFECTIVE_FORCE',
  'REMOVAL_FROM_REPLAY_PROVES_OPPOSITE_ASTROLOGICAL_OUTCOME',
  'SOURCE_REPLAY_PREDICATES_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R161_SUMMARY = Object.freeze({
  replayPredicateCount: R161_REPLAY_PREDICATES.length,
  removalVariantCount: R161_REMOVAL_VARIANTS.length,
  removalBlocksExactSourceReplayCount: R161_REMOVAL_VARIANTS.filter(
    (item) => !item.exactSourceReplayEligible,
  ).length,
  branchMeetingMatcherEstablishedPredicateCount:
    R161_REPLAY_PREDICATES.filter(
      (item) => item.branchMeetingMatcherEstablished,
    ).length,
  semanticNecessityEstablishedPredicateCount:
    R161_REPLAY_PREDICATES.filter(
      (item) => item.semanticNecessityEstablished,
    ).length,
  activationSufficiencyEstablishedPredicateCount:
    R161_REPLAY_PREDICATES.filter(
      (item) => item.activationSufficiencyEstablished,
    ).length,
  runtimeActivationAuthorizedPredicateCount:
    R161_REPLAY_PREDICATES.filter(
      (item) => item.runtimeActivationFactAuthorized,
    ).length,
  governanceGuardCount: R161_GOVERNANCE_GUARDS.length,
});

export const R161_UPSTREAM_BINDINGS = Object.freeze({
  r060: {
    version: R060_HIDDEN_STEM_INTERACTION_VERSION,
    sourceMeaning: r060Meeting.sourceMeaning,
    meetingDistinctFromTouGan: R060_AUTHORITY.meetingDistinctFromTouGan,
    genericInteractionActivationAuthorized:
      R060_AUTHORITY.genericInteractionActivationAuthorized,
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    sourceRepresentation: r073Meeting.sourceRepresentation,
    activationImpliesConcreteEvent:
      R073_AUTHORITY.activationImpliesConcreteEvent,
  },
  r146: {
    version: R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
    sourceBoundedInteractionObserved:
      r146Meeting.sourceBoundedInteractionObserved,
    sourceActivationLanguageObserved:
      r146Meeting.sourceActivationLanguageObserved,
    runtimeActivationFactAuthorized:
      R146_AUTHORITY.runtimeActivationFactAuthorized,
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    natalLuckMeetingActivationClassObserved:
      R157_AUTHORITY.natalLuckMeetingActivationClassObserved,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
  },
  r159: {
    version: R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
    temporalTriggerSufficiencyGapPreserved:
      R159_AUTHORITY.temporalTriggerSufficiencyGapPreserved,
    exactTemporalTriggerMinimalPredicateSetEstablished:
      R159_AUTHORITY.exactTemporalTriggerMinimalPredicateSetEstablished,
  },
  r160: {
    version: R160_YIN_TRANSPARENCY_SOURCE_REPLAY_PREDICATE_VERSION,
    sourceReplayDistinctFromSemanticNecessityObserved:
      R160_AUTHORITY.sourceReplayDistinctFromSemanticNecessityObserved,
    sourceReplayDistinctFromActivationSufficiencyObserved:
      R160_AUTHORITY.sourceReplayDistinctFromActivationSufficiencyObserved,
  },
});

export const R161_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_NATAL_LUCK_MEETING_SOURCE_REPLAY_BOUNDARY_COMPLETE' as const,
  researchOnly: true,
  directMeetingSourceFixtureBound: true,
  natalParticipantAssertionPreserved: true,
  luckParticipantAssertionPreserved: true,
  meetingConfigurationAssertionPreserved: true,
  sourceBoundedQingObservationPreserved: true,
  exactSourceReplayPredicateSetEstablished: true,
  exactSourceReplayGateRemovalAuditEstablished: true,
  sourceReplayDistinctFromMeetingMatchingObserved: true,
  sourceReplayDistinctFromSemanticNecessityObserved: true,
  sourceReplayDistinctFromActivationSufficiencyObserved: true,
  branchMeetingMatcherEstablished: false,
  meetingSufficiencyEstablished: false,
  semanticPredicateNecessityEstablished: false,
  exactTemporalActivationSufficiencyEstablished: false,
  perMemberActivationResolverAuthorized: false,
  runtimeActivationFactAuthorized: false,
  activationPersistenceVerdictAuthorized: false,
  effectiveForceAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
