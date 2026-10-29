import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import type { NarrativePolicy } from '../src/contracts/narrative.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../src/interpretation/interpretation-engine.js';
import {
  type CompiledNarrativePrompt,
  type NarrativeModelAdapter,
} from '../src/llm/model-adapter.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { buildDeterministicFallbackDraft } from '../src/narrative/deterministic-fallback.js';
import { executeProductReading } from '../src/reading/governed-reading-execution.js';
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';

const FIXED_READING_REFERENCE = '2026-09-03T12:00:00.000Z';

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
      referenceDateTime: FIXED_READING_REFERENCE,
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
    const delivery = await execute('부모운', [claim(currentSnapshot.snapshotId, 'family-parents-complete', 'T8', 'family', 'parents')]);

    expect(delivery.state).toBe('delivered');
    expect(delivery.messageCode).toBe('READING_DELIVERED');
    expect(delivery.requiredAction).toBe('none');
    expect(delivery.artifact).toBeDefined();
    expect(delivery.coverage).toBeUndefined();
  });

  it('marks grounded deterministic fallback without treating it as new interpretation authority', async () => {
    const currentSnapshot = snapshot();
    const delivery = await execute(
      '부모운',
      [claim(currentSnapshot.snapshotId, 'family-parents-fallback', 'T8', 'family', 'parents')],
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

  it('guides unsupported open T11 questions to existing topic routes without granting evidence', async () => {
    const delivery = await execute('질문: 지금 이직해야 할까요?', []);
    const response = buildProductReadingResponse(delivery);
    const message = response.coverage?.explanation ?? '';
    expect(delivery.state).toBe('insufficient_evidence');
    expect(response.state).toBe('insufficient_evidence');
    expect(response.reading).toBeUndefined();
    expect(message).toContain('질문에 직접 대응하는 풀이 근거');
    expect(message).toContain('질문: 직업운');
    expect(message).toContain('질문: 재물운');
    expect(message).toContain('실제 해석 근거가 확인된 범위');
    expect(response.coverage?.hasAvailableEvidence).toBe(false);
    expect(response.coverage?.missingRequirementCount).toBeGreaterThan(0);
    expect(response.requiredAction).toBe('none');
    const json = JSON.stringify(response);
    expect(json).not.toContain('QUESTION_SPECIFIC_CLAIM_REQUIRED');
    expect(json).not.toContain('T11');
    expect(json).not.toContain('READING_PROFILE_SELECTION_NOT_AUTHORIZED');
    expect(delivery.constraints.maySynthesizeMissingReadingText).toBe(false);
  });

  it('never shows free-question retry text on a separate exact governed topic', async () => {
    const direct = await execute('질문: 직업운', []);
    const natal = await execute('재물운', []);
    const compat = await execute('궁합', []);
    expect(direct.state).toBe('insufficient_evidence');
    expect(direct.coverage?.explanation).not.toContain('질문: 재물운');
    expect(natal.state).toBe('insufficient_evidence');
    expect(natal.coverage?.explanation).not.toContain('질문: 직업운');
    expect(compat.state).toBe('invalid_request');
    expect(compat.coverage).toBeUndefined();
    expect(compat.consumerDiagnostics).toEqual(['target_person_required']);
  });

  it.each([
    ['지금 이직해야 할까요?', '현재 역할과 비교할 선택지', '가족에 관한 질문'],
    ['내년 창업은 성공할까요?', '조회할 연도·월', '가족에 관한 질문'],
    ['어머니와 대화가 어려운데 어떻게 해야 할까요?', '부모·자녀 중 누구와의 관계', '투자 매매 결정'],
    ['그 사람과 궁합이 좋을까요?', '상대방의 출생정보', '합격·승진 결과'],
    ['주식 투자로 돈을 벌까요?', '투자 매매 결정', '배우자궁의 위치'],
    ['언제 결혼할까요?', '결혼·이혼의 발생이나 결과', '현재 역할과 비교할 선택지'],
    ['건강은 괜찮을까요?', '건강·질병·수명', '현재 역할과 비교할 선택지'],
    ['어떻게 하면 좋을까요?', '어떤 주제의 어떤 상황', '두 명식이 있어도'],
    ['창업 아이디어를 받아들이는 기준이 궁금해요', '사업 질문은', '가족에 관한 질문'],
    ['아이와 대화가 어려워요', '가족에 관한 질문', '현재 역할과 비교할 선택지'],
    ['딸기 가게 창업을 고민해요', '사업 질문은', '가족에 관한 질문'],
  ])('keeps question-specific missing context in the actual response: %s', async (question, expected, absent) => {
    const delivery = await execute('질문: ' + question, []);
    const response = buildProductReadingResponse(delivery);
    expect(response.state).toBe('insufficient_evidence');
    const guidance = response.coverage?.guidance?.join(' ') ?? '';
    expect(guidance).toContain(expected);
    expect(guidance).not.toContain(absent);
    expect(guidance).toContain('답변 가능 여부를 보장하지 않습니다');
    expect(response.coverage?.explanation?.length).toBeLessThanOrEqual(250);
    expect(response.reading).toBeUndefined();
    expect(response.coverage?.hasAvailableEvidence).toBe(false);
    expect(JSON.stringify(response)).not.toContain('T11');
  });

  it('keeps delivery identity deterministic for the same governed execution result', async () => {
    const currentSnapshot = snapshot();
    const claims = [claim(currentSnapshot.snapshotId, 'family-parents-deterministic', 'T8', 'family', 'parents')];
    const first = await execute('부모운', claims);
    const second = await execute('부모운', claims);

    expect(second.deliveryId).toBe(first.deliveryId);
    expect(second.audit).toEqual(first.audit);
    expect(second.constraints.mayExposeRawInternalReasonCodes).toBe(false);
  });
});
