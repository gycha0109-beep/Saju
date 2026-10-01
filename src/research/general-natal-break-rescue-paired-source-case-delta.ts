import {
  R076_AUTHORITY,
  R076_CASES,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
  R076_REJECTED_SHORTCUTS,
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

export const R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION =
  '0.1.0-research' as const;

export type R163JiaMentionState =
  | 'NOT_STATED_IN_RETAINED_BREAK_CASE'
  | 'EXPLICITLY_STATED_PRESENT_IN_RESCUE_CASE';

export type R163ReplayGateId =
  | 'R076_PAIRED_CASES_BOUND'
  | 'DING_DAY_CONTEXT_PRESERVED'
  | 'CHEN_MONTH_CONTEXT_PRESERVED'
  | 'REN_OFFICER_TRANSPARENCY_CONTEXT_PRESERVED'
  | 'WU_LUCK_CONTEXT_PRESERVED'
  | 'NATAL_JIA_TEXTUAL_DELTA_PRESERVED';

export interface R163PairedCase {
  caseId: string;
  mechanism: 'BREAK_TRIGGER' | 'NATAL_RESCUE';
  upstreamCaseId: string;
  sourceRepresentation: string;
  provenanceKind: 'PARAPHRASED_SOURCE_CASE';
  dingDayContextObserved: true;
  chenMonthContextObserved: true;
  renOfficerTransparencyContextObserved: true;
  wuLuckContextObserved: true;
  natalJiaMentionState: R163JiaMentionState;
  natalJiaAbsenceEstablished: false;
  textualDeltaObserved: true;
  triggerMatchingEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  automaticOutcomeAuthorized: false;
  productionAuthorityPromoted: false;
}

const r076Break = R076_CASES.find((item) => item.mechanism === 'BREAK_TRIGGER');
const r076Rescue = R076_CASES.find((item) => item.mechanism === 'NATAL_RESCUE');
const r157Break = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'BREAK_TRIGGER',
);
const r157Rescue = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'NATAL_RESCUE_TRIGGER',
);
const r159Break = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'BREAK_TRIGGER',
);
const r159Rescue = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'NATAL_RESCUE_TRIGGER',
);

if (
  r076Break === undefined ||
  r076Rescue === undefined ||
  r157Break === undefined ||
  r157Rescue === undefined ||
  r159Break === undefined ||
  r159Rescue === undefined
) {
  throw new Error('R163 missing paired break/rescue upstream cases');
}

export const R163_PAIRED_CASES: readonly R163PairedCase[] = Object.freeze([
  Object.freeze({
    caseId: 'R163-BREAK',
    mechanism: 'BREAK_TRIGGER' as const,
    upstreamCaseId: r076Break.id,
    sourceRepresentation: r076Break.sourceRepresentation,
    provenanceKind: r076Break.provenanceKind,
    dingDayContextObserved: true as const,
    chenMonthContextObserved: true as const,
    renOfficerTransparencyContextObserved: true as const,
    wuLuckContextObserved: true as const,
    natalJiaMentionState: 'NOT_STATED_IN_RETAINED_BREAK_CASE' as const,
    natalJiaAbsenceEstablished: false as const,
    textualDeltaObserved: true as const,
    triggerMatchingEstablished: false as const,
    outcomeSufficiencyEstablished: false as const,
    settlementEstablished: false as const,
    automaticOutcomeAuthorized: false as const,
    productionAuthorityPromoted: false as const,
  }),
  Object.freeze({
    caseId: 'R163-RESCUE',
    mechanism: 'NATAL_RESCUE' as const,
    upstreamCaseId: r076Rescue.id,
    sourceRepresentation: r076Rescue.sourceRepresentation,
    provenanceKind: r076Rescue.provenanceKind,
    dingDayContextObserved: true as const,
    chenMonthContextObserved: true as const,
    renOfficerTransparencyContextObserved: true as const,
    wuLuckContextObserved: true as const,
    natalJiaMentionState: 'EXPLICITLY_STATED_PRESENT_IN_RESCUE_CASE' as const,
    natalJiaAbsenceEstablished: false as const,
    textualDeltaObserved: true as const,
    triggerMatchingEstablished: false as const,
    outcomeSufficiencyEstablished: false as const,
    settlementEstablished: false as const,
    automaticOutcomeAuthorized: false as const,
    productionAuthorityPromoted: false as const,
  }),
]);

export const R163_PAIRED_TEXTUAL_DELTA = Object.freeze({
  deltaId: 'R163-DING-CHEN-REN-WU-NATAL-JIA-MENTION-DELTA',
  sharedContextKeys: Object.freeze([
    'DING_DAY',
    'CHEN_MONTH',
    'REN_OFFICER_TRANSPARENT',
    'WU_LUCK',
  ]),
  breakCaseJiaMentionState:
    'NOT_STATED_IN_RETAINED_BREAK_CASE' as const,
  rescueCaseJiaMentionState:
    'EXPLICITLY_STATED_PRESENT_IN_RESCUE_CASE' as const,
  rescueCaseJiaPresenceExplicitlyObserved: true as const,
  breakCaseJiaAbsenceEstablished: false as const,
  actualChartDifferenceFullyEstablished: false as const,
  semanticMinimalityEstablished: false as const,
  rescueSufficiencyEstablished: false as const,
  rescuePrecedenceEstablished: false as const,
  changeSettlementEstablished: false as const,
  automaticRescueAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export interface R163ReplayGate {
  gateId: R163ReplayGateId;
  meaning: string;
  sourceRefs: readonly string[];
  requiredForPairedTextReplay: true;
  removalBlocksPairedTextReplay: true;
  semanticNecessityEstablished: false;
  rescueSufficiencyEstablished: false;
  triggerMatchingEstablished: false;
  settlementEstablished: false;
  productionAuthorityPromoted: false;
}

const gate = (
  value: Omit<
    R163ReplayGate,
    | 'requiredForPairedTextReplay'
    | 'removalBlocksPairedTextReplay'
    | 'semanticNecessityEstablished'
    | 'rescueSufficiencyEstablished'
    | 'triggerMatchingEstablished'
    | 'settlementEstablished'
    | 'productionAuthorityPromoted'
  >,
): R163ReplayGate =>
  Object.freeze({
    ...value,
    requiredForPairedTextReplay: true,
    removalBlocksPairedTextReplay: true,
    semanticNecessityEstablished: false,
    rescueSufficiencyEstablished: false,
    triggerMatchingEstablished: false,
    settlementEstablished: false,
    productionAuthorityPromoted: false,
  });

export const R163_REPLAY_GATES: readonly R163ReplayGate[] = Object.freeze([
  gate({
    gateId: 'R076_PAIRED_CASES_BOUND',
    meaning:
      'Both R076 paraphrased source cases are bound as a pair before any delta observation is made.',
    sourceRefs: ['R076:BREAK_TRIGGER', 'R076:NATAL_RESCUE'],
  }),
  gate({
    gateId: 'DING_DAY_CONTEXT_PRESERVED',
    meaning: 'Both retained cases preserve the 丁-day context.',
    sourceRefs: ['R076:BREAK_TRIGGER', 'R076:NATAL_RESCUE'],
  }),
  gate({
    gateId: 'CHEN_MONTH_CONTEXT_PRESERVED',
    meaning: 'Both retained cases preserve the 辰-month context.',
    sourceRefs: ['R076:BREAK_TRIGGER', 'R076:NATAL_RESCUE'],
  }),
  gate({
    gateId: 'REN_OFFICER_TRANSPARENCY_CONTEXT_PRESERVED',
    meaning:
      'Both retained cases preserve the 透壬用官 context; R163 does not generalize this into a selector.',
    sourceRefs: ['R076:BREAK_TRIGGER', 'R076:NATAL_RESCUE'],
  }),
  gate({
    gateId: 'WU_LUCK_CONTEXT_PRESERVED',
    meaning:
      'Both retained cases preserve the 運逢戊 context without turning 戊 into a universal break trigger.',
    sourceRefs: ['R076:BREAK_TRIGGER', 'R076:NATAL_RESCUE'],
  }),
  gate({
    gateId: 'NATAL_JIA_TEXTUAL_DELTA_PRESERVED',
    meaning:
      'The rescue case explicitly states 命有甲 while the retained break case does not state that clause; omission is not converted into proven absence.',
    sourceRefs: ['R076:BREAK_TRIGGER', 'R076:NATAL_RESCUE'],
  }),
]);

export interface R163RemovalVariant {
  variantId: string;
  removedGateId: R163ReplayGateId;
  retainedGateIds: readonly R163ReplayGateId[];
  pairedTextReplayEligible: false;
  textualDeltaNegated: false;
  semanticOppositeEstablished: false;
  jiaAbsenceEstablishedInBreakCase: false;
  rescueSufficiencyEstablished: false;
  triggerMatchingEstablished: false;
  settlementEstablished: false;
  productionAuthorityPromoted: false;
}

export const R163_REMOVAL_VARIANTS: readonly R163RemovalVariant[] =
  Object.freeze(
    R163_REPLAY_GATES.map((removed, index) =>
      Object.freeze({
        variantId: 'R163-RM-' + String(index + 1).padStart(2, '0'),
        removedGateId: removed.gateId,
        retainedGateIds: Object.freeze(
          R163_REPLAY_GATES.filter(
            (item) => item.gateId !== removed.gateId,
          ).map((item) => item.gateId),
        ),
        pairedTextReplayEligible: false as const,
        textualDeltaNegated: false as const,
        semanticOppositeEstablished: false as const,
        jiaAbsenceEstablishedInBreakCase: false as const,
        rescueSufficiencyEstablished: false as const,
        triggerMatchingEstablished: false as const,
        settlementEstablished: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export interface R163GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R076' | 'R157' | 'R159' | 'R162';
  boundary: string;
  satisfied: boolean;
  rescueSufficiencyAuthorized: false;
  executableSettlementAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R163GovernanceGuard,
    | 'rescueSufficiencyAuthorized'
    | 'executableSettlementAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R163GovernanceGuard =>
  Object.freeze({
    ...value,
    rescueSufficiencyAuthorized: false,
    executableSettlementAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R163_GOVERNANCE_GUARDS: readonly R163GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R163-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Break/rescue trigger matching and change settlement remain unresolved, and one rescue symbol is not a global winner.',
      satisfied:
        R076_EXECUTION_GAPS.includes('BREAK_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('RESCUE_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT') &&
        R076_REJECTED_SHORTCUTS.includes('ONE_RESCUE_SYMBOL_ALWAYS_WINS') &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R163-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Break and rescue remain configuration-specific trigger classes without executable trigger predicates.',
      satisfied:
        r157Break.configurationSpecificObserved &&
        r157Rescue.configurationSpecificObserved &&
        R157_AUTHORITY.breakTriggerClassObserved &&
        R157_AUTHORITY.natalRescueTriggerClassObserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.automaticBreakAuthorized &&
        !R157_AUTHORITY.automaticRescueAuthorized,
    }),
    guard({
      guardId: 'R163-GUARD-R159',
      upstreamAsset: 'R159',
      boundary:
        'Neither paired row has a minimal predicate set, bounded outcome sufficiency, or settlement sufficiency.',
      satisfied:
        !r159Break.exactMinimalPredicateSetEstablished &&
        !r159Rescue.exactMinimalPredicateSetEstablished &&
        !r159Break.boundedOutcomeSufficiencyEstablished &&
        !r159Rescue.boundedOutcomeSufficiencyEstablished &&
        !r159Break.settlementSufficiencyEstablished &&
        !r159Rescue.settlementSufficiencyEstablished &&
        R159_AUTHORITY.temporalTriggerSufficiencyGapPreserved,
    }),
    guard({
      guardId: 'R163-GUARD-R162',
      upstreamAsset: 'R162',
      boundary:
        'R162 preserves the broader distinction between replayed structural-change language and settled mutation.',
      satisfied:
        R162_AUTHORITY.classReplayDistinctFromSettledMutationObserved &&
        !R162_AUTHORITY.changeSufficiencyEstablished &&
        !R162_AUTHORITY.settledStructuralMutationAuthorized,
    }),
  ]);

export const R163_REJECTED_SHORTCUTS = Object.freeze([
  'BREAK_CASE_OMISSION_OF_JIA_EQUALS_JIA_ABSENCE',
  'NATAL_JIA_TEXTUAL_DELTA_EQUALS_SEMANTIC_MINIMALITY',
  'NATAL_JIA_PRESENCE_ALWAYS_RESCUES',
  'ONE_RESCUE_SYMBOL_ALWAYS_WINS',
  'WU_LUCK_ALWAYS_BREAKS_OFFICER_STRUCTURE',
  'PAIRED_CASE_DELTA_EQUALS_TRIGGER_MATCHER',
  'PAIRED_CASE_DELTA_EQUALS_CHANGE_SETTLEMENT',
  'BREAK_AND_RESCUE_CASES_DEFINE_FIXED_POLARITY',
  'BREAK_AND_RESCUE_CASES_DEFINE_DETERMINISTIC_EVENT',
  'TEXTUAL_DELTA_AS_NUMERIC_WEIGHT',
  'PAIRED_CASE_DELTA_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R163_SUMMARY = Object.freeze({
  pairedCaseCount: R163_PAIRED_CASES.length,
  replayGateCount: R163_REPLAY_GATES.length,
  removalVariantCount: R163_REMOVAL_VARIANTS.length,
  explicitRescueJiaMentionCount: R163_PAIRED_CASES.filter(
    (item) =>
      item.natalJiaMentionState ===
      'EXPLICITLY_STATED_PRESENT_IN_RESCUE_CASE',
  ).length,
  establishedBreakJiaAbsenceCount: R163_PAIRED_CASES.filter(
    (item) => item.natalJiaAbsenceEstablished,
  ).length,
  triggerMatchingEstablishedCount: R163_PAIRED_CASES.filter(
    (item) => item.triggerMatchingEstablished,
  ).length,
  outcomeSufficiencyEstablishedCount: R163_PAIRED_CASES.filter(
    (item) => item.outcomeSufficiencyEstablished,
  ).length,
  governanceGuardCount: R163_GOVERNANCE_GUARDS.length,
});

export const R163_UPSTREAM_BINDINGS = Object.freeze({
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    breakCaseId: r076Break.id,
    breakProvenanceKind: r076Break.provenanceKind,
    rescueCaseId: r076Rescue.id,
    rescueProvenanceKind: r076Rescue.provenanceKind,
    breakTriggerMatchingGap:
      R076_EXECUTION_GAPS.includes('BREAK_TRIGGER_MATCHING'),
    rescueTriggerMatchingGap:
      R076_EXECUTION_GAPS.includes('RESCUE_TRIGGER_MATCHING'),
    changeSettlementGap:
      R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT'),
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    breakConfigurationSpecificObserved:
      r157Break.configurationSpecificObserved,
    rescueConfigurationSpecificObserved:
      r157Rescue.configurationSpecificObserved,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
  },
  r159: {
    version: R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
    breakBoundedOutcomeSufficiencyEstablished:
      r159Break.boundedOutcomeSufficiencyEstablished,
    rescueBoundedOutcomeSufficiencyEstablished:
      r159Rescue.boundedOutcomeSufficiencyEstablished,
  },
  r162: {
    version:
      R162_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_VERSION,
    classReplayDistinctFromSettledMutationObserved:
      R162_AUTHORITY.classReplayDistinctFromSettledMutationObserved,
  },
});

export const R163_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_BREAK_RESCUE_PAIRED_SOURCE_CASE_TEXTUAL_DELTA_COMPLETE' as const,
  researchOnly: true,
  pairedBreakRescueCasesBound: true,
  sharedDingChenRenWuContextObserved: true,
  rescueCaseNatalJiaMentionObserved: true,
  breakCaseNatalJiaOmissionObserved: true,
  breakCaseNatalJiaAbsenceEstablished: false,
  actualChartDifferenceFullyEstablished: false,
  pairedTextualDeltaEstablished: true,
  pairedTextualDeltaDistinctFromSemanticMinimalityObserved: true,
  pairedTextualDeltaDistinctFromRescueSufficiencyObserved: true,
  semanticMinimalityEstablished: false,
  breakTriggerMatchingEstablished: false,
  rescueTriggerMatchingEstablished: false,
  rescueSufficiencyEstablished: false,
  rescuePrecedenceEstablished: false,
  changeSettlementEstablished: false,
  automaticBreakAuthorized: false,
  automaticRescueAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  executableBreakRecoveryResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
