import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  evaluateRule,
  evaluateRuleExpression,
  type CalculationPolicySnapshot,
  type InterpretationPack,
  type RuleDefinition,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/projection-test',
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
  packId: 'PACK-PROJECTION-TEST',
  version: '1.0.0',
  name: 'Projection test pack',
  methodologyRefs: [{ id: 'METHOD-PROJECTION-TEST', version: '1.0.0' }],
  enabledRuleSets: ['projection'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-PROJECTION-TEST', version: '1.0.0' },
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
    policy,
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
}

function projectionRule(): RuleDefinition {
  return {
    ruleId: 'RULE-PROJECTION',
    version: '1.0.0',
    ruleSetId: 'projection',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: 'METHOD-PROJECTION-TEST', version: '1.0.0' },
    title: 'Nested projection infrastructure test',
    description: 'Synthetic only.',
    inputs: [
      {
        key: 'day',
        source: 'derived_fact',
        pathOrClaimType: 'derivedFacts.dayMaster',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
      {
        key: 'month',
        source: 'canonical_fact',
        pathOrClaimType: 'pillars.month',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'day', path: 'element' } },
        { op: 'exists', value: { kind: 'input', key: 'month', path: 'branch.element' } },
      ],
    },
    output: {
      claimType: 'CLAIM-PROJECTION',
      subject: 'synthetic',
      predicate: 'nested_fields_exist',
      value: true,
    },
    sourceRefs: [{ sourceId: 'SOURCE-PROJECTION', supportType: 'implementation_reference' }],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'internal_reviewed',
    },
    status: 'research',
  };
}

describe('nested RuleOperand projection', () => {
  test('projects nested own-properties from resolved inputs', () => {
    const inputs = new Map<string, unknown>([
      ['value', { outer: { inner: 'ok' } }],
    ]);

    expect(
      evaluateRuleExpression(
        {
          op: 'eq',
          left: { kind: 'input', key: 'value', path: 'outer.inner' },
          right: { kind: 'literal', value: 'ok' },
        },
        inputs,
      ),
    ).toBe(true);
  });

  test('missing nested paths resolve as absent instead of reading arbitrary properties', () => {
    const inputs = new Map<string, unknown>([['value', { outer: {} }]]);

    expect(
      evaluateRuleExpression(
        { op: 'exists', value: { kind: 'input', key: 'value', path: 'outer.missing' } },
        inputs,
      ),
    ).toBe(false);
  });

  test('prototype-related projection segments are rejected', () => {
    const inputs = new Map<string, unknown>([['value', { safe: true }]]);

    for (const path of ['__proto__.polluted', 'constructor.prototype', 'prototype.polluted']) {
      expect(
        evaluateRuleExpression(
          { op: 'exists', value: { kind: 'input', key: 'value', path } },
          inputs,
        ),
      ).toBe(false);
    }
  });

  test('resolved Saju facts can be projected without changing fact traceability', () => {
    const result = evaluateRule(projectionRule(), { snapshot: snapshot(), pack });

    expect(result.evaluation.status).toBe('matched');
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]?.factRefs).toEqual(['derivedFacts.dayMaster', 'pillars.month']);
  });
});
