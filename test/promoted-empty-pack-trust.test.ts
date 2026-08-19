import { describe, expect, test } from 'vitest';
import {
  ExecutionPlanError,
  buildInterpretationExecutionPlan,
  createRuleRegistrySnapshot,
  type InterpretationPack,
  type ReviewerTrustContext,
} from '../src/index.js';

function promotedPack(status: 'staging' | 'production'): InterpretationPack {
  return {
    packId: `PACK-I17-EMPTY-${status.toUpperCase()}`,
    version: '1.0.0',
    name: `I17 empty ${status} fixture`,
    methodologyRefs: [],
    enabledRuleSets: [],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-I17-EMPTY', version: '1.0.0' },
    status,
  };
}

function emptyRegistry(status: 'staging' | 'production') {
  return createRuleRegistrySnapshot(
    { rules: [], methodologies: [], sources: [], reviewAttestations: [] },
    promotedPack(status),
  );
}

const emptyTrustContext: ReviewerTrustContext = {
  policyId: 'TRUST-I17-EMPTY-PACK',
  version: '1.0.0',
  grants: [],
};

function expectTrustRequired(action: () => unknown): void {
  try {
    action();
    throw new Error('Expected promoted-pack trust requirement.');
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe('REVIEWER_TRUST_CONTEXT_REQUIRED');
  }
}

describe('I17 promoted empty-pack trust gate', () => {
  test.each(['staging', 'production'] as const)(
    '%s cannot bypass reviewer trust merely because it selects no content',
    (status) => {
      expectTrustRequired(() => buildInterpretationExecutionPlan(emptyRegistry(status)));
    },
  );

  test.each(['staging', 'production'] as const)(
    '%s persists an explicitly supplied trust-policy ref even for an empty plan',
    (status) => {
      const plan = buildInterpretationExecutionPlan(emptyRegistry(status), emptyTrustContext);
      expect(plan.orderedRuleRefs).toEqual([]);
      expect(plan.stages).toEqual([]);
      expect(plan.reviewerTrustPolicyRef?.id).toBe(emptyTrustContext.policyId);
      expect(plan.reviewerTrustPolicyRef?.version).toBe(emptyTrustContext.version);
      expect(plan.reviewerTrustPolicyRef?.contentHash).toHaveLength(64);
    },
  );
});
