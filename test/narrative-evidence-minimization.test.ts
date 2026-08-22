import { describe, expect, test } from 'vitest';
import {
  buildNarrativeEvidenceBundle,
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
  policyId: 'myeonghwa/narrative-minimization-test',
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
  sourceId: 'SOURCE-NARRATIVE-MIN',
  sourceType: 'internal_research',
  title: 'Narrative minimization synthetic source',
  provenanceTier: 'internal',
};

const methodology: MethodologyDefinition = {
  methodologyId: 'METHOD-NARRATIVE-MIN',
  version: '1.0.0',
  family: 'structural_balance',
  name: 'Narrative minimization synthetic methodology',
  description: 'Infrastructure test only.',
  assumptions: [],
  requiredFactTypes: ['pillars.day'],
  sourceIds: [source.sourceId],
  status: 'research',
};

const pack: InterpretationPack = {
  packId: 'PACK-NARRATIVE-MIN',
  version: '1.0.0',
  name: 'Narrative minimization pack',
  methodologyRefs: [{ id: methodology.methodologyId, version: methodology.version }],
  enabledRuleSets: ['narrative-min'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-NARRATIVE-MIN', version: '1.0.0' },
  status: 'research',
};

function quality(): RuleDefinition['quality'] {
  return {
    provenanceQuality: 'unknown',
    testCoverage: 'unit',
    methodologyStability: 'experimental',
    reviewerStatus: 'unreviewed',
  };
}

function baseRule(): RuleDefinition {
  return {
    ruleId: 'RULE-NARRATIVE-BASE',
    version: '1.0.0',
    ruleSetId: 'narrative-min',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: methodology.methodologyId, version: methodology.version },
    title: 'Base rule',
    description: 'Synthetic.',
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
      claimType: 'CLAIM-NARRATIVE-BASE',
      subject: 'base',
      predicate: 'exists',
      value: true,
    },
    sourceRefs: [{ sourceId: source.sourceId, supportType: 'implementation_reference' }],
    quality: quality(),
    status: 'research',
  };
}

function consumerRule(): RuleDefinition {
  return {
    ruleId: 'RULE-NARRATIVE-CONSUMER',
    version: '1.0.0',
    ruleSetId: 'narrative-min',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: methodology.methodologyId, version: methodology.version },
    title: 'Consumer rule',
    description: 'Synthetic.',
    inputs: [
      {
        key: 'upstream',
        source: 'interpretation_claim',
        pathOrClaimType: 'CLAIM-NARRATIVE-BASE',
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'upstream' } },
    output: {
      claimType: 'CLAIM-NARRATIVE-CONSUMER',
      subject: 'consumer',
      predicate: 'exists',
      value: true,
    },
    sourceRefs: [{ sourceId: source.sourceId, supportType: 'implementation_reference' }],
    quality: quality(),
    status: 'research',
  };
}

function fixture() {
  const snapshot = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-19T00:00:00.000Z') },
  );
  const registry = createRuleRegistrySnapshot(
    {
      rules: [baseRule(), consumerRule()],
      methodologies: [methodology],
      sources: [source],
    },
    pack,
    '2026-08-19T00:00:00.000Z',
  );
  const execution = runInterpretation(snapshot, registry);
  return { snapshot, registry, execution };
}

describe('targeted narrative evidence minimization', () => {
  test('selecting a derived claim includes its upstream dependency', () => {
    const { snapshot, registry, execution } = fixture();
    const consumer = execution.claims.find(
      (claim) => claim.claimType === 'CLAIM-NARRATIVE-CONSUMER',
    );
    const base = execution.claims.find((claim) => claim.claimType === 'CLAIM-NARRATIVE-BASE');
    if (consumer === undefined || base === undefined) throw new Error('fixture claims missing');

    const built = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
      requestId: 'consumer-target',
      purpose: 'section_reading',
      narrativePolicyVersion: 'v1',
      targetClaimIds: [consumer.claimId],
    });

    expect(new Set(built.bundle.claims.map((claim) => claim.claimId))).toEqual(
      new Set([consumer.claimId, base.claimId]),
    );
  });

  test('selecting an upstream claim does not pull downstream dependents', () => {
    const { snapshot, registry, execution } = fixture();
    const base = execution.claims.find((claim) => claim.claimType === 'CLAIM-NARRATIVE-BASE');
    if (base === undefined) throw new Error('fixture base claim missing');

    const built = buildNarrativeEvidenceBundle(snapshot, execution, registry, {
      requestId: 'base-target',
      purpose: 'section_reading',
      narrativePolicyVersion: 'v1',
      targetClaimIds: [base.claimId],
    });

    expect(built.bundle.claims.map((claim) => claim.claimId)).toEqual([base.claimId]);
  });
});
