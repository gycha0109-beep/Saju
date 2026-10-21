import { beforeAll, describe, expect, it } from 'vitest';
import {
  findSharedNatalFactLinks,
  type NatalDomainEvidence,
  type NatalDomainKey,
} from '../src/preview/natal-five-domain-shared-evidence.js';
import { runNatalS6QualityRegression } from '../src/preview/natal-five-domain-quality-regression.js';

type Case = ReturnType<typeof runNatalS6QualityRegression>['cases'][number];
function domainEvidence(chart: Case): NatalDomainEvidence[] {
  return chart.domains.map(report => ({
    domain: report.domain as NatalDomainKey,
    label: ({ general: '총운', career: '직업운', wealth: '재물운',
      business: '사업운', relationship: '관계운' } as const)[report.domain],
    sections: report.sections.map(section => ({
      headline: section.headline,
      positions: section.positions,
      factPaths: section.factPaths,
      sourceIds: section.sourceIds,
    })),
  }));
}

describe('source-qualified cross-domain reuse of one exact natal fact', () => {
  let cohort: ReturnType<typeof runNatalS6QualityRegression>;
  beforeAll(() => { cohort = runNatalS6QualityRegression(); }, 120_000);
  it('uses real canonical birth calculations and never invents a new T8 conclusion', () => {
    expect(cohort.cases).toHaveLength(37);
    let chartsWithSharedEvidence = 0;
    for (const chart of cohort.cases) {
      const inputs = domainEvidence(chart);
      const links = findSharedNatalFactLinks(inputs);
      expect(findSharedNatalFactLinks(inputs)).toEqual(links);
      expect(links.length).toBeLessThanOrEqual(4);
      expect(new Set(links.map(link => link.factPath)).size).toBe(links.length);
      if (chart.scenario === 'unknown_time') {
        expect(links).toHaveLength(0);
        expect(chart.html).not.toContain('class="shared-evidence"');
        continue;
      }
      if (links.length) {
        chartsWithSharedEvidence += 1;
        expect(chart.html).toContain('<section class="shared-evidence"');
        expect(chart.html).toContain('같은 명식 근거, 서로 다른 분야의 관점');
      } else {
        expect(chart.html).not.toContain('class="shared-evidence"');
      }
      for (const link of links) {
        expect(chart.html).toContain('공통 계산 근거: <strong>' + link.position + '</strong>');
        expect(chart.html).toContain('href="#domain-' + link.left.domain + '"');
        expect(chart.html).toContain('href="#domain-' + link.right.domain + '"');
        expect(link.left.domain).not.toBe(link.right.domain);
        expect(link.left.headline).not.toBe(link.right.headline);
        expect(link.position).toMatch(/(연주|월주|일주|시주)/u);
        for (const ref of [link.left, link.right]) {
          const domain = inputs.find(x => x.domain === ref.domain)!;
          const sourceSection = domain.sections.find(section =>
            section.headline === ref.headline &&
            section.factPaths.some((path, index) => path === link.factPath &&
              section.positions[index] === link.position));
          expect(sourceSection).toBeDefined();
          expect(sourceSection!.sourceIds.length).toBeGreaterThan(0);
        }
      }
    }
    expect(chartsWithSharedEvidence).toBeGreaterThan(0);
    expect(cohort.researchOnly).toBe(true);
    expect(cohort.usefulComplete).toBe(false);
    expect(cohort.mayPublish).toBe(false);
    expect(cohort.maySell).toBe(false);
  }, 120_000);

  it('rejects unsupported or conflicting source evidence rather than fabricating overlap', () => {
    const chart = cohort.cases.find(x => x.domains.some(d => d.sections.length > 0))!;
    const inputs = domainEvidence(chart);
    const first = inputs.findIndex(domain => domain.sections.length > 0);
    const section = inputs[first]!.sections[0]!;
    const altered = inputs.map((domain, i) => i !== first ? domain : {
      ...domain, sections: [
        { ...section, sourceIds: [] },
        ...domain.sections.slice(1),
      ],
    });
    expect(() => findSharedNatalFactLinks(altered)).toThrow(/unqualified/);
    expect(() => findSharedNatalFactLinks(inputs.slice(0, 4))).toThrow(/five source-owned/);
    const badPath = inputs.map((domain, i) => i !== first ? domain : {
      ...domain, sections: [
        { ...section, factPaths: ['derivedFacts.fake.value', ...section.factPaths.slice(1)] },
        ...domain.sections.slice(1),
      ],
    });
    expect(() => findSharedNatalFactLinks(badPath)).toThrow(/unsupported/);
  }, 120_000);
});
