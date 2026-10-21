import { annualSexagenaryPillar } from './temporal-reading-context.js';

/**
 * A source-qualified boundary supplied by a separately governed temporal owner.
 * A caller-provided status is not, by itself, proof of source authenticity.
 * This candidate is deliberately not wired to the consumer or Monthly paths.
 */
export interface AnnualLichunBoundaryEvidence {
  year: number;
  instantUtc: string;
  precision: 'minute' | 'second';
  sourceRef: string;
  sourceVersion: string;
  verification: 'unverified' | 'owner_verified_primary';
}

export type AnnualLichunPeriodCandidate =
  | {
      state: 'candidate';
      displayYear: number;
      effectiveYear: number;
      effectiveAnnualPillar: ReturnType<typeof annualSexagenaryPillar>;
      boundarySourceRef: string;
      boundarySourceVersion: string;
      boundaryPrecision: AnnualLichunBoundaryEvidence['precision'];
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      displayYear: number;
      reasonCode:
        | 'INVALID_REFERENCE_INSTANT'
        | 'DISPLAY_YEAR_MISMATCH'
        | 'BOUNDARY_EVIDENCE_REQUIRED'
        | 'BOUNDARY_EVIDENCE_UNVERIFIED'
        | 'BOUNDARY_EVIDENCE_INVALID'
        | 'BOUNDARY_MINUTE_AMBIGUOUS';
      productionAuthorized: false;
    };

const INSTANT_WITH_ZONE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
const CANONICAL_UTC_SECOND = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$/;
const ONE_MINUTE_MS = 60_000;

function parsedInstant(value: string, expression: RegExp): number | undefined {
  if (!expression.test(value)) return undefined;
  const parts =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-]\d{2}:\d{2})$/.exec(
      value,
    );
  if (parts === null) return undefined;

  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) return undefined;

  const zone = parts[8]!;
  const offsetHour = zone === 'Z' ? 0 : Number(zone.slice(1, 3));
  const offsetMinute = zone === 'Z' ? 0 : Number(zone.slice(4, 6));
  if (offsetHour > 23 || offsetMinute > 59) return undefined;
  const offsetSign = zone.startsWith('-') ? -1 : 1;
  const offsetMs = offsetSign * (offsetHour * 60 + offsetMinute) * ONE_MINUTE_MS;
  const reconstructed = new Date(instant + offsetMs);

  if (
    reconstructed.getUTCFullYear() !== Number(parts[1]) ||
    reconstructed.getUTCMonth() + 1 !== Number(parts[2]) ||
    reconstructed.getUTCDate() !== Number(parts[3]) ||
    reconstructed.getUTCHours() !== Number(parts[4]) ||
    reconstructed.getUTCMinutes() !== Number(parts[5]) ||
    reconstructed.getUTCSeconds() !== Number(parts[6]) ||
    reconstructed.getUTCMilliseconds() !== Number((parts[7] ?? '0').padEnd(3, '0'))
  ) {
    return undefined;
  }
  return instant;
}

function seoulCalendarParts(instantMs: number): {
  year: number;
  month: number;
  day: number;
} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date(instantMs));
  const numberPart = (type: 'year' | 'month' | 'day'): number =>
    Number(parts.find((item) => item.type === type)?.value);
  return {
    year: numberPart('year'),
    month: numberPart('month'),
    day: numberPart('day'),
  };
}

function seoulYear(instantMs: number): number {
  return seoulCalendarParts(instantMs).year;
}

/**
 * Research-only conditional resolver for the APPROVED D2-B direction.
 *
 * For minute-granularity boundaries, (T - 60s, T + 60s) is unresolved:
 * the source may have truncated, rounded, or ceiling-formatted its minute.
 * Its displayed :00 seconds are only a reference anchor, not an exact instant.
 * An exact second boundary is likewise conditional on external source review.
 *
 * The return value is always 'candidate', NEVER Production/Official authority.
 */
export function resolveAnnualLichunPeriodCandidate(
  displayYear: number,
  referenceDateTime: string,
  boundary?: AnnualLichunBoundaryEvidence,
): AnnualLichunPeriodCandidate {
  const unavailable = (
    reasonCode: Extract<AnnualLichunPeriodCandidate, { state: 'unavailable' }>['reasonCode'],
  ): AnnualLichunPeriodCandidate => ({
    state: 'unavailable',
    displayYear,
    reasonCode,
    productionAuthorized: false,
  });

  if (!Number.isSafeInteger(displayYear) || displayYear < 2 || displayYear > 9999) {
    return unavailable('INVALID_REFERENCE_INSTANT');
  }

  const referenceMs = parsedInstant(referenceDateTime, INSTANT_WITH_ZONE);
  if (referenceMs === undefined) return unavailable('INVALID_REFERENCE_INSTANT');
  if (seoulYear(referenceMs) !== displayYear) return unavailable('DISPLAY_YEAR_MISMATCH');
  if (boundary === undefined) return unavailable('BOUNDARY_EVIDENCE_REQUIRED');
  if (boundary.verification !== 'owner_verified_primary') {
    return unavailable('BOUNDARY_EVIDENCE_UNVERIFIED');
  }

  const boundaryMs = parsedInstant(boundary.instantUtc, CANONICAL_UTC_SECOND);
  if (boundaryMs === undefined) return unavailable('BOUNDARY_EVIDENCE_INVALID');
  const localBoundary = seoulCalendarParts(boundaryMs);

  // Broad 2–6 February plausibility guard only; NOT an ephemeris or provenance check.
  // A syntactically verified-looking source must not supply e.g. 31 December as LiChun.
  if (
    new Date(boundaryMs).toISOString() !== boundary.instantUtc ||
    boundary.year !== displayYear ||
    localBoundary.year !== displayYear ||
    localBoundary.month !== 2 ||
    localBoundary.day < 2 ||
    localBoundary.day > 6 ||
    !['minute', 'second'].includes(boundary.precision) ||
    boundary.sourceRef.trim().length === 0 ||
    boundary.sourceVersion.trim().length === 0 ||
    (boundary.precision === 'minute' && new Date(boundaryMs).getUTCSeconds() !== 0)
  ) {
    return unavailable('BOUNDARY_EVIDENCE_INVALID');
  }

  if (
    boundary.precision === 'minute' &&
    referenceMs > boundaryMs - ONE_MINUTE_MS &&
    referenceMs < boundaryMs + ONE_MINUTE_MS
  ) {
    return unavailable('BOUNDARY_MINUTE_AMBIGUOUS');
  }

  const effectiveYear = referenceMs < boundaryMs ? displayYear - 1 : displayYear;
  return {
    state: 'candidate',
    displayYear,
    effectiveYear,
    effectiveAnnualPillar: annualSexagenaryPillar(effectiveYear),
    boundarySourceRef: boundary.sourceRef,
    boundarySourceVersion: boundary.sourceVersion,
    boundaryPrecision: boundary.precision,
    productionAuthorized: false,
  };
}
