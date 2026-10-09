import { createHash } from 'node:crypto';
import type {
  CalendarDate,
  CanonicalSajuSnapshot,
  ClockTime,
  LuckCycleFact,
  PillarFact,
} from '../contracts/calculation.js';

export const DAYUN_TEMPORAL_CONTEXT_POLICY = Object.freeze({
  policyId: 'myeongha/dayun-temporal-context-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2284',
  sourceRule: 'CONSUME_CANONICAL_LUCK_CYCLE_ONLY',
  precisionRule: 'USE_START_YEARS_MONTHS_DAYS_NOT_ROUNDED_START_AGE',
  boundaryRule: 'CIVIL_CALENDAR_OFFSET_WITH_END_OF_MONTH_CLAMP',
  intervalRule: 'HALF_OPEN_START_INCLUSIVE_END_EXCLUSIVE',
  periodRule: 'TEN_CALENDAR_YEARS_PER_CANONICAL_LUCK_PILLAR',
  semanticRule: 'NO_INTERPRETATION_OR_POLARITY',
  extendsDecisionRef: 'GH-2277',
} as const);

export const DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH = createHash('sha256')
  .update(JSON.stringify(DAYUN_TEMPORAL_CONTEXT_POLICY))
  .digest('hex');

interface CivilDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface DayunTemporalSegment {
  index: number;
  ageMarker: number;
  pillar: PillarFact;
  startLocalDateTime: string;
  endExclusiveLocalDateTime: string;
  annualOverlapStartLocalDateTime: string;
  annualOverlapEndExclusiveLocalDateTime: string;
}

export interface ResolvedDayunTemporalContext {
  status: 'resolved';
  contextId: string;
  snapshotId: string;
  targetYear: number;
  timeZone: 'Asia/Seoul';
  direction: LuckCycleFact['direction'];
  startPrecision: {
    startAge: number;
    startYears: number;
    startMonths: number;
    startDays: number;
  };
  segments: readonly DayunTemporalSegment[];
}

export interface UnavailableDayunTemporalContext {
  status: 'unavailable';
  snapshotId: string;
  targetYear: number;
  reasonCode:
    | 'invalid_target_year'
    | 'luck_cycle_unavailable'
    | 'birth_solar_date_unavailable'
    | 'birth_clock_time_unavailable'
    | 'unsupported_time_zone'
    | 'detailed_start_unavailable'
    | 'malformed_luck_cycle'
    | 'target_before_first_dayun'
    | 'target_after_available_dayun_range';
}

export type DayunTemporalContextResolution =
  | ResolvedDayunTemporalContext
  | UnavailableDayunTemporalContext;

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function clampDay(year: number, month: number, day: number): number {
  return Math.min(day, daysInMonth(year, month));
}

function addCalendarYears(value: CivilDateTime, years: number): CivilDateTime {
  const year = value.year + years;
  return {
    ...value,
    year,
    day: clampDay(year, value.month, value.day),
  };
}

function addCalendarMonths(value: CivilDateTime, months: number): CivilDateTime {
  const zeroBased = value.month - 1 + months;
  const year = value.year + Math.floor(zeroBased / 12);
  const month = ((zeroBased % 12) + 12) % 12 + 1;
  return {
    ...value,
    year,
    month,
    day: clampDay(year, month, value.day),
  };
}

function addCalendarDays(value: CivilDateTime, days: number): CivilDateTime {
  const instant = new Date(
    Date.UTC(
      value.year,
      value.month - 1,
      value.day + days,
      value.hour,
      value.minute,
    ),
  );
  return {
    year: instant.getUTCFullYear(),
    month: instant.getUTCMonth() + 1,
    day: instant.getUTCDate(),
    hour: instant.getUTCHours(),
    minute: instant.getUTCMinutes(),
  };
}

function applyStartOffset(
  birthDate: CalendarDate,
  birthTime: ClockTime,
  startYears: number,
  startMonths: number,
  startDays: number,
): CivilDateTime {
  let value: CivilDateTime = {
    year: birthDate.year,
    month: birthDate.month,
    day: birthDate.day,
    hour: birthTime.hour,
    minute: birthTime.minute,
  };
  value = addCalendarYears(value, startYears);
  value = addCalendarMonths(value, startMonths);
  value = addCalendarDays(value, startDays);
  return value;
}

function scalar(value: CivilDateTime): number {
  return Date.UTC(
    value.year,
    value.month - 1,
    value.day,
    value.hour,
    value.minute,
  );
}

function format(value: CivilDateTime): string {
  const pad = (item: number): string => String(item).padStart(2, '0');
  return `${String(value.year).padStart(4, '0')}-${pad(value.month)}-${pad(
    value.day,
  )}T${pad(value.hour)}:${pad(value.minute)}`;
}

function later(left: CivilDateTime, right: CivilDateTime): CivilDateTime {
  return scalar(left) >= scalar(right) ? left : right;
}

function earlier(left: CivilDateTime, right: CivilDateTime): CivilDateTime {
  return scalar(left) <= scalar(right) ? left : right;
}

function unavailable(
  snapshot: CanonicalSajuSnapshot,
  targetYear: number,
  reasonCode: UnavailableDayunTemporalContext['reasonCode'],
): UnavailableDayunTemporalContext {
  return {
    status: 'unavailable',
    snapshotId: snapshot.snapshotId,
    targetYear,
    reasonCode,
  };
}

function validStartPart(value: number | undefined): value is number {
  return value !== undefined && Number.isInteger(value) && value >= 0;
}

function luckCycleShapeValid(cycle: LuckCycleFact): boolean {
  if (
    !Number.isInteger(cycle.start.age) ||
    cycle.start.age < 1 ||
    cycle.pillars.length === 0
  ) {
    return false;
  }

  return cycle.pillars.every(
    (item, index) =>
      Number.isInteger(item.age) &&
      item.age === cycle.start.age + index * 10,
  );
}

export function resolveDayunTemporalContext(
  snapshot: CanonicalSajuSnapshot,
  targetYear: number,
): DayunTemporalContextResolution {
  if (!Number.isInteger(targetYear) || targetYear < 1) {
    return unavailable(snapshot, targetYear, 'invalid_target_year');
  }

  if (snapshot.luckCycle.status !== 'resolved') {
    return unavailable(snapshot, targetYear, 'luck_cycle_unavailable');
  }
  if (snapshot.normalized.solarDate.status !== 'resolved') {
    return unavailable(snapshot, targetYear, 'birth_solar_date_unavailable');
  }
  if (snapshot.normalized.clockTime.status !== 'resolved') {
    return unavailable(snapshot, targetYear, 'birth_clock_time_unavailable');
  }
  if (snapshot.normalized.timeZone !== 'Asia/Seoul') {
    return unavailable(snapshot, targetYear, 'unsupported_time_zone');
  }

  const cycle = snapshot.luckCycle.value;
  const { years, months, days } = cycle.start;
  if (
    !validStartPart(years) ||
    !validStartPart(months) ||
    !validStartPart(days) ||
    months >= 12 ||
    days >= 30
  ) {
    return unavailable(snapshot, targetYear, 'detailed_start_unavailable');
  }
  if (!luckCycleShapeValid(cycle)) {
    return unavailable(snapshot, targetYear, 'malformed_luck_cycle');
  }

  const firstStart = applyStartOffset(
    snapshot.normalized.solarDate.value,
    snapshot.normalized.clockTime.value,
    years,
    months,
    days,
  );
  const annualStart: CivilDateTime = {
    year: targetYear,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
  };
  const annualEnd: CivilDateTime = {
    year: targetYear + 1,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
  };
  const lastEnd = addCalendarYears(firstStart, cycle.pillars.length * 10);

  if (scalar(annualEnd) <= scalar(firstStart)) {
    return unavailable(snapshot, targetYear, 'target_before_first_dayun');
  }
  if (scalar(annualStart) >= scalar(lastEnd)) {
    return unavailable(
      snapshot,
      targetYear,
      'target_after_available_dayun_range',
    );
  }

  const segments: DayunTemporalSegment[] = [];
  cycle.pillars.forEach((item, index) => {
    const start = addCalendarYears(firstStart, index * 10);
    const end = addCalendarYears(firstStart, (index + 1) * 10);
    const overlapStart = later(start, annualStart);
    const overlapEnd = earlier(end, annualEnd);
    if (scalar(overlapStart) >= scalar(overlapEnd)) return;

    segments.push({
      index,
      ageMarker: item.age,
      pillar: item.pillar,
      startLocalDateTime: format(start),
      endExclusiveLocalDateTime: format(end),
      annualOverlapStartLocalDateTime: format(overlapStart),
      annualOverlapEndExclusiveLocalDateTime: format(overlapEnd),
    });
  });

  if (segments.length === 0) {
    return scalar(annualStart) < scalar(firstStart)
      ? unavailable(snapshot, targetYear, 'target_before_first_dayun')
      : unavailable(
          snapshot,
          targetYear,
          'target_after_available_dayun_range',
        );
  }

  const startPrecision = {
    startAge: cycle.start.age,
    startYears: years,
    startMonths: months,
    startDays: days,
  };
  const identityMaterial = {
    policyContentHash: DAYUN_TEMPORAL_CONTEXT_POLICY_CONTENT_HASH,
    snapshotId: snapshot.snapshotId,
    targetYear,
    direction: cycle.direction,
    startPrecision,
    segments,
  };
  const contextId = `dayun_temporal_${createHash('sha256')
    .update(JSON.stringify(canonicalize(identityMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    status: 'resolved',
    contextId,
    snapshotId: snapshot.snapshotId,
    targetYear,
    timeZone: 'Asia/Seoul',
    direction: cycle.direction,
    startPrecision,
    segments,
  };
}
