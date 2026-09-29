import {
  R072_AUTHORITY,
  R072_DAYUN_NATAL_INTERACTION_VERSION,
  R072_INTERACTION_CLASSES,
} from './general-natal-dayun-natal-interaction.js';
import {
  R073_AUTHORITY,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R076_AUTHORITY,
  R076_CASES,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R136_AUTHORITY,
  R136_YONG_XI_JI_TEMPORAL_CORPUS_VERSION,
} from './general-natal-yong-xi-ji-role-reassignment-temporal-corpus.js';

export const R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION =
  '0.1.0-research' as const;

export type R151SourceAsset = 'R072' | 'R073' | 'R076';

export type R151TemporalStateClass =
  | 'NATAL_BASELINE'
  | 'DAYUN_COMPLETION_OVERLAY'
  | 'DAYUN_HIDDEN_EXPOSURE_OVERLAY'
  | 'DAYUN_STRUCTURAL_CHANGE_OVERLAY'
  | 'DAYUN_NATAL_BLOCK_RESCUE_OVERLAY'
  | 'MECHANISM_CLASS_BOUNDARY'
  | 'TEMPORAL_ACTIVATION_OVERLAY'
  | 'TEMPORARY_OPERATIVE_OVERLAY'
  | 'POSITION_CONTEXT_MODIFIER'
  | 'BREAK_TRIGGER_OVERLAY'
  | 'RESCUE_OVERLAY'
  | 'COUNTERFORCE_OVERLAY'
  | 'POLARITY_BOUNDARY';

export interface R151TemporalReplayRow {
  rowId: string;
  sourceAsset: R151SourceAsset;
  sourceKey: string;
  sourceRepresentation: string;
  temporalStateClass: R151TemporalStateClass;
  baselineLayerIdentityPreserved: true;
  temporalOverlayObserved: boolean;
  explicitReturnToBaselineObserved: boolean;
  contextDependenceObserved: boolean;
  sourceBoundedMechanismObserved: boolean;
  permanentNatalMutationAuthorized: false;
  automaticRoleReassignmentAuthorized: false;
  fixedPolarityAuthorized: false;
  deterministicEventAuthorized: false;
  numericTemporalWeightAuthorized: false;
  genericTemporalTransitionAuthorized: false;
  executableTemporalResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const replayRow = (
  value: Omit<
    R151TemporalReplayRow,
    | 'baselineLayerIdentityPreserved'
    | 'permanentNatalMutationAuthorized'
    | 'automaticRoleReassignmentAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'numericTemporalWeightAuthorized'
    | 'genericTemporalTransitionAuthorized'
    | 'executableTemporalResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R151TemporalReplayRow =>
  Object.freeze({
    ...value,
    baselineLayerIdentityPreserved: true,
    permanentNatalMutationAuthorized: false,
    automaticRoleReassignmentAuthorized: false,
    fixedPolarityAuthorized: false,
    deterministicEventAuthorized: false,
    numericTemporalWeightAuthorized: false,
    genericTemporalTransitionAuthorized: false,
    executableTemporalResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

const r072StateClass = (
  interaction: (typeof R072_INTERACTION_CLASSES)[number]['interaction'],
): R151TemporalStateClass => {
  switch (interaction) {
    case 'NATAL_COMPLETION':
      return 'DAYUN_COMPLETION_OVERLAY';
    case 'HIDDEN_TO_EXPOSED':
      return 'DAYUN_HIDDEN_EXPOSURE_OVERLAY';
    case 'STRUCTURAL_CHANGE':
      return 'DAYUN_STRUCTURAL_CHANGE_OVERLAY';
    case 'NATAL_BLOCK_OR_RESCUE':
      return 'DAYUN_NATAL_BLOCK_RESCUE_OVERLAY';
    case 'MECHANISM_CLASS_SEPARATION':
      return 'MECHANISM_CLASS_BOUNDARY';
  }
};

export const R151_R072_REPLAY_ROWS: readonly R151TemporalReplayRow[] =
  Object.freeze(
    R072_INTERACTION_CLASSES.map((item, index) =>
      replayRow({
        rowId: 'R151-R072-' + String(index + 1).padStart(2, '0'),
        sourceAsset: 'R072',
        sourceKey: item.id,
        sourceRepresentation: item.sourceRepresentation,
        temporalStateClass: r072StateClass(item.interaction),
        temporalOverlayObserved:
          item.interaction !== 'MECHANISM_CLASS_SEPARATION',
        explicitReturnToBaselineObserved: false,
        contextDependenceObserved: true,
        sourceBoundedMechanismObserved: true,
        notes: [
          'The Dayun mechanism is represented relative to a natal baseline rather than as an independent luck score.',
          item.interaction === 'MECHANISM_CLASS_SEPARATION'
            ? 'Pattern completion/change remains distinct from ordinary help/harm semantics.'
            : 'The temporal interaction does not authorize permanent natal mutation or fixed polarity.',
        ],
      }),
    ),
  );

const r073StateClass = (
  state: (typeof R073_STATE_MODEL)[number]['state'],
): R151TemporalStateClass => {
  switch (state) {
    case 'NATAL_LATENT':
      return 'NATAL_BASELINE';
    case 'ACTIVATED_BY_TRANSPARENCY':
    case 'ACTIVATED_BY_NATAL_LUCK_MEETING':
      return 'TEMPORAL_ACTIVATION_OVERLAY';
    case 'TEMPORARY_OPERATIVE_STATE':
      return 'TEMPORARY_OPERATIVE_OVERLAY';
    case 'POSITION_CONTEXT_MODULATED':
      return 'POSITION_CONTEXT_MODIFIER';
  }
};

export const R151_R073_REPLAY_ROWS: readonly R151TemporalReplayRow[] =
  Object.freeze(
    R073_STATE_MODEL.map((item, index) =>
      replayRow({
        rowId: 'R151-R073-' + String(index + 1).padStart(2, '0'),
        sourceAsset: 'R073',
        sourceKey: item.state,
        sourceRepresentation: item.sourceRepresentation,
        temporalStateClass: r073StateClass(item.state),
        temporalOverlayObserved: item.state !== 'NATAL_LATENT',
        explicitReturnToBaselineObserved:
          item.state === 'TEMPORARY_OPERATIVE_STATE',
        contextDependenceObserved:
          item.state === 'POSITION_CONTEXT_MODULATED' ||
          item.state === 'ACTIVATED_BY_NATAL_LUCK_MEETING',
        sourceBoundedMechanismObserved: true,
        notes:
          item.state === 'TEMPORARY_OPERATIVE_STATE'
            ? [
                'The source-bounded temporary operative state explicitly preserves expiry and return-to-baseline semantics.',
                'Temporary operation is not permanent natal mutation.',
              ]
            : item.state === 'NATAL_LATENT'
              ? [
                  'Natal latent membership remains a baseline state distinct from later temporal activation.',
                ]
              : [
                  'Temporal activation or positional modulation is preserved without event prediction or permanent mutation.',
                ],
      }),
    ),
  );

const r076StateClass = (
  id: (typeof R076_CASES)[number]['id'],
): R151TemporalStateClass => {
  switch (id) {
    case 'OFFICER-HARM-BY-LUCK-EXPOSED-HURTING':
      return 'BREAK_TRIGGER_OVERLAY';
    case 'NATAL-SEAL-PROTECTS-OFFICER':
      return 'RESCUE_OVERLAY';
    case 'NATAL-METAL-BLOCKS-WOOD-MEETING-CHANGE':
      return 'COUNTERFORCE_OVERLAY';
    case 'COMPLETION-NOT-NECESSARILY-FAVORABLE':
    case 'CHANGE-NOT-NECESSARILY-HARMFUL':
      return 'POLARITY_BOUNDARY';
  }
};

export const R151_R076_REPLAY_ROWS: readonly R151TemporalReplayRow[] =
  Object.freeze(
    R076_CASES.map((item, index) =>
      replayRow({
        rowId: 'R151-R076-' + String(index + 1).padStart(2, '0'),
        sourceAsset: 'R076',
        sourceKey: item.id,
        sourceRepresentation: item.sourceRepresentation,
        temporalStateClass: r076StateClass(item.id),
        temporalOverlayObserved: true,
        explicitReturnToBaselineObserved: false,
        contextDependenceObserved: true,
        sourceBoundedMechanismObserved: true,
        notes:
          item.id === 'COMPLETION-NOT-NECESSARILY-FAVORABLE' ||
          item.id === 'CHANGE-NOT-NECESSARILY-HARMFUL'
            ? [
                'Temporal structural completion/change does not determine favorable or harmful polarity by itself.',
              ]
            : [
                'The source-bounded break/rescue/counterforce mechanism depends on natal context and does not become a global toggle.',
              ],
      }),
    ),
  );

export const R151_TEMPORAL_REPLAY_ROWS: readonly R151TemporalReplayRow[] =
  Object.freeze([
    ...R151_R072_REPLAY_ROWS,
    ...R151_R073_REPLAY_ROWS,
    ...R151_R076_REPLAY_ROWS,
  ]);

export interface R151TemporalGovernanceGuard {
  guardId: string;
  upstreamAsset: 'R072' | 'R073' | 'R076' | 'R136';
  boundary: string;
  satisfied: boolean;
  temporalResolverAuthorized: false;
  permanentNatalMutationAuthorized: false;
  eventPredictionAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R151TemporalGovernanceGuard,
    | 'temporalResolverAuthorized'
    | 'permanentNatalMutationAuthorized'
    | 'eventPredictionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R151TemporalGovernanceGuard =>
  Object.freeze({
    ...value,
    temporalResolverAuthorized: false,
    permanentNatalMutationAuthorized: false,
    eventPredictionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R151_GOVERNANCE_GUARDS: readonly R151TemporalGovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R151-GUARD-R072',
      upstreamAsset: 'R072',
      boundary:
        'Dayun meaning requires natal context; the same luck does not authorize the same outcome across charts.',
      satisfied:
        !R072_AUTHORITY.independentLuckScoreAuthorized &&
        !R072_AUTHORITY.sameLuckSameOutcomeAuthorized &&
        !R072_AUTHORITY.executableDayunInteractionResolverAuthorized,
    }),
    guard({
      guardId: 'R151-GUARD-R073',
      upstreamAsset: 'R073',
      boundary:
        'Latent activation remains distinct from permanent natal mutation and from concrete event prediction.',
      satisfied:
        !R073_AUTHORITY.activationImpliesPermanentNatalChange &&
        !R073_AUTHORITY.activationImpliesConcreteEvent &&
        !R073_AUTHORITY.executableTimingResolverAuthorized,
    }),
    guard({
      guardId: 'R151-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Luck-triggered break/recovery is configuration-specific and cannot become a permanent natal toggle.',
      satisfied:
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.permanentNatalMutationAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R151-GUARD-R136',
      upstreamAsset: 'R136',
      boundary:
        'Temporal support, opposition, activation, completion, or change cannot silently reselect Yong/Xi/Ji roles.',
      satisfied:
        !R136_AUTHORITY.automaticTemporalYongshenReselectionAuthorized &&
        !R136_AUTHORITY.temporalRoleReassignmentResolverAuthorized &&
        !R136_AUTHORITY.permanentNatalRoleMutationAuthorized &&
        !R136_AUTHORITY.temporalEventPredictionAuthorized,
    }),
  ]);

export const R151_REJECTED_TEMPORAL_SHORTCUTS = Object.freeze([
  'DAYUN_ELEMENT_ALONE_DETERMINES_OUTCOME',
  'SAME_DAYUN_SAME_RESULT_ACROSS_CHARTS',
  'TEMPORAL_ACTIVATION_EQUALS_PERMANENT_NATAL_MUTATION',
  'TEMPORAL_COMPLETION_EQUALS_PERMANENT_NATAL_COMPLETION',
  'TEMPORAL_STRUCTURAL_CHANGE_EQUALS_PERMANENT_NATAL_REWRITE',
  'PATTERN_BREAK_EQUALS_PERMANENT_NATAL_BREAK',
  'TEMPORAL_RESCUE_EQUALS_PERMANENT_NATAL_REPAIR',
  'ACTIVATION_EQUALS_CONCRETE_EVENT',
  'COMPLETION_EQUALS_FAVORABLE',
  'STRUCTURAL_CHANGE_EQUALS_HARMFUL',
  'EVERY_DAYUN_RESELECTS_YONGSHEN',
  'TEMPORAL_SUPPORT_EQUALS_ROLE_REASSIGNMENT',
  'TEMPORAL_OPPOSITION_EQUALS_ROLE_REASSIGNMENT',
  'LATENT_ACTIVATION_EQUALS_ROLE_REASSIGNMENT',
  'POSITION_CONTEXT_EQUALS_GLOBAL_TEMPORAL_WEIGHT',
  'NUMERIC_TEMPORAL_SCORE',
  'TEMPORAL_OVERLAY_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const stateCount = (state: R151TemporalStateClass): number =>
  R151_TEMPORAL_REPLAY_ROWS.filter((item) => item.temporalStateClass === state)
    .length;

const countFlag = (
  key:
    | 'temporalOverlayObserved'
    | 'explicitReturnToBaselineObserved'
    | 'contextDependenceObserved'
    | 'permanentNatalMutationAuthorized'
    | 'automaticRoleReassignmentAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'numericTemporalWeightAuthorized'
    | 'genericTemporalTransitionAuthorized'
    | 'executableTemporalResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted',
): number => R151_TEMPORAL_REPLAY_ROWS.filter((item) => item[key]).length;

export const R151_SUMMARY = Object.freeze({
  rowCount: R151_TEMPORAL_REPLAY_ROWS.length,
  r072ReplayCount: R151_R072_REPLAY_ROWS.length,
  r073ReplayCount: R151_R073_REPLAY_ROWS.length,
  r076ReplayCount: R151_R076_REPLAY_ROWS.length,
  governanceGuardCount: R151_GOVERNANCE_GUARDS.length,
  natalBaselineRowCount: stateCount('NATAL_BASELINE'),
  temporalOverlayObservedCount: countFlag('temporalOverlayObserved'),
  explicitReturnToBaselineObservedCount: countFlag(
    'explicitReturnToBaselineObserved',
  ),
  contextDependenceObservedCount: countFlag('contextDependenceObserved'),
  permanentNatalMutationAuthorizedCount: countFlag(
    'permanentNatalMutationAuthorized',
  ),
  automaticRoleReassignmentAuthorizedCount: countFlag(
    'automaticRoleReassignmentAuthorized',
  ),
  fixedPolarityAuthorizedCount: countFlag('fixedPolarityAuthorized'),
  deterministicEventAuthorizedCount: countFlag(
    'deterministicEventAuthorized',
  ),
  numericTemporalWeightAuthorizedCount: countFlag(
    'numericTemporalWeightAuthorized',
  ),
  genericTemporalTransitionAuthorizedCount: countFlag(
    'genericTemporalTransitionAuthorized',
  ),
  executableTemporalResolverAuthorizedCount: countFlag(
    'executableTemporalResolverAuthorized',
  ),
  interpretationClaimEmissionAuthorizedCount: countFlag(
    'interpretationClaimEmissionAuthorized',
  ),
  productionAuthorityPromotedCount: countFlag(
    'productionAuthorityPromoted',
  ),
});

export const R151_UPSTREAM_BINDINGS = Object.freeze({
  r072: {
    version: R072_DAYUN_NATAL_INTERACTION_VERSION,
    interactionClassCount: R072_AUTHORITY.interactionClassCount,
    independentLuckScoreAuthorized:
      R072_AUTHORITY.independentLuckScoreAuthorized,
    sameLuckSameOutcomeAuthorized: R072_AUTHORITY.sameLuckSameOutcomeAuthorized,
    executableDayunInteractionResolverAuthorized:
      R072_AUTHORITY.executableDayunInteractionResolverAuthorized,
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    stateCount: R073_AUTHORITY.stateCount,
    activationImpliesPermanentNatalChange:
      R073_AUTHORITY.activationImpliesPermanentNatalChange,
    activationImpliesConcreteEvent:
      R073_AUTHORITY.activationImpliesConcreteEvent,
    executableTimingResolverAuthorized:
      R073_AUTHORITY.executableTimingResolverAuthorized,
  },
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    caseCount: R076_AUTHORITY.caseCount,
    globalBreakRecoveryToggleAuthorized:
      R076_AUTHORITY.globalBreakRecoveryToggleAuthorized,
    permanentNatalMutationAuthorized:
      R076_AUTHORITY.permanentNatalMutationAuthorized,
    executableBreakRecoveryResolverAuthorized:
      R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
  },
  r136: {
    version: R136_YONG_XI_JI_TEMPORAL_CORPUS_VERSION,
    natalRoleTemporalInteractionSeparationObserved:
      R136_AUTHORITY.natalRoleTemporalInteractionSeparationObserved,
    latentActivationDistinctFromRoleReassignmentObserved:
      R136_AUTHORITY.latentActivationDistinctFromRoleReassignmentObserved,
    automaticTemporalYongshenReselectionAuthorized:
      R136_AUTHORITY.automaticTemporalYongshenReselectionAuthorized,
    temporalRoleReassignmentResolverAuthorized:
      R136_AUTHORITY.temporalRoleReassignmentResolverAuthorized,
    permanentNatalRoleMutationAuthorized:
      R136_AUTHORITY.permanentNatalRoleMutationAuthorized,
    temporalEventPredictionAuthorized:
      R136_AUTHORITY.temporalEventPredictionAuthorized,
  },
});

export const R151_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_CORPUS_COMPLETE' as const,
  researchOnly: true,
  natalBaselineDistinctFromTemporalOverlayObserved: true,
  dayunMeaningDependsOnNatalContextObserved: true,
  latentStateDistinctFromActivatedStateObserved: true,
  temporaryOperativeStateObserved: true,
  explicitReturnToBaselineObserved: true,
  breakRescueContextDependenceObserved: true,
  temporalStructuralChangeDistinctFromPermanentNatalMutationObserved: true,
  temporalActivationDistinctFromPermanentNatalMutationObserved: true,
  temporalInteractionDistinctFromRoleReassignmentObserved: true,
  completionChangeDistinctFromPolarityObserved: true,
  generalTemporalTransitionResolverAuthorized: false,
  permanentNatalMutationAuthorized: false,
  automaticTemporalRoleReassignmentAuthorized: false,
  fixedTemporalPolarityAuthorized: false,
  deterministicTemporalEventAuthorized: false,
  numericTemporalWeightAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
