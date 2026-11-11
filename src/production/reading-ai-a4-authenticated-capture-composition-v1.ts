import type { SajuA4ReceiptDatabasePoolV1 } from './reading-ai-provider-receipt-postgres-v1.js';
import { createSajuA4SignedPreparedAttemptAdmissionV1 } from './reading-ai-a4-signed-attempt-admission-v1.js';
import {
  createSajuA4MyeongHaProofHttpLoaderV1,
  type SajuA4PreparedProofHttpFetchV1,
} from './reading-ai-a4-myeongha-proof-http-loader-v1.js';
import { createSajuA4PrivateProviderCaptureV1 } from './reading-ai-a4-private-provider-capture-v1.js';

export interface SajuA4AuthenticatedCaptureConfigV1 {
  readonly claimPool: SajuA4ReceiptDatabasePoolV1;
  readonly sourceReceiptPool: SajuA4ReceiptDatabasePoolV1;
  readonly myeonghaPrivateOrigin: string;
  readonly myeonghaServiceBearer: string;
  readonly trustedMyeonghaIssuer: string;
  readonly myeonghaProofAudience: string;
  readonly trustedMyeonghaKeyId: string;
  readonly myeonghaSigningKey: Uint8Array;
  readonly sourceIssuer: string;
  readonly sourceAudience: string;
  readonly sourceKeyId: string;
  readonly sourceSigningKey: Uint8Array;
  readonly nowMs: () => number;
  readonly fetchImpl?: SajuA4PreparedProofHttpFetchV1;
  readonly sourceRefFactory?: () => string;
}

/**
 * Server-only explicit wiring of (1) MyeongHa dedicated HTTPS proof read,
 * (2) HMAC+expiration verification, (3) source-owned single-use claim,
 * (4) actual OpenAI onProviderCall signed receipt/coverage capture.
 *
 * Caller must supply this *same instance's* onProviderCall to the actual
 * OpenAIResponsesNarrativeAdapter and this instance's withPreparedAttempt
 * to the authenticated Production Reading host. This does not mount or
 * start either runtime, create a credential, override product grants, or
 * activate live cost ingestion. TLS/secrets/Production Interpretation
 * Authority are still required for any service installation.
 */
export function createSajuA4AuthenticatedCaptureCompositionV1(
  input: SajuA4AuthenticatedCaptureConfigV1,
): ReturnType<typeof createSajuA4PrivateProviderCaptureV1> {
  if (
    !input ||
    !input.claimPool?.connect ||
    !input.sourceReceiptPool?.connect ||
    input.claimPool === input.sourceReceiptPool ||
    typeof input.nowMs !== 'function' ||
    !(input.myeonghaSigningKey instanceof Uint8Array) ||
    !(input.sourceSigningKey instanceof Uint8Array) ||
    input.myeonghaSigningKey.byteLength < 32 ||
    input.sourceSigningKey.byteLength < 32 ||
    (input.myeonghaSigningKey.byteLength === input.sourceSigningKey.byteLength &&
      input.myeonghaSigningKey.every((value, index) => value === input.sourceSigningKey[index]))
  ) {
    throw new TypeError('Independent Saju claim/receipt principals and signing secrets required');
  }
  const proofLoader = createSajuA4MyeongHaProofHttpLoaderV1({
    origin: input.myeonghaPrivateOrigin,
    bearerToken: input.myeonghaServiceBearer,
    ...(input.fetchImpl === undefined ? {} : { fetchImpl: input.fetchImpl }),
  });
  const admission = createSajuA4SignedPreparedAttemptAdmissionV1({
    pool: input.claimPool,
    trustedIssuer: input.trustedMyeonghaIssuer,
    expectedAudience: input.myeonghaProofAudience,
    trustedKeyId: input.trustedMyeonghaKeyId,
    keyBytes: input.myeonghaSigningKey,
    nowMs: input.nowMs,
    loadSignedProof: proofLoader.loadSignedProof,
  });
  return createSajuA4PrivateProviderCaptureV1({
    pool: input.sourceReceiptPool,
    admission,
    issuer: input.sourceIssuer,
    audience: input.sourceAudience,
    keyId: input.sourceKeyId,
    keyBytes: input.sourceSigningKey,
    nowMs: input.nowMs,
    ...(input.sourceRefFactory === undefined
      ? {}
      : {
          sourceRefFactory: input.sourceRefFactory,
        }),
  });
}
