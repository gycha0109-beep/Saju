import { describe, expect, it } from 'vitest';
import { describeQuotedReadingAxis } from '../src/preview/korean-reading-headline.js';
import { runNatalS6QualityRegression } from '../src/preview/natal-five-domain-quality-regression.js';

describe('source-owned Korean natal headline particle agreement', () => {
  it('uses the final Hangul syllable, not a blanket quoted-title suffix', () => {
    expect(describeQuotedReadingAxis('표현과 현실 결과가 맞닿는 구조')).toBe(
      "'표현과 현실 결과가 맞닿는 구조'라는");
    expect(describeQuotedReadingAxis('준비와 산출의 연결')).toBe(
      "'준비와 산출의 연결'이라는");
    expect(describeQuotedReadingAxis('자원 배분의 조율')).toBe(
      "'자원 배분의 조율'이라는");
    expect(describeQuotedReadingAxis('표현과 교환의 관계')).toBe(
      "'표현과 교환의 관계'라는");
    expect(() => describeQuotedReadingAxis('')).toThrow(/Hangul syllable/u);
    expect(() => describeQuotedReadingAxis('수치 3')).toThrow(/Hangul syllable/u);
  });

  it('preserves actual source-bound headings and Korean paragraphs in all 37 canonical cases', () => {
    const cohort = runNatalS6QualityRegression();
    expect(cohort.cases).toHaveLength(37);
    let verified = 0;
    for (const birthCase of cohort.cases) {
      for (const domain of birthCase.domains) {
        if (!['general', 'wealth', 'business', 'relationship'].includes(domain.domain)) continue;
        for (const section of domain.sections) {
          expect(section.paragraph).toContain(describeQuotedReadingAxis(section.headline));
          expect(section.paragraph).toContain(section.positions[0]);
          expect(section.sourceIds.length).toBeGreaterThan(0);
          expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
          verified += 1;
        }
      }
    }
    expect(verified).toBeGreaterThan(0);
    expect(cohort.researchOnly).toBe(true);
    expect(cohort.usefulComplete).toBe(false);
    expect(cohort.mayPublish).toBe(false);
    expect(cohort.maySell).toBe(false);
  }, 120_000);
});
