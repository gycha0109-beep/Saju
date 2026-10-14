import { annualSexagenaryPillar } from './temporal-reading-context.js';
import {
  resolveAnnualLichunPeriodCandidate,
  type AnnualLichunBoundaryEvidence,
  type AnnualLichunPeriodCandidate,
} from './annual-lichun-period-candidate.js';

type BoundaryFailure = Extract<AnnualLichunPeriodCandidate, { state: 'unavailable' }>['reasonCode'];

export interface AnnualLichunCycleBoundaries {
  start: AnnualLichunBoundaryEvidence;
  end: AnnualLichunBoundaryEvidence;
}

export type AnnualLichunCycleBoundaryWindow =
  | {
      precision: 'minute';
      displayedMinuteUtc: string;
      earliestPossibleUtc: string;
      latestPossibleExclusiveUtc: string;
      sourceRef: string;
      sourceVersion: string;
      exactInstantEstablished: false;
    }
  | {
      precision: 'second';
      exactInstantUtc: string;
      sourceRef: string;
      sourceVersion: string;
      exactInstantEstablished: true;
    };

export type AnnualLichunCycleCandidate =
  | {
      state: 'candidate';
      scope: 'traditional_lichun_year_cycle';
      displayYear: number;
      effectiveYear: number;
      annualPillar: ReturnType<typeof annualSexagenaryPillar>;
      startBoundary: AnnualLichunCycleBoundaryWindow;
      endBoundary: AnnualLichunCycleBoundaryWindow;
      exactEffectiveIntervalEstablished: boolean;
      mayGenerateAnnualInterpretation: false;
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      displayYear: number;
      reasonCode:
        | 'INVALID_TARGET_YEAR'
        | 'BOTH_BOUNDARIES_REQUIRED'
        | 'START_BOUNDARY_UNAVAILABLE'
        | 'END_BOUNDARY_UNAVAILABLE';
      boundaryReasonCode?: BoundaryFailure;
      mayGenerateAnnualInterpretation: false;
      productionAuthorized: false;
    };

const MINUTE_UNCERTAINTY_MS = 60_000;

function windowFor(boundary: AnnualLichunBoundaryEvidence): AnnualLichunCycleBoundaryWindow {
  const common = {
    sourceRef: boundary.sourceRef,
    sourceVersion: boundary.sourceVersion,
  };

  if (boundary.precision === 'second') {
    return {
      ...common,
      precision: 'second',
      exactInstantUtc: boundary.instantUtc,
      exactInstantEstablished: true,
    };
  }

  const anchor = Date.parse(boundary.instantUtc);
  return {
    ...common,
    precision: 'minute',
    displayedMinuteUtc: boundary.instantUtc,
    earliestPossibleUtc: new Date(anchor - MINUTE_UNCERTAINTY_MS).toISOString(),
    latestPossibleExclusiveUtc: new Date(anchor + MINUTE_UNCERTAINTY_MS).toISOString(),
    exactInstantEstablished: false,
  };
}

/**
 * Research-only candidate for an entire traditional year:
 * LiChun(targetYear) through LiChun(targetYear + 1).
 *
 * Both source records must first pass the same independently supplied
 * boundary checks used by the reference-instant candidate.
 *
 * This is a conditional mathematical span. "owner_verified_primary" and
 * sourceRef strings are NOT a substitute for a trusted source registry.
 */
export function resolveAnnualLichunCycleCandidate(
  displayYear: number,
  boundaries?: AnnualLichunCycleBoundaries,
): AnnualLichunCycleCandidate {
  const unavailable = (
    reasonCode: Extract<AnnualLichunCycleCandidate, { state: 'unavailable' }>['reasonCode'],
    boundaryReasonCode?: BoundaryFailure,
  ): AnnualLichunCycleCandidate => ({
    state: 'unavailable',
    displayYear,
    reasonCode,
    ...(boundaryReasonCode === undefined ? {} : { boundaryReasonCode }),
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  });

  // +1 needs a supported four-digit next boundary year.
  if (!Number.isSafeInteger(displayYear) || displayYear < 2 || displayYear > 9998) {
    return unavailable('INVALID_TARGET_YEAR');
  }
  if (boundaries === undefined) return unavailable('BOTH_BOUNDARIES_REQUIRED');

  // Midyear is deliberately far away from LiChun and does not pretend to
  // establish the exact second of either start/end boundary.
  const start = resolveAnnualLichunPeriodCandidate(
    displayYear,
    `${displayYear.toString().padStart(4, '0')}-07-01T12:00:00.000Z`,
    boundaries.start,
  );
  if (start.state !== 'candidate') {
    return unavailable('START_BOUNDARY_UNAVAILABLE', start.reasonCode);
  }

  const endYear = displayYear + 1;
  const end = resolveAnnualLichunPeriodCandidate(
    endYear,
    `${endYear.toString().padStart(4, '0')}-07-01T12:00:00.000Z`,
    boundaries.end,
  );
  if (end.state !== 'candidate') {
    return unavailable('END_BOUNDARY_UNAVAILABLE', end.reasonCode);
  }

  const startBoundary = windowFor(boundaries.start);
  const endBoundary = windowFor(boundaries.end);

  return {
    state: 'candidate',
    scope: 'traditional_lichun_year_cycle',
    displayYear,
    effectiveYear: displayYear,
    annualPillar: annualSexagenaryPillar(displayYear),
    startBoundary,
    endBoundary,
    exactEffectiveIntervalEstablished:
      startBoundary.exactInstantEstablished && endBoundary.exactInstantEstablished,
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  };
}
