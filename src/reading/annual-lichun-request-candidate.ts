import type { ReadingRequest } from '../contracts/reading.js';
import {
  resolveAnnualLichunPeriodCandidate,
  type AnnualLichunBoundaryEvidence,
  type AnnualLichunPeriodCandidate,
} from './annual-lichun-period-candidate.js';

/**
 * Research-only opt-in binding from a request's REFERENCE INSTANT to the
 * LiChun calculation candidate. Not a whole-calendar-year annual reading.
 * It does not replace buildTemporalReadingContext or enable Annual semantics.
 */
const RESTRICTIONS = Object.freeze({
  mayAuthorizeAnnualSemantics: false as const,
  mayUseAsWholeYearReading: false as const,
  mayChangeMonthlyContext: false as const,
  mayEnterProduction: false as const,
});

type ResolvedCandidate = Extract<AnnualLichunPeriodCandidate, { state: 'candidate' }>;
type UnavailableReason =
  | 'ANNUAL_INTENT_REQUIRED'
  | 'ANNUAL_TARGET_PERIOD_REQUIRED'
  | 'ANNUAL_TARGET_SCOPE_MISMATCH'
  | Extract<AnnualLichunPeriodCandidate, { state: 'unavailable' }>['reasonCode'];

export type AnnualLichunRequestCandidate =
  | {
      state: 'candidate';
      requestId: string;
      context: {
        scope: 'annual_reference_instant';
        displayYear: number;
        referenceDateTime: string;
        effectiveYear: number;
        effectiveAnnualPillar: ResolvedCandidate['effectiveAnnualPillar'];
        boundarySourceRef: string;
        boundarySourceVersion: string;
        boundaryPrecision: AnnualLichunBoundaryEvidence['precision'];
      };
      constraints: typeof RESTRICTIONS;
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      requestId: string;
      reasonCode: UnavailableReason;
      constraints: typeof RESTRICTIONS;
      productionAuthorized: false;
    };

export function resolveAnnualLichunRequestCandidate(
  request: ReadingRequest,
  boundary?: AnnualLichunBoundaryEvidence,
): AnnualLichunRequestCandidate {
  const unavailable = (reasonCode: UnavailableReason): AnnualLichunRequestCandidate => ({
    state: 'unavailable',
    requestId: request.requestId,
    reasonCode,
    constraints: RESTRICTIONS,
    productionAuthorized: false,
  });

  if (request.intent.temporalScope !== 'annual') {
    return unavailable('ANNUAL_INTENT_REQUIRED');
  }
  if (request.targetPeriod === undefined) {
    return unavailable('ANNUAL_TARGET_PERIOD_REQUIRED');
  }
  if (request.targetPeriod.scope !== 'annual') {
    return unavailable('ANNUAL_TARGET_SCOPE_MISMATCH');
  }

  const period = request.targetPeriod;
  const result = resolveAnnualLichunPeriodCandidate(
    period.year,
    period.referenceDateTime,
    boundary,
  );
  if (result.state !== 'candidate') return unavailable(result.reasonCode);

  return {
    state: 'candidate',
    requestId: request.requestId,
    context: {
      scope: 'annual_reference_instant',
      displayYear: result.displayYear,
      referenceDateTime: period.referenceDateTime,
      effectiveYear: result.effectiveYear,
      effectiveAnnualPillar: result.effectiveAnnualPillar,
      boundarySourceRef: result.boundarySourceRef,
      boundarySourceVersion: result.boundarySourceVersion,
      boundaryPrecision: result.boundaryPrecision,
    },
    constraints: RESTRICTIONS,
    productionAuthorized: false,
  };
}
