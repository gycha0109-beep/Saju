const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;
const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;
const SEXAGENARY_BASE_YEAR = 1984;

export interface AnnualSexagenaryPillar {
  stem: (typeof STEMS)[number];
  branch: (typeof BRANCHES)[number];
  cycleIndex: number;
}

export class TemporalReadingContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TemporalReadingContextError';
  }
}

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

/** Pure year-to-pillar mapping; does not decide the calendar boundary. */
export function annualSexagenaryPillar(year: number): AnnualSexagenaryPillar {
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
