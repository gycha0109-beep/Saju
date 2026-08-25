import { getSolarTerm, getSolarTermsOfYear, lunarToSolar, type SolarTerm } from 'manseryeok';
import type {
  BirthInput,
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
  SolarTermContext,
  SolarTermFact,
} from '../contracts/calculation.js';
import {
  assertBirthInput,
  assertCalculationPolicySnapshot,
} from '../contracts/runtime-validation.js';
import { enrichCanonicalBranchClashContexts } from './branch-clash-context-facts.js';
import { enrichCanonicalBranchClashQualifierObservations } from './branch-clash-qualifier-observation-facts.js';
import { enrichCanonicalHiddenStems } from './hidden-stems.js';
import {
  calculateCanonicalSajuSnapshot as calculateAdapterSnapshot,
  manseryeokAdapterMetadata,
  type CalculationAdapterOptions,
} from './manseryeok-adapter.js';
import { enrichCanonicalStructuralRelations } from './structural-relation-facts.js';

const SOLAR_TERM_MIN_YEAR = 1800;
const SOLAR_TERM_MAX_YEAR = 2300;
const FIXED_KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DEFAULT_MAX_SCENARIO_COUNT = 32;
const HISTORICAL_CIVIL_TIME_MIN_DATE = 19080401;
const HISTORICAL_CIVIL_TIME_MIN_DATE_LABEL = '1908-04-01';

export type CalculationErrorCode =
  | 'INVALID_INPUT'
  | 'UNSUPPORTED_POLICY'
  | 'OUTSIDE_SUPPORTED_RANGE'
  | 'SCENARIO_LIMIT_EXCEEDED'
  | 'CALCULATION_FAILED';

export interface CalculationEngineOptions extends CalculationAdapterOptions {
  maxScenarioCount?: number;
}

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

function inputSolarDate(input: BirthInput): { year: number; month: number; day: number } {
  if (input.calendarType === 'solar') return input.date;
  return lunarToSolar(
    input.date.year,
    input.date.month,
    input.date.day,
    input.isLeapMonth ?? false,
  );
}

function dateKey(date: { year: number; month: number; day: number }): number {
  return date.year * 10000 + date.month * 100 + date.day;
}

function enforceHistoricalCivilTimeSupport(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): void {
  if (!useHistoricalCivilTime(policy)) return;
  const solarDate = inputSolarDate(input);
  if (dateKey(solarDate) >= HISTORICAL_CIVIL_TIME_MIN_DATE) return;

  throw new MyeonghwaCalculationError(
    'UNSUPPORTED_POLICY',
    `Historical Korean civil-time correction is not supported before ${HISTORICAL_CIVIL_TIME_MIN_DATE_LABEL}; the pinned calculation core falls back to UTC+09:00 before its first historical epoch while independent historical references do not support treating that fallback as authoritative.`,
  );
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

function scenarioLimit(options: CalculationEngineOptions): number {
  const value = options.maxScenarioCount ?? DEFAULT_MAX_SCENARIO_COUNT;
  if (!Number.isInteger(value) || value < 1) {
    throw new MyeonghwaCalculationError(
      'INVALID_INPUT',
      `maxScenarioCount must be a positive integer: ${String(value)}`,
    );
  }
  return value;
}

function enforceScenarioLimit(
  snapshot: CanonicalSajuSnapshot,
  options: CalculationEngineOptions,
): void {
  const limit = scenarioLimit(options);
  if (snapshot.scenarios.length > limit) {
    throw new MyeonghwaCalculationError(
      'SCENARIO_LIMIT_EXCEEDED',
      `Calculation produced ${snapshot.scenarios.length} scenarios, exceeding configured limit ${limit}.`,
    );
  }
}

export function calculateCanonicalSajuSnapshot(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
  options: CalculationEngineOptions = {},
): CanonicalSajuSnapshot {
  try {
    assertBirthInput(input);
    assertCalculationPolicySnapshot(policy);
    enforceHistoricalCivilTimeSupport(input, policy);
    const adapterSnapshot = calculateAdapterSnapshot(input, policy, options);
    const hiddenStemSnapshot = enrichCanonicalHiddenStems(adapterSnapshot);
    const structuralRelationSnapshot = enrichCanonicalStructuralRelations(hiddenStemSnapshot);
    const branchClashContextSnapshot = enrichCanonicalBranchClashContexts(structuralRelationSnapshot);
    const snapshot = enrichCanonicalBranchClashQualifierObservations(branchClashContextSnapshot);
    enforceScenarioLimit(snapshot, options);
    const solarTermContext = buildSolarTermContext(snapshot, policy);
    return solarTermContext === undefined ? snapshot : { ...snapshot, solarTermContext };
  } catch (error) {
    throw translatedError(error);
  }
}

export const calculationHistoricalCivilTimeSupport = Object.freeze({
  earliestSupportedSolarDate: HISTORICAL_CIVIL_TIME_MIN_DATE_LABEL,
  behaviorBeforeEarliestSupportedDate: 'reject' as const,
});

export { manseryeokAdapterMetadata };
