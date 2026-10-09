import {
  R073_AUTHORITY,
  R073_EXECUTION_GAPS,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R075_EXECUTION_GAPS,
  R075_MONTHLY_LUCK_BOUNDARY_VERSION,
} from './general-natal-monthly-luck-boundary.js';
import {
  R076_AUTHORITY,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R151_AUTHORITY,
  R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
  R151_TEMPORAL_REPLAY_ROWS,
} from './general-natal-dayun-temporal-overlay-replay-corpus.js';
import {
  R155_AUTHORITY,
  R155_MONTHLY_LOWER_LAYER_COMPOSITION_VERSION,
} from './general-natal-monthly-lower-layer-composition-boundary-corpus.js';

export const R156_NESTED_TEMPORAL_DURATION_EXPIRY_VERSION =
  '0.1.0-research' as const;

export type R156ScopeBoundaryKind =
  | 'NATAL_BASELINE_IDENTITY'
  | 'SOURCE_BOUNDED_DAYUN_TEMPORARY_WINDOW'
  | 'GENERIC_DAYUN_ACTIVATION_DURATION_UNRESOLVED'
  | 'BREAK_RESCUE_DURATION_UNRESOLVED'
  | 'MONTHLY_CALENDAR_BOUNDARY_UNRESOLVED'
  | 'NESTED_SCOPE_EXPIRY_NON_PRECEDENCE';

export type R156EvidenceState =
  | 'IDENTITY_ONLY'
  | 'SOURCE_BOUNDED_DURATION_AND_RETURN'
  | 'DURATION_UNRESOLVED'
  | 'CALENDAR_BOUNDARY_UNRESOLVED'
  | 'SYNTHESIS_BOUNDARY';

export interface R156DurationExpiryRow {
  rowId: string;
  boundaryKind: R156ScopeBoundaryKind;
  evidenceState: R156EvidenceState;
  sourceRefs: readonly string[];
  sourceRepresentation: string;
  sourceBoundedDurationObserved: boolean;
  exactFiveYearWindowObserved: boolean;
  explicitReturnToBaselineObserved: boolean;
  durationUnresolved: boolean;
  calendarBoundaryUnresolved: boolean;
  baselineIdentityPreserved: true;
  universalDurationRuleAuthorized: false;
  durationInheritanceAcrossScopesAuthorized: false;
  expiryCreatesSemanticWinnerAuthorized: false;
  expiryAutomaticallyEndsEventAuthorized: false;
  expiryAutomaticallyRestoresAllEffectsAuthorized: false;
  expiryChangesPolarityAuthorized: false;
  permanentNatalMutationAuthorized: false;
  numericDurationWeightAuthorized: false;
  executableTimingResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const row = (
  value: Omit<
    R156DurationExpiryRow,
    | 'baselineIdentityPreserved'
    | 'universalDurationRuleAuthorized'
    | 'durationInheritanceAcrossScopesAuthorized'
    | 'expiryCreatesSemanticWinnerAuthorized'
    | 'expiryAutomaticallyEndsEventAuthorized'
    | 'expiryAutomaticallyRestoresAllEffectsAuthorized'
    | 'expiryChangesPolarityAuthorized'
    | 'permanentNatalMutationAuthorized'
    | 'numericDurationWeightAuthorized'
    | 'executableTimingResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R156DurationExpiryRow =>
  Object.freeze({
    ...value,
    baselineIdentityPreserved: true,
    universalDurationRuleAuthorized: false,
    durationInheritanceAcrossScopesAuthorized: false,
    expiryCreatesSemanticWinnerAuthorized: false,
    expiryAutomaticallyEndsEventAuthorized: false,
    expiryAutomaticallyRestoresAllEffectsAuthorized: false,
    expiryChangesPolarityAuthorized: false,
    permanentNatalMutationAuthorized: false,
    numericDurationWeightAuthorized: false,
    executableTimingResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

const natalLatent = R073_STATE_MODEL.find(
  (item) => item.state === 'NATAL_LATENT',
);
const temporaryOperative = R073_STATE_MODEL.find(
  (item) => item.state === 'TEMPORARY_OPERATIVE_STATE',
);
const activatedByTransparency = R073_STATE_MODEL.find(
  (item) => item.state === 'ACTIVATED_BY_TRANSPARENCY',
);
const activatedByMeeting = R073_STATE_MODEL.find(
  (item) => item.state === 'ACTIVATED_BY_NATAL_LUCK_MEETING',
);
const r151Temporary = R151_TEMPORAL_REPLAY_ROWS.find(
  (item) => item.temporalStateClass === 'TEMPORARY_OPERATIVE_OVERLAY',
);

if (
  natalLatent === undefined ||
  temporaryOperative === undefined ||
  activatedByTransparency === undefined ||
  activatedByMeeting === undefined ||
  r151Temporary === undefined
) {
  throw new Error('R156 missing required upstream temporal fixture');
}

export const R156_DURATION_EXPIRY_ROWS: readonly R156DurationExpiryRow[] =
  Object.freeze([
    row({
      rowId: 'R156-01',
      boundaryKind: 'NATAL_BASELINE_IDENTITY',
      evidenceState: 'IDENTITY_ONLY',
      sourceRefs: ['R073:NATAL_LATENT', 'R151:NATAL_BASELINE'],
      sourceRepresentation: natalLatent.sourceRepresentation,
      sourceBoundedDurationObserved: false,
      exactFiveYearWindowObserved: false,
      explicitReturnToBaselineObserved: false,
      durationUnresolved: false,
      calendarBoundaryUnresolved: false,
      notes: [
        'Natal baseline identity is preserved separately from later temporal activation.',
        'Baseline identity is not itself an event-duration claim.',
      ],
    }),
    row({
      rowId: 'R156-02',
      boundaryKind: 'SOURCE_BOUNDED_DAYUN_TEMPORARY_WINDOW',
      evidenceState: 'SOURCE_BOUNDED_DURATION_AND_RETURN',
      sourceRefs: [
        'R073:TEMPORARY_OPERATIVE_STATE',
        'R151:TEMPORARY_OPERATIVE_OVERLAY',
      ],
      sourceRepresentation: temporaryOperative.sourceRepresentation,
      sourceBoundedDurationObserved: true,
      exactFiveYearWindowObserved: true,
      explicitReturnToBaselineObserved:
        r151Temporary.explicitReturnToBaselineObserved,
      durationUnresolved: false,
      calendarBoundaryUnresolved: false,
      notes: [
        'The retained R073 source class observes a temporary operative state limited to the relevant five-year period.',
        'The source-bounded return-to-baseline observation does not authorize a universal five-year rule for all Dayun mechanisms.',
      ],
    }),
    row({
      rowId: 'R156-03',
      boundaryKind: 'GENERIC_DAYUN_ACTIVATION_DURATION_UNRESOLVED',
      evidenceState: 'DURATION_UNRESOLVED',
      sourceRefs: [
        'R073:ACTIVATED_BY_TRANSPARENCY',
        'R073:ACTIVATED_BY_NATAL_LUCK_MEETING',
        'R073:ACTIVATION_DURATION_GAP',
      ],
      sourceRepresentation:
        activatedByTransparency.sourceRepresentation +
        ' / ' +
        activatedByMeeting.sourceRepresentation,
      sourceBoundedDurationObserved: false,
      exactFiveYearWindowObserved: false,
      explicitReturnToBaselineObserved: false,
      durationUnresolved: R073_EXECUTION_GAPS.includes('ACTIVATION_DURATION'),
      calendarBoundaryUnresolved: false,
      notes: [
        'Generic activation states are retained without assigning the source-bounded five-year duration to them.',
        'Activation duration remains an explicit execution gap.',
      ],
    }),
    row({
      rowId: 'R156-04',
      boundaryKind: 'BREAK_RESCUE_DURATION_UNRESOLVED',
      evidenceState: 'DURATION_UNRESOLVED',
      sourceRefs: ['R076:TEMPORAL_DURATION_GAP', 'R151:R076_REPLAY'],
      sourceRepresentation: 'R076 configuration-specific break/rescue temporal duration remains unresolved',
      sourceBoundedDurationObserved: false,
      exactFiveYearWindowObserved: false,
      explicitReturnToBaselineObserved: false,
      durationUnresolved: R076_EXECUTION_GAPS.includes('TEMPORAL_DURATION'),
      calendarBoundaryUnresolved: false,
      notes: [
        'Break, rescue, and counterforce mechanisms do not inherit R073 temporary-window duration.',
        'Expiry cannot be inferred as automatic restoration of every prior semantic effect.',
      ],
    }),
    row({
      rowId: 'R156-05',
      boundaryKind: 'MONTHLY_CALENDAR_BOUNDARY_UNRESOLVED',
      evidenceState: 'CALENDAR_BOUNDARY_UNRESOLVED',
      sourceRefs: [
        'R075:MONTH_BOUNDARY_CALENDAR_POLICY_GAP',
        'R155:MONTHLY_LOWER_LAYER',
      ],
      sourceRepresentation: 'Monthly is a lower temporal layer, while month-boundary calendar policy remains unresolved',
      sourceBoundedDurationObserved: false,
      exactFiveYearWindowObserved: false,
      explicitReturnToBaselineObserved: false,
      durationUnresolved: false,
      calendarBoundaryUnresolved:
        R075_EXECUTION_GAPS.includes('MONTH_BOUNDARY_CALENDAR_POLICY') &&
        !R155_AUTHORITY.monthBoundaryCalendarPolicyAuthorized,
      notes: [
        'Monthly lower-layer identity does not itself select a calendar boundary convention.',
        'No exact month start/end semantics are invented by this corpus.',
      ],
    }),
    row({
      rowId: 'R156-06',
      boundaryKind: 'NESTED_SCOPE_EXPIRY_NON_PRECEDENCE',
      evidenceState: 'SYNTHESIS_BOUNDARY',
      sourceRefs: [
        'R151:TEMPORAL_OVERLAY_BOUNDARY',
        'R155:TEMPORAL_ORDER_INVARIANCE',
      ],
      sourceRepresentation: 'Nested temporal scope expiry is represented without semantic precedence or event-end inference',
      sourceBoundedDurationObserved: false,
      exactFiveYearWindowObserved: false,
      explicitReturnToBaselineObserved: false,
      durationUnresolved: true,
      calendarBoundaryUnresolved: true,
      notes: [
        'A shorter or expiring temporal scope does not become a semantic winner merely because it changes later.',
        'Expiry and return-to-baseline remain distinct from deterministic event ending, polarity change, or permanent natal mutation.',
      ],
    }),
  ]);

export interface R156GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R073' | 'R075' | 'R076' | 'R151' | 'R155';
  boundary: string;
  satisfied: boolean;
  universalDurationRuleAuthorized: false;
  executableTimingResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R156GovernanceGuard,
    | 'universalDurationRuleAuthorized'
    | 'executableTimingResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R156GovernanceGuard =>
  Object.freeze({
    ...value,
    universalDurationRuleAuthorized: false,
    executableTimingResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R156_GOVERNANCE_GUARDS: readonly R156GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R156-GUARD-R073',
      upstreamAsset: 'R073',
      boundary:
        'R073 preserves one source-bounded temporary five-year observation while generic activation duration remains an execution gap.',
      satisfied:
        R073_EXECUTION_GAPS.includes('ACTIVATION_DURATION') &&
        !R073_AUTHORITY.activationImpliesPermanentNatalChange &&
        !R073_AUTHORITY.activationImpliesConcreteEvent &&
        !R073_AUTHORITY.executableTimingResolverAuthorized,
    }),
    guard({
      guardId: 'R156-GUARD-R075',
      upstreamAsset: 'R075',
      boundary:
        'Monthly temporal composition cannot invent month-boundary calendar policy.',
      satisfied:
        R075_EXECUTION_GAPS.includes('MONTH_BOUNDARY_CALENDAR_POLICY'),
    }),
    guard({
      guardId: 'R156-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Configuration-specific break/recovery duration remains unresolved and cannot become a global temporal toggle.',
      satisfied:
        R076_EXECUTION_GAPS.includes('TEMPORAL_DURATION') &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.permanentNatalMutationAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R156-GUARD-R151',
      upstreamAsset: 'R151',
      boundary:
        'Explicit return-to-baseline remains distinct from generic temporal transition, permanent natal mutation, and deterministic event semantics.',
      satisfied:
        R151_AUTHORITY.explicitReturnToBaselineObserved &&
        !R151_AUTHORITY.generalTemporalTransitionResolverAuthorized &&
        !R151_AUTHORITY.permanentNatalMutationAuthorized &&
        !R151_AUTHORITY.deterministicTemporalEventAuthorized,
    }),
    guard({
      guardId: 'R156-GUARD-R155',
      upstreamAsset: 'R155',
      boundary:
        'Monthly remains a lower layer with temporal order-invariance and no calendar, event, or executable composition authority.',
      satisfied:
        R155_AUTHORITY.monthlyLowerTemporalLayerObserved &&
        R155_AUTHORITY.temporalOrderInvariantBoundaryPreserved &&
        !R155_AUTHORITY.monthBoundaryCalendarPolicyAuthorized &&
        !R155_AUTHORITY.deterministicMonthlyEventAuthorized &&
        !R155_AUTHORITY.executableMonthlyCompositionResolverAuthorized,
    }),
  ]);

export const R156_REJECTED_DURATION_SHORTCUTS = Object.freeze([
  'R073_FIVE_YEAR_WINDOW_APPLIES_TO_ALL_DAYUN_ACTIVATION',
  'R073_FIVE_YEAR_WINDOW_APPLIES_TO_ALL_TEMPORAL_MECHANISMS',
  'ALL_DAYUN_EFFECTS_EXPIRE_AFTER_FIVE_YEARS',
  'BREAK_RESCUE_INHERITS_R073_DURATION',
  'MONTHLY_LAYER_IDENTITY_DEFINES_CALENDAR_BOUNDARY',
  'TEMPORAL_SCOPE_LENGTH_DEFINES_SEMANTIC_PRECEDENCE',
  'SHORTER_SCOPE_ALWAYS_OVERRIDES_LONGER_SCOPE',
  'EXPIRY_AUTOMATICALLY_ENDS_EVENT',
  'EXPIRY_AUTOMATICALLY_RESTORES_ALL_EFFECTS',
  'RETURN_TO_BASELINE_EQUALS_EVENT_REVERSAL',
  'RETURN_TO_BASELINE_EQUALS_POLARITY_REVERSAL',
  'EXPIRY_MUTATES_NATAL_BASELINE',
  'DURATION_AS_NUMERIC_SEVERITY_WEIGHT',
  'DURATION_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const countFlag = (
  key:
    | 'sourceBoundedDurationObserved'
    | 'exactFiveYearWindowObserved'
    | 'explicitReturnToBaselineObserved'
    | 'durationUnresolved'
    | 'calendarBoundaryUnresolved'
    | 'universalDurationRuleAuthorized'
    | 'expiryCreatesSemanticWinnerAuthorized'
    | 'expiryAutomaticallyEndsEventAuthorized'
    | 'expiryAutomaticallyRestoresAllEffectsAuthorized'
    | 'permanentNatalMutationAuthorized'
    | 'numericDurationWeightAuthorized'
    | 'executableTimingResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted',
): number => R156_DURATION_EXPIRY_ROWS.filter((item) => item[key]).length;

export const R156_SUMMARY = Object.freeze({
  rowCount: R156_DURATION_EXPIRY_ROWS.length,
  sourceBoundedDurationObservedCount: countFlag(
    'sourceBoundedDurationObserved',
  ),
  exactFiveYearWindowObservedCount: countFlag('exactFiveYearWindowObserved'),
  explicitReturnToBaselineObservedCount: countFlag(
    'explicitReturnToBaselineObserved',
  ),
  durationUnresolvedCount: countFlag('durationUnresolved'),
  calendarBoundaryUnresolvedCount: countFlag('calendarBoundaryUnresolved'),
  universalDurationRuleAuthorizedCount: countFlag(
    'universalDurationRuleAuthorized',
  ),
  expiryCreatesSemanticWinnerAuthorizedCount: countFlag(
    'expiryCreatesSemanticWinnerAuthorized',
  ),
  expiryAutomaticallyEndsEventAuthorizedCount: countFlag(
    'expiryAutomaticallyEndsEventAuthorized',
  ),
  expiryAutomaticallyRestoresAllEffectsAuthorizedCount: countFlag(
    'expiryAutomaticallyRestoresAllEffectsAuthorized',
  ),
  permanentNatalMutationAuthorizedCount: countFlag(
    'permanentNatalMutationAuthorized',
  ),
  numericDurationWeightAuthorizedCount: countFlag(
    'numericDurationWeightAuthorized',
  ),
  executableTimingResolverAuthorizedCount: countFlag(
    'executableTimingResolverAuthorized',
  ),
  interpretationClaimEmissionAuthorizedCount: countFlag(
    'interpretationClaimEmissionAuthorized',
  ),
  productionAuthorityPromotedCount: countFlag(
    'productionAuthorityPromoted',
  ),
  governanceGuardCount: R156_GOVERNANCE_GUARDS.length,
});

export const R156_UPSTREAM_BINDINGS = Object.freeze({
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    activationDurationGap:
      R073_EXECUTION_GAPS.includes('ACTIVATION_DURATION'),
    activationImpliesPermanentNatalChange:
      R073_AUTHORITY.activationImpliesPermanentNatalChange,
    activationImpliesConcreteEvent:
      R073_AUTHORITY.activationImpliesConcreteEvent,
    executableTimingResolverAuthorized:
      R073_AUTHORITY.executableTimingResolverAuthorized,
  },
  r075: {
    version: R075_MONTHLY_LUCK_BOUNDARY_VERSION,
    monthBoundaryCalendarPolicyGap:
      R075_EXECUTION_GAPS.includes('MONTH_BOUNDARY_CALENDAR_POLICY'),
  },
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    temporalDurationGap:
      R076_EXECUTION_GAPS.includes('TEMPORAL_DURATION'),
    globalBreakRecoveryToggleAuthorized:
      R076_AUTHORITY.globalBreakRecoveryToggleAuthorized,
    permanentNatalMutationAuthorized:
      R076_AUTHORITY.permanentNatalMutationAuthorized,
    executableBreakRecoveryResolverAuthorized:
      R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
  },
  r151: {
    version: R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
    explicitReturnToBaselineObserved:
      R151_AUTHORITY.explicitReturnToBaselineObserved,
    generalTemporalTransitionResolverAuthorized:
      R151_AUTHORITY.generalTemporalTransitionResolverAuthorized,
    permanentNatalMutationAuthorized:
      R151_AUTHORITY.permanentNatalMutationAuthorized,
    deterministicTemporalEventAuthorized:
      R151_AUTHORITY.deterministicTemporalEventAuthorized,
  },
  r155: {
    version: R155_MONTHLY_LOWER_LAYER_COMPOSITION_VERSION,
    monthlyLowerTemporalLayerObserved:
      R155_AUTHORITY.monthlyLowerTemporalLayerObserved,
    temporalOrderInvariantBoundaryPreserved:
      R155_AUTHORITY.temporalOrderInvariantBoundaryPreserved,
    monthBoundaryCalendarPolicyAuthorized:
      R155_AUTHORITY.monthBoundaryCalendarPolicyAuthorized,
    deterministicMonthlyEventAuthorized:
      R155_AUTHORITY.deterministicMonthlyEventAuthorized,
    executableMonthlyCompositionResolverAuthorized:
      R155_AUTHORITY.executableMonthlyCompositionResolverAuthorized,
  },
});

export const R156_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_NESTED_TEMPORAL_DURATION_EXPIRY_BOUNDARY_COMPLETE' as const,
  researchOnly: true,
  sourceBoundedFiveYearTemporaryWindowObserved: true,
  sourceBoundedExplicitReturnToBaselineObserved: true,
  genericActivationDurationGapPreserved: true,
  breakRescueDurationGapPreserved: true,
  monthlyCalendarBoundaryGapPreserved: true,
  nestedScopeExpiryDistinctFromSemanticPrecedenceObserved: true,
  returnToBaselineDistinctFromEventReversalObserved: true,
  returnToBaselineDistinctFromPolarityReversalObserved: true,
  universalFiveYearDurationAuthorized: false,
  universalDurationInheritanceAuthorized: false,
  temporalScopeLengthPrecedenceAuthorized: false,
  shorterScopeOverridesLongerScopeAuthorized: false,
  expiryAutomaticallyEndsEventAuthorized: false,
  expiryAutomaticallyRestoresAllEffectsAuthorized: false,
  expiryChangesPolarityAuthorized: false,
  permanentNatalMutationAuthorized: false,
  monthBoundaryCalendarPolicyAuthorized: false,
  numericDurationWeightAuthorized: false,
  executableTimingResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
