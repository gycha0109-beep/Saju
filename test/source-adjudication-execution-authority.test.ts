import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../src/contracts/interpretation.js';
import {
  ExecutionPlanError,
  buildInterpretationExecutionPlan,
  buildInterpretationExecutionPlanWithAuthority,
} from '../src/interpretation/execution-plan.js';
import {
  SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
  runInterpretation,
} from '../src/interpretation/interpretation-engine.js';
import {
  buildSourceAdjudicationExecutionAuthorityRef,
  type InterpretationPromotionAuthorityContext,
  type SourceAdjudicationExecutionAuthorityMaterial,
} from '../src/interpretation/promotion-authority.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/source-adjudication-execution-test',
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
  sourceId: 'SOURCE-SA-STAGING',
  sourceType: 'web',
  title: 'Synthetic source-adjudication staging source',
  provenanceTier: 'cross_reference',
};

function methodology(status: MethodologyDefinition['status'] = 'reviewed'): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-SA-STAGING',
    version: '1.0.0',
    family: 'structural_balance',
    name: 'Synthetic source-adjudication staging methodology',
    description: 'Test-only methodology.',
    assumptions: [],
    requiredFactTypes: ['pillars.day'],
    sourceIds: [source.sourceId],
    status,
  };
}

function rule(
  method: MethodologyDefinition,
  overrides: Partial<Pick<RuleDefinition, 'status' | 'quality'>> = {},
): RuleDefinition {
  return {
    ruleId: 'RULE-SA-STAGING',
    version: '1.0.0',
    ruleSetId: 'sa-staging',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: method.methodologyId, version: method.version },
    title: 'Synthetic source-adjudication staging rule',
    description: 'Test-only rule.',
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
      claimType: 'CLAIM-SA-STAGING',
      subject: 'synthetic',
      predicate: 'source_adjudication_staging',
      value: true,
      polarity: 'neutral',
    },
    sourceRefs: [
      {
        sourceId: source.sourceId,
        supportType: 'direct_basis',
      },
    ],
    quality:
      overrides.quality ?? {
        provenanceQuality: 'unknown',
        testCoverage: 'regression_suite',
        methodologyStability: 'stable_within_method',
        reviewerStatus: 'unreviewed',
      },
    status: overrides.status ?? 'reviewed',
  };
}

function pack(
  method: MethodologyDefinition,
  status: InterpretationPack['status'] = 'staging',
): InterpretationPack {
  return {
    packId: 'PACK-SA-STAGING',
    version: '1.0.0',
    name: 'Synthetic source-adjudication staging pack',
    methodologyRefs: [{ id: method.methodologyId, version: method.version }],
    enabledRuleSets: ['sa-staging'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: { id: 'COMPOSITION-SA-STAGING', version: '1.0.0' },
    status,
  };
}

function registry(options: {
  packStatus?: InterpretationPack['status'];
  methodStatus?: MethodologyDefinition['status'];
  ruleStatus?: RuleDefinition['status'];
  quality?: RuleDefinition['quality'];
  ruleDescription?: string;
} = {}) {
  const method = methodology(options.methodStatus);
  const candidateRule = {
    ...rule(method, {
      ...(options.ruleStatus === undefined ? {} : { status: options.ruleStatus }),
      ...(options.quality === undefined ? {} : { quality: options.quality }),
    }),
    ...(options.ruleDescription === undefined
      ? {}
      : { description: options.ruleDescription }),
  };
  return createRuleRegistrySnapshot(
    {
      rules: [candidateRule],
      methodologies: [method],
      sources: [source],
    },
    pack(method, options.packStatus),
    '2026-09-28T00:00:00.000Z',
  );
}

function contentRef(id: string, version: string, material: unknown) {
  return {
    id,
    version,
    contentHash: deterministicContentHash(material),
  } as const;
}

function authorityContext(
  selectedRegistry: ReturnType<typeof registry>,
): InterpretationPromotionAuthorityContext {
  const material: SourceAdjudicationExecutionAuthorityMaterial = {
    authorityClass: 'source_adjudication',
    lifecycleTarget: 'staging',
    capabilityKey: 'synthetic:staging',
    policyRef: contentRef('POLICY-SA-STAGING', '1.0.0', { policy: 'staging-only' }),
    candidateRef: contentRef('CANDIDATE-SA-STAGING', '1.0.0', {
      candidate: selectedRegistry.snapshot.registrySnapshotId,
    }),
    decisionRef: contentRef('DECISION-SA-STAGING', '1.0.0', {
      decision: 'approved',
      candidate: selectedRegistry.snapshot.registrySnapshotId,
    }),
    authorizedRegistrySnapshotId: selectedRegistry.snapshot.registrySnapshotId,
    authorizedPackRef: selectedRegistry.snapshot.packRef,
    sourceAdjudicationAuthorityEstablished: true,
    productionAuthorityAuthorized: false,
  };
  const authorityRef = buildSourceAdjudicationExecutionAuthorityRef(
    'AUTHORITY-SA-STAGING',
    '1.0.0',
    material,
  );
  return {
    mode: 'source_adjudication',
    sourceAdjudicationAuthority: {
      authorityRef,
      material,
    },
  };
}

function knownSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-09-28T00:00:00.000Z') },
  );
}

function expectPlanError(action: () => unknown, code: ExecutionPlanError['code']) {
  try {
    action();
    throw new Error('Expected execution-plan failure.');
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe(code);
  }
}

describe('source-adjudication staging execution authority', () => {
  test('legacy planner still requires reviewer trust for staging', () => {
    const selected = registry();
    expectPlanError(
      () => buildInterpretationExecutionPlan(selected),
      'REVIEWER_TRUST_CONTEXT_REQUIRED',
    );
  });

  test('exact source-adjudication authority permits staging without fabricating reviewer/provenance metadata', () => {
    const selected = registry();
    const context = authorityContext(selected);
    const plan = buildInterpretationExecutionPlanWithAuthority(selected, context);

    expect(plan.orderedRuleRefs).toHaveLength(1);
    expect(plan.reviewerTrustPolicyRef).toBeUndefined();
    expect(plan.sourceAdjudicationAuthorityRef).toEqual(
      context.mode === 'source_adjudication'
        ? context.sourceAdjudicationAuthority.authorityRef
        : undefined,
    );
    expect(selected.rules[0]?.quality.reviewerStatus).toBe('unreviewed');
    expect(selected.rules[0]?.quality.provenanceQuality).toBe('unknown');
    expect(selected.rules[0]?.status).toBe('reviewed');
    expect(selected.methodologies[0]?.status).toBe('reviewed');
  });

  test('source-adjudication staging still requires staging-grade test coverage', () => {
    const selected = registry({
      quality: {
        provenanceQuality: 'unknown',
        testCoverage: 'none',
        methodologyStability: 'stable_within_method',
        reviewerStatus: 'unreviewed',
      },
    });
    expectPlanError(
      () => buildInterpretationExecutionPlanWithAuthority(selected, authorityContext(selected)),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('source-adjudication cannot authorize Production', () => {
    const selected = registry({
      packStatus: 'production',
      methodStatus: 'active',
      ruleStatus: 'active',
    });
    expectPlanError(
      () => buildInterpretationExecutionPlanWithAuthority(selected, authorityContext(selected)),
      'SOURCE_ADJUDICATION_NOT_AUTHORIZED_FOR_PRODUCTION',
    );
  });

  test('authority content-hash drift fails closed', () => {
    const selected = registry();
    const context = authorityContext(selected);
    if (context.mode !== 'source_adjudication') throw new Error('unexpected authority mode');
    const drifted: InterpretationPromotionAuthorityContext = {
      mode: 'source_adjudication',
      sourceAdjudicationAuthority: {
        ...context.sourceAdjudicationAuthority,
        authorityRef: {
          ...context.sourceAdjudicationAuthority.authorityRef,
          contentHash: '0'.repeat(64),
        },
      },
    };
    expectPlanError(
      () => buildInterpretationExecutionPlanWithAuthority(selected, drifted),
      'SOURCE_ADJUDICATION_AUTHORITY_INVALID',
    );
  });

  test('authority bound to a different registry snapshot fails closed', () => {
    const selected = registry();
    const changed = registry({ ruleDescription: 'Changed after authority binding.' });
    expectPlanError(
      () => buildInterpretationExecutionPlanWithAuthority(changed, authorityContext(selected)),
      'SOURCE_ADJUDICATION_AUTHORITY_INVALID',
    );
  });

  test('source-adjudication authority cannot be applied to a research pack', () => {
    const selected = registry({ packStatus: 'research', methodStatus: 'research', ruleStatus: 'research' });
    expectPlanError(
      () => buildInterpretationExecutionPlanWithAuthority(selected, authorityContext(selected)),
      'SOURCE_ADJUDICATION_AUTHORITY_INVALID',
    );
  });

  test('run identity records the exact source-adjudication authority and remains deterministic', () => {
    const selected = registry();
    const context = authorityContext(selected);
    const first = runInterpretation(knownSnapshot(), selected, {
      promotionAuthorityContext: context,
      now: new Date('2026-09-28T01:00:00.000Z'),
    });
    const second = runInterpretation(knownSnapshot(), selected, {
      promotionAuthorityContext: context,
      now: new Date('2026-09-28T02:00:00.000Z'),
    });

    expect(first.run.status).toBe('completed');
    expect(first.run.authorizationPolicyVersion).toBe(
      SOURCE_ADJUDICATION_STAGING_AUTHORIZATION_POLICY_VERSION,
    );
    expect(first.executionPlan.sourceAdjudicationAuthorityRef).toEqual(
      first.run.sourceAdjudicationAuthorityRef,
    );
    expect(first.run.sourceAdjudicationAuthorityRef).toEqual(
      context.mode === 'source_adjudication'
        ? context.sourceAdjudicationAuthority.authorityRef
        : undefined,
    );
    expect(first.run.runHash).toBe(second.run.runHash);
    expect(first.run.interpretationRunId).toBe(second.run.interpretationRunId);
    expect(first.run.startedAt).not.toBe(second.run.startedAt);
  });
});
