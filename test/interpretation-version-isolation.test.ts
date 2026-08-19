import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  createRuleRegistrySnapshot,
  runInterpretation,
  type CalculationPolicySnapshot,
  type InterpretationPack,
  type MethodologyDefinition,
  type RuleDefinition,
  type SourceReference,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/version-isolation-test',
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
  sourceId: 'SOURCE-VERSION-ISOLATION',
  sourceType: 'internal_research',
  title: 'Version isolation synthetic source',
  provenanceTier: 'internal',
};

const methodology: MethodologyDefinition = {
  methodologyId: 'METHOD-VERSION-ISOLATION',
  version: '1.0.0',
  family: 'structural_balance',
  name: 'Version isolation methodology',
  description: 'Synthetic infrastructure only.',
  assumptions: [],
  requiredFactTypes: ['pillars.day'],
  sourceIds: [source.sourceId],
  status: 'active',
};

const pack: InterpretationPack = {
  packId: 'PACK-VERSION-ISOLATION',
  version: '1.0.0',
  name: 'Version isolation pack',
  methodologyRefs: [{ id: methodology.methodologyId, version: methodology.version }],
  enabledRuleSets: ['runtime'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-VERSION-ISOLATION', version: '1.0.0' },
  status: 'production',
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

function activeRule(ruleId: string, claimType: string): RuleDefinition {
  return {
    ruleId,
    version: '1.0.0',
    ruleSetId: 'runtime',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: methodology.methodologyId, version: methodology.version },
    title: ruleId,
    description: 'Synthetic infrastructure rule.',
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
      claimType,
      subject: 'synthetic',
      predicate: 'synthetic',
      value: ruleId,
    },
    sourceRefs: [{ sourceId: source.sourceId, supportType: 'implementation_reference' }],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'internal_reviewed',
    },
    status: 'active',
  };
}

function registry(rules: readonly RuleDefinition[]) {
  return createRuleRegistrySnapshot(
    { rules, methodologies: [methodology], sources: [source] },
    pack,
    '2026-08-19T00:00:00.000Z',
  );
}

describe('interpretation rule-version isolation', () => {
  test('an unselected historical version cannot inject claim relations', () => {
    const selectedA = activeRule('RULE-A', 'CLAIM-A');
    const selectedB = activeRule('RULE-B', 'CLAIM-B');
    const historicalA: RuleDefinition = {
      ...selectedA,
      version: '2.0.0',
      ruleSetId: 'archive',
      relations: { conflictsWith: ['RULE-B'] },
    };

    const result = runInterpretation(snapshot(), registry([selectedA, historicalA, selectedB]));

    expect(result.executionPlan.orderedRuleRefs.map((ref) => `${ref.id}@${ref.version}`)).toEqual([
      'RULE-A@1.0.0',
      'RULE-B@1.0.0',
    ]);
    expect(result.claims).toHaveLength(2);
    expect(result.claimRelations.filter((relation) => relation.relation === 'contradicts')).toHaveLength(0);
    expect(result.integrity.valid).toBe(true);
  });

  test('execution completeness attributes failures to the selected exact rule version', () => {
    const selected = activeRule('RULE-A', 'CLAIM-A');
    const failingSelected: RuleDefinition = {
      ...selected,
      condition: {
        op: 'gt',
        left: { kind: 'input', key: 'day' },
        right: { kind: 'literal', value: 1 },
      },
    };
    const historical: RuleDefinition = {
      ...selected,
      version: '2.0.0',
      ruleSetId: 'archive',
    };

    const result = runInterpretation(snapshot(), registry([failingSelected, historical]));

    expect(result.evaluations[0]?.status).toBe('error');
    expect(result.run.completeness.blockedCoreGroups).toEqual(['runtime']);
    expect(result.run.completeness.completedCoreGroups).toEqual([]);
    expect(result.run.status).toBe('partial');
  });
});
