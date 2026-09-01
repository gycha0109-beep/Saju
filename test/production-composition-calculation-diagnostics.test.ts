import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  createRuleRegistrySnapshot,
  type CompiledNarrativePrompt,
  type InterpretationPack,
  type NarrativeModelAdapter,
  type NarrativePolicy,
  type ReviewerTrustContext,
} from '../src/index.js';
import {
  createAuthorizedMyeonghwaProductionHost,
  type ProductionCalculationSensitivityObservation,
} from '../src/production-runtime.js';

const FIXED_NOW = new Date('2026-09-01T00:00:00.000Z');

const productionPack: InterpretationPack = {
  packId: 'PACK-PRODUCTION-CALCULATION-DIAGNOSTICS-EMPTY',
  version: '1.0.0-test',
  name: 'Production calculation diagnostics empty fixture',
  methodologyRefs: [],
  enabledRuleSets: [],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-PRODUCTION-CALCULATION-DIAGNOSTICS-EMPTY',
    version: '1.0.0-test',
  },
  status: 'production',
};

const registry = createRuleRegistrySnapshot(
  { rules: [], methodologies: [], sources: [], reviewAttestations: [] },
  productionPack,
);

const reviewerTrustContext: ReviewerTrustContext = {
  policyId: 'TRUST-PRODUCTION-CALCULATION-DIAGNOSTICS-EMPTY',
  version: '1.0.0-test',
  grants: [],
};

class TestNarrativeAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'test-model',
    modelRevision: 'production-calculation-diagnostics',
  } as const;

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

const narrativePolicy: NarrativePolicy = {
  policyId: 'myeonghwa-production-calculation-diagnostics-test',
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

function createHost(
  observer: (observation: ProductionCalculationSensitivityObservation) => void | Promise<void>,
) {
  return createAuthorizedMyeonghwaProductionHost({
    registry,
    reviewerTrustContext,
    adapter: new TestNarrativeAdapter(),
    narrativePolicy,
    readingOptions: {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'myeonghwa-production-calculation-diagnostics-reading-v1-test',
      narrativeNow: FIXED_NOW,
      artifactGeneratedAt: FIXED_NOW,
    },
    calculationOptions: { now: FIXED_NOW },
    calculationSensitivityObserver: observer,
    requestIdFactory: () => 'production-calculation-diagnostics-test',
  });
}

const requestBody = {
  birth: {
    calendarType: 'solar',
    date: '2024-03-10',
    time: '23:30',
    sex: 'unspecified',
  },
  reading: { text: '직업운' },
} as const;

describe('production composition calculation diagnostics', () => {
  it('emits bounded sensitivity metadata through an internal observer without changing the consumer response', async () => {
    const observations: ProductionCalculationSensitivityObservation[] = [];
    const host = createHost((observation) => observations.push(observation));

    const response = await host.requestReading(requestBody);

    expect(observations).toHaveLength(1);
    const observation = observations[0];
    expect(observation?.requestId).toBe('host_production-calculation-diagnostics-test');
    expect(observation?.diagnostic.authority.calculationPolicyId).toBe(
      'myeonghwa-production-civil-midnight-v1',
    );
    expect(observation?.diagnostic.materiallySensitive).toBe(true);
    expect(observation?.diagnostic.materialAffectedPaths).toContain('pillars.day');
    expect(observation?.diagnostic.materialAffectedPaths).toContain('pillars.hour');
    expect(
      observation?.diagnostic.cases.every(
        (candidate) =>
          candidate.productionDefaultAuthorized === false &&
          !('snapshot' in candidate) &&
          !('policy' in candidate) &&
          !('rank' in candidate) &&
          !('accuracyScore' in candidate),
      ),
    ).toBe(true);
    expect(JSON.stringify(response)).not.toContain('calculationSensitivity');
    expect(JSON.stringify(response)).not.toContain('diagnosticVersion');
    expect(JSON.stringify(response)).not.toContain('civil-jasi-sensitivity-v1');
  });

  it('isolates observer failures from the consumer reading result', async () => {
    const baseline = await createHost(() => undefined).requestReading(requestBody);
    const withFailure = await createHost(() => {
      throw new Error('diagnostic sink unavailable');
    }).requestReading(requestBody);

    expect(withFailure).toEqual(baseline);
  });
});
