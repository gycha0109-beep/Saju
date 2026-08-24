import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  buildProductReadingDelivery,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  executeProductReading,
  runInterpretation,
  type CalculationPolicySnapshot,
  type CanonicalSajuSnapshot,
  type CompiledNarrativePrompt,
  type InterpretationClaim,
  type InterpretationExecutionResult,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/product-reading-delivery-test',
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

const narrativePolicy: NarrativePolicy = {
  policyId: 'myeonghwa-product-reading-delivery-policy',
  version: '1.0.0-test',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: { style: 'clear', avoidFatalism: true, avoidFearInduction: true },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

const executionOptions = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'myeonghwa-reading-v1-test',
} as const;

class DeliveryAdapter implements NarrativeModelAdapter {
  readonly metadata = { provider: 'test', modelId: 'delivery-test' } as const;
  constructor(private readonly fail = false) {}
  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    if (this.fail) throw new Error('provider unavailable');
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

function snapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-08-24T00:00:00.000Z') },
  );
}

function claim(
  snapshotId: string,
  id: string,
  tier: 'T8' | 'T9',
  category: string,
  subcategory?: string,
): InterpretationClaim {
  return {
    claimId: id,
    schemaVersion: 'myeonghwa-delivery-test-claim-v1',
    snapshotId,
    taxonomy: { tier, category, ...(subcategory === undefined ? {} : { subcategory }) },
    claimType: `CLAIM-${id}`,
    subject: category,
    predicate: 'delivery_fixture',
    value: { id },
    methodologyRef: { id: 'METHOD-DELIVERY-TEST', version: '1.0.0-test' },
    ruleRefs: [{ ruleId: `RULE-${id}`, version: '1.0.0-test', evaluationId: `eval-${id}` }],
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
): InterpretationExecutionResult {
  const base = runInterpretation(currentSnapshot, registry, {
    now: new Date('2026-08-24T00:05:00.000Z'),
  });
  return { ...base, claims, claimRelations: [], integrity: { valid: true, errors: [] }, evidenceIndex: {} };
}

async function execute(text: string, claims: readonly InterpretationClaim[], fail = false, targetPersonRef?: string) {
  const currentSnapshot = snapshot();
  const registry = createI7SeasonalSupportRegistry();
  const result = await executeProductReading(
    currentSnapshot,
    executionWithClaims(currentSnapshot, registry, claims),
    registry,
    {
      requestId: `delivery-${text}`,
      text,
      ...(targetPersonRef === undefined ? {} : { targetPersonRef }),
    },
    new DeliveryAdapter(fail),
    narrativePolicy,
    executionOptions,
  );
  return buildProductReadingDelivery(result);
}

describe('Product Reading Delivery Contract', () => {
  it('delivers only the existing ReadingArtifact for completed execution', async () => {
    const currentSnapshot = snapshot();
    const delivery = await execute('직업운', [claim(currentSnapshot.snapshotId, 'career-complete', 'T8', 'career')]);

    expect(delivery.state).toBe('delivered');
    expect(delivery.messageCode).toBe('READING_DELIVERED');
    expect(delivery.requiredAction).toBe('none');
    expect(delivery.artifact).toBeDefined();
    expect(delivery.coverage).toBeUndefined();
  });

  it('marks grounded deterministic fallback without treating it as new interpretation authority', async () => {
    const currentSnapshot = snapshot();
    const delivery = await execute(
      '직업운',
      [claim(currentSnapshot.snapshotId, 'career-fallback', 'T8', 'career')],
      true,
    );

    expect(delivery.state).toBe('delivered_with_fallback');
    expect(delivery.artifact?.status).toBe('narrative_fallback');
    expect(delivery.constraints.mayTreatFallbackAsNewInterpretationAuthority).toBe(false);
  });

  it('surfaces temporal ambiguity as clarification kind without inventing incomplete intent options', async () => {
    const delivery = await execute('올해 이번 달 사업운', []);

    expect(delivery.state).toBe('clarification_required');
    expect(delivery.clarification).toEqual({ kind: 'temporal_scope' });
    expect(delivery.artifact).toBeUndefined();
  });

  it('exposes complete domain clarification options without selecting a winner', async () => {
    const delivery = await execute('사업운 재물운', []);

    expect(delivery.state).toBe('clarification_required');
    expect(delivery.clarification?.kind).toBe('domain');
    expect(delivery.clarification?.options).toHaveLength(2);
    expect(delivery.constraints.mayTreatClarificationCandidateAsSelectedIntent).toBe(false);
  });

  it('maps unsupported free text to a consumer-safe diagnostic without raw reason codes', async () => {
    const delivery = await execute('요즘 왜 일이 꼬이지?', []);

    expect(delivery.state).toBe('unsupported_request');
    expect(delivery.consumerDiagnostics).toEqual(['request_not_recognized']);
    expect(JSON.stringify(delivery)).not.toContain('CONSUMER_READING_PHRASE_NOT_IN_FROZEN_GRAMMAR');
  });

  it('maps missing compatibility context to a consumer-safe validation diagnostic', async () => {
    const delivery = await execute('궁합', []);

    expect(delivery.state).toBe('invalid_request');
    expect(delivery.requiredAction).toBe('provide_required_context');
    expect(delivery.consumerDiagnostics).toEqual(['target_person_required']);
  });

  it('exposes only aggregate partial-coverage information and never internal claim or requirement ids', async () => {
    const currentSnapshot = snapshot();
    const claimId = 'claim-business-internal-id';
    const delivery = await execute('올해 사업운', [claim(currentSnapshot.snapshotId, claimId, 'T8', 'business')]);
    const serialized = JSON.stringify(delivery);

    expect(delivery.state).toBe('partial_evidence');
    expect(delivery.coverage?.state).toBe('partial');
    expect(delivery.coverage?.hasAvailableEvidence).toBe(true);
    expect(delivery.coverage?.missingRequirementCount).toBeGreaterThan(0);
    expect(serialized).not.toContain(claimId);
    expect(delivery.constraints.mayRenderCoverageAsFortuneJudgment).toBe(false);
  });

  it('keeps delivery identity deterministic for the same governed execution result', async () => {
    const currentSnapshot = snapshot();
    const claims = [claim(currentSnapshot.snapshotId, 'career-deterministic', 'T8', 'career')];
    const first = await execute('직업운', claims);
    const second = await execute('직업운', claims);

    expect(second.deliveryId).toBe(first.deliveryId);
    expect(second.audit).toEqual(first.audit);
    expect(second.constraints.mayExposeRawInternalReasonCodes).toBe(false);
  });
});
