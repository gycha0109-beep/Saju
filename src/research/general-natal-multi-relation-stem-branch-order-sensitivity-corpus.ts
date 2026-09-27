import {
  R051_AUTHORITY,
  R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
} from './general-natal-heavenly-stem-five-combination.js';
import {
  R055_AUTHORITY,
  R055_SIX_CLASH_CONTEXT_VERSION,
} from './general-natal-six-clash-context.js';
import {
  R056_AUTHORITY,
  R056_XING_TAXONOMY_VERSION,
} from './general-natal-xing-taxonomy-self-punishment.js';
import {
  R059_AUTHORITY,
  R059_COVERAGE,
  R059_DIRECT_CASES,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
  type R059RelationKind,
} from './general-natal-interaction-conflict-corpus.js';
import {
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION,
} from './general-natal-source-scoped-branch-break.js';

export const R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION =
  '0.1.0-research' as const;

export type R141Layer = 'STEM' | 'BRANCH';

export type R141RelationKind =
  | 'STEM_FIVE_COMBINATION'
  | 'BRANCH_COMBINATION'
  | 'BRANCH_MEETING'
  | 'BRANCH_CLASH'
  | 'BRANCH_PUNISHMENT'
  | 'BRANCH_BREAK';

export type R141IdentityAuthority =
  | 'PAIR_IDENTITY_ONLY'
  | 'STRUCTURAL_RELATION_ONLY'
  | 'SOURCE_SCOPED_MEMBERSHIP_ONLY';

export type R141CaseProvenance =
  | 'R059_DIRECT_REPLAY'
  | 'GOVERNED_SYNTHETIC_STRESS';

export type R141EdgeKind =
  | 'SOURCE_BOUNDED_INTERACTION'
  | 'COOBSERVED_NO_PRECEDENCE';

export type R141BoundedResult =
  | 'RESOLVES'
  | 'CAN_REACTIVATE'
  | 'MAY_BE_INEFFECTIVE';

export interface R141RelationNode {
  nodeId: string;
  layer: R141Layer;
  relationKind: R141RelationKind;
  participantLabel: string;
  identityAuthority: R141IdentityAuthority;
  sourceRefs: readonly string[];
  effectiveRelationAuthorized: false;
  transformationAuthorized: false;
  generalizedEffectAuthorized: false;
}

export interface R141RelationEdge {
  edgeId: string;
  kind: R141EdgeKind;
  fromNodeId: string;
  toNodeId: string;
  boundedResult: R141BoundedResult | null;
  sourceRefs: readonly string[];
  generalizedPrecedenceAuthorized: false;
  executable: false;
}

export interface R141BoundedAssertion {
  sourceCaseId: string;
  actorNodeId: string;
  targetNodeId: string;
  boundedResult: R141BoundedResult;
  sourceSurface: string;
  generalizedPrecedenceAuthorized: false;
  executable: false;
}

export interface R141GraphCase {
  caseId: string;
  provenance: R141CaseProvenance;
  nodes: readonly [
    R141RelationNode,
    R141RelationNode,
    R141RelationNode,
  ];
  edges: readonly R141RelationEdge[];
  boundedAssertion: R141BoundedAssertion | null;
  unresolvedOperands: readonly string[];
  mixedStemBranch: boolean;
  globalPrecedenceAuthorized: false;
  totalOrderAuthorized: false;
  firstMatchWinsAuthorized: false;
  sequentialMutationAuthorized: false;
  numericWeightAuthorized: false;
  executableGraphSettlementAuthorized: false;
}

export interface R141OrderVariant {
  variantId: string;
  caseId: string;
  inputOrder: readonly [string, string, string];
  canonicalNodeSetKey: string;
  canonicalEdgeSetKey: string;
  boundedAssertionSignature: string | null;
  firstEnumeratedNodeWinner: null;
  globalPrecedenceApplied: false;
  firstMatchWinsApplied: false;
  sequentialMutationApplied: false;
  numericWeightApplied: false;
  graphSettlementEmitted: null;
  executable: false;
}

const node = (
  value: Omit<
    R141RelationNode,
    | 'effectiveRelationAuthorized'
    | 'transformationAuthorized'
    | 'generalizedEffectAuthorized'
  >,
): R141RelationNode =>
  Object.freeze({
    ...value,
    effectiveRelationAuthorized: false,
    transformationAuthorized: false,
    generalizedEffectAuthorized: false,
  });

const edge = (
  value: Omit<
    R141RelationEdge,
    'generalizedPrecedenceAuthorized' | 'executable'
  >,
): R141RelationEdge =>
  Object.freeze({
    ...value,
    generalizedPrecedenceAuthorized: false,
    executable: false,
  });

const stemNode = (
  nodeId: string,
  pairLabel: string,
  sourceRef = 'R051:PAIR_IDENTITY',
): R141RelationNode =>
  node({
    nodeId,
    layer: 'STEM',
    relationKind: 'STEM_FIVE_COMBINATION',
    participantLabel: pairLabel,
    identityAuthority: 'PAIR_IDENTITY_ONLY',
    sourceRefs: [sourceRef],
  });

const branchNode = (
  nodeId: string,
  relationKind: Exclude<R141RelationKind, 'STEM_FIVE_COMBINATION'>,
  participantLabel: string,
  sourceRefs: readonly string[],
  identityAuthority: R141IdentityAuthority = 'STRUCTURAL_RELATION_ONLY',
): R141RelationNode =>
  node({
    nodeId,
    layer: 'BRANCH',
    relationKind,
    participantLabel,
    identityAuthority,
    sourceRefs,
  });

const r059KindToR141 = (
  kind: R059RelationKind,
): Exclude<R141RelationKind, 'STEM_FIVE_COMBINATION'> => {
  switch (kind) {
    case 'COMBINATION':
      return 'BRANCH_COMBINATION';
    case 'MEETING':
      return 'BRANCH_MEETING';
    case 'CLASH':
      return 'BRANCH_CLASH';
    case 'PUNISHMENT':
      return 'BRANCH_PUNISHMENT';
    case 'BREAK':
      return 'BRANCH_BREAK';
    case 'HARM':
      throw new Error('R141 does not promote R059 HARM into this corpus');
  }
};

const directParticipantLabels: Readonly<
  Record<
    string,
    {
      actor: string;
      target: string;
    }
  >
> = Object.freeze({
  'C1-SHEN-ZI-CHEN-RESOLVES-ZI-WU': {
    actor: '申子辰 meeting',
    target: '子午 clash',
  },
  'C2-MAO-YOU-RESOLVES-SI-YOU': {
    actor: '卯酉 clash',
    target: '巳酉 meeting',
  },
  'C3-MAO-XU-RESOLVES-MAO-YOU': {
    actor: '卯戌 combination',
    target: '卯酉 clash',
  },
  'C4-YIN-SHEN-RESOLVES-ZI-SHEN': {
    actor: '寅申 clash',
    target: '子申 meeting',
  },
  'C5-RESOLUTION-REACTIVATES-CONFLICT': {
    actor: 'source-bounded combination',
    target: 'source-bounded clash',
  },
  'C6-STRUCTURAL-MATCH-MAY-BE-INEFFECTIVE': {
    actor: 'source-bounded clash',
    target: 'source-bounded combination',
  },
});

const directReplayCase = (
  sourceCase: (typeof R059_DIRECT_CASES)[number],
  index: number,
): R141GraphCase => {
  const labels = directParticipantLabels[sourceCase.id];
  if (!labels) {
    throw new Error('R141 missing R059 participant label fixture');
  }

  const caseId = 'R141-D' + String(index + 1).padStart(2, '0');
  const actorNodeId = caseId + '-ACTOR';
  const targetNodeId = caseId + '-TARGET';
  const controlNodeId = caseId + '-STEM-CONTROL';

  const actor = branchNode(
    actorNodeId,
    r059KindToR141(sourceCase.actor),
    labels.actor,
    ['R059:' + sourceCase.id],
  );
  const target = branchNode(
    targetNodeId,
    r059KindToR141(sourceCase.target),
    labels.target,
    ['R059:' + sourceCase.id],
  );
  const control = stemNode(controlNodeId, '甲己 pair identity');

  const boundedAssertion = Object.freeze({
    sourceCaseId: sourceCase.id,
    actorNodeId,
    targetNodeId,
    boundedResult: sourceCase.boundedResult,
    sourceSurface: sourceCase.sourceSurface,
    generalizedPrecedenceAuthorized: false as const,
    executable: false as const,
  });

  return Object.freeze({
    caseId,
    provenance: 'R059_DIRECT_REPLAY' as const,
    nodes: [actor, target, control] as const,
    edges: [
      edge({
        edgeId: caseId + '-SOURCE-EDGE',
        kind: 'SOURCE_BOUNDED_INTERACTION',
        fromNodeId: actorNodeId,
        toNodeId: targetNodeId,
        boundedResult: sourceCase.boundedResult,
        sourceRefs: ['R059:' + sourceCase.id],
      }),
    ],
    boundedAssertion,
    unresolvedOperands: [
      'POSITIONAL_EFFECT',
      'RELATION_EFFECTIVENESS',
      'MULTIPLE_RELATION_SETTLEMENT',
      'CROSS_RELATION_PRECEDENCE',
    ],
    mixedStemBranch: true,
    globalPrecedenceAuthorized: false as const,
    totalOrderAuthorized: false as const,
    firstMatchWinsAuthorized: false as const,
    sequentialMutationAuthorized: false as const,
    numericWeightAuthorized: false as const,
    executableGraphSettlementAuthorized: false as const,
  });
};

const noPrecedenceEdges = (
  caseId: string,
  nodes: readonly [
    R141RelationNode,
    R141RelationNode,
    R141RelationNode,
  ],
): readonly R141RelationEdge[] => {
  const pairs = [
    [nodes[0], nodes[1]],
    [nodes[0], nodes[2]],
    [nodes[1], nodes[2]],
  ] as const;

  return Object.freeze(
    pairs.map(([left, right], index) =>
      edge({
        edgeId: caseId + '-COOBSERVED-' + String(index + 1),
        kind: 'COOBSERVED_NO_PRECEDENCE',
        fromNodeId: left.nodeId,
        toNodeId: right.nodeId,
        boundedResult: null,
        sourceRefs: [...left.sourceRefs, ...right.sourceRefs],
      }),
    ),
  );
};

const syntheticCase = (
  caseId: string,
  nodes: readonly [
    R141RelationNode,
    R141RelationNode,
    R141RelationNode,
  ],
  unresolvedOperands: readonly string[],
): R141GraphCase => {
  const layers = new Set(nodes.map((item) => item.layer));
  return Object.freeze({
    caseId,
    provenance: 'GOVERNED_SYNTHETIC_STRESS',
    nodes,
    edges: noPrecedenceEdges(caseId, nodes),
    boundedAssertion: null,
    unresolvedOperands,
    mixedStemBranch: layers.size > 1,
    globalPrecedenceAuthorized: false,
    totalOrderAuthorized: false,
    firstMatchWinsAuthorized: false,
    sequentialMutationAuthorized: false,
    numericWeightAuthorized: false,
    executableGraphSettlementAuthorized: false,
  });
};

const DIRECT_CASES = R059_DIRECT_CASES.map(directReplayCase);

const SYNTHETIC_CASES: readonly R141GraphCase[] = Object.freeze([
  syntheticCase(
    'R141-S07',
    [
      stemNode('R141-S07-STEM', '乙庚 pair identity'),
      branchNode('R141-S07-CLASH', 'BRANCH_CLASH', '子午 clash', ['R055:子午']),
      branchNode(
        'R141-S07-XING',
        'BRANCH_PUNISHMENT',
        '子→卯 directed punishment',
        ['R056:ZI_MAO_RECIPROCAL'],
      ),
    ],
    ['CROSS_LAYER_INTERACTION_EFFECT', 'RELATION_COMPETITION', 'ROLE_CONTEXT'],
  ),
  syntheticCase(
    'R141-S08',
    [
      branchNode(
        'R141-S08-BREAK',
        'BRANCH_BREAK',
        '卯午 source-scoped break',
        ['SOURCE_SCOPED_BREAK:卯午'],
        'SOURCE_SCOPED_MEMBERSHIP_ONLY',
      ),
      branchNode('R141-S08-CLASH', 'BRANCH_CLASH', '子午 clash', ['R055:子午']),
      branchNode(
        'R141-S08-MEETING',
        'BRANCH_MEETING',
        '申子辰 meeting',
        ['R059:C1-SHEN-ZI-CHEN-RESOLVES-ZI-WU'],
      ),
    ],
    ['BREAK_EFFECT', 'CLASH_EFFECT_SETTLEMENT', 'MULTIPLE_RELATION_SETTLEMENT'],
  ),
  syntheticCase(
    'R141-S09',
    [
      stemNode('R141-S09-STEM-A', '甲己 pair identity'),
      stemNode('R141-S09-STEM-B', '丙辛 pair identity'),
      branchNode('R141-S09-CLASH', 'BRANCH_CLASH', '辰戌 clash', ['R055:辰戌']),
    ],
    ['COMPETING_STEM_COMBINATION_TARGET', 'INTERVENING_STEM_EFFECT', 'CROSS_LAYER_INTERACTION_EFFECT'],
  ),
  syntheticCase(
    'R141-S10',
    [
      branchNode(
        'R141-S10-MEETING',
        'BRANCH_MEETING',
        '巳酉丑 meeting',
        ['R059:MEETING_FAMILY'],
      ),
      branchNode('R141-S10-CLASH', 'BRANCH_CLASH', '卯酉 clash', ['R055:卯酉']),
      branchNode(
        'R141-S10-XING',
        'BRANCH_PUNISHMENT',
        '巳→申 directed punishment',
        ['R056:YIN_SI_SHEN'],
      ),
    ],
    ['RELATION_COMPETITION', 'MULTIPLE_RELATION_SETTLEMENT', 'CROSS_RELATION_PRECEDENCE'],
  ),
]);

export const R141_GRAPH_CASES: readonly R141GraphCase[] = Object.freeze([
  ...DIRECT_CASES,
  ...SYNTHETIC_CASES,
]);

const PERMUTATIONS = Object.freeze([
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
] as const);

const canonicalNodeSetKey = (graphCase: R141GraphCase): string =>
  graphCase.nodes
    .map((item) => item.nodeId)
    .sort()
    .join('|');

const edgeIdentity = (item: R141RelationEdge): string => {
  if (item.kind === 'SOURCE_BOUNDED_INTERACTION') {
    return [
      item.kind,
      item.fromNodeId + '>' + item.toNodeId,
      item.boundedResult ?? 'NONE',
    ].join(':');
  }

  return [
    item.kind,
    [item.fromNodeId, item.toNodeId].sort().join('~'),
    'NONE',
  ].join(':');
};

const canonicalEdgeSetKey = (graphCase: R141GraphCase): string =>
  graphCase.edges.map(edgeIdentity).sort().join('|');

const boundedAssertionSignature = (
  assertion: R141BoundedAssertion | null,
): string | null =>
  assertion === null
    ? null
    : [
        assertion.sourceCaseId,
        assertion.actorNodeId + '>' + assertion.targetNodeId,
        assertion.boundedResult,
        assertion.sourceSurface,
      ].join('::');

export const R141_ORDER_VARIANTS: readonly R141OrderVariant[] = Object.freeze(
  R141_GRAPH_CASES.flatMap((graphCase) =>
    PERMUTATIONS.map((permutation, index) => {
      const inputOrder = permutation.map(
        (nodeIndex) => graphCase.nodes[nodeIndex].nodeId,
      ) as [string, string, string];

      return Object.freeze({
        variantId:
          graphCase.caseId + '-ORDER-' + String(index + 1).padStart(2, '0'),
        caseId: graphCase.caseId,
        inputOrder,
        canonicalNodeSetKey: canonicalNodeSetKey(graphCase),
        canonicalEdgeSetKey: canonicalEdgeSetKey(graphCase),
        boundedAssertionSignature: boundedAssertionSignature(
          graphCase.boundedAssertion,
        ),
        firstEnumeratedNodeWinner: null,
        globalPrecedenceApplied: false as const,
        firstMatchWinsApplied: false as const,
        sequentialMutationApplied: false as const,
        numericWeightApplied: false as const,
        graphSettlementEmitted: null,
        executable: false as const,
      });
    }),
  ),
);

export const R141_REJECTED_ORDERING_SHORTCUTS = Object.freeze([
  'ARRAY_ORDER_AS_RELATION_PRECEDENCE',
  'FIRST_ENUMERATED_RELATION_WINS',
  'FIRST_MATCH_SHORT_CIRCUIT',
  'SEQUENTIAL_RELATION_MUTATION',
  'RELATION_KIND_ENUM_ORDER_AS_PRIORITY',
  'SOURCE_CASE_DIRECTION_AS_GLOBAL_PRECEDENCE',
  'DIRECT_RESOLUTION_CASE_AS_TOTAL_ORDER',
  'STEM_LAYER_ALWAYS_BEFORE_BRANCH_LAYER',
  'BRANCH_LAYER_ALWAYS_BEFORE_STEM_LAYER',
  'NUMERIC_RELATION_WEIGHTING',
  'COOBSERVATION_AS_EFFECTIVE_INTERACTION',
  'STRUCTURAL_IDENTITY_AS_SETTLED_EFFECT',
] as const);

const directReplayCases = R141_GRAPH_CASES.filter(
  (item) => item.provenance === 'R059_DIRECT_REPLAY',
);

export const R141_SUMMARY = Object.freeze({
  graphCaseCount: R141_GRAPH_CASES.length,
  relationNodeCount: R141_GRAPH_CASES.reduce(
    (sum, item) => sum + item.nodes.length,
    0,
  ),
  orderVariantCount: R141_ORDER_VARIANTS.length,
  variantsPerCase: PERMUTATIONS.length,
  r059DirectReplayCaseCount: directReplayCases.length,
  r059ResolveReplayCount: directReplayCases.filter(
    (item) => item.boundedAssertion?.boundedResult === 'RESOLVES',
  ).length,
  r059ReactivateReplayCount: directReplayCases.filter(
    (item) => item.boundedAssertion?.boundedResult === 'CAN_REACTIVATE',
  ).length,
  r059MayBeIneffectiveReplayCount: directReplayCases.filter(
    (item) => item.boundedAssertion?.boundedResult === 'MAY_BE_INEFFECTIVE',
  ).length,
  mixedStemBranchCaseCount: R141_GRAPH_CASES.filter(
    (item) => item.mixedStemBranch,
  ).length,
  branchOnlyCaseCount: R141_GRAPH_CASES.filter(
    (item) => !item.mixedStemBranch,
  ).length,
  sourceBoundedInteractionEdgeCount: R141_GRAPH_CASES.flatMap(
    (item) => item.edges,
  ).filter((item) => item.kind === 'SOURCE_BOUNDED_INTERACTION').length,
  coobservedNoPrecedenceEdgeCount: R141_GRAPH_CASES.flatMap(
    (item) => item.edges,
  ).filter((item) => item.kind === 'COOBSERVED_NO_PRECEDENCE').length,
  nodeSetKeyVariantCount: new Set(
    R141_GRAPH_CASES.flatMap((graphCase) =>
      R141_ORDER_VARIANTS.filter((item) => item.caseId === graphCase.caseId).map(
        (item) => item.canonicalNodeSetKey,
      ),
    ),
  ).size,
  firstNodeWinnerEmissionCount: R141_ORDER_VARIANTS.filter(
    (item) => item.firstEnumeratedNodeWinner !== null,
  ).length,
  globalPrecedenceAppliedCount: R141_ORDER_VARIANTS.filter(
    (item) => item.globalPrecedenceApplied,
  ).length,
  firstMatchWinsAppliedCount: R141_ORDER_VARIANTS.filter(
    (item) => item.firstMatchWinsApplied,
  ).length,
  sequentialMutationAppliedCount: R141_ORDER_VARIANTS.filter(
    (item) => item.sequentialMutationApplied,
  ).length,
  numericWeightAppliedCount: R141_ORDER_VARIANTS.filter(
    (item) => item.numericWeightApplied,
  ).length,
  graphSettlementEmissionCount: R141_ORDER_VARIANTS.filter(
    (item) => item.graphSettlementEmitted !== null,
  ).length,
  executableCount: R141_ORDER_VARIANTS.filter((item) => item.executable).length,
});

export const R141_UPSTREAM_BINDINGS = Object.freeze({
  r051: {
    version: R051_HEAVENLY_STEM_FIVE_COMBINATION_VERSION,
    pairFamilyCount: R051_AUTHORITY.pairFamilyCount,
    effectiveCombinationResolverAuthorized:
      R051_AUTHORITY.effectiveCombinationResolverAuthorized,
    transformationResolverAuthorized:
      R051_AUTHORITY.transformationResolverAuthorized,
    productionAuthorityPromoted: R051_AUTHORITY.productionAuthorityPromoted,
  },
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
  r056: {
    version: R056_XING_TAXONOMY_VERSION,
    directedNonSelfRelationCount: R056_AUTHORITY.directedNonSelfRelationCount,
    selfXingBranchCount: R056_AUTHORITY.selfXingBranchCount,
    structuralPresenceImpliesHarm:
      R056_AUTHORITY.structuralPresenceImpliesHarm,
    executableEffectResolverAuthorized:
      R056_AUTHORITY.executableEffectResolverAuthorized,
  },
  r059: {
    version: R059_INTERACTION_CONFLICT_CORPUS_VERSION,
    directCaseCount: R059_AUTHORITY.directCaseCount,
    universalPrecedenceAuthorized:
      R059_AUTHORITY.universalPrecedenceAuthorized,
    totalOrderAuthorized: R059_AUTHORITY.totalOrderAuthorized,
    executableConflictResolverAuthorized:
      R059_AUTHORITY.executableConflictResolverAuthorized,
    firstMatchWinsAuthorized: R059_COVERAGE.firstMatchWinsAuthorized,
    numericWeightAuthorized: R059_COVERAGE.numericWeightAuthorized,
  },
  branchBreak: {
    version: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION,
    sourceScopedPairCount:
      GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS.length,
  },
});

export const R141_AUTHORITY = Object.freeze({
  status: 'RESEARCH_MULTI_RELATION_ORDER_SENSITIVITY_CORPUS_COMPLETE' as const,
  researchOnly: true,
  allR059DirectCasesReplayed: true,
  multiRelationGraphRepresentationObserved: true,
  mixedStemBranchGraphRepresentationObserved: true,
  inputEnumerationOrderInvariantRepresentationObserved: true,
  sourceBoundedDirectionDistinctFromGlobalPrecedenceObserved: true,
  globalRelationPrecedenceAuthorized: false,
  totalRelationOrderAuthorized: false,
  firstMatchWinsAuthorized: false,
  sequentialMutationResolverAuthorized: false,
  relationKindPriorityAuthorized: false,
  numericRelationWeightAuthorized: false,
  generalizedRelationEffectSettlementAuthorized: false,
  stemCombinationEffectResolverAuthorized: false,
  branchConflictResolverAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
