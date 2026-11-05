import { describe, expect, it } from 'vitest';
import {
  NATAL_S6_BIRTH_CASES,
  NATAL_S6_CONTRASTS,
  runNatalS6QualityRegression,
} from '../src/preview/natal-five-domain-quality-regression.js';

describe('S6 real-chart Korean meaning and contrast quality regression', () => {
  it('replays 30+ real charts and at least 10 substantive source-bound contrast pairs', () => {
    const audit = runNatalS6QualityRegression();
    expect(NATAL_S6_BIRTH_CASES.length).toBeGreaterThanOrEqual(30);
    expect(NATAL_S6_CONTRASTS.length).toBeGreaterThanOrEqual(10);
    expect(audit.cases).toHaveLength(NATAL_S6_BIRTH_CASES.length);
    expect(audit.contrasts).toHaveLength(NATAL_S6_CONTRASTS.length);
    expect(audit.differentiatedPairCount).toBeGreaterThanOrEqual(10);
    expect(audit.contrasts.filter(p => p.differentSourceBackedMeaning).every(
      p => p.materiallyDifferentInputs && JSON.stringify(p.leftMeanings) !== JSON.stringify(p.rightMeanings),
    )).toBe(true);
    for (const item of audit.cases) {
      expect(item.calculationHash.length).toBeGreaterThan(0);
      expect(item.html).toContain('<html lang="ko">');
      expect(item.html).toContain('출판 및 판매 불가');
      expect(item.domains).toHaveLength(5);
      expect(new Set(item.domains.map(domain => domain.domain)).size).toBe(5);
      for (const domain of item.domains) {
        if (domain.state === 'complete') {
          expect(new Set(domain.sections.map(s => s.axis)).size).toBeGreaterThanOrEqual(3);
        }
        for (const s of domain.sections) {
          expect(s.sourceIds.length).toBeGreaterThan(0);
          expect(s.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
          expect(s.factPaths.every(path => path.startsWith('derivedFacts.tenGods.value.'))).toBe(true);
        }
      }
      if (item.scenario === 'unknown_time') {
        expect(item.domains.every(d => d.state === 'insufficient' && d.sections.length === 0)).toBe(true);
      }
    }
    expect(new Set(audit.cases.map(c => c.scenario))).toEqual(new Set([
      'regular_solar', 'solar_term_window', 'lunar_regular', 'lunar_leap', 'unknown_time',
    ]));
    // Structural contrast proves a limited research observation, NOT a
    // source-reviewed sufficient product, release permission or sale.
    expect(audit.researchOnly).toBe(true);
    expect(audit.usefulComplete).toBe(false);
    expect(audit.productMeaningSufficiencyProven).toBe(false);
    expect(audit.mayPublish).toBe(false);
    expect(audit.maySell).toBe(false);
  }, 120_000);
});
