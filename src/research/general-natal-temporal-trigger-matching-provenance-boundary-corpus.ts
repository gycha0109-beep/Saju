import {
  R060_AUTHORITY,
  R060_EXECUTION_GAPS,
  R060_HIDDEN_STEM_INTERACTION_VERSION,
} from './general-natal-hidden-stem-interaction-boundary.js';
import {
  R072_AUTHORITY,
  R072_DAYUN_NATAL_INTERACTION_VERSION,
  R072_EXECUTION_GAPS,
  R072_INTERACTION_CLASSES,
} from './general-natal-dayun-natal-interaction.js';
import {
  R073_AUTHORITY,
  R073_EXECUTION_GAPS,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R076_AUTHORITY,
  R076_CASES,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R146_AUTHORITY,
  R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
} from './general-natal-hidden-stem-activation-provenance-interaction-event-corpus.js';
import {
  R156_AUTHORITY,
  R156_NESTED_TEMPORAL_DURATION_EXPIRY_VERSION,
} from './general-natal-nested-temporal-duration-expiry-boundary-corpus.js';

export const R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION =
  '0.1.0-research' as const;

export type R157TriggerClass =
  | 'TRANSPARENCY_ACTIVATION'
  | 'NATAL_LUCK_MEETING_ACTIVATION'
  | 'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE'
  | 'BREAK_TRIGGER'
  | 'NATAL_RESCUE_TRIGGER'
  | 'COUNTERFORCE_TRIGGER'
  | 'GENERIC_INTERACTION_ACTIVATION_CONTROL';

export type R157TriggerProvenance =
  | 'R073_TEMPORAL_STATE'
  | 'R072_INTERACTION_CLASS'
  | 'R076_CONFIGURATION_CASE'
  | 'R060_R146_NEGATIVE_CONTROL';

export interface R157TemporalTriggerRow {
  rowId: string;
  triggerClass: R157TriggerClass;
  provenance: R157TriggerProvenance;
  upstreamKey: string;
  sourceRepresentation: string;
  sourceRefs: readonly string[];
  triggerSignalObserved: boolean;
  configurationSpecificObserved: boolean;
  matchingGapIds: readonly string[];
  matchingGapPreserved: true;
  durationBoundaryPreserved: true;
  triggerPredicateAuthorized: false;
  perMemberActivationAuthorized: false;
  genericInteractionActivationAuthorized: false;
  automaticStructuralChangeAuthorized: false;
  automaticBreakAuthorized: false;
  automaticRescueAuthorized: false;
  automaticCounterforceAuthorized: false;
  fixedPolarityAuthorized: false;
  deterministicEventAuthorized: false;
  numericTriggerScoreAuthorized: false;
  executableTriggerResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const triggerRow = (
  value: Omit<
    R157TemporalTriggerRow,
    | 'matchingGapPreserved'
    | 'durationBoundaryPreserved'
    | 'triggerPredicateAuthorized'
    | 'perMemberActivationAuthorized'
    | 'genericInteractionActivationAuthorized'
    | 'automaticStructuralChangeAuthorized'
    | 'automaticBreakAuthorized'
    | 'automaticRescueAuthorized'
    | 'automaticCounterforceAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'numericTriggerScoreAuthorized'
    | 'executableTriggerResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R157TemporalTriggerRow =>
  Object.freeze({
    ...value,
    matchingGapPreserved: true,
    durationBoundaryPreserved: true,
    triggerPredicateAuthorized: false,
    perMemberActivationAuthorized: false,
    genericInteractionActivationAuthorized: false,
    automaticStructuralChangeAuthorized: false,
    automaticBreakAuthorized: false,
    automaticRescueAuthorized: false,
    automaticCounterforceAuthorized: false,
    fixedPolarityAuthorized: false,
    deterministicEventAuthorized: false,
    numericTriggerScoreAuthorized: false,
    executableTriggerResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

const r073Transparency = R073_STATE_MODEL.find(
  (item) => item.state === 'ACTIVATED_BY_TRANSPARENCY',
);
const r073Meeting = R073_STATE_MODEL.find(
  (item) => item.state === 'ACTIVATED_BY_NATAL_LUCK_MEETING',
);
const r072StructuralChange = R072_INTERACTION_CLASSES.find(
  (item) => item.interaction === 'STRUCTURAL_CHANGE',
);
const r076Break = R076_CASES.find(
  (item) => item.mechanism === 'BREAK_TRIGGER',
);
const r076Rescue = R076_CASES.find(
  (item) => item.mechanism === 'NATAL_RESCUE',
);
const r076Counterforce = R076_CASES.find(
  (item) => item.mechanism === 'COUNTERFORCE_BLOCKS_CHANGE',
);

if (
  r073Transparency === undefined ||
  r073Meeting === undefined ||
  r072StructuralChange === undefined ||
  r076Break === undefined ||
  r076Rescue === undefined ||
  r076Counterforce === undefined
) {
  throw new Error('R157 missing required temporal trigger fixture');
}

export const R157_TRIGGER_ROWS: readonly R157TemporalTriggerRow[] =
  Object.freeze([
    triggerRow({
      rowId: 'R157-01',
      triggerClass: 'TRANSPARENCY_ACTIVATION',
      provenance: 'R073_TEMPORAL_STATE',
      upstreamKey: r073Transparency.state,
      sourceRepresentation: r073Transparency.sourceRepresentation,
      sourceRefs: [
        'R073:ACTIVATED_BY_TRANSPARENCY',
        'R146:R073_TEMPORAL_STATE_REPLAY',
      ],
      triggerSignalObserved: true,
      configurationSpecificObserved: true,
      matchingGapIds: ['R073:ACTIVATION_TRIGGER_MATCHING'],
      notes: [
        'Transparency is retained as a source-bounded activation trigger class.',
        'Visibility alone does not authorize a generic per-member activation predicate.',
      ],
    }),
    triggerRow({
      rowId: 'R157-02',
      triggerClass: 'NATAL_LUCK_MEETING_ACTIVATION',
      provenance: 'R073_TEMPORAL_STATE',
      upstreamKey: r073Meeting.state,
      sourceRepresentation: r073Meeting.sourceRepresentation,
      sourceRefs: [
        'R073:ACTIVATED_BY_NATAL_LUCK_MEETING',
        'R146:R073_TEMPORAL_STATE_REPLAY',
      ],
      triggerSignalObserved: true,
      configurationSpecificObserved: true,
      matchingGapIds: ['R073:ACTIVATION_TRIGGER_MATCHING'],
      notes: [
        'Natal–luck meeting is retained as a distinct activation trigger class.',
        'Meeting presence does not activate every hidden member independently.',
      ],
    }),
    triggerRow({
      rowId: 'R157-03',
      triggerClass: 'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
      provenance: 'R072_INTERACTION_CLASS',
      upstreamKey: r072StructuralChange.id,
      sourceRepresentation: r072StructuralChange.sourceRepresentation,
      sourceRefs: [
        'R072:LUCK-MEETING-CLASH-STRUCTURAL-CHANGE',
        'R060:MEETING_CONFIGURATION_EFFECT',
        'R060:CLASH_MOVEMENT_EFFECT',
      ],
      triggerSignalObserved: true,
      configurationSpecificObserved: true,
      matchingGapIds: [
        'R072:LUCK_TO_NATAL_INTERACTION_MATCHING',
        'R072:CHANGE_SUFFICIENCY',
      ],
      notes: [
        'Meeting or clash may participate in structural-change cases.',
        'Relation presence alone does not authorize automatic structural change.',
      ],
    }),
    triggerRow({
      rowId: 'R157-04',
      triggerClass: 'BREAK_TRIGGER',
      provenance: 'R076_CONFIGURATION_CASE',
      upstreamKey: r076Break.id,
      sourceRepresentation: r076Break.sourceRepresentation,
      sourceRefs: ['R076:BREAK_TRIGGER', 'R151:BREAK_TRIGGER_OVERLAY'],
      triggerSignalObserved: true,
      configurationSpecificObserved: true,
      matchingGapIds: ['R076:BREAK_TRIGGER_MATCHING'],
      notes: [
        'The break trigger remains tied to its retained configuration-specific source case.',
        'The corpus does not generalize one observed break trigger into a global rule.',
      ],
    }),
    triggerRow({
      rowId: 'R157-05',
      triggerClass: 'NATAL_RESCUE_TRIGGER',
      provenance: 'R076_CONFIGURATION_CASE',
      upstreamKey: r076Rescue.id,
      sourceRepresentation: r076Rescue.sourceRepresentation,
      sourceRefs: ['R076:NATAL_RESCUE', 'R151:RESCUE_OVERLAY'],
      triggerSignalObserved: true,
      configurationSpecificObserved: true,
      matchingGapIds: ['R076:RESCUE_TRIGGER_MATCHING'],
      notes: [
        'Natal rescue is retained as a configuration-specific trigger class.',
        'Presence of one rescue symbol does not authorize automatic rescue settlement.',
      ],
    }),
    triggerRow({
      rowId: 'R157-06',
      triggerClass: 'COUNTERFORCE_TRIGGER',
      provenance: 'R076_CONFIGURATION_CASE',
      upstreamKey: r076Counterforce.id,
      sourceRepresentation: r076Counterforce.sourceRepresentation,
      sourceRefs: ['R076:COUNTERFORCE_BLOCKS_CHANGE', 'R151:COUNTERFORCE_OVERLAY'],
      triggerSignalObserved: true,
      configurationSpecificObserved: true,
      matchingGapIds: [
        'R076:COUNTERFORCE_PRECEDENCE',
        'R076:CHANGE_SETTLEMENT',
      ],
      notes: [
        'Counterforce is retained as a configuration-specific blocking mechanism.',
        'Its presence does not authorize universal precedence or automatic blocking.',
      ],
    }),
    triggerRow({
      rowId: 'R157-07',
      triggerClass: 'GENERIC_INTERACTION_ACTIVATION_CONTROL',
      provenance: 'R060_R146_NEGATIVE_CONTROL',
      upstreamKey: 'GENERIC_INTERACTION_ACTIVATION_REJECTED',
      sourceRepresentation:
        'Hidden membership, manifestation, meeting, and clash remain distinct mechanisms; interaction presence does not establish generic runtime activation.',
      sourceRefs: ['R060:DISTINCT_MECHANISMS_ONLY', 'R146:ACTIVATION_PROVENANCE'],
      triggerSignalObserved: false,
      configurationSpecificObserved: false,
      matchingGapIds: [
        'R060:HIDDEN_STEM_ROLE_SELECTION',
        'R060:INTERACTION_EVENT_SETTLEMENT',
      ],
      notes: [
        'This negative control prevents trigger-class observations from collapsing into a generic interaction-activation rule.',
        'R146 keeps runtime activation facts and per-member activation resolution unauthorized.',
      ],
    }),
  ]);

export interface R157GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R060' | 'R072' | 'R073' | 'R076' | 'R146' | 'R156';
  boundary: string;
  satisfied: boolean;
  triggerPredicateAuthorized: false;
  executableTriggerResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R157GovernanceGuard,
    | 'triggerPredicateAuthorized'
    | 'executableTriggerResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R157GovernanceGuard =>
  Object.freeze({
    ...value,
    triggerPredicateAuthorized: false,
    executableTriggerResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R157_GOVERNANCE_GUARDS: readonly R157GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R157-GUARD-R060',
      upstreamAsset: 'R060',
      boundary:
        'Hidden membership, manifestation, meeting, and clash remain distinct; generic interaction activation and executable hidden-stem resolution remain unauthorized.',
      satisfied:
        !R060_AUTHORITY.genericInteractionActivationAuthorized &&
        !R060_AUTHORITY.executableResolverAuthorized &&
        R060_EXECUTION_GAPS.includes('HIDDEN_STEM_ROLE_SELECTION') &&
        R060_EXECUTION_GAPS.includes('INTERACTION_EVENT_SETTLEMENT'),
    }),
    guard({
      guardId: 'R157-GUARD-R072',
      upstreamAsset: 'R072',
      boundary:
        'Dayun–natal interaction classes do not authorize generic interaction matching, change sufficiency, or executable settlement.',
      satisfied:
        R072_EXECUTION_GAPS.includes('LUCK_TO_NATAL_INTERACTION_MATCHING') &&
        R072_EXECUTION_GAPS.includes('CHANGE_SUFFICIENCY') &&
        !R072_AUTHORITY.executableDayunInteractionResolverAuthorized,
    }),
    guard({
      guardId: 'R157-GUARD-R073',
      upstreamAsset: 'R073',
      boundary:
        'Temporal activation states preserve trigger-matching as an execution gap and do not imply permanent natal change or concrete events.',
      satisfied:
        R073_EXECUTION_GAPS.includes('ACTIVATION_TRIGGER_MATCHING') &&
        !R073_AUTHORITY.activationImpliesPermanentNatalChange &&
        !R073_AUTHORITY.activationImpliesConcreteEvent &&
        !R073_AUTHORITY.executableTimingResolverAuthorized,
    }),
    guard({
      guardId: 'R157-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Break, rescue, and counterforce examples remain configuration-specific while trigger matching, precedence, and settlement gaps stay unresolved.',
      satisfied:
        R076_EXECUTION_GAPS.includes('BREAK_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('RESCUE_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('COUNTERFORCE_PRECEDENCE') &&
        R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT') &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R157-GUARD-R146',
      upstreamAsset: 'R146',
      boundary:
        'Source-bounded activation language remains distinct from runtime activation facts, per-member activation, persistence verdicts, effective force, polarity, and events.',
      satisfied:
        R146_AUTHORITY.sourceBoundedInteractionDistinctFromRuntimeActivationObserved &&
        !R146_AUTHORITY.runtimeActivationFactAuthorized &&
        !R146_AUTHORITY.perMemberActivationResolverAuthorized &&
        !R146_AUTHORITY.activationPersistenceVerdictAuthorized &&
        !R146_AUTHORITY.concreteEventAuthorized &&
        !R146_AUTHORITY.effectiveForceAuthorized &&
        !R146_AUTHORITY.fixedPolarityAuthorized,
    }),
    guard({
      guardId: 'R157-GUARD-R156',
      upstreamAsset: 'R156',
      boundary:
        'Trigger matching remains separate from duration, expiry, return-to-baseline, and calendar-boundary resolution.',
      satisfied:
        R156_AUTHORITY.genericActivationDurationGapPreserved &&
        R156_AUTHORITY.breakRescueDurationGapPreserved &&
        R156_AUTHORITY.monthlyCalendarBoundaryGapPreserved &&
        !R156_AUTHORITY.universalFiveYearDurationAuthorized &&
        !R156_AUTHORITY.executableTimingResolverAuthorized,
    }),
  ]);

export const R157_REJECTED_TRIGGER_SHORTCUTS = Object.freeze([
  'TRANSPARENCY_ALWAYS_ACTIVATES_EVERY_HIDDEN_MEMBER',
  'NATAL_LUCK_MEETING_ALWAYS_ACTIVATES_EVERY_HIDDEN_MEMBER',
  'ANY_MEETING_OR_CLASH_CAUSES_STRUCTURAL_CHANGE',
  'BREAK_CASE_GENERALIZES_TO_ALL_SIMILAR_SYMBOLS',
  'ONE_RESCUE_SYMBOL_ALWAYS_RESCUES',
  'COUNTERFORCE_PRESENCE_ALWAYS_BLOCKS_CHANGE',
  'INTERACTION_PRESENCE_EQUALS_RUNTIME_ACTIVATION',
  'HIDDEN_MEMBERSHIP_EQUALS_TRIGGER_MATCH',
  'TRIGGER_CLASS_EQUALS_EXECUTABLE_PREDICATE',
  'TRIGGER_MATCH_EQUALS_FIXED_POLARITY',
  'TRIGGER_MATCH_EQUALS_CONCRETE_EVENT',
  'TRIGGER_COUNT_AS_SEVERITY',
  'TRIGGER_SCORE_AS_NUMERIC_WEIGHT',
  'TRIGGER_MATCHING_INHERITS_R073_FIVE_YEAR_DURATION',
  'TRIGGER_MATCHING_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const countFlag = (
  key:
    | 'triggerSignalObserved'
    | 'configurationSpecificObserved'
    | 'triggerPredicateAuthorized'
    | 'perMemberActivationAuthorized'
    | 'genericInteractionActivationAuthorized'
    | 'automaticStructuralChangeAuthorized'
    | 'automaticBreakAuthorized'
    | 'automaticRescueAuthorized'
    | 'automaticCounterforceAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'numericTriggerScoreAuthorized'
    | 'executableTriggerResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted',
): number => R157_TRIGGER_ROWS.filter((item) => item[key]).length;

export const R157_SUMMARY = Object.freeze({
  rowCount: R157_TRIGGER_ROWS.length,
  observedTriggerSignalCount: countFlag('triggerSignalObserved'),
  configurationSpecificObservedCount: countFlag(
    'configurationSpecificObserved',
  ),
  negativeControlCount: R157_TRIGGER_ROWS.filter(
    (item) => item.triggerClass === 'GENERIC_INTERACTION_ACTIVATION_CONTROL',
  ).length,
  triggerPredicateAuthorizedCount: countFlag('triggerPredicateAuthorized'),
  perMemberActivationAuthorizedCount: countFlag('perMemberActivationAuthorized'),
  genericInteractionActivationAuthorizedCount: countFlag(
    'genericInteractionActivationAuthorized',
  ),
  automaticStructuralChangeAuthorizedCount: countFlag(
    'automaticStructuralChangeAuthorized',
  ),
  automaticBreakAuthorizedCount: countFlag('automaticBreakAuthorized'),
  automaticRescueAuthorizedCount: countFlag('automaticRescueAuthorized'),
  automaticCounterforceAuthorizedCount: countFlag(
    'automaticCounterforceAuthorized',
  ),
  fixedPolarityAuthorizedCount: countFlag('fixedPolarityAuthorized'),
  deterministicEventAuthorizedCount: countFlag('deterministicEventAuthorized'),
  numericTriggerScoreAuthorizedCount: countFlag('numericTriggerScoreAuthorized'),
  executableTriggerResolverAuthorizedCount: countFlag(
    'executableTriggerResolverAuthorized',
  ),
  interpretationClaimEmissionAuthorizedCount: countFlag(
    'interpretationClaimEmissionAuthorized',
  ),
  productionAuthorityPromotedCount: countFlag(
    'productionAuthorityPromoted',
  ),
  governanceGuardCount: R157_GOVERNANCE_GUARDS.length,
});

export const R157_UPSTREAM_BINDINGS = Object.freeze({
  r060: {
    version: R060_HIDDEN_STEM_INTERACTION_VERSION,
    genericInteractionActivationAuthorized:
      R060_AUTHORITY.genericInteractionActivationAuthorized,
    executableResolverAuthorized: R060_AUTHORITY.executableResolverAuthorized,
    hiddenStemRoleSelectionGap:
      R060_EXECUTION_GAPS.includes('HIDDEN_STEM_ROLE_SELECTION'),
    interactionEventSettlementGap:
      R060_EXECUTION_GAPS.includes('INTERACTION_EVENT_SETTLEMENT'),
  },
  r072: {
    version: R072_DAYUN_NATAL_INTERACTION_VERSION,
    interactionClassCount: R072_AUTHORITY.interactionClassCount,
    luckToNatalInteractionMatchingGap:
      R072_EXECUTION_GAPS.includes('LUCK_TO_NATAL_INTERACTION_MATCHING'),
    changeSufficiencyGap:
      R072_EXECUTION_GAPS.includes('CHANGE_SUFFICIENCY'),
    executableDayunInteractionResolverAuthorized:
      R072_AUTHORITY.executableDayunInteractionResolverAuthorized,
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    activationTriggerMatchingGap:
      R073_EXECUTION_GAPS.includes('ACTIVATION_TRIGGER_MATCHING'),
    activationImpliesPermanentNatalChange:
      R073_AUTHORITY.activationImpliesPermanentNatalChange,
    activationImpliesConcreteEvent:
      R073_AUTHORITY.activationImpliesConcreteEvent,
    executableTimingResolverAuthorized:
      R073_AUTHORITY.executableTimingResolverAuthorized,
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
    globalBreakRecoveryToggleAuthorized:
      R076_AUTHORITY.globalBreakRecoveryToggleAuthorized,
    executableBreakRecoveryResolverAuthorized:
      R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
  },
  r146: {
    version: R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
    sourceBoundedInteractionDistinctFromRuntimeActivationObserved:
      R146_AUTHORITY.sourceBoundedInteractionDistinctFromRuntimeActivationObserved,
    runtimeActivationFactAuthorized:
      R146_AUTHORITY.runtimeActivationFactAuthorized,
    perMemberActivationResolverAuthorized:
      R146_AUTHORITY.perMemberActivationResolverAuthorized,
    activationPersistenceVerdictAuthorized:
      R146_AUTHORITY.activationPersistenceVerdictAuthorized,
    concreteEventAuthorized: R146_AUTHORITY.concreteEventAuthorized,
    effectiveForceAuthorized: R146_AUTHORITY.effectiveForceAuthorized,
    fixedPolarityAuthorized: R146_AUTHORITY.fixedPolarityAuthorized,
  },
  r156: {
    version: R156_NESTED_TEMPORAL_DURATION_EXPIRY_VERSION,
    genericActivationDurationGapPreserved:
      R156_AUTHORITY.genericActivationDurationGapPreserved,
    breakRescueDurationGapPreserved:
      R156_AUTHORITY.breakRescueDurationGapPreserved,
    monthlyCalendarBoundaryGapPreserved:
      R156_AUTHORITY.monthlyCalendarBoundaryGapPreserved,
    universalFiveYearDurationAuthorized:
      R156_AUTHORITY.universalFiveYearDurationAuthorized,
    executableTimingResolverAuthorized:
      R156_AUTHORITY.executableTimingResolverAuthorized,
  },
});

export const R157_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_BOUNDARY_COMPLETE' as const,
  researchOnly: true,
  triggerClassObservationsPreserved: true,
  transparencyActivationClassObserved: true,
  natalLuckMeetingActivationClassObserved: true,
  dayunMeetingClashStructuralChangeClassObserved: true,
  breakTriggerClassObserved: true,
  natalRescueTriggerClassObserved: true,
  counterforceTriggerClassObserved: true,
  genericInteractionActivationNegativeControlPreserved: true,
  matchingGapsPreserved: true,
  triggerMatchingDistinctFromDurationObserved: true,
  triggerMatchingDistinctFromRuntimeActivationObserved: true,
  triggerPredicateAuthorized: false,
  perMemberActivationResolverAuthorized: false,
  genericInteractionActivationAuthorized: false,
  automaticStructuralChangeAuthorized: false,
  automaticBreakAuthorized: false,
  automaticRescueAuthorized: false,
  automaticCounterforceAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  numericTriggerScoreAuthorized: false,
  executableTriggerResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
