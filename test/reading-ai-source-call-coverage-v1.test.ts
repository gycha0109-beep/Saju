import { describe, expect, it } from 'vitest';
import {
  createSajuSourceProviderCallCorrelationV1,
  type SajuProviderCallObserverCoverageV1,
} from '../src/production/reading-ai-source-call-correlation-v1.js';
import type { OpenAIProviderCallObservationV1 } from '../src/llm/openai/openai-responses-adapter.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = '123e4567-e89b-42d3-a456-426614174004';
const CALL = '123e4567-e89b-42d3-a456-426614174003';
const observation: OpenAIProviderCallObservationV1 = {
  callId: CALL,
  requestId: 'host_private',
  providerKey: 'openai',
  modelKey: 'gpt-5.6',
  observedAt: '2026-11-09T10:00:00.000Z',
  outcome: 'response_received',
  source: 'provider_response_usage',
  usage: { inputTokens: 25, outputTokens: 5, cachedInputTokens: null, reasoningTokens: null },
};

describe('A4 request-local observed callback evidence coverage', () => {
  it('reports acknowledged callbacks while explicitly refusing a full cost-coverage claim', async () => {
    const reports: SajuProviderCallObserverCoverageV1[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: async () => undefined,
    });
    const result = await source.withAuthorizedReadingAttemptAndCoverage(
      { executionAttemptId: ATTEMPT },
      async (ref) => {
        await source.onProviderCall(observation);
        return ref;
      },
      (report) => {
        reports.push(report);
      },
    );
    expect(result).toBe('saju_source_' + REF);
    expect(reports).toEqual([
      {
        version: 'saju-provider-call-observer-coverage-v1',
        executionAttemptId: ATTEMPT,
        externalRequestRef: result,
        observedCallbacks: 1,
        acknowledgedReceipts: 1,
        failedCallbacks: 0,
        pendingCallbacks: 0,
        execution: 'returned',
        completeCostCoverage: false,
      },
    ]);
    await source.onProviderCall(observation);
    expect(reports).toHaveLength(1);
  });

  it('reports an emitter failure even when the real LLM adapter would swallow the error', async () => {
    const reports: SajuProviderCallObserverCoverageV1[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: async () => {
        throw Error('immutable receipt store unavailable');
      },
    });
    await source.withAuthorizedReadingAttemptAndCoverage(
      { executionAttemptId: ATTEMPT },
      async () => {
        try {
          await source.onProviderCall(observation);
        } catch {
          /* Matches the actual OpenAI adapter isolation behavior. */
        }
        return 'still delivered';
      },
      (report) => {
        reports.push(report);
      },
    );
    expect(reports[0]).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 0,
      failedCallbacks: 1,
      execution: 'returned',
      completeCostCoverage: false,
    });
  });

  it('reports failed reading executions and fails closed if a coverage report cannot be saved', async () => {
    const reports: SajuProviderCallObserverCoverageV1[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: () => undefined,
    });
    await expect(
      source.withAuthorizedReadingAttemptAndCoverage(
        { executionAttemptId: ATTEMPT },
        async () => {
          throw Error('provider failed');
        },
        (report) => {
          reports.push(report);
        },
      ),
    ).rejects.toThrow('provider failed');
    expect(reports[0]).toMatchObject({
      observedCallbacks: 0,
      execution: 'threw',
      completeCostCoverage: false,
    });
    await expect(
      source.withAuthorizedReadingAttemptAndCoverage(
        { executionAttemptId: ATTEMPT },
        async () => 'reading result',
        () => {
          throw Error('coverage not persisted');
        },
      ),
    ).rejects.toThrow('coverage not persisted');
    await expect(
      source.withAuthorizedReadingAttemptAndCoverage(
        { executionAttemptId: ATTEMPT },
        async () => {
          throw Error('reading failed');
        },
        () => {
          throw Error('coverage failed');
        },
      ),
    ).rejects.toThrow('reading failed and source coverage could not be preserved');
  });

  it('does not count a pending provider receipt as acknowledged or complete', async () => {
    const reports: SajuProviderCallObserverCoverageV1[] = [];
    let resolveStore!: () => void;
    const blocked = new Promise<void>((resolve) => {
      resolveStore = resolve;
    });
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => REF,
      emit: () => blocked,
    });
    let callback!: Promise<void>;
    await source.withAuthorizedReadingAttemptAndCoverage(
      { executionAttemptId: ATTEMPT },
      async () => {
        callback = source.onProviderCall(observation);
        await Promise.resolve();
      },
      (report) => {
        reports.push(report);
      },
    );
    expect(reports[0]).toMatchObject({
      observedCallbacks: 1,
      acknowledgedReceipts: 0,
      pendingCallbacks: 1,
      completeCostCoverage: false,
    });
    resolveStore();
    await callback;
  });
});
