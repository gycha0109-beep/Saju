import type { Server } from 'node:http';
import { createMyeonghwaProductionCalculationHostServer } from './production-calculation-host.js';

export const PRODUCTION_CALCULATION_PROCESS_ENV_V1 = {
  serviceBearer: 'SAJU_PRODUCTION_SERVICE_BEARER',
  previousServiceBearer: 'SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER',
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

export function createMyeonghwaProductionCalculationProcessV1(
  env: Environment = process.env,
): MyeonghwaProductionCalculationProcessV1 {
  const config = readMyeonghwaProductionCalculationProcessConfigV1(env);
  const server = createMyeonghwaProductionCalculationHostServer({
    serviceBearer: config.serviceBearer,
    ...(config.previousServiceBearer === undefined
      ? {}
      : { previousServiceBearer: config.previousServiceBearer }),
  });

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
