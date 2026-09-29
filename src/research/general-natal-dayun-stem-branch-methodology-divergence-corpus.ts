import {
  R071_AUTHORITY,
  R071_DAYUN_STEM_BRANCH_WEIGHTING_VERSION,
  R071_EXECUTION_GAPS,
  R071_TRADITION_PROPOSITIONS,
} from './general-natal-dayun-stem-branch-weighting.js';
import {
  R095_AUTHORITY,
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
  R151_AUTHORITY,
  R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
} from './general-natal-dayun-temporal-overlay-replay-corpus.js';

export const R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION =
  '0.1.0-research' as const;

export type R152Proposition =
  (typeof R071_TRADITION_PROPOSITIONS)[number]['proposition'];

export type R152SourceFamilyTag = 'YUANHAI' | 'SANMING';

export type R152PropositionRelation =
  | 'PARTIAL_OVERLAP'
  | 'INCOMPARABLE';

export type R152CompositionDisposition =
  | 'PARALLEL_PRESERVATION_ONLY'
  | 'CONDITIONAL_COMPLEMENT_CANDIDATE'
  | 'OPERATIONAL_MAPPING_REQUIRED';

export interface R152SourcePropositionRow {
  rowId: string;
  upstreamId: string;
  sourceFamilyTag: R152SourceFamilyTag;
  sourceSurface: string;
  proposition: R152Proposition;
  sourceFamilyTagIsLineageAssertion: false;
  schoolLineageAssertionState: 'INCONCLUSIVE';
  numericWeightAuthorized: false;
  universalStemBranchPrecedenceAuthorized: false;
  fiveYearOperationalMappingAuthorized: false;
  executable: false;
  productionAuthorityPromoted: false;
}

const sourceFamilyTagFor = (
  upstreamId: string,
): R152SourceFamilyTag =>
  upstreamId.startsWith('YUANHAI-') ? 'YUANHAI' : 'SANMING';

export const R152_SOURCE_PROPOSITION_ROWS: readonly R152SourcePropositionRow[] =
  Object.freeze(
    R071_TRADITION_PROPOSITIONS.map((item, index) =>
      Object.freeze({
        rowId: 'R152-SOURCE-' + String(index + 1).padStart(2, '0'),
        upstreamId: item.id,
        sourceFamilyTag: sourceFamilyTagFor(item.id),
        sourceSurface: item.sourceSurface,
        proposition: item.proposition,
        sourceFamilyTagIsLineageAssertion: false as const,
        schoolLineageAssertionState: 'INCONCLUSIVE' as const,
        numericWeightAuthorized: false as const,
        universalStemBranchPrecedenceAuthorized: false as const,
        fiveYearOperationalMappingAuthorized: false as const,
        executable: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

interface R152PairSeed {
  leftUpstreamId: string;
  rightUpstreamId: string;
  propositionRelation: R152PropositionRelation;
  compositionDisposition: R152CompositionDisposition;
  rationale: string;
  unresolvedOperands: readonly string[];
}

const PAIR_SEEDS: readonly R152PairSeed[] = Object.freeze([
  {
    leftUpstreamId: 'YUANHAI-DAYUN-BRANCH-EMPHASIS',
    rightUpstreamId: 'SANMING-STEM-PERIOD-WITH-BRANCH',
    propositionRelation: 'PARTIAL_OVERLAP',
    compositionDisposition: 'PARALLEL_PRESERVATION_ONLY',
    rationale:
      'Both preserve branch relevance, but one is a broad branch-emphasis proposition while the other is explicitly scoped to a stem-period formulation.',
    unresolvedOperands: [
      'TRADITION_SELECTION',
      'STEM_BRANCH_CONFLICT_PRECEDENCE',
      'SCHOOL_PROVENANCE_RECONCILIATION',
    ],
  },
  {
    leftUpstreamId: 'YUANHAI-DAYUN-BRANCH-EMPHASIS',
    rightUpstreamId: 'SANMING-BRANCH-PERIOD-DISCARD-STEM',
    propositionRelation: 'PARTIAL_OVERLAP',
    compositionDisposition: 'CONDITIONAL_COMPLEMENT_CANDIDATE',
    rationale:
      'Branch emphasis and branch-period stem discard overlap semantically but differ in scope; the latter is explicitly period-conditioned.',
    unresolvedOperands: [
      'TRADITION_SELECTION',
      'FIVE_YEAR_SPLIT_OPERATIONAL_MAPPING',
      'SCHOOL_PROVENANCE_RECONCILIATION',
    ],
  },
  {
    leftUpstreamId: 'YUANHAI-DAYUN-BRANCH-EMPHASIS',
    rightUpstreamId: 'SANMING-V12-FIVE-YEAR-SPLIT',
    propositionRelation: 'INCOMPARABLE',
    compositionDisposition: 'OPERATIONAL_MAPPING_REQUIRED',
    rationale:
      'A branch-emphasis proposition and a ten-year upper/lower five-year split proposition answer different questions until the split is operationally mapped.',
    unresolvedOperands: [
      'FIVE_YEAR_SPLIT_OPERATIONAL_MAPPING',
      'TRADITION_SELECTION',
      'SCHOOL_PROVENANCE_RECONCILIATION',
    ],
  },
  {
    leftUpstreamId: 'SANMING-STEM-PERIOD-WITH-BRANCH',
    rightUpstreamId: 'SANMING-BRANCH-PERIOD-DISCARD-STEM',
    propositionRelation: 'PARTIAL_OVERLAP',
    compositionDisposition: 'CONDITIONAL_COMPLEMENT_CANDIDATE',
    rationale:
      'The two Sanming-tagged formulations can be represented as period-conditioned complements, but the exact operational period mapping is not authorized by R071.',
    unresolvedOperands: [
      'FIVE_YEAR_SPLIT_OPERATIONAL_MAPPING',
      'STEM_BRANCH_CONFLICT_PRECEDENCE',
    ],
  },
  {
    leftUpstreamId: 'SANMING-STEM-PERIOD-WITH-BRANCH',
    rightUpstreamId: 'SANMING-V12-FIVE-YEAR-SPLIT',
    propositionRelation: 'PARTIAL_OVERLAP',
    compositionDisposition: 'OPERATIONAL_MAPPING_REQUIRED',
    rationale:
      'The five-year split may provide a temporal scaffold for a stem-period formulation, but R071 does not authorize the direct mapping.',
    unresolvedOperands: [
      'FIVE_YEAR_SPLIT_OPERATIONAL_MAPPING',
      'NATAL_CONTEXT_MODULATION',
    ],
  },
  {
    leftUpstreamId: 'SANMING-BRANCH-PERIOD-DISCARD-STEM',
    rightUpstreamId: 'SANMING-V12-FIVE-YEAR-SPLIT',
    propositionRelation: 'PARTIAL_OVERLAP',
    compositionDisposition: 'OPERATIONAL_MAPPING_REQUIRED',
    rationale:
      'The branch-period proposition and the five-year split are related in temporal scope, but the source evidence retained in R071 does not itself assign the split halves to stem/branch operation.',
    unresolvedOperands: [
      'FIVE_YEAR_SPLIT_OPERATIONAL_MAPPING',
      'NATAL_CONTEXT_MODULATION',
    ],
  },
]);

export interface R152PairwiseComparisonRow {
  rowId: string;
  leftUpstreamId: string;
  rightUpstreamId: string;
  leftProposition: R152Proposition;
  rightProposition: R152Proposition;
  leftSourceFamilyTag: R152SourceFamilyTag;
  rightSourceFamilyTag: R152SourceFamilyTag;
  propositionRelation: R152PropositionRelation;
  compositionDisposition: R152CompositionDisposition;
  rationale: string;
  unresolvedOperands: readonly string[];
  differentSourceFamilyTagsObserved: boolean;
  sourceFamilyDifferenceImpliesSchoolDivergence: false;
  schoolLineageDivergenceEstablished: false;
  semanticEquivalenceEstablished: false;
  methodWinnerAuthorized: false;
  numericPriorityAuthorized: false;
  universalStemBranchPrecedenceAuthorized: false;
  fiveYearOperationalMappingAuthorized: false;
  automaticCanonicalMethodSelectionAuthorized: false;
  executableResolutionAuthorized: false;
  productionAuthorityPromoted: false;
}

const sourceRowById = (upstreamId: string): R152SourcePropositionRow => {
  const row = R152_SOURCE_PROPOSITION_ROWS.find(
    (item) => item.upstreamId === upstreamId,
  );
  if (row === undefined) {
    throw new Error('R152 missing R071 source proposition');
  }
  return row;
};

export const R152_PAIRWISE_COMPARISONS: readonly R152PairwiseComparisonRow[] =
  Object.freeze(
    PAIR_SEEDS.map((seed, index) => {
      const left = sourceRowById(seed.leftUpstreamId);
      const right = sourceRowById(seed.rightUpstreamId);
      return Object.freeze({
        rowId: 'R152-PAIR-' + String(index + 1).padStart(2, '0'),
        leftUpstreamId: seed.leftUpstreamId,
        rightUpstreamId: seed.rightUpstreamId,
        leftProposition: left.proposition,
        rightProposition: right.proposition,
        leftSourceFamilyTag: left.sourceFamilyTag,
        rightSourceFamilyTag: right.sourceFamilyTag,
        propositionRelation: seed.propositionRelation,
        compositionDisposition: seed.compositionDisposition,
        rationale: seed.rationale,
        unresolvedOperands: seed.unresolvedOperands,
        differentSourceFamilyTagsObserved:
          left.sourceFamilyTag !== right.sourceFamilyTag,
        sourceFamilyDifferenceImpliesSchoolDivergence: false as const,
        schoolLineageDivergenceEstablished: false as const,
        semanticEquivalenceEstablished: false as const,
        methodWinnerAuthorized: false as const,
        numericPriorityAuthorized: false as const,
        universalStemBranchPrecedenceAuthorized: false as const,
        fiveYearOperationalMappingAuthorized: false as const,
        automaticCanonicalMethodSelectionAuthorized: false as const,
        executableResolutionAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      });
    }),
  );

export interface R152GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R071' | 'R095' | 'R139' | 'R140' | 'R151';
  boundary: string;
  satisfied: boolean;
  executableResolutionAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R152GovernanceGuard,
    'executableResolutionAuthorized' | 'productionAuthorityPromoted'
  >,
): R152GovernanceGuard =>
  Object.freeze({
    ...value,
    executableResolutionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R152_GOVERNANCE_GUARDS: readonly R152GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R152-GUARD-R071',
      upstreamAsset: 'R071',
      boundary:
        'Tradition variance remains non-numeric and the five-year stem/branch assignment remains operationally unresolved.',
      satisfied:
        !R071_AUTHORITY.universalNumericWeightAuthorized &&
        !R071_AUTHORITY.fiveYearStemBranchAssignmentAuthorized &&
        !R071_AUTHORITY.executableDayunWeightingResolverAuthorized,
    }),
    guard({
      guardId: 'R152-GUARD-R095',
      upstreamAsset: 'R095',
      boundary:
        'Source/work labels and proposition relations remain distinct from verified school-lineage relations.',
      satisfied:
        R095_AUTHORITY.lineageAndPropositionRelationsSeparated &&
        R095_AUTHORITY.propositionComparisonRequiredForDivergence &&
        R095_AUTHORITY.unknownLineagePreserved &&
        !R095_AUTHORITY.crossSchoolBlendWithoutCompositionPolicyAuthorized,
    }),
    guard({
      guardId: 'R152-GUARD-R139',
      upstreamAsset: 'R139',
      boundary:
        'Evidence coexistence does not create semantic composition, method winners, numeric priorities, or global resolution.',
      satisfied:
        R139_AUTHORITY.evidenceCoexistenceDistinctFromSemanticCompositionObserved &&
        R139_AUTHORITY.semanticCompositionDistinctFromExecutableResolutionObserved &&
        !R139_AUTHORITY.globalCompositionAuthorized &&
        !R139_AUTHORITY.methodWinnerResolverAuthorized &&
        !R139_AUTHORITY.numericMethodPriorityAuthorized,
    }),
    guard({
      guardId: 'R152-GUARD-R140',
      upstreamAsset: 'R140',
      boundary:
        'Unresolved composition survives input-order, majority, numeric-priority, and tie-break pressure.',
      satisfied:
        R140_AUTHORITY.adversarialOrderPreservationObserved &&
        !R140_AUTHORITY.methodWinnerLeakObserved &&
        !R140_AUTHORITY.numericPriorityLeakObserved &&
        !R140_AUTHORITY.automaticTieBreakAuthorized,
    }),
    guard({
      guardId: 'R152-GUARD-R151',
      upstreamAsset: 'R151',
      boundary:
        'Dayun methodology selection cannot bypass the natal-context temporal-overlay boundary.',
      satisfied:
        R151_AUTHORITY.natalBaselineDistinctFromTemporalOverlayObserved &&
        R151_AUTHORITY.dayunMeaningDependsOnNatalContextObserved &&
        !R151_AUTHORITY.generalTemporalTransitionResolverAuthorized &&
        !R151_AUTHORITY.numericTemporalWeightAuthorized,
    }),
  ]);

export const R152_REJECTED_COLLAPSES = Object.freeze([
  'STEM_50_BRANCH_50',
  'STEM_30_BRANCH_70',
  'BRANCH_ALWAYS_OVERRIDES_STEM_UNIVERSALLY',
  'YUANHAI_LABEL_AS_CANONICAL_METHOD',
  'SANMING_LABEL_AS_CANONICAL_METHOD',
  'SOURCE_FAMILY_TAG_EQUALS_SCHOOL_LINEAGE',
  'DIFFERENT_SOURCE_FAMILY_TAGS_IMPLY_SCHOOL_DIVERGENCE',
  'SAME_SOURCE_FAMILY_TAG_IMPLIES_SEMANTIC_EQUIVALENCE',
  'SOURCE_COUNT_AS_METHOD_WINNER',
  'POPULARITY_AS_METHOD_WINNER',
  'SENIORITY_AS_METHOD_WINNER',
  'ARRAY_ORDER_AS_METHOD_PRIORITY',
  'FIRST_MATCH_AS_METHOD_SELECTION',
  'FIVE_YEAR_SPLIT_EQUALS_FIRST_FIVE_STEM_SECOND_FIVE_BRANCH',
  'FIVE_YEAR_SPLIT_EQUALS_FIRST_FIVE_BRANCH_SECOND_FIVE_STEM',
  'BRANCH_PERIOD_DISCARD_STEM_AS_UNIVERSAL_STEM_IGNORING',
  'STEM_PERIOD_WITH_BRANCH_AS_UNIVERSAL_EQUAL_WEIGHT',
  'NUMERIC_WEIGHT_TO_RECONCILE_METHODS',
  'AUTO_SELECT_CANONICAL_DAYUN_METHOD',
  'METHOD_VARIANCE_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

const relationCount = (relation: R152PropositionRelation): number =>
  R152_PAIRWISE_COMPARISONS.filter(
    (item) => item.propositionRelation === relation,
  ).length;

const dispositionCount = (
  disposition: R152CompositionDisposition,
): number =>
  R152_PAIRWISE_COMPARISONS.filter(
    (item) => item.compositionDisposition === disposition,
  ).length;

export const R152_SUMMARY = Object.freeze({
  sourcePropositionRowCount: R152_SOURCE_PROPOSITION_ROWS.length,
  pairwiseComparisonCount: R152_PAIRWISE_COMPARISONS.length,
  totalCorpusRowCount:
    R152_SOURCE_PROPOSITION_ROWS.length + R152_PAIRWISE_COMPARISONS.length,
  sourceFamilyTagCount: new Set(
    R152_SOURCE_PROPOSITION_ROWS.map((item) => item.sourceFamilyTag),
  ).size,
  partialOverlapCount: relationCount('PARTIAL_OVERLAP'),
  incomparableCount: relationCount('INCOMPARABLE'),
  parallelPreservationOnlyCount: dispositionCount(
    'PARALLEL_PRESERVATION_ONLY',
  ),
  conditionalComplementCandidateCount: dispositionCount(
    'CONDITIONAL_COMPLEMENT_CANDIDATE',
  ),
  operationalMappingRequiredCount: dispositionCount(
    'OPERATIONAL_MAPPING_REQUIRED',
  ),
  differentSourceFamilyPairCount: R152_PAIRWISE_COMPARISONS.filter(
    (item) => item.differentSourceFamilyTagsObserved,
  ).length,
  schoolLineageDivergenceEstablishedCount:
    R152_PAIRWISE_COMPARISONS.filter(
      (item) => item.schoolLineageDivergenceEstablished,
    ).length,
  methodWinnerAuthorizedCount: R152_PAIRWISE_COMPARISONS.filter(
    (item) => item.methodWinnerAuthorized,
  ).length,
  numericPriorityAuthorizedCount: R152_PAIRWISE_COMPARISONS.filter(
    (item) => item.numericPriorityAuthorized,
  ).length,
  executableResolutionAuthorizedCount:
    R152_PAIRWISE_COMPARISONS.filter(
      (item) => item.executableResolutionAuthorized,
    ).length,
  productionAuthorityPromotedCount:
    R152_PAIRWISE_COMPARISONS.filter(
      (item) => item.productionAuthorityPromoted,
    ).length,
  governanceGuardCount: R152_GOVERNANCE_GUARDS.length,
});

export const R152_UPSTREAM_BINDINGS = Object.freeze({
  r071: {
    version: R071_DAYUN_STEM_BRANCH_WEIGHTING_VERSION,
    propositionCount: R071_AUTHORITY.propositionCount,
    universalNumericWeightAuthorized:
      R071_AUTHORITY.universalNumericWeightAuthorized,
    fiveYearStemBranchAssignmentAuthorized:
      R071_AUTHORITY.fiveYearStemBranchAssignmentAuthorized,
    executableDayunWeightingResolverAuthorized:
      R071_AUTHORITY.executableDayunWeightingResolverAuthorized,
    executionGaps: R071_EXECUTION_GAPS,
  },
  r095: {
    version: R095_SCHOOL_LINEAGE_TAG_VERSION,
    lineageAndPropositionRelationsSeparated:
      R095_AUTHORITY.lineageAndPropositionRelationsSeparated,
    propositionComparisonRequiredForDivergence:
      R095_AUTHORITY.propositionComparisonRequiredForDivergence,
    unknownLineagePreserved: R095_AUTHORITY.unknownLineagePreserved,
    crossSchoolBlendWithoutCompositionPolicyAuthorized:
      R095_AUTHORITY.crossSchoolBlendWithoutCompositionPolicyAuthorized,
  },
  r139: {
    version: R139_METHODOLOGY_COMPOSITION_MATRIX_VERSION,
    evidenceCoexistenceDistinctFromSemanticCompositionObserved:
      R139_AUTHORITY.evidenceCoexistenceDistinctFromSemanticCompositionObserved,
    semanticCompositionDistinctFromExecutableResolutionObserved:
      R139_AUTHORITY.semanticCompositionDistinctFromExecutableResolutionObserved,
    globalCompositionAuthorized: R139_AUTHORITY.globalCompositionAuthorized,
    methodWinnerResolverAuthorized:
      R139_AUTHORITY.methodWinnerResolverAuthorized,
    numericMethodPriorityAuthorized:
      R139_AUTHORITY.numericMethodPriorityAuthorized,
  },
  r140: {
    version: R140_NON_COMPOSITION_PRESERVATION_VERSION,
    adversarialOrderPreservationObserved:
      R140_AUTHORITY.adversarialOrderPreservationObserved,
    methodWinnerLeakObserved: R140_AUTHORITY.methodWinnerLeakObserved,
    numericPriorityLeakObserved: R140_AUTHORITY.numericPriorityLeakObserved,
    automaticTieBreakAuthorized:
      R140_AUTHORITY.automaticTieBreakAuthorized,
  },
  r151: {
    version: R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
    natalBaselineDistinctFromTemporalOverlayObserved:
      R151_AUTHORITY.natalBaselineDistinctFromTemporalOverlayObserved,
    dayunMeaningDependsOnNatalContextObserved:
      R151_AUTHORITY.dayunMeaningDependsOnNatalContextObserved,
    generalTemporalTransitionResolverAuthorized:
      R151_AUTHORITY.generalTemporalTransitionResolverAuthorized,
    numericTemporalWeightAuthorized:
      R151_AUTHORITY.numericTemporalWeightAuthorized,
  },
});

export const R152_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_CORPUS_COMPLETE' as const,
  researchOnly: true,
  r071SourcePropositionsPreserved: true,
  sourceFamilyTagsPreservedAsDescriptiveOnly: true,
  pairwisePropositionComparisonObserved: true,
  partialOverlapObserved: true,
  incomparableWithoutOperationalMappingObserved: true,
  conditionalComplementCandidateObserved: true,
  fiveYearSplitOperationalMappingGapPreserved: true,
  methodologyFormulationVarianceObserved: true,
  lineageAndPropositionRelationsSeparated: true,
  schoolLineageDivergenceEstablished: false,
  semanticEquivalenceEstablished: false,
  universalStemBranchPrecedenceAuthorized: false,
  universalNumericWeightAuthorized: false,
  fiveYearStemBranchAssignmentAuthorized: false,
  methodWinnerResolverAuthorized: false,
  numericMethodPriorityAuthorized: false,
  automaticCanonicalMethodSelectionAuthorized: false,
  executableDayunWeightingResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
