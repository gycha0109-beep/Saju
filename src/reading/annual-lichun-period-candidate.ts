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
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) return undefined;
  return instant;
}

function seoulYear(instantMs: number): number {
  const part = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
  })
    .formatToParts(new Date(instantMs))
    .find((item) => item.type === 'year');
  return Number(part?.value);
}

/**
 * Research-only conditional resolver for the APPROVED D2-B direction.
 *
 * For minute-granularity boundaries, [T, T + 60s) is unresolved: the published
 * minute cannot be silently reinterpreted as an exact :00 second. An exact
 * second boundary is likewise only meaningful after external source review.
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
  if (
    boundaryMs === undefined ||
    new Date(boundaryMs).toISOString() !== boundary.instantUtc ||
    boundary.year !== displayYear ||
    seoulYear(boundaryMs) !== displayYear ||
    !['minute', 'second'].includes(boundary.precision) ||
    boundary.sourceRef.trim().length === 0 ||
    boundary.sourceVersion.trim().length === 0 ||
    (boundary.precision === 'minute' && new Date(boundaryMs).getUTCSeconds() !== 0)
  ) {
    return unavailable('BOUNDARY_EVIDENCE_INVALID');
  }

  if (
    boundary.precision === 'minute' &&
    referenceMs >= boundaryMs &&
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
