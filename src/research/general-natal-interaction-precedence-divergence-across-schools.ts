import {
  R020_AUTHORITY,
  R020_CROSS_SCHOOL_STRENGTH_VERSION,
  R020_PRIMITIVE_COMPARISON,
} from './general-natal-cross-school-strength-primitives.js';
import {
  R059_AUTHORITY,
  R059_DIRECT_CASES,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
} from './general-natal-interaction-conflict-corpus.js';
import {
  R095_AUTHORITY,
  R095_PROPOSITION_RELATIONS,
  R095_SCHOOL_LINEAGE_TAG_VERSION,
} from './general-natal-school-lineage-tags.js';
import {
  R139_AUTHORITY,
  R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
} from './general-natal-methodology-composition-admissibility-matrix.js';
import {
  R140_AUTHORITY,
  R140_NON_COMPOSITION_PRESERVATION_VERSION,
} from './general-natal-noncomposition-preservation-tests.js';
import {
  R141_AUTHORITY,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
} from './general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';
import {
  R143_AUTHORITY,
  R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
  R143_COEXISTENCE_ROWS,
} from './general-natal-branch-combination-clash-coexistence-corpus.js';
import {
  R147_AUTHORITY,
  R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION,
} from './general-natal-interaction-directionality-counterexample-registry.js';
import {
  I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
} from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';

export const R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION =
  '0.1.0-research' as const;

export type R148PrecedenceProposition =
  | 'P1_COMBINATION_OVER_CLASH'
  | 'P2_CLASH_OVER_COMBINATION'
  | 'P3_MEETING_OVER_CLASH'
  | 'P4_CLASH_OVER_MEETING'
  | 'P5_CLASH_BREAKS_THREE_COMBINATION_BUREAU';

export type R148RelationPair =
  | 'COMBINATION_CLASH'
  | 'MEETING_CLASH'
  | 'THREE_COMBINATION_CLASH';

export type R148EvidenceProvenance =
  | 'R059_DIRECT_CASE'
  | 'R143_SIX_COMBINATION_STRUCTURAL_CONTROL'
  | 'I46_PLACEMENT_POLICY';

export type R148EvidenceState =
  | 'SOURCE_BOUNDED_SUPPORT'
  | 'SOURCE_BOUNDED_LIMIT'
  | 'STRUCTURAL_COEXISTENCE_UNRESOLVED'
  | 'CONTEXTUAL_SETTLEMENT_UNRESOLVED'
  | 'NO_DIRECT_SETTLEMENT';

export type R148LineageAssertionState =
  | 'VERIFIED'
  | 'REVIEWED'
  | 'INCONCLUSIVE';

export interface R148PrecedenceEvidenceRow {
  evidenceId: string;
  propositionTargets: readonly R148PrecedenceProposition[];
  relationPair: R148RelationPair;
  provenance: R148EvidenceProvenance;
  evidenceState: R148EvidenceState;
  sourceRefs: readonly string[];
  sourceStratumKnown: boolean;
  lineageAssertionState: R148LineageAssertionState;
  propositionSupportObserved: boolean;
  stableDominanceObserved: boolean;
  reversePropositionEstablished: false;
  schoolDivergenceEstablished: false;
  globalPrecedenceAuthorized: false;
  totalOrderAuthorized: false;
  majorityVoteAuthorized: false;
  sourceCountWinnerAuthorized: false;
  schoolCountWinnerAuthorized: false;
  numericWeightAuthorized: false;
  automaticTieBreakAuthorized: false;
  executable: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

export type R148SynthesisState =
  | 'BOUNDED_SUPPORT_WITH_SCOPE_LIMITS'
  | 'BOUNDED_BIDIRECTIONAL_CASES'
  | 'PLACEMENT_SENSITIVE_BOUNDED_SUPPORT'
  | 'GENERIC_SUPPORT_INSUFFICIENT'
  | 'GLOBAL_RULE_REJECTED';

export interface R148PropositionSynthesis {
  proposition: R148PrecedenceProposition;
  synthesisState: R148SynthesisState;
  supportingEvidenceIds: readonly string[];
  limitingEvidenceIds: readonly string[];
  oppositeDirectionBoundedEvidenceObserved: boolean;
  sourceOrMethodScopeDivergenceObserved: boolean;
  schoolLineageDivergenceEstablished: false;
  globalPrecedenceAuthorized: false;
  totalOrderAuthorized: false;
  majorityVoteAuthorized: false;
  numericWeightAuthorized: false;
  executableResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

export interface R148GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R095' | 'R020' | 'R139' | 'R140' | 'R141' | 'R147';
  boundary: string;
  satisfied: boolean;
  globalPrecedenceAuthorized: false;
  majorityVoteAuthorized: false;
  numericWeightAuthorized: false;
  executable: false;
}

const closedEvidence = (
  value: Omit<
    R148PrecedenceEvidenceRow,
    | 'reversePropositionEstablished'
    | 'schoolDivergenceEstablished'
    | 'globalPrecedenceAuthorized'
    | 'totalOrderAuthorized'
    | 'majorityVoteAuthorized'
    | 'sourceCountWinnerAuthorized'
    | 'schoolCountWinnerAuthorized'
    | 'numericWeightAuthorized'
    | 'automaticTieBreakAuthorized'
    | 'executable'
    | 'productionAuthorityPromoted'
  >,
): R148PrecedenceEvidenceRow =>
  Object.freeze({
    ...value,
    reversePropositionEstablished: false,
    schoolDivergenceEstablished: false,
    globalPrecedenceAuthorized: false,
    totalOrderAuthorized: false,
    majorityVoteAuthorized: false,
    sourceCountWinnerAuthorized: false,
    schoolCountWinnerAuthorized: false,
    numericWeightAuthorized: false,
    automaticTieBreakAuthorized: false,
    executable: false,
    productionAuthorityPromoted: false,
  });

const closedSynthesis = (
  value: Omit<
    R148PropositionSynthesis,
    | 'schoolLineageDivergenceEstablished'
    | 'globalPrecedenceAuthorized'
    | 'totalOrderAuthorized'
    | 'majorityVoteAuthorized'
    | 'numericWeightAuthorized'
    | 'executableResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R148PropositionSynthesis =>
  Object.freeze({
    ...value,
    schoolLineageDivergenceEstablished: false,
    globalPrecedenceAuthorized: false,
    totalOrderAuthorized: false,
    majorityVoteAuthorized: false,
    numericWeightAuthorized: false,
    executableResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

const closedGuard = (
  value: Omit<
    R148GovernanceGuard,
    | 'globalPrecedenceAuthorized'
    | 'majorityVoteAuthorized'
    | 'numericWeightAuthorized'
    | 'executable'
  >,
): R148GovernanceGuard =>
  Object.freeze({
    ...value,
    globalPrecedenceAuthorized: false,
    majorityVoteAuthorized: false,
    numericWeightAuthorized: false,
    executable: false,
  });

const propositionForR059 = (
  actor: (typeof R059_DIRECT_CASES)[number]['actor'],
  target: (typeof R059_DIRECT_CASES)[number]['target'],
): readonly R148PrecedenceProposition[] => {
  if (actor === 'COMBINATION' && target === 'CLASH') {
    return ['P1_COMBINATION_OVER_CLASH'];
  }
  if (actor === 'CLASH' && target === 'COMBINATION') {
    return ['P2_CLASH_OVER_COMBINATION'];
  }
  if (actor === 'MEETING' && target === 'CLASH') {
    return ['P3_MEETING_OVER_CLASH'];
  }
  if (actor === 'CLASH' && target === 'MEETING') {
    return ['P4_CLASH_OVER_MEETING'];
  }
  return [];
};

const relationPairForR059 = (
  actor: (typeof R059_DIRECT_CASES)[number]['actor'],
  target: (typeof R059_DIRECT_CASES)[number]['target'],
): R148RelationPair => {
  if (
    (actor === 'COMBINATION' && target === 'CLASH') ||
    (actor === 'CLASH' && target === 'COMBINATION')
  ) {
    return 'COMBINATION_CLASH';
  }
  return 'MEETING_CLASH';
};

export const R148_R059_EVIDENCE_ROWS: readonly R148PrecedenceEvidenceRow[] =
  Object.freeze(
    R059_DIRECT_CASES.map((item, index) => {
      const support = item.boundedResult === 'RESOLVES';
      return closedEvidence({
        evidenceId: 'R148-R059-' + String(index + 1).padStart(2, '0'),
        propositionTargets: propositionForR059(item.actor, item.target),
        relationPair: relationPairForR059(item.actor, item.target),
        provenance: 'R059_DIRECT_CASE',
        evidenceState: support
          ? 'SOURCE_BOUNDED_SUPPORT'
          : 'SOURCE_BOUNDED_LIMIT',
        sourceRefs: ['R059:' + item.id, item.sourceSurface],
        sourceStratumKnown: true,
        lineageAssertionState: 'INCONCLUSIVE',
        propositionSupportObserved: support,
        stableDominanceObserved: false,
        notes: [
          'The actor→target result is preserved exactly within this source-bounded case.',
          support
            ? 'A bounded RESOLVES result supports the proposition only within this case.'
            : 'The non-RESOLVES result limits stable or generic dominance inference.',
          'No school-lineage divergence is inferred from source labels or case direction.',
        ],
      });
    }),
  );

const sixCombinationRows = R143_COEXISTENCE_ROWS.filter(
  (item) => item.combinationKind === 'BRANCH_SIX_COMBINATION',
);

const sixCombinationFamilies = Array.from(
  new Set(sixCombinationRows.map((item) => item.combinationIdentity)),
).sort();

export const R148_SIX_COMBINATION_CONTROL_ROWS: readonly R148PrecedenceEvidenceRow[] =
  Object.freeze(
    sixCombinationFamilies.map((family, index) => {
      const rows = sixCombinationRows.filter(
        (item) => item.combinationIdentity === family,
      );
      if (rows.length !== 3) {
        throw new Error('R148 requires three R143 stress rows per six-combination family');
      }
      return closedEvidence({
        evidenceId: 'R148-SIX-' + String(index + 1).padStart(2, '0'),
        propositionTargets: [
          'P1_COMBINATION_OVER_CLASH',
          'P2_CLASH_OVER_COMBINATION',
        ],
        relationPair: 'COMBINATION_CLASH',
        provenance: 'R143_SIX_COMBINATION_STRUCTURAL_CONTROL',
        evidenceState: 'STRUCTURAL_COEXISTENCE_UNRESOLVED',
        sourceRefs: rows.flatMap((item) => item.sourceRefs),
        sourceStratumKnown: true,
        lineageAssertionState: 'INCONCLUSIVE',
        propositionSupportObserved: false,
        stableDominanceObserved: false,
        notes: [
          'All three left/right/dual clash stress topologies remain structurally coexistent and unsettled.',
          'Structural coexistence supports neither combination-over-clash nor clash-over-combination precedence.',
        ],
      });
    }),
  );

const i46 =
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();

const R148_I46_PLACEMENTS = Object.freeze([
  'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
  'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT',
  'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
  'OUTSIDE_BUREAU_SPAN_NOT_TIGHT',
] as const);

export const R148_I46_EVIDENCE_ROWS: readonly R148PrecedenceEvidenceRow[] =
  Object.freeze(
    R148_I46_PLACEMENTS.map((placement, index) => {
      const policy = i46.placementPolicies.find(
        (item) => item.placement === placement,
      );
      if (policy === undefined) {
        throw new Error('R148 missing I46 placement policy');
      }

      const evidenceState: R148EvidenceState =
        policy.settlement === 'BREAK_AUTHORIZED'
          ? 'SOURCE_BOUNDED_SUPPORT'
          : policy.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED'
            ? 'CONTEXTUAL_SETTLEMENT_UNRESOLVED'
            : 'NO_DIRECT_SETTLEMENT';

      return closedEvidence({
        evidenceId: 'R148-I46-' + String(index + 1).padStart(2, '0'),
        propositionTargets: ['P5_CLASH_BREAKS_THREE_COMBINATION_BUREAU'],
        relationPair: 'THREE_COMBINATION_CLASH',
        provenance: 'I46_PLACEMENT_POLICY',
        evidenceState,
        sourceRefs: [
          'I46:' + placement,
          ...i46.sourceBasis.map((item) => item.sourceId),
        ],
        sourceStratumKnown: true,
        lineageAssertionState: 'INCONCLUSIVE',
        propositionSupportObserved: policy.settlement === 'BREAK_AUTHORIZED',
        stableDominanceObserved: false,
        notes:
          policy.settlement === 'BREAK_AUTHORIZED'
            ? [
                'The embedded+tight placement authorizes exactly one source-bounded bureau-break verdict.',
                'This does not authorize a generic clash-over-combination precedence rule.',
              ]
            : policy.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED'
              ? [
                  'This placement preserves intact-versus-damaged uncertainty.',
                  'The unresolved context cannot be collapsed into either side winning.',
                ]
              : [
                  'This rule emits no direct settlement for the placement.',
                  'No direct settlement is not evidence that the bureau survives or that clash loses.',
                ],
      });
    }),
  );

export const R148_PRECEDENCE_EVIDENCE_ROWS: readonly R148PrecedenceEvidenceRow[] =
  Object.freeze([
    ...R148_R059_EVIDENCE_ROWS,
    ...R148_SIX_COMBINATION_CONTROL_ROWS,
    ...R148_I46_EVIDENCE_ROWS,
  ]);

const evidenceIdsFor = (
  proposition: R148PrecedenceProposition,
  predicate: (item: R148PrecedenceEvidenceRow) => boolean,
): readonly string[] =>
  Object.freeze(
    R148_PRECEDENCE_EVIDENCE_ROWS.filter(
      (item) =>
        item.propositionTargets.includes(proposition) &&
        predicate(item),
    ).map((item) => item.evidenceId),
  );

export const R148_PROPOSITION_SYNTHESES: readonly R148PropositionSynthesis[] =
  Object.freeze([
    closedSynthesis({
      proposition: 'P1_COMBINATION_OVER_CLASH',
      synthesisState: 'BOUNDED_SUPPORT_WITH_SCOPE_LIMITS',
      supportingEvidenceIds: evidenceIdsFor(
        'P1_COMBINATION_OVER_CLASH',
        (item) => item.propositionSupportObserved,
      ),
      limitingEvidenceIds: evidenceIdsFor(
        'P1_COMBINATION_OVER_CLASH',
        (item) => !item.propositionSupportObserved,
      ),
      oppositeDirectionBoundedEvidenceObserved: true,
      sourceOrMethodScopeDivergenceObserved: true,
    }),
    closedSynthesis({
      proposition: 'P2_CLASH_OVER_COMBINATION',
      synthesisState: 'GENERIC_SUPPORT_INSUFFICIENT',
      supportingEvidenceIds: evidenceIdsFor(
        'P2_CLASH_OVER_COMBINATION',
        (item) => item.propositionSupportObserved,
      ),
      limitingEvidenceIds: evidenceIdsFor(
        'P2_CLASH_OVER_COMBINATION',
        (item) => !item.propositionSupportObserved,
      ),
      oppositeDirectionBoundedEvidenceObserved: true,
      sourceOrMethodScopeDivergenceObserved: true,
    }),
    closedSynthesis({
      proposition: 'P3_MEETING_OVER_CLASH',
      synthesisState: 'BOUNDED_BIDIRECTIONAL_CASES',
      supportingEvidenceIds: evidenceIdsFor(
        'P3_MEETING_OVER_CLASH',
        (item) => item.propositionSupportObserved,
      ),
      limitingEvidenceIds: evidenceIdsFor(
        'P3_MEETING_OVER_CLASH',
        (item) => !item.propositionSupportObserved,
      ),
      oppositeDirectionBoundedEvidenceObserved: true,
      sourceOrMethodScopeDivergenceObserved: true,
    }),
    closedSynthesis({
      proposition: 'P4_CLASH_OVER_MEETING',
      synthesisState: 'BOUNDED_BIDIRECTIONAL_CASES',
      supportingEvidenceIds: evidenceIdsFor(
        'P4_CLASH_OVER_MEETING',
        (item) => item.propositionSupportObserved,
      ),
      limitingEvidenceIds: evidenceIdsFor(
        'P4_CLASH_OVER_MEETING',
        (item) => !item.propositionSupportObserved,
      ),
      oppositeDirectionBoundedEvidenceObserved: true,
      sourceOrMethodScopeDivergenceObserved: true,
    }),
    closedSynthesis({
      proposition: 'P5_CLASH_BREAKS_THREE_COMBINATION_BUREAU',
      synthesisState: 'PLACEMENT_SENSITIVE_BOUNDED_SUPPORT',
      supportingEvidenceIds: evidenceIdsFor(
        'P5_CLASH_BREAKS_THREE_COMBINATION_BUREAU',
        (item) => item.propositionSupportObserved,
      ),
      limitingEvidenceIds: evidenceIdsFor(
        'P5_CLASH_BREAKS_THREE_COMBINATION_BUREAU',
        (item) => !item.propositionSupportObserved,
      ),
      oppositeDirectionBoundedEvidenceObserved: false,
      sourceOrMethodScopeDivergenceObserved: true,
    }),
  ]);

export const R148_GOVERNANCE_GUARDS: readonly R148GovernanceGuard[] =
  Object.freeze([
    closedGuard({
      guardId: 'R148-GUARD-R095',
      upstreamAsset: 'R095',
      boundary:
        'Lineage relation and proposition relation remain separate; different labels do not establish school divergence.',
      satisfied:
        R095_AUTHORITY.lineageAndPropositionRelationsSeparated &&
        R095_AUTHORITY.propositionComparisonRequiredForDivergence &&
        !R095_AUTHORITY.crossSchoolBlendWithoutCompositionPolicyAuthorized,
    }),
    closedGuard({
      guardId: 'R148-GUARD-R020',
      upstreamAsset: 'R020',
      boundary:
        'Cross-school majority vote and shared-phrase counting cannot create precedence confidence.',
      satisfied:
        R020_AUTHORITY.crossSchoolPrimitiveComparisonBounded &&
        !R020_PRIMITIVE_COMPARISON.crossSchoolMajorityVoteSupported &&
        !R020_PRIMITIVE_COMPARISON.sharedPhraseCountAsIndependentConfidenceSupported,
    }),
    closedGuard({
      guardId: 'R148-GUARD-R139',
      upstreamAsset: 'R139',
      boundary:
        'Method/source counts cannot select a winner and global composition remains unauthorized.',
      satisfied:
        !R139_AUTHORITY.globalCompositionAuthorized &&
        !R139_AUTHORITY.methodWinnerResolverAuthorized &&
        !R139_AUTHORITY.majorityVoteMethodSelectionAuthorized &&
        !R139_AUTHORITY.sourceCountWinnerAuthorized,
    }),
    closedGuard({
      guardId: 'R148-GUARD-R140',
      upstreamAsset: 'R140',
      boundary:
        'Non-composable evidence survives order, majority, weighting, and tie-break pressure without winner leakage.',
      satisfied:
        R140_AUTHORITY.adversarialOrderPreservationObserved &&
        !R140_AUTHORITY.methodWinnerResolverAuthorized &&
        !R140_AUTHORITY.automaticTieBreakAuthorized &&
        !R140_AUTHORITY.numericMethodPriorityAuthorized,
    }),
    closedGuard({
      guardId: 'R148-GUARD-R141',
      upstreamAsset: 'R141',
      boundary:
        'Input enumeration order, first-match, and sequential mutation cannot create relation precedence.',
      satisfied:
        R141_AUTHORITY.inputEnumerationOrderInvariantRepresentationObserved &&
        !R141_AUTHORITY.globalRelationPrecedenceAuthorized &&
        !R141_AUTHORITY.firstMatchWinsAuthorized &&
        !R141_AUTHORITY.sequentialMutationResolverAuthorized,
    }),
    closedGuard({
      guardId: 'R148-GUARD-R147',
      upstreamAsset: 'R147',
      boundary:
        'Source direction and relation directionality remain distinct from global precedence.',
      satisfied:
        R147_AUTHORITY.sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved &&
        !R147_AUTHORITY.globalPrecedenceAuthorized &&
        !R147_AUTHORITY.executableDirectionResolverAuthorized,
    }),
  ]);

export const R148_REJECTED_COLLAPSES = Object.freeze([
  'COMBINATION_ALWAYS_OVERRIDES_CLASH',
  'CLASH_ALWAYS_OVERRIDES_COMBINATION',
  'MEETING_ALWAYS_OVERRIDES_CLASH',
  'CLASH_ALWAYS_OVERRIDES_MEETING',
  'CLASH_ALWAYS_BREAKS_THREE_COMBINATION',
  'R059_CASE_COUNT_AS_PRECEDENCE_VOTE',
  'SOURCE_COUNT_AS_WINNER',
  'SCHOOL_COUNT_AS_WINNER',
  'POPULARITY_AS_AUTHORITY',
  'SENIORITY_AS_PRECEDENCE',
  'SHARED_PHRASE_COUNT_AS_CONFIDENCE',
  'DIFFERENT_SOURCE_LABELS_IMPLY_SCHOOL_DIVERGENCE',
  'SAME_TRADITION_IMPLIES_SAME_PROPOSITION',
  'LINEAGE_RELATION_IMPLIES_PRECEDENCE_EQUIVALENCE',
  'R059_ACTOR_DIRECTION_AS_GLOBAL_PRECEDENCE',
  'R147_DIRECTIONALITY_AS_PRECEDENCE',
  'ARRAY_ORDER_AS_PRECEDENCE',
  'FIRST_MATCH_AS_PRECEDENCE',
  'I46_TIGHT_BREAK_AS_GENERIC_CLASH_WINS',
  'NO_DIRECT_SETTLEMENT_AS_COMBINATION_SURVIVES',
  'CONTEXTUAL_UNRESOLVED_AS_CLASH_WINS',
  'CONTEXTUAL_UNRESOLVED_AS_COMBINATION_WINS',
  'NUMERIC_RELATION_WEIGHT',
  'WEIGHTED_SOURCE_VOTE',
  'AUTO_SELECT_CANONICAL_SCHOOL',
  'AUTO_CONFLICT_TIEBREAK',
] as const);

const evidenceStateCount = (state: R148EvidenceState): number =>
  R148_PRECEDENCE_EVIDENCE_ROWS.filter((item) => item.evidenceState === state)
    .length;

const countEvidenceFlag = (
  key:
    | 'schoolDivergenceEstablished'
    | 'globalPrecedenceAuthorized'
    | 'totalOrderAuthorized'
    | 'majorityVoteAuthorized'
    | 'sourceCountWinnerAuthorized'
    | 'schoolCountWinnerAuthorized'
    | 'numericWeightAuthorized'
    | 'automaticTieBreakAuthorized'
    | 'executable'
    | 'productionAuthorityPromoted',
): number => R148_PRECEDENCE_EVIDENCE_ROWS.filter((item) => item[key]).length;

export const R148_SUMMARY = Object.freeze({
  precedenceEvidenceRowCount: R148_PRECEDENCE_EVIDENCE_ROWS.length,
  r059DirectEvidenceCount: R148_R059_EVIDENCE_ROWS.length,
  sixCombinationStructuralControlCount:
    R148_SIX_COMBINATION_CONTROL_ROWS.length,
  i46PlacementPolicyCount: R148_I46_EVIDENCE_ROWS.length,
  precedencePropositionCount: R148_PROPOSITION_SYNTHESES.length,
  sourceBoundedResolveSupportCount: evidenceStateCount(
    'SOURCE_BOUNDED_SUPPORT',
  ),
  sourceBoundedLimitCount: evidenceStateCount('SOURCE_BOUNDED_LIMIT'),
  structuralCoexistenceUnresolvedCount: evidenceStateCount(
    'STRUCTURAL_COEXISTENCE_UNRESOLVED',
  ),
  contextualSettlementUnresolvedCount: evidenceStateCount(
    'CONTEXTUAL_SETTLEMENT_UNRESOLVED',
  ),
  noDirectSettlementCount: evidenceStateCount('NO_DIRECT_SETTLEMENT'),
  governanceGuardCount: R148_GOVERNANCE_GUARDS.length,
  schoolLineageDivergenceEstablishedCount: countEvidenceFlag(
    'schoolDivergenceEstablished',
  ),
  globalPrecedenceAuthorizedCount: countEvidenceFlag(
    'globalPrecedenceAuthorized',
  ),
  totalOrderAuthorizedCount: countEvidenceFlag('totalOrderAuthorized'),
  majorityVoteAuthorizedCount: countEvidenceFlag('majorityVoteAuthorized'),
  sourceCountWinnerAuthorizedCount: countEvidenceFlag(
    'sourceCountWinnerAuthorized',
  ),
  schoolCountWinnerAuthorizedCount: countEvidenceFlag(
    'schoolCountWinnerAuthorized',
  ),
  numericWeightAuthorizedCount: countEvidenceFlag('numericWeightAuthorized'),
  automaticTieBreakAuthorizedCount: countEvidenceFlag(
    'automaticTieBreakAuthorized',
  ),
  executableCount: countEvidenceFlag('executable'),
  productionAuthorityPromotedCount: countEvidenceFlag(
    'productionAuthorityPromoted',
  ),
});

export const R148_UPSTREAM_BINDINGS = Object.freeze({
  r059: {
    version: R059_INTERACTION_CONFLICT_CORPUS_VERSION,
    directCaseCount: R059_AUTHORITY.directCaseCount,
    universalPrecedenceAuthorized:
      R059_AUTHORITY.universalPrecedenceAuthorized,
    totalOrderAuthorized: R059_AUTHORITY.totalOrderAuthorized,
  },
  r095: {
    version: R095_SCHOOL_LINEAGE_TAG_VERSION,
    propositionRelationVocabulary: R095_PROPOSITION_RELATIONS,
    lineageAndPropositionRelationsSeparated:
      R095_AUTHORITY.lineageAndPropositionRelationsSeparated,
    propositionComparisonRequiredForDivergence:
      R095_AUTHORITY.propositionComparisonRequiredForDivergence,
    crossSchoolBlendWithoutCompositionPolicyAuthorized:
      R095_AUTHORITY.crossSchoolBlendWithoutCompositionPolicyAuthorized,
  },
  r020: {
    version: R020_CROSS_SCHOOL_STRENGTH_VERSION,
    crossSchoolPrimitiveComparisonBounded:
      R020_AUTHORITY.crossSchoolPrimitiveComparisonBounded,
    crossSchoolMajorityVoteSupported:
      R020_PRIMITIVE_COMPARISON.crossSchoolMajorityVoteSupported,
    sharedPhraseCountAsIndependentConfidenceSupported:
      R020_PRIMITIVE_COMPARISON.sharedPhraseCountAsIndependentConfidenceSupported,
  },
  r139: {
    version: R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
    globalCompositionAuthorized: R139_AUTHORITY.globalCompositionAuthorized,
    methodWinnerResolverAuthorized:
      R139_AUTHORITY.methodWinnerResolverAuthorized,
    majorityVoteMethodSelectionAuthorized:
      R139_AUTHORITY.majorityVoteMethodSelectionAuthorized,
    sourceCountWinnerAuthorized: R139_AUTHORITY.sourceCountWinnerAuthorized,
  },
  r140: {
    version: R140_NON_COMPOSITION_PRESERVATION_VERSION,
    adversarialOrderPreservationObserved:
      R140_AUTHORITY.adversarialOrderPreservationObserved,
    methodWinnerResolverAuthorized:
      R140_AUTHORITY.methodWinnerResolverAuthorized,
    automaticTieBreakAuthorized: R140_AUTHORITY.automaticTieBreakAuthorized,
    numericMethodPriorityAuthorized:
      R140_AUTHORITY.numericMethodPriorityAuthorized,
  },
  r141: {
    version: R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
    inputEnumerationOrderInvariantRepresentationObserved:
      R141_AUTHORITY.inputEnumerationOrderInvariantRepresentationObserved,
    globalRelationPrecedenceAuthorized:
      R141_AUTHORITY.globalRelationPrecedenceAuthorized,
    firstMatchWinsAuthorized: R141_AUTHORITY.firstMatchWinsAuthorized,
    sequentialMutationResolverAuthorized:
      R141_AUTHORITY.sequentialMutationResolverAuthorized,
  },
  r143: {
    version: R143_BRANCH_COMBINATION_CLASH_COEXISTENCE_VERSION,
    structuralCoexistenceDistinctFromSettlementObserved:
      R143_AUTHORITY.structuralCoexistenceDistinctFromSettlementObserved,
    sourceBoundedSettlementDistinctFromGlobalPrecedenceObserved:
      R143_AUTHORITY.sourceBoundedSettlementDistinctFromGlobalPrecedenceObserved,
    totalRelationPrecedenceAuthorized:
      R143_AUTHORITY.totalRelationPrecedenceAuthorized,
  },
  r147: {
    version: R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION,
    sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved:
      R147_AUTHORITY.sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved,
    globalPrecedenceAuthorized: R147_AUTHORITY.globalPrecedenceAuthorized,
    executableDirectionResolverAuthorized:
      R147_AUTHORITY.executableDirectionResolverAuthorized,
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
    clashForceWeightingAuthorized: i46.clashForceWeightingAuthorized,
  },
});

export const R148_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_INTERACTION_PRECEDENCE_DIVERGENCE_ACROSS_SCHOOLS_COMPLETE' as const,
  researchOnly: true,
  sourceBoundedOppositeDirectionsObserved: true,
  contextDependentPrecedenceObserved: true,
  placementSensitivePrecedenceObserved: true,
  sourceOrMethodScopeDivergenceObserved: true,
  lineageAndPropositionRelationsSeparated: true,
  schoolLineageDivergenceEstablished: false,
  boundedSupportDistinctFromGlobalPrecedenceObserved: true,
  sourceCountDistinctFromAuthorityObserved: true,
  directionalityDistinctFromPrecedenceObserved: true,
  globalInteractionPrecedenceAuthorized: false,
  totalRelationOrderAuthorized: false,
  combinationAlwaysOverridesClashAuthorized: false,
  clashAlwaysOverridesCombinationAuthorized: false,
  meetingAlwaysOverridesClashAuthorized: false,
  clashAlwaysOverridesMeetingAuthorized: false,
  clashAlwaysBreaksThreeCombinationAuthorized: false,
  majorityVoteAuthorized: false,
  sourceCountWinnerAuthorized: false,
  schoolCountWinnerAuthorized: false,
  popularityWeightAuthorized: false,
  numericRelationWeightAuthorized: false,
  numericSourceWeightAuthorized: false,
  automaticCanonicalSchoolSelectionAuthorized: false,
  automaticTieBreakAuthorized: false,
  executablePrecedenceResolverAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
