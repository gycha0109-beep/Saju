import { URL } from 'node:url';
import type { ReadingRequest } from '../contracts/reading.js';
import {
  resolveAnnualLichunRequestCandidate,
  type AnnualLichunRequestCandidate,
} from './annual-lichun-request-candidate.js';
import {
  resolveAnnualLichunCycleCandidate,
  type AnnualLichunCycleCandidate,
} from './annual-lichun-cycle-candidate.js';
import type { AnnualLichunBoundaryEvidence } from './annual-lichun-period-candidate.js';

/**
 * Code-reviewed provenance records, not request-provided data.
 *
 * Registration requires directly reading the PRIMARY document and reviewing
 * the exact page, printed time, time zone, precision, and file SHA-256.
 * KASA announcements or KASI prepublication tables alone MUST NOT be pinned
 * as if they were directly audited official almanac primary witnesses.
 */
export interface PinnedPrimaryLichunWitness {
  year: number;
  instantUtc: string;
  precision: 'minute' | 'second';
  sourceRef: string;
  sourceVersion: string;
  primaryDocumentUri: string;
  primaryDocumentSha256: string;
  primaryDocumentPage: number;
  printedLichunText: string;
  reviewerDecisionRef: string;
}

// Deliberately empty: 2026/2027 primary almanac pages have not been audited.
// Adding entries here requires a separate source-owner-reviewed PR with hashes.
const PINNED_PRIMARY_WITNESSES: readonly PinnedPrimaryLichunWitness[] = Object.freeze([]);

export const ANNUAL_LICHUN_PRIMARY_REGISTRY_VERSION =
  'saju-annual-lichun-reviewed-primary-registry-v1' as const;

export type PrimaryLichunSourceLookup =
  | {
      state: 'reviewed_candidate';
      year: number;
      boundary: AnnualLichunBoundaryEvidence;
      registryVersion: typeof ANNUAL_LICHUN_PRIMARY_REGISTRY_VERSION;
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      year: number;
      reasonCode:
        | 'NO_PINNED_PRIMARY_WITNESS'
        | 'INVALID_PINNED_PRIMARY_WITNESS'
        | 'CONFLICTING_PINNED_PRIMARY_WITNESSES';
      registryVersion: typeof ANNUAL_LICHUN_PRIMARY_REGISTRY_VERSION;
      productionAuthorized: false;
    };

/**
 * Mechanical consistency checks for a code-pinned witness.
 *
 * Passing this function does NOT authenticate a document, digest, reviewer,
 * published time, or precision. Those facts require independent human review.
 */
export function isStructurallyValidPinnedPrimaryLichunWitness(
  item: Readonly<PinnedPrimaryLichunWitness>,
): boolean {
  let documentUrl: URL;
  try {
    documentUrl = new URL(item.primaryDocumentUri);
  } catch {
    return false;
  }

  const host = documentUrl.hostname.toLowerCase();
  const officialDocumentHost =
    host === 'kasa.go.kr' ||
    host.endsWith('.kasa.go.kr') ||
    host === 'gwanbo.go.kr' ||
    host.endsWith('.gwanbo.go.kr');

  const timestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$/;
  const timestampMs = Date.parse(item.instantUtc);
  if (
    !timestampPattern.test(item.instantUtc) ||
    !Number.isFinite(timestampMs) ||
    new Date(timestampMs).toISOString() !== item.instantUtc
  ) {
    return false;
  }
  const localParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date(timestampMs));
  const localNumber = (type: 'year' | 'month' | 'day'): number =>
    Number(localParts.find((part) => part.type === type)?.value);

  return (
    Number.isSafeInteger(item.year) &&
    item.year >= 2 &&
    item.year <= 9999 &&
    localNumber('year') === item.year &&
    localNumber('month') === 2 &&
    localNumber('day') >= 2 &&
    localNumber('day') <= 6 &&
    item.sourceRef.trim().length > 0 &&
    item.sourceVersion.trim().length > 0 &&
    documentUrl.protocol === 'https:' &&
    documentUrl.username === '' &&
    documentUrl.password === '' &&
    documentUrl.port === '' &&
    officialDocumentHost &&
    /^[a-f0-9]{64}$/.test(item.primaryDocumentSha256) &&
    Number.isSafeInteger(item.primaryDocumentPage) &&
    item.primaryDocumentPage > 0 &&
    item.printedLichunText.includes('입춘') &&
    item.reviewerDecisionRef.trim().length > 0 &&
    (item.precision === 'minute' || item.precision === 'second') &&
    (item.precision === 'second' || new Date(timestampMs).getUTCSeconds() === 0)
  );
}

export function getPinnedPrimaryLichunBoundary(year: number): PrimaryLichunSourceLookup {
  const common = {
    year,
    registryVersion: ANNUAL_LICHUN_PRIMARY_REGISTRY_VERSION,
    productionAuthorized: false as const,
  };
  const matches = PINNED_PRIMARY_WITNESSES.filter((entry) => entry.year === year);
  if (matches.length === 0) {
    return { ...common, state: 'unavailable', reasonCode: 'NO_PINNED_PRIMARY_WITNESS' };
  }
  if (matches.length !== 1) {
    return { ...common, state: 'unavailable', reasonCode: 'CONFLICTING_PINNED_PRIMARY_WITNESSES' };
  }
  const item = matches[0];
  if (item === undefined || !isStructurallyValidPinnedPrimaryLichunWitness(item)) {
    return { ...common, state: 'unavailable', reasonCode: 'INVALID_PINNED_PRIMARY_WITNESS' };
  }

  return {
    ...common,
    state: 'reviewed_candidate',
    boundary: {
      year: item.year,
      instantUtc: item.instantUtc,
      precision: item.precision,
      sourceRef: item.sourceRef,
      sourceVersion: item.sourceVersion,
      verification: 'owner_verified_primary',
    },
  };
}

export type RegisteredAnnualLichunRequestCandidate =
  | AnnualLichunRequestCandidate
  | {
      state: 'source_unavailable';
      requestId: string;
      reasonCode: Extract<PrimaryLichunSourceLookup, { state: 'unavailable' }>['reasonCode'];
      productionAuthorized: false;
    };

/**
 * The only proposed future reading-request integration seam. No caller-supplied
 * boolean, sourceRef, or "verified" string can populate the registry.
 */
export function resolveAnnualLichunRequestWithReviewedSource(
  request: ReadingRequest,
): RegisteredAnnualLichunRequestCandidate {
  if (
    request.intent.temporalScope !== 'annual' ||
    request.targetPeriod === undefined ||
    request.targetPeriod.scope !== 'annual'
  ) {
    return resolveAnnualLichunRequestCandidate(request);
  }

  const source = getPinnedPrimaryLichunBoundary(request.targetPeriod.year);
  if (source.state === 'unavailable') {
    return {
      state: 'source_unavailable',
      requestId: request.requestId,
      reasonCode: source.reasonCode,
      productionAuthorized: false,
    };
  }
  return resolveAnnualLichunRequestCandidate(request, source.boundary);
}

export type RegisteredAnnualLichunCycleCandidate =
  | AnnualLichunCycleCandidate
  | {
      state: 'source_unavailable';
      displayYear: number;
      missingYear: number;
      reasonCode: Extract<PrimaryLichunSourceLookup, { state: 'unavailable' }>['reasonCode'];
      productionAuthorized: false;
    };

export function resolveAnnualLichunCycleWithReviewedSources(
  displayYear: number,
): RegisteredAnnualLichunCycleCandidate {
  if (!Number.isSafeInteger(displayYear) || displayYear < 2 || displayYear > 9998) {
    return resolveAnnualLichunCycleCandidate(displayYear);
  }

  const start = getPinnedPrimaryLichunBoundary(displayYear);
  if (start.state === 'unavailable') {
    return {
      state: 'source_unavailable',
      displayYear,
      missingYear: displayYear,
      reasonCode: start.reasonCode,
      productionAuthorized: false,
    };
  }
  const end = getPinnedPrimaryLichunBoundary(displayYear + 1);
  if (end.state === 'unavailable') {
    return {
      state: 'source_unavailable',
      displayYear,
      missingYear: displayYear + 1,
      reasonCode: end.reasonCode,
      productionAuthorized: false,
    };
  }
  return resolveAnnualLichunCycleCandidate(displayYear, {
    start: start.boundary,
    end: end.boundary,
  });
}
