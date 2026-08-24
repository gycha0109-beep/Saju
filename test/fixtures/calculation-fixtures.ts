import type { BirthInput, CalculationPolicySnapshot } from '../../src/index.js';

export type FixtureSourceTier = 'A' | 'B' | 'C' | 'D' | 'E';

export type FixtureAuthorityClass =
  | 'official_announcement'
  | 'primary_institution_reference'
  | 'primary_software_reference'
  | 'cross_engine_reference'
  | 'upstream_regression'
  | 'internal_regression';

export interface FixtureSource {
  sourceId: string;
  title: string;
  organization: string;
  url: string;
  sourceTier: FixtureSourceTier;
  authorityClass: FixtureAuthorityClass;
  retrievedAt: string;
  independentFromManseryeok: boolean | 'partial' | 'unknown';
  notes?: string;
}

export interface FixtureProvenance {
  sourceIds: readonly string[];
  reviewStatus: 'verified' | 'provisional' | 'upstream-only';
  notes?: string;
}

export const CALCULATION_FIXTURE_SOURCES = {
  kasi2021AlmanacRelease: {
    sourceId: 'SRC-KASI-2021-ALMANAC-RELEASE',
    title: '2021년도 월력요항 발표',
    organization: '한국천문연구원 / 과학기술정보통신부',
    url: 'https://www.kasi.re.kr/kor/publication/post/newsMaterial/28495',
    sourceTier: 'A',
    authorityClass: 'official_announcement',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      '공식 월력요항 발표 본문에서 설날(음 1월 1일)=2021-02-12, 추석(음 8월 15일)=2021-09-21을 명시한다.',
  },
  kasi2022AlmanacRelease: {
    sourceId: 'SRC-KASI-2022-ALMANAC-RELEASE',
    title: '2022년도 월력요항 발표',
    organization: '한국천문연구원 / 과학기술정보통신부',
    url: 'https://www.kasi.re.kr/kor/publication/post/newsMaterial/28806',
    sourceTier: 'A',
    authorityClass: 'official_announcement',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      '공식 월력요항 발표 본문에서 설날(음 1월 1일)=2022-02-01, 추석(음 8월 15일)=2022-09-10을 명시한다.',
  },
  kasi2023AlmanacRelease: {
    sourceId: 'SRC-KASI-2023-ALMANAC-RELEASE',
    title: '2023년도 월력요항 발표',
    organization: '한국천문연구원 / 과학기술정보통신부',
    url: 'https://www.kasi.re.kr/kor/publication/post/newsMaterial/29168',
    sourceTier: 'A',
    authorityClass: 'official_announcement',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      '공식 월력요항 발표 본문에서 설날(음 1월 1일)=2023-01-22, 추석(음 8월 15일)=2023-09-29을 명시한다.',
  },
  kasi2024AlmanacRelease: {
    sourceId: 'SRC-KASI-2024-ALMANAC-RELEASE',
    title: '2024년도 월력요항 발표',
    organization: '한국천문연구원 / 과학기술정보통신부',
    url: 'https://www.kasi.re.kr/kor/publication/post/newsMaterial/29633?cPage=7',
    sourceTier: 'A',
    authorityClass: 'official_announcement',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      '공식 월력요항 발표 본문에서 설날(음 1월 1일)=2024-02-10, 추석(음 8월 15일)=2024-09-17을 명시한다.',
  },
  kasi2025AlmanacRelease: {
    sourceId: 'SRC-KASI-2025-ALMANAC-RELEASE',
    title: '2025년도 월력요항 발표',
    organization: '한국천문연구원 / 우주항공청',
    url: 'https://www.kasi.re.kr/kor/publication/post/newsMaterial/30071',
    sourceTier: 'A',
    authorityClass: 'official_announcement',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      '공식 월력요항 발표 본문에서 설날(음 1월 1일)=2025-01-29, 추석(음 8월 15일)=2025-10-06을 명시한다.',
  },
  kasi2026AlmanacRelease: {
    sourceId: 'SRC-KASI-2026-ALMANAC-RELEASE',
    title: '2026년도 월력요항 발표',
    organization: '한국천문연구원 / 우주항공청',
    url: 'https://www.kasi.re.kr/kor/post/newsMaterial/32031',
    sourceTier: 'A',
    authorityClass: 'official_announcement',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      '공식 월력요항 발표 본문에서 설날(음 1월 1일)=2026-02-17, 추석(음 8월 15일)=2026-09-25을 명시한다.',
  },
  kasi2024CalendarData: {
    sourceId: 'SRC-KASI-2024-CALENDAR-DATA',
    title: '2024년 달력자료',
    organization: '한국천문연구원',
    url: 'https://astro.kasi.re.kr/life/post/calendardata',
    sourceTier: 'B',
    authorityClass: 'primary_institution_reference',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      'KASI가 공개한 2024 달력자료. 페이지 자체가 공식 발표 자료가 아니며 공식 발표는 월력요항을 보라고 명시하므로 Tier A로 승격하지 않는다. 2024 입춘 2월 4일 17:27을 제공한다.',
  },
  ianaTzdb2026cAsia: {
    sourceId: 'SRC-IANA-TZDB-2026C-ASIA',
    title: 'IANA Time Zone Database 2026c — asia',
    organization: 'Internet Assigned Numbers Authority (IANA)',
    url: 'https://data.iana.org/time-zones/tzdb-2026c/asia',
    sourceTier: 'A',
    authorityClass: 'primary_software_reference',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: true,
    notes:
      'Asia/Seoul의 1954-1961 +08:30 구간과 ROK 1955 및 1987-1988 DST rules를 직접 제공한다. tzdb 자체 주석은 역사 자료가 완전한 법적 authority가 아님을 경고하므로 해당 한계도 provenance에 유지한다.',
  },
  manseryeok200Golden: {
    sourceId: 'SRC-MANSERYEOK-2.0.0-GOLDEN',
    title: 'manseryeok 2.0.0 golden.test.ts',
    organization: 'yhj1024/manseryeok',
    url: 'https://github.com/yhj1024/manseryeok/blob/main/src/golden.test.ts',
    sourceTier: 'D',
    authorityClass: 'upstream_regression',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: false,
  },
  manseryeok200IndexTests: {
    sourceId: 'SRC-MANSERYEOK-2.0.0-INDEX-TESTS',
    title: 'manseryeok 2.0.0 index.test.ts',
    organization: 'yhj1024/manseryeok',
    url: 'https://github.com/yhj1024/manseryeok/blob/main/src/index.test.ts',
    sourceTier: 'D',
    authorityClass: 'upstream_regression',
    retrievedAt: '2026-08-19',
    independentFromManseryeok: false,
  },
} as const satisfies Record<string, FixtureSource>;

export const DEFAULT_CALCULATION_POLICY: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/test-default',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: {
    source: 'service-default',
    timeZone: 'Asia/Seoul',
  },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

interface OfficialLunarFixtureDefinition {
  fixtureId: string;
  input: BirthInput;
  expectedSolarDate: { year: number; month: number; day: number };
  provenance: FixtureProvenance;
}

function officialLunarFixture(
  fixtureId: string,
  lunarDate: { year: number; month: number; day: number },
  expectedSolarDate: { year: number; month: number; day: number },
  sourceId: string,
): OfficialLunarFixtureDefinition {
  return {
    fixtureId,
    input: {
      calendarType: 'lunar',
      date: lunarDate,
      isLeapMonth: false,
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    expectedSolarDate,
    provenance: {
      sourceIds: [sourceId],
      reviewStatus: 'verified',
      notes: '공식 월력요항 발표 본문에 명시된 전통명절 날짜를 독립 lunar-to-solar fixture로 사용한다.',
    },
  };
}

export const KASI_OFFICIAL_LUNAR_FIXTURES = [
  officialLunarFixture(
    'CAL-LUNAR-KASI-2021-NEW-YEAR',
    { year: 2021, month: 1, day: 1 },
    { year: 2021, month: 2, day: 12 },
    CALCULATION_FIXTURE_SOURCES.kasi2021AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2021-CHUSEOK',
    { year: 2021, month: 8, day: 15 },
    { year: 2021, month: 9, day: 21 },
    CALCULATION_FIXTURE_SOURCES.kasi2021AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2022-NEW-YEAR',
    { year: 2022, month: 1, day: 1 },
    { year: 2022, month: 2, day: 1 },
    CALCULATION_FIXTURE_SOURCES.kasi2022AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2022-CHUSEOK',
    { year: 2022, month: 8, day: 15 },
    { year: 2022, month: 9, day: 10 },
    CALCULATION_FIXTURE_SOURCES.kasi2022AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2023-NEW-YEAR',
    { year: 2023, month: 1, day: 1 },
    { year: 2023, month: 1, day: 22 },
    CALCULATION_FIXTURE_SOURCES.kasi2023AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2023-CHUSEOK',
    { year: 2023, month: 8, day: 15 },
    { year: 2023, month: 9, day: 29 },
    CALCULATION_FIXTURE_SOURCES.kasi2023AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2024-NEW-YEAR',
    { year: 2024, month: 1, day: 1 },
    { year: 2024, month: 2, day: 10 },
    CALCULATION_FIXTURE_SOURCES.kasi2024AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2024-CHUSEOK',
    { year: 2024, month: 8, day: 15 },
    { year: 2024, month: 9, day: 17 },
    CALCULATION_FIXTURE_SOURCES.kasi2024AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2025-NEW-YEAR',
    { year: 2025, month: 1, day: 1 },
    { year: 2025, month: 1, day: 29 },
    CALCULATION_FIXTURE_SOURCES.kasi2025AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2025-CHUSEOK',
    { year: 2025, month: 8, day: 15 },
    { year: 2025, month: 10, day: 6 },
    CALCULATION_FIXTURE_SOURCES.kasi2025AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2026-NEW-YEAR',
    { year: 2026, month: 1, day: 1 },
    { year: 2026, month: 2, day: 17 },
    CALCULATION_FIXTURE_SOURCES.kasi2026AlmanacRelease.sourceId,
  ),
  officialLunarFixture(
    'CAL-LUNAR-KASI-2026-CHUSEOK',
    { year: 2026, month: 8, day: 15 },
    { year: 2026, month: 9, day: 25 },
    CALCULATION_FIXTURE_SOURCES.kasi2026AlmanacRelease.sourceId,
  ),
] as const;

export const KASI_2024_LICHUN_FIXTURE = {
  fixtureId: 'CAL-TERM-KASI-2024-LICHUN',
  category: 'solar-term',
  input: {
    calendarType: 'solar',
    date: { year: 2024, month: 2, day: 4 },
    time: { known: true, hour: 17, minute: 26 },
    sexForTraditionalCalculation: 'unspecified',
  } satisfies BirthInput,
  expected: {
    name: '입춘',
    localDateTime: '2024-02-04T17:27',
  },
  provenance: {
    sourceIds: [CALCULATION_FIXTURE_SOURCES.kasi2024CalendarData.sourceId],
    reviewStatus: 'provisional',
    notes: 'KASI primary-institution reference이지만 공식 월력요항/관보 원문 대조 전까지 Tier B.',
  },
} as const;

export const IANA_1955_STANDARD_TIME_FIXTURE = {
  fixtureId: 'CAL-TZ-IANA-1955-STANDARD-OFFSET',
  category: 'historical-timezone',
  input: {
    calendarType: 'solar',
    date: { year: 1955, month: 1, day: 15 },
    time: { known: true, hour: 9, minute: 15 },
    sexForTraditionalCalculation: 'unspecified',
  } satisfies BirthInput,
  expected: {
    historicalHourBranch: '사',
    fixedKstHourBranch: '진',
    standardOffsetDuringDate: '+08:30',
  },
  provenance: {
    sourceIds: [CALCULATION_FIXTURE_SOURCES.ianaTzdb2026cAsia.sourceId],
    reviewStatus: 'verified',
    notes:
      'IANA Asia/Seoul zone line은 1954-03-21부터 1961-08-10까지 +08:30 base offset과 ROK rules를 사용한다.',
  },
} as const;

export const IANA_1988_DST_FIXTURE = {
  fixtureId: 'CAL-TZ-IANA-1988-DST',
  category: 'historical-timezone',
  input: {
    calendarType: 'solar',
    date: { year: 1988, month: 8, day: 15 },
    time: { known: true, hour: 9, minute: 50 },
    sexForTraditionalCalculation: 'unspecified',
  } satisfies BirthInput,
  expected: {
    historicalHourBranch: '진',
    noHistoricalHourBranch: '사',
    dstSaveMinutes: 60,
  },
  provenance: {
    sourceIds: [CALCULATION_FIXTURE_SOURCES.ianaTzdb2026cAsia.sourceId],
    reviewStatus: 'verified',
    notes:
      'IANA ROK rule은 1987-1988년 5월 둘째 일요일부터 10월 둘째 일요일까지 1시간 DST를 적용한다.',
  },
} as const;

export const UPSTREAM_1992_GOLDEN_FIXTURE = {
  fixtureId: 'CAL-UPSTREAM-1992-GOLDEN',
  category: 'ordinary-four-pillars',
  input: {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'male',
  } satisfies BirthInput,
  expectedPillars: ['임신', '경술', '계유', '을묘'] as const,
  provenance: {
    sourceIds: [CALCULATION_FIXTURE_SOURCES.manseryeok200Golden.sourceId],
    reviewStatus: 'upstream-only',
    notes:
      'Upstream regression fixture. 원 KASI 근거를 독립적으로 추적하기 전에는 Tier A라고 부르지 않는다.',
  },
} as const;
