import type { BirthInput } from '../../src/index.js';

export interface InstitutionalLeapMonthFixture {
  fixtureId: string;
  input: BirthInput;
  expectedSolarDate: { year: number; month: number; day: number };
  sourceTier: 'B';
  sourceId: string;
}

export const KASI_LEAP_MONTH_SOURCE = {
  sourceId: 'SRC-KASI-CALENDAR-DATA-LEAP-MONTHS',
  organization: '한국천문연구원',
  url: 'https://astro.kasi.re.kr/life/post/calendardata',
  sourceTier: 'B',
  authorityClass: 'primary_institution_reference',
  independentFromManseryeok: true,
  retrievedAt: '2026-08-19',
  limitation:
    'KASI calendar-data page explicitly states it is not the official announcement; official 월력요항 remains the upgrade target.',
} as const;

export const KASI_LEAP_MONTH_FIXTURES = [
  {
    fixtureId: 'CAL-LUNAR-KASI-B-2023-LEAP-2-1',
    input: {
      calendarType: 'lunar',
      date: { year: 2023, month: 2, day: 1 },
      isLeapMonth: true,
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    expectedSolarDate: { year: 2023, month: 3, day: 22 },
    sourceTier: 'B',
    sourceId: KASI_LEAP_MONTH_SOURCE.sourceId,
  },
  {
    fixtureId: 'CAL-LUNAR-KASI-B-2025-LEAP-6-1',
    input: {
      calendarType: 'lunar',
      date: { year: 2025, month: 6, day: 1 },
      isLeapMonth: true,
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    expectedSolarDate: { year: 2025, month: 7, day: 25 },
    sourceTier: 'B',
    sourceId: KASI_LEAP_MONTH_SOURCE.sourceId,
  },
] as const satisfies readonly InstitutionalLeapMonthFixture[];
