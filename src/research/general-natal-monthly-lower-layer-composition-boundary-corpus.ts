import {
  R075_AUTHORITY,
  R075_DIRECT_BOUNDARY,
  R075_EXECUTION_GAPS,
  R075_MONTHLY_LUCK_BOUNDARY_VERSION,
  R075_REQUIRED_CONTEXT_LAYERS,
} from './general-natal-monthly-luck-boundary.js';
import {
  R151_AUTHORITY,
  R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
} from './general-natal-dayun-temporal-overlay-replay-corpus.js';
import {
  R152_AUTHORITY,
  R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION,
} from './general-natal-dayun-stem-branch-methodology-divergence-corpus.js';
import {
  R153_AUTHORITY,
  R153_ANNUAL_STEM_BRANCH_DAYUN_LAYERING_VERSION,
} from './general-natal-annual-stem-branch-dayun-layering-corpus.js';
import {
  R154_AUTHORITY,
  R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
} from './general-natal-dayun-annual-conflict-order-sensitivity-corpus.js';

export const R155_MONTHLY_LOWER_LAYER_COMPOSITION_VERSION =
  '0.1.0-research' as const;

export type R155RequiredContextLayer =
  (typeof R075_REQUIRED_CONTEXT_LAYERS)[number];

export type R155LayerRole =
  | 'UPPER_CONTEXT'
  | 'LOWER_TEMPORAL_LAYER'
  | 'CROSS_LAYER_RELATION_CONTEXT';

export interface R155ContextLayerRow {
  rowId: string;
  layer: R155RequiredContextLayer;
  role: R155LayerRole;
  sourceRefs: readonly string[];
  requiredByR075: true;
  monthlyLowerTemporalLayerObserved: boolean;
  monthlyStandaloneOracleAuthorized: false;
  monthlyOverridesUpperContextAuthorized: false;
  permanentNatalMutationAuthorized: false;
  numericLayerWeightAuthorized: false;
  deterministicEventAuthorized: false;
  executable: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const roleFor = (layer: R155RequiredContextLayer): R155LayerRole => {
  switch (layer) {
    case 'NATAL_CONTEXT':
    case 'DAYUN_CONTEXT':
    case 'ANNUAL_CONTEXT':
      return 'UPPER_CONTEXT';
    case 'MONTHLY_STEM_BRANCH':
      return 'LOWER_TEMPORAL_LAYER';
    case 'CROSS_LAYER_INTERACTIONS':
      return 'CROSS_LAYER_RELATION_CONTEXT';
  }
};

const refsFor = (layer: R155RequiredContextLayer): readonly string[] => {
  switch (layer) {
    case 'NATAL_CONTEXT':
      return ['R075:NATAL_CONTEXT', 'R151:NATAL_BASELINE'];
    case 'DAYUN_CONTEXT':
      return [
        'R075:DAYUN_CONTEXT',
        'R151:NATAL_DAYUN_TEMPORAL_OVERLAY',
        'R152:DAYUN_METHOD_DIVERGENCE',
      ];
    case 'ANNUAL_CONTEXT':
      return [
        'R075:ANNUAL_CONTEXT',
        'R153:ANNUAL_DAYUN_LAYERING',
        'R154:DAYUN_ANNUAL_ORDER_SENSITIVITY',
      ];
    case 'MONTHLY_STEM_BRANCH':
      return ['R075:MONTHLY_STEM_BRANCH', 'R075:DIRECT_BOUNDARY'];
    case 'CROSS_LAYER_INTERACTIONS':
      return [
        'R075:CROSS_LAYER_INTERACTIONS',
        'R153:CROSS_LAYER_RELATION_CHECKS',
        'R154:RELATION_CHECK_ORDER',
      ];
  }
};

export const R155_CONTEXT_LAYER_ROWS: readonly R155ContextLayerRow[] =
  Object.freeze(
    R075_REQUIRED_CONTEXT_LAYERS.map((layer, index) =>
      Object.freeze({
        rowId: 'R155-LAYER-' + String(index + 1).padStart(2, '0'),
        layer,
        role: roleFor(layer),
        sourceRefs: refsFor(layer),
        requiredByR075: true as const,
        monthlyLowerTemporalLayerObserved:
          layer === 'MONTHLY_STEM_BRANCH' &&
          R075_DIRECT_BOUNDARY.monthlyIsLowerTemporalLayer,
        monthlyStandaloneOracleAuthorized: false as const,
        monthlyOverridesUpperContextAuthorized: false as const,
        permanentNatalMutationAuthorized: false as const,
        numericLayerWeightAuthorized: false as const,
        deterministicEventAuthorized: false as const,
        executable: false as const,
        interpretationClaimEmissionAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export type R155CompositionConstraintId =
  | 'NATAL_CONTEXT_RETAINED'
  | 'DAYUN_CONTEXT_RETAINED'
  | 'ANNUAL_CONTEXT_RETAINED'
  | 'MONTHLY_STEM_BRANCH_RETAINED'
  | 'CROSS_LAYER_INTERACTIONS_RETAINED'
  | 'CROSS_LAYER_PRECEDENCE_UNRESOLVED';

export interface R155CompositionConstraintRow {
  rowId: string;
  constraintId: R155CompositionConstraintId;
  sourceRefs: readonly string[];
  meaning: string;
  requiredForFaithfulR075Boundary: true;
  unresolvedDayunMethodologyPreserved: boolean;
  orderDoesNotImplyPrecedence: true;
  monthOverridesUpperLayersAuthorized: false;
  relationCountAsSeverityAuthorized: false;
  eventBridgeAuthorized: false;
  monthBoundaryCalendarPolicyAuthorized: false;
  executableCompositionAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const constraint = (
  value: Omit<
    R155CompositionConstraintRow,
    | 'requiredForFaithfulR075Boundary'
    | 'orderDoesNotImplyPrecedence'
    | 'monthOverridesUpperLayersAuthorized'
    | 'relationCountAsSeverityAuthorized'
    | 'eventBridgeAuthorized'
    | 'monthBoundaryCalendarPolicyAuthorized'
    | 'executableCompositionAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R155CompositionConstraintRow =>
  Object.freeze({
    ...value,
    requiredForFaithfulR075Boundary: true,
    orderDoesNotImplyPrecedence: true,
    monthOverridesUpperLayersAuthorized: false,
    relationCountAsSeverityAuthorized: false,
    eventBridgeAuthorized: false,
    monthBoundaryCalendarPolicyAuthorized: false,
    executableCompositionAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R155_COMPOSITION_CONSTRAINTS: readonly R155CompositionConstraintRow[] =
  Object.freeze([
    constraint({
      rowId: 'R155-CONSTRAINT-01',
      constraintId: 'NATAL_CONTEXT_RETAINED',
      sourceRefs: ['R075:NATAL_CONTEXT', 'R151:NATAL_BASELINE'],
      meaning:
        'Monthly interpretation remains relative to natal context and cannot permanently rewrite the natal baseline.',
      unresolvedDayunMethodologyPreserved: false,
    }),
    constraint({
      rowId: 'R155-CONSTRAINT-02',
      constraintId: 'DAYUN_CONTEXT_RETAINED',
      sourceRefs: [
        'R075:DAYUN_CONTEXT',
        'R151:NATAL_DAYUN_TEMPORAL_OVERLAY',
        'R152:DAYUN_METHOD_DIVERGENCE',
      ],
      meaning:
        'Monthly composition retains Dayun context while preserving unresolved Dayun stem/branch methodology.',
      unresolvedDayunMethodologyPreserved: true,
    }),
    constraint({
      rowId: 'R155-CONSTRAINT-03',
      constraintId: 'ANNUAL_CONTEXT_RETAINED',
      sourceRefs: [
        'R075:ANNUAL_CONTEXT',
        'R153:ANNUAL_DAYUN_LAYERING',
        'R154:DAYUN_ANNUAL_ORDER_SENSITIVITY',
      ],
      meaning:
        'Monthly composition retains annual context without granting the annual or monthly layer automatic precedence.',
      unresolvedDayunMethodologyPreserved: true,
    }),
    constraint({
      rowId: 'R155-CONSTRAINT-04',
      constraintId: 'MONTHLY_STEM_BRANCH_RETAINED',
      sourceRefs: ['R075:MONTHLY_STEM_BRANCH', 'R075:DIRECT_BOUNDARY'],
      meaning:
        'Monthly stem and branch remain explicit lower-layer inputs rather than a standalone good/bad score.',
      unresolvedDayunMethodologyPreserved: false,
    }),
    constraint({
      rowId: 'R155-CONSTRAINT-05',
      constraintId: 'CROSS_LAYER_INTERACTIONS_RETAINED',
      sourceRefs: [
        'R075:CROSS_LAYER_INTERACTIONS',
        'R153:CROSS_LAYER_RELATION_CHECKS',
        'R154:RELATION_CHECK_ORDER',
      ],
      meaning:
        'Cross-layer interactions remain required context while relation-check order and relation count remain non-semantic.',
      unresolvedDayunMethodologyPreserved: true,
    }),
    constraint({
      rowId: 'R155-CONSTRAINT-06',
      constraintId: 'CROSS_LAYER_PRECEDENCE_UNRESOLVED',
      sourceRefs: [
        'R075:CROSS_LAYER_PRECEDENCE_GAP',
        'R153:CROSS_LAYER_PRECEDENCE_BOUNDARY',
        'R154:ORDER_INVARIANCE',
      ],
      meaning:
        'Adding the monthly layer does not resolve cross-layer precedence, causal ordering, or deterministic event semantics.',
      unresolvedDayunMethodologyPreserved: false,
    }),
  ]);

export interface R155GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R075' | 'R151' | 'R152' | 'R153' | 'R154';
  boundary: string;
  satisfied: boolean;
  executableCompositionAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R155GovernanceGuard,
    | 'executableCompositionAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R155GovernanceGuard =>
  Object.freeze({
    ...value,
    executableCompositionAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R155_GOVERNANCE_GUARDS: readonly R155GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R155-GUARD-R075',
      upstreamAsset: 'R075',
      boundary:
        'Monthly remains a lower temporal layer requiring five context layers; standalone monthly oracle, permanent natal mutation, deterministic events, and executable resolution remain unauthorized.',
      satisfied:
        R075_REQUIRED_CONTEXT_LAYERS.length === 5 &&
        R075_DIRECT_BOUNDARY.monthlyIsLowerTemporalLayer &&
        !R075_DIRECT_BOUNDARY.monthlyStandaloneOracleAuthorized &&
        !R075_DIRECT_BOUNDARY.monthlyPermanentNatalMutationAuthorized &&
        !R075_AUTHORITY.standaloneMonthlyOracleAuthorized &&
        !R075_AUTHORITY.deterministicMonthlyEventAuthorized &&
        !R075_AUTHORITY.executableMonthlyResolverAuthorized,
    }),
    guard({
      guardId: 'R155-GUARD-R151',
      upstreamAsset: 'R151',
      boundary:
        'Temporal overlays remain distinct from permanent natal mutation and deterministic event authority.',
      satisfied:
        R151_AUTHORITY.natalBaselineDistinctFromTemporalOverlayObserved &&
        !R151_AUTHORITY.generalTemporalTransitionResolverAuthorized &&
        !R151_AUTHORITY.permanentNatalMutationAuthorized &&
        !R151_AUTHORITY.deterministicTemporalEventAuthorized,
    }),
    guard({
      guardId: 'R155-GUARD-R152',
      upstreamAsset: 'R152',
      boundary:
        'Monthly composition cannot silently resolve Dayun stem/branch methodology.',
      satisfied:
        R152_AUTHORITY.methodologyFormulationVarianceObserved &&
        !R152_AUTHORITY.methodWinnerResolverAuthorized &&
        !R152_AUTHORITY.numericMethodPriorityAuthorized &&
        !R152_AUTHORITY.automaticCanonicalMethodSelectionAuthorized &&
        !R152_AUTHORITY.executableDayunWeightingResolverAuthorized,
    }),
    guard({
      guardId: 'R155-GUARD-R153',
      upstreamAsset: 'R153',
      boundary:
        'Annual composition retains natal and Dayun context plus cross-layer checks without establishing a cross-layer winner or event.',
      satisfied:
        R153_AUTHORITY.natalAnnualCompositionRequirementObserved &&
        R153_AUTHORITY.dayunAnnualCompositionRequirementObserved &&
        R153_AUTHORITY.crossLayerMeetingCombinationCheckObserved &&
        R153_AUTHORITY.crossLayerPunishmentClashCheckObserved &&
        !R153_AUTHORITY.crossLayerPrecedenceResolverAuthorized &&
        !R153_AUTHORITY.deterministicAnnualEventAuthorized &&
        !R153_AUTHORITY.executableAnnualCompositionResolverAuthorized,
    }),
    guard({
      guardId: 'R155-GUARD-R154',
      upstreamAsset: 'R154',
      boundary:
        'Temporal layer order and relation-check order cannot become semantic precedence, causal order, first/last-match settlement, numeric weighting, or severity.',
      satisfied:
        R154_AUTHORITY.inputLayerOrderInvariantRepresentationObserved &&
        R154_AUTHORITY.evaluationOrderDistinctFromSemanticPrecedenceObserved &&
        R154_AUTHORITY.relationCheckOrderInvariantRepresentationObserved &&
        !R154_AUTHORITY.inputOrderAsSemanticPrecedenceAuthorized &&
        !R154_AUTHORITY.evaluationOrderAsCausalOrderAuthorized &&
        !R154_AUTHORITY.firstMatchWinsAuthorized &&
        !R154_AUTHORITY.lastAppliedWinsAuthorized &&
        !R154_AUTHORITY.sequentialMutationResolverAuthorized &&
        !R154_AUTHORITY.numericTemporalLayerWeightAuthorized &&
        !R154_AUTHORITY.relationCountAsSeverityAuthorized,
    }),
  ]);

export const R155_REJECTED_MONTHLY_SHORTCUTS = Object.freeze([
  'MONTHLY_STANDALONE_ORACLE',
  'MONTH_PILLAR_ALONE_IMPLIES_EVENT',
  'MONTH_OVERRIDES_NATAL',
  'MONTH_OVERRIDES_DAYUN',
  'MONTH_OVERRIDES_ANNUAL',
  'MOST_RECENT_TEMPORAL_LAYER_ALWAYS_WINS',
  'MONTHLY_RELATION_COUNT_AS_SEVERITY',
  'MONTHLY_ARRAY_ORDER_AS_PRECEDENCE',
  'MONTHLY_EVALUATION_ORDER_AS_CAUSAL_ORDER',
  'FIRST_MONTHLY_RELATION_WINS',
  'LAST_MONTHLY_RELATION_WINS',
  'MONTHLY_LAYER_NUMERIC_WEIGHT',
  'AUTO_SELECT_DAYUN_METHOD_DURING_MONTHLY_COMPOSITION',
  'MONTHLY_GOOD_BAD_SCORE_WITHOUT_UPSTREAM_CONTEXT',
  'MONTHLY_PERMANENT_NATAL_MUTATION',
  'MONTH_BOUNDARY_CALENDAR_POLICY_INVENTED',
  'MONTHLY_RELATION_AS_DETERMINISTIC_EVENT',
  'MONTHLY_COMPOSITION_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const countConstraintFlag = (
  key:
    | 'monthOverridesUpperLayersAuthorized'
    | 'relationCountAsSeverityAuthorized'
    | 'eventBridgeAuthorized'
    | 'monthBoundaryCalendarPolicyAuthorized'
    | 'executableCompositionAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted',
): number => R155_COMPOSITION_CONSTRAINTS.filter((item) => item[key]).length;

export const R155_SUMMARY = Object.freeze({
  contextLayerRowCount: R155_CONTEXT_LAYER_ROWS.length,
  compositionConstraintCount: R155_COMPOSITION_CONSTRAINTS.length,
  totalCorpusRowCount:
    R155_CONTEXT_LAYER_ROWS.length + R155_COMPOSITION_CONSTRAINTS.length,
  requiredContextLayerCount: R075_REQUIRED_CONTEXT_LAYERS.length,
  monthlyLowerLayerRowCount: R155_CONTEXT_LAYER_ROWS.filter(
    (item) => item.monthlyLowerTemporalLayerObserved,
  ).length,
  upperContextRowCount: R155_CONTEXT_LAYER_ROWS.filter(
    (item) => item.role === 'UPPER_CONTEXT',
  ).length,
  crossLayerRelationContextRowCount: R155_CONTEXT_LAYER_ROWS.filter(
    (item) => item.role === 'CROSS_LAYER_RELATION_CONTEXT',
  ).length,
  unresolvedDayunMethodologyPreservedConstraintCount:
    R155_COMPOSITION_CONSTRAINTS.filter(
      (item) => item.unresolvedDayunMethodologyPreserved,
    ).length,
  monthOverridesUpperLayersAuthorizedCount: countConstraintFlag(
    'monthOverridesUpperLayersAuthorized',
  ),
  relationCountAsSeverityAuthorizedCount: countConstraintFlag(
    'relationCountAsSeverityAuthorized',
  ),
  eventBridgeAuthorizedCount: countConstraintFlag('eventBridgeAuthorized'),
  monthBoundaryCalendarPolicyAuthorizedCount: countConstraintFlag(
    'monthBoundaryCalendarPolicyAuthorized',
  ),
  executableCompositionAuthorizedCount: countConstraintFlag(
    'executableCompositionAuthorized',
  ),
  interpretationClaimEmissionAuthorizedCount: countConstraintFlag(
    'interpretationClaimEmissionAuthorized',
  ),
  productionAuthorityPromotedCount: countConstraintFlag(
    'productionAuthorityPromoted',
  ),
  governanceGuardCount: R155_GOVERNANCE_GUARDS.length,
});

export const R155_UPSTREAM_BINDINGS = Object.freeze({
  r075: {
    version: R075_MONTHLY_LUCK_BOUNDARY_VERSION,
    requiredContextLayers: R075_REQUIRED_CONTEXT_LAYERS,
    monthlyIsLowerTemporalLayer:
      R075_DIRECT_BOUNDARY.monthlyIsLowerTemporalLayer,
    monthlyStandaloneOracleAuthorized:
      R075_DIRECT_BOUNDARY.monthlyStandaloneOracleAuthorized,
    monthlyPermanentNatalMutationAuthorized:
      R075_DIRECT_BOUNDARY.monthlyPermanentNatalMutationAuthorized,
    standaloneMonthlyOracleAuthorized:
      R075_AUTHORITY.standaloneMonthlyOracleAuthorized,
    deterministicMonthlyEventAuthorized:
      R075_AUTHORITY.deterministicMonthlyEventAuthorized,
    executableMonthlyResolverAuthorized:
      R075_AUTHORITY.executableMonthlyResolverAuthorized,
    executionGaps: R075_EXECUTION_GAPS,
  },
  r151: {
    version: R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
    natalBaselineDistinctFromTemporalOverlayObserved:
      R151_AUTHORITY.natalBaselineDistinctFromTemporalOverlayObserved,
    generalTemporalTransitionResolverAuthorized:
      R151_AUTHORITY.generalTemporalTransitionResolverAuthorized,
    permanentNatalMutationAuthorized:
      R151_AUTHORITY.permanentNatalMutationAuthorized,
    deterministicTemporalEventAuthorized:
      R151_AUTHORITY.deterministicTemporalEventAuthorized,
  },
  r152: {
    version: R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION,
    methodologyFormulationVarianceObserved:
      R152_AUTHORITY.methodologyFormulationVarianceObserved,
    methodWinnerResolverAuthorized:
      R152_AUTHORITY.methodWinnerResolverAuthorized,
    numericMethodPriorityAuthorized:
      R152_AUTHORITY.numericMethodPriorityAuthorized,
    automaticCanonicalMethodSelectionAuthorized:
      R152_AUTHORITY.automaticCanonicalMethodSelectionAuthorized,
    executableDayunWeightingResolverAuthorized:
      R152_AUTHORITY.executableDayunWeightingResolverAuthorized,
  },
  r153: {
    version: R153_ANNUAL_STEM_BRANCH_DAYUN_LAYERING_VERSION,
    natalAnnualCompositionRequirementObserved:
      R153_AUTHORITY.natalAnnualCompositionRequirementObserved,
    dayunAnnualCompositionRequirementObserved:
      R153_AUTHORITY.dayunAnnualCompositionRequirementObserved,
    crossLayerMeetingCombinationCheckObserved:
      R153_AUTHORITY.crossLayerMeetingCombinationCheckObserved,
    crossLayerPunishmentClashCheckObserved:
      R153_AUTHORITY.crossLayerPunishmentClashCheckObserved,
    crossLayerPrecedenceResolverAuthorized:
      R153_AUTHORITY.crossLayerPrecedenceResolverAuthorized,
    deterministicAnnualEventAuthorized:
      R153_AUTHORITY.deterministicAnnualEventAuthorized,
    executableAnnualCompositionResolverAuthorized:
      R153_AUTHORITY.executableAnnualCompositionResolverAuthorized,
  },
  r154: {
    version: R154_DAYUN_ANNUAL_CONFLICT_ORDER_SENSITIVITY_VERSION,
    inputLayerOrderInvariantRepresentationObserved:
      R154_AUTHORITY.inputLayerOrderInvariantRepresentationObserved,
    evaluationOrderDistinctFromSemanticPrecedenceObserved:
      R154_AUTHORITY.evaluationOrderDistinctFromSemanticPrecedenceObserved,
    relationCheckOrderInvariantRepresentationObserved:
      R154_AUTHORITY.relationCheckOrderInvariantRepresentationObserved,
    inputOrderAsSemanticPrecedenceAuthorized:
      R154_AUTHORITY.inputOrderAsSemanticPrecedenceAuthorized,
    evaluationOrderAsCausalOrderAuthorized:
      R154_AUTHORITY.evaluationOrderAsCausalOrderAuthorized,
    relationCountAsSeverityAuthorized:
      R154_AUTHORITY.relationCountAsSeverityAuthorized,
  },
});

export const R155_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_MONTHLY_LOWER_LAYER_TEMPORAL_COMPOSITION_BOUNDARY_COMPLETE' as const,
  researchOnly: true,
  monthlyLowerTemporalLayerObserved: true,
  fiveContextLayerRequirementPreserved: true,
  natalContextRequiredObserved: true,
  dayunContextRequiredObserved: true,
  annualContextRequiredObserved: true,
  monthlyStemBranchRequiredObserved: true,
  crossLayerInteractionContextRequiredObserved: true,
  unresolvedDayunMethodologyPropagationObserved: true,
  temporalOrderInvariantBoundaryPreserved: true,
  standaloneMonthlyOracleAuthorized: false,
  monthOverridesNatalAuthorized: false,
  monthOverridesDayunAuthorized: false,
  monthOverridesAnnualAuthorized: false,
  mostRecentTemporalLayerWinsAuthorized: false,
  fixedCrossLayerPrecedenceAuthorized: false,
  numericMonthlyLayerWeightAuthorized: false,
  relationCountAsSeverityAuthorized: false,
  monthlyPermanentNatalMutationAuthorized: false,
  deterministicMonthlyEventAuthorized: false,
  monthBoundaryCalendarPolicyAuthorized: false,
  executableMonthlyCompositionResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
