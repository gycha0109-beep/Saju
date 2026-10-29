import { describe, expect, it } from 'vitest';
import {
  NATAL_S6_BIRTH_CASES,
  NATAL_S6_CONTRASTS,
  runNatalS6QualityRegression,
  buildNatalS6MeaningAndEvidenceSignatures,
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
      const traced = buildNatalS6MeaningAndEvidenceSignatures(item.domains);
      expect(item.meaningSignature).toEqual(traced.meaningSignature);
      expect(item.evidenceSignature).toEqual(traced.evidenceSignature);
      expect(item.wordingSignature).toEqual(traced.wordingSignature);
      expect(item.meaningSignature.length).toBe(item.domains.flatMap(d => d.sections).length);
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

  it('separates a changed T8 observation channel from semantic meaning and actual Korean copy', () => {
    const cohort = runNatalS6QualityRegression();
    const selected = cohort.cases.find(c => c.domains.some(d => d.sections.length));
    expect(selected).toBeDefined();
    const domain = selected!.domains.find(d => d.sections.length)!;
    const section = domain.sections[0]!;
    const base = buildNatalS6MeaningAndEvidenceSignatures([{
      ...domain, sections: [section],
    }]);
    const swappedChannel: typeof section.channel = section.channel === 'branches'
      ? 'visible_stems' : 'branches';
    const swapSuffix = swappedChannel === 'branches' ? '_BRANCHES' : '_VISIBLE_STEMS';
    const changed: typeof section = {
      ...section,
      channel: swappedChannel,
      claimType: section.claimType.replace(/_(BRANCHES|VISIBLE_STEMS)$/u, swapSuffix),
      ruleId: 'RULE-' + section.claimType.replace(/_(BRANCHES|VISIBLE_STEMS)$/u, swapSuffix),
      factPaths: section.factPaths.map(p =>
        p.replace(/\\.(stem|branch)\\.value$/u,
          swappedChannel === 'branches' ? '.branch.value' : '.stem.value')),
      positions: section.positions.map(p => p + ' (표시 근거 변화)'),
      paragraph: section.paragraph + ' 관측 설명 문구 변화',
    };
    const evidenceChanged = buildNatalS6MeaningAndEvidenceSignatures([{
      ...domain, sections: [changed],
    }]);
    expect(evidenceChanged.meaningSignature).toEqual(base.meaningSignature);
    expect(evidenceChanged.evidenceSignature).not.toEqual(base.evidenceSignature);
    expect(evidenceChanged.wordingSignature).not.toEqual(base.wordingSignature);
    const alternativeAxis: typeof section.axis = section.axis === 'core'
      ? 'expression' : 'core';
    const changedAxis = buildNatalS6MeaningAndEvidenceSignatures([{
      ...domain, sections: [{ ...section, axis: alternativeAxis as typeof section.axis }],
    }]);
    expect(changedAxis.meaningSignature).not.toEqual(base.meaningSignature);
    const changedSource = buildNatalS6MeaningAndEvidenceSignatures([{
      ...domain, sections: [{ ...section, sourceIds: [...section.sourceIds, 'source-only-comparison'] }],
    }]);
    expect(changedSource.meaningSignature).not.toEqual(base.meaningSignature);
    expect(() => buildNatalS6MeaningAndEvidenceSignatures([{
      ...domain, sections: [{ ...section, ruleId: 'RULE-FORGED' }],
    }])).toThrow('source-issued T8');
  });
});
