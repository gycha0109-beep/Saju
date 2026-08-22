import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  evaluateRule,
  type CalculationPolicySnapshot,
  type InterpretationClaim,
  type InterpretationPack,
  type RuleDefinition,
} from '../src/index.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/evaluator-test',
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

const pack: InterpretationPack = {
  packId: 'PACK-EVALUATOR-TEST',
  version: '1.0.0',
  name: 'Evaluator test pack',
  methodologyRefs: [{ id: 'METHOD-TEST', version: '1.0.0' }],
  enabledRuleSets: ['test'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-TEST', version: '1.0.0' },
  status: 'research',
};

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
}

function baseRule(overrides: Partial<RuleDefinition> = {}): RuleDefinition {
  return {
    ruleId: 'RULE-TEST-0001',
    version: '1.0.0',
    ruleSetId: 'test',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: 'METHOD-TEST', version: '1.0.0' },
    title: 'Synthetic evaluator rule',
    description: 'No saju authority; evaluator infrastructure only.',
    inputs: [
      {
        key: 'day',
        source: 'canonical_fact',
        pathOrClaimType: 'pillars.day',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'day' } },
    output: {
      claimType: 'CLAIM-TEST',
      subject: 'synthetic',
      predicate: 'exists',
      value: true,
      polarity: 'neutral',
    },
    sourceRefs: [
      {
        sourceId: 'SOURCE-TEST',
        supportType: 'implementation_reference',
      },
    ],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'internal_reviewed',
    },
    status: 'research',
    ...overrides,
  };
}

describe('rule evaluator', () => {
  test('emits a traceable claim when a resolved-input rule matches', () => {
    const result = evaluateRule(baseRule(), {
      snapshot: snapshot(),
      pack,
      now: new Date('2026-08-19T01:00:00.000Z'),
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.claims).toHaveLength(1);
    const claim = result.claims[0];
    expect(claim?.claimType).toBe('CLAIM-TEST');
    expect(claim?.factRefs).toEqual(['pillars.day']);
    expect(claim?.sourceRefs).toEqual(['SOURCE-TEST']);
    expect(claim?.ruleRefs[0]?.evaluationId).toBe(result.evaluation.evaluationId);
    expect(result.evaluation.emittedClaimIds).toEqual([claim?.claimId]);
  });

  test('records not_matched without emitting a claim', () => {
    const result = evaluateRule(
      baseRule({
        condition: {
          op: 'eq',
          left: { kind: 'input', key: 'day' },
          right: { kind: 'literal', value: 'impossible-value' },
        },
      }),
      { snapshot: snapshot(), pack },
    );

    expect(result.evaluation.status).toBe('not_matched');
    expect(result.claims).toEqual([]);
  });

  test('missing required fact is skipped instead of treated as a non-match', () => {
    const result = evaluateRule(
      baseRule({
        inputs: [
          {
            key: 'missing',
            source: 'canonical_fact',
            pathOrClaimType: 'derivedFacts.doesNotExist',
            required: true,
            ambiguityBehavior: 'requires_resolved',
          },
        ],
        condition: { op: 'exists', value: { kind: 'input', key: 'missing' } },
      }),
      { snapshot: snapshot(), pack },
    );

    expect(result.evaluation.status).toBe('skipped_missing_input');
    expect(result.claims).toEqual([]);
  });

  test('ambiguous required fact fails closed without selecting a candidate', () => {
    const ambiguousSnapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...calculationPolicy, dayBoundary: 'jasi' },
    );

    const result = evaluateRule(baseRule(), { snapshot: ambiguousSnapshot, pack });

    expect(ambiguousSnapshot.pillars.day.status).toBe('ambiguous');
    expect(result.evaluation.status).toBe('skipped_ambiguous_input');
    expect(result.claims).toEqual([]);
  });

  test('an explicit scenario override can resolve an ambiguous fact without changing the canonical snapshot', () => {
    const ambiguousSnapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...calculationPolicy, dayBoundary: 'jasi' },
    );
    if (ambiguousSnapshot.pillars.day.status !== 'ambiguous') {
      throw new Error('fixture must produce ambiguous day pillar');
    }
    const candidate = ambiguousSnapshot.pillars.day.candidates[0];
    if (candidate === undefined) throw new Error('ambiguous fixture requires candidate');

    const result = evaluateRule(baseRule(), {
      snapshot: ambiguousSnapshot,
      pack,
      scenarioRef: 'scenario-test',
      factOverrides: { 'pillars.day': candidate.value },
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.claims[0]?.scenarioRef).toBe('scenario-test');
    expect(ambiguousSnapshot.pillars.day.status).toBe('ambiguous');
  });

  test('required interpretation claim dependency is explicit and traceable', () => {
    const stableSnapshot = snapshot();
    const upstream: InterpretationClaim = {
      claimId: 'claim-upstream',
      schemaVersion: 'test',
      snapshotId: stableSnapshot.snapshotId,
      taxonomy: { tier: 'T1', category: 'synthetic' },
      claimType: 'CLAIM-UPSTREAM',
      subject: 'upstream',
      predicate: 'exists',
      value: 'ready',
      methodologyRef: { id: 'METHOD-TEST', version: '1.0.0' },
      ruleRefs: [],
      factRefs: [],
      upstreamClaimRefs: [],
      sourceRefs: [],
      state: 'active',
    };
    const consumer = baseRule({
      inputs: [
        {
          key: 'upstream',
          source: 'interpretation_claim',
          pathOrClaimType: 'CLAIM-UPSTREAM',
          required: true,
          ambiguityBehavior: 'requires_resolved',
        },
      ],
      condition: {
        op: 'eq',
        left: { kind: 'input', key: 'upstream' },
        right: { kind: 'literal', value: 'ready' },
      },
      output: {
        claimType: 'CLAIM-CONSUMER',
        subject: 'consumer',
        predicate: 'ready',
        value: true,
      },
    });

    const result = evaluateRule(consumer, {
      snapshot: stableSnapshot,
      pack,
      existingClaims: [upstream],
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.claims[0]?.upstreamClaimRefs).toEqual(['claim-upstream']);
  });

  test('missing required interpretation claim is skipped_dependency_unresolved', () => {
    const consumer = baseRule({
      inputs: [
        {
          key: 'upstream',
          source: 'interpretation_claim',
          pathOrClaimType: 'CLAIM-UPSTREAM',
          required: true,
          ambiguityBehavior: 'requires_resolved',
        },
      ],
    });

    const result = evaluateRule(consumer, { snapshot: snapshot(), pack, existingClaims: [] });
    expect(result.evaluation.status).toBe('skipped_dependency_unresolved');
  });

  test('evaluation and claim identities are reproducible independently of evaluatedAt', () => {
    const stableSnapshot = snapshot();
    const first = evaluateRule(baseRule(), {
      snapshot: stableSnapshot,
      pack,
      now: new Date('2026-08-19T01:00:00.000Z'),
    });
    const second = evaluateRule(baseRule(), {
      snapshot: stableSnapshot,
      pack,
      now: new Date('2026-08-20T01:00:00.000Z'),
    });

    expect(first.evaluation.evaluationId).toBe(second.evaluation.evaluationId);
    expect(first.claims[0]?.claimId).toBe(second.claims[0]?.claimId);
    expect(first.evaluation.evaluatedAt).not.toBe(second.evaluation.evaluatedAt);
  });

  test('invalid numeric expression becomes an error evaluation, not a silent non-match', () => {
    const result = evaluateRule(
      baseRule({
        condition: {
          op: 'gt',
          left: { kind: 'input', key: 'day' },
          right: { kind: 'literal', value: 1 },
        },
      }),
      { snapshot: snapshot(), pack },
    );

    expect(result.evaluation.status).toBe('error');
    expect(result.claims).toEqual([]);
  });
});
