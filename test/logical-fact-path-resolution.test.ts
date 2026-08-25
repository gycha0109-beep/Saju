import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  evaluateRule,
  type CalculationPolicySnapshot,
  type InterpretationPack,
  type RuleDefinition,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/logical-fact-path-test',
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
  packId: 'PACK-LOGICAL-FACT-PATH-TEST',
  version: '1.0.0',
  name: 'Logical fact path test pack',
  methodologyRefs: [{ id: 'METHOD-LOGICAL-FACT-PATH-TEST', version: '1.0.0' }],
  enabledRuleSets: ['logical-fact-path-test'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-LOGICAL-FACT-PATH-TEST', version: '1.0.0' },
  status: 'research',
};

function knownSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-25T00:00:00.000Z') },
  );
}

function unknownSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-25T00:00:00.000Z') },
  );
}

function rule(path: string, condition: RuleDefinition['condition']): RuleDefinition {
  return {
    ruleId: `RULE-LOGICAL-FACT-PATH-${path.replaceAll('.', '-').toUpperCase()}`,
    version: '1.0.0',
    ruleSetId: 'logical-fact-path-test',
    taxonomy: { tier: 'T5', category: 'synthetic' },
    methodologyRef: { id: 'METHOD-LOGICAL-FACT-PATH-TEST', version: '1.0.0' },
    title: 'Logical fact path test rule',
    description: 'Synthetic resolver test only.',
    inputs: [
      {
        key: 'value',
        source: 'derived_fact',
        pathOrClaimType: path,
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition,
    output: {
      claimType: 'LOGICAL_FACT_PATH_TEST',
      subject: 'synthetic',
      predicate: 'resolved',
      value: { ok: true },
    },
    sourceRefs: [],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  };
}

describe('logical precise fact path resolution', () => {
  test('unwraps resolved parent and leaf FactState without exposing storage .value segments', () => {
    const snapshot = knownSnapshot();
    if (snapshot.derivedFacts.tenGods.status !== 'resolved') throw new Error('fixture tenGods unresolved');
    const expected = snapshot.derivedFacts.tenGods.value.month.stem;
    if (expected?.status !== 'resolved') throw new Error('fixture month stem tenGod unresolved');

    const result = evaluateRule(
      rule('derivedFacts.tenGods.month.stem', {
        op: 'eq',
        left: { kind: 'input', key: 'value' },
        right: { kind: 'literal', value: expected.value },
      }),
      { snapshot, pack },
    );

    expect(result.evaluation.status).toBe('matched');
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]?.factRefs).toEqual(['derivedFacts.tenGods.month.stem']);
    expect(result.evaluation.inputRefs[0]?.idOrPath).toBe('derivedFacts.tenGods.month.stem');
    expect(result.evaluation.inputRefs[0]?.observedValue).toBe(expected.value);
  });

  test('uses the longest parent scenario override when resolving a deeper logical path', () => {
    const snapshot = knownSnapshot();
    const result = evaluateRule(
      rule('pillars.month.stem.value', {
        op: 'eq',
        left: { kind: 'input', key: 'value' },
        right: { kind: 'literal', value: '계' },
      }),
      {
        snapshot,
        pack,
        scenarioRef: 'scenario:test',
        factOverrides: {
          'pillars.month': {
            stem: { value: '계', hanja: '癸', element: '수', yinYang: '음' },
            branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
          },
        },
      },
    );

    expect(result.evaluation.status).toBe('matched');
    expect(result.claims[0]?.scenarioRef).toBe('scenario:test');
    expect(result.claims[0]?.factRefs).toEqual(['pillars.month.stem.value']);
    expect(result.evaluation.inputRefs[0]?.observedValue).toBe('계');
  });

  test('an exact override wins over a parent override', () => {
    const snapshot = knownSnapshot();
    const result = evaluateRule(
      rule('pillars.month.stem.value', {
        op: 'eq',
        left: { kind: 'input', key: 'value' },
        right: { kind: 'literal', value: '갑' },
      }),
      {
        snapshot,
        pack,
        scenarioRef: 'scenario:test',
        factOverrides: {
          'pillars.month': {
            stem: { value: '계' },
            branch: { value: '자' },
          },
          'pillars.month.stem.value': '갑',
        },
      },
    );

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs[0]?.observedValue).toBe('갑');
  });

  test('fails closed when an intermediate parent FactState is unavailable', () => {
    const snapshot = unknownSnapshot();
    expect(snapshot.derivedFacts.tenGods.status).toBe('unavailable');

    const scenario = snapshot.scenarios[0];
    const result = evaluateRule(
      rule('derivedFacts.tenGods.month.stem', {
        op: 'exists',
        value: { kind: 'input', key: 'value' },
      }),
      {
        snapshot,
        pack,
        ...(scenario === undefined
          ? {}
          : {
              scenarioRef: scenario.scenarioId,
              factOverrides: Object.fromEntries(
                scenario.factOverrides.map((item) => [item.path, item.value]),
              ),
            }),
      },
    );

    expect(result.evaluation.status).toBe('skipped_missing_input');
    expect(result.claims).toEqual([]);
  });

  test('does not treat storage-shaped .value access as necessary for nested resolved facts', () => {
    const snapshot = knownSnapshot();
    const logical = evaluateRule(
      rule('derivedFacts.tenGods.year.branch', {
        op: 'exists',
        value: { kind: 'input', key: 'value' },
      }),
      { snapshot, pack },
    );

    expect(logical.evaluation.status).toBe('matched');
    expect(logical.claims[0]?.factRefs).toEqual(['derivedFacts.tenGods.year.branch']);
  });
});
