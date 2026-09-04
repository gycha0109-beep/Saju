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
import { CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../src/research/career-monthly-narrative-profiles.js';
import {
  CAREER_MONTHLY_THEME_CLAIM_TYPE,
  createCareerMonthlyReadingCandidateRegistry,
} from '../src/research/career-monthly-reading-candidate.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/career-natal-narrative-profiles.js';

const SEPTEMBER_NOW = new Date('2026-09-03T13:00:00.000Z');
const OCTOBER_NOW = new Date('2026-10-03T13:00:00.000Z');
const CALCULATION_NOW = new Date('2026-09-03T13:00:00.000Z');
const INTERPRETATION_NOW = new Date('2026-09-03T13:01:00.000Z');
const NARRATIVE_NOW = new Date('2026-09-03T13:02:00.000Z');
const ARTIFACT_NOW = new Date('2026-09-03T13:03:00.000Z');

const NARRATIVE_POLICY: NarrativePolicy = {
  policyId: 'myeongha-career-monthly-product-host-e2e',
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
    modelRevision: 'career-monthly-product-host-e2e',
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

function createCareerMonthlyHost(now: Date) {
  const adapter = new ProviderFailureAdapter();
  const registry = createCareerMonthlyReadingCandidateRegistry(INTERPRETATION_NOW.toISOString());
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
        throw new Error('Career Monthly Product Host E2E requires request-scoped temporal facts');
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
      readingVersion: 'myeongha-career-monthly-product-host-e2e-v1',
      claimNarrativeProfiles: [
        ...CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
        ...CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES,
      ],
      narrativeNow: NARRATIVE_NOW,
      artifactGeneratedAt: ARTIFACT_NOW,
    },
    requestIdFactory: () => 'career-monthly-product-e2e',
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
    reading: { text: '이번 달 직업운' },
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
    throw new Error('Career Monthly Product Host E2E capture is incomplete');
  }
  return {
    snapshot: captured.snapshot,
    registry: captured.registry,
    interpretation: captured.interpretation,
    requestContext: captured.requestContext,
  };
}

describe('Product Host Career Monthly reading end-to-end', () => {
  it('delivers Career Natal T8 plus both solar-term-aware Career Monthly T9 phases through the consumer response', async () => {
    const { host, adapter, captured, registry } = createCareerMonthlyHost(SEPTEMBER_NOW);
    const result = await host.requestReading(requestBody());
    const observed = requireCaptured(captured);

    expect(result.state).toBe('delivered_with_fallback');
    expect(result.messageCode).toBe('READING_DELIVERED_WITH_GROUNDED_FALLBACK');
    expect(result.requiredAction).toBe('none');
    expect(adapter.calls).toHaveLength(1);

    expect(observed.requestContext.readingRequest.intent).toEqual({
      domain: 'career',
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

    expect(
      observed.interpretation.claims.some(
        (claim) => claim.state === 'active' && claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'career',
      ),
    ).toBe(true);
    const activeThemes = observed.interpretation.claims.filter(
      (claim) =>
        claim.state === 'active' && claim.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType,
    );
    expect(activeThemes).toHaveLength(2);
    expect(activeThemes.map((claim) => (claim.value as { segmentId: string }).segmentId).sort()).toEqual([
      'after_jeol',
      'before_jeol',
    ]);

    const preparation = prepareProductReading(
      observed.snapshot,
      observed.interpretation,
      observed.registry,
      {
        requestId: 'host_career-monthly-product-e2e',
        text: '이번 달 직업운',
        referenceDateTime: SEPTEMBER_NOW.toISOString(),
      },
      {
        narrativePolicyRef: { id: NARRATIVE_POLICY.policyId, version: NARRATIVE_POLICY.version },
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      },
    );
    expect(preparation.state).toBe('ready_for_narrative');
    expect(preparation.composition?.selection.coverageState).toBe('complete');
    expect(preparation.composition?.selection.profileRef?.id).toBe(
      'myeonghwa-reading-profile-career-monthly-v1',
    );
    expect(preparation.composition?.selection.profileAuthorization.state).toBe('authorized');
    expect(preparation.composition?.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(registry.pack.status).toBe('research');

    const text = responseText(result);
    expect(text).toContain('이번 달 절입 전 구간');
    expect(text).toContain('이번 달 절입 이후 구간');
    expect(text).toContain('특정 사건이나 결과를 확정하지 않습니다');
    for (const forbidden of [
      '무조건',
      '반드시',
      '확실히',
      '100%',
      '해고된다',
      '퇴사한다',
      '이직한다',
      '취업한다',
      '승진한다',
      '연봉이 오른다',
      '사업이 성공한다',
      '실직한다',
    ]) {
      expect(text).not.toContain(forbidden);
    }
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain('ruleId');
    expect(serialized).not.toContain('methodologyId');
    expect(serialized).not.toContain('CAREER_MONTHLY_SEGMENT_THEME_ACTIVATION');
    expect(serialized).not.toContain('RULE-CAREER-MONTHLY');
    expect(serialized).not.toContain('temporal.segmentsById');
  });

  it('is deterministic for the same birth and request-scoped target month', async () => {
    const first = createCareerMonthlyHost(SEPTEMBER_NOW);
    const second = createCareerMonthlyHost(SEPTEMBER_NOW);

    const firstResult = await first.host.requestReading(requestBody());
    const secondResult = await second.host.requestReading(requestBody());
    const firstObserved = requireCaptured(first.captured);
    const secondObserved = requireCaptured(second.captured);

    expect(secondResult).toEqual(firstResult);
    expect(secondObserved.snapshot.calculationHash).toBe(firstObserved.snapshot.calculationHash);
    expect(secondObserved.interpretation.run.runHash).toBe(firstObserved.interpretation.run.runHash);
    expect(second.adapter.calls).toEqual(first.adapter.calls);
  });

  it('surfaces a different Career Monthly reading when 이번 달 resolves to the adjacent civil month', async () => {
    const september = createCareerMonthlyHost(SEPTEMBER_NOW);
    const october = createCareerMonthlyHost(OCTOBER_NOW);

    const septemberResult = await september.host.requestReading(requestBody());
    const octoberResult = await october.host.requestReading(requestBody());
    const septemberObserved = requireCaptured(september.captured);
    const octoberObserved = requireCaptured(october.captured);

    expect(septemberObserved.requestContext.readingRequest.targetPeriod).toMatchObject({ month: 9 });
    expect(octoberObserved.requestContext.readingRequest.targetPeriod).toMatchObject({ month: 10 });
    expect(octoberObserved.requestContext.temporalFacts).toMatchObject({
      targetMonth: 10,
      jeolBoundary: { name: '한로', hanja: '寒露' },
    });
    const keys = (observed: ReturnType<typeof requireCaptured>) =>
      observed.interpretation.claims
        .filter((claim) => claim.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType)
        .map((claim) => (claim.value as { semanticKey: string }).semanticKey)
        .sort();
    expect(keys(octoberObserved)).not.toEqual(keys(septemberObserved));
    expect(responseText(octoberResult)).not.toBe(responseText(septemberResult));
    expect(octoberResult.responseId).not.toBe(septemberResult.responseId);
  });

  it('fails closed to partial evidence without birth hour while retaining bounded monthly T9 evidence', async () => {
    const { host, adapter, captured } = createCareerMonthlyHost(SEPTEMBER_NOW);
    const result = await host.requestReading(requestBody(null));
    const observed = requireCaptured(captured);

    expect(result.state).toBe('partial_evidence');
    expect(result.messageCode).toBe('READING_EVIDENCE_PARTIAL');
    expect(result.requiredAction).toBe('none');
    expect(result.coverage).toMatchObject({ state: 'partial', hasAvailableEvidence: true });
    expect(result.coverage?.missingRequirementCount).toBeGreaterThan(0);
    expect(result.reading).toBeUndefined();
    expect(adapter.calls).toHaveLength(0);
    expect(
      observed.interpretation.claims.filter(
        (claim) => claim.state === 'active' && claim.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(2);
    expect(
      observed.interpretation.claims.some(
        (claim) =>
          claim.state === 'active' &&
          claim.claimType === 'CAREER_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION' &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
    const monthlyFacts = observed.requestContext.temporalFacts;
    if (!('segmentsById' in monthlyFacts)) throw new Error('expected monthly temporal facts');
    const segments = monthlyFacts.segmentsById as Record<string, { monthlyBranchRelations?: { hour?: { status?: string } } }>;
    expect(segments.before_jeol?.monthlyBranchRelations?.hour?.status).not.toBe('resolved');
    expect(segments.after_jeol?.monthlyBranchRelations?.hour?.status).not.toBe('resolved');
  });
});
