import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';
import type {
  ChallengeTargetCombinationConditionEvidenceItem,
  ChallengeTargetCombinationConditionEvidenceReport,
} from './i39-challenge-target-combination-condition-evidence.js';
import type {
  ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport,
  ChallengeCombinationConditionDependencyEdge,
  ChallengeCombinationConditionNode,
} from './i40-challenge-combination-condition-composition-precedence-methodology-review.js';

export const I41_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_GRAPH_VERSION =
  'myeonghwa-challenge-combination-condition-dependency-graph-v1';

export type ChallengeCombinationConditionGraphNodeState =
  | 'EVIDENCE_OBSERVED'
  | 'CONTEXT_ASSESSED_EMPTY'
  | 'SCOPE_GATE_ACTIVE'
  | 'POLICY_UNRESOLVED_WITH_SUBSTRATE'
  | 'RESULT_BLOCKED'
  | 'NOT_APPLICABLE';

export interface ChallengeCombinationConditionGraphNodeEvidence {
  node: ChallengeCombinationConditionNode;
  state: ChallengeCombinationConditionGraphNodeState;
  evidenceRefs: readonly string[];
  verdict: 'not_determined';
}

export interface ChallengeCombinationConditionDependencyGraphItem {
  mechanism: ChallengeMechanism;
  relationId: string;
  relationKind: ChallengeTargetCombinationConditionEvidenceItem['relationKind'];
  subjectKind: ChallengeTargetCombinationConditionEvidenceItem['subjectKind'];
  subjectPosition: ChallengeTargetCombinationConditionEvidenceItem['subjectPosition'];
  nodes: readonly ChallengeCombinationConditionGraphNodeEvidence[];
  edges: readonly ChallengeCombinationConditionDependencyEdge[];
  globalPrecedenceApplied: false;
  numericWeightsApplied: false;
  additiveAggregationApplied: false;
  shortCircuitRuleApplied: false;
  graphState: 'PARTIAL_DEPENDENCY_GRAPH_ONLY';
  transformationConditionCompositionVerdict: 'not_determined';
  effectiveBureauVerdict: 'not_determined';
  transformationOrBindingVerdict: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
}

export interface ChallengeCombinationConditionDependencyGraphReport {
  reportId: string;
  graphVersion: string;
  status:
    | 'RESOLVED_DEPENDENCY_GRAPH'
    | 'CONDITION_EVIDENCE_UNRESOLVED'
    | 'METHODOLOGY_NOT_AUTHORIZED';
  upstreamI39ReportId: string;
  upstreamI40ReviewId: string;
  graphs: readonly ChallengeCombinationConditionDependencyGraphItem[];
  allObservedRelationsHaveGraphs: boolean;
  globalConditionPrecedenceAuthorized: false;
  numericWeightingAuthorized: false;
  additiveAggregationAuthorized: false;
  shortCircuitTransformationAuthorized: false;
  transformationConditionCompositionVerdict: 'not_determined';
  effectiveBureauVerdict: 'not_determined';
  transformationOrBindingVerdict: 'not_determined';
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationConditionDependencyGraphReport, 'reportId'>,
): ChallengeCombinationConditionDependencyGraphReport {
  return {
    reportId: `challenge_combination_condition_dependency_graph_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<ChallengeCombinationConditionDependencyGraphReport['status'], 'RESOLVED_DEPENDENCY_GRAPH'>,
  evidence: ChallengeTargetCombinationConditionEvidenceReport,
  methodology: ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationConditionDependencyGraphReport {
  return finalized({
    graphVersion: I41_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_GRAPH_VERSION,
    status,
    upstreamI39ReportId: evidence.reportId,
    upstreamI40ReviewId: methodology.reviewId,
    graphs: [],
    allObservedRelationsHaveGraphs: false,
    globalConditionPrecedenceAuthorized: false,
    numericWeightingAuthorized: false,
    additiveAggregationAuthorized: false,
    shortCircuitTransformationAuthorized: false,
    transformationConditionCompositionVerdict: 'not_determined',
    effectiveBureauVerdict: 'not_determined',
    transformationOrBindingVerdict: 'not_determined',
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function node(
  value: ChallengeCombinationConditionNode,
  state: ChallengeCombinationConditionGraphNodeState,
  evidenceRefs: readonly string[] = [],
): ChallengeCombinationConditionGraphNodeEvidence {
  return { node: value, state, evidenceRefs, verdict: 'not_determined' };
}

function commonContextNodes(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): readonly ChallengeCombinationConditionGraphNodeEvidence[] {
  return [
    node('STRUCTURAL_RELATION_MEMBERSHIP', 'EVIDENCE_OBSERVED', [item.relationId]),
    node('SEASONAL_COMMAND_CONTEXT', 'EVIDENCE_OBSERVED', [
      `month:${item.seasonalCondition.monthBranch}`,
      `phase:${item.seasonalCondition.targetElementSeasonalPhase}`,
    ]),
    node('SUPPORT_INTERFERENCE_CONTEXT', 'EVIDENCE_OBSERVED', [
      ...item.supportInterference.participantContexts.flatMap((participant) => [
        ...participant.sameElementStemPositions.map((position) => `same-stem:${position}`),
        ...participant.resourceStemPositions.map((position) => `resource-stem:${position}`),
        ...participant.sameElementBranchPositions.map((position) => `same-branch:${position}`),
        ...participant.resourceBranchPositions.map((position) => `resource-branch:${position}`),
      ]),
    ]),
    node(
      'COMPETING_RELATION_TOPOLOGY',
      item.competingRelationTopology.length > 0 ? 'EVIDENCE_OBSERVED' : 'CONTEXT_ASSESSED_EMPTY',
      item.competingRelationTopology.map((relation) => relation.relationId),
    ),
  ];
}

function stemNodes(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): readonly ChallengeCombinationConditionGraphNodeEvidence[] {
  return [
    ...commonContextNodes(item),
    node('STEM_DAY_MASTER_SCOPE_BOUNDARY', 'SCOPE_GATE_ACTIVE', ['day-master-result-scope']),
    node('TRANSFORMATION_CONDITION_COMPOSITION', 'POLICY_UNRESOLVED_WITH_SUBSTRATE'),
    node('TRANSFORMATION_OR_BINDING_VERDICT', 'RESULT_BLOCKED'),
    node('THREE_COMBINATION_FULL_MEMBERSHIP', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_ADJACENCY_SPACING', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_CLASH_TOPOLOGY', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_LEAD_OUT_CONTEXT', 'NOT_APPLICABLE'),
    node('SIX_COMBINATION_REFERENCE_CONVENTION', 'NOT_APPLICABLE'),
    node('EFFECTIVE_BUREAU_QUALIFICATION', 'NOT_APPLICABLE'),
  ];
}

function threeCombinationNodes(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): readonly ChallengeCombinationConditionGraphNodeEvidence[] {
  const condition = item.threeBranchCondition;
  return [
    ...commonContextNodes(item),
    node('STEM_DAY_MASTER_SCOPE_BOUNDARY', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_FULL_MEMBERSHIP', 'EVIDENCE_OBSERVED', [
      ...(condition?.participantPositions.map((position) => `member:${position}`) ?? []),
    ]),
    node('THREE_COMBINATION_ADJACENCY_SPACING', 'EVIDENCE_OBSERVED', [
      `adjacency:${condition?.adjacencyState ?? 'unavailable'}`,
    ]),
    node(
      'THREE_COMBINATION_CLASH_TOPOLOGY',
      (condition?.clashTopology.length ?? 0) > 0 ? 'EVIDENCE_OBSERVED' : 'CONTEXT_ASSESSED_EMPTY',
      condition?.clashTopology.map((relation) => relation.relationId) ?? [],
    ),
    node('THREE_COMBINATION_LEAD_OUT_CONTEXT', 'EVIDENCE_OBSERVED', [
      `lead-out:${condition?.leadOutState ?? 'unavailable'}`,
      ...(condition?.visibleLeadOutStemPositions.map((position) => `stem:${position}`) ?? []),
    ]),
    node('SIX_COMBINATION_REFERENCE_CONVENTION', 'NOT_APPLICABLE'),
    node('TRANSFORMATION_CONDITION_COMPOSITION', 'POLICY_UNRESOLVED_WITH_SUBSTRATE'),
    node('EFFECTIVE_BUREAU_QUALIFICATION', 'POLICY_UNRESOLVED_WITH_SUBSTRATE'),
    node('TRANSFORMATION_OR_BINDING_VERDICT', 'RESULT_BLOCKED'),
  ];
}

function sixCombinationNodes(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): readonly ChallengeCombinationConditionGraphNodeEvidence[] {
  return [
    ...commonContextNodes(item),
    node('STEM_DAY_MASTER_SCOPE_BOUNDARY', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_FULL_MEMBERSHIP', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_ADJACENCY_SPACING', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_CLASH_TOPOLOGY', 'NOT_APPLICABLE'),
    node('THREE_COMBINATION_LEAD_OUT_CONTEXT', 'NOT_APPLICABLE'),
    node('SIX_COMBINATION_REFERENCE_CONVENTION', 'SCOPE_GATE_ACTIVE', [
      item.sixCombinationConventionState,
    ]),
    node('TRANSFORMATION_CONDITION_COMPOSITION', 'POLICY_UNRESOLVED_WITH_SUBSTRATE'),
    node('EFFECTIVE_BUREAU_QUALIFICATION', 'NOT_APPLICABLE'),
    node('TRANSFORMATION_OR_BINDING_VERDICT', 'RESULT_BLOCKED'),
  ];
}

function relevantEdges(
  item: ChallengeTargetCombinationConditionEvidenceItem,
  edges: readonly ChallengeCombinationConditionDependencyEdge[],
): readonly ChallengeCombinationConditionDependencyEdge[] {
  const applicable = new Set<ChallengeCombinationConditionNode>(
    (item.relationKind === 'stem_five_combination'
      ? stemNodes(item)
      : item.relationKind === 'branch_three_combination'
        ? threeCombinationNodes(item)
        : sixCombinationNodes(item))
      .filter((entry) => entry.state !== 'NOT_APPLICABLE')
      .map((entry) => entry.node),
  );
  return edges.filter((edge) => applicable.has(edge.from) && applicable.has(edge.to));
}

function graphItem(
  item: ChallengeTargetCombinationConditionEvidenceItem,
  methodology: ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport,
): ChallengeCombinationConditionDependencyGraphItem {
  const nodes =
    item.relationKind === 'stem_five_combination'
      ? stemNodes(item)
      : item.relationKind === 'branch_three_combination'
        ? threeCombinationNodes(item)
        : sixCombinationNodes(item);
  return {
    mechanism: item.mechanism,
    relationId: item.relationId,
    relationKind: item.relationKind,
    subjectKind: item.subjectKind,
    subjectPosition: item.subjectPosition,
    nodes,
    edges: relevantEdges(item, methodology.dependencyEdges),
    globalPrecedenceApplied: false,
    numericWeightsApplied: false,
    additiveAggregationApplied: false,
    shortCircuitRuleApplied: false,
    graphState: 'PARTIAL_DEPENDENCY_GRAPH_ONLY',
    transformationConditionCompositionVerdict: 'not_determined',
    effectiveBureauVerdict: 'not_determined',
    transformationOrBindingVerdict: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
  };
}

export function buildI41ChallengeCombinationConditionDependencyGraph(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  methodology: ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport,
): ChallengeCombinationConditionDependencyGraphReport {
  if (conditionEvidence.status !== 'RESOLVED_CONDITION_EVIDENCE') {
    return unresolved('CONDITION_EVIDENCE_UNRESOLVED', conditionEvidence, methodology, [
      'Resolved I39 condition evidence is required before dependency-graph materialization.',
    ]);
  }
  if (
    methodology.decision !== 'PARTIAL_DEPENDENCY_ORDER_ONLY_GLOBAL_PRECEDENCE_BLOCKED' ||
    !methodology.conditionDependencyGraphAdapterAuthorized ||
    methodology.globalConditionPrecedenceAuthorized ||
    methodology.conditionWeightingAuthorized ||
    methodology.additiveConditionAggregationAuthorized ||
    methodology.shortCircuitTransformationVerdictAuthorized ||
    methodology.transformationConditionCompositionVerdictAuthorized ||
    methodology.effectiveBureauVerdictAuthorized ||
    methodology.transformationOrBindingVerdictAuthorized
  ) {
    return unresolved('METHODOLOGY_NOT_AUTHORIZED', conditionEvidence, methodology, [
      'I40 does not authorize the fail-closed dependency-graph adapter contract.',
    ]);
  }

  const graphs = conditionEvidence.items.map((item) => graphItem(item, methodology));
  return finalized({
    graphVersion: I41_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_GRAPH_VERSION,
    status: 'RESOLVED_DEPENDENCY_GRAPH',
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI40ReviewId: methodology.reviewId,
    graphs,
    allObservedRelationsHaveGraphs: graphs.length === conditionEvidence.items.length,
    globalConditionPrecedenceAuthorized: false,
    numericWeightingAuthorized: false,
    additiveAggregationAuthorized: false,
    shortCircuitTransformationAuthorized: false,
    transformationConditionCompositionVerdict: 'not_determined',
    effectiveBureauVerdict: 'not_determined',
    transformationOrBindingVerdict: 'not_determined',
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I41 binds I40 dependency semantics to each I39 condition-evidence item without evaluating the graph into a result.',
      'Observed prerequisites, assessed contexts, active scope gates, unresolved policy nodes, and blocked result nodes remain distinct graph states.',
      'Empty competing/clash topology is recorded as assessed-empty context rather than absence of effect or proof of preservation.',
      'No global precedence, weights, additive aggregation, majority rule, or short-circuit transformation rule is applied.',
      'Transformation, binding, effective bureau, subject replacement, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification remain unresolved or unauthorized.',
    ],
  });
}
