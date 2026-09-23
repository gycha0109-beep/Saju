import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  executeProductReading,
  runInterpretation,
  type CanonicalSajuSnapshot,
  type CompiledNarrativePrompt,
  type InterpretationClaim,
  type InterpretationExecutionResult,
  type NarrativeModelAdapter,
  type NarrativePolicy,
  type TenGodChartFact,
} from '../src/index.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingIntent } from '../src/contracts/reading.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';

const NOW = '2026-09-23T08:00:00.000Z';
const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const narrativePolicy: NarrativePolicy = {
  policyId: 'myeonghwa-official-reading-consumer-cutover-test',
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
  readingVersion: 'myeonghwa-official-reading-consumer-cutover-test-v1',
  narrativeNow: new Date('2026-09-23T08:05:00.000Z'),
  artifactGeneratedAt: new Date('2026-09-23T08:06:00.000Z'),
} as const;

interface DomainCase {
  label: string;
  inputText: string;
  intent: ReadingIntent;
  createRegistry: (createdAt: string) => ResolvedRuleRegistrySnapshot;
  useFiveFamilyTenGods: boolean;
  expectedTextAuthority: 'general_structural' | 'explicit_projection' | 'claim_owned';
}

const DOMAIN_CASES: readonly DomainCase[] = [
  {
    label: 'general',
    inputText: '사주',
    intent: { domain: 'general', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: false,
    expectedTextAuthority: 'general_structural',
  },
  {
    label: 'career',
    inputText: '직업운',
    intent: { domain: 'career', temporalScope: 'natal' },
    createRegistry: createCareerNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    expectedTextAuthority: 'explicit_projection',
  },
  {
    label: 'wealth',
    inputText: '재물운',
    intent: { domain: 'wealth', temporalScope: 'natal' },
    createRegistry: createWealthNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    expectedTextAuthority: 'claim_owned',
  },
  {
    label: 'relationship',
    inputText: '연애운',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
    createRegistry: createRelationshipNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    expectedTextAuthority: 'claim_owned',
  },
  {
    label: 'business',
    inputText: '사업운',
    intent: { domain: 'business', temporalScope: 'natal' },
    createRegistry: createBusinessNatalReadingCandidateRegistry,
    useFiveFamilyTenGods: true,
    expectedTextAuthority: 'claim_owned',
  },
];

class ForbiddenNarrativeAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'official-reading-zero-model-forbidden',
  } as const;
  readonly calls: CompiledNarrativePrompt[] = [];

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<never> {
    this.calls.push(prompt);
    throw new Error('NARRATIVE_RUNTIME_MUST_NOT_BE_INVOKED_FOR_OFFICIAL_READING');
  }
}

class LegacyNarrativeAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'legacy-narrative-control',
  } as const;
  readonly calls: CompiledNarrativePrompt[] = [];

  constructor(private readonly providerError = false) {}

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    this.calls.push(prompt);
    if (this.providerError) throw new Error('provider unavailable');
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

function snapshot(useFiveFamilyTenGods: boolean): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date(NOW) },
  );
  if (!useFiveFamilyTenGods) return base;
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(FIVE_FAMILY_TEN_GODS),
    },
  };
}

function genericClaim(
  snapshotId: string,
  id: string,
  category: string,
  subcategory?: string,
): InterpretationClaim {
  return {
    claimId: id,
    schemaVersion: 'official-reading-consumer-cutover-generic-fixture-v1',
    snapshotId,
    taxonomy: {
      tier: 'T8',
      category,
      ...(subcategory === undefined ? {} : { subcategory }),
    },
    claimType: `CLAIM-${id}`,
    subject: category,
    predicate: 'consumer_cutover_generic_fixture',
    value: { fixture: id },
    methodologyRef: { id: 'METHOD-CONSUMER-CUTOVER-TEST', version: '1.0.0-test' },
    ruleRefs: [{ ruleId: `RULE-${id}`, version: '1.0.0-test', evaluationId: `eval-${id}` }],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function executionWithClaims(
  currentSnapshot: CanonicalSajuSnapshot,
  registry: ResolvedRuleRegistrySnapshot,
  claims: readonly InterpretationClaim[],
): InterpretationExecutionResult {
  const base = runInterpretation(currentSnapshot, registry, {
    requestId: 'official-reading-consumer-cutover-generic-interpretation',
    now: new Date(NOW),
  });
  return {
    ...base,
    claims,
    claimRelations: [],
    integrity: { valid: true, errors: [] },
    evidenceIndex: {},
  };
}

function visibleCanonicalMeanings(
  execution: Awaited<ReturnType<typeof executeProductReading>>,
): readonly string[] {
  return (execution.canonicalSemantics?.units ?? []).flatMap((unit) => {
    if (unit.role !== 'primary') return [];
    return [unit.canonicalText?.headline, unit.canonicalText?.summary].filter(
      (value): value is string => value !== undefined && value.trim().length > 0,
    );
  });
}

describe('Preview Official Reading consumer authority cutover', () => {
  it.each(DOMAIN_CASES)(
    '$label delivers Official Reading with zero Narrative model calls',
    async (candidate) => {
      const currentSnapshot = snapshot(candidate.useFiveFamilyTenGods);
      const registry = candidate.createRegistry(NOW);
      const interpretation = runInterpretation(currentSnapshot, registry, {
        requestId: `official-cutover-${candidate.label}-interpretation`,
        now: new Date(NOW),
      });
      const adapter = new ForbiddenNarrativeAdapter();

      const execution = await executeProductReading(
        currentSnapshot,
        interpretation,
        registry,
        { requestId: `official-cutover-${candidate.label}`, text: candidate.inputText },
        adapter,
        narrativePolicy,
        executionOptions,
      );
      const delivery = buildProductReadingDelivery(execution);
      const response = buildProductReadingResponse(delivery);

      expect(execution.preparation.normalization.request?.intent).toEqual(candidate.intent);
      expect(execution.consumerReadingAuthority?.authority).toBe('official_reading');
      expect(execution.state).toBe('completed');
      expect(execution.officialReadingReport).toBeDefined();
      expect(execution.artifact?.schemaVersion).toBe('myeonghwa-official-reading-artifact-v1');
      expect(execution.artifact?.readingId).toMatch(/^official_reading_/u);
      expect(execution.narrative).toBeUndefined();
      expect(execution.modelCalls).toBe(0);
      expect(adapter.calls).toHaveLength(0);
      expect(execution.reasonCodes).toEqual([]);
      expect(execution.constraints.mayInvokeNarrativeForOfficialReadingAuthority).toBe(false);
      expect(
        execution.constraints.mayAssembleLegacyNarrativeArtifactWithoutGroundedNarrative,
      ).toBe(false);

      expect(delivery.state).toBe('delivered');
      expect(delivery.messageCode).toBe('READING_DELIVERED');
      expect(delivery.artifact?.readingId).toBe(execution.artifact?.readingId);

      expect(response.state).toBe('delivered');
      expect(response.reading?.readingId).toBe(execution.artifact?.readingId);
      const responseJson = JSON.stringify(response);

      const meanings = visibleCanonicalMeanings(execution);
      expect(meanings.length).toBeGreaterThan(0);
      for (const meaning of meanings) expect(responseJson).toContain(meaning);

      expect(execution.officialReadingReport?.sourceSemanticHash).toBe(
        execution.canonicalSemantics?.semanticHash,
      );
      expect(execution.officialReadingReport?.sourcePlanHash).toBe(
        execution.officialReadingPlan?.planHash,
      );

      const provenance = execution.artifact?.provenance as
        | {
            canonicalSemanticHash?: string;
            officialReadingPlanHash?: string;
            officialReadingReportId?: string;
            officialReadingReportHash?: string;
            contentAuthority?: string;
          }
        | undefined;
      expect(provenance?.canonicalSemanticHash).toBe(execution.canonicalSemantics?.semanticHash);
      expect(provenance?.officialReadingPlanHash).toBe(execution.officialReadingPlan?.planHash);
      expect(provenance?.officialReadingReportId).toBe(execution.officialReadingReport?.reportId);
      expect(provenance?.officialReadingReportHash).toBe(execution.officialReadingReport?.reportHash);
      expect(provenance?.contentAuthority).toBe('official_reading');

      for (const internalToken of [
        execution.canonicalSemantics?.semanticHash,
        execution.officialReadingPlan?.planHash,
        execution.officialReadingReport?.reportId,
        execution.officialReadingReport?.reportHash,
      ]) {
        if (internalToken !== undefined) expect(responseJson).not.toContain(internalToken);
      }

      if (candidate.expectedTextAuthority === 'general_structural') {
        expect(responseJson).toContain('월지는 명식을 읽을 때 중요한 구조축으로 보되');
      }
      if (candidate.expectedTextAuthority === 'explicit_projection') {
        expect(
          execution.canonicalSemantics?.units.some(
            (unit) => unit.canonicalTextProvenance?.researchId === 'CAREER_NATAL_READING_CANDIDATE',
          ),
        ).toBe(true);
      }
      if (candidate.expectedTextAuthority === 'claim_owned') {
        expect(
          execution.canonicalSemantics?.units
            .filter((unit) => unit.role === 'primary' && unit.canonicalText !== undefined)
            .every((unit) => unit.canonicalTextProvenance === undefined),
        ).toBe(true);
      }
    },
  );

  it('keeps Official delivery independent from a Narrative adapter that would fail if invoked', async () => {
    const currentSnapshot = snapshot(true);
    const registry = createCareerNatalReadingCandidateRegistry(NOW);
    const interpretation = runInterpretation(currentSnapshot, registry, {
      requestId: 'official-zero-model-career-interpretation',
      now: new Date(NOW),
    });
    const adapter = new ForbiddenNarrativeAdapter();

    const execution = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'official-zero-model-career', text: '직업운' },
      adapter,
      narrativePolicy,
      executionOptions,
    );
    const delivery = buildProductReadingDelivery(execution);
    const response = buildProductReadingResponse(delivery);

    expect(execution.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(execution.narrative).toBeUndefined();
    expect(execution.modelCalls).toBe(0);
    expect(adapter.calls).toHaveLength(0);
    expect(execution.reasonCodes).toEqual([]);
    expect(execution.state).toBe('completed');
    expect(execution.artifact?.schemaVersion).toBe('myeonghwa-official-reading-artifact-v1');
    expect(delivery.state).toBe('delivered');
    expect(delivery.messageCode).toBe('READING_DELIVERED');
    expect(response.state).toBe('delivered');
    expect(response.messageCode).toBe('READING_DELIVERED');
  });

  it('fails closed before model invocation when Official authority has no renderable Official report', async () => {
    const currentSnapshot = snapshot(false);
    const registry = createI7SeasonalSupportRegistry();
    const career = genericClaim(
      currentSnapshot.snapshotId,
      'claim-career-without-official-text',
      'career',
    );
    const interpretation = executionWithClaims(currentSnapshot, registry, [career]);
    const adapter = new ForbiddenNarrativeAdapter();

    const execution = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'official-cutover-unrenderable', text: '직업운' },
      adapter,
      narrativePolicy,
      executionOptions,
    );
    const delivery = buildProductReadingDelivery(execution);
    const response = buildProductReadingResponse(delivery);

    expect(execution.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(execution.officialReadingReport).toBeUndefined();
    expect(execution.state).toBe('invariant_blocked');
    expect(execution.reasonCodes).toContain(
      'OFFICIAL_READING_REPORT_REQUIRED_FOR_CONSUMER_AUTHORITY',
    );
    expect(execution.modelCalls).toBe(0);
    expect(adapter.calls).toHaveLength(0);
    expect(execution.narrative).toBeUndefined();
    expect(execution.artifact).toBeUndefined();
    expect(execution.constraints.mayFallbackOfficialReadingToLegacyNarrative).toBe(false);
    expect(execution.constraints.mayUseNarrativeAsOfficialReadingAuthority).toBe(false);
    expect(delivery.state).toBe('temporarily_unavailable');
    expect(delivery.artifact).toBeUndefined();
    expect(response.state).toBe('temporarily_unavailable');
    expect(response.reading).toBeUndefined();
  });

  it('preserves legacy Narrative fallback semantics outside the approved Official surface', async () => {
    const currentSnapshot = snapshot(false);
    const registry = createI7SeasonalSupportRegistry();
    const parents = genericClaim(
      currentSnapshot.snapshotId,
      'claim-family-parents-legacy-fallback',
      'family',
      'parents',
    );
    const interpretation = executionWithClaims(currentSnapshot, registry, [parents]);

    const execution = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      { requestId: 'legacy-family-fallback', text: '부모운' },
      new LegacyNarrativeAdapter(true),
      narrativePolicy,
      executionOptions,
    );
    const delivery = buildProductReadingDelivery(execution);

    expect(execution.consumerReadingAuthority?.authority).toBe('legacy_narrative');
    expect(execution.state).toBe('completed_with_fallback');
    expect(execution.artifact?.schemaVersion).toBe('myeonghwa-reading-artifact-v1');
    expect(execution.artifact?.status).toBe('narrative_fallback');
    expect(delivery.state).toBe('delivered_with_fallback');
    expect(delivery.messageCode).toBe('READING_DELIVERED_WITH_GROUNDED_FALLBACK');
  });
});
