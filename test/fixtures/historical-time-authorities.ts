import type { BirthInput } from '../../src/index.js';

export interface HistoricalTimeAuthoritySource {
  sourceId: string;
  title: string;
  organization: string;
  url: string;
  authorityKind: 'primary_legal_reference' | 'primary_software_reference';
  retrievedAt: string;
  supports: readonly string[];
  notes?: string;
}

export const HISTORICAL_TIME_AUTHORITY_SOURCES = {
  korea1908StandardTimeDecree: {
    sourceId: 'SRC-KR-GAZETTE-1908-STANDARD-TIME',
    title: '大韓國標準時에關한件 — 칙령 제5호, 관보 제3994호',
    organization: '대한민국사연구소 한국근대사료DB / 대한제국 관보',
    url: 'https://db.history.go.kr/modern/gb/level.do?levelId=gbdh_1908_02_11_a03994_00010',
    authorityKind: 'primary_legal_reference',
    retrievedAt: '2026-08-19',
    supports: [
      '127 degrees 30 minutes east mean time defined as national standard time',
      'legal effective date 1908-04-01',
      'the decree describes this meridian time as the previously customary Seoul time',
    ],
    notes:
      '1908-04-01 이전에는 이 칙령에 따른 국가 표준시 제도가 아직 시행되지 않았다. 명화는 그 이전 civil-time history를 +09:00으로 추정하지 않는다.',
  },
  korea1954StandardMeridianLaw: {
    sourceId: 'SRC-KR-LAW-1954-STANDARD-MERIDIAN',
    title: '표준자오선변경에관한건 — 대통령령 제876호',
    organization: '대한민국 국가법령정보센터',
    url: 'https://law.go.kr/LSW/lsInfoP.do?lsiSeq=31221&viewCls=lsRvsDocInfoR',
    authorityKind: 'primary_legal_reference',
    retrievedAt: '2026-08-19',
    supports: [
      'effective date 1954-03-21',
      'standard meridian changed to 127 degrees 30 minutes east',
      'civil standard offset corresponds to UTC+08:30',
    ],
    notes:
      '법령 원자료는 1954년 표준자오선 변경의 제도적 근거다. 사주 시주 자체를 직접 증명하는 자료로 사용하지 않는다.',
  },
  korea1961StandardMeridianLaw: {
    sourceId: 'SRC-KR-LAW-1961-STANDARD-MERIDIAN',
    title: '표준자오선변경에관한법률 — 법률 제676호',
    organization: '대한민국 국가법령정보센터',
    url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=54666',
    authorityKind: 'primary_legal_reference',
    retrievedAt: '2026-08-19',
    supports: [
      'effective date 1961-08-10',
      'standard meridian changed to 135 degrees east',
      '00:00 transition advanced to 00:30',
      'civil standard offset corresponds to UTC+09:00',
    ],
    notes:
      '법령 원자료는 1961년 표준자오선 복귀의 제도적 근거다. 사주 시주 자체를 직접 증명하는 자료로 사용하지 않는다.',
  },
  ianaTzdb2026cAsia: {
    sourceId: 'SRC-IANA-TZDB-2026C-ASIA-HISTORICAL-CROSSCHECK',
    title: 'IANA Time Zone Database 2026c — asia',
    organization: 'Internet Assigned Numbers Authority (IANA)',
    url: 'https://data.iana.org/time-zones/tzdb-2026c/asia',
    authorityKind: 'primary_software_reference',
    retrievedAt: '2026-08-19',
    supports: [
      'Asia/Seoul LMT +08:27:52 before 1908-04-01',
      'Asia/Seoul +08:30 from 1908-04-01',
      'Asia/Seoul +09:00 from 1912-01-01',
      'Asia/Seoul +08:30 from 1954-03-21',
      'Asia/Seoul +09:00 from 1961-08-10',
    ],
    notes:
      '소프트웨어 시간대 구현의 primary reference로 사용한다. tzdb 자체도 역사 자료가 절대적 법적 authority는 아니라고 경고하므로, 가능한 구간은 한국 법령/관보 원자료와 교차확인한다.',
  },
} as const satisfies Record<string, HistoricalTimeAuthoritySource>;

function birthInput(year: number, month: number, day: number): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour: 22, minute: 45 },
    sexForTraditionalCalculation: 'unspecified',
  };
}

export const PRE_1908_HISTORICAL_TIME_UNSUPPORTED_FIXTURE = {
  fixtureId: 'CAL-TZ-PRE-1908-HISTORICAL-UNSUPPORTED',
  input: {
    calendarType: 'solar',
    date: { year: 1907, month: 12, day: 1 },
    time: { known: true, hour: 22, minute: 40 },
    sexForTraditionalCalculation: 'unspecified',
  } satisfies BirthInput,
  expectedErrorCode: 'UNSUPPORTED_POLICY',
  provenance: {
    sourceIds: [
      HISTORICAL_TIME_AUTHORITY_SOURCES.korea1908StandardTimeDecree.sourceId,
      HISTORICAL_TIME_AUTHORITY_SOURCES.ianaTzdb2026cAsia.sourceId,
    ],
    reason:
      'The pinned upstream historical-time table falls back to UTC+09:00 before its first 1908 epoch, while IANA represents Seoul with LMT +08:27:52 and the Korean legal national-standard-time regime begins on 1908-04-01. Myeonghwa must not silently choose the upstream +09:00 fallback as historical authority.',
  },
} as const;

export const KOREA_1954_STANDARD_TIME_TRANSITION_FIXTURE = {
  fixtureId: 'CAL-TZ-KR-LAW-IANA-1954-TRANSITION',
  before: birthInput(1954, 3, 20),
  after: birthInput(1954, 3, 21),
  expected: {
    beforeHistoricalHourBranch: '해',
    afterHistoricalHourBranch: '자',
    afterFixedKstHourBranch: '해',
  },
  provenance: {
    sourceIds: [
      HISTORICAL_TIME_AUTHORITY_SOURCES.korea1954StandardMeridianLaw.sourceId,
      HISTORICAL_TIME_AUTHORITY_SOURCES.ianaTzdb2026cAsia.sourceId,
    ],
    derivation:
      'At longitude 135 with equation-of-time disabled, UTC+08:30 advances local apparent solar time by 30 minutes relative to fixed UTC+09:00. The 22:45 wall-time fixture therefore crosses the 23:00 hour-branch boundary only after the legal transition.',
  },
} as const;

export const KOREA_1961_STANDARD_TIME_TRANSITION_FIXTURE = {
  fixtureId: 'CAL-TZ-KR-LAW-IANA-1961-TRANSITION',
  before: birthInput(1961, 8, 9),
  after: birthInput(1961, 8, 10),
  expected: {
    beforeHistoricalHourBranch: '자',
    beforeFixedKstHourBranch: '해',
    afterHistoricalHourBranch: '해',
    afterFixedKstHourBranch: '해',
  },
  provenance: {
    sourceIds: [
      HISTORICAL_TIME_AUTHORITY_SOURCES.korea1961StandardMeridianLaw.sourceId,
      HISTORICAL_TIME_AUTHORITY_SOURCES.ianaTzdb2026cAsia.sourceId,
    ],
    derivation:
      'Before 1961-08-10 the +08:30 civil offset makes longitude-135 apparent solar time 30 minutes later than fixed +09:00; from the legal transition date both use +09:00. The fixture isolates that transition with equation-of-time disabled.',
  },
} as const;
