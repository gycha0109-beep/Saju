import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  GENERAL_NATAL_MULTIFACTOR_RULES,
  GENERAL_NATAL_MULTIFACTOR_PACK,
  createGeneralNatalMultifactorRegistry,
} from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const registry = createGeneralNatalMultifactorRegistry();
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
    report: buildGeneralNatalMultifactorReport(snapshot, execution, registry) };
}
describe('actual-source General natal T5→T8→Korean five-domain report', () => {
  it('is General-only, research-only, and every T8 has 2/3 exact T5 inputs', () => {
    expect(registry.pack.packId).toBe(GENERAL_NATAL_MULTIFACTOR_PACK.packId);
    expect(GENERAL_NATAL_MULTIFACTOR_RULES).toHaveLength(12);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T8')).toHaveLength(17);
    expect(registry.rules.filter(r => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(5);
    for(const rule of GENERAL_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('general');
      expect(rule.inputs.length).toBeGreaterThanOrEqual(2);
      expect(rule.inputs.every(i => i.source === 'interpretation_claim' &&
        i.cardinality === 'exactly_one' && i.required)).toBe(true);
      expect(rule.sourceRefs).toHaveLength(2);
      expect(rule.status).toBe('research');
    }
    expect(inspectMyeonghwaProductionComposition({registry}).status).toBe('blocked');
  });

  it('produces real chart-specific General meanings, with two or three matching upstream Claims', () => {
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

  it('preserves actual unconsumed T5 meanings beside a partial General core without inventing supports', () => {
    let verified = false;
    outer: for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
      for (const day of [3,7,11,17,23]) {
        const { snapshot, execution, report } = run(month, day);
        if (report.state !== 'partial' || !report.readingGuide ||
            report.sections.length === 0 || report.sections[0]!.axis === 'tension' ||
            !report.availableThemeContext) continue;
        const context = report.availableThemeContext;
        expect(report.sections.length).toBeLessThan(3);
        expect(report.readingGuide.sourceClaimType).toBe(report.sections[0]!.claimType);
        expect(context.title).toContain('총운 중심 부분풀이와 구별되는');
        expect(context.paragraph).toContain('부족한 독립 보조 복합 해석을 대신하지 않습니다');
        expect(context.wholeChartSynthesisAuthorized).toBe(false);
        const consumed = new Set(report.sections.flatMap(section => section.upstreamClaimIds));
        const usedPaths = new Set(report.sections.flatMap(section => section.observedFactPaths));
        const executedT5 = new Set(execution.claims.filter(claim =>
          claim.state === 'active' && claim.taxonomy.tier === 'T5' &&
          claim.snapshotId === snapshot.snapshotId).map(claim => claim.claimId));
        for (const theme of context.themes) {
          expect(executedT5.has(theme.claimId)).toBe(true);
          expect(consumed.has(theme.claimId)).toBe(false);
          expect(theme.observedFactPaths.every(path => !usedPaths.has(path))).toBe(true);
          expect(context.paragraph).toContain(theme.summary);
          expect(theme.ruleIds.length).toBeGreaterThan(0);
          expect(theme.sourceIds.length).toBeGreaterThan(0);
          expect(theme.methodologyId.length).toBeGreaterThan(0);
        }
        expect(report.mayPublish).toBe(false);
        expect(report.maySell).toBe(false);
        expect(report.usefulComplete).toBe(false);
        expect(report).toEqual(buildGeneralNatalMultifactorReport(snapshot, execution, registry));
        verified = true;
        break outer;
      }
    }
    expect(verified).toBe(true);
  }, 60000);

  it('requires distinct actual General interpretation axes for MUR complete', () => {
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

  it('shows actual tension-only General T8 as grounded Korean partial reading, not an empty report', () => {
    let found: ReturnType<typeof run> | undefined;
    let foundInput: readonly [number, number] | undefined;
    outer: for(const month of [2,3,4,5,6,7,8,9,10,11,12,1]) {
      for(const day of [3,7,11,17,23,27]) {
        const candidate = run(month, day);
        const activeT8 = candidate.execution.claims.filter(c =>
          c.taxonomy.tier === 'T8' &&
          c.taxonomy.category === 'general' &&
          c.predicate === 'general_multifactor_structure' &&
          c.state === 'active');
        if(activeT8.length > 0 && activeT8.every(c =>
          (c.value as {axis?: string}).axis === 'tension')) {
          found = candidate;
          foundInput = [month, day];
          break outer;
        }
      }
    }
    expect(found, 'a real chart with only source-qualified General tension evidence').toBeDefined();
    if(!found) return;
    expect(found.report.state).toBe('partial');
    expect(found.report.sections.length).toBeGreaterThan(0);
    expect(found.report.sections.every(s => s.axis === 'tension')).toBe(true);
    expect(new Set(found.report.sections.map(s => s.pattern)).size).toBe(found.report.sections.length);
    expect(found.report.missing.join(' ')).toContain('중심 결론을 세울 수 없어');
    expect(found.report.missing.join(' ')).not.toContain('추가 구조 축');
    const alreadyUsedT5 = new Set(found.report.sections.flatMap(s => s.upstreamClaimIds));
    for (const theme of found.report.availableThemeContext?.themes ?? []) {
      expect(alreadyUsedT5.has(theme.claimId)).toBe(false);
      expect(theme.sourceIds.length).toBeGreaterThan(0);
      expect(theme.observedFactPaths.length).toBeGreaterThan(0);
    }
    for(const section of found.report.sections) {
      expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
      expect(section.observedPositions.every(p => section.paragraph.includes(p))).toBe(true);
      expect(section.sourceIds.length).toBeGreaterThan(0);
      expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
      expect(section.ruleId.length).toBeGreaterThan(0);
    }
    expect(found.report.researchOnly).toBe(true);
    expect(found.report.usefulComplete).toBe(false);
    expect(found.report.mayPublish).toBe(false);
    expect(found.report.maySell).toBe(false);
    expect(foundInput).toBeDefined();
    if(foundInput) expect(run(...foundInput).report).toEqual(found.report);
    console.info('General actual-chart tension-only Korean partial', JSON.stringify({
      input: foundInput,
      chartHash: found.report.calculationHash,
      state: found.report.state,
      sections: found.report.sections.map(s => ({
        headline: s.headline, paragraph: s.paragraph, ruleId: s.ruleId,
        sourceIds: s.sourceIds, upstreamClaimIds: s.upstreamClaimIds,
        factPaths: s.observedFactPaths,
      })),
      missing: found.report.missing,
      researchOnly: found.report.researchOnly,
      mayPublish: found.report.mayPublish,
      maySell: found.report.maySell,
      usefulComplete: found.report.usefulComplete,
    }));
  }, 60000);

  it('shows actual resolved natal pillars, not fabricated T8 meaning, with unknown birth hour', () => {
    const x = run(3, 10, false);
    expect(x.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(x.report.state).toBe('insufficient');
    expect(x.report.sections).toHaveLength(0);
    expect(x.report.missing.join(' ')).toContain('십신(T5) 전체가 미확정');
    expect(x.report.missing.join(' ')).not.toContain('추가 구조 축');
    expect(x.report.introduction).toContain('출생시각이 없어도 확인 가능한');
    expect(x.report.introduction).toContain('다중 근거 T8 해석을 뜻하지 않습니다');
    for (const [slot, label] of [
      ['year', '연주'], ['month', '월주'], ['day', '일주'],
    ] as const) {
      const fact = x.snapshot.pillars[slot];
      const observed = fact.status === 'resolved'
        ? fact.value.stem.value + fact.value.branch.value
        : '미확정';
      expect(x.report.introduction).toContain(label + ' ' + observed);
    }
    expect(x.report.usefulComplete).toBe(false);
    expect(x.report.researchOnly).toBe(true);
    expect(x.report.mayPublish).toBe(false);
    expect(x.report.maySell).toBe(false);
  });

  it('keeps the same unknown-hour factual context on replay but changes with a real chart', () => {
    const first = run(3, 10, false);
    const replay = run(3, 10, false);
    const second = run(4, 12, false);
    expect(replay.report).toEqual(first.report);
    expect(second.report.introduction).not.toEqual(first.report.introduction);
    expect(first.report.sections).toHaveLength(0);
    expect(second.report.sections).toHaveLength(0);
    expect(first.report.missing).toEqual(second.report.missing);
  });

  it('rejects cross-chart and tampered General claim meaning', () => {
    const x = run(3,10);
    const other = sample(4,12);
    expect(()=>buildGeneralNatalMultifactorReport(other,x.execution,registry)).toThrow();
    const first = x.execution.claims.find(c=>c.taxonomy.category === 'general' &&
      c.predicate === 'general_multifactor_structure');
    expect(first).toBeDefined();
    if(!first) return;
    const forged = { ...x.execution, claims: x.execution.claims.map(c =>
      c.claimId === first.claimId
        ? { ...c, value: {...(c.value as Record<string,unknown>), pattern: 'INVENTED'} }
        : c),
    };
    expect(()=>buildGeneralNatalMultifactorReport(x.snapshot,forged,registry)).toThrow();
  });
});
