import { describe, expect, it } from 'vitest';

import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  calculateCanonicalSajuSnapshot,
  createGeneralNatalUsefulReadingCandidateRegistry,
  runInterpretation,
  type CompiledNarrativePrompt,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';
import { createMyeonghwaProductHost } from '../src/host/product-host.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const NARRATIVE_POLICY: NarrativePolicy = {
  policyId: 'myeonghwa-general-natal-vertical-slice-test',
  version: '1.0.0-test',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: {
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

class GroundedTestAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'test-model',
    modelRevision: 'general-natal-vertical-slice',
  } as const;

  readonly calls: CompiledNarrativePrompt[] = [];

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    this.calls.push(prompt);
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

describe('General Natal product vertical slice', () => {
  it('runs birth input through the existing General Natal claim/evidence/narrative/response path', async () => {
    const adapter = new GroundedTestAdapter();
    const host = createMyeonghwaProductHost({
      calculate(input) {
        return calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
          now: new Date('2026-09-19T02:00:00.000Z'),
        });
      },
      interpret(snapshot, context) {
        const registry = createGeneralNatalUsefulReadingCandidateRegistry(
          '2026-09-19T02:01:00.000Z',
        );
        return {
          registry,
          interpretation: runInterpretation(snapshot, registry, {
            requestId: context.requestId,
            now: new Date('2026-09-19T02:01:00.000Z'),
          }),
        };
      },
      adapter,
      narrativePolicy: NARRATIVE_POLICY,
      readingOptions: {
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
        readingVersion: 'myeonghwa-general-natal-vertical-slice-test-v1',
        narrativeNow: new Date('2026-09-19T02:02:00.000Z'),
        artifactGeneratedAt: new Date('2026-09-19T02:03:00.000Z'),
      },
      requestIdFactory: () => 'general-natal-vertical-slice',
      requestNowFactory: () => new Date('2026-09-19T02:00:00.000Z'),
    });

    const response = await host.requestReading({
      birth: {
        calendarType: 'solar',
        date: '2024-03-10',
        time: '12:00',
        sex: 'unspecified',
      },
      reading: { text: '일반 사주' },
    });

    expect(response.state).toBe('delivered');
    expect(response.reading).toBeDefined();
    expect(response.reading?.calculationSummary.pillars.day.value).toBeTruthy();
    expect(response.reading?.sections.length).toBeGreaterThan(0);
    expect(adapter.calls).toHaveLength(1);

    const selectedClaims = adapter.calls[0]?.evidence.claims ?? [];
    const selectedGeneralT8 = selectedClaims.filter(
      (claim) => claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'general',
    );
    expect(selectedGeneralT8.length).toBeGreaterThanOrEqual(2);
    expect(
      selectedGeneralT8.some((claim) => claim.taxonomy.subcategory === 'self_baseline'),
    ).toBe(true);
    expect(
      selectedGeneralT8.some((claim) =>
        [
          'relationships_and_agency',
          'learning_and_support',
          'expression_and_workstyle',
          'resources_and_results',
          'responsibility_and_pressure',
        ].includes(claim.taxonomy.subcategory ?? ''),
      ),
    ).toBe(true);
    expect(
      selectedGeneralT8.some((claim) => claim.taxonomy.subcategory === 'scope_guard'),
    ).toBe(true);
  });

  it('keeps the candidate registry outside production authority while exercising the shared runtime', () => {
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
    expect(registry.pack.status).toBe('research');
    expect(registry.pack.packId).toBe('PACK-GENERAL-NATAL-USEFUL-READING-CANDIDATE');
  });
});
