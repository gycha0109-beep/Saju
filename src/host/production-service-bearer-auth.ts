import { createHash, timingSafeEqual } from 'node:crypto';
import type { IncomingMessage } from 'node:http';

export interface MyeonghwaProductionServiceBearerCredentials {
  activeBearer: string | undefined;
  previousBearer: string | undefined;
}

function requireBearer(name: string, value: string | undefined): string {
  if (typeof value !== 'string' || value.length === 0 || /\s/u.test(value)) {
    throw new TypeError(`${name} must be a non-empty bearer token without whitespace.`);
  }
  return value;
}

function optionalBearer(name: string, value: string | undefined): string | undefined {
  if (value === undefined || value.length === 0) return undefined;
  return requireBearer(name, value);
}

function digestBearer(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

export function createMyeonghwaProductionServiceBearerAuthorizer(
  credentials: MyeonghwaProductionServiceBearerCredentials,
): (request: IncomingMessage) => boolean {
  const activeDigest = digestBearer(requireBearer('activeBearer', credentials.activeBearer));
  const previousBearer = optionalBearer('previousBearer', credentials.previousBearer);
  const previousDigest = previousBearer === undefined ? undefined : digestBearer(previousBearer);

  return (request: IncomingMessage): boolean => {
    const authorization = request.headers.authorization;
    if (typeof authorization !== 'string') return false;

    const match = /^Bearer ([^\s]+)$/u.exec(authorization);
    const candidateBearer = match?.[1];
    if (candidateBearer === undefined) return false;

    const candidateDigest = digestBearer(candidateBearer);
    const activeMatch = timingSafeEqual(candidateDigest, activeDigest);
    const previousMatch =
      previousDigest !== undefined && timingSafeEqual(candidateDigest, previousDigest);

    return activeMatch || previousMatch;
  };
}
