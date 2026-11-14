import { describe, expect, it } from 'vitest';
import {
  createSajuSourceProviderCallCorrelationV1,
  type SajuSourceProviderCallLinkV1,
} from '../src/production/reading-ai-source-call-correlation-v1.js';
import type {
  OpenAIProviderCallObservationV1,
  OpenAIProviderDispatchIntentV1,
} from '../src/llm/openai/openai-responses-adapter.js';

const ATTEMPT_A = '123e4567-e89b-42d3-a456-426614174002';
const ATTEMPT_B = '123e4567-e89b-42d3-a456-426614174003';
const SOURCE_A = '123e4567-e89b-42d3-a456-426614174004';
const SOURCE_B = '123e4567-e89b-42d3-a456-426614174005';

function event(requestId: string, callId: string): OpenAIProviderCallObservationV1 {
  return {
    requestId,
    callId,
    providerKey: 'openai',
    modelKey: 'gpt-5.6',
    source: 'provider_response_usage',
    outcome: 'response_received',
    observedAt: '2026-11-09T10:00:00.000Z',
    usage: { inputTokens: 100, outputTokens: 40, cachedInputTokens: 10, reasoningTokens: 5 },
  };
}

describe('Saju A4 source provider call correlation (unmounted)', () => {
  it('attributes the real private callback to exactly one server-minted request ref', async () => {
    const observed: SajuSourceProviderCallLinkV1[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => SOURCE_A,
      emit: (link) => {
        observed.push(link);
      },
    });
    await source.onProviderCall(event('host_unscoped', SOURCE_B));
    expect(observed).toHaveLength(0);
    await source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_A }, async (ref) => {
      expect(ref).toBe('saju_source_' + SOURCE_A);
      await source.onProviderCall(event('host_real', SOURCE_B));
    });
    expect(observed).toHaveLength(1);
    expect(observed[0]).toMatchObject({
      externalRequestRef: 'saju_source_' + SOURCE_A,
      executionAttemptId: ATTEMPT_A,
      observation: { requestId: 'host_real', callId: SOURCE_B, usage: { inputTokens: 100 } },
    });
    await source.onProviderCall(event('host_after', SOURCE_B));
    expect(observed).toHaveLength(1);
  });

  it('never leaks the attempt or ref between concurrent asynchronous requests', async () => {
    const observed: SajuSourceProviderCallLinkV1[] = [];
    let count = 0;
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => (++count === 1 ? SOURCE_A : SOURCE_B),
      emit: (link) => {
        observed.push(link);
      },
    });
    await Promise.all([
      source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_A }, async () => {
        await Promise.resolve();
        await source.onProviderCall(event('host_A', SOURCE_A));
      }),
      source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_B }, async () => {
        await Promise.resolve();
        await source.onProviderCall(event('host_B', SOURCE_B));
      }),
    ]);
    expect(observed).toHaveLength(2);
    expect(observed.find((x) => x.observation.requestId === 'host_A')).toMatchObject({
      externalRequestRef: 'saju_source_' + SOURCE_A,
      executionAttemptId: ATTEMPT_A,
    });
    expect(observed.find((x) => x.observation.requestId === 'host_B')).toMatchObject({
      externalRequestRef: 'saju_source_' + SOURCE_B,
      executionAttemptId: ATTEMPT_B,
    });
  });

  it('rejects bad attempt identity, nested attribution and invalid usage', async () => {
    const observed: SajuSourceProviderCallLinkV1[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => SOURCE_A,
      emit: (link) => {
        observed.push(link);
      },
    });
    await expect(
      source.withAuthorizedReadingAttempt({ executionAttemptId: 'browser-id' }, async () => {}),
    ).rejects.toThrow('Invalid DB attempt');
    await source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_A }, async () => {
      await expect(
        source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_B }, async () => {}),
      ).rejects.toThrow('Nested');
      await expect(
        source.onProviderCall({
          ...event('host_A', SOURCE_B),
          usage: {
            inputTokens: -1,
            outputTokens: 2,
            cachedInputTokens: null,
            reasoningTokens: null,
          },
        }),
      ).rejects.toThrow('Untrusted');
    });
    expect(observed).toHaveLength(0);
  });

  it('binds pre-send evidence to the server-minted ref and denies a stale or missing scope', async () => {
    const recorded: { attempt: string; ref: string; callId: string }[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => SOURCE_A,
      emit: () => undefined,
      recordBeforeRequest: async (link) => {
        recorded.push({
          attempt: link.executionAttemptId,
          ref: link.externalRequestRef,
          callId: link.intent.callId,
        });
      },
    });
    const intent: OpenAIProviderDispatchIntentV1 = {
      callId: SOURCE_B,
      requestId: 'private-source-only',
      providerKey: 'openai',
      modelKey: 'gpt-5.6',
      preparedAt: '2026-11-12T02:00:00.000Z',
    };
    await expect(source.onBeforeProviderRequest(intent)).rejects.toThrow('active');
    await source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_A }, async () => {
      await source.onBeforeProviderRequest(intent);
    });
    expect(recorded).toEqual([
      { attempt: ATTEMPT_A, ref: 'saju_source_' + SOURCE_A, callId: SOURCE_B },
    ]);
    await expect(source.onBeforeProviderRequest(intent)).rejects.toThrow('active');
  });

  it('rejects Source write failures without downgrading to an unrecorded send', async () => {
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => SOURCE_A,
      emit: () => undefined,
      recordBeforeRequest: async () => { throw Error('Source DB unavailable'); },
    });
    await expect(
      source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_A }, async () =>
        source.onBeforeProviderRequest({
          callId: SOURCE_B,
          requestId: 'private-source-only',
          providerKey: 'openai',
          modelKey: 'gpt-5.6',
          preparedAt: '2026-11-12T02:00:00.000Z',
        }),
      ),
    ).rejects.toThrow('Source DB unavailable');
  });

  it('preserves unknown usage for failed provider attempts rather than imputing zero', async () => {
    const observed: SajuSourceProviderCallLinkV1[] = [];
    const source = createSajuSourceProviderCallCorrelationV1({
      sourceRefFactory: () => SOURCE_A,
      emit: (link) => {
        observed.push(link);
      },
    });
    await source.withAuthorizedReadingAttempt({ executionAttemptId: ATTEMPT_A }, async () => {
      await source.onProviderCall({
        ...event('host_error', SOURCE_B),
        outcome: 'timeout',
        source: 'provider_attempt_without_usage',
        usage: {
          inputTokens: null,
          outputTokens: null,
          cachedInputTokens: null,
          reasoningTokens: null,
        },
      });
    });
    expect(observed[0]?.observation.usage.inputTokens).toBeNull();
    expect(observed[0]?.observation.outcome).toBe('timeout');
  });
});
