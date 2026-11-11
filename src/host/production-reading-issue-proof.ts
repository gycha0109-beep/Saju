import { sign, type KeyObject } from 'node:crypto';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';

export const PRODUCTION_READING_ATTEMPT_HEADER = 'x-myeongha-reading-attempt';
export const PRODUCTION_READING_RELEASE_HEADER = 'x-myeongha-reading-release';
export const PRODUCTION_READING_ISSUE_PROOF_HEADER = 'x-myeonghwa-production-issue-proof';
const VERSION = 'myeonghwa-production-reading-issue-proof-v1';
const SIGNATURE_DOMAIN = 'myeongha/saju/production-reading-issue/v1\0';
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu;
const TOKEN = /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/u;
const RELEASE_REF = /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/u;
const SUPPORTED_READING_TEXTS = new Set(['직업운', '사업운', '재물운', '연애운', '올해', '이번 달']);

export interface ProductionReadingIssueProofOptions {
  readonly issuer: string;
  readonly audience: string;
  readonly keyId: string;
  readonly signingKey: KeyObject;
  readonly engineVersion: string;
  readonly releaseByReadingText: Readonly<Record<string, string>>;
}

export function createProductionReadingIssueProof(
  authority: unknown,
  options: ProductionReadingIssueProofOptions,
) {
  const { issuer, audience, keyId, engineVersion, signingKey } = options;
  const releases = new Map(Object.entries(options.releaseByReadingText));
  if (
    signingKey.type !== 'private' || signingKey.asymmetricKeyType !== 'ed25519' ||
    ![issuer, audience, keyId, engineVersion].every((value) => TOKEN.test(value)) ||
    releases.size === 0 ||
    [...releases].some(([text, release]) => !SUPPORTED_READING_TEXTS.has(text) || !RELEASE_REF.test(release))
  ) {
    throw new Error('Invalid Production Reading issue proof configuration.');
  }
  const authorityHash = deterministicContentHash(authority);
  return (attempt: unknown, requestedRelease: unknown, body: unknown) => {
    if (typeof attempt !== 'string' || !UUID.test(attempt)) return undefined;
    if (body === null || typeof body !== 'object' || !('reading' in body)) return undefined;
    const { reading } = body;
    if (
      reading === null || typeof reading !== 'object' ||
      !('text' in reading) || typeof reading.text !== 'string' || 'targetPersonRef' in reading
    ) return undefined;
    const releaseRef = releases.get(reading.text);
    if (releaseRef === undefined || requestedRelease !== releaseRef) return undefined;

    const requestBodyHash = deterministicContentHash(body);
    return (response: ProductReadingResponse) => {
      if (response.state !== 'delivered' || response.reading === undefined) return undefined;
      const payload = {
        version: VERSION,
        issuer,
        audience,
        keyId,
        executionAttemptId: attempt,
        authorityHash,
        releaseRef,
        requestBodyHash,
        responseBodyHash: deterministicContentHash(JSON.parse(JSON.stringify(response))),
        nativeReadingId: response.reading.readingId,
        engineVersion,
        issuedAtMs: Date.now(),
      };
      const signature = sign(
        null, Buffer.from(SIGNATURE_DOMAIN + deterministicContentHash(payload)), signingKey,
      ).toString('base64url');
      return Buffer.from(JSON.stringify({ payload, signature })).toString('base64url');
    };
  };
}
