import type { ReadingRequest, ReadingTargetPeriod } from '../contracts/reading.js';
import { resolveAnnualWithCodeApprovedIndependentE1 } from './annual-lichun-independent-e1.js';
import {
  annualSexagenaryPillar,
  TemporalReadingContextError,
  type AnnualSexagenaryPillar,
} from './annual-sexagenary-pillar.js';

export { annualSexagenaryPillar, TemporalReadingContextError } from './annual-sexagenary-pillar.js';

export type TemporalReadingContext =
  | {
      scope: 'annual';
      targetYear: number;
      timeZone: 'Asia/Seoul';
      referenceDateTime: string;
      annualPillar: AnnualSexagenaryPillar;
    }
  | {
      scope: 'monthly';
      targetYear: number;
      targetMonth: number;
      timeZone: 'Asia/Seoul';
      referenceDateTime: string;
      annualPillar: AnnualSexagenaryPillar;
    };

const ZONED_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * The 00:00 LiChun convention is a PROJECT OWNER calculation policy.
 * E1 witnesses supply a recorded LiChun DATE, not production interpretation authority.
 *
 * Near a missing LiChun boundary, do not silently switch to Gregorian Jan 1.
 * Beyond Feb 6, preserve the existing Gregorian-year calculation for legacy
 * years without an E1 witness. This branch is not a source authentication grant.
 */
function annualPillarForExecution(request: ReadingRequest): AnnualSexagenaryPillar {
  const target = request.targetPeriod;
  if (target === undefined || target.scope !== 'annual') {
    throw new TemporalReadingContextError('Annual target period is required.');
  }
  const source = resolveAnnualWithCodeApprovedIndependentE1(request);
  if (source.state === 'research_candidate') {
    // Use its deterministic effective year ONLY; independent semantic authorization
    // still governs any interpretation or Official Reading composition.
    return annualSexagenaryPillar(source.effectiveYear);
  }

  if (source.state !== 'source_unavailable') {
    throw new TemporalReadingContextError('Annual LiChun boundary input is invalid.');
  }
  const reference = target.referenceDateTime;
  const instant = ZONED_INSTANT.test(reference) ? Date.parse(reference) : NaN;
  if (!Number.isFinite(instant)) {
    throw new TemporalReadingContextError('Annual reference time requires a valid zoned instant.');
  }
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date(instant));
  const numberPart = (type: 'year' | 'month' | 'day'): number =>
    Number(parts.find((part) => part.type === type)?.value);
  const year = numberPart('year');
  const month = numberPart('month');
  const day = numberPart('day');
  if (year !== target.year) {
    throw new TemporalReadingContextError('Annual reference instant and target year differ in Asia/Seoul.');
  }
  if (month === 1 || (month === 2 && day <= 6)) {
    throw new TemporalReadingContextError('Annual LiChun source is unavailable for this boundary period.');
  }
  return annualSexagenaryPillar(target.year);
}

function assertTargetPeriodMatchesIntent(request: ReadingRequest, targetPeriod: ReadingTargetPeriod): void {
  if (request.intent.temporalScope !== targetPeriod.scope) {
    throw new TemporalReadingContextError(
      `target period scope ${targetPeriod.scope} does not match reading intent ${request.intent.temporalScope}.`,
    );
  }
}

export function buildTemporalReadingContext(request: ReadingRequest): TemporalReadingContext | undefined {
  const targetPeriod = request.targetPeriod;
  if (request.intent.temporalScope === 'natal' || request.intent.temporalScope === 'life_stage') {
    if (targetPeriod !== undefined) {
      throw new TemporalReadingContextError('non-temporal reading intent must not carry an annual/monthly target period.');
    }
    return undefined;
  }
  if (targetPeriod === undefined) {
    throw new TemporalReadingContextError(`${request.intent.temporalScope} reading requires targetPeriod.`);
  }
  assertTargetPeriodMatchesIntent(request, targetPeriod);

  if (targetPeriod.scope === 'annual') {
    return {
      scope: 'annual',
      targetYear: targetPeriod.year,
      timeZone: targetPeriod.timeZone,
      referenceDateTime: targetPeriod.referenceDateTime,
      annualPillar: annualPillarForExecution(request),
    };
  }
  return {
    scope: 'monthly',
    targetYear: targetPeriod.year,
    targetMonth: targetPeriod.month,
    timeZone: targetPeriod.timeZone,
    referenceDateTime: targetPeriod.referenceDateTime,
    annualPillar: annualSexagenaryPillar(targetPeriod.year),
  };
}
