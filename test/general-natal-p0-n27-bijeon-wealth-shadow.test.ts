import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import {
  buildGeneralNatalN27BijeonWealthShadow,
} from '../src/research/general-natal-p0-n27-bijeon-wealth-shadow.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
function actual2010(hour: number | null) {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2010, month: 2, day: 3 },
    time: hour === null ? { known: false } : { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
}

describe('N27 authentic 2010 snapshots: BiJian wealth literal text shadow', () => {
  it('19:30 has 甲戌時 literal and year 己, but NOT source-qualified wealth pattern or personal outcome', () => {
    const shadow = buildGeneralNatalN27BijeonWealthShadow(actual2010(19));
    expect(shadow.source).toMatchObject({
      work: '三命通會（四庫全書本）卷五',
      locator: '時上偏財',
      manuscriptOrPrintAuthentication: false,
    });
    expect(shadow.facts).toMatchObject({
      allPillarsResolved: true,
      hourKnown: true,
      dayStem: '갑',
      monthBranch: '축',
      yearStem: '기',
      hourStem: '갑',
      hourBranch: '술',
      literalJiaXuMatched: true,
      additionalYearJiVisible: true,
      exactGyeopJaeObserved: false,
      bijeonObserved: true,
    });
    expect(shadow.facts.wealthPositions.length).toBeGreaterThan(0);
    expect(shadow.literalPassageMatch).toBe('MATCHED_LEXICAL_FRAGMENT_ONLY');
    expect(shadow.candidateTraditionalHourWealthPatternEstablished).toBe(false);
    expect(shadow.sourceConditionsNotResolved).toContain('NO_GOVERNED_WANGSHUAI_STRENGTH_VERDICT');
    expect(shadow.sourceConditionsNotResolved).toContain('NO_VERIFIED_SIKU_WU_SI_VS_WU_JI_CHARACTER_COLLATION');
    expect(shadow.producesNewInterpretationClaim).toBe(false);
    expect(shadow.readerMeaningEligible).toBe(false);
    expect(shadow.productionAuthorized).toBe(false);
  });

  it('05:30 is a different real hour, so does not inherit 時上偏財 lexical example', () => {
    const shadow = buildGeneralNatalN27BijeonWealthShadow(actual2010(5));
    expect(shadow.facts.hourStem).toBe('정');
    expect(shadow.facts.hourBranch).toBe('묘');
    expect(shadow.facts.exactGyeopJaeObserved).toBe(true);
    expect(shadow.facts.literalJiaXuMatched).toBe(false);
    expect(shadow.literalPassageMatch).toBe('NO_LITERAL_MATCH');
    expect(shadow.candidateTraditionalHourWealthPatternEstablished).toBe(false);
    expect(shadow.readerMeaningEligible).toBe(false);
  });

  it('unknown birth hour does not claim the 甲戌時 passage and never publishes', () => {
    const shadow = buildGeneralNatalN27BijeonWealthShadow(actual2010(null));
    expect(shadow.facts.hourKnown).toBe(false);
    expect(shadow.literalPassageMatch).toBe('HOUR_UNRESOLVED');
    expect(shadow.facts.literalJiaXuMatched).toBe(false);
    expect(shadow.readerMeaningEligible).toBe(false);
    expect(shadow.previewAdmissionGranted).toBe(false);
  });

  it('is deterministic for same actual canonical snapshot and has no self-promoting output', () => {
    const snapshot = actual2010(19);
    const a = buildGeneralNatalN27BijeonWealthShadow(snapshot);
    const b = buildGeneralNatalN27BijeonWealthShadow(snapshot);
    expect(a.evidenceHash).toBe(b.evidenceHash);
    expect(a.evidenceHash).toMatch(/^[a-f0-9]{64}$/);
    expect(a.status).toBe('RESEARCH_SHADOW_ONLY');
    expect(a.sourceConditionsNotResolved).toHaveLength(6);
  });
});
