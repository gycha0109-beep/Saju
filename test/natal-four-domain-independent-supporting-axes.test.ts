import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { selectIndependentNatalSupportingAxes } from '../src/preview/natal-independent-supporting-axes.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const REGISTRIES = [
  { domain: '전체 사주', registry: createGeneralNatalMultifactorRegistry(), render: buildGeneralNatalMultifactorReport },
  { domain: '재물', registry: createWealthNatalMultifactorRegistry(), render: buildWealthNatalMultifactorReport },
  { domain: '사업', registry: createBusinessNatalMultifactorRegistry(), render: buildBusinessNatalMultifactorReport },
  { domain: '연애·관계', registry: createRelationshipNatalMultifactorRegistry(), render: buildRelationshipNatalMultifactorReport },
] as const;

describe('four different consumer natal menus require independently observed T0 support', () => {
  it('recovers two independent support axes when an early broad axis consumes both paths', () => {
    const core = { axis: 'core', observedFactPaths: ['base'] };
    const wide = { axis: 'creation', observedFactPaths: ['pathA','pathB'] };
    const narrowA = { axis: 'management', observedFactPaths: ['pathA'] };
    const narrowB = { axis: 'planning', observedFactPaths: ['pathB'] };
    const selected = selectIndependentNatalSupportingAxes(core,[wide,narrowA,narrowB]);
    expect(selected.supporting.map(x => x.axis)).toEqual(['management','planning']);
  });

  it('does not upgrade differently named axes when they repeat the same observed Canonical fact paths', () => {
    const core = { axis: 'core', observedFactPaths: ['derivedFacts.tenGods.value.year.stem.value'] };
    const repeated = { axis: 'management', observedFactPaths: [...core.observedFactPaths] };
    const firstNew = { axis: 'planning', observedFactPaths: ['derivedFacts.tenGods.value.month.stem.value'] };
    const repeatedAgain = { axis: 'creation', observedFactPaths: [...firstNew.observedFactPaths] };
    const secondNew = { axis: 'responsibility', observedFactPaths: ['derivedFacts.tenGods.value.hour.stem.value'] };
    const picked = selectIndependentNatalSupportingAxes(
      core, [repeated, firstNew, repeatedAgain, secondNew],
    );
    expect(picked.supporting.map(x => x.axis)).toEqual(['planning', 'responsibility']);
    expect(picked.overlapOnlyCount).toBe(2);
  });

  it('applies incremental actual chart fact-paths across all four distinct domain reports', () => {
    const charts = [[3, 10], [4, 11], [6, 3], [7, 17], [9, 23]] as const;
    for (const [month, day] of charts) {
      const natal = calculateCanonicalSajuSnapshot({
        calendarType: 'solar',
        date: { year: 2024, month, day },
        time: { known: true, hour: 12, minute: 0 },
        sexForTraditionalCalculation: 'unspecified',
      }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });

      for (const entry of REGISTRIES) {
        const execution = runInterpretation(natal, entry.registry, { now: NOW });
        const report = entry.render(natal, execution, entry.registry);
        expect(report.snapshotId, entry.domain).toBe(natal.snapshotId);
        expect(report.calculationHash, entry.domain).toBe(natal.calculationHash);
        const used = new Set(report.sections[0]?.observedFactPaths ?? []);
        const axes = new Set<string>();
        for (const [index, section] of report.sections.entries()) {
          expect(section.sourceIds.length, entry.domain).toBeGreaterThan(0);
          expect(section.upstreamClaimIds.length, entry.domain).toBeGreaterThanOrEqual(2);
          expect(section.observedFactPaths.length, entry.domain).toBeGreaterThanOrEqual(2);
          expect(section.paragraph, entry.domain).toContain('이 원국에서 확인된 근거');
          if (index > 0) {
            const novel = section.observedFactPaths.filter(path => !used.has(path));
            expect(novel.length, entry.domain + ': duplicated Canonical fact cannot be a new axis')
              .toBeGreaterThan(0);
            novel.forEach(path => used.add(path));
          }
          expect(axes.has(section.axis), entry.domain).toBe(false);
          axes.add(section.axis);
          expect(section.observedFactPaths.every(path =>
            /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path),
          )).toBe(true);
        }
        if (report.state === 'complete') {
          expect(report.sections, entry.domain).toHaveLength(3);
          expect(axes.size).toBe(3);
        } else {
          expect(report.missing.length, entry.domain).toBeGreaterThan(0);
        }
        expect(report.researchOnly).toBe(true);
        expect(report.usefulComplete).toBe(false);
        expect(report.mayPublish).toBe(false);
        expect(report.maySell).toBe(false);
      }
    }
  }, 60000);
});
