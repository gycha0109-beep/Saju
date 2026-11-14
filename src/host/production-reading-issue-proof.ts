import { sign, type KeyObject } from 'node:crypto';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ProductReadingResponse } from '../reading/product-reading-response.js';
import { stableSourceResponseHash } from '../reading/character-grounding-v2.js';
import type { ProductionReadingReaderSource } from './product-host.js';

export const PRODUCTION_READING_RELEASE_HEADER = 'x-myeongha-reading-release';
export const PRODUCTION_READING_ISSUE_PROOF_HEADER = 'x-myeonghwa-production-issue-proof';
export const PRODUCTION_READER_SOURCE_HEADER = 'x-myeongha-reader-source';
export const PRODUCTION_READER_SOURCE_VERSION = 'canonical-v1';
export const PRODUCTION_READER_SOURCE_MAX_BYTES = 128 * 1024;
const VERSION = 'myeonghwa-production-reading-issue-proof-v1';
const SIGNATURE_DOMAIN = 'myeongha/saju/production-reading-issue/v1\0';
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu;
const TOKEN = /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/u;
const RELEASE_REF = /^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/u;
const SUPPORTED_READING_TEXTS = new Set([
  '직업운',
  '사업운',
  '재물운',
  '연애운',
  '올해',
  '이번 달',
]);

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
    signingKey.type !== 'private' ||
    signingKey.asymmetricKeyType !== 'ed25519' ||
    ![issuer, audience, keyId, engineVersion].every((value) => TOKEN.test(value)) ||
    releases.size === 0 ||
    [...releases].some(
      ([text, release]) => !SUPPORTED_READING_TEXTS.has(text) || !RELEASE_REF.test(release),
    )
  ) {
    throw new Error('Invalid Production Reading issue proof configuration.');
  }
  const authorityHash = deterministicContentHash(authority);
  return (attempt: unknown, requestedRelease: unknown, body: unknown) => {
    if (typeof attempt !== 'string' || !UUID.test(attempt)) return undefined;
    if (body === null || typeof body !== 'object' || !('reading' in body)) return undefined;
    const { reading } = body;
    if (
      reading === null ||
      typeof reading !== 'object' ||
      !('text' in reading) ||
      typeof reading.text !== 'string' ||
      'targetPersonRef' in reading
    )
      return undefined;
    const releaseRef = releases.get(reading.text);
    if (releaseRef === undefined || requestedRelease !== releaseRef) return undefined;
    const temporalScope =
      reading.text === '올해' ? 'annual' : reading.text === '이번 달' ? 'monthly' : undefined;
    const referenceDateTime =
      'periodReferenceDateTime' in reading ? reading.periodReferenceDateTime : undefined;

    const requestBodyHash = deterministicContentHash(body);
    const signResponse = (
      externalRequestRef: string,
      response: ProductReadingResponse,
      readerSource?: ProductionReadingReaderSource,
    ) => {
      if (response.state !== 'delivered' || response.reading === undefined ||
          (temporalScope !== undefined && readerSource?.temporal === undefined)) {
        // A purchased civil year/month cannot be signed without the same
        // execution's canonical two-window Reader evidence.
        return undefined;
      }
      const responseBodyHash = deterministicContentHash(JSON.parse(JSON.stringify(response)));
      let readerSourceHash: string | undefined;
      if (readerSource !== undefined) {
        const serialized = JSON.stringify(readerSource);
        const calendar = readerSource.temporal?.calendar;
        if (
          Buffer.byteLength(serialized) > PRODUCTION_READER_SOURCE_MAX_BYTES ||
          readerSource.grounding.readingRef !== response.reading.readingId ||
          readerSource.grounding.productResponseVersion !== response.responseVersion ||
          readerSource.grounding.sourceResponseHash !== stableSourceResponseHash(response) ||
          readerSource.grounding.engineVersion !== engineVersion ||
          readerSource.grounding.sourceSemanticHash !== readerSource.semanticSource.semanticHash ||
          (temporalScope === undefined
            ? calendar !== undefined
            : calendar?.scope !== temporalScope ||
              calendar.referenceDateTime !== referenceDateTime ||
              calendar.responseBodyHash !== responseBodyHash)
        )
          return undefined;
        readerSourceHash = deterministicContentHash(JSON.parse(serialized));
      }
      const payload = {
        version: VERSION,
        issuer,
        audience,
        keyId,
        executionAttemptId: attempt,
        externalRequestRef,
        authorityHash,
        releaseRef,
        requestBodyHash,
        responseBodyHash,
        ...(readerSourceHash === undefined ? {} : { readerSourceHash }),
        nativeReadingId: response.reading.readingId,
        engineVersion,
        issuedAtMs: Date.now(),
      };
      const signature = sign(
        null,
        Buffer.from(SIGNATURE_DOMAIN + deterministicContentHash(payload)),
        signingKey,
      ).toString('base64url');
      return Buffer.from(JSON.stringify({ payload, signature })).toString('base64url');
    };
    return Object.assign(signResponse, { engineVersion });
  };
}
