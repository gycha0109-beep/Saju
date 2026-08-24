import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I40_CHALLENGE_COMBINATION_CONDITION_COMPOSITION_PRECEDENCE_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-condition-composition-precedence-methodology-review-v1';

export type ChallengeCombinationConditionNode =
  | 'STRUCTURAL_RELATION_MEMBERSHIP'
  | 'STEM_DAY_MASTER_SCOPE_BOUNDARY'
  | 'SEASONAL_COMMAND_CONTEXT'
  | 'SUPPORT_INTERFERENCE_CONTEXT'
  | 'COMPETING_RELATION_TOPOLOGY'
  | 'THREE_COMBINATION_FULL_MEMBERSHIP'
  | 'THREE_COMBINATION_ADJACENCY_SPACING'
  | 'THREE_COMBINATION_CLASH_TOPOLOGY'
  | 'THREE_COMBINATION_LEAD_OUT_CONTEXT'
  | 'SIX_COMBINATION_REFERENCE_CONVENTION'
  | 'TRANSFORMATION_CONDITION_COMPOSITION'
  | 'EFFECTIVE_BUREAU_QUALIFICATION'
  | 'TRANSFORMATION_OR_BINDING_VERDICT';

export interface ChallengeCombinationConditionDependencyEdge {
  from: ChallengeCombinationConditionNode;
  to: ChallengeCombinationConditionNode;
  relation: 'PREREQUISITE' | 'SCOPE_GATE' | 'CONTEXT_INPUT';
  finding: string;
}

export interface ChallengeCombinationConditionParallelGroup {
  groupId: string;
  nodes: readonly ChallengeCombinationConditionNode[];
  fixedInternalPrecedenceAuthorized: false;
  finding: string;
}

export interface ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'PARTIAL_DEPENDENCY_ORDER_ONLY_GLOBAL_PRECEDENCE_BLOCKED';
  structuralMembershipIsFoundationalPrerequisite: true;
  stemDayMasterScopeBoundaryPreventsDirectResultComposition: true;
  stemContextDimensionsMayCoexistWithoutFixedPrecedence: true;
  threeCombinationFullMembershipIsPreconditionForBureauReview: true;
  threeCombinationContextModifiersMayCoexistWithoutFixedPrecedence: true;
  sixCombinationUniformConventionMustResolveBeforeTransformationTargetComposition: true;
  globalConditionPrecedenceAuthorized: false;
  conditionWeightingAuthorized: false;
  additiveConditionAggregationAuthorized: false;
  shortCircuitTransformationVerdictAuthorized: false;
  conditionDependencyGraphAdapterAuthorized: true;
  transformationConditionCompositionVerdictAuthorized: false;
  effectiveBureauVerdictAuthorized: false;
  transformationOrBindingVerdictAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  dependencyEdges: readonly ChallengeCombinationConditionDependencyEdge[];
  parallelGroups: readonly ChallengeCombinationConditionParallelGroup[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I40_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_EDGES = Object.freeze([
  {
    from: 'STRUCTURAL_RELATION_MEMBERSHIP' as const,
    to: 'TRANSFORMATION_CONDITION_COMPOSITION' as const,
    relation: 'PREREQUISITE' as const,
    finding:
      'No condition-composition review exists without an identified structural combination relation; structural relation membership is substrate, not a transformation result.',
  },
  {
    from: 'STEM_DAY_MASTER_SCOPE_BOUNDARY' as const,
    to: 'TRANSFORMATION_OR_BINDING_VERDICT' as const,
    relation: 'SCOPE_GATE' as const,
    finding:
      '三命通會 explicitly scopes 化氣 result reasoning to the day stem, so challenge-target stem evidence cannot cross directly into a true-transformation or binding verdict.',
  },
  {
    from: 'SEASONAL_COMMAND_CONTEXT' as const,
    to: 'TRANSFORMATION_CONDITION_COMPOSITION' as const,
    relation: 'CONTEXT_INPUT' as const,
    finding:
      'Season/month context is repeatedly relevant to traditional 化 discussions, but no challenge-specific fixed precedence over the other context dimensions is established.',
  },
  {
    from: 'SUPPORT_INTERFERENCE_CONTEXT' as const,
    to: 'TRANSFORMATION_CONDITION_COMPOSITION' as const,
    relation: 'CONTEXT_INPUT' as const,
    finding:
      'Support, rooting, and interfering stems are contextual inputs; source examples do not authorize a universal challenge-target ordering or weight.',
  },
  {
    from: 'COMPETING_RELATION_TOPOLOGY' as const,
    to: 'TRANSFORMATION_CONDITION_COMPOSITION' as const,
    relation: 'CONTEXT_INPUT' as const,
    finding:
      'Competing/jealous combination topology may affect interpretation, but topology itself does not establish precedence or a result.',
  },
  {
    from: 'THREE_COMBINATION_FULL_MEMBERSHIP' as const,
    to: 'EFFECTIVE_BUREAU_QUALIFICATION' as const,
    relation: 'PREREQUISITE' as const,
    finding:
      '三命通會 states that a missing member prevents 三合化局, so full three-branch membership is a necessary precondition before effective-bureau review.',
  },
  {
    from: 'THREE_COMBINATION_ADJACENCY_SPACING' as const,
    to: 'EFFECTIVE_BUREAU_QUALIFICATION' as const,
    relation: 'CONTEXT_INPUT' as const,
    finding:
      '滴天髓闡微 distinguishes tightly connected and separated combination structures, making spacing relevant after structural membership but not an independently sufficient result.',
  },
  {
    from: 'THREE_COMBINATION_CLASH_TOPOLOGY' as const,
    to: 'EFFECTIVE_BUREAU_QUALIFICATION' as const,
    relation: 'CONTEXT_INPUT' as const,
    finding:
      'Clash against a combination can alter the structure depending on placement and relative context; no universal clash-first or clash-wins precedence is authorized.',
  },
  {
    from: 'THREE_COMBINATION_LEAD_OUT_CONTEXT' as const,
    to: 'EFFECTIVE_BUREAU_QUALIFICATION' as const,
    relation: 'CONTEXT_INPUT' as const,
    finding:
      'Heavenly-stem lead-out may matter to whether combined qi is usable, but presence of a lead-out stem is not a sufficient effective-bureau criterion.',
  },
  {
    from: 'SIX_COMBINATION_REFERENCE_CONVENTION' as const,
    to: 'TRANSFORMATION_CONDITION_COMPOSITION' as const,
    relation: 'SCOPE_GATE' as const,
    finding:
      'Because the current source record does not yield one complete uniform six-combination transformed-element convention for challenge use, transformation-target composition remains gated.',
  },
] as const);

export const I40_CHALLENGE_COMBINATION_PARALLEL_GROUPS = Object.freeze([
  {
    groupId: 'STEM_CONTEXT_INPUTS',
    nodes: [
      'SEASONAL_COMMAND_CONTEXT',
      'SUPPORT_INTERFERENCE_CONTEXT',
      'COMPETING_RELATION_TOPOLOGY',
    ] as const,
    fixedInternalPrecedenceAuthorized: false as const,
    finding:
      'The reviewed stem sources show these contexts can all matter, but do not establish one universal challenge-target ordering among them.',
  },
  {
    groupId: 'THREE_COMBINATION_CONTEXT_MODIFIERS',
    nodes: [
      'SEASONAL_COMMAND_CONTEXT',
      'SUPPORT_INTERFERENCE_CONTEXT',
      'COMPETING_RELATION_TOPOLOGY',
      'THREE_COMBINATION_ADJACENCY_SPACING',
      'THREE_COMBINATION_CLASH_TOPOLOGY',
      'THREE_COMBINATION_LEAD_OUT_CONTEXT',
    ] as const,
    fixedInternalPrecedenceAuthorized: false as const,
    finding:
      'After full three-branch membership is established, the reviewed contextual modifiers remain jointly relevant without a source-backed total order or numeric weight.',
  },
] as const);

export const I40_CHALLENGE_COMBINATION_COMPOSITION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-SIKU-V2',
    supportType: 'scope_limit' as const,
    finding:
      '化氣 is explicitly day-stem scoped while month vitality and interfering stems appear as contextual conditions, blocking direct challenge-target result composition.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'direct_basis' as const,
    finding:
      'A missing member prevents 三合化局, supporting full three-branch membership as a prerequisite rather than an effective-bureau verdict.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'scope_limit' as const,
    finding:
      '化象 commentary treats season, support/rooting, and competing stems as interacting context and distinguishes 合而不化, without providing a portable challenge-target ordering rule.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU',
    supportType: 'cross_reference' as const,
    finding:
      '方局 commentary treats adjacency/separation, clash placement, and heavenly-stem lead-out as contextual modifiers, supporting a dependency graph but not fixed total precedence.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-TONGGE',
    supportType: 'cross_reference' as const,
    finding:
      '通隔論 describes obstruction by spacing, clash, and intervening factors as structurally contextual, reinforcing that several conditions may interact rather than follow one universal linear order.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'A next-stage adapter may materialize the I40 dependency graph against I39 evidence but must not evaluate the graph into a transformation, binding, or effective-bureau result.',
  'Treat three-combination full membership as a prerequisite node before effective-bureau review, not as a positive verdict.',
  'Treat stem seasonal command, support/interference, and competing topology as parallel context inputs with no fixed internal precedence.',
  'Treat three-combination adjacency/spacing, clash topology, lead-out, seasonal command, support/interference, and competing topology as parallel contextual modifiers after membership is established.',
  'Do not assign weights, points, confidence, majority votes, additive totals, or short-circuit rules to condition nodes.',
  'Keep the stem day-master scope boundary as a blocking scope gate against direct challenge-target transformation/binding result reuse.',
  'Keep the six-combination convention unresolved before any transformation-target composition.',
  'Do not emit post-combination subject identity, post-relation root state, effective mechanism force, usefulness/harmfulness, or strong/weak classification.',
] as const);

export function buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview(): ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport {
  const material = {
    reviewVersion:
      I40_CHALLENGE_COMBINATION_CONDITION_COMPOSITION_PRECEDENCE_METHODOLOGY_REVIEW_VERSION,
    decision: 'PARTIAL_DEPENDENCY_ORDER_ONLY_GLOBAL_PRECEDENCE_BLOCKED' as const,
    structuralMembershipIsFoundationalPrerequisite: true as const,
    stemDayMasterScopeBoundaryPreventsDirectResultComposition: true as const,
    stemContextDimensionsMayCoexistWithoutFixedPrecedence: true as const,
    threeCombinationFullMembershipIsPreconditionForBureauReview: true as const,
    threeCombinationContextModifiersMayCoexistWithoutFixedPrecedence: true as const,
    sixCombinationUniformConventionMustResolveBeforeTransformationTargetComposition: true as const,
    globalConditionPrecedenceAuthorized: false as const,
    conditionWeightingAuthorized: false as const,
    additiveConditionAggregationAuthorized: false as const,
    shortCircuitTransformationVerdictAuthorized: false as const,
    conditionDependencyGraphAdapterAuthorized: true as const,
    transformationConditionCompositionVerdictAuthorized: false as const,
    effectiveBureauVerdictAuthorized: false as const,
    transformationOrBindingVerdictAuthorized: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    dependencyEdges: I40_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_EDGES,
    parallelGroups: I40_CHALLENGE_COMBINATION_PARALLEL_GROUPS,
    sourceBasis: I40_CHALLENGE_COMBINATION_COMPOSITION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I40 authorizes only a partial dependency ordering: structural prerequisites and scope gates may precede contextual review, but the reviewed sources do not authorize a total condition precedence.',
      'For stem combinations, day-master scope blocks direct result reuse while seasonal/support/competition contexts remain parallel candidate inputs.',
      'For three-combinations, full membership is prerequisite; adjacency, clash, lead-out, seasonal, support, and competition remain parallel contextual modifiers with no fixed weights.',
      'For six-combinations, unresolved uniform transformation convention remains a scope gate before any challenge transformation-target composition.',
      'The next adapter may expose graph readiness but must remain fail-closed on every transformation, effective-bureau, force, effect, scoring, and classification verdict.',
    ],
  };

  return {
    reviewId: `challenge_combination_condition_composition_precedence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
