import { getSolarTerm, getSolarTermsOfYear, type SolarTerm } from 'manseryeok';
import type {
  BirthInput,
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
  SolarTermContext,
  SolarTermFact,
} from '../contracts/calculation.js';
import {
  calculateCanonicalSajuSnapshot as calculateAdapterSnapshot,
  manseryeokAdapterMetadata,
  type CalculationAdapterOptions,
} from './manseryeok-adapter.js';

const SOLAR_TERM_MIN_YEAR = 1800;
const SOLAR_TERM_MAX_YEAR = 2300;
const FIXED_KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export type CalculationErrorCode =
  | 'INVALID_INPUT'
  | 'UNSUPPORTED_POLICY'
  | 'OUTSIDE_SUPPORTED_RANGE'
  | 'CALCULATION_FAILED';

export class MyeonghwaCalculationError extends Error {
  readonly code: CalculationErrorCode;
  readonly originalError?: unknown;

  constructor(code: CalculationErrorCode, message: string, originalError?: unknown) {
    super(message);
    this.name = 'MyeonghwaCalculationError';
    this.code = code;
    this.originalError = originalError;
  }
}

interface LocalDateTime {
  date: string;
  time: string;
  value: string;
}

const seoulFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function fixedKstDateTime(date: Date): LocalDateTime {
  const shifted = new Date(date.getTime() + FIXED_KST_OFFSET_MS);
  const localDate = `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(
    shifted.getUTCDate(),
  )}`;
  const localTime = `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}`;
  return { date: localDate, time: localTime, value: `${localDate}T${localTime}` };
}

function historicalSeoulDateTime(date: Date): LocalDateTime {
  const values: Record<string, string> = {};
  for (const part of seoulFormatter.formatToParts(date)) {
    if (part.type !== 'literal') values[part.type] = part.value;
  }
  const localDate = `${values.year}-${values.month}-${values.day}`;
  const localTime = `${values.hour}:${values.minute}`;
  return { date: localDate, time: localTime, value: `${localDate}T${localTime}` };
}

function useHistoricalCivilTime(policy: CalculationPolicySnapshot): boolean {
  return policy.trueSolarTime.enabled && policy.trueSolarTime.applyHistoricalDst;
}

function termLocalDateTime(term: SolarTerm, policy: CalculationPolicySnapshot): LocalDateTime {
  return useHistoricalCivilTime(policy)
    ? historicalSeoulDateTime(term.date)
    : fixedKstDateTime(term.date);
}

function toSolarTermFact(term: SolarTerm, policy: CalculationPolicySnapshot): SolarTermFact {
  const local = termLocalDateTime(term, policy);
  return {
    name: term.name,
    index: term.index,
    instantUtc: term.date.toISOString(),
    localDateTime: local.value,
  };
}

function supportedTermsAround(year: number): SolarTerm[] {
  const years = [year - 1, year, year + 1].filter(
    (candidate) => candidate >= SOLAR_TERM_MIN_YEAR && candidate <= SOLAR_TERM_MAX_YEAR,
  );
  return years
    .flatMap((candidate) => getSolarTermsOfYear(candidate))
    .sort((left, right) => left.date.getTime() - right.date.getTime());
}

function resolvedSolarDate(snapshot: CanonicalSajuSnapshot) {
  return snapshot.normalized.solarDate.status === 'resolved'
    ? snapshot.normalized.solarDate.value
    : undefined;
}

function buildSolarTermContext(
  snapshot: CanonicalSajuSnapshot,
  policy: CalculationPolicySnapshot,
): SolarTermContext | undefined {
  const date = resolvedSolarDate(snapshot);
  if (date === undefined) return undefined;
  if (date.year < SOLAR_TERM_MIN_YEAR || date.year > SOLAR_TERM_MAX_YEAR) return undefined;

  const terms = supportedTermsAround(date.year);
  const localDate = `${date.year}-${pad(date.month)}-${pad(date.day)}`;
  const boundariesOnBirthDate = terms
    .filter((term) => termLocalDateTime(term, policy).date === localDate)
    .map((term) => toSolarTermFact(term, policy));
  const lichun = toSolarTermFact(getSolarTerm(date.year, 2), policy);

  if (!snapshot.input.time.known) {
    return {
      lichun,
      ...(boundariesOnBirthDate.length > 0 ? { boundariesOnBirthDate } : {}),
    };
  }

  const birthLocalDateTime = `${localDate}T${pad(snapshot.input.time.hour)}:${pad(
    snapshot.input.time.minute,
  )}`;
  const termPairs = terms.map((term) => ({ term, local: termLocalDateTime(term, policy) }));
  const previous = [...termPairs]
    .reverse()
    .find((candidate) => candidate.local.value <= birthLocalDateTime)?.term;
  const next = termPairs.find((candidate) => candidate.local.value > birthLocalDateTime)?.term;

  return {
    ...(previous !== undefined ? { previous: toSolarTermFact(previous, policy) } : {}),
    ...(next !== undefined ? { next: toSolarTermFact(next, policy) } : {}),
    lichun,
    ...(boundariesOnBirthDate.length > 0 ? { boundariesOnBirthDate } : {}),
  };
}

function translatedError(error: unknown): MyeonghwaCalculationError {
  if (error instanceof MyeonghwaCalculationError) return error;

  const message = error instanceof Error ? error.message : 'Unknown calculation failure.';

  if (error instanceof TypeError) {
    return new MyeonghwaCalculationError('INVALID_INPUT', message, error);
  }

  if (error instanceof RangeError) {
    if (/supports|not supported|true-solar-time policy/i.test(message)) {
      return new MyeonghwaCalculationError('UNSUPPORTED_POLICY', message, error);
    }
    if (/연도\(year\)|outside supported range|supported range/i.test(message)) {
      return new MyeonghwaCalculationError('OUTSIDE_SUPPORTED_RANGE', message, error);
    }
    return new MyeonghwaCalculationError('INVALID_INPUT', message, error);
  }

  return new MyeonghwaCalculationError('CALCULATION_FAILED', message, error);
}

export function calculateCanonicalSajuSnapshot(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
  options: CalculationAdapterOptions = {},
): CanonicalSajuSnapshot {
  try {
    const snapshot = calculateAdapterSnapshot(input, policy, options);
    const solarTermContext = buildSolarTermContext(snapshot, policy);
    return solarTermContext === undefined ? snapshot : { ...snapshot, solarTermContext };
  } catch (error) {
    throw translatedError(error);
  }
}

export { manseryeokAdapterMetadata };
export type { CalculationAdapterOptions };
