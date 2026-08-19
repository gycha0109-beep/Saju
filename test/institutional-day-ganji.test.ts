import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
  type FactState,
  type PillarFact,
} from '../src/index.js';

const source = {
  sourceId: 'SRC-KASI-MONTHLY-LUNISOLAR-2026-06',
  organization: '한국천문연구원',
  url: 'https://astro.kasi.re.kr/life/pageView/5',
  sourceTier: 'B',
  authorityClass: 'primary_institution_reference',
  limitation:
    'The page labels the column 음력간지; this fixture uses only the daily 日干支 anchor and does not treat its month label as the Saju solar-term month pillar.',
} as const;

const fixtures = [
  { date: { year: 2026, month: 6, day: 1 }, expectedDayPillar: '병오' },
  { date: { year: 2026, month: 6, day: 15 }, expectedDayPillar: '경신' },
  { date: { year: 2026, month: 6, day: 30 }, expectedDayPillar: '을해' },
] as const;

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i3-kasi-day-anchor',
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

function pillarText(state: FactState<PillarFact>): string {
  if (state.status !== 'resolved') throw new Error(`expected resolved pillar, got ${state.status}`);
  return `${state.value.stem.value}${state.value.branch.value}`;
}

describe('Tier B KASI daily ganji anchors', () => {
  test('source scope is limited to daily ganji rather than Saju month authority', () => {
    expect(source.sourceTier).toBe('B');
    expect(source.limitation).toContain('does not treat its month label');
  });

  for (const fixture of fixtures) {
    test(`KASI daily anchor ${fixture.date.year}-${fixture.date.month}-${fixture.date.day}`, () => {
      const snapshot = calculateCanonicalSajuSnapshot(
        {
          calendarType: 'solar',
          date: fixture.date,
          time: { known: true, hour: 12, minute: 0 },
          sexForTraditionalCalculation: 'unspecified',
        },
        policy,
      );
      expect(pillarText(snapshot.pillars.day)).toBe(fixture.expectedDayPillar);
    });
  }
});
