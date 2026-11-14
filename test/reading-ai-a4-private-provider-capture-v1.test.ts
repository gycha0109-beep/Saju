import { describe, expect, it } from 'vitest';
import type { CompiledNarrativePrompt } from '../src/llm/model-adapter.js';
import { OpenAIResponsesNarrativeAdapter } from '../src/llm/openai/openai-responses-adapter.js';
import { createSajuA4PrivateProviderCaptureV1 } from '../src/production/reading-ai-a4-private-provider-capture-v1.js';
import type {
  SajuA4ReceiptDatabaseClientV1,
  SajuA4ReceiptDatabasePoolV1,
} from '../src/production/reading-ai-provider-receipt-postgres-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = '123e4567-e89b-42d3-a456-426614174004';
const KEY = new Uint8Array(32).fill(83);
const prompt = {
  promptCompilerVersion: 'myeonghwa-prompt-compiler-v1',
  mode: 'generate',
  requestId: 'private-saju-request',
  purpose: 'question_answer',
  outputSchemaVersion: 'narrative-draft-v1',
  narrativePolicy: {
    policyId: 'test',
    version: 'narrative-policy-v1',
    language: 'ko',
    tone: { style: 'clear', avoidFatalism: true, avoidFearInduction: true },
    sourceDisclosure: 'internal_only',
  },
  instructions: ['Use only evidence'],
  evidence: { requestId: 'private-saju-request' },
} as unknown as CompiledNarrativePrompt;

function fixture(
  options: {
    admit?: boolean;
    failReceipt?: boolean;
    failCoverage?: boolean;
    providerFails?: boolean;
    principal?: string;
    sourceReady?: boolean;
    intentReady?: boolean;
    missingIntentTable?: boolean;
    failIntent?: boolean;
    missingIntentRead?: boolean;
    failIntentCommit?: boolean;
  } = {},
) {
  const receipts = new Map<string, string>();
  const reports = new Map<string, string>();
  const intents = new Map<string, { executionAttemptId: string; externalRequestRef: string; intentJson: string }>();
  let intentTransaction = false;
  const statements: string[] = [];
  const admissionCalls: string[] = [];
  let providerCalls = 0;
  const pool: SajuA4ReceiptDatabasePoolV1 = {
    async connect(): Promise<SajuA4ReceiptDatabaseClientV1> {
      return {
        async query<Row>(sql: string, values: readonly unknown[] = []) {
          statements.push(sql);
          let rows: unknown[] = [];
          if (sql.includes('to_regclass(')) {
            rows = [
              {
                currentUser: options.principal ?? 'saju_a4_provider_receipt_writer_v1',
                receiptTable: 'saju_source_ops.a4_provider_call_signed_receipts_v1',
                coverageTable: 'saju_source_ops.a4_provider_call_coverage_v1',
                intentTable: options.missingIntentTable ? null : 'saju_source_ops.a4_provider_dispatch_intents_v1',
                receiptCallInsert: true,
                receiptProofInsert: options.sourceReady !== false,
                receiptCallRead: true,
                receiptProofRead: true,
                coverageAttemptInsert: true,
                coverageRefInsert: true,
                coverageProofInsert: true,
                coverageAttemptRead: true,
                coverageRefRead: true,
                coverageProofRead: true,
                intentCallInsert: true,
                intentCallRead: true,
                intentAttemptInsert: true,
                intentAttemptRead: true,
                intentRefInsert: true,
                intentRefRead: true,
                intentProofInsert: options.intentReady !== false,
                intentProofRead: true,
              },
            ];
          } else if (sql.startsWith('INSERT INTO saju_source_ops.a4_provider_dispatch_intents_v1')) {
            if (options.failIntent) throw Error('intent insert unavailable');
            intentTransaction = true;
            const id = String(values[0]);
            if (!intents.has(id)) {
              intents.set(id, {
                executionAttemptId: String(values[1]),
                externalRequestRef: String(values[2]),
                intentJson: String(values[3]),
              });
            }
          } else if (sql.startsWith('SELECT execution_attempt_id::text')) {
            if (!options.missingIntentRead) {
              const row = intents.get(String(values[0]));
              if (row) rows = [row];
            }
          } else if (sql === 'COMMIT' && intentTransaction) {
            intentTransaction = false;
            if (options.failIntentCommit) throw Error('intent commit unavailable');
          } else if (sql === 'ROLLBACK') {
            intentTransaction = false;
          } else if (sql.includes('current_user::text')) {
            rows = [{ currentUser: options.principal ?? 'saju_a4_provider_receipt_writer_v1' }];
          } else if (
            sql.startsWith('INSERT INTO saju_source_ops.a4_provider_call_signed_receipts_v1')
          ) {
            if (options.failReceipt) throw Error('source receipt storage unavailable');
            if (!receipts.has(String(values[0])))
              receipts.set(String(values[0]), String(values[1]));
          } else if (sql.startsWith('SELECT proof::text')) {
            const value = receipts.get(String(values[0]));
            if (value) rows = [{ proofJson: value }];
          } else if (sql.startsWith('INSERT INTO saju_source_ops.a4_provider_call_coverage_v1')) {
            if (options.failCoverage) throw Error('source coverage storage unavailable');
            if (!reports.has(String(values[0]))) reports.set(String(values[0]), String(values[2]));
          } else if (sql.startsWith('SELECT coverage::text')) {
            const value = reports.get(String(values[0]));
            if (value) rows = [{ coverageJson: value }];
          }
          return { rows: rows as Row[] };
        },
        release() {},
      };
    },
  };
  const capture = createSajuA4PrivateProviderCaptureV1({
    pool,
    issuer: 'saju-production',
    audience: 'myeongha-admin-a4',
    keyId: 'saju-key-1',
    keyBytes: KEY,
    nowMs: () => Date.now(),
    sourceRefFactory: () => REF,
    admission: {
      async admitAndConsumePreparedAttempt(attempt) {
        admissionCalls.push(attempt.executionAttemptId);
        return options.admit !== false;
      },
    },
  });
  const adapter = new OpenAIResponsesNarrativeAdapter({
    apiKey: 'unit-test-only',
    model: 'gpt-5.6',
    onBeforeProviderRequest: capture.onBeforeProviderRequest,
    onProviderCall: capture.onProviderCall,
    fetchImpl: async () => {
      providerCalls++;
      if (options.providerFails) throw Error('simulated network error');
      return new Response(
        JSON.stringify({
          id: 'resp_test',
          status: 'completed',
          model: 'gpt-5.6',
          usage: {
            input_tokens: 25,
            output_tokens: 5,
            total_tokens: 30,
            input_tokens_details: { cached_tokens: 5 },
            output_tokens_details: { reasoning_tokens: 2 },
          },
          output: [{ type: 'message', content: [{ type: 'output_text', text: '{"ok":true}' }] }],
        }),
        { status: 200 },
      );
    },
  });
  return {
    capture,
    adapter,
    receipts,
    reports,
    intents,
    statements,
    admissionCalls,
    get providerCalls() {
      return providerCalls;
    },
  };
}

describe('Admin A4 server-private capture using actual OpenAI adapter callback', () => {
  it('binds the real successful provider call to a preadmitted attempt, signed receipt and durable coverage', async () => {
    const x = fixture();
    const result = await x.capture.withPreparedAttempt(
      { executionAttemptId: ATTEMPT },
      async (sourceRef) => {
        expect(sourceRef).toBe('saju_source_' + REF);
        return x.adapter.generateStructured(prompt);
      },
    );
    expect(result).toEqual({ ok: true });
    expect(x.providerCalls).toBe(1);
    expect(x.admissionCalls).toEqual([ATTEMPT]);
    expect(x.receipts.size).toBe(1);
    expect(x.intents.size).toBe(1);
    const storedIntent = [...x.intents.entries()][0]!;
    expect(storedIntent[1].executionAttemptId).toBe(ATTEMPT);
    expect(storedIntent[1].externalRequestRef).toBe('saju_source_' + REF);
    expect(Object.keys(JSON.parse(storedIntent[1].intentJson)).sort()).toEqual([
      'callId', 'modelKey', 'preparedAt', 'providerKey', 'requestId',
    ]);
    const signed = JSON.parse([...x.receipts.values()][0]!);
    expect(signed.payload.link.externalRequestRef).toBe('saju_source_' + REF);
    expect(signed.payload.link.executionAttemptId).toBe(ATTEMPT);
    expect(signed.payload.link.observation.requestId).toBe(prompt.requestId);
    expect(signed.payload.link.observation.callId).toBe(storedIntent[0]);
    expect(JSON.parse(storedIntent[1].intentJson).modelKey).toBe(
      signed.payload.link.observation.modelKey,
    );
    expect(signed.payload.link.observation.usage).toEqual({
      inputTokens: 25,
      outputTokens: 5,
      cachedInputTokens: 5,
      reasoningTokens: 2,
    });
    expect(signed.signatureHex).toMatch(/^[a-f0-9]{64}$/u);
    const coverage = JSON.parse(x.reports.get(ATTEMPT)!);
    expect(coverage).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 1,
      failedCallbacks: 0,
      pendingCallbacks: 0,
      execution: 'returned',
      completeCostCoverage: false,
    });
    expect(JSON.stringify([...x.receipts.values()])).not.toContain('unit-test-only');
  });

  it('keeps provider errors unmeasured but records the attempted signed call and failed execution', async () => {
    const x = fixture({ providerFails: true });
    await expect(
      x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      ),
    ).rejects.toThrow('could not reach');
    expect(x.providerCalls).toBe(1);
    expect(x.intents.size).toBe(1);
    const receipt = JSON.parse([...x.receipts.values()][0]!);
    expect(receipt.payload.link.observation.source).toBe('provider_attempt_without_usage');
    expect(receipt.payload.link.observation.usage).toEqual({
      inputTokens: null,
      outputTokens: null,
      cachedInputTokens: null,
      reasoningTokens: null,
    });
    expect(JSON.parse(x.reports.get(ATTEMPT)!)).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 1,
      failedCallbacks: 0,
      execution: 'threw',
      completeCostCoverage: false,
    });
  });

  it('blocks missing Source writer privileges before consuming an attempt or sending a provider call', async () => {
    const x = fixture({ sourceReady: false });
    await expect(
      x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      ),
    ).rejects.toThrow('Source receipt writer is not ready');
    expect(x.providerCalls).toBe(0);
    expect(x.admissionCalls).toHaveLength(0);
    expect(x.receipts.size).toBe(0);
    expect(x.reports.size).toBe(0);
    expect(x.statements).not.toContainEqual(expect.stringContaining('INSERT INTO'));
  });

  it.each([
    { missingIntentTable: true },
    { intentReady: false },
  ])('blocks missing pre-network intent storage before single-use admission: %j', async (options) => {
    const x = fixture(options);
    await expect(
      x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      ),
    ).rejects.toThrow('Source receipt writer is not ready');
    expect(x.providerCalls).toBe(0);
    expect(x.admissionCalls).toHaveLength(0);
    expect(x.intents.size).toBe(0);
    expect(x.receipts.size).toBe(0);
    expect(x.statements.some((sql) => sql.startsWith('INSERT'))).toBe(false);
  });

  it('rejects missing authoritative preadmission before spending a provider call', async () => {
    const x = fixture({ admit: false });
    await expect(
      x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      ),
    ).rejects.toThrow('single-use DB attempt admission required');
    expect(x.providerCalls).toBe(0);
    expect(x.receipts.size).toBe(0);
    expect(x.reports.size).toBe(0);
    expect(x.statements).not.toContainEqual(expect.stringContaining('INSERT INTO'));
    expect(x.statements).toContain('BEGIN READ ONLY');
  });

  it('records a receipt callback failure in durable coverage even when the real adapter swallows it', async () => {
    const x = fixture({ failReceipt: true });
    const result = await x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
      x.adapter.generateStructured(prompt),
    );
    expect(result).toEqual({ ok: true });
    expect(x.receipts.size).toBe(0);
    expect(JSON.parse(x.reports.get(ATTEMPT)!)).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 0,
      failedCallbacks: 1,
      completeCostCoverage: false,
    });
  });

  it('fails closed if coverage cannot be persisted, even after model output was returned', async () => {
    const x = fixture({ failCoverage: true });
    await expect(
      x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      ),
    ).rejects.toThrow('source coverage storage unavailable');
    expect(x.providerCalls).toBe(1);
    expect(x.receipts.size).toBe(1);
    expect(x.reports.size).toBe(0);
  });

  it('blocks network dispatch outside any admitted A4 scope', async () => {
    const x = fixture();
    await expect(x.adapter.generateStructured(prompt)).rejects.toThrow('preflight failed');
    expect(x.providerCalls).toBe(0);
    expect(x.intents.size).toBe(0);
    expect(x.receipts.size).toBe(0);
    expect(x.reports.size).toBe(0);
    expect(x.admissionCalls).toHaveLength(0);
  });

  it.each([
    { failIntent: true },
    { missingIntentRead: true },
    { failIntentCommit: true },
  ])('blocks paid transport if durable pre-send Source evidence fails: %j', async (options) => {
    const x = fixture(options);
    await expect(
      x.capture.withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      ),
    ).rejects.toThrow('preflight failed');
    expect(x.providerCalls).toBe(0);
    expect(x.receipts.size).toBe(0);
    expect(x.admissionCalls).toEqual([ATTEMPT]);
    expect(JSON.parse(x.reports.get(ATTEMPT)!)).toMatchObject({
      observedCallbacks: 0,
      acknowledgedReceipts: 0,
      execution: 'threw',
      completeCostCoverage: false,
    });
  });

  it('denies wrong source database authority before recording the provider receipt', async () => {
    const x = fixture({ principal: 'saju_a4_provider_receipt_reader_v1' });
    await x.capture
      .withPreparedAttempt({ executionAttemptId: ATTEMPT }, async () =>
        x.adapter.generateStructured(prompt),
      )
      .catch(() => undefined);
    expect(x.receipts.size).toBe(0);
    expect(x.reports.size).toBe(0);
    expect(x.statements.some((s) => s.startsWith('INSERT INTO'))).toBe(false);
  });
});
