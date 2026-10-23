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

  it('introduces only actual source-owned Wealth T8 focus and independent chart positions in Korean', () => {
    const { report } = run(3, 10);
    expect(report.sections.length).toBeGreaterThan(0);
    const first = report.sections[0]!;
    expect(report.introduction).toContain(first.headline);
    for (const location of first.observedPositions) {
      expect(report.introduction).toContain(location);
    }
    expect(report.introduction).toContain('실제 연결된 계산 위치');
    if (first.axis === 'tension') {
      expect(report.state).toBe('partial');
      expect(report.introduction).toContain('종합 결론을 내리지 않습니다');
      expect(report.introduction).not.toContain('먼저 읽을 재물의 중심 연구 관점');
    } else {
      expect(report.introduction).toContain('먼저 읽을 재물의 중심 연구 관점');
      if (report.sections.length === 1) {
        expect(report.introduction).toContain('독립적인 실제 위치 근거를 가진 보조 해석은 아직 부족');
      } else {
        expect(report.introduction).toContain('이를 보조하는 서로 다른 실제 계산 위치의 연구 관점');
        for (const support of report.sections.slice(1)) {
          expect(report.introduction).toContain(support.headline);
          for (const position of support.observedPositions) {
            expect(report.introduction).toContain(position);
          }
        }
      }
    }
    expect(report.introduction).toContain('수입이나 재산을 예측하는 판정이 아닌');
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('changes the actual Wealth research focus when the selected T8 meaning changes by birth chart', () => {
    const first = run(3, 10);
    const samples = [run(4, 12), run(5, 17), run(6, 23), run(7, 11)];
    const changed = samples.find(example =>
      example.report.sections.length > 0 &&
      example.report.sections[0]?.headline !== first.report.sections[0]?.headline);
    expect(changed).toBeDefined();
    if (!changed) return;
    expect(changed.report.introduction).not.toBe(first.report.introduction);
    expect(changed.report.introduction).toContain(changed.report.sections[0]!.headline);
    expect(run(3, 10).report.introduction).toBe(first.report.introduction);
    expect(changed.report.mayPublish).toBe(false);
  });

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

  it('keeps T8 meaning blocked with unknown birth hour but displays only verified chart facts', () => {
    const result = run(3, 10, false);
    const report = result.report;
    expect(result.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(report.state).toBe('insufficient');
    expect(report.sections).toHaveLength(0);
    expect(report.missing.join(' ')).toContain('십신(T5) 전체가 미확정');
    expect(report.introduction).toContain('출생시각이 없어도 확인 가능한');
    expect(report.introduction).toContain('재물의 많고 적음이나 다중 근거 T8 풀이를 뜻하지 않습니다');
    for (const [slot, label] of [
      ['year', '연주'], ['month', '월주'], ['day', '일주'],
    ] as const) {
      const fact = result.snapshot.pillars[slot];
      const expected = fact.status === 'resolved'
        ? fact.value.stem.value + fact.value.branch.value
        : '미확정';
      expect(report.introduction).toContain(label + ' ' + expected);
    }
    expect(report.usefulComplete).toBe(false);
    expect(report.researchOnly).toBe(true);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('changes only real Canonical unknown-hour observations for another birth date', () => {
    const first = run(3, 10, false);
    const second = run(4, 12, false);
    const repeat = run(3, 10, false);
    expect(repeat.report).toEqual(first.report);
    expect(first.report.introduction).not.toBe(second.report.introduction);
    expect(first.report.sections).toHaveLength(0);
    expect(second.report.sections).toHaveLength(0);
    expect(first.report.missing).toEqual(second.report.missing);
    expect(run(3, 10, true).report.sections.length).toBeGreaterThan(0);
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
