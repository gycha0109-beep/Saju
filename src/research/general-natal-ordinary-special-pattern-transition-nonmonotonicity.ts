import {
  R029_AUTHORITY,
  R029_FOLLOW_PATTERN_VERSION,
  type R029FollowTarget,
} from './general-natal-follow-pattern-entry-exit.js';
import {
  R030_AUTHORITY,
  R030_GEJU_CONFLICT_MATRIX_VERSION,
} from './general-natal-geju-conflict-resolution-matrix.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from './general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  R133_AUTHORITY,
  R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
} from './general-natal-pattern-rescue-failure-precedence-graph.js';
import {
  R134_AUTHORITY,
  R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
} from './general-natal-special-pattern-exit-adversarial-corpus.js';

export const R135_ORDINARY_SPECIAL_NONMONOTONICITY_VERSION =
  '0.1.0-research' as const;

export type R135TransitionDirection =
  | 'ORDINARY_TO_SPECIAL_PROBE'
  | 'SPECIAL_TO_ORDINARY_BLOCK'
  | 'UNRESOLVED_OR_NEITHER';

export type R135ResearchState =
  | 'ORDINARY_PATH_AVAILABLE'
  | 'ORDINARY_PATH_BROKEN'
  | 'SPECIAL_PATH_RESEARCH_PLAUSIBLE'
  | 'SPECIAL_PATH_BLOCKED'
  | 'SPECIAL_PREREQUISITE_UNRESOLVED'
  | 'NEITHER_PATH_ESTABLISHED'
  | 'INDETERMINATE';

export type R135Provenance =
  | 'GOVERNED_REPOSITORY_BOUNDARY'
  | 'RESEARCH_SYNTHETIC_TRANSITION';

export interface R135TransitionRow {
  transitionId: string;
  comparisonGroup: string;
  target: R029FollowTarget;
  direction: R135TransitionDirection;
  provenance: R135Provenance;
  sourceBoundaryRefs: readonly string[];
  baselineState: R135ResearchState;
  perturbation: string;
  resultingState: R135ResearchState;
  unresolvedOperands: readonly string[];
  ordinaryFailureCounterexample: boolean;
  contextDivergenceKey: string | null;
  oppositeDirectionPairKey: string | null;
  scalarRank: null;
  numericScore: null;
  probability: null;
  distance: null;
  temporalTransition: false;
  transitionResolverAuthorized: false;
  candidateIdentityAuthorized: false;
  establishmentPredicateAuthorized: false;
  candidateFactsEmitted: false;
  establishmentFactsEmitted: false;
  productionAuthorityPromoted: false;
}

interface R135TargetConfig {
  target: R029FollowTarget;
  prerequisite: string;
  removalResult: 'SPECIAL_PATH_RESEARCH_PLAUSIBLE' | 'INDETERMINATE';
  removalUnresolved: readonly string[];
}

const TARGETS: readonly R135TargetConfig[] = Object.freeze([
  {
    target: 'FOLLOW_STRONG',
    prerequisite: '日與月同 + 四柱氣象偏於一方 + 四柱無可扶抑',
    removalResult: 'SPECIAL_PATH_RESEARCH_PLAUSIBLE',
    removalUnresolved: [],
  },
  {
    target: 'FOLLOW_PROSPEROUS',
    prerequisite: '日與月同 + 四柱氣象偏於一方 + 四柱無可扶抑',
    removalResult: 'SPECIAL_PATH_RESEARCH_PLAUSIBLE',
    removalUnresolved: [],
  },
  {
    target: 'FOLLOW_OFFICER_KILL',
    prerequisite: '日不與月同 + 日元臨絕 + 四柱氣象偏於一方',
    removalResult: 'SPECIAL_PATH_RESEARCH_PLAUSIBLE',
    removalUnresolved: [],
  },
  {
    target: 'FOLLOW_WEALTH',
    prerequisite: '日不與月同 + 日元臨絕 + 四柱氣象偏於一方',
    removalResult: 'INDETERMINATE',
    removalUnresolved: ['DAY_MASTER_LIN_JUE'],
  },
  {
    target: 'FOLLOW_OUTPUT',
    prerequisite: '日不與月同 + 日元臨絕 + 四柱氣象偏於一方',
    removalResult: 'SPECIAL_PATH_RESEARCH_PLAUSIBLE',
    removalUnresolved: [],
  },
  {
    target: 'TRANSFORM_QI',
    prerequisite: '日干化合 + transformation validity',
    removalResult: 'INDETERMINATE',
    removalUnresolved: ['DAY_STEM_TRANSFORMATION_VALIDITY'],
  },
]);

const specialPrerequisiteGap = (target: R029FollowTarget): string => {
  switch (target) {
    case 'FOLLOW_STRONG':
      return 'WHOLE_CHART_ONE_SIDEDNESS';
    case 'FOLLOW_PROSPEROUS':
      return 'DAY_MONTH_SAME_SEMANTICS';
    case 'FOLLOW_OFFICER_KILL':
    case 'FOLLOW_WEALTH':
    case 'FOLLOW_OUTPUT':
      return 'DAY_MASTER_LIN_JUE';
    case 'TRANSFORM_QI':
      return 'DAY_STEM_TRANSFORMATION_VALIDITY';
  }
};

const row = (
  input: Omit<
    R135TransitionRow,
    | 'scalarRank'
    | 'numericScore'
    | 'probability'
    | 'distance'
    | 'temporalTransition'
    | 'transitionResolverAuthorized'
    | 'candidateIdentityAuthorized'
    | 'establishmentPredicateAuthorized'
    | 'candidateFactsEmitted'
    | 'establishmentFactsEmitted'
    | 'productionAuthorityPromoted'
  >,
): R135TransitionRow =>
  Object.freeze({
    ...input,
    scalarRank: null,
    numericScore: null,
    probability: null,
    distance: null,
    temporalTransition: false,
    transitionResolverAuthorized: false,
    candidateIdentityAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionAuthorityPromoted: false,
  });

export const R135_TRANSITIONS: readonly R135TransitionRow[] = Object.freeze(
  TARGETS.flatMap((config, index) => {
    const key = String(index + 1).padStart(2, '0');
    const pairKey = `R135-OPPOSITE-${config.target}`;
    return [
      row({
        transitionId: `R135-T${key}A-REMOVE-ORDINARY-PATH`,
        comparisonGroup: `R135-G${key}-ORDINARY-SPECIAL-BOUNDARY`,
        target: config.target,
        direction: 'ORDINARY_TO_SPECIAL_PROBE',
        provenance: 'RESEARCH_SYNTHETIC_TRANSITION',
        sourceBoundaryRefs: ['R029', 'R030', 'R134'],
        baselineState: 'ORDINARY_PATH_AVAILABLE',
        perturbation: 'REMOVE_ORDINARY_PATH',
        resultingState: config.removalResult,
        unresolvedOperands: config.removalUnresolved,
        ordinaryFailureCounterexample: false,
        contextDivergenceKey: 'REMOVE_ORDINARY_PATH',
        oppositeDirectionPairKey: pairKey,
      }),
      row({
        transitionId: `R135-T${key}B-ADD-ORDINARY-PATH`,
        comparisonGroup: `R135-G${key}-ORDINARY-SPECIAL-BOUNDARY`,
        target: config.target,
        direction: 'SPECIAL_TO_ORDINARY_BLOCK',
        provenance: 'GOVERNED_REPOSITORY_BOUNDARY',
        sourceBoundaryRefs: ['R029:ordinary-path-exclusions', 'R030:ordinary-path-present', 'R134'],
        baselineState: 'SPECIAL_PATH_RESEARCH_PLAUSIBLE',
        perturbation: 'ADD_ORDINARY_PATH',
        resultingState: 'SPECIAL_PATH_BLOCKED',
        unresolvedOperands: [],
        ordinaryFailureCounterexample: false,
        contextDivergenceKey: null,
        oppositeDirectionPairKey: pairKey,
      }),
      row({
        transitionId: `R135-T${key}C-UNRESOLVED-SPECIAL-PREREQUISITE`,
        comparisonGroup: `R135-G${key}-UNRESOLVED-BOUNDARY`,
        target: config.target,
        direction: 'UNRESOLVED_OR_NEITHER',
        provenance: 'RESEARCH_SYNTHETIC_TRANSITION',
        sourceBoundaryRefs: ['R029:execution-gaps', 'R134'],
        baselineState: 'NEITHER_PATH_ESTABLISHED',
        perturbation: `UNRESOLVE_${specialPrerequisiteGap(config.target)}`,
        resultingState: 'INDETERMINATE',
        unresolvedOperands: [specialPrerequisiteGap(config.target)],
        ordinaryFailureCounterexample: false,
        contextDivergenceKey: 'UNRESOLVE_SPECIAL_PREREQUISITE',
        oppositeDirectionPairKey: null,
      }),
      row({
        transitionId: `R135-T${key}D-BREAK-ORDINARY-PATH`,
        comparisonGroup: `R135-G${key}-BROKEN-ORDINARY-BOUNDARY`,
        target: config.target,
        direction: 'ORDINARY_TO_SPECIAL_PROBE',
        provenance: 'GOVERNED_REPOSITORY_BOUNDARY',
        sourceBoundaryRefs: ['R029:broken-ordinary-pattern-is-not-month-order-useless', 'R030:broken-ordinary-no-rescue', 'R134'],
        baselineState: 'ORDINARY_PATH_AVAILABLE',
        perturbation: 'BREAK_ORDINARY_PATH_WITHOUT_PROVING_ABSENCE',
        resultingState: 'ORDINARY_PATH_BROKEN',
        unresolvedOperands: ['RESCUE_AVAILABILITY'],
        ordinaryFailureCounterexample: true,
        contextDivergenceKey: 'ORDINARY_PATH_DAMAGE',
        oppositeDirectionPairKey: null,
      }),
    ];
  }),
);

export const R135_REJECTED_MONOTONICITIES = Object.freeze([
  'ORDINARY_FAILURE_EQUALS_SPECIAL_PROGRESS',
  'ORDINARY_PATH_REMOVAL_EQUALS_SPECIAL_ESTABLISHMENT',
  'MORE_ONE_SIDED_EQUALS_HIGHER_SPECIAL_SCORE',
  'SPECIAL_PATH_PLAUSIBLE_EQUALS_SPECIAL_CANDIDATE',
  'OPPOSITE_DIRECTION_PAIR_EQUALS_REVERSIBLE_NUMERIC_AXIS',
  'SAME_PERTURBATION_EQUALS_SAME_OUTCOME_ACROSS_CONTEXTS',
  'BROKEN_ORDINARY_EQUALS_ABSENT_ORDINARY_PATH',
  'UNRESOLVED_PREREQUISITE_EQUALS_NEGATIVE_PREREQUISITE',
  'STRUCTURAL_TRANSITION_EQUALS_TEMPORAL_TRANSITION',
  'NON_MONOTONICITY_EQUALS_RANDOMNESS',
] as const);

const divergenceRows = R135_TRANSITIONS.filter(
  (item) => item.contextDivergenceKey === 'REMOVE_ORDINARY_PATH',
);
const divergenceOutcomes = new Set(divergenceRows.map((item) => item.resultingState));

export const R135_SUMMARY = Object.freeze({
  transitionCount: R135_TRANSITIONS.length,
  comparisonGroupCount: new Set(
    R135_TRANSITIONS.map((item) => item.comparisonGroup),
  ).size,
  representedTargetCount: new Set(R135_TRANSITIONS.map((item) => item.target)).size,
  ordinaryToSpecialProbeCount: R135_TRANSITIONS.filter(
    (item) => item.direction === 'ORDINARY_TO_SPECIAL_PROBE',
  ).length,
  specialToOrdinaryBlockCount: R135_TRANSITIONS.filter(
    (item) => item.direction === 'SPECIAL_TO_ORDINARY_BLOCK',
  ).length,
  unresolvedOrNeitherCount: R135_TRANSITIONS.filter(
    (item) => item.direction === 'UNRESOLVED_OR_NEITHER',
  ).length,
  ordinaryFailureCounterexampleCount: R135_TRANSITIONS.filter(
    (item) => item.ordinaryFailureCounterexample,
  ).length,
  removeOrdinaryPathContextDivergenceRowCount:
    divergenceOutcomes.size > 1 ? divergenceRows.length : 0,
  oppositeDirectionPairCount: new Set(
    R135_TRANSITIONS.map((item) => item.oppositeDirectionPairKey).filter(
      (item): item is string => item !== null,
    ),
  ).size,
  scalarRankEmittedCount: R135_TRANSITIONS.filter(
    (item) => item.scalarRank !== null,
  ).length,
  numericScoreEmittedCount: R135_TRANSITIONS.filter(
    (item) => item.numericScore !== null,
  ).length,
  temporalTransitionAuthorizedCount: R135_TRANSITIONS.filter(
    (item) => item.temporalTransition,
  ).length,
  transitionResolverAuthorizedCount: R135_TRANSITIONS.filter(
    (item) => item.transitionResolverAuthorized,
  ).length,
  candidateFactsEmittedCount: R135_TRANSITIONS.filter(
    (item) => item.candidateFactsEmitted,
  ).length,
  establishmentFactsEmittedCount: R135_TRANSITIONS.filter(
    (item) => item.establishmentFactsEmitted,
  ).length,
});

export const R135_UPSTREAM_BINDINGS = Object.freeze({
  r029: Object.freeze({
    version: R029_FOLLOW_PATTERN_VERSION,
    executableFollowPatternResolverAuthorized:
      R029_AUTHORITY.executableFollowPatternResolverAuthorized,
  }),
  r030: Object.freeze({
    version: R030_GEJU_CONFLICT_MATRIX_VERSION,
    conflictWinnerResolverAuthorized:
      R030_AUTHORITY.conflictWinnerResolverAuthorized,
    establishmentResolverAuthorized:
      R030_AUTHORITY.establishmentResolverAuthorized,
  }),
  r131: Object.freeze({
    version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
    candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
    establishmentPredicateAuthorized:
      R131_AUTHORITY.establishmentPredicateAuthorized,
  }),
  r133: Object.freeze({
    version: R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
    globalRelationPrecedenceAuthorized:
      R133_AUTHORITY.globalRelationPrecedenceAuthorized,
    rescueResolverAuthorized: R133_AUTHORITY.rescueResolverAuthorized,
  }),
  r134: Object.freeze({
    version: R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
    specialPatternResolverAuthorized:
      R134_AUTHORITY.specialPatternResolverAuthorized,
    temporalTransitionSemanticsAuthorized:
      R134_AUTHORITY.temporalTransitionSemanticsAuthorized,
    candidateIdentityAuthorized: R134_AUTHORITY.candidateIdentityAuthorized,
    establishmentPredicateAuthorized:
      R134_AUTHORITY.establishmentPredicateAuthorized,
  }),
});

export const R135_AUTHORITY = Object.freeze({
  status: 'RESEARCH_ORDINARY_SPECIAL_NONMONOTONICITY_STUDY_COMPLETE' as const,
  researchOnly: true,
  qualitativeTransitionCorpusObserved: true,
  ordinarySpecialNonMonotonicityObserved: true,
  contextDependentTransitionOutcomeObserved: true,
  brokenOrdinaryDistinctFromAbsentOrdinaryPath: true,
  unresolvedDistinctFromNegativeFact: true,
  scalarSpecialnessAxisAuthorized: false,
  numericTransitionScoreAuthorized: false,
  transitionProbabilityAuthorized: false,
  reversibleNumericAxisAuthorized: false,
  temporalTransitionSemanticsAuthorized: false,
  transitionResolverAuthorized: false,
  specialPatternResolverAuthorized: false,
  candidateIdentityAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
