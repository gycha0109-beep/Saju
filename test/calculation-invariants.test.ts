import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type BirthInput,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FactState,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
  type YinYang,
} from '../src/index.js';

const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const satisfies readonly HeavenlyStem[];
const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const satisfies readonly EarthlyBranch[];
const ELEMENTS = new Set<FiveElement>(['목', '화', '토', '금', '수']);
const YIN_YANG = new Set<YinYang>(['양', '음']);

const SEXAGENARY_CYCLE = Array.from({ length: 60 }, (_, index) =>
  `${STEMS[index % STEMS.length]}${BRANCHES[index % BRANCHES.length]}`,
);

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i3-invariant',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function inputAt(date: Date, hour = 12): BirthInput {
  return {
    calendarType: 'solar',
    date: {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
    },
    time: { known: true, hour, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
  };
}

function resolvedPillar(state: FactState<PillarFact>): PillarFact {
  if (state.status !== 'resolved') throw new Error(`expected resolved pillar, got ${state.status}`);
  return state.value;
}

function pillarText(state: FactState<PillarFact>): string {
  const pillar = resolvedPillar(state);
  return `${pillar.stem.value}${pillar.branch.value}`;
}

function assertPillarDomain(pillar: PillarFact): void {
  expect(STEMS).toContain(pillar.stem.value);
  expect(BRANCHES).toContain(pillar.branch.value);
  expect(ELEMENTS.has(pillar.stem.element)).toBe(true);
  expect(ELEMENTS.has(pillar.branch.element)).toBe(true);
  expect(YIN_YANG.has(pillar.stem.yinYang)).toBe(true);
  expect(YIN_YANG.has(pillar.branch.yinYang)).toBe(true);
}

describe('calculation invariants', () => {
  test('day pillar advances exactly one sexagenary position across 60 consecutive civil dates', () => {
    const start = Date.UTC(2024, 0, 15);
    const dayPillars = Array.from({ length: 61 }, (_, offset) => {
      const date = new Date(start + offset * 24 * 60 * 60 * 1000);
      return pillarText(calculateCanonicalSajuSnapshot(inputAt(date), policy).pillars.day);
    });

    for (let index = 1; index < dayPillars.length; index += 1) {
      const previous = dayPillars[index - 1];
      const current = dayPillars[index];
      if (previous === undefined || current === undefined) throw new Error('missing day pillar');
      const previousIndex = SEXAGENARY_CYCLE.indexOf(previous);
      const currentIndex = SEXAGENARY_CYCLE.indexOf(current);
      expect(previousIndex).toBeGreaterThanOrEqual(0);
      expect(currentIndex).toBe((previousIndex + 1) % 60);
    }

    expect(new Set(dayPillars.slice(0, 60)).size).toBe(60);
    expect(dayPillars[60]).toBe(dayPillars[0]);
  });

  test('ordinary grid preserves canonical structural invariants', () => {
    const samples = [2021, 2024, 2026].flatMap((year) =>
      Array.from({ length: 12 }, (_, monthIndex) =>
        new Date(Date.UTC(year, monthIndex, 15)),
      ),
    );

    for (const date of samples) {
      const snapshot = calculateCanonicalSajuSnapshot(inputAt(date, 12), policy);
      const pillars = [
        resolvedPillar(snapshot.pillars.year),
        resolvedPillar(snapshot.pillars.month),
        resolvedPillar(snapshot.pillars.day),
        resolvedPillar(snapshot.pillars.hour),
      ];
      for (const pillar of pillars) assertPillarDomain(pillar);

      expect(snapshot.derivedFacts.dayMaster.status).toBe('resolved');
      if (snapshot.derivedFacts.dayMaster.status === 'resolved') {
        expect(snapshot.derivedFacts.dayMaster.value).toEqual(pillars[2]?.stem);
      }

      expect(snapshot.derivedFacts.fiveElementCounts?.status).toBe('resolved');
      if (snapshot.derivedFacts.fiveElementCounts?.status === 'resolved') {
        expect(Object.values(snapshot.derivedFacts.fiveElementCounts.value).reduce((sum, count) => sum + count, 0)).toBe(8);
      }

      expect(snapshot.derivedFacts.tenGods.status).toBe('resolved');
      if (snapshot.derivedFacts.tenGods.status === 'resolved') {
        expect(snapshot.derivedFacts.tenGods.value.day.stem).toEqual({ status: 'resolved', value: '일간' });
      }
    }
  });

  test('policy identity is part of calculation identity even when noon output is unchanged', () => {
    const input = inputAt(new Date(Date.UTC(2024, 2, 10)), 12);
    const midnight = calculateCanonicalSajuSnapshot(input, policy);
    const jasi = calculateCanonicalSajuSnapshot(input, { ...policy, dayBoundary: 'jasi' });

    expect(midnight.pillars).toEqual(jasi.pillars);
    expect(midnight.calculationHash).not.toBe(jasi.calculationHash);
    expect(midnight.snapshotId).not.toBe(jasi.snapshotId);
  });
});
