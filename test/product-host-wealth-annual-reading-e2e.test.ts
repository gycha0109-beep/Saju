import { describe, expect, it } from 'vitest';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  type CompiledNarrativePrompt,
  type NarrativeModelAdapter,
  type NarrativePolicy,
} from '../src/index.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { InterpretationExecutionResult } from '../src/interpretation/interpretation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import {
  createMyeonghwaProductHost,
  type ProductHostInterpretationRequestContext,
} from '../src/host/product-host.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/wealth-annual-narrative-profiles.js';
import {
  WEALTH_ANNUAL_THEME_CLAIM_TYPE,
  createWealthAnnualReadingCandidateRegistry,
} from '../src/research/wealth-annual-reading-candidate.js';
import { WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/wealth-natal-narrative-profiles.js';

const YEAR_2026_NOW = new Date('2026-09-04T01:00:00.000Z');
const YEAR_2027_NOW = new Date('2027-09-04T01:00:00.000Z');
const CALCULATION_NOW = new Date('2026-09-04T01:00:00.000Z');
const INTERPRETATION_NOW = new Date('2026-09-04T01:01:00.000Z');
const NARRATIVE_NOW = new Date('2026-09-04T01:02:00.000Z');
const ARTIFACT_NOW = new Date('2026-09-04T01:03:00.000Z');

const NARRATIVE_POLICY: NarrativePolicy = {
  policyId: 'myeongha-wealth-annual-product-host-e2e',
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

class ProviderFailureAdapter implements NarrativeModelAdapter {
  readonly metadata = {
    provider: 'test-provider',
    modelId: 'forced-fallback',
    modelRevision: 'wealth-annual-product-host-e2e',
  } as const;

  readonly calls: CompiledNarrativePrompt[] = [];

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<never> {
    this.calls.push(prompt);
    throw new Error('intentional test provider failure');
  }
}

interface CapturedExecution {
  snapshot?: CanonicalSajuSnapshot;
  registry?: ResolvedRuleRegistrySnapshot;
  interpretation?: InterpretationExecutionResult;
  requestContext?: ProductHostInterpretationRequestContext;
}

function createWealthAnnualHost(now: Date) {
  const adapter = new ProviderFailureAdapter();
  const registry = createWealthAnnualReadingCandidateRegistry(INTERPRETATION_NOW.toISOString());
  const captured: CapturedExecution = {};

  const host = createMyeonghwaProductHost({
    calculate(input) {
      const snapshot = calculateCanonicalSajuSnapshot(
        input,
        PRODUCTION_DEFAULT_CALCULATION_POLICY,
        { now: CALCULATION_NOW },
      );
      captured.snapshot = snapshot;
      return snapshot;
    },
    interpret(snapshot, context, requestContext) {
      if (requestContext === undefined) {
        throw new Error('Wealth Annual Product Host E2E requires request-scoped temporal facts');
      }
      captured.requestContext = requestContext;
      const interpretation = runInterpretation(snapshot, registry, {
        requestId: context.requestId,
        temporalFacts: requestContext.temporalFacts,
        now: INTERPRETATION_NOW,
      });
      captured.registry = registry;
      captured.interpretation = interpretation;
      return { registry, interpretation };
    },
    adapter,
    narrativePolicy: NARRATIVE_POLICY,
    readingOptions: {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'myeongha-wealth-annual-product-host-e2e-v1',
      claimNarrativeProfiles: [
        ...WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES,
        ...WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES,
      ],
      narrativeNow: NARRATIVE_NOW,
      artifactGeneratedAt: ARTIFACT_NOW,
    },
    requestIdFactory: () => 'wealth-annual-product-e2e',
    requestNowFactory: () => now,
  });

  return { host, adapter, captured, registry };
}

function requestBody(time: string | null = '09:30') {
  return {
    birth: {
      calendarType: 'solar',
      date: '1996-01-09',
      time,
      sex: 'unspecified',
    },
    reading: { text: '올해 재물운' },
  } as const;
}

function responseText(response: ProductReadingResponse): string {
  return JSON.stringify(response.reading?.sections ?? []);
}

function requireCaptured(captured: CapturedExecution) {
  if (
    captured.snapshot === undefined ||
    captured.registry === undefined ||
    captured.interpretation === undefined ||
    captured.requestContext === undefined
  ) {
    throw new Error('Wealth Annual Product Host E2E capture is incomplete');
  }
  return {
    snapshot: captured.snapshot,
    registry: captured.registry,
    interpretation: captured.interpretation,
    requestContext: captured.requestContext,
  };
}

describe('Product Host Wealth Annual reading end-to-end', () => {
  it('delivers Wealth Natal T8 plus personalized Wealth Annual T9 through the consumer response', async () => {
    const { host, adapter, captured, registry } = createWealthAnnualHost(YEAR_2026_NOW);
    const result = await host.requestReading(requestBody());
    const observed = requireCaptured(captured);

    expect(result.state).toBe('delivered_with_fallback');
    expect(result.messageCode).toBe('READING_DELIVERED_WITH_GROUNDED_FALLBACK');
    expect(result.requiredAction).toBe('none');
    expect(adapter.calls).toHaveLength(1);

    expect(observed.requestContext.readingRequest.intent).toEqual({
      domain: 'wealth',
      temporalScope: 'annual',
    });
    expect(observed.requestContext.readingRequest.targetPeriod).toMatchObject({
      scope: 'annual',
      year: 2026,
      timeZone: 'Asia/Seoul',
      referenceDateTime: YEAR_2026_NOW.toISOString(),
      resolution: 'relative_current',
    });
    expect(observed.requestContext.temporalFacts).toMatchObject({
      schemaVersion: 'myeongha-annual-interpretation-facts-v1',
      policyId: 'myeongha-annual-interpretation-policy-v1',
      scope: 'annual',
      targetYear: 2026,
      annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
    });

    expect(
      observed.interpretation.claims.some(
        (claim) =>
          claim.state === 'active' &&
          claim.taxonomy.tier === 'T8' &&
          claim.taxonomy.category === 'wealth',
      ),
    ).toBe(true);
    expect(
      observed.interpretation.claims.filter(
        (claim) => claim.state === 'active' && claim.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE,
      ),
    ).toHaveLength(1);

    const preparation = prepareProductReading(
      observed.snapshot,
      observed.interpretation,
      observed.registry,
      {
        requestId: 'host_wealth-annual-product-e2e',
        text: '올해 재물운',
        referenceDateTime: YEAR_2026_NOW.toISOString(),
      },
      {
        narrativePolicyRef: { id: NARRATIVE_POLICY.policyId, version: NARRATIVE_POLICY.version },
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      },
    );
    expect(preparation.state).toBe('ready_for_narrative');
    expect(preparation.composition?.selection.coverageState).toBe('complete');
    expect(preparation.composition?.selection.profileRef?.id).toBe(
      'myeonghwa-reading-profile-wealth-annual-v1',
    );
    expect(preparation.composition?.selection.profileAuthorization.state).toBe('authorized');
    expect(preparation.composition?.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(registry.pack.status).toBe('research');

    const text = responseText(result);
    expect(text).toContain('금융 조언을 제공하지 않습니다');
    expect(text).toContain('수입·수익·손실·투자 결과를 예측하거나');
    for (const forbidden of [
      '무조건',
      '반드시',
      '확실히',
      '100%',
      '부자가 된다',
      '돈을 많이 번다',
      '수익이 난다',
      '투자하면 성공',
      '재산이 늘어난다',
      '손실이 난다',
      '빚이 생긴다',
      '횡재한다',
      '로또에 당첨',
    ]) {
      expect(text).not.toContain(forbidden);
    }
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain('ruleId');
    expect(serialized).not.toContain('methodologyId');
    expect(serialized).not.toContain('WEALTH_ANNUAL_THEME_ACTIVATION');
    expect(serialized).not.toContain('RULE-WEALTH-ANNUAL');
    expect(serialized).not.toContain('temporal.annualStemTenGod');
  });

  it('is deterministic for the same birth and request-scoped target year', async () => {
    const first = createWealthAnnualHost(YEAR_2026_NOW);
    const second = createWealthAnnualHost(YEAR_2026_NOW);

    const firstResult = await first.host.requestReading(requestBody());
    const secondResult = await second.host.requestReading(requestBody());
    const firstObserved = requireCaptured(first.captured);
    const secondObserved = requireCaptured(second.captured);

    expect(secondResult).toEqual(firstResult);
    expect(secondObserved.snapshot.calculationHash).toBe(firstObserved.snapshot.calculationHash);
    expect(secondObserved.interpretation.run.runHash).toBe(firstObserved.interpretation.run.runHash);
    expect(second.adapter.calls).toEqual(first.adapter.calls);
  });

  it('surfaces a different annual wealth reading when 올해 resolves to another civil year', async () => {
    const first = createWealthAnnualHost(YEAR_2026_NOW);
    const second = createWealthAnnualHost(YEAR_2027_NOW);

    const firstResult = await first.host.requestReading(requestBody());
    const secondResult = await second.host.requestReading(requestBody());
    const firstObserved = requireCaptured(first.captured);
    const secondObserved = requireCaptured(second.captured);

    expect(firstObserved.requestContext.readingRequest.targetPeriod).toMatchObject({ year: 2026 });
    expect(secondObserved.requestContext.readingRequest.targetPeriod).toMatchObject({ year: 2027 });
    expect(secondObserved.requestContext.temporalFacts.annualPillar).not.toEqual(
      firstObserved.requestContext.temporalFacts.annualPillar,
    );
    expect(
      secondObserved.interpretation.claims.find(
        (claim) => claim.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE,
      )?.value,
    ).not.toEqual(
      firstObserved.interpretation.claims.find(
        (claim) => claim.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE,
      )?.value,
    );
    expect(responseText(secondResult)).not.toBe(responseText(firstResult));
    expect(secondResult.responseId).not.toBe(firstResult.responseId);
  });

  it('fails closed to partial evidence without birth hour while retaining bounded annual evidence', async () => {
    const { host, adapter, captured } = createWealthAnnualHost(YEAR_2026_NOW);
    const result = await host.requestReading(requestBody(null));
    const observed = requireCaptured(captured);

    expect(result.state).toBe('partial_evidence');
    expect(result.messageCode).toBe('READING_EVIDENCE_PARTIAL');
    expect(result.requiredAction).toBe('none');
    expect(result.coverage).toMatchObject({
      state: 'partial',
      hasAvailableEvidence: true,
    });
    expect(result.coverage?.missingRequirementCount).toBeGreaterThan(0);
    expect(result.reading).toBeUndefined();
    expect(adapter.calls).toHaveLength(0);
    expect(observed.requestContext.temporalFacts.annualBranchRelations).not.toMatchObject({
      hour: { status: 'resolved' },
    });
    expect(
      observed.interpretation.claims.some(
        (claim) => claim.state === 'active' && claim.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE,
      ),
    ).toBe(true);
    expect(
      observed.interpretation.claims.some(
        (claim) =>
          claim.state === 'active' &&
          claim.claimType === 'WEALTH_ANNUAL_BRANCH_CLASH_TENSION' &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
  });
});
