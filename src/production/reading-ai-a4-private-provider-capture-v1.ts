import type {
  OpenAIProviderCallObservationV1,
  OpenAIProviderDispatchIntentV1,
} from '../llm/openai/openai-responses-adapter.js';
import {
  createSajuSourceProviderCallCorrelationV1,
  type SajuSourceAttemptContextV1,
} from './reading-ai-source-call-correlation-v1.js';
import { createSajuSignedProviderReceiptEmitterV1 } from './reading-ai-signed-provider-receipt-emitter-v1.js';
import type { SajuA4ReceiptDatabasePoolV1 } from './reading-ai-provider-receipt-postgres-v1.js';
import { createPostgresSajuImmutableProviderReceiptStoreV1 } from './reading-ai-provider-receipt-postgres-v1.js';
import { createPostgresSajuProviderCoverageRecorderV1 } from './reading-ai-provider-coverage-postgres-v1.js';
import { assertSajuA4SourceWriterReadyV1 } from './reading-ai-a4-source-writer-preflight-v1.js';
import { createPostgresSajuProviderDispatchIntentRecorderV1 } from './reading-ai-provider-dispatch-intent-postgres-v1.js';

/**
 * The implementation must validate and CONSUME the exact preallocated,
 * single-use MyeongHa DB execution attempt with trusted server-to-server
 * authority before any paid provider request. It must never use browser
 * metadata or assume that the native Saju requestId equals a DB Reading ID.
 * This production authority has not yet been mounted.
 */
export interface SajuA4PreparedAttemptAdmissionPortV1 {
  admitAndConsumePreparedAttempt(attempt: SajuSourceAttemptContextV1): Promise<boolean>;
}

export interface SajuA4PrivateProviderCaptureConfigV1 {
  readonly pool: SajuA4ReceiptDatabasePoolV1;
  readonly admission: SajuA4PreparedAttemptAdmissionPortV1;
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  readonly keyBytes: Uint8Array;
  readonly nowMs?: () => number;
  readonly sourceRefFactory?: () => string;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

/**
 * Private, explicit installation point for OpenAIResponsesNarrativeAdapter's
 * real onProviderCall. This does NOT change the ordinary Product Host,
 * activate a Production route, read secrets from the browser or collect costs.
 *
 * After admission, the same scope mints one Saju externalRequestRef, persists
 * exact signed provider callbacks, and durably reports observed/missing
 * callback coverage even if generation fails. An adapter-isolated receipt
 * failure cannot be silently counted as complete source coverage.
 */
export function createSajuA4PrivateProviderCaptureV1(
  config: SajuA4PrivateProviderCaptureConfigV1,
): Readonly<{
  onBeforeProviderRequest(intent: OpenAIProviderDispatchIntentV1): Promise<void>;
  onProviderCall(observation: OpenAIProviderCallObservationV1): Promise<void>;
  withPreparedAttempt<T>(
    attempt: SajuSourceAttemptContextV1,
    execute: (externalRequestRef: string) => Promise<T>,
  ): Promise<T>;
}> {
  if (
    !config ||
    typeof config.admission?.admitAndConsumePreparedAttempt !== 'function' ||
    typeof config.pool?.connect !== 'function'
  )
    throw new TypeError('Saju A4 private prepared attempt admission and receipt DB required');

  const receiptStore = createPostgresSajuImmutableProviderReceiptStoreV1(config.pool);
  const signed = createSajuSignedProviderReceiptEmitterV1({
    store: receiptStore,
    issuer: config.issuer,
    audience: config.audience,
    keyId: config.keyId,
    keyBytes: config.keyBytes,
    ...(config.nowMs === undefined ? {} : { nowMs: config.nowMs }),
  });
  const coverage = createPostgresSajuProviderCoverageRecorderV1({ pool: config.pool });
  const intentRecorder = createPostgresSajuProviderDispatchIntentRecorderV1(config.pool);
  const correlation = createSajuSourceProviderCallCorrelationV1({
    emit: signed.emit,
    recordBeforeRequest: intentRecorder.recordBeforeRequest,
    ...(config.sourceRefFactory === undefined ? {} : { sourceRefFactory: config.sourceRefFactory }),
  });

  return Object.freeze({
    onBeforeProviderRequest: correlation.onBeforeProviderRequest,
    onProviderCall: correlation.onProviderCall,
    async withPreparedAttempt<T>(
      attempt: SajuSourceAttemptContextV1,
      execute: (externalRequestRef: string) => Promise<T>,
    ): Promise<T> {
      if (
        !attempt ||
        typeof attempt.executionAttemptId !== 'string' ||
        !UUID.test(attempt.executionAttemptId) ||
        typeof execute !== 'function'
      )
        throw TypeError('Invalid preallocated DB attempt for provider capture');
      // Reject missing Source storage/column grants before consuming the one-use
      // admission or starting a billable provider request.
      await assertSajuA4SourceWriterReadyV1(config.pool);
      const admitted = await config.admission.admitAndConsumePreparedAttempt(attempt);
      if (admitted !== true) throw Error('Authoritative single-use DB attempt admission required');
      return correlation.withAuthorizedReadingAttemptAndCoverage(
        attempt,
        execute,
        coverage.reportCoverage,
      );
    },
  });
}
