import type { PillarSlot } from '../contracts/calculation.js';
import {
  R051_AUTHORITY,
  R051_FIVE_COMBINATION_FAMILIES,
  R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
  type R051Stem,
} from './general-natal-heavenly-stem-five-combination.js';
import {
  I34_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_METHODOLOGY_REVIEW_VERSION,
} from './i34-challenge-target-combination-dependency-methodology-review.js';
import {
  I35_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_EVIDENCE_VERSION,
} from './i35-challenge-target-combination-dependency-evidence.js';
import {
  R141_AUTHORITY,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
} from './general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';

export const R142_COMPETING_STEM_COMBINATION_TARGET_VERSION =
  '0.1.0-research' as const;

export type R142Topology =
  | 'ONE_LEFT_TWO_RIGHT'
  | 'TWO_LEFT_ONE_RIGHT'
  | 'TWO_LEFT_TWO_RIGHT'
  | 'ONE_LEFT_THREE_RIGHT';

export type R142LayoutStem = R051Stem | 'CONTROL_NON_PARTICIPANT';

export interface R142StemSlot {
  slot: PillarSlot;
  stem: R142LayoutStem;
}

export interface R142CombinationCandidate {
  candidateId: string;
  familyPairId: string;
  leftSlot: PillarSlot;
  rightSlot: PillarSlot;
  leftStem: R051Stem;
  rightStem: R051Stem;
  pairIdentityVerified: true;
  effectiveCombinationAuthorized: false;
  transformationAuthorized: false;
  targetSelectionAuthorized: false;
  numericPriority: null;
}

export interface R142TargetCompetition {
  targetId: string;
  slot: PillarSlot;
  stem: R051Stem;
  candidateIds: readonly string[];
  candidateDegree: number;
  competing: boolean;
  selectedCandidateId: null;
  selectionReason: null;
  targetSelectionAuthorized: false;
}

export interface R142CompetitionCase {
  caseId: string;
  familyPairId: string;
  leftStem: R051Stem;
  rightStem: R051Stem;
  topology: R142Topology;
  layout: readonly R142StemSlot[];
  candidates: readonly R142CombinationCandidate[];
  targets: readonly R142TargetCompetition[];
  candidateCount: number;
  competingTargetCount: number;
  maxCandidateDegree: number;
  competitionPresent: true;
  nearestTargetSelectionAuthorized: false;
  adjacencyTargetSelectionAuthorized: false;
  dayStemPreferenceAuthorized: false;
  monthStemPreferenceAuthorized: false;
  arrayOrderTargetSelectionAuthorized: false;
  firstMatchSelectionAuthorized: false;
  numericDistanceWeightAuthorized: false;
  effectiveCombinationResolverAuthorized: false;
  transformationResolverAuthorized: false;
  executable: false;
}

export interface R142OrderVariant {
  variantId: string;
  caseId: string;
  inputSlotOrder: readonly PillarSlot[];
  candidateSetKey: string;
  targetCandidateSetKey: string;
  selectedCandidateId: null;
  firstObservedCandidateWins: false;
  nearestObservedCandidateWins: false;
  adjacencyObservedCandidateWins: false;
  dayStemPreferenceApplied: false;
  monthStemPreferenceApplied: false;
  numericWeightApplied: false;
  executable: false;
}

const SLOT_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const ORDER_VARIANTS = Object.freeze([
  ['year', 'month', 'day', 'hour'],
  ['hour', 'day', 'month', 'year'],
  ['day', 'year', 'hour', 'month'],
  ['month', 'hour', 'year', 'day'],
] as const satisfies readonly (readonly PillarSlot[])[]);

const layoutFor = (
  topology: R142Topology,
  left: R051Stem,
  right: R051Stem,
): readonly R142StemSlot[] => {
  switch (topology) {
    case 'ONE_LEFT_TWO_RIGHT':
      return Object.freeze([
        { slot: 'year', stem: 'CONTROL_NON_PARTICIPANT' },
        { slot: 'month', stem: right },
        { slot: 'day', stem: left },
        { slot: 'hour', stem: right },
      ]);
    case 'TWO_LEFT_ONE_RIGHT':
      return Object.freeze([
        { slot: 'year', stem: left },
        { slot: 'month', stem: right },
        { slot: 'day', stem: left },
        { slot: 'hour', stem: 'CONTROL_NON_PARTICIPANT' },
      ]);
    case 'TWO_LEFT_TWO_RIGHT':
      return Object.freeze([
        { slot: 'year', stem: left },
        { slot: 'month', stem: right },
        { slot: 'day', stem: left },
        { slot: 'hour', stem: right },
      ]);
    case 'ONE_LEFT_THREE_RIGHT':
      return Object.freeze([
        { slot: 'year', stem: right },
        { slot: 'month', stem: right },
        { slot: 'day', stem: left },
        { slot: 'hour', stem: right },
      ]);
  }
};

const candidatesFor = (
  familyPairId: string,
  left: R051Stem,
  right: R051Stem,
  layout: readonly R142StemSlot[],
): readonly R142CombinationCandidate[] => {
  const leftSlots = layout.filter((item) => item.stem === left);
  const rightSlots = layout.filter((item) => item.stem === right);

  return Object.freeze(
    leftSlots.flatMap((leftEntry) =>
      rightSlots.map((rightEntry) =>
        Object.freeze({
          candidateId:
            familyPairId + ':' + leftEntry.slot + '-' + rightEntry.slot,
          familyPairId,
          leftSlot: leftEntry.slot,
          rightSlot: rightEntry.slot,
          leftStem: left,
          rightStem: right,
          pairIdentityVerified: true as const,
          effectiveCombinationAuthorized: false as const,
          transformationAuthorized: false as const,
          targetSelectionAuthorized: false as const,
          numericPriority: null,
        }),
      ),
    ),
  );
};

const targetsFor = (
  familyPairId: string,
  left: R051Stem,
  right: R051Stem,
  layout: readonly R142StemSlot[],
  candidates: readonly R142CombinationCandidate[],
): readonly R142TargetCompetition[] =>
  Object.freeze(
    layout
      .filter(
        (item): item is R142StemSlot & { stem: R051Stem } =>
          item.stem === left || item.stem === right,
      )
      .map((item) => {
        const candidateIds = candidates
          .filter(
            (candidate) =>
              candidate.leftSlot === item.slot || candidate.rightSlot === item.slot,
          )
          .map((candidate) => candidate.candidateId)
          .sort();
        return Object.freeze({
          targetId: familyPairId + ':' + item.slot + ':' + item.stem,
          slot: item.slot,
          stem: item.stem,
          candidateIds: Object.freeze(candidateIds),
          candidateDegree: candidateIds.length,
          competing: candidateIds.length > 1,
          selectedCandidateId: null,
          selectionReason: null,
          targetSelectionAuthorized: false as const,
        });
      }),
  );

const buildCase = (
  familyPairId: string,
  left: R051Stem,
  right: R051Stem,
  topology: R142Topology,
  familyIndex: number,
  topologyIndex: number,
): R142CompetitionCase => {
  const layout = layoutFor(topology, left, right);
  const candidates = candidatesFor(familyPairId, left, right, layout);
  const targets = targetsFor(familyPairId, left, right, layout, candidates);
  const competingTargets = targets.filter((item) => item.competing);

  return Object.freeze({
    caseId:
      'R142-F' +
      String(familyIndex + 1).padStart(2, '0') +
      '-T' +
      String(topologyIndex + 1),
    familyPairId,
    leftStem: left,
    rightStem: right,
    topology,
    layout,
    candidates,
    targets,
    candidateCount: candidates.length,
    competingTargetCount: competingTargets.length,
    maxCandidateDegree: Math.max(...targets.map((item) => item.candidateDegree)),
    competitionPresent: true as const,
    nearestTargetSelectionAuthorized: false as const,
    adjacencyTargetSelectionAuthorized: false as const,
    dayStemPreferenceAuthorized: false as const,
    monthStemPreferenceAuthorized: false as const,
    arrayOrderTargetSelectionAuthorized: false as const,
    firstMatchSelectionAuthorized: false as const,
    numericDistanceWeightAuthorized: false as const,
    effectiveCombinationResolverAuthorized: false as const,
    transformationResolverAuthorized: false as const,
    executable: false as const,
  });
};

const TOPOLOGIES = Object.freeze([
  'ONE_LEFT_TWO_RIGHT',
  'TWO_LEFT_ONE_RIGHT',
  'TWO_LEFT_TWO_RIGHT',
  'ONE_LEFT_THREE_RIGHT',
] as const satisfies readonly R142Topology[]);

export const R142_COMPETITION_CASES: readonly R142CompetitionCase[] = Object.freeze(
  R051_FIVE_COMBINATION_FAMILIES.flatMap((family, familyIndex) =>
    TOPOLOGIES.map((topology, topologyIndex) =>
      buildCase(
        family.pairId,
        family.left,
        family.right,
        topology,
        familyIndex,
        topologyIndex,
      ),
    ),
  ),
);

const candidateSetKey = (item: R142CompetitionCase): string =>
  item.candidates
    .map((candidate) => candidate.candidateId)
    .sort()
    .join('|');

const targetCandidateSetKey = (item: R142CompetitionCase): string =>
  item.targets
    .map(
      (target) =>
        target.targetId + '=[' + [...target.candidateIds].sort().join(',') + ']',
    )
    .sort()
    .join('|');

export const R142_ORDER_VARIANTS: readonly R142OrderVariant[] = Object.freeze(
  R142_COMPETITION_CASES.flatMap((competitionCase) =>
    ORDER_VARIANTS.map((inputSlotOrder, index) =>
      Object.freeze({
        variantId:
          competitionCase.caseId +
          '-ORDER-' +
          String(index + 1).padStart(2, '0'),
        caseId: competitionCase.caseId,
        inputSlotOrder,
        candidateSetKey: candidateSetKey(competitionCase),
        targetCandidateSetKey: targetCandidateSetKey(competitionCase),
        selectedCandidateId: null,
        firstObservedCandidateWins: false as const,
        nearestObservedCandidateWins: false as const,
        adjacencyObservedCandidateWins: false as const,
        dayStemPreferenceApplied: false as const,
        monthStemPreferenceApplied: false as const,
        numericWeightApplied: false as const,
        executable: false as const,
      }),
    ),
  ),
);

export const R142_REJECTED_TARGET_SELECTION_SHORTCUTS = Object.freeze([
  'NEAREST_SLOT_WINS',
  'ADJACENT_SLOT_WINS',
  'DAY_STEM_ALWAYS_WINS',
  'MONTH_STEM_ALWAYS_WINS',
  'EARLIEST_SLOT_WINS',
  'LATEST_SLOT_WINS',
  'ARRAY_ORDER_SELECTS_CANDIDATE',
  'FIRST_MATCH_SHORT_CIRCUIT',
  'RELATION_ID_LEXICAL_ORDER_SELECTS_CANDIDATE',
  'PAIR_COUNT_AS_CONFIDENCE',
  'NUMERIC_DISTANCE_SCORE',
  'MOST_SUPPORTED_CANDIDATE_WINS',
  'DUPLICATE_COUNTERPARTS_COLLAPSE_TO_ONE',
  'MULTIPLE_CANDIDATES_IMPLIES_EFFECTIVE_COMBINATION',
  'COMPETITION_IMPLIES_NO_COMBINATION',
  'PAIR_IDENTITY_IMPLIES_TRANSFORMATION',
] as const);

const allTargets = R142_COMPETITION_CASES.flatMap((item) => item.targets);
const allCandidates = R142_COMPETITION_CASES.flatMap((item) => item.candidates);

export const R142_SUMMARY = Object.freeze({
  familyCount: new Set(R142_COMPETITION_CASES.map((item) => item.familyPairId)).size,
  caseCount: R142_COMPETITION_CASES.length,
  oneLeftTwoRightCaseCount: R142_COMPETITION_CASES.filter(
    (item) => item.topology === 'ONE_LEFT_TWO_RIGHT',
  ).length,
  twoLeftOneRightCaseCount: R142_COMPETITION_CASES.filter(
    (item) => item.topology === 'TWO_LEFT_ONE_RIGHT',
  ).length,
  twoLeftTwoRightCaseCount: R142_COMPETITION_CASES.filter(
    (item) => item.topology === 'TWO_LEFT_TWO_RIGHT',
  ).length,
  oneLeftThreeRightCaseCount: R142_COMPETITION_CASES.filter(
    (item) => item.topology === 'ONE_LEFT_THREE_RIGHT',
  ).length,
  candidateCount: allCandidates.length,
  competingTargetCount: allTargets.filter((item) => item.competing).length,
  degreeTwoCompetingTargetCount: allTargets.filter(
    (item) => item.candidateDegree === 2,
  ).length,
  degreeThreeCompetingTargetCount: allTargets.filter(
    (item) => item.candidateDegree === 3,
  ).length,
  orderVariantCount: R142_ORDER_VARIANTS.length,
  orderVariantsPerCase: ORDER_VARIANTS.length,
  selectedCandidateCount: allTargets.filter(
    (item) => item.selectedCandidateId !== null,
  ).length,
  orderVariantWinnerCount: R142_ORDER_VARIANTS.filter(
    (item) => item.selectedCandidateId !== null,
  ).length,
  effectiveCombinationAuthorizedCount: R142_COMPETITION_CASES.filter(
    (item) => item.effectiveCombinationResolverAuthorized,
  ).length,
  transformationAuthorizedCount: R142_COMPETITION_CASES.filter(
    (item) => item.transformationResolverAuthorized,
  ).length,
  executableCount: R142_COMPETITION_CASES.filter((item) => item.executable).length,
});

export const R142_UPSTREAM_BINDINGS = Object.freeze({
  r051: {
    version: R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
    pairFamilyCount: R051_AUTHORITY.pairFamilyCount,
    effectiveCombinationResolverAuthorized:
      R051_AUTHORITY.effectiveCombinationResolverAuthorized,
    transformationResolverAuthorized:
      R051_AUTHORITY.transformationResolverAuthorized,
    wholeChartHuacqiResolverAuthorized:
      R051_AUTHORITY.wholeChartHuacqiResolverAuthorized,
    productionAuthorityPromoted: R051_AUTHORITY.productionAuthorityPromoted,
  },
  i34: {
    version:
      I34_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_METHODOLOGY_REVIEW_VERSION,
    boundary:
      'competing relation topology may be represented without precedence or effect',
  },
  i35: {
    version: I35_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_EVIDENCE_VERSION,
    boundary:
      'combination candidates remain structural with transformation not established and effect not determined',
  },
  r141: {
    version: R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
    inputEnumerationOrderInvariantRepresentationObserved:
      R141_AUTHORITY.inputEnumerationOrderInvariantRepresentationObserved,
    firstMatchWinsAuthorized: R141_AUTHORITY.firstMatchWinsAuthorized,
    sequentialMutationResolverAuthorized:
      R141_AUTHORITY.sequentialMutationResolverAuthorized,
    numericRelationWeightAuthorized:
      R141_AUTHORITY.numericRelationWeightAuthorized,
  },
});

export const R142_AUTHORITY = Object.freeze({
  status: 'RESEARCH_COMPETING_STEM_COMBINATION_TARGET_CORPUS_COMPLETE' as const,
  researchOnly: true,
  allFiveCombinationFamiliesCovered: true,
  repeatedCounterpartCompetitionRepresented: true,
  allStructuralCandidatesPreserved: true,
  perTargetCandidateDegreeObserved: true,
  inputSlotOrderInvariantCandidateRepresentationObserved: true,
  targetWinnerResolverAuthorized: false,
  nearestTargetSelectionAuthorized: false,
  adjacencyTargetSelectionAuthorized: false,
  dayStemPreferenceAuthorized: false,
  monthStemPreferenceAuthorized: false,
  arrayOrderTargetSelectionAuthorized: false,
  firstMatchSelectionAuthorized: false,
  numericDistanceWeightAuthorized: false,
  effectiveCombinationResolverAuthorized: false,
  transformationResolverAuthorized: false,
  transformationTargetElementEmissionAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});

export const R142_SLOT_ORDER = SLOT_ORDER;
