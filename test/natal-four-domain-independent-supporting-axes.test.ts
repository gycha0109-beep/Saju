import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  selectIndependentNatalSupportingAxes,
  selectBestNatalCoreWithinPriorityAxis,
} from '../src/preview/natal-independent-supporting-axes.js';
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

  it('recovers two independent sourced supports hidden by an earlier broad axis', () => {
    const year = 'derivedFacts.tenGods.value.year.stem.value';
    const month = 'derivedFacts.tenGods.value.month.stem.value';
    const hour = 'derivedFacts.tenGods.value.hour.stem.value';
    const core = { axis: 'core', observedFactPaths: [year] };
    const broad = { axis: 'management', observedFactPaths: [month, hour] };
    const narrowFirst = { axis: 'planning', observedFactPaths: [month] };
    const narrowSecond = { axis: 'tension', observedFactPaths: [hour] };
    const candidates = [broad, narrowFirst, narrowSecond];
    const chosen = selectIndependentNatalSupportingAxes(core, candidates);
    // The existing valid forward pair has priority over the newer reverse
    // alternative ['planning', 'management'].
    expect(chosen.supporting.map(section => section.axis))
      .toEqual(['planning', 'tension']);
    const used = new Set(core.observedFactPaths);
    for (const section of chosen.supporting) {
      expect(section.observedFactPaths.some(path => !used.has(path))).toBe(true);
      section.observedFactPaths.forEach(path => used.add(path));
    }
    // A one-axis request retains the original documented source ordering.
    expect(selectIndependentNatalSupportingAxes(core, candidates, 1)
      .supporting.map(section => section.axis)).toEqual(['management']);
    // No new Claim, source, or calculation fact is created by selection.
    expect(chosen.supporting.every(section => candidates.includes(section))).toBe(true);
    expect(chosen.supporting).toEqual([narrowFirst, narrowSecond]);
  });

  it('rescues existing independent source axes that must be read in reverse order', () => {
    const core = { axis: 'core', observedFactPaths: ['year'] };
    const broad = { axis: 'management', observedFactPaths: ['month', 'hour'] };
    const narrow = { axis: 'planning', observedFactPaths: ['month'] };
    const selected = selectIndependentNatalSupportingAxes(core, [broad, narrow]);
    expect(selected.supporting).toEqual([narrow, broad]);
    const used = new Set(core.observedFactPaths);
    for (const axis of selected.supporting) {
      expect(axis.observedFactPaths.some(path => !used.has(path))).toBe(true);
      axis.observedFactPaths.forEach(path => used.add(path));
    }
    expect(selectIndependentNatalSupportingAxes(core, [broad, narrow], 1)
      .supporting).toEqual([broad]);
  });

  it('does not invent two independent supports from repeated paths or the same axis', () => {
    const year = 'derivedFacts.tenGods.value.year.stem.value';
    const month = 'derivedFacts.tenGods.value.month.stem.value';
    const core = { axis: 'core', observedFactPaths: [year] };
    const candidates = [
      { axis: 'management', observedFactPaths: [month] },
      { axis: 'planning', observedFactPaths: [month] },
      { axis: 'management', observedFactPaths: [year, month] },
      { axis: 'tension', observedFactPaths: [year] },
    ];
    const chosen = selectIndependentNatalSupportingAxes(core, candidates);
    expect(chosen.supporting.map(section => section.axis)).toEqual(['management']);
    expect(chosen.overlapOnlyCount).toBeGreaterThan(0);
  });

  it('preserves existing successful source priority when greedy already finds two supports', () => {
    const core = { axis: 'core', observedFactPaths: ['a'] };
    const broad = { axis: 'management', observedFactPaths: ['b', 'c'] };
    const other = { axis: 'tension', observedFactPaths: ['d'] };
    const later = { axis: 'planning', observedFactPaths: ['b'] };
    const result = selectIndependentNatalSupportingAxes(core, [broad, other, later]);
    expect(result.supporting).toEqual([broad, other]);
  });

  it('prefers a more independently supported same-axis Wealth core without lowering core priority', () => {
    const visible = { axis: 'core', observedFactPaths: ['year', 'month', 'hour'] };
    const alternate = { axis: 'core', observedFactPaths: ['year'] };
    const lowerPriority = { axis: 'creation', observedFactPaths: ['month'] };
    const management = { axis: 'management', observedFactPaths: ['hour'] };
    const candidates = [visible, alternate, lowerPriority, management];
    const selected = selectBestNatalCoreWithinPriorityAxis(candidates, candidates);
    expect(selected?.core).toBe(alternate);
    expect(selected?.support.supporting).toEqual([lowerPriority, management]);
    expect(selected?.support.supporting.every(item => candidates.includes(item))).toBe(true);
    expect(selectBestNatalCoreWithinPriorityAxis([visible, lowerPriority], candidates)?.core)
      .toBe(visible);
    expect(selectBestNatalCoreWithinPriorityAxis([alternate, { ...alternate }], candidates)?.core)
      .toBe(alternate);
    expect(selectBestNatalCoreWithinPriorityAxis([], candidates)).toBeUndefined();
  });

  it('keeps source-priority core selection across general, business and relationship axes', () => {
    for (const coreAxis of ['core', 'expression', 'execution'] as const) {
      const original = { axis: coreAxis, observedFactPaths: ['year', 'month', 'hour'] };
      const alternate = { axis: coreAxis, observedFactPaths: ['year'] };
      const firstSupport = { axis: 'preparation', observedFactPaths: ['month'] };
      const secondSupport = { axis: 'coordination', observedFactPaths: ['hour'] };
      const selected = selectBestNatalCoreWithinPriorityAxis(
        [original, alternate], [original, alternate, firstSupport, secondSupport]);
      expect(selected?.core).toBe(alternate);
      expect(selected?.support.supporting).toEqual([firstSupport, secondSupport]);
    }
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
