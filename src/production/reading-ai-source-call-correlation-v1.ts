import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import type { OpenAIProviderCallObservationV1 } from '../llm/openai/openai-responses-adapter.js';

/**
 * Source-owned, per-invocation attribution candidate for the A4 cost bridge.
 *
 * The caller MUST have authenticated a server-to-server Production request,
 * and the DB Owner MUST have allocated/admitted the exact attempt before
 * entering withAuthorizedReadingAttempt(). This module is NOT mounted in
 * the production host or an HTTP route.
 *
 * It never trusts a Saju-native reading ID as a MyeongHa DB UUID.
 * The external ref is minted by Saju (not accepted from a browser or caller).
 * The DB Owner must independently reconcile this ref with the terminal
 * execution attempt before writing provider costs.
 */
export interface SajuSourceProviderCallLinkV1 {
  readonly version: 'saju-source-provider-call-link-v1';
  readonly externalRequestRef: string;
  readonly executionAttemptId: string;
  readonly observation: OpenAIProviderCallObservationV1;
}

export interface SajuSourceAttemptContextV1 {
  /** Canonical pre-allocated DB attempt, admitted by MyeongHa before network. */
  readonly executionAttemptId: string;
}

type Scope = Readonly<{
  executionAttemptId: string;
  externalRequestRef: string;
}>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const OUTCOMES = new Set([
  'response_received',
  'http_failure',
  'network_failure',
  'timeout',
  'invalid_response',
]);
const COUNTERS = ['inputTokens', 'outputTokens', 'cachedInputTokens', 'reasoningTokens'] as const;

function validObservation(value: OpenAIProviderCallObservationV1): boolean {
  if (
    !value ||
    !UUID.test(value.callId) ||
    !value.requestId ||
    value.requestId.length > 256 ||
    !value.modelKey ||
    value.modelKey.length > 128 ||
    value.providerKey !== 'openai' ||
    !OUTCOMES.has(value.outcome) ||
    !Number.isFinite(Date.parse(value.observedAt)) ||
    (value.source !== 'provider_response_usage' &&
      value.source !== 'provider_attempt_without_usage')
  )
    return false;
  const usage = value.usage;
  if (
    !usage ||
    COUNTERS.some(
      (k) => usage[k] !== null && (!Number.isSafeInteger(usage[k]) || Number(usage[k]) < 0),
    )
  ) {
    return false;
  }
  if (value.source === 'provider_attempt_without_usage') {
    return COUNTERS.every((k) => usage[k] === null);
  }
  return (
    value.outcome === 'response_received' &&
    usage.inputTokens !== null &&
    usage.outputTokens !== null &&
    (usage.cachedInputTokens === null || usage.cachedInputTokens <= usage.inputTokens) &&
    (usage.reasoningTokens === null || usage.reasoningTokens <= usage.outputTokens)
  );
}

export function createSajuSourceProviderCallCorrelationV1(
  input: Readonly<{
    /**
     * Trusted, durable source-owned delivery. On failure, callers must preserve
     * an explicit coverage gap; the OpenAI adapter itself isolates observer errors.
     */
    emit: (link: SajuSourceProviderCallLinkV1) => void | Promise<void>;
    /** Optional deterministic factory for synthetic tests; do not inject browser input. */
    sourceRefFactory?: () => string;
  }>,
) {
  if (typeof input.emit !== 'function') throw new TypeError('Saju source cost emitter required');
  const scopes = new AsyncLocalStorage<Scope>();
  const sourceRefFactory = input.sourceRefFactory ?? randomUUID;
  return Object.freeze({
    async withAuthorizedReadingAttempt<T>(
      attempt: SajuSourceAttemptContextV1,
      execute: (sourceRef: string) => Promise<T>,
    ): Promise<T> {
      if (!attempt || !UUID.test(attempt.executionAttemptId) || typeof execute !== 'function')
        throw new TypeError('Invalid DB attempt context');
      if (scopes.getStore()) throw new Error('Nested Saju source attribution is forbidden');
      const minted = sourceRefFactory();
      if (!UUID.test(minted)) throw new TypeError('Saju source ref factory returned invalid UUID');
      const scope = Object.freeze({
        executionAttemptId: attempt.executionAttemptId.toLowerCase(),
        externalRequestRef: 'saju_source_' + minted.toLowerCase(),
      });
      return scopes.run(scope, () => execute(scope.externalRequestRef));
    },
    /** Pass directly as the real OpenAI adapter's server-private onProviderCall. */
    async onProviderCall(observation: OpenAIProviderCallObservationV1): Promise<void> {
      const scope = scopes.getStore();
      // A call outside a pre-admitted Production attempt is NOT attributed.
      if (!scope) return;
      if (!validObservation(observation)) throw new Error('Untrusted provider usage observation');
      await input.emit(
        Object.freeze({
          version: 'saju-source-provider-call-link-v1' as const,
          externalRequestRef: scope.externalRequestRef,
          executionAttemptId: scope.executionAttemptId,
          observation: Object.freeze({
            ...observation,
            usage: Object.freeze({ ...observation.usage }),
          }),
        }),
      );
    },
  });
}
