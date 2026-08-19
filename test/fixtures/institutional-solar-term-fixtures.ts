export interface InstitutionalSolarTermFixture {
  fixtureId: string;
  year: number;
  name: string;
  month: number;
  day: number;
  hour: number;
  minute: number;
  sourceTier: 'B';
  sourceId: string;
}

export const KASI_CALENDAR_DATA_SOURCE = {
  sourceId: 'SRC-KASI-CALENDAR-DATA-2021-2026',
  organization: '한국천문연구원',
  url: 'https://astro.kasi.re.kr/life/post/calendardata',
  sourceTier: 'B',
  authorityClass: 'primary_institution_reference',
  independentFromManseryeok: true,
  retrievedAt: '2026-08-19',
  limitation:
    'KASI page explicitly states that calendar-data pages are not the official announcement and directs users to 월력요항 for official data.',
} as const;

function term(
  fixtureId: string,
  year: number,
  name: string,
  month: number,
  day: number,
  hour: number,
  minute: number,
): InstitutionalSolarTermFixture {
  return {
    fixtureId,
    year,
    name,
    month,
    day,
    hour,
    minute,
    sourceTier: 'B',
    sourceId: KASI_CALENDAR_DATA_SOURCE.sourceId,
  };
}

export const KASI_LICHUN_2021_2026_FIXTURES = [
  term('CAL-TERM-KASI-B-2021-LICHUN', 2021, '입춘', 2, 3, 23, 59),
  term('CAL-TERM-KASI-B-2022-LICHUN', 2022, '입춘', 2, 4, 5, 51),
  term('CAL-TERM-KASI-B-2023-LICHUN', 2023, '입춘', 2, 4, 11, 43),
  term('CAL-TERM-KASI-B-2024-LICHUN', 2024, '입춘', 2, 4, 17, 27),
  term('CAL-TERM-KASI-B-2025-LICHUN', 2025, '입춘', 2, 3, 23, 10),
  term('CAL-TERM-KASI-B-2026-LICHUN', 2026, '입춘', 2, 4, 5, 2),
] as const;

export const KASI_2024_MONTHLY_JIE_FIXTURES = [
  term('CAL-TERM-KASI-B-2024-XIAOHAN', 2024, '소한', 1, 6, 5, 49),
  term('CAL-TERM-KASI-B-2024-LICHUN-MONTH', 2024, '입춘', 2, 4, 17, 27),
  term('CAL-TERM-KASI-B-2024-JINGZHE', 2024, '경칩', 3, 5, 11, 23),
  term('CAL-TERM-KASI-B-2024-QINGMING', 2024, '청명', 4, 4, 16, 2),
  term('CAL-TERM-KASI-B-2024-LIXIA', 2024, '입하', 5, 5, 9, 10),
  term('CAL-TERM-KASI-B-2024-MANGZHONG', 2024, '망종', 6, 5, 13, 10),
  term('CAL-TERM-KASI-B-2024-XIAOSHU', 2024, '소서', 7, 6, 23, 20),
  term('CAL-TERM-KASI-B-2024-LIQIU', 2024, '입추', 8, 7, 9, 9),
  term('CAL-TERM-KASI-B-2024-BAILU', 2024, '백로', 9, 7, 12, 11),
  term('CAL-TERM-KASI-B-2024-HANLU', 2024, '한로', 10, 8, 4, 0),
  term('CAL-TERM-KASI-B-2024-LIDONG', 2024, '입동', 11, 7, 7, 20),
  term('CAL-TERM-KASI-B-2024-DAXUE', 2024, '대설', 12, 7, 0, 17),
] as const;
