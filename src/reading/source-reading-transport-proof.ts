import { createHmac, timingSafeEqual } from 'node:crypto';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { assertProductReadingResponse } from './product-reading-response-admission.js';
import type { ProductReadingResponse } from './product-reading-response.js';
import type {
  SourceReadingProofMaterialV1, SourceReadingProofReadinessV1,
} from './source-reading-proof-readiness.js';

export const SOURCE_READING_TRANSPORT_PROOF_VERSION_V1 =
  'myeonghwa-source-reading-transport-proof-v1' as const;
const DOMAIN = 'myeongha/saju/source-transport-proof/v1\0';
const MAX_TTL_MS = 120_000;
const SKEW_MS = 15_000;
const HASH = /^[0-9a-f]{64}$/u;
const ID = /^[a-zA-Z0-9._:-]{3,128}$/u;
const NONCE = /^[a-zA-Z0-9_-]{22,128}$/u;
const PAYLOAD_KEYS = new Set([
  'version','lifecycle','issuer','audience','keyId','nonce','issuedAtMs','expiresAtMs',
  'requestBodyHash','responseBodyHash','material','productionInterpretationAuthority',
  'releaseAuthorization','canExecute','canPublish','canSell',
]);
const MATERIAL_KEYS = new Set([
  'snapshotId','interpretationRunId','registrySnapshotId','executionId','preparationId',
  'selectionId','profileRef','evidenceBundleHash','readingId','responseId','responseBodyHash',
]);
const PROFILE_KEYS = new Set(['id','version','contentHash']);

export interface SourceReadingTransportProofPayloadV1 {
  readonly version: typeof SOURCE_READING_TRANSPORT_PROOF_VERSION_V1;
  readonly lifecycle: 'preview';
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  readonly nonce: string;
  readonly issuedAtMs: number;
  readonly expiresAtMs: number;
  readonly requestBodyHash: string;
  readonly responseBodyHash: string;
  readonly material: SourceReadingProofMaterialV1;
  readonly productionInterpretationAuthority: 'NOT_EVALUATED';
  readonly releaseAuthorization: 'NOT_EVALUATED';
  readonly canExecute: false;
  readonly canPublish: false;
  readonly canSell: false;
}
export interface SourceReadingSignedTransportProofV1 {
  readonly payload: SourceReadingTransportProofPayloadV1;
  readonly signatureHex: string;
}
export interface SourceReadingProofIssuerOptionsV1 {
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  readonly keyBytes: Uint8Array;
  readonly nonce: string;
  readonly executedRequestBody: unknown;
  readonly response: ProductReadingResponse;
  readonly readiness: SourceReadingProofReadinessV1;
  readonly issuedAtMs: number;
  readonly ttlMs: number;
}
export interface SourceReadingProofVerifierOptionsV1 {
  readonly trustedIssuer: string;
  readonly expectedAudience: string;
  readonly trustedKeyId: string;
  readonly keyBytes: Uint8Array;
  readonly expectedNonce: string;
  readonly expectedRequestBody: unknown;
  readonly response: ProductReadingResponse;
  readonly nowMs: number;
  // Atomically persist a replay key across ALL verifier replicas. Never use
  // process-local memory in distributed production. Fail closed on storage errors.
  readonly claimNonceOnce: (replayKey: string, expiresAtMs: number) => Promise<boolean>;
}
export interface SourceReadingTransportVerificationV1 {
  readonly state: 'held' | 'blocked';
  readonly reason: 'transport_integrity_verified_only' | 'invalid_or_replayed_transport_proof';
  readonly transportIntegrity: 'VERIFIED' | 'NOT_VERIFIED';
  readonly sourceAuthority: 'NOT_EVALUATED';
  readonly releaseAuthorization: 'NOT_EVALUATED';
  readonly canExecute: false;
  readonly canPublish: false;
  readonly canSell: false;
}
function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}
function exactKeys(v: Record<string, unknown>, keys: ReadonlySet<string>): boolean {
  return Object.keys(v).length === keys.size && Object.keys(v).every((key) => keys.has(key));
}
function validKey(identity: string, keyId: string, bytes: Uint8Array): boolean {
  return ID.test(identity) && ID.test(keyId)
    && bytes instanceof Uint8Array && bytes.byteLength >= 32;
}
function validMaterial(v: unknown): v is SourceReadingProofMaterialV1 {
  if (!isRecord(v) || !exactKeys(v, MATERIAL_KEYS) || !isRecord(v.profileRef)
    || !exactKeys(v.profileRef, PROFILE_KEYS)) return false;
  return [
    v.snapshotId,v.interpretationRunId,v.registrySnapshotId,v.executionId,
    v.preparationId,v.selectionId,v.readingId,v.responseId,
    v.profileRef.id,v.profileRef.version,
  ].every((s) => typeof s === 'string' && s.length > 0)
    && [v.profileRef.contentHash,v.evidenceBundleHash,v.responseBodyHash]
      .every((s) => typeof s === 'string' && HASH.test(s));
}
function mac(payload: SourceReadingTransportProofPayloadV1, bytes: Uint8Array): string {
  return createHmac('sha256', bytes).update(DOMAIN)
    .update(deterministicContentHash(payload)).digest('hex');
}
function verdict(valid: boolean): SourceReadingTransportVerificationV1 {
  return Object.freeze({
    state: valid ? 'held' as const : 'blocked' as const,
    reason: valid
      ? 'transport_integrity_verified_only' as const
      : 'invalid_or_replayed_transport_proof' as const,
    transportIntegrity: valid ? 'VERIFIED' as const : 'NOT_VERIFIED' as const,
    sourceAuthority: 'NOT_EVALUATED' as const,
    releaseAuthorization: 'NOT_EVALUATED' as const,
    canExecute: false as const, canPublish: false as const, canSell: false as const,
  });
}

/** INTERNAL. Only transport origin+integrity; NEVER production interpretation authority. */
export function issueHeldSourceReadingTransportProofV1(
  options: SourceReadingProofIssuerOptionsV1,
): SourceReadingSignedTransportProofV1 | null {
  const { readiness, response, executedRequestBody, issuer, audience,
    keyId, keyBytes, nonce, issuedAtMs, ttlMs } = options;
  if (!validKey(issuer, keyId, keyBytes) || !ID.test(audience) || !NONCE.test(nonce)
    || !Number.isSafeInteger(issuedAtMs) || issuedAtMs < 0
    || !Number.isSafeInteger(ttlMs) || ttlMs < 1 || ttlMs > MAX_TTL_MS
    || readiness?.state !== 'held' || readiness.reason !== 'source_attestation_not_implemented'
    || readiness.requestBinding !== 'NOT_ATTESTED'
    || readiness.productionInterpretationAuthority !== 'NOT_EVALUATED'
    || readiness.releaseAuthorization !== 'NOT_EVALUATED'
    || readiness.canExecute !== false || readiness.canPublish !== false || readiness.canSell !== false
    || !validMaterial(readiness.material)) return null;
  try {
    assertProductReadingResponse(response);
    const responseBodyHash = deterministicContentHash(response);
    if (!['delivered','delivered_with_fallback'].includes(response.state)
      || responseBodyHash !== readiness.material.responseBodyHash
      || response.responseId !== readiness.material.responseId
      || response.reading?.readingId !== readiness.material.readingId) return null;
    const payload: SourceReadingTransportProofPayloadV1 = Object.freeze({
      version: SOURCE_READING_TRANSPORT_PROOF_VERSION_V1,
      lifecycle: 'preview', issuer, audience, keyId, nonce, issuedAtMs,
      expiresAtMs: issuedAtMs + ttlMs,
      requestBodyHash: deterministicContentHash(executedRequestBody),
      responseBodyHash, material: structuredClone(readiness.material),
      productionInterpretationAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      canExecute: false, canPublish: false, canSell: false,
    });
    return Object.freeze({ payload, signatureHex: mac(payload, keyBytes) });
  } catch {
    return null;
  }
}

/** INTERNAL. Caller must independently authenticate its Subject and Birth Revision. */
export async function verifyHeldSourceReadingTransportProofV1(
  proof: unknown, options: SourceReadingProofVerifierOptionsV1,
): Promise<SourceReadingTransportVerificationV1> {
  try {
    const { trustedIssuer, expectedAudience, trustedKeyId, keyBytes,
      expectedNonce, expectedRequestBody, response, nowMs, claimNonceOnce } = options;
    if (!isRecord(proof) || !isRecord(proof.payload)
      || !exactKeys(proof.payload, PAYLOAD_KEYS)
      || Object.keys(proof).length !== 2 || !Object.hasOwn(proof,'signatureHex')
      || !Object.hasOwn(proof,'payload')
      || !validKey(trustedIssuer, trustedKeyId, keyBytes)
      || !ID.test(expectedAudience) || !NONCE.test(expectedNonce)
      || !Number.isSafeInteger(nowMs) || typeof claimNonceOnce !== 'function') return verdict(false);
    const raw = proof.payload;
    if (raw.version !== SOURCE_READING_TRANSPORT_PROOF_VERSION_V1
      || raw.lifecycle !== 'preview'
      || raw.issuer !== trustedIssuer || raw.audience !== expectedAudience
      || raw.keyId !== trustedKeyId || raw.nonce !== expectedNonce
      || raw.productionInterpretationAuthority !== 'NOT_EVALUATED'
      || raw.releaseAuthorization !== 'NOT_EVALUATED'
      || raw.canExecute !== false || raw.canPublish !== false || raw.canSell !== false
      || !validMaterial(raw.material)
      || typeof raw.requestBodyHash !== 'string' || !HASH.test(raw.requestBodyHash)
      || typeof raw.responseBodyHash !== 'string' || !HASH.test(raw.responseBodyHash)
      || !Number.isSafeInteger(raw.issuedAtMs) || !Number.isSafeInteger(raw.expiresAtMs)
      || (raw.expiresAtMs as number) - (raw.issuedAtMs as number) > MAX_TTL_MS
      || (raw.expiresAtMs as number) <= (raw.issuedAtMs as number)
      || (raw.issuedAtMs as number) > nowMs + SKEW_MS
      || (raw.expiresAtMs as number) <= nowMs
      || typeof proof.signatureHex !== 'string' || !HASH.test(proof.signatureHex)) return verdict(false);
    assertProductReadingResponse(response);
    const payload = raw as unknown as SourceReadingTransportProofPayloadV1;
    if (payload.requestBodyHash !== deterministicContentHash(expectedRequestBody)
      || payload.responseBodyHash !== deterministicContentHash(response)
      || payload.material.responseBodyHash !== payload.responseBodyHash
      || payload.material.responseId !== response.responseId
      || payload.material.readingId !== response.reading?.readingId) return verdict(false);
    const computed = Buffer.from(mac(payload,keyBytes),'hex');
    const submitted = Buffer.from(proof.signatureHex,'hex');
    if (computed.length !== submitted.length || !timingSafeEqual(computed,submitted)) return verdict(false);
    const replayKey = trustedIssuer + ':' + expectedAudience + ':' + expectedNonce;
    if (!(await claimNonceOnce(replayKey,payload.expiresAtMs))) return verdict(false);
    return verdict(true);
  } catch {
    return verdict(false);
  }
}
