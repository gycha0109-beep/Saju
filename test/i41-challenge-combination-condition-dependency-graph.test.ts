import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview,
  buildI41ChallengeCombinationConditionDependencyGraph,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
  type StructuralPillarInput,
} from '../src/index.js';

const STEM: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM[stem] },
    branch: { value: branch, ...BRANCH[branch] },
  };
}

function stemCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
  };
}

function sixCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function contiguousThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function separatedThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('경', '술'),
  };
}

function conditionEvidence(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
    pillars,
    roots,
    relations,
  );
  const transformationPolicy =
    buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(
    combinations,
    transformationPolicy,
  );
  const conditionMethodology =
    buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  return buildResolvedI39ChallengeTargetCombinationConditionEvidence(
    pillars,
    combinations,
    references,
    conditionMethodology,
  );
}

function graphFor(pillars: StructuralPillarInput) {
  const evidence = conditionEvidence(pillars);
  const methodology = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
  return {
    evidence,
    methodology,
    report: buildI41ChallengeCombinationConditionDependencyGraph(evidence, methodology),
  };
}

function nodeState(
  graph: ReturnType<typeof graphFor>['report']['graphs'][number] | undefined,
  node: string,
) {
  return graph?.nodes.find((item) => item.node === node)?.state;
}

describe('I41 challenge combination condition dependency graph adapter', () => {
  test('binds stem evidence to a day-master scope gate, parallel context evidence, unresolved composition policy and blocked result node', () => {
    const { report } = graphFor(stemCombinationPillars());
    const output = report.graphs.find(
      (graph) =>
        graph.mechanism === 'OUTPUT_LEAKAGE' &&
        graph.relationKind === 'stem_five_combination' &&
        graph.subjectPosition === 'year',
    );

    expect(report.status).toBe('RESOLVED_DEPENDENCY_GRAPH');
    expect(nodeState(output, 'STRUCTURAL_RELATION_MEMBERSHIP')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(output, 'SEASONAL_COMMAND_CONTEXT')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(output, 'SUPPORT_INTERFERENCE_CONTEXT')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(output, 'STEM_DAY_MASTER_SCOPE_BOUNDARY')).toBe('SCOPE_GATE_ACTIVE');
    expect(nodeState(output, 'TRANSFORMATION_CONDITION_COMPOSITION')).toBe(
      'POLICY_UNRESOLVED_WITH_SUBSTRATE',
    );
    expect(nodeState(output, 'TRANSFORMATION_OR_BINDING_VERDICT')).toBe('RESULT_BLOCKED');
    expect(output?.globalPrecedenceApplied).toBe(false);
    expect(output?.numericWeightsApplied).toBe(false);
  });

  test('binds three-combination full membership before unresolved bureau qualification while retaining adjacency and lead-out as evidence nodes', () => {
    const { report } = graphFor(contiguousThreeCombinationPillars());
    const output = report.graphs.find(
      (graph) => graph.mechanism === 'OUTPUT_LEAKAGE' && graph.relationKind === 'branch_three_combination',
    );

    expect(nodeState(output, 'THREE_COMBINATION_FULL_MEMBERSHIP')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(output, 'THREE_COMBINATION_ADJACENCY_SPACING')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(output, 'THREE_COMBINATION_LEAD_OUT_CONTEXT')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(output, 'EFFECTIVE_BUREAU_QUALIFICATION')).toBe(
      'POLICY_UNRESOLVED_WITH_SUBSTRATE',
    );
    expect(nodeState(output, 'TRANSFORMATION_OR_BINDING_VERDICT')).toBe('RESULT_BLOCKED');
    expect(
      output?.edges.some(
        (edge) =>
          edge.from === 'THREE_COMBINATION_FULL_MEMBERSHIP' &&
          edge.to === 'EFFECTIVE_BUREAU_QUALIFICATION' &&
          edge.relation === 'PREREQUISITE',
      ),
    ).toBe(true);
  });

  test('distinguishes observed clash topology from assessed-empty topology without turning either state into a bureau verdict', () => {
    const separated = graphFor(separatedThreeCombinationPillars()).report.graphs.find(
      (graph) => graph.mechanism === 'OUTPUT_LEAKAGE' && graph.relationKind === 'branch_three_combination',
    );
    const contiguous = graphFor(contiguousThreeCombinationPillars()).report.graphs.find(
      (graph) => graph.mechanism === 'OUTPUT_LEAKAGE' && graph.relationKind === 'branch_three_combination',
    );

    expect(nodeState(separated, 'THREE_COMBINATION_CLASH_TOPOLOGY')).toBe('EVIDENCE_OBSERVED');
    expect(nodeState(contiguous, 'THREE_COMBINATION_CLASH_TOPOLOGY')).toBe(
      'CONTEXT_ASSESSED_EMPTY',
    );
    expect(separated?.effectiveBureauVerdict).toBe('not_determined');
    expect(contiguous?.effectiveBureauVerdict).toBe('not_determined');
  });

  test('keeps the six-combination convention as an active scope gate and blocks result evaluation', () => {
    const { report } = graphFor(sixCombinationPillars());
    const output = report.graphs.find(
      (graph) => graph.mechanism === 'OUTPUT_LEAKAGE' && graph.relationKind === 'branch_six_combination',
    );

    expect(nodeState(output, 'SIX_COMBINATION_REFERENCE_CONVENTION')).toBe('SCOPE_GATE_ACTIVE');
    expect(nodeState(output, 'TRANSFORMATION_CONDITION_COMPOSITION')).toBe(
      'POLICY_UNRESOLVED_WITH_SUBSTRATE',
    );
    expect(nodeState(output, 'TRANSFORMATION_OR_BINDING_VERDICT')).toBe('RESULT_BLOCKED');
    expect(output?.transformationConditionCompositionVerdict).toBe('not_determined');
    expect(output?.transformationOrBindingVerdict).toBe('not_determined');
  });

  test('fails closed on unresolved I39 evidence and preserves deterministic no-precedence/no-weight/no-result guards', () => {
    const methodology = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
    const resolved = graphFor(stemCombinationPillars());
    const unresolvedEvidence = {
      ...resolved.evidence,
      reportId: `${resolved.evidence.reportId}_unresolved`,
      status: 'REFERENCE_EVIDENCE_UNRESOLVED' as const,
      items: [],
      challengeSpecificConditionEvidenceAvailable: false,
    };
    const rejected = buildI41ChallengeCombinationConditionDependencyGraph(
      unresolvedEvidence,
      methodology,
    );
    const repeated = buildI41ChallengeCombinationConditionDependencyGraph(
      resolved.evidence,
      methodology,
    );

    expect(rejected.status).toBe('CONDITION_EVIDENCE_UNRESOLVED');
    expect(rejected.graphs).toEqual([]);
    expect(resolved.report.allObservedRelationsHaveGraphs).toBe(true);
    expect(resolved.report.globalConditionPrecedenceAuthorized).toBe(false);
    expect(resolved.report.numericWeightingAuthorized).toBe(false);
    expect(resolved.report.additiveAggregationAuthorized).toBe(false);
    expect(resolved.report.shortCircuitTransformationAuthorized).toBe(false);
    expect(resolved.report.transformationConditionCompositionVerdict).toBe('not_determined');
    expect(resolved.report.effectiveBureauVerdict).toBe('not_determined');
    expect(resolved.report.transformationOrBindingVerdict).toBe('not_determined');
    expect(resolved.report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(resolved.report.targetPostRelationRootState).toBe('not_determined');
    expect(resolved.report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(resolved.report.classificationAuthorized).toBe(false);
    expect(resolved.report.numericScoringAuthorized).toBe(false);
    expect(resolved.report.reportId).toBe(repeated.reportId);
  });
});
