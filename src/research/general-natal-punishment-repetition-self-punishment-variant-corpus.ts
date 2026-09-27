import type { PillarSlot } from '../contracts/calculation.js';
import {
  R056_AUTHORITY,
  R056_DIRECTED_XING_RELATIONS,
  R056_EXECUTION_GAPS,
  R056_SELF_XING_BRANCHES,
  R056_XING_TAXONOMY_VERSION,
} from './general-natal-xing-taxonomy-self-punishment.js';
import {
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from './general-natal-geju-xing-chong-po-hai-effect-primitive-authority-review.js';
import {
  R141_AUTHORITY,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
} from './general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';

export const R144_PUNISHMENT_REPETITION_SELF_VARIANT_VERSION =
  '0.1.0-research' as const;

export type R144DirectedTopology =
  | 'ONE_FROM_TWO_TO'
  | 'TWO_FROM_ONE_TO'
  | 'TWO_FROM_TWO_TO';

export type R144SelfRepetitionCount = 2 | 3 | 4;

export type R144Branch =
  | '子'
  | '卯'
  | '寅'
  | '巳'
  | '申'
  | '丑'
  | '戌'
  | '未'
  | '辰'
  | '午'
  | '酉'
  | '亥';

export type R144LayoutBranch = R144Branch | 'CONTROL_NON_MEMBER';

export interface R144BranchSlot {
  slot: PillarSlot;
  branch: R144LayoutBranch;
}

export interface R144DirectedCandidate {
  candidateId: string;
  relationIndex: number;
  family: string;
  fromBranch: R144Branch;
  toBranch: R144Branch;
  fromSlot: PillarSlot;
  toSlot: PillarSlot;
  directedIdentityPreserved: true;
  structuralTaxonomyOnly: true;
  automaticHarmAuthorized: false;
  numericSeverity: null;
  effectVerdict: null;
  executable: false;
}

export interface R144DirectedParticipantDegree {
  slot: PillarSlot;
  branch: R144Branch;
  inboundCandidateCount: number;
  outboundCandidateCount: number;
  totalCandidateDegree: number;
  competing: boolean;
  priorityAuthorized: false;
  severityAuthorized: false;
}

export interface R144DirectedRepetitionCase {
  caseId: string;
  relationIndex: number;
  family: string;
  fromBranch: R144Branch;
  toBranch: R144Branch;
  topology: R144DirectedTopology;
  layout: readonly R144BranchSlot[];
  candidates: readonly R144DirectedCandidate[];
  participantDegrees: readonly R144DirectedParticipantDegree[];
  candidateCount: number;
  competingParticipantCount: number;
  repetitionObserved: true;
  multiplicityAsSeverityAuthorized: false;
  candidateCountAsSeverityAuthorized: false;
  repeatedSourcePriorityAuthorized: false;
  repeatedTargetPriorityAuthorized: false;
  automaticHarmAuthorized: false;
  relationEffectResolverAuthorized: false;
  numericSeverityAuthorized: false;
  executable: false;
  productionAuthorityPromoted: false;
}

export interface R144SelfPunishmentVariant {
  caseId: string;
  branch: R144Branch;
  repetitionCount: R144SelfRepetitionCount;
  layout: readonly R144BranchSlot[];
  sameBranchPairTopologyCount: number;
  observedStructuralForm: 'SAME_BRANCH_REPETITION';
  structuralRepetitionObserved: true;
  selfPunishmentTaxonomyObserved: true;
  pairTopologyIsSeverity: false;
  repetitionCountIsSeverity: false;
  automaticHarmAuthorized: false;
  numericSeverityAuthorized: false;
  effectVerdict: null;
  executable: false;
  productionAuthorityPromoted: false;
}

const DIRECTED_TOPOLOGIES = Object.freeze([
  'ONE_FROM_TWO_TO',
  'TWO_FROM_ONE_TO',
  'TWO_FROM_TWO_TO',
] as const satisfies readonly R144DirectedTopology[]);

const SELF_REPETITION_COUNTS = Object.freeze([
  2,
  3,
  4,
] as const satisfies readonly R144SelfRepetitionCount[]);

const directedLayout = (
  topology: R144DirectedTopology,
  fromBranch: R144Branch,
  toBranch: R144Branch,
): readonly R144BranchSlot[] => {
  switch (topology) {
    case 'ONE_FROM_TWO_TO':
      return Object.freeze([
        { slot: 'year', branch: 'CONTROL_NON_MEMBER' },
        { slot: 'month', branch: toBranch },
        { slot: 'day', branch: fromBranch },
        { slot: 'hour', branch: toBranch },
      ]);
    case 'TWO_FROM_ONE_TO':
      return Object.freeze([
        { slot: 'year', branch: fromBranch },
        { slot: 'month', branch: toBranch },
        { slot: 'day', branch: fromBranch },
        { slot: 'hour', branch: 'CONTROL_NON_MEMBER' },
      ]);
    case 'TWO_FROM_TWO_TO':
      return Object.freeze([
        { slot: 'year', branch: fromBranch },
        { slot: 'month', branch: toBranch },
        { slot: 'day', branch: fromBranch },
        { slot: 'hour', branch: toBranch },
      ]);
  }
};

const directedCandidates = (
  relationIndex: number,
  family: string,
  fromBranch: R144Branch,
  toBranch: R144Branch,
  layout: readonly R144BranchSlot[],
): readonly R144DirectedCandidate[] => {
  const fromSlots = layout.filter((item) => item.branch === fromBranch);
  const toSlots = layout.filter((item) => item.branch === toBranch);

  return Object.freeze(
    fromSlots.flatMap((fromEntry) =>
      toSlots.map((toEntry) =>
        Object.freeze({
          candidateId:
            'R144-DREL-' +
            String(relationIndex + 1).padStart(2, '0') +
            ':' +
            fromEntry.slot +
            '>' +
            toEntry.slot,
          relationIndex,
          family,
          fromBranch,
          toBranch,
          fromSlot: fromEntry.slot,
          toSlot: toEntry.slot,
          directedIdentityPreserved: true as const,
          structuralTaxonomyOnly: true as const,
          automaticHarmAuthorized: false as const,
          numericSeverity: null,
          effectVerdict: null,
          executable: false as const,
        }),
      ),
    ),
  );
};

const participantDegrees = (
  fromBranch: R144Branch,
  toBranch: R144Branch,
  layout: readonly R144BranchSlot[],
  candidates: readonly R144DirectedCandidate[],
): readonly R144DirectedParticipantDegree[] =>
  Object.freeze(
    layout
      .filter(
        (item): item is R144BranchSlot & { branch: R144Branch } =>
          item.branch === fromBranch || item.branch === toBranch,
      )
      .map((item) => {
        const inboundCandidateCount = candidates.filter(
          (candidate) => candidate.toSlot === item.slot,
        ).length;
        const outboundCandidateCount = candidates.filter(
          (candidate) => candidate.fromSlot === item.slot,
        ).length;
        const totalCandidateDegree =
          inboundCandidateCount + outboundCandidateCount;

        return Object.freeze({
          slot: item.slot,
          branch: item.branch,
          inboundCandidateCount,
          outboundCandidateCount,
          totalCandidateDegree,
          competing: totalCandidateDegree > 1,
          priorityAuthorized: false as const,
          severityAuthorized: false as const,
        });
      }),
  );

const buildDirectedCase = (
  relation: (typeof R056_DIRECTED_XING_RELATIONS)[number],
  relationIndex: number,
  topology: R144DirectedTopology,
  topologyIndex: number,
): R144DirectedRepetitionCase => {
  const fromBranch = relation.from as R144Branch;
  const toBranch = relation.to as R144Branch;
  const layout = directedLayout(topology, fromBranch, toBranch);
  const candidates = directedCandidates(
    relationIndex,
    relation.family,
    fromBranch,
    toBranch,
    layout,
  );
  const degrees = participantDegrees(
    fromBranch,
    toBranch,
    layout,
    candidates,
  );

  return Object.freeze({
    caseId:
      'R144-D' +
      String(relationIndex + 1).padStart(2, '0') +
      '-T' +
      String(topologyIndex + 1),
    relationIndex,
    family: relation.family,
    fromBranch,
    toBranch,
    topology,
    layout,
    candidates,
    participantDegrees: degrees,
    candidateCount: candidates.length,
    competingParticipantCount: degrees.filter((item) => item.competing).length,
    repetitionObserved: true,
    multiplicityAsSeverityAuthorized: false,
    candidateCountAsSeverityAuthorized: false,
    repeatedSourcePriorityAuthorized: false,
    repeatedTargetPriorityAuthorized: false,
    automaticHarmAuthorized: false,
    relationEffectResolverAuthorized: false,
    numericSeverityAuthorized: false,
    executable: false,
    productionAuthorityPromoted: false,
  });
};

export const R144_DIRECTED_REPETITION_CASES: readonly R144DirectedRepetitionCase[] =
  Object.freeze(
    R056_DIRECTED_XING_RELATIONS.flatMap((relation, relationIndex) =>
      DIRECTED_TOPOLOGIES.map((topology, topologyIndex) =>
        buildDirectedCase(
          relation,
          relationIndex,
          topology,
          topologyIndex,
        ),
      ),
    ),
  );

const selfLayout = (
  branch: R144Branch,
  repetitionCount: R144SelfRepetitionCount,
): readonly R144BranchSlot[] => {
  if (repetitionCount === 2) {
    return Object.freeze([
      { slot: 'year', branch: 'CONTROL_NON_MEMBER' },
      { slot: 'month', branch },
      { slot: 'day', branch: 'CONTROL_NON_MEMBER' },
      { slot: 'hour', branch },
    ]);
  }
  if (repetitionCount === 3) {
    return Object.freeze([
      { slot: 'year', branch },
      { slot: 'month', branch },
      { slot: 'day', branch: 'CONTROL_NON_MEMBER' },
      { slot: 'hour', branch },
    ]);
  }
  return Object.freeze([
    { slot: 'year', branch },
    { slot: 'month', branch },
    { slot: 'day', branch },
    { slot: 'hour', branch },
  ]);
};

const chooseTwo = (count: number): number => (count * (count - 1)) / 2;

const buildSelfCase = (
  item: (typeof R056_SELF_XING_BRANCHES)[number],
  branchIndex: number,
  repetitionCount: R144SelfRepetitionCount,
): R144SelfPunishmentVariant =>
  Object.freeze({
    caseId:
      'R144-S' +
      String(branchIndex + 1).padStart(2, '0') +
      '-R' +
      String(repetitionCount),
    branch: item.branch as R144Branch,
    repetitionCount,
    layout: selfLayout(item.branch as R144Branch, repetitionCount),
    sameBranchPairTopologyCount: chooseTwo(repetitionCount),
    observedStructuralForm: item.observedStructuralForm,
    structuralRepetitionObserved: true,
    selfPunishmentTaxonomyObserved: true,
    pairTopologyIsSeverity: false,
    repetitionCountIsSeverity: false,
    automaticHarmAuthorized: false,
    numericSeverityAuthorized: false,
    effectVerdict: null,
    executable: false,
    productionAuthorityPromoted: false,
  });

export const R144_SELF_PUNISHMENT_VARIANTS: readonly R144SelfPunishmentVariant[] =
  Object.freeze(
    R056_SELF_XING_BRANCHES.flatMap((item, branchIndex) =>
      SELF_REPETITION_COUNTS.map((repetitionCount) =>
        buildSelfCase(item, branchIndex, repetitionCount),
      ),
    ),
  );

export const R144_REJECTED_MULTIPLICITY_COLLAPSES = Object.freeze([
  'MORE_DIRECTED_CANDIDATES_MEANS_MORE_SEVERE',
  'MORE_SELF_REPETITIONS_MEANS_MORE_SEVERE',
  'PAIR_TOPOLOGY_COUNT_AS_SEVERITY_SCORE',
  'REPEATED_SOURCE_BRANCH_WINS_PRIORITY',
  'REPEATED_TARGET_BRANCH_WINS_PRIORITY',
  'MULTIPLE_DIRECTED_RELATIONS_AUTO_AGGREGATE',
  'SELF_PUNISHMENT_REPETITION_IMPLIES_HARM',
  'DIRECTED_PUNISHMENT_PRESENCE_IMPLIES_HARM',
  'THREE_REPETITIONS_AUTO_STRONGER_THAN_TWO',
  'FOUR_REPETITIONS_AUTO_STRONGER_THAN_THREE',
  'DIRECTED_RELATION_COUNT_AS_NUMERIC_WEIGHT',
  'SAME_BRANCH_PAIR_COUNT_AS_NUMERIC_WEIGHT',
  'STRUCTURAL_TAXONOMY_AS_CONTEXT_EFFECT',
  'RESEARCH_FIXTURE_AS_CANONICAL_BRANCH_XING_INPUT',
  'ARRAY_ORDER_AS_PUNISHMENT_PRECEDENCE',
  'FIRST_MATCH_AS_PUNISHMENT_SETTLEMENT',
] as const);

const directedCandidatesAll = R144_DIRECTED_REPETITION_CASES.flatMap(
  (item) => item.candidates,
);
const directedParticipantsAll = R144_DIRECTED_REPETITION_CASES.flatMap(
  (item) => item.participantDegrees,
);

export const R144_SUMMARY = Object.freeze({
  directedRelationCount: R056_DIRECTED_XING_RELATIONS.length,
  directedTaxonomyFamilyCount: new Set(
    R056_DIRECTED_XING_RELATIONS.map((item) => item.family),
  ).size,
  selfXingBranchCount: R056_SELF_XING_BRANCHES.length,
  directedCaseCount: R144_DIRECTED_REPETITION_CASES.length,
  selfCaseCount: R144_SELF_PUNISHMENT_VARIANTS.length,
  caseCount:
    R144_DIRECTED_REPETITION_CASES.length +
    R144_SELF_PUNISHMENT_VARIANTS.length,
  directedCandidateCount: directedCandidatesAll.length,
  directedCompetingParticipantCount: directedParticipantsAll.filter(
    (item) => item.competing,
  ).length,
  selfRepetitionTwoCount: R144_SELF_PUNISHMENT_VARIANTS.filter(
    (item) => item.repetitionCount === 2,
  ).length,
  selfRepetitionThreeCount: R144_SELF_PUNISHMENT_VARIANTS.filter(
    (item) => item.repetitionCount === 3,
  ).length,
  selfRepetitionFourCount: R144_SELF_PUNISHMENT_VARIANTS.filter(
    (item) => item.repetitionCount === 4,
  ).length,
  selfPairTopologyCount: R144_SELF_PUNISHMENT_VARIANTS.reduce(
    (sum, item) => sum + item.sameBranchPairTopologyCount,
    0,
  ),
  automaticHarmAuthorizedCount:
    R144_DIRECTED_REPETITION_CASES.filter(
      (item) => item.automaticHarmAuthorized,
    ).length +
    R144_SELF_PUNISHMENT_VARIANTS.filter(
      (item) => item.automaticHarmAuthorized,
    ).length,
  numericSeverityAuthorizedCount:
    R144_DIRECTED_REPETITION_CASES.filter(
      (item) => item.numericSeverityAuthorized,
    ).length +
    R144_SELF_PUNISHMENT_VARIANTS.filter(
      (item) => item.numericSeverityAuthorized,
    ).length,
  executableCount:
    R144_DIRECTED_REPETITION_CASES.filter((item) => item.executable).length +
    R144_SELF_PUNISHMENT_VARIANTS.filter((item) => item.executable).length,
  productionAuthorityPromotedCount:
    R144_DIRECTED_REPETITION_CASES.filter(
      (item) => item.productionAuthorityPromoted,
    ).length +
    R144_SELF_PUNISHMENT_VARIANTS.filter(
      (item) => item.productionAuthorityPromoted,
    ).length,
});

export const R144_UPSTREAM_BINDINGS = Object.freeze({
  r056: {
    version: R056_XING_TAXONOMY_VERSION,
    directedNonSelfRelationCount: R056_AUTHORITY.directedNonSelfRelationCount,
    selfXingBranchCount: R056_AUTHORITY.selfXingBranchCount,
    structuralPresenceImpliesHarm: R056_AUTHORITY.structuralPresenceImpliesHarm,
    selfXingImpliesHarm: R056_AUTHORITY.selfXingImpliesHarm,
    numericSeverityAuthorized: R056_AUTHORITY.numericSeverityAuthorized,
    executableEffectResolverAuthorized:
      R056_AUTHORITY.executableEffectResolverAuthorized,
    productionAuthorityPromoted: R056_AUTHORITY.productionAuthorityPromoted,
    executionGaps: R056_EXECUTION_GAPS,
  },
  gejuPrimitiveReview: {
    version:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    canonicalBranchXingInputAvailable:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .canonicalBranchXingInputAvailable,
    generalizedEffectPredicateAuthorized:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .generalizedXingChongPoHaiEffectPredicateAuthorized,
    productionFactEmissionAuthorized:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .productionFactEmissionAuthorized,
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

export const R144_AUTHORITY = Object.freeze({
  status: 'RESEARCH_PUNISHMENT_REPETITION_SELF_VARIANT_REPLAY_COMPLETE' as const,
  researchOnly: true,
  allDirectedR056RelationsReplayed: true,
  allSelfPunishmentBranchesReplayed: true,
  directedRepetitionTopologyObserved: true,
  selfRepetitionMultiplicityObserved: true,
  structuralMultiplicityDistinctFromSeverityObserved: true,
  structuralMultiplicityDistinctFromHarmObserved: true,
  multiplicityAsSeverityAuthorized: false,
  candidateCountAsSeverityAuthorized: false,
  selfRepetitionCountAsSeverityAuthorized: false,
  repeatedSourcePriorityAuthorized: false,
  repeatedTargetPriorityAuthorized: false,
  automaticDirectedPunishmentHarmAuthorized: false,
  automaticSelfPunishmentHarmAuthorized: false,
  numericSeverityAuthorized: false,
  relationEffectResolverAuthorized: false,
  canonicalBranchXingProductionInputAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
