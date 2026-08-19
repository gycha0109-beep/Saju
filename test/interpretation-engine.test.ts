import { describe, expect, test } from 'vitest';
import {
  RegistryConfigurationError,
  calculateCanonicalSajuSnapshot,
  createRuleRegistrySnapshot,
  runInterpretation,
  type CalculationPolicySnapshot,
  type InterpretationPack,
  type MethodologyDefinition,
  type RuleDefinition,
  type SourceReference,
} from '../src/index.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/interpretation-engine-test',
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

const source: SourceReference = {
  sourceId: 'SOURCE-SYNTHETIC',
  sourceType: 'internal_research',
  title: 'Synthetic infrastructure source',
  provenanceTier: 'internal',
  notes: 'Test-only. No saju authority.',
};

const methodology: MethodologyDefinition = {
  methodologyId: 'METHOD-SYNTHETIC',
  version: '1.0.0',
  family: 'structural_balance',
  name: 'Synthetic methodology',
  description: 'Test-only methodology.',
  assumptions: [],
  requiredFactTypes: ['pillars.day'],
  sourceIds: [source.sourceId],
  status: 'research',
};

const pack: InterpretationPack = {
  packId: 'PACK-SYNTHETIC-RUNTIME',
  version: '1.0.0',
  name: 'Synthetic runtime pack',
  methodologyRefs: [{ id: methodology.methodologyId, version: methodology.version }],
  enabledRuleSets: ['runtime'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-SYNTHETIC', version: '1.0.0' },
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
    calculationPolicy,
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
}

function unknownJasiSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    { ...calculationPolicy, dayBoundary: 'jasi' },
  );
}

function rule(
  ruleId: string,
  claimType: string,
  value: unknown,
  options: {
    requiredClaimType?: string;
    conflictsWith?: readonly string[];
    ambiguityBehavior?: RuleDefinition['inputs'][number]['ambiguityBehavior'];
    sourceId?: string;
  } = {},
): RuleDefinition {
  const inputs: RuleDefinition['inputs'] = options.requiredClaimType
    ? [
        {
          key: 'upstream',
          source: 'interpretation_claim',
          pathOrClaimType: options.requiredClaimType,
          required: true,
          ambiguityBehavior: options.ambiguityBehavior ?? 'requires_resolved',
        },
      ]
    : [
        {
          key: 'day',
          source: 'canonical_fact',
          pathOrClaimType: 'pillars.day',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: options.ambiguityBehavior ?? 'requires_resolved',
        },
      ];

  return {
    ruleId,
    version: '1.0.0',
    ruleSetId: 'runtime',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: methodology.methodologyId, version: methodology.version },
    title: ruleId,
    description: 'Synthetic runtime rule.',
    inputs,
    condition: { op: 'exists', value: { kind: 'input', key: inputs[0]?.key ?? 'day' } },
    output: {
      claimType,
      subject: 'synthetic',
      predicate: 'synthetic',
      value,
      polarity: 'neutral',
    },
    sourceRefs: [
      {
        sourceId: options.sourceId ?? source.sourceId,
        supportType: 'implementation_reference',
      },
    ],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
    ...(options.conflictsWith === undefined
      ? {}
      : { relations: { conflictsWith: options.conflictsWith } }),
  };
}

function registry(rules: readonly RuleDefinition[], sourceValue: SourceReference = source) {
  return createRuleRegistrySnapshot(
    {
      rules,
      methodologies: [methodology],
      sources: [sourceValue],
    },
    pack,
    '2026-08-19T00:00:00.000Z',
  );
}

describe('interpretation execution and claim graph', () => {
  test('executes DAG stages, preserves conflicts, and resolves evidence refs', () => {
    const base = rule('RULE-BASE', 'CLAIM-BASE', 'base');
    const conflict = rule('RULE-CONFLICT', 'CLAIM-CONFLICT', 'conflict', {
      conflictsWith: ['RULE-BASE'],
    });
    const consumer = rule('RULE-CONSUMER', 'CLAIM-CONSUMER', 'consumer', {
      requiredClaimType: 'CLAIM-BASE',
    });

    const result = runInterpretation(knownSnapshot(), registry([consumer, conflict, base]), {
      now: new Date('2026-08-19T02:00:00.000Z'),
    });

    expect(result.run.status).toBe('completed');
    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.claims).toHaveLength(3);
    expect(result.claims.every((claim) => claim.state === 'active')).toBe(true);

    const baseClaim = result.claims.find((claim) => claim.claimType === 'CLAIM-BASE');
    const conflictClaim = result.claims.find((claim) => claim.claimType === 'CLAIM-CONFLICT');
    const consumerClaim = result.claims.find((claim) => claim.claimType === 'CLAIM-CONSUMER');
    expect(baseClaim).toBeDefined();
    expect(conflictClaim).toBeDefined();
    expect(consumerClaim?.upstreamClaimRefs).toEqual([baseClaim?.claimId]);

    expect(
      result.claimRelations.some(
        (relation) =>
          relation.relation === 'contradicts' &&
          new Set([relation.fromClaimId, relation.toClaimId]).has(baseClaim?.claimId ?? '') &&
          new Set([relation.fromClaimId, relation.toClaimId]).has(conflictClaim?.claimId ?? ''),
      ),
    ).toBe(true);
    expect(
      result.claimRelations.some(
        (relation) =>
          relation.relation === 'depends_on' &&
          relation.fromClaimId === consumerClaim?.claimId &&
          relation.toClaimId === baseClaim?.claimId,
      ),
    ).toBe(true);

    for (const claim of result.claims) {
      expect(result.evidenceIndex[claim.claimId]?.claimId).toBe(claim.claimId);
    }
    for (const relation of result.claimRelations) {
      expect(result.claims.some((claim) => claim.claimId === relation.fromClaimId)).toBe(true);
      expect(result.claims.some((claim) => claim.claimId === relation.toClaimId)).toBe(true);
    }
  });

  test('run/claim/relation identities are stable independently of audit timestamps', () => {
    const rules = [
      rule('RULE-BASE', 'CLAIM-BASE', 'base'),
      rule('RULE-CONFLICT', 'CLAIM-CONFLICT', 'conflict', { conflictsWith: ['RULE-BASE'] }),
    ];
    const stableRegistry = registry(rules);
    const stableSnapshot = knownSnapshot();

    const first = runInterpretation(stableSnapshot, stableRegistry, {
      now: new Date('2026-08-19T02:00:00.000Z'),
    });
    const second = runInterpretation(stableSnapshot, stableRegistry, {
      now: new Date('2026-08-20T02:00:00.000Z'),
    });

    expect(first.run.interpretationRunId).toBe(second.run.interpretationRunId);
    expect(first.run.runHash).toBe(second.run.runHash);
    expect(first.run.startedAt).not.toBe(second.run.startedAt);
    expect(first.run.claimIds).toEqual(second.run.claimIds);
    expect(first.run.claimRelationIds).toEqual(second.run.claimRelationIds);
    expect(first.run.evaluationIds).toEqual(second.run.evaluationIds);
  });

  test('scenario-preserving conflicting rules produce conflicts only within the same observed scenario', () => {
    const snapshot = unknownJasiSnapshot();
    const left = rule('RULE-LEFT', 'CLAIM-LEFT', 'left', {
      ambiguityBehavior: 'scenario_preserving',
      conflictsWith: ['RULE-RIGHT'],
    });
    const right = rule('RULE-RIGHT', 'CLAIM-RIGHT', 'right', {
      ambiguityBehavior: 'scenario_preserving',
      conflictsWith: ['RULE-LEFT'],
    });

    const result = runInterpretation(snapshot, registry([left, right]));
    const contradictions = result.claimRelations.filter(
      (relation) => relation.relation === 'contradicts',
    );

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(result.claims).toHaveLength(snapshot.scenarios.length * 2);
    expect(contradictions).toHaveLength(snapshot.scenarios.length);
    expect(new Set(result.claims.map((claim) => claim.scenarioRef)).size).toBe(
      snapshot.scenarios.length,
    );
    expect(result.integrity.valid).toBe(true);
  });

  test('base-context consumers cannot collapse scenario-specific claims into one input', () => {
    const snapshot = unknownJasiSnapshot();
    const producer = rule('RULE-SCENARIO-PRODUCER', 'CLAIM-SCENARIO', 'scenario', {
      ambiguityBehavior: 'scenario_preserving',
    });
    const consumer = rule('RULE-BASE-CONSUMER', 'CLAIM-CONSUMER', 'consumer', {
      requiredClaimType: 'CLAIM-SCENARIO',
    });

    const result = runInterpretation(snapshot, registry([producer, consumer]));
    const consumerEvaluation = result.evaluations.find(
      (evaluation) => evaluation.ruleRef.id === 'RULE-BASE-CONSUMER',
    );

    expect(result.claims.filter((claim) => claim.claimType === 'CLAIM-SCENARIO')).toHaveLength(
      snapshot.scenarios.length,
    );
    expect(result.claims.some((claim) => claim.claimType === 'CLAIM-CONSUMER')).toBe(false);
    expect(consumerEvaluation?.status).toBe('skipped_dependency_unresolved');
    expect(result.run.status).toBe('partial');
  });

  test('evaluator errors propagate to partial execution completeness', () => {
    const base = rule('RULE-ERROR', 'CLAIM-ERROR', 'never-emitted');
    const failing: RuleDefinition = {
      ...base,
      condition: {
        op: 'gt',
        left: { kind: 'input', key: 'day' },
        right: { kind: 'literal', value: 1 },
      },
    };

    const result = runInterpretation(knownSnapshot(), registry([failing]));

    expect(result.integrity.valid).toBe(true);
    expect(result.evaluations).toHaveLength(1);
    expect(result.evaluations[0]?.status).toBe('error');
    expect(result.claims).toHaveLength(0);
    expect(result.run.status).toBe('partial');
    expect(result.run.completeness.state).toBe('partial');
    expect(result.run.completeness.blockedCoreGroups).toEqual(['runtime']);
    expect(result.run.completeness.reasons).toContain('RULE-ERROR:error');
  });
});

describe('registry provenance integrity', () => {
  test('source content changes alter registry snapshot identity', () => {
    const selectedRule = rule('RULE-A', 'CLAIM-A', true);
    const first = registry([selectedRule], source);
    const second = registry([selectedRule], { ...source, title: 'Changed synthetic source title' });

    expect(first.snapshot.registrySnapshotId).not.toBe(second.snapshot.registrySnapshotId);
    expect(first.snapshot.sources[0]?.contentHash).not.toBe(second.snapshot.sources[0]?.contentHash);
  });

  test('missing rule source fails before execution', () => {
    const selectedRule = rule('RULE-MISSING-SOURCE', 'CLAIM-MISSING', true, {
      sourceId: 'SOURCE-NOT-REGISTERED',
    });

    try {
      createRuleRegistrySnapshot(
        {
          rules: [selectedRule],
          methodologies: [methodology],
          sources: [source],
        },
        pack,
      );
      throw new Error('expected missing source failure');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe('RULE_SOURCE_MISSING');
    }
  });
});
