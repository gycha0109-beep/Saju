import { describe, expect, test } from 'vitest';
import {
  buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview,
  I40_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_EDGES,
  I40_CHALLENGE_COMBINATION_PARALLEL_GROUPS,
} from '../src/index.js';

describe('I40 challenge combination condition composition and precedence methodology review', () => {
  test('authorizes only partial prerequisite/scope ordering and blocks a global condition precedence or numeric composition', () => {
    const report = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();

    expect(report.decision).toBe('PARTIAL_DEPENDENCY_ORDER_ONLY_GLOBAL_PRECEDENCE_BLOCKED');
    expect(report.structuralMembershipIsFoundationalPrerequisite).toBe(true);
    expect(report.globalConditionPrecedenceAuthorized).toBe(false);
    expect(report.conditionWeightingAuthorized).toBe(false);
    expect(report.additiveConditionAggregationAuthorized).toBe(false);
    expect(report.shortCircuitTransformationVerdictAuthorized).toBe(false);
    expect(report.conditionDependencyGraphAdapterAuthorized).toBe(true);
    expect(report.transformationConditionCompositionVerdictAuthorized).toBe(false);
  });

  test('keeps the stem day-master scope boundary as a gate and seasonal/support/competition contexts as parallel inputs', () => {
    const report = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
    const stemGroup = I40_CHALLENGE_COMBINATION_PARALLEL_GROUPS.find(
      (group) => group.groupId === 'STEM_CONTEXT_INPUTS',
    );

    expect(report.stemDayMasterScopeBoundaryPreventsDirectResultComposition).toBe(true);
    expect(report.stemContextDimensionsMayCoexistWithoutFixedPrecedence).toBe(true);
    expect(stemGroup?.nodes).toEqual([
      'SEASONAL_COMMAND_CONTEXT',
      'SUPPORT_INTERFERENCE_CONTEXT',
      'COMPETING_RELATION_TOPOLOGY',
    ]);
    expect(stemGroup?.fixedInternalPrecedenceAuthorized).toBe(false);
    expect(
      I40_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_EDGES.some(
        (edge) =>
          edge.from === 'STEM_DAY_MASTER_SCOPE_BOUNDARY' &&
          edge.to === 'TRANSFORMATION_OR_BINDING_VERDICT' &&
          edge.relation === 'SCOPE_GATE',
      ),
    ).toBe(true);
  });

  test('places full three-combination membership before bureau review while keeping adjacency, clash, lead-out and other modifiers parallel', () => {
    const report = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
    const threeGroup = I40_CHALLENGE_COMBINATION_PARALLEL_GROUPS.find(
      (group) => group.groupId === 'THREE_COMBINATION_CONTEXT_MODIFIERS',
    );

    expect(report.threeCombinationFullMembershipIsPreconditionForBureauReview).toBe(true);
    expect(report.threeCombinationContextModifiersMayCoexistWithoutFixedPrecedence).toBe(true);
    expect(
      I40_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_EDGES.some(
        (edge) =>
          edge.from === 'THREE_COMBINATION_FULL_MEMBERSHIP' &&
          edge.to === 'EFFECTIVE_BUREAU_QUALIFICATION' &&
          edge.relation === 'PREREQUISITE',
      ),
    ).toBe(true);
    expect(threeGroup?.nodes).toEqual(
      expect.arrayContaining([
        'SEASONAL_COMMAND_CONTEXT',
        'SUPPORT_INTERFERENCE_CONTEXT',
        'COMPETING_RELATION_TOPOLOGY',
        'THREE_COMBINATION_ADJACENCY_SPACING',
        'THREE_COMBINATION_CLASH_TOPOLOGY',
        'THREE_COMBINATION_LEAD_OUT_CONTEXT',
      ]),
    );
    expect(threeGroup?.fixedInternalPrecedenceAuthorized).toBe(false);
    expect(report.effectiveBureauVerdictAuthorized).toBe(false);
  });

  test('keeps the unresolved six-combination convention as a scope gate rather than importing a transformation target', () => {
    const report = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();

    expect(report.sixCombinationUniformConventionMustResolveBeforeTransformationTargetComposition).toBe(true);
    expect(
      I40_CHALLENGE_COMBINATION_CONDITION_DEPENDENCY_EDGES.some(
        (edge) =>
          edge.from === 'SIX_COMBINATION_REFERENCE_CONVENTION' &&
          edge.to === 'TRANSFORMATION_CONDITION_COMPOSITION' &&
          edge.relation === 'SCOPE_GATE',
      ),
    ).toBe(true);
    expect(report.transformationOrBindingVerdictAuthorized).toBe(false);
  });

  test('preserves deterministic identity and every downstream fail-closed boundary', () => {
    const report = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();
    const repeated = buildI40ChallengeCombinationConditionCompositionPrecedenceMethodologyReview();

    expect(report.dependencyEdges).toHaveLength(10);
    expect(report.parallelGroups).toHaveLength(2);
    expect(report.sourceBasis).toHaveLength(5);
    expect(report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
