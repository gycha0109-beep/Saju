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

export interface SajuProviderCallObserverCoverageV1 {
  readonly version: 'saju-provider-call-observer-coverage-v1';
  readonly executionAttemptId: string;
  readonly externalRequestRef: string;
  readonly observedCallbacks: number;
  readonly acknowledgedReceipts: number;
  readonly failedCallbacks: number;
  readonly pendingCallbacks: number;
  readonly execution: 'returned' | 'threw';
  /** These process-local counters cannot prove total provider-call coverage. */
  readonly completeCostCoverage: false;
}
type Scope = {
  readonly executionAttemptId: string;
  readonly externalRequestRef: string;
  observedCallbacks: number;
  acknowledgedReceipts: number;
  failedCallbacks: number;
  pendingCallbacks: number;
  active: boolean;
};

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
  function enterScope(
    attempt: SajuSourceAttemptContextV1,
    execute: (sourceRef: string) => Promise<unknown>,
  ): Scope {
    if (!attempt || !UUID.test(attempt.executionAttemptId) || typeof execute !== 'function')
      throw new TypeError('Invalid DB attempt context');
    if (scopes.getStore()) throw new Error('Nested Saju source attribution is forbidden');
    const minted = sourceRefFactory();
    if (!UUID.test(minted)) throw new TypeError('Saju source ref factory returned invalid UUID');
    return {
      executionAttemptId: attempt.executionAttemptId.toLowerCase(),
      externalRequestRef: 'saju_source_' + minted.toLowerCase(),
      observedCallbacks: 0,
      acknowledgedReceipts: 0,
      failedCallbacks: 0,
      pendingCallbacks: 0,
      active: true,
    };
  }
  function coverage(
    scope: Scope,
    execution: 'returned' | 'threw',
  ): SajuProviderCallObserverCoverageV1 {
    return Object.freeze({
      version: 'saju-provider-call-observer-coverage-v1' as const,
      executionAttemptId: scope.executionAttemptId,
      externalRequestRef: scope.externalRequestRef,
      observedCallbacks: scope.observedCallbacks,
      acknowledgedReceipts: scope.acknowledgedReceipts,
      failedCallbacks: scope.failedCallbacks,
      pendingCallbacks: scope.pendingCallbacks,
      execution,
      completeCostCoverage: false as const,
    });
  }
  return Object.freeze({
    async withAuthorizedReadingAttempt<T>(
      attempt: SajuSourceAttemptContextV1,
      execute: (sourceRef: string) => Promise<T>,
    ): Promise<T> {
      const scope = enterScope(attempt, execute);
      try {
        return await scopes.run(scope, () => execute(scope.externalRequestRef));
      } finally {
        scope.active = false;
      }
    },
    /**
     * Report even when the reading throws. This count is per-process and can
     * never demonstrate full provider coverage. Source must persist the report
     * durably; failure to preserve it cannot be silently accepted.
     */
    async withAuthorizedReadingAttemptAndCoverage<T>(
      attempt: SajuSourceAttemptContextV1,
      execute: (sourceRef: string) => Promise<T>,
      reportCoverage: (report: SajuProviderCallObserverCoverageV1) => void | Promise<void>,
    ): Promise<T> {
      if (typeof reportCoverage !== 'function')
        throw new TypeError('Durable source coverage reporter required');
      const scope = enterScope(attempt, execute);
      let returned = false;
      let value!: T;
      let executionError: unknown;
      try {
        value = await scopes.run(scope, () => execute(scope.externalRequestRef));
        returned = true;
      } catch (error) {
        executionError = error;
      } finally {
        scope.active = false;
      }
      try {
        await reportCoverage(coverage(scope, returned ? 'returned' : 'threw'));
      } catch (reportError) {
        if (!returned)
          throw new AggregateError(
            [executionError, reportError],
            'Saju reading failed and source coverage could not be preserved',
            { cause: reportError },
          );
        throw reportError;
      }
      if (!returned) throw executionError;
      return value;
    },
    /** Pass directly as the real OpenAI adapter's server-private onProviderCall. */
    async onProviderCall(observation: OpenAIProviderCallObservationV1): Promise<void> {
      const scope = scopes.getStore();
      // A call outside a pre-admitted Production attempt is NOT attributed.
      if (!scope || !scope.active) return;
      scope.observedCallbacks++;
      scope.pendingCallbacks++;
      try {
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
        scope.acknowledgedReceipts++;
      } catch (error) {
        scope.failedCallbacks++;
        throw error;
      } finally {
        scope.pendingCallbacks--;
      }
    },
  });
}
