import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  WEALTH_NATAL_MULTIFACTOR_RULES,
  WEALTH_NATAL_CROSS_CHANNEL_RULES,
  WEALTH_NATAL_MULTIFACTOR_PACK,
  createWealthNatalMultifactorRegistry,
} from '../src/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { observeHiddenWealthMembership } from '../src/preview/wealth-hidden-stem-observations.js';
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
    expect(WEALTH_NATAL_MULTIFACTOR_RULES).toHaveLength(18);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T8')).toHaveLength(20);
    expect(WEALTH_NATAL_CROSS_CHANNEL_RULES).toHaveLength(2);
    expect(WEALTH_NATAL_CROSS_CHANNEL_RULES.every(rule =>
      rule.status === 'research' && rule.inputs.length === 2 &&
      rule.inputs.every(i => i.required && i.cardinality === 'exactly_one') &&
      rule.sourceRefs.length === 2)).toBe(true);
    expect(registry.rules.filter(r => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(0);
    for(const rule of WEALTH_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('wealth');
      expect(rule.inputs.length).toBeGreaterThanOrEqual(2);
      expect(rule.inputs.every(i => i.source === 'interpretation_claim' &&
        i.cardinality === 'exactly_one' && i.required)).toBe(true);
      expect(rule.sourceRefs).toHaveLength(2);
      expect(rule.status).toBe('research');
    }
    const resourceCore = WEALTH_NATAL_MULTIFACTOR_RULES.filter(rule =>
      (rule.output.value as { pattern?: string }).pattern === 'WEALTH_OFFICER_RESOURCE');
    expect(resourceCore).toHaveLength(2);
    for (const rule of resourceCore) {
      const families = rule.inputs.map(input => input.pathOrClaimType);
      expect(families.some(type => type.includes('_WEALTH_'))).toBe(true);
      expect(families.some(type => type.includes('_OFFICER_'))).toBe(true);
      expect(families.some(type => type.includes('_RESOURCE_'))).toBe(true);
      expect(rule.output.emphasis).toBe('major');
      expect(rule.sourceRefs).toHaveLength(2);
    }
    const indirect = WEALTH_NATAL_MULTIFACTOR_RULES.filter(rule =>
      (rule.output.value as { axis?: string }).axis === 'context');
    expect(indirect).toHaveLength(4);
    expect(indirect.every(rule =>
      (rule.output.value as { directWealthReadingAuthorized?: boolean })
        .directWealthReadingAuthorized === false)).toBe(true);
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
      if (x.report.sections.some(section => section.axis !== 'context')) {
        expect(x.report.sections.every(section => section.axis !== 'context')).toBe(true);
      }
      for(const s of x.report.sections) {
        expect(s.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions).toHaveLength(s.observedFactPaths.length);
        expect(s.paragraph).toContain('이 원국에서 확인된 근거는');
        expect(s.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
        expect(s.paragraph).toMatch(/(같은 (천간|지지 대표 십신)에서 관측된|서로 다른 관측 범위)/u);
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

  it('retains distinct existing T5 meanings beside a source-owned but incomplete Wealth core', () => {
    let verified = false;
    outer: for (const hour of [0, 6, 12, 18]) {
      for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
        for (const day of [3,7,11,17,23]) {
          const { report, execution, snapshot } = run(month, day, true, hour);
          if (report.state !== 'partial' || !report.readingGuide ||
              !report.availableThemeContext) continue;
          const core = report.sections[0]!;
          const context = report.availableThemeContext;
          expect(['core','creation','management','planning']).toContain(core.axis);
          expect(report.sections.length).toBeLessThan(3);
          expect(report.readingGuide.coreClaimType).toBe(core.claimType);
          expect(context.title).toContain('재물 중심 부분풀이');
          expect(context.paragraph).toContain('부족한 독립 보조 근거를 채우지 않으며');
          expect(context.wealthConclusionAuthorized).toBe(false);
          expect(context.themes.length).toBeGreaterThan(0);
          const selectedIds = new Set(report.sections.flatMap(section => section.upstreamClaimIds));
          const observed = new Set(report.sections.flatMap(section => section.observedFactPaths));
          const activeT5 = new Set(execution.claims.filter(claim =>
            claim.state === 'active' && claim.taxonomy.tier === 'T5' &&
            claim.snapshotId === snapshot.snapshotId).map(claim => claim.claimId));
          for (const theme of context.themes) {
            expect(activeT5.has(theme.claimId)).toBe(true);
            expect(selectedIds.has(theme.claimId)).toBe(false);
            expect(theme.observedFactPaths.every(path => !observed.has(path))).toBe(true);
            expect(theme.ruleIds.length).toBeGreaterThan(0);
            expect(theme.methodologyId.length).toBeGreaterThan(0);
            expect(theme.sourceIds.length).toBeGreaterThan(0);
            expect(context.paragraph).toContain(theme.summary);
          }
          expect(report.usefulComplete).toBe(false);
          expect(report.mayPublish).toBe(false);
          expect(report.maySell).toBe(false);
          expect(report).toEqual(
            buildWealthNatalMultifactorReport(snapshot, execution, registry));
          verified = true;
          break outer;
        }
      }
    }
    expect(verified, 'real chart must have an incomplete Wealth core and unconsumed T5').toBe(true);
  }, 60000);

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


  it('keeps the original tension T8 executed when a sourced whole-chart core becomes available', () => {
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar', date: { year: 1960, month: 11, day: 15 },
      time: { known: true, hour: 12, minute: 41 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    const active = execution.claims.filter(claim =>
      claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'wealth' &&
      claim.predicate === 'wealth_multifactor_structure' && claim.state === 'active');
    expect(active.some(claim => (claim.value as { axis?: string }).axis === 'tension')).toBe(true);
    expect(active.some(claim => (claim.value as { channel?: string }).channel === 'cross_channel'))
      .toBe(true);
    expect(report.sections[0]?.axis).toBe('creation');
    expect(report.sections[0]?.channel).toBe('cross_channel');
    expect(report.sections[0]?.paragraph).toContain('서로 다른 관측 범위');
    expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
    expect(report.sections[0]?.upstreamClaimIds.length).toBe(2);
    expect(report.readingGuide?.coreClaimType).toBe(report.sections[0]?.claimType);
    expect(report.state).toBe('partial');
    expect(report.missing.join(' ')).toContain('추가 구조 축');
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });


  it('exposes existing T5 source meaning with chart facts when no Wealth T8 section can be established', () => {
    const birth = {
      calendarType: 'solar' as const,
      date: { year: 1981, month: 2, day: 1 },
      time: { known: true as const, hour: 13, minute: 52 },
      sexForTraditionalCalculation: 'male' as const,
    };
    const snapshot = calculateCanonicalSajuSnapshot(
      birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW },
    );
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    expect(report.sections).toHaveLength(0);
    expect(report.state).toBe('insufficient');
    expect(report.availableThemeContext).toBeDefined();
    expect(report.missing.join(' ')).not.toContain('지장간에는 재성으로 계산되는 천간');
    expect(report.missing.join(' ')).toContain('기존 십신 관점 규칙에서 재성 계열의 활성 근거');
    const context = report.availableThemeContext!;
    expect(context.wealthConclusionAuthorized).toBe(false);
    expect(context.themes.length).toBeGreaterThan(0);
    const hiddenAssessment = observeHiddenWealthMembership(snapshot);
    expect(hiddenAssessment.status).toBe('resolved');
    if (hiddenAssessment.status !== 'resolved') throw new Error('expected resolved R27');
    expect(context.hiddenWealthEvidenceStatus).toBe('resolved');
    expect(context.hiddenWealthUnavailableReason).toBeUndefined();
    expect(context.hiddenWealthMembership).toEqual(hiddenAssessment.observations);
    for (const membership of context.hiddenWealthMembership) {
      expect(context.paragraph).not.toContain(
        `지장간 ${membership.hiddenStem}은 ${membership.derivedTenGod}로 계산됩니다`);
      expect(membership.occurrenceId).toBe(
        `${membership.pillar}:${membership.hiddenStem}`);
      expect(membership.meaningAuthority).toBe('calculated_membership_only');
      expect(membership.wealthConclusionAuthorized).toBe(false);
    }
    expect(context.paragraph).toContain('재물의 많고 적음');
    expect(context.paragraph).toContain('재물 분야의 복합 해석 근거를 충족하지 못했습니다');
    for (const theme of context.themes) {
      const boundClaim = execution.claims.find(c => c.claimId === theme.claimId);
      expect(boundClaim).toBeDefined();
      expect(theme.ruleIds).toEqual(boundClaim!.ruleRefs.map(x => x.ruleId));
      expect(theme.methodologyId).toBe(boundClaim!.methodologyRef.id);
      expect(theme.sourceIds).toEqual(boundClaim!.sourceRefs);
      expect(theme.ruleIds.length).toBeGreaterThan(0);
      expect(theme.methodologyId.length).toBeGreaterThan(0);
      expect(theme.sourceIds.length).toBeGreaterThan(0);
      expect(theme.observedPositions.length).toBeGreaterThan(0);
      expect(theme.observedFactPaths).toHaveLength(theme.observedPositions.length);
      expect(theme.observedFactPaths.every(path =>
        /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))
        .toBe(true);
      expect(context.paragraph).toContain(theme.summary);
      expect(theme.observedPositions.every(pos => context.paragraph.includes(pos))).toBe(true);
      expect(execution.claims.some(claim => claim.claimId === theme.claimId &&
        claim.claimType === theme.claimType && claim.taxonomy.tier === 'T5' &&
        claim.state === 'active')).toBe(true);
    }
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.usefulComplete).toBe(false);
    expect(buildWealthNatalMultifactorReport(snapshot, execution, registry)).toEqual(report);
  });

  it('keeps unused T5 meanings separate after source-bound cross-channel Wealth T8 selection', () => {
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1955, month: 10, day: 31 },
      time: { known: true, hour: 19, minute: 35 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]?.axis).toBe('creation');
    expect(report.sections[0]?.channel).toBe('cross_channel');
    expect(report.state).toBe('partial');
    expect(report.availableThemeContext?.wealthConclusionAuthorized).toBe(false);
    expect(report.availableThemeContext?.themes.some(theme => theme.family === 'wealth')).toBe(false);
    expect(report.availableThemeContext?.themes.some(theme => theme.family === 'peer')).toBe(true);
    expect(report.availableThemeContext?.themes.every(theme =>
      !report.sections[0]!.upstreamClaimIds.includes(theme.claimId))).toBe(true);
  });

  it('keeps T8 meaning blocked with unknown birth hour but displays only verified chart facts', () => {
    const result = run(3, 10, false);
    const report = result.report;
    expect(result.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(report.state).toBe('insufficient');
    expect(report.sections).toHaveLength(0);
    expect(report.availableThemeContext).toBeUndefined();
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
