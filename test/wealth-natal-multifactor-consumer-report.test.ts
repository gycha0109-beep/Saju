import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  WEALTH_NATAL_MULTIFACTOR_RULES,
  WEALTH_NATAL_MULTIFACTOR_PACK,
  createWealthNatalMultifactorRegistry,
} from '../src/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const registry = createWealthNatalMultifactorRegistry();
const NOW = new Date('2026-10-19T00:00:00.000Z');
function sample(month: number, day: number, known = true, hour = 12) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: known ? { known: true, hour, minute: 0 } as const : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day: number, known = true, hour = 12) {
  const snapshot = sample(month, day, known, hour);
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return { snapshot, execution,
    report: buildWealthNatalMultifactorReport(snapshot, execution, registry) };
}
describe('actual-source Wealth natal T5→T8→Korean five-domain report', () => {
  it('is Wealth-only, research-only, and every T8 has 2/3 exact T5 inputs', () => {
    expect(registry.pack.packId).toBe(WEALTH_NATAL_MULTIFACTOR_PACK.packId);
    expect(WEALTH_NATAL_MULTIFACTOR_RULES).toHaveLength(12);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T8')).toHaveLength(12);
    expect(registry.rules.filter(r => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(0);
    for(const rule of WEALTH_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('wealth');
      expect(rule.inputs.length).toBeGreaterThanOrEqual(2);
      expect(rule.inputs.every(i => i.source === 'interpretation_claim' &&
        i.cardinality === 'exactly_one' && i.required)).toBe(true);
      expect(rule.sourceRefs).toHaveLength(2);
      expect(rule.status).toBe('research');
    }
    expect(inspectMyeonghwaProductionComposition({registry}).status).toBe('blocked');
  });

  it('produces real chart-specific Wealth meanings, with two or three matching upstream Claims', () => {
    const data = [];
    for(const month of [2,3,4,5,6,7]) for(const day of [3,7,11,17,23]) {
      const x = run(month,day);
      if(x.report.sections.length) {
        data.push({ ...x, signature: x.report.sections.map(s=>s.pattern).sort().join('|') });
      }
    }
    const first = data[0];
    const second = data.find(x => x.signature !== first?.signature &&
      x.snapshot.calculationHash !== first?.snapshot.calculationHash);
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    if(!first || !second) return;
    expect(first.report.sections.map(x=>x.headline)).not.toEqual(
      second.report.sections.map(x=>x.headline));
    for(const x of [first,second]) {
      for(const s of x.report.sections) {
        expect(s.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions).toHaveLength(s.observedFactPaths.length);
        expect(s.paragraph).toContain('이 원국에서 확인된 근거는');
        expect(s.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
        expect(s.paragraph).toMatch(/같은 (천간|지지 대표 십신)에서 관측된/u);
        expect(s.paragraph).toContain(s.headline);
        expect(s.observedPositions.every(p=>s.paragraph.includes(p))).toBe(true);
        expect(s.observedFactPaths.every(path =>
          /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))
          .toBe(true);
      }
      expect(x.report.mayPublish).toBe(false);
      expect(x.report.maySell).toBe(false);
      expect(x.report.usefulComplete).toBe(false);
    }
    expect(run(3,10).report).toEqual(run(3,10).report);
  }, 30000);

  it('requires distinct actual Wealth interpretation axes for MUR complete', () => {
    const x = run(3,10);
    if(x.report.state === 'complete') {
      expect(x.report.sections).toHaveLength(3);
      expect(new Set(x.report.sections.map(s=>s.axis)).size).toBe(3);
      expect(new Set(x.report.sections.map(s=>s.pattern)).size).toBe(3);
    } else {
      expect(x.report.missing.length).toBeGreaterThan(0);
      expect(x.report.state).toMatch(/partial|insufficient/);
    }
  });

  it('uses the same calculated chart while giving Wealth a different interpretation from General', () => {
    const wealth = run(3,10);
    const generalRegistry = createGeneralNatalMultifactorRegistry();
    const generalExecution = runInterpretation(wealth.snapshot, generalRegistry, { now: NOW });
    const general = buildGeneralNatalMultifactorReport(
      wealth.snapshot, generalExecution, generalRegistry,
    );
    expect(wealth.report.calculationHash).toBe(general.calculationHash);
    expect(wealth.report.sections.length).toBeGreaterThan(0);
    expect(wealth.report.sections.every(section =>
      section.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_'))).toBe(true);
    expect(wealth.report.sections.map(section => section.headline)).not.toEqual(
      general.sections.map(section => section.headline));
  });


  it('shows actual tension-only T8 evidence as partial Korean interpretation without inventing a core', () => {
    let found = false;
    // A fixed noon birth hour misses rare combinations. Sweep four actual
    // birth times while keeping each generated chart fully canonical.
    outer: for(const hour of [0,6,12,18]) {
      for(const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
        for(const day of [3,7,11,17,23]) {
          const { execution, report } = run(month, day, true, hour);
        const active = execution.claims.filter(c => c.taxonomy.tier === 'T8' &&
          c.taxonomy.category === 'wealth' &&
          c.predicate === 'wealth_multifactor_structure' && c.state === 'active');
        const axes = active.map(c => (c.value as {axis?:string}).axis);
        if(axes.length === 0 || axes.some(axis => ['core','creation','management','planning'].includes(axis ?? '')) ||
          !axes.includes('tension')) continue;
        found = true;
        expect(report.state).toBe('partial');
        expect(report.sections).toHaveLength(1);
        expect(report.sections[0]?.axis).toBe('tension');
        expect(report.sections[0]?.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(report.sections[0]?.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
        expect(report.missing.join(' ')).toContain('중심 종합 근거 없이');
        expect(report.missing).toContain('중심 결론과 구별되는 추가 구조 축 1개 부족');
        expect(report.researchOnly).toBe(true);
        expect(report.usefulComplete).toBe(false);
        expect(report.mayPublish).toBe(false);
        expect(report.maySell).toBe(false);
          break outer;
        }
      }
    }
    expect(found).toBe(true);
  }, 60000);

  it('does not infer full-chart meaning with unknown birth hour but retains only real non-hour evidence', () => {
    const x = run(3,10,false);
    expect(x.report.state).not.toBe('complete');
    expect(x.report.sections.every(section =>
      section.observedFactPaths.every(path => !path.includes('.hour.')))).toBe(true);
    expect(x.report.missing.join(' ')).toContain('출생시각 미상');
    expect(x.report.usefulComplete).toBe(false);
    expect(x.report.mayPublish).toBe(false);
    expect(x.report.maySell).toBe(false);
  });

  it('delivers personalized Korean Wealth paragraphs with genuinely observed year/month/day evidence despite unknown hour', () => {
    const found = [];
    for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
      for (const day of [3,7,11,17,23]) {
        const x = run(month, day, false);
        if (x.report.sections.length === 0) continue;
        found.push(x);
        const knownHour = run(month, day, true, 12);
        expect(x.report.state).toBe('partial');
        expect(x.report.sections.length).toBeGreaterThan(0);
        expect(x.report.sections.every(section =>
          section.observedPositions.length >= 2 &&
          section.upstreamClaimIds.length >= 2 &&
          section.sourceIds.length >= 1 &&
          section.observedFactPaths.length === section.observedPositions.length &&
          section.observedFactPaths.every(path =>
            !path.includes('.hour.') &&
            /^derivedFacts\.tenGods\.value\.(year|month|day)\.(stem|branch)\.value$/u.test(path)) &&
          section.observedPositions.every(position => section.paragraph.includes(position))
        )).toBe(true);
        expect(x.report.sections.every(section => knownHour.execution.claims.some(candidate =>
          candidate.claimType === section.claimType &&
          candidate.state === 'active'
        ))).toBe(true);
        expect(x.report.missing.join(' ')).toContain('시주 없이 실제로 확인된');
        expect(x.report.usefulComplete).toBe(false);
        expect(x.report.researchOnly).toBe(true);
        expect(x.report.mayPublish).toBe(false);
        expect(x.report.maySell).toBe(false);
        if (found.length >= 2 &&
          found.some(y => y.report.sections.map(section => section.pattern).join('|') !==
            x.report.sections.map(section => section.pattern).join('|'))) break;
      }
      if (found.length >= 2 &&
        new Set(found.map(x => x.report.sections.map(section => section.pattern).join('|'))).size > 1) break;
    }
    expect(found.length, 'birth-hour unknown must not erase all supported natal T8 claims').toBeGreaterThan(0);
    expect(new Set(found.map(x =>
      x.report.sections.map(section => section.pattern).join('|'))).size,
      'real non-hour evidence should yield chart-specific Wealth patterns').toBeGreaterThan(1);
    const first = found[0];
    expect(first).toBeDefined();
    if (first) expect(run(first.snapshot.input.date.month, first.snapshot.input.date.day, false).report)
      .toEqual(first.report);
  }, 120000);

  it('rejects cross-chart and tampered Wealth claim meaning', () => {
    const x = run(3,10);
    const other = sample(4,12);
    expect(()=>buildWealthNatalMultifactorReport(other,x.execution,registry)).toThrow();
    const first = x.execution.claims.find(c=>c.taxonomy.category === 'wealth' &&
      c.predicate === 'wealth_multifactor_structure');
    expect(first).toBeDefined();
    if(!first) return;
    const forged = { ...x.execution, claims: x.execution.claims.map(c =>
      c.claimId === first.claimId
        ? { ...c, value: {...(c.value as Record<string,unknown>), pattern: 'INVENTED'} }
        : c),
    };
    expect(()=>buildWealthNatalMultifactorReport(x.snapshot,forged,registry)).toThrow();
  });
});
