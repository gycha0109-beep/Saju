import { describe, expect, it } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  prepareProductReading,
  runInterpretation,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type ClaimRelation,
  type InterpretationClaim,
  type InterpretationExecutionResult,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/product-reading-integration-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

const integrationOptions = {
  narrativePolicyRef: { id: 'myeonghwa-narrative-policy', version: '1.0.0-test' },
  outputSchemaVersion: 'myeonghwa-narrative-draft-v1-test',
} as const;

function snapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-24T00:00:00.000Z') },
  );
}

interface ClaimFixture {
  id: string;
  tier: 'T8' | 'T9' | 'T10' | 'T11';
  category: string;
  subcategory?: string;
  methodologyId?: string;
}

function claim(snapshotId: string, fixture: ClaimFixture): InterpretationClaim {
  return {
    claimId: fixture.id,
    schemaVersion: 'myeonghwa-product-reading-test-claim-v1',
    snapshotId,
    taxonomy: {
      tier: fixture.tier,
      category: fixture.category,
      ...(fixture.subcategory === undefined ? {} : { subcategory: fixture.subcategory }),
    },
    claimType: `CLAIM-${fixture.id}`,
    subject: fixture.category,
    predicate: 'product_reading_fixture',
    value: { fixture: fixture.id },
    methodologyRef: {
      id: fixture.methodologyId ?? 'METHOD-PRODUCT-READING-TEST',
      version: '1.0.0-test',
    },
    ruleRefs: [
      {
        ruleId: `RULE-${fixture.id}`,
        version: '1.0.0-test',
        evaluationId: `eval-${fixture.id}`,
      },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function executionWithClaims(
  currentSnapshot: CanonicalSajuSnapshot,
  registry: ReturnType<typeof createI7SeasonalSupportRegistry>,
  claims: readonly InterpretationClaim[],
  relations: readonly ClaimRelation[] = [],
): InterpretationExecutionResult {
  const base = runInterpretation(currentSnapshot, registry, {
    now: new Date('2026-08-24T00:05:00.000Z'),
  });
  return {
    ...base,
    claims,
    claimRelations: relations,
    integrity: { valid: true, errors: [] },
    evidenceIndex: {},
  };
}

describe('Product Reading Integration Boundary', () => {
  it('emits a grounded narrative request only for a complete authorized reading selection', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, {
      id: 'claim-career-natal',
      tier: 'T8',
      category: 'career',
    });
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [career]),
      registry,
      { requestId: 'product-general', text: '일반 사주' },
      integrationOptions,
    );

    expect(result.state).toBe('ready_for_narrative');
    expect(result.composition?.selection.coverageState).toBe('complete');
    expect(result.narrativeRequest).toBeDefined();
    expect(result.narrativeRequest?.evidenceBundle).toEqual(result.composition?.evidence?.bundle);
    expect(result.deliveryEligibility.narrativeGeneration).toBe('allowed');
    expect(result.deliveryEligibility.artifactAssembly).toBe('allowed_after_grounded_narrative');
  });

  it('blocks ambiguous consumer input before evidence selection or narrative generation', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, []),
      registry,
      { requestId: 'ambiguous-time', text: '올해 이번 달 사업운' },
      integrationOptions,
    );

    expect(result.state).toBe('input_ambiguous');
    expect(result.composition).toBeUndefined();
    expect(result.narrativeRequest).toBeUndefined();
    expect(result.deliveryEligibility.narrativeGeneration).toBe('blocked_input');
    expect(result.deliveryEligibility.mustSurfaceNormalizationState).toBe(true);
  });

  it('blocks unsupported free text instead of falling back to a general reading', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, []),
      registry,
      { requestId: 'unsupported-text', text: '요즘 왜 일이 꼬이지?' },
      integrationOptions,
    );

    expect(result.state).toBe('input_unsupported');
    expect(result.narrativeRequest).toBeUndefined();
    expect(result.deliveryEligibility.constraints.mayFallbackUnsupportedIntentToGeneral).toBe(false);
    expect(result.deliveryEligibility.constraints.mayFillMissingEvidenceWithLLM).toBe(false);
  });

  it('preserves insufficient parent evidence and forbids model supplementation', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const child = claim(currentSnapshot.snapshotId, {
      id: 'claim-family-children',
      tier: 'T8',
      category: 'family',
      subcategory: 'children',
    });
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [child]),
      registry,
      { requestId: 'parents-missing', text: '부모운' },
      integrationOptions,
    );

    expect(result.state).toBe('insufficient_evidence');
    expect(result.composition?.selection.coverageState).toBe('insufficient_evidence');
    expect(result.composition?.selection.selectedClaimIds).toEqual([]);
    expect(result.narrativeRequest).toBeUndefined();
    expect(result.deliveryEligibility.narrativeGeneration).toBe('blocked_coverage');
    expect(result.deliveryEligibility.mustSurfaceCoverageState).toBe(true);
  });

  it('preserves partial annual-business evidence but blocks narrative generation until coverage is complete', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const businessNatal = claim(currentSnapshot.snapshotId, {
      id: 'claim-business-natal',
      tier: 'T8',
      category: 'business',
    });
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [businessNatal]),
      registry,
      { requestId: 'business-annual-partial', text: '올해 사업운' },
      integrationOptions,
    );

    expect(result.state).toBe('partial_coverage');
    expect(result.composition?.selection.selectedClaimIds).toEqual([businessNatal.claimId]);
    expect(result.composition?.evidence).toBeDefined();
    expect(result.narrativeRequest).toBeUndefined();
    expect(result.deliveryEligibility.artifactAssembly).toBe('blocked_coverage');
  });

  it('preserves contradictory claims and does not resolve a methodology winner at the integration layer', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const left = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-left',
      tier: 'T8',
      category: 'wealth',
      methodologyId: 'METHOD-LEFT',
    });
    const right = claim(currentSnapshot.snapshotId, {
      id: 'claim-wealth-right',
      tier: 'T8',
      category: 'wealth',
      methodologyId: 'METHOD-RIGHT',
    });
    const contradiction: ClaimRelation = {
      relationId: 'relation-wealth-contradiction',
      fromClaimId: left.claimId,
      toClaimId: right.claimId,
      relation: 'contradicts',
    };
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [left, right], [contradiction]),
      registry,
      { requestId: 'wealth-conflict', text: '재물운' },
      integrationOptions,
    );

    expect(result.state).toBe('ready_for_narrative');
    expect(result.composition?.selection.selectedClaimIds).toEqual([left.claimId, right.claimId].sort());
    expect(result.composition?.selection.conflictRelationIds).toEqual([contradiction.relationId]);
    expect(result.deliveryEligibility.constraints.mayResolveMethodologyConflicts).toBe(false);
  });

  it('propagates explicit question text and output detail only after authorized T11 evidence is complete', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const questionClaim = claim(currentSnapshot.snapshotId, {
      id: 'claim-question-specific',
      tier: 'T11',
      category: 'question',
    });
    const result = prepareProductReading(
      currentSnapshot,
      executionWithClaims(currentSnapshot, registry, [questionClaim]),
      registry,
      {
        requestId: 'question-ready',
        text: '질문: 지금 이직을 고민해도 될까?',
        outputPreferences: { preferredDetail: 'concise' },
      },
      integrationOptions,
    );

    expect(result.state).toBe('ready_for_narrative');
    expect(result.narrativeRequest?.purpose).toBe('question_answer');
    expect(result.narrativeRequest?.userRequest).toEqual({
      question: '지금 이직을 고민해도 될까',
      preferredDetail: 'concise',
    });
  });

  it('is deterministic for identical snapshot, interpretation, consumer input, and narrative contract versions', () => {
    const currentSnapshot = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const career = claim(currentSnapshot.snapshotId, {
      id: 'claim-career-deterministic',
      tier: 'T8',
      category: 'career',
    });
    const execution = executionWithClaims(currentSnapshot, registry, [career]);
    const input = { requestId: 'deterministic-reading', text: '직업운' } as const;

    const first = prepareProductReading(
      currentSnapshot,
      execution,
      registry,
      input,
      integrationOptions,
    );
    const second = prepareProductReading(
      currentSnapshot,
      execution,
      registry,
      input,
      integrationOptions,
    );

    expect(second.preparationId).toBe(first.preparationId);
    expect(second.narrativeRequestRef).toEqual(first.narrativeRequestRef);
    expect(second.composition?.selection.selectionId).toBe(first.composition?.selection.selectionId);
  });
});
