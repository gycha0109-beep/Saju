import {
  R076_AUTHORITY,
  R076_EXECUTION_GAPS,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
import {
  R143_AUTHORITY,
  R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
} from './general-natal-branch-combination-clash-coexistence-corpus.js';
import {
  R154_AUTHORITY,
  R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
} from './general-natal-dayun-annual-conflict-order-sensitivity-corpus.js';
import {
  R157_AUTHORITY,
  R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
  R157_TRIGGER_ROWS,
  type R157TriggerClass,
} from './general-natal-temporal-trigger-matching-provenance-boundary-corpus.js';

export const R158_COMPETING_TEMPORAL_TRIGGER_COEXISTENCE_VERSION =
  '0.1.0-research' as const;

export type R158TriggerSetId =
  | 'ACTIVATION_PAIR'
  | 'STRUCTURAL_CHANGE_BREAK'
  | 'BREAK_RESCUE'
  | 'BREAK_COUNTERFORCE'
  | 'RESCUE_COUNTERFORCE'
  | 'BREAK_RESCUE_COUNTERFORCE';

export interface R158TriggerSetCase {
  caseId: string;
  triggerSetId: R158TriggerSetId;
  triggerClasses: readonly R157TriggerClass[];
  canonicalTriggerSetKey: string;
  coexistenceObserved: true;
  matchingGapsPreserved: true;
  settlementGapPreserved: true;
  sourceBoundedRelationAnalogyOnly: true;
  triggerWinnerAuthorized: false;
  triggerPrecedenceAuthorized: false;
  firstMatchWinsAuthorized: false;
  lastMatchWinsAuthorized: false;
  sequentialMutationAuthorized: false;
  triggerCountAsSeverityAuthorized: false;
  numericTriggerWeightAuthorized: false;
  automaticBreakRescueSettlementAuthorized: false;
  automaticCounterforceSettlementAuthorized: false;
  fixedPolarityAuthorized: false;
  deterministicEventAuthorized: false;
  executableTriggerSettlementAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

export interface R158OrderVariant {
  variantId: string;
  caseId: string;
  triggerSetId: R158TriggerSetId;
  orderedTriggerClasses: readonly R157TriggerClass[];
  canonicalTriggerSetKey: string;
  orderVariantIndex: number;
  sameSemanticInputSet: true;
  orderDoesNotImplyPrecedence: true;
  firstMatchWinsApplied: false;
  lastMatchWinsApplied: false;
  sequentialMutationApplied: false;
  semanticWinner: null;
  semanticPrecedenceRelation: null;
  causalOrderInference: null;
  eventPrediction: null;
  relationSeverity: null;
  executable: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const requiredTrigger = (triggerClass: R157TriggerClass) => {
  const row = R157_TRIGGER_ROWS.find((item) => item.triggerClass === triggerClass);
  if (row === undefined) {
    throw new Error('R158 missing R157 trigger fixture: ' + triggerClass);
  }
  return row;
};

const canonicalKey = (items: readonly R157TriggerClass[]): string =>
  [...items].sort().join('|');

const permutations = <T>(items: readonly T[]): readonly (readonly T[])[] => {
  if (items.length <= 1) return [Object.freeze([...items])];
  const result: T[][] = [];
  items.forEach((item, index) => {
    const rest = [...items.slice(0, index), ...items.slice(index + 1)];
    for (const tail of permutations(rest)) {
      result.push([item, ...tail]);
    }
  });
  return Object.freeze(result.map((item) => Object.freeze(item)));
};

const triggerSetCase = (
  value: Omit<
    R158TriggerSetCase,
    | 'canonicalTriggerSetKey'
    | 'coexistenceObserved'
    | 'matchingGapsPreserved'
    | 'settlementGapPreserved'
    | 'sourceBoundedRelationAnalogyOnly'
    | 'triggerWinnerAuthorized'
    | 'triggerPrecedenceAuthorized'
    | 'firstMatchWinsAuthorized'
    | 'lastMatchWinsAuthorized'
    | 'sequentialMutationAuthorized'
    | 'triggerCountAsSeverityAuthorized'
    | 'numericTriggerWeightAuthorized'
    | 'automaticBreakRescueSettlementAuthorized'
    | 'automaticCounterforceSettlementAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'executableTriggerSettlementAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R158TriggerSetCase => {
  value.triggerClasses.forEach(requiredTrigger);
  return Object.freeze({
    ...value,
    canonicalTriggerSetKey: canonicalKey(value.triggerClasses),
    coexistenceObserved: true,
    matchingGapsPreserved: true,
    settlementGapPreserved: true,
    sourceBoundedRelationAnalogyOnly: true,
    triggerWinnerAuthorized: false,
    triggerPrecedenceAuthorized: false,
    firstMatchWinsAuthorized: false,
    lastMatchWinsAuthorized: false,
    sequentialMutationAuthorized: false,
    triggerCountAsSeverityAuthorized: false,
    numericTriggerWeightAuthorized: false,
    automaticBreakRescueSettlementAuthorized: false,
    automaticCounterforceSettlementAuthorized: false,
    fixedPolarityAuthorized: false,
    deterministicEventAuthorized: false,
    executableTriggerSettlementAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });
};

export const R158_TRIGGER_SET_CASES: readonly R158TriggerSetCase[] =
  Object.freeze([
    triggerSetCase({
      caseId: 'R158-C01',
      triggerSetId: 'ACTIVATION_PAIR',
      triggerClasses: [
        'TRANSPARENCY_ACTIVATION',
        'NATAL_LUCK_MEETING_ACTIVATION',
      ],
      notes: [
        'Two activation-shaped trigger classes may coexist as observations.',
        'Their coexistence does not select one activation path or authorize runtime activation.',
      ],
    }),
    triggerSetCase({
      caseId: 'R158-C02',
      triggerSetId: 'STRUCTURAL_CHANGE_BREAK',
      triggerClasses: [
        'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
        'BREAK_TRIGGER',
      ],
      notes: [
        'Structural-change and break trigger observations may coexist.',
        'No automatic implication is created from one trigger class to the other.',
      ],
    }),
    triggerSetCase({
      caseId: 'R158-C03',
      triggerSetId: 'BREAK_RESCUE',
      triggerClasses: ['BREAK_TRIGGER', 'NATAL_RESCUE_TRIGGER'],
      notes: [
        'Break and rescue are preserved as competing configuration-specific observations.',
        'R076 does not authorize one rescue symbol or one break symbol as a global winner.',
      ],
    }),
    triggerSetCase({
      caseId: 'R158-C04',
      triggerSetId: 'BREAK_COUNTERFORCE',
      triggerClasses: ['BREAK_TRIGGER', 'COUNTERFORCE_TRIGGER'],
      notes: [
        'Break and counterforce coexistence does not establish automatic blocking or break precedence.',
      ],
    }),
    triggerSetCase({
      caseId: 'R158-C05',
      triggerSetId: 'RESCUE_COUNTERFORCE',
      triggerClasses: ['NATAL_RESCUE_TRIGGER', 'COUNTERFORCE_TRIGGER'],
      notes: [
        'Rescue and counterforce remain separate trigger classes with unresolved settlement.',
      ],
    }),
    triggerSetCase({
      caseId: 'R158-C06',
      triggerSetId: 'BREAK_RESCUE_COUNTERFORCE',
      triggerClasses: [
        'BREAK_TRIGGER',
        'NATAL_RESCUE_TRIGGER',
        'COUNTERFORCE_TRIGGER',
      ],
      notes: [
        'Three-way coexistence is represented without aggregation, winner selection, or numeric weighting.',
        'Trigger count does not become severity.',
      ],
    }),
  ]);

export const R158_ORDER_VARIANTS: readonly R158OrderVariant[] = Object.freeze(
  R158_TRIGGER_SET_CASES.flatMap((item) =>
    permutations(item.triggerClasses).map((orderedTriggerClasses, index) =>
      Object.freeze({
        variantId:
          item.caseId + '-V' + String(index + 1).padStart(2, '0'),
        caseId: item.caseId,
        triggerSetId: item.triggerSetId,
        orderedTriggerClasses,
        canonicalTriggerSetKey: canonicalKey(orderedTriggerClasses),
        orderVariantIndex: index + 1,
        sameSemanticInputSet: true as const,
        orderDoesNotImplyPrecedence: true as const,
        firstMatchWinsApplied: false as const,
        lastMatchWinsApplied: false as const,
        sequentialMutationApplied: false as const,
        semanticWinner: null,
        semanticPrecedenceRelation: null,
        causalOrderInference: null,
        eventPrediction: null,
        relationSeverity: null,
        executable: false as const,
        interpretationClaimEmissionAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  ),
);

export interface R158GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R076' | 'R143' | 'R154' | 'R157';
  boundary: string;
  satisfied: boolean;
  triggerSettlementAuthorized: false;
  semanticPrecedenceAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R158GovernanceGuard,
    | 'triggerSettlementAuthorized'
    | 'semanticPrecedenceAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R158GovernanceGuard =>
  Object.freeze({
    ...value,
    triggerSettlementAuthorized: false,
    semanticPrecedenceAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R158_GOVERNANCE_GUARDS: readonly R158GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R158-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'Break, rescue, counterforce precedence, and change settlement remain unresolved and cannot be collapsed into a global toggle.',
      satisfied:
        R076_EXECUTION_GAPS.includes('BREAK_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('RESCUE_TRIGGER_MATCHING') &&
        R076_EXECUTION_GAPS.includes('COUNTERFORCE_PRECEDENCE') &&
        R076_EXECUTION_GAPS.includes('CHANGE_SETTLEMENT') &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R158-GUARD-R143',
      upstreamAsset: 'R143',
      boundary:
        'Structural relation coexistence is distinct from settlement; source-bounded relation settlements do not authorize universal precedence.',
      satisfied:
        R143_AUTHORITY.structuralCoexistenceDistinctFromSettlementObserved &&
        !R143_AUTHORITY.totalRelationPrecedenceAuthorized &&
        !R143_AUTHORITY.multipleClashAggregationAuthorized &&
        !R143_AUTHORITY.executableGenericSettlementAuthorized,
    }),
    guard({
      guardId: 'R158-GUARD-R154',
      upstreamAsset: 'R154',
      boundary:
        'Input/evaluation order and relation-check order remain non-semantic; first/last-match and sequential mutation remain unauthorized.',
      satisfied:
        R154_AUTHORITY.inputLayerOrderInvariantRepresentationObserved &&
        R154_AUTHORITY.evaluationOrderDistinctFromSemanticPrecedenceObserved &&
        !R154_AUTHORITY.firstMatchWinsAuthorized &&
        !R154_AUTHORITY.lastAppliedWinsAuthorized &&
        !R154_AUTHORITY.sequentialMutationResolverAuthorized &&
        !R154_AUTHORITY.numericTemporalLayerWeightAuthorized &&
        !R154_AUTHORITY.relationCountAsSeverityAuthorized,
    }),
    guard({
      guardId: 'R158-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Trigger classes are provenance observations only; matching, runtime activation, polarity, event, and executable trigger resolution remain unauthorized.',
      satisfied:
        R157_AUTHORITY.triggerClassObservationsPreserved &&
        R157_AUTHORITY.matchingGapsPreserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.executableTriggerResolverAuthorized &&
        !R157_AUTHORITY.fixedPolarityAuthorized &&
        !R157_AUTHORITY.deterministicEventAuthorized,
    }),
  ]);

export const R158_REJECTED_SETTLEMENT_SHORTCUTS = Object.freeze([
  'FIRST_TRIGGER_WINS',
  'LAST_TRIGGER_WINS',
  'TRIGGER_ARRAY_ORDER_AS_PRECEDENCE',
  'TRIGGER_EVALUATION_ORDER_AS_CAUSAL_ORDER',
  'BREAK_ALWAYS_OVERRIDES_RESCUE',
  'RESCUE_ALWAYS_OVERRIDES_BREAK',
  'COUNTERFORCE_ALWAYS_OVERRIDES_BREAK',
  'COUNTERFORCE_ALWAYS_OVERRIDES_RESCUE',
  'STRUCTURAL_CHANGE_TRIGGER_ALWAYS_OVERRIDES_BREAK',
  'BREAK_TRIGGER_ALWAYS_OVERRIDES_STRUCTURAL_CHANGE',
  'MORE_TRIGGERS_MEANS_STRONGER_EFFECT',
  'TRIGGER_COUNT_AS_SEVERITY',
  'NUMERIC_TRIGGER_WEIGHT',
  'SEQUENTIAL_TRIGGER_MUTATION_CREATES_AUTHORITY',
  'SOURCE_BOUNDED_RELATION_SETTLEMENT_GENERALIZES_TO_TRIGGER_PRECEDENCE',
  'COEXISTENCE_EQUALS_RUNTIME_ACTIVATION',
  'COEXISTENCE_EQUALS_FIXED_POLARITY',
  'COEXISTENCE_EQUALS_DETERMINISTIC_EVENT',
  'TRIGGER_SETTLEMENT_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const countCaseFlag = (
  key:
    | 'triggerWinnerAuthorized'
    | 'triggerPrecedenceAuthorized'
    | 'firstMatchWinsAuthorized'
    | 'lastMatchWinsAuthorized'
    | 'sequentialMutationAuthorized'
    | 'triggerCountAsSeverityAuthorized'
    | 'numericTriggerWeightAuthorized'
    | 'automaticBreakRescueSettlementAuthorized'
    | 'automaticCounterforceSettlementAuthorized'
    | 'fixedPolarityAuthorized'
    | 'deterministicEventAuthorized'
    | 'executableTriggerSettlementAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted',
): number => R158_TRIGGER_SET_CASES.filter((item) => item[key]).length;

export const R158_SUMMARY = Object.freeze({
  triggerSetCaseCount: R158_TRIGGER_SET_CASES.length,
  orderVariantCount: R158_ORDER_VARIANTS.length,
  twoTriggerCaseCount: R158_TRIGGER_SET_CASES.filter(
    (item) => item.triggerClasses.length === 2,
  ).length,
  threeTriggerCaseCount: R158_TRIGGER_SET_CASES.filter(
    (item) => item.triggerClasses.length === 3,
  ).length,
  sameSemanticInputSetVariantCount: R158_ORDER_VARIANTS.filter(
    (item) => item.sameSemanticInputSet,
  ).length,
  triggerWinnerAuthorizedCount: countCaseFlag('triggerWinnerAuthorized'),
  triggerPrecedenceAuthorizedCount: countCaseFlag('triggerPrecedenceAuthorized'),
  firstMatchWinsAuthorizedCount: countCaseFlag('firstMatchWinsAuthorized'),
  lastMatchWinsAuthorizedCount: countCaseFlag('lastMatchWinsAuthorized'),
  sequentialMutationAuthorizedCount: countCaseFlag('sequentialMutationAuthorized'),
  triggerCountAsSeverityAuthorizedCount: countCaseFlag(
    'triggerCountAsSeverityAuthorized',
  ),
  numericTriggerWeightAuthorizedCount: countCaseFlag(
    'numericTriggerWeightAuthorized',
  ),
  executableTriggerSettlementAuthorizedCount: countCaseFlag(
    'executableTriggerSettlementAuthorized',
  ),
  interpretationClaimEmissionAuthorizedCount: countCaseFlag(
    'interpretationClaimEmissionAuthorized',
  ),
  productionAuthorityPromotedCount: countCaseFlag(
    'productionAuthorityPromoted',
  ),
  governanceGuardCount: R158_GOVERNANCE_GUARDS.length,
});

export const R158_UPSTREAM_BINDINGS = Object.freeze({
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
  r143: {
    version: R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
    structuralCoexistenceDistinctFromSettlementObserved:
      R143_AUTHORITY.structuralCoexistenceDistinctFromSettlementObserved,
    totalRelationPrecedenceAuthorized:
      R143_AUTHORITY.totalRelationPrecedenceAuthorized,
    multipleClashAggregationAuthorized:
      R143_AUTHORITY.multipleClashAggregationAuthorized,
    executableGenericSettlementAuthorized:
      R143_AUTHORITY.executableGenericSettlementAuthorized,
  },
  r154: {
    version: R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
    inputLayerOrderInvariantRepresentationObserved:
      R154_AUTHORITY.inputLayerOrderInvariantRepresentationObserved,
    evaluationOrderDistinctFromSemanticPrecedenceObserved:
      R154_AUTHORITY.evaluationOrderDistinctFromSemanticPrecedenceObserved,
    firstMatchWinsAuthorized: R154_AUTHORITY.firstMatchWinsAuthorized,
    lastAppliedWinsAuthorized: R154_AUTHORITY.lastAppliedWinsAuthorized,
    sequentialMutationResolverAuthorized:
      R154_AUTHORITY.sequentialMutationResolverAuthorized,
    numericTemporalLayerWeightAuthorized:
      R154_AUTHORITY.numericTemporalLayerWeightAuthorized,
    relationCountAsSeverityAuthorized:
      R154_AUTHORITY.relationCountAsSeverityAuthorized,
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    triggerClassObservationsPreserved:
      R157_AUTHORITY.triggerClassObservationsPreserved,
    matchingGapsPreserved: R157_AUTHORITY.matchingGapsPreserved,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
    executableTriggerResolverAuthorized:
      R157_AUTHORITY.executableTriggerResolverAuthorized,
    fixedPolarityAuthorized: R157_AUTHORITY.fixedPolarityAuthorized,
    deterministicEventAuthorized: R157_AUTHORITY.deterministicEventAuthorized,
  },
});

export const R158_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_COMPETING_TEMPORAL_TRIGGER_COEXISTENCE_BOUNDARY_COMPLETE' as const,
  researchOnly: true,
  competingTriggerCoexistenceObserved: true,
  orderInvariantTriggerSetRepresentationObserved: true,
  coexistenceDistinctFromSettlementObserved: true,
  triggerEnumerationOrderDistinctFromSemanticPrecedenceObserved: true,
  breakRescueCoexistenceObserved: true,
  breakCounterforceCoexistenceObserved: true,
  rescueCounterforceCoexistenceObserved: true,
  threeWayTriggerCoexistenceObserved: true,
  triggerWinnerAuthorized: false,
  triggerPrecedenceAuthorized: false,
  firstMatchWinsAuthorized: false,
  lastMatchWinsAuthorized: false,
  sequentialMutationResolverAuthorized: false,
  triggerCountAsSeverityAuthorized: false,
  numericTriggerWeightAuthorized: false,
  automaticBreakRescueSettlementAuthorized: false,
  automaticCounterforceSettlementAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  executableTriggerSettlementAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
