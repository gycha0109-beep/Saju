import { createPrivateKey } from 'node:crypto';
import type { Server } from 'node:http';
import {
  createMyeonghwaProductionPreviewHostServer,
  createMyeonghwaProductionReadingHostServer,
} from './production-calculation-host.js';
import { createApprovedPreviewE2eProductHost } from './preview/preview-product-host.js';
import { createBoundedProductionSpouseOfficialReadingHostV1 } from './production/production-spouse-official-reading-host.js';
import type { T10ProductionPairIssueProofOptionsV1 } from './host/t10-production-pair-issue-proof.js';
import { createProductionRelationshipIssuer } from './production/production-relationship-official-reading-issuer.js';

export const PRODUCTION_CALCULATION_PROCESS_ENV_V1 = {
  serviceBearer: 'SAJU_PRODUCTION_SERVICE_BEARER',
  previousServiceBearer: 'SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER',
  pairIssuerConfig: 'SAJU_T10_PRODUCTION_PAIR_ISSUER_CONFIG',
  relationshipIssuerConfig: 'SAJU_T8_PRODUCTION_RELATIONSHIP_ISSUER_CONFIG',
  host: 'SAJU_PRODUCTION_HOST',
  port: 'PORT',
} as const;

export const DEFAULT_PRODUCTION_CALCULATION_HOST = '0.0.0.0';
export const DEFAULT_PRODUCTION_CALCULATION_PORT = 3000;

export interface ProductionCalculationProcessConfigV1 {
  serviceBearer: string;
  previousServiceBearer?: string;
  host: string;
  port: number;
}

export interface MyeonghwaProductionCalculationProcessV1 {
  server: Server;
  host: string;
  port: number;
}

export interface MyeonghwaStartedProductionCalculationProcessV1
  extends MyeonghwaProductionCalculationProcessV1 {
  close(): Promise<void>;
}

export class ProductionCalculationProcessConfigErrorV1 extends Error {
  readonly code = 'PRODUCTION_CALCULATION_PROCESS_CONFIG_INVALID' as const;

  constructor(message: string) {
    super(message);
    this.name = 'ProductionCalculationProcessConfigErrorV1';
  }
}

type Environment = Readonly<Record<string, string | undefined>>;

function requireBearerEnvironmentValue(env: Environment, name: string): string {
  const value = env[name];
  if (value === undefined || value.length === 0 || /\s/u.test(value)) {
    throw new ProductionCalculationProcessConfigErrorV1(
      `Missing or invalid environment variable ${name}.`,
    );
  }
  return value;
}

function optionalBearerEnvironmentValue(env: Environment, name: string): string | undefined {
  const value = env[name];
  if (value === undefined || value.length === 0) return undefined;
  if (/\s/u.test(value)) {
    throw new ProductionCalculationProcessConfigErrorV1(
      `Invalid environment variable ${name}.`,
    );
  }
  return value;
}

function readHost(env: Environment): string {
  const value = env[PRODUCTION_CALCULATION_PROCESS_ENV_V1.host];
  if (value === undefined) return DEFAULT_PRODUCTION_CALCULATION_HOST;
  if (value.length === 0 || value.trim() !== value || /\s/u.test(value)) {
    throw new ProductionCalculationProcessConfigErrorV1(
      `Invalid environment variable ${PRODUCTION_CALCULATION_PROCESS_ENV_V1.host}.`,
    );
  }
  return value;
}

function readPort(env: Environment): number {
  const value = env[PRODUCTION_CALCULATION_PROCESS_ENV_V1.port];
  if (value === undefined) return DEFAULT_PRODUCTION_CALCULATION_PORT;
  if (!/^[1-9]\d*$/u.test(value)) {
    throw new ProductionCalculationProcessConfigErrorV1(
      `Invalid environment variable ${PRODUCTION_CALCULATION_PROCESS_ENV_V1.port}.`,
    );
  }
  const port = Number(value);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
    throw new ProductionCalculationProcessConfigErrorV1(
      `Invalid environment variable ${PRODUCTION_CALCULATION_PROCESS_ENV_V1.port}.`,
    );
  }
  return port;
}

export function readMyeonghwaProductionCalculationProcessConfigV1(
  env: Environment,
): ProductionCalculationProcessConfigV1 {
  const serviceBearer = requireBearerEnvironmentValue(
    env,
    PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer,
  );
  const previousServiceBearer = optionalBearerEnvironmentValue(
    env,
    PRODUCTION_CALCULATION_PROCESS_ENV_V1.previousServiceBearer,
  );

  return {
    serviceBearer,
    ...(previousServiceBearer === undefined ? {} : { previousServiceBearer }),
    host: readHost(env),
    port: readPort(env),
  };
}

function readingServerOptions(config: ProductionCalculationProcessConfigV1) {
  return {
    serviceBearer: config.serviceBearer,
    ...(config.previousServiceBearer === undefined
      ? {}
      : { previousServiceBearer: config.previousServiceBearer }),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function readIssuerConfig(env: Environment, name: string, releaseKey: 'releaseByOffer' | 'releaseRef') {
  const raw = env[name];
  if (raw === undefined) return undefined;

  const invalid = () => new ProductionCalculationProcessConfigErrorV1(`Invalid environment variable ${name}.`);
  if (raw.length > 4096) throw invalid();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw invalid();
  }
  if (!isRecord(parsed) || Object.keys(parsed).length !== 6) throw invalid();
  const { issuer, audience, keyId, engineVersion, privateKeyPkcs8Base64 } = parsed;
  if (typeof issuer !== 'string' || typeof audience !== 'string' ||
      typeof keyId !== 'string' || typeof engineVersion !== 'string' ||
      !Object.hasOwn(parsed, releaseKey) || typeof privateKeyPkcs8Base64 !== 'string') throw invalid();
  const key = Buffer.from(privateKeyPkcs8Base64, 'base64');
  if (key.length === 0 || key.toString('base64') !== privateKeyPkcs8Base64) throw invalid();
  try {
    return {
      issuer, audience, keyId, engineVersion, release: parsed[releaseKey], invalid,
      signingKey: createPrivateKey({ key, format: 'der', type: 'pkcs8' }),
    };
  } catch {
    throw invalid();
  }
}

function readPairIssuerOptions(env: Environment): T10ProductionPairIssueProofOptionsV1 | undefined {
  const config = readIssuerConfig(env, PRODUCTION_CALCULATION_PROCESS_ENV_V1.pairIssuerConfig, 'releaseByOffer');
  if (config === undefined) return undefined;
  const { release, invalid, ...options } = config;
  if (!isRecord(release)) throw invalid();
  const releases = Object.entries(release);
  if (!releases.every((entry): entry is [string, string] => typeof entry[1] === 'string')) throw invalid();
  return { ...options, releaseByOffer: Object.fromEntries(releases) };
}

function readRelationshipIssuer(env: Environment) {
  const config = readIssuerConfig(env, PRODUCTION_CALCULATION_PROCESS_ENV_V1.relationshipIssuerConfig, 'releaseRef');
  if (config === undefined) return undefined;
  const { release, invalid, ...options } = config;
  if (typeof release !== 'string') throw invalid();
  return createProductionRelationshipIssuer({ ...options, releaseRef: release });
}

export function createMyeonghwaProductionPreviewOnlyCalculationProcessV1(
  env: Environment = process.env,
): MyeonghwaProductionCalculationProcessV1 {
  const config = readMyeonghwaProductionCalculationProcessConfigV1(env);
  const server = createMyeonghwaProductionPreviewHostServer(
    createApprovedPreviewE2eProductHost(),
    readingServerOptions(config),
  );

  return {
    server,
    host: config.host,
    port: config.port,
  };
}

export function createMyeonghwaProductionCalculationProcessV1(
  env: Environment = process.env,
): MyeonghwaProductionCalculationProcessV1 {
  const config = readMyeonghwaProductionCalculationProcessConfigV1(env);
  const compatibilityProductionIssue = readPairIssuerOptions(env);
  const relationshipProductionIssue = readRelationshipIssuer(env);
  const server = createMyeonghwaProductionReadingHostServer(
    createBoundedProductionSpouseOfficialReadingHostV1(),
    createApprovedPreviewE2eProductHost(),
    {
      ...readingServerOptions(config),
      ...(compatibilityProductionIssue === undefined ? {} : { compatibilityProductionIssue }),
      ...(relationshipProductionIssue === undefined ? {} : { relationshipProductionIssue }),
    },
  );

  return {
    server,
    host: config.host,
    port: config.port,
  };
}

function listen(server: Server, port: number, host: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const onError = (error: Error): void => {
      server.off('listening', onListening);
      reject(error);
    };
    const onListening = (): void => {
      server.off('error', onError);
      resolve();
    };

    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port, host);
  });
}

function close(server: Server): Promise<void> {
  if (!server.listening) return Promise.resolve();
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error !== undefined) reject(error);
      else resolve();
    });
  });
}

export async function startMyeonghwaProductionCalculationProcessV1(
  env: Environment = process.env,
): Promise<MyeonghwaStartedProductionCalculationProcessV1> {
  const runtime = createMyeonghwaProductionCalculationProcessV1(env);
  await listen(runtime.server, runtime.port, runtime.host);

  return {
    ...runtime,
    close: () => close(runtime.server),
  };
}
