import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import type { InterpretationPack, RuleDefinition } from '../src/contracts/interpretation.js';
import { evaluateRule } from '../src/interpretation/rule-evaluator.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/temporal-evaluator-test',
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
  packId: 'PACK-TEMPORAL-EVALUATOR-TEST',
  version: '1.0.0',
  name: 'Temporal evaluator test pack',
  methodologyRefs: [{ id: 'METHOD-TEMPORAL-TEST', version: '1.0.0' }],
  enabledRuleSets: ['temporal-test'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-TEMPORAL-TEST', version: '1.0.0' },
  status: 'research',
};

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: { known: true, hour: 9, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-09-03T13:30:00.000Z') },
  );
}

const annualRule: RuleDefinition = {
  ruleId: 'RULE-TEMPORAL-ANNUAL-TEST',
  version: '1.0.0',
  ruleSetId: 'temporal-test',
  taxonomy: { tier: 'T9', category: 'general', subcategory: 'annual' },
  methodologyRef: { id: 'METHOD-TEMPORAL-TEST', version: '1.0.0' },
  title: 'Synthetic annual temporal fact rule',
  description: 'Infrastructure-only temporal fact consumption test.',
  inputs: [
    {
      key: 'targetYear',
      source: 'temporal_fact',
      pathOrClaimType: 'targetYear',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'annualPillar',
      source: 'temporal_fact',
      pathOrClaimType: 'annualPillar',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
  ],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: 'annualPillar', path: 'stem' },
    right: { kind: 'literal', value: '병' },
  },
  output: {
    claimType: 'TEMPORAL_ANNUAL_TEST',
    subject: 'reading_period',
    predicate: 'annual_context_consumed',
    value: { semanticKey: 'TEMPORAL_ANNUAL_TEST' },
    polarity: 'neutral',
  },
  sourceRefs: [
    {
      sourceId: 'SOURCE-TEMPORAL-TEST',
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
};

describe('temporal fact rule evaluation', () => {
  it('consumes request-scoped temporal facts without mutating the natal snapshot', () => {
    const natal = snapshot();
    const before = structuredClone(natal);
    const result = evaluateRule(annualRule, {
      snapshot: natal,
      pack,
      temporalFacts: {
        targetYear: 2026,
        annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
      },
      now: new Date('2026-09-03T13:30:00.000Z'),
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs).toEqual([
      {
        sourceType: 'temporal_fact',
        idOrPath: 'temporal.targetYear',
        observedValue: 2026,
      },
      {
        sourceType: 'temporal_fact',
        idOrPath: 'temporal.annualPillar',
        observedValue: { stem: '병', branch: '오', cycleIndex: 42 },
      },
    ]);
    expect(result.claims[0]?.factRefs).toEqual([
      'temporal.annualPillar',
      'temporal.targetYear',
    ]);
    expect(natal).toEqual(before);
  });

  it('fails closed when a required temporal fact is absent', () => {
    const result = evaluateRule(annualRule, {
      snapshot: snapshot(),
      pack,
    });

    expect(result.evaluation.status).toBe('skipped_missing_input');
    expect(result.claims).toEqual([]);
  });

  it('changes evaluation identity when the consumed target period changes', () => {
    const natal = snapshot();
    const first = evaluateRule(annualRule, {
      snapshot: natal,
      pack,
      temporalFacts: {
        targetYear: 2026,
        annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
      },
    });
    const second = evaluateRule(annualRule, {
      snapshot: natal,
      pack,
      temporalFacts: {
        targetYear: 2027,
        annualPillar: { stem: '정', branch: '미', cycleIndex: 43 },
      },
    });

    expect(first.evaluation.evaluationId).not.toBe(second.evaluation.evaluationId);
    expect(first.evaluation.status).toBe('matched');
    expect(second.evaluation.status).toBe('not_matched');
  });
});
