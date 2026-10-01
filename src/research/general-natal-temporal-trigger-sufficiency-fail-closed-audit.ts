import {
  R072_AUTHORITY,
  R072_DAYUN_NATAL_INTERACTION_VERSION,
  R072_EXECUTION_GAPS,
} from './general-natal-dayun-natal-interaction.js';
import {
  R073_AUTHORITY,
  R073_EXECUTION_GAPS,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R076_AUTHORITY,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R150_AUTHORITY,
  R150_BOUNDED_CLAIM_CONTRACTS,
  R150_MINIMAL_INTERACTION_PREDICATE_SET_VERSION,
} from './general-natal-minimal-interaction-predicate-set-executable-claims.js';
import {
  R157_AUTHORITY,
  R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
  R157_TRIGGER_ROWS,
  type R157TriggerClass,
} from './general-natal-temporal-trigger-matching-provenance-boundary-corpus.js';
import {
  R158_AUTHORITY,
  R158_COMPETING_TEMPORAL_TRIGGER_COEXISTENCE_VERSION,
} from './general-natal-competing-temporal-trigger-coexistence-boundary-corpus.js';

export const R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION =
  '0.1.0-research' as const;

export type R159SufficiencyState =
  | 'OBSERVED_TRIGGER_NOT_SUFFICIENT'
  | 'SOURCE_BOUNDED_POSITIVE_CONTROL';

export interface R159TriggerSufficiencyRow {
  rowId: string;
  triggerClass: Exclude<
    R157TriggerClass,
    'GENERIC_INTERACTION_ACTIVATION_CONTROL'
  >;
  sourceRefs: readonly string[];
  blockingGaps: readonly string[];
  triggerObserved: true;
  sufficiencyState: 'OBSERVED_TRIGGER_NOT_SUFFICIENT';
  exactMinimalPredicateSetEstablished: false;
  boundedOutcomeSufficiencyEstablished: false;
  genericOutcomeSufficiencyEstablished: false;
  matchingSufficiencyEstablished: false;
  settlementSufficiencyEstablished: false;
  automaticOutcomeAuthorized: false;
  fixedPolarityAuthorized: false;
  deterministicEventAuthorized: false;
  executableOutcomeResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const trigger = (
  value: Omit<
    R159TriggerSufficiencyRow,
    | 'triggerObserved'
    | 'sufficiencyState'
    | 'exactMinimalPredicateSetEstablished'
    | 'boundedOutcomeSufficiencyEstablished'
    | 'genericOutcomeSufficiencyEstablished'
    | 'matchingSufficiencyEstablished'
    | 'settlementSufficiencyEstablished'
    | 'automaticOutcomeAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'executableOutcomeResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R159TriggerSufficiencyRow =>
  Object.freeze({
    ...value,
    triggerObserved: true,
    sufficiencyState: 'OBSERVED_TRIGGER_NOT_SUFFICIENT',
    exactMinimalPredicateSetEstablished: false,
    boundedOutcomeSufficiencyEstablished: false,
    genericOutcomeSufficiencyEstablished: false,
    matchingSufficiencyEstablished: false,
    settlementSufficiencyEstablished: false,
    automaticOutcomeAuthorized: false,
    fixedPolarityAuthorized: false,
    deterministicEventAuthorized: false,
    executableOutcomeResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

const observed = (
  triggerClass: Exclude<
    R157TriggerClass,
    'GENERIC_INTERACTION_ACTIVATION_CONTROL'
  >,
) => {
  const row = R157_TRIGGER_ROWS.find((item) => item.triggerClass === triggerClass);
  if (row === undefined || !row.triggerSignalObserved) {
    throw new Error('R159 missing observed R157 trigger: ' + triggerClass);
  }
  return row;
};

export const R159_TRIGGER_SUFFICIENCY_ROWS: readonly R159TriggerSufficiencyRow[] =
  Object.freeze([
    trigger({
      rowId: 'R159-01',
      triggerClass: 'TRANSPARENCY_ACTIVATION',
      sourceRefs: observed('TRANSPARENCY_ACTIVATION').sourceRefs,
      blockingGaps: ['R073:ACTIVATION_TRIGGER_MATCHING'],
      notes: [
        'Transparency is an observed trigger class, not a sufficient runtime activation contract.',
        'No minimal source-backed predicate set is established for per-member activation.',
      ],
    }),
    trigger({
      rowId: 'R159-02',
      triggerClass: 'NATAL_LUCK_MEETING_ACTIVATION',
      sourceRefs: observed('NATAL_LUCK_MEETING_ACTIVATION').sourceRefs,
      blockingGaps: ['R073:ACTIVATION_TRIGGER_MATCHING'],
      notes: [
        'Natal–luck meeting is an observed activation class without executable sufficiency.',
        'Meeting presence alone cannot close matching, persistence, force, polarity, or event semantics.',
      ],
    }),
    trigger({
      rowId: 'R159-03',
      triggerClass: 'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
      sourceRefs: observed('DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE').sourceRefs,
      blockingGaps: [
        'R072:LUCK_TO_NATAL_INTERACTION_MATCHING',
        'R072:CHANGE_SUFFICIENCY',
      ],
      notes: [
        'R072 explicitly preserves change sufficiency as unresolved.',
        'Meeting/clash participation does not itself prove a structural-change outcome.',
      ],
    }),
    trigger({
      rowId: 'R159-04',
      triggerClass: 'BREAK_TRIGGER',
      sourceRefs: observed('BREAK_TRIGGER').sourceRefs,
      blockingGaps: [
        'R076:BREAK_TRIGGER_MATCHING',
        'R076:CHANGE_SETTLEMENT',
      ],
      notes: [
        'The retained break example is configuration-specific and automaticOutcome=false.',
        'No generic or bounded minimal predicate contract has been established for temporal break outcomes.',
      ],
    }),
    trigger({
      rowId: 'R159-05',
      triggerClass: 'NATAL_RESCUE_TRIGGER',
      sourceRefs: observed('NATAL_RESCUE_TRIGGER').sourceRefs,
      blockingGaps: [
        'R076:RESCUE_TRIGGER_MATCHING',
        'R076:CHANGE_SETTLEMENT',
      ],
      notes: [
        'The retained rescue example does not authorize one-symbol rescue sufficiency.',
        'Matching and final settlement remain separate unresolved authorities.',
      ],
    }),
    trigger({
      rowId: 'R159-06',
      triggerClass: 'COUNTERFORCE_TRIGGER',
      sourceRefs: observed('COUNTERFORCE_TRIGGER').sourceRefs,
      blockingGaps: [
        'R076:COUNTERFORCE_PRECEDENCE',
        'R076:CHANGE_SETTLEMENT',
      ],
      notes: [
        'Counterforce presence does not establish sufficiency to block change.',
        'Precedence and settlement remain unresolved.',
      ],
    }),
  ]);

export const R159_R150_POSITIVE_CONTROL = Object.freeze({
  controlId: 'R159-CONTROL-R150',
  sufficiencyState: 'SOURCE_BOUNDED_POSITIVE_CONTROL' as const,
  version: R150_MINIMAL_INTERACTION_PREDICATE_SET_VERSION,
  contractCount: R150_BOUNDED_CLAIM_CONTRACTS.length,
  exactPredicateContractObserved:
    R150_AUTHORITY.boundedPerClashContractPredicateSetEstablished &&
    R150_AUTHORITY.boundedAggregateContractPredicateSetEstablished,
  boundedSourceSufficiencyObserved:
    R150_AUTHORITY.boundedSourceSufficiencyObserved,
  boundedEvidenceExecutionAuthorized:
    R150_BOUNDED_CLAIM_CONTRACTS.every(
      (item) => item.boundedEvidenceExecutionAuthorized,
    ),
  temporalTriggerGeneralizationAuthorized: false as const,
  interpretationClaimEmissionAuthorized: false as const,
  productionAuthorityPromoted: false as const,
  meaning:
    'R150 demonstrates the standard for bounded sufficiency: an exact, source-bounded predicate contract with fail-closed gates. That contract is not reusable as temporal-trigger authority.',
});

export interface R159GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R072' | 'R073' | 'R076' | 'R150' | 'R157' | 'R158';
  boundary: string;
  satisfied: boolean;
  temporalTriggerSufficiencyAuthorized: false;
  executableOutcomeResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R159GovernanceGuard,
    | 'temporalTriggerSufficiencyAuthorized'
    | 'executableOutcomeResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R159GovernanceGuard =>
  Object.freeze({
    ...value,
    temporalTriggerSufficiencyAuthorized: false,
    executableOutcomeResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R159_GOVERNANCE_GUARDS: readonly R159GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R159-GUARD-R072',
      upstreamAsset: 'R072',
      boundary:
        'Dayun interaction matching, completion/change sufficiency, precedence, and temporal effect settlement remain unresolved.',
      satisfied:
        R072_EXECUTION_GAPS.includes('LUCK_TO_NATAL_INTERACTION_MATCHING') &&
        R072_EXECUTION_GAPS.includes('COMPLETION_SUFFICIENCY') &&
        R072_EXECUTION_GAPS.includes('CHANGE_SUFFICIENCY') &&
        R072_EXECUTION_GAPS.includes('TEMPORAL_EFFECT_SETTLEMENT') &&
        !R072_AUTHORITY.executableDayunInteractionResolverAuthorized,
    }),
    guard({
      guardId: 'R159-GUARD-R073',
      upstreamAsset: 'R073',
      boundary:
        'Activation trigger matching remains unresolved and activation does not authorize permanent mutation, concrete events, or executable timing.',
      satisfied:
        R073_EXECUTION_GAPS.includes('ACTIVATION_TRIGGER_MATCHING') &&
        !R073_AUTHORITY.activationImpliesPermanentNatalChange &&
        !R073_AUTHORITY.activationImpliesConcreteEvent &&
        !R073_AUTHORITY.executableTimingResolverAuthorized,
    }),
    guard({
      guardId: 'R159-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Break/rescue matching, counterforce precedence, and change settlement remain unresolved.',
      satisfied:
        R076_EXECUTION_GAPS.includes('BREAK_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('RESCUE_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('COUNTERFORCE_PRECEDENCE') &&
        R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT') &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R159-GUARD-R150',
      upstreamAsset: 'R150',
      boundary:
        'Bounded sufficiency requires an explicit minimal predicate contract; R150 is a positive control, not generic temporal authority.',
      satisfied:
        R150_AUTHORITY.boundedSourceSufficiencyObserved &&
        R150_AUTHORITY.contractMinimalityScopedToI45I46I47 &&
        !R150_AUTHORITY.genericInteractionResolverAuthorized &&
        !R150_AUTHORITY.interpretationClaimEmissionAuthorized,
    }),
    guard({
      guardId: 'R159-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Observed trigger classes remain distinct from executable trigger predicates and deterministic outcomes.',
      satisfied:
        R157_AUTHORITY.triggerClassObservationsPreserved &&
        R157_AUTHORITY.matchingGapsPreserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.executableTriggerResolverAuthorized &&
        !R157_AUTHORITY.deterministicEventAuthorized,
    }),
    guard({
      guardId: 'R159-GUARD-R158',
      upstreamAsset: 'R158',
      boundary:
        'Competing trigger coexistence remains distinct from settlement, precedence, and winner selection.',
      satisfied:
        R158_AUTHORITY.coexistenceDistinctFromSettlementObserved &&
        !R158_AUTHORITY.triggerWinnerAuthorized &&
        !R158_AUTHORITY.triggerPrecedenceAuthorized &&
        !R158_AUTHORITY.executableTriggerSettlementAuthorized,
    }),
  ]);

export const R159_REJECTED_SUFFICIENCY_SHORTCUTS = Object.freeze([
  'OBSERVED_TRIGGER_EQUALS_SUFFICIENT_OUTCOME',
  'DIRECT_QUOTE_EQUALS_EXECUTABLE_SUFFICIENCY',
  'SOURCE_CASE_EQUALS_GENERIC_PREDICATE_CONTRACT',
  'TRANSPARENCY_EQUALS_SUFFICIENT_RUNTIME_ACTIVATION',
  'MEETING_EQUALS_SUFFICIENT_RUNTIME_ACTIVATION',
  'MEETING_OR_CLASH_EQUALS_SUFFICIENT_STRUCTURAL_CHANGE',
  'BREAK_TRIGGER_EQUALS_SUFFICIENT_BREAK_OUTCOME',
  'RESCUE_TRIGGER_EQUALS_SUFFICIENT_RESCUE_OUTCOME',
  'COUNTERFORCE_PRESENCE_EQUALS_SUFFICIENT_BLOCKING_OUTCOME',
  'TRIGGER_MATCHING_GAP_CAN_BE_FILLED_BY_ARRAY_ORDER',
  'TRIGGER_SUFFICIENCY_CAN_BE_FILLED_BY_NUMERIC_SCORE',
  'R150_BOUNDED_CONTRACT_GENERALIZES_TO_TEMPORAL_TRIGGERS',
  'SUFFICIENCY_EQUALS_FIXED_POLARITY',
  'SUFFICIENCY_EQUALS_DETERMINISTIC_EVENT',
  'TEMPORAL_TRIGGER_SUFFICIENCY_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const countFlag = (
  key:
    | 'exactMinimalPredicateSetEstablished'
    | 'boundedOutcomeSufficiencyEstablished'
    | 'genericOutcomeSufficiencyEstablished'
    | 'matchingSufficiencyEstablished'
    | 'settlementSufficiencyEstablished'
    | 'automaticOutcomeAuthorized'
    | 'deterministicEventAuthorized'
    | 'executableOutcomeResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted',
): number => R159_TRIGGER_SUFFICIENCY_ROWS.filter((item) => item[key]).length;

export const R159_SUMMARY = Object.freeze({
  triggerRowCount: R159_TRIGGER_SUFFICIENCY_ROWS.length,
  observedTriggerCount: R159_TRIGGER_SUFFICIENCY_ROWS.filter(
    (item) => item.triggerObserved,
  ).length,
  exactMinimalPredicateSetEstablishedCount: countFlag(
    'exactMinimalPredicateSetEstablished',
  ),
  boundedOutcomeSufficiencyEstablishedCount: countFlag(
    'boundedOutcomeSufficiencyEstablished',
  ),
  genericOutcomeSufficiencyEstablishedCount: countFlag(
    'genericOutcomeSufficiencyEstablished',
  ),
  matchingSufficiencyEstablishedCount: countFlag(
    'matchingSufficiencyEstablished',
  ),
  settlementSufficiencyEstablishedCount: countFlag(
    'settlementSufficiencyEstablished',
  ),
  automaticOutcomeAuthorizedCount: countFlag('automaticOutcomeAuthorized'),
  deterministicEventAuthorizedCount: countFlag('deterministicEventAuthorized'),
  executableOutcomeResolverAuthorizedCount: countFlag(
    'executableOutcomeResolverAuthorized',
  ),
  interpretationClaimEmissionAuthorizedCount: countFlag(
    'interpretationClaimEmissionAuthorized',
  ),
  productionAuthorityPromotedCount: countFlag('productionAuthorityPromoted'),
  governanceGuardCount: R159_GOVERNANCE_GUARDS.length,
  positiveControlContractCount: R159_R150_POSITIVE_CONTROL.contractCount,
});

export const R159_UPSTREAM_BINDINGS = Object.freeze({
  r072: {
    version: R072_DAYUN_NATAL_INTERACTION_VERSION,
    completionSufficiencyGap:
      R072_EXECUTION_GAPS.includes('COMPLETION_SUFFICIENCY'),
    changeSufficiencyGap:
      R072_EXECUTION_GAPS.includes('CHANGE_SUFFICIENCY'),
    temporalEffectSettlementGap:
      R072_EXECUTION_GAPS.includes('TEMPORAL_EFFECT_SETTLEMENT'),
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    activationTriggerMatchingGap:
      R073_EXECUTION_GAPS.includes('ACTIVATION_TRIGGER_MATCHING'),
    activationImpliesConcreteEvent:
      R073_AUTHORITY.activationImpliesConcreteEvent,
  },
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    breakTriggerMatchingGap:
      R076_EXECUTION_GAPS.includes('BREAK_TRIGGER_MATCHING'),
    rescueTriggerMatchingGap:
      R076_EXECUTION_GAPS.includes('RESCUE_TRIGGER_MATCHING'),
    counterforcePrecedenceGap:
      R076_EXECUTION_GAPS.includes('COUNTERFORCE_PRECEDENCE'),
    changeSettlementGap:
      R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT'),
  },
  r150: {
    version: R150_MINIMAL_INTERACTION_PREDICATE_SET_VERSION,
    boundedSourceSufficiencyObserved:
      R150_AUTHORITY.boundedSourceSufficiencyObserved,
    genericInteractionResolverAuthorized:
      R150_AUTHORITY.genericInteractionResolverAuthorized,
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    triggerClassObservationsPreserved:
      R157_AUTHORITY.triggerClassObservationsPreserved,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
    executableTriggerResolverAuthorized:
      R157_AUTHORITY.executableTriggerResolverAuthorized,
  },
  r158: {
    version: R158_COMPETING_TEMPORAL_TRIGGER_COEXISTENCE_VERSION,
    coexistenceDistinctFromSettlementObserved:
      R158_AUTHORITY.coexistenceDistinctFromSettlementObserved,
    triggerWinnerAuthorized: R158_AUTHORITY.triggerWinnerAuthorized,
    executableTriggerSettlementAuthorized:
      R158_AUTHORITY.executableTriggerSettlementAuthorized,
  },
});

export const R159_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_TEMPORAL_TRIGGER_SUFFICIENCY_FAIL_CLOSED_AUDIT_COMPLETE' as const,
  researchOnly: true,
  observedTriggerClassesAudited: true,
  boundedSufficiencyStandardPositiveControlObserved: true,
  temporalTriggerSufficiencyGapPreserved: true,
  matchingDistinctFromSufficiencyObserved: true,
  coexistenceDistinctFromSufficiencyObserved: true,
  sourceCaseDistinctFromPredicateContractObserved: true,
  exactTemporalTriggerMinimalPredicateSetEstablished: false,
  boundedTemporalTriggerOutcomeSufficiencyEstablished: false,
  genericTemporalTriggerOutcomeSufficiencyEstablished: false,
  automaticActivationOutcomeAuthorized: false,
  automaticStructuralChangeOutcomeAuthorized: false,
  automaticBreakOutcomeAuthorized: false,
  automaticRescueOutcomeAuthorized: false,
  automaticCounterforceOutcomeAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  executableTemporalTriggerOutcomeResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
