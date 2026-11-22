import { describe, expect, it } from 'vitest';
import { analyzeSajuTemporalRepetition } from '../scripts/saju-500-temporal-repetition-contrast.mjs';

const periodSection = { sourceProfileId: 'P-ANNUAL-WEALTH', relatedPillar: null };
const comparison = (matched, full) => [
  {
    period: 'annual',
    periodFamily: 'wealth',
    periodTenGod: '정재',
    natalMatches: [
      {
        pattern: 'WEALTH_OFFICER',
        family: 'wealth',
        axis: 'responsibility',
        channel: 'branches',
        matchedFamilyPositions: [matched],
        observedPositions: full,
      },
    ],
    interpretation: 'co_observed_only_no_interaction_claim',
  },
];
function audit(first, second, count = 500) {
  const members = [first, second].map((sourceEvidence, i) => ({
    calculationHash: 'chart-' + i,
    meaningKey: 'same-core-period-profile',
    birth: 'synthetic-' + i,
    sourceEvidence,
  }));
  const annual = {
    generated: count,
    repeatedGroups: [{ textHash: 'same-displayed-text', members }],
    casesInRepeatedGroups: 2,
    largestGroupSize: 2,
  };
  const monthly = {
    generated: count,
    repeatedGroups: [],
    casesInRepeatedGroups: 0,
    largestGroupSize: 0,
  };
  return {
    seed: '0x5a1a2026',
    count,
    failedCases: 0,
    uniqueCalculationHashes: count,
    rootCauseDiagnostics: { annualRepetition: annual, monthlyRepetition: monthly },
    menuResults: {
      올해: { meaningProfile: { unique: 1 }, exactText: { unique: count - 1 } },
      '이번 달': { meaningProfile: { unique: 1 }, exactText: { unique: count } },
    },
  };
}
const wealthPos = '월주 지지 대표 십신 정재';
const officerPos = '일주 지지 대표 십신 정관';
const anotherOfficer = '시주 지지 대표 십신 편관';
const observation = (matched, full, section = periodSection) => ({
  natalComparison: comparison(matched, full),
  sections: [section],
});

describe('fixed-seed annual/monthly repetition evidence audit', () => {
  it('does not count unshown other-family locations as a lost period-family distinction', () => {
    const report = analyzeSajuTemporalRepetition(
      audit(
        observation(wealthPos, [wealthPos, officerPos]),
        observation(wealthPos, [wealthPos, officerPos, anotherOfficer]),
        3000,
      ),
    );
    expect(report.menus[0].distinctEvidenceSameText.groups).toBe(0);
    expect(report.menus[0].backgroundOnlyContextDifferences).toEqual({ groups: 1, cases: 2 });
    expect(report.menus[0].totalCharts).toBe(3000);
  });

  it('still rejects missing displayed position distinctions and actual period-rule differences', () => {
    const first = observation(wealthPos, [wealthPos, officerPos]);
    const changed = observation('연주 지지 대표 십신 정재', [
      '연주 지지 대표 십신 정재',
      officerPos,
    ]);
    expect(
      analyzeSajuTemporalRepetition(audit(first, changed)).menus[0].distinctEvidenceSameText.groups,
    ).toBe(1);
    const changedRule = observation(wealthPos, [wealthPos, officerPos], {
      sourceProfileId: 'OTHER',
      relatedPillar: null,
    });
    expect(
      analyzeSajuTemporalRepetition(audit(first, changedRule)).menus[0].distinctEvidenceSameText
        .groups,
    ).toBe(1);
  });

  it('rejects unsupported or inconsistent audit sizes', () => {
    const one = observation(wealthPos, [wealthPos, officerPos]);
    expect(() => analyzeSajuTemporalRepetition(audit(one, one, 1500))).toThrow();
    const invalid = audit(one, one, 3000);
    invalid.uniqueCalculationHashes = 2999;
    expect(() => analyzeSajuTemporalRepetition(invalid)).toThrow();
  });
});
