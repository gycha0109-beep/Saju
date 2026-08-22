export interface VersionedRef {
  id: string;
  version: string;
}

export interface ContentAddressedVersionedRef extends VersionedRef {
  contentHash: string;
}

export interface FactCandidate<T> {
  candidateId: string;
  value: T;
  reasonRefs: readonly string[];
}

export interface ResolvedFact<T> {
  status: 'resolved';
  value: T;
}

export interface AmbiguousFact<T> {
  status: 'ambiguous';
  candidates: readonly FactCandidate<T>[];
  reasonCodes: readonly string[];
}

export interface UnavailableFact {
  status: 'unavailable';
  reasonCode: string;
}

export type FactState<T> = ResolvedFact<T> | AmbiguousFact<T> | UnavailableFact;

export function resolved<T>(value: T): ResolvedFact<T> {
  return { status: 'resolved', value };
}

export function ambiguous<T>(
  candidates: readonly FactCandidate<T>[],
  reasonCodes: readonly string[],
): AmbiguousFact<T> {
  if (candidates.length < 2) {
    throw new RangeError('An ambiguous fact requires at least two candidates.');
  }

  if (reasonCodes.length === 0) {
    throw new RangeError('An ambiguous fact requires at least one reason code.');
  }

  return { status: 'ambiguous', candidates, reasonCodes };
}

export function unavailable(reasonCode: string): UnavailableFact {
  if (reasonCode.trim().length === 0) {
    throw new RangeError('An unavailable fact requires a non-empty reason code.');
  }

  return { status: 'unavailable', reasonCode };
}

export function assertVersionedRef(value: unknown): asserts value is VersionedRef {
  if (value === null || typeof value !== 'object') {
    throw new TypeError('VersionedRef must be an object.');
  }

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== 'string' || candidate.id.trim().length === 0) {
    throw new TypeError('VersionedRef.id must be a non-empty string.');
  }

  if (typeof candidate.version !== 'string' || candidate.version.trim().length === 0) {
    throw new TypeError('VersionedRef.version must be a non-empty string.');
  }
}
