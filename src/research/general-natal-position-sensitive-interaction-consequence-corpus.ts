import {
  R055_AUTHORITY,
  R055_CONTEXT_AXES,
  R055_SIX_CLASH_CONTEXT_VERSION,
} from './general-natal-six-clash-context.js';
import {
  R057_AUTHORITY,
  R057_CONTEXT_AXES,
  R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
} from './general-natal-liuhai-evidence-weight.js';
import {
  R059_AUTHORITY,
  R059_DIRECT_CASES,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
} from './general-natal-interaction-conflict-corpus.js';
import {
  R073_AUTHORITY,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R143_AUTHORITY,
  R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
  R143_COEXISTENCE_ROWS,
  type R143CoexistenceRow,
} from './general-natal-branch-combination-clash-coexistence-corpus.js';
import {
  R148_AUTHORITY,
  R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION,
} from './general-natal-interaction-precedence-divergence-across-schools.js';
import {
  I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
  type ThreeCombinationClashPlacementClass,
} from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import {
  I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
} from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';

export const R149_POSITION_SENSITIVE_INTERACTION_CONSEQUENCE_VERSION =
  '0.1.0-research' as const;

export type R149ConsequenceState =
  | 'DETERMINISTIC_SOURCE_BOUNDED_BREAK'
  | 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED'
  | 'NO_DIRECT_SETTLEMENT'
  | 'POSITION_DISTANCE_MATERIALITY_ONLY'
  | 'PALACE_POSITION_CONTEXT_ONLY'
  | 'POSITION_AND_NATURE_BOUNDARY'
  | 'TEMPORAL_POSITION_MODULATION_ONLY';

export type R149Provenance =
  | 'R143_I46_PLACEMENT_REPLAY'
  | 'R055_POSITION_DISTANCE_CONTROL'
  | 'R057_PALACE_POSITION_CONTROL'
  | 'R059_POSITION_AND_NATURE_CONTROL'
  | 'R073_TEMPORAL_POSITION_CONTROL';

export interface R149PositionConsequenceRow {
  rowId: string;
  provenance: R149Provenance;
  relationScope: string;
  structuralIdentity: string;
  placementClass: ThreeCombinationClashPlacementClass | null;
  embeddedWithinBureauSpan: boolean | null;
  tightToClashedParticipant: boolean | null;
  positionAxis:
    | 'BUREAU_SPAN_AND_TIGHT_ADJACENCY'
    | 'POSITION_DISTANCE'
    | 'PALACE_POSITION'
    | 'POSITION_AND_NATURE'
    | 'TEMPORAL_POSITION_CONTEXT';
  consequenceState: R149ConsequenceState;
  sourceRefs: readonly string[];
  positionMaterialityObserved: true;
  deterministicConsequenceAuthorized: boolean;
  crossDomainControl: boolean;
  generalizedPositionResolverAuthorized: false;
  rawDistanceStrengthScoreAuthorized: false;
  palacePositionUniversalEffectAuthorized: false;
  pillarPositionSeverityLadderAuthorized: false;
  positionImpliesPolarityAuthorized: false;
  positionImpliesRootDestructionAuthorized: false;
  positionImpliesMechanismForceAuthorized: false;
  positionImpliesEventAuthorized: false;
  numericWeightAuthorized: false;
  globalPrecedenceAuthorized: false;
  executableGenericSettlementAuthorized: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const closedRow = (
  value: Omit<
    R149PositionConsequenceRow,
    | 'generalizedPositionResolverAuthorized'
    | 'rawDistanceStrengthScoreAuthorized'
    | 'palacePositionUniversalEffectAuthorized'
    | 'pillarPositionSeverityLadderAuthorized'
    | 'positionImpliesPolarityAuthorized'
    | 'positionImpliesRootDestructionAuthorized'
    | 'positionImpliesMechanismForceAuthorized'
    | 'positionImpliesEventAuthorized'
    | 'numericWeightAuthorized'
    | 'globalPrecedenceAuthorized'
    | 'executableGenericSettlementAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R149PositionConsequenceRow =>
  Object.freeze({
    ...value,
    generalizedPositionResolverAuthorized: false,
    rawDistanceStrengthScoreAuthorized: false,
    palacePositionUniversalEffectAuthorized: false,
    pillarPositionSeverityLadderAuthorized: false,
    positionImpliesPolarityAuthorized: false,
    positionImpliesRootDestructionAuthorized: false,
    positionImpliesMechanismForceAuthorized: false,
    positionImpliesEventAuthorized: false,
    numericWeightAuthorized: false,
    globalPrecedenceAuthorized: false,
    executableGenericSettlementAuthorized: false,
    productionAuthorityPromoted: false,
  });

const i46 =
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();

const THREE_COMBINATION_ROWS = R143_COEXISTENCE_ROWS.filter(
  (item): item is R143CoexistenceRow =>
    item.combinationKind === 'BRANCH_THREE_COMBINATION',
);

const placementShape = (
  topology: ThreeCombinationClashPlacementClass,
): {
  embedded: boolean;
  tight: boolean;
} => {
  switch (topology) {
    case 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT':
      return { embedded: true, tight: true };
    case 'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT':
      return { embedded: true, tight: false };
    case 'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT':
      return { embedded: false, tight: true };
    case 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT':
      return { embedded: false, tight: false };
    case 'NO_TRACKED_CLASH':
      return { embedded: false, tight: false };
  }
};

const consequenceFor = (
  row: R143CoexistenceRow,
): {
  state: R149ConsequenceState;
  deterministic: boolean;
} => {
  switch (row.result) {
    case 'BROKEN_BY_TIGHT_EMBEDDED_CLASH':
      return {
        state: 'DETERMINISTIC_SOURCE_BOUNDED_BREAK',
        deterministic: true,
      };
    case 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED':
      return {
        state: 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
        deterministic: false,
      };
    case 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE':
      return {
        state: 'NO_DIRECT_SETTLEMENT',
        deterministic: false,
      };
    default:
      throw new Error('R149 unexpected R143 three-combination result');
  }
};

export const R149_THREE_COMBINATION_POSITION_ROWS: readonly R149PositionConsequenceRow[] =
  Object.freeze(
    THREE_COMBINATION_ROWS.map((item, index) => {
      const placement = item.topology as ThreeCombinationClashPlacementClass;
      const shape = placementShape(placement);
      const consequence = consequenceFor(item);
      return closedRow({
        rowId: 'R149-THREE-' + String(index + 1).padStart(2, '0'),
        provenance: 'R143_I46_PLACEMENT_REPLAY',
        relationScope: 'BRANCH_THREE_COMBINATION_WITH_CLASH',
        structuralIdentity: item.combinationIdentity,
        placementClass: placement,
        embeddedWithinBureauSpan: shape.embedded,
        tightToClashedParticipant: shape.tight,
        positionAxis: 'BUREAU_SPAN_AND_TIGHT_ADJACENCY',
        consequenceState: consequence.state,
        sourceRefs: [
          ...item.sourceRefs,
          'I46:' + placement,
          'I47:PLACEMENT_CLASSIFICATION_CONTRACT',
        ],
        positionMaterialityObserved: true,
        deterministicConsequenceAuthorized: consequence.deterministic,
        crossDomainControl: false,
        notes:
          consequence.state === 'DETERMINISTIC_SOURCE_BOUNDED_BREAK'
            ? [
                'Embedded+tight placement is the only source-bounded deterministic bureau-break class.',
                'The deterministic consequence remains limited to this three-combination placement contract.',
              ]
            : consequence.state ===
                'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED'
              ? [
                  'Position changes the settlement class but does not authorize intact or damaged as a deterministic conclusion.',
                ]
              : [
                  'This placement has no direct settlement from I46; absence of a direct consequence is not an intactness verdict.',
                ],
      });
    }),
  );

const r055PositionAxis = R055_CONTEXT_AXES.find(
  (item) => item.axis === 'POSITION_DISTANCE',
);
if (r055PositionAxis === undefined) {
  throw new Error('R149 requires R055 POSITION_DISTANCE');
}

const r057HasPalacePosition = R057_CONTEXT_AXES.includes('PALACE_POSITION');
if (!r057HasPalacePosition) {
  throw new Error('R149 requires R057 PALACE_POSITION');
}

const r059PositionCase = R059_DIRECT_CASES.find(
  (item) => item.id === 'C6-STRUCTURAL-MATCH-MAY-BE-INEFFECTIVE',
);
if (r059PositionCase === undefined) {
  throw new Error('R149 requires R059 positional materiality case C6');
}

const r073PositionState = R073_STATE_MODEL.find(
  (item) => item.state === 'POSITION_CONTEXT_MODULATED',
);
if (r073PositionState === undefined) {
  throw new Error('R149 requires R073 POSITION_CONTEXT_MODULATED');
}

export const R149_POSITION_BOUNDARY_CONTROLS: readonly R149PositionConsequenceRow[] =
  Object.freeze([
    closedRow({
      rowId: 'R149-CONTROL-R055',
      provenance: 'R055_POSITION_DISTANCE_CONTROL',
      relationScope: 'BRANCH_CLASH_CONTEXT',
      structuralIdentity: 'R055:POSITION_DISTANCE',
      placementClass: null,
      embeddedWithinBureauSpan: null,
      tightToClashedParticipant: null,
      positionAxis: 'POSITION_DISTANCE',
      consequenceState: 'POSITION_DISTANCE_MATERIALITY_ONLY',
      sourceRefs: ['R055:POSITION_DISTANCE'],
      positionMaterialityObserved: r055PositionAxis.sourceMaterialityVerified,
      deterministicConsequenceAuthorized: false,
      crossDomainControl: false,
      notes: [
        'R055 verifies that position distance can matter for clash context.',
        'It does not authorize a generalized proximity classifier, raw-distance weight, or clash-effect resolver.',
      ],
    }),
    closedRow({
      rowId: 'R149-CONTROL-R057',
      provenance: 'R057_PALACE_POSITION_CONTROL',
      relationScope: 'BRANCH_HARM_CONTEXT',
      structuralIdentity: 'R057:PALACE_POSITION',
      placementClass: null,
      embeddedWithinBureauSpan: null,
      tightToClashedParticipant: null,
      positionAxis: 'PALACE_POSITION',
      consequenceState: 'PALACE_POSITION_CONTEXT_ONLY',
      sourceRefs: ['R057:PALACE_POSITION'],
      positionMaterialityObserved: true,
      deterministicConsequenceAuthorized: false,
      crossDomainControl: false,
      notes: [
        'R057 preserves palace position as a contextual axis for Liu Hai.',
        'No universal palace-position effect or numeric severity mapping is authorized.',
      ],
    }),
    closedRow({
      rowId: 'R149-CONTROL-R059',
      provenance: 'R059_POSITION_AND_NATURE_CONTROL',
      relationScope: 'CROSS_RELATION_CONFLICT_CONTEXT',
      structuralIdentity: r059PositionCase.id,
      placementClass: null,
      embeddedWithinBureauSpan: null,
      tightToClashedParticipant: null,
      positionAxis: 'POSITION_AND_NATURE',
      consequenceState: 'POSITION_AND_NATURE_BOUNDARY',
      sourceRefs: ['R059:' + r059PositionCase.id, r059PositionCase.sourceSurface],
      positionMaterialityObserved: true,
      deterministicConsequenceAuthorized: false,
      crossDomainControl: false,
      notes: [
        'R059 C6 says effectiveness depends on position and nature and has no single fixed mode.',
        'That observation blocks a position-only deterministic settlement rule.',
      ],
    }),
    closedRow({
      rowId: 'R149-CONTROL-R073',
      provenance: 'R073_TEMPORAL_POSITION_CONTROL',
      relationScope: 'TEMPORAL_LATENT_ACTIVATION',
      structuralIdentity: 'R073:POSITION_CONTEXT_MODULATED',
      placementClass: null,
      embeddedWithinBureauSpan: null,
      tightToClashedParticipant: null,
      positionAxis: 'TEMPORAL_POSITION_CONTEXT',
      consequenceState: 'TEMPORAL_POSITION_MODULATION_ONLY',
      sourceRefs: [
        'R073:POSITION_CONTEXT_MODULATED',
        r073PositionState.sourceRepresentation,
      ],
      positionMaterialityObserved: true,
      deterministicConsequenceAuthorized: false,
      crossDomainControl: true,
      notes: [
        'R073 preserves a bounded positional modulation in temporal activation context.',
        'It is a cross-domain control and cannot be imported as an interaction-effect or pillar-severity resolver.',
      ],
    }),
  ]);

export const R149_POSITION_CONSEQUENCE_ROWS: readonly R149PositionConsequenceRow[] =
  Object.freeze([
    ...R149_THREE_COMBINATION_POSITION_ROWS,
    ...R149_POSITION_BOUNDARY_CONTROLS,
  ]);

export interface R149PositionVariantGroup {
  groupId: string;
  structuralIdentity: string;
  rowIds: readonly string[];
  placementClassCount: number;
  consequenceStateCount: number;
  deterministicBreakCount: number;
  contextualUnresolvedCount: number;
  noDirectSettlementCount: number;
  sameStructureDifferentPositionDifferentConsequenceObserved: true;
  numericPositionOrderingAuthorized: false;
  generalizedConsequenceResolverAuthorized: false;
}

const threeCombinationFamilies = Array.from(
  new Set(
    R149_THREE_COMBINATION_POSITION_ROWS.map(
      (item) => item.structuralIdentity,
    ),
  ),
).sort();

export const R149_POSITION_VARIANT_GROUPS: readonly R149PositionVariantGroup[] =
  Object.freeze(
    threeCombinationFamilies.map((structuralIdentity, index) => {
      const rows = R149_THREE_COMBINATION_POSITION_ROWS.filter(
        (item) => item.structuralIdentity === structuralIdentity,
      );
      const consequenceStates = new Set(rows.map((item) => item.consequenceState));
      return Object.freeze({
        groupId: 'R149-GROUP-' + String(index + 1).padStart(2, '0'),
        structuralIdentity,
        rowIds: rows.map((item) => item.rowId),
        placementClassCount: new Set(rows.map((item) => item.placementClass))
          .size,
        consequenceStateCount: consequenceStates.size,
        deterministicBreakCount: rows.filter(
          (item) =>
            item.consequenceState === 'DETERMINISTIC_SOURCE_BOUNDED_BREAK',
        ).length,
        contextualUnresolvedCount: rows.filter(
          (item) =>
            item.consequenceState ===
            'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
        ).length,
        noDirectSettlementCount: rows.filter(
          (item) => item.consequenceState === 'NO_DIRECT_SETTLEMENT',
        ).length,
        sameStructureDifferentPositionDifferentConsequenceObserved: true as const,
        numericPositionOrderingAuthorized: false as const,
        generalizedConsequenceResolverAuthorized: false as const,
      });
    }),
  );

export const R149_REJECTED_POSITION_SHORTCUTS = Object.freeze([
  'RAW_PILLAR_DISTANCE_AS_INTERACTION_STRENGTH',
  'ADJACENT_ALWAYS_STRONGER_THAN_NONADJACENT',
  'EMBEDDED_ALWAYS_BREAKS_STRUCTURE',
  'OUTSIDE_ALWAYS_PRESERVES_STRUCTURE',
  'PALACE_POSITION_AS_UNIVERSAL_EFFECT_TABLE',
  'YEAR_MONTH_DAY_HOUR_AS_GLOBAL_SEVERITY_LADDER',
  'R073_YEAR_DAY_HOUR_MODULATION_AS_INTERACTION_STRENGTH',
  'POSITION_ALONE_AS_RELATION_EFFECTIVENESS',
  'POSITION_ALONE_AS_HARMFUL_POLARITY',
  'POSITION_ALONE_AS_FAVORABLE_POLARITY',
  'POSITION_AS_ROOT_DESTRUCTION',
  'POSITION_AS_EFFECTIVE_MECHANISM_FORCE',
  'POSITION_AS_EVENT_PREDICTION',
  'I46_PLACEMENT_RESULT_AS_OTHER_RELATION_FAMILY_RULE',
  'POSITION_CLASS_AS_GLOBAL_PRECEDENCE',
  'POSITION_CLASS_AS_NUMERIC_WEIGHT',
  'MULTIPLE_CLASH_DISTANCE_AGGREGATION',
  'NO_DIRECT_SETTLEMENT_AS_INTACT',
  'CONTEXTUAL_UNRESOLVED_AS_DAMAGED',
  'CONTEXTUAL_UNRESOLVED_AS_INTACT',
] as const);

const stateCount = (state: R149ConsequenceState): number =>
  R149_POSITION_CONSEQUENCE_ROWS.filter(
    (item) => item.consequenceState === state,
  ).length;

const countFlag = (
  key:
    | 'generalizedPositionResolverAuthorized'
    | 'rawDistanceStrengthScoreAuthorized'
    | 'palacePositionUniversalEffectAuthorized'
    | 'pillarPositionSeverityLadderAuthorized'
    | 'positionImpliesPolarityAuthorized'
    | 'positionImpliesRootDestructionAuthorized'
    | 'positionImpliesMechanismForceAuthorized'
    | 'positionImpliesEventAuthorized'
    | 'numericWeightAuthorized'
    | 'globalPrecedenceAuthorized'
    | 'executableGenericSettlementAuthorized'
    | 'productionAuthorityPromoted',
): number => R149_POSITION_CONSEQUENCE_ROWS.filter((item) => item[key]).length;

export const R149_SUMMARY = Object.freeze({
  rowCount: R149_POSITION_CONSEQUENCE_ROWS.length,
  threeCombinationPositionRowCount:
    R149_THREE_COMBINATION_POSITION_ROWS.length,
  positionBoundaryControlCount: R149_POSITION_BOUNDARY_CONTROLS.length,
  threeCombinationFamilyCount: R149_POSITION_VARIANT_GROUPS.length,
  placementClassCount: new Set(
    R149_THREE_COMBINATION_POSITION_ROWS.map((item) => item.placementClass),
  ).size,
  deterministicSourceBoundedBreakCount: stateCount(
    'DETERMINISTIC_SOURCE_BOUNDED_BREAK',
  ),
  contextualUnresolvedCount: stateCount(
    'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
  ),
  noDirectSettlementCount: stateCount('NO_DIRECT_SETTLEMENT'),
  positionDistanceMaterialityOnlyCount: stateCount(
    'POSITION_DISTANCE_MATERIALITY_ONLY',
  ),
  palacePositionContextOnlyCount: stateCount(
    'PALACE_POSITION_CONTEXT_ONLY',
  ),
  positionAndNatureBoundaryCount: stateCount(
    'POSITION_AND_NATURE_BOUNDARY',
  ),
  temporalPositionModulationOnlyCount: stateCount(
    'TEMPORAL_POSITION_MODULATION_ONLY',
  ),
  generalizedPositionResolverAuthorizedCount: countFlag(
    'generalizedPositionResolverAuthorized',
  ),
  rawDistanceStrengthScoreAuthorizedCount: countFlag(
    'rawDistanceStrengthScoreAuthorized',
  ),
  palacePositionUniversalEffectAuthorizedCount: countFlag(
    'palacePositionUniversalEffectAuthorized',
  ),
  pillarPositionSeverityLadderAuthorizedCount: countFlag(
    'pillarPositionSeverityLadderAuthorized',
  ),
  positionImpliesPolarityAuthorizedCount: countFlag(
    'positionImpliesPolarityAuthorized',
  ),
  positionImpliesRootDestructionAuthorizedCount: countFlag(
    'positionImpliesRootDestructionAuthorized',
  ),
  positionImpliesMechanismForceAuthorizedCount: countFlag(
    'positionImpliesMechanismForceAuthorized',
  ),
  positionImpliesEventAuthorizedCount: countFlag(
    'positionImpliesEventAuthorized',
  ),
  numericWeightAuthorizedCount: countFlag('numericWeightAuthorized'),
  globalPrecedenceAuthorizedCount: countFlag('globalPrecedenceAuthorized'),
  executableGenericSettlementAuthorizedCount: countFlag(
    'executableGenericSettlementAuthorized',
  ),
  productionAuthorityPromotedCount: countFlag(
    'productionAuthorityPromoted',
  ),
});

export const R149_UPSTREAM_BINDINGS = Object.freeze({
  r055: {
    version: R055_SIX_CLASH_CONTEXT_VERSION,
    positionDistanceSourceMaterialityVerified:
      r055PositionAxis.sourceMaterialityVerified,
    positionDistanceGeneralizedResolverAuthorized:
      r055PositionAxis.generalizedResolverAuthorized,
    numericClashStrengthAuthorized:
      R055_AUTHORITY.numericClashStrengthAuthorized,
    executableEffectResolverAuthorized:
      R055_AUTHORITY.executableEffectResolverAuthorized,
  },
  r057: {
    version: R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
    palacePositionContextAxisObserved: r057HasPalacePosition,
    pairPresenceImpliesFixedEffect:
      R057_AUTHORITY.pairPresenceImpliesFixedEffect,
    numericWeightAuthorized: R057_AUTHORITY.numericWeightAuthorized,
    executableEffectResolverAuthorized:
      R057_AUTHORITY.executableEffectResolverAuthorized,
  },
  r059: {
    version: R059_INTERACTION_CONFLICT_CORPUS_VERSION,
    positionalEffectGapObserved:
      true as const,
    c6BoundedResult: r059PositionCase.boundedResult,
    universalPrecedenceAuthorized:
      R059_AUTHORITY.universalPrecedenceAuthorized,
    executableConflictResolverAuthorized:
      R059_AUTHORITY.executableConflictResolverAuthorized,
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    positionContextModulatedStateObserved: true as const,
    activationImpliesConcreteEvent:
      R073_AUTHORITY.activationImpliesConcreteEvent,
    executableTimingResolverAuthorized:
      R073_AUTHORITY.executableTimingResolverAuthorized,
  },
  r143: {
    version: R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
    placementSensitiveThreeCombinationBoundaryObserved:
      R143_AUTHORITY.placementSensitiveThreeCombinationBoundaryObserved,
    genericPostInteractionBureauStateEmissionAuthorized:
      R143_AUTHORITY.genericPostInteractionBureauStateEmissionAuthorized,
    executableGenericSettlementAuthorized:
      R143_AUTHORITY.executableGenericSettlementAuthorized,
  },
  r148: {
    version: R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION,
    placementSensitivePrecedenceObserved:
      R148_AUTHORITY.placementSensitivePrecedenceObserved,
    globalInteractionPrecedenceAuthorized:
      R148_AUTHORITY.globalInteractionPrecedenceAuthorized,
    executablePrecedenceResolverAuthorized:
      R148_AUTHORITY.executablePrecedenceResolverAuthorized,
  },
  i46: {
    version:
      I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    placementClassificationAuthorized:
      i46.placementClassificationAuthorized,
    tightEmbeddedClashBreakVerdictAuthorized:
      i46.tightEmbeddedClashBreakVerdictAuthorized,
    embeddedNonTightDeterministicDamageVerdictAuthorized:
      i46.embeddedNonTightDeterministicDamageVerdictAuthorized,
    outsideTightDeterministicDamageVerdictAuthorized:
      i46.outsideTightDeterministicDamageVerdictAuthorized,
    outsideNonTightDeterministicSettlementAuthorized:
      i46.outsideNonTightDeterministicSettlementAuthorized,
    clashForceWeightingAuthorized: i46.clashForceWeightingAuthorized,
    genericPostInteractionBureauStateEmissionAuthorized:
      i46.genericPostInteractionBureauStateEmissionAuthorized,
  },
  i47: {
    version:
      I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
    placementClassificationAvailableByContract: true as const,
    genericPostInteractionBureauStateEmissionAuthorized: false as const,
    numericScoringAuthorized: false as const,
  },
});

export const R149_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_POSITION_SENSITIVE_INTERACTION_CONSEQUENCE_CORPUS_COMPLETE' as const,
  researchOnly: true,
  sameStructureDifferentPositionDifferentConsequenceObserved: true,
  bureauSpanEmbeddednessMaterialityObserved: true,
  tightAdjacencyMaterialityObserved: true,
  positionDistanceMaterialityObserved: true,
  palacePositionContextMaterialityObserved: true,
  positionAndNatureJointMaterialityObserved: true,
  temporalPositionModulationKeptCrossDomain: true,
  tightEmbeddedBreakOnlyDeterministicPlacementObserved: true,
  contextualPlacementsRemainUnresolvedObserved: true,
  noDirectSettlementDistinctFromIntactnessObserved: true,
  positionConsequenceDistinctFromPrecedenceObserved: true,
  generalizedPositionResolverAuthorized: false,
  rawDistanceStrengthScoreAuthorized: false,
  palacePositionUniversalEffectAuthorized: false,
  pillarPositionSeverityLadderAuthorized: false,
  positionImpliesPolarityAuthorized: false,
  positionImpliesRootDestructionAuthorized: false,
  positionImpliesMechanismForceAuthorized: false,
  positionImpliesEventAuthorized: false,
  numericPositionWeightAuthorized: false,
  globalPositionPrecedenceAuthorized: false,
  executableGenericSettlementAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
