import type { ReadingRequest, ReadingTargetPeriod } from '../contracts/reading.js';

const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;
const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;
const SEXAGENARY_BASE_YEAR = 1984;

export type TemporalReadingContext =
  | {
      scope: 'annual';
      targetYear: number;
      timeZone: 'Asia/Seoul';
      referenceDateTime: string;
      annualPillar: {
        stem: (typeof STEMS)[number];
        branch: (typeof BRANCHES)[number];
        cycleIndex: number;
      };
    }
  | {
      scope: 'monthly';
      targetYear: number;
      targetMonth: number;
      timeZone: 'Asia/Seoul';
      referenceDateTime: string;
      annualPillar: {
        stem: (typeof STEMS)[number];
        branch: (typeof BRANCHES)[number];
        cycleIndex: number;
      };
    };

export class TemporalReadingContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemporalReadingContextError';
  }
}

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

export function annualSexagenaryPillar(year: number): TemporalReadingContext['annualPillar'] {
  if (!Number.isInteger(year) || year < 1) {
    throw new TemporalReadingContextError('target year must be a positive integer.');
  }
  const cycleIndex = positiveModulo(year - SEXAGENARY_BASE_YEAR, 60);
  const stem = STEMS[cycleIndex % STEMS.length];
  const branch = BRANCHES[cycleIndex % BRANCHES.length];
  if (stem === undefined || branch === undefined) {
    throw new TemporalReadingContextError('failed to resolve annual sexagenary pillar.');
  }
  return { stem, branch, cycleIndex };
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

  const annualPillar = annualSexagenaryPillar(targetPeriod.year);
  if (targetPeriod.scope === 'annual') {
    return {
      scope: 'annual',
      targetYear: targetPeriod.year,
      timeZone: targetPeriod.timeZone,
      referenceDateTime: targetPeriod.referenceDateTime,
      annualPillar,
    };
  }
  return {
    scope: 'monthly',
    targetYear: targetPeriod.year,
    targetMonth: targetPeriod.month,
    timeZone: targetPeriod.timeZone,
    referenceDateTime: targetPeriod.referenceDateTime,
    annualPillar,
  };
}
