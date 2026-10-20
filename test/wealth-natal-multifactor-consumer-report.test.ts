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
function sample(month: number, day: number, known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: known ? { known: true, hour: 12, minute: 0 } as const : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day: number, known = true) {
  const snapshot = sample(month, day, known);
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

  it('shows actual tension-only source evidence as a partial Korean reading instead of an empty body', () => {
    let found: ReturnType<typeof run> | undefined;
    for (const month of [2,3,4,5,6,7,8,9,10,11,12]) {
      for (const day of [3,7,11,17,23]) {
        const candidate = run(month, day);
        const meanings = candidate.execution.claims.filter(c =>
          c.taxonomy.tier === 'T8' && c.taxonomy.category === 'wealth' &&
          c.predicate === 'wealth_multifactor_structure' && c.state === 'active');
        if (meanings.length > 0 && meanings.every(c =>
          (c.value as {axis?:string}).axis === 'tension')) {
          found = candidate;
          break;
        }
      }
      if (found) break;
    }
    expect(found).toBeDefined();
    if (!found) return;
    expect(found.report.state).toBe('partial');
    expect(found.report.sections.length).toBeGreaterThan(0);
    expect(found.report.sections.every(s => s.axis === 'tension')).toBe(true);
    expect(found.report.sections.every(s => s.paragraph.includes('이 원국에서 확인된 근거는'))).toBe(true);
    expect(found.report.sections.every(s => s.observedPositions.every(p => s.paragraph.includes(p)))).toBe(true);
    expect(found.report.sections.every(s => s.upstreamClaimIds.length >= 2 && s.sourceIds.length > 0)).toBe(true);
    expect(found.report.missing.join(' ')).toContain('보조 구조만 부분적으로');
    expect(found.report.researchOnly).toBe(true);
    expect(found.report.mayPublish).toBe(false);
    expect(found.report.maySell).toBe(false);
    expect(found.report.usefulComplete).toBe(false);
  }, 60000);

  it('does not infer full-chart meaning with unknown birth hour', () => {
    const x = run(3,10,false);
    expect(x.report.state).toBe('insufficient');
    expect(x.report.sections).toHaveLength(0);
    expect(x.report.missing.join(' ')).toContain('출생시각 미상');
  });

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
