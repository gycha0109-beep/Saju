import {
  R055_AUTHORITY,
  R055_SIX_CLASH_CONTEXT_VERSION,
  R055_SIX_CLASH_PAIRS,
} from './general-natal-six-clash-context.js';
import {
  R059_AUTHORITY,
  R059_DIRECT_CASES,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
} from './general-natal-interaction-conflict-corpus.js';
import {
  I43_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMATION_CONVENTION_SCOPE_METHODOLOGY_REVIEW_VERSION,
  buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview,
} from './i43-challenge-root-six-combination-transformation-convention-scope-methodology-review.js';
import {
  I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
  type ThreeCombinationClashPlacementClass,
} from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import {
  R141_AUTHORITY,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
} from './general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';

export const R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION =
  '0.1.0-research' as const;

export type R143Branch = (typeof R055_SIX_CLASH_PAIRS)[number][number];

export type R143CombinationKind =
  | 'BRANCH_SIX_COMBINATION'
  | 'BRANCH_THREE_COMBINATION'
  | 'R059_DIRECT_REPLAY';

export type R143Provenance =
  | 'GOVERNED_STRUCTURAL_STRESS'
  | 'I46_PLACEMENT_BOUNDARY_REPLAY'
  | 'R059_DIRECT_REPLAY';

export type R143Topology =
  | 'SIX_COMBINATION_LEFT_MEMBER_CLASH'
  | 'SIX_COMBINATION_RIGHT_MEMBER_CLASH'
  | 'SIX_COMBINATION_DUAL_MEMBER_CLASH'
  | ThreeCombinationClashPlacementClass
  | 'R059_SOURCE_BOUNDED';

export type R143CoexistenceResult =
  | 'STRUCTURAL_COEXISTENCE_UNRESOLVED'
  | 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
  | 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED'
  | 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE'
  | 'SOURCE_BOUNDED_RESOLVES'
  | 'SOURCE_BOUNDED_CAN_REACTIVATE'
  | 'SOURCE_BOUNDED_MAY_BE_INEFFECTIVE';

export interface R143CoexistenceRow {
  rowId: string;
  provenance: R143Provenance;
  combinationKind: R143CombinationKind;
  combinationIdentity: string;
  clashIdentities: readonly string[];
  clashCount: number;
  topology: R143Topology;
  result: R143CoexistenceResult;
  sourceRefs: readonly string[];
  unresolvedOperands: readonly string[];
  structuralCoexistenceObserved: true;
  sourceBoundedSettlementObserved: boolean;
  combinationAlwaysWinsAuthorized: false;
  clashAlwaysWinsAuthorized: false;
  genericClashBreaksCombinationAuthorized: false;
  genericCombinationResolvesClashAuthorized: false;
  totalRelationPrecedenceAuthorized: false;
  multipleClashAggregationAuthorized: false;
  numericWeightAuthorized: false;
  transformedElementEmissionAuthorized: false;
  executableGenericSettlementAuthorized: false;
  productionAuthorityPromoted: false;
}

const SIX_COMBINATION_PAIRS = Object.freeze([
  ['子', '丑'],
  ['寅', '亥'],
  ['卯', '戌'],
  ['辰', '酉'],
  ['巳', '申'],
  ['午', '未'],
] as const satisfies readonly (readonly [R143Branch, R143Branch])[]);

const THREE_COMBINATION_GROUPS = Object.freeze([
  ['申', '子', '辰'],
  ['巳', '酉', '丑'],
  ['亥', '卯', '未'],
  ['寅', '午', '戌'],
] as const satisfies readonly (readonly [R143Branch, R143Branch, R143Branch])[]);

const I46_PLACEMENTS = Object.freeze([
  'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
  'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT',
  'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
  'OUTSIDE_BUREAU_SPAN_NOT_TIGHT',
] as const satisfies readonly ThreeCombinationClashPlacementClass[]);

const i43 = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();
const i46 = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();

const clashCounterpart = (branch: R143Branch): R143Branch => {
  for (const [left, right] of R055_SIX_CLASH_PAIRS) {
    if (left === branch) return right;
    if (right === branch) return left;
  }
  throw new Error('R143 branch is missing a canonical six-clash counterpart');
};

const clashIdentity = (branch: R143Branch): string => {
  const counterpart = clashCounterpart(branch);
  return [branch, counterpart].sort().join('↔');
};

const row = (
  value: Omit<
    R143CoexistenceRow,
    | 'structuralCoexistenceObserved'
    | 'combinationAlwaysWinsAuthorized'
    | 'clashAlwaysWinsAuthorized'
    | 'genericClashBreaksCombinationAuthorized'
    | 'genericCombinationResolvesClashAuthorized'
    | 'totalRelationPrecedenceAuthorized'
    | 'multipleClashAggregationAuthorized'
    | 'numericWeightAuthorized'
    | 'transformedElementEmissionAuthorized'
    | 'executableGenericSettlementAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R143CoexistenceRow =>
  Object.freeze({
    ...value,
    structuralCoexistenceObserved: true,
    combinationAlwaysWinsAuthorized: false,
    clashAlwaysWinsAuthorized: false,
    genericClashBreaksCombinationAuthorized: false,
    genericCombinationResolvesClashAuthorized: false,
    totalRelationPrecedenceAuthorized: false,
    multipleClashAggregationAuthorized: false,
    numericWeightAuthorized: false,
    transformedElementEmissionAuthorized: false,
    executableGenericSettlementAuthorized: false,
    productionAuthorityPromoted: false,
  });

const SIX_ROWS: readonly R143CoexistenceRow[] = Object.freeze(
  SIX_COMBINATION_PAIRS.flatMap(([left, right], familyIndex) => {
    const familyKey = left + right;
    const common = {
      provenance: 'GOVERNED_STRUCTURAL_STRESS' as const,
      combinationKind: 'BRANCH_SIX_COMBINATION' as const,
      combinationIdentity: familyKey,
      sourceRefs: [
        'I43:STRUCTURAL_PAIRING_SOURCE_RESOLVED',
        'R055:CANONICAL_SIX_CLASH',
      ],
      unresolvedOperands: [
        'SIX_COMBINATION_INTERACTION_SETTLEMENT',
        'PAIR_LOCAL_CLASH_EFFECT',
        'CROSS_RELATION_PRECEDENCE',
      ],
      sourceBoundedSettlementObserved: false,
    };

    return [
      row({
        rowId: 'R143-SIX-' + String(familyIndex + 1).padStart(2, '0') + '-L',
        ...common,
        clashIdentities: [clashIdentity(left)],
        clashCount: 1,
        topology: 'SIX_COMBINATION_LEFT_MEMBER_CLASH',
        result: 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
      }),
      row({
        rowId: 'R143-SIX-' + String(familyIndex + 1).padStart(2, '0') + '-R',
        ...common,
        clashIdentities: [clashIdentity(right)],
        clashCount: 1,
        topology: 'SIX_COMBINATION_RIGHT_MEMBER_CLASH',
        result: 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
      }),
      row({
        rowId: 'R143-SIX-' + String(familyIndex + 1).padStart(2, '0') + '-D',
        ...common,
        clashIdentities: [clashIdentity(left), clashIdentity(right)].sort(),
        clashCount: 2,
        topology: 'SIX_COMBINATION_DUAL_MEMBER_CLASH',
        result: 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
      }),
    ];
  }),
);

const placementResult = (
  placement: ThreeCombinationClashPlacementClass,
): {
  result: R143CoexistenceResult;
  sourceBoundedSettlementObserved: boolean;
} => {
  const policy = i46.placementPolicies.find((item) => item.placement === placement);
  if (!policy) {
    throw new Error('R143 missing I46 placement policy');
  }

  if (policy.settlement === 'BREAK_AUTHORIZED') {
    return {
      result: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      sourceBoundedSettlementObserved: true,
    };
  }
  if (policy.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED') {
    return {
      result: 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
      sourceBoundedSettlementObserved: true,
    };
  }
  return {
    result: 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE',
    sourceBoundedSettlementObserved: true,
  };
};

const THREE_ROWS: readonly R143CoexistenceRow[] = Object.freeze(
  THREE_COMBINATION_GROUPS.flatMap((group, familyIndex) =>
    I46_PLACEMENTS.map((placement, placementIndex) => {
      const clashedParticipant = group[1];
      const placementState = placementResult(placement);
      return row({
        rowId:
          'R143-THREE-' +
          String(familyIndex + 1).padStart(2, '0') +
          '-P' +
          String(placementIndex + 1),
        provenance: 'I46_PLACEMENT_BOUNDARY_REPLAY',
        combinationKind: 'BRANCH_THREE_COMBINATION',
        combinationIdentity: group.join(''),
        clashIdentities: [clashIdentity(clashedParticipant)],
        clashCount: 1,
        topology: placement,
        result: placementState.result,
        sourceRefs: [
          'I46:' + placement,
          'R055:CANONICAL_SIX_CLASH',
        ],
        unresolvedOperands:
          placementState.result === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
            ? [
                'POST_BREAK_ROOT_STATE',
                'EFFECTIVE_MECHANISM_FORCE',
                'USEFULNESS_HARMFULNESS',
              ]
            : [
                'POST_INTERACTION_BUREAU_STATE',
                'SEASONAL_OVERRIDE',
                'SUPPORT_OVERRIDE',
              ],
        sourceBoundedSettlementObserved:
          placementState.sourceBoundedSettlementObserved,
      });
    }),
  ),
);

const r059Result = (
  boundedResult: (typeof R059_DIRECT_CASES)[number]['boundedResult'],
): R143CoexistenceResult => {
  switch (boundedResult) {
    case 'RESOLVES':
      return 'SOURCE_BOUNDED_RESOLVES';
    case 'CAN_REACTIVATE':
      return 'SOURCE_BOUNDED_CAN_REACTIVATE';
    case 'MAY_BE_INEFFECTIVE':
      return 'SOURCE_BOUNDED_MAY_BE_INEFFECTIVE';
  }
};

const R059_ROWS: readonly R143CoexistenceRow[] = Object.freeze(
  R059_DIRECT_CASES.map((item, index) =>
    row({
      rowId: 'R143-R059-' + String(index + 1).padStart(2, '0'),
      provenance: 'R059_DIRECT_REPLAY',
      combinationKind: 'R059_DIRECT_REPLAY',
      combinationIdentity:
        item.actor === 'CLASH'
          ? item.target
          : item.actor,
      clashIdentities: ['SOURCE_BOUNDED_CLASH'],
      clashCount: 1,
      topology: 'R059_SOURCE_BOUNDED',
      result: r059Result(item.boundedResult),
      sourceRefs: ['R059:' + item.id, item.sourceSurface],
      unresolvedOperands: [
        'POSITIONAL_EFFECT',
        'RELATION_EFFECTIVENESS',
        'MULTIPLE_RELATION_SETTLEMENT',
        'CROSS_RELATION_PRECEDENCE',
      ],
      sourceBoundedSettlementObserved: true,
    }),
  ),
);

export const R143_COEXISTENCE_ROWS: readonly R143CoexistenceRow[] =
  Object.freeze([...SIX_ROWS, ...THREE_ROWS, ...R059_ROWS]);

export const R143_REJECTED_COLLAPSES = Object.freeze([
  'SIX_COMBINATION_ALWAYS_OVERRIDES_CLASH',
  'CLASH_ALWAYS_OVERRIDES_SIX_COMBINATION',
  'THREE_COMBINATION_ALWAYS_OVERRIDES_CLASH',
  'CLASH_ALWAYS_BREAKS_THREE_COMBINATION',
  'R059_RESOLVES_AS_GLOBAL_PRECEDENCE',
  'R059_ACTOR_DIRECTION_AS_TOTAL_ORDER',
  'DUAL_CLASH_COUNT_AS_STRONGER_WEIGHT',
  'MULTIPLE_CLASHES_AUTO_AGGREGATE',
  'STRUCTURAL_COEXISTENCE_AS_EFFECTIVE_COMBINATION',
  'STRUCTURAL_COEXISTENCE_AS_EFFECTIVE_CLASH',
  'NO_I46_DIRECT_SETTLEMENT_AS_INTACT',
  'CONTEXTUAL_UNRESOLVED_AS_DAMAGED',
  'CONTEXTUAL_UNRESOLVED_AS_INTACT',
  'SIX_COMBINATION_AS_TRANSFORMED_ELEMENT',
  'NUMERIC_RELATION_STRENGTH_SCORE',
  'ARRAY_ORDER_AS_SETTLEMENT_PRECEDENCE',
] as const);

const resultCount = (result: R143CoexistenceResult): number =>
  R143_COEXISTENCE_ROWS.filter((item) => item.result === result).length;

export const R143_SUMMARY = Object.freeze({
  rowCount: R143_COEXISTENCE_ROWS.length,
  sixCombinationFamilyCount: SIX_COMBINATION_PAIRS.length,
  sixCombinationRowCount: SIX_ROWS.length,
  sixSingleClashRowCount: SIX_ROWS.filter((item) => item.clashCount === 1).length,
  sixDualClashRowCount: SIX_ROWS.filter((item) => item.clashCount === 2).length,
  threeCombinationFamilyCount: THREE_COMBINATION_GROUPS.length,
  threeCombinationRowCount: THREE_ROWS.length,
  i46DirectBreakCount: resultCount('BROKEN_BY_TIGHT_EMBEDDED_CLASH'),
  i46ContextualUnresolvedCount: resultCount(
    'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
  ),
  i46NoDirectSettlementCount: resultCount('NO_DIRECT_SETTLEMENT_FROM_THIS_RULE'),
  r059ReplayCount: R059_ROWS.length,
  r059ResolveReplayCount: resultCount('SOURCE_BOUNDED_RESOLVES'),
  r059ReactivateReplayCount: resultCount('SOURCE_BOUNDED_CAN_REACTIVATE'),
  r059MayBeIneffectiveReplayCount: resultCount(
    'SOURCE_BOUNDED_MAY_BE_INEFFECTIVE',
  ),
  structuralCoexistenceUnresolvedCount: resultCount(
    'STRUCTURAL_COEXISTENCE_UNRESOLVED',
  ),
  sourceBoundedSettlementObservedCount: R143_COEXISTENCE_ROWS.filter(
    (item) => item.sourceBoundedSettlementObserved,
  ).length,
  genericPrecedenceAuthorizedCount: R143_COEXISTENCE_ROWS.filter(
    (item) => item.totalRelationPrecedenceAuthorized,
  ).length,
  multipleClashAggregationAuthorizedCount: R143_COEXISTENCE_ROWS.filter(
    (item) => item.multipleClashAggregationAuthorized,
  ).length,
  numericWeightAuthorizedCount: R143_COEXISTENCE_ROWS.filter(
    (item) => item.numericWeightAuthorized,
  ).length,
  transformedElementEmissionAuthorizedCount: R143_COEXISTENCE_ROWS.filter(
    (item) => item.transformedElementEmissionAuthorized,
  ).length,
  executableGenericSettlementAuthorizedCount: R143_COEXISTENCE_ROWS.filter(
    (item) => item.executableGenericSettlementAuthorized,
  ).length,
});

export const R143_UPSTREAM_BINDINGS = Object.freeze({
  r055: {
    version: R055_SIX_CLASH_CONTEXT_VERSION,
    structuralPairCount: R055_AUTHORITY.structuralPairCount,
    pairPresenceImpliesEffectiveClash:
      R055_AUTHORITY.pairPresenceImpliesEffectiveClash,
    universalCrossRelationPrecedenceAuthorized:
      R055_AUTHORITY.universalCrossRelationPrecedenceAuthorized,
    executableEffectResolverAuthorized:
      R055_AUTHORITY.executableEffectResolverAuthorized,
  },
  r059: {
    version: R059_INTERACTION_CONFLICT_CORPUS_VERSION,
    directCaseCount: R059_AUTHORITY.directCaseCount,
    universalPrecedenceAuthorized:
      R059_AUTHORITY.universalPrecedenceAuthorized,
    totalOrderAuthorized: R059_AUTHORITY.totalOrderAuthorized,
    executableConflictResolverAuthorized:
      R059_AUTHORITY.executableConflictResolverAuthorized,
  },
  i43: {
    version:
      I43_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMATION_CONVENTION_SCOPE_METHODOLOGY_REVIEW_VERSION,
    structuralPairingSourceResolved: i43.sixCombinationStructuralPairingSourceResolved,
    transformedElementEmissionAuthorized:
      i43.sixCombinationTraditionalReferenceElementEmissionAuthorized,
    transformationStateEmissionAuthorized:
      i43.sixCombinationChallengeRootTransformationStateEmissionAuthorized,
    noEffectConclusionAuthorized: i43.sixCombinationNoEffectConclusionAuthorized,
    interactionSettlementPolicyStillRequired:
      i43.sixCombinationInteractionSettlementPolicyStillRequired,
  },
  i46: {
    version:
      I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    tightEmbeddedClashBreakVerdictAuthorized:
      i46.tightEmbeddedClashBreakVerdictAuthorized,
    embeddedNonTightDeterministicDamageVerdictAuthorized:
      i46.embeddedNonTightDeterministicDamageVerdictAuthorized,
    outsideTightDeterministicDamageVerdictAuthorized:
      i46.outsideTightDeterministicDamageVerdictAuthorized,
    outsideNonTightDeterministicSettlementAuthorized:
      i46.outsideNonTightDeterministicSettlementAuthorized,
    multipleClashAggregationAuthorized: i46.multipleClashAggregationAuthorized,
    clashForceWeightingAuthorized: i46.clashForceWeightingAuthorized,
    genericPostInteractionBureauStateEmissionAuthorized:
      i46.genericPostInteractionBureauStateEmissionAuthorized,
  },
  r141: {
    version: R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
    globalRelationPrecedenceAuthorized:
      R141_AUTHORITY.globalRelationPrecedenceAuthorized,
    totalRelationOrderAuthorized: R141_AUTHORITY.totalRelationOrderAuthorized,
    firstMatchWinsAuthorized: R141_AUTHORITY.firstMatchWinsAuthorized,
    sequentialMutationResolverAuthorized:
      R141_AUTHORITY.sequentialMutationResolverAuthorized,
  },
});

export const R143_AUTHORITY = Object.freeze({
  status: 'RESEARCH_BRANCH_COMBINATION_CLASH_COEXISTENCE_CORPUS_COMPLETE' as const,
  researchOnly: true,
  allSixCombinationFamiliesCovered: true,
  allThreeCombinationFamiliesCovered: true,
  allR059DirectCasesReplayed: true,
  structuralCoexistenceDistinctFromSettlementObserved: true,
  placementSensitiveThreeCombinationBoundaryObserved: true,
  sourceBoundedSettlementDistinctFromGlobalPrecedenceObserved: true,
  combinationAlwaysWinsAuthorized: false,
  clashAlwaysWinsAuthorized: false,
  genericClashBreaksCombinationAuthorized: false,
  genericCombinationResolvesClashAuthorized: false,
  totalRelationPrecedenceAuthorized: false,
  multipleClashAggregationAuthorized: false,
  numericRelationWeightAuthorized: false,
  sixCombinationTransformedElementEmissionAuthorized: false,
  genericPostInteractionBureauStateEmissionAuthorized: false,
  executableGenericSettlementAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
