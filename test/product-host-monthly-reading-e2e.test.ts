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
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-monthly-narrative-profiles.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../src/research/general-monthly-reading-candidate.js';

const SEPTEMBER_NOW = new Date('2026-09-03T13:00:00.000Z');
const OCTOBER_NOW = new Date('2026-10-03T13:00:00.000Z');
const CALCULATION_NOW = new Date('2026-09-03T13:00:00.000Z');
const INTERPRETATION_NOW = new Date('2026-09-03T13:01:00.000Z');
const NARRATIVE_NOW = new Date('2026-09-03T13:02:00.000Z');
const ARTIFACT_NOW = new Date('2026-09-03T13:03:00.000Z');

const NARRATIVE_POLICY: NarrativePolicy = {
  policyId: 'myeongha-monthly-product-host-e2e',
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
    modelRevision: 'monthly-product-host-e2e',
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

function createMonthlyHost(now: Date) {
  const adapter = new ProviderFailureAdapter();
  const registry = createGeneralMonthlyReadingCandidateRegistry(INTERPRETATION_NOW.toISOString());
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
        throw new Error('monthly Product Host E2E requires request-scoped temporal facts');
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
      readingVersion: 'myeongha-monthly-product-host-e2e-v1',
      claimNarrativeProfiles: GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
      narrativeNow: NARRATIVE_NOW,
      artifactGeneratedAt: ARTIFACT_NOW,
    },
    requestIdFactory: () => 'monthly-product-e2e',
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
    reading: { text: '이번 달 운세' },
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
    throw new Error('monthly Product Host E2E capture is incomplete');
  }
  return {
    snapshot: captured.snapshot,
    registry: captured.registry,
    interpretation: captured.interpretation,
    requestContext: captured.requestContext,
  };
}

describe('Product Host monthly reading end-to-end', () => {
  it('delivers both solar-term-aware monthly phases through the consumer transport response', async () => {
    const { host, adapter, captured, registry } = createMonthlyHost(SEPTEMBER_NOW);
    const result = await host.requestReading(requestBody());
    const observed = requireCaptured(captured);

    expect(result.state).toBe('delivered_with_fallback');
    expect(result.messageCode).toBe('READING_DELIVERED_WITH_GROUNDED_FALLBACK');
    expect(result.requiredAction).toBe('none');
    expect(result.reading?.brand).toEqual({ brandId: 'myeonghwa', displayName: '명화' });
    expect(adapter.calls).toHaveLength(1);

    expect(observed.requestContext.readingRequest.intent).toEqual({
      domain: 'general',
      temporalScope: 'monthly',
    });
    expect(observed.requestContext.readingRequest.targetPeriod).toMatchObject({
      scope: 'monthly',
      year: 2026,
      month: 9,
      timeZone: 'Asia/Seoul',
      referenceDateTime: SEPTEMBER_NOW.toISOString(),
      resolution: 'relative_current',
    });
    expect(observed.requestContext.temporalFacts).toMatchObject({
      schemaVersion: 'myeongha-monthly-interpretation-facts-v1',
      policyId: 'myeongha-monthly-interpretation-policy-v1',
      scope: 'monthly',
      targetYear: 2026,
      targetMonth: 9,
      segmentSemantics: 'half_open_start_inclusive_end_exclusive',
      jeolBoundary: { name: '백로', hanja: '白露' },
      segmentsById: {
        before_jeol: { segmentId: 'before_jeol', monthlyPillar: { stem: '병', branch: '신' } },
        after_jeol: { segmentId: 'after_jeol', monthlyPillar: { stem: '정', branch: '유' } },
      },
    });

    const activeThemes = observed.interpretation.claims.filter(
      (claim) =>
        claim.state === 'active' && claim.claimType === 'GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION',
    );
    expect(activeThemes).toHaveLength(2);
    expect(
      activeThemes.map((claim) => (claim.value as { segmentId: string }).segmentId).sort(),
    ).toEqual(['after_jeol', 'before_jeol']);

    const text = responseText(result);
    expect(text).toContain('이번 달 절입 전 구간');
    expect(text).toContain('이번 달 절입 이후 구간');
    expect(text).toContain('특정 사건이나 결과를 확정하지 않습니다');
    for (const forbidden of [
      '무조건',
      '반드시',
      '100%',
      '사고가 난다',
      '병에 걸린다',
      '이별한다',
      '파산한다',
      '당첨된다',
      '승진한다',
      '결혼한다',
    ]) {
      expect(text).not.toContain(forbidden);
    }
    expect(JSON.stringify(result)).not.toContain('GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION');
    expect(JSON.stringify(result)).not.toContain('RULE-GENERAL-MONTHLY-T9');

    expect(registry.pack.status).toBe('research');
    const preparation = prepareProductReading(
      observed.snapshot,
      observed.interpretation,
      observed.registry,
      {
        requestId: 'host_monthly-product-e2e',
        text: '이번 달 운세',
        referenceDateTime: SEPTEMBER_NOW.toISOString(),
      },
      {
        narrativePolicyRef: { id: NARRATIVE_POLICY.policyId, version: NARRATIVE_POLICY.version },
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      },
    );
    expect(preparation.state).toBe('ready_for_narrative');
    expect(preparation.composition?.selection.profileAuthorization.state).toBe('authorized');
    expect(preparation.composition?.selection.constraints.mayPromoteResearchAuthority).toBe(false);
  });

  it('is deterministic for the same birth and request-scoped month', async () => {
    const first = createMonthlyHost(SEPTEMBER_NOW);
    const second = createMonthlyHost(SEPTEMBER_NOW);

    const firstResult = await first.host.requestReading(requestBody());
    const secondResult = await second.host.requestReading(requestBody());

    expect(secondResult).toEqual(firstResult);
    expect(second.adapter.calls).toHaveLength(1);
    expect(first.adapter.calls).toHaveLength(1);
  });

  it('changes the actual consumer reading when 이번 달 resolves to the adjacent civil month', async () => {
    const september = createMonthlyHost(SEPTEMBER_NOW);
    const october = createMonthlyHost(OCTOBER_NOW);

    const septemberResult = await september.host.requestReading(requestBody());
    const octoberResult = await october.host.requestReading(requestBody());
    const septemberCapture = requireCaptured(september.captured);
    const octoberCapture = requireCaptured(october.captured);

    expect(septemberCapture.requestContext.readingRequest.targetPeriod).toMatchObject({ month: 9 });
    expect(octoberCapture.requestContext.readingRequest.targetPeriod).toMatchObject({ month: 10 });
    expect(octoberCapture.requestContext.temporalFacts).toMatchObject({
      targetMonth: 10,
      jeolBoundary: { name: '한로', hanja: '寒露' },
    });
    expect(responseText(octoberResult)).not.toBe(responseText(septemberResult));
    expect(octoberResult.responseId).not.toBe(septemberResult.responseId);
  });

  it('remains usable with unknown birth time while preserving both monthly phase themes', async () => {
    const { host, captured } = createMonthlyHost(SEPTEMBER_NOW);
    const result = await host.requestReading(requestBody(null));
    const observed = requireCaptured(captured);

    expect(result.state).toBe('delivered_with_fallback');
    expect(result.reading?.subject.birthInputDisplay.timeKnown).toBe(false);
    expect(result.reading?.subject.calculationState).toBe('partially_ambiguous');
    expect(responseText(result)).toContain('이번 달 절입 전 구간');
    expect(responseText(result)).toContain('이번 달 절입 이후 구간');

    const activeThemes = observed.interpretation.claims.filter(
      (claim) =>
        claim.state === 'active' && claim.claimType === 'GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION',
    );
    const hourTensions = observed.interpretation.claims.filter(
      (claim) =>
        claim.state === 'active' &&
        claim.claimType === 'GENERAL_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION' &&
        (claim.value as { natalPillar?: string }).natalPillar === 'hour',
    );
    expect(activeThemes).toHaveLength(2);
    expect(hourTensions).toHaveLength(0);
  });
});
