import type { MyeonghwaSourceReadingProofIssuerHttpOptionsV1 } from './host/source-reading-proof-issuer-http.js';

export const SOURCE_PROOF_PROCESS_ENV_V1 = {
  host: 'SAJU_SOURCE_PROOF_STAGING_HOST',
  port: 'SAJU_SOURCE_PROOF_STAGING_PORT',
  bearer: 'SAJU_SOURCE_PROOF_STAGING_SERVICE_BEARER',
  key: 'SAJU_SOURCE_PROOF_STAGING_HMAC_KEY',
  issuer: 'SAJU_SOURCE_PROOF_STAGING_ISSUER',
  audience: 'SAJU_SOURCE_PROOF_STAGING_AUDIENCE',
  keyId: 'SAJU_SOURCE_PROOF_STAGING_KEY_ID',
  ttlMs: 'SAJU_SOURCE_PROOF_STAGING_TTL_MS',
} as const;

export type SourceProofEnvironmentV1 = Readonly<Record<string, string | undefined>>;
export type SourceProofProcessConfigV1 = Readonly<{
  host: string;
  port: number;
  issuerOptions: MyeonghwaSourceReadingProofIssuerHttpOptionsV1;
}>;

export class SourceProofConfigErrorV1 extends Error {
  readonly code = 'SOURCE_PROOF_PROCESS_CONFIG_INVALID' as const;
  constructor() {
    super('SOURCE_PROOF_PROCESS_CONFIG_INVALID');
    this.name = 'SourceProofConfigErrorV1';
  }
}

const ID = /^[A-Za-z0-9._:-]{3,128}$/u;
const INTEGER = /^[1-9][0-9]*$/u;
const BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;
function required(env: SourceProofEnvironmentV1, key: string): string {
  const value = env[key];
  if (!value || value.trim() !== value || /\s/u.test(value)) {
    throw new SourceProofConfigErrorV1();
  }
  return value;
}
function number(env: SourceProofEnvironmentV1, key: string, min: number, max: number): number {
  const raw = required(env, key);
  const value = Number(raw);
  if (!INTEGER.test(raw) || !Number.isSafeInteger(value) || value < min || value > max) {
    throw new SourceProofConfigErrorV1();
  }
  return value;
}

/** This parser never adopts ordinary Production Calculation credentials or bindings. */
export function readSourceProofProcessConfigV1(env: SourceProofEnvironmentV1): SourceProofProcessConfigV1 {
  const keys = SOURCE_PROOF_PROCESS_ENV_V1;
  const bearer = required(env, keys.bearer);
  const encodedKey = required(env, keys.key);
  const issuer = required(env, keys.issuer);
  const audience = required(env, keys.audience);
  const keyId = required(env, keys.keyId);
  const host = env[keys.host] ?? '127.0.0.1';
  const port = number(env, keys.port, 1, 65_535);
  const ttlMs = env[keys.ttlMs] === undefined ? 60_000 : number(env, keys.ttlMs, 1, 120_000);
  if (!ID.test(issuer) || !ID.test(audience) || !ID.test(keyId)
    || (host !== '127.0.0.1' && host !== '::1')
    || !BASE64.test(encodedKey) || encodedKey.length === 0
    || bearer === env.SAJU_PRODUCTION_SERVICE_BEARER
    || bearer === env.SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER
    || env.SAJU_SOURCE_PROOF_STAGING_PREVIOUS_SERVICE_BEARER !== undefined) {
    throw new SourceProofConfigErrorV1();
  }
  const keyBytes = Buffer.from(encodedKey, 'base64');
  if (keyBytes.length < 32 || keyBytes.toString('base64') !== encodedKey
    || bearer === encodedKey || Buffer.from(bearer, 'utf8').equals(keyBytes)) {
    throw new SourceProofConfigErrorV1();
  }
  return Object.freeze({
    host, port,
    issuerOptions: Object.freeze({
      serviceBearer: bearer, issuer, audience, keyId,
      keyBytes: Uint8Array.from(keyBytes), ttlMs,
    }),
  });
}
